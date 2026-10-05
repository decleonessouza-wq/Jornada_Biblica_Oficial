import type {
  DevotionalProgressRepository,
} from "../../data/personal/devotionals/devotionalProgressRepository";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalUtcTimestamp,
} from "../../domain/personal/personalTime";
import type {
  DevotionalId,
  DevotionalBlockId,
} from "../../domain/devotionals/devotional";
import type {
  DevotionalProgress,
} from "../../domain/devotionals/devotionalProgress";

export type RecordDevotionalBlockOpenedInput = Readonly<{
  devotionalId: DevotionalId;
  blockId: DevotionalBlockId;
  blockIndex: number;
  blockCount: number;
}>;

function assertBlockPosition(
  blockIndex: number,
  blockCount: number,
): void {
  if (
    !Number.isInteger(blockIndex) ||
    !Number.isInteger(blockCount) ||
    blockCount <= 0 ||
    blockIndex < 0 ||
    blockIndex >= blockCount
  ) {
    throw new Error(
      "DEVOTIONAL_PROGRESS_BLOCK_POSITION_INVALID",
    );
  }
}

function readingProgressForPosition(
  blockIndex: number,
  blockCount: number,
): number {
  assertBlockPosition(blockIndex, blockCount);

  return Math.round(
    ((blockIndex + 1) / blockCount) * 100,
  );
}

export class DevotionalProgressService {
  constructor(
    private readonly repository: DevotionalProgressRepository,
    private readonly clock: PersonalClock,
    private readonly datePolicy: PersonalDatePolicy,
  ) {}

  private nowTimestamp(): PersonalUtcTimestamp {
    return this.datePolicy.toUtcTimestamp(
      this.clock.now(),
    );
  }

  async load(
    devotionalId: DevotionalId,
  ): Promise<DevotionalProgress | null> {
    return this.repository.load(devotionalId);
  }

  async list(): Promise<readonly DevotionalProgress[]> {
    return this.repository.list();
  }

  async openDevotional(
    devotionalId: DevotionalId,
  ): Promise<DevotionalProgress> {
    const timestamp = this.nowTimestamp();
    const existing = await this.repository.load(devotionalId);

    const progress: DevotionalProgress = existing === null
      ? {
          devotionalId,
          state: "IN_PROGRESS",
          lastBlockId: null,
          readingProgress: 0,
          startedAt: timestamp,
          lastOpenedAt: timestamp,
          completedAt: null,
        }
      : {
          ...existing,
          state:
            existing.state === "NOT_STARTED"
              ? "IN_PROGRESS"
              : existing.state,
          startedAt: existing.startedAt ?? timestamp,
          lastOpenedAt: timestamp,
        };

    await this.repository.upsert(progress);

    return progress;
  }

  async recordBlockOpened(
    input: RecordDevotionalBlockOpenedInput,
  ): Promise<DevotionalProgress> {
    assertBlockPosition(
      input.blockIndex,
      input.blockCount,
    );

    const timestamp = this.nowTimestamp();
    const existing =
      await this.repository.load(input.devotionalId);
    const computedReadingProgress =
      readingProgressForPosition(
        input.blockIndex,
        input.blockCount,
      );

    const base: DevotionalProgress = existing === null
      ? {
          devotionalId: input.devotionalId,
          state: "IN_PROGRESS",
          lastBlockId: null,
          readingProgress: 0,
          startedAt: timestamp,
          lastOpenedAt: timestamp,
          completedAt: null,
        }
      : {
          ...existing,
          state:
            existing.state === "NOT_STARTED"
              ? "IN_PROGRESS"
              : existing.state,
          startedAt: existing.startedAt ?? timestamp,
          lastOpenedAt: timestamp,
        };

    const progress: DevotionalProgress = {
      ...base,
      lastBlockId: input.blockId,
      readingProgress:
        base.state === "COMPLETED"
          ? 100
          : Math.max(
              base.readingProgress,
              computedReadingProgress,
            ),
    };

    await this.repository.upsert(progress);

    return progress;
  }

  async completeDevotional(
    devotionalId: DevotionalId,
  ): Promise<DevotionalProgress> {
    const timestamp = this.nowTimestamp();
    const existing = await this.repository.load(devotionalId);

    const progress: DevotionalProgress = {
      devotionalId,
      state: "COMPLETED",
      lastBlockId:
        existing?.lastBlockId ?? null,
      readingProgress: 100,
      startedAt:
        existing?.startedAt ?? timestamp,
      lastOpenedAt:
        existing?.lastOpenedAt ?? timestamp,
      completedAt: timestamp,
    };

    await this.repository.upsert(progress);

    return progress;
  }

  async uncompleteDevotional(
    devotionalId: DevotionalId,
  ): Promise<DevotionalProgress> {
    const existing = await this.repository.load(devotionalId);

    if (existing === null) {
      throw new Error(
        "DEVOTIONAL_PROGRESS_UNCOMPLETE_TARGET_NOT_FOUND",
      );
    }

    const progress: DevotionalProgress = {
      ...existing,
      state: "IN_PROGRESS",
      completedAt: null,
    };

    await this.repository.upsert(progress);

    return progress;
  }

  async resetDevotional(
    devotionalId: DevotionalId,
  ): Promise<void> {
    await this.repository.reset(devotionalId);
  }
}