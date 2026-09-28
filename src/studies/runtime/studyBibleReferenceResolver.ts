import type { BibleReference } from "../../domain/bible/bibleReference";
import { formatBibleReference } from "../../domain/bible/bibleReferenceFormatter";
import {
  parseBibleReference,
  type BibleReferenceParseError,
} from "../../domain/bible/bibleReferenceParser";
import type {
  StudyContentBlock,
  StudySection,
  StudySectionId,
  StudySectionType,
} from "../../domain/studies/study";
import { getRuntimeStudySections } from "./studyRuntimeCatalog";

export type StudyBibleReadingResolutionErrorCode =
  | "BIBLE_READING_NOT_FOUND"
  | "BIBLE_READING_AMBIGUOUS"
  | "PRIMARY_REFERENCE_NOT_FOUND"
  | "PRIMARY_REFERENCE_AMBIGUOUS"
  | "REFERENCE_PARSE_FAILED";

export type ResolvedStudyBibleReading = Readonly<{
  ok: true;
  studyId: string;
  sectionId: StudySectionId;
  sourceText: string;
  normalizedText: string;
  reference: BibleReference;
}>;

export type StudyBibleReadingResolutionFailure = Readonly<{
  ok: false;
  code: StudyBibleReadingResolutionErrorCode;
  parserError?: BibleReferenceParseError;
}>;

export type StudyBibleReadingResolution =
  | ResolvedStudyBibleReading
  | StudyBibleReadingResolutionFailure;

export type StudyBibleLinkTextSource = "TEXT" | "TITLE";

export type ResolvedStudyBibleLink = Readonly<{
  studyId: string;
  sectionId: StudySectionId;
  sectionType: StudySectionType;
  blockIndex: number;
  itemIndex: number | null;
  textSource: StudyBibleLinkTextSource;
  sourceText: string;
  sourceStart: number;
  sourceEnd: number;
  normalizedText: string;
  canonicalText: string;
  reference: BibleReference;
}>;

type StudyBibleLinkLeaf = Readonly<{
  blockIndex: number;
  itemIndex: number | null;
  textSource: StudyBibleLinkTextSource;
  text: string;
}>;

type StudyBibleLinkTarget = Readonly<{
  canonicalText: string;
  reference: BibleReference;
}>;

type StudyBibleLinkCandidate = Readonly<{
  start: number;
  end: number;
  sourceText: string;
  targets: readonly StudyBibleLinkTarget[];
  tokenLength: number;
}>;

type ParsedCandidate = Readonly<{
  sourceText: string;
  normalizedText: string;
  reference: BibleReference;
}>;

const LABELED_PRIMARY_PATTERN =
  /^\s*(?:Leitura principal|Leia primeiro)\s*:\s*(.+)$/i;

const CONNECTION_LABEL_PATTERN =
  /\s+(?:Depois,\s*conecte com|Leituras?\s+de conexão|Conexões?)\s*:/i;

const SAME_CHAPTER_COMMA_SHORTHAND_PATTERN =
  /^(.+?)\s+(\d+):(\d+(?:-\d+)?)(\s*,\s*\d+(?:-\d+)?)+$/;

const SAME_CHAPTER_COMMA_PART_PATTERN =
  /\s*,\s*(\d+(?:-\d+)?)/g;

const cleanCandidateText = (value: string): string =>
  value.trim().replace(/\.+$/, "").trim();

const normalizeKnownBookLabelVariant = (
  text: string,
): string =>
  text.replace(/^Salmo(?=\s+\d)/i, "Salmos");

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

  return [block.text];
};

const getSectionTexts = (
  section: StudySection,
): readonly string[] =>
  section.blocks.flatMap((block) => getBlockTexts(block));

const extractLabeledPrimaryText = (
  text: string,
): string | null => {
  const match = LABELED_PRIMARY_PATTERN.exec(text);

  if (!match) {
    return null;
  }

  const labeledValue = match[1] ?? "";
  const primaryPart =
    labeledValue.split(CONNECTION_LABEL_PATTERN)[0] ?? "";

  const cleaned = cleanCandidateText(primaryPart);
  return cleaned.length > 0 ? cleaned : null;
};

const normalizeSameChapterCommaShorthand = (
  text: string,
): string | null => {
  const match =
    SAME_CHAPTER_COMMA_SHORTHAND_PATTERN.exec(text);

  if (!match) {
    return null;
  }

  const bookLabel = (match[1] ?? "").trim();
  const chapter = match[2] ?? "";
  const firstLocator = match[3] ?? "";
  const remainder = match[4] ?? "";

  if (!bookLabel || !chapter || !firstLocator || !remainder) {
    return null;
  }

  const locators = [firstLocator];

  for (
    const part of remainder.matchAll(
      SAME_CHAPTER_COMMA_PART_PATTERN,
    )
  ) {
    const locator = part[1];

    if (!locator) {
      return null;
    }

    locators.push(locator);
  }

  if (locators.length < 2) {
    return null;
  }

  return locators
    .map(
      (locator) =>
        `${bookLabel} ${chapter}:${locator}`,
    )
    .join("; ");
};

const parseCandidate = (
  sourceText: string,
):
  | Readonly<{ ok: true; value: ParsedCandidate }>
  | Readonly<{
      ok: false;
      parserError: BibleReferenceParseError;
    }> => {
  const cleaned = cleanCandidateText(sourceText);
  const parserInput =
    normalizeKnownBookLabelVariant(cleaned);
  const direct = parseBibleReference(parserInput);

  if (direct.ok) {
    return {
      ok: true,
      value: {
        sourceText: cleaned,
        normalizedText: formatBibleReference(direct.value),
        reference: direct.value,
      },
    };
  }

  const normalized =
    normalizeSameChapterCommaShorthand(parserInput);

  if (!normalized) {
    return {
      ok: false,
      parserError: direct.error,
    };
  }

  const reparsed = parseBibleReference(normalized);

  if (!reparsed.ok) {
    return {
      ok: false,
      parserError: reparsed.error,
    };
  }

  return {
    ok: true,
    value: {
      sourceText: cleaned,
      normalizedText: formatBibleReference(reparsed.value),
      reference: reparsed.value,
    },
  };
};

const distinctCandidates = (
  candidates: readonly ParsedCandidate[],
): readonly ParsedCandidate[] => {
  const byCanonicalText = new Map<string, ParsedCandidate>();

  for (const candidate of candidates) {
    if (!byCanonicalText.has(candidate.normalizedText)) {
      byCanonicalText.set(
        candidate.normalizedText,
        candidate,
      );
    }
  }

  return [...byCanonicalText.values()];
};

const STUDY_BIBLE_LINK_WINDOW_MAX_TOKENS = 8;

const normalizeStudyBibleLinkSyntax = (
  value: string,
): string =>
  value
    .replace(/[\u2013\u2014\u2212]/g, "-")
    .replace(/^[\(\[\{"'\u201c\u2018]+/u, "")
    .replace(/[\)\]\}",'.;!?\u201d\u2019]+$/u, "")
    .trim()
    .replace(/^Salmo(?=\s+\d)/i, "Salmos");

const getStudyBibleLinkTokenSpans = (
  text: string,
): readonly Readonly<{ start: number; end: number }>[] => {
  const spans: Readonly<{ start: number; end: number }>[] = [];
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

const getStudyBibleLinkLeaves = (
  block: StudyContentBlock,
  blockIndex: number,
): readonly StudyBibleLinkLeaf[] => {
  if (
    block.type === "PARAGRAPH" ||
    block.type === "SUBHEADING"
  ) {
    return [
      {
        blockIndex,
        itemIndex: null,
        textSource: "TEXT",
        text: block.text,
      },
    ];
  }

  if (
    block.type === "BULLET_LIST" ||
    block.type === "NUMBERED_LIST"
  ) {
    return block.items.map((text, itemIndex) => ({
      blockIndex,
      itemIndex,
      textSource: "TEXT" as const,
      text,
    }));
  }

  return [
    ...(block.title
      ? [
          {
            blockIndex,
            itemIndex: null,
            textSource: "TITLE" as const,
            text: block.title,
          },
        ]
      : []),
    {
      blockIndex,
      itemIndex: null,
      textSource: "TEXT" as const,
      text: block.text,
    },
  ];
};

const createSinglePassageReference = (
  passage: BibleReference["passages"][number],
): BibleReference => ({
  passages: [passage],
});

const parseStudyBibleLinkCandidate = (
  sourceText: string,
  wholeLeaf: boolean,
): readonly StudyBibleLinkTarget[] | null => {
  const normalizedText =
    normalizeStudyBibleLinkSyntax(sourceText);

  if (normalizedText.length === 0) {
    return null;
  }

  if (!/\d/u.test(normalizedText) && !wholeLeaf) {
    return null;
  }

  const direct = parseBibleReference(normalizedText);
  let reference: BibleReference | null =
    direct.ok ? direct.value : null;

  if (!reference) {
    const shorthand =
      normalizeSameChapterCommaShorthand(normalizedText);

    if (!shorthand) {
      return null;
    }

    const reparsed = parseBibleReference(shorthand);

    if (!reparsed.ok) {
      return null;
    }

    reference = reparsed.value;
  }

  return reference.passages.map((passage) => {
    const singleReference =
      createSinglePassageReference(passage);

    return {
      canonicalText:
        formatBibleReference(singleReference),
      reference: singleReference,
    };
  });
};

const extractStudyBibleLinksFromLeaf = (
  leaf: StudyBibleLinkLeaf,
): readonly Omit<
  ResolvedStudyBibleLink,
  "studyId" | "sectionId" | "sectionType"
>[] => {
  const text = leaf.text;
  const tokenSpans = getStudyBibleLinkTokenSpans(text);

  if (tokenSpans.length === 0) {
    return [];
  }

  const trimmedStart = tokenSpans[0]?.start ?? 0;
  const trimmedEnd =
    tokenSpans[tokenSpans.length - 1]?.end ?? text.length;
  const candidates: StudyBibleLinkCandidate[] = [];

  for (
    let startToken = 0;
    startToken < tokenSpans.length;
    startToken += 1
  ) {
    for (
      let endToken = startToken;
      endToken < tokenSpans.length &&
      endToken <
        startToken + STUDY_BIBLE_LINK_WINDOW_MAX_TOKENS;
      endToken += 1
    ) {
      const start = tokenSpans[startToken]?.start;
      const end = tokenSpans[endToken]?.end;

      if (start === undefined || end === undefined) {
        continue;
      }

      const sourceText = text.slice(start, end);
      const wholeLeaf =
        start === trimmedStart && end === trimmedEnd;

      if (!/\d/u.test(sourceText) && !wholeLeaf) {
        continue;
      }

      const targets =
        parseStudyBibleLinkCandidate(
          sourceText,
          wholeLeaf,
        );

      if (!targets || targets.length === 0) {
        continue;
      }

      candidates.push({
        start,
        end,
        sourceText,
        targets,
        tokenLength: endToken - startToken + 1,
      });
    }
  }

  candidates.sort((left, right) => {
    if (left.start !== right.start) {
      return left.start - right.start;
    }

    if (left.targets.length !== right.targets.length) {
      return left.targets.length - right.targets.length;
    }

    if (left.tokenLength !== right.tokenLength) {
      return right.tokenLength - left.tokenLength;
    }

    return left.end - right.end;
  });

  const selectedCandidates: StudyBibleLinkCandidate[] = [];

  for (const candidate of candidates) {
    const overlaps = selectedCandidates.some(
      (existing) =>
        candidate.start < existing.end &&
        candidate.end > existing.start,
    );

    if (!overlaps) {
      selectedCandidates.push(candidate);
    }
  }

  const result: Omit<
    ResolvedStudyBibleLink,
    "studyId" | "sectionId" | "sectionType"
  >[] = [];

  const pushTarget = (
    candidate: StudyBibleLinkCandidate,
    target: StudyBibleLinkTarget,
  ) => {
    const duplicate = result.some(
      (existing) =>
        existing.canonicalText === target.canonicalText &&
        candidate.start < existing.sourceEnd &&
        candidate.end > existing.sourceStart,
    );

    if (duplicate) {
      return;
    }

    result.push({
      blockIndex: leaf.blockIndex,
      itemIndex: leaf.itemIndex,
      textSource: leaf.textSource,
      sourceText: candidate.sourceText,
      sourceStart: candidate.start,
      sourceEnd: candidate.end,
      normalizedText: target.canonicalText,
      canonicalText: target.canonicalText,
      reference: target.reference,
    });
  };

  for (const candidate of selectedCandidates) {
    for (const target of candidate.targets) {
      pushTarget(candidate, target);
    }
  }

  for (const candidate of candidates) {
    if (candidate.targets.length < 2) {
      continue;
    }

    for (const target of candidate.targets) {
      pushTarget(candidate, target);
    }
  }

  result.sort((left, right) => {
    if (left.sourceStart !== right.sourceStart) {
      return left.sourceStart - right.sourceStart;
    }

    if (left.sourceEnd !== right.sourceEnd) {
      return left.sourceEnd - right.sourceEnd;
    }

    return left.canonicalText.localeCompare(
      right.canonicalText,
      "pt-BR",
    );
  });

  return Object.freeze(result);
};

export const resolveStudyBibleLinks = (
  sections: readonly StudySection[],
): readonly ResolvedStudyBibleLink[] => {
  const result: ResolvedStudyBibleLink[] = [];

  for (const section of sections) {
    section.blocks.forEach((block, blockIndex) => {
      const leaves =
        getStudyBibleLinkLeaves(block, blockIndex);

      for (const leaf of leaves) {
        const links =
          extractStudyBibleLinksFromLeaf(leaf);

        for (const link of links) {
          result.push({
            studyId: section.studyId,
            sectionId: section.id,
            sectionType: section.type,
            ...link,
          });
        }
      }
    });
  }

  return Object.freeze(result);
};

export const resolveRuntimeStudyBibleLinks = (
  studyId: string,
): readonly ResolvedStudyBibleLink[] =>
  resolveStudyBibleLinks(
    getRuntimeStudySections(studyId),
  );

export const resolveStudyBibleReading = (
  sections: readonly StudySection[],
): StudyBibleReadingResolution => {
  const bibleReadingSections = sections.filter(
    (section) => section.type === "BIBLE_READING",
  );

  if (bibleReadingSections.length === 0) {
    return {
      ok: false,
      code: "BIBLE_READING_NOT_FOUND",
    };
  }

  if (bibleReadingSections.length !== 1) {
    return {
      ok: false,
      code: "BIBLE_READING_AMBIGUOUS",
    };
  }

  const section = bibleReadingSections[0];

  if (!section) {
    return {
      ok: false,
      code: "BIBLE_READING_NOT_FOUND",
    };
  }

  const texts = getSectionTexts(section)
    .map((text) => text.trim())
    .filter((text) => text.length > 0);

  const labeledTexts = texts
    .map((text) => extractLabeledPrimaryText(text))
    .filter(
      (text): text is string => text !== null,
    );

  if (labeledTexts.length > 0) {
    const parsed: ParsedCandidate[] = [];

    for (const text of labeledTexts) {
      const candidate = parseCandidate(text);

      if (!candidate.ok) {
        return {
          ok: false,
          code: "REFERENCE_PARSE_FAILED",
          parserError: candidate.parserError,
        };
      }

      parsed.push(candidate.value);
    }

    const unique = distinctCandidates(parsed);

    if (unique.length !== 1) {
      return {
        ok: false,
        code: "PRIMARY_REFERENCE_AMBIGUOUS",
      };
    }

    const resolved = unique[0];

    if (!resolved) {
      return {
        ok: false,
        code: "PRIMARY_REFERENCE_NOT_FOUND",
      };
    }

    return {
      ok: true,
      studyId: section.studyId,
      sectionId: section.id,
      sourceText: resolved.sourceText,
      normalizedText: resolved.normalizedText,
      reference: resolved.reference,
    };
  }

  const exactCandidates = distinctCandidates(
    texts.flatMap((text) => {
      const parsed = parseCandidate(text);
      return parsed.ok ? [parsed.value] : [];
    }),
  );

  if (exactCandidates.length === 0) {
    return {
      ok: false,
      code: "PRIMARY_REFERENCE_NOT_FOUND",
    };
  }

  if (exactCandidates.length !== 1) {
    return {
      ok: false,
      code: "PRIMARY_REFERENCE_AMBIGUOUS",
    };
  }

  const resolved = exactCandidates[0];

  if (!resolved) {
    return {
      ok: false,
      code: "PRIMARY_REFERENCE_NOT_FOUND",
    };
  }

  return {
    ok: true,
    studyId: section.studyId,
    sectionId: section.id,
    sourceText: resolved.sourceText,
    normalizedText: resolved.normalizedText,
    reference: resolved.reference,
  };
};

export const resolveRuntimeStudyBibleReading = (
  studyId: string,
): StudyBibleReadingResolution =>
  resolveStudyBibleReading(
    getRuntimeStudySections(studyId),
  );
