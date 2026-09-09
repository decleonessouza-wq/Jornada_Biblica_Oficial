import type {
  JournalEntry,
  JournalEntryId,
} from "../../../domain/journal/journal";
import type {
  PersonalLocalDate,
} from "../../../domain/personal/personalTime";

export interface JournalRepository {
  list(): Promise<readonly JournalEntry[]>;

  findById(
    id: JournalEntryId,
  ): Promise<JournalEntry | null>;

  findByDate(
    entryDate: PersonalLocalDate,
  ): Promise<JournalEntry | null>;

  create(
    entry: JournalEntry,
  ): Promise<void>;

  update(
    entry: JournalEntry,
  ): Promise<void>;

  remove(
    id: JournalEntryId,
  ): Promise<void>;
}
