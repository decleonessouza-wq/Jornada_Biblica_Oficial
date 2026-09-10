import {
  JOURNAL_GRATITUDE_MAX_CHARS,
  JOURNAL_REFLECTION_MAX_CHARS,
  type JournalEntry,
  type JournalEntryId,
} from "../../domain/journal/journal";
import type {
  PersonalCanonicalIdFactory,
} from "../../domain/personal/personalIdentity";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalLocalDate,
} from "../../domain/personal/personalTime";
import type {
  JournalEntryPersistenceRecord,
  JournalRepository,
} from "../../data/personal/journal/journalRepository";

export type CreateJournalEntryInput = Readonly<{
  entryDate?: PersonalLocalDate;
  reflectionText?: string | null;
  gratitudeText?: string | null;
}>;

export type UpdateJournalEntryInput = Readonly<{
  entryDate?: PersonalLocalDate;
  reflectionText?: string | null;
  gratitudeText?: string | null;
}>;

export type CreateJournalDraftInput =
  CreateJournalEntryInput;

export type UpdateJournalDraftInput =
  UpdateJournalEntryInput;

function normalizeOptionalJournalText(
  value: string | null | undefined,
  maxChars: number,
  errorCode: string,
): string | null {
  if (
    value === undefined ||
    value === null ||
    value.trim().length === 0
  ) {
    return null;
  }

  if (value.length > maxChars) {
    throw new Error(errorCode);
  }

  return value;
}

function assertJournalContentRequired(
  reflectionText: string | null,
  gratitudeText: string | null,
): void {
  if (
    reflectionText === null &&
    gratitudeText === null
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED",
    );
  }
}

function normalizeReflectionText(
  value: string | null | undefined,
): string | null {
  return normalizeOptionalJournalText(
    value,
    JOURNAL_REFLECTION_MAX_CHARS,
    "PERSONAL_JOURNAL_REFLECTION_TEXT_INVALID",
  );
}

function normalizeGratitudeText(
  value: string | null | undefined,
): string | null {
  return normalizeOptionalJournalText(
    value,
    JOURNAL_GRATITUDE_MAX_CHARS,
    "PERSONAL_JOURNAL_GRATITUDE_TEXT_INVALID",
  );
}

export class JournalService {
  constructor(
    private readonly repository: JournalRepository,
    private readonly canonicalIdFactory: PersonalCanonicalIdFactory,
    private readonly clock: PersonalClock,
    private readonly datePolicy: PersonalDatePolicy,
  ) {}

  async list(): Promise<
    readonly JournalEntryPersistenceRecord[]
  > {
    return this.repository.list();
  }

  async findById(
    id: JournalEntryId,
  ): Promise<JournalEntryPersistenceRecord | null> {
    return this.repository.findById(id);
  }

  async findByDate(
    entryDate: PersonalLocalDate,
  ): Promise<JournalEntryPersistenceRecord | null> {
    return this.repository.findByDate(entryDate);
  }

  async listByDate(
    entryDate: PersonalLocalDate,
  ): Promise<
    readonly JournalEntryPersistenceRecord[]
  > {
    return this.repository.listByDate(entryDate);
  }

  getTodayEntryDate(): PersonalLocalDate {
    const now = this.clock.now();
    return this.datePolicy.toLocalDate(now);
  }

  async create(
    input: CreateJournalEntryInput,
  ): Promise<JournalEntry> {
    const now = this.clock.now();
    const entryDate =
      input.entryDate ??
      this.datePolicy.toLocalDate(now);
    const reflectionText = normalizeReflectionText(
      input.reflectionText,
    );
    const gratitudeText = normalizeGratitudeText(
      input.gratitudeText,
    );

    assertJournalContentRequired(
      reflectionText,
      gratitudeText,
    );

    const timestamp =
      this.datePolicy.toUtcTimestamp(now);

    const entry: JournalEntry = {
      id: this.canonicalIdFactory.create(
        "journal_entry",
      ),
      entryDate,
      reflectionText,
      gratitudeText,
      createdAtUtc: timestamp,
      updatedAtUtc: timestamp,
    };

    await this.repository.create(entry);

    return entry;
  }

  async createDraft(
    input: CreateJournalDraftInput = {},
  ): Promise<JournalEntryPersistenceRecord> {
    const now = this.clock.now();
    const entryDate =
      input.entryDate ??
      this.datePolicy.toLocalDate(now);
    const timestamp =
      this.datePolicy.toUtcTimestamp(now);

    const draft: JournalEntryPersistenceRecord = {
      id: this.canonicalIdFactory.create(
        "journal_entry",
      ),
      entryDate,
      reflectionText: normalizeReflectionText(
        input.reflectionText,
      ),
      gratitudeText: normalizeGratitudeText(
        input.gratitudeText,
      ),
      status: "DRAFT",
      sourceType: "FREE",
      sourceTitleSnapshot: null,
      promptSnapshot: null,
      references: [],
      tags: [],
      createdAtUtc: timestamp,
      updatedAtUtc: timestamp,
    };

    await this.repository.create(draft);

    return draft;
  }

  async updateDraft(
    id: JournalEntryId,
    input: UpdateJournalDraftInput,
  ): Promise<JournalEntryPersistenceRecord> {
    const existing =
      await this.repository.findById(id);

    if (existing === null) {
      throw new Error(
        "PERSONAL_JOURNAL_DRAFT_TARGET_NOT_FOUND",
      );
    }

    if (existing.status !== "DRAFT") {
      throw new Error(
        "PERSONAL_JOURNAL_DRAFT_TARGET_INVALID",
      );
    }

    const reflectionText =
      input.reflectionText === undefined
        ? existing.reflectionText
        : normalizeReflectionText(
            input.reflectionText,
          );
    const gratitudeText =
      input.gratitudeText === undefined
        ? existing.gratitudeText
        : normalizeGratitudeText(
            input.gratitudeText,
          );

    const now = this.clock.now();
    const updatedAtUtc =
      this.datePolicy.toUtcTimestamp(now);

    const updatedDraft: JournalEntryPersistenceRecord = {
      ...existing,
      entryDate:
        input.entryDate ?? existing.entryDate,
      reflectionText,
      gratitudeText,
      status: "DRAFT",
      updatedAtUtc,
    };

    await this.repository.update(updatedDraft);

    return updatedDraft;
  }

  async publishDraft(
    id: JournalEntryId,
    input: UpdateJournalDraftInput = {},
  ): Promise<JournalEntryPersistenceRecord> {
    const existing =
      await this.repository.findById(id);

    if (existing === null) {
      throw new Error(
        "PERSONAL_JOURNAL_DRAFT_TARGET_NOT_FOUND",
      );
    }

    if (existing.status !== "DRAFT") {
      throw new Error(
        "PERSONAL_JOURNAL_DRAFT_TARGET_INVALID",
      );
    }

    const reflectionText =
      input.reflectionText === undefined
        ? existing.reflectionText
        : normalizeReflectionText(
            input.reflectionText,
          );
    const gratitudeText =
      input.gratitudeText === undefined
        ? existing.gratitudeText
        : normalizeGratitudeText(
            input.gratitudeText,
          );

    assertJournalContentRequired(
      reflectionText,
      gratitudeText,
    );

    const now = this.clock.now();
    const updatedAtUtc =
      this.datePolicy.toUtcTimestamp(now);

    const published: JournalEntryPersistenceRecord = {
      ...existing,
      entryDate:
        input.entryDate ?? existing.entryDate,
      reflectionText,
      gratitudeText,
      status: "ACTIVE",
      updatedAtUtc,
    };

    await this.repository.update(published);

    return published;
  }

  async update(
    id: JournalEntryId,
    input: UpdateJournalEntryInput,
  ): Promise<JournalEntry> {
    const existing =
      await this.repository.findById(id);

    if (existing === null) {
      throw new Error(
        "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
      );
    }

    const reflectionText =
      input.reflectionText === undefined
        ? existing.reflectionText
        : normalizeReflectionText(
            input.reflectionText,
          );

    const gratitudeText =
      input.gratitudeText === undefined
        ? existing.gratitudeText
        : normalizeGratitudeText(
            input.gratitudeText,
          );

    assertJournalContentRequired(
      reflectionText,
      gratitudeText,
    );

    const now = this.clock.now();
    const updatedAtUtc =
      this.datePolicy.toUtcTimestamp(now);

    const updatedEntry: JournalEntry = {
      id: existing.id,
      entryDate:
        input.entryDate ?? existing.entryDate,
      reflectionText,
      gratitudeText,
      createdAtUtc: existing.createdAtUtc,
      updatedAtUtc,
    };

    await this.repository.update(updatedEntry);

    return updatedEntry;
  }

  async remove(
    id: JournalEntryId,
  ): Promise<void> {
    await this.repository.remove(id);
  }
}
