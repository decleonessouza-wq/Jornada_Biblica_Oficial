import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import { colors } from "../../theme/colors";
import type { BibleInstalledVersion } from "../repositories/bibleRepository";

type BibleVersionSelectorProps = Readonly<{
  versions: readonly BibleInstalledVersion[];
  selectedVersionId: BibleVersionId | null;
  disabled?: boolean;
  onSelectVersion: (versionId: BibleVersionId) => void;
}>;

export function BibleVersionSelector({
  versions,
  selectedVersionId,
  disabled = false,
  onSelectVersion,
}: BibleVersionSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Versão da Bíblia</Text>

      <View style={styles.options}>
        {versions.map((version) => {
          const selected = version.id === selectedVersionId;
          const itemDisabled = disabled || !version.enabled;

          return (
            <Pressable
              key={version.id}
              accessibilityRole="button"
              accessibilityLabel={`Selecionar ${version.displayName}`}
              accessibilityState={{
                selected,
                disabled: itemDisabled,
              }}
              disabled={itemDisabled}
              onPress={() => onSelectVersion(version.id)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && !itemDisabled && styles.optionPressed,
                itemDisabled && styles.optionDisabled,
              ]}
            >
              <Text
                style={[
                  styles.optionTitle,
                  selected && styles.optionTitleSelected,
                ]}
              >
                {version.displayName}
              </Text>

              <Text
                style={[
                  styles.optionMeta,
                  selected && styles.optionMetaSelected,
                ]}
              >
                {version.code}
                {version.publicationYear
                  ? ` · ${version.publicationYear}`
                  : ""}
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
    gap: 10,
  },
  label: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "700",
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  option: {
    minWidth: 132,
    flexGrow: 1,
    flexBasis: 0,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  optionPressed: {
    opacity: 0.82,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  optionTitleSelected: {
    color: colors.primary,
  },
  optionMeta: {
    marginTop: 3,
    color: colors.textMuted,
    fontSize: 12,
  },
  optionMetaSelected: {
    color: colors.primary,
  },
});