import { BIBLE_BOOKS } from "../domain/bible/bibleBooks";
import type {
  BibleBookId,
  BibleReference,
} from "../domain/bible/bibleReference";

export const DAILY_CONTENT_720_CYCLE_DAYS = 720 as const;

export type DailyVerse720 = Readonly<{
  day: number;
  themeId: string;
  theme: string;
  bookId: BibleBookId;
  bookName: string;
  testament: "AT" | "NT";
  chapter: number;
  verse: number;
  reference: string;
}>;

export type DailyNotificationStyle720 =
  | "motivadora"
  | "inspiradora"
  | "engajadora"
  | "inteligente"
  | "surpreendente"
  | "devocional";

export type DailyNotification720 = Readonly<{
  day: number;
  style: DailyNotificationStyle720;
  themeId: string;
  theme: string;
  title: string;
  body: string;
  phrase: string;
  biblicalReference: string;
  biblicalReferenceKey: Readonly<{
    bookId: BibleBookId;
    chapter: number;
    verse: number;
  }>;
  deeplink: string;
  ctaLabel: string;
}>;

export type DailyContent720 = Readonly<{
  cycleDay: number;
  verse: DailyVerse720;
  notification: DailyNotification720;
  bibleReference: BibleReference;
}>;

type JsonRecord = Record<string, unknown>;

const VERSE_DATASET_RAW: unknown = require("../data/datasets/Biblia_Jornada_720_Versiculos_do_Dia_v1.json");
const NOTIFICATION_DATASET_RAW: unknown = require("../data/datasets/Biblia_Jornada_720_Frases_Notificacoes_Diarias_v1.json");

function fail(code: string): never {
  throw new Error(`DAILY_CONTENT_720_${code}`);
}

function asRecord(value: unknown, label: string): JsonRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label}_NOT_OBJECT`);
  }

  return value as JsonRecord;
}

function requiredString(
  record: JsonRecord,
  key: string,
  label: string,
): string {
  const value = record[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    fail(`${label}_${key.toUpperCase()}_INVALID`);
  }

  return value;
}

function requiredInteger(
  record: JsonRecord,
  key: string,
  label: string,
): number {
  const value = record[key];

  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value <= 0
  ) {
    fail(`${label}_${key.toUpperCase()}_INVALID`);
  }

  return value;
}

function parseBookId(value: unknown, label: string): BibleBookId {
  if (
    typeof value !== "string" ||
    !BIBLE_BOOKS.some((book) => book.id === value)
  ) {
    fail(`${label}_BOOK_ID_INVALID`);
  }

  return value as BibleBookId;
}

function datasetCollection(
  raw: unknown,
  datasetId: string,
  collectionKey: string,
  label: string,
): readonly unknown[] {
  const record = asRecord(raw, label);

  if (requiredInteger(record, "schemaVersion", label) !== 1) {
    fail(`${label}_SCHEMA_VERSION_UNSUPPORTED`);
  }

  if (requiredString(record, "datasetId", label) !== datasetId) {
    fail(`${label}_DATASET_ID_MISMATCH`);
  }

  if (
    requiredInteger(record, "cycleDays", label) !==
    DAILY_CONTENT_720_CYCLE_DAYS
  ) {
    fail(`${label}_CYCLE_DAYS_MISMATCH`);
  }

  const collection = record[collectionKey];

  if (
    !Array.isArray(collection) ||
    collection.length !== DAILY_CONTENT_720_CYCLE_DAYS
  ) {
    fail(`${label}_${collectionKey.toUpperCase()}_COUNT_MISMATCH`);
  }

  return collection;
}

const VERSES = datasetCollection(
  VERSE_DATASET_RAW,
  "biblia-jornada-daily-verses-v1",
  "verses",
  "VERSE_DATASET",
);

const NOTIFICATIONS = datasetCollection(
  NOTIFICATION_DATASET_RAW,
  "biblia-jornada-daily-notifications-v1",
  "notifications",
  "NOTIFICATION_DATASET",
);

function assertCycleDay(cycleDay: number): void {
  if (
    !Number.isInteger(cycleDay) ||
    cycleDay < 1 ||
    cycleDay > DAILY_CONTENT_720_CYCLE_DAYS
  ) {
    fail(`INVALID_CYCLE_DAY:${String(cycleDay)}`);
  }
}

function parseVerse(
  raw: unknown,
  expectedDay: number,
): DailyVerse720 {
  const record = asRecord(raw, `VERSE_DAY_${expectedDay}`);
  const day = requiredInteger(record, "day", `VERSE_DAY_${expectedDay}`);

  if (day !== expectedDay) {
    fail(`VERSE_DAY_ORDER_MISMATCH:${expectedDay}:${day}`);
  }

  const testament = requiredString(
    record,
    "testament",
    `VERSE_DAY_${expectedDay}`,
  );

  if (testament !== "AT" && testament !== "NT") {
    fail(`VERSE_DAY_${expectedDay}_TESTAMENT_INVALID`);
  }

  return {
    day,
    themeId: requiredString(record, "themeId", `VERSE_DAY_${expectedDay}`),
    theme: requiredString(record, "theme", `VERSE_DAY_${expectedDay}`),
    bookId: parseBookId(record.bookId, `VERSE_DAY_${expectedDay}`),
    bookName: requiredString(record, "bookName", `VERSE_DAY_${expectedDay}`),
    testament,
    chapter: requiredInteger(record, "chapter", `VERSE_DAY_${expectedDay}`),
    verse: requiredInteger(record, "verse", `VERSE_DAY_${expectedDay}`),
    reference: requiredString(
      record,
      "reference",
      `VERSE_DAY_${expectedDay}`,
    ),
  };
}

function parseNotificationStyle(
  value: unknown,
  expectedDay: number,
): DailyNotificationStyle720 {
  if (
    value !== "motivadora" &&
    value !== "inspiradora" &&
    value !== "engajadora" &&
    value !== "inteligente" &&
    value !== "surpreendente" &&
    value !== "devocional"
  ) {
    fail(`NOTIFICATION_DAY_${expectedDay}_STYLE_INVALID`);
  }

  return value;
}

function parseNotification(
  raw: unknown,
  expectedDay: number,
): DailyNotification720 {
  const record = asRecord(raw, `NOTIFICATION_DAY_${expectedDay}`);
  const day = requiredInteger(
    record,
    "day",
    `NOTIFICATION_DAY_${expectedDay}`,
  );

  if (day !== expectedDay) {
    fail(`NOTIFICATION_DAY_ORDER_MISMATCH:${expectedDay}:${day}`);
  }

  const key = asRecord(
    record.biblicalReferenceKey,
    `NOTIFICATION_DAY_${expectedDay}_REFERENCE_KEY`,
  );

  return {
    day,
    style: parseNotificationStyle(record.style, expectedDay),
    themeId: requiredString(
      record,
      "themeId",
      `NOTIFICATION_DAY_${expectedDay}`,
    ),
    theme: requiredString(
      record,
      "theme",
      `NOTIFICATION_DAY_${expectedDay}`,
    ),
    title: requiredString(
      record,
      "title",
      `NOTIFICATION_DAY_${expectedDay}`,
    ),
    body: requiredString(
      record,
      "body",
      `NOTIFICATION_DAY_${expectedDay}`,
    ),
    phrase: requiredString(
      record,
      "phrase",
      `NOTIFICATION_DAY_${expectedDay}`,
    ),
    biblicalReference: requiredString(
      record,
      "biblicalReference",
      `NOTIFICATION_DAY_${expectedDay}`,
    ),
    biblicalReferenceKey: {
      bookId: parseBookId(
        key.bookId,
        `NOTIFICATION_DAY_${expectedDay}_REFERENCE_KEY`,
      ),
      chapter: requiredInteger(
        key,
        "chapter",
        `NOTIFICATION_DAY_${expectedDay}_REFERENCE_KEY`,
      ),
      verse: requiredInteger(
        key,
        "verse",
        `NOTIFICATION_DAY_${expectedDay}_REFERENCE_KEY`,
      ),
    },
    deeplink: requiredString(
      record,
      "deeplink",
      `NOTIFICATION_DAY_${expectedDay}`,
    ),
    ctaLabel: requiredString(
      record,
      "ctaLabel",
      `NOTIFICATION_DAY_${expectedDay}`,
    ),
  };
}

export function getDailyVerse720ByCycleDay(
  cycleDay: number,
): DailyVerse720 {
  assertCycleDay(cycleDay);
  return parseVerse(VERSES[cycleDay - 1], cycleDay);
}

export function getDailyNotification720ByCycleDay(
  cycleDay: number,
): DailyNotification720 {
  assertCycleDay(cycleDay);
  return parseNotification(NOTIFICATIONS[cycleDay - 1], cycleDay);
}

export function getDailyVerseBibleReference720ByCycleDay(
  cycleDay: number,
): BibleReference {
  const verse = getDailyVerse720ByCycleDay(cycleDay);

  return {
    passages: [
      {
        kind: "VERSE",
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
      },
    ],
  };
}

export function getDailyContent720ByCycleDay(
  cycleDay: number,
): DailyContent720 {
  const verse = getDailyVerse720ByCycleDay(cycleDay);
  const notification = getDailyNotification720ByCycleDay(cycleDay);

  if (
    notification.day !== verse.day ||
    notification.themeId !== verse.themeId ||
    notification.theme !== verse.theme ||
    notification.biblicalReference !== verse.reference ||
    notification.biblicalReferenceKey.bookId !== verse.bookId ||
    notification.biblicalReferenceKey.chapter !== verse.chapter ||
    notification.biblicalReferenceKey.verse !== verse.verse
  ) {
    fail(`PAIR_ALIGNMENT_MISMATCH:${cycleDay}`);
  }

  return {
    cycleDay,
    verse,
    notification,
    bibleReference: getDailyVerseBibleReference720ByCycleDay(cycleDay),
  };
}
