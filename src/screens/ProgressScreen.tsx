import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { colors } from "../theme/colors";
import { readingPlan } from "../data/readingPlan";

import { calculateStreak, getCompletedDays } from "../services/progressStore";

// ✅ gamificação leve
import { getLevelForStreak, getNextMilestone } from "../constants/gamification";

// --- HELPERS (Lógica preservada) ---

function isoToLocalDate(isoDate: string) {
  // "2026-01-07" -> Date local no meio-dia (evita bug de fuso/UTC)
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!m) return new Date(isoDate);
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const d = Number(m[3]);
  return new Date(y, mo, d, 12, 0, 0);
}

function clampPercent(n: number) {
  if (Number.isNaN(n) || !Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

// ✅ Experiência Espiritual
const GRATITUDE_KEY = "gratitudeByDate";

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

export default function ProgressScreen() {
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [weeklyCount, setWeeklyCount] = useState(0);
  const [streak, setStreak] = useState(0);

  // ✅ espiritual: gratidão
  const [gratitudeByDate, setGratitudeByDate] = useState<Record<string, string>>({});

  // mantém fixo no ciclo de vida desta tela (ok)
  const today = useMemo(() => new Date(), []);

  const calculateWeeklyProgress = useCallback((days: string[]) => {
    const now = new Date();

    // Semana: Domingo (0) a Sábado (6)
    const startOfWeek = new Date(now);
    startOfWeek.setHours(12, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // ✅ Domingo é "livre": não conta no semanal, mesmo se marcado
    const count = days.filter((dateStr) => {
      const d = isoToLocalDate(dateStr);
      if (d.getDay() === 0) return false; // domingo fora
      return d >= startOfWeek && d <= endOfWeek;
    }).length;

    setWeeklyCount(count);
  }, []);

  const loadGratitude = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      setGratitudeByDate(sanitizeGratitudeMap(parsed));
    } catch (err) {
      console.log("Erro ao carregar gratitudeByDate", err);
      setGratitudeByDate({});
    }
  }, []);

  const loadProgress = useCallback(async () => {
    try {
      // ✅ fonte única da verdade
      const days = await getCompletedDays();

      setCompletedDays(days);
      calculateWeeklyProgress(days);

      // ✅ streak baseado no "agora", mas fixando meio-dia local para evitar bug UTC
      const base = new Date();
      base.setHours(12, 0, 0, 0);
      setStreak(calculateStreak(days, base));

      // ✅ espiritual
      await loadGratitude();
    } catch (err) {
      console.log("Erro ao carregar progresso", err);
      setCompletedDays([]);
      setWeeklyCount(0);
      setStreak(0);
      setGratitudeByDate({});
    }
  }, [calculateWeeklyProgress, loadGratitude]);

  // ✅ Atualiza sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, [loadProgress])
  );

  /* =======================
     RESUMO MENSAL
  ======================= */
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthlyPlanDays = useMemo(() => {
    return readingPlan.filter((d) => {
      const date = isoToLocalDate(d.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear &&
        !d.isSunday
      );
    });
  }, [currentMonth, currentYear]);

  const monthlyCompleted = useMemo(() => {
    return completedDays.filter((d) => {
      const date = isoToLocalDate(d);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
  }, [completedDays, currentMonth, currentYear]);

  const monthlyPercent = useMemo(() => {
    if (monthlyPlanDays.length === 0) return 0;
    return clampPercent((monthlyCompleted.length / monthlyPlanDays.length) * 100);
  }, [monthlyCompleted.length, monthlyPlanDays.length]);

  /* =======================
     RESUMO ANUAL
  ======================= */
  const totalPlanDays = useMemo(() => readingPlan.filter((d) => !d.isSunday).length, []);

  const annualPercent = useMemo(() => {
    if (totalPlanDays === 0) return 0;
    return clampPercent((completedDays.length / totalPlanDays) * 100);
  }, [completedDays.length, totalPlanDays]);

  const remainingDays = useMemo(() => {
    const rem = totalPlanDays - completedDays.length;
    return rem < 0 ? 0 : rem;
  }, [totalPlanDays, completedDays.length]);

  /* =======================
     GAMIFICAÇÃO (leve)
  ======================= */
  const level = useMemo(() => getLevelForStreak(streak), [streak]);
  const nextMilestone = useMemo(() => getNextMilestone(streak), [streak]);

  function getMotivationMessage(percent: number) {
    if (percent === 0) return "Toda grande jornada começa com um passo.";
    if (percent < 25) return "Continue firme! Deus honra a constância.";
    if (percent < 50) return "Você já avançou bastante. Persevere!";
    if (percent < 75) return "A jornada está florescendo. Não desista!";
    if (percent < 100) return "Você está muito perto da conclusão!";
    return "Parabéns! Você completou a Jornada Bíblica 🎉";
  }

  // meta semanal: 6 dias úteis (domingo livre)
  const weeklyGoal = 6;
  const weeklyPercent = clampPercent((weeklyCount / weeklyGoal) * 100);

  /* =======================
     ESPIRITUAL (indicadores)
  ======================= */
  const gratitudeCount = useMemo(() => Object.keys(gratitudeByDate).length, [gratitudeByDate]);

  const completedWithGratitudeCount = useMemo(() => {
    if (completedDays.length === 0) return 0;
    let c = 0;
    for (const d of completedDays) {
      if (typeof gratitudeByDate[d] === "string" && gratitudeByDate[d].trim()) c += 1;
    }
    return c;
  }, [completedDays, gratitudeByDate]);

  const gratitudeCoveragePercent = useMemo(() => {
    if (completedDays.length === 0) return 0;
    return clampPercent((completedWithGratitudeCount / completedDays.length) * 100);
  }, [completedWithGratitudeCount, completedDays.length]);

  // --- RENDER ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HEADER */}
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.screenTitle}>Seu Progresso</Text>
            <Text style={styles.screenSubtitle}>Visualizando sua constância e crescimento.</Text>
        </View>

        {/* 1. CARD HERO: STREAK & LEVEL */}
        <View style={styles.heroCard}>
            <View style={styles.heroHeader}>
                <View>
                    <Text style={styles.streakLabel}>🔥 Streak Atual</Text>
                    <Text style={styles.streakValue}>{streak} dias</Text>
                </View>
                <View style={styles.levelBadge}>
                    <Text style={styles.levelIcon}>{level.icon || "🌱"}</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View>
                <Text style={styles.levelTitle}>Nível: {level.title}</Text>
                <Text style={styles.levelSubtitle}>{level.subtitle}</Text>
            </View>

            {nextMilestone.next ? (
                <View style={styles.milestoneBox}>
                    <Text style={styles.milestoneText}>
                        🚀 Próximo marco em {nextMilestone.remaining} dias
                    </Text>
                </View>
            ) : (
                <Text style={styles.milestoneComplete}>🏆 Você é um campeão da consistência!</Text>
            )}
        </View>

        {/* 2. CARD SEMANA */}
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>📅 Semana Atual</Text>
                <Text style={styles.cardValue}>{weeklyCount}/{weeklyGoal}</Text>
            </View>
            <Text style={styles.cardDesc}>Dias lidos (Domingo é livre)</Text>
            
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${weeklyPercent}%` }]} />
            </View>
        </View>

        {/* 3. CARD MENSAL */}
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>🗓️ Mês Atual</Text>
                <Text style={styles.cardValue}>{monthlyPercent}%</Text>
            </View>
            <Text style={styles.cardDesc}>
                {monthlyCompleted.length} de {monthlyPlanDays.length} leituras realizadas
            </Text>
            
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${monthlyPercent}%` }]} />
            </View>
        </View>

        {/* 4. CARD ANUAL */}
        <View style={styles.card}>
             <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>📊 Ano Completo</Text>
                <Text style={styles.cardValue}>{annualPercent}%</Text>
            </View>
            <Text style={styles.cardDesc}>
                {completedDays.length} de {totalPlanDays} dias totais
            </Text>
            
            <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${annualPercent}%` }]} />
            </View>
            
            <Text style={styles.remainingText}>
                Faltam apenas {remainingDays} dias para concluir o plano!
            </Text>
        </View>

        {/* 5. CARD GRATIDÃO (Espiritual) */}
        <View style={[styles.card, styles.gratitudeCard]}>
            <Text style={styles.gratitudeTitle}>🙏 Diário de Gratidão</Text>
            
            <View style={styles.gratitudeStatsRow}>
                <View style={styles.gratitudeStatItem}>
                    <Text style={styles.gratitudeVal}>{gratitudeCount}</Text>
                    <Text style={styles.gratitudeLbl}>Total</Text>
                </View>
                <View style={{ width: 1, backgroundColor: "#E0E0E0", height: 30 }} />
                <View style={styles.gratitudeStatItem}>
                    <Text style={styles.gratitudeVal}>{gratitudeCoveragePercent}%</Text>
                    <Text style={styles.gratitudeLbl}>Frequência</Text>
                </View>
            </View>
            
            <Text style={styles.gratitudeFooter}>
                Você registrou gratidão em {completedWithGratitudeCount} dos dias lidos.
            </Text>
        </View>

        {/* FRASE DE MOTIVAÇÃO */}
        <View style={styles.motivationContainer}>
            <Text style={styles.motivationText}>
                "{getMotivationMessage(annualPercent)}"
            </Text>
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// === ESTILOS ===
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F8",
    },
    scrollContent: {
        padding: 20,
        paddingTop: 10,
    },
    // Tipografia Geral
    screenTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 4,
    },
    screenSubtitle: {
        fontSize: 14,
        color: colors.muted,
    },
    // Hero Card
    heroCard: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
        shadowColor: colors.primary,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    heroHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    streakLabel: {
        fontSize: 12,
        color: colors.muted,
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    streakValue: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.secondary,
    },
    levelBadge: {
        backgroundColor: "#F0F4FF",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    levelIcon: {
        fontSize: 24,
    },
    divider: {
        height: 1,
        backgroundColor: "#EEE",
        marginVertical: 16,
    },
    levelTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 2,
    },
    levelSubtitle: {
        fontSize: 14,
        color: colors.muted,
    },
    milestoneBox: {
        marginTop: 12,
        backgroundColor: "#FFF9F0",
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    milestoneText: {
        color: colors.secondary,
        fontSize: 12,
        fontWeight: "600",
    },
    milestoneComplete: {
        marginTop: 12,
        color: "green",
        fontSize: 12,
        fontWeight: "bold",
    },
    // Standard Cards
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.primary,
    },
    cardValue: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.text,
    },
    cardDesc: {
        fontSize: 12,
        color: colors.muted,
        marginBottom: 12,
    },
    progressBarBg: {
        height: 10,
        backgroundColor: "#F0F0F0",
        borderRadius: 5,
        overflow: "hidden",
    },
    progressBarFill: {
        height: "100%",
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    remainingText: {
        marginTop: 10,
        fontSize: 12,
        color: colors.secondary,
        textAlign: "center",
        fontStyle: "italic",
    },
    // Gratitude Card
    gratitudeCard: {
        borderLeftWidth: 4,
        borderLeftColor: colors.secondary,
    },
    gratitudeTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.secondary,
        marginBottom: 16,
        textAlign: "center",
    },
    gratitudeStatsRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 16,
    },
    gratitudeStatItem: {
        alignItems: "center",
    },
    gratitudeVal: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.text,
    },
    gratitudeLbl: {
        fontSize: 12,
        color: colors.muted,
    },
    gratitudeFooter: {
        textAlign: "center",
        fontSize: 12,
        color: colors.muted,
    },
    // Motivation
    motivationContainer: {
        marginTop: 10,
        padding: 16,
    },
    motivationText: {
        textAlign: "center",
        fontSize: 16,
        color: colors.secondary,
        fontStyle: "italic",
        fontWeight: "500",
    },
});