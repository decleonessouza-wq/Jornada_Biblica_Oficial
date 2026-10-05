declare const devotionalIdBrand: unique symbol;
declare const devotionalBlockIdBrand: unique symbol;

export type DevotionalId = string & {
  readonly [devotionalIdBrand]: "DevotionalId";
};

export type DevotionalBlockId = string & {
  readonly [devotionalBlockIdBrand]: "DevotionalBlockId";
};

export const DEVOTIONAL_CONTENT_TYPE = "DEVOTIONAL" as const;

export type DevotionalContentType = typeof DEVOTIONAL_CONTENT_TYPE;

export const DEVOTIONAL_FORMATS = ["OPEN_LETTER", "REFLECTION"] as const;

export type DevotionalFormat = (typeof DEVOTIONAL_FORMATS)[number];

export const DEVOTIONAL_TRACK_PLACEMENTS = ["TRACK_05"] as const;

export type DevotionalTrackPlacement =
  (typeof DEVOTIONAL_TRACK_PLACEMENTS)[number];

export const DEVOTIONAL_PUBLIC_DISPLAY_AUTHORIZATIONS = [
  "UNRESOLVED",
  "AUTHORIZED",
  "DENIED",
] as const;

export type DevotionalPublicDisplayAuthorization =
  (typeof DEVOTIONAL_PUBLIC_DISPLAY_AUTHORIZATIONS)[number];

export type DevotionalPublicAuthorProfile = Readonly<{
  displayName: string;
  role: string | null;
  formation: string | null;
  cityState: string | null;
}>;

export type DevotionalAuthorIdentity = Readonly<{
  canonicalName: string;
  publicProfile: DevotionalPublicAuthorProfile;
  publicDisplayAuthorization: DevotionalPublicDisplayAuthorization;
}>;

export const DEVOTIONAL_REVIEW_STATES = ["PENDING", "APPROVED"] as const;

export type DevotionalReviewState =
  (typeof DEVOTIONAL_REVIEW_STATES)[number];

export const DEVOTIONAL_PUBLICATION_AUTHORIZATIONS = [
  "PENDING",
  "AUTHORIZED",
] as const;

export type DevotionalPublicationAuthorization =
  (typeof DEVOTIONAL_PUBLICATION_AUTHORIZATIONS)[number];

export const DEVOTIONAL_EDITORIAL_STATUSES = [
  "DRAFT",
  "PUBLISHED",
] as const;

export type DevotionalEditorialStatus =
  (typeof DEVOTIONAL_EDITORIAL_STATUSES)[number];

export type DevotionalGovernance = Readonly<{
  editorialStatus: DevotionalEditorialStatus;
  contentReview: DevotionalReviewState;
  theologicalReview: DevotionalReviewState;
  publicDisplayAuthorization: DevotionalPublicDisplayAuthorization;
  publicationAuthorization: DevotionalPublicationAuthorization;
}>;

export const DEVOTIONAL_SOURCE_KINDS = [
  "AUTHORIAL",
  "COLLABORATIVE",
] as const;

export type DevotionalSourceKind =
  (typeof DEVOTIONAL_SOURCE_KINDS)[number];

export type DevotionalSourceMetadata = Readonly<{
  sourceKind: DevotionalSourceKind;
  originalTitle: string;
  receivedAs: string | null;
  sourceFileName: string | null;
  sourceSha256: string | null;
  curatorNotes: readonly string[];
}>;

export type DevotionalBibleReference = Readonly<{
  bookId: string;
  startChapter: number;
  startVerse: number | null;
  endChapter: number | null;
  endVerse: number | null;
}>;

export type DevotionalHeadingBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "HEADING";
  level: 2 | 3;
  text: string;
}>;

export type DevotionalParagraphBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "PARAGRAPH";
  text: string;
}>;

export type DevotionalBibleReferenceBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "BIBLE_REFERENCE";
  reference: DevotionalBibleReference;
}>;

export type DevotionalScriptureQuoteBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "SCRIPTURE_QUOTE";
  reference: DevotionalBibleReference;
  sourceText: string | null;
}>;

export type DevotionalListBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "LIST";
  style: "BULLET" | "NUMBERED";
  items: readonly string[];
}>;

export type DevotionalCalloutBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "CALLOUT";
  role: "AUTHOR_EMPHASIS" | "EDITORIAL_NOTE";
  text: string;
}>;

export type DevotionalReflectionQuestionBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "REFLECTION_QUESTION";
  prompt: string;
}>;

export type DevotionalPrayerBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "PRAYER";
  text: string;
}>;

export type DevotionalActionBlock = Readonly<{
  id: DevotionalBlockId;
  kind: "ACTION";
  text: string;
}>;

export type DevotionalBlock =
  | DevotionalHeadingBlock
  | DevotionalParagraphBlock
  | DevotionalBibleReferenceBlock
  | DevotionalScriptureQuoteBlock
  | DevotionalListBlock
  | DevotionalCalloutBlock
  | DevotionalReflectionQuestionBlock
  | DevotionalPrayerBlock
  | DevotionalActionBlock;
