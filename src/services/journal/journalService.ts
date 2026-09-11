import type {
  BibleReference,
} from "../../domain/bible/bibleReference";
import {
  JOURNAL_CATEGORIES,
  JOURNAL_GRATITUDE_MAX_CHARS,
  JOURNAL_REFLECTION_MAX_CHARS,
  type JournalCategory,
  type JournalEntry,
  type JournalEntryId,
  type JournalTag,
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
  JournalSearchPage,
  JournalSearchQuery,
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

export type CreateBibleJournalDraftInput =
  CreateJournalDraftInput &
  Readonly<{
    reference: BibleReference;
  }>;

export type CreatePlanJournalDraftInput =
  Omit<CreateJournalDraftInput, "entryDate"> &
  Readonly<{
    entryDate: PersonalLocalDate;
    sourceTitleSnapshot: string;
    promptSnapshot: string;
    reference: BibleReference | null;
  }>;

export type UpdateJournalDraftInput =
  UpdateJournalEntryInput;

export type UpdateJournalOrganizationInput = Readonly<{
  category?: JournalCategory | null;
  tagNames?: readonly string[];
  isPinned?: boolean;
}>;

type NormalizedJournalTagInput = Readonly<{
  name: string;
  normalizedName: string;
}>;

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

function isJournalCategory(
  value: unknown,
): value is JournalCategory {
  return JOURNAL_CATEGORIES.some(
    (category) => category === value,
  );
}

function normalizeJournalTagName(
  value: unknown,
): NormalizedJournalTagInput {
  if (typeof value !== "string") {
    throw new Error(
      "PERSONAL_JOURNAL_TAG_NAME_INVALID",
    );
  }

  const name =
    value.trim().replace(/\s+/g, " ");

  if (name.length === 0) {
    throw new Error(
      "PERSONAL_JOURNAL_TAG_NAME_INVALID",
    );
  }

  const normalizedName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalizedName.length === 0) {
    throw new Error(
      "PERSONAL_JOURNAL_TAG_NAME_INVALID",
    );
  }

  return {
    name,
    normalizedName,
  };
}

function normalizeJournalTagNames(
  values: readonly string[],
): readonly NormalizedJournalTagInput[] {
  if (!Array.isArray(values)) {
    throw new Error(
      "PERSONAL_JOURNAL_TAGS_INVALID",
    );
  }

  const byNormalizedName =
    new Map<string, NormalizedJournalTagInput>();

  for (const value of values) {
    const normalized =
      normalizeJournalTagName(value);

    if (
      !byNormalizedName.has(
        normalized.normalizedName,
      )
    ) {
      byNormalizedName.set(
        normalized.normalizedName,
        normalized,
      );
    }
  }

  return [...byNormalizedName.values()];
}

function assertJournalSearchDate(
  value: unknown,
  errorCode: string,
): asserts value is PersonalLocalDate {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
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

function assertJournalSearchNonNegativeInteger(
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

function assertJournalSearchPositiveInteger(
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

function normalizeJournalSearchQuery(
  query: JournalSearchQuery,
): JournalSearchQuery {
  if (
    typeof query !== "object" ||
    query === null
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_SEARCH_QUERY_INVALID",
    );
  }

  assertJournalSearchNonNegativeInteger(
    query.offset,
    "PERSONAL_JOURNAL_SEARCH_OFFSET_INVALID",
  );
  assertJournalSearchPositiveInteger(
    query.limit,
    "PERSONAL_JOURNAL_SEARCH_LIMIT_INVALID",
  );

  let text: string | undefined;

  if (query.text !== undefined) {
    if (typeof query.text !== "string") {
      throw new Error(
        "PERSONAL_JOURNAL_SEARCH_TEXT_INVALID",
      );
    }

    const trimmed = query.text.trim();
    text = trimmed.length === 0
      ? undefined
      : trimmed;
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

  if (
    query.tagId !== undefined &&
    (
      typeof query.tagId !== "string" ||
      query.tagId.trim().length === 0
    )
  ) {
    throw new Error(
      "PERSONAL_JOURNAL_SEARCH_TAG_ID_INVALID",
    );
  }

  if (query.dateFrom !== undefined) {
    assertJournalSearchDate(
      query.dateFrom,
      "PERSONAL_JOURNAL_SEARCH_DATE_FROM_INVALID",
    );
  }

  if (query.dateTo !== undefined) {
    assertJournalSearchDate(
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

  if (query.passage !== undefined) {
    if (
      typeof query.passage !== "object" ||
      query.passage === null ||
      typeof query.passage.bookId !== "string" ||
      query.passage.bookId.trim().length === 0
    ) {
      throw new Error(
        "PERSONAL_JOURNAL_SEARCH_PASSAGE_BOOK_ID_INVALID",
      );
    }

    if (query.passage.chapter !== undefined) {
      assertJournalSearchPositiveInteger(
        query.passage.chapter,
        "PERSONAL_JOURNAL_SEARCH_PASSAGE_CHAPTER_INVALID",
      );
    }

    if (query.passage.verse !== undefined) {
      assertJournalSearchPositiveInteger(
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

  return {
    ...query,
    text,
  };
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
    const entries = await this.repository.list();

    return entries.filter(
      (entry) => entry.status !== "TRASHED",
    );
  }

  async listTrash(): Promise<
    readonly JournalEntryPersistenceRecord[]
  > {
    const entries = await this.repository.list();

    return entries.filter(
      (entry) => entry.status === "TRASHED",
    );
  }

  async listTags(): Promise<readonly JournalTag[]> {
    return this.repository.listTags();
  }

  async search(
    query: JournalSearchQuery,
  ): Promise<JournalSearchPage> {
    const normalized =
      normalizeJournalSearchQuery(query);

    return this.repository.search(normalized);
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
    const entries =
      await this.repository.listByDate(entryDate);

    return entries.filter(
      (entry) => entry.status !== "TRASHED",
    );
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
      category: null,
      isPinned: false,
      references: [],
      tags: [],
      createdAtUtc: timestamp,
      updatedAtUtc: timestamp,
    };

    await this.repository.create(draft);

    return draft;
  }

  async createBibleDraft(
    input: CreateBibleJournalDraftInput,
  ): Promise<JournalEntryPersistenceRecord> {
    const now = this.clock.now();
    const entryDate =
      input.entryDate ??
      this.datePolicy.toLocalDate(now);
    const timestamp =
      this.datePolicy.toUtcTimestamp(now);
    const entryId =
      this.canonicalIdFactory.create(
        "journal_entry",
      );

    const draft: JournalEntryPersistenceRecord = {
      id: entryId,
      entryDate,
      reflectionText: normalizeReflectionText(
        input.reflectionText,
      ),
      gratitudeText: normalizeGratitudeText(
        input.gratitudeText,
      ),
      status: "DRAFT",
      sourceType: "BIBLE",
      sourceTitleSnapshot: null,
      promptSnapshot: null,
      category: null,
      isPinned: false,
      references: [
        {
          id: this.canonicalIdFactory.create(
            "journal_entry_reference",
          ),
          entryId,
          position: 0,
          reference: input.reference,
        },
      ],
      tags: [],
      createdAtUtc: timestamp,
      updatedAtUtc: timestamp,
    };

    await this.repository.create(draft);

    return draft;
  }

  async createPlanDraft(
    input: CreatePlanJournalDraftInput,
  ): Promise<JournalEntryPersistenceRecord> {
    const now = this.clock.now();
    const timestamp =
      this.datePolicy.toUtcTimestamp(now);
    const entryId =
      this.canonicalIdFactory.create(
        "journal_entry",
      );

    const references =
      input.reference === null
        ? []
        : [
            {
              id: this.canonicalIdFactory.create(
                "journal_entry_reference",
              ),
              entryId,
              position: 0,
              reference: input.reference,
            },
          ];

    const draft: JournalEntryPersistenceRecord = {
      id: entryId,
      entryDate: input.entryDate,
      reflectionText: normalizeReflectionText(
        input.reflectionText,
      ),
      gratitudeText: normalizeGratitudeText(
        input.gratitudeText,
      ),
      status: "DRAFT",
      sourceType: "PLAN",
      sourceTitleSnapshot:
        input.sourceTitleSnapshot,
      promptSnapshot: input.promptSnapshot,
      category: null,
      isPinned: false,
      references,
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

  async updateOrganization(
    id: JournalEntryId,
    input: UpdateJournalOrganizationInput,
  ): Promise<JournalEntryPersistenceRecord> {
    const existing =
      await this.repository.findById(id);

    if (existing === null) {
      throw new Error(
        "PERSONAL_JOURNAL_ORGANIZATION_TARGET_NOT_FOUND",
      );
    }

    if (existing.status === "TRASHED") {
      throw new Error(
        "PERSONAL_JOURNAL_ORGANIZATION_TARGET_TRASHED",
      );
    }

    if (
      input.category !== undefined &&
      input.category !== null &&
      !isJournalCategory(input.category)
    ) {
      throw new Error(
        "PERSONAL_JOURNAL_CATEGORY_INVALID",
      );
    }

    if (
      input.isPinned !== undefined &&
      typeof input.isPinned !== "boolean"
    ) {
      throw new Error(
        "PERSONAL_JOURNAL_IS_PINNED_INVALID",
      );
    }

    if (
      input.isPinned === true &&
      existing.status !== "ACTIVE"
    ) {
      throw new Error(
        "PERSONAL_JOURNAL_PIN_TARGET_INVALID",
      );
    }

    let tags = existing.tags;

    if (input.tagNames !== undefined) {
      const normalizedInputs =
        normalizeJournalTagNames(input.tagNames);
      const resolvedTags: JournalTag[] = [];

      for (const normalized of normalizedInputs) {
        const existingTag =
          await this.repository.findTagByNormalizedName(
            normalized.normalizedName,
          );

        if (existingTag !== null) {
          resolvedTags.push(existingTag);
          continue;
        }

        resolvedTags.push({
          id: this.canonicalIdFactory.create(
            "journal_tag",
          ),
          name: normalized.name,
          normalizedName: normalized.normalizedName,
        });
      }

      tags = resolvedTags;
    }

    const now = this.clock.now();
    const updatedAtUtc =
      this.datePolicy.toUtcTimestamp(now);

    const updated: JournalEntryPersistenceRecord = {
      ...existing,
      category:
        input.category === undefined
          ? existing.category
          : input.category,
      isPinned:
        input.isPinned === undefined
          ? existing.isPinned
          : input.isPinned,
      tags,
      updatedAtUtc,
    };

    await this.repository.update(updated);

    return updated;
  }

  async setPinned(
    id: JournalEntryId,
    isPinned: boolean,
  ): Promise<JournalEntryPersistenceRecord> {
    return this.updateOrganization(id, {
      isPinned,
    });
  }

  async moveToTrash(
    id: JournalEntryId,
  ): Promise<JournalEntryPersistenceRecord> {
    const existing =
      await this.repository.findById(id);

    if (existing === null) {
      throw new Error(
        "PERSONAL_JOURNAL_TRASH_TARGET_NOT_FOUND",
      );
    }

    if (existing.status === "TRASHED") {
      return existing;
    }

    if (existing.status !== "ACTIVE") {
      throw new Error(
        "PERSONAL_JOURNAL_TRASH_TARGET_INVALID",
      );
    }

    const now = this.clock.now();
    const updatedAtUtc =
      this.datePolicy.toUtcTimestamp(now);

    const trashed: JournalEntryPersistenceRecord = {
      ...existing,
      status: "TRASHED",
      isPinned: false,
      updatedAtUtc,
    };

    await this.repository.update(trashed);

    return trashed;
  }

  async restoreFromTrash(
    id: JournalEntryId,
  ): Promise<JournalEntryPersistenceRecord> {
    const existing =
      await this.repository.findById(id);

    if (existing === null) {
      throw new Error(
        "PERSONAL_JOURNAL_RESTORE_TARGET_NOT_FOUND",
      );
    }

    if (existing.status !== "TRASHED") {
      throw new Error(
        "PERSONAL_JOURNAL_RESTORE_TARGET_INVALID",
      );
    }

    const now = this.clock.now();
    const updatedAtUtc =
      this.datePolicy.toUtcTimestamp(now);

    const restored: JournalEntryPersistenceRecord = {
      ...existing,
      status: "ACTIVE",
      isPinned: false,
      updatedAtUtc,
    };

    await this.repository.update(restored);

    return restored;
  }

  async remove(
    id: JournalEntryId,
  ): Promise<void> {
    await this.repository.remove(id);
  }
}
