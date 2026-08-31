/**
 * Contratos do futuro pipeline de ingestão da Harpa.
 *
 * Este módulo define somente forma, identidade e linguagem de validação.
 * Não contém parser, normalizer, importer executável, seed ou lock concreto
 * de uma fonte real.
 *
 * O source artifact lock representa os bytes originais adquiridos.
 * O normalized artifact lock somente existe depois de parsing, normalização,
 * validação e cálculo determinístico do conteúdo normalizado.
 */

import type {
  HymnSectionKind,
} from "../../domain/hymnal/hymn";

import type {
  HymnalEditionId,
} from "../../domain/hymnal/hymnalEdition";

export const HYMNAL_IMPORTER_CONTRACT_VERSION =
  1 as const;

export type Sha256Hex = string;

export const HYMNAL_SOURCE_ARTIFACT_KINDS = [
  "UTF8_TEXT",
  "JSON",
  "CSV",
  "XLSX",
  "DOCX",
  "PDF",
] as const;

export type HymnalSourceArtifactKind =
  (typeof HYMNAL_SOURCE_ARTIFACT_KINDS)[number];

export type HymnalSourceArtifactLock = Readonly<{
  editionId: HymnalEditionId;
  sourceArtifact: string;
  sourceArtifactKind: HymnalSourceArtifactKind;
  sourceArtifactOrigin: string;
  sourceRevision: string;
  sourceSha256: Sha256Hex;
  sourceByteLength: number;
  lockedAt: string;
}>;

export type HymnalNormalizedArtifactLock =
  HymnalSourceArtifactLock &
    Readonly<{
      normalizedSha256: Sha256Hex;
      importerVersion:
        typeof HYMNAL_IMPORTER_CONTRACT_VERSION;
    }>;

export type NormalizedHymnSectionRecord =
  Readonly<{
    order: number;
    kind: HymnSectionKind;
    label: string | null;
    text: string;
  }>;

export type NormalizedHymnRecord =
  Readonly<{
    editionId: HymnalEditionId;
    id: string;
    number: number;
    title: string;
    firstLine: string | null;
    sections: readonly [
      NormalizedHymnSectionRecord,
      ...NormalizedHymnSectionRecord[],
    ];
  }>;

export const HYMNAL_IMPORT_VALIDATION_ISSUE_CODES = [
  "INVALID_EDITION_ID",
  "INVALID_HYMN_COUNT",
  "INVALID_HYMN_ID",
  "INVALID_HYMN_NUMBER",
  "INVALID_TITLE",
  "EMPTY_SECTION",
  "INVALID_SECTION_ORDER",
  "INVALID_SECTION_KIND",
  "DUPLICATE_HYMN_ID",
  "DUPLICATE_HYMN_NUMBER",
  "HASH_MISMATCH",
] as const;

export type HymnalImportValidationIssueCode =
  (typeof HYMNAL_IMPORT_VALIDATION_ISSUE_CODES)[number];

export type HymnalImportValidationIssue =
  Readonly<{
    code: HymnalImportValidationIssueCode;
    message: string;
    hymnId?: string;
    hymnNumber?: number;
    sectionOrder?: number;
  }>;

export type HymnalImportValidationReport =
  Readonly<{
    editionId: HymnalEditionId;
    valid: boolean;
    hymnCount: number;
    sectionCount: number;
    issues:
      readonly HymnalImportValidationIssue[];
  }>;

export type HymnalImportPackage =
  Readonly<{
    editionId: HymnalEditionId;
    artifactLock:
      HymnalNormalizedArtifactLock;
    hymns:
      readonly NormalizedHymnRecord[];
    validation:
      HymnalImportValidationReport;
  }>;
