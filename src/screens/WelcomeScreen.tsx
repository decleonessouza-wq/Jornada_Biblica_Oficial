import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import type { RootStackParamList } from "../app_router_off";
import AppFooter from "../components/AppFooter";

type Nav = NativeStackNavigationProp<RootStackParamList, "Welcome">;

const USER_NAME_KEY = "userName";
const HAS_ONBOARDED_KEY = "hasOnboarded";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function WelcomeScreen() {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const maxWidth = clamp(width, 360, 520);

  const [name, setName] = useState("");
  const cleaned = useMemo(() => name.trim(), [name]);
  const canStart = cleaned.length >= 2;

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(USER_NAME_KEY);
        if (saved) setName(saved);
      } catch {
        // ignore
      }
    })();
  }, []);

  async function onStart() {
    if (!canStart) {
      Alert.alert("Seu nome", "Digite seu nome para continuar.");
      return;
    }

    try {
      await AsyncStorage.setItem(USER_NAME_KEY, cleaned);
      await AsyncStorage.setItem(HAS_ONBOARDED_KEY, "1");
    } catch {
      Alert.alert("Erro", "Não foi possível salvar seu nome.");
      return;
    }

    navigation.replace("Dedication");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={stylesTokens.bg} />

      {/* Glow decorativo suave */}
      <View pointerEvents="none" style={styles.glowTopLeft} />
      <View pointerEvents="none" style={styles.glowMidRight} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centerContainer}>
            <View style={[styles.stack, { width: "100%", maxWidth }]}>
              {/* HERO */}
              <View style={styles.hero}>
                <View style={styles.logoBadge}>
                  <Image
                    source={require("../../assets/icon.png")}
                    style={styles.logo}
                  />
                </View>

                <Text style={styles.title}>Jornada Bíblica</Text>
                <Text style={styles.subtitle}>
                  Um plano anual, simples e constante — para fortalecer sua fé dia após dia.
                </Text>

                <View style={styles.heroQuoteBox}>
                  <Text style={styles.heroQuoteText}>
                    “A tua palavra é lâmpada para os meus pés e luz para o meu caminho.”
                  </Text>
                  <Text style={styles.heroQuoteRef}>Salmos 119:105</Text>
                </View>
              </View>

              {/* CARD */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Bem-vindo</Text>
                <Text style={styles.cardSubtitle}>
                  Como você gostaria de ser chamado?
                </Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Seu nome</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Ex: João Silva"
                    placeholderTextColor="#9aa0a6"
                    autoCapitalize="words"
                    returnKeyType="done"
                    onSubmitEditing={onStart}
                    style={styles.input}
                  />
                  <Text style={styles.inputHint}>
                    Isso fica salvo apenas no seu celular.
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={onStart}
                  activeOpacity={0.9}
                  style={[styles.button, !canStart && styles.buttonDisabled]}
                  disabled={!canStart}
                >
                  <Text style={styles.buttonText}>Começar Jornada ➝</Text>
                </TouchableOpacity>

                {!canStart && (
                  <Text style={styles.helper}>
                    Digite pelo menos 2 letras para continuar.
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footerContainer}>
        <AppFooter />
      </View>
    </View>
  );
}

const stylesTokens = {
  bg: "#F4F6F8",
  card: "#FFFFFF",
  border: "rgba(0,0,0,0.06)",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: stylesTokens.bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 18,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  stack: {
    gap: 14,
    alignSelf: "center",
  },

  // glows
  glowTopLeft: {
    position: "absolute",
    top: -150,
    left: -140,
    width: 340,
    height: 340,
    borderRadius: 999,
    backgroundColor: "rgba(4,206,146,0.12)",
  },
  glowMidRight: {
    position: "absolute",
    top: 180,
    right: -160,
    width: 380,
    height: 380,
    borderRadius: 999,
    backgroundColor: "rgba(218,165,32,0.10)",
  },

  hero: {
    alignItems: "center",
  },
  logoBadge: {
    width: 104,
    height: 104,
    borderRadius: 28,
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: stylesTokens.border,

    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  logo: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
  },
  title: {
    marginTop: 14,
    fontSize: 30,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  heroQuoteBox: {
    marginTop: 14,
    width: "100%",
    backgroundColor: "rgba(4,206,146,0.08)",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(4,206,146,0.14)",
  },
  heroQuoteText: {
    fontSize: 13,
    color: colors.text,
    textAlign: "center",
    lineHeight: 18,
    fontStyle: "italic",
  },
  heroQuoteRef: {
    marginTop: 6,
    fontSize: 12,
    color: colors.primary,
    textAlign: "center",
    fontWeight: "900",
  },

  card: {
    backgroundColor: stylesTokens.card,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: stylesTokens.border,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    textAlign: "center",
  },
  cardSubtitle: {
    marginTop: 6,
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 14,
  },

  inputContainer: {
    width: "100%",
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#F7F8FA",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
    color: colors.text,
  },
  inputHint: {
    marginTop: 8,
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
  },

  button: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.2,
  },

  helper: {
    marginTop: 10,
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
  },

  footerContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
});
