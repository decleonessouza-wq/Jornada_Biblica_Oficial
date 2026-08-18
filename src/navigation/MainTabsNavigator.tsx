import { DrawerActions } from "@react-navigation/native";
import { Pressable, StyleSheet, Text } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import PlanScreen from "../screens/PlanScreen";
import { APP_INFO } from "../constants/appInfo";
import { colors } from "../theme/colors";

import CustomTabBar from "./CustomTabBar";
import { MainTabs } from "./navigationFactories";

export type MainTabsNavigatorProps = {
  onQuickAction: () => void;
};

type HeaderMenuButtonProps = {
  onPress: () => void;
};

function HeaderMenuButton({ onPress }: HeaderMenuButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Abrir menu"
      onPress={onPress}
      style={({ pressed }) => [
        styles.headerMenuButton,
        pressed && styles.headerMenuButtonPressed,
      ]}
    >
      <Text style={styles.headerMenuGlyph}>☰</Text>
    </Pressable>
  );
}

export default function MainTabsNavigator({
  onQuickAction,
}: MainTabsNavigatorProps) {
  return (
    <MainTabs.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textStrong,
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerLeft: () => (
          <HeaderMenuButton
            onPress={() =>
              navigation.dispatch(DrawerActions.openDrawer())
            }
          />
        ),
      })}
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
        name="PlanTab"
        component={PlanScreen}
        options={{
          title: "Plano Anual",
        }}
      />
    </MainTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  headerMenuButton: {
    alignItems: "center",
    borderRadius: 12,
    height: 44,
    justifyContent: "center",
    marginLeft: 4,
    width: 44,
  },
  headerMenuButtonPressed: {
    backgroundColor: colors.primarySoft,
  },
  headerMenuGlyph: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 26,
  },
});
