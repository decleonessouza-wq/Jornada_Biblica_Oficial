import type { FavoriteTarget } from "../src/domain/favorites/favorite";
import {
  decodeFavoriteTargetKey,
  encodeFavoriteTargetKey,
} from "../src/services/favorites/favoriteTargetKeyCodec";

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

describe("favoriteTargetKeyCodec", () => {
  it("round-trips a Bible verse target", () => {
    const encoded = encodeFavoriteTargetKey(bibleTarget);

    expect(
      decodeFavoriteTargetKey("bible_verse", encoded),
    ).toEqual(bibleTarget);
  });

  it("round-trips a hymn target", () => {
    const encoded = encodeFavoriteTargetKey(hymnTarget);

    expect(
      decodeFavoriteTargetKey("hymn", encoded),
    ).toEqual(hymnTarget);
  });

  it("encodes the same target deterministically", () => {
    expect(
      encodeFavoriteTargetKey(bibleTarget),
    ).toBe(
      encodeFavoriteTargetKey({
        ...bibleTarget,
      }),
    );

    expect(
      encodeFavoriteTargetKey(hymnTarget),
    ).toBe(
      encodeFavoriteTargetKey({
        ...hymnTarget,
      }),
    );
  });

  it("fails closed for malformed keys and kind mismatches", () => {
    expect(() =>
      decodeFavoriteTargetKey(
        "bible_verse",
        "not-json",
      ),
    ).toThrow("FAVORITE_TARGET_KEY_INVALID");

    expect(() =>
      decodeFavoriteTargetKey(
        "hymn",
        encodeFavoriteTargetKey(bibleTarget),
      ),
    ).toThrow("FAVORITE_TARGET_KEY_INVALID");

    expect(() =>
      decodeFavoriteTargetKey(
        "bible_verse",
        JSON.stringify([
          "v1",
          "bible_verse",
          "BLIVRE",
          "JHN",
          0,
          16,
        ]),
      ),
    ).toThrow("FAVORITE_TARGET_KEY_INVALID");
  });
});
