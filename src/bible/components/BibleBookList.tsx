import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type {
  BibleTestament,
} from "../../domain/bible/bibleBooks";
import type { BibleBookId } from "../../domain/bible/bibleReference";
import { colors } from "../../theme/colors";
import type { BibleBookSummary } from "../repositories/bibleRepository";

type BibleBookListProps = Readonly<{
  books: readonly BibleBookSummary[];
  selectedBookId: BibleBookId | null;
  disabled?: boolean;
  onSelectBook: (bookId: BibleBookId) => void;
}>;

const TESTAMENT_OPTIONS: readonly {
  id: BibleTestament;
  label: string;
  shortLabel: string;
}[] = [
  {
    id: "OLD",
    label: "Antigo Testamento",
    shortLabel: "Antigo",
  },
  {
    id: "NEW",
    label: "Novo Testamento",
    shortLabel: "Novo",
  },
];

export function BibleBookList({
  books,
  selectedBookId,
  disabled = false,
  onSelectBook,
}: BibleBookListProps) {
  const selectedBook =
    books.find((book) => book.id === selectedBookId) ?? null;

  const [activeTestament, setActiveTestament] =
    useState<BibleTestament>(selectedBook?.testament ?? "OLD");

  useEffect(() => {
    if (selectedBook) {
      setActiveTestament(selectedBook.testament);
    }
  }, [selectedBook]);

  const visibleBooks = useMemo(
    () => books.filter((book) => book.testament === activeTestament),
    [activeTestament, books],
  );

  const activeOption =
    TESTAMENT_OPTIONS.find((option) => option.id === activeTestament) ??
    TESTAMENT_OPTIONS[0];

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.label}>Escolha o livro</Text>
        <Text style={styles.helper}>
          Toque em um livro para abrir os capítulos.
        </Text>
      </View>

      <View
        accessibilityRole="tablist"
        style={styles.segmentedControl}
      >
        {TESTAMENT_OPTIONS.map((option) => {
          const selected = option.id === activeTestament;

          return (
            <Pressable
              key={option.id}
              accessibilityRole="tab"
              accessibilityLabel={option.label}
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => setActiveTestament(option.id)}
              style={({ pressed }) => [
                styles.segment,
                selected && styles.segmentSelected,
                pressed && !disabled && styles.segmentPressed,
              ]}
            >
              <Text
                style={[
                  styles.segmentText,
                  selected && styles.segmentTextSelected,
                ]}
              >
                {option.shortLabel}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.sectionHeading}>
        <Text style={styles.sectionTitle}>{activeOption.label}</Text>
        <Text style={styles.sectionCount}>
          {visibleBooks.length} livros
        </Text>
      </View>

      <View style={styles.bookGrid}>
        {visibleBooks.map((book) => {
          const selected = book.id === selectedBookId;

          return (
            <Pressable
              key={book.id}
              accessibilityRole="button"
              accessibilityLabel={`${book.canonicalName}, ${book.chapterCount} capítulos`}
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => onSelectBook(book.id)}
              style={({ pressed }) => [
                styles.bookButton,
                selected && styles.bookButtonSelected,
                pressed && !disabled && styles.bookButtonPressed,
                disabled && styles.bookButtonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.bookName,
                  selected && styles.bookNameSelected,
                ]}
                numberOfLines={2}
              >
                {book.canonicalName}
              </Text>

              <Text
                style={[
                  styles.chapterCount,
                  selected && styles.chapterCountSelected,
                ]}
              >
                {book.chapterCount} {book.chapterCount === 1 ? "cap." : "caps."}
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
    gap: 13,
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
  segmentedControl: {
    flexDirection: "row",
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    padding: 4,
  },
  segment: {
    minHeight: 44,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
  },
  segmentSelected: {
    backgroundColor: colors.primary,
  },
  segmentPressed: {
    opacity: 0.82,
  },
  segmentText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "800",
  },
  segmentTextSelected: {
    color: colors.textInverse,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  sectionTitle: {
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: "800",
  },
  sectionCount: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "600",
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  bookButton: {
    width: "48.5%",
    minHeight: 60,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  bookButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  bookButtonPressed: {
    opacity: 0.82,
  },
  bookButtonDisabled: {
    opacity: 0.5,
  },
  bookName: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 17,
  },
  bookNameSelected: {
    color: colors.primary,
  },
  chapterCount: {
    marginTop: 3,
    color: colors.textMuted,
    fontSize: 10,
  },
  chapterCountSelected: {
    color: colors.primary,
  },
});