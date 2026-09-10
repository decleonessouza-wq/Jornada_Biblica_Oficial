import { DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import JournalEntryDetailScreen from "../screens/JournalEntryDetailScreen";
import JournalEntryEditorScreen from "../screens/JournalEntryEditorScreen";
import JournalScreen from "../screens/JournalScreen";
import { colors } from "../theme/colors";

import { AppHeaderMenuButton } from "./AppHeader";
import type { JournalStackParamList } from "./types";

const JournalStack =
  createNativeStackNavigator<JournalStackParamList>();

export default function JournalNavigator() {
  return (
    <JournalStack.Navigator
      initialRouteName="JournalHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textStrong,
        headerTitleStyle: {
          fontWeight: "700",
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <JournalStack.Screen
        name="JournalHome"
        component={JournalScreen}
        options={({ navigation }) => ({
          title: "Meu Diário",
          headerLeft: () => (
            <AppHeaderMenuButton
              onPress={() => {
                navigation
                  .getParent()
                  ?.dispatch(DrawerActions.openDrawer());
              }}
            />
          ),
        })}
      />

      <JournalStack.Screen
        name="JournalEntryEditor"
        component={JournalEntryEditorScreen}
        options={({ route }) => ({
          title: route.params?.entryId
            ? "Editar registro"
            : "Novo registro",
        })}
      />

      <JournalStack.Screen
        name="JournalEntryDetail"
        component={JournalEntryDetailScreen}
        options={{
          title: "Registro do dia",
        }}
      />
    </JournalStack.Navigator>
  );
}
