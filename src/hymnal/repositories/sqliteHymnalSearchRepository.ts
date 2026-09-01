/**
 * SQLite implementation of offline textual search in the hymnal catalog.
 *
 * Frozen architecture:
 * - Android/iOS: native FTS5;
 * - Web: portable inverted index in ordinary SQLite tables;
 * - hymns is authoritative for returned summaries;
 * - pagination and ordering execute in SQL;
 * - query execution never scans or sorts the full corpus in JavaScript.
 *
 * Exact hymn-number lookup remains owned by HymnalRepository.
 */

import type { SQLiteDatabase } from "expo-sqlite";
import { Platform } from "react-native";

import type {
  HymnalEditionId,
} from "../../domain/hymnal/hymnalEdition";
import {
  bootstrapHymnalDatabase,
} from "../database/hymnalDatabaseBootstrap";
import {
  normalizeHymnalSearchText,
  tokenizeHymnalSearchText,
} from "../search/hymnalSearchNormalization";
import {
  HYMNAL_SEARCH_MAX_LIMIT,
  type HymnalSearchPage,
  type HymnalSearchRepository,
  type HymnalSearchResult,
  type HymnalSearchTextRequest,
} from "./hymnalSearchRepository";

type HymnalSearchRow = Readonly<{
  edition_id: string;
  id: string;
  number: number;
  title: string;
  first_line: string | null;
}>;

type PreparedHymnalSearchQuery = Readonly<{
  normalizedQuery: string;
  tokens: readonly string[];
}>;

function assertNonBlank(
  value: string,
  label: string,
): void {
  if (value.trim().length === 0) {
    throw new Error(
      `HYMNAL_SEARCH_INVALID_${label}`,
    );
  }
}

function assertPositiveInteger(
  value: number,
  label: string,
): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `HYMNAL_SEARCH_INVALID_${label}:${value}`,
    );
  }
}

function assertNullableNonBlank(
  value: string | null,
  label: string,
): void {
  if (
    value !== null &&
    value.trim().length === 0
  ) {
    throw new Error(
      `HYMNAL_SEARCH_INVALID_${label}`,
    );
  }
}

function assertSearchRequest(
  request: HymnalSearchTextRequest,
): PreparedHymnalSearchQuery {
  if (typeof request.editionId !== "string") {
    throw new Error(
      "HYMNAL_SEARCH_INVALID_EDITION_ID_TYPE",
    );
  }

  assertNonBlank(
    request.editionId,
    "EDITION_ID",
  );

  if (typeof request.query !== "string") {
    throw new Error(
      "HYMNAL_SEARCH_INVALID_QUERY_TYPE",
    );
  }

  if (
    request.mode !== "WORD" &&
    request.mode !== "PHRASE"
  ) {
    throw new Error(
      `HYMNAL_SEARCH_INVALID_MODE:${String(request.mode)}`,
    );
  }

  if (
    !Number.isInteger(request.offset) ||
    request.offset < 0
  ) {
    throw new Error(
      `HYMNAL_SEARCH_INVALID_OFFSET:${request.offset}`,
    );
  }

  if (
    !Number.isInteger(request.limit) ||
    request.limit < 1 ||
    request.limit > HYMNAL_SEARCH_MAX_LIMIT
  ) {
    throw new Error(
      `HYMNAL_SEARCH_INVALID_LIMIT:${request.limit}`,
    );
  }

  const normalizedQuery =
    normalizeHymnalSearchText(request.query);
  const tokens =
    tokenizeHymnalSearchText(request.query);

  if (!normalizedQuery || tokens.length === 0) {
    throw new Error(
      "HYMNAL_SEARCH_EMPTY_QUERY_AFTER_NORMALIZATION",
    );
  }

  if (
    request.mode === "WORD" &&
    tokens.length !== 1
  ) {
    throw new Error(
      `HYMNAL_SEARCH_WORD_REQUIRES_SINGLE_TERM:ACTUAL=${tokens.length}`,
    );
  }

  return {
    normalizedQuery,
    tokens,
  };
}

function toSearchResult(
  row: HymnalSearchRow,
  expectedEditionId: HymnalEditionId,
): HymnalSearchResult {
  assertNonBlank(row.edition_id, "ROW_EDITION_ID");
  assertNonBlank(row.id, "ROW_HYMN_ID");
  assertPositiveInteger(
    row.number,
    "ROW_HYMN_NUMBER",
  );
  assertNonBlank(row.title, "ROW_HYMN_TITLE");
  assertNullableNonBlank(
    row.first_line,
    "ROW_HYMN_FIRST_LINE",
  );

  if (row.edition_id !== expectedEditionId) {
    throw new Error(
      `HYMNAL_SEARCH_RESULT_SCOPE_MISMATCH:EXPECTED=${expectedEditionId}:ACTUAL=${row.edition_id}`,
    );
  }

  return {
    id: row.id,
    editionId: row.edition_id,
    number: row.number,
    title: row.title,
    firstLine: row.first_line,
  };
}

function toSearchPage(
  rows: readonly HymnalSearchRow[],
  request: HymnalSearchTextRequest,
): HymnalSearchPage {
  const hasMore = rows.length > request.limit;

  return {
    items: rows
      .slice(0, request.limit)
      .map((row) =>
        toSearchResult(
          row,
          request.editionId,
        ),
      ),
    offset: request.offset,
    limit: request.limit,
    hasMore,
  };
}

function buildNativeFtsExpression(
  prepared: PreparedHymnalSearchQuery,
  request: HymnalSearchTextRequest,
): string {
  if (request.mode === "WORD") {
    return prepared.tokens[0]!;
  }

  return `"${prepared.normalizedQuery}"`;
}

async function searchNativeFts(
  database: SQLiteDatabase,
  request: HymnalSearchTextRequest,
  prepared: PreparedHymnalSearchQuery,
): Promise<HymnalSearchPage> {
  const fetchLimit = request.limit + 1;
  const ftsExpression =
    buildNativeFtsExpression(
      prepared,
      request,
    );

  const rows =
    await database.getAllAsync<HymnalSearchRow>(
      `SELECT
         h.edition_id,
         h.id,
         h.number,
         h.title,
         h.first_line
       FROM hymnal_search_fts
       JOIN hymns AS h
         ON h.edition_id = hymnal_search_fts.edition_id
        AND h.id = hymnal_search_fts.hymn_id
      WHERE hymnal_search_fts MATCH ?
        AND hymnal_search_fts.edition_id = ?
      ORDER BY
        h.number,
        h.id
      LIMIT ? OFFSET ?;`,
      [
        ftsExpression,
        request.editionId,
        fetchLimit,
        request.offset,
      ],
    );

  return toSearchPage(rows, request);
}

async function searchPortableWord(
  database: SQLiteDatabase,
  request: HymnalSearchTextRequest,
  term: string,
): Promise<HymnalSearchPage> {
  const fetchLimit = request.limit + 1;

  const rows =
    await database.getAllAsync<HymnalSearchRow>(
      `SELECT
         h.edition_id,
         h.id,
         h.number,
         h.title,
         h.first_line
       FROM hymnal_search_dictionary AS d
       JOIN hymnal_search_postings AS p
         ON p.term_id = d.term_id
       JOIN hymnal_search_documents AS sd
         ON sd.document_id = p.document_id
       JOIN hymns AS h
         ON h.edition_id = sd.edition_id
        AND h.id = sd.hymn_id
      WHERE d.term = ?
        AND sd.edition_id = ?
      ORDER BY
        h.number,
        h.id
      LIMIT ? OFFSET ?;`,
      [
        term,
        request.editionId,
        fetchLimit,
        request.offset,
      ],
    );

  return toSearchPage(rows, request);
}

async function searchPortablePhrase(
  database: SQLiteDatabase,
  request: HymnalSearchTextRequest,
  prepared: PreparedHymnalSearchQuery,
): Promise<HymnalSearchPage> {
  const fetchLimit = request.limit + 1;
  const distinctTerms = [
    ...new Set(prepared.tokens),
  ];

  if (distinctTerms.length === 0) {
    throw new Error(
      "HYMNAL_SEARCH_PORTABLE_PHRASE_HAS_NO_TERMS",
    );
  }

  const termPlaceholders = distinctTerms
    .map(() => "?")
    .join(", ");

  const rows =
    await database.getAllAsync<HymnalSearchRow>(
      `WITH candidate_documents AS (
         SELECT p.document_id
           FROM hymnal_search_dictionary AS d
           JOIN hymnal_search_postings AS p
             ON p.term_id = d.term_id
           JOIN hymnal_search_documents AS sd_scope
             ON sd_scope.document_id = p.document_id
          WHERE d.term IN (${termPlaceholders})
            AND sd_scope.edition_id = ?
          GROUP BY p.document_id
         HAVING COUNT(DISTINCT d.term) = ?
       )
       SELECT
         h.edition_id,
         h.id,
         h.number,
         h.title,
         h.first_line
       FROM candidate_documents AS c
       JOIN hymnal_search_documents AS sd
         ON sd.document_id = c.document_id
       JOIN hymns AS h
         ON h.edition_id = sd.edition_id
        AND h.id = sd.hymn_id
      WHERE sd.edition_id = ?
        AND instr(
          ' ' || sd.normalized_text || ' ',
          ' ' || ? || ' '
        ) > 0
      ORDER BY
        h.number,
        h.id
      LIMIT ? OFFSET ?;`,
      [
        ...distinctTerms,
        request.editionId,
        distinctTerms.length,
        request.editionId,
        prepared.normalizedQuery,
        fetchLimit,
        request.offset,
      ],
    );

  return toSearchPage(rows, request);
}

async function searchPortableSqlite(
  database: SQLiteDatabase,
  request: HymnalSearchTextRequest,
  prepared: PreparedHymnalSearchQuery,
): Promise<HymnalSearchPage> {
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

export class SQLiteHymnalSearchRepository
implements HymnalSearchRepository {
  constructor(
    private readonly database:
      SQLiteDatabase,
  ) {}

  async searchText(
    request: HymnalSearchTextRequest,
  ): Promise<HymnalSearchPage> {
    const prepared =
      assertSearchRequest(request);

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

export async function createSQLiteHymnalSearchRepository(): Promise<SQLiteHymnalSearchRepository> {
  const database =
    await bootstrapHymnalDatabase();

  return new SQLiteHymnalSearchRepository(
    database,
  );
}
