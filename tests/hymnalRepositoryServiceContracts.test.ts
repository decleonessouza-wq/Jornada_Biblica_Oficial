import type {
  Hymn,
  HymnId,
  HymnNumber,
} from "../src/domain/hymnal/hymn";

import type {
  HymnalEditionId,
  HymnalEditionMetadata,
} from "../src/domain/hymnal/hymnalEdition";

import {
  HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
  HYMNAL_SYNTHETIC_FIXTURES,
} from "../src/hymnal/fixtures/hymnalSyntheticFixtures";

import type {
  HymnalHymnSummary,
  HymnalRepository,
} from "../src/hymnal/repositories/hymnalRepository";

import {
  HymnalCatalogService,
} from "../src/hymnal/services/hymnalCatalogService";

const SYNTHETIC_EDITION:
  HymnalEditionMetadata = {
    id:
      HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
    code: "SYNTHETIC",
    displayName:
      "Edição sintética de teste",
    languageTag: "pt-BR",
    publicationYear: null,
    expectedHymnCount: 3,
    rightsKind: "PROJECT_AUTHORIZED",
    authorizationStatus:
      "PENDING_FORMALIZATION",
    rightsIdentifier: null,
    attributionRequired: false,
  };

class InMemoryHymnalRepository
implements HymnalRepository {
  async listEditions(): Promise<
    readonly HymnalEditionMetadata[]
  > {
    return [SYNTHETIC_EDITION];
  }

  async getEdition(
    editionId: HymnalEditionId,
  ): Promise<HymnalEditionMetadata | null> {
    return editionId ===
      SYNTHETIC_EDITION.id
      ? SYNTHETIC_EDITION
      : null;
  }

  async listHymns(
    editionId: HymnalEditionId,
  ): Promise<readonly HymnalHymnSummary[]> {
    if (
      editionId !==
      SYNTHETIC_EDITION.id
    ) {
      return [];
    }

    return HYMNAL_SYNTHETIC_FIXTURES
      .map(
        (hymn): HymnalHymnSummary => ({
          id: hymn.id,
          editionId: hymn.editionId,
          number: hymn.number,
          title: hymn.title,
          firstLine: hymn.firstLine,
        }),
      )
      .sort(
        (left, right) =>
          left.number - right.number,
      );
  }

  async getHymnById(
    editionId: HymnalEditionId,
    hymnId: HymnId,
  ): Promise<Hymn | null> {
    if (
      editionId !==
      SYNTHETIC_EDITION.id
    ) {
      return null;
    }

    return (
      HYMNAL_SYNTHETIC_FIXTURES.find(
        (hymn) =>
          hymn.id === hymnId,
      ) ?? null
    );
  }

  async getHymnByNumber(
    editionId: HymnalEditionId,
    hymnNumber: HymnNumber,
  ): Promise<Hymn | null> {
    if (
      editionId !==
      SYNTHETIC_EDITION.id
    ) {
      return null;
    }

    return (
      HYMNAL_SYNTHETIC_FIXTURES.find(
        (hymn) =>
          hymn.number === hymnNumber,
      ) ?? null
    );
  }
}

describe("Hymnal repository and catalog service contracts", () => {
  it("lists the three synthetic fixtures in ascending number order", async () => {
    const service =
      new HymnalCatalogService(
        new InMemoryHymnalRepository(),
      );

    const hymns =
      await service.listHymns(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
      );

    expect(
      hymns.map(
        (hymn) => hymn.number,
      ),
    ).toEqual([
      9001,
      9002,
      9003,
    ]);
  });

  it("gets a hymn by id", async () => {
    const service =
      new HymnalCatalogService(
        new InMemoryHymnalRepository(),
      );

    const hymn =
      await service.getHymnById(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
        "synthetic-hymn-9002",
      );

    expect(hymn?.number).toBe(9002);
  });

  it("gets a hymn by number", async () => {
    const service =
      new HymnalCatalogService(
        new InMemoryHymnalRepository(),
      );

    const hymn =
      await service.getHymnByNumber(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
        9003,
      );

    expect(
      hymn?.id,
    ).toBe("synthetic-hymn-9003");
  });

  it("returns the synthetic edition through the service", async () => {
    const service =
      new HymnalCatalogService(
        new InMemoryHymnalRepository(),
      );

    const edition =
      await service.getEdition(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
      );

    expect(
      edition?.id,
    ).toBe(
      HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
    );
  });

  it("fails closed for a blank edition id", async () => {
    const service =
      new HymnalCatalogService(
        new InMemoryHymnalRepository(),
      );

    await expect(
      service.listHymns("   "),
    ).rejects.toThrow(
      "HYMNAL_CATALOG_INVALID_EDITION_ID",
    );
  });

  it("fails closed for a blank hymn id", async () => {
    const service =
      new HymnalCatalogService(
        new InMemoryHymnalRepository(),
      );

    await expect(
      service.getHymnById(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
        "   ",
      ),
    ).rejects.toThrow(
      "HYMNAL_CATALOG_INVALID_HYMN_ID",
    );
  });

  it.each([
    0,
    -1,
    1.5,
  ])(
    "fails closed for invalid hymn number %s",
    async (invalidNumber) => {
      const service =
        new HymnalCatalogService(
          new InMemoryHymnalRepository(),
        );

      await expect(
        service.getHymnByNumber(
          HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
          invalidNumber,
        ),
      ).rejects.toThrow(
        "HYMNAL_CATALOG_INVALID_HYMN_NUMBER",
      );
    },
  );

  it("fails closed when getEdition returns a different edition", async () => {
    class InconsistentEditionRepository
    extends InMemoryHymnalRepository {
      override async getEdition():
        Promise<HymnalEditionMetadata> {
        return {
          ...SYNTHETIC_EDITION,
          id: "wrong-edition",
        };
      }
    }

    const service =
      new HymnalCatalogService(
        new InconsistentEditionRepository(),
      );

    await expect(
      service.getEdition(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
      ),
    ).rejects.toThrow(
      "HYMNAL_CATALOG_EDITION_RESULT_MISMATCH",
    );
  });

  it("fails closed when getHymnById returns inconsistent identity", async () => {
    class InconsistentIdRepository
    extends InMemoryHymnalRepository {
      override async getHymnById():
        Promise<Hymn> {
        return {
          ...HYMNAL_SYNTHETIC_FIXTURES[0],
          id: "wrong-hymn-id",
        };
      }
    }

    const service =
      new HymnalCatalogService(
        new InconsistentIdRepository(),
      );

    await expect(
      service.getHymnById(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
        "synthetic-hymn-9001",
      ),
    ).rejects.toThrow(
      "HYMNAL_CATALOG_HYMN_ID_RESULT_MISMATCH",
    );
  });

  it("fails closed when getHymnByNumber returns inconsistent identity", async () => {
    class InconsistentNumberRepository
    extends InMemoryHymnalRepository {
      override async getHymnByNumber():
        Promise<Hymn> {
        return {
          ...HYMNAL_SYNTHETIC_FIXTURES[0],
          number: 9999,
        };
      }
    }

    const service =
      new HymnalCatalogService(
        new InconsistentNumberRepository(),
      );

    await expect(
      service.getHymnByNumber(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
        9001,
      ),
    ).rejects.toThrow(
      "HYMNAL_CATALOG_HYMN_NUMBER_RESULT_MISMATCH",
    );
  });

  it("does not expose search behavior in the foundation contracts", () => {
    const repository =
      new InMemoryHymnalRepository();

    const service =
      new HymnalCatalogService(
        repository,
      );

    expect(
      "search" in repository,
    ).toBe(false);

    expect(
      "searchText" in repository,
    ).toBe(false);

    expect(
      "search" in service,
    ).toBe(false);

    expect(
      "searchText" in service,
    ).toBe(false);
  });
});
