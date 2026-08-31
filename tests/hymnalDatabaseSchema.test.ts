import type { SQLiteDatabase } from "expo-sqlite";

import {
  HYMNAL_DATABASE_NAME,
  HYMNAL_DATABASE_SEED_ASSET_NAME,
} from "../src/hymnal/database/hymnalDatabaseConstants";

import {
  HYMNAL_DATABASE_SCHEMA_SQL,
  HYMNAL_DATABASE_SCHEMA_V1_SQL,
  HYMNAL_DATABASE_SCHEMA_VERSION,
} from "../src/hymnal/database/hymnalDatabaseSchema";

import {
  runHymnalDatabaseMigrations,
} from "../src/hymnal/database/hymnalDatabaseMigrations";

function getDeclaredTableNames(
  sql: string,
): string[] {
  const matcher =
    /CREATE TABLE IF NOT EXISTS\s+([a-zA-Z0-9_]+)/g;

  const names: string[] = [];

  let match = matcher.exec(sql);

  while (match) {
    names.push(match[1]);
    match = matcher.exec(sql);
  }

  return names;
}

function createFakeDatabase(
  initialUserVersion: number,
) {
  let userVersion =
    initialUserVersion;

  const execAsync =
    jest.fn(
      async (sql: string): Promise<void> => {
        const matches =
          Array.from(
            sql.matchAll(
              /PRAGMA\s+user_version\s*=\s*(\d+)\s*;/gi,
            ),
          );

        const lastMatch =
          matches[matches.length - 1];

        if (lastMatch) {
          userVersion =
            Number(lastMatch[1]);
        }
      },
    );

  const getFirstAsync =
    jest.fn(
      async (): Promise<{
        user_version: number;
      }> => ({
        user_version: userVersion,
      }),
    );

  const withTransactionAsync =
    jest.fn(
      async (
        action: () => Promise<void>,
      ): Promise<void> => {
        await action();
      },
    );

  const database = {
    execAsync,
    getFirstAsync,
    withTransactionAsync,
  } as unknown as SQLiteDatabase;

  return {
    database,
    execAsync,
    withTransactionAsync,
    getUserVersion: () => userVersion,
  };
}

describe("Hymnal database schema v1", () => {
  it("uses isolated Harpa database artifact names", () => {
    expect(
      HYMNAL_DATABASE_NAME,
    ).toBe("harpa-jornada.db");

    expect(
      HYMNAL_DATABASE_SEED_ASSET_NAME,
    ).toBe(
      "harpa-jornada-seed-v1.db",
    );
  });

  it("locks the structural schema at version 1", () => {
    expect(
      HYMNAL_DATABASE_SCHEMA_VERSION,
    ).toBe(1);

    expect(
      HYMNAL_DATABASE_SCHEMA_SQL,
    ).toBe(
      HYMNAL_DATABASE_SCHEMA_V1_SQL,
    );

    expect(
      HYMNAL_DATABASE_SCHEMA_V1_SQL,
    ).toMatch(
      /PRAGMA\s+user_version\s*=\s*1\s*;/,
    );
  });

  it("declares exactly the five authoritative v1 tables", () => {
    expect(
      getDeclaredTableNames(
        HYMNAL_DATABASE_SCHEMA_V1_SQL,
      ),
    ).toEqual([
      "hymnal_meta",
      "hymnal_editions",
      "hymnal_installations",
      "hymns",
      "hymn_sections",
    ]);
  });

  it("keeps Bible and search tables out of schema v1", () => {
    const tableNames =
      getDeclaredTableNames(
        HYMNAL_DATABASE_SCHEMA_V1_SQL,
      );

    expect(
      tableNames.some(
        (name) =>
          name.startsWith("bible_"),
      ),
    ).toBe(false);

    expect(
      tableNames.some(
        (name) =>
          name.includes("search") ||
          name.includes("fts"),
      ),
    ).toBe(false);
  });

  it("enables foreign keys and protects edition/hymn identity", () => {
    expect(
      HYMNAL_DATABASE_SCHEMA_V1_SQL,
    ).toMatch(
      /PRAGMA\s+foreign_keys\s*=\s*ON\s*;/,
    );

    expect(
      HYMNAL_DATABASE_SCHEMA_V1_SQL,
    ).toMatch(
      /UNIQUE\s*\(\s*edition_id\s*,\s*number\s*\)/,
    );

    expect(
      HYMNAL_DATABASE_SCHEMA_V1_SQL,
    ).toMatch(
      /PRIMARY KEY\s*\(\s*edition_id\s*,\s*id\s*\)/,
    );
  });

  it("constrains section kinds to the domain contract", () => {
    for (
      const kind of [
        "VERSE",
        "CHORUS",
        "REFRAIN",
        "BRIDGE",
        "OTHER",
      ]
    ) {
      expect(
        HYMNAL_DATABASE_SCHEMA_V1_SQL,
      ).toContain(`'${kind}'`);
    }
  });

  it("constrains rights and authorization values", () => {
    for (
      const rightsKind of [
        "PROJECT_AUTHORIZED",
        "FORMAL_AUTHORIZATION_DOCUMENTED",
        "PUBLIC_DOMAIN",
        "OPEN_LICENSE",
      ]
    ) {
      expect(
        HYMNAL_DATABASE_SCHEMA_V1_SQL,
      ).toContain(`'${rightsKind}'`);
    }

    for (
      const status of [
        "PENDING_FORMALIZATION",
        "DOCUMENTED",
        "NOT_REQUIRED",
      ]
    ) {
      expect(
        HYMNAL_DATABASE_SCHEMA_V1_SQL,
      ).toContain(`'${status}'`);
    }
  });

  it("migrates a fresh logical database from v0 to v1", async () => {
    const fake =
      createFakeDatabase(0);

    await runHymnalDatabaseMigrations(
      fake.database,
    );

    expect(
      fake.withTransactionAsync,
    ).toHaveBeenCalledTimes(1);

    expect(
      fake.getUserVersion(),
    ).toBe(1);

    expect(
      fake.execAsync,
    ).toHaveBeenCalledWith(
      HYMNAL_DATABASE_SCHEMA_V1_SQL,
    );

    expect(
      fake.execAsync,
    ).toHaveBeenCalledWith(
      "PRAGMA user_version = 1;",
    );
  });

  it("is a no-op when the database is already at v1", async () => {
    const fake =
      createFakeDatabase(1);

    await runHymnalDatabaseMigrations(
      fake.database,
    );

    expect(
      fake.withTransactionAsync,
    ).not.toHaveBeenCalled();

    expect(
      fake.execAsync,
    ).not.toHaveBeenCalled();

    expect(
      fake.getUserVersion(),
    ).toBe(1);
  });

  it("fails closed when the database is newer than supported", async () => {
    const fake =
      createFakeDatabase(2);

    await expect(
      runHymnalDatabaseMigrations(
        fake.database,
      ),
    ).rejects.toThrow(
      "HYMNAL_DATABASE_NEWER_THAN_SUPPORTED",
    );

    expect(
      fake.withTransactionAsync,
    ).not.toHaveBeenCalled();

    expect(
      fake.execAsync,
    ).not.toHaveBeenCalled();
  });
});
