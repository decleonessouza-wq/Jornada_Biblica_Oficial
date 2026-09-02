import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "../../theme/colors";
import type {
  HymnalHymnSummary,
} from "../repositories/hymnalRepository";

const ITEM_HEIGHT = 104;
const ITEM_SEPARATOR_HEIGHT = 10;
const ITEM_STRIDE =
  ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT;

type HymnalCatalogListProps = Readonly<{
  hymns: readonly HymnalHymnSummary[];
  highlightedHymnNumber: number | null;
  onPressHymn: (
    hymn: HymnalHymnSummary,
  ) => void;
}>;

export type HymnalCatalogListHandle = Readonly<{
  scrollToIndex: (index: number) => void;
}>;

const HymnalCatalogList =
  forwardRef<
    HymnalCatalogListHandle,
    HymnalCatalogListProps
  >(function HymnalCatalogList(
    {
      hymns,
      highlightedHymnNumber,
      onPressHymn,
    },
    ref,
  ) {
    const listRef =
      useRef<FlatList<HymnalHymnSummary> | null>(
        null,
      );

    useImperativeHandle(
      ref,
      () => ({
        scrollToIndex(index: number) {
          if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= hymns.length
          ) {
            return;
          }

          listRef.current?.scrollToIndex({
            animated: true,
            index,
            viewPosition: 0,
          });
        },
      }),
      [hymns.length],
    );

    return (
      <FlatList
        ref={listRef}
        data={hymns}
        keyExtractor={(hymn) =>
          `${hymn.editionId}:${hymn.id}`
        }
        renderItem={({ item }) => {
          const highlighted =
            item.number ===
            highlightedHymnNumber;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={[
                `Abrir hino ${item.number}.`,
                item.title,
                item.firstLine ?? "",
              ]
                .filter(Boolean)
                .join(" ")}
              onPress={() => onPressHymn(item)}
              style={({ pressed }) => [
                styles.item,
                highlighted &&
                  styles.itemHighlighted,
                pressed &&
                  styles.itemPressed,
              ]}
            >
              <View style={styles.numberBox}>
                <Text style={styles.numberText}>
                  {item.number}
                </Text>
              </View>

              <View style={styles.itemContent}>
                <Text
                  numberOfLines={2}
                  style={styles.itemTitle}
                >
                  {item.title}
                </Text>

                <Text
                  numberOfLines={1}
                  style={styles.firstLine}
                >
                  {item.firstLine ??
                    "Primeira linha não disponível"}
                </Text>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        getItemLayout={(_, index) => ({
          index,
          length: ITEM_STRIDE,
          offset: ITEM_STRIDE * index,
        })}
        contentContainerStyle={styles.content}
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={7}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    );
  });

export default HymnalCatalogList;

const styles = StyleSheet.create({
  content: {
    paddingBottom: 28,
    paddingHorizontal: 20,
  },
  item: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    height: ITEM_HEIGHT,
    paddingHorizontal: 14,
  },
  itemHighlighted: {
    backgroundColor: colors.surfaceHighlight,
    borderColor: colors.secondary,
    borderWidth: 1,
  },
  itemPressed: {
    opacity: 0.86,
  },
  numberBox: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: 14,
    height: 54,
    justifyContent: "center",
    marginRight: 14,
    width: 54,
  },
  numberText: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
  },
  itemContent: {
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
  },
  itemTitle: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 20,
  },
  firstLine: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  separator: {
    height: ITEM_SEPARATOR_HEIGHT,
  },
});
