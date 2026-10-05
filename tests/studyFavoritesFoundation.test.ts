import type { SQLiteDatabase } from "expo-sqlite";

import type {
  BibleReference,
} from "../src/domain/bible/bibleReference";
import {
  FAVORITE_TARGET_KINDS,
  type FavoriteId,
  type FavoriteOriginContext,
  type FavoriteTarget,
} from "../src/domain/favorites/favorite";
import type {
  PersonalCanonicalIdFactory,
} from "../src/domain/personal/personalIdentity";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  StudyId,
} from "../src/domain/studies/study";
import type {
  PersonalDatabase,
} from "../src/data/personal/personalDatabase";
import {
  SQLiteFavoritesRepository,
} from "../src/data/personal/favorites/sqliteFavoritesRepository";
import type {
  FavoritePersistenceRecord,
  FavoritesRepository,
} from "../src/data/personal/favorites/favoritesRepository";
import {
  decodeFavoriteTargetKey,
  encodeFavoriteTargetKey,
} from "../src/services/favorites/favoriteTargetKeyCodec";
import {
  FavoritesService,
} from "../src/services/favorites/favoritesService";

const FAVORITE_ID =
  "favorite-study-foundation" as FavoriteId;
const STUDY_ID =
  "track-01-study-01" as StudyId;
const SECOND_STUDY_ID =
  "track-02-study-01" as StudyId;
const CREATED_AT =
  "2026-09-23T18:00:00.000Z" as PersonalUtcTimestamp;

const bibleReference: BibleReference = {
  passages: [
    {
      kind: "VERSE_RANGE",
      bookId: "JHN",
      start: {
        chapter: 3,
        verse: 16,
      },
      end: {
        chapter: 3,
        verse: 18,
      },
    },
  ],
};

const bibleReferenceTarget = {
  kind: "bible_reference",
  reference: bibleReference,
} as FavoriteTarget;

const studyTarget = {
  kind: "study",
  studyId: STUDY_ID,
} as FavoriteTarget;

const legacyBibleTarget = {
  kind: "bible_verse",
  versionId: "BLIVRE",
  bookId: "JHN",
  chapter: 3,
  verse: 16,
} as FavoriteTarget;

const legacyHymnTarget = {
  kind: "hymn",
  editionId: "harpa-crista-jornada-v1",
  hymnId: "harpa-crista-jornada-v1:15",
} as FavoriteTarget;

function createServiceHarness() {
  const list = jest.fn();
  const findByTarget = jest.fn();
  const add = jest.fn();
  const remove = jest.fn();
  const addStudyOrigin = jest.fn();
  const listStudyOrigins = jest.fn();

  const repository = {
    list,
    findByTarget,
    add,
    remove,
    addStudyOrigin,
    listStudyOrigins,
  } as unknown as FavoritesRepository;

  const canonicalIdFactory = {
    create: jest.fn(() => FAVORITE_ID),
  } as unknown as PersonalCanonicalIdFactory;

  const clock = {
    now: jest.fn(
      () => new Date("2026-09-23T18:00:00.000Z"),
    ),
  } as PersonalClock;

  const datePolicy = {
    toUtcTimestamp: jest.fn(() => CREATED_AT),
    toLocalDate: jest.fn(),
  } as unknown as PersonalDatePolicy;

  return {
    service: new FavoritesService(
      repository,
      canonicalIdFactory,
      clock,
      datePolicy,
    ),
    findByTarget,
    add,
    remove,
    addStudyOrigin,
    listStudyOrigins,
  };
}

function persistenceRecordFor(
  target: FavoriteTarget,
): FavoritePersistenceRecord {
  return {
    id: FAVORITE_ID,
    targetKind: target.kind,
    targetKey: encodeFavoriteTargetKey(target),
    createdAtUtc: CREATED_AT,
  };
}

describe("P17-P11-A1 Study favorites foundation", () => {
  it("extends target kinds without removing the two legacy kinds", () => {
    expect(FAVORITE_TARGET_KINDS).toEqual([
      "bible_verse",
      "bible_reference",
      "study",
      "devotional",
      "hymn",
    ]);
  });

  it("preserves the exact legacy v1 target keys", () => {
    expect(
      encodeFavoriteTargetKey(legacyBibleTarget),
    ).toBe(
      JSON.stringify([
        "v1",
        "bible_verse",
        "BLIVRE",
        "JHN",
        3,
        16,
      ]),
    );

    expect(
      encodeFavoriteTargetKey(legacyHymnTarget),
    ).toBe(
      JSON.stringify([
        "v1",
        "hymn",
        "harpa-crista-jornada-v1",
        "harpa-crista-jornada-v1:15",
      ]),
    );
  });

  it("round-trips STUDY and version-agnostic BIBLE_REFERENCE targets", () => {
    for (const target of [
      studyTarget,
      bibleReferenceTarget,
    ]) {
      const encoded =
        encodeFavoriteTargetKey(target);

      expect(
        decodeFavoriteTargetKey(
          target.kind,
          encoded,
        ),
      ).toEqual(target);
    }
  });

  it("makes BIBLE_REFERENCE identity canonical and independent from study origin", () => {
    const key =
      encodeFavoriteTargetKey(
        bibleReferenceTarget,
      );

    expect(key).toBe(
      JSON.stringify([
        "v1",
        "bible_reference",
        "João 3:16-18",
      ]),
    );

    const firstOrigin: FavoriteOriginContext = {
      kind: "study",
      studyId: STUDY_ID,
    };
    const secondOrigin: FavoriteOriginContext = {
      kind: "study",
      studyId: SECOND_STUDY_ID,
    };

    expect(firstOrigin.studyId).not.toBe(
      secondOrigin.studyId,
    );
    expect(
      encodeFavoriteTargetKey(
        bibleReferenceTarget,
      ),
    ).toBe(key);
  });

  it("adds a canonical favorite first and persists STUDY origin separately", async () => {
    const harness = createServiceHarness();
    const record =
      persistenceRecordFor(
        bibleReferenceTarget,
      );

    harness.findByTarget.mockResolvedValue(
      record,
    );

    await harness.service.add(
      bibleReferenceTarget,
      {
        kind: "study",
        studyId: STUDY_ID,
      },
    );

    expect(harness.add).toHaveBeenCalledWith(
      record,
    );
    expect(
      harness.findByTarget,
    ).toHaveBeenCalledWith(
      "bible_reference",
      record.targetKey,
    );
    expect(
      harness.addStudyOrigin,
    ).toHaveBeenCalledWith({
      favoriteId: FAVORITE_ID,
      studyId: STUDY_ID,
    });
  });

  it("loads all persisted study origins without putting them into target identity", async () => {
    const harness = createServiceHarness();
    const record =
      persistenceRecordFor(
        bibleReferenceTarget,
      );

    harness.findByTarget.mockResolvedValue(
      record,
    );
    harness.listStudyOrigins.mockResolvedValue([
      {
        favoriteId: FAVORITE_ID,
        studyId: STUDY_ID,
      },
      {
        favoriteId: FAVORITE_ID,
        studyId: SECOND_STUDY_ID,
      },
    ]);

    await expect(
      harness.service.listStudyOrigins(
        bibleReferenceTarget,
      ),
    ).resolves.toEqual([
      STUDY_ID,
      SECOND_STUDY_ID,
    ]);

    expect(
      harness.listStudyOrigins,
    ).toHaveBeenCalledWith(FAVORITE_ID);
  });

  it("persists origin relations idempotently in a separate SQLite table", async () => {
    const runAsync = jest.fn();
    const getAllAsync = jest.fn(
      async (_sql: string) => [
        { study_id: "track-01-study-01" },
        { study_id: "track-02-study-01" },
      ],
    );

    const database = {
      runAsync,
      getAllAsync,
    } as unknown as SQLiteDatabase;

    const personalDatabase = {
      withConnection: jest.fn(
        async (
          operation: (
            db: SQLiteDatabase,
          ) => Promise<unknown>,
        ) => operation(database),
      ),
    } as unknown as PersonalDatabase;

    const repository =
      new SQLiteFavoritesRepository(
        personalDatabase,
      );

    await repository.addStudyOrigin({
      favoriteId: FAVORITE_ID,
      studyId: STUDY_ID,
    });

    const sql = String(
      runAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "INSERT INTO personal_favorite_study_origins",
    );
    expect(sql).toContain(
      "ON CONFLICT(favorite_id, study_id) DO NOTHING",
    );
    expect(
      runAsync.mock.calls[0]?.slice(1),
    ).toEqual([
      FAVORITE_ID,
      STUDY_ID,
    ]);

    await expect(
      repository.listStudyOrigins(
        FAVORITE_ID,
      ),
    ).resolves.toEqual([
      {
        favoriteId: FAVORITE_ID,
        studyId: STUDY_ID,
      },
      {
        favoriteId: FAVORITE_ID,
        studyId: SECOND_STUDY_ID,
      },
    ]);

    const listSql = String(
      getAllAsync.mock.calls[0]?.[0],
    );

    expect(listSql).toContain(
      "FROM personal_favorite_study_origins",
    );
    expect(listSql).toContain(
      "ORDER BY study_id ASC",
    );
  });
});
