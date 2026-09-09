import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { Favorite } from "../domain/favorites/favorite";
import type { AppDrawerScreenProps } from "../navigation/types";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
import { colors } from "../theme/colors";

type FavoritesScreenProps = AppDrawerScreenProps<"Favorites">;
type FavoriteFilter = "all" | "bible_verse" | "hymn";
type LoadStatus = "loading" | "ready" | "error";

const FILTERS: readonly Readonly<{
  key: FavoriteFilter;
  label: string;
}>[] = [
  { key: "all", label: "Todos" },
  { key: "bible_verse", label: "Bíblia" },
  { key: "hymn", label: "Harpa" },
];

function getEmptyMessage(filter: FavoriteFilter): string {
  if (filter === "bible_verse") {
    return "Você ainda não marcou nenhum texto bíblico como favorito.";
  }

  if (filter === "hymn") {
    return "Você ainda não marcou nenhum hino como favorito.";
  }

  return "Seus textos e hinos favoritos aparecerão aqui.";
}

export default function FavoritesScreen({
  navigation,
}: FavoritesScreenProps) {
  const loadGenerationRef = useRef(0);

  const [favorites, setFavorites] =
    useState<readonly Favorite[]>([]);
  const [filter, setFilter] =
    useState<FavoriteFilter>("all");
  const [status, setStatus] =
    useState<LoadStatus>("loading");

  const loadFavorites = useCallback(async () => {
    const generation = ++loadGenerationRef.current;
    setStatus("loading");

    try {
      const nextFavorites =
        await getPersonalPlatformHub().favoritesService.list();

      if (generation !== loadGenerationRef.current) {
        return;
      }

      setFavorites(nextFavorites);
      setStatus("ready");
    } catch {
      if (generation !== loadGenerationRef.current) {
        return;
      }

      setStatus("error");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadFavorites();

      return () => {
        loadGenerationRef.current += 1;
      };
    }, [loadFavorites]),
  );

  const visibleFavorites = useMemo(() => {
    if (filter === "all") {
      return favorites;
    }

    return favorites.filter(
      (favorite) => favorite.target.kind === filter,
    );
  }, [favorites, filter]);

  const openFavorite = useCallback(
    (favorite: Favorite) => {
      if (favorite.target.kind === "bible_verse") {
        navigation.navigate("MainTabs", {
          screen: "BibleTab",
          params: {
            screen: "BibleReader",
            params: {
              versionId: favorite.target.versionId,
              bookId: favorite.target.bookId,
              chapter: favorite.target.chapter,
              verse: favorite.target.verse,
            },
          },
        });
        return;
      }

      navigation.navigate("MainTabs", {
        screen: "HymnalTab",
        params: {
          screen: "HymnalReader",
          params: {
            editionId: favorite.target.editionId,
            hymnId: favorite.target.hymnId,
          },
        },
      });
    },
    [navigation],
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          testID="favorites-library-hero"
          source={require("../../assets/module-heroes/favorites-hero.png")}
          style={styles.headerHero}
          imageStyle={styles.headerHeroImage}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        >
          <View style={styles.headerHeroOverlay}>
            <Text style={styles.heroEyebrow}>FAVORITOS</Text>
            <Text style={styles.heroTitle}>Favoritos</Text>
            <Text style={styles.heroSubtitle}>
              Seus textos e hinos marcados em um só lugar
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.filterRow}>
          {FILTERS.map((item) => {
            const selected = filter === item.key;

            return (
              <Pressable
                key={item.key}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                accessibilityLabel={`Filtrar favoritos por ${item.label}`}
                onPress={() => setFilter(item.key)}
                style={({ pressed }) => [
                  styles.filterChip,
                  selected && styles.filterChipSelected,
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selected && styles.filterChipTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {status === "loading" && (
          <View style={styles.stateCard}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />
            <Text style={styles.stateTitle}>
              Carregando favoritos...
            </Text>
          </View>
        )}

        {status === "error" && (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>
              Não foi possível carregar seus favoritos agora.
            </Text>
            <Text style={styles.stateText}>
              Tente novamente para atualizar sua lista.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tentar carregar favoritos novamente"
              onPress={() => {
                void loadFavorites();
              }}
              style={({ pressed }) => [
                styles.retryButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.retryButtonText}>
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        )}

        {status === "ready" &&
          visibleFavorites.length === 0 && (
            <View style={styles.stateCard}>
              <Text style={styles.stateTitle}>
                Nada por aqui ainda
              </Text>
              <Text style={styles.stateText}>
                {getEmptyMessage(filter)}
              </Text>
            </View>
          )}

        {status === "ready" &&
          visibleFavorites.length > 0 && (
            <View style={styles.list}>
              {visibleFavorites.map((favorite) => {
                if (favorite.target.kind === "bible_verse") {
                  const reference =
                    `${String(favorite.target.bookId).toUpperCase()} ` +
                    `${favorite.target.chapter}:${favorite.target.verse}`;

                  return (
                    <Pressable
                      key={favorite.id}
                      accessibilityRole="button"
                      accessibilityLabel={`Abrir favorito bíblico ${reference}`}
                      onPress={() => openFavorite(favorite)}
                      style={({ pressed }) => [
                        styles.favoriteCard,
                        pressed && styles.favoriteCardPressed,
                      ]}
                    >
                      <View style={styles.cardTopLine}>
                        <View style={styles.kindBadge}>
                          <Text style={styles.kindBadgeText}>
                            Bíblia
                          </Text>
                        </View>
                        <Text style={styles.openHint}>Abrir</Text>
                      </View>
                      <Text style={styles.favoriteTitle}>
                        {reference}
                      </Text>
                      <Text style={styles.favoriteMeta}>
                        Versão {favorite.target.versionId}
                      </Text>
                    </Pressable>
                  );
                }

                const hymnLabel =
                  `Hino ${String(favorite.target.hymnId)}`;

                return (
                  <Pressable
                    key={favorite.id}
                    accessibilityRole="button"
                    accessibilityLabel={`Abrir ${hymnLabel}`}
                    onPress={() => openFavorite(favorite)}
                    style={({ pressed }) => [
                      styles.favoriteCard,
                      pressed && styles.favoriteCardPressed,
                    ]}
                  >
                    <View style={styles.cardTopLine}>
                      <View style={styles.kindBadge}>
                        <Text style={styles.kindBadgeText}>
                          Harpa
                        </Text>
                      </View>
                      <Text style={styles.openHint}>Abrir</Text>
                    </View>
                    <Text style={styles.favoriteTitle}>
                      {hymnLabel}
                    </Text>
                    <Text style={styles.favoriteMeta}>
                      Edição {favorite.target.editionId}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
      </ScrollView>
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
  headerHero: {
    borderRadius: 24,
    minHeight: 240,
    overflow: "hidden",
  },
  headerHeroImage: {
    borderRadius: 24,
  },
  headerHeroOverlay: {
    backgroundColor: "rgba(13, 43, 69, 0.56)",
    flex: 1,
    gap: 9,
    justifyContent: "flex-end",
    minHeight: 240,
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  heroEyebrow: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  heroTitle: {
    color: colors.textInverse,
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 33,
  },
  heroSubtitle: {
    color: colors.textInverse,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.92,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    minHeight: 40,
    justifyContent: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  filterChipText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
  },
  filterChipTextSelected: {
    color: colors.textInverse,
  },
  stateCard: {
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  stateTitle: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },
  stateText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 4,
    minHeight: 42,
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  retryButtonText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: "800",
  },
  list: {
    gap: 10,
  },
  favoriteCard: {
    gap: 7,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  favoriteCardPressed: {
    opacity: 0.82,
  },
  cardTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  kindBadge: {
    borderRadius: 999,
    backgroundColor: colors.secondarySoft,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  kindBadgeText: {
    color: colors.textStrong,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  openHint: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  favoriteTitle: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 23,
  },
  favoriteMeta: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.82,
  },
});
