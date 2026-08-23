import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { BibleBook } from "../../domain/bible/bibleBooks";
import { colors } from "../../theme/colors";
import type { BibleInstalledVersion } from "../repositories/bibleRepository";

type BibleReaderHeaderProps = Readonly<{
  version: BibleInstalledVersion;
  book: BibleBook;
  chapter: number;
  onRequestBack?: () => void;
}>;

export function BibleReaderHeader({
  version,
  book,
  chapter,
  onRequestBack,
}: BibleReaderHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        {onRequestBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para a seleção bíblica"
            onPress={onRequestBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <View
          accessibilityRole="text"
          accessibilityLabel={`Leitura offline, ${version.displayName}`}
          style={styles.offlineBadge}
        >
          <Text style={styles.offlineBadgeText}>OFFLINE</Text>
        </View>
      </View>

      <Text
        accessibilityRole="header"
        style={styles.title}
      >
        {book.canonicalName} {chapter}
      </Text>

      <Text style={styles.versionName}>
        {version.displayName}
        {version.publicationYear ? ` · ${version.publicationYear}` : ""}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 16,
  },
  topRow: {
    minHeight: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingRight: 12,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  backPlaceholder: {
    width: 1,
    height: 44,
  },
  offlineBadge: {
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  offlineBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 2,
    color: colors.textStrong,
    fontSize: 28,
    fontWeight: "800",
  },
  versionName: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});