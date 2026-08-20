/**
 * Contratos do pipeline de ingestão bíblica.
 *
 * Esta fase define forma, invariantes e erros possíveis.
 * Download, parsing, normalização, hash e escrita SQLite serão implementados
 * em gates posteriores para manter rollback e validação isolados.
 */

import type { BibleBookId } from "../../domain/bible/bibleReference";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";

export const BIBLE_IMPORTER_CONTRACT_VERSION = 1 as const;

export type Sha256Hex = string;

export type BibleSourceArtifactLock = Readonly<{
  versionId: BibleVersionId;
  sourceUrl: string;
  sourceRevision: string;
  sourceArtifact: string;
  sourceSha256: Sha256Hex;
  normalizedSha256: Sha256Hex;
  importerVersion: typeof BIBLE_IMPORTER_CONTRACT_VERSION;
  lockedAt: string;
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
  artifactLock: BibleSourceArtifactLock;
  verses: readonly NormalizedBibleVerse[];
  validation: BibleImportValidationReport;
}>;
