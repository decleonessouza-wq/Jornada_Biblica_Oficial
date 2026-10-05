import type {
  Favorite,
  FavoriteOriginContext,
  FavoriteTarget,
} from "../../domain/favorites/favorite";
import type { DevotionalId } from "../../domain/devotionals/devotional";
import type { PersonalCanonicalIdFactory } from "../../domain/personal/personalIdentity";
import type {
  PersonalClock,
  PersonalDatePolicy,
} from "../../domain/personal/personalTime";
import type { StudyId } from "../../domain/studies/study";
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

  private async persistOrigin(
    target: FavoriteTarget,
    origin: FavoriteOriginContext | undefined,
  ): Promise<void> {
    if (!origin) {
      return;
    }

    const targetKey = encodeFavoriteTargetKey(target);
    const record = await this.repository.findByTarget(
      target.kind,
      targetKey,
    );

    if (!record) {
      throw new Error(
        "FAVORITE_TARGET_NOT_FOUND_AFTER_ADD",
      );
    }

    if (origin.kind === "study") {
      await this.repository.addStudyOrigin({
        favoriteId: record.id,
        studyId: origin.studyId,
      });
      return;
    }

    await this.repository.addDevotionalOrigin({
      favoriteId: record.id,
      devotionalId: origin.devotionalId,
    });
  }

  async add(
    target: FavoriteTarget,
    origin?: FavoriteOriginContext,
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

    await this.persistOrigin(target, origin);
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
    origin?: FavoriteOriginContext,
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

    await this.persistOrigin(target, origin);

    return true;
  }

  async listStudyOrigins(
    target: FavoriteTarget,
  ): Promise<readonly StudyId[]> {
    const targetKey = encodeFavoriteTargetKey(target);
    const record = await this.repository.findByTarget(
      target.kind,
      targetKey,
    );

    if (!record) {
      return [];
    }

    const origins = await this.repository.listStudyOrigins(
      record.id,
    );

    return origins.map((origin) => origin.studyId);
  }

  async listDevotionalOrigins(
    target: FavoriteTarget,
  ): Promise<readonly DevotionalId[]> {
    const targetKey = encodeFavoriteTargetKey(target);
    const record = await this.repository.findByTarget(
      target.kind,
      targetKey,
    );

    if (!record) {
      return [];
    }

    const origins =
      await this.repository.listDevotionalOrigins(
        record.id,
      );

    return origins.map(
      (origin) => origin.devotionalId,
    );
  }
}
