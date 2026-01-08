import {
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../theme/colors";
import { phases, Phase } from "../data/phases";
import { readingPlan } from "../data/readingPlan";

// --- HELPERS (Lógica preservada) ---

function uniqueSortedIsoDates(list: any): string[] {
  const set = new Set<string>();
  if (Array.isArray(list)) {
    for (const item of list) {
      if (typeof item === "string" && /^\d{4}-\d{2}-\d{2}$/.test(item)) {
        set.add(item);
      }
    }
  }
  return Array.from(set).sort();
}

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

    // mantém curto e seguro
    out[k] = text.length > 200 ? text.slice(0, 200) : text;
  }

  return out;
}

export default function PlanScreen() {
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [selectedPhase, setSelectedPhase] = useState<Phase | null>(null);

  // ✅ Experiência Espiritual: gratidão por data
  const [gratitudeByDate, setGratitudeByDate] = useState<Record<string, string>>(
    {}
  );

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

  // ✅ Atualiza sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadCompletedDays();
      loadGratitude();
    }, [loadCompletedDays, loadGratitude])
  );

  function calculatePhaseProgress(phase: Phase) {
    const phaseReadings = readingPlan.filter(
      (day) =>
        day.date >= phase.startDate &&
        day.date <= phase.endDate &&
        !day.isSunday
    );

    if (phaseReadings.length === 0) return 0;

    const completedInPhase = phaseReadings.filter((day) =>
      completedDays.includes(day.date)
    ).length;

    return Math.round((completedInPhase / phaseReadings.length) * 100);
  }

  function countGratitudesInPhase(phase: Phase) {
    let count = 0;
    // conta gratidões cuja data esteja dentro do range da fase
    for (const dateIso of Object.keys(gratitudeByDate)) {
      if (dateIso >= phase.startDate && dateIso <= phase.endDate) count += 1;
    }
    return count;
  }

  const totalGratitudes = useMemo(
    () => Object.keys(gratitudeByDate).length,
    [gratitudeByDate]
  );

  // --- RENDER ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />
      
      {/* Scrollable Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* HEADER */}
        <View style={{ marginBottom: 20 }}>
            <Text style={styles.screenTitle}>Plano Anual</Text>
            <Text style={styles.screenSubtitle}>
                Acompanhe sua evolução em cada etapa da jornada.
            </Text>
        </View>

        {/* STATS CARD */}
        <View style={styles.statsCard}>
            <Text style={styles.statsEmoji}>🙏</Text>
            <View>
                <Text style={styles.statsLabel}>Diário de Gratidão</Text>
                <Text style={styles.statsValue}>{totalGratitudes} registros no ano</Text>
            </View>
        </View>

        {/* LISTA DE FASES */}
        {phases.map((phase) => {
          const progress = calculatePhaseProgress(phase);
          const gCount = countGratitudesInPhase(phase);
          const isComplete = progress === 100;
          const isStarted = progress > 0;

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
              
              <Text style={styles.phaseDates}>
                 📅 {phase.startDate.split("-").reverse().slice(0, 2).join("/")} até {phase.endDate.split("-").reverse().slice(0, 2).join("/")}
              </Text>

              {/* Barra de progresso */}
              <View style={styles.progressContainer}>
                 <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${progress}%` },
                            isComplete && { backgroundColor: "green" }
                        ]}
                    />
                 </View>
                 <Text style={styles.progressText}>{progress}%</Text>
              </View>

              <View style={styles.cardFooter}>
                 <Text style={styles.gratitudeTag}>
                    🙏 {gCount} gratidões
                 </Text>
                 <Text style={styles.detailsLink}>
                    Ver detalhes ➝
                 </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        
        {/* Espaço final */}
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
              {selectedPhase && (
                <View style={styles.modalStatsRow}>
                    <Text style={styles.modalStatsText}>
                        ✨ Você registrou {countGratitudesInPhase(selectedPhase)} motivos de gratidão nesta fase.
                    </Text>
                </View>
              )}

              <Text style={styles.modalDescription}>
                {selectedPhase?.description}
              </Text>

              {selectedPhase?.messianicConnection && (
                <View style={styles.messianicBox}>
                  <Text style={styles.messianicTitle}>
                    ✝️ Conexão com Cristo
                  </Text>
                  <Text style={styles.messianicText}>
                    {selectedPhase.messianicConnection}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                onPress={() => setSelectedPhase(null)}
                style={styles.closeButton}
              >
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
    // Typography
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
    // Stats Card
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
    // Phase Card
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
    // Progress Bar
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
    // Card Footer
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
    // Modal
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
        backgroundColor: "#F0F4FF", // Azul bem claro
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