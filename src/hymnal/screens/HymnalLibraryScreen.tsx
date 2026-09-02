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
import { colors } from "../../theme/colors";
import HymnalCatalogList, {
  type HymnalCatalogListHandle,
} from "../components/HymnalCatalogList";
import HymnalNumberJump from "../components/HymnalNumberJump";
import type {
  HymnalHymnSummary,
} from "../repositories/hymnalRepository";
import {
  createSQLiteHymnalRepository,
} from "../repositories/sqliteHymnalRepository";
import {
  HymnalCatalogService,
} from "../services/hymnalCatalogService";

type CatalogStatus =
  | "loading"
  | "ready"
  | "empty"
  | "error";

const LOAD_ERROR_MESSAGE =
  "Não foi possível carregar a Harpa agora.";

export default function HymnalLibraryScreen() {
  const catalogGenerationRef = useRef(0);
  const catalogListRef =
    useRef<HymnalCatalogListHandle | null>(null);

  const [status, setStatus] =
    useState<CatalogStatus>("loading");
  const [edition, setEdition] =
    useState<HymnalEditionMetadata | null>(null);
  const [hymns, setHymns] =
    useState<readonly HymnalHymnSummary[]>([]);
  const [highlightedHymnNumber, setHighlightedHymnNumber] =
    useState<number | null>(null);

  const loadCatalog = useCallback(async () => {
    const generation =
      catalogGenerationRef.current + 1;
    catalogGenerationRef.current = generation;

    setStatus("loading");
    setEdition(null);
    setHymns([]);
    setHighlightedHymnNumber(null);

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
  }, []);

  useEffect(() => {
    void loadCatalog();

    return () => {
      catalogGenerationRef.current += 1;
    };
  }, [loadCatalog]);

  const highestHymnNumber = useMemo(
    () =>
      hymns.length > 0
        ? hymns[hymns.length - 1]?.number ?? 1
        : 1,
    [hymns],
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
      catalogListRef.current?.scrollToIndex(
        targetIndex,
      );

      return true;
    },
    [hymns],
  );

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

        <HymnalNumberJump
          maxNumber={highestHymnNumber}
          onSubmitNumber={handleJumpToNumber}
        />

        <View style={styles.catalogHeading}>
          <View>
            <Text style={styles.catalogEyebrow}>
              CATÁLOGO COMPLETO
            </Text>
            <Text style={styles.catalogTitle}>
              Todos os hinos
            </Text>
          </View>

          <View
            accessible
            accessibilityLabel={`${hymns.length} hinos no catálogo`}
            style={styles.countBadge}
          >
            <Text style={styles.countBadgeText}>
              {hymns.length}
            </Text>
          </View>
        </View>
      </View>

      <HymnalCatalogList
        ref={catalogListRef}
        hymns={hymns}
        highlightedHymnNumber={
          highlightedHymnNumber
        }
      />
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
