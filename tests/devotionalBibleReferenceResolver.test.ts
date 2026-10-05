import type { DevotionalBibleReference } from "../src/domain/devotionals/devotional";
import { resolveDevotionalBibleReference } from "../src/devotionals/runtime/devotionalBibleReferenceResolver";

const reference = (
  overrides: Partial<DevotionalBibleReference> = {},
): DevotionalBibleReference => ({
  bookId: "JHN",
  startChapter: 3,
  startVerse: 16,
  endChapter: null,
  endVerse: null,
  ...overrides,
});

describe("devotionalBibleReferenceResolver", () => {
  it("adapts a structured chapter without parsing editorial text", () => {
    const result = resolveDevotionalBibleReference(
      reference({
        startChapter: 4,
        startVerse: null,
      }),
    );

    expect(result).toEqual(
      expect.objectContaining({
        ok: true,
        canonicalText: "João 4",
      }),
    );

    if (!result.ok) {
      throw new Error("Expected chapter reference to resolve.");
    }

    expect(result.reference.passages).toEqual([
      {
        kind: "CHAPTER",
        bookId: "JHN",
        chapter: 4,
      },
    ]);
  });

  it("adapts chapter ranges, single verses and verse ranges", () => {
    const chapterRange = resolveDevotionalBibleReference(
      reference({
        bookId: "ROM",
        startChapter: 5,
        startVerse: null,
        endChapter: 6,
        endVerse: null,
      }),
    );
    const singleVerse = resolveDevotionalBibleReference(
      reference({
        bookId: "EPH",
        startChapter: 2,
        startVerse: 8,
      }),
    );
    const sameChapterRange =
      resolveDevotionalBibleReference(
        reference({
          bookId: "ROM",
          startChapter: 8,
          startVerse: 31,
          endChapter: 8,
          endVerse: 39,
        }),
      );
    const crossChapterRange =
      resolveDevotionalBibleReference(
        reference({
          bookId: "JHN",
          startChapter: 3,
          startVerse: 36,
          endChapter: 4,
          endVerse: 2,
        }),
      );

    expect(chapterRange).toEqual(
      expect.objectContaining({
        ok: true,
        canonicalText: "Romanos 5-6",
      }),
    );
    expect(singleVerse).toEqual(
      expect.objectContaining({
        ok: true,
        canonicalText: "Efésios 2:8",
      }),
    );
    expect(sameChapterRange).toEqual(
      expect.objectContaining({
        ok: true,
        canonicalText: "Romanos 8:31-39",
      }),
    );
    expect(crossChapterRange).toEqual(
      expect.objectContaining({
        ok: true,
        canonicalText: "João 3:36-4:2",
      }),
    );
  });

  it("fails closed for an unknown canonical book id", () => {
    expect(
      resolveDevotionalBibleReference(
        reference({ bookId: "UNKNOWN" }),
      ),
    ).toEqual({
      ok: false,
      code: "BOOK_NOT_FOUND",
    });
  });

  it("fails closed when a chapter is outside the canonical book catalog", () => {
    expect(
      resolveDevotionalBibleReference(
        reference({
          bookId: "JUD",
          startChapter: 2,
          startVerse: null,
        }),
      ),
    ).toEqual({
      ok: false,
      code: "CHAPTER_OUT_OF_RANGE",
    });
  });

  it("fails closed for descending verse ranges", () => {
    expect(
      resolveDevotionalBibleReference(
        reference({
          startVerse: 20,
          endChapter: 3,
          endVerse: 10,
        }),
      ),
    ).toEqual({
      ok: false,
      code: "REFERENCE_RANGE_INVALID",
    });
  });

  it("fails closed for incomplete structured shapes instead of inferring intent", () => {
    expect(
      resolveDevotionalBibleReference(
        reference({
          startVerse: null,
          endChapter: 4,
          endVerse: 2,
        }),
      ),
    ).toEqual({
      ok: false,
      code: "REFERENCE_SHAPE_UNSUPPORTED",
    });

    expect(
      resolveDevotionalBibleReference(
        reference({
          startVerse: 16,
          endChapter: 4,
          endVerse: null,
        }),
      ),
    ).toEqual({
      ok: false,
      code: "REFERENCE_SHAPE_UNSUPPORTED",
    });
  });
});
