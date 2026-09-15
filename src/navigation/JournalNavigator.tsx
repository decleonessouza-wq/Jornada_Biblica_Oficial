import { useCallback } from "react";

import { DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  getOfflineBibleReaderRouteParamsForReference,
} from "../bible/reader/bibleReaderContracts";
import {
  loadPreferredOfflineBibleVersion,
} from "../bible/state/bibleReaderPreferencesStore";
import type {
  BibleReference,
} from "../domain/bible/bibleReference";
import JournalEntryDetailScreen from "../screens/JournalEntryDetailScreen";
import JournalEntryEditorScreen from "../screens/JournalEntryEditorScreen";
import JournalScreen from "../screens/JournalScreen";
import { colors } from "../theme/colors";

import { AppHeaderMenuButton } from "./AppHeader";
import type {
  AppDrawerScreenProps,
  JournalStackParamList,
} from "./types";

const JournalStack =
  createNativeStackNavigator<JournalStackParamList>();

export default function JournalNavigator({
  navigation,
}: AppDrawerScreenProps<"Journal">) {
  const handleOpenBibleReference =
    useCallback(
      async (reference: BibleReference) => {
        try {
          const versionId =
            await loadPreferredOfflineBibleVersion();
          const readerParams =
            getOfflineBibleReaderRouteParamsForReference(
              reference,
              versionId,
            );

          if (readerParams === null) {
            return;
          }

          navigation.navigate("MainTabs", {
            screen: "BibleTab",
            params: {
              screen: "BibleReader",
              params: readerParams,
            },
          });
        } catch {
          return;
        }
      },
      [navigation],
    );

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
        options={{
          title: "Registro do dia",
        }}
      >
        {(screenProps) => (
          <JournalEntryDetailScreen
            {...screenProps}
            onOpenBibleReference={
              handleOpenBibleReference
            }
          />
        )}
      </JournalStack.Screen>
    </JournalStack.Navigator>
  );
}
