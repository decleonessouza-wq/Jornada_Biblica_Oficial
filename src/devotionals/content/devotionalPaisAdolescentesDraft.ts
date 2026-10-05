import type {
  DevotionalBlockId,
  DevotionalId,
} from "../../domain/devotionals/devotional";
import type { DevotionalContentPackage } from "./devotionalContentPackage";

export const devotionalPaisAdolescentesDraft: DevotionalContentPackage = {
  id: "devotional-track05-pais-adolescentes-draft" as DevotionalId,
  contentType: "DEVOTIONAL",
  format: "OPEN_LETTER",
  placement: "TRACK_05",
  title: "Carta Aberta a Pais de Adolescentes",
  subtitle: null,
  summary: null,
  audience: null,
  author: {
    canonicalName: "Adriel Jackson Batista de Oliveira",
    publicProfile: {
      displayName: "Adriel Jackson Batista de Oliveira",
      role: "Evangelista",
      formation: "Pedagogo · Professor de EBD · Teólogo",
      cityState: "Rondonópolis/MT",
    },
    publicDisplayAuthorization: "AUTHORIZED",
  },
  heroImage: "assets/devotionals/heroes/devotional-pais-adolescentes.png",
  blocks: [
    {
      id: "pais-b01" as DevotionalBlockId,
      kind: "BIBLE_REFERENCE",
      reference: {
        bookId: "2KI",
        startChapter: 4,
        startVerse: null,
        endChapter: null,
        endVerse: null,
      },
    },
    {
      id: "pais-b02" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "Em um tradicional culto noturno de domingo, no templo sede da Assembleia de Deus em Rondonópolis, no dia 10 de novembro, o autor relata ter sido impactado por uma palavra ministrada pelo pastor Oton de Paula a partir de 2 Reis 4 e registra algumas reflexões inspiradas no que ouviu e percebeu na leitura bíblica.",
    },
    {
      id: "pais-b03" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "A carta descreve a narrativa como a história de uma família não convencional, com ausência da figura paterna e forte influência do legado espiritual deixado pelo pai/esposo. A partir daí, o autor desenvolve aplicações voltadas à responsabilidade dos pais e à presença dos filhos dentro da vida espiritual da família.",
    },
    {
      id: "pais-b04" as DevotionalBlockId,
      kind: "LIST",
      style: "NUMBERED",
      items: [
        "As circunstâncias familiares, incluindo luto e compromisso financeiro, não os fizeram se afastar do conselho de Deus.",
        "A mãe demonstra interesse e empreende esforços para que o credor não leve os seus filhos; o autor aplica essa imagem ao mundo que tenta cobrar uma dívida já paga por Cristo.",
        "Para o milagre acontecer, os filhos trabalham buscando vasos. O autor entende esses filhos como adolescentes e aplica o episódio à responsabilidade dos filhos dentro do lar.",
        "O azeite se multiplica com os filhos dentro de casa e com portas fechadas; o autor aplica o azeite como cura e bálsamo e pergunta onde estão os filhos dos leitores.",
        "Eliseu aconselha e instrui como líder espiritual, mas o autor enfatiza que a família, representada pela mãe, é quem coloca os filhos para dentro de casa.",
      ],
    },
    {
      id: "pais-b05" as DevotionalBlockId,
      kind: "CALLOUT",
      role: "EDITORIAL_NOTE",
      text: "Ponto de revisão: o material faz aplicações interpretativas sobre a provável morte prematura do pai, a idade dos filhos, o credor como figura do mundo, o azeite como cura/bálsamo e a relação direta entre 2 Reis 4 e práticas parentais contemporâneas. Essas afirmações pertencem à reflexão do autor. Na revisão editorial e teológica final, foram mantidas explicitamente como aplicações do autor, não como afirmações explícitas do texto bíblico.",
    },
    {
      id: "pais-b06" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "Com muito carinho, a carta exorta os pais a não usarem circunstâncias temporárias como razão para se afastarem do conselho de Deus e a não terceirizarem a responsabilidade pelos filhos. O autor chama os pais a exercerem presença, direção, disciplina e exemplo espiritual dentro de casa.",
    },
    {
      id: "pais-b07" as DevotionalBlockId,
      kind: "REFLECTION_QUESTION",
      prompt: "Senhores pais, onde estão os seus filhos: dentro das portas espirituais, sendo curados deste mundo, ou do lado de fora?",
    },
    {
      id: "pais-b08" as DevotionalBlockId,
      kind: "ACTION",
      text: "Feche a porta! Trabalhe! Ouça o conselho de Deus! E viva o milagre da provisão!",
    },
    {
      id: "pais-b09" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "A carta encerra reforçando que os pais são responsáveis por muitas das decisões práticas do lar — roupas, lazer, permissões, acesso à internet e ambiente doméstico — e conclama a usar com responsabilidade a autoridade recebida para conduzir a família.",
    },
  ],
  bibleReferences: [
    {
      bookId: "2KI",
      startChapter: 4,
      startVerse: null,
      endChapter: null,
      endVerse: null,
    },
  ],
  reflectionPrompt: "Senhores pais, onde estão os seus filhos: dentro das portas espirituais, sendo curados deste mundo, ou do lado de fora?",
  governance: {
    editorialStatus: "PUBLISHED",
    contentReview: "APPROVED",
    theologicalReview: "APPROVED",
    publicDisplayAuthorization: "AUTHORIZED",
    publicationAuthorization: "AUTHORIZED",
  },
  source: {
    sourceKind: "COLLABORATIVE",
    originalTitle: "CARTA ABERTA A PAIS DE ADOLESCENTES",
    receivedAs: "carta aberta",
    sourceFileName: "CARTA ABERTA A PAIS DE ADOLESCENTES.pdf",
    sourceSha256: "BCBE888BA2A12D0B3FE7BDACAEACB1DD8106B5D6FBFB3529C7F22221CB13D1E7",
    curatorNotes: [
      "A assinatura Adriel Jackson Batista de Oliveira no próprio PDF sustenta a identidade interna do autor; a autorização de exibição pública foi confirmada pelo responsável do projeto.",
      "O draft preserva o caráter de Carta Aberta e não converte o material em Study.",
      "Quebras de linha e artefatos evidentes da extração PDF foram normalizados para leitura, sem alterar deliberadamente as afirmações interpretativas do autor.",
      "As aplicações sobre idade dos filhos, simbolismo do credor, natureza do azeite e autoridade parental foram revisadas e permanecem explicitamente apresentadas como aplicações do autor, distintas de afirmações diretas do texto bíblico.",
      "A aprovação editorial e teológica e a autorização de publicação foram confirmadas pelo responsável do projeto na etapa controlada de ativação.",
    ],
  },
};
