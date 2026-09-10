import type { BibleReference } from "../bible/bibleReference";
import type { PersonalCanonicalId } from "../personal/personalIdentity";
import type {
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../personal/personalTime";

export type JournalEntryId = PersonalCanonicalId<"journal_entry">;
export type JournalTagId = PersonalCanonicalId<"journal_tag">;
export type JournalEntryReferenceId =
  PersonalCanonicalId<"journal_entry_reference">;

export const JOURNAL_REFLECTION_MAX_CHARS = 5000 as const;
export const JOURNAL_GRATITUDE_MAX_CHARS = 200 as const;

export const JOURNAL_ENTRY_STATUSES = [
  "ACTIVE",
  "DRAFT",
  "TRASHED",
] as const;

export type JournalEntryStatus =
  (typeof JOURNAL_ENTRY_STATUSES)[number];

export const JOURNAL_SOURCE_TYPES = [
  "FREE",
  "BIBLE",
  "PLAN",
  "STUDY",
  "HYMN",
  "HOME_GRATITUDE",
] as const;

export type JournalSourceType =
  (typeof JOURNAL_SOURCE_TYPES)[number];

export type JournalEntryPlatformAttributes = Readonly<{
  status: JournalEntryStatus;
  sourceType: JournalSourceType;
  sourceTitleSnapshot: string | null;
  promptSnapshot: string | null;
}>;

export type JournalEntryReference = Readonly<{
  id: JournalEntryReferenceId;
  entryId: JournalEntryId;
  position: number;
  reference: BibleReference;
}>;

export type JournalTag = Readonly<{
  id: JournalTagId;
  name: string;
  normalizedName: string;
}>;

export type JournalEntryTag = Readonly<{
  entryId: JournalEntryId;
  tagId: JournalTagId;
}>;

export type JournalEntry = Readonly<{
  id: JournalEntryId;
  entryDate: PersonalLocalDate;
  reflectionText: string | null;
  gratitudeText: string | null;
  createdAtUtc: PersonalUtcTimestamp;
  updatedAtUtc: PersonalUtcTimestamp;
}>;