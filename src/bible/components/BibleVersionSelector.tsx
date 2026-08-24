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

function getVersionIdentity(versionId: BibleVersionId) {
  return versionId === "ALM1911"
    ? {
        accent: colors.secondaryPressed,
        soft: colors.secondarySoft,
        badge: "CLÁSSICA",
      }
    : {
        accent: colors.primary,
        soft: colors.primarySoft,
        badge: "ATUAL",
      };
}

export function BibleVersionSelector({
  versions,
  selectedVersionId,
  disabled = false,
  onSelectVersion,
}: BibleVersionSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.label}>Escolha sua versão</Text>
        <Text style={styles.helper}>
          Selecione a versão que deseja usar em sua leitura.
        </Text>
      </View>

      <View style={styles.options}>
        {versions.map((version) => {
          const selected = version.id === selectedVersionId;
          const itemDisabled = disabled || !version.enabled;
          const identity = getVersionIdentity(version.id);

          return (
            <Pressable
              key={version.id}
              accessibilityRole="radio"
              accessibilityLabel={`Selecionar ${version.displayName}`}
              accessibilityState={{
                selected,
                disabled: itemDisabled,
              }}
              disabled={itemDisabled}
              onPress={() => onSelectVersion(version.id)}
              style={({ pressed }) => [
                styles.option,
                selected && {
                  borderColor: identity.accent,
                  backgroundColor: identity.soft,
                },
                pressed && !itemDisabled && styles.optionPressed,
                itemDisabled && styles.optionDisabled,
              ]}
            >
              <View
                style={[
                  styles.accentBar,
                  { backgroundColor: identity.accent },
                ]}
              />

              <View style={styles.optionContent}>
                <View style={styles.optionTopLine}>
                  <Text
                    style={[
                      styles.optionTitle,
                      selected && { color: identity.accent },
                    ]}
                    numberOfLines={1}
                  >
                    {version.displayName}
                  </Text>

                  <View
                    style={[
                      styles.badge,
                      {
                        borderColor: identity.accent,
                        backgroundColor: selected
                          ? colors.surface
                          : identity.soft,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: identity.accent },
                      ]}
                    >
                      {identity.badge}
                    </Text>
                  </View>
                </View>

                <Text
                  style={[
                    styles.optionMeta,
                    selected && { color: identity.accent },
                  ]}
                >
                  {version.code}
                  {version.publicationYear
                    ? ` · ${version.publicationYear}`
                    : ""}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 11,
  },
  heading: {
    gap: 2,
  },
  label: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "800",
  },
  helper: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  options: {
    gap: 9,
  },
  option: {
    minHeight: 72,
    flexDirection: "row",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
  },
  accentBar: {
    width: 5,
  },
  optionContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 13,
    paddingVertical: 11,
  },
  optionTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  optionPressed: {
    opacity: 0.82,
  },
  optionDisabled: {
    opacity: 0.5,
  },
  optionTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  optionMeta: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 12,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
});