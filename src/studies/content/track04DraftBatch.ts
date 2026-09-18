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

export const TRACK_04_DRAFT_BATCH_PROFILE = "JOURNEY_20_30_V1" as const;
export const TRACK_04_DRAFT_BATCH_EDITORIAL_STATUS = "DRAFT" as const;
export const TRACK_04_DRAFT_BATCH_PUBLISHED = false as const;
export const TRACK_04_DRAFT_BATCH_RUNTIME_ELIGIBLE = false as const;

const TRACK_04_ID = "track-04" as StudyTrackId;

const track: StudyTrack = {
  id: TRACK_04_ID,
  slug: "nova-vida-em-cristo" as StudyTrackSlug,
  title: "Nova Vida em Cristo",
  description: "Nova Vida em Cristo",
  type: "FORMATION",
  contentProfile: TRACK_04_DRAFT_BATCH_PROFILE,
  cardImage: "track-04-card",
  heroImage: "track-04-hero",
  order: 4,
  published: true,
};

export const track04DraftBatchEditorialSources = [
  {
    "studyNumber": 1,
    "studyId": "track-04-study-01",
    "candidateSha256": "085A46CAA88C99C36D1772AD0D9B3E8879835DE115DB68E904F89FF742BA7255",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_01_O_Novo_Nascimento.pdf",
    "sourceBytes": 952197,
    "sourceSha256": "A96400F1DC4E8E224F498CEFC8C7229FDCD6F968A8F270BD22B5B88549D887EA",
    "sourcePageCount": 8,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "JOAO 3:7",
      "JOAO 3:1-8",
      "EZEQUIEL 36:25-27",
      "TITO 3:3-7",
      "2 CORINTIOS 5:17",
      "1 PEDRO 1:22-23",
      "EFESIOS 2:4-10",
      "JOAO 3:5",
      "TITO 3:5"
    ]
  },
  {
    "studyNumber": 2,
    "studyId": "track-04-study-02",
    "candidateSha256": "3D0F52134D5FF376538194258870BC2F0196266F0795BA3A39C0CB2100728006",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_02_Justificacao_Pela_Fe.pdf",
    "sourceBytes": 950293,
    "sourceSha256": "C901C0F16962C493C96932E1E6AB62327BF421CBED0F6CE0FBB75F2E8E1E11BF",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "ROMANOS 5:1",
      "ROMANOS 3:21-28",
      "ROMANOS 4:1-5",
      "ROMANOS 5:1-11",
      "GALATAS 2:15-21",
      "FILIPENSES 3:7-9",
      "TIAGO 2:14-26",
      "FILIPENSES 3:9"
    ]
  },
  {
    "studyNumber": 3,
    "studyId": "track-04-study-03",
    "candidateSha256": "21670F2ECE8D3551D40FD00D4862BBF0EBEE0B9C1F82418B22FFBFE598CDDE83",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_03_Santificacao.pdf",
    "sourceBytes": 950629,
    "sourceSha256": "5E326DA558C816D8F5B1215F79CFFEBB4D217EE7F914C2ED564A7E847BA2210F",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "1 TESSALONICENSES 4:3",
      "1 TESSALONICENSES 4:1-8",
      "ROMANOS 6:1-14",
      "FILIPENSES 2:12-13",
      "HEBREUS 12:14",
      "1 PEDRO 1:13-16",
      "GALATAS 5:16-25",
      "FILIPENSES 2:13"
    ]
  },
  {
    "studyNumber": 4,
    "studyId": "track-04-study-04",
    "candidateSha256": "7F531CCECCF8F212A87A1C61DF628F059CB09473B9D7A00EA4C75E4FB4EC8337",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_04_Identidade_Em_Cristo.pdf",
    "sourceBytes": 950186,
    "sourceSha256": "6BD1092FFD200F6AE01F5FD3860A49A5D933045131E74C848D5A8A410EFF8ED8",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "2 CORINTIOS 5:17",
      "ROMANOS 8:1-17",
      "2 CORINTIOS 5:17-21",
      "EFESIOS 1:3-14",
      "COLOSSENSES 3:1-4",
      "1 PEDRO 2:9-10",
      "GALATAS 3:26-29",
      "ROMANOS 8:1"
    ]
  },
  {
    "studyNumber": 5,
    "studyId": "track-04-study-05",
    "candidateSha256": "8FE155542E5B4389065625427BEDBFF1B71C9B1B062FE141590FF6B8224BBB93",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_05_Como_Vencer_A_Tentacao.pdf",
    "sourceBytes": 950766,
    "sourceSha256": "BA6B3BB8EAB1471D28ECE1A32FCFF7B723443123E2777B8918779012CD640475",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MATEUS 26:41",
      "MATEUS 4:1-11",
      "TIAGO 1:12-16",
      "1 CORINTIOS 10:12-13",
      "HEBREUS 4:14-16",
      "2 TIMOTEO 2:22",
      "SALMO 119:9-11",
      "1 CORINTIOS 10:13",
      "HEBREUS 4:15-16"
    ]
  },
  {
    "studyNumber": 6,
    "studyId": "track-04-study-06",
    "candidateSha256": "B361D0BCFBC5A40647449435D5F5A48B882F916A702287EC4FE4F4106C5F8007",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_06_O_Fruto_Do_Espirito.pdf",
    "sourceBytes": 950224,
    "sourceSha256": "E9E086612B5F9465CE21180F9E01C652275D87F5162B500B6CFEC9E987483A6D",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "GALATAS 5:22-23",
      "GALATAS 5:16-26",
      "JOAO 15:1-8",
      "COLOSSENSES 3:12-15",
      "EFESIOS 5:8-10",
      "ROMANOS 8:5-14",
      "1 CORINTIOS 13:1-7",
      "JOAO 15:5"
    ]
  },
  {
    "studyNumber": 7,
    "studyId": "track-04-study-07",
    "candidateSha256": "7966C919E4367384B5A41074058908585744454A875B88491F29BDD00CCD9FAC",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_07_Perdão.pdf",
    "sourceBytes": 949964,
    "sourceSha256": "A7170A83714B98546239E9AA6E3D8C9F06472CB0A877741F6F07EDEB43C81957",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "EFESIOS 4:32",
      "MATEUS 18:21-35",
      "EFESIOS 4:31-32",
      "COLOSSENSES 3:12-13",
      "ROMANOS 12:17-21",
      "LUCAS 17:3-4",
      "SALMO 55:12-23",
      "ROMANOS 12:19-21"
    ]
  },
  {
    "studyNumber": 8,
    "studyId": "track-04-study-08",
    "candidateSha256": "00CBBBB02066291C41FD4BF1942A26F7E9D676A16CD62FEC99FFA63AA30FC368",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_08_Oracao.pdf",
    "sourceBytes": 949677,
    "sourceSha256": "84EC008E837EC5BD76D5F86232946A646961EBF3D68D74CBA1D55768AE093622",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MATEUS 6:8",
      "MATEUS 6:5-13",
      "SALMO 62:8",
      "LUCAS 11:1-13",
      "FILIPENSES 4:6-7",
      "ROMANOS 8:26-27",
      "1 JOAO 5:14-15",
      "HEBREUS 4:14-16",
      "MATEUS 6:9-13"
    ]
  },
  {
    "studyNumber": 9,
    "studyId": "track-04-study-09",
    "candidateSha256": "396F1B51E4316D177AFE86BAFF46D015DFB656C39C4C10A150ECA0CF0F6855F3",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_09_Leitura_E_Meditacao_Na_Palavra.pdf",
    "sourceBytes": 949185,
    "sourceSha256": "154400D53656C8E1C984784F486A62AE0B7C0FFCC8A0B467E698D68D8CA38A94",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "SALMO 119:105",
      "SALMO 1:1-6",
      "JOSUE 1:7-9",
      "SALMO 119:9-16",
      "2 TIMOTEO 3:14-17",
      "ATOS 17:10-12",
      "LUCAS 24:25-32",
      "2 TIMOTEO 3:16-17"
    ]
  },
  {
    "studyNumber": 10,
    "studyId": "track-04-study-10",
    "candidateSha256": "9AB1A447E0B125C402B53E095D3F545F10C7562AFC16354D267A7D1EBDB2EE95",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_10_Ansiedade_E_Confianca.pdf",
    "sourceBytes": 949227,
    "sourceSha256": "72CD3F8B5C80E305A0E7B42D67B6726238B398EFBD5F66FC72DC2066203E2392",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MATEUS 6:34",
      "MATEUS 6:25-34",
      "FILIPENSES 4:4-9",
      "1 PEDRO 5:6-7",
      "SALMO 42:5-11",
      "SALMO 55:22",
      "LUCAS 12:22-32",
      "1 PEDRO 5:7"
    ]
  },
  {
    "studyNumber": 11,
    "studyId": "track-04-study-11",
    "candidateSha256": "BF80942A0B6A4BCA89C80B1AE0A181062ED9AF2ED74A2B4A32D0115AE509DAEF",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_11_Sofrimento.pdf",
    "sourceBytes": 949402,
    "sourceSha256": "CF420FCEFA6586E1DB3F259318B455917F369786EDBE68C1487BA969566ACBB9",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "SALMO 34:18",
      "SALMO 13:1-6",
      "JOAO 11:17-36",
      "ROMANOS 8:18-39",
      "2 CORINTIOS 4:7-18",
      "1 PEDRO 5:8-10",
      "APOCALIPSE 21:1-5",
      "ROMANOS 8:28",
      "ROMANOS 8:38-39"
    ]
  },
  {
    "studyNumber": 12,
    "studyId": "track-04-study-12",
    "candidateSha256": "F38D9647C66399A028793E0AB06424FEE38A2BD505F10458D73FC4CC2F886217",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_12_Contentamento.pdf",
    "sourceBytes": 947957,
    "sourceSha256": "9DA4B742C5535E44C5110AA8112A1AD269922901EF1E051648A472665641B183",
    "sourcePageCount": 6,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "FILIPENSES 4:11",
      "FILIPENSES 4:10-20",
      "1 TIMOTEO 6:6-10",
      "HEBREUS 13:5-6",
      "SALMO 23:1-6",
      "MATEUS 6:19-24",
      "LUCAS 12:13-21",
      "FILIPENSES 4:13",
      "FILIPENSES 4:11-13",
      "HEBREUS 13:5"
    ]
  },
  {
    "studyNumber": 13,
    "studyId": "track-04-study-13",
    "candidateSha256": "30CBBA0007998A72CE09A7777DFAAB72B9F93B3C32B77FA1EB45563E2CB70128",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_13_Sabedoria_Nas_Decisoes.pdf",
    "sourceBytes": 950343,
    "sourceSha256": "FAB5E79A4C90A35159AE27557584281BE2837EDC03FE6478B5E8CC343D2ACDD0",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "TIAGO 1:5",
      "TIAGO 1:5-8",
      "PROVERBIOS 3:5-7",
      "PROVERBIOS 11:14",
      "ROMANOS 12:1-2",
      "COLOSSENSES 3:15-17",
      "TIAGO 4:13-17",
      "ATOS 15:1-29"
    ]
  },
  {
    "studyNumber": 14,
    "studyId": "track-04-study-14",
    "candidateSha256": "299B35E1863D40B5A281FF3ADF74281D0AFF95529BE7532B7E872B23F55A1413",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_14_Relacionamentos.pdf",
    "sourceBytes": 948995,
    "sourceSha256": "AE0393A60225DD725D6DB3CD18FD77EBC9D3073F52D7C2B3B2363D0430CC2D0D",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "ROMANOS 12:18",
      "ROMANOS 12:9-21",
      "EFESIOS 4:25-32",
      "COLOSSENSES 3:12-15",
      "PROVERBIOS 13:20",
      "1 CORINTIOS 13:4-7",
      "MATEUS 18:15-17",
      "EFESIOS 4:25"
    ]
  },
  {
    "studyNumber": 15,
    "studyId": "track-04-study-15",
    "candidateSha256": "4C2C5F46AEC7F09EAE18BC5A4BC66E15FE6247DF3A96E5E697770904D68EE223",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_15_O_Uso_Das_Palavras.pdf",
    "sourceBytes": 949102,
    "sourceSha256": "E25ABAB9A1625F5D79D28AA6D44D8B390DC695C11E819A5FEFF92099ED6ADC70",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "EFESIOS 4:29",
      "TIAGO 3:1-12",
      "EFESIOS 4:25-32",
      "PROVERBIOS 18:21",
      "PROVERBIOS 15:1",
      "MATEUS 12:33-37",
      "COLOSSENSES 4:5-6"
    ]
  },
  {
    "studyNumber": 16,
    "studyId": "track-04-study-16",
    "candidateSha256": "4B11EA7E404B38BD5C2FFFB6E5C6EE2E33D46F41FD5E6E1704A74911C82F18AE",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_16_Servico.pdf",
    "sourceBytes": 948596,
    "sourceSha256": "F08D54C5094FA858343553F236D61873DB440A49459311F2111784DCD018B781",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "MARCOS 10:45",
      "MARCOS 10:35-45",
      "JOAO 13:1-17",
      "1 PEDRO 4:10-11",
      "ROMANOS 12:3-8",
      "FILIPENSES 2:3-8",
      "GALATAS 5:13",
      "1 PEDRO 4:10"
    ]
  },
  {
    "studyNumber": 17,
    "studyId": "track-04-study-17",
    "candidateSha256": "AAA46DA0EFBF948AC24E0B410BAD2369D76858BC621AC001F137425164D6C8B2",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_17_Generosidade.pdf",
    "sourceBytes": 949098,
    "sourceSha256": "5B9F891742DFB4B5D6A1E6833B5C3D836F267F5C3511BB1B1B9CE07C8403F93D",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "2 CORINTIOS 9:7",
      "2 CORINTIOS 9:6-15",
      "2 CORINTIOS 8:1-15",
      "ATOS 20:32-35",
      "1 TIMOTEO 6:17-19",
      "LUCAS 12:13-21",
      "MARCOS 12:41-44"
    ]
  },
  {
    "studyNumber": 18,
    "studyId": "track-04-study-18",
    "candidateSha256": "82906E0F78B441297AD6B162F9F6CD9949433BC88B4BB41427524778B2B62631",
    "sourceRelativePath": "trilha_4\\Biblia_Jornada_Trilha_4_Estudo_18_Perseveranca.pdf",
    "sourceBytes": 949492,
    "sourceSha256": "68F8F29307D119D2537BBDB1EDDE2ACBA38346C5922BC640333943AC8160F337",
    "sourcePageCount": 7,
    "editorialStatus": "DRAFT",
    "published": false,
    "runtimeEligible": false,
    "technicalProfile": "JOURNEY_20_30_V1",
    "bibleReferences": [
      "HEBREUS 12:1-2",
      "HEBREUS 12:1-3",
      "HEBREUS 10:23-25",
      "TIAGO 1:2-4",
      "ROMANOS 5:1-5",
      "FILIPENSES 3:12-14",
      "2 TIMOTEO 4:6-8",
      "HEBREUS 10:23"
    ]
  }
] as const;

const rawStudies = [
  {
    "id": "track-04-study-01",
    "trackId": "track-04",
    "number": 1,
    "slug": "o-novo-nascimento-quando-deus-comeca-uma-vida-nova-em-nos",
    "title": "O novo nascimento: quando Deus começa uma vida nova em nós",
    "summary": "O novo nascimento: quando Deus começa uma vida nova em nós",
    "questionCentral": "O que Jesus quis dizer quando afirmou que precisamos nascer de novo?",
    "objective": "Compreender que a vida cristã não começa apenas com mudança de hábitos, tradição religiosa ou esforço moral. Jesus fala de uma obra de Deus que nos dá uma nova vida e nos chama a caminhar guiados pelo Espírito.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-02",
    "published": false
  },
  {
    "id": "track-04-study-02",
    "trackId": "track-04",
    "number": 2,
    "slug": "justificacao-pela-fe-aceitos-por-causa-de-cristo",
    "title": "Justificação pela fé: aceitos por causa de Cristo",
    "summary": "Justificação pela fé: aceitos por causa de Cristo",
    "questionCentral": "O que significa ser justificado pela fé e por que isso nos liberta tanto do orgulho quanto da culpa?",
    "objective": "Compreender que nossa aceitação diante de Deus não é comprada por desempenho religioso. Deus recebe o pecador que confia em Cristo, e essa graça produz paz, humildade e uma vida que passa a dar frutos.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-03",
    "published": false
  },
  {
    "id": "track-04-study-03",
    "trackId": "track-04",
    "number": 3,
    "slug": "santificacao-aprendendo-a-viver-como-quem-pertence-a-deus",
    "title": "Santificação: aprendendo a viver como quem pertence a Deus",
    "summary": "Santificação: aprendendo a viver como quem pertence a Deus",
    "questionCentral": "Como Deus transforma nossa vida depois que somos alcançados pela graça?",
    "objective": "Compreender que santificação é a caminhada de quem pertence a Deus e aprende, pela ação do Espírito e pela obediência, a abandonar o pecado e refletir cada vez mais o caráter de Cristo.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-04",
    "published": false
  },
  {
    "id": "track-04-study-04",
    "trackId": "track-04",
    "number": 4,
    "slug": "identidade-em-cristo-quem-somos-quando-nossa-vida-pertence-a-jesus",
    "title": "Identidade em Cristo: quem somos quando nossa vida pertence a Jesus",
    "summary": "Identidade em Cristo: quem somos quando nossa vida pertence a Jesus",
    "questionCentral": "O que significa encontrar nossa identidade em Cristo sem perder nossa história, personalidade e responsabilidade?",
    "objective": "Compreender que nossa identidade mais profunda não precisa ser construída apenas sobre desempenho, aprovação, passado ou fracassos. Em Cristo somos reconciliados, adotados e chamados para uma nova vida, sem deixar de ser pessoas reais com história e responsabilidades.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-05",
    "published": false
  },
  {
    "id": "track-04-study-05",
    "trackId": "track-04",
    "number": 5,
    "slug": "como-vencer-a-tentacao-reconhecer-fugir-e-permanecer-em-cristo",
    "title": "Como vencer a tentação: reconhecer, fugir e permanecer em Cristo",
    "summary": "Como vencer a tentação: reconhecer, fugir e permanecer em Cristo",
    "questionCentral": "Como enfrentar a tentação de maneira bíblica e prática sem confundi-la com pecado nem subestimar seu poder?",
    "objective": "Compreender que ser tentado não é o mesmo que pecar, que Jesus conhece a realidade da tentação e que Deus nos chama a reconhecer nossos pontos fracos, usar os caminhos de escape e buscar ajuda em vez de brincar com aquilo que pode nos dominar.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-06",
    "published": false
  },
  {
    "id": "track-04-study-06",
    "trackId": "track-04",
    "number": 6,
    "slug": "o-fruto-do-espirito-quando-o-carater-de-cristo-comeca-a-aparecer-em-nos",
    "title": "O fruto do Espírito: quando o caráter de Cristo começa a aparecer em nós",
    "summary": "O fruto do Espírito: quando o caráter de Cristo começa a aparecer em nós",
    "questionCentral": "O que é o fruto do Espírito e como ele cresce numa vida comum?",
    "objective": "Compreender que o Espírito Santo não atua apenas em momentos extraordinários. Ele forma em nós um caráter semelhante ao de Cristo, e esse fruto amadurece à medida que aprendemos a caminhar com Deus no cotidiano.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-07",
    "published": false
  },
  {
    "id": "track-04-study-07",
    "trackId": "track-04",
    "number": 7,
    "slug": "perdao-libertar-o-coracao-sem-chamar-o-mal-de-bem",
    "title": "Perdão: libertar o coração sem chamar o mal de bem",
    "summary": "Perdão: libertar o coração sem chamar o mal de bem",
    "questionCentral": "O que significa perdoar biblicamente e o que o perdão não exige de uma pessoa ferida?",
    "objective": "Compreender que o perdão nasce da graça recebida em Cristo, rompe o ciclo da vingança e nos chama a entregar a Deus o direito de acerto final, sem apagar a verdade, impedir justiça ou obrigar reconciliação sem segurança e mudança.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-08",
    "published": false
  },
  {
    "id": "track-04-study-08",
    "trackId": "track-04",
    "number": 8,
    "slug": "oracao-falar-com-deus-sem-transformar-a-fe-em-formula",
    "title": "Oração: falar com Deus sem transformar a fé em fórmula",
    "summary": "Oração: falar com Deus sem transformar a fé em fórmula",
    "questionCentral": "O que Jesus ensina sobre oração e como construir uma vida de conversa verdadeira com Deus?",
    "objective": "Compreender que oração é relacionamento, dependência e alinhamento com Deus. Não é técnica para controlar resultados, mas um caminho de adoração, pedido, confissão, entrega e confiança.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-09",
    "published": false
  },
  {
    "id": "track-04-study-09",
    "trackId": "track-04",
    "number": 9,
    "slug": "leitura-e-meditacao-na-palavra-ouvir-deus-com-atencao",
    "title": "Leitura e meditação na Palavra: ouvir Deus com atenção",
    "summary": "Leitura e meditação na Palavra: ouvir Deus com atenção",
    "questionCentral": "Como ler a Bíblia de modo que ela forme nossa fé sem transformá-la em livro de frases soltas?",
    "objective": "Compreender que a Bíblia deve ser lida com atenção ao contexto, meditada com constância e recebida como Palavra que ensina, corrige e forma, não como mecanismo de respostas aleatórias.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-10",
    "published": false
  },
  {
    "id": "track-04-study-10",
    "trackId": "track-04",
    "number": 10,
    "slug": "ansiedade-e-confianca-viver-um-dia-de-cada-vez-diante-de-deus",
    "title": "Ansiedade e confiança: viver um dia de cada vez diante de Deus",
    "summary": "Ansiedade e confiança: viver um dia de cada vez diante de Deus",
    "questionCentral": "Como Jesus nos ensina a lidar com preocupações sem transformar ansiedade em motivo de culpa espiritual?",
    "objective": "Compreender que Jesus nos chama a confiar no cuidado do Pai e a viver o presente com prioridade no Reino, sem negar dificuldades reais nem tratar toda ansiedade como simples falta de fé.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-11",
    "published": false
  },
  {
    "id": "track-04-study-11",
    "trackId": "track-04",
    "number": 11,
    "slug": "sofrimento-fe-quando-a-vida-doi",
    "title": "Sofrimento: fé quando a vida dói",
    "summary": "Sofrimento: fé quando a vida dói",
    "questionCentral": "O que a Bíblia nos ensina a fazer quando a dor não possui uma explicação simples?",
    "objective": "Compreender que a fé bíblica não exige negar a dor nem inventar uma razão para cada sofrimento. Podemos lamentar, pedir ajuda, permanecer perto de Cristo e sustentar esperança na ressurreição mesmo sem respostas completas.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-12",
    "published": false
  },
  {
    "id": "track-04-study-12",
    "trackId": "track-04",
    "number": 12,
    "slug": "contentamento-aprender-a-viver-sem-depender-de-ter-sempre-mais",
    "title": "Contentamento: aprender a viver sem depender de ter sempre mais",
    "summary": "Contentamento: aprender a viver sem depender de ter sempre mais",
    "questionCentral": "O que Paulo realmente quis dizer com “tudo posso” e como aprender contentamento em diferentes circunstâncias?",
    "objective": "Compreender que contentamento não é conformismo nem negação de necessidades. É aprender, em Cristo, a não deixar que abundância ou falta definam nossa paz, nosso valor e nossa fidelidade.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-13",
    "published": false
  },
  {
    "id": "track-04-study-13",
    "trackId": "track-04",
    "number": 13,
    "slug": "sabedoria-nas-decisoes-escolher-sem-exigir-um-mapa-completo",
    "title": "Sabedoria nas decisões: escolher sem exigir um mapa completo",
    "summary": "Sabedoria nas decisões: escolher sem exigir um mapa completo",
    "questionCentral": "Como tomar decisões com fé quando a Bíblia não dá uma resposta direta para cada escolha?",
    "objective": "Compreender que Deus nos guia principalmente por sua Palavra, pela sabedoria, oração, conselhos maduros e responsabilidade. Nem toda decisão vem acompanhada de um sinal extraordinário, e fé também envolve escolher com humildade quando não temos certeza absoluta.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-14",
    "published": false
  },
  {
    "id": "track-04-study-14",
    "trackId": "track-04",
    "number": 14,
    "slug": "relacionamentos-amar-com-verdade-graca-e-limites",
    "title": "Relacionamentos: amar com verdade, graça e limites",
    "summary": "Relacionamentos: amar com verdade, graça e limites",
    "questionCentral": "Como o Evangelho muda a maneira como nos relacionamos sem exigir relações perfeitas ou sem limites?",
    "objective": "Compreender que relacionamentos cristãos são marcados por amor sincero, verdade, humildade, perdão e paz, mas também podem exigir limites. A Bíblia não chama ninguém a manter qualquer relação a qualquer custo.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-15",
    "published": false
  },
  {
    "id": "track-04-study-15",
    "trackId": "track-04",
    "number": 15,
    "slug": "o-uso-das-palavras-falar-de-um-jeito-que-produz-vida",
    "title": "O uso das palavras: falar de um jeito que produz vida",
    "summary": "O uso das palavras: falar de um jeito que produz vida",
    "questionCentral": "Como nossas palavras podem ferir, curar, construir e revelar o que existe no coração?",
    "objective": "Compreender que a Bíblia leva a fala a sério. Palavras não possuem poder mágico para criar qualquer realidade, mas possuem enorme capacidade de influenciar pessoas, relações e ambientes, e devem ser usadas com verdade, graça e domínio próprio.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-16",
    "published": false
  },
  {
    "id": "track-04-study-16",
    "trackId": "track-04",
    "number": 16,
    "slug": "servico-grandeza-que-se-ajoelha",
    "title": "Serviço: grandeza que se ajoelha",
    "summary": "Serviço: grandeza que se ajoelha",
    "questionCentral": "O que Jesus ensina sobre servir sem transformar serviço em busca de reconhecimento ou em exploração?",
    "objective": "Compreender que Jesus redefine grandeza por meio do serviço. Cada cristão recebe oportunidades e capacidades para servir, mas serviço não significa ausência de limites nem licença para líderes explorarem pessoas.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-17",
    "published": false
  },
  {
    "id": "track-04-study-17",
    "trackId": "track-04",
    "number": 17,
    "slug": "generosidade-maos-abertas-num-mundo-de-medo-e-acumulo",
    "title": "Generosidade: mãos abertas num mundo de medo e acúmulo",
    "summary": "Generosidade: mãos abertas num mundo de medo e acúmulo",
    "questionCentral": "Como dar com liberdade sem transformar generosidade em barganha com Deus?",
    "objective": "Compreender que a generosidade cristã nasce da graça, é voluntária e proporcional, busca suprir necessidades e não deve ser usada como fórmula para enriquecer nem como pressão sobre pessoas vulneráveis.",
    "estimatedMinutes": null,
    "nextStudyId": "track-04-study-18",
    "published": false
  },
  {
    "id": "track-04-study-18",
    "trackId": "track-04",
    "number": 18,
    "slug": "perseveranca-continuar-quando-a-caminhada-fica-longa",
    "title": "Perseverança: continuar quando a caminhada fica longa",
    "summary": "Perseverança: continuar quando a caminhada fica longa",
    "questionCentral": "Como permanecer em Cristo quando o entusiasmo diminui, as dificuldades aumentam e ainda estamos longe da linha de chegada?",
    "objective": "Compreender que perseverança cristã não é teimosia solitária. É continuar olhando para Jesus, abandonando pesos, recebendo apoio da comunidade e caminhando pela graça mesmo depois de quedas, cansaço e períodos de pouca emoção.",
    "estimatedMinutes": null,
    "nextStudyId": null,
    "published": false
  }
] as const;

const rawSectionsByStudy = [
  {
    "studyId": "track-04-study-01",
    "sections": [
      {
        "id": "track-04-study-01-golden-text-1",
        "studyId": "track-04-study-01",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Necessário vos é nascer de novo.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 3:7",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-01-practical-truth-2",
        "studyId": "track-04-study-01",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Seguir Jesus não é apenas melhorar a velha vida; é receber de Deus uma nova vida que começa",
            "type": "PARAGRAPH"
          },
          {
            "text": "no coração e passa a transformar toda a nossa caminhada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-01-bible-reading-3",
        "studyId": "track-04-study-01",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: João 3:1-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Ezequiel 36:25-27 | Tito 3:3-7 | 2 Coríntios 5:17 | 1 Pedro 1:22-23 | Efésios 2:4-10",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-01-before-understanding-4",
        "studyId": "track-04-study-01",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Uma pessoa pode frequentar uma igreja, conhecer histórias bíblicas, aprender palavras religiosas e ainda não",
            "type": "PARAGRAPH"
          },
          {
            "text": "compreender o que Jesus chama de nascer de novo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nicodemos era religioso, conhecia as Escrituras e possuía respeito entre o povo. Mesmo assim, Jesus lhe disse",
            "type": "PARAGRAPH"
          },
          {
            "text": "que era necessário nascer de novo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso nos mostra que a vida cristã não é apenas acrescentar religião à vida que já temos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 01/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não é uma reforma de aparência: abandonar alguns hábitos, adotar outros e aprender a parecer",
            "type": "PARAGRAPH"
          },
          {
            "text": "espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus fala de algo mais profundo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus precisa agir em nós.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É por isso que a nova vida começa com graça, não com orgulho.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-01-read-5",
        "studyId": "track-04-study-01",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: João 3:1-8",
            "type": "SUBHEADING"
          },
          {
            "text": "João 3 registra uma conversa noturna entre Jesus e Nicodemos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nicodemos começa reconhecendo que Jesus veio de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Jesus rapidamente leva a conversa para o ponto central: sem novo nascimento, ninguém vê o Reino de",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-01-observe-6",
        "studyId": "track-04-study-01",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Nicodemos tinha religião, mas ainda precisava de nova vida",
            "type": "SUBHEADING"
          },
          {
            "text": "Nicodemos não era alguém indiferente a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele era fariseu e mestre em Israel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mesmo assim, conhecimento religioso não substituía aquilo que Jesus dizia ser necessário.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso nos impede de confundir proximidade com ambientes cristãos e transformação interior.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pergunta importante",
            "type": "PARAGRAPH"
          },
          {
            "text": "Eu apenas aprendi a linguagem da fé ou realmente estou respondendo a Cristo com fé e",
            "type": "PARAGRAPH"
          },
          {
            "text": "arrependimento?",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. O novo nascimento vem de Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus fala de nascer do Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que a origem dessa nova vida não está no poder da vontade humana.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ninguém consegue produzir vida espiritual apenas tentando com mais força.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Assim como não escolhemos produzir nosso primeiro nascimento, também dependemos da ação de Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "para receber a nova vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso destrói o orgulho",
            "type": "PARAGRAPH"
          },
          {
            "text": "A vida cristã começa recebendo, não exibindo mérito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. A nova vida envolve limpeza e renovação",
            "type": "SUBHEADING"
          },
          {
            "text": "Ezequiel 36 já havia anunciado uma obra de Deus que inclui purificação, novo coração e novo espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus conversa com um mestre de Israel, por isso esse pano de fundo ajuda a compreender que a promessa",
            "type": "PARAGRAPH"
          },
          {
            "text": "não era apenas de comportamento externo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus prometia transformação interior.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 01/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não quer apenas maquiagem espiritual",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele deseja um coração renovado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. O Espírito produz uma vida que não controlamos como uma técnica",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus compara a ação do Espírito ao vento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não significa que a obra de Deus seja irracional.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa que não podemos dominar o Espírito como quem domina um método.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não é uma fórmula que acionamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nova vida não é truque religioso",
            "type": "PARAGRAPH"
          },
          {
            "text": "É obra do Espírito de Deus em pessoas reais.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-01-understand-7",
        "studyId": "track-04-study-01",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Nascer de novo não significa tornar-se perfeito de uma vez",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma criança nasce viva, mas ainda precisa crescer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Da mesma forma, o novo nascimento inicia uma vida que precisa amadurecer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento fala de crescimento, aprendizado, correção e perseverança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem nasceu de novo ainda enfrenta lutas, mas já não precisa viver como se nada tivesse mudado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Novo nascimento é começo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não linha de chegada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Mudança exterior sozinha não produz nova vida",
            "type": "SUBHEADING"
          },
          {
            "text": "Alguém pode parar de beber por saúde, falar menos palavrões por educação e doar dinheiro por generosidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "social.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essas mudanças podem ser boas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas o novo nascimento é mais do que melhora moral.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele envolve reconciliação com Deus e uma vida que passa a pertencer a Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Moralidade não é inútil",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas não deve ser confundida com salvação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-01-connect-8",
        "studyId": "track-04-study-01",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Tito apresenta a salvação como renovação pela misericórdia de Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "Tito 3 lembra quem éramos e afirma que Deus nos salvou não por obras de justiça feitas por nós, mas",
            "type": "PARAGRAPH"
          },
          {
            "text": "segundo sua misericórdia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo fala de lavagem e renovação pelo Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Novamente, a iniciativa está em Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 01/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "A nova vida é graça",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não prêmio para quem conseguiu se tornar bom sozinho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. A nova criação começa agora, mas ainda aguarda plenitude",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 5 fala de nova criação em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que todos os problemas desaparecem imediatamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ainda aguardamos ressurreição e restauração final.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas algo real começa agora: nova relação com Deus, novos desejos e um novo caminho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Já começou, mas ainda não terminou",
            "type": "PARAGRAPH"
          },
          {
            "text": "A nova vida é presente e esperança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não transforme uma experiência emocional específica em regra para todos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas pessoas conseguem apontar um dia e uma hora de conversão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Outras perceberam a fé amadurecendo ao longo de um processo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento exige fé em Cristo e uma vida transformada, mas não exige que todos contem a mesma",
            "type": "PARAGRAPH"
          },
          {
            "text": "história emocional.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O centro não é reproduzir a experiência de outra pessoa",
            "type": "PARAGRAPH"
          },
          {
            "text": "É responder verdadeiramente a Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E “nascer da água e do Espírito”?",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 3:5 recebe interpretações diferentes entre cristãos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Alguns entendem a água ligada diretamente ao batismo; outros veem uma referência à purificação prometida",
            "type": "PARAGRAPH"
          },
          {
            "text": "em Ezequiel 36; há outras leituras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Neste estudo, não precisamos resolver toda a discussão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ponto seguro é que Jesus fala de uma obra de Deus necessária para entrar em seu Reino.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não construa uma conclusão maior que o texto",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mantenha Cristo e a obra do Espírito no centro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como saber se existe nova vida?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não nos manda procurar perfeição instantânea.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos chama a olhar para fé em Cristo, arrependimento e fruto ao longo da caminhada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existe novo desejo de conhecer Deus? Existe luta contra aquilo que antes era simplesmente abraçado? Existe",
            "type": "PARAGRAPH"
          },
          {
            "text": "crescimento no amor, na verdade e na obediência?",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 01/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fruto não compra a nova vida, mas ajuda a mostrar que uma vida real está acontecendo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não olhe apenas para um momento isolado",
            "type": "PARAGRAPH"
          },
          {
            "text": "Observe a direção da caminhada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-01-apply-9",
        "studyId": "track-04-study-01",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Pare de tentar sustentar uma aparência que esconde o coração",
            "type": "SUBHEADING"
          },
          {
            "text": "Religião pode se tornar uma máscara.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É possível aprender o comportamento esperado e ainda evitar conversas sinceras com Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O novo nascimento nos chama para verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não quer apenas uma versão religiosa de você",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele quer você diante dele com sinceridade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Comece a viver como alguém que recebeu uma nova direção",
            "type": "SUBHEADING"
          },
          {
            "text": "Nova vida muda escolhas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não porque precisamos provar nossa salvação todos os dias, mas porque agora pertencemos a Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que antes parecia normal pode começar a incomodar. O que antes não tinha valor pode se tornar precioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mudança real costuma começar em decisões pequenas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma conversa, um limite, uma confissão, um hábito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Dependa do Espírito, não apenas da força de vontade",
            "type": "SUBHEADING"
          },
          {
            "text": "Disciplina é importante.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a vida cristã não é uma tentativa de viver para Deus sem Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore, permaneça na Palavra, caminhe com a Igreja e peça ao Espírito que forme em você aquilo que sozinho",
            "type": "PARAGRAPH"
          },
          {
            "text": "não consegue produzir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dependência não é passividade",
            "type": "PARAGRAPH"
          },
          {
            "text": "É agir reconhecendo de onde vem a vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Dê espaço para crescimento",
            "type": "SUBHEADING"
          },
          {
            "text": "Não use a graça para justificar estagnação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas também não despreze processos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus trabalha em pessoas reais, com histórias reais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aprender a caminhar com Cristo envolve levantar, corrigir rotas e continuar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Crescimento cristão não é teatro de perfeição",
            "type": "PARAGRAPH"
          },
          {
            "text": "É uma caminhada de transformação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 01/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-01-journey-takeaway-10",
        "studyId": "track-04-study-01",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus não disse a Nicodemos apenas para se esforçar mais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele falou de nascer de novo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A nova vida não nasce da tradição religiosa, da aparência ou da força moral.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nasce da ação misericordiosa de Deus e nos chama para uma caminhada conduzida pelo Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem recebe essa vida ainda precisa crescer, mas já não precisa continuar vivendo como se Cristo não tivesse",
            "type": "PARAGRAPH"
          },
          {
            "text": "feito diferença.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "A pergunta principal não é apenas “sou religioso?”, mas “estou vivendo a nova vida que Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "oferece em Cristo?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "A nova vida começa pela graça de Deus e se torna visível numa caminhada crescente de fé,",
            "type": "PARAGRAPH"
          },
          {
            "text": "arrependimento e transformação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-01-practice-today-11",
        "studyId": "track-04-study-01",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Leia novamente João 3:1-8.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois responda em uma frase: Que diferença existe entre parecer religioso e receber nova vida?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escolha uma área concreta em que sua caminhada com Cristo precisa sair da aparência e chegar ao coração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-01-reflection-questions-12",
        "studyId": "track-04-study-01",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho confundido vida cristã com comportamento religioso?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe alguma área em que desejo mudança exterior sem permitir que Deus trate meu coração?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Em que sentido minha relação com Cristo mudou meus desejos?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho dependido mais da força de vontade ou do Espírito de Deus?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Qual crescimento preciso buscar com paciência e responsabilidade?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-01-journal-prompt-13",
        "studyId": "track-04-study-01",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que sinal de nova vida eu agradeço a Deus por enxergar em minha caminhada e em que área",
            "type": "PARAGRAPH"
          },
          {
            "text": "ainda desejo crescer?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-01-prayer-14",
        "studyId": "track-04-study-01",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 01/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, obrigado porque não me chamaste apenas para parecer melhor, mas para receber vida",
            "type": "PARAGRAPH"
          },
          {
            "text": "em ti. Livra-me de uma fé de aparência. Renova meu coração, corrige meus desejos e ensina-me",
            "type": "PARAGRAPH"
          },
          {
            "text": "a caminhar pelo teu Espírito. Onde eu estiver preso ao velho caminho, chama-me ao",
            "type": "PARAGRAPH"
          },
          {
            "text": "arrependimento. Onde eu estiver desanimado com meu crescimento, lembra-me de que tua",
            "type": "PARAGRAPH"
          },
          {
            "text": "graça continua trabalhando. Que minha vida mostre, pouco a pouco, que pertenço a Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-01-keep-15",
        "studyId": "track-04-study-01",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "João 3:7 - Jesus afirma a necessidade do novo nascimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tito 3:5 - Observe a ligação entre misericórdia, renovação e Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para lembrar que a vida cristã começa e continua dependente da graça",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-01-group-mode-16",
        "studyId": "track-04-study-01",
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
            "text": "O que mais surpreende na conversa de Jesus com alguém tão religioso como Nicodemos?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre mudança moral e novo nascimento?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que prática pode nos ajudar a viver de maneira mais coerente com a nova vida nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-01-continue-journey-17",
        "studyId": "track-04-study-01",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Se a nova vida não é conquistada por mérito, uma pergunta aparece:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como um pecador pode ser aceito por um Deus santo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 02 - Justificação pela fé: aceitos por causa de Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: O que significa ser justificado pela fé e por que isso nos liberta tanto do",
            "type": "PARAGRAPH"
          },
          {
            "text": "orgulho quanto da culpa?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-01-references-18",
        "studyId": "track-04-study-01",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "João 3:1-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ezequiel 36:25-27",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 01/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tito 3:3-7",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 5:17",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 1:22-23",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 2:4-10",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-02",
    "sections": [
      {
        "id": "track-04-study-02-golden-text-1",
        "studyId": "track-04-study-02",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Sendo, pois, justificados pela fé, temos paz com Deus por nosso Senhor Jesus Cristo.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5:1",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-02-practical-truth-2",
        "studyId": "track-04-study-02",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Nossa segurança diante de Deus não está em apresentar uma vida sem falhas, mas em confiar",
            "type": "PARAGRAPH"
          },
          {
            "text": "na obra de Cristo e responder a essa graça com uma fé viva.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-02-bible-reading-3",
        "studyId": "track-04-study-02",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Romanos 3:21-28",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Romanos 4:1-5 | Romanos 5:1-11 | Gálatas 2:15-21 | Filipenses 3:7-9 | Tiago 2:14-26",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-02-before-understanding-4",
        "studyId": "track-04-study-02",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Muitas pessoas carregam a sensação de que precisam provar seu valor diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando acertam, sentem-se aceitas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando falham, imaginam que perderam qualquer possibilidade de se aproximar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 02/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Outras fazem o movimento contrário: comparam-se com pessoas consideradas piores e concluem que estão",
            "type": "PARAGRAPH"
          },
          {
            "text": "bem diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos desmonta as duas tentativas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ninguém compra a aceitação de Deus pelo próprio currículo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E ninguém precisa viver tentando fabricar uma justiça própria quando Cristo se torna nossa esperança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa é a beleza da justificação pela fé.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-02-read-5",
        "studyId": "track-04-study-02",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Romanos 3:21-28",
            "type": "SUBHEADING"
          },
          {
            "text": "Romanos 3 chega depois de Paulo mostrar a necessidade comum da humanidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Então ele apresenta uma boa notícia: Deus oferece justiça por meio da fé em Jesus Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-02-observe-6",
        "studyId": "track-04-study-02",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. A justificação começa com nossa necessidade, não com nossa",
            "type": "SUBHEADING"
          },
          {
            "text": "superioridade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo afirma que todos pecaram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso destrói a comparação como caminho de segurança espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Talvez eu consiga encontrar alguém que, aos meus olhos, viva pior do que eu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas outra pessoa não é o padrão final.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz nivela nosso orgulho",
            "type": "PARAGRAPH"
          },
          {
            "text": "Todos precisamos de graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. A aceitação é apresentada como presente",
            "type": "SUBHEADING"
          },
          {
            "text": "Romanos fala de ser justificado gratuitamente pela graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gratuitamente não significa que a cruz foi barata.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa que nós não conseguimos pagar por ela.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receber não é conquistar",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fé estende mãos vazias para aquilo que Deus oferece em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. Cristo está no centro da nossa confiança",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo não manda confiar na intensidade da própria fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele aponta para Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma fé pequena colocada no Salvador verdadeiro vale mais do que uma confiança enorme colocada no",
            "type": "PARAGRAPH"
          },
          {
            "text": "próprio mérito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O poder não está em acreditar em qualquer coisa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Está naquele em quem confiamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 02/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. O resultado é paz com Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "Romanos 5 fala de paz com Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é apenas sentir calma emocional.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É uma nova relação: aquele que estava afastado é reconciliado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Justificação muda nossa posição",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos viver diante de Deus como fugitivos tentando esconder a culpa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-02-understand-7",
        "studyId": "track-04-study-02",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Justificação não significa que Deus finge que nunca pecamos",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não precisa mentir para nos receber.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz trata o pecado com seriedade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando Deus justifica o pecador que crê, nossa esperança está na obra de Cristo, não numa reescrita falsa do",
            "type": "PARAGRAPH"
          },
          {
            "text": "nosso passado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça não nega a verdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos reconcilia apesar de não termos mérito próprio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Fé não é uma nova obra usada para comprar salvação",
            "type": "SUBHEADING"
          },
          {
            "text": "Às vezes transformamos a fé em mais um desempenho: “Se eu acreditar forte o suficiente, Deus me deverá",
            "type": "PARAGRAPH"
          },
          {
            "text": "alguma coisa.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Paulo coloca fé em contraste com vanglória.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé significa depender de Cristo, não apresentar um novo motivo para orgulho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé olha para fora de si",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela deixa de confiar em si mesma como salvadora.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-02-connect-8",
        "studyId": "track-04-study-02",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Paulo e Tiago não estão ensinando evangelhos diferentes",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo combate a ideia de que obras podem nos colocar em dívida positiva com Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago combate uma fé apenas verbal, sem qualquer fruto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo pergunta: “Como somos aceitos por Deus?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago pergunta: “Que tipo de fé é real?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "As duas verdades caminham juntas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Obras não são a raiz da nossa aceitação, mas uma fé viva produz fruto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Justificação e transformação não são a mesma coisa, mas não devem ser",
            "type": "PARAGRAPH"
          },
          {
            "text": "separadas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Justificação fala de nossa aceitação diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 02/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santificação, que veremos no próximo estudo, fala do processo de transformação da vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não somos aceitos porque já estamos totalmente transformados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas quem é alcançado pela graça é chamado a uma vida nova.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ordem importa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não diz: “Mude tudo e então venha”. Em Cristo, somos recebidos e então chamados a",
            "type": "PARAGRAPH"
          },
          {
            "text": "caminhar em novidade de vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use a justificação para eliminar responsabilidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ser perdoado por Deus não significa que toda consequência humana desaparece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se ferimos alguém, pode haver reparação a fazer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se houve crime, pode haver responsabilidade legal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça não é uma borracha usada para impedir justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão diante de Deus não transforma irresponsabilidade em maturidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "A graça nos ensina a assumir a verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que significa “justificar” em linguagem simples?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A palavra possui um sentido ligado a declarar alguém em relação correta diante de um tribunal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Na Bíblia, não significa que Deus afirma que nunca pecamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa que, por causa de Cristo, aquele que crê é recebido por Deus e não precisa construir uma justiça",
            "type": "PARAGRAPH"
          },
          {
            "text": "própria como base de aceitação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É por isso que Paulo fala de paz, graça e ausência de vanglória.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma frase simples",
            "type": "PARAGRAPH"
          },
          {
            "text": "Justificação é ser recebido por Deus com base em Cristo, não no nosso currículo espiritual.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-02-apply-9",
        "studyId": "track-04-study-02",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Pare de medir o amor de Deus pela sua performance do dia",
            "type": "SUBHEADING"
          },
          {
            "text": "Você terá dias melhores e piores.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se toda sua segurança depende de desempenho, viverá oscilando entre orgulho e desespero.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A graça nos dá um chão mais firme.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nossa esperança é Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não a nota que damos a nós mesmos no fim do dia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 02/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Confesse sem teatro",
            "type": "SUBHEADING"
          },
          {
            "text": "Quando a aceitação depende de parecer perfeito, escondemos pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando entendemos a graça, podemos confessar com verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não torna o pecado pequeno; torna desnecessária a máscara.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pessoas justificadas ainda confessam",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas confessam como filhos que voltam para o Pai, não como candidatos tentando comprar uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "vaga.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Abandone a comparação religiosa",
            "type": "SUBHEADING"
          },
          {
            "text": "Não precisamos nos sentir maiores porque alguém caiu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se dependemos da graça, não existe razão para superioridade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso também muda a forma como restauramos quem erra.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça recebida produz humildade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não arrogância espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Deixe sua fé produzir fruto",
            "type": "SUBHEADING"
          },
          {
            "text": "Fé viva muda escolhas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não para garantir que Deus finalmente nos ame, mas porque já fomos alcançados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Obediência deixa de ser moeda e passa a ser resposta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Boas obras têm lugar importante",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas no lugar certo: fruto, não preço.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-02-journey-takeaway-10",
        "studyId": "track-04-study-02",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Ser justificado pela fé significa deixar de apoiar nossa relação com Deus no próprio desempenho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Todos pecaram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Todos precisam de graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Cristo, Deus oferece reconciliação e paz ao que crê.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa verdade mata o orgulho e também enfrenta a culpa interminável.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos fingir perfeição nem transformar boas obras em pagamento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Somos chamados a confiar em Cristo e permitir que essa fé se torne visível numa vida transformada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fé cristã não começa dizendo “olhe o que consegui fazer”, mas “olhe o que Cristo fez e em",
            "type": "PARAGRAPH"
          },
          {
            "text": "quem estou confiando”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 02/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem é justificado pela fé pode viver com humildade, gratidão e paz, porque sua aceitação",
            "type": "PARAGRAPH"
          },
          {
            "text": "diante de Deus está ancorada em Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-02-practice-today-11",
        "studyId": "track-04-study-02",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escreva duas frases:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho tentado provar meu valor diante de Deus quando...",
            "type": "PARAGRAPH"
          },
          {
            "text": "e:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Preciso voltar a confiar em Cristo nesta área...",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore entregando a Deus tanto seu orgulho quanto sua culpa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-02-reflection-questions-12",
        "studyId": "track-04-study-02",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Minha segurança diante de Deus depende de como foi minha semana?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho usado boas obras como motivo de superioridade?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe algum pecado confessado que continuo tentando pagar com autopunição?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Minha fé tem produzido fruto real?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Consigo receber graça e, ao mesmo tempo, assumir responsabilidade pelos meus erros?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-02-journal-prompt-13",
        "studyId": "track-04-study-02",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Em que área ainda tento construir uma justiça própria em vez de descansar na obra de Cristo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-02-prayer-14",
        "studyId": "track-04-study-02",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, obrigado porque não preciso apresentar um currículo perfeito para ser recebido por ti.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Eu reconheço meu pecado e abandono o orgulho de tentar salvar a mim mesmo. Ensina-me a",
            "type": "PARAGRAPH"
          },
          {
            "text": "confiar em Cristo. Livra-me também da culpa que insiste em transformar autopunição em",
            "type": "PARAGRAPH"
          },
          {
            "text": "pagamento. Que tua graça produza em mim humildade, paz e uma vida de obediência",
            "type": "PARAGRAPH"
          },
          {
            "text": "verdadeira. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-02-keep-15",
        "studyId": "track-04-study-02",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Romanos 5:1 - Pela fé, temos paz com Deus por meio de Jesus Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 3:9 - Observe onde Paulo deseja encontrar sua justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para os dias em que orgulho ou culpa tentarem ocupar o lugar da graça.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-02-group-mode-16",
        "studyId": "track-04-study-02",
        "type": "GROUP_MODE",
        "title": "Modo Grupo",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 02/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
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
            "text": "Como explicar a diferença entre fé viva e tentativa de merecer salvação?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que mudança prática acontece quando boas obras deixam de ser preço e passam a ser",
            "type": "PARAGRAPH"
          },
          {
            "text": "resposta?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-02-continue-journey-17",
        "studyId": "track-04-study-02",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Ser recebido por Deus não significa que a caminhada terminou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A graça que nos aceita também começa a nos transformar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 03 - Santificação: aprendendo a viver como quem pertence a Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como Deus transforma nossa vida depois que somos alcançados pela graça?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-02-references-18",
        "studyId": "track-04-study-02",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Romanos 3:21-28",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 4:1-5",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5:1-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gálatas 2:15-21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 3:7-9",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago 2:14-26",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-03",
    "sections": [
      {
        "id": "track-04-study-03-golden-text-1",
        "studyId": "track-04-study-03",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Esta é a vontade de Deus: a vossa santificação.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Tessalonicenses 4:3",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-03-practical-truth-2",
        "studyId": "track-04-study-03",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A graça que nos perdoa também nos ensina a viver de maneira nova; santidade não é perfeição",
            "type": "PARAGRAPH"
          },
          {
            "text": "de aparência, mas uma caminhada real de transformação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-03-bible-reading-3",
        "studyId": "track-04-study-03",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: 1 Tessalonicenses 4:1-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Romanos 6:1-14 | Filipenses 2:12-13 | Hebreus 12:14 | 1 Pedro 1:13-16 | Gálatas",
            "type": "PARAGRAPH"
          },
          {
            "text": "5:16-25",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-03-before-understanding-4",
        "studyId": "track-04-study-03",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Depois de falar de graça, surge uma pergunta importante:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se somos salvos pela graça, ainda importa como vivemos?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Novo Testamento responde claramente: sim.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a ordem precisa ser preservada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não buscamos santidade para comprar o amor de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 03/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Buscamos santidade porque fomos alcançados por Ele e agora pertencemos a Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santificação é essa caminhada de transformação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é fingir perfeição.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não é acomodar-se dizendo que nunca mudaremos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É aprender a viver, pouco a pouco, de maneira coerente com a nova vida que recebemos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-03-read-5",
        "studyId": "track-04-study-03",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: 1 Tessalonicenses 4:1-8",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo escreve a cristãos que já haviam recebido o Evangelho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não diz: “Agora que vocês creram, a forma de viver não importa”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele fala sobre agradar a Deus, crescer e abandonar práticas que não combinam com a nova vida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-03-observe-6",
        "studyId": "track-04-study-03",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Santificação é dirigida a pessoas que já pertencem a Cristo",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo fala a irmãos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso é importante porque santidade não aparece como ingresso para comprar lugar na família de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela aparece como caminho daqueles que já foram chamados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ordem protege o Evangelho",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não mudamos para que Deus finalmente nos aceite; porque fomos alcançados, aprendemos a",
            "type": "PARAGRAPH"
          },
          {
            "text": "mudar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Santificação alcança escolhas concretas",
            "type": "SUBHEADING"
          },
          {
            "text": "1 Tessalonicenses fala de sexualidade, domínio do próprio corpo e respeito pelo próximo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso mostra que santidade não é conceito abstrato.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela toca desejos, hábitos e relacionamentos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fé chega ao corpo e ao cotidiano",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não quer apenas pensamentos religiosos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. Santidade envolve crescimento",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo reconhece coisas boas nos cristãos e ainda pede que progridam mais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso é encorajador.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Crescimento cristão não exige desprezar todo avanço porque ainda não chegamos ao fim.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos agradecer pelo que Deus já fez e continuar buscando mudança",
            "type": "PARAGRAPH"
          },
          {
            "text": "As duas coisas cabem juntas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Rejeitar a santidade é mais sério do que rejeitar uma preferência humana",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo liga esse chamado ao próprio Deus, que dá seu Espírito Santo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 03/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não estamos falando apenas do estilo de vida favorito de um líder religioso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trata-se de responder ao Deus que nos chamou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade nasce do relacionamento",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pertencemos a Deus; por isso nossa vida importa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-03-understand-7",
        "studyId": "track-04-study-03",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Santificação é obra de Deus e também envolve nossa resposta",
            "type": "SUBHEADING"
          },
          {
            "text": "Filipenses 2 diz para desenvolver a salvação com reverência e, logo depois, afirma que Deus opera em nós o",
            "type": "PARAGRAPH"
          },
          {
            "text": "querer e o realizar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não escolhe entre dependência e responsabilidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus age e nós somos chamados a responder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é “Deus faz tudo e eu fico parado”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem “eu mudo sozinho”. É uma caminhada de graça e obediência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Santificação não é perfeição instantânea",
            "type": "SUBHEADING"
          },
          {
            "text": "Os próprios cristãos do Novo Testamento precisavam de correção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo fala de conflitos, pecados, imaturidade e crescimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não torna o pecado normal ou desejável.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mostra que transformação acontece num processo real.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Queda não precisa ser fim",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas também não deve virar residência confortável.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-03-connect-8",
        "studyId": "track-04-study-03",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Romanos 6 rejeita a ideia de usar graça como licença",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo pergunta se devemos continuar pecando para que a graça aumente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sua resposta é forte: de modo nenhum.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A união com Cristo inaugura uma nova relação com o pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça não faz amizade com aquilo que nos escraviza",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos chama para liberdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Santidade é mais do que evitar uma lista de pecados",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes pensamos que santificação é apenas “não fazer”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas o Novo Testamento também manda amar, servir, perdoar, falar verdade, praticar generosidade e produzir",
            "type": "PARAGRAPH"
          },
          {
            "text": "fruto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deixar o mal é parte da caminhada; aprender o bem também.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 03/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade possui direção positiva",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tornar-se mais parecido com Cristo, não apenas menos parecido com antigos hábitos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não confunda santidade com aparência cultural",
            "type": "PARAGRAPH"
          },
          {
            "text": "Comunidades cristãs podem possuir costumes diferentes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Alguns podem ser sábios; outros pertencem a contextos específicos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem toda preferência de grupo deve ser apresentada como se fosse mandamento direto da Bíblia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte pelo fundamento",
            "type": "PARAGRAPH"
          },
          {
            "text": "O texto bíblico exige isso ou estamos transformando costume em medida universal de",
            "type": "PARAGRAPH"
          },
          {
            "text": "santidade?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não use “processo” como desculpa eterna",
            "type": "PARAGRAPH"
          },
          {
            "text": "É verdade que crescemos aos poucos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a linguagem de processo pode ser usada para evitar arrependimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se sabemos que algo é pecado e escolhemos defendê-lo sem desejo de mudança, não estamos apenas",
            "type": "PARAGRAPH"
          },
          {
            "text": "falando de fraqueza.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça nos recebe como estamos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas nos ama demais para nos deixar exatamente onde estamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existe diferença entre tentação, queda e prática deliberada?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sim.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ser tentado não é o mesmo que pecar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tropeçar numa luta e arrepender-se também não é idêntico a abraçar deliberadamente um caminho sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "qualquer desejo de mudança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia leva o pecado a sério e, ao mesmo tempo, oferece restauração a quem volta para Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa distinção evita tanto condenar pessoas em luta quanto normalizar rebeldia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Olhe para a direção da vida",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existe luta, arrependimento e retorno ou apenas justificativa para permanecer longe de Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-03-apply-9",
        "studyId": "track-04-study-03",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Escolha uma área de crescimento, não dez promessas vagas",
            "type": "SUBHEADING"
          },
          {
            "text": "Transformação acontece melhor quando a verdade chega a decisões concretas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 03/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Talvez sua área hoje seja palavras, sexualidade, honestidade, orgulho, perdão ou disciplina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nomeie a área",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mudança genérica costuma produzir compromisso genérico.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Remova alimento daquilo que deseja abandonar",
            "type": "SUBHEADING"
          },
          {
            "text": "Se uma tentação é constantemente alimentada por ambientes, conteúdos ou hábitos específicos, oração sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "mudança prática pode virar incoerência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes santificação envolve sair, bloquear, pedir ajuda ou reorganizar rotinas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não ore apenas por força para permanecer ao lado do fogo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também dê passos para se afastar dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Use os meios simples de crescimento",
            "type": "SUBHEADING"
          },
          {
            "text": "Palavra, oração, comunhão, confissão, Ceia, serviço e acompanhamento cristão parecem simples.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Deus costuma formar seu povo por caminhos perseverantes, não apenas por momentos extraordinários.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Constância vale muito",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma vida santa é construída em muitas pequenas respostas a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Celebre crescimento sem transformar-se em juiz dos outros",
            "type": "SUBHEADING"
          },
          {
            "text": "Se Deus está mudando você, agradeça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use isso para humilhar quem está em outro ponto da caminhada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade verdadeira produz humildade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem enxerga a própria dependência da graça perde o gosto pela superioridade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Crescer não é subir num pedestal.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-03-journey-takeaway-10",
        "studyId": "track-04-study-03",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Santificação é aprender a viver como quem pertence a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela não compra nossa salvação e não acontece por aparência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É uma obra de Deus em nós que pede resposta, disciplina, arrependimento e perseverança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela inclui abandonar o pecado e aprender o bem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não somos chamados a fingir perfeição.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Somos chamados a não fazer paz com aquilo que Deus deseja transformar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Santidade é a graça de Deus formando, ao longo da caminhada, uma vida cada vez mais",
            "type": "PARAGRAPH"
          },
          {
            "text": "coerente com Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 03/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aquele que foi recebido por graça pode crescer sem medo e arrepender-se sem esconderijo,",
            "type": "PARAGRAPH"
          },
          {
            "text": "porque Deus está formando nele uma nova maneira de viver.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-03-practice-today-11",
        "studyId": "track-04-study-03",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma área concreta em que deseja crescer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escreva:",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que preciso abandonar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que preciso começar a praticar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem pode caminhar comigo nessa mudança?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dê um passo hoje.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-03-reflection-questions-12",
        "studyId": "track-04-study-03",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho visto santidade como preço ou como resposta à graça?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que área da minha vida precisa de mudança concreta?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe algum ambiente que alimenta uma luta que digo querer vencer?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho confundido costume de grupo com mandamento bíblico?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Consigo reconhecer crescimento sem me tornar superior?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-03-journal-prompt-13",
        "studyId": "track-04-study-03",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que mudança Deus está formando em mim nesta fase e qual passo de obediência preciso dar",
            "type": "PARAGRAPH"
          },
          {
            "text": "agora?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-03-prayer-14",
        "studyId": "track-04-study-03",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, obrigado porque tua graça não apenas me perdoa, mas também me transforma. Mostra",
            "type": "PARAGRAPH"
          },
          {
            "text": "onde tenho feito paz com aquilo que preciso abandonar. Dá-me força para obedecer, humildade",
            "type": "PARAGRAPH"
          },
          {
            "text": "para pedir ajuda e paciência para continuar crescendo. Livra-me tanto do perfeccionismo quanto",
            "type": "PARAGRAPH"
          },
          {
            "text": "da acomodação. Forma em mim uma vida que se pareça cada vez mais com Cristo. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-03-keep-15",
        "studyId": "track-04-study-03",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "1 Tessalonicenses 4:3 - A vontade de Deus inclui nossa santificação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 2:13 - Deus opera em nós o querer e o realizar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para lembrar que a transformação cristã envolve a ação de Deus e",
            "type": "PARAGRAPH"
          },
          {
            "text": "nossa resposta fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 03/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-03-group-mode-16",
        "studyId": "track-04-study-03",
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
            "text": "O que 1 Tessalonicenses 4 mostra sobre a ligação entre santidade e vida prática?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como evitar tanto perfeccionismo quanto acomodação?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual hábito simples pode apoiar nosso crescimento nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-03-continue-journey-17",
        "studyId": "track-04-study-03",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "À medida que mudamos, também precisamos aprender a responder a uma pergunta básica:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem sou eu agora que pertenço a Cristo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 04 - Identidade em Cristo: quem somos quando nossa vida pertence a Jesus",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: O que significa encontrar nossa identidade em Cristo sem perder nossa",
            "type": "PARAGRAPH"
          },
          {
            "text": "história, personalidade e responsabilidade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-03-references-18",
        "studyId": "track-04-study-03",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "1 Tessalonicenses 4:1-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 6:1-14",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 2:12-13",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 12:14",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 1:13-16",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gálatas 5:16-25",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-04",
    "sections": [
      {
        "id": "track-04-study-04-golden-text-1",
        "studyId": "track-04-study-04",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Assim que, se alguém está em Cristo, nova criatura é.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 5:17",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-04-practical-truth-2",
        "studyId": "track-04-study-04",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Em Cristo, nosso valor e nossa direção deixam de depender apenas do que conquistamos,",
            "type": "PARAGRAPH"
          },
          {
            "text": "perdemos ou ouvimos sobre nós e passam a ser definidos pela relação que Deus nos oferece.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-04-bible-reading-3",
        "studyId": "track-04-study-04",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Romanos 8:1-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: 2 Coríntios 5:17-21 | Efésios 1:3-14 | Colossenses 3:1-4 | 1 Pedro 2:9-10 | Gálatas",
            "type": "PARAGRAPH"
          },
          {
            "text": "3:26-29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-04-before-understanding-4",
        "studyId": "track-04-study-04",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Quem sou eu?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A pergunta parece simples, mas muitas respostas disputam nosso coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sou o que conquistei?",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 04/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que perdi?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que minha família disse sobre mim?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu trabalho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu passado?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu corpo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu pior erro?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não apaga essas partes da história, mas oferece uma identidade mais profunda para quem está em",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo fala de nenhuma condenação, adoção, herança e vida pelo Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não é uma técnica de autoestima.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É uma nova relação com Deus que muda a maneira como enxergamos a nós mesmos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-04-read-5",
        "studyId": "track-04-study-04",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Romanos 8:1-17",
            "type": "SUBHEADING"
          },
          {
            "text": "Romanos 8 começa com uma declaração de enorme força: nenhuma condenação há para os que estão em",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, Paulo descreve uma vida conduzida pelo Espírito e apresenta os cristãos como filhos de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-04-observe-6",
        "studyId": "track-04-study-04",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Em Cristo, condenação não é nossa identidade final",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo não diz que cristãos nunca erram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele acabou de falar sobre luta em Romanos 7.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mesmo assim, começa o capítulo 8 afirmando que aqueles que estão em Cristo não vivem debaixo da",
            "type": "PARAGRAPH"
          },
          {
            "text": "sentença de condenação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu pecado precisa ser enfrentado",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas não precisa se tornar seu sobrenome para sempre.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Somos chamados filhos, não apenas empregados",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo fala do Espírito de adoção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso transforma a relação com Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Obediência cristã não é apenas serviço de alguém aterrorizado tentando evitar expulsão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É resposta de quem foi recebido na família.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Adoção produz segurança e pertencimento",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não nos chama apenas para trabalhar para Ele, mas para viver com Ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. A nova identidade cria uma nova direção",
            "type": "SUBHEADING"
          },
          {
            "text": "Ser filho não significa continuar indiferente ao modo de viver.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 04/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8 fala de não viver segundo a carne.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A identidade recebida começa a formar escolhas coerentes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem somos e como vivemos se relacionam",
            "type": "PARAGRAPH"
          },
          {
            "text": "A graça não separa identidade de transformação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Nossa identidade é comunitária também",
            "type": "SUBHEADING"
          },
          {
            "text": "1 Pedro chama o povo de Deus de geração eleita, sacerdócio real e povo adquirido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essas palavras não são apenas individuais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Cristo, pertencemos a um povo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fé não diz apenas “eu e Deus”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos coloca dentro de uma família espiritual.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-04-understand-7",
        "studyId": "track-04-study-04",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Identidade em Cristo não é apenas pensar coisas positivas sobre si",
            "type": "SUBHEADING"
          },
          {
            "text": "A Bíblia não manda fingir que somos perfeitos, poderosos ou capazes de tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos chama a olhar para o que Deus fez em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos reconhecer fraquezas sem concluir que não temos valor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade é melhor que autoengano",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Cristo podemos ser humildes sem nos odiar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Seu passado explica partes da história, mas não precisa governar o futuro",
            "type": "SUBHEADING"
          },
          {
            "text": "Algumas marcas do passado permanecem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Consequências podem existir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Memórias não desaparecem automaticamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Cristo nos oferece uma história que não termina onde fomos feridos ou onde pecamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nova criação não é perda de memória",
            "type": "PARAGRAPH"
          },
          {
            "text": "É uma nova direção dentro de uma história redimida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-04-connect-8",
        "studyId": "track-04-study-04",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. “Em Cristo” aparece repetidamente porque relação é central",
            "type": "SUBHEADING"
          },
          {
            "text": "Efésios 1 repete expressões como “em Cristo”, “nele” e “no Amado”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo não está ensinando uma identidade isolada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nossa nova posição existe porque estamos unidos ao Filho pela fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Identidade cristã não é autocriada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela é recebida numa relação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 04/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Igual valor não significa ausência de diferenças",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gálatas 3 afirma que barreiras de superioridade não definem nosso acesso a Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não exige apagar todas as diferenças pessoais, culturais ou responsabilidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho confronta hierarquias de valor, não transforma todos em pessoas idênticas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Unidade não é uniformidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos pertencer igualmente a Cristo e continuar sendo pessoas distintas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use “minha identidade em Cristo” para fugir de responsabilidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se alguém feriu outras pessoas, dizer “não sou mais aquela pessoa” não elimina a necessidade de",
            "type": "PARAGRAPH"
          },
          {
            "text": "arrependimento e reparação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A graça muda nossa identidade e justamente por isso nos chama para a verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nova identidade não apaga responsabilidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos dá coragem para enfrentá-la sem viver aprisionados nela.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "E quando eu não sinto que sou amado ou aceito?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sentimentos importam, mas não possuem a última palavra sobre a realidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há dias em que nosso coração parece concordar com Romanos 8 e dias em que não.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fé aprende a voltar para aquilo que Deus declarou em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa negar emoções; significa não transformar toda emoção em veredito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma prática simples",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando seu sentimento disser “não tenho valor”, responda com verdade bíblica, não com frases",
            "type": "PARAGRAPH"
          },
          {
            "text": "vazias.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-04-apply-9",
        "studyId": "track-04-study-04",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Pare de construir todo seu valor sobre desempenho",
            "type": "SUBHEADING"
          },
          {
            "text": "Trabalho, estudo e excelência são importantes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas se seu valor depende de vencer sempre, qualquer fracasso se transforma em crise de identidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você pode falhar numa tarefa sem concluir que é um fracasso humano",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu valor é maior que seu resultado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Não dê ao pior capítulo autoridade para nomear o livro inteiro",
            "type": "SUBHEADING"
          },
          {
            "text": "Talvez você tenha cometido erros graves.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 04/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Arrependimento não pede que finjamos que não aconteceram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas também não exige que nossa identidade final seja “o que fez aquilo”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Cristo existe verdade e recomeço",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sem negar o passado e sem ser condenado a ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Lembre-se de que você pertence a um povo",
            "type": "SUBHEADING"
          },
          {
            "text": "Identidade em Cristo inclui irmãos e irmãs.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isolamento prolongado pode distorcer a forma como nos enxergamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Precisamos de pessoas maduras que nos lembrem da verdade e nos ajudem a crescer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pertencimento é parte da nova vida",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não apenas uma atividade semanal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Viva de maneira coerente com aquilo que recebeu",
            "type": "SUBHEADING"
          },
          {
            "text": "Se somos filhos, aprendemos o caráter da família.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se fomos reconciliados, buscamos reconciliação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se recebemos graça, aprendemos a oferecer graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Identidade não é slogan; torna-se direção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que escolha de hoje combina com quem sou em Cristo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-04-journey-takeaway-10",
        "studyId": "track-04-study-04",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Em Cristo, nossa identidade recebe um novo centro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não somos definidos apenas por conquistas, aparência, passado ou opinião alheia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Somos pecadores alcançados pela graça, reconciliados, adotados e chamados para uma nova vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não apaga nossa história nem elimina responsabilidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas muda quem possui a palavra final sobre nós.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nossa identidade mais profunda não precisa ser inventada todos os dias; ela é recebida na",
            "type": "PARAGRAPH"
          },
          {
            "text": "relação com Cristo e vivida com humildade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Saber quem somos em Cristo nos ajuda a enfrentar culpa, comparação e rejeição sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "transformar nenhuma delas em nosso nome definitivo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-04-practice-today-11",
        "studyId": "track-04-study-04",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 04/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Complete três frases no Diário:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Eu costumo medir meu valor por...",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Cristo, preciso lembrar que...",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hoje vou viver essa verdade fazendo...",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-04-reflection-questions-12",
        "studyId": "track-04-study-04",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Qual opinião humana possui poder demais sobre minha identidade?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho confundido humildade com desprezo por mim mesmo?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe um erro do passado que ainda uso como nome definitivo?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho vivido a identidade cristã também em comunidade?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que escolha prática combina com quem sou em Cristo?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-04-journal-prompt-13",
        "studyId": "track-04-study-04",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que rótulo antigo preciso deixar de usar como definição final de mim mesmo diante daquilo que",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus diz em Cristo?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-04-prayer-14",
        "studyId": "track-04-study-04",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pai, obrigado porque em Cristo me chamaste para perto. Livra-me de construir meu valor apenas",
            "type": "PARAGRAPH"
          },
          {
            "text": "sobre desempenho, aparência, aprovação ou passado. Dá-me humildade para reconhecer meus",
            "type": "PARAGRAPH"
          },
          {
            "text": "erros e coragem para não viver condenado por eles. Ensina-me a caminhar como filho, em",
            "type": "PARAGRAPH"
          },
          {
            "text": "comunhão com teu povo, e a viver de maneira coerente com a graça que recebi. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-04-keep-15",
        "studyId": "track-04-study-04",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Romanos 8:1 - Nenhuma condenação para os que estão em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 5:17 - Em Cristo há nova criação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para os momentos em que comparação, culpa ou rejeição tentarem",
            "type": "PARAGRAPH"
          },
          {
            "text": "definir quem você é.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-04-group-mode-16",
        "studyId": "track-04-study-04",
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
            "text": "Que palavras Romanos 8 usa para descrever nossa relação com Deus?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como evitar transformar identidade em Cristo em simples autoestima religiosa?",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 04/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que rótulos nosso grupo precisa aprender a confrontar com a verdade do Evangelho?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-04-continue-journey-17",
        "studyId": "track-04-study-04",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Uma nova identidade não elimina lutas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem pertence a Cristo ainda enfrenta tentações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como lutar sem desespero e sem autoconfiança?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 05 - Como vencer a tentação: reconhecer, fugir e permanecer em Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como enfrentar a tentação de maneira bíblica e prática sem confundi-la com",
            "type": "PARAGRAPH"
          },
          {
            "text": "pecado nem subestimar seu poder?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-04-references-18",
        "studyId": "track-04-study-04",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Romanos 8:1-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 5:17-21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 1:3-14",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses 3:1-4",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 2:9-10",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gálatas 3:26-29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-05",
    "sections": [
      {
        "id": "track-04-study-05-golden-text-1",
        "studyId": "track-04-study-05",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Vigiai e orai, para que não entreis em tentação.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 26:41",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-05-practical-truth-2",
        "studyId": "track-04-study-05",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Vencer a tentação normalmente não acontece por coragem de última hora, mas por uma vida",
            "type": "PARAGRAPH"
          },
          {
            "text": "que aprende a vigiar, orar, fugir do que alimenta o pecado e buscar força em Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-05-bible-reading-3",
        "studyId": "track-04-study-05",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Mateus 4:1-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Tiago 1:12-16 | 1 Coríntios 10:12-13 | Hebreus 4:14-16 | 2 Timóteo 2:22 | Salmo",
            "type": "PARAGRAPH"
          },
          {
            "text": "119:9-11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-05-before-understanding-4",
        "studyId": "track-04-study-05",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Todo cristão enfrenta tentações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso pode assustar quem imagina que uma vida com Deus deveria eliminar qualquer desejo errado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas até Jesus foi tentado, embora não tenha pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 05/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa diferença é importante.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tentação é convite, pressão ou desejo que nos puxa para fora da vontade de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pecado acontece quando cedemos a esse caminho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso a luta não precisa começar com vergonha.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela precisa começar com vigilância.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não nos ensina a provar força ficando perto daquilo que nos derruba.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela ensina oração, verdade, fuga e dependência.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-05-read-5",
        "studyId": "track-04-study-05",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Mateus 4:1-11",
            "type": "SUBHEADING"
          },
          {
            "text": "Mateus 4 mostra Jesus sendo tentado no deserto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O inimigo tenta explorar fome, identidade e desejo de poder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não negocia com a tentação; responde debaixo da Palavra de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-05-observe-6",
        "studyId": "track-04-study-05",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Tentação não é prova de que Deus abandonou você",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus é tentado logo depois de seu batismo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A presença de tentação não significa automaticamente ausência de espiritualidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela faz parte da realidade de viver num mundo caído.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não transforme a luta em identidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ser tentado não é o mesmo que ter escolhido pecar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. O inimigo tenta distorcer coisas legítimas",
            "type": "SUBHEADING"
          },
          {
            "text": "Fome era real.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema não era sentir fome.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A tentação estava em usar caminhos fora da vontade do Pai.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muitas tentações começam com desejos legítimos conduzidos para meios errados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte não apenas “o que desejo?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte também “como estou tentando conseguir isso?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. Jesus responde com a Palavra em contexto",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus cita Deuteronômio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas o próprio tentador também cita Escritura.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso mostra que conhecer versículos soltos não basta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É possível usar a Bíblia de maneira distorcida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 05/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Palavra precisa ser conhecida com sentido",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não como frase mágica.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Jesus não precisa provar sua identidade pela tentação",
            "type": "SUBHEADING"
          },
          {
            "text": "“Se és Filho de Deus...” tenta empurrar Jesus para uma demonstração manipulada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas o Pai já havia declarado sua identidade no batismo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não precisa transformar obediência em espetáculo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muita tentação cresce da necessidade de provar algo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem sabe a quem pertence não precisa aceitar todo desafio.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-05-understand-7",
        "studyId": "track-04-study-05",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Tiago mostra que tentação também se conecta aos nossos desejos",
            "type": "SUBHEADING"
          },
          {
            "text": "Nem toda tentação deve ser explicada dizendo “o diabo me fez fazer”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago fala de desejos que nos atraem e seduzem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Precisamos conhecer o próprio coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Autoconhecimento espiritual importa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quais situações, emoções e desejos costumam abrir a porta para suas quedas?",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. 1 Coríntios promete caminho de escape, não ausência de pressão",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo não diz que a tentação nunca será forte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele diz que Deus é fiel e oferece condições para suportar e escapar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O caminho de escape pode ser muito prático: sair do ambiente, desligar o aparelho, ligar para alguém,",
            "type": "PARAGRAPH"
          },
          {
            "text": "confessar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não despreze saídas simples",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muitas vitórias começam com uma porta fechada na hora certa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-05-connect-8",
        "studyId": "track-04-study-05",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Hebreus nos chama a correr para Cristo, não para longe dele",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus foi tentado e pode compadecer-se de nossas fraquezas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso Hebreus manda aproximar-se do trono da graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Vergonha costuma dizer: “Esconda-se até melhorar”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho diz: “Procure ajuda agora”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Na tentação, aproxime-se",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não espere cair para lembrar que precisa de graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Fugir pode ser sinal de sabedoria, não covardia",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 05/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Timóteo 2:22 manda fugir de paixões e seguir justiça junto com outras pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não glorifica a pessoa que se coloca desnecessariamente em risco para provar força.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não precisa vencer toda luta permanecendo no mesmo lugar",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas tentações são enfrentadas com distância.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não confunda pensamentos involuntários com escolhas deliberadas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Um pensamento pode surgir sem ser convidado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que você já escolheu abraçá-lo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que fazemos depois importa: alimentar, fantasiar, agir ou redirecionar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não acrescente culpa desnecessária à luta",
            "type": "PARAGRAPH"
          },
          {
            "text": "Reconheça o pensamento e escolha a direção seguinte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não espiritualize tudo e ignore padrões práticos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Falta de sono, isolamento, acesso irrestrito, uso de álcool, ambientes específicos e conflitos não resolvidos",
            "type": "PARAGRAPH"
          },
          {
            "text": "podem aumentar vulnerabilidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Orar é essencial, mas sabedoria também envolve organizar a vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Espiritualidade bíblica é concreta",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela alcança rotina, corpo, ambientes e relacionamentos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus poderia realmente ser tentado e ainda assim não pecar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus afirma que Jesus foi tentado em tudo à nossa semelhança, mas sem pecado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que sua compaixão por nossa luta não é distante.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele conhece a pressão da tentação sem ter cedido a ela.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso podemos procurar nele não apenas exemplo, mas socorro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A tentação de Jesus nos consola",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nosso Salvador conhece a luta e permanece sem pecado.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-05-apply-9",
        "studyId": "track-04-study-05",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Identifique seu padrão antes da próxima queda",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunte: quando costumo ficar mais vulnerável?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois de rejeição? Cansaço? Solidão? Euforia? Dinheiro disponível? Uso noturno do celular?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nomear o padrão permite preparar uma resposta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 05/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Vigilância acontece antes",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não apenas depois do arrependimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Crie distância prática",
            "type": "SUBHEADING"
          },
          {
            "text": "Bloqueie acesso, mude rota, encerre conversas, saia de ambientes, ajuste horários.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não chame isso de falta de fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pode ser exatamente o caminho de escape.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sabedoria é mais útil que heroísmo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não precisa provar que consegue ficar perto sem cair.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Não lute sozinho contra tudo",
            "type": "SUBHEADING"
          },
          {
            "text": "Tiago fala de confissão e oração uns pelos outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Timóteo fala de seguir o bem com outros que invocam o Senhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isolamento é terreno fértil para ciclos escondidos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Procure alguém maduro e confiável",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ajuda não é derrota; pode ser parte da vitória.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Alimente desejos melhores",
            "type": "SUBHEADING"
          },
          {
            "text": "A vida cristã não é apenas dizer “não”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando enchemos mente e rotina com Palavra, serviço, bons relacionamentos e propósito, algumas tentações",
            "type": "PARAGRAPH"
          },
          {
            "text": "perdem espaço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não eliminamos a luta, mas mudamos o ambiente interior.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Vazio também precisa ser preenchido",
            "type": "PARAGRAPH"
          },
          {
            "text": "Substitua, não apenas remova.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-05-journey-takeaway-10",
        "studyId": "track-04-study-05",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Tentação faz parte da caminhada, mas não precisa governá-la.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus foi tentado e permaneceu fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia nos ensina a vigiar, reconhecer desejos, usar a Palavra com verdade, procurar a graça, fugir quando",
            "type": "PARAGRAPH"
          },
          {
            "text": "necessário e caminhar com outras pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Vencer não é demonstrar que somos fortes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É aprender a depender de Deus e agir com sabedoria antes que o pecado ganhe espaço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "A pergunta não é “sou forte o suficiente?”, mas “estou usando com humildade os caminhos que",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus colocou diante de mim?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 05/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não nos chama a brincar com a tentação, mas a enfrentá-la com vigilância, graça, verdade,",
            "type": "PARAGRAPH"
          },
          {
            "text": "fuga e comunhão.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-05-practice-today-11",
        "studyId": "track-04-study-05",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma tentação recorrente e faça um plano simples:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu gatilho costuma ser...",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu caminho de escape será...",
            "type": "PARAGRAPH"
          },
          {
            "text": "A pessoa que posso procurar é...",
            "type": "PARAGRAPH"
          },
          {
            "text": "O hábito que quero fortalecer é...",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-05-reflection-questions-12",
        "studyId": "track-04-study-05",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho confundido tentação com pecado e carregado culpa desnecessária?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Qual padrão costuma anteceder minhas quedas?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe uma saída prática que continuo recusando?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho usado a Bíblia como verdade em contexto ou como frase mágica?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Quem é uma pessoa confiável com quem posso caminhar?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-05-journal-prompt-13",
        "studyId": "track-04-study-05",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Qual tentação preciso deixar de enfrentar apenas com promessa de força e começar a enfrentar",
            "type": "PARAGRAPH"
          },
          {
            "text": "com um plano de sabedoria?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-05-prayer-14",
        "studyId": "track-04-study-05",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, obrigado porque conheces a realidade da tentação e permaneceste fiel. Dá-me",
            "type": "PARAGRAPH"
          },
          {
            "text": "vigilância para reconhecer meus pontos fracos, humildade para pedir ajuda e coragem para fugir",
            "type": "PARAGRAPH"
          },
          {
            "text": "quando preciso. Ensina-me tua Palavra de maneira verdadeira e não permita que a vergonha me",
            "type": "PARAGRAPH"
          },
          {
            "text": "afaste da tua graça. Forma em mim desejos melhores e uma vida que prefira tua vontade aos",
            "type": "PARAGRAPH"
          },
          {
            "text": "atalhos que prometem satisfação rápida. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-05-keep-15",
        "studyId": "track-04-study-05",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "1 Coríntios 10:13 - Deus é fiel e oferece caminho de escape.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 4:15-16 - Podemos nos aproximar de Cristo em busca de graça e socorro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para consultar antes, não apenas depois, de uma situação de tentação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 05/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-05-group-mode-16",
        "studyId": "track-04-study-05",
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
            "text": "O que mais chama atenção na forma como Jesus responde às tentações?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que fugir de uma situação pode ser sabedoria espiritual?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que práticas ajudam nosso grupo a criar ambientes de honestidade e apoio?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-05-continue-journey-17",
        "studyId": "track-04-study-05",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "A luta contra a tentação não é o único sinal de nova vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Espírito também começa a formar em nós um novo caráter.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 06 - O fruto do Espírito: quando o caráter de Cristo começa a aparecer em nós",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: O que é o fruto do Espírito e como ele cresce numa vida comum?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-05-references-18",
        "studyId": "track-04-study-05",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Mateus 4:1-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago 1:12-16",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 10:12-13",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 4:14-16",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Timóteo 2:22",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 119:9-11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-06",
    "sections": [
      {
        "id": "track-04-study-06-golden-text-1",
        "studyId": "track-04-study-06",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Mas o fruto do Espírito é amor, alegria, paz, longanimidade, benignidade, bondade, fé,",
            "type": "PARAGRAPH"
          },
          {
            "text": "mansidão, temperança.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gálatas 5:22-23",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-06-practical-truth-2",
        "studyId": "track-04-study-06",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Uma vida cheia do Espírito não é reconhecida apenas pelo que acontece num culto, mas",
            "type": "PARAGRAPH"
          },
          {
            "text": "também pelo caráter que aparece em casa, no trabalho, nos conflitos e nas escolhas escondidas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-06-bible-reading-3",
        "studyId": "track-04-study-06",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Gálatas 5:16-26",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: João 15:1-8 | Colossenses 3:12-15 | Efésios 5:8-10 | Romanos 8:5-14 | 1 Coríntios",
            "type": "PARAGRAPH"
          },
          {
            "text": "13:1-7",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-06-before-understanding-4",
        "studyId": "track-04-study-06",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Quando ouvimos falar do Espírito Santo, talvez pensemos primeiro em dons, experiências intensas ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "momentos de culto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia fala dessas coisas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Gálatas 5 nos leva para uma área igualmente importante: caráter.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 06/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo contrasta obras da carne com fruto do Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O foco não é apenas aquilo que fazemos em público.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É o tipo de pessoa que estamos nos tornando.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor, alegria, paz, paciência, bondade, fidelidade, mansidão e domínio próprio não são acessórios para",
            "type": "PARAGRAPH"
          },
          {
            "text": "cristãos mais avançados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "São marcas de uma vida sendo formada pelo Espírito.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-06-read-5",
        "studyId": "track-04-study-06",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Gálatas 5:16-26",
            "type": "SUBHEADING"
          },
          {
            "text": "Gálatas 5 acontece dentro de uma carta que defende a graça e a liberdade em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo mostra que liberdade cristã não significa viver governado por qualquer desejo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele chama os cristãos a andar pelo Espírito.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-06-observe-6",
        "studyId": "track-04-study-06",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Paulo fala de caminhar, não de um momento isolado",
            "type": "SUBHEADING"
          },
          {
            "text": "Andar pelo Espírito descreve uma maneira de viver.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso desloca nosso foco de experiências pontuais para direção contínua.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pessoa pode viver um momento emocionante e ainda precisar crescer muito no caráter.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Espírito trabalha no cotidiano",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não apenas nos momentos extraordinários.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. O fruto aparece em contraste com obras que destroem",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo cita imoralidade, ciúmes, brigas, inveja e outros comportamentos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois apresenta o fruto do Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso mostra que espiritualidade bíblica possui consequências relacionais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Caráter também é evidência",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não basta parecer espiritual enquanto ferimos pessoas continuamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. Paulo fala de “fruto”",
            "type": "SUBHEADING"
          },
          {
            "text": "A lista descreve um conjunto que pertence à vida produzida pelo Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é útil escolher amor e descartar domínio próprio, ou buscar alegria e ignorar paciência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Espírito deseja formar um caráter inteiro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é cardápio de virtudes opcionais",
            "type": "PARAGRAPH"
          },
          {
            "text": "É uma direção de crescimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Quem pertence a Cristo continua sendo chamado a escolhas concretas",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo fala de crucificar paixões e andar pelo Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 06/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "O fruto não cresce porque ficamos parados esperando sentir algo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existe dependência e também resposta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fruto é produzido pelo Espírito",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas cresce numa vida que aprende a permanecer e obedecer.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-06-understand-7",
        "studyId": "track-04-study-06",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Fruto do Espírito não é o mesmo que personalidade",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma pessoa calma por temperamento não é automaticamente mansa no sentido bíblico.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Alguém comunicativo não é automaticamente amoroso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O fruto aparece na forma como o caráter é submetido a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não precisa apagar sua personalidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas deseja transformá-la.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Fruto e dons não são a mesma coisa",
            "type": "SUBHEADING"
          },
          {
            "text": "Dons estão ligados a capacidades concedidas para servir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fruto está ligado ao caráter formado pelo Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pessoa pode demonstrar capacidade pública e ainda ser imatura no caráter.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Talento não substitui caráter",
            "type": "PARAGRAPH"
          },
          {
            "text": "Visibilidade espiritual nunca deve ser usada para esconder falta de amor, verdade ou domínio",
            "type": "PARAGRAPH"
          },
          {
            "text": "próprio.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-06-connect-8",
        "studyId": "track-04-study-06",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. João 15 mostra que fruto depende de permanência",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus usa a imagem da videira e dos ramos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ramo não produz vida desconectado da fonte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso nos lembra que formação cristã não é projeto de autoaperfeiçoamento independente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fruto nasce de comunhão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Permanecer em Cristo é central.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Fruto cresce em situações reais, não em laboratório",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paciência só é testada quando algo demora.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mansidão aparece quando somos contrariados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Domínio próprio ganha sentido diante de desejos fortes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor se torna concreto quando outra pessoa custa alguma coisa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 06/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "As dificuldades também revelam onde precisamos crescer",
            "type": "PARAGRAPH"
          },
          {
            "text": "Elas expõem áreas que o conforto costuma esconder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use o fruto como uma nova régua para condenar-se todos os dias",
            "type": "PARAGRAPH"
          },
          {
            "text": "O fruto amadurece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você pode perceber áreas de fraqueza e ainda estar em processo real de crescimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O objetivo não é olhar para a lista e concluir que Deus desistiu de você.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Use a lista como direção e oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não como instrumento de desespero.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Alegria e paz significam nunca ficar triste ou preocupado?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus chorou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo falou de tristeza e pressões.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A alegria cristã pode coexistir com lágrimas porque sua raiz está em Deus, não na ausência de dor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Da mesma forma, paz não significa viver sem qualquer conflito emocional; significa uma vida reconciliada e",
            "type": "PARAGRAPH"
          },
          {
            "text": "sustentada por Deus no meio da realidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O fruto não exige emoções artificiais",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus forma verdade, não teatro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-06-apply-9",
        "studyId": "track-04-study-06",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Observe onde seu caráter muda quando ninguém da igreja está perto",
            "type": "SUBHEADING"
          },
          {
            "text": "Como você fala em casa?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como reage no trânsito?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como trata quem não pode lhe oferecer nada?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esses lugares revelam muito sobre nosso crescimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Espiritualidade verdadeira atravessa a porta de casa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não termina no culto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Escolha um fruto para praticar conscientemente nesta semana",
            "type": "SUBHEADING"
          },
          {
            "text": "Não porque os outros não importam, mas porque foco ajuda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 06/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Talvez seja paciência com uma pessoa específica, domínio próprio com um hábito ou bondade em uma",
            "type": "PARAGRAPH"
          },
          {
            "text": "situação concreta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Transforme virtude em ação",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Quero ser paciente” precisa virar uma decisão real.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Permaneça em Cristo pelos meios simples",
            "type": "SUBHEADING"
          },
          {
            "text": "Leia a Palavra, ore, confesse, participe da comunidade e obedeça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fruto não cresce apenas por informação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele cresce numa relação cultivada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Constância cria profundidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não procure apenas momentos fortes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Dê mais importância ao caráter do que à imagem",
            "type": "SUBHEADING"
          },
          {
            "text": "É possível construir reputação espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Deus conhece o interior.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Peça que Ele forme em você algo mais profundo do que uma boa impressão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Melhor ser transformado do que apenas admirado",
            "type": "PARAGRAPH"
          },
          {
            "text": "O fruto vale mais que a aparência.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-06-journey-takeaway-10",
        "studyId": "track-04-study-06",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "O fruto do Espírito é uma das formas mais práticas de enxergar a nova vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não é apenas emoção religiosa nem talento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É caráter sendo formado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor, alegria, paz, paciência, bondade, fidelidade, mansidão e domínio próprio aparecem em relacionamentos,",
            "type": "PARAGRAPH"
          },
          {
            "text": "decisões e reações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esse fruto não nasce da força independente, mas de uma vida que permanece em Cristo e aprende a andar",
            "type": "PARAGRAPH"
          },
          {
            "text": "pelo Espírito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Espírito deseja formar em nós não apenas pessoas que falam de Jesus, mas pessoas cujo",
            "type": "PARAGRAPH"
          },
          {
            "text": "caráter começa a se parecer com o de Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ser cheio do Espírito envolve permitir que sua presença alcance nossa maneira de amar, reagir,",
            "type": "PARAGRAPH"
          },
          {
            "text": "falar, esperar e escolher.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-06-practice-today-11",
        "studyId": "track-04-study-06",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 06/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leia Gálatas 5:22-23 e escolha uma característica.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escreva:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Onde mais preciso crescer nisso?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que atitude concreta demonstraria esse fruto hoje?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore e pratique antes do fim do dia.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-06-reflection-questions-12",
        "studyId": "track-04-study-06",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho valorizado dons e experiências mais do que caráter?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Qual fruto aparece menos quando sou pressionado?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Como minha família descreveria meu crescimento?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho esperado mudança sem permanecer em Cristo?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que situação atual pode ser um lugar de amadurecimento?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-06-journal-prompt-13",
        "studyId": "track-04-study-06",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Qual aspecto do fruto do Espírito Deus está usando minhas circunstâncias atuais para formar",
            "type": "PARAGRAPH"
          },
          {
            "text": "em mim?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-06-prayer-14",
        "studyId": "track-04-study-06",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Espírito Santo, forma em mim o caráter de Cristo. Não quero apenas falar sobre vida espiritual;",
            "type": "PARAGRAPH"
          },
          {
            "text": "quero que tua presença alcance minhas reações, meus relacionamentos e minhas escolhas",
            "type": "PARAGRAPH"
          },
          {
            "text": "escondidas. Mostra onde falta amor, paciência, mansidão ou domínio próprio. Ensina-me a",
            "type": "PARAGRAPH"
          },
          {
            "text": "permanecer em Cristo e a responder com obediência. Que o fruto da tua obra seja visto não",
            "type": "PARAGRAPH"
          },
          {
            "text": "para minha glória, mas para que Jesus seja honrado em minha vida. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-06-keep-15",
        "studyId": "track-04-study-06",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Gálatas 5:22-23 - Leia lentamente cada aspecto do fruto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 15:5 - Lembre-se de que fruto depende de permanecer em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para revisar seu crescimento com esperança e sinceridade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-06-group-mode-16",
        "studyId": "track-04-study-06",
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
            "text": "Qual contraste Paulo estabelece em Gálatas 5 entre obras da carne e fruto do Espírito?",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 06/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que dons e fruto não são a mesma coisa?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que aspecto do fruto nosso grupo pode praticar de maneira concreta nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-06-continue-journey-17",
        "studyId": "track-04-study-06",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "O fruto do Espírito muda relacionamentos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma das áreas em que essa transformação se torna mais difícil e necessária é o perdão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 07 - Perdão: libertar o coração sem chamar o mal de bem",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: O que significa perdoar biblicamente e o que perdão não exige de uma pessoa",
            "type": "PARAGRAPH"
          },
          {
            "text": "ferida?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-06-references-18",
        "studyId": "track-04-study-06",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Gálatas 5:16-26",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 15:1-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses 3:12-15",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 5:8-10",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8:5-14",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 13:1-7",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-07",
    "sections": [
      {
        "id": "track-04-study-07-golden-text-1",
        "studyId": "track-04-study-07",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Antes, sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros,",
            "type": "PARAGRAPH"
          },
          {
            "text": "como também Deus vos perdoou em Cristo.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 4:32",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-07-practical-truth-2",
        "studyId": "track-04-study-07",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Perdoar não é dizer que o mal foi pequeno; é recusar transformar a ferida em combustível",
            "type": "PARAGRAPH"
          },
          {
            "text": "permanente para vingança, enquanto verdade, limites e justiça continuam tendo lugar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-07-bible-reading-3",
        "studyId": "track-04-study-07",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Mateus 18:21-35",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Efésios 4:31-32 | Colossenses 3:12-13 | Romanos 12:17-21 | Lucas 17:3-4 | Salmo",
            "type": "PARAGRAPH"
          },
          {
            "text": "55:12-23",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-07-before-understanding-4",
        "studyId": "track-04-study-07",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Poucas palavras cristãs são tão conhecidas e, ao mesmo tempo, tão mal utilizadas quanto perdão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas pessoas foram pressionadas a perdoar rapidamente sem poder falar sobre a dor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Outras ouviram que perdoar significa voltar a confiar imediatamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 07/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há quem pense que perdão elimina consequências, denúncia ou limites.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a Bíblia não nos chama a fingir que o mal não aconteceu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos chama a uma resposta que nasce da graça e rompe com a vingança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão é sério justamente porque a ferida é real.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-07-read-5",
        "studyId": "track-04-study-07",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Mateus 18:21-35",
            "type": "SUBHEADING"
          },
          {
            "text": "Em Mateus 18, Pedro pergunta quantas vezes deve perdoar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus responde com uma parábola sobre uma dívida enorme perdoada e uma dívida menor cobrada com",
            "type": "PARAGRAPH"
          },
          {
            "text": "dureza.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O foco é mostrar que quem foi alcançado pela misericórdia de Deus não pode transformar a falta do outro em",
            "type": "PARAGRAPH"
          },
          {
            "text": "licença para uma vida de crueldade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-07-observe-6",
        "studyId": "track-04-study-07",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Jesus parte da graça recebida",
            "type": "SUBHEADING"
          },
          {
            "text": "O servo da parábola recebe perdão de uma dívida que não teria condições de pagar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso coloca o perdão cristão dentro da memória da graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não perdoamos porque o outro sempre merece; aprendemos a perdoar porque nós mesmos vivemos da",
            "type": "PARAGRAPH"
          },
          {
            "text": "misericórdia de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ponto de partida é a graça",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem se lembra do que recebeu encontra um novo lugar para responder às faltas dos outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. A dívida menor continua sendo dívida",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus não diz que o segundo servo não devia nada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O erro existia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso é importante: perdão não precisa negar a realidade da ofensa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdoar não é chamar o mal de bem",
            "type": "PARAGRAPH"
          },
          {
            "text": "A verdade permanece verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. A falta de perdão pode transformar a vítima em prisioneira da própria dor",
            "type": "SUBHEADING"
          },
          {
            "text": "O servo perdoado sai e passa a agir com dureza extrema.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A parábola mostra como um coração dominado pela cobrança pode perder de vista a graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A ferida é real",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas não precisa governar para sempre o coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Jesus leva a sério a maneira como tratamos quem nos deve",
            "type": "SUBHEADING"
          },
          {
            "text": "O perdão não aparece como detalhe opcional da vida cristã.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele está ligado ao caráter de quem recebeu misericórdia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 07/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receber graça muda relações",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não apenas nosso destino individual.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-07-understand-7",
        "studyId": "track-04-study-07",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Perdoar não é esquecer",
            "type": "SUBHEADING"
          },
          {
            "text": "A Bíblia não manda produzir amnésia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Memórias podem permanecer e algumas feridas deixam marcas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão não exige fingir que nada aconteceu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lembrar não significa necessariamente não ter perdoado",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que fazemos com a memória é que importa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Perdão e reconciliação não são idênticos",
            "type": "SUBHEADING"
          },
          {
            "text": "Perdão pode começar no coração de uma pessoa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Reconciliação envolve relação restaurada, o que normalmente exige verdade, arrependimento, mudança e",
            "type": "PARAGRAPH"
          },
          {
            "text": "reconstrução de confiança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem toda relação pode voltar imediatamente ao que era.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Reconciliação precisa de segurança e verdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão não obriga acesso ilimitado.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-07-connect-8",
        "studyId": "track-04-study-07",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Romanos 12 separa vingança de justiça",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo manda não pagar mal com mal e deixar a vingança final com Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não elimina autoridades, limites ou processos de justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ponto é não permitir que o coração seja consumido pela necessidade pessoal de fazer o outro sofrer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Abrir mão da vingança não é abrir mão da verdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos buscar justiça sem alimentar ódio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Perdão pode ser um processo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há feridas cuja decisão de perdoar precisa ser reafirmada muitas vezes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa falsidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa que emoções e memórias podem demorar mais do que a decisão espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não confunda processo com fracasso",
            "type": "PARAGRAPH"
          },
          {
            "text": "Continue entregando a Deus aquilo que volta a doer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão não impede denúncia nem proteção",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 07/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se houve crime, abuso ou risco, buscar ajuda, proteção e justiça pode ser necessário.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nenhum líder deve usar “você precisa perdoar” para silenciar vítima ou proteger agressor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão não é cúmplice do mal",
            "type": "PARAGRAPH"
          },
          {
            "text": "A verdade e a proteção dos vulneráveis fazem parte da justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão não exige voltar para uma relação perigosa",
            "type": "PARAGRAPH"
          },
          {
            "text": "É possível desejar que uma pessoa se arrependa e ainda manter distância.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Limites podem ser uma forma responsável de cuidado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor não significa acesso sem limites",
            "type": "PARAGRAPH"
          },
          {
            "text": "Segurança importa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Preciso esperar a pessoa pedir perdão para começar a perdoar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Textos bíblicos falam tanto de perdoar quanto de arrependimento e reconciliação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mesmo quando o ofensor não reconhece o erro, o cristão pode começar a entregar a Deus a vingança e",
            "type": "PARAGRAPH"
          },
          {
            "text": "recusar alimentar ódio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas restauração completa da relação é outra questão e pode depender de arrependimento, verdade e",
            "type": "PARAGRAPH"
          },
          {
            "text": "mudança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essas duas coisas não devem ser confundidas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma distinção útil",
            "type": "PARAGRAPH"
          },
          {
            "text": "Posso começar a libertar meu coração sem fingir que a relação já foi restaurada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-07-apply-9",
        "studyId": "track-04-study-07",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Nomeie a ferida com verdade",
            "type": "SUBHEADING"
          },
          {
            "text": "Perdoar algo que nunca foi nomeado pode virar apenas repressão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Diga a Deus o que aconteceu e o que isso produziu em você.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade abre espaço para cura",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos minimizar a dor para parecer espirituais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Entregue a Deus a fantasia de vingança",
            "type": "SUBHEADING"
          },
          {
            "text": "Talvez você não possa controlar se o outro reconhecerá o erro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas pode decidir não alimentar todos os dias uma história em que sua paz depende de vê-lo sofrer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Justiça pertence a Deus de maneira final",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu coração não precisa carregar o tribunal do universo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 07/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Estabeleça limites quando necessário",
            "type": "SUBHEADING"
          },
          {
            "text": "Perdoar não significa continuar emprestando dinheiro a quem não presta contas, voltar a confiar informações",
            "type": "PARAGRAPH"
          },
          {
            "text": "íntimas em quem as usa contra você ou permanecer em violência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Limite não é necessariamente falta de perdão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pode ser sabedoria.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Lembre-se da graça sem usar a graça para diminuir sua dor",
            "type": "SUBHEADING"
          },
          {
            "text": "Você foi perdoado por Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso chama à misericórdia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a graça não manda fingir que a ofensa sofrida não importa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "As duas verdades cabem juntas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fui ferido de verdade e também fui alcançado por uma graça enorme.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-07-journey-takeaway-10",
        "studyId": "track-04-study-07",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Perdão bíblico não é amnésia, negação ou retorno automático a uma relação insegura.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele nasce da graça recebida em Cristo e recusa transformar vingança em projeto de vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A verdade permanece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Responsabilidade permanece.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Limites podem permanecer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas o coração aprende a entregar a Deus o direito de acerto final.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdoar é abrir mão da vingança sem abrir mão da verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "A graça nos ensina a tratar a ferida com sinceridade, buscar justiça quando necessário e não",
            "type": "PARAGRAPH"
          },
          {
            "text": "permitir que o mal do outro continue governando nosso coração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-07-practice-today-11",
        "studyId": "track-04-study-07",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma ferida que ainda ocupa muito espaço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escreva três frases:",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que aconteceu foi...",
            "type": "PARAGRAPH"
          },
          {
            "text": "O limite ou atitude de justiça que preciso manter é...",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que preciso entregar a Deus para não viver de vingança é...",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-07-reflection-questions-12",
        "studyId": "track-04-study-07",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 07/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Tenho confundido perdão com esquecimento?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe uma relação em que preciso de limites mais claros?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Minha busca por justiça está se transformando em desejo de vingança?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho minimizado uma dor porque alguém disse que cristão não pode falar sobre ela?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que parte da graça recebida em Cristo me ajuda a lidar com essa ferida?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-07-journal-prompt-13",
        "studyId": "track-04-study-07",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que ferida preciso colocar diante de Deus com verdade, limite e decisão de não viver governado",
            "type": "PARAGRAPH"
          },
          {
            "text": "pela vingança?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-07-prayer-14",
        "studyId": "track-04-study-07",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, tu conheces minhas feridas e não me pedes para fingir que nada aconteceu. Ajuda-me a",
            "type": "PARAGRAPH"
          },
          {
            "text": "perdoar sem negar a verdade. Livra-me da vingança, mas também dá-me sabedoria para manter",
            "type": "PARAGRAPH"
          },
          {
            "text": "limites, buscar proteção e agir com justiça quando necessário. Cura aquilo que ainda dói e",
            "type": "PARAGRAPH"
          },
          {
            "text": "lembra-me da graça que recebi em Cristo. Que o mal que fizeram contra mim não continue",
            "type": "PARAGRAPH"
          },
          {
            "text": "definindo quem estou me tornando. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-07-keep-15",
        "studyId": "track-04-study-07",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Efésios 4:32 - Perdoamos lembrando do perdão recebido em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 12:19-21 - Observe a diferença entre vencer o mal e devolver o mal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para revisitá-las quando a dor reacender e você precisar escolher",
            "type": "PARAGRAPH"
          },
          {
            "text": "novamente a graça sem abandonar a verdade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-07-group-mode-16",
        "studyId": "track-04-study-07",
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
            "text": "O que a parábola de Mateus 18 ensina sobre graça recebida e graça oferecida?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre perdão, reconciliação e restauração de confiança?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como podemos apoiar alguém ferido sem pressioná-lo a voltar para uma situação insegura?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-07-continue-journey-17",
        "studyId": "track-04-study-07",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Perdão nos leva a conversar com Deus sobre nossas feridas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 07/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas oração é muito mais do que pedir ajuda em momentos difíceis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 08 - Oração: falar com Deus sem transformar a fé em fórmula",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: O que Jesus ensina sobre oração e como construir uma vida de conversa",
            "type": "PARAGRAPH"
          },
          {
            "text": "verdadeira com Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-07-references-18",
        "studyId": "track-04-study-07",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Mateus 18:21-35",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 4:31-32",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses 3:12-13",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 12:17-21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 17:3-4",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 55:12-23",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-08",
    "sections": [
      {
        "id": "track-04-study-08-golden-text-1",
        "studyId": "track-04-study-08",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Vosso Pai sabe o que vos é necessário antes de vós lho pedirdes.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 6:8",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-08-practical-truth-2",
        "studyId": "track-04-study-08",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Orar não é informar Deus nem pressioná-lo a cumprir nossos planos; é aproximar-nos do Pai",
            "type": "PARAGRAPH"
          },
          {
            "text": "com verdade e aprender a desejar, pedir e confiar debaixo de sua vontade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-08-bible-reading-3",
        "studyId": "track-04-study-08",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Mateus 6:5-13",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Salmo 62:8 | Lucas 11:1-13 | Filipenses 4:6-7 | Romanos 8:26-27 | 1 João 5:14-15 |",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 4:14-16",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-08-before-understanding-4",
        "studyId": "track-04-study-08",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Algumas pessoas têm medo de orar porque não sabem usar palavras bonitas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Outras aprenderam a medir a oração pela duração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há quem pense que repetir uma frase específica garante um resultado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus desmonta esse tipo de ansiedade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 08/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele fala de um Pai que já sabe do que precisamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não torna a oração inútil.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Torna-a mais segura.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos impressionar Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos falar com Ele.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-08-read-5",
        "studyId": "track-04-study-08",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Mateus 6:5-13",
            "type": "SUBHEADING"
          },
          {
            "text": "No Sermão do Monte, Jesus contrasta oração verdadeira com oração feita para aparência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois oferece um modelo que conhecemos como Pai Nosso.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-08-observe-6",
        "studyId": "track-04-study-08",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Jesus rejeita oração como espetáculo",
            "type": "SUBHEADING"
          },
          {
            "text": "Ele fala de pessoas que oravam para serem vistas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema não é orar em público; Jesus e a Igreja oraram publicamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema é transformar oração em apresentação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não precisa de performance",
            "type": "PARAGRAPH"
          },
          {
            "text": "A oração pode ser simples e verdadeira.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Repetição vazia não substitui relacionamento",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus critica o uso de muitas palavras como tentativa de ser ouvido por quantidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa que nunca podemos repetir um pedido; o próprio Jesus repetiu sua oração no Getsêmani.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema é tratar palavras como técnica automática.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O valor não está na fórmula",
            "type": "PARAGRAPH"
          },
          {
            "text": "Está na relação com o Pai.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. O Pai Nosso começa em Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "Antes de pão, perdão e livramento, Jesus ensina: santificado seja teu nome; venha teu Reino; seja feita tua",
            "type": "PARAGRAPH"
          },
          {
            "text": "vontade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A oração reorganiza o centro da vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Orar não é apenas trazer Deus para meus planos",
            "type": "PARAGRAPH"
          },
          {
            "text": "É também permitir que meus planos sejam colocados diante dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Jesus inclui necessidades muito concretas",
            "type": "SUBHEADING"
          },
          {
            "text": "Pão, perdão e proteção aparecem na oração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Espiritualidade bíblica não despreza necessidades diárias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 08/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos pedir",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não exige que finjamos não precisar de nada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-08-understand-7",
        "studyId": "track-04-study-08",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Se Deus já sabe, por que pedir?",
            "type": "SUBHEADING"
          },
          {
            "text": "Porque oração não existe para atualizar Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela expressa dependência, relacionamento e confiança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filhos pedem mesmo quando pais amorosos conhecem suas necessidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pedir nos coloca no lugar certo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Recebedores diante do Pai.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. “Em nome de Jesus” não é palavra mágica",
            "type": "SUBHEADING"
          },
          {
            "text": "Orar em nome de Jesus significa aproximar-se de Deus por causa dele e de acordo com seu caráter e missão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é acrescentar uma frase ao fim e transformar qualquer desejo em obrigação divina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O nome de Jesus não é senha de controle",
            "type": "PARAGRAPH"
          },
          {
            "text": "É o fundamento da nossa aproximação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-08-connect-8",
        "studyId": "track-04-study-08",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. O Espírito nos ajuda quando não sabemos orar",
            "type": "SUBHEADING"
          },
          {
            "text": "Romanos 8 reconhece nossa fraqueza.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há momentos em que nem sabemos expressar o que sentimos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Espírito intercede segundo a vontade de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Silêncio diante de Deus também pode ser oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não precisa sempre encontrar palavras perfeitas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Oração e vontade de Deus caminham juntas",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 João fala de pedir segundo a vontade de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus no Getsêmani apresenta seu desejo e se entrega à vontade do Pai.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não torna oração indiferente; torna-a confiante sem ser controladora.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos pedir com coragem e entregar com humildade",
            "type": "PARAGRAPH"
          },
          {
            "text": "As duas coisas não são inimigas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não transforme resposta negativa ou demora em acusação automática de falta de fé",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo pediu que um sofrimento fosse removido e recebeu outra resposta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 08/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus pediu no Getsêmani e caminhou para a cruz.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não ensina que toda oração feita com fé recebe exatamente o resultado desejado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé não controla Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela confia nele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oração não substitui ação responsável",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos orar por emprego e enviar currículo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Orar por reconciliação e pedir perdão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Orar por proteção e sair de uma situação perigosa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Orar e agir podem caminhar juntos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dependência não é passividade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existe maneira certa de orar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus oferece um modelo, não uma prisão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Pai Nosso nos ensina prioridades: Deus, Reino, vontade, necessidades, perdão e livramento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos usar essas linhas como caminho para orações próprias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Os Salmos também mostram oração em alegria, medo, raiva, arrependimento e esperança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia nos dá linguagem para orar",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando faltar palavras, ore com as Escrituras.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-08-apply-9",
        "studyId": "track-04-study-08",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Troque desempenho por sinceridade",
            "type": "SUBHEADING"
          },
          {
            "text": "Se só ora quando consegue concentração perfeita, talvez ore pouco.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Comece com verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Senhor, estou cansado.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Estou com medo.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Não sei o que pedir.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não se assusta com sua honestidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "A oração é lugar de verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Inclua adoração antes de transformar oração em lista",
            "type": "SUBHEADING"
          },
          {
            "text": "Lembrar quem Deus é muda a maneira como apresentamos necessidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não elimina pedidos, mas amplia nossa visão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 08/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Comece alguns minutos dizendo quem Deus é",
            "type": "PARAGRAPH"
          },
          {
            "text": "Antes de dizer o que você quer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Use horários simples e constantes",
            "type": "SUBHEADING"
          },
          {
            "text": "Uma vida de oração raramente nasce apenas de vontade espontânea.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escolha momentos possíveis: ao acordar, no intervalo, antes de dormir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Constância vale mais que promessa impossível",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cinco minutos verdadeiros podem ser começo de uma vida profunda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Aprenda a terminar alguns pedidos com mãos abertas",
            "type": "SUBHEADING"
          },
          {
            "text": "Apresente seu desejo claramente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois diga: “Pai, eu quero isso, mas confio em tua sabedoria.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Entrega não é falta de fé",
            "type": "PARAGRAPH"
          },
          {
            "text": "É reconhecer que Deus continua sendo Pai quando responde de maneira diferente.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-08-journey-takeaway-10",
        "studyId": "track-04-study-08",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Oração é conversa com o Pai, não apresentação nem fórmula.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus nos ensina a começar em Deus, apresentar necessidades, buscar perdão e pedir proteção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos orar com confiança porque Cristo abriu o caminho e o Espírito nos ajuda em nossa fraqueza.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também aprendemos a pedir sem tentar controlar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Orar é trazer toda a vida diante de Deus e aprender a confiar nele com palavras, silêncio,",
            "type": "PARAGRAPH"
          },
          {
            "text": "pedidos e entrega.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma vida de oração cresce menos pela busca de frases perfeitas e mais pela constância de um",
            "type": "PARAGRAPH"
          },
          {
            "text": "coração sincero diante do Pai.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-08-practice-today-11",
        "studyId": "track-04-study-08",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Use hoje o Pai Nosso como roteiro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore uma frase sobre cada parte:",
            "type": "PARAGRAPH"
          },
          {
            "text": "teu nome",
            "type": "PARAGRAPH"
          },
          {
            "text": "teu Reino",
            "type": "PARAGRAPH"
          },
          {
            "text": "tua vontade",
            "type": "PARAGRAPH"
          },
          {
            "text": "meu pão",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 08/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "meu perdão",
            "type": "PARAGRAPH"
          },
          {
            "text": "meu livramento.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-08-reflection-questions-12",
        "studyId": "track-04-study-08",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho tratado oração como apresentação?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que pedido tenho medo de apresentar com sinceridade?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Consigo dizer “seja feita tua vontade” sem achar que isso é falta de fé?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Minha rotina possui algum espaço real para oração?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho unido oração e ação responsável?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-08-journal-prompt-13",
        "studyId": "track-04-study-08",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que área da minha vida preciso parar de apenas pensar e começar a colocar diante de Deus em",
            "type": "PARAGRAPH"
          },
          {
            "text": "oração sincera?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-08-prayer-14",
        "studyId": "track-04-study-08",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pai, obrigado porque já conheces minhas necessidades e ainda assim me convidas a falar",
            "type": "PARAGRAPH"
          },
          {
            "text": "contigo. Livra-me de transformar oração em desempenho ou fórmula. Ensina-me a desejar teu",
            "type": "PARAGRAPH"
          },
          {
            "text": "Reino, a apresentar minhas necessidades com confiança e a receber tua vontade com",
            "type": "PARAGRAPH"
          },
          {
            "text": "humildade. Quando eu não souber o que dizer, sustenta-me pelo teu Espírito. Forma em mim",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma vida de oração simples, constante e verdadeira. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-08-keep-15",
        "studyId": "track-04-study-08",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Mateus 6:9-13 - Use o Pai Nosso como mapa de oração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 4:6-7 - Apresente pedidos a Deus com oração e gratidão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para os dias em que você não souber como começar a orar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-08-group-mode-16",
        "studyId": "track-04-study-08",
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
            "text": "O que Jesus critica e o que valoriza em Mateus 6?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que oração não deve ser entendida como técnica para controlar Deus?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que hábito simples de oração nosso grupo pode praticar nesta semana?",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 08/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-08-continue-journey-17",
        "studyId": "track-04-study-08",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Oramos falando com Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas também precisamos aprender a ouvir aquilo que Ele já nos revelou em sua Palavra.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 09 - Leitura e meditação na Palavra: ouvir Deus com atenção",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como ler a Bíblia de modo que ela forme nossa fé sem transformá-la em livro",
            "type": "PARAGRAPH"
          },
          {
            "text": "de frases soltas?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-08-references-18",
        "studyId": "track-04-study-08",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Mateus 6:5-13",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 62:8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 11:1-13",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 4:6-7",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8:26-27",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 João 5:14-15",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 4:14-16",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-09",
    "sections": [
      {
        "id": "track-04-study-09-golden-text-1",
        "studyId": "track-04-study-09",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Lâmpada para os meus pés é tua palavra e luz para o meu caminho.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 119:105",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-09-practical-truth-2",
        "studyId": "track-04-study-09",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Ler a Bíblia não é procurar frases para confirmar tudo o que já pensamos; é permitir que a",
            "type": "PARAGRAPH"
          },
          {
            "text": "Palavra de Deus ilumine, corrija e forme nossa caminhada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-09-bible-reading-3",
        "studyId": "track-04-study-09",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Salmo 1:1-6",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Josué 1:7-9 | Salmo 119:9-16 | 2 Timóteo 3:14-17 | Atos 17:10-12 | Lucas 24:25-32",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-09-before-understanding-4",
        "studyId": "track-04-study-09",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Ter uma Bíblia perto não é o mesmo que conhecer a Bíblia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também é possível ler muitos versículos e continuar entendendo pouco do que eles realmente dizem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em tempos de mensagens rápidas, aprendemos a consumir frases isoladas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a Bíblia é uma biblioteca com histórias, cartas, poesia, profecia e sabedoria.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela pede atenção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 09/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meditar na Palavra não é correr atrás de uma frase misteriosa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É voltar ao texto, pensar, observar e permitir que a verdade desça da leitura para a vida.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-09-read-5",
        "studyId": "track-04-study-09",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Salmo 1:1-6",
            "type": "SUBHEADING"
          },
          {
            "text": "Salmo 1 descreve uma pessoa que encontra prazer na instrução do Senhor e medita nela de dia e de noite.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A imagem é de uma árvore plantada junto a águas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-09-observe-6",
        "studyId": "track-04-study-09",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Meditação bíblica envolve permanência",
            "type": "SUBHEADING"
          },
          {
            "text": "O salmista não fala de contato ocasional.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meditar significa voltar ao texto, pensar e deixar que ele ocupe a mente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Palavra precisa de tempo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas verdades são mais bem percebidas na segunda ou terceira leitura.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. A Palavra forma escolhas",
            "type": "SUBHEADING"
          },
          {
            "text": "O salmo contrasta caminhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meditação não é exercício intelectual separado da vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela influencia onde nos colocamos e que conselhos aceitamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não quer apenas informar",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela deseja formar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. A árvore depende de fonte",
            "type": "SUBHEADING"
          },
          {
            "text": "A imagem da árvore junto às águas comunica estabilidade e nutrição.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não significa vida sem seca ou dificuldade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa uma vida enraizada numa fonte que não depende apenas das circunstâncias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Raízes importam nos dias difíceis",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não construímos profundidade somente durante a crise.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Há caminhos com destinos diferentes",
            "type": "SUBHEADING"
          },
          {
            "text": "O Salmo 1 não apresenta toda escolha como equivalente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Palavra nos ajuda a discernir caminhos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia confronta relativismo pessoal",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem todo caminho que parece bom conduz ao mesmo lugar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-09-understand-7",
        "studyId": "track-04-study-09",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Contexto protege contra abuso do texto",
            "type": "SUBHEADING"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 09/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Um versículo pode ser verdadeiro e ainda ser mal usado quando arrancado de seu contexto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte: quem fala? Para quem? O que aconteceu antes e depois? Qual é o assunto?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leia a frase dentro da conversa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso evita transformar a Bíblia em coleção de slogans.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Diferentes partes da Bíblia pedem leitura adequada",
            "type": "SUBHEADING"
          },
          {
            "text": "Poesia usa imagens.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios apresentam sabedoria geral.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cartas respondem a situações reais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Narrativas descrevem acontecimentos que nem sempre são modelos a imitar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem toda frase funciona do mesmo jeito",
            "type": "PARAGRAPH"
          },
          {
            "text": "Respeitar o tipo de texto melhora nossa leitura.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-09-connect-8",
        "studyId": "track-04-study-09",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. 2 Timóteo mostra uma Palavra útil para formar",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo fala de ensino, repreensão, correção e instrução.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que uma boa leitura nem sempre apenas confirma.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes ela corrige algo que preferíamos manter.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se a Bíblia nunca contradiz você, talvez você esteja ouvindo apenas a si mesmo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Palavra viva também confronta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. A comunidade ajuda a ler melhor",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 17 elogia pessoas que examinavam as Escrituras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leitura pessoal é preciosa, mas não precisamos agir como se ninguém antes de nós tivesse estudado a Bíblia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Humildade busca ajuda",
            "type": "PARAGRAPH"
          },
          {
            "text": "Igreja, bons professores e recursos confiáveis podem ampliar nossa compreensão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use a Bíblia como sorteio de respostas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Abrir aleatoriamente e apontar para um versículo pode produzir interpretações perigosas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus pode nos alcançar de muitas maneiras, mas nosso método normal deve ser leitura cuidadosa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não é oráculo de frases soltas",
            "type": "PARAGRAPH"
          },
          {
            "text": "É Palavra para ser conhecida em contexto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meditação bíblica não é esvaziar a mente",
            "type": "PARAGRAPH"
          },
          {
            "text": "No sentido bíblico, meditar é preencher a mente com a Palavra, repetir, pensar e responder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 09/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é tentar alcançar um estado vazio como objetivo espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meditar é ruminar a verdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Até ela alcançar pensamento e prática.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Qual tradução da Bíblia devo usar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existem boas traduções com estilos diferentes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas priorizam linguagem mais próxima da estrutura original; outras buscam leitura mais natural.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Para estudo, comparar duas traduções confiáveis pode ajudar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mais importante do que possuir a tradução perfeita é ler com constância, contexto e disposição para",
            "type": "PARAGRAPH"
          },
          {
            "text": "aprender.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Use uma Bíblia que você compreenda",
            "type": "PARAGRAPH"
          },
          {
            "text": "E recorra a outras traduções quando uma frase precisar de comparação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-09-apply-9",
        "studyId": "track-04-study-09",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Leia menos quando isso ajudar a ler melhor",
            "type": "SUBHEADING"
          },
          {
            "text": "Um plano enorme que você abandona em três dias pode ser menos útil que um trecho menor lido com",
            "type": "PARAGRAPH"
          },
          {
            "text": "atenção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quantidade tem valor, mas não deve eliminar compreensão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Profundidade também conta",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leia para entender, não apenas para marcar como concluído.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Faça três perguntas simples",
            "type": "SUBHEADING"
          },
          {
            "items": [
              "O que o texto diz?"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "items": [
              "O que ele revela sobre Deus, o ser humano ou a fé?"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "items": [
              "Como devo responder?"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Observe antes de aplicar",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aplicação saudável nasce da compreensão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Registre descobertas, não apenas sentimentos",
            "type": "SUBHEADING"
          },
          {
            "text": "Anote uma frase do texto, uma conexão e uma aplicação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso ajuda a perceber crescimento ao longo do tempo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Diário pode se tornar memória espiritual",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não apenas depósito de emoções do dia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 09/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Volte aos textos conhecidos",
            "type": "SUBHEADING"
          },
          {
            "text": "Familiaridade pode fazer com que passemos rápido demais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leia novamente Salmo 23, João 3 ou Romanos 8 devagar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Textos conhecidos ainda possuem profundidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não confunda familiaridade com esgotamento.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-09-journey-takeaway-10",
        "studyId": "track-04-study-09",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "A Bíblia forma quem se aproxima dela com atenção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meditar é permanecer, pensar e responder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Contexto protege contra interpretações soltas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Diferentes tipos de texto precisam ser respeitados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E a Palavra não serve apenas para confirmar o que já queremos pensar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ler bem a Bíblia é aprender a ouvir antes de responder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Palavra se torna luz para a caminhada quando deixamos de usá-la apenas como coleção de",
            "type": "PARAGRAPH"
          },
          {
            "text": "frases e começamos a recebê-la como história, ensino e verdade que nos forma.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-09-practice-today-11",
        "studyId": "track-04-study-09",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha um trecho de 8 a 15 versículos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leia duas vezes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Anote apenas:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma observação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma verdade sobre Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma resposta prática.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-09-reflection-questions-12",
        "studyId": "track-04-study-09",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho lido a Bíblia mais rápido do que consigo compreender?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Costumo retirar versículos do contexto?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Permito que a Palavra corrija minhas ideias?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que horário realista posso reservar para leitura?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho usado o Diário para registrar crescimento bíblico?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 09/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-09-journal-prompt-13",
        "studyId": "track-04-study-09",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que verdade bíblica recente deixou de ser apenas informação e começou a mudar minha",
            "type": "PARAGRAPH"
          },
          {
            "text": "maneira de viver?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-09-prayer-14",
        "studyId": "track-04-study-09",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, dá-me fome pela tua Palavra e humildade para ouvi-la com atenção. Livra-me de usar",
            "type": "PARAGRAPH"
          },
          {
            "text": "versículos apenas para confirmar o que eu já quero. Ensina-me a observar o contexto,",
            "type": "PARAGRAPH"
          },
          {
            "text": "compreender a verdade e responder com obediência. Que tua Palavra ilumine meus passos,",
            "type": "PARAGRAPH"
          },
          {
            "text": "corrija meus caminhos e fortaleça minhas raízes nos dias bons e difíceis. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-09-keep-15",
        "studyId": "track-04-study-09",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Salmo 119:105 - A Palavra ilumina o caminho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Timóteo 3:16-17 - Observe as maneiras pelas quais as Escrituras nos formam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens como lembrete do propósito da leitura bíblica.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-09-group-mode-16",
        "studyId": "track-04-study-09",
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
            "text": "Que imagem Salmo 1 usa para descrever quem medita na Palavra?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que contexto é tão importante para interpretar um versículo?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que método simples de leitura nosso grupo pode experimentar nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-09-continue-journey-17",
        "studyId": "track-04-study-09",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "A Palavra forma nossa confiança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso se torna especialmente importante quando a mente está cheia de preocupações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 10 - Ansiedade e confiança: viver um dia de cada vez diante de Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como Jesus nos ensina a lidar com preocupações sem transformar ansiedade",
            "type": "PARAGRAPH"
          },
          {
            "text": "em motivo de culpa espiritual?",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 09/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-09-references-18",
        "studyId": "track-04-study-09",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Salmo 1:1-6",
            "type": "PARAGRAPH"
          },
          {
            "text": "Josué 1:7-9",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 119:9-16",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Timóteo 3:14-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 17:10-12",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 24:25-32",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-10",
    "sections": [
      {
        "id": "track-04-study-10-golden-text-1",
        "studyId": "track-04-study-10",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Não vos inquieteis, pois, pelo dia de amanhã.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 6:34",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-10-practical-truth-2",
        "studyId": "track-04-study-10",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Confiar em Deus não significa nunca sentir preocupação; significa aprender a não entregar ao",
            "type": "PARAGRAPH"
          },
          {
            "text": "amanhã o direito de consumir toda a força que Deus nos dá para viver hoje.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-10-bible-reading-3",
        "studyId": "track-04-study-10",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Mateus 6:25-34",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Filipenses 4:4-9 | 1 Pedro 5:6-7 | Salmo 42:5-11 | Salmo 55:22 | Lucas 12:22-32",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-10-before-understanding-4",
        "studyId": "track-04-study-10",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Preocupação faz parte da experiência humana.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Contas, saúde, família, trabalho e futuro podem ocupar a mente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas pessoas ainda carregam uma segunda dor: sentem culpa por estarem ansiosas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como se toda preocupação provasse ausência de fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 10/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não trata seus ouvintes com desprezo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele os chama a olhar para o Pai, para os pássaros, para as flores e para o dia que está diante deles.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Seu ensino não nega problemas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele muda o lugar de onde os enfrentamos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-10-read-5",
        "studyId": "track-04-study-10",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Mateus 6:25-34",
            "type": "SUBHEADING"
          },
          {
            "text": "Mateus 6 está dentro do Sermão do Monte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus acabou de falar sobre tesouros e sobre servir a Deus em vez de servir ao dinheiro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Então fala sobre preocupação com comida, bebida e roupa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-10-observe-6",
        "studyId": "track-04-study-10",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Jesus fala de necessidades reais",
            "type": "SUBHEADING"
          },
          {
            "text": "Comida, bebida e roupa não são luxos imaginários.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso mostra que a confiança bíblica não nasce de negar necessidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus conhece a vida concreta",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele fala com pessoas que realmente precisavam de sustento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Jesus direciona os olhos para o cuidado do Pai",
            "type": "SUBHEADING"
          },
          {
            "text": "Os pássaros e os lírios se tornam sinais de uma criação sustentada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não diz que pássaros nunca procuram alimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ponto é que a vida não depende apenas do nosso controle.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você tem valor diante do Pai",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sua preocupação não é invisível para Ele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. Preocupação não consegue acrescentar controle real",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus pergunta o que a ansiedade consegue produzir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Preocupar-se pode consumir energia sem mudar o resultado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pensar não é o mesmo que controlar",
            "type": "PARAGRAPH"
          },
          {
            "text": "Planejamento e preocupação são coisas diferentes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Jesus nos devolve ao dia de hoje",
            "type": "SUBHEADING"
          },
          {
            "text": "Cada dia possui seus próprios desafios.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando tentamos viver todos os problemas de amanhã hoje, carregamos pesos que ainda nem chegaram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus dá graça para o dia presente",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos sofrer antecipadamente por todos os futuros possíveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 10/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-10-understand-7",
        "studyId": "track-04-study-10",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. “Não andeis ansiosos” não deve ser usado como acusação cruel",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus está ensinando confiança, não fornecendo uma frase para humilhar quem está em sofrimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pessoas podem enfrentar níveis intensos de ansiedade e precisar de apoio, acompanhamento e cuidado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé e busca de ajuda não são inimigas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Orar, conversar e procurar cuidado responsável podem caminhar juntos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Confiança não elimina planejamento",
            "type": "SUBHEADING"
          },
          {
            "text": "A Bíblia valoriza prudência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não manda abandonar trabalho, orçamento ou responsabilidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema é quando o futuro se torna senhor do coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Planeje sem adorar o plano",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça o que pode e entregue o que não controla.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-10-connect-8",
        "studyId": "track-04-study-10",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Filipenses une oração, gratidão e direção da mente",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo ensina a apresentar pedidos a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois fala sobre aquilo que é verdadeiro, justo e digno ocupar a mente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ansiedade também pode ser alimentada por ciclos mentais repetidos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem todo pensamento precisa virar moradia",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos aprender a redirecionar a atenção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Buscar primeiro o Reino reorganiza prioridades",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não promete que quem busca o Reino nunca terá dificuldades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele ensina que nossa vida não pode ser governada apenas pela busca de segurança material.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Reino coloca o futuro no lugar certo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus é maior que aquilo que tentamos garantir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não diga a alguém em sofrimento: “Se tivesse fé, não estaria assim”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa frase simplifica uma realidade que pode envolver história, corpo, circunstâncias e sofrimento intenso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos chamar à confiança sem transformar a pessoa em culpada por sentir o que sente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A verdade deve ser oferecida com cuidado",
            "type": "PARAGRAPH"
          },
          {
            "text": "Consolo não precisa vir acompanhado de acusação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 10/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Posso buscar ajuda profissional e continuar confiando em Deus?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sim.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não ensina que todo cuidado precisa ser apenas espiritual no sentido estreito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Buscar orientação responsável, apoio de pessoas maduras e atendimento qualificado quando necessário não",
            "type": "PARAGRAPH"
          },
          {
            "text": "significa abandonar a fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos orar e também utilizar recursos de cuidado disponíveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus pode cuidar por muitos meios",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receber ajuda não precisa ser motivo de vergonha.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-10-apply-9",
        "studyId": "track-04-study-10",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Separe problema real de cenário imaginado",
            "type": "SUBHEADING"
          },
          {
            "text": "Pergunte: o que está acontecendo de fato hoje?",
            "type": "PARAGRAPH"
          },
          {
            "text": "E o que estou sofrendo apenas porque imagino que talvez aconteça?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dê nome aos dois",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso ajuda a devolver cada peso ao seu lugar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Transforme preocupação em oração específica",
            "type": "SUBHEADING"
          },
          {
            "text": "Em vez de repetir mentalmente “vai dar tudo errado”, formule um pedido concreto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Pai, preciso de sabedoria para esta conversa.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Preciso de provisão para esta conta.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oração dá endereço à preocupação",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em vez de deixá-la circular sem fim.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Faça a próxima coisa fiel",
            "type": "SUBHEADING"
          },
          {
            "text": "Talvez você não resolva o mês inteiro hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas pode pagar uma conta, fazer uma ligação, marcar uma consulta, enviar um currículo, descansar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fidelidade cabe no próximo passo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos resolver toda a vida em uma tarde.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Limite aquilo que alimenta medo sem necessidade",
            "type": "SUBHEADING"
          },
          {
            "text": "Notícias constantes, redes sociais, conversas alarmistas e pesquisa sem fim podem aumentar a sensação de",
            "type": "PARAGRAPH"
          },
          {
            "text": "perigo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Informação tem valor, mas consumo sem limite pode adoecer a atenção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 10/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Proteja sua mente com sabedoria",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem tudo precisa entrar o tempo todo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-10-journey-takeaway-10",
        "studyId": "track-04-study-10",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus não nega as preocupações da vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele nos chama a viver diante de um Pai que conhece nossas necessidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Confiança não significa ausência total de ansiedade, nem irresponsabilidade com o futuro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa fazer o que é possível hoje, entregar a Deus o que não controlamos e recusar sofrer",
            "type": "PARAGRAPH"
          },
          {
            "text": "antecipadamente todos os cenários de amanhã.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "O amanhã não precisa consumir a graça que Deus está dando para hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Confiar é aprender a trazer preocupações para Deus, agir com responsabilidade no presente e",
            "type": "PARAGRAPH"
          },
          {
            "text": "deixar o futuro nas mãos de quem continua sendo Pai.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-10-practice-today-11",
        "studyId": "track-04-study-10",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escreva duas colunas:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hoje eu posso agir em...",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hoje eu preciso entregar a Deus...",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escolha uma ação da primeira coluna e transforme a segunda em oração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-10-reflection-questions-12",
        "studyId": "track-04-study-10",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Que preocupação futura está consumindo força do presente?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho confundido planejamento com tentativa de controle total?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe alguma fonte de informação que alimenta meu medo sem ajudar?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Consigo pedir ajuda quando preciso?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Qual é o próximo passo fiel que posso dar hoje?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-10-journal-prompt-13",
        "studyId": "track-04-study-10",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Qual preocupação preciso tirar do ciclo mental e transformar em oração, ação possível e entrega",
            "type": "PARAGRAPH"
          },
          {
            "text": "a Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-10-prayer-14",
        "studyId": "track-04-study-10",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 10/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pai, tu conheces minhas necessidades antes mesmo de eu falar. Perdoa-me quando tento",
            "type": "PARAGRAPH"
          },
          {
            "text": "carregar sozinho todos os futuros possíveis. Dá-me sabedoria para planejar, coragem para agir e",
            "type": "PARAGRAPH"
          },
          {
            "text": "humildade para reconhecer o que não controlo. Quando meu coração estiver inquieto,",
            "type": "PARAGRAPH"
          },
          {
            "text": "lembra-me do teu cuidado. Ajuda-me a viver o dia de hoje com fidelidade e a buscar ajuda",
            "type": "PARAGRAPH"
          },
          {
            "text": "quando precisar. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-10-keep-15",
        "studyId": "track-04-study-10",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Mateus 6:34 - Cada dia possui seus próprios desafios.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 5:7 - Lance sobre Deus suas preocupações porque Ele cuida de você.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para os momentos em que sua mente tentar viver muitos amanhãs de",
            "type": "PARAGRAPH"
          },
          {
            "text": "uma vez.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-10-group-mode-16",
        "studyId": "track-04-study-10",
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
            "text": "Que argumentos Jesus usa em Mateus 6 para ensinar confiança?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre planejamento responsável e ansiedade controladora?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que prática pode ajudar nosso grupo a viver um dia de cada vez?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-10-continue-journey-17",
        "studyId": "track-04-study-10",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Nem toda dor nasce da preocupação com algo futuro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas dores já chegaram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como caminhar com Deus no sofrimento real?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 11 - Sofrimento: fé quando a vida dói",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: O que a Bíblia nos ensina a fazer quando a dor não possui uma explicação",
            "type": "PARAGRAPH"
          },
          {
            "text": "simples?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-10-references-18",
        "studyId": "track-04-study-10",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Mateus 6:25-34",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 4:4-9",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 10/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 5:6-7",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 42:5-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 55:22",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 12:22-32",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-11",
    "sections": [
      {
        "id": "track-04-study-11-golden-text-1",
        "studyId": "track-04-study-11",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Perto está o Senhor dos que têm o coração quebrantado.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 34:18",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-11-practical-truth-2",
        "studyId": "track-04-study-11",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "A presença de sofrimento não significa automaticamente ausência de Deus; a fé cristã nos dá",
            "type": "PARAGRAPH"
          },
          {
            "text": "linguagem para chorar, companhia para caminhar e esperança para olhar além da dor.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-11-bible-reading-3",
        "studyId": "track-04-study-11",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Salmo 13:1-6",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: João 11:17-36 | Romanos 8:18-39 | 2 Coríntios 4:7-18 | 1 Pedro 5:8-10 | Apocalipse",
            "type": "PARAGRAPH"
          },
          {
            "text": "21:1-5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-11-before-understanding-4",
        "studyId": "track-04-study-11",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Existem sofrimentos para os quais uma explicação rápida parece ofensiva.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma perda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma doença.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma injustiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma oração que não terminou como esperávamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 11/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes cristãos tentam preencher o silêncio dizendo: “Tudo aconteceu por este motivo”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas a Bíblia nem sempre nos dá a razão específica.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos dá algo diferente: espaço para lamentar, presença de Deus, comunidade, cruz, ressurreição e",
            "type": "PARAGRAPH"
          },
          {
            "text": "esperança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé não é fingir que não dói.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-11-read-5",
        "studyId": "track-04-study-11",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Salmo 13:1-6",
            "type": "SUBHEADING"
          },
          {
            "text": "O Salmo 13 começa com perguntas duras: “Até quando?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Davi fala de sensação de abandono e tristeza diária.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mesmo assim, o salmo termina em confiança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-11-observe-6",
        "studyId": "track-04-study-11",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. A Bíblia permite perguntas honestas",
            "type": "SUBHEADING"
          },
          {
            "text": "Davi não esconde sua sensação de distância.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele fala diretamente com Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso mostra que lamentar não é o oposto da fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lamento ainda é oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você pode levar a Deus até a sensação de que Ele está longe.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. O salmista pede mudança",
            "type": "SUBHEADING"
          },
          {
            "text": "Ele não apenas aceita passivamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pede que Deus olhe, responda e intervenha.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança pode pedir",
            "type": "PARAGRAPH"
          },
          {
            "text": "Entrega não significa ausência de desejo por alívio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. A confiança não apaga a dor anterior",
            "type": "SUBHEADING"
          },
          {
            "text": "O final do salmo não significa que os primeiros versos eram falsos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fé passa pela dor em vez de apagá-la.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Alegria e tristeza podem existir na mesma caminhada",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não exige emoções artificiais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. O salmo se lembra do caráter de Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "Davi fala do amor leal de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando as circunstâncias não mudam imediatamente, a memória de quem Deus é se torna âncora.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 11/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem sempre temos explicação",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas podemos ter um lugar para apoiar o coração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-11-understand-7",
        "studyId": "track-04-study-11",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Nem todo sofrimento é punição direta por um pecado específico",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus rejeita explicações simplistas em algumas situações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jó também mostra como amigos podem errar ao tentar explicar toda dor como culpa escondida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cuidado com julgamentos rápidos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sofrimento não autoriza suspeitar da espiritualidade de alguém.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Deus não se alegra com nossa dor",
            "type": "SUBHEADING"
          },
          {
            "text": "João 11 mostra Jesus chorando diante do túmulo de Lázaro, mesmo sabendo que o ressuscitaria.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso revela que a esperança futura não torna o luto presente irrelevante.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não ridiculariza lágrimas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele entra na cena da dor.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-11-connect-8",
        "studyId": "track-04-study-11",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. A cruz impede uma visão distante de Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "O cristianismo não apresenta um Deus que observa sofrimento apenas de longe.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em Cristo, Deus entra em nossa humanidade e atravessa rejeição, dor e morte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A cruz não explica toda dor",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas mostra que Deus não é estranho ao sofrimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. A ressurreição impede que a dor tenha a palavra final",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8 e Apocalipse 21 apontam para um futuro em que sofrimento, corrupção e morte não continuarão",
            "type": "PARAGRAPH"
          },
          {
            "text": "para sempre.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança cristã não é apenas suportar melhor; é esperar restauração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A dor é real, mas não eterna",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa é uma diferença decisiva.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Evite frases prontas que fecham a conversa",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Tudo acontece por uma razão.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Deus precisava de mais um anjo.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Se você tivesse mais fé...”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essas frases podem acrescentar peso e nem sempre possuem base bíblica adequada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 11/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes presença é mais fiel que explicação",
            "type": "PARAGRAPH"
          },
          {
            "text": "Chore com quem chora.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Buscar ajuda não é falta de fé",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sofrimento intenso pode exigir apoio pastoral, familiar, médico, psicológico, jurídico ou social, conforme a",
            "type": "PARAGRAPH"
          },
          {
            "text": "situação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia valoriza cuidado mútuo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não carregue tudo sozinho",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus também cuida por meio de pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8:28 significa que tudo o que acontece é bom?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo fala no mesmo contexto de sofrimento, fraqueza e morte.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O texto afirma que Deus age em todas as coisas para o bem daqueles que o amam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso é diferente de chamar toda tragédia de boa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O bem maior aparece ligado ao propósito de Deus de formar seu povo e levá-lo à glória.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma distinção essencial",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus pode agir para o bem em meio ao mal sem chamar o mal de bem.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-11-apply-9",
        "studyId": "track-04-study-11",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Dê nome à dor",
            "type": "SUBHEADING"
          },
          {
            "text": "Fé não exige frases genéricas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Diga: “Perdi isso”, “estou com medo”, “isso foi injusto”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nomear não aumenta a dor",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pode torná-la mais honesta diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Permita-se lamentar sem fazer da dor sua única identidade",
            "type": "SUBHEADING"
          },
          {
            "text": "O luto precisa de espaço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas você continua sendo mais do que aquilo que sofreu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A dor faz parte da história",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisa ser o título de toda a vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Aceite companhia",
            "type": "SUBHEADING"
          },
          {
            "text": "Não espere que toda ajuda venha de uma frase perfeita.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 11/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes alguém pode apenas sentar, ouvir, levar uma refeição ou caminhar ao lado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receber cuidado também exige humildade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não precisa demonstrar força o tempo todo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Segure a esperança sem usar esperança para apressar o luto",
            "type": "SUBHEADING"
          },
          {
            "text": "Apocalipse 21 promete fim da morte e da dor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Essa promessa pode sustentar lágrimas sem exigir que elas acabem hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança não manda parar de chorar",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela diz que um dia haverá um último choro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-11-journey-takeaway-10",
        "studyId": "track-04-study-11",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "A Bíblia não oferece uma explicação simples para cada sofrimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela oferece linguagem para lamentar, liberdade para perguntar, presença de Cristo e esperança de",
            "type": "PARAGRAPH"
          },
          {
            "text": "ressurreição.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem toda dor é punição direta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem toda lágrima precisa ser escondida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos pedir alívio, procurar ajuda e continuar confiando mesmo quando respostas completas não chegam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé no sofrimento não é entender tudo; muitas vezes é permanecer perto de Deus quando ainda",
            "type": "PARAGRAPH"
          },
          {
            "text": "há coisas que não conseguimos entender.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "A dor não precisa ser negada nem divinizada: podemos atravessá-la com verdade, companhia e",
            "type": "PARAGRAPH"
          },
          {
            "text": "esperança em Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-11-practice-today-11",
        "studyId": "track-04-study-11",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escreva um pequeno salmo pessoal com quatro linhas:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, o que dói é...",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que eu não entendo é...",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que eu te peço é...",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que escolho lembrar sobre ti é...",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-11-reflection-questions-12",
        "studyId": "track-04-study-11",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho sentido culpa por lamentar?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Alguém tentou explicar minha dor de maneira simplista?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 11/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Que ajuda concreta preciso aceitar?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Consigo distinguir esperança de pressa para parar de sofrer?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que verdade sobre Cristo me sustenta nesta fase?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-11-journal-prompt-13",
        "studyId": "track-04-study-11",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que dor preciso parar de esconder de Deus e transformar em oração honesta?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-11-prayer-14",
        "studyId": "track-04-study-11",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, tu conheces aquilo que dói e não preciso fingir diante de ti. Recebe minhas perguntas,",
            "type": "PARAGRAPH"
          },
          {
            "text": "minhas lágrimas e meu cansaço. Guarda-me de explicações fáceis e de culpar a mim mesmo por",
            "type": "PARAGRAPH"
          },
          {
            "text": "tudo. Dá-me pessoas para caminhar comigo e humildade para receber ajuda. Quando eu não",
            "type": "PARAGRAPH"
          },
          {
            "text": "enxergar saída, lembra-me da cruz, da ressurreição e da promessa de que a dor não terá a última",
            "type": "PARAGRAPH"
          },
          {
            "text": "palavra. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-11-keep-15",
        "studyId": "track-04-study-11",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Salmo 34:18 - Deus está perto do coração quebrantado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8:38-39 - Nada pode separar-nos do amor de Deus em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para os dias em que sentir Deus distante.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-11-group-mode-16",
        "studyId": "track-04-study-11",
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
            "text": "O que o Salmo 13 nos ensina sobre falar com Deus durante a dor?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que explicações rápidas podem ferir quem sofre?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como nosso grupo pode oferecer presença e cuidado de maneira concreta?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-11-continue-journey-17",
        "studyId": "track-04-study-11",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Nem toda fase difícil pode ser mudada rapidamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nesses períodos, a Bíblia nos ensina algo que não depende de possuir tudo o que queremos: contentamento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 11/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 12 - Contentamento: aprender a viver sem depender de ter sempre mais",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: O que Paulo realmente quis dizer com “tudo posso” e como aprender",
            "type": "PARAGRAPH"
          },
          {
            "text": "contentamento em diferentes circunstâncias?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-11-references-18",
        "studyId": "track-04-study-11",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Salmo 13:1-6",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 11:17-36",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 8:18-39",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 4:7-18",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 5:8-10",
            "type": "PARAGRAPH"
          },
          {
            "text": "Apocalipse 21:1-5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-12",
    "sections": [
      {
        "id": "track-04-study-12-golden-text-1",
        "studyId": "track-04-study-12",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Já aprendi a contentar-me com o que tenho.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 4:11",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-12-practical-truth-2",
        "studyId": "track-04-study-12",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Contentamento não nasce de possuir tudo o que desejamos, mas de aprender que Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "continua suficiente enquanto lidamos com abundância, falta, trabalho e espera.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-12-bible-reading-3",
        "studyId": "track-04-study-12",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Filipenses 4:10-20",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: 1 Timóteo 6:6-10,17-19 | Hebreus 13:5-6 | Salmo 23:1-6 | Mateus 6:19-24 | Lucas",
            "type": "PARAGRAPH"
          },
          {
            "text": "12:13-21",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-12-before-understanding-4",
        "studyId": "track-04-study-12",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "“Tudo posso naquele que me fortalece” é um dos versículos mais conhecidos da Bíblia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também é um dos mais retirados do contexto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo não está dizendo que pode alcançar qualquer objetivo que imaginar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 12/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele está falando de aprender a viver em situações diferentes: fartura e fome, abundância e necessidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O segredo não é poder ilimitado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É força em Cristo para permanecer fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso é contentamento.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-12-read-5",
        "studyId": "track-04-study-12",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Filipenses 4:10-20",
            "type": "SUBHEADING"
          },
          {
            "text": "Filipenses 4 acontece dentro de uma carta escrita por Paulo em circunstâncias difíceis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele agradece a ajuda da igreja e, ao mesmo tempo, explica que aprendeu algo ao longo da caminhada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-12-observe-6",
        "studyId": "track-04-study-12",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Contentamento foi aprendido",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo não diz que nasceu naturalmente satisfeito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele aprendeu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que contentamento é formado em experiências reais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos crescer nisso",
            "type": "PARAGRAPH"
          },
          {
            "text": "Insatisfação não precisa ser destino permanente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Paulo conhece abundância e falta",
            "type": "SUBHEADING"
          },
          {
            "text": "Ele não romantiza pobreza nem demoniza toda abundância.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aprendeu a viver em ambas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema não é apenas quanto temos",
            "type": "PARAGRAPH"
          },
          {
            "text": "É quanto aquilo que temos governa nosso coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. “Tudo posso” significa permanecer em circunstâncias diversas",
            "type": "SUBHEADING"
          },
          {
            "text": "O contexto fala de fome e fartura.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo encontra força em Cristo para atravessar cenários diferentes sem abandonar a fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O versículo não promete sucesso ilimitado",
            "type": "PARAGRAPH"
          },
          {
            "text": "Promete força para fidelidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Contentamento não impede receber ajuda",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo agradece à igreja pela oferta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não usa contentamento como orgulho para recusar cuidado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ser contente não é dizer “não preciso de ninguém”",
            "type": "PARAGRAPH"
          },
          {
            "text": "A comunhão continua importante.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-12-understand-7",
        "studyId": "track-04-study-12",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Contentamento não é acomodação",
            "type": "SUBHEADING"
          },
          {
            "text": "Você pode estar contente em Deus e ainda procurar emprego melhor, estudar, tratar uma doença ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "melhorar condições de vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Contentamento não mata sonhos responsáveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A diferença está no senhor do coração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Posso buscar mudança sem acreditar que só terei valor quando ela chegar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Dinheiro promete uma segurança que não consegue entregar por completo",
            "type": "SUBHEADING"
          },
          {
            "text": "1 Timóteo 6 alerta sobre amor ao dinheiro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Recursos são úteis, mas não conseguem impedir morte, perda ou controlar o futuro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dinheiro é ferramenta ruim para ocupar o lugar de Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "Use-o; não o adore.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-12-connect-8",
        "studyId": "track-04-study-12",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Contentamento e generosidade se fortalecem",
            "type": "SUBHEADING"
          },
          {
            "text": "Quando preciso de sempre mais para sentir que tenho o suficiente, dar se torna ameaçador.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem aprende contentamento consegue abrir as mãos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Coração satisfeito compartilha melhor",
            "type": "PARAGRAPH"
          },
          {
            "text": "Porque não acredita que cada coisa perdida destrói sua segurança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Gratidão treina nossos olhos sem negar dificuldades",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gratidão não significa dizer que tudo está bom.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa reconhecer que, mesmo em dias difíceis, nem toda bondade desapareceu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gratidão é atenção",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos ajuda a perceber o que a insatisfação constante deixa invisível.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use contentamento para manter pessoas em injustiça",
            "type": "PARAGRAPH"
          },
          {
            "text": "Alguém mal pago pode buscar condições justas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma família em necessidade pode procurar ajuda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Contentamento nunca deve ser usado por quem possui poder para dizer ao vulnerável que aceite exploração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Contentamento não absolve injustiça",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem pode agir com justiça deve agir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Então é errado desejar coisas melhores?",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 12/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não necessariamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia contém pedidos, planos e trabalho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O problema é quando um desejo se transforma em condição para paz, identidade ou obediência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos dizer: “Eu gostaria disso” sem transformar em “não consigo viver fielmente sem isso”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Desejo e idolatria não são a mesma coisa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas desejos precisam ser colocados diante de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-12-apply-9",
        "studyId": "track-04-study-12",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Observe o que você chama de “necessidade”",
            "type": "SUBHEADING"
          },
          {
            "text": "Algumas necessidades são reais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Outras cresceram da comparação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Redes sociais podem transformar conforto alheio em sensação de fracasso pessoal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte",
            "type": "PARAGRAPH"
          },
          {
            "text": "Eu preciso disso ou preciso provar alguma coisa?",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Pratique gratidão específica",
            "type": "SUBHEADING"
          },
          {
            "text": "Evite apenas dizer “sou grato por tudo”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nomeie: uma pessoa, uma refeição, uma oportunidade, uma resposta, uma força recebida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Especificidade educa os olhos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gratidão concreta se torna mais real.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Aprenda a desfrutar sem culpa e a abrir mão sem desespero",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo sabia viver com muito e com pouco.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que abundância também exige maturidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receba com gratidão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Compartilhe sem apego.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Faça de Cristo seu centro, não seu recurso para conseguir coisas",
            "type": "SUBHEADING"
          },
          {
            "text": "Se Jesus é valioso apenas porque esperamos que nos dê prosperidade, talvez ainda estejamos usando Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "para alcançar outro deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo não é meio para chegar ao tesouro",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele é o tesouro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-12-journey-takeaway-10",
        "studyId": "track-04-study-12",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Contentamento é aprendizado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 12/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo conheceu abundância e falta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Tudo posso” fala da força de Cristo para permanecer fiel em ambas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é promessa de alcançar qualquer sonho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos buscar mudanças, trabalhar e planejar sem entregar nossa paz ao resultado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Contentamento é poder dizer: “Ainda há coisas que desejo, mas minha vida não está vazia",
            "type": "PARAGRAPH"
          },
          {
            "text": "enquanto elas não chegam.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo nos ensina a receber com gratidão, atravessar a falta com esperança e não permitir que",
            "type": "PARAGRAPH"
          },
          {
            "text": "possuir mais se torne condição para viver bem diante de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-12-practice-today-11",
        "studyId": "track-04-study-12",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escreva três coisas pelas quais é grato hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois escreva um desejo atual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore assim:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, eu desejo isso, mas não quero que isso seja meu senhor.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-12-reflection-questions-12",
        "studyId": "track-04-study-12",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Que comparação tem alimentado minha insatisfação?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho usado Filipenses 4:13 fora do contexto?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe algo que desejo tanto que minha paz depende disso?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Consigo receber ajuda sem orgulho?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Minha gratidão aparece também em generosidade?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-12-journal-prompt-13",
        "studyId": "track-04-study-12",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que desejo preciso recolocar no lugar certo para que ele não governe minha paz?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-12-prayer-14",
        "studyId": "track-04-study-12",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, ensina-me o contentamento que Paulo aprendeu. Guarda-me da comparação, do",
            "type": "PARAGRAPH"
          },
          {
            "text": "amor ao dinheiro e da ideia de que só serei feliz quando tiver mais. Dá-me força para atravessar",
            "type": "PARAGRAPH"
          },
          {
            "text": "falta sem desespero e abundância sem orgulho. Ensina-me a receber, agradecer, trabalhar e",
            "type": "PARAGRAPH"
          },
          {
            "text": "compartilhar, mantendo meu coração em ti. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-12-keep-15",
        "studyId": "track-04-study-12",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Filipenses 4:11-13 - Leia “tudo posso” dentro do contexto de contentamento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 12/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 13:5 - Observe a relação entre contentamento e presença de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para os momentos em que comparação e insatisfação começarem a",
            "type": "PARAGRAPH"
          },
          {
            "text": "comandar o coração.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-12-group-mode-16",
        "studyId": "track-04-study-12",
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
            "text": "O que o contexto de Filipenses 4 muda na interpretação de “tudo posso”?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como diferenciar contentamento de acomodação?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que prática de gratidão ou simplicidade nosso grupo pode adotar nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-12-continue-journey-17",
        "studyId": "track-04-study-12",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Contentamento ajuda a diminuir a pressão de controlar resultados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas ainda precisamos tomar decisões todos os dias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como buscar sabedoria sem transformar sinais e sentimentos em regras infalíveis?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 13 - Sabedoria nas decisões: escolher sem exigir um mapa completo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como tomar decisões com fé quando a Bíblia não dá uma resposta direta para",
            "type": "PARAGRAPH"
          },
          {
            "text": "cada escolha?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-12-references-18",
        "studyId": "track-04-study-12",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Filipenses 4:10-20",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Timóteo 6:6-10,17-19",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 13:5-6",
            "type": "PARAGRAPH"
          },
          {
            "text": "Salmo 23:1-6",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 6:19-24",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 12:13-21",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-13",
    "sections": [
      {
        "id": "track-04-study-13-golden-text-1",
        "studyId": "track-04-study-13",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Se algum de vós tem falta de sabedoria, peça-a a Deus.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago 1:5",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-13-practical-truth-2",
        "studyId": "track-04-study-13",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Buscar a vontade de Deus não é esperar uma sensação infalível para cada decisão, mas aprender",
            "type": "PARAGRAPH"
          },
          {
            "text": "a escolher com uma mente formada pela Palavra, oração, conselho e humildade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-13-bible-reading-3",
        "studyId": "track-04-study-13",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Tiago 1:5-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Provérbios 3:5-7 | Provérbios 11:14 | Romanos 12:1-2 | Colossenses 3:15-17 | Tiago",
            "type": "PARAGRAPH"
          },
          {
            "text": "4:13-17 | Atos 15:1-29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-13-before-understanding-4",
        "studyId": "track-04-study-13",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Qual curso fazer?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Com quem casar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mudo de emprego?",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 13/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Abro um negócio?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fico ou vou embora?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há decisões para as quais não existe um versículo dizendo nosso nome e a opção correta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nesses momentos, algumas pessoas ficam paralisadas esperando um sinal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Outras tratam qualquer sensação forte como se fosse voz infalível de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia oferece um caminho mais maduro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus nos dá princípios, sabedoria, comunidade e liberdade responsável para escolher debaixo de sua vontade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-13-read-5",
        "studyId": "track-04-study-13",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Tiago 1:5-8",
            "type": "SUBHEADING"
          },
          {
            "text": "Tiago escreve a cristãos enfrentando provações e diz que, se falta sabedoria, devemos pedir a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso mostra que sabedoria é necessária justamente quando não enxergamos o caminho inteiro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-13-observe-6",
        "studyId": "track-04-study-13",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Podemos pedir sabedoria",
            "type": "SUBHEADING"
          },
          {
            "text": "Deus não zomba de quem reconhece que não sabe.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago apresenta um Deus generoso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso nos convida a transformar decisões em oração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Reconhecer limites é sabedoria",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos fingir certeza para parecer espirituais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Sabedoria é mais do que receber informação",
            "type": "SUBHEADING"
          },
          {
            "text": "Na Bíblia, sabedoria envolve aprender a viver bem diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela considera caráter, consequências, prioridades e o bem do próximo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A melhor decisão nem sempre é a mais fácil ou lucrativa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte o que é fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. A Palavra renova nossa maneira de pensar",
            "type": "SUBHEADING"
          },
          {
            "text": "Romanos 12 liga discernimento à renovação da mente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quanto mais nossa mente é formada pelo Evangelho, melhor conseguimos avaliar escolhas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus guia também formando quem decide",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não apenas apontando setas no caminho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. A comunidade participa do discernimento",
            "type": "SUBHEADING"
          },
          {
            "text": "Provérbios valoriza muitos conselheiros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 15 mostra a igreja discutindo, ouvindo testemunhos, lembrando as Escrituras e chegando a uma decisão",
            "type": "PARAGRAPH"
          },
          {
            "text": "conjunta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 13/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Decisões importantes não precisam ser solitárias",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conselho maduro pode revelar ângulos que não enxergamos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-13-understand-7",
        "studyId": "track-04-study-13",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Nem toda escolha possui uma única opção moralmente permitida",
            "type": "SUBHEADING"
          },
          {
            "text": "Há decisões em que duas ou mais opções podem ser legítimas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Qual cidade morar ou qual profissão seguir nem sempre possui uma única resposta secreta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus pode nos conceder liberdade para escolher com sabedoria.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Liberdade também exige maturidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem toda escolha precisa de um sinal extraordinário.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. “Sentir paz” pode ajudar, mas não é um teste infalível",
            "type": "SUBHEADING"
          },
          {
            "text": "Emoções importam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas podemos sentir paz por evitar uma conversa necessária e inquietação diante de uma decisão correta e",
            "type": "PARAGRAPH"
          },
          {
            "text": "difícil.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso sentimentos devem ser avaliados junto com Palavra, caráter, conselhos e realidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paz interior não substitui discernimento",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela é um elemento, não o juiz final.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-13-connect-8",
        "studyId": "track-04-study-13",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Tiago 4 ensina planejamento humilde",
            "type": "SUBHEADING"
          },
          {
            "text": "Tiago não condena planejar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Condena planejar como se controlássemos o futuro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Se o Senhor quiser” é postura de dependência, não frase mágica.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Planeje de joelhos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trabalhe com responsabilidade e mantenha as mãos abertas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Portas abertas e fechadas não dizem tudo sozinhas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma oportunidade fácil pode ser ruim.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma dificuldade pode aparecer num caminho correto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Os apóstolos enfrentaram oposição justamente enquanto obedeciam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Circunstância não é interpretação automática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Avalie a porta, não apenas se ela abriu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cuidado com “Deus me disse” quando você possui apenas uma impressão",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 13/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há diferença entre convicção pessoal e palavra explícita de Deus nas Escrituras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Falar com certeza divina sobre uma impressão aumenta o peso de algo que pode estar errado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma linguagem humilde pode ser mais fiel",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Tenho a impressão”, “estou orando”, “parece sábio” deixam espaço para correção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use “vontade de Deus” para manipular outra pessoa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dizer “Deus me mostrou que você deve casar comigo” ou “Deus mandou você me obedecer nisso” pode ser",
            "type": "PARAGRAPH"
          },
          {
            "text": "forma de pressão espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não precisa de manipulação para conduzir seu povo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Respeite consciência, liberdade e responsabilidade do outro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "E o método de “pedir um sinal”?",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia registra situações em que sinais foram pedidos ou dados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas isso não se torna o método normal ensinado para todas as decisões cristãs.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus também repreendeu busca de sinais em contextos de incredulidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nosso caminho comum é mais sóbrio: Palavra, oração, sabedoria, conselho e confiança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não transforme exceção em regra",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus já nos deu muito para formar decisões responsáveis.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-13-apply-9",
        "studyId": "track-04-study-13",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Comece pelo que já está claro",
            "type": "SUBHEADING"
          },
          {
            "text": "Antes de pedir direção sobre detalhes, pergunte se alguma opção contradiz mandamentos claros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma decisão baseada em mentira, desonestidade ou infidelidade não se torna correta porque parece",
            "type": "PARAGRAPH"
          },
          {
            "text": "vantajosa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A vontade de Deus nunca precisa contradizer a Palavra de Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "Comece pelo fundamento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Identifique seus interesses escondidos",
            "type": "SUBHEADING"
          },
          {
            "text": "Às vezes chamamos de “direção de Deus” aquilo que já desejávamos muito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte: o que eu perderia se escolhesse a opção mais fiel?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Desejos influenciam discernimento",
            "type": "PARAGRAPH"
          },
          {
            "text": "Traga-os para a luz.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Procure conselhos de pessoas que podem discordar de você",
            "type": "SUBHEADING"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 13/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se buscamos apenas quem confirma nossa vontade, não estamos realmente pedindo conselho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escolha pessoas maduras, bíblicas e que conheçam sua realidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Bom conselho não é aplauso",
            "type": "PARAGRAPH"
          },
          {
            "text": "É ajuda para enxergar melhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Depois de discernir com responsabilidade, escolha",
            "type": "SUBHEADING"
          },
          {
            "text": "Paralisia também tem custo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem sempre haverá cem por cento de certeza.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos tomar uma decisão honesta e continuar dependentes de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fé também caminha sem mapa completo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus é maior que nossa possibilidade de escolher imperfeitamente.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-13-journey-takeaway-10",
        "studyId": "track-04-study-13",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Deus nos guia, mas nem sempre por sinais extraordinários.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele forma nossa mente pela Palavra, nos convida a pedir sabedoria, oferece comunidade e nos chama a",
            "type": "PARAGRAPH"
          },
          {
            "text": "planejar com humildade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sentimentos e circunstâncias podem ser considerados, mas não devem ser tratados como revelação infalível.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em muitas escolhas, maturidade significa avaliar, orar, aconselhar-se e decidir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Discernimento cristão é menos sobre descobrir uma senha secreta do futuro e mais sobre",
            "type": "PARAGRAPH"
          },
          {
            "text": "tornar-se uma pessoa capaz de escolher com sabedoria diante de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos tomar decisões sem controlar todos os resultados, confiando que Deus continua",
            "type": "PARAGRAPH"
          },
          {
            "text": "conosco enquanto escolhemos com verdade, humildade e responsabilidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-13-practice-today-11",
        "studyId": "track-04-study-13",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Pegue uma decisão real e responda:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Existe algum princípio bíblico claro?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quais são minhas motivações?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que conselho maduro preciso ouvir?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quais consequências devo considerar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que parte preciso entregar a Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-13-reflection-questions-12",
        "studyId": "track-04-study-13",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 13/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Tenho esperado sinais quando já possuo informação suficiente para decidir?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Costumo transformar sentimentos em certeza divina?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Quem são meus conselheiros maduros?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe uma opção que exige desobedecer algo já claro na Bíblia?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho medo de escolher por querer controlar todo o resultado?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-13-journal-prompt-13",
        "studyId": "track-04-study-13",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que decisão preciso parar de tratar como enigma e começar a discernir com Palavra, oração,",
            "type": "PARAGRAPH"
          },
          {
            "text": "conselho e responsabilidade?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-13-prayer-14",
        "studyId": "track-04-study-13",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, dá-me sabedoria para escolher. Livra-me de confundir meus desejos com tua voz e de",
            "type": "PARAGRAPH"
          },
          {
            "text": "usar teu nome para justificar aquilo que eu já decidi fazer. Renova minha mente pela tua Palavra,",
            "type": "PARAGRAPH"
          },
          {
            "text": "dá-me conselheiros honestos e coragem para agir quando for hora. Onde eu não tiver certeza",
            "type": "PARAGRAPH"
          },
          {
            "text": "absoluta, ensina-me a caminhar em humildade e confiança. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-13-keep-15",
        "studyId": "track-04-study-13",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Tiago 1:5 - Peça sabedoria a Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios 11:14 - Veja o valor de conselhos sábios.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para os momentos em que decisões importantes trouxerem confusão.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-13-group-mode-16",
        "studyId": "track-04-study-13",
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
            "text": "Que diferença existe entre sabedoria e simples informação?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que sentimentos e circunstâncias não devem ser tratados como sinais infalíveis?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que critérios bíblicos podemos usar numa decisão real nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-13-continue-journey-17",
        "studyId": "track-04-study-13",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Nossas decisões afetam pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso a nova vida em Cristo precisa aparecer na forma como construímos relacionamentos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 13/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 14 - Relacionamentos: amar com verdade, graça e limites",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como o Evangelho muda a maneira como nos relacionamos sem exigir",
            "type": "PARAGRAPH"
          },
          {
            "text": "relações perfeitas ou sem limites?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-13-references-18",
        "studyId": "track-04-study-13",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Tiago 1:5-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios 3:5-7",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios 11:14",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 12:1-2",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses 3:15-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago 4:13-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 15:1-29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-14",
    "sections": [
      {
        "id": "track-04-study-14-golden-text-1",
        "studyId": "track-04-study-14",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Se for possível, quanto estiver em vós, tende paz com todos os homens.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 12:18",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-14-practical-truth-2",
        "studyId": "track-04-study-14",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Amar biblicamente não é agradar todo mundo nem permitir todo comportamento; é buscar o",
            "type": "PARAGRAPH"
          },
          {
            "text": "bem do outro com verdade, graça, responsabilidade e paz sempre que isso for possível.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-14-bible-reading-3",
        "studyId": "track-04-study-14",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Romanos 12:9-21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Efésios 4:25-32 | Colossenses 3:12-15 | Provérbios 13:20 | 1 Coríntios 13:4-7 | Mateus",
            "type": "PARAGRAPH"
          },
          {
            "text": "18:15-17",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-14-before-understanding-4",
        "studyId": "track-04-study-14",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Grande parte das alegrias e das dores da vida chega por meio de relacionamentos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Família, amizade, casamento, igreja, trabalho.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Todos queremos relações saudáveis, mas todos somos pessoas imperfeitas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 14/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho não promete convivência sem conflitos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele nos ensina outra maneira de lidar com eles.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor sincero.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Humildade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perdão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Limites.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E uma busca de paz que reconhece que nem tudo depende de uma pessoa só.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-14-read-5",
        "studyId": "track-04-study-14",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Romanos 12:9-21",
            "type": "SUBHEADING"
          },
          {
            "text": "Romanos 12 coloca a vida cristã no chão do cotidiano.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois de falar de culto e dons, Paulo fala de amor, honra, hospitalidade, empatia, paz e resposta ao mal.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-14-observe-6",
        "studyId": "track-04-study-14",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. O amor precisa ser sincero",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo começa dizendo que o amor seja sem fingimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso exclui cordialidade falsa usada para esconder manipulação ou desprezo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor cristão não é teatro",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade e bondade precisam caminhar juntas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Amor inclui rejeitar o mal",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo diz para aborrecer o mal e apegar-se ao bem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso impede a ideia de que amar significa aprovar tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amor possui conteúdo moral",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele deseja o bem verdadeiro, não apenas evitar desconforto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. Relações saudáveis incluem honra e empatia",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo fala de preferir em honra, alegrar com os que se alegram e chorar com os que choram.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Relacionamento não é apenas falar; é aprender a perceber o outro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Presença também é amor",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem sempre precisamos consertar tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. A paz possui um limite importante: “se for possível”",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo reconhece que nem toda relação pode ser pacificada pela vontade de uma pessoa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele diz “quanto depender de vocês”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 14/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você é responsável pela sua parte",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não pelo controle da resposta do outro.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-14-understand-7",
        "studyId": "track-04-study-14",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Relacionamentos cristãos precisam de verdade",
            "type": "SUBHEADING"
          },
          {
            "text": "Efésios manda deixar a mentira e falar a verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fingir que está tudo bem para evitar qualquer conflito pode produzir distância e ressentimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paz sem verdade é frágil",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conversas difíceis podem fazer parte do amor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Limites não são falta automática de amor",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus ensina etapas para lidar com pecado na comunidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em alguns casos, a distância se torna necessária.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios também alerta sobre companhias que influenciam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amar não é oferecer acesso ilimitado",
            "type": "PARAGRAPH"
          },
          {
            "text": "Confiança é construída e pode precisar ser reconstruída.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-14-connect-8",
        "studyId": "track-04-study-14",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. 1 Coríntios 13 descreve amor, não passividade",
            "type": "SUBHEADING"
          },
          {
            "text": "O amor é paciente e bondoso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não se alegra com a injustiça; alegra-se com a verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso é importante em relações onde alguém exige silêncio em nome do amor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O amor bíblico não protege a injustiça",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele se alegra com a verdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Nem toda relação precisa ocupar o mesmo lugar",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos tratar todos com dignidade sem transformar todos em amigos íntimos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus tinha multidões, discípulos e um círculo mais próximo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Proximidade exige discernimento",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dignidade é para todos; intimidade é construída.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use submissão, perdão ou unidade para manter abuso",
            "type": "PARAGRAPH"
          },
          {
            "text": "Violência, coerção, ameaça e abuso de poder não devem ser protegidos por linguagem espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Buscar ajuda, proteção e responsabilização pode ser necessário.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 14/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Unidade não é silêncio diante do mal",
            "type": "PARAGRAPH"
          },
          {
            "text": "A paz bíblica anda com verdade e justiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como saber se preciso estabelecer um limite?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte se existe repetição de dano, ausência de arrependimento, manipulação, risco, quebra constante de",
            "type": "PARAGRAPH"
          },
          {
            "text": "confiança ou pressão para participar de algo errado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Limite pode significar mudar frequência, assunto, acesso, ambiente ou até interromper contato por um",
            "type": "PARAGRAPH"
          },
          {
            "text": "período.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando houver risco ou violência, busque apoio confiável e proteção adequada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Limites servem à saúde e à verdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisam ser usados como vingança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-14-apply-9",
        "studyId": "track-04-study-14",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Aprenda a ter conversas diretas sem crueldade",
            "type": "SUBHEADING"
          },
          {
            "text": "Em vez de acumular ressentimento, fale com clareza.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Descreva o comportamento e o efeito, sem transformar a pessoa inteira em rótulo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Troque “você é horrível” por verdade específica",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso abre mais espaço para compreensão e mudança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Pare de esperar que todos adivinhem suas necessidades",
            "type": "SUBHEADING"
          },
          {
            "text": "Relacionamentos maduros exigem comunicação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Silêncio seguido de cobrança costuma produzir frustração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Peça com clareza",
            "type": "PARAGRAPH"
          },
          {
            "text": "O outro não lê sua mente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Escolha bem suas influências",
            "type": "SUBHEADING"
          },
          {
            "text": "Relacionamentos formam.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem ocupa muito espaço em nossa vida também influencia nossos desejos e hábitos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Amizade não é neutra",
            "type": "PARAGRAPH"
          },
          {
            "text": "Caminhe perto de pessoas que ajudam sua fé a crescer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Faça sua parte e entregue a resposta do outro",
            "type": "SUBHEADING"
          },
          {
            "text": "Você pode pedir perdão e a pessoa não aceitar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pode falar com respeito e receber hostilidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 14/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 12 lembra que paz não depende só de você.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fidelidade não é controlar o resultado",
            "type": "PARAGRAPH"
          },
          {
            "text": "É responder corretamente.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-14-journey-takeaway-10",
        "studyId": "track-04-study-14",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Relacionamentos cristãos não são perfeitos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas podem ser marcados por amor sincero, verdade, honra, empatia, perdão e limites.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não chama ninguém a agradar a todos nem a permanecer em relações destrutivas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela nos chama a fazer nossa parte pela paz e a recusar devolver mal com mal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Relacionamento saudável não é ausência de conflito; é aprender a lidar com diferenças e feridas",
            "type": "PARAGRAPH"
          },
          {
            "text": "de maneira mais parecida com Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho nos ensina a amar sem fingimento, falar a verdade sem crueldade e estabelecer",
            "type": "PARAGRAPH"
          },
          {
            "text": "limites sem transformar distância em vingança.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-14-practice-today-11",
        "studyId": "track-04-study-14",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma relação importante e responda:",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que preciso agradecer?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que preciso conversar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Que limite preciso respeitar ou estabelecer?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça uma ação de cada vez.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-14-reflection-questions-12",
        "studyId": "track-04-study-14",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho confundido amor com agradar pessoas?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe uma conversa honesta que venho adiando?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Algum relacionamento precisa de limites?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho exigido paz em situações onde o outro se recusa a agir com verdade?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que amizades estão formando minha fé?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-14-journal-prompt-13",
        "studyId": "track-04-study-14",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que relacionamento Deus está me chamando a tratar com mais verdade, graça ou limite nesta",
            "type": "PARAGRAPH"
          },
          {
            "text": "fase?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-14-prayer-14",
        "studyId": "track-04-study-14",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 14/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, ensina-me a amar sem fingimento. Dá-me coragem para falar a verdade, humildade para",
            "type": "PARAGRAPH"
          },
          {
            "text": "ouvir e sabedoria para estabelecer limites quando necessário. Livra-me de devolver mal com mal",
            "type": "PARAGRAPH"
          },
          {
            "text": "e também de usar a paz como desculpa para esconder injustiça. Forma em mim relacionamentos",
            "type": "PARAGRAPH"
          },
          {
            "text": "que reflitam tua graça e tua verdade. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-14-keep-15",
        "studyId": "track-04-study-14",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Romanos 12:18 - Faça sua parte pela paz.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 4:25 - Fale a verdade porque pertencemos uns aos outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para conversas difíceis e decisões sobre limites.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-14-group-mode-16",
        "studyId": "track-04-study-14",
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
            "text": "Quais marcas de relacionamento saudável aparecem em Romanos 12?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "O que significa “se for possível, quanto depender de vocês”?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Como nosso grupo pode aprender a unir verdade e graça em conflitos?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-14-continue-journey-17",
        "studyId": "track-04-study-14",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Muitos conflitos começam ou pioram por palavras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A nova vida também precisa alcançar aquilo que dizemos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 15 - O uso das palavras: falar de um jeito que produz vida",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como nossas palavras podem ferir, curar, construir e revelar o que existe no",
            "type": "PARAGRAPH"
          },
          {
            "text": "coração?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-14-references-18",
        "studyId": "track-04-study-14",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Romanos 12:9-21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 4:25-32",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses 3:12-15",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios 13:20",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Coríntios 13:4-7",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 14/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 18:15-17",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-15",
    "sections": [
      {
        "id": "track-04-study-15-golden-text-1",
        "studyId": "track-04-study-15",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Não saia da vossa boca nenhuma palavra torpe, mas só a que for boa para promover a",
            "type": "PARAGRAPH"
          },
          {
            "text": "edificação.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 4:29",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-15-practical-truth-2",
        "studyId": "track-04-study-15",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Uma boca transformada pelo Evangelho não precisa falar sempre muito; aprende a dizer a",
            "type": "PARAGRAPH"
          },
          {
            "text": "verdade, evitar destruição desnecessária e usar palavras para edificar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-15-bible-reading-3",
        "studyId": "track-04-study-15",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Tiago 3:1-12",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Efésios 4:25-32 | Provérbios 18:21 | Provérbios 15:1 | Mateus 12:33-37 | Colossenses",
            "type": "PARAGRAPH"
          },
          {
            "text": "4:5-6",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-15-before-understanding-4",
        "studyId": "track-04-study-15",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Uma frase pode ficar na memória por anos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Palavras de um pai, professor, líder, cônjuge ou amigo podem construir coragem ou produzir feridas",
            "type": "PARAGRAPH"
          },
          {
            "text": "profundas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia conhece esse poder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 15/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago compara a língua a freio, leme e fogo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas precisamos entender isso corretamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não ensina que nossas palavras possuem poder mágico para materializar qualquer coisa que",
            "type": "PARAGRAPH"
          },
          {
            "text": "declaramos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela ensina que palavras têm consequências reais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso a nova vida precisa chegar à boca.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-15-read-5",
        "studyId": "track-04-study-15",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Tiago 3:1-12",
            "type": "SUBHEADING"
          },
          {
            "text": "Tiago 3 fala com força sobre a dificuldade de controlar a língua.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele mostra como algo pequeno pode influenciar coisas grandes.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-15-observe-6",
        "studyId": "track-04-study-15",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Palavras revelam maturidade",
            "type": "SUBHEADING"
          },
          {
            "text": "Tiago afirma que todos tropeçamos em muitas coisas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem consegue controlar a fala demonstra grande maturidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A língua é pequena, mas revela muito",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nossa fala mostra áreas onde o coração ainda precisa de formação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Palavras podem direcionar ambientes",
            "type": "SUBHEADING"
          },
          {
            "text": "Como leme de navio, uma fala pode mudar o clima de uma casa, equipe ou igreja.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma resposta áspera pode incendiar conflito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não subestime pequenas frases",
            "type": "PARAGRAPH"
          },
          {
            "text": "Elas podem mudar o rumo de uma conversa inteira.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. A mesma boca pode adorar e ferir",
            "type": "SUBHEADING"
          },
          {
            "text": "Tiago aponta a incoerência de bendizer Deus e amaldiçoar pessoas feitas à imagem dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Culto e relacionamento não podem ser separados",
            "type": "PARAGRAPH"
          },
          {
            "text": "A boca que canta também precisa aprender a respeitar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. O problema da fala começa mais fundo",
            "type": "SUBHEADING"
          },
          {
            "text": "Jesus ensina que a boca fala do que está cheio o coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso significa que apenas decorar regras de comunicação não resolve tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Palavras são sintomas e sementes",
            "type": "PARAGRAPH"
          },
          {
            "text": "Precisamos tratar coração e hábito.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-15-understand-7",
        "studyId": "track-04-study-15",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. “Morte e vida estão no poder da língua” não significa magia verbal",
            "type": "SUBHEADING"
          },
          {
            "text": "Provérbios fala do impacto real das palavras.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma mentira pode destruir reputação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma ameaça pode produzir medo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma palavra de esperança pode fortalecer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso é diferente de ensinar que qualquer frase falada cria automaticamente realidade espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Palavras têm poder relacional e moral",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não são comandos mágicos para controlar o universo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Falar verdade não autoriza brutalidade",
            "type": "SUBHEADING"
          },
          {
            "text": "“Eu só sou sincero” às vezes significa “não quero aprender gentileza”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses fala de palavra com graça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade sem amor pode virar arma",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça sem verdade vira omissão.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-15-connect-8",
        "studyId": "track-04-study-15",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Efésios 4 pergunta se a fala edifica",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo não manda apenas evitar palavrões.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele pergunta se a palavra é boa para construir e útil naquele momento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem toda verdade precisa ser dita de qualquer jeito ou em qualquer hora",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sabedoria considera conteúdo, momento e forma.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Silêncio também pode ser pecado ou sabedoria",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há momentos de calar para evitar fofoca.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E momentos em que silêncio protege abuso ou mentira.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A maturidade aprende a diferença.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte",
            "type": "PARAGRAPH"
          },
          {
            "text": "Meu silêncio está guardando paz ou escondendo algo que precisa de verdade?",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use “declarar” como substituto para agir",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dizer “declaro que tudo vai melhorar” não substitui pedir perdão, procurar emprego, buscar tratamento,",
            "type": "PARAGRAPH"
          },
          {
            "text": "estudar ou corrigir uma injustiça.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A oração pode acompanhar ação responsável.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 15/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Palavras de fé precisam de verdade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não de negação da realidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como lidar com fofoca?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte antes de compartilhar:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso é verdadeiro?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tenho autorização ou necessidade para contar?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ajuda alguém ou apenas satisfaz curiosidade?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Eu diria isso se a pessoa estivesse presente?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há situações em que informações precisam ser levadas a autoridades ou líderes responsáveis para proteção;",
            "type": "PARAGRAPH"
          },
          {
            "text": "isso não é fofoca quando existe motivo legítimo e cuidado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem todo compartilhamento é igual",
            "type": "PARAGRAPH"
          },
          {
            "text": "O objetivo e o destinatário importam.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-15-apply-9",
        "studyId": "track-04-study-15",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Diminua a velocidade da resposta",
            "type": "SUBHEADING"
          },
          {
            "text": "Provérbios ensina que resposta branda pode desviar furor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma pausa de dez segundos pode evitar horas de conflito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não precisa responder tudo imediatamente",
            "type": "PARAGRAPH"
          },
          {
            "text": "Domínio próprio também aparece no tempo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Pare de usar humor para ferir sem assumir responsabilidade",
            "type": "SUBHEADING"
          },
          {
            "text": "“Foi só brincadeira” não apaga o efeito de uma humilhação repetida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Humor saudável não precisa diminuir alguém.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se a pessoa sempre sai menor, talvez não seja apenas piada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Reavalie.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Use palavras para afirmar o bem verdadeiro",
            "type": "SUBHEADING"
          },
          {
            "text": "Encorajamento bíblico não é bajulação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É aprender a reconhecer graça, esforço, crescimento e caráter.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Diga o bem enquanto há tempo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muitas pessoas ouvem crítica em abundância e encorajamento em escassez.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Corrija com objetivo de restaurar",
            "type": "SUBHEADING"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 15/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando precisar confrontar, pergunte qual resultado deseja.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se o objetivo é apenas vencer, sua forma de falar mostrará isso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Correção cristã busca verdade e restauração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não prazer em humilhar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-15-journey-takeaway-10",
        "studyId": "track-04-study-15",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Palavras possuem consequências reais.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Elas podem direcionar ambientes, ferir, curar, mentir, encorajar e revelar o coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não ensina magia verbal, mas leva a fala muito a sério.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma boca sendo transformada aprende a unir verdade, graça e domínio próprio.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Antes de falar, vale perguntar: isso é verdadeiro, necessário, amoroso e útil neste momento?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "O Evangelho alcança nossa linguagem quando aprendemos a usar palavras não para controlar",
            "type": "PARAGRAPH"
          },
          {
            "text": "ou destruir, mas para servir à verdade e à edificação.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-15-practice-today-11",
        "studyId": "track-04-study-15",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Hoje, pratique três ações:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não repasse uma informação desnecessária.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça um elogio específico e verdadeiro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Adie uma resposta se estiver irritado.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-15-reflection-questions-12",
        "studyId": "track-04-study-15",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Que tipo de frase costumo usar quando estou irritado?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho confundido sinceridade com dureza?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe fofoca que preciso interromper?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Uso palavras de fé para negar realidades que exigem ação?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Quem precisa ouvir uma palavra verdadeira de encorajamento?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-15-journal-prompt-13",
        "studyId": "track-04-study-15",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que padrão de fala mais precisa ser transformado em mim nesta fase?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-15-prayer-14",
        "studyId": "track-04-study-15",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 15/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, coloca guarda sobre minha boca e trata também meu coração. Perdoa palavras que",
            "type": "PARAGRAPH"
          },
          {
            "text": "feriram, mentiram, exageraram ou humilharam. Ensina-me a falar verdade com graça, corrigir",
            "type": "PARAGRAPH"
          },
          {
            "text": "sem crueldade e calar quando o silêncio for sábio. Dá-me coragem também para falar quando a",
            "type": "PARAGRAPH"
          },
          {
            "text": "verdade precisar proteger alguém. Que minhas palavras sirvam à edificação e reflitam o caráter",
            "type": "PARAGRAPH"
          },
          {
            "text": "de Cristo. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-15-keep-15",
        "studyId": "track-04-study-15",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Efésios 4:29 - Fale aquilo que ajuda a edificar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios 15:1 - Observe o efeito de uma resposta branda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para revisar antes de conversas delicadas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-15-group-mode-16",
        "studyId": "track-04-study-15",
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
            "text": "Que imagens Tiago usa para mostrar o poder da língua?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Qual é a diferença entre verdade e brutalidade?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que hábito de comunicação nosso grupo precisa praticar nesta semana?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-15-continue-journey-17",
        "studyId": "track-04-study-15",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Palavras podem servir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Jesus foi além: Ele colocou a própria vida a serviço de outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 16 - Serviço: grandeza que se ajoelha",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: O que Jesus ensina sobre servir sem transformar serviço em busca de",
            "type": "PARAGRAPH"
          },
          {
            "text": "reconhecimento ou em exploração?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-15-references-18",
        "studyId": "track-04-study-15",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Tiago 3:1-12",
            "type": "PARAGRAPH"
          },
          {
            "text": "Efésios 4:25-32",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios 18:21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Provérbios 15:1",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 15/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mateus 12:33-37",
            "type": "PARAGRAPH"
          },
          {
            "text": "Colossenses 4:5-6",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-16",
    "sections": [
      {
        "id": "track-04-study-16-golden-text-1",
        "studyId": "track-04-study-16",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“O Filho do Homem não veio para ser servido, mas para servir.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Marcos 10:45",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-16-practical-truth-2",
        "studyId": "track-04-study-16",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "No Reino de Jesus, grandeza não é ter pessoas ao nosso redor para atender nossos desejos, mas",
            "type": "PARAGRAPH"
          },
          {
            "text": "usar aquilo que recebemos para o bem dos outros e para a glória de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-16-bible-reading-3",
        "studyId": "track-04-study-16",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Marcos 10:35-45",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: João 13:1-17 | 1 Pedro 4:10-11 | Romanos 12:3-8 | Filipenses 2:3-8 | Gálatas 5:13",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-16-before-understanding-4",
        "studyId": "track-04-study-16",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Nosso mundo costuma associar grandeza a ser servido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quanto mais importante alguém parece, mais pessoas trabalham para atender suas necessidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus vira essa lógica de cabeça para baixo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando discípulos discutem posição, Ele fala de serviço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E não oferece apenas uma aula.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 16/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele próprio serve.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas precisamos entender serviço de maneira saudável.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Servir não é desaparecer como pessoa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Também não é aceitar exploração espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É colocar dons, tempo e recursos a serviço do bem, debaixo do senhorio de Cristo.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-16-read-5",
        "studyId": "track-04-study-16",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Marcos 10:35-45",
            "type": "SUBHEADING"
          },
          {
            "text": "Tiago e João pedem lugares de honra.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Os outros discípulos ficam indignados.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus usa o conflito para ensinar como autoridade funciona em seu Reino.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-16-observe-6",
        "studyId": "track-04-study-16",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Jesus contrasta seu Reino com a dominação",
            "type": "SUBHEADING"
          },
          {
            "text": "Ele fala de governantes que dominam e exercem autoridade de maneira opressiva.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois diz: “entre vocês não será assim”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Liderança cristã não imita abuso de poder",
            "type": "PARAGRAPH"
          },
          {
            "text": "Autoridade deve servir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Grandeza é redefinida",
            "type": "SUBHEADING"
          },
          {
            "text": "Quem deseja ser grande deve servir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não diz que responsabilidade ou liderança são ruins.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele muda a lógica de uso do poder.",
            "type": "PARAGRAPH"
          },
          {
            "text": "No Reino, poder é responsabilidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não privilégio para explorar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. Jesus é o próprio modelo",
            "type": "SUBHEADING"
          },
          {
            "text": "Ele veio para servir e dar a vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 13 mostra Jesus lavando pés.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus não pede um caminho que recusou percorrer",
            "type": "PARAGRAPH"
          },
          {
            "text": "Serviço está no centro de seu exemplo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Serviço cristão nasce daquilo que recebemos",
            "type": "SUBHEADING"
          },
          {
            "text": "1 Pedro fala de dons recebidos para servir aos outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não possuímos talentos apenas para construir reputação pessoal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 16/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dom é responsabilidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Aquilo que recebemos pode se tornar bênção compartilhada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-16-understand-7",
        "studyId": "track-04-study-16",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Serviço não é apenas atividade dentro da igreja",
            "type": "SUBHEADING"
          },
          {
            "text": "Servimos em casa, trabalho, vizinhança e comunidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cuidar de alguém, ensinar, organizar, ouvir, cozinhar, contribuir, visitar e administrar podem ser serviço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não espere um microfone",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muito serviço importante acontece longe do palco.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Dons diferentes evitam comparação inútil",
            "type": "SUBHEADING"
          },
          {
            "text": "Romanos 12 fala de diferentes dons.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem todos precisam servir do mesmo jeito.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fidelidade vale mais que imitação",
            "type": "PARAGRAPH"
          },
          {
            "text": "Descubra como aquilo que recebeu pode servir.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-16-connect-8",
        "studyId": "track-04-study-16",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Filipenses liga serviço à humildade de Cristo",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo aponta para Jesus, que não viveu agarrado a privilégios.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Humildade cristã considera o bem do outro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Humildade não é pensar que você não vale nada",
            "type": "PARAGRAPH"
          },
          {
            "text": "É não precisar ser o centro o tempo todo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Serviço precisa de limites e descanso",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus servia intensamente e também se retirava.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Necessidades são infinitas; nossa capacidade não é.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não é o Salvador",
            "type": "PARAGRAPH"
          },
          {
            "text": "Servir fielmente inclui reconhecer limites.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use “servo” para justificar exploração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma igreja ou líder não pode exigir trabalho sem fim, manipular culpa ou tratar pessoas como recursos",
            "type": "PARAGRAPH"
          },
          {
            "text": "descartáveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Serviço cristão é voluntário e responsável, não abuso espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 16/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Líderes também servem",
            "type": "PARAGRAPH"
          },
          {
            "text": "Título não autoriza dominação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como descobrir onde posso servir?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Observe necessidades reais, capacidades que você possui, coisas que outras pessoas reconhecem em você e",
            "type": "PARAGRAPH"
          },
          {
            "text": "áreas em que há oportunidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Experimente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem todo serviço precisa nascer de uma “chamada” extraordinária.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muitas vezes começa quando alguém percebe uma necessidade e decide ajudar com fidelidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Comece perto",
            "type": "PARAGRAPH"
          },
          {
            "text": "O próximo lugar de serviço pode estar diante de você.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-16-apply-9",
        "studyId": "track-04-study-16",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Sirva sem depender de aplauso",
            "type": "SUBHEADING"
          },
          {
            "text": "Alguns serviços são invisíveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Se só conseguimos continuar quando somos reconhecidos, talvez o coração esteja buscando outra",
            "type": "PARAGRAPH"
          },
          {
            "text": "recompensa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça algumas coisas que ninguém verá",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso treina liberdade do reconhecimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Aprenda a dizer não sem culpa quando necessário",
            "type": "SUBHEADING"
          },
          {
            "text": "Servir não significa assumir todas as demandas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Um “sim” sem limite pode destruir família, saúde e qualidade do próprio serviço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Limite também pode ser fidelidade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não precisa fazer tudo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Use influência para levantar outros",
            "type": "SUBHEADING"
          },
          {
            "text": "Se possui liderança, conhecimento ou recursos, pergunte como pode abrir espaço para pessoas crescerem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Autoridade que serve multiplica",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não concentra tudo em si.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Faça do cotidiano seu lugar de serviço",
            "type": "SUBHEADING"
          },
          {
            "text": "Arrumar uma casa, cuidar de filhos, ensinar alguém, ouvir um idoso, orientar um jovem, trabalhar com",
            "type": "PARAGRAPH"
          },
          {
            "text": "honestidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 16/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pequenas ações podem ser culto vivido.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Serviço não precisa parecer extraordinário",
            "type": "PARAGRAPH"
          },
          {
            "text": "Precisa ser fiel.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-16-journey-takeaway-10",
        "studyId": "track-04-study-16",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Jesus redefine grandeza pelo serviço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele não glorifica exploração nem cansaço sem limite.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ele usa poder para o bem, entrega-se e chama seus discípulos a fazer o mesmo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cada cristão possui algo para oferecer.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O desafio é deixar de perguntar apenas “o que recebo?” e aprender a perguntar “como posso servir?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Grandeza cristã não sobe apenas para ser vista; ela também se ajoelha para cuidar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Servimos porque Cristo nos serviu primeiro, usando dons e oportunidades com humildade,",
            "type": "PARAGRAPH"
          },
          {
            "text": "responsabilidade e limites saudáveis.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-16-practice-today-11",
        "studyId": "track-04-study-16",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha um serviço concreto que possa realizar nesta semana sem anunciar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pode ser ajudar alguém, assumir uma tarefa, ensinar algo ou aliviar uma carga.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça de maneira simples e completa.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-16-reflection-questions-12",
        "studyId": "track-04-study-16",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Preciso de reconhecimento para continuar servindo?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho tentado fazer mais do que minha capacidade permite?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que dom ou habilidade posso colocar a serviço de outros?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Como uso poder quando tenho autoridade?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe uma necessidade simples perto de mim que continuo ignorando?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-16-journal-prompt-13",
        "studyId": "track-04-study-16",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Que forma de serviço combina com aquilo que Deus já colocou em minhas mãos hoje?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-16-prayer-14",
        "studyId": "track-04-study-16",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 16/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, tu vieste para servir e deste tua vida. Livra-me da necessidade de ser o centro e",
            "type": "PARAGRAPH"
          },
          {
            "text": "também da culpa que me faz tentar carregar tudo. Mostra como usar meus dons, tempo e",
            "type": "PARAGRAPH"
          },
          {
            "text": "influência para o bem. Dá-me humildade para servir sem aplauso, sabedoria para respeitar",
            "type": "PARAGRAPH"
          },
          {
            "text": "limites e coragem para liderar de maneira diferente dos padrões de dominação. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-16-keep-15",
        "studyId": "track-04-study-16",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Marcos 10:45 - Jesus veio para servir.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 4:10 - Use o dom recebido para servir aos outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para lembrar que dons e posição existem para serviço.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-16-group-mode-16",
        "studyId": "track-04-study-16",
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
            "text": "Como Jesus contrasta liderança do mundo e liderança em seu Reino?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que serviço não significa aceitar exploração?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que necessidade concreta nosso grupo pode atender junto?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-16-continue-journey-17",
        "studyId": "track-04-study-16",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Serviço também alcança nossos recursos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma nova vida muda a maneira como seguramos dinheiro, tempo e bens.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 17 - Generosidade: mãos abertas num mundo de medo e acúmulo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como dar com liberdade sem transformar generosidade em barganha com",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-16-references-18",
        "studyId": "track-04-study-16",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Marcos 10:35-45",
            "type": "PARAGRAPH"
          },
          {
            "text": "João 13:1-17",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Pedro 4:10-11",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 12:3-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 2:3-8",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 16/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Gálatas 5:13",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-17",
    "sections": [
      {
        "id": "track-04-study-17-golden-text-1",
        "studyId": "track-04-study-17",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Deus ama ao que dá com alegria.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 9:7",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-17-practical-truth-2",
        "studyId": "track-04-study-17",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Generosidade não é pagar para receber mais de Deus; é reconhecer que recebemos dele e",
            "type": "PARAGRAPH"
          },
          {
            "text": "aprender a compartilhar com alegria, sabedoria e responsabilidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-17-bible-reading-3",
        "studyId": "track-04-study-17",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: 2 Coríntios 9:6-15",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: 2 Coríntios 8:1-15 | Atos 20:32-35 | 1 Timóteo 6:17-19 | Lucas 12:13-21 | Marcos",
            "type": "PARAGRAPH"
          },
          {
            "text": "12:41-44",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-17-before-understanding-4",
        "studyId": "track-04-study-17",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Dinheiro toca áreas profundas do coração.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Segurança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Medo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Status.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 17/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Controle.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso a Bíblia fala tanto sobre recursos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Generosidade cristã não é simplesmente “dar muito”.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo fala de vontade, alegria, proporcionalidade e cuidado com necessidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "E também precisamos rejeitar manipulações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oferta não é investimento para obrigar Deus a devolver multiplicado.",
            "type": "PARAGRAPH"
          },
          {
            "text": "É resposta de gratidão e participação no cuidado.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-17-read-5",
        "studyId": "track-04-study-17",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: 2 Coríntios 9:6-15",
            "type": "SUBHEADING"
          },
          {
            "text": "2 Coríntios 8 e 9 tratam de uma oferta para cristãos em necessidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo organiza a contribuição e fala sobre graça, igualdade e disposição.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-17-observe-6",
        "studyId": "track-04-study-17",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. Generosidade nasce primeiro de entrega a Deus",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo fala de cristãos que deram a si mesmos ao Senhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso impede que generosidade seja apenas movimento financeiro.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não quer apenas uma porcentagem sem coração",
            "type": "PARAGRAPH"
          },
          {
            "text": "A oferta faz parte de uma vida entregue.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Paulo valoriza voluntariedade",
            "type": "SUBHEADING"
          },
          {
            "text": "Cada um deve contribuir conforme propôs no coração, não por tristeza ou constrangimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pressão não é o ideal bíblico",
            "type": "PARAGRAPH"
          },
          {
            "text": "Generosidade precisa de liberdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. O objetivo inclui suprir necessidades",
            "type": "SUBHEADING"
          },
          {
            "text": "A oferta possui destino concreto.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não é uma exibição de riqueza espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dinheiro serve pessoas",
            "type": "PARAGRAPH"
          },
          {
            "text": "A generosidade se torna cuidado real.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Gratidão a Deus é parte do resultado",
            "type": "SUBHEADING"
          },
          {
            "text": "Paulo diz que o serviço produz ações de graças.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O foco final não é exaltar o doador.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Generosidade cristã aponta para Deus",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não para construir celebridade do benfeitor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 17/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-17-understand-7",
        "studyId": "track-04-study-17",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. “Quem semeia muito colhe muito” não é fórmula de enriquecimento",
            "type": "SUBHEADING"
          },
          {
            "text": "O contexto fala de recursos para continuar sendo generoso e suprir necessidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo não promete que toda oferta voltará como riqueza pessoal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus supre para uma vida frutífera",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não oferece um esquema de investimento espiritual.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Generosidade precisa respeitar capacidade",
            "type": "SUBHEADING"
          },
          {
            "text": "2 Coríntios 8 fala de dar segundo o que alguém tem.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso protege quem possui poucos recursos de pressões irresponsáveis.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus não mede amor pelo tamanho absoluto da oferta",
            "type": "PARAGRAPH"
          },
          {
            "text": "O coração e a realidade importam.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-17-connect-8",
        "studyId": "track-04-study-17",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Ricos são chamados à generosidade, não à culpa automática por possuir",
            "type": "SUBHEADING"
          },
          {
            "text": "1 Timóteo 6 manda aos ricos não confiar nas riquezas e ser generosos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Recursos podem ser usados com responsabilidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A pergunta não é apenas “quanto tenho?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "É “em que confio e como uso?”",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Dar também envolve tempo, hospitalidade e capacidades",
            "type": "PARAGRAPH"
          },
          {
            "text": "Generosidade financeira é importante, mas não esgota o tema.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos compartilhar atenção, conhecimento, espaço, alimento e oportunidades.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mãos abertas vão além da carteira",
            "type": "PARAGRAPH"
          },
          {
            "text": "A vida inteira pode aprender a compartilhar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não use promessa de bênção para pressionar oferta",
            "type": "PARAGRAPH"
          },
          {
            "text": "Frases como “dê este valor e Deus vai devolver dez vezes” não possuem apoio seguro no ensino apostólico",
            "type": "PARAGRAPH"
          },
          {
            "text": "sobre contribuição.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso pode explorar pessoas em necessidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oferta não compra milagre",
            "type": "PARAGRAPH"
          },
          {
            "text": "Graça não está à venda.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Generosidade não significa irresponsabilidade com quem depende de você",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 17/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há responsabilidades com família, dívidas e necessidades básicas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dar de maneira impulsiva para parecer espiritual pode criar outros problemas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Generosidade e sabedoria caminham juntas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Planeje para poder compartilhar melhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "E o dízimo?",
            "type": "PARAGRAPH"
          },
          {
            "text": "O dízimo possui lugar importante na história de Israel e há diferentes entendimentos cristãos sobre como essa",
            "type": "PARAGRAPH"
          },
          {
            "text": "prática se relaciona com a Igreja.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Neste estudo, o foco está no ensino claro de 2 Coríntios 8 e 9: contribuição voluntária, generosa, consciente e",
            "type": "PARAGRAPH"
          },
          {
            "text": "voltada ao cuidado e à obra de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos resolver toda a discussão para aprender generosidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O ponto comum é claro",
            "type": "PARAGRAPH"
          },
          {
            "text": "O discípulo de Jesus não vive com as mãos fechadas.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-17-apply-9",
        "studyId": "track-04-study-17",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Planeje generosidade",
            "type": "SUBHEADING"
          },
          {
            "text": "Se esperamos apenas sobrar, talvez nunca compartilhemos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Inclua no orçamento algum espaço para dar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Generosidade pode ser intencional",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não apenas espontânea.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Dê sem controlar a pessoa",
            "type": "SUBHEADING"
          },
          {
            "text": "Ajuda não deve virar ferramenta para comprar obediência ou lealdade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quando possível, preserve dignidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Generosidade não cria propriedade sobre o outro",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dar não compra pessoas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Observe necessidades próximas",
            "type": "SUBHEADING"
          },
          {
            "text": "Às vezes buscamos grandes projetos e ignoramos alguém perto com uma necessidade concreta.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Comece onde seus olhos alcançam",
            "type": "PARAGRAPH"
          },
          {
            "text": "Família, igreja, vizinhança, comunidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Aprenda a receber também",
            "type": "SUBHEADING"
          },
          {
            "text": "Orgulho pode impedir que aceitemos ajuda quando precisamos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 17/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "A comunidade cristã possui movimento de dar e receber.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Receber com gratidão também é humildade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não precisa sempre ocupar o lugar de quem ajuda.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-17-journey-takeaway-10",
        "studyId": "track-04-study-17",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Generosidade cristã nasce da graça e da confiança em Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela não é barganha, espetáculo ou pressão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo ensina contribuição voluntária, proporcional e alegre, destinada a suprir necessidades e produzir",
            "type": "PARAGRAPH"
          },
          {
            "text": "gratidão.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Dinheiro é uma parte, mas o coração generoso aprende a compartilhar a vida.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mãos abertas demonstram que recursos são ferramentas, não nosso senhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quem reconhece que tudo o que possui foi recebido pode aprender a dar com alegria, sem",
            "type": "PARAGRAPH"
          },
          {
            "text": "manipulação e sem transformar oferta em investimento para controlar Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-17-practice-today-11",
        "studyId": "track-04-study-17",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Escolha uma forma concreta de generosidade para esta semana.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pode ser um valor, uma refeição, uma hora do seu tempo, uma carona, um material ou uma oportunidade.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Faça sem anunciar e sem esperar retorno.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-17-reflection-questions-12",
        "studyId": "track-04-study-17",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Tenho medo de dar porque minha segurança está no dinheiro?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Já tratei oferta como forma de conseguir algo de Deus?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Minha generosidade respeita minhas responsabilidades?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Existe alguém perto com uma necessidade que posso atender?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Consigo receber ajuda sem orgulho?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-17-journal-prompt-13",
        "studyId": "track-04-study-17",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "O que meu uso do dinheiro e dos recursos revela sobre aquilo em que mais confio?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-17-prayer-14",
        "studyId": "track-04-study-17",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 17/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor, tudo o que tenho passa por tuas mãos. Livra-me do medo, do apego e da ideia de que",
            "type": "PARAGRAPH"
          },
          {
            "text": "posso comprar tua bênção. Ensina-me a dar com alegria, sabedoria e liberdade. Mostra",
            "type": "PARAGRAPH"
          },
          {
            "text": "necessidades que posso ajudar a suprir e guarda-me de usar generosidade para controlar",
            "type": "PARAGRAPH"
          },
          {
            "text": "pessoas. Dá-me também humildade para receber quando eu precisar. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-17-keep-15",
        "studyId": "track-04-study-17",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "2 Coríntios 9:7 - Generosidade sem constrangimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Timóteo 6:17-19 - Veja como pessoas com recursos são chamadas a usá-los.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens para revisar suas decisões financeiras diante de Deus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-17-group-mode-16",
        "studyId": "track-04-study-17",
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
            "text": "O que 2 Coríntios 9 ensina sobre motivação para dar?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que generosidade não deve ser tratada como fórmula de enriquecimento?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que necessidade concreta nosso grupo pode ajudar a atender?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-17-continue-journey-17",
        "studyId": "track-04-study-17",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Servir, dar, perdoar e crescer exige tempo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A vida cristã não é uma corrida de poucos dias.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Por isso terminamos esta trilha falando de perseverança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Estudo 18 - Perseverança: continuar quando a caminhada fica longa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta central: Como permanecer em Cristo quando entusiasmo diminui, dificuldades",
            "type": "PARAGRAPH"
          },
          {
            "text": "aumentam e ainda estamos longe da linha de chegada?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-17-references-18",
        "studyId": "track-04-study-17",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "2 Coríntios 9:6-15",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Coríntios 8:1-15",
            "type": "PARAGRAPH"
          },
          {
            "text": "Atos 20:32-35",
            "type": "PARAGRAPH"
          },
          {
            "text": "1 Timóteo 6:17-19",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 17/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Lucas 12:13-21",
            "type": "PARAGRAPH"
          },
          {
            "text": "Marcos 12:41-44",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
        "optional": true
      }
    ]
  },
  {
    "studyId": "track-04-study-18",
    "sections": [
      {
        "id": "track-04-study-18-golden-text-1",
        "studyId": "track-04-study-18",
        "type": "GOLDEN_TEXT",
        "title": "Texto Áureo",
        "blocks": [
          {
            "text": "“Corramos, com paciência, a carreira que nos está proposta, olhando para Jesus.”",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 12:1-2",
            "type": "PARAGRAPH"
          }
        ],
        "order": 1,
        "optional": true
      },
      {
        "id": "track-04-study-18-practical-truth-2",
        "studyId": "track-04-study-18",
        "type": "PRACTICAL_TRUTH",
        "title": "Verdade Prática",
        "blocks": [
          {
            "text": "Perseverar não é nunca cansar nem nunca tropeçar; é continuar voltando os olhos para Cristo e",
            "type": "PARAGRAPH"
          },
          {
            "text": "dando o próximo passo de fidelidade.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 2,
        "optional": false
      },
      {
        "id": "track-04-study-18-bible-reading-3",
        "studyId": "track-04-study-18",
        "type": "BIBLE_READING",
        "title": "Leitura Bíblica",
        "blocks": [
          {
            "text": "Leia primeiro: Hebreus 12:1-3",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois, conecte com: Hebreus 10:23-25,35-39 | Tiago 1:2-4,12 | Romanos 5:1-5 | Filipenses 3:12-14 | 2",
            "type": "PARAGRAPH"
          },
          {
            "text": "Timóteo 4:6-8",
            "type": "PARAGRAPH"
          }
        ],
        "order": 3,
        "optional": false
      },
      {
        "id": "track-04-study-18-before-understanding-4",
        "studyId": "track-04-study-18",
        "type": "BEFORE_UNDERSTANDING",
        "title": "Antes de entender",
        "blocks": [
          {
            "text": "Começar pode ser emocionante.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Continuar é outra história.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há fases em que oração parece natural, a Bíblia fala com clareza e a comunidade anima.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 18/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Em outras, tudo parece lento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cansaço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Quedas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Frustrações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Rotina.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia não trata perseverança como emoção constante.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ela usa a imagem de uma corrida longa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Corredores precisam tirar peso, olhar para a direção, aceitar apoio e continuar.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 4,
        "optional": false
      },
      {
        "id": "track-04-study-18-read-5",
        "studyId": "track-04-study-18",
        "type": "READ",
        "title": "Leia",
        "blocks": [
          {
            "text": "LEIA: Hebreus 12:1-3",
            "type": "SUBHEADING"
          },
          {
            "text": "Hebreus 12 vem depois de uma longa lembrança de pessoas que viveram pela fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O autor então chama os leitores a correr a própria carreira olhando para Jesus.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 5,
        "optional": false
      },
      {
        "id": "track-04-study-18-observe-6",
        "studyId": "track-04-study-18",
        "type": "OBSERVE",
        "title": "Observe",
        "blocks": [
          {
            "text": "OBSERVE 1. A corrida possui testemunhas e história",
            "type": "SUBHEADING"
          },
          {
            "text": "Hebreus lembra pessoas que vieram antes.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não somos os primeiros a enfrentar espera, oposição e cansaço.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A fé possui memória",
            "type": "PARAGRAPH"
          },
          {
            "text": "Histórias de outros podem nos lembrar que é possível continuar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 2. Há pesos que precisam ser deixados",
            "type": "SUBHEADING"
          },
          {
            "text": "O texto fala de pecado e também de peso.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem todo peso é necessariamente pecado, mas algumas coisas tornam a corrida mais difícil.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte",
            "type": "PARAGRAPH"
          },
          {
            "text": "O que pode ser permitido, mas está atrapalhando minha caminhada?",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 3. O foco é Jesus",
            "type": "SUBHEADING"
          },
          {
            "text": "O autor não diz para olhar sem parar para a própria força.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus é apresentado como autor e consumador da fé.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perseverança nasce de um foco maior que nós mesmos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cristo já percorreu o caminho da obediência.",
            "type": "PARAGRAPH"
          },
          {
            "text": "OBSERVE 4. Jesus suportou olhando além da dor presente",
            "type": "SUBHEADING"
          },
          {
            "text": "A cruz não é minimizada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Mas Jesus atravessa sofrimento em direção à alegria colocada diante dele.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 18/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Esperança fortalece resistência",
            "type": "PARAGRAPH"
          },
          {
            "text": "O presente não é tudo o que existe.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 6,
        "optional": false
      },
      {
        "id": "track-04-study-18-understand-7",
        "studyId": "track-04-study-18",
        "type": "UNDERSTAND",
        "title": "Entenda",
        "blocks": [
          {
            "text": "ENTENDA 1. Perseverança não é nunca cair",
            "type": "SUBHEADING"
          },
          {
            "text": "Filipenses 3 mostra Paulo dizendo que ainda não chegou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A vida cristã inclui recomeços.",
            "type": "PARAGRAPH"
          },
          {
            "text": "O perigo maior não é reconhecer que tropeçou; é decidir não voltar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Cair pede arrependimento",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não identidade permanente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 2. Perseverança precisa de comunidade",
            "type": "SUBHEADING"
          },
          {
            "text": "Hebreus 10 manda não abandonar a congregação e encorajar uns aos outros.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isolamento prolongado costuma tornar a caminhada mais pesada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ninguém precisa correr sozinho",
            "type": "PARAGRAPH"
          },
          {
            "text": "Encorajamento é parte da resistência.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 7,
        "optional": false
      },
      {
        "id": "track-04-study-18-connect-8",
        "studyId": "track-04-study-18",
        "type": "CONNECT",
        "title": "Conecte",
        "blocks": [
          {
            "text": "CONECTE 3. Provações podem produzir maturidade sem serem chamadas de boas em si",
            "type": "SUBHEADING"
          },
          {
            "text": "mesmas",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago fala da perseverança produzida em provações.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5 fala de sofrimento, perseverança, caráter e esperança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não significa buscar dor ou chamar toda tragédia de bênção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus pode formar em meio à dificuldade",
            "type": "PARAGRAPH"
          },
          {
            "text": "Sem precisar dizer que a dificuldade é boa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "ENTENDA 4. Perseverança cristã possui uma esperança futura",
            "type": "PARAGRAPH"
          },
          {
            "text": "Paulo fala da coroa e da corrida terminada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "A Bíblia aponta para ressurreição, Reino e presença de Deus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não estamos apenas tentando sobreviver ao presente",
            "type": "PARAGRAPH"
          },
          {
            "text": "Caminhamos em direção a uma promessa.",
            "type": "PARAGRAPH"
          },
          {
            "text": "CUIDADO PARA NÃO CONFUNDIR",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não confunda perseverança com permanecer onde existe abuso ou perigo",
            "type": "PARAGRAPH"
          },
          {
            "text": "“Aguente firme” não deve ser conselho para ficar em violência, exploração ou situação destrutiva.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Às vezes perseverar na fé exige sair de um ambiente errado e buscar proteção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 18/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perseveramos em Cristo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não necessariamente em toda circunstância ou relação.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Descanso não é desistência",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jesus descansou.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Corpos possuem limites.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Há fases em que continuar inclui reduzir ritmo, receber cuidado e recuperar forças.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Você não é máquina",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perseverança saudável respeita limites humanos.",
            "type": "PARAGRAPH"
          },
          {
            "text": "+ APROFUNDE",
            "type": "PARAGRAPH"
          },
          {
            "text": "Como saber se devo insistir ou mudar de caminho?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perseverança não significa insistir em qualquer plano pessoal para sempre.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Podemos abandonar um projeto e permanecer fiéis a Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunte: estou tentando perseverar numa promessa de Deus ou apenas numa preferência minha?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conselho, oração e avaliação honesta ajudam a distinguir fidelidade de teimosia.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fidelidade é ao Senhor",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não a toda meta que um dia estabelecemos.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 8,
        "optional": false
      },
      {
        "id": "track-04-study-18-apply-9",
        "studyId": "track-04-study-18",
        "type": "APPLY",
        "title": "Aplique",
        "blocks": [
          {
            "text": "REFLITA 1. Reduza a caminhada ao próximo passo fiel",
            "type": "SUBHEADING"
          },
          {
            "text": "Quando a linha de chegada parece distante, pense no hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Ore hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Leia hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Peça perdão hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Volte à comunidade hoje.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Perseverança é acumulativa",
            "type": "PARAGRAPH"
          },
          {
            "text": "Muitos próximos passos formam uma longa caminhada.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 2. Remova pesos desnecessários",
            "type": "SUBHEADING"
          },
          {
            "text": "Talvez seu peso seja comparação, excesso de compromissos, hábito digital, relação que enfraquece a fé ou",
            "type": "PARAGRAPH"
          },
          {
            "text": "expectativa impossível.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem tudo precisa continuar com você",
            "type": "PARAGRAPH"
          },
          {
            "text": "Algumas coisas devem ser deixadas para correr melhor.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 18/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 3. Não espere motivação perfeita para obedecer",
            "type": "SUBHEADING"
          },
          {
            "text": "Há dias em que faremos o que é certo com pouca emoção.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Isso não torna a obediência menos verdadeira.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Fidelidade vale nos dias comuns",
            "type": "PARAGRAPH"
          },
          {
            "text": "Nem todo dia terá sensação de avivamento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "REFLITA 4. Lembre-se de quanto já caminhou pela graça",
            "type": "SUBHEADING"
          },
          {
            "text": "O Diário e os estudos concluídos podem ajudar a enxergar mudanças que, no dia a dia, parecem pequenas.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Memória alimenta esperança",
            "type": "PARAGRAPH"
          },
          {
            "text": "Deus já sustentou você em capítulos anteriores.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 9,
        "optional": false
      },
      {
        "id": "track-04-study-18-journey-takeaway-10",
        "studyId": "track-04-study-18",
        "type": "JOURNEY_TAKEAWAY",
        "title": "O que levamos desta Jornada",
        "blocks": [
          {
            "text": "Perseverança é continuar olhando para Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não significa nunca cansar, nunca cair ou manter toda meta pessoal.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Significa permanecer na fé, abandonar pesos, buscar comunhão, recomeçar quando necessário e caminhar em",
            "type": "PARAGRAPH"
          },
          {
            "text": "direção à esperança que Deus prometeu.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Depois de dezoito estudos sobre nova vida, chegamos a uma verdade simples: crescimento cristão precisa de",
            "type": "PARAGRAPH"
          },
          {
            "text": "tempo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conclusão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Não precisamos terminar a corrida hoje; precisamos continuar correndo com os olhos em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Verdade Prática",
            "type": "PARAGRAPH"
          },
          {
            "text": "A nova vida amadurece em pessoas que aprendem a permanecer, recomeçar e continuar pela",
            "type": "PARAGRAPH"
          },
          {
            "text": "graça.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 10,
        "optional": false
      },
      {
        "id": "track-04-study-18-practice-today-11",
        "studyId": "track-04-study-18",
        "type": "PRACTICE_TODAY",
        "title": "Pratique hoje",
        "blocks": [
          {
            "text": "Releia os títulos dos 18 estudos desta trilha.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Escolha duas áreas:",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma em que você percebe crescimento.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Uma em que precisa perseverar.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Registre ambas no Diário e dê graças pela primeira enquanto ora pela segunda.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 11,
        "optional": false
      },
      {
        "id": "track-04-study-18-reflection-questions-12",
        "studyId": "track-04-study-18",
        "type": "REFLECTION_QUESTIONS",
        "title": "Para refletir",
        "blocks": [
          {
            "items": [
              "Que peso está tornando minha caminhada mais difícil?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Tenho confundido descanso com fracasso?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 18/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Em que área preciso recomeçar sem vergonha?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Quem me ajuda a perseverar?"
            ],
            "type": "BULLET_LIST"
          },
          {
            "items": [
              "Que sinal de crescimento desta trilha consigo reconhecer?"
            ],
            "type": "BULLET_LIST"
          }
        ],
        "order": 12,
        "optional": false
      },
      {
        "id": "track-04-study-18-journal-prompt-13",
        "studyId": "track-04-study-18",
        "type": "JOURNAL_PROMPT",
        "title": "Registrar no Diário",
        "blocks": [
          {
            "text": "Depois desta trilha, em que área percebo que Deus já me transformou e em qual preciso",
            "type": "PARAGRAPH"
          },
          {
            "text": "continuar correndo com perseverança?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 13,
        "optional": false
      },
      {
        "id": "track-04-study-18-prayer-14",
        "studyId": "track-04-study-18",
        "type": "PRAYER",
        "title": "Ore",
        "blocks": [
          {
            "text": "Oração",
            "type": "PARAGRAPH"
          },
          {
            "text": "Senhor Jesus, obrigado porque és o autor e consumador da fé. Quando eu cansar, lembra-me de",
            "type": "PARAGRAPH"
          },
          {
            "text": "olhar para ti. Mostra pesos que preciso deixar e pecados que preciso abandonar. Dá-me",
            "type": "PARAGRAPH"
          },
          {
            "text": "humildade para receber ajuda, sabedoria para descansar e coragem para recomeçar quando eu",
            "type": "PARAGRAPH"
          },
          {
            "text": "cair. Obrigado por cada passo de crescimento que já aconteceu. Sustenta-me até o fim. Amém.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 14,
        "optional": false
      },
      {
        "id": "track-04-study-18-keep-15",
        "studyId": "track-04-study-18",
        "type": "KEEP",
        "title": "Para guardar",
        "blocks": [
          {
            "text": "Hebreus 12:1-2 - Corra olhando para Jesus.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 10:23 - Permaneça firme porque quem prometeu é fiel.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Favoritos",
            "type": "PARAGRAPH"
          },
          {
            "text": "Guarde essas passagens como marco de encerramento da Trilha 4 e lembrete para continuar sua",
            "type": "PARAGRAPH"
          },
          {
            "text": "Jornada.",
            "type": "PARAGRAPH"
          }
        ],
        "order": 15,
        "optional": false
      },
      {
        "id": "track-04-study-18-group-mode-16",
        "studyId": "track-04-study-18",
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
            "text": "Que pesos e pecados Hebreus 12 nos chama a deixar?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Entenda"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Por que perseverança não significa nunca descansar ou nunca mudar um plano?",
            "type": "PARAGRAPH"
          },
          {
            "items": [
              "Pratique"
            ],
            "type": "NUMBERED_LIST"
          },
          {
            "text": "Que crescimento cada pessoa percebeu ao longo desta trilha?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 16,
        "optional": false
      },
      {
        "id": "track-04-study-18-continue-journey-17",
        "studyId": "track-04-study-18",
        "type": "CONTINUE_JOURNEY",
        "title": "Continue sua Jornada",
        "blocks": [
          {
            "text": "Você concluiu a Trilha 4 - Nova Vida em Cristo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Vimos novo nascimento, graça, santificação, identidade, tentação, fruto do Espírito, perdão, oração, Palavra,",
            "type": "PARAGRAPH"
          },
          {
            "text": "confiança, sofrimento, contentamento, sabedoria, relacionamentos, palavras, serviço, generosidade e",
            "type": "PARAGRAPH"
          },
          {
            "text": "perseverança.",
            "type": "PARAGRAPH"
          },
          {
            "text": "BÍBLIA JORNADA",
            "type": "PARAGRAPH"
          },
          {
            "text": "Trilha 4  |  Estudo 18/18",
            "type": "PARAGRAPH"
          },
          {
            "text": "Conheça a Palavra | Entenda o contexto | Continue sua Jornada",
            "type": "PARAGRAPH"
          },
          {
            "text": "A nova vida não foi feita para ser vivida isoladamente.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Agora vamos olhar para a comunidade que Cristo forma e para a missão que entrega ao seu povo.",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próximo estudo",
            "type": "PARAGRAPH"
          },
          {
            "text": "Próxima trilha - Trilha 5: Igreja e Missão",
            "type": "PARAGRAPH"
          },
          {
            "text": "Primeiro estudo: O que é a Igreja?",
            "type": "PARAGRAPH"
          },
          {
            "text": "Pergunta de abertura: A Igreja é um prédio, uma instituição ou um povo chamado para pertencer",
            "type": "PARAGRAPH"
          },
          {
            "text": "a Cristo e participar de sua missão?",
            "type": "PARAGRAPH"
          }
        ],
        "order": 17,
        "optional": false
      },
      {
        "id": "track-04-study-18-references-18",
        "studyId": "track-04-study-18",
        "type": "REFERENCES",
        "title": "Referências",
        "blocks": [
          {
            "text": "Hebreus 12:1-3",
            "type": "PARAGRAPH"
          },
          {
            "text": "Hebreus 10:23-25,35-39",
            "type": "PARAGRAPH"
          },
          {
            "text": "Tiago 1:2-4,12",
            "type": "PARAGRAPH"
          },
          {
            "text": "Romanos 5:1-5",
            "type": "PARAGRAPH"
          },
          {
            "text": "Filipenses 3:12-14",
            "type": "PARAGRAPH"
          },
          {
            "text": "2 Timóteo 4:6-8",
            "type": "PARAGRAPH"
          }
        ],
        "order": 18,
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
  APPLY: "aplique",
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
    heroImage: `track-04-study-${String(raw.number).padStart(2, "0")}-hero`,
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

export const track04DraftBatchPackage: StudyContentPackage = {
  contentVersion: "draft-track-04-studies-01-18-v1",
  tracks: [track],
  studies,
  sections,
  references: [],
};
