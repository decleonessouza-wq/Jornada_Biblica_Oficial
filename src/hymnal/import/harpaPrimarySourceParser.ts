/**
 * Deterministic, fail-closed parser for the locked Harpa JSON source shape.
 *
 * This module operates on an in-memory JSON string only. It performs no file
 * I/O, network access, persistence, normalization, SQLite work, or source
 * mutation.
 */

export const HARPA_PRIMARY_SOURCE_PARSER_VERSION =
  1 as const;

export const HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT =
  640 as const;

export const HARPA_PRIMARY_SOURCE_ROOT_METADATA_KEY =
  "-1" as const;

export const HARPA_PRIMARY_SOURCE_SPECIAL_CASE_NUMBER =
  403 as const;

export const HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN =
  "<br>" as const;

export type HarpaPrimarySourceHymn = Readonly<{
  number: number;
  title: string;
  coro: string;
  verses: Readonly<Record<string, string>>;
}>;

export type ParsedHarpaPrimarySource = Readonly<{
  kind: "HARPA_PRIMARY_SOURCE_PARSED_V1";
  hymns: readonly HarpaPrimarySourceHymn[];
}>;

type JsonObject = Record<string, unknown>;

const EXPECTED_RECORD_FIELDS = [
  "coro",
  "hino",
  "verses",
] as const;

const HTML_ENTITY_PATTERN =
  /&(?:#[0-9]+|#x[0-9A-Fa-f]+|[A-Za-z][A-Za-z0-9]+);/;

const CONTROL_CHARACTER_PATTERN =
  /[\u0000-\u001F\u007F-\u009F]/;

const DISALLOWED_WHITESPACE_OR_FORMAT_PATTERN =
  /[\u00A0\u200B\u200C\u200D\uFEFF]/;

function fail(
  code: string,
  detail: string,
): never {
  throw new Error(
    `HARPA_PRIMARY_SOURCE_${code}:${detail}`,
  );
}

function isJsonObject(
  value: unknown,
): value is JsonObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function hasOwn(
  value: JsonObject,
  key: string,
): boolean {
  return Object.prototype.hasOwnProperty.call(
    value,
    key,
  );
}

function sameStringSequence(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return (
    actual.length === expected.length &&
    actual.every(
      (value, index) =>
        value === expected[index],
    )
  );
}

function assertQualifiedText(
  value: unknown,
  field: string,
  options: Readonly<{
    allowEmpty: boolean;
    allowBr: boolean;
  }>,
): string {
  if (typeof value !== "string") {
    fail(
      "INVALID_TEXT_TYPE",
      field,
    );
  }

  if (
    !options.allowEmpty &&
    value.trim().length === 0
  ) {
    fail(
      "EMPTY_TEXT",
      field,
    );
  }

  if (
    value.length > 0 &&
    value !== value.trim()
  ) {
    fail(
      "OUTER_WHITESPACE",
      field,
    );
  }

  if (
    value.normalize("NFC") !== value
  ) {
    fail(
      "NON_NFC_TEXT",
      field,
    );
  }

  if (
    CONTROL_CHARACTER_PATTERN.test(
      value,
    )
  ) {
    fail(
      "CONTROL_CHARACTER",
      field,
    );
  }

  if (
    DISALLOWED_WHITESPACE_OR_FORMAT_PATTERN.test(
      value,
    )
  ) {
    fail(
      "DISALLOWED_WHITESPACE_OR_FORMAT",
      field,
    );
  }

  if (
    HTML_ENTITY_PATTERN.test(
      value,
    )
  ) {
    fail(
      "HTML_ENTITY",
      field,
    );
  }

  const tagMatches =
    value.match(/<[^>]+>/g) ?? [];

  if (
    tagMatches.some(
      (tag) =>
        tag !==
        HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
    )
  ) {
    fail(
      "UNSUPPORTED_MARKUP",
      field,
    );
  }

  const withoutAllowedMarkup =
    value
      .split(
        HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
      )
      .join("");

  if (
    withoutAllowedMarkup.includes("<") ||
    withoutAllowedMarkup.includes(">")
  ) {
    fail(
      "MALFORMED_OR_UNSUPPORTED_MARKUP",
      field,
    );
  }

  if (
    !options.allowBr &&
    value.includes(
      HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
    )
  ) {
    fail(
      "MARKUP_NOT_ALLOWED_IN_FIELD",
      field,
    );
  }

  if (
    options.allowBr &&
    value.length > 0
  ) {
    const segments =
      value.split(
        HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
      );

    if (
      segments.some(
        (segment) =>
          segment.trim().length === 0,
      )
    ) {
      fail(
        "EMPTY_TEXT_SEGMENT",
        field,
      );
    }
  }

  return value;
}

function countQualifiedSegments(
  value: string,
): number {
  if (value.length === 0) {
    return 0;
  }

  return value.split(
    HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
  ).length;
}

function parseHymnRecord(
  number: number,
  rawRecord: unknown,
): HarpaPrimarySourceHymn {
  if (!isJsonObject(rawRecord)) {
    fail(
      "INVALID_HYMN_RECORD",
      String(number),
    );
  }

  const actualFields =
    Object.keys(
      rawRecord,
    ).sort();

  const expectedFields =
    [...EXPECTED_RECORD_FIELDS].sort();

  if (
    !sameStringSequence(
      actualFields,
      expectedFields,
    )
  ) {
    fail(
      "INVALID_RECORD_FIELDS",
      `${number}:${actualFields.join(",")}`,
    );
  }

  const hino =
    assertQualifiedText(
      rawRecord.hino,
      `${number}.hino`,
      {
        allowEmpty: false,
        allowBr: false,
      },
    );

  const titleMatch =
    /^\s*(\d+)\s*-\s*(.+?)\s*$/.exec(
      hino,
    );

  if (!titleMatch) {
    fail(
      "INVALID_TITLE_FORMAT",
      String(number),
    );
  }

  const embeddedNumber =
    Number(
      titleMatch[1],
    );

  if (embeddedNumber !== number) {
    fail(
      "TITLE_NUMBER_MISMATCH",
      `${number}:${embeddedNumber}`,
    );
  }

  const title =
    (
      titleMatch[2] ?? ""
    ).trim();

  if (title.length === 0) {
    fail(
      "EMPTY_TITLE",
      String(number),
    );
  }

  const coro =
    assertQualifiedText(
      rawRecord.coro,
      `${number}.coro`,
      {
        allowEmpty: true,
        allowBr: true,
      },
    );

  if (
    !isJsonObject(
      rawRecord.verses,
    )
  ) {
    fail(
      "INVALID_VERSES_OBJECT",
      String(number),
    );
  }

  const rawVerses =
    rawRecord.verses;

  const unsortedVerseKeys =
    Object.keys(
      rawVerses,
    );

  if (
    unsortedVerseKeys.length < 1 ||
    unsortedVerseKeys.length > 8
  ) {
    fail(
      "INVALID_VERSE_COUNT",
      `${number}:${unsortedVerseKeys.length}`,
    );
  }

  for (
    const key of
    unsortedVerseKeys
  ) {
    if (
      !/^[1-9]\d*$/.test(
        key,
      )
    ) {
      fail(
        "INVALID_VERSE_KEY",
        `${number}:${key}`,
      );
    }
  }

  const verseKeys =
    [...unsortedVerseKeys].sort(
      (left, right) =>
        Number(left) -
        Number(right),
    );

  const expectedVerseKeys =
    number ===
    HARPA_PRIMARY_SOURCE_SPECIAL_CASE_NUMBER
      ? [
          "1",
          "3",
        ]
      : Array.from(
          {
            length:
              verseKeys.length,
          },
          (_, index) =>
            String(
              index + 1,
            ),
        );

  if (
    !sameStringSequence(
      verseKeys,
      expectedVerseKeys,
    )
  ) {
    fail(
      "NONCONTIGUOUS_VERSE_KEYS",
      `${number}:${verseKeys.join(",")}`,
    );
  }

  const verses:
    Record<string, string> = {};

  for (
    const key of
    verseKeys
  ) {
    verses[key] =
      assertQualifiedText(
        rawVerses[key],
        `${number}.verses.${key}`,
        {
          allowEmpty: false,
          allowBr: true,
        },
      );
  }

  if (
    number ===
    HARPA_PRIMARY_SOURCE_SPECIAL_CASE_NUMBER
  ) {
    const verse1 =
      verses["1"];

    const verse3 =
      verses["3"];

    if (
      typeof verse1 !== "string" ||
      typeof verse3 !== "string"
    ) {
      fail(
        "H403_REQUIRED_VERSE_MISSING",
        String(number),
      );
    }

    if (
      countQualifiedSegments(
        verse1,
      ) !== 4
    ) {
      fail(
        "H403_VERSE1_LINE_COUNT",
        String(
          countQualifiedSegments(
            verse1,
          ),
        ),
      );
    }

    if (
      countQualifiedSegments(
        coro,
      ) !== 8
    ) {
      fail(
        "H403_CORO_LINE_COUNT",
        String(
          countQualifiedSegments(
            coro,
          ),
        ),
      );
    }

    if (
      countQualifiedSegments(
        verse3,
      ) !== 4
    ) {
      fail(
        "H403_VERSE3_LINE_COUNT",
        String(
          countQualifiedSegments(
            verse3,
          ),
        ),
      );
    }
  }

  return {
    number,
    title,
    coro,
    verses,
  };
}

export function parseHarpaPrimarySourceJson(
  rawJson: string,
): ParsedHarpaPrimarySource {
  if (
    typeof rawJson !== "string" ||
    rawJson.length === 0
  ) {
    fail(
      "EMPTY_JSON_INPUT",
      "root",
    );
  }

  let parsed:
    unknown;

  try {
    parsed =
      JSON.parse(
        rawJson,
      ) as unknown;
  }
  catch {
    fail(
      "INVALID_JSON",
      "root",
    );
  }

  if (!isJsonObject(parsed)) {
    fail(
      "ROOT_NOT_OBJECT",
      "root",
    );
  }

  const root =
    parsed;

  const expectedRootKeys =
    new Set<string>([
      HARPA_PRIMARY_SOURCE_ROOT_METADATA_KEY,
      ...Array.from(
        {
          length:
            HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT,
        },
        (_, index) =>
          String(
            index + 1,
          ),
      ),
    ]);

  const actualRootKeys =
    Object.keys(
      root,
    );

  const missingRootKeys =
    [...expectedRootKeys].filter(
      (key) =>
        !hasOwn(
          root,
          key,
        ),
    );

  const unexpectedRootKeys =
    actualRootKeys.filter(
      (key) =>
        !expectedRootKeys.has(
          key,
        ),
    );

  if (
    missingRootKeys.length > 0
  ) {
    fail(
      "MISSING_ROOT_KEYS",
      missingRootKeys.join(","),
    );
  }

  if (
    unexpectedRootKeys.length > 0
  ) {
    fail(
      "UNEXPECTED_ROOT_KEYS",
      unexpectedRootKeys.join(","),
    );
  }

  if (
    actualRootKeys.length !==
    HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT +
      1
  ) {
    fail(
      "INVALID_ROOT_KEY_COUNT",
      String(
        actualRootKeys.length,
      ),
    );
  }

  const hymns:
    HarpaPrimarySourceHymn[] = [];

  for (
    let number = 1;
    number <=
    HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT;
    number++
  ) {
    hymns.push(
      parseHymnRecord(
        number,
        root[
          String(
            number,
          )
        ],
      ),
    );
  }

  if (
    hymns.length !==
    HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT
  ) {
    fail(
      "INVALID_PARSED_HYMN_COUNT",
      String(
        hymns.length,
      ),
    );
  }

  return {
    kind:
      "HARPA_PRIMARY_SOURCE_PARSED_V1",
    hymns,
  };
}