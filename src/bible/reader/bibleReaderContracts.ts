/**
 * Contratos puros do fluxo de leitura bíblica offline.
 *
 * Este módulo NÃO registra rotas no React Navigation e NÃO cria telas.
 * Ele apenas define nomes, parâmetros, estado persistível e validadores
 * para as etapas seguintes da Fase 6.
 */

import {
  BIBLE_BOOKS,
  getBibleBookById,
} from "../../domain/bible/bibleBooks";
import type { BibleBookId } from "../../domain/bible/bibleReference";
import {
  DEFAULT_BIBLE_VERSION_ID,
  isBibleVersionId,
  type BibleVersionId,
} from "../../domain/bible/bibleVersion";

export const OFFLINE_BIBLE_READER_CONTRACT_VERSION = 1 as const;

export const OFFLINE_BIBLE_ROUTE_NAMES = {
  library: "BibleLibrary",
  reader: "BibleReader",
} as const;

export type OfflineBibleReaderRouteParams = Readonly<{
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
}>;

export type OfflineBibleRouteContract = Readonly<{
  BibleLibrary: undefined;
  BibleReader: OfflineBibleReaderRouteParams;
}>;

export type OfflineBibleLastReading = Readonly<{
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
  verse?: number;
}>;

export const BIBLE_READER_FONT_SCALES = [
  "small",
  "medium",
  "large",
  "extraLarge",
] as const;

export type BibleReaderFontScale =
  (typeof BIBLE_READER_FONT_SCALES)[number];

export const DEFAULT_BIBLE_READER_FONT_SCALE: BibleReaderFontScale =
  "medium";

export const DEFAULT_OFFLINE_BIBLE_VERSION_ID: BibleVersionId =
  DEFAULT_BIBLE_VERSION_ID;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPositiveInteger(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) > 0;
}

export function isBibleBookId(value: unknown): value is BibleBookId {
  return (
    typeof value === "string" &&
    BIBLE_BOOKS.some((book) => book.id === value)
  );
}

export function isBibleReaderFontScale(
  value: unknown,
): value is BibleReaderFontScale {
  return (
    typeof value === "string" &&
    (BIBLE_READER_FONT_SCALES as readonly string[]).includes(value)
  );
}

function isChapterValidForBook(
  bookId: BibleBookId,
  chapter: unknown,
): chapter is number {
  if (!isPositiveInteger(chapter)) {
    return false;
  }

  const book = getBibleBookById(bookId);
  return chapter <= book.chapterCount;
}

export function parseOfflineBibleReaderRouteParams(
  value: unknown,
): OfflineBibleReaderRouteParams | null {
  if (!isRecord(value)) {
    return null;
  }

  const { versionId, bookId, chapter } = value;

  if (
    typeof versionId !== "string" ||
    !isBibleVersionId(versionId) ||
    !isBibleBookId(bookId) ||
    !isChapterValidForBook(bookId, chapter)
  ) {
    return null;
  }

  return {
    versionId,
    bookId,
    chapter,
  };
}

export function getPreviousOfflineBibleReaderRouteParams(
  value: OfflineBibleReaderRouteParams,
): OfflineBibleReaderRouteParams | null {
  const current = parseOfflineBibleReaderRouteParams(value);

  if (!current) {
    return null;
  }

  if (current.chapter > 1) {
    return {
      ...current,
      chapter: current.chapter - 1,
    };
  }

  const currentBookIndex = BIBLE_BOOKS.findIndex(
    (book) => book.id === current.bookId,
  );

  if (currentBookIndex <= 0) {
    return null;
  }

  const previousBook = BIBLE_BOOKS[currentBookIndex - 1];

  return {
    versionId: current.versionId,
    bookId: previousBook.id,
    chapter: previousBook.chapterCount,
  };
}

export function getNextOfflineBibleReaderRouteParams(
  value: OfflineBibleReaderRouteParams,
): OfflineBibleReaderRouteParams | null {
  const current = parseOfflineBibleReaderRouteParams(value);

  if (!current) {
    return null;
  }

  const currentBook = getBibleBookById(current.bookId);

  if (current.chapter < currentBook.chapterCount) {
    return {
      ...current,
      chapter: current.chapter + 1,
    };
  }

  const currentBookIndex = BIBLE_BOOKS.findIndex(
    (book) => book.id === current.bookId,
  );

  if (
    currentBookIndex < 0 ||
    currentBookIndex >= BIBLE_BOOKS.length - 1
  ) {
    return null;
  }

  const nextBook = BIBLE_BOOKS[currentBookIndex + 1];

  return {
    versionId: current.versionId,
    bookId: nextBook.id,
    chapter: 1,
  };
}

export function parseOfflineBibleLastReading(
  value: unknown,
): OfflineBibleLastReading | null {
  if (!isRecord(value)) {
    return null;
  }

  const { versionId, bookId, chapter, verse } = value;

  if (
    typeof versionId !== "string" ||
    !isBibleVersionId(versionId) ||
    !isBibleBookId(bookId) ||
    !isChapterValidForBook(bookId, chapter)
  ) {
    return null;
  }

  if (verse !== undefined && !isPositiveInteger(verse)) {
    return null;
  }

  return verse === undefined
    ? { versionId, bookId, chapter }
    : { versionId, bookId, chapter, verse };
}
