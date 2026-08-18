import { useState } from "react";

import DedicationScreen from "../screens/DedicationScreen";
import HistoryScreen from "../screens/HistoryScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import ProgressScreen from "../screens/ProgressScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TermsScreen from "../screens/TermsScreen";
import { colors } from "../theme/colors";

import MainTabsNavigator from "./MainTabsNavigator";
import { AppDrawer } from "./navigationFactories";
import QuickActionSheet from "./QuickActionSheet";

export default function AppDrawerNavigator() {
  const [quickActionsVisible, setQuickActionsVisible] = useState(false);

  const openQuickActions = () => {
    setQuickActionsVisible(true);
  };

  const closeQuickActions = () => {
    setQuickActionsVisible(false);
  };

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
        drawerStyle: {
          backgroundColor: colors.surface,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerActiveBackgroundColor: colors.primarySoft,
        sceneStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <AppDrawer.Screen
        name="MainTabs"
        options={{
          title: "Início",
          drawerLabel: "Início",
          headerShown: false,
        }}
      >
        {({ navigation }) => {
          const handleOpenPlan = () => {
            closeQuickActions();
            navigation.navigate("MainTabs", {
              screen: "PlanTab",
            });
          };

          const handleOpenProgress = () => {
            closeQuickActions();
            navigation.navigate("Progress");
          };

          const handleOpenHistory = () => {
            closeQuickActions();
            navigation.navigate("History");
          };

          return (
            <>
              <MainTabsNavigator onQuickAction={openQuickActions} />

              <QuickActionSheet
                visible={quickActionsVisible}
                onClose={closeQuickActions}
                onOpenPlan={handleOpenPlan}
                onOpenProgress={handleOpenProgress}
                onOpenHistory={handleOpenHistory}
              />
            </>
          );
        }}
      </AppDrawer.Screen>

      <AppDrawer.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          title: "Progresso",
          drawerLabel: "Progresso",
        }}
      />

      <AppDrawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "Histórico",
          drawerLabel: "Histórico",
        }}
      />

      <AppDrawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Configurações",
          drawerLabel: "Configurações",
        }}
      />

      <AppDrawer.Screen
        name="Dedication"
        component={DedicationScreen}
        options={{
          title: "Dedicatória",
          drawerLabel: "Dedicatória",
        }}
      />

      <AppDrawer.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          title: "Termos",
          drawerLabel: "Termos",
        }}
      />

      <AppDrawer.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          title: "Privacidade",
          drawerLabel: "Privacidade",
        }}
      />
    </AppDrawer.Navigator>
  );
}
