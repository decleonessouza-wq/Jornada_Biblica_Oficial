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
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import type { RootStackParamList } from "../app_router_off";
import AppFooter from "../components/AppFooter";

type Nav = NativeStackNavigationProp<RootStackParamList, "Welcome">;

const USER_NAME_KEY = "userName";
const HAS_ONBOARDED_KEY = "hasOnboarded";

export default function WelcomeScreen() {
  const navigation = useNavigation<Nav>();

  const [name, setName] = useState("");

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
    const cleaned = name.trim();

    if (cleaned.length < 2) {
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
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.centerContainer}>
            
            {/* CARD DE BOAS-VINDAS */}
            <View style={styles.card}>
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/icon.png")}
                  style={styles.logo}
                />
              </View>

              <Text style={styles.title}>Jornada Bíblica</Text>

              <Text style={styles.subtitle}>
                Bem-vindo! Informe seu nome para personalizar sua experiência.
              </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Como podemos te chamar?</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Ex: João Silva"
                  placeholderTextColor={colors.muted}
                  autoCapitalize="words"
                  style={styles.input}
                />
              </View>

              <TouchableOpacity
                onPress={onStart}
                activeOpacity={0.8}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Começar Jornada ➝</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer fixo ou no final */}
      <View style={styles.footerContainer}>
        <AppFooter />
      </View>
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
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 24,
    padding: 24,
    paddingTop: 32,
    alignItems: "center",
    // Sombras
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  logoContainer: {
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
});