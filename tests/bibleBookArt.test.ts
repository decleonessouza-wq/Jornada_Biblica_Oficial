import {
  BIBLE_BOOK_COUNT,
  BIBLE_BOOKS,
} from "../src/domain/bible/bibleBooks";

import {
  BIBLE_BOOK_ART,
} from "../src/bible/assets/bibleBookArt";

describe("BIBLE_BOOK_ART", () => {
  const canonicalBookIds =
    BIBLE_BOOKS.map((book) => book.id);

  it("maps exactly all 66 canonical books", () => {
    expect(canonicalBookIds).toHaveLength(
      BIBLE_BOOK_COUNT,
    );

    expect(
      Object.keys(BIBLE_BOOK_ART),
    ).toEqual(canonicalBookIds);
  });

  it("provides one bundled asset for every canonical book", () => {
    for (const bookId of canonicalBookIds) {
      expect(
        BIBLE_BOOK_ART[bookId],
      ).toBeDefined();
    }
  });
});