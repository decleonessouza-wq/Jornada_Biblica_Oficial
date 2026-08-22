/**
 * Persistência leve das preferências do leitor bíblico offline.
 *
 * O corpus permanece no SQLite. Somente preferências pequenas e a última
 * posição de leitura usam AsyncStorage, em namespace exclusivo da Bíblia
 * offline para não colidir com o fluxo legado da Jornada.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  DEFAULT_BIBLE_READER_FONT_SCALE,
  DEFAULT_OFFLINE_BIBLE_VERSION_ID,
  isBibleReaderFontScale,
  parseOfflineBibleLastReading,
  type BibleReaderFontScale,
  type OfflineBibleLastReading,
} from "../reader/bibleReaderContracts";
import {
  isBibleVersionId,
  type BibleVersionId,
} from "../../domain/bible/bibleVersion";

export const OFFLINE_BIBLE_STORAGE_NAMESPACE =
  "@biblia-jornada/offline-bible/v1" as const;

export const OFFLINE_BIBLE_STORAGE_KEYS = {
  preferredVersion:
    `${OFFLINE_BIBLE_STORAGE_NAMESPACE}/preferred-version`,
  lastReading:
    `${OFFLINE_BIBLE_STORAGE_NAMESPACE}/last-reading`,
  fontScale:
    `${OFFLINE_BIBLE_STORAGE_NAMESPACE}/font-scale`,
} as const;

export async function loadPreferredOfflineBibleVersion(): Promise<BibleVersionId> {
  const stored = await AsyncStorage.getItem(
    OFFLINE_BIBLE_STORAGE_KEYS.preferredVersion,
  );

  return stored !== null && isBibleVersionId(stored)
    ? stored
    : DEFAULT_OFFLINE_BIBLE_VERSION_ID;
}

export async function savePreferredOfflineBibleVersion(
  versionId: BibleVersionId,
): Promise<void> {
  if (!isBibleVersionId(versionId)) {
    throw new Error(
      `OFFLINE_BIBLE_INVALID_PREFERRED_VERSION:${String(versionId)}`,
    );
  }

  await AsyncStorage.setItem(
    OFFLINE_BIBLE_STORAGE_KEYS.preferredVersion,
    versionId,
  );
}

export async function loadOfflineBibleLastReading(): Promise<OfflineBibleLastReading | null> {
  const raw = await AsyncStorage.getItem(
    OFFLINE_BIBLE_STORAGE_KEYS.lastReading,
  );

  if (raw === null) {
    return null;
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  return parseOfflineBibleLastReading(parsed);
}

export async function saveOfflineBibleLastReading(
  reading: OfflineBibleLastReading,
): Promise<void> {
  const validated = parseOfflineBibleLastReading(reading);

  if (!validated) {
    throw new Error("OFFLINE_BIBLE_INVALID_LAST_READING");
  }

  await AsyncStorage.setItem(
    OFFLINE_BIBLE_STORAGE_KEYS.lastReading,
    JSON.stringify(validated),
  );
}

export async function clearOfflineBibleLastReading(): Promise<void> {
  await AsyncStorage.removeItem(OFFLINE_BIBLE_STORAGE_KEYS.lastReading);
}

export async function loadOfflineBibleFontScale(): Promise<BibleReaderFontScale> {
  const stored = await AsyncStorage.getItem(
    OFFLINE_BIBLE_STORAGE_KEYS.fontScale,
  );

  return isBibleReaderFontScale(stored)
    ? stored
    : DEFAULT_BIBLE_READER_FONT_SCALE;
}

export async function saveOfflineBibleFontScale(
  fontScale: BibleReaderFontScale,
): Promise<void> {
  if (!isBibleReaderFontScale(fontScale)) {
    throw new Error(
      `OFFLINE_BIBLE_INVALID_FONT_SCALE:${String(fontScale)}`,
    );
  }

  await AsyncStorage.setItem(
    OFFLINE_BIBLE_STORAGE_KEYS.fontScale,
    fontScale,
  );
}
