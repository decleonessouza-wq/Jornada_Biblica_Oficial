import type { PersonalUtcTimestamp } from "../personal/personalTime";
import type {
  DevotionalId,
  DevotionalBlockId,
} from "./devotional";

export const DEVOTIONAL_STATES = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED",
] as const;

export type DevotionalState = (typeof DEVOTIONAL_STATES)[number];

export type DevotionalProgress = Readonly<{
  devotionalId: DevotionalId;
  state: DevotionalState;
  lastBlockId: DevotionalBlockId | null;
  readingProgress: number;
  startedAt: PersonalUtcTimestamp | null;
  lastOpenedAt: PersonalUtcTimestamp | null;
  completedAt: PersonalUtcTimestamp | null;
}>;
