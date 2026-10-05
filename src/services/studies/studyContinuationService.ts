import type {
  PersonalUtcTimestamp,
} from "../../domain/personal/personalTime";
import type {
  StudyId,
} from "../../domain/studies/study";
import type {
  StudyProgress,
} from "../../domain/studies/studyProgress";
import {
  getRuntimeStudyById,
} from "../../studies/runtime/studyRuntimeCatalog";
import { getPersonalPlatformHub } from "../personalPlatformHub";

type ActiveStudyProgress = StudyProgress &
  Readonly<{
    state: "IN_PROGRESS";
    lastOpenedAt: PersonalUtcTimestamp;
  }>;

type StudyContinuationRuntimeEntry = Readonly<{
  content: Readonly<{
    title: string;
  }>;
}>;

type StudyContinuationRuntimeLookup = (
  studyId: string,
) => StudyContinuationRuntimeEntry | null;

export type StudyContinuation = Readonly<{
  studyId: StudyId;
  title: string;
  readingProgress: number;
  lastOpenedAt: PersonalUtcTimestamp;
}>;

function isActiveStudyProgress(
  progress: StudyProgress,
): progress is ActiveStudyProgress {
  return (
    progress.state === "IN_PROGRESS" &&
    progress.lastOpenedAt !== null
  );
}

function compareActiveStudyProgress(
  left: ActiveStudyProgress,
  right: ActiveStudyProgress,
): number {
  if (left.lastOpenedAt !== right.lastOpenedAt) {
    return left.lastOpenedAt > right.lastOpenedAt
      ? -1
      : 1;
  }

  return String(left.studyId).localeCompare(
    String(right.studyId),
  );
}

export function selectStudyContinuation(
  progressItems: readonly StudyProgress[],
  runtimeLookup: StudyContinuationRuntimeLookup =
    getRuntimeStudyById,
): StudyContinuation | null {
  const candidates = progressItems
    .filter(isActiveStudyProgress)
    .slice()
    .sort(compareActiveStudyProgress);

  for (const progress of candidates) {
    const runtimeEntry = runtimeLookup(progress.studyId);

    if (runtimeEntry === null) {
      continue;
    }

    return Object.freeze({
      studyId: progress.studyId,
      title: runtimeEntry.content.title,
      readingProgress: progress.readingProgress,
      lastOpenedAt: progress.lastOpenedAt,
    });
  }

  return null;
}

export async function loadStudyContinuation(): Promise<
  StudyContinuation | null
> {
  const { studyProgressService } =
    getPersonalPlatformHub();
  const progressItems =
    await studyProgressService.list();

  return selectStudyContinuation(progressItems);
}
