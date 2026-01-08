import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../theme/colors";
import { readingPlan } from "../data/readingPlan";
import { restoreFromAutoBackup } from "../services/backupRestore";
import { APP_INFO } from "../constants/appInfo";

import {
  getCompletedDays,
  resetProgress,
  markAutoRestoreDone,
  setCompletedDays,
} from "../services/progressStore";

// ✅ gamificação centralizada (leve)
import { getLevelForStreak, getNextMilestone } from "../constants/gamification";
import { calculateStreak as calcStreakFromStore } from "../services/progressStore";

// --- TIPOS ---
type HistoryItem = {
  date: string;
  reference: string;
};

type ExportData = {
  app: string;
  version: string;
  exportedAt: string;
  completedDays: string[];
  gratitudeByDate?: Record<string, string>;
};

// --- CONSTANTES ---
const LAST_BACKUP_KEY = "lastAutoBackupDate";
const GRATITUDE_KEY = "gratitudeByDate";

// --- HELPERS (Lógica preservada) ---

function isIsoDateString(s: unknown): s is string {
  return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s);
}

function uniqueSortedIsoDates(list: unknown[]): string[] {
  const set = new Set<string>();
  for (const item of list) {
    if (isIsoDateString(item)) set.add(item);
  }
  return Array.from(set).sort();
}

function formatIsoDate(iso: string | null) {
  if (!iso) return null;
  if (iso.includes("T")) return iso.split("T")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return iso;
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

export default function HistoryScreen() {
  const [history, setHistory] = useState<Record<string, HistoryItem[]>>({});
  const [exportJson, setExportJson] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [lastBackupAt, setLastBackupAt] = useState<string | null>(null);

  // ✅ streak + level
  const [streak, setStreak] = useState(0);

  // ✅ gratidão
  const [gratitudeByDate, setGratitudeByDate] = useState<Record<string, string>>({});

  const months = useMemo(
    () => Object.keys(history).sort((a, b) => b.localeCompare(a)),
    [history]
  );

  const gratitudeCount = useMemo(
    () => Object.keys(gratitudeByDate).length,
    [gratitudeByDate]
  );

  const loadLastBackupInfo = useCallback(async () => {
    try {
      const last = await AsyncStorage.getItem(LAST_BACKUP_KEY);
      setLastBackupAt(last || null);
    } catch {
      setLastBackupAt(null);
    }
  }, []);

  const loadGratitude = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      setGratitudeByDate(sanitizeGratitudeMap(parsed));
    } catch {
      setGratitudeByDate({});
    }
  }, []);

  const buildHistory = useCallback((completed: string[]) => {
    const completedSet = new Set(completed);

    const completedReadings = readingPlan
      .filter((day) => completedSet.has(day.date))
      .sort((a, b) => b.date.localeCompare(a.date));

    const grouped: Record<string, HistoryItem[]> = {};

    for (const item of completedReadings) {
      const month = item.date.slice(0, 7);
      if (!grouped[month]) grouped[month] = [];
      grouped[month].push({
        date: item.date,
        reference: item.reference,
      });
    }
    setHistory(grouped);
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const completed = await getCompletedDays();
      buildHistory(completed);

      // streak (meio-dia local p/ evitar bug UTC)
      const base = new Date();
      base.setHours(12, 0, 0, 0);
      setStreak(calcStreakFromStore(completed, base));
    } catch (err) {
      console.log("Erro ao carregar histórico", err);
      buildHistory([]);
      setStreak(0);
    }
  }, [buildHistory]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
      loadLastBackupInfo();
      loadGratitude();
    }, [loadHistory, loadLastBackupInfo, loadGratitude])
  );

  // --- ACTIONS ---

  async function exportAsText() {
    try {
      const completed = await getCompletedDays();
      const rawG = await AsyncStorage.getItem(GRATITUDE_KEY);
      const parsedG = rawG ? JSON.parse(rawG) : {};
      const gratitudeClean = sanitizeGratitudeMap(parsedG);

      const data: ExportData = {
        app: APP_INFO.name,
        version: APP_INFO.version,
        exportedAt: new Date().toISOString(),
        completedDays: completed,
        gratitudeByDate: gratitudeClean,
      };

      setExportJson(JSON.stringify(data, null, 2));
      Alert.alert(
        "Backup gerado",
        `Backup gerado como texto abaixo.\nLeituras: ${completed.length}\nGratidões: ${Object.keys(gratitudeClean).length}`
      );
    } catch (err) {
      console.log("Erro ao exportar", err);
      Alert.alert("Erro", "Não foi possível gerar o backup em texto.");
    }
  }

  async function importProgress() {
    try {
      if (!importText.trim()) {
        Alert.alert("Vazio", "Cole o código JSON no campo abaixo primeiro.");
        return;
      }

      const parsed = JSON.parse(importText);

      // ✅ compatível com backups antigos
      const rawList = Array.isArray(parsed?.completedDays) ? parsed.completedDays : [];
      const validDates = uniqueSortedIsoDates(rawList);

      if (validDates.length === 0) {
        Alert.alert("Erro", "JSON válido, mas sem datas no formato YYYY-MM-DD.");
        return;
      }

      const hasGratitudeInFile =
        parsed && typeof parsed === "object" && Object.prototype.hasOwnProperty.call(parsed, "gratitudeByDate");

      const g = hasGratitudeInFile ? sanitizeGratitudeMap(parsed?.gratitudeByDate) : null;

      await setCompletedDays(validDates);

      if (g) {
        await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(g));
        setGratitudeByDate(g);
      } else {
        await loadGratitude();
      }

      await markAutoRestoreDone();

      setImportText("");
      setExportJson(null);
      buildHistory(validDates);

      const base = new Date();
      base.setHours(12, 0, 0, 0);
      setStreak(calcStreakFromStore(validDates, base));

      Alert.alert(
        "Sucesso",
        `${validDates.length} leituras restauradas 🙏\nGratidões: ${
          g ? Object.keys(g).length : Object.keys(gratitudeByDate).length
        }`
      );
    } catch (err) {
      console.log("Erro ao importar", err);
      Alert.alert("Erro", "JSON inválido ou incompatível com a Jornada Bíblica.");
    }
  }

  async function restoreAutoBackupNow() {
    try {
      const result = await restoreFromAutoBackup();

      if (!result.restored) {
        Alert.alert("Nada para restaurar", "Nenhum backup automático válido foi encontrado.");
        return;
      }

      await markAutoRestoreDone();
      Alert.alert("Restaurado ✅", `Progresso restaurado: ${result.count} dias.`);
      setExportJson(null);

      await loadHistory();
      await loadLastBackupInfo();
      await loadGratitude();
    } catch (err) {
      console.log("Erro ao restaurar backup automático", err);
      Alert.alert("Erro", "Não foi possível restaurar o backup automático.");
    }
  }

  function confirmReset() {
    Alert.alert(
      "Resetar progresso?",
      "Isso vai apagar suas leituras concluídas (streak, progresso e histórico). Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Continuar", style: "destructive", onPress: confirmResetFinal },
      ]
    );
  }

  function confirmResetFinal() {
    Alert.alert(
      "Confirmação final",
      "Tem certeza? Suas leituras concluídas serão apagadas agora.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Apagar", style: "destructive", onPress: resetProgressNow },
      ]
    );
  }

  async function resetProgressNow() {
    try {
      await resetProgress();
      await AsyncStorage.removeItem(GRATITUDE_KEY);

      setHistory({});
      setExportJson(null);
      setImportText("");
      setStreak(0);
      setGratitudeByDate({});

      Alert.alert("Pronto", "Seu progresso foi resetado.");
      await loadLastBackupInfo();
    } catch (err) {
      console.log("Erro ao resetar progresso", err);
      Alert.alert("Erro", "Não foi possível resetar o progresso.");
    }
  }

  // --- VARIÁVEIS DE UI ---
  const level = useMemo(() => getLevelForStreak(streak), [streak]);
  const nextMilestone = useMemo(() => getNextMilestone(streak), [streak]);

  const lastBackupLabel = lastBackupAt
    ? formatIsoDate(lastBackupAt)
    : "Nunca";

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
            <Text style={styles.screenTitle}>Histórico & Backup</Text>
            <Text style={styles.screenSubtitle}>
                Gerencie seus dados e reveja sua jornada.
            </Text>
        </View>

        {/* STATUS CARD */}
        <View style={styles.card}>
            <View style={styles.statusRow}>
                <View style={styles.statusItem}>
                     <Text style={styles.statusLabel}>Nível Atual</Text>
                     <Text style={styles.statusValue}>{level.title}</Text>
                </View>
                <View style={styles.dividerVertical} />
                <View style={styles.statusItem}>
                     <Text style={styles.statusLabel}>Backup Auto</Text>
                     <Text style={styles.statusValue}>{lastBackupLabel}</Text>
                </View>
            </View>
            
            <View style={styles.dividerHorizontal} />
            
            <View style={styles.milestoneBox}>
                {nextMilestone.next ? (
                    <Text style={styles.milestoneText}>
                        🚀 Próximo marco: {nextMilestone.next} dias (Faltam {nextMilestone.remaining})
                    </Text>
                ) : (
                    <Text style={styles.milestoneText}>🏆 Jornada completa!</Text>
                )}
            </View>
        </View>

        {/* CONTROLES DE DADOS (CARDS) */}
        
        {/* 1. Backup Manual */}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>📥 Backup Manual (Texto)</Text>
            <Text style={styles.cardDesc}>
                Gere um código de texto para salvar seus dados ou cole um código para restaurar.
            </Text>

            <TouchableOpacity style={styles.buttonOutline} onPress={exportAsText}>
                <Text style={styles.buttonOutlineText}>📄 Gerar código de backup</Text>
            </TouchableOpacity>

            {exportJson && (
                <View style={styles.codeBlock}>
                    <Text style={styles.codeTitle}>Copie o código abaixo:</Text>
                    <Text selectable style={styles.codeText}>
                        {exportJson}
                    </Text>
                </View>
            )}

            <View style={styles.inputContainer}>
                 <Text style={styles.inputLabel}>Importar dados:</Text>
                 <TextInput
                    value={importText}
                    onChangeText={setImportText}
                    multiline
                    placeholder="{ 'completedDays': ... }"
                    placeholderTextColor="#999"
                    style={styles.textInput}
                 />
            </View>

            <TouchableOpacity style={styles.buttonPrimary} onPress={importProgress}>
                <Text style={styles.buttonPrimaryText}>Restaurar via Texto</Text>
            </TouchableOpacity>
        </View>

        {/* 2. Recuperação Automática */}
        <View style={styles.card}>
            <Text style={styles.cardTitle}>♻️ Recuperação Automática</Text>
            <Text style={styles.cardDesc}>
                Tentar recuperar dados salvos automaticamente pelo sistema (semanal).
            </Text>
            <TouchableOpacity style={styles.buttonSecondary} onPress={restoreAutoBackupNow}>
                <Text style={styles.buttonSecondaryText}>Buscar Backup Automático</Text>
            </TouchableOpacity>
        </View>

        {/* 3. Zona de Perigo */}
        <View style={[styles.card, styles.dangerCard]}>
            <Text style={[styles.cardTitle, { color: "#D32F2F" }]}>⚠️ Zona de Perigo</Text>
            <Text style={styles.cardDesc}>
                Apagar todo o progresso, gratidões e histórico do aplicativo.
            </Text>
            <TouchableOpacity style={styles.buttonDanger} onPress={confirmReset}>
                <Text style={styles.buttonDangerText}>Apagar Tudo</Text>
            </TouchableOpacity>
        </View>

        {/* LISTA DE HISTÓRICO */}
        <Text style={styles.sectionHeader}>Sua Linha do Tempo</Text>

        {months.length === 0 ? (
             <View style={styles.emptyState}>
                 <Text style={styles.emptyStateText}>Nenhuma leitura concluída ainda.</Text>
             </View>
        ) : (
            months.map((month) => (
                <View key={month} style={{ marginBottom: 20 }}>
                    <Text style={styles.monthLabel}>{month}</Text>
                    
                    {history[month].map((item) => {
                        const gratitude = gratitudeByDate[item.date];
                        return (
                            <View key={item.date} style={styles.historyItemCard}>
                                <View style={styles.historyHeader}>
                                    <Text style={styles.historyRef}>{item.reference}</Text>
                                    <Text style={styles.historyDate}>{item.date}</Text>
                                </View>
                                
                                {!!gratitude && (
                                    <View style={styles.gratitudeBox}>
                                        <Text style={styles.gratitudeText}>
                                            🙏 "{gratitude}"
                                        </Text>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            ))
        )}

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
        marginBottom: 8,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary,
        marginTop: 10,
        marginBottom: 16,
    },
    // Cards
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
    dangerCard: {
        borderLeftWidth: 4,
        borderLeftColor: "#D32F2F",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 4,
    },
    cardDesc: {
        fontSize: 13,
        color: colors.muted,
        marginBottom: 12,
        lineHeight: 18,
    },
    // Status Row in Card
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 12,
    },
    statusItem: {
        alignItems: "center",
        flex: 1,
    },
    statusLabel: {
        fontSize: 11,
        textTransform: "uppercase",
        color: colors.muted,
        fontWeight: "bold",
    },
    statusValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.primary,
        marginTop: 2,
    },
    dividerVertical: {
        width: 1,
        height: 30,
        backgroundColor: "#EEE",
    },
    dividerHorizontal: {
        height: 1,
        backgroundColor: "#EEE",
        marginBottom: 12,
    },
    milestoneBox: {
        backgroundColor: "#FFF9F0",
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    milestoneText: {
        fontSize: 12,
        color: colors.secondary,
        fontWeight: "600",
    },
    // Buttons
    buttonPrimary: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 8,
    },
    buttonPrimaryText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    },
    buttonSecondary: {
        backgroundColor: "#F0F0F0",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonSecondaryText: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: 14,
    },
    buttonOutline: {
        borderWidth: 1,
        borderColor: colors.primary,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },
    buttonOutlineText: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 14,
    },
    buttonDanger: {
        backgroundColor: "#FFEBEE",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonDangerText: {
        color: "#D32F2F",
        fontWeight: "bold",
        fontSize: 14,
    },
    // Inputs & Code
    inputContainer: {
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 6,
    },
    textInput: {
        backgroundColor: "#F9F9F9",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        fontSize: 12,
        textAlignVertical: "top",
        color: colors.text,
    },
    codeBlock: {
        backgroundColor: "#F4F6F8",
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    codeTitle: {
        fontSize: 11,
        color: colors.muted,
        marginBottom: 4,
    },
    codeText: {
        fontSize: 10,
        fontFamily: "monospace",
        color: colors.text,
    },
    // History List
    monthLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.secondary,
        marginBottom: 8,
        marginLeft: 4,
    },
    historyItemCard: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    historyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    historyRef: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.text,
    },
    historyDate: {
        fontSize: 12,
        color: colors.muted,
    },
    gratitudeBox: {
        marginTop: 8,
        backgroundColor: "#FFF9C4", // Amarelo suave
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: "flex-start",
    },
    gratitudeText: {
        fontSize: 12,
        color: "#5D4037", // Marrom escuro para contraste
        fontStyle: "italic",
    },
    emptyState: {
        padding: 20,
        alignItems: "center",
    },
    emptyStateText: {
        color: colors.muted,
        fontStyle: "italic",
    },
});