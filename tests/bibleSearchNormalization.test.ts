import {
  countBibleSearchTerms,
  normalizeBibleSearchText,
  tokenizeBibleSearchText,
} from "../src/bible/search/bibleSearchNormalization";

describe("bibleSearchNormalization critical contracts", () => {
  it("removes diacritics, lowercases and normalizes punctuation", () => {
    expect(
      normalizeBibleSearchText(
        "  F\u00e9, ESPERAN\u00c7A! a\u00e7\u00e3o  ",
      ),
    ).toBe("fe esperanca acao");
  });

  it("collapses punctuation and whitespace deterministically", () => {
    expect(
      normalizeBibleSearchText(
        "amor---deus     eterno",
      ),
    ).toBe("amor deus eterno");
  });

  it("tokenizes only normalized non-empty terms", () => {
    expect(
      tokenizeBibleSearchText(
        "  Gra\u00e7a, paz!  ",
      ),
    ).toEqual(["graca", "paz"]);

    expect(
      tokenizeBibleSearchText("!!!"),
    ).toEqual([]);
  });

  it("counts repeated normalized terms", () => {
    const counts =
      countBibleSearchTerms(
        "F\u00e9, fe; amor",
      );

    expect(
      Array.from(counts.entries()),
    ).toEqual([
      ["fe", 2],
      ["amor", 1],
    ]);
  });
});
