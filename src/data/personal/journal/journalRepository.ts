import type {
  JournalEntry,
  JournalEntryId,
  JournalEntryPlatformAttributes,
  JournalEntryReference,
  JournalOrganizationAttributes,
  JournalTag,
} from "../../../domain/journal/journal";
import type {
  PersonalLocalDate,
} from "../../../domain/personal/personalTime";

export type JournalEntryPersistenceRecord =
  JournalEntry &
  JournalEntryPlatformAttributes &
  JournalOrganizationAttributes &
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

  listTags(): Promise<readonly JournalTag[]>;

  findTagByNormalizedName(
    normalizedName: string,
  ): Promise<JournalTag | null>;

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