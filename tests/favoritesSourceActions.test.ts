export {};

const fs = jest.requireActual<{
  readFileSync: (
    path: string,
    encoding: "utf8",
  ) => string;
}>("fs");

function readSource(relativePath: string): string {
  return fs.readFileSync(
    relativePath,
    "utf8",
  );
}

const bibleReaderSource = readSource(
  "src/bible/screens/BibleReaderScreen.tsx",
);
const bibleVerseListSource = readSource(
  "src/bible/components/BibleVerseList.tsx",
);
const hymnalReaderSource = readSource(
  "src/hymnal/screens/HymnalReaderScreen.tsx",
);

describe("Favorites source actions", () => {
  it("Bible loads favorites through PersonalPlatformHub service", () => {
    expect(bibleReaderSource).toContain(
      "getPersonalPlatformHub().favoritesService.list()",
    );
  });

  it("Bible hydrates only the active version, book, and chapter", () => {
    expect(bibleReaderSource).toContain(
      "favorite.target.versionId === parsedParams.versionId",
    );
    expect(bibleReaderSource).toContain(
      "favorite.target.bookId === parsedParams.bookId",
    );
    expect(bibleReaderSource).toContain(
      "favorite.target.chapter === parsedParams.chapter",
    );
    expect(bibleReaderSource).toContain(
      "loadedFavoriteVerses.add(favorite.target.verse)",
    );
  });

  it("Bible toggle treats the service boolean as authoritative state", () => {
    expect(bibleReaderSource).toContain(
      "await getPersonalPlatformHub().favoritesService.toggle({",
    );
    expect(bibleReaderSource).toContain(
      "if (isFavorite) {",
    );
    expect(bibleReaderSource).toContain(
      "next.add(verse);",
    );
    expect(bibleReaderSource).toContain(
      "next.delete(verse);",
    );
  });

  it("Bible guards repeated toggle for the same busy verse", () => {
    expect(bibleReaderSource).toContain(
      "favoriteBusyVersesRef.current.has(verse)",
    );
    expect(bibleReaderSource).toContain(
      "favoriteBusyVersesRef.current.add(verse)",
    );
    expect(bibleReaderSource).toContain(
      "favoriteBusyVersesRef.current.delete(verse)",
    );
  });

  it("BibleVerseList receives favorite state and emits only the verse callback", () => {
    expect(bibleVerseListSource).toContain(
      "favoriteVerses?: ReadonlySet<number>;",
    );
    expect(bibleVerseListSource).toContain(
      "onToggleFavoriteVerse?: (verse: number) => void;",
    );
    expect(bibleVerseListSource).toContain(
      "favoriteVerses?.has(item.verse) ?? false",
    );
    expect(bibleVerseListSource).toContain(
      "onPress={() => onToggleFavoriteVerse(item.verse)}",
    );
  });

  it("Hymnal loads favorite state through PersonalPlatformHub service", () => {
    expect(hymnalReaderSource).toContain(
      "await getPersonalPlatformHub().favoritesService.isFavorite({",
    );
    expect(hymnalReaderSource).toContain(
      'kind: "hymn"',
    );
  });

  it("Hymnal toggle treats the returned boolean as authoritative state", () => {
    expect(hymnalReaderSource).toContain(
      "await getPersonalPlatformHub().favoritesService.toggle({",
    );
    expect(hymnalReaderSource).toContain(
      "setIsFavorite(nextIsFavorite);",
    );
  });

  it("Hymnal guards repeated toggle while a favorite request is busy", () => {
    expect(hymnalReaderSource).toContain(
      "if (favoriteBusyRef.current) {",
    );
    expect(hymnalReaderSource).toContain(
      "favoriteBusyRef.current = true;",
    );
    expect(hymnalReaderSource).toContain(
      "favoriteBusyRef.current = false;",
    );
  });

  it("favorite reader actions do not directly access favorite persistence or codec", () => {
    for (const source of [
      bibleReaderSource,
      hymnalReaderSource,
    ]) {
      expect(source).not.toContain(
        "SQLiteFavoritesRepository",
      );
      expect(source).not.toContain(
        "data/personal/favorites",
      );
      expect(source).not.toContain(
        "favoriteTargetKeyCodec",
      );
      expect(source).not.toContain(
        "AsyncStorage",
      );
    }
  });
});
