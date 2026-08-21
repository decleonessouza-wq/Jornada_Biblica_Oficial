import type {
  BibleNormalizedCorpusV1,
  BibleNormalizedVerseRecord,
  BibleParsedCorpusDraft,
  BibleParsedVerseDraft,
} from "../import/bibleImportContract";
import {
  assertBibleLivreN4RepairOutput,
  repairBibleLivreN4Markup,
} from "./bibleLivreN4MarkupRepairs";

function removeDelimitedBlocks(
  value: string,
  startMarker: string,
  endMarker: string,
): string {
  let result = "";
  let cursor = 0;

  while (cursor < value.length) {
    const start = value.indexOf(startMarker, cursor);

    if (start < 0) {
      result += value.slice(cursor);
      break;
    }

    result += value.slice(cursor, start);

    const end = value.indexOf(
      endMarker,
      start + startMarker.length,
    );

    if (end < 0) {
      throw new Error(
        `NORMALIZATION_UNCLOSED_MARKER:${startMarker}`,
      );
    }

    cursor = end + endMarker.length;
  }

  return result;
}

function unwrapMarker(
  value: string,
  startMarker: string,
  endMarker: string,
): string {
  return value
    .split(startMarker)
    .join("")
    .split(endMarker)
    .join("");
}

function collapseText(value: string): string {
  return value
    .normalize("NFC")
    .replace(/[ \t\r\n]+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function normalizeBibleLivreN4RawText(
  rawText: string,
): string {
  let text = rawText;

  text = removeDelimitedBlocks(text, "\\fn", "\\*fn");
  text = unwrapMarker(text, "\\added", "\\*added");
  text = unwrapMarker(text, "\\key", "\\*key");

  if (/\{(?:tr|rp|n4)(?:\|rp)?\}/i.test(text)) {
    throw new Error(
      "NORMALIZATION_UNEXPECTED_BLIVRE_VARIANT_CONDITIONAL",
    );
  }

  text = text
    .replace(/\\\*[A-Za-z0-9_-]+/g, " ")
    .replace(/\\[A-Za-z0-9_-]+/g, " ");

  return collapseText(text);
}

function normalizeAlmeida1911RawText(
  rawText: string,
): string {
  const text = rawText
    .replace(/\[[A-Z0-9]+\]/g, " ")
    .replace(/_/g, "");

  return collapseText(text);
}

function normalizeVerse(
  verse: BibleParsedVerseDraft,
  sourceSha256: string,
): BibleNormalizedVerseRecord {
  let text: string;

  if (verse.sourceFormat === "BLIVRE_F4_N4") {
    const repair = repairBibleLivreN4Markup(
      verse,
      sourceSha256,
    );

    text = normalizeBibleLivreN4RawText(
      repair.rawText,
    );

    assertBibleLivreN4RepairOutput(
      repair,
      text,
    );
  } else {
    text = normalizeAlmeida1911RawText(
      verse.rawText,
    );
  }

  if (text.length === 0) {
    throw new Error(
      `NORMALIZATION_EMPTY_TEXT:${verse.bookId}:${verse.chapter}:${verse.verse}`,
    );
  }

  return {
    versionId: verse.versionId,
    bookId: verse.bookId,
    bookOrder: verse.bookOrder,
    chapter: verse.chapter,
    verse: verse.verse,
    text,
  };
}

function compareVerseOrder(
  left: BibleNormalizedVerseRecord,
  right: BibleNormalizedVerseRecord,
): number {
  return (
    left.bookOrder - right.bookOrder ||
    left.chapter - right.chapter ||
    left.verse - right.verse
  );
}

export function normalizeParsedBibleCorpus(
  draft: BibleParsedCorpusDraft,
): BibleNormalizedCorpusV1 {
  const verses = draft.verses
    .map((verse) =>
      normalizeVerse(
        verse,
        draft.sourceSha256,
      ),
    )
    .sort(compareVerseOrder);

  return {
    schema: "bible-normalized-corpus/v1",
    normalizationVersion: "1",
    versionId: draft.versionId,
    sourceVariant: draft.sourceVariant,
    textualBasis: draft.textualBasis,
    sourceSha256: draft.sourceSha256,
    verses,
  };
}

function stableHeaderJson(
  corpus: BibleNormalizedCorpusV1,
): string {
  return JSON.stringify({
    schema: corpus.schema,
    normalizationVersion: corpus.normalizationVersion,
    versionId: corpus.versionId,
    sourceVariant: corpus.sourceVariant,
    textualBasis: corpus.textualBasis,
    sourceSha256: corpus.sourceSha256,
  });
}

function stableVerseJson(
  verse: BibleNormalizedVerseRecord,
): string {
  return JSON.stringify({
    versionId: verse.versionId,
    bookId: verse.bookId,
    bookOrder: verse.bookOrder,
    chapter: verse.chapter,
    verse: verse.verse,
    text: verse.text,
  });
}

export function serializeNormalizedBibleCorpusV1(
  corpus: BibleNormalizedCorpusV1,
): string {
  const orderedVerses = [...corpus.verses].sort(
    compareVerseOrder,
  );

  return [
    stableHeaderJson(corpus),
    ...orderedVerses.map(stableVerseJson),
  ].join("\n") + "\n";
}
