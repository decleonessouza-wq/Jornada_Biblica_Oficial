import * as hymnalImportContractModule from
  "../src/hymnal/import/hymnalImportContract";

import {
  HYMNAL_IMPORTER_CONTRACT_VERSION,
  HYMNAL_IMPORT_VALIDATION_ISSUE_CODES,
  HYMNAL_SOURCE_ARTIFACT_KINDS,
  type NormalizedHymnRecord,
} from "../src/hymnal/import/hymnalImportContract";

import {
  HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
  HYMNAL_SYNTHETIC_FIXTURE_POLICY,
  HYMNAL_SYNTHETIC_FIXTURES,
} from "../src/hymnal/fixtures/hymnalSyntheticFixtures";

describe("Hymnal import foundation", () => {
  it("locks the importer contract at version 1", () => {
    expect(
      HYMNAL_IMPORTER_CONTRACT_VERSION,
    ).toBe(1);
  });

  it("declares candidate source artifact kinds without selecting a real source", () => {
    expect(
      HYMNAL_SOURCE_ARTIFACT_KINDS,
    ).toEqual([
      "UTF8_TEXT",
      "JSON",
      "CSV",
      "XLSX",
      "DOCX",
      "PDF",
    ]);
  });

  it("declares stable fail-closed validation issue codes", () => {
    expect(
      HYMNAL_IMPORT_VALIDATION_ISSUE_CODES,
    ).toEqual([
      "INVALID_EDITION_ID",
      "INVALID_HYMN_COUNT",
      "INVALID_HYMN_ID",
      "INVALID_HYMN_NUMBER",
      "INVALID_TITLE",
      "EMPTY_SECTION",
      "INVALID_SECTION_ORDER",
      "INVALID_SECTION_KIND",
      "DUPLICATE_HYMN_ID",
      "DUPLICATE_HYMN_NUMBER",
      "HASH_MISMATCH",
    ]);
  });

  it("does not export any concrete real-source artifact lock", () => {
    expect(
      Object.prototype.hasOwnProperty.call(
        hymnalImportContractModule,
        "HYMNAL_SOURCE_ARTIFACT_LOCKS",
      ),
    ).toBe(false);

    expect(
      Object.prototype.hasOwnProperty.call(
        hymnalImportContractModule,
        "HARPA_SOURCE_ARTIFACT_LOCK",
      ),
    ).toBe(false);
  });

  it("marks synthetic fixtures as permanently ineligible for production", () => {
    expect(
      HYMNAL_SYNTHETIC_FIXTURE_POLICY,
    ).toEqual({
      kind: "SYNTHETIC_TEST_ONLY",
      productionEligible: false,
      hymnCount: 3,
      editionId: "synthetic-test-only",
    });
  });

  it("contains exactly three unmistakably synthetic hymns", () => {
    expect(
      HYMNAL_SYNTHETIC_FIXTURES,
    ).toHaveLength(3);

    expect(
      HYMNAL_SYNTHETIC_FIXTURES.map(
        (hymn) => hymn.number,
      ),
    ).toEqual([
      9001,
      9002,
      9003,
    ]);

    for (
      const hymn of
      HYMNAL_SYNTHETIC_FIXTURES
    ) {
      expect(
        hymn.editionId,
      ).toBe(
        HYMNAL_SYNTHETIC_FIXTURE_EDITION_ID,
      );

      expect(
        hymn.number,
      ).toBeGreaterThanOrEqual(9000);

      expect(
        hymn.title,
      ).toContain("Sintético");

      expect(
        hymn.firstLine,
      ).toContain("[SYNTHETIC]");

      expect(
        hymn.sections.length,
      ).toBeGreaterThan(0);

      for (
        const section of hymn.sections
      ) {
        expect(
          section.text.startsWith(
            "[SYNTHETIC]",
          ),
        ).toBe(true);
      }
    }
  });

  it("keeps synthetic fixture ids and numbers unique", () => {
    const ids =
      HYMNAL_SYNTHETIC_FIXTURES.map(
        (hymn) => hymn.id,
      );

    const numbers =
      HYMNAL_SYNTHETIC_FIXTURES.map(
        (hymn) => hymn.number,
      );

    expect(
      new Set(ids).size,
    ).toBe(ids.length);

    expect(
      new Set(numbers).size,
    ).toBe(numbers.length);
  });

  it("is structurally compatible with normalized hymn records", () => {
    const normalized:
      NormalizedHymnRecord =
        HYMNAL_SYNTHETIC_FIXTURES[0];

    expect(
      normalized.number,
    ).toBe(9001);

    expect(
      normalized.sections[0].kind,
    ).toBe("VERSE");
  });
  it("models a complete synthetic source artifact lock contract", () => {
    const sourceLock: import("../src/hymnal/import/hymnalImportContract").HymnalSourceArtifactLock = {
      editionId: "synthetic-test-only",
      sourceArtifact: "synthetic-source-artifact.json",
      sourceArtifactKind: "JSON",
      sourceArtifactOrigin: "synthetic-test-suite",
      sourceRevision: "synthetic-revision-v1",
      sourceSha256: "a".repeat(64),
      sourceByteLength: 128,
      lockedAt: "2026-01-01T00:00:00.000Z",
    };

    expect(sourceLock).toEqual({
      editionId: "synthetic-test-only",
      sourceArtifact: "synthetic-source-artifact.json",
      sourceArtifactKind: "JSON",
      sourceArtifactOrigin: "synthetic-test-suite",
      sourceRevision: "synthetic-revision-v1",
      sourceSha256: "a".repeat(64),
      sourceByteLength: 128,
      lockedAt: "2026-01-01T00:00:00.000Z",
    });
  });

  it("models a normalized artifact lock without losing source provenance", () => {
    const sourceLock: import("../src/hymnal/import/hymnalImportContract").HymnalSourceArtifactLock = {
      editionId: "synthetic-test-only",
      sourceArtifact: "synthetic-source-artifact.json",
      sourceArtifactKind: "JSON",
      sourceArtifactOrigin: "synthetic-test-suite",
      sourceRevision: "synthetic-revision-v1",
      sourceSha256: "a".repeat(64),
      sourceByteLength: 128,
      lockedAt: "2026-01-01T00:00:00.000Z",
    };

    const normalizedLock: import("../src/hymnal/import/hymnalImportContract").HymnalNormalizedArtifactLock = {
      ...sourceLock,
      normalizedSha256: "b".repeat(64),
      importerVersion: HYMNAL_IMPORTER_CONTRACT_VERSION,
    };

    expect(normalizedLock.editionId).toBe(
      sourceLock.editionId,
    );
    expect(normalizedLock.sourceArtifact).toBe(
      sourceLock.sourceArtifact,
    );
    expect(normalizedLock.sourceArtifactKind).toBe(
      sourceLock.sourceArtifactKind,
    );
    expect(normalizedLock.sourceArtifactOrigin).toBe(
      sourceLock.sourceArtifactOrigin,
    );
    expect(normalizedLock.sourceRevision).toBe(
      sourceLock.sourceRevision,
    );
    expect(normalizedLock.sourceSha256).toBe(
      sourceLock.sourceSha256,
    );
    expect(normalizedLock.sourceByteLength).toBe(
      sourceLock.sourceByteLength,
    );
    expect(normalizedLock.lockedAt).toBe(
      sourceLock.lockedAt,
    );
    expect(normalizedLock.normalizedSha256).toBe(
      "b".repeat(64),
    );
    expect(normalizedLock.importerVersion).toBe(
      HYMNAL_IMPORTER_CONTRACT_VERSION,
    );
  });
});
