import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { BibleBookId } from "../../domain/bible/bibleReference";
import { colors } from "../../theme/colors";
import type { BibleBookSummary } from "../repositories/bibleRepository";

type BibleBookListProps = Readonly<{
  books: readonly BibleBookSummary[];
  selectedBookId: BibleBookId | null;
  disabled?: boolean;
  onSelectBook: (bookId: BibleBookId) => void;
}>;

type TestamentSectionProps = Readonly<{
  title: string;
  books: readonly BibleBookSummary[];
  selectedBookId: BibleBookId | null;
  disabled: boolean;
  onSelectBook: (bookId: BibleBookId) => void;
}>;

function TestamentSection({
  title,
  books,
  selectedBookId,
  disabled,
  onSelectBook,
}: TestamentSectionProps) {
  if (books.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.bookGrid}>
        {books.map((book) => {
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
              >
                {book.canonicalName}
              </Text>

              <Text
                style={[
                  styles.chapterCount,
                  selected && styles.chapterCountSelected,
                ]}
              >
                {book.chapterCount} {book.chapterCount === 1 ? "capítulo" : "capítulos"}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function BibleBookList({
  books,
  selectedBookId,
  disabled = false,
  onSelectBook,
}: BibleBookListProps) {
  const oldTestamentBooks = books.filter(
    (book) => book.testament === "OLD",
  );
  const newTestamentBooks = books.filter(
    (book) => book.testament === "NEW",
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Escolha o livro</Text>

      <TestamentSection
        title="Antigo Testamento"
        books={oldTestamentBooks}
        selectedBookId={selectedBookId}
        disabled={disabled}
        onSelectBook={onSelectBook}
      />

      <TestamentSection
        title="Novo Testamento"
        books={newTestamentBooks}
        selectedBookId={selectedBookId}
        disabled={disabled}
        onSelectBook={onSelectBook}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  label: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "700",
  },
  section: {
    gap: 9,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  bookGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  bookButton: {
    width: "48.5%",
    minHeight: 68,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
    fontSize: 14,
    fontWeight: "700",
  },
  bookNameSelected: {
    color: colors.primary,
  },
  chapterCount: {
    marginTop: 3,
    color: colors.textMuted,
    fontSize: 11,
  },
  chapterCountSelected: {
    color: colors.primary,
  },
});