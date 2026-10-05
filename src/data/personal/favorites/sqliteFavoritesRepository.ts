import {
  FAVORITE_TARGET_KINDS,
  type FavoriteId,
  type FavoriteTargetKind,
} from "../../../domain/favorites/favorite";
import type { DevotionalId } from "../../../domain/devotionals/devotional";
import type {
  PersonalUtcTimestamp,
} from "../../../domain/personal/personalTime";
import type { StudyId } from "../../../domain/studies/study";
import type {
  PersonalDatabase,
} from "../personalDatabase";
import {
  PersonalRepositoryBase,
} from "../personalRepositoryBase";
import type {
  FavoriteDevotionalOriginPersistenceRecord,
  FavoritePersistenceRecord,
  FavoriteStudyOriginPersistenceRecord,
  FavoritesRepository,
} from "./favoritesRepository";

type FavoriteRow = Readonly<{
  id: string;
  target_kind: string;
  target_key: string;
  created_at_utc: string;
}>;

type FavoriteStudyOriginRow = Readonly<{
  study_id: string;
}>;

type FavoriteDevotionalOriginRow = Readonly<{
  devotional_id: string;
}>;

function isFavoriteTargetKind(
  value: string,
): value is FavoriteTargetKind {
  return FAVORITE_TARGET_KINDS.some(
    (kind) => kind === value,
  );
}

function assertValidTargetKey(
  targetKey: string,
): void {
  if (targetKey.trim().length === 0) {
    throw new Error(
      "PERSONAL_FAVORITES_TARGET_KEY_INVALID",
    );
  }
}

function assertValidFavoriteId(
  favoriteId: FavoriteId,
): void {
  if (
    typeof favoriteId !== "string" ||
    favoriteId.trim().length === 0
  ) {
    throw new Error(
      "PERSONAL_FAVORITES_ID_INVALID",
    );
  }
}

function assertValidStudyId(
  studyId: StudyId,
): void {
  if (
    typeof studyId !== "string" ||
    studyId.trim().length === 0
  ) {
    throw new Error(
      "PERSONAL_FAVORITES_STUDY_ORIGIN_INVALID",
    );
  }
}

function assertValidDevotionalId(
  devotionalId: DevotionalId,
): void {
  if (
    typeof devotionalId !== "string" ||
    devotionalId.trim().length === 0
  ) {
    throw new Error(
      "PERSONAL_FAVORITES_DEVOTIONAL_ORIGIN_INVALID",
    );
  }
}

function mapFavoriteRow(
  row: FavoriteRow,
): FavoritePersistenceRecord {
  if (
    typeof row.id !== "string" ||
    row.id.trim().length === 0 ||
    !isFavoriteTargetKind(row.target_kind) ||
    typeof row.target_key !== "string" ||
    row.target_key.trim().length === 0 ||
    typeof row.created_at_utc !== "string" ||
    row.created_at_utc.trim().length === 0
  ) {
    throw new Error(
      "PERSONAL_FAVORITES_ROW_INVALID",
    );
  }

  return {
    id: row.id as FavoriteId,
    targetKind: row.target_kind,
    targetKey: row.target_key,
    createdAtUtc:
      row.created_at_utc as PersonalUtcTimestamp,
  };
}

function mapStudyOriginRow(
  favoriteId: FavoriteId,
  row: FavoriteStudyOriginRow,
): FavoriteStudyOriginPersistenceRecord {
  if (
    typeof row.study_id !== "string" ||
    row.study_id.trim().length === 0
  ) {
    throw new Error(
      "PERSONAL_FAVORITES_STUDY_ORIGIN_ROW_INVALID",
    );
  }

  return {
    favoriteId,
    studyId: row.study_id as StudyId,
  };
}

function mapDevotionalOriginRow(
  favoriteId: FavoriteId,
  row: FavoriteDevotionalOriginRow,
): FavoriteDevotionalOriginPersistenceRecord {
  if (
    typeof row.devotional_id !== "string" ||
    row.devotional_id.trim().length === 0
  ) {
    throw new Error(
      "PERSONAL_FAVORITES_DEVOTIONAL_ORIGIN_ROW_INVALID",
    );
  }

  return {
    favoriteId,
    devotionalId: row.devotional_id as DevotionalId,
  };
}

export class SQLiteFavoritesRepository
  extends PersonalRepositoryBase
  implements FavoritesRepository
{
  constructor(
    personalDatabase: PersonalDatabase,
  ) {
    super(personalDatabase);
  }

  async list(): Promise<
    readonly FavoritePersistenceRecord[]
  > {
    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<FavoriteRow>(
            `
SELECT
  id,
  target_kind,
  target_key,
  created_at_utc
FROM personal_favorites
ORDER BY created_at_utc DESC, id DESC
`,
          );

        return rows.map(mapFavoriteRow);
      },
    );
  }

  async findByTarget(
    targetKind: FavoriteTargetKind,
    targetKey: string,
  ): Promise<FavoritePersistenceRecord | null> {
    assertValidTargetKey(targetKey);

    return this.personalDatabase.withConnection(
      async (database) => {
        const row =
          await database.getFirstAsync<FavoriteRow>(
            `
SELECT
  id,
  target_kind,
  target_key,
  created_at_utc
FROM personal_favorites
WHERE target_kind = ? AND target_key = ?
LIMIT 1
`,
            targetKind,
            targetKey,
          );

        return row === null
          ? null
          : mapFavoriteRow(row);
      },
    );
  }

  async add(
    record: FavoritePersistenceRecord,
  ): Promise<void> {
    assertValidTargetKey(record.targetKey);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
INSERT INTO personal_favorites (
  id,
  target_kind,
  target_key,
  created_at_utc
)
VALUES (?, ?, ?, ?)
ON CONFLICT(target_kind, target_key) DO NOTHING
`,
          record.id,
          record.targetKind,
          record.targetKey,
          record.createdAtUtc,
        );
      },
    );
  }

  async remove(
    targetKind: FavoriteTargetKind,
    targetKey: string,
  ): Promise<void> {
    assertValidTargetKey(targetKey);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
DELETE FROM personal_favorites
WHERE target_kind = ? AND target_key = ?
`,
          targetKind,
          targetKey,
        );
      },
    );
  }

  async addStudyOrigin(
    record: FavoriteStudyOriginPersistenceRecord,
  ): Promise<void> {
    assertValidFavoriteId(record.favoriteId);
    assertValidStudyId(record.studyId);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
INSERT INTO personal_favorite_study_origins (
  favorite_id,
  study_id
)
VALUES (?, ?)
ON CONFLICT(favorite_id, study_id) DO NOTHING
`,
          record.favoriteId,
          record.studyId,
        );
      },
    );
  }

  async listStudyOrigins(
    favoriteId: FavoriteId,
  ): Promise<
    readonly FavoriteStudyOriginPersistenceRecord[]
  > {
    assertValidFavoriteId(favoriteId);

    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<FavoriteStudyOriginRow>(
            `
SELECT
  study_id
FROM personal_favorite_study_origins
WHERE favorite_id = ?
ORDER BY study_id ASC
`,
            favoriteId,
          );

        return rows.map((row) =>
          mapStudyOriginRow(favoriteId, row),
        );
      },
    );
  }

  async addDevotionalOrigin(
    record: FavoriteDevotionalOriginPersistenceRecord,
  ): Promise<void> {
    assertValidFavoriteId(record.favoriteId);
    assertValidDevotionalId(record.devotionalId);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
INSERT INTO personal_favorite_devotional_origins (
  favorite_id,
  devotional_id
)
VALUES (?, ?)
ON CONFLICT(favorite_id, devotional_id) DO NOTHING
`,
          record.favoriteId,
          record.devotionalId,
        );
      },
    );
  }

  async listDevotionalOrigins(
    favoriteId: FavoriteId,
  ): Promise<
    readonly FavoriteDevotionalOriginPersistenceRecord[]
  > {
    assertValidFavoriteId(favoriteId);

    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<FavoriteDevotionalOriginRow>(
            `
SELECT
  devotional_id
FROM personal_favorite_devotional_origins
WHERE favorite_id = ?
ORDER BY devotional_id ASC
`,
            favoriteId,
          );

        return rows.map((row) =>
          mapDevotionalOriginRow(favoriteId, row),
        );
      },
    );
  }
}
