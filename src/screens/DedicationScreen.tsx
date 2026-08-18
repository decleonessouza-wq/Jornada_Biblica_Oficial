import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import type { RootStackParamList } from "../navigation/types";
import AppFooter from "../components/AppFooter";

const USER_NAME_KEY = "userName";

type Nav = NativeStackNavigationProp<RootStackParamList, "Dedication">;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function shadowCard() {
  return Platform.select({
    android: { elevation: 3 },
    ios: {
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
    },
    default: {},
  }) as any;
}

export default function DedicationScreen() {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const maxWidth = clamp(width, 360, 820);

  const [name, setName] = useState<string>("");

  const title = useMemo(() => {
    return name ? `Bem-vindo, ${name}.` : "Bem-vindo.";
  }, [name]);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(USER_NAME_KEY);
        setName(stored ? stored : "");
      } catch {
        setName("");
      }
    })();
  }, []);

  function goHome() {
    navigation.replace("AppShell", {
      screen: "MainTabs",
      params: {
        screen: "HomeTab",
      },
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={stylesTokens.bg} />

      {/* Glow decorativo suave */}
      <View pointerEvents="none" style={styles.glowTopLeft} />
      <View pointerEvents="none" style={styles.glowMidRight} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: width >= 700 ? 24 : 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentWrap, { maxWidth, alignSelf: "center" }]}>
          {/* HERO */}
          <View style={[styles.hero, shadowCard()]}>
            <Text style={styles.headerTitle}>{title}</Text>
            <Text style={styles.heroSub}>
              Antes de começar, uma dedicatória pastoral para orientar seu coração.
            </Text>
          </View>

          {/* CARTA */}
          <View style={[styles.card, shadowCard()]}>
            <View style={styles.letterTopRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✉️ Dedicatória</Text>
              </View>

              <View style={styles.badgeSoft}>
                <Text style={styles.badgeSoftText}>📘 Plano Anual</Text>
              </View>
            </View>

            <Text style={styles.paragraph}>
              Bem-vindo à jornada mais importante da sua vida.
            </Text>

            <Text style={styles.paragraph}>
              Ao iniciar este plano, você não está apenas abrindo um aplicativo; está abrindo uma
              janela para a eternidade. Diante de você não está apenas um cronograma de leitura,
              mas um convite diário para sentar-se aos pés dAquele que te criou.
            </Text>

            <Text style={styles.paragraph}>
              A Bíblia não nos foi dada apenas para aumentar nosso conhecimento, mas para
              transformar nossa essência. Ao percorrermos juntos a história da Redenção — da Queda
              no Gênesis à Glória no Apocalipse — lembre-se: o objetivo não é apenas terminar o
              livro, mas deixar que o Autor do livro termine a obra dEle em você.
            </Text>

            <Text style={styles.paragraph}>
              Nos dias fáceis, que a Palavra seja o seu louvor. Nos dias difíceis, que ela seja o
              seu refúgio. E em todos os dias, que ela seja o pão que sustenta a sua alma.
            </Text>

            <Text style={styles.paragraph}>
              Não busque apenas cumprir uma meta. Busque uma Pessoa. Jesus está em cada página,
              esperando por você.
            </Text>

            <Text style={styles.paragraphBold}>Boa leitura e profunda comunhão.</Text>

            {/* CITAÇÃO */}
            <View style={styles.quoteBox}>
              <Text style={styles.quoteTitle}>📖 Verso-chave</Text>
              <Text style={styles.quoteText}>
                "Pois a palavra de Deus é viva e eficaz, e mais afiada que qualquer espada de dois
                gumes; ela penetra até o ponto de dividir alma e espírito, juntas e medulas, e
                julga os pensamentos e as intenções do coração."
              </Text>
              <Text style={styles.quoteRef}>— Hebreus 4:12</Text>
            </View>

            {/* CITAÇÃO FINAL */}
            <View style={styles.finalQuoteBox}>
              <Text style={styles.finalQuote}>
                “Conhecer a Escritura é o caminho. Conhecer o Autor é o destino”.
              </Text>
            </View>

            {/* ASSINATURA */}
            <Text style={styles.signature}>Decleones Andrade</Text>
          </View>

          {/* CTA */}
          <TouchableOpacity onPress={goHome} activeOpacity={0.9} style={styles.button}>
            <Text style={styles.buttonText}>Continuar ➝</Text>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <AppFooter />
          </View>

          <View style={{ height: 22 }} />
        </View>
      </ScrollView>
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
    paddingTop: 22,
    paddingBottom: 18,
  },
  contentWrap: {
    width: "100%",
    gap: 12,
  },

  // glows
  glowTopLeft: {
    position: "absolute",
    top: -160,
    left: -150,
    width: 360,
    height: 360,
    borderRadius: 999,
    backgroundColor: "rgba(4,206,146,0.12)",
  },
  glowMidRight: {
    position: "absolute",
    top: 220,
    right: -170,
    width: 420,
    height: 420,
    borderRadius: 999,
    backgroundColor: "rgba(218,165,32,0.10)",
  },

  hero: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: stylesTokens.border,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
  },
  heroSub: {
    marginTop: 8,
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
    lineHeight: 18,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: stylesTokens.border,
  },

  letterTopRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(4,206,146,0.10)",
    borderWidth: 1,
    borderColor: "rgba(4,206,146,0.18)",
  },
  badgeText: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 12,
  },
  badgeSoft: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },
  badgeSoftText: {
    color: colors.muted,
    fontWeight: "900",
    fontSize: 12,
  },

  paragraph: {
    fontSize: 14.5,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 14,
    textAlign: "justify",
  },
  paragraphBold: {
    fontSize: 15.5,
    color: colors.primary,
    fontWeight: "900",
    marginTop: 4,
    marginBottom: 14,
    textAlign: "center",
  },

  quoteBox: {
    backgroundColor: "rgba(218,165,32,0.12)",
    padding: 14,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(218,165,32,0.20)",
  },
  quoteTitle: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.secondary,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.2,
  },
  quoteText: {
    fontStyle: "italic",
    color: colors.text,
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 8,
    textAlign: "justify",
  },
  quoteRef: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.secondary,
    textAlign: "right",
  },

  finalQuoteBox: {
    backgroundColor: "rgba(4,206,146,0.08)",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(4,206,146,0.14)",
  },
  finalQuote: {
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "700",
    color: colors.primary,
    textAlign: "center",
    lineHeight: 20,
  },

  signature: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: "900",
    color: colors.text,
    textAlign: "right",
  },

  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 0.2,
  },

  footerContainer: {
    paddingTop: 10,
    alignItems: "center",
  },
});
