import type {
  JournalEntry,
  JournalEntryId,
  JournalEntryPlatformAttributes,
  JournalEntryReference,
  JournalTag,
} from "../../../domain/journal/journal";
import type {
  PersonalLocalDate,
} from "../../../domain/personal/personalTime";

export type JournalEntryPersistenceRecord =
  JournalEntry &
  JournalEntryPlatformAttributes &
  Readonly<{
    references: readonly JournalEntryReference[];
    tags: readonly JournalTag[];
  }>;

export interface JournalRepository {
  list(): Promise<readonly JournalEntryPersistenceRecord[]>;

  findById(
    id: JournalEntryId,
  ): Promise<JournalEntryPersistenceRecord | null>;

  findByDate(
    entryDate: PersonalLocalDate,
  ): Promise<JournalEntryPersistenceRecord | null>;

  listByDate(
    entryDate: PersonalLocalDate,
  ): Promise<readonly JournalEntryPersistenceRecord[]>;

  create(
    entry: JournalEntry | JournalEntryPersistenceRecord,
  ): Promise<void>;

  update(
    entry: JournalEntry | JournalEntryPersistenceRecord,
  ): Promise<void>;

  remove(
    id: JournalEntryId,
  ): Promise<void>;
}