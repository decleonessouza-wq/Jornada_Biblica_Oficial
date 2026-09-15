import React, {
  useCallback,
  useRef,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import type {
  JournalEntryPersistenceRecord,
  JournalSearchQuery,
} from "../data/personal/journal/journalRepository";
import {
  JOURNAL_CATEGORIES,
  type JournalCategory,
  type JournalTag,
  type JournalTagId,
} from "../domain/journal/journal";
import {
  resolveBibleBookAlias,
} from "../domain/bible/bibleBooks";
import type { JournalStackScreenProps } from "../navigation/types";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
import { colors } from "../theme/colors";

type JournalScreenProps =
  JournalStackScreenProps<"JournalHome">;

type LoadStatus =
  | "loading"
  | "ready"
  | "error";

type ViewMode =
  | "journal"
  | "trash";

type TimelineSection = Readonly<{
  key: string;
  title: string;
  entries: readonly JournalEntryPersistenceRecord[];
}>;

type CategoryFilter =
  | JournalCategory
  | "UNCATEGORIZED"
  | null;

type SearchFormState = Readonly<{
  text: string;
  category: CategoryFilter;
  tagId: JournalTagId | null;
  dateFrom: string;
  dateTo: string;
  passageBook: string;
  passageChapter: string;
  passageVerse: string;
  pinnedOnly: boolean;
}>;

const PAGE_SIZE = 20;

const TAG_FILTER_COLLAPSED_LIMIT = 8;

function getVisibleJournalTags(
  tags: readonly JournalTag[],
  selectedTagId: JournalTagId | null,
  showAll: boolean,
): readonly JournalTag[] {
  if (
    showAll ||
    tags.length <= TAG_FILTER_COLLAPSED_LIMIT
  ) {
    return tags;
  }

  const collapsed = tags.slice(
    0,
    TAG_FILTER_COLLAPSED_LIMIT,
  );

  if (
    selectedTagId === null ||
    collapsed.some((tag) => tag.id === selectedTagId)
  ) {
    return collapsed;
  }

  const selectedTag = tags.find(
    (tag) => tag.id === selectedTagId,
  );

  if (selectedTag === undefined) {
    return collapsed;
  }

  return [
    ...collapsed.slice(
      0,
      TAG_FILTER_COLLAPSED_LIMIT - 1,
    ),
    selectedTag,
  ];
}
const CATEGORY_LABELS: Record<
  JournalCategory,
  string
> = {
  REFLECTION: "Reflexão",
  PRAYER: "Oração",
  GRATITUDE: "Gratidão",
  LEARNING: "Aprendizado",
  PROMISE: "Promessa",
  DECISION: "Decisão",
  QUESTION: "Pergunta",
  TESTIMONY: "Testemunho",
};

function isValidLocalDateInput(
  value: string,
): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsed =
    new Date(`${value}T00:00:00.000Z`);

  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

function parsePositiveFilterNumber(
  value: string,
  errorMessage: string,
): number | undefined {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return undefined;
  }

  if (!/^\d+$/.test(trimmed)) {
    throw new Error(errorMessage);
  }

  const parsed = Number(trimmed);

  if (
    !Number.isInteger(parsed) ||
    parsed <= 0
  ) {
    throw new Error(errorMessage);
  }

  return parsed;
}

function buildSearchQuery(
  form: SearchFormState,
): JournalSearchQuery {
  const text = form.text.trim();
  const dateFrom = form.dateFrom.trim();
  const dateTo = form.dateTo.trim();
  const passageBook =
    form.passageBook.trim();

  if (
    dateFrom.length > 0 &&
    !isValidLocalDateInput(dateFrom)
  ) {
    throw new Error(
      "Informe a data inicial no formato AAAA-MM-DD.",
    );
  }

  if (
    dateTo.length > 0 &&
    !isValidLocalDateInput(dateTo)
  ) {
    throw new Error(
      "Informe a data final no formato AAAA-MM-DD.",
    );
  }

  if (
    dateFrom.length > 0 &&
    dateTo.length > 0 &&
    dateFrom > dateTo
  ) {
    throw new Error(
      "A data inicial não pode ser posterior à data final.",
    );
  }

  const chapter =
    parsePositiveFilterNumber(
      form.passageChapter,
      "Informe um capítulo bíblico válido.",
    );
  const verse =
    parsePositiveFilterNumber(
      form.passageVerse,
      "Informe um versículo bíblico válido.",
    );

  let passage:
    JournalSearchQuery["passage"];

  if (
    passageBook.length > 0 ||
    chapter !== undefined ||
    verse !== undefined
  ) {
    if (passageBook.length === 0) {
      throw new Error(
        "Informe o livro bíblico da passagem.",
      );
    }

    const book =
      resolveBibleBookAlias(passageBook);

    if (book === null) {
      throw new Error(
        "Livro bíblico não reconhecido.",
      );
    }

    if (chapter === undefined && verse !== undefined) {
      throw new Error(
        "Informe o capítulo antes do versículo.",
      );
    }

    if (
      chapter !== undefined &&
      chapter > book.chapterCount
    ) {
      throw new Error(
        `${book.canonicalName} possui ${book.chapterCount} capítulos.`,
      );
    }

    passage = {
      bookId: book.id,
      ...(chapter === undefined
        ? {}
        : { chapter }),
      ...(verse === undefined
        ? {}
        : { verse }),
    };
  }

  return {
    offset: 0,
    limit: PAGE_SIZE,
    ...(text.length === 0
      ? {}
      : { text }),
    ...(form.category === null
      ? {}
      : {
          category:
            form.category === "UNCATEGORIZED"
              ? null
              : form.category,
        }),
    ...(form.tagId === null
      ? {}
      : { tagId: form.tagId }),
    ...(dateFrom.length === 0
      ? {}
      : { dateFrom: dateFrom as never }),
    ...(dateTo.length === 0
      ? {}
      : { dateTo: dateTo as never }),
    ...(passage === undefined
      ? {}
      : { passage }),
    ...(form.pinnedOnly
      ? { isPinned: true }
      : {}),
  };
}

function hasActiveSearchFilters(
  query: JournalSearchQuery,
): boolean {
  return (
    query.text !== undefined ||
    query.category !== undefined ||
    query.tagId !== undefined ||
    query.dateFrom !== undefined ||
    query.dateTo !== undefined ||
    query.passage !== undefined ||
    query.isPinned !== undefined
  );
}
const MONTH_NAMES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
] as const;

function parseLocalDate(
  value: string,
): Readonly<{
  year: number;
  month: number;
  day: number;
}> | null {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(
      value,
    );

  if (!match) {
    return null;
  }

  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

function toDayNumber(value: string): number | null {
  const parts = parseLocalDate(value);

  if (parts === null) {
    return null;
  }

  return Math.floor(
    Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
    ) / 86400000,
  );
}

function getMondayDayNumber(
  value: string,
): number | null {
  const parts = parseLocalDate(value);

  if (parts === null) {
    return null;
  }

  const utc = new Date(
    Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
    ),
  );
  const dayNumber =
    Math.floor(utc.getTime() / 86400000);
  const mondayOffset =
    (utc.getUTCDay() + 6) % 7;

  return dayNumber - mondayOffset;
}

function capitalize(value: string): string {
  if (value.length === 0) {
    return value;
  }

  return (
    value[0].toUpperCase() +
    value.slice(1)
  );
}

function formatEntryDate(
  entryDate: string,
): string {
  const parts = parseLocalDate(entryDate);

  if (parts === null) {
    return entryDate;
  }

  const monthName =
    MONTH_NAMES[parts.month - 1];

  if (
    !monthName ||
    parts.day < 1 ||
    parts.day > 31
  ) {
    return entryDate;
  }

  return (
    `${String(parts.day).padStart(2, "0")} de ` +
    `${monthName} de ${parts.year}`
  );
}

function getTimelineBucket(
  entryDate: string,
  today: string,
): Readonly<{
  key: string;
  title: string;
}> {
  const entryParts =
    parseLocalDate(entryDate);
  const todayParts =
    parseLocalDate(today);
  const entryDay =
    toDayNumber(entryDate);
  const todayDay =
    toDayNumber(today);

  if (
    entryDay !== null &&
    todayDay !== null
  ) {
    if (entryDay === todayDay) {
      return {
        key: "today",
        title: "Hoje",
      };
    }

    if (entryDay === todayDay - 1) {
      return {
        key: "yesterday",
        title: "Ontem",
      };
    }

    const entryMonday =
      getMondayDayNumber(entryDate);
    const todayMonday =
      getMondayDayNumber(today);

    if (
      entryMonday !== null &&
      todayMonday !== null &&
      entryMonday === todayMonday
    ) {
      return {
        key: "this-week",
        title: "Esta semana",
      };
    }
  }

  if (
    entryParts !== null &&
    todayParts !== null &&
    entryParts.year === todayParts.year &&
    entryParts.month === todayParts.month
  ) {
    return {
      key: "this-month",
      title: "Este mês",
    };
  }

  if (
    entryParts !== null &&
    todayParts !== null &&
    entryParts.year === todayParts.year
  ) {
    const monthName =
      MONTH_NAMES[entryParts.month - 1];

    return {
      key:
        `month-${entryParts.year}-${entryParts.month}`,
      title: monthName
        ? capitalize(monthName)
        : String(entryParts.year),
    };
  }

  if (entryParts !== null) {
    return {
      key: `year-${entryParts.year}`,
      title: String(entryParts.year),
    };
  }

  return {
    key: `date-${entryDate}`,
    title: "Outros registros",
  };
}

function buildTimeline(
  entries: readonly JournalEntryPersistenceRecord[],
  today: string,
): readonly TimelineSection[] {
  const sections: {
    key: string;
    title: string;
    entries: JournalEntryPersistenceRecord[];
  }[] = [];

  for (const entry of entries) {
    const bucket =
      getTimelineBucket(
        entry.entryDate,
        today,
      );
    const current =
      sections.at(-1);

    if (
      current !== undefined &&
      current.key === bucket.key
    ) {
      current.entries.push(entry);
      continue;
    }

    sections.push({
      ...bucket,
      entries: [entry],
    });
  }

  return sections;
}

type EntryCardProps = Readonly<{
  entry: JournalEntryPersistenceRecord;
  onPress: () => void;
  trashed?: boolean;
}>;

function EntryCard({
  entry,
  onPress,
  trashed = false,
}: EntryCardProps) {
  const formattedDate =
    formatEntryDate(entry.entryDate);
  const isDraft =
    entry.status === "DRAFT";

  return (
    <Pressable
      testID={`journal-entry-${entry.id}`}
      accessibilityRole="button"
      accessibilityLabel={
        trashed
          ? `Abrir registro na lixeira de ${formattedDate}`
          : isDraft
            ? `Continuar rascunho do diário de ${formattedDate}`
            : `Abrir registro do diário de ${formattedDate}`
      }
      onPress={onPress}
      style={({ pressed }) => [
        styles.entryCard,
        isDraft && styles.draftCard,
        trashed && styles.trashCard,
        pressed && styles.entryCardPressed,
      ]}
    >
      <View style={styles.entryTopLine}>
        <View style={styles.entryMeta}>
          <Text style={styles.entryDate}>
            {formattedDate}
          </Text>

          {isDraft && (
            <View style={styles.draftBadge}>
              <Text style={styles.draftBadgeText}>
                Rascunho
              </Text>
            </View>
          )}

          {entry.isPinned && !trashed && (
            <View style={styles.pinnedBadge}>
              <Text style={styles.pinnedBadgeText}>
                Fixado
              </Text>
            </View>
          )}

          {trashed && (
            <View style={styles.trashBadge}>
              <Text style={styles.trashBadgeText}>
                Na lixeira
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.openHint}>
          {trashed
            ? "Ver"
            : isDraft
              ? "Continuar"
              : "Abrir"}
        </Text>
      </View>

      {entry.category !== null && (
        <View style={styles.organizationRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>
              {CATEGORY_LABELS[entry.category]}
            </Text>
          </View>
        </View>
      )}

      {entry.tags.length > 0 && (
        <View style={styles.tagsRow}>
          {entry.tags.map((tag) => (
            <View
              key={tag.id}
              style={styles.tagChip}
            >
              <Text style={styles.tagText}>
                #{tag.name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {entry.reflectionText !== null && (
        <View style={styles.entrySection}>
          <Text style={styles.entryLabel}>
            Reflexão
          </Text>
          <Text style={styles.entryText}>
            {entry.reflectionText}
          </Text>
        </View>
      )}

      {entry.gratitudeText !== null && (
        <View style={styles.entrySection}>
          <Text style={styles.entryLabel}>
            Gratidão
          </Text>
          <Text style={styles.entryText}>
            {entry.gratitudeText}
          </Text>
        </View>
      )}

      {isDraft &&
        entry.reflectionText === null &&
        entry.gratitudeText === null && (
          <Text style={styles.draftEmptyText}>
            Continue escrevendo seu registro.
          </Text>
        )}
    </Pressable>
  );
}

export default function JournalScreen({
  navigation,
}: JournalScreenProps) {
  const insets = useSafeAreaInsets();
  const bottomContentPadding = Math.max(insets.bottom + 24, 52);
  const loadGenerationRef = useRef(0);
  const [emptyTrashBusy, setEmptyTrashBusy] = useState(false);
  const [trashActionMessage, setTrashActionMessage] = useState<string | null>(null);
  const [entries, setEntries] =
    useState<
      readonly JournalEntryPersistenceRecord[]
    >([]);
  const [todayEntryDate, setTodayEntryDate] =
    useState("");
  const [status, setStatus] =
    useState<LoadStatus>("loading");
  const [viewMode, setViewMode] =
    useState<ViewMode>("journal");
  const [availableTags, setAvailableTags] =
    useState<readonly JournalTag[]>([]);
  const [showAllTags, setShowAllTags] =
    useState(false);
  const [nextOffset, setNextOffset] =
    useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] =
    useState(false);
  const [hasAppliedFilters, setHasAppliedFilters] =
    useState(false);
  const [filterError, setFilterError] =
    useState<string | null>(null);
  const [searchText, setSearchText] =
    useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>(null);
  const [tagFilter, setTagFilter] =
    useState<JournalTagId | null>(null);
  const [dateFrom, setDateFrom] =
    useState("");
  const [dateTo, setDateTo] =
    useState("");
  const [passageBook, setPassageBook] =
    useState("");
  const [passageChapter, setPassageChapter] =
    useState("");
  const [passageVerse, setPassageVerse] =
    useState("");
  const [pinnedOnly, setPinnedOnly] =
    useState(false);
  const appliedQueryRef =
    useRef<JournalSearchQuery>({
      offset: 0,
      limit: PAGE_SIZE,
    });

  const loadEntries = useCallback(
    async (
      mode: ViewMode,
      offset = 0,
      append = false,
    ) => {
      const generation =
        ++loadGenerationRef.current;

      if (append) {
        setIsLoadingMore(true);
      } else {
        setStatus("loading");
      }

      try {
        const journalService =
          getPersonalPlatformHub().journalService;
        const today =
          journalService.getTodayEntryDate();

        if (mode === "trash") {
          const nextEntries =
            await journalService.listTrash();

          if (
            generation !==
            loadGenerationRef.current
          ) {
            return;
          }

          setTodayEntryDate(today);
          setEntries(nextEntries);
          setNextOffset(null);
          setStatus("ready");
          return;
        }

        const query: JournalSearchQuery = {
          ...appliedQueryRef.current,
          offset,
          limit: PAGE_SIZE,
        };

        const tagRequest:
          Promise<readonly JournalTag[] | null> =
          append
            ? Promise.resolve(null)
            : journalService.listTags();

        const [page, nextTags] =
          await Promise.all([
            journalService.search(query),
            tagRequest,
          ]);

        if (
          generation !==
          loadGenerationRef.current
        ) {
          return;
        }

        setTodayEntryDate(today);
        setEntries((current) =>
          append
            ? [...current, ...page.items]
            : page.items,
        );
        setNextOffset(page.nextOffset);

        if (nextTags !== null) {
          setAvailableTags(nextTags);
        }

        setStatus("ready");
      } catch {
        if (
          generation !==
          loadGenerationRef.current
        ) {
          return;
        }

        if (!append) {
          setStatus("error");
        }
      } finally {
        if (
          generation ===
          loadGenerationRef.current
        ) {
          setIsLoadingMore(false);
        }
      }
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      void loadEntries(viewMode);

      return () => {
        loadGenerationRef.current += 1;
      };
    }, [loadEntries, viewMode]),
  );

  const startNewEntry = useCallback(() => {
    navigation.navigate(
      "JournalEntryEditor",
    );
  }, [navigation]);

  const openEntry = useCallback(
    (
      entry: JournalEntryPersistenceRecord,
    ) => {
      if (entry.status === "DRAFT") {
        navigation.navigate(
          "JournalEntryEditor",
          {
            entryId: entry.id,
          },
        );
        return;
      }

      navigation.navigate(
        "JournalEntryDetail",
        {
          entryId: entry.id,
        },
      );
    },
    [navigation],
  );

  const showTrash = useCallback(() => {
    setViewMode("trash");
    void loadEntries("trash");
  }, [loadEntries]);

  const showJournal = useCallback(() => {
    setViewMode("journal");
    void loadEntries("journal");
  }, [loadEntries]);

  const emptyTrash = useCallback(async () => {
    if (emptyTrashBusy) {
      return;
    }

    setEmptyTrashBusy(true);
    setTrashActionMessage(null);

    try {
      await getPersonalPlatformHub().journalService.emptyTrash();
      setEntries([]);
      setNextOffset(null);
      setStatus("ready");
    } catch {
      setTrashActionMessage(
        "Não foi possível esvaziar a lixeira agora. Tente novamente.",
      );
    } finally {
      setEmptyTrashBusy(false);
    }
  }, [emptyTrashBusy]);

  const requestEmptyTrash = useCallback(() => {
    if (
      viewMode !== "trash" ||
      entries.length === 0 ||
      emptyTrashBusy
    ) {
      return;
    }

    Alert.alert(
      "Esvaziar lixeira?",
      "Todos os registros na lixeira serão excluídos permanentemente. Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Esvaziar",
          style: "destructive",
          onPress: () => {
            void emptyTrash();
          },
        },
      ],
    );
  }, [emptyTrash, emptyTrashBusy, entries, viewMode]);

  const applySearchFilters = useCallback(() => {
    try {
      const query =
        buildSearchQuery({
          text: searchText,
          category: categoryFilter,
          tagId: tagFilter,
          dateFrom,
          dateTo,
          passageBook,
          passageChapter,
          passageVerse,
          pinnedOnly,
        });

      appliedQueryRef.current = query;
      setHasAppliedFilters(
        hasActiveSearchFilters(query),
      );
      setFilterError(null);
      setNextOffset(null);
      void loadEntries("journal");
    } catch (error) {
      setFilterError(
        error instanceof Error
          ? error.message
          : "Revise os filtros informados.",
      );
    }
  }, [
    categoryFilter,
    dateFrom,
    dateTo,
    loadEntries,
    passageBook,
    passageChapter,
    passageVerse,
    pinnedOnly,
    searchText,
    tagFilter,
  ]);

  const clearSearchFilters = useCallback(() => {
    setSearchText("");
    setCategoryFilter(null);
    setTagFilter(null);
    setDateFrom("");
    setDateTo("");
    setPassageBook("");
    setPassageChapter("");
    setPassageVerse("");
    setPinnedOnly(false);
    setFilterError(null);
    setHasAppliedFilters(false);
    appliedQueryRef.current = {
      offset: 0,
      limit: PAGE_SIZE,
    };
    setNextOffset(null);
    void loadEntries("journal");
  }, [loadEntries]);

  const loadMoreEntries = useCallback(() => {
    if (
      nextOffset === null ||
      isLoadingMore
    ) {
      return;
    }

    void loadEntries(
      "journal",
      nextOffset,
      true,
    );
  }, [
    isLoadingMore,
    loadEntries,
    nextOffset,
  ]);
  const pinnedEntries =
    viewMode === "journal"
      ? entries.filter(
          (entry) =>
            entry.status === "ACTIVE" &&
            entry.isPinned,
        )
      : [];

  const timelineEntries =
    viewMode === "journal"
      ? entries.filter(
          (entry) =>
            !(
              entry.status === "ACTIVE" &&
              entry.isPinned
            ),
        )
      : entries;

  const timeline =
    buildTimeline(
      timelineEntries,
      todayEntryDate,
    );

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: bottomContentPadding },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          testID="journal-hero"
          source={require("../../assets/module-heroes/journal-hero.png")}
          resizeMode="cover"
          style={styles.header}
          imageStyle={styles.headerImage}
        >
          <View style={styles.heroTextPanel}>
            <Text style={styles.eyebrow}>
              DIÁRIO
            </Text>
            <Text style={styles.title}>
              {viewMode === "trash"
                ? "Lixeira"
                : "Meu Diário"}
            </Text>
            <Text style={styles.subtitle}>
              {viewMode === "trash"
                ? "Revise registros removidos e restaure o que quiser preservar."
                : "Registre o que você aprendeu, viveu e não quer esquecer."}
            </Text>
          </View>

          {viewMode === "journal" ? (
            <>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Registrar nova entrada no diário"
                onPress={startNewEntry}
                style={({ pressed }) => [
                  styles.primaryButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.primaryButtonText}>
                  Novo registro
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Abrir lixeira do diário"
                onPress={showTrash}
                style={({ pressed }) => [
                  styles.secondaryButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.secondaryButtonText}>
                  Ver lixeira
                </Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar para o diário"
              onPress={showJournal}
              style={({ pressed }) => [
                styles.primaryButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                Voltar ao diário
              </Text>
            </Pressable>
          )}
        </ImageBackground>

        {viewMode === "trash" && entries.length > 0 && (
          <View style={styles.trashDangerZone}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Esvaziar lixeira do diário"
              accessibilityState={{
                disabled: emptyTrashBusy,
                busy: emptyTrashBusy,
              }}
              disabled={emptyTrashBusy}
              onPress={requestEmptyTrash}
              style={({ pressed }) => [
                styles.emptyTrashButton,
                emptyTrashBusy && styles.emptyTrashButtonDisabled,
                pressed && !emptyTrashBusy && styles.pressed,
              ]}
            >
              <Text style={styles.emptyTrashButtonText}>
                {emptyTrashBusy ? "Esvaziando..." : "Esvaziar lixeira"}
              </Text>
            </Pressable>
            {trashActionMessage !== null && (
              <Text style={styles.trashActionMessage}>
                {trashActionMessage}
              </Text>
            )}
          </View>
        )}

        {viewMode === "journal" && (
          <View style={styles.searchCard}>
            <View style={styles.searchHeading}>
              <Text style={styles.searchTitle}>
                Buscar no diário
              </Text>
              <Text style={styles.searchHint}>
                Encontre registros por texto ou contexto.
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Palavra ou frase
              </Text>
              <TextInput
                accessibilityLabel="Buscar no diário"
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Ex.: promessa, oração, família..."
                placeholderTextColor={colors.textMuted}
                style={styles.searchInput}
                returnKeyType="search"
                onSubmitEditing={applySearchFilters}
              />
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.fieldLabel}>
                Categoria
              </Text>
              <ScrollView
                horizontal
                nestedScrollEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: "row",
                  gap: 8,
                  paddingRight: 4,
                }}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Mostrar todas as categorias"
                  accessibilityState={{
                    selected: categoryFilter === null,
                  }}
                  onPress={() => setCategoryFilter(null)}
                  style={({ pressed }) => [
                    styles.filterChip,
                    categoryFilter === null &&
                      styles.filterChipSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      categoryFilter === null &&
                        styles.filterChipTextSelected,
                    ]}
                  >
                    Todas
                  </Text>
                </Pressable>

                {JOURNAL_CATEGORIES.map((category) => (
                  <Pressable
                    key={category}
                    accessibilityRole="button"
                    accessibilityLabel={`Filtrar por categoria ${CATEGORY_LABELS[category]}`}
                    accessibilityState={{
                      selected:
                        categoryFilter === category,
                    }}
                    onPress={() =>
                      setCategoryFilter(category)
                    }
                    style={({ pressed }) => [
                      styles.filterChip,
                      categoryFilter === category &&
                        styles.filterChipSelected,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        categoryFilter === category &&
                          styles.filterChipTextSelected,
                      ]}
                    >
                      {CATEGORY_LABELS[category]}
                    </Text>
                  </Pressable>
                ))}

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Filtrar registros sem categoria"
                  accessibilityState={{
                    selected:
                      categoryFilter === "UNCATEGORIZED",
                  }}
                  onPress={() =>
                    setCategoryFilter("UNCATEGORIZED")
                  }
                  style={({ pressed }) => [
                    styles.filterChip,
                    categoryFilter === "UNCATEGORIZED" &&
                      styles.filterChipSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      categoryFilter === "UNCATEGORIZED" &&
                        styles.filterChipTextSelected,
                    ]}
                  >
                    Sem categoria
                  </Text>
                </Pressable>
              </ScrollView>
            </View>

            {availableTags.length > 0 && (
              <View style={styles.filterSection}>
                <Text style={styles.fieldLabel}>
                  Etiquetas
                </Text>
                <View style={styles.chipRow}>
                  {getVisibleJournalTags(
                    availableTags,
                    tagFilter,
                    showAllTags,
                  ).map((tag) => {
                    const selected =
                      tagFilter === tag.id;

                    return (
                      <Pressable
                        key={tag.id}
                        accessibilityRole="button"
                        accessibilityLabel={`Filtrar pela etiqueta ${tag.name}`}
                        accessibilityState={{
                          selected,
                        }}
                        onPress={() =>
                          setTagFilter(
                            selected
                              ? null
                              : tag.id,
                          )
                        }
                        style={({ pressed }) => [
                          styles.filterChip,
                          selected &&
                            styles.filterChipSelected,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text
                          style={[
                            styles.filterChipText,
                            selected &&
                              styles.filterChipTextSelected,
                          ]}
                        >
                          #{tag.name}
                        </Text>
                      </Pressable>
                    );
                  })}

                  {availableTags.length >
                    TAG_FILTER_COLLAPSED_LIMIT && (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={
                        showAllTags
                          ? "Mostrar menos etiquetas"
                          : "Ver todas as etiquetas"
                      }
                      onPress={() =>
                        setShowAllTags(
                          (current) => !current,
                        )
                      }
                      style={({ pressed }) => [
                        styles.filterChip,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text style={styles.filterChipText}>
                        {showAllTags
                          ? "Mostrar menos"
                          : `Ver todas (${availableTags.length})`}
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            )}

            <View style={styles.filterSection}>
              <Text style={styles.fieldLabel}>
                Período
              </Text>
              <View style={styles.fieldRow}>
                <View style={styles.flexField}>
                  <TextInput
                    accessibilityLabel="Data inicial do filtro"
                    value={dateFrom}
                    onChangeText={setDateFrom}
                    placeholder="AAAA-MM-DD"
                    placeholderTextColor={colors.textMuted}
                    autoCapitalize="none"
                    style={styles.searchInput}
                  />
                </View>
                <View style={styles.flexField}>
                  <TextInput
                    accessibilityLabel="Data final do filtro"
                    value={dateTo}
                    onChangeText={setDateTo}
                    placeholder="AAAA-MM-DD"
                    placeholderTextColor={colors.textMuted}
                    autoCapitalize="none"
                    style={styles.searchInput}
                  />
                </View>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.fieldLabel}>
                Passagem bíblica
              </Text>
              <TextInput
                accessibilityLabel="Livro bíblico do filtro"
                value={passageBook}
                onChangeText={setPassageBook}
                placeholder="Ex.: João, Jo ou JHN"
                placeholderTextColor={colors.textMuted}
                style={styles.searchInput}
              />
              <View style={styles.fieldRow}>
                <View style={styles.flexField}>
                  <TextInput
                    accessibilityLabel="Capítulo bíblico do filtro"
                    value={passageChapter}
                    onChangeText={setPassageChapter}
                    placeholder="Capítulo"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="number-pad"
                    style={styles.searchInput}
                  />
                </View>
                <View style={styles.flexField}>
                  <TextInput
                    accessibilityLabel="Versículo bíblico do filtro"
                    value={passageVerse}
                    onChangeText={setPassageVerse}
                    placeholder="Versículo"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="number-pad"
                    style={styles.searchInput}
                  />
                </View>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Mostrar somente registros fixados"
              accessibilityState={{
                selected: pinnedOnly,
              }}
              onPress={() =>
                setPinnedOnly((current) => !current)
              }
              style={({ pressed }) => [
                styles.pinFilter,
                pinnedOnly &&
                  styles.pinFilterSelected,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.pinFilterText,
                  pinnedOnly &&
                    styles.pinFilterTextSelected,
                ]}
              >
                {pinnedOnly
                  ? "Somente fixados"
                  : "Mostrar somente fixados"}
              </Text>
            </Pressable>

            {filterError !== null && (
              <Text
                accessibilityRole="alert"
                style={styles.filterError}
              >
                {filterError}
              </Text>
            )}

            <View style={styles.searchActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Aplicar busca e filtros do diário"
                onPress={applySearchFilters}
                style={({ pressed }) => [
                  styles.applyFilterButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.applyFilterButtonText}>
                  Buscar
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Limpar busca e filtros do diário"
                onPress={clearSearchFilters}
                style={({ pressed }) => [
                  styles.clearFilterButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.clearFilterButtonText}>
                  Limpar
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        {status === "loading" && (
          <View style={styles.stateCard}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />
            <Text style={styles.stateTitle}>
              {viewMode === "trash"
                ? "Carregando lixeira..."
                : "Carregando seu diário..."}
            </Text>
          </View>
        )}

        {status === "error" && (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>
              {viewMode === "trash"
                ? "Não foi possível carregar a lixeira agora."
                : "Não foi possível carregar seu diário agora."}
            </Text>
            <Text style={styles.stateText}>
              Tente novamente para atualizar seus registros.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={
                viewMode === "trash"
                  ? "Tentar carregar a lixeira novamente"
                  : "Tentar carregar o diário novamente"
              }
              onPress={() => {
                void loadEntries(viewMode);
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
          entries.length === 0 && (
            <View style={styles.stateCard}>
              <Text style={styles.stateTitle}>
                {viewMode === "trash"
                  ? "Sua lixeira está vazia"
                  : hasAppliedFilters
                    ? "Nenhum registro encontrado"
                    : "Seu diário ainda está vazio"}
              </Text>
              <Text style={styles.stateText}>
                {viewMode === "trash"
                  ? "Registros movidos para a lixeira aparecerão aqui."
                  : hasAppliedFilters
                    ? "Tente ajustar ou limpar os filtros para ampliar a busca."
                    : "Quando você registrar uma reflexão ou gratidão, ela aparecerá aqui."}
              </Text>
            </View>
          )}

        {status === "ready" &&
          viewMode === "journal" &&
          pinnedEntries.length > 0 && (
            <View style={styles.pinnedSection}>
              <View style={styles.sectionHeading}>
                <Text style={styles.timelineTitle}>
                  Fixados
                </Text>
                <Text style={styles.sectionHint}>
                  Para encontrar rápido
                </Text>
              </View>

              <View style={styles.list}>
                {pinnedEntries.map((entry) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    onPress={() => openEntry(entry)}
                  />
                ))}
              </View>
            </View>
          )}

        {status === "ready" &&
          timeline.length > 0 && (
            <View style={styles.timeline}>
              {timeline.map((section) => (
                <View
                  key={section.key}
                  style={styles.timelineSection}
                >
                  <Text
                    style={styles.timelineTitle}
                  >
                    {section.title}
                  </Text>

                  <View style={styles.list}>
                    {section.entries.map(
                      (entry) => (
                        <EntryCard
                          key={entry.id}
                          entry={entry}
                          trashed={
                            viewMode === "trash"
                          }
                          onPress={() =>
                            openEntry(entry)
                          }
                        />
                      ),
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        {status === "ready" &&
          viewMode === "journal" &&
          nextOffset !== null && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Carregar mais registros do diário"
              disabled={isLoadingMore}
              onPress={loadMoreEntries}
              style={({ pressed }) => [
                styles.loadMoreButton,
                pressed && styles.pressed,
              ]}
            >
              {isLoadingMore ? (
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                />
              ) : (
                <Text style={styles.loadMoreButtonText}>
                  Carregar mais
                </Text>
              )}
            </Pressable>
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
  header: {
    gap: 9,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: "hidden",
  },
  headerImage: {
    borderRadius: 22,
  },
  heroTextPanel: {
    alignSelf: "stretch",
    backgroundColor: "rgba(255, 255, 255, 0.86)",
    borderRadius: 16,
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  eyebrow: {
    color: colors.secondaryPressed,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
  },
  title: {
    color: colors.textStrong,
    fontSize: 27,
    fontWeight: "800",
    lineHeight: 33,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: 7,
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  searchCard: {
    gap: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchHeading: {
    gap: 3,
  },
  searchTitle: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "800",
  },
  searchHint: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  fieldGroup: {
    gap: 6,
  },
  filterSection: {
    gap: 8,
  },
  fieldLabel: {
    color: colors.textStrong,
    fontSize: 12,
    fontWeight: "800",
  },
  searchInput: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  filterChip: {
    minHeight: 36,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  filterChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceHighlight,
  },
  filterChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  filterChipTextSelected: {
    color: colors.primary,
    fontWeight: "800",
  },
  fieldRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  flexField: {
    flexGrow: 1,
    flexBasis: 140,
  },
  pinFilter: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  pinFilterSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceHighlight,
  },
  pinFilterText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "700",
  },
  pinFilterTextSelected: {
    color: colors.primary,
    fontWeight: "800",
  },
  filterError: {
    color: colors.danger,
    fontSize: 13,
    lineHeight: 18,
  },
  searchActions: {
    flexDirection: "row",
    gap: 8,
  },
  applyFilterButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  applyFilterButtonText: {
    color: colors.textInverse,
    fontSize: 14,
    fontWeight: "800",
  },
  clearFilterButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  clearFilterButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  loadMoreButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  loadMoreButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },  stateCard: {
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
    justifyContent: "center",
    marginTop: 4,
    minHeight: 42,
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
  pinnedSection: {
    gap: 9,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  sectionHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 2,
  },
  sectionHint: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  timeline: {
    gap: 18,
  },
  timelineSection: {
    gap: 9,
  },
  timelineTitle: {
    color: colors.textStrong,
    fontSize: 17,
    fontWeight: "800",
    paddingHorizontal: 2,
  },
  list: {
    gap: 10,
  },
  entryCard: {
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  draftCard: {
    backgroundColor: colors.surfaceAlt,
  },
  trashCard: {
    backgroundColor: colors.surfaceAlt,
  },
  entryCardPressed: {
    opacity: 0.82,
  },
  entryTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  entryMeta: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  entryDate: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "800",
  },
  draftBadge: {
    borderRadius: 999,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  draftBadgeText: {
    color: colors.secondaryPressed,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  pinnedBadge: {
    borderRadius: 999,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pinnedBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  trashBadge: {
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  trashBadgeText: {
    color: colors.danger,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  organizationRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryBadge: {
    borderRadius: 999,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  categoryBadgeText: {
    color: colors.secondaryPressed,
    fontSize: 11,
    fontWeight: "800",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  tagChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  openHint: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800",
  },
  entrySection: {
    gap: 4,
  },
  entryLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  entryText: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  draftEmptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.82,
  },
  trashDangerZone: {
    gap: 8,
  },
  emptyTrashButton: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: colors.surfaceHighlight,
  },
  emptyTrashButtonDisabled: {
    opacity: 0.55,
  },
  emptyTrashButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "800",
  },
  trashActionMessage: {
    color: colors.danger,
    fontSize: 13,
    lineHeight: 18,
  },
});
