/**
 * Implementação SQLite da busca textual bíblica offline.
 *
 * Arquitetura congelada:
 * - Android/iOS: FTS5 nativo;
 * - Web: índice invertido portátil em SQLite;
 * - bible_verses é a fonte autoritativa do texto retornado;
 * - paginação e ordenação são executadas em SQL;
 * - nenhuma consulta varre ou ordena o corpus em JavaScript.
 *
 * Referências bíblicas estruturadas não pertencem a este repository.
 * O roteamento texto x referência reutilizará parseBibleReference em 7-P5.
 */

import type { SQLiteDatabase } from "expo-sqlite";
import { Platform } from "react-native";

import type { BibleBookId } from "../../domain/bible/bibleReference";
import {
  isBibleVersionId,
  type BibleVersionId,
} from "../../domain/bible/bibleVersion";
import { bootstrapBibleDatabase } from "../database/bibleDatabaseBootstrap";
import {
  normalizeBibleSearchText,
  tokenizeBibleSearchText,
} from "../search/bibleSearchNormalization";
import {
  BIBLE_SEARCH_MAX_LIMIT,
  type BibleSearchPage,
  type BibleSearchRepository,
  type BibleSearchResult,
  type BibleSearchTextRequest,
} from "./bibleSearchRepository";

type BibleSearchRow = Readonly<{
  version_id: BibleVersionId;
  book_id: BibleBookId;
  chapter: number;
  verse: number;
  text: string;
}>;

type PreparedBibleSearchQuery = Readonly<{
  normalizedQuery: string;
  tokens: readonly string[];
}>;

function assertSearchRequest(
  request: BibleSearchTextRequest,
): PreparedBibleSearchQuery {
  if (
    typeof request.versionId !== "string" ||
    !isBibleVersionId(request.versionId)
  ) {
    throw new Error(
      `BIBLE_SEARCH_INVALID_VERSION:${String(request.versionId)}`,
    );
  }

  if (typeof request.query !== "string") {
    throw new Error("BIBLE_SEARCH_INVALID_QUERY_TYPE");
  }

  if (
    request.mode !== "WORD" &&
    request.mode !== "PHRASE"
  ) {
    throw new Error(
      `BIBLE_SEARCH_INVALID_MODE:${String(request.mode)}`,
    );
  }

  if (
    !Number.isInteger(request.offset) ||
    request.offset < 0
  ) {
    throw new Error(
      `BIBLE_SEARCH_INVALID_OFFSET:${request.offset}`,
    );
  }

  if (
    !Number.isInteger(request.limit) ||
    request.limit < 1 ||
    request.limit > BIBLE_SEARCH_MAX_LIMIT
  ) {
    throw new Error(
      `BIBLE_SEARCH_INVALID_LIMIT:${request.limit}`,
    );
  }

  const normalizedQuery =
    normalizeBibleSearchText(request.query);
  const tokens = tokenizeBibleSearchText(request.query);

  if (!normalizedQuery || tokens.length === 0) {
    throw new Error("BIBLE_SEARCH_EMPTY_QUERY_AFTER_NORMALIZATION");
  }

  if (request.mode === "WORD" && tokens.length !== 1) {
    throw new Error(
      `BIBLE_SEARCH_WORD_REQUIRES_SINGLE_TERM:ACTUAL=${tokens.length}`,
    );
  }

  return {
    normalizedQuery,
    tokens,
  };
}

function toSearchResult(
  row: BibleSearchRow,
): BibleSearchResult {
  return {
    versionId: row.version_id,
    bookId: row.book_id,
    chapter: row.chapter,
    verse: row.verse,
    text: row.text,
  };
}

function toSearchPage(
  rows: readonly BibleSearchRow[],
  request: BibleSearchTextRequest,
): BibleSearchPage {
  const hasMore = rows.length > request.limit;

  return {
    items: rows
      .slice(0, request.limit)
      .map(toSearchResult),
    offset: request.offset,
    limit: request.limit,
    hasMore,
  };
}

function buildNativeFtsExpression(
  prepared: PreparedBibleSearchQuery,
  request: BibleSearchTextRequest,
): string {
  if (request.mode === "WORD") {
    return prepared.tokens[0]!;
  }

  return `"${prepared.normalizedQuery}"`;
}

async function searchNativeFts(
  database: SQLiteDatabase,
  request: BibleSearchTextRequest,
  prepared: PreparedBibleSearchQuery,
): Promise<BibleSearchPage> {
  const fetchLimit = request.limit + 1;
  const ftsExpression = buildNativeFtsExpression(
    prepared,
    request,
  );

  const rows = await database.getAllAsync<BibleSearchRow>(
    `SELECT
       v.version_id,
       v.book_id,
       v.chapter,
       v.verse,
       v.text
     FROM bible_search_fts
     JOIN bible_verses AS v
       ON v.version_id = bible_search_fts.version_id
      AND v.book_id = bible_search_fts.book_id
      AND v.chapter = bible_search_fts.chapter
      AND v.verse = bible_search_fts.verse
     JOIN bible_books AS b
       ON b.id = v.book_id
    WHERE bible_search_fts MATCH ?
      AND bible_search_fts.version_id = ?
    ORDER BY
      b.canonical_order,
      v.chapter,
      v.verse
    LIMIT ? OFFSET ?;`,
    [
      ftsExpression,
      request.versionId,
      fetchLimit,
      request.offset,
    ],
  );

  return toSearchPage(rows, request);
}

async function searchPortableWord(
  database: SQLiteDatabase,
  request: BibleSearchTextRequest,
  term: string,
): Promise<BibleSearchPage> {
  const fetchLimit = request.limit + 1;

  const rows = await database.getAllAsync<BibleSearchRow>(
    `SELECT
       v.version_id,
       v.book_id,
       v.chapter,
       v.verse,
       v.text
     FROM bible_search_dictionary AS d
     JOIN bible_search_postings AS p
       ON p.term_id = d.term_id
     JOIN bible_search_documents AS sd
       ON sd.document_id = p.document_id
     JOIN bible_verses AS v
       ON v.version_id = sd.version_id
      AND v.book_id = sd.book_id
      AND v.chapter = sd.chapter
      AND v.verse = sd.verse
     JOIN bible_books AS b
       ON b.id = v.book_id
    WHERE d.term = ?
      AND sd.version_id = ?
    ORDER BY
      b.canonical_order,
      v.chapter,
      v.verse
    LIMIT ? OFFSET ?;`,
    [
      term,
      request.versionId,
      fetchLimit,
      request.offset,
    ],
  );

  return toSearchPage(rows, request);
}

async function searchPortablePhrase(
  database: SQLiteDatabase,
  request: BibleSearchTextRequest,
  prepared: PreparedBibleSearchQuery,
): Promise<BibleSearchPage> {
  const fetchLimit = request.limit + 1;
  const distinctTerms = [...new Set(prepared.tokens)];

  if (distinctTerms.length === 0) {
    throw new Error(
      "BIBLE_SEARCH_PORTABLE_PHRASE_HAS_NO_TERMS",
    );
  }

  const termPlaceholders = distinctTerms
    .map(() => "?")
    .join(", ");

  const rows = await database.getAllAsync<BibleSearchRow>(
    `WITH candidate_documents AS (
       SELECT p.document_id
         FROM bible_search_dictionary AS d
         JOIN bible_search_postings AS p
           ON p.term_id = d.term_id
        WHERE d.term IN (${termPlaceholders})
        GROUP BY p.document_id
       HAVING COUNT(DISTINCT d.term) = ?
     )
     SELECT
       v.version_id,
       v.book_id,
       v.chapter,
       v.verse,
       v.text
     FROM candidate_documents AS c
     JOIN bible_search_documents AS sd
       ON sd.document_id = c.document_id
     JOIN bible_verses AS v
       ON v.version_id = sd.version_id
      AND v.book_id = sd.book_id
      AND v.chapter = sd.chapter
      AND v.verse = sd.verse
     JOIN bible_books AS b
       ON b.id = v.book_id
    WHERE sd.version_id = ?
      AND instr(
        ' ' || sd.normalized_text || ' ',
        ' ' || ? || ' '
      ) > 0
    ORDER BY
      b.canonical_order,
      v.chapter,
      v.verse
    LIMIT ? OFFSET ?;`,
    [
      ...distinctTerms,
      distinctTerms.length,
      request.versionId,
      prepared.normalizedQuery,
      fetchLimit,
      request.offset,
    ],
  );

  return toSearchPage(rows, request);
}

async function searchPortableSqlite(
  database: SQLiteDatabase,
  request: BibleSearchTextRequest,
  prepared: PreparedBibleSearchQuery,
): Promise<BibleSearchPage> {
  if (request.mode === "WORD") {
    return searchPortableWord(
      database,
      request,
      prepared.tokens[0]!,
    );
  }

  return searchPortablePhrase(
    database,
    request,
    prepared,
  );
}

export class SQLiteBibleSearchRepository
  implements BibleSearchRepository
{
  constructor(
    private readonly database: SQLiteDatabase,
  ) {}

  async searchText(
    request: BibleSearchTextRequest,
  ): Promise<BibleSearchPage> {
    const prepared = assertSearchRequest(request);

    if (Platform.OS === "web") {
      return searchPortableSqlite(
        this.database,
        request,
        prepared,
      );
    }

    return searchNativeFts(
      this.database,
      request,
      prepared,
    );
  }
}

export async function createSQLiteBibleSearchRepository(): Promise<SQLiteBibleSearchRepository> {
  const database = await bootstrapBibleDatabase();

  return new SQLiteBibleSearchRepository(database);
}
