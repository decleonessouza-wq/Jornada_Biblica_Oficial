import { BIBLE_BOOKS } from "../../domain/bible/bibleBooks";
import type {
  BibleParsedCorpusDraft,
  BibleParsedVerseDraft,
} from "../import/bibleImportContract";
import { getAlmeida1911HistoricalHeadingAliases } from "./almeida1911HistoricalHeadings";
import {
  assertAlmeida1911SourceRepairSourceSha,
  repairAlmeida1911VerseStartToken,
  shouldDropAlmeida1911RawTextLine,
} from "./almeida1911SourceRepairs";

const ALM_VERSION_ID = "ALM1911" as const;
const ALM_SOURCE_VARIANT = "GUTENBERG_62383" as const;
const ALM_TEXTUAL_BASIS = "ALMEIDA_1911" as const;
const ALM_SOURCE_FORMAT = "GUTENBERG_ALM1911" as const;
const MAX_SOURCE_LINE_GAP_TO_VERSE_TWO = 25;

interface AlmeidaVerseStartToken {
  readonly sourceLine: number;
  readonly label: string | null;
  readonly rawNumber: number;
  readonly text: string;
}

interface AlmeidaBookBoundary {
  readonly bookId: string;
  readonly bookOrder: number;
  readonly chapterCount: number;
  readonly headingSourceLine: number;
  readonly endSourceLineExclusive: number;
}

interface AlmeidaChapterStart {
  readonly chapter: number;
  readonly tokenIndex: number;
}

export interface Almeida1911ParserInput {
  readonly sourceSha256: string;
  readonly content: string;
}

function normalizeEol(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function normalizeSearch(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
}

function historicalFold(value: string): string {
  return normalizeSearch(value)
    .replace(/PH/g, "F")
    .replace(/TH/g, "T")
    .replace(/Y/g, "I")
    .replace(/CHRON/g, "CRON");
}

function isHeadingLike(raw: string): boolean {
  const trimmed = raw.trim();

  if (trimmed.length < 3 || trimmed.length > 160) {
    return false;
  }

  const letters = trimmed.match(/[A-Za-zÀ-ÿ]/g);

  if (!letters || letters.length < 3) {
    return false;
  }

  return trimmed === trimmed.toUpperCase();
}

function ordinalMatches(
  normalizedHeading: string,
  ordinal: number,
): boolean {
  if (ordinal === 1) {
    return (
      /\b1\b/.test(normalizedHeading) ||
      /\bI\b/.test(normalizedHeading) ||
      normalizedHeading.includes("PRIMEIR")
    );
  }

  if (ordinal === 2) {
    return (
      /\b2\b/.test(normalizedHeading) ||
      /\bII\b/.test(normalizedHeading) ||
      normalizedHeading.includes("SEGUND")
    );
  }

  if (ordinal === 3) {
    return (
      /\b3\b/.test(normalizedHeading) ||
      /\bIII\b/.test(normalizedHeading) ||
      normalizedHeading.includes("TERCEIR")
    );
  }

  return false;
}

function headingMatchesBook(
  heading: string,
  canonicalBook: (typeof BIBLE_BOOKS)[number],
): boolean {
  const normalizedHeading = historicalFold(heading);
  const canonicalName = historicalFold(
    canonicalBook.canonicalName,
  );

  const historicalAliases =
    getAlmeida1911HistoricalHeadingAliases(
      canonicalBook.id,
    )
      .map(historicalFold)
      .filter((candidate) => candidate.length >= 3);

  const numbered = canonicalName.match(/^([123])\s+(.+)$/);

  if (numbered) {
    const ordinal = Number(numbered[1]);
    const baseName = numbered[2]?.trim() ?? "";

    const nameMatches =
      (
        baseName.length >= 3 &&
        normalizedHeading.includes(baseName)
      ) ||
      historicalAliases.some((candidate) =>
        normalizedHeading.includes(candidate),
      );

    return (
      nameMatches &&
      ordinalMatches(normalizedHeading, ordinal)
    );
  }

  const candidates = [
    canonicalBook.canonicalName,
    ...canonicalBook.aliases,
  ]
    .map(historicalFold)
    .filter((candidate) => candidate.length >= 4);

  return (
    candidates.some((candidate) =>
      normalizedHeading.includes(candidate),
    ) ||
    historicalAliases.some((candidate) =>
      normalizedHeading.includes(candidate),
    )
  );
}


function discoverBookBoundaries(
  lines: readonly string[],
  corpusStartLine: number,
  corpusEndLineExclusive: number,
): readonly AlmeidaBookBoundary[] {
  const boundaries: Array<
    Omit<AlmeidaBookBoundary, "endSourceLineExclusive">
  > = [];

  let searchSourceLine = corpusStartLine;

  for (const canonicalBook of BIBLE_BOOKS) {
    let headingSourceLine = -1;

    for (
      let sourceLine = searchSourceLine;
      sourceLine < corpusEndLineExclusive;
      sourceLine += 1
    ) {
      const raw = lines[sourceLine - 1] ?? "";

      if (
        isHeadingLike(raw) &&
        headingMatchesBook(raw, canonicalBook)
      ) {
        headingSourceLine = sourceLine;
        break;
      }
    }

    if (headingSourceLine < 0) {
      throw new Error(
        `ALM_BOOK_HEADING_NOT_FOUND:${canonicalBook.id}`,
      );
    }

    boundaries.push({
      bookId: canonicalBook.id,
      bookOrder: canonicalBook.order,
      chapterCount: canonicalBook.chapterCount,
      headingSourceLine,
    });

    searchSourceLine = headingSourceLine + 1;
  }

  return boundaries.map((boundary, index) => ({
    ...boundary,
    endSourceLineExclusive:
      boundaries[index + 1]?.headingSourceLine ??
      corpusEndLineExclusive,
  }));
}

function parseVerseStartToken(
  rawLine: string,
  sourceLine: number,
): AlmeidaVerseStartToken | null {
  const trimmed = rawLine.trim();

  const labeled = trimmed.match(
    /^([A-Za-zÀ-ÿ]+)\.\s+(?:\[[^\]]+\]\s*)*([0-9]{1,3})\s+(.+)$/,
  );

  if (labeled) {
    return {
      sourceLine,
      label: normalizeSearch(labeled[1] ?? ""),
      rawNumber: Number(labeled[2]),
      text: labeled[3] ?? "",
    };
  }

  const numeric = trimmed.match(/^([0-9]{1,3})\s+(.+)$/);

  if (!numeric) {
    return null;
  }

  return {
    sourceLine,
    label: null,
    rawNumber: Number(numeric[1]),
    text: numeric[2] ?? "",
  };
}

function collectVerseStartTokens(
  lines: readonly string[],
  boundary: AlmeidaBookBoundary,
): readonly AlmeidaVerseStartToken[] {
  const tokens: AlmeidaVerseStartToken[] = [];

  for (
    let sourceLine = boundary.headingSourceLine + 1;
    sourceLine < boundary.endSourceLineExclusive;
    sourceLine += 1
  ) {
    const raw = lines[sourceLine - 1] ?? "";
    const parsed = parseVerseStartToken(
      raw,
      sourceLine,
    );

    if (!parsed) {
      continue;
    }

    const repaired = repairAlmeida1911VerseStartToken(
      boundary.bookId,
      raw,
      parsed,
    );

    if (repaired) {
      tokens.push(repaired);
    }
  }

  return tokens;
}


function findLamentationsChapterStarts(
  tokens: readonly AlmeidaVerseStartToken[],
): readonly AlmeidaChapterStart[] {
  const starts: AlmeidaChapterStart[] = [];

  for (let chapter = 1; chapter <= 4; chapter += 1) {
    const matches = tokens
      .map((token, tokenIndex) => ({ token, tokenIndex }))
      .filter(
        ({ token }) =>
          token.label === "ALEPH" &&
          token.rawNumber === chapter,
      );

    if (matches.length !== 1) {
      throw new Error(
        `ALM_LAM_ALEPH_START_COUNT:CH=${chapter}:COUNT=${matches.length}`,
      );
    }

    starts.push({
      chapter,
      tokenIndex: matches[0]?.tokenIndex ?? -1,
    });
  }

  const chapterFour = starts.find(
    (start) => start.chapter === 4,
  );

  if (!chapterFour) {
    throw new Error("ALM_LAM_CHAPTER_FOUR_START_MISSING");
  }

  const chapterFiveCandidates: AlmeidaChapterStart[] = [];

  for (
    let tokenIndex = chapterFour.tokenIndex + 1;
    tokenIndex < tokens.length - 1;
    tokenIndex += 1
  ) {
    const current = tokens[tokenIndex];
    const next = tokens[tokenIndex + 1];

    if (
      current?.label === null &&
      current.rawNumber === 5 &&
      next?.rawNumber === 2
    ) {
      chapterFiveCandidates.push({
        chapter: 5,
        tokenIndex,
      });
    }
  }

  if (chapterFiveCandidates.length !== 1) {
    throw new Error(
      `ALM_LAM_CHAPTER_FIVE_START_COUNT:${chapterFiveCandidates.length}`,
    );
  }

  starts.push(chapterFiveCandidates[0]!);

  return starts.sort(
    (left, right) => left.chapter - right.chapter,
  );
}

function findStandardChapterStarts(
  tokens: readonly AlmeidaVerseStartToken[],
  expectedChapterCount: number,
  bookId: string,
): readonly AlmeidaChapterStart[] {
  const starts: AlmeidaChapterStart[] = [];
  let cursor = 0;

  for (
    let chapter = 1;
    chapter <= expectedChapterCount;
    chapter += 1
  ) {
    const candidates: AlmeidaChapterStart[] = [];

    for (
      let tokenIndex = cursor;
      tokenIndex < tokens.length - 1;
      tokenIndex += 1
    ) {
      const current = tokens[tokenIndex];
      const next = tokens[tokenIndex + 1];

      if (!current || !next) {
        continue;
      }

      const sourceLineGap =
        next.sourceLine - current.sourceLine;

      if (
        current.rawNumber === chapter &&
        next.rawNumber === 2 &&
        sourceLineGap <= MAX_SOURCE_LINE_GAP_TO_VERSE_TWO
      ) {
        candidates.push({
          chapter,
          tokenIndex,
        });
      }
    }

    if (candidates.length === 0) {
      throw new Error(
        `ALM_CHAPTER_START_NOT_FOUND:${bookId}:${chapter}`,
      );
    }

    const selected = candidates[0]!;

    starts.push(selected);
    cursor = selected.tokenIndex + 1;
  }

  return starts;
}

function isMetadataOnlyLine(raw: string): boolean {
  const trimmed = raw.trim();

  if (trimmed.length === 0) {
    return true;
  }

  if (/^\[Antes de Christo\b/i.test(trimmed)) {
    return true;
  }

  if (/^_[^_]+_$/.test(trimmed)) {
    return true;
  }

  return isHeadingLike(trimmed);
}

function collectVerseRawText(
  lines: readonly string[],
  boundary: AlmeidaBookBoundary,
  token: AlmeidaVerseStartToken,
  nextTokenSourceLine: number,
): string {
  const parts = [token.text];
  let skippingFootnoteDefinition = false;

  for (
    let sourceLine = token.sourceLine + 1;
    sourceLine < nextTokenSourceLine;
    sourceLine += 1
  ) {
    const raw = lines[sourceLine - 1] ?? "";
    const trimmed = raw.trim();

    if (
      shouldDropAlmeida1911RawTextLine(
        boundary.bookId,
        token.sourceLine,
        sourceLine,
        raw,
      )
    ) {
      continue;
    }

    if (/^\[[A-Z0-9]+\]\s+/.test(trimmed)) {
      skippingFootnoteDefinition = true;
      continue;
    }

    if (skippingFootnoteDefinition) {
      if (trimmed.length === 0) {
        skippingFootnoteDefinition = false;
      }

      continue;
    }

    if (isMetadataOnlyLine(raw)) {
      continue;
    }

    parts.push(trimmed);
  }

  return parts.join("\n").trim();
}

function parseBoundedBook(
  lines: readonly string[],
  boundary: AlmeidaBookBoundary,
): readonly BibleParsedVerseDraft[] {
  const tokens = collectVerseStartTokens(lines, boundary);

  if (tokens.length === 0) {
    throw new Error(
      `ALM_BOOK_HAS_NO_VERSE_TOKENS:${boundary.bookId}`,
    );
  }

  const chapterStarts =
    boundary.bookId === "LAM"
      ? findLamentationsChapterStarts(tokens)
      : findStandardChapterStarts(
          tokens,
          boundary.chapterCount,
          boundary.bookId,
        );

  if (chapterStarts.length !== boundary.chapterCount) {
    throw new Error(
      `ALM_CHAPTER_COUNT_MISMATCH:${boundary.bookId}:EXPECTED=${boundary.chapterCount}:ACTUAL=${chapterStarts.length}`,
    );
  }

  const verses: BibleParsedVerseDraft[] = [];

  for (
    let chapterIndex = 0;
    chapterIndex < chapterStarts.length;
    chapterIndex += 1
  ) {
    const chapterStart = chapterStarts[chapterIndex]!;
    const nextChapterStart = chapterStarts[chapterIndex + 1];

    const endTokenIndex =
      nextChapterStart?.tokenIndex ?? tokens.length;

    const chapterTokens = tokens.slice(
      chapterStart.tokenIndex,
      endTokenIndex,
    );

    if (chapterTokens.length === 0) {
      throw new Error(
        `ALM_EMPTY_CHAPTER:${boundary.bookId}:${chapterStart.chapter}`,
      );
    }

    for (
      let verseIndex = 0;
      verseIndex < chapterTokens.length;
      verseIndex += 1
    ) {
      const token = chapterTokens[verseIndex]!;
      const logicalVerse = verseIndex + 1;
      const actualLogicalVerse =
        verseIndex === 0 ? 1 : token.rawNumber;

      if (actualLogicalVerse !== logicalVerse) {
        throw new Error(
          `ALM_VERSE_SEQUENCE:${boundary.bookId}:${chapterStart.chapter}:EXPECTED=${logicalVerse}:ACTUAL=${actualLogicalVerse}:SOURCE_LINE=${token.sourceLine}`,
        );
      }

      const nextTokenSourceLine =
        chapterTokens[verseIndex + 1]?.sourceLine ??
        (nextChapterStart
          ? tokens[nextChapterStart.tokenIndex]!.sourceLine
          : boundary.endSourceLineExclusive);

      const rawText = collectVerseRawText(
        lines,
        boundary,
        token,
        nextTokenSourceLine,
      );

      if (rawText.length === 0) {
        throw new Error(
          `ALM_EMPTY_RAW_VERSE:${boundary.bookId}:${chapterStart.chapter}:${logicalVerse}`,
        );
      }

      verses.push({
        versionId: ALM_VERSION_ID,
        sourceVariant: ALM_SOURCE_VARIANT,
        sourceFormat: ALM_SOURCE_FORMAT,
        bookId: boundary.bookId,
        bookOrder: boundary.bookOrder,
        chapter: chapterStart.chapter,
        verse: logicalVerse,
        rawText,
      });
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

export function parseAlmeida1911Source(
  input: Almeida1911ParserInput,
): BibleParsedCorpusDraft {
  assertAlmeida1911SourceRepairSourceSha(input.sourceSha256);

  const lines = normalizeEol(input.content).split("\n");

  const startMarkerIndex = lines.findIndex((line) =>
    line
      .toUpperCase()
      .includes("START OF THE PROJECT GUTENBERG EBOOK"),
  );

  const endMarkerIndex = lines.findIndex((line) =>
    line
      .toUpperCase()
      .includes("END OF THE PROJECT GUTENBERG EBOOK"),
  );

  if (startMarkerIndex < 0) {
    throw new Error("ALM_GUTENBERG_START_MARKER_MISSING");
  }

  if (endMarkerIndex <= startMarkerIndex) {
    throw new Error("ALM_GUTENBERG_END_MARKER_MISSING");
  }

  const boundaries = discoverBookBoundaries(
    lines,
    startMarkerIndex + 2,
    endMarkerIndex + 1,
  );

  if (boundaries.length !== BIBLE_BOOKS.length) {
    throw new Error(
      `ALM_BOOK_BOUNDARY_COUNT_MISMATCH:EXPECTED=${BIBLE_BOOKS.length}:ACTUAL=${boundaries.length}`,
    );
  }

  const verses = boundaries.flatMap((boundary) =>
    parseBoundedBook(lines, boundary),
  );

  verses.sort(compareVerseOrder);

  return {
    schema: "bible-parsed-corpus-draft/v1",
    versionId: ALM_VERSION_ID,
    sourceVariant: ALM_SOURCE_VARIANT,
    textualBasis: ALM_TEXTUAL_BASIS,
    sourceFormat: ALM_SOURCE_FORMAT,
    sourceSha256: input.sourceSha256,
    verses,
  };
}
