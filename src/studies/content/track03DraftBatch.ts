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

export const TRACK_03_DRAFT_BATCH_PROFILE = "JOURNEY_20_30_V1" as const;
export const TRACK_03_DRAFT_BATCH_EDITORIAL_STATUS = "DRAFT" as const;
export const TRACK_03_DRAFT_BATCH_PUBLISHED = false as const;
export const TRACK_03_DRAFT_BATCH_RUNTIME_ELIGIBLE = false as const;

const TRACK_03_ID = "track-03" as StudyTrackId;

const track: StudyTrack = {
  id: TRACK_03_ID,
  slug: "conhecendo-jesus" as StudyTrackSlug,
  title: "Conhecendo Jesus Cristo",
  description: "Conhecendo Jesus Cristo",
  type: "FORMATION",
  contentProfile: TRACK_03_DRAFT_BATCH_PROFILE,
  cardImage: "track-03-card",
  heroImage: "track-03-hero",
  order: 3,
  published: true,
};

export const track03DraftBatchEditorialSources = [
  {
    "studyNumber": 1,
    "studyId": "track-03-study-01",
    "candidateSha256": "18B6138EDD9161D54080D50848033BE8AF2E213B916535CC53B6F9E670E72BE9",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_01_O_Verbo.pdf",
    "sourceBytes": 630234,
    "sourceSha256": "8ED2DEB730BA129A737DC355D4CA66AE5A6188126DA267EC3FD664AF7E707F50",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "JOAO 1:14",
      "JOAO 1:1-18",
      "GENESIS 1:1-3",
      "COLOSSENSES 1:15-17",
      "HEBREUS 1:1-3",
      "FILIPENSES 2:5-8",
      "GENESIS 1:1",
      "JOAO 1:1-3"
    ]
  },
  {
    "studyNumber": 2,
    "studyId": "track-03-study-02",
    "candidateSha256": "89DF937A6784F06D204E615D462E2251A1E134100EDC7DFCE88FBA5C08364E74",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_02_Filho_De_Deus.pdf",
    "sourceBytes": 629729,
    "sourceSha256": "19D463F45D41829C77F20F5176CD804EAE428DD3CAB1D8242D42F2E573673AC2",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MATEUS 16:16",
      "MATEUS 16:13-17",
      "MATEUS 3:16-17",
      "JOAO 5:19-23",
      "JOAO 10:30-38",
      "JOAO 20:30-31",
      "ROMANOS 1:1-4",
      "JOAO 20:31"
    ]
  },
  {
    "studyNumber": 3,
    "studyId": "track-03-study-03",
    "candidateSha256": "03B7C9D6892E11013284D6E529B0EDB65D9DD10EB0A3E5D255DC096BBB09308A",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_03_Filho_Do_Homem.pdf",
    "sourceBytes": 629177,
    "sourceSha256": "64B6BF27C0DA45237E029B5BE1F7FC90B28250B3A2CE8E402A1784B5B0B51833",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MARCOS 10:45",
      "MARCOS 10:32-45",
      "DANIEL 7:13-14",
      "MARCOS 2:10-12",
      "MARCOS 8:31-38",
      "MARCOS 14:61-64"
    ]
  },
  {
    "studyNumber": 4,
    "studyId": "track-03-study-04",
    "candidateSha256": "201B0B76EAA9E4F310DA18C85CF7346D8B0814B3C15483BFAC1DE76745199B4D",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_04_Messias.pdf",
    "sourceBytes": 629630,
    "sourceSha256": "9344E929CDFFD223ECADFEC884CED4FDD15A41D5F3EB1DC190B7BFFFC37A48FC",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "LUCAS 4:21",
      "LUCAS 4:16-21",
      "2 SAMUEL 7:12-16",
      "ISAIAS 9:6-7",
      "ISAIAS 61:1-2",
      "MATEUS 16:13-23",
      "ATOS 2:29-36",
      "LUCAS 4:18-21",
      "ATOS 2:36"
    ]
  },
  {
    "studyNumber": 5,
    "studyId": "track-03-study-05",
    "candidateSha256": "F1B6C6F3433B07FD205C0FA1BCB6A4B31B0AD58B6788F3FED3A85B373E538CF6",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_05_O_Cordeiro.pdf",
    "sourceBytes": 629409,
    "sourceSha256": "B9DF8AF6177037C25589B98ABC6095A5EFBD3CBC47B415527EE129468B9652D1",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "JOAO 1:29",
      "JOAO 1:29-36",
      "EXODO 12:1-13",
      "ISAIAS 53:4-7",
      "1 CORINTIOS 5:7",
      "1 PEDRO 1:18-19",
      "APOCALIPSE 5:6-14",
      "APOCALIPSE 5:9-10"
    ]
  },
  {
    "studyNumber": 6,
    "studyId": "track-03-study-06",
    "candidateSha256": "64B3BD56DA1EAEAD7AFE00F5844A9CEEDBE63CC5C1FA2738593C400A44494E8F",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_06_Rei.pdf",
    "sourceBytes": 629893,
    "sourceSha256": "7C7B29591DFE1ED7D75FF76A91C987181ED9DB839C80C3C5A9BA855F72F23856",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "JOAO 18:36",
      "JOAO 18:33-38",
      "2 SAMUEL 7:12-16",
      "LUCAS 1:30-33",
      "MATEUS 21:1-9",
      "FILIPENSES 2:9-11",
      "APOCALIPSE 19:11-16",
      "JOAO 18:36-37",
      "LUCAS 1:32-33"
    ]
  },
  {
    "studyNumber": 7,
    "studyId": "track-03-study-07",
    "candidateSha256": "313BBDC7DFE5622FD2C8562B656E88A546C39B93E2928746676E8E5E61680C78",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_07_Senhor.pdf",
    "sourceBytes": 629288,
    "sourceSha256": "D262820500E5B501CC01826319A2EDFBFC96BDF9CABE63E5D7B93C841F6F05E3",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "FILIPENSES 2:11",
      "FILIPENSES 2:5-11",
      "ATOS 2:32-36",
      "ROMANOS 10:9-13",
      "1 CORINTIOS 8:5-6",
      "COLOSSENSES 2:6-7",
      "1 CORINTIOS 8:6",
      "FILIPENSES 2:9-11",
      "ROMANOS 10:9"
    ]
  },
  {
    "studyNumber": 8,
    "studyId": "track-03-study-08",
    "candidateSha256": "5B03F2BA5A92A441DCD8660D92A38E9F74BCE47429EC05E309ABD4D3869C8F36",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_08_Sumo_Sacerdote.pdf",
    "sourceBytes": 629216,
    "sourceSha256": "7E7B73DFED446DFDAE30E56FA2A68D4F93D4AEF198DB12551417FEB9574F9ADF",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "HEBREUS 4:16",
      "HEBREUS 4:14-16",
      "HEBREUS 7:23-28",
      "HEBREUS 9:11-15",
      "HEBREUS 10:19-22",
      "LEVITICO 16:1-22",
      "HEBREUS 4:15-16",
      "HEBREUS 7:25"
    ]
  },
  {
    "studyNumber": 9,
    "studyId": "track-03-study-09",
    "candidateSha256": "E0D925B1D0A3FC1A5943C832B63DF82BFDBB964EE9D4529863EE24D0F39A9FE5",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_09_Encarnacao.pdf",
    "sourceBytes": 629051,
    "sourceSha256": "7870EEFDF7FDF8426877F1273AFEBAC445240CC41B1B689AF42E40F4BCB0BE57",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "JOAO 1:14",
      "FILIPENSES 2:5-8",
      "JOAO 1:14-18",
      "LUCAS 1:26-38",
      "HEBREUS 2:14-18",
      "GALATAS 4:4-5",
      "HEBREUS 2:17-18"
    ]
  },
  {
    "studyNumber": 10,
    "studyId": "track-03-study-10",
    "candidateSha256": "D73BB01526BBFF9863317726DF5CC12C28B1BEDAD8EDB2DD610308D24D143BB8",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_10_Ministerio.pdf",
    "sourceBytes": 629183,
    "sourceSha256": "212F6CC98F1B78FFDE767070BD1C54B673D2D7A460D5EEF6970FD4A9A86DCB57",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MARCOS 1:15",
      "MARCOS 1:14-39",
      "LUCAS 4:16-21",
      "MATEUS 9:35-38",
      "MARCOS 2:13-17",
      "MARCOS 3:13-15",
      "ATOS 10:37-38",
      "MARCOS 1:35"
    ]
  },
  {
    "studyNumber": 11,
    "studyId": "track-03-study-11",
    "candidateSha256": "E191EF6000489060D650498F1B931F562F0E21315B544D052A33D8FCB827BEEB",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_11_Milagres.pdf",
    "sourceBytes": 629777,
    "sourceSha256": "3BC1D4DB0044FD2AFCA51AE1187A8D7C446B2DA30261BF1BFEBFF8913EBA309A",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MARCOS 4:41",
      "MARCOS 4:35-41",
      "MARCOS 2:1-12",
      "MARCOS 5:21-43",
      "JOAO 2:1-11",
      "JOAO 20:30-31",
      "MATEUS 11:2-6"
    ]
  },
  {
    "studyNumber": 12,
    "studyId": "track-03-study-12",
    "candidateSha256": "1C7CEDBD06A99080DEA27F3E98830FC6FB94B4890AD4697BBA2F24CE5E705384",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_12_Ensino.pdf",
    "sourceBytes": 629054,
    "sourceSha256": "3384B2D822B4F95480831EAE71861D31F089448C40DEDC3E2BAA0AAF56D17B8A",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MATEUS 7:24",
      "MATEUS 7:24-29",
      "MATEUS 5:1-12",
      "MATEUS 5:21-48",
      "MATEUS 6:1-18",
      "MARCOS 4:1-20",
      "LUCAS 10:25-37",
      "MATEUS 7:24-25",
      "MATEUS 7:28-29"
    ]
  },
  {
    "studyNumber": 13,
    "studyId": "track-03-study-13",
    "candidateSha256": "E659C2D1B9EF78B4339182C19F78CE19E21866F3860FE8588C61E81D1A7B994C",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_13_Cruz.pdf",
    "sourceBytes": 629281,
    "sourceSha256": "3620FB7A8DE9F4B13B04D5391065219CF71DE6B2AE775B51875A40FAEEA3B12A",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "1 CORINTIOS 15:3",
      "MARCOS 15:21-39",
      "ISAIAS 53:4-6",
      "JOAO 10:17-18",
      "ROMANOS 5:6-11",
      "2 CORINTIOS 5:18-21",
      "COLOSSENSES 2:13-15",
      "1 CORINTIOS 15:3-4",
      "ROMANOS 5:8"
    ]
  },
  {
    "studyNumber": 14,
    "studyId": "track-03-study-14",
    "candidateSha256": "DB20712FA852B6D0A31767CF81BDF82DB53FD09ACEFCAA233B2D3393E85390A7",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_14_Ressurreicao.pdf",
    "sourceBytes": 629111,
    "sourceSha256": "ED94E5BF82CCAA231D30E6A690505F06F6D71CF14A5451B5599EBE8855C2F733",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "LUCAS 24:6",
      "LUCAS 24:1-12",
      "JOAO 20:19-29",
      "ATOS 2:22-36",
      "ROMANOS 6:4-11",
      "1 CORINTIOS 15:12-22",
      "1 PEDRO 1:3-5",
      "ROMANOS 6:4",
      "LUCAS 24:5-6",
      "1 CORINTIOS 15:20"
    ]
  },
  {
    "studyNumber": 15,
    "studyId": "track-03-study-15",
    "candidateSha256": "2192CDBE9B384E57BD78C3DE626704970CA4F7558F4942D2AE2765B218ADA4C3",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_15_Ascensao.pdf",
    "sourceBytes": 628901,
    "sourceSha256": "B43A8A529AB950B1C5CEBDB288D60AA11108B77FBFC9E07DC87485D380E24FDE",
    "sourcePageCount": 4,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "ATOS 1:11",
      "ATOS 1:1-11",
      "LUCAS 24:50-53",
      "EFESIOS 1:19-23",
      "FILIPENSES 2:9-11",
      "HEBREUS 10:11-13",
      "SALMO 110:1",
      "ATOS 1:8"
    ]
  },
  {
    "studyNumber": 16,
    "studyId": "track-03-study-16",
    "candidateSha256": "4B9F80283FE4374A22F5F940902C1CF24D1FCFE1330E49187F13AFDDD57C531D",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_16_Intercessao.pdf",
    "sourceBytes": 631402,
    "sourceSha256": "6FF3B17C55152AA5CDCEA897A3D16A3512EF190FB180E4A3BFEAD6360309B444",
    "sourcePageCount": 5,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "ROMANOS 8:34",
      "ROMANOS 8:31-39",
      "HEBREUS 7:23-28",
      "HEBREUS 9:24",
      "LUCAS 22:31-32",
      "1 JOAO 2:1-2",
      "HEBREUS 4:14-16",
      "HEBREUS 7:25"
    ]
  },
  {
    "studyNumber": 17,
    "studyId": "track-03-study-17",
    "candidateSha256": "464D17FEB651216BE78EC9F48F69EA1CF384E2B6A420EDB3EDA492BFC70C30D8",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_17_Retorno.pdf",
    "sourceBytes": 631002,
    "sourceSha256": "C390A28EB89A5EECBB74539A0B6DD4FB55727E06E90CF6D9BDC8A01E590B7144",
    "sourcePageCount": 5,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "1 TESSALONICENSES 4:13-18",
      "JOAO 14:1-3",
      "ATOS 1:9-11",
      "MATEUS 24:36-44",
      "TITO 2:11-14",
      "1 CORINTIOS 15:51-58",
      "APOCALIPSE 22:20",
      "1 TESSALONICENSES 4:16-18",
      "ATOS 1:11"
    ]
  },
  {
    "studyNumber": 18,
    "studyId": "track-03-study-18",
    "candidateSha256": "8FD29C0D12B6CB4A0D1599865122838256DCE9AF06E9785C95BCFA69F9FA94B7",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_18_Reino.pdf",
    "sourceBytes": 631192,
    "sourceSha256": "C9008C54AB6EEEA780DA82191ACC36CA44BE0FF2A9F109A3324C6647570EC4B7",
    "sourcePageCount": 5,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "1 CORINTIOS 15:25",
      "1 CORINTIOS 15:20-28",
      "MARCOS 1:14-15",
      "MATEUS 6:9-10",
      "LUCAS 17:20-21",
      "COLOSSENSES 1:13-14",
      "APOCALIPSE 11:15",
      "APOCALIPSE 21:1-5",
      "1 CORINTIOS 15:25-26",
      "MATEUS 6:10"
    ]
  },
  {
    "studyNumber": 19,
    "studyId": "track-03-study-19",
    "candidateSha256": "DE1B8B36EE6FC3EF8124D6C9A58B372618CE31FA78233741F9A038463C27CD57",
    "sourceRelativePath": "trilha_03\\Biblia_Jornada_Trilha_3_Estudo_19_Juizo_E_Restauracao.pdf",
    "sourceBytes": 631966,
    "sourceSha256": "9D6E56CA17E19B38059AB0F5BCFF2072EDE83C59FC4FEA757771E8C33428BC88",
    "sourcePageCount": 5,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "JOAO 5:27",
      "JOAO 5:22-29",
      "MATEUS 25:31-46",
      "ATOS 17:30-31",
      "2 CORINTIOS 5:10",
      "APOCALIPSE 20:11-15",
      "APOCALIPSE 21:1-5",
      "APOCALIPSE 22:1-5",
      "JOAO 20:31",
      "FILIPENSES 2:9-11"
    ]
  }
] as const;

const rawStudies = [
  {
    "id": "track-03-study-01",
    "trackId": "track-03",
    "number": 1,
    "slug": "o-verbo-antes-de-belem-ele-ja-era",
    "title": "O Verbo: antes de Belém, Ele já era",
    "summary": "O Verbo: antes de Belém, Ele já era",
    "questionCentral": "Quem é Jesus antes mesmo de chegarmos ao seu nascimento em Belém?",
    "objective": "Compreender que Jesus não começa a existir em Belém. O Novo Testamento o apresenta como o Verbo eterno, junto de Deus e participante da criação, que entrou na história e se fez verdadeiramente humano.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-02",
    "published": false
  },
  {
    "id": "track-03-study-02",
    "trackId": "track-03",
    "number": 2,
    "slug": "filho-de-deus-uma-identidade-que-muda-tudo",
    "title": "Filho de Deus: uma identidade que muda tudo",
    "summary": "Filho de Deus: uma identidade que muda tudo",
    "questionCentral": "O que significa chamar Jesus de Filho de Deus - e o que essa identidade revela sobre sua relação com o Pai e conosco?",
    "objective": "Compreender que “Filho de Deus” não significa que Jesus seja uma criatura produzida por Deus. No Novo Testamento, o título revela sua relação única com o Pai, sua autoridade e sua identidade.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-03",
    "published": false
  },
  {
    "id": "track-03-study-03",
    "trackId": "track-03",
    "number": 3,
    "slug": "filho-do-homem-gloria-servico-e-sofrimento",
    "title": "Filho do Homem: glória, serviço e sofrimento",
    "summary": "Filho do Homem: glória, serviço e sofrimento",
    "questionCentral": "Por que Jesus usava tanto o título “Filho do Homem” para falar de si mesmo?",
    "objective": "Compreender que o título “Filho do Homem” reúne a verdadeira humanidade de Jesus, sua missão de sofrer e servir e a autoridade gloriosa ligada à visão de Daniel 7.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-04",
    "published": false
  },
  {
    "id": "track-03-study-04",
    "trackId": "track-03",
    "number": 4,
    "slug": "messias-o-ungido-que-cumpre-a-esperanca",
    "title": "Messias: o Ungido que cumpre a esperança",
    "summary": "Messias: o Ungido que cumpre a esperança",
    "questionCentral": "O que significa chamar Jesus de Messias - e que tipo de Salvador Ele veio ser?",
    "objective": "Compreender que “Messias” significa o Ungido esperado por Israel e que Jesus cumpre essa esperança de modo maior que expectativas políticas ou militares.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-05",
    "published": false
  },
  {
    "id": "track-03-study-05",
    "trackId": "track-03",
    "number": 5,
    "slug": "o-cordeiro-o-rei-que-se-entrega",
    "title": "O Cordeiro: o Rei que se entrega",
    "summary": "O Cordeiro: o Rei que se entrega",
    "questionCentral": "Por que o Novo Testamento chama Jesus de Cordeiro de Deus - e o que essa imagem revela sobre sua obra?",
    "objective": "Compreender como a imagem do cordeiro reúne temas de sacrifício, libertação, sofrimento e vitória, e por que Jesus é apresentado como aquele que tira o pecado do mundo.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-06",
    "published": false
  },
  {
    "id": "track-03-study-06",
    "trackId": "track-03",
    "number": 6,
    "slug": "rei-um-reino-que-nao-se-parece-com-os-reinos-deste-mundo",
    "title": "Rei: um Reino que não se parece com os reinos deste mundo",
    "summary": "Rei: um Reino que não se parece com os reinos deste mundo",
    "questionCentral": "Que tipo de Rei é Jesus - e o que significa viver debaixo do seu governo?",
    "objective": "Compreender que Jesus é o Rei prometido da linhagem de Davi, mas seu Reino não é construído pela lógica de violência, propaganda e dominação dos reinos humanos.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-07",
    "published": false
  },
  {
    "id": "track-03-study-07",
    "trackId": "track-03",
    "number": 7,
    "slug": "senhor-quando-jesus-deixa-de-ser-apenas-parte-da-vida",
    "title": "Senhor: quando Jesus deixa de ser apenas parte da vida",
    "summary": "Senhor: quando Jesus deixa de ser apenas parte da vida",
    "questionCentral": "O que significa confessar que Jesus é Senhor - e até onde essa confissão alcança nossa vida?",
    "objective": "Compreender que chamar Jesus de Senhor é reconhecer sua autoridade, sua exaltação e nossa lealdade a Ele, não apenas usar uma expressão religiosa.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-08",
    "published": false
  },
  {
    "id": "track-03-study-08",
    "trackId": "track-03",
    "number": 8,
    "slug": "sumo-sacerdote-aquele-que-nos-representa-diante-de-deus",
    "title": "Sumo Sacerdote: aquele que nos representa diante de Deus",
    "summary": "Sumo Sacerdote: aquele que nos representa diante de Deus",
    "questionCentral": "O que significa Jesus ser nosso Sumo Sacerdote - e por que isso muda a maneira como nos aproximamos de Deus?",
    "objective": "Compreender que Hebreus apresenta Jesus como o Sumo Sacerdote definitivo, que conhece nossa fraqueza, oferece a si mesmo e abre acesso a Deus.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-09",
    "published": false
  },
  {
    "id": "track-03-study-09",
    "trackId": "track-03",
    "number": 9,
    "slug": "encarnacao-deus-entrou-em-nossa-historia",
    "title": "Encarnação: Deus entrou em nossa história",
    "summary": "Encarnação: Deus entrou em nossa história",
    "questionCentral": "O que realmente significa afirmar que o Filho de Deus se tornou humano?",
    "objective": "Compreender que a encarnação é a entrada real do Filho eterno na condição humana e que isso revela a proximidade de Deus e torna possível a obra redentora de Cristo.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-10",
    "published": false
  },
  {
    "id": "track-03-study-10",
    "trackId": "track-03",
    "number": 10,
    "slug": "ministerio-o-reino-de-deus-em-palavras-e-acoes",
    "title": "Ministério: o Reino de Deus em palavras e ações",
    "summary": "Ministério: o Reino de Deus em palavras e ações",
    "questionCentral": "O que Jesus veio fazer durante seu ministério público - e o que suas prioridades revelam?",
    "objective": "Compreender que o ministério de Jesus reúne anúncio do Reino, ensino, compaixão, cura, confronto do mal, formação de discípulos e caminhada consciente rumo à cruz.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-11",
    "published": false
  },
  {
    "id": "track-03-study-11",
    "trackId": "track-03",
    "number": 11,
    "slug": "milagres-sinais-que-apontam-para-quem-jesus-e",
    "title": "Milagres: sinais que apontam para quem Jesus é",
    "summary": "Milagres: sinais que apontam para quem Jesus é",
    "questionCentral": "Por que Jesus realizou milagres - e o que eles pretendem revelar além do acontecimento extraordinário?",
    "objective": "Compreender que os milagres de Jesus demonstram compaixão, autoridade e sinais do Reino, apontando para sua identidade, mas não foram realizados como espetáculo nem como fórmula para controlar Deus.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-12",
    "published": false
  },
  {
    "id": "track-03-study-12",
    "trackId": "track-03",
    "number": 12,
    "slug": "ensino-palavras-que-pedem-uma-vida-diferente",
    "title": "Ensino: palavras que pedem uma vida diferente",
    "summary": "Ensino: palavras que pedem uma vida diferente",
    "questionCentral": "O que torna o ensino de Jesus tão diferente - e por que ouvi-lo exige mais do que admiração?",
    "objective": "Compreender que Jesus ensina com autoridade, revela o coração do Reino e chama seus ouvintes a uma obediência que alcança motivações, relações e escolhas concretas.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-13",
    "published": false
  },
  {
    "id": "track-03-study-13",
    "trackId": "track-03",
    "number": 13,
    "slug": "cruz-o-rei-entrega-a-propria-vida",
    "title": "Cruz: o Rei entrega a própria vida",
    "summary": "Cruz: o Rei entrega a própria vida",
    "questionCentral": "O que a cruz revela sobre Jesus e sobre a maneira como Deus salva?",
    "objective": "Compreender que a cruz é o centro da missão redentora de Jesus, onde sua entrega voluntária trata o pecado, revela o amor de Deus e inaugura reconciliação e vitória.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-14",
    "published": false
  },
  {
    "id": "track-03-study-14",
    "trackId": "track-03",
    "number": 14,
    "slug": "ressurreicao-jesus-vive-e-a-historia-muda",
    "title": "Ressurreição: Jesus vive e a história muda",
    "summary": "Ressurreição: Jesus vive e a história muda",
    "questionCentral": "O que a ressurreição revela sobre Jesus e por que sem ela o Evangelho perde seu fundamento?",
    "objective": "Compreender que a ressurreição de Jesus é anunciada como acontecimento real, confirma sua identidade e obra, inaugura a nova criação e garante a esperança futura dos que pertencem a Cristo.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-15",
    "published": false
  },
  {
    "id": "track-03-study-15",
    "trackId": "track-03",
    "number": 15,
    "slug": "ascensao-o-cristo-exaltado-que-continua-sua-obra",
    "title": "Ascensão: o Cristo exaltado que continua sua obra",
    "summary": "Ascensão: o Cristo exaltado que continua sua obra",
    "questionCentral": "O que aconteceu quando Jesus ascendeu - e por que sua ascensão importa para a Igreja hoje?",
    "objective": "Compreender que a ascensão não significa que Jesus simplesmente foi embora. Ela marca sua exaltação, seu governo, o envio da Igreja em missão e a esperança de seu retorno.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-16",
    "published": false
  },
  {
    "id": "track-03-study-16",
    "trackId": "track-03",
    "number": 16,
    "slug": "intercessao-jesus-continua-agindo-por-nos",
    "title": "Intercessão: Jesus continua agindo por nós",
    "summary": "Intercessão: Jesus continua agindo por nós",
    "questionCentral": "O que significa dizer que Jesus intercede por nós - e que segurança isso oferece para a nossa caminhada?",
    "objective": "Compreender que o Cristo que morreu, ressuscitou e foi exaltado continua agindo em favor do seu povo, e que nossa segurança está nele, não em uma vida sem falhas.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-17",
    "published": false
  },
  {
    "id": "track-03-study-17",
    "trackId": "track-03",
    "number": 17,
    "slug": "retorno-o-rei-voltara",
    "title": "Retorno: o Rei voltará",
    "summary": "Retorno: o Rei voltará",
    "questionCentral": "O que a Bíblia realmente afirma sobre a volta de Jesus - e como essa esperança deve formar nossa vida?",
    "objective": "Compreender as certezas centrais sobre a volta de Cristo, evitando datas e especulações, e aprender a viver com esperança, vigilância, santidade e fidelidade.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-18",
    "published": false
  },
  {
    "id": "track-03-study-18",
    "trackId": "track-03",
    "number": 18,
    "slug": "reino-o-governo-de-cristo-ate-que-tudo-seja-restaurado",
    "title": "Reino: o governo de Cristo até que tudo seja restaurado",
    "summary": "Reino: o governo de Cristo até que tudo seja restaurado",
    "questionCentral": "Como o Reino de Jesus está presente hoje e como será sua plenitude no futuro?",
    "objective": "Compreender que Cristo já reina e seu Reino já começou a se manifestar, mas ainda esperamos o dia em que todo inimigo, inclusive a morte, será definitivamente vencido.",
    "estimatedMinutes": null,
    "nextStudyId": "track-03-study-19",
    "published": false
  },
  {
    "id": "track-03-study-19",
    "trackId": "track-03",
    "number": 19,
    "slug": "juizo-e-restauracao-o-rei-colocara-todas-as-coisas-em-ordem",
    "title": "Juízo e restauração: o Rei colocará todas as coisas em ordem",
    "summary": "Juízo e restauração: o Rei colocará todas as coisas em ordem",
    "questionCentral": "Como Jesus exercerá juízo e conduzirá a história para a restauração final?",
    "objective": "Compreender que o Novo Testamento apresenta Jesus como Salvador e Juiz, que seu juízo é justo e que o fim da história bíblica não é o triunfo do mal, mas a derrota definitiva do pecado e a restauração da criação.",
    "estimatedMinutes": null,
    "nextStudyId": null,
    "published": false
  }
] as const;

const rawSectionsByStudy = [
  {
    "studyId": "track-03-study-01",
    "sections": [
      {
        "id": "track-03-study-01-golden-text-1",
        "studyId": "track-03-study-01",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“E o Verbo se fez carne e habitou entre nós.” João 1:14",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-01-practical-truth-2",
        "studyId": "track-03-study-01",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Jesus não é apenas alguém que aponta para Deus; o Novo Testamento o apresenta como o Filho",
            "type": "PARAGRAPH"
          },
          {
            "text": "eterno que entrou na história para nos revelar Deus e nos trazer vida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-01-bible-reading-3",
        "studyId": "track-03-study-01",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: João 1:1-18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Gênesis 1:1-3 • Colossenses 1:15-17 • Hebreus 1:1-3 • Filipenses 2:5-8",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-01-before-understanding-4",
        "studyId": "track-03-study-01",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Quando pensamos em Jesus, muitas vezes começamos pela manjedoura. Belém é importante, mas o",
            "type": "PARAGRAPH"
          },
          {
            "text": "Evangelho de João começa muito antes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João não começa com Maria, José ou os pastores. Ele começa com uma frase que nos leva ao próprio início",
            "type": "PARAGRAPH"
          },
          {
            "text": "de todas as coisas: “No princípio...”. E ali já está o Verbo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que conhecer Jesus exige enxergá-lo como mais do que um grande mestre que apareceu na",
            "type": "PARAGRAPH"
          },
          {
            "text": "história. O menino que nasceu em Belém é apresentado pelo Novo Testamento como aquele que já existia",
            "type": "PARAGRAPH"
          },
          {
            "text": "antes de seu nascimento humano.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-01-read-5",
        "studyId": "track-03-study-01",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "João 1:1-18",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-01-observe-6",
        "studyId": "track-03-study-01",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "João 1 usa a expressão Verbo para falar daquele que depois identifica claramente como Jesus Cristo. O texto",
            "type": "PARAGRAPH"
          },
          {
            "text": "começa mostrando três verdades lado a lado: o Verbo já existia, estava com Deus e era Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu nascimento humano possui um começo na história, mas o Filho não é apresentado como uma criatura",
            "type": "PARAGRAPH"
          },
          {
            "text": "que passou a existir em Belém. Belém marca sua entrada real em nossa condição humana.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João também liga o Verbo à criação: todas as coisas foram feitas por meio dele. Colossenses 1 e Hebreus 1",
            "type": "PARAGRAPH"
          },
          {
            "text": "fazem a mesma ligação. Jesus não aparece apenas como alguém dentro do universo; é apresentado do lado",
            "type": "PARAGRAPH"
          },
          {
            "text": "do Criador.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois acontece algo surpreendente: o Verbo se faz carne. Ele entra de verdade em nossa história, conhece",
            "type": "PARAGRAPH"
          },
          {
            "text": "cansaço, fome, lágrimas, amizade, rejeição e sofrimento. Deus não salva de longe; em Cristo, aproxima-se.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma diferença importante",
            "type": "SUBHEADING"
          },
          {
            "text": "Belém marca a entrada do Filho em nossa condição humana, não o início de sua existência.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-01-understand-7",
        "studyId": "track-03-study-01",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "“Verbo” não significa que Jesus era apenas uma palavra falada. O próprio texto mostra que o Verbo é uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "pessoa, cria, vem ao mundo e se faz carne. A expressão comunica revelação: por meio do Filho, Deus se dá a",
            "type": "PARAGRAPH"
          },
          {
            "text": "conhecer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 1 termina dizendo que o Filho torna Deus conhecido. Quando olhamos para Jesus, não vemos apenas",
            "type": "PARAGRAPH"
          },
          {
            "text": "um mensageiro que fala sobre Deus. Encontramos aquele que revela o Pai de maneira incomparável.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A criação e a redenção se encontram em Cristo. O mesmo Filho relacionado ao começo de todas as coisas",
            "type": "PARAGRAPH"
          },
          {
            "text": "entra na história para restaurar uma criação quebrada. Essa linha atravessa a Bíblia: criação, queda,",
            "type": "PARAGRAPH"
          },
          {
            "text": "encarnação, redenção e nova criação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também precisamos manter duas verdades juntas: Jesus é verdadeiramente divino e verdadeiramente",
            "type": "PARAGRAPH"
          },
          {
            "text": "humano. Não é metade de cada coisa. O Filho eterno realmente assumiu nossa humanidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-01-connect-8",
        "studyId": "track-03-study-01",
        "type": "CONNECT",
        "title": "Olhe para o conjunto",
        "blocks": [
          {
            "text": "O Verbo é aquele por meio de quem Deus se dá a conhecer e aquele por meio de quem todas as",
            "type": "PARAGRAPH"
          },
          {
            "text": "coisas foram feitas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-01-interpretation-caution-9",
        "studyId": "track-03-study-01",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Jesus certamente é exemplo para nós, mas João 1 não permite reduzi-lo a “um homem muito bom”. Se Ele é",
            "type": "PARAGRAPH"
          },
          {
            "text": "quem o texto afirma, nossa resposta precisa ir além de admiração. Conhecer Jesus envolve fé, adoração e",
            "type": "PARAGRAPH"
          },
          {
            "text": "obediência.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-01-deepen-10",
        "studyId": "track-03-study-01",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "João começa com “No princípio”, linguagem que lembra Gênesis 1:1. O leitor é levado a enxergar a história",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Jesus dentro da própria história da criação. Não é apenas uma introdução bonita: é uma maneira de dizer",
            "type": "PARAGRAPH"
          },
          {
            "text": "que Cristo está ligado ao começo e ao destino de tudo o que Deus fez.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-01-apply-11",
        "studyId": "track-03-study-01",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Deixe Jesus ser maior do que a imagem que você construiu dele. Podemos criar um Jesus que apenas",
            "type": "PARAGRAPH"
          },
          {
            "text": "confirma nossos gostos e aparece quando precisamos de ajuda. João nos obriga a levantar os olhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leve a sério a proximidade de Deus. O Verbo se fez carne. Seu sofrimento, sua fragilidade e suas perguntas",
            "type": "PARAGRAPH"
          },
          {
            "text": "não são invisíveis para Cristo. Ele conheceu a experiência humana por dentro, sem pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leia os Evangelhos para conhecer uma pessoa, não apenas colecionar frases. Pergunte em cada cena: quem",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus é, como age, o que ama, o que confronta e o que revela sobre Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Responda com adoração. Se todas as coisas foram feitas por meio dele, Jesus merece mais que curiosidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "ou respeito. Quanto maior Cristo se torna aos nossos olhos, menos espaço sobra para tratá-lo como",
            "type": "PARAGRAPH"
          },
          {
            "text": "acessório.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma oração honesta",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus, corrige a imagem pequena que fiz de ti e ensina-me a conhecer-te como realmente és.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-01-journey-takeaway-12",
        "studyId": "track-03-study-01",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Antes de Belém, o Verbo já era. Ele estava com Deus, era Deus e todas as coisas foram feitas por meio dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois entrou na história e se fez carne.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O cristianismo não começa apenas com os ensinamentos de Jesus, mas com a identidade de Jesus. Quem Ele",
            "type": "PARAGRAPH"
          },
          {
            "text": "é determina a maneira como ouvimos tudo o que Ele diz e recebemos tudo o que fez.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus não é apenas alguém que aponta para Deus; o Novo Testamento o apresenta como o Filho",
            "type": "PARAGRAPH"
          },
          {
            "text": "eterno que entrou na história para nos revelar Deus e nos trazer vida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-01-practice-today-13",
        "studyId": "track-03-study-01",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Leia João 1:1-18 novamente. Anote três afirmações do texto sobre quem Jesus é. Depois transforme cada",
            "type": "PARAGRAPH"
          },
          {
            "text": "afirmação em uma frase simples de adoração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-01-reflection-questions-14",
        "studyId": "track-03-study-01",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Eu costumo pensar em Jesus apenas a partir de seu nascimento terreno?•",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que muda quando compreendo que Ele já existia antes de Belém?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho tratado Jesus mais como conselheiro do que como Senhor?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que aspecto de João 1 mais amplia minha visão de Cristo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-01-journal-prompt-15",
        "studyId": "track-03-study-01",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que imagem pequena de Jesus eu preciso abandonar depois de ler João 1?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-01-prayer-16",
        "studyId": "track-03-study-01",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, abre meus olhos para te conhecer como realmente és. Não permitas que eu te reduza a",
            "type": "PARAGRAPH"
          },
          {
            "text": "um personagem religioso ou apenas a alguém que me ajuda quando preciso. Obrigado porque",
            "type": "PARAGRAPH"
          },
          {
            "text": "entraste em nossa história e te aproximaste de nós. Ensina-me a confiar em ti, adorar-te e viver diante",
            "type": "PARAGRAPH"
          },
          {
            "text": "da tua grandeza. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-01-keep-17",
        "studyId": "track-03-study-01",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "João 1:1-3 - observe o que o texto afirma sobre o Verbo antes da criação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 1:14 - guarde a verdade de que o Verbo se fez carne.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-01-group-mode-18",
        "studyId": "track-03-study-01",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que João 1 afirma sobre Jesus antes de seu nascimento?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que é insuficiente tratar Jesus apenas como um grande mestre?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como enxergar a grandeza de Cristo pode mudar nossa adoração e nossa vida?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-01-continue-journey-19",
        "studyId": "track-03-study-01",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 02 - Filho de Deus: uma identidade que muda tudo. O que significa chamar Jesus de Filho de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-01-references-20",
        "studyId": "track-03-study-01",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "João 1:1-18 • Gênesis 1:1-3 • Colossenses 1:15-17 • Hebreus 1:1-3 • Filipenses 2:5-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-02",
    "sections": [
      {
        "id": "track-03-study-02-golden-text-1",
        "studyId": "track-03-study-02",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Tu és o Cristo, o Filho do Deus vivo.” Mateus 16:16",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-02-practical-truth-2",
        "studyId": "track-03-study-02",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Reconhecer Jesus como Filho de Deus é receber sua identidade com seriedade e aprender a confiar",
            "type": "PARAGRAPH"
          },
          {
            "text": "no Pai por meio dele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-02-bible-reading-3",
        "studyId": "track-03-study-02",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Mateus 16:13-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Mateus 3:16-17 • João 5:19-23 • João 10:30-38 • João 20:30-31 • Romanos 1:1-4",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-02-before-understanding-4",
        "studyId": "track-03-study-02",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "“Filho de Deus” é uma expressão conhecida, mas pode ser entendida de maneira errada se aplicarmos",
            "type": "PARAGRAPH"
          },
          {
            "text": "automaticamente a Deus nossa experiência humana de paternidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Entre nós, um filho começa a existir depois dos pais. Por isso alguém pode imaginar que Jesus foi criado por",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus e depois recebeu o título de Filho. O Novo Testamento não o apresenta assim.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Filho já existia antes de seu nascimento humano e possui uma relação única com o Pai. Precisamos deixar",
            "type": "PARAGRAPH"
          },
          {
            "text": "os próprios Evangelhos explicar o título.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-02-read-5",
        "studyId": "track-03-study-02",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Mateus 16:13-17",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-02-observe-6",
        "studyId": "track-03-study-02",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Em Mateus 16, Jesus pergunta aos discípulos quem eles dizem que Ele é. Pedro responde: “Tu és o Cristo, o",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filho do Deus vivo.”. A fé precisa sair da opinião da multidão e chegar a uma resposta pessoal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "No batismo e na transfiguração, a voz do Pai identifica Jesus como seu Filho amado. O título não nasce",
            "type": "PARAGRAPH"
          },
          {
            "text": "apenas da admiração de seguidores.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 5 mostra Jesus falando de sua unidade de obra com o Pai. Seus ouvintes entendem que Ele está",
            "type": "PARAGRAPH"
          },
          {
            "text": "fazendo afirmações extraordinárias sobre sua relação com Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 20 diz que os sinais foram registrados para que creiamos que Jesus é o Cristo, o Filho de Deus, e",
            "type": "PARAGRAPH"
          },
          {
            "text": "tenhamos vida em seu nome. Quem Jesus é está ligado àquilo que Ele oferece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fé se torna pessoal",
            "type": "SUBHEADING"
          },
          {
            "text": "Em algum momento, cada discípulo precisa responder à pergunta de Jesus: “Quem você diz que eu",
            "type": "PARAGRAPH"
          },
          {
            "text": "sou?”",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-02-understand-7",
        "studyId": "track-03-study-02",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "“Filho” fala de relação, não de criação. João 1 já mostrou que o Filho existia antes de todas as coisas. Por isso",
            "type": "PARAGRAPH"
          },
          {
            "text": "o título não deve ser lido como se Jesus tivesse sido produzido como criatura.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Filho revela o Pai. Jesus não é o Pai, mas torna o Pai conhecido de maneira única. Sua obediência ao Pai",
            "type": "PARAGRAPH"
          },
          {
            "text": "não significa inferioridade de valor; revela amor, unidade de propósito e missão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento também chama os que creem de filhos de Deus por adoção. Isso não nos coloca no",
            "type": "PARAGRAPH"
          },
          {
            "text": "mesmo lugar singular de Jesus. Cristo é o Filho por meio de quem somos recebidos como filhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Assim, a identidade de Jesus protege nossa própria identidade. Não precisamos ocupar o centro. Podemos",
            "type": "PARAGRAPH"
          },
          {
            "text": "ser recebidos, amados e conduzidos por Deus por meio do Filho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-02-connect-8",
        "studyId": "track-03-study-02",
        "type": "CONNECT",
        "title": "Não aplique nossa biologia a Deus",
        "blocks": [
          {
            "text": "O título “Filho de Deus” precisa ser entendido pelo conjunto do Novo Testamento, não pela ideia de",
            "type": "PARAGRAPH"
          },
          {
            "text": "que Jesus teria sido criado depois do Pai.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-02-interpretation-caution-9",
        "studyId": "track-03-study-02",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Algumas leituras usam “Filho de Deus” para diminuir Jesus a um ser celestial abaixo de Deus. O conjunto do",
            "type": "PARAGRAPH"
          },
          {
            "text": "Novo Testamento, porém, fala do Filho de maneira muito mais elevada. João 1, João 5, Colossenses 1 e",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 1 precisam permanecer na conversa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-02-deepen-10",
        "studyId": "track-03-study-02",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Jesus chama Deus de “meu Pai” de forma que comunica uma relação única. Ao mesmo tempo, ensina seus",
            "type": "PARAGRAPH"
          },
          {
            "text": "discípulos a chamar Deus de Pai. A diferença é importante: Ele é o Filho de maneira singular; nós somos",
            "type": "PARAGRAPH"
          },
          {
            "text": "recebidos na família pela graça.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-02-apply-11",
        "studyId": "track-03-study-02",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Não responda apenas com a definição correta. Pedro acertou o título, mas ainda precisaria aprender o",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminho da cruz. Doutrina verdadeira precisa alcançar a vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receba sua identidade sem competir com o Filho. Sua dignidade não depende de ser o centro da realidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Cristo, você é recebido pela graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aprenda com a relação de Jesus com o Pai. Ele vive em oração, dependência e obediência. Se o Filho",
            "type": "PARAGRAPH"
          },
          {
            "text": "encarnado vive assim, autonomia absoluta não é sinal de maturidade espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Talvez sua experiência com pais humanos tenha ferido a palavra “pai”. Não use o fracasso humano para",
            "type": "PARAGRAPH"
          },
          {
            "text": "definir Deus. Olhe para a maneira como Jesus revela o Pai.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo abre o caminho para a família",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não somos filhos no mesmo sentido único de Jesus; somos recebidos por graça por meio do Filho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-02-journey-takeaway-12",
        "studyId": "track-03-study-02",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus é o Filho de Deus. O título fala de sua relação única com o Pai, de sua autoridade e de sua identidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não é uma criatura elevada ao posto de Filho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E é por meio desse Filho que pecadores são recebidos na família de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Reconhecer Jesus como Filho de Deus é receber sua identidade com seriedade e aprender a confiar",
            "type": "PARAGRAPH"
          },
          {
            "text": "no Pai por meio dele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-02-practice-today-13",
        "studyId": "track-03-study-02",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Leia Mateus 16:13-17 e escreva sua própria resposta à pergunta de Jesus. Não faça uma resposta bonita.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça uma resposta sincera e pergunte o que ela exige da sua vida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-02-reflection-questions-14",
        "studyId": "track-03-study-02",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "O que eu entendia antes pela expressão “Filho de Deus”?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha vida demonstra que minha resposta sobre Jesus vai além de palavras?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho dificuldade de pensar em Deus como Pai por causa de experiências humanas?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como Jesus pode corrigir minha imagem do Pai?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-02-journal-prompt-15",
        "studyId": "track-03-study-02",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Quem Jesus é para mim hoje - e o que minha rotina revela sobre essa resposta?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-02-prayer-16",
        "studyId": "track-03-study-02",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pai, obrigado porque enviaste teu Filho. Senhor Jesus, ajuda-me a conhecer-te não apenas por títulos,",
            "type": "PARAGRAPH"
          },
          {
            "text": "mas em verdade. Corrige minhas ideias erradas sobre ti e sobre o Pai. Ensina-me a viver como alguém",
            "type": "PARAGRAPH"
          },
          {
            "text": "recebido pela graça, sem orgulho e sem medo. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-02-keep-17",
        "studyId": "track-03-study-02",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Mateus 16:16 - a confissão de Pedro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 20:31 - veja por que João escreveu seu Evangelho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-02-group-mode-18",
        "studyId": "track-03-study-02",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que o título “Filho de Deus” comunica nos textos estudados?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que não devemos entendê-lo como se Jesus fosse uma criatura?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a relação de Jesus com o Pai pode ensinar nossa própria vida com Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-02-continue-journey-19",
        "studyId": "track-03-study-02",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 03 - Filho do Homem: glória, serviço e sofrimento. Por que Jesus usava tanto esse título para",
            "type": "PARAGRAPH"
          },
          {
            "text": "falar de si mesmo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-02-references-20",
        "studyId": "track-03-study-02",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Mateus 16:13-17 • Mateus 3:16-17 • João 5:19-23 • João 10:30-38 • João 20:30-31 • Romanos 1:1-4",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-03",
    "sections": [
      {
        "id": "track-03-study-03-golden-text-1",
        "studyId": "track-03-study-03",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“O Filho do Homem não veio para ser servido, mas para servir e dar a sua vida em resgate por muitos.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Marcos 10:45",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-03-practical-truth-2",
        "studyId": "track-03-study-03",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Seguir o Filho do Homem é aprender que autoridade sem serviço se deforma e que serviço fiel não é",
            "type": "PARAGRAPH"
          },
          {
            "text": "invisível para Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-03-bible-reading-3",
        "studyId": "track-03-study-03",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Marcos 10:32-45",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Daniel 7:13-14 • Marcos 2:10-12 • Marcos 8:31-38 • Marcos 14:61-64",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-03-before-understanding-4",
        "studyId": "track-03-study-03",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Jesus chamou a si mesmo de Filho do Homem muitas vezes. Para nós, a expressão pode parecer apenas uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "maneira de dizer “ser humano”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nos Evangelhos, porém, ela carrega mais de uma camada. Jesus realmente é humano. Ao mesmo tempo, o",
            "type": "PARAGRAPH"
          },
          {
            "text": "título se conecta à figura de Daniel 7, que recebe domínio e reino diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus usa o mesmo título quando fala de sofrimento, serviço, autoridade e glória.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-03-read-5",
        "studyId": "track-03-study-03",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Marcos 10:32-45",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-03-observe-6",
        "studyId": "track-03-study-03",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Marcos 10 acontece a caminho de Jerusalém. Jesus anuncia sua morte e ressurreição. Logo depois, Tiago e",
            "type": "PARAGRAPH"
          },
          {
            "text": "João pedem lugares de destaque. Eles imaginam glória antes de entender a cruz.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus responde redefinindo grandeza: os governantes dominam, mas entre seus discípulos não deve ser",
            "type": "PARAGRAPH"
          },
          {
            "text": "assim. Quem deseja ser grande deve servir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Então Ele usa a si mesmo como centro da explicação: o Filho do Homem não veio para ser servido, mas para",
            "type": "PARAGRAPH"
          },
          {
            "text": "servir e dar sua vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Daniel 7 acrescenta outra dimensão. Uma figura “como filho de homem” recebe domínio sobre povos e",
            "type": "PARAGRAPH"
          },
          {
            "text": "nações. O mesmo título reúne serviço e autoridade, sofrimento e glória.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O mesmo título reúne dois movimentos",
            "type": "SUBHEADING"
          },
          {
            "text": "Humilhação e glória. Serviço e reino. Sofrimento e autoridade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-03-understand-7",
        "studyId": "track-03-study-03",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Jesus é verdadeiramente humano. Sente fome, cansaço, tristeza e dor. O Filho eterno assumiu de verdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossa humanidade, e isso torna nossa oração mais concreta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Daniel 7 amplia o título. A figura recebe domínio de Deus; por isso “Filho do Homem” não significa apenas",
            "type": "PARAGRAPH"
          },
          {
            "text": "“um homem qualquer”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Jesus, autoridade e serviço não se contradizem. Ele possui autoridade para perdoar pecados e também se",
            "type": "PARAGRAPH"
          },
          {
            "text": "coloca como servo. Seu poder não vira abuso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz redefine o caminho da glória. Os discípulos queriam posição sem entrega. Jesus mostra que o Reino",
            "type": "PARAGRAPH"
          },
          {
            "text": "não funciona pela lógica da autopromoção.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-03-connect-8",
        "studyId": "track-03-study-03",
        "type": "CONNECT",
        "title": "A autoridade de Cristo serve",
        "blocks": [
          {
            "text": "O Filho do Homem não usa poder para alimentar o ego, mas para cumprir o propósito de Deus e",
            "type": "PARAGRAPH"
          },
          {
            "text": "buscar o bem das pessoas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-03-interpretation-caution-9",
        "studyId": "track-03-study-03",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "“Carregar a cruz” não significa aceitar violência doméstica, exploração ou manipulação religiosa. A entrega de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus é voluntária e pertence à sua missão única. Serviço cristão nunca é licença para alguém impor",
            "type": "PARAGRAPH"
          },
          {
            "text": "sofrimento ao outro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-03-deepen-10",
        "studyId": "track-03-study-03",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Em Daniel 7, poderes humanos são retratados como feras. Depois surge alguém “como filho de homem”,",
            "type": "PARAGRAPH"
          },
          {
            "text": "recebendo domínio do Ancião de Dias. A imagem contrasta reinos desumanos com um governo recebido de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus. Quando Jesus retoma essa linguagem, coloca-se dentro dessa esperança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-03-apply-11",
        "studyId": "track-03-study-03",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Reavalie sua ideia de grandeza. O mundo mede sucesso por influência, dinheiro, seguidores e posição. Jesus",
            "type": "PARAGRAPH"
          },
          {
            "text": "coloca serviço no centro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não se envergonhe da humanidade de Jesus. O Evangelho mostra alguém que chorou, cansou e sofreu. Isso",
            "type": "PARAGRAPH"
          },
          {
            "text": "não diminui sua grandeza; aproxima nossa oração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Use autoridade para servir. Se você lidera em casa, no trabalho ou na igreja, pergunte quem está melhor",
            "type": "PARAGRAPH"
          },
          {
            "text": "porque você possui alguma influência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Espere a glória sem buscar atalhos. Nem toda invisibilidade é fracasso. Deus vê fidelidade que ninguém",
            "type": "PARAGRAPH"
          },
          {
            "text": "aplaude.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu desejo de crescer inclui o desejo real de servir?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-03-journey-takeaway-12",
        "studyId": "track-03-study-03",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "O Filho do Homem é verdadeiramente humano, serve, sofre e recebe glória. Jesus reúne no mesmo título",
            "type": "PARAGRAPH"
          },
          {
            "text": "humildade e autoridade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso corrige nossa ideia de poder e nossa ideia de discipulado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Seguir o Filho do Homem é aprender que autoridade sem serviço se deforma e que serviço fiel não é",
            "type": "PARAGRAPH"
          },
          {
            "text": "invisível para Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-03-practice-today-13",
        "studyId": "track-03-study-03",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha hoje uma forma concreta de servir alguém sem anunciar o que fez. Faça algo útil que normalmente",
            "type": "PARAGRAPH"
          },
          {
            "text": "você esperaria que outra pessoa fizesse.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-03-reflection-questions-14",
        "studyId": "track-03-study-03",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Que tipo de grandeza tenho buscado?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a humanidade de Jesus me ajuda a orar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uso minha influência para servir ou para controlar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existe algum serviço simples que tenho desprezado por não receber reconhecimento?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-03-journal-prompt-15",
        "studyId": "track-03-study-03",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Onde meu desejo de ser reconhecido precisa ser substituído pela disposição de servir?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-03-prayer-16",
        "studyId": "track-03-study-03",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, Filho do Homem, obrigado porque te aproximaste de nossa condição e escolheste o",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminho do serviço. Corrige em mim a busca por posição, reconhecimento e controle. Ensina-me a",
            "type": "PARAGRAPH"
          },
          {
            "text": "usar qualquer influência que eu tenha para servir. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-03-keep-17",
        "studyId": "track-03-study-03",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Marcos 10:45 - Jesus resume sua missão de serviço e entrega.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Daniel 7:13-14 - observe a autoridade dada à figura do Filho do Homem.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-03-group-mode-18",
        "studyId": "track-03-study-03",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que Marcos 10 revela sobre a ideia de grandeza dos discípulos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como Daniel 7 amplia o significado de “Filho do Homem”?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que forma de serviço podemos praticar sem buscar reconhecimento?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-03-continue-journey-19",
        "studyId": "track-03-study-03",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 04 - Messias: o Ungido que cumpre a esperança. Que tipo de Salvador Jesus veio ser?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-03-references-20",
        "studyId": "track-03-study-03",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Marcos 10:32-45 • Daniel 7:13-14 • Marcos 2:10-12 • Marcos 8:31-38 • Marcos 14:61-64",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-04",
    "sections": [
      {
        "id": "track-03-study-04-golden-text-1",
        "studyId": "track-03-study-04",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Hoje se cumpriu esta Escritura em vossos ouvidos.” Lucas 4:21",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-04-practical-truth-2",
        "studyId": "track-03-study-04",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Confessar Jesus como Messias é reconhecer que a esperança prometida por Deus encontrou seu",
            "type": "PARAGRAPH"
          },
          {
            "text": "centro nele e que sua autoridade alcança nossa vida inteira.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-04-bible-reading-3",
        "studyId": "track-03-study-04",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Lucas 4:16-21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: 2 Samuel 7:12-16 • Isaías 9:6-7 • Isaías 61:1-2 • Mateus 16:13-23 • Atos 2:29-36",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-04-before-understanding-4",
        "studyId": "track-03-study-04",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Messias é uma palavra conhecida, mas nem sempre explicada. Ela vem da ideia de alguém ungido para uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "missão. No Antigo Testamento, reis e sacerdotes podiam ser ungidos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Com o passar da história bíblica, cresce a esperança de um Rei vindo da linhagem de Davi, alguém por meio",
            "type": "PARAGRAPH"
          },
          {
            "text": "de quem Deus cumpriria suas promessas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento afirma que Jesus é esse Messias. Mas Ele não cabe perfeitamente nas expectativas",
            "type": "PARAGRAPH"
          },
          {
            "text": "políticas de seu tempo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-04-read-5",
        "studyId": "track-03-study-04",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Lucas 4:16-21",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-04-observe-6",
        "studyId": "track-03-study-04",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Em Lucas 4, Jesus entra numa sinagoga em Nazaré e lê Isaías. O texto fala de boas notícias aos pobres,",
            "type": "PARAGRAPH"
          },
          {
            "text": "libertação, recuperação e o tempo do favor de Deus. Depois Jesus diz que aquela Escritura se cumpre nele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não trata Isaías apenas como texto inspirador. Coloca-se no centro da esperança anunciada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 16 mostra que reconhecer o título ainda não significa compreender a missão. Pedro chama Jesus de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo, mas rejeita a ideia da cruz. Ele queria Messias sem sofrimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 2 conecta Jesus à promessa feita a Davi, à ressurreição e à exaltação. O Messias crucificado não foi",
            "type": "PARAGRAPH"
          },
          {
            "text": "derrotado; Deus o ressuscitou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Acertar o título não basta",
            "type": "SUBHEADING"
          },
          {
            "text": "Precisamos aceitar o tipo de Messias que Jesus realmente é, inclusive o caminho da cruz.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-04-understand-7",
        "studyId": "track-03-study-04",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "“Cristo” não é sobrenome de Jesus. É título e corresponde à ideia de “Messias”, o Ungido. Quando dizemos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus Cristo, confessamos Jesus como o Ungido prometido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A promessa feita a Davi cria uma linha de esperança em torno de um Reino duradouro. Os profetas ampliam",
            "type": "PARAGRAPH"
          },
          {
            "text": "essa expectativa, e o Novo Testamento apresenta Jesus dentro dessa história.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Reino de Jesus é maior do que um projeto nacional. Muitos esperavam libertação política imediata de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Roma. Jesus anuncia um Reino que alcança pecado, morte e pessoas de todas as nações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz parecia contradizer a ideia de vitória, mas se torna justamente o caminho da redenção. O Rei vence de",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma maneira inesperada: entrega-se e ressuscita.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-04-connect-8",
        "studyId": "track-03-study-04",
        "type": "CONNECT",
        "title": "O Messias veio salvar de modo maior",
        "blocks": [
          {
            "text": "Seu Reino não se reduz a uma mudança de governo humano; alcança nossa relação com Deus e o",
            "type": "PARAGRAPH"
          },
          {
            "text": "destino da criação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-04-interpretation-caution-9",
        "studyId": "track-03-study-04",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Cristãos podem participar da vida pública e defender justiça, mas nenhum partido, governo ou líder humano",
            "type": "PARAGRAPH"
          },
          {
            "text": "pode ser identificado simplesmente com o Reino messiânico de Jesus. Cristo é maior do que nossas disputas",
            "type": "PARAGRAPH"
          },
          {
            "text": "e não cabe dentro de uma legenda.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-04-deepen-10",
        "studyId": "track-03-study-04",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Nos Evangelhos, Jesus às vezes evita publicidade imediata sobre o título de Messias. O termo podia",
            "type": "PARAGRAPH"
          },
          {
            "text": "alimentar expectativas políticas e distorcidas. Jesus conduz os discípulos para compreender sua identidade à",
            "type": "PARAGRAPH"
          },
          {
            "text": "luz da cruz e da ressurreição.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-04-apply-11",
        "studyId": "track-03-study-04",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Deixe Jesus corrigir o Salvador que você gostaria de ter. Às vezes queremos um Cristo que apenas resolva",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossos problemas e confirme nossos planos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receba boas notícias com responsabilidade. A missão de Jesus alcança pobres, feridos e excluídos; quem",
            "type": "PARAGRAPH"
          },
          {
            "text": "recebe o Evangelho aprende a refletir essa boa notícia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não interprete a cruz como derrota. Existem momentos em que a fidelidade parece perder, mas a",
            "type": "PARAGRAPH"
          },
          {
            "text": "ressurreição mostra que o último capítulo pertence a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Confesse Cristo com a vida. Dizer “Jesus é o Messias” significa reconhecer que Ele é o Rei prometido. Isso",
            "type": "PARAGRAPH"
          },
          {
            "text": "alcança valores, prioridades e lealdades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta direta",
            "type": "PARAGRAPH"
          },
          {
            "text": "Eu sigo o Messias ou tento fazer o Messias seguir o meu projeto?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-04-journey-takeaway-12",
        "studyId": "track-03-study-04",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus é o Messias, o Cristo prometido. Ele cumpre a esperança de Israel de maneira maior do que muitos",
            "type": "PARAGRAPH"
          },
          {
            "text": "esperavam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu Reino não se reduz a conquista política. Ele veio trazer o governo de Deus, entregar a própria vida e",
            "type": "PARAGRAPH"
          },
          {
            "text": "vencer por meio da ressurreição.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Confessar Jesus como Messias é reconhecer que a esperança prometida por Deus encontrou seu",
            "type": "PARAGRAPH"
          },
          {
            "text": "centro nele e que sua autoridade alcança nossa vida inteira.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-04-practice-today-13",
        "studyId": "track-03-study-04",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Leia Lucas 4:16-21. Escolha uma palavra da missão de Jesus que mais chama sua atenção e pergunte como",
            "type": "PARAGRAPH"
          },
          {
            "text": "você pode refletir essa boa notícia para alguém hoje.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-04-reflection-questions-14",
        "studyId": "track-03-study-04",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Que tipo de “salvador” eu gostaria que Jesus fosse?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho reduzido o Reino de Cristo às minhas preferências políticas ou pessoais?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a cruz corrige minha ideia de poder?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que significa para mim dizer “Jesus é o Cristo”?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-04-journal-prompt-15",
        "studyId": "track-03-study-04",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Em que área preciso deixar o Messias corrigir minhas expectativas sobre quem Ele deve ser?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-04-prayer-16",
        "studyId": "track-03-study-04",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus, Messias prometido, obrigado porque cumpriste a esperança de Deus de maneira maior que",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossos projetos humanos. Livra-me de tentar usar teu nome para confirmar minhas preferências.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ensina-me a receber teu Reino, tua cruz e tua autoridade. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-04-keep-17",
        "studyId": "track-03-study-04",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Lucas 4:18-21 - observe como Jesus apresenta sua missão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 2:36 - veja como Pedro anuncia Jesus como Senhor e Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-04-group-mode-18",
        "studyId": "track-03-study-04",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que Jesus afirma em Lucas 4 sobre sua missão?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que Pedro precisava corrigir sua expectativa sobre o Messias?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como evitamos reduzir Jesus a um projeto político ou pessoal?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-04-continue-journey-19",
        "studyId": "track-03-study-04",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 05 - O Cordeiro: o Rei que se entrega. Por que o Novo Testamento chama Jesus de Cordeiro",
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
        "id": "track-03-study-04-references-20",
        "studyId": "track-03-study-04",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Lucas 4:16-21 • 2 Samuel 7:12-16 • Isaías 9:6-7 • Isaías 61:1-2 • Mateus 16:13-23 • Atos 2:29-36",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-05",
    "sections": [
      {
        "id": "track-03-study-05-golden-text-1",
        "studyId": "track-03-study-05",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Eis o Cordeiro de Deus, que tira o pecado do mundo.” João 1:29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-05-practical-truth-2",
        "studyId": "track-03-study-05",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "O Cordeiro de Deus nos ensina a levar o pecado a sério, abandonar a tentativa de salvar a nós",
            "type": "PARAGRAPH"
          },
          {
            "text": "mesmos e descansar na obra de Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-05-bible-reading-3",
        "studyId": "track-03-study-05",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: João 1:29-36",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Êxodo 12:1-13 • Isaías 53:4-7 • 1 Coríntios 5:7 • 1 Pedro 1:18-19 • Apocalipse",
            "type": "PARAGRAPH"
          },
          {
            "text": "5:6-14",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-05-before-understanding-4",
        "studyId": "track-03-study-05",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Cordeiro parece uma imagem de fraqueza. Não é o animal que escolheríamos para representar poder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mesmo assim, o Novo Testamento chama Jesus repetidamente de Cordeiro. João Batista o apresenta como",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cordeiro de Deus. Pedro fala de sangue precioso como de cordeiro sem defeito. Apocalipse mostra um",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cordeiro que foi morto e está no centro da adoração celestial.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A imagem une entrega e vitória de uma forma que só faz sentido quando olhamos para toda a história",
            "type": "PARAGRAPH"
          },
          {
            "text": "bíblica.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-05-read-5",
        "studyId": "track-03-study-05",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "João 1:29-36",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-05-observe-6",
        "studyId": "track-03-study-05",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "João Batista vê Jesus e anuncia: “Eis o Cordeiro de Deus.”. O título aparece ligado diretamente ao problema",
            "type": "PARAGRAPH"
          },
          {
            "text": "do pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Páscoa do Êxodo forma parte do pano de fundo: um cordeiro está ligado à libertação de Israel do juízo e da",
            "type": "PARAGRAPH"
          },
          {
            "text": "escravidão. O Novo Testamento retoma essa linguagem quando fala de Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isaías 53 acrescenta a imagem do Servo que sofre, comparado a cordeiro levado ao matadouro. O Novo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Testamento relaciona explicitamente esse texto a Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Apocalipse mostra o Cordeiro como morto, mas em pé. Aquele que se entregou não permanece derrotado;",
            "type": "PARAGRAPH"
          },
          {
            "text": "recebe adoração e reina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Entrega e vitória se encontram",
            "type": "SUBHEADING"
          },
          {
            "text": "O Cordeiro não vence evitando a cruz. Aquele que foi morto é também o Cristo vivo e vencedor.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-05-understand-7",
        "studyId": "track-03-study-05",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Na Bíblia, sangue está ligado à vida e, no sistema sacrificial, à expiação. Não devemos falar como se o sangue",
            "type": "PARAGRAPH"
          },
          {
            "text": "fosse uma substância mágica separada da pessoa e da obra de Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus caminha conscientemente para a cruz. O Novo Testamento fala de entrega voluntária. O Cordeiro não",
            "type": "PARAGRAPH"
          },
          {
            "text": "é vítima de um acidente fora do plano de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Páscoa ajuda a entender libertação; Isaías 53 ilumina sofrimento pelo pecado; Levítico e Hebreus ampliam",
            "type": "PARAGRAPH"
          },
          {
            "text": "a ideia de expiação e sacerdócio. Nenhuma imagem sozinha esgota a cruz.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A expressão “do mundo” amplia o horizonte. O Evangelho não ficará preso a um pequeno grupo; o Cordeiro",
            "type": "PARAGRAPH"
          },
          {
            "text": "é anunciado às nações.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-05-connect-8",
        "studyId": "track-03-study-05",
        "type": "CONNECT",
        "title": "O centro é Jesus entregando a própria vida",
        "blocks": [
          {
            "text": "A redenção está na obra do Cordeiro, não numa fórmula religiosa ou numa substância tratada como",
            "type": "PARAGRAPH"
          },
          {
            "text": "magia.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-05-interpretation-caution-9",
        "studyId": "track-03-study-05",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "A imagem do cordeiro não deve ser usada para ensinar vítimas a aceitar violência em silêncio. Jesus entrega a",
            "type": "PARAGRAPH"
          },
          {
            "text": "vida voluntariamente em sua missão única. Buscar ajuda, segurança e justiça é compatível com a fé cristã.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-05-deepen-10",
        "studyId": "track-03-study-05",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Apocalipse mantém a identidade de Jesus como Cordeiro mesmo depois da ressurreição e exaltação. A cruz",
            "type": "PARAGRAPH"
          },
          {
            "text": "não é uma fase vergonhosa que precisa ser esquecida; torna-se parte da glória do Rei. O trono e a entrega",
            "type": "PARAGRAPH"
          },
          {
            "text": "não competem.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-05-apply-11",
        "studyId": "track-03-study-05",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Pare de tratar o pecado como algo pequeno. Se o Cordeiro está ligado ao tratamento do pecado, a cruz",
            "type": "PARAGRAPH"
          },
          {
            "text": "mostra sua seriedade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pare também de tentar salvar a si mesmo. Religião pode virar tentativa de pagar a própria dívida com esforço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho aponta para Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deixe a redenção alimentar sua adoração. Em Apocalipse 5, o Cordeiro é adorado por sua obra. Adoração é",
            "type": "PARAGRAPH"
          },
          {
            "text": "resposta à graça, não apenas música.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Viva como alguém libertado. A Páscoa fala de saída da escravidão. Em Cristo, perdão não é autorização para",
            "type": "PARAGRAPH"
          },
          {
            "text": "permanecer preso ao mesmo senhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Liberdade tem direção",
            "type": "PARAGRAPH"
          },
          {
            "text": "Somos libertados do pecado para pertencer a Deus, não para viver sem Senhor.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-05-journey-takeaway-12",
        "studyId": "track-03-study-05",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus é o Cordeiro de Deus. Essa imagem reúne libertação, sacrifício, sofrimento e vitória.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não tira o pecado por magia, mas por sua entrega real. E o Cordeiro morto é também o Cordeiro vivo que",
            "type": "PARAGRAPH"
          },
          {
            "text": "reina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "O Cordeiro de Deus nos ensina a levar o pecado a sério, abandonar a tentativa de salvar a nós",
            "type": "PARAGRAPH"
          },
          {
            "text": "mesmos e descansar na obra de Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-05-practice-today-13",
        "studyId": "track-03-study-05",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Leia João 1:29 e Apocalipse 5:9-10. Agradeça a Jesus por algo específico de sua obra: perdão, libertação,",
            "type": "PARAGRAPH"
          },
          {
            "text": "reconciliação ou esperança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-05-reflection-questions-14",
        "studyId": "track-03-study-05",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Tenho tratado o pecado com seriedade e esperança ao mesmo tempo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em que área ainda tento me justificar por desempenho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que a imagem do Cordeiro muda na minha visão de poder?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha adoração nasce de gratidão real pela obra de Cristo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-05-journal-prompt-15",
        "studyId": "track-03-study-05",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "O que preciso colocar hoje diante do Cordeiro, parando de tentar resolver sozinho?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-05-prayer-16",
        "studyId": "track-03-study-05",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus, Cordeiro de Deus, obrigado porque te entregaste por nós. Livra-me de tratar o pecado como",
            "type": "PARAGRAPH"
          },
          {
            "text": "algo pequeno e também de pensar que preciso salvar a mim mesmo. Ensina-me a confiar em tua obra,",
            "type": "PARAGRAPH"
          },
          {
            "text": "a viver como alguém libertado e a adorar com gratidão. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-05-keep-17",
        "studyId": "track-03-study-05",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "João 1:29 - o Cordeiro que tira o pecado do mundo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Apocalipse 5:9-10 - o Cordeiro adorado por sua obra redentora.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-05-group-mode-18",
        "studyId": "track-03-study-05",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "Que temas bíblicos aparecem por trás da imagem do cordeiro?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que o sangue não deve ser tratado como magia?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a obra do Cordeiro muda nossa relação com culpa e adoração?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-05-continue-journey-19",
        "studyId": "track-03-study-05",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 06 - Rei: um Reino que não se parece com os reinos deste mundo. Que tipo de Rei é Jesus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-05-references-20",
        "studyId": "track-03-study-05",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "João 1:29-36 • Êxodo 12:1-13 • Isaías 53:4-7 • 1 Coríntios 5:7 • 1 Pedro 1:18-19 • Apocalipse 5:6-14",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-06",
    "sections": [
      {
        "id": "track-03-study-06-golden-text-1",
        "studyId": "track-03-study-06",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“O meu Reino não é deste mundo.” João 18:36",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-06-practical-truth-2",
        "studyId": "track-03-study-06",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "O Reino de Jesus não nos ensina a dominar pessoas em nome de Deus, mas a viver sob a autoridade",
            "type": "PARAGRAPH"
          },
          {
            "text": "do Rei que serve, fala a verdade e vence o mal.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-06-bible-reading-3",
        "studyId": "track-03-study-06",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: João 18:33-38",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: 2 Samuel 7:12-16 • Lucas 1:30-33 • Mateus 21:1-9 • Filipenses 2:9-11 • Apocalipse",
            "type": "PARAGRAPH"
          },
          {
            "text": "19:11-16",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-06-before-understanding-4",
        "studyId": "track-03-study-06",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "A palavra rei pode trazer imagens de coroas, palácios, exércitos, poder e distância. Jesus é chamado de Rei,",
            "type": "PARAGRAPH"
          },
          {
            "text": "mas sua realeza surpreende.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando está diante de Pilatos, Ele não possui exército defendendo-o, não manipula multidões e não tenta",
            "type": "PARAGRAPH"
          },
          {
            "text": "preservar a própria vida por meio da força.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que seu Reino seja imaginário. Significa que sua origem, seu caráter e seus métodos não",
            "type": "PARAGRAPH"
          },
          {
            "text": "são iguais aos reinos deste mundo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-06-read-5",
        "studyId": "track-03-study-06",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "João 18:33-38",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-06-observe-6",
        "studyId": "track-03-study-06",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Pilatos pergunta se Jesus é Rei dos judeus. Jesus responde falando de seu Reino. A conversa acontece",
            "type": "PARAGRAPH"
          },
          {
            "text": "quando Ele parece mais fraco aos olhos humanos, preso diante do poder romano.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não nega a linguagem de Rei. Em outros textos recebe títulos ligados ao trono de Davi, e Lucas 1",
            "type": "PARAGRAPH"
          },
          {
            "text": "anuncia um Reino que não terá fim.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ao dizer que seu Reino não é “deste mundo”, Jesus não afirma que ele não tenha impacto na vida real.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mostra que sua origem e seus métodos não dependem da lógica de violência e dominação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Rei também testemunha da verdade. Seu governo está ligado ao caráter de Deus, não à propaganda. E",
            "type": "PARAGRAPH"
          },
          {
            "text": "quando entra em Jerusalém, faz isso em humildade, cumprindo a esperança sem reproduzir a exibição militar",
            "type": "PARAGRAPH"
          },
          {
            "text": "dos conquistadores.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A humildade do Rei não cancela sua autoridade",
            "type": "SUBHEADING"
          },
          {
            "text": "Ela revela o tipo de Rei que Jesus é.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-06-understand-7",
        "studyId": "track-03-study-06",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Jesus cumpre a promessa davídica. A esperança de 2 Samuel 7 encontra continuidade no anúncio do",
            "type": "PARAGRAPH"
          },
          {
            "text": "nascimento de Jesus e na linguagem do Reino.",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Não é deste mundo” não significa “não importa para este mundo”. O governo de Cristo transforma valores,",
            "type": "PARAGRAPH"
          },
          {
            "text": "relações, justiça, uso do poder e esperança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz se torna uma coroação inesperada. Jesus recebe coroa de espinhos e o título “Rei dos judeus” em tom",
            "type": "PARAGRAPH"
          },
          {
            "text": "de zombaria. Ironicamente, o Evangelho mostra que seu poder se revela em entrega.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Reino já está presente e ainda será plenamente manifestado. Cristo reina, mas ainda vemos oposição,",
            "type": "PARAGRAPH"
          },
          {
            "text": "sofrimento e morte. A esperança aponta para o dia em que toda autoridade contrária será vencida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-06-connect-8",
        "studyId": "track-03-study-06",
        "type": "CONNECT",
        "title": "Já e ainda não",
        "blocks": [
          {
            "text": "Vivemos sob o governo do Rei agora enquanto esperamos sua manifestação plena.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-06-interpretation-caution-9",
        "studyId": "track-03-study-06",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "A história cristã possui exemplos de pessoas usando o nome de Jesus para justificar violência e imposição.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso contradiz o Rei que recusou defender seu trono pela espada. O Evangelho é anunciado e testemunhado;",
            "type": "PARAGRAPH"
          },
          {
            "text": "convicção cristã não precisa virar coerção.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-06-deepen-10",
        "studyId": "track-03-study-06",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "O Novo Testamento fala de Jesus como exaltado e entronizado agora e, ao mesmo tempo, espera um futuro",
            "type": "PARAGRAPH"
          },
          {
            "text": "em que seu Reino será manifestado sem oposição. Por isso podemos dizer que o Reino já começou e ainda",
            "type": "PARAGRAPH"
          },
          {
            "text": "não chegou em sua plenitude.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-06-apply-11",
        "studyId": "track-03-study-06",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Pergunte quem realmente governa suas escolhas. É possível cantar “Rei Jesus” e continuar vivendo como",
            "type": "PARAGRAPH"
          },
          {
            "text": "soberano absoluto de si mesmo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não copie os métodos dos reinos deste mundo. Mentira, manipulação, humilhação e medo não se tornam",
            "type": "PARAGRAPH"
          },
          {
            "text": "santos porque o objetivo parece religioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Use poder de forma diferente. Se você lidera, olhe para Jesus. Autoridade cristã nunca deveria ser licença",
            "type": "PARAGRAPH"
          },
          {
            "text": "para dominar; é responsabilidade para servir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mantenha esperança quando poderes injustos parecem invencíveis. Pilatos parecia possuir toda autoridade",
            "type": "PARAGRAPH"
          },
          {
            "text": "naquele momento, mas o império passou. Cristo permanece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta simples",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem decide o que é certo quando meus desejos entram em conflito com Jesus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-06-journey-takeaway-12",
        "studyId": "track-03-study-06",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus é Rei. Seu Reino está ligado à promessa de Davi e à esperança profética, mas não funciona pela lógica",
            "type": "PARAGRAPH"
          },
          {
            "text": "de dominação dos reinos humanos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Chamar Jesus de Rei é mais do que usar um título de adoração; é reconhecer que nossa vida pertence ao seu",
            "type": "PARAGRAPH"
          },
          {
            "text": "governo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "O Reino de Jesus não nos ensina a dominar pessoas em nome de Deus, mas a viver sob a autoridade",
            "type": "PARAGRAPH"
          },
          {
            "text": "do Rei que serve, fala a verdade e vence o mal.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-06-practice-today-13",
        "studyId": "track-03-study-06",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma decisão concreta que precisa tomar. Antes de decidir apenas pelo que é conveniente, pergunte:",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que combina com o governo de Jesus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-06-reflection-questions-14",
        "studyId": "track-03-study-06",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Em que área tenho chamado Jesus de Rei sem permitir que Ele governe?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho usado métodos contrários a Cristo para alcançar objetivos “bons”?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como posso exercer autoridade de modo mais parecido com Jesus?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que poder deste mundo tenho tratado como se fosse eterno?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-06-journal-prompt-15",
        "studyId": "track-03-study-06",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que área da minha vida ainda funciona como se eu fosse o rei?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-06-prayer-16",
        "studyId": "track-03-study-06",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Rei Jesus, reconheço tua autoridade. Perdoa-me quando uso teu nome, mas continuo governando",
            "type": "PARAGRAPH"
          },
          {
            "text": "sozinho. Ensina-me a viver debaixo da tua verdade, a rejeitar manipulação e violência e a usar",
            "type": "PARAGRAPH"
          },
          {
            "text": "qualquer influência que eu tenha para servir. Quando os poderes deste mundo me assustarem,",
            "type": "PARAGRAPH"
          },
          {
            "text": "lembra-me de que teu Reino permanece. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-06-keep-17",
        "studyId": "track-03-study-06",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "João 18:36-37 - observe como Jesus fala de seu Reino e da verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 1:32-33 - veja a promessa do trono e do Reino.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-06-group-mode-18",
        "studyId": "track-03-study-06",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que Jesus quer dizer ao afirmar que seu Reino não é deste mundo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a cruz redefine nossa ideia de rei e poder?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que mudança prática acontece quando tratamos Jesus como Rei de verdade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-06-continue-journey-19",
        "studyId": "track-03-study-06",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 07 - Senhor: quando Jesus deixa de ser apenas parte da vida. O que significa confessar que",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus é Senhor?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-06-references-20",
        "studyId": "track-03-study-06",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "João 18:33-38 • 2 Samuel 7:12-16 • Lucas 1:30-33 • Mateus 21:1-9 • Filipenses 2:9-11 • Apocalipse",
            "type": "PARAGRAPH"
          },
          {
            "text": "19:11-16",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-07",
    "sections": [
      {
        "id": "track-03-study-07-golden-text-1",
        "studyId": "track-03-study-07",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“E toda língua confesse que Jesus Cristo é Senhor.” Filipenses 2:11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-07-practical-truth-2",
        "studyId": "track-03-study-07",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Confessar Jesus como Senhor é receber sua graça e entregar a Ele a autoridade sobre aquilo que",
            "type": "PARAGRAPH"
          },
          {
            "text": "somos e fazemos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-07-bible-reading-3",
        "studyId": "track-03-study-07",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Filipenses 2:5-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Atos 2:32-36 • Romanos 10:9-13 • 1 Coríntios 8:5-6 • Colossenses 2:6-7",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-07-before-understanding-4",
        "studyId": "track-03-study-07",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "“Senhor Jesus” é uma expressão tão comum que pode sair de nossa boca sem pensarmos no peso das",
            "type": "PARAGRAPH"
          },
          {
            "text": "palavras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 2 apresenta o Cristo que se humilha até a morte e depois é exaltado. Toda língua confessará que",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus Cristo é Senhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa confissão não serve apenas para o culto. Ela alcança nossa lealdade, nossas escolhas e nossa identidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-07-read-5",
        "studyId": "track-03-study-07",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Filipenses 2:5-11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-07-observe-6",
        "studyId": "track-03-study-07",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Filipenses começa falando da humildade de Cristo. Ele não usa sua posição para explorar ou alimentar o",
            "type": "PARAGRAPH"
          },
          {
            "text": "próprio ego. Assume forma de servo e obedece até a morte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz vem antes da exaltação. Aquele que é exaltado é o mesmo que se entregou. Isso corrige nossa",
            "type": "PARAGRAPH"
          },
          {
            "text": "vontade de receber honra sem passar pelo caminho do serviço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus o exalta e lhe dá o nome acima de todo nome. O Servo é Senhor; humildade não significou perda de",
            "type": "PARAGRAPH"
          },
          {
            "text": "identidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo olha para um futuro em que toda criação reconhecerá o senhorio de Cristo. Nossa confissão hoje",
            "type": "PARAGRAPH"
          },
          {
            "text": "antecipa esse reconhecimento universal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Senhor não é inseguro",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus não precisa esmagar outros para provar quem é.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-07-understand-7",
        "studyId": "track-03-study-07",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "“Senhor” não é apenas tratamento educado. Atos 2 e Romanos 10 mostram o peso da confissão: Jesus ocupa",
            "type": "PARAGRAPH"
          },
          {
            "text": "o lugar de autoridade e lealdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu senhorio alcança toda a vida. Não existe uma área “religiosa” governada por Jesus e outra onde fazemos",
            "type": "PARAGRAPH"
          },
          {
            "text": "o que quisermos. Dinheiro, corpo, trabalho, palavras, relacionamentos e poder entram debaixo de sua",
            "type": "PARAGRAPH"
          },
          {
            "text": "autoridade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 8:6 fala de um Deus, o Pai, e de um Senhor, Jesus Cristo, dentro da fé cristã no único Deus. A",
            "type": "PARAGRAPH"
          },
          {
            "text": "Igreja não está adicionando um ídolo ao lado de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Obediência não compra salvação. Obedecemos porque fomos alcançados pela graça e recebemos um novo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor. A ordem é importante: graça, fé, nova lealdade e obediência.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-07-connect-8",
        "studyId": "track-03-study-07",
        "type": "CONNECT",
        "title": "Senhor da vida inteira",
        "blocks": [
          {
            "text": "Não apenas do domingo, do culto ou da linguagem religiosa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-07-interpretation-caution-9",
        "studyId": "track-03-study-07",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Líderes podem usar a autoridade de Cristo para exigir obediência pessoal a si mesmos. Isso é perigoso. Jesus",
            "type": "PARAGRAPH"
          },
          {
            "text": "é Senhor; líderes continuam sendo servos. Nenhum líder humano ocupa o trono de Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-07-deepen-10",
        "studyId": "track-03-study-07",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Filipenses 2 ecoa Isaías 45, onde todo joelho se dobra diante do Senhor. Paulo aplica essa linguagem a Jesus",
            "type": "PARAGRAPH"
          },
          {
            "text": "de modo impressionante. A confissão “Jesus é Senhor” coloca Cristo no centro da adoração e da lealdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "cristã.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-07-apply-11",
        "studyId": "track-03-study-07",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Identifique seus “senhores” concorrentes. Dinheiro, aprovação, prazer, medo e carreira podem governar",
            "type": "PARAGRAPH"
          },
          {
            "text": "decisões sem receber esse nome.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Obedecer também acontece quando ninguém vê. É fácil dizer “Senhor” em público; o senhorio aparece de",
            "type": "PARAGRAPH"
          },
          {
            "text": "verdade no secreto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aprenda a liderar como servo. Quanto mais autoridade você recebe, maior a responsabilidade de servir e",
            "type": "PARAGRAPH"
          },
          {
            "text": "proteger, não de controlar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Confesse com esperança. Nenhum poder atual terá a palavra final. Jesus é Senhor, e isso sustenta a fé em",
            "type": "PARAGRAPH"
          },
          {
            "text": "tempos de instabilidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte a si mesmo",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que eu não consigo contrariar, mesmo quando Jesus me chama para outro caminho?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-07-journey-takeaway-12",
        "studyId": "track-03-study-07",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus é Senhor. Essa confissão nasce da cruz e da exaltação. Significa que Cristo possui autoridade e merece",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossa lealdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando Jesus se torna Senhor de verdade, deixa de ser apenas uma parte da agenda e passa a orientar a",
            "type": "PARAGRAPH"
          },
          {
            "text": "existência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Confessar Jesus como Senhor é receber sua graça e entregar a Ele a autoridade sobre aquilo que",
            "type": "PARAGRAPH"
          },
          {
            "text": "somos e fazemos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-07-practice-today-13",
        "studyId": "track-03-study-07",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma área concreta: dinheiro, agenda, relacionamentos, corpo, trabalho ou palavras. Pergunte o que",
            "type": "PARAGRAPH"
          },
          {
            "text": "mudaria nela se você tratasse Jesus como Senhor de verdade. Faça uma pequena mudança hoje.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-07-reflection-questions-14",
        "studyId": "track-03-study-07",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Que coisa mais compete com Jesus pelo governo da minha vida?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha obediência existe também no secreto?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como exerço autoridade sobre outras pessoas?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho usado líderes humanos como se ocupassem o lugar de Cristo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-07-journal-prompt-15",
        "studyId": "track-03-study-07",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que área ainda digo “minha” quando Jesus me chama a dizer “tua”?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-07-prayer-16",
        "studyId": "track-03-study-07",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, reconheço tua autoridade sobre minha vida. Perdoa-me quando uso teu nome sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "permitir que governes minhas escolhas. Mostra os senhores concorrentes que tenho servido. Ensina-",
            "type": "PARAGRAPH"
          },
          {
            "text": "me a obedecer por gratidão, a liderar com humildade e a viver com esperança porque teu Reino",
            "type": "PARAGRAPH"
          },
          {
            "text": "permanece. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-07-keep-17",
        "studyId": "track-03-study-07",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Filipenses 2:9-11 - a exaltação e a confissão de Jesus como Senhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 10:9 - a ligação entre confissão e fé.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-07-group-mode-18",
        "studyId": "track-03-study-07",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que Filipenses 2 mostra sobre o tipo de Senhor que Jesus é?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quais “senhores” concorrentes podem governar a vida sem receber esse nome?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que área concreta podemos entregar mais claramente à autoridade de Cristo nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-07-continue-journey-19",
        "studyId": "track-03-study-07",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 08 - Sumo Sacerdote: aquele que nos representa diante de Deus. Por que isso muda a",
            "type": "PARAGRAPH"
          },
          {
            "text": "maneira como nos aproximamos de Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-07-references-20",
        "studyId": "track-03-study-07",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Filipenses 2:5-11 • Atos 2:32-36 • Romanos 10:9-13 • 1 Coríntios 8:5-6 • Colossenses 2:6-7",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-08",
    "sections": [
      {
        "id": "track-03-study-08-golden-text-1",
        "studyId": "track-03-study-08",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Cheguemos, pois, com confiança ao trono da graça.” Hebreus 4:16",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-08-practical-truth-2",
        "studyId": "track-03-study-08",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "O sacerdócio de Jesus transforma nossa relação com Deus: em Cristo, somos convidados a chegar ao",
            "type": "PARAGRAPH"
          },
          {
            "text": "trono da graça.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-08-bible-reading-3",
        "studyId": "track-03-study-08",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Hebreus 4:14-16",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Hebreus 7:23-28 • Hebreus 9:11-15 • Hebreus 10:19-22 • Levítico 16:1-22",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-08-before-understanding-4",
        "studyId": "track-03-study-08",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Para muitos leitores de hoje, a expressão Sumo Sacerdote parece distante. Para os primeiros leitores de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus, porém, ela carregava uma história inteira de templo, sacrifícios, mediação e acesso à presença de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus afirma que Jesus é o Sumo Sacerdote maior e definitivo. Ele não apenas oferece um sacrifício;",
            "type": "PARAGRAPH"
          },
          {
            "text": "oferece a si mesmo. E por meio dele podemos nos aproximar de Deus com confiança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-08-read-5",
        "studyId": "track-03-study-08",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Hebreus 4:14-16",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-08-observe-6",
        "studyId": "track-03-study-08",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Hebreus 4 combina duas verdades: Jesus é grande e exaltado, mas também conhece nossa fraqueza. Seu",
            "type": "PARAGRAPH"
          },
          {
            "text": "sacerdócio não termina na morte; nosso Sacerdote vive.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele se compadece de nossas fraquezas. Foi tentado e conhece a experiência humana, sem pecado. Isso",
            "type": "PARAGRAPH"
          },
          {
            "text": "significa que nossa fragilidade não provoca indiferença nele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A resposta do texto não é fugir por vergonha. É aproximar-se do trono da graça. A santidade de Deus não",
            "type": "PARAGRAPH"
          },
          {
            "text": "desapareceu, mas em Cristo existe acesso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nesse lugar encontramos misericórdia, graça e socorro em tempo oportuno. O sacerdócio de Jesus não é",
            "type": "PARAGRAPH"
          },
          {
            "text": "teoria; é esperança para gente necessitada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando precisamos de ajuda",
            "type": "SUBHEADING"
          },
          {
            "text": "O caminho do Evangelho é para perto de Deus por meio de Cristo, não para longe.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-08-understand-7",
        "studyId": "track-03-study-08",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "No Antigo Testamento, sacerdotes representavam o povo diante de Deus. O sumo sacerdote tinha papel",
            "type": "PARAGRAPH"
          },
          {
            "text": "especial, inclusive no Dia da Expiação. Hebreus usa essa história para mostrar que Jesus cumpre e supera o",
            "type": "PARAGRAPH"
          },
          {
            "text": "sistema.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Diferente dos sacerdotes que ofereciam animais repetidamente, Cristo oferece a própria vida. Sua obra é",
            "type": "PARAGRAPH"
          },
          {
            "text": "decisiva e não precisa ser completada por novos sacrifícios.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 10 fala de liberdade para entrar na presença de Deus por causa de Jesus. Acesso não significa",
            "type": "PARAGRAPH"
          },
          {
            "text": "irreverência; significa confiança porque a graça abriu o caminho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 7 também diz que Jesus vive para interceder pelos que se aproximam de Deus por meio dele. Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "não nos abandona depois da conversão.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-08-connect-8",
        "studyId": "track-03-study-08",
        "type": "CONNECT",
        "title": "Nossa confiança está em Cristo",
        "blocks": [
          {
            "text": "Não em rituais inventados, desempenho pessoal ou tentativas de comprar acesso a Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-08-interpretation-caution-9",
        "studyId": "track-03-study-08",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Não imagine o Pai como alguém que não quer nos receber e Jesus tentando convencê-lo. O Novo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Testamento apresenta a salvação como propósito de Deus: o Pai envia o Filho, o Filho se entrega",
            "type": "PARAGRAPH"
          },
          {
            "text": "voluntariamente. Não são adversários.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-08-deepen-10",
        "studyId": "track-03-study-08",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Hebreus fala de Jesus como sacerdote “segundo a ordem de Melquisedeque”. O autor usa Gênesis 14 e",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 110 para mostrar um sacerdócio que não depende da linhagem levítica comum. O centro não é",
            "type": "PARAGRAPH"
          },
          {
            "text": "especular sobre cada detalhe de Melquisedeque, mas mostrar a superioridade e permanência do sacerdócio",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-08-apply-11",
        "studyId": "track-03-study-08",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Pare de fugir de Deus quando você mais precisa dele. A vergonha diz “esconda-se”; Hebreus diz “aproxime-",
            "type": "PARAGRAPH"
          },
          {
            "text": "se”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore com confiança sem transformar confiança em arrogância. Você pode falar abertamente com Deus e",
            "type": "PARAGRAPH"
          },
          {
            "text": "ainda lembrar que está diante do trono.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leve suas tentações a Cristo antes da queda, não apenas seus pecados depois. Peça socorro cedo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pare de tentar ser seu próprio sacerdote. Você não precisa se purificar sozinho até sentir que merece orar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sua confiança está na obra de Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Corra para a graça",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não espere ficar “bom o suficiente” para voltar a Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-08-journey-takeaway-12",
        "studyId": "track-03-study-08",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus é nosso Sumo Sacerdote. Ele conhece nossa condição, ofereceu a si mesmo, abriu acesso e vive para",
            "type": "PARAGRAPH"
          },
          {
            "text": "interceder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando a culpa e a fraqueza dizem “fique longe”, o Evangelho diz: “aproxime-se por meio de Cristo”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "O sacerdócio de Jesus transforma nossa relação com Deus: em Cristo, somos convidados a chegar ao",
            "type": "PARAGRAPH"
          },
          {
            "text": "trono da graça.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-08-practice-today-13",
        "studyId": "track-03-study-08",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma fraqueza que costuma esconder. Ore sobre ela de forma direta. Peça misericórdia, graça e ajuda",
            "type": "PARAGRAPH"
          },
          {
            "text": "antes de enfrentar novamente a situação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-08-reflection-questions-14",
        "studyId": "track-03-study-08",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Quando erro, minha reação é aproximar-me ou esconder-me de Deus?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho transformado oração em prêmio para dias bons?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que tentação preciso levar a Cristo antes de cair?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha confiança está na obra de Jesus ou no meu desempenho?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-08-journal-prompt-15",
        "studyId": "track-03-study-08",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que fraqueza eu preciso parar de esconder e levar ao trono da graça?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-08-prayer-16",
        "studyId": "track-03-study-08",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus, meu Sumo Sacerdote, obrigado porque conheces minha fraqueza e não me desprezas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Obrigado porque abriste o caminho para a presença de Deus. Ensina-me a aproximar com confiança e",
            "type": "PARAGRAPH"
          },
          {
            "text": "reverência. Socorre-me nas tentações e livra-me de tentar comprar acesso por desempenho. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-08-keep-17",
        "studyId": "track-03-study-08",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Hebreus 4:15-16 - fraqueza, compaixão e acesso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 7:25 - Cristo vive para interceder.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-08-group-mode-18",
        "studyId": "track-03-study-08",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que Hebreus 4 revela sobre nosso Sumo Sacerdote?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que confiança cristã não precisa virar irreverência?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que diferença faz levar tentações a Deus antes da queda?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-08-continue-journey-19",
        "studyId": "track-03-study-08",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 09 - Encarnação: Deus entrou em nossa história. O que realmente significa afirmar que o",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filho de Deus se tornou humano?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-08-references-20",
        "studyId": "track-03-study-08",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Hebreus 4:14-16 • Hebreus 7:23-28 • Hebreus 9:11-15 • Hebreus 10:19-22 • Levítico 16:1-22",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-09",
    "sections": [
      {
        "id": "track-03-study-09-golden-text-1",
        "studyId": "track-03-study-09",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“E o Verbo se fez carne e habitou entre nós.” João 1:14",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-09-practical-truth-2",
        "studyId": "track-03-study-09",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A encarnação nos ensina que Deus se aproxima de nossa humanidade para redimi-la, não para",
            "type": "PARAGRAPH"
          },
          {
            "text": "desprezá-la.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-09-bible-reading-3",
        "studyId": "track-03-study-09",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Filipenses 2:5-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: João 1:14-18 • Lucas 1:26-38 • Hebreus 2:14-18 • Gálatas 4:4-5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-09-before-understanding-4",
        "studyId": "track-03-study-09",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "A palavra encarnação pode soar técnica, mas a ideia é simples e profunda: o Filho de Deus entrou de",
            "type": "PARAGRAPH"
          },
          {
            "text": "verdade em nossa condição humana.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não apenas apareceu como homem. Nasceu, cresceu, sentiu fome, cansou, chorou, sofreu e morreu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O cristianismo não anuncia um Deus que salvou a humanidade sem se aproximar dela. Anuncia o Deus que",
            "type": "PARAGRAPH"
          },
          {
            "text": "veio até nós em Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-09-read-5",
        "studyId": "track-03-study-09",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Filipenses 2:5-8",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-09-observe-6",
        "studyId": "track-03-study-09",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Filipenses 2 mostra o movimento de Cristo em direção a nós. Sua grandeza não se transforma em",
            "type": "PARAGRAPH"
          },
          {
            "text": "exploração; Ele assume forma de servo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus entra na experiência humana real. Não escolhe o palácio como símbolo central, mas humildade e",
            "type": "PARAGRAPH"
          },
          {
            "text": "serviço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele obedece até a morte. A humanidade de Jesus torna possível sua morte real; a cruz não é teatro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus diz que Jesus foi tentado, mas sem pecado. Ser humano não é ser pecador por definição. O pecado",
            "type": "PARAGRAPH"
          },
          {
            "text": "corrompe o humano; não define o humano.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A encarnação é aproximação",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não considera nossa condição humana indigna de sua presença.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-09-understand-7",
        "studyId": "track-03-study-09",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Precisamos manter duas verdades: Jesus é verdadeiramente divino e verdadeiramente humano. Se",
            "type": "PARAGRAPH"
          },
          {
            "text": "diminuímos sua divindade, perdemos aquilo que João e Hebreus afirmam. Se diminuímos sua humanidade, a",
            "type": "PARAGRAPH"
          },
          {
            "text": "cruz vira aparência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A encarnação não significa que o Filho deixou de ser quem é. Filipenses fala de humilhação e serviço, não de",
            "type": "PARAGRAPH"
          },
          {
            "text": "abandonar sua identidade divina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 2 liga a participação em carne e sangue à derrota da morte e à libertação. Deus salva por",
            "type": "PARAGRAPH"
          },
          {
            "text": "aproximação: Cristo entra onde está nossa escravidão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A encarnação também dignifica o corpo e a vida humana. Se o Filho assumiu corpo humano, matéria não é",
            "type": "PARAGRAPH"
          },
          {
            "text": "inimiga de Deus por natureza. Isso combina com a esperança da ressurreição.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-09-connect-8",
        "studyId": "track-03-study-09",
        "type": "CONNECT",
        "title": "Segure as duas verdades",
        "blocks": [
          {
            "text": "O Filho eterno realmente se fez humano sem deixar de ser quem Ele é.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-09-interpretation-caution-9",
        "studyId": "track-03-study-09",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Não trate o corpo como se fosse o problema principal da vida espiritual. Jesus teve corpo e foi sem pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia chama à santidade no corpo, não ao ódio do corpo. Redenção inclui nossa humanidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-09-deepen-10",
        "studyId": "track-03-study-09",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Os Evangelhos não respondem cada pergunta sobre a experiência consciente de Jesus em cada fase da vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas diz que Ele crescia em sabedoria, e o Novo Testamento também afirma sua identidade divina. Onde a",
            "type": "PARAGRAPH"
          },
          {
            "text": "Bíblia não explica todos os detalhes, precisamos ser humildes.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-09-apply-11",
        "studyId": "track-03-study-09",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Deus não está distante da experiência humana. Jesus conheceu cansaço, lágrimas e dor. Você pode levar a",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele uma espiritualidade humana, sem fingir que não sente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Honre seu corpo. Ele não é seu deus, mas faz parte da vida recebida de Deus. Descanso, sexualidade,",
            "type": "PARAGRAPH"
          },
          {
            "text": "alimentação e trabalho também entram na fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aprenda humildade com Cristo. Se Ele se aproximou para servir, nosso status não deveria nos tornar",
            "type": "PARAGRAPH"
          },
          {
            "text": "inacessíveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não despreze a vida comum. Jesus viveu anos de rotina simples antes de seu ministério público. Família,",
            "type": "PARAGRAPH"
          },
          {
            "text": "trabalho e cotidiano podem ser lugares de obediência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O comum também pertence a Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "A presença de Deus não começa apenas nos momentos extraordinários.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-09-journey-takeaway-12",
        "studyId": "track-03-study-09",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "A encarnação é a boa notícia de que o Filho eterno realmente entrou em nossa história. Não fingiu ser",
            "type": "PARAGRAPH"
          },
          {
            "text": "humano. Assumiu nossa condição, serviu, sofreu e morreu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não nos salvou mantendo distância; em Cristo, veio habitar entre nós.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "A encarnação nos ensina que Deus se aproxima de nossa humanidade para redimi-la, não para",
            "type": "PARAGRAPH"
          },
          {
            "text": "desprezá-la.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-09-practice-today-13",
        "studyId": "track-03-study-09",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma parte comum do seu dia: uma refeição, trabalho, descanso ou cuidado do corpo. Faça-a com",
            "type": "PARAGRAPH"
          },
          {
            "text": "atenção e gratidão, lembrando que a vida comum também pertence a Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-09-reflection-questions-14",
        "studyId": "track-03-study-09",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Tenho imaginado espiritualidade como fuga do corpo e da vida comum?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que muda ao lembrar que Jesus viveu humanidade real?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a humildade de Cristo confronta meu uso de status?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que área comum da minha rotina preciso oferecer a Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-09-journal-prompt-15",
        "studyId": "track-03-study-09",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que parte da minha vida comum eu tenho tratado como se estivesse fora da presença de Deus?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-09-prayer-16",
        "studyId": "track-03-study-09",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, obrigado porque te fizeste carne e habitaste entre nós. Obrigado porque conheces de",
            "type": "PARAGRAPH"
          },
          {
            "text": "verdade a experiência humana. Ajuda-me a não desprezar meu corpo, minha rotina ou minha",
            "type": "PARAGRAPH"
          },
          {
            "text": "fragilidade. Ensina-me a viver com humildade e a servir como tu serviste. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-09-keep-17",
        "studyId": "track-03-study-09",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "João 1:14 - o Verbo se fez carne.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 2:17-18 - veja como a humanidade de Jesus se liga à sua ajuda.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-09-group-mode-18",
        "studyId": "track-03-study-09",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que Filipenses 2 ensina sobre o movimento de Cristo em direção a nós?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que a verdadeira humanidade de Jesus é importante para o Evangelho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a encarnação muda nossa visão do corpo e da vida comum?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-09-continue-journey-19",
        "studyId": "track-03-study-09",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 10 - Ministério: o Reino de Deus em palavras e ações. O que Jesus veio fazer durante seu",
            "type": "PARAGRAPH"
          },
          {
            "text": "ministério público?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-09-references-20",
        "studyId": "track-03-study-09",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Filipenses 2:5-8 • João 1:14-18 • Lucas 1:26-38 • Hebreus 2:14-18 • Gálatas 4:4-5",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-10",
    "sections": [
      {
        "id": "track-03-study-10-golden-text-1",
        "studyId": "track-03-study-10",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“O tempo está cumprido, e o Reino de Deus está próximo. Arrependei-vos e crede no evangelho.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Marcos 1:15",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-10-practical-truth-2",
        "studyId": "track-03-study-10",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Seguir o ministério de Jesus significa unir mensagem, compaixão, discipulado, oração e missão sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "transformar pessoas em plateia ou ministério em espetáculo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-10-bible-reading-3",
        "studyId": "track-03-study-10",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Marcos 1:14-39",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Lucas 4:16-21 • Mateus 9:35-38 • Marcos 2:13-17 • Marcos 3:13-15 • Atos",
            "type": "PARAGRAPH"
          },
          {
            "text": "10:37-38",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-10-before-understanding-4",
        "studyId": "track-03-study-10",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "O ministério de Jesus durou poucos anos, mas transformou a história. Ele ensinou, curou, chamou discípulos,",
            "type": "PARAGRAPH"
          },
          {
            "text": "enfrentou espíritos malignos, perdoou, confrontou líderes, acolheu pessoas desprezadas e anunciou o Reino",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se quisermos entender Jesus, não podemos separar suas palavras de suas ações. Ele não veio apenas",
            "type": "PARAGRAPH"
          },
          {
            "text": "entregar informações sobre Deus; veio tornar visível a chegada do governo de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-10-read-5",
        "studyId": "track-03-study-10",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Marcos 1:14-39",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-10-observe-6",
        "studyId": "track-03-study-10",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Marcos 1 funciona quase como uma amostra do ministério de Jesus. Ele anuncia o Evangelho: o Reino de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus chegou perto, e a resposta é arrependimento e fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus chama pessoas para segui-lo. Não forma apenas ouvintes; forma discípulos que aprendem sua vida e",
            "type": "PARAGRAPH"
          },
          {
            "text": "participam de sua missão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele une palavra e ação. Ensina com autoridade e também cura, liberta e se aproxima de pessoas feridas. Sua",
            "type": "PARAGRAPH"
          },
          {
            "text": "mensagem não é fria.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois de um dia cheio, Jesus se retira para orar. Quando todos o procuram, não permite que a popularidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "determine sozinha seus próximos passos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atividade não substitui comunhão",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus não confunde demanda com direção; serviço e oração caminham juntos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-10-understand-7",
        "studyId": "track-03-study-10",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "O Reino é o centro, não a autopromoção. Jesus não constrói uma marca pessoal; anuncia o governo de Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "e chama pessoas a voltar-se para Ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Milagres são sinais, não espetáculo. As curas revelam compaixão e autoridade, mas Jesus não transforma",
            "type": "PARAGRAPH"
          },
          {
            "text": "sofrimento humano em show.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus busca pecadores e excluídos. Senta-se à mesa com pessoas desprezadas e mostra que missão exige",
            "type": "PARAGRAPH"
          },
          {
            "text": "proximidade. Não podemos alcançar quem nos recusamos a enxergar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Os Evangelhos avançam para a cruz e ressurreição. O ministério não é uma coleção aleatória de milagres;",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminha para a entrega redentora.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-10-connect-8",
        "studyId": "track-03-study-10",
        "type": "CONNECT",
        "title": "Ministério não é palco",
        "blocks": [
          {
            "text": "É serviço ao propósito do Pai e ao bem das pessoas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-10-interpretation-caution-9",
        "studyId": "track-03-study-10",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Jesus curou muitas pessoas, mas o Novo Testamento ainda mostra cristãos doentes e sofrendo. Os milagres",
            "type": "PARAGRAPH"
          },
          {
            "text": "são sinais reais do Reino, não garantia de ausência de doença antes da ressurreição final. Podemos orar por",
            "type": "PARAGRAPH"
          },
          {
            "text": "cura sem prometer aquilo que Deus não prometeu.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-10-deepen-10",
        "studyId": "track-03-study-10",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Jesus às vezes se afastava das multidões porque compaixão não significa viver controlado por todas as",
            "type": "PARAGRAPH"
          },
          {
            "text": "demandas. Ele possuía missão e prioridades, orava, descansava e sabia dizer não a expectativas. Limites",
            "type": "PARAGRAPH"
          },
          {
            "text": "podem fazer parte de uma vida fiel.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-10-apply-11",
        "studyId": "track-03-study-10",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Não reduza fé a consumir conteúdo. Jesus chama seguidores, não espectadores. Estudar precisa resultar em",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminhada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Una verdade e compaixão. Alguns querem doutrina sem pessoas; outros querem cuidado sem verdade. Jesus",
            "type": "PARAGRAPH"
          },
          {
            "text": "ensina e cuida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não transforme serviço em espetáculo. Se sua ajuda precisa sempre de câmera, aplauso ou reconhecimento,",
            "type": "PARAGRAPH"
          },
          {
            "text": "algo pode estar desalinhado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Proteja espaço para oração. Atividade espiritual também pode nos afastar de Deus se nunca paramos. Jesus",
            "type": "PARAGRAPH"
          },
          {
            "text": "servia muito e ainda buscava o Pai.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte a si mesmo",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que estou praticando daquilo que já aprendi sobre Jesus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-10-journey-takeaway-12",
        "studyId": "track-03-study-10",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "O ministério de Jesus anuncia o Reino em palavras e ações. Ele ensina, cura, liberta, acolhe, confronta, chama",
            "type": "PARAGRAPH"
          },
          {
            "text": "discípulos e ora.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tudo caminha para a cruz e a ressurreição. Jesus não veio apenas informar sobre Deus; veio tornar visível o",
            "type": "PARAGRAPH"
          },
          {
            "text": "governo de Deus e chamar pessoas para segui-lo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Seguir o ministério de Jesus significa unir mensagem, compaixão, discipulado, oração e missão sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "transformar pessoas em plateia ou ministério em espetáculo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-10-practice-today-13",
        "studyId": "track-03-study-10",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Olhe para sua semana. Escolha uma pessoa a quem pode servir de forma concreta e um momento que",
            "type": "PARAGRAPH"
          },
          {
            "text": "protegerá para oração sem celular.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-10-reflection-questions-14",
        "studyId": "track-03-study-10",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Tenho sido mais espectador ou discípulo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha fé une verdade e compaixão?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu serviço depende de reconhecimento?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho espaço real para oração?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-10-journal-prompt-15",
        "studyId": "track-03-study-10",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Qual prioridade do ministério de Jesus mais precisa corrigir minha rotina hoje?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-10-prayer-16",
        "studyId": "track-03-study-10",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus, ensina-me a seguir teu caminho, não apenas admirar teu ministério. Dá-me amor pela verdade,",
            "type": "PARAGRAPH"
          },
          {
            "text": "compaixão pelas pessoas, coragem para servir e disciplina para buscar o Pai. Livra-me da necessidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "de aparecer e do ativismo sem oração. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-10-keep-17",
        "studyId": "track-03-study-10",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Marcos 1:15 - a mensagem central do início do ministério.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Marcos 1:35 - observe o lugar da oração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-10-group-mode-18",
        "studyId": "track-03-study-10",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "Quais prioridades aparecem em Marcos 1?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que milagres não devem virar espetáculo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como podemos unir verdade, compaixão e oração em nossa vida?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-10-continue-journey-19",
        "studyId": "track-03-study-10",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 11 - Milagres: sinais que apontam para quem Jesus é. Por que Jesus realizou milagres?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-10-references-20",
        "studyId": "track-03-study-10",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Marcos 1:14-39 • Lucas 4:16-21 • Mateus 9:35-38 • Marcos 2:13-17 • Marcos 3:13-15 • Atos 10:37-38",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-11",
    "sections": [
      {
        "id": "track-03-study-11-golden-text-1",
        "studyId": "track-03-study-11",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Quem é este que até o vento e o mar lhe obedecem?” Marcos 4:41",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-11-practical-truth-2",
        "studyId": "track-03-study-11",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Milagres apontam para Cristo e para seu Reino; fé madura pede com confiança, serve com compaixão",
            "type": "PARAGRAPH"
          },
          {
            "text": "e continua firme mesmo quando a resposta não vem como esperávamos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-11-bible-reading-3",
        "studyId": "track-03-study-11",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Marcos 4:35-41",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Marcos 2:1-12 • Marcos 5:21-43 • João 2:1-11 • João 20:30-31 • Mateus 11:2-6",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-11-before-understanding-4",
        "studyId": "track-03-study-11",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Milagres atraem nossa atenção. É natural. Quando algo rompe aquilo que consideramos normal, queremos",
            "type": "PARAGRAPH"
          },
          {
            "text": "saber o que aconteceu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Os Evangelhos mostram Jesus realizando curas, libertações, multiplicação de alimentos, domínio sobre a",
            "type": "PARAGRAPH"
          },
          {
            "text": "natureza e até ressuscitando mortos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas os milagres não existem apenas para provocar espanto. Eles levantam uma pergunta mais importante:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem é Jesus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-11-read-5",
        "studyId": "track-03-study-11",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Marcos 4:35-41",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-11-observe-6",
        "studyId": "track-03-study-11",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Em Marcos 4, os discípulos atravessam o mar com Jesus e enfrentam uma tempestade. A presença de Jesus",
            "type": "PARAGRAPH"
          },
          {
            "text": "não impede a crise de começar. Isso desmonta a ideia de que estar com Cristo significa nunca atravessar",
            "type": "PARAGRAPH"
          },
          {
            "text": "perigo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus fala ao vento e ao mar, e eles obedecem. O milagre revela uma autoridade que ultrapassa a de um",
            "type": "PARAGRAPH"
          },
          {
            "text": "mestre comum. Por isso a pergunta dos discípulos muda: “Quem é este?”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O medo também muda de direção. Antes, eles temem a tempestade; depois, ficam tomados de temor diante",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Jesus. O milagre não produz apenas alívio, mas reverência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em muitos relatos, o poder de Jesus aparece junto à compaixão. Ele toca leprosos, recebe pessoas",
            "type": "PARAGRAPH"
          },
          {
            "text": "desesperadas e vê multidões com misericórdia. O extraordinário serve pessoas reais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O milagre aponta para identidade",
            "type": "SUBHEADING"
          },
          {
            "text": "A pergunta mais importante não é apenas “o que aconteceu?”, mas “quem é este Jesus?”",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-11-understand-7",
        "studyId": "track-03-study-11",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Os milagres são sinais do Reino. Eles antecipam o tipo de restauração que Deus promete: doença vencida,",
            "type": "PARAGRAPH"
          },
          {
            "text": "fome enfrentada, forças malignas derrotadas e morte confrontada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João chama muitos milagres de “sinais”. Um sinal aponta para algo além de si mesmo. O objetivo não é parar",
            "type": "PARAGRAPH"
          },
          {
            "text": "no acontecimento, mas reconhecer o Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem toda pessoa curada pelos Evangelhos permaneceu viva para sempre. Lázaro, por exemplo, um dia",
            "type": "PARAGRAPH"
          },
          {
            "text": "morreu novamente. As curas eram reais, mas ainda não eram a consumação final. A esperança maior é",
            "type": "PARAGRAPH"
          },
          {
            "text": "ressurreição e nova criação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé não é técnica para produzir milagres. Deus não é controlado por fórmula, volume de voz ou intensidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "emocional. Podemos pedir com confiança, mas o poder pertence a Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-11-connect-8",
        "studyId": "track-03-study-11",
        "type": "CONNECT",
        "title": "São janelas do futuro",
        "blocks": [
          {
            "text": "Os milagres antecipam a restauração, mas não significam que toda doença e toda morte já",
            "type": "PARAGRAPH"
          },
          {
            "text": "desapareceram do mundo presente.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-11-interpretation-caution-9",
        "studyId": "track-03-study-11",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Não culpe automaticamente o doente por falta de fé. Os Evangelhos apresentam histórias variadas: em",
            "type": "PARAGRAPH"
          },
          {
            "text": "algumas a fé é destacada; em outras Jesus age sem qualquer descrição da fé do doente. Sofrimento não é",
            "type": "PARAGRAPH"
          },
          {
            "text": "prova automática de fracasso espiritual.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-11-deepen-10",
        "studyId": "track-03-study-11",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Jesus às vezes manda não divulgar um milagre porque não queria ser reduzido a milagreiro de multidões. A",
            "type": "PARAGRAPH"
          },
          {
            "text": "fama podia alimentar expectativas políticas e uma compreensão superficial de sua missão. Milagre sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "discipulado pode virar consumo religioso.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-11-apply-11",
        "studyId": "track-03-study-11",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Ore por milagres sem transformar Deus em máquina de respostas. Podemos pedir cura e intervenção, mas",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossa fé não depende de controlar o resultado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Enxergue a pessoa, não apenas o caso extraordinário. Jesus não tratava pessoas como conteúdo. Cuidado",
            "type": "PARAGRAPH"
          },
          {
            "text": "cristão preserva dignidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deixe os sinais aumentar sua reverência. O objetivo não é apenas dizer “uau”, mas conhecer mais",
            "type": "PARAGRAPH"
          },
          {
            "text": "profundamente quem Jesus é.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Confie mesmo quando não houver intervenção imediata. Nossa esperança final é maior do que o milagre",
            "type": "PARAGRAPH"
          },
          {
            "text": "presente: é a ressurreição e a nova criação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore com confiança e entrega",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus pode agir de maneira extraordinária e continua sendo Deus quando o caminho é diferente do",
            "type": "PARAGRAPH"
          },
          {
            "text": "que desejamos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-11-journey-takeaway-12",
        "studyId": "track-03-study-11",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Os milagres de Jesus são sinais de compaixão, autoridade e Reino. Eles mostram quem Jesus é e antecipam a",
            "type": "PARAGRAPH"
          },
          {
            "text": "restauração que Deus promete.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas não foram dados para transformar Deus em objeto de controle ou pessoas em espetáculo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Milagres apontam para Cristo e para seu Reino; fé madura pede com confiança, serve com compaixão",
            "type": "PARAGRAPH"
          },
          {
            "text": "e continua firme mesmo quando a resposta não vem como esperávamos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-11-practice-today-13",
        "studyId": "track-03-study-11",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Ore hoje por uma necessidade concreta de alguém. Depois faça também algo que esteja ao seu alcance:",
            "type": "PARAGRAPH"
          },
          {
            "text": "visitar, ajudar, acompanhar, preparar uma refeição ou simplesmente estar presente.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-11-reflection-questions-14",
        "studyId": "track-03-study-11",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Minha fé depende de receber respostas extraordinárias?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho usado histórias de sofrimento de outras pessoas como espetáculo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que os milagres revelam sobre a identidade de Jesus?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Consigo orar com fé e também entregar o resultado a Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-11-journal-prompt-15",
        "studyId": "track-03-study-11",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que resposta tenho tentado controlar em vez de apresentar a Deus com confiança e entrega?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-11-prayer-16",
        "studyId": "track-03-study-11",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus, tu tens autoridade e compaixão. Apresento a ti minhas necessidades e as necessidades de",
            "type": "PARAGRAPH"
          },
          {
            "text": "quem amo. Peço tua intervenção e, ao mesmo tempo, reconheço que não controlo teus caminhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Livra-me de culpar quem sofre e de transformar milagres em espetáculo. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-11-keep-17",
        "studyId": "track-03-study-11",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Marcos 4:41 - a pergunta que o milagre provoca.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 20:30-31 - o propósito dos sinais registrados.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-11-group-mode-18",
        "studyId": "track-03-study-11",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que a tempestade revela sobre Jesus e sobre os discípulos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que milagres não podem ser transformados em fórmula?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como unir oração por cura e cuidado prático com quem sofre?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-11-continue-journey-19",
        "studyId": "track-03-study-11",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 12 - Ensino: palavras que pedem uma vida diferente. Por que ouvir Jesus exige mais do que",
            "type": "PARAGRAPH"
          },
          {
            "text": "admiração?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-11-references-20",
        "studyId": "track-03-study-11",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Marcos 4:35-41 • Marcos 2:1-12 • Marcos 5:21-43 • João 2:1-11 • João 20:30-31 • Mateus 11:2-6",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-12",
    "sections": [
      {
        "id": "track-03-study-12-golden-text-1",
        "studyId": "track-03-study-12",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Todo aquele que ouve estas minhas palavras e as pratica será comparado a um homem prudente.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 7:24",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-12-practical-truth-2",
        "studyId": "track-03-study-12",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "O ensino de Jesus não foi dado para decorar nossa fé, mas para formar nossa vida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-12-bible-reading-3",
        "studyId": "track-03-study-12",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Mateus 7:24-29",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Mateus 5:1-12 • Mateus 5:21-48 • Mateus 6:1-18 • Marcos 4:1-20 • Lucas 10:25-37",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-12-before-understanding-4",
        "studyId": "track-03-study-12",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Jesus é admirado até por pessoas que não se consideram cristãs. Suas frases são citadas em livros, redes",
            "type": "PARAGRAPH"
          },
          {
            "text": "sociais e discursos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Jesus não ensinava para produzir frases bonitas. Seu ensino chama para arrependimento, fé, amor,",
            "type": "PARAGRAPH"
          },
          {
            "text": "perdão, verdade, justiça, oração e uma nova maneira de enxergar Deus e o próximo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "No final do Sermão do Monte, Ele faz uma comparação simples: ouvir sem praticar é construir casa sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "fundamento.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-12-read-5",
        "studyId": "track-03-study-12",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Mateus 7:24-29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-12-observe-6",
        "studyId": "track-03-study-12",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Mateus 7 encerra uma longa seção de ensino. Jesus compara dois construtores. Os dois ouvem. A diferença",
            "type": "PARAGRAPH"
          },
          {
            "text": "está no que fazem com aquilo que ouviram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema do construtor insensato não é falta de informação. Ele ouviu. Isso mostra que conhecimento não",
            "type": "PARAGRAPH"
          },
          {
            "text": "é igual a transformação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A tempestade chega às duas casas. Obediência não impede toda crise; a diferença aparece no fundamento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé não promete vida sem tempestades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus coloca suas próprias palavras no centro e chama o ouvinte a construir a vida sobre elas. Os ouvintes",
            "type": "PARAGRAPH"
          },
          {
            "text": "percebem que Ele ensina com autoridade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Informação não é transformação",
            "type": "SUBHEADING"
          },
          {
            "text": "Podemos conhecer muito sobre Jesus e praticar pouco do que Ele ensinou.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-12-understand-7",
        "studyId": "track-03-study-12",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Jesus não veio apenas criar novas regras. No Sermão do Monte, leva a vontade de Deus para além da",
            "type": "PARAGRAPH"
          },
          {
            "text": "aparência e alcança ira, desejo, intenção, amor aos inimigos, oração secreta e ansiedade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "As parábolas convidam a ouvir de verdade. Não são apenas histórias infantis; confrontam o ouvinte e pedem",
            "type": "PARAGRAPH"
          },
          {
            "text": "resposta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O amor ao próximo ganha forma concreta. Na parábola do bom samaritano, Jesus desloca a pergunta de",
            "type": "PARAGRAPH"
          },
          {
            "text": "“quem merece ser meu próximo?” para “como me torno próximo?”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Admiração sozinha não constrói a casa. A obediência é parte da resposta da fé. Não compra a graça, mas",
            "type": "PARAGRAPH"
          },
          {
            "text": "revela que estamos levando o Mestre a sério.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-12-connect-8",
        "studyId": "track-03-study-12",
        "type": "CONNECT",
        "title": "O Reino alcança o interior",
        "blocks": [
          {
            "text": "Deus não está interessado apenas em aparência religiosa, mas no coração que produz nossas ações.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-12-interpretation-caution-9",
        "studyId": "track-03-study-12",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Não transforme o Sermão do Monte em lista para medir quem merece Deus. O mesmo Evangelho mostra",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossa necessidade de graça. Obediência é fruto de seguir Cristo, não moeda para comprar aceitação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-12-deepen-10",
        "studyId": "track-03-study-12",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Em Mateus 5, Jesus afirma que não veio abolir a Lei, mas cumprir. Seu ensino mostra o sentido profundo da",
            "type": "PARAGRAPH"
          },
          {
            "text": "vontade de Deus e precisa ser lido à luz de sua pessoa e do restante do Novo Testamento.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-12-apply-11",
        "studyId": "track-03-study-12",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Pare de confundir ouvir com obedecer. Podcasts, pregações e estudos podem aumentar conhecimento sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "mudar hábitos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leve o coração a sério. É possível evitar atos externos e cultivar por dentro ira, orgulho ou desejo que",
            "type": "PARAGRAPH"
          },
          {
            "text": "desumaniza.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use versículos para vencer discussões e perder pessoas. Conhecimento bíblico usado para humilhar",
            "type": "PARAGRAPH"
          },
          {
            "text": "contradiz o próprio Mestre.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Construa antes da tempestade. Fundamento é formado no cotidiano, nas pequenas obediências que",
            "type": "PARAGRAPH"
          },
          {
            "text": "ninguém aplaude.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escolha uma prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Qual ensino de Jesus você já conhece, mas ainda evita praticar?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-12-journey-takeaway-12",
        "studyId": "track-03-study-12",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus ensina com autoridade. Suas palavras alcançam ações e motivações. Ele não busca apenas admiradores",
            "type": "PARAGRAPH"
          },
          {
            "text": "intelectuais, mas discípulos que ouvem e praticam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A casa firme não é a vida sem tempestades; é a vida construída sobre sua palavra.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "O ensino de Jesus não foi dado para decorar nossa fé, mas para formar nossa vida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-12-practice-today-13",
        "studyId": "track-03-study-12",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha um ensino conhecido de Jesus: perdoar, falar a verdade, orar em secreto, amar o próximo ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "abandonar julgamento hipócrita. Pratique uma ação concreta hoje.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-12-reflection-questions-14",
        "studyId": "track-03-study-12",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Que ensino de Jesus conheço, mas tenho evitado praticar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha fé está mais preocupada com aparência ou coração?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uso conhecimento bíblico para servir ou para vencer pessoas?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que fundamento preciso fortalecer antes da próxima tempestade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-12-journal-prompt-15",
        "studyId": "track-03-study-12",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Qual palavra de Jesus precisa sair da minha cabeça e entrar na minha prática hoje?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-12-prayer-16",
        "studyId": "track-03-study-12",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mestre Jesus, obrigado por tuas palavras. Livra-me de ouvir muito e praticar pouco. Mostra onde",
            "type": "PARAGRAPH"
          },
          {
            "text": "minha aparência religiosa esconde um coração que precisa mudar. Dá-me coragem para obedecer nos",
            "type": "PARAGRAPH"
          },
          {
            "text": "detalhes e construir minha vida sobre teu ensino. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-12-keep-17",
        "studyId": "track-03-study-12",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Mateus 7:24-25 - o construtor prudente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 7:28-29 - a autoridade do ensino de Jesus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-12-group-mode-18",
        "studyId": "track-03-study-12",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "Qual é a diferença entre os dois construtores?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que o ensino de Jesus alcança motivações e não apenas atos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que ensino podemos praticar juntos nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-12-continue-journey-19",
        "studyId": "track-03-study-12",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 13 - Cruz: o Rei entrega a própria vida. O que a cruz revela sobre Jesus e sobre a maneira",
            "type": "PARAGRAPH"
          },
          {
            "text": "como Deus salva?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-12-references-20",
        "studyId": "track-03-study-12",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Mateus 7:24-29 • Mateus 5:1-12 • Mateus 5:21-48 • Mateus 6:1-18 • Marcos 4:1-20 • Lucas 10:25-37",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-13",
    "sections": [
      {
        "id": "track-03-study-13-golden-text-1",
        "studyId": "track-03-study-13",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Cristo morreu por nossos pecados, segundo as Escrituras.” 1 Coríntios 15:3",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-13-practical-truth-2",
        "studyId": "track-03-study-13",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A cruz de Cristo nos chama a arrependimento, confiança, gratidão e uma vida nova que não precisa",
            "type": "PARAGRAPH"
          },
          {
            "text": "ser governada por culpa nem orgulho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-13-bible-reading-3",
        "studyId": "track-03-study-13",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Marcos 15:21-39",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Isaías 53:4-6 • João 10:17-18 • Romanos 5:6-11 • 2 Coríntios 5:18-21 • Colossenses",
            "type": "PARAGRAPH"
          },
          {
            "text": "2:13-15",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-13-before-understanding-4",
        "studyId": "track-03-study-13",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "A cruz era instrumento romano de execução e humilhação. Não havia nada de romântico nela.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mesmo assim, tornou-se o símbolo mais reconhecido da fé cristã porque os primeiros cristãos entenderam",
            "type": "PARAGRAPH"
          },
          {
            "text": "que a morte de Jesus não era apenas o assassinato injusto de um homem bom.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Era o centro da obra de Deus para salvar. Na cruz, amor, justiça, perdão, entrega e vitória se encontram.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-13-read-5",
        "studyId": "track-03-study-13",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Marcos 15:21-39",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-13-observe-6",
        "studyId": "track-03-study-13",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Marcos descreve a crucificação de maneira sóbria. Jesus é condenado, zombado e executado. A Bíblia não",
            "type": "PARAGRAPH"
          },
          {
            "text": "apaga a responsabilidade humana pelo mal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ao mesmo tempo, João 10 mostra Jesus entregando a vida voluntariamente. A cruz não é acidente fora do",
            "type": "PARAGRAPH"
          },
          {
            "text": "controle; pertence à sua missão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 15 resume o Evangelho dizendo que Cristo morreu por nossos pecados. Isaías 53 e 1 Pedro",
            "type": "PARAGRAPH"
          },
          {
            "text": "ampliam essa relação entre sua entrega e nossa culpa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses também fala da cruz como vitória sobre poderes hostis. O que parece derrota se torna o",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminho da vitória redentora.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A redenção não chama o crime de bondade",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus age através de uma situação de mal sem apagar a responsabilidade de quem praticou o mal.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-13-understand-7",
        "studyId": "track-03-study-13",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "O Novo Testamento usa linguagem de representação e substituição: Cristo morre “por nós”. Ele assume",
            "type": "PARAGRAPH"
          },
          {
            "text": "aquilo que não poderíamos resolver sozinhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pai e Filho não são adversários. A cruz não é um Pai cruel contra um Filho sem vontade. Jesus se entrega, e",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus está em Cristo reconciliando o mundo consigo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5 liga a cruz ao amor de Deus. Quando nossas emoções oscilam, a cruz permanece como um fato",
            "type": "PARAGRAPH"
          },
          {
            "text": "da história do Evangelho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão não é apenas alívio da culpa sem transformação. A reconciliação abre uma nova maneira de viver",
            "type": "PARAGRAPH"
          },
          {
            "text": "diante de Deus e das pessoas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-13-connect-8",
        "studyId": "track-03-study-13",
        "type": "CONNECT",
        "title": "A cruz reúne várias imagens",
        "blocks": [
          {
            "text": "Sacrifício, reconciliação, justificação, redenção e vitória se complementam em vez de competir.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-13-interpretation-caution-9",
        "studyId": "track-03-study-13",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "“Carregar a cruz” não significa aceitar violência doméstica, abuso espiritual ou exploração. Jesus escolheu",
            "type": "PARAGRAPH"
          },
          {
            "text": "voluntariamente sua missão única. A cruz salva vítimas; não deve ser usada para proteger agressores.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-13-deepen-10",
        "studyId": "track-03-study-13",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "O Novo Testamento usa várias imagens porque a obra de Cristo é rica demais para uma única comparação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sacrifício fala de pecado; reconciliação de relação restaurada; justificação de aceitação; vitória da derrota dos",
            "type": "PARAGRAPH"
          },
          {
            "text": "poderes; redenção de libertação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-13-apply-11",
        "studyId": "track-03-study-13",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Pare de minimizar o pecado e pare também de viver sem esperança. A cruz derruba duas mentiras: “não tem",
            "type": "PARAGRAPH"
          },
          {
            "text": "problema” e “não tem solução”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receba perdão sem transformar culpa em identidade. Arrependimento reconhece o pecado e caminha para",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma vida nova.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aprenda amor que se entrega. A cruz redefine amor como ação sacrificial, sem abolir limites saudáveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deixe a cruz matar o orgulho. Ninguém chega ali para mostrar currículo. Todos dependemos de graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O chão da cruz é nivelado",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não há espaço para superioridade espiritual diante daquele que morreu por pecadores.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-13-journey-takeaway-12",
        "studyId": "track-03-study-13",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "A cruz é o centro da missão de Jesus. Ela acontece em meio à injustiça humana, mas pertence ao propósito",
            "type": "PARAGRAPH"
          },
          {
            "text": "redentor de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo se entrega por nossos pecados, reconcilia, perdoa e vence. Deus não chama o pecado de pequeno e",
            "type": "PARAGRAPH"
          },
          {
            "text": "também não chama o pecador de irrecuperável.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "A cruz de Cristo nos chama a arrependimento, confiança, gratidão e uma vida nova que não precisa",
            "type": "PARAGRAPH"
          },
          {
            "text": "ser governada por culpa nem orgulho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-13-practice-today-13",
        "studyId": "track-03-study-13",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Reserve alguns minutos diante de Marcos 15. Confesse um pecado concreto, agradeça pela obra de Cristo e",
            "type": "PARAGRAPH"
          },
          {
            "text": "escolha uma atitude de reparação ou mudança que esteja ao seu alcance.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-13-reflection-questions-14",
        "studyId": "track-03-study-13",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Tenho minimizado algum pecado?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Carrego alguma culpa como se a cruz não fosse suficiente?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a cruz confronta meu orgulho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que reconciliação ou reparação preciso buscar?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-13-journal-prompt-15",
        "studyId": "track-03-study-13",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que culpa ou orgulho preciso deixar ao pé da cruz hoje?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-13-prayer-16",
        "studyId": "track-03-study-13",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus, obrigado por tua cruz. Reconheço meu pecado e também tua graça. Livra-me de minimizar",
            "type": "PARAGRAPH"
          },
          {
            "text": "aquilo que te levou à cruz e de viver como se tua obra não fosse suficiente. Ensina-me",
            "type": "PARAGRAPH"
          },
          {
            "text": "arrependimento verdadeiro, gratidão, humildade e uma vida reconciliada. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-13-keep-17",
        "studyId": "track-03-study-13",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "1 Coríntios 15:3-4 - o resumo do Evangelho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5:8 - a demonstração do amor de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-13-group-mode-18",
        "studyId": "track-03-study-13",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "Que diferentes aspectos da cruz aparecem nos textos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que Pai e Filho não devem ser apresentados como adversários?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a cruz muda nossa relação com culpa e orgulho?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-13-continue-journey-19",
        "studyId": "track-03-study-13",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 14 - Ressurreição: Jesus vive e a história muda. Por que sem a ressurreição o Evangelho perde",
            "type": "PARAGRAPH"
          },
          {
            "text": "seu fundamento?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-13-references-20",
        "studyId": "track-03-study-13",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Marcos 15:21-39 • Isaías 53:4-6 • João 10:17-18 • Romanos 5:6-11 • 2 Coríntios 5:18-21 • Colossenses",
            "type": "PARAGRAPH"
          },
          {
            "text": "2:13-15",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-14",
    "sections": [
      {
        "id": "track-03-study-14-golden-text-1",
        "studyId": "track-03-study-14",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Ele não está aqui, mas ressuscitou.” Lucas 24:6",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-14-practical-truth-2",
        "studyId": "track-03-study-14",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Porque Jesus vive, nossa fé possui fundamento, nossa vida pode começar a mudar agora e nosso",
            "type": "PARAGRAPH"
          },
          {
            "text": "futuro não termina no túmulo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-14-bible-reading-3",
        "studyId": "track-03-study-14",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Lucas 24:1-12",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: João 20:19-29 • Atos 2:22-36 • Romanos 6:4-11 • 1 Coríntios 15:12-22 • 1 Pedro",
            "type": "PARAGRAPH"
          },
          {
            "text": "1:3-5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-14-before-understanding-4",
        "studyId": "track-03-study-14",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Se Jesus apenas morreu, podemos admirá-lo como mártir. Mas o cristianismo afirma algo muito maior: Ele",
            "type": "PARAGRAPH"
          },
          {
            "text": "ressuscitou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Os primeiros cristãos não tratavam a ressurreição como símbolo de “recomeçar depois de uma fase difícil”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Anunciavam que o Jesus crucificado estava vivo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso a ressurreição não é detalhe de Páscoa. É fundamento do Evangelho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-14-read-5",
        "studyId": "track-03-study-14",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Lucas 24:1-12",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-14-observe-6",
        "studyId": "track-03-study-14",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Lucas 24 começa com mulheres indo ao túmulo para cuidar de um corpo morto. Elas não chegam esperando",
            "type": "PARAGRAPH"
          },
          {
            "text": "encontrar Jesus vivo. A surpresa faz parte do relato.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O túmulo está vazio. A mensagem começa no espaço físico da morte e anuncia algo concreto: Jesus que",
            "type": "PARAGRAPH"
          },
          {
            "text": "morreu não está ali.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ressurreição não é simplesmente retorno à vida anterior. Jesus não volta apenas para envelhecer e morrer",
            "type": "PARAGRAPH"
          },
          {
            "text": "outra vez; ressuscita para uma vida transformada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Os discípulos precisam ser convencidos. Os relatos mostram dúvida, surpresa e investigação. Depois, a",
            "type": "PARAGRAPH"
          },
          {
            "text": "mensagem se torna pública em Atos: Deus ressuscitou Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A mensagem é concreta",
            "type": "SUBHEADING"
          },
          {
            "text": "A fé pascal não começa apenas com sentimento; começa com o anúncio de que o Crucificado está",
            "type": "PARAGRAPH"
          },
          {
            "text": "vivo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-14-understand-7",
        "studyId": "track-03-study-14",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "A ressurreição confirma Jesus. Atos liga o acontecimento à sua exaltação como Senhor e Cristo. Aquele que",
            "type": "PARAGRAPH"
          },
          {
            "text": "foi rejeitado é vindicado por Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela também confirma a cruz. Paulo diz que, se Cristo não ressuscitou, a fé é inútil. Cruz e ressurreição",
            "type": "PARAGRAPH"
          },
          {
            "text": "pertencem juntas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 15 chama Jesus de primícias, a primeira parte da colheita. Sua ressurreição aponta para a futura",
            "type": "PARAGRAPH"
          },
          {
            "text": "ressurreição de seu povo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 6 conecta a ressurreição à novidade de vida. Não esperamos apenas o futuro; já somos chamados a",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma nova direção no presente.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-14-connect-8",
        "studyId": "track-03-study-14",
        "type": "CONNECT",
        "title": "Ressurreição é mais que reanimação",
        "blocks": [
          {
            "text": "É início de uma nova realidade e promessa de futuro para os que pertencem a Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-14-interpretation-caution-9",
        "studyId": "track-03-study-14",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Não reduza a ressurreição a “Jesus vive em nossos corações”. A presença de Cristo em seu povo é",
            "type": "PARAGRAPH"
          },
          {
            "text": "importante, mas o Novo Testamento anuncia algo mais concreto: Jesus ressuscitou dos mortos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-14-deepen-10",
        "studyId": "track-03-study-14",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "1 Coríntios 15 fala de continuidade e transformação no corpo ressuscitado. Paulo usa a imagem da semente",
            "type": "PARAGRAPH"
          },
          {
            "text": "e fala de incorruptibilidade. Não sabemos todos os detalhes físicos, mas a esperança cristã não é existência",
            "type": "PARAGRAPH"
          },
          {
            "text": "eterna sem corpo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-14-apply-11",
        "studyId": "track-03-study-14",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Não trate a morte como vencedora final. O luto continua real e doloroso, mas para quem está em Cristo não",
            "type": "PARAGRAPH"
          },
          {
            "text": "é desespero sem horizonte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Viva como alguém que pertence à nova criação. Romanos 6 chama a abandonar o domínio do pecado e",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminhar em novidade de vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leve suas dúvidas a Jesus. Tomé duvidou e foi confrontado com a realidade de Cristo. Perguntas não",
            "type": "PARAGRAPH"
          },
          {
            "text": "precisam virar cinismo; podem virar busca.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deixe a esperança produzir coragem. Os discípulos assustados tornam-se testemunhas. Quem sabe que a",
            "type": "PARAGRAPH"
          },
          {
            "text": "morte não é final pode viver com outra coragem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança não cancela lágrimas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dá às lágrimas um futuro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-14-journey-takeaway-12",
        "studyId": "track-03-study-14",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus ressuscitou. Essa afirmação está no coração do Evangelho. A ressurreição confirma o Filho, confirma a",
            "type": "PARAGRAPH"
          },
          {
            "text": "cruz, derrota a morte e inaugura a esperança da nova criação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O túmulo vazio não é apenas notícia sobre o passado; é garantia de que a morte não terá a última palavra.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Porque Jesus vive, nossa fé possui fundamento, nossa vida pode começar a mudar agora e nosso",
            "type": "PARAGRAPH"
          },
          {
            "text": "futuro não termina no túmulo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-14-practice-today-13",
        "studyId": "track-03-study-14",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Pense em uma área onde você tem vivido como se nada pudesse mudar. Leia Romanos 6:4 e escolha um",
            "type": "PARAGRAPH"
          },
          {
            "text": "pequeno passo de novidade de vida hoje.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-14-reflection-questions-14",
        "studyId": "track-03-study-14",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Minha esperança cristã inclui ressurreição corporal?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a ressurreição muda minha relação com medo da morte?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que área precisa experimentar novidade de vida?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Consigo levar minhas dúvidas a Cristo em vez de escondê-las?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-14-journal-prompt-15",
        "studyId": "track-03-study-14",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que parte da minha vida precisa ser vivida à luz da verdade de que Jesus está vivo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-14-prayer-16",
        "studyId": "track-03-study-14",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus ressuscitado, obrigado porque a morte não te venceu. Sustenta minha fé quando eu tiver",
            "type": "PARAGRAPH"
          },
          {
            "text": "dúvidas, consola-me diante do luto e ensina-me a viver em novidade de vida. Que tua ressurreição",
            "type": "PARAGRAPH"
          },
          {
            "text": "seja esperança que muda minhas escolhas e meu futuro. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-14-keep-17",
        "studyId": "track-03-study-14",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Lucas 24:5-6 - a pergunta e o anúncio no túmulo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 15:20 - Cristo como primícias.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-14-group-mode-18",
        "studyId": "track-03-study-14",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que mais chama atenção na reação dos primeiros discípulos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que cruz e ressurreição não podem ser separadas?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a esperança da ressurreição pode mudar uma decisão desta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-14-continue-journey-19",
        "studyId": "track-03-study-14",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 15 - Ascensão: o Cristo exaltado que continua sua obra. Por que a ascensão importa para a",
            "type": "PARAGRAPH"
          },
          {
            "text": "Igreja hoje?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-14-references-20",
        "studyId": "track-03-study-14",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Lucas 24:1-12 • João 20:19-29 • Atos 2:22-36 • Romanos 6:4-11 • 1 Coríntios 15:12-22 • 1 Pedro 1:3-5",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-15",
    "sections": [
      {
        "id": "track-03-study-15-golden-text-1",
        "studyId": "track-03-study-15",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Esse Jesus, que dentre vós foi recebido em cima no céu, há de vir assim como para o céu o vistes ir.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 1:11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-15-practical-truth-2",
        "studyId": "track-03-study-15",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A ascensão transforma nossa espera em missão: o Rei está no trono e seus discípulos são enviados a",
            "type": "PARAGRAPH"
          },
          {
            "text": "testemunhar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-15-bible-reading-3",
        "studyId": "track-03-study-15",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Atos 1:1-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Lucas 24:50-53 • Efésios 1:19-23 • Filipenses 2:9-11 • Hebreus 10:11-13 • Salmo",
            "type": "PARAGRAPH"
          },
          {
            "text": "110:1",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-15-before-understanding-4",
        "studyId": "track-03-study-15",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Depois da ressurreição, Jesus aparece aos discípulos por um período e então Atos relata sua ascensão. Esse",
            "type": "PARAGRAPH"
          },
          {
            "text": "episódio recebe menos atenção que Natal, cruz e Páscoa, mas é essencial.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ascensão mostra que o Ressuscitado é exaltado, reina e envia seus discípulos. Também muda a direção dos",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossos olhos: não ficamos parados olhando para o céu; somos enviados para testemunhar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-15-read-5",
        "studyId": "track-03-study-15",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Atos 1:1-11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-15-observe-6",
        "studyId": "track-03-study-15",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Atos 1 reúne promessa, missão e ascensão. Jesus promete poder do Espírito Santo para testemunhar. A",
            "type": "PARAGRAPH"
          },
          {
            "text": "missão da Igreja não começa na capacidade humana.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jerusalém, Judeia, Samaria e confins da terra formam um movimento de expansão. A ascensão não encerra a",
            "type": "PARAGRAPH"
          },
          {
            "text": "missão de Jesus; abre a missão da Igreja.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus é elevado, e outros textos falam de Cristo à direita de Deus. A ascensão comunica exaltação e governo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Os discípulos são chamados a parar de apenas olhar para cima. Jesus voltará, mas agora existe uma tarefa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança não é paralisia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Missão é dependência",
            "type": "SUBHEADING"
          },
          {
            "text": "A Igreja testemunha pelo poder do Espírito e sob o governo do Cristo exaltado.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-15-understand-7",
        "studyId": "track-03-study-15",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "“À direita de Deus” fala de honra e autoridade. Não precisamos imaginar uma cadeira física ao lado do Pai; é",
            "type": "PARAGRAPH"
          },
          {
            "text": "linguagem de exaltação e governo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ascensão conecta ressurreição e retorno. Jesus ressuscita, é exaltado e voltará. Entre esses atos, Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "reina enquanto a Igreja vive em missão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios apresenta Jesus acima de principados e autoridades e como cabeça da Igreja. Nenhuma força ocupa",
            "type": "PARAGRAPH"
          },
          {
            "text": "um trono maior que Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ausência visível de Jesus não significa abandono. Ele envia o Espírito, intercede e permanece presente com",
            "type": "PARAGRAPH"
          },
          {
            "text": "sua Igreja de outra maneira.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-15-connect-8",
        "studyId": "track-03-study-15",
        "type": "CONNECT",
        "title": "A ascensão muda o modo da presença",
        "blocks": [
          {
            "text": "Não elimina a presença nem a atuação de Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-15-interpretation-caution-9",
        "studyId": "track-03-study-15",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Atos 1 corrige a ideia de usar a esperança do céu para abandonar responsabilidades da terra. Esperar Jesus é",
            "type": "PARAGRAPH"
          },
          {
            "text": "viver em missão. Família, trabalho, justiça, serviço e testemunho continuam importantes.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-15-deepen-10",
        "studyId": "track-03-study-15",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "O Novo Testamento usa linguagem de exaltação para falar de onde Jesus está agora: à direita de Deus, no",
            "type": "PARAGRAPH"
          },
          {
            "text": "céu, acima dos poderes. Essas expressões comunicam presença diante do Pai, autoridade e governo; não",
            "type": "PARAGRAPH"
          },
          {
            "text": "precisam virar um mapa físico detalhado do universo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-15-apply-11",
        "studyId": "track-03-study-15",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Viva a missão onde você está. Nem todos irão para outro país, mas todos podem testemunhar no lugar onde",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus os colocou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pare de agir como se tudo dependesse da Igreja. Cristo é a cabeça. Somos participantes da missão, não",
            "type": "PARAGRAPH"
          },
          {
            "text": "salvadores do mundo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lembre-se de quem está no trono. Notícias e crises podem produzir sensação de caos absoluto, mas a",
            "type": "PARAGRAPH"
          },
          {
            "text": "ascensão nos lembra que Cristo está exaltado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Espere trabalhando. A volta de Cristo não nos chama para especulação ociosa. Até que Ele venha, vivemos",
            "type": "PARAGRAPH"
          },
          {
            "text": "fiéis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança tem tarefa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Até que Ele venha, testemunhamos, servimos e permanecemos fiéis.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-15-journey-takeaway-12",
        "studyId": "track-03-study-15",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "A ascensão marca a exaltação de Jesus. O Ressuscitado reina, envia o Espírito, dirige sua missão e voltará.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Igreja não foi deixada para olhar o céu em passividade. Foi enviada ao mundo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "A ascensão transforma nossa espera em missão: o Rei está no trono e seus discípulos são enviados a",
            "type": "PARAGRAPH"
          },
          {
            "text": "testemunhar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-15-practice-today-13",
        "studyId": "track-03-study-15",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma pessoa com quem você pode compartilhar algo verdadeiro sobre Jesus nesta semana. Ore por",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma oportunidade simples, respeitosa e natural.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-15-reflection-questions-14",
        "studyId": "track-03-study-15",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Tenho pensado na ascensão como parte importante do Evangelho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha esperança futura me torna mais ativo ou mais passivo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Onde posso testemunhar de Cristo hoje?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que muda ao lembrar que Cristo está acima dos poderes?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-15-journal-prompt-15",
        "studyId": "track-03-study-15",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Qual é meu “Jerusalém” hoje - o lugar próximo onde preciso viver e falar de Cristo com fidelidade?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-15-prayer-16",
        "studyId": "track-03-study-15",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus exaltado, obrigado porque estás vivo e reinando. Livra-me de viver paralisado pelo medo ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "pela espera. Enche-me com teu Espírito para testemunhar com humildade, coragem e amor. Lembra-",
            "type": "PARAGRAPH"
          },
          {
            "text": "me de que a missão é tua e de que eu sou apenas servo. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-15-keep-17",
        "studyId": "track-03-study-15",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Atos 1:8 - poder e missão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 1:11 - a promessa do retorno.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-15-group-mode-18",
        "studyId": "track-03-study-15",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que Jesus prioriza na conversa antes da ascensão?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que a ascensão não significa abandono?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem é nosso “próximo campo missionário”?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-15-continue-journey-19",
        "studyId": "track-03-study-15",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 16 - Intercessão: Jesus continua agindo por nós. Que segurança isso oferece?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-15-references-20",
        "studyId": "track-03-study-15",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Atos 1:1-11 • Lucas 24:50-53 • Efésios 1:19-23 • Filipenses 2:9-11 • Hebreus 10:11-13 • Salmo 110:1",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-16",
    "sections": [
      {
        "id": "track-03-study-16-golden-text-1",
        "studyId": "track-03-study-16",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Cristo Jesus é quem morreu ou, antes, quem ressuscitou dentre os mortos, o qual está à direita de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus e também intercede por nós.” Romanos 8:34",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-16-practical-truth-2",
        "studyId": "track-03-study-16",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Nossa esperança não depende de nunca falharmos, mas daquele que morreu, ressuscitou e continua",
            "type": "PARAGRAPH"
          },
          {
            "text": "presente diante de Deus em favor do seu povo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-16-bible-reading-3",
        "studyId": "track-03-study-16",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Romanos 8:31-39",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Hebreus 7:23-28 • Hebreus 9:24 • Lucas 22:31-32 • 1 João 2:1-2 • Hebreus 4:14-16",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-16-before-understanding-4",
        "studyId": "track-03-study-16",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Depois de falar da ascensão, surge uma pergunta muito pessoal: o que Jesus faz agora?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento não apresenta Cristo como alguém que terminou sua obra, foi embora e ficou",
            "type": "PARAGRAPH"
          },
          {
            "text": "indiferente à caminhada dos seus discípulos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8 fala de Jesus morto, ressuscitado, exaltado e intercedendo por nós. Hebreus também o apresenta",
            "type": "PARAGRAPH"
          },
          {
            "text": "como aquele que vive e continua representando seu povo diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que Jesus precise convencer um Pai relutante a nos amar. Pai e Filho estão unidos na obra",
            "type": "PARAGRAPH"
          },
          {
            "text": "da salvação. A intercessão de Cristo é parte da segurança que o próprio Deus oferece aos que estão nele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-16-read-5",
        "studyId": "track-03-study-16",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "Romanos 8:31-39",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-16-observe-6",
        "studyId": "track-03-study-16",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Romanos 8 começa este trecho com uma pergunta: “Se Deus é por nós, quem será contra nós?”. Paulo não",
            "type": "PARAGRAPH"
          },
          {
            "text": "está prometendo ausência de oposição. Nos versos seguintes ele menciona tribulação, perseguição, fome,",
            "type": "PARAGRAPH"
          },
          {
            "text": "perigo e espada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A segurança cristã não vem de uma vida sem problemas, mas da ação de Deus em Cristo. Jesus morreu e",
            "type": "PARAGRAPH"
          },
          {
            "text": "ressuscitou. Aquele que foi entregue por nós está vivo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo acrescenta que Cristo está à direita de Deus e intercede por nós. A imagem fala de sua exaltação e de",
            "type": "PARAGRAPH"
          },
          {
            "text": "sua atuação contínua em favor do seu povo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O capítulo termina afirmando que nenhuma das forças listadas consegue separar os que estão em Cristo do",
            "type": "PARAGRAPH"
          },
          {
            "text": "amor de Deus. A certeza está no amor de Deus em Cristo, não na força emocional do crente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nossa segurança tem um nome",
            "type": "SUBHEADING"
          },
          {
            "text": "Não é “eu nunca falharei”. É Jesus Cristo, morto, ressuscitado, exaltado e presente em favor do seu",
            "type": "PARAGRAPH"
          },
          {
            "text": "povo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-16-understand-7",
        "studyId": "track-03-study-16",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Hebreus usa a imagem do sumo sacerdote para explicar a atuação de Jesus. Diferente dos sacerdotes que",
            "type": "PARAGRAPH"
          },
          {
            "text": "morriam e precisavam ser substituídos, Cristo vive para sempre.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Interceder não significa que Jesus repete continuamente seu sacrifício. Hebreus insiste que sua oferta foi",
            "type": "PARAGRAPH"
          },
          {
            "text": "única e suficiente. Sua intercessão se apoia na obra já realizada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 22 mostra Jesus dizendo a Pedro que havia orado por ele. Pedro ainda falharia gravemente. A oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Jesus não significou ausência de queda, mas a história de Pedro também não terminou na queda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 João 2 chama Jesus de Advogado junto ao Pai quando fala a crentes que pecam. O objetivo do texto não é",
            "type": "PARAGRAPH"
          },
          {
            "text": "incentivar pecado, mas mostrar que a falha não precisa produzir desespero sem caminho de volta.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-16-connect-8",
        "studyId": "track-03-study-16",
        "type": "CONNECT",
        "title": "Intercessão não é repetição da cruz",
        "blocks": [
          {
            "text": "A cruz foi realizada; o Cristo vivo continua representando e sustentando seu povo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-16-interpretation-caution-9",
        "studyId": "track-03-study-16",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Não imagine Pai e Filho como adversários: um querendo condenar e o outro tentando impedir. O próprio Pai",
            "type": "PARAGRAPH"
          },
          {
            "text": "envia o Filho por amor, e o Filho se entrega voluntariamente. A salvação é obra de Deus, não uma disputa",
            "type": "PARAGRAPH"
          },
          {
            "text": "dentro de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não transforme segurança em permissão para uma vida deliberadamente distante de Cristo. A",
            "type": "PARAGRAPH"
          },
          {
            "text": "mesma graça que nos acolhe também nos chama ao arrependimento e à perseverança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-16-deepen-10",
        "studyId": "track-03-study-16",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "A Bíblia afirma claramente que Cristo intercede, mas não descreve cada detalhe de como essa intercessão",
            "type": "PARAGRAPH"
          },
          {
            "text": "acontece no céu. Não precisamos criar uma cena de tribunal completa, com falas e procedimentos que o",
            "type": "PARAGRAPH"
          },
          {
            "text": "texto não fornece. A imagem bíblica é suficiente: o Cristo vivo está diante de Deus em favor dos seus e sua",
            "type": "PARAGRAPH"
          },
          {
            "text": "obra é eficaz.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-16-apply-11",
        "studyId": "track-03-study-16",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Quando a acusação vier, volte ao Evangelho. Existe diferença entre a convicção que nos leva ao",
            "type": "PARAGRAPH"
          },
          {
            "text": "arrependimento e a voz que apenas diz: “Você não tem mais saída”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore com mais confiança. Hebreus convida a aproximar-nos do trono da graça para encontrar misericórdia e",
            "type": "PARAGRAPH"
          },
          {
            "text": "auxílio. Não precisamos esperar ficar “bons o bastante” para buscar Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Interceda por outras pessoas. Se Jesus nos ensina o valor de levar pessoas diante de Deus, nossa vida de",
            "type": "PARAGRAPH"
          },
          {
            "text": "oração também pode sair do centro exclusivo em nós mesmos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando falhar, não fuja. Confesse, arrependa-se, procure reparação quando necessário e volte para Cristo. A",
            "type": "PARAGRAPH"
          },
          {
            "text": "queda de Pedro não foi a última página.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A graça nos ensina a voltar",
            "type": "PARAGRAPH"
          },
          {
            "text": "Segurança em Cristo não é licença para cair; é esperança para levantar e continuar caminhando com",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-16-journey-takeaway-12",
        "studyId": "track-03-study-16",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus continua agindo em favor do seu povo. O Cristo da cruz é o Cristo ressuscitado e exaltado que",
            "type": "PARAGRAPH"
          },
          {
            "text": "intercede.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não elimina nossa responsabilidade, nossas lutas ou a necessidade de arrependimento. Mas muda o",
            "type": "PARAGRAPH"
          },
          {
            "text": "lugar onde apoiamos nossa segurança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos construir nossa esperança sobre uma versão perfeita de nós mesmos. Podemos descansar",
            "type": "PARAGRAPH"
          },
          {
            "text": "naquele que permanece fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Nossa esperança não depende de nunca falharmos, mas daquele que morreu, ressuscitou e continua",
            "type": "PARAGRAPH"
          },
          {
            "text": "presente diante de Deus em favor do seu povo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-16-practice-today-13",
        "studyId": "track-03-study-16",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Leia Romanos 8:34 lentamente. Depois ore por três pessoas: por você, por alguém que está atravessando",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma luta e por alguém que se afastou ou caiu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em vez de tentar controlar o resultado, coloque cada nome diante de Deus e peça graça, restauração e",
            "type": "PARAGRAPH"
          },
          {
            "text": "perseverança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-16-reflection-questions-14",
        "studyId": "track-03-study-16",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Quando falho, minha primeira reação é correr para Deus ou esconder-me dele?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho baseado minha segurança em Cristo ou na qualidade da minha semana espiritual?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Qual acusação antiga ainda fala mais alto do que o Evangelho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por quem preciso começar a interceder com constância?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-16-journal-prompt-15",
        "studyId": "track-03-study-16",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que acusação ou culpa preciso responder hoje lembrando que Cristo morreu, ressuscitou e intercede",
            "type": "PARAGRAPH"
          },
          {
            "text": "por mim?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-16-prayer-16",
        "studyId": "track-03-study-16",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus, obrigado porque tua obra não terminou no túmulo. Tu estás vivo e não és indiferente à minha",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminhada. Quando eu falhar, leva-me ao arrependimento sem desespero. Quando eu for acusado,",
            "type": "PARAGRAPH"
          },
          {
            "text": "lembra-me do Evangelho. Ensina-me a descansar em tua graça sem brincar com o pecado e a",
            "type": "PARAGRAPH"
          },
          {
            "text": "interceder também por outras pessoas. Sustenta-me até o fim. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-16-keep-17",
        "studyId": "track-03-study-16",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Romanos 8:34 - Cristo morreu, ressuscitou e intercede.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 7:25 - observe a segurança ligada ao Cristo que vive para sempre.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-16-group-mode-18",
        "studyId": "track-03-study-16",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "O que Romanos 8 apresenta como fundamento da segurança cristã?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por que a intercessão de Jesus não significa que o Pai precisa ser convencido a nos amar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como podemos transformar este estudo numa prática de oração uns pelos outros?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-16-continue-journey-19",
        "studyId": "track-03-study-16",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 17 - Retorno: o Rei voltará. O que a Bíblia realmente afirma sobre a volta de Jesus - e como",
            "type": "PARAGRAPH"
          },
          {
            "text": "essa esperança deve formar nossa vida?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-16-references-20",
        "studyId": "track-03-study-16",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "Romanos 8:31-39 • Hebreus 7:23-28 • Hebreus 9:24 • Lucas 22:31-32 • 1 João 2:1-2 • Hebreus 4:14-16",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-17",
    "sections": [
      {
        "id": "track-03-study-17-golden-text-1",
        "studyId": "track-03-study-17",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“E assim estaremos sempre com o Senhor.” 1 T essalonicenses 4:17",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-17-practical-truth-2",
        "studyId": "track-03-study-17",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A esperança cristã não está em descobrir uma data secreta, mas em saber quem voltará e viver",
            "type": "PARAGRAPH"
          },
          {
            "text": "fielmente até esse dia.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-17-bible-reading-3",
        "studyId": "track-03-study-17",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: 1 Tessalonicenses 4:13-18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: João 14:1-3 • Atos 1:9-11 • Mateus 24:36-44 • Tito 2:11-14 • 1 Coríntios 15:51-58",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Apocalipse 22:20"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-17-before-understanding-4",
        "studyId": "track-03-study-17",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Poucos assuntos despertam tanta curiosidade quanto a volta de Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sinais, guerras, anticristo, tribulação, arrebatamento e datas costumam ocupar a conversa. Mas quando o",
            "type": "PARAGRAPH"
          },
          {
            "text": "Novo Testamento fala da volta de Cristo, seu objetivo principal não é alimentar ansiedade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em 1 Tessalonicenses 4, Paulo escreve para consolar cristãos preocupados com pessoas queridas que haviam",
            "type": "PARAGRAPH"
          },
          {
            "text": "morrido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A mensagem central é simples e poderosa: Jesus voltará, os mortos em Cristo não serão esquecidos e seu",
            "type": "PARAGRAPH"
          },
          {
            "text": "povo estará para sempre com o Senhor.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-17-read-5",
        "studyId": "track-03-study-17",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "1 Tessalonicenses 4:13-18",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-17-observe-6",
        "studyId": "track-03-study-17",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "Paulo começa falando sobre luto. Ele não diz que cristãos nunca choram. Diz que não precisam sofrer como",
            "type": "PARAGRAPH"
          },
          {
            "text": "quem não possui esperança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A razão da esperança está ligada à morte e ressurreição de Jesus. Porque Cristo ressuscitou, a morte dos que",
            "type": "PARAGRAPH"
          },
          {
            "text": "pertencem a Ele não é o fim da história.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O texto anuncia a vinda do Senhor, a ressurreição dos mortos em Cristo e o encontro dos crentes com Ele. O",
            "type": "PARAGRAPH"
          },
          {
            "text": "centro não é escapar da terra, mas estar para sempre com o Senhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo termina dizendo: “Consolai-vos uns aos outros com estas palavras.” A doutrina da volta de Cristo foi",
            "type": "PARAGRAPH"
          },
          {
            "text": "dada para produzir consolo, não pânico permanente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O centro da esperança é uma pessoa",
            "type": "SUBHEADING"
          },
          {
            "text": "A esperança cristã não é dominar um calendário profético. É saber que Jesus voltará e que estaremos",
            "type": "PARAGRAPH"
          },
          {
            "text": "com Ele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-17-understand-7",
        "studyId": "track-03-study-17",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Atos 1 apresenta a volta como futura e pessoal: o Jesus que foi elevado voltará. O Novo Testamento não",
            "type": "PARAGRAPH"
          },
          {
            "text": "reduz essa esperança a uma experiência interior ou símbolo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 24 também coloca um limite muito claro à curiosidade: ninguém sabe o dia e a hora. Toda tentativa",
            "type": "PARAGRAPH"
          },
          {
            "text": "de anunciar uma data precisa ser rejeitada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Tessalonicenses usa a linguagem de sermos “arrebatados” para encontrar o Senhor. O texto afirma esse",
            "type": "PARAGRAPH"
          },
          {
            "text": "encontro, mas cristãos interpretam de maneiras diferentes sua relação exata com a tribulação e a sequência",
            "type": "PARAGRAPH"
          },
          {
            "text": "de outros acontecimentos finais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos sustentar com firmeza aquilo que o texto deixa firme: Cristo voltará, os mortos em Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "ressuscitarão, seu povo será reunido a Ele e estará para sempre com o Senhor.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-17-connect-8",
        "studyId": "track-03-study-17",
        "type": "CONNECT",
        "title": "Certeza sem sensacionalismo",
        "blocks": [
          {
            "text": "Não precisamos resolver cada detalhe do calendário para possuir uma esperança firme.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-17-interpretation-caution-9",
        "studyId": "track-03-study-17",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Não transforme notícias em códigos proféticos. Guerras, crises, tecnologias e líderes podem ser importantes,",
            "type": "PARAGRAPH"
          },
          {
            "text": "mas não devemos declarar com certeza que cada manchete cumpre uma profecia específica sem base",
            "type": "PARAGRAPH"
          },
          {
            "text": "textual sólida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não use a esperança da volta de Cristo para abandonar estudo, trabalho, família, planejamento ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "cuidado com o mundo. Os primeiros cristãos foram chamados a esperar vivendo com fidelidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-17-deepen-10",
        "studyId": "track-03-study-17",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Cristãos fiéis possuem diferentes entendimentos sobre a ordem dos acontecimentos finais e o momento do",
            "type": "PARAGRAPH"
          },
          {
            "text": "arrebatamento em relação à tribulação. Este estudo não transforma uma dessas cronologias em teste de fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A verdade central compartilhada é a volta real de Cristo, a ressurreição e a reunião do seu povo com Ele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-17-apply-11",
        "studyId": "track-03-study-17",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Vigie sem viver assustado. Vigilância bíblica é vida fiel, não ansiedade diante de cada notícia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Console quem sofre. A volta de Cristo e a ressurreição permitem falar de esperança sem diminuir a realidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "do luto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Viva de forma coerente com o Rei que espera. Tito liga a bendita esperança a uma vida que aprende a dizer",
            "type": "PARAGRAPH"
          },
          {
            "text": "não ao pecado e sim ao bem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Continue construindo, servindo e planejando. Se Cristo vier hoje, queremos estar fiéis. Se vier depois de",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossa geração, também queremos deixar uma vida fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperar é viver acordado",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é adivinhar datas; é permanecer fiel ao Rei enquanto Ele não chegou.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-17-journey-takeaway-12",
        "studyId": "track-03-study-17",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus voltará. Essa é uma das grandes esperanças do Novo Testamento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não sabemos a data e não precisamos transformar especulação em certeza. Sabemos quem vem. Sabemos",
            "type": "PARAGRAPH"
          },
          {
            "text": "que a morte não terá a última palavra. Sabemos que os que pertencem a Cristo estarão com Ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A resposta bíblica é consolo, santidade, perseverança e missão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "A esperança cristã não está em descobrir uma data secreta, mas em saber quem voltará e viver",
            "type": "PARAGRAPH"
          },
          {
            "text": "fielmente até esse dia.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-17-practice-today-13",
        "studyId": "track-03-study-17",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Pense em uma decisão que você tomaria de maneira diferente se lembrasse todos os dias que sua história",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminha para um encontro com Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escolha uma atitude concreta de fidelidade hoje: reconciliar, abandonar um pecado, servir alguém, terminar",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma responsabilidade ou retomar uma oração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-17-reflection-questions-14",
        "studyId": "track-03-study-17",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "A volta de Cristo produz em mim esperança ou apenas curiosidade?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho dado mais atenção a teorias do que às certezas do texto?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha maneira de esperar me torna mais fiel no presente?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como essa esperança muda a maneira como enfrento o luto e a morte?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-17-journal-prompt-15",
        "studyId": "track-03-study-17",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Se eu realmente creio que Jesus voltará, o que precisa mudar na maneira como estou vivendo hoje?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-17-prayer-16",
        "studyId": "track-03-study-17",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, eu creio que voltarás. Livra-me da ansiedade de querer saber aquilo que não revelaste e",
            "type": "PARAGRAPH"
          },
          {
            "text": "do descuido de viver como se nunca fosses voltar. Consola-me diante da morte, fortalece minha",
            "type": "PARAGRAPH"
          },
          {
            "text": "esperança e ensina-me a viver desperto, fiel, santo e útil enquanto espero. Que minha oração seja",
            "type": "PARAGRAPH"
          },
          {
            "text": "também: vem, Senhor Jesus. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-17-keep-17",
        "studyId": "track-03-study-17",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "1 Tessalonicenses 4:16-18 - ressurreição, encontro e consolo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 1:11 - a promessa do retorno de Jesus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-17-group-mode-18",
        "studyId": "track-03-study-17",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "Qual era o problema pastoral que Paulo estava respondendo em 1 Tessalonicenses 4?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quais certezas sobre a volta de Cristo podemos afirmar sem entrar em cronologias disputadas?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que prática desta semana demonstra que estamos esperando Jesus com fidelidade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-17-continue-journey-19",
        "studyId": "track-03-study-17",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 18 - Reino: o governo de Cristo até que tudo seja restaurado. Como o Reino de Jesus está",
            "type": "PARAGRAPH"
          },
          {
            "text": "presente hoje e como será sua plenitude no futuro?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-17-references-20",
        "studyId": "track-03-study-17",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "1 Tessalonicenses 4:13-18 • João 14:1-3 • Atos 1:9-11 • Mateus 24:36-44 • Tito 2:11-14 • 1 Coríntios",
            "type": "PARAGRAPH"
          },
          {
            "text": "15:51-58 • Apocalipse 22:20",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-18",
    "sections": [
      {
        "id": "track-03-study-18-golden-text-1",
        "studyId": "track-03-study-18",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Porque convém que reine até que haja posto a todos os inimigos debaixo de seus pés.” 1 Coríntios",
            "type": "PARAGRAPH"
          },
          {
            "text": "15:25",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-18-practical-truth-2",
        "studyId": "track-03-study-18",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Vivemos entre o Reino que já chegou em Cristo e sua plenitude futura; por isso servimos,",
            "type": "PARAGRAPH"
          },
          {
            "text": "obedecemos e esperamos sem confundir nossa obra com a restauração final que Deus realizará.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-18-bible-reading-3",
        "studyId": "track-03-study-18",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: 1 Coríntios 15:20-28",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Marcos 1:14-15 • Mateus 6:9-10 • Lucas 17:20-21 • Colossenses 1:13-14 •",
            "type": "PARAGRAPH"
          },
          {
            "text": "Apocalipse 11:15 • Apocalipse 21:1-5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-18-before-understanding-4",
        "studyId": "track-03-study-18",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Jesus falou muito sobre o Reino de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele anunciou que o Reino havia se aproximado, ensinou seus discípulos a orar “venha o teu Reino” e",
            "type": "PARAGRAPH"
          },
          {
            "text": "demonstrou sua chegada por palavras e ações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ao mesmo tempo, olhamos para o mundo e vemos injustiça, doença, pecado e morte. Então surge uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "pergunta: se Jesus reina, por que ainda existe tanta coisa quebrada?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento nos ensina a viver entre duas realidades: o Reino já chegou em Cristo, mas sua plenitude",
            "type": "PARAGRAPH"
          },
          {
            "text": "ainda está diante de nós.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-18-read-5",
        "studyId": "track-03-study-18",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "1 Coríntios 15:20-28",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-18-observe-6",
        "studyId": "track-03-study-18",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "1 Coríntios 15 começa este trecho com a ressurreição de Cristo. Jesus é chamado de primícias, sinal de uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "colheita que ainda virá.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo afirma que Cristo reina. Seu governo não é apenas uma promessa futura; o Ressuscitado já foi",
            "type": "PARAGRAPH"
          },
          {
            "text": "exaltado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mesmo assim, ainda existem inimigos a serem vencidos. O texto nomeia o último: a morte. Isso explica por",
            "type": "PARAGRAPH"
          },
          {
            "text": "que o Reino já é real sem significar que toda consequência do pecado já desapareceu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O movimento da passagem aponta para um futuro em que os inimigos serão definitivamente vencidos e",
            "type": "PARAGRAPH"
          },
          {
            "text": "todas as coisas estarão plenamente submetidas ao governo de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Já começou, ainda não terminou",
            "type": "SUBHEADING"
          },
          {
            "text": "Cristo já reina; a morte ainda existe. A esperança cristã mantém as duas verdades juntas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-18-understand-7",
        "studyId": "track-03-study-18",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Nos Evangelhos, o Reino chega na presença e na obra de Jesus. Pessoas são chamadas ao arrependimento,",
            "type": "PARAGRAPH"
          },
          {
            "text": "enfermos são curados, demônios são confrontados, pecadores recebem graça e os pobres ouvem boas",
            "type": "PARAGRAPH"
          },
          {
            "text": "notícias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses fala de pessoas transferidas do domínio das trevas para o Reino do Filho. Portanto, o Reino",
            "type": "PARAGRAPH"
          },
          {
            "text": "também muda nossa lealdade agora.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ao ensinar “venha o teu Reino”, Jesus mostra que ainda aguardamos algo. Oramos para que a vontade de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus seja feita plenamente porque isso ainda não acontece em toda parte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A nova criação de Apocalipse mostra a plenitude: morte, luto e dor terminam. O Reino não culmina em uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "fuga eterna da criação, mas na vitória de Deus e na restauração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-18-connect-8",
        "studyId": "track-03-study-18",
        "type": "CONNECT",
        "title": "O Reino possui presente e futuro",
        "blocks": [
          {
            "text": "Recebemos o governo de Cristo agora e esperamos o dia em que nenhuma força se levantará contra",
            "type": "PARAGRAPH"
          },
          {
            "text": "ele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-18-interpretation-caution-9",
        "studyId": "track-03-study-18",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Não confunda o Reino de Deus com um partido, governo ou nação humana. Cristãos podem participar da",
            "type": "PARAGRAPH"
          },
          {
            "text": "vida pública, mas nenhum projeto político atual pode ser simplesmente identificado com o Reino de Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não pense que nossa ação construirá por esforço humano a nova criação. Somos chamados a",
            "type": "PARAGRAPH"
          },
          {
            "text": "praticar justiça, misericórdia e missão agora, mas a restauração final é obra de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-18-deepen-10",
        "studyId": "track-03-study-18",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Em Lucas 17:20-21, a expressão traduzida em algumas Bíblias como “o Reino de Deus está dentro de vós”",
            "type": "PARAGRAPH"
          },
          {
            "text": "também pode ser entendida como “está entre vós” ou “no meio de vós”. No contexto, Jesus está falando com",
            "type": "PARAGRAPH"
          },
          {
            "text": "fariseus e sua própria presença no meio deles é significativa. Não precisamos construir a ideia de que o",
            "type": "PARAGRAPH"
          },
          {
            "text": "Reino seja apenas uma experiência interior.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-18-apply-11",
        "studyId": "track-03-study-18",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Viva hoje sob o governo de Cristo. O Reino começa a aparecer quando nossas decisões se submetem ao Rei.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore “venha o teu Reino” com disponibilidade. É incoerente pedir que a vontade de Deus seja feita e recusar",
            "type": "PARAGRAPH"
          },
          {
            "text": "obedecê-la quando ela nos alcança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trabalhe pelo bem sem imaginar que você é o salvador. Justiça, cuidado, evangelização e serviço importam,",
            "type": "PARAGRAPH"
          },
          {
            "text": "mas não carregamos o peso de produzir o fim perfeito da história.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Enfrente a morte com esperança. Ela continua inimiga, mas não continuará para sempre. O último inimigo",
            "type": "PARAGRAPH"
          },
          {
            "text": "também cairá.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Servimos sem desespero",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Reino não depende de nossa capacidade de terminar a história. O Rei terminará o que começou.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-18-journey-takeaway-12",
        "studyId": "track-03-study-18",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus reina. Seu Reino já se tornou presente em sua pessoa, sua obra e no povo que vive sob sua autoridade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a Bíblia também nos ensina a olhar adiante. Ainda esperamos a derrota final de todo inimigo,",
            "type": "PARAGRAPH"
          },
          {
            "text": "especialmente da morte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso não vivemos nem em triunfalismo, como se tudo já estivesse perfeito, nem em desespero, como se",
            "type": "PARAGRAPH"
          },
          {
            "text": "nada tivesse começado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Vivemos entre o Reino que já chegou em Cristo e sua plenitude futura; por isso servimos,",
            "type": "PARAGRAPH"
          },
          {
            "text": "obedecemos e esperamos sem confundir nossa obra com a restauração final que Deus realizará.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-18-practice-today-13",
        "studyId": "track-03-study-18",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Ore hoje o Pai Nosso lentamente, parando na frase “venha o teu Reino; seja feita a tua vontade”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois escolha uma área concreta em que você já sabe qual é a vontade de Cristo e dê um passo de",
            "type": "PARAGRAPH"
          },
          {
            "text": "obediência.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-18-reflection-questions-14",
        "studyId": "track-03-study-18",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Tenho tratado o Reino de Deus apenas como algo futuro?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ou tenho agido como se pudéssemos construir sua plenitude por nossas próprias forças?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que área da minha vida ainda resiste ao governo de Cristo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como a derrota futura da morte muda minha esperança?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-18-journal-prompt-15",
        "studyId": "track-03-study-18",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Em que área preciso parar de apenas pedir “venha o teu Reino” e começar a obedecer ao Rei?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-18-prayer-16",
        "studyId": "track-03-study-18",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Rei Jesus, reconheço teu governo. Ensina-me a viver sob tua autoridade hoje sem fingir que o mundo",
            "type": "PARAGRAPH"
          },
          {
            "text": "já está plenamente restaurado. Usa minha vida para servir, anunciar o Evangelho e fazer o bem, mas",
            "type": "PARAGRAPH"
          },
          {
            "text": "livra-me da arrogância de pensar que tudo depende de mim. Sustenta minha esperança até o dia em",
            "type": "PARAGRAPH"
          },
          {
            "text": "que todo inimigo, inclusive a morte, for vencido. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-18-keep-17",
        "studyId": "track-03-study-18",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "1 Coríntios 15:25-26 - Cristo reina e a morte será destruída.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 6:10 - ore pela chegada plena do Reino e pela vontade de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-18-group-mode-18",
        "studyId": "track-03-study-18",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "Que sinais mostram que o Reino já chegou em Cristo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que evidências mostram que ainda esperamos sua plenitude?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como nosso grupo pode viver sob o governo de Jesus de maneira concreta nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-18-continue-journey-19",
        "studyId": "track-03-study-18",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 19 - Juízo e restauração: o Rei colocará todas as coisas em ordem. Como Jesus exercerá juízo",
            "type": "PARAGRAPH"
          },
          {
            "text": "e conduzirá a história para a restauração final?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-18-references-20",
        "studyId": "track-03-study-18",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "1 Coríntios 15:20-28 • Marcos 1:14-15 • Mateus 6:9-10 • Lucas 17:20-21 • Colossenses 1:13-14 •",
            "type": "PARAGRAPH"
          },
          {
            "text": "Apocalipse 11:15 • Apocalipse 21:1-5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
      }
    ]
  },
  {
    "studyId": "track-03-study-19",
    "sections": [
      {
        "id": "track-03-study-19-golden-text-1",
        "studyId": "track-03-study-19",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“E deu-lhe o poder de exercer o juízo, porque é o Filho do Homem.” João 5:27",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": false
      },
      {
        "id": "track-03-study-19-practical-truth-2",
        "studyId": "track-03-study-19",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "O mesmo Jesus que oferece vida também julgará com justiça; por isso o mal importa, nossas escolhas",
            "type": "PARAGRAPH"
          },
          {
            "text": "importam e a esperança cristã aponta para uma criação finalmente livre da morte e da corrupção.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-03-study-19-bible-reading-3",
        "studyId": "track-03-study-19",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: João 5:22-29",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Mateus 25:31-46 • Atos 17:30-31 • 2 Coríntios 5:10 • Apocalipse 20:11-15 •",
            "type": "PARAGRAPH"
          },
          {
            "text": "Apocalipse 21:1-5 • Apocalipse 22:1-5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-03-study-19-before-understanding-4",
        "studyId": "track-03-study-19",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Encerrar uma trilha sobre Jesus falando de juízo pode parecer estranho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Talvez preferíssemos terminar apenas com palavras de conforto. Mas o próprio Jesus falou sobre",
            "type": "PARAGRAPH"
          },
          {
            "text": "responsabilidade, ressurreição e juízo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não diminui seu amor. Pelo contrário: se Deus realmente ama aquilo que é bom, o mal não pode",
            "type": "PARAGRAPH"
          },
          {
            "text": "governar para sempre.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A boa notícia do final da Bíblia não é apenas que indivíduos escapam do julgamento. É que Cristo vencerá o",
            "type": "PARAGRAPH"
          },
          {
            "text": "mal e Deus fará novas todas as coisas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-03-study-19-read-5",
        "studyId": "track-03-study-19",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "João 5:22-29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-03-study-19-observe-6",
        "studyId": "track-03-study-19",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "João 5 liga diretamente Jesus ao juízo. O Pai confiou ao Filho a autoridade de julgar. Isso faz parte da",
            "type": "PARAGRAPH"
          },
          {
            "text": "maneira elevada como o Evangelho apresenta Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O texto também fala de ressurreição. A história humana não termina simplesmente no túmulo; há prestação",
            "type": "PARAGRAPH"
          },
          {
            "text": "de contas diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus é apresentado no mesmo capítulo como aquele que dá vida. Salvador e Juiz não são dois Cristos",
            "type": "PARAGRAPH"
          },
          {
            "text": "diferentes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 17 anuncia que Deus estabeleceu um dia para julgar o mundo com justiça por meio daquele que",
            "type": "PARAGRAPH"
          },
          {
            "text": "ressuscitou. Ressurreição, senhorio e juízo aparecem ligados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O mal não terá a última palavra",
            "type": "SUBHEADING"
          },
          {
            "text": "O juízo afirma que verdade, justiça e sofrimento humano importam diante de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-03-study-19-understand-7",
        "studyId": "track-03-study-19",
        "type": "UNDERSTAND",
        "title": "Compreenda",
        "blocks": [
          {
            "text": "Juízo não significa que Deus descobre fatos como um investigador humano. Ele conhece a verdade. Não",
            "type": "PARAGRAPH"
          },
          {
            "text": "existe testemunha falsa capaz de enganá-lo nem poder econômico capaz de comprá-lo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento fala de obras quando trata do juízo. Isso não significa que boas obras compram salvação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Elas revelam a realidade da vida, das escolhas e daquilo a que pertencemos. A salvação continua sendo graça",
            "type": "PARAGRAPH"
          },
          {
            "text": "em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O juízo também é consolo para vítimas. Uma injustiça que nunca foi reconhecida por tribunais humanos não",
            "type": "PARAGRAPH"
          },
          {
            "text": "ficou invisível para Deus. Isso não autoriza vingança pessoal, mas nos lembra que o tribunal final não está em",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossas mãos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Apocalipse não termina no capítulo 20. Depois do juízo vêm novos céus e nova terra, Deus habitando com",
            "type": "PARAGRAPH"
          },
          {
            "text": "seu povo, morte vencida, lágrimas enxugadas e maldição removida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-03-study-19-connect-8",
        "studyId": "track-03-study-19",
        "type": "CONNECT",
        "title": "Juízo conduz à restauração",
        "blocks": [
          {
            "text": "A história não termina apenas com o mal sendo julgado, mas com Deus fazendo novas todas as coisas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-03-study-19-interpretation-caution-9",
        "studyId": "track-03-study-19",
        "type": "INTERPRETATION_CAUTION",
        "title": "Cuidado para não confundir",
        "blocks": [
          {
            "text": "Nunca use o tema do juízo para sentir prazer na condenação de pessoas. O Evangelho chama ao",
            "type": "PARAGRAPH"
          },
          {
            "text": "arrependimento e à missão, não à arrogância. Quem foi salvo pela graça não possui motivo para celebrar a",
            "type": "PARAGRAPH"
          },
          {
            "text": "própria superioridade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não use o perdão cristão para impedir justiça humana apropriada. Crimes podem e devem ser",
            "type": "PARAGRAPH"
          },
          {
            "text": "denunciados, vítimas protegidas e autoridades responsáveis acionadas quando necessário.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": true
      },
      {
        "id": "track-03-study-19-deepen-10",
        "studyId": "track-03-study-19",
        "type": "DEEPEN",
        "title": "+ Aprofunde",
        "blocks": [
          {
            "text": "Cristãos possuem diferentes entendimentos sobre a natureza exata da punição final. Alguns defendem",
            "type": "PARAGRAPH"
          },
          {
            "text": "punição consciente contínua; outros entendem os textos em termos de destruição final ou imortalidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "condicionada. Este estudo não resolve essa discussão. O que os textos permitem afirmar com segurança é",
            "type": "PARAGRAPH"
          },
          {
            "text": "que o juízo é real, a condenação é séria e o mal não terá participação eterna na nova criação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": true
      },
      {
        "id": "track-03-study-19-apply-11",
        "studyId": "track-03-study-19",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "Viva lembrando que suas escolhas importam. Graça não transforma a vida em algo moralmente indiferente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando sofrer injustiça, não carregue sozinho o tribunal final. Busque justiça apropriada, estabeleça limites e",
            "type": "PARAGRAPH"
          },
          {
            "text": "entregue a Deus aquilo que nenhum tribunal humano consegue resolver completamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Anuncie o Evangelho com urgência e humildade. Se juízo e graça são reais, missão não é passatempo",
            "type": "PARAGRAPH"
          },
          {
            "text": "religioso. Pessoas precisam conhecer Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Olhe além do juízo para a restauração. A esperança cristã não é viver eternamente pensando no mal; é viver",
            "type": "PARAGRAPH"
          },
          {
            "text": "na presença de Deus numa criação onde o mal finalmente terminou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus coloca a história em ordem",
            "type": "PARAGRAPH"
          },
          {
            "text": "O fim não pertence à morte, à injustiça ou ao pecado. Pertence ao Rei.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-03-study-19-journey-takeaway-12",
        "studyId": "track-03-study-19",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus é o Verbo, Filho de Deus, Filho do Homem, Messias, Cordeiro, Rei, Senhor e Sumo Sacerdote.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele se encarnou, ministrou, realizou sinais, ensinou, foi à cruz, ressuscitou, ascendeu e intercede. Ele voltará,",
            "type": "PARAGRAPH"
          },
          {
            "text": "seu Reino será plenamente manifestado e julgará com justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A história que começou com a criação não termina num mundo abandonado. Termina com Deus habitando",
            "type": "PARAGRAPH"
          },
          {
            "text": "com seu povo e com a criação restaurada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso a pergunta que atravessou esta trilha continua pessoal: “E vocês, quem dizem que eu sou?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "SUBHEADING"
          },
          {
            "text": "O mesmo Jesus que oferece vida também julgará com justiça; por isso o mal importa, nossas escolhas",
            "type": "PARAGRAPH"
          },
          {
            "text": "importam e a esperança cristã aponta para uma criação finalmente livre da morte e da corrupção.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-03-study-19-practice-today-13",
        "studyId": "track-03-study-19",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Releia os títulos dos 19 estudos desta trilha.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escolha três títulos de Jesus que mais ampliaram sua compreensão e escreva uma frase para cada um:",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Porque Jesus é..., eu quero...”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois transforme essas três respostas em oração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-03-study-19-reflection-questions-14",
        "studyId": "track-03-study-19",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "Depois desta trilha, quem é Jesus para mim?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Qual aspecto de sua identidade eu conhecia menos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Qual parte de sua obra mais transformou minha compreensão do Evangelho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Minha vida responde a Jesus apenas com admiração ou também com fé e obediência?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que próximo passo de discipulado preciso dar?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-03-study-19-journal-prompt-15",
        "studyId": "track-03-study-19",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Depois de percorrer esta trilha, quem é Jesus para mim - e que resposta minha vida precisa dar a Ele?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-03-study-19-prayer-16",
        "studyId": "track-03-study-19",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, ao longo desta Jornada eu te vi como Verbo, Filho de Deus, Filho do Homem, Messias,",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cordeiro, Rei, Senhor e Sumo Sacerdote. Obrigado porque te encarnaste, serviste, ensinaste, te",
            "type": "PARAGRAPH"
          },
          {
            "text": "entregaste na cruz, ressuscitaste, foste exaltado e continuas agindo por teu povo. Eu espero tua volta,",
            "type": "PARAGRAPH"
          },
          {
            "text": "teu Reino e a restauração que prometeste. Livra-me de apenas saber coisas sobre ti. Dá-me fé para te",
            "type": "PARAGRAPH"
          },
          {
            "text": "conhecer, coragem para te seguir e uma vida que responda à pergunta: “Quem dizes que eu sou?”. Tu",
            "type": "PARAGRAPH"
          },
          {
            "text": "és meu Senhor e minha esperança. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-03-study-19-keep-17",
        "studyId": "track-03-study-19",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "João 20:31 - o propósito do Evangelho: crer em quem Jesus é e ter vida em seu nome.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 2:9-11 - a exaltação de Jesus e a confissão de seu senhorio.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-03-study-19-group-mode-18",
        "studyId": "track-03-study-19",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "Qual dos títulos de Jesus mais mudou nossa compreensão durante a trilha?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como identidade e obra de Jesus se conectam?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que resposta prática nosso grupo precisa dar a Cristo depois destes estudos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          },
          {
            "text": "•",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": false
      },
      {
        "id": "track-03-study-19-continue-journey-19",
        "studyId": "track-03-study-19",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "VOCÊ CONCLUIU A TRILHA 3 - CONHECENDO JESUS CRISTO | 19/19.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próxima Jornada: Trilha 4 - Nova Vida em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta que abrirá a nova trilha: Como vive aquele que recebeu o Evangelho?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 19,
        "optional": false
      },
      {
        "id": "track-03-study-19-references-20",
        "studyId": "track-03-study-19",
        "type": "REFERENCES",
        "title": "Referências Bíblicas",
        "blocks": [
          {
            "text": "João 5:22-29 • Mateus 25:31-46 • Atos 17:30-31 • 2 Coríntios 5:10 • Apocalipse 20:11-15 • Apocalipse",
            "type": "PARAGRAPH"
          },
          {
            "text": "21:1-5 • Apocalipse 22:1-5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 20,
        "optional": false
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
    heroImage: `track-03-study-${String(raw.number).padStart(2, "0")}-hero`,
    nextStudyId:
      raw.nextStudyId === null ? null : (raw.nextStudyId as StudyId),
    audienceLevel: null,
    tags: [],
    published: false,
  };
}

function toSection(
  raw: (typeof rawSectionsByStudy)[number]["sections"][number],
): StudySection {
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

export const track03DraftBatchPackage: StudyContentPackage = {
  contentVersion: "draft-track-03-studies-01-19-v1",
  tracks: [track],
  studies,
  sections,
  references: [],
};
