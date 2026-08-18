import HomeScreen from "../screens/HomeScreen";
import PlanScreen from "../screens/PlanScreen";
import { APP_INFO } from "../constants/appInfo";
import { colors } from "../theme/colors";

import CustomTabBar from "./CustomTabBar";
import { MainTabs } from "./navigationFactories";

export type MainTabsNavigatorProps = {
  onQuickAction: () => void;
};

export default function MainTabsNavigator({
  onQuickAction,
}: MainTabsNavigatorProps) {
  return (
    <MainTabs.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textStrong,
        headerTitleStyle: {
          fontWeight: "700",
        },
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
        name="PlanTab"
        component={PlanScreen}
        options={{
          title: "Plano Anual",
        }}
      />
    </MainTabs.Navigator>
  );
}
