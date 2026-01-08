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
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import { restoreFromAutoBackup } from "../services/backupRestore";
import { APP_INFO } from "../constants/appInfo";
import type { RootStackParamList } from "../app_router_off";

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
const AUTO_RESTORE_DONE_KEY = "autoRestoreDone";
const USER_NAME_KEY = "userName";
const HAS_ONBOARDED_KEY = "hasOnboarded";
const GRATITUDE_KEY = "gratitudeByDate";

// --- HELPERS (Lógica preservada) ---
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

export default function SettingsScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [exportJson, setExportJson] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [lastBackupAt, setLastBackupAt] = useState<string | null>(null);

  useEffect(() => {
    loadLastBackupInfo();
  }, []);

  async function loadLastBackupInfo() {
    try {
      const last = await AsyncStorage.getItem(LAST_BACKUP_KEY);
      setLastBackupAt(last || null);
    } catch {
      setLastBackupAt(null);
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
        throw new Error("Formato inválido");
      }

      const validDates = uniqueSortedIsoDates(rawList);

      await AsyncStorage.setItem("completedDays", JSON.stringify(validDates));

      const gratitudeByDate = sanitizeGratitudeMap(parsed?.gratitudeByDate);
      await AsyncStorage.setItem(GRATITUDE_KEY, JSON.stringify(gratitudeByDate));

      if (typeof parsed?.userName === "string") {
        const name = parsed.userName.trim();
        if (name) await AsyncStorage.setItem(USER_NAME_KEY, name);
      }
      if (typeof parsed?.hasOnboarded === "boolean") {
        await AsyncStorage.setItem(HAS_ONBOARDED_KEY, parsed.hasOnboarded ? "1" : "0");
      }

      await AsyncStorage.setItem(AUTO_RESTORE_DONE_KEY, "1");

      setImportText("");
      Alert.alert(
        "Sucesso",
        `${validDates.length} leituras restauradas 🙏\nGratidões: ${Object.keys(gratitudeByDate).length}`
      );
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
        Alert.alert(
          "Nada para restaurar",
          "Nenhum backup automático válido foi encontrado."
        );
        return;
      }

      await AsyncStorage.setItem(AUTO_RESTORE_DONE_KEY, "1");

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
      await AsyncStorage.removeItem("completedDays");
      await AsyncStorage.removeItem(AUTO_RESTORE_DONE_KEY);
      await AsyncStorage.removeItem(GRATITUDE_KEY);

      setExportJson(null);
      setImportText("");

      Alert.alert("Pronto", "Seu progresso foi resetado.");
      await loadLastBackupInfo();
    } catch (err) {
      console.log("Erro ao resetar progresso", err);
      Alert.alert("Erro", "Não foi possível resetar o progresso.");
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
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <Text style={styles.screenTitle}>Configurações</Text>
          <Text style={styles.screenSubtitle}>
            {APP_INFO.name} • v{APP_INFO.version}
          </Text>
        </View>

        {/* 1. PERFIL */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>👤 Perfil</Text>
          <Text style={styles.cardDesc}>Gerencie suas informações.</Text>
          
          <TouchableOpacity style={styles.buttonOutline} onPress={replayWelcome}>
            <Text style={styles.buttonOutlineText}>🔁 Rever Boas-vindas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buttonOutline} onPress={openDedication}>
            <Text style={styles.buttonOutlineText}>📜 Ver Dedicatória</Text>
          </TouchableOpacity>
        </View>

        {/* 2. DADOS & BACKUP */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💾 Dados & Backup</Text>
          
          {/* Info Backup Auto */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>📦 Último Backup Auto: {lastBackupLabel}</Text>
          </View>
          <TouchableOpacity style={styles.buttonSecondary} onPress={restoreAutoBackupNow}>
             <Text style={styles.buttonSecondaryText}>♻️ Restaurar Backup Automático</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Exportar */}
          <Text style={styles.sectionLabel}>Backup Manual (Texto)</Text>
          <TouchableOpacity style={styles.buttonPrimary} onPress={exportAsText}>
             <Text style={styles.buttonPrimaryText}>📋 Gerar Código de Backup</Text>
          </TouchableOpacity>

          {exportJson && (
            <View style={styles.codeBlock}>
               <Text style={styles.codeTitle}>Copie o código abaixo:</Text>
               <Text selectable style={styles.codeText}>{exportJson}</Text>
            </View>
          )}

          <View style={styles.divider} />

          {/* Importar */}
          <Text style={styles.sectionLabel}>Importar Dados</Text>
          <TextInput
            value={importText}
            onChangeText={setImportText}
            multiline
            placeholder="Cole o código JSON aqui..."
            placeholderTextColor="#999"
            style={styles.textInput}
          />
          
          <View style={styles.rowButtons}>
            <TouchableOpacity style={[styles.buttonPrimary, { flex: 1, marginRight: 8, marginBottom: 0 }]} onPress={importProgress}>
                <Text style={styles.buttonPrimaryText}>📥 Importar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.buttonOutline, { flex: 1, marginBottom: 0 }]} onPress={clearImportBox}>
                <Text style={styles.buttonOutlineText}>🧽 Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. ZONA DE PERIGO */}
        <View style={[styles.card, styles.dangerCard]}>
           <Text style={[styles.cardTitle, { color: "#D32F2F" }]}>⚠️ Zona de Perigo</Text>
           <Text style={styles.cardDesc}>
              Apagar todo o progresso, gratidões e configurações do aplicativo. Ação irreversível.
           </Text>
           <TouchableOpacity style={styles.buttonDanger} onPress={confirmReset}>
              <Text style={styles.buttonDangerText}>🧹 Resetar Tudo</Text>
           </TouchableOpacity>
        </View>

        {/* 4. LEGAL */}
        <View style={styles.card}>
           <Text style={styles.cardTitle}>⚖️ Legal</Text>
           
           <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Terms")}>
              <Text style={styles.menuItemText}>📄 Termos de Uso</Text>
              <Text style={styles.menuItemArrow}>›</Text>
           </TouchableOpacity>
           
           <View style={{ height: 1, backgroundColor: "#EEE" }} />
           
           <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Privacy")}>
              <Text style={styles.menuItemText}>🔒 Política de Privacidade</Text>
              <Text style={styles.menuItemArrow}>›</Text>
           </TouchableOpacity>
        </View>

        {/* 5. SOBRE (Texto Integral) */}
        <View style={styles.card}>
           <Text style={styles.cardTitle}>💙 Sobre o App</Text>
           
           <View style={styles.aboutContent}>
              <Text style={styles.paragraph}>
                 <Text style={styles.bold}>Nossa Missão</Text>{"\n"}
                 Em um mundo de distrações constantes, sabemos que manter a disciplina espiritual é um desafio real. Muitas vezes, o desejo de ler a Bíblia existe, mas falta a organização ou o incentivo para continuar quando a rotina aperta.
              </Text>
              
              <Text style={styles.paragraph}>
                 O {APP_INFO.name} nasceu com um objetivo claro: ser mais do que uma ferramenta digital; queremos ser um parceiro na sua caminhada de fé. Nossa missão é transformar a <Text style={styles.italic}>intenção</Text> de ler a Bíblia em <Text style={styles.italic}>hábito</Text>, e o hábito em <Text style={styles.italic}>intimidade</Text>.
              </Text>

              <Text style={styles.paragraph}>
                 <Text style={styles.bold}>O Foco do Plano: A Grande História da Redenção</Text>{"\n"}
                 Este não é apenas um cronograma de leitura sequencial. Todo o plano foi cuidadosamente estruturado ao redor do tema central das Escrituras: o <Text style={styles.bold}>Plano Eterno de Salvação do Homem</Text>.
              </Text>

              <Text style={styles.paragraph}>
                 Ao seguir nosso roteiro, você não lerá apenas histórias isoladas, mas entenderá como cada livro se conecta ao grande projeto de Deus:
              </Text>

              <View style={styles.bulletPoint}>
                 <Text style={styles.textData}>• <Text style={styles.bold}>No Antigo Testamento:</Text> Vemos a necessidade da salvação (a Queda), a promessa de um Salvador e a preparação do cenário através de Israel.</Text>
              </View>
              <View style={styles.bulletPoint}>
                 <Text style={styles.textData}>• <Text style={styles.bold}>No Novo Testamento:</Text> Vemos a concretização da salvação em Cristo e a consumação gloriosa na eternidade.</Text>
              </View>

              <Text style={styles.paragraph}>
                 Nosso desejo é que, ao final da jornada, você não tenha apenas lido a Bíblia toda, mas compreenda profundamente a mente de Deus e o Seu amor redentor por você.
              </Text>

              <Text style={styles.paragraph}>
                 <Text style={styles.bold}>Como Funciona na Prática</Text>{"\n"}
                 • <Text style={styles.bold}>Ritmo Sustentável:</Text> A quantidade de leitura diária foi pensada para ser profunda, mas perfeitamente possível de realizar em meio à correria do dia a dia.{"\n"}
                 • <Text style={styles.bold}>O Valor da Pausa (Domingos):</Text> Reservamos seus domingos para "Meditar". Acreditamos que não basta ler; é preciso ruminar a Palavra. Use esse dia para orar sobre o que leu na semana e deixar as verdades sobre a salvação criarem raízes em seu coração.
              </Text>

              <Text style={styles.paragraph}>
                 <Text style={styles.bold}>Nossos Pilares</Text>{"\n"}
                 1. <Text style={styles.bold}>Constância:</Text> A fidelidade no pouco gera autoridade no muito.{"\n"}
                 2. <Text style={styles.bold}>Entendimento:</Text> Capacitar você a enxergar Jesus em toda a Escritura.{"\n"}
                 3. <Text style={styles.bold}>Transformação:</Text> Não queremos apenas informar sua mente, mas impactar seu espírito.
              </Text>

              <Text style={styles.paragraph}>
                 <Text style={styles.bold}>Uma Nota Pessoal</Text>{"\n"}
                 Este aplicativo foi desenvolvido com muita oração. O código é apenas o meio; o fim é a glória de Deus e o seu crescimento no conhecimento da Verdade. Não importa se você é um novo convertido ou um teólogo experiente — a mensagem da Cruz é inesgotável.
              </Text>

              <Text style={styles.paragraph}>
                 Que este app seja a ferramenta que faltava para você mergulhar nas águas profundas do amor de Deus.
              </Text>

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

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

// === ESTILOS MODERNOS ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 10,
  },
  // Header
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
  screenSubtitle: {
    fontSize: 14,
    color: colors.muted,
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
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 12,
  },
  // Buttons Customizados
  buttonPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
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
    marginBottom: 10,
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
    marginBottom: 10,
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
  rowButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  // Inputs & Helpers
  infoBox: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  infoText: {
    fontSize: 12,
    color: colors.muted,
  },
  textInput: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 10,
    color: colors.text,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  codeBlock: {
    backgroundColor: "#F4F6F8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
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
  // Menu Items (Legal)
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16, // Mais área de toque
  },
  menuItemText: {
    fontSize: 15,
    color: colors.text,
  },
  menuItemArrow: {
    fontSize: 18,
    color: "#CCC",
    fontWeight: "bold",
  },
  // About Content Formatting
  aboutContent: {
    marginTop: 6,
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
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  quoteBox: {
    backgroundColor: "#FFF9F0",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary, // ou use hex: "#F57C00"
  },
  quoteText: {
    fontStyle: "italic",
    color: colors.text,
    fontSize: 13,
    marginBottom: 4,
    lineHeight: 20,
  },
  quoteRef: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.primary, // ou use hex: "#F57C00"
    textAlign: "right",
  },
  footerText: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    marginTop: 10,
  },
});