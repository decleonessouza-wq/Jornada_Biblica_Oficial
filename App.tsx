import React, { useEffect } from "react";
import {
  AppState,
  AppStateStatus,
  Platform,
} from "react-native";

import { bootstrapBibleDatabase } from "./src/bible/database/bibleDatabaseBootstrap";
import RootNavigator from "./src/navigation/RootNavigator";
import { initNotifications } from "./src/services/notifications";
import { runAutoBackup } from "./src/utils/autoBackup";

export default function App() {
  useEffect(() => {
    // Inicializa handler + canal Android (sem pedir permissão)
    initNotifications();
  }, []);

  useEffect(() => {
    if (Platform.OS === "web") {
      return;
    }

    void bootstrapBibleDatabase().catch((error: unknown) => {
      console.error("[BibleDatabase] bootstrap failed", error);
    });
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

  return <RootNavigator />;
}
