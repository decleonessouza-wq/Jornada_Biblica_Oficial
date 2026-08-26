/**
 * Bootstrap transacional e idempotente do banco bíblico offline.
 *
 * O seed validado é instalado antes da abertura da conexão. Depois disso:
 * - WAL e foreign keys são habilitados;
 * - migrations estruturais promovem a cópia runtime até o schema atual;
 * - schema, integridade, proveniência e contagens do corpus são validados.
 *
 * O schema do seed empacotado e o schema runtime são conceitos distintos:
 * o seed permanece v1 e a cópia instalada pode avançar por migrations.
 *
 * A infraestrutura de busca materializa o backend apropriado por plataforma:
 * FTS5 no nativo e índice compacto portátil no Web. Navegação/UI permanecem
 * fora deste módulo.
 */

import type { SQLiteDatabase } from "expo-sqlite";

import {
  closeBibleDatabaseConnection,
  openBibleDatabaseConnection,
} from "./bibleDatabaseConnection";
import {
  getBibleDatabaseUserVersion,
  runBibleDatabaseMigrations,
} from "./bibleDatabaseMigrations";
import { BIBLE_DATABASE_SCHEMA_VERSION } from "./bibleDatabaseSchema";
import {
  BIBLE_SEED_CONTRACT,
  confirmBibleSeedInstallationValidated,
  invalidateBibleSeedInstallationValidation,
} from "./bibleDatabaseSeed";
import { ensureBibleSearchIndexReady } from "./bibleSearchIndex";

const BIBLE_DATABASE_REQUIRED_TABLES = [
  "bible_meta",
  "bible_versions",
  "bible_books",
  "bible_chapters",
  "bible_verses",
  "bible_search_documents",
  "bible_search_dictionary",
  "bible_search_postings",
] as const;

type BibleForeignKeysPragmaRow = Readonly<{
  foreign_keys: number;
}>;

type BibleSqliteMasterRow = Readonly<{
  name: string;
}>;

type BibleForeignKeyViolationRow = Readonly<{
  table: string;
  rowid: number | null;
  parent: string;
  fkid: number;
}>;

type BibleIntegrityCheckRow = Readonly<{
  integrity_check: string;
}>;

type BibleCountRow = Readonly<{
  count: number;
}>;

type BibleVersionProvenanceRow = Readonly<{
  id: "BLIVRE" | "ALM1911";
  source_sha256: string;
  normalized_sha256: string;
  importer_version: number;
  installed_at: string;
  verse_count: number;
  enabled: number;
}>;

type BibleMetaRow = Readonly<{
  key: string;
  value: string;
}>;

let bootstrapPromise: Promise<SQLiteDatabase> | null = null;

async function getCount(
  database: SQLiteDatabase,
  sql: string,
  params: readonly (string | number)[] = [],
): Promise<number> {
  const row = await database.getFirstAsync<BibleCountRow>(
    sql,
    [...params],
  );

  if (!row || !Number.isInteger(row.count) || row.count < 0) {
    throw new Error(`BIBLE_DATABASE_INVALID_COUNT:${sql}`);
  }

  return row.count;
}

async function validateBibleDatabase(
  database: SQLiteDatabase,
): Promise<void> {
  const userVersion = await getBibleDatabaseUserVersion(database);

  if (userVersion !== BIBLE_DATABASE_SCHEMA_VERSION) {
    throw new Error(
      `Bible database user_version ${userVersion} does not match schema version ${BIBLE_DATABASE_SCHEMA_VERSION}.`,
    );
  }

  if (BIBLE_SEED_CONTRACT.schemaVersion > BIBLE_DATABASE_SCHEMA_VERSION) {
    throw new Error(
      `BIBLE_DATABASE_SEED_SCHEMA_NEWER_THAN_RUNTIME:SEED=${BIBLE_SEED_CONTRACT.schemaVersion}:RUNTIME=${BIBLE_DATABASE_SCHEMA_VERSION}`,
    );
  }

  const foreignKeys =
    await database.getFirstAsync<BibleForeignKeysPragmaRow>(
      "PRAGMA foreign_keys;",
    );

  if (foreignKeys?.foreign_keys !== 1) {
    throw new Error("Bible database foreign key enforcement is not enabled.");
  }

  const placeholders =
    BIBLE_DATABASE_REQUIRED_TABLES.map(() => "?").join(", ");

  const tableRows = await database.getAllAsync<BibleSqliteMasterRow>(
    `SELECT name
       FROM sqlite_master
      WHERE type = 'table'
        AND name IN (${placeholders});`,
    [...BIBLE_DATABASE_REQUIRED_TABLES],
  );

  const presentTables = new Set(tableRows.map((row) => row.name));
  const missingTables = BIBLE_DATABASE_REQUIRED_TABLES.filter(
    (tableName) => !presentTables.has(tableName),
  );

  if (missingTables.length > 0) {
    throw new Error(
      `Bible database is missing required tables: ${missingTables.join(", ")}.`,
    );
  }

  const integrityRows =
    await database.getAllAsync<BibleIntegrityCheckRow>(
      "PRAGMA integrity_check;",
    );

  if (
    integrityRows.length !== 1 ||
    integrityRows[0]?.integrity_check.toLowerCase() !== "ok"
  ) {
    throw new Error(
      `BIBLE_DATABASE_INTEGRITY_CHECK_FAILED:${JSON.stringify(integrityRows)}`,
    );
  }

  const foreignKeyViolations =
    await database.getAllAsync<BibleForeignKeyViolationRow>(
      "PRAGMA foreign_key_check;",
    );

  if (foreignKeyViolations.length > 0) {
    throw new Error(
      `Bible database foreign_key_check found ${foreignKeyViolations.length} violation(s).`,
    );
  }

  const expectedCounts = [
    [
      "versions",
      await getCount(
        database,
        "SELECT COUNT(*) AS count FROM bible_versions;",
      ),
      BIBLE_SEED_CONTRACT.versionRows,
    ],
    [
      "books",
      await getCount(
        database,
        "SELECT COUNT(*) AS count FROM bible_books;",
      ),
      BIBLE_SEED_CONTRACT.bookRows,
    ],
    [
      "chapters",
      await getCount(
        database,
        "SELECT COUNT(*) AS count FROM bible_chapters;",
      ),
      BIBLE_SEED_CONTRACT.chapterRows,
    ],
    [
      "verses",
      await getCount(
        database,
        "SELECT COUNT(*) AS count FROM bible_verses;",
      ),
      BIBLE_SEED_CONTRACT.verseRows,
    ],
  ] as const;

  for (const [label, actual, expected] of expectedCounts) {
    if (actual !== expected) {
      throw new Error(
        `BIBLE_DATABASE_COUNT_MISMATCH:${label}:EXPECTED=${expected}:ACTUAL=${actual}`,
      );
    }
  }

  for (
    const versionId of ["BLIVRE", "ALM1911"] as const
  ) {
    const versionContract = BIBLE_SEED_CONTRACT.versions[versionId];

    const verseCount = await getCount(
      database,
      "SELECT COUNT(*) AS count FROM bible_verses WHERE version_id = ?;",
      [versionId],
    );

    const chapterCount = await getCount(
      database,
      "SELECT COUNT(*) AS count FROM bible_chapters WHERE version_id = ?;",
      [versionId],
    );

    if (verseCount !== versionContract.verseCount) {
      throw new Error(
        `BIBLE_DATABASE_VERSION_VERSE_COUNT_MISMATCH:${versionId}:EXPECTED=${versionContract.verseCount}:ACTUAL=${verseCount}`,
      );
    }

    if (chapterCount !== versionContract.chapterCount) {
      throw new Error(
        `BIBLE_DATABASE_VERSION_CHAPTER_COUNT_MISMATCH:${versionId}:EXPECTED=${versionContract.chapterCount}:ACTUAL=${chapterCount}`,
      );
    }
  }

  const versionRows =
    await database.getAllAsync<BibleVersionProvenanceRow>(
      `SELECT
         id,
         source_sha256,
         normalized_sha256,
         importer_version,
         installed_at,
         verse_count,
         enabled
       FROM bible_versions
       ORDER BY CASE id
         WHEN 'BLIVRE' THEN 1
         WHEN 'ALM1911' THEN 2
         ELSE 99
       END;`,
    );

  if (versionRows.length !== BIBLE_SEED_CONTRACT.versionRows) {
    throw new Error(
      `BIBLE_DATABASE_VERSION_PROVENANCE_ROW_COUNT:${versionRows.length}`,
    );
  }

  for (const row of versionRows) {
    const expected = BIBLE_SEED_CONTRACT.versions[row.id];

    if (
      row.source_sha256 !== expected.sourceSha256 ||
      row.normalized_sha256 !== expected.normalizedSha256 ||
      row.importer_version !== 1 ||
      row.installed_at !== BIBLE_SEED_CONTRACT.installedAtSentinel ||
      row.verse_count !== expected.verseCount ||
      row.enabled !== 1
    ) {
      throw new Error(
        `BIBLE_DATABASE_VERSION_PROVENANCE_MISMATCH:${row.id}`,
      );
    }
  }

  const metaRows = await database.getAllAsync<BibleMetaRow>(
    "SELECT key, value FROM bible_meta;",
  );
  const meta = new Map(metaRows.map((row) => [row.key, row.value]));

  const requiredMeta = new Map<string, string>([
    ["seed_contract_version", String(BIBLE_SEED_CONTRACT.contractVersion)],
    ["seed_schema_version", String(BIBLE_SEED_CONTRACT.schemaVersion)],
    ["seed_installed_at_sentinel", BIBLE_SEED_CONTRACT.installedAtSentinel],
    ["blivre_source_sha256", BIBLE_SEED_CONTRACT.versions.BLIVRE.sourceSha256],
    [
      "blivre_normalized_sha256",
      BIBLE_SEED_CONTRACT.versions.BLIVRE.normalizedSha256,
    ],
    ["alm1911_source_sha256", BIBLE_SEED_CONTRACT.versions.ALM1911.sourceSha256],
    [
      "alm1911_normalized_sha256",
      BIBLE_SEED_CONTRACT.versions.ALM1911.normalizedSha256,
    ],
    ["fts_phase", "7"],
  ]);

  for (const [key, expected] of requiredMeta) {
    if (meta.get(key) !== expected) {
      throw new Error(
        `BIBLE_DATABASE_META_MISMATCH:${key}:EXPECTED=${expected}:ACTUAL=${meta.get(key) ?? "MISSING"}`,
      );
    }
  }
}

async function performBibleDatabaseBootstrap(): Promise<SQLiteDatabase> {
  try {
    const database = await openBibleDatabaseConnection();

    await database.execAsync("PRAGMA journal_mode = WAL;");
    await database.execAsync("PRAGMA foreign_keys = ON;");

    await runBibleDatabaseMigrations(database);
    await ensureBibleSearchIndexReady(database);
    await validateBibleDatabase(database);
    confirmBibleSeedInstallationValidated();

    return database;
  } catch (error) {
    invalidateBibleSeedInstallationValidation();

    try {
      await closeBibleDatabaseConnection();
    } catch {
      // Preserve the bootstrap failure as the primary error.
    }

    throw error;
  }
}

export function bootstrapBibleDatabase(): Promise<SQLiteDatabase> {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  const currentBootstrap = performBibleDatabaseBootstrap();
  bootstrapPromise = currentBootstrap;

  void currentBootstrap.catch(() => {
    if (bootstrapPromise === currentBootstrap) {
      bootstrapPromise = null;
    }
  });

  return currentBootstrap;
}
