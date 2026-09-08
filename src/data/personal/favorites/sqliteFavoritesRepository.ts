import {
  FAVORITE_TARGET_KINDS,
  type FavoriteId,
  type FavoriteTargetKind,
} from "../../../domain/favorites/favorite";
import type {
  PersonalUtcTimestamp,
} from "../../../domain/personal/personalTime";
import type {
  PersonalDatabase,
} from "../personalDatabase";
import {
  PersonalRepositoryBase,
} from "../personalRepositoryBase";
import type {
  FavoritePersistenceRecord,
  FavoritesRepository,
} from "./favoritesRepository";

type FavoriteRow = Readonly<{
  id: string;
  target_kind: string;
  target_key: string;
  created_at_utc: string;
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
}
