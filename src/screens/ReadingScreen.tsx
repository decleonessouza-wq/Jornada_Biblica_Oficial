import {
  View,
  Text,
  ScrollView,
  Button,
  Alert,
  Linking,
  Pressable,
  ActivityIndicator,
  TextInput,
  Platform,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import { readingPlan } from "../data/readingPlan";
import { phases } from "../data/phases";
import type { RootStackParamList } from "../app_router_off";

// ✅ centralizado no progressStore (plano atemporal + atrasos + overrides)
import {
  addCompletedDay,
  getPlanStartDate,
  getEffectiveReferenceForDate,
  PLAN_START_DATE_KEY,
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

function buildReadingUrl(reference: string, isSunday: boolean, version: BibleVersion) {
  if (isSunday) return buildGoogleSearchUrl("meditação e oração bíblica");

  if (/natal/i.test(reference.trim())) {
    return buildGoogleSearchUrl(
      "Evangelhos nascimento de Jesus Lucas 2 Mateus 1 profecias do Messias Isaías 9"
    );
  }

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
    prayer:
      "Deus Santo, dá-me arrependimento verdadeiro e esperança firme no Messias prometido. Amém.",
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
    prayer:
      "Jesus, eu me coloco aos teus pés. Fala comigo pelos Evangelhos e transforma meu coração. Amém.",
    reflection:
      "Observe o caráter de Cristo e seus chamados. Pergunte: o que eu preciso imitar de Jesus hoje?",
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
      "Pai, sustenta-me na perseverança. Dá-me maturidade e firmeza nas provações. Amém.",
    reflection:
      "Procure encorajamentos à fidelidade. Pergunte: o que eu preciso manter firme, mesmo quando é difícil?",
  },
  9: {
    prayer:
      "Jesus, fortalece minha esperança na tua vitória final. Dá-me olhos para a eternidade. Amém.",
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

  if (isSunday) {
    return {
      prayer:
        "Senhor, hoje eu desacelero diante de ti. Silencia minha alma, renova minha alegria e firma meus passos na tua vontade. Amém.",
      reflection:
        "Revise sua semana: o que Deus te ensinou? O que você precisa confessar, agradecer e ajustar? Escreva uma frase de gratidão.",
    };
  }

  if (isNatal) {
    return {
      prayer:
        "Senhor Jesus, obrigado porque vieste ao mundo para nos salvar. Que teu nascimento renove minha fé e minha esperança hoje. Amém.",
      reflection:
        "Leia como quem recebe um presente: observe as promessas cumpridas, a humildade de Cristo e o convite para adorá-lo com todo o coração.",
    };
  }

  const hit = typeof phaseId === "number" ? PHASE_SPIRITUAL[phaseId] : null;

  return {
    prayer: hit?.prayer ?? DEFAULT_PRAYER,
    reflection: hit?.reflection ?? DEFAULT_REFLECTION,
  };
}

/* ==========================
   ✅ RESOLVE DO DIA (COM OVERRIDES)
========================== */

type Resolved = {
  isSunday: boolean;
  reference: string;
  finished: boolean;
  source: "BASE" | "OVERRIDE" | "NOT_STARTED";
  planStartDate: string | null;
};

async function resolveForDate(dateIso: string, fallbackReference: string): Promise<Resolved> {
  const start = await getPlanStartDate();

  if (!start) {
    // plano ainda não iniciado
    return {
      isSunday: isSundayIso(dateIso),
      reference: isSundayIso(dateIso) ? "Meditar" : fallbackReference,
      finished: false,
      source: "NOT_STARTED",
      planStartDate: null,
    };
  }

  const eff = await getEffectiveReferenceForDate(dateIso);
  return {
    isSunday: eff.isSunday,
    reference: eff.reference,
    finished: eff.finished,
    source: eff.source,
    planStartDate: start,
  };
}

export default function ReadingScreen({ route }: Props) {
  const navigation = useNavigation<Nav>();

  const routeDate = route?.params?.date ?? "";
  const routeReference = route?.params?.reference ?? "Leitura do dia";

  const [resolved, setResolved] = useState<Resolved>({
    isSunday: !!route?.params?.isSunday,
    reference: routeReference,
    finished: false,
    source: "NOT_STARTED",
    planStartDate: null,
  });

  const date = routeDate;
  const reference = resolved.reference;
  const isSunday = resolved.isSunday;

  const isNatal = useMemo(() => /natal/i.test(reference.trim()), [reference]);
  const parsed = useMemo(() => parseReference(reference), [reference]);

  const [version, setVersion] = useState<BibleVersion>("ARC");
  const [openMode, setOpenMode] = useState<OpenMode>("IN_APP");
  const [showWebView, setShowWebView] = useState(false);

  const [completedDays, setCompletedDays] = useState<string[]>([]);

  // ✅ gratidão
  const [gratitudeText, setGratitudeText] = useState("");
  const [savedGratitude, setSavedGratitude] = useState<string | null>(null);

  const passages = useMemo(() => {
    if (isSunday) return ["Meditar"];
    if (!isMultiPassage(reference) && !isNatal) return [reference];
    return splitPassages(reference);
  }, [reference, isSunday, isNatal]);

  const [selectedPassageIndex, setSelectedPassageIndex] = useState(0);

  // ✅ fase por data (informativa)
  const currentPhase = useMemo(() => {
    if (!date) return null;
    return phases.find((p) => date >= p.startDate && date <= p.endDate) ?? null;
  }, [date]);

  const spiritual = useMemo(() => {
    return getSpiritualContent({
      phaseId: (currentPhase as any)?.id ?? null,
      isSunday,
      isNatal,
    });
  }, [currentPhase, isSunday, isNatal]);

  const canMarkRead = useMemo(() => {
    if (!date) return false;
    if (isSunday) return false;
    if (/meditar/i.test(reference)) return false;
    return true;
  }, [date, isSunday, reference]);

  const isReadToday = useMemo(() => {
    if (!date) return false;
    return completedDays.includes(date);
  }, [completedDays, date]);

  // ✅ navegação por calendário
  const prevDate = useMemo(() => (date ? addDaysIso(date, -1) : null), [date]);
  const nextDate = useMemo(() => (date ? addDaysIso(date, 1) : null), [date]);

  useEffect(() => {
    setSelectedPassageIndex(0);
    setShowWebView(false);
  }, [reference]);

  // ✅ resolve sempre pelo progressStore (inclui overrides)
  useEffect(() => {
    (async () => {
      if (!date) return;
      const res = await resolveForDate(date, routeReference);
      setResolved(res);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(VERSION_KEY);
        if (stored === "ARC" || stored === "NVI" || stored === "ACF" || stored === "KJ") {
          setVersion(stored);
        } else {
          setVersion("ARC");
        }
      } catch {
        setVersion("ARC");
      }

      try {
        const storedMode = await AsyncStorage.getItem(OPEN_MODE_KEY);
        if (storedMode === "IN_APP" || storedMode === "BROWSER") {
          setOpenMode(storedMode);
        } else {
          setOpenMode("IN_APP");
        }
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
  }, [date]);

  async function loadGratitudeForDate(dateIso: string) {
    if (!dateIso) {
      setSavedGratitude(null);
      setGratitudeText("");
      return;
    }
    try {
      const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const map = parsed && typeof parsed === "object" ? parsed : {};
      const existing = typeof map[dateIso] === "string" ? map[dateIso] : null;

      setSavedGratitude(existing);
      setGratitudeText(existing ?? "");
    } catch {
      setSavedGratitude(null);
      setGratitudeText("");
    }
  }

  function notify(title: string, message?: string) {
    if (Platform.OS === "web") window.alert(message ? `${title}\n\n${message}` : title);
    else Alert.alert(title, message);
  }

  async function saveGratitude() {
    if (!date) {
      notify("Sem data", "Não foi possível salvar gratidão sem a data do dia.");
      return;
    }

    const text = gratitudeText.trim();

    if (text.length === 0) {
      notify("Campo vazio", "Escreva 1 frase de gratidão (ou deixe como estava).");
      return;
    }

    if (text.length > 140) {
      notify("Muito longo", "Tente resumir em até 140 caracteres (1 frase).");
      return;
    }

    try {
      const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const map = parsed && typeof parsed === "object" ? parsed : {};

      map[date] = text;

      await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(map));
      setSavedGratitude(text);

      notify("Salvo ✅", "Sua gratidão foi registrada.");
    } catch {
      notify("Erro", "Não foi possível salvar sua gratidão.");
    }
  }

  async function deleteGratitude() {
    if (!date) return;
    try {
      const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const map = parsed && typeof parsed === "object" ? parsed : {};

      if (map[date]) delete map[date];

      await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(map));
      setSavedGratitude(null);
      setGratitudeText("");

      notify("Removido", "Gratidão do dia removida.");
    } catch {
      notify("Erro", "Não foi possível remover.");
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

  async function markAsRead() {
    if (!canMarkRead) return;
    if (!date) return;

    try {
      const result = await addCompletedDay(date);

      if (!result.added) {
        notify("Já marcado", "Este dia já está como concluído ✅");
        return;
      }

      setCompletedDays(result.days);
      notify("Concluído ✅", "Leitura marcada como lida!");
    } catch {
      notify("Erro", "Não foi possível marcar como lido.");
    }
  }

  const selectedReferenceRaw = useMemo(() => {
    return passages[selectedPassageIndex] ?? reference;
  }, [passages, selectedPassageIndex, reference]);

  const selectedReferenceForUrl = useMemo(() => {
    return ensureChapterForSingleChapterBooks(selectedReferenceRaw);
  }, [selectedReferenceRaw]);

  const readingUrl = useMemo(() => {
    return buildReadingUrl(selectedReferenceForUrl, isSunday, version);
  }, [selectedReferenceForUrl, isSunday, version]);

  async function openInBrowser() {
    try {
      const can = await Linking.canOpenURL(readingUrl);
      if (!can) throw new Error("cannot-open");
      await Linking.openURL(readingUrl);
    } catch {
      notify("Não foi possível abrir", "Seu dispositivo não conseguiu abrir o link da leitura.");
    }
  }

  function openAccordingToMode() {
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

    return (
      <Pressable
        onPress={onPress}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 10,
          backgroundColor: selected ? bgSelected : "#eee",
          marginRight: 8,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: selected ? "#fff" : colors.text, fontWeight: "bold" }}>{label}</Text>
      </Pressable>
    );
  }

  // ==========
  // WebView
  // ==========
  if (showWebView) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ padding: 12, backgroundColor: "#fff" }}>
          <Text style={{ fontWeight: "bold", color: colors.text }}>
            {selectedReferenceRaw} • {versionLabel[version]}
          </Text>

          <Text style={{ fontSize: 12, color: colors.muted, marginTop: 4 }}>
            Se não carregar, volte e use “Abrir no navegador”.
          </Text>

          <View style={{ height: 10 }} />
          <Button title="⬅️ Voltar" onPress={() => setShowWebView(false)} />
        </View>

        <WebView
          source={{ uri: readingUrl }}
          startInLoadingState
          renderLoading={() => (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator />
              <Text style={{ marginTop: 10, color: colors.muted }}>Carregando leitura...</Text>
            </View>
          )}
          onError={() => {
            setShowWebView(false);
            notify("Não carregou no app", "Não foi possível carregar a leitura aqui. Quer abrir no navegador?");
          }}
          onHttpError={() => {
            setShowWebView(false);
            notify("Erro ao carregar", "O site retornou erro. Quer abrir no navegador?");
          }}
        />
      </View>
    );
  }

  // ==========
  // Preview
  // ==========
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background, padding: 24 }}>
      <Text style={{ fontSize: 14, color: colors.muted, textAlign: "center", marginBottom: 8 }}>
        {date ? `📅 ${date}` : "📅"}
      </Text>

      <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.primary, textAlign: "center", marginBottom: 8 }}>
        {reference}
      </Text>

      {isSunday ? (
        <Text style={{ fontSize: 16, color: colors.secondary, textAlign: "center", marginBottom: 18 }}>
          📖 Domingo de meditação e oração
        </Text>
      ) : isNatal ? (
        <Text style={{ fontSize: 16, color: colors.secondary, textAlign: "center", marginBottom: 18 }}>
          🎄 Natal — leituras sobre o nascimento de Jesus
        </Text>
      ) : (
        <Text style={{ fontSize: 14, color: colors.muted, textAlign: "center", marginBottom: 18 }}>
          {parsed.book}
          {parsed.chapter ? ` • ${parsed.chapter}` : ""}
        </Text>
      )}

      {/* Oração */}
      <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ fontWeight: "bold", color: colors.primary }}>🙏 Oração Inicial</Text>
        <Text style={{ marginTop: 8, color: colors.text, lineHeight: 20 }}>{spiritual.prayer}</Text>
      </View>

      {/* Reflexão */}
      <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ fontWeight: "bold", color: colors.primary }}>🧭 Reflexão Guiada</Text>
        <Text style={{ marginTop: 8, color: colors.text, lineHeight: 20 }}>{spiritual.reflection}</Text>

        {currentPhase && !isSunday && !isNatal && (
          <Text style={{ marginTop: 10, fontSize: 12, color: colors.muted }}>
            Fase atual: {(currentPhase as any)?.title ?? "—"}
          </Text>
        )}
      </View>

      {/* Gratidão */}
      {!!date && (
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold", color: colors.primary }}>✍️ Gratidão (1 frase)</Text>

          <Text style={{ marginTop: 6, fontSize: 12, color: colors.muted }}>
            Uma frase curta (até 140 caracteres). Fica salva apenas no seu celular.
          </Text>

          <TextInput
            value={gratitudeText}
            onChangeText={setGratitudeText}
            placeholder="Ex: Obrigado Senhor por..."
            maxLength={140}
            multiline
            style={{
              minHeight: 60,
              marginTop: 10,
              backgroundColor: "#f4f4f4",
              borderRadius: 10,
              padding: 10,
              color: colors.text,
            }}
          />

          <View style={{ height: 10 }} />

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Button title="Salvar gratidão" onPress={saveGratitude} />
            </View>

            <View style={{ flex: 1 }}>
              <Button
                title="Remover"
                onPress={() => {
                  if (!savedGratitude) {
                    notify("Nada para remover", "Você ainda não salvou gratidão hoje.");
                    return;
                  }
                  Alert.alert("Remover gratidão?", "Deseja remover a gratidão deste dia?", [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Remover", style: "destructive", onPress: deleteGratitude },
                  ]);
                }}
              />
            </View>
          </View>

          {savedGratitude && (
            <Text style={{ marginTop: 10, fontSize: 12, color: colors.muted }}>✅ Salvo: {savedGratitude}</Text>
          )}
        </View>
      )}

      {/* Status */}
      {!!date && !isSunday && (
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold", color: colors.text }}>Status do dia</Text>
          <Text style={{ marginTop: 6, color: colors.muted }}>
            {isReadToday ? "✅ Já concluído" : "⏳ Ainda não marcado como lido"}
          </Text>
        </View>
      )}

      {/* Navegação */}
      {(prevDate || nextDate) && (
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10, color: colors.text }}>Navegação rápida</Text>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Button
                title="⬅️ Anterior"
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
              <Button
                title="Próxima ➡️"
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
        </View>
      )}

      {/* Multi-passagens */}
      {!isSunday && !isNatal && passages.length > 1 && (
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10, color: colors.text }}>
            Leitura com {passages.length} partes — escolha uma:
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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

          <Text style={{ marginTop: 6, fontSize: 12, color: colors.muted }}>
            Obs.: livros de 1 capítulo (Ob, Fm, Jd, 2Jo, 3Jo) abrem direto como “capítulo 1”.
          </Text>
        </View>
      )}

      {/* Versão */}
      {!isSunday && (
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10, color: colors.text }}>
            Versão bíblica (padrão: ARC)
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {(["ARC", "NVI", "ACF", "KJ"] as BibleVersion[]).map((v) => (
              <Chip
                key={v}
                label={{ ARC: "ARC", NVI: "NVI", ACF: "ACF", KJ: "KJ (PT)" }[v]}
                selected={v === version}
                tone="primary"
                onPress={() => selectVersion(v)}
              />
            ))}
          </View>

          <Text style={{ marginTop: 6, fontSize: 12, color: colors.muted }}>
            Você pode alternar a versão a qualquer momento.
          </Text>
        </View>
      )}

      {/* Preferência */}
      {!isSunday && (
        <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 10, color: colors.text }}>Preferência de abertura</Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
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

          <Text style={{ marginTop: 6, fontSize: 12, color: colors.muted }}>
            Isso fica salvo para as próximas leituras.
          </Text>
        </View>
      )}

      {/* Texto */}
      <View style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <Text style={{ color: colors.text, lineHeight: 22 }}>
          {isSunday
            ? "Use este dia para revisar leituras atrasadas, orar e meditar no que Deus falou com você nesta semana."
            : isNatal
            ? "Hoje é dia de Natal 🎄. Você pode ler textos sobre o nascimento de Jesus e profecias messiânicas. Toque em abrir para ver sugestões."
            : `Parte selecionada: ${selectedReferenceRaw} • Versão: ${versionLabel[version]}.`}
        </Text>

        {!isSunday && !isNatal && selectedReferenceForUrl !== selectedReferenceRaw && (
          <Text style={{ marginTop: 8, fontSize: 12, color: colors.muted }}>
            Ajuste automático: abrindo como “{selectedReferenceForUrl}”
          </Text>
        )}

        {resolved.planStartDate && (
          <Text style={{ marginTop: 10, fontSize: 11, color: colors.muted, textAlign: "center" }}>
            Plano atemporal • início: {resolved.planStartDate} (chave {PLAN_START_DATE_KEY}) • fonte: {resolved.source}
          </Text>
        )}
      </View>

      {/* Botões principais */}
      <Button
        title={
          isSunday
            ? "🙏 Abrir meditação"
            : openMode === "IN_APP"
            ? `📖 Abrir no app (${versionLabel[version]})`
            : `🌐 Abrir no navegador (${versionLabel[version]})`
        }
        onPress={openAccordingToMode}
      />

      {!isSunday && (
        <>
          <View style={{ height: 12 }} />
          <Button
            title={openMode === "IN_APP" ? "🌐 Abrir no navegador (alternativa)" : "📖 Abrir no app (alternativa)"}
            onPress={() => {
              if (openMode === "IN_APP") openInBrowser();
              else setShowWebView(true);
            }}
          />
        </>
      )}

      {/* Marcar como lido */}
      {canMarkRead && (
        <>
          <View style={{ height: 16 }} />
          <Button
            title={isReadToday ? "✅ Já marcado como lido" : "✔️ Marcar como lido"}
            disabled={isReadToday}
            onPress={markAsRead}
          />

          <View style={{ height: 10 }} />
          <Pressable onPress={refreshCompleted} style={{ alignSelf: "center", paddingVertical: 8 }}>
            <Text style={{ fontSize: 12, color: colors.muted }}>Atualizar status (se necessário)</Text>
          </Pressable>
        </>
      )}

      <View style={{ height: 18 }} />
    </ScrollView>
  );
}
