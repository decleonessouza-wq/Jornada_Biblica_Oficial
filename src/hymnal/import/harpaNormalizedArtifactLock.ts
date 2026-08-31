/**
 * Concrete lock for the governed Harpa normalized corpus artifact.
 *
 * This module binds the persisted normalized bytes to the already-qualified
 * primary source while preserving the source artifact provenance required by
 * the hymnal import contract.
 */

import {
  HYMNAL_IMPORTER_CONTRACT_VERSION,
  type HymnalNormalizedArtifactLock,
} from "./hymnalImportContract";

import {
  HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK,
} from "./harpaSourceArtifactLocks";

export const HARPA_NORMALIZED_ARTIFACT_SCHEMA =
  "HARPA_NORMALIZED_CORPUS_V1" as const;

export const HARPA_NORMALIZED_ARTIFACT_PATH =
  "src/hymnal/corpus/harpa-crista-jornada-v1.normalized.json" as const;

export const HARPA_NORMALIZED_ARTIFACT_RECORD_COUNT =
  636 as const;

export const HARPA_NORMALIZED_ARTIFACT_BYTE_LENGTH =
  629665 as const;

export const HARPA_NORMALIZED_ARTIFACT_SHA256 =
  "9008fe52549072268389576785b2f593f9471c4d192a4b3f578ed395390215f5" as const;

export const HARPA_NORMALIZED_CORPUS_SHA256 =
  HARPA_NORMALIZED_ARTIFACT_SHA256;

export const HARPA_NORMALIZED_STRUCTURE_SHA256 =
  "2683482bf146fb16d9a399e926af10aab3f3f814eb05108bc0d1718f7a6438bc" as const;

export const HARPA_NORMALIZED_IDENTITY_MANIFEST_SHA256 =
  "96e6da137fe98acdae9fb15575c2f80befc45867e3f06f7b60b977ea152871bc" as const;

export const HARPA_NORMALIZED_ARTIFACT_SERIALIZER =
  "JSON.stringify(normalized)" as const;

export const HARPA_NORMALIZED_ARTIFACT_ENCODING =
  "UTF8_NO_BOM" as const;

export const HARPA_NORMALIZED_ARTIFACT_PRETTY_PRINT =
  false as const;

export const HARPA_NORMALIZED_ARTIFACT_FINAL_NEWLINE =
  false as const;

export const HARPA_NORMALIZED_ARTIFACT_PHYSICAL_LINE_BREAK_COUNT =
  0 as const;

export const HARPA_NORMALIZED_ARTIFACT_NORMALIZER_VERSION =
  1 as const;

export const HARPA_NORMALIZED_ARTIFACT_SECONDARY_TEXT_ALLOWED =
  false as const;

export const HARPA_NORMALIZED_ARTIFACT_LOCK = {
  ...HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK,
  normalizedSha256:
    HARPA_NORMALIZED_ARTIFACT_SHA256,
  importerVersion:
    HYMNAL_IMPORTER_CONTRACT_VERSION,
} as const satisfies HymnalNormalizedArtifactLock;