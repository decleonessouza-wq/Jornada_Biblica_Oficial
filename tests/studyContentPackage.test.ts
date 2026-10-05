import {
  type Study,
  type StudyContentProfile,
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
import type { StudyContentPackage } from "../src/studies/content/studyContentPackage";
import {
  JOURNEY_20_30_REQUIRED_SECTION_TYPES,
  assertValidStudyContentPackage,
  validateStudyContentPackage,
} from "../src/studies/content/studyContentValidator";
import * as a29ValidatorPolicy from "../src/studies/content/studyContentValidator";
import { track06DraftBatchPackage as a29Track06Package } from "../src/studies/content/track06DraftBatch";


function makeTrack(
  overrides: Partial<StudyTrack> = {},
): StudyTrack {
  return {
    id: "track-01" as StudyTrackId,
    slug: "track-one" as StudyTrackSlug,
    title: "Track One",
    description: "Track description.",
    type: "FORMATION",
    contentProfile: "JOURNEY_20_30_V1",
    cardImage: "track-01-card",
    heroImage: "track-01-hero",
    order: 1,
    published: true,
    ...overrides,
  };
}

function makeStudy(
  idValue: string,
  number: number,
  overrides: Partial<Study> = {},
): Study {
  return {
    id: idValue as StudyId,
    trackId: "track-01" as StudyTrackId,
    number,
    slug: `study-${number}` as StudySlug,
    title: `Study ${number}`,
    summary: `Summary ${number}.`,
    questionCentral: `Question ${number}?`,
    objective: `Objective ${number}.`,
    estimatedMinutes: {
      minimum: 20,
      maximum: 30,
    },
    heroImage: `study-${number}-hero`,
    nextStudyId: null,
    audienceLevel: "BEGINNER",
    tags: ["formation"],
    published: true,
    ...overrides,
  };
}

function sectionIdFor(
  studyId: StudyId,
  type: string,
): StudySectionId {
  return `${studyId}-${type.toLowerCase()}` as StudySectionId;
}

function makeSection(
  studyId: StudyId,
  type: StudySection["type"],
  order: number,
  overrides: Partial<StudySection> = {},
): StudySection {
  return {
    id: sectionIdFor(studyId, type),
    studyId,
    type,
    title: `Section ${type}`,
    iconKey: `icon-${type.toLowerCase()}`,
    blocks: [
      {
        type: "PARAGRAPH",
        text: `Content for ${type}.`,
      },
    ],
    order,
    optional: false,
    collapsible: true,
    ...overrides,
  };
}

function makeRequiredSections(
  studyId: StudyId,
): readonly StudySection[] {
  return JOURNEY_20_30_REQUIRED_SECTION_TYPES.map((type, index) =>
    makeSection(studyId, type, index + 1),
  );
}

function makeValidPackage(): StudyContentPackage {
  const firstStudyId = "study-01" as StudyId;
  const secondStudyId = "study-02" as StudyId;

  const firstStudy = makeStudy("study-01", 1, {
    nextStudyId: secondStudyId,
  });

  const secondStudy = makeStudy("study-02", 2, {
    slug: "study-2" as StudySlug,
  });

  const sections = [
    ...makeRequiredSections(firstStudyId),
    ...makeRequiredSections(secondStudyId),
  ];

  const reference: StudyReference = {
    id: "reference-01" as StudyReferenceId,
    studyId: firstStudyId,
    sectionId: sectionIdFor(firstStudyId, "GOLDEN_TEXT"),
    label: "Contract reference",
    reference: "Contract reference target",
    actionType: "contract-test-action",
  };

  return {
    contentVersion: "test-content-version",
    tracks: [makeTrack()],
    studies: [firstStudy, secondStudy],
    sections,
    references: [reference],
  };
}

function issueCodes(
  contentPackage: StudyContentPackage,
): readonly string[] {
  return validateStudyContentPackage(contentPackage).issues.map(
    (issue) => issue.code,
  );
}

describe("Study Content Package validation", () => {
  it("accepts a structurally valid published JOURNEY_20_30_V1 package", () => {
    const contentPackage = makeValidPackage();

    expect(validateStudyContentPackage(contentPackage)).toEqual({
      valid: true,
      issues: [],
    });
    expect(() =>
      assertValidStudyContentPackage(contentPackage),
    ).not.toThrow();
  });

  it("keeps conditional and optional blocks out of the Journey required block set", () => {
    expect(JOURNEY_20_30_REQUIRED_SECTION_TYPES).not.toContain(
      "INTERPRETATION_CAUTION",
    );
    expect(JOURNEY_20_30_REQUIRED_SECTION_TYPES).not.toContain(
      "DEEPEN",
    );
    expect(JOURNEY_20_30_REQUIRED_SECTION_TYPES).not.toContain(
      "REFERENCES",
    );
    expect(JOURNEY_20_30_REQUIRED_SECTION_TYPES).not.toContain(
      "EDITORIAL_NOTE",
    );
  });

  it("accepts TRACK_1_ORIGINAL_V1 without inventing Journey-only required sections", () => {
    const studyId = "study-01" as StudyId;
    const contentPackage: StudyContentPackage = {
      contentVersion: "legacy-track-one-contract",
      tracks: [
        makeTrack({
          contentProfile: "TRACK_1_ORIGINAL_V1",
        }),
      ],
      studies: [makeStudy("study-01", 1)],
      sections: [
        makeSection(studyId, "READ", 1),
        makeSection(studyId, "OBSERVE", 2),
        makeSection(studyId, "UNDERSTAND", 3),
        makeSection(studyId, "CONNECT", 4),
        makeSection(studyId, "APPLY", 5),
        makeSection(studyId, "CONTINUE_JOURNEY", 6),
      ],
      references: [],
    };

    expect(validateStudyContentPackage(contentPackage)).toEqual({
      valid: true,
      issues: [],
    });
  });

  it("rejects an unsupported technical content profile", () => {
    const base = makeValidPackage();
    const contentPackage: StudyContentPackage = {
      ...base,
      tracks: [
        {
          ...base.tracks[0],
          contentProfile: "UNKNOWN_PROFILE" as StudyContentProfile,
        },
      ],
    };

    expect(issueCodes(contentPackage)).toContain(
      "TRACK_CONTENT_PROFILE_INVALID",
    );
  });

  it("rejects empty or malformed structured section blocks", () => {
    const base = makeValidPackage();
    const firstSection = base.sections[0];

    const invalidSections: readonly StudySection[] = [
      {
        ...firstSection,
        blocks: [],
      },
      {
        ...base.sections[1],
        blocks: [
          {
            type: "PARAGRAPH",
            text: "   ",
          },
        ],
      },
      {
        ...base.sections[2],
        blocks: [
          {
            type: "BULLET_LIST",
            items: [],
          },
        ],
      },
      {
        ...base.sections[3],
        blocks: [
          {
            type: "CALLOUT",
            title: "   ",
            text: "   ",
          },
        ],
      },
      ...base.sections.slice(4),
    ];

    const codes = issueCodes({
      ...base,
      sections: invalidSections,
    });

    expect(codes).toContain("SECTION_BLOCKS_REQUIRED");
    expect(codes).toContain("SECTION_BLOCK_TEXT_REQUIRED");
    expect(codes).toContain("SECTION_BLOCK_LIST_EMPTY");
    expect(codes).toContain("SECTION_BLOCK_CALLOUT_TITLE_EMPTY");
    expect(codes).toContain("SECTION_BLOCK_CALLOUT_TEXT_REQUIRED");
  });

  it("rejects duplicate identities, slugs, orders and study numbers", () => {
    const base = makeValidPackage();
    const duplicateTrack = makeTrack({
      id: "track-02" as StudyTrackId,
    });
    const duplicateStudy = makeStudy("study-03", 1, {
      slug: "study-3" as StudySlug,
    });

    const contentPackage: StudyContentPackage = {
      ...base,
      tracks: [...base.tracks, duplicateTrack],
      studies: [...base.studies, duplicateStudy],
      sections: [
        ...base.sections,
        ...makeRequiredSections(duplicateStudy.id),
      ],
    };

    const codes = issueCodes(contentPackage);

    expect(codes).toContain("TRACK_SLUG_DUPLICATE");
    expect(codes).toContain("TRACK_ORDER_DUPLICATE");
    expect(codes).toContain("STUDY_NUMBER_DUPLICATE_IN_TRACK");
  });

  it("rejects broken next-study and reference relationships", () => {
    const base = makeValidPackage();
    const firstStudy = {
      ...base.studies[0],
      nextStudyId: "missing-study" as StudyId,
    };
    const secondStudyGoldenText = sectionIdFor(
      base.studies[1].id,
      "GOLDEN_TEXT",
    );
    const mismatchedReference: StudyReference = {
      ...base.references[0],
      sectionId: secondStudyGoldenText,
    };

    const contentPackage: StudyContentPackage = {
      ...base,
      studies: [firstStudy, base.studies[1]],
      references: [mismatchedReference],
    };

    const codes = issueCodes(contentPackage);

    expect(codes).toContain("NEXT_STUDY_NOT_FOUND");
    expect(codes).toContain("REFERENCE_SECTION_STUDY_MISMATCH");
  });

  it("enforces Journey required blocks only for JOURNEY_20_30_V1", () => {
    const base = makeValidPackage();
    const firstStudyId = base.studies[0].id;

    const sections = base.sections
      .filter(
        (section) =>
          !(
            section.studyId === firstStudyId &&
            section.type === "KEEP"
          ),
      )
      .map((section) =>
        section.studyId === firstStudyId &&
        section.type === "GROUP_MODE"
          ? { ...section, optional: true }
          : section,
      );

    const contentPackage: StudyContentPackage = {
      ...base,
      sections,
    };

    const codes = issueCodes(contentPackage);

    expect(codes).toContain("REQUIRED_SECTION_MISSING");
    expect(codes).toContain("REQUIRED_SECTION_MARKED_OPTIONAL");
  });

  it("rejects unpublished runtime tracks and studies", () => {
    const base = makeValidPackage();

    const contentPackage: StudyContentPackage = {
      ...base,
      tracks: [
        {
          ...base.tracks[0],
          published: false,
        },
      ],
      studies: [
        {
          ...base.studies[0],
          published: false,
        },
        base.studies[1],
      ],
    };

    const codes = issueCodes(contentPackage);

    expect(codes).toContain("TRACK_UNPUBLISHED");
    expect(codes).toContain("STUDY_UNPUBLISHED");
  });

  it("asserts invalid packages with deterministic issue details", () => {
    const base = makeValidPackage();
    const invalidPackage: StudyContentPackage = {
      ...base,
      contentVersion: "   ",
    };

    expect(() =>
      assertValidStudyContentPackage(invalidPackage),
    ).toThrow(
      "CONTENT_VERSION_REQUIRED@contentVersion",
    );
  });
});
// A29_A2_JOURNEY_REQUIRED_POLICY_REGRESSION
describe("JOURNEY_20_30 required-section policy regression", () => {
  it("accepts audited Jornada content without universal CONNECT or REFLECT sections", () => {
    expect(
      a29Track06Package.sections.some(
        (section) => section.type === "CONNECT",
      ),
    ).toBe(false);
    expect(
      a29Track06Package.sections.some(
        (section) => section.type === "REFLECT",
      ),
    ).toBe(false);

    const result =
      a29ValidatorPolicy.validateStudyEditorialPackage(a29Track06Package);

    expect(
      result.issues.filter(
        (issue) => issue.code === "REQUIRED_SECTION_MISSING",
      ),
    ).toHaveLength(0);
    expect(result.valid).toBe(true);
  });

  it("still rejects a Jornada package when APPLY is missing", () => {
    const packageWithoutApply = {
      ...a29Track06Package,
      sections: a29Track06Package.sections.filter(
        (section) => section.type !== "APPLY",
      ),
    };

    const result =
      a29ValidatorPolicy.validateStudyEditorialPackage(packageWithoutApply);

    expect(result.valid).toBe(false);
    expect(
      result.issues.some(
        (issue) =>
          issue.code === "REQUIRED_SECTION_MISSING" &&
          issue.message.includes("APPLY"),
      ),
    ).toBe(true);
  });

  it("continues accepting CONNECT and REFLECT when those sections are present", () => {
    const applySection = a29Track06Package.sections.find(
      (section) => section.type === "APPLY",
    );

    expect(applySection).toBeDefined();
    if (!applySection) {
      throw new Error("Track 6 must expose an APPLY section for this regression.");
    }

    const connectSection = {
      ...applySection,
      id: `${applySection.id}-a29-connect` as typeof applySection.id,
      type: "CONNECT" as const,
      order: applySection.order + 1000,
    };
    const reflectSection = {
      ...applySection,
      id: `${applySection.id}-a29-reflect` as typeof applySection.id,
      type: "REFLECT" as const,
      order: applySection.order + 1001,
    };
    const packageWithOptionalPedagogicalSections = {
      ...a29Track06Package,
      sections: [
        ...a29Track06Package.sections,
        connectSection,
        reflectSection,
      ],
    };

    const result =
      a29ValidatorPolicy.validateStudyEditorialPackage(
        packageWithOptionalPedagogicalSections,
      );

    expect(
      result.issues.filter(
        (issue) => issue.code === "SECTION_TYPE_INVALID",
      ),
    ).toHaveLength(0);
    expect(result.valid).toBe(true);
  });
});
