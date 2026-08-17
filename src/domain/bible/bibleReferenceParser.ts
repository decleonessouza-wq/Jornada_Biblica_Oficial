/**
 * Parser semântico de referências bíblicas do Bíblia Jornada.
 *
 * Responsabilidades:
 * - converter strings bíblicas válidas em BibleReference;
 * - resolver livros pelo catálogo canônico;
 * - validar limites de capítulos;
 * - suportar referências compostas ordenadas;
 * - rejeitar abreviações ambíguas por vírgula sem inferir contexto.
 *
 * Fora de escopo:
 * - formatação de BibleReference para texto;
 * - códigos e URLs específicos de provedores;
 * - persistência;
 * - integração com telas;
 * - validação do máximo de versículos por capítulo.
 */

import type {
  BiblePassage,
  BibleReference,
  BibleVerseAddress,
} from "./bibleReference";
import { resolveBibleBookAlias, type BibleBook } from "./bibleBooks";

export type BibleReferenceParseErrorCode =
  | "EMPTY_REFERENCE"
  | "EMPTY_PASSAGE"
  | "INVALID_SYNTAX"
  | "UNKNOWN_BOOK"
  | "CHAPTER_OUT_OF_RANGE"
  | "CHAPTER_RANGE_INVALID"
  | "VERSE_INVALID"
  | "VERSE_RANGE_INVALID"
  | "AMBIGUOUS_COMMA_SHORTHAND";

export type BibleReferenceParseError = Readonly<{
  code: BibleReferenceParseErrorCode;
  input: string;
  segment?: string;
  segmentIndex?: number;
}>;

export type BibleReferenceParseResult =
  | Readonly<{ ok: true; value: BibleReference }>
  | Readonly<{ ok: false; error: BibleReferenceParseError }>;

type SinglePassageParseResult =
  | Readonly<{ ok: true; passage: BiblePassage }>
  | Readonly<{ ok: false; error: BibleReferenceParseError }>;

const CROSS_CHAPTER_VERSE_RANGE_PATTERN =
  /^(.+?)\s+(\d+):(\d+)-(\d+):(\d+)$/;
const SAME_CHAPTER_VERSE_RANGE_PATTERN = /^(.+?)\s+(\d+):(\d+)-(\d+)$/;
const VERSE_PATTERN = /^(.+?)\s+(\d+):(\d+)$/;
const CHAPTER_RANGE_PATTERN = /^(.+?)\s+(\d+)-(\d+)$/;
const CHAPTER_PATTERN = /^(.+?)\s+(\d+)$/;

function createParseError(
  code: BibleReferenceParseErrorCode,
  input: string,
  segment?: string,
  segmentIndex?: number
): BibleReferenceParseError {
  if (segment === undefined) {
    return { code, input };
  }

  if (segmentIndex === undefined) {
    return { code, input, segment };
  }

  return { code, input, segment, segmentIndex };
}

function failure(
  code: BibleReferenceParseErrorCode,
  input: string,
  segment?: string,
  segmentIndex?: number
): SinglePassageParseResult {
  return {
    ok: false,
    error: createParseError(code, input, segment, segmentIndex),
  };
}

function referenceFailure(
  code: BibleReferenceParseErrorCode,
  input: string,
  segment?: string,
  segmentIndex?: number
): BibleReferenceParseResult {
  return {
    ok: false,
    error: createParseError(code, input, segment, segmentIndex),
  };
}

function isPositiveSafeInteger(value: number): boolean {
  return Number.isSafeInteger(value) && value >= 1;
}

function isChapterWithinBook(book: BibleBook, chapter: number): boolean {
  return isPositiveSafeInteger(chapter) && chapter <= book.chapterCount;
}

function resolveBook(
  bookLabel: string,
  input: string,
  segment: string,
  segmentIndex: number
): BibleBook | BibleReferenceParseError {
  const book = resolveBibleBookAlias(bookLabel);

  if (!book) {
    return createParseError("UNKNOWN_BOOK", input, segment, segmentIndex);
  }

  return book;
}

function isParseError(
  value: BibleBook | BibleReferenceParseError
): value is BibleReferenceParseError {
  return "code" in value;
}

function buildVerseAddress(
  chapter: number,
  verse: number
): BibleVerseAddress {
  return { chapter, verse };
}

function isVerseAddressAfter(
  start: BibleVerseAddress,
  end: BibleVerseAddress
): boolean {
  if (start.chapter !== end.chapter) {
    return start.chapter > end.chapter;
  }

  return start.verse > end.verse;
}

function parseSinglePassage(
  segment: string,
  input: string,
  segmentIndex: number
): SinglePassageParseResult {
  const crossChapterRange =
    CROSS_CHAPTER_VERSE_RANGE_PATTERN.exec(segment);

  if (crossChapterRange) {
    const bookLabel = crossChapterRange[1] ?? "";
    const startChapter = Number(crossChapterRange[2]);
    const startVerse = Number(crossChapterRange[3]);
    const endChapter = Number(crossChapterRange[4]);
    const endVerse = Number(crossChapterRange[5]);
    const book = resolveBook(bookLabel, input, segment, segmentIndex);

    if (isParseError(book)) {
      return { ok: false, error: book };
    }

    if (
      !isChapterWithinBook(book, startChapter) ||
      !isChapterWithinBook(book, endChapter)
    ) {
      return failure(
        "CHAPTER_OUT_OF_RANGE",
        input,
        segment,
        segmentIndex
      );
    }

    if (
      !isPositiveSafeInteger(startVerse) ||
      !isPositiveSafeInteger(endVerse)
    ) {
      return failure(
        "VERSE_RANGE_INVALID",
        input,
        segment,
        segmentIndex
      );
    }

    const start = buildVerseAddress(startChapter, startVerse);
    const end = buildVerseAddress(endChapter, endVerse);

    if (isVerseAddressAfter(start, end)) {
      return failure(
        "VERSE_RANGE_INVALID",
        input,
        segment,
        segmentIndex
      );
    }

    return {
      ok: true,
      passage: {
        kind: "VERSE_RANGE",
        bookId: book.id,
        start,
        end,
      },
    };
  }

  const sameChapterRange =
    SAME_CHAPTER_VERSE_RANGE_PATTERN.exec(segment);

  if (sameChapterRange) {
    const bookLabel = sameChapterRange[1] ?? "";
    const chapter = Number(sameChapterRange[2]);
    const startVerse = Number(sameChapterRange[3]);
    const endVerse = Number(sameChapterRange[4]);
    const book = resolveBook(bookLabel, input, segment, segmentIndex);

    if (isParseError(book)) {
      return { ok: false, error: book };
    }

    if (!isChapterWithinBook(book, chapter)) {
      return failure(
        "CHAPTER_OUT_OF_RANGE",
        input,
        segment,
        segmentIndex
      );
    }

    if (
      !isPositiveSafeInteger(startVerse) ||
      !isPositiveSafeInteger(endVerse)
    ) {
      return failure(
        "VERSE_RANGE_INVALID",
        input,
        segment,
        segmentIndex
      );
    }

    const start = buildVerseAddress(chapter, startVerse);
    const end = buildVerseAddress(chapter, endVerse);

    if (isVerseAddressAfter(start, end)) {
      return failure(
        "VERSE_RANGE_INVALID",
        input,
        segment,
        segmentIndex
      );
    }

    return {
      ok: true,
      passage: {
        kind: "VERSE_RANGE",
        bookId: book.id,
        start,
        end,
      },
    };
  }

  const verse = VERSE_PATTERN.exec(segment);

  if (verse) {
    const bookLabel = verse[1] ?? "";
    const chapter = Number(verse[2]);
    const verseNumber = Number(verse[3]);
    const book = resolveBook(bookLabel, input, segment, segmentIndex);

    if (isParseError(book)) {
      return { ok: false, error: book };
    }

    if (!isChapterWithinBook(book, chapter)) {
      return failure(
        "CHAPTER_OUT_OF_RANGE",
        input,
        segment,
        segmentIndex
      );
    }

    if (!isPositiveSafeInteger(verseNumber)) {
      return failure(
        "VERSE_INVALID",
        input,
        segment,
        segmentIndex
      );
    }

    return {
      ok: true,
      passage: {
        kind: "VERSE",
        bookId: book.id,
        chapter,
        verse: verseNumber,
      },
    };
  }

  const chapterRange = CHAPTER_RANGE_PATTERN.exec(segment);

  if (chapterRange) {
    const bookLabel = chapterRange[1] ?? "";
    const startChapter = Number(chapterRange[2]);
    const endChapter = Number(chapterRange[3]);
    const book = resolveBook(bookLabel, input, segment, segmentIndex);

    if (isParseError(book)) {
      return { ok: false, error: book };
    }

    if (
      !isChapterWithinBook(book, startChapter) ||
      !isChapterWithinBook(book, endChapter)
    ) {
      return failure(
        "CHAPTER_OUT_OF_RANGE",
        input,
        segment,
        segmentIndex
      );
    }

    if (startChapter > endChapter) {
      return failure(
        "CHAPTER_RANGE_INVALID",
        input,
        segment,
        segmentIndex
      );
    }

    return {
      ok: true,
      passage: {
        kind: "CHAPTER_RANGE",
        bookId: book.id,
        startChapter,
        endChapter,
      },
    };
  }

  const chapter = CHAPTER_PATTERN.exec(segment);

  if (chapter) {
    const bookLabel = chapter[1] ?? "";
    const chapterNumber = Number(chapter[2]);
    const book = resolveBook(bookLabel, input, segment, segmentIndex);

    if (isParseError(book)) {
      return { ok: false, error: book };
    }

    if (!isChapterWithinBook(book, chapterNumber)) {
      return failure(
        "CHAPTER_OUT_OF_RANGE",
        input,
        segment,
        segmentIndex
      );
    }

    return {
      ok: true,
      passage: {
        kind: "CHAPTER",
        bookId: book.id,
        chapter: chapterNumber,
      },
    };
  }

  const wholeBook = resolveBibleBookAlias(segment);

  if (wholeBook) {
    return {
      ok: true,
      passage: {
        kind: "WHOLE_BOOK",
        bookId: wholeBook.id,
      },
    };
  }

  const possibleBookWithInvalidLocator =
    /^(.+?)\s+\S+$/.exec(segment);

  if (possibleBookWithInvalidLocator) {
    const possibleBookLabel =
      possibleBookWithInvalidLocator[1] ?? "";

    if (resolveBibleBookAlias(possibleBookLabel)) {
      return failure(
        "INVALID_SYNTAX",
        input,
        segment,
        segmentIndex
      );
    }
  }

  return failure(
    "UNKNOWN_BOOK",
    input,
    segment,
    segmentIndex
  );
}

export function parseBibleReference(
  input: string
): BibleReferenceParseResult {
  const normalizedInput = input.trim();

  if (!normalizedInput) {
    return referenceFailure("EMPTY_REFERENCE", input);
  }

  const passages: BiblePassage[] = [];
  const semicolonGroups = normalizedInput.split(";");
  let segmentIndex = 0;

  for (const rawGroup of semicolonGroups) {
    const group = rawGroup.trim();

    if (!group) {
      return referenceFailure(
        "EMPTY_PASSAGE",
        input,
        group,
        segmentIndex
      );
    }

    if (group.includes(",")) {
      const commaParts = group
        .split(",")
        .map((part) => part.trim());

      if (commaParts.some((part) => !part)) {
        return referenceFailure(
          "AMBIGUOUS_COMMA_SHORTHAND",
          input,
          group,
          segmentIndex
        );
      }

      const groupPassages: BiblePassage[] = [];

      for (
        let partIndex = 0;
        partIndex < commaParts.length;
        partIndex += 1
      ) {
        const part = commaParts[partIndex] ?? "";
        const parsed = parseSinglePassage(
          part,
          input,
          segmentIndex + partIndex
        );

        if (!parsed.ok) {
          return referenceFailure(
            "AMBIGUOUS_COMMA_SHORTHAND",
            input,
            group,
            segmentIndex + partIndex
          );
        }

        groupPassages.push(parsed.passage);
      }

      passages.push(...groupPassages);
      segmentIndex += commaParts.length;
      continue;
    }

    const parsed = parseSinglePassage(
      group,
      input,
      segmentIndex
    );

    if (!parsed.ok) {
      return {
        ok: false,
        error: parsed.error,
      };
    }

    passages.push(parsed.passage);
    segmentIndex += 1;
  }

  const firstPassage = passages[0];

  if (!firstPassage) {
    return referenceFailure("EMPTY_REFERENCE", input);
  }

  const nonEmptyPassages: [
    BiblePassage,
    ...BiblePassage[]
  ] = [
    firstPassage,
    ...passages.slice(1),
  ];

  return {
    ok: true,
    value: {
      passages: nonEmptyPassages,
    },
  };
}
