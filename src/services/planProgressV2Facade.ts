/**
 * Fachada operacional read-only do progresso V2.
 *
 * Combina o bootstrap seguro com o avaliador puro, sem executar promoção,
 * escrita, limpeza ou mutação de dados. A fachada preserva explicitamente
 * a diferença entre um V2 persistido e uma migração legado ainda em preview.
 */

import {
  evaluatePlanProgressV2,
  type PlanProgressEvaluationV2,
} from "../domain/plan/planProgressEvaluatorV2";
import type { PlanProgressV2 } from "../domain/plan/planProgressV2";
import {
  inspectPlanProgressV2Bootstrap,
  type PlanProgressV2ActivationSource,
  type PlanProgressV2BootstrapReviewReason,
} from "./planProgressV2Bootstrap";

export type PlanProgressV2FacadeSource =
  | "V2_PERSISTED"
  | "LEGACY_MIGRATION_PREVIEW";

export type PlanProgressV2FacadeResult =
  | Readonly<{
      status: "READY";
      source: "V2_PERSISTED";
      progress: PlanProgressV2;
      evaluation: PlanProgressEvaluationV2;
      activationSource: null;
      reviewReason: null;
    }>
  | Readonly<{
      status: "MIGRATION_PREVIEW";
      source: "LEGACY_MIGRATION_PREVIEW";
      progress: PlanProgressV2;
      evaluation: PlanProgressEvaluationV2;
      activationSource: PlanProgressV2ActivationSource;
      reviewReason: null;
    }>
  | Readonly<{
      status: "EMPTY";
      source: null;
      progress: null;
      evaluation: null;
      activationSource: null;
      reviewReason: null;
    }>
  | Readonly<{
      status: "REVIEW_REQUIRED";
      source: null;
      progress: null;
      evaluation: null;
      activationSource: PlanProgressV2ActivationSource | null;
      reviewReason: PlanProgressV2BootstrapReviewReason;
    }>;

export async function inspectPlanProgressV2Facade(
  today: string
): Promise<PlanProgressV2FacadeResult> {
  const bootstrap = await inspectPlanProgressV2Bootstrap();

  if (bootstrap.status === "V2_READY") {
    return {
      status: "READY",
      source: "V2_PERSISTED",
      progress: bootstrap.progress,
      evaluation: evaluatePlanProgressV2(bootstrap.progress, today),
      activationSource: null,
      reviewReason: null,
    };
  }

  if (bootstrap.status === "MIGRATION_READY") {
    return {
      status: "MIGRATION_PREVIEW",
      source: "LEGACY_MIGRATION_PREVIEW",
      progress: bootstrap.progress,
      evaluation: evaluatePlanProgressV2(bootstrap.progress, today),
      activationSource: bootstrap.activationSource,
      reviewReason: null,
    };
  }

  if (bootstrap.status === "EMPTY") {
    return {
      status: "EMPTY",
      source: null,
      progress: null,
      evaluation: null,
      activationSource: null,
      reviewReason: null,
    };
  }

  return {
    status: "REVIEW_REQUIRED",
    source: null,
    progress: null,
    evaluation: null,
    activationSource: bootstrap.activationSource,
    reviewReason: bootstrap.reviewReason,
  };
}
