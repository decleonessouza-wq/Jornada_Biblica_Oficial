import type { BibleBookId } from "../../domain/bible/bibleReference";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import type {
  FavoriteTarget,
  FavoriteTargetKind,
} from "../../domain/favorites/favorite";
import type { HymnId } from "../../domain/hymnal/hymn";
import type { HymnalEditionId } from "../../domain/hymnal/hymnalEdition";

const FAVORITE_TARGET_KEY_VERSION = "v1";

function invalidFavoriteTargetKey(): never {
  throw new Error("FAVORITE_TARGET_KEY_INVALID");
}

function isNonEmptyString(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    value.length > 0
  );
}

function isPositiveSafeInteger(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value > 0
  );
}

export function encodeFavoriteTargetKey(
  target: FavoriteTarget,
): string {
  switch (target.kind) {
    case "bible_verse":
      return JSON.stringify([
        FAVORITE_TARGET_KEY_VERSION,
        "bible_verse",
        target.versionId,
        target.bookId,
        target.chapter,
        target.verse,
      ]);

    case "hymn":
      return JSON.stringify([
        FAVORITE_TARGET_KEY_VERSION,
        "hymn",
        target.editionId,
        target.hymnId,
      ]);
  }
}

export function decodeFavoriteTargetKey(
  targetKind: FavoriteTargetKind,
  targetKey: string,
): FavoriteTarget {
  let value: unknown;

  try {
    value = JSON.parse(targetKey);
  } catch {
    return invalidFavoriteTargetKey();
  }

  if (!Array.isArray(value)) {
    return invalidFavoriteTargetKey();
  }

  switch (targetKind) {
    case "bible_verse": {
      if (
        value.length !== 6 ||
        value[0] !== FAVORITE_TARGET_KEY_VERSION ||
        value[1] !== "bible_verse" ||
        !isNonEmptyString(value[2]) ||
        !isNonEmptyString(value[3]) ||
        !isPositiveSafeInteger(value[4]) ||
        !isPositiveSafeInteger(value[5])
      ) {
        return invalidFavoriteTargetKey();
      }

      return {
        kind: "bible_verse",
        versionId: value[2] as BibleVersionId,
        bookId: value[3] as BibleBookId,
        chapter: value[4],
        verse: value[5],
      };
    }

    case "hymn": {
      if (
        value.length !== 4 ||
        value[0] !== FAVORITE_TARGET_KEY_VERSION ||
        value[1] !== "hymn" ||
        !isNonEmptyString(value[2]) ||
        !isNonEmptyString(value[3])
      ) {
        return invalidFavoriteTargetKey();
      }

      return {
        kind: "hymn",
        editionId: value[2] as HymnalEditionId,
        hymnId: value[3] as HymnId,
      };
    }
  }

  return invalidFavoriteTargetKey();
}
