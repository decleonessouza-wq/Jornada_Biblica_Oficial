import {
  View,
  Text,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import { restoreFromAutoBackup } from "../services/backupRestore";
import { APP_INFO } from "../constants/appInfo";
import type { RootStackParamList } from "../app_router_off";

// ✅ usar as rotinas oficiais do app para não deixar chaves “penduradas”
import { resetProgress, setCompletedDays, markAutoRestoreDone } from "../services/progressStore";

// --- TIPOS E INTERFACES ---
type ExportData = {
  app: string;
  version: string;
  exportedAt: string;
  completedDays: string[];
  gratitudeByDate?: Record<string, string>;
  userName?: string | null;
  hasOnboarded?: boolean;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Settings">;

// --- CONSTANTES ---
const LAST_BACKUP_KEY = "lastAutoBackupDate";
const USER_NAME_KEY = "userName";
const HAS_ONBOARDED_KEY = "hasOnboarded";
const GRATITUDE_KEY = "gratitudeByDate";

// ✅ NOTIF SETTINGS (NOVO) — chaves estáveis (não quebram nada)
const NOTIF_ENABLED_KEY = "notif_enabled";
const NOTIF_TIME_KEY = "notif_time_hhmm"; // "08:00"
const NOTIF_SMART_SKIP_DONE_KEY = "notif_smart_skip_done"; // "1" | "0"
const NOTIF_CONTENT_MODE_KEY = "notif_content_mode"; // "mixed" | "verse" | "phrase"

// --- HELPERS ---
function formatIsoDate(iso: string | null) {
  if (!iso) return null;
  if (iso.includes("T")) return iso.split("T")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  return iso;
}

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

function shadowCard() {
  return Platform.select({
    android: { elevation: 2 },
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 8 },
    },
    default: {},
  }) as any;
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
    <TouchableOpacity
      activeOpacity={0.92}
      style={[styles.btnPrimary, danger && styles.btnDanger]}
      onPress={onPress}
    >
      <Text style={styles.btnPrimaryText}>{title}</Text>
    </TouchableOpacity>
  );
}

function SecondaryButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.92} style={styles.btnSecondary} onPress={onPress}>
      <Text style={styles.btnSecondaryText}>{title}</Text>
    </TouchableOpacity>
  );
}

function OutlineButton({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.92} style={styles.btnOutline} onPress={onPress}>
      <Text style={styles.btnOutlineText}>{title}</Text>
    </TouchableOpacity>
  );
}

/* ======================
   NOTIF HELPERS (NOVO)
====================== */

type NotifContentMode = "mixed" | "verse" | "phrase";

function isValidHHMM(s: string) {
  const m = /^(\d{2}):(\d{2})$/.exec(s.trim());
  if (!m) return false;
  const hh = Number(m[1]);
  const mm = Number(m[2]);
  if (!Number.isFinite(hh) || !Number.isFinite(mm)) return false;
  return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
}

function normalizeHHMM(s: string) {
  const m = /^(\d{1,2}):(\d{1,2})$/.exec(s.trim());
  if (!m) return s.trim();
  const hh = String(Math.min(23, Math.max(0, Number(m[1])))).padStart(2, "0");
  const mm = String(Math.min(59, Math.max(0, Number(m[2])))).padStart(2, "0");
  return `${hh}:${mm}`;
}

function modeLabel(m: NotifContentMode) {
  if (m === "verse") return "📖 Versículo";
  if (m === "phrase") return "✨ Incentivo";
  return "🔀 Misto";
}

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [exportJson, setExportJson] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [lastBackupAt, setLastBackupAt] = useState<string | null>(null);

  // ✅ NOTIF UI (NOVO)
  const [notifEnabled, setNotifEnabled] = useState(false);
  const [notifTime, setNotifTime] = useState("08:00");
  const [notifSmartSkipDone, setNotifSmartSkipDone] = useState(true);
  const [notifMode, setNotifMode] = useState<NotifContentMode>("mixed");
  const [notifDirty, setNotifDirty] = useState(false);

  useEffect(() => {
    loadLastBackupInfo();
    loadNotifSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadLastBackupInfo() {
    try {
      const last = await AsyncStorage.getItem(LAST_BACKUP_KEY);
      setLastBackupAt(last || null);
    } catch {
      setLastBackupAt(null);
    }
  }

  async function loadNotifSettings() {
    try {
      const enabledRaw = await AsyncStorage.getItem(NOTIF_ENABLED_KEY);
      const timeRaw = await AsyncStorage.getItem(NOTIF_TIME_KEY);
      const smartRaw = await AsyncStorage.getItem(NOTIF_SMART_SKIP_DONE_KEY);
      const modeRaw = await AsyncStorage.getItem(NOTIF_CONTENT_MODE_KEY);

      setNotifEnabled(enabledRaw === "1" || enabledRaw === "true");

      const t = typeof timeRaw === "string" && timeRaw.trim() ? timeRaw.trim() : "08:00";
      setNotifTime(isValidHHMM(t) ? t : "08:00");

      if (smartRaw === null) {
        setNotifSmartSkipDone(true);
      } else {
        setNotifSmartSkipDone(smartRaw === "1" || smartRaw === "true");
      }

      const m = modeRaw as NotifContentMode | null;
      if (m === "mixed" || m === "verse" || m === "phrase") setNotifMode(m);
      else setNotifMode("mixed");

      setNotifDirty(false);
    } catch (err) {
      console.log("Erro ao carregar notif settings", err);
      setNotifEnabled(false);
      setNotifTime("08:00");
      setNotifSmartSkipDone(true);
      setNotifMode("mixed");
      setNotifDirty(false);
    }
  }

  async function applyNotifSettingsToServiceSafely() {
    // ✅ Não quebra se o serviço ainda não tiver as funções prontas
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const svc: any = require("../services/notifications");

      const payload = {
        enabled: notifEnabled,
        timeHHMM: notifTime,
        smartSkipIfDoneToday: notifSmartSkipDone,
        contentMode: notifMode,
      };

      // Tenta aplicar por nomes comuns (duck-typing)
      if (typeof svc?.applyNotificationSettings === "function") {
        await svc.applyNotificationSettings(payload);
      } else if (typeof svc?.rescheduleFromSettings === "function") {
        await svc.rescheduleFromSettings();
      } else if (typeof svc?.syncScheduledNotifications === "function") {
        await svc.syncScheduledNotifications();
      } else if (typeof svc?.scheduleDailyReminderFromSettings === "function") {
        await svc.scheduleDailyReminderFromSettings();
      }
    } catch (err) {
      // Silencioso: UI salva, serviço será finalizado no próximo passo do cronograma
      console.log("applyNotifSettingsToServiceSafely (ignorado):", err);
    }
  }

  async function saveNotifSettings() {
    const timeFixed = normalizeHHMM(notifTime);

    if (!isValidHHMM(timeFixed)) {
      Alert.alert("Horário inválido", "Use o formato HH:MM (ex: 08:00).");
      return;
    }

    try {
      await AsyncStorage.setItem(NOTIF_ENABLED_KEY, notifEnabled ? "1" : "0");
      await AsyncStorage.setItem(NOTIF_TIME_KEY, timeFixed);
      await AsyncStorage.setItem(NOTIF_SMART_SKIP_DONE_KEY, notifSmartSkipDone ? "1" : "0");
      await AsyncStorage.setItem(NOTIF_CONTENT_MODE_KEY, notifMode);

      setNotifTime(timeFixed);
      setNotifDirty(false);

      // ✅ tenta aplicar no serviço sem quebrar
      await applyNotifSettingsToServiceSafely();

      Alert.alert("Salvo ✅", "Configurações de lembrete atualizadas.");
    } catch (err) {
      console.log("Erro ao salvar notif settings", err);
      Alert.alert("Erro", "Não foi possível salvar as configurações de lembrete.");
    }
  }

  /* ==========================
     EXPORT (texto)
  ========================== */
  async function exportAsText() {
    try {
      const stored = await AsyncStorage.getItem("completedDays");
      const parsed = stored ? JSON.parse(stored) : [];
      const completed = uniqueSortedIsoDates(Array.isArray(parsed) ? parsed : []);

      const gratitudeRaw = await AsyncStorage.getItem(GRATITUDE_KEY);
      const gratitudeParsed = gratitudeRaw ? JSON.parse(gratitudeRaw) : {};
      const gratitudeByDate = sanitizeGratitudeMap(gratitudeParsed);

      const userNameRaw = await AsyncStorage.getItem(USER_NAME_KEY);
      const hasOnboardedRaw = await AsyncStorage.getItem(HAS_ONBOARDED_KEY);
      const hasOnboarded = hasOnboardedRaw === "1" || hasOnboardedRaw === "true";

      const data: ExportData = {
        app: APP_INFO.name,
        version: APP_INFO.version,
        exportedAt: new Date().toISOString(),
        completedDays: completed,
        gratitudeByDate,
        userName: userNameRaw || null,
        hasOnboarded,
      };

      setExportJson(JSON.stringify(data, null, 2));
      Alert.alert("Backup gerado", "Backup gerado como texto abaixo.");
    } catch (err) {
      console.log("Erro ao exportar", err);
      Alert.alert("Erro", "Não foi possível gerar o backup em texto.");
    }
  }

  /* ==========================
     IMPORT (texto JSON)
  ========================== */
  async function importProgress() {
    try {
      if (!importText.trim()) {
        Alert.alert("Vazio", "Por favor, cole o código JSON no campo.");
        return;
      }

      const parsed = JSON.parse(importText);

      const rawList = Array.isArray(parsed?.completedDays) ? parsed.completedDays : null;
      if (!rawList) {
        Alert.alert("Erro", "Formato inválido: não encontrei 'completedDays' no JSON.");
        return;
      }

      const validDates = uniqueSortedIsoDates(rawList);

      // ✅ usa o setter oficial (sanitiza e mantém compatibilidade do app)
      await setCompletedDays(validDates);

      const gratitudeByDate = sanitizeGratitudeMap(parsed?.gratitudeByDate);
      await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(gratitudeByDate));

      if (typeof parsed?.userName === "string") {
        const name = parsed.userName.trim();
        if (name) await AsyncStorage.setItem(USER_NAME_KEY, name);
      }
      if (typeof parsed?.hasOnboarded === "boolean") {
        await AsyncStorage.setItem(HAS_ONBOARDED_KEY, parsed.hasOnboarded ? "1" : "0");
      }

      // ✅ marca auto-restore como já feito (mesma convenção do app)
      await markAutoRestoreDone();

      setImportText("");
      setExportJson(null);

      Alert.alert("Sucesso", `${validDates.length} leituras restauradas 🙏\nGratidões: ${Object.keys(gratitudeByDate).length}`);
    } catch (err) {
      console.log("Erro ao importar", err);
      Alert.alert("Erro", "JSON inválido ou incompatível com a Jornada Bíblica.");
    }
  }

  /* ==========================
     RESTAURAR DO BACKUP AUTOMÁTICO
  ========================== */
  async function restoreAutoBackupNow() {
    try {
      const result = await restoreFromAutoBackup();

      if (!result.restored) {
        Alert.alert("Nada para restaurar", "Nenhum backup automático válido foi encontrado.");
        return;
      }

      await markAutoRestoreDone();

      Alert.alert("Restaurado ✅", `Progresso restaurado: ${result.count} dias.`);
      await loadLastBackupInfo();
    } catch (err) {
      console.log("Erro ao restaurar backup automático", err);
      Alert.alert("Erro", "Não foi possível restaurar o backup automático.");
    }
  }

  /* ==========================
     RESET SEGURO
  ========================== */
  function confirmReset() {
    Alert.alert(
      "Resetar tudo?",
      "Isso vai apagar seu progresso (leituras, streak, atrasos), gratidões e também suas infos de boas-vindas. Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Continuar", style: "destructive", onPress: confirmResetFinal },
      ]
    );
  }

  function confirmResetFinal() {
    Alert.alert("Confirmação final", "Tem certeza? Tudo será apagado agora.", [
      { text: "Cancelar", style: "cancel" },
      { text: "Apagar", style: "destructive", onPress: resetAllNow },
    ]);
  }

  async function resetAllNow() {
    try {
      // ✅ usa o reset oficial (inclui planStartDate e flags do fluxo)
      await resetProgress();

      // ✅ limpa extras (gratidão + onboarding)
      await AsyncStorage.removeItem(GRATITUDE_KEY);
      await AsyncStorage.removeItem(USER_NAME_KEY);
      await AsyncStorage.removeItem(HAS_ONBOARDED_KEY);

      setExportJson(null);
      setImportText("");

      Alert.alert("Pronto", "Tudo foi resetado.");
      await loadLastBackupInfo();
    } catch (err) {
      console.log("Erro ao resetar", err);
      Alert.alert("Erro", "Não foi possível resetar os dados.");
    }
  }

  function clearImportBox() {
    setImportText("");
    Alert.alert("Ok", "Campo de importação limpo.");
  }

  /* ==========================
     ONBOARDING (rever/editar)
  ========================== */
  async function replayWelcome() {
    try {
      await AsyncStorage.removeItem(USER_NAME_KEY);
      await AsyncStorage.removeItem(HAS_ONBOARDED_KEY);
      navigation.replace("Welcome");
    } catch (err) {
      console.log("Erro ao resetar onboarding", err);
      Alert.alert("Erro", "Não foi possível reabrir a tela de boas-vindas.");
    }
  }

  function openDedication() {
    navigation.navigate("Dedication");
  }

  const lastBackupLabel = useMemo(() => {
    return lastBackupAt ? formatIsoDate(lastBackupAt) : "Nunca";
  }, [lastBackupAt]);

  const notifSummary = useMemo(() => {
    if (!notifEnabled) return "Desativado";
    return `${notifTime} • ${modeLabel(notifMode)}${notifSmartSkipDone ? " • inteligente" : ""}`;
  }, [notifEnabled, notifTime, notifMode, notifSmartSkipDone]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.page} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.hTitle}>Configurações</Text>
          <Text style={styles.hSub}>
            {APP_INFO.name} • v{APP_INFO.version}
          </Text>
        </View>

        {/* PERFIL */}
        <View style={[styles.card, shadowCard()]}>
          <Text style={styles.cardTitle}>👤 Perfil</Text>
          <Text style={styles.cardDesc}>Gerencie suas informações e fluxo inicial.</Text>

          <OutlineButton title="🔁 Rever Boas-vindas" onPress={replayWelcome} />
          <OutlineButton title="📜 Ver Dedicatória" onPress={openDedication} />
        </View>

        {/* ✅ LEMBRETES (NOVO) */}
        <View style={[styles.card, shadowCard()]}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>⏰ Lembretes</Text>
            <View style={styles.pillMini}>
              <Text style={styles.pillMiniText}>{notifSummary}</Text>
            </View>
          </View>

          <Text style={styles.cardDesc}>
            Configure um lembrete diário para manter constância. As notificações dependem das permissões do seu celular.
          </Text>

          {/* Enabled toggle */}
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>Ativar lembrete</Text>
              <Text style={styles.toggleHint}>Liga/desliga o lembrete diário.</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.togglePill, notifEnabled ? styles.toggleOn : styles.toggleOff]}
              onPress={() => {
                setNotifEnabled((p) => !p);
                setNotifDirty(true);
              }}
              accessibilityRole="button"
              accessibilityLabel="Ativar ou desativar lembrete"
            >
              <Text style={styles.togglePillText}>{notifEnabled ? "Ligado" : "Desligado"}</Text>
            </TouchableOpacity>
          </View>

          {/* Time */}
          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Horário (HH:MM)</Text>
          <TextInput
            value={notifTime}
            onChangeText={(t) => {
              setNotifTime(t);
              setNotifDirty(true);
            }}
            placeholder="08:00"
            placeholderTextColor="#9aa0a6"
            style={styles.timeInput}
            keyboardType={Platform.OS === "ios" ? "numbers-and-punctuation" : "numeric"}
            maxLength={5}
          />

          <View style={styles.quickTimeRow}>
            {["07:00", "12:00", "17:00", "21:00"].map((t) => (
              <TouchableOpacity
                key={t}
                activeOpacity={0.9}
                style={[styles.chip, notifTime === t && styles.chipActive]}
                onPress={() => {
                  setNotifTime(t);
                  setNotifDirty(true);
                }}
              >
                <Text style={[styles.chipText, notifTime === t && styles.chipTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content mode */}
          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Conteúdo da notificação</Text>
          <View style={styles.modeRow}>
            {(["mixed", "verse", "phrase"] as NotifContentMode[]).map((m) => (
              <TouchableOpacity
                key={m}
                activeOpacity={0.9}
                style={[styles.modeBtn, notifMode === m && styles.modeBtnActive]}
                onPress={() => {
                  setNotifMode(m);
                  setNotifDirty(true);
                }}
              >
                <Text style={[styles.modeBtnText, notifMode === m && styles.modeBtnTextActive]}>{modeLabel(m)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Smart skip */}
          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.toggleLabel}>Modo inteligente</Text>
              <Text style={styles.toggleHint}>Não notificar se a leitura de hoje já estiver concluída.</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.togglePill, notifSmartSkipDone ? styles.toggleOn : styles.toggleOff]}
              onPress={() => {
                setNotifSmartSkipDone((p) => !p);
                setNotifDirty(true);
              }}
              accessibilityRole="button"
              accessibilityLabel="Ativar ou desativar modo inteligente"
            >
              <Text style={styles.togglePillText}>{notifSmartSkipDone ? "Sim" : "Não"}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 10 }} />

          <PrimaryButton title={notifDirty ? "💾 Salvar lembretes" : "✅ Lembretes salvos"} onPress={saveNotifSettings} />
        </View>

        {/* DADOS & BACKUP */}
        <View style={[styles.card, shadowCard()]}>
          <Text style={styles.cardTitle}>💾 Dados & Backup</Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>📦 Último Backup Auto: {lastBackupLabel}</Text>
          </View>

          <SecondaryButton title="♻️ Restaurar Backup Automático" onPress={restoreAutoBackupNow} />

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Backup Manual (Texto)</Text>
          <PrimaryButton title="📋 Gerar Código de Backup" onPress={exportAsText} />

          {exportJson && (
            <View style={styles.codeBlock}>
              <Text style={styles.codeTitle}>Copie o código abaixo:</Text>
              <Text selectable style={styles.codeText}>
                {exportJson}
              </Text>
            </View>
          )}

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Importar Dados</Text>
          <TextInput
            value={importText}
            onChangeText={setImportText}
            multiline
            placeholder="Cole o código JSON aqui..."
            placeholderTextColor="#9aa0a6"
            style={styles.textInput}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <PrimaryButton title="📥 Importar" onPress={importProgress} />
            </View>
            <View style={{ flex: 1 }}>
              <OutlineButton title="🧽 Limpar" onPress={clearImportBox} />
            </View>
          </View>
        </View>

        {/* ZONA DE PERIGO */}
        <View style={[styles.card, styles.dangerCard, shadowCard()]}>
          <Text style={[styles.cardTitle, { color: "#D32F2F" }]}>⚠️ Zona de Perigo</Text>
          <Text style={styles.cardDesc}>Apagar todo o progresso, gratidões e configurações do aplicativo. Ação irreversível.</Text>
          <PrimaryButton title="🧹 Resetar Tudo" onPress={confirmReset} danger />
        </View>

        {/* LEGAL */}
        <View style={[styles.card, shadowCard()]}>
          <Text style={styles.cardTitle}>⚖️ Legal</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Terms")}>
            <Text style={styles.menuItemText}>📄 Termos de Uso</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Privacy")}>
            <Text style={styles.menuItemText}>🔒 Política de Privacidade</Text>
            <Text style={styles.menuItemArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* SOBRE */}
        <View style={[styles.card, shadowCard()]}>
          <Text style={styles.cardTitle}>💙 Sobre o App</Text>

          <View style={{ marginTop: 6 }}>
            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Nossa Missão</Text>
              {"\n"}
              Em um mundo de distrações constantes, sabemos que manter a disciplina espiritual é um desafio real. Muitas vezes,
              o desejo de ler a Bíblia existe, mas falta a organização ou o incentivo para continuar quando a rotina aperta.
            </Text>

            <Text style={styles.paragraph}>
              O {APP_INFO.name} nasceu com um objetivo claro: ser mais do que uma ferramenta digital; queremos ser um parceiro
              na sua caminhada de fé. Nossa missão é transformar a <Text style={styles.italic}>intenção</Text> de ler a Bíblia
              em <Text style={styles.italic}>hábito</Text>, e o hábito em <Text style={styles.italic}>intimidade</Text>.
            </Text>

            <Text style={styles.paragraph}>
              <Text style={styles.bold}>O Foco do Plano: A Grande História da Redenção</Text>
              {"\n"}
              Este não é apenas um cronograma de leitura sequencial. Todo o plano foi cuidadosamente estruturado ao redor do
              tema central das Escrituras: o <Text style={styles.bold}>Plano Eterno de Salvação do Homem</Text>.
            </Text>

            <Text style={styles.paragraph}>
              Ao seguir nosso roteiro, você não lerá apenas histórias isoladas, mas entenderá como cada livro se conecta ao
              grande projeto de Deus:
            </Text>

            <View style={styles.bulletPoint}>
              <Text style={styles.textData}>
                • <Text style={styles.bold}>No Antigo Testamento:</Text> Vemos a necessidade da salvação (a Queda), a promessa
                de um Salvador e a preparação do cenário através de Israel.
              </Text>
            </View>
            <View style={styles.bulletPoint}>
              <Text style={styles.textData}>
                • <Text style={styles.bold}>No Novo Testamento:</Text> Vemos a concretização da salvação em Cristo e a
                consumação gloriosa na eternidade.
              </Text>
            </View>

            <Text style={styles.paragraph}>
              Nosso desejo é que, ao final da jornada, você não tenha apenas lido a Bíblia toda, mas compreenda profundamente
              a mente de Deus e o Seu amor redentor por você.
            </Text>

            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Como Funciona na Prática</Text>
              {"\n"}• <Text style={styles.bold}>Ritmo Sustentável:</Text> A quantidade de leitura diária foi pensada para ser
              profunda, mas perfeitamente possível de realizar em meio à correria do dia a dia.
              {"\n"}• <Text style={styles.bold}>O Valor da Pausa (Domingos):</Text> Reservamos seus domingos para "Meditar".
              Acreditamos que não basta ler; é preciso ruminar a Palavra. Use esse dia para orar sobre o que leu na semana e
              deixar as verdades sobre a salvação criarem raízes em seu coração.
            </Text>

            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Nossos Pilares</Text>
              {"\n"}1. <Text style={styles.bold}>Constância:</Text> A fidelidade no pouco gera autoridade no muito.
              {"\n"}2. <Text style={styles.bold}>Entendimento:</Text> Capacitar você a enxergar Jesus em toda a Escritura.
              {"\n"}3. <Text style={styles.bold}>Transformação:</Text> Não queremos apenas informar sua mente, mas impactar
              seu espírito.
            </Text>

            <Text style={styles.paragraph}>
              <Text style={styles.bold}>Uma Nota Pessoal</Text>
              {"\n"}
              Este aplicativo foi desenvolvido com muita oração. O código é apenas o meio; o fim é a glória de Deus e o seu
              crescimento no conhecimento da Verdade. Não importa se você é um novo convertido ou um teólogo experiente — a
              mensagem da Cruz é inesgotável.
            </Text>

            <Text style={styles.paragraph}>Que este app seja a ferramenta que faltava para você mergulhar nas águas profundas do amor de Deus.</Text>

            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>
                "E a vida eterna é esta: que te conheçam, a ti só, por único Deus verdadeiro, e a Jesus Cristo, a quem enviaste."
              </Text>
              <Text style={styles.quoteRef}>(João 17:3)</Text>
            </View>

            <Text style={styles.footerText}>
              © {new Date().getFullYear()} {APP_INFO.name}
            </Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  page: {
    paddingTop: 10,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },

  header: {
    alignItems: "center",
    marginBottom: 14,
    marginTop: 6,
  },
  hTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.primary,
  },
  hSub: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },

  dangerCard: {
    borderColor: "rgba(211,47,47,0.25)",
    backgroundColor: "#fff",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 12,
    lineHeight: 18,
  },

  // ✅ Notif extras
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 2,
  },
  pillMini: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  pillMiniText: {
    fontSize: 11,
    fontWeight: "900",
    color: colors.text,
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: colors.text,
  },
  toggleHint: {
    marginTop: 4,
    fontSize: 12,
    color: colors.muted,
    lineHeight: 16,
  },
  togglePill: {
    minWidth: 94,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  toggleOn: {
    backgroundColor: "rgba(4,206,146,0.12)",
    borderColor: "rgba(4,206,146,0.25)",
  },
  toggleOff: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderColor: "rgba(0,0,0,0.10)",
  },
  togglePillText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.text,
  },

  timeInput: {
    backgroundColor: "#f6f7f8",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: 14,
    padding: 12,
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.6,
    textAlign: "center",
  },

  quickTimeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  chipActive: {
    backgroundColor: "rgba(4,206,146,0.12)",
    borderColor: "rgba(4,206,146,0.25)",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.text,
  },
  chipTextActive: {
    color: colors.primary,
  },

  modeRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  modeBtn: {
    flexGrow: 1,
    flexBasis: "30%",
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    alignItems: "center",
  },
  modeBtnActive: {
    backgroundColor: "rgba(4,206,146,0.12)",
    borderColor: "rgba(4,206,146,0.25)",
  },
  modeBtnText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.text,
  },
  modeBtnTextActive: {
    color: colors.primary,
  },

  infoBox: {
    backgroundColor: "rgba(0,0,0,0.04)",
    padding: 10,
    borderRadius: 14,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  infoText: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
    marginVertical: 14,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  textInput: {
    backgroundColor: "#f6f7f8",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: 14,
    padding: 12,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 10,
    color: colors.text,
    fontSize: 12,
  },

  codeBlock: {
    backgroundColor: "#f6f7f8",
    padding: 12,
    borderRadius: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },
  codeTitle: {
    fontSize: 11,
    color: colors.muted,
    marginBottom: 6,
    fontWeight: "800",
  },
  codeText: {
    fontSize: 10,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
    color: colors.text,
    lineHeight: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  btnPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDanger: {
    backgroundColor: "#D32F2F",
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  btnSecondary: {
    backgroundColor: "rgba(0,0,0,0.06)",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    marginBottom: 10,
  },
  btnSecondaryText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  btnOutline: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
    marginBottom: 10,
  },
  btnOutlineText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0.2,
    textAlign: "center",
    paddingHorizontal: 10,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  menuItemText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "800",
  },
  menuItemArrow: {
    fontSize: 20,
    color: "rgba(0,0,0,0.35)",
    fontWeight: "900",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
  },

  paragraph: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletPoint: {
    marginBottom: 8,
    paddingLeft: 6,
  },
  textData: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "900",
  },
  italic: {
    fontStyle: "italic",
  },

  quoteBox: {
    backgroundColor: "rgba(4,206,146,0.10)",
    padding: 14,
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(4,206,146,0.20)",
  },
  quoteText: {
    fontStyle: "italic",
    color: colors.text,
    fontSize: 13,
    marginBottom: 6,
    lineHeight: 20,
  },
  quoteRef: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "right",
  },
  footerText: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "700",
  },
});
