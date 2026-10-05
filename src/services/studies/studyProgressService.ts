import type {
  StudyProgressRepository,
} from "../../data/personal/studies/studyProgressRepository";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalUtcTimestamp,
} from "../../domain/personal/personalTime";
import type {
  StudyId,
  StudySectionId,
} from "../../domain/studies/study";
import type {
  StudyProgress,
} from "../../domain/studies/studyProgress";

export type RecordStudySectionOpenedInput = Readonly<{
  studyId: StudyId;
  sectionId: StudySectionId;
  sectionIndex: number;
  sectionCount: number;
}>;

function assertSectionPosition(
  sectionIndex: number,
  sectionCount: number,
): void {
  if (
    !Number.isInteger(sectionIndex) ||
    !Number.isInteger(sectionCount) ||
    sectionCount <= 0 ||
    sectionIndex < 0 ||
    sectionIndex >= sectionCount
  ) {
    throw new Error(
      "STUDY_PROGRESS_SECTION_POSITION_INVALID",
    );
  }
}

function readingProgressForPosition(
  sectionIndex: number,
  sectionCount: number,
): number {
  assertSectionPosition(sectionIndex, sectionCount);

  return Math.round(
    ((sectionIndex + 1) / sectionCount) * 100,
  );
}

export class StudyProgressService {
  constructor(
    private readonly repository: StudyProgressRepository,
    private readonly clock: PersonalClock,
    private readonly datePolicy: PersonalDatePolicy,
  ) {}

  private nowTimestamp(): PersonalUtcTimestamp {
    return this.datePolicy.toUtcTimestamp(
      this.clock.now(),
    );
  }

  async load(
    studyId: StudyId,
  ): Promise<StudyProgress | null> {
    return this.repository.load(studyId);
  }

  async list(): Promise<readonly StudyProgress[]> {
    return this.repository.list();
  }

  async openStudy(
    studyId: StudyId,
  ): Promise<StudyProgress> {
    const timestamp = this.nowTimestamp();
    const existing = await this.repository.load(studyId);

    const progress: StudyProgress = existing === null
      ? {
          studyId,
          state: "IN_PROGRESS",
          lastSectionKey: null,
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

  async recordSectionOpened(
    input: RecordStudySectionOpenedInput,
  ): Promise<StudyProgress> {
    assertSectionPosition(
      input.sectionIndex,
      input.sectionCount,
    );

    const timestamp = this.nowTimestamp();
    const existing =
      await this.repository.load(input.studyId);
    const computedReadingProgress =
      readingProgressForPosition(
        input.sectionIndex,
        input.sectionCount,
      );

    const base: StudyProgress = existing === null
      ? {
          studyId: input.studyId,
          state: "IN_PROGRESS",
          lastSectionKey: null,
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

    const progress: StudyProgress = {
      ...base,
      lastSectionKey: input.sectionId,
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

  async completeStudy(
    studyId: StudyId,
  ): Promise<StudyProgress> {
    const timestamp = this.nowTimestamp();
    const existing = await this.repository.load(studyId);

    const progress: StudyProgress = {
      studyId,
      state: "COMPLETED",
      lastSectionKey:
        existing?.lastSectionKey ?? null,
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

  async uncompleteStudy(
    studyId: StudyId,
  ): Promise<StudyProgress> {
    const existing = await this.repository.load(studyId);

    if (existing === null) {
      throw new Error(
        "STUDY_PROGRESS_UNCOMPLETE_TARGET_NOT_FOUND",
      );
    }

    const progress: StudyProgress = {
      ...existing,
      state: "IN_PROGRESS",
      completedAt: null,
    };

    await this.repository.upsert(progress);

    return progress;
  }

  async resetStudy(
    studyId: StudyId,
  ): Promise<void> {
    await this.repository.reset(studyId);
  }
}