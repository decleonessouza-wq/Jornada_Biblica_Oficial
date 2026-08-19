import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../theme/colors";

import { useAppShellChrome } from "./AppShellChromeContext";

const BASE_BAR_HEIGHT = 60;
const QUICK_ACTION_OVERHANG = 10;

type RealTabRouteName = "HomeTab" | "PlanTab";

export type CustomTabBarProps = BottomTabBarProps & {
  onQuickAction: () => void;
};

type RealTabButtonProps = {
  routeName: RealTabRouteName;
  label: string;
  symbol: string;
  state: BottomTabBarProps["state"];
  descriptors: BottomTabBarProps["descriptors"];
  navigation: BottomTabBarProps["navigation"];
};

function RealTabButton({
  routeName,
  label,
  symbol,
  state,
  descriptors,
  navigation,
}: RealTabButtonProps) {
  const routeIndex = state.routes.findIndex((route) => route.name === routeName);
  const route = routeIndex >= 0 ? state.routes[routeIndex] : undefined;

  if (!route) {
    return null;
  }

  const descriptor = descriptors[route.key];
  const isFocused = state.index === routeIndex;

  const handlePress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  const handleLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={descriptor?.options.tabBarAccessibilityLabel ?? label}
      accessibilityState={{ selected: isFocused }}
      testID={descriptor?.options.tabBarButtonTestID}
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={({ pressed }) => [
        styles.tabItem,
        pressed && styles.tabItemPressed,
      ]}
    >
      <Text
        style={[
          styles.tabSymbol,
          isFocused ? styles.tabSymbolActive : styles.tabSymbolInactive,
        ]}
      >
        {symbol}
      </Text>
      <Text
        numberOfLines={1}
        style={[
          styles.tabLabel,
          isFocused ? styles.tabLabelActive : styles.tabLabelInactive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function DisabledTabButton({
  label,
  symbol,
}: {
  label: string;
  symbol: string;
}) {
  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={`${label}. Em breve.`}
      accessibilityState={{ disabled: true }}
      disabled
      style={styles.tabItem}
    >
      <Text style={[styles.tabSymbol, styles.tabSymbolDisabled]}>{symbol}</Text>
      <Text
        numberOfLines={1}
        style={[styles.tabLabel, styles.tabLabelDisabled]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  onQuickAction,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { chromeProgress } = useAppShellChrome();

  const bottomPadding = Math.max(insets.bottom, 8);
  const hiddenHeight = insets.bottom;
  const visibleHeight =
    QUICK_ACTION_OVERHANG + BASE_BAR_HEIGHT + bottomPadding;
  const travelDistance = visibleHeight - hiddenHeight;

  const shellAnimatedStyle = useAnimatedStyle(() => ({
    height:
      hiddenHeight +
      travelDistance * (1 - chromeProgress.value),
    marginTop:
      -QUICK_ACTION_OVERHANG * (1 - chromeProgress.value),
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: visibleHeight * chromeProgress.value,
      },
    ],
  }));

  return (
    <Animated.View style={[styles.animatedShell, shellAnimatedStyle]}>
      <Animated.View
        style={[
          styles.safeArea,
          {
            height: visibleHeight,
            paddingBottom: bottomPadding,
            paddingTop: QUICK_ACTION_OVERHANG,
          },
          contentAnimatedStyle,
        ]}
      >
        <View style={styles.container}>
          <RealTabButton
            routeName="HomeTab"
            label="Início"
            symbol="⌂"
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />

          <DisabledTabButton label="Bíblia" symbol="▤" />

          <View style={styles.quickActionSlot}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Abrir ações rápidas"
              onPress={onQuickAction}
              style={({ pressed }) => [
                styles.quickActionButton,
                pressed && styles.quickActionButtonPressed,
              ]}
            >
              <Text style={styles.quickActionSymbol}>+</Text>
            </Pressable>
          </View>

          <RealTabButton
            routeName="PlanTab"
            label="Plano"
            symbol="≡"
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />

          <DisabledTabButton label="Perfil" symbol="○" />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedShell: {
    backgroundColor: colors.background,
    overflow: "hidden",
  },
  safeArea: {
    backgroundColor: colors.primary,
    borderTopColor: colors.primaryPressed,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  container: {
    alignItems: "flex-end",
    backgroundColor: colors.primary,
    flexDirection: "row",
    minHeight: BASE_BAR_HEIGHT,
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  tabItem: {
    alignItems: "center",
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    minHeight: 42,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  tabItemPressed: {
    backgroundColor: colors.primaryPressed,
  },
  tabSymbol: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  tabSymbolActive: {
    color: colors.secondary,
  },
  tabSymbolInactive: {
    color: colors.textInverse,
  },
  tabSymbolDisabled: {
    color: colors.textInverse,
    opacity: 0.35,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.secondary,
  },
  tabLabelInactive: {
    color: colors.textInverse,
  },
  tabLabelDisabled: {
    color: colors.textInverse,
    opacity: 0.35,
  },
  quickActionSlot: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    minHeight: 42,
  },
  quickActionButton: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
    borderRadius: 28,
    borderWidth: 4,
    height: 56,
    justifyContent: "center",
    marginTop: -QUICK_ACTION_OVERHANG,
    width: 56,
  },
  quickActionButtonPressed: {
    backgroundColor: colors.secondaryPressed,
  },
  quickActionSymbol: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "600",
    lineHeight: 32,
  },
});
