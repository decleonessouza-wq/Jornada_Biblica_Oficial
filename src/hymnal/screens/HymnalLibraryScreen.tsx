import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type {
  HymnalEditionMetadata,
} from "../../domain/hymnal/hymnalEdition";
import type {
  HymnalStackScreenProps,
} from "../../navigation/types";
import { colors } from "../../theme/colors";
import HymnalCatalogList, {
  type HymnalCatalogListHandle,
} from "../components/HymnalCatalogList";
import HymnalNumberJump from "../components/HymnalNumberJump";
import HymnalSearchControls from "../components/HymnalSearchControls";
import type {
  HymnalHymnSummary,
} from "../repositories/hymnalRepository";
import {
  HYMNAL_SEARCH_DEFAULT_LIMIT,
  type HymnalSearchRepository,
  type HymnalSearchTextMode,
} from "../repositories/hymnalSearchRepository";
import {
  createSQLiteHymnalRepository,
} from "../repositories/sqliteHymnalRepository";
import {
  createSQLiteHymnalSearchRepository,
} from "../repositories/sqliteHymnalSearchRepository";
import {
  HymnalCatalogService,
} from "../services/hymnalCatalogService";

type CatalogStatus =
  | "loading"
  | "ready"
  | "empty"
  | "error";

type ActiveSearch = Readonly<{
  query: string;
  mode: HymnalSearchTextMode;
}>;

const LOAD_ERROR_MESSAGE =
  "Não foi possível carregar a Harpa agora.";

const SEARCH_ERROR_MESSAGE =
  "Não foi possível buscar na Harpa agora.";

export default function HymnalLibraryScreen({
  navigation,
}: HymnalStackScreenProps<"HymnalLibrary">) {
  const catalogGenerationRef = useRef(0);
  const searchGenerationRef = useRef(0);
  const catalogListRef =
    useRef<HymnalCatalogListHandle | null>(null);
  const searchRepositoryRef =
    useRef<HymnalSearchRepository | null>(null);
  const pendingCatalogJumpIndexRef =
    useRef<number | null>(null);

  const [status, setStatus] =
    useState<CatalogStatus>("loading");
  const [edition, setEdition] =
    useState<HymnalEditionMetadata | null>(null);
  const [hymns, setHymns] =
    useState<readonly HymnalHymnSummary[]>([]);
  const [highlightedHymnNumber, setHighlightedHymnNumber] =
    useState<number | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");
  const [searchMode, setSearchMode] =
    useState<HymnalSearchTextMode>("WORD");
  const [activeSearch, setActiveSearch] =
    useState<ActiveSearch | null>(null);
  const [searchResults, setSearchResults] =
    useState<readonly HymnalHymnSummary[]>([]);
  const [searchHasMore, setSearchHasMore] =
    useState(false);
  const [searching, setSearching] =
    useState(false);
  const [loadingMore, setLoadingMore] =
    useState(false);
  const [searchError, setSearchError] =
    useState<string | null>(null);

  const clearSearchState = useCallback(
    (clearInput: boolean) => {
      searchGenerationRef.current += 1;
      setActiveSearch(null);
      setSearchResults([]);
      setSearchHasMore(false);
      setSearching(false);
      setLoadingMore(false);
      setSearchError(null);

      if (clearInput) {
        setSearchQuery("");
      }
    },
    [],
  );

  const loadCatalog = useCallback(async () => {
    const generation =
      catalogGenerationRef.current + 1;
    catalogGenerationRef.current = generation;

    setStatus("loading");
    setEdition(null);
    setHymns([]);
    setHighlightedHymnNumber(null);
    searchRepositoryRef.current = null;
    pendingCatalogJumpIndexRef.current = null;
    clearSearchState(true);

    try {
      const repository =
        await createSQLiteHymnalRepository();
      const service =
        new HymnalCatalogService(repository);
      const editions =
        await service.listEditions();

      if (
        catalogGenerationRef.current !== generation
      ) {
        return;
      }

      const availableEdition = editions[0] ?? null;

      if (!availableEdition) {
        setStatus("empty");
        return;
      }

      const catalog =
        await service.listHymns(
          availableEdition.id,
        );

      if (
        catalogGenerationRef.current !== generation
      ) {
        return;
      }

      if (
        catalog.length !==
        availableEdition.expectedHymnCount
      ) {
        throw new Error(
          `HYMNAL_LIBRARY_EXPECTED_HYMN_COUNT_MISMATCH:EXPECTED=${availableEdition.expectedHymnCount}:ACTUAL=${catalog.length}`,
        );
      }

      setEdition(availableEdition);
      setHymns(catalog);
      setStatus(
        catalog.length > 0 ? "ready" : "empty",
      );
    } catch (error) {
      if (
        catalogGenerationRef.current !== generation
      ) {
        return;
      }

      console.warn(
        "HYMNAL_LIBRARY_LOAD_FAILED",
        error,
      );
      setEdition(null);
      setHymns([]);
      setHighlightedHymnNumber(null);
      setStatus("error");
    }
  }, [clearSearchState]);

  useEffect(() => {
    void loadCatalog();

    return () => {
      catalogGenerationRef.current += 1;
      searchGenerationRef.current += 1;
    };
  }, [loadCatalog]);

  useEffect(() => {
    if (
      activeSearch !== null ||
      pendingCatalogJumpIndexRef.current === null
    ) {
      return;
    }

    const targetIndex =
      pendingCatalogJumpIndexRef.current;
    pendingCatalogJumpIndexRef.current = null;

    const animationFrame =
      requestAnimationFrame(() => {
        catalogListRef.current?.scrollToIndex(
          targetIndex,
        );
      });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [activeSearch]);

  const highestHymnNumber = useMemo(
    () =>
      hymns.length > 0
        ? hymns[hymns.length - 1]?.number ?? 1
        : 1,
    [hymns],
  );

  const displayedHymns = useMemo(
    () =>
      activeSearch !== null
        ? searchResults
        : hymns,
    [activeSearch, hymns, searchResults],
  );

  const handleOpenHymn = useCallback(
    (hymn: HymnalHymnSummary) => {
      navigation.navigate("HymnalReader", {
        editionId: hymn.editionId,
        hymnId: hymn.id,
      });
    },
    [navigation],
  );

  const handleJumpToNumber = useCallback(
    (hymnNumber: number): boolean => {
      const targetIndex =
        hymns.findIndex(
          (hymn) => hymn.number === hymnNumber,
        );

      if (targetIndex < 0) {
        return false;
      }

      setHighlightedHymnNumber(hymnNumber);

      if (activeSearch !== null) {
        pendingCatalogJumpIndexRef.current =
          targetIndex;
        clearSearchState(true);
        return true;
      }

      catalogListRef.current?.scrollToIndex(
        targetIndex,
      );

      return true;
    },
    [
      activeSearch,
      clearSearchState,
      hymns,
    ],
  );

  const validateSearchInput = useCallback(
    (): string | null => {
      const trimmedQuery = searchQuery.trim();

      if (trimmedQuery.length === 0) {
        return "Digite uma palavra ou frase para buscar.";
      }

      if (
        searchMode === "WORD" &&
        trimmedQuery.split(/\s+/).length !== 1
      ) {
        return "No modo Palavra, digite apenas uma palavra.";
      }

      return null;
    },
    [searchMode, searchQuery],
  );

  const handleSearch = useCallback(async () => {
    if (!edition || searching || loadingMore) {
      return;
    }

    const validationMessage =
      validateSearchInput();

    if (validationMessage) {
      setSearchError(validationMessage);
      return;
    }

    const query = searchQuery.trim();
    const mode = searchMode;
    const generation =
      searchGenerationRef.current + 1;
    searchGenerationRef.current = generation;

    setSearching(true);
    setSearchError(null);
    setHighlightedHymnNumber(null);

    try {
      let repository =
        searchRepositoryRef.current;

      if (!repository) {
        repository =
          await createSQLiteHymnalSearchRepository();
        searchRepositoryRef.current = repository;
      }

      const page =
        await repository.searchText({
          editionId: edition.id,
          query,
          mode,
          offset: 0,
          limit: HYMNAL_SEARCH_DEFAULT_LIMIT,
        });

      if (
        searchGenerationRef.current !== generation
      ) {
        return;
      }

      setSearchQuery(query);
      setActiveSearch({
        query,
        mode,
      });
      setSearchResults(page.items);
      setSearchHasMore(page.hasMore);
    } catch (error) {
      if (
        searchGenerationRef.current !== generation
      ) {
        return;
      }

      console.warn(
        "HYMNAL_LIBRARY_SEARCH_FAILED",
        error,
      );
      setSearchError(SEARCH_ERROR_MESSAGE);
    } finally {
      if (
        searchGenerationRef.current === generation
      ) {
        setSearching(false);
      }
    }
  }, [
    edition,
    loadingMore,
    searchMode,
    searchQuery,
    searching,
    validateSearchInput,
  ]);

  const handleLoadMore = useCallback(async () => {
    if (
      !edition ||
      !activeSearch ||
      !searchHasMore ||
      searching ||
      loadingMore
    ) {
      return;
    }

    const generation =
      searchGenerationRef.current + 1;
    searchGenerationRef.current = generation;

    setLoadingMore(true);
    setSearchError(null);

    try {
      let repository =
        searchRepositoryRef.current;

      if (!repository) {
        repository =
          await createSQLiteHymnalSearchRepository();
        searchRepositoryRef.current = repository;
      }

      const page =
        await repository.searchText({
          editionId: edition.id,
          query: activeSearch.query,
          mode: activeSearch.mode,
          offset: searchResults.length,
          limit: HYMNAL_SEARCH_DEFAULT_LIMIT,
        });

      if (
        searchGenerationRef.current !== generation
      ) {
        return;
      }

      setSearchResults((current) => [
        ...current,
        ...page.items,
      ]);
      setSearchHasMore(page.hasMore);
    } catch (error) {
      if (
        searchGenerationRef.current !== generation
      ) {
        return;
      }

      console.warn(
        "HYMNAL_LIBRARY_SEARCH_MORE_FAILED",
        error,
      );
      setSearchError(
        "Não foi possível carregar mais resultados agora.",
      );
    } finally {
      if (
        searchGenerationRef.current === generation
      ) {
        setLoadingMore(false);
      }
    }
  }, [
    activeSearch,
    edition,
    loadingMore,
    searchHasMore,
    searchResults.length,
    searching,
  ]);

  const handleClearSearch = useCallback(() => {
    pendingCatalogJumpIndexRef.current = null;
    clearSearchState(true);
  }, [clearSearchState]);

  if (status === "loading") {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
        <Text
          accessibilityRole="header"
          style={styles.centerTitle}
        >
          Preparando a Harpa
        </Text>
        <Text style={styles.centerText}>
          Carregando o catálogo offline de hinos.
        </Text>
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.centerState}>
        <Text
          accessibilityRole="header"
          style={styles.centerTitle}
        >
          Não foi possível abrir a Harpa
        </Text>
        <Text style={styles.centerText}>
          {LOAD_ERROR_MESSAGE}
        </Text>
      </View>
    );
  }

  if (
    status === "empty" ||
    !edition ||
    hymns.length === 0
  ) {
    return (
      <View style={styles.centerState}>
        <Text
          accessibilityRole="header"
          style={styles.centerTitle}
        >
          Catálogo indisponível
        </Text>
        <Text style={styles.centerText}>
          Nenhum hino habilitado foi encontrado.
        </Text>
      </View>
    );
  }

  const showingSearchResults =
    activeSearch !== null;

  return (
    <View style={styles.screen}>
      <View style={styles.headerArea}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>
            HARPA CRISTÃ
          </Text>
          <Text
            accessibilityRole="header"
            style={styles.title}
          >
            Biblioteca de hinos
          </Text>
          <Text style={styles.description}>
            {edition.displayName} · {hymns.length} hinos
            disponíveis offline.
          </Text>
        </View>

        <HymnalSearchControls
          query={searchQuery}
          mode={searchMode}
          active={showingSearchResults}
          resultCount={searchResults.length}
          hasMore={searchHasMore}
          searching={searching}
          loadingMore={loadingMore}
          errorMessage={searchError}
          onChangeQuery={(value) => {
            setSearchQuery(value);
            setSearchError(null);
          }}
          onChangeMode={(mode) => {
            setSearchMode(mode);
            setSearchError(null);
          }}
          onSubmit={() => {
            void handleSearch();
          }}
          onClear={handleClearSearch}
          onLoadMore={() => {
            void handleLoadMore();
          }}
        />

        <HymnalNumberJump
          maxNumber={highestHymnNumber}
          onSubmitNumber={handleJumpToNumber}
        />

        <View style={styles.catalogHeading}>
          <View style={styles.catalogHeadingText}>
            <Text style={styles.catalogEyebrow}>
              {showingSearchResults
                ? "RESULTADOS DA BUSCA"
                : "CATÁLOGO COMPLETO"}
            </Text>
            <Text style={styles.catalogTitle}>
              {showingSearchResults
                ? `“${activeSearch.query}”`
                : "Todos os hinos"}
            </Text>
          </View>

          <View
            accessible
            accessibilityLabel={
              showingSearchResults
                ? `${searchResults.length} resultados carregados`
                : `${hymns.length} hinos no catálogo`
            }
            style={styles.countBadge}
          >
            <Text style={styles.countBadgeText}>
              {displayedHymns.length}
            </Text>
          </View>
        </View>
      </View>

      {showingSearchResults &&
      searchResults.length === 0 ? (
        <View style={styles.emptySearchState}>
          <Text style={styles.emptySearchTitle}>
            Nenhum hino encontrado
          </Text>
          <Text style={styles.emptySearchText}>
            Tente outra palavra ou frase, ou limpe a
            busca para voltar ao catálogo completo.
          </Text>
        </View>
      ) : (
        <HymnalCatalogList
          ref={catalogListRef}
          hymns={displayedHymns}
          highlightedHymnNumber={
            highlightedHymnNumber
          }
          onPressHymn={handleOpenHymn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerArea: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  hero: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  eyebrow: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  title: {
    color: colors.textInverse,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
    marginTop: 8,
  },
  description: {
    color: colors.textInverse,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    opacity: 0.86,
  },
  catalogHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 20,
  },
  catalogHeadingText: {
    flex: 1,
    minWidth: 0,
    paddingRight: 12,
  },
  catalogEyebrow: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.9,
  },
  catalogTitle: {
    color: colors.textStrong,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 3,
  },
  countBadge: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderRadius: 18,
    justifyContent: "center",
    minHeight: 36,
    minWidth: 52,
    paddingHorizontal: 12,
  },
  countBadgeText: {
    color: colors.textStrong,
    fontSize: 14,
    fontWeight: "800",
  },
  emptySearchState: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 48,
    paddingHorizontal: 28,
  },
  emptySearchTitle: {
    color: colors.textStrong,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  emptySearchText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    textAlign: "center",
  },
  centerState: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  centerTitle: {
    color: colors.textStrong,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 14,
    textAlign: "center",
  },
  centerText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: "center",
  },
});
