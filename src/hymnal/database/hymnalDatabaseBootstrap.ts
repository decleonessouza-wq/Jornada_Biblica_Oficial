/**
 * Transactional, idempotent bootstrap for the Harpa offline database.
 *
 * Flow:
 * - packaged seed installation occurs before connection open;
 * - WAL and foreign keys are enabled;
 * - structural migrations promote the runtime copy;
 * - schema, integrity, tables, corpus counts, provenance, and edition
 *   metadata are validated fail closed;
 * - the platform search index is materialized before final validation;
 * - repository queries and presentation layers remain excluded.
 */

import type {
  SQLiteDatabase,
} from "expo-sqlite";

import {
  HARPA_CRISTA_JORNADA_EDITION_METADATA,
} from "../catalog/harpaCristaEditionMetadata";
import {
  closeHymnalDatabaseConnection,
  openHymnalDatabaseConnection,
} from "./hymnalDatabaseConnection";
import {
  getHymnalDatabaseUserVersion,
  runHymnalDatabaseMigrations,
} from "./hymnalDatabaseMigrations";
import {
  HYMNAL_DATABASE_SCHEMA_VERSION,
} from "./hymnalDatabaseSchema";
import {
  HYMNAL_SEED_CONTRACT,
  confirmHymnalSeedInstallationValidated,
  invalidateHymnalSeedInstallationValidation,
} from "./hymnalDatabaseSeed";
import {
  ensureHymnalSearchIndexReady,
  type HymnalSearchIndexReadyResult,
} from "./hymnalSearchIndex";

const HYMNAL_DATABASE_REQUIRED_TABLES = [
  "hymnal_meta",
  "hymnal_editions",
  "hymnal_installations",
  "hymns",
  "hymn_sections",
  "hymnal_search_documents",
  "hymnal_search_dictionary",
  "hymnal_search_postings",
] as const;

type CountRow = Readonly<{
  count: number;
}>;

type ForeignKeysPragmaRow = Readonly<{
  foreign_keys: number;
}>;

type SqliteMasterRow = Readonly<{
  name: string;
}>;

type IntegrityCheckRow = Readonly<{
  integrity_check: string;
}>;

type ForeignKeyViolationRow = Readonly<{
  table: string;
  rowid: number | null;
  parent: string;
  fkid: number;
}>;

type HymnalEditionRow = Readonly<{
  id: string;
  code: string;
  display_name: string;
  language_tag: string;
  publication_year: number | null;
  expected_hymn_count: number;
  rights_kind: string;
  authorization_status: string;
  rights_identifier: string | null;
  attribution_required: number;
  enabled: number;
}>;

type HymnalInstallationRow = Readonly<{
  edition_id: string;
  content_version: string;
  source_kind: string;
  source_artifact: string;
  source_sha256: string;
  normalized_sha256: string;
  importer_version: number;
  installed_at: string;
  hymn_count: number;
}>;

type HymnalNumberStatsRow = Readonly<{
  min_number: number | null;
  max_number: number | null;
  distinct_numbers: number;
}>;

let bootstrapPromise: Promise<SQLiteDatabase> | null = null;

async function getCount(
  database: SQLiteDatabase,
  sql: string,
  params: readonly (string | number)[] = [],
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
      `HYMNAL_DATABASE_INVALID_COUNT:${sql}`,
    );
  }

  return row.count;
}

async function validateRequiredTables(
  database: SQLiteDatabase,
): Promise<void> {
  const placeholders =
    HYMNAL_DATABASE_REQUIRED_TABLES
      .map(() => "?")
      .join(", ");

  const rows =
    await database.getAllAsync<SqliteMasterRow>(
      `SELECT name
         FROM sqlite_master
        WHERE type = 'table'
          AND name IN (${placeholders});`,
      [...HYMNAL_DATABASE_REQUIRED_TABLES],
    );

  const present = new Set(
    rows.map((row) => row.name),
  );

  const missing =
    HYMNAL_DATABASE_REQUIRED_TABLES.filter(
      (name) => !present.has(name),
    );

  if (missing.length > 0) {
    throw new Error(
      `HYMNAL_DATABASE_REQUIRED_TABLE_MISSING:${missing.join(",")}`,
    );
  }
}

async function validateIntegrity(
  database: SQLiteDatabase,
): Promise<void> {
  const integrityRows =
    await database.getAllAsync<IntegrityCheckRow>(
      "PRAGMA integrity_check;",
    );

  if (
    integrityRows.length !== 1 ||
    integrityRows[0]?.integrity_check.toLowerCase() !== "ok"
  ) {
    throw new Error(
      `HYMNAL_DATABASE_INTEGRITY_CHECK_FAILED:${JSON.stringify(integrityRows)}`,
    );
  }

  const violations =
    await database.getAllAsync<ForeignKeyViolationRow>(
      "PRAGMA foreign_key_check;",
    );

  if (violations.length > 0) {
    throw new Error(
      `HYMNAL_DATABASE_FOREIGN_KEY_CHECK_FAILED:${violations.length}`,
    );
  }
}

async function validateCorpusCounts(
  database: SQLiteDatabase,
): Promise<void> {
  const checks = [
    [
      "editions",
      await getCount(
        database,
        "SELECT COUNT(*) AS count FROM hymnal_editions;",
      ),
      HYMNAL_SEED_CONTRACT.editionRows,
    ],
    [
      "installations",
      await getCount(
        database,
        "SELECT COUNT(*) AS count FROM hymnal_installations;",
      ),
      HYMNAL_SEED_CONTRACT.installationRows,
    ],
    [
      "hymns",
      await getCount(
        database,
        "SELECT COUNT(*) AS count FROM hymns;",
      ),
      HYMNAL_SEED_CONTRACT.hymnRows,
    ],
    [
      "sections",
      await getCount(
        database,
        "SELECT COUNT(*) AS count FROM hymn_sections;",
      ),
      HYMNAL_SEED_CONTRACT.sectionRows,
    ],
  ] as const;

  for (const [label, actual, expected] of checks) {
    if (actual !== expected) {
      throw new Error(
        `HYMNAL_DATABASE_COUNT_MISMATCH:${label}:EXPECTED=${expected}:ACTUAL=${actual}`,
      );
    }
  }

  const stats =
    await database.getFirstAsync<HymnalNumberStatsRow>(
      `SELECT
         MIN(number) AS min_number,
         MAX(number) AS max_number,
         COUNT(DISTINCT number) AS distinct_numbers
       FROM hymns
       WHERE edition_id = ?;`,
      [HYMNAL_SEED_CONTRACT.editionId],
    );

  if (
    !stats ||
    stats.min_number !== 1 ||
    stats.max_number !== HYMNAL_SEED_CONTRACT.hymnRows ||
    stats.distinct_numbers !== HYMNAL_SEED_CONTRACT.hymnRows
  ) {
    throw new Error(
      `HYMNAL_DATABASE_NUMBER_RANGE_MISMATCH:${JSON.stringify(stats)}`,
    );
  }
}

async function validateEditionMetadata(
  database: SQLiteDatabase,
): Promise<void> {
  const row =
    await database.getFirstAsync<HymnalEditionRow>(
      `SELECT
         id,
         code,
         display_name,
         language_tag,
         publication_year,
         expected_hymn_count,
         rights_kind,
         authorization_status,
         rights_identifier,
         attribution_required,
         enabled
       FROM hymnal_editions
       WHERE id = ?;`,
      [HYMNAL_SEED_CONTRACT.editionId],
    );

  const expected =
    HARPA_CRISTA_JORNADA_EDITION_METADATA;

  if (
    !row ||
    row.id !== expected.id ||
    row.code !== expected.code ||
    row.display_name !== expected.displayName ||
    row.language_tag !== expected.languageTag ||
    row.publication_year !== expected.publicationYear ||
    row.expected_hymn_count !== expected.expectedHymnCount ||
    row.rights_kind !== expected.rightsKind ||
    row.authorization_status !== expected.authorizationStatus ||
    row.rights_identifier !== expected.rightsIdentifier ||
    row.attribution_required !==
      (expected.attributionRequired ? 1 : 0) ||
    row.enabled !== 1
  ) {
    throw new Error(
      `HYMNAL_DATABASE_EDITION_METADATA_MISMATCH:${JSON.stringify(row)}`,
    );
  }
}

async function validateInstallationProvenance(
  database: SQLiteDatabase,
): Promise<void> {
  const row =
    await database.getFirstAsync<HymnalInstallationRow>(
      `SELECT
         edition_id,
         content_version,
         source_kind,
         source_artifact,
         source_sha256,
         normalized_sha256,
         importer_version,
         installed_at,
         hymn_count
       FROM hymnal_installations
       WHERE edition_id = ?;`,
      [HYMNAL_SEED_CONTRACT.editionId],
    );

  if (
    !row ||
    row.edition_id !== HYMNAL_SEED_CONTRACT.editionId ||
    row.content_version !== HYMNAL_SEED_CONTRACT.contentVersion ||
    row.source_kind !== HYMNAL_SEED_CONTRACT.sourceKind ||
    row.source_artifact !== HYMNAL_SEED_CONTRACT.sourceArtifact ||
    row.source_sha256 !== HYMNAL_SEED_CONTRACT.sourceSha256 ||
    row.normalized_sha256 !== HYMNAL_SEED_CONTRACT.normalizedSha256 ||
    row.importer_version !== HYMNAL_SEED_CONTRACT.importerVersion ||
    row.installed_at !== HYMNAL_SEED_CONTRACT.installedAt ||
    row.hymn_count !== HYMNAL_SEED_CONTRACT.hymnRows
  ) {
    throw new Error(
      `HYMNAL_DATABASE_INSTALLATION_PROVENANCE_MISMATCH:${JSON.stringify(row)}`,
    );
  }
}

function validateSearchIndex(
  result: HymnalSearchIndexReadyResult,
): void {
  if (
    result.documentCount !==
    HYMNAL_SEED_CONTRACT.hymnRows
  ) {
    throw new Error(
      `HYMNAL_DATABASE_SEARCH_DOCUMENT_COUNT_MISMATCH:EXPECTED=${HYMNAL_SEED_CONTRACT.hymnRows}:ACTUAL=${result.documentCount}`,
    );
  }

  if (
    result.backend === "PORTABLE_SQLITE" &&
    (
      result.dictionaryRowCount <= 0 ||
      result.postingRowCount <= 0
    )
  ) {
    throw new Error(
      `HYMNAL_DATABASE_PORTABLE_SEARCH_COUNTS_INVALID:DICTIONARY=${result.dictionaryRowCount}:POSTINGS=${result.postingRowCount}`,
    );
  }

  if (
    result.backend === "FTS5" &&
    (
      result.dictionaryRowCount !== 0 ||
      result.postingRowCount !== 0
    )
  ) {
    throw new Error(
      `HYMNAL_DATABASE_FTS_SEARCH_PORTABLE_COUNTS_NOT_ZERO:DICTIONARY=${result.dictionaryRowCount}:POSTINGS=${result.postingRowCount}`,
    );
  }
}

async function validateHymnalDatabase(
  database: SQLiteDatabase,
  searchIndex: HymnalSearchIndexReadyResult,
): Promise<void> {
  const userVersion =
    await getHymnalDatabaseUserVersion(
      database,
    );

  if (
    userVersion !==
    HYMNAL_DATABASE_SCHEMA_VERSION
  ) {
    throw new Error(
      `HYMNAL_DATABASE_SCHEMA_VERSION_MISMATCH:EXPECTED=${HYMNAL_DATABASE_SCHEMA_VERSION}:ACTUAL=${userVersion}`,
    );
  }

  if (
    HYMNAL_SEED_CONTRACT.schemaVersion >
    HYMNAL_DATABASE_SCHEMA_VERSION
  ) {
    throw new Error(
      `HYMNAL_DATABASE_SEED_SCHEMA_NEWER_THAN_RUNTIME:SEED=${HYMNAL_SEED_CONTRACT.schemaVersion}:RUNTIME=${HYMNAL_DATABASE_SCHEMA_VERSION}`,
    );
  }

  const foreignKeys =
    await database.getFirstAsync<ForeignKeysPragmaRow>(
      "PRAGMA foreign_keys;",
    );

  if (foreignKeys?.foreign_keys !== 1) {
    throw new Error(
      "HYMNAL_DATABASE_FOREIGN_KEYS_NOT_ENABLED",
    );
  }

  await validateRequiredTables(database);
  await validateIntegrity(database);
  await validateCorpusCounts(database);
  await validateEditionMetadata(database);
  await validateInstallationProvenance(database);
  validateSearchIndex(searchIndex);
}

async function performHymnalDatabaseBootstrap(): Promise<SQLiteDatabase> {
  try {
    const database =
      await openHymnalDatabaseConnection();

    await database.execAsync(
      "PRAGMA journal_mode = WAL;",
    );
    await database.execAsync(
      "PRAGMA foreign_keys = ON;",
    );

    await runHymnalDatabaseMigrations(
      database,
    );

    const searchIndex =
      await ensureHymnalSearchIndexReady(
        database,
      );

    await validateHymnalDatabase(
      database,
      searchIndex,
    );

    confirmHymnalSeedInstallationValidated();

    return database;
  } catch (error) {
    invalidateHymnalSeedInstallationValidation();

    try {
      await closeHymnalDatabaseConnection();
    } catch {
      // Preserve the bootstrap failure as the primary error.
    }

    throw error;
  }
}

export function bootstrapHymnalDatabase(): Promise<SQLiteDatabase> {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  const currentBootstrap =
    performHymnalDatabaseBootstrap();

  bootstrapPromise = currentBootstrap;

  void currentBootstrap.catch(() => {
    if (
      bootstrapPromise ===
      currentBootstrap
    ) {
      bootstrapPromise = null;
    }
  });

  return currentBootstrap;
}
