import type { SQLiteDatabase } from "expo-sqlite";

import type {
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  DevotionalId,
  DevotionalBlockId,
} from "../src/domain/devotionals/devotional";
import type {
  DevotionalProgress,
} from "../src/domain/devotionals/devotionalProgress";
import type {
  PersonalDatabase,
} from "../src/data/personal/personalDatabase";
import {
  SQLiteDevotionalProgressRepository,
} from "../src/data/personal/devotionals/sqliteDevotionalProgressRepository";

const DEVOTIONAL_ID = "track-1:devotional-1" as DevotionalId;
const BLOCK_ID = "track-1:devotional-1:block-2" as DevotionalBlockId;
const STARTED_AT =
  "2026-09-23T01:00:00.000Z" as PersonalUtcTimestamp;
const LAST_OPENED_AT =
  "2026-09-23T01:05:00.000Z" as PersonalUtcTimestamp;

function row(overrides: Record<string, unknown> = {}) {
  return {
    devotional_id: DEVOTIONAL_ID,
    state: "IN_PROGRESS",
    last_block_id: BLOCK_ID,
    reading_progress: 40,
    started_at_utc: STARTED_AT,
    last_opened_at_utc: LAST_OPENED_AT,
    completed_at_utc: null,
    ...overrides,
  };
}

function progress(): DevotionalProgress {
  return {
    devotionalId: DEVOTIONAL_ID,
    state: "IN_PROGRESS",
    lastBlockId: BLOCK_ID,
    readingProgress: 40,
    startedAt: STARTED_AT,
    lastOpenedAt: LAST_OPENED_AT,
    completedAt: null,
  };
}

function createHarness() {
  const getFirstAsync = jest.fn();
  const getAllAsync = jest.fn();
  const runAsync = jest.fn();

  const database = {
    getFirstAsync,
    getAllAsync,
    runAsync,
  } as unknown as SQLiteDatabase;

  const withConnection = jest.fn(
    async (
      operation: (
        database: SQLiteDatabase,
      ) => Promise<unknown>,
    ) => operation(database),
  );

  const personalDatabase = {
    withConnection,
  } as unknown as PersonalDatabase;

  return {
    repository: new SQLiteDevotionalProgressRepository(
      personalDatabase,
    ),
    getFirstAsync,
    getAllAsync,
    runAsync,
    withConnection,
  };
}

describe("SQLiteDevotionalProgressRepository", () => {
  it("loads one canonical DevotionalProgress row or null", async () => {
    const harness = createHarness();

    harness.getFirstAsync
      .mockResolvedValueOnce(row())
      .mockResolvedValueOnce(null);

    await expect(
      harness.repository.load(DEVOTIONAL_ID),
    ).resolves.toEqual(progress());

    await expect(
      harness.repository.load(DEVOTIONAL_ID),
    ).resolves.toBeNull();

    expect(
      harness.getFirstAsync.mock.calls[0]?.slice(1),
    ).toEqual([DEVOTIONAL_ID]);
  });

  it("lists deterministically by canonical devotional id", async () => {
    const harness = createHarness();
    harness.getAllAsync.mockResolvedValue([row()]);

    await expect(
      harness.repository.list(),
    ).resolves.toEqual([progress()]);

    const sql = String(
      harness.getAllAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain("ORDER BY devotional_id ASC");
  });

  it("upserts all approved DevotionalProgress persistence fields by devotional_id", async () => {
    const harness = createHarness();
    const value = progress();
    harness.runAsync.mockResolvedValue(undefined);

    await harness.repository.upsert(value);

    const sql = String(
      harness.runAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "INSERT INTO personal_devotional_progress",
    );
    expect(sql).toContain(
      "ON CONFLICT(devotional_id) DO UPDATE SET",
    );
    expect(
      harness.runAsync.mock.calls[0]?.slice(1),
    ).toEqual([
      value.devotionalId,
      value.state,
      value.lastBlockId,
      value.readingProgress,
      value.startedAt,
      value.lastOpenedAt,
      value.completedAt,
    ]);
  });

  it("resets idempotently by canonical devotional id", async () => {
    const harness = createHarness();
    harness.runAsync.mockResolvedValue(undefined);

    await harness.repository.reset(DEVOTIONAL_ID);
    await harness.repository.reset(DEVOTIONAL_ID);

    expect(harness.runAsync).toHaveBeenCalledTimes(2);

    const sql = String(
      harness.runAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "DELETE FROM personal_devotional_progress",
    );
    expect(
      harness.runAsync.mock.calls[0]?.slice(1),
    ).toEqual([DEVOTIONAL_ID]);
  });

  it("fails closed for invalid persisted reading progress", async () => {
    const harness = createHarness();
    harness.getFirstAsync.mockResolvedValue(
      row({ reading_progress: 101 }),
    );

    await expect(
      harness.repository.load(DEVOTIONAL_ID),
    ).rejects.toThrow(
      "PERSONAL_DEVOTIONAL_PROGRESS_ROW_READING_PROGRESS_INVALID",
    );
  });
});