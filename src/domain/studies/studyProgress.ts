import type { PersonalUtcTimestamp } from "../personal/personalTime";
import type {
  StudyId,
  StudySectionId,
} from "./study";

export const STUDY_STATES = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
] as const;

export type StudyState = (typeof STUDY_STATES)[number];

export type StudyProgress = Readonly<{
  studyId: StudyId;
  state: StudyState;
  lastSectionKey: StudySectionId | null;
  readingProgress: number;
  startedAt: PersonalUtcTimestamp | null;
  lastOpenedAt: PersonalUtcTimestamp | null;
  completedAt: PersonalUtcTimestamp | null;
}>;
