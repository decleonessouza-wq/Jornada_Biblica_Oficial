import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../theme/colors";

import { PRIMARY_HYMNAL_NAVIGATION } from "./navigationSurfacePolicy";

import { useAppShellChrome } from "./AppShellChromeContext";

const BASE_BAR_HEIGHT = 46;
const QUICK_ACTION_OVERHANG = 24;

type RealTabRouteName = "HomeTab" | "BibleTab" | "PlanTab" | "HymnalTab";

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

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
  onQuickAction,
}: CustomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { chromeProgress } = useAppShellChrome();

  const focusedParentRoute = state.routes[state.index];
  const bibleRoute = state.routes.find(
    (route) => route.name === "BibleTab",
  );
  const focusedBibleRouteName = bibleRoute
    ? getFocusedRouteNameFromRoute(bibleRoute)
    : undefined;
  const isBibleReaderFocused =
    focusedParentRoute?.name === "BibleTab" &&
    focusedBibleRouteName === "BibleReader";

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

  if (isBibleReaderFocused) {
    return null;
  }

  return (
    <Animated.View style={[styles.animatedShell, shellAnimatedStyle]}>
      <Animated.View
        style={[
          styles.safeArea,
          {
            height: visibleHeight,
          },
          contentAnimatedStyle,
        ]}
      >
        <View
          style={[
            styles.barSurface,
            {
              height: BASE_BAR_HEIGHT + bottomPadding,
              paddingBottom: bottomPadding,
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

          <RealTabButton
            routeName="BibleTab"
            label="Bíblia"
            symbol="▤"
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />

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

          <RealTabButton
            routeName="HymnalTab"
            label={PRIMARY_HYMNAL_NAVIGATION.label}
            symbol="H"
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
          </View>
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
    backgroundColor: colors.background,
    position: "relative",
  },
  barSurface: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    borderTopColor: colors.primaryPressed,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
    height: BASE_BAR_HEIGHT,
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: "center",
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    minHeight: 40,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  tabItemPressed: {
    backgroundColor: colors.primaryPressed,
  },
  tabSymbol: {
    fontSize: 19,
    fontWeight: "700",
    lineHeight: 20,
  },
  tabSymbolActive: {
    color: colors.secondary,
  },
  tabSymbolInactive: {
    color: colors.textInverse,
  },
  tabLabel: {
    fontSize: 10.5,
    fontWeight: "600",
    lineHeight: 12,
    marginTop: 1,
  },
  tabLabelActive: {
    color: colors.secondary,
  },
  tabLabelInactive: {
    color: colors.textInverse,
  },
  quickActionSlot: {
    alignItems: "center",
    flex: 1,
    height: BASE_BAR_HEIGHT,
    justifyContent: "center",
    position: "relative",
  },
  quickActionButton: {
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderColor: colors.primary,
    borderRadius: 27,
    borderWidth: 4,
    height: 54,
    justifyContent: "center",
    position: "absolute",
    top: -QUICK_ACTION_OVERHANG,
    width: 54,
    shadowColor: colors.black,
    shadowOpacity: 0.14,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  quickActionButtonPressed: {
    backgroundColor: colors.secondaryPressed,
  },
  quickActionSymbol: {
    color: colors.primary,
    fontSize: 29,
    fontWeight: "600",
    lineHeight: 30,
  },
});
