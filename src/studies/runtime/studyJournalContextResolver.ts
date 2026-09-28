import type {
  StudyContentBlock,
  StudySectionId,
} from "../../domain/studies/study";
import {
  getRuntimeStudyById,
  getRuntimeStudySections,
} from "./studyRuntimeCatalog";

export type StudyJournalContextResolutionErrorCode =
  | "STUDY_NOT_FOUND"
  | "STUDY_TITLE_INVALID"
  | "STUDY_TRACK_INVALID"
  | "JOURNAL_PROMPT_NOT_FOUND"
  | "JOURNAL_PROMPT_AMBIGUOUS"
  | "JOURNAL_PROMPT_EMPTY";

export type ResolvedStudyJournalContext = Readonly<{
  ok: true;
  studyId: string;
  trackId: string;
  sectionId: StudySectionId;
  sourceTitleSnapshot: string;
  promptSnapshot: string;
}>;

export type StudyJournalContextResolutionFailure = Readonly<{
  ok: false;
  code: StudyJournalContextResolutionErrorCode;
}>;

export type StudyJournalContextResolution =
  | ResolvedStudyJournalContext
  | StudyJournalContextResolutionFailure;

const DECORATIVE_MARKER_PATTERN =
  /^[\u2022\uF0B7\u25E6\u25AA\u25AB\u2023\u00B7*\-–—]+$/u;

const normalizeFragment = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

const getBlockFragments = (
  block: StudyContentBlock,
): readonly string[] => {
  if ("items" in block && Array.isArray(block.items)) {
    return block.items;
  }

  const fragments: string[] = [];

  if (
    "title" in block &&
    typeof block.title === "string" &&
    block.title.trim().length > 0
  ) {
    fragments.push(block.title);
  }

  if (
    "text" in block &&
    typeof block.text === "string" &&
    block.text.trim().length > 0
  ) {
    fragments.push(block.text);
  }

  return fragments;
};

const isDecorativeMarker = (value: string): boolean =>
  DECORATIVE_MARKER_PATTERN.test(value);

export const buildStudyJournalPromptSnapshot = (
  blocks: readonly StudyContentBlock[],
): string | null => {
  const fragments = blocks
    .flatMap((block) => getBlockFragments(block))
    .map((value) => normalizeFragment(value))
    .filter(
      (value) =>
        value.length > 0 &&
        !isDecorativeMarker(value),
    );

  if (fragments.length === 0) {
    return null;
  }

  return fragments.join(" ");
};

export const resolveRuntimeStudyJournalContext = (
  studyId: string,
): StudyJournalContextResolution => {
  const entry = getRuntimeStudyById(studyId);

  if (!entry) {
    return {
      ok: false,
      code: "STUDY_NOT_FOUND",
    };
  }

  const sourceTitleSnapshot = entry.content.title;

  if (
    typeof sourceTitleSnapshot !== "string" ||
    sourceTitleSnapshot.trim().length === 0
  ) {
    return {
      ok: false,
      code: "STUDY_TITLE_INVALID",
    };
  }

  const trackId = entry.content.trackId;

  if (
    typeof trackId !== "string" ||
    trackId.trim().length === 0
  ) {
    return {
      ok: false,
      code: "STUDY_TRACK_INVALID",
    };
  }

  const promptSections = getRuntimeStudySections(
    entry.content.id,
  ).filter(
    (section) => section.type === "JOURNAL_PROMPT",
  );

  if (promptSections.length === 0) {
    return {
      ok: false,
      code: "JOURNAL_PROMPT_NOT_FOUND",
    };
  }

  if (promptSections.length !== 1) {
    return {
      ok: false,
      code: "JOURNAL_PROMPT_AMBIGUOUS",
    };
  }

  const section = promptSections[0];

  if (!section) {
    return {
      ok: false,
      code: "JOURNAL_PROMPT_NOT_FOUND",
    };
  }

  const promptSnapshot =
    buildStudyJournalPromptSnapshot(section.blocks);

  if (promptSnapshot === null) {
    return {
      ok: false,
      code: "JOURNAL_PROMPT_EMPTY",
    };
  }

  return {
    ok: true,
    studyId: entry.content.id,
    trackId,
    sectionId: section.id,
    sourceTitleSnapshot,
    promptSnapshot,
  };
};
