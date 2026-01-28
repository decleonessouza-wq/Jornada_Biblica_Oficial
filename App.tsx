import React, { useEffect } from "react";
import AppRouterOff from "./src/app_router_off";
import { initNotifications } from "./src/services/notifications";

export default function App() {
  useEffect(() => {
    // Inicializa handler + canal Android (sem pedir permissão)
    initNotifications();
  }, []);

  return <AppRouterOff />;
}
