/**
 * Runner sequencial de migrations do banco offline da Harpa.
 *
 * Regras:
 * - PRAGMA user_version é a autoridade estrutural;
 * - banco mais novo que o app falha fechado;
 * - cada migration executa dentro de transação;
 * - versão só avança depois do corpo concluir;
 * - seed, conexão, bootstrap e queries de domínio não pertencem aqui.
 */

import type { SQLiteDatabase } from "expo-sqlite";

import {
  HYMNAL_DATABASE_SCHEMA_V1_SQL,
  HYMNAL_DATABASE_SCHEMA_VERSION,
} from "./hymnalDatabaseSchema";

type HymnalDatabaseUserVersionRow = Readonly<{
  user_version: number;
}>;

type HymnalDatabaseMigration = Readonly<{
  version: number;
  up: (
    database: SQLiteDatabase,
  ) => Promise<void>;
}>;

const HYMNAL_DATABASE_MIGRATIONS:
  readonly HymnalDatabaseMigration[] = [
    {
      version: 1,
      up: async (database) => {
        await database.execAsync(
          HYMNAL_DATABASE_SCHEMA_V1_SQL,
        );
      },
    },
  ] as const;

export async function getHymnalDatabaseUserVersion(
  database: SQLiteDatabase,
): Promise<number> {
  const row =
    await database.getFirstAsync<HymnalDatabaseUserVersionRow>(
      "PRAGMA user_version;",
    );

  if (
    !row ||
    !Number.isInteger(row.user_version) ||
    row.user_version < 0
  ) {
    throw new Error(
      "HYMNAL_DATABASE_INVALID_USER_VERSION",
    );
  }

  return row.user_version;
}

export async function runHymnalDatabaseMigrations(
  database: SQLiteDatabase,
): Promise<void> {
  const currentVersion =
    await getHymnalDatabaseUserVersion(
      database,
    );

  if (
    currentVersion >
    HYMNAL_DATABASE_SCHEMA_VERSION
  ) {
    throw new Error(
      `HYMNAL_DATABASE_NEWER_THAN_SUPPORTED:CURRENT=${currentVersion}:SUPPORTED=${HYMNAL_DATABASE_SCHEMA_VERSION}`,
    );
  }

  if (
    currentVersion ===
    HYMNAL_DATABASE_SCHEMA_VERSION
  ) {
    return;
  }

  for (
    let targetVersion = currentVersion + 1;
    targetVersion <=
    HYMNAL_DATABASE_SCHEMA_VERSION;
    targetVersion += 1
  ) {
    const migration =
      HYMNAL_DATABASE_MIGRATIONS.find(
        (candidate) =>
          candidate.version === targetVersion,
      );

    if (!migration) {
      throw new Error(
        `HYMNAL_DATABASE_MIGRATION_MISSING:${targetVersion}`,
      );
    }

    await database.withTransactionAsync(
      async () => {
        await migration.up(database);

        await database.execAsync(
          `PRAGMA user_version = ${migration.version};`,
        );

        const appliedVersion =
          await getHymnalDatabaseUserVersion(
            database,
          );

        if (
          appliedVersion !==
          migration.version
        ) {
          throw new Error(
            `HYMNAL_DATABASE_MIGRATION_VERSION_NOT_PERSISTED:EXPECTED=${migration.version}:ACTUAL=${appliedVersion}`,
          );
        }
      },
    );
  }

  const finalVersion =
    await getHymnalDatabaseUserVersion(
      database,
    );

  if (
    finalVersion !==
    HYMNAL_DATABASE_SCHEMA_VERSION
  ) {
    throw new Error(
      `HYMNAL_DATABASE_MIGRATION_FINAL_VERSION_MISMATCH:EXPECTED=${HYMNAL_DATABASE_SCHEMA_VERSION}:ACTUAL=${finalVersion}`,
    );
  }
}
