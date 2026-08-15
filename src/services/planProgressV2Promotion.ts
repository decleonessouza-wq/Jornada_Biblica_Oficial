/**
 * Promoção explícita e verificada do progresso legado para o storage V2.
 *
 * Este módulo NÃO é executado automaticamente pelo app.
 * Ele só persiste quando o bootstrap retorna MIGRATION_READY.
 *
 * Garantias:
 * - V2 válido existente nunca é sobrescrito;
 * - V2 corrompido nunca recebe fallback/migração silenciosa;
 * - legado nunca é apagado ou alterado;
 * - após a escrita V2, o valor é relido e verificado;
 * - falha de verificação tenta remover somente a nova chave V2.
 */

import type { PlanProgressV2 } from "../domain/plan/planProgressV2";
import {
  inspectPlanProgressV2Bootstrap,
  type PlanProgressV2BootstrapReviewReason,
} from "./planProgressV2Bootstrap";
import {
  clearPlanProgressV2,
  readPlanProgressV2,
  writePlanProgressV2,
} from "./planProgressV2Store";

export type PlanProgressV2PromotionStatus =
  | "PROMOTED"
  | "ALREADY_READY"
  | "EMPTY"
  | "REVIEW_REQUIRED";

export type PlanProgressV2PromotionResult =
  | Readonly<{
      status: "PROMOTED";
      progress: PlanProgressV2;
      persisted: true;
      verified: true;
      reviewReason: null;
    }>
  | Readonly<{
      status: "ALREADY_READY";
      progress: PlanProgressV2;
      persisted: false;
      verified: true;
      reviewReason: null;
    }>
  | Readonly<{
      status: "EMPTY";
      progress: null;
      persisted: false;
      verified: false;
      reviewReason: null;
    }>
  | Readonly<{
      status: "REVIEW_REQUIRED";
      progress: null;
      persisted: false;
      verified: false;
      reviewReason: PlanProgressV2BootstrapReviewReason;
    }>;

export type PlanProgressV2PromotionErrorCode =
  | "POST_WRITE_VERIFICATION_FAILED"
  | "ROLLBACK_FAILED";

export class PlanProgressV2PromotionError extends Error {
  readonly code: PlanProgressV2PromotionErrorCode;
  readonly causeValue: unknown;
  readonly rollbackCause: unknown;

  constructor(
    code: PlanProgressV2PromotionErrorCode,
    message: string,
    causeValue: unknown,
    rollbackCause: unknown = null
  ) {
    super(message);
    this.name = "PlanProgressV2PromotionError";
    this.code = code;
    this.causeValue = causeValue;
    this.rollbackCause = rollbackCause;
  }
}

function sameProgress(
  expected: PlanProgressV2,
  actual: PlanProgressV2
): boolean {
  return JSON.stringify(expected) === JSON.stringify(actual);
}

async function rollbackFailedPromotion(causeValue: unknown): Promise<never> {
  try {
    await clearPlanProgressV2();
  } catch (rollbackCause) {
    throw new PlanProgressV2PromotionError(
      "ROLLBACK_FAILED",
      "A promoção V2 falhou e a remoção da nova chave V2 também falhou.",
      causeValue,
      rollbackCause
    );
  }

  throw new PlanProgressV2PromotionError(
    "POST_WRITE_VERIFICATION_FAILED",
    "A promoção V2 foi revertida porque a verificação pós-gravação falhou.",
    causeValue
  );
}

export async function promotePlanProgressV2Migration(): Promise<PlanProgressV2PromotionResult> {
  const bootstrap = await inspectPlanProgressV2Bootstrap();

  if (bootstrap.status === "V2_READY") {
    return {
      status: "ALREADY_READY",
      progress: bootstrap.progress,
      persisted: false,
      verified: true,
      reviewReason: null,
    };
  }

  if (bootstrap.status === "EMPTY") {
    return {
      status: "EMPTY",
      progress: null,
      persisted: false,
      verified: false,
      reviewReason: null,
    };
  }

  if (bootstrap.status === "REVIEW_REQUIRED") {
    return {
      status: "REVIEW_REQUIRED",
      progress: null,
      persisted: false,
      verified: false,
      reviewReason: bootstrap.reviewReason,
    };
  }

  const candidate = bootstrap.progress;

  await writePlanProgressV2(candidate);

  let verification;

  try {
    verification = await readPlanProgressV2();
  } catch (error) {
    return rollbackFailedPromotion(error);
  }

  if (
    verification.status !== "READY" ||
    !sameProgress(candidate, verification.progress)
  ) {
    return rollbackFailedPromotion(verification);
  }

  return {
    status: "PROMOTED",
    progress: verification.progress,
    persisted: true,
    verified: true,
    reviewReason: null,
  };
}
