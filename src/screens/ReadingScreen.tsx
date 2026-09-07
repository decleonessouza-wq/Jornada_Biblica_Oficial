import {
  View,
  Text,
  ScrollView,
  Alert,
  Linking,
  Pressable,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Platform,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useEffect, useMemo, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import { readingPlan } from "../data/readingPlan";
import type { Phase } from "../data/phases";
import { getPlanPhaseForOffset } from "../domain/plan/planPhaseProjection";
import { projectPlanCivilDate } from "../domain/plan/planCivilSchedule";
import { resolvePlanCivilDayPolicy } from "../domain/plan/planSpecialDayPolicy";
import type { RootStackParamList } from "../navigation/types";
import { addCompletedDay } from "../services/progressStore";
import { projectCanonicalStructuredPlan } from "../domain/plan/canonicalStructuredPlanV2";
import { buildBibleReadingProviderTarget } from "../services/bibleReadingProviderAdapter";
import { loadPreferredOfflineBibleVersion } from "../bible/state/bibleReaderPreferencesStore";
import {
  getJourneyBibleReaderRouteForReference,
  getJourneyBibleReaderRouteForText,
} from "../services/journeyBibleReaderAdapter";

// ✅ plano atemporal
import {
  getPlanOffsetForDate,
  getPlanStartDate,
} from "../services/progressStore";

type Props = {
  route: {
    params?: {
      date?: string; // ISO local YYYY-MM-DD
      reference?: string;
      isSunday?: boolean;
    };
  };
};

type BibleVersion = "ARC" | "NVI" | "ACF" | "KJ";
type OpenMode = "IN_APP" | "BROWSER";

type Nav = NativeStackNavigationProp<RootStackParamList, "Reading">;

const VERSION_KEY = "preferredBibleVersion";
const OPEN_MODE_KEY = "preferredReadingOpenMode";
const COMPLETED_KEY = "completedDays";

// ✅ gratidão por data
const GRATITUDE_KEY = "gratitudeByDate";

function normalizeTextKeepNumbers(s: string) {
  return s
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isIsoDateString(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function uniqueSortedIsoDates(list: unknown[]): string[] {
  const set = new Set<string>();
  for (const item of list) {
    if (isIsoDateString(item)) set.add(item);
  }
  return Array.from(set).sort();
}

/* ==========================
   DATE UTILS (LOCAL SAFE)
========================== */

function isoToLocalNoon(iso: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return new Date(iso);
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  return new Date(y, mo, d, 12, 0, 0, 0);
}

function dateToIsoLocal(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDaysIso(iso: string, days: number): string {
  const d = isoToLocalNoon(iso);
  d.setDate(d.getDate() + days);
  return dateToIsoLocal(d);
}

function isSundayIso(iso: string): boolean {
  const d = isoToLocalNoon(iso);
  return d.getDay() === 0;
}

/* ==========================
   REFERENCE PARSERS
========================== */

function parseReference(reference: string) {
  const raw = reference.trim();
  const parts = raw.split(/\s+/);
  if (parts.length < 2) return { book: raw, chapter: "", raw };

  const last = parts[parts.length - 1];
  const book = parts.slice(0, parts.length - 1).join(" ");

  if (!/^\d/.test(last)) return { book: raw, chapter: "", raw };

  return { book, chapter: last, raw };
}

function isMultiPassage(reference: string) {
  const r = reference.trim();
  return r.includes(";") || r.includes(",");
}

function splitPassages(reference: string): string[] {
  const raw = reference.trim();

  if (/natal/i.test(raw)) return ["Natal"];

  const normalized = raw.replace(/;/g, ",");
  const parts = normalized
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  return parts.length > 0 ? parts : [raw];
}

const SINGLE_CHAPTER_TOKENS = new Set(["ob", "fm", "jd", "2jo", "3jo"]);

function ensureChapterForSingleChapterBooks(passage: string) {
  const trimmed = passage.trim();
  if (!trimmed) return trimmed;

  const parsed = parseReference(trimmed);
  if (parsed.chapter) return trimmed;

  const key = normalizeTextKeepNumbers(trimmed);
  if (SINGLE_CHAPTER_TOKENS.has(key)) return `${trimmed} 1`;

  return trimmed;
}

/**
 * Map de livros/abreviações -> BibliaOnline
 */
const bibliaOnlineBookMap: Record<string, string> = {
  // AT
  gn: "gn",
  ex: "ex",
  lv: "lv",
  nm: "nm",
  dt: "dt",
  js: "js",
  jz: "jz",
  rt: "rt",
  "1sm": "1sm",
  "2sm": "2sm",
  "1rs": "1rs",
  "2rs": "2rs",
  "1cr": "1cr",
  "2cr": "2cr",
  ed: "ed",
  ne: "ne",
  et: "et",
  job: "job",
  sl: "sl",
  pv: "pv",
  ec: "ec",
  ct: "ct",
  is: "is",
  jr: "jr",
  lm: "lm",
  ez: "ez",
  dn: "dn",
  os: "os",
  jl: "jl",
  am: "am",
  ob: "ob",
  jn: "jn",
  mq: "mq",
  na: "na",
  hc: "hc",
  sf: "sf",
  ag: "ag",
  zc: "zc",
  ml: "ml",

  // NT
  mt: "mt",
  mc: "mc",
  lc: "lc",
  jo: "jo",
  at: "at",
  rm: "rm",
  "1co": "1co",
  "2co": "2co",
  gl: "gl",
  ef: "ef",
  fp: "fp",
  cl: "cl",
  "1ts": "1ts",
  "2ts": "2ts",
  "1tm": "1tm",
  "2tm": "2tm",
  tt: "tt",
  fm: "fm",
  hb: "hb",
  tg: "tg",
  "1pe": "1pe",
  "2pe": "2pe",
  "1jo": "1jo",
  "2jo": "2jo",
  "3jo": "3jo",
  jd: "jd",
  ap: "ap",

  // nomes comuns
  genesis: "gn",
  exodo: "ex",
  levitico: "lv",
  numeros: "nm",
  deuteronomio: "dt",
  josue: "js",
  juizes: "jz",
  rute: "rt",
  "1 samuel": "1sm",
  "2 samuel": "2sm",
  "1 reis": "1rs",
  "2 reis": "2rs",
  "1 cronicas": "1cr",
  "2 cronicas": "2cr",
  esdras: "ed",
  neemias: "ne",
  ester: "et",
  jó: "jó",
  salmos: "sl",
  proverbios: "pv",
  eclesiastes: "ec",
  cantares: "ct",
  isaias: "is",
  jeremias: "jr",
  lamentacoes: "lm",
  ezequiel: "ez",
  daniel: "dn",
  oseias: "os",
  joel: "jl",
  amos: "am",
  obadias: "ob",
  jonas: "jn",
  miqueias: "mq",
  naum: "na",
  habacuque: "hc",
  sofonias: "sf",
  ageu: "ag",
  zacarias: "zc",
  malaquias: "ml",
  mateus: "mt",
  marcos: "mc",
  lucas: "lc",
  joao: "jo",
  atos: "at",
  romanos: "rm",
  "1 corintios": "1co",
  "2 corintios": "2co",
  galatas: "gl",
  efesios: "ef",
  filipenses: "fp",
  colossenses: "cl",
  "1 tessalonicenses": "1ts",
  "2 tessalonicenses": "2ts",
  "1 timoteo": "1tm",
  "2 timoteo": "2tm",
  tito: "tt",
  filemom: "fm",
  hebreus: "hb",
  tiago: "tg",
  "1 pedro": "1pe",
  "2 pedro": "2pe",
  "1 joao": "1jo",
  "2 joao": "2jo",
  "3 joao": "3jo",
  judas: "jd",
  apocalipse: "ap",
};

function buildBibleGatewayUrl(reference: string, version: "ARC" | "NVI") {
  const q = encodeURIComponent(reference.trim());
  const v = version === "ARC" ? "ARC" : "NVI-PT";
  return `https://www.biblegateway.com/passage/?search=${q}&version=${v}`;
}

function buildGoogleSearchUrl(query: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

function getBibliaOnlineBookAbbr(bookRaw: string) {
  if (/jó/i.test(bookRaw)) return "job";
  const key = normalizeTextKeepNumbers(bookRaw);
  return bibliaOnlineBookMap[key] ?? null;
}

function buildBibliaOnlineUrl(reference: string, versionPath: "acf" | "bkj") {
  const parsed = parseReference(reference);

  if (!parsed.chapter || !/^\d+(-\d+)?$/.test(parsed.chapter)) return null;

  const abbr = getBibliaOnlineBookAbbr(parsed.book);
  if (!abbr) return null;

  return `https://www.bibliaonline.com.br/${versionPath}/${abbr}/${parsed.chapter}`;
}

function buildReadingUrl(reference: string, version: BibleVersion) {
  if (version === "ARC") return buildBibleGatewayUrl(reference, "ARC");
  if (version === "NVI") return buildBibleGatewayUrl(reference, "NVI");

  if (version === "ACF") {
    return buildBibliaOnlineUrl(reference, "acf") ?? buildGoogleSearchUrl(`Bíblia Online ACF ${reference}`);
  }

  return buildBibliaOnlineUrl(reference, "bkj") ?? buildGoogleSearchUrl(`Bíblia BKJ ${reference}`);
}

/* ==========================
   EXPERIÊNCIA ESPIRITUAL (FIXO, SEM IA)
========================== */

const DEFAULT_PRAYER =
  "Senhor, abre os meus olhos para ver as maravilhas da tua Palavra. Dá-me um coração humilde, obediente e cheio de fé. Amém.";

const DEFAULT_REFLECTION =
  "Enquanto lê, observe: (1) O que Deus revela sobre Si mesmo? (2) O que isso revela sobre o coração humano? (3) Qual é a resposta prática de obediência e fé para hoje?";

const PHASE_SPIRITUAL: Record<number, { prayer: string; reflection: string }> = {
  1: {
    prayer:
      "Pai, firma meus fundamentos na tua Palavra. Dá-me fé obediente e coração humilde para começar bem esta jornada. Amém.",
    reflection:
      "Procure hoje: o que Deus ordena, o que Deus promete e como Ele conduz Seu povo. Pergunte: qual passo simples de obediência eu preciso dar hoje?",
  },
  2: {
    prayer:
      "Senhor, enquanto preparas o teu povo, prepara também o meu coração. Que eu confie nas tuas alianças e no teu cuidado. Amém.",
    reflection:
      "Observe alianças, promessas e direção. Pergunte: onde Deus está me chamando a confiar mais e a obedecer com constância?",
  },
  3: {
    prayer: "Deus Santo, dá-me arrependimento verdadeiro e esperança firme no Messias prometido. Amém.",
    reflection:
      "Veja alertas, convites ao arrependimento e sinais de esperança. Pergunte: que ajuste Deus está pedindo hoje no meu coração?",
  },
  4: {
    prayer:
      "Senhor, ensina-me a esperar em silêncio confiante. Mesmo quando não vejo, eu sei que estás trabalhando. Amém.",
    reflection:
      "Reflita: como lidar com o silêncio e a espera com fidelidade? O que você precisa sustentar em oração?",
  },
  5: {
    prayer: "Jesus, eu me coloco aos teus pés. Fala comigo pelos Evangelhos e transforma meu coração. Amém.",
    reflection: "Observe o caráter de Cristo e seus chamados. Pergunte: o que eu preciso imitar de Jesus hoje?",
  },
  6: {
    prayer:
      "Espírito Santo, fortalece minha fé e meu testemunho. Que eu viva como parte viva da tua Igreja. Amém.",
    reflection:
      "Veja como Deus guia e fortalece a Igreja. Pergunte: como posso ser mais fiel e ativo no corpo de Cristo?",
  },
  7: {
    prayer:
      "Senhor, renova minha mente e minha prática. Que eu viva uma fé real, consistente e santa. Amém.",
    reflection:
      "Observe instruções práticas. Pergunte: qual prática eu preciso aplicar hoje (perdão, disciplina, oração, santidade)?",
  },
  8: {
    prayer:
      "Senhor, sustenta-me na perseverança. Dá-me maturidade e firmeza nas provações. Amém.",
    reflection:
      "Procure encorajamentos à fidelidade. Pergunte: o que eu preciso manter firme, mesmo quando é difícil?",
  },
  9: {
    prayer: "Jesus, fortalece minha esperança na tua vitória final. Dá-me olhos para a eternidade. Amém.",
    reflection:
      "Observe vitória, justiça e consumação. Pergunte: o que muda na minha rotina quando eu lembro que Cristo reina?",
  },
  10: {
    prayer:
      "Senhor, fixa meu coração na esperança eterna. Que eu termine esta jornada amando mais a ti e à tua Palavra. Amém.",
    reflection:
      "Reflita: como a eternidade muda minhas prioridades? O que preciso ajustar para viver com propósito e fidelidade?",
  },
};

function getSpiritualContent(params: { phaseId?: number | null; isSunday: boolean; isNatal: boolean }) {
  const { phaseId, isSunday, isNatal } = params;

  if (isNatal) {
    return {
      prayer:
        "Senhor Jesus, obrigado porque vieste ao mundo para nos salvar. Que teu nascimento renove minha fé e minha esperança hoje. Amém.",
      reflection:
        "Leia como quem recebe um presente: observe as promessas cumpridas, a humildade de Cristo e o convite para adorá-lo com todo o coração.",
    };
  }

  if (isSunday) {
    return {
      prayer:
        "Senhor, hoje eu desacelero diante de ti. Silencia minha alma, renova minha alegria e firma meus passos na tua vontade. Amém.",
      reflection:
        "Revise sua semana: o que Deus te ensinou? O que você precisa confessar, agradecer e ajustar? Escreva uma frase de gratidão.",
    };
  }

  const hit = typeof phaseId === "number" ? PHASE_SPIRITUAL[phaseId] : null;

  return {
    prayer: hit?.prayer ?? DEFAULT_PRAYER,
    reflection: hit?.reflection ?? DEFAULT_REFLECTION,
  };
}

/* ==========================
   ✅ PLANO ATEMPORAL (LEITURA DO DIA)
========================== */

type PlanResolved = {
  mode: "ATEMPORAL" | "LEGACY";
  planStartDate?: string | null;
  isSunday: boolean;
  reference: string;
};

// ✅ (única definição) — sequência do plano sem domingos
function getNonSundaySequence(): string[] {
  return readingPlan.filter((d) => !d.isSunday).map((d) => d.reference);
}

async function resolvePlanForDate(dateIso: string, fallbackReference: string): Promise<PlanResolved> {
  const start = await getPlanStartDate();

  if (start && isIsoDateString(start)) {
    const projection = projectPlanCivilDate(start, dateIso);

    if (!projection.policy.consumesReadingUnit) {
      return {
        mode: "ATEMPORAL",
        planStartDate: start,
        isSunday: projection.policy.isSunday,
        reference: projection.policy.displayReference,
      };
    }

    const seq = getNonSundaySequence();
    const idx = projection.readingUnitIndex;

    if (projection.isBeforeStart || idx === null) {
      return {
        mode: "ATEMPORAL",
        planStartDate: start,
        isSunday: false,
        reference: fallbackReference,
      };
    }

    if (idx >= seq.length) {
      return {
        mode: "ATEMPORAL",
        planStartDate: start,
        isSunday: false,
        reference: "✅ Plano concluído — revisar",
      };
    }

    return {
      mode: "ATEMPORAL",
      planStartDate: start,
      isSunday: false,
      reference: seq[idx],
    };
  }

  const policy = resolvePlanCivilDayPolicy(dateIso);

  if (!policy.consumesReadingUnit) {
    return {
      mode: "LEGACY",
      isSunday: policy.isSunday,
      reference: policy.displayReference,
    };
  }

  return {
    mode: "LEGACY",
    isSunday: false,
    reference: fallbackReference,
  };
}

/* ==========================
   UI HELPERS
========================== */

function formatDateBr(iso: string) {
  // YYYY-MM-DD -> DD/MM/YYYY
  const p = iso.split("-");
  if (p.length !== 3) return iso;
  return `${p[2]}/${p[1]}/${p[0]}`;
}

function shadowCard() {
  return Platform.select({
    android: { elevation: 3 },
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    default: {},
  }) as any;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function PrimaryButton({
  title,
  onPress,
  disabled,
  icon,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!!disabled}
      style={({ pressed }) => [
        styles.btnPrimary,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
      ]}
    >
      <Text style={[styles.btnPrimaryText, disabled && { opacity: 0.7 }]}>
        {icon ? `${icon} ` : ""}
        {title}
      </Text>
    </Pressable>
  );
}

function SecondaryButton({
  title,
  onPress,
  disabled,
  icon,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!!disabled}
      style={({ pressed }) => [
        styles.btnSecondary,
        disabled && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
      ]}
    >
      <Text style={[styles.btnSecondaryText, disabled && { opacity: 0.7 }]}>
        {icon ? `${icon} ` : ""}
        {title}
      </Text>
    </Pressable>
  );
}

function Pill({ label, tone = "neutral" }: { label: string; tone?: "neutral" | "info" | "warn" }) {
  const bg =
    tone === "info"
      ? "rgba(231,237,242,0.94)"
      : tone === "warn"
      ? "rgba(255,243,207,0.95)"
      : "rgba(255,255,255,0.90)";
  const fg =
    tone === "warn"
      ? colors.warning
      : colors.primary;

  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.pillText, { color: fg }]}>{label}</Text>
    </View>
  );
}

function Card({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "accent" | "spiritual" | "warm";
}) {
  return (
    <View
      style={[
        styles.card,
        tone === "accent" && styles.cardAccent,
        tone === "spiritual" && styles.cardSpiritual,
        tone === "warm" && styles.cardWarm,
        shadowCard(),
      ]}
    >
      {children}
    </View>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <View style={styles.sectionIconBadge}>
          <Text style={styles.sectionTitleIcon}>{icon}</Text>
        </View>
        <Text style={styles.sectionTitleText}>{title}</Text>
      </View>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function Chip({
  label,
  selected,
  onPress,
  tone = "primary",
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  tone?: "primary" | "secondary";
}) {
  const bgSelected = tone === "primary" ? colors.primary : colors.secondary;
  const border = selected ? "transparent" : "rgba(0,0,0,0.08)";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: selected ? bgSelected : "#fff",
          borderColor: border,
          opacity: pressed ? 0.92 : 1,
        },
      ]}
    >
      <Text style={{ color: selected ? "#fff" : colors.text, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}

export default function ReadingScreen({ route }: Props) {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();

  const routeDate = route?.params?.date ?? "";
  const routeReference = route?.params?.reference ?? "Leitura do dia";

  const [resolved, setResolved] = useState<PlanResolved>({
    mode: "LEGACY",
    isSunday: !!route?.params?.isSunday,
    reference: routeReference,
  });

  const date = routeDate;
  const reference = resolved.reference;

  const civilDayPolicy = useMemo(() => {
    if (!date || !isIsoDateString(date)) return null;
    return resolvePlanCivilDayPolicy(date);
  }, [date]);

  const isSunday = civilDayPolicy?.isSunday ?? resolved.isSunday;
  const isNatal =
    civilDayPolicy?.kind === "CHRISTMAS" ||
    /natal/i.test(reference.trim());

  const parsed = useMemo(() => parseReference(reference), [reference]);

  const [version, setVersion] = useState<BibleVersion>("ARC");
  const [openMode, setOpenMode] = useState<OpenMode>("IN_APP");
  const [showWebView, setShowWebView] = useState(false);

  const [completedDays, setCompletedDays] = useState<string[]>([]);

  const [gratitudeText, setGratitudeText] = useState("");
  const [savedGratitude, setSavedGratitude] = useState<string | null>(null);

  const passages = useMemo(() => {
    if (isNatal) return ["Natal"];
    if (isSunday) return ["Meditar"];
    if (!isMultiPassage(reference)) return [reference];
    return splitPassages(reference);
  }, [reference, isSunday, isNatal]);

  const [selectedPassageIndex, setSelectedPassageIndex] = useState(0);

  const [currentPhase, setCurrentPhase] = useState<Phase | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!date) {
        if (mounted) setCurrentPhase(null);
        return;
      }

      try {
        const offset = await getPlanOffsetForDate(date);
        const phase =
          offset === null ? null : getPlanPhaseForOffset(offset);

        if (mounted) setCurrentPhase(phase);
      } catch (error) {
        console.warn("PLAN_PHASE_RESOLUTION_FAILED", error);
        if (mounted) setCurrentPhase(null);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [date]);

  const spiritual = useMemo(() => {
    return getSpiritualContent({
      phaseId: (currentPhase as any)?.id ?? null,
      isSunday,
      isNatal,
    });
  }, [currentPhase, isSunday, isNatal]);

  const canMarkRead = useMemo(() => {
    if (!date || !civilDayPolicy) return false;
    return civilDayPolicy.canMarkRead;
  }, [date, civilDayPolicy]);

  const isReadToday = useMemo(() => {
    if (!date) return false;
    return completedDays.includes(date);
  }, [completedDays, date]);

  const prevDate = useMemo(() => (date ? addDaysIso(date, -1) : null), [date]);
  const nextDate = useMemo(() => (date ? addDaysIso(date, 1) : null), [date]);

  useEffect(() => {
    setSelectedPassageIndex(0);
    setShowWebView(false);
  }, [reference]);

  useEffect(() => {
    (async () => {
      if (!date) return;
      const res = await resolvePlanForDate(date, routeReference);
      setResolved(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const loadGratitudeForDate = useCallback(async (dateIso: string) => {
    if (!dateIso) {
      setSavedGratitude(null);
      setGratitudeText("");
      return;
    }
    try {
      const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsedObj = raw ? JSON.parse(raw) : {};
      const map = parsedObj && typeof parsedObj === "object" ? parsedObj : {};
      const existing = typeof map[dateIso] === "string" ? map[dateIso] : null;

      setSavedGratitude(existing);
      setGratitudeText(existing ?? "");
    } catch {
      setSavedGratitude(null);
      setGratitudeText("");
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(VERSION_KEY);
        if (stored === "ARC" || stored === "NVI" || stored === "ACF" || stored === "KJ") setVersion(stored);
        else setVersion("ARC");
      } catch {
        setVersion("ARC");
      }

      try {
        const storedMode = await AsyncStorage.getItem(OPEN_MODE_KEY);
        if (storedMode === "IN_APP" || storedMode === "BROWSER") setOpenMode(storedMode);
        else setOpenMode("IN_APP");
      } catch {
        setOpenMode("IN_APP");
      }

      try {
        const storedCompleted = await AsyncStorage.getItem(COMPLETED_KEY);
        const parsedCompleted = storedCompleted ? JSON.parse(storedCompleted) : [];
        const normalized = uniqueSortedIsoDates(Array.isArray(parsedCompleted) ? parsedCompleted : []);
        setCompletedDays(normalized);
        await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(normalized));
      } catch {
        setCompletedDays([]);
      }

      await loadGratitudeForDate(date);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      await loadGratitudeForDate(date);
    })();
  }, [date, loadGratitudeForDate]);

  async function saveGratitude() {
    if (!date) {
      Alert.alert("Sem data", "Não foi possível salvar gratidão sem a data do dia.");
      return;
    }

    const text = gratitudeText.trim();

    if (text.length === 0) {
      Alert.alert("Campo vazio", "Escreva 1 frase de gratidão (ou deixe como estava).");
      return;
    }

    if (text.length > 140) {
      Alert.alert("Muito longo", "Tente resumir em até 140 caracteres (1 frase).");
      return;
    }

    try {
      const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsedObj = raw ? JSON.parse(raw) : {};
      const map = parsedObj && typeof parsedObj === "object" ? parsedObj : {};

      map[date] = text;

      await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(map));
      setSavedGratitude(text);

      Alert.alert("Salvo ✅", "Sua gratidão foi registrada.");
    } catch {
      Alert.alert("Erro", "Não foi possível salvar sua gratidão.");
    }
  }

  async function deleteGratitude() {
    if (!date) return;
    try {
      const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsedObj = raw ? JSON.parse(raw) : {};
      const map = parsedObj && typeof parsedObj === "object" ? parsedObj : {};

      if (map[date]) delete map[date];

      await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(map));
      setSavedGratitude(null);
      setGratitudeText("");

      Alert.alert("Removido", "Gratidão do dia removida.");
    } catch {
      Alert.alert("Erro", "Não foi possível remover.");
    }
  }

  async function refreshCompleted() {
    try {
      const storedCompleted = await AsyncStorage.getItem(COMPLETED_KEY);
      const parsedCompleted = storedCompleted ? JSON.parse(storedCompleted) : [];
      const normalized = uniqueSortedIsoDates(Array.isArray(parsedCompleted) ? parsedCompleted : []);
      setCompletedDays(normalized);
      await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(normalized));
    } catch {
      // ignore
    }
  }

  async function selectVersion(v: BibleVersion) {
    setVersion(v);
    setShowWebView(false);
    try {
      await AsyncStorage.setItem(VERSION_KEY, v);
    } catch {}
  }

  async function selectOpenMode(m: OpenMode) {
    setOpenMode(m);
    try {
      await AsyncStorage.setItem(OPEN_MODE_KEY, m);
    } catch {}
  }

  // ✅ após marcar como lido, re-sincroniza notificações (modo inteligente)
  async function syncNotificationsAfterProgressChange() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const svc: any = require("../services/notifications");

      if (typeof svc?.syncScheduledNotifications === "function") {
        await svc.syncScheduledNotifications();
      } else if (typeof svc?.rescheduleFromSettings === "function") {
        await svc.rescheduleFromSettings();
      } else if (typeof svc?.applyNotificationSettings === "function") {
        // fallback defensivo: apenas garante que está em dia
        await svc.applyNotificationSettings({
          enabled: true,
          timeHHMM: "08:00",
          smartSkipIfDoneToday: true,
          contentMode: "mixed",
        });
      }
    } catch (e) {
      // silencioso: nunca pode quebrar a leitura
      console.log("syncNotificationsAfterProgressChange (ignorado):", e);
    }
  }

  async function markAsRead() {
    if (!canMarkRead) return;
    if (!date) return;

    try {
      const result = await addCompletedDay(date);

      if (!result.added) {
        Alert.alert("Já marcado", "Este dia já está como concluído ✅");
        return;
      }

      setCompletedDays(result.days);

      // ✅ ponto-chave: se modo inteligente estiver ligado, a notificação do dia pode ser cancelada
      await syncNotificationsAfterProgressChange();

      Alert.alert("Concluído ✅", "Leitura marcada como lida!");
    } catch {
      Alert.alert("Erro", "Não foi possível marcar como lido.");
    }
  }

  const structuredProjection = useMemo(() => {
    if (resolved.mode !== "ATEMPORAL" || !resolved.planStartDate) return null;

    try {
      return projectCanonicalStructuredPlan(resolved.planStartDate);
    } catch (error) {
      console.warn("structuredProjection fallback para provider legado:", error);
      return null;
    }
  }, [resolved.mode, resolved.planStartDate]);

  const structuredReadingDay = useMemo(() => {
    if (!structuredProjection || !date || isSunday || isNatal) return null;

    const projectedDay =
      structuredProjection.calendarDays.find((day) => day.date === date) ?? null;

    if (!projectedDay || projectedDay.kind !== "READING") return null;

    if (projectedDay.readingUnit.reference !== reference) {
      console.warn("structuredReadingDay referência divergente; usando provider legado.", {
        date,
        resolvedReference: reference,
        structuredReference: projectedDay.readingUnit.reference,
      });
      return null;
    }

    return projectedDay;
  }, [structuredProjection, date, isSunday, isNatal, reference]);

  const selectedReferenceRaw = useMemo(() => {
    return passages[selectedPassageIndex] ?? reference;
  }, [passages, selectedPassageIndex, reference]);

  const selectedReferenceForUrl = useMemo(() => {
    return ensureChapterForSingleChapterBooks(selectedReferenceRaw);
  }, [selectedReferenceRaw]);

  const structuredSelectedPassage = useMemo(() => {
    if (!structuredReadingDay) return null;

    return (
      structuredReadingDay.readingUnit.bibleReference.passages[selectedPassageIndex] ??
      null
    );
  }, [structuredReadingDay, selectedPassageIndex]);

  const usesLocalBibleReader =
    !isSunday &&
    !isNatal &&
    (structuredReadingDay !== null || !isMultiPassage(reference));

  const structuredProviderTarget = useMemo(() => {
    if (
      usesLocalBibleReader ||
      !structuredSelectedPassage ||
      isSunday ||
      isNatal
    ) {
      return null;
    }

    try {
      return buildBibleReadingProviderTarget(structuredSelectedPassage, version);
    } catch (error) {
      console.warn("structuredProviderTarget fallback para provider legado:", error);
      return null;
    }
  }, [
    usesLocalBibleReader,
    structuredSelectedPassage,
    isSunday,
    isNatal,
    version,
  ]);

  const readingUrl = useMemo(() => {
    if (usesLocalBibleReader || isSunday || isNatal) return "";

    return (
      structuredProviderTarget?.url ??
      buildReadingUrl(selectedReferenceForUrl, version)
    );
  }, [
    usesLocalBibleReader,
    structuredProviderTarget,
    selectedReferenceForUrl,
    isSunday,
    isNatal,
    version,
  ]);

  async function openInLocalBibleReader() {
    if (!usesLocalBibleReader) {
      Alert.alert(
        "Não foi possível abrir",
        "Esta leitura ainda não está disponível no leitor bíblico local.",
      );
      return;
    }

    try {
      const versionId = await loadPreferredOfflineBibleVersion();

      const routeResult =
        structuredReadingDay !== null
          ? getJourneyBibleReaderRouteForReference({
              reference: structuredReadingDay.readingUnit.bibleReference,
              versionId,
              passageIndex: selectedPassageIndex,
            })
          : getJourneyBibleReaderRouteForText({
              referenceText: reference,
              versionId,
              passageIndex: 0,
            });

      if (!routeResult.ok) {
        console.warn(
          "JOURNEY_LOCAL_READER_ROUTE_FAILED",
          routeResult.error,
        );
        Alert.alert(
          "Não foi possível abrir",
          "Não foi possível preparar esta leitura na Bíblia agora.",
        );
        return;
      }

      navigation.navigate(
        "JourneyBibleReader",
        routeResult.routeParams,
      );
    } catch (error) {
      console.warn("JOURNEY_LOCAL_READER_OPEN_FAILED", error);
      Alert.alert(
        "Não foi possível abrir",
        "Não foi possível abrir esta leitura na Bíblia agora.",
      );
    }
  }

  async function openInBrowser() {
    if (isSunday || isNatal) return;

    try {
      const can = await Linking.canOpenURL(readingUrl);
      if (!can) throw new Error("cannot-open");
      await Linking.openURL(readingUrl);
    } catch {
      Alert.alert("Não foi possível abrir", "Seu dispositivo não conseguiu abrir o link da leitura.");
    }
  }

  function openAccordingToMode() {
    if (isSunday || isNatal) return;

    if (openMode === "BROWSER") {
      openInBrowser();
      return;
    }
    setShowWebView(true);
  }

  const versionLabel: Record<BibleVersion, string> = {
    ARC: "ARC",
    NVI: "NVI",
    ACF: "ACF",
    KJ: "KJ (PT)",
  };

  // ========
  // WebView
  // ========
  if (showWebView && !isSunday && !isNatal) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.webTopBar}>
          <View style={{ flex: 1 }}>
            <Text style={styles.webTitle} numberOfLines={1}>
              {selectedReferenceRaw} • {versionLabel[version]}
            </Text>
            <Text style={styles.webHint} numberOfLines={1}>
              Se não carregar, volte e use “Abrir no navegador”.
            </Text>
          </View>

          <Pressable onPress={() => setShowWebView(false)} style={styles.webBackBtn}>
            <Text style={styles.webBackText}>⬅️ Voltar</Text>
          </Pressable>
        </View>

        <WebView
          source={{ uri: readingUrl }}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.webLoading}>
              <ActivityIndicator />
              <Text style={{ marginTop: 10, color: colors.muted }}>Carregando leitura...</Text>
            </View>
          )}
          onError={() => {
            setShowWebView(false);
            Alert.alert("Não carregou no app", "Não foi possível carregar a leitura aqui. Quer abrir no navegador?", [
              { text: "Agora não", style: "cancel" },
              { text: "Abrir no navegador", onPress: openInBrowser },
            ]);
          }}
          onHttpError={() => {
            setShowWebView(false);
            Alert.alert("Erro ao carregar", "O site retornou erro. Quer abrir no navegador?", [
              { text: "Agora não", style: "cancel" },
              { text: "Abrir no navegador", onPress: openInBrowser },
            ]);
          }}
        />
      </SafeAreaView>
    );
  }

  // ========
  // Preview
  // ========
  const maxWidth = clamp(width, 360, 820);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.page, { paddingHorizontal: width >= 700 ? 24 : 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { width: "100%", maxWidth, alignSelf: "center" }]}>
          {/* HEADER / HERO */}
          <ImageBackground
            testID="reading-hero"
            source={require("../../assets/module-heroes/reading-hero.png")}
            style={styles.hero}
            imageStyle={styles.heroImage}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroRow}>
                <Pill label={date ? `📅 ${formatDateBr(date)}` : "📅"} tone="neutral" />
                {isNatal ? (
                <Pill label="Natal" tone="warn" />
              ) : isSunday ? (
                <Pill label="Domingo livre" tone="info" />
              ) : null}
            </View>

              <View style={styles.heroContent}>
                <Text style={styles.heroEyebrow}>
                  {isNatal ? "CELEBRAÇÃO" : isSunday ? "PAUSA E MEDITAÇÃO" : "LEITURA DO DIA"}
                </Text>
                <Text style={styles.heroTitle}>{reference}</Text>

                {isNatal ? (
                  <Text style={styles.heroSub}>Celebre o nascimento de Jesus com fé e gratidão.</Text>
                ) : isSunday ? (
                  <Text style={styles.heroSub}>Um dia para desacelerar, orar e ouvir a Palavra.</Text>
                ) : (
                  <Text style={styles.heroSub}>
                    {parsed.book}
                    {parsed.chapter ? ` • ${parsed.chapter}` : ""}
                  </Text>
                )}
              </View>

              {!!date && !isSunday && !isNatal && (
                <View style={styles.heroStatusRow}>
                  <Pill
                    label={isReadToday ? "✓ Concluído" : "Leitura pendente"}
                    tone={isReadToday ? "info" : "neutral"}
                  />
                  {currentPhase && !isNatal && (
                    <Text style={styles.heroPhaseText}>{(currentPhase as any)?.title ?? ""}</Text>
                  )}
                </View>
              )}
            </View>
          </ImageBackground>

          {/* AÇÃO PRINCIPAL */}
          <Card tone="accent">
            <SectionTitle
              icon={isNatal ? "🎄" : isSunday ? "🙏" : "📖"}
              title={isNatal ? "Natal" : isSunday ? "Meditação" : "Sua leitura"}
              subtitle={
                isNatal
                  ? "Celebre o nascimento de Cristo com calma e propósito."
                  : isSunday
                  ? "Reserve este momento para oração, revisão e gratidão."
                  : "Abra a passagem no leitor bíblico local e siga sua jornada."
              }
            />

            {!isSunday && !isNatal && passages.length > 1 ? (
              <>
                <Text style={styles.helper}>Esta leitura tem {passages.length} partes. Escolha uma:</Text>

                <View style={styles.chipsWrap}>
                  {passages.map((p, idx) => (
                    <Chip
                      key={`${p}-${idx}`}
                      label={p}
                      selected={idx === selectedPassageIndex}
                      tone="secondary"
                      onPress={() => {
                        setSelectedPassageIndex(idx);
                        setShowWebView(false);
                      }}
                    />
                  ))}
                </View>

                <Text style={styles.miniHelp}>
                  Obs.: livros de 1 capítulo (Ob, Fm, Jd, 2Jo, 3Jo) abrem direto como “capítulo 1”.
                </Text>
              </>
            ) : (
              <Text style={styles.helper}>
                {isNatal
                  ? "Celebre o nascimento de Jesus com a oração e a reflexão guiada deste dia."
                  : isSunday
                  ? "Use este dia para orar, meditar e revisar sua caminhada."
                  : usesLocalBibleReader
                  ? `Parte selecionada: ${selectedReferenceRaw}.`
                  : `Parte selecionada: ${selectedReferenceRaw} • Versão: ${versionLabel[version]}.`}
              </Text>
            )}

            {!usesLocalBibleReader &&
              !isSunday &&
              !isNatal &&
              selectedReferenceForUrl !== selectedReferenceRaw && (
              <Text style={styles.miniHelp}>Ajuste automático: abrindo como “{selectedReferenceForUrl}”</Text>
            )}

            <View style={{ height: 12 }} />

            {isSunday || isNatal ? (
              <View style={styles.localOnlyBox}>
                <Text style={styles.localOnlyLabel}>EXPERIÊNCIA LOCAL</Text>
                <Text style={styles.localOnlyText}>
                  Toda a experiência deste dia acontece aqui no Jornada, sem abrir sites externos.
                </Text>
              </View>
            ) : usesLocalBibleReader ? (
              <PrimaryButton
                title="Abrir na Bíblia"
                icon="📖"
                onPress={openInLocalBibleReader}
              />
            ) : (
              <PrimaryButton
                title={
                  openMode === "IN_APP"
                    ? `Abrir no app (${versionLabel[version]})`
                    : `Abrir no navegador (${versionLabel[version]})`
                }
                icon={openMode === "IN_APP" ? "📖" : "🌐"}
                onPress={openAccordingToMode}
              />
            )}

            {!isSunday &&
              !isNatal &&
              !usesLocalBibleReader && (
              <>
                <View style={{ height: 10 }} />
                <SecondaryButton
                  title={openMode === "IN_APP" ? "Abrir no navegador (alternativa)" : "Abrir no app (alternativa)"}
                  icon={openMode === "IN_APP" ? "🌐" : "📖"}
                  onPress={() => {
                    if (openMode === "IN_APP") openInBrowser();
                    else setShowWebView(true);
                  }}
                />
              </>
            )}

            {canMarkRead && (
              <>
                <View style={{ height: 14 }} />
                <PrimaryButton
                  title={isReadToday ? "Já marcado como lido" : "Marcar como lido"}
                  icon={isReadToday ? "✅" : "✔️"}
                  disabled={isReadToday}
                  onPress={markAsRead}
                />

                <Pressable onPress={refreshCompleted} style={styles.linkBtn}>
                  <Text style={styles.linkBtnText}>Atualizar status (se necessário)</Text>
                </Pressable>
              </>
            )}

            {/* informações internas do plano não são exibidas em produção */}
          </Card>

          {/* ORAÇÃO */}
          <Card tone="spiritual">
            <SectionTitle
              icon="🙏"
              title="Oração inicial"
              subtitle="Prepare o coração antes de continuar."
            />
            <Text style={styles.paragraph}>{spiritual.prayer}</Text>
          </Card>

          {/* REFLEXÃO */}
          <Card tone="spiritual">
            <SectionTitle
              icon="🧭"
              title="Reflexão guiada"
              subtitle="Leve a Palavra da leitura para a vida."
            />
            <Text style={styles.paragraph}>{spiritual.reflection}</Text>
          </Card>

          {/* GRATIDÃO */}
          {!!date && (
            <Card tone="warm">
              <SectionTitle
                icon="✍️"
                title="Gratidão"
                subtitle="Registre em uma frase o que marcou seu coração hoje."
              />
              <Text style={styles.helper}>
                Até 140 caracteres • salvo somente neste dispositivo.
              </Text>

              <TextInput
                value={gratitudeText}
                onChangeText={setGratitudeText}
                placeholder="Ex: Obrigado Senhor por..."
                placeholderTextColor="#9aa0a6"
                maxLength={140}
                multiline
                style={styles.textArea}
              />

              <View style={{ height: 10 }} />

              <PrimaryButton title="Salvar gratidão" icon="💾" onPress={saveGratitude} />

              <Pressable
                onPress={() => {
                  if (!savedGratitude) {
                    Alert.alert("Nada para remover", "Você ainda não salvou gratidão hoje.");
                    return;
                  }
                  Alert.alert("Remover gratidão?", "Deseja remover a gratidão deste dia?", [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Remover", style: "destructive", onPress: deleteGratitude },
                  ]);
                }}
                style={styles.removeGratitudeBtn}
              >
                <Text style={styles.removeGratitudeText}>Remover gratidão salva</Text>
              </Pressable>

              {savedGratitude && (
                <View style={styles.savedBox}>
                  <Text style={styles.savedText}>✅ Salvo: {savedGratitude}</Text>
                </View>
              )}
            </Card>
          )}

          {/* NAVEGAÇÃO */}
          {(prevDate || nextDate) && (
            <Card>
              <SectionTitle
                icon="↔"
                title="Navegação rápida"
                subtitle="Consulte o dia anterior ou avance para o próximo."
              />
              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <SecondaryButton
                    title="Anterior"
                    icon="⬅️"
                    disabled={!prevDate}
                    onPress={() => {
                      if (!prevDate) return;
                      navigation.navigate("Reading", {
                        date: prevDate,
                        reference: routeReference,
                        isSunday: isSundayIso(prevDate),
                      });
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SecondaryButton
                    title="Próxima"
                    icon="➡️"
                    disabled={!nextDate}
                    onPress={() => {
                      if (!nextDate) return;
                      navigation.navigate("Reading", {
                        date: nextDate,
                        reference: routeReference,
                        isSunday: isSundayIso(nextDate),
                      });
                    }}
                  />
                </View>
              </View>
            </Card>
          )}

          {/* PREFERÊNCIAS */}
          {!isSunday && !isNatal && !usesLocalBibleReader && (
            <Card>
              <SectionTitle
                icon="⚙️"
                title="Preferências"
                subtitle="Usadas apenas quando esta passagem precisar de provedor externo."
              />

              <Text style={styles.helper}>Versão bíblica (padrão: ARC)</Text>
              <View style={styles.chipsWrap}>
                {(["ARC", "NVI", "ACF", "KJ"] as BibleVersion[]).map((v) => (
                  <Chip key={v} label={versionLabel[v]} selected={v === version} tone="primary" onPress={() => selectVersion(v)} />
                ))}
              </View>

              <View style={{ height: 8 }} />

              <Text style={styles.helper}>Preferência de abertura</Text>
              <View style={styles.chipsWrap}>
                <Chip
                  label="Abrir no app"
                  selected={openMode === "IN_APP"}
                  tone="secondary"
                  onPress={() => selectOpenMode("IN_APP")}
                />
                <Chip
                  label="Abrir no navegador"
                  selected={openMode === "BROWSER"}
                  tone="secondary"
                  onPress={() => selectOpenMode("BROWSER")}
                />
              </View>

              <Text style={styles.miniHelp}>Isso fica salvo para as próximas leituras.</Text>
            </Card>
          )}

          <View style={{ height: 22 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 10,
    paddingBottom: 24,
  },
  container: {
    gap: 12,
  },

  hero: {
    borderRadius: 24,
    minHeight: 250,
    overflow: "hidden",
    ...shadowCard(),
  },
  heroImage: {
    borderRadius: 24,
  },
  heroOverlay: {
    flex: 1,
    minHeight: 250,
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: "space-between",
    backgroundColor: "rgba(13,43,69,0.46)",
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  heroEyebrow: {
    flex: 1,
    color: colors.secondary,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  heroContent: {
    paddingVertical: 18,
  },
  heroTitle: {
    fontSize: 31,
    lineHeight: 37,
    fontWeight: "900",
    color: colors.textInverse,
    textShadowColor: "rgba(0,0,0,0.55)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  heroSub: {
    marginTop: 7,
    maxWidth: "88%",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: colors.textInverse,
    textShadowColor: "rgba(0,0,0,0.52)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  heroPhaseText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    color: "rgba(255,255,255,0.92)",
  },

  pill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.42)",
  },
  pillText: {
    fontSize: 12,
    fontWeight: "900",
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  cardAccent: {
    backgroundColor: colors.surfaceAlt,
    borderColor: "rgba(13,43,69,0.24)",
  },
  cardSpiritual: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  cardWarm: {
    backgroundColor: colors.surfaceHighlight,
    borderColor: "rgba(240,180,41,0.34)",
  },

  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sectionIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  sectionTitleIcon: {
    fontSize: 16,
  },
  sectionTitleText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
    color: colors.textStrong,
  },
  sectionSubtitle: {
    marginTop: 6,
    marginLeft: 44,
    fontSize: 12,
    lineHeight: 17,
    color: colors.muted,
  },

  helper: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 19,
  },
  miniHelp: {
    marginTop: 8,
    fontSize: 12,
    color: colors.muted,
    lineHeight: 17,
  },
  paragraph: {
    color: colors.text,
    lineHeight: 23,
    fontSize: 15,
  },

  localOnlyBox: {
    borderRadius: 14,
    padding: 12,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: "rgba(13,43,69,0.14)",
  },
  localOnlyLabel: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.9,
    fontWeight: "900",
    color: colors.primary,
  },
  localOnlyText: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 19,
    color: colors.text,
  },

  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  textArea: {
    marginTop: 10,
    minHeight: 84,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    textAlignVertical: "top",
    fontSize: 14,
    lineHeight: 20,
  },

  savedBox: {
    marginTop: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(22,130,93,0.10)",
    borderWidth: 1,
    borderColor: "rgba(22,130,93,0.18)",
  },
  savedText: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.success,
    fontWeight: "800",
  },
  removeGratitudeBtn: {
    alignSelf: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
  },
  removeGratitudeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.muted,
    textDecorationLine: "underline",
  },

  btnPrimary: {
    minHeight: 48,
    backgroundColor: colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  btnSecondary: {
    minHeight: 46,
    backgroundColor: colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  btnSecondaryText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.1,
  },

  btnPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.94,
  },
  btnDisabled: {
    opacity: 0.52,
  },

  linkBtn: {
    alignSelf: "center",
    paddingVertical: 9,
    marginTop: 3,
  },
  linkBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.muted,
    textDecorationLine: "underline",
  },

  // WebView
  webTopBar: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  webTitle: {
    fontWeight: "800",
    color: colors.text,
  },
  webHint: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 2,
  },
  webBackBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
  },
  webBackText: {
    fontWeight: "800",
    color: colors.text,
  },
  webLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
