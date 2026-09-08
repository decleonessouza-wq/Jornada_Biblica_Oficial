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

function getFavoritesMigrationDdl(execAsync: jest.Mock): string {
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

  it("locks the Personal SQLite schema at version 2", () => {
    expect(PERSONAL_DATABASE_SCHEMA_VERSION).toBe(2);
  });

  it("migrates a fresh logical database from v0 through v1 to v2", async () => {
    const fake = createFakeDatabase(0);
    const migrations = loadMigrationsWithSchemaVersion(2);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(2);
    expect(fake.execAsync).toHaveBeenCalledTimes(3);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 1;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 2;",
    );
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(4);
    expect(fake.getUserVersion()).toBe(2);
  });

  it("verifies each persisted version inside its transaction and again after the sequence", async () => {
    const fake = createFakeDatabase(0, {
      readSequence: [
        { user_version: 0 },
        { user_version: 1 },
        { user_version: 2 },
        { user_version: 2 },
      ],
    });
    const migrations = loadMigrationsWithSchemaVersion(2);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(2);
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(4);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 1;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 2;",
    );
  });

  it("migrates an existing v1 database to v2 in one transaction", async () => {
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

  it("creates the favorites table and deterministic newest-first index in migration v2", async () => {
    const fake = createFakeDatabase(1);
    const migrations = loadMigrationsWithSchemaVersion(2);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    const ddlSql = getFavoritesMigrationDdl(fake.execAsync);

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

  it("is idempotent when the database is already at v2", async () => {
    const fake = createFakeDatabase(2);
    const migrations = loadMigrationsWithSchemaVersion(2);

    await migrations.runPersonalDatabaseMigrations(fake.database);

    expect(fake.getFirstAsync).toHaveBeenCalledTimes(1);
    expect(fake.withTransactionAsync).not.toHaveBeenCalled();
    expect(fake.execAsync).not.toHaveBeenCalled();
  });

  it("fails closed when the database is newer than supported", async () => {
    const fake = createFakeDatabase(3);
    const migrations = loadMigrationsWithSchemaVersion(2);

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
    const migrations = loadMigrationsWithSchemaVersion(2);

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
    const migrations = loadMigrationsWithSchemaVersion(2);

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

  it("fails closed when the final version readback does not match v2", async () => {
    const fake = createFakeDatabase(0, {
      readSequence: [
        { user_version: 0 },
        { user_version: 1 },
        { user_version: 2 },
        { user_version: 1 },
      ],
    });
    const migrations = loadMigrationsWithSchemaVersion(2);

    await expect(
      migrations.runPersonalDatabaseMigrations(fake.database),
    ).rejects.toThrow(
      "PERSONAL_DATABASE_MIGRATION_FINAL_VERSION_MISMATCH",
    );

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(2);
    expect(fake.getFirstAsync).toHaveBeenCalledTimes(4);
    expect(fake.getUserVersion()).toBe(2);
  });

  it("fails closed when a required sequential migration step is missing", async () => {
    const fake = createFakeDatabase(0);
    const migrations = loadMigrationsWithSchemaVersion(3);

    await expect(
      migrations.runPersonalDatabaseMigrations(fake.database),
    ).rejects.toThrow("PERSONAL_DATABASE_MIGRATION_MISSING:3");

    expect(fake.withTransactionAsync).toHaveBeenCalledTimes(2);
    expect(fake.execAsync).toHaveBeenCalledTimes(3);
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 1;",
    );
    expect(fake.execAsync).toHaveBeenCalledWith(
      "PRAGMA user_version = 2;",
    );
    expect(fake.getUserVersion()).toBe(2);
  });
});
