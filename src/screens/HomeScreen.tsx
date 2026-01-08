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
} from "react-native";
import { useState, useEffect, useMemo } from "react";
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

type ReadingItem = {
  date: string;
  reference: string;
  isSunday?: boolean;
};

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

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [mockDate, setMockDate] = useState<string | null>(null);
  const [devMode, setDevMode] = useState(false);

  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastRead, setLastRead] = useState<string | null>(null);

  // ✅ Experiência Espiritual: gratidão
  const [gratitudeByDate, setGratitudeByDate] = useState<Record<string, string>>({});

  // ✅ base de "hoje" consistente (real ou mock)
  const today = useMemo(() => {
    if (mockDate && isIsoDateString(mockDate)) return mockDate;
    return new Date().toISOString().split("T")[0];
  }, [mockDate]);

  // ✅ limites do plano
  const planRange = useMemo(() => {
    if (!readingPlan || readingPlan.length === 0) {
      return { start: null as string | null, end: null as string | null };
    }
    const dates = readingPlan
      .map((d: ReadingItem) => d.date)
      .filter(Boolean)
      .sort();
    return { start: dates[0] ?? null, end: dates[dates.length - 1] ?? null };
  }, []);

  const isBeforePlan = planRange.start ? today < planRange.start : false;
  const isAfterPlan = planRange.end ? today > planRange.end : false;

  const todayReading = useMemo(
    () => readingPlan.find((item: ReadingItem) => item.date === today),
    [today]
  );

  const currentPhase = useMemo(
    () => phases.find((phase) => today >= phase.startDate && today <= phase.endDate),
    [today]
  );

  const isCompletedToday = completedDays.includes(today);

  // ✅ NOVO: camada de gamificação (derivada)
  const level = useMemo(() => getLevelForStreak(streak), [streak]);
  const nextMilestone = useMemo(() => getNextMilestone(streak), [streak]);

  const dailyMessage = useMemo(() => {
    return getDailyMessage({ streak, isBeforePlan, isAfterPlan });
  }, [streak, isBeforePlan, isAfterPlan]);

  // ✅ gratidão do dia (badge simples)
  const todayGratitude = useMemo(() => {
    return typeof gratitudeByDate[today] === "string" ? gratitudeByDate[today] : null;
  }, [gratitudeByDate, today]);

  const canRegisterGratitudeToday = useMemo(() => {
    if (!todayReading) return false;
    if (isBeforePlan || isAfterPlan) return false;
    return true;
  }, [todayReading, isBeforePlan, isAfterPlan]);

  useEffect(() => {
    (async () => {
      // 1) auto-restore 1x
      const res = await ensureAutoRestoreOnceIfNeeded();
      if (res.restored) {
        Alert.alert("Progresso restaurado", `Backup automático aplicado: ${res.count} dias.`);
      }
      // 2) carrega progresso
      await loadProgress();
      // 3) carrega gratidão
      await loadGratitude();
      // 4) roda auto-backup
      await runAutoBackup();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await loadProgress();
      await loadGratitude();
    })();
  }, [today]);

  async function loadProgress() {
    try {
      const days = await getCompletedDays();
      setCompletedDays(days);
      setLastRead(getLastRead(days));
      const base = new Date(`${today}T12:00:00.000Z`);
      setStreak(calculateStreak(days, base));
    } catch (err) {
      console.log("Erro ao carregar progresso", err);
      setCompletedDays([]);
      setLastRead(null);
      setStreak(0);
    }
  }

  async function loadGratitude() {
    try {
      const raw = await AsyncStorage.getItem("gratitudeByDate");
      const parsed = raw ? JSON.parse(raw) : {};
      setGratitudeByDate(sanitizeGratitudeMap(parsed));
    } catch (err) {
      console.log("Erro ao carregar gratitudeByDate", err);
      setGratitudeByDate({});
    }
  }

  async function markAsCompleted() {
    if (!todayReading || todayReading.isSunday) return;
    if (isBeforePlan || isAfterPlan) return;
    if (isCompletedToday) return;

    try {
      const result = await addCompletedDay(today);
      if (!result.added) return;

      const days = result.days;
      setCompletedDays(days);
      setLastRead(getLastRead(days));

      const base = new Date(`${today}T12:00:00.000Z`);
      const newStreak = calculateStreak(days, base);
      setStreak(newStreak);

      if (isMilestone(newStreak)) {
        Alert.alert("Marco alcançado ✅", getMilestoneMessage(newStreak));
      }
    } catch (err) {
      console.log("Erro ao salvar leitura concluída", err);
      Alert.alert("Erro", "Não foi possível salvar sua leitura concluída.");
    }
  }

  function openReading() {
    if (isBeforePlan) {
      Alert.alert("Aguarde", planRange.start ? `Início em ${planRange.start}.` : "Em breve.");
      return;
    }
    if (isAfterPlan) {
      Alert.alert("Concluído", "O plano já encerrou. Acesse o Histórico ou Plano Anual.");
      return;
    }
    if (!todayReading) {
      Alert.alert("Ops", "Não há leitura para hoje.");
      return;
    }
    navigation.navigate("Reading", {
      date: today,
      reference: todayReading.reference,
      isSunday: !!todayReading.isSunday,
    });
  }

  function toggleDevMode() {
    if (!__DEV__) return;
    setDevMode((prev) => !prev);
  }

  // --- RENDER ---
  return (
    <View style={styles.container}>
      
      {/* 1. HEADER SUPERIOR */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/icon.png")}
            style={styles.logo}
          />
          <View>
            <Pressable onLongPress={toggleDevMode} delayLongPress={2000}>
                <Text style={styles.appTitle}>Jornada Bíblica</Text>
            </Pressable>
            <Text style={styles.appSubtitle}>
              {mockDate ? `Simulando: ${today}` : "Sua caminhada diária"}
            </Text>
          </View>
        </View>
        {/* Streak Badge no Topo */}
        <View style={styles.streakBadge}>
            <Text style={styles.streakFire}>🔥</Text>
            <Text style={styles.streakCount}>{streak}</Text>
        </View>
      </View>

      {/* CONTEÚDO SCROLLÁVEL */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {devMode && (
          <Text style={styles.devModeText}>🔧 Modo Dev Ativo</Text>
        )}

        {/* 2. CARD DE STATUS (Gamificação) */}
        <View style={styles.statusCard}>
          <View style={styles.levelRow}>
            <View>
                <Text style={styles.levelLabel}>Nível Atual</Text>
                <Text style={styles.levelTitle}>{level.title}</Text>
            </View>
            <Text style={styles.levelIcon}>{level.icon || "🌱"}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.milestoneText}>
            {nextMilestone.next 
              ? `Faltam ${nextMilestone.remaining} dias para o próximo marco!` 
              : "Você é incrível! Todos os marcos atingidos."}
          </Text>
          <Text style={styles.dailyMessage}>"{dailyMessage}"</Text>
        </View>

        {/* 3. CARD PRINCIPAL (Leitura de Hoje) */}
        <View style={styles.readingCard}>
            <View style={styles.readingHeader}>
                <Text style={styles.readingDateLabel}>
                    {todayReading?.isSunday ? "DOMINGO" : "LEITURA DE HOJE"}
                </Text>
                {isCompletedToday && <Text style={styles.checkIcon}>✅ Lido</Text>}
            </View>
            
            <Text style={styles.readingReference}>
                {todayReading
                  ? todayReading.reference
                  : isBeforePlan
                  ? "Em breve"
                  : isAfterPlan
                  ? "Finalizado"
                  : "--"}
            </Text>

            {/* Fase */}
            {currentPhase && (
                <Text style={styles.phaseLabel}>
                     Fase: {currentPhase.title}
                </Text>
            )}

            {/* Botão de Ação Principal */}
            <TouchableOpacity 
                activeOpacity={0.8}
                onPress={openReading}
                style={[
                    styles.primaryButton, 
                    todayReading?.isSunday && styles.sundayButton
                ]}
            >
                <Text style={styles.primaryButtonText}>
                    {todayReading?.isSunday ? "🙏 Meditação Semanal" : "📖 Ler Agora"}
                </Text>
            </TouchableOpacity>

            {/* Botão Secundário (Marcar como lido) */}
            {!todayReading?.isSunday && !isCompletedToday && todayReading && (
                <TouchableOpacity 
                    onPress={markAsCompleted}
                    style={styles.secondaryButton}
                    disabled={isBeforePlan || isAfterPlan}
                >
                    <Text style={styles.secondaryButtonText}>
                       ✔️ Marcar como concluído
                    </Text>
                </TouchableOpacity>
            )}

             {/* Indicador de Gratidão */}
             {canRegisterGratitudeToday && (
                <View style={styles.gratitudeContainer}>
                    <Text style={{ fontSize: 12, color: colors.muted }}>
                        {todayGratitude ? "✨ Gratidão registrada" : "✍️ Não esqueça sua gratidão hoje"}
                    </Text>
                </View>
            )}
        </View>
        
        {/* Espaço extra no final para não esconder atrás do menu */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 4. MENU INFERIOR (TAB BAR CUSTOMIZADA) */}
      <View style={styles.bottomBar}>
        <TabItem 
            icon="🏠" 
            label="Início" 
            isActive={true} 
            onPress={() => {}} 
        />
        <TabItem 
            icon="📅" 
            label="Plano" 
            isActive={false} 
            onPress={() => navigation.navigate("Plan")} 
        />
        <TabItem 
            icon="📊" 
            label="Progresso" 
            isActive={false} 
            onPress={() => navigation.navigate("Progress")} 
        />
        <TabItem 
            icon="📜" 
            label="Histórico" 
            isActive={false} 
            onPress={() => navigation.navigate("History")} 
        />
        <TabItem 
            icon="⚙️" 
            label="Config" 
            isActive={false} 
            onPress={() => navigation.navigate("Settings")} 
        />
      </View>
    </View>
  );
}

// Componente auxiliar para os botões do menu inferior
function TabItem({ icon, label, onPress, isActive }: { icon: string, label: string, onPress: () => void, isActive: boolean }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.tabItem}>
            <Text style={[styles.tabIcon, isActive && { opacity: 1 }]}>{icon}</Text>
            <Text style={[styles.tabLabel, isActive && { color: colors.primary, fontWeight: 'bold' }]}>{label}</Text>
        </TouchableOpacity>
    );
}

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8", // Fundo levemente cinza para destacar os cards
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50, // Espaço para Status Bar
    paddingBottom: 15,
    backgroundColor: "#fff",
    elevation: 2, // Sombra Android
    shadowColor: "#000", // Sombra iOS
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    marginRight: 10,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },
  appSubtitle: {
    fontSize: 12,
    color: colors.muted,
  },
  streakBadge: {
    backgroundColor: "#FFF2EC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD8C2",
  },
  streakFire: {
    fontSize: 14,
    marginRight: 4,
  },
  streakCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.secondary, // Laranja ou cor de destaque
  },
  
  // Cards Gerais
  statusCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  devModeText: {
    textAlign: "center", 
    color: "red", 
    fontSize: 10, 
    marginBottom: 5
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    color: colors.muted,
    fontWeight: "600",
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  levelIcon: {
    fontSize: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
  },
  milestoneText: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 4,
  },
  dailyMessage: {
    fontSize: 13,
    fontStyle: "italic",
    color: colors.primary,
    fontWeight: "500",
  },

  // Card de Leitura
  readingCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 4, // Mais destaque
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  readingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  readingDateLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  checkIcon: {
    fontSize: 12,
    color: "green",
    fontWeight: "bold",
    backgroundColor: "#E6F7E9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
  readingReference: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 4,
  },
  phaseLabel: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 20,
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  sundayButton: {
    backgroundColor: colors.secondary, // Cor diferente para domingo
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  secondaryButtonText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "600",
  },
  gratitudeContainer: {
    marginTop: 14,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingTop: 10,
  },

  // Bottom Bar (Menu)
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingBottom: 20, // Seguro para iPhone X+
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  tabIcon: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.5,
  },
  tabLabel: {
    fontSize: 10,
    color: colors.muted,
  },
});