/**
 * Runner sequencial de migrations do banco Personal SQLite.
 *
 * Regras:
 * - PRAGMA user_version é a autoridade de versão estrutural;
 * - banco mais novo que o app falha fechado;
 * - cada migration roda dentro de transação;
 * - a versão só avança depois do corpo da migration concluir;
 * - a versão aplicada é relida e validada ainda dentro da transação;
 * - tabelas de features pertencem às respectivas fases proprietárias.
 */

import type { SQLiteDatabase } from "expo-sqlite";

import { PERSONAL_DATABASE_SCHEMA_VERSION } from "./personalDatabaseSchema";

type PersonalDatabaseUserVersionRow = Readonly<{
  user_version: number;
}>;

type PersonalDatabaseMigration = Readonly<{
  version: number;
  up: (database: SQLiteDatabase) => Promise<void>;
}>;

const PERSONAL_DATABASE_MIGRATIONS: readonly PersonalDatabaseMigration[] = [
  {
    version: 1,
    up: () => Promise.resolve(),
  },
  {
    version: 2,
    up: async (database) => {
      await database.execAsync(`
CREATE TABLE personal_favorites (
  id TEXT PRIMARY KEY NOT NULL,
  target_kind TEXT NOT NULL,
  target_key TEXT NOT NULL,
  created_at_utc TEXT NOT NULL,
  UNIQUE (target_kind, target_key)
);
CREATE INDEX idx_personal_favorites_created_at_utc_id
ON personal_favorites (created_at_utc DESC, id DESC);
`);
    },
  },
  {
    version: 3,
    up: async (database) => {
      await database.execAsync(`
CREATE TABLE personal_journal_entries (
  id TEXT PRIMARY KEY NOT NULL,
  entry_date TEXT NOT NULL UNIQUE,
  reflection_text TEXT NULL,
  gratitude_text TEXT NULL,
  created_at_utc TEXT NOT NULL,
  updated_at_utc TEXT NOT NULL,
  CHECK (
    length(trim(coalesce(reflection_text, ''))) > 0
    OR length(trim(coalesce(gratitude_text, ''))) > 0
  )
);
CREATE INDEX idx_personal_journal_entries_entry_date_id
ON personal_journal_entries (entry_date DESC, id DESC);
`);
    },
  },
] as const;

export async function getPersonalDatabaseUserVersion(
  database: SQLiteDatabase,
): Promise<number> {
  const row =
    await database.getFirstAsync<PersonalDatabaseUserVersionRow>(
      "PRAGMA user_version;",
    );

  if (!row || !Number.isInteger(row.user_version) || row.user_version < 0) {
    throw new Error("PERSONAL_DATABASE_INVALID_USER_VERSION");
  }

  return row.user_version;
}

export async function runPersonalDatabaseMigrations(
  database: SQLiteDatabase,
): Promise<void> {
  const currentVersion = await getPersonalDatabaseUserVersion(database);

  if (currentVersion > PERSONAL_DATABASE_SCHEMA_VERSION) {
    throw new Error(
      `PERSONAL_DATABASE_NEWER_THAN_SUPPORTED:CURRENT=${currentVersion}:SUPPORTED=${PERSONAL_DATABASE_SCHEMA_VERSION}`,
    );
  }

  if (currentVersion === PERSONAL_DATABASE_SCHEMA_VERSION) {
    return;
  }

  for (
    let targetVersion = currentVersion + 1;
    targetVersion <= PERSONAL_DATABASE_SCHEMA_VERSION;
    targetVersion += 1
  ) {
    const migration = PERSONAL_DATABASE_MIGRATIONS.find(
      (candidate) => candidate.version === targetVersion,
    );

    if (!migration) {
      throw new Error(
        `PERSONAL_DATABASE_MIGRATION_MISSING:${targetVersion}`,
      );
    }

    await database.withTransactionAsync(async () => {
      await migration.up(database);
      await database.execAsync(`PRAGMA user_version = ${migration.version};`);

      const appliedVersion = await getPersonalDatabaseUserVersion(database);

      if (appliedVersion !== migration.version) {
        throw new Error(
          `PERSONAL_DATABASE_MIGRATION_VERSION_NOT_PERSISTED:EXPECTED=${migration.version}:ACTUAL=${appliedVersion}`,
        );
      }
    });
  }

  const finalVersion = await getPersonalDatabaseUserVersion(database);

  if (finalVersion !== PERSONAL_DATABASE_SCHEMA_VERSION) {
    throw new Error(
      `PERSONAL_DATABASE_MIGRATION_FINAL_VERSION_MISMATCH:EXPECTED=${PERSONAL_DATABASE_SCHEMA_VERSION}:ACTUAL=${finalVersion}`,
    );
  }
}
