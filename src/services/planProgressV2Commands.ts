/**
 * Comandos transacionais do progresso V2 persistido.
 *
 * Esta camada só altera um progresso V2 que já esteja persistido e válido.
 * Ela não promove migração legado, não acessa chaves legadas diretamente
 * e não é conectada automaticamente à UI ou ao runtime do app.
 *
 * Garantias:
 * - MIGRATION_READY nunca é promovido implicitamente;
 * - V2 corrompido nunca é sobrescrito;
 * - conclusão duplicada é idempotente;
 * - gravação é relida e verificada;
 * - falha pós-gravação restaura o último V2 válido;
 * - mutações concorrentes são serializadas no processo JS.
 */

import {
  completeReadingUnit,
  isReadingUnitCompleted,
  type PlanProgressV2,
} from "../domain/plan/planProgressV2";
import {
  inspectPlanProgressV2Bootstrap,
  type PlanProgressV2ActivationSource,
  type PlanProgressV2BootstrapReviewReason,
} from "./planProgressV2Bootstrap";
import {
  readPlanProgressV2,
  writePlanProgressV2,
} from "./planProgressV2Store";

export type PlanProgressV2CompletionCommandResult =
  | Readonly<{
      status: "COMPLETED";
      progress: PlanProgressV2;
      persisted: true;
      verified: true;
      activationSource: null;
      reviewReason: null;
    }>
  | Readonly<{
      status: "ALREADY_COMPLETED";
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
      status: "EMPTY";
      progress: null;
      persisted: false;
      verified: false;
      activationSource: null;
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

export type PlanProgressV2CommandErrorCode =
  | "POST_WRITE_VERIFICATION_FAILED"
  | "ROLLBACK_FAILED";

export class PlanProgressV2CommandError extends Error {
  readonly code: PlanProgressV2CommandErrorCode;
  readonly causeValue: unknown;
  readonly rollbackCause: unknown;

  constructor(
    code: PlanProgressV2CommandErrorCode,
    message: string,
    causeValue: unknown,
    rollbackCause: unknown = null
  ) {
    super(message);
    this.name = "PlanProgressV2CommandError";
    this.code = code;
    this.causeValue = causeValue;
    this.rollbackCause = rollbackCause;
  }
}

let mutationQueue: Promise<void> = Promise.resolve();

function runExclusive<T>(operation: () => Promise<T>): Promise<T> {
  const run = mutationQueue.then(
    () => operation(),
    () => operation()
  );

  mutationQueue = run.then(
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

async function restorePreviousProgress(
  previous: PlanProgressV2,
  causeValue: unknown
): Promise<never> {
  try {
    await writePlanProgressV2(previous);

    const restored = await readPlanProgressV2();

    if (
      restored.status !== "READY" ||
      !sameProgress(previous, restored.progress)
    ) {
      throw restored;
    }
  } catch (rollbackCause) {
    throw new PlanProgressV2CommandError(
      "ROLLBACK_FAILED",
      "A conclusão V2 falhou e o último estado válido não pôde ser restaurado.",
      causeValue,
      rollbackCause
    );
  }

  throw new PlanProgressV2CommandError(
    "POST_WRITE_VERIFICATION_FAILED",
    "A conclusão V2 foi revertida porque a verificação pós-gravação falhou.",
    causeValue
  );
}

async function completePersistedReadingUnitV2Unlocked(
  readingOrder: number,
  completedOn: string
): Promise<PlanProgressV2CompletionCommandResult> {
  const bootstrap = await inspectPlanProgressV2Bootstrap();

  if (bootstrap.status === "EMPTY") {
    return {
      status: "EMPTY",
      progress: null,
      persisted: false,
      verified: false,
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

  const previous = bootstrap.progress;

  if (isReadingUnitCompleted(previous, readingOrder)) {
    return {
      status: "ALREADY_COMPLETED",
      progress: previous,
      persisted: false,
      verified: true,
      activationSource: null,
      reviewReason: null,
    };
  }

  const next = completeReadingUnit(previous, readingOrder, completedOn);

  await writePlanProgressV2(next);

  let verification;

  try {
    verification = await readPlanProgressV2();
  } catch (error) {
    return restorePreviousProgress(previous, error);
  }

  if (
    verification.status !== "READY" ||
    !sameProgress(next, verification.progress)
  ) {
    return restorePreviousProgress(previous, verification);
  }

  return {
    status: "COMPLETED",
    progress: verification.progress,
    persisted: true,
    verified: true,
    activationSource: null,
    reviewReason: null,
  };
}

export function completePersistedReadingUnitV2(
  readingOrder: number,
  completedOn: string
): Promise<PlanProgressV2CompletionCommandResult> {
  return runExclusive(() =>
    completePersistedReadingUnitV2Unlocked(readingOrder, completedOn)
  );
}
