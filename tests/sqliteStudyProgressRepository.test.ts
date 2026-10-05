import type { SQLiteDatabase } from "expo-sqlite";

import type {
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  StudyId,
  StudySectionId,
} from "../src/domain/studies/study";
import type {
  StudyProgress,
} from "../src/domain/studies/studyProgress";
import type {
  PersonalDatabase,
} from "../src/data/personal/personalDatabase";
import {
  SQLiteStudyProgressRepository,
} from "../src/data/personal/studies/sqliteStudyProgressRepository";

const STUDY_ID = "track-1:study-1" as StudyId;
const SECTION_ID = "track-1:study-1:section-2" as StudySectionId;
const STARTED_AT =
  "2026-09-23T01:00:00.000Z" as PersonalUtcTimestamp;
const LAST_OPENED_AT =
  "2026-09-23T01:05:00.000Z" as PersonalUtcTimestamp;

function row(overrides: Record<string, unknown> = {}) {
  return {
    study_id: STUDY_ID,
    state: "IN_PROGRESS",
    last_section_key: SECTION_ID,
    reading_progress: 40,
    started_at_utc: STARTED_AT,
    last_opened_at_utc: LAST_OPENED_AT,
    completed_at_utc: null,
    ...overrides,
  };
}

function progress(): StudyProgress {
  return {
    studyId: STUDY_ID,
    state: "IN_PROGRESS",
    lastSectionKey: SECTION_ID,
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
    repository: new SQLiteStudyProgressRepository(
      personalDatabase,
    ),
    getFirstAsync,
    getAllAsync,
    runAsync,
    withConnection,
  };
}

describe("SQLiteStudyProgressRepository", () => {
  it("loads one canonical StudyProgress row or null", async () => {
    const harness = createHarness();

    harness.getFirstAsync
      .mockResolvedValueOnce(row())
      .mockResolvedValueOnce(null);

    await expect(
      harness.repository.load(STUDY_ID),
    ).resolves.toEqual(progress());

    await expect(
      harness.repository.load(STUDY_ID),
    ).resolves.toBeNull();

    expect(
      harness.getFirstAsync.mock.calls[0]?.slice(1),
    ).toEqual([STUDY_ID]);
  });

  it("lists deterministically by canonical study id", async () => {
    const harness = createHarness();
    harness.getAllAsync.mockResolvedValue([row()]);

    await expect(
      harness.repository.list(),
    ).resolves.toEqual([progress()]);

    const sql = String(
      harness.getAllAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain("ORDER BY study_id ASC");
  });

  it("upserts all approved StudyProgress persistence fields by study_id", async () => {
    const harness = createHarness();
    const value = progress();
    harness.runAsync.mockResolvedValue(undefined);

    await harness.repository.upsert(value);

    const sql = String(
      harness.runAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "INSERT INTO personal_study_progress",
    );
    expect(sql).toContain(
      "ON CONFLICT(study_id) DO UPDATE SET",
    );
    expect(
      harness.runAsync.mock.calls[0]?.slice(1),
    ).toEqual([
      value.studyId,
      value.state,
      value.lastSectionKey,
      value.readingProgress,
      value.startedAt,
      value.lastOpenedAt,
      value.completedAt,
    ]);
  });

  it("resets idempotently by canonical study id", async () => {
    const harness = createHarness();
    harness.runAsync.mockResolvedValue(undefined);

    await harness.repository.reset(STUDY_ID);
    await harness.repository.reset(STUDY_ID);

    expect(harness.runAsync).toHaveBeenCalledTimes(2);

    const sql = String(
      harness.runAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "DELETE FROM personal_study_progress",
    );
    expect(
      harness.runAsync.mock.calls[0]?.slice(1),
    ).toEqual([STUDY_ID]);
  });

  it("fails closed for invalid persisted reading progress", async () => {
    const harness = createHarness();
    harness.getFirstAsync.mockResolvedValue(
      row({ reading_progress: 101 }),
    );

    await expect(
      harness.repository.load(STUDY_ID),
    ).rejects.toThrow(
      "PERSONAL_STUDY_PROGRESS_ROW_READING_PROGRESS_INVALID",
    );
  });
});