/**
 * Bootstrap inicial e idempotente do Personal SQLite.
 *
 * A F14 prepara a infraestrutura física e estrutural do banco mutável:
 * - abre a conexão compartilhada;
 * - habilita WAL;
 * - habilita foreign keys;
 * - executa as migrations estruturais suportadas;
 * - valida o estado mínimo da conexão.
 *
 * Tabelas e dados de features pertencem às respectivas fases proprietárias.
 */

import type { SQLiteDatabase } from "expo-sqlite";

import {
  closePersonalDatabaseConnection,
  openPersonalDatabaseConnection,
} from "./personalDatabaseConnection";
import { runPersonalDatabaseMigrations } from "./personalDatabaseMigrations";

type PersonalForeignKeysPragmaRow = Readonly<{
  foreign_keys: number;
}>;

let bootstrapPromise: Promise<SQLiteDatabase> | null = null;

async function validatePersonalDatabaseConnection(
  database: SQLiteDatabase,
): Promise<void> {
  const foreignKeys =
    await database.getFirstAsync<PersonalForeignKeysPragmaRow>(
      "PRAGMA foreign_keys;",
    );

  if (foreignKeys?.foreign_keys !== 1) {
    throw new Error("PERSONAL_DATABASE_FOREIGN_KEYS_NOT_ENABLED");
  }
}

async function performPersonalDatabaseBootstrap(): Promise<SQLiteDatabase> {
  try {
    const database = await openPersonalDatabaseConnection();

    await database.execAsync("PRAGMA journal_mode = WAL;");
    await database.execAsync("PRAGMA foreign_keys = ON;");

    await runPersonalDatabaseMigrations(database);
    await validatePersonalDatabaseConnection(database);

    return database;
  } catch (error) {
    try {
      await closePersonalDatabaseConnection();
    } catch {
      // Preserve a falha do bootstrap como erro principal.
    }

    throw error;
  }
}

export function bootstrapPersonalDatabase(): Promise<SQLiteDatabase> {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  const currentBootstrap = performPersonalDatabaseBootstrap();
  bootstrapPromise = currentBootstrap;

  void currentBootstrap.catch(() => {
    if (bootstrapPromise === currentBootstrap) {
      bootstrapPromise = null;
    }
  });

  return currentBootstrap;
}
