import { createHash } from "crypto";

import { track01DraftBatchPackage } from "../src/studies/content/track01DraftBatch";
import { track02DraftBatchPackage } from "../src/studies/content/track02DraftBatch";
import { track02Study01DraftPackage } from "../src/studies/content/track02Study01Draft";
import { track03DraftBatchPackage } from "../src/studies/content/track03DraftBatch";
import { track04DraftBatchPackage } from "../src/studies/content/track04DraftBatch";
import {
  track05Study01Draft,
  track05Study01PublicAuthor,
} from "../src/studies/content/track05Study01Draft";
import { track05DraftBatch01Package } from "../src/studies/content/track05DraftBatch01";
import { track05DraftBatch02Package } from "../src/studies/content/track05DraftBatch02";
import { track06DraftBatchPackage } from "../src/studies/content/track06DraftBatch";
import { validateStudyContentPackage } from "../src/studies/content/studyContentValidator";
import {
  studyReleaseManifest,
  track02ReleaseSourcePackage,
  track05ReleaseSourcePackage,
} from "../src/studies/release/studyReleaseManifest";
import {
  getRuntimeStudyById,
  getRuntimeStudyCountForTrack,
  studyRuntimeCatalog,
} from "../src/studies/runtime/studyRuntimeCatalog";

const APPROVED_FINGERPRINT =
  "A3418548E5CCB79969DE8E88F16277E46AD24D01452DEF2168984E887D024198";

const EXPECTED_PER_TRACK = new Map([
  ["track-01", 18],
  ["track-02", 10],
  ["track-03", 19],
  ["track-04", 18],
  ["track-05", 9],
  ["track-06", 10],
]);

const approvedInventoryFingerprint = (): string => {
  const inventory = studyReleaseManifest
    .flatMap((entry) => entry.contentPackage.studies)
    .map((study) => ({
      trackId: study.trackId,
      number: Number(study.number),
      id: study.id,
      slug: study.slug,
      title: study.title,
    }))
    .sort(
      (left, right) =>
        left.trackId.localeCompare(right.trackId) ||
        left.number - right.number ||
        left.id.localeCompare(right.id),
    );

  return createHash("sha256")
    .update(JSON.stringify(inventory))
    .digest("hex")
    .toUpperCase();
};

describe("studyReleaseManifest", () => {
  it("declares exactly the six approved release packages without mutating source content", () => {
    expect(studyReleaseManifest).toHaveLength(6);
    expect(studyReleaseManifest.map((entry) => entry.contentPackage.studies.length)).toEqual([
      18,
      10,
      19,
      18,
      9,
      10,
    ]);

    expect(track01DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track02Study01DraftPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track02DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track03DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track04DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track05Study01Draft.studies.every((study) => !study.published)).toBe(true);
    expect(track06DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
  });

  it("keeps internal EDITORIAL_NOTE in source while stripping it from the published runtime package", () => {
    const sourceEditorialNotes = track05Study01Draft.sections.filter(
      (section) => section.type === "EDITORIAL_NOTE",
    );
    const releasedTrack05 = studyReleaseManifest.find((entry) =>
      entry.contentPackage.studies.some(
        (study) => study.id === "track-05-study-01",
      ),
    );

    expect(sourceEditorialNotes).toHaveLength(1);
    expect(releasedTrack05).toBeDefined();
    expect(
      releasedTrack05?.contentPackage.sections.some(
        (section) => section.type === "EDITORIAL_NOTE",
      ),
    ).toBe(false);
    expect(releasedTrack05?.contentPackage.sections).toHaveLength(
      track05ReleaseSourcePackage.sections.filter(
        (section) => section.type !== "EDITORIAL_NOTE",
      ).length,
    );
    expect(
      releasedTrack05?.contentPackage.references.every((reference) =>
        releasedTrack05.contentPackage.sections.some(
          (section) => section.id === reference.sectionId,
        ),
      ),
    ).toBe(true);
  });
  it("materializes every released package as runtime-valid published content", () => {
    for (const entry of studyReleaseManifest) {
      expect(entry.contentPackage.tracks.every((track) => track.published)).toBe(true);
      expect(entry.contentPackage.studies.every((study) => study.published)).toBe(true);
      expect(validateStudyContentPackage(entry.contentPackage).valid).toBe(true);
    }
  });

  it("composes Track 02 studies 01-10 before publication", () => {
    expect(track02ReleaseSourcePackage.tracks).toHaveLength(1);
    expect(track02ReleaseSourcePackage.studies).toHaveLength(10);
    expect(track02ReleaseSourcePackage.sections).toHaveLength(242);
    expect(track02ReleaseSourcePackage.references).toHaveLength(0);

    expect(
      [...track02ReleaseSourcePackage.studies]
        .sort((left, right) => left.number - right.number)
        .map((study) => study.number),
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("reconciles the published Track 04 invitation with the actual first collaborative study while preserving its draft", () => {
    const sectionId = "track-04-study-18-continue-journey-17";
    const sourceSection = track04DraftBatchPackage.sections.find((section) => section.id === sectionId)!;
    const releasedTrack04 = studyReleaseManifest.find((entry) => entry.contentPackage.studies.some((study) => study.id === "track-04-study-18"))!;
    const publishedSection = releasedTrack04.contentPackage.sections.find((section) => section.id === sectionId)!;
    const firstCollaborativeStudy = getRuntimeStudyById("track-05-study-01")!.content;
    const publishedText = JSON.stringify(publishedSection.blocks);

    expect(JSON.stringify(sourceSection.blocks)).toContain("Primeiro estudo: O que é a Igreja?");
    expect(publishedText).toContain(`Primeiro estudo: ${firstCollaborativeStudy.title}`);
    expect(publishedText).toContain(`Pergunta de abertura: ${firstCollaborativeStudy.questionCentral}`);
    expect(publishedText).toContain("Próxima trilha - Trilha 5: Estudos Colaborativos");
    expect(publishedText).not.toContain("Primeiro estudo: O que é a Igreja?");
    expect(publishedText).not.toContain("Pergunta de abertura: A Igreja é um prédio");
    const { blocks: sourceBlocks, ...sourceMetadata } = sourceSection;
    const { blocks: publishedBlocks, ...publishedMetadata } = publishedSection;
    expect(sourceBlocks.length - publishedBlocks.length).toBe(1);
    expect(publishedMetadata).toEqual(sourceMetadata);
    expect(releasedTrack04.contentPackage.sections.filter((section) => section.id !== sectionId))
      .toEqual(track04DraftBatchPackage.sections.filter((section) => section.id !== sectionId && section.type !== "EDITORIAL_NOTE"));
    expect(releasedTrack04.contentPackage.studies.map(({ published, ...study }) => ({ ...study, published: false })))
      .toEqual(track04DraftBatchPackage.studies);
    expect(releasedTrack04.contentPackage.references).toEqual(track04DraftBatchPackage.references);
    expect(validateStudyContentPackage(releasedTrack04.contentPackage).valid).toBe(true);
  });

  it("preserves the exact editorially approved 84-study fingerprint", () => {
    expect(approvedInventoryFingerprint()).toBe(APPROVED_FINGERPRINT);
  });

  it("exposes exactly 6 tracks and 84 studies with approved per-track counts", () => {
    expect(studyRuntimeCatalog.packages).toHaveLength(6);
    expect(studyRuntimeCatalog.tracks).toHaveLength(6);
    expect(studyRuntimeCatalog.studies).toHaveLength(84);

    for (const [trackId, expectedCount] of EXPECTED_PER_TRACK) {
      expect(getRuntimeStudyCountForTrack(trackId)).toBe(expectedCount);
    }
  });

  it("preserves the authorized Track 05 public author only for its released study", () => {
    const track05 = getRuntimeStudyById("track-05-study-01");
    expect(track05).not.toBeNull();
    expect(track05?.publicAuthorDisplayName).toBe(track05Study01PublicAuthor);

    expect(
      studyRuntimeCatalog.studies
        .filter((entry) => entry.content.trackId !== "track-05")
        .every((entry) => entry.publicAuthorDisplayName === null),
    ).toBe(true);
  });

  it("keeps runtime ids, slugs and next-study continuity unique", () => {
    const trackIds = studyRuntimeCatalog.tracks.map((track) => track.id);
    const studyIds = studyRuntimeCatalog.studies.map((entry) => entry.content.id);
    const studySlugs = studyRuntimeCatalog.studies.map((entry) => entry.content.slug);

    expect(new Set(trackIds).size).toBe(trackIds.length);
    expect(new Set(studyIds).size).toBe(studyIds.length);
    expect(new Set(studySlugs).size).toBe(studySlugs.length);

    for (const trackId of EXPECTED_PER_TRACK.keys()) {
      const studies = studyRuntimeCatalog.studies
        .map((entry) => entry.content)
        .filter((study) => study.trackId === trackId)
        .sort((left, right) => left.number - right.number);

      studies.forEach((study, index) => {
        expect(study.number).toBe(index + 1);
        expect(study.nextStudyId).toBe(
          index === studies.length - 1 ? null : studies[index + 1].id,
        );
      });
    }
  });
  it("carries only documented structured Track 05 public author identity", () => {
    const track05Entry = studyReleaseManifest.find((entry) =>
      entry.contentPackage.studies.some(
        (study) => study.id === "track-05-study-01",
      ),
    );

    expect(track05Entry).toBeDefined();
    expect(track05Entry?.publicAuthorDisplayName).toBe(
      track05Study01PublicAuthor,
    );
    expect(track05Entry?.publicAuthorProfile).toEqual({
      displayName: track05Study01PublicAuthor,
      role: "Presbítero",
      formation: null,
      cityState: "Rondonópolis/MT",
    });

    expect(
      studyReleaseManifest
        .filter((entry) => entry !== track05Entry)
        .every((entry) => entry.publicAuthorProfile === null),
    ).toBe(true);
  });
  it("recovers every actual central question and objective from the eight audited curated MDs", () => {
    const expected = {
    "track-05-study-02": {
        "questionCentral": "O que significa amar como Paulo descreve em 1 Coríntios 13, e por que esse amor é insubstituível na vida cristã?",
        "objective": "Compreender que o amor é o fundamento da vida cristã e deve orientar nossos dons, palavras, relacionamentos e atitudes."
    },
    "track-05-study-03": {
        "questionCentral": "O que significa realmente \"jogar a toalha\", à luz do exemplo de Jesus na última ceia?",
        "objective": "Compreender, a partir do exemplo de Jesus em Lucas 22 e João 13, que \"jogar a toalha\" na vida cristã não é desistir da luta, mas desistir da disputa pelo primeiro lugar para servir como Ele serviu."
    },
    "track-05-study-04": {
        "questionCentral": "Por que Deus pediu que Elias restaurasse o altar antes de pedir que o fogo descesse — e o que isso revela sobre a ordem entre restauração e resposta na nossa vida?",
        "objective": "Compreender, a partir de Elias no Monte Carmelo (1 Reis 18), que a resposta de Deus costuma vir depois da restauração do altar — da nossa entrega e comunhão com Ele — e não antes."
    },
    "track-05-study-05": {
        "questionCentral": "Por que a salvação é chamada de \"graça\", e o que isso muda na forma como vivemos depois de salvos?",
        "objective": "Compreender que a salvação é um presente gratuito de Deus, recebido pela fé e não pelas obras, e entender como essa graça deve transformar a vida de quem a recebe."
    },
    "track-05-study-06": {
        "questionCentral": "Balaão era profeta do Senhor?",
        "objective": "Compreender, a partir da história de Balaão (Números 22–24), que ter dom espiritual, conhecimento bíblico ou capacidade de ouvir a voz de Deus não substitui um coração verdadeiramente rendido e obediente a Ele."
    },
    "track-05-study-07": {
        "questionCentral": "Quando alguém ao nosso redor começa a afundar, por que muitas vezes ninguém estende a mão — e onde está o Senhor nesses momentos?",
        "objective": "Compreender, a partir do episódio de Pedro andando sobre as águas (Mateus 14), que a fé nos chama a arriscar fora da barca, e que a mesma mão que socorreu Pedro nos chama hoje a socorrer os que estão ao nosso redor."
    },
    "track-05-study-08": {
        "questionCentral": "Como reconhecer os sinais da exaustão pastoral e cuidar de si mesmo sem abandonar o chamado?",
        "objective": "Reconhecer os sinais precoces da exaustão pastoral, entender suas causas mais comuns e aprender atitudes práticas para preveni-la e enfrentá-la, à luz do chamado bíblico ao cuidado de si mesmo."
    },
    "track-05-study-09": {
        "questionCentral": "Quais são os diferentes juízos que a Bíblia apresenta, e o que eles significam para quem já está em Cristo e para quem ainda não creu?",
        "objective": "Compreender, à luz das Escrituras, que haverá juízo para toda a humanidade, e identificar o que é o Tribunal de Cristo — o juízo que diz respeito especificamente a todo aquele que já é salvo."
    }
};
    for (const study of track05ReleaseSourcePackage.studies.slice(1)) {
      expect({ questionCentral: study.questionCentral, objective: study.objective })
        .toEqual(expected[study.id as keyof typeof expected]);
    }
    expect(track05Study01Draft.studies[0].nextStudyId).toBeNull();
    expect(getRuntimeStudyById("track-05-study-01")?.content.nextStudyId)
      .toBe("track-05-study-02");
  });

  it("removes only intake annotations while retaining interpretation cautions and concrete content", () => {
    for (let number = 2; number <= 9; number++) {
      const studyId = `track-05-study-${String(number).padStart(2, "0")}`;
      const sections = track05ReleaseSourcePackage.sections.filter(
        (section) => section.studyId === studyId && section.type !== "EDITORIAL_NOTE",
      );
      expect(sections.length).toBeGreaterThan(0);
      expect(sections.every((section) => section.blocks.length > 0)).toBe(true);
      const publicText = JSON.stringify(sections);
      expect(publicText).not.toMatch(/\(editorial\)|\(criad[ao] editorialmente|a definir — próximo estudo|"text":"---"/);
    }
    const sourceCautions = [
      ...track05DraftBatch01Package.sections,
      ...track05DraftBatch02Package.sections,
    ].filter((section) => section.type === "INTERPRETATION_CAUTION");
    expect(sourceCautions.map((section) => section.studyId)).toEqual([
      "track-05-study-02",
      "track-05-study-03",
      "track-05-study-04",
      "track-05-study-05",
      "track-05-study-06",
      "track-05-study-07",
      "track-05-study-09",
    ]);
    const expectedPublicCautions = sourceCautions.map((section) => ({
      ...section,
      blocks: section.blocks.map((block) => {
        if (section.studyId !== "track-05-study-06" || !("text" in block)) {
          return block;
        }
        return {
          ...block,
          text: block.text.replace(
            "(quase inteiramente a partir da reflexão que o próprio autor já fez no material original)",
            "",
          ).trim(),
        };
      }),
    }));
    const releasedTrack05 = studyReleaseManifest.find((entry) =>
      entry.contentPackage.studies.some((study) => study.id === "track-05-study-01"),
    );
    expect(releasedTrack05).toBeDefined();
    expect(releasedTrack05?.contentPackage.sections.filter(
      (section) => section.studyId !== "track-05-study-01" &&
        section.type === "INTERPRETATION_CAUTION",
    )).toEqual(expectedPublicCautions);

    const eschatology = track05ReleaseSourcePackage.sections.find(
      (section) => section.studyId === "track-05-study-09" && section.type === "DEEPEN",
    );
    expect(JSON.stringify(eschatology)).toContain("não a única");
    expect(JSON.stringify(eschatology)).toContain("Julgamento de Israel");
  });

});
