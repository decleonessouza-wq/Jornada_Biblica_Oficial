/**
 * Fachada opt-in para projeção canônica com referências estruturadas.
 *
 * Preserva integralmente a projeção do Plan Engine V2 e enriquece apenas
 * os dias de leitura com StructuredReadingUnit.
 *
 * O calendário continua sendo produzido exclusivamente por
 * projectCanonicalPlan(); esta fachada não recalcula datas nem reprocessa
 * referências bíblicas.
 */

import { projectCanonicalPlan } from "./canonicalPlanV2";
import {
  getCanonicalStructuredReadingUnitByOrder,
  type StructuredReadingUnit,
} from "./canonicalStructuredReadingUnits";
import type {
  PlanProjection,
  ProjectedRestDay,
} from "./planEngineV2";

export type StructuredProjectedReadingDay = Readonly<{
  kind: "READING";
  date: PlanProjection["activationDate"];
  readingOrder: number;
  readingUnit: StructuredReadingUnit;
}>;

export type StructuredProjectedPlanDay =
  | StructuredProjectedReadingDay
  | ProjectedRestDay;

export type StructuredPlanProjection = Readonly<
  Omit<PlanProjection, "calendarDays"> & {
    calendarDays: readonly StructuredProjectedPlanDay[];
  }
>;

export class StructuredPlanProjectionInvariantError extends Error {
  readonly code = "STRUCTURED_READING_UNIT_MISMATCH" as const;
  readonly readingOrder: number;

  constructor(readingOrder: number, message: string) {
    super(message);
    this.name = "StructuredPlanProjectionInvariantError";
    this.readingOrder = readingOrder;
  }
}

function resolveStructuredReadingUnit(
  readingOrder: number,
  expectedId: string,
  expectedReference: string
): StructuredReadingUnit {
  const structuredUnit =
    getCanonicalStructuredReadingUnitByOrder(readingOrder);

  if (!structuredUnit) {
    throw new StructuredPlanProjectionInvariantError(
      readingOrder,
      `Unidade estruturada não encontrada para readingOrder=${readingOrder}.`
    );
  }

  if (
    structuredUnit.id !== expectedId ||
    structuredUnit.reference !== expectedReference
  ) {
    throw new StructuredPlanProjectionInvariantError(
      readingOrder,
      `Unidade estruturada divergente para readingOrder=${readingOrder}.`
    );
  }

  return structuredUnit;
}

export function projectCanonicalStructuredPlan(
  activationDate: string
): StructuredPlanProjection {
  const projection = projectCanonicalPlan(activationDate);

  const calendarDays: StructuredProjectedPlanDay[] =
    projection.calendarDays.map((day) => {
      if (day.kind === "REST") {
        return day;
      }

      return {
        ...day,
        readingUnit: resolveStructuredReadingUnit(
          day.readingOrder,
          day.readingUnit.id,
          day.readingUnit.reference
        ),
      };
    });

  return {
    ...projection,
    calendarDays,
  };
}
