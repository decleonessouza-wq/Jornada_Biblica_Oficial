import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  FlatList,
  Platform,
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
  highlightedVerse?: number;
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

type NativeMeasurableNode = {
  measureInWindow: (
    callback: (
      x: number,
      y: number,
      width: number,
      height: number,
    ) => void,
  ) => void;
};

function isNativeMeasurableNode(
  node: unknown,
): node is NativeMeasurableNode {
  if (
    typeof node !== "object" ||
    node === null ||
    !("measureInWindow" in node)
  ) {
    return false;
  }

  return (
    typeof (
      node as { measureInWindow?: unknown }
    ).measureInWindow === "function"
  );
}
type WebMeasuredNode = {
  getBoundingClientRect: () => {
    top: number;
    bottom: number;
  };
};

type WebScrollableNode = WebMeasuredNode & {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};

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
const NATIVE_RESTORE_POSITION_EPSILON_PX = 3;

export function BibleVerseList({
  verses,
  fontScale,
  initialVerse,
  highlightedVerse,
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
  const webMeasuredRestoreTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const nativeMeasuredRestoreTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentScrollOffsetRef = useRef(0);
  const contentTopInsetRef = useRef(contentTopInset);
  const targetVerseRef =
    useRef<React.ComponentRef<typeof View> | null>(null);
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

  useEffect(() => {
    contentTopInsetRef.current = contentTopInset;
  }, [contentTopInset]);

  const clearRestoreTimers = useCallback(() => {
    if (restoreFallbackTimerRef.current !== null) {
      clearTimeout(restoreFallbackTimerRef.current);
      restoreFallbackTimerRef.current = null;
    }

    if (restoreRetryTimerRef.current !== null) {
      clearTimeout(restoreRetryTimerRef.current);
      restoreRetryTimerRef.current = null;
    }

    if (webMeasuredRestoreTimerRef.current !== null) {
      clearTimeout(webMeasuredRestoreTimerRef.current);
      webMeasuredRestoreTimerRef.current = null;
    }

    if (nativeMeasuredRestoreTimerRef.current !== null) {
      clearTimeout(nativeMeasuredRestoreTimerRef.current);
      nativeMeasuredRestoreTimerRef.current = null;
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

  const attemptWebMeasuredRestore = useCallback(() => {
    if (
      Platform.OS !== "web" ||
      restoreCompletedRef.current
    ) {
      return;
    }

    const targetNode =
      targetVerseRef.current as unknown as WebMeasuredNode | null;
    const scrollNode =
      listRef.current?.getScrollableNode() as unknown as
        | WebScrollableNode
        | null
        | undefined;

    if (
      targetNode === null ||
      scrollNode === null ||
      scrollNode === undefined ||
      typeof targetNode.getBoundingClientRect !== "function" ||
      typeof scrollNode.getBoundingClientRect !== "function"
    ) {
      return;
    }

    const targetRect = targetNode.getBoundingClientRect();
    const containerRect = scrollNode.getBoundingClientRect();
    const rawOffset =
      scrollNode.scrollTop +
      targetRect.top -
      containerRect.top;

    if (!Number.isFinite(rawOffset)) {
      return;
    }

    const maxScrollTop = Math.max(
      0,
      scrollNode.scrollHeight - scrollNode.clientHeight,
    );
    const boundedOffset = Math.max(
      0,
      Math.min(maxScrollTop, rawOffset),
    );

    scrollNode.scrollTop = boundedOffset;

    const restoredTargetRect = targetNode.getBoundingClientRect();
    const restoredContainerRect = scrollNode.getBoundingClientRect();
    const targetIsVisible =
      restoredTargetRect.bottom > restoredContainerRect.top &&
      restoredTargetRect.top < restoredContainerRect.bottom;

    if (targetIsVisible) {
      completeInitialRestore();
    }
  }, [completeInitialRestore]);

  const attemptNativeMeasuredRestore = useCallback(() => {
    if (Platform.OS === "web" || restoreCompletedRef.current) {
      return;
    }

    const targetNode = targetVerseRef.current;
    const scrollNode = listRef.current?.getNativeScrollRef();
    const topInset = contentTopInsetRef.current;

    if (
      !targetNode ||
      !isNativeMeasurableNode(scrollNode) ||
      !Number.isFinite(topInset) ||
      topInset <= 0
    ) {
      return;
    }

    targetNode.measureInWindow(
      (_targetX, targetY, _targetWidth, targetHeight) => {
        if (
          restoreCompletedRef.current ||
          !Number.isFinite(targetY) ||
          !Number.isFinite(targetHeight) ||
          targetHeight <= 0
        ) {
          return;
        }

        scrollNode.measureInWindow(
          (_listX, listY, _listWidth, listHeight) => {
            if (
              restoreCompletedRef.current ||
              !Number.isFinite(listY) ||
              !Number.isFinite(listHeight) ||
              listHeight <= 0
            ) {
              return;
            }

            const desiredTargetY = listY + topInset;
            const targetDelta = targetY - desiredTargetY;

            if (
              Math.abs(targetDelta) <=
              NATIVE_RESTORE_POSITION_EPSILON_PX
            ) {
              completeInitialRestore();
              return;
            }

            const nextOffset = Math.max(
              0,
              currentScrollOffsetRef.current + targetDelta,
            );

            if (!Number.isFinite(nextOffset)) {
              return;
            }

            currentScrollOffsetRef.current = nextOffset;

            listRef.current?.scrollToOffset({
              offset: nextOffset,
              animated: false,
            });
          },
        );
      },
    );
  }, [completeInitialRestore]);
  const renderItem = useCallback<ListRenderItem<BibleVerseRecord>>(
    ({ item }) => {
      const isHighlighted = item.verse === highlightedVerse;
      const isRestoreTarget = item.verse === initialVerse;

      return (
        <View
          ref={isRestoreTarget ? targetVerseRef : undefined}
          testID={
            isHighlighted ? "bible-reader-highlighted-verse" : undefined
          }
          accessible
          accessibilityRole="text"
          accessibilityLabel={`${
            isHighlighted ? "Resultado da busca. " : ""
          }Vers?culo ${item.verse}. ${item.text}`}
          style={[
            styles.verseRow,
            isHighlighted && styles.verseRowHighlighted,
          ]}
        >
          <Text
            style={[
              styles.verseNumber,
              { fontSize: typography.verseNumberSize },
              isHighlighted && styles.verseNumberHighlighted,
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
              isHighlighted && styles.verseTextHighlighted,
            ]}
          >
            {item.text}
          </Text>
        </View>
      );
    },
    [highlightedVerse, initialVerse, typography],
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
        Platform.OS !== "web" &&
        targetVerse !== null &&
        !restoreCompletedRef.current &&
        orderedVisibleItems.some(
          (token) => token.item.verse === targetVerse,
        )
      ) {
        attemptNativeMeasuredRestore();
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

    const runWebMeasuredRestore = (): void => {
      if (
        Platform.OS !== "web" ||
        restoreCompletedRef.current
      ) {
        return;
      }

      attemptWebMeasuredRestore();

      if (restoreCompletedRef.current) {
        return;
      }

      webMeasuredRestoreTimerRef.current = setTimeout(
        runWebMeasuredRestore,
        INITIAL_RESTORE_RETRY_MS,
      );
    };

    const runNativeMeasuredRestore = (): void => {
      if (Platform.OS === "web" || restoreCompletedRef.current) {
        return;
      }

      attemptNativeMeasuredRestore();

      if (restoreCompletedRef.current) {
        return;
      }

      nativeMeasuredRestoreTimerRef.current = setTimeout(
        runNativeMeasuredRestore,
        INITIAL_RESTORE_RETRY_MS,
      );
    };


    const startTimer = setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
        viewPosition: 0,
      });

      if (Platform.OS === "web") {
        webMeasuredRestoreTimerRef.current = setTimeout(
          runWebMeasuredRestore,
          INITIAL_RESTORE_RETRY_MS,
        );
      } else {
        nativeMeasuredRestoreTimerRef.current = setTimeout(
          runNativeMeasuredRestore,
          INITIAL_RESTORE_RETRY_MS,
        );
      }
    }, 0);

    restoreFallbackTimerRef.current = setTimeout(() => {
      if (Platform.OS === "web") {
        completeInitialRestore();
        return;
      }

      if (restoreCompletedRef.current) {
        return;
      }

      listRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
        viewPosition: 0,
      });

      attemptNativeMeasuredRestore();
    }, INITIAL_RESTORE_FALLBACK_MS);

    return () => {
      clearTimeout(startTimer);
      clearRestoreTimers();
    };
  }, [
    attemptNativeMeasuredRestore,
    attemptWebMeasuredRestore,
    clearRestoreTimers,
    completeInitialRestore,
    initialIndex,
    initialVerse,
  ]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = Math.max(
        0,
        event.nativeEvent.contentOffset.y,
      );

      currentScrollOffsetRef.current = offsetY;

      if (!restoreCompletedRef.current) {
        return;
      }

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

      const estimatedOffset = Math.max(
        0,
        averageItemLength * index,
      );

      currentScrollOffsetRef.current = estimatedOffset;

      listRef.current?.scrollToOffset({
        offset: estimatedOffset,
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
  verseRowHighlighted: {
    marginVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: colors.surfaceHighlight,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    borderRadius: 10,
  },
  verseNumber: {
    width: 32,
    paddingTop: 2,
    color: colors.secondaryPressed,
    fontWeight: "800",
  },
  verseNumberHighlighted: {
    color: colors.secondaryPressed,
    fontWeight: "900",
  },
  verseText: {
    flex: 1,
    color: colors.text,
  },
  verseTextHighlighted: {
    color: colors.textStrong,
    fontWeight: "600",
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
