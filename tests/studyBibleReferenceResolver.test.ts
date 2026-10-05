import type {
  StudyId,
  StudySection,
  StudySectionId,
} from "../src/domain/studies/study";
import {
  resolveRuntimeStudyBibleLinks,
  resolveRuntimeStudyBibleReading,
  resolveStudyBibleLinks,
  resolveStudyBibleReading,
} from "../src/studies/runtime/studyBibleReferenceResolver";
import { studyRuntimeCatalog } from "../src/studies/runtime/studyRuntimeCatalog";

const section = (
  id: string,
  texts: readonly string[],
): StudySection => ({
  id: id as StudySectionId,
  studyId: "test-study" as StudyId,
  type: "BIBLE_READING",
  title: "Leitura Bíblica",
  iconKey: "leitura_biblica",
  blocks: texts.map((text) => ({
    type: "PARAGRAPH" as const,
    text,
  })),
  order: 3,
  optional: false,
  collapsible: true,
});

describe("studyBibleReferenceResolver", () => {
  it("resolves exactly the 66 released studies with explicit BIBLE_READING and leaves Track 1 unavailable", () => {
    const before = JSON.stringify(studyRuntimeCatalog.packages);

    const results = studyRuntimeCatalog.studies.map(
      ({ content }) => ({
        content,
        result: resolveRuntimeStudyBibleReading(content.id),
      }),
    );

    const resolved = results.filter(
      (entry) => entry.result.ok,
    );
    const unresolved = results.filter(
      (entry) => !entry.result.ok,
    );

    expect(studyRuntimeCatalog.studies).toHaveLength(84);
    expect(resolved).toHaveLength(66);
    expect(unresolved).toHaveLength(18);

    expect(
      unresolved.every(
        ({ content, result }) =>
          content.trackId === "track-01" &&
          !result.ok &&
          result.code === "BIBLE_READING_NOT_FOUND",
      ),
    ).toBe(true);

    expect(
      resolved.every(
        ({ content }) => content.trackId !== "track-01",
      ),
    ).toBe(true);

    expect(JSON.stringify(studyRuntimeCatalog.packages)).toBe(
      before,
    );
  });

  it("normalizes deterministic same-chapter comma shorthand without changing editorial content", () => {
    const track02 =
      resolveRuntimeStudyBibleReading("track-02-study-01");
    const track06 =
      resolveRuntimeStudyBibleReading("track-06-study-05");

    expect(track02).toEqual(
      expect.objectContaining({
        ok: true,
        sourceText: "Gênesis 1:1-5, 26-31",
      }),
    );

    if (!track02.ok) {
      throw new Error("Expected Track 2 study 1 reading to resolve.");
    }

    expect(track02.reference.passages).toEqual([
      {
        kind: "VERSE_RANGE",
        bookId: "GEN",
        start: { chapter: 1, verse: 1 },
        end: { chapter: 1, verse: 5 },
      },
      {
        kind: "VERSE_RANGE",
        bookId: "GEN",
        start: { chapter: 1, verse: 26 },
        end: { chapter: 1, verse: 31 },
      },
    ]);

    expect(track06).toEqual(
      expect.objectContaining({
        ok: true,
        sourceText: "Hebreus 11:1-6,32-40",
      }),
    );

    if (!track06.ok) {
      throw new Error("Expected Track 6 study 5 reading to resolve.");
    }

    expect(track06.reference.passages).toEqual([
      {
        kind: "VERSE_RANGE",
        bookId: "HEB",
        start: { chapter: 11, verse: 1 },
        end: { chapter: 11, verse: 6 },
      },
      {
        kind: "VERSE_RANGE",
        bookId: "HEB",
        start: { chapter: 11, verse: 32 },
        end: { chapter: 11, verse: 40 },
      },
    ]);
  });

  it("normalizes the explicit singular Salmo label to the canonical Psalms identity", () => {
    const cases = [
      ["track-04-study-09", "Salmo 1:1-6", 1, 1, 6],
      ["track-04-study-11", "Salmo 13:1-6", 13, 1, 6],
      ["track-06-study-08", "Salmo 27:7-14", 27, 7, 14],
    ] as const;

    for (
      const [
        studyId,
        sourceText,
        chapter,
        startVerse,
        endVerse,
      ] of cases
    ) {
      const result =
        resolveRuntimeStudyBibleReading(studyId);

      expect(result).toEqual(
        expect.objectContaining({
          ok: true,
          sourceText,
        }),
      );

      if (!result.ok) {
        throw new Error(`Expected ${studyId} reading to resolve.`);
      }

      expect(result.reference.passages).toEqual([
        {
          kind: "VERSE_RANGE",
          bookId: "PSA",
          start: { chapter, verse: startVerse },
          end: { chapter, verse: endVerse },
        },
      ]);
    }
  });

  it("accepts an exact composite primary reading when the section has no editorial label", () => {
    const result =
      resolveRuntimeStudyBibleReading("track-05-study-01");

    expect(result).toEqual(
      expect.objectContaining({
        ok: true,
      }),
    );

    if (!result.ok) {
      throw new Error("Expected Track 5 reading to resolve.");
    }

    expect(result.reference.passages).toEqual([
      {
        kind: "VERSE",
        bookId: "JHN",
        chapter: 3,
        verse: 16,
      },
      {
        kind: "VERSE_RANGE",
        bookId: "ROM",
        start: { chapter: 3, verse: 23 },
        end: { chapter: 3, verse: 24 },
      },
      {
        kind: "VERSE_RANGE",
        bookId: "EPH",
        start: { chapter: 2, verse: 8 },
        end: { chapter: 2, verse: 9 },
      },
    ]);
  });

  it("fails closed when two distinct unlabeled references are independently parseable", () => {
    expect(
      resolveStudyBibleReading([
        section("ambiguous-section", [
          "João 3:16",
          "Romanos 3:23-24",
        ]),
      ]),
    ).toEqual({
      ok: false,
      code: "PRIMARY_REFERENCE_AMBIGUOUS",
    });
  });

  it("fails closed when an explicitly labeled primary reading cannot be parsed", () => {
    const result = resolveStudyBibleReading([
      section("invalid-section", [
        "Leia primeiro: isto não é uma referência bíblica",
      ]),
    ]);

    expect(result).toEqual(
      expect.objectContaining({
        ok: false,
        code: "REFERENCE_PARSE_FAILED",
      }),
    );
  });

  it("does not infer a Bible reading when BIBLE_READING is absent", () => {
    const nonBibleSection = {
      ...section("read-section", ["João 3:16"]),
      type: "READ" as const,
    } as StudySection;

    expect(
      resolveStudyBibleReading([nonBibleSection]),
    ).toEqual({
      ok: false,
      code: "BIBLE_READING_NOT_FOUND",
    });
  });
  it("resolves individual Bible links inside prose without mutating editorial text", () => {
    const sourceText =
      "Romanos 5:12 Leia esse versículo. Depois compare com Romanos 5:18–19.";
    const keepSection = {
      ...section("keep-section", [sourceText]),
      type: "KEEP" as const,
    } as StudySection;
    const before = JSON.stringify(keepSection);

    const links = resolveStudyBibleLinks([keepSection]);

    expect(
      links.map((link) => link.canonicalText),
    ).toEqual([
      "Romanos 5:12",
      "Romanos 5:18-19",
    ]);

    expect(
      links.every(
        (link) => link.reference.passages.length === 1,
      ),
    ).toBe(true);

    for (const link of links) {
      expect(
        sourceText.slice(link.sourceStart, link.sourceEnd),
      ).toBe(link.sourceText);
    }

    expect(JSON.stringify(keepSection)).toBe(before);
  });

  it("resolves multiple displayed references as independent navigation targets", () => {
    const links = resolveStudyBibleLinks([
      section("multi-reference-section", [
        "João 3:16-17 | Romanos 5:6-8 | Romanos 8:31-39",
      ]),
    ]);

    expect(
      links.map((link) => link.canonicalText),
    ).toEqual([
      "João 3:16-17",
      "Romanos 5:6-8",
      "Romanos 8:31-39",
    ]);

    expect(
      links.every(
        (link) => link.reference.passages.length === 1,
      ),
    ).toBe(true);
  });

  it("expands same-chapter comma shorthand into individual passage targets", () => {
    const links = resolveStudyBibleLinks([
      section("comma-shorthand-section", [
        "Gênesis 1:1-5, 26-31",
      ]),
    ]);

    expect(
      links.map((link) => link.canonicalText),
    ).toEqual([
      "Gênesis 1:1-5",
      "Gênesis 1:26-31",
    ]);

    expect(
      links.every(
        (link) => link.reference.passages.length === 1,
      ),
    ).toBe(true);
  });

  it("fails closed for ordinary prose instead of inventing a bare-book Bible link", () => {
    const proseSection = {
      ...section("ordinary-prose-section", [
        "Marcos observou com atenção o que estava acontecendo.",
      ]),
      type: "UNDERSTAND" as const,
    } as StudySection;

    expect(
      resolveStudyBibleLinks([proseSection]),
    ).toEqual([]);
  });

  it("resolves Bible links across all released studies, including Track 1 without BIBLE_READING", () => {
    const before = JSON.stringify(studyRuntimeCatalog.packages);

    const runtimeLinks = studyRuntimeCatalog.studies.map(
      ({ content }) => ({
        studyId: content.id,
        links: resolveRuntimeStudyBibleLinks(content.id),
      }),
    );

    expect(runtimeLinks).toHaveLength(84);
    expect(
      runtimeLinks.every(({ links }) => links.length > 0),
    ).toBe(true);

    const track01Study01 =
      resolveRuntimeStudyBibleLinks("track-01-study-01");

    expect(
      track01Study01.map((link) => link.canonicalText),
    ).toContain("Gênesis 1:27");

    expect(
      runtimeLinks
        .flatMap(({ links }) => links)
        .every(
          (link) =>
            link.reference.passages.length === 1,
        ),
    ).toBe(true);

    expect(JSON.stringify(studyRuntimeCatalog.packages)).toBe(
      before,
    );
  });

});
