import React, { useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../../theme/colors";
import {
  BIBLE_READER_FONT_SCALES,
  type BibleReaderFontScale,
} from "../reader/bibleReaderContracts";

type BibleReaderFontControlsProps = Readonly<{
  value: BibleReaderFontScale;
  disabled?: boolean;
  onChange: (fontScale: BibleReaderFontScale) => void;
}>;

const FONT_SCALE_LABELS: Record<BibleReaderFontScale, string> = {
  small: "Pequena",
  medium: "Média",
  large: "Grande",
  extraLarge: "Extra grande",
};

export function BibleReaderFontControls({
  value,
  disabled = false,
  onChange,
}: BibleReaderFontControlsProps) {
  const handleSelect = useCallback(
    (fontScale: BibleReaderFontScale) => {
      if (disabled || fontScale === value) {
        return;
      }

      onChange(fontScale);
    },
    [disabled, onChange, value],
  );

  return (
    <View
      style={styles.container}
      accessibilityLabel="Tamanho da fonte da leitura bíblica"
    >
      <View style={styles.headingRow}>
        <Text style={styles.title}>Tamanho da fonte</Text>
        <Text style={styles.currentValue}>
          {FONT_SCALE_LABELS[value]}
        </Text>
      </View>

      <View style={styles.options}>
        {BIBLE_READER_FONT_SCALES.map((fontScale) => {
          const selected = fontScale === value;
          const label = FONT_SCALE_LABELS[fontScale];

          return (
            <Pressable
              key={fontScale}
              accessibilityRole="radio"
              accessibilityLabel={`Fonte ${label}`}
              accessibilityState={{
                checked: selected,
                disabled,
              }}
              disabled={disabled}
              onPress={() => handleSelect(fontScale)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && !disabled && styles.optionPressed,
                disabled && styles.optionDisabled,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    flex: 1,
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: "700",
  },
  currentValue: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  options: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    minHeight: 40,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  optionPressed: {
    opacity: 0.72,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  optionTextSelected: {
    color: colors.primary,
  },
});
