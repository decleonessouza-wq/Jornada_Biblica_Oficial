/**
 * Contratos do pipeline de ingestao biblica.
 *
 * O source artifact lock congela os bytes adquiridos da fonte aprovada.
 * O normalized artifact lock somente existe depois de parsing, normalizacao,
 * validacao e calculo do hash normalizado em gate posterior.
 */

import type { BibleBookId } from "../../domain/bible/bibleReference";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";

export const BIBLE_IMPORTER_CONTRACT_VERSION = 1 as const;

export type Sha256Hex = string;

export type BibleSourceArtifactKind = "GIT_ARCHIVE_TAR" | "UTF8_TEXT";

export type BibleSourceArtifactLock = Readonly<{
  versionId: BibleVersionId;
  sourceUrl: string;
  sourceRevision: string;
  sourceArtifact: string;
  sourceArtifactKind: BibleSourceArtifactKind;
  sourceArtifactOrigin: string;
  sourceSha256: Sha256Hex;
  sourceByteLength: number;
  lockedAt: string;
}>;

export type BibleNormalizedArtifactLock = BibleSourceArtifactLock &
  Readonly<{
    normalizedSha256: Sha256Hex;
    importerVersion: typeof BIBLE_IMPORTER_CONTRACT_VERSION;
  }>;

export type NormalizedBibleVerse = Readonly<{
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
  verse: number;
  text: string;
}>;

export type BibleImportValidationIssueCode =
  | "INVALID_VERSION_ID"
  | "INVALID_BOOK_COUNT"
  | "INVALID_CHAPTER_COUNT"
  | "INVALID_BOOK_ID"
  | "INVALID_BOOK_ORDER"
  | "INVALID_CHAPTER"
  | "INVALID_VERSE"
  | "MISSING_CHAPTER"
  | "EMPTY_TEXT"
  | "DUPLICATE_VERSE"
  | "HASH_MISMATCH";

export type BibleImportValidationIssue = Readonly<{
  code: BibleImportValidationIssueCode;
  message: string;
  bookId?: BibleBookId;
  chapter?: number;
  verse?: number;
}>;

export type BibleImportValidationReport = Readonly<{
  versionId: BibleVersionId;
  valid: boolean;
  bookCount: number;
  chapterCount: number;
  verseCount: number;
  issues: readonly BibleImportValidationIssue[];
}>;

export type BibleImportPackage = Readonly<{
  versionId: BibleVersionId;
  artifactLock: BibleNormalizedArtifactLock;
  verses: readonly NormalizedBibleVerse[];
  validation: BibleImportValidationReport;
}>;

// === Phase 5-P5-P2-A1: offline corpus parser/normalization foundation ===

export type BibleOfflineCorpusVersionId = "BLIVRE" | "ALM1911";

export type BibleOfflineSourceVariant =
  | "N4"
  | "GUTENBERG_62383";

export type BibleOfflineTextualBasis =
  | "NESTLE_1904"
  | "ALMEIDA_1911";

export type BibleParsedSourceFormat =
  | "BLIVRE_F4_N4"
  | "GUTENBERG_ALM1911";

export interface BibleOfflineCorpusVariantPolicyEntry {
  readonly versionId: BibleOfflineCorpusVersionId;
  readonly sourceVariant: BibleOfflineSourceVariant;
  readonly textualBasis: BibleOfflineTextualBasis;
  readonly sourceProfile: string;
  readonly selectionGate: "5-P5-P2-A1";
}

export interface BibleParsedVerseDraft {
  readonly versionId: BibleOfflineCorpusVersionId;
  readonly sourceVariant: BibleOfflineSourceVariant;
  readonly sourceFormat: BibleParsedSourceFormat;
  readonly bookId: string;
  readonly bookOrder: number;
  readonly chapter: number;
  readonly verse: number;
  readonly rawText: string;
}

export interface BibleParsedCorpusDraft {
  readonly schema: "bible-parsed-corpus-draft/v1";
  readonly versionId: BibleOfflineCorpusVersionId;
  readonly sourceVariant: BibleOfflineSourceVariant;
  readonly textualBasis: BibleOfflineTextualBasis;
  readonly sourceFormat: BibleParsedSourceFormat;
  readonly sourceSha256: string;
  readonly verses: readonly BibleParsedVerseDraft[];
}

export interface BibleNormalizedVerseRecord {
  readonly versionId: BibleOfflineCorpusVersionId;
  readonly bookId: string;
  readonly bookOrder: number;
  readonly chapter: number;
  readonly verse: number;
  readonly text: string;
}

export interface BibleNormalizedCorpusV1 {
  readonly schema: "bible-normalized-corpus/v1";
  readonly normalizationVersion: "1";
  readonly versionId: BibleOfflineCorpusVersionId;
  readonly sourceVariant: BibleOfflineSourceVariant;
  readonly textualBasis: BibleOfflineTextualBasis;
  readonly sourceSha256: string;
  readonly verses: readonly BibleNormalizedVerseRecord[];
}

export type BibleCorpusValidationIssueCode =
  | "VERSION_MISMATCH"
  | "UNKNOWN_BOOK"
  | "BOOK_ORDER_MISMATCH"
  | "DUPLICATE_REFERENCE"
  | "MISSING_BOOK"
  | "UNEXPECTED_CHAPTER"
  | "MISSING_CHAPTER"
  | "VERSE_SEQUENCE"
  | "EMPTY_TEXT";

export interface BibleCorpusValidationIssue {
  readonly code: BibleCorpusValidationIssueCode;
  readonly bookId?: string;
  readonly chapter?: number;
  readonly verse?: number;
  readonly message: string;
}

export interface BibleCorpusValidationResult {
  readonly isValid: boolean;
  readonly issueCount: number;
  readonly bookCount: number;
  readonly chapterCount: number;
  readonly verseCount: number;
  readonly issues: readonly BibleCorpusValidationIssue[];
}
