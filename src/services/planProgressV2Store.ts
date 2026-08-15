/**
 * Persistência dedicada do progresso V2.
 *
 * Esta camada coexiste com o armazenamento legado e não executa migração
 * automática. O objetivo é oferecer leitura, gravação e remoção seguras do
 * PlanProgressV2 sem tocar em completedDays, planStartDate ou overrides.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  PlanProgressInvariantError,
  assertPlanProgressV2,
  type PlanProgressV2,
} from "../domain/plan/planProgressV2";

export const PLAN_PROGRESS_V2_KEY = "planProgressV2";

export type PlanProgressV2StorageCorruptionReason =
  | "INVALID_JSON"
  | "INVALID_SCHEMA";

export type PlanProgressV2StorageReadResult =
  | Readonly<{
      status: "EMPTY";
      progress: null;
    }>
  | Readonly<{
      status: "READY";
      progress: PlanProgressV2;
    }>
  | Readonly<{
      status: "CORRUPT";
      progress: null;
      reason: PlanProgressV2StorageCorruptionReason;
      rawValue: string;
      domainErrorCode: string | null;
    }>;

export type PlanProgressV2StorageErrorCode =
  | "READ_FAILED"
  | "WRITE_FAILED"
  | "CLEAR_FAILED";

export class PlanProgressV2StorageError extends Error {
  readonly code: PlanProgressV2StorageErrorCode;
  readonly causeValue: unknown;

  constructor(
    code: PlanProgressV2StorageErrorCode,
    message: string,
    causeValue: unknown
  ) {
    super(message);
    this.name = "PlanProgressV2StorageError";
    this.code = code;
    this.causeValue = causeValue;
  }
}

export async function readPlanProgressV2(): Promise<PlanProgressV2StorageReadResult> {
  let raw: string | null;

  try {
    raw = await AsyncStorage.getItem(PLAN_PROGRESS_V2_KEY);
  } catch (error) {
    throw new PlanProgressV2StorageError(
      "READ_FAILED",
      "Falha ao ler o progresso V2.",
      error
    );
  }

  if (raw === null) {
    return {
      status: "EMPTY",
      progress: null,
    };
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      status: "CORRUPT",
      progress: null,
      reason: "INVALID_JSON",
      rawValue: raw,
      domainErrorCode: null,
    };
  }

  try {
    assertPlanProgressV2(parsed);
  } catch (error) {
    return {
      status: "CORRUPT",
      progress: null,
      reason: "INVALID_SCHEMA",
      rawValue: raw,
      domainErrorCode:
        error instanceof PlanProgressInvariantError ? error.code : null,
    };
  }

  return {
    status: "READY",
    progress: parsed,
  };
}

export async function writePlanProgressV2(
  progress: PlanProgressV2
): Promise<void> {
  assertPlanProgressV2(progress);

  const serialized = JSON.stringify(progress);

  try {
    await AsyncStorage.setItem(PLAN_PROGRESS_V2_KEY, serialized);
  } catch (error) {
    throw new PlanProgressV2StorageError(
      "WRITE_FAILED",
      "Falha ao gravar o progresso V2.",
      error
    );
  }
}

export async function clearPlanProgressV2(): Promise<void> {
  try {
    await AsyncStorage.removeItem(PLAN_PROGRESS_V2_KEY);
  } catch (error) {
    throw new PlanProgressV2StorageError(
      "CLEAR_FAILED",
      "Falha ao remover o progresso V2.",
      error
    );
  }
}
