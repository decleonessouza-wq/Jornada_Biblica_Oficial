/**
 * Materialização idempotente dos índices da busca bíblica.
 *
 * Arquitetura congelada:
 * - Android/iOS: FTS5 nativo, obrigatório quando Platform.OS !== "web";
 * - Web: índice invertido portátil compacto em SQLite comum;
 * - bible_verses permanece a fonte autoritativa;
 * - nenhuma consulta futura pode varrer o corpus inteiro em JavaScript.
 *
 * Representação portátil congelada em 7-P2-A2-D4:
 * - documents: document_id + referência + normalized_text;
 * - dictionary: term_id + termo único;
 * - postings: term_id + document_id + frequência, WITHOUT ROWID.
 *
 * A varredura em batches abaixo acontece somente durante construção/rebuild
 * do índice persistente. Falhas deixam o estado anterior preservado pela
 * transação e o marcador READY só é gravado no final.
 */

import { Platform } from "react-native";
import type { SQLiteDatabase } from "expo-sqlite";

import { BIBLE_SEED_CONTRACT } from "./bibleDatabaseSeed";
import {
  BIBLE_SEARCH_NORMALIZER_VERSION,
  normalizeBibleSearchText,
} from "../search/bibleSearchNormalization";

export const BIBLE_SEARCH_INDEX_VERSION = 1 as const;

const BIBLE_SEARCH_BUILD_BATCH_SIZE = 1000;
const BIBLE_SEARCH_SQL_INSERT_CHUNK_SIZE = 1000;
const BIBLE_SEARCH_FTS_TABLE = "bible_search_fts";

const SEARCH_META_KEYS = {
  state: "search_index_state",
  indexVersion: "search_index_version",
  normalizerVersion: "search_normalizer_version",
  verseCount: "search_index_verse_count",
  dictionaryRows: "search_index_dictionary_rows",
  postingRows: "search_index_posting_rows",
  backend: "search_index_backend",
  blivreVerses: "search_index_blivre_verses",
  alm1911Verses: "search_index_alm1911_verses",
} as const;

type SearchBackend = "FTS5" | "PORTABLE_SQLITE";

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

type SourceVerseRow = Readonly<{
  source_rowid: number;
  version_id: "BLIVRE" | "ALM1911";
  book_id: string;
  chapter: number;
  verse: number;
  text: string;
}>;

export type BibleSearchIndexReadyResult = Readonly<{
  backend: SearchBackend;
  rebuilt: boolean;
  documentCount: number;
  dictionaryRowCount: number;
  postingRowCount: number;
}>;

function expectedBackend(): SearchBackend {
  return Platform.OS === "web" ? "PORTABLE_SQLITE" : "FTS5";
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

  if (!row || !Number.isInteger(row.count) || row.count < 0) {
    throw new Error(`BIBLE_SEARCH_INVALID_COUNT:${sql}`);
  }

  return row.count;
}

async function readSearchMeta(
  database: SQLiteDatabase,
): Promise<ReadonlyMap<string, string>> {
  const rows = await database.getAllAsync<MetaRow>(
    `SELECT key, value
       FROM bible_meta
      WHERE key LIKE 'search_%';`,
  );

  return new Map(rows.map((row) => [row.key, row.value]));
}

async function writeSearchMeta(
  database: SQLiteDatabase,
  key: string,
  value: string,
): Promise<void> {
  await database.runAsync(
    `INSERT INTO bible_meta(key, value)
     VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value;`,
    [key, value],
  );
}

async function ensureNativeFts5Table(
  database: SQLiteDatabase,
): Promise<boolean> {
  if (Platform.OS === "web") {
    return false;
  }

  const row = await database.getFirstAsync<CompileOptionRow>(
    "SELECT sqlite_compileoption_used('ENABLE_FTS5') AS enabled;",
  );

  if (row?.enabled !== 1) {
    throw new Error("BIBLE_SEARCH_NATIVE_FTS5_NOT_COMPILED");
  }

  try {
    await database.execAsync(`
      CREATE VIRTUAL TABLE IF NOT EXISTS ${BIBLE_SEARCH_FTS_TABLE}
      USING fts5(
        normalized_text,
        version_id UNINDEXED,
        book_id UNINDEXED,
        chapter UNINDEXED,
        verse UNINDEXED,
        tokenize = 'unicode61 remove_diacritics 2'
      );
    `);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);

    throw new Error(
      `BIBLE_SEARCH_NATIVE_FTS5_CREATE_FAILED:${message}`,
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

  if (!Number.isInteger(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

async function isSearchIndexReady(
  database: SQLiteDatabase,
  backend: SearchBackend,
): Promise<BibleSearchIndexReadyResult | null> {
  const meta = await readSearchMeta(database);

  if (
    meta.get(SEARCH_META_KEYS.state) !== "READY" ||
    meta.get(SEARCH_META_KEYS.indexVersion) !==
      String(BIBLE_SEARCH_INDEX_VERSION) ||
    meta.get(SEARCH_META_KEYS.normalizerVersion) !==
      String(BIBLE_SEARCH_NORMALIZER_VERSION) ||
    meta.get(SEARCH_META_KEYS.verseCount) !==
      String(BIBLE_SEED_CONTRACT.verseRows) ||
    meta.get(SEARCH_META_KEYS.backend) !== backend ||
    meta.get(SEARCH_META_KEYS.blivreVerses) !==
      String(BIBLE_SEED_CONTRACT.versions.BLIVRE.verseCount) ||
    meta.get(SEARCH_META_KEYS.alm1911Verses) !==
      String(BIBLE_SEED_CONTRACT.versions.ALM1911.verseCount)
  ) {
    return null;
  }

  const metaDictionaryRows = toNonNegativeInteger(
    meta.get(SEARCH_META_KEYS.dictionaryRows),
  );
  const metaPostingRows = toNonNegativeInteger(
    meta.get(SEARCH_META_KEYS.postingRows),
  );

  if (
    metaDictionaryRows === null ||
    metaPostingRows === null
  ) {
    return null;
  }

  if (backend === "FTS5") {
    if (metaDictionaryRows !== 0 || metaPostingRows !== 0) {
      return null;
    }

    const ftsCount = await getCount(
      database,
      `SELECT COUNT(*) AS count FROM ${BIBLE_SEARCH_FTS_TABLE};`,
    );

    const portableDocumentCount = await getCount(
      database,
      "SELECT COUNT(*) AS count FROM bible_search_documents;",
    );
    const portableDictionaryCount = await getCount(
      database,
      "SELECT COUNT(*) AS count FROM bible_search_dictionary;",
    );
    const portablePostingCount = await getCount(
      database,
      "SELECT COUNT(*) AS count FROM bible_search_postings;",
    );

    if (
      ftsCount !== BIBLE_SEED_CONTRACT.verseRows ||
      portableDocumentCount !== 0 ||
      portableDictionaryCount !== 0 ||
      portablePostingCount !== 0
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

  const documentCount = await getCount(
    database,
    "SELECT COUNT(*) AS count FROM bible_search_documents;",
  );
  const dictionaryRowCount = await getCount(
    database,
    "SELECT COUNT(*) AS count FROM bible_search_dictionary;",
  );
  const postingRowCount = await getCount(
    database,
    "SELECT COUNT(*) AS count FROM bible_search_postings;",
  );

  if (
    documentCount !== BIBLE_SEED_CONTRACT.verseRows ||
    dictionaryRowCount !== 0 ||
    postingRowCount !== 0 ||
    metaDictionaryRows !== 0 ||
    metaPostingRows !== 0
  ) {
    return null;
  }

  return {
    backend,
    rebuilt: false,
    documentCount,
    dictionaryRowCount,
    postingRowCount,
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
    offset += BIBLE_SEARCH_SQL_INSERT_CHUNK_SIZE
  ) {
    const chunk = rows.slice(
      offset,
      offset + BIBLE_SEARCH_SQL_INSERT_CHUNK_SIZE,
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
    "DELETE FROM bible_search_postings;",
  );
  await database.runAsync(
    "DELETE FROM bible_search_dictionary;",
  );
  await database.runAsync(
    "DELETE FROM bible_search_documents;",
  );
}

async function writeReadyMeta(
  database: SQLiteDatabase,
  backend: SearchBackend,
  processedVerses: number,
  blivreVerses: number,
  alm1911Verses: number,
  dictionaryRows: number,
  postingRows: number,
): Promise<void> {
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.indexVersion,
    String(BIBLE_SEARCH_INDEX_VERSION),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.normalizerVersion,
    String(BIBLE_SEARCH_NORMALIZER_VERSION),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.verseCount,
    String(processedVerses),
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
    SEARCH_META_KEYS.blivreVerses,
    String(blivreVerses),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.alm1911Verses,
    String(alm1911Verses),
  );
  await writeSearchMeta(
    database,
    SEARCH_META_KEYS.state,
    "READY",
  );
}

function assertVersionCounts(
  processedVerses: number,
  blivreVerses: number,
  alm1911Verses: number,
): void {
  if (processedVerses !== BIBLE_SEED_CONTRACT.verseRows) {
    throw new Error(
      `BIBLE_SEARCH_DOCUMENT_COUNT_MISMATCH:EXPECTED=${BIBLE_SEED_CONTRACT.verseRows}:ACTUAL=${processedVerses}`,
    );
  }

  if (
    blivreVerses !==
      BIBLE_SEED_CONTRACT.versions.BLIVRE.verseCount ||
    alm1911Verses !==
      BIBLE_SEED_CONTRACT.versions.ALM1911.verseCount
  ) {
    throw new Error(
      `BIBLE_SEARCH_VERSION_COUNT_MISMATCH:BLIVRE=${blivreVerses}:ALM1911=${alm1911Verses}`,
    );
  }
}

async function rebuildPortableSearchIndex(
  database: SQLiteDatabase,
): Promise<void> {
  let processedVerses = 0;
  let blivreVerses = 0;
  let alm1911Verses = 0;
  let nextDocumentId = 1;

  await database.withTransactionAsync(async () => {
    await clearPortableSearchTables(database);

    await writeSearchMeta(
      database,
      SEARCH_META_KEYS.state,
      "BUILDING",
    );

    let lastRowId = 0;

    while (true) {
      const verses = await database.getAllAsync<SourceVerseRow>(
        `SELECT
           rowid AS source_rowid,
           version_id,
           book_id,
           chapter,
           verse,
           text
         FROM bible_verses
        WHERE rowid > ?
        ORDER BY rowid
        LIMIT ?;`,
        [lastRowId, BIBLE_SEARCH_BUILD_BATCH_SIZE],
      );

      if (verses.length === 0) {
        break;
      }

      const documentRows: SearchBindValue[][] = [];

      for (const row of verses) {
        documentRows.push([
          nextDocumentId,
          row.version_id,
          row.book_id,
          row.chapter,
          row.verse,
          normalizeBibleSearchText(row.text),
        ]);

        nextDocumentId += 1;
        processedVerses += 1;

        if (row.version_id === "BLIVRE") {
          blivreVerses += 1;
        } else if (row.version_id === "ALM1911") {
          alm1911Verses += 1;
        }
      }

      await insertRows(
        database,
        `INSERT INTO bible_search_documents(
          document_id,
          version_id,
          book_id,
          chapter,
          verse,
          normalized_text
        )`,
        6,
        documentRows,
      );

      const lastVerse = verses[verses.length - 1];

      if (!lastVerse) {
        throw new Error("BIBLE_SEARCH_BATCH_LAST_ROW_MISSING");
      }

      lastRowId = lastVerse.source_rowid;
    }

    assertVersionCounts(
      processedVerses,
      blivreVerses,
      alm1911Verses,
    );

    await writeReadyMeta(
      database,
      "PORTABLE_SQLITE",
      processedVerses,
      blivreVerses,
      alm1911Verses,
      0,
      0,
    );
  });
}

async function rebuildNativeFtsIndex(
  database: SQLiteDatabase,
): Promise<void> {
  let processedVerses = 0;
  let blivreVerses = 0;
  let alm1911Verses = 0;

  await database.withTransactionAsync(async () => {
    // Native uses FTS5 only; keep the portable structures empty to avoid
    // duplicating tens of MiB of search data on Android/iOS.
    await clearPortableSearchTables(database);
    await database.runAsync(
      `DELETE FROM ${BIBLE_SEARCH_FTS_TABLE};`,
    );

    await writeSearchMeta(
      database,
      SEARCH_META_KEYS.state,
      "BUILDING",
    );

    let lastRowId = 0;

    while (true) {
      const verses = await database.getAllAsync<SourceVerseRow>(
        `SELECT
           rowid AS source_rowid,
           version_id,
           book_id,
           chapter,
           verse,
           text
         FROM bible_verses
        WHERE rowid > ?
        ORDER BY rowid
        LIMIT ?;`,
        [lastRowId, BIBLE_SEARCH_BUILD_BATCH_SIZE],
      );

      if (verses.length === 0) {
        break;
      }

      const ftsRows: SearchBindValue[][] = [];

      for (const row of verses) {
        ftsRows.push([
          normalizeBibleSearchText(row.text),
          row.version_id,
          row.book_id,
          row.chapter,
          row.verse,
        ]);

        processedVerses += 1;

        if (row.version_id === "BLIVRE") {
          blivreVerses += 1;
        } else if (row.version_id === "ALM1911") {
          alm1911Verses += 1;
        }
      }

      await insertRows(
        database,
        `INSERT INTO ${BIBLE_SEARCH_FTS_TABLE}(
          normalized_text,
          version_id,
          book_id,
          chapter,
          verse
        )`,
        5,
        ftsRows,
      );

      const lastVerse = verses[verses.length - 1];

      if (!lastVerse) {
        throw new Error("BIBLE_SEARCH_BATCH_LAST_ROW_MISSING");
      }

      lastRowId = lastVerse.source_rowid;
    }

    assertVersionCounts(
      processedVerses,
      blivreVerses,
      alm1911Verses,
    );

    await writeReadyMeta(
      database,
      "FTS5",
      processedVerses,
      blivreVerses,
      alm1911Verses,
      0,
      0,
    );
  });
}

async function rebuildSearchIndex(
  database: SQLiteDatabase,
  backend: SearchBackend,
): Promise<BibleSearchIndexReadyResult> {
  if (backend === "FTS5") {
    await rebuildNativeFtsIndex(database);
  } else {
    await rebuildPortableSearchIndex(database);
  }

  const ready = await isSearchIndexReady(
    database,
    backend,
  );

  if (!ready) {
    throw new Error(
      "BIBLE_SEARCH_INDEX_VALIDATION_FAILED_AFTER_REBUILD",
    );
  }

  return {
    ...ready,
    rebuilt: true,
  };
}

export async function ensureBibleSearchIndexReady(
  database: SQLiteDatabase,
): Promise<BibleSearchIndexReadyResult> {
  const backend = expectedBackend();
  const nativeFts5 = await ensureNativeFts5Table(database);

  if (backend === "FTS5" && !nativeFts5) {
    throw new Error(
      "BIBLE_SEARCH_NATIVE_FTS5_REQUIRED_BUT_UNAVAILABLE",
    );
  }

  const ready = await isSearchIndexReady(
    database,
    backend,
  );

  if (ready) {
    return ready;
  }

  return rebuildSearchIndex(database, backend);
}
