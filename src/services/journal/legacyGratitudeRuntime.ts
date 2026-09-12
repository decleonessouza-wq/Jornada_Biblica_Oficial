import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPersonalPlatformHub } from "../personalPlatformHub";
import {
  migrateLegacyGratitude,
  type LegacyGratitudeMigrationResult,
} from "./legacyGratitudeMigration";

const LEGACY_GRATITUDE_STORAGE_KEY =
  "gratitudeByDate";
const LEGACY_GRATITUDE_CUTOVER_MARKER_KEY =
  "journalGratitudeCutoverV1";

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
let cutoverPreparationPromise: Promise<void> | null =
  null;

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

export async function hasLegacyGratitudeCutoverCompleted(): Promise<boolean> {
  return (
    (await AsyncStorage.getItem(
      LEGACY_GRATITUDE_CUTOVER_MARKER_KEY,
    )) === "1"
  );
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

async function performLegacyGratitudeCutoverPreparation(): Promise<void> {
  if (await hasLegacyGratitudeCutoverCompleted()) {
    return;
  }

  await reconcileLegacyGratitudeRuntime();

  await AsyncStorage.setItem(
    LEGACY_GRATITUDE_CUTOVER_MARKER_KEY,
    "1",
  );
}

export function prepareLegacyGratitudeCutover(): Promise<void> {
  if (cutoverPreparationPromise !== null) {
    return cutoverPreparationPromise;
  }

  const current =
    performLegacyGratitudeCutoverPreparation();

  cutoverPreparationPromise = current;

  void current.catch(() => {
    if (cutoverPreparationPromise === current) {
      cutoverPreparationPromise = null;
    }
  });

  return current;
}

export async function requestLegacyGratitudeRuntimeReconciliation(
  context: LegacyGratitudeRuntimeContext,
): Promise<LegacyGratitudeMigrationResult | null> {
  if (await hasLegacyGratitudeCutoverCompleted()) {
    return null;
  }

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
