import type {
  FavoriteId,
  FavoriteTarget,
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
  FavoritePersistenceRecord,
  FavoritesRepository,
} from "../src/data/personal/favorites/favoritesRepository";
import {
  encodeFavoriteTargetKey,
} from "../src/services/favorites/favoriteTargetKeyCodec";
import { FavoritesService } from "../src/services/favorites/favoritesService";

const FAVORITE_ID =
  "favorite-test-id" as FavoriteId;
const CREATED_AT =
  "2026-09-09T12:00:00.000Z" as PersonalUtcTimestamp;
const NOW = new Date("2026-09-09T12:00:00.000Z");

const bibleTarget = {
  kind: "bible_verse",
  versionId: "BLIVRE",
  bookId: "JHN",
  chapter: 3,
  verse: 16,
} as FavoriteTarget;

const hymnTarget = {
  kind: "hymn",
  editionId: "harpa-crista-jornada-v1",
  hymnId: "harpa-crista-jornada-v1:15",
} as FavoriteTarget;

function createHarness() {
  const list = jest.fn();
  const findByTarget = jest.fn();
  const add = jest.fn();
  const remove = jest.fn();

  const repository = {
    list,
    findByTarget,
    add,
    remove,
  } as unknown as FavoritesRepository;

  const createId = jest.fn(() => FAVORITE_ID);
  const canonicalIdFactory = {
    create: createId,
  } as unknown as PersonalCanonicalIdFactory;

  const now = jest.fn(() => NOW);
  const clock = {
    now,
  } as PersonalClock;

  const toUtcTimestamp = jest.fn(() => CREATED_AT);
  const toLocalDate = jest.fn();
  const datePolicy = {
    toUtcTimestamp,
    toLocalDate,
  } as unknown as PersonalDatePolicy;

  const service = new FavoritesService(
    repository,
    canonicalIdFactory,
    clock,
    datePolicy,
  );

  return {
    service,
    list,
    findByTarget,
    add,
    remove,
    createId,
    now,
    toUtcTimestamp,
  };
}

function recordFor(
  id: FavoriteId,
  target: FavoriteTarget,
  createdAtUtc: PersonalUtcTimestamp,
): FavoritePersistenceRecord {
  return {
    id,
    targetKind: target.kind,
    targetKey: encodeFavoriteTargetKey(target),
    createdAtUtc,
  };
}

describe("FavoritesService", () => {
  it("maps persistence records without reordering them", async () => {
    const harness = createHarness();
    const firstId = "favorite-first" as FavoriteId;
    const secondId = "favorite-second" as FavoriteId;
    const firstCreated =
      "2026-09-09T13:00:00.000Z" as PersonalUtcTimestamp;
    const secondCreated =
      "2026-09-09T12:00:00.000Z" as PersonalUtcTimestamp;

    harness.list.mockResolvedValue([
      recordFor(firstId, hymnTarget, firstCreated),
      recordFor(secondId, bibleTarget, secondCreated),
    ]);

    await expect(
      harness.service.list(),
    ).resolves.toEqual([
      {
        id: firstId,
        target: hymnTarget,
        createdAtUtc: firstCreated,
      },
      {
        id: secondId,
        target: bibleTarget,
        createdAtUtc: secondCreated,
      },
    ]);
  });

  it("delegates isFavorite to canonical target lookup", async () => {
    const harness = createHarness();
    const record = recordFor(
      FAVORITE_ID,
      bibleTarget,
      CREATED_AT,
    );

    harness.findByTarget.mockResolvedValue(record);

    await expect(
      harness.service.isFavorite(bibleTarget),
    ).resolves.toBe(true);

    expect(harness.findByTarget).toHaveBeenCalledWith(
      "bible_verse",
      encodeFavoriteTargetKey(bibleTarget),
    );

    harness.findByTarget.mockResolvedValue(null);

    await expect(
      harness.service.isFavorite(bibleTarget),
    ).resolves.toBe(false);
  });

  it("adds with canonical id and UTC timestamp", async () => {
    const harness = createHarness();

    await harness.service.add(bibleTarget);

    expect(harness.createId).toHaveBeenCalledWith(
      "favorite",
    );
    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(harness.toUtcTimestamp).toHaveBeenCalledWith(
      NOW,
    );
    expect(harness.add).toHaveBeenCalledWith({
      id: FAVORITE_ID,
      targetKind: "bible_verse",
      targetKey: encodeFavoriteTargetKey(bibleTarget),
      createdAtUtc: CREATED_AT,
    });
  });

  it("delegates remove idempotently by canonical target key", async () => {
    const harness = createHarness();

    await harness.service.remove(hymnTarget);
    await harness.service.remove(hymnTarget);

    expect(harness.remove).toHaveBeenCalledTimes(2);
    expect(harness.remove).toHaveBeenNthCalledWith(
      1,
      "hymn",
      encodeFavoriteTargetKey(hymnTarget),
    );
    expect(harness.remove).toHaveBeenNthCalledWith(
      2,
      "hymn",
      encodeFavoriteTargetKey(hymnTarget),
    );
  });

  it("toggle removes an existing favorite and returns false", async () => {
    const harness = createHarness();

    harness.findByTarget.mockResolvedValue(
      recordFor(
        FAVORITE_ID,
        bibleTarget,
        CREATED_AT,
      ),
    );

    await expect(
      harness.service.toggle(bibleTarget),
    ).resolves.toBe(false);

    expect(harness.remove).toHaveBeenCalledWith(
      "bible_verse",
      encodeFavoriteTargetKey(bibleTarget),
    );
    expect(harness.add).not.toHaveBeenCalled();
  });

  it("toggle adds an absent favorite and returns true", async () => {
    const harness = createHarness();

    harness.findByTarget.mockResolvedValue(null);

    await expect(
      harness.service.toggle(hymnTarget),
    ).resolves.toBe(true);

    expect(harness.remove).not.toHaveBeenCalled();
    expect(harness.add).toHaveBeenCalledWith({
      id: FAVORITE_ID,
      targetKind: "hymn",
      targetKey: encodeFavoriteTargetKey(hymnTarget),
      createdAtUtc: CREATED_AT,
    });
  });
});
