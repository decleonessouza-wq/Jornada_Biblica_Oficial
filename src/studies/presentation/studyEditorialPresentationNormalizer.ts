import type { StudyContentBlock } from "../../domain/studies/study";
import type { ResolvedStudyBibleLink } from "../runtime/studyBibleReferenceResolver";

export type StudyObjectiveDisplay = Readonly<{
  intro: string;
  items: readonly string[];
}>;

export type StudyDisplayBlock = Readonly<{
  key: string;
  block: StudyContentBlock;
  blockIndex: number;
  bibleLinks: readonly ResolvedStudyBibleLink[];
}>;

type StudyTextEdit = Readonly<{
  start: number;
  end: number;
  replacement: string;
}>;

type NormalizedStudyText = Readonly<{
  text: string;
  boundaryMap: readonly number[];
}>;

type BulletSlice = Readonly<{
  start: number;
  end: number;
  text: string;
}>;

type DeterministicBulletLayout = Readonly<{
  intro: BulletSlice | null;
  items: readonly BulletSlice[];
}>;

const LOWERCASE_START = /^[a-záàâãéêíóôõúç]/u;
const NUMBERED_TEXT = /(?:^|\s)\d{1,2}[.)]\s+[A-Za-zÁÀÂÃÉÊÍÓÔÕÚÇáàâãéêíóôõúç]/u;
const TERMINAL_PUNCTUATION = /[.!?…:]$/u;
const NONTERMINAL_PUNCTUATION = /[,;]$/u;

const STUDY_FUNCTION_WORDS = new Set([
  "a",
  "ao",
  "aos",
  "as",
  "com",
  "da",
  "das",
  "de",
  "do",
  "dos",
  "e",
  "em",
  "na",
  "nas",
  "no",
  "nos",
  "o",
  "os",
  "para",
  "pela",
  "pelas",
  "pelo",
  "pelos",
  "por",
  "que",
  "se",
  "sem",
  "um",
  "uma",
  "uns",
  "umas",
]);

const stripTerminalClosers = (text: string): string =>
  text.trim().replace(/[”"’')\]}]+$/u, "").trim();

const endsSentenceOrColon = (text: string): boolean =>
  TERMINAL_PUNCTUATION.test(stripTerminalClosers(text));

const endsNonterminalPunctuation = (text: string): boolean =>
  NONTERMINAL_PUNCTUATION.test(stripTerminalClosers(text));

const beginsLowercase = (text: string): boolean =>
  LOWERCASE_START.test(text.trim());

const finalWord = (text: string): string => {
  const match = stripTerminalClosers(text)
    .toLocaleLowerCase("pt-BR")
    .match(/([a-záàâãéêíóôõúç]+)$/u);

  return match?.[1] ?? "";
};

const endsWithFunctionWord = (text: string): boolean =>
  STUDY_FUNCTION_WORDS.has(finalWord(text));

const hasBlankLine = (text: string): boolean =>
  /\n[ \t]*\n/u.test(text.replace(/\r\n/g, "\n"));

const hasInlineNumbering = (text: string): boolean =>
  NUMBERED_TEXT.test(text);

const looksHeadingLike = (text: string): boolean => {
  const value = text.trim();

  if (value.length < 3 || value.length > 90) {
    return false;
  }

  if (endsSentenceOrColon(value) || /[,;]$/u.test(value)) {
    return false;
  }

  if (value.includes("•") || hasInlineNumbering(value)) {
    return false;
  }

  const words = value.split(/\s+/u);
  return words.length <= 12 && /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ0-9“"]/u.test(value);
};

const shouldJoinSoftLineBreak = (
  left: string,
  right: string,
): boolean => {
  const leftValue = left.trim();
  const rightValue = right.trim();

  if (leftValue === "" || rightValue === "") {
    return false;
  }

  if (
    /^•\s/u.test(rightValue) ||
    /^\d{1,2}[.)]\s+/u.test(rightValue)
  ) {
    return false;
  }

  if (endsNonterminalPunctuation(leftValue)) {
    return true;
  }

  if (!endsSentenceOrColon(leftValue) && beginsLowercase(rightValue)) {
    return true;
  }

  return !endsSentenceOrColon(leftValue) && endsWithFunctionWord(leftValue);
};

const applyTextEdits = (
  text: string,
  edits: readonly StudyTextEdit[],
): NormalizedStudyText => {
  if (edits.length === 0) {
    return {
      text,
      boundaryMap: Array.from(
        { length: text.length + 1 },
        (_, index) => index,
      ),
    };
  }

  const ordered = [...edits].sort((left, right) => left.start - right.start);
  const boundaryMap: number[] = new Array(text.length + 1).fill(0);
  const parts: string[] = [];
  let sourceCursor = 0;
  let outputCursor = 0;

  boundaryMap[0] = 0;

  for (const edit of ordered) {
    if (
      edit.start < sourceCursor ||
      edit.start < 0 ||
      edit.end > text.length ||
      edit.start >= edit.end
    ) {
      return {
        text,
        boundaryMap: Array.from(
          { length: text.length + 1 },
          (_, index) => index,
        ),
      };
    }

    const unchanged = text.slice(sourceCursor, edit.start);
    parts.push(unchanged);

    for (let index = sourceCursor; index <= edit.start; index += 1) {
      boundaryMap[index] = outputCursor + (index - sourceCursor);
    }

    outputCursor += unchanged.length;
    boundaryMap[edit.start] = outputCursor;

    parts.push(edit.replacement);

    for (let index = edit.start + 1; index < edit.end; index += 1) {
      boundaryMap[index] = outputCursor;
    }

    outputCursor += edit.replacement.length;
    boundaryMap[edit.end] = outputCursor;
    sourceCursor = edit.end;
  }

  const tail = text.slice(sourceCursor);
  parts.push(tail);

  for (let index = sourceCursor; index <= text.length; index += 1) {
    boundaryMap[index] = outputCursor + (index - sourceCursor);
  }

  return {
    text: parts.join(""),
    boundaryMap,
  };
};

const normalizeDeterministicStudyTextWithMap = (
  text: string,
  formattingEnabled: boolean,
): NormalizedStudyText => {
  if (!formattingEnabled || !/\r?\n/u.test(text) || hasBlankLine(text)) {
    return {
      text,
      boundaryMap: Array.from(
        { length: text.length + 1 },
        (_, index) => index,
      ),
    };
  }

  const edits: StudyTextEdit[] = [];
  const newlinePattern = /\r\n|\n/gu;

  for (const match of text.matchAll(newlinePattern)) {
    const start = match.index;
    const end = start + match[0].length;
    const previousBreak = text.lastIndexOf("\n", start - 1);
    const nextBreak = text.indexOf("\n", end);
    const left = text.slice(previousBreak + 1, start);
    const right = text.slice(end, nextBreak === -1 ? text.length : nextBreak);

    if (shouldJoinSoftLineBreak(left, right)) {
      edits.push({
        start,
        end,
        replacement: " ",
      });
    }
  }

  return applyTextEdits(text, edits);
};

export const normalizeDeterministicStudyTextForDisplay = (
  text: string,
  formattingEnabled = true,
): string =>
  normalizeDeterministicStudyTextWithMap(text, formattingEnabled).text;

export const splitStudyObjectiveForDisplay = (
  objective: string,
  formattingEnabled = true,
): StudyObjectiveDisplay => {
  if (!formattingEnabled || !objective.includes("•")) {
    return {
      intro: objective,
      items: [],
    };
  }

  const parts = objective.split("•");
  const intro = (parts.shift() ?? "").trim();
  const items = parts.map((item) => item.trim()).filter((item) => item !== "");

  if (items.length === 0) {
    return {
      intro: objective,
      items: [],
    };
  }

  return {
    intro,
    items,
  };
};

export const shouldMergeDeterministicStudyParagraphsForDisplay = (
  left: string,
  right: string,
  formattingEnabled = true,
): boolean => {
  if (!formattingEnabled) {
    return false;
  }

  if (
    left.includes("•") ||
    right.includes("•") ||
    hasBlankLine(left) ||
    hasBlankLine(right) ||
    hasInlineNumbering(left) ||
    hasInlineNumbering(right)
  ) {
    return false;
  }

  const leftValue = normalizeDeterministicStudyTextForDisplay(left).trim();
  const rightValue = normalizeDeterministicStudyTextForDisplay(right).trim();

  if (leftValue === "" || rightValue === "") {
    return false;
  }

  if (endsNonterminalPunctuation(leftValue)) {
    return true;
  }

  if (!endsSentenceOrColon(leftValue) && beginsLowercase(rightValue)) {
    return true;
  }

  if (looksHeadingLike(leftValue) || looksHeadingLike(rightValue)) {
    return false;
  }

  return false;
};

const remapStudyBibleLinks = (
  links: readonly ResolvedStudyBibleLink[],
  boundaryMap: readonly number[],
): readonly ResolvedStudyBibleLink[] =>
  links.map((link) => ({
    ...link,
    sourceStart: boundaryMap[link.sourceStart] ?? link.sourceStart,
    sourceEnd: boundaryMap[link.sourceEnd] ?? link.sourceEnd,
  }));

const trimRange = (
  text: string,
  start: number,
  end: number,
): BulletSlice | null => {
  let nextStart = start;
  let nextEnd = end;

  while (nextStart < nextEnd && /\s/u.test(text[nextStart] ?? "")) {
    nextStart += 1;
  }

  while (nextEnd > nextStart && /\s/u.test(text[nextEnd - 1] ?? "")) {
    nextEnd -= 1;
  }

  if (nextStart >= nextEnd) {
    return null;
  }

  return {
    start: nextStart,
    end: nextEnd,
    text: text.slice(nextStart, nextEnd),
  };
};

const parseDeterministicBulletLayout = (
  text: string,
): DeterministicBulletLayout | null => {
  if (
    !text.includes("•") ||
    hasBlankLine(text) ||
    hasInlineNumbering(text)
  ) {
    return null;
  }

  const matches = [...text.matchAll(/•\s*/gu)];

  if (matches.length < 2) {
    return null;
  }

  for (const match of matches) {
    const markerIndex = match.index;
    const before = markerIndex > 0 ? text[markerIndex - 1] : "";

    if (markerIndex > 0 && !/\s/u.test(before)) {
      return null;
    }
  }

  const firstMarker = matches[0].index;
  const intro = trimRange(text, 0, firstMarker);

  if (intro && !/:$/u.test(stripTerminalClosers(intro.text))) {
    return null;
  }

  const items: BulletSlice[] = [];

  matches.forEach((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length;
    const item = trimRange(text, start, end);

    if (item) {
      items.push(item);
    }
  });

  if (items.length !== matches.length) {
    return null;
  }

  return {
    intro,
    items,
  };
};

const linksInsideRange = (
  links: readonly ResolvedStudyBibleLink[],
  range: BulletSlice,
): readonly ResolvedStudyBibleLink[] =>
  links
    .filter(
      (link) =>
        link.sourceStart >= range.start &&
        link.sourceEnd <= range.end,
    )
    .map((link) => ({
      ...link,
      sourceStart: link.sourceStart - range.start,
      sourceEnd: link.sourceEnd - range.start,
    }));

const allLinksFitBulletLayout = (
  links: readonly ResolvedStudyBibleLink[],
  layout: DeterministicBulletLayout,
): boolean =>
  links.every((link) => {
    if (
      layout.intro &&
      link.sourceStart >= layout.intro.start &&
      link.sourceEnd <= layout.intro.end
    ) {
      return true;
    }

    return layout.items.some(
      (item) =>
        link.sourceStart >= item.start &&
        link.sourceEnd <= item.end,
    );
  });

const toBulletDisplayBlocks = (
  layout: DeterministicBulletLayout,
  links: readonly ResolvedStudyBibleLink[],
  blockIndex: number,
): readonly StudyDisplayBlock[] => {
  const display: StudyDisplayBlock[] = [];

  if (layout.intro) {
    display.push({
      key: `block-${blockIndex}-bullet-intro`,
      block: {
        type: "PARAGRAPH",
        text: layout.intro.text,
      },
      blockIndex,
      bibleLinks: linksInsideRange(links, layout.intro).map((link) => ({
        ...link,
        itemIndex: null,
        textSource: "TEXT",
      })),
    });
  }

  const items = layout.items.map((item) => item.text);
  const listLinks: readonly ResolvedStudyBibleLink[] = layout.items.flatMap(
    (item, itemIndex) =>
      linksInsideRange(links, item).map(
        (link): ResolvedStudyBibleLink => ({
          ...link,
          itemIndex,
          textSource: "TEXT",
        }),
      ),
  );

  display.push({
    key: `block-${blockIndex}-bullet-list`,
    block: {
      type: "BULLET_LIST",
      items,
    },
    blockIndex,
    bibleLinks: listLinks,
  });

  return display;
};

export const buildStudyDisplayBlocks = ({
  blocks,
  bibleLinks,
  formattingEnabled,
}: Readonly<{
  blocks: readonly StudyContentBlock[];
  bibleLinks: readonly ResolvedStudyBibleLink[];
  formattingEnabled: boolean;
}>): readonly StudyDisplayBlock[] => {
  if (!formattingEnabled) {
    return blocks.map((block, blockIndex) => ({
      key: `block-${blockIndex}`,
      block,
      blockIndex,
      bibleLinks: bibleLinks.filter((link) => link.blockIndex === blockIndex),
    }));
  }

  const display: StudyDisplayBlock[] = [];
  let blockIndex = 0;

  while (blockIndex < blocks.length) {
    const block = blocks[blockIndex];
    const blockLinks = bibleLinks.filter((link) => link.blockIndex === blockIndex);

    if (block.type !== "PARAGRAPH") {
      display.push({
        key: `block-${blockIndex}`,
        block,
        blockIndex,
        bibleLinks: blockLinks,
      });
      blockIndex += 1;
      continue;
    }

    const normalized = normalizeDeterministicStudyTextWithMap(
      block.text,
      true,
    );
    let mergedText = normalized.text;
    let mergedLinks = remapStudyBibleLinks(blockLinks, normalized.boundaryMap);
    const firstBlockIndex = blockIndex;
    let lastBlockIndex = blockIndex;

    while (lastBlockIndex + 1 < blocks.length) {
      const previousBlock = blocks[lastBlockIndex];
      const nextBlock = blocks[lastBlockIndex + 1];

      if (
        previousBlock.type !== "PARAGRAPH" ||
        nextBlock.type !== "PARAGRAPH" ||
        !shouldMergeDeterministicStudyParagraphsForDisplay(
          previousBlock.text,
          nextBlock.text,
          true,
        )
      ) {
        break;
      }

      const nextLinks = bibleLinks.filter(
        (link) => link.blockIndex === lastBlockIndex + 1,
      );
      const normalizedNext = normalizeDeterministicStudyTextWithMap(
        nextBlock.text,
        true,
      );
      const offset = mergedText.length + 1;
      const adjustedNextLinks = remapStudyBibleLinks(
        nextLinks,
        normalizedNext.boundaryMap,
      ).map((link) => ({
        ...link,
        sourceStart: link.sourceStart + offset,
        sourceEnd: link.sourceEnd + offset,
        itemIndex: null,
        textSource: "TEXT" as const,
      }));

      mergedText = `${mergedText.trimEnd()} ${normalizedNext.text.trimStart()}`;
      mergedLinks = [...mergedLinks, ...adjustedNextLinks];
      lastBlockIndex += 1;
    }

    if (firstBlockIndex === lastBlockIndex) {
      const bulletLayout = parseDeterministicBulletLayout(mergedText);

      if (
        bulletLayout &&
        allLinksFitBulletLayout(mergedLinks, bulletLayout)
      ) {
        display.push(
          ...toBulletDisplayBlocks(
            bulletLayout,
            mergedLinks,
            firstBlockIndex,
          ),
        );
        blockIndex += 1;
        continue;
      }
    }

    display.push({
      key:
        firstBlockIndex === lastBlockIndex
          ? `block-${firstBlockIndex}`
          : `block-${firstBlockIndex}-${lastBlockIndex}-merged`,
      block: {
        type: "PARAGRAPH",
        text: mergedText,
      },
      blockIndex: firstBlockIndex,
      bibleLinks: mergedLinks.map((link) => ({
        ...link,
        itemIndex: null,
        textSource: "TEXT" as const,
      })),
    });

    blockIndex = lastBlockIndex + 1;
  }

  return display;
};
