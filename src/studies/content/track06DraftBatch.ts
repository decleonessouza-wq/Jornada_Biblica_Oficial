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

export const TRACK_06_DRAFT_BATCH_PROFILE = "JOURNEY_20_30_V1" as const;
export const TRACK_06_DRAFT_BATCH_EDITORIAL_STATUS = "DRAFT" as const;
export const TRACK_06_DRAFT_BATCH_PUBLISHED = false as const;
export const TRACK_06_DRAFT_BATCH_RUNTIME_ELIGIBLE = false as const;
const TRACK_06_ID = "track-06" as StudyTrackId;
const track: StudyTrack = {
  id: TRACK_06_ID,
  slug: "vida-a-luz-da-palavra" as StudyTrackSlug,
  title: "Vida à Luz da Palavra",
  description: "Vida prática / devocional",
  type: "DEVOTIONAL",
  contentProfile: TRACK_06_DRAFT_BATCH_PROFILE,
  cardImage: "track-06-card",
  heroImage: "track-06-hero",
  order: 6,
  published: false,
};

export const track06DraftBatchEditorialSources = [
  {
    "studyNumber": 1,
    "studyId": "track-06-study-01",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_01_Vida_Financeira.pdf",
    "sourceBytes": 950198,
    "sourceSha256": "07A4DE03BB98DE395C91982C0A2DCEEB7B9703FB5142B4428042AD31041E272F",
    "sourcePageCount": 7,
    "sourceTextBytes": 11029,
    "sourceTextSha256": "8FC35925D661224851BD7EAF780BE76978F22850F38B7FBCC23615713081C24C",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 2,
    "studyId": "track-06-study-02",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_02_Juventude.pdf",
    "sourceBytes": 949213,
    "sourceSha256": "43348F22C5CAD63DF36F2D236E9B55BEC1BB9B4ADB5C91C471D969563C3E8650",
    "sourcePageCount": 7,
    "sourceTextBytes": 9778,
    "sourceTextSha256": "1DDDEEBFF142059799E6B4D69DB20C0845F08EDE981FF503136439692AA3A2DE",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 3,
    "studyId": "track-06-study-03",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_03_Vida_Familiar.pdf",
    "sourceBytes": 949564,
    "sourceSha256": "BDEBC04A1EEC21AE862A8C2A373F2BF6FD80EDB92003D29946D8FFC7225569AE",
    "sourcePageCount": 7,
    "sourceTextBytes": 10101,
    "sourceTextSha256": "37F4E8EDAAFEB55C674C2CB3C9999553CE27498D0C22BCC22BFB347ED3B1F49E",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 4,
    "studyId": "track-06-study-04",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_04_Vida_Profissional.pdf",
    "sourceBytes": 949734,
    "sourceSha256": "D875295FC5A07FE37E2F6CD90DC1F54CAF1CEF69C0AB3A33B06906E5BC9CDED3",
    "sourcePageCount": 7,
    "sourceTextBytes": 10135,
    "sourceTextSha256": "4C71B8476C35F44C27BF920E5003073D7DB07C26D816836BF73176F19E3286F5",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 5,
    "studyId": "track-06-study-05",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_05_Fe.pdf",
    "sourceBytes": 950934,
    "sourceSha256": "105FD0C51E79DAC1B551BC311C63C01A157734AA41A16EB991EDCED6303CAB1A",
    "sourcePageCount": 7,
    "sourceTextBytes": 11300,
    "sourceTextSha256": "A40350AB9E339CF20C462DADB255066407643F869C0827B164C547B02F7DAEC5",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 6,
    "studyId": "track-06-study-06",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_06_Vida_Digital.pdf",
    "sourceBytes": 950187,
    "sourceSha256": "D1D3EAD5533FB3BDF4433F76AFD7DEA9C3443362CADC8264EB4512B9CC8F7442",
    "sourcePageCount": 7,
    "sourceTextBytes": 10607,
    "sourceTextSha256": "271404032A2F648C0AF1B03E76D60A8070FB692604683603114601A280BF2A0C",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 7,
    "studyId": "track-06-study-07",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_07_Vicios_E_Compulsoes.pdf",
    "sourceBytes": 949953,
    "sourceSha256": "67C29A52E4FDA825F42052F6A2910AA8A20ECDDCFF3A2D939A19D6FADFCCBF2B",
    "sourcePageCount": 7,
    "sourceTextBytes": 10046,
    "sourceTextSha256": "55D937E99D68ADE356B9C131AB70697A830274B37BFC21BE52B4DAE2012583AB",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 8,
    "studyId": "track-06-study-08",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_08_Solidao_E_Pertencimento.pdf",
    "sourceBytes": 949760,
    "sourceSha256": "FB86D5CDC7FD4A742B09AC4120C33C0FFA7D506EBA0D9B9C3E04A919D13E734C",
    "sourcePageCount": 7,
    "sourceTextBytes": 10006,
    "sourceTextSha256": "2DBDFA536868DD078D169977842EF69173987D588E264E4575B852AC661A3B6C",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 9,
    "studyId": "track-06-study-09",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_09_Discernimento_Espiritual.pdf",
    "sourceBytes": 950051,
    "sourceSha256": "370A5E7EEA7DDDA430B3C34FF8CFC0B5D2A5D2FA79C4B4AA0C43355B1BFA91B8",
    "sourcePageCount": 7,
    "sourceTextBytes": 10061,
    "sourceTextSha256": "614BA38DE5BA522F6170C80BBF8C74ABAB57643788A98025D32CCF6FB67DF3B2",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 10,
    "studyId": "track-06-study-10",
    "sourceRelativePath": "trilha_06_estudos_devocionais\\Biblia_Jornada_Trilha_6_Estudo_10_Cansaco_E_Esperanca.pdf",
    "sourceBytes": 950276,
    "sourceSha256": "AEC32A61C495C14CEF52B5D06270A092508616683D2FAF45AF0AAB784B81273F",
    "sourcePageCount": 7,
    "sourceTextBytes": 10269,
    "sourceTextSha256": "AD6BD813C64F36511EC17BB36FF7C82134AE3246AC2C81F987440FDC801AB102",
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  }
] as const;
const rawStudies = [
  {
    "id": "track-06-study-01",
    "trackId": "track-06",
    "number": 1,
    "slug": "vida-financeira",
    "title": "Vida financeira: quando o dinheiro deixa de ser senhor e volta a ser ferramenta",
    "summary": "Vida financeira: quando o dinheiro deixa de ser senhor e volta a ser ferramenta",
    "questionCentral": "Como lidar com dinheiro, dívidas, desejos, planejamento e generosidade sem permitir que as finanças governem nosso coração?",
    "objective": "Compreender que a Bíblia trata dinheiro como parte da vida espiritual. Recursos podem servir ao bem, mas não podem ocupar o lugar de Deus. Somos chamados a trabalhar, planejar, evitar a escravidão do consumo, honrar compromissos e aprender generosidade e contentamento.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-02",
    "published": false
  },
  {
    "id": "track-06-study-02",
    "trackId": "track-06",
    "number": 2,
    "slug": "juventude",
    "title": "Juventude: ser de Cristo quando o mundo disputa sua identidade",
    "summary": "Juventude: ser de Cristo quando o mundo disputa sua identidade",
    "questionCentral": "Como um jovem pode construir identidade, escolhas e futuro em Deus em meio à pressão, comparação e tentações?",
    "objective": "Compreender que juventude não é uma fase de espera espiritual. Deus chama jovens a viver fé real agora, formando caráter, escolhas, relacionamentos e futuro pela Palavra, sem construir identidade sobre aprovação, aparência ou pressão do grupo.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-03",
    "published": false
  },
  {
    "id": "track-06-study-03",
    "trackId": "track-06",
    "number": 3,
    "slug": "vida-familiar",
    "title": "Vida familiar: quando Cristo entra dentro de casa",
    "summary": "Vida familiar: quando Cristo entra dentro de casa",
    "questionCentral": "Como viver amor, respeito, perdão e responsabilidade numa família real e imperfeita?",
    "objective": "Compreender que a família pode ser lugar de graça e formação, mas nenhuma família é perfeita. O Evangelho chama cada pessoa a viver compaixão, verdade, responsabilidade, respeito e perdão, sem usar textos bíblicos para esconder abuso ou manter aparência.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-04",
    "published": false
  },
  {
    "id": "track-06-study-04",
    "trackId": "track-06",
    "number": 4,
    "slug": "vida-profissional",
    "title": "Vida profissional: trabalhar sem fazer do trabalho um deus",
    "summary": "Vida profissional: trabalhar sem fazer do trabalho um deus",
    "questionCentral": "Como enxergar trabalho, carreira, desemprego, ambição e ética à luz da fé?",
    "objective": "Compreender que trabalho pode ser lugar de serviço, provisão e desenvolvimento, mas não deve se tornar nossa identidade ou nosso deus. A Bíblia chama trabalhadores e líderes à integridade, justiça, excelência, descanso e responsabilidade.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-05",
    "published": false
  },
  {
    "id": "track-06-study-05",
    "trackId": "track-06",
    "number": 5,
    "slug": "fe",
    "title": "Fé: muito mais do que acreditar que Deus existe",
    "summary": "Fé: muito mais do que acreditar que Deus existe",
    "questionCentral": "O que diferencia reconhecer uma verdade sobre Deus, confiar em Cristo para salvação, pedir sua intervenção e viver uma fé que produz obras?",
    "objective": "Compreender que a Bíblia usa a linguagem da fé de maneira rica. Fé salvadora confia em Cristo; fé na oração pede porque Deus pode agir, sem tentar controlá-lo; e fé viva produz obediência. Simples reconhecimento intelectual, por si só, não é tudo o que o Evangelho chama de fé.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-06",
    "published": false
  },
  {
    "id": "track-06-study-06",
    "trackId": "track-06",
    "number": 6,
    "slug": "vida-digital",
    "title": "Vida digital: quem está discipulando minha mente?",
    "summary": "Vida digital: quem está discipulando minha mente?",
    "questionCentral": "O que aquilo que vemos, seguimos, curtimos e consumimos todos os dias está formando dentro de nós?",
    "objective": "Compreender que tecnologia é ferramenta, não inimiga, mas nossa atenção, desejos e pensamentos podem ser profundamente moldados pelo ambiente digital. A Bíblia nos chama a discernir o que ocupa a mente, administrar o tempo e não permitir que nenhuma ferramenta nos domine.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-07",
    "published": false
  },
  {
    "id": "track-06-study-07",
    "trackId": "track-06",
    "number": 7,
    "slug": "vicios-e-compulsoes",
    "title": "Vícios e compulsões: quando aquilo que eu uso começa a me dominar",
    "summary": "Vícios e compulsões: quando aquilo que eu uso começa a me dominar",
    "questionCentral": "Como reconhecer aquilo que começou a nos dominar e buscar liberdade com verdade, graça, responsabilidade e ajuda?",
    "objective": "Compreender que Cristo nos chama à liberdade e ao domínio próprio. Há hábitos, comportamentos e substâncias que podem ganhar poder sobre nossa vida. A resposta bíblica une verdade, arrependimento, graça, mudanças práticas, comunidade e, quando necessário, cuidado especializado.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-08",
    "published": false
  },
  {
    "id": "track-06-study-08",
    "trackId": "track-06",
    "number": 8,
    "slug": "solidao-e-pertencimento",
    "title": "Solidão e pertencimento: quando estou cercado de pessoas e ainda me sinto sozinho",
    "summary": "Solidão e pertencimento: quando estou cercado de pessoas e ainda me sinto sozinho",
    "questionCentral": "Como enfrentar solidão, rejeição e isolamento sem construir toda nossa segurança na aprovação das pessoas?",
    "objective": "Compreender que Deus nos conhece pessoalmente e também nos chama para uma comunidade. Solidão não é sempre sinal de falta de fé, e pertencimento cristão não significa agradar todos. Podemos buscar vínculos verdadeiros, aprender a receber companhia e tornar-nos presença para outros.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-09",
    "published": false
  },
  {
    "id": "track-06-study-09",
    "trackId": "track-06",
    "number": 9,
    "slug": "discernimento-espiritual",
    "title": "Discernimento espiritual: nem tudo que parece de Deus vem de Deus",
    "summary": "Discernimento espiritual: nem tudo que parece de Deus vem de Deus",
    "questionCentral": "Como reconhecer o que realmente está de acordo com Deus quando tantas vozes afirmam falar em nome dele?",
    "objective": "Compreender que a Bíblia manda examinar mensagens, ensinos e manifestações. Discernimento cristão não é incredulidade automática nem aceitação ingênua; é testar à luz das Escrituras, de Cristo, do Evangelho e dos frutos, com humildade e comunidade.",
    "estimatedMinutes": null,
    "nextStudyId": "track-06-study-10",
    "published": false
  },
  {
    "id": "track-06-study-10",
    "trackId": "track-06",
    "number": 10,
    "slug": "cansaco-e-esperanca",
    "title": "Cansaço e esperança: quando a alma diz “não aguento mais”",
    "summary": "Cansaço e esperança: quando a alma diz “não aguento mais”",
    "questionCentral": "Como Deus cuida de pessoas cansadas e como reencontrar esperança sem fingir força?",
    "objective": "Compreender que cansaço não é sempre sinal de fracasso espiritual. Em 1 Reis 19, Deus encontra Elias em profunda exaustão, oferece cuidado, presença, correção de perspectiva e nova direção. A esperança pode recomeçar por passos pequenos.",
    "estimatedMinutes": null,
    "nextStudyId": null,
    "published": false
  }
] as const;
const rawSectionsByStudy = [
  {
    "studyId": "track-06-study-01",
    "sections": [
      {
        "id": "track-06-study-01-golden-text-1",
        "studyId": "track-06-study-01",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Onde estiver o vosso tesouro, aí estará também o vosso coração.” Mateus 6:21"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-01-practical-truth-2",
        "studyId": "track-06-study-01",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Dinheiro é uma ferramenta importante, mas um senhor cruel; a fé nos ensina a administrar recursos sem entregar a eles nossa identidade, segurança e esperança."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-01-bible-reading-3",
        "studyId": "track-06-study-01",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: Mateus 6:19-34 Depois, conecte com: Provérbios 6:6-11 | Provérbios 22:7 | 1 Timóteo 6:6-10,17-19 | 2 Coríntios 9:6-11 | Lucas 12:13-21"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-01-before-understanding-4",
        "studyId": "track-06-study-01",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Dinheiro está presente em quase todos os dias da vida. Precisamos pagar contas, comprar comida, planejar o futuro, ajudar pessoas e lidar com desejos. Por isso, falar de finanças também é falar do coração. Jesus falou sobre tesouros, ansiedade e senhores porque sabia que recursos podem deixar de ser ferramentas e começar a ocupar um lugar que não lhes pertence. A Bíblia não diz que possuir dinheiro é pecado. Também não ensina que riqueza é prova automática de aprovação de Deus ou que pobreza é prova de falta de fé. A pergunta mais profunda é: quem governa quem?"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-01-read-5",
        "studyId": "track-06-study-01",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: Mateus 6:19-34"
          },
          {
            "type": "PARAGRAPH",
            "text": "Em Mateus 6, Jesus fala de tesouros, olhos, senhores e preocupações. Esses assuntos parecem diferentes, mas estão ligados pela mesma pergunta: onde está nossa confiança?"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-01-observe-6",
        "studyId": "track-06-study-01",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. O dinheiro revela onde o coração busca segurança"
          },
          {
            "type": "PARAGRAPH",
            "text": "Jesus conecta tesouro e coração. Isso não significa que toda pessoa com recursos seja materialista. Significa que aquilo que acumulamos, tememos perder e perseguimos pode revelar o que consideramos mais valioso. Uma pergunta útil Se eu perdesse determinada coisa, sentiria que perdi apenas um recurso ou que perdi minha própria identidade?"
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. Jesus afirma que não podemos servir a dois senhores"
          },
          {
            "type": "PARAGRAPH",
            "text": "Dinheiro pode ser usado para alimento, moradia, estudo, cuidado e missão. Mas quando passa a definir todas as decisões, ele deixa de ser ferramenta. Jesus chama esse rival de Mamom. O problema não é usar dinheiro É permitir que o dinheiro nos use."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. A preocupação financeira é levada ao cuidado do Pai"
          },
          {
            "type": "PARAGRAPH",
            "text": "Jesus fala de comida e roupa, necessidades verdadeiras. Ele não ridiculariza quem precisa de sustento. Ele chama seus discípulos a trabalhar e viver sem transformar preocupação em senhor do coração. Necessidade real não é falta de fé Podemos pedir provisão e agir com responsabilidade."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. Buscar primeiro o Reino reorganiza prioridades"
          },
          {
            "type": "PARAGRAPH",
            "text": "Jesus não promete riqueza para quem coloca Deus em primeiro lugar. Ele ensina que o Reino deve possuir a prioridade que o dinheiro frequentemente tenta ocupar. A pergunta muda Não apenas “quanto posso ganhar?”, mas “como posso viver fielmente com aquilo que recebo?”"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-01-understand-7",
        "studyId": "track-06-study-01",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Trabalho e planejamento fazem parte da sabedoria bíblica"
          },
          {
            "type": "PARAGRAPH",
            "text": "Provérbios valoriza diligência e preparação. Planejar despesas, guardar para necessidades previsíveis e trabalhar com responsabilidade não demonstram falta de confiança. Podem ser expressões de boa administração. Planejamento não substitui Deus Mas também não deve ser substituído por irresponsabilidade religiosa."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Dívida pode limitar nossa liberdade"
          },
          {
            "type": "PARAGRAPH",
            "text": "Provérbios 22:7 descreve o devedor como alguém submetido ao credor. Nem toda dívida possui a mesma natureza, e a Bíblia não oferece uma planilha financeira pronta. Mas o princípio é claro: compromissos financeiros precisam ser assumidos com seriedade. Antes de assumir uma dívida, pergunte Tenho condição realista de cumprir esse compromisso sem destruir necessidades essenciais? CONECTE 3. Contentamento protege contra o consumo sem fim 1 Timóteo 6 alerta que o amor ao dinheiro produz muitos males. Paulo não condena simplesmente possuir; ele confronta a confiança nas riquezas e chama à generosidade. Ter mais não encerra automaticamente o desejo de ter mais Contentamento precisa ser aprendido."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Generosidade faz parte de uma vida financeira saudável diante de Deus"
          },
          {
            "type": "PARAGRAPH",
            "text": "2 Coríntios 9 fala de contribuição voluntária e alegre. Generosidade não é barganha para obrigar Deus a devolver mais. É gratidão e participação no cuidado de pessoas e na obra de Deus. Oferta não compra milagre Graça não está à venda."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não transforme prosperidade em medida de espiritualidade Homens e mulheres fiéis na Bíblia atravessaram fartura e escassez. Jesus não ensinou que todo discípulo fiel se tornará rico. Prometer riqueza como resultado garantido de fé vai além do que o Novo Testamento ensina. Deus pode prover de muitas maneiras Mas fidelidade não pode ser medida pelo saldo bancário. Não use generosidade para ignorar responsabilidade Quem possui pessoas dependentes precisa considerar alimentação, moradia, saúde e compromissos. Dar por pressão e depois deixar necessidades básicas descobertas não é sabedoria. Generosidade e responsabilidade caminham juntas A fé não exige desorganização. + APROFUNDE O que a Bíblia ensina sobre orçamento, reserva e investimentos? A Bíblia não apresenta um modelo moderno de orçamento ou investimento. Mas oferece princípios: diligência, prudência, honestidade, planejamento, cuidado com dívidas, generosidade e recusa da ganância. Ferramentas modernas podem ser usadas à luz desses princípios. Uma reserva para emergências, por exemplo, pode ser expressão de prudência; não precisa significar que nossa confiança deixou de estar em Deus. Princípio antes da ferramenta Use recursos modernos sem transformá-los em segurança absoluta."
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-01-apply-8",
        "studyId": "track-06-study-01",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Saiba para onde seu dinheiro está indo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Muitas dificuldades aumentam porque nunca olhamos para os números. Registrar entradas e saídas é uma prática simples de verdade. O que não é visto dificilmente é administrado Organização também é parte da mordomia."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Diferencie necessidade, desejo e comparação"
          },
          {
            "type": "PARAGRAPH",
            "text": "Nem todo desejo é errado. Mas comparação pode transformar o estilo de vida de outra pessoa em obrigação para nós. Pergunte antes de comprar Eu preciso disso, desejo isso com liberdade ou estou tentando provar algo?"
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Se existe dívida, construa um caminho de responsabilidade"
          },
          {
            "type": "PARAGRAPH",
            "text": "Liste compromissos, evite aumentar dívidas desnecessárias e, quando possível, negocie condições realistas. Se a situação estiver fora de controle, procure orientação confiável. Vergonha não paga dívida Verdade e planejamento podem iniciar um caminho de saída."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Separe espaço para generosidade"
          },
          {
            "type": "PARAGRAPH",
            "text": "Se sempre esperamos sobrar, talvez nunca compartilhemos. Generosidade pode ser intencional e proporcional à realidade. Mãos abertas lembram ao coração quem é o Senhor Recursos recebidos também podem servir outros."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-01-journey-takeaway-9",
        "studyId": "track-06-study-01",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "A Bíblia não trata dinheiro como assunto separado da fé. Jesus fala do coração, da confiança e dos senhores que disputam nossa vida. Dinheiro pode ser bênção, ferramenta e responsabilidade. Mas não consegue carregar o peso de nossa identidade ou esperança. Uma vida financeira madura aprende trabalho, planejamento, contentamento, honestidade e generosidade."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não precisamos amar o dinheiro nem ter medo dele; precisamos aprender a administrá-lo debaixo do senhorio de Cristo."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "Finanças colocadas diante de Deus deixam de ser apenas números e se tornam parte de uma vida de responsabilidade, liberdade e generosidade."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-01-practice-today-10",
        "studyId": "track-06-study-01",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Hoje, faça um retrato simples de sua realidade financeira. Anote: Quanto entra? Quais são as despesas essenciais? Que dívida ou consumo precisa de atenção? Onde posso praticar generosidade de maneira responsável? Ore antes de tomar a próxima decisão financeira importante."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-01-reflection-questions-11",
        "studyId": "track-06-study-01",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Meu valor pessoal sobe e desce conforme meu dinheiro?",
              "Que compra recente nasceu mais de comparação do que de necessidade?",
              "Existe algum compromisso financeiro que preciso encarar com verdade?",
              "Tenho confundido fé com promessa de enriquecimento?",
              "Minha maneira de usar recursos inclui generosidade?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-01-journal-prompt-12",
        "studyId": "track-06-study-01",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "O que minhas escolhas financeiras atuais revelam sobre aquilo em que mais tenho buscado segurança?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-01-prayer-13",
        "studyId": "track-06-study-01",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, tudo o que tenho pertence ao mundo que tu criaste e chegou às minhas mãos por caminhos que dependem da tua graça. Ensina-me a trabalhar, planejar e administrar com honestidade. Livra-me da ganância, da comparação e do medo que transforma dinheiro em senhor. Dá-me sabedoria diante de dívidas e desejos, responsabilidade com minha casa e alegria para compartilhar. Que minha segurança esteja em ti e não no saldo de uma conta. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-01-keep-14",
        "studyId": "track-06-study-01",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Mateus 6:21 - Onde está o tesouro, ali o coração se inclina. 1 Timóteo 6:17-19 - Recursos devem ser recebidos com humildade e usados com generosidade. Favoritos Guarde essas passagens para consultar antes de decisões financeiras importantes."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-01-group-mode-15",
        "studyId": "track-06-study-01",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe O que Mateus 6 revela sobre a relação entre dinheiro, coração e confiança?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como distinguir planejamento responsável de confiança excessiva no dinheiro?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Que prática financeira simples pode ajudar uma família ou pessoa nesta semana?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-01-continue-journey-16",
        "studyId": "track-06-study-01",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Dinheiro disputa nosso coração. Na juventude, muitas outras vozes também disputam identidade, direção e futuro."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo 02 - Juventude: ser de Cristo quando o mundo disputa sua identidade Pergunta central: Como um jovem pode construir identidade, escolhas e futuro em Deus em meio à pressão, comparação e tentações?"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-01-references-17",
        "studyId": "track-06-study-01",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Mateus 6:19-34 Provérbios 6:6-11 Provérbios 22:7 1 Timóteo 6:6-10,17-19 2 Coríntios 9:6-11 Lucas 12:13-21"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-02",
    "sections": [
      {
        "id": "track-06-study-02-golden-text-1",
        "studyId": "track-06-study-02",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Ninguém despreze a tua mocidade; mas sê o exemplo dos fiéis.” 1 Timóteo 4:12"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-02-practical-truth-2",
        "studyId": "track-06-study-02",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "O jovem não precisa esperar ficar mais velho para levar Deus a sério; pode começar agora a construir uma vida que não seja governada pela pressão do momento."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-02-bible-reading-3",
        "studyId": "track-06-study-02",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: 1 Timóteo 4:12-16 Depois, conecte com: Eclesiastes 11:9-12:1 | Daniel 1:8-20 | Salmo 119:9-11 | 2 Timóteo 2:22 | Provérbios 4:20-27"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-02-before-understanding-4",
        "studyId": "track-06-study-02",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Juventude é uma fase de possibilidades. Também pode ser uma fase de muita pressão. Escolher profissão, construir amizades, lidar com o corpo, sexualidade, redes sociais, expectativas da família e medo de ficar para trás. Em meio a tudo isso, a fé pode parecer apenas mais uma voz disputando atenção. Paulo escreve a Timóteo, um líder relativamente jovem, e não lhe diz para esperar ficar mais velho. Ele o chama a ser exemplo agora. Isso não significa perfeição precoce. Significa que juventude também pode ser tempo de raízes profundas."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-02-read-5",
        "studyId": "track-06-study-02",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: 1 Timóteo 4:12-16"
          },
          {
            "type": "PARAGRAPH",
            "text": "Em 1 Timóteo 4, Paulo orienta um jovem responsável por ensinar e cuidar de uma comunidade. O conselho une caráter, Palavra, perseverança e exemplo."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-02-observe-6",
        "studyId": "track-06-study-02",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. Juventude não é impedimento para uma vida séria com Deus"
          },
          {
            "type": "PARAGRAPH",
            "text": "Timóteo poderia ser desprezado por sua idade. Paulo não responde com insegurança, mas com uma vida exemplar. Você não precisa provar maturidade fazendo barulho Caráter consistente fala mais alto."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. O exemplo aparece em áreas muito concretas"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo cita palavra, procedimento, amor, fé e pureza. Isso alcança conversas, comportamento, relacionamentos, confiança em Deus e uso do corpo. Espiritualidade jovem não é apenas evento Ela aparece na segunda-feira."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. A Palavra ocupa lugar central"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo manda Timóteo dedicar-se à leitura e ao ensino. Salmo 119 também pergunta como o jovem purificará seu caminho e responde apontando para a Palavra. Quem não escolhe o que forma sua mente será formado pelo fluxo ao redor A Palavra precisa de espaço real."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. Crescimento precisa ser visível ao longo do tempo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo fala de progresso. Isso é diferente de perfeição. Um jovem pode olhar para trás e perceber que Deus está formando áreas que antes eram frágeis. Não se compare apenas com os outros Compare sua direção de hoje com a de ontem."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-02-understand-7",
        "studyId": "track-06-study-02",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Identidade não precisa ser construída sobre aprovação"
          },
          {
            "type": "PARAGRAPH",
            "text": "Redes sociais transformam aprovação em números. Grupos também possuem regras invisíveis para decidir quem é aceito. Mas o Evangelho oferece uma identidade recebida em Cristo. Você não precisa ser desejado por todos para ter valor Pertencer a Cristo muda o centro da identidade."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Pureza não é vergonha do corpo"
          },
          {
            "type": "PARAGRAPH",
            "text": "A Bíblia chama à pureza porque o corpo pertence a Deus e possui dignidade. Isso inclui sexualidade, conteúdo consumido, respeito pelo corpo do outro e domínio próprio. Pureza não é medo do corpo É aprender a tratá-lo com honra. CONECTE 3. Daniel mostra convicção sem arrogância Daniel decide não se contaminar, mas conversa com respeito e sabedoria. Ele não precisa insultar o ambiente para permanecer fiel. Convicção não exige grosseria É possível ser firme e respeitoso."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Escolhas pequenas constroem futuros"
          },
          {
            "type": "PARAGRAPH",
            "text": "Há decisões que parecem pequenas: amizades, hábitos, conteúdo, estudo, uso do tempo. Com o tempo, elas formam direção. Futuro não é construído apenas numa grande decisão É formado por muitos hábitos repetidos."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não pressione jovens com a ideia de que um erro destruiu toda a vida Escolhas possuem consequências, mas a graça de Deus também oferece arrependimento e recomeço. Uma queda não precisa se tornar identidade permanente. Responsabilidade e esperança caminham juntas Podemos aprender com erros sem viver condenados por eles. Também não trate dúvidas como rebeldia automática Jovens fazem perguntas sobre fé, ciência, sexualidade, sofrimento e futuro. Perguntas honestas precisam de espaço seguro, Bíblia aberta e paciência. Uma fé que pode ser examinada se torna mais profunda Não tenha medo de perguntar com humildade. + APROFUNDE Como discernir amizades e influências? Provérbios ensina que companhias formam. Isso não significa viver isolado de quem pensa diferente. Jesus se aproximou de muitas pessoas sem permitir que todas definissem seu caminho. Pergunte: esta amizade me aproxima da verdade? Respeita meus limites? Alimenta coragem para fazer o bem ou pressiona para esconder aquilo em que creio? Amizade não precisa ser perfeita Mas proximidade profunda merece discernimento."
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-02-apply-8",
        "studyId": "track-06-study-02",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Escolha quem terá permissão para formar sua mente"
          },
          {
            "type": "PARAGRAPH",
            "text": "Você não controla tudo o que aparece, mas pode decidir o que segue, repete e consome. Algumas contas e conteúdos precisam deixar de ter acesso constante. Seu feed também discipula Não entregue horas diárias a vozes que enfraquecem tudo o que você diz valorizar."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Construa hábitos antes de depender da motivação"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo, oração, exercício, trabalho e leitura amadurecem com rotina. Motivação muda rápido. Disciplina protege aquilo que você diz querer Pequenos horários ajudam grandes propósitos."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Procure pessoas mais maduras"
          },
          {
            "type": "PARAGRAPH",
            "text": "Timóteo tinha Paulo. Todo jovem se beneficia de alguém confiável que possa ouvir, orientar e também corrigir. Mentoria não tira liberdade Pode evitar que você aprenda tudo apenas pelo preço dos próprios erros."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Sirva agora"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não aceite a ideia de que jovem é apenas “a igreja do futuro”. Jovens fazem parte da Igreja hoje e podem servir hoje. Comece com o que está em suas mãos Fidelidade não precisa esperar diploma ou idade."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-02-journey-takeaway-9",
        "studyId": "track-06-study-02",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Juventude é tempo de construção, não de espera espiritual. Paulo chama Timóteo a viver exemplo, Palavra, amor, fé e pureza. Isso não significa ser perfeito. Significa permitir que Cristo forme escolhas enquanto muitas vozes disputam identidade. Os hábitos, amizades e convicções de hoje ajudam a construir o adulto de amanhã."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "A melhor maneira de preparar o futuro não é controlar tudo o que virá, mas aprender a ser fiel a Cristo no presente."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "Um jovem firmado na Palavra pode atravessar pressão, dúvidas e tentações sem precisar entregar sua identidade à aprovação do mundo."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-02-practice-today-10",
        "studyId": "track-06-study-02",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Escolha uma área que mais influencia sua juventude agora: amigos, redes sociais, estudos, sexualidade, futuro ou família. Anote uma influência que precisa diminuir e uma prática bíblica que precisa crescer. Converse com uma pessoa madura sobre isso."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-02-reflection-questions-11",
        "studyId": "track-06-study-02",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Que opinião possui poder demais sobre minha identidade?",
              "Que conteúdo mais tem formado minha mente?",
              "Existe uma amizade que pressiona meus limites de maneira constante?",
              "Que hábito de hoje pode abençoar meu futuro?",
              "Quem é uma pessoa madura com quem posso caminhar?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-02-journal-prompt-12",
        "studyId": "track-06-study-02",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Que tipo de pessoa desejo estar me tornando diante de Deus e que escolha de hoje combina com essa direção?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-02-prayer-13",
        "studyId": "track-06-study-02",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, obrigado pela vida e pelas possibilidades desta fase. Guarda meu coração da comparação, da pressão e da necessidade de aprovação. Dá-me coragem para escolher o que é certo, humildade para aprender e pureza para honrar-te com meu corpo e minhas relações. Coloca pessoas maduras perto de mim e ajuda-me a usar meu tempo, meus dons e minha juventude para tua glória. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-02-keep-14",
        "studyId": "track-06-study-02",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1 Timóteo 4:12 - Juventude pode ser tempo de exemplo. Salmo 119:9-11 - A Palavra guarda o caminho. Favoritos Guarde essas passagens para os momentos em que pressão e comparação tentarem dirigir suas escolhas."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-02-group-mode-15",
        "studyId": "track-06-study-02",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe Em quais áreas Paulo chama Timóteo a ser exemplo?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como diferenciar convicção de arrogância?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Que influências atuais mais disputam a mente dos jovens e como responder biblicamente?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-02-continue-journey-16",
        "studyId": "track-06-study-02",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Nossa identidade também é formada dentro de casa. A família pode ser lugar de cuidado, tensão, aprendizado e profundas feridas."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo 03 - Vida familiar: quando Cristo entra dentro de casa Pergunta central: Como viver amor, respeito, perdão e responsabilidade numa família real e imperfeita?"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-02-references-17",
        "studyId": "track-06-study-02",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1 Timóteo 4:12-16 Eclesiastes 11:9-12:1 Daniel 1:8-20 Salmo 119:9-11 2 Timóteo 2:22 Provérbios 4:20-27"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-03",
    "sections": [
      {
        "id": "track-06-study-03-golden-text-1",
        "studyId": "track-06-study-03",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“E, sobre tudo isto, revesti-vos de amor, que é o vínculo da perfeição.” Colossenses 3:14"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-03-practical-truth-2",
        "studyId": "track-06-study-03",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Uma família cristã não é aquela que nunca enfrenta conflitos, mas aquela que aprende a colocar Cristo no centro da forma como fala, corrige, perdoa, serve e protege."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-03-bible-reading-3",
        "studyId": "track-06-study-03",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: Colossenses 3:12-21 Depois, conecte com: Efésios 4:25-32 | Josué 24:14-15 | Salmo 127:1-5 | Provérbios 15:1 | 1 Pedro 3:8-9"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-03-before-understanding-4",
        "studyId": "track-06-study-03",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Famílias carregam histórias. Há casas marcadas por carinho e outras por silêncio, ausência, conflitos ou feridas. Algumas pessoas cresceram em famílias cristãs. Outras conheceram a fé apesar de um ambiente muito difícil. Por isso precisamos falar de família sem idealizar. A Bíblia apresenta chamados para pais, filhos, maridos, esposas e comunidade. Mas o centro não é construir uma fotografia perfeita. É permitir que Cristo transforme pessoas reais dentro de relações reais."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-03-read-5",
        "studyId": "track-06-study-03",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: Colossenses 3:12-21"
          },
          {
            "type": "PARAGRAPH",
            "text": "Colossenses 3 começa falando da nova vida e depois leva essa vida para dentro dos relacionamentos. Antes das instruções familiares, Paulo fala de compaixão, bondade, humildade, paciência, perdão e amor."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-03-observe-6",
        "studyId": "track-06-study-03",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. O caráter cristão vem antes dos papéis familiares"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo não começa com autoridade. Começa com coração revestido de misericórdia, bondade e humildade. Nenhum papel familiar substitui caráter Ser pai, mãe, marido, esposa ou filho não autoriza dureza."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. Perdão é necessário porque famílias reais ferem"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo reconhece que existem queixas. Isso é muito diferente de imaginar uma casa cristã sem conflito. Famílias precisam aprender a reparar Não apenas esconder problemas para proteger reputação."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. Pais recebem uma advertência direta"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo manda pais não irritarem ou desanimarem seus filhos. Autoridade paterna não é licença para humilhação, medo permanente ou agressão. Disciplina cristã precisa formar, não esmagar Correção sem amor pode destruir aquilo que pretende ensinar."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. Toda a casa permanece debaixo do senhorio de Cristo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Colossenses repete a referência ao Senhor. Isso significa que nenhuma pessoa da família é o senhor absoluto das outras. Cristo é o centro Todo poder humano dentro da casa continua debaixo dele."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-03-understand-7",
        "studyId": "track-06-study-03",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Família cristã não é família sem problemas"
          },
          {
            "type": "PARAGRAPH",
            "text": "A Bíblia está cheia de famílias com favoritismo, conflito, pecado e reconciliação. Ser cristão não elimina automaticamente padrões aprendidos. O Evangelho nos dá caminho de transformação Não uma maquiagem religiosa."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Respeito não significa silêncio diante do pecado"
          },
          {
            "type": "PARAGRAPH",
            "text": "Honrar familiares não exige concordar com tudo. Há momentos em que verdade, limite e até distância podem ser necessários. Respeito e verdade podem caminhar juntos Submissão nunca deve ser transformada em instrumento para proteger violência. CONECTE 3. Efésios mostra que palavras e emoções precisam ser tratadas Paulo fala de mentira, ira, amargura e palavras que destroem. Uma família pode frequentar a igreja e ainda precisar aprender a conversar. O culto da casa continua nas conversas A forma de falar também é espiritual."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Nem todo lar possui a mesma configuração"
          },
          {
            "type": "PARAGRAPH",
            "text": "Existem viúvos, solteiros, famílias monoparentais, avós cuidadores, famílias com membros não cristãos e outras realidades. A edificação bíblica não deve tratar pessoas fora do modelo mais comum como menos valiosas. A Igreja precisa ser família também O corpo de Cristo acolhe pessoas em muitas histórias familiares."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Nenhum texto familiar deve ser usado para manter violência ou abuso Se existe agressão, ameaça, abuso sexual, coerção ou risco, buscar proteção e ajuda responsável é correto. Perdão e preservação da família não exigem permanecer em perigo. A aparência da família não vale mais que a segurança das pessoas Verdade e proteção importam. Filhos não devem carregar responsabilidades emocionais de adultos Pais podem pedir ajuda e ensinar responsabilidade, mas não devem transformar filhos em árbitros de conflitos conjugais ou responsáveis pela estabilidade emocional da casa. Crianças e jovens também precisam ser protegidos Maturidade deve ser construída no tempo certo. + APROFUNDE Como aplicar textos sobre marido, esposa, pais e filhos sem transformar a Bíblia em arma? Comece aplicando o texto a si mesmo antes de usá-lo para cobrar o outro. Observe que as cartas apostólicas colocam todos debaixo do senhorio de Cristo e atribuem responsabilidades a cada parte. Quando alguém usa apenas o dever do outro para ampliar seu próprio poder, o espírito do texto já está sendo perdido. Uma regra saudável Leia primeiro perguntando: o que Deus está pedindo de mim?"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-03-apply-8",
        "studyId": "track-06-study-03",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Crie espaço para conversas verdadeiras"
          },
          {
            "type": "PARAGRAPH",
            "text": "Famílias podem morar juntas e conversar apenas sobre tarefas. Reserve momentos sem tela para perguntar como cada pessoa está. Presença não é apenas estar na mesma casa É prestar atenção."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Peça perdão de maneira específica"
          },
          {
            "type": "PARAGRAPH",
            "text": "“Desculpa por qualquer coisa” dificilmente repara. Melhor dizer: “Falei com dureza. Isso foi errado. Você me perdoa?” Arrependimento nomeia o erro Isso ensina humildade dentro de casa."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Não use a casa como lugar onde o pior comportamento é permitido"
          },
          {
            "type": "PARAGRAPH",
            "text": "Às vezes tratamos estranhos com educação e familiares com impaciência. Mas o lar é um dos primeiros lugares onde o fruto do Espírito deve aparecer. Familiaridade não autoriza descuido Quem está perto também merece nossa melhor atenção."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Construa pequenos hábitos de fé"
          },
          {
            "type": "PARAGRAPH",
            "text": "Uma oração antes de dormir, uma refeição sem telas, leitura curta, gratidão, conversa sobre o culto. Não transforme tudo em cerimônia pesada. Constância simples pode formar memória espiritual A fé também cresce em rotinas pequenas."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-03-journey-takeaway-9",
        "studyId": "track-06-study-03",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Família é um dos lugares mais profundos da formação humana. O Evangelho não promete uma casa sem conflitos. Ele chama cada pessoa à compaixão, verdade, humildade, perdão e responsabilidade. Também coloca limites no uso da autoridade e protege a dignidade dos mais vulneráveis. Cristo no centro não é apenas uma placa na parede; é sua Palavra mudando a maneira como a casa vive."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "Uma família edificada pela fé aprende a falar a verdade, reparar feridas, proteger pessoas e servir uns aos outros debaixo do senhorio de Cristo."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "A presença de Cristo transforma o lar quando cada pessoa começa a perguntar menos “quem manda?” e mais “como posso viver aqui de maneira fiel, amorosa e verdadeira?”"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-03-practice-today-10",
        "studyId": "track-06-study-03",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Escolha uma ação familiar para esta semana: uma conversa que precisa acontecer; um pedido de perdão; um limite que precisa ser respeitado; um hábito simples de fé que pode começar. Faça apenas uma coisa com constância."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-03-reflection-questions-11",
        "studyId": "track-06-study-03",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Que padrão da minha família de origem ainda influencia minhas reações?",
              "Tenho usado silêncio para evitar uma conversa necessária?",
              "Preciso pedir perdão a alguém de casa?",
              "Existe algum limite de segurança ou respeito que precisa ser estabelecido?",
              "Que hábito pode tornar a fé mais presente na rotina da família?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-03-journal-prompt-12",
        "studyId": "track-06-study-03",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Qual mudança dentro de mim poderia melhorar de maneira concreta a forma como vivo com minha família?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-03-prayer-13",
        "studyId": "track-06-study-03",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, tu conheces minha história familiar, as alegrias e as feridas. Forma em mim compaixão, humildade e verdade. Ensina-me a pedir perdão, a ouvir e a falar sem destruir. Protege os vulneráveis e dá sabedoria para estabelecer limites quando necessário. Que minha casa, seja qual for sua realidade, encontre em Cristo um caminho de graça, responsabilidade e paz. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-03-keep-14",
        "studyId": "track-06-study-03",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Colossenses 3:12-14 - Revesti-vos de compaixão, bondade, humildade, paciência e amor. Colossenses 3:21 - Pais são chamados a não desanimar os filhos. Favoritos Guarde essas passagens para revisar antes de conflitos e conversas importantes em família."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-03-group-mode-15",
        "studyId": "track-06-study-03",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe Por que Colossenses começa pelo caráter antes de falar de funções familiares?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como diferenciar respeito de silêncio diante do mal?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Que hábito simples pode ajudar uma família a viver a fé no cotidiano?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-03-continue-journey-16",
        "studyId": "track-06-study-03",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Grande parte da vida adulta acontece no trabalho. Também ali nossa fé pode ser provada, amadurecida e colocada a serviço."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo 04 - Vida profissional: trabalhar sem fazer do trabalho um deus Pergunta central: Como enxergar trabalho, carreira, desemprego, ambição e ética à luz da fé?"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-03-references-17",
        "studyId": "track-06-study-03",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Colossenses 3:12-21 Efésios 4:25-32 Josué 24:14-15 Salmo 127:1-5 Provérbios 15:1 1 Pedro 3:8-9"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-04",
    "sections": [
      {
        "id": "track-06-study-04-golden-text-1",
        "studyId": "track-06-study-04",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“E tudo quanto fizerdes, fazei-o de todo o coração, como ao Senhor.” Colossenses 3:23"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-04-practical-truth-2",
        "studyId": "track-06-study-04",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Trabalhar para o Senhor não significa aceitar exploração nem viver para a carreira; significa levar caráter, excelência e justiça para aquilo que fazemos."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-04-bible-reading-3",
        "studyId": "track-06-study-04",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: Colossenses 3:22-4:1 Depois, conecte com: 1 Tessalonicenses 4:9-12 | Efésios 4:28 | Provérbios 22:29 | Tiago 5:1-6 | Êxodo 20:8-11"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-04-before-understanding-4",
        "studyId": "track-06-study-04",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Trabalho ocupa muitas horas da vida. Por isso pode se tornar fonte de alegria, frustração, provisão, orgulho, cansaço e identidade. Alguns estão satisfeitos com sua profissão. Outros estão desempregados, subempregados ou presos a ambientes difíceis. A Bíblia fala sobre trabalho de maneira séria. Mas Colossenses 3 também exige cuidado: o texto foi escrito num mundo em que existia escravidão. Não devemos tratar a relação antiga entre senhor e escravo como equivalente perfeito a emprego moderno. Ainda assim, o texto coloca todos debaixo do mesmo Senhor e oferece princípios fortes de integridade e justiça."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-04-read-5",
        "studyId": "track-06-study-04",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: Colossenses 3:22-4:1"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo fala a pessoas com posições muito diferentes dentro de uma casa antiga. Ele chama quem serve a trabalhar com sinceridade e quem possui poder a tratar os outros com justiça, lembrando que também possui Senhor nos céus."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-04-observe-6",
        "studyId": "track-06-study-04",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. Deus vê o trabalho que ninguém aplaude"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo confronta o serviço feito apenas quando alguém está olhando. Isso fala diretamente à integridade. Caráter profissional aparece quando não há fiscalização Fidelidade não depende apenas de supervisão."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. Trabalho pode ser oferecido a Deus"
          },
          {
            "type": "PARAGRAPH",
            "text": "“Como ao Senhor” dá dignidade a tarefas comuns. Nem todo trabalho parece grandioso, mas pode ser realizado com honestidade e cuidado. Vocação não é apenas púlpito Muitas pessoas servem a Deus fazendo bem o trabalho diário."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. Quem possui autoridade também responde a Deus"
          },
          {
            "type": "PARAGRAPH",
            "text": "Colossenses 4:1 manda senhores oferecerem justiça e equidade. Isso impede usar o texto apenas para exigir obediência dos que têm menos poder. Liderança também está debaixo de julgamento Deus se importa com a forma como pessoas são tratadas."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. Trabalho não é o único valor da vida"
          },
          {
            "type": "PARAGRAPH",
            "text": "A própria Bíblia que valoriza trabalho também ordena descanso. O sábado em Israel ensinava que pessoas não são máquinas de produção. Seu valor não é igual à sua produtividade Descanso também reconhece que o mundo continua sem nosso controle."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-04-understand-7",
        "studyId": "track-06-study-04",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Excelência não é perfeccionismo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Fazer bem o que está em nossas mãos é diferente de viver com medo constante de errar. Perfeccionismo pode transformar trabalho em fonte de identidade e ansiedade. Excelência busca servir bem Perfeccionismo tenta provar valor."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Ambição precisa de direção"
          },
          {
            "type": "PARAGRAPH",
            "text": "Desejar crescer, estudar e assumir mais responsabilidade não é automaticamente errado. O problema aparece quando promoção vale qualquer preço ou quando pessoas viram degraus. Pergunte não apenas “até onde quero chegar?” Pergunte “quem estou me tornando para chegar lá?” CONECTE 3. Tiago condena exploração econômica Tiago 5 confronta ricos que retêm salário e vivem às custas da injustiça. Isso mostra que vida profissional não é apenas sobre o caráter do empregado. Empregadores também respondem a Deus. Salário justo e tratamento digno são questões espirituais Negócio não está fora da ética bíblica."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Desemprego não retira dignidade"
          },
          {
            "type": "PARAGRAPH",
            "text": "Perder um emprego pode ferir profundamente a identidade. Mas nossa dignidade não começa no crachá. Trabalho é importante; não é nosso nome final. Uma fase sem emprego não significa uma vida sem valor Receber ajuda e recomeçar também fazem parte da caminhada."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não use “trabalhe como para o Senhor” para manter exploração Esse versículo não autoriza salário injusto, assédio, risco desnecessário ou jornadas abusivas. A mesma passagem coloca responsabilidade sobre quem possui autoridade. Fidelidade não é submissão cega à injustiça Há momentos de conversar, denunciar, buscar direitos ou sair. Também não transforme fé em garantia de promoção Ser honesto e competente não garante que toda empresa reconhecerá seu valor. Cristãos fiéis podem sofrer injustiça profissional. Nossa recompensa final não pode depender apenas da carreira Deus continua vendo aquilo que o mercado ignora. + APROFUNDE Existe “chamado” para uma profissão específica? Algumas pessoas percebem direção muito clara para uma área. Outras escolhem entre possibilidades legítimas usando dons, necessidades, oportunidades e sabedoria. A Bíblia não ensina que todo cristão precisa descobrir uma única profissão secreta escolhida por Deus antes de poder trabalhar com paz. Podemos servir a Deus em muitas ocupações honestas. Vocação é maior que cargo Onde quer que esteja, pergunte como sua vida pode honrar a Cristo."
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-04-apply-8",
        "studyId": "track-06-study-04",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Trabalhe com integridade quando ninguém vê"
          },
          {
            "type": "PARAGRAPH",
            "text": "Horário, informação, material, dinheiro e compromisso revelam caráter. Pequenas desonestidades também formam uma pessoa. Não espere uma grande prova ética Fidelidade começa nas pequenas."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Proteja limites entre trabalho e vida"
          },
          {
            "type": "PARAGRAPH",
            "text": "Há períodos de esforço intenso. Mas viver permanentemente indisponível para família, igreja, saúde e descanso pode transformar carreira em ídolo. Trabalho é parte da vida Não precisa devorar a vida inteira."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Se lidera, use poder para servir"
          },
          {
            "type": "PARAGRAPH",
            "text": "Quem contrata, supervisiona ou coordena pessoas precisa lembrar que números possuem rostos. Feedback, salário, carga e respeito fazem parte da liderança. Autoridade cristã não humilha para produzir Ela busca justiça e desenvolvimento."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Se está procurando trabalho, trate a busca como trabalho possível de hoje"
          },
          {
            "type": "PARAGRAPH",
            "text": "Organize currículo, contatos, candidaturas, estudo e rotina. Receba ajuda quando necessário. Desemprego pede esperança e ação Não vergonha e isolamento."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-04-journey-takeaway-9",
        "studyId": "track-06-study-04",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Trabalho possui dignidade, mas não divindade. Podemos servir a Deus com excelência, integridade e justiça em muitas profissões. Quem possui poder deve tratar pessoas com equidade. Quem trabalha deve lembrar que seu valor não depende apenas da produtividade. E quem está sem emprego continua possuindo dignidade diante de Deus."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "A fé entra no trabalho quando fazemos o bem sem transformar carreira, dinheiro ou reconhecimento em nosso senhor."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "Cristo nos chama a trabalhar com todo o coração e, ao mesmo tempo, a lembrar que nossa identidade, descanso e esperança são maiores que nossa profissão."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-04-practice-today-10",
        "studyId": "track-06-study-04",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Escolha uma área profissional para revisar: integridade, excelência, descanso, relacionamento, liderança ou busca por trabalho. Defina uma atitude específica para esta semana. Se necessário, peça conselho a alguém experiente."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-04-reflection-questions-11",
        "studyId": "track-06-study-04",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Meu trabalho virou parte excessiva da minha identidade?",
              "Existe alguma prática profissional que preciso corrigir por integridade?",
              "Tenho confundido excelência com perfeccionismo?",
              "Se lidero, as pessoas sob minha responsabilidade recebem tratamento justo?",
              "Tenho respeitado descanso e relações fora do trabalho?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-04-journal-prompt-12",
        "studyId": "track-06-study-04",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Que mudança profissional faria meu trabalho refletir melhor o senhorio de Cristo sem transformar carreira em meu deus?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-04-prayer-13",
        "studyId": "track-06-study-04",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, obrigado pelo valor do trabalho e pela capacidade de servir. Dá-me integridade quando ninguém observa, excelência sem perfeccionismo e ambição submetida à tua vontade. Se eu liderar, faz-me justo. Se estiver procurando trabalho, sustenta minha dignidade e dá-me perseverança. Guarda-me de transformar produtividade em identidade e ensina-me também a descansar. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-04-keep-14",
        "studyId": "track-06-study-04",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Colossenses 3:23-24 - Trabalhe de coração, lembrando quem é o verdadeiro Senhor. Tiago 5:4 - Deus também vê injustiça praticada por quem possui poder econômico. Favoritos Guarde essas passagens para decisões sobre carreira, ética e liderança."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-04-group-mode-15",
        "studyId": "track-06-study-04",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe Como Colossenses coloca trabalhador e autoridade debaixo do mesmo Senhor?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Qual é a diferença entre excelência e perfeccionismo?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como a fé deve aparecer em ambientes profissionais difíceis?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-04-continue-journey-16",
        "studyId": "track-06-study-04",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Finanças, juventude, família e trabalho revelam como cremos. Agora chegamos ao tema que sustenta todos os outros: a própria fé."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo 05 - Fé: muito mais do que acreditar que Deus existe Pergunta central: O que diferencia reconhecimento intelectual, fé salvadora, fé que pede a Deus e fé que produz obras?"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-04-references-17",
        "studyId": "track-06-study-04",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Colossenses 3:22-4:1 1 Tessalonicenses 4:9-12 Efésios 4:28 Provérbios 22:29 Tiago 5:1-6 Êxodo 20:8-11"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-05",
    "sections": [
      {
        "id": "track-06-study-05-golden-text-1",
        "studyId": "track-06-study-05",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Porque pela graça sois salvos, por meio da fé; e isto não vem de vós; é dom de Deus.” Efésios 2:8"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-05-practical-truth-2",
        "studyId": "track-06-study-05",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Fé bíblica não é pensamento positivo nem força para obrigar Deus a realizar nossos planos; é confiança em Cristo que recebe graça, aprende a depender de Deus e se torna visível numa vida de obediência."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-05-bible-reading-3",
        "studyId": "track-06-study-05",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: Hebreus 11:1-6,32-40 Depois, conecte com: Efésios 2:8-10 | Romanos 10:9-17 | Tiago 2:14-26 | Marcos 9:14-29 | 2 Coríntios 12:7-10"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-05-before-understanding-4",
        "studyId": "track-06-study-05",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Eu acredito em Deus.” “Eu creio que vai acontecer.” “Tenha fé.” Usamos essas frases com significados diferentes. Por isso é importante não criar distinções rígidas entre palavras portuguesas como acreditar, crer e ter fé, como se a Bíblia sempre usasse cada uma para uma etapa diferente. Os termos se sobrepõem nas traduções. Mas a Bíblia realmente mostra respostas diferentes: reconhecer uma verdade, confiar pessoalmente em Cristo, pedir a ação de Deus e demonstrar uma fé que produz fruto. Entender essas diferenças protege nossa fé de dois extremos: uma crença que não muda nada e uma “fé” transformada em técnica para controlar Deus."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-05-read-5",
        "studyId": "track-06-study-05",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: Hebreus 11:1-6,32-40"
          },
          {
            "type": "PARAGRAPH",
            "text": "Hebreus 11 apresenta homens e mulheres que viveram pela fé. Alguns experimentaram livramentos extraordinários. Outros sofreram e morreram sem receber, nesta vida, tudo o que esperavam. Todos aparecem na mesma galeria de fé."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-05-observe-6",
        "studyId": "track-06-study-05",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. Fé envolve confiança na realidade e no caráter de Deus"
          },
          {
            "type": "PARAGRAPH",
            "text": "Hebreus fala de certeza e convicção ligadas ao que se espera e ao que não se vê. Isso não significa acreditar em qualquer desejo com força suficiente. A fé bíblica responde ao Deus que falou e prometeu. Fé precisa de objeto O centro não é a intensidade da minha certeza, mas a fidelidade de Deus."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. Simples reconhecimento intelectual não é suficiente"
          },
          {
            "type": "PARAGRAPH",
            "text": "Tiago 2:19 lembra que até os demônios reconhecem que Deus é um. Portanto, admitir uma informação correta sobre Deus não é o mesmo que confiar nele. Posso saber coisas verdadeiras e continuar distante Fé salvadora envolve entrega e confiança em Cristo."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. Fé pode levar a ações extraordinárias e também sustentar no sofrimento"
          },
          {
            "type": "PARAGRAPH",
            "text": "Hebreus 11 menciona vitórias, livramentos e ressurreições. Logo depois fala de pessoas torturadas, perseguidas e mortas. O texto não diz que o segundo grupo tinha menos fé. Uma verdade decisiva Resultado visível não é medidor infalível da quantidade de fé de uma pessoa."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. Fé olha para uma promessa maior que a circunstância imediata"
          },
          {
            "type": "PARAGRAPH",
            "text": "Os fiéis de Hebreus viveram olhando para o que Deus ainda cumpriria. Isso dá à fé uma dimensão de perseverança. Fé não é apenas conseguir algo agora É continuar confiando em Deus até quando ainda não vemos tudo."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-05-understand-7",
        "studyId": "track-06-study-05",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Fé salvadora confia em Cristo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Efésios 2 apresenta salvação pela graça por meio da fé. Romanos 10 fala de confessar Jesus como Senhor e crer no coração. A fé salvadora não é apenas acreditar que Jesus existiu. É colocar nele a esperança para reconciliação com Deus. A pergunta deixa de ser “sei quem Jesus é?” E passa a ser “estou confiando nele?”"
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Fé que pede milagres reconhece que Deus pode agir"
          },
          {
            "type": "PARAGRAPH",
            "text": "Os Evangelhos mostram pessoas procurando Jesus por cura e libertação. É bíblico pedir intervenção. Marcos 9 registra um pai dizendo: “Eu creio; ajuda a minha incredulidade”. Podemos pedir com fé mesmo reconhecendo fraqueza Fé não exige fingir ausência de dúvidas. CONECTE 3. Pedir com fé não significa controlar a resposta Paulo pediu que seu “espinho” fosse removido e recebeu outra resposta: graça suficiente. Jesus no Getsêmani apresentou seu desejo e se entregou à vontade do Pai. Fé confia no poder de Deus e também em sua sabedoria Ela não transforma oração em ordem dada ao céu."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Fé viva produz obras"
          },
          {
            "type": "PARAGRAPH",
            "text": "Tiago pergunta sobre uma fé que existe apenas em palavras. Obras não compram salvação, mas demonstram que a fé alcançou a vida. A sequência é importante Somos salvos pela graça por meio da fé e criados para boas obras."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não diga automaticamente que alguém não recebeu um milagre porque teve pouca fé Há textos em que Jesus confronta incredulidade, mas a Bíblia inteira não permite transformar isso numa regra para todo sofrimento. Hebreus 11 coloca pessoas que sofreram até a morte entre exemplos de fé. Resultado não é uma régua simples Não acrescente culpa a quem já está sofrendo. Fé não é pensamento positivo Pensamento positivo tenta fortalecer expectativas pessoais. Fé bíblica nasce da relação com Deus, da sua Palavra e do Evangelho. Nem toda frase otimista é promessa divina Confie no que Deus disse, não no que apenas desejamos muito. Fé também não é passividade Orar por provisão não elimina trabalho. Orar por cura não impede buscar cuidado. Orar por reconciliação pode exigir pedir perdão. Fé age de acordo com aquilo em que confia Dependência de Deus e responsabilidade humana caminham juntas. + APROFUNDE Então existem “tipos” de fé? É possível usar expressões didáticas como “fé salvadora” ou “fé que produz obras” para destacar aspectos que a Bíblia apresenta. Mas precisamos evitar transformar essas expressões em compartimentos totalmente separados. A mesma vida de fé começa confiando em Cristo, continua dependendo de Deus, aprende a pedir e esperar, e produz fruto. O Novo Testamento está mais interessado numa fé verdadeira e perseverante do que em criar uma tabela de níveis. Uma síntese segura A fé que salva confia em Cristo; a fé que ora depende de Deus; a fé que espera não controla a resposta; a fé que vive produz obediência."
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-05-apply-8",
        "studyId": "track-06-study-05",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Pergunte onde sua confiança realmente está"
          },
          {
            "type": "PARAGRAPH",
            "text": "É possível conhecer doutrina correta e ainda confiar mais em dinheiro, reputação ou desempenho. Fé desloca a base da esperança para Cristo. Conhecimento é precioso Mas precisa conduzir à confiança."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Peça grandes coisas sem transformar Deus em devedor"
          },
          {
            "type": "PARAGRAPH",
            "text": "Ore por cura, portas, provisão e intervenção. Deus pode agir além do que conseguimos fazer. Mas deixe a resposta nas mãos dele. Fé pode dizer duas frases juntas “Senhor, eu creio que podes” e “seja feita a tua vontade”."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Quando a resposta for “não” ou “ainda não”, permaneça"
          },
          {
            "type": "PARAGRAPH",
            "text": "Hebreus 11 mostra que fé também atravessa espera e sofrimento. Não abandone Deus apenas porque o caminho não ficou como imaginou. A fé mais profunda às vezes aparece depois da oração não respondida como queríamos Ainda assim escolhemos confiar."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Faça a fé sair do discurso"
          },
          {
            "type": "PARAGRAPH",
            "text": "Se cremos que Deus cuida, podemos ser generosos. Se cremos que perdoa, confessamos. Se cremos que a verdade importa, falamos com integridade. Pergunte Que obra concreta combina com aquilo que digo crer?"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-05-journey-takeaway-9",
        "studyId": "track-06-study-05",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Fé bíblica é muito mais do que admitir que Deus existe. Ela confia em Cristo para salvação, depende de Deus na oração, pede porque sabe que Ele pode agir e continua confiando quando a resposta é diferente do desejo. Essa fé também produz obras. Não como pagamento, mas como fruto. E Hebreus 11 nos protege de medir fé apenas por milagres visíveis."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "A fé verdadeira não tenta tornar Deus instrumento dos nossos planos; ela coloca nossa vida nas mãos dele."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "A fé que salva recebe Cristo, a fé que ora pede, a fé que persevera espera e a fé que vive obedece."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-05-practice-today-10",
        "studyId": "track-06-study-05",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Responda quatro frases no Diário: Em Cristo, eu confio que... Hoje quero pedir a Deus... Se a resposta não vier como espero, preciso lembrar... Uma obra coerente com minha fé hoje é..."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-05-reflection-questions-11",
        "studyId": "track-06-study-05",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Minha fé é principalmente informação ou confiança pessoal em Cristo?",
              "Tenho tratado fé como força para controlar resultados?",
              "Já julguei alguém pela ausência de um milagre?",
              "Que pedido preciso apresentar a Deus com confiança e mãos abertas?",
              "Que obra concreta deveria acompanhar aquilo que digo crer?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-05-journal-prompt-12",
        "studyId": "track-06-study-05",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Em que área preciso passar de apenas acreditar numa verdade sobre Deus para realmente confiar nele e viver de acordo com essa confiança?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-05-prayer-13",
        "studyId": "track-06-study-05",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, eu creio; ajuda a minha incredulidade. Obrigado porque a salvação é pela graça e porque posso confiar em Cristo. Ensina-me a pedir com coragem sem tentar controlar tua resposta. Guarda-me de medir minha fé apenas por resultados visíveis e de julgar quem sofre. Quando eu precisar esperar, sustenta-me. E faz minha fé aparecer em escolhas, obras e perseverança que honrem teu nome. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-05-keep-14",
        "studyId": "track-06-study-05",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Efésios 2:8-10 - Salvação pela graça por meio da fé, seguida de boas obras. Hebreus 11:6 - A fé se aproxima de Deus confiando em quem Ele é. Marcos 9:24 - Uma oração honesta de fé e fraqueza. Favoritos Guarde essas passagens para os momentos em que sua fé parecer pequena ou quando uma resposta demorar."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-05-group-mode-15",
        "studyId": "track-06-study-05",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe O que Hebreus 11 ensina quando coloca lado a lado livramento e sofrimento?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Qual é a diferença entre reconhecimento intelectual e fé salvadora?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como pedir um milagre com fé sem transformar Deus em alguém obrigado a cumprir nosso desejo?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-05-continue-journey-16",
        "studyId": "track-06-study-05",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Estes cinco estudos formam a primeira metade desta trilha especial. Antes de definirmos os cinco temas restantes, vale deixar que essas áreas sejam vividas, revisadas e amadurecidas."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Próxima etapa da Trilha 6 Os Estudos 06 a 10 serão definidos depois da revisão destes cinco primeiros temas, preservando o mesmo compromisso: necessidade atual, base bíblica, clareza e edificação."
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-05-references-17",
        "studyId": "track-06-study-05",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Hebreus 11:1-6,32-40 Efésios 2:8-10 Romanos 10:9-17 Tiago 2:14-26 Marcos 9:14-29 2 Coríntios 12:7-10"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-06",
    "sections": [
      {
        "id": "track-06-study-06-golden-text-1",
        "studyId": "track-06-study-06",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“E não vos conformeis com este mundo, mas transformai-vos pela renovação do vosso entendimento.” Romanos 12:2"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-06-practical-truth-2",
        "studyId": "track-06-study-06",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Nem tudo o que prende nossa atenção merece acesso ao nosso coração; uma vida digital saudável começa quando Cristo, e não o fluxo da tela, ocupa o centro da nossa formação."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-06-bible-reading-3",
        "studyId": "track-06-study-06",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: Romanos 12:1-2 Depois, conecte com: Filipenses 4:8-9 | 1 Coríntios 6:12 | Efésios 5:15-17 | Salmo 101:3 | Provérbios 4:23-27"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-06-before-understanding-4",
        "studyId": "track-06-study-06",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "O celular pode aproximar famílias, ensinar, facilitar trabalho, dar acesso à Bíblia e permitir comunhão. Também pode consumir horas sem que percebamos. Vivemos cercados por notificações, vídeos curtos, opiniões, comparações, anúncios e conteúdos escolhidos por sistemas que aprendem aquilo que mantém nossa atenção. A pergunta cristã não precisa ser: “A tecnologia é boa ou ruim?” A pergunta mais sábia é: “Como estou usando aquilo que tem acesso diário aos meus olhos, à minha mente e ao meu tempo?” A Bíblia foi escrita muito antes da internet, mas fala diretamente sobre coração, mente, domínio próprio, tempo, verdade e aquilo que contemplamos."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-06-read-5",
        "studyId": "track-06-study-06",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: Romanos 12:1-2"
          },
          {
            "type": "PARAGRAPH",
            "text": "Romanos 12 começa chamando os cristãos a oferecer a vida inteira a Deus. Logo depois, Paulo fala de não tomar a forma deste século e de ser transformado pela renovação da mente. Isso alcança também o ambiente em que nossa mente passa horas por dia."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-06-observe-6",
        "studyId": "track-06-study-06",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. A mente pode ser moldada"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo pressupõe que padrões ao redor exercem influência. Não somos observadores neutros de tudo o que consumimos. Repetição forma percepções, desejos e prioridades. Aquilo que entra repetidamente deixa marcas Por isso atenção também é uma questão espiritual."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. Renovação exige uma fonte diferente"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo não manda apenas fugir do mundo. Ele fala de transformação pela renovação da mente. A verdade de Deus precisa possuir espaço suficiente para corrigir aquilo que outras vozes repetem. Não basta reduzir conteúdo ruim Também precisamos preencher a mente com verdade, beleza e sabedoria."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. Filipenses nos ensina a escolher o que merece ocupar o pensamento"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo cita aquilo que é verdadeiro, digno, justo, puro, amável e de boa fama. Isso não é uma lista para viver numa bolha. É um filtro para aquilo que recebe permanência em nossa mente. Pergunte ao conteúdo Isso me ajuda a amar a verdade ou apenas captura minha atenção?"
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. Paulo também pergunta se algo está nos dominando"
          },
          {
            "type": "PARAGRAPH",
            "text": "1 Coríntios 6:12 contém uma pergunta poderosa para o mundo digital: algo pode ser permitido e ainda assim estar me dominando. Nem tudo que é permitido precisa ser permanente Liberdade inclui poder desligar."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-06-understand-7",
        "studyId": "track-06-study-06",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Tecnologia não precisa ser demonizada"
          },
          {
            "type": "PARAGRAPH",
            "text": "Ferramentas digitais podem servir ao Evangelho, educação, trabalho, comunicação e cuidado. O problema não está simplesmente no aparelho. Está na relação que construímos com ele. Ferramenta é diferente de senhor Use a tecnologia; não entregue a ela o governo da sua atenção."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. O ambiente digital pode aumentar comparação"
          },
          {
            "type": "PARAGRAPH",
            "text": "Vemos recortes cuidadosamente escolhidos da vida de outras pessoas. Se esquecemos que são recortes, podemos comparar nosso cotidiano inteiro com o melhor minuto de alguém. Comparação distorce realidade Você não conhece toda a história por uma tela. CONECTE 3. Efésios chama a usar bem o tempo Paulo fala de remir o tempo e viver com sabedoria. Isso não significa que todo entretenimento é desperdício. Descanso faz parte da vida. Mas horas consumidas automaticamente merecem ser examinadas. Descanso é diferente de anestesia Pergunte se você está descansando ou apenas fugindo de si mesmo."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Conteúdo religioso também precisa de discernimento"
          },
          {
            "type": "PARAGRAPH",
            "text": "Vídeos bíblicos, pregações, profecias e frases cristãs podem aparecer aos milhares. Popularidade não garante fidelidade bíblica. Isso será aprofundado no Estudo 09. Algoritmo não é pastor Aquilo que aparece primeiro não é necessariamente aquilo que você mais precisa ouvir."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não transforme disciplina digital em nova medida de superioridade Uma pessoa pode quase não usar redes sociais e ainda lutar com orgulho, dureza ou falta de amor. Reduzir tela é ferramenta, não medalha espiritual. O objetivo é liberdade para amar melhor a Deus e às pessoas Não construir uma nova aparência de santidade. Não confunda exposição com intimidade Compartilhar tudo não significa ser conhecido profundamente. Algumas áreas da vida precisam de privacidade, cuidado e conversas presenciais. Nem toda experiência precisa virar conteúdo Há coisas que amadurecem melhor longe da audiência. + APROFUNDE Como saber se meu uso digital está me dominando? Observe sinais simples: você pega o aparelho sem decidir? perde sono com frequência? interrompe pessoas constantemente? sente irritação intensa quando não pode acessar? adia responsabilidades? percebe que o conteúdo enfraquece convicções que deseja preservar? Um sinal isolado não define toda a situação, mas padrões repetidos merecem atenção. Ferramentas de limite, períodos sem tela e conversas honestas podem ajudar. Domínio próprio pode ser medido por uma pergunta simples Eu consigo parar quando decido parar?"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-06-apply-8",
        "studyId": "track-06-study-06",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Faça uma auditoria da sua atenção"
          },
          {
            "type": "PARAGRAPH",
            "text": "Veja quanto tempo realmente passa em aplicativos. Não confie apenas na sensação. Dados podem revelar hábitos invisíveis Olhar com verdade é o primeiro passo."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Remova acessos que enfraquecem sua fé"
          },
          {
            "type": "PARAGRAPH",
            "text": "Deixar de seguir uma conta, silenciar notificações ou bloquear determinado conteúdo pode ser sabedoria. Você não precisa testar força diante de todo conteúdo Algumas portas podem simplesmente permanecer fechadas."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Crie espaços sem tela"
          },
          {
            "type": "PARAGRAPH",
            "text": "Refeições, oração, leitura, culto, conversas importantes e os minutos antes de dormir podem ganhar qualidade quando o aparelho deixa de comandar o ambiente. Presença exige atenção disponível Estar perto não é o mesmo que estar presente."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Produza e compartilhe com verdade"
          },
          {
            "type": "PARAGRAPH",
            "text": "Antes de publicar, pergunte se é verdadeiro, necessário e respeitoso. Não repasse informação apenas porque confirma sua opinião. Cristãos também precisam combater desinformação Verdade continua sendo valor espiritual no ambiente digital."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-06-journey-takeaway-9",
        "studyId": "track-06-study-06",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Vida digital faz parte da vida real. Por isso também precisa ser colocada diante de Deus. A tecnologia pode servir, ensinar e aproximar. Mas nossa mente não é um espaço sem importância. Somos chamados a renovar o entendimento, guardar o coração, escolher aquilo que merece permanência e não permitir que nenhuma ferramenta nos domine."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "A pergunta não é apenas quanto tempo passamos online, mas que tipo de pessoa esse tempo está ajudando a formar."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "Cristo deve discipular nossa mente mais profundamente do que qualquer feed, tendência ou algoritmo."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-06-practice-today-10",
        "studyId": "track-06-study-06",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Abra hoje o relatório de tempo de uso do seu aparelho. Escolha uma mudança por sete dias: reduzir um aplicativo; retirar notificações; criar uma refeição sem tela; deixar o celular fora do quarto; substituir parte do consumo por leitura bíblica ou conversa real."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-06-reflection-questions-11",
        "studyId": "track-06-study-06",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Que conteúdo ocupa mais minha mente durante a semana?",
              "Consigo interromper o uso quando decido?",
              "Tenho comparado minha vida real com recortes digitais de outras pessoas?",
              "Que espaço importante está sendo invadido pela tela?",
              "Minha presença online serve à verdade e à edificação?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-06-journal-prompt-12",
        "studyId": "track-06-study-06",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Se meus hábitos digitais continuarem iguais pelos próximos anos, que tipo de pessoa eles provavelmente estarão formando?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-06-prayer-13",
        "studyId": "track-06-study-06",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, minha atenção também te pertence. Dá-me sabedoria para usar a tecnologia sem ser usado por ela. Mostra conteúdos, hábitos e comparações que estão enfraquecendo minha mente. Ensina-me domínio próprio, verdade e presença. Que minha vida digital não ocupe o lugar da tua Palavra, das pessoas que amo e daquilo que realmente preciso viver. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-06-keep-14",
        "studyId": "track-06-study-06",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Romanos 12:2 - A mente precisa ser renovada. Filipenses 4:8 - Pense naquilo que é verdadeiro, justo e digno. 1 Coríntios 6:12 - Não se deixe dominar por coisa alguma. Favoritos Guarde essas passagens para revisar sua relação com telas, conteúdo e atenção."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-06-group-mode-15",
        "studyId": "track-06-study-06",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe Como Romanos 12 nos ajuda a pensar sobre influência digital?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Qual é a diferença entre usar uma ferramenta e ser dominado por ela?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Que mudança digital concreta poderia melhorar nossa presença com Deus e com pessoas?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-06-continue-journey-16",
        "studyId": "track-06-study-06",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Alguns hábitos digitais podem dominar. Mas a experiência de ser dominado não se limita às telas. Há comportamentos e substâncias que podem transformar prazer, alívio ou hábito em escravidão."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo 07 - Vícios e compulsões: quando aquilo que eu uso começa a me dominar Pergunta central: Como reconhecer escravidões, buscar liberdade e caminhar sem vergonha nem negação?"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-06-references-17",
        "studyId": "track-06-study-06",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Romanos 12:1-2 Filipenses 4:8-9 1 Coríntios 6:12 Efésios 5:15-17 Salmo 101:3 Provérbios 4:23-27"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-07",
    "sections": [
      {
        "id": "track-06-study-07-golden-text-1",
        "studyId": "track-06-study-07",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Todas as coisas me são lícitas, mas eu não me deixarei dominar por nenhuma.” 1 Coríntios 6:12"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-07-practical-truth-2",
        "studyId": "track-06-study-07",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Liberdade cristã não é poder fazer qualquer coisa; é não precisar viver escravo daquilo que promete alívio, prazer ou controle e depois começa a governar nossa vida."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-07-bible-reading-3",
        "studyId": "track-06-study-07",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: Romanos 6:11-14 Depois, conecte com: 1 Coríntios 6:12 | Gálatas 5:1,16-25 | Tiago 5:16 | 2 Timóteo 2:22 | Provérbios 28:13"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-07-before-understanding-4",
        "studyId": "track-06-study-07",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Há coisas que começamos usando e, com o tempo, parecem começar a nos usar. Pode ser uma substância, jogo, compra, comida, conteúdo, aposta, comportamento ou outro caminho buscado repetidamente para prazer, alívio ou fuga. Nem todo hábito forte é igual, e este estudo não pretende diagnosticar ninguém. Mas a Bíblia oferece uma pergunta poderosa: Isso está me dominando? Vergonha costuma empurrar a pessoa para o esconderijo. O Evangelho chama para a luz. Liberdade começa quando paramos de proteger aquilo que está nos prendendo."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-07-read-5",
        "studyId": "track-06-study-07",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: Romanos 6:11-14"
          },
          {
            "type": "PARAGRAPH",
            "text": "Romanos 6 fala a pessoas alcançadas pela graça. Paulo não diz que o pecado deixou de exercer pressão. Ele chama os cristãos a não permitir que o pecado reine em seus corpos e a se oferecerem a Deus."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-07-observe-6",
        "studyId": "track-06-study-07",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. A graça muda nossa relação com o domínio"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo fala de não deixar o pecado reinar. Isso significa que desejos podem existir sem receber autoridade final. Sentir desejo não é o mesmo que obedecer ao desejo Em Cristo existe uma nova possibilidade de resposta."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. O corpo faz parte da luta"
          },
          {
            "type": "PARAGRAPH",
            "text": "Romanos fala do corpo e de seus membros. Isso nos lembra que hábitos não existem apenas em pensamentos. Rotina, sono, ambiente, acesso e reações físicas podem fazer parte do problema e da recuperação. Espiritualidade bíblica não despreza o corpo Mudança também alcança hábitos concretos."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. 1 Coríntios pergunta sobre domínio"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo reconhece que algo pode ser defendido como permitido e ainda assim tornar-se senhor. Uma pergunta simples pode revelar muito Eu escolho isso livremente ou já sinto que não consigo ficar sem?"
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. Tiago chama a sair do esconderijo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Tiago fala de confessar e orar uns pelos outros. Segredos alimentam ciclos. Trazer à luz diminui o poder da mentira Você não precisa contar para todo mundo, mas não deveria enfrentar tudo sozinho."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-07-understand-7",
        "studyId": "track-06-study-07",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Dependência não deve ser reduzida a “falta de fé”"
          },
          {
            "type": "PARAGRAPH",
            "text": "Há situações que envolvem fatores físicos, emocionais, sociais e comportamentais complexos. Uma resposta cristã madura pode incluir oração, discipulado e também profissionais qualificados. Buscar ajuda não diminui a fé Pode ser uma forma responsável de lutar pela liberdade."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Arrependimento inclui mudança de direção"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não basta sentir culpa depois de repetir um comportamento. Arrependimento pergunta que mudanças concretas reduzem acesso, gatilhos e oportunidades. Uma decisão espiritual pode precisar de uma decisão prática Excluir, bloquear, afastar-se, pedir acompanhamento, mudar rotina. CONECTE 3. Gálatas fala de liberdade e fruto do Espírito Paulo diz que Cristo nos libertou para a liberdade e depois apresenta domínio próprio como fruto do Espírito. Liberdade não é ausência de limites. Domínio próprio é liberdade amadurecida Não repressão vazia."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Quedas precisam de verdade, não de desistência"
          },
          {
            "type": "PARAGRAPH",
            "text": "Uma recaída ou queda não deve ser usada para dizer: “Então nunca vou mudar”. Mas também não deve ser escondida. É hora de rever o plano e procurar ajuda. Tropeço pede resposta Não identidade definitiva nem normalização."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Algumas interrupções podem exigir cuidado profissional Dependência de certas substâncias pode produzir riscos quando interrompida sem acompanhamento adequado. Não é sábio transformar este estudo em orientação médica individual. Quando houver dependência física ou risco, procure atendimento qualificado Fé e cuidado responsável caminham juntos. Não use vergonha como ferramenta de mudança Humilhação pode levar a mais segredo e fuga. A Bíblia confronta pecado, mas o Evangelho também oferece graça e restauração. Verdade sem humilhação A pessoa precisa assumir responsabilidade sem ser reduzida à sua luta. + APROFUNDE Qual é a diferença entre hábito, compulsão e dependência? Esses termos podem ter significados técnicos diferentes, e somente uma avaliação adequada pode esclarecer certas situações. Para o propósito deste estudo, a pergunta pastoral é mais simples: existe perda de liberdade, prejuízo, repetição contra a própria decisão e dificuldade crescente de parar? Se sim, merece atenção séria e ajuda. Não espere chegar ao pior estágio para pedir ajuda Reconhecer cedo pode evitar danos maiores."
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-07-apply-8",
        "studyId": "track-06-study-07",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Nomeie exatamente o que está acontecendo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Evite palavras vagas como “estou lutando”. Escreva comportamento, frequência, gatilho e consequência. Verdade específica vence negação genérica Nomear é começar a enxergar."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Remova acesso quando possível"
          },
          {
            "type": "PARAGRAPH",
            "text": "Dinheiro disponível, aplicativos, ambientes, contatos, horários e estoques podem funcionar como portas. Não mantenha aberta a porta que todos os dias pede força para você não atravessar Fechar acesso é sabedoria."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Construa uma rede de apoio"
          },
          {
            "type": "PARAGRAPH",
            "text": "Escolha uma pessoa madura, discreta e confiável. Em casos mais sérios, procure também atendimento especializado. Liberdade costuma crescer em comunidade Isolamento protege o ciclo, não a pessoa."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Substitua a função que o comportamento ocupava"
          },
          {
            "type": "PARAGRAPH",
            "text": "Pergunte o que você busca: alívio, fuga, excitação, companhia, descanso? Se retirar o comportamento sem cuidar da necessidade, o vazio continua pedindo resposta. Não trate apenas o objeto Observe a dor ou desejo que o tornava tão atraente."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-07-journey-takeaway-9",
        "studyId": "track-06-study-07",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Cristo nos chama à liberdade. Isso não significa que toda luta desaparece facilmente. Há hábitos e dependências que exigem verdade, arrependimento, mudanças práticas, apoio e tempo. A vergonha diz para esconder. A graça nos chama à luz. E a busca por ajuda não precisa competir com a fé."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "Liberdade começa quando deixamos de defender aquilo que está nos dominando e começamos a construir, com ajuda, um caminho diferente."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "Você é responsável pela sua resposta, mas não precisa lutar sozinho; graça, verdade, comunidade e cuidado podem caminhar juntos."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-07-practice-today-10",
        "studyId": "track-06-study-07",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Escolha uma luta recorrente e responda: O que faço? Quando geralmente acontece? O que busco sentir ou evitar? Que acesso posso reduzir? Quem precisa saber? Se houver risco, dependência física ou prejuízo grave, procure ajuda qualificada."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-07-reflection-questions-11",
        "studyId": "track-06-study-07",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Existe algo que defendo como liberdade, mas já me domina?",
              "Que gatilho costuma anteceder o comportamento?",
              "Quem conhece a verdade inteira sobre essa luta?",
              "Que mudança de ambiente preciso fazer?",
              "Estou confundindo pedir ajuda com fracasso?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-07-journal-prompt-12",
        "studyId": "track-06-study-07",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Que luta preciso finalmente tirar do esconderijo e enfrentar com verdade, graça e ajuda concreta?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-07-prayer-13",
        "studyId": "track-06-study-07",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, tu conheces aquilo que tento esconder. Dá-me coragem para chamar as coisas pelo nome e não proteger aquilo que me escraviza. Ensina-me domínio próprio, arrependimento e perseverança. Coloca pessoas seguras ao meu lado e dá-me humildade para procurar ajuda responsável quando necessário. Que minha identidade esteja em Cristo e não na minha compulsão, e que tua graça me conduza para uma liberdade cada vez mais real. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-07-keep-14",
        "studyId": "track-06-study-07",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1 Coríntios 6:12 - Não se deixe dominar. Romanos 6:14 - O pecado não precisa exercer senhorio. Tiago 5:16 - Confissão e oração rompem isolamento. Favoritos Guarde essas passagens para lembrar que liberdade envolve graça, verdade e passos concretos."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-07-group-mode-15",
        "studyId": "track-06-study-07",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe O que significa ser dominado por algo?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Por que vergonha e isolamento costumam fortalecer ciclos?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como uma comunidade cristã pode apoiar sem humilhar nem simplificar dependências complexas?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-07-continue-journey-16",
        "studyId": "track-06-study-07",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Algumas pessoas lutam cercadas de gente e, ainda assim, profundamente sozinhas. A próxima necessidade não é apenas presença física, mas pertencimento."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo 08 - Solidão e pertencimento: quando estou cercado de pessoas e ainda me sinto sozinho Pergunta central: Como enfrentar solidão, rejeição e isolamento sem construir toda nossa segurança na aprovação das pessoas?"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-07-references-17",
        "studyId": "track-06-study-07",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Romanos 6:11-14 1 Coríntios 6:12 Gálatas 5:1,16-25 Tiago 5:16 2 Timóteo 2:22 Provérbios 28:13"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-08",
    "sections": [
      {
        "id": "track-06-study-08-golden-text-1",
        "studyId": "track-06-study-08",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Ainda que meu pai e minha mãe me desamparassem, o Senhor me recolheria.” Salmo 27:10"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-08-practical-truth-2",
        "studyId": "track-06-study-08",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Deus nos encontra pessoalmente, mas não nos chama para viver a fé isoladamente; pertencimento cresce quando somos conhecidos com verdade e aprendemos também a abrir espaço para outros."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-08-bible-reading-3",
        "studyId": "track-06-study-08",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: Salmo 27:7-14 Depois, conecte com: Salmo 68:5-6 | João 15:12-15 | Atos 2:42-47 | Hebreus 10:24-25 | 1 Coríntios 12:12-27"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-08-before-understanding-4",
        "studyId": "track-06-study-08",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "É possível estar sozinho sem sentir solidão. E é possível estar cercado de pessoas e sentir-se completamente invisível. Solidão não é apenas falta de gente ao redor. É falta de vínculo, segurança, intimidade ou sensação de pertencimento. A Bíblia conhece abandono, rejeição, amizade e comunidade. O Salmo 27 fala de uma confiança tão profunda que até a possibilidade de abandono familiar é colocada diante de Deus. Mas a resposta bíblica não é: “Então não preciso de ninguém.” O mesmo Deus que acolhe pessoas também forma um povo."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-08-read-5",
        "studyId": "track-06-study-08",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: Salmo 27:7-14"
          },
          {
            "type": "PARAGRAPH",
            "text": "O Salmo 27 alterna confiança e pedido. Davi declara segurança em Deus e também clama para não ser abandonado. Isso mostra que fé e necessidade de presença podem coexistir."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-08-observe-6",
        "studyId": "track-06-study-08",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. Deus conhece a experiência de quem se sente abandonado"
          },
          {
            "type": "PARAGRAPH",
            "text": "O salmo não trata rejeição como uma dor pequena. Ele coloca até os vínculos familiares mais profundos diante da fidelidade de Deus. Seu valor não termina onde alguém deixou de enxergá-lo Deus não depende da aprovação humana para conhecer você."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. A presença de Deus não elimina a necessidade de pessoas"
          },
          {
            "type": "PARAGRAPH",
            "text": "Salmo 68 fala de Deus colocando solitários em família. Atos 2 mostra cristãos compartilhando vida. Deus cuida pessoalmente e também por meio de comunidade As duas coisas não competem."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. Jesus chama discípulos de amigos"
          },
          {
            "type": "PARAGRAPH",
            "text": "João 15 revela proximidade, amor e compartilhamento. A fé cristã não é relacionamento impessoal com uma ideia. Cristo nos chama para perto E seu amor se torna referência para nossas amizades."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. 1 Coríntios apresenta a Igreja como corpo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Nenhuma parte pode dizer que não precisa das outras. Também não deveria existir parte tratada como dispensável. Pertencer é dar e receber Não apenas frequentar."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-08-understand-7",
        "studyId": "track-06-study-08",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Solidão não é prova automática de fraqueza espiritual"
          },
          {
            "type": "PARAGRAPH",
            "text": "Profetas, salmistas e apóstolos conheceram momentos de abandono e isolamento. Uma pessoa pode amar Deus e ainda sentir falta de companhia. Não acrescente culpa à solidão Transforme-a em sinal de que vínculos precisam de cuidado."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Estar em igreja não garante automaticamente pertencimento"
          },
          {
            "type": "PARAGRAPH",
            "text": "É possível frequentar reuniões sem ser conhecido. Comunidade exige tempo, serviço, conversa e abertura. Presença física é começo, não profundidade automática Vínculos são construídos. CONECTE 3. Hebreus liga comunhão a encorajamento O texto manda considerar uns aos outros para estimular amor e boas obras. Pertencimento cristão não é apenas receber acolhimento; é aprender a encorajar. Uma comunidade saudável pergunta duas coisas Quem pode me conhecer? E quem eu preciso aprender a enxergar?"
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Pertencer não significa agradar todos"
          },
          {
            "type": "PARAGRAPH",
            "text": "Se nosso lugar depende de nunca discordar ou nunca dizer não, talvez o vínculo esteja baseado em medo. Relacionamentos maduros suportam verdade e limites. Aprovação não é a mesma coisa que pertencimento Você não precisa apagar a própria consciência para ser aceito."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não use “Deus basta” para desprezar necessidade humana de vínculo Deus é nossa fonte final, mas Ele mesmo criou pessoas para viverem em relação e formou a Igreja. Dizer a alguém solitário que “só precisa de Deus” pode ignorar um aspecto da própria vontade de Deus. Espiritualidade não elimina humanidade Precisamos de Deus e aprendemos também a receber pessoas. Não confunda solitude com isolamento Jesus buscava momentos a sós para orar. Solitude pode ser descanso e encontro com Deus. Isolamento é outra coisa quando nos fecha de vínculos, apoio e realidade. Estar só pode restaurar Fechar-se de todos por tempo prolongado pode adoecer relações. + APROFUNDE E quando a própria igreja foi lugar de ferida? Feridas em ambientes cristãos podem tornar pertencimento especialmente difícil. Você não precisa fingir que nada aconteceu. Pode precisar de tempo, limites, conversa, aconselhamento e uma comunidade mais segura. Uma experiência ruim não transforma automaticamente todo o corpo de Cristo no mesmo ambiente que feriu você. Reconstruir confiança pode ser gradual Cura não exige pressa nem isolamento definitivo."
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-08-apply-8",
        "studyId": "track-06-study-08",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Troque a meta “ter muitos amigos” por “construir vínculos reais”"
          },
          {
            "type": "PARAGRAPH",
            "text": "Profundidade não exige multidão. Uma ou duas relações seguras podem valer muito. Quantidade não é intimidade Invista onde existe verdade e reciprocidade."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Dê pequenos sinais de abertura"
          },
          {
            "type": "PARAGRAPH",
            "text": "Convide alguém para um café, permaneça alguns minutos depois do culto, entre num pequeno grupo, peça ajuda. Pertencimento também pede iniciativa Não espere que todos adivinhem sua solidão."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Seja a presença que gostaria de encontrar"
          },
          {
            "type": "PARAGRAPH",
            "text": "Observe quem está sempre sozinho, quem chegou recentemente, quem deixou de aparecer. Sua dor pode ampliar sua sensibilidade Sem transformar você em responsável por salvar todos."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Leve rejeição a Deus sem entregar a ela sua identidade"
          },
          {
            "type": "PARAGRAPH",
            "text": "Ser rejeitado dói. Mas uma relação que terminou ou uma pessoa que não escolheu você não possui autoridade para declarar seu valor final. Você pode lamentar rejeição sem tornar-se rejeição Deus continua chamando pelo nome."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-08-journey-takeaway-9",
        "studyId": "track-06-study-08",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Solidão é uma dor humana real. A Bíblia não manda escondê-la nem tratá-la como falta de fé. Deus acolhe, conhece e chama para perto. E também nos coloca num corpo em que aprendemos a dar e receber cuidado. Pertencimento não exige popularidade nem aprovação de todos. Ele cresce em vínculos de verdade, graça e presença."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "Você não precisa ser conhecido por todos; precisa aprender a viver onde pode ser conhecido com verdade e também conhecer outros com amor."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "Deus nos encontra na solidão e nos ensina, pouco a pouco, a sair do isolamento em direção a vínculos seguros e reais."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-08-practice-today-10",
        "studyId": "track-06-study-08",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Escolha uma atitude relacional para esta semana: mandar mensagem para alguém; aceitar um convite; pedir conversa; participar de um grupo; procurar alguém que parece isolado. Faça algo pequeno e real."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-08-reflection-questions-11",
        "studyId": "track-06-study-08",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Estou sozinho ou isolado?",
              "Tenho esperado que pessoas adivinhem minha necessidade de vínculo?",
              "Que rejeição ainda define demais minha visão de mim mesmo?",
              "Existe uma comunidade onde posso construir confiança gradualmente?",
              "Quem ao meu redor talvez esteja precisando ser enxergado?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-08-journal-prompt-12",
        "studyId": "track-06-study-08",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Que passo de abertura, pertencimento ou cuidado preciso dar para não transformar minha solidão em isolamento permanente?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-08-prayer-13",
        "studyId": "track-06-study-08",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, tu me conheces por inteiro e não sou invisível diante de ti. Recebe minha solidão, minhas rejeições e meu medo de ser ferido novamente. Dá-me coragem para construir vínculos seguros, humildade para receber companhia e olhos para enxergar quem também está sozinho. Cura feridas que dificultam confiar e ensina-me a pertencer ao teu povo sem viver escravo da aprovação. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-08-keep-14",
        "studyId": "track-06-study-08",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Salmo 27:10 - Deus acolhe quando vínculos humanos falham. Hebreus 10:24-25 - Comunidade inclui presença e encorajamento. 1 Coríntios 12:21 - Nenhuma parte pode dizer que não precisa das outras. Favoritos Guarde essas passagens para os dias em que a solidão tentar dizer que você não pertence a lugar nenhum."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-08-group-mode-15",
        "studyId": "track-06-study-08",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe Que diferença existe entre presença física e pertencimento?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Por que “Deus basta” não deve ser usado para desprezar a necessidade de comunidade?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como nosso grupo pode perceber e acolher melhor quem está isolado?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-08-continue-journey-16",
        "studyId": "track-06-study-08",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Quando estamos buscando pertencimento, ficamos mais vulneráveis a vozes que prometem certeza, direção e autoridade. Por isso precisamos aprender a examinar aquilo que afirma vir de Deus."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo 09 - Discernimento espiritual: nem tudo que parece de Deus vem de Deus Pergunta central: Como reconhecer o que está de acordo com Deus quando tantas vozes afirmam falar em nome dele?"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-08-references-17",
        "studyId": "track-06-study-08",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Salmo 27:7-14 Salmo 68:5-6 João 15:12-15 Atos 2:42-47 Hebreus 10:24-25 1 Coríntios 12:12-27"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-09",
    "sections": [
      {
        "id": "track-06-study-09-golden-text-1",
        "studyId": "track-06-study-09",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Não creiais em todo espírito, mas provai se os espíritos são de Deus.” 1 João 4:1"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-09-practical-truth-2",
        "studyId": "track-06-study-09",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Nem toda mensagem emocionante, sobrenatural ou popular vem de Deus; fé madura aprende a ouvir com humildade, conferir nas Escrituras e reter aquilo que é verdadeiro."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-09-bible-reading-3",
        "studyId": "track-06-study-09",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: 1 João 4:1-6 Depois, conecte com: Atos 17:10-12 | 1 Tessalonicenses 5:19-22 | Mateus 7:15-23 | Gálatas 1:6-9 | 2 Timóteo 4:1-5"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-09-before-understanding-4",
        "studyId": "track-06-study-09",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Deus me disse.” “Recebi uma revelação.” “Esta palavra é para você.” “Compartilhe e uma bênção chegará.” Vivemos cercados por mensagens religiosas. Algumas nascem de ensino sério e fiel. Outras misturam Bíblia, opinião, superstição, medo, interesse financeiro ou desejo de controle. João não manda acreditar em tudo. Também não manda desprezar tudo. Ele manda provar. Discernimento é parte da maturidade cristã."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-09-read-5",
        "studyId": "track-06-study-09",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: 1 João 4:1-6"
          },
          {
            "type": "PARAGRAPH",
            "text": "1 João escreve num contexto em que ensinamentos falsos estavam circulando. O teste central envolve aquilo que se confessa sobre Jesus Cristo e a origem da mensagem."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-09-observe-6",
        "studyId": "track-06-study-09",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. A Bíblia manda examinar"
          },
          {
            "type": "PARAGRAPH",
            "text": "João reconhece que existem falsos profetas. Portanto, sinceridade, emoção ou linguagem religiosa não bastam. Questionar com reverência pode ser obediência Deus não pede ingenuidade."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. Jesus Cristo é um teste central"
          },
          {
            "type": "PARAGRAPH",
            "text": "1 João combate erros concretos sobre quem Jesus é. Uma mensagem espiritual que diminui, substitui ou distorce Cristo precisa ser tratada com seriedade. Cristo não é detalhe O Evangelho possui conteúdo."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. Os bereanos conferiam até o ensino apostólico"
          },
          {
            "type": "PARAGRAPH",
            "text": "Atos 17 elogia pessoas que receberam a palavra com interesse e examinavam diariamente as Escrituras. Ouvir e conferir podem caminhar juntos Respeito por um pregador não exige desligar a Bíblia."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. 1 Tessalonicenses une abertura e exame"
          },
          {
            "type": "PARAGRAPH",
            "text": "Paulo diz para não desprezar profecias, mas também para examinar tudo e reter o bem. Dois extremos são evitados Nem credulidade sem filtro, nem rejeição automática de tudo."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-09-understand-7",
        "studyId": "track-06-study-09",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Primeiro filtro: isso está de acordo com as Escrituras?"
          },
          {
            "type": "PARAGRAPH",
            "text": "Uma impressão pessoal nunca recebe autoridade para corrigir aquilo que a Palavra ensina claramente. Experiência pode ser significativa, mas continua precisando de avaliação. O extraordinário não possui permissão para contradizer a Bíblia A Palavra continua sendo referência."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Segundo filtro: que lugar Cristo e o Evangelho ocupam?"
          },
          {
            "type": "PARAGRAPH",
            "text": "Há mensagens que falam muito de dinheiro, inimigos, destino, sucesso e poder, mas quase nada de Cristo, arrependimento, graça e obediência. Nem toda fala religiosa é cristocêntrica Pergunte qual evangelho está sendo anunciado. CONECTE 3. Terceiro filtro: quais frutos aparecem? Jesus fala de reconhecer falsos profetas pelos frutos. Isso inclui caráter e resultado moral ao longo do tempo, não apenas números, fama ou manifestações. Popularidade não é fruto do Espírito Sucesso de público não prova fidelidade."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Quarto filtro: existe liberdade para examinar?"
          },
          {
            "type": "PARAGRAPH",
            "text": "Uma pessoa manipuladora pode usar “Deus me disse” para encerrar qualquer pergunta. Líderes bíblicos não deveriam temer uma Bíblia aberta. Autoridade saudável suporta exame Manipulação exige submissão sem perguntas."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 5. Quinto filtro: medo ou ganância estão sendo explorados?"
          },
          {
            "type": "PARAGRAPH",
            "text": "“Se você não fizer isso, algo ruim acontecerá.” “Dê este valor e Deus terá de lhe devolver.” Mensagens assim usam emoções fortes para produzir controle. O Evangelho chama à fé, não à chantagem espiritual Deus não precisa ser vendido."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Discernimento não é suspeitar de tudo e de todos Uma pessoa pode se tornar tão desconfiada que nunca aprende com ninguém. A Bíblia manda examinar e reter o que é bom. Humildade também discerne Podemos estar errados e precisar ser corrigidos. Não transforme preferência teológica em acusação automática de falso profeta Cristãos fiéis divergem em questões secundárias. Nem toda diferença possui o mesmo peso do Evangelho. Aprenda a distinguir central de secundário Discernimento também mede a gravidade da diferença. + APROFUNDE Como avaliar “Deus me revelou algo sobre você”? Não entregue sua consciência imediatamente. Ouça com calma, compare com as Escrituras, procure conselho maduro e observe se existe tentativa de controle. Uma palavra que exige pecado, contradiz a Bíblia ou usa medo para obrigar decisão deve ser rejeitada. Mesmo uma impressão bem-intencionada não precisa ser tratada como infalível. Você pode responder com humildade “Obrigado. Vou orar e examinar isso à luz da Palavra.”"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-09-apply-8",
        "studyId": "track-06-study-09",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Não compartilhe antes de conferir"
          },
          {
            "type": "PARAGRAPH",
            "text": "Conteúdo religioso falso se espalha porque pessoas compartilham pelo impacto emocional. Antes de encaminhar, verifique Ser cristão também exige responsabilidade com informação."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Leia o texto inteiro quando um versículo sustenta uma grande promessa"
          },
          {
            "type": "PARAGRAPH",
            "text": "Pergunte o que vem antes e depois. Uma promessa pode ter destinatário e contexto específicos. Contexto protege contra manipulação Versículo isolado pode ser usado para dizer quase qualquer coisa."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Observe caráter junto com capacidade"
          },
          {
            "type": "PARAGRAPH",
            "text": "Uma pessoa pode falar bem, emocionar e possuir grande conhecimento. Isso não torna caráter irrelevante. Dom não substitui fruto A Bíblia valoriza ambos, mas não os confunde."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Use ferramentas sem entregar a elas autoridade divina"
          },
          {
            "type": "PARAGRAPH",
            "text": "Livros, aplicativos, buscadores e inteligência artificial podem ajudar a organizar e explicar informações. Mas nenhuma ferramenta tecnológica deve ser tratada como voz infalível de Deus. Ferramenta pode ajudar a estudar A Palavra de Deus continua sendo a referência que precisa ser lida e examinada."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-09-journey-takeaway-9",
        "studyId": "track-06-study-09",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Discernimento é indispensável numa época de excesso de vozes. A Bíblia manda testar, examinar e reter o bem. Fidelidade às Escrituras, centralidade de Cristo, frutos, liberdade para examinar e ausência de manipulação são filtros importantes. Não precisamos ser ingênuos nem cínicos. Podemos ouvir com humildade e conferir com cuidado."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "Fé madura não acredita em tudo que usa o nome de Deus; ela ama tanto a verdade que aprende a examinar."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "Quanto mais conhecemos a Palavra e o Evangelho, menos dependemos de impacto, medo ou carisma para decidir o que merece nossa confiança."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-09-practice-today-10",
        "studyId": "track-06-study-09",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Escolha uma mensagem religiosa recente que chamou sua atenção. Pergunte: Qual texto bíblico foi usado? O contexto confirma a afirmação? Jesus e o Evangelho estão no centro? Que fruto e caráter acompanham a mensagem? Existe pressão, medo ou promessa de ganho?"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-09-reflection-questions-11",
        "studyId": "track-06-study-09",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Costumo compartilhar mensagens sem conferir?",
              "Tenho medo de questionar alguém porque essa pessoa afirma falar por Deus?",
              "Consigo distinguir uma questão central do Evangelho de uma diferença secundária?",
              "Popularidade influencia demais minha avaliação?",
              "Conheço a Bíblia o suficiente para comparar aquilo que ouço?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-09-journal-prompt-12",
        "studyId": "track-06-study-09",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Que hábito de discernimento preciso desenvolver para não entregar minha fé à voz mais forte, mais popular ou mais emocionante?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-09-prayer-13",
        "studyId": "track-06-study-09",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, dá-me amor pela verdade e humildade para aprender. Guarda-me da ingenuidade e também do cinismo. Ensina-me a examinar tudo à luz da tua Palavra, a manter Cristo no centro e a reconhecer frutos verdadeiros. Livra-me de manipulação pelo medo, pela ganância ou pelo carisma. E quando eu estiver errado, dá-me humildade para ser corrigido. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-09-keep-14",
        "studyId": "track-06-study-09",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1 João 4:1 - Não creia em todo espírito; examine. Atos 17:11 - Os bereanos conferiam nas Escrituras. 1 Tessalonicenses 5:21 - Examinai tudo e retende o bem. Favoritos Guarde essas passagens para consultar quando uma mensagem, profecia ou ensino reivindicar autoridade espiritual."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-09-group-mode-15",
        "studyId": "track-06-study-09",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe Quais filtros 1 João e outros textos oferecem para avaliar ensinamentos?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como evitar tanto credulidade quanto desconfiança absoluta?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Que sinais de manipulação espiritual precisamos aprender a reconhecer?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-09-continue-journey-16",
        "studyId": "track-06-study-09",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Discernir tantas vozes também pode cansar. E há momentos em que o problema não é saber o que fazer, mas simplesmente não ter mais forças. A Bíblia também fala com pessoas esgotadas."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Estudo 10 - Cansaço e esperança: quando a alma diz “não aguento mais” Pergunta central: Como Deus cuida de pessoas cansadas e como reencontrar esperança sem fingir força?"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-09-references-17",
        "studyId": "track-06-study-09",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1 João 4:1-6 Atos 17:10-12 1 Tessalonicenses 5:19-22 Mateus 7:15-23 Gálatas 1:6-9 2 Timóteo 4:1-5"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-06-study-10",
    "sections": [
      {
        "id": "track-06-study-10-golden-text-1",
        "studyId": "track-06-study-10",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "“Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.” Mateus 11:28"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-06-study-10-practical-truth-2",
        "studyId": "track-06-study-10",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Deus não exige que finjamos força quando estamos esgotados; Ele nos chama para perto, cuida de nossa fragilidade e pode reacender esperança antes de pedir o próximo passo."
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-06-study-10-bible-reading-3",
        "studyId": "track-06-study-10",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Leia primeiro: 1 Reis 19:1-18 Depois, conecte com: Mateus 11:28-30 | Isaías 40:28-31 | Salmo 42:5-11 | Marcos 6:30-32 | 2 Coríntios 4:7-18"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-06-study-10-before-understanding-4",
        "studyId": "track-06-study-10",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Há dias em que o problema não é falta de conhecimento. Sabemos versículos. Sabemos que precisamos continuar. Mas o corpo e a alma parecem dizer: “Não tenho mais força.” 1 Reis 19 surpreende porque Elias chega a esse lugar logo depois de um grande momento de vitória. Ele foge, tem medo, senta-se no deserto e pede para morrer. O texto não precisa ser usado para dar um diagnóstico moderno a Elias. Mas mostra claramente um homem profundamente esgotado e desesperançado. E a maneira como Deus se aproxima dele é cheia de sabedoria."
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-06-study-10-read-5",
        "studyId": "track-06-study-10",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "LEIA: 1 Reis 19:1-18"
          },
          {
            "type": "PARAGRAPH",
            "text": "Elias havia enfrentado os profetas de Baal no monte Carmelo. Depois recebe ameaça de Jezabel e foge. Aquele que parecia tão forte num capítulo aparece quebrado no seguinte."
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-06-study-10-observe-6",
        "studyId": "track-06-study-10",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 1. Um grande momento espiritual não torna ninguém imune ao cansaço"
          },
          {
            "type": "PARAGRAPH",
            "text": "Elias tinha visto Deus agir de forma extraordinária. Mesmo assim, entrou em medo e esgotamento. Experiências fortes não eliminam limites humanos Você continua sendo criatura, não máquina."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 2. Deus começa com cuidado básico"
          },
          {
            "type": "PARAGRAPH",
            "text": "Antes de uma longa explicação, Elias dorme e recebe alimento e água. Às vezes o cuidado espiritual começa pelo corpo Sono, alimento e pausa não são inimigos da fé."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 3. Deus escuta a percepção de Elias"
          },
          {
            "type": "PARAGRAPH",
            "text": "Elias fala da própria solidão e fracasso. Deus não precisa concordar com cada conclusão para ouvi-lo. Você pode falar como se sente Mesmo quando sua percepção precisa depois ser corrigida."
          },
          {
            "type": "SUBHEADING",
            "text": "OBSERVE 4. Deus corrige a visão de Elias sem humilhá-lo"
          },
          {
            "type": "PARAGRAPH",
            "text": "Elias pensa estar sozinho. Deus revela que há outros fiéis e lhe dá novas tarefas e companheiros. Cansaço estreita nossa visão Às vezes precisamos que Deus e outras pessoas nos ajudem a enxergar além do túnel."
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-06-study-10-understand-7",
        "studyId": "track-06-study-10",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 1. Descanso não é falta de compromisso"
          },
          {
            "type": "PARAGRAPH",
            "text": "Jesus convidou discípulos cansados a descansar. Há momentos em que reduzir ritmo é sabedoria. Descansar pode ser parte da obediência Não precisamos esperar o colapso para reconhecer limites."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 2. Esperança bíblica não exige sentir-se bem imediatamente"
          },
          {
            "type": "PARAGRAPH",
            "text": "O Salmo 42 conversa com uma alma abatida. O salmista lembra a esperança sem negar o abatimento. Esperança pode existir em voz baixa Às vezes ela começa apenas dizendo: “ainda vou esperar em Deus”. CONECTE 3. Isaías fala de renovar forças, não de possuir forças infinitas Até jovens se cansam. O texto não glorifica autossuficiência. Ele aponta para Deus como fonte de renovação. Precisar ser renovado não é fracasso É parte da condição humana."
          },
          {
            "type": "SUBHEADING",
            "text": "ENTENDA 4. Cansaço pode distorcer conclusões"
          },
          {
            "type": "PARAGRAPH",
            "text": "Quando estamos esgotados, tudo pode parecer definitivo. “Ninguém se importa.” “Nada vai mudar.” “Fracassei em tudo.” Não tome toda conclusão cansada como veredito final Descanse e procure perspectiva antes de decidir coisas irreversíveis."
          },
          {
            "type": "SUBHEADING",
            "text": "CUIDADO PARA NÃO CONFUNDIR"
          },
          {
            "type": "PARAGRAPH",
            "text": "Não espiritualize cansaço intenso como simples falta de oração Exaustão pode envolver carga de trabalho, luto, doença, conflitos, falta de sono e outras situações. Oração é essencial, mas nem toda resposta se resume a “ore mais”. Deus cuida de pessoas inteiras Corpo, mente, relações e espírito importam. Quando o desespero inclui desejo de morrer, procure ajuda imediata Elias verbaliza desejo de morrer. Quando alguém hoje sente que pode machucar a si mesmo ou não consegue se manter seguro, isso precisa ser levado a sério. Procure imediatamente pessoas confiáveis e serviços de saúde ou emergência disponíveis em sua região. Não carregue esse tipo de desespero sozinho Pedir ajuda imediata é uma atitude de proteção, não vergonha. + APROFUNDE O que foi a “voz mansa e delicada” em 1 Reis 19? O texto descreve vento, terremoto e fogo, seguidos por uma manifestação descrita em traduções de maneiras como voz mansa, suave ou som de silêncio delicado. O objetivo não deve ser transformar isso numa fórmula de que Deus sempre fala por uma sensação silenciosa. A cena mostra que Deus não estava limitado às manifestações espetaculares e encontrou Elias de maneira pessoal. Não transforme a experiência de Elias em técnica universal Receba o ponto principal: Deus se aproxima e fala de maneiras que não dependem do espetáculo."
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-06-study-10-apply-8",
        "studyId": "track-06-study-10",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "type": "SUBHEADING",
            "text": "REFLITA 1. Pergunte primeiro do que você está realmente cansado"
          },
          {
            "type": "PARAGRAPH",
            "text": "Trabalho? Conflito? Cuidado de alguém? Pressão financeira? Ministério? Falta de sono? Cansaço genérico precisa ser dividido em cargas reais. Nomear a carga ajuda a buscar cuidado adequado Nem todo cansaço tem a mesma causa."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 2. Dê ao corpo aquilo que ele precisa"
          },
          {
            "type": "PARAGRAPH",
            "text": "Talvez o próximo passo seja dormir, comer, caminhar, fazer uma pausa ou buscar avaliação de saúde. Você não é menos espiritual porque precisa descansar Deus criou um corpo com limites."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 3. Não decida a vida inteira no pior dia"
          },
          {
            "type": "PARAGRAPH",
            "text": "Se possível, adie decisões grandes enquanto estiver profundamente esgotado. Procure alguém de confiança para ajudar a enxergar. Cansaço pede pausa antes de sentença Um dia difícil não conhece todo o futuro."
          },
          {
            "type": "SUBHEADING",
            "text": "REFLITA 4. Receba nova direção em passos pequenos"
          },
          {
            "type": "PARAGRAPH",
            "text": "Deus não entrega a Elias o mapa do resto da vida de uma vez. Ele recebe próximas tarefas e companhia. Esperança pode voltar como próximo passo Não precisa aparecer como energia para resolver tudo de uma vez."
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-06-study-10-journey-takeaway-9",
        "studyId": "track-06-study-10",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1 Reis 19 mostra que pessoas usadas por Deus também podem chegar ao limite. Deus não começa humilhando Elias. Ele oferece cuidado, escuta, presença, correção de perspectiva e nova direção. Isso não significa que todo cansaço possui a mesma causa. Significa que não precisamos fingir força para nos aproximar de Deus. Esperança pode recomeçar devagar."
          },
          {
            "type": "SUBHEADING",
            "text": "Conclusão"
          },
          {
            "type": "PARAGRAPH",
            "text": "Às vezes a resposta de Deus ao “não aguento mais” começa com: descanse, alimente-se, fale a verdade, receba companhia e depois dê o próximo passo."
          },
          {
            "type": "SUBHEADING",
            "text": "Verdade Prática"
          },
          {
            "type": "PARAGRAPH",
            "text": "Cansaço não precisa ser o fim da Jornada; pode ser um chamado para receber cuidado, reorganizar cargas e voltar a caminhar sustentado pela esperança de Deus."
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-06-study-10-practice-today-10",
        "studyId": "track-06-study-10",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Faça hoje uma avaliação simples: O que está me esgotando? O que meu corpo precisa? Que responsabilidade pode esperar? Com quem preciso conversar? Qual é apenas o próximo passo? Não tente resolver todos os meses futuros em um único dia."
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-06-study-10-reflection-questions-11",
        "studyId": "track-06-study-10",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "type": "BULLET_LIST",
            "items": [
              "Tenho confundido descanso com preguiça?",
              "Que carga atual está consumindo mais forças?",
              "Meu cansaço está distorcendo a maneira como vejo minha vida?",
              "Quem pode me ajudar a carregar parte do peso?",
              "Que próximo passo parece possível depois de receber cuidado?"
            ]
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-06-study-10-journal-prompt-12",
        "studyId": "track-06-study-10",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "O que preciso parar de exigir de mim mesmo para conseguir receber o cuidado de Deus e voltar a caminhar com esperança?"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-06-study-10-prayer-13",
        "studyId": "track-06-study-10",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Oração Senhor, estou cansado e não quero esconder isso de ti. Tu conheces meu corpo, minha mente e aquilo que tenho carregado. Dá-me humildade para descansar, receber ajuda e reconhecer limites. Corrige as conclusões que o esgotamento tem produzido em mim. Coloca pessoas seguras ao meu lado e reacende a esperança. Não preciso enxergar todo o caminho agora; mostra-me o próximo passo e sustenta-me nele. Amém."
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-06-study-10-keep-14",
        "studyId": "track-06-study-10",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Mateus 11:28-30 - Jesus chama os cansados para perto. Isaías 40:29-31 - Deus fortalece o cansado. Salmo 42:11 - A alma abatida é chamada novamente à esperança. Favoritos Guarde essas passagens para os dias em que a força diminuir e você precisar lembrar que cansaço não significa abandono."
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-06-study-10-group-mode-15",
        "studyId": "track-06-study-10",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1. Observe O que surpreende na maneira como Deus cuida de Elias em 1 Reis 19?"
          },
          {
            "type": "SUBHEADING",
            "text": "2. Entenda"
          },
          {
            "type": "PARAGRAPH",
            "text": "Por que descanso não deve ser confundido com falta de fé?"
          },
          {
            "type": "SUBHEADING",
            "text": "3. Pratique"
          },
          {
            "type": "PARAGRAPH",
            "text": "Como podemos perceber e apoiar alguém que chegou ao limite sem oferecer frases simplistas?"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-06-study-10-continue-journey-16",
        "studyId": "track-06-study-10",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "Você concluiu a Trilha 6 - Vida à Luz da Palavra. Passamos por finanças, juventude, família, trabalho, fé, vida digital, escravidões, solidão, discernimento e cansaço. São áreas diferentes, mas todas nos levam à mesma direção: trazer a vida real para debaixo da Palavra e do senhorio de Cristo."
          },
          {
            "type": "SUBHEADING",
            "text": "Próximo estudo"
          },
          {
            "type": "PARAGRAPH",
            "text": "TRILHA 6 COMPLETA - 10/10 Continue sua Jornada revisitando os estudos que mais tocaram sua realidade, registrando no Diário os passos que Deus está formando e guardando nos Favoritos as passagens que precisam acompanhar sua caminhada."
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-06-study-10-references-17",
        "studyId": "track-06-study-10",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "type": "PARAGRAPH",
            "text": "1 Reis 19:1-18 Mateus 11:28-30 Isaías 40:28-31 Salmo 42:5-11 Marcos 6:30-32 2 Coríntios 4:7-18"
          }
        ],
        "order": 17,
        "optional": false
      }
    ]
  }
] as const;

const sectionIconKey: Readonly<Record<string, string>> = {
  GOLDEN_TEXT: "texto_aureo", PRACTICAL_TRUTH: "verdade_pratica", BIBLE_READING: "leitura_biblica",
  BEFORE_UNDERSTANDING: "leia", READ: "leia", OBSERVE: "observe", UNDERSTAND: "compreenda",
  APPLY: "aplique", JOURNEY_TAKEAWAY: "levamos_da_jornada", PRACTICE_TODAY: "pratique_hoje",
  REFLECTION_QUESTIONS: "para_refletir", JOURNAL_PROMPT: "registrar_diario", PRAYER: "ore",
  KEEP: "para_guardar", GROUP_MODE: "modo_grupo", CONTINUE_JOURNEY: "continue_jornada", REFERENCES: "referencias",
};

function toStudy(raw: (typeof rawStudies)[number]): Study {
  return {
    id: raw.id as StudyId,
    trackId: raw.trackId as StudyTrackId,
    number: raw.number,
    slug: raw.slug as StudySlug,
    title: raw.title,
    summary: raw.summary,
    questionCentral: raw.questionCentral,
    objective: raw.objective,
    estimatedMinutes: raw.estimatedMinutes as Study["estimatedMinutes"],
    heroImage: "track-06-hero",
    nextStudyId: raw.nextStudyId === null ? null : (raw.nextStudyId as StudyId),
    audienceLevel: null,
    tags: [],
    published: false,
  };
}
function toSection(raw: (typeof rawSectionsByStudy)[number]["sections"][number]): StudySection {
  return {
    id: raw.id as StudySectionId,
    studyId: raw.studyId as StudyId,
    type: raw.type as StudySection["type"],
    title: raw.title,
    iconKey: sectionIconKey[raw.type] ?? "estudo",
    blocks: raw.blocks as unknown as StudySection["blocks"],
    order: raw.order,
    optional: raw.optional,
    collapsible: true,
  };
}
const studies: readonly Study[] = rawStudies.map(toStudy);
const sections: readonly StudySection[] = rawSectionsByStudy.flatMap((entry) =>
  entry.sections.map((section) => toSection(section)),
);
export const track06DraftBatchPackage: StudyContentPackage = {
  contentVersion: "draft-track-06-studies-01-10-v1",
  tracks: [track],
  studies,
  sections,
  references: [],
};
