/**
 * Deterministic normalizer for the parsed Harpa primary-source corpus.
 *
 * This module performs in-memory transformation only. It does not read or
 * write files, use the secondary source text, persist SQLite, generate a seed,
 * or create a normalized artifact on disk.
 */

import {
  REQUIRED_HYMN_COUNT,
} from "../../domain/hymnal/hymnalContracts";

import type {
  NormalizedHymnRecord,
  NormalizedHymnSectionRecord,
} from "../import/hymnalImportContract";

import {
  HARPA_JORNADA_EDITION_ID,
} from "../import/harpaSourceArtifactLocks";

import {
  HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
  HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT,
  HARPA_PRIMARY_SOURCE_SPECIAL_CASE_NUMBER,
} from "../import/harpaPrimarySourceParser";

import type {
  HarpaPrimarySourceHymn,
  ParsedHarpaPrimarySource,
} from "../import/harpaPrimarySourceParser";

import {
  HARPA_H403_STRUCTURAL_RECLASSIFICATION,
  HARPA_NORMALIZATION_POLICY,
  HARPA_TARGET_EXCLUDED_RAW_NUMBERS,
} from "./harpaNormalizationPolicy";

export const HARPA_CORPUS_NORMALIZER_VERSION =
  1 as const;

export const HARPA_TEXT_CANONICALIZATION_RULES =
  Object.freeze({
    markupToken:
      HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
    markupReplacement:
      "\n",
    trimEachLine:
      true,
    normalizeUnicode:
      false,
    decodeHtmlEntities:
      false,
    sanitizeControlCharacters:
      false,
    collapseEmptyLines:
      false,
  });

function fail(
  code: string,
  detail: string,
): never {
  throw new Error(
    `HARPA_CORPUS_NORMALIZER_${code}:${detail}`,
  );
}

function sameNumberSequence(
  actual: readonly number[],
  expected: readonly number[],
): boolean {
  return (
    actual.length === expected.length &&
    actual.every(
      (value, index) =>
        value === expected[index],
    )
  );
}

function normalizeLines(
  value: string,
  allowEmpty: boolean,
  field: string,
): readonly string[] {
  if (value.length === 0) {
    if (allowEmpty) {
      return [];
    }

    fail(
      "EMPTY_REQUIRED_TEXT",
      field,
    );
  }

  const lines =
    value
      .split(
        HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
      )
      .map(
        (line) =>
          line.trim(),
      );

  if (
    lines.some(
      (line) =>
        line.length === 0,
    )
  ) {
    fail(
      "EMPTY_NORMALIZED_LINE",
      field,
    );
  }

  return lines;
}

function joinLines(
  lines: readonly string[],
  field: string,
): string {
  if (lines.length === 0) {
    fail(
      "EMPTY_SECTION_LINES",
      field,
    );
  }

  return lines.join(
    "\n",
  );
}

function appendSection(
  sections: NormalizedHymnSectionRecord[],
  kind:
    NormalizedHymnSectionRecord["kind"],
  label: string,
  lines: readonly string[],
  field: string,
): void {
  sections.push({
    order:
      sections.length + 1,
    kind,
    label,
    text:
      joinLines(
        lines,
        field,
      ),
  });
}

function asNonEmptySections(
  sections:
    NormalizedHymnSectionRecord[],
): readonly [
  NormalizedHymnSectionRecord,
  ...NormalizedHymnSectionRecord[],
] {
  if (sections.length === 0) {
    fail(
      "NO_SECTIONS",
      "hymn",
    );
  }

  return sections as [
    NormalizedHymnSectionRecord,
    ...NormalizedHymnSectionRecord[],
  ];
}

function assertGovernedPolicy(): void {
  if (
    HARPA_NORMALIZATION_POLICY
      .rawSourceHymnCount !==
    HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT
  ) {
    fail(
      "POLICY_RAW_COUNT_MISMATCH",
      String(
        HARPA_NORMALIZATION_POLICY
          .rawSourceHymnCount,
      ),
    );
  }

  if (
    HARPA_NORMALIZATION_POLICY
      .targetHymnCount !==
    REQUIRED_HYMN_COUNT
  ) {
    fail(
      "POLICY_TARGET_COUNT_MISMATCH",
      String(
        HARPA_NORMALIZATION_POLICY
          .targetHymnCount,
      ),
    );
  }

  if (
    !sameNumberSequence(
      HARPA_TARGET_EXCLUDED_RAW_NUMBERS,
      [
        637,
        638,
        639,
        640,
      ],
    )
  ) {
    fail(
      "POLICY_EXCLUSION_MISMATCH",
      HARPA_TARGET_EXCLUDED_RAW_NUMBERS.join(
        ",",
      ),
    );
  }

  if (
    HARPA_H403_STRUCTURAL_RECLASSIFICATION
      .hymnNumber !==
    HARPA_PRIMARY_SOURCE_SPECIAL_CASE_NUMBER
  ) {
    fail(
      "H403_POLICY_NUMBER_MISMATCH",
      String(
        HARPA_H403_STRUCTURAL_RECLASSIFICATION
          .hymnNumber,
      ),
    );
  }

  if (
    HARPA_H403_STRUCTURAL_RECLASSIFICATION
      .repairKind !==
    "PRIMARY_SOURCE_STRUCTURAL_RECLASSIFICATION"
  ) {
    fail(
      "H403_POLICY_REPAIR_KIND_MISMATCH",
      HARPA_H403_STRUCTURAL_RECLASSIFICATION
        .repairKind,
    );
  }

  if (
    HARPA_H403_STRUCTURAL_RECLASSIFICATION
      .primaryTextPreserved !==
    true ||
    HARPA_H403_STRUCTURAL_RECLASSIFICATION
      .externalTextInsertion !==
    false
  ) {
    fail(
      "H403_POLICY_TEXT_ORIGIN_MISMATCH",
      "403",
    );
  }

  const governedSections =
    HARPA_H403_STRUCTURAL_RECLASSIFICATION
      .sections;

  if (
    governedSections.length !== 4 ||
    governedSections[0].targetOrder !== 1 ||
    governedSections[0].targetKind !== "VERSE" ||
    governedSections[0].source.field !== "verses" ||
    governedSections[0].source.key !== "1" ||
    governedSections[1].targetOrder !== 2 ||
    governedSections[1].targetKind !== "CHORUS" ||
    governedSections[1].source.field !== "coro" ||
    governedSections[1].source
      .lineRangeInclusive[0] !== 1 ||
    governedSections[1].source
      .lineRangeInclusive[1] !== 4 ||
    governedSections[2].targetOrder !== 3 ||
    governedSections[2].targetKind !== "VERSE" ||
    governedSections[2].source.field !== "coro" ||
    governedSections[2].source
      .lineRangeInclusive[0] !== 5 ||
    governedSections[2].source
      .lineRangeInclusive[1] !== 8 ||
    governedSections[3].targetOrder !== 4 ||
    governedSections[3].targetKind !== "VERSE" ||
    governedSections[3].source.field !== "verses" ||
    governedSections[3].source.key !== "3"
  ) {
    fail(
      "H403_POLICY_STRUCTURE_MISMATCH",
      "403",
    );
  }
}

function createBaseIdentity(
  hymn: HarpaPrimarySourceHymn,
): Readonly<{
  editionId:
    typeof HARPA_JORNADA_EDITION_ID;
  id: string;
  number: number;
  title: string;
}> {
  return {
    editionId:
      HARPA_JORNADA_EDITION_ID,
    id:
      `${HARPA_JORNADA_EDITION_ID}:${hymn.number}`,
    number:
      hymn.number,
    title:
      hymn.title,
  };
}

function normalizeOrdinaryHymn(
  hymn: HarpaPrimarySourceHymn,
): NormalizedHymnRecord {
  const verseKeys =
    Object.keys(
      hymn.verses,
    )
      .map(
        (key) =>
          Number(key),
      )
      .sort(
        (left, right) =>
          left - right,
      );

  if (
    verseKeys.length === 0 ||
    verseKeys[0] !== 1
  ) {
    fail(
      "ORDINARY_VERSE1_MISSING",
      String(
        hymn.number,
      ),
    );
  }

  const verse1Raw =
    hymn.verses["1"];

  if (
    typeof verse1Raw !== "string"
  ) {
    fail(
      "ORDINARY_VERSE1_INVALID",
      String(
        hymn.number,
      ),
    );
  }

  const verse1Lines =
    normalizeLines(
      verse1Raw,
      false,
      `${hymn.number}.verses.1`,
    );

  const firstLine =
    verse1Lines[0];

  if (
    typeof firstLine !== "string" ||
    firstLine.length === 0
  ) {
    fail(
      "FIRST_LINE_MISSING",
      String(
        hymn.number,
      ),
    );
  }

  const sections:
    NormalizedHymnSectionRecord[] = [];

  appendSection(
    sections,
    "VERSE",
    "1",
    verse1Lines,
    `${hymn.number}.verse.1`,
  );

  const chorusLines =
    normalizeLines(
      hymn.coro,
      true,
      `${hymn.number}.coro`,
    );

  if (
    chorusLines.length > 0
  ) {
    appendSection(
      sections,
      "CHORUS",
      "Coro",
      chorusLines,
      `${hymn.number}.coro`,
    );
  }

  for (
    const verseNumber of
    verseKeys.slice(1)
  ) {
    const verseKey =
      String(
        verseNumber,
      );

    const verseRaw =
      hymn.verses[
        verseKey
      ];

    if (
      typeof verseRaw !== "string"
    ) {
      fail(
        "ORDINARY_VERSE_INVALID",
        `${hymn.number}:${verseKey}`,
      );
    }

    const verseLines =
      normalizeLines(
        verseRaw,
        false,
        `${hymn.number}.verses.${verseKey}`,
      );

    appendSection(
      sections,
      "VERSE",
      verseKey,
      verseLines,
      `${hymn.number}.verse.${verseKey}`,
    );
  }

  return {
    ...createBaseIdentity(
      hymn,
    ),
    firstLine,
    sections:
      asNonEmptySections(
        sections,
      ),
  };
}

function normalizeH403(
  hymn: HarpaPrimarySourceHymn,
): NormalizedHymnRecord {
  const verseKeys =
    Object.keys(
      hymn.verses,
    ).sort(
      (left, right) =>
        Number(left) -
        Number(right),
    );

  if (
    verseKeys.length !== 2 ||
    verseKeys[0] !== "1" ||
    verseKeys[1] !== "3"
  ) {
    fail(
      "H403_VERSE_KEYS_CHANGED",
      verseKeys.join(
        ",",
      ),
    );
  }

  const verse1Raw =
    hymn.verses["1"];

  const verse3Raw =
    hymn.verses["3"];

  if (
    typeof verse1Raw !== "string" ||
    typeof verse3Raw !== "string"
  ) {
    fail(
      "H403_REQUIRED_VERSE_INVALID",
      "403",
    );
  }

  const verse1Lines =
    normalizeLines(
      verse1Raw,
      false,
      "403.verses.1",
    );

  const coroLines =
    normalizeLines(
      hymn.coro,
      false,
      "403.coro",
    );

  const verse3Lines =
    normalizeLines(
      verse3Raw,
      false,
      "403.verses.3",
    );

  if (
    verse1Lines.length !== 4
  ) {
    fail(
      "H403_VERSE1_LINE_COUNT",
      String(
        verse1Lines.length,
      ),
    );
  }

  if (
    coroLines.length !== 8
  ) {
    fail(
      "H403_CORO_LINE_COUNT",
      String(
        coroLines.length,
      ),
    );
  }

  if (
    verse3Lines.length !== 4
  ) {
    fail(
      "H403_VERSE3_LINE_COUNT",
      String(
        verse3Lines.length,
      ),
    );
  }

  const firstLine =
    verse1Lines[0];

  if (
    typeof firstLine !== "string" ||
    firstLine.length === 0
  ) {
    fail(
      "H403_FIRST_LINE_MISSING",
      "403",
    );
  }

  const chorusLines =
    coroLines.slice(
      0,
      4,
    );

  const verse2Lines =
    coroLines.slice(
      4,
      8,
    );

  const sections:
    NormalizedHymnSectionRecord[] = [];

  appendSection(
    sections,
    "VERSE",
    "1",
    verse1Lines,
    "403.verse.1",
  );

  appendSection(
    sections,
    "CHORUS",
    "Coro",
    chorusLines,
    "403.coro",
  );

  appendSection(
    sections,
    "VERSE",
    "2",
    verse2Lines,
    "403.verse.2",
  );

  appendSection(
    sections,
    "VERSE",
    "3",
    verse3Lines,
    "403.verse.3",
  );

  return {
    ...createBaseIdentity(
      hymn,
    ),
    firstLine,
    sections:
      asNonEmptySections(
        sections,
      ),
  };
}

function assertParsedCorpusShape(
  parsed:
    ParsedHarpaPrimarySource,
): ReadonlyMap<
  number,
  HarpaPrimarySourceHymn
> {
  if (
    parsed.kind !==
    "HARPA_PRIMARY_SOURCE_PARSED_V1"
  ) {
    fail(
      "INVALID_PARSED_SOURCE_KIND",
      String(
        parsed.kind,
      ),
    );
  }

  if (
    parsed.hymns.length !==
    HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT
  ) {
    fail(
      "INVALID_PARSED_RAW_COUNT",
      String(
        parsed.hymns.length,
      ),
    );
  }

  const byNumber =
    new Map<
      number,
      HarpaPrimarySourceHymn
    >();

  for (
    const hymn of
    parsed.hymns
  ) {
    if (
      !Number.isInteger(
        hymn.number,
      ) ||
      hymn.number < 1 ||
      hymn.number >
        HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT
    ) {
      fail(
        "INVALID_PARSED_NUMBER",
        String(
          hymn.number,
        ),
      );
    }

    if (
      byNumber.has(
        hymn.number,
      )
    ) {
      fail(
        "DUPLICATE_PARSED_NUMBER",
        String(
          hymn.number,
        ),
      );
    }

    byNumber.set(
      hymn.number,
      hymn,
    );
  }

  for (
    let number = 1;
    number <=
    HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT;
    number++
  ) {
    if (
      !byNumber.has(
        number,
      )
    ) {
      fail(
        "MISSING_PARSED_NUMBER",
        String(
          number,
        ),
      );
    }
  }

  return byNumber;
}

function assertNormalizedCorpus(
  records:
    readonly NormalizedHymnRecord[],
): void {
  if (
    records.length !==
    REQUIRED_HYMN_COUNT
  ) {
    fail(
      "INVALID_NORMALIZED_COUNT",
      String(
        records.length,
      ),
    );
  }

  const ids =
    new Set<string>();

  const numbers =
    new Set<number>();

  records.forEach(
    (
      record,
      index,
    ) => {
      const expectedNumber =
        index + 1;

      if (
        record.number !==
        expectedNumber
      ) {
        fail(
          "NORMALIZED_NUMBER_SEQUENCE",
          `${record.number}:${expectedNumber}`,
        );
      }

      const expectedId =
        `${HARPA_JORNADA_EDITION_ID}:${record.number}`;

      if (
        record.id !==
        expectedId
      ) {
        fail(
          "NORMALIZED_ID_MISMATCH",
          record.id,
        );
      }

      if (
        record.editionId !==
        HARPA_JORNADA_EDITION_ID
      ) {
        fail(
          "NORMALIZED_EDITION_MISMATCH",
          record.id,
        );
      }

      if (
        record.title.length === 0 ||
        record.title !==
          record.title.trim()
      ) {
        fail(
          "NORMALIZED_TITLE_INVALID",
          record.id,
        );
      }

      if (
        record.firstLine === null ||
        record.firstLine.length === 0 ||
        record.firstLine.includes(
          "\n",
        )
      ) {
        fail(
          "NORMALIZED_FIRST_LINE_INVALID",
          record.id,
        );
      }

      if (
        ids.has(
          record.id,
        )
      ) {
        fail(
          "DUPLICATE_NORMALIZED_ID",
          record.id,
        );
      }

      if (
        numbers.has(
          record.number,
        )
      ) {
        fail(
          "DUPLICATE_NORMALIZED_NUMBER",
          String(
            record.number,
          ),
        );
      }

      ids.add(
        record.id,
      );

      numbers.add(
        record.number,
      );

      if (
        record.sections.length === 0
      ) {
        fail(
          "NORMALIZED_NO_SECTIONS",
          record.id,
        );
      }

      record.sections.forEach(
        (
          section,
          sectionIndex,
        ) => {
          if (
            section.order !==
            sectionIndex + 1
          ) {
            fail(
              "NORMALIZED_SECTION_ORDER",
              `${record.id}:${section.order}`,
            );
          }

          if (
            section.kind !== "VERSE" &&
            section.kind !== "CHORUS"
          ) {
            fail(
              "NORMALIZED_SECTION_KIND",
              `${record.id}:${section.kind}`,
            );
          }

          if (
            section.label === null ||
            section.label.length === 0
          ) {
            fail(
              "NORMALIZED_SECTION_LABEL",
              `${record.id}:${section.order}`,
            );
          }

          if (
            section.text.length === 0 ||
            section.text !==
              section.text.trim()
          ) {
            fail(
              "NORMALIZED_SECTION_TEXT",
              `${record.id}:${section.order}`,
            );
          }

          if (
            section.text.includes(
              HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
            ) ||
            section.text.includes(
              "\r",
            )
          ) {
            fail(
              "NORMALIZED_MARKUP_OR_CR_REMAINS",
              `${record.id}:${section.order}`,
            );
          }
        },
      );
    },
  );

  if (
    ids.size !==
    REQUIRED_HYMN_COUNT ||
    numbers.size !==
    REQUIRED_HYMN_COUNT
  ) {
    fail(
      "NORMALIZED_IDENTITY_CARDINALITY",
      `${ids.size}:${numbers.size}`,
    );
  }
}

export function normalizeHarpaCorpus(
  parsed:
    ParsedHarpaPrimarySource,
): readonly NormalizedHymnRecord[] {
  assertGovernedPolicy();

  const sourceByNumber =
    assertParsedCorpusShape(
      parsed,
    );

  const normalized:
    NormalizedHymnRecord[] = [];

  for (
    let number = 1;
    number <=
    REQUIRED_HYMN_COUNT;
    number++
  ) {
    const hymn =
      sourceByNumber.get(
        number,
      );

    if (!hymn) {
      fail(
        "TARGET_HYMN_MISSING",
        String(
          number,
        ),
      );
    }

    normalized.push(
      number ===
      HARPA_PRIMARY_SOURCE_SPECIAL_CASE_NUMBER
        ? normalizeH403(
            hymn,
          )
        : normalizeOrdinaryHymn(
            hymn,
          ),
    );
  }

  assertNormalizedCorpus(
    normalized,
  );

  return normalized;
}