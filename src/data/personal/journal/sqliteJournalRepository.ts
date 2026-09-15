import type {
  SQLiteDatabase,
} from "expo-sqlite";

import type {
  BibleBookId,
  BiblePassage,
  BibleReference,
} from "../../../domain/bible/bibleReference";
import {
  JOURNAL_CATEGORIES,
  JOURNAL_ENTRY_STATUSES,
  JOURNAL_GRATITUDE_MAX_CHARS,
  JOURNAL_REFLECTION_MAX_CHARS,
  JOURNAL_SOURCE_TYPES,
  type JournalEntry,
  type JournalCategory,
  type JournalEntryId,
  type JournalEntryReference,
  type JournalEntryReferenceId,
  type JournalEntryStatus,
  type JournalSourceType,
  type JournalTag,
  type JournalTagId,
} from "../../../domain/journal/journal";
import type {
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../../../domain/personal/personalTime";
import type {
  PersonalDatabase,
} from "../personalDatabase";
import {
  PersonalRepositoryBase,
} from "../personalRepositoryBase";
import type {
  JournalEntryPersistenceRecord,
  JournalRepository,
  JournalSearchPage,
  JournalSearchQuery,
} from "./journalRepository";

type JournalEntryRow = Readonly<{
  id: unknown;
  entry_date: unknown;
  reflection_text: unknown;
  gratitude_text: unknown;
  status: unknown;
  source_type: unknown;
  source_title_snapshot: unknown;
  prompt_snapshot: unknown;
  category: unknown;
  is_pinned: unknown;
  created_at_utc: unknown;
  updated_at_utc: unknown;
}>;

type JournalReferenceRow = Readonly<{
  id: unknown;
  entry_id: unknown;
  position: unknown;
}>;

type JournalPassageRow = Readonly<{
  reference_id: unknown;
  position: unknown;
  kind: unknown;
  book_id: unknown;
  start_chapter: unknown;
  start_verse: unknown;
  end_chapter: unknown;
  end_verse: unknown;
}>;

type JournalTagRow = Readonly<{
  id: unknown;
  name: unknown;
  normalized_name: unknown;
}>;

function assertNonEmptyString(
  value: unknown,
  errorCode: string,
): asserts value is string {
  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    throw new Error(errorCode);
  }
}

function assertNullableString(
  value: unknown,
  errorCode: string,
): asserts value is string | null {
  if (value !== null && typeof value !== "string") {
    throw new Error(errorCode);
  }
}

function assertValidLocalDate(
  value: unknown,
  errorCode: string,
): asserts value is PersonalLocalDate {
  assertNonEmptyString(value, errorCode);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(errorCode);
  }

  const parsed = new Date(
    `${value}T00:00:00.000Z`,
  );

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value
  ) {
    throw new Error(errorCode);
  }
}

function assertValidUtcTimestamp(
  value: unknown,
  errorCode: string,
): asserts value is PersonalUtcTimestamp {
  assertNonEmptyString(value, errorCode);

  if (
    !value.endsWith("Z") ||
    Number.isNaN(Date.parse(value))
  ) {
    throw new Error(errorCode);
  }
}

function assertValidOptionalText(
  value: unknown,
  maxChars: number,
  errorCode: string,
): asserts value is string | null {
  if (value === null) {
    return;
  }

  if (
    typeof value !== "string" ||
    value.trim().length === 0 ||
    value.length > maxChars
  ) {
    throw new Error(errorCode);
  }
}

function isJournalEntryStatus(
  value: unknown,
): value is JournalEntryStatus {
  return JOURNAL_ENTRY_STATUSES.some(
    (status) => status === value,
  );
}

function isJournalSourceType(
  value: unknown,
): value is JournalSourceType {
  return JOURNAL_SOURCE_TYPES.some(
    (sourceType) => sourceType === value,
  );
}

function isJournalCategory(
  value: unknown,
): value is JournalCategory {
  return JOURNAL_CATEGORIES.some(
    (category) => category === value,
  );
}

function assertNullableJournalCategory(
  value: unknown,
  errorCode: string,
): asserts value is JournalCategory | null {
  if (value !== null && !isJournalCategory(value)) {
    throw new Error(errorCode);
  }
}

function mapSqliteBoolean(
  value: unknown,
  errorCode: string,
): boolean {
  if (value === 0) {
    return false;
  }

  if (value === 1) {
    return true;
  }

  throw new Error(errorCode);
}

function assertNonNegativeInteger(
  value: unknown,
  errorCode: string,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 0
  ) {
    throw new Error(errorCode);
  }
}

function assertPositiveInteger(
  value: unknown,
  errorCode: string,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value <= 0
  ) {
    throw new Error(errorCode);
  }
}

function assertNull(
  value: unknown,
  errorCode: string,
): asserts value is null {
  if (value !== null) {
    throw new Error(errorCode);
  }
}

function assertJournalEntryCore(
  entry: JournalEntry,
  allowEmptyContent: boolean,
): void {
  assertNonEmptyString(
    entry.id,
    "PERSONAL_JOURNAL_ENTRY_ID_INVALID",
  );
  assertValidLocalDate(
    entry.entryDate,
    "PERSONAL_JOURNAL_ENTRY_DATE_INVALID",
  );
  assertValidOptionalText(
    entry.reflectionText,
    JOURNAL_REFLECTION_MAX_CHARS,
    "PERSONAL_JOURNAL_REFLECTION_TEXT_INVALID",
  );
  assertValidOptionalText(
    entry.gratitudeText,
    JOURNAL_GRATITUDE_MAX_CHARS,
    "PERSONAL_JOURNAL_GRATITUDE_TEXT_INVALID",
  );
  assertValidUtcTimestamp(
    entry.createdAtUtc,
    "PERSONAL_JOURNAL_CREATED_AT_UTC_INVALID",
  );
  assertValidUtcTimestamp(
    entry.updatedAtUtc,
    "PERSONAL_JOURNAL_UPDATED_AT_UTC_INVALID",
  );

  if (
    !allowEmptyContent &&
    entry.reflectionText === null &&
    entry.gratitudeText === null
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED",
    );
  }
}

function hasAnyPersistenceField(
  entry: JournalEntry | JournalEntryPersistenceRecord,
): boolean {
  return (
    "status" in entry ||
    "sourceType" in entry ||
    "sourceTitleSnapshot" in entry ||
    "promptSnapshot" in entry ||
    "category" in entry ||
    "isPinned" in entry ||
    "references" in entry ||
    "tags" in entry
  );
}

function assertValidBiblePassage(
  passage: BiblePassage,
): void {
  assertNonEmptyString(
    passage.bookId,
    "PERSONAL_JOURNAL_REFERENCE_BOOK_ID_INVALID",
  );

  switch (passage.kind) {
    case "WHOLE_BOOK":
      return;

    case "CHAPTER":
      assertPositiveInteger(
        passage.chapter,
        "PERSONAL_JOURNAL_REFERENCE_CHAPTER_INVALID",
      );
      return;

    case "CHAPTER_RANGE":
      assertPositiveInteger(
        passage.startChapter,
        "PERSONAL_JOURNAL_REFERENCE_START_CHAPTER_INVALID",
      );
      assertPositiveInteger(
        passage.endChapter,
        "PERSONAL_JOURNAL_REFERENCE_END_CHAPTER_INVALID",
      );

      if (passage.endChapter < passage.startChapter) {
        throw new Error(
          "PERSONAL_JOURNAL_REFERENCE_CHAPTER_RANGE_INVALID",
        );
      }
      return;

    case "VERSE":
      assertPositiveInteger(
        passage.chapter,
        "PERSONAL_JOURNAL_REFERENCE_CHAPTER_INVALID",
      );
      assertPositiveInteger(
        passage.verse,
        "PERSONAL_JOURNAL_REFERENCE_VERSE_INVALID",
      );
      return;

    case "VERSE_RANGE":
      assertPositiveInteger(
        passage.start.chapter,
        "PERSONAL_JOURNAL_REFERENCE_START_CHAPTER_INVALID",
      );
      assertPositiveInteger(
        passage.start.verse,
        "PERSONAL_JOURNAL_REFERENCE_START_VERSE_INVALID",
      );
      assertPositiveInteger(
        passage.end.chapter,
        "PERSONAL_JOURNAL_REFERENCE_END_CHAPTER_INVALID",
      );
      assertPositiveInteger(
        passage.end.verse,
        "PERSONAL_JOURNAL_REFERENCE_END_VERSE_INVALID",
      );

      if (
        passage.end.chapter < passage.start.chapter ||
        (
          passage.end.chapter === passage.start.chapter &&
          passage.end.verse < passage.start.verse
        )
      ) {
        throw new Error(
          "PERSONAL_JOURNAL_REFERENCE_VERSE_RANGE_INVALID",
        );
      }
      return;
  }
}

function assertValidJournalReference(
  reference: JournalEntryReference,
  entryId: JournalEntryId,
): void {
  assertNonEmptyString(
    reference.id,
    "PERSONAL_JOURNAL_REFERENCE_ID_INVALID",
  );

  if (reference.entryId !== entryId) {
    throw new Error(
      "PERSONAL_JOURNAL_REFERENCE_ENTRY_ID_MISMATCH",
    );
  }

  assertNonNegativeInteger(
    reference.position,
    "PERSONAL_JOURNAL_REFERENCE_POSITION_INVALID",
  );

  if (
    !Array.isArray(reference.reference.passages) ||
    reference.reference.passages.length === 0
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_REFERENCE_PASSAGES_REQUIRED",
    );
  }

  for (const passage of reference.reference.passages) {
    assertValidBiblePassage(passage);
  }
}

function assertValidJournalTag(
  tag: JournalTag,
): void {
  assertNonEmptyString(
    tag.id,
    "PERSONAL_JOURNAL_TAG_ID_INVALID",
  );
  assertNonEmptyString(
    tag.name,
    "PERSONAL_JOURNAL_TAG_NAME_INVALID",
  );
  assertNonEmptyString(
    tag.normalizedName,
    "PERSONAL_JOURNAL_TAG_NORMALIZED_NAME_INVALID",
  );
}

function assertValidPersistenceRecord(
  entry: JournalEntry | JournalEntryPersistenceRecord,
): asserts entry is JournalEntryPersistenceRecord {
  const candidate =
    entry as Partial<JournalEntryPersistenceRecord>;

  if (!isJournalEntryStatus(candidate.status)) {
    throw new Error(
      "PERSONAL_JOURNAL_ENTRY_STATUS_INVALID",
    );
  }

  if (!isJournalSourceType(candidate.sourceType)) {
    throw new Error(
      "PERSONAL_JOURNAL_ENTRY_SOURCE_TYPE_INVALID",
    );
  }

  assertNullableString(
    candidate.sourceTitleSnapshot,
    "PERSONAL_JOURNAL_SOURCE_TITLE_SNAPSHOT_INVALID",
  );
  assertNullableString(
    candidate.promptSnapshot,
    "PERSONAL_JOURNAL_PROMPT_SNAPSHOT_INVALID",
  );
  assertNullableJournalCategory(
    candidate.category,
    "PERSONAL_JOURNAL_CATEGORY_INVALID",
  );

  if (typeof candidate.isPinned !== "boolean") {
    throw new Error(
      "PERSONAL_JOURNAL_IS_PINNED_INVALID",
    );
  }

  if (!Array.isArray(candidate.references)) {
    throw new Error(
      "PERSONAL_JOURNAL_REFERENCES_INVALID",
    );
  }

  if (!Array.isArray(candidate.tags)) {
    throw new Error(
      "PERSONAL_JOURNAL_TAGS_INVALID",
    );
  }

  assertJournalEntryCore(
    entry,
    candidate.status === "DRAFT",
  );

  const referenceIds = new Set<string>();
  const referencePositions = new Set<number>();

  for (const reference of candidate.references) {
    assertValidJournalReference(reference, entry.id);

    if (referenceIds.has(reference.id)) {
      throw new Error(
        "PERSONAL_JOURNAL_REFERENCE_ID_DUPLICATE",
      );
    }

    if (referencePositions.has(reference.position)) {
      throw new Error(
        "PERSONAL_JOURNAL_REFERENCE_POSITION_DUPLICATE",
      );
    }

    referenceIds.add(reference.id);
    referencePositions.add(reference.position);
  }

  const tagIds = new Set<string>();
  const normalizedNames = new Set<string>();

  for (const tag of candidate.tags) {
    assertValidJournalTag(tag);

    if (tagIds.has(tag.id)) {
      throw new Error(
        "PERSONAL_JOURNAL_TAG_ID_DUPLICATE",
      );
    }

    if (normalizedNames.has(tag.normalizedName)) {
      throw new Error(
        "PERSONAL_JOURNAL_TAG_NORMALIZED_NAME_DUPLICATE",
      );
    }

    tagIds.add(tag.id);
    normalizedNames.add(tag.normalizedName);
  }
}

function mapJournalEntryRowBase(
  row: JournalEntryRow,
): Omit<
  JournalEntryPersistenceRecord,
  "references" | "tags"
> {
  assertNonEmptyString(
    row.id,
    "PERSONAL_JOURNAL_ROW_ID_INVALID",
  );
  assertValidLocalDate(
    row.entry_date,
    "PERSONAL_JOURNAL_ROW_ENTRY_DATE_INVALID",
  );
  assertValidOptionalText(
    row.reflection_text,
    JOURNAL_REFLECTION_MAX_CHARS,
    "PERSONAL_JOURNAL_ROW_REFLECTION_TEXT_INVALID",
  );
  assertValidOptionalText(
    row.gratitude_text,
    JOURNAL_GRATITUDE_MAX_CHARS,
    "PERSONAL_JOURNAL_ROW_GRATITUDE_TEXT_INVALID",
  );

  if (!isJournalEntryStatus(row.status)) {
    throw new Error(
      "PERSONAL_JOURNAL_ROW_STATUS_INVALID",
    );
  }

  if (!isJournalSourceType(row.source_type)) {
    throw new Error(
      "PERSONAL_JOURNAL_ROW_SOURCE_TYPE_INVALID",
    );
  }

  assertNullableString(
    row.source_title_snapshot,
    "PERSONAL_JOURNAL_ROW_SOURCE_TITLE_SNAPSHOT_INVALID",
  );
  assertNullableString(
    row.prompt_snapshot,
    "PERSONAL_JOURNAL_ROW_PROMPT_SNAPSHOT_INVALID",
  );
  assertNullableJournalCategory(
    row.category,
    "PERSONAL_JOURNAL_ROW_CATEGORY_INVALID",
  );
  const isPinned = mapSqliteBoolean(
    row.is_pinned,
    "PERSONAL_JOURNAL_ROW_IS_PINNED_INVALID",
  );
  assertValidUtcTimestamp(
    row.created_at_utc,
    "PERSONAL_JOURNAL_ROW_CREATED_AT_UTC_INVALID",
  );
  assertValidUtcTimestamp(
    row.updated_at_utc,
    "PERSONAL_JOURNAL_ROW_UPDATED_AT_UTC_INVALID",
  );

  if (
    row.status !== "DRAFT" &&
    row.reflection_text === null &&
    row.gratitude_text === null
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_ROW_CONTENT_REQUIRED",
    );
  }

  return {
    id: row.id as JournalEntryId,
    entryDate: row.entry_date,
    reflectionText: row.reflection_text,
    gratitudeText: row.gratitude_text,
    status: row.status,
    sourceType: row.source_type,
    sourceTitleSnapshot: row.source_title_snapshot,
    promptSnapshot: row.prompt_snapshot,
    category: row.category,
    isPinned,
    createdAtUtc: row.created_at_utc,
    updatedAtUtc: row.updated_at_utc,
  };
}

function mapPassageRow(
  row: JournalPassageRow,
  expectedReferenceId: JournalEntryReferenceId,
): BiblePassage {
  assertNonEmptyString(
    row.reference_id,
    "PERSONAL_JOURNAL_PASSAGE_REFERENCE_ID_INVALID",
  );

  if (row.reference_id !== expectedReferenceId) {
    throw new Error(
      "PERSONAL_JOURNAL_PASSAGE_REFERENCE_ID_MISMATCH",
    );
  }

  assertNonNegativeInteger(
    row.position,
    "PERSONAL_JOURNAL_PASSAGE_POSITION_INVALID",
  );
  assertNonEmptyString(
    row.book_id,
    "PERSONAL_JOURNAL_PASSAGE_BOOK_ID_INVALID",
  );

  const bookId = row.book_id as BibleBookId;

  switch (row.kind) {
    case "WHOLE_BOOK":
      assertNull(
        row.start_chapter,
        "PERSONAL_JOURNAL_PASSAGE_WHOLE_BOOK_INVALID",
      );
      assertNull(
        row.start_verse,
        "PERSONAL_JOURNAL_PASSAGE_WHOLE_BOOK_INVALID",
      );
      assertNull(
        row.end_chapter,
        "PERSONAL_JOURNAL_PASSAGE_WHOLE_BOOK_INVALID",
      );
      assertNull(
        row.end_verse,
        "PERSONAL_JOURNAL_PASSAGE_WHOLE_BOOK_INVALID",
      );

      return {
        kind: "WHOLE_BOOK",
        bookId,
      };

    case "CHAPTER":
      assertPositiveInteger(
        row.start_chapter,
        "PERSONAL_JOURNAL_PASSAGE_CHAPTER_INVALID",
      );
      assertNull(
        row.start_verse,
        "PERSONAL_JOURNAL_PASSAGE_CHAPTER_INVALID",
      );
      assertNull(
        row.end_chapter,
        "PERSONAL_JOURNAL_PASSAGE_CHAPTER_INVALID",
      );
      assertNull(
        row.end_verse,
        "PERSONAL_JOURNAL_PASSAGE_CHAPTER_INVALID",
      );

      return {
        kind: "CHAPTER",
        bookId,
        chapter: row.start_chapter,
      };

    case "CHAPTER_RANGE":
      assertPositiveInteger(
        row.start_chapter,
        "PERSONAL_JOURNAL_PASSAGE_CHAPTER_RANGE_INVALID",
      );
      assertPositiveInteger(
        row.end_chapter,
        "PERSONAL_JOURNAL_PASSAGE_CHAPTER_RANGE_INVALID",
      );
      assertNull(
        row.start_verse,
        "PERSONAL_JOURNAL_PASSAGE_CHAPTER_RANGE_INVALID",
      );
      assertNull(
        row.end_verse,
        "PERSONAL_JOURNAL_PASSAGE_CHAPTER_RANGE_INVALID",
      );

      if (row.end_chapter < row.start_chapter) {
        throw new Error(
          "PERSONAL_JOURNAL_PASSAGE_CHAPTER_RANGE_INVALID",
        );
      }

      return {
        kind: "CHAPTER_RANGE",
        bookId,
        startChapter: row.start_chapter,
        endChapter: row.end_chapter,
      };

    case "VERSE":
      assertPositiveInteger(
        row.start_chapter,
        "PERSONAL_JOURNAL_PASSAGE_VERSE_INVALID",
      );
      assertPositiveInteger(
        row.start_verse,
        "PERSONAL_JOURNAL_PASSAGE_VERSE_INVALID",
      );
      assertNull(
        row.end_chapter,
        "PERSONAL_JOURNAL_PASSAGE_VERSE_INVALID",
      );
      assertNull(
        row.end_verse,
        "PERSONAL_JOURNAL_PASSAGE_VERSE_INVALID",
      );

      return {
        kind: "VERSE",
        bookId,
        chapter: row.start_chapter,
        verse: row.start_verse,
      };

    case "VERSE_RANGE":
      assertPositiveInteger(
        row.start_chapter,
        "PERSONAL_JOURNAL_PASSAGE_VERSE_RANGE_INVALID",
      );
      assertPositiveInteger(
        row.start_verse,
        "PERSONAL_JOURNAL_PASSAGE_VERSE_RANGE_INVALID",
      );
      assertPositiveInteger(
        row.end_chapter,
        "PERSONAL_JOURNAL_PASSAGE_VERSE_RANGE_INVALID",
      );
      assertPositiveInteger(
        row.end_verse,
        "PERSONAL_JOURNAL_PASSAGE_VERSE_RANGE_INVALID",
      );

      if (
        row.end_chapter < row.start_chapter ||
        (
          row.end_chapter === row.start_chapter &&
          row.end_verse < row.start_verse
        )
      ) {
        throw new Error(
          "PERSONAL_JOURNAL_PASSAGE_VERSE_RANGE_INVALID",
        );
      }

      return {
        kind: "VERSE_RANGE",
        bookId,
        start: {
          chapter: row.start_chapter,
          verse: row.start_verse,
        },
        end: {
          chapter: row.end_chapter,
          verse: row.end_verse,
        },
      };

    default:
      throw new Error(
        "PERSONAL_JOURNAL_PASSAGE_KIND_INVALID",
      );
  }
}

function toPassageColumns(
  passage: BiblePassage,
): readonly [
  BiblePassage["kind"],
  BibleBookId,
  number | null,
  number | null,
  number | null,
  number | null,
] {
  assertValidBiblePassage(passage);

  switch (passage.kind) {
    case "WHOLE_BOOK":
      return [
        passage.kind,
        passage.bookId,
        null,
        null,
        null,
        null,
      ];

    case "CHAPTER":
      return [
        passage.kind,
        passage.bookId,
        passage.chapter,
        null,
        null,
        null,
      ];

    case "CHAPTER_RANGE":
      return [
        passage.kind,
        passage.bookId,
        passage.startChapter,
        null,
        passage.endChapter,
        null,
      ];

    case "VERSE":
      return [
        passage.kind,
        passage.bookId,
        passage.chapter,
        passage.verse,
        null,
        null,
      ];

    case "VERSE_RANGE":
      return [
        passage.kind,
        passage.bookId,
        passage.start.chapter,
        passage.start.verse,
        passage.end.chapter,
        passage.end.verse,
      ];
  }
}

function mapJournalTagRow(
  row: JournalTagRow,
): JournalTag {
  assertNonEmptyString(
    row.id,
    "PERSONAL_JOURNAL_TAG_ROW_ID_INVALID",
  );
  assertNonEmptyString(
    row.name,
    "PERSONAL_JOURNAL_TAG_ROW_NAME_INVALID",
  );
  assertNonEmptyString(
    row.normalized_name,
    "PERSONAL_JOURNAL_TAG_ROW_NORMALIZED_NAME_INVALID",
  );

  return {
    id: row.id as JournalTagId,
    name: row.name,
    normalizedName: row.normalized_name,
  };
}

async function loadReferences(
  database: SQLiteDatabase,
  entryId: JournalEntryId,
): Promise<readonly JournalEntryReference[]> {
  const rows =
    await database.getAllAsync<JournalReferenceRow>(
      `
SELECT
  id,
  entry_id,
  position
FROM personal_journal_entry_references
WHERE entry_id = ?
ORDER BY position ASC, id ASC
`,
      entryId,
    );

  const result: JournalEntryReference[] = [];
  const positions = new Set<number>();
  const ids = new Set<string>();

  for (const row of rows) {
    assertNonEmptyString(
      row.id,
      "PERSONAL_JOURNAL_REFERENCE_ROW_ID_INVALID",
    );
    assertNonEmptyString(
      row.entry_id,
      "PERSONAL_JOURNAL_REFERENCE_ROW_ENTRY_ID_INVALID",
    );

    if (row.entry_id !== entryId) {
      throw new Error(
        "PERSONAL_JOURNAL_REFERENCE_ROW_ENTRY_ID_MISMATCH",
      );
    }

    assertNonNegativeInteger(
      row.position,
      "PERSONAL_JOURNAL_REFERENCE_ROW_POSITION_INVALID",
    );

    if (ids.has(row.id)) {
      throw new Error(
        "PERSONAL_JOURNAL_REFERENCE_ROW_ID_DUPLICATE",
      );
    }

    if (positions.has(row.position)) {
      throw new Error(
        "PERSONAL_JOURNAL_REFERENCE_ROW_POSITION_DUPLICATE",
      );
    }

    ids.add(row.id);
    positions.add(row.position);

    const referenceId =
      row.id as JournalEntryReferenceId;

    const passageRows =
      await database.getAllAsync<JournalPassageRow>(
        `
SELECT
  reference_id,
  position,
  kind,
  book_id,
  start_chapter,
  start_verse,
  end_chapter,
  end_verse
FROM personal_journal_reference_passages
WHERE reference_id = ?
ORDER BY position ASC
`,
        referenceId,
      );

    if (passageRows.length === 0) {
      throw new Error(
        "PERSONAL_JOURNAL_REFERENCE_ROW_PASSAGES_REQUIRED",
      );
    }

    const passagePositions = new Set<number>();
    const passages: BiblePassage[] = [];

    for (const passageRow of passageRows) {
      assertNonNegativeInteger(
        passageRow.position,
        "PERSONAL_JOURNAL_PASSAGE_POSITION_INVALID",
      );

      if (passagePositions.has(passageRow.position)) {
        throw new Error(
          "PERSONAL_JOURNAL_PASSAGE_POSITION_DUPLICATE",
        );
      }

      passagePositions.add(passageRow.position);
      passages.push(
        mapPassageRow(
          passageRow,
          referenceId,
        ),
      );
    }

    const reference: BibleReference = {
      passages: passages as [
        BiblePassage,
        ...BiblePassage[],
      ],
    };

    result.push({
      id: referenceId,
      entryId,
      position: row.position,
      reference,
    });
  }

  return result;
}

async function loadTags(
  database: SQLiteDatabase,
  entryId: JournalEntryId,
): Promise<readonly JournalTag[]> {
  const rows =
    await database.getAllAsync<JournalTagRow>(
      `
SELECT
  tag.id,
  tag.name,
  tag.normalized_name
FROM personal_journal_entry_tags AS entry_tag
INNER JOIN personal_journal_tags AS tag
  ON tag.id = entry_tag.tag_id
WHERE entry_tag.entry_id = ?
ORDER BY tag.normalized_name ASC, tag.id ASC
`,
      entryId,
    );

  const tags = rows.map(mapJournalTagRow);
  const ids = new Set<string>();
  const normalizedNames = new Set<string>();

  for (const tag of tags) {
    if (ids.has(tag.id)) {
      throw new Error(
        "PERSONAL_JOURNAL_TAG_ROW_ID_DUPLICATE",
      );
    }

    if (normalizedNames.has(tag.normalizedName)) {
      throw new Error(
        "PERSONAL_JOURNAL_TAG_ROW_NORMALIZED_NAME_DUPLICATE",
      );
    }

    ids.add(tag.id);
    normalizedNames.add(tag.normalizedName);
  }

  return tags;
}

async function loadPersistenceRecord(
  database: SQLiteDatabase,
  row: JournalEntryRow,
): Promise<JournalEntryPersistenceRecord> {
  const base = mapJournalEntryRowBase(row);
  const references = await loadReferences(
    database,
    base.id,
  );
  const tags = await loadTags(
    database,
    base.id,
  );

  return {
    ...base,
    references,
    tags,
  };
}

async function insertEntry(
  database: SQLiteDatabase,
  entry: JournalEntry,
  status: JournalEntryStatus,
  sourceType: JournalSourceType,
  sourceTitleSnapshot: string | null,
  promptSnapshot: string | null,
  category: JournalCategory | null,
  isPinned: boolean,
): Promise<void> {
  await database.runAsync(
    `
INSERT INTO personal_journal_entries (
  id,
  entry_date,
  reflection_text,
  gratitude_text,
  status,
  source_type,
  source_title_snapshot,
  prompt_snapshot,
  category,
  is_pinned,
  created_at_utc,
  updated_at_utc
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`,
    entry.id,
    entry.entryDate,
    entry.reflectionText,
    entry.gratitudeText,
    status,
    sourceType,
    sourceTitleSnapshot,
    promptSnapshot,
    category,
    isPinned ? 1 : 0,
    entry.createdAtUtc,
    entry.updatedAtUtc,
  );
}

async function persistReferences(
  database: SQLiteDatabase,
  entry: JournalEntryPersistenceRecord,
): Promise<void> {
  const references = [...entry.references].sort(
    (left, right) => left.position - right.position,
  );

  for (const reference of references) {
    await database.runAsync(
      `
INSERT INTO personal_journal_entry_references (
  id,
  entry_id,
  position
)
VALUES (?, ?, ?)
`,
      reference.id,
      entry.id,
      reference.position,
    );

    for (
      let passagePosition = 0;
      passagePosition < reference.reference.passages.length;
      passagePosition += 1
    ) {
      const passage =
        reference.reference.passages[passagePosition];

      const [
        kind,
        bookId,
        startChapter,
        startVerse,
        endChapter,
        endVerse,
      ] = toPassageColumns(passage);

      await database.runAsync(
        `
INSERT INTO personal_journal_reference_passages (
  reference_id,
  position,
  kind,
  book_id,
  start_chapter,
  start_verse,
  end_chapter,
  end_verse
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`,
        reference.id,
        passagePosition,
        kind,
        bookId,
        startChapter,
        startVerse,
        endChapter,
        endVerse,
      );
    }
  }
}

async function ensureTagCanonical(
  database: SQLiteDatabase,
  tag: JournalTag,
): Promise<void> {
  const existing =
    await database.getFirstAsync<JournalTagRow>(
      `
SELECT
  id,
  name,
  normalized_name
FROM personal_journal_tags
WHERE id = ? OR normalized_name = ?
ORDER BY
  CASE WHEN id = ? THEN 0 ELSE 1 END,
  id ASC
LIMIT 1
`,
      tag.id,
      tag.normalizedName,
      tag.id,
    );

  if (existing === null) {
    await database.runAsync(
      `
INSERT INTO personal_journal_tags (
  id,
  name,
  normalized_name
)
VALUES (?, ?, ?)
`,
      tag.id,
      tag.name,
      tag.normalizedName,
    );
    return;
  }

  const mapped = mapJournalTagRow(existing);

  if (
    mapped.id !== tag.id ||
    mapped.name !== tag.name ||
    mapped.normalizedName !== tag.normalizedName
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_TAG_CANONICAL_CONFLICT",
    );
  }
}

async function persistTags(
  database: SQLiteDatabase,
  entry: JournalEntryPersistenceRecord,
): Promise<void> {
  for (const tag of entry.tags) {
    await ensureTagCanonical(database, tag);

    await database.runAsync(
      `
INSERT INTO personal_journal_entry_tags (
  entry_id,
  tag_id
)
VALUES (?, ?)
`,
      entry.id,
      tag.id,
    );
  }
}

function escapeLikePattern(
  value: string,
): string {
  return value.replace(/[\\%_]/g, "\\$&");
}

function validateSearchQuery(
  query: JournalSearchQuery,
): void {
  assertNonNegativeInteger(
    query.offset,
    "PERSONAL_JOURNAL_SEARCH_OFFSET_INVALID",
  );
  assertPositiveInteger(
    query.limit,
    "PERSONAL_JOURNAL_SEARCH_LIMIT_INVALID",
  );

  if (
    query.text !== undefined &&
    typeof query.text !== "string"
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_SEARCH_TEXT_INVALID",
    );
  }

  if (
    query.category !== undefined &&
    query.category !== null &&
    !isJournalCategory(query.category)
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_SEARCH_CATEGORY_INVALID",
    );
  }

  if (query.tagId !== undefined) {
    assertNonEmptyString(
      query.tagId,
      "PERSONAL_JOURNAL_SEARCH_TAG_ID_INVALID",
    );
  }

  if (query.dateFrom !== undefined) {
    assertValidLocalDate(
      query.dateFrom,
      "PERSONAL_JOURNAL_SEARCH_DATE_FROM_INVALID",
    );
  }

  if (query.dateTo !== undefined) {
    assertValidLocalDate(
      query.dateTo,
      "PERSONAL_JOURNAL_SEARCH_DATE_TO_INVALID",
    );
  }

  if (
    query.dateFrom !== undefined &&
    query.dateTo !== undefined &&
    query.dateFrom > query.dateTo
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_SEARCH_DATE_RANGE_INVALID",
    );
  }

  if (
    query.isPinned !== undefined &&
    typeof query.isPinned !== "boolean"
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_SEARCH_PIN_INVALID",
    );
  }

  if (query.passage === undefined) {
    return;
  }

  assertNonEmptyString(
    query.passage.bookId,
    "PERSONAL_JOURNAL_SEARCH_PASSAGE_BOOK_ID_INVALID",
  );

  if (query.passage.chapter !== undefined) {
    assertPositiveInteger(
      query.passage.chapter,
      "PERSONAL_JOURNAL_SEARCH_PASSAGE_CHAPTER_INVALID",
    );
  }

  if (query.passage.verse !== undefined) {
    assertPositiveInteger(
      query.passage.verse,
      "PERSONAL_JOURNAL_SEARCH_PASSAGE_VERSE_INVALID",
    );

    if (query.passage.chapter === undefined) {
      throw new Error(
        "PERSONAL_JOURNAL_SEARCH_PASSAGE_CHAPTER_REQUIRED",
      );
    }
  }
}

function appendPassageSearch(
  whereParts: string[],
  parameters: (string | number)[],
  query: JournalSearchQuery,
): void {
  const passage = query.passage;

  if (passage === undefined) {
    return;
  }

  if (passage.chapter === undefined) {
    whereParts.push(`
EXISTS (
  SELECT 1
  FROM personal_journal_entry_references AS search_reference
  INNER JOIN personal_journal_reference_passages AS search_passage
    ON search_passage.reference_id = search_reference.id
  WHERE search_reference.entry_id = personal_journal_entries.id
    AND search_passage.book_id = ?
)
`);
    parameters.push(passage.bookId);
    return;
  }

  const chapter = passage.chapter;

  if (passage.verse === undefined) {
    whereParts.push(`
EXISTS (
  SELECT 1
  FROM personal_journal_entry_references AS search_reference
  INNER JOIN personal_journal_reference_passages AS search_passage
    ON search_passage.reference_id = search_reference.id
  WHERE search_reference.entry_id = personal_journal_entries.id
    AND search_passage.book_id = ?
    AND (
      search_passage.kind = 'WHOLE_BOOK'
      OR (
        search_passage.kind = 'CHAPTER'
        AND search_passage.start_chapter = ?
      )
      OR (
        search_passage.kind = 'CHAPTER_RANGE'
        AND search_passage.start_chapter <= ?
        AND search_passage.end_chapter >= ?
      )
      OR (
        search_passage.kind = 'VERSE'
        AND search_passage.start_chapter = ?
      )
      OR (
        search_passage.kind = 'VERSE_RANGE'
        AND search_passage.start_chapter <= ?
        AND search_passage.end_chapter >= ?
      )
    )
)
`);
    parameters.push(
      passage.bookId,
      chapter,
      chapter,
      chapter,
      chapter,
      chapter,
      chapter,
    );
    return;
  }

  const verse = passage.verse;

  whereParts.push(`
EXISTS (
  SELECT 1
  FROM personal_journal_entry_references AS search_reference
  INNER JOIN personal_journal_reference_passages AS search_passage
    ON search_passage.reference_id = search_reference.id
  WHERE search_reference.entry_id = personal_journal_entries.id
    AND search_passage.book_id = ?
    AND (
      search_passage.kind = 'WHOLE_BOOK'
      OR (
        search_passage.kind = 'CHAPTER'
        AND search_passage.start_chapter = ?
      )
      OR (
        search_passage.kind = 'CHAPTER_RANGE'
        AND search_passage.start_chapter <= ?
        AND search_passage.end_chapter >= ?
      )
      OR (
        search_passage.kind = 'VERSE'
        AND search_passage.start_chapter = ?
        AND search_passage.start_verse = ?
      )
      OR (
        search_passage.kind = 'VERSE_RANGE'
        AND (
          search_passage.start_chapter < ?
          OR (
            search_passage.start_chapter = ?
            AND search_passage.start_verse <= ?
          )
        )
        AND (
          search_passage.end_chapter > ?
          OR (
            search_passage.end_chapter = ?
            AND search_passage.end_verse >= ?
          )
        )
      )
    )
)
`);

  parameters.push(
    passage.bookId,
    chapter,
    chapter,
    chapter,
    chapter,
    verse,
    chapter,
    chapter,
    verse,
    chapter,
    chapter,
    verse,
  );
}

const ENTRY_COLUMNS_SQL = `
SELECT
  id,
  entry_date,
  reflection_text,
  gratitude_text,
  status,
  source_type,
  source_title_snapshot,
  prompt_snapshot,
  category,
  is_pinned,
  created_at_utc,
  updated_at_utc
FROM personal_journal_entries
`;

export class SQLiteJournalRepository
  extends PersonalRepositoryBase
  implements JournalRepository
{
  // Intentionally widens the protected base constructor for hub composition.
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    personalDatabase: PersonalDatabase,
  ) {
    super(personalDatabase);
  }

  async list(): Promise<
    readonly JournalEntryPersistenceRecord[]
  > {
    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<JournalEntryRow>(
            `${ENTRY_COLUMNS_SQL}
ORDER BY entry_date DESC, id DESC
`,
          );

        return Promise.all(
          rows.map(
            (row) =>
              loadPersistenceRecord(
                database,
                row,
              ),
          ),
        );
      },
    );
  }

  async search(
    query: JournalSearchQuery,
  ): Promise<JournalSearchPage> {
    validateSearchQuery(query);

    return this.personalDatabase.withConnection(
      async (database) => {
        const whereParts: string[] = [
          "status IN ('ACTIVE', 'DRAFT')",
        ];
        const parameters: (string | number)[] = [];

        const text = query.text?.trim();

        if (text !== undefined && text.length > 0) {
          const pattern =
            `%${escapeLikePattern(text)}%`;

          whereParts.push(`(
  COALESCE(reflection_text, '') LIKE ? ESCAPE '\\'
  OR COALESCE(gratitude_text, '') LIKE ? ESCAPE '\\'
  OR COALESCE(source_title_snapshot, '') LIKE ? ESCAPE '\\'
  OR COALESCE(prompt_snapshot, '') LIKE ? ESCAPE '\\'
)`);

          parameters.push(
            pattern,
            pattern,
            pattern,
            pattern,
          );
        }

        if (query.category === null) {
          whereParts.push("category IS NULL");
        } else if (query.category !== undefined) {
          whereParts.push("category = ?");
          parameters.push(query.category);
        }

        if (query.tagId !== undefined) {
          whereParts.push(`
EXISTS (
  SELECT 1
  FROM personal_journal_entry_tags AS search_entry_tag
  WHERE search_entry_tag.entry_id = personal_journal_entries.id
    AND search_entry_tag.tag_id = ?
)
`);
          parameters.push(query.tagId);
        }

        if (query.dateFrom !== undefined) {
          whereParts.push("entry_date >= ?");
          parameters.push(query.dateFrom);
        }

        if (query.dateTo !== undefined) {
          whereParts.push("entry_date <= ?");
          parameters.push(query.dateTo);
        }

        appendPassageSearch(
          whereParts,
          parameters,
          query,
        );

        if (query.isPinned !== undefined) {
          whereParts.push("is_pinned = ?");
          parameters.push(
            query.isPinned ? 1 : 0,
          );
        }

        const rows =
          await database.getAllAsync<JournalEntryRow>(
            `${ENTRY_COLUMNS_SQL}
WHERE ${whereParts.join("\n  AND ")}
ORDER BY entry_date DESC, id DESC
LIMIT ? OFFSET ?
`,
            ...parameters,
            query.limit + 1,
            query.offset,
          );

        const hasMore =
          rows.length > query.limit;

        const pageRows =
          hasMore
            ? rows.slice(0, query.limit)
            : rows;

        const items =
          await Promise.all(
            pageRows.map(
              (row) =>
                loadPersistenceRecord(
                  database,
                  row,
                ),
            ),
          );

        return {
          items,
          nextOffset: hasMore
            ? query.offset + query.limit
            : null,
        };
      },
    );
  }

  async findById(
    id: JournalEntryId,
  ): Promise<JournalEntryPersistenceRecord | null> {
    assertNonEmptyString(
      id,
      "PERSONAL_JOURNAL_ENTRY_ID_INVALID",
    );

    return this.personalDatabase.withConnection(
      async (database) => {
        const row =
          await database.getFirstAsync<JournalEntryRow>(
            `${ENTRY_COLUMNS_SQL}
WHERE id = ?
LIMIT 1
`,
            id,
          );

        return row === null
          ? null
          : loadPersistenceRecord(
              database,
              row,
            );
      },
    );
  }

  async findByDate(
    entryDate: PersonalLocalDate,
  ): Promise<JournalEntryPersistenceRecord | null> {
    assertValidLocalDate(
      entryDate,
      "PERSONAL_JOURNAL_ENTRY_DATE_INVALID",
    );

    return this.personalDatabase.withConnection(
      async (database) => {
        const row =
          await database.getFirstAsync<JournalEntryRow>(
            `${ENTRY_COLUMNS_SQL}
WHERE entry_date = ?
ORDER BY id DESC
LIMIT 1
`,
            entryDate,
          );

        return row === null
          ? null
          : loadPersistenceRecord(
              database,
              row,
            );
      },
    );
  }

  async listByDate(
    entryDate: PersonalLocalDate,
  ): Promise<
    readonly JournalEntryPersistenceRecord[]
  > {
    assertValidLocalDate(
      entryDate,
      "PERSONAL_JOURNAL_ENTRY_DATE_INVALID",
    );

    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<JournalEntryRow>(
            `${ENTRY_COLUMNS_SQL}
WHERE entry_date = ?
ORDER BY id DESC
`,
            entryDate,
          );

        return Promise.all(
          rows.map(
            (row) =>
              loadPersistenceRecord(
                database,
                row,
              ),
          ),
        );
      },
    );
  }

  async listTags(): Promise<readonly JournalTag[]> {
    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<JournalTagRow>(
            `
SELECT
  id,
  name,
  normalized_name
FROM personal_journal_tags
ORDER BY normalized_name ASC, id ASC
`,
          );

        const tags = rows.map(mapJournalTagRow);
        const ids = new Set<string>();
        const normalizedNames = new Set<string>();

        for (const tag of tags) {
          if (
            ids.has(tag.id) ||
            normalizedNames.has(tag.normalizedName)
          ) {
            throw new Error(
              "PERSONAL_JOURNAL_TAG_LIST_DUPLICATE",
            );
          }

          ids.add(tag.id);
          normalizedNames.add(tag.normalizedName);
        }

        return tags;
      },
    );
  }

  async findTagByNormalizedName(
    normalizedName: string,
  ): Promise<JournalTag | null> {
    assertNonEmptyString(
      normalizedName,
      "PERSONAL_JOURNAL_TAG_NORMALIZED_NAME_INVALID",
    );

    return this.personalDatabase.withConnection(
      async (database) => {
        const row =
          await database.getFirstAsync<JournalTagRow>(
            `
SELECT
  id,
  name,
  normalized_name
FROM personal_journal_tags
WHERE normalized_name = ?
LIMIT 1
`,
            normalizedName,
          );

        return row === null
          ? null
          : mapJournalTagRow(row);
      },
    );
  }

  async create(
    entry: JournalEntry | JournalEntryPersistenceRecord,
  ): Promise<void> {
    if (!hasAnyPersistenceField(entry)) {
      assertJournalEntryCore(entry, false);

      await this.personalDatabase.withConnection(
        async (database) => {
          await insertEntry(
            database,
            entry,
            "ACTIVE",
            "FREE",
            null,
            null,
            null,
            false,
          );
        },
      );
      return;
    }

    assertValidPersistenceRecord(entry);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.withTransactionAsync(
          async () => {
            await insertEntry(
              database,
              entry,
              entry.status,
              entry.sourceType,
              entry.sourceTitleSnapshot,
              entry.promptSnapshot,
              entry.category,
              entry.isPinned,
            );
            await persistReferences(
              database,
              entry,
            );
            await persistTags(
              database,
              entry,
            );
          },
        );
      },
    );
  }

  async update(
    entry: JournalEntry | JournalEntryPersistenceRecord,
  ): Promise<void> {
    if (!hasAnyPersistenceField(entry)) {
      assertJournalEntryCore(entry, false);

      await this.personalDatabase.withConnection(
        async (database) => {
          const result = await database.runAsync(
            `
UPDATE personal_journal_entries
SET
  entry_date = ?,
  reflection_text = ?,
  gratitude_text = ?,
  updated_at_utc = ?
WHERE id = ?
`,
            entry.entryDate,
            entry.reflectionText,
            entry.gratitudeText,
            entry.updatedAtUtc,
            entry.id,
          );

          if (result.changes !== 1) {
            throw new Error(
              "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
            );
          }
        },
      );
      return;
    }

    assertValidPersistenceRecord(entry);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.withTransactionAsync(
          async () => {
            const result = await database.runAsync(
              `
UPDATE personal_journal_entries
SET
  entry_date = ?,
  reflection_text = ?,
  gratitude_text = ?,
  status = ?,
  source_type = ?,
  source_title_snapshot = ?,
  prompt_snapshot = ?,
  category = ?,
  is_pinned = ?,
  updated_at_utc = ?
WHERE id = ?
`,
              entry.entryDate,
              entry.reflectionText,
              entry.gratitudeText,
              entry.status,
              entry.sourceType,
              entry.sourceTitleSnapshot,
              entry.promptSnapshot,
              entry.category,
              entry.isPinned ? 1 : 0,
              entry.updatedAtUtc,
              entry.id,
            );

            if (result.changes !== 1) {
              throw new Error(
                "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
              );
            }

            await database.runAsync(
              `
DELETE FROM personal_journal_entry_references
WHERE entry_id = ?
`,
              entry.id,
            );

            await database.runAsync(
              `
DELETE FROM personal_journal_entry_tags
WHERE entry_id = ?
`,
              entry.id,
            );

            await persistReferences(
              database,
              entry,
            );
            await persistTags(
              database,
              entry,
            );
          },
        );
      },
    );
  }

  async removeAllTrashed(): Promise<number> {
    return this.personalDatabase.withConnection(
      async (database) => {
        const result = await database.runAsync(
          `
DELETE FROM personal_journal_entries
WHERE status = 'TRASHED'
`,
        );

        return result.changes;
      },
    );
  }

  async remove(
    id: JournalEntryId,
  ): Promise<void> {
    assertNonEmptyString(
      id,
      "PERSONAL_JOURNAL_ENTRY_ID_INVALID",
    );

    await this.personalDatabase.withConnection(
      async (database) => {
        const result = await database.runAsync(
          `
DELETE FROM personal_journal_entries
WHERE id = ?
`,
          id,
        );

        if (result.changes !== 1) {
          throw new Error(
            "PERSONAL_JOURNAL_REMOVE_TARGET_NOT_FOUND",
          );
        }
      },
    );
  }
}