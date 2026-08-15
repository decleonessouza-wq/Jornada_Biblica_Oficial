/**
 * Coordenador read-only do bootstrap de progresso V2.
 *
 * Responsabilidades:
 * - priorizar um PlanProgressV2 já válido;
 * - bloquear fallback silencioso quando o V2 estiver corrompido;
 * - ler apenas o snapshot mínimo do progresso legado;
 * - preparar uma migração candidata sem persistir nada;
 * - sinalizar revisão quando houver ambiguidade ou corrupção.
 *
 * Este módulo NÃO grava planProgressV2 e NÃO altera chaves legadas.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  migrateLegacyProgressToV2,
  type LegacyProgressMigrationResult,
} from "../domain/plan/legacyProgressMigrationV2";
import {
  normalizeIsoDate,
  type IsoDate,
} from "../domain/plan/planEngineV2";
import type { PlanProgressV2 } from "../domain/plan/planProgressV2";
import {
  readPlanProgressV2,
  type PlanProgressV2StorageReadResult,
} from "./planProgressV2Store";

export const LEGACY_COMPLETED_DAYS_KEY = "completedDays";
export const LEGACY_PLAN_START_DATE_KEY = "planStartDate";
export const LEGACY_PLAN_OVERRIDES_KEY = "planOverridesByDate";

export type PlanProgressV2ActivationSource =
  | "LEGACY_PLAN_START_DATE"
  | "INFERRED_FIRST_COMPLETED_DAY";

export type PlanProgressV2BootstrapReviewReason =
  | "V2_STORAGE_CORRUPT"
  | "LEGACY_COMPLETED_DAYS_INVALID_JSON"
  | "LEGACY_COMPLETED_DAYS_INVALID_SHAPE"
  | "LEGACY_PLAN_OVERRIDES_INVALID_JSON"
  | "LEGACY_PLAN_OVERRIDES_INVALID_SHAPE"
  | "LEGACY_PLAN_OVERRIDES_PRESENT"
  | "LEGACY_PLAN_START_DATE_INVALID"
  | "LEGACY_ACTIVATION_DATE_UNRESOLVED"
  | "LEGACY_MIGRATION_REVIEW_REQUIRED";

export type LegacyProgressSnapshotV2 = Readonly<{
  planStartDateRaw: string | null;
  completedDaysRaw: string | null;
  completedDays: readonly unknown[] | null;
  planOverridesRaw: string | null;
  planOverrides: Readonly<Record<string, unknown>> | null;
}>;

export type PlanProgressV2BootstrapResult =
  | Readonly<{
      status: "V2_READY";
      progress: PlanProgressV2;
      v2Storage: Extract<PlanProgressV2StorageReadResult, { status: "READY" }>;
      legacySnapshot: null;
      migration: null;
      activationSource: null;
      reviewReason: null;
    }>
  | Readonly<{
      status: "EMPTY";
      progress: null;
      v2Storage: Extract<PlanProgressV2StorageReadResult, { status: "EMPTY" }>;
      legacySnapshot: LegacyProgressSnapshotV2;
      migration: null;
      activationSource: null;
      reviewReason: null;
    }>
  | Readonly<{
      status: "MIGRATION_READY";
      progress: PlanProgressV2;
      v2Storage: Extract<PlanProgressV2StorageReadResult, { status: "EMPTY" }>;
      legacySnapshot: LegacyProgressSnapshotV2;
      migration: LegacyProgressMigrationResult;
      activationSource: PlanProgressV2ActivationSource;
      reviewReason: null;
    }>
  | Readonly<{
      status: "REVIEW_REQUIRED";
      progress: null;
      v2Storage: PlanProgressV2StorageReadResult;
      legacySnapshot: LegacyProgressSnapshotV2 | null;
      migration: LegacyProgressMigrationResult | null;
      activationSource: PlanProgressV2ActivationSource | null;
      reviewReason: PlanProgressV2BootstrapReviewReason;
    }>;

export class PlanProgressV2BootstrapError extends Error {
  readonly code: "LEGACY_READ_FAILED";
  readonly causeValue: unknown;

  constructor(causeValue: unknown) {
    super("Falha ao ler o snapshot de progresso legado.");
    this.name = "PlanProgressV2BootstrapError";
    this.code = "LEGACY_READ_FAILED";
    this.causeValue = causeValue;
  }
}

async function readLegacySnapshot(): Promise<LegacyProgressSnapshotV2> {
  try {
    const [planStartDateRaw, completedDaysRaw, planOverridesRaw] =
      await Promise.all([
        AsyncStorage.getItem(LEGACY_PLAN_START_DATE_KEY),
        AsyncStorage.getItem(LEGACY_COMPLETED_DAYS_KEY),
        AsyncStorage.getItem(LEGACY_PLAN_OVERRIDES_KEY),
      ]);

    let completedDays: readonly unknown[] | null = [];

    if (completedDaysRaw !== null) {
      try {
        const parsedCompletedDays: unknown = JSON.parse(completedDaysRaw);
        completedDays = Array.isArray(parsedCompletedDays)
          ? parsedCompletedDays
          : null;
      } catch {
        completedDays = null;
      }
    }

    let planOverrides: Readonly<Record<string, unknown>> | null = null;

    if (planOverridesRaw !== null) {
      try {
        const parsedPlanOverrides: unknown = JSON.parse(planOverridesRaw);

        if (
          typeof parsedPlanOverrides === "object" &&
          parsedPlanOverrides !== null &&
          !Array.isArray(parsedPlanOverrides)
        ) {
          planOverrides = parsedPlanOverrides as Readonly<
            Record<string, unknown>
          >;
        }
      } catch {
        planOverrides = null;
      }
    }

    return {
      planStartDateRaw,
      completedDaysRaw,
      completedDays,
      planOverridesRaw,
      planOverrides,
    };
  } catch (error) {
    throw new PlanProgressV2BootstrapError(error);
  }
}
function tryNormalizeIsoDate(value: unknown): IsoDate | null {
  if (typeof value !== "string") {
    return null;
  }

  try {
    return normalizeIsoDate(value);
  } catch {
    return null;
  }
}

function inferActivationDateFromCompletedDays(
  completedDays: readonly unknown[]
): IsoDate | null {
  const validDates = completedDays
    .map(tryNormalizeIsoDate)
    .filter((value): value is IsoDate => value !== null)
    .sort();

  return validDates[0] ?? null;
}

export async function inspectPlanProgressV2Bootstrap(): Promise<PlanProgressV2BootstrapResult> {
  const v2Storage = await readPlanProgressV2();

  if (v2Storage.status === "READY") {
    return {
      status: "V2_READY",
      progress: v2Storage.progress,
      v2Storage,
      legacySnapshot: null,
      migration: null,
      activationSource: null,
      reviewReason: null,
    };
  }

  if (v2Storage.status === "CORRUPT") {
    return {
      status: "REVIEW_REQUIRED",
      progress: null,
      v2Storage,
      legacySnapshot: null,
      migration: null,
      activationSource: null,
      reviewReason: "V2_STORAGE_CORRUPT",
    };
  }

  const legacySnapshot = await readLegacySnapshot();

  if (
    legacySnapshot.planOverridesRaw !== null &&
    legacySnapshot.planOverrides === null
  ) {
    let reason: PlanProgressV2BootstrapReviewReason =
      "LEGACY_PLAN_OVERRIDES_INVALID_SHAPE";

    try {
      JSON.parse(legacySnapshot.planOverridesRaw);
    } catch {
      reason = "LEGACY_PLAN_OVERRIDES_INVALID_JSON";
    }

    return {
      status: "REVIEW_REQUIRED",
      progress: null,
      v2Storage,
      legacySnapshot,
      migration: null,
      activationSource: null,
      reviewReason: reason,
    };
  }

  if (
    legacySnapshot.planOverrides !== null &&
    Object.keys(legacySnapshot.planOverrides).length > 0
  ) {
    return {
      status: "REVIEW_REQUIRED",
      progress: null,
      v2Storage,
      legacySnapshot,
      migration: null,
      activationSource: null,
      reviewReason: "LEGACY_PLAN_OVERRIDES_PRESENT",
    };
  }

  if (
    legacySnapshot.completedDaysRaw !== null &&
    legacySnapshot.completedDays === null
  ) {
    let reason: PlanProgressV2BootstrapReviewReason =
      "LEGACY_COMPLETED_DAYS_INVALID_SHAPE";

    try {
      JSON.parse(legacySnapshot.completedDaysRaw);
    } catch {
      reason = "LEGACY_COMPLETED_DAYS_INVALID_JSON";
    }

    return {
      status: "REVIEW_REQUIRED",
      progress: null,
      v2Storage,
      legacySnapshot,
      migration: null,
      activationSource: null,
      reviewReason: reason,
    };
  }

  const completedDays = legacySnapshot.completedDays ?? [];

  if (
    legacySnapshot.planStartDateRaw === null &&
    legacySnapshot.completedDaysRaw === null
  ) {
    return {
      status: "EMPTY",
      progress: null,
      v2Storage,
      legacySnapshot,
      migration: null,
      activationSource: null,
      reviewReason: null,
    };
  }

  let activationDate: IsoDate | null = null;
  let activationSource: PlanProgressV2ActivationSource | null = null;

  if (legacySnapshot.planStartDateRaw !== null) {
    activationDate = tryNormalizeIsoDate(legacySnapshot.planStartDateRaw);

    if (!activationDate) {
      return {
        status: "REVIEW_REQUIRED",
        progress: null,
        v2Storage,
        legacySnapshot,
        migration: null,
        activationSource: null,
        reviewReason: "LEGACY_PLAN_START_DATE_INVALID",
      };
    }

    activationSource = "LEGACY_PLAN_START_DATE";
  } else {
    activationDate = inferActivationDateFromCompletedDays(completedDays);

    if (!activationDate) {
      return {
        status: "REVIEW_REQUIRED",
        progress: null,
        v2Storage,
        legacySnapshot,
        migration: null,
        activationSource: null,
        reviewReason: "LEGACY_ACTIVATION_DATE_UNRESOLVED",
      };
    }

    activationSource = "INFERRED_FIRST_COMPLETED_DAY";
  }

  const migration = migrateLegacyProgressToV2({
    activationDate,
    completedDays,
  });

  if (migration.status !== "READY") {
    return {
      status: "REVIEW_REQUIRED",
      progress: null,
      v2Storage,
      legacySnapshot,
      migration,
      activationSource,
      reviewReason: "LEGACY_MIGRATION_REVIEW_REQUIRED",
    };
  }

  return {
    status: "MIGRATION_READY",
    progress: migration.progress,
    v2Storage,
    legacySnapshot,
    migration,
    activationSource,
    reviewReason: null,
  };
}
