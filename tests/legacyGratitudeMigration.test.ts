import type {
  JournalEntryPersistenceRecord,
} from "../src/data/personal/journal/journalRepository";
import type {
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import {
  migrateLegacyGratitude,
  sanitizeLegacyGratitudeMap,
  type LegacyGratitudeCreateInput,
  type LegacyGratitudeJournalPort,
} from "../src/services/journal/legacyGratitudeMigration";

function localDate(value: string): PersonalLocalDate {
  return value as PersonalLocalDate;
}

function timestamp(
  value = "2026-09-11T12:34:56.000Z",
): PersonalUtcTimestamp {
  return value as PersonalUtcTimestamp;
}

function makeRecord(
  entryDate: string,
  gratitudeText: string,
  overrides: Partial<JournalEntryPersistenceRecord> = {},
): JournalEntryPersistenceRecord {
  return {
    id:
      `legacy-${entryDate}` as JournalEntryPersistenceRecord["id"],
    entryDate: localDate(entryDate),
    reflectionText: null,
    gratitudeText,
    status: "ACTIVE",
    sourceType: "HOME_GRATITUDE",
    sourceTitleSnapshot: null,
    promptSnapshot: null,
    category: "GRATITUDE",
    isPinned: false,
    references: [],
    tags: [],
    createdAtUtc: timestamp(),
    updatedAtUtc: timestamp(),
    ...overrides,
  };
}

function makePort(
  initial: readonly JournalEntryPersistenceRecord[] = [],
) {
  const records = [...initial];
  let sequence = 0;

  const createLegacyGratitudeMigrationEntry = jest.fn(
    async (
      input: LegacyGratitudeCreateInput,
    ): Promise<JournalEntryPersistenceRecord> => {
      sequence += 1;
      const record = makeRecord(
        input.entryDate,
        input.gratitudeText,
        {
          id:
            `migrated-${sequence}` as JournalEntryPersistenceRecord["id"],
        },
      );
      records.push(record);
      return record;
    },
  );

  const updateLegacyGratitudeMigrationEntry = jest.fn(
    async (
      existing: JournalEntryPersistenceRecord,
      input: LegacyGratitudeCreateInput,
    ): Promise<JournalEntryPersistenceRecord> => {
      const index = records.findIndex(
        (record) => record.id === existing.id,
      );
      const updated = makeRecord(
        input.entryDate,
        input.gratitudeText,
        {
          id: existing.id,
          createdAtUtc: existing.createdAtUtc,
          updatedAtUtc: timestamp(
            "2026-09-11T13:00:00.000Z",
          ),
        },
      );

      records[index] = updated;
      return updated;
    },
  );

  const removeLegacyGratitudeMigrationEntry = jest.fn(
    async (
      existing: JournalEntryPersistenceRecord,
    ): Promise<void> => {
      const index = records.findIndex(
        (record) => record.id === existing.id,
      );

      if (index >= 0) {
        records.splice(index, 1);
      }
    },
  );

  const port: LegacyGratitudeJournalPort = {
    async listLegacyGratitudeMigrationEntries() {
      return [...records];
    },
    createLegacyGratitudeMigrationEntry,
    updateLegacyGratitudeMigrationEntry,
    removeLegacyGratitudeMigrationEntry,
  };

  return {
    port,
    records,
    createLegacyGratitudeMigrationEntry,
    updateLegacyGratitudeMigrationEntry,
    removeLegacyGratitudeMigrationEntry,
  };
}

describe("legacy gratitude migration core", () => {
  it("sanitizes the legacy map with ISO keys, trim and the 200 character contract", () => {
    const longText = "x".repeat(205);

    expect(
      sanitizeLegacyGratitudeMap({
        "2026-01-02": "  segunda gratidão  ",
        invalid: "ignorar",
        "2026-01-01": " primeira gratidão ",
        "2026-01-03": "   ",
        "2026-01-04": 42,
        "2026-01-05": longText,
      }),
    ).toEqual([
      {
        entryDate: "2026-01-01",
        gratitudeText: "primeira gratidão",
      },
      {
        entryDate: "2026-01-02",
        gratitudeText: "segunda gratidão",
      },
      {
        entryDate: "2026-01-05",
        gratitudeText: "x".repeat(200),
      },
    ]);
  });

  it("creates one HOME_GRATITUDE mirror per legacy date", async () => {
    const harness = makePort();

    const result = await migrateLegacyGratitude(
      harness.port,
      {
        "2026-01-01": "Gratidão um",
        "2026-01-02": "Gratidão dois",
      },
    );

    expect(result).toEqual({
      status: "MIGRATED",
      legacyCount: 2,
      createdCount: 2,
      updatedCount: 0,
      removedCount: 0,
      reconciledCount: 2,
    });
    expect(harness.records).toHaveLength(2);
  });

  it("updates the same HOME_GRATITUDE mirror when legacy content changes", async () => {
    const existing = makeRecord(
      "2026-02-01",
      "Conteúdo antigo",
    );
    const harness = makePort([existing]);

    const result = await migrateLegacyGratitude(
      harness.port,
      {
        "2026-02-01": "Conteúdo novo",
      },
    );

    expect(result.updatedCount).toBe(1);
    expect(result.createdCount).toBe(0);
    expect(result.removedCount).toBe(0);
    expect(harness.records).toHaveLength(1);
    expect(harness.records[0].id).toBe(existing.id);
    expect(harness.records[0].gratitudeText).toBe(
      "Conteúdo novo",
    );
  });

  it("removes only the orphan HOME_GRATITUDE mirror when legacy source removed the date", async () => {
    const harness = makePort([
      makeRecord("2026-03-01", "Remover"),
    ]);

    const result = await migrateLegacyGratitude(
      harness.port,
      {},
    );

    expect(result).toEqual({
      status: "MIGRATED",
      legacyCount: 0,
      createdCount: 0,
      updatedCount: 0,
      removedCount: 1,
      reconciledCount: 0,
    });
    expect(harness.records).toHaveLength(0);
  });

  it("remains idempotent across one hundred executions", async () => {
    const harness = makePort();
    const legacy = {
      "2026-04-01": "A",
      "2026-04-02": "B",
    };

    for (let index = 0; index < 100; index += 1) {
      await migrateLegacyGratitude(
        harness.port,
        legacy,
      );
    }

    expect(harness.records).toHaveLength(2);
    expect(
      harness.createLegacyGratitudeMigrationEntry,
    ).toHaveBeenCalledTimes(2);
    expect(
      harness.updateLegacyGratitudeMigrationEntry,
    ).not.toHaveBeenCalled();
    expect(
      harness.removeLegacyGratitudeMigrationEntry,
    ).not.toHaveBeenCalled();
  });

  it("returns ALREADY_RECONCILED for an exact mirror", async () => {
    const harness = makePort([
      makeRecord("2026-05-01", "Persistida"),
    ]);

    const result = await migrateLegacyGratitude(
      harness.port,
      {
        "2026-05-01": "Persistida",
      },
    );

    expect(result.status).toBe(
      "ALREADY_RECONCILED",
    );
    expect(result.createdCount).toBe(0);
    expect(result.updatedCount).toBe(0);
    expect(result.removedCount).toBe(0);
  });

  it("fails closed before writes when duplicate HOME_GRATITUDE mirrors exist for one date", async () => {
    const harness = makePort([
      makeRecord("2026-06-01", "Mesma"),
      makeRecord("2026-06-01", "Mesma", {
        id:
          "legacy-duplicate" as JournalEntryPersistenceRecord["id"],
      }),
    ]);

    await expect(
      migrateLegacyGratitude(
        harness.port,
        {
          "2026-06-01": "Mesma",
          "2026-06-02": "Nova",
        },
      ),
    ).rejects.toThrow(
      "PERSONAL_LEGACY_GRATITUDE_DUPLICATE_CONFLICT",
    );

    expect(
      harness.createLegacyGratitudeMigrationEntry,
    ).not.toHaveBeenCalled();
    expect(
      harness.updateLegacyGratitudeMigrationEntry,
    ).not.toHaveBeenCalled();
    expect(
      harness.removeLegacyGratitudeMigrationEntry,
    ).not.toHaveBeenCalled();
  });

  it("rejects impossible calendar dates before any write", async () => {
    const harness = makePort();

    await expect(
      migrateLegacyGratitude(
        harness.port,
        {
          "2026-02-31": "Data impossível",
        },
      ),
    ).rejects.toThrow(
      "PERSONAL_LEGACY_GRATITUDE_DATE_INVALID",
    );

    expect(
      harness.createLegacyGratitudeMigrationEntry,
    ).not.toHaveBeenCalled();
  });

  it("returns EMPTY only when legacy source and HOME_GRATITUDE mirror set are empty", async () => {
    const harness = makePort();

    await expect(
      migrateLegacyGratitude(
        harness.port,
        {},
      ),
    ).resolves.toEqual({
      status: "EMPTY",
      legacyCount: 0,
      createdCount: 0,
      updatedCount: 0,
      removedCount: 0,
      reconciledCount: 0,
    });
  });

  it("fails post-write reconciliation when the port cannot observe a created mirror", async () => {
    const createLegacyGratitudeMigrationEntry = jest.fn(
      async (
        input: LegacyGratitudeCreateInput,
      ): Promise<JournalEntryPersistenceRecord> =>
        makeRecord(
          input.entryDate,
          input.gratitudeText,
        ),
    );

    const port: LegacyGratitudeJournalPort = {
      async listLegacyGratitudeMigrationEntries() {
        return [];
      },
      createLegacyGratitudeMigrationEntry,
      updateLegacyGratitudeMigrationEntry: jest.fn(),
      removeLegacyGratitudeMigrationEntry: jest.fn(),
    };

    await expect(
      migrateLegacyGratitude(
        port,
        {
          "2026-07-01": "Não observada",
        },
      ),
    ).rejects.toThrow(
      "PERSONAL_LEGACY_GRATITUDE_RECONCILIATION_COUNT_MISMATCH",
    );
  });
});
