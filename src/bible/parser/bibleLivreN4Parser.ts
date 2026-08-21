import { BIBLE_BOOKS } from "../../domain/bible/bibleBooks";
import { repairBibleLivreN4Structure } from "./bibleLivreN4StructureRepairs";
import type {
  BibleParsedCorpusDraft,
  BibleParsedVerseDraft,
} from "../import/bibleImportContract";

const BLIVRE_VERSION_ID = "BLIVRE" as const;
const BLIVRE_SOURCE_VARIANT = "N4" as const;
const BLIVRE_TEXTUAL_BASIS = "NESTLE_1904" as const;
const BLIVRE_SOURCE_FORMAT = "BLIVRE_F4_N4" as const;

export interface BibleLivreN4SourceFile {
  readonly artifactPath: string;
  readonly content: string;
}

export interface BibleLivreN4ParserInput {
  readonly sourceSha256: string;
  readonly files: readonly BibleLivreN4SourceFile[];
}

interface ParsedMarkerReference {
  readonly chapter: number;
  readonly verse: number;
}

function normalizeEol(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function readMarkerValue(
  lines: readonly string[],
  marker: string,
): string | null {
  const markerIndex = lines.findIndex(
    (line) => line.trim() === marker,
  );

  if (markerIndex < 0) {
    return null;
  }

  for (let index = markerIndex + 1; index < lines.length; index += 1) {
    const value = lines[index]?.trim() ?? "";

    if (value.length === 0) {
      continue;
    }

    if (value.startsWith("\\")) {
      return null;
    }

    return value;
  }

  return null;
}

function parseVerseMarker(reference: string): ParsedMarkerReference {
  const parts = reference.split(".");

  if (parts.length < 3) {
    throw new Error(`BLIVRE_INVALID_VERSE_MARKER:${reference}`);
  }

  const chapter = Number(parts[parts.length - 2]);
  const verse = Number(parts[parts.length - 1]);

  if (!Number.isInteger(chapter) || chapter <= 0) {
    throw new Error(`BLIVRE_INVALID_CHAPTER:${reference}`);
  }

  if (!Number.isInteger(verse) || verse <= 0) {
    throw new Error(`BLIVRE_INVALID_VERSE:${reference}`);
  }

  return { chapter, verse };
}

function canonicalBookById(bookId: string) {
  return BIBLE_BOOKS.find((book) => book.id === bookId);
}

function parseSourceFile(
  sourceFile: BibleLivreN4SourceFile,
): readonly BibleParsedVerseDraft[] {
  const lines = normalizeEol(sourceFile.content).split("\n");
  const ubsCode = readMarkerValue(lines, "\\ubs-code");

  if (!ubsCode) {
    throw new Error(
      `BLIVRE_UBS_CODE_MISSING:${sourceFile.artifactPath}`,
    );
  }

  const canonicalBook = canonicalBookById(ubsCode);

  if (!canonicalBook) {
    throw new Error(
      `BLIVRE_UNKNOWN_UBS_CODE:${ubsCode}:${sourceFile.artifactPath}`,
    );
  }

  const verses: BibleParsedVerseDraft[] = [];
  let currentReference: ParsedMarkerReference | null = null;
  let currentBody: string[] = [];

  const flush = (): void => {
    if (!currentReference) {
      return;
    }

    const rawText = currentBody.join("\n").trim();

    if (rawText.length === 0) {
      throw new Error(
        `BLIVRE_EMPTY_RAW_VERSE:${ubsCode}:${currentReference.chapter}:${currentReference.verse}`,
      );
    }

    verses.push({
      versionId: BLIVRE_VERSION_ID,
      sourceVariant: BLIVRE_SOURCE_VARIANT,
      sourceFormat: BLIVRE_SOURCE_FORMAT,
      bookId: canonicalBook.id,
      bookOrder: canonicalBook.order,
      chapter: currentReference.chapter,
      verse: currentReference.verse,
      rawText,
    });

    currentReference = null;
    currentBody = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("\\v ")) {
      flush();
      currentReference = parseVerseMarker(
        trimmed.slice(3).trim(),
      );
      continue;
    }

    if (currentReference) {
      currentBody.push(line);
    }
  }

  flush();

  const chapterSet = new Set(
    verses.map((verse) => verse.chapter),
  );

  if (chapterSet.size !== canonicalBook.chapterCount) {
    throw new Error(
      `BLIVRE_CHAPTER_COUNT_MISMATCH:${canonicalBook.id}:EXPECTED=${canonicalBook.chapterCount}:ACTUAL=${chapterSet.size}`,
    );
  }

  for (
    let chapter = 1;
    chapter <= canonicalBook.chapterCount;
    chapter += 1
  ) {
    if (!chapterSet.has(chapter)) {
      throw new Error(
        `BLIVRE_MISSING_CHAPTER:${canonicalBook.id}:${chapter}`,
      );
    }
  }

  return verses;
}

function compareVerseOrder(
  left: BibleParsedVerseDraft,
  right: BibleParsedVerseDraft,
): number {
  return (
    left.bookOrder - right.bookOrder ||
    left.chapter - right.chapter ||
    left.verse - right.verse
  );
}

export function parseBibleLivreN4Source(
  input: BibleLivreN4ParserInput,
): BibleParsedCorpusDraft {
  if (input.files.length !== BIBLE_BOOKS.length) {
    throw new Error(
      `BLIVRE_FILE_COUNT_MISMATCH:EXPECTED=${BIBLE_BOOKS.length}:ACTUAL=${input.files.length}`,
    );
  }

  const seenBooks = new Set<string>();
  const verses: BibleParsedVerseDraft[] = [];

  for (const sourceFile of input.files) {
    const parsed = repairBibleLivreN4Structure(
      parseSourceFile(sourceFile),
      input.sourceSha256,
    );

    if (parsed.length === 0) {
      throw new Error(
        `BLIVRE_FILE_HAS_NO_VERSES:${sourceFile.artifactPath}`,
      );
    }

    const bookId = parsed[0]?.bookId;

    if (!bookId) {
      throw new Error(
        `BLIVRE_BOOK_ID_NOT_RESOLVED:${sourceFile.artifactPath}`,
      );
    }

    if (seenBooks.has(bookId)) {
      throw new Error(`BLIVRE_DUPLICATE_BOOK:${bookId}`);
    }

    seenBooks.add(bookId);
    verses.push(...parsed);
  }

  for (const canonicalBook of BIBLE_BOOKS) {
    if (!seenBooks.has(canonicalBook.id)) {
      throw new Error(
        `BLIVRE_MISSING_BOOK:${canonicalBook.id}`,
      );
    }
  }

  verses.sort(compareVerseOrder);

  return {
    schema: "bible-parsed-corpus-draft/v1",
    versionId: BLIVRE_VERSION_ID,
    sourceVariant: BLIVRE_SOURCE_VARIANT,
    textualBasis: BLIVRE_TEXTUAL_BASIS,
    sourceFormat: BLIVRE_SOURCE_FORMAT,
    sourceSha256: input.sourceSha256,
    verses,
  };
}
