import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { APP_INFO } from "../constants/appInfo";
import { colors } from "../theme/colors";

type HeaderActionButtonProps = {
  accessibilityLabel: string;
  glyph: string;
  onPress: () => void;
};

function HeaderActionButton({
  accessibilityLabel,
  glyph,
  onPress,
}: HeaderActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.actionButtonPressed,
      ]}
    >
      <Text style={styles.actionGlyph}>{glyph}</Text>
    </Pressable>
  );
}

export function AppHeaderMenuButton({ onPress }: { onPress: () => void }) {
  return (
    <HeaderActionButton
      accessibilityLabel="Abrir menu"
      glyph="☰"
      onPress={onPress}
    />
  );
}

export function AppHeaderBrand() {
  return (
    <View
      accessible={false}
      style={styles.brand}
    >
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={require("../../assets/branding/biblia-jornada-simbolo.png")}
        style={styles.brandSymbol}
      />

      <Text
        numberOfLines={1}
        style={styles.brandName}
      >
        {APP_INFO.name}
      </Text>
    </View>
  );
}

export function AppHeaderNotificationButton({
  onPress,
}: {
  onPress: () => void;
}) {
  return (
    <HeaderActionButton
      accessibilityLabel="Abrir configurações de notificações"
      glyph="🔔"
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  actionButtonPressed: {
    backgroundColor: colors.primarySoft,
  },
  actionGlyph: {
    color: colors.primary,
    fontSize: 23,
    fontWeight: "700",
    lineHeight: 26,
    textAlign: "center",
  },
  brand: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: 220,
  },
  brandSymbol: {
    height: 30,
    marginRight: 8,
    width: 30,
  },
  brandName: {
    color: colors.primary,
    flexShrink: 1,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.1,
  },
});
