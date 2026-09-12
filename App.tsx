import React, { useEffect, useState } from "react";
import {
  AppState,
  AppStateStatus,
} from "react-native";

import { bootstrapBibleDatabase } from "./src/bible/database/bibleDatabaseBootstrap";
import { bootstrapHymnalDatabase } from "./src/hymnal/database/hymnalDatabaseBootstrap";
import RootNavigator from "./src/navigation/RootNavigator";
import { initNotifications } from "./src/services/notifications";
import { runAutoBackup } from "./src/utils/autoBackup";import { prepareLegacyGratitudeCutover } from "./src/services/journal/legacyGratitudeRuntime";

export default function App() {
  const [gratitudeCutoverReady, setGratitudeCutoverReady] = useState(false);
  useEffect(() => {
    // Inicializa handler + canal Android (sem pedir permissão)
    initNotifications();
  }, []);

  useEffect(() => {
    void bootstrapBibleDatabase().catch((error: unknown) => {
      console.error("[BibleDatabase] bootstrap failed", error);
    });
  }, []);

  useEffect(() => {
    void bootstrapHymnalDatabase().catch((error: unknown) => {
      console.error("[HymnalDatabase] bootstrap failed", error);
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    void prepareLegacyGratitudeCutover()
      .then(() => {
        if (mounted) {
          setGratitudeCutoverReady(true);
        }
      })
      .catch((error: unknown) => {
        console.error(
          "[LegacyGratitudeRuntime] cutover preparation failed",
          error,
        );
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    runAutoBackup();

    const sub = AppState.addEventListener(
      "change",
      (state: AppStateStatus) => {
        if (state === "active") runAutoBackup();
      },
    );

    return () => sub.remove();
  }, []);

  if (!gratitudeCutoverReady) return null;

  return <RootNavigator />;
}
