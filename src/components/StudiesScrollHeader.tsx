import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppShellChrome } from "../navigation/AppShellChromeContext";
import { colors } from "../theme/colors";

const HEADER_ROW_HEIGHT = 56;

type StudiesScrollHeaderProps = Readonly<{
  title: string;
  onBack: () => void;
  testID: string;
}>;

export default function StudiesScrollHeader({
  title,
  onBack,
  testID,
}: StudiesScrollHeaderProps) {
  const insets = useSafeAreaInsets();
  const { chromeProgress } = useAppShellChrome();

  const shellAnimatedStyle = useAnimatedStyle(() => ({
    height:
      insets.top +
      HEADER_ROW_HEIGHT * (1 - chromeProgress.value),
  }));

  const rowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - chromeProgress.value,
    transform: [
      {
        translateY: -HEADER_ROW_HEIGHT * chromeProgress.value,
      },
    ],
  }));

  return (
    <Animated.View
      style={[styles.shell, shellAnimatedStyle]}
      testID={testID}
    >
      <View style={{ height: insets.top }} />

      <Animated.View style={[styles.row, rowAnimatedStyle]}>
        <View style={styles.side}>
          <Pressable
            accessibilityLabel="Voltar"
            accessibilityRole="button"
            hitSlop={10}
            onPress={onBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
            testID={`${testID}-back`}
          >
            <Text style={styles.backSymbol}>‹</Text>
          </Pressable>
        </View>

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <View style={styles.side} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  row: {
    alignItems: "center",
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    height: HEADER_ROW_HEIGHT,
    paddingHorizontal: 4,
  },
  side: {
    alignItems: "center",
    justifyContent: "center",
    width: 52,
  },
  backButton: {
    alignItems: "center",
    borderRadius: 999,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  backButtonPressed: {
    backgroundColor: colors.surfaceAlt,
  },
  backSymbol: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: "300",
    lineHeight: 42,
    marginTop: -3,
  },
  title: {
    color: colors.textStrong,
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
});