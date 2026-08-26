import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ListRenderItemInfo,
} from "react-native";

import type { BibleReference } from "../../domain/bible/bibleReference";
import { formatBibleReference } from "../../domain/bible/bibleReferenceFormatter";
import type { BibleReferenceParseError } from "../../domain/bible/bibleReferenceParser";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import { useAppShellChrome } from "../../navigation/AppShellChromeContext";
import { colors } from "../../theme/colors";
import { BibleVersionSelector } from "../components/BibleVersionSelector";
import type { BibleInstalledVersion } from "../repositories/bibleRepository";
import {
  BIBLE_SEARCH_DEFAULT_LIMIT,
  type BibleSearchResult,
  type BibleSearchTextMode,
} from "../repositories/bibleSearchRepository";
import { createSQLiteBibleRepository } from "../repositories/sqliteBibleRepository";
import { createSQLiteBibleSearchRepository } from "../repositories/sqliteBibleSearchRepository";
import { BibleSearchRouter } from "../search/bibleSearchRouter";
import {
  loadPreferredOfflineBibleVersion,
  savePreferredOfflineBibleVersion,
} from "../state/bibleReaderPreferencesStore";

type BibleSearchScreenProps = Readonly<{
  onRequestBack?: () => void;
  onRequestOpenResult?: (result: BibleSearchResult) => void;
  onRequestOpenReference?: (
    reference: BibleReference,
    versionId: BibleVersionId,
  ) => void;
}>;

type SearchStatus =
  | "idle"
  | "searching"
  | "ready"
  | "empty"
  | "invalidReference"
  | "error";

type ActiveTextSearch = Readonly<{
  query: string;
  versionId: BibleVersionId;
  mode: BibleSearchTextMode;
  nextOffset: number;
  hasMore: boolean;
}>;

const SEARCH_ERROR_MESSAGE =
  "Não foi possível concluir a busca agora. Tente novamente.";

const VERSION_LOAD_ERROR_MESSAGE =
  "Não foi possível preparar as versões bíblicas para busca.";

function formatSearchResultReference(
  result: BibleSearchResult,
): string {
  const reference: BibleReference = {
    passages: [
      {
        kind: "VERSE",
        bookId: result.bookId,
        chapter: result.chapter,
        verse: result.verse,
      },
    ],
  };

  return formatBibleReference(reference);
}

function getInvalidReferenceMessage(
  error: BibleReferenceParseError,
): string {
  switch (error.code) {
    case "EMPTY_PASSAGE":
      return "A referência possui uma parte vazia. Revise o texto informado.";

    case "INVALID_SYNTAX":
      return "Não foi possível compreender a estrutura dessa referência bíblica.";

    case "CHAPTER_OUT_OF_RANGE":
      return "O capítulo informado não existe para esse livro.";

    case "CHAPTER_RANGE_INVALID":
      return "O intervalo de capítulos informado não é válido.";

    case "VERSE_INVALID":
      return "O versículo informado não é válido.";

    case "VERSE_RANGE_INVALID":
      return "O intervalo de versículos informado não é válido.";

    case "AMBIGUOUS_COMMA_SHORTHAND":
      return "Use uma referência completa após a vírgula ou separe referências com ponto e vírgula.";

    case "EMPTY_REFERENCE":
      return "Digite uma palavra, frase ou referência bíblica.";

    case "UNKNOWN_BOOK":
      return "O livro informado não foi reconhecido.";
  }
}

export default function BibleSearchScreen({
  onRequestBack,
  onRequestOpenReference,
  onRequestOpenResult,
}: BibleSearchScreenProps) {
  const { handleScroll, resetChrome } = useAppShellChrome();

  const routerRef = useRef<BibleSearchRouter | null>(null);
  const lifecycleGenerationRef = useRef(0);
  const searchGenerationRef = useRef(0);
  const listRef = useRef<FlatList<BibleSearchResult> | null>(null);
  const searchSectionYRef = useRef(0);
  const searchInputFocusedRef = useRef(false);

  const [initializing, setInitializing] = useState(true);
  const [versions, setVersions] = useState<readonly BibleInstalledVersion[]>(
    [],
  );
  const [selectedVersionId, setSelectedVersionId] =
    useState<BibleVersionId | null>(null);
  const [query, setQuery] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [items, setItems] = useState<readonly BibleSearchResult[]>([]);
  const [activeTextSearch, setActiveTextSearch] =
    useState<ActiveTextSearch | null>(null);
  const [recognizedReference, setRecognizedReference] =
    useState<BibleReference | null>(null);
  const [invalidReferenceMessage, setInvalidReferenceMessage] =
    useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const selectedVersion = useMemo(
    () =>
      versions.find((version) => version.id === selectedVersionId) ?? null,
    [selectedVersionId, versions],
  );

  const clearSearchPresentation = useCallback(() => {
    setStatus("idle");
    setItems([]);
    setActiveTextSearch(null);
    setRecognizedReference(null);
    setInvalidReferenceMessage(null);
    setFeedbackMessage(null);
    setLoadingMore(false);
  }, []);

  const initialize = useCallback(async () => {
    const generation = lifecycleGenerationRef.current + 1;
    lifecycleGenerationRef.current = generation;

    setInitializing(true);
    setFeedbackMessage(null);

    try {
      const [
        bibleRepository,
        searchRepository,
        preferredVersionId,
      ] = await Promise.all([
        createSQLiteBibleRepository(),
        createSQLiteBibleSearchRepository(),
        loadPreferredOfflineBibleVersion(),
      ]);

      const installedVersions =
        await bibleRepository.listInstalledVersions();
      const enabledVersions = installedVersions.filter(
        (version) => version.enabled,
      );

      if (lifecycleGenerationRef.current !== generation) {
        return;
      }

      if (enabledVersions.length === 0) {
        routerRef.current = null;
        setVersions([]);
        setSelectedVersionId(null);
        setStatus("error");
        setFeedbackMessage(
          "Nenhuma versão bíblica está disponível para busca neste aparelho.",
        );
        return;
      }

      const preferredIsInstalled = enabledVersions.some(
        (version) => version.id === preferredVersionId,
      );
      const nextVersionId = preferredIsInstalled
        ? preferredVersionId
        : enabledVersions[0].id;

      routerRef.current = new BibleSearchRouter(searchRepository);
      setVersions(enabledVersions);
      setSelectedVersionId(nextVersionId);
      setStatus("idle");

      if (!preferredIsInstalled) {
        await savePreferredOfflineBibleVersion(nextVersionId);
      }
    } catch (error) {
      if (lifecycleGenerationRef.current !== generation) {
        return;
      }

      console.warn("BIBLE_SEARCH_INITIALIZE_FAILED", error);
      routerRef.current = null;
      setVersions([]);
      setSelectedVersionId(null);
      setStatus("error");
      setFeedbackMessage(VERSION_LOAD_ERROR_MESSAGE);
    } finally {
      if (lifecycleGenerationRef.current === generation) {
        setInitializing(false);
      }
    }
  }, []);

  useEffect(() => {
    resetChrome();
    void initialize();

    return () => {
      lifecycleGenerationRef.current += 1;
      searchGenerationRef.current += 1;
    };
  }, [initialize, resetChrome]);

  const handleSelectVersion = useCallback(
    (versionId: BibleVersionId) => {
      if (versionId === selectedVersionId) {
        return;
      }

      searchGenerationRef.current += 1;
      setSelectedVersionId(versionId);
      clearSearchPresentation();

      void savePreferredOfflineBibleVersion(versionId).catch((error) => {
        console.warn("BIBLE_SEARCH_VERSION_SAVE_FAILED", error);
      });
    },
    [clearSearchPresentation, selectedVersionId],
  );

  const executeSearch = useCallback(async () => {
    const router = routerRef.current;

    if (!router || !selectedVersionId || initializing) {
      setStatus("error");
      setFeedbackMessage(VERSION_LOAD_ERROR_MESSAGE);
      return;
    }

    const generation = searchGenerationRef.current + 1;
    searchGenerationRef.current = generation;

    setStatus("searching");
    setItems([]);
    setActiveTextSearch(null);
    setRecognizedReference(null);
    setInvalidReferenceMessage(null);
    setFeedbackMessage(null);
    setLoadingMore(false);

    try {
      const result = await router.route({
        versionId: selectedVersionId,
        query,
        offset: 0,
        limit: BIBLE_SEARCH_DEFAULT_LIMIT,
      });

      if (searchGenerationRef.current !== generation) {
        return;
      }

      if (result.kind === "REFERENCE") {
        setRecognizedReference(result.reference);
        setStatus("ready");
        return;
      }

      if (result.kind === "INVALID_REFERENCE") {
        setInvalidReferenceMessage(
          getInvalidReferenceMessage(result.error),
        );
        setStatus("invalidReference");
        return;
      }

      setItems(result.page.items);
      setActiveTextSearch({
        query,
        versionId: selectedVersionId,
        mode: result.mode,
        nextOffset:
          result.page.offset + result.page.items.length,
        hasMore: result.page.hasMore,
      });
      setStatus(
        result.page.items.length > 0 ? "ready" : "empty",
      );
    } catch (error) {
      if (searchGenerationRef.current !== generation) {
        return;
      }

      if (
        error instanceof Error &&
        error.message === "BIBLE_SEARCH_ROUTER_EMPTY_QUERY"
      ) {
        setStatus("idle");
        setFeedbackMessage(
          "Digite uma palavra, frase ou referência bíblica.",
        );
        return;
      }

      console.warn("BIBLE_SEARCH_EXECUTION_FAILED", error);
      setStatus("error");
      setFeedbackMessage(SEARCH_ERROR_MESSAGE);
    }
  }, [initializing, query, selectedVersionId]);

  const handleLoadMore = useCallback(async () => {
    const router = routerRef.current;
    const active = activeTextSearch;

    if (
      !router ||
      !active ||
      !active.hasMore ||
      loadingMore
    ) {
      return;
    }

    const generation = searchGenerationRef.current;
    setLoadingMore(true);
    setFeedbackMessage(null);

    try {
      const result = await router.route({
        versionId: active.versionId,
        query: active.query,
        offset: active.nextOffset,
        limit: BIBLE_SEARCH_DEFAULT_LIMIT,
      });

      if (searchGenerationRef.current !== generation) {
        return;
      }

      if (result.kind !== "TEXT") {
        throw new Error(
          `BIBLE_SEARCH_PAGINATION_UNEXPECTED_ROUTE:${result.kind}`,
        );
      }

      setItems((currentItems) => [
        ...currentItems,
        ...result.page.items,
      ]);
      setActiveTextSearch({
        query: active.query,
        versionId: active.versionId,
        mode: result.mode,
        nextOffset:
          result.page.offset + result.page.items.length,
        hasMore: result.page.hasMore,
      });
      setStatus("ready");
    } catch (error) {
      if (searchGenerationRef.current !== generation) {
        return;
      }

      console.warn("BIBLE_SEARCH_LOAD_MORE_FAILED", error);
      setFeedbackMessage(
        "Não foi possível carregar mais resultados. Tente novamente.",
      );
    } finally {
      if (searchGenerationRef.current === generation) {
        setLoadingMore(false);
      }
    }
  }, [activeTextSearch, loadingMore]);

  const revealSearchField = useCallback(
    (
      animated = true,
      topInset = 12,
    ) => {
      const offset = Math.max(
        searchSectionYRef.current - topInset,
        0,
      );

      listRef.current?.scrollToOffset({
        animated,
        offset,
      });
    },
    [],
  );

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      (event) => {
        if (searchInputFocusedRef.current) {
          setKeyboardHeight(
            Math.max(event.endCoordinates.height, 0),
          );
        }
      },
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (
      keyboardHeight > 0 &&
      searchInputFocusedRef.current
    ) {
      const topInset = Math.min(
        Math.max(keyboardHeight * 0.78, 220),
        340,
      );

      requestAnimationFrame(() => {
        revealSearchField(true, topInset);
      });
    }
  }, [keyboardHeight, revealSearchField]);

  const renderResult = useCallback(
    ({ item }: ListRenderItemInfo<BibleSearchResult>) => {
      const reference = formatSearchResultReference(item);

      if (!onRequestOpenResult) {
        return (
          <View
            accessible
            accessibilityLabel={`${reference}. ${item.text}`}
            style={styles.resultCard}
            testID="bible-search-result-card"
          >
            <Text style={styles.resultReference}>{reference}</Text>
            <Text style={styles.resultText}>{item.text}</Text>
          </View>
        );
      }

      return (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Abrir ${reference} no leitor. ${item.text}`}
          accessibilityHint="Abre o capítulo no leitor e posiciona este versículo."
          onPress={() => onRequestOpenResult(item)}
          style={({ pressed }) => [
            styles.resultCard,
            pressed && styles.pressablePressed,
          ]}
          testID="bible-search-result-card"
        >
          <Text style={styles.resultReference}>{reference}</Text>
          <Text style={styles.resultText}>{item.text}</Text>
        </Pressable>
      );
    },
    [onRequestOpenResult],
  );

  const listHeader = (
    <View style={styles.headerContent}>
      {onRequestBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar para Bíblia"
          onPress={onRequestBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressablePressed,
          ]}
          testID="bible-search-back"
        >
          <Text style={styles.backButtonText}>‹ Voltar para Bíblia</Text>
        </Pressable>
      ) : null}

      <View style={styles.hero}>
        <Text style={styles.eyebrow}>BUSCA BÍBLICA</Text>
        <Text style={styles.title}>Encontre na Palavra</Text>
        <Text style={styles.subtitle}>
          Busque uma palavra, uma frase exata ou digite uma referência
          como João 3:16.
        </Text>
      </View>

      {initializing ? (
        <View style={styles.loadingBlock}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>
            Preparando a busca offline...
          </Text>
        </View>
      ) : versions.length > 0 ? (
        <BibleVersionSelector
          versions={versions}
          selectedVersionId={selectedVersionId}
          disabled={status === "searching" || loadingMore}
          onSelectVersion={handleSelectVersion}
        />
      ) : null}

      <View
        onLayout={(event) => {
          searchSectionYRef.current = event.nativeEvent.layout.y;
        }}
        style={styles.searchSection}
      >
        <Text style={styles.fieldLabel}>
          Buscar palavra, frase ou referência
        </Text>

        <TextInput
          accessibilityLabel="Buscar palavra, frase ou referência"
          autoCapitalize="sentences"
          autoCorrect={false}
          editable={!initializing}
          onBlur={() => {
            searchInputFocusedRef.current = false;
          }}
          onChangeText={setQuery}
          onFocus={() => {
            searchInputFocusedRef.current = true;
          }}
          onSubmitEditing={() => void executeSearch()}
          placeholder="Ex.: amor, paz de Deus, João 3:16"
          placeholderTextColor={colors.textMuted}
          returnKeyType="search"
          style={styles.input}
          testID="bible-search-input"
          value={query}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Buscar"
          accessibilityState={{
            disabled:
              initializing ||
              selectedVersionId === null ||
              status === "searching",
          }}
          disabled={
            initializing ||
            selectedVersionId === null ||
            status === "searching"
          }
          onPress={() => void executeSearch()}
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.searchButtonPressed,
            (initializing ||
              selectedVersionId === null ||
              status === "searching") &&
              styles.disabledButton,
          ]}
          testID="bible-search-submit"
        >
          {status === "searching" ? (
            <ActivityIndicator
              color={colors.textInverse}
              size="small"
            />
          ) : (
            <Text style={styles.searchButtonText}>Buscar</Text>
          )}
        </Pressable>

        {feedbackMessage ? (
          <Text
            accessibilityLiveRegion="polite"
            style={[
              styles.feedbackText,
              status === "error" && styles.errorText,
            ]}
          >
            {feedbackMessage}
          </Text>
        ) : null}
      </View>

      {recognizedReference ? (
        onRequestOpenReference && selectedVersionId ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Abrir ${formatBibleReference(
              recognizedReference,
            )} no leitor`}
            accessibilityHint="Abre o leitor na primeira passagem desta referência."
            onPress={() =>
              onRequestOpenReference(
                recognizedReference,
                selectedVersionId,
              )
            }
            style={({ pressed }) => [
              styles.referenceCard,
              pressed && styles.pressablePressed,
            ]}
            testID="bible-search-reference-card"
          >
            <Text style={styles.referenceEyebrow}>
              REFERÊNCIA RECONHECIDA
            </Text>
            <Text style={styles.referenceTitle}>
              {formatBibleReference(recognizedReference)}
            </Text>
            <Text style={styles.referenceHelper}>
              A referência foi identificada na versão{" "}
              {selectedVersion?.code ?? selectedVersionId}. Toque para
              abrir no leitor pela primeira passagem.
            </Text>
          </Pressable>
        ) : (
          <View
            accessible
            accessibilityLabel={`Referência reconhecida. ${formatBibleReference(
              recognizedReference,
            )}`}
            style={styles.referenceCard}
            testID="bible-search-reference-card"
          >
            <Text style={styles.referenceEyebrow}>
              REFERÊNCIA RECONHECIDA
            </Text>
            <Text style={styles.referenceTitle}>
              {formatBibleReference(recognizedReference)}
            </Text>
            <Text style={styles.referenceHelper}>
              A referência foi identificada na versão{" "}
              {selectedVersion?.code ?? selectedVersionId}.
            </Text>
          </View>
        )
      ) : null}

      {status === "invalidReference" &&
      invalidReferenceMessage ? (
        <View
          accessibilityLiveRegion="polite"
          style={styles.invalidReferenceCard}
          testID="bible-search-invalid-reference"
        >
          <Text style={styles.invalidReferenceTitle}>
            Revise a referência
          </Text>
          <Text style={styles.invalidReferenceText}>
            {invalidReferenceMessage}
          </Text>
        </View>
      ) : null}

      {activeTextSearch && items.length > 0 ? (
        <View style={styles.resultsHeading}>
          <View>
            <Text style={styles.resultsTitle}>Resultados</Text>
            <Text style={styles.resultsMeta}>
              {activeTextSearch.mode === "WORD"
                ? "Busca por palavra"
                : "Busca por frase"}{" "}
              · {selectedVersion?.code ?? activeTextSearch.versionId}
            </Text>
          </View>
          <Text style={styles.resultsCount}>
            {items.length}
          </Text>
        </View>
      ) : null}
    </View>
  );

  const listEmpty = useMemo(() => {
    if (initializing || status === "searching") {
      return null;
    }

    if (status === "empty") {
      return (
        <View style={styles.emptyState} testID="bible-search-empty">
          <Text style={styles.emptyTitle}>
            Nenhum resultado encontrado
          </Text>
          <Text style={styles.emptyText}>
            Tente outra palavra ou frase, ou confira se a referência foi
            digitada corretamente.
          </Text>
        </View>
      );
    }

    if (status === "error") {
      return (
        <View style={styles.errorState} testID="bible-search-error">
          <Text style={styles.errorStateTitle}>
            Busca indisponível
          </Text>
          <Text style={styles.errorStateText}>
            {feedbackMessage ?? SEARCH_ERROR_MESSAGE}
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tentar busca novamente"
            onPress={() => void executeSearch()}
            style={({ pressed }) => [
              styles.retryButton,
              pressed && styles.pressablePressed,
            ]}
          >
            <Text style={styles.retryButtonText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      );
    }

    return null;
  }, [
    executeSearch,
    feedbackMessage,
    initializing,
    status,
  ]);

  const listFooter =
    activeTextSearch?.hasMore && items.length > 0 ? (
      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Carregar mais"
          accessibilityState={{ disabled: loadingMore }}
          disabled={loadingMore}
          onPress={() => void handleLoadMore()}
          style={({ pressed }) => [
            styles.loadMoreButton,
            pressed && styles.pressablePressed,
            loadingMore && styles.disabledButton,
          ]}
          testID="bible-search-load-more"
        >
          {loadingMore ? (
            <ActivityIndicator color={colors.primary} size="small" />
          ) : (
            <Text style={styles.loadMoreText}>Carregar mais</Text>
          )}
        </Pressable>
      </View>
    ) : (
      <View
        style={[
          styles.footerSpacer,
          Platform.OS !== "web" &&
            recognizedReference !== null &&
            styles.referenceFooterSpacer,
        ]}
      />
    );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
      style={styles.keyboardAvoiding}
    >
      <FlatList
      contentContainerStyle={[
        styles.content,
        keyboardHeight > 0
          ? { paddingBottom: keyboardHeight }
          : null,
      ]}
      data={items}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) =>
        `${item.versionId}:${item.bookId}:${item.chapter}:${item.verse}`
      }
      ListEmptyComponent={listEmpty}
      ListFooterComponent={listFooter}
      ListHeaderComponent={listHeader}
      onScroll={handleScroll}
      ref={listRef}
      renderItem={renderResult}
      scrollEventThrottle={16}
      style={styles.screen}
        testID="bible-search-result-list"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 36,
  },
  headerContent: {
    gap: 18,
  },
  backButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 14,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  pressablePressed: {
    opacity: 0.78,
  },
  hero: {
    borderRadius: 22,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 20,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  title: {
    marginTop: 5,
    color: colors.textInverse,
    fontSize: 27,
    fontWeight: "900",
  },
  subtitle: {
    marginTop: 7,
    color: colors.surfaceHighlight,
    fontSize: 14,
    lineHeight: 21,
  },
  loadingBlock: {
    minHeight: 82,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  searchSection: {
    gap: 10,
  },
  fieldLabel: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "800",
  },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
  },
  searchButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  searchButtonText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "900",
  },
  disabledButton: {
    opacity: 0.55,
  },
  feedbackText: {
    color: colors.warning,
    fontSize: 13,
    lineHeight: 19,
  },
  errorText: {
    color: colors.danger,
  },
  referenceCard: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    padding: 18,
  },
  referenceEyebrow: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  referenceTitle: {
    marginTop: 5,
    color: colors.textStrong,
    fontSize: 22,
    fontWeight: "900",
  },
  referenceHelper: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  invalidReferenceCard: {
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: 18,
    backgroundColor: colors.surfaceHighlight,
    padding: 18,
  },
  invalidReferenceTitle: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "900",
  },
  invalidReferenceText: {
    marginTop: 5,
    color: colors.warning,
    fontSize: 13,
    lineHeight: 19,
  },
  resultsHeading: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    paddingBottom: 10,
  },
  resultsTitle: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "900",
  },
  resultsMeta: {
    marginTop: 3,
    color: colors.textMuted,
    fontSize: 12,
  },
  resultsCount: {
    minWidth: 34,
    textAlign: "center",
    borderRadius: 17,
    overflow: "hidden",
    backgroundColor: colors.secondarySoft,
    color: colors.secondaryPressed,
    fontSize: 13,
    fontWeight: "900",
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  resultCard: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: 16,
  },
  resultReference: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
  },
  resultText: {
    marginTop: 7,
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
  },
  emptyState: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 20,
  },
  emptyTitle: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "900",
  },
  emptyText: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  errorState: {
    marginTop: 18,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 20,
  },
  errorStateTitle: {
    color: colors.danger,
    fontSize: 17,
    fontWeight: "900",
  },
  errorStateText: {
    marginTop: 6,
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  retryButton: {
    minHeight: 44,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginTop: 14,
    borderRadius: 12,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 16,
  },
  retryButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900",
  },
  footer: {
    alignItems: "center",
    paddingTop: 18,
    paddingBottom: 6,
  },
  loadMoreButton: {
    minHeight: 44,
    minWidth: 160,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
  },
  loadMoreText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900",
  },
  footerSpacer: {
    height: 12,
  },
  referenceFooterSpacer: {
    height: 220,
  },
});
