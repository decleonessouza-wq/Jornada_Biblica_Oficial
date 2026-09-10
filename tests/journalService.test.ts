import type {
  JournalEntry,
  JournalEntryId,
} from "../src/domain/journal/journal";
import type {
  PersonalCanonicalIdFactory,
} from "../src/domain/personal/personalIdentity";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  JournalEntryPersistenceRecord,
  JournalRepository,
} from "../src/data/personal/journal/journalRepository";
import {
  JournalService,
} from "../src/services/journal/journalService";

const ENTRY_ID =
  "journal-entry-test-id" as JournalEntryId;
const OTHER_ENTRY_ID =
  "journal-entry-other-id" as JournalEntryId;

const ENTRY_DATE =
  "2026-09-09" as PersonalLocalDate;
const OTHER_ENTRY_DATE =
  "2026-09-08" as PersonalLocalDate;

const CREATED_AT =
  "2026-09-09T12:00:00.000Z" as PersonalUtcTimestamp;
const UPDATED_AT =
  "2026-09-09T13:00:00.000Z" as PersonalUtcTimestamp;

const NOW =
  new Date("2026-09-09T12:00:00.000Z");

function journalEntry(
  overrides: Partial<JournalEntry> = {},
): JournalEntry {
  return {
    id: ENTRY_ID,
    entryDate: ENTRY_DATE,
    reflectionText: "Reflexão",
    gratitudeText: "Gratidão",
    createdAtUtc: CREATED_AT,
    updatedAtUtc: CREATED_AT,
    ...overrides,
  };
}

function persistenceEntry(
  overrides: Partial<JournalEntryPersistenceRecord> = {},
): JournalEntryPersistenceRecord {
  return {
    ...journalEntry(),
    status: "ACTIVE",
    sourceType: "FREE",
    sourceTitleSnapshot: "Contexto preservado",
    promptSnapshot: "Prompt preservado",
    category: null,
    isPinned: false,
    references: [],
    tags: [],
    ...overrides,
  } as JournalEntryPersistenceRecord;
}

function createHarness() {
  const list = jest.fn();
  const findById = jest.fn();
  const findByDate = jest.fn();
  const listByDate = jest.fn();
  const listTags = jest.fn();
  const findTagByNormalizedName = jest.fn();
  const create = jest.fn();
  const update = jest.fn();
  const remove = jest.fn();

  const repository = {
    list,
    findById,
    findByDate,
    listByDate,
    listTags,
    findTagByNormalizedName,
    create,
    update,
    remove,
  } as unknown as JournalRepository;

  const createId = jest.fn(() => ENTRY_ID);
  const canonicalIdFactory = {
    create: createId,
  } as unknown as PersonalCanonicalIdFactory;

  const now = jest.fn(() => NOW);
  const clock = {
    now,
  } as PersonalClock;

  const toUtcTimestamp = jest.fn(() => CREATED_AT);
  const toLocalDate = jest.fn(() => ENTRY_DATE);
  const datePolicy = {
    toUtcTimestamp,
    toLocalDate,
  } as unknown as PersonalDatePolicy;

  const service = new JournalService(
    repository,
    canonicalIdFactory,
    clock,
    datePolicy,
  );

  return {
    service,
    list,
    findById,
    findByDate,
    listByDate,
    listTags,
    findTagByNormalizedName,
    create,
    update,
    remove,
    createId,
    now,
    toUtcTimestamp,
    toLocalDate,
  };
}

describe("JournalService", () => {
  it("lists non-trashed entries without reordering repository results", async () => {
    const harness = createHarness();
    const first = persistenceEntry({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
    });
    const trashed = persistenceEntry({
      id: OTHER_ENTRY_ID,
      status: "TRASHED",
    });
    const second = persistenceEntry({
      id: OTHER_ENTRY_ID,
      entryDate: OTHER_ENTRY_DATE,
      status: "DRAFT",
    });

    harness.list.mockResolvedValue([
      first,
      trashed,
      second,
    ]);

    await expect(
      harness.service.list(),
    ).resolves.toEqual([first, second]);

    expect(harness.list).toHaveBeenCalledTimes(1);
  });

  it("lists only trashed entries without reordering repository results", async () => {
    const harness = createHarness();
    const firstTrash = persistenceEntry({
      status: "TRASHED",
    });
    const active = persistenceEntry({
      id: OTHER_ENTRY_ID,
    });
    const secondTrash = persistenceEntry({
      id: OTHER_ENTRY_ID,
      status: "TRASHED",
    });

    harness.list.mockResolvedValue([
      firstTrash,
      active,
      secondTrash,
    ]);

    await expect(
      harness.service.listTrash(),
    ).resolves.toEqual([
      firstTrash,
      secondTrash,
    ]);
  });

  it("delegates tag catalog listing without reordering it", async () => {
    const harness = createHarness();
    const tags = [
      {
        id: "tag-faith",
        name: "Fé",
        normalizedName: "fe",
      },
      {
        id: "tag-prayer",
        name: "Oração",
        normalizedName: "oracao",
      },
    ];

    harness.listTags.mockResolvedValue(tags);

    await expect(
      harness.service.listTags(),
    ).resolves.toBe(tags);

    expect(harness.listTags).toHaveBeenCalledTimes(1);
  });

  it("delegates findById and preserves the full persistence record", async () => {
    const harness = createHarness();
    const existing = persistenceEntry();
    harness.findById.mockResolvedValue(existing);

    await expect(
      harness.service.findById(ENTRY_ID),
    ).resolves.toBe(existing);

    expect(harness.findById).toHaveBeenCalledWith(ENTRY_ID);
  });

  it("keeps findByDate as a compatibility bridge", async () => {
    const harness = createHarness();
    const existing = persistenceEntry();
    harness.findByDate.mockResolvedValue(existing);

    await expect(
      harness.service.findByDate(ENTRY_DATE),
    ).resolves.toBe(existing);

    expect(harness.findByDate).toHaveBeenCalledWith(
      ENTRY_DATE,
    );
  });

  it("lists non-trashed entries by date while preserving repository order", async () => {
    const harness = createHarness();
    const first = persistenceEntry({
      id: OTHER_ENTRY_ID,
      entryDate: ENTRY_DATE,
    });
    const trashed = persistenceEntry({
      status: "TRASHED",
      entryDate: ENTRY_DATE,
    });
    const second = persistenceEntry({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
      status: "DRAFT",
    });

    harness.listByDate.mockResolvedValue([
      first,
      trashed,
      second,
    ]);

    await expect(
      harness.service.listByDate(ENTRY_DATE),
    ).resolves.toEqual([first, second]);

    expect(harness.listByDate).toHaveBeenCalledWith(
      ENTRY_DATE,
    );
  });

  it("provides today's local entryDate from one clock read", () => {
    const harness = createHarness();

    expect(
      harness.service.getTodayEntryDate(),
    ).toBe(ENTRY_DATE);
    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(harness.toLocalDate).toHaveBeenCalledWith(NOW);
    expect(harness.toUtcTimestamp).not.toHaveBeenCalled();
  });

  it("creates an active entry with the same captured now and no date-conflict lookup", async () => {
    const harness = createHarness();

    const result = await harness.service.create({
      reflectionText: "Reflexão",
    });

    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(harness.toLocalDate).toHaveBeenCalledWith(NOW);
    expect(harness.toUtcTimestamp).toHaveBeenCalledWith(NOW);
    expect(harness.createId).toHaveBeenCalledWith(
      "journal_entry",
    );
    expect(harness.findByDate).not.toHaveBeenCalled();
    expect(harness.create).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
      reflectionText: "Reflexão",
      gratitudeText: null,
      createdAtUtc: CREATED_AT,
      updatedAtUtc: CREATED_AT,
    });
  });

  it("preserves an explicit active create entryDate", async () => {
    const harness = createHarness();

    const result = await harness.service.create({
      entryDate: OTHER_ENTRY_DATE,
      gratitudeText: "Obrigado",
    });

    expect(harness.toLocalDate).not.toHaveBeenCalled();
    expect(result.entryDate).toBe(OTHER_ENTRY_DATE);
  });

  it("allows two active entries on the same date with distinct canonical ids", async () => {
    const harness = createHarness();
    harness.createId
      .mockReturnValueOnce(ENTRY_ID)
      .mockReturnValueOnce(OTHER_ENTRY_ID);

    const first = await harness.service.create({
      entryDate: ENTRY_DATE,
      reflectionText: "Primeira",
    });
    const second = await harness.service.create({
      entryDate: ENTRY_DATE,
      reflectionText: "Segunda",
    });

    expect(first.id).toBe(ENTRY_ID);
    expect(second.id).toBe(OTHER_ENTRY_ID);
    expect(first.entryDate).toBe(second.entryDate);
    expect(harness.findByDate).not.toHaveBeenCalled();
    expect(harness.create).toHaveBeenCalledTimes(2);
  });

  it("normalizes absent or whitespace-only active content while preserving non-empty bytes", async () => {
    const harness = createHarness();

    const result = await harness.service.create({
      reflectionText: "   ",
      gratitudeText: "  Obrigado  ",
    });

    expect(result.reflectionText).toBeNull();
    expect(result.gratitudeText).toBe("  Obrigado  ");
  });

  it.each([
    [
      "reflectionText",
      5001,
      "PERSONAL_JOURNAL_REFLECTION_TEXT_INVALID",
    ],
    [
      "gratitudeText",
      201,
      "PERSONAL_JOURNAL_GRATITUDE_TEXT_INVALID",
    ],
  ] as const)(
    "rejects active %s over its maximum",
    async (field, length, code) => {
      const harness = createHarness();

      await expect(
        harness.service.create({
          [field]: "x".repeat(length),
        }),
      ).rejects.toThrow(code);

      expect(harness.create).not.toHaveBeenCalled();
    },
  );

  it("rejects active create when both content fields are absent", async () => {
    const harness = createHarness();

    await expect(
      harness.service.create({
        reflectionText: "   ",
        gratitudeText: undefined,
      }),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED",
    );

    expect(harness.create).not.toHaveBeenCalled();
  });

  it("creates an empty FREE draft with full v4 defaults", async () => {
    const harness = createHarness();

    const draft =
      await harness.service.createDraft();

    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(harness.createId).toHaveBeenCalledWith(
      "journal_entry",
    );
    expect(draft).toEqual({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
      reflectionText: null,
      gratitudeText: null,
      status: "DRAFT",
      sourceType: "FREE",
      sourceTitleSnapshot: null,
      promptSnapshot: null,
      category: null,
      isPinned: false,
      references: [],
      tags: [],
      createdAtUtc: CREATED_AT,
      updatedAtUtc: CREATED_AT,
    });
    expect(harness.create).toHaveBeenCalledWith(draft);
  });

  it("creates a draft with explicit date and preserves non-empty text byte-for-byte", async () => {
    const harness = createHarness();
    const reflectionText = "  linha 1\nlinha 2  ";

    const draft = await harness.service.createDraft({
      entryDate: OTHER_ENTRY_DATE,
      reflectionText,
    });

    expect(draft.entryDate).toBe(OTHER_ENTRY_DATE);
    expect(draft.reflectionText).toBe(reflectionText);
    expect(harness.toLocalDate).not.toHaveBeenCalled();
  });

  it("updates a draft while preserving source snapshots references tags and createdAt", async () => {
    const harness = createHarness();
    const reference = {
      id: "journal-reference-1",
      entryId: ENTRY_ID,
      position: 0,
      reference: {
        passages: [
          {
            kind: "CHAPTER",
            bookId: "GEN",
            chapter: 1,
          },
        ],
      },
    };
    const tag = {
      id: "journal-tag-1",
      name: "Promessa",
      normalizedName: "promessa",
    };
    const existing = persistenceEntry({
      status: "DRAFT",
      sourceType: "BIBLE",
      sourceTitleSnapshot: "Gênesis 1",
      promptSnapshot: "O que este texto falou com você?",
      references: [reference] as never,
      tags: [tag] as never,
    });
    harness.findById.mockResolvedValue(existing);
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const updated = await harness.service.updateDraft(
      ENTRY_ID,
      {
        entryDate: OTHER_ENTRY_DATE,
        reflectionText: "Nova reflexão",
        gratitudeText: null,
      },
    );

    expect(updated).toEqual({
      ...existing,
      entryDate: OTHER_ENTRY_DATE,
      reflectionText: "Nova reflexão",
      gratitudeText: null,
      status: "DRAFT",
      updatedAtUtc: UPDATED_AT,
    });
    expect(updated.references).toBe(existing.references);
    expect(updated.tags).toBe(existing.tags);
    expect(updated.createdAtUtc).toBe(CREATED_AT);
    expect(harness.update).toHaveBeenCalledWith(updated);
  });

  it("allows a draft update to become empty", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(
      persistenceEntry({
        status: "DRAFT",
        reflectionText: "Apagar",
        gratitudeText: null,
      }),
    );

    const updated = await harness.service.updateDraft(
      ENTRY_ID,
      {
        reflectionText: null,
      },
    );

    expect(updated.reflectionText).toBeNull();
    expect(updated.gratitudeText).toBeNull();
    expect(updated.status).toBe("DRAFT");
  });

  it.each([
    [
      null,
      "PERSONAL_JOURNAL_DRAFT_TARGET_NOT_FOUND",
    ],
    [
      persistenceEntry({ status: "ACTIVE" }),
      "PERSONAL_JOURNAL_DRAFT_TARGET_INVALID",
    ],
  ] as const)(
    "rejects invalid draft update target with %s",
    async (existing, code) => {
      const harness = createHarness();
      harness.findById.mockResolvedValue(existing);

      await expect(
        harness.service.updateDraft(
          ENTRY_ID,
          { reflectionText: "x" },
        ),
      ).rejects.toThrow(code);

      expect(harness.update).not.toHaveBeenCalled();
      expect(harness.now).not.toHaveBeenCalled();
    },
  );

  it("publishes a draft to ACTIVE while preserving v4 context", async () => {
    const harness = createHarness();
    const existing = persistenceEntry({
      status: "DRAFT",
      sourceType: "PLAN",
      sourceTitleSnapshot: "Dia 42",
      promptSnapshot: "Registre sua reflexão.",
      reflectionText: null,
      gratitudeText: null,
    });
    harness.findById.mockResolvedValue(existing);
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const published =
      await harness.service.publishDraft(
        ENTRY_ID,
        {
          entryDate: OTHER_ENTRY_DATE,
          reflectionText: "Reflexão final",
        },
      );

    expect(published).toEqual({
      ...existing,
      entryDate: OTHER_ENTRY_DATE,
      reflectionText: "Reflexão final",
      gratitudeText: null,
      status: "ACTIVE",
      updatedAtUtc: UPDATED_AT,
    });
    expect(harness.update).toHaveBeenCalledWith(
      published,
    );
  });

  it("blocks publishing an empty draft without mutating it", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(
      persistenceEntry({
        status: "DRAFT",
        reflectionText: null,
        gratitudeText: null,
      }),
    );

    await expect(
      harness.service.publishDraft(ENTRY_ID),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED",
    );

    expect(harness.update).not.toHaveBeenCalled();
    expect(harness.now).not.toHaveBeenCalled();
  });

  it.each([
    [
      null,
      "PERSONAL_JOURNAL_DRAFT_TARGET_NOT_FOUND",
    ],
    [
      persistenceEntry({ status: "ACTIVE" }),
      "PERSONAL_JOURNAL_DRAFT_TARGET_INVALID",
    ],
  ] as const)(
    "rejects invalid publish target with %s",
    async (existing, code) => {
      const harness = createHarness();
      harness.findById.mockResolvedValue(existing);

      await expect(
        harness.service.publishDraft(ENTRY_ID),
      ).rejects.toThrow(code);

      expect(harness.update).not.toHaveBeenCalled();
    },
  );

  it("updates an active entry date and content through the basic compatibility shape", async () => {
    const harness = createHarness();
    const existing = persistenceEntry({
      reflectionText: "Original",
      gratitudeText: "Obrigado",
    });
    harness.findById.mockResolvedValue(existing);
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const result = await harness.service.update(
      ENTRY_ID,
      {
        entryDate: OTHER_ENTRY_DATE,
        gratitudeText: "Nova gratidão",
      },
    );

    expect(result).toEqual({
      id: ENTRY_ID,
      entryDate: OTHER_ENTRY_DATE,
      reflectionText: "Original",
      gratitudeText: "Nova gratidão",
      createdAtUtc: CREATED_AT,
      updatedAtUtc: UPDATED_AT,
    });

    const persisted = harness.update.mock.calls[0]?.[0];
    expect(Object.keys(persisted).sort()).toEqual([
      "createdAtUtc",
      "entryDate",
      "gratitudeText",
      "id",
      "reflectionText",
      "updatedAtUtc",
    ]);
    expect(persisted).not.toHaveProperty("status");
    expect(persisted).not.toHaveProperty("references");
    expect(persisted).not.toHaveProperty("tags");
  });

  it("preserves omitted fields and supports explicit null during active update", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(
      persistenceEntry({
        reflectionText: "Manter",
        gratitudeText: "Remover",
      }),
    );
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const result = await harness.service.update(
      ENTRY_ID,
      { gratitudeText: null },
    );

    expect(result.entryDate).toBe(ENTRY_DATE);
    expect(result.reflectionText).toBe("Manter");
    expect(result.gratitudeText).toBeNull();
  });

  it("rejects update when the target does not exist", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(null);

    await expect(
      harness.service.update(
        ENTRY_ID,
        { reflectionText: "Atualização" },
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
    );

    expect(harness.update).not.toHaveBeenCalled();
  });

  it("rejects active update when merged content becomes empty", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(
      persistenceEntry({
        reflectionText: "Reflexão",
        gratitudeText: null,
      }),
    );

    await expect(
      harness.service.update(
        ENTRY_ID,
        { reflectionText: null },
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED",
    );

    expect(harness.update).not.toHaveBeenCalled();
  });

  it("updates category tags and pin while preserving entry context", async () => {
    const harness = createHarness();
    const existingTag = {
      id: "tag-existing",
      name: "Oração",
      normalizedName: "oracao",
    };
    const existing = persistenceEntry({
      category: null,
      isPinned: false,
      tags: [],
    });

    harness.findById.mockResolvedValue(existing);
    harness.findTagByNormalizedName
      .mockResolvedValueOnce(existingTag)
      .mockResolvedValueOnce(null);
    harness.createId.mockReturnValueOnce(
      "tag-new" as never,
    );
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const updated =
      await harness.service.updateOrganization(
        ENTRY_ID,
        {
          category: "PRAYER",
          isPinned: true,
          tagNames: [
            " Oração ",
            "oração",
            "  Fé   Viva  ",
          ],
        },
      );

    expect(
      harness.findTagByNormalizedName.mock.calls,
    ).toEqual([
      ["oracao"],
      ["fe viva"],
    ]);
    expect(harness.createId).toHaveBeenCalledWith(
      "journal_tag",
    );
    expect(updated).toEqual({
      ...existing,
      category: "PRAYER",
      isPinned: true,
      tags: [
        existingTag,
        {
          id: "tag-new" as never,
          name: "Fé Viva",
          normalizedName: "fe viva",
        },
      ],
      updatedAtUtc: UPDATED_AT,
    });
    expect(harness.update).toHaveBeenCalledWith(
      updated,
    );
  });

  it("preserves omitted organization fields and supports clearing category and tags", async () => {
    const harness = createHarness();
    const existing = persistenceEntry({
      category: "PROMISE",
      isPinned: true,
      tags: [
        {
          id: "tag-existing" as never,
          name: "Promessa",
          normalizedName: "promessa",
        },
      ],
    });

    harness.findById.mockResolvedValue(existing);
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const updated =
      await harness.service.updateOrganization(
        ENTRY_ID,
        {
          category: null,
          tagNames: [],
        },
      );

    expect(updated.category).toBeNull();
    expect(updated.isPinned).toBe(true);
    expect(updated.tags).toEqual([]);
    expect(
      harness.findTagByNormalizedName,
    ).not.toHaveBeenCalled();
  });

  it.each([
    [
      null,
      "PERSONAL_JOURNAL_ORGANIZATION_TARGET_NOT_FOUND",
    ],
    [
      persistenceEntry({ status: "TRASHED" }),
      "PERSONAL_JOURNAL_ORGANIZATION_TARGET_TRASHED",
    ],
  ] as const)(
    "rejects invalid organization target %#",
    async (existing, errorCode) => {
      const harness = createHarness();
      harness.findById.mockResolvedValue(existing);

      await expect(
        harness.service.updateOrganization(
          ENTRY_ID,
          {
            category: "REFLECTION",
          },
        ),
      ).rejects.toThrow(errorCode);

      expect(harness.update).not.toHaveBeenCalled();
      expect(harness.now).not.toHaveBeenCalled();
    },
  );

  it("rejects malformed category before persistence", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(
      persistenceEntry(),
    );

    await expect(
      harness.service.updateOrganization(
        ENTRY_ID,
        {
          category:
            "BROKEN" as never,
        },
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_CATEGORY_INVALID",
    );

    expect(harness.update).not.toHaveBeenCalled();
  });

  it("rejects empty tag names before generating ids or persisting", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(
      persistenceEntry(),
    );

    await expect(
      harness.service.updateOrganization(
        ENTRY_ID,
        {
          tagNames: ["   "],
        },
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_TAG_NAME_INVALID",
    );

    expect(harness.createId).not.toHaveBeenCalled();
    expect(harness.update).not.toHaveBeenCalled();
  });

  it("pins and unpins active entries through the organization contract", async () => {
    const harness = createHarness();
    const existing = persistenceEntry({
      isPinned: false,
    });

    harness.findById.mockResolvedValue(existing);
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const pinned = await harness.service.setPinned(
      ENTRY_ID,
      true,
    );

    expect(pinned.isPinned).toBe(true);

    harness.findById.mockResolvedValue({
      ...pinned,
      updatedAtUtc: CREATED_AT,
    });

    const unpinned =
      await harness.service.setPinned(
        ENTRY_ID,
        false,
      );

    expect(unpinned.isPinned).toBe(false);
  });

  it("does not allow a draft to become pinned", async () => {
    const harness = createHarness();

    harness.findById.mockResolvedValue(
      persistenceEntry({
        status: "DRAFT",
        isPinned: false,
      }),
    );

    await expect(
      harness.service.setPinned(
        ENTRY_ID,
        true,
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_PIN_TARGET_INVALID",
    );

    expect(harness.update).not.toHaveBeenCalled();
  });

  it("moves an active entry to trash and clears its pin without deleting content", async () => {
    const harness = createHarness();
    const existing = persistenceEntry({
      category: "TESTIMONY",
      isPinned: true,
    });

    harness.findById.mockResolvedValue(existing);
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const trashed =
      await harness.service.moveToTrash(ENTRY_ID);

    expect(trashed).toEqual({
      ...existing,
      status: "TRASHED",
      isPinned: false,
      updatedAtUtc: UPDATED_AT,
    });
    expect(harness.update).toHaveBeenCalledWith(
      trashed,
    );
    expect(harness.remove).not.toHaveBeenCalled();
  });

  it("treats moving an already trashed entry as idempotent", async () => {
    const harness = createHarness();
    const existing = persistenceEntry({
      status: "TRASHED",
      isPinned: false,
    });

    harness.findById.mockResolvedValue(existing);

    await expect(
      harness.service.moveToTrash(ENTRY_ID),
    ).resolves.toBe(existing);

    expect(harness.now).not.toHaveBeenCalled();
    expect(harness.update).not.toHaveBeenCalled();
    expect(harness.remove).not.toHaveBeenCalled();
  });

  it.each([
    [
      null,
      "PERSONAL_JOURNAL_TRASH_TARGET_NOT_FOUND",
    ],
    [
      persistenceEntry({ status: "DRAFT" }),
      "PERSONAL_JOURNAL_TRASH_TARGET_INVALID",
    ],
  ] as const)(
    "rejects invalid trash target %#",
    async (existing, errorCode) => {
      const harness = createHarness();
      harness.findById.mockResolvedValue(existing);

      await expect(
        harness.service.moveToTrash(ENTRY_ID),
      ).rejects.toThrow(errorCode);

      expect(harness.update).not.toHaveBeenCalled();
      expect(harness.remove).not.toHaveBeenCalled();
    },
  );

  it("restores a trashed entry to active while keeping it unpinned", async () => {
    const harness = createHarness();
    const existing = persistenceEntry({
      status: "TRASHED",
      isPinned: false,
      category: "REFLECTION",
    });

    harness.findById.mockResolvedValue(existing);
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const restored =
      await harness.service.restoreFromTrash(
        ENTRY_ID,
      );

    expect(restored).toEqual({
      ...existing,
      status: "ACTIVE",
      isPinned: false,
      updatedAtUtc: UPDATED_AT,
    });
    expect(harness.update).toHaveBeenCalledWith(
      restored,
    );
  });

  it.each([
    [
      null,
      "PERSONAL_JOURNAL_RESTORE_TARGET_NOT_FOUND",
    ],
    [
      persistenceEntry({ status: "ACTIVE" }),
      "PERSONAL_JOURNAL_RESTORE_TARGET_INVALID",
    ],
  ] as const)(
    "rejects invalid restore target %#",
    async (existing, errorCode) => {
      const harness = createHarness();
      harness.findById.mockResolvedValue(existing);

      await expect(
        harness.service.restoreFromTrash(
          ENTRY_ID,
        ),
      ).rejects.toThrow(errorCode);

      expect(harness.update).not.toHaveBeenCalled();
    },
  );

  it("delegates remove exactly once", async () => {
    const harness = createHarness();

    await harness.service.remove(ENTRY_ID);

    expect(harness.remove).toHaveBeenCalledTimes(1);
    expect(harness.remove).toHaveBeenCalledWith(
      ENTRY_ID,
    );
  });

  it("propagates repository errors without retrying or parsing", async () => {
    const harness = createHarness();
    const repositoryError =
      new Error("REPOSITORY_FAILURE");
    harness.create.mockRejectedValue(repositoryError);

    await expect(
      harness.service.createDraft({
        reflectionText: "Rascunho",
      }),
    ).rejects.toBe(repositoryError);

    expect(harness.create).toHaveBeenCalledTimes(1);
  });
});
