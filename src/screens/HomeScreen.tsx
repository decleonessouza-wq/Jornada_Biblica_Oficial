import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  useWindowDimensions,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../theme/colors";
import { readingPlan } from "../data/readingPlan";
import type { AppDrawerParamList, MainTabParamList, RootStackParamList } from "../navigation/types";
import { runAutoBackup } from "../utils/autoBackup";
import { useAppShellChrome } from "../navigation/AppShellChromeContext";
import { VERSES_OF_DAY, pickVerseForToday, type VerseItem } from "../data/versesOfDay";
import {
  loadHomeDashboardV2Snapshot,
  type HomeDashboardV2Snapshot,
} from "../features/home/homeDashboardV2";

import {
  addCompletedDay,
  calculateStreak,
  ensureAutoRestoreOnceIfNeeded,
  getCompletedDays,
  getLastRead,
  // ✅ plano atemporal + atrasos
  getPlanStartDate,
  ensurePlanStartDate,
  getOverdueDates,
  // ✅ overrides (redistribuição)
  getEffectiveReferenceForDate,
  redistributeOverdueReadings,
} from "../services/progressStore";

// ✅ gamificação centralizada
import {
  getDailyMessage,
  getLevelForStreak,
  getNextMilestone,
  getMilestoneMessage,
  isMilestone,
} from "../constants/gamification";

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "HomeTab">,
  CompositeNavigationProp<
    DrawerNavigationProp<AppDrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

function isIsoDateString(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function sanitizeGratitudeMap(input: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!input || typeof input !== "object") return out;

  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (!isIsoDateString(k)) continue;
    if (typeof v !== "string") continue;

    const text = v.trim();
    if (!text) continue;

    out[k] = text.length > 200 ? text.slice(0, 200) : text;
  }

  return out;
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

function isSundayIso(iso: string): boolean {
  const d = isoToLocalNoon(iso);
  return d.getDay() === 0;
}

function getNonSundaySequence() {
  return readingPlan.filter((d) => !d.isSunday).map((d) => d.reference);
}

function getEarliestIso(list: string[]): string | null {
  const valid = list.filter(isIsoDateString);
  if (valid.length === 0) return null;
  // ISO YYYY-MM-DD ordena corretamente com sort()
  valid.sort();
  return valid[0] ?? null;
}

type ResolvedDay = {
  isSunday: boolean;
  reference: string;
  finished: boolean;
  source: "BASE" | "OVERRIDE" | "NOT_STARTED";
};

type BannerState =
  | { kind: "success"; title: string; message?: string }
  | { kind: "error"; title: string; message?: string }
  | { kind: "info"; title: string; message?: string }
  | null;

/* ==========================
   UI FEEDBACK (WEB + MOBILE)
========================== */

function notify(title: string, message?: string) {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n\n${message}` : title);
  } else {
    Alert.alert(title, message);
  }
}

function confirmAction(title: string, message: string): Promise<boolean> {
  if (Platform.OS === "web") {
    return Promise.resolve(window.confirm(`${title}\n\n${message}`));
  }

  return new Promise((resolve) => {
    Alert.alert(title, message, [
      { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
      { text: "Confirmar", onPress: () => resolve(true) },
    ]);
  });
}

/* ==========================
   SMALL UI PRIMITIVES
========================== */

function Card({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "highlight" | "warning";
}) {
  return (
    <View
      style={[
        styles.card,
        variant === "highlight" && styles.cardHighlight,
        variant === "warning" && styles.cardWarning,
      ]}
    >
      {children}
    </View>
  );
}

function QuickAccessCard({
  iconSource,
  title,
  subtitle,
  disabled = false,
  onPress,
}: {
  iconSource: any;
  title: string;
  subtitle: string;
  disabled?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.quickCard, disabled && styles.quickCardDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.82}
      accessibilityRole="button"
      accessibilityLabel={disabled ? `${title}, em breve` : title}
      accessibilityState={{ disabled }}
    >
      <Image
        source={iconSource}
        style={[styles.quickIconImage, disabled && styles.quickIconImageDisabled]}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />

      <Text style={[styles.quickTitle, disabled && styles.quickTitleDisabled]} numberOfLines={2}>
        {title}
      </Text>

      <Text style={[styles.quickSubtitle, disabled && styles.quickSubtitleDisabled]} numberOfLines={2}>
        {subtitle}
      </Text>

      {disabled && (
        <View style={styles.quickSoonPill}>
          <Text style={styles.quickSoonText}>Em breve</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { width: viewportWidth } = useWindowDimensions();
  const isNarrowViewport = viewportWidth < 390;
  const stackStats = viewportWidth < 420;
  const motivationalWebImageHeight = Math.min(
    320,
    Math.max(180, viewportWidth * 0.55)
  );
  const { handleScroll, resetChrome } = useAppShellChrome();

  useFocusEffect(
    useCallback(() => {
      resetChrome();
    }, [resetChrome])
  );

  const [mockDate, setMockDate] = useState<string | null>(null);
  const [devMode, setDevMode] = useState(false);

  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastRead, setLastRead] = useState<string | null>(null);

  // ✅ plano atemporal
  const [planStartDate, setPlanStartDateState] = useState<string | null>(null);
  const [overdueCount, setOverdueCount] = useState(0);
  const [oldestOverdue, setOldestOverdue] = useState<string | null>(null);

  // ✅ leitura resolvida do dia (com overrides)
  const [resolvedToday, setResolvedToday] = useState<ResolvedDay>({
    isSunday: false,
    reference: "Leitura do dia",
    finished: false,
    source: "NOT_STARTED",
  });

  const [homeDashboardV2, setHomeDashboardV2] = useState<HomeDashboardV2Snapshot | null>(null);

  // ✅ banner de feedback (aparece sempre)
  const [banner, setBanner] = useState<BannerState>(null);

  // ✅ Experiência Espiritual: gratidão
  const [gratitudeByDate, setGratitudeByDate] = useState<Record<string, string>>({});

  // ✅ Versículo do dia (modal)
  const [showVerseModal, setShowVerseModal] = useState(false);
  const [verseOfDay, setVerseOfDay] = useState<VerseItem | null>(null);

  // ✅ Migração/ajuste do início do plano
  const [showStartAdjust, setShowStartAdjust] = useState(false);
  const [startInput, setStartInput] = useState("");
  const [startWasAutoMigrated, setStartWasAutoMigrated] = useState(false);

  const VERSE_LAST_SHOWN_KEY = "VERSE_TODAY_LAST_SHOWN";
  const VERSE_HIDE_KEY = "VERSE_TODAY_HIDE";

  // ✅ base de "hoje" consistente (real ou mock) — ISO LOCAL (não UTC)
  const today = useMemo(() => {
    if (mockDate && isIsoDateString(mockDate)) return mockDate;
    return dateToIsoLocal(new Date());
  }, [mockDate]);

  const todayIsSunday = useMemo(() => isSundayIso(today), [today]);

  // ✅ sequência do plano (canônica) — usada só para exibir “primeiro dia” antes de iniciar
  const nonSundaySeq = useMemo(() => getNonSundaySequence(), []);

  const isCompletedToday = useMemo(() => completedDays.includes(today), [completedDays, today]);

  const level = useMemo(() => getLevelForStreak(streak), [streak]);
  const nextMilestone = useMemo(() => getNextMilestone(streak), [streak]);

  const dailyMessage = useMemo(() => {
    return getDailyMessage({ streak, isBeforePlan: false, isAfterPlan: false });
  }, [streak]);

  // ✅ gratidão do dia
  const todayGratitude = useMemo(() => {
    return typeof gratitudeByDate[today] === "string" ? gratitudeByDate[today] : null;
  }, [gratitudeByDate, today]);

  const canRegisterGratitudeToday = useMemo(() => true, []);
  const todayLabel = useMemo(() => today, [today]);

  const loadGratitude = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem("gratitudeByDate");
      const parsed = raw ? JSON.parse(raw) : {};
      setGratitudeByDate(sanitizeGratitudeMap(parsed));
    } catch (err) {
      console.log("Erro ao carregar gratitudeByDate", err);
      setGratitudeByDate({});
    }
  }, []);

  const loadProgress = useCallback(async () => {
    try {
      const days = await getCompletedDays();
      setCompletedDays(days);
      setLastRead(getLastRead(days));

      const base = new Date();
      base.setHours(12, 0, 0, 0);
      setStreak(calculateStreak(days, base));
    } catch (err) {
      console.log("Erro ao carregar progresso", err);
      setCompletedDays([]);
      setLastRead(null);
      setStreak(0);
    }
  }, []);

  const loadResolvedForDate = useCallback(
    async (dateIso: string, hasStarted: boolean) => {
      try {
        if (!hasStarted) {
          setResolvedToday({
            isSunday: isSundayIso(dateIso),
            reference: isSundayIso(dateIso) ? "Meditar" : nonSundaySeq[0] ?? "Leitura do dia",
            finished: false,
            source: "NOT_STARTED",
          });
          return;
        }

        const eff = await getEffectiveReferenceForDate(dateIso);
        setResolvedToday({
          isSunday: eff.isSunday,
          reference: eff.reference,
          finished: eff.finished,
          source: eff.source,
        });
      } catch (err) {
        console.log("Erro ao resolver leitura do dia", err);
        setResolvedToday({
          isSunday: isSundayIso(dateIso),
          reference: isSundayIso(dateIso) ? "Meditar" : nonSundaySeq[0] ?? "Leitura do dia",
          finished: false,
          source: hasStarted ? "BASE" : "NOT_STARTED",
        });
      }
    },
    [nonSundaySeq]
  );

  // ✅ Migração automática: se não existe planStartDate, mas já existe completedDays, define início = primeiro dia lido.
  const migrateLegacyStartIfNeeded = useCallback(
    async (days: string[]) => {
      try {
        const existingStart = await getPlanStartDate();
        if (existingStart) {
          setStartWasAutoMigrated(false);
          return existingStart;
        }

        if (!Array.isArray(days) || days.length === 0) {
          setStartWasAutoMigrated(false);
          return null;
        }

        const earliest = getEarliestIso(days);
        if (!earliest) {
          setStartWasAutoMigrated(false);
          return null;
        }

        const start = await ensurePlanStartDate(earliest);
        setPlanStartDateState(start);
        setStartInput(start); // já deixa preenchido para ajuste
        setStartWasAutoMigrated(true);

        setBanner({
          kind: "info",
          title: "Plano alinhado automaticamente ✅",
          message: `Detectei leituras antigas. Início definido como ${start}. Se precisar, ajuste abaixo.`,
        });

        return start;
      } catch (err) {
        console.log("Erro na migração do início do plano", err);
        setStartWasAutoMigrated(false);
        return null;
      }
    },
    []
  );

  const loadPlanStartAndOverdue = useCallback(
    async (daysForMigration?: string[]) => {
      try {
        // tenta pegar start
        let start = await getPlanStartDate();

        // se não tem start e tem progresso, migra
        if (!start && Array.isArray(daysForMigration) && daysForMigration.length > 0) {
          start = await migrateLegacyStartIfNeeded(daysForMigration);
        }

        setPlanStartDateState(start);

        const hasStarted = !!start;

        // ✅ resolve leitura de HOJE (considerando overrides)
        await loadResolvedForDate(today, hasStarted);

        if (!start) {
          setOverdueCount(0);
          setOldestOverdue(null);
          return;
        }

        const overdue = await getOverdueDates({ todayIso: today, includeToday: false });
        setOverdueCount(overdue.length);
        setOldestOverdue(overdue.length > 0 ? overdue[0] : null);
      } catch (err) {
        console.log("Erro ao carregar planStart/overdue", err);
        setOverdueCount(0);
        setOldestOverdue(null);
        await loadResolvedForDate(today, false);
      }
    },
    [today, loadResolvedForDate, migrateLegacyStartIfNeeded]
  );

  const loadHomeDashboardV2 = useCallback(async (dateIso: string) => {
    try {
      const snapshot = await loadHomeDashboardV2Snapshot(dateIso);
      setHomeDashboardV2(snapshot);
    } catch (err) {
      console.log("Erro ao carregar dashboard V2 da Home", err);
      setHomeDashboardV2(null);
    }
  }, []);

  const loadVerseOfDayIfNeeded = useCallback(async () => {
    try {
      if (!Array.isArray(VERSES_OF_DAY) || VERSES_OF_DAY.length === 0) return;

      const hidden = await AsyncStorage.getItem(VERSE_HIDE_KEY);
      if (hidden === today) return;

      const lastShown = await AsyncStorage.getItem(VERSE_LAST_SHOWN_KEY);
      if (lastShown === today) return;

      const verse = pickVerseForToday(new Date());
      if (!verse) return;

      setVerseOfDay(verse);
      setShowVerseModal(true);

      await AsyncStorage.setItem(VERSE_LAST_SHOWN_KEY, today);
    } catch (err) {
      console.log("Erro ao carregar versículo do dia", err);
    }
  }, [today]);

  useEffect(() => {
    (async () => {
      const res = await ensureAutoRestoreOnceIfNeeded();
      if (res.restored) {
        notify("Progresso restaurado", `Backup automático aplicado: ${res.count} dias.`);
        setBanner({
          kind: "info",
          title: "Progresso restaurado",
          message: `Backup automático aplicado: ${res.count} dias.`,
        });
      }

      // carrega progresso
      const days = await getCompletedDays();
      setCompletedDays(days);
      setLastRead(getLastRead(days));
      const base = new Date();
      base.setHours(12, 0, 0, 0);
      setStreak(calculateStreak(days, base));

      await loadGratitude();
      await loadPlanStartAndOverdue(days);
      await loadHomeDashboardV2(today);
      await runAutoBackup();
      await loadVerseOfDayIfNeeded();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      // recarrega progresso e start quando “today” muda (mock/real)
      const days = await getCompletedDays();
      setCompletedDays(days);
      setLastRead(getLastRead(days));
      const base = new Date();
      base.setHours(12, 0, 0, 0);
      setStreak(calculateStreak(days, base));

      await loadGratitude();
      await loadPlanStartAndOverdue(days);
      await loadHomeDashboardV2(today);
      await loadVerseOfDayIfNeeded();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  async function startPlanNowAndOpen() {
    try {
      const start = await ensurePlanStartDate(today);
      setPlanStartDateState(start);

      await loadResolvedForDate(today, true);

      const eff = await getEffectiveReferenceForDate(today);

      navigation.navigate("Reading", {
        date: today,
        reference: eff.reference,
        isSunday: eff.isSunday,
      });
    } catch {
      notify("Erro", "Não foi possível iniciar o plano agora.");
      setBanner({ kind: "error", title: "Erro", message: "Não foi possível iniciar o plano agora." });
    }
  }

  async function applyManualStartDate() {
    const iso = startInput.trim();
    if (!isIsoDateString(iso)) {
      notify("Data inválida", "Use o formato AAAA-MM-DD (ex: 2026-01-05).");
      return;
    }

    const ok = await confirmAction(
      "Definir data de início?",
      `Isso vai alinhar o plano como se você tivesse começado em ${iso}.\n\nSeu progresso (dias concluídos) não será apagado.`
    );
    if (!ok) return;

    try {
      const start = await ensurePlanStartDate(iso);
      setPlanStartDateState(start);
      setShowStartAdjust(false);

      setBanner({
        kind: "success",
        title: "Data de início atualizada ✅",
        message: `Seu plano foi alinhado para iniciar em ${start}.`,
      });

      // recarrega leitura do dia e atrasos com esse início
      const days = await getCompletedDays();
      await loadPlanStartAndOverdue(days);
      await loadHomeDashboardV2(today);
    } catch (err) {
      console.log("Erro ao definir data de início manual", err);
      setBanner({ kind: "error", title: "Erro", message: "Não foi possível definir a data de início." });
      notify("Erro", "Não foi possível definir a data de início.");
    }
  }

  async function markAsCompleted() {
    if (resolvedToday.isSunday) return;
    if (resolvedToday.finished) return;
    if (isCompletedToday) return;

    try {
      const result = await addCompletedDay(today);
      if (!result.added) return;

      const days = result.days;
      setCompletedDays(days);
      setLastRead(getLastRead(days));

      const base = new Date();
      base.setHours(12, 0, 0, 0);
      const newStreak = calculateStreak(days, base);
      setStreak(newStreak);

      await loadPlanStartAndOverdue(days);
      await loadHomeDashboardV2(today);

      if (isMilestone(newStreak)) {
        notify("Marco alcançado ✅", getMilestoneMessage(newStreak));
        setBanner({
          kind: "success",
          title: "Marco alcançado ✅",
          message: getMilestoneMessage(newStreak),
        });
      } else {
        setBanner({ kind: "success", title: "Leitura marcada ✅" });
      }
    } catch (err) {
      console.log("Erro ao salvar leitura concluída", err);
      notify("Erro", "Não foi possível salvar sua leitura concluída.");
      setBanner({ kind: "error", title: "Erro", message: "Não foi possível salvar sua leitura concluída." });
    }
  }

  function openReading() {
    if (resolvedToday.finished) {
      notify("Plano concluído 🎉", "Você pode revisar pelo Plano Anual e Histórico.");
      setBanner({
        kind: "info",
        title: "Plano concluído 🎉",
        message: "Você pode revisar pelo Plano Anual e Histórico.",
      });
      return;
    }

    if (!planStartDate) {
      (async () => {
        const ok = await confirmAction(
          "Iniciar plano?",
          "Seu plano agora é atemporal: começa quando você decide iniciar. Quer começar hoje?"
        );
        if (ok) startPlanNowAndOpen();
      })();
      return;
    }

    navigation.navigate("Reading", {
      date: today,
      reference: resolvedToday.reference,
      isSunday: resolvedToday.isSunday,
    });
  }

  async function openOldestOverdue() {
    if (!oldestOverdue) return;

    try {
      const eff = await getEffectiveReferenceForDate(oldestOverdue);

      navigation.navigate("Reading", {
        date: oldestOverdue,
        reference: eff.reference,
        isSunday: eff.isSunday,
      });
    } catch {
      navigation.navigate("Reading", {
        date: oldestOverdue,
        reference: "Leitura (atrasada)",
        isSunday: isSundayIso(oldestOverdue),
      });
    }
  }

  async function handleRedistributeOverdue() {
    if (!planStartDate || overdueCount <= 0) return;

    const ok = await confirmAction(
      "Redistribuir leituras atrasadas?",
      "O app vai recalcular os atrasos e distribuir junto às leituras dos próximos dias em aberto."
    );

    if (!ok) return;

    try {
      const res = await redistributeOverdueReadings({
        todayIso: today,
        includeTodayAsTarget: true,
      });

      const msg = `Atrasos detectados: ${res.overdueCount}\nRedistribuídos: ${res.redistributedCount}\nDias-alvo: ${res.targetDays}`;

      notify("Redistribuição aplicada ✅", msg);
      setBanner({ kind: "success", title: "Redistribuição aplicada ✅", message: msg });

      const days = await getCompletedDays();
      await loadPlanStartAndOverdue(days);
      await loadHomeDashboardV2(today);
    } catch (err) {
      console.log("Erro ao redistribuir atrasos", err);
      notify("Erro", "Não foi possível redistribuir as leituras atrasadas.");
      setBanner({ kind: "error", title: "Erro", message: "Não foi possível redistribuir as leituras atrasadas." });
    }
  }

  function toggleDevMode() {
    if (!__DEV__) return;
    setDevMode((prev) => !prev);
  }

  const todayStatusPill = useMemo(() => {
    if (!planStartDate) return { text: "Plano não iniciado", variant: "info" as const };
    if (todayIsSunday) return { text: "Domingo (livre)", variant: "neutral" as const };
    if (resolvedToday.source === "OVERRIDE") return { text: "Leitura redistribuída", variant: "info" as const };
    if (isCompletedToday) return { text: "Concluído hoje", variant: "success" as const };
    return { text: "Em aberto", variant: "warning" as const };
  }, [planStartDate, todayIsSunday, resolvedToday.source, isCompletedToday]);

  const planProgressDisplay = useMemo(() => {
    const snapshot = homeDashboardV2;

    if (!snapshot) {
      return {
        state: "loading" as const,
        percent: 0,
        title: "Carregando progresso",
        detail: "Atualizando sua jornada...",
        phase: null as string | null,
      };
    }

    if (snapshot.bridgeStatus === "NOT_STARTED") {
      return {
        state: "not_started" as const,
        percent: 0,
        title: "Plano ainda não iniciado",
        detail: `0 de ${snapshot.progress.requiredReadingCount} leituras concluídas`,
        phase: null as string | null,
      };
    }

    if (snapshot.bridgeStatus === "LEGACY_START_REQUIRED") {
      return {
        state: "review" as const,
        percent: 0,
        title: "Alinhamento necessário",
        detail: "Defina o início do plano para consolidar o progresso.",
        phase: null as string | null,
      };
    }

    if (!snapshot.canUseCanonicalProgress) {
      return {
        state: "review" as const,
        percent: 0,
        title: "Progresso em revisão",
        detail: "Há dados que precisam de conferência antes do cálculo canônico.",
        phase: null as string | null,
      };
    }

    const completed = snapshot.progress.completedReadingCount;
    const total = snapshot.progress.requiredReadingCount;
    const percent = Math.round(snapshot.progress.completionPercent);

    return {
      state: snapshot.progress.isPlanComplete ? ("complete" as const) : ("ready" as const),
      percent,
      title: snapshot.progress.isPlanComplete ? "Plano concluído" : "Plano em andamento",
      detail: `${completed} de ${total} leituras concluídas`,
      phase: snapshot.currentPhase?.title ?? null,
    };
  }, [homeDashboardV2]);

  const heroCtaLabel = useMemo(() => {
    if (!planStartDate) return "Começar plano hoje";
    if (resolvedToday.finished) return "Plano concluído";
    if (resolvedToday.isSunday) return "Abrir meditação";
    if (isCompletedToday) return "Revisar leitura";
    return "Continuar leitura";
  }, [planStartDate, resolvedToday.finished, resolvedToday.isSunday, isCompletedToday]);

  // Mostra card de alinhamento quando:
  // - existe progresso (completedDays) e
  // - planStartDate já existe (migrado ou definido) e
  // - usuário pode ajustar
  const hasLegacyProgress = useMemo(() => completedDays.length > 0, [completedDays.length]);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {devMode && (
          <View style={styles.devPanel}>
            <Text style={styles.devText}>🔧 Modo Desenvolvedor ativo</Text>

            <TouchableOpacity
              style={styles.devBtn}
              onPress={() => {
                if (!__DEV__) return;
                setMockDate(null);
                notify("DEV", "Mock date removido (voltou para hoje real).");
              }}
            >
              <Text style={styles.devBtnText}>Remover mockDate</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* BANNER */}
          {banner && (
            <Pressable
              onPress={() => setBanner(null)}
              style={[
                styles.banner,
                banner.kind === "success" && styles.bannerSuccess,
                banner.kind === "error" && styles.bannerError,
                banner.kind === "info" && styles.bannerInfo,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Fechar aviso"
            >
              <Text style={styles.bannerTitle}>{banner.title}</Text>
              {!!banner.message && <Text style={styles.bannerMsg}>{banner.message}</Text>}
              <Text style={styles.bannerHint}>Toque para fechar</Text>
            </Pressable>
          )}

          {/* HERO 2.0 - JORNADA DO DIA */}
          <View style={styles.heroCard}>
            <View style={styles.heroImageFrame}>
              <Image
                source={require("../../assets/home/hero_img.png")}
                style={styles.heroBackdropImage}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />

              <Image
                source={require("../../assets/home/overlays/hero_navy_fade.png")}
                style={styles.heroFadeImage}
                resizeMode="stretch"
                accessibilityIgnoresInvertColors
              />

              <View
                style={[
                  styles.heroContentPanel,
                  isNarrowViewport && styles.heroContentPanelNarrow,
                ]}
              >
                <View style={styles.heroEyebrowRow}>
                  <View style={styles.heroAccentLine} />
                  <Text style={styles.heroEyebrow}>Sua jornada de hoje</Text>
                </View>

                <Text style={styles.heroDateText}>{todayLabel}</Text>

                <Pressable
                  onPress={openReading}
                  onLongPress={toggleDevMode}
                  delayLongPress={2000}
                  accessibilityRole="button"
                  accessibilityLabel="Abrir leitura do dia"
                  style={styles.heroReferencePressable}
                >
                  <Text
                    style={[
                      styles.heroReference,
                      isNarrowViewport && styles.heroReferenceNarrow,
                    ]}
                  >
                    {resolvedToday.reference}
                  </Text>
                </Pressable>

                <View style={styles.heroStatusPill}>
                  <Text style={styles.heroStatusText}>{todayStatusPill.text}</Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.heroPrimaryBtn,
                    isNarrowViewport && styles.heroPrimaryBtnNarrow,
                    Platform.OS === "web" && styles.heroPrimaryBtnWeb,
                  ]}
                  onPress={planStartDate ? openReading : startPlanNowAndOpen}
                  activeOpacity={0.86}
                  accessibilityRole="button"
                  accessibilityLabel={heroCtaLabel}
                >
                  <View style={styles.heroPrimaryBtnContent}>
                    <Text
                      style={[
                        styles.heroPrimaryBtnIcon,
                        Platform.OS === "web" && styles.heroPrimaryBtnIconWeb,
                      ]}
                    >
                      📖
                    </Text>
                    <Text
                      style={[
                        styles.heroPrimaryBtnText,
                        isNarrowViewport && styles.heroPrimaryBtnTextNarrow,
                      ]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.82}
                    >
                      {heroCtaLabel}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                styles.heroUtilityRow,
                isNarrowViewport && styles.heroUtilityRowNarrow,
              ]}
            >
              {canRegisterGratitudeToday && (
                <Text
                  style={[
                    styles.heroGratitudeText,
                    isNarrowViewport && styles.heroGratitudeTextNarrow,
                    { color: todayGratitude ? colors.secondaryPressed : colors.muted },
                  ]}
                >
                  {todayGratitude ? "🙏 Gratidão registrada" : "✍️ Gratidão: ainda não registrada"}
                </Text>
              )}

              {planStartDate && !resolvedToday.isSunday && !resolvedToday.finished && (
                <TouchableOpacity
                  style={[
                    styles.heroMarkReadBtn,
                    isCompletedToday && styles.heroMarkReadBtnDisabled,
                  ]}
                  onPress={markAsCompleted}
                  disabled={isCompletedToday}
                  accessibilityRole="button"
                  accessibilityLabel={isCompletedToday ? "Leitura concluída" : "Marcar leitura como concluída"}
                >
                  <Text
                    style={[
                      styles.heroMarkReadText,
                      isCompletedToday && styles.heroMarkReadTextDisabled,
                    ]}
                  >
                    {isCompletedToday ? "✓ Concluído" : "✓ Marcar lido"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* PLANO DE LEITURA - PROGRESSO CANÔNICO V2 */}
          <View style={styles.planSectionHeader}>
            <View style={styles.planSectionTitleWrap}>
              <Text style={styles.planSectionSymbol}>▤</Text>
              <Text style={styles.planSectionTitle}>Plano de Leitura</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("PlanTab")}
              accessibilityRole="button"
              accessibilityLabel="Ver plano de leitura"
            >
              <Text style={styles.planSectionLink}>Ver plano ›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.planProgressCard}
            onPress={() => navigation.navigate("PlanTab")}
            activeOpacity={0.88}
            accessibilityRole="button"
            accessibilityLabel={`Plano de leitura. ${planProgressDisplay.title}. ${planProgressDisplay.detail}`}
          >
            <View style={styles.planPercentCircle}>
              <Text style={styles.planPercentValue}>{planProgressDisplay.percent}%</Text>
            </View>

            <View style={styles.planProgressMain}>
              <Text style={styles.planProgressTitle} numberOfLines={2}>
                {planProgressDisplay.title}
              </Text>
              <Text style={styles.planProgressDetail}>{planProgressDisplay.detail}</Text>

              {planProgressDisplay.phase && (
                <Text style={styles.planProgressPhase} numberOfLines={1}>
                  {planProgressDisplay.phase}
                </Text>
              )}

              <View style={styles.planProgressTrack}>
                <View
                  style={[
                    styles.planProgressFill,
                    { width: `${Math.min(100, Math.max(0, planProgressDisplay.percent))}%` },
                  ]}
                />
              </View>
            </View>

            <Text style={styles.planProgressChevron}>›</Text>
          </TouchableOpacity>

          {/* OVERDUE */}
          {planStartDate && overdueCount > 0 && (
            <Card variant="warning">
              <Text style={styles.sectionTitle}>⚠️ Leituras atrasadas</Text>
              <Text style={styles.sectionMuted}>
                {overdueCount} pendente{overdueCount !== 1 ? "s" : ""} (domingos não contam — domingo é livre)
              </Text>

              <View style={{ height: 12 }} />

              <TouchableOpacity style={styles.primaryBtn} onPress={openOldestOverdue}>
                <Text style={styles.btnText}>📖 Ler atraso mais antigo</Text>
              </TouchableOpacity>

              <View style={{ height: 10 }} />

              <TouchableOpacity style={styles.secondaryBtn} onPress={handleRedistributeOverdue}>
                <Text style={styles.btnText}>🔁 Redistribuir atrasos</Text>
              </TouchableOpacity>
            </Card>
          )}

          {/* ACESSOS RÁPIDOS 2x3 - CONTRATO OFICIAL */}
          <View style={styles.quickSectionHeader}>
            <View>
              <Text style={styles.quickSectionEyebrow}>NAVEGAÇÃO</Text>
              <Text style={styles.quickSectionTitle}>Acessos rápidos</Text>
            </View>
            <Text style={styles.quickSectionHint}>3 recursos ativos</Text>
          </View>

          <View style={styles.quickGrid}>
            <QuickAccessCard
              iconSource={require("../../assets/home/icons/biblia_icone.png")}
              title="Bíblia"
              subtitle="Leitor bíblico local"
              onPress={() => navigation.navigate("BibleTab")}
            />

            <QuickAccessCard
              iconSource={require("../../assets/home/icons/plano_icone.png")}
              title="Plano de Leitura"
              subtitle="Siga sua jornada"
              onPress={() => navigation.navigate("PlanTab")}
            />

            <QuickAccessCard
              iconSource={require("../../assets/home/icons/diario_icone.png")}
              title="Meu Diário"
              subtitle="Anote e reflita"
              disabled
            />

            <QuickAccessCard
              iconSource={require("../../assets/home/icons/estudos_icone.png")}
              title="Estudos"
              subtitle="Aprofunde temas"
              disabled
            />

            <QuickAccessCard
              iconSource={require("../../assets/home/icons/favoritos_icone.png")}
              title="Favoritos"
              subtitle="Conteúdos salvos"
              disabled
            />

            <QuickAccessCard
              iconSource={require("../../assets/home/icons/progresso_icone.png")}
              title="Progresso"
              subtitle="Acompanhe sua evolução"
              onPress={() => navigation.navigate("Progress")}
            />
          </View>

          {/* BANNER MOTIVACIONAL */}
          <ImageBackground
            source={require("../../assets/home/banner_motivacional.png")}
            style={styles.motivationalBanner}
            imageStyle={{ borderRadius: 18 }}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          >
            {Platform.OS === "web" && (
              <Image
                source={require("../../assets/home/banner_motivacional.png")}
                style={[
                  styles.motivationalBackdropWeb,
                  { height: motivationalWebImageHeight },
                ]}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />
            )}

            <Image
              source={require("../../assets/home/overlays/banner_cream_fade.png")}
              style={styles.motivationalFadeImage}
              resizeMode="stretch"
              accessibilityIgnoresInvertColors
            />

            <View style={styles.motivationalContent}>
              <View style={styles.motivationalAccentLine} />
              <Text style={styles.motivationalEyebrow}>PALAVRA PARA A JORNADA</Text>
              <Text style={styles.motivationalText} numberOfLines={3}>
                {dailyMessage}
              </Text>
            </View>
          </ImageBackground>

          {/* CONSTÂNCIA - BLOCO LEGADO PRESERVADO */}
          <View style={[styles.statsGrid, stackStats && styles.statsGridNarrow]}>
            <Card>
              <Text style={styles.kpiLabel}>🔥 Streak</Text>
              <Text style={styles.kpiValue}>
                {streak} dia{streak !== 1 ? "s" : ""}
              </Text>
              {lastRead ? <Text style={styles.kpiHint}>Última: {lastRead}</Text> : <Text style={styles.kpiHint}>—</Text>}
            </Card>

            <Card>
              <Text style={styles.kpiLabel}>🏅 Nível</Text>
              <Text style={styles.kpiValue}>{level.title}</Text>
              {nextMilestone.next ? (
                <Text style={styles.kpiHint}>
                  Próx.: {nextMilestone.next} (faltam {nextMilestone.remaining})
                </Text>
              ) : (
                <Text style={styles.kpiHint}>Marcos concluídos</Text>
              )}
            </Card>
          </View>

          {/* AJUSTE DE ALINHAMENTO - FUNÇÃO REAL PRESERVADA, PRIORIDADE SECUNDÁRIA */}
          {planStartDate && hasLegacyProgress && (
            <Card>
              <Text style={styles.sectionTitle}>🧭 Alinhamento do plano</Text>
              <Text style={styles.sectionMuted}>
                Início do plano: <Text style={{ fontWeight: "900", color: colors.text }}>{planStartDate}</Text>
                {startWasAutoMigrated ? " (definido automaticamente)" : ""}
              </Text>

              <View style={{ height: 10 }} />

              {!showStartAdjust ? (
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  onPress={() => {
                    setStartInput(planStartDate);
                    setShowStartAdjust(true);
                  }}
                >
                  <Text style={[styles.btnText, { color: colors.primary }]}>✏️ Ajustar data de início</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.startAdjustBox}>
                  <Text style={styles.startAdjustHint}>
                    Informe a data em formato <Text style={{ fontWeight: "900" }}>AAAA-MM-DD</Text>
                  </Text>

                  <TextInput
                    value={startInput}
                    onChangeText={setStartInput}
                    placeholder="Ex: 2026-01-05"
                    placeholderTextColor="#9aa0a6"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.startAdjustInput}
                  />

                  <View style={{ height: 10 }} />

                  <View style={styles.startAdjustRow}>
                    <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={applyManualStartDate}>
                      <Text style={styles.btnText}>Salvar</Text>
                    </TouchableOpacity>

                    <View style={{ width: 10 }} />

                    <TouchableOpacity
                      style={[styles.devBtn, { flex: 1 }]}
                      onPress={() => {
                        setShowStartAdjust(false);
                        setStartInput(planStartDate);
                      }}
                    >
                      <Text style={[styles.devBtnText, { color: colors.text }]}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Card>
          )}

          <View style={{ height: 10 }} />
        </ScrollView>

        {/* ✅ MODAL: VERSÍCULO DO DIA */}
        {showVerseModal && verseOfDay && (
          <View style={styles.verseOverlay} accessible accessibilityRole="alert" accessibilityLabel="Versículo do dia">
            <View style={styles.verseModal} accessible>
              <Text style={styles.verseTitle}>📖 Versículo do Dia</Text>

              {!!verseOfDay.theme && <Text style={styles.verseTheme}>{verseOfDay.theme}</Text>}

              <Text style={styles.verseText}>“{verseOfDay.text}”</Text>

              <Text style={styles.verseRef}>{verseOfDay.reference}</Text>

              <View style={{ height: 16 }} />

              <TouchableOpacity style={styles.primaryBtn} onPress={() => setShowVerseModal(false)}>
                <Text style={styles.btnText}>Fechar</Text>
              </TouchableOpacity>

              <View style={{ height: 8 }} />

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={async () => {
                  await AsyncStorage.setItem(VERSE_HIDE_KEY, today);
                  setShowVerseModal(false);
                }}
              >
                <Text style={styles.btnText}>Não mostrar novamente hoje</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
    </View>
  );
}

const CARD_MAX = 560;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 18,
    alignSelf: "center",
    width: "100%",
    maxWidth: CARD_MAX,
  },

  devPanel: {
    marginTop: 6,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  devText: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 10,
  },
  devBtn: {
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#f4f5f7",
    alignItems: "center",
  },
  devBtnText: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 12,
  },

  /* BANNER */
  banner: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  bannerSuccess: {
    borderColor: "#CDEFD7",
    backgroundColor: "#F2FBF5",
  },
  bannerError: {
    borderColor: "#F4C7C7",
    backgroundColor: "#FFF2F2",
  },
  bannerInfo: {
    borderColor: "#C7DDF4",
    backgroundColor: "#F2F7FF",
  },
  bannerTitle: {
    fontWeight: "800",
    color: colors.text,
    textAlign: "center",
    fontSize: 13,
  },
  bannerMsg: {
    color: colors.text,
    textAlign: "center",
    fontSize: 12,
    marginTop: 6,
    lineHeight: 16,
  },
  bannerHint: {
    color: colors.muted,
    textAlign: "center",
    fontSize: 11,
    marginTop: 8,
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  cardHighlight: {
    borderWidth: 1,
    borderColor: "#e9eef7",
  },
  cardWarning: {
    borderWidth: 1,
    borderColor: "#f1ddaa",
    backgroundColor: "#fffaf0",
  },

  /* START ADJUST */
  startAdjustBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eaeaea",
    padding: 12,
  },
  startAdjustHint: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginBottom: 10,
  },
  startAdjustInput: {
    backgroundColor: "#f4f5f7",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "android" ? 10 : 12,
    color: colors.text,
    fontWeight: "800",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  startAdjustRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* HERO 2.0 */
  heroCard: {
    marginBottom: 16,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: colors.surface,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  heroImageFrame: {
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
    overflow: "hidden",
    backgroundColor: colors.primary,
  },
  heroBackdropImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    transform: [{ scale: 1.1 }, { translateX: 12 }],
  },
  heroFadeImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroContentPanel: {
    width: "62%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  heroContentPanelNarrow: {
    width: "66%",
  },
  heroEyebrowRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },
  heroAccentLine: {
    width: 26,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.secondary,
  },
  heroEyebrow: {
    color: colors.secondary,
    fontSize: 11,
    fontWeight: "900",
  },
  heroDateText: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 7,
  },
  heroReferencePressable: {
    alignSelf: "stretch",
  },
  heroReference: {
    color: colors.textInverse,
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 27,
  },
  heroReferenceNarrow: {
    fontSize: 19,
    lineHeight: 23,
  },
  heroStatusPill: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  heroStatusText: {
    color: colors.textInverse,
    fontSize: 9,
    fontWeight: "800",
  },
  heroPrimaryBtn: {
    alignSelf: "flex-start",
    marginTop: 6,
    minHeight: 44,
    maxWidth: "100%",
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary,
  },
  heroPrimaryBtnNarrow: {
    paddingHorizontal: 12,
  },
  heroPrimaryBtnWeb: {
    maxWidth: "100%",
    paddingHorizontal: 14,
  },
  heroPrimaryBtnText: {
    flexShrink: 1,
    color: colors.primary,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    textAlign: "center",
  },
  heroPrimaryBtnTextNarrow: {
    fontSize: 14,
    lineHeight: 19,
  },

  heroPrimaryBtnContent: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  heroPrimaryBtnIcon: {
    flexShrink: 0,
    fontSize: 22,
    marginLeft: 0,
  },
  heroPrimaryBtnIconWeb: {
    marginLeft: 0,
  },

  heroUtilityRow: {
    minHeight: 58,
    marginTop: -16,
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: colors.surface,
    zIndex: 3,
  },
  heroUtilityRowNarrow: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  heroGratitudeText: {
    flexShrink: 1,
    fontSize: 10.5,
    fontWeight: "700",
    textAlign: "left",
  },
  heroGratitudeTextNarrow: {
    textAlign: "center",
  },
  heroMarkReadBtn: {
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  heroMarkReadBtnDisabled: {
    backgroundColor: colors.secondarySoft,
  },
  heroMarkReadText: {
    color: colors.primary,
    fontSize: 10.5,
    fontWeight: "900",
  },
  heroMarkReadTextDisabled: {
    color: colors.secondaryPressed,
  },

  /* PLANO DE LEITURA */
  planSectionHeader: {
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  planSectionTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  planSectionSymbol: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "900",
  },
  planSectionTitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  planSectionLink: {
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "900",
  },
  planProgressCard: {
    minHeight: 116,
    marginBottom: 16,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 7 },
    elevation: 1,
  },
  planPercentCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 5,
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceHighlight,
  },
  planPercentValue: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "900",
  },
  planProgressMain: {
    flex: 1,
    minWidth: 0,
  },
  planProgressTitle: {
    color: colors.primary,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  planProgressDetail: {
    marginTop: 3,
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
  },
  planProgressPhase: {
    marginTop: 3,
    color: colors.muted,
    fontSize: 10,
  },
  planProgressTrack: {
    height: 5,
    marginTop: 9,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: colors.surfaceAlt,
  },
  planProgressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: colors.secondary,
  },
  planProgressChevron: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "500",
    marginLeft: 2,
  },

  /* ACESSOS RÁPIDOS 2x3 */
  quickSectionHeader: {
    marginTop: 2,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  quickSectionEyebrow: {
    color: colors.secondaryPressed,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  quickSectionTitle: {
    marginTop: 2,
    color: colors.primary,
    fontSize: 17,
    fontWeight: "900",
  },
  quickSectionHint: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: "700",
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 9,
    marginBottom: 16,
  },
  quickCard: {
    width: "31.5%",
    height: 122,
    borderRadius: 16,
    paddingHorizontal: 7,
    paddingVertical: 7,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOpacity: 0.035,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  quickCardDisabled: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.divider,
    opacity: 0.88,
  },
  quickIconImage: {
    width: 42,
    height: 42,
    marginBottom: 4,
  },
  quickIconImageDisabled: {
    opacity: 0.68,
  },
  quickTitle: {
    minHeight: 24,
    color: colors.primary,
    fontSize: 10.2,
    lineHeight: 12.5,
    fontWeight: "900",
    textAlign: "center",
  },
  quickTitleDisabled: {
    color: colors.textMuted,
  },
  quickSubtitle: {
    marginTop: 0,
    color: colors.muted,
    fontSize: 8.3,
    lineHeight: 10.5,
    textAlign: "center",
  },
  quickSubtitleDisabled: {
    color: colors.textMuted,
  },
  quickSoonPill: {
    marginTop: 4,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  quickSoonText: {
    color: colors.muted,
    fontSize: 7.5,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  /* BANNER MOTIVACIONAL */
  motivationalBanner: {
    minHeight: 116,
    marginBottom: 16,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: colors.secondarySoft,
  },
  motivationalBackdropWeb: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
  },
  motivationalFadeImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  motivationalContent: {
    alignSelf: "flex-end",
    width: "61%",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  motivationalAccentLine: {
    width: 32,
    height: 3,
    borderRadius: 999,
    backgroundColor: colors.secondary,
    marginBottom: 7,
  },
  motivationalEyebrow: {
    color: colors.secondaryPressed,
    fontSize: 8.5,
    fontWeight: "900",
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  motivationalText: {
    color: colors.primary,
    fontSize: 12.5,
    lineHeight: 17.5,
    fontWeight: "800",
  },

  /* BUTTONS */
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  secondaryBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "900",
    textAlign: "center",
    paddingHorizontal: 8,
  },

  /* SECTIONS */
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center",
  },
  sectionMuted: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 16,
  },
  sectionBody: {
    fontSize: 13,
    color: colors.text,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },
  sectionBodyStrong: {
    fontSize: 14,
    color: colors.text,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
    fontWeight: "900",
  },

  /* KPIs */
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statsGridNarrow: {
    flexDirection: "column",
  },
  kpiLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "800",
    textAlign: "center",
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center",
    marginTop: 6,
  },
  kpiHint: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginTop: 6,
  },

  /* VERSE MODAL */
  verseOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  verseModal: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "100%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  verseTitle: {
    fontSize: 16,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 8,
    color: colors.primary,
  },
  verseTheme: {
    fontSize: 12,
    textAlign: "center",
    color: colors.muted,
    marginBottom: 10,
    fontStyle: "italic",
  },
  verseText: {
    fontSize: 15,
    textAlign: "center",
    color: colors.text,
    lineHeight: 22,
    fontWeight: "600",
  },
  verseRef: {
    marginTop: 12,
    fontSize: 13,
    textAlign: "center",
    color: colors.secondary,
    fontWeight: "800",
  },
});
