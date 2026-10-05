import {
  JOURNEY_20_30_REQUIRED_SECTION_TYPES,
  validateStudyContentPackage,
  validateStudyEditorialPackage,
} from "../src/studies/content/studyContentValidator";
import {
  track05DraftBatch01AuthorMetadata,
  track05DraftBatch01Package,
  track05DraftBatch01Provenance,
  track05DraftBatch01SourceMetadata,
} from "../src/studies/content/track05DraftBatch01";
import { studyReleaseManifest } from "../src/studies/release/studyReleaseManifest";
import { studyRuntimeCatalog } from "../src/studies/runtime/studyRuntimeCatalog";

const IDS = [
  "track-05-study-02",
  "track-05-study-03",
  "track-05-study-04",
  "track-05-study-05",
] as const;

describe("P17 A18-A11-A1 Track 05 collaborative Draft Batch 01", () => {
  it("locks the exact four-study DRAFT batch identity and order", () => {
    expect(track05DraftBatch01Package.contentVersion).toBe(
      "draft-track-05-studies-02-05-batch-01-v1",
    );
    expect(track05DraftBatch01Package.tracks).toHaveLength(1);
    expect(track05DraftBatch01Package.tracks[0]).toEqual(
      expect.objectContaining({
        id: "track-05",
        published: false,
      }),
    );

    expect(
      track05DraftBatch01Package.studies.map((study) => ({
        id: study.id,
        number: study.number,
        title: study.title,
        published: study.published,
        nextStudyId: study.nextStudyId,
      })),
    ).toEqual([
      {
        id: "track-05-study-02",
        number: 2,
        title: "A Suprema Excelência do Amor",
        published: false,
        nextStudyId: "track-05-study-03",
      },
      {
        id: "track-05-study-03",
        number: 3,
        title: "Jogue a Toalha: Como Jesus Nos Ensina a Servir",
        published: false,
        nextStudyId: "track-05-study-04",
      },
      {
        id: "track-05-study-04",
        number: 4,
        title:
          "Quando o Altar É Restaurado, o Céu Responde: Elias no Monte Carmelo",
        published: false,
        nextStudyId: "track-05-study-05",
      },
      {
        id: "track-05-study-05",
        number: 5,
        title: "A Salvação pela Graça: Um Presente Que Não Merecemos",
        published: false,
        nextStudyId: null,
      },
    ]);
  });

  it("passes editorial validation while remaining runtime-ineligible", () => {
    expect(validateStudyEditorialPackage(track05DraftBatch01Package)).toEqual({
      valid: true,
      issues: [],
    });

    const runtime = validateStudyContentPackage(track05DraftBatch01Package);
    expect(runtime.valid).toBe(false);
    const codes = runtime.issues.map((issue) => issue.code);
    expect(codes).toContain("TRACK_UNPUBLISHED");
    expect(codes).toContain("STUDY_UNPUBLISHED");
  });

  it("contains every required Journey section and one internal editorial note per study", () => {
    for (const studyId of IDS) {
      const sections = track05DraftBatch01Package.sections.filter(
        (section) => section.studyId === studyId,
      );
      const types = new Set(sections.map((section) => section.type));

      for (const requiredType of JOURNEY_20_30_REQUIRED_SECTION_TYPES) {
        expect(types.has(requiredType)).toBe(true);
      }

      expect(
        sections.filter((section) => section.type === "EDITORIAL_NOTE"),
      ).toHaveLength(1);

      expect(
        sections
          .filter((section) => section.type === "EDITORIAL_NOTE")
          .every((section) => section.optional),
      ).toBe(true);
    }
  });

  it("locks only the author metadata explicitly supported by the curated sources", () => {
    expect(track05DraftBatch01AuthorMetadata).toEqual([
      {
        studyId: "track-05-study-02",
        displayName: "Neterson",
        roles: ["Presbítero"],
        formations: [],
        cityState: null,
        publicDisplayAuthorization: "UNRESOLVED",
      },
      {
        studyId: "track-05-study-03",
        displayName: "Adriel Jackson Batista de Oliveira",
        roles: ["Evangelista"],
        formations: ["Pedagogo"],
        cityState: null,
        publicDisplayAuthorization: "UNRESOLVED",
      },
      {
        studyId: "track-05-study-04",
        displayName: "Eliete Alves",
        roles: ["Líder do ministério de mulheres"],
        formations: ["Pedagoga"],
        cityState: null,
        publicDisplayAuthorization: "UNRESOLVED",
      },
      {
        studyId: "track-05-study-05",
        displayName: "Hélio Nascimento Sousa",
        roles: ["Presbítero", "Professor de Escola Bíblica"],
        formations: [],
        cityState: null,
        publicDisplayAuthorization: "UNRESOLVED",
      },
    ]);
  });

  it("locks the exact four audited MD/PDF provenance pairs", () => {
    expect(track05DraftBatch01Provenance).toEqual([
      {
        studyId: "track-05-study-02",
        md: {
          fileName: "Trilha5_A_suprema_excelencia_do_amor_curadoria.md",
          sha256:
            "BA9070A0141E1E90D382F30D2B894E5D02FDF9CEE83DA3E3B2C37B9CF1E7EF33",
        },
        pdf: {
          fileName:
            "Estudo bíblico_ A suprema excelência do amor pr. neterson.pdf",
          sha256:
            "7F1F2DB183547290F7C6F95C56A6850C749AEB63105CCE2B4CAB595DB9E3728F",
        },
        governanceStatus: "DRAFT",
      },
      {
        studyId: "track-05-study-03",
        md: {
          fileName: "Trilha5_Jogue_a_Toalha_curadoria.md",
          sha256:
            "E48E18FFA49EF0FD8FAEDAAAE354035441AAB74706C690609B6E6543328774A4",
        },
        pdf: {
          fileName: "JOGUE A TOALHA - REFLEXAO ADRIEL JACKSON.pdf",
          sha256:
            "AED6EB34C68DDA6599A9BDAAC15668EABCAF8BFA5278256F3D5E7822DD825C2A",
        },
        governanceStatus: "DRAFT",
      },
      {
        studyId: "track-05-study-04",
        md: {
          fileName: "Trilha5_Quando_o_Altar_e_Restaurado_curadoria.md",
          sha256:
            "A8FC7C05B9343B296372EA7B9D73A6F5871739B7E8038AA194C60C2A20BB1EEC",
        },
        pdf: {
          fileName: "estudo_eliete.pdf",
          sha256:
            "3B9DBEC2E18F63BEF287626AC28A51DFA4D3CC87C1FA247E7432B1C985529282",
        },
        governanceStatus: "DRAFT",
      },
      {
        studyId: "track-05-study-05",
        md: {
          fileName: "Trilha5_A_Salvacao_pela_Graca_curadoria.md",
          sha256:
            "65A20B8DF3242B6184E5E128102E595966E56158882FCF4E38DB30AFCBE68E1F",
        },
        pdf: {
          fileName: "Estudo_A_Salvacao_pela_Graca_PB_HELIO.pdf",
          sha256:
            "5497FD95E95D3E4C47205E276D2BBDEA6D9B2E4F8CD3ECCF71E167F3E08555B8",
        },
        governanceStatus: "DRAFT",
      },
    ]);
  });

  it("preserves the unresolved governance evidence inside internal editorial notes", () => {
    const editorialText = (studyId: string) =>
      track05DraftBatch01Package.sections
        .filter(
          (section) =>
            section.studyId === studyId && section.type === "EDITORIAL_NOTE",
        )
        .flatMap((section) => section.blocks)
        .map((block) => ("text" in block ? block.text : ""))
        .join("\n")
        .toLocaleLowerCase("pt-BR");

    expect(editorialText("track-05-study-02")).toContain("nome do autor");
    expect(editorialText("track-05-study-02")).toContain("unresolved");

    expect(editorialText("track-05-study-03")).toContain(
      "autorização de exibição pública do nome",
    );

    expect(editorialText("track-05-study-04")).toContain("condensação");

    expect(editorialText("track-05-study-05")).toContain(
      "sobreposição temática",
    );

    for (const studyId of IDS) {
      expect(editorialText(studyId)).toContain("revisão teológica");
    }
  });

  it("maps Reflect and Apply only from existing curated source material", () => {
    const allowedStrategies = new Set([
      "III_QUESTION_SPLIT",
      "CENTRAL_QUESTION_FALLBACK",
    ]);

    expect(track05DraftBatch01SourceMetadata).toHaveLength(4);

    for (const item of track05DraftBatch01SourceMetadata) {
      expect(allowedStrategies.has(item.reflectionStrategy)).toBe(true);
    }

    expect(
      track05DraftBatch01SourceMetadata.some(
        (item) =>
          item.reflectionStrategy === "CENTRAL_QUESTION_FALLBACK",
      ),
    ).toBe(true);
  });

  it("publishes approved copies of Batch 01 without promoting the raw DRAFT", () => {
    const releasedIds = studyReleaseManifest.flatMap((entry) =>
      entry.contentPackage.studies.map((study) => study.id),
    );
    const runtimeIds = studyRuntimeCatalog.studies.map(
      (entry) => entry.content.id,
    );

    for (const id of IDS) {
      expect(releasedIds).toContain(id);
      expect(runtimeIds).toContain(id);
    }
  });
});
