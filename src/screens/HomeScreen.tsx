import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
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
import { phases } from "../data/phases";
import type { AppDrawerParamList, MainTabParamList, RootStackParamList } from "../navigation/types";
import { runAutoBackup } from "../utils/autoBackup";
import { APP_INFO } from "../constants/appInfo";
import { useAppShellChrome } from "../navigation/AppShellChromeContext";
import { VERSES_OF_DAY, pickVerseForToday, type VerseItem } from "../data/versesOfDay";

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

function Pill({
  text,
  variant = "neutral",
}: {
  text: string;
  variant?: "neutral" | "success" | "warning" | "info";
}) {
  return (
    <View
      style={[
        styles.pill,
        variant === "success" && styles.pillSuccess,
        variant === "warning" && styles.pillWarning,
        variant === "info" && styles.pillInfo,
      ]}
    >
      <Text style={styles.pillText}>{text}</Text>
    </View>
  );
}

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

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
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

  // ✅ banner de feedback (aparece sempre)
  const [banner, setBanner] = useState<BannerState>(null);

  // ✅ Experiência Espiritual: gratidão
  const [gratitudeByDate, setGratitudeByDate] = useState<Record<string, string>>({});

  // ✅ Versículo do dia (modal)
  const [showVerseModal, setShowVerseModal] = useState(false);
  const [verseOfDay, setVerseOfDay] = useState<VerseItem | null>(null);

  // ✅ Acessos rápidos recolhível
  const [quickNavOpen, setQuickNavOpen] = useState(false);

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

  // ✅ fase (apenas informativa; continua usando intervalos das fases)
  const currentPhase = useMemo(
    () => phases.find((phase) => today >= phase.startDate && today <= phase.endDate),
    [today]
  );

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

  const quickNavLabel = useMemo(() => (quickNavOpen ? "Ocultar" : "Mostrar"), [quickNavOpen]);

  // Mostra card de alinhamento quando:
  // - existe progresso (completedDays) e
  // - planStartDate já existe (migrado ou definido) e
  // - usuário pode ajustar
  const hasLegacyProgress = useMemo(() => completedDays.length > 0, [completedDays.length]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.safeInner}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* HEADER */}
          <View style={styles.headerWrap}>
            <View style={styles.headerTop}>
              <View style={styles.logoWrap}>
                <Image source={require("../../assets/icon.png")} style={styles.logo} resizeMode="cover" />
              </View>

              <View style={{ flex: 1 }}>
                <Pressable onLongPress={toggleDevMode} delayLongPress={2000}>
                  <Text style={styles.title}>{APP_INFO.name}</Text>
                </Pressable>
                <Text style={styles.subTitle}>Plano Anual • Leitura Bíblica</Text>
              </View>
            </View>

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
          </View>

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

          {/* ✅ CARD: ALINHAMENTO (MIGRAÇÃO + AJUSTE) */}
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
                  <Text style={styles.btnText}>✏️ Ajustar data de início</Text>
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

          {/* HERO - LEITURA DO DIA (CTA PRINCIPAL) */}
          <Card variant="highlight">
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroLabel}>Hoje</Text>
                <Text style={styles.heroDate}>{todayLabel}</Text>
              </View>

              <Pill text={todayStatusPill.text} variant={todayStatusPill.variant} />
            </View>

            <Pressable onPress={openReading} accessibilityRole="button" accessibilityLabel="Abrir leitura do dia">
              <Text style={styles.heroReference}>{resolvedToday.reference}</Text>
            </Pressable>

            {canRegisterGratitudeToday && (
              <Text style={[styles.heroMeta, { color: todayGratitude ? colors.secondary : colors.muted }]}>
                {todayGratitude ? "🙏 Gratidão registrada" : "✍️ Gratidão: ainda não registrada"}
              </Text>
            )}

            <View style={{ height: 12 }} />

            {!planStartDate ? (
              <TouchableOpacity style={styles.primaryBtn} onPress={startPlanNowAndOpen}>
                <Text style={styles.btnText}>🚀 Começar plano hoje</Text>
              </TouchableOpacity>
            ) : resolvedToday.isSunday ? (
              <TouchableOpacity style={styles.primaryBtn} onPress={openReading}>
                <Text style={styles.btnText}>🙏 Abrir meditação</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.heroButtons}>
                <TouchableOpacity style={[styles.primaryBtn, styles.heroBtn]} onPress={openReading}>
                  <Text style={styles.btnText}>📖 Abrir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.secondaryBtn,
                    styles.heroBtn,
                    (isCompletedToday || resolvedToday.finished) && styles.btnDisabled,
                  ]}
                  onPress={markAsCompleted}
                  disabled={isCompletedToday || resolvedToday.finished}
                >
                  <Text style={styles.btnText}>{isCompletedToday ? "✅ Concluído" : "✔️ Marcar lido"}</Text>
                </TouchableOpacity>
              </View>
            )}
          </Card>

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

          {/* STATS GRID */}
          <View style={styles.statsGrid}>
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

          {/* MENSAGEM DO DIA */}
          <Card>
            <Text style={styles.sectionTitle}>💬 Mensagem do dia</Text>
            <Text style={styles.sectionBody}>{dailyMessage}</Text>
          </Card>

          {/* FASE ATUAL */}
          {currentPhase && (
            <Card>
              <Text style={styles.sectionTitle}>📘 Fase atual</Text>
              <Text style={styles.sectionBodyStrong}>{currentPhase.title}</Text>
              <Text style={styles.sectionMuted}>{currentPhase.description}</Text>
            </Card>
          )}

          {/* QUICK NAV (RECOLHÍVEL) */}
          <TouchableOpacity
            style={styles.quickNavToggle}
            onPress={() => setQuickNavOpen((p) => !p)}
            accessibilityRole="button"
            accessibilityLabel="Abrir ou fechar acessos rápidos"
          >
            <Text style={styles.quickNavToggleTitle}>Acessos rápidos</Text>
            <View style={styles.quickNavToggleRight}>
              <Text style={styles.quickNavToggleHint}>{quickNavLabel}</Text>
              <Text style={styles.quickNavToggleChevron}>{quickNavOpen ? "˄" : "˅"}</Text>
            </View>
          </TouchableOpacity>

          {quickNavOpen && (
            <View style={styles.menuGrid}>
              <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate("PlanTab")}>
                <Text style={styles.menuEmoji}>📅</Text>
                <Text style={styles.menuText}>Plano Anual</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate("Progress")}>
                <Text style={styles.menuEmoji}>📊</Text>
                <Text style={styles.menuText}>Progresso</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate("History")}>
                <Text style={styles.menuEmoji}>📜</Text>
                <Text style={styles.menuText}>Histórico</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate("Settings")}>
                <Text style={styles.menuEmoji}>⚙️</Text>
                <Text style={styles.menuText}>Configurações</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{ height: 10 }} />
        </ScrollView>

        {/* ✅ MODAL: VERSÍCULO DO DIA */}
        {showVerseModal && verseOfDay && (
          <View style={styles.verseOverlay} accessible accessibilityRole="alert" accessibilityLabel="Versículo do dia">
            <View style={styles.verseModal} accessible>
              <Text style={styles.verseTitle}>📖 Versículo do Dia</Text>

              {!!verseOfDay.theme && <Text style={styles.verseTheme}>{verseOfDay.theme}</Text>}

              <Text style={styles.verseText}>"{verseOfDay.text}"</Text>

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
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");
const CARD_MAX = 560;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeInner: {
    flex: 1,
    position: "relative",
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

  /* HEADER */
  headerWrap: {
    marginTop: 6,
    marginBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
  },
  subTitle: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
  },

  devPanel: {
    marginTop: 10,
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

  /* HERO */
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 10,
  },
  heroLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },
  heroDate: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "800",
    marginTop: 2,
  },
  heroReference: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
    marginTop: 2,
  },
  heroMeta: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "700",
  },
  heroButtons: {
    flexDirection: width < 380 ? "column" : "row",
    gap: 10,
  },
  heroBtn: {
    flex: 1,
  },

  /* PILL */
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#f2f3f5",
  },
  pillSuccess: {
    backgroundColor: "#eaf8ef",
  },
  pillWarning: {
    backgroundColor: "#fff1e0",
  },
  pillInfo: {
    backgroundColor: "#eaf2ff",
  },
  pillText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.text,
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
    flexDirection: width < 420 ? "column" : "row",
    gap: 12,
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

  /* QUICK NAV (RECOLHÍVEL) */
  quickNavToggle: {
    marginTop: 6,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  quickNavToggleTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
  },
  quickNavToggleRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quickNavToggleHint: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "800",
  },
  quickNavToggleChevron: {
    fontSize: 18,
    color: colors.muted,
    fontWeight: "900",
    marginTop: -2,
  },

  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  menuBtn: {
    width: width < 420 ? "100%" : "48%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  menuEmoji: {
    fontSize: 20,
    marginBottom: 8,
  },
  menuText: {
    color: colors.text,
    fontWeight: "900",
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
