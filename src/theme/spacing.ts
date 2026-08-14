export const spacing = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  section: 48,
  screen: 64,
} as const;

export const layout = {
  screenPaddingHorizontal: spacing.lg,
  screenPaddingTop: spacing.md,
  screenPaddingBottom: spacing.xxl,
  cardGap: spacing.md,
  sectionGap: spacing.xxl,
  contentMaxWidth: 720,
  touchTargetMin: 44,
} as const;

export type SpacingToken = keyof typeof spacing;
export type LayoutToken = keyof typeof layout;
