import {
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  StyleSheet,
  StatusBar,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import type { Phase } from "../data/phases";
import { readingPlan } from "../data/readingPlan";
import { buildPlanPhaseProjection } from "../domain/plan/planPhaseProjection";

// ✅ plano atemporal
import {
  ensurePlanStartDate,
  getEffectiveReferenceForDate,
  getPlanStartDate,
  getTodayIsoLocal,
} from "../services/progressStore";
import { useAppShellChrome } from "../navigation/AppShellChromeContext";
import type {
  AppDrawerParamList,
  MainTabParamList,
  RootStackParamList,
} from "../navigation/types";

/* ==========================
   HELPERS
========================== */

function isIsoDateString(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function uniqueSortedIsoDates(list: any): string[] {
  const set = new Set<string>();
  if (Array.isArray(list)) {
    for (const item of list) {
      if (isIsoDateString(item)) set.add(item);
    }
  }
  return Array.from(set).sort();
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

function addDaysIso(iso: string, days: number): string {
  const d = isoToLocalNoon(iso);
  d.setDate(d.getDate() + days);
  return dateToIsoLocal(d);
}

function formatDdMm(iso: string) {
  // YYYY-MM-DD -> DD/MM
  const parts = iso.split("-");
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}`;
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
   UI (LOCAL)
========================== */

function Card({ children }: { children: React.ReactNode }) {
  return <View style={[styles.card, shadowCard()]}>{children}</View>;
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

  const fg =
    tone === "primary"
      ? colors.primary
      : tone === "secondary"
      ? colors.secondary
      : colors.text;

  return (
    <View style={[styles.statTile, { backgroundColor: bg }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color: fg }]}>{value}</Text>
      {!!helper && <Text style={styles.statHelper}>{helper}</Text>}
    </View>
  );
}

function Pill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "info" | "warn";
}) {
  const bg =
    tone === "info"
      ? "rgba(4,206,146,0.12)"
      : tone === "warn"
      ? "rgba(218,165,32,0.18)"
      : "rgba(0,0,0,0.06)";
  const fg =
    tone === "info"
      ? colors.primary
      : tone === "warn"
      ? colors.secondary
      : colors.muted;

  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.pillText, { color: fg }]}>{label}</Text>
    </View>
  );
}

/* ==========================
   SCREEN
========================== */

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, "PlanTab">,
  CompositeNavigationProp<
    DrawerNavigationProp<AppDrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

export default function PlanScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();
  const maxWidth = clamp(width, 360, 820);
  const { handleScroll, resetChrome } = useAppShellChrome();

  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  // ✅ plano atemporal
  const [planStartDate, setPlanStartDateState] = useState<string | null>(null);

  // ✅ gratidão por data
  const [gratitudeByDate, setGratitudeByDate] = useState<Record<string, string>>({});

  const loadCompletedDays = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem("completedDays");
      const parsed = stored ? JSON.parse(stored) : [];
      setCompletedDays(uniqueSortedIsoDates(parsed));
    } catch (err) {
      console.log("Erro ao carregar completedDays", err);
      setCompletedDays([]);
    }
  }, []);

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

  const loadPlanStartDate = useCallback(async () => {
    try {
      const start = await getPlanStartDate();
      setPlanStartDateState(start);
    } catch (err) {
      console.log("Erro ao carregar planStartDate", err);
      setPlanStartDateState(null);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCompletedDays();
      loadGratitude();
      loadPlanStartDate();
    }, [loadCompletedDays, loadGratitude, loadPlanStartDate])
  );

  useFocusEffect(
    useCallback(() => {
      resetChrome();
    }, [resetChrome])
  );

  const totalGratitudes = useMemo(() => Object.keys(gratitudeByDate).length, [gratitudeByDate]);

  const phaseOffsetMap = useMemo(() => buildPlanPhaseProjection(), []);

  const totalUsefulDays = useMemo(() => readingPlan.filter((d) => !d.isSunday).length, []);
  const completedUsefulDays = useMemo(() => completedDays.length, [completedDays]);
  const totalProgressPercent = useMemo(() => {
    if (!planStartDate || totalUsefulDays === 0) return 0;
    return Math.round((completedUsefulDays / totalUsefulDays) * 100);
  }, [completedUsefulDays, planStartDate, totalUsefulDays]);

  /**
   * Progresso por fase (ATEMPORAL):
   * - fase = intervalo fixo de offsets do plano
   * - concluiu = completedDays contém a data REAL correspondente ao offset (start + offset)
   * - domingos do plano (readingPlan[offset].isSunday) não contam
   */
  function calculatePhaseProgressAtemporal(startIso: string, startOffset: number, endOffset: number) {
    let total = 0;
    let done = 0;

    for (let off = startOffset; off <= endOffset; off++) {
      const item = readingPlan[off];
      if (!item) continue;
      if (item.isSunday) continue;

      total += 1;
      const dateIso = addDaysIso(startIso, off);
      if (completedDays.includes(dateIso)) done += 1;
    }

    if (total === 0) return 0;
    return Math.round((done / total) * 100);
  }

  function countGratitudesInPhaseAtemporal(startIso: string, startOffset: number, endOffset: number) {
    const startDate = addDaysIso(startIso, startOffset);
    const endDate = addDaysIso(startIso, endOffset);

    let count = 0;
    for (const dateIso of Object.keys(gratitudeByDate)) {
      if (dateIso < startDate || dateIso > endDate) continue;
      count += 1;
    }
    return count;
  }

  function getPhasePeriodLabel(phase: Phase, startOffset: number, endOffset: number) {
    const dayStart = startOffset + 1;
    const dayEnd = endOffset + 1;

    if (!planStartDate) return `📌 Dia ${dayStart} ao Dia ${dayEnd}`;

    const realStart = addDaysIso(planStartDate, startOffset);
    const realEnd = addDaysIso(planStartDate, endOffset);

    return `📌 Dia ${dayStart} ao Dia ${dayEnd} • 📅 ${formatDdMm(realStart)} até ${formatDdMm(realEnd)}`;
  }

  const heroSubtitle = useMemo(() => {
    if (planStartDate) {
      return `Plano anual • início: ${formatDdMm(planStartDate)} (atemp.)`;
    }
    return "Plano atemporal • inicia quando você marcar a primeira leitura";
  }, [planStartDate]);

  async function openCurrentJourney() {
    const today = getTodayIsoLocal();

    try {
      if (!planStartDate) {
        const start = await ensurePlanStartDate(today);
        setPlanStartDateState(start);
      }

      const effective = await getEffectiveReferenceForDate(today);

      navigation.navigate("Reading", {
        date: today,
        reference: effective.reference,
        isSunday: effective.isSunday,
      });
    } catch (error) {
      console.warn("PLAN_CURRENT_JOURNEY_OPEN_FAILED", error);
    }
  }

  // ===== RENDER =====
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: width >= 700 ? 24 : 16 }]}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={[styles.contentWrap, { maxWidth, alignSelf: "center" }]}>
          {/* HERO */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Plano</Text>
            <Text style={styles.heroSubtitle}>{heroSubtitle}</Text>

            <View style={styles.heroPillsRow}>
              {planStartDate ? (
                <Pill label={`📈 ${totalProgressPercent}% do plano`} tone="info" />
              ) : (
                <Pill label="ℹ️ ainda não iniciado" tone="neutral" />
              )}
              <Pill label={`📖 ${totalUsefulDays} dias úteis`} tone="neutral" />
              <Pill label={`🙏 ${totalGratitudes} gratidões`} tone="warn" />
            </View>

            <Pressable
              testID="plan-current-journey-cta"
              accessibilityRole="button"
              accessibilityLabel={planStartDate ? "Continuar Jornada" : "Iniciar Jornada"}
              onPress={openCurrentJourney}
              style={({ pressed }) => [
                styles.journeyCta,
                pressed && styles.journeyCtaPressed,
              ]}
            >
              <Text style={styles.journeyCtaText}>
                {planStartDate ? "📖 Continuar Jornada" : "📖 Iniciar Jornada"}
              </Text>
            </Pressable>
          </View>

          {/* STATS GRID */}
          <View style={styles.statsGrid}>
            <StatTile
              icon="📈"
              label="Progresso geral"
              value={`${totalProgressPercent}%`}
              helper={planStartDate ? `${completedUsefulDays} de ${totalUsefulDays}` : "inicie para contar"}
              tone="primary"
            />
            <StatTile icon="🙏" label="Gratidão" value={`${totalGratitudes}`} helper="registros" tone="secondary" />
            <StatTile
              icon="🗂️"
              label="Fases"
              value={`${phaseOffsetMap.length}`}
              helper="no plano"
              tone="neutral"
            />
          </View>

          {/* LISTA DE FASES */}
          <Card>
            <SectionTitle icon="🧩" title="Fases do plano" subtitle="Toque em uma fase para ver resumo e conexão com Cristo" />

            <View style={{ gap: 12 }}>
              {phaseOffsetMap.map(({ phase, startOffset, endOffset }) => {
                const progress = planStartDate ? calculatePhaseProgressAtemporal(planStartDate, startOffset, endOffset) : 0;

                const gCount = planStartDate
                  ? countGratitudesInPhaseAtemporal(planStartDate, startOffset, endOffset)
                  : 0;

                const isComplete = progress === 100;

                return (
                  <Pressable
                    key={phase.id}
                    onPress={() => setSelectedPhase(phase)}
                    style={({ pressed }) => [
                      styles.phaseCard,
                      pressed && { opacity: 0.96, transform: [{ scale: 0.995 }] },
                    ]}
                  >
                    <View style={styles.phaseHeaderRow}>
                      <Text style={styles.phaseTitle} numberOfLines={2}>
                        {phase.title}
                      </Text>

                      {isComplete ? (
                        <View style={styles.completePill}>
                          <Text style={styles.completePillText}>✅ Concluído</Text>
                        </View>
                      ) : (
                        <Text style={styles.phaseProgressMini}>{progress}%</Text>
                      )}
                    </View>

                    <Text style={styles.phaseDates}>{getPhasePeriodLabel(phase, startOffset, endOffset)}</Text>

                    {/* Progress bar */}
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${progress}%` },
                          isComplete && { backgroundColor: "green" },
                        ]}
                      />
                    </View>

                    <View style={styles.phaseFooterRow}>
                      <Text style={styles.phaseMetaLeft}>🙏 {gCount} gratidões</Text>
                      <Text style={styles.phaseMetaRight}>Ver detalhes ➝</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </Card>

          <View style={{ height: 26 }} />
        </View>
      </ScrollView>

      {/* MODAL DE DETALHES */}
      <Modal visible={!!selectedPhase} animationType="fade" transparent onRequestClose={() => setSelectedPhase(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedPhase?.title}</Text>

                <Pressable
                  onPress={() => setSelectedPhase(null)}
                  style={({ pressed }) => [styles.modalCloseBtn, pressed && { opacity: 0.9 }]}
                >
                  <Text style={styles.modalCloseText}>✕</Text>
                </Pressable>
              </View>

              {/* Info de gratidão por fase */}
              {!!selectedPhase && planStartDate && (
                <View style={styles.modalInfoBox}>
                  <Text style={styles.modalInfoText}>
                    ✨ Você registrou{" "}
                    {countGratitudesInPhaseAtemporal(
                      planStartDate,
                      phaseOffsetMap.find((x) => x.phase.id === selectedPhase.id)?.startOffset ?? 0,
                      phaseOffsetMap.find((x) => x.phase.id === selectedPhase.id)?.endOffset ?? readingPlan.length - 1
                    )}{" "}
                    motivos de gratidão nesta fase.
                  </Text>
                </View>
              )}

              {!planStartDate && (
                <View style={styles.modalInfoBox}>
                  <Text style={styles.modalInfoText}>
                    ℹ️ Inicie o plano (marque a primeira leitura) para ver progresso e contagem por fase.
                  </Text>
                </View>
              )}

              {!!selectedPhase && (
                <Text style={styles.modalDescription}>{selectedPhase.description}</Text>
              )}

              {!!selectedPhase?.messianicConnection && (
                <View style={styles.messianicBox}>
                  <Text style={styles.messianicTitle}>✝️ Conexão com Cristo</Text>
                  <Text style={styles.messianicText}>{selectedPhase.messianicConnection}</Text>
                </View>
              )}

              <Pressable
                onPress={() => setSelectedPhase(null)}
                style={({ pressed }) => [styles.modalPrimaryBtn, pressed && { opacity: 0.95 }]}
              >
                <Text style={styles.modalPrimaryText}>Fechar</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ==========================
   STYLES
========================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  heroPillsRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  journeyCta: {
    marginTop: 16,
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  journeyCtaPressed: {
    opacity: 0.9,
  },
  journeyCtaText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
    textAlign: "center",
  },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "800",
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
    fontWeight: "800",
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

  phaseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  phaseHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    flex: 1,
  },
  phaseProgressMini: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.muted,
    paddingTop: 2,
  },
  completePill: {
    backgroundColor: "rgba(4,206,146,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  completePillText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.primary,
  },

  phaseDates: {
    marginTop: 6,
    fontSize: 12,
    color: colors.muted,
  },

  progressBarBackground: {
    height: 10,
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 12,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },

  phaseFooterRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.06)",
  },
  phaseMetaLeft: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.secondary,
  },
  phaseMetaRight: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.primary,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    maxHeight: "86%",
    ...shadowCard(),
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.primary,
    flex: 1,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },

  modalInfoBox: {
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(218,165,32,0.12)",
    marginBottom: 12,
  },
  modalInfoText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 16,
  },

  modalDescription: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 14,
  },

  messianicBox: {
    backgroundColor: "rgba(4,206,146,0.10)",
    padding: 14,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: 14,
  },
  messianicTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  messianicText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },

  modalPrimaryBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPrimaryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
});
