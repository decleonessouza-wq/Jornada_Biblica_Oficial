import { phases, type Phase } from "../../data/phases";
import {
  readingPlan,
  type ReadingItem,
} from "../../data/readingPlan";

export type PlanPhaseProjection = {
  phase: Phase;
  startOffset: number;
  endOffset: number;
};

type BuildPlanPhaseProjectionInput = {
  readingItems?: readonly ReadingItem[];
  phaseItems?: readonly Phase[];
};

function buildDateToOffsetMap(
  readingItems: readonly ReadingItem[],
): Map<string, number> {
  const dateToOffset = new Map<string, number>();

  for (let offset = 0; offset < readingItems.length; offset += 1) {
    const date = readingItems[offset]?.date;

    if (!date) {
      throw new Error(`PLAN_PHASE_PROJECTION_MISSING_READING_DATE:${offset}`);
    }

    if (dateToOffset.has(date)) {
      throw new Error(`PLAN_PHASE_PROJECTION_DUPLICATE_READING_DATE:${date}`);
    }

    dateToOffset.set(date, offset);
  }

  return dateToOffset;
}

export function buildPlanPhaseProjection(
  input: BuildPlanPhaseProjectionInput = {},
): readonly PlanPhaseProjection[] {
  const readingItems = input.readingItems ?? readingPlan;
  const phaseItems = input.phaseItems ?? phases;

  if (readingItems.length === 0) {
    throw new Error("PLAN_PHASE_PROJECTION_EMPTY_READING_PLAN");
  }

  if (phaseItems.length === 0) {
    throw new Error("PLAN_PHASE_PROJECTION_EMPTY_PHASES");
  }

  const dateToOffset = buildDateToOffsetMap(readingItems);

  return phaseItems.map((phase) => {
    const startOffset = dateToOffset.get(phase.startDate);
    const endOffset = dateToOffset.get(phase.endDate);

    if (startOffset === undefined) {
      throw new Error(
        `PLAN_PHASE_PROJECTION_START_DATE_NOT_FOUND:${phase.id}:${phase.startDate}`,
      );
    }

    if (endOffset === undefined) {
      throw new Error(
        `PLAN_PHASE_PROJECTION_END_DATE_NOT_FOUND:${phase.id}:${phase.endDate}`,
      );
    }

    if (startOffset > endOffset) {
      throw new Error(
        `PLAN_PHASE_PROJECTION_INVALID_RANGE:${phase.id}:${startOffset}:${endOffset}`,
      );
    }

    return {
      phase,
      startOffset,
      endOffset,
    };
  });
}

export function getPlanPhaseProjectionForOffset(
  offset: number,
  projection: readonly PlanPhaseProjection[] = buildPlanPhaseProjection(),
): PlanPhaseProjection | null {
  if (!Number.isInteger(offset) || offset < 0) {
    return null;
  }

  return (
    projection.find(
      (item) =>
        offset >= item.startOffset &&
        offset <= item.endOffset,
    ) ?? null
  );
}

export function getPlanPhaseForOffset(
  offset: number,
  projection: readonly PlanPhaseProjection[] = buildPlanPhaseProjection(),
): Phase | null {
  return getPlanPhaseProjectionForOffset(offset, projection)?.phase ?? null;
}
