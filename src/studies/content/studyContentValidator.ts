import {
  STUDY_AUDIENCE_LEVELS,
  STUDY_CONTENT_BLOCK_TYPES,
  STUDY_CONTENT_PROFILES,
  STUDY_SECTION_TYPES,
  STUDY_TRACK_NATURES,
  type Study,
  type StudyContentBlock,
  type StudySection,
  type StudySectionType,
  type StudyTrack,
} from "../../domain/studies/study";
import type { StudyContentPackage } from "./studyContentPackage";

export const JOURNEY_20_30_REQUIRED_SECTION_TYPES = [
  "GOLDEN_TEXT",
  "PRACTICAL_TRUTH",
  "BIBLE_READING",
  "BEFORE_UNDERSTANDING",
  "READ",
  "OBSERVE",
  "UNDERSTAND",
  "APPLY",
  "JOURNEY_TAKEAWAY",
  "PRACTICE_TODAY",
  "REFLECTION_QUESTIONS",
  "JOURNAL_PROMPT",
  "PRAYER",
  "KEEP",
  "GROUP_MODE",
  "CONTINUE_JOURNEY",
] as const satisfies readonly StudySectionType[];

export type StudyContentValidationIssue = Readonly<{
  code: string;
  path: string;
  message: string;
}>;

export type StudyContentValidationResult = Readonly<{
  valid: boolean;
  issues: readonly StudyContentValidationIssue[];
}>;

type StudyContentValidationPolicy = Readonly<{
  requirePublished: boolean;
  allowUnresolvedNextStudy: boolean;
}>;

const EDITORIAL_VALIDATION_POLICY: StudyContentValidationPolicy = {
  requirePublished: false,
  allowUnresolvedNextStudy: true,
};

const RUNTIME_VALIDATION_POLICY: StudyContentValidationPolicy = {
  requirePublished: true,
  allowUnresolvedNextStudy: false,
};

function isNonEmptyText(value: string): boolean {
  return value.trim().length > 0;
}

function addIssue(
  issues: StudyContentValidationIssue[],
  code: string,
  path: string,
  message: string,
): void {
  issues.push({ code, path, message });
}

function validatePositiveInteger(
  issues: StudyContentValidationIssue[],
  value: number,
  path: string,
  code: string,
): void {
  if (!Number.isInteger(value) || value <= 0) {
    addIssue(issues, code, path, "Expected a positive integer.");
  }
}

function validateTrackFields(
  track: StudyTrack,
  index: number,
  issues: StudyContentValidationIssue[],
  policy: StudyContentValidationPolicy,
): void {
  const path = `tracks[${index}]`;

  if (!isNonEmptyText(track.id)) {
    addIssue(issues, "TRACK_ID_REQUIRED", `${path}.id`, "Track id is required.");
  }

  if (!isNonEmptyText(track.slug)) {
    addIssue(issues, "TRACK_SLUG_REQUIRED", `${path}.slug`, "Track slug is required.");
  }

  for (const [field, value] of [
    ["title", track.title],
    ["description", track.description],
    ["cardImage", track.cardImage],
    ["heroImage", track.heroImage],
  ] as const) {
    if (!isNonEmptyText(value)) {
      addIssue(issues, "TRACK_FIELD_REQUIRED", `${path}.${field}`, `${field} is required.`);
    }
  }

  if (!(STUDY_TRACK_NATURES as readonly string[]).includes(track.type)) {
    addIssue(issues, "TRACK_TYPE_INVALID", `${path}.type`, "Track type is not supported by the domain contract.");
  }

  if (!(STUDY_CONTENT_PROFILES as readonly string[]).includes(track.contentProfile)) {
    addIssue(issues, "TRACK_CONTENT_PROFILE_INVALID", `${path}.contentProfile`, "Track content profile is not supported by the domain contract.");
  }

  validatePositiveInteger(issues, track.order, `${path}.order`, "TRACK_ORDER_INVALID");

  if (policy.requirePublished && !track.published) {
    addIssue(
      issues,
      "TRACK_UNPUBLISHED",
      `${path}.published`,
      "Runtime content package may contain only published tracks.",
    );
  }
}

function validateStudyFields(
  study: Study,
  index: number,
  issues: StudyContentValidationIssue[],
  policy: StudyContentValidationPolicy,
): void {
  const path = `studies[${index}]`;

  if (!isNonEmptyText(study.id)) {
    addIssue(issues, "STUDY_ID_REQUIRED", `${path}.id`, "Study id is required.");
  }

  if (!isNonEmptyText(study.trackId)) {
    addIssue(issues, "STUDY_TRACK_ID_REQUIRED", `${path}.trackId`, "Study track id is required.");
  }

  if (!isNonEmptyText(study.slug)) {
    addIssue(issues, "STUDY_SLUG_REQUIRED", `${path}.slug`, "Study slug is required.");
  }

  for (const [field, value] of [
    ["title", study.title],
    ["summary", study.summary],
    ["questionCentral", study.questionCentral],
    ["objective", study.objective],
    ["heroImage", study.heroImage],
  ] as const) {
    if (!isNonEmptyText(value)) {
      addIssue(issues, "STUDY_FIELD_REQUIRED", `${path}.${field}`, `${field} is required.`);
    }
  }

  validatePositiveInteger(issues, study.number, `${path}.number`, "STUDY_NUMBER_INVALID");

  if (study.estimatedMinutes !== null) {
    const { minimum, maximum } = study.estimatedMinutes;

    if (
      !Number.isFinite(minimum) ||
      !Number.isFinite(maximum) ||
      minimum <= 0 ||
      maximum <= 0 ||
      minimum > maximum
    ) {
      addIssue(issues, "STUDY_ESTIMATED_MINUTES_INVALID", `${path}.estimatedMinutes`, "Estimated minute range must be positive and ordered.");
    }
  }

  if (
    study.audienceLevel !== null &&
    !(STUDY_AUDIENCE_LEVELS as readonly string[]).includes(study.audienceLevel)
  ) {
    addIssue(issues, "STUDY_AUDIENCE_LEVEL_INVALID", `${path}.audienceLevel`, "Audience level is not supported by the domain contract.");
  }

  const normalizedTags = new Set<string>();

  study.tags.forEach((tag, tagIndex) => {
    const normalized = tag.trim().toLowerCase();

    if (normalized.length === 0) {
      addIssue(issues, "STUDY_TAG_EMPTY", `${path}.tags[${tagIndex}]`, "Study tags cannot be empty.");
      return;
    }

    if (normalizedTags.has(normalized)) {
      addIssue(issues, "STUDY_TAG_DUPLICATE", `${path}.tags[${tagIndex}]`, "Study tags must be unique ignoring case and surrounding whitespace.");
      return;
    }

    normalizedTags.add(normalized);
  });

  if (policy.requirePublished && !study.published) {
    addIssue(
      issues,
      "STUDY_UNPUBLISHED",
      `${path}.published`,
      "Runtime content package may contain only published studies.",
    );
  }
}

function validateContentBlock(
  block: StudyContentBlock,
  blockIndex: number,
  sectionPath: string,
  issues: StudyContentValidationIssue[],
): void {
  const path = `${sectionPath}.blocks[${blockIndex}]`;

  if (!(STUDY_CONTENT_BLOCK_TYPES as readonly string[]).includes(block.type)) {
    addIssue(issues, "SECTION_BLOCK_TYPE_INVALID", `${path}.type`, "Study content block type is not supported by the domain contract.");
    return;
  }

  switch (block.type) {
    case "PARAGRAPH":
    case "SUBHEADING":
      if (!isNonEmptyText(block.text)) {
        addIssue(issues, "SECTION_BLOCK_TEXT_REQUIRED", `${path}.text`, "Text content block cannot be empty.");
      }
      return;

    case "BULLET_LIST":
    case "NUMBERED_LIST":
      if (block.items.length === 0) {
        addIssue(issues, "SECTION_BLOCK_LIST_EMPTY", `${path}.items`, "List content block must contain at least one item.");
        return;
      }

      block.items.forEach((item, itemIndex) => {
        if (!isNonEmptyText(item)) {
          addIssue(issues, "SECTION_BLOCK_LIST_ITEM_EMPTY", `${path}.items[${itemIndex}]`, "List content block items cannot be empty.");
        }
      });
      return;

    case "CALLOUT":
      if (block.title !== null && !isNonEmptyText(block.title)) {
        addIssue(issues, "SECTION_BLOCK_CALLOUT_TITLE_EMPTY", `${path}.title`, "Callout title must be null or non-empty text.");
      }

      if (!isNonEmptyText(block.text)) {
        addIssue(issues, "SECTION_BLOCK_CALLOUT_TEXT_REQUIRED", `${path}.text`, "Callout text cannot be empty.");
      }
      return;
  }
}

function validateSectionFields(
  section: StudySection,
  index: number,
  issues: StudyContentValidationIssue[],
): void {
  const path = `sections[${index}]`;

  for (const [field, value] of [
    ["id", section.id],
    ["studyId", section.studyId],
    ["title", section.title],
    ["iconKey", section.iconKey],
  ] as const) {
    if (!isNonEmptyText(value)) {
      addIssue(issues, "SECTION_FIELD_REQUIRED", `${path}.${field}`, `${field} is required.`);
    }
  }

  if (!(STUDY_SECTION_TYPES as readonly string[]).includes(section.type)) {
    addIssue(issues, "SECTION_TYPE_INVALID", `${path}.type`, "Section type is not supported by the domain contract.");
  }

  validatePositiveInteger(issues, section.order, `${path}.order`, "SECTION_ORDER_INVALID");

  if (section.blocks.length === 0) {
    addIssue(issues, "SECTION_BLOCKS_REQUIRED", `${path}.blocks`, "Study section must contain at least one structured content block.");
  }

  section.blocks.forEach((block, blockIndex) => {
    validateContentBlock(block, blockIndex, path, issues);
  });
}

function validateStudyContentPackageWithPolicy(
  contentPackage: StudyContentPackage,
  policy: StudyContentValidationPolicy,
): StudyContentValidationResult {
  const issues: StudyContentValidationIssue[] = [];

  if (!isNonEmptyText(contentPackage.contentVersion)) {
    addIssue(issues, "CONTENT_VERSION_REQUIRED", "contentVersion", "contentVersion is required.");
  }

  const trackById = new Map<string, StudyTrack>();
  const trackSlugOwner = new Map<string, string>();
  const trackOrderOwner = new Map<number, string>();

  contentPackage.tracks.forEach((track, index) => {
    validateTrackFields(track, index, issues, policy);

    if (trackById.has(track.id)) {
      addIssue(issues, "TRACK_ID_DUPLICATE", `tracks[${index}].id`, `Duplicate track id: ${track.id}.`);
    } else {
      trackById.set(track.id, track);
    }

    const normalizedSlug = track.slug.trim().toLowerCase();
    const slugOwner = trackSlugOwner.get(normalizedSlug);

    if (slugOwner !== undefined) {
      addIssue(issues, "TRACK_SLUG_DUPLICATE", `tracks[${index}].slug`, `Track slug is already used by ${slugOwner}.`);
    } else if (normalizedSlug.length > 0) {
      trackSlugOwner.set(normalizedSlug, track.id);
    }

    const orderOwner = trackOrderOwner.get(track.order);

    if (orderOwner !== undefined) {
      addIssue(issues, "TRACK_ORDER_DUPLICATE", `tracks[${index}].order`, `Track order is already used by ${orderOwner}.`);
    } else if (Number.isInteger(track.order) && track.order > 0) {
      trackOrderOwner.set(track.order, track.id);
    }
  });

  const studyById = new Map<string, Study>();
  const studySlugOwner = new Map<string, string>();
  const studyNumberOwner = new Map<string, string>();

  contentPackage.studies.forEach((study, index) => {
    validateStudyFields(study, index, issues, policy);

    if (studyById.has(study.id)) {
      addIssue(issues, "STUDY_ID_DUPLICATE", `studies[${index}].id`, `Duplicate study id: ${study.id}.`);
    } else {
      studyById.set(study.id, study);
    }

    const normalizedSlug = study.slug.trim().toLowerCase();
    const slugOwner = studySlugOwner.get(normalizedSlug);

    if (slugOwner !== undefined) {
      addIssue(issues, "STUDY_SLUG_DUPLICATE", `studies[${index}].slug`, `Study slug is already used by ${slugOwner}.`);
    } else if (normalizedSlug.length > 0) {
      studySlugOwner.set(normalizedSlug, study.id);
    }

    if (!trackById.has(study.trackId)) {
      addIssue(issues, "STUDY_TRACK_NOT_FOUND", `studies[${index}].trackId`, `Study references unknown track ${study.trackId}.`);
    }

    const studyNumberKey = `${study.trackId}::${study.number}`;
    const numberOwner = studyNumberOwner.get(studyNumberKey);

    if (numberOwner !== undefined) {
      addIssue(issues, "STUDY_NUMBER_DUPLICATE_IN_TRACK", `studies[${index}].number`, `Study number is already used by ${numberOwner} in this track.`);
    } else if (Number.isInteger(study.number) && study.number > 0) {
      studyNumberOwner.set(studyNumberKey, study.id);
    }
  });

  contentPackage.studies.forEach((study, index) => {
    if (study.nextStudyId === null) {
      return;
    }

    if (study.nextStudyId === study.id) {
      addIssue(issues, "NEXT_STUDY_SELF_REFERENCE", `studies[${index}].nextStudyId`, "A study cannot reference itself as the next study.");
      return;
    }

    const nextStudy = studyById.get(study.nextStudyId);

    if (nextStudy === undefined) {
      if (policy.allowUnresolvedNextStudy) {
        return;
      }

      addIssue(
        issues,
        "NEXT_STUDY_NOT_FOUND",
        `studies[${index}].nextStudyId`,
        `nextStudyId ${study.nextStudyId} does not exist in the package.`,
      );
      return;
    }

    if (nextStudy.trackId !== study.trackId) {
      addIssue(issues, "NEXT_STUDY_TRACK_MISMATCH", `studies[${index}].nextStudyId`, "nextStudyId must point to a study in the same track.");
    }
  });

  const sectionById = new Map<string, StudySection>();
  const sectionOrdersByStudy = new Map<string, Map<number, string>>();
  const sectionTypesByStudy = new Map<string, Set<StudySectionType>>();

  contentPackage.sections.forEach((section, index) => {
    validateSectionFields(section, index, issues);

    if (sectionById.has(section.id)) {
      addIssue(issues, "SECTION_ID_DUPLICATE", `sections[${index}].id`, `Duplicate section id: ${section.id}.`);
    } else {
      sectionById.set(section.id, section);
    }

    if (!studyById.has(section.studyId)) {
      addIssue(issues, "SECTION_STUDY_NOT_FOUND", `sections[${index}].studyId`, `Section references unknown study ${section.studyId}.`);
    }

    let orders = sectionOrdersByStudy.get(section.studyId);

    if (orders === undefined) {
      orders = new Map<number, string>();
      sectionOrdersByStudy.set(section.studyId, orders);
    }

    const orderOwner = orders.get(section.order);

    if (orderOwner !== undefined) {
      addIssue(issues, "SECTION_ORDER_DUPLICATE_IN_STUDY", `sections[${index}].order`, `Section order is already used by ${orderOwner} in this study.`);
    } else if (Number.isInteger(section.order) && section.order > 0) {
      orders.set(section.order, section.id);
    }

    let sectionTypes = sectionTypesByStudy.get(section.studyId);

    if (sectionTypes === undefined) {
      sectionTypes = new Set<StudySectionType>();
      sectionTypesByStudy.set(section.studyId, sectionTypes);
    }

    sectionTypes.add(section.type);
  });

  contentPackage.studies.forEach((study, studyIndex) => {
    const track = trackById.get(study.trackId);
    const sectionTypes = sectionTypesByStudy.get(study.id) ?? new Set<StudySectionType>();

    if (sectionTypes.size === 0) {
      addIssue(issues, "STUDY_SECTIONS_REQUIRED", `studies[${studyIndex}]`, "Every study must contain at least one structured section.");
    }

    if (track?.contentProfile !== "JOURNEY_20_30_V1") {
      return;
    }

    for (const requiredType of JOURNEY_20_30_REQUIRED_SECTION_TYPES) {
      if (!sectionTypes.has(requiredType)) {
        addIssue(issues, "REQUIRED_SECTION_MISSING", `studies[${studyIndex}]`, `Required JOURNEY_20_30_V1 section type ${requiredType} is missing.`);
      }
    }
  });

  contentPackage.sections.forEach((section, sectionIndex) => {
    const study = studyById.get(section.studyId);
    const track = study === undefined ? undefined : trackById.get(study.trackId);

    if (
      track?.contentProfile === "JOURNEY_20_30_V1" &&
      (JOURNEY_20_30_REQUIRED_SECTION_TYPES as readonly StudySectionType[]).includes(section.type) &&
      section.optional
    ) {
      addIssue(issues, "REQUIRED_SECTION_MARKED_OPTIONAL", `sections[${sectionIndex}].optional`, `Required JOURNEY_20_30_V1 section type ${section.type} cannot be marked optional.`);
    }
  });

  const referenceIds = new Set<string>();

  contentPackage.references.forEach((reference, index) => {
    const path = `references[${index}]`;

    for (const [field, value] of [
      ["id", reference.id],
      ["studyId", reference.studyId],
      ["sectionId", reference.sectionId],
      ["label", reference.label],
      ["reference", reference.reference],
      ["actionType", reference.actionType],
    ] as const) {
      if (!isNonEmptyText(value)) {
        addIssue(issues, "REFERENCE_FIELD_REQUIRED", `${path}.${field}`, `${field} is required.`);
      }
    }

    if (referenceIds.has(reference.id)) {
      addIssue(issues, "REFERENCE_ID_DUPLICATE", `${path}.id`, `Duplicate reference id: ${reference.id}.`);
    } else {
      referenceIds.add(reference.id);
    }

    if (!studyById.has(reference.studyId)) {
      addIssue(issues, "REFERENCE_STUDY_NOT_FOUND", `${path}.studyId`, `Reference points to unknown study ${reference.studyId}.`);
    }

    const section = sectionById.get(reference.sectionId);

    if (section === undefined) {
      addIssue(issues, "REFERENCE_SECTION_NOT_FOUND", `${path}.sectionId`, `Reference points to unknown section ${reference.sectionId}.`);
      return;
    }

    if (section.studyId !== reference.studyId) {
      addIssue(issues, "REFERENCE_SECTION_STUDY_MISMATCH", `${path}.sectionId`, "Reference section must belong to the same study as reference.studyId.");
    }
  });

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function validateStudyEditorialPackage(
  contentPackage: StudyContentPackage,
): StudyContentValidationResult {
  return validateStudyContentPackageWithPolicy(
    contentPackage,
    EDITORIAL_VALIDATION_POLICY,
  );
}

export function validateStudyContentPackage(
  contentPackage: StudyContentPackage,
): StudyContentValidationResult {
  return validateStudyContentPackageWithPolicy(
    contentPackage,
    RUNTIME_VALIDATION_POLICY,
  );
}

export function assertValidStudyEditorialPackage(
  contentPackage: StudyContentPackage,
): void {
  const result = validateStudyEditorialPackage(contentPackage);

  if (result.valid) {
    return;
  }

  const detail = result.issues
    .map((issue) => `${issue.code}@${issue.path}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid Editorial Study Content Package:\n${detail}`);
}

export function assertValidStudyContentPackage(
  contentPackage: StudyContentPackage,
): void {
  const result = validateStudyContentPackage(contentPackage);

  if (result.valid) {
    return;
  }

  const detail = result.issues
    .map((issue) => `${issue.code}@${issue.path}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid Study Content Package:\n${detail}`);
}
