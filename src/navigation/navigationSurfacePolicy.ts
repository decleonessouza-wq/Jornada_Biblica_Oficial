/**
 * Política declarativa das superfícies de navegação em transição.
 *
 * Harpa possui posição arquitetural definitiva na barra principal
 * e o runtime offline necessário para ativar sua navegação.
 *
 * Perfil pertence ao Drawer, porém não recebe rota enquanto sua tela
 * funcional ainda não existir.
 */

export const CURRENT_HARPA_RUNTIME_READY =
  true as const;

export const PRIMARY_HYMNAL_NAVIGATION =
  Object.freeze({
    label: "Harpa" as const,
    location: "PRIMARY_TAB" as const,
    availability: "AVAILABLE" as const,
    runtimeReady:
      CURRENT_HARPA_RUNTIME_READY,
  });

export const PROFILE_NAVIGATION =
  Object.freeze({
    label: "Perfil" as const,
    location: "DRAWER" as const,
    availability:
      "SCREEN_NOT_IMPLEMENTED" as const,
  });
