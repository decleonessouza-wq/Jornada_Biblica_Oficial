import type { BibleReference } from "../src/domain/bible/bibleReference";
import {
  getJourneyBibleReaderRouteForReference,
  getJourneyBibleReaderRouteForText,
} from "../src/services/journeyBibleReaderAdapter";

describe("journeyBibleReaderAdapter", () => {
  it("routes a simple text chapter through the canonical parser", () => {
    expect(
      getJourneyBibleReaderRouteForText({
        referenceText: "Gn 1",
        versionId: "BLIVRE",
        passageIndex: 0,
      }),
    ).toEqual({
      ok: true,
      routeParams: {
        versionId: "BLIVRE",
        bookId: "GEN",
        chapter: 1,
      },
      passageIndex: 0,
      passageCount: 1,
    });
  });

  it("routes the explicitly selected passage of a compound text reference", () => {
    expect(
      getJourneyBibleReaderRouteForText({
        referenceText: "Gn 1; Ex 2",
        versionId: "ALM1911",
        passageIndex: 1,
      }),
    ).toEqual({
      ok: true,
      routeParams: {
        versionId: "ALM1911",
        bookId: "EXO",
        chapter: 2,
      },
      passageIndex: 1,
      passageCount: 2,
    });
  });

  it("does not reparse an already structured BibleReference", () => {
    const reference: BibleReference = {
      passages: [
        {
          kind: "CHAPTER",
          bookId: "GEN",
          chapter: 1,
        },
        {
          kind: "CHAPTER",
          bookId: "EXO",
          chapter: 2,
        },
      ],
    };

    expect(
      getJourneyBibleReaderRouteForReference({
        reference,
        versionId: "BLIVRE",
        passageIndex: 1,
      }),
    ).toEqual({
      ok: true,
      routeParams: {
        versionId: "BLIVRE",
        bookId: "EXO",
        chapter: 2,
      },
      passageIndex: 1,
      passageCount: 2,
    });
  });

  it("fails closed instead of silently choosing the first compound passage", () => {
    const result =
      getJourneyBibleReaderRouteForText({
        referenceText: "Gn 1; Ex 2",
        versionId: "BLIVRE",
        passageIndex: 2,
      });

    expect(result).toEqual({
      ok: false,
      error: {
        code: "INVALID_PASSAGE_INDEX",
        passageIndex: 2,
        passageCount: 2,
      },
    });
  });

  it("rejects a negative passage index", () => {
    const result =
      getJourneyBibleReaderRouteForText({
        referenceText: "Gn 1",
        versionId: "BLIVRE",
        passageIndex: -1,
      });

    expect(result).toEqual({
      ok: false,
      error: {
        code: "INVALID_PASSAGE_INDEX",
        passageIndex: -1,
        passageCount: 1,
      },
    });
  });

  it("preserves canonical parser failures without provider fallback", () => {
    const result =
      getJourneyBibleReaderRouteForText({
        referenceText: "Gn 1, 2",
        versionId: "BLIVRE",
        passageIndex: 0,
      });

    expect(result.ok).toBe(false);

    if (result.ok) {
      throw new Error("EXPECTED_REFERENCE_PARSE_FAILURE");
    }

    expect(result.error.code).toBe("REFERENCE_PARSE_FAILED");

    if (result.error.code !== "REFERENCE_PARSE_FAILED") {
      throw new Error("EXPECTED_REFERENCE_PARSE_FAILED_CODE");
    }

    expect(result.error.parserError.code).toBe(
      "AMBIGUOUS_COMMA_SHORTHAND",
    );
  });

  it("rejects legacy provider versions at runtime", () => {
    const result =
      getJourneyBibleReaderRouteForText({
        referenceText: "Gn 1",
        versionId: "ARC" as never,
        passageIndex: 0,
      });

    expect(result).toEqual({
      ok: false,
      error: {
        code: "INVALID_VERSION",
      },
    });
  });

  it("routes a verse range to its explicit starting verse", () => {
    expect(
      getJourneyBibleReaderRouteForText({
        referenceText: "João 3:16-18",
        versionId: "BLIVRE",
        passageIndex: 0,
      }),
    ).toEqual({
      ok: true,
      routeParams: {
        versionId: "BLIVRE",
        bookId: "JHN",
        chapter: 3,
        verse: 16,
      },
      passageIndex: 0,
      passageCount: 1,
    });
  });

  it("routes a chapter range to its explicit starting chapter", () => {
    expect(
      getJourneyBibleReaderRouteForText({
        referenceText: "Gênesis 1-3",
        versionId: "BLIVRE",
        passageIndex: 0,
      }),
    ).toEqual({
      ok: true,
      routeParams: {
        versionId: "BLIVRE",
        bookId: "GEN",
        chapter: 1,
      },
      passageIndex: 0,
      passageCount: 1,
    });
  });
});
