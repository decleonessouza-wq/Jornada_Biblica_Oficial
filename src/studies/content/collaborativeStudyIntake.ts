export const COLLABORATIVE_STUDY_TRACK_NUMBER = 5 as const;
export const COLLABORATIVE_STUDY_TRACK_NAME = "Estudos Colaborativos" as const;
export const COLLABORATIVE_STUDY_TARGET_PROFILE = "JOURNEY_20_30_V1" as const;

export const COLLABORATIVE_STUDY_INTAKE_WORKFLOW = [
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
] as const;

export type CollaborativeStudyIntakeStage =
  (typeof COLLABORATIVE_STUDY_INTAKE_WORKFLOW)[number];

export type CollaborativeArtifactRole =
  | "EDITABLE_TEXT_SOURCE"
  | "RENDERED_REVIEW_ARTIFACT";

export type CollaborativeAuthorDisplayAuthorization =
  | "UNRESOLVED_REQUIRES_EXPLICIT_AUTHORIZATION"
  | "AUTHORIZED"
  | "DENIED";

export type CollaborativePublicationApproval =
  | "NO"
  | "AUTHORIZED_BY_SEPARATE_EDITORIAL_DECISION";

export type CollaborativePdfDocxEquivalence =
  | "UNRESOLVED_NOT_ASSERTED"
  | "PROVEN_EQUIVALENT"
  | "PROVEN_DIFFERENT";

export type CollaborativeJourney2030Field =
  | "Tema"
  | "PerguntaCentral"
  | "Objetivo"
  | "TextoAureo"
  | "VerdadePratica"
  | "LeituraBiblica"
  | "AntesDeEntender"
  | "OQueABibliaMostra"
  | "LeiaObserve"
  | "OQuePrecisamosEntender"
  | "Compreenda"
  | "ComoViverIsso"
  | "Aplique"
  | "Conclusao"
  | "ParaContinuar"
  | "Referencias";

export type CollaborativeJourney2030MappingStatus =
  | "DIRECT_OBSERVED"
  | "SOURCE_HAS_RELATED_MATERIAL_NOT_SILENTLY_RELABELED"
  | "SEMANTIC_CANDIDATE_REQUIRES_EDITORIAL_MAPPING"
  | "REQUIRES_EDITORIAL_RESTRUCTURING"
  | "REQUIRES_EDITORIAL_EXTRACTION_AND_NORMALIZATION"
  | "NOT_EXPLICIT_REQUIRES_EDITORIAL_AUTHORING";

export interface CollaborativeArtifactIdentity {
  readonly fileName: string;
  readonly sha256: string;
  readonly role: CollaborativeArtifactRole;
}

export interface CollaborativeObservedStructure {
  readonly numberedSectionCount: number;
  readonly applicationQuestionCount: number;
  readonly hasApplicationFinal: boolean;
  readonly hasCentralPhrase: boolean;
  readonly nativeJourney2030Structure: boolean;
}

export interface CollaborativeJourney2030FieldMapping {
  readonly field: CollaborativeJourney2030Field;
  readonly sourceObservation: string | null;
  readonly status: CollaborativeJourney2030MappingStatus;
}

export interface CollaborativeStudyGovernance {
  readonly publicAuthorDisplayAuthorization: CollaborativeAuthorDisplayAuthorization;
  readonly finalJourney2030TextApproved: boolean;
  readonly permanentStudyId: string | null;
  readonly permanentSlug: string | null;
  readonly permanentTrackPosition: number | null;
  readonly draftPackageMaterialized: boolean;
  readonly draftValidated: boolean;
  readonly publicationApproval: CollaborativePublicationApproval;
}

export interface CollaborativeStudyIntakeRecord {
  readonly fixtureLabel?: string;
  readonly trackNumber: typeof COLLABORATIVE_STUDY_TRACK_NUMBER;
  readonly trackName: typeof COLLABORATIVE_STUDY_TRACK_NAME;
  readonly targetProfile: typeof COLLABORATIVE_STUDY_TARGET_PROFILE;
  readonly contributorNameObserved: string;
  readonly studyTitleObserved: string;
  readonly textPrincipalObserved: string;
  readonly objectiveObserved: string;
  readonly artifacts: readonly CollaborativeArtifactIdentity[];
  readonly sourceFamilyInterpretation:
    "ONE_COLLABORATIVE_SUBMISSION_CANDIDATE_WITH_MULTIPLE_ARTIFACTS";
  readonly pdfDocxTextualEquivalence: CollaborativePdfDocxEquivalence;
  readonly observedStructure: CollaborativeObservedStructure;
  readonly journey2030Mapping: readonly CollaborativeJourney2030FieldMapping[];
  readonly sourceElementsToPreserveOutsideForcedProfileMapping: readonly string[];
  readonly governance: CollaborativeStudyGovernance;
}

export type CollaborativeIntakeValidationIssue =
  | "TRACK_NUMBER_MUST_BE_5"
  | "TRACK_NAME_MISMATCH"
  | "TARGET_PROFILE_MISMATCH"
  | "CONTRIBUTOR_NAME_OBSERVATION_REQUIRED"
  | "STUDY_TITLE_OBSERVATION_REQUIRED"
  | "TEXT_PRINCIPAL_OBSERVATION_REQUIRED"
  | "OBJECTIVE_OBSERVATION_REQUIRED"
  | "AT_LEAST_ONE_ARTIFACT_REQUIRED"
  | "EDITABLE_TEXT_SOURCE_REQUIRED"
  | "INVALID_ARTIFACT_SHA256"
  | "DUPLICATE_ARTIFACT_SHA256"
  | "NUMBERED_SECTION_COUNT_INVALID"
  | "APPLICATION_QUESTION_COUNT_INVALID"
  | "JOURNEY_MAPPING_FIELD_DUPLICATE"
  | "PERMANENT_ID_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION"
  | "PERMANENT_SLUG_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION"
  | "PERMANENT_POSITION_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION"
  | "DRAFT_MATERIALIZATION_REQUIRES_GOVERNED_ID_SLUG_POSITION"
  | "DRAFT_VALIDATION_REQUIRES_DRAFT_MATERIALIZATION"
  | "PUBLICATION_REQUIRES_VALIDATED_DRAFT_AND_SEPARATE_APPROVAL";

export interface CollaborativeStudyIntakeValidationResult {
  readonly valid: boolean;
  readonly issues: readonly CollaborativeIntakeValidationIssue[];
}

export type CollaborativeStudyReadinessBlocker =
  | "INTAKE_VALIDATION_FAILED"
  | "NATIVE_JOURNEY_20_30_STRUCTURE_NOT_PRESENT"
  | "FINAL_JOURNEY_20_30_TEXT_NOT_APPROVED"
  | "PUBLIC_AUTHOR_DISPLAY_AUTHORIZATION_UNRESOLVED"
  | "PERMANENT_STUDY_ID_NOT_ASSIGNED"
  | "PERMANENT_SLUG_NOT_ASSIGNED"
  | "PERMANENT_TRACK_POSITION_NOT_ASSIGNED"
  | "DRAFT_PACKAGE_NOT_MATERIALIZED"
  | "DRAFT_NOT_VALIDATED"
  | "PUBLICATION_NOT_AUTHORIZED_BY_SEPARATE_DECISION";

export interface CollaborativeStudyIntakeReadiness {
  readonly intakeValid: boolean;
  readonly readyForEditorialAdaptation: boolean;
  readonly readyForDraftMaterialization: boolean;
  readonly readyForPublication: boolean;
  readonly blockers: readonly CollaborativeStudyReadinessBlocker[];
}

const SHA256_HEX = /^[A-F0-9]{64}$/;

function hasObservedText(value: string): boolean {
  return value.trim().length > 0;
}

function authorDisplayDecisionResolved(
  value: CollaborativeAuthorDisplayAuthorization,
): boolean {
  return value === "AUTHORIZED" || value === "DENIED";
}

function hasGovernedIdentity(
  governance: CollaborativeStudyGovernance,
): boolean {
  return (
    governance.permanentStudyId !== null &&
    governance.permanentStudyId.trim().length > 0 &&
    governance.permanentSlug !== null &&
    governance.permanentSlug.trim().length > 0 &&
    governance.permanentTrackPosition !== null &&
    Number.isInteger(governance.permanentTrackPosition) &&
    governance.permanentTrackPosition > 0
  );
}

export function validateCollaborativeStudyIntake(
  record: CollaborativeStudyIntakeRecord,
): CollaborativeStudyIntakeValidationResult {
  const issues: CollaborativeIntakeValidationIssue[] = [];

  if (record.trackNumber !== COLLABORATIVE_STUDY_TRACK_NUMBER) {
    issues.push("TRACK_NUMBER_MUST_BE_5");
  }
  if (record.trackName !== COLLABORATIVE_STUDY_TRACK_NAME) {
    issues.push("TRACK_NAME_MISMATCH");
  }
  if (record.targetProfile !== COLLABORATIVE_STUDY_TARGET_PROFILE) {
    issues.push("TARGET_PROFILE_MISMATCH");
  }
  if (!hasObservedText(record.contributorNameObserved)) {
    issues.push("CONTRIBUTOR_NAME_OBSERVATION_REQUIRED");
  }
  if (!hasObservedText(record.studyTitleObserved)) {
    issues.push("STUDY_TITLE_OBSERVATION_REQUIRED");
  }
  if (!hasObservedText(record.textPrincipalObserved)) {
    issues.push("TEXT_PRINCIPAL_OBSERVATION_REQUIRED");
  }
  if (!hasObservedText(record.objectiveObserved)) {
    issues.push("OBJECTIVE_OBSERVATION_REQUIRED");
  }

  if (record.artifacts.length === 0) {
    issues.push("AT_LEAST_ONE_ARTIFACT_REQUIRED");
  }
  if (!record.artifacts.some((artifact) => artifact.role === "EDITABLE_TEXT_SOURCE")) {
    issues.push("EDITABLE_TEXT_SOURCE_REQUIRED");
  }

  const seenHashes = new Set<string>();
  for (const artifact of record.artifacts) {
    const normalizedHash = artifact.sha256.toUpperCase();
    if (!SHA256_HEX.test(normalizedHash)) {
      issues.push("INVALID_ARTIFACT_SHA256");
    }
    if (seenHashes.has(normalizedHash)) {
      issues.push("DUPLICATE_ARTIFACT_SHA256");
    }
    seenHashes.add(normalizedHash);
  }

  if (
    !Number.isInteger(record.observedStructure.numberedSectionCount) ||
    record.observedStructure.numberedSectionCount < 0
  ) {
    issues.push("NUMBERED_SECTION_COUNT_INVALID");
  }
  if (
    !Number.isInteger(record.observedStructure.applicationQuestionCount) ||
    record.observedStructure.applicationQuestionCount < 0
  ) {
    issues.push("APPLICATION_QUESTION_COUNT_INVALID");
  }

  const seenMappingFields = new Set<CollaborativeJourney2030Field>();
  for (const mapping of record.journey2030Mapping) {
    if (seenMappingFields.has(mapping.field)) {
      issues.push("JOURNEY_MAPPING_FIELD_DUPLICATE");
    }
    seenMappingFields.add(mapping.field);
  }

  const identityMayBeAssigned =
    record.governance.finalJourney2030TextApproved &&
    authorDisplayDecisionResolved(
      record.governance.publicAuthorDisplayAuthorization,
    );

  if (
    record.governance.permanentStudyId !== null &&
    !identityMayBeAssigned
  ) {
    issues.push(
      "PERMANENT_ID_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION",
    );
  }
  if (
    record.governance.permanentSlug !== null &&
    !identityMayBeAssigned
  ) {
    issues.push(
      "PERMANENT_SLUG_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION",
    );
  }
  if (
    record.governance.permanentTrackPosition !== null &&
    !identityMayBeAssigned
  ) {
    issues.push(
      "PERMANENT_POSITION_REQUIRES_FINAL_TEXT_AND_AUTHOR_DISPLAY_DECISION",
    );
  }

  if (
    record.governance.draftPackageMaterialized &&
    !hasGovernedIdentity(record.governance)
  ) {
    issues.push("DRAFT_MATERIALIZATION_REQUIRES_GOVERNED_ID_SLUG_POSITION");
  }
  if (
    record.governance.draftValidated &&
    !record.governance.draftPackageMaterialized
  ) {
    issues.push("DRAFT_VALIDATION_REQUIRES_DRAFT_MATERIALIZATION");
  }
  if (
    record.governance.publicationApproval ===
      "AUTHORIZED_BY_SEPARATE_EDITORIAL_DECISION" &&
    (!record.governance.draftPackageMaterialized ||
      !record.governance.draftValidated)
  ) {
    issues.push(
      "PUBLICATION_REQUIRES_VALIDATED_DRAFT_AND_SEPARATE_APPROVAL",
    );
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

export function evaluateCollaborativeStudyIntakeReadiness(
  record: CollaborativeStudyIntakeRecord,
): CollaborativeStudyIntakeReadiness {
  const validation = validateCollaborativeStudyIntake(record);
  const blockers: CollaborativeStudyReadinessBlocker[] = [];

  if (!validation.valid) {
    blockers.push("INTAKE_VALIDATION_FAILED");
  }
  if (!record.observedStructure.nativeJourney2030Structure) {
    blockers.push("NATIVE_JOURNEY_20_30_STRUCTURE_NOT_PRESENT");
  }
  if (!record.governance.finalJourney2030TextApproved) {
    blockers.push("FINAL_JOURNEY_20_30_TEXT_NOT_APPROVED");
  }
  if (
    record.governance.publicAuthorDisplayAuthorization ===
    "UNRESOLVED_REQUIRES_EXPLICIT_AUTHORIZATION"
  ) {
    blockers.push("PUBLIC_AUTHOR_DISPLAY_AUTHORIZATION_UNRESOLVED");
  }
  if (record.governance.permanentStudyId === null) {
    blockers.push("PERMANENT_STUDY_ID_NOT_ASSIGNED");
  }
  if (record.governance.permanentSlug === null) {
    blockers.push("PERMANENT_SLUG_NOT_ASSIGNED");
  }
  if (record.governance.permanentTrackPosition === null) {
    blockers.push("PERMANENT_TRACK_POSITION_NOT_ASSIGNED");
  }
  if (!record.governance.draftPackageMaterialized) {
    blockers.push("DRAFT_PACKAGE_NOT_MATERIALIZED");
  }
  if (!record.governance.draftValidated) {
    blockers.push("DRAFT_NOT_VALIDATED");
  }
  if (
    record.governance.publicationApproval !==
    "AUTHORIZED_BY_SEPARATE_EDITORIAL_DECISION"
  ) {
    blockers.push("PUBLICATION_NOT_AUTHORIZED_BY_SEPARATE_DECISION");
  }

  const readyForEditorialAdaptation =
    validation.valid &&
    hasObservedText(record.studyTitleObserved) &&
    hasObservedText(record.objectiveObserved) &&
    record.artifacts.some(
      (artifact) => artifact.role === "EDITABLE_TEXT_SOURCE",
    );

  const readyForDraftMaterialization =
    validation.valid &&
    record.governance.finalJourney2030TextApproved &&
    authorDisplayDecisionResolved(
      record.governance.publicAuthorDisplayAuthorization,
    ) &&
    hasGovernedIdentity(record.governance) &&
    !record.governance.draftPackageMaterialized;

  const readyForPublication =
    validation.valid &&
    record.governance.draftPackageMaterialized &&
    record.governance.draftValidated &&
    record.governance.publicationApproval ===
      "AUTHORIZED_BY_SEPARATE_EDITORIAL_DECISION";

  return {
    intakeValid: validation.valid,
    readyForEditorialAdaptation,
    readyForDraftMaterialization,
    readyForPublication,
    blockers,
  };
}

export const michaelCollaborativeGoldenModel: CollaborativeStudyIntakeRecord = {
  fixtureLabel: "MICHAEL_CURRENT_SINGLE_SUBMISSION_CANDIDATE",
  trackNumber: COLLABORATIVE_STUDY_TRACK_NUMBER,
  trackName: COLLABORATIVE_STUDY_TRACK_NAME,
  targetProfile: COLLABORATIVE_STUDY_TARGET_PROFILE,
  contributorNameObserved: "Michael Batista da Silva",
  studyTitleObserved: "A OBRA REDENTORA DE CRISTO E O PLANO DA SALVAÇÃO",
  textPrincipalObserved: "João 3:16; Romanos 3:23-24; Efésios 2:8-9",
  objectiveObserved:
    "Compreender, à luz das Escrituras, o plano de Deus para salvar o ser humano por meio de Jesus Cristo.",
  artifacts: [
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
  ],
  sourceFamilyInterpretation:
    "ONE_COLLABORATIVE_SUBMISSION_CANDIDATE_WITH_MULTIPLE_ARTIFACTS",
  pdfDocxTextualEquivalence: "UNRESOLVED_NOT_ASSERTED",
  observedStructure: {
    numberedSectionCount: 13,
    applicationQuestionCount: 6,
    hasApplicationFinal: true,
    hasCentralPhrase: true,
    nativeJourney2030Structure: false,
  },
  journey2030Mapping: [
    {
      field: "Tema",
      sourceObservation: "studyTitleObserved",
      status: "DIRECT_OBSERVED",
    },
    {
      field: "PerguntaCentral",
      sourceObservation: null,
      status: "NOT_EXPLICIT_REQUIRES_EDITORIAL_AUTHORING",
    },
    {
      field: "Objetivo",
      sourceObservation: "objectiveObserved",
      status: "DIRECT_OBSERVED",
    },
    {
      field: "TextoAureo",
      sourceObservation: null,
      status: "NOT_EXPLICIT_REQUIRES_EDITORIAL_AUTHORING",
    },
    {
      field: "VerdadePratica",
      sourceObservation: null,
      status: "NOT_EXPLICIT_REQUIRES_EDITORIAL_AUTHORING",
    },
    {
      field: "LeituraBiblica",
      sourceObservation: "textPrincipalObserved",
      status: "SOURCE_HAS_RELATED_MATERIAL_NOT_SILENTLY_RELABELED",
    },
    {
      field: "AntesDeEntender",
      sourceObservation: "1. INTRODUÇÃO",
      status: "SEMANTIC_CANDIDATE_REQUIRES_EDITORIAL_MAPPING",
    },
    {
      field: "OQueABibliaMostra",
      sourceObservation: "original numbered sections",
      status: "REQUIRES_EDITORIAL_RESTRUCTURING",
    },
    {
      field: "LeiaObserve",
      sourceObservation: null,
      status: "NOT_EXPLICIT_REQUIRES_EDITORIAL_AUTHORING",
    },
    {
      field: "OQuePrecisamosEntender",
      sourceObservation: "original numbered sections",
      status: "REQUIRES_EDITORIAL_RESTRUCTURING",
    },
    {
      field: "Compreenda",
      sourceObservation: "original explanatory prose",
      status: "SEMANTIC_CANDIDATE_REQUIRES_EDITORIAL_MAPPING",
    },
    {
      field: "ComoViverIsso",
      sourceObservation: "🙏 APLICAÇÃO FINAL",
      status: "SEMANTIC_CANDIDATE_REQUIRES_EDITORIAL_MAPPING",
    },
    {
      field: "Aplique",
      sourceObservation: "6 application questions",
      status: "SEMANTIC_CANDIDATE_REQUIRES_EDITORIAL_MAPPING",
    },
    {
      field: "Conclusao",
      sourceObservation: "13. CONCLUSÃO",
      status: "SEMANTIC_CANDIDATE_REQUIRES_EDITORIAL_MAPPING",
    },
    {
      field: "ParaContinuar",
      sourceObservation: null,
      status: "NOT_EXPLICIT_REQUIRES_EDITORIAL_AUTHORING",
    },
    {
      field: "Referencias",
      sourceObservation: "biblical citations distributed through source text",
      status: "REQUIRES_EDITORIAL_EXTRACTION_AND_NORMALIZATION",
    },
  ],
  sourceElementsToPreserveOutsideForcedProfileMapping: [
    "🔥 FRASE CENTRAL DO ESTUDO",
  ],
  governance: {
    publicAuthorDisplayAuthorization:
      "UNRESOLVED_REQUIRES_EXPLICIT_AUTHORIZATION",
    finalJourney2030TextApproved: false,
    permanentStudyId: null,
    permanentSlug: null,
    permanentTrackPosition: null,
    draftPackageMaterialized: false,
    draftValidated: false,
    publicationApproval: "NO",
  },
};
