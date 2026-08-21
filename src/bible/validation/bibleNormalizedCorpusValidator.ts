import { BIBLE_BOOKS } from "../../domain/bible/bibleBooks";
import type {
  BibleCorpusValidationIssue,
  BibleCorpusValidationResult,
  BibleNormalizedCorpusV1,
} from "../import/bibleImportContract";

function referenceKey(
  bookId: string,
  chapter: number,
  verse: number,
): string {
  return `${bookId}:${chapter}:${verse}`;
}

export function validateNormalizedBibleCorpus(
  corpus: BibleNormalizedCorpusV1,
): BibleCorpusValidationResult {
  const issues: BibleCorpusValidationIssue[] = [];
  const canonicalById = new Map<
    string,
    (typeof BIBLE_BOOKS)[number]
  >(
    BIBLE_BOOKS.map(
      (book) => [book.id, book] as const,
    ),
  );

  const seenReferences = new Set<string>();
  const seenBooks = new Set<string>();
  const seenChapters = new Set<string>();
  const verseNumbersByChapter = new Map<string, number[]>();

  for (const verse of corpus.verses) {
    if (verse.versionId !== corpus.versionId) {
      issues.push({
        code: "VERSION_MISMATCH",
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
        message: "Verse version does not match corpus version.",
      });
    }

    const canonicalBook = canonicalById.get(verse.bookId);

    if (!canonicalBook) {
      issues.push({
        code: "UNKNOWN_BOOK",
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
        message: "Verse references an unknown canonical book.",
      });
      continue;
    }

    if (verse.bookOrder !== canonicalBook.order) {
      issues.push({
        code: "BOOK_ORDER_MISMATCH",
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
        message: `Expected book order ${canonicalBook.order}, received ${verse.bookOrder}.`,
      });
    }

    if (
      verse.chapter < 1 ||
      verse.chapter > canonicalBook.chapterCount
    ) {
      issues.push({
        code: "UNEXPECTED_CHAPTER",
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
        message: `Chapter is outside canonical range 1..${canonicalBook.chapterCount}.`,
      });
      continue;
    }

    const key = referenceKey(
      verse.bookId,
      verse.chapter,
      verse.verse,
    );

    if (seenReferences.has(key)) {
      issues.push({
        code: "DUPLICATE_REFERENCE",
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
        message: "Duplicate normalized verse reference.",
      });
    }

    seenReferences.add(key);
    seenBooks.add(verse.bookId);

    const chapterKey = `${verse.bookId}:${verse.chapter}`;
    seenChapters.add(chapterKey);

    const chapterVerses =
      verseNumbersByChapter.get(chapterKey) ?? [];

    chapterVerses.push(verse.verse);
    verseNumbersByChapter.set(
      chapterKey,
      chapterVerses,
    );

    if (verse.text.trim().length === 0) {
      issues.push({
        code: "EMPTY_TEXT",
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
        message: "Normalized verse text is empty.",
      });
    }
  }

  for (const canonicalBook of BIBLE_BOOKS) {
    if (!seenBooks.has(canonicalBook.id)) {
      issues.push({
        code: "MISSING_BOOK",
        bookId: canonicalBook.id,
        message: "Canonical book is missing from normalized corpus.",
      });
    }

    for (
      let chapter = 1;
      chapter <= canonicalBook.chapterCount;
      chapter += 1
    ) {
      const chapterKey = `${canonicalBook.id}:${chapter}`;
      const verseNumbers = verseNumbersByChapter.get(
        chapterKey,
      );

      if (!verseNumbers) {
        issues.push({
          code: "MISSING_CHAPTER",
          bookId: canonicalBook.id,
          chapter,
          message: "Canonical chapter is missing from normalized corpus.",
        });
        continue;
      }

      const ordered = [...verseNumbers].sort(
        (left, right) => left - right,
      );

      for (
        let index = 0;
        index < ordered.length;
        index += 1
      ) {
        const expectedVerse = index + 1;
        const actualVerse = ordered[index];

        if (actualVerse !== expectedVerse) {
          issues.push({
            code: "VERSE_SEQUENCE",
            bookId: canonicalBook.id,
            chapter,
            verse: actualVerse,
            message: `Expected contiguous verse ${expectedVerse}, received ${actualVerse}.`,
          });
          break;
        }
      }
    }
  }

  return {
    isValid: issues.length === 0,
    issueCount: issues.length,
    bookCount: seenBooks.size,
    chapterCount: seenChapters.size,
    verseCount: corpus.verses.length,
    issues,
  };
}
