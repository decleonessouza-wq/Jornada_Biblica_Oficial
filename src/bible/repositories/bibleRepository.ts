/**
 * Contrato de leitura do corpus bíblico.
 *
 * Consumidores (UI, Jornada e serviços) dependem desta interface,
 * nunca de SQL ou de expo-sqlite diretamente.
 * Busca textual não pertence a este contrato v1; entra na Fase 7.
 */

import type {
  BibleBook,
  BibleTestament,
} from "../../domain/bible/bibleBooks";
import type { BibleBookId } from "../../domain/bible/bibleReference";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";

export type BibleInstalledVersion = Readonly<{
  id: BibleVersionId;
  code: string;
  displayName: string;
  languageTag: string;
  publicationYear: number | null;
  enabled: boolean;
}>;

export type BibleBookSummary = Readonly<{
  id: BibleBookId;
  order: number;
  testament: BibleTestament;
  canonicalName: string;
  chapterCount: number;
}>;

export type BibleVerseRecord = Readonly<{
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
  verse: number;
  text: string;
}>;

export type BibleChapterRecord = Readonly<{
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
  verses: readonly BibleVerseRecord[];
}>;

export interface BibleRepository {
  listInstalledVersions(): Promise<readonly BibleInstalledVersion[]>;

  hasVersion(versionId: BibleVersionId): Promise<boolean>;

  listBooks(versionId: BibleVersionId): Promise<readonly BibleBookSummary[]>;

  getBook(
    versionId: BibleVersionId,
    bookId: BibleBookId,
  ): Promise<BibleBook | null>;

  getChapter(
    versionId: BibleVersionId,
    bookId: BibleBookId,
    chapter: number,
  ): Promise<BibleChapterRecord | null>;

  getVerse(
    versionId: BibleVersionId,
    bookId: BibleBookId,
    chapter: number,
    verse: number,
  ): Promise<BibleVerseRecord | null>;
}
