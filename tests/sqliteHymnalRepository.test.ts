import type {
  SQLiteDatabase,
} from "expo-sqlite";

jest.mock(
  "../src/hymnal/database/hymnalDatabaseBootstrap",
  () => ({
    bootstrapHymnalDatabase:
      jest.fn(),
  }),
);

import {
  bootstrapHymnalDatabase,
} from "../src/hymnal/database/hymnalDatabaseBootstrap";
import {
  SQLiteHymnalRepository,
  createSQLiteHymnalRepository,
} from "../src/hymnal/repositories/sqliteHymnalRepository";

const EDITION_ID =
  "harpa-crista-jornada-v1";

function editionRow() {
  return {
    id: EDITION_ID,
    code: "HCJ1",
    display_name: "Harpa Crist\u00e3",
    language_tag: "pt-BR",
    publication_year: null,
    expected_hymn_count: 636,
    rights_kind:
      "PROJECT_AUTHORIZED",
    authorization_status:
      "PENDING_FORMALIZATION",
    rights_identifier: null,
    attribution_required: 1,
  };
}

function hymnRow(
  number: number,
  id = `${EDITION_ID}:${number}`,
) {
  return {
    edition_id: EDITION_ID,
    id,
    number,
    title: `Hino ${number}`,
    first_line: `Linha ${number}`,
  };
}

function sectionRow(
  hymnId: string,
  order: number,
  kind = "VERSE",
) {
  return {
    edition_id: EDITION_ID,
    hymn_id: hymnId,
    section_order: order,
    kind,
    label: null,
    text: `Secao ${order}`,
  };
}

function createDatabaseMock() {
  const getAllAsync = jest.fn();
  const getFirstAsync = jest.fn();

  const database = {
    getAllAsync,
    getFirstAsync,
  } as unknown as SQLiteDatabase;

  return {
    database,
    getAllAsync,
    getFirstAsync,
  };
}

const mockedBootstrap =
  bootstrapHymnalDatabase as jest.MockedFunction<
    typeof bootstrapHymnalDatabase
  >;

describe(
  "SQLiteHymnalRepository",
  () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it(
      "lists enabled editions with domain metadata",
      async () => {
        const mock = createDatabaseMock();
        mock.getAllAsync.mockResolvedValue([
          editionRow(),
        ]);

        const repository =
          new SQLiteHymnalRepository(
            mock.database,
          );

        await expect(
          repository.listEditions(),
        ).resolves.toEqual([
          {
            id: EDITION_ID,
            code: "HCJ1",
            displayName:
              "Harpa Crist\u00e3",
            languageTag: "pt-BR",
            publicationYear: null,
            expectedHymnCount: 636,
            rightsKind:
              "PROJECT_AUTHORIZED",
            authorizationStatus:
              "PENDING_FORMALIZATION",
            rightsIdentifier: null,
            attributionRequired: true,
          },
        ]);

        expect(
          mock.getAllAsync,
        ).toHaveBeenCalledTimes(1);

        expect(
          mock.getAllAsync.mock.calls[0]?.[0],
        ).toContain("WHERE enabled = 1");

        expect(
          mock.getAllAsync.mock.calls[0]?.[0],
        ).toContain("ORDER BY code, id");
      },
    );

    it(
      "gets one enabled edition or null",
      async () => {
        const mock = createDatabaseMock();
        mock.getFirstAsync
          .mockResolvedValueOnce(
            editionRow(),
          )
          .mockResolvedValueOnce(null);

        const repository =
          new SQLiteHymnalRepository(
            mock.database,
          );

        await expect(
          repository.getEdition(
            EDITION_ID,
          ),
        ).resolves.toMatchObject({
          id: EDITION_ID,
          expectedHymnCount: 636,
        });

        await expect(
          repository.getEdition(
            "missing-edition",
          ),
        ).resolves.toBeNull();

        expect(
          mock.getFirstAsync.mock.calls[0]?.[1],
        ).toEqual([EDITION_ID]);
      },
    );

    it(
      "lists hymns in strictly increasing number order while allowing gaps",
      async () => {
        const mock = createDatabaseMock();
        mock.getAllAsync.mockResolvedValue([
          hymnRow(1),
          hymnRow(3),
          hymnRow(7),
        ]);

        const repository =
          new SQLiteHymnalRepository(
            mock.database,
          );

        const hymns =
          await repository.listHymns(
            EDITION_ID,
          );

        expect(
          hymns.map(
            (hymn) => hymn.number,
          ),
        ).toEqual([1, 3, 7]);

        expect(
          mock.getAllAsync.mock.calls[0]?.[1],
        ).toEqual([EDITION_ID]);

        expect(
          mock.getAllAsync.mock.calls[0]?.[0],
        ).toContain(
          "ORDER BY number, id",
        );
      },
    );

    it(
      "hydrates a hymn by id with sections in canonical order",
      async () => {
        const mock = createDatabaseMock();
        const row = hymnRow(12);
        mock.getFirstAsync.mockResolvedValue(
          row,
        );
        mock.getAllAsync.mockResolvedValue([
          sectionRow(row.id, 1),
          sectionRow(
            row.id,
            2,
            "CHORUS",
          ),
        ]);

        const repository =
          new SQLiteHymnalRepository(
            mock.database,
          );

        await expect(
          repository.getHymnById(
            EDITION_ID,
            row.id,
          ),
        ).resolves.toEqual({
          id: row.id,
          number: 12,
          title: "Hino 12",
          firstLine: "Linha 12",
          editionId: EDITION_ID,
          sections: [
            {
              order: 1,
              kind: "VERSE",
              label: null,
              text: "Secao 1",
            },
            {
              order: 2,
              kind: "CHORUS",
              label: null,
              text: "Secao 2",
            },
          ],
        });

        expect(
          mock.getFirstAsync.mock.calls[0]?.[1],
        ).toEqual([
          EDITION_ID,
          row.id,
        ]);

        expect(
          mock.getAllAsync.mock.calls[0]?.[1],
        ).toEqual([
          EDITION_ID,
          row.id,
        ]);
      },
    );

    it(
      "gets by number and returns null when the hymn does not exist",
      async () => {
        const mock = createDatabaseMock();
        const row = hymnRow(42);

        mock.getFirstAsync
          .mockResolvedValueOnce(row)
          .mockResolvedValueOnce(null);

        mock.getAllAsync.mockResolvedValue([
          sectionRow(row.id, 1),
        ]);

        const repository =
          new SQLiteHymnalRepository(
            mock.database,
          );

        await expect(
          repository.getHymnByNumber(
            EDITION_ID,
            42,
          ),
        ).resolves.toMatchObject({
          id: row.id,
          number: 42,
        });

        await expect(
          repository.getHymnByNumber(
            EDITION_ID,
            999,
          ),
        ).resolves.toBeNull();
      },
    );

    it(
      "fails closed for invalid database edition values and invalid hymn order",
      async () => {
        const metadataMock =
          createDatabaseMock();

        metadataMock.getAllAsync
          .mockResolvedValue([
            {
              ...editionRow(),
              rights_kind: "UNKNOWN",
            },
          ]);

        const metadataRepository =
          new SQLiteHymnalRepository(
            metadataMock.database,
          );

        await expect(
          metadataRepository.listEditions(),
        ).rejects.toThrow(
          "HYMNAL_REPOSITORY_INVALID_RIGHTS_KIND:UNKNOWN",
        );

        const orderMock =
          createDatabaseMock();

        orderMock.getAllAsync.mockResolvedValue([
          hymnRow(2),
          hymnRow(1),
        ]);

        const orderRepository =
          new SQLiteHymnalRepository(
            orderMock.database,
          );

        await expect(
          orderRepository.listHymns(
            EDITION_ID,
          ),
        ).rejects.toThrow(
          "HYMNAL_REPOSITORY_HYMN_ORDER_INVALID",
        );
      },
    );

    it(
      "fails closed for missing, misordered, or invalid hymn sections",
      async () => {
        const row = hymnRow(21);

        const emptyMock =
          createDatabaseMock();
        emptyMock.getFirstAsync
          .mockResolvedValue(row);
        emptyMock.getAllAsync
          .mockResolvedValue([]);

        await expect(
          new SQLiteHymnalRepository(
            emptyMock.database,
          ).getHymnById(
            EDITION_ID,
            row.id,
          ),
        ).rejects.toThrow(
          `HYMNAL_REPOSITORY_HYMN_HAS_NO_SECTIONS:${row.id}`,
        );

        const orderMock =
          createDatabaseMock();
        orderMock.getFirstAsync
          .mockResolvedValue(row);
        orderMock.getAllAsync
          .mockResolvedValue([
            sectionRow(row.id, 1),
            sectionRow(row.id, 3),
          ]);

        await expect(
          new SQLiteHymnalRepository(
            orderMock.database,
          ).getHymnById(
            EDITION_ID,
            row.id,
          ),
        ).rejects.toThrow(
          `HYMNAL_REPOSITORY_SECTION_ORDER_INVALID:${row.id}`,
        );

        const kindMock =
          createDatabaseMock();
        kindMock.getFirstAsync
          .mockResolvedValue(row);
        kindMock.getAllAsync
          .mockResolvedValue([
            sectionRow(
              row.id,
              1,
              "UNKNOWN",
            ),
          ]);

        await expect(
          new SQLiteHymnalRepository(
            kindMock.database,
          ).getHymnById(
            EDITION_ID,
            row.id,
          ),
        ).rejects.toThrow(
          "HYMNAL_REPOSITORY_INVALID_SECTION_KIND:UNKNOWN",
        );
      },
    );

    it(
      "creates the repository through the hymnal database bootstrap",
      async () => {
        const mock = createDatabaseMock();
        mockedBootstrap.mockResolvedValue(
          mock.database,
        );
        mock.getAllAsync.mockResolvedValue([]);

        const repository =
          await createSQLiteHymnalRepository();

        expect(
          mockedBootstrap,
        ).toHaveBeenCalledTimes(1);

        expect(repository).toBeInstanceOf(
          SQLiteHymnalRepository,
        );

        await expect(
          repository.listEditions(),
        ).resolves.toEqual([]);

        expect(
          mock.getAllAsync,
        ).toHaveBeenCalledTimes(1);
      },
    );
  },
);
