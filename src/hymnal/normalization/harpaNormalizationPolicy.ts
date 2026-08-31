/**
 * Governed normalization policy for the Harpa corpus pipeline.
 *
 * This module contains declarative rules only. It does not parse, normalize,
 * ingest, write SQLite, generate a seed, or copy source text.
 */

import {
  REQUIRED_HYMN_COUNT,
} from "../../domain/hymnal/hymnalContracts";

export const HARPA_RAW_SOURCE_HYMN_COUNT =
  640 as const;

export const HARPA_TARGET_EXCLUDED_RAW_NUMBERS = [
  637,
  638,
  639,
  640,
] as const;

export const HARPA_H403_STRUCTURAL_RECLASSIFICATION = {
  hymnNumber: 403,
  repairKind:
    "PRIMARY_SOURCE_STRUCTURAL_RECLASSIFICATION",
  primaryTextPreserved: true,
  externalTextInsertion: false,
  sections: [
    {
      targetOrder: 1,
      targetKind: "VERSE",
      source: {
        field: "verses",
        key: "1",
      },
    },
    {
      targetOrder: 2,
      targetKind: "CHORUS",
      source: {
        field: "coro",
        lineRangeInclusive: [
          1,
          4,
        ],
      },
    },
    {
      targetOrder: 3,
      targetKind: "VERSE",
      source: {
        field: "coro",
        lineRangeInclusive: [
          5,
          8,
        ],
      },
    },
    {
      targetOrder: 4,
      targetKind: "VERSE",
      source: {
        field: "verses",
        key: "3",
      },
    },
  ],
} as const;

export const HARPA_NORMALIZATION_POLICY = {
  policyVersion: 1,
  rawSourceHymnCount:
    HARPA_RAW_SOURCE_HYMN_COUNT,
  targetHymnCount:
    REQUIRED_HYMN_COUNT,
  targetExclusionStrategy:
    "EXCLUDE_RAW_NUMBERS_EXACTLY",
  excludedRawNumbers:
    HARPA_TARGET_EXCLUDED_RAW_NUMBERS,
  primarySourceTextPriority:
    "AUTHORITATIVE_FOR_PIPELINE_V1",
  secondarySourceRole:
    "SCOPED_STRUCTURAL_CORROBORATION",
  secondaryTextIngestionAllowed: false,
  rawPrimaryMutationAllowed: false,
  rawSecondaryMutationAllowed: false,
  specialCases: [
    HARPA_H403_STRUCTURAL_RECLASSIFICATION,
  ],
} as const;