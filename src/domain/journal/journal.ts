import type { PersonalCanonicalId } from "../personal/personalIdentity";
import type {
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../personal/personalTime";

export type JournalEntryId = PersonalCanonicalId<"journal_entry">;

export const JOURNAL_REFLECTION_MAX_CHARS = 5000 as const;
export const JOURNAL_GRATITUDE_MAX_CHARS = 200 as const;

export type JournalEntry = Readonly<{
  id: JournalEntryId;
  entryDate: PersonalLocalDate;
  reflectionText: string | null;
  gratitudeText: string | null;
  createdAtUtc: PersonalUtcTimestamp;
  updatedAtUtc: PersonalUtcTimestamp;
}>;
