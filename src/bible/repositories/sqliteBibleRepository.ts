/**
 * Implementação SQLite concreta do contrato de leitura bíblica.
 *
 * Consumidores continuam dependendo de BibleRepository; SQL fica isolado aqui.
 * Busca textual permanece fora deste contrato e entra somente na Fase 7.
 */

import type { SQLiteDatabase } from "expo-sqlite";

import {
  BIBLE_BOOKS,
  type BibleBook,
  type BibleTestament,
} from "../../domain/bible/bibleBooks";
import type { BibleBookId } from "../../domain/bible/bibleReference";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import { bootstrapBibleDatabase } from "../database/bibleDatabaseBootstrap";
import type {
  BibleBookSummary,
  BibleChapterRecord,
  BibleInstalledVersion,
  BibleRepository,
  BibleVerseRecord,
} from "./bibleRepository";

type InstalledVersionRow = Readonly<{
  id: BibleVersionId;
  code: string;
  display_name: string;
  language_tag: string;
  publication_year: number | null;
  enabled: number;
}>;

type ExistsRow = Readonly<{
  present: number;
}>;

type BookRow = Readonly<{
  id: BibleBookId;
  canonical_order: number;
  testament: BibleTestament;
  canonical_name: string;
  chapter_count: number;
}>;

type VerseRow = Readonly<{
  version_id: BibleVersionId;
  book_id: BibleBookId;
  chapter: number;
  verse: number;
  text: string;
}>;

function assertPositiveInteger(
  value: number,
  label: string,
): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `BIBLE_REPOSITORY_INVALID_${label.toUpperCase()}:${value}`,
    );
  }
}

export class SQLiteBibleRepository implements BibleRepository {
  constructor(
    private readonly database: SQLiteDatabase,
  ) {}

  async listInstalledVersions(): Promise<readonly BibleInstalledVersion[]> {
    const rows = await this.database.getAllAsync<InstalledVersionRow>(
      `SELECT
         id,
         code,
         display_name,
         language_tag,
         publication_year,
         enabled
       FROM bible_versions
       ORDER BY CASE id
         WHEN 'BLIVRE' THEN 1
         WHEN 'ALM1911' THEN 2
         ELSE 99
       END;`,
    );

    return rows.map((row) => ({
      id: row.id,
      code: row.code,
      displayName: row.display_name,
      languageTag: row.language_tag,
      publicationYear: row.publication_year,
      enabled: row.enabled === 1,
    }));
  }

  async hasVersion(versionId: BibleVersionId): Promise<boolean> {
    const row = await this.database.getFirstAsync<ExistsRow>(
      `SELECT 1 AS present
         FROM bible_versions
        WHERE id = ?
          AND enabled = 1
        LIMIT 1;`,
      [versionId],
    );

    return row?.present === 1;
  }

  async listBooks(
    versionId: BibleVersionId,
  ): Promise<readonly BibleBookSummary[]> {
    const rows = await this.database.getAllAsync<BookRow>(
      `SELECT
         b.id,
         b.canonical_order,
         b.testament,
         b.canonical_name,
         b.chapter_count
       FROM bible_books AS b
      WHERE EXISTS (
        SELECT 1
          FROM bible_chapters AS c
         WHERE c.version_id = ?
           AND c.book_id = b.id
      )
      ORDER BY b.canonical_order;`,
      [versionId],
    );

    return rows.map((row) => ({
      id: row.id,
      order: row.canonical_order,
      testament: row.testament,
      canonicalName: row.canonical_name,
      chapterCount: row.chapter_count,
    }));
  }

  async getBook(
    versionId: BibleVersionId,
    bookId: BibleBookId,
  ): Promise<BibleBook | null> {
    const row = await this.database.getFirstAsync<BookRow>(
      `SELECT
         b.id,
         b.canonical_order,
         b.testament,
         b.canonical_name,
         b.chapter_count
       FROM bible_books AS b
      WHERE b.id = ?
        AND EXISTS (
          SELECT 1
            FROM bible_chapters AS c
           WHERE c.version_id = ?
             AND c.book_id = b.id
        )
      LIMIT 1;`,
      [bookId, versionId],
    );

    if (!row) {
      return null;
    }

    const canonical = BIBLE_BOOKS.find(
      (book) => book.id === row.id,
    );

    if (!canonical) {
      throw new Error(
        `BIBLE_REPOSITORY_UNKNOWN_CANONICAL_BOOK:${row.id}`,
      );
    }

    if (
      canonical.order !== row.canonical_order ||
      canonical.testament !== row.testament ||
      canonical.canonicalName !== row.canonical_name ||
      canonical.chapterCount !== row.chapter_count
    ) {
      throw new Error(
        `BIBLE_REPOSITORY_CANONICAL_BOOK_MISMATCH:${row.id}`,
      );
    }

    return canonical;
  }

  async getChapter(
    versionId: BibleVersionId,
    bookId: BibleBookId,
    chapter: number,
  ): Promise<BibleChapterRecord | null> {
    assertPositiveInteger(chapter, "chapter");

    const rows = await this.database.getAllAsync<VerseRow>(
      `SELECT
         version_id,
         book_id,
         chapter,
         verse,
         text
       FROM bible_verses
      WHERE version_id = ?
        AND book_id = ?
        AND chapter = ?
      ORDER BY verse;`,
      [versionId, bookId, chapter],
    );

    if (rows.length === 0) {
      return null;
    }

    const verses: BibleVerseRecord[] = rows.map((row) => ({
      versionId: row.version_id,
      bookId: row.book_id,
      chapter: row.chapter,
      verse: row.verse,
      text: row.text,
    }));

    return {
      versionId,
      bookId,
      chapter,
      verses,
    };
  }

  async getVerse(
    versionId: BibleVersionId,
    bookId: BibleBookId,
    chapter: number,
    verse: number,
  ): Promise<BibleVerseRecord | null> {
    assertPositiveInteger(chapter, "chapter");
    assertPositiveInteger(verse, "verse");

    const row = await this.database.getFirstAsync<VerseRow>(
      `SELECT
         version_id,
         book_id,
         chapter,
         verse,
         text
       FROM bible_verses
      WHERE version_id = ?
        AND book_id = ?
        AND chapter = ?
        AND verse = ?
      LIMIT 1;`,
      [versionId, bookId, chapter, verse],
    );

    if (!row) {
      return null;
    }

    return {
      versionId: row.version_id,
      bookId: row.book_id,
      chapter: row.chapter,
      verse: row.verse,
      text: row.text,
    };
  }
}

export async function createSQLiteBibleRepository(): Promise<SQLiteBibleRepository> {
  const database = await bootstrapBibleDatabase();
  return new SQLiteBibleRepository(database);
}
