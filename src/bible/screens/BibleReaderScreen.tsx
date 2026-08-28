import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type { BibleBook } from "../../domain/bible/bibleBooks";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import { colors } from "../../theme/colors";
import { BibleReaderFontControls } from "../components/BibleReaderFontControls";
import { BibleReaderHeader } from "../components/BibleReaderHeader";
import { BibleVerseList } from "../components/BibleVerseList";
import {
  DEFAULT_BIBLE_READER_FONT_SCALE,
  getNextOfflineBibleReaderRouteParams,
  getPreviousOfflineBibleReaderRouteParams,
  parseOfflineBibleReaderRouteParams,
  type BibleReaderFontScale,
  type OfflineBibleLastReading,
  type OfflineBibleReaderRouteParams,
} from "../reader/bibleReaderContracts";
import type {
  BibleChapterRecord,
  BibleInstalledVersion,
  BibleRepository,
} from "../repositories/bibleRepository";
import { createSQLiteBibleRepository } from "../repositories/sqliteBibleRepository";
import {
  loadOfflineBibleFontScale,
  loadOfflineBibleLastReading,
  saveOfflineBibleFontScale,
  saveOfflineBibleLastReading,
  savePreferredOfflineBibleVersion,
} from "../state/bibleReaderPreferencesStore";

type BibleReaderScreenProps = Readonly<{
  params: OfflineBibleReaderRouteParams;
  onRequestBack?: () => void;
  onRequestReferenceChange?: (
    params: OfflineBibleReaderRouteParams,
  ) => void;
}>;

type ReaderStatus =
  | "loading"
  | "ready"
  | "invalidParams"
  | "versionUnavailable"
  | "chapterMissing"
  | "verseMissing"
  | "error";

type ReaderData = Readonly<{
  version: BibleInstalledVersion;
  versions: readonly BibleInstalledVersion[];
  book: BibleBook;
  chapter: BibleChapterRecord;
}>;

const GENERIC_LOAD_ERROR =
  "Não foi possível carregar este capítulo agora. Tente novamente.";

const VISIBLE_VERSE_PERSIST_DEBOUNCE_MS = 500;
const READER_CHROME_SCROLL_NOISE_PX = 0.5;
const READER_CHROME_HIDDEN_EPSILON_PX = 1;

export default function BibleReaderScreen({
  params,
  onRequestBack,
  onRequestReferenceChange,
}: BibleReaderScreenProps) {
  const insets = useSafeAreaInsets();

  const repositoryRef = useRef<BibleRepository | null>(null);
  const generationRef = useRef(0);
  const activeReadingRef =
    useRef<OfflineBibleReaderRouteParams | null>(null);
  const verseTrackingReadyRef = useRef(false);
  const pendingVerseRef = useRef<number | null>(null);
  const verseSaveTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);
  const readerChromeTranslateYRef = useRef(new Animated.Value(0));
  const readerChromeOffsetRef = useRef(0);
  const lastReadingScrollOffsetRef = useRef<number | null>(null);

  const [status, setStatus] = useState<ReaderStatus>("loading");
  const [data, setData] = useState<ReaderData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [initialVerse, setInitialVerse] = useState<number | undefined>(
    undefined,
  );
  const [fontScale, setFontScale] = useState<BibleReaderFontScale>(
    DEFAULT_BIBLE_READER_FONT_SCALE,
  );
  const [readerChromeHeight, setReaderChromeHeight] =
    useState<number | null>(null);
  const [readerChromeHidden, setReaderChromeHidden] = useState(false);

  const resetReaderChrome = useCallback(() => {
    readerChromeOffsetRef.current = 0;
    lastReadingScrollOffsetRef.current = null;
    readerChromeTranslateYRef.current.setValue(0);
    setReaderChromeHidden(false);
  }, []);

  const handleReaderChromeLayout = useCallback((height: number) => {
    if (!Number.isFinite(height) || height <= 0) {
      return;
    }

    const nextHeight = Math.ceil(height);
    setReaderChromeHeight((currentHeight) =>
      currentHeight === nextHeight ? currentHeight : nextHeight,
    );
  }, []);

  const clearVersePersistenceTimer = useCallback(() => {
    if (verseSaveTimerRef.current !== null) {
      clearTimeout(verseSaveTimerRef.current);
      verseSaveTimerRef.current = null;
    }
  }, []);

  const persistLastReadingNonFatal = useCallback(
    async (
      reading: OfflineBibleLastReading,
      diagnosticCode: string,
    ): Promise<void> => {
      try {
        await saveOfflineBibleLastReading(reading);
      } catch (error) {
        console.warn(diagnosticCode, error);
      }
    },
    [],
  );

  const flushPendingVisibleVerse = useCallback(() => {
    const reading = activeReadingRef.current;
    const verse = pendingVerseRef.current;

    clearVersePersistenceTimer();
    pendingVerseRef.current = null;

    if (!reading || verse === null) {
      return;
    }

    void persistLastReadingNonFatal(
      {
        versionId: reading.versionId,
        bookId: reading.bookId,
        chapter: reading.chapter,
        verse,
      },
      "BIBLE_READER_LAST_READING_FLUSH_FAILED",
    );
  }, [clearVersePersistenceTimer, persistLastReadingNonFatal]);

  const loadReader = useCallback(async () => {
    const generation = generationRef.current + 1;
    generationRef.current = generation;

    flushPendingVisibleVerse();
    activeReadingRef.current = null;
    verseTrackingReadyRef.current = false;

    setStatus("loading");
    setData(null);
    setErrorMessage(null);
    setInitialVerse(undefined);
    setFontScale(DEFAULT_BIBLE_READER_FONT_SCALE);

    const parsedParams = parseOfflineBibleReaderRouteParams(params);

    if (!parsedParams) {
      setStatus("invalidParams");
      return;
    }

    try {
      const lastReadingPromise = loadOfflineBibleLastReading().catch(
        (error) => {
          console.warn("BIBLE_READER_LAST_READING_LOAD_FAILED", error);
          return null;
        },
      );
      const fontScalePromise = loadOfflineBibleFontScale().catch(
        (error) => {
          console.warn("BIBLE_READER_FONT_SCALE_LOAD_FAILED", error);
          return DEFAULT_BIBLE_READER_FONT_SCALE;
        },
      );

      const [repository, savedLastReading, savedFontScale] =
        await Promise.all([
          createSQLiteBibleRepository(),
          lastReadingPromise,
          fontScalePromise,
        ]);

      if (generationRef.current !== generation) {
        return;
      }

      repositoryRef.current = repository;

      const versionAvailable = await repository.hasVersion(
        parsedParams.versionId,
      );

      if (generationRef.current !== generation) {
        return;
      }

      if (!versionAvailable) {
        setStatus("versionUnavailable");
        return;
      }

      const [installedVersions, book, chapter] = await Promise.all([
        repository.listInstalledVersions(),
        repository.getBook(
          parsedParams.versionId,
          parsedParams.bookId,
        ),
        repository.getChapter(
          parsedParams.versionId,
          parsedParams.bookId,
          parsedParams.chapter,
        ),
      ]);

      if (generationRef.current !== generation) {
        return;
      }

      const enabledVersions = installedVersions.filter(
        (candidate) => candidate.enabled,
      );
      const version = enabledVersions.find(
        (candidate) => candidate.id === parsedParams.versionId,
      );

      if (!version) {
        setStatus("versionUnavailable");
        return;
      }

      if (!book) {
        setStatus("error");
        setErrorMessage(
          "O livro selecionado não está disponível nesta versão.",
        );
        return;
      }

      if (!chapter) {
        setStatus("chapterMissing");
        return;
      }

      if (
        chapter.versionId !== parsedParams.versionId ||
        chapter.bookId !== parsedParams.bookId ||
        chapter.chapter !== parsedParams.chapter
      ) {
        throw new Error("BIBLE_READER_CHAPTER_IDENTITY_MISMATCH");
      }

      const requestedVerse = parsedParams.verse;
      const requestedVerseAvailable =
        requestedVerse === undefined ||
        chapter.verses.some(
          (verse) => verse.verse === requestedVerse,
        );

      if (!requestedVerseAvailable) {
        setStatus("verseMissing");
        return;
      }

      const savedVerseMatchesCurrentChapter =
        requestedVerse === undefined &&
        savedLastReading !== null &&
        savedLastReading.versionId === parsedParams.versionId &&
        savedLastReading.bookId === parsedParams.bookId &&
        savedLastReading.chapter === parsedParams.chapter &&
        savedLastReading.verse !== undefined &&
        chapter.verses.some(
          (verse) => verse.verse === savedLastReading.verse,
        );

      const initialTargetVerse =
        requestedVerse ??
        (savedVerseMatchesCurrentChapter
          ? savedLastReading.verse
          : undefined);

      const chapterReading: OfflineBibleLastReading =
        initialTargetVerse === undefined
          ? {
              versionId: parsedParams.versionId,
              bookId: parsedParams.bookId,
              chapter: parsedParams.chapter,
            }
          : {
              versionId: parsedParams.versionId,
              bookId: parsedParams.bookId,
              chapter: parsedParams.chapter,
              verse: initialTargetVerse,
            };

      await persistLastReadingNonFatal(
        chapterReading,
        "BIBLE_READER_CHAPTER_POSITION_SAVE_FAILED",
      );

      if (generationRef.current !== generation) {
        return;
      }

      activeReadingRef.current = parsedParams;
      verseTrackingReadyRef.current =
        initialTargetVerse === undefined;

      setInitialVerse(initialTargetVerse);
      setFontScale(savedFontScale);
      setData({
        version,
        versions: enabledVersions,
        book,
        chapter,
      });
      setStatus("ready");
    } catch (error) {
      if (generationRef.current !== generation) {
        return;
      }

      console.warn("BIBLE_READER_LOAD_FAILED", error);
      repositoryRef.current = null;
      activeReadingRef.current = null;
      verseTrackingReadyRef.current = false;
      setData(null);
      setStatus("error");
      setErrorMessage(GENERIC_LOAD_ERROR);
    }
  }, [
    flushPendingVisibleVerse,
    params.bookId,
    params.chapter,
    params.verse,
    params.versionId,
    persistLastReadingNonFatal,
  ]);

  useEffect(() => {
    resetReaderChrome();

    void loadReader();

    return () => {
      generationRef.current += 1;
      flushPendingVisibleVerse();
      activeReadingRef.current = null;
      verseTrackingReadyRef.current = false;
    };
  }, [flushPendingVisibleVerse, loadReader, resetReaderChrome]);

  const handleInitialRestoreComplete = useCallback(() => {
    verseTrackingReadyRef.current = true;
  }, []);

  const handleFirstVisibleVerseChange = useCallback(
    (verse: number) => {
      const reading = activeReadingRef.current;

      if (
        !reading ||
        !verseTrackingReadyRef.current ||
        !Number.isInteger(verse) ||
        verse <= 0
      ) {
        return;
      }

      pendingVerseRef.current = verse;
      clearVersePersistenceTimer();

      const scheduledReading = reading;

      verseSaveTimerRef.current = setTimeout(() => {
        verseSaveTimerRef.current = null;

        const activeReading = activeReadingRef.current;
        const pendingVerse = pendingVerseRef.current;

        if (
          !activeReading ||
          pendingVerse === null ||
          activeReading.versionId !== scheduledReading.versionId ||
          activeReading.bookId !== scheduledReading.bookId ||
          activeReading.chapter !== scheduledReading.chapter
        ) {
          return;
        }

        pendingVerseRef.current = null;

        void persistLastReadingNonFatal(
          {
            versionId: activeReading.versionId,
            bookId: activeReading.bookId,
            chapter: activeReading.chapter,
            verse: pendingVerse,
          },
          "BIBLE_READER_VISIBLE_VERSE_SAVE_FAILED",
        );
      }, VISIBLE_VERSE_PERSIST_DEBOUNCE_MS);
    },
    [clearVersePersistenceTimer, persistLastReadingNonFatal],
  );

  const handleReadingScrollOffsetChange = useCallback(
    (offsetY: number) => {
      if (
        readerChromeHeight === null ||
        !Number.isFinite(offsetY) ||
        offsetY < 0
      ) {
        return;
      }

      const previousOffset = lastReadingScrollOffsetRef.current;
      lastReadingScrollOffsetRef.current = offsetY;

      if (previousOffset === null) {
        return;
      }

      const delta = offsetY - previousOffset;

      if (Math.abs(delta) < READER_CHROME_SCROLL_NOISE_PX) {
        return;
      }

      const currentChromeOffset = readerChromeOffsetRef.current;
      const nextChromeOffset = Math.min(
        readerChromeHeight,
        Math.max(0, currentChromeOffset + delta),
      );

      if (Math.abs(nextChromeOffset - currentChromeOffset) < 0.1) {
        return;
      }

      readerChromeOffsetRef.current = nextChromeOffset;
      readerChromeTranslateYRef.current.setValue(-nextChromeOffset);

      const nextHidden =
        nextChromeOffset >=
        readerChromeHeight - READER_CHROME_HIDDEN_EPSILON_PX;

      setReaderChromeHidden((currentHidden) =>
        currentHidden === nextHidden ? currentHidden : nextHidden,
      );
    },
    [readerChromeHeight],
  );
  const handleFontScaleChange = useCallback(
    (nextFontScale: BibleReaderFontScale) => {
      if (nextFontScale === fontScale) {
        return;
      }

      setFontScale(nextFontScale);

      void saveOfflineBibleFontScale(nextFontScale).catch((error) => {
        console.warn("BIBLE_READER_FONT_SCALE_SAVE_FAILED", error);
      });
    },
    [fontScale],
  );

  const handleReferenceChange = useCallback(
    (nextParams: OfflineBibleReaderRouteParams) => {
      const validatedParams =
        parseOfflineBibleReaderRouteParams(nextParams);

      if (!validatedParams || !onRequestReferenceChange) {
        return;
      }

      flushPendingVisibleVerse();
      onRequestReferenceChange(validatedParams);
    },
    [flushPendingVisibleVerse, onRequestReferenceChange],
  );

  const handleVersionChange = useCallback(
    (versionId: BibleVersionId) => {
      if (versionId === params.versionId) {
        return;
      }

      const nextParams = parseOfflineBibleReaderRouteParams({
        versionId,
        bookId: params.bookId,
        chapter: params.chapter,
      });

      if (!nextParams) {
        return;
      }

      void savePreferredOfflineBibleVersion(versionId).catch((error) => {
        console.warn("BIBLE_READER_PREFERRED_VERSION_SAVE_FAILED", error);
      });

      handleReferenceChange(nextParams);
    },
    [
      handleReferenceChange,
      params.bookId,
      params.chapter,
      params.versionId,
    ],
  );

  if (status === "loading") {
    return (
      <ReaderState
        title="Carregando capítulo"
        message="Preparando a leitura bíblica disponível no aparelho."
        loading
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "invalidParams") {
    return (
      <ReaderState
        title="Referência inválida"
        message="Não foi possível validar o livro, o capítulo ou a versão informados."
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "versionUnavailable") {
    return (
      <ReaderState
        title="Versão indisponível"
        message="A versão bíblica selecionada não está disponível offline neste aparelho."
        onRetry={() => void loadReader()}
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "chapterMissing") {
    return (
      <ReaderState
        title="Capítulo não encontrado"
        message="O capítulo selecionado não foi encontrado na versão instalada."
        onRetry={() => void loadReader()}
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "verseMissing") {
    return (
      <ReaderState
        title="Versículo não encontrado"
        message="O versículo solicitado não está disponível neste capítulo da versão selecionada."
        onRequestBack={onRequestBack}
      />
    );
  }

  if (status === "error" || !data) {
    return (
      <ReaderState
        title="Não foi possível abrir a leitura"
        message={errorMessage ?? GENERIC_LOAD_ERROR}
        onRetry={() => void loadReader()}
        onRequestBack={onRequestBack}
      />
    );
  }

  const previousParams =
    getPreviousOfflineBibleReaderRouteParams(params);
  const nextParams = getNextOfflineBibleReaderRouteParams(params);

  const readerChromeAnimatedStyle = {
    transform: [
      {
        translateY: readerChromeTranslateYRef.current,
      },
    ],
  };

  return (
    <View style={styles.screen}>
      <Animated.View
        accessibilityElementsHidden={readerChromeHidden}
        importantForAccessibility={
          readerChromeHidden ? "no-hide-descendants" : "auto"
        }
        pointerEvents={readerChromeHidden ? "none" : "auto"}
        onLayout={(event) => {
          handleReaderChromeLayout(event.nativeEvent.layout.height);
        }}
        style={[styles.readerChrome, readerChromeAnimatedStyle]}
      >
        <BibleReaderHeader
          version={data.version}
          versions={data.versions}
          book={data.book}
          chapter={data.chapter.chapter}
          topInset={insets.top}
          canGoPrevious={previousParams !== null}
          canGoNext={nextParams !== null}
          onRequestBack={onRequestBack}
          onRequestPrevious={
            previousParams
              ? () => handleReferenceChange(previousParams)
              : undefined
          }
          onRequestNext={
            nextParams
              ? () => handleReferenceChange(nextParams)
              : undefined
          }
          onSelectVersion={handleVersionChange}
        />

        <BibleReaderFontControls
          value={fontScale}
          onChange={handleFontScaleChange}
        />
      </Animated.View>

      <BibleVerseList
        verses={data.chapter.verses}
        fontScale={fontScale}
        initialVerse={initialVerse}
        highlightedVerse={params.verse}
        onFirstVisibleVerseChange={handleFirstVisibleVerseChange}
        onInitialRestoreComplete={handleInitialRestoreComplete}
        onScrollOffsetChange={handleReadingScrollOffsetChange}
        contentTopInset={readerChromeHeight ?? 0}
      />
    </View>
  );
}

type ReaderStateProps = Readonly<{
  title: string;
  message: string;
  loading?: boolean;
  onRetry?: () => void;
  onRequestBack?: () => void;
}>;

function ReaderState({
  title,
  message,
  loading = false,
  onRetry,
  onRequestBack,
}: ReaderStateProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.stateScreen,
        { paddingTop: 16 + insets.top },
      ]}
    >
      {onRequestBack && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          onPress={onRequestBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      )}

      <View style={styles.stateContent}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            accessibilityLabel="Carregando leitura bíblica"
          />
        )}

        <Text style={styles.stateTitle}>{title}</Text>
        <Text style={styles.stateMessage}>{message}</Text>

        {onRetry && !loading && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tentar carregar o capítulo novamente"
            onPress={onRetry}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.retryButtonPressed,
            ]}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  readerChrome: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: colors.background,
  },
  stateScreen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  stateContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingBottom: 64,
  },
  stateTitle: {
    marginTop: 14,
    color: colors.textStrong,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  stateMessage: {
    marginTop: 7,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 20,
    minHeight: 44,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  retryButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  retryButtonText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: "700",
  },
});
