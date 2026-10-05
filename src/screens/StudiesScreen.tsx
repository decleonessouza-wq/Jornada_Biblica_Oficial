import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { devotionalRuntimeCatalog } from "../devotionals/runtime/devotionalRuntimeCatalog";
import { useAppShellChrome } from "../navigation/AppShellChromeContext";
import type { StudiesStackScreenProps } from "../navigation/types";
import {
  studyIconAssetManifest,
  type StudyTrackId,
} from "../studies/presentation/studyAssetManifest";
import { studyTrackPresentationCatalog } from "../studies/presentation/studyTrackPresentationCatalog";
import { studyRuntimeCatalog } from "../studies/runtime/studyRuntimeCatalog";
import { colors } from "../theme/colors";

type Props = StudiesStackScreenProps<"StudiesHome">;

type FilterKey =
  | "ALL"
  | "BEGINNER"
  | "CHRISTIAN_LIFE"
  | "DEVOTIONAL"
  | "COLLABORATIVE";

type TrackPresentationCategory =
  | "FORMATION"
  | "CHRISTIAN_LIFE"
  | "DEVOTIONAL"
  | "COLLABORATIVE";

const CARD_HEIGHT = 136;
const CARD_IMAGE_WIDTH = 148;
const CARD_IMAGE_HEIGHT = 96;

const FILTERS = [
  {
    key: "ALL",
    label: "Todas",
    icon: null,
  },
  {
    key: "BEGINNER",
    label: "Iniciante",
    icon: studyIconAssetManifest.leia,
  },
  {
    key: "CHRISTIAN_LIFE",
    label: "Vida cristã",
    icon: studyIconAssetManifest.aplique,
  },
  {
    key: "DEVOTIONAL",
    label: "Devocional",
    icon: studyIconAssetManifest.ore,
  },
  {
    key: "COLLABORATIVE",
    label: "Colaborativos",
    icon: studyIconAssetManifest.modoGrupo,
  },
] as const satisfies readonly Readonly<{
  key: FilterKey;
  label: string;
  icon: (typeof studyIconAssetManifest)[keyof typeof studyIconAssetManifest] | null;
}>[];

const APPROVED_TRACK_DESCRIPTIONS: Readonly<
  Record<StudyTrackId, string>
> = Object.freeze({
  "track-01":
    "Da criação à nova terra: entenda o plano de Deus para salvar o homem.",
  "track-02":
    "Descubra quem Deus é por meio de Seus atributos, caráter e fidelidade.",
  "track-03":
    "Conheça a pessoa, obra, ensino, cruz, ressurreição e reino de Jesus.",
  "track-04":
    "Aprenda como viver a fé no dia a dia com transformação, oração e santidade.",
  "track-05":
    "Conteúdos produzidos por irmãos da igreja, revisados e aprovados para edificação.",
  "track-06":
    "Temas atuais e sensíveis para fortalecer a vida espiritual à luz da Bíblia.",
});

const getTrackPresentationCategory = (
  trackId: string,
): TrackPresentationCategory => {
  switch (trackId) {
    case "track-04":
      return "CHRISTIAN_LIFE";
    case "track-05":
      return "COLLABORATIVE";
    case "track-06":
      return "DEVOTIONAL";
    default:
      return "FORMATION";
  }
};

const getTrackCategoryLabel = (
  category: TrackPresentationCategory,
): string => {
  switch (category) {
    case "CHRISTIAN_LIFE":
      return "Vida cristã";
    case "DEVOTIONAL":
      return "Devocional";
    case "COLLABORATIVE":
      return "Colaborativo";
    default:
      return "Formação";
  }
};

const resolveTrackDescription = (
  trackId: StudyTrackId,
  title: string,
  runtimeDescription: string,
): string => {
  const normalizedTitle = title.trim().toLocaleLowerCase("pt-BR");
  const normalizedDescription = runtimeDescription
    .trim()
    .toLocaleLowerCase("pt-BR");
  const runtimeIsDescriptive =
    normalizedDescription.length >= 36 &&
    normalizedDescription !== normalizedTitle;

  if (runtimeIsDescriptive) {
    return runtimeDescription.trim();
  }

  return APPROVED_TRACK_DESCRIPTIONS[trackId];
};

const getCategoryBadgeStyle = (
  category: TrackPresentationCategory,
) => {
  switch (category) {
    case "CHRISTIAN_LIFE":
      return {
        container: styles.categoryBadgeChristianLife,
        text: styles.categoryBadgeTextChristianLife,
      };
    case "COLLABORATIVE":
      return {
        container: styles.categoryBadgeCollaborative,
        text: styles.categoryBadgeTextCollaborative,
      };
    case "DEVOTIONAL":
      return {
        container: styles.categoryBadgeDevotional,
        text: styles.categoryBadgeTextDevotional,
      };
    default:
      return {
        container: styles.categoryBadgeFormation,
        text: styles.categoryBadgeTextFormation,
      };
  }
};

export const shouldExposeStudyTrackPresentation = (
  trackId: StudyTrackId,
  runtimeTrackAvailable: boolean,
): boolean =>
  runtimeTrackAvailable || trackId === "track-05";

export default function StudiesScreen({ navigation }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTrack05Info, setShowTrack05Info] = useState(false);
  const track05InfoAcknowledgedRef = useRef(false);
  const { resetChrome } = useAppShellChrome();

  useFocusEffect(
    useCallback(() => {
      resetChrome();
    }, [resetChrome]),
  );

  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.getParent()?.navigate("HomeTab");
  }, [navigation]);

  const handleToggleSearch = useCallback(() => {
    if (searchOpen) {
      setSearchQuery("");
      setSearchOpen(false);
      return;
    }

    setSearchOpen(true);
  }, [searchOpen]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          accessibilityLabel="Voltar"
          accessibilityRole="button"
          hitSlop={10}
          onPress={handleBack}
          style={({ pressed }) => [
            styles.headerAction,
            pressed && styles.headerActionPressed,
          ]}
          testID="studies-header-back"
        >
          <Text style={styles.headerBackSymbol}>‹</Text>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable
          accessibilityLabel={
            searchOpen ? "Fechar pesquisa" : "Pesquisar estudos"
          }
          accessibilityRole="button"
          hitSlop={10}
          onPress={handleToggleSearch}
          style={({ pressed }) => [
            styles.headerAction,
            pressed && styles.headerActionPressed,
          ]}
          testID="studies-header-search"
        >
          <Text style={styles.headerSearchSymbol}>
            {searchOpen ? "×" : "⌕"}
          </Text>
        </Pressable>
      ),
    });
  }, [
    handleBack,
    handleToggleSearch,
    navigation,
    searchOpen,
  ]);

  const tracks = useMemo(
    () =>
      [...studyTrackPresentationCatalog]
        .sort((left, right) => left.order - right.order)
        .flatMap((presentation) => {
          const runtimeTrack =
            studyRuntimeCatalog.tracks.find(
              (candidate) => candidate.id === presentation.trackId,
            ) ?? null;

          if (
            !shouldExposeStudyTrackPresentation(
              presentation.trackId,
              runtimeTrack !== null,
            )
          ) {
            return [];
          }

          const studies = studyRuntimeCatalog.studies
            .filter(
              (entry) =>
                entry.content.trackId === presentation.trackId,
            )
            .sort(
              (left, right) =>
                left.content.number - right.content.number,
            );

          const trackTitle =
            runtimeTrack?.title ?? presentation.title;
          const runtimeDescription =
            runtimeTrack?.description ?? "";
          const category = getTrackPresentationCategory(
            presentation.trackId,
          );
          const description = resolveTrackDescription(
            presentation.trackId,
            trackTitle,
            runtimeDescription,
          );

          return [
            {
              presentation,
              trackTitle,
              studies,
              category,
              description,
            },
          ];
        }),
    [],
  );

  const visibleTracks = useMemo(() => {
    const normalizedQuery = searchQuery
      .trim()
      .toLocaleLowerCase("pt-BR");

    return tracks.filter(
      ({
        category,
        description,
        trackTitle,
        studies,
      }) => {
        let filterMatches = true;

        switch (activeFilter) {
          case "BEGINNER":
            filterMatches = studies.some(
              (entry) =>
                entry.content.audienceLevel === "BEGINNER",
            );
            break;
          case "CHRISTIAN_LIFE":
            filterMatches = category === "CHRISTIAN_LIFE";
            break;
          case "DEVOTIONAL":
            filterMatches = category === "DEVOTIONAL";
            break;
          case "COLLABORATIVE":
            filterMatches = category === "COLLABORATIVE";
            break;
          default:
            filterMatches = true;
        }

        if (!filterMatches) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const searchableText = [
          trackTitle,
          description,
          getTrackCategoryLabel(category),
        ]
          .join(" ")
          .toLocaleLowerCase("pt-BR");

        return searchableText.includes(normalizedQuery);
      },
    );
  }, [activeFilter, searchQuery, tracks]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      style={styles.screen}
      testID="studies-screen"
    >
      <View style={styles.intro}>
        <Text style={styles.subtitle}>
          Aprenda, reflita e cresça na Palavra.
        </Text>
      </View>

      {searchOpen ? (
        <View style={styles.searchRow}>
          <Text
            accessibilityElementsHidden
            importantForAccessibility="no"
            style={styles.searchInlineIcon}
          >
            ⌕
          </Text>
          <TextInput
            accessibilityLabel="Pesquisar trilhas"
            autoFocus
            onChangeText={setSearchQuery}
            placeholder="Pesquisar trilhas"
            placeholderTextColor={colors.textMuted}
            returnKeyType="search"
            style={styles.searchInput}
            testID="studies-search-input"
            value={searchQuery}
          />
          {searchQuery ? (
            <Pressable
              accessibilityLabel="Limpar pesquisa"
              accessibilityRole="button"
              hitSlop={8}
              onPress={() => setSearchQuery("")}
              style={styles.searchClear}
              testID="studies-search-clear"
            >
              <Text style={styles.searchClearText}>×</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}

      <ScrollView
        contentContainerStyle={styles.filterRow}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroller}
      >
        {FILTERS.map((filter) => {
          const selected = filter.key === activeFilter;

          return (
            <Pressable
              key={filter.key}
              accessibilityLabel={filter.label}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => setActiveFilter(filter.key)}
              style={({ pressed }) => [
                styles.filterChip,
                selected && styles.filterChipSelected,
                pressed && styles.filterChipPressed,
              ]}
              testID={`studies-filter-${filter.key.toLowerCase()}`}
            >
              {filter.icon ? (
                <Image
                  accessible={false}
                  importantForAccessibility="no"
                  resizeMode="contain"
                  source={filter.icon}
                  style={[
                    styles.filterIcon,
                    selected && styles.filterIconSelected,
                  ]}
                  testID={`studies-filter-icon-${filter.key.toLowerCase()}`}
                />
              ) : null}

              <Text
                style={[
                  styles.filterChipText,
                  selected && styles.filterChipTextSelected,
                ]}
              >
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {visibleTracks.length === 0 ? (
        <View style={styles.emptyCard} testID="studies-empty-state">
          <Text style={styles.emptyTitle}>
            Nenhuma trilha encontrada
          </Text>
          <Text style={styles.emptyText}>
            Ajuste a pesquisa ou escolha outra categoria.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {visibleTracks.map(
            ({
              presentation,
              trackTitle,
              studies,
              category,
              description,
            }) => {
              const studyCount = studies.length;
              const isTrack05 = presentation.trackId === "track-05";
              const devotionalCount = isTrack05
                ? devotionalRuntimeCatalog.devotionals.filter(
                    ({ content }) => content.placement === "TRACK_05",
                  ).length
                : 0;
              const contentCount = studyCount + devotionalCount;
              let contentNoun = studyCount === 1 ? "estudo" : "estudos";
              if (isTrack05) {
                contentNoun = contentCount === 1 ? "conteúdo" : "conteúdos";
              }
              const categoryLabel =
                getTrackCategoryLabel(category);
              const badgeStyle =
                getCategoryBadgeStyle(category);

              return (
                <Pressable
                  key={presentation.trackId}
                  accessibilityLabel={`Abrir ${trackTitle}`}
                  accessibilityRole="button"
                  onPress={() => {
                    if (
                      presentation.trackId === "track-05" &&
                      !track05InfoAcknowledgedRef.current
                    ) {
                      setShowTrack05Info(true);
                      return;
                    }

                    navigation.navigate("StudyTrack", {
                      trackId: presentation.trackId,
                    });
                  }}
                  style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed,
                  ]}
                  testID={`study-track-${presentation.trackId}`}
                >
                  <View style={styles.cardImageFrame}>
                    <Image
                      accessible={false}
                      importantForAccessibility="no"
                      resizeMode="cover"
                      source={presentation.assets.card}
                      style={styles.cardImage}
                      testID={`study-track-image-${presentation.trackId}`}
                    />
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.trackLabel}>
                      Trilha {presentation.order} ·
                    </Text>

                    <Text style={styles.cardTitle}>
                      {trackTitle}
                    </Text>

                    <Text
                      numberOfLines={2}
                      style={styles.cardDescription}
                    >
                      {description}
                    </Text>

                    <View style={styles.cardMetaRow}>
                      <Text
                        style={styles.cardCount}
                        testID={`study-track-count-${presentation.trackId}`}
                      >
                        ▣ {contentCount}{" "}
                        {contentNoun}
                      </Text>

                      <View
                        style={[
                          styles.categoryBadge,
                          badgeStyle.container,
                        ]}
                        testID={`study-track-category-${presentation.trackId}`}
                      >
                        <Text
                          style={[
                            styles.categoryBadgeText,
                            badgeStyle.text,
                          ]}
                        >
                          {categoryLabel}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text
                    accessibilityElementsHidden
                    importantForAccessibility="no"
                    style={styles.chevron}
                  >
                    ›
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>
      )}
      <Modal
        animationType="slide"
        onRequestClose={() => setShowTrack05Info(false)}
        transparent
        visible={showTrack05Info}
      >
        <View style={styles.track5InfoOverlay} testID="track5-info-sheet">
          <Pressable
            accessibilityLabel="Fechar informações da Trilha 5"
            accessibilityRole="button"
            onPress={() => setShowTrack05Info(false)}
            style={styles.track5InfoBackdrop}
            testID="track5-info-backdrop"
          />
          <View style={styles.track5InfoCard}>
            <View style={styles.track5InfoHandle} />

            <ScrollView
              contentContainerStyle={styles.track5InfoBodyContent}
              showsVerticalScrollIndicator={false}
              style={styles.track5InfoBody}
            >
              <Text style={styles.track5InfoTitle}>Estudos Colaborativos</Text>
              <Text style={styles.track5InfoSubtitle}>
                Diferentes experiências. Uma mesma busca pela Palavra.
              </Text>

              <Text style={styles.track5InfoText}>
                Esta trilha reúne estudos e devocionais enviados{" "}
                <Text style={styles.track5InfoStrong}>
                  voluntariamente por cristãos evangélicos
                </Text>{" "}
                convidados a compartilhar conhecimento, experiências e
                reflexões bíblicas para edificação de outros leitores.
              </Text>

              <Text style={styles.track5InfoText}>
                Entre os colaboradores há{" "}
                <Text style={styles.track5InfoStrong}>
                  jovens, membros da igreja, obreiros, professores, pastores,
                  ministros da Palavra e teólogos
                </Text>
                , trazendo diferentes temas, vivências e formas de abordar as
                Escrituras.
              </Text>

              <Text style={styles.track5InfoText}>
                Os conteúdos passam por{" "}
                <Text style={styles.track5InfoStrong}>
                  leitura, revisão e organização editorial
                </Text>{" "}
                antes da publicação. Ainda assim, por se tratarem de
                contribuições autorais,{" "}
                <Text style={styles.track5InfoStrong}>
                  as interpretações, opiniões e enfoques apresentados pertencem
                  aos seus respectivos autores e não representam necessariamente
                  o posicionamento oficial do Bíblia Jornada
                </Text>
                .
              </Text>

              <Text style={styles.track5InfoText}>
                A proposta desta trilha é justamente ampliar o aprendizado por
                meio de uma{" "}
                <Text style={styles.track5InfoStrong}>
                  diversidade saudável de perspectivas dentro da fé cristã
                  evangélica
                </Text>
                , mantendo a Bíblia como referência principal e buscando sempre{" "}
                <Text style={styles.track5InfoStrong}>
                  edificação, reflexão e crescimento espiritual
                </Text>
                .
              </Text>

              <Text style={styles.track5InfoQuote}>
                Leia com atenção, confira nas Escrituras e permita que cada
                estudo seja um convite para conhecer ainda mais a Palavra de
                Deus.
              </Text>

              <Text style={styles.track5InfoBrand}>Bíblia Jornada</Text>
              <Text style={styles.track5InfoTagline}>
                Aprenda. Reflita. Cresça na Palavra.
              </Text>
            </ScrollView>

            <Pressable
              accessibilityLabel="Entendi, continuar para os estudos"
              accessibilityRole="button"
              onPress={() => {
                track05InfoAcknowledgedRef.current = true;
                setShowTrack05Info(false);
                navigation.navigate("StudyTrack", {
                  trackId: "track-05",
                });
              }}
              style={({ pressed }) => [
                styles.track5InfoPrimary,
                pressed && styles.track5InfoPressed,
              ]}
              testID="track5-info-continue"
            >
              <Text style={styles.track5InfoPrimaryText}>
                Entendi, continuar para os estudos.
              </Text>
            </Pressable>

            <Pressable
              accessibilityLabel="Fechar"
              accessibilityRole="button"
              onPress={() => setShowTrack05Info(false)}
              style={({ pressed }) => [
                styles.track5InfoClose,
                pressed && styles.track5InfoPressed,
              ]}
              testID="track5-info-close"
            >
              <Text style={styles.track5InfoCloseText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  track5InfoOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  track5InfoBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.52)",
  },
  track5InfoCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 12,
    gap: 12,
    maxHeight: "90%",
    paddingBottom: 24,
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  track5InfoBody: {
    flexGrow: 0,
  },
  track5InfoBodyContent: {
    gap: 12,
    paddingBottom: 4,
  },
  track5InfoHandle: {
    alignSelf: "center",
    backgroundColor: colors.border,
    borderRadius: 999,
    height: 4,
    marginBottom: 4,
    width: 46,
  },
  track5InfoEyebrow: {
    color: colors.secondaryPressed,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  track5InfoTitle: {
    color: colors.textStrong,
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 27,
  },
  track5InfoSubtitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22,
  },
  track5InfoText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  track5InfoStrong: {
    color: colors.textStrong,
    fontWeight: "800",
  },
  track5InfoQuote: {
    borderLeftColor: colors.secondary,
    borderLeftWidth: 3,
    color: colors.textStrong,
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 22,
    paddingLeft: 12,
  },
  track5InfoBrand: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "800",
    marginTop: 2,
  },
  track5InfoTagline: {
    color: colors.textMuted,
    fontSize: 14,
    fontStyle: "italic",
  },
  track5InfoPrimary: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: "center",
    minHeight: 50,
    marginTop: 4,
    paddingHorizontal: 18,
  },
  track5InfoPrimaryText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
  },
  track5InfoClose: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 18,
  },
  track5InfoCloseText: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "700",
  },
  track5InfoPressed: {
    opacity: 0.78,
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingBottom: 32,
    paddingTop: 12,
  },
  intro: {
    paddingHorizontal: 18,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  headerAction: {
    alignItems: "center",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    minWidth: 40,
  },
  headerActionPressed: {
    backgroundColor: colors.primarySoft,
  },
  headerBackSymbol: {
    color: colors.primary,
    fontSize: 38,
    fontWeight: "300",
    lineHeight: 38,
    marginTop: -2,
  },
  headerSearchSymbol: {
    color: colors.primary,
    fontSize: 29,
    fontWeight: "500",
    lineHeight: 31,
  },
  searchRow: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 14,
    minHeight: 48,
    paddingHorizontal: 12,
    width: "90%",
  },
  searchInlineIcon: {
    color: colors.primary,
    fontSize: 22,
    marginRight: 8,
  },
  searchInput: {
    color: colors.textStrong,
    flex: 1,
    fontSize: 14,
    minHeight: 48,
    paddingVertical: 8,
  },
  searchClear: {
    alignItems: "center",
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  searchClearText: {
    color: colors.textMuted,
    fontSize: 23,
    lineHeight: 25,
  },
  filterScroller: {
    marginTop: 16,
  },
  filterRow: {
    gap: 8,
    paddingHorizontal: 18,
  },
  filterChip: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 7,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  filterChipSelected: {
    backgroundColor: colors.secondaryPressed,
    borderColor: colors.secondaryPressed,
  },
  filterChipPressed: {
    opacity: 0.72,
  },
  filterIcon: {
    height: 17,
    opacity: 0.9,
    width: 17,
  },
  filterIconSelected: {
    opacity: 1,
  },
  filterChipText: {
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: "700",
  },
  filterChipTextSelected: {
    color: colors.textStrong,
  },
  list: {
    gap: 9,
    marginTop: 15,
    paddingHorizontal: 14,
  },
  card: {
    alignItems: "stretch",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: CARD_HEIGHT,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  cardPressed: {
    opacity: 0.76,
  },
  cardImageFrame: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    height: CARD_IMAGE_HEIGHT,
    justifyContent: "center",
    marginLeft: 8,
    width: CARD_IMAGE_WIDTH,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.14,
    shadowRadius: 4,
  },
  cardImage: {
    borderRadius: 13,
    height: CARD_IMAGE_HEIGHT - 2,
    width: CARD_IMAGE_WIDTH - 2,
  },
  cardBody: {
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 0,
    paddingTop: 8,
  },
  trackLabel: {
    color: colors.secondaryPressed,
    fontSize: 10.5,
    fontWeight: "800",
    lineHeight: 13,
  },
  cardTitle: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 18,
    marginTop: 1,
  },
  cardDescription: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 14,
    marginTop: 3,
  },
  cardMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 4,
    marginTop: 4,
  },
  cardCount: {
    color: colors.primary,
    flexShrink: 1,
    fontSize: 10,
    fontWeight: "700",
  },
  categoryBadge: {
    borderRadius: 999,
    flexShrink: 0,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  categoryBadgeText: {
    fontSize: 9.25,
    fontWeight: "800",
  },
  categoryBadgeFormation: {
    backgroundColor: "#FFF3CF",
  },
  categoryBadgeTextFormation: {
    color: colors.textStrong,
  },
  categoryBadgeChristianLife: {
    backgroundColor: "#E7F6EC",
  },
  categoryBadgeTextChristianLife: {
    color: colors.textStrong,
  },
  categoryBadgeCollaborative: {
    backgroundColor: "#F0E9FF",
  },
  categoryBadgeTextCollaborative: {
    color: "#6D4ACB",
  },
  categoryBadgeDevotional: {
    backgroundColor: "#E7F1FB",
  },
  categoryBadgeTextDevotional: {
    color: "#2E6F9E",
  },
  chevron: {
    alignSelf: "center",
    color: colors.primary,
    fontSize: 28,
    fontWeight: "300",
    paddingHorizontal: 5,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 18,
    marginTop: 22,
    paddingHorizontal: 22,
    paddingVertical: 30,
  },
  emptyTitle: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
    textAlign: "center",
  },
});
