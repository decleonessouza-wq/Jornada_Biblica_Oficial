/**
 * Ativação explícita e transacional de um progresso V2 novo.
 *
 * Esta camada só cria planProgressV2 quando não existe V2 e não há estado
 * legado a migrar. Ela nunca promove migração implicitamente, nunca
 * sobrescreve V2 válido/corrompido e não toca em chaves legadas.
 *
 * Garantias:
 * - ativação é uma ação explícita;
 * - data de ativação é validada pelo domínio antes de qualquer escrita;
 * - ativações concorrentes deste módulo são serializadas;
 * - escrita é relida e verificada;
 * - corrupção pós-gravação remove somente a nova chave V2;
 * - estado V2 válido divergente é preservado como possível concorrência;
 * - falha de leitura pós-gravação preserva o estado incerto para revisão.
 */

import {
  createPlanProgressV2,
  type PlanProgressV2,
} from "../domain/plan/planProgressV2";
import {
  inspectPlanProgressV2Bootstrap,
  type PlanProgressV2ActivationSource,
  type PlanProgressV2BootstrapReviewReason,
} from "./planProgressV2Bootstrap";
import {
  clearPlanProgressV2,
  readPlanProgressV2,
  writePlanProgressV2,
} from "./planProgressV2Store";

export type PlanProgressV2ActivationResult =
  | Readonly<{
      status: "ACTIVATED";
      progress: PlanProgressV2;
      persisted: true;
      verified: true;
      activationSource: null;
      reviewReason: null;
    }>
  | Readonly<{
      status: "ALREADY_READY";
      progress: PlanProgressV2;
      persisted: false;
      verified: true;
      activationSource: null;
      reviewReason: null;
    }>
  | Readonly<{
      status: "MIGRATION_REQUIRED";
      progress: null;
      persisted: false;
      verified: false;
      activationSource: PlanProgressV2ActivationSource;
      reviewReason: null;
    }>
  | Readonly<{
      status: "REVIEW_REQUIRED";
      progress: null;
      persisted: false;
      verified: false;
      activationSource: PlanProgressV2ActivationSource | null;
      reviewReason: PlanProgressV2BootstrapReviewReason;
    }>;

export type PlanProgressV2ActivationErrorCode =
  | "POST_WRITE_VERIFICATION_FAILED"
  | "ROLLBACK_FAILED"
  | "CONCURRENT_STATE_CHANGED";

export class PlanProgressV2ActivationError extends Error {
  readonly code: PlanProgressV2ActivationErrorCode;
  readonly causeValue: unknown;
  readonly rollbackCause: unknown;

  constructor(
    code: PlanProgressV2ActivationErrorCode,
    message: string,
    causeValue: unknown,
    rollbackCause: unknown = null
  ) {
    super(message);
    this.name = "PlanProgressV2ActivationError";
    this.code = code;
    this.causeValue = causeValue;
    this.rollbackCause = rollbackCause;
  }
}

let activationQueue: Promise<void> = Promise.resolve();

function runActivationExclusive<T>(
  operation: () => Promise<T>
): Promise<T> {
  const run = activationQueue.then(
    () => operation(),
    () => operation()
  );

  activationQueue = run.then(
    () => undefined,
    () => undefined
  );

  return run;
}

function sameProgress(
  expected: PlanProgressV2,
  actual: PlanProgressV2
): boolean {
  return JSON.stringify(expected) === JSON.stringify(actual);
}

async function cleanupCorruptFreshActivation(
  causeValue: unknown
): Promise<never> {
  try {
    await clearPlanProgressV2();
  } catch (rollbackCause) {
    throw new PlanProgressV2ActivationError(
      "ROLLBACK_FAILED",
      "A ativação V2 falhou e a nova chave V2 corrompida não pôde ser removida.",
      causeValue,
      rollbackCause
    );
  }

  throw new PlanProgressV2ActivationError(
    "POST_WRITE_VERIFICATION_FAILED",
    "A ativação V2 foi revertida porque a verificação pós-gravação detectou corrupção.",
    causeValue
  );
}

async function activateFreshPlanProgressV2Unlocked(
  activationDate: string
): Promise<PlanProgressV2ActivationResult> {
  const candidate = createPlanProgressV2(activationDate);
  const bootstrap = await inspectPlanProgressV2Bootstrap();

  if (bootstrap.status === "V2_READY") {
    return {
      status: "ALREADY_READY",
      progress: bootstrap.progress,
      persisted: false,
      verified: true,
      activationSource: null,
      reviewReason: null,
    };
  }

  if (bootstrap.status === "MIGRATION_READY") {
    return {
      status: "MIGRATION_REQUIRED",
      progress: null,
      persisted: false,
      verified: false,
      activationSource: bootstrap.activationSource,
      reviewReason: null,
    };
  }

  if (bootstrap.status === "REVIEW_REQUIRED") {
    return {
      status: "REVIEW_REQUIRED",
      progress: null,
      persisted: false,
      verified: false,
      activationSource: bootstrap.activationSource,
      reviewReason: bootstrap.reviewReason,
    };
  }

  await writePlanProgressV2(candidate);

  let verification;

  try {
    verification = await readPlanProgressV2();
  } catch (error) {
    throw new PlanProgressV2ActivationError(
      "POST_WRITE_VERIFICATION_FAILED",
      "A ativação V2 foi gravada, mas não pôde ser relida com segurança. O estado foi preservado para revisão.",
      error
    );
  }

  if (verification.status === "READY") {
    if (!sameProgress(candidate, verification.progress)) {
      throw new PlanProgressV2ActivationError(
        "CONCURRENT_STATE_CHANGED",
        "O estado V2 mudou durante a ativação e foi preservado sem sobrescrita destrutiva.",
        verification.progress
      );
    }

    return {
      status: "ACTIVATED",
      progress: verification.progress,
      persisted: true,
      verified: true,
      activationSource: null,
      reviewReason: null,
    };
  }

  if (verification.status === "CORRUPT") {
    return cleanupCorruptFreshActivation(verification);
  }

  throw new PlanProgressV2ActivationError(
    "POST_WRITE_VERIFICATION_FAILED",
    "A ativação V2 não pôde ser confirmada após a gravação.",
    verification
  );
}

export function activateFreshPlanProgressV2(
  activationDate: string
): Promise<PlanProgressV2ActivationResult> {
  return runActivationExclusive(() =>
    activateFreshPlanProgressV2Unlocked(activationDate)
  );
}
