import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import type { BibleBookSummary } from "../repositories/bibleRepository";

type BibleChapterSelectorProps = Readonly<{
  book: BibleBookSummary | null;
  selectedChapter: number | null;
  disabled?: boolean;
  onSelectChapter: (chapter: number) => void;
}>;

export function BibleChapterSelector({
  book,
  selectedChapter,
  disabled = false,
  onSelectChapter,
}: BibleChapterSelectorProps) {
  const chapters = useMemo(
    () =>
      book
        ? Array.from({ length: book.chapterCount }, (_, index) => index + 1)
        : [],
    [book],
  );

  if (!book) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Selecione um livro</Text>
        <Text style={styles.emptyText}>
          Os capítulos aparecerão após a escolha do livro.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.helper}>
        {book.chapterCount} {book.chapterCount === 1 ? "capítulo" : "capítulos"} disponíveis
      </Text>

      <View style={styles.chapterGrid}>
        {chapters.map((chapter) => {
          const selected = chapter === selectedChapter;

          return (
            <Pressable
              key={chapter}
              accessibilityRole="button"
              accessibilityLabel={`${book.canonicalName}, capítulo ${chapter}`}
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => onSelectChapter(chapter)}
              style={({ pressed }) => [
                styles.chapterButton,
                selected && styles.chapterButtonSelected,
                pressed && !disabled && styles.chapterButtonPressed,
                disabled && styles.chapterButtonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.chapterNumber,
                  selected && styles.chapterNumberSelected,
                ]}
              >
                {chapter}
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
    gap: 12,
  },
  helper: {
    color: colors.textMuted,
    fontSize: 12,
  },
  chapterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chapterButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 13,
    backgroundColor: colors.surfaceAlt,
  },
  chapterButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  chapterButtonPressed: {
    opacity: 0.82,
  },
  chapterButtonDisabled: {
    opacity: 0.5,
  },
  chapterNumber: {
    color: colors.textStrong,
    fontSize: 14,
    fontWeight: "800",
  },
  chapterNumberSelected: {
    color: colors.textInverse,
  },
  emptyState: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  emptyTitle: {
    color: colors.textStrong,
    fontSize: 14,
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});