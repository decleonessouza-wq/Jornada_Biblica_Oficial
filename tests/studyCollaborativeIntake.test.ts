import {
  COLLABORATIVE_STUDY_INTAKE_WORKFLOW,
  COLLABORATIVE_STUDY_TARGET_PROFILE,
  COLLABORATIVE_STUDY_TRACK_NAME,
  COLLABORATIVE_STUDY_TRACK_NUMBER,
  evaluateCollaborativeStudyIntakeReadiness,
  michaelCollaborativeGoldenModel,
  validateCollaborativeStudyIntake,
} from "../src/studies/content/collaborativeStudyIntake";

describe("collaborativeStudyIntake", () => {
  test("locks the governed collaborative intake workflow without runtime promotion", () => {
    expect(COLLABORATIVE_STUDY_TRACK_NUMBER).toBe(5);
    expect(COLLABORATIVE_STUDY_TRACK_NAME).toBe("Estudos Colaborativos");
    expect(COLLABORATIVE_STUDY_TARGET_PROFILE).toBe("JOURNEY_20_30_V1");
    expect(COLLABORATIVE_STUDY_INTAKE_WORKFLOW).toEqual([
      "RECEIVE_AND_IDENTITY_LOCK",
      "CLASSIFY_ARTIFACTS_AS_ONE_OR_MORE_SUBMISSIONS",
      "EXTRACT_OBSERVED_TEXT_WITHOUT_SOURCE_MUTATION",
      "AUDIT_BIBLICAL_AND_EDITORIAL_STRUCTURE",
      "MAP_TO_JOURNEY_20_30_WITH_EXPLICIT_GAPS",
      "EDITORIAL_REVIEW_AND_AUTHOR_ADJUSTMENTS_WHEN_NEEDED",
      "APPROVE_FINAL_TEXT",
      "VERIFY_AUTHOR_DISPLAY_AUTHORIZATION",
      "ASSIGN_PERMANENT_ID_SLUG_POSITION_ONLY_WHEN_GOVERNED",
      "MATERIALIZE_DRAFT_PACKAGE",
      "VALIDATE_DRAFT",
      "PROMOTE_TO_PUBLISHED_ONLY_BY_SEPARATE_AUTHORIZATION",
    ]);
  });

  test("uses Michael only as the real golden intake model proven by A18-R2", () => {
    expect(michaelCollaborativeGoldenModel.fixtureLabel).toBe(
      "MICHAEL_CURRENT_SINGLE_SUBMISSION_CANDIDATE",
    );
    expect(michaelCollaborativeGoldenModel.contributorNameObserved).toBe(
      "Michael Batista da Silva",
    );
    expect(michaelCollaborativeGoldenModel.studyTitleObserved).toBe(
      "A OBRA REDENTORA DE CRISTO E O PLANO DA SALVAÇÃO",
    );
    expect(michaelCollaborativeGoldenModel.textPrincipalObserved).toBe(
      "João 3:16; Romanos 3:23-24; Efésios 2:8-9",
    );
    expect(michaelCollaborativeGoldenModel.objectiveObserved).toBe(
      "Compreender, à luz das Escrituras, o plano de Deus para salvar o ser humano por meio de Jesus Cristo.",
    );
    expect(michaelCollaborativeGoldenModel.observedStructure).toEqual({
      numberedSectionCount: 13,
      applicationQuestionCount: 6,
      hasApplicationFinal: true,
      hasCentralPhrase: true,
      nativeJourney2030Structure: false,
    });
  });

  test("locks Michael's source family as one submission with two source artifacts", () => {
    expect(michaelCollaborativeGoldenModel.artifacts).toEqual([
      {
        fileName: "Estudos Colaborativos - MICHAEL.docx",
        sha256:
          "8D3FCE26042C1A8BC0F0F0D6BDBF1FA827F66561C4133098E7BF865043158A1C",
        role: "EDITABLE_TEXT_SOURCE",
      },
      {
        fileName: "Estudos Colaborativos - MICHAEL.pdf",
        sha256:
          "1382DDE8912230D3440E586952717C6E7B45D5CE2E303C914175C9F46CD5665B",
        role: "RENDERED_REVIEW_ARTIFACT",
      },
    ]);
    expect(
      michaelCollaborativeGoldenModel.sourceFamilyInterpretation,
    ).toBe(
      "ONE_COLLABORATIVE_SUBMISSION_CANDIDATE_WITH_MULTIPLE_ARTIFACTS",
    );
    expect(michaelCollaborativeGoldenModel.pdfDocxTextualEquivalence).toBe(
      "UNRESOLVED_NOT_ASSERTED",
    );
  });

  test("preserves explicit Jornada 20-30 gaps instead of inventing missing editorial content", () => {
    const mappings = new Map(
      michaelCollaborativeGoldenModel.journey2030Mapping.map((mapping) => [
        mapping.field,
        mapping,
      ]),
    );

    expect(mappings.get("Tema")?.status).toBe("DIRECT_OBSERVED");
    expect(mappings.get("Objetivo")?.status).toBe("DIRECT_OBSERVED");
    expect(mappings.get("PerguntaCentral")?.sourceObservation).toBeNull();
    expect(mappings.get("TextoAureo")?.sourceObservation).toBeNull();
    expect(mappings.get("VerdadePratica")?.sourceObservation).toBeNull();
    expect(mappings.get("ParaContinuar")?.sourceObservation).toBeNull();
    expect(mappings.get("LeituraBiblica")?.status).toBe(
      "SOURCE_HAS_RELATED_MATERIAL_NOT_SILENTLY_RELABELED",
    );
    expect(
      michaelCollaborativeGoldenModel.sourceElementsToPreserveOutsideForcedProfileMapping,
    ).toEqual(["🔥 FRASE CENTRAL DO ESTUDO"]);
  });

  test("keeps Michael unresolved for permanent identity, public authorship and publication", () => {
    expect(michaelCollaborativeGoldenModel.governance).toEqual({
      publicAuthorDisplayAuthorization:
        "UNRESOLVED_REQUIRES_EXPLICIT_AUTHORIZATION",
      finalJourney2030TextApproved: false,
      permanentStudyId: null,
      permanentSlug: null,
      permanentTrackPosition: null,
      draftPackageMaterialized: false,
      draftValidated: false,
      publicationApproval: "NO",
    });

    const validation = validateCollaborativeStudyIntake(
      michaelCollaborativeGoldenModel,
    );
    expect(validation).toEqual({ valid: true, issues: [] });

    const readiness = evaluateCollaborativeStudyIntakeReadiness(
      michaelCollaborativeGoldenModel,
    );
    expect(readiness.intakeValid).toBe(true);
    expect(readiness.readyForEditorialAdaptation).toBe(true);
    expect(readiness.readyForDraftMaterialization).toBe(false);
    expect(readiness.readyForPublication).toBe(false);
    expect(readiness.blockers).toEqual([
      "NATIVE_JOURNEY_20_30_STRUCTURE_NOT_PRESENT",
      "FINAL_JOURNEY_20_30_TEXT_NOT_APPROVED",
      "PUBLIC_AUTHOR_DISPLAY_AUTHORIZATION_UNRESOLVED",
      "PERMANENT_STUDY_ID_NOT_ASSIGNED",
      "PERMANENT_SLUG_NOT_ASSIGNED",
      "PERMANENT_TRACK_POSITION_NOT_ASSIGNED",
      "DRAFT_PACKAGE_NOT_MATERIALIZED",
      "DRAFT_NOT_VALIDATED",
      "PUBLICATION_NOT_AUTHORIZED_BY_SEPARATE_DECISION",
    ]);
  });

  test("fails closed on malformed or duplicate source artifact identities", () => {
    const invalid = {
      ...michaelCollaborativeGoldenModel,
      artifacts: [
        {
          ...michaelCollaborativeGoldenModel.artifacts[0],
          sha256: "NOT_A_SHA256",
        },
        {
          ...michaelCollaborativeGoldenModel.artifacts[1],
          sha256: "NOT_A_SHA256",
        },
      ],
    };

    const validation = validateCollaborativeStudyIntake(invalid);

    expect(validation.valid).toBe(false);
    expect(validation.issues).toContain("INVALID_ARTIFACT_SHA256");
    expect(validation.issues).toContain("DUPLICATE_ARTIFACT_SHA256");
  });

  test("rejects premature permanent identity assignment before editorial and authorship governance", () => {
    const premature = {
      ...michaelCollaborativeGoldenModel,
      governance: {
        ...michaelCollaborativeGoldenModel.governance,
        permanentStudyId: "premature-id",
        permanentSlug: "premature-slug",
        permanentTrackPosition: 1,
      },
    };

    const validation = validateCollaborativeStudyIntake(premature);

    expect(validation.valid).toBe(false);
    expect(validation.issues).toEqual(
      expect.arrayContaining([
        "PERMANENT_ID_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION",
        "PERMANENT_SLUG_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION",
        "PERMANENT_POSITION_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION",
      ]),
    );
  });
});
