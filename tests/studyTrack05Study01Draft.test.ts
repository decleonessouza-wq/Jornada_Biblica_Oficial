import {
  TRACK05_STUDY01_APPROVED_CANDIDATE_SHA256,
  track05Study01ApprovedCandidateV2,
  track05Study01Draft,
  track05Study01Governance,
  track05Study01PublicAuthor,
} from "../src/studies/content/track05Study01Draft";

describe("track05Study01Draft", () => {
  it("registra exatamente a identidade e governança aprovadas", () => {
    expect(track05Study01Governance).toEqual({
      trackId: "track-05",
      permanentStudyId: "track-05-study-01",
      permanentSlug:
        "a-obra-redentora-de-cristo-e-o-plano-da-salvacao",
      permanentTrackPosition: 1,
      publicAuthorDisplayAuthorization: "AUTHORIZED",
      publicAuthorDisplayName: "Michael Batista da Silva",
      editorialStatus: "DRAFT",
      published: false,
      runtimeEligible: false,
      nextStudyId: null,
      technicalProfile: "JOURNEY_20_30_V1",
    });
    expect(track05Study01PublicAuthor).toBe("Michael Batista da Silva");
  });

  it("preserva deterministicamente a candidate-v2 aprovada", () => {
    expect(TRACK05_STUDY01_APPROVED_CANDIDATE_SHA256).toBe(
      "82466AD048D57E81B1882FA4A340B8ECA945700E4AC2FA64704B72EF386552B3",
    );
    expect(track05Study01ApprovedCandidateV2.candidateVersion).toBe(
      "michael-journey-20-30-candidate-v2",
    );
    expect(track05Study01ApprovedCandidateV2.targetProfile).toBe(
      "JOURNEY_20_30_V1",
    );
    expect(track05Study01ApprovedCandidateV2.study.referencias.items).toHaveLength(
      31,
    );
    expect(track05Study01ApprovedCandidateV2.study.fraseCentralPreservada.text).toContain(
      "O homem não poderia chegar até Deus",
    );
  });

  it("materializa somente o estudo real autorizado sem placeholder futuro", () => {
    const serialized = JSON.stringify(track05Study01Draft);

    expect(serialized).toContain("track-05-study-01");
    expect(serialized).toContain(
      "a-obra-redentora-de-cristo-e-o-plano-da-salvacao",
    );
    expect(serialized).toContain("A OBRA REDENTORA DE CRISTO E O PLANO DA SALVAÇÃO");
    expect(serialized).toContain("Apocalipse 21");

    expect(serialized).not.toContain("track-05-study-02");
    expect(serialized).not.toContain("track-02");
    expect(serialized).not.toContain("Deus, o Criador");
  });
});
