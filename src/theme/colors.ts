export const colors = {
  // Marca oficial
  primary: "#0D2B45",
  secondary: "#F0B429",
  background: "#F7F8FA",

  // Superfícies
  surface: "#FFFFFF",
  surfaceAlt: "#EEF2F5",
  surfaceHighlight: "#FFF7E3",

  // Tipografia
  text: "#17212B",
  textStrong: "#0D2B45",
  muted: "#667085",
  textMuted: "#667085",
  textInverse: "#FFFFFF",

  // Bordas e separadores
  border: "#D8E0E7",
  divider: "#E7ECF0",

  // Estados de interação
  primaryPressed: "#092238",
  primarySoft: "#E7EDF2",
  secondaryPressed: "#D79D19",
  secondarySoft: "#FFF3CF",

  // Feedback
  success: "#16825D",
  warning: "#B76E00",
  danger: "#B42318",
  info: "#2E6F9E",

  // Utilitários
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(13, 43, 69, 0.48)",
} as const;

export type ColorToken = keyof typeof colors;
