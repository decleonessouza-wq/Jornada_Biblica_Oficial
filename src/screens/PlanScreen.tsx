import {
  View,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../theme/colors";
import { phases, Phase } from "../data/phases";
import { readingPlan } from "../data/readingPlan";

// ✅ plano atemporal
import { getPlanStartDate } from "../services/progressStore";

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

/**
 * Mapeia as fases "legadas" (por datas 2026) para offsets do readingPlan atual.
 * Assim, cada fase vira um intervalo fixo do PLANO (offsets), e a data real depende do planStartDate.
 */
function buildPhaseOffsetMap() {
  // cache simples por execução
  const dateToOffset = new Map<string, number>();
  for (let i = 0; i < readingPlan.length; i++) {
    const d = readingPlan[i]?.date;
    if (isIsoDateString(d) && !dateToOffset.has(d)) dateToOffset.set(d, i);
  }

  function getOffsetOrFallback(iso: string, fallback: number) {
    const hit = dateToOffset.get(iso);
    return typeof hit === "number" ? hit : fallback;
  }

  return phases.map((p) => {
    const startOffset = getOffsetOrFallback(p.startDate, 0);
    const endOffset = getOffsetOrFallback(p.endDate, readingPlan.length - 1);

    const safeStart = Math.max(0, Math.min(startOffset, readingPlan.length - 1));
    const safeEnd = Math.max(0, Math.min(endOffset, readingPlan.length - 1));

    return {
      phase: p,
      startOffset: Math.min(safeStart, safeEnd),
      endOffset: Math.max(safeStart, safeEnd),
    };
  });
}

export default function PlanScreen() {
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  // ✅ plano atemporal
  const [planStartDate, setPlanStartDateState] = useState<string | null>(null);

  // ✅ Experiência Espiritual: gratidão por data
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

  // ✅ Atualiza sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadCompletedDays();
      loadGratitude();
      loadPlanStartDate();
    }, [loadCompletedDays, loadGratitude, loadPlanStartDate])
  );

  const totalGratitudes = useMemo(() => Object.keys(gratitudeByDate).length, [gratitudeByDate]);

  const phaseOffsetMap = useMemo(() => buildPhaseOffsetMap(), []);

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
      if (item.isSunday) continue; // domingo do plano é livre

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
      // opcional:
      // if (isSundayIso(dateIso)) continue;
      count += 1;
    }
    return count;
  }


  function getPhasePeriodLabel(phase: Phase, startOffset: number, endOffset: number) {
    // sempre mostra "Dia X ao Dia Y"
    const dayStart = startOffset + 1;
    const dayEnd = endOffset + 1;

    if (!planStartDate) {
      return `📌 Dia ${dayStart} ao Dia ${dayEnd}`;
    }

    const realStart = addDaysIso(planStartDate, startOffset);
    const realEnd = addDaysIso(planStartDate, endOffset);

    return `📌 Dia ${dayStart} ao Dia ${dayEnd} • 📅 ${formatDdMm(realStart)} até ${formatDdMm(realEnd)}`;
  }

  // --- RENDER ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.screenTitle}>Plano</Text>

          {planStartDate ? (
            <Text style={styles.screenSubtitle}>
              Plano Anual de Leitura • início: {formatDdMm(planStartDate)}
            </Text>
          ) : (
            <Text style={styles.screenSubtitle}>
              Plano atemporal • ainda não iniciado (começa quando você marcar a primeira leitura)
            </Text>
          )}
        </View>

        {/* STATS CARD */}
        <View style={styles.statsCard}>
          <Text style={styles.statsEmoji}>🙏</Text>
          <View>
            <Text style={styles.statsLabel}>Diário de Gratidão</Text>
            <Text style={styles.statsValue}>{totalGratitudes} registros</Text>
          </View>
        </View>

        {/* LISTA DE FASES */}
        {phaseOffsetMap.map(({ phase, startOffset, endOffset }) => {
          const progress = planStartDate
            ? calculatePhaseProgressAtemporal(planStartDate, startOffset, endOffset)
            : 0;

          const gCount = planStartDate
            ? countGratitudesInPhaseAtemporal(planStartDate, startOffset, endOffset)
            : 0;

          const isComplete = progress === 100;

          return (
            <TouchableOpacity
              key={phase.id}
              activeOpacity={0.9}
              onPress={() => setSelectedPhase(phase)}
              style={styles.phaseCard}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.phaseTitle}>{phase.title}</Text>
                {isComplete && <Text style={styles.checkIcon}>✅ Concluído</Text>}
              </View>

              <Text style={styles.phaseDates}>{getPhasePeriodLabel(phase, startOffset, endOffset)}</Text>

              {/* Barra de progresso */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progress}%` },
                      isComplete && { backgroundColor: "green" },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{progress}%</Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.gratitudeTag}>🙏 {gCount} gratidões</Text>
                <Text style={styles.detailsLink}>Ver detalhes ➝</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MODAL DE RESUMO / CONEXÃO */}
      <Modal
        visible={!!selectedPhase}
        animationType="fade"
        transparent
        onRequestClose={() => setSelectedPhase(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedPhase?.title}</Text>
                <TouchableOpacity onPress={() => setSelectedPhase(null)}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Indicador de Gratidão no Modal */}
              {!!selectedPhase && planStartDate && (
                <View style={styles.modalStatsRow}>
                  <Text style={styles.modalStatsText}>
                    ✨ Você registrou{" "}
                    {
                      countGratitudesInPhaseAtemporal(
                        planStartDate,
                        phaseOffsetMap.find((x) => x.phase.id === selectedPhase.id)?.startOffset ?? 0,
                        phaseOffsetMap.find((x) => x.phase.id === selectedPhase.id)?.endOffset ??
                          readingPlan.length - 1
                      )
                    }{" "}
                    motivos de gratidão nesta fase.
                  </Text>
                </View>
              )}

              {!planStartDate && (
                <View style={styles.modalStatsRow}>
                  <Text style={styles.modalStatsText}>
                    ℹ️ Inicie o plano (marque a primeira leitura) para ver progresso e contagem por fase.
                  </Text>
                </View>
              )}

              <Text style={styles.modalDescription}>{selectedPhase?.description}</Text>

              {selectedPhase?.messianicConnection && (
                <View style={styles.messianicBox}>
                  <Text style={styles.messianicTitle}>✝️ Conexão com Cristo</Text>
                  <Text style={styles.messianicText}>{selectedPhase.messianicConnection}</Text>
                </View>
              )}

              <TouchableOpacity onPress={() => setSelectedPhase(null)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar Resumo</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  statsEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  statsLabel: {
    fontSize: 12,
    color: colors.muted,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  statsValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
  },
  phaseCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    flex: 1,
  },
  checkIcon: {
    fontSize: 10,
    fontWeight: "bold",
    color: "green",
    backgroundColor: "#E6F7E9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
    overflow: "hidden",
  },
  phaseDates: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.muted,
    width: 35,
    textAlign: "right",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 12,
  },
  gratitudeTag: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: "500",
  },
  detailsLink: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    maxHeight: "85%",
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    flex: 1,
  },
  closeIcon: {
    fontSize: 20,
    color: colors.muted,
    padding: 4,
  },
  modalStatsRow: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#FFF9F0",
    borderRadius: 8,
  },
  modalStatsText: {
    fontSize: 12,
    color: colors.secondary,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 20,
  },
  messianicBox: {
    backgroundColor: "#F0F4FF",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: 20,
  },
  messianicTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  messianicText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
