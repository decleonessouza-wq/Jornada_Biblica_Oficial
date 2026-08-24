import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BibleLibraryScreen from "../bible/screens/BibleLibraryScreen";
import BibleReaderScreen from "../bible/screens/BibleReaderScreen";
import {
  parseOfflineBibleReaderRouteParams,
  type OfflineBibleReaderRouteParams,
} from "../bible/reader/bibleReaderContracts";
import { loadOfflineBibleLastReading } from "../bible/state/bibleReaderPreferencesStore";
import { colors } from "../theme/colors";

import { BibleStack } from "./navigationFactories";
import type { BibleStackScreenProps } from "./types";

type BootstrapState =
  | Readonly<{
      status: "loading";
      initialReaderParams: null;
    }>
  | Readonly<{
      status: "ready";
      initialReaderParams: OfflineBibleReaderRouteParams | null;
    }>;

function BibleLibraryRoute({
  navigation,
}: BibleStackScreenProps<"BibleLibrary">) {
  return (
    <BibleLibraryScreen
      onSelectChapter={(params) => {
        navigation.navigate("BibleReader", params);
      }}
    />
  );
}

function BibleReaderRoute({
  navigation,
  route,
}: BibleStackScreenProps<"BibleReader">) {
  const handleRequestBack = () => {
    const state = navigation.getState();
    const hasLibraryBeforeReader = state.routes
      .slice(0, state.index)
      .some((stackRoute) => stackRoute.name === "BibleLibrary");

    if (hasLibraryBeforeReader) {
      navigation.goBack();
      return;
    }

    navigation.replace("BibleLibrary");
  };

  const handleRequestReferenceChange = (
    params: OfflineBibleReaderRouteParams,
  ) => {
    navigation.replace("BibleReader", params);
  };

  return (
    <BibleReaderScreen
      params={route.params}
      onRequestBack={handleRequestBack}
      onRequestReferenceChange={handleRequestReferenceChange}
    />
  );
}

export default function BibleNavigator() {
  const [bootstrapState, setBootstrapState] = useState<BootstrapState>({
    status: "loading",
    initialReaderParams: null,
  });

  useEffect(() => {
    let active = true;

    const bootstrapLastReading = async () => {
      try {
        const lastReading = await loadOfflineBibleLastReading();
        const initialReaderParams =
          lastReading === null
            ? null
            : parseOfflineBibleReaderRouteParams({
                versionId: lastReading.versionId,
                bookId: lastReading.bookId,
                chapter: lastReading.chapter,
              });

        if (!active) {
          return;
        }

        setBootstrapState({
          status: "ready",
          initialReaderParams,
        });
      } catch (error) {
        console.warn(
          "BIBLE_NAVIGATOR_LAST_READING_BOOTSTRAP_FAILED",
          error,
        );

        if (!active) {
          return;
        }

        setBootstrapState({
          status: "ready",
          initialReaderParams: null,
        });
      }
    };

    void bootstrapLastReading();

    return () => {
      active = false;
    };
  }, []);

  if (bootstrapState.status === "loading") {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
          accessibilityLabel="Preparando Bíblia offline"
        />
        <Text style={styles.loadingTitle}>Preparando Bíblia offline</Text>
        <Text style={styles.loadingText}>
          Recuperando sua última posição de leitura.
        </Text>
      </View>
    );
  }

  const initialRouteName =
    bootstrapState.initialReaderParams === null
      ? "BibleLibrary"
      : "BibleReader";

  return (
    <BibleStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <BibleStack.Screen
        name="BibleLibrary"
        component={BibleLibraryRoute}
      />
      <BibleStack.Screen
        name="BibleReader"
        component={BibleReaderRoute}
        initialParams={bootstrapState.initialReaderParams ?? undefined}
      />
    </BibleStack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 28,
  },
  loadingTitle: {
    marginTop: 14,
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
