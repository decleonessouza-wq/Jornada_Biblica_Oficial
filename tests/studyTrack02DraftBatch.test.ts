import { track02Study01DraftPackage } from "../src/studies/content/track02Study01Draft";
import {
  TRACK_02_DRAFT_BATCH_EDITORIAL_STATUS,
  TRACK_02_DRAFT_BATCH_PROFILE,
  TRACK_02_DRAFT_BATCH_PUBLISHED,
  TRACK_02_DRAFT_BATCH_RUNTIME_ELIGIBLE,
  track02DraftBatchEditorialSources,
  track02DraftBatchPackage,
} from "../src/studies/content/track02DraftBatch";

const expectedCandidateShaByStudy = new Map<number, string>([
    [2, "CD67811EDF3C16A5F58BA0216FC38FE3F33A667BFBD5CB290C5328C74B8B6530"],
    [3, "E3CDA836746C8FBB2140D46A05173C53246F174F797D2E924104168C3983DF52"],
    [4, "2B19E4840335377DAEA98E5CFF95D0C20A2B4D31FB1FDDA1E0B55D82AAC4AC32"],
    [5, "1C11729BD5622E98FDFD8831E9458E2EBA695053605CDF85FDA7EECC32A4AAD9"],
    [6, "74531DECDBBDAE9DF96884193DCB8C12D8F5401FEFCCF67EBA3CA747F880A414"],
    [7, "F329EBC9963FD5579CD0E9537FD522006771511F68C7F4B12CE320412D604723"],
    [8, "34A8835746CE7312A484DD672301B68868BF60B11CB6744ADC9E865AB58369A8"],
    [9, "C40592C1B8322400BFD7FE5801FC2A6ABC424960C6B39A607C841EDC650EA4D2"],
    [10, "56B1FCE2440617EE363B942C380917E0201022D2CE2DB948869B4A94A2DEA143"],
]);

const expectedSectionCounts = new Map<number, number>([
  [1, 22],
  [2, 25],
  [3, 24],
  [4, 25],
  [5, 25],
  [6, 24],
  [7, 24],
  [8, 24],
  [9, 24],
  [10, 25],
]);

describe("P17-P2-A13 Track 02 controlled DRAFT batch integration", () => {
  it("materializes exactly studies 02-10 as standalone DRAFT source", () => {
    expect(TRACK_02_DRAFT_BATCH_PROFILE).toBe("JOURNEY_20_30_V1");
    expect(TRACK_02_DRAFT_BATCH_EDITORIAL_STATUS).toBe("DRAFT");
    expect(TRACK_02_DRAFT_BATCH_PUBLISHED).toBe(false);
    expect(TRACK_02_DRAFT_BATCH_RUNTIME_ELIGIBLE).toBe(false);

    expect(track02DraftBatchPackage.studies).toHaveLength(9);
    expect(track02DraftBatchPackage.studies.map((study) => study.number)).toEqual([
      2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(
      track02DraftBatchPackage.studies.some(
        (study) => study.id === "track-02-study-01",
      ),
    ).toBe(false);
    expect(
      track02DraftBatchPackage.studies.every((study) => study.published === false),
    ).toBe(true);
  });

  it("preserves the nine canonical R3-R2 candidate identities and DRAFT policy", () => {
    expect(track02DraftBatchEditorialSources).toHaveLength(9);

    for (const source of track02DraftBatchEditorialSources) {
      expect(source.editorialStatus).toBe("DRAFT");
      expect(source.published).toBe(false);
      expect(source.runtimeEligible).toBe(false);
      expect(source.technicalProfile).toBe("JOURNEY_20_30_V1");
      expect(source.candidateSha256).toBe(
        expectedCandidateShaByStudy.get(source.studyNumber),
      );
    }
  });

  it("combines the existing golden Study 01 with 02-10 into one exact ten-study chain", () => {
    const studies = [
      ...track02Study01DraftPackage.studies,
      ...track02DraftBatchPackage.studies,
    ].sort((left, right) => left.number - right.number);

    expect(studies).toHaveLength(10);
    expect(studies.map((study) => study.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(new Set(studies.map((study) => study.id)).size).toBe(10);
    expect(new Set(studies.map((study) => study.slug)).size).toBe(10);
    expect(studies.every((study) => study.trackId === "track-02")).toBe(true);
    expect(studies.every((study) => study.published === false)).toBe(true);

    for (let index = 0; index < 9; index += 1) {
      expect(studies[index]?.nextStudyId).toBe(
        `track-02-study-${String(index + 2).padStart(2, "0")}`,
      );
    }

    expect(studies[9]?.nextStudyId).toBeNull();
  });

  it("preserves section ownership and the proven R3-R2 section cardinalities", () => {
    const allSections = [
      ...track02Study01DraftPackage.sections,
      ...track02DraftBatchPackage.sections,
    ];

    for (let studyNumber = 1; studyNumber <= 10; studyNumber += 1) {
      const studyId = `track-02-study-${String(studyNumber).padStart(2, "0")}`;
      const sections = allSections.filter((section) => section.studyId === studyId);
      const expectedCount = expectedSectionCounts.get(studyNumber);

      expect(expectedCount).toBeDefined();
      expect(sections).toHaveLength(expectedCount!);
      expect(sections.some((section) => section.type === "GOLDEN_TEXT")).toBe(true);
      expect(sections.some((section) => section.type === "PRACTICAL_TRUTH")).toBe(true);
      expect(sections.some((section) => section.type === "BIBLE_READING")).toBe(true);
      expect(sections.some((section) => section.type === "OBSERVE")).toBe(true);
      expect(sections.some((section) => section.type === "UNDERSTAND")).toBe(true);
      expect(sections.some((section) => section.type === "CONNECT")).toBe(true);
      expect(sections.some((section) => section.type === "APPLY")).toBe(true);
      expect(sections.some((section) => section.type === "CONTINUE_JOURNEY")).toBe(true);
      expect(sections.some((section) => section.type === "REFERENCES")).toBe(true);
    }
  });

  it("keeps Study 10 terminal and the closing practical truth normalized without duplicate PRACTICAL_TRUTH sections", () => {
    const study10 = track02DraftBatchPackage.studies.find(
      (study) => study.number === 10,
    );
    const study10Sections = track02DraftBatchPackage.sections.filter(
      (section) => section.studyId === "track-02-study-10",
    );

    expect(study10?.nextStudyId).toBeNull();
    expect(
      study10Sections.filter((section) => section.type === "PRACTICAL_TRUTH"),
    ).toHaveLength(1);

    for (const study of track02DraftBatchPackage.studies) {
      const sections = track02DraftBatchPackage.sections.filter(
        (section) => section.studyId === study.id,
      );
      expect(
        sections.filter((section) => section.type === "PRACTICAL_TRUTH"),
      ).toHaveLength(1);

      const takeaway = sections.find(
        (section) => section.type === "JOURNEY_TAKEAWAY",
      );
      expect(
        takeaway?.blocks.some(
          (block) =>
            "text" in block &&
            typeof block.text === "string" &&
            block.text.includes("Verdade Prática"),
        ),
      ).toBe(true);
    }
  });
});
