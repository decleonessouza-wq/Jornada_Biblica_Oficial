import {
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  ImageBackground,
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

function Pill({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "info" | "warn";
}) {
  const bg =
    tone === "info"
      ? "rgba(255,255,255,0.78)"
      : tone === "warn"
      ? "rgba(255,249,235,0.74)"
      : "rgba(255,255,255,0.72)";
  const fg =
    tone === "info"
      ? colors.primary
      : tone === "warn"
      ? colors.warning
      : colors.textStrong;

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
      return `Plano Anual de Leitura - Início em ${formatDdMm(planStartDate)}`;
    }
    return "Plano Anual de Leitura";
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
          <ImageBackground
            testID="plan-hero"
            source={require("../../assets/module-heroes/plan-hero.png")}
            style={styles.hero}
            imageStyle={styles.heroImage}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>Plano</Text>
              <Text style={styles.heroSubtitle}>{heroSubtitle}</Text>

              <View style={styles.heroPillsRow}>
                {planStartDate ? (
                  <Pill label={`📈 ${totalProgressPercent}% concluído`} tone="info" />
                ) : (
                  <Pill label="✨ Pronto para começar" tone="neutral" />
                )}
                <Pill
                  label={`🙏 ${totalGratitudes} ${totalGratitudes === 1 ? "gratidão" : "gratidões"}`}
                  tone="warn"
                />
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
                  {planStartDate ? "Continuar Jornada" : "Iniciar Jornada"}
                </Text>
              </Pressable>
            </View>
          </ImageBackground>

          {/* LISTA DE FASES */}
          <Card>
            <SectionTitle icon="🧩" title="Fases do plano" subtitle="Toque em uma fase para ver resumo e conexão com Cristo" />

            <View style={{ gap: 12 }}>
              {phaseOffsetMap.map(({ phase, startOffset, endOffset }, phaseIndex) => {
                const progress = planStartDate ? calculatePhaseProgressAtemporal(planStartDate, startOffset, endOffset) : 0;

                const gCount = planStartDate
                  ? countGratitudesInPhaseAtemporal(planStartDate, startOffset, endOffset)
                  : 0;

                const isComplete = progress === 100;
                const isSecondaryTone = phaseIndex % 2 === 1;
                const phaseToneStyle = isSecondaryTone
                  ? styles.phaseCardSecondary
                  : styles.phaseCardPrimary;

                return (
                  <Pressable
                    key={phase.id}
                    onPress={() => setSelectedPhase(phase)}
                    style={({ pressed }) => [
                      styles.phaseCard,
                      phaseToneStyle,
                      pressed && { opacity: 0.94, transform: [{ scale: 0.995 }] },
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
                          isSecondaryTone && styles.progressBarFillSecondary,
                          { width: `${progress}%` },
                          isComplete && { backgroundColor: colors.success },
                        ]}
                      />
                    </View>

                    <View style={styles.phaseFooterRow}>
                      <Text style={styles.phaseMetaLeft}>🙏 {gCount} gratidões</Text>
                      <Text style={[styles.phaseMetaRight, isSecondaryTone && styles.phaseMetaRightSecondary]}>Ver detalhes →</Text>
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
    borderRadius: 24,
    minHeight: 260,
    overflow: "hidden",
    ...shadowCard(),
  },
  heroImage: {
    borderRadius: 24,
  },
  heroOverlay: {
    flex: 1,
    minHeight: 260,
    justifyContent: "flex-start",
    backgroundColor: "rgba(13, 43, 69, 0.18)",
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 22,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.textInverse,
    marginBottom: 6,
    textShadowColor: "rgba(0,0,0,0.62)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textInverse,
    lineHeight: 20,
    textShadowColor: "rgba(0,0,0,0.62)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  heroPillsRow: {
    marginTop: "auto",
    width: "84%",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  journeyCta: {
    marginTop: 14,
    minHeight: 48,
    borderRadius: 16,
    alignSelf: "center",
    width: "84%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.36)",
    backgroundColor: "rgba(255,255,255,0.74)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  journeyCtaPressed: {
    opacity: 0.78,
  },
  journeyCtaText: {
    color: colors.primary,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
    textAlign: "center",
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
    backgroundColor: colors.surfaceAlt,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
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
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    ...shadowCard(),
  },
  phaseCardPrimary: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  phaseCardSecondary: {
    backgroundColor: "#FFF9EC",
    borderColor: colors.secondary,
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
    height: 8,
    backgroundColor: "rgba(255,255,255,0.72)",
    borderRadius: 999,
    overflow: "hidden",
    marginTop: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  progressBarFillSecondary: {
    backgroundColor: colors.secondaryPressed,
  },

  phaseFooterRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(13,43,69,0.10)",
  },
  phaseMetaLeft: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.warning,
  },
  phaseMetaRight: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.primary,
  },
  phaseMetaRightSecondary: {
    color: colors.warning,
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
