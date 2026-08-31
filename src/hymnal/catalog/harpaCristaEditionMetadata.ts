/**
 * Stable product metadata for the Harpa Crista Jornada v1 edition.
 *
 * Authority separation:
 * - technical identity and expected corpus size belong to the domain/corpus;
 * - rights state follows docs/legal/harpa/harpa-rights-manifest.md;
 * - artifact provenance and hashes remain in source/normalized locks;
 * - these values do not fabricate external legal evidence.
 *
 * Internal product decisions:
 * - code = HCJ1;
 * - displayName = Harpa Crista with U+00E3 in the final word;
 * - languageTag = pt-BR.
 *
 * Unknown fields remain explicit:
 * - publicationYear = null;
 * - rightsIdentifier = null.
 *
 * attributionRequired=true is a conservative product policy while external
 * formalization remains pending. It does not claim that an external legal
 * attribution duty has already been proven.
 */

import type {
  HymnalEditionMetadata,
} from "../../domain/hymnal/hymnalEdition";

export const HARPA_CRISTA_JORNADA_METADATA_VERSION =
  1 as const;

export const HARPA_CRISTA_JORNADA_EDITION_ID =
  "harpa-crista-jornada-v1" as const;

export const HARPA_CRISTA_JORNADA_EDITION_CODE =
  "HCJ1" as const;

export const HARPA_CRISTA_JORNADA_DISPLAY_NAME =
  "Harpa Crist\u00e3" as const;

export const HARPA_CRISTA_JORNADA_LANGUAGE_TAG =
  "pt-BR" as const;

export const HARPA_CRISTA_JORNADA_ATTRIBUTION_POLICY =
  "CONSERVATIVE_ATTRIBUTION_UNTIL_FORMALIZATION" as const;

export const HARPA_CRISTA_JORNADA_EDITION_METADATA = {
  id: HARPA_CRISTA_JORNADA_EDITION_ID,
  code: HARPA_CRISTA_JORNADA_EDITION_CODE,
  displayName:
    HARPA_CRISTA_JORNADA_DISPLAY_NAME,
  languageTag:
    HARPA_CRISTA_JORNADA_LANGUAGE_TAG,
  publicationYear: null,
  expectedHymnCount: 636,
  rightsKind: "PROJECT_AUTHORIZED",
  authorizationStatus:
    "PENDING_FORMALIZATION",
  rightsIdentifier: null,
  attributionRequired: true,
} as const satisfies HymnalEditionMetadata;
