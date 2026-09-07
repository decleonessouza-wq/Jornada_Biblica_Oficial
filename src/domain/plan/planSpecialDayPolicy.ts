export const PLAN_SPECIAL_DAY_POLICY_VERSION = 1 as const;

export type PlanCivilDayKind =
  | "READING"
  | "SUNDAY_MEDITATION"
  | "CHRISTMAS";

export type PlanReadingDayPolicy = Readonly<{
  dateIso: string;
  kind: "READING";
  isSunday: false;
  consumesReadingUnit: true;
  canMarkRead: true;
}>;

export type PlanSpecialDayPolicy = Readonly<{
  dateIso: string;
  kind: "SUNDAY_MEDITATION" | "CHRISTMAS";
  isSunday: boolean;
  consumesReadingUnit: false;
  canMarkRead: false;
  displayReference: "Meditar" | "Natal";
  experience:
    | "LOCAL_SUNDAY_MEDITATION"
    | "LOCAL_CHRISTMAS_DEVOTIONAL";
  bibleReference: null;
  externalNavigationAllowed: false;
}>;

export type PlanCivilDayPolicy =
  | PlanReadingDayPolicy
  | PlanSpecialDayPolicy;

type ParsedCivilDate = Readonly<{
  year: number;
  month: number;
  day: number;
  dayOfWeek: number;
}>;

type FixedAnnualSpecialDay = Readonly<{
  month: number;
  day: number;
  kind: "CHRISTMAS";
  displayReference: "Natal";
  experience: "LOCAL_CHRISTMAS_DEVOTIONAL";
}>;

const FIXED_ANNUAL_SPECIAL_DAYS: readonly FixedAnnualSpecialDay[] =
  Object.freeze([
    Object.freeze({
      month: 12,
      day: 25,
      kind: "CHRISTMAS",
      displayReference: "Natal",
      experience: "LOCAL_CHRISTMAS_DEVOTIONAL",
    }),
  ]);

export class PlanCivilDayPolicyInvariantError extends Error {
  readonly code = "INVALID_CIVIL_DATE" as const;
  readonly dateIso: string;

  constructor(dateIso: string) {
    super(`Data civil inválida para a política do plano: "${dateIso}".`);
    this.name = "PlanCivilDayPolicyInvariantError";
    this.dateIso = dateIso;
  }
}

function parseCivilDate(dateIso: string): ParsedCivilDate {
  if (
    typeof dateIso !== "string" ||
    dateIso.length !== 10 ||
    dateIso.trim() !== dateIso
  ) {
    throw new PlanCivilDayPolicyInvariantError(String(dateIso));
  }

  const match = /^([1-9]\d{3})-(\d{2})-(\d{2})$/.exec(dateIso);

  if (!match) {
    throw new PlanCivilDayPolicyInvariantError(dateIso);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const utcDate = new Date(Date.UTC(year, month - 1, day));

  if (
    utcDate.getUTCFullYear() !== year ||
    utcDate.getUTCMonth() + 1 !== month ||
    utcDate.getUTCDate() !== day
  ) {
    throw new PlanCivilDayPolicyInvariantError(dateIso);
  }

  return {
    year,
    month,
    day,
    dayOfWeek: utcDate.getUTCDay(),
  };
}

export function resolvePlanCivilDayPolicy(
  dateIso: string,
): PlanCivilDayPolicy {
  const parsed = parseCivilDate(dateIso);
  const isSunday = parsed.dayOfWeek === 0;

  const fixedSpecialDay =
    FIXED_ANNUAL_SPECIAL_DAYS.find(
      (candidate) =>
        candidate.month === parsed.month &&
        candidate.day === parsed.day,
    ) ?? null;

  if (fixedSpecialDay) {
    return {
      dateIso,
      kind: fixedSpecialDay.kind,
      isSunday,
      consumesReadingUnit: false,
      canMarkRead: false,
      displayReference: fixedSpecialDay.displayReference,
      experience: fixedSpecialDay.experience,
      bibleReference: null,
      externalNavigationAllowed: false,
    };
  }

  if (isSunday) {
    return {
      dateIso,
      kind: "SUNDAY_MEDITATION",
      isSunday: true,
      consumesReadingUnit: false,
      canMarkRead: false,
      displayReference: "Meditar",
      experience: "LOCAL_SUNDAY_MEDITATION",
      bibleReference: null,
      externalNavigationAllowed: false,
    };
  }

  return {
    dateIso,
    kind: "READING",
    isSunday: false,
    consumesReadingUnit: true,
    canMarkRead: true,
  };
}

export function isPlanReadingCivilDate(dateIso: string): boolean {
  return resolvePlanCivilDayPolicy(dateIso).consumesReadingUnit;
}
