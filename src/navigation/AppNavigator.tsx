import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import App from "../app_router_off";

// ✅ inicializa o serviço de notificações no boot do app
import { initNotifications } from "../services/notifications";

export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  useEffect(() => {
    // 🔒 não quebra o app caso algo dê ruim
    initNotifications().catch((e) => console.log("initNotifications failed:", e));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={App} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
