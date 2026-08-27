import type {
  BibleSearchPage,
  BibleSearchRepository,
  BibleSearchTextRequest,
} from "../src/bible/repositories/bibleSearchRepository";
import {
  BibleSearchRouter,
} from "../src/bible/search/bibleSearchRouter";

describe("BibleSearchRouter critical contracts", () => {
  const searchText = jest.fn(
    async (
      request: BibleSearchTextRequest,
    ): Promise<BibleSearchPage> => ({
      items: [],
      offset: request.offset,
      limit: request.limit,
      hasMore: false,
    }),
  );

  const repository: BibleSearchRepository = {
    searchText,
  };

  const router =
    new BibleSearchRouter(repository);

  beforeEach(() => {
    searchText.mockClear();
  });

  it("routes canonical references before textual search", async () => {
    const result = await router.route({
      versionId: "BLIVRE",
      query: "Gn 1:1",
      offset: 0,
      limit: 25,
    });

    expect(result).toEqual({
      kind: "REFERENCE",
      versionId: "BLIVRE",
      reference: {
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

    expect(searchText).not.toHaveBeenCalled();
  });

  it("routes one normalized token as WORD", async () => {
    const result = await router.route({
      versionId: "BLIVRE",
      query: "F\u00e9",
      offset: 5,
      limit: 20,
    });

    expect(result.kind).toBe("TEXT");

    if (result.kind !== "TEXT") {
      throw new Error("EXPECTED_TEXT_ROUTE");
    }

    expect(result.mode).toBe("WORD");

    expect(searchText).toHaveBeenCalledWith({
      versionId: "BLIVRE",
      query: "F\u00e9",
      mode: "WORD",
      offset: 5,
      limit: 20,
    });
  });

  it("routes multiple normalized tokens as PHRASE", async () => {
    const result = await router.route({
      versionId: "ALM1911",
      query: "amor de Deus",
      offset: 0,
      limit: 25,
    });

    expect(result.kind).toBe("TEXT");

    if (result.kind !== "TEXT") {
      throw new Error("EXPECTED_PHRASE_TEXT_ROUTE");
    }

    expect(result.mode).toBe("PHRASE");

    expect(searchText).toHaveBeenCalledWith({
      versionId: "ALM1911",
      query: "amor de Deus",
      mode: "PHRASE",
      offset: 0,
      limit: 25,
    });
  });

  it("falls back non-numeric comma text to PHRASE search", async () => {
    const result = await router.route({
      versionId: "BLIVRE",
      query: "amor, gra\u00e7a",
      offset: 0,
      limit: 25,
    });

    expect(result.kind).toBe("TEXT");

    if (result.kind !== "TEXT") {
      throw new Error("EXPECTED_COMMA_TEXT_FALLBACK");
    }

    expect(result.mode).toBe("PHRASE");

    expect(searchText).toHaveBeenCalledTimes(1);
  });

  it("returns structured invalid-reference errors without text search", async () => {
    const result = await router.route({
      versionId: "BLIVRE",
      query: "Gn 51",
      offset: 0,
      limit: 25,
    });

    expect(result.kind).toBe("INVALID_REFERENCE");

    if (result.kind !== "INVALID_REFERENCE") {
      throw new Error("EXPECTED_INVALID_REFERENCE_ROUTE");
    }

    expect(result.error.code).toBe(
      "CHAPTER_OUT_OF_RANGE",
    );

    expect(searchText).not.toHaveBeenCalled();
  });

  it("rejects an empty router query", async () => {
    await expect(
      router.route({
        versionId: "BLIVRE",
        query: "   ",
        offset: 0,
        limit: 25,
      }),
    ).rejects.toThrow(
      "BIBLE_SEARCH_ROUTER_EMPTY_QUERY",
    );

    expect(searchText).not.toHaveBeenCalled();
  });
});
