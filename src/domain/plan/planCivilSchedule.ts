import {
  resolvePlanCivilDayPolicy,
  type PlanCivilDayPolicy,
} from "./planSpecialDayPolicy";

export type PlanCivilScheduleProjection = Readonly<{
  dateIso: string;
  policy: PlanCivilDayPolicy;
  readingUnitIndex: number | null;
  isBeforeStart: boolean;
}>;

export class PlanCivilScheduleInvariantError extends Error {
  readonly code =
    "INVALID_READING_UNIT_INDEX" as const;
  readonly readingUnitIndex: number;

  constructor(readingUnitIndex: number) {
    super(
      `Índice de unidade de leitura inválido: "${readingUnitIndex}".`,
    );
    this.name = "PlanCivilScheduleInvariantError";
    this.readingUnitIndex = readingUnitIndex;
  }
}

function addCivilDays(dateIso: string, days: number): string {
  resolvePlanCivilDayPolicy(dateIso);

  const [yearText, monthText, dayText] = dateIso.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  const nextYear = String(date.getUTCFullYear()).padStart(4, "0");
  const nextMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
  const nextDay = String(date.getUTCDate()).padStart(2, "0");

  return `${nextYear}-${nextMonth}-${nextDay}`;
}

export function projectPlanCivilDate(
  startDateIso: string,
  dateIso: string,
): PlanCivilScheduleProjection {
  resolvePlanCivilDayPolicy(startDateIso);
  const targetPolicy = resolvePlanCivilDayPolicy(dateIso);

  if (dateIso < startDateIso) {
    return {
      dateIso,
      policy: targetPolicy,
      readingUnitIndex: null,
      isBeforeStart: true,
    };
  }

  let currentDateIso = startDateIso;
  let readingUnitIndex = -1;

  while (currentDateIso <= dateIso) {
    const policy = resolvePlanCivilDayPolicy(currentDateIso);

    if (policy.consumesReadingUnit) {
      readingUnitIndex++;
    }

    if (currentDateIso === dateIso) {
      return {
        dateIso,
        policy,
        readingUnitIndex: policy.consumesReadingUnit
          ? readingUnitIndex
          : null,
        isBeforeStart: false,
      };
    }

    currentDateIso = addCivilDays(currentDateIso, 1);
  }

  throw new Error("PLAN_CIVIL_SCHEDULE_UNREACHABLE");
}

export function getCivilDateForPlanReadingUnitIndex(
  startDateIso: string,
  readingUnitIndex: number,
): string {
  resolvePlanCivilDayPolicy(startDateIso);

  if (
    !Number.isInteger(readingUnitIndex) ||
    readingUnitIndex < 0
  ) {
    throw new PlanCivilScheduleInvariantError(readingUnitIndex);
  }

  let currentDateIso = startDateIso;
  let currentReadingUnitIndex = -1;

  while (true) {
    const policy = resolvePlanCivilDayPolicy(currentDateIso);

    if (policy.consumesReadingUnit) {
      currentReadingUnitIndex++;

      if (currentReadingUnitIndex === readingUnitIndex) {
        return currentDateIso;
      }
    }

    currentDateIso = addCivilDays(currentDateIso, 1);
  }
}
