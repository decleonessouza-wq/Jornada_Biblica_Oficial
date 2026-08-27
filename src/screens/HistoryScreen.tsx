import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  Pressable,
  StyleSheet,
  StatusBar,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useCallback, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { colors } from "../theme/colors";
import { restoreFromAutoBackup } from "../services/backupRestore";
import { APP_INFO } from "../constants/appInfo";

import {
  getCompletedDays,
  resetProgress,
  markAutoRestoreDone,
  setCompletedDays,
  calculateStreak as calcStreakFromStore,
  // ✅ plano atemporal/overrides
  getEffectiveReferenceForDate,
} from "../services/progressStore";

// ✅ gamificação centralizada (leve)
import { getLevelForStreak, getNextMilestone } from "../constants/gamification";

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

/* ==========================
   HELPERS (LÓGICA PRESERVADA)
========================== */

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

function formatMonthLabel(yyyyMm: string) {
  // "2026-01" -> "01/2026"
  const [y, m] = yyyyMm.split("-");
  if (!y || !m) return yyyyMm;
  return `${m}/${y}`;
}

/* ==========================
   UI (LOCAL)
========================== */

function Card({ children, tone }: { children: React.ReactNode; tone?: "normal" | "danger" }) {
  return (
    <View
      style={[
        styles.card,
        shadowCard(),
        tone === "danger" && styles.cardDanger,
      ]}
    >
      {children}
    </View>
  );
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

function PrimaryButton({
  title,
  onPress,
  danger,
}: {
  title: string;
  onPress: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnPrimary,
        danger && { backgroundColor: "#D32F2F" },
        pressed && { opacity: 0.95, transform: [{ scale: 0.99 }] },
      ]}
    >
      <Text style={styles.btnPrimaryText}>{title}</Text>
    </Pressable>
  );
}

function SecondaryButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnSecondary,
        pressed && { opacity: 0.96, transform: [{ scale: 0.99 }] },
      ]}
    >
      <Text style={styles.btnSecondaryText}>{title}</Text>
    </Pressable>
  );
}

function OutlineButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnOutline,
        pressed && { opacity: 0.96, transform: [{ scale: 0.99 }] },
      ]}
    >
      <Text style={styles.btnOutlineText}>{title}</Text>
    </Pressable>
  );
}

/* ==========================
   SCREEN
========================== */

export default function HistoryScreen() {
  const { width } = useWindowDimensions();
  const maxWidth = clamp(width, 360, 820);

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

  /**
   * ✅ Histórico ATEMPORAL:
   * - completedDays = datas reais (YYYY-MM-DD)
   * - para cada data, resolve a referência efetiva (considera overrides da redistribuição)
   * - ignora domingos reais (não contam como leitura)
   */
  const buildHistory = useCallback(async (completed: string[]) => {
    const grouped: Record<string, HistoryItem[]> = {};

    const sorted = [...completed]
      .filter(isIsoDateString)
      .sort((a, b) => b.localeCompare(a)); // mais recente primeiro

    for (const dateIso of sorted) {
      try {
        const eff = await getEffectiveReferenceForDate(dateIso);

        // domingo real não entra como "leitura concluída"
        if (eff.isSunday) continue;

        const month = dateIso.slice(0, 7);
        if (!grouped[month]) grouped[month] = [];

        grouped[month].push({
          date: dateIso,
          reference: eff.reference,
        });
      } catch {
        // fallback seguro: não quebra
        const month = dateIso.slice(0, 7);
        if (!grouped[month]) grouped[month] = [];

        grouped[month].push({
          date: dateIso,
          reference: "Leitura concluída",
        });
      }
    }

    setHistory(grouped);
  }, []);

  const loadHistory = useCallback(async () => {
    try {
      const completed = await getCompletedDays();
      await buildHistory(completed);

      // streak (meio-dia local p/ evitar bug UTC)
      const base = new Date();
      base.setHours(12, 0, 0, 0);
      setStreak(calcStreakFromStore(completed, base));
    } catch (err) {
      console.log("Erro ao carregar histórico", err);
      await buildHistory([]);
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
        `Backup gerado como texto abaixo.\nLeituras: ${completed.length}\nGratidões: ${
          Object.keys(gratitudeClean).length
        }`
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
        parsed &&
        typeof parsed === "object" &&
        Object.prototype.hasOwnProperty.call(parsed, "gratitudeByDate");

      const g = hasGratitudeInFile ? sanitizeGratitudeMap(parsed?.gratitudeByDate) : null;

      await setCompletedDays(validDates);

      let gCount = 0;

      if (g) {
        await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(g));
        setGratitudeByDate(g);
        gCount = Object.keys(g).length;
      } else {
        await loadGratitude();
        gCount = Object.keys(gratitudeByDate).length;
      }

      await markAutoRestoreDone();

      setImportText("");
      setExportJson(null);

      await buildHistory(validDates);

      const base = new Date();
      base.setHours(12, 0, 0, 0);
      setStreak(calcStreakFromStore(validDates, base));

      Alert.alert("Sucesso", `${validDates.length} leituras restauradas 🙏\nGratidões: ${gCount}`);
    } catch (err) {
      console.log("Erro ao importar", err);
      Alert.alert("Erro", `JSON inválido ou incompatível com o ${APP_INFO.name}.`);
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
    Alert.alert("Confirmação final", "Tem certeza? Suas leituras concluídas serão apagadas agora.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Apagar", style: "destructive", onPress: resetProgressNow },
    ]);
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

  const lastBackupLabel = lastBackupAt ? formatIsoDate(lastBackupAt) : "Nunca";

  // --- RENDER ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: width >= 700 ? 24 : 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentWrap, { width: "100%", maxWidth, alignSelf: "center" }]}>
          {/* HERO */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Histórico</Text>
            <Text style={styles.heroSubtitle}>
              Releia sua jornada, veja sua constância e gerencie backups com segurança.
            </Text>

            <View style={styles.statsGrid}>
              <StatTile
                icon="🔥"
                label="Streak"
                value={`${streak}`}
                helper="dias úteis seguidos"
                tone="secondary"
              />
              <StatTile
                icon="🏅"
                label="Nível"
                value={level.title}
                helper={nextMilestone.next ? `Próximo: ${nextMilestone.next} (faltam ${nextMilestone.remaining})` : "Jornada completa"}
                tone="primary"
              />
              <StatTile
                icon="🙏"
                label="Gratidões"
                value={`${gratitudeCount}`}
                helper="registros"
                tone="neutral"
              />
            </View>

            <Text style={styles.heroHint}>♻️ Último backup automático: {lastBackupLabel}</Text>
          </View>

          {/* BACKUP MANUAL */}
          <Card>
            <SectionTitle
              icon="📥"
              title="Backup manual (texto)"
              subtitle="Gere um código e guarde em local seguro. Para restaurar, cole o código e toque em restaurar."
            />

            <OutlineButton title="📄 Gerar código de backup" onPress={exportAsText} />

            {!!exportJson && (
              <View style={styles.codeBlock}>
                <Text style={styles.codeTitle}>Copie o código abaixo:</Text>
                <Text selectable style={styles.codeText}>
                  {exportJson}
                </Text>
              </View>
            )}

            <View style={{ height: 10 }} />

            <Text style={styles.inputLabel}>Importar / restaurar (cole o JSON):</Text>
            <TextInput
              value={importText}
              onChangeText={setImportText}
              multiline
              placeholder='{ "completedDays": ["2026-01-01", "..."], "gratitudeByDate": { "2026-01-01": "..." } }'
              placeholderTextColor="#9aa0a6"
              style={styles.textArea}
            />

            <View style={{ height: 10 }} />
            <PrimaryButton title="✅ Restaurar via texto" onPress={importProgress} />
          </Card>

          {/* BACKUP AUTOMÁTICO */}
          <Card>
            <SectionTitle
              icon="♻️"
              title="Recuperação automática"
              subtitle="Busca um backup automático semanal (se existir) e restaura com segurança."
            />
            <SecondaryButton title="Buscar backup automático" onPress={restoreAutoBackupNow} />
          </Card>

          {/* ZONA DE PERIGO */}
          <Card tone="danger">
            <SectionTitle
              icon="⚠️"
              title="Zona de perigo"
              subtitle="Apaga leituras concluídas, streak, histórico e gratidões."
            />
            <PrimaryButton title="🧨 Apagar tudo" onPress={confirmReset} danger />
            <Text style={styles.dangerHint}>
              Essa ação não pode ser desfeita.
            </Text>
          </Card>

          {/* LINHA DO TEMPO */}
          <Card>
            <SectionTitle
              icon="🗓️"
              title="Sua linha do tempo"
              subtitle="Leituras concluídas (domingos não entram) + gratidão quando houver."
            />

            {months.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>Nenhuma leitura concluída ainda.</Text>
              </View>
            ) : (
              <View style={{ gap: 14 }}>
                {months.map((month) => (
                  <View key={month} style={styles.monthBlock}>
                    <View style={styles.monthHeaderRow}>
                      <Text style={styles.monthTitle}>{formatMonthLabel(month)}</Text>
                      <Text style={styles.monthCount}>{history[month]?.length ?? 0} itens</Text>
                    </View>

                    <View style={{ gap: 10 }}>
                      {history[month].map((item) => {
                        const gratitude = gratitudeByDate[item.date];

                        return (
                          <View key={item.date} style={styles.historyItemCard}>
                            <View style={styles.historyHeader}>
                              <Text style={styles.historyRef} numberOfLines={2}>
                                {item.reference}
                              </Text>
                              <Text style={styles.historyDate}>{item.date}</Text>
                            </View>

                            {!!gratitude && (
                              <View style={styles.gratitudeBox}>
                                <Text style={styles.gratitudeTitle}>🙏 Gratidão</Text>
                                <Text style={styles.gratitudeText}>“{gratitude}”</Text>
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </Card>

          {/* INFO APP */}
          <Text style={styles.footerInfo}>
            {APP_INFO.name} • v{APP_INFO.version}
          </Text>

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
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  contentWrap: {
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
    marginTop: 12,
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
    fontSize: 16,
    fontWeight: "900",
  },
  statHelper: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
    lineHeight: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },
  cardDanger: {
    borderLeftWidth: 4,
    borderLeftColor: "#D32F2F",
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

  btnPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  btnSecondary: {
    backgroundColor: "rgba(0,0,0,0.06)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondaryText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
  },

  btnOutline: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnOutlineText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
  },

  codeBlock: {
    marginTop: 12,
    backgroundColor: "#f6f7f8",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  codeTitle: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 6,
    fontWeight: "800",
  },
  codeText: {
    fontSize: 10,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
    color: colors.text,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 6,
  },
  textArea: {
    minHeight: 120,
    backgroundColor: "#f6f7f8",
    borderRadius: 14,
    padding: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    textAlignVertical: "top",
  },

  dangerHint: {
    marginTop: 10,
    fontSize: 12,
    color: "#B71C1C",
    fontWeight: "700",
    textAlign: "center",
  },

  emptyBox: {
    backgroundColor: "rgba(0,0,0,0.04)",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  emptyText: {
    color: colors.muted,
    fontStyle: "italic",
  },

  monthBlock: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    borderRadius: 16,
    padding: 12,
  },
  monthHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 10,
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.secondary,
  },
  monthCount: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "800",
  },

  historyItemCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    alignItems: "flex-start",
  },
  historyRef: {
    flex: 1,
    fontSize: 14,
    fontWeight: "900",
    color: colors.text,
    lineHeight: 19,
  },
  historyDate: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },

  gratitudeBox: {
    marginTop: 10,
    backgroundColor: "rgba(218,165,32,0.14)",
    padding: 10,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  gratitudeTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.secondary,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  gratitudeText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
    fontStyle: "italic",
  },

  footerInfo: {
    marginTop: 2,
    textAlign: "center",
    fontSize: 12,
    color: colors.muted,
  },
});
