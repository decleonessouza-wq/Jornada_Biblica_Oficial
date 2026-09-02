import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../../theme/colors";

export default function HymnalLibraryScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>HARPA CRISTÃ</Text>
        <Text accessibilityRole="header" style={styles.title}>
          Biblioteca de hinos
        </Text>
        <Text style={styles.description}>
          A infraestrutura offline da Harpa está conectada ao Jornada Bíblica.
        </Text>
      </View>

      <View
        accessible
        accessibilityLabel="Status da biblioteca da Harpa"
        style={styles.statusCard}
      >
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusTitle}>Navegação ativada</Text>
        </View>

        <Text style={styles.statusText}>
          A lista de hinos, a busca e o leitor serão apresentados nesta área.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 26,
  },
  eyebrow: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  title: {
    color: colors.textInverse,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    marginTop: 8,
  },
  description: {
    color: colors.textInverse,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    opacity: 0.86,
  },
  statusCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 18,
    padding: 18,
  },
  statusRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  statusDot: {
    backgroundColor: colors.success,
    borderRadius: 5,
    height: 10,
    marginRight: 9,
    width: 10,
  },
  statusTitle: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "700",
  },
  statusText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
  },
});
