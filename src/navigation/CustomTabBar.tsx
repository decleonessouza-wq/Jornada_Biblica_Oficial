import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../theme/colors";

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
        isFocused && styles.tabItemActive,
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

  return (
    <View
      style={[
        styles.safeArea,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
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
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  container: {
    alignItems: "flex-end",
    flexDirection: "row",
    minHeight: 64,
    paddingHorizontal: 8,
    paddingTop: 6,
  },
  tabItem: {
    alignItems: "center",
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  tabItemActive: {
    backgroundColor: colors.primarySoft,
  },
  tabItemPressed: {
    backgroundColor: colors.primarySoft,
  },
  tabSymbol: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 22,
  },
  tabSymbolActive: {
    color: colors.primary,
  },
  tabSymbolInactive: {
    color: colors.textMuted,
  },
  tabSymbolDisabled: {
    color: colors.border,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 14,
    marginTop: 2,
  },
  tabLabelActive: {
    color: colors.primary,
  },
  tabLabelInactive: {
    color: colors.textMuted,
  },
  tabLabelDisabled: {
    color: colors.textMuted,
    opacity: 0.55,
  },
  quickActionSlot: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    minHeight: 44,
  },
  quickActionButton: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    marginTop: -18,
    width: 56,
  },
  quickActionButtonPressed: {
    backgroundColor: colors.secondaryPressed,
  },
  quickActionSymbol: {
    color: colors.textStrong,
    fontSize: 30,
    fontWeight: "500",
    lineHeight: 32,
  },
});
