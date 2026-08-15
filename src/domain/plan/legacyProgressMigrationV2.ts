/**
 * Migração pura de progresso legado para PlanProgressV2.
 *
 * Este módulo NÃO lê AsyncStorage e NÃO altera o progressStore legado.
 * Ele recebe um snapshot já resolvido e devolve:
 * - progresso V2 diretamente mapeável;
 * - diagnóstico completo das datas que não podem ser convertidas com segurança.
 *
 * Observação importante:
 * completedDays do legado registra a DATA ASSOCIADA AO DIA DO PLANO.
 * Em fluxos de recuperação/atraso, essa data não prova o instante real em que
 * a leitura foi concluída. Por isso a migração declara explicitamente a
 * proveniência LEGACY_RECORDED_DATE.
 */

import { projectCanonicalPlan } from "./canonicalPlanV2";
import {
  createPlanProgressV2,
  completeReadingUnit,
  type PlanProgressV2,
} from "./planProgressV2";
import { normalizeIsoDate, type IsoDate } from "./planEngineV2";

export const LEGACY_COMPLETION_DATE_PROVENANCE =
  "LEGACY_RECORDED_DATE" as const;

export type LegacyCompletionDateProvenance =
  typeof LEGACY_COMPLETION_DATE_PROVENANCE;

export type LegacyProgressMigrationIssueCode =
  | "INVALID_COMPLETED_DAY"
  | "COMPLETED_BEFORE_ACTIVATION"
  | "COMPLETED_ON_REAL_SUNDAY"
  | "COMPLETED_OUTSIDE_PROJECTED_PLAN";

export type LegacyProgressMigrationIssue = Readonly<{
  code: LegacyProgressMigrationIssueCode;
  rawValue: unknown;
  normalizedDate: IsoDate | null;
}>;

export type LegacyProgressMigrationStatus = "READY" | "REVIEW_REQUIRED";

export type LegacyProgressMigrationInput = Readonly<{
  activationDate: string;
  completedDays: readonly unknown[];
}>;

export type LegacyProgressMigrationResult = Readonly<{
  status: LegacyProgressMigrationStatus;
  completionDateProvenance: LegacyCompletionDateProvenance;
  progress: PlanProgressV2;
  diagnostics: Readonly<{
    inputEntryCount: number;
    validDateEntryCount: number;
    uniqueValidDateCount: number;
    duplicateDateCount: number;
    migratedCompletionCount: number;
    issueCount: number;
    issues: readonly LegacyProgressMigrationIssue[];
  }>;
}>;

function normalizeCompletedDay(value: unknown): IsoDate | null {
  if (typeof value !== "string") {
    return null;
  }

  try {
    return normalizeIsoDate(value);
  } catch {
    return null;
  }
}

export function migrateLegacyProgressToV2(
  input: LegacyProgressMigrationInput
): LegacyProgressMigrationResult {
  const activationDate = normalizeIsoDate(input.activationDate);
  const projection = projectCanonicalPlan(activationDate);

  const projectionByDate = new Map(
    projection.calendarDays.map((day) => [day.date, day] as const)
  );

  const issues: LegacyProgressMigrationIssue[] = [];
  const validDates: IsoDate[] = [];

  for (const rawValue of input.completedDays) {
    const normalizedDate = normalizeCompletedDay(rawValue);

    if (!normalizedDate) {
      issues.push({
        code: "INVALID_COMPLETED_DAY",
        rawValue,
        normalizedDate: null,
      });
      continue;
    }

    validDates.push(normalizedDate);
  }

  const uniqueDates = [...new Set(validDates)].sort();
  let progress = createPlanProgressV2(activationDate);

  for (const completedDate of uniqueDates) {
    if (completedDate < activationDate) {
      issues.push({
        code: "COMPLETED_BEFORE_ACTIVATION",
        rawValue: completedDate,
        normalizedDate: completedDate,
      });
      continue;
    }

    const projectedDay = projectionByDate.get(completedDate);

    if (!projectedDay) {
      issues.push({
        code: "COMPLETED_OUTSIDE_PROJECTED_PLAN",
        rawValue: completedDate,
        normalizedDate: completedDate,
      });
      continue;
    }

    if (projectedDay.kind === "REST") {
      issues.push({
        code: "COMPLETED_ON_REAL_SUNDAY",
        rawValue: completedDate,
        normalizedDate: completedDate,
      });
      continue;
    }

    progress = completeReadingUnit(
      progress,
      projectedDay.readingOrder,
      completedDate
    );
  }

  return {
    status: issues.length === 0 ? "READY" : "REVIEW_REQUIRED",
    completionDateProvenance: LEGACY_COMPLETION_DATE_PROVENANCE,
    progress,
    diagnostics: {
      inputEntryCount: input.completedDays.length,
      validDateEntryCount: validDates.length,
      uniqueValidDateCount: uniqueDates.length,
      duplicateDateCount: validDates.length - uniqueDates.length,
      migratedCompletionCount: progress.completions.length,
      issueCount: issues.length,
      issues,
    },
  };
}
