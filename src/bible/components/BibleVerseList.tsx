import React, { useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from "react-native";

import { colors } from "../../theme/colors";
import type { BibleVerseRecord } from "../repositories/bibleRepository";

type BibleVerseListProps = Readonly<{
  verses: readonly BibleVerseRecord[];
}>;

export function BibleVerseList({
  verses,
}: BibleVerseListProps) {
  const keyExtractor = useCallback(
    (item: BibleVerseRecord) =>
      `${item.versionId}:${item.bookId}:${item.chapter}:${item.verse}`,
    [],
  );

  const renderItem = useCallback<ListRenderItem<BibleVerseRecord>>(
    ({ item }) => (
      <View
        accessible
        accessibilityRole="text"
        accessibilityLabel={`Versículo ${item.verse}. ${item.text}`}
        style={styles.verseRow}
      >
        <Text style={styles.verseNumber}>{item.verse}</Text>
        <Text style={styles.verseText}>{item.text}</Text>
      </View>
    ),
    [],
  );

  return (
    <FlatList
      data={verses}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.content,
        verses.length === 0 && styles.emptyContent,
      ]}
      ItemSeparatorComponent={VerseSeparator}
      ListEmptyComponent={EmptyChapter}
      initialNumToRender={16}
      maxToRenderPerBatch={16}
      windowSize={7}
      showsVerticalScrollIndicator={false}
    />
  );
}

function VerseSeparator() {
  return <View style={styles.separator} />;
}

function EmptyChapter() {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>Nenhum versículo encontrado</Text>
      <Text style={styles.emptyText}>
        Este capítulo não possui versículos disponíveis no corpus offline.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 36,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  verseRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 13,
  },
  verseNumber: {
    width: 32,
    paddingTop: 2,
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "800",
  },
  verseText: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    lineHeight: 27,
  },
  separator: {
    height: 1,
    marginLeft: 32,
    backgroundColor: colors.divider,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 36,
  },
  emptyTitle: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyText: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },
});