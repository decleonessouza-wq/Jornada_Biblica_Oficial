import type {
  BibleBookId,
  BibleReference,
} from "../bible/bibleReference";
import type { BibleVersionId } from "../bible/bibleVersion";
import type { HymnId } from "../hymnal/hymn";
import type { HymnalEditionId } from "../hymnal/hymnalEdition";
import type { PersonalCanonicalId } from "../personal/personalIdentity";
import type { PersonalUtcTimestamp } from "../personal/personalTime";
import type { StudyId } from "../studies/study";

export type FavoriteId = PersonalCanonicalId<"favorite">;

export const FAVORITE_TARGET_KINDS = [
  "bible_verse",
  "bible_reference",
  "study",
  "hymn",
] as const;

export type FavoriteTargetKind = (typeof FAVORITE_TARGET_KINDS)[number];

export type BibleVerseFavoriteTarget = Readonly<{
  kind: "bible_verse";
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
  verse: number;
}>;

export type BibleReferenceFavoriteTarget = Readonly<{
  kind: "bible_reference";
  reference: BibleReference;
}>;

export type StudyFavoriteTarget = Readonly<{
  kind: "study";
  studyId: StudyId;
}>;

export type HymnFavoriteTarget = Readonly<{
  kind: "hymn";
  editionId: HymnalEditionId;
  hymnId: HymnId;
}>;

export type FavoriteTarget =
  | BibleVerseFavoriteTarget
  | BibleReferenceFavoriteTarget
  | StudyFavoriteTarget
  | HymnFavoriteTarget;

export type FavoriteOriginContext = Readonly<{
  kind: "study";
  studyId: StudyId;
}>;

export type Favorite = Readonly<{
  id: FavoriteId;
  target: FavoriteTarget;
  createdAtUtc: PersonalUtcTimestamp;
}>;
