import { useEffect, useState } from "react";
import { AppState, AppStateStatus, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import PlanScreen from "./screens/PlanScreen";
import ProgressScreen from "./screens/ProgressScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ReadingScreen from "./screens/ReadingScreen";

import TermsScreen from "./screens/TermsScreen";
import PrivacyScreen from "./screens/PrivacyScreen";

import WelcomeScreen from "./screens/WelcomeScreen";
import DedicationScreen from "./screens/DedicationScreen";

import { runAutoBackup } from "./utils/autoBackup";

const HAS_ONBOARDED_KEY = "hasOnboarded";

export type RootStackParamList = {
  Welcome: undefined;
  Dedication: undefined;

  Home: undefined;
  Plan: undefined;
  Progress: undefined;
  History: undefined;
  Settings: undefined;
  Reading: { date: string; reference: string; isSunday?: boolean };

  Terms: undefined;
  Privacy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppRouterOff() {
  const [booting, setBooting] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const flag = await AsyncStorage.getItem(HAS_ONBOARDED_KEY);
        setHasOnboarded(flag === "1");
      } catch {
        setHasOnboarded(false);
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  useEffect(() => {
    runAutoBackup();

    const sub = AppState.addEventListener("change", (state: AppStateStatus) => {
      if (state === "active") runAutoBackup();
    });

    return () => sub.remove();
  }, []);

  if (booting) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={hasOnboarded ? "Home" : "Welcome"}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dedication"
          component={DedicationScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Jornada Bíblica" }}
        />
        <Stack.Screen
          name="Plan"
          component={PlanScreen}
          options={{ title: "Plano Anual" }}
        />
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ title: "Progresso" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "Histórico" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Configurações" }}
        />
        <Stack.Screen
          name="Reading"
          component={ReadingScreen}
          options={{ title: "Leitura" }}
        />

        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{ title: "Termos de Uso" }}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={{ title: "Política de Privacidade" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
