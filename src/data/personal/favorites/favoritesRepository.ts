import type {
  FavoriteId,
  FavoriteTargetKind,
} from "../../../domain/favorites/favorite";
import type {
  PersonalUtcTimestamp,
} from "../../../domain/personal/personalTime";
import type { StudyId } from "../../../domain/studies/study";

export type FavoritePersistenceRecord = Readonly<{
  id: FavoriteId;
  targetKind: FavoriteTargetKind;
  targetKey: string;
  createdAtUtc: PersonalUtcTimestamp;
}>;

export type FavoriteStudyOriginPersistenceRecord = Readonly<{
  favoriteId: FavoriteId;
  studyId: StudyId;
}>;

export interface FavoritesRepository {
  list(): Promise<readonly FavoritePersistenceRecord[]>;

  findByTarget(
    targetKind: FavoriteTargetKind,
    targetKey: string,
  ): Promise<FavoritePersistenceRecord | null>;

  add(
    record: FavoritePersistenceRecord,
  ): Promise<void>;

  remove(
    targetKind: FavoriteTargetKind,
    targetKey: string,
  ): Promise<void>;

  addStudyOrigin(
    record: FavoriteStudyOriginPersistenceRecord,
  ): Promise<void>;

  listStudyOrigins(
    favoriteId: FavoriteId,
  ): Promise<readonly FavoriteStudyOriginPersistenceRecord[]>;
}
