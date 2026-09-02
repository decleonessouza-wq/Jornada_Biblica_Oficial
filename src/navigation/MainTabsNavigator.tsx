import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import PlanScreen from "../screens/PlanScreen";
import { APP_INFO } from "../constants/appInfo";
import { colors } from "../theme/colors";

import {
  AppHeaderBrand,
  AppHeaderMenuButton,
  AppHeaderNotificationButton,
} from "./AppHeader";
import {
  AppShellChromeProvider,
  useAppShellChrome,
} from "./AppShellChromeContext";
import BibleNavigator from "./BibleNavigator";
import CustomTabBar from "./CustomTabBar";
import HymnalNavigator from "./HymnalNavigator";
import { MainTabs } from "./navigationFactories";

const HEADER_ROW_HEIGHT = 56;

export type MainTabsNavigatorProps = {
  onQuickAction: () => void;
};

type AnimatedAppShellHeaderProps = {
  onOpenDrawer: () => void;
  onOpenNotifications: () => void;
};

function AnimatedAppShellHeader({
  onOpenDrawer,
  onOpenNotifications,
}: AnimatedAppShellHeaderProps) {
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
    <Animated.View style={[styles.headerShell, shellAnimatedStyle]}>
      <View style={{ height: insets.top }} />

      <Animated.View style={[styles.headerRow, rowAnimatedStyle]}>
        <View style={styles.headerSide}>
          <AppHeaderMenuButton onPress={onOpenDrawer} />
        </View>

        <View style={styles.headerBrand}>
          <AppHeaderBrand />
        </View>

        <View style={styles.headerSide}>
          <AppHeaderNotificationButton onPress={onOpenNotifications} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

function MainTabsNavigatorContent({
  onQuickAction,
}: MainTabsNavigatorProps) {
  return (
    <MainTabs.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ navigation, route }) => {
        const focusedBibleRoute =
          route.name === "BibleTab"
            ? getFocusedRouteNameFromRoute(route)
            : undefined;

        const readerFocused =
          route.name === "BibleTab" &&
          focusedBibleRoute === "BibleReader";

        return {
          headerShown: !readerFocused,
          header: () => (
            <AnimatedAppShellHeader
              onOpenDrawer={() =>
                navigation.dispatch(DrawerActions.openDrawer())
              }
              onOpenNotifications={() =>
                navigation.dispatch(DrawerActions.jumpTo("Settings"))
              }
            />
          ),
        };
      }}
      tabBar={(props) => (
        <CustomTabBar {...props} onQuickAction={onQuickAction} />
      )}
    >
      <MainTabs.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: APP_INFO.name,
        }}
      />

      <MainTabs.Screen
        name="BibleTab"
        component={BibleNavigator}
        options={{
          title: "Bíblia",
        }}
      />

      <MainTabs.Screen
        name="PlanTab"
        component={PlanScreen}
        options={{
          title: "Plano Anual",
        }}
      />

      <MainTabs.Screen
        name="HymnalTab"
        component={HymnalNavigator}
        options={{
          title: "Harpa",
        }}
      />
    </MainTabs.Navigator>
  );
}

export default function MainTabsNavigator(
  props: MainTabsNavigatorProps
) {
  return (
    <AppShellChromeProvider>
      <MainTabsNavigatorContent {...props} />
    </AppShellChromeProvider>
  );
}

const styles = StyleSheet.create({
  headerShell: {
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    height: HEADER_ROW_HEIGHT,
    paddingHorizontal: 6,
  },
  headerSide: {
    alignItems: "center",
    justifyContent: "center",
    width: 52,
  },
  headerBrand: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
