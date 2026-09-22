/* eslint-disable max-len */
import {
  TRACK_01_DRAFT_BATCH_INTEGRATION,
  track01DraftBatchPackage,
  track01DraftStudies,
} from "../src/studies/content/track01DraftBatch";
import {
  validateStudyContentPackage,
  validateStudyEditorialPackage,
} from "../src/studies/content/studyContentValidator";
import {
  buildStudyRuntimeCatalog,
  getRuntimeStudyCountForTrack,
} from "../src/studies/runtime/studyRuntimeCatalog";

describe("P17-P2-A11 Track 1 DRAFT batch source integration", () => {
  const batch = TRACK_01_DRAFT_BATCH_INTEGRATION;
  const candidates = track01DraftStudies;
  const payloads = candidates.map((entry) => entry.payload);
  const getPayload = (index: number) => {
    const payload = payloads[index];
    if (!payload) {
      throw new Error(`Missing Track 1 payload at index ${index}`);
    }
    return payload;
  };

  it("preserves the approved B01 DRAFT-only envelope", () => {
    expect(batch.batchId).toBe("B01_TRACK_01");
    expect(batch.sourceProof).toBe("P17-P2-A10-R2-R1-R1");
    expect(batch.technicalProfile).toBe("TRACK_1_ORIGINAL_V1");
    expect(batch.editorialStatus).toBe("DRAFT");
    expect(batch.published).toBe(false);
    expect(batch.runtimeEligible).toBe(false);
    expect(batch.studyCount).toBe(18);
    expect(candidates).toHaveLength(18);
  });

  it("preserves all 18 approved candidate identities", () => {
    expect(candidates.map((entry) => entry.approvedCandidateSha256)).toEqual([
      "405C70805C90AC317DDE1A2AD64483D374881FB988C29CBC13C13925F94F137E",
      "145945B6948D1EC74A5C4345183FC378FC5D4F315FD46F6C1C7DE93AA5EB2AC3",
      "2FD54DB578AF00A3FE1DAC0A1F4C4D8454E47E7299E92D8EB3B08188F63E34F9",
      "DBC2BD0A733C07BA6541C5634B69C02B719BEB5176C341B8DA508230B487AD2C",
      "4AA4C3122CA3C67A8798EEA1AF619B7EDE358FB974C8BC3F565B4316D6D40F94",
      "51E5EBB2EB777591063CDDF8C10E13ADBF3296658D126B42C8EF82BA9FA17D38",
      "DFDE8626FF9986CDFC429D0404EB3A25CD18B2B129F1C085419E98264C75E988",
      "D62CAD5B3800F46F3A73797DEDEB5F1BC1936C77F4A7C1EA008C92DD688810A5",
      "F8B2AE55E6513036FA3CB542CC84D0EFDA393B1E36171AAE47A38417ACCB1CAE",
      "2B21F5582D53A7AFD273641B153B6817B7741A51D920CAE7F7626C0A595E4499",
      "0A7AF13E0FEBC94E23C7CB70E7A33519E1940E9B02D7D032881D910530EDA7DC",
      "AE18A5F44715BC31ECFEA3E2E97C628D840635919554C291A06C65610604A3B2",
      "BCAC8F15AE5D7295B5E22210E01CB7C104967A8D157E8A223E5C5C2713A15BDC",
      "B4C9C6CB48825BDA47C8FE0AE5790AC7026D56F752BD370DEA06C86FBBEA9DE6",
      "E79AFA4FDD88A825102F70727B5BF62AC61CF90B77C0B61EA919E16B979EA645",
      "51770DDE6E571FE1C224E2350071F5681775C9FB991E9346F233C64FBA8BDB08",
      "012105B5CC17E2693BC79F69BAF6676DAB2D1B884F5B197394A1A9506B5B2BCA",
      "EEA052CE12C9229A4A0F9F67B827501F8CABA9FAAD37E027A23B0CE5C8B91980"
]);
    for (const payload of payloads) {
      expect(payload.schema).toBe("P17-P2-A10-R2-R1-R1_TRACK1_BATCH_SIMULATION_CANDIDATE_V1");
      expect(payload.readinessOnly).toBe(true);
      expect(payload.runtimePayload).toBe(false);
      expect(payload.batch.id).toBe("B01_TRACK_01");
      expect(payload.batch.technicalProfile).toBe("TRACK_1_ORIGINAL_V1");
    }
  });

  it("keeps ids, slugs and study numbers unique and sequential", () => {
    const ids = payloads.map((payload) => payload.study.id);
    const slugs = payloads.map((payload) => payload.study.slug);
    const numbers = payloads.map((payload) => payload.study.number);
    expect(new Set(ids).size).toBe(18);
    expect(new Set(slugs).size).toBe(18);
    expect(numbers).toEqual(Array.from({ length: 18 }, (_, index) => index + 1));
    expect(ids).toEqual(Array.from({ length: 18 }, (_, index) => `track-01-study-${String(index + 1).padStart(2, "0")}`));
  });

  it("keeps every study DRAFT, unpublished and runtime-ineligible", () => {
    for (const payload of payloads) {
      expect(payload.study.trackId).toBe("track-01");
      expect(payload.study.editorialStatus).toBe("DRAFT");
      expect(payload.study.published).toBe(false);
      expect(payload.study.runtimeEligible).toBe(false);
      expect(payload.study.technicalProfile).toBe("TRACK_1_ORIGINAL_V1");
    }
  });

  it("preserves structured sections and clean quality gates", () => {
    for (const payload of payloads) {
      const terminal = payload.study.number === 18;
      expect(payload.sections).toHaveLength(terminal ? 8 : 10);
      expect(payload.quality.forbiddenControlCharCount).toBe(0);
      expect(payload.quality.pageHeaderLeakCount).toBe(0);
      expect(payload.quality.questionSemanticLeakCount).toBe(0);
      expect(payload.quality.objectiveSemanticLeakCount).toBe(0);
      expect(payload.quality.continueAppendixLeakCount).toBe(0);
      expect(payload.quality.profileMarkerSetMatch).toBe(true);
      expect(payload.quality.structuredSectionCountMatch).toBe(true);
      expect(payload.quality.nextStudyIdValid).toBe(true);
    }
  });

  it("preserves continuity for studies 01 through 17", () => {
    for (let index = 0; index < 17; index += 1) {
      const payload = getPayload(index);
      const expectedNext = index + 2;
      expect(payload.study.terminal).toBe(false);
      expect(payload.study.nextStudyId).toBe(`track-01-study-${String(expectedNext).padStart(2, "0")}`);
      expect(payload.continuity.expectedNextStudyNumber).toBe(expectedNext);
      expect(payload.continuity.detectedNextStudyNumber).toBe(expectedNext);
      expect(payload.continuity.valid).toBe(true);
    }
  });

  it("preserves the exact Study 17 final-study continuity proof", () => {
    const payload = getPayload(16);
    expect(payload.study.id).toBe("track-01-study-17");
    expect(payload.study.nextStudyId).toBe("track-01-study-18");
    expect(payload.continuity.detectedNextStudyNumber).toBe(18);
    expect(payload.continuity.evidenceKind).toBe("EXPLICIT_FINAL_STUDY_LABEL_PLUS_EXPLICIT_STUDY_NUMBER");
    expect(payload.continuity.valid).toBe(true);
  });

  it("preserves Study 18 as the terminal Track 1 completion", () => {
    const payload = getPayload(17);
    expect(payload.study.id).toBe("track-01-study-18");
    expect(payload.study.terminal).toBe(true);
    expect(payload.study.nextStudyId).toBeNull();
    expect(payload.continuity.terminal).toBe(true);
    expect(payload.continuity.nextStudyId).toBeNull();
    expect(payload.continuity.valid).toBe(true);
    expect(payload.terminalCompletion?.sourceHeading).toBe("TRILHA 1 CONCLUÍDA");
    expect(payload.terminalCompletion?.trackCompleted).toBe(1);
    expect(payload.terminalCompletion?.completedStudyCount).toBe(18);
    expect(payload.terminalCompletion?.nextTrackId).toBe("track-02");
  });
});

describe("P17-P2-A29-A56 canonical Track 01 package", () => {
  it("materializes one DRAFT track, eighteen studies and 178 structured sections", () => {
    expect(track01DraftBatchPackage.contentVersion).toBe(
      "draft-track-01-studies-01-18-canonical-v1",
    );
    expect(track01DraftBatchPackage.tracks).toHaveLength(1);
    expect(track01DraftBatchPackage.studies).toHaveLength(18);
    expect(track01DraftBatchPackage.sections).toHaveLength(178);
    expect(track01DraftBatchPackage.references).toHaveLength(0);

    expect(track01DraftBatchPackage.tracks[0]).toMatchObject({
      id: "track-01",
      slug: "o-plano-eterno-de-deus",
      title: "O Plano Eterno de Deus",
      description: "O Plano Eterno de Deus",
      type: "FORMATION",
      contentProfile: "TRACK_1_ORIGINAL_V1",
      cardImage: "track-01-card",
      heroImage: "track-01-hero",
      order: 1,
      published: false,
    });

    expect(
      track01DraftBatchPackage.studies.every((study) => study.published === false),
    ).toBe(true);
    expect(validateStudyEditorialPackage(track01DraftBatchPackage).valid).toBe(
      true,
    );
  });

  it("preserves candidate ids, continuity and section content exactly in the canonical projection", () => {
    expect(track01DraftBatchPackage.studies.map((study) => study.id)).toEqual(
      track01DraftStudies.map((candidate) => candidate.payload.study.id),
    );
    expect(
      track01DraftBatchPackage.studies.map((study) => study.nextStudyId),
    ).toEqual(
      track01DraftStudies.map(
        (candidate) => candidate.payload.study.nextStudyId,
      ),
    );

    for (const candidate of track01DraftStudies) {
      const studyId = candidate.payload.study.id;
      const canonicalSections = track01DraftBatchPackage.sections.filter(
        (section) => section.studyId === studyId,
      );

      expect(canonicalSections).toHaveLength(candidate.payload.sections.length);

      candidate.payload.sections.forEach((sourceSection, index) => {
        const canonicalSection = canonicalSections[index];
        expect(canonicalSection?.type).toBe(sourceSection.type);
        expect(canonicalSection?.order).toBe(sourceSection.order);
        expect(canonicalSection?.title).toBe(sourceSection.sourceHeading);
        expect(canonicalSection?.optional).toBe(false);
        expect(canonicalSection?.collapsible).toBe(false);
        expect(canonicalSection?.blocks).toEqual([
          {
            type: "PARAGRAPH",
            text: sourceSection.contentText,
          },
        ]);
      });
    }
  });

  it("keeps an explicit DRAFT candidate gated while the released runtime exposes Track 01", () => {
    const draftCatalog = buildStudyRuntimeCatalog([
      {
        contentPackage: track01DraftBatchPackage,
        editorialStatus: "DRAFT",
        publicAuthorDisplayName: null,
      },
    ]);

    expect(draftCatalog.packages).toHaveLength(0);
    expect(draftCatalog.tracks).toHaveLength(0);
    expect(draftCatalog.studies).toHaveLength(0);
    expect(getRuntimeStudyCountForTrack("track-01")).toBe(18);

    const publishedPackage = {
      ...track01DraftBatchPackage,
      tracks: track01DraftBatchPackage.tracks.map((track) => ({
        ...track,
        published: true,
      })),
      studies: track01DraftBatchPackage.studies.map((study) => ({
        ...study,
        published: true,
      })),
    };

    expect(validateStudyContentPackage(publishedPackage).valid).toBe(true);

    const publishedCatalog = buildStudyRuntimeCatalog([
      {
        contentPackage: publishedPackage,
        editorialStatus: "PUBLISHED",
        publicAuthorDisplayName: null,
      },
    ]);

    expect(publishedCatalog.packages).toHaveLength(1);
    expect(publishedCatalog.tracks).toHaveLength(1);
    expect(publishedCatalog.studies).toHaveLength(18);
  });
});
