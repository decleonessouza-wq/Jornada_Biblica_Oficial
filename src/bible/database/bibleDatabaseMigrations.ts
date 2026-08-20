/**
 * Runner sequencial de migrations do banco bíblico offline.
 *
 * Regras:
 * - PRAGMA user_version é a autoridade de versão estrutural;
 * - banco mais novo que o app falha fechado;
 * - cada migration roda dentro de transação;
 * - a versão só avança depois do corpo da migration concluir;
 * - FTS, seed do corpus e queries de repository não pertencem a este módulo.
 */

import type { SQLiteDatabase } from "expo-sqlite";

import {
  BIBLE_DATABASE_SCHEMA_SQL,
  BIBLE_DATABASE_SCHEMA_VERSION,
} from "./bibleDatabaseSchema";

type BibleDatabaseUserVersionRow = Readonly<{
  user_version: number;
}>;

type BibleDatabaseMigration = Readonly<{
  version: number;
  up: (database: SQLiteDatabase) => Promise<void>;
}>;

const BIBLE_DATABASE_MIGRATIONS: readonly BibleDatabaseMigration[] = [
  {
    version: 1,
    up: async (database) => {
      await database.execAsync(BIBLE_DATABASE_SCHEMA_SQL);
    },
  },
] as const;

export async function getBibleDatabaseUserVersion(
  database: SQLiteDatabase,
): Promise<number> {
  const row =
    await database.getFirstAsync<BibleDatabaseUserVersionRow>(
      "PRAGMA user_version;",
    );

  if (!row || !Number.isInteger(row.user_version) || row.user_version < 0) {
    throw new Error("Invalid PRAGMA user_version returned by Bible database.");
  }

  return row.user_version;
}

export async function runBibleDatabaseMigrations(
  database: SQLiteDatabase,
): Promise<void> {
  const currentVersion = await getBibleDatabaseUserVersion(database);

  if (currentVersion > BIBLE_DATABASE_SCHEMA_VERSION) {
    throw new Error(
      `Bible database version ${currentVersion} is newer than supported version ${BIBLE_DATABASE_SCHEMA_VERSION}.`,
    );
  }

  if (currentVersion === BIBLE_DATABASE_SCHEMA_VERSION) {
    return;
  }

  for (
    let targetVersion = currentVersion + 1;
    targetVersion <= BIBLE_DATABASE_SCHEMA_VERSION;
    targetVersion += 1
  ) {
    const migration = BIBLE_DATABASE_MIGRATIONS.find(
      (candidate) => candidate.version === targetVersion,
    );

    if (!migration) {
      throw new Error(
        `Missing Bible database migration for version ${targetVersion}.`,
      );
    }

    await database.withTransactionAsync(async () => {
      await migration.up(database);
      await database.execAsync(`PRAGMA user_version = ${migration.version};`);

      const appliedVersion = await getBibleDatabaseUserVersion(database);

      if (appliedVersion !== migration.version) {
        throw new Error(
          `Bible database migration ${migration.version} did not persist user_version.`,
        );
      }
    });
  }

  const finalVersion = await getBibleDatabaseUserVersion(database);

  if (finalVersion !== BIBLE_DATABASE_SCHEMA_VERSION) {
    throw new Error(
      `Bible database migration ended at version ${finalVersion}; expected ${BIBLE_DATABASE_SCHEMA_VERSION}.`,
    );
  }
}
