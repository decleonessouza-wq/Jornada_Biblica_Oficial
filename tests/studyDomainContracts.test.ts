import type { PersonalUtcTimestamp } from "../src/domain/personal/personalTime";
import {
  STUDY_AUDIENCE_LEVELS,
  STUDY_CONTENT_BLOCK_TYPES,
  STUDY_CONTENT_PROFILES,
  STUDY_PEDAGOGICAL_SECTION_GROUPS,
  STUDY_SECTION_TYPES,
  STUDY_TRACK_NATURES,
  type Study,
  type StudyId,
  type StudyReference,
  type StudyReferenceId,
  type StudySection,
  type StudySectionId,
  type StudySlug,
  type StudyTrack,
  type StudyTrackId,
  type StudyTrackSlug,
} from "../src/domain/studies/study";
import {
  STUDY_STATES,
  type StudyProgress,
} from "../src/domain/studies/studyProgress";

describe("Study domain contracts", () => {
  it("locks the exact official track natures without duplicates", () => {
    expect([...STUDY_TRACK_NATURES]).toEqual([
      "FORMATION",
      "CHRISTIAN_LIFE",
      "DEVOTIONAL",
      "COLLABORATIVE",
    ]);
    expect(new Set(STUDY_TRACK_NATURES).size).toBe(
      STUDY_TRACK_NATURES.length,
    );
  });

  it("locks the exact official audience levels without duplicates", () => {
    expect([...STUDY_AUDIENCE_LEVELS]).toEqual([
      "BEGINNER",
      "INTERMEDIATE",
    ]);
    expect(new Set(STUDY_AUDIENCE_LEVELS).size).toBe(
      STUDY_AUDIENCE_LEVELS.length,
    );
  });

  it("locks the two technical content profiles discovered from real editorial sources", () => {
    expect([...STUDY_CONTENT_PROFILES]).toEqual([
      "TRACK_1_ORIGINAL_V1",
      "JOURNEY_20_30_V1",
    ]);
    expect(new Set(STUDY_CONTENT_PROFILES).size).toBe(
      STUDY_CONTENT_PROFILES.length,
    );
  });

  it("locks the structured content block vocabulary", () => {
    expect([...STUDY_CONTENT_BLOCK_TYPES]).toEqual([
      "PARAGRAPH",
      "SUBHEADING",
      "BULLET_LIST",
      "NUMBERED_LIST",
      "CALLOUT",
    ]);
    expect(new Set(STUDY_CONTENT_BLOCK_TYPES).size).toBe(
      STUDY_CONTENT_BLOCK_TYPES.length,
    );
  });

  it("keeps the Modelo Jornada semantics structured as section types", () => {
    expect([...STUDY_SECTION_TYPES]).toEqual([
      "GOLDEN_TEXT",
      "PRACTICAL_TRUTH",
      "BIBLE_READING",
      "BEFORE_UNDERSTANDING",
      "READ",
      "OBSERVE",
      "UNDERSTAND",
      "CONNECT",
      "INTERPRETATION_CAUTION",
      "REFLECT",
      "APPLY",
      "JOURNEY_TAKEAWAY",
      "PRACTICE_TODAY",
      "REFLECTION_QUESTIONS",
      "JOURNAL_PROMPT",
      "PRAYER",
      "KEEP",
      "GROUP_MODE",
      "CONTINUE_JOURNEY",
      "DEEPEN",
      "REFERENCES",
      "EDITORIAL_NOTE",
    ]);
    expect(new Set(STUDY_SECTION_TYPES).size).toBe(
      STUDY_SECTION_TYPES.length,
    );

    expect(STUDY_SECTION_TYPES).not.toContain("THEME");
    expect(STUDY_SECTION_TYPES).not.toContain("CENTRAL_QUESTION");
    expect(STUDY_SECTION_TYPES).not.toContain("OBJECTIVE");
  });

  it("locks the three pedagogical groupings without flattening their subblocks", () => {
    expect(STUDY_PEDAGOGICAL_SECTION_GROUPS).toEqual({
      BIBLE_SHOWS: ["READ", "OBSERVE"],
      NEED_TO_UNDERSTAND: [
        "UNDERSTAND",
        "CONNECT",
        "INTERPRETATION_CAUTION",
      ],
      TRUTH_CHANGES: ["REFLECT", "APPLY"],
    });
  });

  it("relates track, study, section and reference with stable typed identities", () => {
    const trackId = "track-01" as StudyTrackId;
    const studyId = "track-01-study-01" as StudyId;
    const sectionId =
      "track-01-study-01-golden-text" as StudySectionId;

    const track: StudyTrack = {
      id: trackId,
      slug: "o-plano-eterno-de-deus" as StudyTrackSlug,
      title: "O Plano Eterno de Deus",
      description: "Track description used only by this contract test.",
      type: "FORMATION",
      contentProfile: "TRACK_1_ORIGINAL_V1",
      cardImage: "track-01-card",
      heroImage: "track-01-hero",
      order: 1,
      published: true,
    };

    const study: Study = {
      id: studyId,
      trackId,
      number: 1,
      slug: "study-contract" as StudySlug,
      title: "Study contract",
      summary: "Summary used only by this contract test.",
      questionCentral: "Question used only by this contract test?",
      objective: "Objective used only by this contract test.",
      estimatedMinutes: {
        minimum: 20,
        maximum: 30,
      },
      heroImage: "study-contract-hero",
      nextStudyId: null,
      audienceLevel: "BEGINNER",
      tags: ["contract"],
      published: true,
    };

    const section: StudySection = {
      id: sectionId,
      studyId,
      type: "GOLDEN_TEXT",
      title: "Golden text",
      iconKey: "texto-aureo",
      blocks: [
        {
          type: "PARAGRAPH",
          text: "Structured section content used only by this contract test.",
        },
        {
          type: "CALLOUT",
          title: "Contract callout",
          text: "Callout content remains semantically distinct.",
        },
      ],
      order: 1,
      optional: false,
      collapsible: true,
    };

    const actionType: string = "contract-test-action";

    const reference: StudyReference = {
      id: "reference-1" as StudyReferenceId,
      studyId,
      sectionId,
      label: "Contract reference",
      reference: "Reference used only by this contract test.",
      actionType,
    };

    expect(study.trackId).toBe(track.id);
    expect(track.contentProfile).toBe("TRACK_1_ORIGINAL_V1");
    expect(section.studyId).toBe(study.id);
    expect(section.blocks.map((block) => block.type)).toEqual([
      "PARAGRAPH",
      "CALLOUT",
    ]);
    expect(reference.studyId).toBe(study.id);
    expect(reference.sectionId).toBe(section.id);
    expect(study.estimatedMinutes).toEqual({
      minimum: 20,
      maximum: 30,
    });
  });

  it("locks the exact study states without duplicates", () => {
    expect([...STUDY_STATES]).toEqual([
      "NOT_STARTED",
      "IN_PROGRESS",
      "COMPLETED",
    ]);
    expect(new Set(STUDY_STATES).size).toBe(STUDY_STATES.length);
  });

  it("keeps reading progress independent from explicit completion state", () => {
    const progress: StudyProgress = {
      studyId: "track-01-study-01" as StudyId,
      state: "IN_PROGRESS",
      lastSectionKey:
        "track-01-study-01-continue" as StudySectionId,
      readingProgress: 100,
      startedAt:
        "2026-09-15T12:00:00.000Z" as PersonalUtcTimestamp,
      lastOpenedAt:
        "2026-09-15T12:30:00.000Z" as PersonalUtcTimestamp,
      completedAt: null,
    };

    expect(progress.readingProgress).toBe(100);
    expect(progress.state).toBe("IN_PROGRESS");
    expect(progress.completedAt).toBeNull();
  });
});
