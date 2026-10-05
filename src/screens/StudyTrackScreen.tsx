import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import StudiesScrollHeader from "../components/StudiesScrollHeader";
import { useAppShellChrome } from "../navigation/AppShellChromeContext";
import type { DevotionalProgress } from "../domain/devotionals/devotionalProgress";
import type { StudyProgress } from "../domain/studies/studyProgress";
import type { StudiesStackScreenProps } from "../navigation/types";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
import { devotionalRuntimeCatalog } from "../devotionals/runtime/devotionalRuntimeCatalog";
import { studyTrackPresentationCatalog } from "../studies/presentation/studyTrackPresentationCatalog";
import { studyRuntimeCatalog } from "../studies/runtime/studyRuntimeCatalog";
import { colors } from "../theme/colors";

type Props = StudiesStackScreenProps<"StudyTrack">;

const APPROVED_TRACK_DESCRIPTIONS = {
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
} as const;

const getCardDescription = (summary: string, objective: string): string => {
  const normalizedSummary = summary.trim();
  const normalizedObjective = objective.trim();

  if (normalizedSummary !== "" && normalizedSummary !== normalizedObjective) {
    return normalizedSummary;
  }

  const bulletParts = normalizedObjective
    .split("•")
    .map((part) => part.trim())
    .filter(Boolean);

  if (bulletParts.length > 1) {
    return bulletParts[1];
  }

  const sentenceMatch = normalizedObjective.match(/^.*?[.!?](?=\s|$)/s);
  return sentenceMatch?.[0].trim() || normalizedObjective;
};

const getEstimatedTimeLabel = (
  minimum: number,
  maximum: number,
): string => (minimum === maximum ? `${minimum} min` : `${minimum}-${maximum} min`);

const getStudyProgressLabel = (
  progress: StudyProgress | undefined,
): string | null => {
  if (!progress || progress.state === "NOT_STARTED") {
    return null;
  }

  if (progress.state === "COMPLETED") {
    return "Concluído";
  }

  return `Em andamento · ${progress.readingProgress}%`;
};

const getDevotionalProgressLabel = (
  progress: DevotionalProgress | undefined,
): string | null => {
  if (!progress || progress.state === "NOT_STARTED") {
    return null;
  }

  if (progress.state === "COMPLETED") {
    return "Concluído";
  }

  return `Em andamento · ${progress.readingProgress}%`;
};

export const getStudyTrackEmptyStateCopy = (
  trackId: string,
): Readonly<{
  title: string;
  message: string;
}> =>
  trackId === "track-05"
    ? Object.freeze({
        title: "Acervo colaborativo em formação",
        message:
          "Novos estudos serão disponibilizados aqui após revisão e aprovação editorial.",
      })
    : Object.freeze({
        title: "Nenhum estudo disponível",
        message:
          "Ainda não há estudos publicados nesta trilha.",
      });

export default function StudyTrackScreen({ navigation, route }: Props) {
  const { handleScroll, resetChrome } = useAppShellChrome();
  const personalPlatformHub =
    getPersonalPlatformHub();
  const studyProgressService =
    personalPlatformHub.studyProgressService;
  const devotionalProgressService =
    personalPlatformHub.devotionalProgressService;
  const [progressByStudyId, setProgressByStudyId] = useState<
    ReadonlyMap<string, StudyProgress>
  >(() => new Map());
  const [
    progressByDevotionalId,
    setProgressByDevotionalId,
  ] = useState<ReadonlyMap<string, DevotionalProgress>>(
    () => new Map(),
  );

  useFocusEffect(
    useCallback(() => {
      resetChrome();

      let active = true;

      void studyProgressService
        .list()
        .then((progressEntries) => {
          if (!active) {
            return;
          }

          setProgressByStudyId(
            new Map(
              progressEntries.map((progress) => [
                progress.studyId,
                progress,
              ]),
            ),
          );
        })
        .catch(() => undefined);

      if (
        route.params.trackId === "track-05" &&
        devotionalRuntimeCatalog.devotionals.length > 0 &&
        devotionalProgressService !== undefined
      ) {
        void devotionalProgressService
          .list()
          .then((progressEntries) => {
            if (!active) {
              return;
            }

            setProgressByDevotionalId(
              new Map(
                progressEntries.map((progress) => [
                  progress.devotionalId,
                  progress,
                ]),
              ),
            );
          })
          .catch(() => undefined);
      } else {
        setProgressByDevotionalId(new Map());
      }

      return () => {
        active = false;
      };
    }, [
      devotionalProgressService,
      resetChrome,
      route.params.trackId,
      studyProgressService,
    ]),
  );

  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("StudiesHome");
  }, [navigation]);

  const { trackId } = route.params;
  const presentation =
    studyTrackPresentationCatalog.find(
      (candidate) => candidate.trackId === trackId,
    ) ?? null;

  if (!presentation) {
    return (
      <View style={styles.screen}>
        <StudiesScrollHeader
          onBack={handleBack}
          testID="study-track-scroll-header"
          title="Trilha de Estudos"
        />

        <View style={styles.centered} testID="study-track-not-found">
          <Text style={styles.emptyTitle}>Trilha indisponível</Text>
          <Text style={styles.emptyText}>
            Esta trilha não está disponível para leitura no momento.
          </Text>
        </View>
      </View>
    );
  }

  const studies = studyRuntimeCatalog.studies
    .filter((entry) => entry.content.trackId === trackId)
    .sort((left, right) => left.content.number - right.content.number);
  const devotionals =
    trackId === "track-05"
      ? devotionalRuntimeCatalog.devotionals
      : [];
  const runtimeItemCount =
    studies.length + devotionals.length;

  const description =
    APPROVED_TRACK_DESCRIPTIONS[
      presentation.trackId as keyof typeof APPROVED_TRACK_DESCRIPTIONS
    ];
  const emptyStateCopy =
    getStudyTrackEmptyStateCopy(trackId);

  return (
    <View style={styles.screen}>
      <StudiesScrollHeader
        onBack={handleBack}
        testID="study-track-scroll-header"
        title="Trilha de Estudos"
      />

      <FlatList
        contentContainerStyle={styles.content}
        data={studies}
        keyExtractor={(entry) => entry.content.id}
        ListHeaderComponent={
          <>
            <View style={styles.heroSection}>
              <ImageBackground
                accessible={false}
                imageStyle={styles.heroImage}
                importantForAccessibility="no"
                resizeMode="cover"
                source={presentation.assets.libraryHeader}
                style={styles.hero}
                testID="study-track-hero"
              >
                <View style={styles.heroOverlay}>
                  <View style={styles.heroContent}>
                    <View style={styles.heroTopBlock}>
                      <Text style={styles.eyebrow}>
                        Trilha {String(presentation.order).padStart(2, "0")}
                      </Text>

                      <Text style={styles.title}>
                        {presentation.title}
                      </Text>

                      <Text style={styles.heroDescription}>
                        {description}
                      </Text>
                    </View>

                    <View style={styles.heroBottomBlock}>
                      <Text
                        style={styles.count}
                        testID="study-track-runtime-count"
                      >
                        {runtimeItemCount}{" "}
                        {devotionals.length === 0
                          ? studies.length === 1
                            ? "estudo"
                            : "estudos"
                          : runtimeItemCount === 1
                            ? "conteúdo"
                            : "conteúdos"}
                      </Text>

                      <View style={styles.naturePill}>
                        <Text style={styles.heroNature}>
                          {presentation.nature}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>

            {runtimeItemCount > 0 ? (
              <View style={styles.listStartSpacer} />
            ) : null}
          </>
        }
        ListEmptyComponent={
          runtimeItemCount === 0 ? (
            <View style={styles.emptyCard} testID="study-track-empty-state">
              <Text style={styles.emptyTitle}>
                {emptyStateCopy.title}
              </Text>
              <Text style={styles.emptyText}>
                {emptyStateCopy.message}
              </Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          devotionals.length > 0 ? (
            <View
              style={[
                styles.devotionalList,
                studies.length === 0 &&
                  styles.devotionalListFirst,
              ]}
            >
              {devotionals.map((entry) => {
                const devotionalProgress =
                  progressByDevotionalId.get(
                    entry.content.id,
                  );
                const devotionalProgressLabel =
                  getDevotionalProgressLabel(
                    devotionalProgress,
                  );
                const authorProfile =
                  entry.content.author
                    .publicDisplayAuthorization ===
                  "AUTHORIZED"
                    ? entry.content.author.publicProfile
                    : null;
                const authorMeta = authorProfile
                  ? [
                      authorProfile.role,
                      authorProfile.cityState,
                    ]
                      .filter(
                        (value): value is string =>
                          value !== null,
                      )
                      .join(" - ")
                  : "";
                const devotionalDescription =
                  entry.content.subtitle ??
                  entry.content.summary ??
                  "Devocional colaborativo";

                return (
                  <Pressable
                    key={entry.content.id}
                    accessibilityLabel={`Abrir devocional: ${entry.content.title}`}
                    accessibilityRole="button"
                    onPress={() =>
                      navigation.navigate(
                        "DevotionalDetail",
                        {
                          devotionalId:
                            entry.content.id,
                        },
                      )
                    }
                    style={({ pressed }) => [
                      styles.card,
                      styles.devotionalCard,
                      pressed && styles.cardPressed,
                    ]}
                    testID={`devotional-${entry.content.id}`}
                  >
                    <View
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                      style={[
                        styles.numberBadge,
                        styles.devotionalNumberBadge,
                      ]}
                    >
                      <Text
                        style={styles.devotionalBadgeText}
                      >
                        DEV
                      </Text>
                    </View>

                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>
                        {entry.content.title}
                      </Text>

                      {authorProfile ? (
                        <View
                          style={styles.cardAuthorBlock}
                          testID={`devotional-author-${entry.content.id}`}
                        >
                          <Text
                            style={styles.cardAuthorName}
                          >
                            Por {authorProfile.displayName}
                          </Text>
                                                    {authorMeta ? (
                            <Text
                              style={styles.cardAuthorMeta}
                            >
                              {authorMeta}
                            </Text>
                          ) : null}
                          {authorProfile.formation ? (
                            <Text style={styles.cardAuthorFormation}>
                              {authorProfile.formation}
                            </Text>
                          ) : null}
                        </View>
                      ) : (
                        <Text
                          style={styles.cardDescription}
                        >
                          {devotionalDescription}
                        </Text>
                      )}

                      {devotionalProgressLabel ? (
                        <Text
                          style={[
                            styles.cardProgress,
                            devotionalProgress?.state ===
                              "COMPLETED" &&
                              styles.cardProgressCompleted,
                          ]}
                          testID={`devotional-progress-${entry.content.id}`}
                        >
                          {devotionalProgressLabel}
                        </Text>
                      ) : null}

                      <View style={styles.cardMetaRow}>
                        <Text style={styles.cardMetaText}>
                          {entry.content.format ===
                          "OPEN_LETTER"
                            ? "Carta aberta"
                            : "Reflexão"}
                        </Text>
                      </View>
                    </View>

                    <Text
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                      style={styles.cardChevron}
                    >
                      ›
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null
        }
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparator} />
        )}
        onScroll={handleScroll}
        renderItem={({ item: entry }) => {
          const descriptionText = getCardDescription(
            entry.content.summary,
            entry.content.objective,
          );
          const estimatedTime =
            entry.content.estimatedMinutes === null
              ? null
              : getEstimatedTimeLabel(
                  entry.content.estimatedMinutes.minimum,
                  entry.content.estimatedMinutes.maximum,
                );
          const progress = progressByStudyId.get(
            entry.content.id,
          );
          const progressLabel =
            getStudyProgressLabel(progress);
          const authorProfile =
            entry.content.trackId === "track-05"
              ? entry.publicAuthorProfile
              : null;
          const authorMeta = authorProfile
            ? [authorProfile.role, authorProfile.cityState]
                .filter(
                  (value): value is string => value !== null,
                )
                .join(" - ")
            : "";

          return (
            <Pressable
              accessibilityLabel={`Abrir estudo ${entry.content.number}: ${entry.content.title}`}
              accessibilityRole="button"
              onPress={() =>
                navigation.navigate("StudyDetail", {
                  studyId: entry.content.id,
                })
              }
              style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
              ]}
              testID={`study-${entry.content.id}`}
            >
              <View
                accessibilityElementsHidden
                importantForAccessibility="no"
                style={styles.numberBadge}
              >
                <Text style={styles.numberBadgeText}>
                  {entry.content.number}
                </Text>
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>
                  {entry.content.title}
                </Text>
                {authorProfile ? (
                  <View
                    style={styles.cardAuthorBlock}
                    testID={`study-author-${entry.content.id}`}
                  >
                    <Text style={styles.cardAuthorName}>
                      Por {authorProfile.displayName}
                    </Text>
                    {authorMeta ? (
                      <Text style={styles.cardAuthorMeta}>
                        {authorMeta}
                      </Text>
                    ) : null}
                    {authorProfile.formation ? (
                      <Text style={styles.cardAuthorFormation}>
                        {authorProfile.formation}
                      </Text>
                    ) : null}
                  </View>
                ) : (
                  <Text style={styles.cardDescription}>
                    {descriptionText}
                  </Text>
                )}

                {progressLabel ? (
                  <Text
                    style={[
                      styles.cardProgress,
                      progress?.state === "COMPLETED" &&
                        styles.cardProgressCompleted,
                    ]}
                    testID={`study-progress-${entry.content.id}`}
                  >
                    {progressLabel}
                  </Text>
                ) : null}

                {estimatedTime ? (
                  <View style={styles.cardMetaRow}>
                    <Text
                      accessibilityElementsHidden
                      importantForAccessibility="no"
                      style={styles.clockGlyph}
                    >
                      ◷
                    </Text>
                    <Text style={styles.cardMetaText}>
                      {estimatedTime}
                    </Text>
                  </View>
                ) : null}
              </View>

              <Text
                accessibilityElementsHidden
                importantForAccessibility="no"
                style={styles.cardChevron}
              >
                ›
              </Text>
            </Pressable>
          );
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        testID="study-track-screen"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 36,
  },
  heroSection: {
    marginHorizontal: 16,
    marginTop: 14,
  },
  hero: {
    borderRadius: 22,
    minHeight: 252,
    overflow: "hidden",
    width: "100%",
  },
  heroImage: {
    borderRadius: 22,
  },
  heroOverlay: {
    backgroundColor: "rgba(6, 31, 48, 0.52)",
    minHeight: 252,
  },
  heroContent: {
    justifyContent: "space-between",
    minHeight: 252,
    paddingBottom: 18,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  heroTopBlock: {
    marginTop: 0,
  },
  heroBottomBlock: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
    marginTop: 14,
    width: "100%",
  },
  centered: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  eyebrow: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  title: {
    color: colors.surface,
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 33,
    marginTop: 8,
  },
  heroDescription: {
    color: colors.surface,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: "92%",
    opacity: 0.96,
  },
  count: {
    color: colors.secondary,
    fontSize: 14,
    fontWeight: "800",
  },
  naturePill: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderColor: "rgba(255, 255, 255, 0.16)",
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  heroNature: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: "700",
    opacity: 0.98,
  },
  listStartSpacer: {
    height: 16,
  },
  itemSeparator: {
    height: 10,
  },
  card: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    marginHorizontal: 16,
    minHeight: 118,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  cardPressed: {
    opacity: 0.72,
  },
  numberBadge: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FFF3CF",
    borderRadius: 999,
    height: 54,
    justifyContent: "center",
    marginRight: 13,
    marginTop: 2,
    width: 54,
  },
  numberBadgeText: {
    color: colors.secondaryPressed,
    fontSize: 24,
    fontWeight: "800",
  },
  devotionalCard: {
    backgroundColor: "#F3F8FB",
    borderColor: "#8CB9CC",
    borderWidth: 1.5,
  },
  devotionalNumberBadge: {
    backgroundColor: "#DDEFF6",
    borderColor: "#8CB9CC",
    borderWidth: 1,
  },
  devotionalBadgeText: {
    color: colors.secondaryPressed,
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  devotionalList: {
    gap: 10,
    marginTop: 10,
  },
  devotionalListFirst: {
    marginTop: 16,
  },
  cardContent: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 21,
  },
  cardDescription: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 5,
  },
  cardAuthorBlock: {
    marginTop: 5,
  },
  cardAuthorName: {
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  cardAuthorMeta: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 2,
  },
  cardAuthorFormation: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  cardProgress: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8,
  },
  cardProgressCompleted: {
    color: colors.secondaryPressed,
  },
  cardMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 8,
  },
  clockGlyph: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 17,
  },
  cardMetaText: {
    color: colors.textStrong,
    fontSize: 12,
    fontWeight: "700",
  },
  cardChevron: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: "300",
    marginLeft: 8,
    paddingHorizontal: 2,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 18,
    paddingHorizontal: 22,
    paddingVertical: 28,
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