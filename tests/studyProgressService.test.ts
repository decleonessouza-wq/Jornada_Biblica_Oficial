import type {
  StudyProgressRepository,
} from "../src/data/personal/studies/studyProgressRepository";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  StudyId,
  StudySectionId,
} from "../src/domain/studies/study";
import type {
  StudyProgress,
} from "../src/domain/studies/studyProgress";
import {
  StudyProgressService,
} from "../src/services/studies/studyProgressService";

const STUDY_ID = "track-1:study-1" as StudyId;
const SECTION_1 =
  "track-1:study-1:section-1" as StudySectionId;
const SECTION_2 =
  "track-1:study-1:section-2" as StudySectionId;
const TIMESTAMP =
  "2026-09-23T02:00:00.000Z" as PersonalUtcTimestamp;
const NOW = new Date("2026-09-23T02:00:00.000Z");

function createHarness(
  initial: StudyProgress | null = null,
) {
  let stored = initial;

  const load = jest.fn(async () => stored);
  const list = jest.fn(async () =>
    stored === null ? [] : [stored],
  );
  const upsert = jest.fn(
    async (value: StudyProgress) => {
      stored = value;
    },
  );
  const reset = jest.fn(async () => {
    stored = null;
  });

  const repository = {
    load,
    list,
    upsert,
    reset,
  } as StudyProgressRepository;

  const now = jest.fn(() => NOW);
  const clock = { now } as PersonalClock;
  const toUtcTimestamp = jest.fn(() => TIMESTAMP);
  const toLocalDate = jest.fn();
  const datePolicy = {
    toUtcTimestamp,
    toLocalDate,
  } as unknown as PersonalDatePolicy;

  return {
    service: new StudyProgressService(
      repository,
      clock,
      datePolicy,
    ),
    load,
    list,
    upsert,
    reset,
    now,
    toUtcTimestamp,
    getStored: () => stored,
  };
}

describe("StudyProgressService", () => {
  it("opens a study for the first time as IN_PROGRESS at zero percent", async () => {
    const harness = createHarness();

    await expect(
      harness.service.openStudy(STUDY_ID),
    ).resolves.toEqual({
      studyId: STUDY_ID,
      state: "IN_PROGRESS",
      lastSectionKey: null,
      readingProgress: 0,
      startedAt: TIMESTAMP,
      lastOpenedAt: TIMESTAMP,
      completedAt: null,
    });

    expect(harness.upsert).toHaveBeenCalledTimes(1);
    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(harness.toUtcTimestamp).toHaveBeenCalledWith(
      NOW,
    );
  });

  it("reopens without losing startedAt, progress, section or completion state", async () => {
    const startedAt =
      "2026-09-22T20:00:00.000Z" as PersonalUtcTimestamp;
    const completedAt =
      "2026-09-22T21:00:00.000Z" as PersonalUtcTimestamp;
    const existing: StudyProgress = {
      studyId: STUDY_ID,
      state: "COMPLETED",
      lastSectionKey: SECTION_1,
      readingProgress: 100,
      startedAt,
      lastOpenedAt: completedAt,
      completedAt,
    };
    const harness = createHarness(existing);

    await expect(
      harness.service.openStudy(STUDY_ID),
    ).resolves.toEqual({
      ...existing,
      lastOpenedAt: TIMESTAMP,
    });
  });

  it("records section position monotonically without automatic completion", async () => {
    const existing: StudyProgress = {
      studyId: STUDY_ID,
      state: "IN_PROGRESS",
      lastSectionKey: SECTION_1,
      readingProgress: 80,
      startedAt: TIMESTAMP,
      lastOpenedAt: TIMESTAMP,
      completedAt: null,
    };
    const harness = createHarness(existing);

    const earlier = await harness.service.recordSectionOpened({
      studyId: STUDY_ID,
      sectionId: SECTION_1,
      sectionIndex: 1,
      sectionCount: 4,
    });

    expect(earlier.readingProgress).toBe(80);
    expect(earlier.state).toBe("IN_PROGRESS");
    expect(earlier.completedAt).toBeNull();

    const terminal = await harness.service.recordSectionOpened({
      studyId: STUDY_ID,
      sectionId: SECTION_2,
      sectionIndex: 3,
      sectionCount: 4,
    });

    expect(terminal.readingProgress).toBe(100);
    expect(terminal.state).toBe("IN_PROGRESS");
    expect(terminal.completedAt).toBeNull();
    expect(terminal.lastSectionKey).toBe(SECTION_2);
  });

  it("completes explicitly at 100 percent and preserves startedAt and last section", async () => {
    const startedAt =
      "2026-09-22T20:00:00.000Z" as PersonalUtcTimestamp;
    const existing: StudyProgress = {
      studyId: STUDY_ID,
      state: "IN_PROGRESS",
      lastSectionKey: SECTION_2,
      readingProgress: 70,
      startedAt,
      lastOpenedAt: TIMESTAMP,
      completedAt: null,
    };
    const harness = createHarness(existing);

    await expect(
      harness.service.completeStudy(STUDY_ID),
    ).resolves.toEqual({
      ...existing,
      state: "COMPLETED",
      readingProgress: 100,
      startedAt,
      completedAt: TIMESTAMP,
    });
  });

  it("undoes completion without reducing progress or losing resume data", async () => {
    const existing: StudyProgress = {
      studyId: STUDY_ID,
      state: "COMPLETED",
      lastSectionKey: SECTION_2,
      readingProgress: 100,
      startedAt: TIMESTAMP,
      lastOpenedAt: TIMESTAMP,
      completedAt: TIMESTAMP,
    };
    const harness = createHarness(existing);

    await expect(
      harness.service.uncompleteStudy(STUDY_ID),
    ).resolves.toEqual({
      ...existing,
      state: "IN_PROGRESS",
      completedAt: null,
    });
  });

  it("fails closed for an invalid section position", async () => {
    const harness = createHarness();

    await expect(
      harness.service.recordSectionOpened({
        studyId: STUDY_ID,
        sectionId: SECTION_1,
        sectionIndex: 2,
        sectionCount: 2,
      }),
    ).rejects.toThrow(
      "STUDY_PROGRESS_SECTION_POSITION_INVALID",
    );

    expect(harness.load).not.toHaveBeenCalled();
    expect(harness.upsert).not.toHaveBeenCalled();
  });

  it("resets through the repository boundary", async () => {
    const harness = createHarness();

    await harness.service.resetStudy(STUDY_ID);

    expect(harness.reset).toHaveBeenCalledWith(STUDY_ID);
  });
});