import type {
  StudyContentBlock,
  StudySectionType,
} from "../src/domain/studies/study";
import {
  JOURNEY_20_30_REQUIRED_SECTION_TYPES,
  validateStudyContentPackage,
  validateStudyEditorialPackage,
} from "../src/studies/content/studyContentValidator";
import {
  TRACK_02_STUDY_02_ID,
  track02Study01DraftEditorialSource,
  track02Study01DraftPackage,
} from "./fixtures/studies/track02Study01Draft.fixture";

describe("real Study content fixture - Track 2 Study 01 draft", () => {
  it("locks the exact editorial source identity and DRAFT status", () => {
    expect(track02Study01DraftEditorialSource).toEqual({
      fileName:
        "Biblia_Jornada_Trilha_2_Estudo_01_Deus_O_Criador_Modelo_Jornada_20_30.pdf",
      bytes: 952897,
      sha256:
        "175653279245D7BC43247D4E7E7D7D1CCAB953FB42876BDA79ADAC82ECFDDB4E",
      status: "DRAFT",
      statusDetail: "aguardando revisão bíblica e editorial",
      model: "Modelo Jornada - Estudo Bíblico 20-30 | Versão 1.0",
    });

    expect(track02Study01DraftPackage.studies).toHaveLength(1);
    expect(track02Study01DraftPackage.studies[0].published).toBe(false);
  });

  it("passes editorial validation without becoming runtime-publishable", () => {
    const editorialResult = validateStudyEditorialPackage(
      track02Study01DraftPackage,
    );
    const runtimeResult = validateStudyContentPackage(
      track02Study01DraftPackage,
    );

    expect(editorialResult).toEqual({
      valid: true,
      issues: [],
    });

    expect(runtimeResult.valid).toBe(false);
    expect(runtimeResult.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "STUDY_UNPUBLISHED",
          path: "studies[0].published",
        }),
      ]),
    );
  });

  it("keeps the official next-study link while editorial validation allows a partial fixture", () => {
    const [study] = track02Study01DraftPackage.studies;

    expect(study.nextStudyId).toBe(TRACK_02_STUDY_02_ID);

    const runtimeResult = validateStudyContentPackage(
      track02Study01DraftPackage,
    );

    expect(runtimeResult.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "NEXT_STUDY_NOT_FOUND",
          path: "studies[0].nextStudyId",
        }),
      ]),
    );
  });

  it("represents every required Jornada block plus the optional blocks present in the PDF", () => {
    const types = track02Study01DraftPackage.sections.map(
      (section) => section.type,
    );
    const typeSet = new Set<StudySectionType>(types);

    for (const requiredType of JOURNEY_20_30_REQUIRED_SECTION_TYPES) {
      expect(typeSet.has(requiredType)).toBe(true);
    }

    expect(typeSet.has("INTERPRETATION_CAUTION")).toBe(true);
    expect(typeSet.has("DEEPEN")).toBe(true);
    expect(typeSet.has("REFERENCES")).toBe(true);
    expect(typeSet.has("EDITORIAL_NOTE")).toBe(true);
    expect(track02Study01DraftPackage.sections).toHaveLength(22);
  });

  it("uses all five approved structured content block types", () => {
    const blockTypes = new Set<StudyContentBlock["type"]>();

    for (const section of track02Study01DraftPackage.sections) {
      for (const block of section.blocks) {
        blockTypes.add(block.type);
      }
    }

    expect([...blockTypes].sort()).toEqual(
      [
        "BULLET_LIST",
        "CALLOUT",
        "NUMBERED_LIST",
        "PARAGRAPH",
        "SUBHEADING",
      ].sort(),
    );
  });

  it("preserves the core source text and the 24-28 minute editorial estimate", () => {
    const [study] = track02Study01DraftPackage.studies;

    expect(study.title).toBe("Deus, o Criador");
    expect(study.summary).toBe("Aquele de quem tudo começa");
    expect(study.questionCentral).toBe(
      "O que aprendemos sobre Deus quando a Bíblia o apresenta como Criador?",
    );
    expect(study.objective).toBe(
      "Reconhecer Deus como aquele que existe antes de todas as coisas, cria com autoridade, sustenta sua criação e dá à vida humana dignidade, responsabilidade e direção.",
    );
    expect(study.estimatedMinutes).toEqual({
      minimum: 24,
      maximum: 28,
    });

    const goldenText = track02Study01DraftPackage.sections.find(
      (section) => section.type === "GOLDEN_TEXT",
    );
    const practicalTruth = track02Study01DraftPackage.sections.find(
      (section) => section.type === "PRACTICAL_TRUTH",
    );
    const continueJourney = track02Study01DraftPackage.sections.find(
      (section) => section.type === "CONTINUE_JOURNEY",
    );

    expect(goldenText?.blocks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "PARAGRAPH",
          text: "“No princípio, criou Deus os céus e a terra.” - Gênesis 1:1",
        }),
      ]),
    );

    expect(practicalTruth?.blocks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "PARAGRAPH",
          text: "Reconhecer Deus como Criador é compreender que nossa vida não começou em nós mesmos: recebemos dele existência, dignidade, responsabilidade e propósito.",
        }),
      ]),
    );

    expect(continueJourney?.blocks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: "CALLOUT",
          title: "Próximo estudo",
          text: expect.stringContaining(
            "Trilha 2 - Estudo 02: Deus Santo",
          ),
        }),
      ]),
    );
  });
});
