import {
  getCompletedDays,
  getPlanStartDate,
  getTodayIsoLocal,
} from "../../services/progressStore";
import {
  migrateLegacyProgressToV2,
  type LegacyProgressMigrationResult,
} from "../../domain/plan/legacyProgressMigrationV2";
import {
  evaluatePlanProgressV2,
  type PlanProgressEvaluationV2,
} from "../../domain/plan/planProgressEvaluatorV2";
import {
  getCanonicalReadingUnitByOrder,
} from "../../domain/plan/canonicalPlanV2";
import {
  getCanonicalPlanPhaseByReadingOrder,
  type CanonicalPlanPhase,
} from "../../domain/plan/canonicalPlanPhases";
import {
  REQUIRED_READING_UNIT_COUNT,
  normalizeIsoDate,
  type IsoDate,
  type ReadingUnit,
} from "../../domain/plan/planEngineV2";

export const HOME_DASHBOARD_V2_BRIDGE_VERSION = 1 as const;

export type HomeDashboardBridgeStatus =
  | "NOT_STARTED"
  | "LEGACY_START_REQUIRED"
  | "READY"
  | "REVIEW_REQUIRED";

export type HomeDashboardReadingSource =
  | "SCHEDULED_TODAY"
  | "NEXT_INCOMPLETE"
  | "PLAN_COMPLETE";

export type HomeDashboardReadingV2 = Readonly<{
  source: HomeDashboardReadingSource;
  readingOrder: number;
  unit: ReadingUnit;
}>;

export type HomeDashboardMigrationV2 = Readonly<{
  status: "NOT_APPLICABLE" | LegacyProgressMigrationResult["status"];
  completionDateProvenance:
    | LegacyProgressMigrationResult["completionDateProvenance"]
    | null;
  diagnostics: LegacyProgressMigrationResult["diagnostics"] | null;
}>;

export type HomeDashboardV2Snapshot = Readonly<{
  bridgeVersion: typeof HOME_DASHBOARD_V2_BRIDGE_VERSION;
  bridgeStatus: HomeDashboardBridgeStatus;
  canUseCanonicalProgress: boolean;
  today: IsoDate;
  legacy: Readonly<{
    planStartDate: string | null;
    completedDayCount: number;
  }>;
  migration: HomeDashboardMigrationV2;
  evaluation: PlanProgressEvaluationV2 | null;
  progress: Readonly<{
    completedReadingCount: number;
    requiredReadingCount: typeof REQUIRED_READING_UNIT_COUNT;
    completionRatio: number;
    completionPercent: number;
    overdueCount: number;
    isPlanComplete: boolean;
  }>;
  currentReading: HomeDashboardReadingV2 | null;
  currentPhase: CanonicalPlanPhase | null;
}>;

function toCompletionPercent(ratio: number): number {
  if (!Number.isFinite(ratio)) return 0;

  const clamped = Math.min(1, Math.max(0, ratio));
  return Math.round(clamped * 1000) / 10;
}

function resolveDashboardReading(
  evaluation: PlanProgressEvaluationV2
): HomeDashboardReadingV2 | null {
  let source: HomeDashboardReadingSource;
  let readingOrder: number | null;

  if (evaluation.scheduledReadingOrder !== null) {
    source = "SCHEDULED_TODAY";
    readingOrder = evaluation.scheduledReadingOrder;
  } else if (evaluation.nextIncompleteReadingOrder !== null) {
    source = "NEXT_INCOMPLETE";
    readingOrder = evaluation.nextIncompleteReadingOrder;
  } else if (evaluation.isPlanComplete) {
    source = "PLAN_COMPLETE";
    readingOrder = REQUIRED_READING_UNIT_COUNT;
  } else {
    return null;
  }

  const unit = getCanonicalReadingUnitByOrder(readingOrder);
  if (!unit) return null;

  return {
    source,
    readingOrder,
    unit,
  };
}

function resolveDashboardPhase(
  reading: HomeDashboardReadingV2 | null
): CanonicalPlanPhase | null {
  if (!reading) return null;
  return getCanonicalPlanPhaseByReadingOrder(reading.readingOrder);
}

function createNotStartedSnapshot(params: {
  today: IsoDate;
  planStartDate: string | null;
  completedDayCount: number;
}): HomeDashboardV2Snapshot {
  const bridgeStatus: HomeDashboardBridgeStatus =
    params.completedDayCount > 0
      ? "LEGACY_START_REQUIRED"
      : "NOT_STARTED";

  return {
    bridgeVersion: HOME_DASHBOARD_V2_BRIDGE_VERSION,
    bridgeStatus,
    canUseCanonicalProgress: false,
    today: params.today,
    legacy: {
      planStartDate: params.planStartDate,
      completedDayCount: params.completedDayCount,
    },
    migration: {
      status: "NOT_APPLICABLE",
      completionDateProvenance: null,
      diagnostics: null,
    },
    evaluation: null,
    progress: {
      completedReadingCount: 0,
      requiredReadingCount: REQUIRED_READING_UNIT_COUNT,
      completionRatio: 0,
      completionPercent: 0,
      overdueCount: 0,
      isPlanComplete: false,
    },
    currentReading: null,
    currentPhase: null,
  };
}

/**
 * Cria um snapshot read-only para a Home 2.0.
 *
 * Regras desta ponte:
 * - lê apenas o estado legado já persistido;
 * - não cria planStartDate;
 * - não grava PlanProgressV2;
 * - não altera completedDays nem overrides;
 * - usa o migrador puro legado -> V2 apenas em memória;
 * - expõe REVIEW_REQUIRED sem esconder inconsistências;
 * - somente READY autoriza a futura UI a tratar o progresso canônico como confiável.
 */
export async function loadHomeDashboardV2Snapshot(
  todayValue?: string
): Promise<HomeDashboardV2Snapshot> {
  const today = normalizeIsoDate(todayValue ?? getTodayIsoLocal());

  const [planStartDate, completedDays] = await Promise.all([
    getPlanStartDate(),
    getCompletedDays(),
  ]);

  if (!planStartDate) {
    return createNotStartedSnapshot({
      today,
      planStartDate,
      completedDayCount: completedDays.length,
    });
  }

  const migration = migrateLegacyProgressToV2({
    activationDate: planStartDate,
    completedDays,
  });

  const evaluation = evaluatePlanProgressV2(migration.progress, today);
  const currentReading = resolveDashboardReading(evaluation);
  const currentPhase = resolveDashboardPhase(currentReading);

  const bridgeStatus: HomeDashboardBridgeStatus =
    migration.status === "READY" ? "READY" : "REVIEW_REQUIRED";

  return {
    bridgeVersion: HOME_DASHBOARD_V2_BRIDGE_VERSION,
    bridgeStatus,
    canUseCanonicalProgress: bridgeStatus === "READY",
    today,
    legacy: {
      planStartDate,
      completedDayCount: completedDays.length,
    },
    migration: {
      status: migration.status,
      completionDateProvenance: migration.completionDateProvenance,
      diagnostics: migration.diagnostics,
    },
    evaluation,
    progress: {
      completedReadingCount: evaluation.completedReadingCount,
      requiredReadingCount: REQUIRED_READING_UNIT_COUNT,
      completionRatio: evaluation.completionRatio,
      completionPercent: toCompletionPercent(evaluation.completionRatio),
      overdueCount: evaluation.overdueCount,
      isPlanComplete: evaluation.isPlanComplete,
    },
    currentReading,
    currentPhase,
  };
}
