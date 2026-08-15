/**
 * Estado de progresso do Plano V2.
 *
 * Este módulo modela apenas o progresso canônico do usuário.
 * Não conhece AsyncStorage, navegação, telas ou o progressStore legado.
 *
 * Decisões:
 * - progresso é identificado por unidade canônica, não por data histórica;
 * - a data de ativação pertence ao estado;
 * - cada conclusão guarda a unidade concluída e a data real da conclusão;
 * - as conclusões são mantidas em ordem canônica para persistência determinística.
 */

import { getCanonicalReadingUnitByOrder } from "./canonicalPlanV2";
import {
  REQUIRED_READING_UNIT_COUNT,
  normalizeIsoDate,
  type IsoDate,
} from "./planEngineV2";

export const PLAN_PROGRESS_SCHEMA_VERSION = 2 as const;

export type ReadingCompletionV2 = Readonly<{
  readingUnitId: string;
  readingOrder: number;
  completedOn: IsoDate;
}>;

export type PlanProgressV2 = Readonly<{
  schemaVersion: typeof PLAN_PROGRESS_SCHEMA_VERSION;
  activationDate: IsoDate;
  completions: readonly ReadingCompletionV2[];
}>;

export class PlanProgressInvariantError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "PlanProgressInvariantError";
    this.code = code;
  }
}

function normalizeProgressDate(
  value: unknown,
  code: string,
  label: string
): IsoDate {
  if (typeof value !== "string") {
    throw new PlanProgressInvariantError(
      code,
      `${label} precisa ser uma data ISO YYYY-MM-DD.`
    );
  }

  try {
    return normalizeIsoDate(value);
  } catch {
    throw new PlanProgressInvariantError(
      code,
      `${label} inválida: "${value}".`
    );
  }
}

function getCanonicalUnitOrThrow(readingOrder: number) {
  if (
    !Number.isInteger(readingOrder) ||
    readingOrder < 1 ||
    readingOrder > REQUIRED_READING_UNIT_COUNT
  ) {
    throw new PlanProgressInvariantError(
      "INVALID_READING_ORDER",
      `Ordem de leitura inválida: ${readingOrder}.`
    );
  }

  const unit = getCanonicalReadingUnitByOrder(readingOrder);

  if (!unit) {
    throw new PlanProgressInvariantError(
      "CANONICAL_READING_UNIT_NOT_FOUND",
      `Unidade canônica não encontrada para order=${readingOrder}.`
    );
  }

  return unit;
}

export function assertPlanProgressV2(
  value: unknown
): asserts value is PlanProgressV2 {
  if (!value || typeof value !== "object") {
    throw new PlanProgressInvariantError(
      "INVALID_PROGRESS_STATE",
      "O estado de progresso precisa ser um objeto."
    );
  }

  const progress = value as {
    schemaVersion?: unknown;
    activationDate?: unknown;
    completions?: unknown;
  };

  if (progress.schemaVersion !== PLAN_PROGRESS_SCHEMA_VERSION) {
    throw new PlanProgressInvariantError(
      "INVALID_PROGRESS_SCHEMA_VERSION",
      `schemaVersion precisa ser ${PLAN_PROGRESS_SCHEMA_VERSION}.`
    );
  }

  const activationDate = normalizeProgressDate(
    progress.activationDate,
    "INVALID_ACTIVATION_DATE",
    "activationDate"
  );

  if (!Array.isArray(progress.completions)) {
    throw new PlanProgressInvariantError(
      "COMPLETIONS_NOT_ARRAY",
      "completions precisa ser um array."
    );
  }

  const seenOrders = new Set<number>();
  const seenUnitIds = new Set<string>();
  let previousOrder = 0;

  for (const rawCompletion of progress.completions) {
    if (!rawCompletion || typeof rawCompletion !== "object") {
      throw new PlanProgressInvariantError(
        "INVALID_COMPLETION_RECORD",
        "Registro de conclusão inválido."
      );
    }

    const completion = rawCompletion as {
      readingUnitId?: unknown;
      readingOrder?: unknown;
      completedOn?: unknown;
    };

    if (
      typeof completion.readingOrder !== "number" ||
      !Number.isInteger(completion.readingOrder)
    ) {
      throw new PlanProgressInvariantError(
        "INVALID_READING_ORDER",
        "readingOrder precisa ser um inteiro."
      );
    }

    const unit = getCanonicalUnitOrThrow(completion.readingOrder);

    if (
      typeof completion.readingUnitId !== "string" ||
      completion.readingUnitId !== unit.id
    ) {
      throw new PlanProgressInvariantError(
        "READING_UNIT_ID_MISMATCH",
        `readingUnitId incompatível com order=${completion.readingOrder}.`
      );
    }

    const completedOn = normalizeProgressDate(
      completion.completedOn,
      "INVALID_COMPLETION_DATE",
      "completedOn"
    );

    if (completedOn < activationDate) {
      throw new PlanProgressInvariantError(
        "COMPLETION_BEFORE_ACTIVATION",
        `A leitura ${completion.readingOrder} foi concluída antes da ativação do plano.`
      );
    }

    if (seenOrders.has(completion.readingOrder)) {
      throw new PlanProgressInvariantError(
        "DUPLICATE_READING_ORDER",
        `readingOrder duplicado: ${completion.readingOrder}.`
      );
    }

    if (seenUnitIds.has(unit.id)) {
      throw new PlanProgressInvariantError(
        "DUPLICATE_READING_UNIT_ID",
        `readingUnitId duplicado: ${unit.id}.`
      );
    }

    if (completion.readingOrder <= previousOrder) {
      throw new PlanProgressInvariantError(
        "COMPLETIONS_NOT_CANONICALLY_SORTED",
        "As conclusões precisam estar em ordem canônica crescente."
      );
    }

    seenOrders.add(completion.readingOrder);
    seenUnitIds.add(unit.id);
    previousOrder = completion.readingOrder;
  }
}

export function createPlanProgressV2(activationDate: string): PlanProgressV2 {
  const normalizedActivationDate = normalizeProgressDate(
    activationDate,
    "INVALID_ACTIVATION_DATE",
    "activationDate"
  );

  return {
    schemaVersion: PLAN_PROGRESS_SCHEMA_VERSION,
    activationDate: normalizedActivationDate,
    completions: [],
  };
}

export function getCompletionByReadingOrder(
  progress: PlanProgressV2,
  readingOrder: number
): ReadingCompletionV2 | null {
  assertPlanProgressV2(progress);

  if (
    !Number.isInteger(readingOrder) ||
    readingOrder < 1 ||
    readingOrder > REQUIRED_READING_UNIT_COUNT
  ) {
    return null;
  }

  return (
    progress.completions.find(
      (completion) => completion.readingOrder === readingOrder
    ) ?? null
  );
}

export function isReadingUnitCompleted(
  progress: PlanProgressV2,
  readingOrder: number
): boolean {
  return getCompletionByReadingOrder(progress, readingOrder) !== null;
}

export function getCompletedReadingCount(progress: PlanProgressV2): number {
  assertPlanProgressV2(progress);
  return progress.completions.length;
}

export function getCompletedReadingOrders(
  progress: PlanProgressV2
): readonly number[] {
  assertPlanProgressV2(progress);
  return progress.completions.map((completion) => completion.readingOrder);
}

export function getNextIncompleteReadingOrder(
  progress: PlanProgressV2
): number | null {
  assertPlanProgressV2(progress);

  const completed = new Set(
    progress.completions.map((completion) => completion.readingOrder)
  );

  for (let order = 1; order <= REQUIRED_READING_UNIT_COUNT; order += 1) {
    if (!completed.has(order)) {
      return order;
    }
  }

  return null;
}

export function getCompletionRatio(progress: PlanProgressV2): number {
  assertPlanProgressV2(progress);

  return progress.completions.length / REQUIRED_READING_UNIT_COUNT;
}

export function completeReadingUnit(
  progress: PlanProgressV2,
  readingOrder: number,
  completedOn: string
): PlanProgressV2 {
  assertPlanProgressV2(progress);

  const unit = getCanonicalUnitOrThrow(readingOrder);
  const normalizedCompletedOn = normalizeProgressDate(
    completedOn,
    "INVALID_COMPLETION_DATE",
    "completedOn"
  );

  if (normalizedCompletedOn < progress.activationDate) {
    throw new PlanProgressInvariantError(
      "COMPLETION_BEFORE_ACTIVATION",
      `A leitura ${readingOrder} não pode ser concluída antes da ativação do plano.`
    );
  }

  const existing = getCompletionByReadingOrder(progress, readingOrder);

  if (existing) {
    return progress;
  }

  const nextCompletions = [
    ...progress.completions,
    {
      readingUnitId: unit.id,
      readingOrder: unit.order,
      completedOn: normalizedCompletedOn,
    },
  ].sort((a, b) => a.readingOrder - b.readingOrder);

  const next: PlanProgressV2 = {
    ...progress,
    completions: nextCompletions,
  };

  assertPlanProgressV2(next);

  return next;
}
