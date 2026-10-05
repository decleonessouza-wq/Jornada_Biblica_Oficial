import { type ReactNode, useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import StudiesScrollHeader from "../components/StudiesScrollHeader";
import { useAppShellChrome } from "../navigation/AppShellChromeContext";
import type {
  BibleReference,
} from "../domain/bible/bibleReference";
import type {
  DevotionalBlock,
} from "../domain/devotionals/devotional";
import type {
  DevotionalProgress,
} from "../domain/devotionals/devotionalProgress";
import type {
  JournalEntryEditorSourceContext,
  StudiesStackScreenProps,
} from "../navigation/types";
import {
  resolveDevotionalBibleReference,
} from "../devotionals/runtime/devotionalBibleReferenceResolver";
import {
  getRuntimeDevotionalById,
} from "../devotionals/runtime/devotionalRuntimeCatalog";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
import { colors } from "../theme/colors";

type Props = StudiesStackScreenProps<"DevotionalDetail"> &
  Readonly<{
    onOpenBibleReference?: (
      reference: BibleReference,
    ) => void | Promise<void>;
    onOpenJournalContext?: (
      context: Extract<
        JournalEntryEditorSourceContext,
        { sourceType: "DEVOTIONAL" }
      >,
    ) => void | Promise<void>;
    onRequestFavorites?: () => void;
  }>;

const FORMAT_LABELS = {
  OPEN_LETTER: "Carta aberta",
  REFLECTION: "Reflexão",
} as const;

const getProgressLabel = (
  progress: DevotionalProgress | null,
): string => {
  if (!progress || progress.state === "NOT_STARTED") {
    return "Ainda não iniciado";
  }

  if (progress.state === "COMPLETED") {
    return "Concluído";
  }

  return `Em andamento · ${progress.readingProgress}%`;
};

const DEVOTIONAL_HERO_ASSETS = Object.freeze({
  "assets/devotionals/heroes/devotional-samaritana.png": require("../../assets/devotionals/heroes/devotional-samaritana.png"),
  "assets/devotionals/heroes/devotional-jesus-cordeiro.png": require("../../assets/devotionals/heroes/devotional-jesus-cordeiro.png"),
  "assets/devotionals/heroes/devotional-pais-adolescentes.png": require("../../assets/devotionals/heroes/devotional-pais-adolescentes.png"),
});

// 1 x 256 RGBA UI fade: transparent to colors.primary (#0D2B45).
// Alpha uses smoothstep(t) = t*t*(3-2*t); no external asset or runtime encoder.
const DEVOTIONAL_HERO_BOTTOM_FADE = Object.freeze({
  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAEACAYAAAByPhyYAAABiklEQVR42oXEV6iIARgA0GvPa++ZvUdWyAhdIUSIiBAREREREREREREhuiJECBEyQlZW9sjee286L1/9D5fzcFJSa6WlpPy3TBmVOVmWZFmTZYuyRzminMoV5Y7yKG+UqnzKHxVQQRWKCquIiqqYiquESqqUSkdlVFblVF4VVFGVVFlVVFXVVF01VFO1VUd1VU/11UAN1UiN1URN1UzN1UIt1Uqt1UZt1U5paq8O6qhO6qwu6qpu6q4e6qle6q0+6qt+6q8BGqhBGqwhGqphGq4RGqlRGq0xGqtxGq8JmqhJmqwpmqppmq4ZmqlZmq05mqt5mq8FWqhFWqwlWqplWq4VWqlVWq01Wqt1Std6bdBGbdJmbdFWbdN27dBO7dJu7dFe7dN+HdBBHdJhHdFRHdNxndBJndJpndFZndN5XdBFXdJlXdFVXdN13dBN3dJt3dFd3dN9PdDD6JEe64me6pme64Ve6lX0Wm/0Nnqn9/oQfdSn6HP0RV+jb9H36Eeyn8l+JfudUX/+3V/nyfyBde1JLwAAAABJRU5ErkJggg==",
});

const PRIMARY_BIBLE_REFERENCE_BY_DEVOTIONAL_ID: Readonly<Record<string, string>> =
  Object.freeze({
    "devotional-track05-samaritana-draft": "João 4:1-15",
    "devotional-track05-jesus-cordeiro-draft": "João 1:29",
    "devotional-track05-pais-adolescentes-draft": "2 Reis 4",
  });

const normalizeDevotionalReferenceLabel = (value: string): string =>
  value.replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();

const getBlockToneLabel = (
  block: DevotionalBlock,
): string | null => {
  switch (block.kind) {
    case "CALLOUT":
      return block.role === "AUTHOR_EMPHASIS"
        ? "Destaque do autor"
        : "Nota editorial";
    case "REFLECTION_QUESTION":
      return "Para refletir";
    case "PRAYER":
      return "Oração";
    case "ACTION":
      return "Pratique";
    default:
      return null;
  }
};

export default function DevotionalDetailScreen({
  navigation,
  route,
  onOpenBibleReference,
  onOpenJournalContext,
  onRequestFavorites,
}: Props) {
  const { handleScroll, resetChrome } = useAppShellChrome();
  const { devotionalId } = route.params;
  const runtimeEntry =
    getRuntimeDevotionalById(devotionalId);
  const personalPlatformHub = getPersonalPlatformHub();
  const devotionalProgressService =
    personalPlatformHub.devotionalProgressService;
  const favoritesService =
    personalPlatformHub.favoritesService;
  const progressMutationLockRef = useRef(false);
  const favoriteMutationLockRef = useRef(false);
  const [progress, setProgress] =
    useState<DevotionalProgress | null>(null);
  const [isFavorite, setIsFavorite] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      resetChrome();

      if (runtimeEntry === null) {
        return undefined;
      }

      let active = true;
      const target = {
        kind: "devotional" as const,
        devotionalId,
      };

      void Promise.all([
        devotionalProgressService.openDevotional(
          devotionalId,
        ),
        favoritesService.isFavorite(target),
      ])
        .then(([nextProgress, nextFavorite]) => {
          if (!active) {
            return;
          }

          setProgress(nextProgress);
          setIsFavorite(nextFavorite);
        })
        .catch(() => undefined);

      return () => {
        active = false;
      };
    }, [
      devotionalId,
      devotionalProgressService,
      favoritesService,
      resetChrome,
      runtimeEntry,
    ]),
  );

  const handleBack = useCallback(() => {
    if (
      route.params.returnToFavorites === true &&
      onRequestFavorites
    ) {
      onRequestFavorites();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("StudyTrack", {
      trackId: "track-05",
    });
  }, [
    navigation,
    onRequestFavorites,
    route.params.returnToFavorites,
  ]);

  if (runtimeEntry === null) {
    return (
      <View style={styles.screen}>
        <StudiesScrollHeader
          onBack={handleBack}
          testID="devotional-detail-scroll-header"
          title="Devocional"
        />

        <View
          style={styles.unavailable}
          testID="devotional-detail-not-found"
        >
          <Text style={styles.unavailableTitle}>
            Devocional indisponível
          </Text>
          <Text style={styles.unavailableText}>
            Este conteúdo não está disponível para leitura no momento.
          </Text>
        </View>
      </View>
    );
  }

  const { content } = runtimeEntry;
  const authorProfile =
    content.author.publicDisplayAuthorization ===
    "AUTHORIZED"
      ? content.author.publicProfile
      : null;
  const authorMeta = authorProfile
    ? [
        authorProfile.role,
        authorProfile.cityState,
        authorProfile.formation,
      ]
        .filter(
          (value): value is string =>
            value !== null && value.trim() !== "",
        )
        .join(" · ")
    : "";
  const formatLabel = FORMAT_LABELS[content.format];
  const heroImageSource =
    content.heroImage === null
      ? null
      : DEVOTIONAL_HERO_ASSETS[
          content.heroImage as keyof typeof DEVOTIONAL_HERO_ASSETS
        ] ?? null;

  const isPrimaryBibleReference = (
    block: DevotionalBlock,
  ): boolean => {
    if (block.kind !== "BIBLE_REFERENCE") {
      return false;
    }

    const expected =
      PRIMARY_BIBLE_REFERENCE_BY_DEVOTIONAL_ID[
        String(content.id)
      ];
    const resolution =
      resolveDevotionalBibleReference(block.reference);

    if (!resolution.ok) {
      return false;
    }

    if (expected !== undefined) {
      return (
        normalizeDevotionalReferenceLabel(
          resolution.canonicalText,
        ) === normalizeDevotionalReferenceLabel(expected)
      );
    }

    const firstReference = content.blocks.find(
      (candidate) => candidate.kind === "BIBLE_REFERENCE",
    );

    return firstReference?.id === block.id;
  };

  const getInlineBibleReferenceTextCandidates = (
    canonicalText: string,
  ): readonly string[] => {
    if (!canonicalText.startsWith("Salmos ")) {
      return [canonicalText];
    }

    return [
      canonicalText,
      "Salmo " + canonicalText.slice("Salmos ".length),
    ];
  };

  const getInlineBibleReferencesBeforeParagraph = (
    paragraphIndex: number,
  ): readonly Readonly<{
    block: Extract<DevotionalBlock, { kind: "BIBLE_REFERENCE" }>;
    blockIndex: number;
    canonicalText: string;
    reference: BibleReference;
  }>[] => {
    const references: Array<
      Readonly<{
        block: Extract<DevotionalBlock, { kind: "BIBLE_REFERENCE" }>;
        blockIndex: number;
        canonicalText: string;
        reference: BibleReference;
      }>
    > = [];

    for (
      let candidateIndex = paragraphIndex - 1;
      candidateIndex >= 0;
      candidateIndex -= 1
    ) {
      const candidate = content.blocks[candidateIndex];

      if (candidate.kind !== "BIBLE_REFERENCE") {
        break;
      }

      if (isPrimaryBibleReference(candidate)) {
        break;
      }

      const resolution = resolveDevotionalBibleReference(
        candidate.reference,
      );

      if (!resolution.ok) {
        continue;
      }

      references.unshift({
        block: candidate,
        blockIndex: candidateIndex,
        canonicalText: resolution.canonicalText,
        reference: resolution.reference,
      });
    }

    return references;
  };

  const firstParagraphIndex = content.blocks.findIndex(
    (block) => block.kind === "PARAGRAPH",
  );
  const lastPublicBlockIndex = content.blocks.reduce(
    (lastIndex, block, blockIndex) =>
      block.kind === "CALLOUT" &&
      block.role === "EDITORIAL_NOTE"
        ? lastIndex
        : blockIndex,
    -1,
  );

  const shouldShowProgressCheckpoint = (
    block: DevotionalBlock,
    blockIndex: number,
  ): boolean => {
    if (
      block.kind === "CALLOUT" &&
      block.role === "EDITORIAL_NOTE"
    ) {
      return false;
    }

    return (
      blockIndex === firstParagraphIndex ||
      blockIndex === lastPublicBlockIndex ||
      block.kind === "REFLECTION_QUESTION" ||
      block.kind === "PRAYER" ||
      isPrimaryBibleReference(block)
    );
  };

  const recordBlockOpened = async (
    block: DevotionalBlock,
    blockIndex: number,
  ): Promise<void> => {
    if (progressMutationLockRef.current) {
      return;
    }

    progressMutationLockRef.current = true;

    try {
      const next =
        await devotionalProgressService.recordBlockOpened({
          devotionalId,
          blockId: block.id,
          blockIndex,
          blockCount: content.blocks.length,
        });
      setProgress(next);
    } catch {
      return;
    } finally {
      progressMutationLockRef.current = false;
    }
  };

  const toggleCompletion = async (): Promise<void> => {
    if (progressMutationLockRef.current) {
      return;
    }

    progressMutationLockRef.current = true;

    try {
      const next =
        progress?.state === "COMPLETED"
          ? await devotionalProgressService.uncompleteDevotional(
              devotionalId,
            )
          : await devotionalProgressService.completeDevotional(
              devotionalId,
            );

      setProgress(next);
    } catch {
      return;
    } finally {
      progressMutationLockRef.current = false;
    }
  };

  const toggleFavorite = async (): Promise<void> => {
    if (favoriteMutationLockRef.current) {
      return;
    }

    favoriteMutationLockRef.current = true;

    try {
      const next = await favoritesService.toggle(
        {
          kind: "devotional",
          devotionalId,
        },
        {
          kind: "devotional",
          devotionalId,
        },
      );
      setIsFavorite(next);
    } catch {
      return;
    } finally {
      favoriteMutationLockRef.current = false;
    }
  };

  const openJournal = (): void => {
    const promptSnapshot =
      content.reflectionPrompt?.trim() ?? "";

    if (
      promptSnapshot === "" ||
      !onOpenJournalContext
    ) {
      return;
    }

    onOpenJournalContext({
      sourceType: "DEVOTIONAL",
      devotionalId,
      sourceTitleSnapshot: content.title,
      promptSnapshot,
    });
  };

  const renderBlock = (
    block: DevotionalBlock,
    blockIndex: number,
    ) => {
    if (
      block.kind === "CALLOUT" &&
      block.role === "EDITORIAL_NOTE"
    ) {
      return null;
    }

    const toneLabel = getBlockToneLabel(block);
    const progressButton = shouldShowProgressCheckpoint(
      block,
      blockIndex,
    ) ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Marcar leitura até o bloco ${blockIndex + 1}`}
        onPress={() => {
          void recordBlockOpened(block, blockIndex);
        }}
        style={({ pressed }) => [
          styles.blockProgressButton,
          pressed && styles.pressed,
        ]}
        testID={`devotional-progress-block-${block.id}`}
      >
        <Text style={styles.blockProgressButtonText}>
          Marcar leitura até aqui
        </Text>
            </Pressable>
    ) : null;

    if (block.kind === "HEADING") {
      return (
        <View
          key={block.id}
          style={styles.flowBlock}
          testID={`devotional-block-${block.id}`}
        >
          <Text
            style={
              block.level === 2
                ? styles.blockHeading2
                : styles.blockHeading3
            }
          >
            {block.text}
          </Text>
          {progressButton}
        </View>
      );
    }

    if (block.kind === "PARAGRAPH") {
      const inlineBibleReferences =
        getInlineBibleReferencesBeforeParagraph(blockIndex);
      const inlineTextNodes: ReactNode[] = [];
      let inlineCursor = 0;
      let inlineMappingFailed = false;

      for (const inlineReference of inlineBibleReferences) {
        let matchedReferenceText: string | null = null;
        let referenceIndex = -1;

        for (const candidateText of getInlineBibleReferenceTextCandidates(
          inlineReference.canonicalText,
        )) {
          const candidateIndex = block.text.indexOf(
            candidateText,
            inlineCursor,
          );

          if (candidateIndex >= 0) {
            matchedReferenceText = candidateText;
            referenceIndex = candidateIndex;
            break;
          }
        }

        if (matchedReferenceText === null || referenceIndex < 0) {
          inlineMappingFailed = true;
          break;
        }

        if (referenceIndex > inlineCursor) {
          inlineTextNodes.push(
            block.text.slice(inlineCursor, referenceIndex),
          );
        }

        inlineTextNodes.push(
          <Text
            key={inlineReference.block.id}
            accessibilityLabel={`Abrir ${inlineReference.canonicalText} na Bíblia`}
            accessibilityRole="link"
            onPress={() => {
              void recordBlockOpened(
                inlineReference.block,
                inlineReference.blockIndex,
              );
              void onOpenBibleReference?.(
                inlineReference.reference,
              );
            }}
            style={styles.inlineBibleReferenceText}
            testID={`devotional-inline-bible-${inlineReference.block.id}`}
          >
            {matchedReferenceText}
          </Text>,
        );

        inlineCursor =
          referenceIndex + matchedReferenceText.length;
      }

      if (
        !inlineMappingFailed &&
        inlineBibleReferences.length > 0 &&
        inlineCursor < block.text.length
      ) {
        inlineTextNodes.push(block.text.slice(inlineCursor));
      }

      return (
        <View
          key={block.id}
          style={styles.blockCard}
          testID={`devotional-block-${block.id}`}
        >
          <Text style={styles.blockParagraph}>
            {inlineMappingFailed || inlineBibleReferences.length === 0
              ? block.text
              : inlineTextNodes}
          </Text>
          {progressButton}
        </View>
      );
    }
    if (
      block.kind === "BIBLE_REFERENCE" &&
      !isPrimaryBibleReference(block)
    ) {
      return null;
    }

    if (
      block.kind === "BIBLE_REFERENCE" ||
      block.kind === "SCRIPTURE_QUOTE"
    ) {
      const resolution =
        resolveDevotionalBibleReference(block.reference);

      return (
        <View
          key={block.id}
          style={[
            styles.blockCard,
            styles.scriptureCard,
          ]}
          testID={`devotional-block-${block.id}`}
        >
          <Text style={styles.blockEyebrow}>
            REFERÊNCIA BÍBLICA
          </Text>

          {resolution.ok ? (
            <>
              <Text style={styles.scriptureReference}>
                {resolution.canonicalText}
              </Text>
              {block.kind === "SCRIPTURE_QUOTE" &&
              block.sourceText ? (
                <Text style={styles.scriptureQuote}>
                  {block.sourceText}
                </Text>
              ) : null}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Abrir ${resolution.canonicalText} na Bíblia`}
                onPress={() => {
                  void recordBlockOpened(
                    block,
                    blockIndex,
                  );
                  void onOpenBibleReference?.(
                    resolution.reference,
                  );
                }}
                style={({ pressed }) => [
                  styles.primaryAction,
                  pressed && styles.pressed,
                ]}
                testID={`devotional-open-bible-${block.id}`}
              >
                <Text style={styles.primaryActionText}>
                  Abrir na Bíblia
                </Text>
              </Pressable>
            </>
          ) : (
            <Text style={styles.unresolvedReference}>
              Referência indisponível.
            </Text>
          )}

          {progressButton}
        </View>
      );
    }

    if (block.kind === "LIST") {
      return (
        <View
          key={block.id}
          style={styles.blockCard}
          testID={`devotional-block-${block.id}`}
        >
          {block.items.map((item, itemIndex) => (
            <View
              key={`${block.id}-${itemIndex}`}
              style={styles.listRow}
            >
              <Text style={styles.listMarker}>
                {block.style === "NUMBERED"
                  ? `${itemIndex + 1}.`
                  : "•"}
              </Text>
              <Text style={styles.listText}>
                {item}
              </Text>
            </View>
          ))}
          {progressButton}
        </View>
      );
    }

    const blockText =
      block.kind === "REFLECTION_QUESTION"
        ? block.prompt
        : block.text;

    return (
      <View
        key={block.id}
        style={[
          styles.blockCard,
            block.kind === "CALLOUT" &&
              styles.calloutCard,
          block.kind === "PRAYER" &&
            styles.prayerCard,
          block.kind === "ACTION" &&
            styles.actionCard,
          block.kind === "REFLECTION_QUESTION" &&
            styles.reflectionCard,
        ]}
        testID={`devotional-block-${block.id}`}
      >
        {toneLabel ? (
          <Text style={styles.blockEyebrow}>
            {toneLabel.toUpperCase()}
          </Text>
        ) : null}
        <Text style={styles.blockParagraph}>
          {blockText}
        </Text>
        {progressButton}
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <StudiesScrollHeader
        onBack={handleBack}
        testID="devotional-detail-scroll-header"
        title="Devocional"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        testID="devotional-detail-screen"
      >
        <View style={styles.hero} testID="devotional-hero-card">
          {heroImageSource ? (
            <View
              style={styles.heroVisual}
              testID="devotional-hero-frame"
            >
              <Image
                accessibilityIgnoresInvertColors
                accessible={false}
                importantForAccessibility="no"
                resizeMode="cover"
                source={heroImageSource}
                style={styles.heroBackgroundImage}
                testID="devotional-hero-image"
              />
              <View
                pointerEvents="none"
                style={styles.heroBottomFade}
                testID="devotional-hero-bottom-fade"
              >
                <Image
                  accessibilityIgnoresInvertColors
                  accessible={false}
                  importantForAccessibility="no"
                  resizeMode="stretch"
                  source={DEVOTIONAL_HERO_BOTTOM_FADE}
                  style={styles.heroFadeImage}
                  testID="devotional-hero-fade"
                />
              </View>
            </View>
          ) : null}
          <View
            style={styles.heroContent}
            testID="devotional-hero-content"
          >
            <View style={styles.heroTopRow}>
              <View style={styles.formatBadge}>
                <Text style={styles.formatBadgeText}>
                  {formatLabel}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  isFavorite
                    ? "Remover devocional dos favoritos"
                    : "Adicionar devocional aos favoritos"
                }
                accessibilityState={{
                  selected: isFavorite,
                }}
                onPress={() => {
                  void toggleFavorite();
                }}
                style={({ pressed }) => [
                  styles.favoriteButton,
                  isFavorite &&
                    styles.favoriteButtonSelected,
                  pressed && styles.pressed,
                ]}
                testID="devotional-favorite-button"
              >
                <Text style={styles.favoriteButtonText}>
                  {isFavorite ? "★" : "☆"}
                </Text>
              </Pressable>
            </View>

            <Text style={[styles.title, styles.heroTextLight]}>
              {content.title}
            </Text>

            {content.subtitle ? (
              <Text style={styles.subtitle}>
                {content.subtitle}
              </Text>
            ) : null}

            {authorProfile ? (
              <View
                style={styles.authorBlock}
                testID="devotional-public-author"
              >
                <Text style={[styles.authorName, styles.heroTextLight]}>
                  Por {authorProfile.displayName}
                </Text>
                {authorMeta ? (
                  <Text style={[styles.authorMeta, styles.heroTextMutedLight]}>
                    {authorMeta}
                  </Text>
                ) : null}
              </View>
            ) : null}

            {content.summary ? (
              <Text style={[styles.summary, styles.heroTextMutedLight]}>
                {content.summary}
              </Text>
            ) : null}

            <Text
              style={styles.progressLabel}
              testID="devotional-progress-label"
            >
              {getProgressLabel(progress)}
            </Text>
          </View>
        </View>

        <View style={styles.blocks}>
          {content.blocks.map(renderBlock)}
        </View>

        {content.reflectionPrompt?.trim() ? (
          <View
            style={styles.journalCard}
            testID="devotional-journal-card"
          >
            <Text style={styles.blockEyebrow}>
              REGISTRAR NO DIÁRIO
            </Text>
            <Text style={styles.blockParagraph}>
              {content.reflectionPrompt}
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Registrar reflexão do devocional no Diário"
              onPress={openJournal}
              style={({ pressed }) => [
                styles.primaryAction,
                pressed && styles.pressed,
              ]}
              testID="devotional-open-journal-button"
            >
              <Text style={styles.primaryActionText}>
                Registrar no Diário
              </Text>
            </Pressable>
          </View>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            progress?.state === "COMPLETED"
              ? "Marcar devocional como em andamento"
              : "Concluir devocional"
          }
          onPress={() => {
            void toggleCompletion();
          }}
          style={({ pressed }) => [
            styles.completionButton,
            progress?.state === "COMPLETED" &&
              styles.completionButtonCompleted,
            pressed && styles.pressed,
          ]}
          testID="devotional-completion-button"
        >
          <Text style={styles.completionButtonText}>
            {progress?.state === "COMPLETED"
              ? "Marcar como em andamento"
              : "Concluir devocional"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  heroFadeImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  heroTextLight: {
    color: colors.textInverse,
  },
  heroTextMutedLight: {
    color: colors.textInverse,
    opacity: 0.9,
  },
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    gap: 14,
    paddingBottom: 40,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  unavailable: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  unavailableTitle: {
    color: colors.textStrong,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  unavailableText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
  heroImage: {
    borderRadius: 20,
    height: 190,
    marginBottom: 18,
    width: "100%",
  },
  hero: {
    backgroundColor: colors.primary,
    overflow: "hidden",
    position: "relative",
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 1,
  },
  heroVisual: {
    width: "100%",
    aspectRatio: 4 / 3,
    position: "relative",
    overflow: "hidden",
  },
  heroBottomFade: {
    bottom: 0,
    height: 56,
    left: 0,
    position: "absolute",
    right: 0,
  },
  heroContent: {
    gap: 6,
    paddingBottom: 12,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  heroTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formatBadge: {
    backgroundColor: colors.secondarySoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  formatBadgeText: {
    color: colors.textStrong,
    fontSize: 11,
    fontWeight: "800",
  },
  favoriteButton: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  favoriteButtonSelected: {
    backgroundColor: colors.secondarySoft,
    borderColor: colors.secondary,
  },
  favoriteButtonText: {
    color: colors.secondaryPressed,
    fontSize: 25,
    lineHeight: 28,
  },
  title: {
    color: colors.textStrong,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 28,
  },
  subtitle: {
    color: colors.textInverse,
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
  authorBlock: {
    gap: 3,
  },
  authorName: {
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
  },
  authorMeta: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  summary: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  progressLabel: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 16,
  },
  blocks: {
    gap: 12,
  },
  blockCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  flowBlock: {
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  inlineBibleReference: {
    alignSelf: "flex-start",
    marginHorizontal: 6,
    marginVertical: 5,
    paddingVertical: 6,
  },
  inlineBibleReferenceText: {
    color: "#0B4A6F",
    fontSize: 16,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  scriptureCard: {
    backgroundColor: colors.secondarySoft,
  },
  calloutCard: {
    borderLeftColor: colors.secondary,
    borderLeftWidth: 4,
  },
  prayerCard: {
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
  },
  actionCard: {
    borderLeftColor: colors.secondaryPressed,
    borderLeftWidth: 4,
  },
  reflectionCard: {
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
  },
  blockHeading2: {
    color: colors.textStrong,
    fontSize: 21,
    fontWeight: "800",
    lineHeight: 27,
  },
  blockHeading3: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 24,
  },
  blockParagraph: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
  },
  blockEyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  scriptureReference: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "800",
  },
  scriptureQuote: {
    color: colors.text,
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 23,
  },
  unresolvedReference: {
    color: colors.textMuted,
    fontSize: 14,
  },
  listRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 8,
  },
  listMarker: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
    minWidth: 20,
  },
  listText: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  blockProgressButton: {
    alignSelf: "flex-start",
    minHeight: 40,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  blockProgressButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  primaryAction: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 999,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  primaryActionText: {
    color: colors.textInverse,
    fontSize: 13,
    fontWeight: "800",
  },
  journalCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  completionButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    minHeight: 52,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  completionButtonCompleted: {
    backgroundColor: colors.secondaryPressed,
  },
  completionButtonText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.72,
  },
});
