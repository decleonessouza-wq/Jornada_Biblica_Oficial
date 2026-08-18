import DedicationScreen from "../screens/DedicationScreen";
import HistoryScreen from "../screens/HistoryScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import ProgressScreen from "../screens/ProgressScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TermsScreen from "../screens/TermsScreen";
import { colors } from "../theme/colors";

import MainTabsNavigator from "./MainTabsNavigator";
import { AppDrawer } from "./navigationFactories";

export type AppDrawerNavigatorProps = {
  onQuickAction: () => void;
};

export default function AppDrawerNavigator({
  onQuickAction,
}: AppDrawerNavigatorProps) {
  return (
    <AppDrawer.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textStrong,
        headerTitleStyle: {
          fontWeight: "700",
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
        drawerStyle: {
          backgroundColor: colors.surface,
        },
        drawerLabelStyle: {
          fontWeight: "600",
        },
      }}
    >
      <AppDrawer.Screen
        name="MainTabs"
        options={{
          drawerLabel: "Início",
          headerShown: false,
          title: "Início",
        }}
      >
        {() => <MainTabsNavigator onQuickAction={onQuickAction} />}
      </AppDrawer.Screen>

      <AppDrawer.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          drawerLabel: "Progresso",
          title: "Progresso",
        }}
      />

      <AppDrawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerLabel: "Histórico",
          title: "Histórico",
        }}
      />

      <AppDrawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: "Configurações",
          title: "Configurações",
        }}
      />

      <AppDrawer.Screen
        name="Dedication"
        component={DedicationScreen}
        options={{
          drawerLabel: "Dedicatória",
          title: "Dedicatória",
        }}
      />

      <AppDrawer.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          drawerLabel: "Termos",
          title: "Termos",
        }}
      />

      <AppDrawer.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          drawerLabel: "Privacidade",
          title: "Privacidade",
        }}
      />
    </AppDrawer.Navigator>
  );
}
