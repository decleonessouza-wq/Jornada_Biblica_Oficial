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
  {
    version: 4,
    up: async (database) => {
      await database.execAsync(`
ALTER TABLE personal_journal_entries
RENAME TO personal_journal_entries_v3;

CREATE TABLE personal_journal_entries (
  id TEXT PRIMARY KEY NOT NULL,
  entry_date TEXT NOT NULL,
  reflection_text TEXT NULL,
  gratitude_text TEXT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE'
    CHECK (status IN ('ACTIVE', 'DRAFT', 'TRASHED')),
  source_type TEXT NOT NULL DEFAULT 'FREE'
    CHECK (
      source_type IN (
        'FREE',
        'BIBLE',
        'PLAN',
        'STUDY',
        'HYMN',
        'HOME_GRATITUDE'
      )
    ),
  source_title_snapshot TEXT NULL,
  prompt_snapshot TEXT NULL,
  created_at_utc TEXT NOT NULL,
  updated_at_utc TEXT NOT NULL,
  CHECK (
    status = 'DRAFT'
    OR length(trim(coalesce(reflection_text, ''))) > 0
    OR length(trim(coalesce(gratitude_text, ''))) > 0
  )
);

INSERT INTO personal_journal_entries (
  id,
  entry_date,
  reflection_text,
  gratitude_text,
  status,
  source_type,
  source_title_snapshot,
  prompt_snapshot,
  created_at_utc,
  updated_at_utc
)
SELECT
  id,
  entry_date,
  reflection_text,
  gratitude_text,
  'ACTIVE',
  'FREE',
  NULL,
  NULL,
  created_at_utc,
  updated_at_utc
FROM personal_journal_entries_v3;

DROP TABLE personal_journal_entries_v3;

CREATE INDEX idx_personal_journal_entries_entry_date_id
ON personal_journal_entries (entry_date DESC, id DESC);

CREATE TABLE personal_journal_entry_references (
  id TEXT PRIMARY KEY NOT NULL,
  entry_id TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 0),
  UNIQUE (entry_id, position),
  FOREIGN KEY (entry_id)
    REFERENCES personal_journal_entries (id)
    ON DELETE CASCADE
);

CREATE TABLE personal_journal_reference_passages (
  reference_id TEXT NOT NULL,
  position INTEGER NOT NULL CHECK (position >= 0),
  kind TEXT NOT NULL
    CHECK (
      kind IN (
        'WHOLE_BOOK',
        'CHAPTER',
        'CHAPTER_RANGE',
        'VERSE',
        'VERSE_RANGE'
      )
    ),
  book_id TEXT NOT NULL,
  start_chapter INTEGER NULL,
  start_verse INTEGER NULL,
  end_chapter INTEGER NULL,
  end_verse INTEGER NULL,
  PRIMARY KEY (reference_id, position),
  FOREIGN KEY (reference_id)
    REFERENCES personal_journal_entry_references (id)
    ON DELETE CASCADE
);

CREATE TABLE personal_journal_tags (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL UNIQUE
);

CREATE TABLE personal_journal_entry_tags (
  entry_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY (entry_id, tag_id),
  FOREIGN KEY (entry_id)
    REFERENCES personal_journal_entries (id)
    ON DELETE CASCADE,
  FOREIGN KEY (tag_id)
    REFERENCES personal_journal_tags (id)
    ON DELETE CASCADE
);
`);
    },
  },
  {
    version: 5,
    up: async (database) => {
      await database.execAsync(`
ALTER TABLE personal_journal_entries
ADD COLUMN category TEXT NULL
  CHECK (
    category IS NULL
    OR category IN (
      'REFLECTION',
      'PRAYER',
      'GRATITUDE',
      'LEARNING',
      'PROMISE',
      'DECISION',
      'QUESTION',
      'TESTIMONY'
    )
  );

ALTER TABLE personal_journal_entries
ADD COLUMN is_pinned INTEGER NOT NULL DEFAULT 0
  CHECK (is_pinned IN (0, 1));
`);
    },
  },
  {
    version: 6,
    up: async (database) => {
      await database.execAsync(`
CREATE INDEX idx_personal_journal_entries_status_entry_date_id
ON personal_journal_entries (status, entry_date DESC, id DESC);

CREATE INDEX idx_personal_journal_entries_status_category_entry_date_id
ON personal_journal_entries (status, category, entry_date DESC, id DESC);

CREATE INDEX idx_personal_journal_entries_status_is_pinned_entry_date_id
ON personal_journal_entries (status, is_pinned DESC, entry_date DESC, id DESC);

CREATE INDEX idx_personal_journal_entry_tags_tag_id_entry_id
ON personal_journal_entry_tags (tag_id, entry_id);

CREATE INDEX idx_personal_journal_reference_passages_book_chapter_verse_reference
ON personal_journal_reference_passages (
  book_id,
  start_chapter,
  start_verse,
  end_chapter,
  end_verse,
  reference_id
);
`);
    },
  },] as const;

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