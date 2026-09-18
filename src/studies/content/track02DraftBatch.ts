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

export const TRACK_02_DRAFT_BATCH_PROFILE = "JOURNEY_20_30_V1" as const;
export const TRACK_02_DRAFT_BATCH_EDITORIAL_STATUS = "DRAFT" as const;
export const TRACK_02_DRAFT_BATCH_PUBLISHED = false as const;
export const TRACK_02_DRAFT_BATCH_RUNTIME_ELIGIBLE = false as const;

const TRACK_02_ID = "track-02" as StudyTrackId;

const track: StudyTrack = {
  id: TRACK_02_ID,
  slug: "conhecendo-deus" as StudyTrackSlug,
  title: "Conhecendo Deus",
  description: "Conhecendo Deus",
  type: "FORMATION",
  contentProfile: TRACK_02_DRAFT_BATCH_PROFILE,
  cardImage: "track-02-card",
  heroImage: "track-02-hero",
  order: 2,
  published: true,
};

export const track02DraftBatchEditorialSources = [
  {
    "studyNumber": 2,
    "studyId": "track-02-study-02",
    "candidateSha256": "CD67811EDF3C16A5F58BA0216FC38FE3F33A667BFBD5CB290C5328C74B8B6530",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_02_Deus_Santo.pdf",
    "sourceBytes": 953691,
    "sourceSha256": "1515F801ACAC55340353D5A58F051836276E5B2E68B2C2BA41A77D50D9974AA2",
    "sourcePageCount": 8,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 3,
    "studyId": "track-02-study-03",
    "candidateSha256": "E3CDA836746C8FBB2140D46A05173C53246F174F797D2E924104168C3983DF52",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_03_Deus_Justo.pdf",
    "sourceBytes": 974568,
    "sourceSha256": "1EAA86CCD0FB552AF0EF0C1AE365C2CB408181BA56BB25182EE1B1A186F457FA",
    "sourcePageCount": 8,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 4,
    "studyId": "track-02-study-04",
    "candidateSha256": "2B19E4840335377DAEA98E5CFF95D0C20A2B4D31FB1FDDA1E0B55D82AAC4AC32",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_04_Deus_Misericordioso.pdf",
    "sourceBytes": 974515,
    "sourceSha256": "D78A39A50D054A9F5356F886CAA03FF5F21479A6EB373D51C3A4504473084037",
    "sourcePageCount": 8,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 5,
    "studyId": "track-02-study-05",
    "candidateSha256": "1C11729BD5622E98FDFD8831E9458E2EBA695053605CDF85FDA7EECC32A4AAD9",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_05_Deus_Fiel.pdf",
    "sourceBytes": 976279,
    "sourceSha256": "977E308C7A93BD183312D5396E8C5A1A03101E569CE7DA9557AE84443BEAC21C",
    "sourcePageCount": 9,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 6,
    "studyId": "track-02-study-06",
    "candidateSha256": "74531DECDBBDAE9DF96884193DCB8C12D8F5401FEFCCF67EBA3CA747F880A414",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_06_Deus_Que_Se_Revela.pdf",
    "sourceBytes": 950696,
    "sourceSha256": "9924B1EEC8922E24E173AF60F94459ACD3D3DFFF337E0335E74F34D4257E3464",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 7,
    "studyId": "track-02-study-07",
    "candidateSha256": "F329EBC9963FD5579CD0E9537FD522006771511F68C7F4B12CE320412D604723",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_07_A_Soberania_De_Deus.pdf",
    "sourceBytes": 950212,
    "sourceSha256": "5492D7F80B2A8930C4C3E7A2390FB45737EFA74BA07F780C8C16D528B3A6DBB8",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 8,
    "studyId": "track-02-study-08",
    "candidateSha256": "34A8835746CE7312A484DD672301B68868BF60B11CB6744ADC9E865AB58369A8",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_08_O_Amor_De_Deus.pdf",
    "sourceBytes": 950278,
    "sourceSha256": "419CD3C11AA51DD80C722896DFBBA7E529DC1493A9E6A048C18A20ED8D52FC6C",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 9,
    "studyId": "track-02-study-09",
    "candidateSha256": "C40592C1B8322400BFD7FE5801FC2A6ABC424960C6B39A607C841EDC650EA4D2",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_09_Justica_E_Graca.pdf",
    "sourceBytes": 950556,
    "sourceSha256": "FFDE71058E960C711ACB8F1D22CFFEF7E75ECEAB610680FFF1550F61EA5ECC67",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  },
  {
    "studyNumber": 10,
    "studyId": "track-02-study-10",
    "candidateSha256": "56B1FCE2440617EE363B942C380917E0201022D2CE2DB948869B4A94A2DEA143",
    "sourceRelativePath": "trilha_02\\Biblia_Jornada_Trilha_2_Estudo_10_Pai_Filho_E_Espirito_Santo.pdf",
    "sourceBytes": 950773,
    "sourceSha256": "C04D843D3C9CDE788A3E30CF81B61D695AC9B38527C8820B880C987290394AC4",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1"
  }
] as const;

const rawStudies = [
  {
    "id": "track-02-study-02",
    "trackId": "track-02",
    "number": 2,
    "slug": "deus-santo-quando-estar-perto-de",
    "title": "Deus Santo: quando estar perto de",
    "summary": "Deus muda a nossa vida",
    "questionCentral": "O que significa dizer que Deus é santo - e o que acontece conosco quando realmente\ncompreendemos isso?",
    "objective": "Descobrir que a santidade revela quem Deus é, como devemos nos aproximar dele e por que\numa vida com Deus também começa a mudar nossa maneira de viver.",
    "estimatedMinutes": null,
    "nextStudyId": "track-02-study-03",
    "published": false
  },
  {
    "id": "track-02-study-03",
    "trackId": "track-02",
    "number": 3,
    "slug": "deus-justo-ninguem-e-invisivel-diante",
    "title": "Deus Justo: ninguém é invisível diante",
    "summary": "dele",
    "questionCentral": "O que significa dizer que Deus é justo - e por que sua justiça é uma boa notícia em um mundo\ntão injusto?",
    "objective": "Compreender que Deus nunca age com corrupção, favoritismo ou injustiça. Sua justiça nos\nconfronta, protege a dignidade das pessoas e nos dá esperança de que o mal não ficará para\nsempre sem resposta.",
    "estimatedMinutes": null,
    "nextStudyId": "track-02-study-04",
    "published": false
  },
  {
    "id": "track-02-study-04",
    "trackId": "track-02",
    "number": 4,
    "slug": "deus-misericordioso-quando-deus-se",
    "title": "Deus Misericordioso: quando Deus se",
    "summary": "aproxima de quem precisa de graça",
    "questionCentral": "O que significa a misericórdia de Deus - e por que Ele continua se aproximando de pessoas que\nnão merecem sua bondade?",
    "objective": "Compreender que a misericórdia de Deus não é fraqueza nem indiferença diante do pecado. É\na bondade de Deus alcançando pessoas necessitadas, oferecendo perdão, cuidado, paciência e\noportunidade de recomeço.",
    "estimatedMinutes": null,
    "nextStudyId": "track-02-study-05",
    "published": false
  },
  {
    "id": "track-02-study-05",
    "trackId": "track-02",
    "number": 5,
    "slug": "deus-fiel-quando-a-promessa-parece",
    "title": "Deus Fiel: quando a promessa parece",
    "summary": "demorar",
    "questionCentral": "O que significa dizer que Deus é fiel - e como continuar confiando quando as circunstâncias\nparecem contradizer aquilo que Ele prometeu?",
    "objective": "Compreender que a fidelidade de Deus não depende das circunstâncias, das emoções ou da\nnossa capacidade de entender tudo. Deus permanece verdadeiro, cumpre sua Palavra e\ncontinua sendo digno de confiança mesmo quando ainda não conseguimos enxergar o que Ele\nestá fazendo.",
    "estimatedMinutes": null,
    "nextStudyId": "track-02-study-06",
    "published": false
  },
  {
    "id": "track-02-study-06",
    "trackId": "track-02",
    "number": 6,
    "slug": "deus-que-se-revela-o-deus-que-nao",
    "title": "Deus que se revela: o Deus que não",
    "summary": "permaneceu em silêncio",
    "questionCentral": "Como podemos conhecer Deus - e de que maneira Ele decidiu se dar a conhecer à\nhumanidade?",
    "objective": "Compreender que não precisamos inventar quem Deus é. Ele se dá a conhecer por meio da\ncriação, de sua ação na história, de sua Palavra e, de maneira decisiva, em Jesus Cristo.",
    "estimatedMinutes": null,
    "nextStudyId": "track-02-study-07",
    "published": false
  },
  {
    "id": "track-02-study-07",
    "trackId": "track-02",
    "number": 7,
    "slug": "a-soberania-de-deus-quando-nao",
    "title": "A soberania de Deus: quando não",
    "summary": "temos o controle",
    "questionCentral": "O que significa dizer que Deus é soberano - e como confiar nele sem transformar a fé em\nfatalismo ou passividade?",
    "objective": "Compreender que Deus continua sendo Senhor sobre a criação e a história, mesmo quando\nnão entendemos tudo, e que sua soberania não elimina nossas escolhas, nossa\nresponsabilidade, nossas orações nem a necessidade de agir.",
    "estimatedMinutes": null,
    "nextStudyId": "track-02-study-08",
    "published": false
  },
  {
    "id": "track-02-study-08",
    "trackId": "track-02",
    "number": 8,
    "slug": "o-amor-de-deus-um-amor-que-nao",
    "title": "O amor de Deus: um amor que não",
    "summary": "começa em nós",
    "questionCentral": "O que a Bíblia quer dizer quando afirma que Deus é amor - e como esse amor transforma a\nmaneira como recebemos e oferecemos amor?",
    "objective": "Compreender que o amor de Deus nasce de seu próprio caráter, é demonstrado de maneira\ndecisiva em Cristo e não significa aprovação de tudo, mas uma bondade santa que busca nosso\nbem e nos ensina a amar.",
    "estimatedMinutes": null,
    "nextStudyId": "track-02-study-09",
    "published": false
  },
  {
    "id": "track-02-study-09",
    "trackId": "track-02",
    "number": 9,
    "slug": "justica-e-graca-deus-nao-ignora-o",
    "title": "Justiça e graça: Deus não ignora o",
    "summary": "pecado nem abandona o pecador",
    "questionCentral": "Como justiça e graça se encontram em Deus - e por que a cruz ocupa o centro dessa resposta?",
    "objective": "Compreender que Deus não precisa escolher entre ser justo e ser gracioso. Na obra de Cristo, o\npecado é levado a sério e o pecador encontra perdão, reconciliação e uma nova vida que não\npode ser comprada por mérito.",
    "estimatedMinutes": null,
    "nextStudyId": "track-02-study-10",
    "published": false
  },
  {
    "id": "track-02-study-10",
    "trackId": "track-02",
    "number": 10,
    "slug": "pai-filho-e-espirito-santo-o-unico",
    "title": "Pai, Filho e Espírito Santo: o único",
    "summary": "Deus que se revelou dessa maneira",
    "questionCentral": "Como a Bíblia apresenta um único Deus e, ao mesmo tempo, Pai, Filho e Espírito Santo?",
    "objective": "Compreender, sem complicação desnecessária, que a Bíblia ensina a existência de um único\nDeus e apresenta o Pai, o Filho e o Espírito Santo como distintos entre si e plenamente ligados\nà identidade e à obra divina.",
    "estimatedMinutes": null,
    "nextStudyId": null,
    "published": false
  }
] as const;

const rawSectionsByStudy = [
  {
    "studyId": "track-02-study-02",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Santo, santo, santo é o Senhor dos Exércitos.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isaías 6:3",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Conhecer o Deus santo não nos afasta dele; faz-nos aproximar com reverência, reconhecer",
            "type": "SUBHEADING"
          },
          {
            "text": "aquilo que precisa mudar e desejar uma vida que lhe agrade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Isaías 6:1-8",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: Levítico 19:1-2 | Salmo 99:1-5 | 1 Pedro 1:13-16 | Hebreus 10:19-22 | Apocalipse",
            "type": "PARAGRAPH"
          },
          {
            "text": "4:8-11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Quando ouvimos a palavra santidade, talvez algumas imagens venham à mente: uma pessoa muito religiosa,",
            "type": "PARAGRAPH"
          },
          {
            "text": "alguém que nunca pode errar, uma lista enorme de coisas proibidas ou um jeito específico de se vestir ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "falar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a Bíblia começa em outro lugar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Antes de falar sobre uma pessoa santa, ela nos apresenta um Deus santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso muda tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade não começa com o esforço humano para parecer correto. Começa com quem Deus é.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Isaías 6, o profeta não recebe primeiro uma lista de comportamentos. Ele recebe uma visão. Ele vê o",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E, depois de enxergar Deus de uma maneira mais profunda, começa a enxergar a si mesmo de maneira",
            "type": "PARAGRAPH"
          },
          {
            "text": "diferente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Jornada deste estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Ver quem Deus é, perceber quem somos diante dele e compreender como sua presença",
            "type": "SUBHEADING"
          },
          {
            "text": "começa a transformar nossa vida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "Leia: Isaías 6:1-8",
        "blocks": [
          {
            "text": "Isaías vê o Senhor em seu trono. A cena transmite grandeza. O templo se enche. Os seres celestiais adoram. E",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma declaração domina o ambiente: “Santo, santo, santo.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Não dizem primeiro “Poderoso, poderoso, poderoso” nem “Amoroso, amoroso, amoroso”, embora Deus seja",
            "type": "PARAGRAPH"
          },
          {
            "text": "poderoso e amoroso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Naquela visão, a palavra repetida é: santo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "1. Deus ocupa o centro da cena",
        "blocks": [
          {
            "text": "Isaías não aparece como personagem principal. O profeta está olhando para Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes até nossa vida espiritual pode se tornar centrada apenas em nós: “minha bênção”, “meu problema”,",
            "type": "PARAGRAPH"
          },
          {
            "text": "“meu sonho”, “minha vitória”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Primeiro movimento",
            "type": "SUBHEADING"
          },
          {
            "text": "Antes de perguntar o que Deus pode fazer por mim, preciso aprender quem Deus é.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "2. Deus é chamado de santo três vezes",
        "blocks": [
          {
            "text": "Na linguagem bíblica, repetir uma palavra aumenta sua força. É como se a visão estivesse dizendo: Deus é",
            "type": "PARAGRAPH"
          },
          {
            "text": "absolutamente santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa mais do que simplesmente dizer que Deus “não faz coisas erradas”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não possui maldade. Não existe corrupção nele. Não existe engano. Não existe uma parte escondida de",
            "type": "PARAGRAPH"
          },
          {
            "text": "seu caráter que seja injusta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas sua santidade também aponta para sua grandeza e diferença. Deus não é apenas uma versão maior de",
            "type": "PARAGRAPH"
          },
          {
            "text": "nós. Ele é o Criador. Nós somos criaturas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma verdade importante",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não pode ser reduzido ao tamanho das nossas ideias sobre Ele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "3. A presença de Deus revela a condição de Isaías",
        "blocks": [
          {
            "text": "Quando Isaías vê o Senhor, ele não diz: “Finalmente Deus poderá perceber como sou melhor que as outras",
            "type": "PARAGRAPH"
          },
          {
            "text": "pessoas.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Ele olha para si mesmo e reconhece sua necessidade. Isaías percebe seu pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma imagem simples",
            "type": "SUBHEADING"
          },
          {
            "text": "A luz não cria a sujeira. Ela apenas mostra o que estava ali.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A santidade de Deus faz isso conosco. Ela ilumina.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "4. Deus não mostra o pecado de Isaías apenas para destruí-lo",
        "blocks": [
          {
            "text": "Isaías reconhece sua culpa, mas a história não termina com ele condenado diante da visão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há purificação. Há perdão. Depois há chamado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus pergunta quem irá. E aquele homem que momentos antes estava dizendo “Ai de mim” agora responde:",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Eis-me aqui.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "A sequência",
            "type": "SUBHEADING"
          },
          {
            "text": "Presença → reconhecimento → purificação → disponibilidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "1. Santidade começa em Deus",
        "blocks": [
          {
            "text": "Quando a Bíblia chama Deus de santo, ela não está dizendo que Ele conseguiu alcançar um padrão externo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não existe uma regra acima de Deus que Ele tenta obedecer para se tornar bom.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus é perfeitamente puro, verdadeiro e justo em tudo aquilo que é.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos confiar nele",
            "type": "SUBHEADING"
          },
          {
            "text": "Não existe escuridão moral escondida em Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "2. A santidade de Deus não é inimiga do seu amor",
        "blocks": [
          {
            "text": "Às vezes criamos duas imagens diferentes de Deus: um Deus santo e severo, e outro Deus amoroso e",
            "type": "PARAGRAPH"
          },
          {
            "text": "misericordioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não nos dá dois deuses.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Deus santo é o Deus que ama. O Deus que ama é santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu amor não chama o mal de bem. Sua santidade não elimina sua misericórdia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso nos ajuda a entender",
            "type": "SUBHEADING"
          },
          {
            "text": "Um Deus que ama verdadeiramente não trata como inofensivo aquilo que destrói seus filhos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "3. A santidade aparece durante toda a Bíblia",
        "blocks": [
          {
            "text": "Em Levítico, Deus diz ao seu povo: sejam santos, porque Eu sou santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "No Salmo 99, a santidade de Deus aparece junto com sua grandeza e justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em 1 Pedro, muitos séculos depois, o chamado continua: vivam de maneira santa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A linha bíblica",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus é santo → chama um povo para si → esse povo aprende a viver de maneira coerente com",
            "type": "SUBHEADING"
          },
          {
            "text": "aquele a quem pertence.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade não significa tentar virar Deus. Significa pertencer a Deus e permitir que essa relação mude nossa",
            "type": "PARAGRAPH"
          },
          {
            "text": "maneira de viver.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "4. Santidade não significa perfeição instantânea",
        "blocks": [
          {
            "text": "Talvez alguém leia “Sejam santos” e pense: “Então um cristão verdadeiro nunca mais erra.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Não é isso que encontramos na caminhada dos discípulos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A vida de santidade inclui arrependimento, mudança, crescimento, abandono de pecados, aprendizado e",
            "type": "PARAGRAPH"
          },
          {
            "text": "perseverança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma frase para guardar",
            "type": "SUBHEADING"
          },
          {
            "text": "Santidade não é fingir que nunca erramos. É não fazer amizade com aquilo que Deus está nos",
            "type": "SUBHEADING"
          },
          {
            "text": "chamando a abandonar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "5. Como pecadores podem se aproximar de um Deus santo?",
        "blocks": [
          {
            "text": "Isaías 6 já começa a responder essa pergunta. Isaías não consegue purificar a si mesmo. A purificação vem até",
            "type": "PARAGRAPH"
          },
          {
            "text": "ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "No Novo Testamento essa verdade se torna ainda mais clara em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 10 afirma que podemos nos aproximar de Deus com confiança por causa daquilo que Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "realizou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho",
            "type": "SUBHEADING"
          },
          {
            "text": "Não nos ensina a fugir do Deus santo. Ensina-nos a nos aproximar dele por meio de Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "SUBHEADING"
          },
          {
            "text": "Santidade não é isolamento",
            "type": "SUBHEADING"
          },
          {
            "text": "Ser santo não significa: “Não posso me aproximar de ninguém que pense diferente de mim.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus conviveu com pecadores, comeu com pessoas desprezadas e tocou aqueles que outros evitavam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A diferença é que Jesus se aproximava das pessoas sem participar do pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Equilíbrio",
            "type": "SUBHEADING"
          },
          {
            "text": "Santidade não significa abandonar pessoas; significa não permitir que o pecado governe nossa",
            "type": "PARAGRAPH"
          },
          {
            "text": "vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade também não é aparência religiosa",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma pessoa pode falar como cristã, vestir-se como cristã, frequentar cultos e usar linguagem religiosa, e",
            "type": "PARAGRAPH"
          },
          {
            "text": "ainda manter mentira, orgulho, crueldade, injustiça, falta de perdão ou vida dupla.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus confrontou muitas vezes uma religião concentrada na aparência e distante do coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade verdadeira",
            "type": "SUBHEADING"
          },
          {
            "text": "Alcança aquilo que somos quando ninguém está olhando.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "Por que Isaías diz “Santo, santo, santo”?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A repetição torna a afirmação mais forte. Na linguagem bíblica, repetir algo pode servir para enfatizar sua",
            "type": "PARAGRAPH"
          },
          {
            "text": "importância.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristãos também percebem que a Bíblia posteriormente revela Pai, Filho e Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas é importante não afirmar que Isaías 6:3, sozinho, foi escrito como uma explicação completa da Trindade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ponto direto da passagem",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus é absolutamente santo e digno de adoração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "items": [
              "Santidade muda a maneira como nos aproximamos de Deus"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Existe diferença entre intimidade e falta de reverência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus nos convida para perto. Podemos falar com Ele, chamá-lo de Pai e abrir o coração. Mas Ele continua",
            "type": "PARAGRAPH"
          },
          {
            "text": "sendo Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Maturidade espiritual",
            "type": "SUBHEADING"
          },
          {
            "text": "Quanto mais conhecemos Deus, mais conseguimos unir confiança e reverência.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Santidade muda nossa relação com o pecado"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Se Deus é santo, não podemos tratar o pecado apenas como “um erro pequeno que todo mundo comete”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas também não precisamos viver esmagados pela culpa depois de nos arrependermos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isaías viu sua culpa, recebeu purificação e continuou sua caminhada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Duas verdades juntas",
            "type": "SUBHEADING"
          },
          {
            "text": "A santidade de Deus nos ensina a levar o pecado a sério. A graça de Deus nos ensina que",
            "type": "SUBHEADING"
          },
          {
            "text": "podemos levá-lo até Ele.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Santidade alcança a vida comum"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "É fácil imaginar santidade apenas dentro da igreja.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas ela alcança a maneira como usamos dinheiro, aquilo que assistimos, como falamos, como tratamos",
            "type": "PARAGRAPH"
          },
          {
            "text": "pessoas, como fazemos negócios, como usamos nosso corpo e o que fazemos escondidos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta melhor",
            "type": "SUBHEADING"
          },
          {
            "text": "Não apenas: “Isso é permitido?”",
            "type": "SUBHEADING"
          },
          {
            "text": "Mas também: “Isso combina com uma vida que pertence a Deus?”",
            "type": "SUBHEADING"
          },
          {
            "items": [
              "Santidade não nos torna superiores"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Se nossa ideia de santidade começa a produzir orgulho, alguma coisa está errada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isaías viu Deus e ficou mais consciente de sua própria necessidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Resultado saudável",
            "type": "SUBHEADING"
          },
          {
            "text": "A santidade verdadeira produz humildade, não arrogância religiosa.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Santidade também significa disponibilidade"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Não perca o final de Isaías 6. Depois da purificação, Deus chama. E Isaías responde: “Eis-me aqui.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade não é apenas perguntar “Do que preciso me afastar?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também é perguntar",
            "type": "SUBHEADING"
          },
          {
            "text": "Para que Deus quer usar minha vida?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus é santo. Isso significa que nele não existe maldade, corrupção ou injustiça. Ele é digno de reverência e",
            "type": "PARAGRAPH"
          },
          {
            "text": "adoração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando sua santidade ilumina nossa vida, começamos a enxergar aquilo que antes escondíamos ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "normalizávamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Deus não revela nossa necessidade apenas para nos afastar. Ele purifica, perdoa, transforma e chama.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso, santidade não é uma competição para descobrir quem parece mais religioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "SUBHEADING"
          },
          {
            "text": "Quanto mais conhecemos o Deus santo, mais desejamos que nossa vida combine com aquele a",
            "type": "PARAGRAPH"
          },
          {
            "text": "quem pertencemos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Conhecer o Deus santo nos ensina a abandonar o pecado sem fugir de Deus, aproximando-nos",
            "type": "SUBHEADING"
          },
          {
            "text": "dele com reverência, confiança e desejo sincero de viver para sua glória.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Reserve alguns minutos sem distrações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore: “Senhor, mostra-me uma área da minha vida que ainda não combina com aquilo que tu desejas para",
            "type": "PARAGRAPH"
          },
          {
            "text": "mim.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Não tente procurar dez coisas. Comece com uma.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando perceber algo concreto, decida qual será seu primeiro passo de obediência ainda hoje.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Quando penso na santidade de Deus, sinto apenas medo ou também desejo de me aproximar dele?",
              "Existe algum comportamento que comecei a chamar de “normal”, mesmo sabendo que Deus deseja"
            ],
            "type": "BULLET_LIST"
          },
          {
            "text": "mudança?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Tenho confundido santidade com aparência religiosa?",
              "Minha busca por uma vida santa tem me tornado mais humilde ou mais crítico das outras pessoas?",
              "Depois de dizer “não” ao pecado, para que Deus pode estar me chamando a dizer “sim”?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que área da minha vida Deus está me chamando a entregar com mais sinceridade a Ele?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, tu és santo e não existe maldade em ti. Quanto mais te conheço, mais percebo o",
            "type": "SUBHEADING"
          },
          {
            "text": "quanto preciso da tua graça. Mostra aquilo que preciso abandonar, mas não permita que eu fuja",
            "type": "PARAGRAPH"
          },
          {
            "text": "de tua presença por vergonha. Obrigado porque em Cristo posso me aproximar de ti. Purifica",
            "type": "SUBHEADING"
          },
          {
            "text": "meu coração, muda meus desejos e ensina-me a viver de maneira que honre teu nome.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Livra-me de uma santidade de aparência e forma em mim uma vida verdadeira diante de ti. E",
            "type": "SUBHEADING"
          },
          {
            "text": "quando me chamares, dá-me coragem para responder: eis-me aqui. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Isaías 6:3 - Deus é santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 1:15-16 - Porque Ele é santo, somos chamados a uma vida santa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Leia as duas passagens juntas e guarde-as para revisitar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que mais chamou sua atenção na reação de Isaías ao encontrar-se com a santidade de Deus?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre santidade verdadeira e aparência religiosa?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que atitude concreta podemos tomar nesta semana para viver de maneira mais coerente com",
            "type": "PARAGRAPH"
          },
          {
            "text": "aquilo que cremos?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Conhecemos Deus como Criador. Agora vimos que Ele é Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas outra pergunta aparece: se Deus é santo, como Ele reage ao que é errado? Ele trata todas as pessoas da",
            "type": "PARAGRAPH"
          },
          {
            "text": "mesma forma? Podemos confiar em suas decisões?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Estudo 03 - Deus Justo",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunta central: O que significa dizer que Deus é justo - e por que sua justiça é uma boa",
            "type": "SUBHEADING"
          },
          {
            "text": "notícia em um mundo tão injusto?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Isaías 6:1-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Levítico 19:1-2",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 99:1-5",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 1:13-16",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 10:19-22",
            "type": "PARAGRAPH"
          },
          {
            "text": "Apocalipse 4:8-11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 25,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-02-study-03",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Ele é a Rocha, cuja obra é perfeita, porque todos os seus caminhos justos são.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deuteronômio 32:4",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Porque Deus é justo, podemos confiar que Ele nunca chama o mal de bem, nunca despreza a",
            "type": "SUBHEADING"
          },
          {
            "text": "verdade e nunca esquece quem sofreu injustamente.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Deuteronômio 10:17-19",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: Gênesis 18:22-33 | Salmo 9:7-10 | Salmo 89:14 | Romanos 2:1-11 | Romanos 3:21-26 |",
            "type": "PARAGRAPH"
          },
          {
            "text": "Miqueias 6:8",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Todos nós sabemos, de alguma maneira, o que é sentir injustiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Alguém recebe tratamento diferente por ter dinheiro. Uma pessoa mente e outra paga pelo erro. Quem",
            "type": "PARAGRAPH"
          },
          {
            "text": "possui influência consegue escapar. Uma vítima não é ouvida. Um trabalhador é prejudicado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando vemos essas coisas, uma pergunta aparece: “Onde está a justiça?”",
            "type": "SUBHEADING"
          },
          {
            "text": "A Bíblia não ignora essa pergunta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela apresenta Deus como alguém profundamente diferente dos sistemas injustos que conhecemos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não pode ser comprado. Não se impressiona com títulos. Não favorece alguém porque é rico. Não",
            "type": "PARAGRAPH"
          },
          {
            "text": "despreza alguém porque é pobre. Não precisa investigar para descobrir o que realmente aconteceu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dizer que Deus é justo significa",
            "type": "SUBHEADING"
          },
          {
            "text": "Existe alguém diante de quem a verdade nunca ficará escondida para sempre.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "Leia: Deuteronômio 10:17-19",
        "blocks": [
          {
            "text": "Moisés está ensinando Israel sobre o Deus a quem o povo pertence.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus é apresentado como grande e poderoso. Mas sua grandeza não o torna distante das pessoas",
            "type": "PARAGRAPH"
          },
          {
            "text": "vulneráveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O texto diz que Ele não age com favoritismo e não aceita suborno. Depois fala do cuidado com órfãos, viúvas",
            "type": "PARAGRAPH"
          },
          {
            "text": "e estrangeiros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que isso revela",
            "type": "SUBHEADING"
          },
          {
            "text": "A justiça de Deus não é uma ideia fria. Ela aparece na maneira como Ele olha para pessoas",
            "type": "PARAGRAPH"
          },
          {
            "text": "reais.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "1. Deus não pode ser comprado",
        "blocks": [
          {
            "text": "Nos sistemas humanos, dinheiro pode abrir portas. Influência pode mudar decisões. Poder pode silenciar",
            "type": "PARAGRAPH"
          },
          {
            "text": "pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Com Deus isso não funciona.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não existe oferta capaz de comprar sua aprovação. Não existe posição social capaz de mudar a verdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "diante dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma verdade direta",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não vende justiça para quem oferece mais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso também significa que religião não funciona como suborno. Nenhuma prática religiosa transforma",
            "type": "PARAGRAPH"
          },
          {
            "text": "injustiça em justiça.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "2. Deus não mede o valor das pessoas pela posição social",
        "blocks": [
          {
            "text": "Deuteronômio chama atenção para pessoas que, naquele contexto, poderiam facilmente ficar desprotegidas:",
            "type": "PARAGRAPH"
          },
          {
            "text": "órfãos, viúvas e estrangeiros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não olha para elas como pessoas sem importância.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso revela",
            "type": "SUBHEADING"
          },
          {
            "text": "Quem é ignorado pelos homens não é invisível para Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "3. Deus sempre age corretamente",
        "blocks": [
          {
            "text": "Gênesis 18 registra uma pergunta feita por Abraão: “Não faria justiça o Juiz de toda a terra?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "A pergunta nasce de uma confiança: o Juiz de toda a terra precisa agir corretamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia mantém essa verdade. Deus não julga por aparência, não comete erros e não absolve o mal porque",
            "type": "PARAGRAPH"
          },
          {
            "text": "se confundiu com os fatos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "4. Deus vê até aquilo que ninguém mais viu",
        "blocks": [
          {
            "text": "Existem palavras ditas apenas entre duas pessoas, abusos escondidos, negócios desonestos, mentiras bem",
            "type": "PARAGRAPH"
          },
          {
            "text": "construídas, boas ações que ninguém reconheceu e dores que nunca foram contadas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Diante de Deus, nada disso desaparece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso pode assustar e consolar",
            "type": "SUBHEADING"
          },
          {
            "text": "A falta de testemunhas humanas não significa falta de conhecimento divino.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "1. Justiça significa que Deus sempre age corretamente",
        "blocks": [
          {
            "text": "Quando dizemos que Deus é justo, não queremos dizer simplesmente que, na maioria das vezes, Ele toma",
            "type": "PARAGRAPH"
          },
          {
            "text": "boas decisões.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia apresenta a justiça como parte de quem Deus é.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não precisa aprender a ser justo. Não passa por momentos de corrupção. Não perde o controle e depois",
            "type": "PARAGRAPH"
          },
          {
            "text": "se arrepende de ter sido injusto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso podemos confiar",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus nunca deixa de ser quem Ele é.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "2. A justiça de Deus é uma boa notícia para quem sofre",
        "blocks": [
          {
            "text": "Imagine um mundo em que o mal pudesse continuar para sempre sem qualquer resposta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O agressor nunca responderia. O corrupto sempre venceria. A mentira teria a mesma importância que a",
            "type": "PARAGRAPH"
          },
          {
            "text": "verdade. A vítima seria esquecida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não seria um mundo melhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Salmo 9 apresenta Deus como aquele que julga com justiça e também como refúgio para o oprimido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "As duas coisas caminham juntas",
            "type": "SUBHEADING"
          },
          {
            "text": "O Deus que julga o mal também acolhe quem foi esmagado por ele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "3. A justiça de Deus também olha para nós",
        "blocks": [
          {
            "text": "É muito fácil gostar da justiça quando pensamos apenas no erro dos outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 2 muda a direção do olhar. Paulo fala com pessoas capazes de apontar os erros alheios enquanto",
            "type": "PARAGRAPH"
          },
          {
            "text": "ignoravam os próprios.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A justiça de Deus nos impede de viver dizendo apenas: “Olha o pecado deles.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela também pergunta",
            "type": "PARAGRAPH"
          },
          {
            "text": "E o seu coração?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos condenar mentira e mentir. Condenar corrupção e ser desonestos em pequenas coisas. Condenar",
            "type": "PARAGRAPH"
          },
          {
            "text": "falta de amor e tratar nossa própria família com crueldade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "4. Deus não julga pelas etiquetas que usamos",
        "blocks": [
          {
            "text": "Romanos 2 mostra que possuir conhecimento religioso não nos coloca automaticamente acima de outras",
            "type": "PARAGRAPH"
          },
          {
            "text": "pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não olha apenas para o rótulo “cristão”, “membro da igreja” ou “líder”. Ele olha para a verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Um alerta importante",
            "type": "SUBHEADING"
          },
          {
            "text": "Título espiritual nunca transforma pecado em santidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "JUSTIÇA E MISERICÓRDIA NÃO SÃO INIMIGAS",
            "type": "SUBHEADING"
          },
          {
            "text": "Aqui surge uma pergunta importante: se Deus é justo, como pode perdoar quem pecou?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 3 nos ajuda a olhar para Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Na cruz, o pecado não é tratado como algo pequeno. Ao mesmo tempo, Deus oferece perdão ao pecador.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A justiça de Deus e sua graça aparecem juntas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O centro",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não precisa chamar o mal de bem para amar quem fez o mal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele pode confrontar o pecado e, ao mesmo tempo, oferecer reconciliação. É justamente por isso que a cruz",
            "type": "PARAGRAPH"
          },
          {
            "text": "ocupa lugar tão central no Evangelho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "Se Deus é justo, por que existe tanta injustiça?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa pergunta acompanha a humanidade há muito tempo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não responde dizendo que toda injustiça será corrigida imediatamente. Muitas pessoas sofrem sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "ver justiça completa durante a própria vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Vivemos em um mundo afetado pelo pecado. Mas isso não significa que Deus aprove aquilo que acontece",
            "type": "PARAGRAPH"
          },
          {
            "text": "nem que ficará em silêncio para sempre.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Duas responsabilidades",
            "type": "SUBHEADING"
          },
          {
            "text": "Confiar: Deus julgará com justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Agir: não usar a justiça futura de Deus como desculpa para ignorar injustiças presentes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Somos chamados a fazer o que é correto, proteger, denunciar quando necessário, defender quem está",
            "type": "PARAGRAPH"
          },
          {
            "text": "vulnerável e não participar do mal.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "items": [
              "Justiça começa na maneira como tratamos pessoas"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "É fácil discutir grandes injustiças do mundo. Mas a justiça também aparece nas pequenas escolhas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como você trata alguém que trabalha para você? Cumpre o que promete? Trata pessoas importantes melhor",
            "type": "PARAGRAPH"
          },
          {
            "text": "que aquelas que não podem lhe oferecer nada?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Estou tratando essa pessoa como eu gostaria de ser tratado diante de Deus?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Não pratique favoritismo"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Favoritismo acontece quando damos valor diferente às pessoas por aquilo que possuem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pessoa chega bem vestida e recebe atenção. Outra chega simples e é ignorada. Alguém importante",
            "type": "PARAGRAPH"
          },
          {
            "text": "recebe paciência. Quem não possui influência recebe desprezo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dignidade",
            "type": "SUBHEADING"
          },
          {
            "text": "A dignidade de alguém não aumenta quando ela fica rica nem diminui quando fica pobre.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Justiça também exige honestidade quando ninguém está olhando"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Talvez ninguém descubra. Mesmo assim importa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma nota fiscal. Uma mentira no trabalho. Uma informação escondida. Uma vantagem obtida de maneira",
            "type": "PARAGRAPH"
          },
          {
            "text": "desonesta. Um dinheiro que não era seu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Integridade",
            "type": "SUBHEADING"
          },
          {
            "text": "Quem vive diante de Deus aprende a fazer o certo mesmo quando nenhuma pessoa está",
            "type": "PARAGRAPH"
          },
          {
            "text": "observando.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Perdoar não significa impedir que exista justiça"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Às vezes pessoas machucadas ouvem: “Se você perdoou, então não deveria denunciar.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Isso não é uma regra bíblica.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão e responsabilidade não são a mesma coisa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você pode abrir mão da vingança pessoal e ainda buscar proteção e justiça adequada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muito importante",
            "type": "SUBHEADING"
          },
          {
            "text": "Se houve crime, denunciar pode ser necessário. Se existe uma vítima em perigo, protegê-la é",
            "type": "PARAGRAPH"
          },
          {
            "text": "necessário. A justiça não deixa de ser importante porque somos cristãos.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Não transforme desejo de justiça em desejo de vingança"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Quando somos feridos, podemos desejar não apenas que o mal seja interrompido, mas que a outra pessoa",
            "type": "PARAGRAPH"
          },
          {
            "text": "sofra porque queremos vê-la sofrer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É aí que justiça começa a se misturar com vingança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia nos ensina que o juízo final pertence a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Equilíbrio",
            "type": "SUBHEADING"
          },
          {
            "text": "Podemos buscar justiça, estabelecer limites, denunciar e proteger sem alimentar nosso coração",
            "type": "PARAGRAPH"
          },
          {
            "text": "com ódio.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus é justo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que Ele não é corrupto. Não pode ser comprado. Não pratica favoritismo. Não ignora quem",
            "type": "PARAGRAPH"
          },
          {
            "text": "sofre. Não perde fatos. Não é enganado por aparência religiosa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A justiça de Deus é uma advertência para quem deseja esconder o mal. Mas também é um profundo consolo",
            "type": "PARAGRAPH"
          },
          {
            "text": "para quem pensa que ninguém viu sua dor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E essa verdade chega até nossa vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conhecer o Deus justo nos chama a ser pessoas honestas, íntegras, imparciais, atentas aos vulneráveis e",
            "type": "PARAGRAPH"
          },
          {
            "text": "comprometidas com a verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "SUBHEADING"
          },
          {
            "text": "Não fazemos isso para nos tornarmos melhores que os outros. Fazemos porque pertencemos",
            "type": "SUBHEADING"
          },
          {
            "text": "ao Deus que ama aquilo que é justo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Porque Deus é justo, podemos confiar nele quando a justiça humana falha e também devemos",
            "type": "SUBHEADING"
          },
          {
            "text": "aprender a tratar pessoas com verdade, dignidade e imparcialidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Pense em seus relacionamentos mais comuns: família, trabalho, igreja, negócios e amizades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte a si mesmo: “Existe alguém que tenho tratado de maneira injusta porque possui menos poder do",
            "type": "PARAGRAPH"
          },
          {
            "text": "que eu?”",
            "type": "SUBHEADING"
          },
          {
            "text": "Pode ser alguém que você interrompe, ignora, paga mal, trata com impaciência ou julga pela aparência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se Deus lhe mostrar uma situação concreta, escolha uma atitude de correção ainda hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não fique apenas na culpa",
            "type": "SUBHEADING"
          },
          {
            "text": "Faça justiça onde você pode começar a fazer justiça.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Em que situações tenho mais dificuldade de confiar na justiça de Deus?",
              "Existe alguma injustiça sofrida que ainda domina meu coração?",
              "Tenho sido mais rápido para enxergar o erro dos outros do que o meu?",
              "Trato pessoas diferentes de acordo com aquilo que elas podem me oferecer?",
              "Existe alguma área escondida da minha vida em que preciso voltar à honestidade?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Em qual relacionamento ou situação Deus está me chamando a agir com mais justiça, verdade e",
            "type": "PARAGRAPH"
          },
          {
            "text": "integridade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, tu és justo e nunca ages com corrupção ou favoritismo. Obrigado porque nenhuma dor",
            "type": "SUBHEADING"
          },
          {
            "text": "fica escondida de ti e porque posso confiar que conheces toda a verdade. Examina também",
            "type": "SUBHEADING"
          },
          {
            "text": "meu coração. Mostra onde tenho sido injusto, desonesto ou parcial. Ensina-me a tratar cada",
            "type": "SUBHEADING"
          },
          {
            "text": "pessoa com dignidade, a defender quem precisa de proteção e a fazer o que é correto mesmo",
            "type": "SUBHEADING"
          },
          {
            "text": "quando ninguém estiver olhando. Quando eu sofrer injustiça, livra-me da vingança e ajuda-me",
            "type": "PARAGRAPH"
          },
          {
            "text": "a confiar em ti sem deixar de buscar aquilo que é certo. Que minha vida revele um pouco da tua",
            "type": "PARAGRAPH"
          },
          {
            "text": "justiça neste mundo. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Deuteronômio 32:4 - Todos os caminhos de Deus são justos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Miqueias 6:8 - Leia o chamado para praticar a justiça, amar a misericórdia e caminhar humildemente com",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Guarde essas passagens e volte a elas quando precisar tomar uma decisão difícil.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que Deuteronômio 10 revela sobre a maneira como Deus olha para pessoas vulneráveis?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que justiça e misericórdia não precisam ser inimigas?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que tipo de injustiça pequena e comum podemos deixar de normalizar em nossa família, igreja,",
            "type": "PARAGRAPH"
          },
          {
            "text": "trabalho ou comunidade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Conhecemos Deus como Criador. Depois como Santo. Agora vimos que Ele é Justo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas uma pergunta pode surgir: se Deus é santo e justo, e nós falhamos, há esperança para nós?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia responde revelando outra verdade profundamente bonita sobre Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Estudo 04 - Deus Misericordioso",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunta central: O que significa a misericórdia de Deus - e por que Ele continua se",
            "type": "SUBHEADING"
          },
          {
            "text": "aproximando de pessoas que não merecem sua bondade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Deuteronômio 10:17-19",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deuteronômio 32:4",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gênesis 18:22-33",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 9:7-10",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 89:14",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 2:1-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 3:21-26",
            "type": "PARAGRAPH"
          },
          {
            "text": "Miqueias 6:8",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-02-study-04",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“As misericórdias do Senhor são a causa de não sermos consumidos.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lamentações 3:22",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A misericórdia de Deus nos alcança quando não temos como exigir nada dele e nos ensina a",
            "type": "SUBHEADING"
          },
          {
            "text": "tratar outras pessoas com a mesma graça que recebemos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Êxodo 34:5-9",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: Salmo 103:8-14 | Lamentações 3:21-24 | Jonas 3:10-4:11 | Lucas 6:35-36 | Lucas",
            "type": "PARAGRAPH"
          },
          {
            "text": "15:11-24 | Efésios 2:1-5 | Tito 3:3-7",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Existe uma palavra muito usada na igreja: misericórdia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes dizemos: “Deus tenha misericórdia.” Outras vezes: “Foi pela misericórdia de Deus.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas o que isso realmente significa?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Misericórdia não é apenas sentir pena. Também não é Deus olhar para o pecado e dizer: “Não tem problema.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando a Bíblia fala da misericórdia de Deus, ela mostra algo muito mais profundo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus vê nossa necessidade, nossa fraqueza e nosso pecado. E, mesmo assim, age com compaixão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele poderia nos tratar apenas segundo aquilo que merecemos. Mas escolhe se aproximar, perdoar, sustentar,",
            "type": "PARAGRAPH"
          },
          {
            "text": "corrigir, esperar e restaurar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma verdade para começar",
            "type": "SUBHEADING"
          },
          {
            "text": "Misericórdia é Deus não desistindo facilmente de pessoas que precisam dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E talvez uma das coisas mais bonitas sobre conhecer Deus seja descobrir que sua santidade e sua justiça não",
            "type": "PARAGRAPH"
          },
          {
            "text": "o tornam frio. O Deus santo também é misericordioso.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "Leia: Êxodo 34:5-9",
        "blocks": [
          {
            "text": "Este texto acontece depois de um momento muito sério na história de Israel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O povo havia feito um bezerro de ouro. Enquanto Moisés estava no monte, Israel se voltou para a idolatria. A",
            "type": "PARAGRAPH"
          },
          {
            "text": "aliança havia sido quebrada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Era uma situação de pecado real. Não havia como fingir que nada tinha acontecido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mesmo assim, quando Deus se revela a Moisés, Ele declara algo sobre si mesmo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele é compassivo, misericordioso, paciente, grande em amor e fidelidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Observe o momento",
            "type": "SUBHEADING"
          },
          {
            "text": "Essa revelação acontece depois de uma grande falha do povo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "1. A misericórdia aparece diante de pessoas culpadas",
        "blocks": [
          {
            "text": "Israel não era inocente. O povo havia pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Portanto, quando Deus se apresenta como misericordioso, a mensagem não é: “Eles não fizeram nada",
            "type": "PARAGRAPH"
          },
          {
            "text": "errado.”",
            "type": "SUBHEADING"
          },
          {
            "text": "A misericórdia não apaga a verdade. Ela aparece justamente porque existe culpa e necessidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso confronta nosso orgulho",
            "type": "SUBHEADING"
          },
          {
            "text": "Só precisa de misericórdia quem não consegue se salvar pelo próprio mérito.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "2. Deus é paciente",
        "blocks": [
          {
            "text": "Êxodo 34 apresenta Deus como alguém que não explode de maneira descontrolada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que Ele nunca julga. Significa que sua ira não é impulsiva como muitas vezes é a nossa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele é paciente. Dá espaço para arrependimento. Adverte. Chama. Espera.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paciência não é aprovação",
            "type": "SUBHEADING"
          },
          {
            "text": "A paciência de Deus não significa que o pecado deixou de importar. Significa que Ele oferece",
            "type": "PARAGRAPH"
          },
          {
            "text": "oportunidade para mudança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "3. Misericórdia e verdade aparecem juntas",
        "blocks": [
          {
            "text": "O texto também fala da fidelidade de Deus. Isso significa que sua misericórdia não é instável.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não ama hoje e abandona amanhã sem motivo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ao mesmo tempo, Deus não se torna mentiroso para ser misericordioso. Ele não chama o mal de bem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "As duas coisas caminham juntas",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus pode perdoar sem precisar fingir que o pecado nunca existiu.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "4. Moisés responde com adoração e pedido de presença",
        "blocks": [
          {
            "text": "Depois de ouvir quem Deus é, Moisés se inclina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não transforma a misericórdia de Deus em desculpa para continuar errando. Ele reconhece a necessidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "da presença de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem entende misericórdia",
            "type": "SUBHEADING"
          },
          {
            "text": "Não diz: “Então posso viver de qualquer jeito.” Diz: “Senhor, fica conosco.”",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "1. Misericórdia não é fraqueza",
        "blocks": [
          {
            "text": "Às vezes pensamos que uma pessoa misericordiosa é alguém que nunca confronta nada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a Bíblia não apresenta Deus assim. Deus confronta, corrige, disciplina, julga e ainda assim é",
            "type": "PARAGRAPH"
          },
          {
            "text": "misericordioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por quê? Porque misericórdia não significa ausência de justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma definição prática",
            "type": "SUBHEADING"
          },
          {
            "text": "A misericórdia não elimina a verdade; oferece esperança depois que a verdade nos alcança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "2. Misericórdia é para quem reconhece que precisa",
        "blocks": [
          {
            "text": "É difícil receber misericórdia quando estamos ocupados demais tentando provar que nunca erramos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem se justifica o tempo todo não consegue admitir necessidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O filho pródigo de Lucas 15 volta para casa porque finalmente percebe sua condição.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não volta exigindo direitos. Volta quebrantado. E encontra um pai que corre para recebê-lo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma chave",
            "type": "SUBHEADING"
          },
          {
            "text": "A misericórdia de Deus é preciosa para quem parou de fingir que consegue viver sem ela.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "3. O Salmo 103 mostra um Deus que conhece nossa fragilidade",
        "blocks": [
          {
            "text": "O Salmo 103 diz que Deus conhece nossa estrutura. Ele sabe que somos pó.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que Deus trate pecado como algo irrelevante.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas significa que Ele conhece nossas limitações, sabe onde somos frágeis e conhece o coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus conhece profundamente",
            "type": "SUBHEADING"
          },
          {
            "text": "Ele não olha para nós com a superficialidade com que muitas vezes olhamos uns para os outros.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "4. A misericórdia de Deus aparece de maneira clara em Cristo",
        "blocks": [
          {
            "text": "Efésios 2 descreve nossa condição de pecado. Depois vem uma expressão poderosa: “Mas Deus...”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo diz que Deus é rico em misericórdia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não fomos alcançados porque nossa vida estava perfeita. Fomos alcançados quando precisávamos de vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Jesus, a misericórdia de Deus ganha rosto. Ele se aproxima de pecadores, doentes, desprezados, cansados",
            "type": "PARAGRAPH"
          },
          {
            "text": "e culpados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas não para nos deixar iguais",
            "type": "SUBHEADING"
          },
          {
            "text": "A misericórdia de Deus não nos deixa onde nos encontrou.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "5. Tito mostra que salvação não é prêmio para os melhores",
        "blocks": [
          {
            "text": "Tito 3 fala de uma vida marcada por erros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois diz que Deus nos salvou não por obras de justiça feitas por nós, mas segundo sua misericórdia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho é mais profundo",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus salva pecadores que dependem de sua graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "SUBHEADING"
          },
          {
            "text": "Misericórdia não é passar a mão sobre o erro",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma mãe pode amar um filho e ainda corrigir. Da mesma forma, a misericórdia de Deus não significa: “Faça o",
            "type": "PARAGRAPH"
          },
          {
            "text": "que quiser.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Quando Deus perdoa, Ele também chama para mudança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Misericórdia",
            "type": "SUBHEADING"
          },
          {
            "text": "Não é permissão para continuar destruindo a própria vida. É oportunidade de voltar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Misericórdia também não significa permanecer em situações de abuso",
            "type": "SUBHEADING"
          },
          {
            "text": "Ser misericordioso não significa aceitar violência, permanecer em perigo ou impedir que uma pessoa",
            "type": "PARAGRAPH"
          },
          {
            "text": "responda por seus atos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão, proteção e responsabilidade podem caminhar juntos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muito importante",
            "type": "SUBHEADING"
          },
          {
            "text": "Misericórdia nunca deve ser usada para proteger quem pratica o mal e silenciar quem sofre.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "Por que Jonas ficou irritado com a misericórdia de Deus?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jonas conhecia o caráter de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando Nínive se arrependeu e Deus não trouxe o juízo anunciado naquele momento, Jonas ficou irritado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele queria ver seus inimigos punidos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema não era falta de conhecimento. Jonas sabia que Deus era misericordioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema era que ele gostava da misericórdia quando era para ele, mas não gostava quando alcançava",
            "type": "PARAGRAPH"
          },
          {
            "text": "outras pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Um confronto para nós",
            "type": "SUBHEADING"
          },
          {
            "text": "Quem vive da misericórdia de Deus precisa aprender a não tratar a misericórdia como",
            "type": "SUBHEADING"
          },
          {
            "text": "propriedade particular.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "items": [
              "Você pode parar de esconder sua necessidade"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Algumas pessoas passam anos tentando parecer fortes diante de Deus. Como se Deus não soubesse.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Ele já sabe onde você falhou, aquilo de que se envergonha e onde caiu novamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A pergunta não é se Deus descobriu",
            "type": "SUBHEADING"
          },
          {
            "text": "Você vai continuar escondendo ou vai voltar para Ele?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Arrependimento não precisa terminar em desespero"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Existe diferença entre arrependimento e condenação sem saída.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O arrependimento diz: “Errei. Preciso voltar.”",
            "type": "SUBHEADING"
          },
          {
            "text": "O desespero diz: “Errei. Não existe mais caminho.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "A misericórdia chama",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não mostra nosso pecado apenas para nos esmagar, mas para nos levar de volta a Ele.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Quem recebe misericórdia aprende a oferecer misericórdia"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Jesus diz em Lucas 6: sejam misericordiosos. Por quê? Porque o Pai é misericordioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa aprovar tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas significa que não precisamos sentir prazer na queda de ninguém. Podemos corrigir sem humilhar,",
            "type": "PARAGRAPH"
          },
          {
            "text": "confrontar sem destruir, perdoar sem fingir e estabelecer limites sem ódio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Misericórdia é",
            "type": "SUBHEADING"
          },
          {
            "text": "Verdade sem crueldade.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Não trate alguém apenas pelo pior momento da vida dela"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Nós temos facilidade para definir pessoas pelos erros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Deus trabalha com histórias em andamento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pedro negou Jesus. Davi pecou gravemente. Paulo perseguiu cristãos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não diminui a gravidade do que fizeram. Significa lembrar que a misericórdia de Deus pode escrever",
            "type": "PARAGRAPH"
          },
          {
            "text": "capítulos depois da queda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma falha",
            "type": "SUBHEADING"
          },
          {
            "text": "Pode ser parte da história de alguém sem precisar ser a última página.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Misericórdia também muda a maneira como olhamos para nós mesmos"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Algumas pessoas são muito misericordiosas com todos, menos consigo mesmas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Carregam pecados já confessados como se precisassem pagar emocionalmente pelo resto da vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas autopunição não compra perdão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receber também é necessário",
            "type": "SUBHEADING"
          },
          {
            "text": "Misericórdia também significa aprender a receber aquilo que Deus oferece.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus é misericordioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele vê nossa necessidade e não se aproxima de nós apenas quando estamos fortes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sua misericórdia aparece justamente onde há fraqueza, culpa e necessidade de restauração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas ela não chama o pecado de bem. Ela confronta e oferece caminho de volta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Cristo, essa verdade se torna ainda mais clara. Deus se aproxima de pecadores para perdoar e",
            "type": "PARAGRAPH"
          },
          {
            "text": "transformar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "SUBHEADING"
          },
          {
            "text": "Conhecer o Deus misericordioso significa descobrir que nossa falha não precisa nos empurrar",
            "type": "PARAGRAPH"
          },
          {
            "text": "para longe dele; pode ser justamente o momento de voltar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Quem reconhece que vive da misericórdia de Deus aprende a se aproximar dele com",
            "type": "SUBHEADING"
          },
          {
            "text": "sinceridade e a tratar os outros com menos dureza e mais graça.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Pense em duas pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A primeira é você. A segunda é alguém que errou com você.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte: “Estou recusando receber a misericórdia de Deus por causa da culpa?”",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois: “Estou recusando oferecer qualquer misericórdia a alguém porque quero vê-lo pagar?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não tente resolver tudo em um único momento. Dê um primeiro passo: confessar, pedir perdão, aceitar o",
            "type": "PARAGRAPH"
          },
          {
            "text": "perdão de Deus, parar de alimentar uma vingança, orar por alguém ou estabelecer um limite saudável sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "ódio.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho facilidade ou dificuldade de acreditar que Deus ainda se aproxima de mim depois que erro?",
              "Existe alguma culpa antiga que continuo tentando pagar sozinho?",
              "Tenho usado misericórdia como desculpa para não mudar?",
              "Existe alguém que reduzi apenas ao pior erro que cometeu?",
              "A misericórdia de Deus está me tornando mais humilde e mais paciente com pessoas?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Em que área da minha vida eu mais preciso receber ou oferecer misericórdia hoje?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, obrigado porque és misericordioso. Tu conheces minhas falhas, minhas fraquezas e",
            "type": "SUBHEADING"
          },
          {
            "text": "aquilo que tento esconder. Não quero usar tua misericórdia como desculpa para continuar no",
            "type": "SUBHEADING"
          },
          {
            "text": "erro, mas também não quero fugir de ti por causa da vergonha. Ensina-me a voltar quando eu",
            "type": "SUBHEADING"
          },
          {
            "text": "cair, a confiar no teu perdão e a permitir que tua graça transforme minha vida. Dá-me também",
            "type": "PARAGRAPH"
          },
          {
            "text": "um coração misericordioso. Ajuda-me a corrigir sem crueldade, perdoar sem fingimento e",
            "type": "SUBHEADING"
          },
          {
            "text": "estabelecer limites sem ódio. Que a misericórdia que recebo de ti também apareça na forma",
            "type": "SUBHEADING"
          },
          {
            "text": "como trato outras pessoas. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Lamentações 3:22-23 - Leia a declaração sobre as misericórdias de Deus que se renovam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 103:8 - Observe como misericórdia e paciência aparecem juntas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Guarde essas passagens para revisitá-las nos dias em que a culpa ou o desânimo tentarem falar",
            "type": "PARAGRAPH"
          },
          {
            "text": "mais alto.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que mais chama atenção na maneira como Deus se apresenta em Êxodo 34?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre misericórdia e simplesmente ignorar o pecado?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como podemos demonstrar misericórdia sem deixar de proteger pessoas e agir com verdade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Já vimos que Deus é Criador, Santo, Justo e Misericordioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas surge outra pergunta importante: podemos confiar em Deus não apenas hoje, mas amanhã? Ele muda de",
            "type": "PARAGRAPH"
          },
          {
            "text": "palavra? Pode deixar de cumprir aquilo que prometeu?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Estudo 05 - Deus Fiel",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunta central: O que significa dizer que Deus é fiel - e como confiar nele quando as",
            "type": "SUBHEADING"
          },
          {
            "text": "circunstâncias parecem contradizer suas promessas?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Êxodo 34:5-9",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 103:8-14",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lamentações 3:21-24",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jonas 3:10-4:11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 6:35-36",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 15:11-24",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 2:1-5",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tito 3:3-7",
            "type": "PARAGRAPH"
          }
        ],
        "order": 25,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-02-study-05",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Fiel é o que vos chama, o qual também o fará.”",
            "type": "SUBHEADING"
          },
          {
            "text": "1 Tessalonicenses 5:24",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A fidelidade de Deus nos ensina a confiar não apenas quando entendemos o caminho, mas",
            "type": "SUBHEADING"
          },
          {
            "text": "também quando precisamos caminhar sustentados por quem Ele é.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Deuteronômio 7:6-9",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: Números 23:19 | Josué 21:43-45 | Salmo 89:1-8 | Lamentações 3:21-24 | 2 Timóteo",
            "type": "PARAGRAPH"
          },
          {
            "text": "2:11-13 | Hebreus 10:23 | 1 Coríntios 1:9",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Confiar é fácil quando tudo está acontecendo como esperávamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oramos. A resposta vem. Precisamos de uma porta. Ela se abre. Esperamos uma mudança. Ela acontece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nesses momentos, dizer “Deus é fiel” parece simples.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas e quando a oração continua sem resposta? Quando uma promessa parece distante? Quando o",
            "type": "SUBHEADING"
          },
          {
            "text": "sofrimento dura mais do que imaginávamos? Quando fizemos o que parecia certo e mesmo assim as coisas",
            "type": "PARAGRAPH"
          },
          {
            "text": "deram errado?",
            "type": "PARAGRAPH"
          },
          {
            "text": "É justamente nesses momentos que a palavra fidelidade começa a ganhar profundidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fidelidade não significa",
            "type": "SUBHEADING"
          },
          {
            "text": "“Deus sempre fará exatamente aquilo que eu imaginei.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa algo maior",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus nunca deixará de ser quem Ele é.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não mente. Não abandona sua Palavra. Não esquece aquilo que prometeu. Não muda de caráter",
            "type": "PARAGRAPH"
          },
          {
            "text": "conforme nosso dia muda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso, conhecer o Deus fiel não significa viver sem perguntas. Significa aprender onde apoiar nossa",
            "type": "PARAGRAPH"
          },
          {
            "text": "confiança enquanto ainda existem perguntas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "Leia: Deuteronômio 7:6-9",
        "blocks": [
          {
            "text": "Moisés está falando com Israel. O povo está prestes a entrar na terra prometida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E ele os lembra de algo fundamental: Deus é o Deus fiel. Ele guarda sua aliança, mantém seu amor e cumpre",
            "type": "PARAGRAPH"
          },
          {
            "text": "aquilo que prometeu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Moisés também deixa claro que Israel não foi escolhido porque era o povo mais numeroso ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "impressionante. Tudo começa com a iniciativa de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "1. A fidelidade de Deus nasce do caráter dele",
        "blocks": [
          {
            "text": "Quando alguém nos promete alguma coisa, imediatamente pensamos: “Será que essa pessoa vai cumprir?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Porque pessoas mudam, esquecem, desistem, mentem, perdem interesse ou descobrem que não conseguem",
            "type": "PARAGRAPH"
          },
          {
            "text": "fazer aquilo que prometeram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Com Deus é diferente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não apresenta sua fidelidade como um comportamento ocasional. Ela faz parte de quem Ele é.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma verdade central",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não apenas faz coisas fiéis. Ele é fiel.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "2. Deus não escolheu Israel porque precisava dele",
        "blocks": [
          {
            "text": "Deuteronômio lembra ao povo que sua relação com Deus não começou porque Israel era extraordinário.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus tomou a iniciativa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se a fidelidade de Deus dependesse de nossa perfeição, nunca teríamos segurança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Israel falhou muitas vezes. Mesmo assim, Deus continuou conduzindo sua história.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que a desobediência não tivesse consequências. Teve.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas uma coisa não mudou",
            "type": "SUBHEADING"
          },
          {
            "text": "Nossa instabilidade não muda o caráter de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "3. Deus leva suas promessas a sério",
        "blocks": [
          {
            "text": "Mais tarde, Josué 21 olha para trás e diz que nenhuma das boas promessas de Deus a Israel falhou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que todas as promessas bíblicas tenham sido dadas a todas as pessoas da mesma maneira.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Precisamos respeitar para quem cada promessa foi feita.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que o texto mostra sobre Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "Aquilo que Ele realmente promete, Ele leva a sério.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "4. O tempo de Deus nem sempre é o nosso tempo",
        "blocks": [
          {
            "text": "Esse é um dos pontos mais difíceis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma promessa pode ser verdadeira e ainda assim não acontecer imediatamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Abraão recebeu promessas e esperou. José atravessou anos que pareciam contrários aos sonhos que havia",
            "type": "PARAGRAPH"
          },
          {
            "text": "recebido. A esperança do Messias atravessou gerações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperar não é o mesmo que ser esquecido",
            "type": "SUBHEADING"
          },
          {
            "text": "Demora não é a mesma coisa que esquecimento.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "1. Deus ser fiel não significa que tudo acontecerá como queremos",
        "blocks": [
          {
            "text": "Essa distinção é essencial.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes usamos a frase “Deus é fiel” como se significasse: “Tenho certeza de que Deus fará exatamente",
            "type": "PARAGRAPH"
          },
          {
            "text": "aquilo que pedi.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Mas a Bíblia não nos autoriza a transformar desejos pessoais em promessas divinas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Eu posso desejar muito alguma coisa, orar sinceramente e acreditar que seria bom - e mesmo assim Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "nunca ter prometido aquilo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta necessária",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus realmente prometeu isso ou eu estou esperando algo que desejo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "SUBHEADING"
          },
          {
            "text": "Existem frases muito repetidas entre cristãos que podem soar como promessa bíblica, mesmo quando não",
            "type": "PARAGRAPH"
          },
          {
            "text": "são.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por exemplo: “Se você tiver fé suficiente, tudo dará certo.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Ou: “Deus nunca permitirá que um cristão perca aquilo que ama.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Ou ainda: “Se você fizer tudo corretamente, nunca enfrentará grandes sofrimentos.”",
            "type": "SUBHEADING"
          },
          {
            "text": "A Bíblia não promete essas coisas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristãos fiéis sofreram, perderam, foram perseguidos, ficaram doentes e morreram confiando em Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fidelidade de Deus não significa ausência de sofrimento",
            "type": "SUBHEADING"
          },
          {
            "text": "Significa que nem o sofrimento consegue transformar Deus em alguém infiel.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "2. Às vezes Deus cumpre sua Palavra de uma maneira diferente da que imaginávamos",
        "blocks": [
          {
            "text": "Muitos esperavam o Messias. Mas nem todos esperavam um Messias que morreria numa cruz.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus cumpriu as promessas de Deus, mas muitas expectativas humanas precisaram ser corrigidas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos estar corretos em confiar em Deus e ainda errados sobre como esperamos que Ele aja.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé não é",
            "type": "SUBHEADING"
          },
          {
            "text": "Entregar a Deus um roteiro e confiar que Ele o seguirá. Fé é confiar nele enquanto aprendemos",
            "type": "PARAGRAPH"
          },
          {
            "text": "a seguir o caminho dele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "3. Jesus é uma grande demonstração da fidelidade de Deus",
        "blocks": [
          {
            "text": "Ao longo do Antigo Testamento, Deus promete redenção, um descendente de Abraão, um Rei ligado à casa",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Davi, uma nova aliança e salvação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando chegamos ao Novo Testamento, Jesus aparece dentro dessa longa história.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fidelidade divina não é apenas uma ideia. Ela atravessa séculos de história.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo nos mostra",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não esqueceu sua promessa de redenção.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "4. A fidelidade de Deus permanece mesmo quando somos fracos",
        "blocks": [
          {
            "text": "2 Timóteo 2 contém uma frase muito conhecida: mesmo que sejamos infiéis, Ele permanece fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas precisamos entender isso com cuidado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O texto não está dizendo: “Podemos abandonar Deus deliberadamente e nada importa.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Os versos ao redor também falam seriamente sobre negar Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ponto é que Deus não muda de caráter para acompanhar nossa instabilidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus permanece fiel",
            "type": "SUBHEADING"
          },
          {
            "text": "Às suas promessas, às suas advertências e à sua verdade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "5. A fidelidade de Deus pode sustentar nossa fé quando nossas emoções mudam",
        "blocks": [
          {
            "text": "Existem dias em que sentimos Deus muito perto. Outros em que não sentimos quase nada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas nossas emoções não são um medidor perfeito da presença ou da fidelidade de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma nuvem pode esconder o Sol dos nossos olhos. Isso não significa que o Sol deixou de existir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Do mesmo modo",
            "type": "SUBHEADING"
          },
          {
            "text": "Não sentir não significa necessariamente que Deus deixou de agir.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "Deus muda de ideia?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Alguns textos bíblicos dizem que Deus não muda nem mente. Outros descrevem Deus mudando uma ação",
            "type": "PARAGRAPH"
          },
          {
            "text": "anunciada diante da resposta humana.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como entender isso? Precisamos observar o contexto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando a Bíblia ensina que Deus não muda, o foco está em seu caráter: Ele não se torna mentiroso, não",
            "type": "PARAGRAPH"
          },
          {
            "text": "deixa de ser santo, justo ou fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em outros textos, a linguagem mostra Deus respondendo de maneira real às ações humanas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Um exemplo é Nínive: o juízo é anunciado, o povo se arrepende e Deus não traz naquele momento a",
            "type": "PARAGRAPH"
          },
          {
            "text": "destruição anunciada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que Deus descobriu que estava errado. Revela que seus avisos também podem ter como",
            "type": "PARAGRAPH"
          },
          {
            "text": "objetivo chamar pessoas ao arrependimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos afirmar com segurança",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não é instável em seu caráter, mas se relaciona de maneira verdadeira com pessoas",
            "type": "PARAGRAPH"
          },
          {
            "text": "dentro da história.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "items": [
              "Podemos aprender a esperar sem transformar espera em abandono"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Esperar dói, principalmente quando não sabemos quanto tempo falta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a espera bíblica não é cruzar os braços e desistir. É continuar caminhando, orando, obedecendo,",
            "type": "PARAGRAPH"
          },
          {
            "text": "trabalhando e confiando.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lamentações 3 nasceu em um ambiente de profunda dor. Mesmo assim, o escritor se lembra da fidelidade de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus dentro da dor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança dentro da dor",
            "type": "SUBHEADING"
          },
          {
            "text": "As misericórdias de Deus se renovam. Sua fidelidade continua grande.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Não precisamos fingir que estamos bem para confiar"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "A Bíblia possui orações cheias de perguntas: “Até quando?”, “Por quê?”, “Onde estás?”",
            "type": "SUBHEADING"
          },
          {
            "text": "Isso significa que confiança não exige esconder sentimentos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos dizer: “Senhor, eu não entendo.” E ainda continuar dizendo: “Mas eu escolho confiar em ti.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé madura",
            "type": "SUBHEADING"
          },
          {
            "text": "Não é ausência de perguntas. É saber para onde levar as perguntas.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Quem confia no Deus fiel deve aprender a ser fiel também"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Se Deus é fiel, conhecê-lo começa a mudar nosso caráter.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cumprir o que prometemos. Falar a verdade. Honrar compromissos. Permanecer presentes quando alguém",
            "type": "PARAGRAPH"
          },
          {
            "text": "precisa. Não abandonar pessoas por conveniência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fidelidade aparece no cotidiano",
            "type": "SUBHEADING"
          },
          {
            "text": "Ela também é construída nas pequenas escolhas que ninguém aplaude.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Não faça promessas em nome de Deus que Ele não fez"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Às vezes, querendo consolar alguém, afirmamos: “Deus me mostrou que isso vai acontecer.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Ou: “Tenho certeza de que Deus vai curar.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Podemos orar, esperar e crer que Deus pode agir. Mas não devemos apresentar nossa impressão como",
            "type": "PARAGRAPH"
          },
          {
            "text": "promessa divina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma frase mais segura e verdadeira",
            "type": "SUBHEADING"
          },
          {
            "text": "Não sei exatamente como Deus vai agir, mas podemos confiar que Ele continuará sendo Deus.",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Quando você não entender o caminho, volte ao caráter de Deus"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Existem momentos em que não teremos respostas completas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que essa oração não foi respondida como esperávamos? Por que aquela pessoa morreu? Por que a porta",
            "type": "PARAGRAPH"
          },
          {
            "text": "fechou?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem sempre teremos explicações nesta vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Talvez a pergunta precise mudar",
            "type": "SUBHEADING"
          },
          {
            "text": "Conheço o suficiente sobre Deus para continuar caminhando com Ele mesmo sem entender",
            "type": "PARAGRAPH"
          },
          {
            "text": "tudo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus é fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não mente, não esquece sua Palavra e não muda de caráter conforme as circunstâncias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas sua fidelidade não significa que Ele executará todos os nossos planos. Significa que podemos confiar",
            "type": "PARAGRAPH"
          },
          {
            "text": "naquilo que realmente prometeu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes veremos o cumprimento rapidamente. Outras vezes teremos de esperar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E existem promessas cuja plenitude está ligada ao futuro que Deus ainda realizará.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma âncora para a espera",
            "type": "SUBHEADING"
          },
          {
            "text": "A fidelidade de Deus é uma âncora para os dias em que ainda não conseguimos enxergar a",
            "type": "PARAGRAPH"
          },
          {
            "text": "chegada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Quando não conseguimos entender o que Deus está fazendo, podemos continuar confiando",
            "type": "SUBHEADING"
          },
          {
            "text": "em quem Ele é, porque sua fidelidade é maior que nossa visão limitada das circunstâncias.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Pense em uma situação pela qual você está esperando.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pode ser uma resposta, uma mudança, uma cura, uma direção, uma reconciliação ou uma porta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Agora separe duas coisas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta 1",
            "type": "SUBHEADING"
          },
          {
            "text": "O que Deus realmente prometeu?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta 2",
            "type": "SUBHEADING"
          },
          {
            "text": "O que eu apenas desejo que aconteça?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore sobre essa diferença. Entregue seu desejo a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E escolha uma verdade bíblica na qual você possa descansar mesmo que a resposta não aconteça exatamente",
            "type": "PARAGRAPH"
          },
          {
            "text": "como imaginou.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho confundido meus desejos com promessas de Deus?",
              "Em qual área da minha vida esperar tem sido mais difícil?",
              "Minha confiança em Deus depende de tudo acontecer como planejei?",
              "Tenho conseguido levar minhas dúvidas sinceramente a Deus?",
              "Minha própria vida tem demonstrado fidelidade nos pequenos compromissos?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que situação ainda não compreendo, mas preciso colocar novamente nas mãos do Deus fiel?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, tu és fiel. Nem sempre compreendo teus caminhos e muitas vezes minha confiança",
            "type": "SUBHEADING"
          },
          {
            "text": "enfraquece quando as coisas não acontecem no tempo que desejo. Ensina-me a distinguir tuas",
            "type": "SUBHEADING"
          },
          {
            "text": "promessas das minhas expectativas. Quando eu tiver de esperar, sustenta meu coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando eu não entender, ajuda-me a permanecer perto de ti. Perdoa-me quando tentei falar",
            "type": "SUBHEADING"
          },
          {
            "text": "em teu nome aquilo que tu não disseste e faz de mim também uma pessoa fiel, verdadeira e",
            "type": "SUBHEADING"
          },
          {
            "text": "confiável. Que minha esperança não dependa apenas do que meus olhos veem, mas de quem",
            "type": "PARAGRAPH"
          },
          {
            "text": "tu és. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "1 Tessalonicenses 5:24 - Fiel é aquele que chama.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 10:23 - Observe o motivo pelo qual somos chamados a permanecer firmes na esperança: quem",
            "type": "PARAGRAPH"
          },
          {
            "text": "prometeu é fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Guarde essas passagens para os dias em que esperar parecer mais difícil.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que Deuteronômio 7 ensina sobre a relação entre a fidelidade de Deus e sua aliança?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre confiar numa promessa de Deus e transformar um desejo pessoal em",
            "type": "PARAGRAPH"
          },
          {
            "text": "promessa?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como podemos demonstrar fidelidade a Deus e às pessoas nas pequenas escolhas desta",
            "type": "PARAGRAPH"
          },
          {
            "text": "semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Até aqui conhecemos Deus como Criador, Santo, Justo, Misericordioso e Fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas surge uma questão fundamental: como sabemos essas coisas sobre Ele? De onde vem nosso",
            "type": "SUBHEADING"
          },
          {
            "text": "conhecimento de Deus? Podemos descobrir tudo apenas olhando para a natureza? Deus realmente se",
            "type": "PARAGRAPH"
          },
          {
            "text": "comunica conosco?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Estudo 06 - Deus que se revela",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunta central: Como podemos conhecer Deus - e de que maneira Ele decidiu se dar a",
            "type": "SUBHEADING"
          },
          {
            "text": "conhecer à humanidade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Deuteronômio 7:6-9",
            "type": "PARAGRAPH"
          },
          {
            "text": "Números 23:19",
            "type": "PARAGRAPH"
          },
          {
            "text": "Josué 21:43-45",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 89:1-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lamentações 3:21-24",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Timóteo 2:11-13",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 10:23",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 1:9",
            "type": "SUBHEADING"
          },
          {
            "text": "1 Tessalonicenses 5:24",
            "type": "PARAGRAPH"
          }
        ],
        "order": 25,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-02-study-06",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Havendo Deus, antigamente, falado muitas vezes e de muitas maneiras aos pais, pelos",
            "type": "SUBHEADING"
          },
          {
            "text": "profetas, a nós falou-nos, nestes últimos dias, pelo Filho.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 1:1-2",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Conhecer Deus começa menos com nossas suposições sobre Ele e mais com atenção à maneira",
            "type": "SUBHEADING"
          },
          {
            "text": "como Ele decidiu se revelar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Hebreus 1:1-3",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: Salmo 19:1-4 | Romanos 1:19-20 | João 1:14-18 | João 14:8-11 | 2 Timóteo 3:14-17 |",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deuteronômio 29:29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Todos nós formamos ideias sobre Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas vêm da família. Outras da igreja, da cultura, de experiências boas ou ruins e até de frases que",
            "type": "PARAGRAPH"
          },
          {
            "text": "ouvimos desde pequenos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas existe uma pergunta mais importante do que “Como eu imagino Deus?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta melhor",
            "type": "SUBHEADING"
          },
          {
            "text": "Como Deus decidiu se dar a conhecer?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia apresenta um Deus que não permaneceu escondido em silêncio absoluto. Ele criou, falou, agiu,",
            "type": "PARAGRAPH"
          },
          {
            "text": "chamou pessoas, fez promessas, revelou sua vontade e entrou na história em Jesus Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que conhecer Deus não é um exercício de imaginação espiritual. É uma resposta à iniciativa",
            "type": "PARAGRAPH"
          },
          {
            "text": "dele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "LEIA: Hebreus 1:1-3",
        "blocks": [
          {
            "text": "Hebreus começa lembrando que Deus falou. Ele falou em diferentes momentos da história e por diferentes",
            "type": "PARAGRAPH"
          },
          {
            "text": "meios. Depois o texto aponta para algo ainda maior: Deus falou por meio do Filho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ponto de partida",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus tomou a iniciativa de se revelar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 1. Deus fala",
        "blocks": [
          {
            "text": "A Bíblia não apresenta Deus como uma força silenciosa que precisamos decifrar sozinhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele chamou Abraão, falou com Moisés, enviou profetas, fez promessas, corrigiu seu povo, consolou e",
            "type": "PARAGRAPH"
          },
          {
            "text": "advertiu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conhecer Deus é possível",
            "type": "SUBHEADING"
          },
          {
            "text": "Porque Ele quis ser conhecido.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 2. A criação revela algo sobre o Criador",
        "blocks": [
          {
            "text": "O Salmo 19 diz que os céus proclamam a glória de Deus. Romanos 1 afirma que aspectos do poder e da",
            "type": "PARAGRAPH"
          },
          {
            "text": "grandeza do Criador podem ser percebidos por meio das coisas criadas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma criação tão ampla, bela e ordenada nos convida a levantar os olhos para além de nós mesmos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A criação aponta",
            "type": "SUBHEADING"
          },
          {
            "text": "Ela pode nos mostrar que existe um Criador poderoso, mas não conta sozinha toda a história da",
            "type": "PARAGRAPH"
          },
          {
            "text": "salvação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 3. Deus se revela também na história",
        "blocks": [
          {
            "text": "A fé bíblica não é construída apenas sobre ideias abstratas. Deus age na história: chama um povo, liberta",
            "type": "PARAGRAPH"
          },
          {
            "text": "Israel, firma alianças, envia profetas e cumpre promessas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia lembra acontecimentos",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não se revela apenas por conceitos sobre Ele, mas também por aquilo que fez.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 4. Em Jesus, a revelação chega ao centro",
        "blocks": [
          {
            "text": "Hebreus diz que Deus falou por meio do Filho. João afirma que o Filho tornou Deus conhecido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não é apenas mais uma pessoa falando sobre Deus. O Novo Testamento o apresenta como aquele que",
            "type": "PARAGRAPH"
          },
          {
            "text": "revela o Pai de maneira única.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso Jesus é indispensável",
            "type": "SUBHEADING"
          },
          {
            "text": "Se queremos conhecer o Deus revelado no Novo Testamento, não podemos contornar Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 1. A natureza revela algo, mas não revela tudo",
        "blocks": [
          {
            "text": "Olhar para o céu pode despertar reverência. Observar a vida pode revelar ordem, grandeza e dependência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas ninguém descobriria apenas observando uma montanha que Jesus morreu e ressuscitou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos resumir assim",
            "type": "SUBHEADING"
          },
          {
            "text": "A criação aponta para o Criador. A Palavra conta sua história. Cristo revela de maneira decisiva",
            "type": "PARAGRAPH"
          },
          {
            "text": "quem Deus é e o que Ele fez para nos salvar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 2. Não saberemos tudo sobre Deus",
        "blocks": [
          {
            "text": "Deuteronômio 29:29 lembra que existem coisas que pertencem a Deus e coisas que Ele nos revelou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus é maior que nossa capacidade de compreensão. Mas aquilo que Ele revelou é suficiente para",
            "type": "PARAGRAPH"
          },
          {
            "text": "conhecê-lo de modo verdadeiro e aprender a viver diante dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Humildade também faz parte da fé",
            "type": "SUBHEADING"
          },
          {
            "text": "Não precisamos preencher com imaginação aquilo que Deus não decidiu explicar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "CONECTE 3. As Escrituras nos ajudam a reconhecer a verdade",
        "blocks": [
          {
            "text": "2 Timóteo 3 fala das Escrituras como úteis para ensinar, corrigir e formar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso nos protege de uma espiritualidade governada apenas por sentimentos. Sentimentos são reais, mas",
            "type": "PARAGRAPH"
          },
          {
            "text": "podem mudar. Impressões podem estar erradas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma regra segura",
            "type": "SUBHEADING"
          },
          {
            "text": "Nenhuma impressão pessoal deve receber mais autoridade do que a Palavra de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 4. O Espírito Santo não nos leva para longe de Cristo",
        "blocks": [
          {
            "text": "Jesus ensinou que o Espírito Santo lembraria e ensinaria aos discípulos aquilo que Ele havia dito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Espírito não compete com Cristo. Ele conduz o povo de Deus na verdade e glorifica o Filho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não se contradiz",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma suposta experiência espiritual que contradiz claramente o ensino de Cristo precisa ser",
            "type": "PARAGRAPH"
          },
          {
            "text": "questionada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "SUBHEADING"
          },
          {
            "text": "Nem toda frase sobre Deus vem de Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma frase pode soar bonita, emocionante e religiosa e ainda assim não ser bíblica.",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Deus só ajuda quem se ajuda.” “Se aconteceu, era porque Deus queria exatamente assim.” “Se você tiver fé,",
            "type": "PARAGRAPH"
          },
          {
            "text": "nunca ficará doente.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Frases assim precisam ser avaliadas, não apenas repetidas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte sempre",
            "type": "SUBHEADING"
          },
          {
            "text": "Onde a Bíblia realmente ensina isso?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "Se Deus se revelou, por que existem tantas interpretações?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Porque receber uma revelação verdadeira não torna automaticamente todos os leitores perfeitos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nós lemos a Bíblia com limites, histórias, culturas, tradições e até interesses pessoais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso precisamos de humildade, contexto, comparação entre passagens, comunidade cristã e disposição",
            "type": "PARAGRAPH"
          },
          {
            "text": "para corrigir nossas ideias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Diferenças de interpretação não significam que toda interpretação é igualmente boa. Algumas leituras",
            "type": "PARAGRAPH"
          },
          {
            "text": "respeitam melhor o texto do que outras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma postura saudável",
            "type": "SUBHEADING"
          },
          {
            "text": "Não devemos desistir da verdade por existirem interpretações diferentes. Devemos estudar",
            "type": "SUBHEADING"
          },
          {
            "text": "com mais cuidado e humildade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Pare de construir um Deus apenas do seu gosto",
            "type": "SUBHEADING"
          },
          {
            "text": "É possível imaginar um Deus que nunca confronta nada porque isso é confortável. Também é possível",
            "type": "PARAGRAPH"
          },
          {
            "text": "imaginar um Deus duro e distante porque convivemos com pessoas duras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta sincera",
            "type": "SUBHEADING"
          },
          {
            "text": "Eu conheço Deus como Ele se revelou ou apenas como aprendi a imaginá-lo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Leia a Bíblia para conhecer Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "A Bíblia orienta decisões, consola e ensina. Mas seu centro é maior: ela nos apresenta Deus e sua obra.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mude a pergunta",
            "type": "SUBHEADING"
          },
          {
            "text": "Além de “O que esse texto diz para mim?”, pergunte: “O que este texto me mostra sobre",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus?”",
            "type": "SUBHEADING"
          },
          {
            "text": "REFLITA 3. Não tenha medo de dizer “eu não sei”",
            "type": "SUBHEADING"
          },
          {
            "text": "Fé não exige resposta pronta para tudo. Às vezes a resposta mais honesta é: “A Bíblia não explica isso",
            "type": "PARAGRAPH"
          },
          {
            "text": "completamente.”",
            "type": "SUBHEADING"
          },
          {
            "text": "Humildade é melhor que invenção",
            "type": "SUBHEADING"
          },
          {
            "text": "Podemos confiar no que Deus revelou sem fingir conhecer o que Ele não revelou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Conhecer Deus precisa chegar à vida",
            "type": "SUBHEADING"
          },
          {
            "text": "É possível acumular informações bíblicas e permanecer distante de Deus no coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A revelação não foi dada apenas para vencer debates. Ela nos chama para confiar, adorar, obedecer e",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminhar com Ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conhecimento que não chega à vida fica incompleto",
            "type": "SUBHEADING"
          },
          {
            "text": "Conhecer mais sobre Deus deveria nos levar a viver mais perto dele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus não permaneceu em silêncio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A criação aponta para sua grandeza. A história bíblica mostra suas ações. As Escrituras registram sua Palavra.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E o Novo Testamento apresenta Jesus Cristo como a revelação decisiva do Pai.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso nos livra de inventar Deus à nossa imagem e também nos ensina humildade: sabemos aquilo que Ele",
            "type": "PARAGRAPH"
          },
          {
            "text": "decidiu mostrar, mas não precisamos fingir que sabemos tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "SUBHEADING"
          },
          {
            "text": "Conhecer Deus é receber com atenção aquilo que Ele decidiu revelar e responder com fé,",
            "type": "SUBHEADING"
          },
          {
            "text": "adoração e obediência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Quanto mais aprendemos a ouvir a revelação de Deus, menos dependemos de suposições e",
            "type": "SUBHEADING"
          },
          {
            "text": "mais podemos construir nossa fé sobre aquilo que Ele realmente mostrou.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha hoje uma passagem curta dos Evangelhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leia devagar e faça apenas duas perguntas:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta 1",
            "type": "SUBHEADING"
          },
          {
            "text": "O que Jesus faz ou diz?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta 2",
            "type": "SUBHEADING"
          },
          {
            "text": "O que isso me mostra sobre Deus?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Registre uma descoberta simples no Diário.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Que imagem de Deus eu carreguei por muito tempo sem conferir se era bíblica?",
              "Tenho lido a Bíblia mais para confirmar minhas ideias ou para permitir que ela me corrija?",
              "Quando não sei responder algo sobre Deus, consigo admitir meus limites?",
              "Minhas experiências espirituais são avaliadas à luz das Escrituras?",
              "O que Jesus tem me mostrado sobre o caráter de Deus?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que ideia sobre Deus eu preciso revisar à luz da maneira como Ele realmente se revelou?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, obrigado porque não permaneceste em silêncio. Tu te deste a conhecer e não me",
            "type": "SUBHEADING"
          },
          {
            "text": "deixaste dependente apenas das minhas ideias. Corrige as imagens erradas que formei sobre ti.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dá-me amor pela tua Palavra, humildade para reconhecer o que não sei e olhos atentos para",
            "type": "SUBHEADING"
          },
          {
            "text": "enxergar em Jesus quem tu és. Livra-me de confundir meus sentimentos com tua voz e",
            "type": "SUBHEADING"
          },
          {
            "text": "ensina-me a conhecer-te de maneira verdadeira, para que minha vida também responda com fé",
            "type": "PARAGRAPH"
          },
          {
            "text": "e obediência. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Hebreus 1:1-3 - Deus falou por meio do Filho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 1:18 - Observe como o Filho torna Deus conhecido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Guarde essas passagens para lembrar que a fé cristã nasce da iniciativa de Deus em se revelar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que Hebreus 1 mostra sobre a maneira como Deus se comunicou ao longo da história?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre formar uma opinião sobre Deus e conhecer aquilo que Ele revelou?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que hábito pode nos ajudar nesta semana a conhecer melhor Deus por meio das Escrituras?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Agora sabemos que Deus se dá a conhecer. Mas o Deus que se revela também governa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso levanta perguntas importantes sobre controle, sofrimento, decisões humanas e confiança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Estudo 07 - A soberania de Deus: quando não temos o controle",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunta central: O que significa dizer que Deus é soberano - e como confiar nele sem",
            "type": "SUBHEADING"
          },
          {
            "text": "transformar a fé em fatalismo ou passividade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Hebreus 1:1-3",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 19:1-4",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 1:19-20",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 1:14-18",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 14:8-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Timóteo 3:14-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deuteronômio 29:29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-02-study-07",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Mas o nosso Deus está nos céus e faz tudo o que lhe apraz.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 115:3",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A soberania de Deus nos permite descansar sem desistir de agir: não controlamos tudo, mas",
            "type": "SUBHEADING"
          },
          {
            "text": "podemos obedecer e confiar naquele que continua sendo Senhor.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Gênesis 50:15-21",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: Salmo 115:1-3 | Daniel 4:34-37 | Provérbios 16:9 | Romanos 8:28-39 | Tiago 4:13-15 |",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 4:23-31",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Gostamos de ter controle.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Planejamos horários, dinheiro, trabalho, família e futuro. Planejar é bom.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas cedo ou tarde acontece alguma coisa que não cabe na nossa agenda: uma doença, uma perda, uma porta",
            "type": "PARAGRAPH"
          },
          {
            "text": "fechada, uma decisão de outra pessoa ou uma mudança que não pedimos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A pergunta aparece",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus continua no controle?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia responde afirmando a soberania de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas soberania não significa que tudo o que acontece é bom, nem que Deus aprova toda maldade, nem que",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossas escolhas deixaram de importar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa que nenhuma criatura, nenhum poder e nenhum acontecimento consegue finalmente arrancar de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus o governo de sua própria história.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "LEIA: Gênesis 50:15-21",
        "blocks": [
          {
            "text": "Gênesis 50 nos coloca diante de uma família marcada por pecado e sofrimento. Os irmãos de José o",
            "type": "PARAGRAPH"
          },
          {
            "text": "venderam como escravo. Eles queriam fazer mal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Anos depois, José consegue olhar para aquela história sem chamar o mal de bem e sem dizer que seus irmãos",
            "type": "PARAGRAPH"
          },
          {
            "text": "eram inocentes.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 1. Os irmãos de José foram responsáveis pelo que fizeram",
        "blocks": [
          {
            "text": "José não diz: “Vocês não fizeram nada.” Ele afirma claramente que eles intentaram o mal contra ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O mal continua sendo mal",
            "type": "SUBHEADING"
          },
          {
            "text": "Não precisamos chamar pecado de vontade boa de Deus para acreditar que Ele continua",
            "type": "PARAGRAPH"
          },
          {
            "text": "soberano.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 2. Deus foi capaz de conduzir a história apesar do mal",
        "blocks": [
          {
            "text": "José também diz que Deus encaminhou aquela história para preservação de vidas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não torna a traição dos irmãos boa. Mostra algo maior: o pecado humano não conseguiu impedir Deus de",
            "type": "PARAGRAPH"
          },
          {
            "text": "conduzir seus propósitos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança no meio do caos",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus pode produzir caminhos de redenção sem precisar aprovar o mal que aconteceu.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 3. José não usa a soberania de Deus para se vingar",
        "blocks": [
          {
            "text": "Agora José possui poder. Ele poderia destruir os irmãos. Mas responde com cuidado e responsabilidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Confiar em Deus muda nossa resposta",
            "type": "SUBHEADING"
          },
          {
            "text": "Saber que Deus é Juiz e Senhor pode nos libertar da necessidade de ocupar o lugar dele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 4. A história de Deus é maior que um momento isolado",
        "blocks": [
          {
            "text": "Durante anos, José poderia ter pensado que tudo havia dado errado. Mas ele ainda estava no meio da",
            "type": "PARAGRAPH"
          },
          {
            "text": "história.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nossa visão é curta",
            "type": "SUBHEADING"
          },
          {
            "text": "Muitas vezes tentamos julgar o livro inteiro enquanto estamos vivendo apenas um capítulo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 1. Soberania significa que Deus é Senhor",
        "blocks": [
          {
            "text": "Deus não disputa o trono do universo com outro poder igual a Ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Daniel 4 descreve reis poderosos descobrindo que seu poder é limitado. Governos passam. Impérios passam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus permanece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Soberania começa aqui",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus é maior do que tudo aquilo que hoje parece dominar nossa atenção.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 2. Soberania não significa que tudo o que acontece agrada a Deus",
        "blocks": [
          {
            "text": "A Bíblia mostra pessoas fazendo aquilo que Deus condena. Violência, mentira, idolatria, abuso e injustiça",
            "type": "PARAGRAPH"
          },
          {
            "text": "continuam sendo pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não devemos olhar para uma tragédia e dizer automaticamente: “Deus quis exatamente isso.” Essa frase",
            "type": "PARAGRAPH"
          },
          {
            "text": "pode ser cruel e afirmar mais do que a Bíblia nos permite.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma forma mais cuidadosa de falar",
            "type": "SUBHEADING"
          },
          {
            "text": "Mesmo quando algo terrível acontece, podemos confiar que o mal não terá poder de destruir o",
            "type": "PARAGRAPH"
          },
          {
            "text": "propósito final de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "CONECTE 3. Deus governa e nós continuamos responsáveis",
        "blocks": [
          {
            "text": "Provérbios 16 diz que o ser humano faz planos e Deus dirige seus passos. Tiago 4 não diz para parar de",
            "type": "PARAGRAPH"
          },
          {
            "text": "planejar; ensina a planejar com humildade: “Se o Senhor quiser”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "As duas coisas permanecem",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus governa e nossas decisões importam.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 4. Romanos 8 não diz que tudo é bom",
        "blocks": [
          {
            "text": "Paulo afirma que Deus age em todas as coisas para o bem daqueles que o amam. Ele não diz que todas as",
            "type": "PARAGRAPH"
          },
          {
            "text": "coisas são boas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nos mesmos capítulos existem sofrimento, fraqueza, perseguição e morte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O texto aponta mais longe",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus está formando seu povo e conduzindo-o para o futuro que prometeu em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "SUBHEADING"
          },
          {
            "text": "Não use a soberania de Deus para silenciar a dor",
            "type": "SUBHEADING"
          },
          {
            "text": "Quando alguém perde uma pessoa amada, sofre violência ou recebe um diagnóstico difícil, talvez não seja",
            "type": "PARAGRAPH"
          },
          {
            "text": "hora de oferecer explicações rápidas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Frases como “era vontade de Deus” podem ferir ainda mais quando usadas sem cuidado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes a fé mais madura fica ao lado de quem sofre",
            "type": "SUBHEADING"
          },
          {
            "text": "Podemos confiar em Deus sem fingir que a dor é pequena.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "Se Deus é soberano, por que orar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Porque a mesma Bíblia que ensina a soberania de Deus também manda orar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus orou. A igreja de Atos orou. Paulo pediu oração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A oração não existe para informar Deus de algo que Ele esqueceu. Ela é relacionamento, dependência e",
            "type": "PARAGRAPH"
          },
          {
            "text": "participação naquilo que Deus está fazendo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Atos 4, a igreja reconhece a soberania de Deus e, justamente por isso, pede coragem para agir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Soberania não mata a oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Ela nos dá um motivo para orar: estamos falando com alguém que realmente pode agir.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Planeje, mas segure seus planos com humildade",
            "type": "SUBHEADING"
          },
          {
            "text": "Planejar é sabedoria. Mas transformar um plano em garantia absoluta produz ansiedade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Humildade não é falta de direção",
            "type": "SUBHEADING"
          },
          {
            "text": "É reconhecer que eu planejo, mas não sou Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Não confunda confiança com passividade",
            "type": "SUBHEADING"
          },
          {
            "text": "Se existe um problema que você pode enfrentar, enfrente. Se precisa pedir ajuda, peça. Se precisa trabalhar,",
            "type": "PARAGRAPH"
          },
          {
            "text": "trabalhe. Se precisa denunciar um crime, denuncie. Se precisa procurar tratamento, procure.",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Deus está no controle” não significa “eu não preciso fazer nada”",
            "type": "SUBHEADING"
          },
          {
            "text": "A soberania de Deus nunca foi desculpa para irresponsabilidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Entregue a Deus aquilo que realmente não está nas suas mãos",
            "type": "SUBHEADING"
          },
          {
            "text": "Existem coisas que nenhuma quantidade de preocupação consegue controlar: a decisão de outra pessoa, o",
            "type": "PARAGRAPH"
          },
          {
            "text": "passado, o tempo, o resultado final de muitas situações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma oração simples",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, ajuda-me a fazer o que me cabe e a confiar-te aquilo que não me cabe controlar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. O capítulo difícil não é a história inteira",
            "type": "SUBHEADING"
          },
          {
            "text": "José não entenderia toda a história dentro da cisterna. Da mesma forma, existem momentos em que ainda",
            "type": "PARAGRAPH"
          },
          {
            "text": "não podemos enxergar o sentido completo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos descansar nesta verdade",
            "type": "SUBHEADING"
          },
          {
            "text": "Mesmo quando não conheço o caminho completo, Deus ainda não deixou de ser Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus é soberano.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que toda tragédia é boa ou que todo pecado corresponde ao desejo de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa que o mal não conseguiu tomar o trono. Deus continua Senhor e é capaz de conduzir a história para",
            "type": "PARAGRAPH"
          },
          {
            "text": "seus propósitos mesmo diante de decisões humanas reais e situações que nos ultrapassam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "SUBHEADING"
          },
          {
            "text": "Não preciso controlar o mundo para continuar caminhando. Preciso ser fiel no que Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "colocou em minhas mãos e confiar a Ele aquilo que está além delas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "A soberania de Deus não nos chama a desistir de agir, mas a viver com coragem sem carregar a",
            "type": "PARAGRAPH"
          },
          {
            "text": "ilusão de que tudo depende de nós.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Divida uma folha ou nota do celular em duas partes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que está nas minhas mãos hoje?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Liste ações e responsabilidades que realmente dependem de você.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que não está nas minhas mãos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Liste resultados, decisões alheias e situações que você não consegue controlar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça com responsabilidade o que pertence à primeira lista. Transforme a segunda em oração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Que situação tenho tentado controlar além do que realmente posso?",
              "Tenho usado “Deus está no controle” para evitar alguma responsabilidade que é minha?",
              "Consigo admitir que algo foi mau sem concluir que Deus perdeu o governo da história?",
              "Como reajo quando meus planos mudam?",
              "Em que área preciso unir planejamento e humildade?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "O que preciso fazer com responsabilidade hoje e o que preciso finalmente entregar ao governo",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, tu és Deus e eu não sou. Obrigado porque o mundo não depende da minha capacidade",
            "type": "SUBHEADING"
          },
          {
            "text": "de controlar tudo. Dá-me sabedoria para agir onde tenho responsabilidade, coragem para",
            "type": "SUBHEADING"
          },
          {
            "text": "enfrentar aquilo que precisa ser enfrentado e humildade para reconhecer meus limites. Quando",
            "type": "PARAGRAPH"
          },
          {
            "text": "eu não entender uma situação, impede-me de chamar o mal de bem apenas para encontrar uma",
            "type": "SUBHEADING"
          },
          {
            "text": "explicação rápida. Sustenta-me na certeza de que continuas sendo Senhor e ensina-me a",
            "type": "SUBHEADING"
          },
          {
            "text": "confiar em ti sem me tornar passivo. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Salmo 115:3 - Deus continua soberano.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gênesis 50:20 - Observe como a maldade humana e a ação redentora de Deus são distinguidas no mesmo",
            "type": "PARAGRAPH"
          },
          {
            "text": "versículo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Guarde essas passagens para os momentos em que a sensação de perda de controle aumentar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como José descreve ao mesmo tempo a responsabilidade dos irmãos e a ação de Deus?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que soberania não significa que todo acontecimento seja bom?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre confiar em Deus e usar a fé como desculpa para não agir?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "O Deus soberano não governa de maneira fria. A Bíblia também fala repetidamente sobre seu amor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Estudo 08 - O amor de Deus: um amor que não começa em nós",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunta central: O que a Bíblia quer dizer quando afirma que Deus é amor - e como esse amor",
            "type": "PARAGRAPH"
          },
          {
            "text": "transforma a maneira como recebemos e oferecemos amor?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Gênesis 50:15-21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 115:1-3",
            "type": "PARAGRAPH"
          },
          {
            "text": "Daniel 4:34-37",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios 16:9",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8:28-39",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago 4:13-15",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 4:23-31",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-02-study-08",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Nisto está o amor: não em que nós tenhamos amado a Deus, mas em que ele nos amou a nós e",
            "type": "PARAGRAPH"
          },
          {
            "text": "enviou seu Filho.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 João 4:10",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "O amor de Deus não é prêmio por desempenho; é uma iniciativa dele que nos alcança, nos",
            "type": "SUBHEADING"
          },
          {
            "text": "transforma e nos ensina a amar de maneira verdadeira.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: 1 João 4:7-12",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: João 3:16-17 | Romanos 5:6-8 | Romanos 8:31-39 | 1 Coríntios 13:4-7 | Hebreus",
            "type": "PARAGRAPH"
          },
          {
            "text": "12:5-11 | 1 João 3:16-18",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "A palavra amor é usada para quase tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amamos pessoas, comidas, lugares, músicas e objetos. Também chamamos de amor sentimentos muito",
            "type": "PARAGRAPH"
          },
          {
            "text": "diferentes entre si.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso, quando a Bíblia diz que Deus é amor, precisamos permitir que a própria Bíblia explique o que isso",
            "type": "PARAGRAPH"
          },
          {
            "text": "significa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O amor de Deus não começa em nossa capacidade de agradá-lo. Não é cegueira diante do mal. Não é uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "promessa de que nunca seremos corrigidos. E não é apenas um sentimento bonito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em 1 João, o amor ganha forma concreta",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus enviou seu Filho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "LEIA: 1 João 4:7-12",
        "blocks": [
          {
            "text": "João não começa dizendo que devemos amar porque somos naturalmente bons. Ele começa em Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ordem importa",
            "type": "SUBHEADING"
          },
          {
            "text": "Amamos porque Deus amou primeiro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 1. O amor começa em Deus",
        "blocks": [
          {
            "text": "João diz que o amor procede de Deus. Depois afirma: Deus é amor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que qualquer coisa que chamarmos de amor automaticamente representa Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É o contrário",
            "type": "SUBHEADING"
          },
          {
            "text": "O caráter de Deus nos ajuda a aprender o que o amor verdadeiro é.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 2. Deus nos amou antes de podermos apresentar méritos",
        "blocks": [
          {
            "text": "João é direto: não foi nosso amor que começou a história. Romanos 5 também diz que Cristo morreu por nós",
            "type": "PARAGRAPH"
          },
          {
            "text": "quando ainda éramos pecadores.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso desmonta uma mentira comum",
            "type": "SUBHEADING"
          },
          {
            "text": "Você não precisa convencer Deus a começar a amar você.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 3. O amor de Deus se torna visível em ação",
        "blocks": [
          {
            "text": "1 João não deixa o amor apenas no sentimento. Deus enviou o Filho. Jesus entregou sua vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 João 3 usa isso como padrão: amor também se expressa em ações concretas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor bíblico age",
            "type": "SUBHEADING"
          },
          {
            "text": "Palavras de carinho que nunca se tornam cuidado podem ser insuficientes.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 4. Quem recebe amor é chamado a amar",
        "blocks": [
          {
            "text": "João liga diretamente a experiência do amor de Deus ao modo como tratamos outras pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não podemos dizer que conhecemos profundamente o Deus de amor enquanto cultivamos ódio como estilo",
            "type": "PARAGRAPH"
          },
          {
            "text": "de vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O amor recebido se torna caminho",
            "type": "SUBHEADING"
          },
          {
            "text": "Não amamos para comprar o amor de Deus. Amamos porque fomos alcançados por Ele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 1. “Deus é amor” não significa “amor é Deus”",
        "blocks": [
          {
            "text": "Nem todo desejo intenso é santo. Nem toda relação chamada de amor é saudável. Nem toda atitude feita",
            "type": "PARAGRAPH"
          },
          {
            "text": "“por amor” é correta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus também é santo, justo e verdadeiro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O amor de Deus não contradiz seu caráter",
            "type": "SUBHEADING"
          },
          {
            "text": "Ele nunca precisa abandonar a verdade para continuar amando.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 2. Amor não é aprovação de tudo",
        "blocks": [
          {
            "text": "Pais que amam seus filhos não aprovam tudo o que eles fazem. Da mesma forma, Deus pode amar e corrigir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 12 apresenta a disciplina como parte do cuidado de Deus com seus filhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Na Bíblia, amor e verdade caminham juntos",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus deseja nosso bem, não apenas nosso conforto imediato.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "CONECTE 3. A cruz mostra o amor de Deus de maneira decisiva",
        "blocks": [
          {
            "text": "João 3 e Romanos 5 conectam o amor de Deus ao envio e à entrega de Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso impede que o amor de Deus se transforme apenas em uma sensação subjetiva.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando nossas emoções dizem “Deus não pode me amar”",
            "type": "SUBHEADING"
          },
          {
            "text": "O Evangelho nos chama a olhar para aquilo que Ele fez em Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 4. O amor de Deus produz segurança, não orgulho",
        "blocks": [
          {
            "text": "Romanos 8 fala da segurança do amor de Deus em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas essa segurança não significa superioridade sobre outras pessoas. Se fui amado por graça, não tenho",
            "type": "PARAGRAPH"
          },
          {
            "text": "motivo para desprezar quem considero menos digno.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça recebida gera humildade",
            "type": "SUBHEADING"
          },
          {
            "text": "Quem sabe que foi alcançado sem mérito aprende a olhar os outros de outra maneira.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "SUBHEADING"
          },
          {
            "text": "Amar não significa permanecer disponível para abuso",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus manda amar inimigos, mas não manda fingir que violência é saudável.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É possível desejar o bem de uma pessoa e ainda estabelecer distância, buscar proteção ou denunciar um",
            "type": "PARAGRAPH"
          },
          {
            "text": "crime.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão não exige oferecer novamente acesso ilimitado a quem continua causando dano.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Limites podem fazer parte de uma resposta amorosa",
            "type": "SUBHEADING"
          },
          {
            "text": "Amor não precisa ser cúmplice do mal.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "Se Deus é amor, por que a Bíblia fala de ira e juízo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Porque amor verdadeiro não é indiferente ao mal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se Deus amasse o oprimido e não se importasse com a violência que o destrói, esse “amor” seria vazio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ira de Deus na Bíblia não deve ser imaginada como explosão emocional descontrolada. Ela expressa sua",
            "type": "PARAGRAPH"
          },
          {
            "text": "oposição santa ao pecado e à injustiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma imagem simples",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus ama o que é bom e se opõe ao que destrói aquilo que Ele ama.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Pare de tentar merecer todos os dias o que Deus oferece por graça",
            "type": "SUBHEADING"
          },
          {
            "text": "Algumas pessoas vivem como se o amor de Deus subisse e descesse conforme sua performance.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando acertam, sentem-se aceitas. Quando falham, concluem que Deus as abandonou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O amor de Deus produz arrependimento com esperança",
            "type": "SUBHEADING"
          },
          {
            "text": "Não precisamos esconder o pecado para continuar perto dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Aprenda a receber amor sem viver de aparência",
            "type": "SUBHEADING"
          },
          {
            "text": "Quem acredita que precisa parecer perfeito para ser amado tende a esconder fraquezas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho nos convida à verdade. Deus já conhece aquilo que tentamos esconder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ser conhecido e chamado para perto é parte da graça",
            "type": "SUBHEADING"
          },
          {
            "text": "Isso não elimina mudança; torna a mudança possível sem teatro religioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Ame com atitudes, não apenas discursos",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma mensagem bonita pode ser importante. Mas talvez alguém precise de comida, presença, escuta, ajuda",
            "type": "PARAGRAPH"
          },
          {
            "text": "prática ou reconciliação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte hoje",
            "type": "SUBHEADING"
          },
          {
            "text": "Que forma concreta meu amor pode assumir?",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Ame sem transformar pessoas em projetos",
            "type": "SUBHEADING"
          },
          {
            "text": "Às vezes ajudamos alguém esperando que a pessoa se torne exatamente aquilo que desejamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor não é controle. Podemos ensinar, aconselhar e estabelecer limites sem manipular.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O outro continua sendo pessoa",
            "type": "SUBHEADING"
          },
          {
            "text": "Não ferramenta para alimentar nossa necessidade de ser necessário.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 5. Deixe o amor de Deus corrigir a forma como você enxerga a si mesmo",
            "type": "SUBHEADING"
          },
          {
            "text": "Humildade cristã não é dizer que você não vale nada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu valor não vem de ser melhor que os outros, mas de ter sido criado e amado por Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso nos livra de dois extremos",
            "type": "SUBHEADING"
          },
          {
            "text": "Da arrogância e do desprezo por nós mesmos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus é amor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esse amor não nasce em nosso mérito e não depende de nossa capacidade de impressioná-lo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele se torna visível em Cristo. É um amor santo, verdadeiro e ativo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não chama o mal de bem, mas também não abandona o pecador que se volta para Deus. E quem recebe esse",
            "type": "PARAGRAPH"
          },
          {
            "text": "amor é chamado a amar de maneira concreta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "SUBHEADING"
          },
          {
            "text": "O amor de Deus não apenas nos consola. Ele redefine nossa maneira de enxergar Deus, a nós",
            "type": "SUBHEADING"
          },
          {
            "text": "mesmos e as pessoas ao nosso redor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Somos chamados a amar não para conquistar o coração de Deus, mas porque o coração de",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus nos alcançou primeiro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Pense em uma pessoa próxima que precisa de amor de forma concreta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não escolha uma grande promessa. Escolha uma atitude possível hoje: ouvir sem interromper, pedir perdão,",
            "type": "PARAGRAPH"
          },
          {
            "text": "ajudar, encorajar, servir ou estabelecer um limite verdadeiro sem agressão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça uma coisa real",
            "type": "SUBHEADING"
          },
          {
            "text": "Deixe o amor sair do discurso e ganhar uma forma concreta.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho tentado merecer o amor de Deus pelo meu desempenho?",
              "Confundo amor com aprovação de tudo?",
              "Meu amor pelas pessoas aparece em atitudes concretas?",
              "Existe alguém a quem preciso amar sem voltar a uma situação de abuso?",
              "Como a cruz muda a maneira como penso sobre o amor de Deus por mim?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que mentira sobre o amor de Deus eu preciso abandonar para conseguir receber e oferecer",
            "type": "SUBHEADING"
          },
          {
            "text": "amor de maneira mais saudável?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, obrigado porque teu amor não começou em meu desempenho. Tu me amaste primeiro",
            "type": "SUBHEADING"
          },
          {
            "text": "e mostraste esse amor em Cristo. Cura em mim as imagens distorcidas de amor que aprendi ao",
            "type": "SUBHEADING"
          },
          {
            "text": "longo da vida. Ensina-me a receber tua graça sem acomodação ao pecado e a amar pessoas",
            "type": "SUBHEADING"
          },
          {
            "text": "sem manipulação, orgulho ou crueldade. Dá-me coragem para agir, perdoar quando for",
            "type": "SUBHEADING"
          },
          {
            "text": "possível, estabelecer limites quando necessário e fazer da minha vida uma resposta ao amor",
            "type": "SUBHEADING"
          },
          {
            "text": "que recebi de ti. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "1 João 4:10 - O amor começa na iniciativa de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5:8 - Observe quando Deus demonstrou seu amor por nós.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Guarde essas passagens para os dias em que seu coração tentar medir o amor de Deus apenas",
            "type": "SUBHEADING"
          },
          {
            "text": "pelas circunstâncias.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que 1 João 4 mostra sobre a origem e a forma do amor de Deus?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que amor e verdade não são inimigos?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que atitude concreta de amor nosso grupo pode praticar nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Já vimos que Deus é justo, misericordioso e amoroso. Agora precisamos colocar essas verdades lado a lado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Estudo 09 - Justiça e graça: Deus não ignora o pecado nem abandona o pecador",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunta central: Como justiça e graça se encontram em Deus - e por que a cruz ocupa o",
            "type": "SUBHEADING"
          },
          {
            "text": "centro dessa resposta?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "1 João 4:7-12",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 3:16-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5:6-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8:31-39",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 13:4-7",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 12:5-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 João 3:16-18",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-02-study-09",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Sendo justificados gratuitamente pela sua graça, pela redenção que há em Cristo Jesus.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 3:24",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A graça não faz Deus fingir que o pecado não existe; ela nos oferece em Cristo aquilo que",
            "type": "SUBHEADING"
          },
          {
            "text": "jamais conseguiríamos comprar ou produzir sozinhos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Romanos 3:21-26",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: Êxodo 34:6-7 | Isaías 53:4-6 | João 3:16-17 | Romanos 5:6-11 | Efésios 2:4-10 | 1 Pedro",
            "type": "PARAGRAPH"
          },
          {
            "text": "2:24",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Nos estudos anteriores vimos verdades que podem parecer difíceis de colocar juntas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus é justo",
            "type": "SUBHEADING"
          },
          {
            "text": "O pecado importa e o mal não é tratado como se fosse bom.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus é misericordioso e amoroso",
            "type": "SUBHEADING"
          },
          {
            "text": "Existe perdão, cuidado e graça para o pecador.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Então como essas duas coisas se encontram?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus simplesmente decide ignorar o mal? Ou sua justiça torna impossível receber o pecador?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento responde levando nossos olhos para Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz ocupa o centro",
            "type": "SUBHEADING"
          },
          {
            "text": "Ela mostra que Deus não trata o pecado como brincadeira e, ao mesmo tempo, não abandona o",
            "type": "SUBHEADING"
          },
          {
            "text": "pecador à própria culpa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "LEIA: Romanos 3:21-26",
        "blocks": [
          {
            "text": "Romanos 3 chega depois de uma longa explicação sobre a condição humana. Paulo desmonta a ideia de que",
            "type": "PARAGRAPH"
          },
          {
            "text": "alguns grupos conseguem se apresentar diante de Deus como moralmente superiores.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Então surge uma expressão de esperança: a graça aparece ligada a Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 1. O problema é maior do que alguns erros isolados",
        "blocks": [
          {
            "text": "Romanos descreve uma humanidade que não consegue se justificar diante de Deus por desempenho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema não é apenas cometer um erro eventual. É uma relação quebrada com Deus que alcança nosso",
            "type": "PARAGRAPH"
          },
          {
            "text": "coração e nossas ações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso precisamos de algo maior que conselho",
            "type": "SUBHEADING"
          },
          {
            "text": "Precisamos de reconciliação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 2. A salvação é apresentada como graça",
        "blocks": [
          {
            "text": "Paulo usa a ideia de algo recebido gratuitamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que não podemos comprar aceitação diante de Deus com uma lista de boas obras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Obediência importa, mas não funciona como pagamento pelo perdão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça é presente",
            "type": "SUBHEADING"
          },
          {
            "text": "Não salário espiritual.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 3. Cristo está no centro",
        "blocks": [
          {
            "text": "A solução de Romanos 3 não é Deus diminuir seu padrão. É Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento conecta sua morte à nossa redenção, perdão e reconciliação. 1 Pedro diz que Ele levou",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossos pecados em seu corpo sobre o madeiro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho não é “finja que nada aconteceu”",
            "type": "SUBHEADING"
          },
          {
            "text": "É Deus agindo em Cristo para tratar o pecado e reconciliar pecadores.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 4. O resultado é uma nova posição diante de Deus",
        "blocks": [
          {
            "text": "Paulo fala de justificação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em linguagem simples, significa que o pecador que confia em Cristo é recebido por Deus não porque se",
            "type": "PARAGRAPH"
          },
          {
            "text": "tornou perfeito em um instante, mas porque sua esperança está na obra de Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nossa confiança muda de lugar",
            "type": "SUBHEADING"
          },
          {
            "text": "Sai do próprio desempenho e vai para Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 1. Justiça não significa ausência de graça",
        "blocks": [
          {
            "text": "Se Deus simplesmente chamasse o mal de bem, não seria justo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas justiça também não exige que Deus seja incapaz de perdoar. Ele mesmo oferece o caminho de",
            "type": "PARAGRAPH"
          },
          {
            "text": "reconciliação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não são dois deuses",
            "type": "SUBHEADING"
          },
          {
            "text": "O Deus que julga o pecado é o mesmo que oferece graça ao pecador.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 2. Graça não significa que pecado perdeu importância",
        "blocks": [
          {
            "text": "Às vezes ouvimos “é pela graça” como justificativa para continuar deliberadamente no mesmo caminho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo rejeita essa ideia em Romanos 6.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A graça não é licença para permanecer preso",
            "type": "SUBHEADING"
          },
          {
            "text": "Ela perdoa e abre a porta para uma vida nova.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "CONECTE 3. A cruz revela amor e seriedade ao mesmo tempo",
        "blocks": [
          {
            "text": "Romanos 5 diz que Deus demonstra seu amor em Cristo. Isaías 53 e 1 Pedro 2 conectam o Servo e Cristo ao",
            "type": "PARAGRAPH"
          },
          {
            "text": "tratamento do pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz é amor porque Deus se aproxima para salvar. Também é séria porque mostra que o pecado não é um",
            "type": "PARAGRAPH"
          },
          {
            "text": "detalhe sem consequência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Na cruz encontramos duas mensagens",
            "type": "SUBHEADING"
          },
          {
            "text": "Seu pecado é mais sério do que você gostaria de admitir, e o amor de Deus é maior do que",
            "type": "SUBHEADING"
          },
          {
            "text": "você conseguiria merecer.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 4. Boas obras vêm depois, não como preço",
        "blocks": [
          {
            "text": "Efésios 2 diz que somos salvos pela graça e também diz que fomos criados em Cristo para boas obras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ordem é importante. Boas obras não compram a salvação. Elas fazem parte da vida transformada de quem",
            "type": "PARAGRAPH"
          },
          {
            "text": "foi alcançado pela graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A sequência é saudável",
            "type": "SUBHEADING"
          },
          {
            "text": "Graça recebida -> nova vida -> boas obras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "SUBHEADING"
          },
          {
            "text": "Não transforme graça em desculpa para encobrir injustiça",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma pessoa pode pedir perdão e ainda precisar assumir consequências.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma igreja pode anunciar graça e ainda ter o dever de proteger vítimas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdoar não significa apagar provas, impedir denúncia ou restaurar automaticamente uma posição de",
            "type": "PARAGRAPH"
          },
          {
            "text": "confiança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça e responsabilidade podem caminhar juntas",
            "type": "SUBHEADING"
          },
          {
            "text": "A cruz nunca deve ser usada para proteger abuso.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "A cruz coloca o Pai contra o Filho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento não apresenta o Pai como alguém cruel obrigando um Filho relutante.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus afirma que entrega sua vida voluntariamente. Paulo diz que Deus estava em Cristo reconciliando",
            "type": "PARAGRAPH"
          },
          {
            "text": "consigo o mundo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pai e Filho não aparecem como adversários morais. A obra da cruz pertence ao propósito redentor de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma forma segura de dizer",
            "type": "SUBHEADING"
          },
          {
            "text": "O Filho se entrega voluntariamente e Deus age em Cristo para reconciliar pecadores consigo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Pare de tentar pagar por um perdão que você não consegue comprar",
            "type": "SUBHEADING"
          },
          {
            "text": "Algumas pessoas confessam o pecado e continuam se punindo por anos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Acham que sofrer emocionalmente o suficiente provará arrependimento. Mas autopunição não substitui a",
            "type": "PARAGRAPH"
          },
          {
            "text": "graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Arrependimento olha para frente",
            "type": "SUBHEADING"
          },
          {
            "text": "Reconhece o pecado, recebe o perdão e busca uma vida nova.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Pare também de tratar a graça como algo barato",
            "type": "SUBHEADING"
          },
          {
            "text": "Se uma atitude destrói pessoas, não devemos rir dela porque “Deus perdoa”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O perdão de Deus deveria aumentar nossa gratidão e nosso desejo de mudança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça verdadeira produz reverência",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não descuido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Abandone a comparação espiritual",
            "type": "SUBHEADING"
          },
          {
            "text": "Se a salvação é graça, não existe espaço para vanglória.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você pode ter uma história diferente da outra pessoa, mas continua dependendo de Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ninguém chega à cruz com currículo para apresentar",
            "type": "SUBHEADING"
          },
          {
            "text": "Chegamos de mãos vazias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Ofereça graça sem abandonar a verdade",
            "type": "SUBHEADING"
          },
          {
            "text": "Quando alguém falhar, não precisamos escolher entre crueldade e fingimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos falar a verdade, estabelecer limites e ainda desejar restauração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça não é ausência de verdade",
            "type": "SUBHEADING"
          },
          {
            "text": "É verdade oferecida sem prazer em destruir.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus é justo e gracioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essas verdades não se anulam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Na cruz, o pecado é tratado com seriedade e o pecador encontra uma porta de reconciliação que não",
            "type": "PARAGRAPH"
          },
          {
            "text": "conseguiria abrir sozinho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso destrói tanto o orgulho quanto o desespero. Não posso me salvar por mérito, mas também não preciso",
            "type": "PARAGRAPH"
          },
          {
            "text": "concluir que minha culpa é maior que a graça de Deus em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "SUBHEADING"
          },
          {
            "text": "A cruz nos impede de dizer “meu pecado não importa” e também “não existe esperança para",
            "type": "PARAGRAPH"
          },
          {
            "text": "mim”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "A graça de Deus não diminui sua justiça; em Cristo, ela nos oferece perdão, reconciliação e uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "nova vida que nenhum esforço humano poderia comprar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma das duas perguntas e responda com sinceridade:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta 1",
            "type": "SUBHEADING"
          },
          {
            "text": "Tenho tentado merecer o amor de Deus?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta 2",
            "type": "SUBHEADING"
          },
          {
            "text": "Tenho usado a graça como desculpa para não mudar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois leia Romanos 3:21-26 novamente e transforme sua resposta em oração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Em qual área ainda tento provar que sou digno da aceitação de Deus?",
              "Existe algum pecado que tenho tratado como pequeno porque “Deus perdoa”?",
              "Tenho dificuldade de acreditar que a graça pode alcançar meu passado?",
              "Como justiça e graça podem aparecer juntas na forma como trato quem erra comigo?",
              "Minha gratidão por Cristo está produzindo mudança real?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "O que preciso parar de tentar pagar sozinho e colocar novamente diante da graça de Deus em",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, obrigado porque não ignoraste meu pecado e também não me abandonaste a ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Obrigado por Cristo. Livra-me do orgulho de tentar merecer tua aceitação e do descuido de",
            "type": "SUBHEADING"
          },
          {
            "text": "usar tua graça como desculpa para continuar longe de ti. Ensina-me a receber perdão com",
            "type": "SUBHEADING"
          },
          {
            "text": "gratidão, assumir responsabilidade quando preciso e caminhar numa vida nova. Que a cruz",
            "type": "SUBHEADING"
          },
          {
            "text": "permaneça no centro da minha fé e da forma como trato outras pessoas. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Romanos 3:23-24 - Observe pecado e graça na mesma passagem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 2:8-10 - Veja a ordem entre graça, salvação e boas obras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Guarde essas passagens para lembrar que a graça é presente e também nos chama para uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "vida transformada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que Romanos 3 mostra sobre a necessidade comum de graça?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que graça não significa que o pecado deixou de importar?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como podemos oferecer graça e manter responsabilidade ao mesmo tempo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Depois de conhecer vários aspectos do caráter e da obra de Deus, chegamos a uma pergunta que exige",
            "type": "PARAGRAPH"
          },
          {
            "text": "humildade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia fala de um único Deus e, ao mesmo tempo, apresenta Pai, Filho e Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Estudo 10 - Pai, Filho e Espírito Santo: o único Deus que se revelou dessa maneira",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunta central: Como a Bíblia apresenta um único Deus e, ao mesmo tempo, Pai, Filho e",
            "type": "PARAGRAPH"
          },
          {
            "text": "Espírito Santo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Romanos 3:21-26",
            "type": "PARAGRAPH"
          },
          {
            "text": "Êxodo 34:6-7",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isaías 53:4-6",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 3:16-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5:6-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 2:4-10",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 2:24",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-02-study-10",
    "sections": [
      {
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Batizando-os em nome do Pai, e do Filho, e do Espírito Santo.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 28:19",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Não precisamos reduzir Deus ao tamanho da nossa compreensão; somos chamados a conhecer",
            "type": "SUBHEADING"
          },
          {
            "text": "e adorar o único Deus conforme Ele se revelou como Pai, Filho e Espírito Santo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Mateus 3:13-17",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois, conecte com: Deuteronômio 6:4 | Mateus 28:18-20 | João 1:1-3,14 | João 14:16-17,26 | Atos 5:3-4 |",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 13:13",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Chegamos a um tema que pode parecer difícil.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A palavra Trindade talvez faça algumas pessoas imaginarem uma aula cheia de termos complicados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas podemos começar de maneira simples.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia afirma duas verdades",
            "type": "SUBHEADING"
          },
          {
            "text": "Existe um único Deus e a mesma Bíblia fala do Pai, do Filho e do Espírito Santo de maneiras que",
            "type": "PARAGRAPH"
          },
          {
            "text": "precisam ser levadas a sério.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A palavra “Trindade” surgiu na história cristã como uma forma curta de resumir esse conjunto de verdades",
            "type": "PARAGRAPH"
          },
          {
            "text": "bíblicas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nosso objetivo não é explicar Deus como se Ele coubesse completamente numa fórmula. É aprender a",
            "type": "PARAGRAPH"
          },
          {
            "text": "respeitar a maneira como Ele se revelou.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "type": "READ",
        "title": "LEIA: Mateus 3:13-17",
        "blocks": [
          {
            "text": "Mateus descreve o batismo de Jesus. A cena é importante porque Pai, Filho e Espírito Santo aparecem juntos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus está nas águas. O Espírito desce sobre Ele. E a voz do Pai vem dos céus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 1. A Bíblia ensina que há um só Deus",
        "blocks": [
          {
            "text": "Deuteronômio 6:4 está no coração da fé de Israel: o Senhor é um.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O cristianismo não começou anunciando três deuses. Jesus e os apóstolos permaneceram dentro da fé bíblica",
            "type": "PARAGRAPH"
          },
          {
            "text": "em um único Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ponto de partida",
            "type": "SUBHEADING"
          },
          {
            "text": "A fé cristã adora um só Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 2. Pai, Filho e Espírito Santo aparecem distintos",
        "blocks": [
          {
            "text": "No batismo de Jesus, o Filho não está fingindo falar consigo mesmo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Pai fala do céu. O Espírito desce. Jesus está presente como Filho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também em João 14, Jesus fala do Pai e promete outro Consolador, o Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existe relação real",
            "type": "SUBHEADING"
          },
          {
            "text": "Pai, Filho e Espírito Santo não são apenas três nomes usados para a mesma pessoa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 3. O Novo Testamento fala do Filho de maneira divina",
        "blocks": [
          {
            "text": "João 1 afirma que o Verbo estava com Deus e era Deus. Depois diz que o Verbo se fez carne.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Outras passagens apresentam Jesus recebendo honra, exercendo autoridade e participando da obra divina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus é mais do que um mensageiro",
            "type": "SUBHEADING"
          },
          {
            "text": "O Novo Testamento o coloca dentro da identidade e da obra de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "type": "OBSERVE",
        "title": "OBSERVE 4. O Espírito Santo também não é apenas uma força impessoal",
        "blocks": [
          {
            "text": "Jesus fala do Espírito como aquele que ensina, lembra e permanece com os discípulos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Atos 5, mentir ao Espírito Santo é colocado em relação direta com mentir a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Espírito age pessoalmente",
            "type": "SUBHEADING"
          },
          {
            "text": "A Bíblia o apresenta ensinando, conduzindo e atuando na obra de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 1. Não são três deuses",
        "blocks": [
          {
            "text": "Pai, Filho e Espírito Santo não formam um grupo de três divindades independentes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia continua afirmando um único Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não dividimos Deus em três partes",
            "type": "SUBHEADING"
          },
          {
            "text": "O Pai não é um terço de Deus, o Filho outro terço e o Espírito o restante.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 2. Também não é uma única pessoa usando três máscaras",
        "blocks": [
          {
            "text": "Às vezes tentamos simplificar dizendo que Deus é Pai em um momento, Filho em outro e Espírito em outro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas o batismo de Jesus e João 14 não permitem essa redução. Pai, Filho e Espírito aparecem relacionados",
            "type": "PARAGRAPH"
          },
          {
            "text": "entre si.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia mantém duas verdades",
            "type": "SUBHEADING"
          },
          {
            "text": "Há um só Deus, e Pai, Filho e Espírito Santo são distintos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "type": "CONNECT",
        "title": "CONECTE 3. Mateus 28 coloca os três no mesmo “nome”",
        "blocks": [
          {
            "text": "Jesus manda batizar em nome do Pai, do Filho e do Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É uma fórmula breve, mas profundamente significativa. Os três aparecem juntos no centro da iniciação cristã.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Igreja recebeu essa linguagem do Novo Testamento",
            "type": "SUBHEADING"
          },
          {
            "text": "Ela não precisou inventar Pai, Filho e Espírito Santo para complicar a fé.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 4. A palavra “Trindade” é um resumo, não um versículo",
        "blocks": [
          {
            "text": "A palavra não aparece escrita na Bíblia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que a ideia tenha sido inventada sem base bíblica.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também usamos palavras como “encarnação” para resumir verdades que aparecem em vários textos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O termo serve à Bíblia, não o contrário",
            "type": "SUBHEADING"
          },
          {
            "text": "A doutrina precisa permanecer debaixo do conjunto das passagens.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "type": "UNDERSTAND",
        "title": "ENTENDA 5. Não precisamos encontrar uma comparação perfeita",
        "blocks": [
          {
            "text": "Deus é maior do que qualquer objeto criado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Água, ovo, Sol ou outras comparações podem ajudar em um detalhe e confundir em outro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Humildade é parte do conhecimento",
            "type": "SUBHEADING"
          },
          {
            "text": "Podemos conhecer Deus de maneira verdadeira sem compreender tudo sobre Ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "SUBHEADING"
          },
          {
            "text": "Evite duas simplificações",
            "type": "SUBHEADING"
          },
          {
            "text": "Primeira: falar como se cristãos adorassem três deuses.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Segunda: falar como se Pai, Filho e Espírito fossem apenas três maneiras temporárias de Deus aparecer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mantenha o que a Bíblia mantém",
            "type": "SUBHEADING"
          },
          {
            "text": "Um só Deus; Pai, Filho e Espírito Santo distintos e inseparavelmente ligados à identidade e à",
            "type": "PARAGRAPH"
          },
          {
            "text": "obra divina.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "type": "DEEPEN",
        "title": "+ APROFUNDE",
        "blocks": [
          {
            "text": "Por que nenhuma analogia explica perfeitamente a Trindade?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Porque toda analogia vem da criação e Deus é o Criador.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Água em gelo, líquido e vapor pode sugerir uma coisa que muda de forma, o que não representa bem Pai,",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filho e Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Um ovo possui partes, o que pode sugerir que cada um seja apenas um pedaço de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Sol, sua luz e seu calor também não reproduzem tudo o que a Bíblia diz.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Melhor caminho",
            "type": "SUBHEADING"
          },
          {
            "text": "Em vez de procurar uma comparação perfeita, permaneça perto dos textos bíblicos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": true
      },
      {
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Conhecer Deus é receber a revelação, não simplificá-la até caber em nós",
            "type": "SUBHEADING"
          },
          {
            "text": "Às vezes queremos uma explicação que elimine todo mistério.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas um Deus que pudesse ser totalmente reduzido à nossa compreensão seria pequeno demais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé não é desligar a mente",
            "type": "SUBHEADING"
          },
          {
            "text": "É usar a mente com humildade diante de alguém maior que nós.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. A oração cristã ganha profundidade",
            "type": "SUBHEADING"
          },
          {
            "text": "O Novo Testamento frequentemente apresenta oração ao Pai, em nome ou por meio do Filho, na vida",
            "type": "PARAGRAPH"
          },
          {
            "text": "conduzida pelo Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos transformar isso numa fórmula rígida para cada oração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O importante",
            "type": "SUBHEADING"
          },
          {
            "text": "Nossa relação com Deus é profundamente marcada por Pai, Filho e Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Jesus não pode ocupar apenas um lugar secundário na fé",
            "type": "SUBHEADING"
          },
          {
            "text": "Se o Novo Testamento apresenta o Filho dessa maneira, Jesus não pode ser apenas um mestre inspirador",
            "type": "PARAGRAPH"
          },
          {
            "text": "entre outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conhecer Deus envolve levar a sério quem Cristo é.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso a próxima trilha importa",
            "type": "SUBHEADING"
          },
          {
            "text": "Depois de conhecer Deus, vamos olhar mais de perto para Jesus Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Dependemos do Espírito Santo para uma vida cristã real",
            "type": "SUBHEADING"
          },
          {
            "text": "O Espírito não é decoração da fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele está ligado à presença de Deus, à transformação, ao testemunho e à vida da Igreja.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conhecer Deus inclui aprender dependência",
            "type": "SUBHEADING"
          },
          {
            "text": "Não vivemos a vida cristã apenas pela força da vontade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "A Bíblia nos apresenta um único Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esse mesmo conjunto de Escrituras fala do Pai, do Filho e do Espírito Santo de maneira pessoal e divina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A palavra Trindade resume essa realidade sem pretender esgotar o mistério.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não são três deuses. Também não é uma pessoa apenas trocando de máscara.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "SUBHEADING"
          },
          {
            "text": "O objetivo não é dominar um quebra-cabeça sobre Deus, mas adorá-lo com mais fidelidade",
            "type": "SUBHEADING"
          },
          {
            "text": "àquilo que Ele revelou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Conhecer o Pai, o Filho e o Espírito Santo nos lembra que Deus é maior que nossas explicações",
            "type": "PARAGRAPH"
          },
          {
            "text": "e, ao mesmo tempo, se aproximou de nós para ser conhecido.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Leia lentamente Mateus 3:13-17 e Mateus 28:18-20.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Marque cada vez que aparecem Pai, Filho e Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois ore",
            "type": "SUBHEADING"
          },
          {
            "text": "Senhor, ensina-me a conhecer-te como realmente te revelaste.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Eu já tinha percebido Pai, Filho e Espírito Santo juntos nos textos bíblicos?",
              "Tenho tratado Jesus apenas como mestre ou reconhecido a forma como o Novo Testamento fala dele?",
              "Costumo pensar no Espírito Santo apenas como uma força?",
              "Por que é importante afirmar um único Deus?",
              "Consigo aceitar que conhecer verdadeiramente Deus não significa compreender tudo sobre Ele?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "O que mudou na minha visão de Deus ao perceber como a Bíblia apresenta Pai, Filho e Espírito",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      },
      {
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus, eu te adoro porque és maior do que minha capacidade de compreender. Obrigado",
            "type": "SUBHEADING"
          },
          {
            "text": "porque não permaneceste distante, mas te revelaste. Pai, obrigado por teu amor e por teu",
            "type": "SUBHEADING"
          },
          {
            "text": "propósito. Senhor Jesus, obrigado porque vieste ao nosso encontro e nos revelaste o Pai.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Espírito Santo, obrigado por tua presença e ação no povo de Deus. Guarda-me de simplificar",
            "type": "SUBHEADING"
          },
          {
            "text": "tua verdade até distorcê-la. Dá-me humildade, reverência e alegria para conhecer-te cada vez",
            "type": "PARAGRAPH"
          },
          {
            "text": "mais conforme tua Palavra. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 21,
        "optional": false
      },
      {
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Mateus 28:19 - Pai, Filho e Espírito Santo aparecem juntos na missão da Igreja.",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 13:13 - Observe como a bênção apostólica reúne o Senhor Jesus Cristo, Deus e o Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "SUBHEADING"
          },
          {
            "text": "Guarde essas passagens como uma pequena janela para a maneira como o Novo Testamento",
            "type": "PARAGRAPH"
          },
          {
            "text": "fala de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 22,
        "optional": false
      },
      {
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "items": [
              "Observe"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que Mateus 3 mostra sobre Pai, Filho e Espírito Santo?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que as ideias de “três deuses” e “uma pessoa usando três máscaras” não representam bem",
            "type": "SUBHEADING"
          },
          {
            "text": "o conjunto dos textos?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como conhecer Deus dessa maneira pode mudar nossa oração, adoração e vida cristã?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 23,
        "optional": false
      },
      {
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Você concluiu a Trilha 2 - Conhecendo Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Percorremos criação, santidade, justiça, misericórdia, fidelidade, revelação, soberania, amor, graça e a maneira",
            "type": "PARAGRAPH"
          },
          {
            "text": "como Deus se revelou como Pai, Filho e Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Agora vamos concentrar nossos olhos naquele que ocupa o centro do Evangelho: Jesus Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próxima trilha",
            "type": "SUBHEADING"
          },
          {
            "text": "Trilha 3 - Conhecendo Jesus Cristo",
            "type": "SUBHEADING"
          },
          {
            "text": "Primeiro tema: O Verbo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A próxima Jornada começará perguntando: Quem é Jesus antes mesmo de chegarmos a",
            "type": "PARAGRAPH"
          },
          {
            "text": "Belém?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 24,
        "optional": false
      },
      {
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Mateus 3:13-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deuteronômio 6:4",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 28:18-20",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 1:1-3,14",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 14:16-17,26",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 5:3-4",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 13:13",
            "type": "PARAGRAPH"
          }
        ],
        "order": 25,
        "optional": true
      }
    ]
  }
] as const;

const sectionIconKey: Readonly<Record<string, string>> = {
  GOLDEN_TEXT: "texto_aureo",
  PRACTICAL_TRUTH: "verdade_pratica",
  BIBLE_READING: "leitura_biblica",
  BEFORE_UNDERSTANDING: "leia",
  READ: "leia",
  OBSERVE: "observe",
  UNDERSTAND: "compreenda_entenda",
  CONNECT: "conecte",
  INTERPRETATION_CAUTION: "cuidado_para_nao_confundir",
  DEEPEN: "aprofunde",
  APPLY: "aplique",
  REFLECT: "reflita",
  JOURNEY_TAKEAWAY: "levamos_da_jornada",
  PRACTICE_TODAY: "pratique_hoje",
  REFLECTION_QUESTIONS: "para_refletir",
  JOURNAL_PROMPT: "registrar_diario",
  PRAYER: "ore",
  KEEP: "para_guardar",
  GROUP_MODE: "modo_grupo",
  CONTINUE_JOURNEY: "continue_jornada",
  REFERENCES: "referencias",
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
    estimatedMinutes:
      raw.estimatedMinutes as unknown as Study["estimatedMinutes"],
    heroImage: `track-02-study-${String(raw.number).padStart(2, "0")}-hero`,
    nextStudyId:
      raw.nextStudyId === null ? null : (raw.nextStudyId as StudyId),
    audienceLevel: null,
    tags: [],
    published: false,
  };
}

function toSection(
  studyId: StudyId,
  raw: (typeof rawSectionsByStudy)[number]["sections"][number],
): StudySection {
  const suffix = `${raw.type.toLowerCase().replace(/_/g, "-")}-${
    raw.order
  }`;

  return {
    id: `${studyId}-${suffix}` as StudySectionId,
    studyId,
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

const sections: readonly StudySection[] = rawSectionsByStudy.flatMap((entry) => {
  const studyId = entry.studyId as StudyId;
  return entry.sections.map((section) => toSection(studyId, section));
});

export const track02DraftBatchPackage: StudyContentPackage = {
  contentVersion: "draft-track-02-studies-02-10-v1",
  tracks: [track],
  studies,
  sections,
  references: [],
};
