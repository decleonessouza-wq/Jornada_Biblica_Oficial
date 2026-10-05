import {
  type Study,
  type StudyId,
  type StudySection,
  type StudySectionId,
  type StudySlug,
  type StudyTrack,
  type StudyTrackId,
  type StudyTrackSlug,
} from "../../domain/studies/study";
import type { StudyContentPackage } from "./studyContentPackage";

export const TRACK_02_ID = "track-02" as StudyTrackId;
export const TRACK_02_STUDY_01_ID =
  "track-02-study-01" as StudyId;
export const TRACK_02_STUDY_02_ID =
  "track-02-study-02" as StudyId;

export const track02Study01DraftEditorialSource = {
  fileName:
    "Biblia_Jornada_Trilha_2_Estudo_01_Deus_O_Criador_Modelo_Jornada_20_30.pdf",
  bytes: 952897,
  sha256:
    "175653279245D7BC43247D4E7E7D7D1CCAB953FB42876BDA79ADAC82ECFDDB4E",
  status: "DRAFT",
  statusDetail: "aguardando revisão bíblica e editorial",
  model: "Modelo Jornada - Estudo Bíblico 20-30 | Versão 1.0",
} as const;

const track: StudyTrack = {
  id: TRACK_02_ID,
  slug: "conhecendo-deus" as StudyTrackSlug,
  title: "Conhecendo Deus",
  description: "Conhecendo Deus",
  type: "FORMATION",
  contentProfile: "JOURNEY_20_30_V1",
  cardImage: "track-02-card",
  heroImage: "track-02-hero",
  order: 2,
  published: true,
};

const study: Study = {
  id: TRACK_02_STUDY_01_ID,
  trackId: TRACK_02_ID,
  number: 1,
  slug: "deus-o-criador" as StudySlug,
  title: "Deus, o Criador",
  summary: "Aquele de quem tudo começa",
  questionCentral:
    "O que aprendemos sobre Deus quando a Bíblia o apresenta como Criador?",
  objective:
    "Reconhecer Deus como aquele que existe antes de todas as coisas, cria com autoridade, sustenta sua criação e dá à vida humana dignidade, responsabilidade e direção.",
  estimatedMinutes: {
    minimum: 24,
    maximum: 28,
  },
  heroImage: "track-02-study-01-hero",
  nextStudyId: TRACK_02_STUDY_02_ID,
  audienceLevel: null,
  tags: [],
  published: false,
};

function sectionId(
  suffix: string,
): StudySectionId {
  return `${TRACK_02_STUDY_01_ID}-${suffix}` as StudySectionId;
}

const sections: readonly StudySection[] = [
  {
    id: sectionId("golden-text"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "GOLDEN_TEXT",
    title: "Texto Áureo",
    iconKey: "texto_aureo",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "“No princípio, criou Deus os céus e a terra.” - Gênesis 1:1",
      },
    ],
    order: 1,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("practical-truth"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "PRACTICAL_TRUTH",
    title: "Verdade Prática",
    iconKey: "verdade_pratica",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Reconhecer Deus como Criador é compreender que nossa vida não começou em nós mesmos: recebemos dele existência, dignidade, responsabilidade e propósito.",
      },
    ],
    order: 2,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("bible-reading"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "BIBLE_READING",
    title: "Leitura Bíblica",
    iconKey: "leitura_biblica",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Leitura principal: Gênesis 1:1-5, 26-31.",
      },
      {
        type: "PARAGRAPH",
        text: "Leituras de conexão: Salmo 33:6-9; Salmo 104:24-30; Atos 17:24-28; Colossenses 1:15-17; Apocalipse 4:11.",
      },
      {
        type: "CALLOUT",
        title: "Antes de seguir",
        text: "Abra a passagem e leia primeiro. O objetivo deste estudo não é apenas falar sobre criação, mas perceber o que a criação nos revela sobre o próprio Deus.",
      },
    ],
    order: 3,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("before-understanding"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "BEFORE_UNDERSTANDING",
    title: "Antes de entender",
    iconKey: "leia",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Existem perguntas que atravessam gerações: De onde viemos? Por que existe alguma coisa em vez de nada? Quem somos? Nossa vida possui significado?",
      },
      {
        type: "PARAGRAPH",
        text: "A Bíblia começa de maneira surpreendentemente direta. Antes de Abraão, de Israel, da cruz ou da Igreja, encontramos uma declaração: “No princípio, criou Deus...”",
      },
      {
        type: "PARAGRAPH",
        text: "A primeira verdade não é que o ser humano estava procurando Deus. É que Deus já estava lá.",
      },
      {
        type: "PARAGRAPH",
        text: "Por isso, nesta nova trilha, não começaremos tentando definir Deus a partir de nossas ideias. Começaremos observando como as Escrituras o apresentam.",
      },
      {
        type: "CALLOUT",
        title: "Chave da Jornada",
        text: "Conhecer Deus começa reconhecendo que Ele não é uma peça dentro do universo. Ele é aquele de quem o universo recebeu existência.",
      },
    ],
    order: 4,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("read"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "READ",
    title: "Leia - Gênesis 1:1-5, 26-31",
    iconKey: "leia",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Observe como o texto apresenta Deus antes de apresentar qualquer outra coisa. A criação começa, mas Deus não é apresentado como alguém que começa naquele momento.",
      },
      {
        type: "PARAGRAPH",
        text: "A expressão repetida “E disse Deus...” também merece atenção. Deus fala e a criação responde. O texto descreve autoridade, ordem e propósito.",
      },
      {
        type: "PARAGRAPH",
        text: "Ao longo do capítulo aparece outra avaliação: “era bom”. No final, ao contemplar o conjunto da obra, a criação é chamada de muito boa.",
      },
      {
        type: "PARAGRAPH",
        text: "Quando o ser humano aparece, existe ainda uma particularidade: homem e mulher são criados à imagem de Deus e recebem responsabilidade dentro da criação.",
      },
    ],
    order: 5,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("observe"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "OBSERVE",
    title: "Observe",
    iconKey: "observe",
    blocks: [
      {
        type: "BULLET_LIST",
        items: [
          "Deus já está presente quando a criação começa.",
          "A palavra de Deus aparece como eficaz: Ele ordena e acontece.",
          "A criação possui distinções, ordem e direção.",
          "O mundo material é chamado de bom antes da entrada do pecado.",
          "O ser humano é criatura, mas recebe dignidade e responsabilidade especiais.",
        ],
      },
      {
        type: "CALLOUT",
        title: "Primeira resposta à pergunta central",
        text: "A Bíblia apresenta o Criador como anterior à criação, soberano sobre ela e intencional em sua obra.",
      },
      {
        type: "SUBHEADING",
        text: "1. Deus não é parte da criação",
      },
      {
        type: "PARAGRAPH",
        text: "Tudo o que vemos pertence ao lado das coisas criadas: céu, terra, luz, astros, animais e humanidade. Deus ocupa outra posição na narrativa: Ele é o Criador.",
      },
      {
        type: "PARAGRAPH",
        text: "Isso impede que confundamos Deus com o universo. A criação revela sua grandeza e pertence a Ele, mas não é a própria essência de Deus.",
      },
      {
        type: "PARAGRAPH",
        text: "Por isso, biblicamente, não adoramos o Sol, a terra, a natureza ou a humanidade. Adoramos aquele que os criou.",
      },
      {
        type: "SUBHEADING",
        text: "2. Deus cria sem depender da criação",
      },
      {
        type: "PARAGRAPH",
        text: "Gênesis não apresenta Deus criando porque estivesse incompleto ou precisasse que criaturas o tornassem Deus. A Bíblia apresenta a criação como fruto de sua vontade.",
      },
      {
        type: "PARAGRAPH",
        text: "Apocalipse 4:11 retoma essa verdade ao ligar a existência de todas as coisas à vontade do Criador.",
      },
      {
        type: "CALLOUT",
        title: "Uma distinção simples",
        text: "Tudo o que existe depende de Deus para existir. Deus não depende da criação para ser Deus.",
      },
      {
        type: "SUBHEADING",
        text: "3. A bondade pertence ao projeto original",
      },
      {
        type: "PARAGRAPH",
        text: "Gênesis 1 não apresenta matéria, corpo, trabalho ou mundo físico como males em si. O pecado ainda não entrou na narrativa.",
      },
      {
        type: "PARAGRAPH",
        text: "Isso será importante durante toda a Bíblia: criação e pecado não são a mesma coisa. Deus cria algo bom; o pecado corrompe aquilo que Ele fez.",
      },
    ],
    order: 6,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("understand"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "UNDERSTAND",
    title: "Entenda - Criador também significa Sustentador",
    iconKey: "compreenda_entenda",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Ser Criador não significa que Deus iniciou o universo e depois se afastou. Outros textos bíblicos ampliam aquilo que Gênesis apresenta.",
      },
      {
        type: "PARAGRAPH",
        text: "O Salmo 104 contempla Deus sustentando a vida. Em Atos 17, Paulo anuncia o Deus que fez o mundo e afirma que é Ele quem dá vida, respiração e todas as coisas.",
      },
      {
        type: "PARAGRAPH",
        text: "Nossa dependência de Deus, portanto, não pertence apenas a um passado distante. Existimos agora porque continuamos sendo criaturas diante dele.",
      },
      {
        type: "CALLOUT",
        title: "Uma frase para guardar",
        text: "O Criador não é apenas a origem da vida. Ele continua sendo o Sustentador da vida.",
      },
    ],
    order: 7,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("connect"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "CONNECT",
    title: "Conecte - O Novo Testamento e Cristo",
    iconKey: "conecte",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "O Novo Testamento faz uma conexão extraordinária. Colossenses 1:15-17 apresenta Cristo ligado à criação de todas as coisas e afirma que nele elas subsistem. João 1:1-3 também declara que todas as coisas vieram à existência por meio do Verbo.",
      },
      {
        type: "PARAGRAPH",
        text: "Aqui não estamos inventando um símbolo escondido em Gênesis. Trata-se de afirmação explícita dos autores do Novo Testamento sobre Cristo e a criação.",
      },
      {
        type: "PARAGRAPH",
        text: "Isso torna a história bíblica ainda mais profunda: aquele que entra na criação para redimir também é apresentado pelo Novo Testamento como aquele por meio de quem todas as coisas vieram a existir.",
      },
      {
        type: "SUBHEADING",
        text: "O que a criação revela - e o que ela não revela sozinha",
      },
      {
        type: "PARAGRAPH",
        text: "O Salmo 19 diz que os céus proclamam a glória de Deus, e Romanos 1 afirma que aspectos do poder divino podem ser percebidos nas coisas criadas.",
      },
      {
        type: "PARAGRAPH",
        text: "Mas olhar para uma montanha, sozinho, não nos contará quem foi Abraão, o significado da cruz ou a promessa da ressurreição. Para isso precisamos da revelação de Deus nas Escrituras e, de maneira culminante, em Cristo.",
      },
      {
        type: "CALLOUT",
        title: "Um equilíbrio útil",
        text: "A criação aponta.\nA Palavra explica.\nCristo revela de maneira culminante.",
      },
    ],
    order: 8,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("interpretation-caution"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "INTERPRETATION_CAUTION",
    title: "Cuidado na interpretação",
    iconKey: "cuidado_para_nao_confundir",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Gênesis 1 deve ser lido primeiramente pelo que o texto deseja afirmar sobre Deus, a criação e a humanidade. Cristãos possuem diferentes entendimentos sobre questões como duração dos dias e relação entre o relato e modelos científicos. Este estudo não transforma uma dessas leituras em seu tema principal nem usa o texto para responder perguntas que ele não desenvolve diretamente.",
      },
    ],
    order: 9,
    optional: true,
    collapsible: true,
  },
  {
    id: sectionId("reflect"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "REFLECT",
    title: "Reflita - Eu não sou meu próprio criador",
    iconKey: "reflita",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Reconhecer Deus como Criador confronta uma ideia muito comum: “Minha vida é somente minha e eu defino sozinho seu significado.”",
      },
      {
        type: "PARAGRAPH",
        text: "Se recebemos de Deus existência, corpo, capacidades, tempo e mundo, nossa vida não é uma propriedade totalmente independente daquele que a deu.",
      },
      {
        type: "PARAGRAPH",
        text: "Isso não diminui a pessoa. Ao contrário: Gênesis afirma que homens e mulheres são criados à imagem de Deus. Nossa dignidade não começa em desempenho, aparência, dinheiro, saúde ou aprovação social.",
      },
      {
        type: "CALLOUT",
        title: "Dignidade e humildade caminham juntas",
        text: "Eu não sou Deus - isso me dá humildade.\nFui criado à imagem de Deus - isso me dá dignidade.",
      },
    ],
    order: 10,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("apply"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "APPLY",
    title: "Aplique",
    iconKey: "aplique",
    blocks: [
      {
        type: "SUBHEADING",
        text: "1. A criação muda minha maneira de adorar",
      },
      {
        type: "PARAGRAPH",
        text: "Quanto mais reconhecemos a grandeza do Criador, menos precisamos colocar a nós mesmos no centro. A resposta bíblica à criação não é apenas curiosidade; é adoração.",
      },
      {
        type: "SUBHEADING",
        text: "2. A criação muda minha maneira de tratar pessoas",
      },
      {
        type: "PARAGRAPH",
        text: "Se o outro também foi criado à imagem de Deus, ele não pode ser reduzido a utilidade, aparência, posição social ou opinião. A doutrina da criação possui consequências para respeito, justiça e cuidado.",
      },
      {
        type: "SUBHEADING",
        text: "3. A criação muda minha maneira de usar o que recebi",
      },
      {
        type: "PARAGRAPH",
        text: "Gênesis entrega responsabilidade à humanidade. Somos chamados a administrar, não a agir como proprietários absolutos.",
      },
      {
        type: "PARAGRAPH",
        text: "Isso pode alcançar nosso tempo, talentos, recursos, corpo, trabalho e também a maneira como tratamos o mundo criado por Deus.",
      },
      {
        type: "CALLOUT",
        title: "Pergunta prática",
        text: "Em vez de apenas perguntar “o que eu quero fazer com o que tenho?”, o discípulo aprende a perguntar: “Como posso administrar diante de Deus aquilo que recebi dele?”",
      },
    ],
    order: 11,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("journey-takeaway"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "JOURNEY_TAKEAWAY",
    title: "O que levamos desta Jornada",
    iconKey: "levamos_da_jornada",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "A Bíblia começa com Deus. Ele existe antes de todas as coisas, cria com autoridade e chama sua obra de boa.",
      },
      {
        type: "PARAGRAPH",
        text: "A criação depende dele e continua sustentada por ele.",
      },
      {
        type: "PARAGRAPH",
        text: "O Novo Testamento amplia essa verdade ao conectar Cristo explicitamente à criação e à sustentação de todas as coisas.",
      },
      {
        type: "PARAGRAPH",
        text: "Por isso, confessar que Deus é Criador não é apenas aceitar uma informação sobre o passado. É reconhecer quem Deus é e quem nós somos diante dele.",
      },
      {
        type: "CALLOUT",
        title: "Verdade Prática - agora compreendida",
        text: "Reconhecer Deus como Criador é compreender que nossa vida não começou em nós mesmos: recebemos dele existência, dignidade, responsabilidade e propósito.",
      },
    ],
    order: 12,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("practice-today"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "PRACTICE_TODAY",
    title: "Pratique hoje",
    iconKey: "pratique_hoje",
    blocks: [
      {
        type: "CALLOUT",
        title: "Uma ação concreta",
        text: "Escolha algo que normalmente você trata como “meu” - seu tempo, corpo, trabalho, dinheiro, talento ou um recurso. Faça uma oração simples reconhecendo que aquilo foi recebido de Deus e defina uma maneira concreta de administrá-lo melhor hoje.",
      },
    ],
    order: 13,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("reflection-questions"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "REFLECTION_QUESTIONS",
    title: "Para refletir",
    iconKey: "para_refletir",
    blocks: [
      {
        type: "BULLET_LIST",
        items: [
          "Quando penso em Deus como Criador, qual característica dele se torna mais clara para mim?",
          "Tenho vivido como criatura diante de Deus ou como se eu fosse dono absoluto da minha própria vida?",
          "Minha visão das pessoas muda quando lembro que elas também carregam a dignidade de terem sido criadas à imagem de Deus?",
          "Existe algum recurso, capacidade ou área da vida que preciso voltar a tratar como algo confiado por Deus?",
          "A contemplação da criação tem me conduzido à adoração ou apenas à distração?",
        ],
      },
    ],
    order: 14,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("journal-prompt"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "JOURNAL_PROMPT",
    title: "Registrar no Diário",
    iconKey: "registrar_diario",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Em que área da minha vida tenho vivido mais como dono absoluto do que como alguém que recebeu tudo de Deus?",
      },
    ],
    order: 15,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("prayer"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "PRAYER",
    title: "Ore",
    iconKey: "ore",
    blocks: [
      {
        type: "CALLOUT",
        title: "Oração sugerida",
        text: "Senhor, tu és o Criador de todas as coisas e também o Deus de quem recebi a vida. Livra-me da ilusão de viver como se eu fosse o centro e o dono absoluto de tudo. Ensina-me a reconhecer tua grandeza, agradecer pelo que recebi e cuidar com responsabilidade daquilo que colocaste em minhas mãos. Que a criação me leve à adoração, e que minha vida reflita a dignidade e a humildade de alguém que pertence a ti. Amém.",
      },
    ],
    order: 16,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("keep"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "KEEP",
    title: "Para guardar",
    iconKey: "para_guardar",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Gênesis 1:1 - “No princípio, criou Deus os céus e a terra.”",
      },
      {
        type: "PARAGRAPH",
        text: "Leia também Apocalipse 4:11 e observe como a criação se torna motivo de adoração.",
      },
      {
        type: "CALLOUT",
        title: "Favoritos",
        text: "Guarde Gênesis 1:1 como Texto Áureo deste estudo e Apocalipse 4:11 como conexão para revisitar.",
      },
    ],
    order: 17,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("group-mode"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "GROUP_MODE",
    title: "Modo Grupo",
    iconKey: "modo_grupo",
    blocks: [
      {
        type: "NUMBERED_LIST",
        items: [
          "Observe — O que mais chamou a atenção do grupo na maneira como Gênesis 1 apresenta Deus?",
          "Compreenda — Que diferença existe entre dizer apenas “Deus existe” e confessar “Deus é meu Criador”?",
          "Pratique — Que área da vida cada pessoa do grupo pode administrar de maneira mais consciente diante de Deus nesta semana?",
        ],
      },
    ],
    order: 18,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("deepen"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "DEEPEN",
    title: "+ Aprofunde - Gênesis 1 e as perguntas científicas",
    iconKey: "aprofunde",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Gênesis 1 desperta perguntas legítimas sobre origem, tempo e processo. Cristãos que afirmam a autoridade das Escrituras nem sempre organizam essas questões da mesma maneira.",
      },
      {
        type: "PARAGRAPH",
        text: "O ponto indispensável deste estudo é aquilo que o texto afirma com clareza: Deus é o Criador, a criação depende dele, possui ordem e bondade, e a humanidade ocupa lugar de dignidade e responsabilidade diante do Criador.",
      },
      {
        type: "PARAGRAPH",
        text: "Investigar ciência pode ser valioso. Mas não precisamos transformar Gênesis 1 em um manual moderno de física ou biologia para reconhecer sua mensagem teológica. Também não devemos usar questões científicas como desculpa para ignorar aquilo que o texto afirma sobre Deus.",
      },
      {
        type: "CALLOUT",
        title: "Regra do aprofundamento",
        text: "Perguntas adicionais são bem-vindas; o estudo principal não depende de resolver todos os debates sobre modelos de criação para conhecer a verdade central apresentada pela passagem.",
      },
    ],
    order: 19,
    optional: true,
    collapsible: true,
  },
  {
    id: sectionId("continue-journey"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "CONTINUE_JOURNEY",
    title: "Continue sua Jornada",
    iconKey: "continue_jornada",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Conhecemos Deus como Criador. Mas a Bíblia não fala apenas sobre seu poder para criar.",
      },
      {
        type: "PARAGRAPH",
        text: "Quando pessoas se aproximam da presença de Deus, outra palavra aparece repetidamente: santo.",
      },
      {
        type: "CALLOUT",
        title: "Próximo estudo",
        text: "Trilha 2 - Estudo 02: Deus Santo\nPergunta central: O que significa dizer que Deus é santo - e o que sua santidade produz em quem se aproxima dele?\nTextos-base sugeridos: Isaías 6:1-8; Levítico 19:1-2; 1 Pedro 1:13-16.",
      },
    ],
    order: 20,
    optional: false,
    collapsible: true,
  },
  {
    id: sectionId("references"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "REFERENCES",
    title: "Referências Bíblicas",
    iconKey: "referencias",
    blocks: [
      {
        type: "PARAGRAPH",
        text: "Leitura principal: Gênesis 1:1-5, 26-31.",
      },
      {
        type: "PARAGRAPH",
        text: "Conexões: Salmo 19:1-6; Salmo 33:6-9; Salmo 104:24-30; Atos 17:24-28; Romanos 1:19-20; Colossenses 1:15-17; João 1:1-3; Apocalipse 4:11.",
      },
    ],
    order: 21,
    optional: true,
    collapsible: true,
  },
  {
    id: sectionId("editorial-note"),
    studyId: TRACK_02_STUDY_01_ID,
    type: "EDITORIAL_NOTE",
    title: "Nota Editorial",
    iconKey: "referencias",
    blocks: [
      {
        type: "BULLET_LIST",
        items: [
          "Este estudo foi refeito integralmente no padrão oficial Modelo Jornada - Estudo Bíblico 20-30.",
          "O foco foi deslocado de “por que Deus criou?” para “o que a criação revela sobre Deus?”, evitando repetir o objetivo do Estudo 01 da Trilha 1.",
          "A diferença Criador-criatura foi afirmada diretamente a partir do conjunto dos textos bíblicos utilizados.",
          "A relação de Cristo com a criação foi apresentada como ensino explícito do Novo Testamento, especialmente João 1 e Colossenses 1.",
          "A bondade da criação foi distinguida da corrupção introduzida pelo pecado.",
          "Questões sobre duração dos dias, modelos científicos e mecanismos de criação foram reconhecidas sem transformar uma leitura específica em requisito do estudo introdutório.",
          "A aplicação sobre cuidado e administração da criação foi tratada como responsabilidade de mordomia diante do Criador, não como equiparação entre Deus e natureza.",
        ],
      },
      {
        type: "CALLOUT",
        title: "Status editorial",
        text: "Trilha: 2 - Conhecendo Deus\nEstudo: 01/10 - Deus, o Criador\nModelo: Modelo Jornada - Estudo Bíblico 20-30 | Versão 1.0\nSituação: DRAFT - aguardando revisão bíblica e editorial",
      },
    ],
    order: 22,
    optional: true,
    collapsible: true,
  },
];

export const track02Study01DraftPackage: StudyContentPackage = {
  contentVersion: "fixture-track-02-study-01-draft-v1",
  tracks: [track],
  studies: [study],
  sections,
  references: [],
};
