import type { SQLiteDatabase } from "expo-sqlite";

import { PERSONAL_DATABASE_SCHEMA_VERSION } from "../src/data/personal/personalDatabaseSchema";

type UserVersionRow = Readonly<{
  user_version: number;
}>;

type FakeDatabaseOptions = Readonly<{
  persistVersionWrites?: boolean;
  readSequence?: readonly (UserVersionRow | null)[];
}>;

function createFakeDatabase(
  initialUserVersion: number,
  options: FakeDatabaseOptions = {},
) {
  let userVersion = initialUserVersion;
  const readSequence = [...(options.readSequence ?? [])];
  const persistVersionWrites = options.persistVersionWrites ?? true;

  const execAsync = jest.fn(async (sql: string): Promise<void> => {
    const match = sql.match(/PRAGMA\s+user_version\s*=\s*(\d+)\s*;/i);

    if (match && persistVersionWrites) {
      userVersion = Number(match[1]);
    }
  });

  const getFirstAsync = jest.fn(
    async (): Promise<UserVersionRow | null> => {
      if (readSequence.length > 0) {
        return readSequence.shift() ?? null;
      }

      return { user_version: userVersion };
    },
  );

  const withTransactionAsync = jest.fn(
    async (operation: () => Promise<void>): Promise<void> => {
      await operation();
    },
  );

  return {
    database: {
      execAsync,
      getFirstAsync,
      withTransactionAsync,
    } as unknown as SQLiteDatabase,
    execAsync,
    getFirstAsync,
    withTransactionAsync,
    getUserVersion: () => userVersion,
  };
}

type MigrationsModule =
  typeof import("../src/data/personal/personalDatabaseMigrations");

function loadMigrationsWithSchemaVersion(
  schemaVersion: number,
): MigrationsModule {
  jest.resetModules();
  jest.doMock("../src/data/personal/personalDatabaseSchema", () => ({
    PERSONAL_DATABASE_SCHEMA_VERSION: schemaVersion,
  }));

  return require("../src/data/personal/personalDatabaseMigrations");
}

function getSingleMigrationDdl(execAsync: jest.Mock): string {
  const ddlCalls = execAsync.mock.calls
    .map(([sql]) => sql as string)
    .filter((sql) => !/^PRAGMA\s+user_version\s*=/i.test(sql.trim()));

  expect(ddlCalls).toHaveLength(1);

  return ddlCalls[0];
}

describe("Personal database migrations", () => {
  afterEach(() => {
    jest.dontMock("../src/data/personal/personalDatabaseSchema");
    jest.resetModules();
  });

  it("locks the Personal SQLite schema at version 5", () => {
    expect(PERSONAL_DATABASE_SCHEMA_VERSION).toBe(5);
  });

  it("migrates a fresh logical database from v0 through v1, v2, v3 and v4", async () => {
    const fake = createFakeDatabase(0);
    const migrations = loadMigrationsWithSchemaVersion(4);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(4);
    expect(fake.execAsync).toHaveBeenCalledTimes(7);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 1;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 2;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 3;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 4;",
    );
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(6);
    expect(fake.getUserVersion()).toBe(4);
  });

  it("verifies each persisted version inside its transaction and again after the v4 sequence", async () => {
    const fake = createFakeDatabase(0, {
      readSequence: [
        { user_version: 0 },
        { user_version: 1 },
        { user_version: 2 },
        { user_version: 3 },
        { user_version: 4 },
        { user_version: 4 },
      ],
    });
    const migrations = loadMigrationsWithSchemaVersion(4);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(4);
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(6);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 1;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 2;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 3;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 4;",
    );
  });

  it("preserves the v1 to v2 migration regression in one transaction", async () => {
    const fake = createFakeDatabase(1);
    const migrations = loadMigrationsWithSchemaVersion(2);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(1);
    expect(fake.execAsync).toHaveBeenCalledTimes(2);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 2;",
    );
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(3);
    expect(fake.getUserVersion()).toBe(2);
  });

  it("preserves the favorites table and deterministic newest-first index in migration v2", async () => {
    const fake = createFakeDatabase(1);
    const migrations = loadMigrationsWithSchemaVersion(2);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    const ddlSql = getSingleMigrationDdl(fake.execAsync);

    expect(ddlSql).toMatch(/CREATE TABLE personal_favorites\s*\(/);
    expect(ddlSql).toMatch(/id TEXT PRIMARY KEY NOT NULL/);
    expect(ddlSql).toMatch(/target_kind TEXT NOT NULL/);
    expect(ddlSql).toMatch(/target_key TEXT NOT NULL/);
    expect(ddlSql).toMatch(/created_at_utc TEXT NOT NULL/);
    expect(ddlSql).toMatch(/UNIQUE \(target_kind, target_key\)/);
    expect(ddlSql).toMatch(
      /CREATE INDEX idx_personal_favorites_created_at_utc_id\s+ON personal_favorites \(created_at_utc DESC, id DESC\);/,
    );
    expect(ddlSql).not.toMatch(/\bFOREIGN\s+KEY\b/i);
    expect(ddlSql).not.toMatch(/\bCHECK\s*\(/i);
    expect(ddlSql).not.toMatch(/IF\s+NOT\s+EXISTS/i);
  });

  it("migrates an existing v2 database to v3 in one transaction", async () => {
    const fake = createFakeDatabase(2);
    const migrations = loadMigrationsWithSchemaVersion(3);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(1);
    expect(fake.execAsync).toHaveBeenCalledTimes(2);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 3;",
    );
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(3);
    expect(fake.getUserVersion()).toBe(3);
  });

  it("creates the journal table, non-empty-text check and deterministic date index in migration v3", async () => {
    const fake = createFakeDatabase(2);
    const migrations = loadMigrationsWithSchemaVersion(3);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    const ddlSql = getSingleMigrationDdl(fake.execAsync);

    expect(ddlSql).toMatch(/CREATE TABLE personal_journal_entries\s*\(/);
    expect(ddlSql).toMatch(/id TEXT PRIMARY KEY NOT NULL/);
    expect(ddlSql).toMatch(/entry_date TEXT NOT NULL UNIQUE/);
    expect(ddlSql).toMatch(/reflection_text TEXT NULL/);
    expect(ddlSql).toMatch(/gratitude_text TEXT NULL/);
    expect(ddlSql).toMatch(/created_at_utc TEXT NOT NULL/);
    expect(ddlSql).toMatch(/updated_at_utc TEXT NOT NULL/);
    expect(ddlSql).toMatch(
      /CHECK\s*\(\s*length\(trim\(coalesce\(reflection_text, ''\)\)\) > 0\s+OR length\(trim\(coalesce\(gratitude_text, ''\)\)\) > 0\s*\)/,
    );
    expect(ddlSql).toMatch(
      /CREATE INDEX idx_personal_journal_entries_entry_date_id\s+ON personal_journal_entries \(entry_date DESC, id DESC\);/,
    );
    expect(ddlSql).not.toMatch(/\bFOREIGN\s+KEY\b/i);
    expect(ddlSql).not.toMatch(/IF\s+NOT\s+EXISTS/i);
  });

  it("migrates an existing v3 database to v4 in one transaction", async () => {
    const fake = createFakeDatabase(3);
    const migrations = loadMigrationsWithSchemaVersion(4);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(1);
    expect(fake.execAsync).toHaveBeenCalledTimes(2);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 4;",
    );
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(3);
    expect(fake.getUserVersion()).toBe(4);
  });

  it("rebuilds journal v4 preserving v3 data and adding the complete P16-P1 relational structure", async () => {
    const fake = createFakeDatabase(3);
    const migrations = loadMigrationsWithSchemaVersion(4);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    const ddlSql = getSingleMigrationDdl(fake.execAsync);

    expect(ddlSql).toMatch(
      /ALTER TABLE personal_journal_entries\s+RENAME TO personal_journal_entries_v3;/,
    );
    expect(ddlSql).toMatch(/CREATE TABLE personal_journal_entries\s*\(/);
    expect(ddlSql).toMatch(/entry_date TEXT NOT NULL,/);
    expect(ddlSql).not.toMatch(/entry_date TEXT NOT NULL UNIQUE/);
    expect(ddlSql).toMatch(
      /status TEXT NOT NULL DEFAULT 'ACTIVE'\s+CHECK \(status IN \('ACTIVE', 'DRAFT', 'TRASHED'\)\)/,
    );
    expect(ddlSql).toMatch(
      /source_type TEXT NOT NULL DEFAULT 'FREE'\s+CHECK \(\s*source_type IN \(\s*'FREE',\s*'BIBLE',\s*'PLAN',\s*'STUDY',\s*'HYMN',\s*'HOME_GRATITUDE'\s*\)\s*\)/,
    );
    expect(ddlSql).toMatch(/source_title_snapshot TEXT NULL/);
    expect(ddlSql).toMatch(/prompt_snapshot TEXT NULL/);
    expect(ddlSql).toMatch(
      /CHECK \(\s*status = 'DRAFT'\s+OR length\(trim\(coalesce\(reflection_text, ''\)\)\) > 0\s+OR length\(trim\(coalesce\(gratitude_text, ''\)\)\) > 0\s*\)/,
    );
    expect(ddlSql).toMatch(
      /INSERT INTO personal_journal_entries \([\s\S]*?\)\s*SELECT\s+id,\s+entry_date,\s+reflection_text,\s+gratitude_text,\s+'ACTIVE',\s+'FREE',\s+NULL,\s+NULL,\s+created_at_utc,\s+updated_at_utc\s+FROM personal_journal_entries_v3;/,
    );
    expect(ddlSql).toMatch(/DROP TABLE personal_journal_entries_v3;/);
    expect(ddlSql).toMatch(
      /CREATE INDEX idx_personal_journal_entries_entry_date_id\s+ON personal_journal_entries \(entry_date DESC, id DESC\);/,
    );
    expect(
      (ddlSql.match(/CREATE INDEX\s+/g) ?? []).length,
    ).toBe(1);

    expect(ddlSql).toMatch(
      /CREATE TABLE personal_journal_entry_references\s*\(/,
    );
    expect(ddlSql).toMatch(/UNIQUE \(entry_id, position\)/);
    expect(ddlSql).toMatch(
      /FOREIGN KEY \(entry_id\)\s+REFERENCES personal_journal_entries \(id\)\s+ON DELETE CASCADE/,
    );

    expect(ddlSql).toMatch(
      /CREATE TABLE personal_journal_reference_passages\s*\(/,
    );
    expect(ddlSql).toMatch(
      /kind TEXT NOT NULL\s+CHECK \(\s*kind IN \(\s*'WHOLE_BOOK',\s*'CHAPTER',\s*'CHAPTER_RANGE',\s*'VERSE',\s*'VERSE_RANGE'\s*\)\s*\)/,
    );
    expect(ddlSql).toMatch(/book_id TEXT NOT NULL/);
    expect(ddlSql).toMatch(/start_chapter INTEGER NULL/);
    expect(ddlSql).toMatch(/start_verse INTEGER NULL/);
    expect(ddlSql).toMatch(/end_chapter INTEGER NULL/);
    expect(ddlSql).toMatch(/end_verse INTEGER NULL/);
    expect(ddlSql).toMatch(/PRIMARY KEY \(reference_id, position\)/);
    expect(ddlSql).toMatch(
      /FOREIGN KEY \(reference_id\)\s+REFERENCES personal_journal_entry_references \(id\)\s+ON DELETE CASCADE/,
    );

    expect(ddlSql).toMatch(/CREATE TABLE personal_journal_tags\s*\(/);
    expect(ddlSql).toMatch(/normalized_name TEXT NOT NULL UNIQUE/);

    expect(ddlSql).toMatch(
      /CREATE TABLE personal_journal_entry_tags\s*\(/,
    );
    expect(ddlSql).toMatch(/PRIMARY KEY \(entry_id, tag_id\)/);
    expect(ddlSql).toMatch(
      /FOREIGN KEY \(tag_id\)\s+REFERENCES personal_journal_tags \(id\)\s+ON DELETE CASCADE/,
    );
  });

  it("migrates a fresh logical database through current v5", async () => {
    const fake = createFakeDatabase(0);
    const migrations = loadMigrationsWithSchemaVersion(5);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(5);
    expect(fake.execAsync).toHaveBeenCalledTimes(9);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 5;",
    );
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(7);
    expect(fake.getUserVersion()).toBe(5);
  });

  it("migrates an existing v4 database to v5 in one transaction", async () => {
    const fake = createFakeDatabase(4);
    const migrations = loadMigrationsWithSchemaVersion(5);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(1);
    expect(fake.execAsync).toHaveBeenCalledTimes(2);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 5;",
    );
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(3);
    expect(fake.getUserVersion()).toBe(5);
  });

  it("adds journal category and pin columns in v5 without inventing legacy categories", async () => {
    const fake = createFakeDatabase(4);
    const migrations = loadMigrationsWithSchemaVersion(5);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    const ddlSql = getSingleMigrationDdl(fake.execAsync);

    expect(ddlSql).toMatch(
      /ALTER TABLE personal_journal_entries\s+ADD COLUMN category TEXT NULL/,
    );
    expect(ddlSql).toMatch(
      /category IS NULL\s+OR category IN \(\s*'REFLECTION',\s*'PRAYER',\s*'GRATITUDE',\s*'LEARNING',\s*'PROMISE',\s*'DECISION',\s*'QUESTION',\s*'TESTIMONY'\s*\)/,
    );
    expect(ddlSql).toMatch(
      /ALTER TABLE personal_journal_entries\s+ADD COLUMN is_pinned INTEGER NOT NULL DEFAULT 0\s+CHECK \(is_pinned IN \(0, 1\)\)/,
    );
    expect(ddlSql).not.toMatch(
      /UPDATE\s+personal_journal_entries[\s\S]*category/i,
    );
    expect(ddlSql).not.toMatch(
      /CREATE\s+TABLE\s+personal_journal_tags/i,
    );
    expect(ddlSql).not.toMatch(
      /CREATE\s+INDEX/i,
    );
  });

  it("is idempotent when the database is already at v5", async () => {
    const fake = createFakeDatabase(5);
    const migrations = loadMigrationsWithSchemaVersion(5);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.getFirstAsync).toHaveBeenCalledTimes(1);
    expect(fake.withTransactionAsync).not.toHaveBeenCalled();
    expect(fake.execAsync).not.toHaveBeenCalled();
  });

  it("fails closed when the database is newer than supported v5", async () => {
    const fake = createFakeDatabase(6);
    const migrations = loadMigrationsWithSchemaVersion(5);

    await expect(
      migrations.runPersonalDatabaseMigrations(fake.database),
    ).rejects.toThrow("PERSONAL_DATABASE_NEWER_THAN_SUPPORTED");

    expect(fake.withTransactionAsync).not.toHaveBeenCalled();
    expect(fake.execAsync).not.toHaveBeenCalled();
  });

  it("is idempotent when the database is already at v4", async () => {
    const fake = createFakeDatabase(4);
    const migrations = loadMigrationsWithSchemaVersion(4);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.getFirstAsync).toHaveBeenCalledTimes(1);
    expect(fake.withTransactionAsync).not.toHaveBeenCalled();
    expect(fake.execAsync).not.toHaveBeenCalled();
  });

  it("fails closed when the database is newer than supported v4", async () => {
    const fake = createFakeDatabase(5);
    const migrations = loadMigrationsWithSchemaVersion(4);

    await expect(
      migrations.runPersonalDatabaseMigrations(fake.database),
    ).rejects.toThrow("PERSONAL_DATABASE_NEWER_THAN_SUPPORTED");

    expect(fake.withTransactionAsync).not.toHaveBeenCalled();
    expect(fake.execAsync).not.toHaveBeenCalled();
  });

  it.each([
    null,
    { user_version: -1 },
    { user_version: 1.5 },
  ])("fails closed for an invalid user_version row %#", async (row) => {
    const fake = createFakeDatabase(0, {
      readSequence: [row],
    });
    const migrations = loadMigrationsWithSchemaVersion(4);

    await expect(
      migrations.getPersonalDatabaseUserVersion(fake.database),
    ).rejects.toThrow("PERSONAL_DATABASE_INVALID_USER_VERSION");

    expect(fake.withTransactionAsync).not.toHaveBeenCalled();
    expect(fake.execAsync).not.toHaveBeenCalled();
  });

  it("fails closed when a migration version write is not persisted", async () => {
    const fake = createFakeDatabase(0, {
      persistVersionWrites: false,
    });
    const migrations = loadMigrationsWithSchemaVersion(4);

    await expect(
      migrations.runPersonalDatabaseMigrations(fake.database),
    ).rejects.toThrow(
      "PERSONAL_DATABASE_MIGRATION_VERSION_NOT_PERSISTED",
    );

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(1);
    expect(fake.execAsync).toHaveBeenCalledTimes(1);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 1;",
    );
  });

  it("fails closed when the final version readback does not match v4", async () => {
    const fake = createFakeDatabase(0, {
      readSequence: [
        { user_version: 0 },
        { user_version: 1 },
        { user_version: 2 },
        { user_version: 3 },
        { user_version: 4 },
        { user_version: 3 },
      ],
    });
    const migrations = loadMigrationsWithSchemaVersion(4);

    await expect(
      migrations.runPersonalDatabaseMigrations(fake.database),
    ).rejects.toThrow(
      "PERSONAL_DATABASE_MIGRATION_FINAL_VERSION_MISMATCH",
    );

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(4);
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(6);
    expect(fake.getUserVersion()).toBe(4);
  });

  it("fails closed when the next required sequential migration step is missing", async () => {
    const fake = createFakeDatabase(0);
    const migrations = loadMigrationsWithSchemaVersion(6);

    await expect(
      migrations.runPersonalDatabaseMigrations(fake.database),
    ).rejects.toThrow("PERSONAL_DATABASE_MIGRATION_MISSING:6");

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(5);
    expect(fake.execAsync).toHaveBeenCalledTimes(9);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 1;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 2;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 3;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 4;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 5;",
    );
    expect(fake.getUserVersion()).toBe(5);
  });
});