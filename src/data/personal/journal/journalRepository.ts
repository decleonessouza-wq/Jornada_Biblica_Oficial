import type {
  BibleBookId,
} from "../../../domain/bible/bibleReference";
import type {
  JournalEntry,
  JournalEntryId,
  JournalEntryPlatformAttributes,
  JournalEntryReference,
  JournalOrganizationAttributes,
  JournalCategory,
  JournalTag,
  JournalTagId,
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

export type JournalSearchPassageFilter = Readonly<{
  bookId: BibleBookId;
  chapter?: number;
  verse?: number;
}>;

export type JournalSearchQuery = Readonly<{
  text?: string;
  category?: JournalCategory | null;
  tagId?: JournalTagId;
  dateFrom?: PersonalLocalDate;
  dateTo?: PersonalLocalDate;
  passage?: JournalSearchPassageFilter;
  isPinned?: boolean;
  offset: number;
  limit: number;
}>;

export type JournalSearchPage = Readonly<{
  items: readonly JournalEntryPersistenceRecord[];
  nextOffset: number | null;
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

  search(
    query: JournalSearchQuery,
  ): Promise<JournalSearchPage>;

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