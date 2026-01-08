import {
  View,
  Text,
  ScrollView,
  Alert,
  Linking,
  Pressable,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
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

type Props = {
  route: {
    params?: {
      date?: string;
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

/**
 * Extrai "Livro" e "Capítulo/intervalo"
 */
function parseReference(reference: string) {
  const raw = reference.trim();
  const parts = raw.split(/\s+/);
  if (parts.length < 2) return { book: raw, chapter: "", raw };

  const last = parts[parts.length - 1];
  const book = parts.slice(0, parts.length - 1).join(" ");

  if (!/^\d/.test(last)) return { book: raw, chapter: "", raw };
  return { book, chapter: last, raw };
}

/**
 * Detecta multi-passagens
 */
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

const bibliaOnlineBookMap: Record<string, string> = {
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
    return (
      buildBibliaOnlineUrl(reference, "acf") ??
      buildGoogleSearchUrl(`Bíblia Online ACF ${reference}`)
    );
  }

  return (
    buildBibliaOnlineUrl(reference, "bkj") ??
    buildGoogleSearchUrl(`Bíblia BKJ ${reference}`)
  );
}

/* ==========================
   EXPERIÊNCIA ESPIRITUAL
========================== */
const DEFAULT_PRAYER =
  "Senhor, abre os meus olhos para ver as maravilhas da tua Palavra. Dá-me um coração humilde, obediente e cheio de fé. Amém.";

const DEFAULT_REFLECTION =
  "Enquanto lê, observe: (1) O que Deus revela sobre Si mesmo? (2) O que isso revela sobre o coração humano? (3) Qual é a resposta prática de obediência e fé para hoje?";

const PHASE_SPIRITUAL: Record<string, { prayer: string; reflection: string }> = {
  "1": {
    prayer:
      "Pai, firma em mim os fundamentos da fé. Abre meus olhos para ver tua glória desde o princípio e dá-me coragem para obedecer. Amém.",
    reflection:
      "Hoje, procure: (1) o que Deus revela sobre Si; (2) como o pecado aparece e como a graça responde; (3) um passo simples de obediência para praticar ainda hoje.",
  },
  "2": {
    prayer:
      "Senhor, enquanto tu preparas teu povo, prepara também meu coração. Ensina-me a confiar nas tuas promessas e a andar em aliança contigo. Amém.",
    reflection:
      "Observe as alianças, a direção de Deus e os sinais da redenção. Pergunte: onde preciso confiar mais e alinhar minha vida à vontade do Senhor?",
  },
  "3": {
    prayer:
      "Deus santo, dá-me arrependimento verdadeiro e esperança viva. Que tua Palavra corrija meus caminhos e reacenda minha confiança no Messias. Amém.",
    reflection:
      "Procure o chamado ao arrependimento e a promessa de restauração. Qual área da sua vida precisa ser trazida à luz, com humildade e fé?",
  },
  "4": {
    prayer:
      "Senhor, mesmo quando parece haver silêncio, tu estás trabalhando. Dá-me paciência, perseverança e olhos para esperar com confiança. Amém.",
    reflection:
      "Espere com propósito: Deus prepara o tempo certo. O que você precisa entregar a Deus hoje, sem pressa, com fidelidade diária?",
  },
  "5": {
    prayer:
      "Jesus, eu me coloco aos teus pés. Ensina-me teus caminhos, molda meu coração e faz-me amar o que tu amas. Amém.",
    reflection:
      "Nos Evangelhos, observe o caráter de Cristo: compaixão, verdade e autoridade. Qual atitude de Jesus você precisa imitar hoje?",
  },
  "6": {
    prayer:
      "Espírito Santo, fortalece minha fé e meu testemunho. Faz-me parte viva da tua Igreja, com coragem, amor e mansidão. Amém.",
    reflection:
      "Veja como o Evangelho se espalha e como Deus sustenta seus servos. Onde Deus quer que você seja fiel no pouco — hoje?",
  },
  "7": {
    prayer:
      "Senhor, dá-me mente renovada e vida prática. Que a verdade do Evangelho organize minhas escolhas, palavras e relacionamentos. Amém.",
    reflection:
      "As cartas unem doutrina e prática. Qual verdade você precisa lembrar hoje? E qual prática concreta deve mudar por causa dela?",
  },
  "8": {
    prayer:
      "Pai, sustenta-me nas provações. Dá-me perseverança, maturidade e alegria firme em Cristo, mesmo quando o caminho é difícil. Amém.",
    reflection:
      "Perseverar é continuar fazendo o bem. Qual hábito espiritual simples você vai manter hoje, custe o que custar?",
  },
  "9": {
    prayer:
      "Senhor Jesus, firma minha esperança na tua vitória final. Livra-me do medo e faz-me viver com os olhos na eternidade. Amém.",
    reflection:
      "Contemple a justiça e o triunfo de Cristo. Como sua esperança futura muda suas escolhas e prioridades no presente?",
  },
  "10": {
    prayer:
      "Deus eterno, obrigado porque toda a história converge em Cristo. Faz-me terminar esta jornada com gratidão, humildade e amor renovado. Amém.",
    reflection:
      "Relembre a redenção: o que Deus fez em você ao longo do caminho? Escreva um compromisso simples para manter a comunhão diária.",
  },
};

function getSpiritualContent(params: {
  phaseId?: string | null;
  isSunday: boolean;
  isNatal: boolean;
}) {
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

  const hit = phaseId ? PHASE_SPIRITUAL[phaseId] : null;

  return {
    prayer: hit?.prayer ?? DEFAULT_PRAYER,
    reflection: hit?.reflection ?? DEFAULT_REFLECTION,
  };
}

export default function ReadingScreen({ route }: Props) {
  const navigation = useNavigation<Nav>();

  const date = route?.params?.date ?? "";
  const reference = route?.params?.reference ?? "Leitura do dia";
  const isSunday = !!route?.params?.isSunday;

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

  const planIndex = useMemo(() => {
    if (!date) return -1;
    return readingPlan.findIndex((d) => d.date === date);
  }, [date]);

  const prevItem = planIndex > 0 ? readingPlan[planIndex - 1] : null;
  const nextItem =
    planIndex >= 0 && planIndex < readingPlan.length - 1
      ? readingPlan[planIndex + 1]
      : null;

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

  // ✅ fase por data
  const currentPhase = useMemo(() => {
    if (!date) return null;
    return phases.find((p) => date >= p.startDate && date <= p.endDate) ?? null;
  }, [date]);

  const spiritual = useMemo(() => {
    return getSpiritualContent({
      phaseId: currentPhase ? String(currentPhase.id) : null,
      isSunday,
      isNatal,
    });
  }, [currentPhase, isSunday, isNatal]);

  useEffect(() => {
    setSelectedPassageIndex(0);
    setShowWebView(false);
  }, [reference]);

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
      const parsed = raw ? JSON.parse(raw) : {};
      const map = parsed && typeof parsed === "object" ? parsed : {};

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
      const parsed = raw ? JSON.parse(raw) : {};
      const map = parsed && typeof parsed === "object" ? parsed : {};

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

  async function markAsRead() {
    if (!canMarkRead) return;
    if (!date) return;

    try {
      const stored = await AsyncStorage.getItem(COMPLETED_KEY);
      const parsedStored = stored ? JSON.parse(stored) : [];
      const current = uniqueSortedIsoDates(Array.isArray(parsedStored) ? parsedStored : []);

      if (current.includes(date)) {
        Alert.alert("Já marcado", "Este dia já está como concluído ✅");
        return;
      }

      const updated = uniqueSortedIsoDates([...current, date]);
      await AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(updated));
      setCompletedDays(updated);

      Alert.alert("Concluído ✅", "Leitura marcada como lida!");
    } catch {
      Alert.alert("Erro", "Não foi possível marcar como lido.");
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
      Alert.alert("Não foi possível abrir", "Seu dispositivo não conseguiu abrir o link da leitura.");
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

  // Componente Visual "Chip" melhorado
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
    const bgUnselected = "#EFEFEF";

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 20, // Pílula arredondada
          backgroundColor: selected ? bgSelected : bgUnselected,
          marginRight: 8,
          marginBottom: 8,
          borderWidth: 1,
          borderColor: selected ? "transparent" : "#DDD",
        }}
      >
        <Text style={{ 
            color: selected ? "#fff" : colors.text, 
            fontWeight: selected ? "bold" : "500",
            fontSize: 13
        }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

  // --- RENDER WEBVIEW (Layout Clean) ---
  if (showWebView) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.webViewHeader}>
          <Text style={styles.webViewTitle} numberOfLines={1}>
            {selectedReferenceRaw} • {versionLabel[version]}
          </Text>
          <Text style={styles.webViewSubtitle}>
            Problemas para carregar? Use "Abrir no navegador".
          </Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowWebView(false)}
          >
            <Text style={styles.backButtonText}>⬅️ Voltar ao App</Text>
          </TouchableOpacity>
        </View>

        <WebView
          source={{ uri: readingUrl }}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color={colors.primary} size="large" />
              <Text style={styles.loadingText}>Carregando leitura...</Text>
            </View>
          )}
          onError={() => {
            setShowWebView(false);
            Alert.alert("Erro", "Não foi possível carregar a leitura aqui.");
          }}
        />
      </SafeAreaView>
    );
  }

  // --- RENDER PRINCIPAL ---
  return (
    <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
    >
      
      {/* 1. HEADER CARD (Data e Referência) */}
      <View style={styles.card}>
        <View style={styles.headerTopRow}>
            <Text style={styles.dateBadge}>
                {date ? `📅 ${date}` : "📅 HOJE"}
            </Text>
            {isReadToday && <Text style={styles.completedBadge}>✅ LIDO</Text>}
        </View>

        <Text style={styles.referenceTitle}>
             {reference}
        </Text>

        <Text style={styles.phaseSubtitle}>
            {isSunday
            ? "📖 Domingo de meditação e oração"
            : isNatal
            ? "🎄 Natal — O Nascimento de Jesus"
            : parsed.book && parsed.chapter 
            ? `${parsed.book} • Capítulo ${parsed.chapter}`
            : "Leitura Bíblica"}
        </Text>
      </View>


      {/* 2. ESPIRITUALIDADE (Oração e Reflexão) */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🙏 Oração Inicial</Text>
        </View>
        <Text style={styles.bodyText}>{spiritual.prayer}</Text>

        <View style={styles.divider} />

        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🧭 Reflexão Guiada</Text>
        </View>
        <Text style={styles.bodyText}>{spiritual.reflection}</Text>

        {currentPhase && !isSunday && !isNatal && (
          <Text style={styles.phaseTag}>
             Fase atual: {currentPhase.title}
          </Text>
        )}
      </View>


      {/* 3. GRATIDÃO (Input Moderno) */}
      {!!date && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>✍️ Gratidão do Dia</Text>
          <Text style={styles.helperText}>
             Escreva 1 motivo de gratidão (até 140 caracteres).
          </Text>

          <TextInput
            value={gratitudeText}
            onChangeText={setGratitudeText}
            placeholder="Senhor, obrigado por..."
            maxLength={140}
            multiline
            style={styles.textInput}
            placeholderTextColor={colors.muted}
          />

          <View style={styles.row}>
            <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: colors.secondary, marginRight: 10 }]}
                onPress={saveGratitude}
            >
                <Text style={styles.smallButtonText}>💾 Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.smallButton, { backgroundColor: "transparent", borderWidth: 1, borderColor: "#DDD" }]}
                onPress={() => {
                  if (!savedGratitude) {
                     Alert.alert("Ops", "Nada para remover."); 
                     return; 
                  }
                  deleteGratitude();
                }}
            >
                <Text style={[styles.smallButtonText, { color: colors.muted }]}>🗑️ Limpar</Text>
            </TouchableOpacity>
          </View>

          {savedGratitude && (
            <View style={styles.savedFeedback}>
                 <Text style={{color: "green", fontSize: 12}}>✅ Salvo: {savedGratitude}</Text>
            </View>
          )}
        </View>
      )}


      {/* 4. CONFIGURAÇÕES (Multi-passagens + Versão + Modo) */}
      {!isSunday && (
        <View style={styles.card}>
            {/* Multi-passagens */}
            {!isNatal && passages.length > 1 && (
                <View style={{marginBottom: 16}}>
                    <Text style={styles.settingLabel}>Escolha a passagem:</Text>
                    <View style={styles.chipsContainer}>
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
                </View>
            )}

            {/* Versão */}
            <Text style={styles.settingLabel}>Versão Bíblica:</Text>
            <View style={styles.chipsContainer}>
                {(["ARC", "NVI", "ACF", "KJ"] as BibleVersion[]).map((v) => (
                    <Chip
                        key={v}
                        label={versionLabel[v]}
                        selected={v === version}
                        tone="primary"
                        onPress={() => selectVersion(v)}
                    />
                ))}
            </View>
            
            {/* Modo de Abertura */}
            <View style={{ marginTop: 12 }}>
                <Text style={styles.settingLabel}>Abrir onde?</Text>
                <View style={styles.chipsContainer}>
                    <Chip
                        label="📱 No App"
                        selected={openMode === "IN_APP"}
                        tone="secondary"
                        onPress={() => selectOpenMode("IN_APP")}
                    />
                    <Chip
                        label="🌐 Navegador"
                        selected={openMode === "BROWSER"}
                        tone="secondary"
                        onPress={() => selectOpenMode("BROWSER")}
                    />
                </View>
            </View>
        </View>
      )}


      {/* 5. AÇÕES PRINCIPAIS (Botões Grandes) */}
      <View style={{ paddingHorizontal: 4 }}>
         {/* Texto explicativo antes do botão */}
         <Text style={styles.actionExplainer}>
            {isSunday
                ? "Revise leituras atrasadas e ore."
                : `Leitura: ${selectedReferenceRaw} (${versionLabel[version]})`}
         </Text>

         {/* BOTÃO PRINCIPAL: ABRIR */}
         <TouchableOpacity
            style={styles.primaryButton}
            onPress={openAccordingToMode}
            activeOpacity={0.8}
         >
            <Text style={styles.primaryButtonText}>
                {isSunday 
                  ? "🙏 Abrir Meditação" 
                  : openMode === "IN_APP" 
                  ? "📖 Ler Agora no App" 
                  : "🌐 Ler no Navegador"}
            </Text>
         </TouchableOpacity>

         {/* Alternativa */}
         {!isSunday && (
             <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => {
                    if (openMode === "IN_APP") openInBrowser();
                    else setShowWebView(true);
                }}
             >
                <Text style={styles.secondaryButtonText}>
                    {openMode === "IN_APP" ? "Ou abrir no Navegador ↗" : "Ou tentar no App 📱"}
                </Text>
             </TouchableOpacity>
         )}

         {/* MARCAR COMO LIDO */}
         {canMarkRead && (
            <TouchableOpacity
                style={[
                    styles.checkButton, 
                    isReadToday ? { backgroundColor: "#E6F7E9", borderColor: "green" } : {}
                ]}
                disabled={isReadToday}
                onPress={markAsRead}
            >
                <Text style={[
                    styles.checkButtonText,
                    isReadToday ? { color: "green" } : {}
                ]}>
                    {isReadToday ? "✅ Leitura Concluída!" : "✔️ Marcar como Concluído"}
                </Text>
            </TouchableOpacity>
         )}
         
         {canMarkRead && (
            <Pressable onPress={refreshCompleted} style={{ alignSelf: "center", marginTop: 10 }}>
                <Text style={{ fontSize: 11, color: colors.muted }}>Atualizar status</Text>
            </Pressable>
         )}
      </View>


      {/* 6. NAVEGAÇÃO ENTRE DIAS */}
      {(prevItem || nextItem) && (
        <View style={[styles.card, { marginTop: 24, flexDirection: "row", justifyContent: "space-between" }]}>
            <TouchableOpacity
                style={[styles.navButton, !prevItem && { opacity: 0.3 }]}
                disabled={!prevItem}
                onPress={() => {
                    if (!prevItem) return;
                    navigation.navigate("Reading", {
                    date: prevItem.date,
                    reference: prevItem.reference,
                    isSunday: !!prevItem.isSunday,
                    });
                }}
            >
                <Text style={styles.navButtonText}>⬅️ Anterior</Text>
            </TouchableOpacity>

            <View style={{width: 1, backgroundColor: "#EEE"}}/>

            <TouchableOpacity
                style={[styles.navButton, !nextItem && { opacity: 0.3 }]}
                disabled={!nextItem}
                onPress={() => {
                    if (!nextItem) return;
                    navigation.navigate("Reading", {
                    date: nextItem.date,
                    reference: nextItem.reference,
                    isSunday: !!nextItem.isSunday,
                    });
                }}
            >
                <Text style={styles.navButtonText}>Próxima ➡️</Text>
            </TouchableOpacity>
        </View>
      )}

    </ScrollView>
  );
}

// === ESTILOS ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8", // Fundo cinza moderno
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    // Sombra
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  // Header Card
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dateBadge: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.muted,
    textTransform: "uppercase",
  },
  completedBadge: {
    fontSize: 10,
    fontWeight: "bold",
    color: "green",
    backgroundColor: "#E6F7E9",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  referenceTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  phaseSubtitle: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: "500",
  },
  
  // Sections
  sectionHeader: {
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
  },
  phaseTag: {
    marginTop: 10,
    fontSize: 11,
    color: colors.muted,
    fontStyle: "italic",
    alignSelf: "flex-end",
  },
  
  // Gratidão
  helperText: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 12,
    color: colors.text,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#EEE",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  smallButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  savedFeedback: {
    marginTop: 10, 
    padding: 8, 
    backgroundColor: "#F0FFF4", 
    borderRadius: 8
  },
  
  // Settings
  settingLabel: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 6,
    fontWeight: "600",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  
  // Buttons Principais
  actionExplainer: {
    textAlign: "center",
    fontSize: 12,
    color: colors.muted,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 10,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: colors.muted,
    fontSize: 14,
    textDecorationLine: "underline",
  },
  checkButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.text,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  checkButtonText: {
    color: colors.text,
    fontWeight: "bold",
    fontSize: 15,
  },
  
  // Nav Buttons
  navButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  navButtonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  
  // WebView Styles
  webViewHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "#fff",
  },
  webViewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  webViewSubtitle: {
    fontSize: 12,
    color: colors.muted,
    marginVertical: 4,
  },
  backButton: {
    marginTop: 8,
    backgroundColor: "#F4F6F8",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    color: colors.muted,
  },
});