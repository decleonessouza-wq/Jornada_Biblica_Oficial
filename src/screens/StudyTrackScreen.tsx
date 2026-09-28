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
import type { StudyProgress } from "../domain/studies/studyProgress";
import type { StudiesStackScreenProps } from "../navigation/types";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
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
  const studyProgressService =
    getPersonalPlatformHub().studyProgressService;
  const [progressByStudyId, setProgressByStudyId] = useState<
    ReadonlyMap<string, StudyProgress>
  >(() => new Map());

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

      return () => {
        active = false;
      };
    }, [resetChrome, studyProgressService]),
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
                        {studies.length}{" "}
                        {studies.length === 1 ? "estudo" : "estudos"}
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

            {studies.length > 0 ? (
              <View style={styles.listStartSpacer} />
            ) : null}
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard} testID="study-track-empty-state">
            <Text style={styles.emptyTitle}>
              {emptyStateCopy.title}
            </Text>
            <Text style={styles.emptyText}>
              {emptyStateCopy.message}
            </Text>
          </View>
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
                <Text style={styles.cardDescription}>
                  {descriptionText}
                </Text>

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