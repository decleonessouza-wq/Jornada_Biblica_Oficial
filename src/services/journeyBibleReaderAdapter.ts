import {
  getOfflineBibleReaderRouteParamsForReference,
  type OfflineBibleReaderRouteParams,
} from "../bible/reader/bibleReaderContracts";
import type {
  BiblePassage,
  BibleReference,
} from "../domain/bible/bibleReference";
import {
  parseBibleReference,
  type BibleReferenceParseError,
} from "../domain/bible/bibleReferenceParser";
import {
  isBibleVersionId,
  type BibleVersionId,
} from "../domain/bible/bibleVersion";

export type JourneyBibleReaderAdapterError =
  | Readonly<{
      code: "INVALID_VERSION";
    }>
  | Readonly<{
      code: "INVALID_PASSAGE_INDEX";
      passageIndex: number;
      passageCount: number;
    }>
  | Readonly<{
      code: "REFERENCE_PARSE_FAILED";
      parserError: BibleReferenceParseError;
    }>
  | Readonly<{
      code: "READER_ROUTE_INVALID";
      passageIndex: number;
    }>;

export type JourneyBibleReaderAdapterResult =
  | Readonly<{
      ok: true;
      routeParams: OfflineBibleReaderRouteParams;
      passageIndex: number;
      passageCount: number;
    }>
  | Readonly<{
      ok: false;
      error: JourneyBibleReaderAdapterError;
    }>;

type StructuredReferenceInput = Readonly<{
  reference: BibleReference;
  versionId: BibleVersionId;
  passageIndex: number;
}>;

type TextReferenceInput = Readonly<{
  referenceText: string;
  versionId: BibleVersionId;
  passageIndex: number;
}>;

function isValidPassageIndex(
  passageIndex: number,
  passageCount: number,
): boolean {
  return (
    Number.isInteger(passageIndex) &&
    passageIndex >= 0 &&
    passageIndex < passageCount
  );
}

function createSinglePassageReference(
  passage: BiblePassage,
): BibleReference {
  return {
    passages: [passage],
  };
}

export function getJourneyBibleReaderRouteForReference(
  input: StructuredReferenceInput,
): JourneyBibleReaderAdapterResult {
  if (!isBibleVersionId(input.versionId)) {
    return {
      ok: false,
      error: {
        code: "INVALID_VERSION",
      },
    };
  }

  const passageCount = input.reference.passages.length;

  if (!isValidPassageIndex(input.passageIndex, passageCount)) {
    return {
      ok: false,
      error: {
        code: "INVALID_PASSAGE_INDEX",
        passageIndex: input.passageIndex,
        passageCount,
      },
    };
  }

  const selectedPassage =
    input.reference.passages[input.passageIndex];

  if (!selectedPassage) {
    return {
      ok: false,
      error: {
        code: "INVALID_PASSAGE_INDEX",
        passageIndex: input.passageIndex,
        passageCount,
      },
    };
  }

  const selectedReference =
    createSinglePassageReference(selectedPassage);

  const routeParams =
    getOfflineBibleReaderRouteParamsForReference(
      selectedReference,
      input.versionId,
    );

  if (!routeParams) {
    return {
      ok: false,
      error: {
        code: "READER_ROUTE_INVALID",
        passageIndex: input.passageIndex,
      },
    };
  }

  return {
    ok: true,
    routeParams,
    passageIndex: input.passageIndex,
    passageCount,
  };
}

export function getJourneyBibleReaderRouteForText(
  input: TextReferenceInput,
): JourneyBibleReaderAdapterResult {
  if (!isBibleVersionId(input.versionId)) {
    return {
      ok: false,
      error: {
        code: "INVALID_VERSION",
      },
    };
  }

  const parsed = parseBibleReference(input.referenceText);

  if (!parsed.ok) {
    return {
      ok: false,
      error: {
        code: "REFERENCE_PARSE_FAILED",
        parserError: parsed.error,
      },
    };
  }

  return getJourneyBibleReaderRouteForReference({
    reference: parsed.value,
    versionId: input.versionId,
    passageIndex: input.passageIndex,
  });
}
