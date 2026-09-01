import {
  HYMNAL_SEARCH_DEFAULT_LIMIT,
  HYMNAL_SEARCH_MAX_LIMIT,
  type HymnalSearchTextRequest,
} from "../src/hymnal/repositories/hymnalSearchRepository";
import {
  HYMNAL_SEARCH_NORMALIZER_VERSION,
  countHymnalSearchTerms,
  normalizeHymnalSearchText,
  tokenizeHymnalSearchText,
} from "../src/hymnal/search/hymnalSearchNormalization";

describe("hymnal search foundation", () => {
  it("freezes the public search constants and request shape", () => {
    const request: HymnalSearchTextRequest = {
      editionId: "harpa-crista-jornada-v1",
      query: "graca",
      mode: "WORD",
      offset: 0,
      limit: HYMNAL_SEARCH_DEFAULT_LIMIT,
    };

    expect(HYMNAL_SEARCH_DEFAULT_LIMIT).toBe(25);
    expect(HYMNAL_SEARCH_MAX_LIMIT).toBe(100);
    expect(request).toEqual({
      editionId: "harpa-crista-jornada-v1",
      query: "graca",
      mode: "WORD",
      offset: 0,
      limit: 25,
    });
  });

  it("freezes normalizer version 1", () => {
    expect(HYMNAL_SEARCH_NORMALIZER_VERSION).toBe(1);
  });

  it("removes diacritics, lowercases and normalizes punctuation", () => {
    expect(
      normalizeHymnalSearchText(
        "  Grandioso \u00c9s Tu! -- N\u00ba 1  ",
      ),
    ).toBe("grandioso es tu n 1");
  });

  it("normalizes decomposed combining marks", () => {
    expect(
      normalizeHymnalSearchText("O\u0301 Deus, meu Rei"),
    ).toBe("o deus meu rei");
  });

  it("converts separators to spaces and collapses whitespace", () => {
    expect(
      normalizeHymnalSearchText(
        "amor-do-pai\tgraca...paz\nfe",
      ),
    ).toBe("amor do pai graca paz fe");
  });

  it("returns an empty normalized representation for punctuation only", () => {
    expect(normalizeHymnalSearchText(" -- !!! ... ")).toBe("");
    expect(tokenizeHymnalSearchText(" -- !!! ... ")).toEqual([]);
  });

  it("tokenizes the canonical normalized representation", () => {
    expect(
      tokenizeHymnalSearchText(
        "F\u00e9, f\u00e9 e esperan\u00e7a!",
      ),
    ).toEqual(["fe", "fe", "e", "esperanca"]);
  });

  it("counts repeated normalized terms deterministically", () => {
    expect(
      [...countHymnalSearchTerms(
        "F\u00e9, f\u00e9 e esperan\u00e7a!",
      ).entries()],
    ).toEqual([
      ["fe", 2],
      ["e", 1],
      ["esperanca", 1],
    ]);
  });

  it("is idempotent over its own normalized output", () => {
    const normalized = normalizeHymnalSearchText(
      "  Alvo mais que a neve!  ",
    );

    expect(normalized).toBe("alvo mais que a neve");
    expect(normalizeHymnalSearchText(normalized)).toBe(normalized);
  });
});
