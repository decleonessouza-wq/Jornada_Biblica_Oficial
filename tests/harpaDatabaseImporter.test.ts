import type {
  HymnalEditionId,
} from "../src/domain/hymnal/hymnalEdition";

import {
  HYMNAL_IMPORTER_CONTRACT_VERSION,
  type HymnalImportPackage,
  type NormalizedHymnRecord,
  type NormalizedHymnSectionRecord,
} from "../src/hymnal/import/hymnalImportContract";

import {
  HARPA_DATABASE_IMPORT_PLAN_VERSION,
  buildHarpaDatabaseImportPlan,
} from "../src/hymnal/import/harpaDatabaseImporter";

const SYNTHETIC_EDITION_ID =
  "HARPA_SYNTHETIC_DATABASE_IMPORTER_TEST" as unknown as HymnalEditionId;

const SYNTHETIC_SOURCE_SHA256 =
  "1".repeat(64);

const SYNTHETIC_NORMALIZED_SHA256 =
  "2".repeat(64);

function makeSections(
  ...texts: string[]
): NormalizedHymnRecord["sections"] {
  if (texts.length === 0) {
    throw new Error(
      "SYNTHETIC_TEST_REQUIRES_SECTION",
    );
  }

  return texts.map(
    (text, index): NormalizedHymnSectionRecord => ({
      order: index + 1,
      kind:
        "VERSE" as NormalizedHymnSectionRecord["kind"],
      label: null,
      text,
    }),
  ) as unknown as NormalizedHymnRecord["sections"];
}

function makeHymn(
  id: string,
  number: number,
  title: string,
  firstLine: string | null,
  ...sectionTexts: string[]
): NormalizedHymnRecord {
  return {
    editionId: SYNTHETIC_EDITION_ID,
    id,
    number,
    title,
    firstLine,
    sections: makeSections(...sectionTexts),
  };
}

function countSections(
  hymns: readonly NormalizedHymnRecord[],
): number {
  return hymns.reduce(
    (total, hymn) =>
      total + hymn.sections.length,
    0,
  );
}

function makeSyntheticPackage(
  hymns: readonly NormalizedHymnRecord[] = [
    makeHymn(
      "synthetic-hymn-alpha",
      10,
      "Synthetic Hymn Alpha",
      "Synthetic alpha first line",
      "Synthetic alpha section",
    ),
    makeHymn(
      "synthetic-hymn-beta",
      20,
      "Synthetic Hymn Beta",
      "Synthetic beta first line",
      "Synthetic beta section one",
      "Synthetic beta section two",
    ),
    makeHymn(
      "synthetic-hymn-gamma",
      30,
      "Synthetic Hymn Gamma",
      null,
      "Synthetic gamma section",
    ),
  ],
): HymnalImportPackage {
  return {
    editionId: SYNTHETIC_EDITION_ID,
    artifactLock: {
      editionId: SYNTHETIC_EDITION_ID,
      sourceArtifact:
        "synthetic-harvest-source.txt",
      sourceArtifactKind: "UTF8_TEXT",
      sourceArtifactOrigin:
        "synthetic://harpa-database-importer.test",
      sourceRevision: "synthetic-v1",
      sourceSha256:
        SYNTHETIC_SOURCE_SHA256,
      sourceByteLength: 1234,
      lockedAt:
        "2000-01-01T00:00:00.000Z",
      normalizedSha256:
        SYNTHETIC_NORMALIZED_SHA256,
      importerVersion:
        HYMNAL_IMPORTER_CONTRACT_VERSION,
    },
    hymns,
    validation: {
      editionId: SYNTHETIC_EDITION_ID,
      valid: true,
      hymnCount: hymns.length,
      sectionCount: countSections(hymns),
      issues: [],
    },
  };
}

function replaceHymns(
  importPackage: HymnalImportPackage,
  hymns: readonly NormalizedHymnRecord[],
): HymnalImportPackage {
  return {
    ...importPackage,
    hymns,
    validation: {
      ...importPackage.validation,
      hymnCount: hymns.length,
      sectionCount: countSections(hymns),
    },
  };
}

describe(
  "Harpa database importer pure synthetic contract",
  () => {
    it(
      "builds deterministic logical rows from synthetic input",
      () => {
        const importPackage =
          makeSyntheticPackage();

        const first =
          buildHarpaDatabaseImportPlan(
            importPackage,
          );

        const second =
          buildHarpaDatabaseImportPlan(
            importPackage,
          );

        expect(first.version).toBe(
          HARPA_DATABASE_IMPORT_PLAN_VERSION,
        );
        expect(first.hymnCount).toBe(3);
        expect(first.sectionCount).toBe(4);
        expect(
          first.hymns.map(
            (hymn) => hymn.number,
          ),
        ).toEqual([10, 20, 30]);
        expect(
          first.sections.map(
            (section) => [
              section.hymnNumber,
              section.order,
            ],
          ),
        ).toEqual([
          [10, 1],
          [20, 1],
          [20, 2],
          [30, 1],
        ]);
        expect(first.sourceSha256).toBe(
          SYNTHETIC_SOURCE_SHA256,
        );
        expect(first.normalizedSha256).toBe(
          SYNTHETIC_NORMALIZED_SHA256,
        );
        expect(JSON.stringify(first)).toBe(
          JSON.stringify(second),
        );
      },
    );

    it(
      "preserves numeric gaps while requiring increasing order",
      () => {
        const importPackage =
          makeSyntheticPackage();

        expect(
          buildHarpaDatabaseImportPlan(
            importPackage,
          ).hymns.map(
            (hymn) => hymn.number,
          ),
        ).toEqual([10, 20, 30]);

        const outOfOrder = replaceHymns(
          importPackage,
          [
            importPackage.hymns[1],
            importPackage.hymns[0],
            importPackage.hymns[2],
          ],
        );

        expect(() =>
          buildHarpaDatabaseImportPlan(
            outOfOrder,
          ),
        ).toThrow(
          "HARPA_DATABASE_IMPORTER_HYMN_ORDER",
        );
      },
    );

    it(
      "fails closed when the validation report rejects the package",
      () => {
        const importPackage =
          makeSyntheticPackage();

        const rejected: HymnalImportPackage = {
          ...importPackage,
          validation: {
            ...importPackage.validation,
            valid: false,
            issues: [
              {
                code: "INVALID_TITLE",
                message:
                  "Synthetic rejected title",
              },
            ],
          },
        };

        expect(() =>
          buildHarpaDatabaseImportPlan(
            rejected,
          ),
        ).toThrow(
          "HARPA_DATABASE_IMPORTER_VALIDATION_REJECTED",
        );
      },
    );

    it(
      "fails closed on duplicate hymn identity and number",
      () => {
        const importPackage =
          makeSyntheticPackage();

        const duplicateId: NormalizedHymnRecord =
          {
            ...importPackage.hymns[1],
            id: importPackage.hymns[0].id,
          };

        expect(() =>
          buildHarpaDatabaseImportPlan(
            replaceHymns(
              importPackage,
              [
                importPackage.hymns[0],
                duplicateId,
                importPackage.hymns[2],
              ],
            ),
          ),
        ).toThrow(
          "HARPA_DATABASE_IMPORTER_DUPLICATE_HYMN_ID",
        );

        const duplicateNumber:
          NormalizedHymnRecord = {
          ...importPackage.hymns[1],
          number:
            importPackage.hymns[0].number,
        };

        expect(() =>
          buildHarpaDatabaseImportPlan(
            replaceHymns(
              importPackage,
              [
                importPackage.hymns[0],
                duplicateNumber,
                importPackage.hymns[2],
              ],
            ),
          ),
        ).toThrow(
          "HARPA_DATABASE_IMPORTER_DUPLICATE_HYMN_NUMBER",
        );
      },
    );

    it(
      "fails closed on invalid title, number, section order, and empty section",
      () => {
        const importPackage =
          makeSyntheticPackage();

        const invalidTitle:
          NormalizedHymnRecord = {
          ...importPackage.hymns[0],
          title: "   ",
        };

        expect(() =>
          buildHarpaDatabaseImportPlan(
            replaceHymns(
              importPackage,
              [
                invalidTitle,
                importPackage.hymns[1],
                importPackage.hymns[2],
              ],
            ),
          ),
        ).toThrow(
          "HARPA_DATABASE_IMPORTER_INVALID_TITLE",
        );

        const invalidNumber:
          NormalizedHymnRecord = {
          ...importPackage.hymns[0],
          number: 0,
        };

        expect(() =>
          buildHarpaDatabaseImportPlan(
            replaceHymns(
              importPackage,
              [
                invalidNumber,
                importPackage.hymns[1],
                importPackage.hymns[2],
              ],
            ),
          ),
        ).toThrow(
          "HARPA_DATABASE_IMPORTER_INVALID_HYMN_NUMBER",
        );

        const invalidOrderSections =
          [
            {
              ...importPackage.hymns[0]
                .sections[0],
              order: 2,
            },
          ] as unknown as NormalizedHymnRecord["sections"];

        const invalidOrder:
          NormalizedHymnRecord = {
          ...importPackage.hymns[0],
          sections: invalidOrderSections,
        };

        expect(() =>
          buildHarpaDatabaseImportPlan(
            replaceHymns(
              importPackage,
              [
                invalidOrder,
                importPackage.hymns[1],
                importPackage.hymns[2],
              ],
            ),
          ),
        ).toThrow(
          "HARPA_DATABASE_IMPORTER_INVALID_SECTION_ORDER",
        );

        const emptySectionRows =
          [
            {
              ...importPackage.hymns[0]
                .sections[0],
              text: " ",
            },
          ] as unknown as NormalizedHymnRecord["sections"];

        const emptySection:
          NormalizedHymnRecord = {
          ...importPackage.hymns[0],
          sections: emptySectionRows,
        };

        expect(() =>
          buildHarpaDatabaseImportPlan(
            replaceHymns(
              importPackage,
              [
                emptySection,
                importPackage.hymns[1],
                importPackage.hymns[2],
              ],
            ),
          ),
        ).toThrow(
          "HARPA_DATABASE_IMPORTER_EMPTY_SECTION",
        );
      },
    );
  },
);
