import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

export default function AppDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.logoCard}>
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="contain"
            source={require("../../assets/branding/biblia-jornada-logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.tagline}>Sua jornada diária pela Palavra.</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.items}>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.footer}>
        <View style={styles.verseCard}>
          <Text style={styles.verseEyebrow}>PALAVRA PARA A JORNADA</Text>

          <Text accessible={false} style={styles.quoteMark}>
            “
          </Text>

          <Text style={styles.verseText}>
            Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.
          </Text>
          <Text accessible={false} style={styles.quoteMark}>
            ”
          </Text>
          <Text style={styles.verseReference}>Salmos 119:105</Text>
        </View>

        <Text style={styles.footerMotto}>Ad Maiorem Dei Gloriam</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    flexGrow: 1,
    paddingTop: 0,
  },

  header: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    marginTop: -8,
    paddingBottom: 22,
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  logoCard: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderColor: colors.secondarySoft,
    borderRadius: 20,
    borderWidth: 1,
    maxWidth: "86%",
    minWidth: 20,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },

  logo: {
    height: 120,
    width: 200,
  },

  tagline: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 12,
    opacity: 0.96,
    textAlign: "center",
  },

  divider: {
    backgroundColor: colors.divider,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
    marginTop: 14,
  },

  items: {
    paddingTop: 10,
  },

  footer: {
    marginTop: "auto",
    paddingBottom: 24,
    paddingHorizontal: 18,
    paddingTop: 24,
  },

  verseCard: {
    backgroundColor: colors.surfaceHighlight,
    borderColor: colors.secondarySoft,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  verseEyebrow: {
    color: colors.secondaryPressed,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.1,
  },

  quoteMark: {
    color: colors.secondary,
    fontSize: 38,
    fontWeight: "800",
    height: 24,
    lineHeight: 42,
    marginTop: 4,
  },

  verseText: {
    color: colors.textStrong,
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "500",
    lineHeight: 21,
    marginTop: 2,
  },

  verseReference: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 12,
  },

  footerMotto: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginTop: 14,
    textAlign: "center",
  },
});