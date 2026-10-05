import {
  JOURNEY_20_30_REQUIRED_SECTION_TYPES,
  validateStudyContentPackage,
  validateStudyEditorialPackage,
} from "../src/studies/content/studyContentValidator";
import {
  track05DraftBatch02AuthorMetadata,
  track05DraftBatch02Package,
  track05DraftBatch02Provenance,
  track05DraftBatch02SourceMetadata,
} from "../src/studies/content/track05DraftBatch02";
import { studyReleaseManifest } from "../src/studies/release/studyReleaseManifest";
import { studyRuntimeCatalog } from "../src/studies/runtime/studyRuntimeCatalog";

const IDS = [
  "track-05-study-06",
  "track-05-study-07",
  "track-05-study-08",
  "track-05-study-09",
] as const;

describe("P17 A18-A12-A1 Track 05 collaborative Draft Batch 02", () => {
  it("locks the exact four-study DRAFT batch identity and order", () => {
    expect(track05DraftBatch02Package.contentVersion).toBe(
      "draft-track-05-studies-06-09-batch-02-v1",
    );
    expect(track05DraftBatch02Package.tracks).toHaveLength(1);
    expect(track05DraftBatch02Package.tracks[0]).toEqual(
      expect.objectContaining({
        id: "track-05",
        published: false,
      }),
    );

    expect(
      track05DraftBatch02Package.studies.map((study) => ({
        id: study.id,
        number: study.number,
        title: study.title,
        published: study.published,
        nextStudyId: study.nextStudyId,
      })),
    ).toEqual([
      {
        id: "track-05-study-06",
        number: 6,
        title: "Balaão: Quando Deus Usa uma Boca, mas o Coração Não Está Rendido",
        published: false,
        nextStudyId: "track-05-study-07",
      },
      {
        id: "track-05-study-07",
        number: 7,
        title: "Cadê Pedro? Fé para Caminhar, Mãos para Socorrer",
        published: false,
        nextStudyId: "track-05-study-08",
      },
      {
        id: "track-05-study-08",
        number: 8,
        title: "Exaustão Pastoral: Sinais Precoces e Como Preveni-la",
        published: false,
        nextStudyId: "track-05-study-09",
      },
      {
        id: "track-05-study-09",
        number: 9,
        title: "Você Será Julgado: Os Diferentes Juízos nas Escrituras",
        published: false,
        nextStudyId: null,
      },
    ]);
  });

  it("passes editorial validation while remaining runtime-ineligible", () => {
    expect(validateStudyEditorialPackage(track05DraftBatch02Package)).toEqual({
      valid: true,
      issues: [],
    });

    const runtime = validateStudyContentPackage(track05DraftBatch02Package);
    expect(runtime.valid).toBe(false);
    const codes = runtime.issues.map((issue) => issue.code);
    expect(codes).toContain("TRACK_UNPUBLISHED");
    expect(codes).toContain("STUDY_UNPUBLISHED");
  });

  it("contains every required Journey section and one internal editorial note per study", () => {
    for (const studyId of IDS) {
      const sections = track05DraftBatch02Package.sections.filter(
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

  it("locks only the authorized author metadata and invents no city or state", () => {
    expect(track05DraftBatch02AuthorMetadata).toEqual([
      {
        studyId: "track-05-study-06",
        displayName: "Pr. Nelson",
        roles: [],
        formations: [],
        cityState: null,
        publicDisplayAuthorization: "UNRESOLVED",
      },
      {
        studyId: "track-05-study-07",
        displayName: "Adriel Jackson Batista de Oliveira",
        roles: ["Evangelista"],
        formations: ["Pedagogo"],
        cityState: null,
        publicDisplayAuthorization: "UNRESOLVED",
      },
      {
        studyId: "track-05-study-08",
        displayName: "Sidinei Rodrigues de Souza",
        roles: ["Pastor"],
        formations: [],
        cityState: null,
        publicDisplayAuthorization: "UNRESOLVED",
      },
      {
        studyId: "track-05-study-09",
        displayName: "Adriel Jackson Batista de Oliveira",
        roles: ["Evangelista"],
        formations: ["Pedagogo"],
        cityState: null,
        publicDisplayAuthorization: "UNRESOLVED",
      },
    ]);
  });

  it("locks the exact four audited MD/PDF provenance pairs", () => {
    expect(track05DraftBatch02Provenance).toEqual([
      {
        studyId: "track-05-study-06",
        md: {
          fileName: "Trilha5_Balaao_curadoria.md",
          sha256:
            "A3743F1A26D573799E0E684B9DA0EC037D45192810EDA642D3ABA6C57BEE339E",
        },
        pdf: {
          fileName: "ESTUDO BÍBLICO Balaão_ pastor_Nelson.pdf",
          sha256:
            "84F065F9FF1C2142A8FA44E2106CF9E39ADAE7618934016E0542D619C2596CE1",
        },
        governanceStatus: "DRAFT",
      },
      {
        studyId: "track-05-study-07",
        md: {
          fileName: "Trilha5_Cade_Pedro_curadoria.md",
          sha256:
            "8C2D6F4EA7872717EF88B4AEBAA261BDB501FB03946B0CA06CAAFD64B0B4CD78",
        },
        pdf: {
          fileName: "CADÊ PEDRO_adriel.pdf",
          sha256:
            "A19F8C4712E6F4809308C2B006B23440F383A6FF1329318755335DCFCB2E6041",
        },
        governanceStatus: "DRAFT",
      },
      {
        studyId: "track-05-study-08",
        md: {
          fileName: "Trilha5_Exaustao_Pastoral_curadoria.md",
          sha256:
            "16357E2D8CFF23F82710BE25BCDC45E3A7475F41361FF228D2FADB885CDF0ED6",
        },
        pdf: {
          fileName: "EXAUSTÃO PASTORAL - Sidney.pdf",
          sha256:
            "5C09224FB82F892B5CFE83646287ADB4EFFA6BA7008C4326A5707AE4B717463A",
        },
        governanceStatus: "DRAFT",
      },
      {
        studyId: "track-05-study-09",
        md: {
          fileName: "Trilha5_Voce_Sera_Julgado_curadoria.md",
          sha256:
            "5E8BC826EEA120C19EBCBBB880666FC1594496838E61D75793E413A9AB6347B5",
        },
        pdf: {
          fileName: "VOCÊ SERÁ JULGADO-adriel.pdf",
          sha256:
            "F0E910BA78327BCA500EE8F7F6A0416A3E72A965364B8C1A27E1D87025D1FB7B",
        },
        governanceStatus: "DRAFT",
      },
    ]);
  });

  it("preserves every authorized unresolved governance blocker internally", () => {
    const editorialText = (studyId: string) =>
      track05DraftBatch02Package.sections
        .filter(
          (section) =>
            section.studyId === studyId && section.type === "EDITORIAL_NOTE",
        )
        .flatMap((section) => section.blocks)
        .map((block) => ("text" in block ? block.text : ""))
        .join("\n")
        .toLocaleLowerCase("pt-BR");

    expect(editorialText("track-05-study-06")).toContain(
      "balaão manda jezabel entrar em ação",
    );
    expect(editorialText("track-05-study-06")).toContain(
      "generalização sobre pastores que abrem",
    );
    expect(editorialText("track-05-study-06")).toContain(
      "nome completo do autor e autorização de exibição pública",
    );

    expect(editorialText("track-05-study-07")).toContain("jo 6.48-49");
    expect(editorialText("track-05-study-07")).toContain("unresolved");

    expect(editorialText("track-05-study-08")).toContain(
      "fundamentação bíblica geral",
    );
    expect(editorialText("track-05-study-08")).toContain(
      "apenas 1 referência bíblica direta",
    );

    expect(editorialText("track-05-study-09")).toContain(
      "pluralidade de visões escatológicas",
    );
    expect(editorialText("track-05-study-09")).toContain("zibord/ciro sanche");
    expect(editorialText("track-05-study-09")).toContain("## nota editorial");
    expect(editorialText("track-05-study-09")).toContain(
      "## referência editorial",
    );

    for (const studyId of IDS) {
      expect(editorialText(studyId)).toContain("revisão teológica");
    }
  });

  it("maps Connect, Reflect and Apply only from existing curated source material", () => {
    expect(
      track05DraftBatch02SourceMetadata.map((item) => ({
        studyId: item.studyId,
        connectStrategy: item.connectStrategy,
        reflectionStrategy: item.reflectionStrategy,
      })),
    ).toEqual([
      {
        studyId: "track-05-study-06",
        connectStrategy: "EXPLICIT_CONNECT_MARKER",
        reflectionStrategy: "CENTRAL_QUESTION_FALLBACK",
      },
      {
        studyId: "track-05-study-07",
        connectStrategy: "EXPLICIT_CONNECT_MARKER",
        reflectionStrategy: "CENTRAL_QUESTION_FALLBACK",
      },
      {
        studyId: "track-05-study-08",
        connectStrategy: "CONCLUSION_FALLBACK",
        reflectionStrategy: "CENTRAL_QUESTION_FALLBACK",
      },
      {
        studyId: "track-05-study-09",
        connectStrategy: "EXPLICIT_CONNECT_MARKER",
        reflectionStrategy: "CENTRAL_QUESTION_FALLBACK",
      },
    ]);

    expect(
      track05DraftBatch02SourceMetadata.find(
        (item) => item.studyId === "track-05-study-09",
      )?.internalGovernanceHeadings,
    ).toEqual(["NOTA EDITORIAL", "REFERÊNCIA EDITORIAL"]);
  });

  it("publishes approved copies of Batch 02 and excludes Mulher Samaritana", () => {
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

    expect(
      track05DraftBatch02Package.studies.some((study) =>
        study.title.includes("Samaritana"),
      ),
    ).toBe(false);
  });
});
