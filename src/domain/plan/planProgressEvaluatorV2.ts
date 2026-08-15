/**
 * Avaliador puro do progresso V2 contra o calendário canônico projetado.
 *
 * Não lê storage, não grava dados, não conhece UI e não usa o plano legado.
 * Sua responsabilidade é derivar fatos operacionais do plano:
 * - posição de hoje no calendário;
 * - leitura agendada;
 * - atrasos reais por readingOrder;
 * - próxima unidade incompleta;
 * - conclusão global do plano.
 */

import { projectCanonicalPlan } from "./canonicalPlanV2";
import {
  REQUIRED_READING_UNIT_COUNT,
  normalizeIsoDate,
  type IsoDate,
} from "./planEngineV2";
import {
  assertPlanProgressV2,
  getCompletedReadingCount,
  getCompletionRatio,
  getNextIncompleteReadingOrder,
  isReadingUnitCompleted,
  type PlanProgressV2,
} from "./planProgressV2";

export type PlanProgressLifecycleV2 =
  | "NOT_STARTED"
  | "ACTIVE"
  | "AFTER_PLAN"
  | "COMPLETED";

export type PlanProgressCalendarKindV2 =
  | "BEFORE_ACTIVATION"
  | "READING"
  | "REST"
  | "AFTER_PLAN";

export type PlanProgressEvaluationV2 = Readonly<{
  today: IsoDate;
  activationDate: IsoDate;
  projectedEndDate: IsoDate;
  lifecycle: PlanProgressLifecycleV2;
  calendarKind: PlanProgressCalendarKindV2;
  scheduledReadingOrder: number | null;
  scheduledReadingCompleted: boolean | null;
  overdueReadingOrders: readonly number[];
  overdueCount: number;
  firstOverdueReadingOrder: number | null;
  nextIncompleteReadingOrder: number | null;
  completedReadingCount: number;
  completionRatio: number;
  isPlanComplete: boolean;
}>;

export function evaluatePlanProgressV2(
  progress: PlanProgressV2,
  todayValue: string
): PlanProgressEvaluationV2 {
  assertPlanProgressV2(progress);

  const today = normalizeIsoDate(todayValue);
  const projection = projectCanonicalPlan(progress.activationDate);
  const projectedEndDate =
    projection.calendarDays[projection.calendarDays.length - 1]?.date;

  if (!projectedEndDate) {
    throw new Error("PLAN_V2_PROJECTION_EMPTY");
  }

  const completedReadingCount = getCompletedReadingCount(progress);
  const completionRatio = getCompletionRatio(progress);
  const nextIncompleteReadingOrder = getNextIncompleteReadingOrder(progress);
  const isPlanComplete =
    completedReadingCount === REQUIRED_READING_UNIT_COUNT;

  const overdueReadingOrders = projection.calendarDays.flatMap((day) => {
    if (
      day.kind !== "READING" ||
      day.date >= today ||
      day.readingOrder === null ||
      isReadingUnitCompleted(progress, day.readingOrder)
    ) {
      return [];
    }

    return [day.readingOrder];
  });

  let lifecycle: PlanProgressLifecycleV2;

  if (today < progress.activationDate) {
    lifecycle = "NOT_STARTED";
  } else if (isPlanComplete) {
    lifecycle = "COMPLETED";
  } else if (today > projectedEndDate) {
    lifecycle = "AFTER_PLAN";
  } else {
    lifecycle = "ACTIVE";
  }

  let calendarKind: PlanProgressCalendarKindV2;
  let scheduledReadingOrder: number | null = null;
  let scheduledReadingCompleted: boolean | null = null;

  if (today < progress.activationDate) {
    calendarKind = "BEFORE_ACTIVATION";
  } else if (today > projectedEndDate) {
    calendarKind = "AFTER_PLAN";
  } else {
    const todayProjection = projection.calendarDays.find(
      (day) => day.date === today
    );

    if (!todayProjection) {
      throw new Error("PLAN_V2_TODAY_NOT_FOUND_IN_PROJECTION");
    }

    if (todayProjection.kind === "REST") {
      calendarKind = "REST";
    } else {
      calendarKind = "READING";
      scheduledReadingOrder = todayProjection.readingOrder;
      scheduledReadingCompleted = isReadingUnitCompleted(
        progress,
        todayProjection.readingOrder
      );
    }
  }

  return {
    today,
    activationDate: progress.activationDate,
    projectedEndDate,
    lifecycle,
    calendarKind,
    scheduledReadingOrder,
    scheduledReadingCompleted,
    overdueReadingOrders,
    overdueCount: overdueReadingOrders.length,
    firstOverdueReadingOrder: overdueReadingOrders[0] ?? null,
    nextIncompleteReadingOrder,
    completedReadingCount,
    completionRatio,
    isPlanComplete,
  };
}
