import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { BibleBook } from "../../domain/bible/bibleBooks";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import { colors } from "../../theme/colors";
import type { BibleInstalledVersion } from "../repositories/bibleRepository";

type BibleReaderHeaderProps = Readonly<{
  version: BibleInstalledVersion;
  versions: readonly BibleInstalledVersion[];
  book: BibleBook;
  chapter: number;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onRequestBack?: () => void;
  onRequestPrevious?: () => void;
  onRequestNext?: () => void;
  onSelectVersion?: (versionId: BibleVersionId) => void;
}>;

export function BibleReaderHeader({
  version,
  versions,
  book,
  chapter,
  canGoPrevious,
  canGoNext,
  onRequestBack,
  onRequestPrevious,
  onRequestNext,
  onSelectVersion,
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
            <View style={styles.backButtonContent}>
              <Text accessible={false} style={styles.backButtonIcon}>
                ←
              </Text>
              <Text style={styles.backButtonText}>Voltar</Text>
            </View>
          </Pressable>
        ) : (
          <View style={styles.backPlaceholder} />
        )}

        <View
          accessibilityRole="text"
          accessibilityLabel={`Leitura disponível sem internet, ${version.displayName}`}
          style={styles.offlineBadge}
        >
          <Text style={styles.offlineBadgeText}>SEM INTERNET</Text>
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

      {versions.length > 1 && onSelectVersion && (
        <View
          accessibilityRole="radiogroup"
          accessibilityLabel="Versão bíblica"
          style={styles.versionOptions}
        >
          {versions.map((candidate) => {
            const selected = candidate.id === version.id;

            return (
              <Pressable
                key={candidate.id}
                accessibilityRole="radio"
                accessibilityLabel={`Ler em ${candidate.displayName}`}
                accessibilityState={{ checked: selected }}
                disabled={selected}
                onPress={() => onSelectVersion(candidate.id)}
                style={({ pressed }) => [
                  styles.versionButton,
                  selected && styles.versionButtonSelected,
                  pressed && !selected && styles.controlPressed,
                ]}
              >
                <Text
                  style={[
                    styles.versionButtonText,
                    selected && styles.versionButtonTextSelected,
                  ]}
                >
                  {candidate.displayName}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={styles.chapterNavigation}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ir para o capítulo anterior"
          accessibilityState={{ disabled: !canGoPrevious }}
          disabled={!canGoPrevious}
          onPress={onRequestPrevious}
          style={({ pressed }) => [
            styles.chapterButton,
            !canGoPrevious && styles.chapterButtonDisabled,
            pressed && canGoPrevious && styles.controlPressed,
          ]}
        >
          <Text
            style={[
              styles.chapterButtonText,
              !canGoPrevious && styles.chapterButtonTextDisabled,
            ]}
          >
            ‹ Anterior
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ir para o próximo capítulo"
          accessibilityState={{ disabled: !canGoNext }}
          disabled={!canGoNext}
          onPress={onRequestNext}
          style={({ pressed }) => [
            styles.chapterButton,
            !canGoNext && styles.chapterButtonDisabled,
            pressed && canGoNext && styles.controlPressed,
          ]}
        >
          <Text
            style={[
              styles.chapterButtonText,
              !canGoNext && styles.chapterButtonTextDisabled,
            ]}
          >
            Próximo ›
          </Text>
        </Pressable>
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
    paddingTop: 14,
    paddingBottom: 14,
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
    borderRadius: 12,
    backgroundColor: colors.secondary,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  backButtonPressed: {
    backgroundColor: colors.secondaryPressed,
  },
  backButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  backButtonIcon: {
    color: colors.primary,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "900",
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
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
  versionOptions: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  versionButton: {
    minHeight: 38,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  versionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  versionButtonText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  versionButtonTextSelected: {
    color: colors.primary,
  },
  chapterNavigation: {
    marginTop: 10,
    flexDirection: "row",
    gap: 8,
  },
  chapterButton: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
  },
  chapterButtonDisabled: {
    opacity: 0.45,
  },
  chapterButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  chapterButtonTextDisabled: {
    color: colors.textMuted,
  },
  controlPressed: {
    opacity: 0.72,
  },
});
