import type {
  BibleReference,
} from "../../domain/bible/bibleReference";
import { getBibleBookById } from "../../domain/bible/bibleBooks";
import { formatBibleReference } from "../../domain/bible/bibleReferenceFormatter";
import { parseBibleReference } from "../../domain/bible/bibleReferenceParser";
import type {
  StudyContentBlock,
  StudySection,
  StudySectionId,
} from "../../domain/studies/study";
import { getRuntimeStudySections } from "./studyRuntimeCatalog";

export type StudyKeepFavoriteResolutionErrorCode =
  | "KEEP_NOT_FOUND"
  | "KEEP_AMBIGUOUS"
  | "KEEP_NOT_FAVORITABLE"
  | "DIRECTIVE_CONTEXT_UNRESOLVED";

export type ResolvedStudyKeepFavoriteReference = Readonly<{
  sourceText: string;
  normalizedText: string;
  canonicalText: string;
  reference: BibleReference;
}>;

export type ResolvedStudyKeepFavoriteReferences = Readonly<{
  ok: true;
  studyId: string;
  sectionId: StudySectionId;
  references: readonly ResolvedStudyKeepFavoriteReference[];
}>;

export type StudyKeepFavoriteResolutionFailure = Readonly<{
  ok: false;
  code: StudyKeepFavoriteResolutionErrorCode;
}>;

export type StudyKeepFavoriteResolution =
  | ResolvedStudyKeepFavoriteReferences
  | StudyKeepFavoriteResolutionFailure;

type TokenSpan = Readonly<{
  start: number;
  end: number;
}>;

type ExtractedReference = Readonly<{
  start: number;
  end: number;
  sourceText: string;
  normalizedText: string;
  canonicalText: string;
  reference: BibleReference;
}>;

type LocatorSpan = Readonly<{
  start: number;
  end: number;
  text: string;
}>;

const REFERENCE_WINDOW_MAX_TOKENS = 8;

const normalizeSpaces = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

const normalizeKnownReferenceSyntax = (
  value: string,
): string =>
  value
    .replace(/[\u2013\u2014\u2212]/g, "-")
    .replace(/^[\(\[\{"'\u201c\u2018]+/u, "")
    .replace(/[\)\]\}",'.;!?\u201d\u2019]+$/u, "")
    .trim()
    .replace(/^Salmo(?=\s+\d)/i, "Salmos");

const getBlockTexts = (
  block: StudyContentBlock,
): readonly string[] => {
  if (
    block.type === "PARAGRAPH" ||
    block.type === "SUBHEADING"
  ) {
    return [block.text];
  }

  if (
    block.type === "BULLET_LIST" ||
    block.type === "NUMBERED_LIST"
  ) {
    return block.items;
  }

  return [
    ...(block.title ? [block.title] : []),
    block.text,
  ];
};

const getSectionText = (
  section: StudySection,
): string =>
  normalizeSpaces(
    section.blocks
      .flatMap(getBlockTexts)
      .filter((text) => text.trim().length > 0)
      .join(" "),
  );

const getTokenSpans = (
  text: string,
): readonly TokenSpan[] => {
  const spans: TokenSpan[] = [];
  const matcher = /\S+/gu;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(text)) !== null) {
    spans.push({
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return spans;
};

const parseReferenceCandidate = (
  sourceText: string,
): Readonly<{
  normalizedText: string;
  canonicalText: string;
  reference: BibleReference;
}> | null => {
  const normalizedText =
    normalizeKnownReferenceSyntax(sourceText);

  if (!normalizedText.includes(":")) {
    return null;
  }

  const parsed = parseBibleReference(normalizedText);

  if (!parsed.ok) {
    return null;
  }

  if (
    parsed.value.passages.some(
      (passage) =>
        passage.kind !== "VERSE" &&
        passage.kind !== "VERSE_RANGE",
    )
  ) {
    return null;
  }

  return {
    normalizedText,
    canonicalText: formatBibleReference(parsed.value),
    reference: parsed.value,
  };
};

const extractReferences = (
  text: string,
): readonly ExtractedReference[] => {
  const tokenSpans = getTokenSpans(text);
  const candidates: Array<
    ExtractedReference & Readonly<{ tokenLength: number }>
  > = [];

  for (
    let startToken = 0;
    startToken < tokenSpans.length;
    startToken += 1
  ) {
    for (
      let endToken = startToken;
      endToken < tokenSpans.length &&
      endToken <
        startToken + REFERENCE_WINDOW_MAX_TOKENS;
      endToken += 1
    ) {
      const start = tokenSpans[startToken]?.start;
      const end = tokenSpans[endToken]?.end;

      if (
        start === undefined ||
        end === undefined
      ) {
        continue;
      }

      const sourceText = text.slice(start, end);

      if (!sourceText.includes(":")) {
        continue;
      }

      const parsed = parseReferenceCandidate(sourceText);

      if (!parsed) {
        continue;
      }

      candidates.push({
        start,
        end,
        sourceText,
        normalizedText: parsed.normalizedText,
        canonicalText: parsed.canonicalText,
        reference: parsed.reference,
        tokenLength: endToken - startToken + 1,
      });
    }
  }

  candidates.sort((left, right) => {
    if (left.start !== right.start) {
      return left.start - right.start;
    }

    return right.tokenLength - left.tokenLength;
  });

  const selected: ExtractedReference[] = [];

  for (const candidate of candidates) {
    const overlaps = selected.some(
      (existing) =>
        candidate.start < existing.end &&
        candidate.end > existing.start,
    );

    if (!overlaps) {
      selected.push(candidate);
    }
  }

  return selected;
};

const getLocatorSpans = (
  text: string,
): readonly LocatorSpan[] => {
  const normalizedDashText =
    text.replace(/[\u2013\u2014\u2212]/g, "-");
  const matcher = /\b\d+:\d+(?:-\d+)?\b/gu;
  const spans: LocatorSpan[] = [];
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(normalizedDashText)) !== null) {
    spans.push({
      start: match.index,
      end: match.index + match[0].length,
      text: match[0],
    });
  }

  return spans;
};

const resolveDirectiveContextShorthand = (
  directiveText: string,
  explicitReferences: readonly ExtractedReference[],
): StudyKeepFavoriteResolutionFailure |
Readonly<{
  references: readonly ExtractedReference[];
}> => {
  const unresolvedLocators = getLocatorSpans(
    directiveText,
  ).filter(
    (locator) =>
      !explicitReferences.some(
        (reference) =>
          locator.start >= reference.start &&
          locator.end <= reference.end,
      ),
  );

  if (unresolvedLocators.length === 0) {
    return {
      references: explicitReferences,
    };
  }

  if (unresolvedLocators.length !== 1) {
    return {
      ok: false,
      code: "DIRECTIVE_CONTEXT_UNRESOLVED",
    };
  }

  const locator = unresolvedLocators[0];

  if (!locator) {
    return {
      ok: false,
      code: "DIRECTIVE_CONTEXT_UNRESOLVED",
    };
  }

  const prior = [...explicitReferences]
    .filter((reference) => reference.end <= locator.start)
    .sort((left, right) => right.end - left.end)[0];

  if (
    !prior ||
    prior.reference.passages.length !== 1
  ) {
    return {
      ok: false,
      code: "DIRECTIVE_CONTEXT_UNRESOLVED",
    };
  }

  const priorPassage = prior.reference.passages[0];

  if (!priorPassage) {
    return {
      ok: false,
      code: "DIRECTIVE_CONTEXT_UNRESOLVED",
    };
  }

  const bookName =
    getBibleBookById(priorPassage.bookId).canonicalName;
  const normalizedText = `${bookName} ${locator.text}`;
  const parsed = parseReferenceCandidate(normalizedText);

  if (!parsed) {
    return {
      ok: false,
      code: "DIRECTIVE_CONTEXT_UNRESOLVED",
    };
  }

  return {
    references: [
      ...explicitReferences,
      {
        start: locator.start,
        end: locator.end,
        sourceText: locator.text,
        normalizedText: parsed.normalizedText,
        canonicalText: parsed.canonicalText,
        reference: parsed.reference,
      },
    ].sort((left, right) => left.start - right.start),
  };
};

const dedupeReferences = (
  references: readonly ExtractedReference[],
): readonly ResolvedStudyKeepFavoriteReference[] => {
  const seen = new Set<string>();
  const result: ResolvedStudyKeepFavoriteReference[] = [];

  for (const reference of references) {
    if (seen.has(reference.canonicalText)) {
      continue;
    }

    seen.add(reference.canonicalText);
    result.push({
      sourceText: reference.sourceText,
      normalizedText: reference.normalizedText,
      canonicalText: reference.canonicalText,
      reference: reference.reference,
    });
  }

  return Object.freeze(result);
};

const selectFavoritableReferences = (
  section: StudySection,
): StudyKeepFavoriteResolutionFailure |
Readonly<{
  references: readonly ResolvedStudyKeepFavoriteReference[];
}> => {
  const sectionText = getSectionText(section);
  const fullReferences = extractReferences(sectionText);

  const lower = sectionText.toLocaleLowerCase("pt-BR");
  const markerIndex = lower.lastIndexOf("favoritos");

  if (markerIndex >= 0) {
    const directiveText = sectionText.slice(markerIndex);
    const explicitReferences =
      extractReferences(directiveText);

    if (explicitReferences.length > 0) {
      const resolvedDirective =
        resolveDirectiveContextShorthand(
          directiveText,
          explicitReferences,
        );

      if ("ok" in resolvedDirective) {
        return resolvedDirective;
      }

      const references = dedupeReferences(
        resolvedDirective.references,
      );

      if (references.length === 0) {
        return {
          ok: false,
          code: "KEEP_NOT_FAVORITABLE",
        };
      }

      return { references };
    }
  }

  const references = dedupeReferences(fullReferences);

  if (references.length === 0) {
    return {
      ok: false,
      code: "KEEP_NOT_FAVORITABLE",
    };
  }

  return { references };
};

export const resolveStudyKeepFavoriteReferences = (
  studyId: string,
): StudyKeepFavoriteResolution => {
  const keepSections = getRuntimeStudySections(
    studyId,
  ).filter((section) => section.type === "KEEP");

  if (keepSections.length === 0) {
    return {
      ok: false,
      code: "KEEP_NOT_FOUND",
    };
  }

  if (keepSections.length !== 1) {
    return {
      ok: false,
      code: "KEEP_AMBIGUOUS",
    };
  }

  const section = keepSections[0];

  if (!section) {
    return {
      ok: false,
      code: "KEEP_NOT_FOUND",
    };
  }

  const selected =
    selectFavoritableReferences(section);

  if ("ok" in selected) {
    return selected;
  }

  return {
    ok: true,
    studyId,
    sectionId: section.id,
    references: selected.references,
  };
};
