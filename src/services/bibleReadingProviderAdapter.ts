/**
 * Adapter puro para destinos externos de leitura bíblica.
 *
 * Responsabilidades:
 * - receber uma BiblePassage já estruturada;
 * - produzir a referência canônica usada pelo provider;
 * - mapear BibleBookId para códigos específicos do BibliaOnline;
 * - preservar a política atual de versões e fallbacks.
 *
 * Fora de escopo:
 * - parsing de texto livre;
 * - normalização de aliases;
 * - React Native, navegação, WebView ou Linking;
 * - persistência, rede e resolução de datas do plano;
 * - estados especiais como domingo ou Natal.
 */

import type {
  BibleBookId,
  BiblePassage,
  BibleReference,
} from "../domain/bible/bibleReference";
import { formatBibleReference } from "../domain/bible/bibleReferenceFormatter";
import { getBibleBookById } from "../domain/bible/bibleBooks";

export type BibleReadingVersion = "ARC" | "NVI" | "ACF" | "KJ";

export type BibleReadingProviderId =
  | "BIBLE_GATEWAY"
  | "BIBLIA_ONLINE"
  | "GOOGLE_FALLBACK";

export type BibleReadingProviderTarget = Readonly<{
  providerId: BibleReadingProviderId;
  version: BibleReadingVersion;
  referenceText: string;
  url: string;
}>;

const BIBLIA_ONLINE_BOOK_CODES: Readonly<
  Record<BibleBookId, string>
> = Object.freeze({
  GEN: "gn",
  EXO: "ex",
  LEV: "lv",
  NUM: "nm",
  DEU: "dt",
  JOS: "js",
  JDG: "jz",
  RUT: "rt",
  "1SA": "1sm",
  "2SA": "2sm",
  "1KI": "1rs",
  "2KI": "2rs",
  "1CH": "1cr",
  "2CH": "2cr",
  EZR: "ed",
  NEH: "ne",
  EST: "et",
  JOB: "job",
  PSA: "sl",
  PRO: "pv",
  ECC: "ec",
  SNG: "ct",
  ISA: "is",
  JER: "jr",
  LAM: "lm",
  EZK: "ez",
  DAN: "dn",
  HOS: "os",
  JOL: "jl",
  AMO: "am",
  OBA: "ob",
  JON: "jn",
  MIC: "mq",
  NAM: "na",
  HAB: "hc",
  ZEP: "sf",
  HAG: "ag",
  ZEC: "zc",
  MAL: "ml",
  MAT: "mt",
  MRK: "mc",
  LUK: "lc",
  JHN: "jo",
  ACT: "at",
  ROM: "rm",
  "1CO": "1co",
  "2CO": "2co",
  GAL: "gl",
  EPH: "ef",
  PHP: "fp",
  COL: "cl",
  "1TH": "1ts",
  "2TH": "2ts",
  "1TI": "1tm",
  "2TI": "2tm",
  TIT: "tt",
  PHM: "fm",
  HEB: "hb",
  JAS: "tg",
  "1PE": "1pe",
  "2PE": "2pe",
  "1JN": "1jo",
  "2JN": "2jo",
  "3JN": "3jo",
  JUD: "jd",
  REV: "ap",
});

export class BibleReadingProviderAdapterInvariantError extends Error {
  readonly code = "BIBLIA_ONLINE_BOOK_CODE_MISSING" as const;
  readonly bookId: BibleBookId;

  constructor(bookId: BibleBookId) {
    super(`Código BibliaOnline ausente para BibleBookId="${bookId}".`);
    this.name = "BibleReadingProviderAdapterInvariantError";
    this.bookId = bookId;
  }
}

function formatPassageCanonical(passage: BiblePassage): string {
  const reference: BibleReference = {
    passages: [passage],
  };

  return formatBibleReference(reference);
}

function getBibliaOnlineBookCode(bookId: BibleBookId): string {
  const code = BIBLIA_ONLINE_BOOK_CODES[bookId];

  if (!code) {
    throw new BibleReadingProviderAdapterInvariantError(bookId);
  }

  return code;
}

function buildBibleGatewayTarget(
  passage: BiblePassage,
  version: "ARC" | "NVI"
): BibleReadingProviderTarget {
  const referenceText = formatPassageCanonical(passage);
  const providerVersion = version === "ARC" ? "ARC" : "NVI-PT";

  return {
    providerId: "BIBLE_GATEWAY",
    version,
    referenceText,
    url:
      "https://www.biblegateway.com/passage/?search=" +
      encodeURIComponent(referenceText) +
      `&version=${providerVersion}`,
  };
}

function getBibliaOnlineChapterSegment(
  passage: BiblePassage
): string | null {
  switch (passage.kind) {
    case "WHOLE_BOOK": {
      const book = getBibleBookById(passage.bookId);
      return book.chapterCount === 1 ? "1" : null;
    }

    case "CHAPTER":
      return String(passage.chapter);

    case "CHAPTER_RANGE":
      return `${passage.startChapter}-${passage.endChapter}`;

    case "VERSE":
    case "VERSE_RANGE":
      return null;
  }
}

function buildGoogleFallbackTarget(
  passage: BiblePassage,
  version: "ACF" | "KJ"
): BibleReadingProviderTarget {
  const referenceText = formatPassageCanonical(passage);
  const queryPrefix =
    version === "ACF" ? "Bíblia Online ACF" : "Bíblia BKJ";

  return {
    providerId: "GOOGLE_FALLBACK",
    version,
    referenceText,
    url:
      "https://www.google.com/search?q=" +
      encodeURIComponent(`${queryPrefix} ${referenceText}`),
  };
}

function buildBibliaOnlineTarget(
  passage: BiblePassage,
  version: "ACF" | "KJ"
): BibleReadingProviderTarget | null {
  const chapterSegment = getBibliaOnlineChapterSegment(passage);

  if (!chapterSegment) {
    return null;
  }

  const referenceText = formatPassageCanonical(passage);
  const versionPath = version === "ACF" ? "acf" : "bkj";
  const bookCode = getBibliaOnlineBookCode(passage.bookId);

  return {
    providerId: "BIBLIA_ONLINE",
    version,
    referenceText,
    url:
      `https://www.bibliaonline.com.br/${versionPath}/` +
      `${bookCode}/${chapterSegment}`,
  };
}

export function buildBibleReadingProviderTarget(
  passage: BiblePassage,
  version: BibleReadingVersion
): BibleReadingProviderTarget {
  if (version === "ARC" || version === "NVI") {
    return buildBibleGatewayTarget(passage, version);
  }

  return (
    buildBibliaOnlineTarget(passage, version) ??
    buildGoogleFallbackTarget(passage, version)
  );
}
