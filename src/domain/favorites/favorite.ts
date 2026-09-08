import type { BibleBookId } from "../bible/bibleReference";
import type { BibleVersionId } from "../bible/bibleVersion";
import type { HymnId } from "../hymnal/hymn";
import type { HymnalEditionId } from "../hymnal/hymnalEdition";
import type { PersonalCanonicalId } from "../personal/personalIdentity";
import type { PersonalUtcTimestamp } from "../personal/personalTime";

export type FavoriteId = PersonalCanonicalId<"favorite">;

export const FAVORITE_TARGET_KINDS = ["bible_verse", "hymn"] as const;

export type FavoriteTargetKind = (typeof FAVORITE_TARGET_KINDS)[number];

export type BibleVerseFavoriteTarget = Readonly<{
  kind: "bible_verse";
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
  verse: number;
}>;

export type HymnFavoriteTarget = Readonly<{
  kind: "hymn";
  editionId: HymnalEditionId;
  hymnId: HymnId;
}>;

export type FavoriteTarget =
  | BibleVerseFavoriteTarget
  | HymnFavoriteTarget;

export type Favorite = Readonly<{
  id: FavoriteId;
  target: FavoriteTarget;
  createdAtUtc: PersonalUtcTimestamp;
}>;
