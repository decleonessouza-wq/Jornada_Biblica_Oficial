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