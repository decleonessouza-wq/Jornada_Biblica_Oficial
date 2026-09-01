/**
 * Idempotent materialization of the hymnal textual search index.
 *
 * Frozen architecture:
 * - Android/iOS use native FTS5 after an explicit capability check;
 * - Web uses a compact portable inverted index in ordinary SQLite tables;
 * - hymns and hymn_sections remain authoritative;
 * - one search document is materialized per hymn;
 * - searchable text is title plus ordered section text;
 * - first_line is not indexed separately because it is derived from sections;
 * - full-corpus JavaScript work is restricted to controlled index rebuilds.
 */

import type { SQLiteDatabase } from "expo-sqlite";
import { Platform } from "react-native";

import {
  HYMNAL_SEARCH_NORMALIZER_VERSION,
  countHymnalSearchTerms,
  normalizeHymnalSearchText,
} from "../search/hymnalSearchNormalization";
import { HYMNAL_SEED_CONTRACT } from "./hymnalDatabaseSeed";

export const HYMNAL_SEARCH_INDEX_VERSION = 1 as const;

const HYMNAL_SEARCH_BUILD_BATCH_SIZE = 100;
const HYMNAL_SEARCH_SQL_INSERT_CHUNK_SIZE = 200;
const HYMNAL_SEARCH_FTS_TABLE = "hymnal_search_fts";

const SEARCH_META_KEYS = {
  state: "search_index_state",
  indexVersion: "search_index_version",
  normalizerVersion: "search_normalizer_version",
  hymnCount: "search_index_hymn_count",
  dictionaryRows: "search_index_dictionary_rows",
  postingRows: "search_index_posting_rows",
  backend: "search_index_backend",
  editionId: "search_index_edition_id",
  contentVersion: "search_index_content_version",
} as const;

export type HymnalSearchBackend =
  | "FTS5"
  | "PORTABLE_SQLITE";

type SearchBindValue = string | number | null;

type CountRow = Readonly<{
  count: number;
}>;

type CompileOptionRow = Readonly<{
  enabled: number;
}>;

type MetaRow = Readonly<{
  key: string;
  value: string;
}>;

type SourceHymnRow = Readonly<{
  source_rowid: number;
  edition_id: string;
  hymn_id: string;
  title: string;
}>;

type SourceSectionRow = Readonly<{
  edition_id: string;
  hymn_id: string;
  section_order: number;
  text: string;
}>;

export type HymnalSearchIndexReadyResult = Readonly<{
  backend: HymnalSearchBackend;
  rebuilt: boolean;
  documentCount: number;
  dictionaryRowCount: number;
  postingRowCount: number;
}>;

function expectedBackend(): HymnalSearchBackend {
  return Platform.OS === "web"
    ? "PORTABLE_SQLITE"
    : "FTS5";
}

async function getCount(
  database: SQLiteDatabase,
  sql: string,
  params: readonly SearchBindValue[] = [],
): Promise<number> {
  const row = await database.getFirstAsync<CountRow>(
    sql,
    [...params],
  );

  if (
    !row ||
    !Number.isInteger(row.count) ||
    row.count < 0
  ) {
    throw new Error(
      `HYMNAL_SEARCH_INVALID_COUNT:${sql}`,
    );
  }

  return row.count;
}

async function readSearchMeta(
  database: SQLiteDatabase,
): Promise<ReadonlyMap<string, string>> {
  const rows = await database.getAllAsync<MetaRow>(
    `SELECT key, value
       FROM hymnal_meta
      WHERE key LIKE 'search_%';`,
  );

  return new Map(
    rows.map((row) => [row.key, row.value]),
  );
}

async function writeSearchMeta(
  database: SQLiteDatabase,
  key: string,
  value: string,
): Promise<void> {
  await database.runAsync(
    `INSERT INTO hymnal_meta(key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE
       SET value = excluded.value;`,
    [key, value],
  );
}

async function tableExists(
  database: SQLiteDatabase,
  tableName: string,
): Promise<boolean> {
  const count = await getCount(
    database,
    `SELECT COUNT(*) AS count
       FROM sqlite_master
      WHERE type = 'table'
        AND name = ?;`,
    [tableName],
  );

  return count === 1;
}

async function ensureNativeFts5Table(
  database: SQLiteDatabase,
): Promise<boolean> {
  if (Platform.OS === "web") {
    return false;
  }

  const row =
    await database.getFirstAsync<CompileOptionRow>(
      "SELECT sqlite_compileoption_used('ENABLE_FTS5') AS enabled;",
    );

  if (row?.enabled !== 1) {
    throw new Error(
      "HYMNAL_SEARCH_NATIVE_FTS5_NOT_COMPILED",
    );
  }

  try {
    await database.execAsync(`
      CREATE VIRTUAL TABLE IF NOT EXISTS ${HYMNAL_SEARCH_FTS_TABLE}
      USING fts5(
        normalized_text,
        edition_id UNINDEXED,
        hymn_id UNINDEXED,
        tokenize = 'unicode61 remove_diacritics 2'
      );
    `);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    throw new Error(
      `HYMNAL_SEARCH_NATIVE_FTS5_CREATE_FAILED:${message}`,
    );
  }

  return true;
}

function toNonNegativeInteger(
  value: string | undefined,
): number | null {
  if (value === undefined) {
    return null;
  }

  const parsed = Number(value);

  if (
    !Number.isInteger(parsed) ||
    parsed < 0
  ) {
    return null;
  }

  return parsed;
}

async function isSearchIndexReady(
  database: SQLiteDatabase,
  backend: HymnalSearchBackend,
): Promise<HymnalSearchIndexReadyResult | null> {
  const meta = await readSearchMeta(database);

  if (
    meta.get(SEARCH_META_KEYS.state) !== "READY" ||
    meta.get(SEARCH_META_KEYS.indexVersion) !==
      String(HYMNAL_SEARCH_INDEX_VERSION) ||
    meta.get(SEARCH_META_KEYS.normalizerVersion) !==
      String(HYMNAL_SEARCH_NORMALIZER_VERSION) ||
    meta.get(SEARCH_META_KEYS.hymnCount) !==
      String(HYMNAL_SEED_CONTRACT.hymnRows) ||
    meta.get(SEARCH_META_KEYS.backend) !== backend ||
    meta.get(SEARCH_META_KEYS.editionId) !==
      HYMNAL_SEED_CONTRACT.editionId ||
    meta.get(SEARCH_META_KEYS.contentVersion) !==
      HYMNAL_SEED_CONTRACT.contentVersion
  ) {
    return null;
  }

  const metaDictionaryRows =
    toNonNegativeInteger(
      meta.get(SEARCH_META_KEYS.dictionaryRows),
    );
  const metaPostingRows =
    toNonNegativeInteger(
      meta.get(SEARCH_META_KEYS.postingRows),
    );

  if (
    metaDictionaryRows === null ||
    metaPostingRows === null
  ) {
    return null;
  }

  const portableDocumentCount = await getCount(
    database,
    "SELECT COUNT(*) AS count FROM hymnal_search_documents;",
  );
  const portableDictionaryCount = await getCount(
    database,
    "SELECT COUNT(*) AS count FROM hymnal_search_dictionary;",
  );
  const portablePostingCount = await getCount(
    database,
    "SELECT COUNT(*) AS count FROM hymnal_search_postings;",
  );

  if (backend === "FTS5") {
    if (
      metaDictionaryRows !== 0 ||
      metaPostingRows !== 0 ||
      portableDocumentCount !== 0 ||
      portableDictionaryCount !== 0 ||
      portablePostingCount !== 0
    ) {
      return null;
    }

    if (
      !(await tableExists(
        database,
        HYMNAL_SEARCH_FTS_TABLE,
      ))
    ) {
      return null;
    }

    const ftsCount = await getCount(
      database,
      `SELECT COUNT(*) AS count
         FROM ${HYMNAL_SEARCH_FTS_TABLE};`,
    );

    if (
      ftsCount !==
      HYMNAL_SEED_CONTRACT.hymnRows
    ) {
      return null;
    }

    return {
      backend,
      rebuilt: false,
      documentCount: ftsCount,
      dictionaryRowCount: 0,
      postingRowCount: 0,
    };
  }

  if (
    portableDocumentCount !==
      HYMNAL_SEED_CONTRACT.hymnRows ||
    portableDictionaryCount <= 0 ||
    portablePostingCount <= 0 ||
    portableDictionaryCount !==
      metaDictionaryRows ||
    portablePostingCount !==
      metaPostingRows
  ) {
    return null;
  }

  return {
    backend,
    rebuilt: false,
    documentCount: portableDocumentCount,
    dictionaryRowCount:
      portableDictionaryCount,
    postingRowCount: portablePostingCount,
  };
}

async function insertRows(
  database: SQLiteDatabase,
  insertPrefix: string,
  columnCount: number,
  rows: readonly (readonly SearchBindValue[])[],
): Promise<void> {
  if (rows.length === 0) {
    return;
  }

  for (
    let offset = 0;
    offset < rows.length;
    offset += HYMNAL_SEARCH_SQL_INSERT_CHUNK_SIZE
  ) {
    const chunk = rows.slice(
      offset,
      offset + HYMNAL_SEARCH_SQL_INSERT_CHUNK_SIZE,
    );

    const rowPlaceholder = `(${Array.from(
      { length: columnCount },
      () => "?",
    ).join(", ")})`;

    const placeholders = chunk
      .map(() => rowPlaceholder)
      .join(", ");

    const params: SearchBindValue[] = [];

    for (const row of chunk) {
      params.push(...row);
    }

    await database.runAsync(
      `${insertPrefix} VALUES ${placeholders};`,
      params,
    );
  }
}

async function clearPortableSearchTables(
  database: SQLiteDatabase,
): Promise<void> {
  await database.runAsync(
    "DELETE FROM hymnal_search_postings;",
  );
  await database.runAsync(
    "DELETE FROM hymnal_search_dictionary;",
  );
  await database.runAsync(
    "DELETE FROM hymnal_search_documents;",
  );
}

function hymnKey(
  editionId: string,
  hymnId: string,
): string {
  return `${editionId}\u0000${hymnId}`;
}

async function readOrderedSections(
  database: SQLiteDatabase,
  hymns: readonly SourceHymnRow[],
): Promise<ReadonlyMap<string, readonly string[]>> {
  if (hymns.length === 0) {
    return new Map();
  }

  const predicates = hymns
    .map(
      () =>
        "(edition_id = ? AND hymn_id = ?)",
    )
    .join(" OR ");

  const params: SearchBindValue[] = [];

  for (const hymn of hymns) {
    params.push(
      hymn.edition_id,
      hymn.hymn_id,
    );
  }

  const rows =
    await database.getAllAsync<SourceSectionRow>(
      `SELECT
         edition_id,
         hymn_id,
         section_order,
         text
       FROM hymn_sections
      WHERE ${predicates}
      ORDER BY
        edition_id,
        hymn_id,
        section_order;`,
      params,
    );

  const grouped = new Map<string, string[]>();

  for (const row of rows) {
    const key = hymnKey(
      row.edition_id,
      row.hymn_id,
    );
    const bucket = grouped.get(key);

    if (bucket) {
      bucket.push(row.text);
    } else {
      grouped.set(key, [row.text]);
    }
  }

  return grouped;
}

function buildSearchableText(
  hymn: SourceHymnRow,
  sectionTexts:
    readonly string[] | undefined,
): string {
  return [
    hymn.title,
    ...(sectionTexts ?? []),
  ].join(" ");
}

async function writeReadyMeta(
  database: SQLiteDatabase,
  backend: HymnalSearchBackend,
  documentCount: number,
  dictionaryRows: number,
  postingRows: number,
): Promise<void> {
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.indexVersion,
    String(HYMNAL_SEARCH_INDEX_VERSION),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.normalizerVersion,
    String(HYMNAL_SEARCH_NORMALIZER_VERSION),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.hymnCount,
    String(documentCount),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.dictionaryRows,
    String(dictionaryRows),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.postingRows,
    String(postingRows),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.backend,
    backend,
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.editionId,
    HYMNAL_SEED_CONTRACT.editionId,
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.contentVersion,
    HYMNAL_SEED_CONTRACT.contentVersion,
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.state,
    "READY",
  );
}

function assertDocumentCount(
  documentCount: number,
): void {
  if (
    documentCount !==
    HYMNAL_SEED_CONTRACT.hymnRows
  ) {
    throw new Error(
      `HYMNAL_SEARCH_DOCUMENT_COUNT_MISMATCH:EXPECTED=${HYMNAL_SEED_CONTRACT.hymnRows}:ACTUAL=${documentCount}`,
    );
  }
}

async function readHymnBatch(
  database: SQLiteDatabase,
  lastRowId: number,
): Promise<readonly SourceHymnRow[]> {
  return database.getAllAsync<SourceHymnRow>(
    `SELECT
       rowid AS source_rowid,
       edition_id,
       id AS hymn_id,
       title
     FROM hymns
    WHERE edition_id = ?
      AND rowid > ?
    ORDER BY rowid
    LIMIT ?;`,
    [
      HYMNAL_SEED_CONTRACT.editionId,
      lastRowId,
      HYMNAL_SEARCH_BUILD_BATCH_SIZE,
    ],
  );
}

async function rebuildPortableSearchIndex(
  database: SQLiteDatabase,
): Promise<void> {
  const termIds = new Map<string, number>();

  let documentCount = 0;
  let dictionaryRowCount = 0;
  let postingRowCount = 0;
  let nextDocumentId = 1;
  let nextTermId = 1;

  await database.withTransactionAsync(
    async () => {
      await clearPortableSearchTables(
        database,
      );

      await writeSearchMeta(
        database,
        SEARCH_META_KEYS.state,
        "BUILDING",
      );

      let lastRowId = 0;

      while (true) {
        const hymns = await readHymnBatch(
          database,
          lastRowId,
        );

        if (hymns.length === 0) {
          break;
        }

        const sections =
          await readOrderedSections(
            database,
            hymns,
          );

        const documentRows:
          SearchBindValue[][] = [];
        const dictionaryRows:
          SearchBindValue[][] = [];
        const postingRows:
          SearchBindValue[][] = [];

        for (const hymn of hymns) {
          const rawText = buildSearchableText(
            hymn,
            sections.get(
              hymnKey(
                hymn.edition_id,
                hymn.hymn_id,
              ),
            ),
          );

          const normalizedText =
            normalizeHymnalSearchText(rawText);
          const documentId = nextDocumentId;
          nextDocumentId += 1;

          documentRows.push([
            documentId,
            hymn.edition_id,
            hymn.hymn_id,
            normalizedText,
          ]);

          const termCounts =
            countHymnalSearchTerms(rawText);

          for (
            const [term, frequency]
            of termCounts
          ) {
            let termId = termIds.get(term);

            if (termId === undefined) {
              termId = nextTermId;
              nextTermId += 1;
              termIds.set(term, termId);
              dictionaryRows.push([
                termId,
                term,
              ]);
              dictionaryRowCount += 1;
            }

            postingRows.push([
              termId,
              documentId,
              frequency,
            ]);
            postingRowCount += 1;
          }

          documentCount += 1;
        }

        await insertRows(
          database,
          `INSERT INTO hymnal_search_documents(
            document_id,
            edition_id,
            hymn_id,
            normalized_text
          )`,
          4,
          documentRows,
        );

        await insertRows(
          database,
          `INSERT INTO hymnal_search_dictionary(
            term_id,
            term
          )`,
          2,
          dictionaryRows,
        );

        await insertRows(
          database,
          `INSERT INTO hymnal_search_postings(
            term_id,
            document_id,
            term_frequency
          )`,
          3,
          postingRows,
        );

        const lastHymn =
          hymns[hymns.length - 1];

        if (!lastHymn) {
          throw new Error(
            "HYMNAL_SEARCH_BATCH_LAST_ROW_MISSING",
          );
        }

        lastRowId = lastHymn.source_rowid;
      }

      assertDocumentCount(documentCount);

      if (
        dictionaryRowCount <= 0 ||
        postingRowCount <= 0 ||
        termIds.size !== dictionaryRowCount
      ) {
        throw new Error(
          `HYMNAL_SEARCH_PORTABLE_INDEX_COUNTS_INVALID:DICTIONARY=${dictionaryRowCount}:POSTINGS=${postingRowCount}:MAP=${termIds.size}`,
        );
      }

      await writeReadyMeta(
        database,
        "PORTABLE_SQLITE",
        documentCount,
        dictionaryRowCount,
        postingRowCount,
      );
    },
  );
}

async function rebuildNativeFtsIndex(
  database: SQLiteDatabase,
): Promise<void> {
  let documentCount = 0;

  await database.withTransactionAsync(
    async () => {
      await clearPortableSearchTables(
        database,
      );

      await database.runAsync(
        `DELETE FROM ${HYMNAL_SEARCH_FTS_TABLE};`,
      );

      await writeSearchMeta(
        database,
        SEARCH_META_KEYS.state,
        "BUILDING",
      );

      let lastRowId = 0;

      while (true) {
        const hymns = await readHymnBatch(
          database,
          lastRowId,
        );

        if (hymns.length === 0) {
          break;
        }

        const sections =
          await readOrderedSections(
            database,
            hymns,
          );

        const ftsRows:
          SearchBindValue[][] = [];

        for (const hymn of hymns) {
          const rawText = buildSearchableText(
            hymn,
            sections.get(
              hymnKey(
                hymn.edition_id,
                hymn.hymn_id,
              ),
            ),
          );

          ftsRows.push([
            normalizeHymnalSearchText(
              rawText,
            ),
            hymn.edition_id,
            hymn.hymn_id,
          ]);

          documentCount += 1;
        }

        await insertRows(
          database,
          `INSERT INTO ${HYMNAL_SEARCH_FTS_TABLE}(
            normalized_text,
            edition_id,
            hymn_id
          )`,
          3,
          ftsRows,
        );

        const lastHymn =
          hymns[hymns.length - 1];

        if (!lastHymn) {
          throw new Error(
            "HYMNAL_SEARCH_BATCH_LAST_ROW_MISSING",
          );
        }

        lastRowId = lastHymn.source_rowid;
      }

      assertDocumentCount(documentCount);

      await writeReadyMeta(
        database,
        "FTS5",
        documentCount,
        0,
        0,
      );
    },
  );
}

async function rebuildSearchIndex(
  database: SQLiteDatabase,
  backend: HymnalSearchBackend,
): Promise<HymnalSearchIndexReadyResult> {
  if (backend === "FTS5") {
    await rebuildNativeFtsIndex(database);
  } else {
    await rebuildPortableSearchIndex(
      database,
    );
  }

  const ready = await isSearchIndexReady(
    database,
    backend,
  );

  if (!ready) {
    throw new Error(
      "HYMNAL_SEARCH_INDEX_VALIDATION_FAILED_AFTER_REBUILD",
    );
  }

  return {
    ...ready,
    rebuilt: true,
  };
}

export async function ensureHymnalSearchIndexReady(
  database: SQLiteDatabase,
): Promise<HymnalSearchIndexReadyResult> {
  const backend = expectedBackend();
  const nativeFts5 =
    await ensureNativeFts5Table(database);

  if (
    backend === "FTS5" &&
    !nativeFts5
  ) {
    throw new Error(
      "HYMNAL_SEARCH_NATIVE_FTS5_REQUIRED_BUT_UNAVAILABLE",
    );
  }

  const ready = await isSearchIndexReady(
    database,
    backend,
  );

  if (ready) {
    return ready;
  }

  return rebuildSearchIndex(
    database,
    backend,
  );
}
