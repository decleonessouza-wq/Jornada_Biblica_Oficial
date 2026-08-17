import { useEffect, useState, type ComponentType } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import DedicationScreen from "../screens/DedicationScreen";
import ReadingScreen from "../screens/ReadingScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import { colors } from "../theme/colors";

import { RootStack } from "./navigationFactories";

const HAS_ONBOARDED_KEY = "hasOnboarded";

export type RootNavigatorProps = {
  appShellComponent: ComponentType;
};

export default function RootNavigator({
  appShellComponent: AppShellComponent,
}: RootNavigatorProps) {
  const [booting, setBooting] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const flag = await AsyncStorage.getItem(HAS_ONBOARDED_KEY);

        if (mounted) {
          setHasOnboarded(flag === "1");
        }
      } catch {
        if (mounted) {
          setHasOnboarded(false);
        }
      } finally {
        if (mounted) {
          setBooting(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (booting) {
    return (
      <SafeAreaView style={styles.loadingSafeArea}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Carregando…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={hasOnboarded ? "AppShell" : "Welcome"}
      >
        <RootStack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="Dedication"
          component={DedicationScreen}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="AppShell"
          component={AppShellComponent}
          options={{ headerShown: false }}
        />

        <RootStack.Screen
          name="Reading"
          component={ReadingScreen}
          options={{ title: "Leitura" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },
});
