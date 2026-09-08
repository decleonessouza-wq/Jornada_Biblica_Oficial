import type {
  FavoriteId,
  FavoriteTargetKind,
} from "../../../domain/favorites/favorite";
import type {
  PersonalUtcTimestamp,
} from "../../../domain/personal/personalTime";

export type FavoritePersistenceRecord = Readonly<{
  id: FavoriteId;
  targetKind: FavoriteTargetKind;
  targetKey: string;
  createdAtUtc: PersonalUtcTimestamp;
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
}
