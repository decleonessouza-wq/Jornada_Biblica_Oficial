import type {
  DevotionalProgressRepository,
} from "../src/data/personal/devotionals/devotionalProgressRepository";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  DevotionalId,
  DevotionalBlockId,
} from "../src/domain/devotionals/devotional";
import type {
  DevotionalProgress,
} from "../src/domain/devotionals/devotionalProgress";
import {
  DevotionalProgressService,
} from "../src/services/devotionals/devotionalProgressService";

const DEVOTIONAL_ID = "track-1:devotional-1" as DevotionalId;
const BLOCK_1 =
  "track-1:devotional-1:block-1" as DevotionalBlockId;
const BLOCK_2 =
  "track-1:devotional-1:block-2" as DevotionalBlockId;
const TIMESTAMP =
  "2026-09-23T02:00:00.000Z" as PersonalUtcTimestamp;
const NOW = new Date("2026-09-23T02:00:00.000Z");

function createHarness(
  initial: DevotionalProgress | null = null,
) {
  let stored = initial;

  const load = jest.fn(async () => stored);
  const list = jest.fn(async () =>
    stored === null ? [] : [stored],
  );
  const upsert = jest.fn(
    async (value: DevotionalProgress) => {
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
  } as DevotionalProgressRepository;

  const now = jest.fn(() => NOW);
  const clock = { now } as PersonalClock;
  const toUtcTimestamp = jest.fn(() => TIMESTAMP);
  const toLocalDate = jest.fn();
  const datePolicy = {
    toUtcTimestamp,
    toLocalDate,
  } as unknown as PersonalDatePolicy;

  return {
    service: new DevotionalProgressService(
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

describe("DevotionalProgressService", () => {
  it("opens a devotional for the first time as IN_PROGRESS at zero percent", async () => {
    const harness = createHarness();

    await expect(
      harness.service.openDevotional(DEVOTIONAL_ID),
    ).resolves.toEqual({
      devotionalId: DEVOTIONAL_ID,
      state: "IN_PROGRESS",
      lastBlockId: null,
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

  it("reopens without losing startedAt, progress, block or completion state", async () => {
    const startedAt =
      "2026-09-22T20:00:00.000Z" as PersonalUtcTimestamp;
    const completedAt =
      "2026-09-22T21:00:00.000Z" as PersonalUtcTimestamp;
    const existing: DevotionalProgress = {
      devotionalId: DEVOTIONAL_ID,
      state: "COMPLETED",
      lastBlockId: BLOCK_1,
      readingProgress: 100,
      startedAt,
      lastOpenedAt: completedAt,
      completedAt,
    };
    const harness = createHarness(existing);

    await expect(
      harness.service.openDevotional(DEVOTIONAL_ID),
    ).resolves.toEqual({
      ...existing,
      lastOpenedAt: TIMESTAMP,
    });
  });

  it("records block position monotonically without automatic completion", async () => {
    const existing: DevotionalProgress = {
      devotionalId: DEVOTIONAL_ID,
      state: "IN_PROGRESS",
      lastBlockId: BLOCK_1,
      readingProgress: 80,
      startedAt: TIMESTAMP,
      lastOpenedAt: TIMESTAMP,
      completedAt: null,
    };
    const harness = createHarness(existing);

    const earlier = await harness.service.recordBlockOpened({
      devotionalId: DEVOTIONAL_ID,
      blockId: BLOCK_1,
      blockIndex: 1,
      blockCount: 4,
    });

    expect(earlier.readingProgress).toBe(80);
    expect(earlier.state).toBe("IN_PROGRESS");
    expect(earlier.completedAt).toBeNull();

    const terminal = await harness.service.recordBlockOpened({
      devotionalId: DEVOTIONAL_ID,
      blockId: BLOCK_2,
      blockIndex: 3,
      blockCount: 4,
    });

    expect(terminal.readingProgress).toBe(100);
    expect(terminal.state).toBe("IN_PROGRESS");
    expect(terminal.completedAt).toBeNull();
    expect(terminal.lastBlockId).toBe(BLOCK_2);
  });

  it("completes explicitly at 100 percent and preserves startedAt and last block", async () => {
    const startedAt =
      "2026-09-22T20:00:00.000Z" as PersonalUtcTimestamp;
    const existing: DevotionalProgress = {
      devotionalId: DEVOTIONAL_ID,
      state: "IN_PROGRESS",
      lastBlockId: BLOCK_2,
      readingProgress: 70,
      startedAt,
      lastOpenedAt: TIMESTAMP,
      completedAt: null,
    };
    const harness = createHarness(existing);

    await expect(
      harness.service.completeDevotional(DEVOTIONAL_ID),
    ).resolves.toEqual({
      ...existing,
      state: "COMPLETED",
      readingProgress: 100,
      startedAt,
      completedAt: TIMESTAMP,
    });
  });

  it("undoes completion without reducing progress or losing resume data", async () => {
    const existing: DevotionalProgress = {
      devotionalId: DEVOTIONAL_ID,
      state: "COMPLETED",
      lastBlockId: BLOCK_2,
      readingProgress: 100,
      startedAt: TIMESTAMP,
      lastOpenedAt: TIMESTAMP,
      completedAt: TIMESTAMP,
    };
    const harness = createHarness(existing);

    await expect(
      harness.service.uncompleteDevotional(DEVOTIONAL_ID),
    ).resolves.toEqual({
      ...existing,
      state: "IN_PROGRESS",
      completedAt: null,
    });
  });

  it("fails closed for an invalid block position", async () => {
    const harness = createHarness();

    await expect(
      harness.service.recordBlockOpened({
        devotionalId: DEVOTIONAL_ID,
        blockId: BLOCK_1,
        blockIndex: 2,
        blockCount: 2,
      }),
    ).rejects.toThrow(
      "DEVOTIONAL_PROGRESS_BLOCK_POSITION_INVALID",
    );

    expect(harness.load).not.toHaveBeenCalled();
    expect(harness.upsert).not.toHaveBeenCalled();
  });

  it("resets through the repository boundary", async () => {
    const harness = createHarness();

    await harness.service.resetDevotional(DEVOTIONAL_ID);

    expect(harness.reset).toHaveBeenCalledWith(DEVOTIONAL_ID);
  });
});