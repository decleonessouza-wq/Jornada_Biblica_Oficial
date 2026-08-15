/**
 * Fachada canônica do Plan Engine V2.
 *
 * Une a fonte oficial de 309 leituras ao motor puro de projeção,
 * sem introduzir persistência, navegação ou dependências de UI.
 */

import { CANONICAL_READING_UNITS } from "./canonicalReadingUnits";
import {
  REQUIRED_READING_UNIT_COUNT,
  assertReadingUnits,
  projectPlanCalendar,
  type PlanProjection,
  type ReadingUnit,
} from "./planEngineV2";

export const CANONICAL_PLAN_UNIT_COUNT = CANONICAL_READING_UNITS.length;

export function assertCanonicalPlanDefinition(): void {
  if (CANONICAL_PLAN_UNIT_COUNT !== REQUIRED_READING_UNIT_COUNT) {
    throw new Error(
      `Fonte canônica inconsistente: esperadas ${REQUIRED_READING_UNIT_COUNT} leituras; recebidas ${CANONICAL_PLAN_UNIT_COUNT}.`
    );
  }

  assertReadingUnits(CANONICAL_READING_UNITS);
}

export function getCanonicalReadingUnits(): readonly ReadingUnit[] {
  assertCanonicalPlanDefinition();
  return CANONICAL_READING_UNITS;
}

export function getCanonicalReadingUnitByOrder(
  readingOrder: number
): ReadingUnit | null {
  if (!Number.isInteger(readingOrder) || readingOrder < 1) {
    return null;
  }

  return CANONICAL_READING_UNITS[readingOrder - 1] ?? null;
}

export function projectCanonicalPlan(activationDate: string): PlanProjection {
  assertCanonicalPlanDefinition();

  return projectPlanCalendar({
    activationDate,
    readingUnits: CANONICAL_READING_UNITS,
  });
}
