import { useCallback } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  loadPreferredOfflineBibleVersion,
} from "../bible/state/bibleReaderPreferencesStore";
import type {
  BibleReference,
} from "../domain/bible/bibleReference";
import StudiesScreen from "../screens/StudiesScreen";
import StudyDetailScreen from "../screens/StudyDetailScreen";
import StudyTrackScreen from "../screens/StudyTrackScreen";
import {
  getJourneyBibleReaderRouteForReference,
} from "../services/journeyBibleReaderAdapter";
import { colors } from "../theme/colors";
import type {
  JournalEntryEditorSourceContext,
  MainTabScreenProps,
  StudiesStackParamList,
} from "./types";

export const STUDIES_ROUTE_NAMES = Object.freeze({
  home: "StudiesHome",
  track: "StudyTrack",
  detail: "StudyDetail",
} as const);

export const StudiesStack =
  createNativeStackNavigator<StudiesStackParamList>();

export default function StudiesNavigator({
  navigation,
}: MainTabScreenProps<"StudiesTab">) {
  const handleOpenBibleReference = useCallback(
    async (reference: BibleReference) => {
      try {
        const versionId =
          await loadPreferredOfflineBibleVersion();
        const route =
          getJourneyBibleReaderRouteForReference({
            reference,
            versionId,
            passageIndex: 0,
          });

        if (!route.ok) {
          return;
        }

        navigation.navigate(
          "JourneyBibleReader",
          route.routeParams,
        );
      } catch {
        return;
      }
    },
    [navigation],
  );

  const handleRequestFavorites = useCallback(
    () => {
      navigation.navigate("Favorites");
    },
    [navigation],
  );

  const handleOpenJournalContext = useCallback(
    (
      sourceContext: Extract<
        JournalEntryEditorSourceContext,
        { sourceType: "STUDY" }
      >,
    ) => {
      navigation.navigate("Journal", {
        screen: "JournalEntryEditor",
        params: {
          sourceContext,
        },
      });
    },
    [navigation],
  );

  return (
    <StudiesStack.Navigator
      initialRouteName="StudiesHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.textStrong,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "800",
        },
      }}
    >
      <StudiesStack.Screen
        component={StudiesScreen}
        name="StudiesHome"
        options={{
          title: "Biblioteca de Estudos",
        }}
      />
      <StudiesStack.Screen
        component={StudyTrackScreen}
        name="StudyTrack"
        options={{ headerShown: false, title: "Trilha de Estudos" }}
      />
      <StudiesStack.Screen
        name="StudyDetail"
        options={{ headerShown: false, title: "Estudo Bíblico" }}
      >
        {(screenProps) => (
          <StudyDetailScreen
            {...screenProps}
            onOpenBibleReference={
              handleOpenBibleReference
            }
            onOpenJournalContext={
              handleOpenJournalContext
            }
            onRequestFavorites={
              handleRequestFavorites
            }
          />
        )}
      </StudiesStack.Screen>
    </StudiesStack.Navigator>
  );
}
