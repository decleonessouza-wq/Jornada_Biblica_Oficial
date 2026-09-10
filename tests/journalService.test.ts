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
  const create = jest.fn();
  const update = jest.fn();
  const remove = jest.fn();

  const repository = {
    list,
    findById,
    findByDate,
    listByDate,
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
  it("delegates list without reordering repository results", async () => {
    const harness = createHarness();
    const first = persistenceEntry({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
    });
    const second = persistenceEntry({
      id: OTHER_ENTRY_ID,
      entryDate: OTHER_ENTRY_DATE,
    });

    harness.list.mockResolvedValue([first, second]);

    await expect(
      harness.service.list(),
    ).resolves.toEqual([first, second]);

    expect(harness.list).toHaveBeenCalledTimes(1);
  });

  it("delegates findById and returns null transparently", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(null);

    await expect(
      harness.service.findById(ENTRY_ID),
    ).resolves.toBeNull();

    expect(harness.findById).toHaveBeenCalledTimes(1);
    expect(harness.findById).toHaveBeenCalledWith(ENTRY_ID);
  });

  it("keeps findByDate as a compatibility bridge", async () => {
    const harness = createHarness();
    const existing = persistenceEntry();
    harness.findByDate.mockResolvedValue(existing);

    await expect(
      harness.service.findByDate(ENTRY_DATE),
    ).resolves.toBe(existing);

    expect(harness.findByDate).toHaveBeenCalledTimes(1);
    expect(harness.findByDate).toHaveBeenCalledWith(ENTRY_DATE);
  });

  it("delegates listByDate and preserves multiple entries and repository order", async () => {
    const harness = createHarness();
    const first = persistenceEntry({
      id: OTHER_ENTRY_ID,
      entryDate: ENTRY_DATE,
    });
    const second = persistenceEntry({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
    });
    harness.listByDate.mockResolvedValue([first, second]);

    await expect(
      harness.service.listByDate(ENTRY_DATE),
    ).resolves.toEqual([first, second]);

    expect(harness.listByDate).toHaveBeenCalledTimes(1);
    expect(harness.listByDate).toHaveBeenCalledWith(ENTRY_DATE);
  });

  it("creates with local date derived from the same captured now without a date-conflict lookup", async () => {
    const harness = createHarness();

    const result = await harness.service.create({
      reflectionText: "Reflexão",
    });

    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(harness.toLocalDate).toHaveBeenCalledTimes(1);
    expect(harness.toLocalDate).toHaveBeenCalledWith(NOW);
    expect(harness.toUtcTimestamp).toHaveBeenCalledTimes(1);
    expect(harness.toUtcTimestamp).toHaveBeenCalledWith(NOW);
    expect(harness.createId).toHaveBeenCalledTimes(1);
    expect(harness.createId).toHaveBeenCalledWith("journal_entry");
    expect(harness.findByDate).not.toHaveBeenCalled();
    expect(harness.create).toHaveBeenCalledTimes(1);
    expect(harness.create).toHaveBeenCalledWith({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
      reflectionText: "Reflexão",
      gratitudeText: null,
      createdAtUtc: CREATED_AT,
      updatedAtUtc: CREATED_AT,
    });
    expect(result).toEqual({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
      reflectionText: "Reflexão",
      gratitudeText: null,
      createdAtUtc: CREATED_AT,
      updatedAtUtc: CREATED_AT,
    });
  });

  it("preserves an explicit create entryDate", async () => {
    const harness = createHarness();

    const result = await harness.service.create({
      entryDate: OTHER_ENTRY_DATE,
      gratitudeText: "Obrigado",
    });

    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(harness.toLocalDate).not.toHaveBeenCalled();
    expect(harness.findByDate).not.toHaveBeenCalled();
    expect(result.entryDate).toBe(OTHER_ENTRY_DATE);
  });

  it("allows two entries on the same date with distinct canonical ids", async () => {
    const harness = createHarness();
    harness.createId
      .mockReturnValueOnce(ENTRY_ID)
      .mockReturnValueOnce(OTHER_ENTRY_ID);

    const first = await harness.service.create({
      entryDate: ENTRY_DATE,
      reflectionText: "Primeira reflexão",
    });
    const second = await harness.service.create({
      entryDate: ENTRY_DATE,
      reflectionText: "Segunda reflexão",
    });

    expect(first.entryDate).toBe(ENTRY_DATE);
    expect(second.entryDate).toBe(ENTRY_DATE);
    expect(first.id).toBe(ENTRY_ID);
    expect(second.id).toBe(OTHER_ENTRY_ID);
    expect(harness.createId).toHaveBeenCalledTimes(2);
    expect(harness.createId).toHaveBeenNthCalledWith(
      1,
      "journal_entry",
    );
    expect(harness.createId).toHaveBeenNthCalledWith(
      2,
      "journal_entry",
    );
    expect(harness.findByDate).not.toHaveBeenCalled();
    expect(harness.create).toHaveBeenCalledTimes(2);
  });

  it("persists each valid create exactly once", async () => {
    const harness = createHarness();

    await harness.service.create({
      reflectionText: "Registro válido",
    });

    expect(harness.create).toHaveBeenCalledTimes(1);
  });

  it("normalizes absent or whitespace-only create content to null while preserving non-empty text", async () => {
    const harness = createHarness();

    const result = await harness.service.create({
      reflectionText: undefined,
      gratitudeText: "   Obrigado   ",
    });

    expect(result.reflectionText).toBeNull();
    expect(result.gratitudeText).toBe("   Obrigado   ");
  });

  it("preserves non-empty create text byte-for-byte without trimming", async () => {
    const harness = createHarness();
    const reflectionText = "  linha 1\nlinha 2  ";
    const gratitudeText = "\tObrigado, Senhor.  ";

    const result = await harness.service.create({
      reflectionText,
      gratitudeText,
    });

    expect(result.reflectionText).toBe(reflectionText);
    expect(result.gratitudeText).toBe(gratitudeText);
  });

  it.each([
    ["reflectionText", 5001, "PERSONAL_JOURNAL_REFLECTION_TEXT_INVALID"],
    ["gratitudeText", 201, "PERSONAL_JOURNAL_GRATITUDE_TEXT_INVALID"],
  ] as const)(
    "rejects %s over its maximum",
    async (field, length, code) => {
      const harness = createHarness();

      await expect(
        harness.service.create({
          [field]: "x".repeat(length),
        }),
      ).rejects.toThrow(code);

      expect(harness.findByDate).not.toHaveBeenCalled();
      expect(harness.create).not.toHaveBeenCalled();
    },
  );

  it("rejects create when both content fields are absent", async () => {
    const harness = createHarness();

    await expect(
      harness.service.create({
        reflectionText: "   ",
        gratitudeText: undefined,
      }),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED",
    );

    expect(harness.findByDate).not.toHaveBeenCalled();
    expect(harness.create).not.toHaveBeenCalled();
  });

  it("rejects update when the target does not exist", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(null);

    await expect(
      harness.service.update(ENTRY_ID, {
        reflectionText: "Atualização",
      }),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
    );

    expect(harness.now).not.toHaveBeenCalled();
    expect(harness.update).not.toHaveBeenCalled();
  });

  it("updates with the basic JournalEntry shape while preserving id, date, createdAt and omitted content", async () => {
    const harness = createHarness();
    const existing = persistenceEntry({
      reflectionText: "Original",
      gratitudeText: "Obrigado",
    });
    harness.findById.mockResolvedValue(existing);
    harness.toUtcTimestamp.mockReturnValue(UPDATED_AT);

    const result = await harness.service.update(
      ENTRY_ID,
      { gratitudeText: "Nova gratidão" },
    );

    expect(result).toEqual({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
      reflectionText: "Original",
      gratitudeText: "Nova gratidão",
      createdAtUtc: CREATED_AT,
      updatedAtUtc: UPDATED_AT,
    });
    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(harness.toUtcTimestamp).toHaveBeenCalledWith(NOW);
    expect(harness.update).toHaveBeenCalledWith(result);

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
    expect(persisted).not.toHaveProperty("sourceType");
    expect(persisted).not.toHaveProperty("sourceTitleSnapshot");
    expect(persisted).not.toHaveProperty("promptSnapshot");
    expect(persisted).not.toHaveProperty("references");
    expect(persisted).not.toHaveProperty("tags");
  });

  it("treats null in update as an explicit clear", async () => {
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

    expect(result.reflectionText).toBe("Manter");
    expect(result.gratitudeText).toBeNull();
  });

  it("normalizes a whitespace-only update replacement to null", async () => {
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
      { gratitudeText: "   " },
    );

    expect(result.reflectionText).toBe("Manter");
    expect(result.gratitudeText).toBeNull();
  });

  it("rejects update when merged content becomes empty", async () => {
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

    expect(harness.now).not.toHaveBeenCalled();
    expect(harness.update).not.toHaveBeenCalled();
  });

  it("rejects invalid update limits before persistence", async () => {
    const harness = createHarness();
    harness.findById.mockResolvedValue(persistenceEntry());

    await expect(
      harness.service.update(
        ENTRY_ID,
        { gratitudeText: "x".repeat(201) },
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_GRATITUDE_TEXT_INVALID",
    );

    expect(harness.now).not.toHaveBeenCalled();
    expect(harness.update).not.toHaveBeenCalled();
  });

  it("delegates remove exactly once", async () => {
    const harness = createHarness();

    await harness.service.remove(ENTRY_ID);

    expect(harness.remove).toHaveBeenCalledTimes(1);
    expect(harness.remove).toHaveBeenCalledWith(ENTRY_ID);
  });

  it("propagates repository read errors without parsing them", async () => {
    const harness = createHarness();
    const repositoryError = new Error("REPOSITORY_FAILURE");
    harness.list.mockRejectedValue(repositoryError);

    await expect(
      harness.service.list(),
    ).rejects.toBe(repositoryError);
  });

  it("propagates repository create errors without retrying or date-conflict lookup", async () => {
    const harness = createHarness();
    const repositoryError = new Error("CREATE_FAILURE");
    harness.create.mockRejectedValue(repositoryError);

    await expect(
      harness.service.create({
        reflectionText: "Reflexão",
      }),
    ).rejects.toBe(repositoryError);

    expect(harness.findByDate).not.toHaveBeenCalled();
    expect(harness.create).toHaveBeenCalledTimes(1);
  });
});