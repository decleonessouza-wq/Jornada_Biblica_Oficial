/**
 * Plan Engine V2
 *
 * Núcleo puro e determinístico do plano atemporal do Bíblia Jornada.
 *
 * Regras congeladas nesta fase:
 * - a fonte de verdade é uma sequência ordenada de 309 unidades de leitura;
 * - datas históricas do plano de 2026 não participam do calendário em runtime;
 * - domingos reais do calendário são sempre dias livres/meditação;
 * - nenhuma persistência, navegação ou regra de UI pertence a este módulo.
 */

export const PLAN_ENGINE_V2_VERSION = 2 as const;
export const REQUIRED_READING_UNIT_COUNT = 309 as const;

export type IsoDate = `${number}-${number}-${number}`;

export type ReadingUnit = Readonly<{
  id: string;
  order: number;
  reference: string;
}>;

export type ProjectedReadingDay = Readonly<{
  kind: "READING";
  date: IsoDate;
  readingOrder: number;
  readingUnit: ReadingUnit;
}>;

export type ProjectedRestDay = Readonly<{
  kind: "REST";
  date: IsoDate;
  reason: "SUNDAY";
  readingOrder: null;
  readingUnit: null;
}>;

export type ProjectedPlanDay = ProjectedReadingDay | ProjectedRestDay;

export type PlanProjection = Readonly<{
  engineVersion: typeof PLAN_ENGINE_V2_VERSION;
  activationDate: IsoDate;
  firstReadingDate: IsoDate;
  lastReadingDate: IsoDate;
  requiredReadingUnits: number;
  calendarDays: readonly ProjectedPlanDay[];
}>;

export class PlanEngineInvariantError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "PlanEngineInvariantError";
    this.code = code;
  }
}

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function parseIsoDateStrict(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    throw new PlanEngineInvariantError(
      "INVALID_ISO_DATE",
      `Data inválida: "${value}". Use YYYY-MM-DD.`
    );
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const date = new Date(year, month - 1, day, 12, 0, 0, 0);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    throw new PlanEngineInvariantError(
      "INVALID_CALENDAR_DATE",
      `Data inexistente no calendário: "${value}".`
    );
  }

  return date;
}

function dateToIsoLocal(date: Date): IsoDate {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate()
  )}` as IsoDate;
}

export function normalizeIsoDate(value: string): IsoDate {
  return dateToIsoLocal(parseIsoDateStrict(value));
}

export function addCalendarDays(dateIso: string, amount: number): IsoDate {
  if (!Number.isInteger(amount)) {
    throw new PlanEngineInvariantError(
      "INVALID_DAY_OFFSET",
      `O deslocamento de dias precisa ser inteiro. Recebido: ${amount}.`
    );
  }

  const date = parseIsoDateStrict(dateIso);
  date.setDate(date.getDate() + amount);
  return dateToIsoLocal(date);
}

export function isRealSunday(dateIso: string): boolean {
  return parseIsoDateStrict(dateIso).getDay() === 0;
}

export function assertReadingUnits(
  units: readonly ReadingUnit[],
  expectedCount: number = REQUIRED_READING_UNIT_COUNT
): void {
  if (!Array.isArray(units)) {
    throw new PlanEngineInvariantError(
      "READING_UNITS_NOT_ARRAY",
      "As unidades de leitura precisam ser fornecidas em um array."
    );
  }

  if (!Number.isInteger(expectedCount) || expectedCount <= 0) {
    throw new PlanEngineInvariantError(
      "INVALID_EXPECTED_COUNT",
      `Quantidade esperada inválida: ${expectedCount}.`
    );
  }

  if (units.length !== expectedCount) {
    throw new PlanEngineInvariantError(
      "READING_UNIT_COUNT_MISMATCH",
      `Esperadas ${expectedCount} unidades de leitura; recebidas ${units.length}.`
    );
  }

  const ids = new Set<string>();

  units.forEach((unit, index) => {
    const expectedOrder = index + 1;

    if (!unit || typeof unit !== "object") {
      throw new PlanEngineInvariantError(
        "INVALID_READING_UNIT",
        `Unidade ${expectedOrder} inválida.`
      );
    }

    if (!unit.id || unit.id.trim() !== unit.id || unit.id.length === 0) {
      throw new PlanEngineInvariantError(
        "INVALID_READING_UNIT_ID",
        `A unidade ${expectedOrder} possui id inválido.`
      );
    }

    if (ids.has(unit.id)) {
      throw new PlanEngineInvariantError(
        "DUPLICATE_READING_UNIT_ID",
        `Id duplicado: "${unit.id}".`
      );
    }

    ids.add(unit.id);

    if (unit.order !== expectedOrder) {
      throw new PlanEngineInvariantError(
        "READING_UNIT_ORDER_MISMATCH",
        `A unidade "${unit.id}" deveria ter order=${expectedOrder}, mas possui order=${unit.order}.`
      );
    }

    if (
      typeof unit.reference !== "string" ||
      unit.reference.trim().length === 0
    ) {
      throw new PlanEngineInvariantError(
        "EMPTY_READING_REFERENCE",
        `A unidade "${unit.id}" não possui referência bíblica válida.`
      );
    }
  });
}

export function projectPlanCalendar(params: {
  activationDate: string;
  readingUnits: readonly ReadingUnit[];
}): PlanProjection {
  const activationDate = normalizeIsoDate(params.activationDate);
  const readingUnits = params.readingUnits;

  assertReadingUnits(readingUnits);

  const calendarDays: ProjectedPlanDay[] = [];
  let date = activationDate;
  let readingIndex = 0;

  // 309 leituras + domingos cabem com ampla margem neste limite.
  const safetyLimit = readingUnits.length * 2 + 14;
  let iterations = 0;

  while (readingIndex < readingUnits.length) {
    iterations += 1;

    if (iterations > safetyLimit) {
      throw new PlanEngineInvariantError(
        "PROJECTION_SAFETY_LIMIT_EXCEEDED",
        "A projeção do plano excedeu o limite de segurança."
      );
    }

    if (isRealSunday(date)) {
      calendarDays.push({
        kind: "REST",
        date,
        reason: "SUNDAY",
        readingOrder: null,
        readingUnit: null,
      });
    } else {
      const readingUnit = readingUnits[readingIndex];

      calendarDays.push({
        kind: "READING",
        date,
        readingOrder: readingUnit.order,
        readingUnit,
      });

      readingIndex += 1;
    }

    if (readingIndex < readingUnits.length) {
      date = addCalendarDays(date, 1);
    }
  }

  const firstReadingDay = calendarDays.find(
    (day): day is ProjectedReadingDay => day.kind === "READING"
  );

  const lastReadingDay = [...calendarDays]
    .reverse()
    .find((day): day is ProjectedReadingDay => day.kind === "READING");

  if (!firstReadingDay || !lastReadingDay) {
    throw new PlanEngineInvariantError(
      "EMPTY_PLAN_PROJECTION",
      "A projeção não gerou dias de leitura."
    );
  }

  return {
    engineVersion: PLAN_ENGINE_V2_VERSION,
    activationDate,
    firstReadingDate: firstReadingDay.date,
    lastReadingDate: lastReadingDay.date,
    requiredReadingUnits: readingUnits.length,
    calendarDays,
  };
}

export function getProjectedDay(
  projection: PlanProjection,
  dateIso: string
): ProjectedPlanDay | null {
  const normalized = normalizeIsoDate(dateIso);
  return projection.calendarDays.find((day) => day.date === normalized) ?? null;
}

export function getProjectedReadingDayByOrder(
  projection: PlanProjection,
  readingOrder: number
): ProjectedReadingDay | null {
  if (!Number.isInteger(readingOrder) || readingOrder < 1) {
    return null;
  }

  return (
    projection.calendarDays.find(
      (day): day is ProjectedReadingDay =>
        day.kind === "READING" && day.readingOrder === readingOrder
    ) ?? null
  );
}

export function getCalendarDayCount(projection: PlanProjection): number {
  return projection.calendarDays.length;
}
