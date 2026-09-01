import type {
  SQLiteDatabase,
} from "expo-sqlite";

jest.mock(
  "react-native",
  () => ({
    Platform: {
      OS: "web",
    },
  }),
);

jest.mock(
  "../src/hymnal/database/hymnalDatabaseSeed",
  () => ({
    HYMNAL_SEED_CONTRACT: {
      editionId:
        "harpa-crista-jornada-v1",
      hymnRows: 636,
      contentVersion:
        "e8ff5ca2f9c9e7d9892c0c68f2ad45eea3273127",
    },
  }),
);

import {
  HYMNAL_DATABASE_SCHEMA_SQL,
  HYMNAL_DATABASE_SCHEMA_V1_SQL,
  HYMNAL_DATABASE_SCHEMA_VERSION,
  HYMNAL_DATABASE_SEARCH_SCHEMA_V2_SQL,
} from "../src/hymnal/database/hymnalDatabaseSchema";
import {
  runHymnalDatabaseMigrations,
} from "../src/hymnal/database/hymnalDatabaseMigrations";
import {
  HYMNAL_SEARCH_INDEX_VERSION,
  ensureHymnalSearchIndexReady,
} from "../src/hymnal/database/hymnalSearchIndex";
import {
  HYMNAL_SEARCH_NORMALIZER_VERSION,
} from "../src/hymnal/search/hymnalSearchNormalization";

const EDITION_ID =
  "harpa-crista-jornada-v1";

function readyMeta(
  dictionaryRows: number,
  postingRows: number,
) {
  return [
    {
      key: "search_index_state",
      value: "READY",
    },
    {
      key: "search_index_version",
      value: "1",
    },
    {
      key: "search_normalizer_version",
      value: "1",
    },
    {
      key: "search_index_hymn_count",
      value: "636",
    },
    {
      key: "search_index_dictionary_rows",
      value: String(dictionaryRows),
    },
    {
      key: "search_index_posting_rows",
      value: String(postingRows),
    },
    {
      key: "search_index_backend",
      value: "PORTABLE_SQLITE",
    },
    {
      key: "search_index_edition_id",
      value: EDITION_ID,
    },
    {
      key: "search_index_content_version",
      value:
        "e8ff5ca2f9c9e7d9892c0c68f2ad45eea3273127",
    },
  ];
}

describe(
  "hymnal search persistent index",
  () => {
    it(
      "promotes only the runtime schema to v2 while preserving seed-compatible v1 SQL",
      () => {
        expect(
          HYMNAL_DATABASE_SCHEMA_VERSION,
        ).toBe(2);

        expect(
          HYMNAL_DATABASE_SCHEMA_V1_SQL,
        ).toContain(
          "PRAGMA user_version = 1;",
        );

        expect(
          HYMNAL_DATABASE_SEARCH_SCHEMA_V2_SQL,
        ).toContain(
          "CREATE TABLE IF NOT EXISTS hymnal_search_documents",
        );
        expect(
          HYMNAL_DATABASE_SEARCH_SCHEMA_V2_SQL,
        ).toContain(
          "CREATE TABLE IF NOT EXISTS hymnal_search_dictionary",
        );
        expect(
          HYMNAL_DATABASE_SEARCH_SCHEMA_V2_SQL,
        ).toContain(
          "CREATE TABLE IF NOT EXISTS hymnal_search_postings",
        );
        expect(
          HYMNAL_DATABASE_SEARCH_SCHEMA_V2_SQL,
        ).toContain(
          ") WITHOUT ROWID;",
        );

        expect(
          HYMNAL_DATABASE_SCHEMA_SQL,
        ).toContain(
          "PRAGMA user_version = 2;",
        );
      },
    );

    it(
      "applies structural migration v2 without populating the search index",
      async () => {
        const execAsync = jest.fn();
        const getFirstAsync = jest
          .fn()
          .mockResolvedValueOnce({
            user_version: 1,
          })
          .mockResolvedValueOnce({
            user_version: 2,
          })
          .mockResolvedValueOnce({
            user_version: 2,
          });

        const database = {
          execAsync,
          getFirstAsync,
          withTransactionAsync:
            jest.fn(
              async (
                callback:
                  () => Promise<void>,
              ) => {
                await callback();
              },
            ),
        } as unknown as SQLiteDatabase;

        await expect(
          runHymnalDatabaseMigrations(
            database,
          ),
        ).resolves.toBeUndefined();

        expect(execAsync).toHaveBeenCalledTimes(
          2,
        );

        expect(
          execAsync.mock.calls[0]?.[0],
        ).toContain(
          "hymnal_search_documents",
        );

        expect(
          execAsync.mock.calls[1]?.[0],
        ).toBe(
          "PRAGMA user_version = 2;",
        );

        expect(
          execAsync.mock.calls.flat().join(
            "\n",
          ),
        ).not.toContain(
          "INSERT INTO hymnal_search_documents",
        );
      },
    );

    it(
      "accepts an already-ready portable index without rebuilding",
      async () => {
        const getAllAsync = jest
          .fn()
          .mockResolvedValue(
            readyMeta(500, 4000),
          );

        const getFirstAsync = jest
          .fn()
          .mockResolvedValueOnce({
            count: 636,
          })
          .mockResolvedValueOnce({
            count: 500,
          })
          .mockResolvedValueOnce({
            count: 4000,
          });

        const runAsync = jest.fn();
        const withTransactionAsync =
          jest.fn();

        const database = {
          getAllAsync,
          getFirstAsync,
          runAsync,
          withTransactionAsync,
        } as unknown as SQLiteDatabase;

        await expect(
          ensureHymnalSearchIndexReady(
            database,
          ),
        ).resolves.toEqual({
          backend: "PORTABLE_SQLITE",
          rebuilt: false,
          documentCount: 636,
          dictionaryRowCount: 500,
          postingRowCount: 4000,
        });

        expect(
          HYMNAL_SEARCH_INDEX_VERSION,
        ).toBe(1);
        expect(
          HYMNAL_SEARCH_NORMALIZER_VERSION,
        ).toBe(1);
        expect(runAsync).not.toHaveBeenCalled();
        expect(
          withTransactionAsync,
        ).not.toHaveBeenCalled();
      },
    );

    it(
      "rebuilds one portable document per hymn from title plus ordered sections",
      async () => {
        const hymns = Array.from(
          { length: 636 },
          (_, index) => ({
            source_rowid: index + 1,
            edition_id: EDITION_ID,
            hymn_id:
              `${EDITION_ID}:${index + 1}`,
            title: `Hino ${index + 1}`,
          }),
        );

        const sections = hymns.map(
          (hymn) => ({
            edition_id:
              hymn.edition_id,
            hymn_id: hymn.hymn_id,
            section_order: 1,
            text: "Graca comum",
          }),
        );

        let metaReadCount = 0;
        let hymnReadCount = 0;

        const getAllAsync = jest.fn(
          async (sql: string) => {
            if (
              sql.includes(
                "FROM hymnal_meta",
              )
            ) {
              metaReadCount += 1;

              return metaReadCount === 1
                ? []
                : readyMeta(
                    639,
                    2544,
                  );
            }

            if (
              sql.includes(
                "FROM hymns",
              )
            ) {
              hymnReadCount += 1;

              return hymnReadCount === 1
                ? hymns
                : [];
            }

            if (
              sql.includes(
                "FROM hymn_sections",
              )
            ) {
              return sections;
            }

            return [];
          },
        );

        const getFirstAsync = jest.fn(
          async (sql: string) => {
            if (
              sql.includes(
                "hymnal_search_documents",
              )
            ) {
              return { count: 636 };
            }

            if (
              sql.includes(
                "hymnal_search_dictionary",
              )
            ) {
              return { count: 639 };
            }

            if (
              sql.includes(
                "hymnal_search_postings",
              )
            ) {
              return { count: 2544 };
            }

            return { count: 0 };
          },
        );

        const runAsync = jest.fn();
        const withTransactionAsync =
          jest.fn(
            async (
              callback:
                () => Promise<void>,
            ) => {
              await callback();
            },
          );

        const database = {
          getAllAsync,
          getFirstAsync,
          runAsync,
          withTransactionAsync,
        } as unknown as SQLiteDatabase;

        await expect(
          ensureHymnalSearchIndexReady(
            database,
          ),
        ).resolves.toEqual({
          backend: "PORTABLE_SQLITE",
          rebuilt: true,
          documentCount: 636,
          dictionaryRowCount: 639,
          postingRowCount: 2544,
        });

        const hymnSelect =
          getAllAsync.mock.calls.find(
            (call) =>
              String(call[0]).includes(
                "FROM hymns",
              ),
          );

        const sectionSelect =
          getAllAsync.mock.calls.find(
            (call) =>
              String(call[0]).includes(
                "FROM hymn_sections",
              ),
          );

        expect(
          String(hymnSelect?.[0]),
        ).not.toContain("first_line");

        expect(
          String(sectionSelect?.[0]),
        ).toContain(
          "section_order",
        );

        const documentInsert =
          runAsync.mock.calls.find(
            (call) =>
              String(call[0]).includes(
                "INSERT INTO hymnal_search_documents",
              ),
          );

        expect(documentInsert).toBeDefined();

        const documentParams =
          documentInsert?.[1] as
            | readonly unknown[]
            | undefined;

        expect(documentParams).toContain(
          "hino 1 graca comum",
        );

        expect(
          withTransactionAsync,
        ).toHaveBeenCalledTimes(1);
      },
    );
  },
);
