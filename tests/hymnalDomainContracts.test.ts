import {
  HYMN_SECTION_KINDS,
  type Hymn,
} from "../src/domain/hymnal/hymn";

import {
  HYMNAL_AUTHORIZATION_STATUSES,
  HYMNAL_RIGHTS_KINDS,
  type HymnalEditionMetadata,
} from "../src/domain/hymnal/hymnalEdition";

import {
  REQUIRED_HYMN_COUNT,
  isHymnSectionKind,
  isHymnalAuthorizationStatus,
  isHymnalRightsKind,
} from "../src/domain/hymnal/hymnalContracts";

describe("Hymnal domain contracts", () => {
  it("freezes the expected Harpa corpus size at 636 hymns", () => {
    expect(REQUIRED_HYMN_COUNT).toBe(636);
  });

  it("recognizes only the declared hymn section kinds", () => {
    for (const kind of HYMN_SECTION_KINDS) {
      expect(isHymnSectionKind(kind)).toBe(true);
    }

    expect(
      isHymnSectionKind("UNKNOWN"),
    ).toBe(false);
  });

  it("recognizes only the declared rights kinds", () => {
    for (const rightsKind of HYMNAL_RIGHTS_KINDS) {
      expect(
        isHymnalRightsKind(rightsKind),
      ).toBe(true);
    }

    expect(
      isHymnalRightsKind("UNKNOWN"),
    ).toBe(false);
  });

  it("recognizes only the declared authorization statuses", () => {
    for (
      const status of
      HYMNAL_AUTHORIZATION_STATUSES
    ) {
      expect(
        isHymnalAuthorizationStatus(status),
      ).toBe(true);
    }

    expect(
      isHymnalAuthorizationStatus("UNKNOWN"),
    ).toBe(false);
  });

  it("supports a structured non-empty hymn contract", () => {
    const hymn: Hymn = {
      id: "sample-hymn",
      number: 1,
      title: "Hino sintético de teste",
      firstLine: "Primeira linha sintética",
      editionId: "sample-edition",
      sections: [
        {
          order: 1,
          kind: "VERSE",
          label: "1",
          text: "Conteúdo sintético para teste.",
        },
      ],
    };

    expect(hymn.number).toBe(1);
    expect(hymn.sections).toHaveLength(1);
    expect(hymn.sections[0].kind).toBe("VERSE");
  });

  it("represents current project authorization without claiming completed formalization", () => {
    const edition: HymnalEditionMetadata = {
      id: "sample-edition",
      code: "SAMPLE",
      displayName: "Edição sintética de teste",
      languageTag: "pt-BR",
      publicationYear: null,
      expectedHymnCount: REQUIRED_HYMN_COUNT,
      rightsKind: "PROJECT_AUTHORIZED",
      authorizationStatus: "PENDING_FORMALIZATION",
      rightsIdentifier: null,
      attributionRequired: false,
    };

    expect(edition.expectedHymnCount).toBe(636);
    expect(edition.rightsKind).toBe(
      "PROJECT_AUTHORIZED",
    );
    expect(edition.authorizationStatus).toBe(
      "PENDING_FORMALIZATION",
    );
  });
});
