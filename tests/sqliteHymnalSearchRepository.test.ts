import type { SQLiteDatabase } from "expo-sqlite";

jest.mock(
  "react-native",
  () => ({
    Platform: {
      OS: "web",
    },
  }),
);

jest.mock(
  "../src/hymnal/database/hymnalDatabaseBootstrap",
  () => ({
    bootstrapHymnalDatabase: jest.fn(),
  }),
);

import { Platform } from "react-native";
import {
  bootstrapHymnalDatabase,
} from "../src/hymnal/database/hymnalDatabaseBootstrap";
import {
  SQLiteHymnalSearchRepository,
  createSQLiteHymnalSearchRepository,
} from "../src/hymnal/repositories/sqliteHymnalSearchRepository";
import type {
  HymnalSearchTextRequest,
} from "../src/hymnal/repositories/hymnalSearchRepository";

const EDITION_ID =
  "harpa-crista-jornada-v1";

const bootstrapMock =
  bootstrapHymnalDatabase as jest.MockedFunction<
    typeof bootstrapHymnalDatabase
  >;

function setPlatform(
  os: "web" | "android",
): void {
  const mutablePlatform = Platform as unknown as {
    OS: string;
  };

  mutablePlatform.OS = os;
}

function makeRow(
  number: number,
) {
  return {
    edition_id: EDITION_ID,
    id: `${EDITION_ID}:${number}`,
    number,
    title: `Hino ${number}`,
    first_line:
      number % 2 === 0
        ? null
        : `Primeira linha ${number}`,
  };
}

function createDatabase(
  getAllAsync: jest.Mock,
): SQLiteDatabase {
  return {
    getAllAsync,
  } as unknown as SQLiteDatabase;
}

function request(
  overrides: Partial<HymnalSearchTextRequest> = {},
): HymnalSearchTextRequest {
  return {
    editionId: EDITION_ID,
    query: "graca",
    mode: "WORD",
    offset: 0,
    limit: 25,
    ...overrides,
  };
}

describe(
  "SQLiteHymnalSearchRepository",
  () => {
    beforeEach(() => {
      jest.clearAllMocks();
      setPlatform("web");
    });

    it(
      "rejects invalid requests before any SQLite query",
      async () => {
        const invalidCases: readonly Readonly<{
          label: string;
          value: HymnalSearchTextRequest;
          expectedMessage: string;
        }>[] = [
          {
            label: "blank edition",
            value: request({ editionId: "   " }),
            expectedMessage:
              "HYMNAL_SEARCH_INVALID_EDITION_ID",
          },
          {
            label: "blank normalized query",
            value: request({ query: "---" }),
            expectedMessage:
              "HYMNAL_SEARCH_EMPTY_QUERY_AFTER_NORMALIZATION",
          },
          {
            label: "multiple terms in WORD",
            value: request({ query: "graca divina" }),
            expectedMessage:
              "HYMNAL_SEARCH_WORD_REQUIRES_SINGLE_TERM:ACTUAL=2",
          },
          {
            label: "negative offset",
            value: request({ offset: -1 }),
            expectedMessage:
              "HYMNAL_SEARCH_INVALID_OFFSET:-1",
          },
          {
            label: "zero limit",
            value: request({ limit: 0 }),
            expectedMessage:
              "HYMNAL_SEARCH_INVALID_LIMIT:0",
          },
          {
            label: "limit above maximum",
            value: request({ limit: 101 }),
            expectedMessage:
              "HYMNAL_SEARCH_INVALID_LIMIT:101",
          },
        ];

        for (const invalidCase of invalidCases) {
          const getAllAsync = jest.fn();
          const repository =
            new SQLiteHymnalSearchRepository(
              createDatabase(getAllAsync),
            );

          await expect(
            repository.searchText(
              invalidCase.value,
            ),
          ).rejects.toThrow(
            invalidCase.expectedMessage,
          );

          expect(getAllAsync).not.toHaveBeenCalled();
          expect(invalidCase.label.length).toBeGreaterThan(0);
        }
      },
    );

    it(
      "executes Web WORD search through the portable index with SQL pagination and hymn ordering",
      async () => {
        const getAllAsync = jest
          .fn()
          .mockResolvedValue([
            makeRow(2),
            makeRow(7),
            makeRow(9),
          ]);

        const repository =
          new SQLiteHymnalSearchRepository(
            createDatabase(getAllAsync),
          );

        const page = await repository.searchText(
          request({
            query: "Graça!",
            offset: 5,
            limit: 2,
          }),
        );

        expect(page).toEqual({
          items: [
            {
              id: `${EDITION_ID}:2`,
              editionId: EDITION_ID,
              number: 2,
              title: "Hino 2",
              firstLine: null,
            },
            {
              id: `${EDITION_ID}:7`,
              editionId: EDITION_ID,
              number: 7,
              title: "Hino 7",
              firstLine: "Primeira linha 7",
            },
          ],
          offset: 5,
          limit: 2,
          hasMore: true,
        });

        expect(getAllAsync).toHaveBeenCalledTimes(1);

        const sql = String(
          getAllAsync.mock.calls[0]?.[0],
        );
        const params =
          getAllAsync.mock.calls[0]?.[1];

        expect(sql).toContain(
          "FROM hymnal_search_dictionary AS d",
        );
        expect(sql).toContain(
          "JOIN hymnal_search_postings AS p",
        );
        expect(sql).toContain(
          "JOIN hymnal_search_documents AS sd",
        );
        expect(sql).toContain(
          "JOIN hymns AS h",
        );
        expect(sql).toContain(
          "WHERE d.term = ?",
        );
        expect(sql).toContain(
          "AND sd.edition_id = ?",
        );
        expect(sql).toContain(
          "ORDER BY\n        h.number,\n        h.id",
        );
        expect(sql).toContain(
          "LIMIT ? OFFSET ?;",
        );
        expect(sql).not.toContain(
          "hymnal_search_fts",
        );
        expect(params).toEqual([
          "graca",
          EDITION_ID,
          3,
          5,
        ]);
      },
    );

    it(
      "executes Web PHRASE search by term candidates plus normalized SQL phrase verification",
      async () => {
        const getAllAsync = jest
          .fn()
          .mockResolvedValue([
            makeRow(12),
            makeRow(44),
          ]);

        const repository =
          new SQLiteHymnalSearchRepository(
            createDatabase(getAllAsync),
          );

        const page = await repository.searchText(
          request({
            query: "Graça, de graça!",
            mode: "PHRASE",
            limit: 3,
          }),
        );

        expect(page.hasMore).toBe(false);
        expect(page.items.map((item) => item.number)).toEqual([
          12,
          44,
        ]);

        const sql = String(
          getAllAsync.mock.calls[0]?.[0],
        );
        const params =
          getAllAsync.mock.calls[0]?.[1];

        expect(sql).toContain(
          "WITH candidate_documents AS",
        );
        expect(sql).toContain(
          "d.term IN (?, ?)",
        );
        expect(sql).toContain(
          "AND sd_scope.edition_id = ?",
        );
        expect(sql).toContain(
          "HAVING COUNT(DISTINCT d.term) = ?",
        );
        expect(sql).toContain(
          "instr(",
        );
        expect(sql).toContain(
          "sd.normalized_text",
        );
        expect(sql).toContain(
          "ORDER BY\n        h.number,\n        h.id",
        );
        expect(params).toEqual([
          "graca",
          "de",
          EDITION_ID,
          2,
          EDITION_ID,
          "graca de graca",
          4,
          0,
        ]);
      },
    );

    it(
      "executes Native WORD search through FTS5 with normalized single term",
      async () => {
        setPlatform("android");

        const getAllAsync = jest
          .fn()
          .mockResolvedValue([
            makeRow(1),
          ]);

        const repository =
          new SQLiteHymnalSearchRepository(
            createDatabase(getAllAsync),
          );

        await repository.searchText(
          request({ query: "Graça" }),
        );

        const sql = String(
          getAllAsync.mock.calls[0]?.[0],
        );
        const params =
          getAllAsync.mock.calls[0]?.[1];

        expect(sql).toContain(
          "FROM hymnal_search_fts",
        );
        expect(sql).toContain(
          "WHERE hymnal_search_fts MATCH ?",
        );
        expect(sql).toContain(
          "AND hymnal_search_fts.edition_id = ?",
        );
        expect(sql).toContain(
          "JOIN hymns AS h",
        );
        expect(sql).toContain(
          "ORDER BY\n        h.number,\n        h.id",
        );
        expect(sql).not.toContain(
          "hymnal_search_dictionary",
        );
        expect(params).toEqual([
          "graca",
          EDITION_ID,
          26,
          0,
        ]);
      },
    );

    it(
      "executes Native PHRASE search through an exact normalized FTS phrase",
      async () => {
        setPlatform("android");

        const getAllAsync = jest
          .fn()
          .mockResolvedValue([
            makeRow(15),
          ]);

        const repository =
          new SQLiteHymnalSearchRepository(
            createDatabase(getAllAsync),
          );

        await repository.searchText(
          request({
            query: "Poder de Deus!",
            mode: "PHRASE",
          }),
        );

        const params =
          getAllAsync.mock.calls[0]?.[1];

        expect(params).toEqual([
          '"poder de deus"',
          EDITION_ID,
          26,
          0,
        ]);
      },
    );

    it(
      "rejects a row that escapes the requested edition scope",
      async () => {
        const getAllAsync = jest
          .fn()
          .mockResolvedValue([
            {
              ...makeRow(3),
              edition_id: "other-edition",
            },
          ]);

        const repository =
          new SQLiteHymnalSearchRepository(
            createDatabase(getAllAsync),
          );

        await expect(
          repository.searchText(request()),
        ).rejects.toThrow(
          `HYMNAL_SEARCH_RESULT_SCOPE_MISMATCH:EXPECTED=${EDITION_ID}:ACTUAL=other-edition`,
        );
      },
    );

    it(
      "creates the repository only from the bootstrapped hymnal database",
      async () => {
        const database = createDatabase(jest.fn());

        bootstrapMock.mockResolvedValue(database);

        const repository =
          await createSQLiteHymnalSearchRepository();

        expect(bootstrapMock).toHaveBeenCalledTimes(1);
        expect(repository).toBeInstanceOf(
          SQLiteHymnalSearchRepository,
        );
      },
    );

  },
);
