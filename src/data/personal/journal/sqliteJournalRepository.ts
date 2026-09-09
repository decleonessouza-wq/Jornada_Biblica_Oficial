import {
  JOURNAL_GRATITUDE_MAX_CHARS,
  JOURNAL_REFLECTION_MAX_CHARS,
  type JournalEntry,
  type JournalEntryId,
} from "../../../domain/journal/journal";
import type {
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../../../domain/personal/personalTime";

import {
  PersonalRepositoryBase,
} from "../personalRepositoryBase";
import type {
  JournalRepository,
} from "./journalRepository";

type JournalEntryRow = Readonly<{
  id: unknown;
  entry_date: unknown;
  reflection_text: unknown;
  gratitude_text: unknown;
  created_at_utc: unknown;
  updated_at_utc: unknown;
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

function assertValidJournalEntry(
  entry: JournalEntry,
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
    entry.reflectionText === null &&
    entry.gratitudeText === null
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED",
    );
  }
}

function mapJournalEntryRow(
  row: JournalEntryRow,
): JournalEntry {
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
  assertValidUtcTimestamp(
    row.created_at_utc,
    "PERSONAL_JOURNAL_ROW_CREATED_AT_UTC_INVALID",
  );
  assertValidUtcTimestamp(
    row.updated_at_utc,
    "PERSONAL_JOURNAL_ROW_UPDATED_AT_UTC_INVALID",
  );

  if (
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
    createdAtUtc: row.created_at_utc,
    updatedAtUtc: row.updated_at_utc,
  };
}

export class SQLiteJournalRepository
  extends PersonalRepositoryBase
  implements JournalRepository
{

  async list(): Promise<
    readonly JournalEntry[]
  > {
    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<JournalEntryRow>(
            `
SELECT
  id,
  entry_date,
  reflection_text,
  gratitude_text,
  created_at_utc,
  updated_at_utc
FROM personal_journal_entries
ORDER BY entry_date DESC, id DESC
`,
          );

        return rows.map(mapJournalEntryRow);
      },
    );
  }

  async findById(
    id: JournalEntryId,
  ): Promise<JournalEntry | null> {
    assertNonEmptyString(
      id,
      "PERSONAL_JOURNAL_ENTRY_ID_INVALID",
    );

    return this.personalDatabase.withConnection(
      async (database) => {
        const row =
          await database.getFirstAsync<JournalEntryRow>(
            `
SELECT
  id,
  entry_date,
  reflection_text,
  gratitude_text,
  created_at_utc,
  updated_at_utc
FROM personal_journal_entries
WHERE id = ?
LIMIT 1
`,
            id,
          );

        return row === null
          ? null
          : mapJournalEntryRow(row);
      },
    );
  }

  async findByDate(
    entryDate: PersonalLocalDate,
  ): Promise<JournalEntry | null> {
    assertValidLocalDate(
      entryDate,
      "PERSONAL_JOURNAL_ENTRY_DATE_INVALID",
    );

    return this.personalDatabase.withConnection(
      async (database) => {
        const row =
          await database.getFirstAsync<JournalEntryRow>(
            `
SELECT
  id,
  entry_date,
  reflection_text,
  gratitude_text,
  created_at_utc,
  updated_at_utc
FROM personal_journal_entries
WHERE entry_date = ?
LIMIT 1
`,
            entryDate,
          );

        return row === null
          ? null
          : mapJournalEntryRow(row);
      },
    );
  }

  async create(
    entry: JournalEntry,
  ): Promise<void> {
    assertValidJournalEntry(entry);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
INSERT INTO personal_journal_entries (
  id,
  entry_date,
  reflection_text,
  gratitude_text,
  created_at_utc,
  updated_at_utc
)
VALUES (?, ?, ?, ?, ?, ?)
`,
          entry.id,
          entry.entryDate,
          entry.reflectionText,
          entry.gratitudeText,
          entry.createdAtUtc,
          entry.updatedAtUtc,
        );
      },
    );
  }

  async update(
    entry: JournalEntry,
  ): Promise<void> {
    assertValidJournalEntry(entry);

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
