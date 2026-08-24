import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getBibleBookById } from "../../domain/bible/bibleBooks";
import type { BibleBookId } from "../../domain/bible/bibleReference";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import { colors } from "../../theme/colors";
import { BibleBookList } from "../components/BibleBookList";
import { BibleChapterSelector } from "../components/BibleChapterSelector";
import { BibleVersionSelector } from "../components/BibleVersionSelector";
import {
  parseOfflineBibleReaderRouteParams,
  type OfflineBibleLastReading,
  type OfflineBibleReaderRouteParams,
} from "../reader/bibleReaderContracts";
import type {
  BibleBookSummary,
  BibleInstalledVersion,
  BibleRepository,
} from "../repositories/bibleRepository";
import { createSQLiteBibleRepository } from "../repositories/sqliteBibleRepository";
import {
  loadOfflineBibleLastReading,
  loadPreferredOfflineBibleVersion,
  savePreferredOfflineBibleVersion,
} from "../state/bibleReaderPreferencesStore";

type BibleLibraryScreenProps = Readonly<{
  onSelectChapter?: (params: OfflineBibleReaderRouteParams) => void;
}>;

type CatalogStatus = "loading" | "ready" | "empty" | "error";

const LOAD_ERROR_MESSAGE =
  "Não foi possível carregar a Bíblia offline. Tente novamente.";

export default function BibleLibraryScreen({
  onSelectChapter,
}: BibleLibraryScreenProps) {
  const repositoryRef = useRef<BibleRepository | null>(null);
  const catalogGenerationRef = useRef(0);

  const [status, setStatus] = useState<CatalogStatus>("loading");
  const [versions, setVersions] = useState<readonly BibleInstalledVersion[]>(
    [],
  );
  const [books, setBooks] = useState<readonly BibleBookSummary[]>([]);
  const [selectedVersionId, setSelectedVersionId] =
    useState<BibleVersionId | null>(null);
  const [selectedBookId, setSelectedBookId] =
    useState<BibleBookId | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [lastReading, setLastReading] =
    useState<OfflineBibleLastReading | null>(null);
  const [chapterSheetVisible, setChapterSheetVisible] = useState(false);
  const [booksLoading, setBooksLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedBook = useMemo(
    () => books.find((book) => book.id === selectedBookId) ?? null,
    [books, selectedBookId],
  );

  const continueReadingBook = useMemo(
    () => (lastReading ? getBibleBookById(lastReading.bookId) : null),
    [lastReading],
  );

  const continueReadingVersion = useMemo(
    () =>
      lastReading
        ? versions.find((version) => version.id === lastReading.versionId) ??
          null
        : null,
    [lastReading, versions],
  );

  const loadCatalog = useCallback(async () => {
    const generation = catalogGenerationRef.current + 1;
    catalogGenerationRef.current = generation;

    setStatus("loading");
    setErrorMessage(null);
    setBooks([]);
    setSelectedBookId(null);
    setSelectedChapter(null);
    setChapterSheetVisible(false);
    setLastReading(null);

    try {
      const repository = await createSQLiteBibleRepository();
      const installedVersions = await repository.listInstalledVersions();
      const enabledVersions = installedVersions.filter(
        (version) => version.enabled,
      );

      if (catalogGenerationRef.current !== generation) {
        return;
      }

      repositoryRef.current = repository;
      setVersions(enabledVersions);

      if (enabledVersions.length === 0) {
        setSelectedVersionId(null);
        setStatus("empty");
        return;
      }

      const [preferredVersion, storedLastReading] = await Promise.all([
        loadPreferredOfflineBibleVersion(),
        loadOfflineBibleLastReading(),
      ]);

      const preferredIsInstalled = enabledVersions.some(
        (version) => version.id === preferredVersion,
      );
      const selectedVersion = preferredIsInstalled
        ? preferredVersion
        : enabledVersions[0].id;

      const availableBooks = await repository.listBooks(selectedVersion);

      if (catalogGenerationRef.current !== generation) {
        return;
      }

      if (!preferredIsInstalled) {
        await savePreferredOfflineBibleVersion(selectedVersion);
      }

      if (catalogGenerationRef.current !== generation) {
        return;
      }

      const lastReadingIsAvailable =
        storedLastReading !== null &&
        enabledVersions.some(
          (version) => version.id === storedLastReading.versionId,
        );

      setSelectedVersionId(selectedVersion);
      setBooks(availableBooks);
      setLastReading(
        lastReadingIsAvailable ? storedLastReading : null,
      );
      setStatus(availableBooks.length > 0 ? "ready" : "empty");
    } catch (error) {
      if (catalogGenerationRef.current !== generation) {
        return;
      }

      console.warn("BIBLE_LIBRARY_LOAD_FAILED", error);
      repositoryRef.current = null;
      setVersions([]);
      setBooks([]);
      setSelectedVersionId(null);
      setLastReading(null);
      setStatus("error");
      setErrorMessage(LOAD_ERROR_MESSAGE);
    }
  }, []);

  useEffect(() => {
    void loadCatalog();

    return () => {
      catalogGenerationRef.current += 1;
    };
  }, [loadCatalog]);

  const handleSelectVersion = useCallback(
    async (versionId: BibleVersionId) => {
      const repository = repositoryRef.current;

      if (
        !repository ||
        booksLoading ||
        versionId === selectedVersionId
      ) {
        return;
      }

      setBooksLoading(true);
      setErrorMessage(null);
      setChapterSheetVisible(false);

      try {
        const nextBooks = await repository.listBooks(versionId);
        await savePreferredOfflineBibleVersion(versionId);

        const nextSelectedBook =
          selectedBookId === null
            ? null
            : nextBooks.find((book) => book.id === selectedBookId) ?? null;
        const nextSelectedChapter =
          nextSelectedBook !== null &&
          selectedChapter !== null &&
          selectedChapter <= nextSelectedBook.chapterCount
            ? selectedChapter
            : null;

        setSelectedVersionId(versionId);
        setBooks(nextBooks);
        setSelectedBookId(nextSelectedBook?.id ?? null);
        setSelectedChapter(nextSelectedChapter);
        setStatus(nextBooks.length > 0 ? "ready" : "empty");
      } catch (error) {
        console.warn("BIBLE_LIBRARY_VERSION_CHANGE_FAILED", error);
        setErrorMessage(
          "Não foi possível trocar a versão agora. Tente novamente.",
        );
      } finally {
        setBooksLoading(false);
      }
    },
    [
      booksLoading,
      selectedBookId,
      selectedChapter,
      selectedVersionId,
    ],
  );

  const handleSelectBook = useCallback((bookId: BibleBookId) => {
    setSelectedBookId(bookId);
    setSelectedChapter(null);
    setErrorMessage(null);
    setChapterSheetVisible(true);
  }, []);

  const handleSelectChapter = useCallback(
    (chapter: number) => {
      if (!selectedVersionId || !selectedBookId) {
        return;
      }

      const params = parseOfflineBibleReaderRouteParams({
        versionId: selectedVersionId,
        bookId: selectedBookId,
        chapter,
      });

      if (!params) {
        setErrorMessage(
          "Não foi possível validar o capítulo selecionado.",
        );
        return;
      }

      setSelectedChapter(chapter);
      setChapterSheetVisible(false);
      setErrorMessage(null);
      onSelectChapter?.(params);
    },
    [onSelectChapter, selectedBookId, selectedVersionId],
  );

  const handleContinueReading = useCallback(() => {
    if (!lastReading) {
      return;
    }

    const params = parseOfflineBibleReaderRouteParams(lastReading);

    if (!params) {
      setErrorMessage(
        "Não foi possível recuperar a última leitura salva.",
      );
      return;
    }

    setErrorMessage(null);
    onSelectChapter?.(params);
  }, [lastReading, onSelectChapter]);

  if (status === "loading") {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.centerTitle}>Carregando Bíblia offline</Text>
        <Text style={styles.centerText}>
          Preparando versões, livros e capítulos disponíveis no aparelho.
        </Text>
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.centerState}>
        <Text style={styles.centerTitle}>Não foi possível abrir a Bíblia</Text>
        <Text style={styles.centerText}>
          {errorMessage ?? LOAD_ERROR_MESSAGE}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Tentar carregar a Bíblia novamente"
          onPress={() => void loadCatalog()}
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed,
          ]}
        >
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTopLine}>
            <Text style={styles.eyebrow}>BÍBLIA OFFLINE</Text>
            <View style={styles.offlineBadge}>
              <Text style={styles.offlineBadgeText}>NO APARELHO</Text>
            </View>
          </View>

          <Text style={styles.title}>Sua Bíblia, pronta para a jornada</Text>
          <Text style={styles.subtitle}>
            Escolha a versão e o livro. Os capítulos abrem em uma seleção
            rápida, sem tirar o foco da leitura.
          </Text>
        </View>

        {lastReading && continueReadingBook && continueReadingVersion && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Continuar leitura em ${continueReadingBook.canonicalName}, capítulo ${lastReading.chapter}`}
            onPress={handleContinueReading}
            style={({ pressed }) => [
              styles.continueCard,
              pressed && styles.continueCardPressed,
            ]}
          >
            <View style={styles.continueAccent} />

            <View style={styles.continueContent}>
              <Text style={styles.continueEyebrow}>CONTINUAR LEITURA</Text>
              <Text style={styles.continueReference}>
                {continueReadingBook.canonicalName} {lastReading.chapter}
                {lastReading.verse ? `:${lastReading.verse}` : ""}
              </Text>
              <Text style={styles.continueMeta}>
                {continueReadingVersion.displayName} · posição salva
              </Text>
            </View>

            <Text accessible={false} style={styles.continueArrow}>
              ›
            </Text>
          </Pressable>
        )}

        {versions.length > 0 && (
          <View style={styles.card}>
            <BibleVersionSelector
              versions={versions}
              selectedVersionId={selectedVersionId}
              disabled={booksLoading}
              onSelectVersion={(versionId) => {
                void handleSelectVersion(versionId);
              }}
            />

            {booksLoading && (
              <View style={styles.inlineLoading}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.inlineLoadingText}>
                  Carregando livros desta versão...
                </Text>
              </View>
            )}
          </View>
        )}

        {errorMessage && (
          <View style={styles.feedback}>
            <Text style={styles.feedbackText}>{errorMessage}</Text>
          </View>
        )}

        {status === "empty" && books.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Nenhum conteúdo disponível</Text>
            <Text style={styles.emptyText}>
              Não encontramos livros habilitados para a versão selecionada.
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <BibleBookList
              books={books}
              selectedBookId={selectedBookId}
              disabled={booksLoading}
              onSelectBook={handleSelectBook}
            />
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
        visible={chapterSheetVisible && selectedBook !== null}
        onRequestClose={() => setChapterSheetVisible(false)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Fechar seleção de capítulos"
            onPress={() => setChapterSheetVisible(false)}
            style={styles.modalBackdrop}
          />

          <View
            accessibilityViewIsModal
            style={styles.chapterSheet}
          >
            <View style={styles.sheetHandle} />

            <View style={styles.sheetHeader}>
              <View style={styles.sheetHeaderText}>
                <Text style={styles.sheetEyebrow}>ESCOLHA O CAPÍTULO</Text>
                <Text style={styles.sheetTitle}>
                  {selectedBook?.canonicalName ?? ""}
                </Text>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Fechar capítulos"
                onPress={() => setChapterSheetVisible(false)}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.sheetCloseButton,
                  pressed && styles.sheetCloseButtonPressed,
                ]}
              >
                <Text style={styles.sheetCloseText}>Fechar</Text>
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={styles.chapterSheetContent}
              showsVerticalScrollIndicator={false}
            >
              <BibleChapterSelector
                book={selectedBook}
                selectedChapter={selectedChapter}
                disabled={booksLoading}
                onSelectChapter={handleSelectChapter}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 36,
    gap: 14,
  },
  header: {
    gap: 7,
    paddingBottom: 2,
  },
  headerTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  eyebrow: {
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  offlineBadge: {
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  offlineBadgeText: {
    color: colors.primary,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  title: {
    color: colors.textStrong,
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 33,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  continueCard: {
    minHeight: 96,
    flexDirection: "row",
    alignItems: "stretch",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.secondarySoft,
    borderRadius: 18,
    backgroundColor: colors.surfaceHighlight,
  },
  continueCardPressed: {
    opacity: 0.86,
  },
  continueAccent: {
    width: 5,
    backgroundColor: colors.secondary,
  },
  continueContent: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  continueEyebrow: {
    color: colors.secondaryPressed,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  continueReference: {
    marginTop: 4,
    color: colors.textStrong,
    fontSize: 20,
    fontWeight: "800",
  },
  continueMeta: {
    marginTop: 4,
    color: colors.textMuted,
    fontSize: 12,
  },
  continueArrow: {
    alignSelf: "center",
    paddingHorizontal: 16,
    color: colors.secondaryPressed,
    fontSize: 34,
    fontWeight: "400",
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 16,
  },
  inlineLoading: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inlineLoadingText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  feedback: {
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: 12,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  feedbackText: {
    color: colors.warning,
    fontSize: 13,
    lineHeight: 18,
  },
  emptyState: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 18,
  },
  emptyTitle: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 5,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
  },
  chapterSheet: {
    maxHeight: "78%",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: colors.surface,
    paddingTop: 9,
  },
  sheetHandle: {
    alignSelf: "center",
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 10,
  },
  sheetHeaderText: {
    flex: 1,
  },
  sheetEyebrow: {
    color: colors.secondaryPressed,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  sheetTitle: {
    marginTop: 3,
    color: colors.textStrong,
    fontSize: 22,
    fontWeight: "800",
  },
  sheetCloseButton: {
    minHeight: 44,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 14,
  },
  sheetCloseButtonPressed: {
    opacity: 0.8,
  },
  sheetCloseText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  chapterSheetContent: {
    paddingHorizontal: 18,
    paddingBottom: 34,
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 28,
  },
  centerTitle: {
    marginTop: 14,
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  centerText: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 18,
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
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