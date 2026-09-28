import { formatBibleReference } from "../src/domain/bible/bibleReferenceFormatter";
import {
  resolveStudyKeepFavoriteReferences,
} from "../src/studies/runtime/studyKeepFavoriteResolver";
import {
  studyRuntimeCatalog,
} from "../src/studies/runtime/studyRuntimeCatalog";

function canonicalReferencesFor(
  studyId: string,
): readonly string[] {
  const result =
    resolveStudyKeepFavoriteReferences(studyId);

  if (!result.ok) {
    return [];
  }

  return result.references.map(
    (reference) => reference.canonicalText,
  );
}

describe("studyKeepFavoriteResolver", () => {
  it("resolves the audited KEEP favorite contract for 75 of 76 runtime studies", () => {
    let resolvedStudyCount = 0;
    let unresolvedStudyCount = 0;
    let referenceCount = 0;
    const globalReferences = new Set<string>();

    for (const entry of studyRuntimeCatalog.studies) {
      const result =
        resolveStudyKeepFavoriteReferences(
          entry.content.id,
        );

      if (!result.ok) {
        unresolvedStudyCount += 1;
        continue;
      }

      resolvedStudyCount += 1;
      referenceCount += result.references.length;

      for (const item of result.references) {
        expect(
          formatBibleReference(item.reference),
        ).toBe(item.canonicalText);
        globalReferences.add(item.canonicalText);
      }
    }

    expect(studyRuntimeCatalog.studies).toHaveLength(76);
    expect(resolvedStudyCount).toBe(75);
    expect(unresolvedStudyCount).toBe(1);
    expect(referenceCount).toBe(147);
    expect(globalReferences.size).toBe(129);
  });

  it("keeps the collaborative Track 5 anomaly fail-closed without inventing a reference", () => {
    expect(
      resolveStudyKeepFavoriteReferences(
        "track-05-study-01",
      ),
    ).toEqual({
      ok: false,
      code: "KEEP_NOT_FAVORITABLE",
    });
  });

  it("lets an explicit save directive override contextual references in the same KEEP section", () => {
    expect(
      canonicalReferencesFor(
        "track-01-study-10",
      ),
    ).toEqual([
      "Lucas 24:44-49",
    ]);
  });

  it("resolves the single audited same-book locator shorthand without broad inference", () => {
    expect(
      canonicalReferencesFor(
        "track-01-study-12",
      ),
    ).toEqual([
      "1 Coríntios 15:20",
      "1 Coríntios 15:54-57",
    ]);
  });

  it("normalizes only audited syntax variants while preserving the intended references", () => {
    expect(
      canonicalReferencesFor(
        "track-01-study-02",
      ),
    ).toEqual([
      "Romanos 5:12",
      "Romanos 5:18-19",
    ]);

    expect(
      canonicalReferencesFor(
        "track-02-study-04",
      ),
    ).toEqual([
      "Lamentações 3:22-23",
      "Salmos 103:8",
    ]);
  });

  it("deduplicates canonical references inside each KEEP result", () => {
    for (const entry of studyRuntimeCatalog.studies) {
      const result =
        resolveStudyKeepFavoriteReferences(
          entry.content.id,
        );

      if (!result.ok) {
        continue;
      }

      const canonical = result.references.map(
        (reference) => reference.canonicalText,
      );

      expect(new Set(canonical).size).toBe(
        canonical.length,
      );
    }
  });
});
