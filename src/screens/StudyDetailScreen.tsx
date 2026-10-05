import { type ReactNode, useCallback, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type {
  BibleReference,
} from "../domain/bible/bibleReference";
import type {
  FavoriteTarget,
} from "../domain/favorites/favorite";
import type {
  StudyContentBlock,
  StudySectionId,
  StudySectionType,
} from "../domain/studies/study";
import type { StudyProgress } from "../domain/studies/studyProgress";
import StudiesScrollHeader from "../components/StudiesScrollHeader";
import { useAppShellChrome } from "../navigation/AppShellChromeContext";
import type {
  JournalEntryEditorSourceContext,
  StudiesStackScreenProps,
} from "../navigation/types";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
import {
  studyIconAssetManifest,
  type StudyIconKey,
} from "../studies/presentation/studyAssetManifest";
import {
  buildStudyDisplayBlocks,
  splitStudyObjectiveForDisplay,
} from "../studies/presentation/studyEditorialPresentationNormalizer";
import { studyTrackPresentationCatalog } from "../studies/presentation/studyTrackPresentationCatalog";
import {
  resolveRuntimeStudyBibleLinks,
  resolveRuntimeStudyBibleReading,
  type ResolvedStudyBibleLink,
} from "../studies/runtime/studyBibleReferenceResolver";
import {
  resolveRuntimeStudyJournalContext,
} from "../studies/runtime/studyJournalContextResolver";
import {
  resolveStudyKeepFavoriteReferences,
} from "../studies/runtime/studyKeepFavoriteResolver";
import {
  getRuntimeStudyById,
  getRuntimeStudyReferences,
  getRuntimeStudySections,
} from "../studies/runtime/studyRuntimeCatalog";
import { colors } from "../theme/colors";

type Props = StudiesStackScreenProps<"StudyDetail"> &
  Readonly<{
    onOpenBibleReference?: (
      reference: BibleReference,
    ) => void | Promise<void>;
    onOpenJournalContext?: (
      context: Extract<
        JournalEntryEditorSourceContext,
        { sourceType: "STUDY" }
      >,
    ) => void | Promise<void>;
    onRequestFavorites?: () => void;
  }>;

const SECTION_LABELS: Record<StudySectionType, string> = {
  GOLDEN_TEXT: "Texto Áureo",
  PRACTICAL_TRUTH: "Verdade Prática",
  BIBLE_READING: "Leitura Bíblica",
  BEFORE_UNDERSTANDING: "Antes de entender",
  READ: "Leia",
  OBSERVE: "Observe",
  UNDERSTAND: "Compreenda",
  CONNECT: "Conecte",
  INTERPRETATION_CAUTION: "Cuidado: não confundir",
  REFLECT: "Reflita",
  APPLY: "Aplique",
  JOURNEY_TAKEAWAY: "O que levamos da Jornada",
  PRACTICE_TODAY: "Pratique hoje",
  REFLECTION_QUESTIONS: "Para refletir",
  JOURNAL_PROMPT: "Registrar no Diário",
  PRAYER: "Ore",
  KEEP: "Para guardar",
  GROUP_MODE: "Modo grupo",
  CONTINUE_JOURNEY: "Para continuar",
  DEEPEN: "Aprofunde",
  REFERENCES: "Referências",
  EDITORIAL_NOTE: "Nota editorial",
};

const SECTION_ICON_KEYS: Record<StudySectionType, StudyIconKey> = {
  GOLDEN_TEXT: "textoAureo",
  PRACTICAL_TRUTH: "verdadePratica",
  BIBLE_READING: "leituraBiblica",
  BEFORE_UNDERSTANDING: "compreenda",
  READ: "leia",
  OBSERVE: "observe",
  UNDERSTAND: "compreenda",
  CONNECT: "conecte",
  INTERPRETATION_CAUTION: "cuidadoNaoConfundir",
  REFLECT: "reflita",
  APPLY: "aplique",
  JOURNEY_TAKEAWAY: "levamosDaJornada",
  PRACTICE_TODAY: "pratiqueHoje",
  REFLECTION_QUESTIONS: "paraRefletir",
  JOURNAL_PROMPT: "registrarDiario",
  PRAYER: "ore",
  KEEP: "paraGuardar",
  GROUP_MODE: "modoGrupo",
  CONTINUE_JOURNEY: "continueJornada",
  DEEPEN: "aprofunde",
  REFERENCES: "referencias",
  EDITORIAL_NOTE: "cuidadoNaoConfundir",
};

type StudySectionVisualTone =
  | "DEFAULT"
  | "SCRIPTURE"
  | "CONNECTION"
  | "REFLECTION"
  | "PRACTICE"
  | "TAKEAWAY"
  | "CAUTION"
  | "REFERENCE";

const SECTION_VISUAL_TONES: Readonly<
  Record<StudySectionType, StudySectionVisualTone>
> = {
  GOLDEN_TEXT: "SCRIPTURE",
  PRACTICAL_TRUTH: "TAKEAWAY",
  BIBLE_READING: "SCRIPTURE",
  BEFORE_UNDERSTANDING: "DEFAULT",
  READ: "SCRIPTURE",
  OBSERVE: "DEFAULT",
  UNDERSTAND: "DEFAULT",
  CONNECT: "CONNECTION",
  INTERPRETATION_CAUTION: "CAUTION",
  REFLECT: "REFLECTION",
  APPLY: "PRACTICE",
  JOURNEY_TAKEAWAY: "TAKEAWAY",
  PRACTICE_TODAY: "PRACTICE",
  REFLECTION_QUESTIONS: "REFLECTION",
  JOURNAL_PROMPT: "PRACTICE",
  PRAYER: "REFLECTION",
  KEEP: "TAKEAWAY",
  GROUP_MODE: "CONNECTION",
  CONTINUE_JOURNEY: "CONNECTION",
  DEEPEN: "DEFAULT",
  REFERENCES: "REFERENCE",
  EDITORIAL_NOTE: "REFERENCE",
};
const getEstimatedTimeLabel = (
  minimum: number,
  maximum: number,
): string => (minimum === maximum ? `${minimum} min` : `${minimum}-${maximum} min`);

const getBlockPreviewText = (block: StudyContentBlock): string => {
  if (block.type === "BULLET_LIST" || block.type === "NUMBERED_LIST") {
    return block.items[0] ?? "";
  }

  return block.text;
};

const getSectionPreview = (
  blocks: readonly StudyContentBlock[],
): string | null => {
  for (const block of blocks) {
    const preview = getBlockPreviewText(block).trim();
    if (preview !== "") {
      return preview;
    }
  }

  return null;
};

type StudyBibleReferenceOpenHandler = (
  reference: BibleReference,
) => void | Promise<void>;

type RenderableStudyBibleLink = Readonly<{
  start: number;
  end: number;
  link: ResolvedStudyBibleLink;
}>;

const allocateStudyBibleLinkSpans = (
  text: string,
  links: readonly ResolvedStudyBibleLink[],
): readonly RenderableStudyBibleLink[] => {
  const candidates = [...links]
    .filter(
      (link) =>
        Number.isInteger(link.sourceStart) &&
        Number.isInteger(link.sourceEnd) &&
        link.sourceStart >= 0 &&
        link.sourceEnd <= text.length &&
        link.sourceStart < link.sourceEnd,
    )
    .sort((left, right) => {
      if (left.sourceStart !== right.sourceStart) {
        return left.sourceStart - right.sourceStart;
      }

      if (left.sourceEnd !== right.sourceEnd) {
        return left.sourceEnd - right.sourceEnd;
      }

      return left.canonicalText.localeCompare(
        right.canonicalText,
        "pt-BR",
      );
    });

  const allocated: RenderableStudyBibleLink[] = [];
  let cursor = 0;

  for (const link of candidates) {
    const start = Math.max(link.sourceStart, cursor);
    const end = link.sourceEnd;

    if (
      start >= end ||
      text.slice(start, end).trim().length === 0
    ) {
      continue;
    }

    allocated.push({
      start,
      end,
      link,
    });
    cursor = end;
  }

  return allocated;
};

const renderStudyBibleLinkedText = ({
  text,
  links,
  onOpenBibleReference,
  navigationPending,
  testIDPrefix,
}: Readonly<{
  text: string;
  links: readonly ResolvedStudyBibleLink[];
  onOpenBibleReference?: StudyBibleReferenceOpenHandler;
  navigationPending: boolean;
  testIDPrefix: string;
}>): ReactNode => {
  if (!onOpenBibleReference || links.length === 0) {
    return text;
  }

  const allocated =
    allocateStudyBibleLinkSpans(text, links);

  if (allocated.length === 0) {
    return text;
  }

  const nodes: ReactNode[] = [];
  let cursor = 0;

  allocated.forEach((item, linkIndex) => {
    if (cursor < item.start) {
      nodes.push(text.slice(cursor, item.start));
    }

    nodes.push(
      <Text
        accessibilityLabel={`Abrir ${item.link.canonicalText} na Bíblia`}
        accessibilityRole="link"
        accessibilityState={{
          disabled: navigationPending,
        }}
        key={`${testIDPrefix}-link-${linkIndex}`}
        onPress={
          navigationPending
            ? undefined
            : () => {
                void onOpenBibleReference(
                  item.link.reference,
                );
              }
        }
        style={[
          styles.inlineBibleReference,
          navigationPending &&
            styles.inlineBibleReferenceDisabled,
        ]}
        testID={`${testIDPrefix}-link-${linkIndex}`}
      >
        {text.slice(item.start, item.end)}
      </Text>,
    );

    cursor = item.end;
  });

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
};

function StudyBlockView({
  block,
  blockIndex,
  sectionId,
  bibleLinks,
  bibleNavigationPending,
  onOpenBibleReference,
}: {
  block: StudyContentBlock;
  blockIndex: number;
  sectionId: StudySectionId;
  bibleLinks: readonly ResolvedStudyBibleLink[];
  bibleNavigationPending: boolean;
  onOpenBibleReference?: StudyBibleReferenceOpenHandler;
}) {
  const linksForLeaf = (
    itemIndex: number | null,
    textSource: ResolvedStudyBibleLink["textSource"],
  ): readonly ResolvedStudyBibleLink[] =>
    bibleLinks.filter(
      (link) =>
        link.itemIndex === itemIndex &&
        link.textSource === textSource,
    );

  const renderText = (
    text: string,
    itemIndex: number | null,
    textSource: ResolvedStudyBibleLink["textSource"],
    suffix: string,
  ): ReactNode =>
    renderStudyBibleLinkedText({
      text,
      links: linksForLeaf(itemIndex, textSource),
      onOpenBibleReference,
      navigationPending: bibleNavigationPending,
      testIDPrefix:
        `study-bible-link-${sectionId}-${blockIndex}-${suffix}`,
    });

  if (block.type === "PARAGRAPH") {
    return (
      <Text style={styles.blockParagraph}>
        {renderText(block.text, null, "TEXT", "paragraph")}
      </Text>
    );
  }

  if (block.type === "SUBHEADING") {
    return (
      <Text style={styles.blockSubheading}>
        {renderText(block.text, null, "TEXT", "subheading")}
      </Text>
    );
  }

  if (block.type === "BULLET_LIST") {
    return (
      <View style={styles.blockList}>
        {block.items.map((item, itemIndex) => (
          <View
            key={`${blockIndex}-bullet-${itemIndex}`}
            style={styles.blockListRow}
          >
            <Text style={styles.blockListMarker}>•</Text>
            <Text style={styles.blockListText}>
              {renderText(
                item,
                itemIndex,
                "TEXT",
                `bullet-${itemIndex}`,
              )}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  if (block.type === "NUMBERED_LIST") {
    return (
      <View style={styles.blockList}>
        {block.items.map((item, itemIndex) => (
          <View
            key={`${blockIndex}-number-${itemIndex}`}
            style={styles.blockListRow}
          >
            <Text style={styles.blockNumberMarker}>
              {itemIndex + 1}.
            </Text>
            <Text style={styles.blockListText}>
              {renderText(
                item,
                itemIndex,
                "TEXT",
                `number-${itemIndex}`,
              )}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.callout}>
      {block.title ? (
        <Text style={styles.calloutTitle}>
          {renderText(
            block.title,
            null,
            "TITLE",
            "callout-title",
          )}
        </Text>
      ) : null}
      <Text style={styles.calloutText}>
        {renderText(
          block.text,
          null,
          "TEXT",
          "callout-text",
        )}
      </Text>
    </View>
  );
}

export default function StudyDetailScreen({
  navigation,
  route,
  onOpenBibleReference,
  onOpenJournalContext,
  onRequestFavorites,
}: Props) {
  const { handleScroll, resetChrome } = useAppShellChrome();
  const personalPlatformHub = getPersonalPlatformHub();
  const studyProgressService =
    personalPlatformHub.studyProgressService;
  const favoritesService =
    personalPlatformHub.favoritesService;
  const entry = getRuntimeStudyById(route.params.studyId);
  const content = entry?.content ?? null;
  const sections = content
    ? getRuntimeStudySections(content.id)
    : [];
  const objectiveDisplay = content
    ? splitStudyObjectiveForDisplay(
        content.objective,
        content.trackId !== "track-06",
      )
    : null;
  const references = content
    ? getRuntimeStudyReferences(content.id)
    : [];
  const bibleReadingResolution = content
    ? resolveRuntimeStudyBibleReading(content.id)
    : null;
  const bibleLinks = content
    ? resolveRuntimeStudyBibleLinks(content.id)
    : [];
  const journalContextResolution = content
    ? resolveRuntimeStudyJournalContext(content.id)
    : null;
  const keepFavoriteResolution = content
    ? resolveStudyKeepFavoriteReferences(content.id)
    : null;
  const [expandedSectionIds, setExpandedSectionIds] = useState<
    ReadonlySet<string>
  >(() => new Set());
  const [studyProgress, setStudyProgress] =
    useState<StudyProgress | null>(null);
  const [progressActionPending, setProgressActionPending] =
    useState(false);
  const [sectionProgressPending, setSectionProgressPending] =
    useState(false);
  const [progressReady, setProgressReady] =
    useState(false);
  const [
    bibleNavigationPending,
    setBibleNavigationPending,
  ] = useState(false);
  const [
    journalNavigationPending,
    setJournalNavigationPending,
  ] = useState(false);
  const [favoriteReady, setFavoriteReady] =
    useState(false);
  const [isStudyFavorite, setIsStudyFavorite] =
    useState(false);
  const [
    keepFavoriteCanonicalTexts,
    setKeepFavoriteCanonicalTexts,
  ] = useState<ReadonlySet<string>>(() => new Set());
  const [
    studyFavoritePending,
    setStudyFavoritePending,
  ] = useState(false);
  const [
    keepFavoritePendingKeys,
    setKeepFavoritePendingKeys,
  ] = useState<ReadonlySet<string>>(() => new Set());
  const progressMutationLockRef = useRef(false);
  const studyFavoriteBusyRef = useRef(false);
  const keepFavoriteBusyRef = useRef(new Set<string>());

  useFocusEffect(
    useCallback(() => {
      resetChrome();

      if (!content) {
        return undefined;
      }

      let active = true;

      setProgressReady(false);
      setStudyProgress((current) =>
        current?.studyId === content.id ? current : null,
      );

      void studyProgressService
        .openStudy(content.id)
        .then((progress) => {
          if (!active) {
            return;
          }

          setStudyProgress(progress);

          if (
            progress.lastSectionKey &&
            getRuntimeStudySections(content.id).some(
              (section) =>
                section.id === progress.lastSectionKey,
            )
          ) {
            setExpandedSectionIds((current) => {
              if (current.has(progress.lastSectionKey as string)) {
                return current;
              }

              const next = new Set(current);
              next.add(progress.lastSectionKey as string);
              return next;
            });
          }

          setProgressReady(true);
        })
        .catch(() => {
          if (active) {
            setProgressReady(true);
          }
        });

      setFavoriteReady(false);

      void (async () => {
        try {
          const keepResolution =
            resolveStudyKeepFavoriteReferences(content.id);
          const keepReferences = keepResolution.ok
            ? keepResolution.references
            : [];
          const studyTarget: FavoriteTarget = {
            kind: "study",
            studyId: content.id,
          };
          const favoriteStates = await Promise.all([
            favoritesService.isFavorite(studyTarget),
            ...keepReferences.map((reference) =>
              favoritesService.isFavorite({
                kind: "bible_reference",
                reference: reference.reference,
              }),
            ),
          ]);

          if (!active) {
            return;
          }

          setIsStudyFavorite(favoriteStates[0] ?? false);

          const nextKeepFavorites = new Set<string>();

          keepReferences.forEach((reference, index) => {
            if (favoriteStates[index + 1]) {
              nextKeepFavorites.add(reference.canonicalText);
            }
          });

          setKeepFavoriteCanonicalTexts(nextKeepFavorites);
        } catch {
          if (active) {
            setIsStudyFavorite(false);
            setKeepFavoriteCanonicalTexts(new Set());
          }
        } finally {
          if (active) {
            setFavoriteReady(true);
          }
        }
      })();

      return () => {
        active = false;
      };
    }, [
      content,
      favoritesService,
      resetChrome,
      studyProgressService,
    ]),
  );

  const handleBack = useCallback(() => {
    if (
      route.params.returnToFavorites &&
      onRequestFavorites
    ) {
      onRequestFavorites();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate("StudiesHome");
  }, [
    navigation,
    onRequestFavorites,
    route.params.returnToFavorites,
  ]);

  if (!entry || !content) {
    return (
      <View style={styles.screen}>
        <StudiesScrollHeader
          onBack={handleBack}
          testID="study-detail-scroll-header"
          title="Estudo Bíblico"
        />

        <View style={styles.centered} testID="study-detail-not-found">
          <Text style={styles.emptyTitle}>Estudo indisponível</Text>
          <Text style={styles.emptyText}>
            Este estudo não está disponível para leitura no momento.
          </Text>
        </View>
      </View>
    );
  }

  const presentation =
    studyTrackPresentationCatalog.find(
      (candidate) => candidate.trackId === content.trackId,
    ) ?? null;

  const estimatedTimeLabel =
    content.estimatedMinutes === null
      ? "Tempo não informado"
      : getEstimatedTimeLabel(
          content.estimatedMinutes.minimum,
          content.estimatedMinutes.maximum,
        );

  const toggleSection = (
    sectionId: StudySectionId,
    sectionIndex: number,
  ) => {
    const opening = !expandedSectionIds.has(sectionId);

    if (
      opening &&
      (
        !progressReady ||
        progressMutationLockRef.current
      )
    ) {
      return;
    }

    setExpandedSectionIds((current) => {
      const next = new Set(current);

      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }

      return next;
    });

    if (opening) {
      progressMutationLockRef.current = true;
      setSectionProgressPending(true);

      void studyProgressService
        .recordSectionOpened({
          studyId: content.id,
          sectionId,
          sectionIndex,
          sectionCount: sections.length,
        })
        .then(setStudyProgress)
        .catch(() => undefined)
        .finally(() => {
          progressMutationLockRef.current = false;
          setSectionProgressPending(false);
        });
    }
  };

  const handleCompleteStudy = async () => {
    if (
      !progressReady ||
      progressActionPending ||
      progressMutationLockRef.current
    ) {
      return;
    }

    progressMutationLockRef.current = true;
    setProgressActionPending(true);

    try {
      const progress =
        await studyProgressService.completeStudy(
          content.id,
        );

      setStudyProgress(progress);
    } catch {
      // Keep the approved Reader usable if local persistence fails.
    } finally {
      progressMutationLockRef.current = false;
      setProgressActionPending(false);
    }
  };

  const handleUncompleteStudy = async () => {
    if (
      !progressReady ||
      progressActionPending ||
      progressMutationLockRef.current
    ) {
      return;
    }

    progressMutationLockRef.current = true;
    setProgressActionPending(true);

    try {
      const progress =
        await studyProgressService.uncompleteStudy(
          content.id,
        );

      setStudyProgress(progress);
    } catch {
      // Keep the approved Reader usable if local persistence fails.
    } finally {
      progressMutationLockRef.current = false;
      setProgressActionPending(false);
    }
  };

  const handleOpenResolvedBibleReference = async (
    reference: BibleReference,
  ) => {
    if (
      !onOpenBibleReference ||
      bibleNavigationPending
    ) {
      return;
    }

    setBibleNavigationPending(true);

    try {
      await onOpenBibleReference(reference);
    } catch {
      // Keep the Study Reader usable if navigation fails.
    } finally {
      setBibleNavigationPending(false);
    }
  };

  const handleOpenBibleReading = async () => {
    if (!bibleReadingResolution?.ok) {
      return;
    }

    await handleOpenResolvedBibleReference(
      bibleReadingResolution.reference,
    );
  };

  const handleOpenJournal = async () => {
    if (
      !journalContextResolution?.ok ||
      !onOpenJournalContext ||
      journalNavigationPending
    ) {
      return;
    }

    setJournalNavigationPending(true);

    try {
      await onOpenJournalContext({
        sourceType: "STUDY",
        trackId: journalContextResolution.trackId,
        studyId: journalContextResolution.studyId,
        sourceTitleSnapshot:
          journalContextResolution.sourceTitleSnapshot,
        promptSnapshot:
          journalContextResolution.promptSnapshot,
      });
    } catch {
      // Keep the Study Reader usable if navigation fails.
    } finally {
      setJournalNavigationPending(false);
    }
  };

  const handleToggleStudyFavorite = async () => {
    if (
      !favoriteReady ||
      studyFavoriteBusyRef.current
    ) {
      return;
    }

    studyFavoriteBusyRef.current = true;
    setStudyFavoritePending(true);

    try {
      const nextIsFavorite =
        await favoritesService.toggle({
          kind: "study",
          studyId: content.id,
        });

      setIsStudyFavorite(nextIsFavorite);
    } catch {
      // Keep the Study Reader usable if favorite persistence fails.
    } finally {
      studyFavoriteBusyRef.current = false;
      setStudyFavoritePending(false);
    }
  };

  const handleToggleKeepFavorite = async (
    target: Extract<
      FavoriteTarget,
      { kind: "bible_reference" }
    >,
    canonicalText: string,
  ) => {
    if (
      !favoriteReady ||
      keepFavoriteBusyRef.current.has(canonicalText)
    ) {
      return;
    }

    keepFavoriteBusyRef.current.add(canonicalText);
    setKeepFavoritePendingKeys((current) => {
      const next = new Set(current);
      next.add(canonicalText);
      return next;
    });

    try {
      const currentlyFavorite =
        keepFavoriteCanonicalTexts.has(canonicalText);

      if (currentlyFavorite) {
        await favoritesService.remove(target);
      } else {
        await favoritesService.add(target, {
          kind: "study",
          studyId: content.id,
        });
      }

      setKeepFavoriteCanonicalTexts((current) => {
        const next = new Set(current);

        if (currentlyFavorite) {
          next.delete(canonicalText);
        } else {
          next.add(canonicalText);
        }

        return next;
      });
    } catch {
      // Keep the Study Reader usable if favorite persistence fails.
    } finally {
      keepFavoriteBusyRef.current.delete(canonicalText);
      setKeepFavoritePendingKeys((current) => {
        const next = new Set(current);
        next.delete(canonicalText);
        return next;
      });
    }
  };

  const visibleStudyProgress =
    studyProgress?.studyId === content.id
      ? studyProgress
      : null;
  const progressInteractionDisabled =
    !progressReady ||
    progressActionPending ||
    sectionProgressPending;
  const isCompleted =
    visibleStudyProgress?.state === "COMPLETED";

  return (
    <View style={styles.screen}>
      <StudiesScrollHeader
        onBack={handleBack}
        testID="study-detail-scroll-header"
        title="Estudo Bíblico"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        testID="study-detail-screen"
      >
      {presentation ? (
        <View style={styles.heroFrame}>
          <ImageBackground
            accessible={false}
            imageStyle={styles.heroImage}
            importantForAccessibility="no"
            resizeMode="cover"
            source={presentation.assets.trackHero}
            style={styles.hero}
            testID="study-detail-hero"
          >
            <Image
              accessibilityIgnoresInvertColors
              accessible={false}
              importantForAccessibility="no"
              resizeMode="stretch"
              source={require("../../assets/home/overlays/hero_navy_fade.png")}
              style={styles.heroFadeImage}
            />

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                {content.title}
              </Text>

              <Text style={styles.heroMeta}>
                Trilha {presentation.order} • Estudo{" "}
                {String(content.number).padStart(2, "0")}
              </Text>

              <View style={styles.heroTimeRow}>
                <Text
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                  style={styles.heroClock}
                >
                  ◷
                </Text>
                <Text style={styles.heroTime}>{estimatedTimeLabel}</Text>
              </View>

              {entry.publicAuthorDisplayName ? (
                <Text style={styles.heroAuthor}>
                  Por {entry.publicAuthorDisplayName}
                </Text>
              ) : null}
            </View>
          </ImageBackground>

          <Pressable
            accessibilityLabel={
              isStudyFavorite
                ? "Remover estudo dos favoritos"
                : "Adicionar estudo aos favoritos"
            }
            accessibilityRole="button"
            accessibilityState={{
              checked: isStudyFavorite,
              disabled:
                !favoriteReady ||
                studyFavoritePending,
            }}
            disabled={
              !favoriteReady ||
              studyFavoritePending
            }
            onPress={() => {
              void handleToggleStudyFavorite();
            }}
            style={({ pressed }) => [
              styles.favoriteHeartButton,
              isStudyFavorite &&
                styles.favoriteHeartButtonSelected,
              pressed &&
                styles.favoriteHeartButtonPressed,
              (!favoriteReady ||
                studyFavoritePending) &&
                styles.favoriteHeartButtonDisabled,
            ]}
            testID="study-favorite-button"
          >
            <Text style={styles.favoriteHeartText}>
              {isStudyFavorite ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.heroFallback} testID="study-detail-hero-fallback">
          <Text style={styles.heroTitle}>{content.title}</Text>
          <Text style={styles.heroMeta}>
            Estudo {String(content.number).padStart(2, "0")}
          </Text>
          <Text style={styles.heroTime}>{estimatedTimeLabel}</Text>

          <Pressable
            accessibilityLabel={
              isStudyFavorite
                ? "Remover estudo dos favoritos"
                : "Adicionar estudo aos favoritos"
            }
            accessibilityRole="button"
            accessibilityState={{
              checked: isStudyFavorite,
              disabled:
                !favoriteReady ||
                studyFavoritePending,
            }}
            disabled={
              !favoriteReady ||
              studyFavoritePending
            }
            onPress={() => {
              void handleToggleStudyFavorite();
            }}
            style={({ pressed }) => [
              styles.favoriteHeartButton,
              isStudyFavorite &&
                styles.favoriteHeartButtonSelected,
              pressed &&
                styles.favoriteHeartButtonPressed,
              (!favoriteReady ||
                studyFavoritePending) &&
                styles.favoriteHeartButtonDisabled,
            ]}
            testID="study-favorite-button"
          >
            <Text style={styles.favoriteHeartText}>
              {isStudyFavorite ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>
      )}

      <View style={styles.summaryCards} testID="study-detail-summary">
        <View style={styles.infoCard} testID="study-detail-theme">
          <View style={styles.summaryHeading}>
            <View style={styles.summaryIconFrame}>
              <Image
                accessible={false}
                importantForAccessibility="no"
                source={studyIconAssetManifest.tema}
                style={styles.summaryIcon}
              />
            </View>
            <Text style={styles.summaryLabel}>Tema</Text>
          </View>
          <Text style={styles.summaryValue}>{content.title}</Text>
        </View>

        <View style={styles.infoCard} testID="study-detail-central-question">
          <View style={styles.summaryHeading}>
            <View style={styles.summaryIconFrame}>
              <Image
                accessible={false}
                importantForAccessibility="no"
                source={studyIconAssetManifest.perguntaCentral}
                style={styles.summaryIcon}
              />
            </View>
            <Text style={styles.summaryLabel}>Pergunta central</Text>
          </View>
          <Text style={styles.summaryValue}>{content.questionCentral}</Text>
        </View>

        <View style={styles.infoCard} testID="study-detail-objective">
          <View style={styles.summaryHeading}>
            <View style={styles.summaryIconFrame}>
              <Image
                accessible={false}
                importantForAccessibility="no"
                source={studyIconAssetManifest.objetivo}
                style={styles.summaryIcon}
              />
            </View>
            <Text style={styles.summaryLabel}>Objetivo</Text>
          </View>
          {objectiveDisplay && objectiveDisplay.items.length > 0 ? (
            <>
              {objectiveDisplay.intro !== "" ? (
                <Text style={styles.summaryValue}>
                  {objectiveDisplay.intro}
                </Text>
              ) : null}

              <View style={styles.objectiveList}>
                {objectiveDisplay.items.map((item, itemIndex) => (
                  <View
                    key={`objective-item-${itemIndex}`}
                    style={styles.blockListRow}
                  >
                    <Text style={styles.objectiveListMarker}>•</Text>
                    <Text style={styles.objectiveListText}>{item}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.summaryValue}>{content.objective}</Text>
          )}
        </View>
      </View>

      <View style={styles.sectionList} testID="study-detail-sections">
        {sections.map((section, sectionIndex) => {
          const expanded = expandedSectionIds.has(section.id);
          const iconKey = SECTION_ICON_KEYS[section.type];
          const visualTone = SECTION_VISUAL_TONES[section.type];
          const preview = getSectionPreview(section.blocks);
          const sectionBibleLinks = bibleLinks.filter(
            (link) => link.sectionId === section.id,
          );

          return (
            <View
              key={section.id}
              style={[
                styles.sectionCard,
                visualTone === "DEFAULT" &&
                  styles.sectionCardDefault,
                visualTone === "SCRIPTURE" &&
                  styles.sectionCardScripture,
                visualTone === "CONNECTION" &&
                  styles.sectionCardConnection,
                visualTone === "REFLECTION" &&
                  styles.sectionCardReflection,
                visualTone === "PRACTICE" &&
                  styles.sectionCardPractice,
                visualTone === "TAKEAWAY" &&
                  styles.sectionCardTakeaway,
                visualTone === "CAUTION" &&
                  styles.sectionCardCaution,
                visualTone === "REFERENCE" &&
                  styles.sectionCardReference,
              ]}
              testID={`study-section-${section.id}`}
            >
              <Pressable
                accessibilityLabel={`${expanded ? "Fechar" : "Abrir"} seção ${SECTION_LABELS[section.type]}`}
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                disabled={progressInteractionDisabled}
                onPress={() => toggleSection(section.id, sectionIndex)}
                style={({ pressed }) => [
                  styles.sectionToggle,
                  visualTone === "DEFAULT" &&
                    styles.sectionToggleDefault,
                  visualTone === "SCRIPTURE" &&
                    styles.sectionToggleScripture,
                  visualTone === "CONNECTION" &&
                    styles.sectionToggleConnection,
                  visualTone === "REFLECTION" &&
                    styles.sectionToggleReflection,
                  visualTone === "PRACTICE" &&
                    styles.sectionTogglePractice,
                  visualTone === "TAKEAWAY" &&
                    styles.sectionToggleTakeaway,
                  visualTone === "CAUTION" &&
                    styles.sectionToggleCaution,
                  visualTone === "REFERENCE" &&
                    styles.sectionToggleReference,
                  pressed && styles.sectionTogglePressed,
                ]}
              >
                <View style={styles.sectionTitleRow}>
                  <View style={styles.sectionIconFrame}>
                    <Image
                      accessible={false}
                      importantForAccessibility="no"
                      source={studyIconAssetManifest[iconKey]}
                      style={styles.sectionRowIcon}
                    />
                  </View>

                  <View style={styles.sectionTitleColumn}>
                    <Text style={styles.sectionTitle}>
                      {SECTION_LABELS[section.type]}
                    </Text>

                    {!expanded && preview ? (
                      <Text numberOfLines={1} style={styles.sectionPreview}>
                        {preview}
                      </Text>
                    ) : null}
                  </View>
                </View>

                <Text
                  accessibilityElementsHidden
                  importantForAccessibility="no"
                  style={styles.sectionChevron}
                >
                  {expanded ? "⌃" : "⌄"}
                </Text>
              </Pressable>

              {expanded ? (
                <View style={styles.sectionBody}>
                  {buildStudyDisplayBlocks({
                    blocks: section.blocks,
                    bibleLinks: sectionBibleLinks,
                    formattingEnabled:
                      content.trackId !== "track-06",
                  }).map((displayBlock) => (
                    <StudyBlockView
                      key={`${section.id}-${displayBlock.key}`}
                      bibleLinks={displayBlock.bibleLinks}
                      bibleNavigationPending={
                        bibleNavigationPending
                      }
                      block={displayBlock.block}
                      blockIndex={displayBlock.blockIndex}
                      onOpenBibleReference={
                        onOpenBibleReference
                          ? handleOpenResolvedBibleReference
                          : undefined
                      }
                      sectionId={section.id}
                    />
                  ))}

                  {section.type === "BIBLE_READING" &&
                  bibleReadingResolution?.ok &&
                  bibleReadingResolution.sectionId === section.id &&
                  onOpenBibleReference ? (
                    <Pressable
                      accessibilityLabel="Abrir leitura na Bíblia"
                      accessibilityRole="button"
                      accessibilityState={{
                        disabled: bibleNavigationPending,
                      }}
                      disabled={bibleNavigationPending}
                      onPress={() => {
                        void handleOpenBibleReading();
                      }}
                      style={({ pressed }) => [
                        styles.bibleReadingButton,
                        pressed &&
                          styles.bibleReadingButtonPressed,
                        bibleNavigationPending &&
                          styles.bibleReadingButtonDisabled,
                      ]}
                      testID="study-open-bible-button"
                    >
                      <Text style={styles.bibleReadingButtonText}>
                        {bibleNavigationPending
                          ? "Abrindo..."
                          : "Abrir na Bíblia"}
                      </Text>
                    </Pressable>
                  ) : null}

                  {section.type === "JOURNAL_PROMPT" &&
                  journalContextResolution?.ok &&
                  journalContextResolution.sectionId === section.id &&
                  onOpenJournalContext ? (
                    <Pressable
                      accessibilityLabel="Registrar no Diário"
                      accessibilityRole="button"
                      accessibilityState={{
                        disabled: journalNavigationPending,
                      }}
                      disabled={journalNavigationPending}
                      onPress={() => {
                        void handleOpenJournal();
                      }}
                      style={({ pressed }) => [
                        styles.bibleReadingButton,
                        pressed &&
                          styles.bibleReadingButtonPressed,
                        journalNavigationPending &&
                          styles.bibleReadingButtonDisabled,
                      ]}
                      testID="study-open-journal-button"
                    >
                      <Text style={styles.bibleReadingButtonText}>
                        {journalNavigationPending
                          ? "Abrindo..."
                          : "Registrar no Diário"}
                      </Text>
                    </Pressable>
                  ) : null}

                  {section.type === "KEEP" &&
                  keepFavoriteResolution?.ok &&
                  keepFavoriteResolution.sectionId === section.id ? (
                    <View
                      style={styles.keepFavoriteList}
                      testID="study-keep-favorites"
                    >
                      {keepFavoriteResolution.references.map(
                        (reference, referenceIndex) => {
                          const isFavorite =
                            keepFavoriteCanonicalTexts.has(
                              reference.canonicalText,
                            );
                          const pending =
                            keepFavoritePendingKeys.has(
                              reference.canonicalText,
                            );

                          return (
                            <Pressable
                              key={reference.canonicalText}
                              accessibilityLabel={
                                isFavorite
                                  ? `Remover ${reference.canonicalText} dos favoritos`
                                  : `Adicionar ${reference.canonicalText} aos favoritos`
                              }
                              accessibilityRole="button"
                              accessibilityState={{
                                checked: isFavorite,
                                disabled:
                                  !favoriteReady ||
                                  pending,
                              }}
                              disabled={
                                !favoriteReady ||
                                pending
                              }
                              onPress={() => {
                                void handleToggleKeepFavorite(
                                  {
                                    kind: "bible_reference",
                                    reference:
                                      reference.reference,
                                  },
                                  reference.canonicalText,
                                );
                              }}
                              style={({ pressed }) => [
                                styles.keepFavoriteButton,
                                isFavorite &&
                                  styles.keepFavoriteButtonSelected,
                                pressed &&
                                  styles.keepFavoriteButtonPressed,
                                (!favoriteReady ||
                                  pending) &&
                                  styles.keepFavoriteButtonDisabled,
                              ]}
                              testID={`study-keep-favorite-${referenceIndex}`}
                            >
                              <Text
                                style={
                                  styles.keepFavoriteReference
                                }
                              >
                                {reference.canonicalText}
                              </Text>
                              <Text
                                style={
                                  styles.keepFavoriteAction
                                }
                              >
                                {pending
                                  ? "Salvando..."
                                  : isFavorite
                                    ? "♥ Salvo"
                                    : "♡ Favoritar"}
                              </Text>
                            </Pressable>
                          );
                        },
                      )}
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          );
        })}
      </View>

      {references.length > 0 ? (
        <View style={styles.referencesCard} testID="study-detail-references">
          <View style={styles.referenceHeading}>
            <View style={styles.sectionIconFrame}>
              <Image
                accessible={false}
                importantForAccessibility="no"
                source={studyIconAssetManifest.referencias}
                style={styles.sectionRowIcon}
              />
            </View>
            <Text style={styles.sectionTitle}>Referências relacionadas</Text>
          </View>

          {references.map((reference) => (
            <View key={reference.id} style={styles.referenceRow}>
              <Text style={styles.referenceLabel}>{reference.label}</Text>
              <Text style={styles.referenceText}>{reference.reference}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={styles.studyActions}>
        {!isCompleted ? (
          <Pressable
            accessibilityRole="button"
            disabled={progressInteractionDisabled}
            onPress={() => {
              void handleCompleteStudy();
            }}
            style={({ pressed }) => [
              styles.nextButton,
              pressed && styles.nextButtonPressed,
              progressInteractionDisabled &&
                styles.progressActionDisabled,
            ]}
            testID="study-complete-button"
          >
            <Text style={styles.nextButtonText}>
              {progressActionPending
                ? "Salvando..."
                : "Concluir estudo"}
            </Text>
          </Pressable>
        ) : (
          <>
            <Text
              style={styles.completedState}
              testID="study-completed-state"
            >
              Estudo concluído
            </Text>

            {content.nextStudyId ? (
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  navigation.navigate("StudyDetail", {
                    studyId: content.nextStudyId as string,
                    returnToFavorites:
                      route.params.returnToFavorites,
                  })
                }
                style={({ pressed }) => [
                  styles.nextButton,
                  pressed && styles.nextButtonPressed,
                ]}
                testID="study-next-button"
              >
                <Text style={styles.nextButtonText}>
                  Próximo estudo
                </Text>
              </Pressable>
            ) : (
              <Text
                style={styles.sequenceEnd}
                testID="study-sequence-end"
              >
                Você chegou ao fim do conteúdo publicado desta sequência.
              </Text>
            )}

            <Pressable
              accessibilityRole="button"
              disabled={progressInteractionDisabled}
              onPress={() => {
                void handleUncompleteStudy();
              }}
              style={({ pressed }) => [
                styles.uncompleteButton,
                pressed && styles.uncompleteButtonPressed,
                progressInteractionDisabled &&
                  styles.progressActionDisabled,
              ]}
              testID="study-uncomplete-button"
            >
              <Text style={styles.uncompleteButtonText}>
                {progressActionPending
                  ? "Atualizando..."
                  : "Marcar como não concluído"}
              </Text>
            </Pressable>
          </>
        )}
      </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  centered: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  heroFrame: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  hero: {
    borderRadius: 18,
    minHeight: 176,
    overflow: "hidden",
    width: "100%",
  },
  heroImage: {
    borderRadius: 18,
  },
  heroFadeImage: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
  },
  heroContent: {
    justifyContent: "center",
    minHeight: 176,
    paddingHorizontal: 18,
    paddingVertical: 12,
    width: "72%",
  },
  heroFallback: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  heroTitle: {
    color: colors.surface,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 28,
  },
  heroMeta: {
    color: colors.secondary,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.3,
    marginTop: 7,
  },
  heroTimeRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    marginTop: 9,
  },
  heroClock: {
    color: colors.surface,
    fontSize: 17,
    lineHeight: 18,
  },
  heroTime: {
    color: colors.surface,
    fontSize: 13,
    fontWeight: "700",
  },
  heroAuthor: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 6,
    opacity: 0.9,
  },
  favoriteHeartButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    position: "absolute",
    right: 12,
    top: 12,
    width: 48,
    zIndex: 2,
  },
  favoriteHeartButtonSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  favoriteHeartButtonPressed: {
    opacity: 0.72,
  },
  favoriteHeartButtonDisabled: {
    opacity: 0.58,
  },
  favoriteHeartText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 28,
  },
  summaryCards: {
    gap: 9,
    marginTop: 12,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  summaryHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
  },
  summaryIconFrame: {
    alignItems: "center",
    backgroundColor: "#FFFBF1",
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  summaryIcon: {
    height: 22,
    width: 22,
  },
  summaryLabel: {
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: "800",
  },
  summaryValue: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7,
  },
  objectiveList: {
    gap: 8,
    marginTop: 10,
  },
  objectiveListMarker: {
    color: colors.secondaryPressed,
    fontSize: 16,
    fontWeight: "800",
    marginRight: 8,
  },
  objectiveListText: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
  sectionList: {
    gap: 10,
    marginTop: 14,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    borderLeftWidth: 4,
    elevation: 1,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionCardDefault: {
    borderLeftColor: "#AAB7C4",
  },
  sectionCardScripture: {
    borderLeftColor: "#4F7FAE",
  },
  sectionCardConnection: {
    borderLeftColor: "#4F8A73",
  },
  sectionCardReflection: {
    borderLeftColor: "#7763A5",
  },
  sectionCardPractice: {
    borderLeftColor: "#C89A37",
  },
  sectionCardTakeaway: {
    borderLeftColor: "#294C73",
  },
  sectionCardCaution: {
    borderLeftColor: "#B76449",
  },
  sectionCardReference: {
    borderLeftColor: "#7A8591",
  },
  sectionToggle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 62,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  sectionToggleDefault: {
    backgroundColor: "#FAFBFC",
  },
  sectionToggleScripture: {
    backgroundColor: "#EEF5FF",
  },
  sectionToggleConnection: {
    backgroundColor: "#F0F8F4",
  },
  sectionToggleReflection: {
    backgroundColor: "#F6F2FC",
  },
  sectionTogglePractice: {
    backgroundColor: "#FFF8E6",
  },
  sectionToggleTakeaway: {
    backgroundColor: "#EEF3F9",
  },
  sectionToggleCaution: {
    backgroundColor: "#FFF3EF",
  },
  sectionToggleReference: {
    backgroundColor: "#F7F8FA",
  },
  sectionTogglePressed: {
    opacity: 0.72,
  },
  sectionTitleRow: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 11,
    minWidth: 0,
  },
  sectionIconFrame: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: colors.border,
    borderRadius: 11,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  sectionRowIcon: {
    height: 25,
    width: 25,
  },
  sectionTitleColumn: {
    flex: 1,
    minWidth: 0,
  },
  sectionTitle: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 21,
  },
  sectionPreview: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 3,
  },
  sectionChevron: {
    color: colors.primary,
    fontSize: 21,
    fontWeight: "700",
    marginLeft: 10,
  },
  sectionBody: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  blockParagraph: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 12,
  },
  inlineBibleReference: {
    color: colors.primary,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
  inlineBibleReferenceDisabled: {
    opacity: 0.55,
  },
  blockSubheading: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 23,
    marginBottom: 8,
    marginTop: 8,
  },
  blockList: {
    gap: 10,
    marginBottom: 12,
  },
  blockListRow: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  blockListMarker: {
    color: colors.secondaryPressed,
    fontSize: 17,
    fontWeight: "800",
    marginRight: 9,
  },
  blockNumberMarker: {
    color: colors.secondaryPressed,
    fontSize: 15,
    fontWeight: "800",
    marginRight: 9,
    minWidth: 22,
  },
  blockListText: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    lineHeight: 23,
  },
  callout: {
    backgroundColor: "#FFF9E8",
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
    borderRadius: 12,
    marginBottom: 12,
    padding: 14,
  },
  calloutTitle: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
  },
  calloutText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 6,
  },
  bibleReadingButton: {
    alignItems: "center",
    borderColor: colors.primary,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    marginTop: 12,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bibleReadingButtonPressed: {
    backgroundColor: colors.primarySoft,
  },
  bibleReadingButtonDisabled: {
    opacity: 0.58,
  },
  bibleReadingButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  keepFavoriteList: {
    gap: 8,
    marginTop: 12,
  },
  keepFavoriteButton: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  keepFavoriteButtonSelected: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  keepFavoriteButtonPressed: {
    opacity: 0.72,
  },
  keepFavoriteButtonDisabled: {
    opacity: 0.58,
  },
  keepFavoriteReference: {
    color: colors.textStrong,
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    marginRight: 10,
  },
  keepFavoriteAction: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  referencesCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 12,
    padding: 13,
  },
  referenceHeading: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  referenceRow: {
    borderTopColor: colors.border,
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  referenceLabel: {
    color: colors.textStrong,
    fontSize: 13,
    fontWeight: "800",
  },
  referenceText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 3,
  },
  studyActions: {
    marginTop: 18,
  },
  completedState: {
    color: colors.secondaryPressed,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center",
  },
  progressActionDisabled: {
    opacity: 0.58,
  },
  uncompleteButton: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 10,
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  uncompleteButtonPressed: {
    backgroundColor: colors.primarySoft,
  },
  uncompleteButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  nextButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 16,
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 15,
  },
  nextButtonPressed: {
    backgroundColor: colors.primaryPressed,
  },
  nextButtonText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
  },
  sequenceEnd: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 22,
    textAlign: "center",
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