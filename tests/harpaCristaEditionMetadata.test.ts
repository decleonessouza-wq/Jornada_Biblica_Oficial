import {
  HARPA_CRISTA_JORNADA_ATTRIBUTION_POLICY,
  HARPA_CRISTA_JORNADA_DISPLAY_NAME,
  HARPA_CRISTA_JORNADA_EDITION_CODE,
  HARPA_CRISTA_JORNADA_EDITION_ID,
  HARPA_CRISTA_JORNADA_EDITION_METADATA,
  HARPA_CRISTA_JORNADA_LANGUAGE_TAG,
  HARPA_CRISTA_JORNADA_METADATA_VERSION,
} from "../src/hymnal/catalog/harpaCristaEditionMetadata";

describe(
  "Harpa Crista Jornada edition metadata foundation",
  () => {
    it(
      "freezes the stable product identity and Unicode display name",
      () => {
        expect(
          HARPA_CRISTA_JORNADA_METADATA_VERSION,
        ).toBe(1);

        expect(
          HARPA_CRISTA_JORNADA_EDITION_ID,
        ).toBe("harpa-crista-jornada-v1");

        expect(
          HARPA_CRISTA_JORNADA_EDITION_CODE,
        ).toBe("HCJ1");

        expect(
          HARPA_CRISTA_JORNADA_DISPLAY_NAME,
        ).toBe("Harpa Crist\u00e3");

        expect(
          HARPA_CRISTA_JORNADA_DISPLAY_NAME
            .codePointAt(
              HARPA_CRISTA_JORNADA_DISPLAY_NAME.length - 1,
            ),
        ).toBe(0x00e3);

        expect(
          HARPA_CRISTA_JORNADA_LANGUAGE_TAG,
        ).toBe("pt-BR");
      },
    );

    it(
      "freezes the 636-hymn edition metadata",
      () => {
        expect(
          HARPA_CRISTA_JORNADA_EDITION_METADATA,
        ).toEqual({
          id: "harpa-crista-jornada-v1",
          code: "HCJ1",
          displayName: "Harpa Crist\u00e3",
          languageTag: "pt-BR",
          publicationYear: null,
          expectedHymnCount: 636,
          rightsKind: "PROJECT_AUTHORIZED",
          authorizationStatus:
            "PENDING_FORMALIZATION",
          rightsIdentifier: null,
          attributionRequired: true,
        });
      },
    );

    it(
      "preserves pending formalization without inventing legal identifiers",
      () => {
        expect(
          HARPA_CRISTA_JORNADA_EDITION_METADATA
            .rightsKind,
        ).toBe("PROJECT_AUTHORIZED");

        expect(
          HARPA_CRISTA_JORNADA_EDITION_METADATA
            .authorizationStatus,
        ).toBe("PENDING_FORMALIZATION");

        expect(
          HARPA_CRISTA_JORNADA_EDITION_METADATA
            .rightsIdentifier,
        ).toBeNull();

        expect(
          HARPA_CRISTA_JORNADA_ATTRIBUTION_POLICY,
        ).toBe(
          "CONSERVATIVE_ATTRIBUTION_UNTIL_FORMALIZATION",
        );
      },
    );

    it(
      "keeps unavailable publication year explicit as null",
      () => {
        expect(
          HARPA_CRISTA_JORNADA_EDITION_METADATA
            .publicationYear,
        ).toBeNull();
      },
    );
  },
);
