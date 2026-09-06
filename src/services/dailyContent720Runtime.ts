import type { BibleRepository } from "../bible/repositories/bibleRepository";
import { createSQLiteBibleRepository } from "../bible/repositories/sqliteBibleRepository";
import { loadPreferredOfflineBibleVersion } from "../bible/state/bibleReaderPreferencesStore";
import type { BibleVersionId } from "../domain/bible/bibleVersion";
import {
  DAILY_CONTENT_720_CYCLE_DAYS,
  getDailyContent720ByCycleDay,
  type DailyContent720,
} from "./dailyContent720";

const MILLISECONDS_PER_CIVIL_DAY = 86_400_000;

export const DAILY_CONTENT_720_CYCLE_ANCHOR_LOCAL_DATE =
  "2026-01-01" as const;

const CYCLE_ANCHOR_CIVIL_DAY = Math.floor(
  Date.UTC(2026, 0, 1) / MILLISECONDS_PER_CIVIL_DAY,
);

type VerseLookupRepository = Pick<BibleRepository, "getVerse">;

export type ResolvedDailyContent720 = Readonly<{
  cycleDay: number;
  versionId: BibleVersionId;
  content: DailyContent720;
  verseText: string;
}>;

function fail(code: string): never {
  throw new Error(`DAILY_CONTENT_720_RUNTIME_${code}`);
}

function getLocalCivilDayNumber(date: Date): number {
  const timestamp = date.getTime();

  if (!Number.isFinite(timestamp)) {
    fail("INVALID_DATE");
  }

  return Math.floor(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    ) / MILLISECONDS_PER_CIVIL_DAY,
  );
}

export function getDailyContent720CycleDayForDate(
  date: Date,
): number {
  const civilDay = getLocalCivilDayNumber(date);
  const deltaDays = civilDay - CYCLE_ANCHOR_CIVIL_DAY;
  const zeroBasedCycleDay =
    ((deltaDays % DAILY_CONTENT_720_CYCLE_DAYS) +
      DAILY_CONTENT_720_CYCLE_DAYS) %
    DAILY_CONTENT_720_CYCLE_DAYS;

  return zeroBasedCycleDay + 1;
}

export async function resolveDailyContent720WithRepository(
  cycleDay: number,
  versionId: BibleVersionId,
  repository: VerseLookupRepository,
): Promise<ResolvedDailyContent720> {
  const content = getDailyContent720ByCycleDay(cycleDay);
  const verse = content.verse;

  const record = await repository.getVerse(
    versionId,
    verse.bookId,
    verse.chapter,
    verse.verse,
  );

  if (!record) {
    fail(
      `VERSE_NOT_FOUND:${versionId}:${verse.bookId}:${verse.chapter}:${verse.verse}`,
    );
  }

  if (
    record.versionId !== versionId ||
    record.bookId !== verse.bookId ||
    record.chapter !== verse.chapter ||
    record.verse !== verse.verse
  ) {
    fail(`VERSE_RECORD_MISMATCH:${cycleDay}`);
  }

  if (record.text.trim().length === 0) {
    fail(`VERSE_TEXT_EMPTY:${cycleDay}`);
  }

  return {
    cycleDay,
    versionId,
    content,
    verseText: record.text,
  };
}

export async function loadDailyContent720ForDate(
  date: Date,
): Promise<ResolvedDailyContent720> {
  const cycleDay = getDailyContent720CycleDayForDate(date);
  const versionId = await loadPreferredOfflineBibleVersion();
  const repository = await createSQLiteBibleRepository();

  return resolveDailyContent720WithRepository(
    cycleDay,
    versionId,
    repository,
  );
}
