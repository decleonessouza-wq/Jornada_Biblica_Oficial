/**
 * Fases canônicas e atemporais do plano de leitura do Bíblia Jornada.
 *
 * Propósito teológico:
 * - apresentar toda a Escritura como uma única história redentora;
 * - acompanhar o plano eterno de Deus para a salvação do homem;
 * - organizar as 309 unidades canônicas por progresso de leitura, nunca por datas históricas;
 * - oferecer uma identidade semântica estável para cada fase.
 *
 * Compatibilidade:
 * - este módulo não substitui src/data/phases.ts enquanto os consumidores legados
 *   ainda dependerem de startDate/endDate;
 * - HomeScreen, PlanScreen e ReadingScreen serão migrados em etapas próprias;
 * - o campo `key` é a identidade semântica; `order` serve apenas para ordenação/exibição.
 */

import { REQUIRED_READING_UNIT_COUNT } from "./planEngineV2";

export const CANONICAL_PLAN_PHASE_COUNT = 10 as const;

export type CanonicalPlanPhaseKey =
  | "ORIGINS_FALL_REDEMPTION_NEED"
  | "COVENANT_LAW_PEOPLE"
  | "KINGDOM_WISDOM_HUMAN_FAILURE"
  | "PROPHETS_JUDGMENT_MESSIAH"
  | "RESTORATION_MESSIAH_PREP"
  | "INCARNATION_KINGDOM_REDEMPTION"
  | "CHURCH_MISSION"
  | "GRACE_SANCTIFICATION_ENDURANCE"
  | "WORSHIP_DEPENDENCE"
  | "CONSUMMATION_ETERNAL_HOPE";

export type CanonicalPlanPhase = Readonly<{
  key: CanonicalPlanPhaseKey;
  order: number;
  title: string;
  description: string;
  theologicalFocus: string;
  messianicConnection: string;
  startReadingOrder: number;
  endReadingOrder: number;
}>;

export const CANONICAL_PLAN_PHASES = [
  {
    key: "ORIGINS_FALL_REDEMPTION_NEED",
    order: 1,
    title: "Origens, Queda e Necessidade de Redenção",
    description:
      "Da criação ao drama do sofrimento humano, esta fase apresenta Deus como Criador e soberano, a entrada do pecado no mundo e a necessidade universal de redenção.",
    theologicalFocus:
      "Criação, queda, pecado, promessa, fé, sofrimento, soberania de Deus e necessidade de um Redentor.",
    messianicConnection:
      "A promessa da descendência da mulher em Gênesis 3:15 inaugura a esperança redentora que culmina em Cristo, o vencedor sobre o pecado e a morte.",
    startReadingOrder: 1,
    endReadingOrder: 25,
  },
  {
    key: "COVENANT_LAW_PEOPLE",
    order: 2,
    title: "Aliança, Lei e Formação do Povo",
    description:
      "Deus liberta, forma e conduz um povo da aliança, revelando Sua santidade, Sua graça e o padrão de comunhão que prepara o caminho da redenção.",
    theologicalFocus:
      "Êxodo, aliança, lei, tabernáculo, sacrifícios, santidade, deserto, conquista, juízes e preservação do povo da promessa.",
    messianicConnection:
      "A libertação, o cordeiro, os sacrifícios, o sacerdócio e a presença de Deus entre o povo antecipam a obra perfeita de Cristo e a nova aliança.",
    startReadingOrder: 26,
    endReadingOrder: 78,
  },
  {
    key: "KINGDOM_WISDOM_HUMAN_FAILURE",
    order: 3,
    title: "Reino, Sabedoria e Fracasso Humano",
    description:
      "A história dos reis e a literatura de sabedoria revelam tanto a bondade do governo de Deus quanto a incapacidade humana de produzir justiça e salvação por seus próprios caminhos.",
    theologicalFocus:
      "Monarquia, aliança davídica, reino, sabedoria, adoração, pecado dos reis, divisão do reino e consequências da infidelidade.",
    messianicConnection:
      "A promessa de um Rei da linhagem de Davi aponta para Jesus, o Rei justo e eterno que cumpre aquilo que os reis humanos não puderam realizar.",
    startReadingOrder: 79,
    endReadingOrder: 118,
  },
  {
    key: "PROPHETS_JUDGMENT_MESSIAH",
    order: 4,
    title: "Profetas, Juízo e Esperança Messiânica",
    description:
      "Os profetas confrontam o pecado, anunciam o juízo e preservam a esperança de restauração, de um novo coração e do Reino definitivo de Deus.",
    theologicalFocus:
      "Arrependimento, justiça, juízo, misericórdia, restauração, nova aliança, Servo do Senhor, novo coração e Reino eterno.",
    messianicConnection:
      "As promessas proféticas convergem no Messias: o Servo sofredor, o Filho do Homem e o Rei cujo domínio é eterno, cumpridos em Jesus Cristo.",
    startReadingOrder: 119,
    endReadingOrder: 173,
  },
  {
    key: "RESTORATION_MESSIAH_PREP",
    order: 5,
    title: "Restauração e Preparação para o Messias",
    description:
      "O retorno, a reconstrução e a releitura da história de Israel demonstram a fidelidade de Deus em preservar Seu povo e Sua promessa até a chegada do Messias.",
    theologicalFocus:
      "Retorno do exílio, templo, reconstrução, providência, renovação da aliança, preservação da linhagem e expectativa messiânica.",
    messianicConnection:
      "Mesmo após o exílio, Deus preserva a promessa davídica e conduz a história para a chegada de Cristo, o verdadeiro Rei e o verdadeiro Templo.",
    startReadingOrder: 174,
    endReadingOrder: 204,
  },
  {
    key: "INCARNATION_KINGDOM_REDEMPTION",
    order: 6,
    title: "Encarnação, Reino e Redenção em Cristo",
    description:
      "Nos Evangelhos, as promessas se tornam realidade: o Filho de Deus entra na história, anuncia o Reino, revela o Pai, entrega Sua vida e ressuscita.",
    theologicalFocus:
      "Encarnação, identidade de Jesus, Reino de Deus, discipulado, sinais, cruz, expiação, ressurreição e vitória.",
    messianicConnection:
      "Jesus é o centro e o cumprimento do plano redentor: o Verbo encarnado, Cordeiro de Deus, Filho de Davi, Servo sofredor, Rei e Salvador ressuscitado.",
    startReadingOrder: 205,
    endReadingOrder: 233,
  },
  {
    key: "CHURCH_MISSION",
    order: 7,
    title: "Igreja e Missão",
    description:
      "O Cristo ressuscitado envia o Espírito Santo, forma Sua Igreja e leva o Evangelho de Jerusalém às nações.",
    theologicalFocus:
      "Ascensão, Pentecostes, Espírito Santo, nascimento da Igreja, testemunho, missão, expansão do Evangelho e inclusão das nações.",
    messianicConnection:
      "Jesus ressuscitado reina e continua Sua obra por meio do Espírito Santo e da Igreja, fazendo chegar a salvação às nações.",
    startReadingOrder: 234,
    endReadingOrder: 240,
  },
  {
    key: "GRACE_SANCTIFICATION_ENDURANCE",
    order: 8,
    title: "Graça, Santificação e Perseverança",
    description:
      "As cartas apostólicas explicam a salvação recebida pela graça e mostram como a nova vida em Cristo transforma a fé, a Igreja, os relacionamentos e a perseverança.",
    theologicalFocus:
      "Justificação, graça, fé, união com Cristo, Espírito Santo, Igreja, santificação, maturidade, sofrimento, verdade e perseverança.",
    messianicConnection:
      "Cristo é apresentado como fundamento da justificação, Cabeça da Igreja, Sumo Sacerdote, exemplo de sofrimento fiel e esperança segura da perseverança cristã.",
    startReadingOrder: 241,
    endReadingOrder: 270,
  },
  {
    key: "WORSHIP_DEPENDENCE",
    order: 9,
    title: "Adoração e Dependência de Deus",
    description:
      "Os Salmos conduzem o povo redimido a responder a Deus com oração, louvor, arrependimento, confiança, gratidão e esperança.",
    theologicalFocus:
      "Adoração, oração, lamentação, arrependimento, confiança, Palavra de Deus, realeza, gratidão e esperança.",
    messianicConnection:
      "Os Salmos alimentam a esperança do Rei ungido e encontram em Cristo seu cumprimento maior, formando a oração e a adoração do povo redimido.",
    startReadingOrder: 271,
    endReadingOrder: 301,
  },
  {
    key: "CONSUMMATION_ETERNAL_HOPE",
    order: 10,
    title: "Consumação e Esperança Eterna",
    description:
      "A jornada termina com a vitória definitiva de Deus, o juízo do mal, a restauração de todas as coisas e a comunhão eterna entre Deus e Seu povo.",
    theologicalFocus:
      "Senhorio de Cristo, perseverança, conflito final, juízo, vitória, ressurreição, novo céu, nova terra e Nova Jerusalém.",
    messianicConnection:
      "Jesus é o Cordeiro vencedor, Rei dos reis, Alfa e Ômega. Nele o plano eterno de Deus alcança sua consumação: todas as coisas são feitas novas e Deus habita para sempre com Seu povo.",
    startReadingOrder: 302,
    endReadingOrder: 309,
  },
] as const satisfies readonly CanonicalPlanPhase[];

export function getCanonicalPlanPhaseByReadingOrder(
  readingOrder: number
): CanonicalPlanPhase | null {
  if (
    !Number.isInteger(readingOrder) ||
    readingOrder < 1 ||
    readingOrder > REQUIRED_READING_UNIT_COUNT
  ) {
    return null;
  }

  return (
    CANONICAL_PLAN_PHASES.find(
      (phase) =>
        readingOrder >= phase.startReadingOrder &&
        readingOrder <= phase.endReadingOrder
    ) ?? null
  );
}
