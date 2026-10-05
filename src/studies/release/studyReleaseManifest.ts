import { track01DraftBatchPackage } from "../content/track01DraftBatch";
import { track02DraftBatchPackage } from "../content/track02DraftBatch";
import { track02Study01DraftPackage } from "../content/track02Study01Draft";
import { track03DraftBatchPackage } from "../content/track03DraftBatch";
import { track04DraftBatchPackage } from "../content/track04DraftBatch";
import {
  track05Study01Draft,
  track05Study01PublicAuthor,
} from "../content/track05Study01Draft";
import {
  track05DraftBatch01Package,
  track05DraftBatch01AuthorMetadata,
} from "../content/track05DraftBatch01";
import {
  track05DraftBatch02Package,
  track05DraftBatch02AuthorMetadata,
} from "../content/track05DraftBatch02";
import type { StudyContentBlock, StudySection } from "../../domain/studies/study";
import { track06DraftBatchPackage } from "../content/track06DraftBatch";
import type { StudyContentPackage } from "../content/studyContentPackage";

export type StudyPublicAuthorProfile = Readonly<{
  displayName: string;
  role: string | null;
  formation: string | null;
  cityState: string | null;
}>;

export type StudyReleaseEntry = Readonly<{
  contentPackage: StudyContentPackage;
  publicAuthorDisplayName: string | null;
  publicAuthorProfile: StudyPublicAuthorProfile | null;
  publicAuthorProfilesByStudyId?: Readonly<Record<string, StudyPublicAuthorProfile>>;
}>;

export const track02ReleaseSourcePackage: StudyContentPackage = Object.freeze({
  contentVersion: "release-track-02-studies-01-10-source-composite-v1",
  tracks: track02Study01DraftPackage.tracks,
  studies: Object.freeze([
    ...track02Study01DraftPackage.studies,
    ...track02DraftBatchPackage.studies,
  ]),
  sections: Object.freeze([
    ...track02Study01DraftPackage.sections,
    ...track02DraftBatchPackage.sections,
  ]),
  references: Object.freeze([
    ...track02Study01DraftPackage.references,
    ...track02DraftBatchPackage.references,
  ]),
});

// Published copies recover the actual fields from the eight hash-locked curated MDs.
// The author-approved release (user confirmation 2026-10-02) supersedes historical
// DRAFT/UNRESOLVED intake notes without rewriting those audited source artifacts.
const TRACK05_CURATED_FIELDS: Readonly<Record<string, Readonly<{
  questionCentral: string;
  objective: string;
  primaryReading: string;
}>>> = Object.freeze({
  "track-05-study-02": {
    "questionCentral": "O que significa amar como Paulo descreve em 1 Coríntios 13, e por que esse amor é insubstituível na vida cristã?",
    "objective": "Compreender que o amor é o fundamento da vida cristã e deve orientar nossos dons, palavras, relacionamentos e atitudes.",
    "primaryReading": "1 Coríntios 13"
  },
  "track-05-study-03": {
    "questionCentral": "O que significa realmente \"jogar a toalha\", à luz do exemplo de Jesus na última ceia?",
    "objective": "Compreender, a partir do exemplo de Jesus em Lucas 22 e João 13, que \"jogar a toalha\" na vida cristã não é desistir da luta, mas desistir da disputa pelo primeiro lugar para servir como Ele serviu.",
    "primaryReading": "Lucas 22:7–13; Lucas 22:24–27; João 13:1–17"
  },
  "track-05-study-04": {
    "questionCentral": "Por que Deus pediu que Elias restaurasse o altar antes de pedir que o fogo descesse — e o que isso revela sobre a ordem entre restauração e resposta na nossa vida?",
    "objective": "Compreender, a partir de Elias no Monte Carmelo (1 Reis 18), que a resposta de Deus costuma vir depois da restauração do altar — da nossa entrega e comunhão com Ele — e não antes.",
    "primaryReading": "1 Reis 18:20–39"
  },
  "track-05-study-05": {
    "questionCentral": "Por que a salvação é chamada de \"graça\", e o que isso muda na forma como vivemos depois de salvos?",
    "objective": "Compreender que a salvação é um presente gratuito de Deus, recebido pela fé e não pelas obras, e entender como essa graça deve transformar a vida de quem a recebe.",
    "primaryReading": "Efésios 2:8–9; Romanos 5:8; Atos 16:31; 2 Coríntios 5:17; Tito 2:11–12"
  },
  "track-05-study-06": {
    "questionCentral": "Balaão era profeta do Senhor?",
    "objective": "Compreender, a partir da história de Balaão (Números 22–24), que ter dom espiritual, conhecimento bíblico ou capacidade de ouvir a voz de Deus não substitui um coração verdadeiramente rendido e obediente a Ele.",
    "primaryReading": "Números 22; Números 23; Números 24"
  },
  "track-05-study-07": {
    "questionCentral": "Quando alguém ao nosso redor começa a afundar, por que muitas vezes ninguém estende a mão — e onde está o Senhor nesses momentos?",
    "objective": "Compreender, a partir do episódio de Pedro andando sobre as águas (Mateus 14), que a fé nos chama a arriscar fora da barca, e que a mesma mão que socorreu Pedro nos chama hoje a socorrer os que estão ao nosso redor.",
    "primaryReading": "Mateus 14:22–33; Marcos 6:45–52"
  },
  "track-05-study-08": {
    "questionCentral": "Como reconhecer os sinais da exaustão pastoral e cuidar de si mesmo sem abandonar o chamado?",
    "objective": "Reconhecer os sinais precoces da exaustão pastoral, entender suas causas mais comuns e aprender atitudes práticas para preveni-la e enfrentá-la, à luz do chamado bíblico ao cuidado de si mesmo.",
    "primaryReading": "1 Timóteo 4:16"
  },
  "track-05-study-09": {
    "questionCentral": "Quais são os diferentes juízos que a Bíblia apresenta, e o que eles significam para quem já está em Cristo e para quem ainda não creu?",
    "objective": "Compreender, à luz das Escrituras, que haverá juízo para toda a humanidade, e identificar o que é o Tribunal de Cristo — o juízo que diz respeito especificamente a todo aquele que já é salvo.",
    "primaryReading": "2 Coríntios 5:9–10; Romanos 14:10–12; Apocalipse 20:11–15"
  }
});

const TRACK05_CURATION_ANNOTATIONS: readonly string[] = Object.freeze([
  "recomenda-se solicitar também a fonte editável — DOCX/TXT — conforme item 24 do padrão de curadoria; o PDF é tratado aqui apenas como artefato de revisão",
  "criada editorialmente — o material original não trazia uma pergunta central explícita",
  "escolhido editorialmente a partir da própria ênfase do autor na conclusão do estudo",
  "editorial",
  "editorial, seguindo a progressão observação → compreensão → prática",
  "a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria",
  "bio fornecida pelo próprio colaborador junto com o material",
  "criado editorialmente, a partir do argumento central do autor",
  "síntese editorial do argumento central do autor",
  "elaboradas editorialmente a partir do argumento do autor",
  "acrescentada editorialmente em Conecte e Aprofunde",
  "acrescentada editorialmente em Aprofunde",
  "mantido como a própria autora já havia definido",
  "criada editorialmente, a partir do argumento central da autora",
  "criado editorialmente",
  "frase da própria autora, praticamente literal",
  "frase-síntese da própria autora, praticamente literal",
  "selecionadas e adaptadas do exame de consciência que a própria autora já propunha no encerramento",
  "oração sugerida pela própria autora, quase literal",
  "já usada pela autora no encerramento; reaproveitada em Conecte",
  "acrescentada editorialmente em + Aprofunde, para contexto histórico",
  "criado editorialmente — o original só tinha o título geral e o cabeçalho \"VISÃO\"",
  "criada editorialmente",
  "frase do próprio autor, praticamente literal, extraída da conclusão",
  "frase praticamente literal do próprio autor",
  "elaboradas editorialmente a partir do conteúdo do autor",
  "oração do próprio autor, enviada para esta seção",
  "acrescentada editorialmente em Conecte",
  "sobrenome não informado no material recebido — apenas identificado pelo nome do arquivo e pela assinatura \"Pr. Nelson\"; confirmar com o colaborador",
  "mantido como o próprio autor já havia definido",
  "mantida como o próprio autor já havia definido",
  "criado editorialmente — o material original não trazia um objetivo formal",
  "frase do próprio autor, já presente na conclusão do original",
  "texto base",
  "quase inteiramente a partir da reflexão que o próprio autor já fez no material original",
  "o próprio autor faz aqui uma aplicação específica sobre ambição ministerial; preferi generalizar o princípio, sem presumir a motivação de quem inicia um novo ministério — ver Alerta de Curadoria acima",
  "frase do próprio autor, extraída da seção \"Fim de Balaão\"",
  "reorganizadas a partir das três \"reflexões pessoais\" que o próprio autor já havia espalhado pelo texto original",
  "editorial, incorporando a referência que o próprio autor já havia feito a Mateus 26:41",
  "acrescentada editorialmente em Aplique/Ore",
  "adaptado do próprio título do autor",
  "criada editorialmente, a partir da pergunta que dá nome ao próprio estudo",
  "síntese editorial de duas frases do próprio autor",
  "adaptado da própria frase do autor",
  "elaboradas editorialmente a partir das perguntas retóricas que o próprio autor já fazia",
  "relato paralelo; ver Alerta de Curadoria sobre a referência original \"Jo 6.48-49\"",
  "criado editorialmente, a partir do conteúdo e da conclusão do autor",
  "síntese editorial da conclusão do autor",
  "única referência bíblica presente no material recebido",
  "elaboradas editorialmente a partir dos sinais e causas apresentados pelo autor",
  "editorial, pensado para rodas de líderes/pastores; segue a progressão observação → compreensão → prática",
  "terceiro material recebido deste colaborador; bio já registrada nas curadorias anteriores: evangelista, casado com Monica Oliveira, pai de Adriel Filho e Aylla Helena, Pedagogo (UNICESUMAR), pós-graduando em Escatologia Bíblica (FEICS), pós-graduado em Docência Teológica do Ensino Superior (Faceminas), graduando em Teologia (UNICESUMAR)",
  "criada editorialmente, a partir das perguntas retóricas do próprio autor no início do texto",
  "agrupadas conforme os pontos do material original",
  "citada pelo próprio autor; grafia a confirmar"
]);

const stripTrack05CurationAnnotation = (text: string): string => {
  let publicText = text;
  for (const annotation of TRACK05_CURATION_ANNOTATIONS) {
    publicText = publicText.split(`(${annotation})`).join("");
  }
  return publicText.trim();
};

const projectTrack05PublicBlocks = (
  blocks: readonly StudyContentBlock[],
): readonly StudyContentBlock[] => Object.freeze(blocks.flatMap<StudyContentBlock>((block) => {
  if (block.type === "BULLET_LIST" || block.type === "NUMBERED_LIST") {
    const items = block.items.map(stripTrack05CurationAnnotation).filter(Boolean);
    return items.length ? [Object.freeze({ ...block, items: Object.freeze(items) })] : [];
  }
  const text = stripTrack05CurationAnnotation(block.text);
  if (!text || text === "---") {
    return [];
  }
  return [Object.freeze({ ...block, text })];
}));

const track05ReleaseStudies = Object.freeze([
  ...track05Study01Draft.studies,
  ...track05DraftBatch01Package.studies,
  ...track05DraftBatch02Package.studies,
].map((study, index, studies) => {
  const recovered = TRACK05_CURATED_FIELDS[study.id];
  return Object.freeze({
    ...study,
    ...(recovered ? {
      questionCentral: recovered.questionCentral,
      objective: recovered.objective,
    } : {}),
    nextStudyId: studies[index + 1]?.id ?? null,
  });
}));

const projectTrack05ReleaseSection = (section: StudySection): StudySection => {
  const recovered = TRACK05_CURATED_FIELDS[section.studyId];
  if (!recovered || section.type === "EDITORIAL_NOTE") {
    return section;
  }
  const publicBlocks = projectTrack05PublicBlocks(section.blocks);
  if (section.type === "CONTINUE_JOURNEY") {
    const current = track05ReleaseStudies.find((study) => study.id === section.studyId);
    const next = track05ReleaseStudies.find((study) => study.id === current?.nextStudyId);
    return Object.freeze({
      ...section,
      blocks: Object.freeze([Object.freeze({
        type: "PARAGRAPH" as const,
        text: next ? `Próximo estudo: ${next.title}` : "Continue explorando os estudos da Trilha 5.",
      })]),
    });
  }
  return Object.freeze({
    ...section,
    blocks: section.type === "BIBLE_READING" ? Object.freeze([
      Object.freeze({
        type: "PARAGRAPH" as const,
        text: `Leitura principal: ${recovered.primaryReading}`,
      }),
      ...publicBlocks,
    ]) : publicBlocks,
  });
};

export const track05ReleaseSourcePackage: StudyContentPackage = Object.freeze({
  contentVersion: "release-track-05-studies-01-09-source-composite-v1",
  tracks: track05Study01Draft.tracks,
  studies: track05ReleaseStudies,
  sections: Object.freeze([
    ...track05Study01Draft.sections,
    ...track05DraftBatch01Package.sections,
    ...track05DraftBatch02Package.sections,
  ].map(projectTrack05ReleaseSection)),
  references: Object.freeze([
    ...track05Study01Draft.references,
    ...track05DraftBatch01Package.references,
    ...track05DraftBatch02Package.references,
  ]),
});

const track05MichaelProfile: StudyPublicAuthorProfile = Object.freeze({
  displayName: track05Study01PublicAuthor,
  role: "Presbítero",
  formation: null,
  cityState: "Rondonópolis/MT",
});

// Public identities confirmed by the project owner; preserve historical intake metadata.
const track05ConfirmedPublicAuthorProfiles: Readonly<Record<string, StudyPublicAuthorProfile>> =
  Object.freeze({
    "track-05-study-02": Object.freeze({
      displayName: "Neterson Oliveira de Souza",
      role: "Presbítero/Dirigente de congregação",
      formation: null,
      cityState: "Pedra Preta/MT",
    }),
    "track-05-study-06": Object.freeze({
      displayName: "Nelson Ramos de Oliveira",
      role: "Pastor",
      formation: null,
      cityState: "Rondonópolis/MT",
    }),
  });

// Locality confirmed for these six published studies; preserve intake provenance.
const track05ConfirmedRondonopolisStudyIds: readonly string[] = Object.freeze([
  "track-05-study-03",
  "track-05-study-04",
  "track-05-study-05",
  "track-05-study-07",
  "track-05-study-08",
  "track-05-study-09",
]);

const track05PublicAuthorProfiles: Readonly<Record<string, StudyPublicAuthorProfile>> =
  Object.freeze(Object.fromEntries([
    [track05Study01Draft.studies[0].id, track05MichaelProfile],
    ...[...track05DraftBatch01AuthorMetadata, ...track05DraftBatch02AuthorMetadata]
      .map((author) => [
        author.studyId,
        track05ConfirmedPublicAuthorProfiles[author.studyId] ?? Object.freeze({
          displayName: author.displayName,
          role: author.roles.join(" · ") || null,
          formation: author.formations.join(" · ") || null,
          cityState: track05ConfirmedRondonopolisStudyIds.includes(author.studyId)
            ? "Rondonópolis/MT"
            : author.cityState,
        }),
      ] as const),
  ]));

// Reconcile the public cross-track invitation without rewriting the audited draft.
const projectTrack04PublishedContinuation = (
  section: StudySection,
): StudySection => {
  if (
    section.id !== "track-04-study-18-continue-journey-17" ||
    section.studyId !== "track-04-study-18" ||
    section.type !== "CONTINUE_JOURNEY"
  ) {
    return section;
  }

  const firstCollaborativeStudy = track05ReleaseSourcePackage.studies[0];
  return Object.freeze({
    ...section,
    blocks: Object.freeze(section.blocks.flatMap<StudyContentBlock>((block) => {
      if (block.type !== "PARAGRAPH") {
        return [block];
      }
      switch (block.text) {
        case "Agora vamos olhar para a comunidade que Cristo forma e para a missão que entrega ao seu povo.":
          return [Object.freeze({ ...block, text: "Continue sua leitura na Trilha 5, que reúne estudos colaborativos e devocionais." })];
        case "Primeiro estudo: O que é a Igreja?":
          return [Object.freeze({ ...block, text: `Primeiro estudo: ${firstCollaborativeStudy.title}` })];
        case "Pergunta de abertura: A Igreja é um prédio, uma instituição ou um povo chamado para pertencer":
          return [Object.freeze({ ...block, text: `Pergunta de abertura: ${firstCollaborativeStudy.questionCentral}` })];
        case "a Cristo e participar de sua missão?":
          return [];
        default:
          return [block];
      }
    })),
  });
};

export const materializePublishedStudyPackage = (
  sourcePackage: StudyContentPackage,
): StudyContentPackage => {
  const publicSections = sourcePackage.sections
    .filter((section) => section.type !== "EDITORIAL_NOTE")
    .map(projectTrack04PublishedContinuation);
  const publicSectionIds = new Set(
    publicSections.map((section) => section.id),
  );

  return Object.freeze({
    ...sourcePackage,
    tracks: Object.freeze(
      sourcePackage.tracks.map((track) =>
        Object.freeze({ ...track, published: true }),
      ),
    ),
    studies: Object.freeze(
      sourcePackage.studies.map((study) =>
        Object.freeze({ ...study, published: true }),
      ),
    ),
    sections: Object.freeze(publicSections),
    references: Object.freeze(
      sourcePackage.references.filter((reference) =>
        publicSectionIds.has(reference.sectionId),
      ),
    ),
  });
};

const releaseEntry = (
  sourcePackage: StudyContentPackage,
  publicAuthorProfile: StudyPublicAuthorProfile | null = null,
  publicAuthorProfilesByStudyId?: Readonly<Record<string, StudyPublicAuthorProfile>>,
): StudyReleaseEntry =>
  Object.freeze({
    contentPackage: materializePublishedStudyPackage(sourcePackage),
    publicAuthorDisplayName: publicAuthorProfile?.displayName ?? null,
    publicAuthorProfile,
    ...(publicAuthorProfilesByStudyId ? { publicAuthorProfilesByStudyId } : {}),
  });

export const studyReleaseManifest: readonly StudyReleaseEntry[] = Object.freeze([
  releaseEntry(track01DraftBatchPackage),
  releaseEntry(track02ReleaseSourcePackage),
  releaseEntry(track03DraftBatchPackage),
  releaseEntry(track04DraftBatchPackage),
  releaseEntry(
    track05ReleaseSourcePackage,
    track05MichaelProfile,
    track05PublicAuthorProfiles,
  ),
  releaseEntry(track06DraftBatchPackage),
]);
