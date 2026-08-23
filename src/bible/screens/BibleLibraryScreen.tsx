import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { BibleBookId } from "../../domain/bible/bibleReference";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import { colors } from "../../theme/colors";
import { BibleBookList } from "../components/BibleBookList";
import { BibleChapterSelector } from "../components/BibleChapterSelector";
import { BibleVersionSelector } from "../components/BibleVersionSelector";
import {
  parseOfflineBibleReaderRouteParams,
  type OfflineBibleReaderRouteParams,
} from "../reader/bibleReaderContracts";
import type {
  BibleBookSummary,
  BibleInstalledVersion,
  BibleRepository,
} from "../repositories/bibleRepository";
import { createSQLiteBibleRepository } from "../repositories/sqliteBibleRepository";
import {
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
  const [booksLoading, setBooksLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const selectedBook = useMemo(
    () => books.find((book) => book.id === selectedBookId) ?? null,
    [books, selectedBookId],
  );

  const loadCatalog = useCallback(async () => {
    const generation = catalogGenerationRef.current + 1;
    catalogGenerationRef.current = generation;

    setStatus("loading");
    setErrorMessage(null);
    setBooks([]);
    setSelectedBookId(null);
    setSelectedChapter(null);

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

      const preferredVersion = await loadPreferredOfflineBibleVersion();
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

      setSelectedVersionId(selectedVersion);
      setBooks(availableBooks);
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

      try {
        const nextBooks = await repository.listBooks(versionId);
        await savePreferredOfflineBibleVersion(versionId);

        setSelectedVersionId(versionId);
        setBooks(nextBooks);
        setSelectedBookId(null);
        setSelectedChapter(null);
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
    [booksLoading, selectedVersionId],
  );

  const handleSelectBook = useCallback((bookId: BibleBookId) => {
    setSelectedBookId(bookId);
    setSelectedChapter(null);
    setErrorMessage(null);
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
      setErrorMessage(null);
      onSelectChapter?.(params);
    },
    [onSelectChapter, selectedBookId, selectedVersionId],
  );

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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>BÍBLIA OFFLINE</Text>
        <Text style={styles.title}>Escolha sua leitura</Text>
        <Text style={styles.subtitle}>
          Selecione a versão, o livro e o capítulo. O conteúdo bíblico
          permanece disponível no aparelho.
        </Text>
      </View>

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
        <>
          <View style={styles.card}>
            <BibleBookList
              books={books}
              selectedBookId={selectedBookId}
              disabled={booksLoading}
              onSelectBook={handleSelectBook}
            />
          </View>

          <View style={styles.card}>
            <BibleChapterSelector
              book={selectedBook}
              selectedChapter={selectedChapter}
              disabled={booksLoading}
              onSelectChapter={handleSelectChapter}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 36,
    gap: 14,
  },
  header: {
    gap: 6,
    paddingBottom: 4,
  },
  eyebrow: {
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.textStrong,
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
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