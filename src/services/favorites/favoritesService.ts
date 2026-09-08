import type {
  Favorite,
  FavoriteTarget,
} from "../../domain/favorites/favorite";
import type { PersonalCanonicalIdFactory } from "../../domain/personal/personalIdentity";
import type {
  PersonalClock,
  PersonalDatePolicy,
} from "../../domain/personal/personalTime";
import type {
  FavoritePersistenceRecord,
  FavoritesRepository,
} from "../../data/personal/favorites/favoritesRepository";
import {
  decodeFavoriteTargetKey,
  encodeFavoriteTargetKey,
} from "./favoriteTargetKeyCodec";

function mapPersistenceRecordToFavorite(
  record: FavoritePersistenceRecord,
): Favorite {
  return {
    id: record.id,
    target: decodeFavoriteTargetKey(
      record.targetKind,
      record.targetKey,
    ),
    createdAtUtc: record.createdAtUtc,
  };
}

export class FavoritesService {
  constructor(
    private readonly repository: FavoritesRepository,
    private readonly canonicalIdFactory: PersonalCanonicalIdFactory,
    private readonly clock: PersonalClock,
    private readonly datePolicy: PersonalDatePolicy,
  ) {}

  async list(): Promise<readonly Favorite[]> {
    const records = await this.repository.list();

    return records.map(mapPersistenceRecordToFavorite);
  }

  async isFavorite(
    target: FavoriteTarget,
  ): Promise<boolean> {
    const targetKey = encodeFavoriteTargetKey(target);
    const record = await this.repository.findByTarget(
      target.kind,
      targetKey,
    );

    return record !== null;
  }

  async add(
    target: FavoriteTarget,
  ): Promise<void> {
    const targetKey = encodeFavoriteTargetKey(target);

    await this.repository.add({
      id: this.canonicalIdFactory.create("favorite"),
      targetKind: target.kind,
      targetKey,
      createdAtUtc: this.datePolicy.toUtcTimestamp(
        this.clock.now(),
      ),
    });
  }

  async remove(
    target: FavoriteTarget,
  ): Promise<void> {
    const targetKey = encodeFavoriteTargetKey(target);

    await this.repository.remove(
      target.kind,
      targetKey,
    );
  }

  async toggle(
    target: FavoriteTarget,
  ): Promise<boolean> {
    const targetKey = encodeFavoriteTargetKey(target);
    const existing = await this.repository.findByTarget(
      target.kind,
      targetKey,
    );

    if (existing) {
      await this.repository.remove(
        target.kind,
        targetKey,
      );

      return false;
    }

    await this.repository.add({
      id: this.canonicalIdFactory.create("favorite"),
      targetKind: target.kind,
      targetKey,
      createdAtUtc: this.datePolicy.toUtcTimestamp(
        this.clock.now(),
      ),
    });

    return true;
  }
}
