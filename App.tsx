import React, { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

import AppRouterOff from "./src/app_router_off";
import { initNotifications } from "./src/services/notifications";
import { runAutoBackup } from "./src/utils/autoBackup";

export default function App() {
  useEffect(() => {
    // Inicializa handler + canal Android (sem pedir permissão)
    initNotifications();
  }, []);

  useEffect(() => {
    runAutoBackup();

    const sub = AppState.addEventListener("change", (state: AppStateStatus) => {
      if (state === "active") runAutoBackup();
    });

    return () => sub.remove();
  }, []);

  return <AppRouterOff />;
}