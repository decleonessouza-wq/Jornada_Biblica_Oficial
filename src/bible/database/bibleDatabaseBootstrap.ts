/**
 * Bootstrap transacional e idempotente da infraestrutura SQLite bíblica.
 *
 * Este módulo prepara somente a estrutura local:
 * - abre a conexão;
 * - habilita WAL e foreign keys;
 * - executa migrations;
 * - valida versão, tabelas canônicas e integridade de foreign keys.
 *
 * Seed do corpus, FTS, integração com navegação e UI ficam em gates próprios.
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

const BIBLE_DATABASE_REQUIRED_TABLES = [
  "bible_meta",
  "bible_versions",
  "bible_books",
  "bible_chapters",
  "bible_verses",
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

let bootstrapPromise: Promise<SQLiteDatabase> | null = null;

async function validateBibleDatabase(
  database: SQLiteDatabase,
): Promise<void> {
  const userVersion = await getBibleDatabaseUserVersion(database);

  if (userVersion !== BIBLE_DATABASE_SCHEMA_VERSION) {
    throw new Error(
      `Bible database user_version ${userVersion} does not match schema version ${BIBLE_DATABASE_SCHEMA_VERSION}.`,
    );
  }

  const foreignKeys =
    await database.getFirstAsync<BibleForeignKeysPragmaRow>(
      "PRAGMA foreign_keys;",
    );

  if (foreignKeys?.foreign_keys !== 1) {
    throw new Error("Bible database foreign key enforcement is not enabled.");
  }

  const placeholders = BIBLE_DATABASE_REQUIRED_TABLES.map(() => "?").join(", ");

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

  const foreignKeyViolations =
    await database.getAllAsync<BibleForeignKeyViolationRow>(
      "PRAGMA foreign_key_check;",
    );

  if (foreignKeyViolations.length > 0) {
    throw new Error(
      `Bible database foreign_key_check found ${foreignKeyViolations.length} violation(s).`,
    );
  }
}

async function performBibleDatabaseBootstrap(): Promise<SQLiteDatabase> {
  try {
    const database = await openBibleDatabaseConnection();

    await database.execAsync("PRAGMA journal_mode = WAL;");
    await database.execAsync("PRAGMA foreign_keys = ON;");

    await runBibleDatabaseMigrations(database);
    await validateBibleDatabase(database);

    return database;
  } catch (error) {
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

  void currentBootstrap.then(
    () => {
      if (bootstrapPromise === currentBootstrap) {
        bootstrapPromise = null;
      }
    },
    () => {
      if (bootstrapPromise === currentBootstrap) {
        bootstrapPromise = null;
      }
    },
  );

  return currentBootstrap;
}
