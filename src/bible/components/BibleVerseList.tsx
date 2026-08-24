import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewToken,
} from "react-native";

import { colors } from "../../theme/colors";
import type { BibleReaderFontScale } from "../reader/bibleReaderContracts";
import type { BibleVerseRecord } from "../repositories/bibleRepository";

type BibleVerseListProps = Readonly<{
  verses: readonly BibleVerseRecord[];
  fontScale: BibleReaderFontScale;
  initialVerse?: number;
  onFirstVisibleVerseChange?: (verse: number) => void;
  onInitialRestoreComplete?: () => void;
  onScrollOffsetChange?: (offsetY: number) => void;
  contentTopInset?: number;
}>;

type ReaderTypography = Readonly<{
  verseNumberSize: number;
  verseTextSize: number;
  verseLineHeight: number;
}>;

const TYPOGRAPHY_BY_SCALE: Record<
  BibleReaderFontScale,
  ReaderTypography
> = {
  small: {
    verseNumberSize: 11,
    verseTextSize: 15,
    verseLineHeight: 24,
  },
  medium: {
    verseNumberSize: 12,
    verseTextSize: 17,
    verseLineHeight: 27,
  },
  large: {
    verseNumberSize: 13,
    verseTextSize: 19,
    verseLineHeight: 30,
  },
  extraLarge: {
    verseNumberSize: 14,
    verseTextSize: 22,
    verseLineHeight: 34,
  },
};

const INITIAL_RESTORE_FALLBACK_MS = 1200;
const INITIAL_RESTORE_RETRY_MS = 120;

export function BibleVerseList({
  verses,
  fontScale,
  initialVerse,
  onFirstVisibleVerseChange,
  onInitialRestoreComplete,
  onScrollOffsetChange,
  contentTopInset = 0,
}: BibleVerseListProps) {
  const listRef = useRef<FlatList<BibleVerseRecord>>(null);
  const restoreTargetVerseRef = useRef<number | null>(null);
  const restoreCompletedRef = useRef(true);
  const restoreFallbackTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const restoreRetryTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstVisibleCallbackRef = useRef(onFirstVisibleVerseChange);
  const restoreCompleteCallbackRef = useRef(onInitialRestoreComplete);
  const scrollOffsetCallbackRef = useRef(onScrollOffsetChange);

  const typography = TYPOGRAPHY_BY_SCALE[fontScale];

  const initialIndex = useMemo(() => {
    if (initialVerse === undefined) {
      return -1;
    }

    return verses.findIndex(
      (verse) => verse.verse === initialVerse,
    );
  }, [initialVerse, verses]);

  useEffect(() => {
    firstVisibleCallbackRef.current = onFirstVisibleVerseChange;
  }, [onFirstVisibleVerseChange]);

  useEffect(() => {
    restoreCompleteCallbackRef.current = onInitialRestoreComplete;
  }, [onInitialRestoreComplete]);

  useEffect(() => {
    scrollOffsetCallbackRef.current = onScrollOffsetChange;
  }, [onScrollOffsetChange]);

  const clearRestoreTimers = useCallback(() => {
    if (restoreFallbackTimerRef.current !== null) {
      clearTimeout(restoreFallbackTimerRef.current);
      restoreFallbackTimerRef.current = null;
    }

    if (restoreRetryTimerRef.current !== null) {
      clearTimeout(restoreRetryTimerRef.current);
      restoreRetryTimerRef.current = null;
    }
  }, []);

  const completeInitialRestore = useCallback(() => {
    if (restoreCompletedRef.current) {
      return;
    }

    restoreCompletedRef.current = true;
    clearRestoreTimers();
    restoreCompleteCallbackRef.current?.();
  }, [clearRestoreTimers]);

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
        <Text
          style={[
            styles.verseNumber,
            { fontSize: typography.verseNumberSize },
          ]}
        >
          {item.verse}
        </Text>
        <Text
          style={[
            styles.verseText,
            {
              fontSize: typography.verseTextSize,
              lineHeight: typography.verseLineHeight,
            },
          ]}
        >
          {item.text}
        </Text>
      </View>
    ),
    [typography],
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 80,
  }).current;

  const onViewableItemsChanged = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken<BibleVerseRecord>[];
    }) => {
      const orderedVisibleItems = viewableItems
        .filter(
          (
            token,
          ): token is ViewToken<BibleVerseRecord> & {
            index: number;
          } =>
            token.isViewable &&
            token.index !== null &&
            token.item !== undefined,
        )
        .sort((left, right) => left.index - right.index);

      const targetVerse = restoreTargetVerseRef.current;

      if (
        targetVerse !== null &&
        !restoreCompletedRef.current &&
        orderedVisibleItems.some(
          (token) => token.item.verse === targetVerse,
        )
      ) {
        completeInitialRestore();
      }

      if (!restoreCompletedRef.current) {
        return;
      }

      const firstVisibleVerse =
        orderedVisibleItems[0]?.item.verse;

      if (firstVisibleVerse !== undefined) {
        firstVisibleCallbackRef.current?.(firstVisibleVerse);
      }
    },
  ).current;

  useEffect(() => {
    clearRestoreTimers();

    if (initialVerse === undefined || initialIndex < 0) {
      restoreTargetVerseRef.current = null;
      restoreCompletedRef.current = true;
      return;
    }

    restoreTargetVerseRef.current = initialVerse;
    restoreCompletedRef.current = false;

    const startTimer = setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
        viewPosition: 0,
      });
    }, 0);

    restoreFallbackTimerRef.current = setTimeout(() => {
      completeInitialRestore();
    }, INITIAL_RESTORE_FALLBACK_MS);

    return () => {
      clearTimeout(startTimer);
      clearRestoreTimers();
    };
  }, [
    clearRestoreTimers,
    completeInitialRestore,
    initialIndex,
    initialVerse,
  ]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!restoreCompletedRef.current) {
        return;
      }

      const offsetY = Math.max(
        0,
        event.nativeEvent.contentOffset.y,
      );

      scrollOffsetCallbackRef.current?.(offsetY);
    },
    [],
  );
  const handleScrollToIndexFailed = useCallback(
    ({
      index,
      averageItemLength,
    }: {
      index: number;
      averageItemLength: number;
    }) => {
      if (restoreCompletedRef.current) {
        return;
      }

      listRef.current?.scrollToOffset({
        offset: Math.max(0, averageItemLength * index),
        animated: false,
      });

      if (restoreRetryTimerRef.current !== null) {
        clearTimeout(restoreRetryTimerRef.current);
      }

      restoreRetryTimerRef.current = setTimeout(() => {
        if (restoreCompletedRef.current) {
          return;
        }

        listRef.current?.scrollToIndex({
          index,
          animated: false,
          viewPosition: 0,
        });
      }, INITIAL_RESTORE_RETRY_MS);
    },
    [],
  );

  return (
    <FlatList
      ref={listRef}
      style={styles.list}
      data={verses}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.content,
        { paddingTop: styles.content.paddingTop + contentTopInset },
        verses.length === 0 && styles.emptyContent,
      ]}
      ItemSeparatorComponent={VerseSeparator}
      ListEmptyComponent={EmptyChapter}
      initialNumToRender={16}
      maxToRenderPerBatch={16}
      windowSize={7}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      onScrollToIndexFailed={handleScrollToIndexFailed}
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
  list: {
    flex: 1,
  },
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
    fontWeight: "800",
  },
  verseText: {
    flex: 1,
    color: colors.text,
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
