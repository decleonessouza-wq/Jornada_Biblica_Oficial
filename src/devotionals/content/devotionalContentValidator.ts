import {
  DEVOTIONAL_CONTENT_TYPE,
  DEVOTIONAL_EDITORIAL_STATUSES,
  DEVOTIONAL_FORMATS,
  DEVOTIONAL_PUBLICATION_AUTHORIZATIONS,
  DEVOTIONAL_PUBLIC_DISPLAY_AUTHORIZATIONS,
  DEVOTIONAL_REVIEW_STATES,
  DEVOTIONAL_SOURCE_KINDS,
  DEVOTIONAL_TRACK_PLACEMENTS,
  type DevotionalBibleReference,
  type DevotionalBlock,
} from "../../domain/devotionals/devotional";
import type { DevotionalContentPackage } from "./devotionalContentPackage";

type UnknownRecord = Record<string, unknown>;

export class DevotionalContentValidationError extends Error {
  readonly code: string;
  readonly path: string;

  constructor(code: string, path: string) {
    super(`${code}:${path}`);
    this.name = "DevotionalContentValidationError";
    this.code = code;
    this.path = path;
  }
}

function fail(code: string, path: string): never {
  throw new DevotionalContentValidationError(code, path);
}

function assertRecord(
  value: unknown,
  code: string,
  path: string,
): asserts value is UnknownRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(code, path);
  }
}

function assertExactKeys(
  value: UnknownRecord,
  keys: readonly string[],
  code: string,
  path: string,
): void {
  const allowed = new Set(keys);

  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      fail(code, `${path}.${key}`);
    }
  }
}

function assertNonEmptyString(
  value: unknown,
  code: string,
  path: string,
): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    fail(code, path);
  }
}

function assertNullableNonEmptyString(
  value: unknown,
  code: string,
  path: string,
): void {
  if (value !== null) {
    assertNonEmptyString(value, code, path);
  }
}

function assertAllowedString(
  value: unknown,
  allowed: readonly string[],
  code: string,
  path: string,
): asserts value is string {
  if (
    typeof value !== "string" ||
    !allowed.some((candidate) => candidate === value)
  ) {
    fail(code, path);
  }
}

function assertPositiveIntegerOrNull(
  value: unknown,
  code: string,
  path: string,
): void {
  if (
    value !== null &&
    (!Number.isInteger(value) || typeof value !== "number" || value < 1)
  ) {
    fail(code, path);
  }
}

function assertBibleReference(
  value: unknown,
  path: string,
): asserts value is DevotionalBibleReference {
  assertRecord(value, "DEVOTIONAL_BIBLE_REFERENCE_INVALID", path);
  assertExactKeys(
    value,
    [
      "bookId",
      "startChapter",
      "startVerse",
      "endChapter",
      "endVerse",
    ],
    "DEVOTIONAL_BIBLE_REFERENCE_UNKNOWN_FIELD",
    path,
  );

  assertNonEmptyString(
    value.bookId,
    "DEVOTIONAL_BIBLE_REFERENCE_BOOK_ID_INVALID",
    `${path}.bookId`,
  );

  if (
    typeof value.startChapter !== "number" ||
    !Number.isInteger(value.startChapter) ||
    value.startChapter < 1
  ) {
    fail(
      "DEVOTIONAL_BIBLE_REFERENCE_START_CHAPTER_INVALID",
      `${path}.startChapter`,
    );
  }

  assertPositiveIntegerOrNull(
    value.startVerse,
    "DEVOTIONAL_BIBLE_REFERENCE_START_VERSE_INVALID",
    `${path}.startVerse`,
  );
  assertPositiveIntegerOrNull(
    value.endChapter,
    "DEVOTIONAL_BIBLE_REFERENCE_END_CHAPTER_INVALID",
    `${path}.endChapter`,
  );
  assertPositiveIntegerOrNull(
    value.endVerse,
    "DEVOTIONAL_BIBLE_REFERENCE_END_VERSE_INVALID",
    `${path}.endVerse`,
  );

  if (value.endChapter === null && value.endVerse !== null) {
    fail(
      "DEVOTIONAL_BIBLE_REFERENCE_END_VERSE_WITHOUT_END_CHAPTER",
      `${path}.endVerse`,
    );
  }

  if (
    typeof value.endChapter === "number" &&
    value.endChapter < value.startChapter
  ) {
    fail(
      "DEVOTIONAL_BIBLE_REFERENCE_CHAPTER_RANGE_INVALID",
      `${path}.endChapter`,
    );
  }

  if (
    value.endChapter === value.startChapter &&
    value.endVerse !== null &&
    value.startVerse === null
  ) {
    fail(
      "DEVOTIONAL_BIBLE_REFERENCE_VERSE_RANGE_START_REQUIRED",
      `${path}.startVerse`,
    );
  }

  if (
    value.endChapter === value.startChapter &&
    typeof value.startVerse === "number" &&
    typeof value.endVerse === "number" &&
    value.endVerse < value.startVerse
  ) {
    fail(
      "DEVOTIONAL_BIBLE_REFERENCE_VERSE_RANGE_INVALID",
      `${path}.endVerse`,
    );
  }
}

function assertBlock(value: unknown, index: number): asserts value is DevotionalBlock {
  const path = `blocks[${index}]`;

  assertRecord(value, "DEVOTIONAL_BLOCK_INVALID", path);
  assertNonEmptyString(
    value.id,
    "DEVOTIONAL_BLOCK_ID_INVALID",
    `${path}.id`,
  );
  assertNonEmptyString(
    value.kind,
    "DEVOTIONAL_BLOCK_KIND_INVALID",
    `${path}.kind`,
  );

  switch (value.kind) {
    case "HEADING":
      assertExactKeys(
        value,
        ["id", "kind", "level", "text"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      if (value.level !== 2 && value.level !== 3) {
        fail("DEVOTIONAL_HEADING_LEVEL_INVALID", `${path}.level`);
      }
      assertNonEmptyString(
        value.text,
        "DEVOTIONAL_HEADING_TEXT_INVALID",
        `${path}.text`,
      );
      return;

    case "PARAGRAPH":
      assertExactKeys(
        value,
        ["id", "kind", "text"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      assertNonEmptyString(
        value.text,
        "DEVOTIONAL_PARAGRAPH_TEXT_INVALID",
        `${path}.text`,
      );
      return;

    case "BIBLE_REFERENCE":
      assertExactKeys(
        value,
        ["id", "kind", "reference"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      assertBibleReference(value.reference, `${path}.reference`);
      return;

    case "SCRIPTURE_QUOTE":
      assertExactKeys(
        value,
        ["id", "kind", "reference", "sourceText"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      assertBibleReference(value.reference, `${path}.reference`);
      assertNullableNonEmptyString(
        value.sourceText,
        "DEVOTIONAL_SCRIPTURE_QUOTE_SOURCE_TEXT_INVALID",
        `${path}.sourceText`,
      );
      return;

    case "LIST":
      assertExactKeys(
        value,
        ["id", "kind", "style", "items"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      assertAllowedString(
        value.style,
        ["BULLET", "NUMBERED"],
        "DEVOTIONAL_LIST_STYLE_INVALID",
        `${path}.style`,
      );
      if (!Array.isArray(value.items) || value.items.length === 0) {
        fail("DEVOTIONAL_LIST_ITEMS_INVALID", `${path}.items`);
      }
      value.items.forEach((item, itemIndex) => {
        assertNonEmptyString(
          item,
          "DEVOTIONAL_LIST_ITEM_INVALID",
          `${path}.items[${itemIndex}]`,
        );
      });
      return;

    case "CALLOUT":
      assertExactKeys(
        value,
        ["id", "kind", "role", "text"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      assertAllowedString(
        value.role,
        ["AUTHOR_EMPHASIS", "EDITORIAL_NOTE"],
        "DEVOTIONAL_CALLOUT_ROLE_INVALID",
        `${path}.role`,
      );
      assertNonEmptyString(
        value.text,
        "DEVOTIONAL_CALLOUT_TEXT_INVALID",
        `${path}.text`,
      );
      return;

    case "REFLECTION_QUESTION":
      assertExactKeys(
        value,
        ["id", "kind", "prompt"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      assertNonEmptyString(
        value.prompt,
        "DEVOTIONAL_REFLECTION_PROMPT_INVALID",
        `${path}.prompt`,
      );
      return;

    case "PRAYER":
      assertExactKeys(
        value,
        ["id", "kind", "text"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      assertNonEmptyString(
        value.text,
        "DEVOTIONAL_PRAYER_TEXT_INVALID",
        `${path}.text`,
      );
      return;

    case "ACTION":
      assertExactKeys(
        value,
        ["id", "kind", "text"],
        "DEVOTIONAL_BLOCK_UNKNOWN_FIELD",
        path,
      );
      assertNonEmptyString(
        value.text,
        "DEVOTIONAL_ACTION_TEXT_INVALID",
        `${path}.text`,
      );
      return;

    default:
      fail("DEVOTIONAL_BLOCK_KIND_UNSUPPORTED", `${path}.kind`);
  }
}

function assertAuthor(value: unknown): void {
  const path = "author";

  assertRecord(value, "DEVOTIONAL_AUTHOR_INVALID", path);
  assertExactKeys(
    value,
    ["canonicalName", "publicProfile", "publicDisplayAuthorization"],
    "DEVOTIONAL_AUTHOR_UNKNOWN_FIELD",
    path,
  );

  assertNonEmptyString(
    value.canonicalName,
    "DEVOTIONAL_AUTHOR_CANONICAL_NAME_INVALID",
    `${path}.canonicalName`,
  );

  assertRecord(
    value.publicProfile,
    "DEVOTIONAL_AUTHOR_PUBLIC_PROFILE_INVALID",
    `${path}.publicProfile`,
  );
  assertExactKeys(
    value.publicProfile,
    ["displayName", "role", "formation", "cityState"],
    "DEVOTIONAL_AUTHOR_PUBLIC_PROFILE_UNKNOWN_FIELD",
    `${path}.publicProfile`,
  );

  assertNonEmptyString(
    value.publicProfile.displayName,
    "DEVOTIONAL_AUTHOR_DISPLAY_NAME_INVALID",
    `${path}.publicProfile.displayName`,
  );
  assertNullableNonEmptyString(
    value.publicProfile.role,
    "DEVOTIONAL_AUTHOR_ROLE_INVALID",
    `${path}.publicProfile.role`,
  );
  assertNullableNonEmptyString(
    value.publicProfile.formation,
    "DEVOTIONAL_AUTHOR_FORMATION_INVALID",
    `${path}.publicProfile.formation`,
  );
  assertNullableNonEmptyString(
    value.publicProfile.cityState,
    "DEVOTIONAL_AUTHOR_CITY_STATE_INVALID",
    `${path}.publicProfile.cityState`,
  );

  assertAllowedString(
    value.publicDisplayAuthorization,
    DEVOTIONAL_PUBLIC_DISPLAY_AUTHORIZATIONS,
    "DEVOTIONAL_AUTHOR_PUBLIC_DISPLAY_AUTHORIZATION_INVALID",
    `${path}.publicDisplayAuthorization`,
  );
}

function assertGovernance(value: unknown): void {
  const path = "governance";

  assertRecord(value, "DEVOTIONAL_GOVERNANCE_INVALID", path);
  assertExactKeys(
    value,
    [
      "editorialStatus",
      "contentReview",
      "theologicalReview",
      "publicDisplayAuthorization",
      "publicationAuthorization",
    ],
    "DEVOTIONAL_GOVERNANCE_UNKNOWN_FIELD",
    path,
  );

  assertAllowedString(
    value.editorialStatus,
    DEVOTIONAL_EDITORIAL_STATUSES,
    "DEVOTIONAL_GOVERNANCE_EDITORIAL_STATUS_INVALID",
    `${path}.editorialStatus`,
  );
  assertAllowedString(
    value.contentReview,
    DEVOTIONAL_REVIEW_STATES,
    "DEVOTIONAL_GOVERNANCE_CONTENT_REVIEW_INVALID",
    `${path}.contentReview`,
  );
  assertAllowedString(
    value.theologicalReview,
    DEVOTIONAL_REVIEW_STATES,
    "DEVOTIONAL_GOVERNANCE_THEOLOGICAL_REVIEW_INVALID",
    `${path}.theologicalReview`,
  );
  assertAllowedString(
    value.publicDisplayAuthorization,
    DEVOTIONAL_PUBLIC_DISPLAY_AUTHORIZATIONS,
    "DEVOTIONAL_GOVERNANCE_PUBLIC_DISPLAY_AUTHORIZATION_INVALID",
    `${path}.publicDisplayAuthorization`,
  );
  assertAllowedString(
    value.publicationAuthorization,
    DEVOTIONAL_PUBLICATION_AUTHORIZATIONS,
    "DEVOTIONAL_GOVERNANCE_PUBLICATION_AUTHORIZATION_INVALID",
    `${path}.publicationAuthorization`,
  );
}

function assertSource(value: unknown): void {
  const path = "source";

  assertRecord(value, "DEVOTIONAL_SOURCE_INVALID", path);
  assertExactKeys(
    value,
    [
      "sourceKind",
      "originalTitle",
      "receivedAs",
      "sourceFileName",
      "sourceSha256",
      "curatorNotes",
    ],
    "DEVOTIONAL_SOURCE_UNKNOWN_FIELD",
    path,
  );

  assertAllowedString(
    value.sourceKind,
    DEVOTIONAL_SOURCE_KINDS,
    "DEVOTIONAL_SOURCE_KIND_INVALID",
    `${path}.sourceKind`,
  );
  assertNonEmptyString(
    value.originalTitle,
    "DEVOTIONAL_SOURCE_ORIGINAL_TITLE_INVALID",
    `${path}.originalTitle`,
  );
  assertNullableNonEmptyString(
    value.receivedAs,
    "DEVOTIONAL_SOURCE_RECEIVED_AS_INVALID",
    `${path}.receivedAs`,
  );
  assertNullableNonEmptyString(
    value.sourceFileName,
    "DEVOTIONAL_SOURCE_FILE_NAME_INVALID",
    `${path}.sourceFileName`,
  );

  if (
    value.sourceSha256 !== null &&
    (typeof value.sourceSha256 !== "string" ||
      !/^[0-9a-f]{64}$/i.test(value.sourceSha256))
  ) {
    fail(
      "DEVOTIONAL_SOURCE_SHA256_INVALID",
      `${path}.sourceSha256`,
    );
  }

  if (!Array.isArray(value.curatorNotes)) {
    fail(
      "DEVOTIONAL_SOURCE_CURATOR_NOTES_INVALID",
      `${path}.curatorNotes`,
    );
  }

  value.curatorNotes.forEach((note, index) => {
    assertNonEmptyString(
      note,
      "DEVOTIONAL_SOURCE_CURATOR_NOTE_INVALID",
      `${path}.curatorNotes[${index}]`,
    );
  });
}

export function assertValidDevotionalContentPackage(
  value: unknown,
): asserts value is DevotionalContentPackage {
  assertRecord(value, "DEVOTIONAL_CONTENT_PACKAGE_INVALID", "root");
  assertExactKeys(
    value,
    [
      "id",
      "contentType",
      "format",
      "placement",
      "title",
      "subtitle",
      "summary",
      "audience",
      "author",
      "heroImage",
      "blocks",
      "bibleReferences",
      "reflectionPrompt",
      "governance",
      "source",
    ],
    "DEVOTIONAL_CONTENT_PACKAGE_UNKNOWN_FIELD",
    "root",
  );

  assertNonEmptyString(
    value.id,
    "DEVOTIONAL_ID_INVALID",
    "id",
  );

  if (value.contentType !== DEVOTIONAL_CONTENT_TYPE) {
    fail("DEVOTIONAL_CONTENT_TYPE_INVALID", "contentType");
  }

  assertAllowedString(
    value.format,
    DEVOTIONAL_FORMATS,
    "DEVOTIONAL_FORMAT_INVALID",
    "format",
  );
  assertAllowedString(
    value.placement,
    DEVOTIONAL_TRACK_PLACEMENTS,
    "DEVOTIONAL_PLACEMENT_INVALID",
    "placement",
  );

  assertNonEmptyString(
    value.title,
    "DEVOTIONAL_TITLE_INVALID",
    "title",
  );
  assertNullableNonEmptyString(
    value.subtitle,
    "DEVOTIONAL_SUBTITLE_INVALID",
    "subtitle",
  );
  assertNullableNonEmptyString(
    value.summary,
    "DEVOTIONAL_SUMMARY_INVALID",
    "summary",
  );
  assertNullableNonEmptyString(
    value.audience,
    "DEVOTIONAL_AUDIENCE_INVALID",
    "audience",
  );

  assertAuthor(value.author);

  assertNullableNonEmptyString(
    value.heroImage,
    "DEVOTIONAL_HERO_IMAGE_INVALID",
    "heroImage",
  );

  if (!Array.isArray(value.blocks) || value.blocks.length === 0) {
    fail("DEVOTIONAL_BLOCKS_REQUIRED", "blocks");
  }

  const blockIds = new Set<string>();

  value.blocks.forEach((block, index) => {
    assertBlock(block, index);

    if (blockIds.has(block.id)) {
      fail(
        "DEVOTIONAL_BLOCK_ID_DUPLICATE",
        `blocks[${index}].id`,
      );
    }

    blockIds.add(block.id);
  });

  if (!Array.isArray(value.bibleReferences)) {
    fail(
      "DEVOTIONAL_BIBLE_REFERENCES_INVALID",
      "bibleReferences",
    );
  }

  value.bibleReferences.forEach((reference, index) => {
    assertBibleReference(
      reference,
      `bibleReferences[${index}]`,
    );
  });

  assertNullableNonEmptyString(
    value.reflectionPrompt,
    "DEVOTIONAL_REFLECTION_PROMPT_INVALID",
    "reflectionPrompt",
  );

  assertGovernance(value.governance);
  assertSource(value.source);

  assertRecord(
    value.author,
    "DEVOTIONAL_AUTHOR_INVALID",
    "author",
  );
  assertRecord(
    value.governance,
    "DEVOTIONAL_GOVERNANCE_INVALID",
    "governance",
  );

  if (
    value.author.publicDisplayAuthorization !==
    value.governance.publicDisplayAuthorization
  ) {
    fail(
      "DEVOTIONAL_PUBLIC_DISPLAY_AUTHORIZATION_MISMATCH",
      "governance.publicDisplayAuthorization",
    );
  }
}

export function validateDevotionalContentPackage(
  value: unknown,
): DevotionalContentPackage {
  assertValidDevotionalContentPackage(value);
  return value;
}
