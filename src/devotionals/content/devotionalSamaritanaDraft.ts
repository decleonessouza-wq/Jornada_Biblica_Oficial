import type {
  DevotionalBlockId,
  DevotionalId,
} from "../../domain/devotionals/devotional";
import type { DevotionalContentPackage } from "./devotionalContentPackage";

export const devotionalSamaritanaDraft: DevotionalContentPackage = {
  id: "devotional-track05-samaritana-draft" as DevotionalId,
  contentType: "DEVOTIONAL",
  format: "REFLECTION",
  placement: "TRACK_05",
  title: "Efeito Mulher Samaritana: Quando Jesus Transforma um Encontro em Missão",
  subtitle: "Devocional — João 4:1–15",
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
  heroImage: "assets/devotionals/heroes/devotional-samaritana.png",
  blocks: [
    {
      id: "samaritana-b01" as DevotionalBlockId,
      kind: "BIBLE_REFERENCE",
      reference: {
        bookId: "JHN",
        startChapter: 4,
        startVerse: 1,
        endChapter: 4,
        endVerse: 15,
      },
    },
    {
      id: "samaritana-b02" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "Há encontros que parecem simples, mas carregam propósitos eternos. Em João 4, Jesus se encontra com uma mulher samaritana junto ao poço. O que poderia parecer apenas uma parada no caminho torna-se uma oportunidade de relacionamento, diálogo e transformação. A partir desse episódio, o autor propõe uma leitura devocional de intencionalidade: Jesus não ignora aquela mulher, investe tempo no diálogo e a conduz a desejar a água viva.",
    },
    {
      id: "samaritana-b03" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "Este episódio nos convida a refletir não apenas sobre o que Jesus fez, mas sobre como podemos olhar para as pessoas ao nosso redor: com propósito, disponibilidade e disposição para comunicar a mensagem de vida.",
    },
    {
      id: "samaritana-b04" as DevotionalBlockId,
      kind: "HEADING",
      level: 2,
      text: "O que a Bíblia mostra?",
    },
    {
      id: "samaritana-b05" as DevotionalBlockId,
      kind: "LIST",
      style: "BULLET",
      items: [
        "Jesus tinha que passar por Samaria.",
        "Ele Se assenta junto ao poço por volta do meio-dia, cansado da viagem.",
        "Uma mulher samaritana chega para tirar água, e Jesus inicia a conversa pedindo-lhe de beber.",
        "Os discípulos haviam ido à cidade comprar comida, e Jesus está sozinho com a mulher.",
        "A mulher fica surpresa com a iniciativa de Jesus diante da barreira existente entre judeus e samaritanos.",
        "Ela questiona de onde viria a água viva e se Jesus seria maior que Jacó.",
        "O diálogo se prolonga até que a própria mulher pede a água oferecida por Jesus.",
      ],
    },
    {
      id: "samaritana-b06" as DevotionalBlockId,
      kind: "HEADING",
      level: 2,
      text: "O que precisamos entender?",
    },
    {
      id: "samaritana-b07" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "A reflexão do autor enfatiza propósito e intencionalidade na evangelização: responsabilidade por uma alma, disponibilidade de tempo, atenção ao lugar e disposição para se aproximar de quem precisa ser alcançado.",
    },
    {
      id: "samaritana-b08" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "Evangelismo é relacionamento, não monólogo. Jesus inicia uma conversa simples e deixa que o diálogo se desenvolva. A aplicação proposta pelo material é ouvir, perguntar e construir relacionamento, em vez de apenas transmitir informação.",
    },
    {
      id: "samaritana-b09" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "A atitude de Jesus rompe a expectativa da mulher. O material aplica essa surpresa à evangelização, destacando uma mensagem viva e renovadora que aponta para a água viva oferecida por Cristo.",
    },
    {
      id: "samaritana-b10" as DevotionalBlockId,
      kind: "CALLOUT",
      role: "EDITORIAL_NOTE",
      text: "Cuidado na interpretação: João 4:6 afirma explicitamente que Jesus estava cansado da viagem e Se assentou junto ao poço por volta do meio-dia. A ideia de que Ele teria calculado estrategicamente o horário para chegar primeiro que a mulher é uma leitura devocional presente no material e vai além do que o texto narra explicitamente. Na revisão editorial e teológica final, essa formulação foi mantida somente como leitura devocional do autor, não como afirmação explícita do texto bíblico.",
    },
    {
      id: "samaritana-b11" as DevotionalBlockId,
      kind: "HEADING",
      level: 2,
      text: "Como viver isso?",
    },
    {
      id: "samaritana-b12" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "A mulher samaritana não encontrou apenas alguém junto ao poço; ela encontrou alguém disposto a estar ali, ouvir, dialogar e apresentar uma realidade superior àquela que ela conhecia. A reflexão chama o leitor a assumir responsabilidade por uma alma, investir tempo e construir relacionamentos que conduzam as pessoas à mensagem da vida.",
    },
    {
      id: "samaritana-b13" as DevotionalBlockId,
      kind: "REFLECTION_QUESTION",
      prompt: "Que efeito o nosso encontro com Jesus produz na forma como enxergamos e alcançamos as pessoas ao nosso redor?",
    },
    {
      id: "samaritana-b14" as DevotionalBlockId,
      kind: "LIST",
      style: "NUMBERED",
      items: [
        "Quem Deus colocou no meu caminho?",
        "Onde eu preciso estar?",
        "De quanto tempo estou disposto a abrir mão?",
        "Que perguntas eu preciso fazer?",
        "Estou levando às pessoas uma mensagem viva e nova?",
      ],
    },
    {
      id: "samaritana-b15" as DevotionalBlockId,
      kind: "ACTION",
      text: "Hoje, escolha uma pessoa que Deus colocou no seu caminho e dê um passo concreto de aproximação: uma pergunta genuína, um tempo de escuta, ou um convite para conversar sobre fé.",
    },
    {
      id: "samaritana-b16" as DevotionalBlockId,
      kind: "PRAYER",
      text: "Senhor, faz de mim alguém disposto a parar, ouvir, relacionar-me e anunciar a vida que há em Ti. Que eu seja a última porta que alguém irá bater.",
    },
  ],
  bibleReferences: [
    {
      bookId: "JHN",
      startChapter: 4,
      startVerse: 1,
      endChapter: 4,
      endVerse: 15,
    },
    {
      bookId: "JHN",
      startChapter: 4,
      startVerse: 6,
      endChapter: null,
      endVerse: null,
    },
  ],
  reflectionPrompt: "Existe alguém que você tem evitado, ou tratado como \"mais um\", em vez de enxergar como alguém que Deus quer alcançar através de você?",
  governance: {
    editorialStatus: "PUBLISHED",
    contentReview: "APPROVED",
    theologicalReview: "APPROVED",
    publicDisplayAuthorization: "AUTHORIZED",
    publicationAuthorization: "AUTHORIZED",
  },
  source: {
    sourceKind: "COLLABORATIVE",
    originalTitle: "Efeito: Mulher Samaritana — Devocional (João 4:1–15)",
    receivedAs: "devocional",
    sourceFileName: "EFEITO MULHER SAMARITANA DEVOCIONAL_adriel.pdf",
    sourceSha256: "3A1595B7E15D0EECC7C29F1C889E7D656E0614AD13845D07DC2BB6A71536D5F3",
    curatorNotes: [
      "A estrutura deste draft usa como apoio editorial a curadoria Trilha5_Efeito_Mulher_Samaritana_curadoria.md, SHA256 2DC1D2C2987CFCD5BD207F5C61C0D003F34907C5A165F9714E4194836E78B39A.",
      "O material original foi recebido como devocional e permanece classificado como REFLECTION; não foi convertido em Study.",
      "O material identifica o autor como Adriel; o nome completo não foi inferido. A autorização de exibição pública foi confirmada pelo responsável do projeto.",
      "Afirmações sobre estratégia de horário, chegada antecipada de Jesus e outras inferências além da narrativa explícita foram preservadas como pontos de curadoria e não como fatos textuais da passagem.",
      "A aprovação editorial e teológica e a autorização de publicação foram confirmadas pelo responsável do projeto na etapa controlada de ativação.",
    ],
  },
};
