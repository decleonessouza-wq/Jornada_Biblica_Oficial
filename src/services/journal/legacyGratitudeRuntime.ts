import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPersonalPlatformHub } from "../personalPlatformHub";
import {
  migrateLegacyGratitude,
  type LegacyGratitudeMigrationResult,
} from "./legacyGratitudeMigration";

export const LEGACY_GRATITUDE_STORAGE_KEY =
  "gratitudeByDate";

export type LegacyGratitudeRuntimeContext =
  | "startup"
  | "reading-save"
  | "reading-delete"
  | "history-import"
  | "history-reset"
  | "settings-import"
  | "settings-reset";

let reconciliationQueue: Promise<void> =
  Promise.resolve();

async function readLegacyGratitudeInput(): Promise<unknown> {
  const raw = await AsyncStorage.getItem(
    LEGACY_GRATITUDE_STORAGE_KEY,
  );

  if (raw === null) {
    return {};
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(
      "PERSONAL_LEGACY_GRATITUDE_STORAGE_INVALID_JSON",
    );
  }
}

async function reconcileLegacyGratitudeOnce(): Promise<
  LegacyGratitudeMigrationResult
> {
  const legacyInput =
    await readLegacyGratitudeInput();
  const { journalService } =
    getPersonalPlatformHub();

  return migrateLegacyGratitude(
    journalService,
    legacyInput,
  );
}

export function reconcileLegacyGratitudeRuntime(): Promise<
  LegacyGratitudeMigrationResult
> {
  const task = reconciliationQueue.then(
    reconcileLegacyGratitudeOnce,
    reconcileLegacyGratitudeOnce,
  );

  reconciliationQueue = task.then(
    () => undefined,
    () => undefined,
  );

  return task;
}

export async function requestLegacyGratitudeRuntimeReconciliation(
  context: LegacyGratitudeRuntimeContext,
): Promise<LegacyGratitudeMigrationResult | null> {
  try {
    return await reconcileLegacyGratitudeRuntime();
  } catch (error) {
    console.error(
      `[LegacyGratitudeRuntime] ${context} reconciliation failed`,
      error,
    );
    return null;
  }
}
