import type {
  BiblePassage,
  BibleReference,
} from "../../domain/bible/bibleReference";
import { BIBLE_BOOKS } from "../../domain/bible/bibleBooks";
import { formatBibleReference } from "../../domain/bible/bibleReferenceFormatter";
import type { DevotionalBibleReference } from "../../domain/devotionals/devotional";

export type DevotionalBibleReferenceResolutionErrorCode =
  | "BOOK_NOT_FOUND"
  | "CHAPTER_OUT_OF_RANGE"
  | "REFERENCE_RANGE_INVALID"
  | "REFERENCE_SHAPE_UNSUPPORTED";

export type ResolvedDevotionalBibleReference = Readonly<{
  ok: true;
  source: DevotionalBibleReference;
  canonicalText: string;
  reference: BibleReference;
}>;

export type DevotionalBibleReferenceResolutionFailure = Readonly<{
  ok: false;
  code: DevotionalBibleReferenceResolutionErrorCode;
}>;

export type DevotionalBibleReferenceResolution =
  | ResolvedDevotionalBibleReference
  | DevotionalBibleReferenceResolutionFailure;

const failure = (
  code: DevotionalBibleReferenceResolutionErrorCode,
): DevotionalBibleReferenceResolutionFailure =>
  Object.freeze({ ok: false, code });

const isPositiveSafeInteger = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isSafeInteger(value) &&
  value >= 1;

export const resolveDevotionalBibleReference = (
  source: DevotionalBibleReference,
): DevotionalBibleReferenceResolution => {
  const book = BIBLE_BOOKS.find(
    (candidate) => candidate.id === source.bookId,
  );

  if (!book) {
    return failure("BOOK_NOT_FOUND");
  }

  if (
    !isPositiveSafeInteger(source.startChapter) ||
    source.startChapter > book.chapterCount
  ) {
    return failure("CHAPTER_OUT_OF_RANGE");
  }

  if (
    source.startVerse !== null &&
    !isPositiveSafeInteger(source.startVerse)
  ) {
    return failure("REFERENCE_RANGE_INVALID");
  }

  if (
    source.endChapter !== null &&
    (!isPositiveSafeInteger(source.endChapter) ||
      source.endChapter > book.chapterCount)
  ) {
    return failure("CHAPTER_OUT_OF_RANGE");
  }

  if (
    source.endVerse !== null &&
    !isPositiveSafeInteger(source.endVerse)
  ) {
    return failure("REFERENCE_RANGE_INVALID");
  }

  if (
    source.endChapter !== null &&
    source.endChapter < source.startChapter
  ) {
    return failure("REFERENCE_RANGE_INVALID");
  }

  let passage: BiblePassage;

  if (
    source.startVerse === null &&
    source.endChapter === null &&
    source.endVerse === null
  ) {
    passage = {
      kind: "CHAPTER",
      bookId: book.id,
      chapter: source.startChapter,
    };
  } else if (
    source.startVerse === null &&
    source.endChapter !== null &&
    source.endVerse === null
  ) {
    passage = {
      kind: "CHAPTER_RANGE",
      bookId: book.id,
      startChapter: source.startChapter,
      endChapter: source.endChapter,
    };
  } else if (
    source.startVerse !== null &&
    source.endChapter === null &&
    source.endVerse === null
  ) {
    passage = {
      kind: "VERSE",
      bookId: book.id,
      chapter: source.startChapter,
      verse: source.startVerse,
    };
  } else if (
    source.startVerse !== null &&
    source.endChapter !== null &&
    source.endVerse !== null
  ) {
    if (
      source.endChapter === source.startChapter &&
      source.endVerse < source.startVerse
    ) {
      return failure("REFERENCE_RANGE_INVALID");
    }

    passage = {
      kind: "VERSE_RANGE",
      bookId: book.id,
      start: {
        chapter: source.startChapter,
        verse: source.startVerse,
      },
      end: {
        chapter: source.endChapter,
        verse: source.endVerse,
      },
    };
  } else {
    return failure("REFERENCE_SHAPE_UNSUPPORTED");
  }

  const reference: BibleReference = {
    passages: [passage],
  };

  return Object.freeze({
    ok: true,
    source,
    canonicalText: formatBibleReference(reference),
    reference,
  });
};
