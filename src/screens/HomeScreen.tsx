import {
  Text,
  View,
  Pressable,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../theme/colors";
import { readingPlan } from "../data/readingPlan";
import { phases } from "../data/phases";
import { RootStackParamList } from "../app_router_off";
import { runAutoBackup } from "../utils/autoBackup";

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

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

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

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

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

  // ✅ gratidão do dia (badge simples)
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

  const loadPlanStartAndOverdue = useCallback(async () => {
    try {
      const start = await getPlanStartDate();
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
  }, [today, loadResolvedForDate]);

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

      await loadProgress();
      await loadGratitude();
      await loadPlanStartAndOverdue();
      await runAutoBackup();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      await loadProgress();
      await loadGratitude();
      await loadPlanStartAndOverdue();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  async function startPlanNowAndOpen() {
    try {
      const start = await ensurePlanStartDate(today);
      setPlanStartDateState(start);

      // após iniciar, resolve novamente (agora com plano iniciado)
      await loadResolvedForDate(today, true);

      // ✅ pega a referência efetiva do dia (evita usar estado “antigo”)
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

      await loadPlanStartAndOverdue();

      if (isMilestone(newStreak)) {
        notify("Marco alcançado ✅", getMilestoneMessage(newStreak));
        setBanner({ kind: "success", title: "Marco alcançado ✅", message: getMilestoneMessage(newStreak) });
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
      setBanner({ kind: "info", title: "Plano concluído 🎉", message: "Você pode revisar pelo Plano Anual e Histórico." });
      return;
    }

    if (!planStartDate) {
      // no Web o Alert de múltiplos botões pode falhar; aqui usamos confirm cross-platform
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

      await loadPlanStartAndOverdue();
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        {/* Cabeçalho com ícone */}
        <View style={styles.header}>
          <Image source={require("../../assets/icon.png")} style={styles.logo} resizeMode="cover" />

          <Pressable onLongPress={toggleDevMode} delayLongPress={2000}>
            <Text style={styles.title}>Jornada Bíblica</Text>
          </Pressable>

          {devMode && <Text style={styles.devMode}>🔧 Modo Desenvolvedor ativo</Text>}

          <Text style={styles.subTitle}>Plano Anual • Leitura Bíblica</Text>
        </View>

        {/* ✅ Banner */}
        {banner && (
          <Pressable
            onPress={() => setBanner(null)}
            style={[
              styles.banner,
              banner.kind === "success" && styles.bannerSuccess,
              banner.kind === "error" && styles.bannerError,
              banner.kind === "info" && styles.bannerInfo,
            ]}
          >
            <Text style={styles.bannerTitle}>{banner.title}</Text>
            {!!banner.message && <Text style={styles.bannerMsg}>{banner.message}</Text>}
            <Text style={styles.bannerHint}>Toque para fechar</Text>
          </Pressable>
        )}

        {/* Card: nível/marcos */}
        <View style={styles.card}>
          <Text style={styles.cardMuted}>
            Nível: <Text style={styles.cardStrong}>{level.title}</Text> • {level.subtitle}
          </Text>

          {nextMilestone.next ? (
            <Text style={styles.cardMuted}>
              Próximo marco: {nextMilestone.next} dias (faltam {nextMilestone.remaining})
            </Text>
          ) : (
            <Text style={styles.cardMuted}>Você já passou por todos os marcos definidos.</Text>
          )}
        </View>

        {/* Card: atrasos */}
        {planStartDate && overdueCount > 0 && (
          <View style={[styles.card, { borderLeftWidth: 4, borderLeftColor: colors.secondary }]}>
            <Text style={styles.cardStrong}>⚠️ Leituras atrasadas: {overdueCount}</Text>
            <Text style={styles.cardMuted}>(Domingos não contam — domingo é livre)</Text>

            <View style={{ height: 10 }} />

            <TouchableOpacity style={styles.primaryBtn} onPress={openOldestOverdue}>
              <Text style={styles.btnText}>📖 Ler atraso mais antigo</Text>
            </TouchableOpacity>

            <View style={{ height: 10 }} />

            <TouchableOpacity style={styles.secondaryBtn} onPress={handleRedistributeOverdue}>
              <Text style={styles.btnText}>🔁 Redistribuir atrasos</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STREAK */}
        <View style={styles.card}>
          <Text style={styles.cardStrong}>
            🔥 Streak atual: {streak} dia{streak !== 1 ? "s" : ""}
          </Text>

          {lastRead && <Text style={styles.cardMuted}>Última leitura: {lastRead}</Text>}

          <Text style={[styles.cardText, { marginTop: 8 }]}>{dailyMessage}</Text>
        </View>

        {/* FASE ATUAL */}
        {currentPhase && (
          <View style={styles.card}>
            <Text style={styles.cardStrong}>📘 Fase atual</Text>
            <Text style={styles.cardText}>{currentPhase.title}</Text>
            <Text style={styles.cardMuted}>{currentPhase.description}</Text>
          </View>
        )}

        {/* LEITURA DO DIA */}
        <View style={styles.card}>
          <Text style={styles.cardMuted}>Leitura do dia</Text>
          <Text style={styles.dateLabel}>{todayLabel}</Text>

          <Pressable onPress={openReading}>
            <Text style={styles.readingRef}>{resolvedToday.reference}</Text>
          </Pressable>

          {/* indicador de gratidão do dia */}
          {canRegisterGratitudeToday && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: todayGratitude ? colors.secondary : colors.muted,
                marginTop: 6,
              }}
            >
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
            <>
              <TouchableOpacity style={styles.primaryBtn} onPress={openReading}>
                <Text style={styles.btnText}>📖 Abrir leitura</Text>
              </TouchableOpacity>

              <View style={{ height: 10 }} />

              <TouchableOpacity
                style={[styles.secondaryBtn, isCompletedToday ? styles.btnDisabled : null]}
                onPress={markAsCompleted}
                disabled={isCompletedToday || resolvedToday.finished}
              >
                <Text style={styles.btnText}>
                  {isCompletedToday ? "✅ Leitura concluída" : "✔️ Marcar como lido"}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Navegação */}
        <View style={styles.menuGrid}>
          <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate("Plan")}>
            <Text style={styles.menuText}>📅 Plano Anual</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate("Progress")}>
            <Text style={styles.menuText}>📊 Progresso</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate("History")}>
            <Text style={styles.menuText}>📜 Histórico</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate("Settings")}>
            <Text style={styles.menuText}>⚙️ Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");
const CARD_MAX = 560;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    alignSelf: "center",
    width: "100%",
    maxWidth: CARD_MAX,
  },
  header: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 14,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  subTitle: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 12,
    textAlign: "center",
  },
  devMode: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 12,
    color: colors.muted,
  },

  // ✅ Banner
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
    fontWeight: "bold",
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardStrong: {
    fontWeight: "bold",
    color: colors.text,
    textAlign: "center",
    fontSize: 14,
  },
  cardMuted: {
    color: colors.muted,
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
  },
  cardText: {
    color: colors.text,
    textAlign: "center",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  dateLabel: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  readingRef: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 4,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  secondaryBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 6,
  },
  menuBtn: {
    width: width < 420 ? "100%" : "48%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    alignItems: "center",
  },
  menuText: {
    color: colors.text,
    fontWeight: "bold",
  },
});
