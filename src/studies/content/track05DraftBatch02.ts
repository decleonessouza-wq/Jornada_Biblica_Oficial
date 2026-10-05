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

export type Track05DraftBatch02AuthorMetadata = Readonly<{
  studyId: string;
  displayName: string;
  roles: readonly string[];
  formations: readonly string[];
  cityState: string | null;
  publicDisplayAuthorization: "UNRESOLVED";
}>;

export type Track05DraftBatch02Provenance = Readonly<{
  studyId: string;
  md: Readonly<{ fileName: string; sha256: string }>;
  pdf: Readonly<{ fileName: string; sha256: string }>;
  governanceStatus: "DRAFT";
}>;

export const track05DraftBatch02AuthorMetadata:
  readonly Track05DraftBatch02AuthorMetadata[] =
[
  {
    "studyId": "track-05-study-06",
    "displayName": "Pr. Nelson",
    "roles": [],
    "formations": [],
    "cityState": null,
    "publicDisplayAuthorization": "UNRESOLVED"
  },
  {
    "studyId": "track-05-study-07",
    "displayName": "Adriel Jackson Batista de Oliveira",
    "roles": [
      "Evangelista"
    ],
    "formations": [
      "Pedagogo"
    ],
    "cityState": null,
    "publicDisplayAuthorization": "UNRESOLVED"
  },
  {
    "studyId": "track-05-study-08",
    "displayName": "Sidinei Rodrigues de Souza",
    "roles": [
      "Pastor"
    ],
    "formations": [],
    "cityState": null,
    "publicDisplayAuthorization": "UNRESOLVED"
  },
  {
    "studyId": "track-05-study-09",
    "displayName": "Adriel Jackson Batista de Oliveira",
    "roles": [
      "Evangelista"
    ],
    "formations": [
      "Pedagogo"
    ],
    "cityState": null,
    "publicDisplayAuthorization": "UNRESOLVED"
  }
];

export const track05DraftBatch02Provenance:
  readonly Track05DraftBatch02Provenance[] =
[
  {
    "studyId": "track-05-study-06",
    "md": {
      "fileName": "Trilha5_Balaao_curadoria.md",
      "sha256": "A3743F1A26D573799E0E684B9DA0EC037D45192810EDA642D3ABA6C57BEE339E"
    },
    "pdf": {
      "fileName": "ESTUDO BÍBLICO Balaão_ pastor_Nelson.pdf",
      "sha256": "84F065F9FF1C2142A8FA44E2106CF9E39ADAE7618934016E0542D619C2596CE1"
    },
    "governanceStatus": "DRAFT"
  },
  {
    "studyId": "track-05-study-07",
    "md": {
      "fileName": "Trilha5_Cade_Pedro_curadoria.md",
      "sha256": "8C2D6F4EA7872717EF88B4AEBAA261BDB501FB03946B0CA06CAAFD64B0B4CD78"
    },
    "pdf": {
      "fileName": "CADÊ PEDRO_adriel.pdf",
      "sha256": "A19F8C4712E6F4809308C2B006B23440F383A6FF1329318755335DCFCB2E6041"
    },
    "governanceStatus": "DRAFT"
  },
  {
    "studyId": "track-05-study-08",
    "md": {
      "fileName": "Trilha5_Exaustao_Pastoral_curadoria.md",
      "sha256": "16357E2D8CFF23F82710BE25BCDC45E3A7475F41361FF228D2FADB885CDF0ED6"
    },
    "pdf": {
      "fileName": "EXAUSTÃO PASTORAL - Sidney.pdf",
      "sha256": "5C09224FB82F892B5CFE83646287ADB4EFFA6BA7008C4326A5707AE4B717463A"
    },
    "governanceStatus": "DRAFT"
  },
  {
    "studyId": "track-05-study-09",
    "md": {
      "fileName": "Trilha5_Voce_Sera_Julgado_curadoria.md",
      "sha256": "5E8BC826EEA120C19EBCBBB880666FC1594496838E61D75793E413A9AB6347B5"
    },
    "pdf": {
      "fileName": "VOCÊ SERÁ JULGADO-adriel.pdf",
      "sha256": "F0E910BA78327BCA500EE8F7F6A0416A3E72A965364B8C1A27E1D87025D1FB7B"
    },
    "governanceStatus": "DRAFT"
  }
];

export const track05DraftBatch02SourceMetadata = Object.freeze(
[
  {
    "studyId": "track-05-study-06",
    "authorLine": "Pr. Nelson *(sobrenome não informado no material recebido — apenas identificado pelo nome do arquivo e pela assinatura \"Pr. Nelson\"; confirmar com o colaborador)*",
    "originalTitle": "Estudo Bíblico: Balaão — Profeta de Deus ou Homem Dominado pela Cobiça?",
    "journeyTitle": "Balaão: Quando Deus Usa uma Boca, mas o Coração Não Está Rendido",
    "theme": "(mantido como o próprio autor já havia definido)",
    "connectStrategy": "EXPLICIT_CONNECT_MARKER",
    "reflectionStrategy": "CENTRAL_QUESTION_FALLBACK",
    "internalGovernanceHeadings": []
  },
  {
    "studyId": "track-05-study-07",
    "authorLine": "Adriel Jackson Batista de Oliveira — Evangelista; casado com Monica Oliveira; pai de Adriel Filho e Aylla Helena; Pedagogo (UNICESUMAR); pós-graduando em Escatologia Bíblica (FEICS); pós-graduado em Docência Teológica do Ensino Superior (Faceminas); graduando em Teologia (UNICESUMAR)",
    "originalTitle": "Cadê Pedro?",
    "journeyTitle": "Cadê Pedro? Fé para Caminhar, Mãos para Socorrer",
    "theme": "(adaptado do próprio título do autor)",
    "connectStrategy": "EXPLICIT_CONNECT_MARKER",
    "reflectionStrategy": "CENTRAL_QUESTION_FALLBACK",
    "internalGovernanceHeadings": []
  },
  {
    "studyId": "track-05-study-08",
    "authorLine": "Pastor Sidinei Rodrigues de Souza",
    "originalTitle": "Exaustão Pastoral - Existe e é real. Sinais Precoces Que Você Não Deve Ignorar",
    "journeyTitle": "Exaustão Pastoral: Sinais Precoces e Como Preveni-la",
    "theme": "Exaustão Pastoral: Sinais Precoces e Como Preveni-la",
    "connectStrategy": "CONCLUSION_FALLBACK",
    "reflectionStrategy": "CENTRAL_QUESTION_FALLBACK",
    "internalGovernanceHeadings": []
  },
  {
    "studyId": "track-05-study-09",
    "authorLine": "Adriel Jackson Batista de Oliveira *(terceiro material recebido deste colaborador; bio já registrada nas curadorias anteriores: evangelista, casado com Monica Oliveira, pai de Adriel Filho e Aylla Helena, Pedagogo (UNICESUMAR), pós-graduando em Escatologia Bíblica (FEICS), pós-graduado em Docência Teológica do Ensino Superior (Faceminas), graduando em Teologia (UNICESUMAR))*",
    "originalTitle": "Você Será Julgado!",
    "journeyTitle": "Você Será Julgado: Os Diferentes Juízos nas Escrituras",
    "theme": "Você Será Julgado: Os Diferentes Juízos nas Escrituras",
    "connectStrategy": "EXPLICIT_CONNECT_MARKER",
    "reflectionStrategy": "CENTRAL_QUESTION_FALLBACK",
    "internalGovernanceHeadings": [
      "NOTA EDITORIAL",
      "REFERÊNCIA EDITORIAL"
    ]
  }
]
);

const rawTrack05DraftBatch02Package =
{
  "contentVersion": "draft-track-05-studies-06-09-batch-02-v1",
  "tracks": [
    {
      "id": "track-05",
      "slug": "estudos-colaborativos",
      "title": "Estudos Colaborativos",
      "description": "Estudos colaborativos revisados e aprovados editorialmente.",
      "type": "FORMATION",
      "contentProfile": "JOURNEY_20_30_V1",
      "cardImage": "track-05-card",
      "heroImage": "track-05-hero",
      "order": 5,
      "published": false
    }
  ],
  "studies": [
    {
      "id": "track-05-study-06",
      "trackId": "track-05",
      "number": 6,
      "slug": "balaao-quando-deus-usa-uma-boca-mas-o-coracao-nao-esta-rendido",
      "title": "Balaão: Quando Deus Usa uma Boca, mas o Coração Não Está Rendido",
      "summary": "Israel caminhava para a Terra Prometida. O povo havia vencido vários inimigos, e isso provocou temor entre as nações vizinhas. Foi nesse cenário que Balaque, rei de Moabe, decidiu não enfrentar Israel diretamente — ele buscou uma estratégia espiritual, contratando Balaão, um homem que tinha contato com Deus, para amaldiçoar o povo: \"Vem, pois, agora, rogo-te, amaldiçoa-me este povo...\" (Nm 22:6).",
      "questionCentral": "(mantida como o próprio autor já havia definido)",
      "objective": "(criado editorialmente — o material original não trazia um objetivo formal)",
      "estimatedMinutes": null,
      "heroImage": "track-05-hero",
      "nextStudyId": "track-05-study-07",
      "audienceLevel": null,
      "tags": [],
      "published": false
    },
    {
      "id": "track-05-study-07",
      "trackId": "track-05",
      "number": 7,
      "slug": "cade-pedro-fe-para-caminhar-maos-para-socorrer",
      "title": "Cadê Pedro? Fé para Caminhar, Mãos para Socorrer",
      "summary": "Todos nós temos algum medo que, sem perceber, limita nossas experiências para uma \"zona de segurança\" mais restrita do que gostaríamos. Agora imagine Pedro: não um homem qualquer, mas um pescador experiente do Mar da Galileia, um empresário do ramo, que largou seus barcos (Lc 5:7) para seguir Jesus na confiança de que, estando com o Mestre, não precisaria se preocupar com mais nada (Mt 4:18-19; Mc 1:16-17; Lc 5:10).",
      "questionCentral": "(criada editorialmente, a partir da pergunta que dá nome ao próprio estudo)",
      "objective": "(criado editorialmente)",
      "estimatedMinutes": null,
      "heroImage": "track-05-hero",
      "nextStudyId": "track-05-study-08",
      "audienceLevel": null,
      "tags": [],
      "published": false
    },
    {
      "id": "track-05-study-08",
      "trackId": "track-05",
      "number": 8,
      "slug": "exaustao-pastoral-sinais-precoces-e-como-preveni-la",
      "title": "Exaustão Pastoral: Sinais Precoces e Como Preveni-la",
      "summary": "A exaustão pastoral existe e é real. Ela não aparece de repente — começa com sinais discretos, que muitas vezes o próprio pastor demora a reconhecer em si mesmo: o cansaço que não passa com o descanso, a irritabilidade crescente, a desconexão emocional, o peso que a família sente e até a oração e a Bíblia se tornando apenas ferramentas de trabalho, e não mais alimento espiritual pessoal.",
      "questionCentral": "(criada editorialmente — o material original não trazia uma pergunta central explícita)",
      "objective": "(criado editorialmente, a partir do conteúdo e da conclusão do autor)",
      "estimatedMinutes": null,
      "heroImage": "track-05-hero",
      "nextStudyId": "track-05-study-09",
      "audienceLevel": null,
      "tags": [],
      "published": false
    },
    {
      "id": "track-05-study-09",
      "trackId": "track-05",
      "number": 9,
      "slug": "voce-sera-julgado-os-diferentes-juizos-nas-escrituras",
      "title": "Você Será Julgado: Os Diferentes Juízos nas Escrituras",
      "summary": "Julgamento não é um tema agradável — há uma certa fuga, e até uma repulsa, à ideia de prestar contas por nossas ações. Mas, independentemente de nossa fé ou ideologia, algo dentro de nós — a nossa própria consciência — já reconhece que existe recompensa para tudo o que fazemos, e que o peso justo dessa recompensa será definido em algum tipo de julgamento.",
      "questionCentral": "(criada editorialmente, a partir das perguntas retóricas do próprio autor no início do texto)",
      "objective": "(criado editorialmente)",
      "estimatedMinutes": null,
      "heroImage": "track-05-hero",
      "nextStudyId": null,
      "audienceLevel": null,
      "tags": [],
      "published": false
    }
  ],
  "sections": [
    {
      "id": "track-05-study-06-golden-text",
      "studyId": "track-05-study-06",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Referência: 2 Pedro 2:15 Texto: \"...seguindo o caminho de Balaão, filho de Beor, que amou o prêmio da injustiça.\""
        }
      ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-practical-truth",
      "studyId": "track-05-study-06",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(frase do próprio autor, já presente na conclusão do original)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Deus não quer apenas nossa boca. Deus quer nosso coração."
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-bible-reading",
      "studyId": "track-05-study-06",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Números 22–24 (texto base) Textos complementares: Números 31:8,16; Deuteronômio 23:4–5; Josué 13:22; Miqueias 6:5; 2 Pedro 2:15–16; Judas 11; Apocalipse 2:14"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-before-understanding",
      "studyId": "track-05-study-06",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de Entender",
      "iconKey": "antes_entender",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Israel caminhava para a Terra Prometida. O povo havia vencido vários inimigos, e isso provocou temor entre as nações vizinhas. Foi nesse cenário que Balaque, rei de Moabe, decidiu não enfrentar Israel diretamente — ele buscou uma estratégia espiritual, contratando Balaão, um homem que tinha contato com Deus, para amaldiçoar o povo: \"Vem, pois, agora, rogo-te, amaldiçoa-me este povo...\" (Nm 22:6)."
        },
        {
          "type": "PARAGRAPH",
          "text": "Balaão consultou o Senhor, e Deus foi claro: \"Não irás com eles, nem amaldiçoarás a este povo, porquanto bendito é\" (Nm 22:12). Ali já começa a grande lição deste estudo: Balaão conhecia a vontade de Deus — mas seu coração desejava aquilo que Deus não havia permitido."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-read",
      "studyId": "track-05-study-06",
      "type": "READ",
      "title": "Leia",
      "iconKey": "leia",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Números 22:1–21 — o chamado de Balaque e a primeira resposta de Deus",
            "Números 22:21–35 — a jumenta e o Anjo do Senhor",
            "Números 23–24 — as bênçãos proféticas sobre Israel"
          ]
        }
      ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-observe",
      "studyId": "track-05-study-06",
      "type": "OBSERVE",
      "title": "Observe",
      "iconKey": "observe",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Quando os príncipes de Moabe chegam com recompensas, Balaão responde que precisa consultar o Senhor — ele reconhece que precisa ouvir a Deus antes de agir.",
            "Mesmo depois de Deus dizer claramente \"não\", Balaque insiste, enviando homens mais numerosos e importantes, oferecendo honras, riquezas e posição.",
            "Balaão chega a declarar: \"Ainda que Balaque me desse a sua casa cheia de prata e de ouro, eu não poderia fazer coisa alguma... que fosse além da ordem do Senhor meu Deus\" (Nm 22:18) — uma declaração correta na boca, mas que escondia um coração ainda em negociação.",
            "No caminho, o Anjo do Senhor se coloca à sua frente — e, de forma impressionante, a jumenta de Balaão enxerga o anjo antes dele. Um homem que dizia falar com Deus não estava enxergando aquilo que um animal estava enxergando.",
            "Cada vez que Balaque prepara altares esperando uma maldição, Deus faz Balaão abençoar Israel — inclusive com a profecia messiânica: \"Uma estrela procederá de Jacó, e um cetro subirá de Israel...\" (Nm 24:17)."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-understand",
      "studyId": "track-05-study-06",
      "type": "UNDERSTAND",
      "title": "Entenda",
      "iconKey": "entenda",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "COMPREENDA"
        },
        {
          "type": "SUBHEADING",
          "text": "Um coração dividido: ouvir a Deus não é o mesmo que obedecer"
        },
        {
          "type": "PARAGRAPH",
          "text": "Balaão sabia que Israel era abençoado. Sabia que não podia amaldiçoá-lo. Sabia que Deus havia proibido sua ida. Mesmo assim, continuou desejando a recompensa oferecida por Balaque. Como Pedro explica mais tarde, Balaão \"amou o prêmio da injustiça\" (2 Pe 2:15) — sua boca dizia uma coisa, enquanto seu coração desejava outra. Não basta conhecer a voz de Deus; é preciso obedecer a essa voz."
        },
        {
          "type": "SUBHEADING",
          "text": "Cego mesmo vendo: a lição da jumenta"
        },
        {
          "type": "PARAGRAPH",
          "text": "No caminho, \"a ira de Deus acendeu-se, porque ele ia...\" (Nm 22:22), e o Anjo do Senhor se colocou diante de Balaão. Ele não conseguia enxergar o anjo — mas sua jumenta conseguia, e desviou-se por três vezes, sendo espancada por isso, até que Deus abriu os olhos de Balaão para que ele também visse. É uma advertência poderosa: é possível ter conhecimento bíblico, experiência, posição, ministério e capacidade de falar bem sobre Deus, e ainda assim estar espiritualmente cego para o que Ele está tentando mostrar."
        },
        {
          "type": "SUBHEADING",
          "text": "O problema não estava na boca, mas no coração"
        },
        {
          "type": "PARAGRAPH",
          "text": "Balaão não conseguiu amaldiçoar Israel com palavras — cada vez que abria a boca, Deus o fazia abençoar. Mas, segundo Números 31:16, ele encontrou outra forma de prejudicar o povo: aconselhou uma estratégia que levou Israel a pecar. É por isso que o Novo Testamento se refere à \"doutrina de Balaão\" como símbolo de cobiça e corrupção espiritual (Ap 2:14). O grande problema de Balaão nunca esteve em sua capacidade de falar — estava no amor ao dinheiro, colocado acima da vontade de Deus. Ele terminou sua vida associado à injustiça, morrendo junto aos reis de Midiã (Nm 31:8) — um lembrete de que começar bem não é suficiente; é preciso terminar bem."
        }
      ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-connect",
      "studyId": "track-05-study-06",
      "type": "CONNECT",
      "title": "Conecte",
      "iconKey": "conecte",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "O próprio Novo Testamento retoma a história de Balaão para advertir a igreja. Pedro fala dele como exemplo de quem \"amou o prêmio da injustiça\" (2 Pe 2:15–16); Judas o cita como advertência (Jd 11); e Jesus, na carta à igreja de Pérgamo, diz: \"Tens aí os que seguem a doutrina de Balaão, o qual ensinava Balaque a lançar tropeços diante dos filhos de Israel\" (Ap 2:14). Um episódio do Antigo Testamento torna-se, assim, advertência permanente para o povo de Deus em qualquer época."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-interpretation-caution",
      "studyId": "track-05-study-06",
      "type": "INTERPRETATION_CAUTION",
      "title": "Cuidado na Interpretação",
      "iconKey": "cuidado_interpretacao",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": null,
          "text": "Cuidado na interpretação: (quase inteiramente a partir da reflexão que o próprio autor já fez no material original) então, Balaão era de Deus? Aqui precisamos ter cuidado. Deus pode usar uma pessoa sem aprovar sua vida — a Bíblia apresenta diversos exemplos de Deus utilizando pessoas para cumprir Seus propósitos. No caso de Balaão, suas palavras proféticas eram verdadeiras porque Deus estava falando através da situação, não porque Balaão fosse um modelo de santidade."
        }
      ],
      "order": 9,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-reflect",
      "studyId": "track-05-study-06",
      "type": "REFLECT",
      "title": "Reflita",
      "iconKey": "reflita",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(mantida como o próprio autor já havia definido)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Balaão era profeta do Senhor?"
        }
      ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-apply",
      "studyId": "track-05-study-06",
      "type": "APPLY",
      "title": "Aplique",
      "iconKey": "aplique",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "APLIQUE"
        },
        {
          "type": "PARAGRAPH",
          "text": "Este estudo deixa três lições para a igreja hoje:"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "Não basta ter dom; é preciso ter caráter. Balaão tinha capacidade espiritual extraordinária, mas seu caráter não acompanhava sua experiência. Uma pessoa pode pregar bem, cantar bem, ensinar e até profetizar — e ainda assim precisar de transformação. Dom não substitui caráter; Deus olha para o coração.",
            "Não troque a vontade de Deus por benefícios. Balaão tinha uma escolha entre obedecer a Deus ou buscar a recompensa, e ficou dividido. A igreja precisa cuidar com dinheiro, fama, posição, reconhecimento, poder e interesses pessoais — nada disso pode estar acima da vontade de Deus. (o próprio autor faz aqui uma aplicação específica sobre ambição ministerial; preferi generalizar o princípio, sem presumir a motivação de quem inicia um novo ministério — ver Alerta de Curadoria acima)",
            "Quem não é derrotado por fora pode ser tentado por dentro. Israel não podia ser amaldiçoado de frente — então a estratégia passou a ser a corrupção por dentro. É uma advertência para vigiarmos tanto contra a pressão externa quanto contra o pecado que se instala silenciosamente. Como Jesus ensinou aos discípulos no Getsêmani: \"Vigiai e orai, para que não entreis em tentação\" (Mt 26:41)."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-journey-takeaway",
      "studyId": "track-05-study-06",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Para Levar da Jornada",
      "iconKey": "levar_jornada",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Conclusão"
        },
        {
          "type": "PARAGRAPH",
          "text": "A história de Balaão traz uma das advertências mais fortes das Escrituras. Ele sabia que Deus era poderoso, conhecia a voz de Deus, sabia que Israel era abençoado e chegou a pronunciar profecias verdadeiras — mas seu coração amava aquilo que Deus não aprovava. Sua boca dizia \"assim diz o Senhor\"; seu coração perguntava \"quanto vou ganhar com isso?\". Deus não quer apenas nossa boca — Ele quer nosso coração. Não basta falar de Deus; precisamos andar com Deus. Não basta conhecer a vontade de Deus; precisamos obedecer a ela. Não basta começar bem; precisamos terminar bem."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        },
        {
          "type": "SUBHEADING",
          "text": "Para Levar da Jornada"
        },
        {
          "type": "PARAGRAPH",
          "text": "(frase do próprio autor, extraída da seção \"Fim de Balaão\") Começar bem não é suficiente. Precisamos terminar bem."
        }
      ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-practice-today",
      "studyId": "track-05-study-06",
      "type": "PRACTICE_TODAY",
      "title": "Pratique Hoje",
      "iconKey": "pratique_hoje",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Hoje, pare e examine com sinceridade: existe alguma \"proposta de Balaque\" em sua vida — um benefício, reconhecimento ou vantagem que você tem considerado aceitar, mesmo sabendo, no fundo, que vai contra o que Deus já revelou como Sua vontade para você?"
        }
      ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-reflection-questions",
      "studyId": "track-05-study-06",
      "type": "REFLECTION_QUESTIONS",
      "title": "Perguntas para Refletir",
      "iconKey": "perguntas_refletir",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(reorganizadas a partir das três \"reflexões pessoais\" que o próprio autor já havia espalhado pelo texto original)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Você consegue enxergar as promessas de Deus para sua vida, ou tem seguido principalmente as ambições do seu próprio coração?",
            "Quando você abre a boca, tem sido um canal de bênção — ou de crítica e maldição?",
            "Existe alguma \"recompensa\" que você tem desejado mais do que a vontade de Deus?",
            "Você tem cuidado tanto de começar bem quanto de terminar bem nas áreas mais importantes da sua vida?"
          ]
        }
      ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-journal-prompt",
      "studyId": "track-05-study-06",
      "type": "JOURNAL_PROMPT",
      "title": "Registre no Diário",
      "iconKey": "diario",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Que \"proposta de Balaque\" — um desejo, uma oferta ou uma ambição — você precisa reconhecer e entregar a Deus hoje?"
        }
      ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-prayer",
      "studyId": "track-05-study-06",
      "type": "PRAYER",
      "title": "Ore",
      "iconKey": "ore",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, incorporando a referência que o próprio autor já havia feito a Mateus 26:41) Peça a Deus que revele qualquer área do seu coração ainda dividida entre obedecer e ser recompensado, e ore como Jesus ensinou: \"Vigiai e orai, para que não entreis em tentação\" (Mt 26:41)."
        }
      ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-keep",
      "studyId": "track-05-study-06",
      "type": "KEEP",
      "title": "Para Guardar",
      "iconKey": "guardar",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Números 23:19 — \"Deus não é homem, para que minta, nem filho do homem, para que se arrependa.\""
        }
      ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-group-mode",
      "studyId": "track-05-study-06",
      "type": "GROUP_MODE",
      "title": "Em Grupo",
      "iconKey": "grupo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, seguindo a progressão observação → compreensão → prática)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "O que mais chamou sua atenção na forma como Deus tratou Balaão ao longo da história?",
            "Vocês conseguem identificar situações em que \"ouvimos\" a vontade de Deus, mas o coração ainda insiste em negociar?",
            "Como podemos, juntos, cuidar para que nosso testemunho comece bem e também termine bem?"
          ]
        }
      ],
      "order": 18,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-deepen",
      "studyId": "track-05-study-06",
      "type": "DEEPEN",
      "title": "+ Aprofunde",
      "iconKey": "aprofunde",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "A profecia messiânica de Números 24:17"
        },
        {
          "type": "PARAGRAPH",
          "text": "\"Uma estrela procederá de Jacó, e um cetro subirá de Israel\" é uma das profecias mais notáveis do Antigo Testamento, tradicionalmente associada à vinda do Messias. É notável que essa declaração messiânica tenha vindo, no relato bíblico, da boca de um homem cujo coração não estava rendido a Deus — reforçando que a veracidade de uma profecia depende de Deus, não do caráter de quem a pronuncia."
        },
        {
          "type": "SUBHEADING",
          "text": "Balaão no Novo Testamento: uma advertência escatológica"
        },
        {
          "type": "PARAGRAPH",
          "text": "Balaão se torna, em 2 Pedro 2, Judas 11 e Apocalipse 2:14, um tipo recorrente de falso mestre movido por ganância, usado para alertar a igreja sobre líderes que corrompem a fé por interesse financeiro ou pessoal. Vale observar que Judas 11 também menciona Caim e Coré na mesma advertência — três exemplos de homens que tiveram acesso a Deus, mas foram dominados por atitudes de coração corrompido (inveja, ganância e rebeldia, respectivamente)."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 19,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-continue-journey",
      "studyId": "track-05-study-06",
      "type": "CONTINUE_JOURNEY",
      "title": "Continue a Jornada",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 20,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-references",
      "studyId": "track-05-study-06",
      "type": "REFERENCES",
      "title": "Referências Bíblicas",
      "iconKey": "referencias",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Números 22–24 (texto-base)",
            "Números 31:8, 16",
            "Deuteronômio 23:4–5",
            "Josué 13:22",
            "Miqueias 6:5",
            "2 Pedro 2:15–16",
            "Judas 11",
            "Apocalipse 2:14",
            "Mateus 26:41 (acrescentada editorialmente em Aplique/Ore)"
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-06-editorial-note",
      "studyId": "track-05-study-06",
      "type": "EDITORIAL_NOTE",
      "title": "Notas de Curadoria",
      "iconKey": "editorial_interno",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": "Governança interna — não publicar",
          "text": "## ELEMENTOS ORIGINAIS PRESERVADOS\n- A pergunta central e sua resposta cuidadosa, já formuladas pelo próprio autor no início do material.\n- A caixa \"Deus pode usar uma pessoa sem aprovar sua vida\", já elaborada pelo autor (reaproveitada como Cuidado na Interpretação).\n- A síntese final do autor, preservada quase integralmente na Conclusão: *\"Sua boca dizia: 'Assim diz o Senhor.' Mas seu coração dizia: 'Quanto vou ganhar com isso?'\"*\n\n## NOTAS DE CURADORIA (uso interno — não publicar)\n| Elemento | Classificação |\n|---|---|\n| Tema, Pergunta Central, Introdução, os 6 pontos de desenvolvimento, as \"três lições\", conclusão | OBSERVED_DIRECT / OBSERVED_VERBATIM / REORGANIZED_FROM_SOURCE |\n| Texto Áureo (2 Pe 2:15) | OBSERVED_DIRECT — já citado pelo autor nos pontos 1 e 6 |\n| Verdade Prática, Para Levar da Jornada | OBSERVED_VERBATIM — frases do próprio autor, extraídas da conclusão e da seção \"Fim de Balaão\" |\n| Cuidado na Interpretação | OBSERVED_DIRECT — praticamente a reflexão que o próprio autor já havia escrito (\"Deus pode usar uma pessoa sem aprovar sua vida\") |\n| Objetivo, Journey... já coberto acima; Pratique Hoje, Registre no Diário, Ore, Em Grupo | EDITORIAL_DERIVED |\n| Perguntas para Refletir | REORGANIZED_FROM_SOURCE — reaproveitadas das três \"reflexões pessoais\" que o autor já havia espalhado pelo texto |\n| Conecte | REORGANIZED_FROM_SOURCE — o autor já cita 2 Pe 2:15-16, Judas 11 e Ap 2:14; apenas reuni essas referências em um bloco de conexão |\n| + Aprofunde | REORGANIZED_FROM_SOURCE (profecia messiânica) + EDITORIAL_DERIVED (menção a Caim e Coré em Judas 11, e observação sobre a veracidade da profecia independer do caráter do profeta) |\n| **Afirmação sobre \"Balaão manda Jezabel entrar em ação\"** | **UNRESOLVED / não reproduzida** — o original associa Balaão (Ap 2:14, carta a Pérgamo) e Jezabel (Ap 2:20, carta a Tiatira) como se fossem a mesma estratégia em sequência; são cartas e igrejas diferentes, sem relação causal explícita no texto. Recomendo confirmar com o autor a intenção por trás dessa afirmação antes de decidir se ela entra no estudo, e de que forma |\n| **Generalização sobre pastores que abrem \"seu próprio ministério\" por ambição** | **UNRESOLVED / suavizada** — o original generaliza que \"a maioria\" dos que saem da bênção de seu pastor para abrir ministério próprio são movidos pela ambição de Balaão; mantive o princípio (vigiar contra ambição disfarçada de chamado) sem reproduzir a generalização sobre motivações alheias, que me pareceu arriscada e não verificável. Recomendo checar com o autor se a intenção era mais restrita (ex.: um alerta pastoral, não uma afirmação estatística) |\n| Continue a Jornada | UNRESOLVED — depende da atribuição de posição na Trilha 5 |\n| ID, slug, posição na trilha | Não atribuídos nesta etapa, conforme item 23 do padrão de curadoria |\n| Nome completo do autor e autorização de exibição pública | UNRESOLVED — apenas \"Pr. Nelson\" identificado; nome completo e autorização a confirmar |\n\n**Status:** DRAFT — aguardando confirmação do nome completo do autor, esclarecimento dos dois pontos sinalizados acima, revisão de conteúdo e revisão teológica antes de qualquer aprovação ou publicação."
        }
      ],
      "order": 22,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-golden-text",
      "studyId": "track-05-study-07",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Referência: Mateus 14:31 Texto: \"E Jesus, estendendo logo a mão, segurou-o, e disse-lhe: Homem de pouca fé, por que duvidaste?\""
        }
      ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-practical-truth",
      "studyId": "track-05-study-07",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(síntese editorial de duas frases do próprio autor)"
        },
        {
          "type": "PARAGRAPH",
          "text": "O Senhor sempre estende a mão para quem afunda — e chama a nós, os amigos do barco, a fazer o mesmo pelos outros."
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-bible-reading",
      "studyId": "track-05-study-07",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Mateus 14:22–33; Marcos 6:45–52"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-before-understanding",
      "studyId": "track-05-study-07",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de Entender",
      "iconKey": "antes_entender",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Todos nós temos algum medo que, sem perceber, limita nossas experiências para uma \"zona de segurança\" mais restrita do que gostaríamos. Agora imagine Pedro: não um homem qualquer, mas um pescador experiente do Mar da Galileia, um empresário do ramo, que largou seus barcos (Lc 5:7) para seguir Jesus na confiança de que, estando com o Mestre, não precisaria se preocupar com mais nada (Mt 4:18-19; Mc 1:16-17; Lc 5:10)."
        },
        {
          "type": "PARAGRAPH",
          "text": "Em Mateus 14, porém, Pedro e os demais discípulos são enviados a atravessar o mar sem Jesus, ainda de noite — e o texto deixa claro que isso não foi voluntário: \"logo obrigou os seus discípulos a subir para o barco\" (Mc 6:45). Eles estavam de coração endurecido, sem ainda ter compreendido o milagre da multiplicação dos pães (Mc 6:52). Se fôssemos nós naquele barco, talvez já estivéssemos pensando: \"sabia que as coisas iam ficar ruins.\""
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-read",
      "studyId": "track-05-study-07",
      "type": "READ",
      "title": "Leia",
      "iconKey": "leia",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Mateus 14:22–33; Marcos 6:45–52"
        }
      ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-observe",
      "studyId": "track-05-study-07",
      "type": "OBSERVE",
      "title": "Observe",
      "iconKey": "observe",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Jesus manda os discípulos atravessarem o mar sem Ele, à noite — não foi um pedido, mas uma ordem.",
            "Mesmo sendo homens experientes no mar, os discípulos não se atemorizam com a tempestade em si — o medo vem ao verem alguém caminhando sobre as águas.",
            "Jesus Se identifica: \"Tende bom ânimo, sou eu; não temais.\"",
            "Pedro desafia o medo e pede para ir ao encontro de Jesus andando sobre as águas — e Jesus o chama: \"Vem!\"",
            "Pedro anda sobre as águas, mas, ao perceber o vento, teme e começa a afundar.",
            "Ninguém no barco estende a mão, lança uma corda ou clama a Deus por ele — mas Jesus estende Sua mão e o segura (Mt 14:31)."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-understand",
      "studyId": "track-05-study-07",
      "type": "UNDERSTAND",
      "title": "Entenda",
      "iconKey": "entenda",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "COMPREENDA"
        },
        {
          "type": "SUBHEADING",
          "text": "Dois tipos de medo"
        },
        {
          "type": "PARAGRAPH",
          "text": "O texto mostra discípulos experientes, que não temem tempestades — mas que se apavoram diante do inexplicável. Um jeito de entender essa cena é distinguir dois tipos de medo: o medo instintivo, como o medo de cair ou o medo de um barulho repentino, e o medo aprendido, construído por experiências, crenças e cultura — como o medo de uma figura \"fantasmagórica\". Pedro enfrenta primeiro o medo aprendido (a crença de estarem vendo um fantasma) para responder ao chamado de Jesus; mas, já sobre as águas, são os medos instintivos — a ausência de chão firme, o som da tempestade — que voltam a tomar conta dele e o fazem afundar."
        },
        {
          "type": "SUBHEADING",
          "text": "A fé que dá um passo fora do barco"
        },
        {
          "type": "PARAGRAPH",
          "text": "Das águas móveis, sem nenhuma estrutura de sustentação, nasce o convite ao medo mais primário do ser humano. Mesmo assim, a fé de Pedro o faz enxergar um caminho ali onde só havia risco — e ele passa a andar sobre as águas, ao som da voz de comando do dono do mar. É importante notar: o mesmo caminho que Pedro usou estava disponível a todos os outros discípulos no barco. É possível até que alguns tenham desejado experimentar o que Pedro experimentava — mas faltou-lhes coragem para dar o primeiro passo para fora do barco."
        },
        {
          "type": "SUBHEADING",
          "text": "Cadê Pedro? A ausência das mãos humanas"
        },
        {
          "type": "PARAGRAPH",
          "text": "Os mesmos discípulos que viram Pedro caminhar sobre as águas o viram, também, começar a afundar. E aqui está a pergunta que dá nome a este estudo: cadê Pedro? Por que ninguém no barco estendeu a mão? Por que ninguém se lançou ao mar para salvá-lo? Por que ninguém jogou uma corda, ou ao menos orou a Deus por ele? É possível até que um pensamento egoísta tenha passado pela cabeça de alguns: \"isso é o que acontece com quem quer ser diferente demais.\" Mas, ainda que nenhum amigo no barco tenha se manifestado, o próprio Deus encarnado (Jo 1:1,14) estendeu Sua mão. O socorro de Pedro, no momento de maior angústia, não veio de técnica humana ou de boas alianças — veio de uma mão estendida, a do próprio Senhor."
        }
      ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-connect",
      "studyId": "track-05-study-07",
      "type": "CONNECT",
      "title": "Conecte",
      "iconKey": "conecte",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "A ausência de ajuda no barco de Pedro ecoa uma advertência que o apóstolo João faria depois, sobre a igreja: \"Quem, pois, tiver bens deste mundo, e vir o seu irmão necessitado, e lhe fechar o seu coração, como estará nele o amor de Deus? Meus filhinhos, não amemos de palavra nem de língua, mas por obra e em verdade\" (1 Jo 3:17–18). O silêncio do barco diante de Pedro afundando é exatamente o tipo de indiferença contra a qual João adverte a igreja."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-interpretation-caution",
      "studyId": "track-05-study-07",
      "type": "INTERPRETATION_CAUTION",
      "title": "Cuidado na Interpretação",
      "iconKey": "cuidado_interpretacao",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": null,
          "text": "Cuidado na interpretação: a distinção entre \"medos inatos\" e \"medos adquiridos\", usada neste estudo para explicar a reação dos discípulos, vem de observações da psicologia popular sobre o medo humano, não é uma categoria ensinada pelo texto bíblico em si. Ela funciona bem como lente ilustrativa para entender a cena, mas o ponto central do episódio é bíblico e teológico: a fé de Pedro o levou a sair do barco, e o medo o fez afundar — e é o Senhor, não uma técnica de controle do medo, quem o resgata."
        }
      ],
      "order": 9,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-reflect",
      "studyId": "track-05-study-07",
      "type": "REFLECT",
      "title": "Reflita",
      "iconKey": "reflita",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(criada editorialmente, a partir da pergunta que dá nome ao próprio estudo)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Quando alguém ao nosso redor começa a afundar, por que muitas vezes ninguém estende a mão — e onde está o Senhor nesses momentos?"
        }
      ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-apply",
      "studyId": "track-05-study-07",
      "type": "APPLY",
      "title": "Aplique",
      "iconKey": "aplique",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "APLIQUE"
        },
        {
          "type": "PARAGRAPH",
          "text": "Nós somos os amigos do barco. Cristo está assentado à direita do Pai, e coube a nós — cristãos, \"pequenos cristos\" — a missão de estender a mão e socorrer o aflito e o necessitado. Onde está o seu Pedro? Onde está o seu vizinho? Onde está o seu amigo? Não o deixe se afogar — que suas mãos sejam a mão de Cristo para socorrer quem precisa."
        },
        {
          "type": "PARAGRAPH",
          "text": "Ao mesmo tempo, todos no barco podem, em algum momento, esquecer ou falhar em ajudar — mas o Senhor Deus sempre estenderá as mãos para quem clama a Ele. Esteja atento com os ouvidos à voz do Senhor, com os olhos e a cabeça firmados para cima, pronto para contemplar as mãos do Senhor estendidas sobre a sua própria vida também."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-journey-takeaway",
      "studyId": "track-05-study-07",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Para Levar da Jornada",
      "iconKey": "levar_jornada",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Conclusão"
        },
        {
          "type": "PARAGRAPH",
          "text": "Pedro teve a coragem de sair do barco pela fé — e, quando o medo o fez afundar, ninguém ao seu redor estendeu a mão. Mas o Senhor estendeu. Essa é a dupla lição deste episódio: por um lado, a certeza de que, ainda que os amigos do barco falhem, o Senhor nunca falha em socorrer quem clama a Ele; por outro, o chamado para que sejamos, para as pessoas ao nosso redor, as mãos que Ele usa para socorrer. Cadê Pedro? Talvez esteja mais perto de você do que imagina."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        },
        {
          "type": "SUBHEADING",
          "text": "Para Levar da Jornada"
        },
        {
          "type": "PARAGRAPH",
          "text": "(adaptado da própria frase do autor) O socorro não vem de bancos, de técnicas humanas ou de boas alianças — vem de uma mão estendida, a do próprio Senhor."
        }
      ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-practice-today",
      "studyId": "track-05-study-07",
      "type": "PRACTICE_TODAY",
      "title": "Pratique Hoje",
      "iconKey": "pratique_hoje",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Hoje, pense em alguém que pode estar \"afundando\" perto de você — alguém que talvez ninguém mais tenha notado — e dê um passo concreto para estender a mão: uma ligação, uma visita, uma oferta de ajuda real."
        }
      ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-reflection-questions",
      "studyId": "track-05-study-07",
      "type": "REFLECTION_QUESTIONS",
      "title": "Perguntas para Refletir",
      "iconKey": "perguntas_refletir",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(elaboradas editorialmente a partir das perguntas retóricas que o próprio autor já fazia)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Já estive na posição de Pedro — arriscando algo por fé — e senti que ninguém no barco estendeu a mão?",
            "Já estive no barco, vendo alguém \"afundar\", e não fiz nada para ajudar?",
            "Que medo — instintivo ou aprendido — tem me impedido de dar um passo de fé para fora da minha zona de segurança?",
            "Quem é o \"Pedro\" ao meu redor que precisa que eu estenda a mão hoje?"
          ]
        }
      ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-journal-prompt",
      "studyId": "track-05-study-07",
      "type": "JOURNAL_PROMPT",
      "title": "Registre no Diário",
      "iconKey": "diario",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Existe algum medo que tem te impedido de responder ao chamado de Jesus para sair do barco?"
        }
      ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-prayer",
      "studyId": "track-05-study-07",
      "type": "PRAYER",
      "title": "Ore",
      "iconKey": "ore",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Peça a Deus coragem para dar o passo de fé que Ele está te chamando a dar, e sensibilidade para enxergar quem, ao seu redor, precisa que você estenda a mão."
        }
      ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-keep",
      "studyId": "track-05-study-07",
      "type": "KEEP",
      "title": "Para Guardar",
      "iconKey": "guardar",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "1 João 3:18 — \"Meus filhinhos, não amemos de palavra nem de língua, mas por obra e em verdade.\""
        }
      ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-group-mode",
      "studyId": "track-05-study-07",
      "type": "GROUP_MODE",
      "title": "Em Grupo",
      "iconKey": "grupo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, seguindo a progressão observação → compreensão → prática)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "O que mais chamou sua atenção na pergunta \"Cadê Pedro?\" — o fato de ele ter afundado, ou o fato de ninguém tê-lo ajudado?",
            "Já vivemos, como grupo, situações em que alguém precisava de ajuda e ninguém percebeu ou agiu?",
            "Quem, no nosso círculo, pode estar \"afundando\" agora — e como podemos, juntos, estender a mão?"
          ]
        }
      ],
      "order": 18,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-deepen",
      "studyId": "track-05-study-07",
      "type": "DEEPEN",
      "title": "+ Aprofunde",
      "iconKey": "aprofunde",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Por que o coração deles estava endurecido?"
        },
        {
          "type": "PARAGRAPH",
          "text": "Marcos 6:52 liga diretamente o medo dos discípulos diante de Jesus andando sobre as águas à sua falta de entendimento sobre a multiplicação dos pães, ocorrida horas antes: \"porque ainda não tinham compreendido o milagre dos pães, antes o seu coração estava endurecido.\" O texto sugere que a incapacidade de reconhecer o poder de Deus em um milagre recente tornou os discípulos mais vulneráveis ao medo diante do próximo desafio — um padrão que vale a pena observar também em nossa própria vida de fé."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 19,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-continue-journey",
      "studyId": "track-05-study-07",
      "type": "CONTINUE_JOURNEY",
      "title": "Continue a Jornada",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 20,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-references",
      "studyId": "track-05-study-07",
      "type": "REFERENCES",
      "title": "Referências Bíblicas",
      "iconKey": "referencias",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Mateus 4:18–19; Mateus 14:22–33",
            "Marcos 1:16–17; Marcos 6:45; Marcos 6:49; Marcos 6:52",
            "Lucas 5:7; Lucas 5:10",
            "João 1:1,14",
            "João 6:16–21 (relato paralelo; ver Alerta de Curadoria sobre a referência original \"Jo 6.48-49\")",
            "1 João 3:17–18 (acrescentada editorialmente em Conecte)"
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-07-editorial-note",
      "studyId": "track-05-study-07",
      "type": "EDITORIAL_NOTE",
      "title": "Notas de Curadoria",
      "iconKey": "editorial_interno",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": "Governança interna — não publicar",
          "text": "## ELEMENTOS ORIGINAIS PRESERVADOS\n- A história pessoal do autor sobre seu próprio medo de águas profundas, usada como gancho de abertura em \"Antes de Entender\".\n- A sequência de perguntas retóricas do autor, reaproveitada em Compreenda:\n> \"Porque ninguém no barco estendeu as mãos para Pedro? Porque ninguém se lançou ao mar para salvá-lo? Porque ninguém jogou uma corda? Porque ninguém orou para Deus salvar Pedro?\"\n- A frase de fechamento do P.S. original, preservada em Aplique:\n> \"Não os deixe se afogar, que suas mãos seja a mão de Cristo para socorrer o necessitado.\"\n\n## NOTAS DE CURADORIA (uso interno — não publicar)\n| Elemento | Classificação |\n|---|---|\n| História pessoal de abertura, narrativa do episódio, explicação sobre os dois tipos de medo, a pergunta \"Cadê Pedro?\", o P.S. final | OBSERVED_DIRECT / OBSERVED_VERBATIM / REORGANIZED_FROM_SOURCE |\n| Texto Áureo (Mt 14:31) | OBSERVED_DIRECT — episódio central já desenvolvido pelo autor |\n| Perguntas retóricas e frase final do P.S. | OBSERVED_VERBATIM — preservadas como elementos próprios |\n| Pergunta Central, Objetivo, Journey... já coberto; Pratique Hoje, Perguntas para Refletir (redação), Registre no Diário, Ore, Em Grupo | EDITORIAL_DERIVED |\n| Conecte (1 Jo 3:17-18) | EDITORIAL_DERIVED — passagem não citada pelo autor, acrescentada para reforçar, com outra referência bíblica, o tema da indiferença dos amigos no barco |\n| Cuidado na Interpretação (medos inatos/adquiridos) | EDITORIAL_DERIVED — **ponto de atenção**: qualifica uma afirmação do autor atribuída a \"estudiosos\" sem fonte citada |\n| + Aprofunde (Mc 6:52) | REORGANIZED_FROM_SOURCE — o autor já menciona Mc 6:52 de passagem; desenvolvi um pouco mais a conexão |\n| **Referência \"Jo 6.48-49\"** | **UNRESOLVED** — possível erro de citação do autor; não corrigida silenciosamente, ver Alerta de Curadoria |\n| Continue a Jornada | UNRESOLVED — depende da atribuição de posição na Trilha 5 |\n| ID, slug, posição na trilha | Não atribuídos nesta etapa, conforme item 23 do padrão de curadoria |\n| Nome do autor / autorização de exibição pública | Mesma situação das curadorias anteriores deste colaborador — forte indício de autorização, confirmação explícita ainda pendente |\n\n**Status:** DRAFT — aguardando confirmação da referência bíblica sinalizada, revisão de conteúdo e revisão teológica antes de qualquer aprovação ou publicação."
        }
      ],
      "order": 22,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-golden-text",
      "studyId": "track-05-study-08",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Referência: 1 Timóteo 4:16 Texto: \"Tem cuidado de ti mesmo e da doutrina; persevera nestas coisas, porque, fazendo isto, te salvarás, tanto a ti mesmo como aos que te ouvem.\""
        }
      ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-practical-truth",
      "studyId": "track-05-study-08",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(síntese editorial da conclusão do autor)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Cuidar de si mesmo não contradiz o chamado pastoral — é um ato de obediência que sustenta a capacidade de servir, amar e liderar por mais tempo."
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-bible-reading",
      "studyId": "track-05-study-08",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "1 Timóteo 4:16 (única referência bíblica presente no material recebido)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-before-understanding",
      "studyId": "track-05-study-08",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de Entender",
      "iconKey": "antes_entender",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "A exaustão pastoral existe e é real. Ela não aparece de repente — começa com sinais discretos, que muitas vezes o próprio pastor demora a reconhecer em si mesmo: o cansaço que não passa com o descanso, a irritabilidade crescente, a desconexão emocional, o peso que a família sente e até a oração e a Bíblia se tornando apenas ferramentas de trabalho, e não mais alimento espiritual pessoal."
        },
        {
          "type": "PARAGRAPH",
          "text": "O perigo não é se sentir esgotado — isso pode acontecer com qualquer pessoa que serve com intensidade. O perigo é normalizar isso, tratando o esgotamento como parte inevitável do ministério, sem parar para avaliar o que está acontecendo."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-read",
      "studyId": "track-05-study-08",
      "type": "READ",
      "title": "Leia",
      "iconKey": "leia",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "1 Timóteo 4:16"
        }
      ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-observe",
      "studyId": "track-05-study-08",
      "type": "OBSERVE",
      "title": "Observe",
      "iconKey": "observe",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Ao escrever a Timóteo, um jovem líder à frente de uma igreja, Paulo não separa o cuidado pessoal do cuidado com a doutrina e com o rebanho — ele une as duas coisas no mesmo mandamento: \"tem cuidado de ti mesmo e da doutrina\". O texto mostra que zelar pela própria vida faz parte, e não se opõe, do chamado de perseverar servindo e ensinando outros."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-understand",
      "studyId": "track-05-study-08",
      "type": "UNDERSTAND",
      "title": "Entenda",
      "iconKey": "entenda",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "COMPREENDA"
        },
        {
          "type": "SUBHEADING",
          "text": "Os sinais precoces da exaustão pastoral"
        },
        {
          "type": "PARAGRAPH",
          "text": "A exaustão costuma avisar antes de se instalar por completo. Entre os sinais mais comuns estão: o cansaço que persiste mesmo depois do descanso; a irritabilidade e a impaciência crescentes; a desconexão emocional — cumprir as responsabilidades por fora enquanto, por dentro, falta força e motivação; o peso que a família começa a sentir, recebendo a versão mais exausta do pastor; e o enfraquecimento da vida espiritual pessoal, quando oração e Bíblia passam a ser apenas ferramentas de trabalho."
        },
        {
          "type": "SUBHEADING",
          "text": "Por que muitos pastores chegam à exaustão"
        },
        {
          "type": "PARAGRAPH",
          "text": "Um dos motivos mais frequentes é a falta de limites: o pastor responde a emergências, mensagens, conflitos, reuniões e demandas constantes, e se nunca desacelera, a agenda toma conta de sua vida. Outro motivo é a solidão — muitos líderes não têm um espaço seguro para conversar honestamente, pedir ajuda ou dividir seus fardos. A culpa por descansar e a ideia equivocada de que \"servir mais sempre significa servir melhor\" também contribuem para o esgotamento."
        },
        {
          "type": "CALLOUT",
          "title": null,
          "text": "Cuidado na interpretação: cuidar de si mesmo não significa negligenciar responsabilidades ministeriais ou buscar conforto às custas dos outros. Trata-se de administração sábia da vida e do chamado — não fuga dele. O texto não ensina que o pastor deva se isentar de servir, mas que sirva a partir de uma vida sustentável, e não da exaustão."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-connect",
      "studyId": "track-05-study-08",
      "type": "CONNECT",
      "title": "Conecte",
      "iconKey": "conecte",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Evitar o esgotamento pastoral é possível quando o líder entende que o autocuidado também é um ato de obediência. Um pastor saudável pode servir melhor, amar melhor, discernir melhor e permanecer mais forte ao longo do tempo. Seu lar, a igreja que você lidera e sua própria saúde precisam que você preste atenção aos sinais de alerta a tempo — você não precisa esperar uma crise para começar a agir. A prevenção também faz parte da sabedoria pastoral."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-reflect",
      "studyId": "track-05-study-08",
      "type": "REFLECT",
      "title": "Reflita",
      "iconKey": "reflita",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(criada editorialmente — o material original não trazia uma pergunta central explícita)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Como reconhecer os sinais da exaustão pastoral e cuidar de si mesmo sem abandonar o chamado?"
        }
      ],
      "order": 9,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-apply",
      "studyId": "track-05-study-08",
      "type": "APPLY",
      "title": "Aplique",
      "iconKey": "aplique",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "APLIQUE"
        },
        {
          "type": "PARAGRAPH",
          "text": "Prevenir e enfrentar a exaustão pastoral envolve atitudes concretas:"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "Reconhecer que você também precisa de cuidados — um pastor não é uma máquina espiritual, mas uma pessoa com limites, emoções, um corpo e necessidades reais.",
            "Proteger o tempo de descanso — o descanso não é ameaça ao chamado, faz parte de uma administração sábia; quem nunca para acaba servindo por exaustão, não por plenitude.",
            "Falar antes de entrar em colapso — buscar acompanhamento pastoral ou aconselhamento, sem esperar chegar ao fundo do poço.",
            "Não sacrificar a família pela agenda — proteger a família também é nutrir o chamado.",
            "Aprender a delegar — nem tudo depende de uma só pessoa; uma liderança saudável constrói equipes e distribui responsabilidades.",
            "Reavaliar o estilo de vida — sono, alimentação, atividade física, pausas e tempo de renovação espiritual são fundamentos práticos, não detalhes."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "Se o esgotamento já começou: não se condene. Pare, avalie, busque ajuda, reduza atividades desnecessárias, reordene prioridades e permita que outros o apoiem. Nem toda exaustão se resolve apenas com férias — mas reconhecer honestamente o que está acontecendo já é o primeiro passo."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-journey-takeaway",
      "studyId": "track-05-study-08",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Para Levar da Jornada",
      "iconKey": "levar_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Cuidar de si mesmo não desvia você do chamado — é o que sustenta sua capacidade de continuar servindo, amando e liderando por mais tempo."
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-practice-today",
      "studyId": "track-05-study-08",
      "type": "PRACTICE_TODAY",
      "title": "Pratique Hoje",
      "iconKey": "pratique_hoje",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Hoje, escolha uma atitude concreta de autocuidado — um horário de descanso protegido, uma conversa honesta com alguém de confiança, ou um momento de oração sem agenda ministerial — e coloque-a em prática."
        }
      ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-reflection-questions",
      "studyId": "track-05-study-08",
      "type": "REFLECTION_QUESTIONS",
      "title": "Perguntas para Refletir",
      "iconKey": "perguntas_refletir",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(elaboradas editorialmente a partir dos sinais e causas apresentados pelo autor)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Quais dos sinais precoces de exaustão listados neste estudo você reconhece em si mesmo hoje?",
            "Você tem um espaço seguro para falar honestamente sobre seus fardos e pedir ajuda?",
            "Sua agenda tem tomado conta da sua vida, ou você tem protegido tempo de descanso?",
            "Sua família tem recebido \"as sobras\" do seu tempo e energia, ou tem sido cuidada com atenção?",
            "O que impede você de delegar responsabilidades que poderiam ser compartilhadas?"
          ]
        }
      ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-journal-prompt",
      "studyId": "track-05-study-08",
      "type": "JOURNAL_PROMPT",
      "title": "Registre no Diário",
      "iconKey": "diario",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Que passo concreto você pode dar esta semana para cuidar melhor de si mesmo, sem culpa?"
        }
      ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-prayer",
      "studyId": "track-05-study-08",
      "type": "PRAYER",
      "title": "Ore",
      "iconKey": "ore",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Peça a Deus sabedoria para reconhecer seus próprios limites, coragem para pedir ajuda quando necessário, e graça para descansar sem culpa."
        }
      ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-keep",
      "studyId": "track-05-study-08",
      "type": "KEEP",
      "title": "Para Guardar",
      "iconKey": "guardar",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "1 Timóteo 4:16 — \"Tem cuidado de ti mesmo e da doutrina; persevera nestas coisas, porque, fazendo isto, te salvarás, tanto a ti mesmo como aos que te ouvem.\""
        }
      ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-group-mode",
      "studyId": "track-05-study-08",
      "type": "GROUP_MODE",
      "title": "Em Grupo",
      "iconKey": "grupo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, pensado para rodas de líderes/pastores; segue a progressão observação → compreensão → prática)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "O que mais chamou sua atenção nos sinais de exaustão apresentados neste estudo?",
            "Que causas de esgotamento vocês reconhecem na rotina de liderança de vocês?",
            "Como podemos apoiar uns aos outros para prevenir o esgotamento nesta semana?"
          ]
        }
      ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-deepen",
      "studyId": "track-05-study-08",
      "type": "DEEPEN",
      "title": "+ Aprofunde",
      "iconKey": "aprofunde",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Não aplicável nesta curadoria. O material recebido não trouxe conteúdo adicional (histórico, linguístico, teológico ou interpretativo) que justificasse um bloco de aprofundamento sem que eu precisasse criá-lo do zero — o que contrariaria a regra de não preencher artificialmente essa seção. Uma sugestão possível para revisão teológica futura, sem que tenha sido incluída no corpo do estudo: explorar exemplos bíblicos de esgotamento em servos de Deus (como Elias em 1 Reis 19, ou os momentos em que Jesus Se retirava para descansar e orar), caso o autor confirme que esse é o tipo de conexão que deseja fazer."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 18,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-continue-journey",
      "studyId": "track-05-study-08",
      "type": "CONTINUE_JOURNEY",
      "title": "Continue a Jornada",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 19,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-references",
      "studyId": "track-05-study-08",
      "type": "REFERENCES",
      "title": "Referências Bíblicas",
      "iconKey": "referencias",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "1 Timóteo 4:16"
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 20,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-08-editorial-note",
      "studyId": "track-05-study-08",
      "type": "EDITORIAL_NOTE",
      "title": "Notas de Curadoria",
      "iconKey": "editorial_interno",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": "Governança interna — não publicar",
          "text": "## ELEMENTOS ORIGINAIS PRESERVADOS\n- Frase de impacto do autor, preservada como elemento próprio:\n> \"O perigo não é se sentir esgotado. O perigo é normalizar isso.\"\n- Encerramento característico do autor, com o versículo em destaque e assinatura:\n> \"TENHA CUIDADO DE TI MESMO...\" (1Tm 4:16) — Pr Sidinei Rodrigues\n\n## NOTAS DE CURADORIA (uso interno — não publicar)\n| Elemento | Classificação |\n|---|---|\n| Sinais precoces, causas da exaustão, passos de prevenção, seção \"quando o esgotamento já começou\", conclusão | OBSERVED_DIRECT / REORGANIZED_FROM_SOURCE |\n| Texto Áureo / Para Guardar (1 Tm 4:16) | OBSERVED_DIRECT (citado pelo próprio autor ao final) |\n| Frase de impacto e assinatura final | OBSERVED_VERBATIM — preservadas como elementos próprios |\n| Pergunta Central, Objetivo, Verdade Prática, Antes de Entender, Observe, Journey Takeaway, Pratique Hoje, Perguntas para Refletir, Registre no Diário, Ore, Em Grupo, caixa de Cuidado na Interpretação | EDITORIAL_DERIVED |\n| Conecte | **Omitido intencionalmente** — o material não trouxe conexões bíblicas adicionais, e não inseri novas referências por conta própria para não atribuir ao autor conexões que ele não fez |\n| + Aprofunde | **Não preenchido** — sugestão de possível conexão (Elias, 1 Rs 19) registrada apenas como nota interna, não incluída no corpo do estudo |\n| Fundamentação bíblica geral | **UNRESOLVED / ponto de atenção** — apenas 1 referência bíblica direta no material recebido; recomenda-se consulta ao autor antes da revisão teológica para reforçar a Leitura Bíblica e a Parte I |\n| Continue a Jornada | UNRESOLVED — depende da atribuição de posição na Trilha 5 |\n| ID, slug, posição na trilha | Não atribuídos nesta etapa, conforme item 23 do padrão de curadoria |\n| Nome do autor (exibição pública) | UNRESOLVED — aguardando autorização do Pr. Sidinei Rodrigues de Souza |\n\n**Status:** DRAFT — aguardando decisão editorial sobre a fundamentação bíblica adicional, revisão de conteúdo e revisão teológica antes de qualquer aprovação ou publicação."
        }
      ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-golden-text",
      "studyId": "track-05-study-09",
      "type": "GOLDEN_TEXT",
      "title": "Texto Áureo",
      "iconKey": "texto_aureo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Referência: 2 Coríntios 5:10 Texto: \"Porque todos nós devemos comparecer ante o tribunal de Cristo, para que cada um receba segundo o bem ou o mal que tiver feito por meio do corpo.\""
        }
      ],
      "order": 1,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-practical-truth",
      "studyId": "track-05-study-09",
      "type": "PRACTICAL_TRUTH",
      "title": "Verdade Prática",
      "iconKey": "verdade_pratica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(síntese editorial do argumento central do autor)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Já somos salvos pela graça, e o julgamento do nosso pecado foi resolvido na cruz — mas um dia seremos avaliados pela forma como vivemos depois de salvos, e essa certeza deve nos motivar a viver com responsabilidade e a anunciar o evangelho a quem ainda não creu."
        }
      ],
      "order": 2,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-bible-reading",
      "studyId": "track-05-study-09",
      "type": "BIBLE_READING",
      "title": "Leitura Bíblica",
      "iconKey": "leitura_biblica",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "2 Coríntios 5:9–10; Romanos 14:10–12; Apocalipse 20:11–15"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 3,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-before-understanding",
      "studyId": "track-05-study-09",
      "type": "BEFORE_UNDERSTANDING",
      "title": "Antes de Entender",
      "iconKey": "antes_entender",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Julgamento não é um tema agradável — há uma certa fuga, e até uma repulsa, à ideia de prestar contas por nossas ações. Mas, independentemente de nossa fé ou ideologia, algo dentro de nós — a nossa própria consciência — já reconhece que existe recompensa para tudo o que fazemos, e que o peso justo dessa recompensa será definido em algum tipo de julgamento."
        },
        {
          "type": "PARAGRAPH",
          "text": "Quem tem o direito de nos julgar? Por que deveremos ser julgados? Será esse juiz justo? Terei direito de defesa? Estas são perguntas naturais diante da ideia de comparecer diante de um juiz."
        },
        {
          "type": "PARAGRAPH",
          "text": "A Bíblia trata dessas respostas — e é importante perceber que ela fala de prestação de contas para toda a humanidade, não apenas para os que já creem em Cristo. Por isso, quem já é salvo tem o dever de anunciar essa mensagem, para que, no dia do juízo, ninguém possa alegar desconhecimento como defesa."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 4,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-read",
      "studyId": "track-05-study-09",
      "type": "READ",
      "title": "Leia",
      "iconKey": "leia",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "2 Coríntios 5:9–10; Romanos 14:10–12; Apocalipse 20:11–15"
        }
      ],
      "order": 5,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-observe",
      "studyId": "track-05-study-09",
      "type": "OBSERVE",
      "title": "Observe",
      "iconKey": "observe",
      "blocks": [
        {
          "type": "BULLET_LIST",
          "items": [
            "Paulo afirma que \"todos nós\" devemos comparecer ante o tribunal de Cristo (2 Co 5:10) — a palavra \"todos\" aponta para um princípio universal de prestação de contas.",
            "Romanos 14:10–12 reforça a mesma ideia: cada um dará conta de si mesmo a Deus.",
            "Apocalipse 20 descreve um julgamento final, \"segundo as suas obras\", registradas em livros — e um \"livro da vida\" que determina o destino eterno de cada pessoa.",
            "A Bíblia, portanto, não fala de um único julgamento genérico, mas de diferentes momentos, participantes e propósitos de julgamento — distintos entre si."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 6,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-understand",
      "studyId": "track-05-study-09",
      "type": "UNDERSTAND",
      "title": "Entenda",
      "iconKey": "entenda",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "COMPREENDA"
        },
        {
          "type": "SUBHEADING",
          "text": "O juízo que já foi resolvido: o pecado original"
        },
        {
          "type": "PARAGRAPH",
          "text": "Jesus, na cruz, recebeu em Seu corpo a sentença pelo pecado — Ele morreu por todos os pecadores (Jo 5:25; 12:31; 1 Pe 2:24; 2 Co 5:21; Rm 8:1). Por causa disso, quem está em Cristo já recebeu a remissão, o perdão do pecado original — este julgamento específico já aconteceu, e a boa notícia é que Cristo o carregou por nós."
        },
        {
          "type": "SUBHEADING",
          "text": "O juízo diário: o autojulgamento do crente"
        },
        {
          "type": "PARAGRAPH",
          "text": "Cada pessoa salva é chamada a um autoexame constante: reconhecer seus pecados, colocar-se diante do Senhor e, quando necessário, diante da igreja (1 Jo 2:1–2; 1 Co 11:31–32; Tg 5:16). A mensagem do evangelho desperta consciência das próprias falhas e chama à conversão — e a liberdade em Cristo se experimenta quando assumimos a consciência do erro, nos arrependemos e confessamos, em vez de escondê-lo."
        },
        {
          "type": "SUBHEADING",
          "text": "O juízo que vem: o Tribunal de Cristo"
        },
        {
          "type": "PARAGRAPH",
          "text": "Todos os que já são salvos serão avaliados por Cristo quanto às suas obras — para receber, ou não, recompensa (2 Co 5:9–10; Rm 14:10–12; 1 Jo 4:17). Isso não coloca a salvação em risco: quem está em Cristo já está salvo. O que está em jogo é a recompensa — é possível ser salvo e, ainda assim, não receber nenhuma recompensa, se a vida não refletiu fidelidade ao chamado."
        }
      ],
      "order": 7,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-connect",
      "studyId": "track-05-study-09",
      "type": "CONNECT",
      "title": "Conecte",
      "iconKey": "conecte",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Esse mesmo princípio de prestação de contas pelas obras aparece na parábola dos talentos (Mt 25:14–30): cada servo recebe algo do Senhor para administrar, e um dia presta contas do que fez com aquilo que lhe foi confiado. O Tribunal de Cristo é, de certa forma, esse dia de prestação de contas — não sobre a salvação em si, mas sobre como vivemos depois de recebê-la."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 8,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-interpretation-caution",
      "studyId": "track-05-study-09",
      "type": "INTERPRETATION_CAUTION",
      "title": "Cuidado na Interpretação",
      "iconKey": "cuidado_interpretacao",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": null,
          "text": "Cuidado na interpretação: nem todos os cristãos concordam com o número exato ou a cronologia dos juízos apresentados neste estudo. A divisão em sete juízos distintos — incluindo a separação entre o Tribunal de Cristo e o Trono Branco, e a relação deles com o arrebatamento, a Grande Tribulação e o Milênio — reflete uma linha de interpretação escatológica específica, comum em setores do pentecostalismo. Outras tradições cristãs organizam esses eventos de forma diferente, ou entendem alguns desses juízos como o mesmo evento. O que praticamente todas as tradições cristãs afirmam em comum é a certeza bíblica de que haverá, sim, prestação de contas diante de Deus."
        }
      ],
      "order": 9,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-reflect",
      "studyId": "track-05-study-09",
      "type": "REFLECT",
      "title": "Reflita",
      "iconKey": "reflita",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(criada editorialmente, a partir das perguntas retóricas do próprio autor no início do texto)"
        },
        {
          "type": "PARAGRAPH",
          "text": "Quais são os diferentes juízos que a Bíblia apresenta, e o que eles significam para quem já está em Cristo e para quem ainda não creu?"
        }
      ],
      "order": 10,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-apply",
      "studyId": "track-05-study-09",
      "type": "APPLY",
      "title": "Aplique",
      "iconKey": "aplique",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "APLIQUE"
        },
        {
          "type": "PARAGRAPH",
          "text": "A certeza de que seremos avaliados por nossas obras não deveria nos paralisar de medo, mas nos motivar a viver com mais intencionalidade. Isso acontece de duas formas concretas:"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "No autoexame diário: examinar sinceramente nossas atitudes, confessar o que for necessário, e não deixar pecados e conceitos errados se acumularem sem serem tratados diante de Deus.",
            "No anúncio do evangelho: já que a Bíblia fala de julgamento para toda a humanidade, e não apenas para os que creem, quem já conhece a Cristo tem o dever de anunciar essa mensagem — para que ninguém, no dia final, possa alegar que nunca ouviu."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 11,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-journey-takeaway",
      "studyId": "track-05-study-09",
      "type": "JOURNEY_TAKEAWAY",
      "title": "Para Levar da Jornada",
      "iconKey": "levar_jornada",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Conclusão"
        },
        {
          "type": "PARAGRAPH",
          "text": "O julgamento é real e universal — mas, para quem está em Cristo, o julgamento pelo pecado já foi resolvido na cruz. O que resta não é medo de condenação, mas a certeza de que um dia nossas obras, como crentes, serão avaliadas por Aquele que nos ama. Essa certeza deve nos motivar a viver diariamente em autoexame e a anunciar essa mesma esperança a quem ainda não a conhece, para que ninguém compareça diante de Deus sem ter ouvido a mensagem do evangelho."
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        },
        {
          "type": "SUBHEADING",
          "text": "Para Levar da Jornada"
        },
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Se você está em Cristo, o julgamento pelo seu pecado já aconteceu na cruz — o que resta é viver diante Dele de um jeito que valha a pena, e ajudar outras pessoas a conhecerem essa mesma graça antes que seja tarde."
        }
      ],
      "order": 12,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-practice-today",
      "studyId": "track-05-study-09",
      "type": "PRACTICE_TODAY",
      "title": "Pratique Hoje",
      "iconKey": "pratique_hoje",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Hoje, reserve alguns minutos para um \"autojulgamento\": examine sinceramente sua vida diante de Deus, confessando o que for necessário, e pense em uma pessoa que ainda não conhece o evangelho para quem você pode falar sobre Ele esta semana."
        }
      ],
      "order": 13,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-reflection-questions",
      "studyId": "track-05-study-09",
      "type": "REFLECTION_QUESTIONS",
      "title": "Perguntas para Refletir",
      "iconKey": "perguntas_refletir",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(elaboradas editorialmente a partir do conteúdo do autor)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "Já parei para pensar seriamente que um dia prestarei contas a Deus da forma como vivi?",
            "Tenho o hábito de me autoexaminar e confessar meus pecados, ou deixo isso se acumular?",
            "Se hoje fosse avaliado pelo Tribunal de Cristo, minhas obras refletiriam fé, amor e fidelidade — ou principalmente omissão?",
            "Existe alguém em minha vida que ainda não ouviu claramente o evangelho da minha parte?"
          ]
        }
      ],
      "order": 14,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-journal-prompt",
      "studyId": "track-05-study-09",
      "type": "JOURNAL_PROMPT",
      "title": "Registre no Diário",
      "iconKey": "diario",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) O que, na sua vida hoje, você gostaria de já ter resolvido antes de comparecer diante de Deus?"
        }
      ],
      "order": 15,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-prayer",
      "studyId": "track-05-study-09",
      "type": "PRAYER",
      "title": "Ore",
      "iconKey": "ore",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial) Agradeça a Deus por já ter resolvido, na cruz, o julgamento do seu pecado, e peça sensibilidade para viver e servir de um jeito que valha a pena diante Dele — e coragem para anunciar essa mesma esperança a quem ainda não a conhece."
        }
      ],
      "order": 16,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-keep",
      "studyId": "track-05-study-09",
      "type": "KEEP",
      "title": "Para Guardar",
      "iconKey": "guardar",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "Romanos 14:12 — \"Assim, pois, cada um de nós dará conta de si mesmo a Deus.\""
        }
      ],
      "order": 17,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-group-mode",
      "studyId": "track-05-study-09",
      "type": "GROUP_MODE",
      "title": "Em Grupo",
      "iconKey": "grupo",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(editorial, seguindo a progressão observação → compreensão → prática)"
        },
        {
          "type": "NUMBERED_LIST",
          "items": [
            "O que mais chamou sua atenção na ideia de que existem diferentes juízos nas Escrituras?",
            "Por que a certeza do Tribunal de Cristo deveria motivar nossa forma de viver, mesmo já sendo salvos?",
            "Como podemos, juntos, levar a mensagem do evangelho a quem ainda não ouviu, para que ninguém tenha essa desculpa diante de Deus?"
          ]
        }
      ],
      "order": 18,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-deepen",
      "studyId": "track-05-study-09",
      "type": "DEEPEN",
      "title": "+ Aprofunde",
      "iconKey": "aprofunde",
      "blocks": [
        {
          "type": "SUBHEADING",
          "text": "Outros juízos mencionados nas Escrituras"
        },
        {
          "type": "PARAGRAPH",
          "text": "Além do Tribunal de Cristo, o material recebido cita outros quatro juízos distintos, segundo a mesma linha de interpretação escatológica mencionada na Nota Editorial:"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "Julgamento de Israel — a nação israelita será julgada durante a Grande Tribulação (Dn 12:1). Diz respeito apenas a Israel.",
            "Julgamento das Nações — todas as nações serão julgadas antes da instauração do Milênio (Mt 25:31–32; Jl 3:1–2, 12–14; Sl 9:8).",
            "Julgamento do Diabo e suas hostes — Satanás, já condenado por antecipação (Jo 16:11), será julgado em instância final e lançado no inferno junto de seus emissários, após uma última revolta, logo depois do Milênio (Ap 20:10; Rm 16:20; 1 Co 6:3; Jd 6; 2 Pe 2:4).",
            "O Grande Trono Branco — o último grande julgamento, o Juízo Final, para condenar todos aqueles cujos nomes não estiverem escritos no livro da vida do Cordeiro (Ap 20:5–11; At 17:31; Rm 2:12–16)."
          ]
        },
        {
          "type": "PARAGRAPH",
          "text": "(Lembrete: esta é uma das formas de organizar a escatologia bíblica, não a única — ver Cuidado na Interpretação e Nota Editorial acima.)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 19,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-continue-journey",
      "studyId": "track-05-study-09",
      "type": "CONTINUE_JOURNEY",
      "title": "Continue a Jornada",
      "iconKey": "continue_jornada",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(a definir — próximo estudo da Trilha 5 ainda não atribuído nesta curadoria)"
        },
        {
          "type": "PARAGRAPH",
          "text": "---"
        }
      ],
      "order": 20,
      "optional": false,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-references",
      "studyId": "track-05-study-09",
      "type": "REFERENCES",
      "title": "Referências Bíblicas",
      "iconKey": "referencias",
      "blocks": [
        {
          "type": "PARAGRAPH",
          "text": "(agrupadas conforme os pontos do material original)"
        },
        {
          "type": "BULLET_LIST",
          "items": [
            "Pecado original: João 5:25; 12:31; 19:17–18; 1 Pedro 2:24; 3:18; Gálatas 3:13; Colossenses 2:13–15; 2 Coríntios 5:21; Hebreus 9:26; Romanos 8:1",
            "Autojulgamento do crente: 1 João 2:1–2; 1 Coríntios 11:31–32; Hebreus 3:12–13; 12:7; 1 Pedro 4:17; 1 Coríntios 5; 1 Timóteo 1:20; Tiago 5:16; 1 Coríntios 4:3–4",
            "Tribunal de Cristo: 2 Coríntios 5:9–10; Romanos 14:10–12; 1 João 4:17",
            "Julgamento de Israel: Daniel 12:1",
            "Julgamento das Nações: Mateus 25:31–32; 13:40–46; Joel 3:1–2, 12–14; Salmos 9:8",
            "Julgamento do Diabo: João 16:11; Apocalipse 20:10; Romanos 16:20; 1 Coríntios 6:3; Judas 6; 2 Pedro 2:4",
            "Grande Trono Branco: Apocalipse 20:5–11; Atos 17:31; Romanos 2:12–16",
            "Parábola dos talentos (Mateus 25:14–30) (acrescentada editorialmente em Conecte)"
          ]
        }
      ],
      "order": 21,
      "optional": true,
      "collapsible": true
    },
    {
      "id": "track-05-study-09-editorial-note",
      "studyId": "track-05-study-09",
      "type": "EDITORIAL_NOTE",
      "title": "Notas de Curadoria",
      "iconKey": "editorial_interno",
      "blocks": [
        {
          "type": "CALLOUT",
          "title": "Governança interna — não publicar",
          "text": "## ELEMENTOS ORIGINAIS PRESERVADOS\n- A sequência de perguntas retóricas do autor, no abertura do texto, preservada como recurso de estilo em \"Antes de Entender\":\n> \"Quem tem o direito de nos julgar? Porque deveremos ser julgados? ... Será este juiz justo? Terei o meu direito de defesa? Quais são as acusações contra mim?\"\n- A referência bibliográfica citada pelo próprio autor: *Teologia Sistemática Pentecostal* (grafado no original como \"ZIBORD, Ciro Sanche\" — recomenda-se confirmar se o nome correto é Ciro Sanches Zibordi antes da publicação).\n\n## NOTA EDITORIAL\nEste estudo apresenta uma taxonomia de sete juízos bíblicos organizada segundo uma linha de interpretação escatológica específica (dispensacionalista/pré-milenista), citando como referência a obra *Teologia Sistemática Pentecostal*. Essa organização — incluindo a ordem cronológica dos eventos (arrebatamento, Tribunal de Cristo, Grande Tribulação, Milênio, Trono Branco) — não é compartilhada por todas as tradições cristãs, que divergem legitimamente sobre escatologia. Recomenda-se que a revisão teológica confirme se este é o entendimento a ser adotado como padrão editorial do Bíblia Jornada, ou se o estudo deve ser ajustado para apresentar a certeza do juízo final de forma mais ampla, sem comprometer-se necessariamente com todos os detalhes desse sistema específico.\n\n---\n\n## REFERÊNCIA EDITORIAL\n- ZIBORD[I], Ciro Sanche[s]. *Teologia Sistemática Pentecostal* *(citada pelo próprio autor; grafia a confirmar)*\n\n---\n\n## NOTAS DE CURADORIA (uso interno — não publicar)\n| Elemento | Classificação |\n|---|---|\n| Introdução, explicação dos 7 juízos, referências bíblicas de cada ponto | OBSERVED_DIRECT / REORGANIZED_FROM_SOURCE |\n| Texto Áureo, Para Guardar (2 Co 5:10; Rm 14:12) | OBSERVED_DIRECT — já citados pelo autor nos pontos 3 e 3 (Rm 14:10-12 citado no mesmo bloco) |\n| Perguntas retóricas de abertura | OBSERVED_VERBATIM — preservadas como elemento próprio |\n| Pergunta Central, Objetivo, Verdade Prática, Journey Takeaway, Pratique Hoje, Perguntas para Refletir, Registre no Diário, Ore, Em Grupo | EDITORIAL_DERIVED |\n| Conecte (parábola dos talentos) | EDITORIAL_DERIVED — passagem não citada pelo autor, acrescentada para reforçar o tema de prestação de contas pelas obras |\n| Cuidado na Interpretação e Nota Editorial (pluralidade de visões escatológicas) | EDITORIAL_DERIVED — **ponto de atenção teológica prioritário**: o material reflete um sistema escatológico específico (dispensacionalista/pré-milenista) apresentado sem qualificação no original; sinalizei isso em dois lugares do documento, conforme exigido pelo item 4 e pelo item 11 do padrão de curadoria |\n| Reorganização em 3 subtópicos + bloco Aprofunde | REORGANIZED_FROM_SOURCE — os 7 pontos do autor foram mantidos na íntegra, mas os pontos 4 a 7 foram deslocados para + Aprofunde para manter o estudo principal dentro de 20–30 min |\n| Grafia \"Zibord/Ciro Sanche\" na referência bibliográfica | **UNRESOLVED** — possível erro de digitação; nome real provável: Ciro Sanches Zibordi |\n| Continue a Jornada | UNRESOLVED — depende da atribuição de posição na Trilha 5 |\n| ID, slug, posição na trilha | Não atribuídos nesta etapa, conforme item 23 do padrão de curadoria |\n| Nome do autor / autorização de exibição pública | Mesma situação das curadorias anteriores — forte indício de autorização, confirmação explícita ainda pendente |\n\n**Status:** DRAFT — aguardando decisão editorial sobre a Nota Editorial (linha escatológica adotada), confirmação da referência bibliográfica, revisão de conteúdo e revisão teológica antes de qualquer aprovação ou publicação."
        }
      ],
      "order": 22,
      "optional": true,
      "collapsible": true
    }
  ],
  "references": []
} as const;

const track05DraftBatch02Track: StudyTrack = {
  ...rawTrack05DraftBatch02Package.tracks[0],
  id: rawTrack05DraftBatch02Package.tracks[0].id as StudyTrackId,
  slug: rawTrack05DraftBatch02Package.tracks[0].slug as StudyTrackSlug,
};

const track05DraftBatch02Studies: readonly Study[] =
  rawTrack05DraftBatch02Package.studies.map((study) => ({
    ...study,
    id: study.id as StudyId,
    trackId: study.trackId as StudyTrackId,
    slug: study.slug as StudySlug,
    nextStudyId:
      study.nextStudyId === null
        ? null
        : (study.nextStudyId as StudyId),
  }));

const track05DraftBatch02Sections: readonly StudySection[] =
  rawTrack05DraftBatch02Package.sections.map((section) => ({
    ...section,
    id: section.id as StudySectionId,
    studyId: section.studyId as StudyId,
    type: section.type as StudySection["type"],
    blocks: section.blocks as unknown as StudySection["blocks"],
  }));

export const track05DraftBatch02Package: StudyContentPackage = {
  contentVersion: rawTrack05DraftBatch02Package.contentVersion,
  tracks: [track05DraftBatch02Track],
  studies: track05DraftBatch02Studies,
  sections: track05DraftBatch02Sections,
  references: rawTrack05DraftBatch02Package.references,
};
