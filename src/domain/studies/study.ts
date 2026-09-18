declare const studyTrackIdBrand: unique symbol;
declare const studyIdBrand: unique symbol;
declare const studySectionIdBrand: unique symbol;
declare const studyReferenceIdBrand: unique symbol;
declare const studyTrackSlugBrand: unique symbol;
declare const studySlugBrand: unique symbol;

export type StudyTrackId = string & {
  readonly [studyTrackIdBrand]: "StudyTrackId";
};

export type StudyId = string & {
  readonly [studyIdBrand]: "StudyId";
};

export type StudySectionId = string & {
  readonly [studySectionIdBrand]: "StudySectionId";
};

export type StudyReferenceId = string & {
  readonly [studyReferenceIdBrand]: "StudyReferenceId";
};

export type StudyTrackSlug = string & {
  readonly [studyTrackSlugBrand]: "StudyTrackSlug";
};

export type StudySlug = string & {
  readonly [studySlugBrand]: "StudySlug";
};

export const STUDY_TRACK_NATURES = [
  "FORMATION",
  "CHRISTIAN_LIFE",
  "DEVOTIONAL",
  "COLLABORATIVE",
] as const;

export type StudyTrackNature =
  (typeof STUDY_TRACK_NATURES)[number];

export const STUDY_AUDIENCE_LEVELS = [
  "BEGINNER",
  "INTERMEDIATE",
] as const;

export type StudyAudienceLevel =
  (typeof STUDY_AUDIENCE_LEVELS)[number];

export const STUDY_CONTENT_PROFILES = [
  "TRACK_1_ORIGINAL_V1",
  "JOURNEY_20_30_V1",
] as const;

export type StudyContentProfile =
  (typeof STUDY_CONTENT_PROFILES)[number];

export const STUDY_SECTION_TYPES = [
  "GOLDEN_TEXT",
  "PRACTICAL_TRUTH",
  "BIBLE_READING",
  "BEFORE_UNDERSTANDING",
  "READ",
  "OBSERVE",
  "UNDERSTAND",
  "CONNECT",
  "INTERPRETATION_CAUTION",
  "REFLECT",
  "APPLY",
  "JOURNEY_TAKEAWAY",
  "PRACTICE_TODAY",
  "REFLECTION_QUESTIONS",
  "JOURNAL_PROMPT",
  "PRAYER",
  "KEEP",
  "GROUP_MODE",
  "CONTINUE_JOURNEY",
  "DEEPEN",
  "REFERENCES",
  "EDITORIAL_NOTE",
] as const;

export type StudySectionType =
  (typeof STUDY_SECTION_TYPES)[number];

export const STUDY_CONTENT_BLOCK_TYPES = [
  "PARAGRAPH",
  "SUBHEADING",
  "BULLET_LIST",
  "NUMBERED_LIST",
  "CALLOUT",
] as const;

export type StudyContentBlockType =
  (typeof STUDY_CONTENT_BLOCK_TYPES)[number];

export type StudyParagraphBlock = Readonly<{
  type: "PARAGRAPH";
  text: string;
}>;

export type StudySubheadingBlock = Readonly<{
  type: "SUBHEADING";
  text: string;
}>;

export type StudyBulletListBlock = Readonly<{
  type: "BULLET_LIST";
  items: readonly string[];
}>;

export type StudyNumberedListBlock = Readonly<{
  type: "NUMBERED_LIST";
  items: readonly string[];
}>;

export type StudyCalloutBlock = Readonly<{
  type: "CALLOUT";
  title: string | null;
  text: string;
}>;

export type StudyContentBlock =
  | StudyParagraphBlock
  | StudySubheadingBlock
  | StudyBulletListBlock
  | StudyNumberedListBlock
  | StudyCalloutBlock;

export const STUDY_PEDAGOGICAL_SECTION_GROUPS = {
  BIBLE_SHOWS: ["READ", "OBSERVE"],
  NEED_TO_UNDERSTAND: [
    "UNDERSTAND",
    "CONNECT",
    "INTERPRETATION_CAUTION",
  ],
  TRUTH_CHANGES: ["REFLECT", "APPLY"],
} as const satisfies Readonly<
  Record<string, readonly StudySectionType[]>
>;

export type StudyEstimatedMinutes = Readonly<{
  minimum: number;
  maximum: number;
}>;

export type StudyTrack = Readonly<{
  id: StudyTrackId;
  slug: StudyTrackSlug;
  title: string;
  description: string;
  type: StudyTrackNature;
  contentProfile: StudyContentProfile;
  cardImage: string;
  heroImage: string;
  order: number;
  published: boolean;
}>;

export type Study = Readonly<{
  id: StudyId;
  trackId: StudyTrackId;
  number: number;
  slug: StudySlug;
  title: string;
  summary: string;
  questionCentral: string;
  objective: string;
  estimatedMinutes: StudyEstimatedMinutes | null;
  heroImage: string;
  nextStudyId: StudyId | null;
  audienceLevel: StudyAudienceLevel | null;
  tags: readonly string[];
  published: boolean;
}>;

export type StudySection = Readonly<{
  id: StudySectionId;
  studyId: StudyId;
  type: StudySectionType;
  title: string;
  iconKey: string;
  blocks: readonly StudyContentBlock[];
  order: number;
  optional: boolean;
  collapsible: boolean;
}>;

export type StudyReference = Readonly<{
  id: StudyReferenceId;
  studyId: StudyId;
  sectionId: StudySectionId;
  label: string;
  reference: string;
  // O documento oficial exige actionType, mas ainda nao enumera seus valores.
  actionType: string;
}>;
