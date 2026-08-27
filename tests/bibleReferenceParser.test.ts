import {
  parseBibleReference,
  type BibleReferenceParseErrorCode,
} from "../src/domain/bible/bibleReferenceParser";

function expectParseError(
  input: string,
  expectedCode: BibleReferenceParseErrorCode,
): void {
  const result = parseBibleReference(input);

  expect(result.ok).toBe(false);

  if (result.ok) {
    throw new Error("EXPECTED_REFERENCE_PARSE_FAILURE");
  }

  expect(result.error.code).toBe(expectedCode);
}

describe("bibleReferenceParser critical contracts", () => {
  it("parses an aliased single verse", () => {
    const result = parseBibleReference("Gn 1:1");

    expect(result).toEqual({
      ok: true,
      value: {
        passages: [
          {
            kind: "VERSE",
            bookId: "GEN",
            chapter: 1,
            verse: 1,
          },
        ],
      },
    });
  });

  it("parses a canonical chapter range with diacritics", () => {
    const result = parseBibleReference("G\u00eanesis 1-3");

    expect(result).toEqual({
      ok: true,
      value: {
        passages: [
          {
            kind: "CHAPTER_RANGE",
            bookId: "GEN",
            startChapter: 1,
            endChapter: 3,
          },
        ],
      },
    });
  });

  it("preserves ordered passages separated by semicolon", () => {
    const result = parseBibleReference("Gn 1; Ex 2");

    expect(result).toEqual({
      ok: true,
      value: {
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
      },
    });
  });

  it("rejects a chapter outside the canonical book range", () => {
    expectParseError(
      "G\u00eanesis 51",
      "CHAPTER_OUT_OF_RANGE",
    );
  });

  it("rejects a reversed cross-chapter verse range", () => {
    expectParseError(
      "Gn 3:10-2:1",
      "VERSE_RANGE_INVALID",
    );
  });

  it("rejects ambiguous comma shorthand", () => {
    expectParseError(
      "Gn 1, 2",
      "AMBIGUOUS_COMMA_SHORTHAND",
    );
  });
});
