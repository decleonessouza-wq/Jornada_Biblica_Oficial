import {
  getNextOfflineBibleReaderRouteParams,
  getPreviousOfflineBibleReaderRouteParams,
  parseOfflineBibleLastReading,
  parseOfflineBibleReaderRouteParams,
} from "../src/bible/reader/bibleReaderContracts";

describe("Bible Reader contracts", () => {
  it("accepts a valid Reader route including a target verse", () => {
    expect(
      parseOfflineBibleReaderRouteParams({
        versionId: "BLIVRE",
        bookId: "GEN",
        chapter: 1,
        verse: 3,
      }),
    ).toEqual({
      versionId: "BLIVRE",
      bookId: "GEN",
      chapter: 1,
      verse: 3,
    });
  });

  it("rejects a chapter outside the canonical book range", () => {
    expect(
      parseOfflineBibleReaderRouteParams({
        versionId: "BLIVRE",
        bookId: "GEN",
        chapter: 51,
      }),
    ).toBeNull();
  });

  it("rejects an unsupported Bible version", () => {
    expect(
      parseOfflineBibleReaderRouteParams({
        versionId: "UNSUPPORTED",
        bookId: "GEN",
        chapter: 1,
      }),
    ).toBeNull();
  });

  it("moves to the next chapter without carrying a target verse", () => {
    expect(
      getNextOfflineBibleReaderRouteParams({
        versionId: "BLIVRE",
        bookId: "GEN",
        chapter: 1,
        verse: 10,
      }),
    ).toEqual({
      versionId: "BLIVRE",
      bookId: "GEN",
      chapter: 2,
    });
  });

  it("moves from the last chapter of Genesis to Exodus 1", () => {
    expect(
      getNextOfflineBibleReaderRouteParams({
        versionId: "ALM1911",
        bookId: "GEN",
        chapter: 50,
        verse: 26,
      }),
    ).toEqual({
      versionId: "ALM1911",
      bookId: "EXO",
      chapter: 1,
    });
  });

  it("moves from Exodus 1 to the final chapter of Genesis", () => {
    expect(
      getPreviousOfflineBibleReaderRouteParams({
        versionId: "BLIVRE",
        bookId: "EXO",
        chapter: 1,
        verse: 1,
      }),
    ).toEqual({
      versionId: "BLIVRE",
      bookId: "GEN",
      chapter: 50,
    });
  });

  it("preserves a valid saved last reading with verse", () => {
    expect(
      parseOfflineBibleLastReading({
        versionId: "BLIVRE",
        bookId: "JHN",
        chapter: 3,
        verse: 16,
      }),
    ).toEqual({
      versionId: "BLIVRE",
      bookId: "JHN",
      chapter: 3,
      verse: 16,
    });
  });
});
