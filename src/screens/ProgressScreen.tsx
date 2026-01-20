import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../theme/colors";
import { readingPlan } from "../data/readingPlan";

// ✅ plano atemporal
import {
  getCompletedDays,
  calculateStreak,
  getPlanStartDate,
} from "../services/progressStore";

/* ==========================
   HELPERS
========================== */

function isIsoDateString(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function isoToLocalNoon(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
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
  return isoToLocalNoon(iso).getDay() === 0;
}

function formatDdMm(iso: string) {
  const [_, m, d] = iso.split("-");
  return `${d}/${m}`;
}

/* ==========================
   COMPONENT
========================== */

export default function ProgressScreen() {
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [planStartDate, setPlanStartDate] = useState<string | null>(null);
  const [gratitudeCount, setGratitudeCount] = useState(0);

  const loadData = useCallback(async () => {
    const days = await getCompletedDays();
    setCompletedDays(days);

    const base = new Date();
    base.setHours(12, 0, 0, 0);
    setStreak(calculateStreak(days, base));

    const start = await getPlanStartDate();
    setPlanStartDate(start);

    try {
      const raw = await AsyncStorage.getItem("gratitudeByDate");
      const parsed = raw ? JSON.parse(raw) : {};
      setGratitudeCount(Object.keys(parsed).length);
    } catch {
      setGratitudeCount(0);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  /* ==========================
     PROGRESSO ATEMPORAL
  ========================== */

  const totalUsefulDays = useMemo(
    () => readingPlan.filter((d) => !d.isSunday).length,
    []
  );

  const completedUsefulDays = useMemo(() => {
    if (!planStartDate) return 0;
    return completedDays.length;
  }, [completedDays, planStartDate]);

  const percent = useMemo(() => {
    if (!planStartDate || totalUsefulDays === 0) return 0;
    return Math.round((completedUsefulDays / totalUsefulDays) * 100);
  }, [completedUsefulDays, totalUsefulDays, planStartDate]);

  /* ==========================
     SEMANA ATUAL
  ========================== */

  const todayIso = dateToIsoLocal(new Date());

  const weekDates = useMemo(() => {
    const today = isoToLocalNoon(todayIso);
    const dow = today.getDay(); // 0 domingo
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dow);

    return Array.from({ length: 7 }).map((_, i) =>
      dateToIsoLocal(new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + i, 12))
    );
  }, [todayIso]);

  /* ==========================
     RENDER
  ========================== */

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.screenTitle}>Progresso</Text>
          <Text style={styles.screenSubtitle}>
            Acompanhe sua constância e evolução na leitura.
          </Text>
        </View>

        {/* PROGRESSO GERAL */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📈 Progresso Geral</Text>
          <Text style={styles.percent}>{percent}%</Text>

          <View style={{ height: 10 }} />

          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${percent}%` },
              ]}
            />
          </View>

          <Text style={styles.cardMuted}>
            {completedUsefulDays} de {totalUsefulDays} leituras concluídas
          </Text>
        </View>

        {/* STREAK */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥 Streak</Text>
          <Text style={styles.cardBig}>{streak}</Text>
          <Text style={styles.cardMuted}>dias consecutivos</Text>
        </View>

        {/* SEMANA */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🗓️ Semana atual</Text>

          <View style={styles.weekRow}>
            {weekDates.map((dIso) => {
              const isSunday = isSundayIso(dIso);
              const done = completedDays.includes(dIso);

              return (
                <View key={dIso} style={styles.weekItem}>
                  <Text style={styles.weekLabel}>{formatDdMm(dIso)}</Text>
                  <Text
                    style={[
                      styles.weekDot,
                      isSunday
                        ? styles.weekDotSunday
                        : done
                        ? styles.weekDotDone
                        : styles.weekDotMiss,
                    ]}
                  >
                    ●
                  </Text>
                </View>
              );
            })}
          </View>

          <Text style={[styles.cardMuted, { marginTop: 10 }]}>
            ● Cinza = domingo • verde = lido • vermelho = pendente
          </Text>
        </View>

        {/* GRATIDÃO */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🙏 Diário de Gratidão</Text>
          <Text style={styles.cardBig}>{gratitudeCount}</Text>
          <Text style={styles.cardMuted}>registros salvos no seu celular</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* ==========================
   STYLES
========================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 6,
  },
  cardBig: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginTop: 6,
  },
  cardMuted: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginTop: 6,
  },
  percent: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekItem: {
    width: "14%",
    alignItems: "center",
  },
  weekLabel: {
    fontSize: 10,
    color: colors.muted,
  },
  weekDot: {
    fontSize: 18,
    marginTop: 6,
  },
  weekDotSunday: {
    color: "#999",
  },
  weekDotDone: {
    color: "green",
  },
  weekDotMiss: {
    color: "#D32F2F",
  },
});
