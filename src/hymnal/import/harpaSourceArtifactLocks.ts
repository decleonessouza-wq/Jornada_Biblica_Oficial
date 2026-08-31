/**
 * Concrete source identity locks for the Harpa corpus pipeline.
 *
 * Local filesystem paths are intentionally excluded. These records freeze
 * upstream identity and byte-level evidence only.
 *
 * The secondary QSP artifact is corroboration evidence. It is intentionally
 * not modeled as HymnalSourceArtifactLock because QSP is not a production
 * source artifact kind in the Phase 10 import contract.
 */

import type {
  HymnalSourceArtifactLock,
} from "./hymnalImportContract";

export const HARPA_JORNADA_EDITION_ID =
  "harpa-crista-jornada-v1" as const;

export const HARPA_SOURCE_LOCK_RECORDED_AT =
  "2026-08-31T16:30:59.149Z" as const;

export const HARPA_PRIMARY_SOURCE_PROVENANCE = {
  role: "BASE_CORPUS_SOURCE",
  textPriority: "AUTHORITATIVE_FOR_PIPELINE_V1",
  repository:
    "DanielLiberato/Harpa-Crista-JSON-640-Hinos-Completa",
  path: "harpa_crista_640_hinos.json",
  commit:
    "e8ff5ca2f9c9e7d9892c0c68f2ad45eea3273127",
  gitBlob:
    "8d0ebad70f2c0c906967f90b45b01977ac4eaf95",
} as const;

export const HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK = {
  editionId: HARPA_JORNADA_EDITION_ID,
  sourceArtifact:
    HARPA_PRIMARY_SOURCE_PROVENANCE.path,
  sourceArtifactKind: "JSON",
  sourceArtifactOrigin:
    "github:DanielLiberato/Harpa-Crista-JSON-640-Hinos-Completa@e8ff5ca2f9c9e7d9892c0c68f2ad45eea3273127:harpa_crista_640_hinos.json",
  sourceRevision:
    HARPA_PRIMARY_SOURCE_PROVENANCE.commit,
  sourceSha256:
    "cf33d6921626458c6df8e2bf859bc747300ce56b1d687a9379028b643847728d",
  sourceByteLength: 528538,
  lockedAt: HARPA_SOURCE_LOCK_RECORDED_AT,
} as const satisfies HymnalSourceArtifactLock;

export const HARPA_SECONDARY_CORROBORATION_SOURCE_LOCK = {
  role: "SCOPED_STRUCTURAL_CORROBORATION",
  purpose:
    "STRUCTURE_CORROBORATION_WITHOUT_TEXT_INGESTION",
  globalNumberAuthority: false,
  globalTextAuthority: false,
  textIngestionAllowed: false,
  repository:
    "irnjunior/quelea-portugues-brasil",
  path: "Hinarios/Harpa Crista.qsp",
  sourceArtifact: "Harpa Crista.qsp",
  sourceArtifactKind: "QSP_ZIP_CONTAINER",
  sourceArtifactOrigin:
    "github:irnjunior/quelea-portugues-brasil@c29502e770424cb6702aac0a0deee850c2ba5a8e:Hinarios/Harpa Crista.qsp",
  sourceRevision:
    "c29502e770424cb6702aac0a0deee850c2ba5a8e",
  sourceGitBlob:
    "b181feaa0b2afa9ab896eb4b9d03309f335e10c5",
  sourceSha256:
    "32c1cb4c545844fb39cb58498e2d20c5024f5a5a7e0e6936f812ff1f1e7d4d30",
  sourceByteLength: 558439,
  lockedAt: HARPA_SOURCE_LOCK_RECORDED_AT,
} as const;