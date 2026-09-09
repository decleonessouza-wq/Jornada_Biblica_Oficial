import type { SQLiteDatabase } from "expo-sqlite";

import type {
  FavoriteId,
  FavoriteTargetKind,
} from "../src/domain/favorites/favorite";
import type {
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  PersonalDatabase,
} from "../src/data/personal/personalDatabase";
import {
  SQLiteFavoritesRepository,
} from "../src/data/personal/favorites/sqliteFavoritesRepository";
import type {
  FavoritePersistenceRecord,
} from "../src/data/personal/favorites/favoritesRepository";

const CREATED_AT_NEW =
  "2026-09-09T13:00:00.000Z" as PersonalUtcTimestamp;
const CREATED_AT_OLD =
  "2026-09-09T12:00:00.000Z" as PersonalUtcTimestamp;

function row(
  id: string,
  targetKind: FavoriteTargetKind,
  targetKey: string,
  createdAtUtc: string,
) {
  return {
    id,
    target_kind: targetKind,
    target_key: targetKey,
    created_at_utc: createdAtUtc,
  };
}

function record(
  id: string,
  targetKind: FavoriteTargetKind,
  targetKey: string,
  createdAtUtc: PersonalUtcTimestamp,
): FavoritePersistenceRecord {
  return {
    id: id as FavoriteId,
    targetKind,
    targetKey,
    createdAtUtc,
  };
}

function createHarness() {
  const getAllAsync = jest.fn();
  const getFirstAsync = jest.fn();
  const runAsync = jest.fn();

  const database = {
    getAllAsync,
    getFirstAsync,
    runAsync,
  } as unknown as SQLiteDatabase;

  const withConnection = jest.fn(
    async (
      operation: (
        database: SQLiteDatabase,
      ) => Promise<unknown>,
    ) => operation(database),
  );

  const personalDatabase = {
    withConnection,
  } as unknown as PersonalDatabase;

  const repository =
    new SQLiteFavoritesRepository(
      personalDatabase,
    );

  return {
    repository,
    getAllAsync,
    getFirstAsync,
    runAsync,
    withConnection,
  };
}

describe("SQLiteFavoritesRepository", () => {
  it("lists newest first with deterministic id tie-break SQL", async () => {
    const harness = createHarness();

    harness.getAllAsync.mockResolvedValue([
      row(
        "favorite-z",
        "hymn",
        "key-hymn-z",
        CREATED_AT_NEW,
      ),
      row(
        "favorite-a",
        "bible_verse",
        "key-bible-a",
        CREATED_AT_NEW,
      ),
      row(
        "favorite-old",
        "bible_verse",
        "key-bible-old",
        CREATED_AT_OLD,
      ),
    ]);

    await expect(
      harness.repository.list(),
    ).resolves.toEqual([
      record(
        "favorite-z",
        "hymn",
        "key-hymn-z",
        CREATED_AT_NEW,
      ),
      record(
        "favorite-a",
        "bible_verse",
        "key-bible-a",
        CREATED_AT_NEW,
      ),
      record(
        "favorite-old",
        "bible_verse",
        "key-bible-old",
        CREATED_AT_OLD,
      ),
    ]);

    const sql = String(
      harness.getAllAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "ORDER BY created_at_utc DESC, id DESC",
    );
  });

  it("finds one target or returns null", async () => {
    const harness = createHarness();
    const match = row(
      "favorite-1",
      "bible_verse",
      "key-bible",
      CREATED_AT_NEW,
    );

    harness.getFirstAsync
      .mockResolvedValueOnce(match)
      .mockResolvedValueOnce(null);

    await expect(
      harness.repository.findByTarget(
        "bible_verse",
        "key-bible",
      ),
    ).resolves.toEqual(
      record(
        "favorite-1",
        "bible_verse",
        "key-bible",
        CREATED_AT_NEW,
      ),
    );

    await expect(
      harness.repository.findByTarget(
        "bible_verse",
        "key-missing",
      ),
    ).resolves.toBeNull();

    expect(
      harness.getFirstAsync.mock.calls[0]?.slice(1),
    ).toEqual([
      "bible_verse",
      "key-bible",
    ]);
  });

  it("adds idempotently through the target uniqueness conflict policy", async () => {
    const harness = createHarness();
    const favorite = record(
      "favorite-1",
      "hymn",
      "key-hymn",
      CREATED_AT_NEW,
    );

    harness.runAsync.mockResolvedValue(undefined);

    await harness.repository.add(favorite);
    await harness.repository.add(favorite);

    expect(harness.runAsync).toHaveBeenCalledTimes(2);

    const sql = String(
      harness.runAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "ON CONFLICT(target_kind, target_key) DO NOTHING",
    );
    expect(
      harness.runAsync.mock.calls[0]?.slice(1),
    ).toEqual([
      favorite.id,
      favorite.targetKind,
      favorite.targetKey,
      favorite.createdAtUtc,
    ]);
  });

  it("removes idempotently by target kind and key", async () => {
    const harness = createHarness();

    harness.runAsync.mockResolvedValue(undefined);

    await harness.repository.remove(
      "hymn",
      "key-hymn",
    );
    await harness.repository.remove(
      "hymn",
      "key-hymn",
    );

    expect(harness.runAsync).toHaveBeenCalledTimes(2);

    const sql = String(
      harness.runAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "DELETE FROM personal_favorites",
    );
    expect(
      harness.runAsync.mock.calls[0]?.slice(1),
    ).toEqual([
      "hymn",
      "key-hymn",
    ]);
  });

  it("maps only id, kind, key, and created timestamp from persistence", async () => {
    const harness = createHarness();

    harness.getAllAsync.mockResolvedValue([
      {
        ...row(
          "favorite-1",
          "bible_verse",
          "key-bible",
          CREATED_AT_NEW,
        ),
        content_body: "must-not-cross-persistence-boundary",
      },
    ]);

    const result = await harness.repository.list();

    expect(result).toHaveLength(1);
    expect(
      Object.keys(result[0] ?? {}).sort(),
    ).toEqual([
      "createdAtUtc",
      "id",
      "targetKey",
      "targetKind",
    ]);
    expect(result[0]).not.toHaveProperty(
      "content_body",
    );
  });
});
