import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../theme/colors";
import { readingPlan } from "../data/readingPlan";

// ✅ plano atemporal
import { getCompletedDays, calculateStreak, getPlanStartDate } from "../services/progressStore";

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

function isSundayIso(iso: string): boolean {
  return isoToLocalNoon(iso).getDay() === 0;
}

function formatDdMm(iso: string) {
  const [_, m, d] = iso.split("-");
  return `${d}/${m}`;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function shadowCard() {
  return Platform.select({
    android: { elevation: 3 },
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
    },
    default: {},
  }) as any;
}

/* ==========================
   UI COMPONENTS (LOCAL)
========================== */

function Card({ children }: { children: React.ReactNode }) {
  return <View style={[styles.card, shadowCard()]}>{children}</View>;
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <View style={{ marginBottom: subtitle ? 10 : 8 }}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function StatTile({
  icon,
  label,
  value,
  helper,
  tone = "primary",
}: {
  icon: string;
  label: string;
  value: string;
  helper?: string;
  tone?: "primary" | "secondary" | "neutral";
}) {
  const bg =
    tone === "primary"
      ? "rgba(4,206,146,0.10)"
      : tone === "secondary"
      ? "rgba(218,165,32,0.14)"
      : "rgba(0,0,0,0.05)";

  const fg = tone === "primary" ? colors.primary : tone === "secondary" ? colors.secondary : colors.text;

  return (
    <View style={[styles.statTile, { backgroundColor: bg }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color: fg }]}>{value}</Text>
      {!!helper && <Text style={styles.statHelper}>{helper}</Text>}
    </View>
  );
}

function WeekChip({
  label,
  state,
}: {
  label: string;
  state: "SUNDAY" | "DONE" | "MISS";
}) {
  const bg =
    state === "DONE"
      ? "rgba(4,206,146,0.12)"
      : state === "SUNDAY"
      ? "rgba(0,0,0,0.06)"
      : "rgba(211,47,47,0.10)";

  const fg =
    state === "DONE" ? colors.primary : state === "SUNDAY" ? colors.muted : "#B71C1C";

  const dot =
    state === "DONE" ? "●" : state === "SUNDAY" ? "●" : "●";

  return (
    <View style={[styles.weekChip, { backgroundColor: bg, borderColor: "rgba(0,0,0,0.06)" }]}>
      <Text style={[styles.weekChipLabel, { color: fg }]}>{label}</Text>
      <Text style={[styles.weekChipDot, { color: fg }]}>{dot}</Text>
    </View>
  );
}

/* ==========================
   COMPONENT
========================== */

export default function ProgressScreen() {
  const { width } = useWindowDimensions();
  const maxWidth = clamp(width, 360, 820);

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
      const safe = parsed && typeof parsed === "object" ? parsed : {};
      setGratitudeCount(Object.keys(safe).length);
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

  const totalUsefulDays = useMemo(() => readingPlan.filter((d) => !d.isSunday).length, []);

  const completedUsefulDays = useMemo(() => {
    if (!planStartDate) return 0;
    return completedDays.length;
  }, [completedDays, planStartDate]);

  const percent = useMemo(() => {
    if (!planStartDate || totalUsefulDays === 0) return 0;
    return Math.round((completedUsefulDays / totalUsefulDays) * 100);
  }, [completedUsefulDays, totalUsefulDays, planStartDate]);

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

  const planStatusText = useMemo(() => {
    if (!planStartDate || !isIsoDateString(planStartDate)) return "Plano ainda não iniciado";
    return `Início do plano: ${formatDdMm(planStartDate)} (atemp.)`;
  }, [planStartDate]);

  /* ==========================
     RENDER
  ========================== */

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: width >= 700 ? 24 : 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentWrap, { maxWidth, alignSelf: "center" }]}>
          {/* HERO */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Progresso</Text>
            <Text style={styles.heroSubtitle}>Acompanhe sua constância e evolução na leitura.</Text>
            <Text style={styles.heroHint}>{planStatusText}</Text>
          </View>

          {/* MÉTRICAS (grid) */}
          <View style={styles.statsGrid}>
            <StatTile
              icon="📈"
              label="Progresso"
              value={`${percent}%`}
              helper={`${completedUsefulDays} de ${totalUsefulDays}`}
              tone="primary"
            />
            <StatTile
              icon="🔥"
              label="Streak"
              value={`${streak}`}
              helper="dias consecutivos"
              tone="secondary"
            />
            <StatTile
              icon="🙏"
              label="Gratidão"
              value={`${gratitudeCount}`}
              helper="registros salvos"
              tone="neutral"
            />
          </View>

          {/* PROGRESSO DETALHADO */}
          <Card>
            <SectionTitle icon="📊" title="Progresso geral" subtitle="Sua barra de avanço no plano (dias úteis)" />

            <View style={styles.progressRow}>
              <Text style={styles.progressPercent}>{percent}%</Text>
              <Text style={styles.progressMeta}>
                {completedUsefulDays} / {totalUsefulDays}
              </Text>
            </View>

            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
            </View>

            <Text style={styles.mutedCenter}>
              Domingos não contam como leitura obrigatória (dia livre).
            </Text>
          </Card>

          {/* SEMANA ATUAL */}
          <Card>
            <SectionTitle icon="🗓️" title="Semana atual" subtitle="Visão rápida da constância nesta semana" />

            <View style={styles.weekWrap}>
              {weekDates.map((dIso) => {
                const sunday = isSundayIso(dIso);
                const done = completedDays.includes(dIso);

                const state: "SUNDAY" | "DONE" | "MISS" = sunday ? "SUNDAY" : done ? "DONE" : "MISS";

                return <WeekChip key={dIso} label={formatDdMm(dIso)} state={state} />;
              })}
            </View>

            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "rgba(4,206,146,0.35)" }]} />
                <Text style={styles.legendText}>Lido</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "rgba(0,0,0,0.16)" }]} />
                <Text style={styles.legendText}>Domingo</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: "rgba(211,47,47,0.28)" }]} />
                <Text style={styles.legendText}>Pendente</Text>
              </View>
            </View>
          </Card>

          {/* NOTAS / ENCORAJAMENTO */}
          <Card>
            <SectionTitle icon="🧭" title="Constância" subtitle="Pequenos passos, todos os dias úteis" />
            <Text style={styles.paragraph}>
              Continue firme: uma leitura por vez. Se cair um dia, retome no próximo — a jornada é constância,
              não perfeição.
            </Text>
          </Card>

          <View style={{ height: 26 }} />
        </View>
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
    backgroundColor: colors.background, // usa o tema
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  contentWrap: {
    width: "100%",
    gap: 12,
  },

  hero: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    ...shadowCard(),
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 19,
  },
  heroHint: {
    marginTop: 10,
    fontSize: 12,
    color: colors.muted,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statTile: {
    flexGrow: 1,
    flexBasis: "31%",
    minWidth: 120,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  statIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },
  statValue: {
    marginTop: 6,
    fontSize: 22,
    fontWeight: "900",
  },
  statHelper: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  sectionIcon: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: colors.muted,
    lineHeight: 16,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 6,
    marginBottom: 10,
  },
  progressPercent: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
  },
  progressMeta: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  mutedCenter: {
    marginTop: 10,
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 16,
  },

  weekWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 6,
  },
  weekChip: {
    minWidth: 72,
    flexGrow: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weekChipLabel: {
    fontSize: 12,
    fontWeight: "800",
  },
  weekChipDot: {
    fontSize: 14,
    fontWeight: "900",
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexGrow: 1,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  legendText: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },

  paragraph: {
    marginTop: 4,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});
