import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { colors } from "../theme/colors";
import { RootStackParamList } from "../app_router_off";
import AppFooter from "../components/AppFooter";

const USER_NAME_KEY = "userName";

type Nav = NativeStackNavigationProp<RootStackParamList, "Dedication">;

export default function DedicationScreen() {
  const navigation = useNavigation<Nav>();
  const [name, setName] = useState<string>("");

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
    navigation.replace("Home");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Título de Boas-vindas */}
        <Text style={styles.headerTitle}>
          {name ? `Bem-vindo, ${name}.` : "Bem-vindo."}
        </Text>

        {/* CARD TIPO "CARTA" */}
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Bem-vindo à jornada mais importante da sua vida.
          </Text>

          <Text style={styles.paragraph}>
            Ao iniciar este plano, você não está apenas abrindo um aplicativo;
            está abrindo uma janela para a eternidade. Diante de você não está
            apenas um cronograma de leitura, mas um convite diário para
            sentar-se aos pés dAquele que te criou.
          </Text>

          <Text style={styles.paragraph}>
            A Bíblia não nos foi dada apenas para aumentar nosso conhecimento,
            mas para transformar nossa essência. Ao percorrermos juntos a
            história da Redenção — da Queda no Gênesis à Glória no Apocalipse —
            lembre-se: o objetivo não é apenas terminar o livro, mas deixar que
            o Autor do livro termine a obra dEle em você.
          </Text>

          <Text style={styles.paragraph}>
            Nos dias fáceis, que a Palavra seja o seu louvor. Nos dias difíceis,
            que ela seja o seu refúgio. E em todos os dias, que ela seja o pão
            que sustenta a sua alma.
          </Text>

          <Text style={styles.paragraph}>
            Não busque apenas cumprir uma meta. Busque uma Pessoa. Jesus está em
            cada página, esperando por você.
          </Text>

          <Text style={styles.paragraphBold}>
            Boa leitura e profunda comunhão.
          </Text>

          {/* Citação Bíblica Destacada */}
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              "Pois a palavra de Deus é viva e eficaz, e mais afiada que
              qualquer espada de dois gumes; ela penetra até o ponto de dividir
              alma e espírito, juntas e medulas, e julga os pensamentos e as
              intenções do coração."
            </Text>
            <Text style={styles.quoteRef}>— Hebreus 4:12</Text>
          </View>

          {/* Citação Final */}
          <Text style={styles.finalQuote}>
            “Conhecer a Escritura é o caminho. Conhecer o Autor é o destino”.
          </Text>

          {/* Assinatura */}
          <Text style={styles.signature}>Decleones Andrade</Text>
        </View>

        {/* Botão Continuar */}
        <TouchableOpacity
          onPress={goHome}
          activeOpacity={0.8}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <AppFooter />
        </View>
        
        <View style={{ height: 20 }} />
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
    padding: 24,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    // Sombras
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  paragraph: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
    textAlign: "justify",
  },
  paragraphBold: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  quoteBox: {
    backgroundColor: "#FFF9F0",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    marginBottom: 20,
  },
  quoteText: {
    fontStyle: "italic",
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  quoteRef: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "right",
  },
  finalQuote: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "500",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  signature: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
    textAlign: "right",
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.primary,
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
    fontSize: 18,
  },
});