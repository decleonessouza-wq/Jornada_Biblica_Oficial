import React, {
  useCallback,
  useRef,
  useState,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type {
  JournalEntryPersistenceRecord,
} from "../data/personal/journal/journalRepository";
import type {
  JournalCategory,
} from "../domain/journal/journal";
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
  const loadGenerationRef = useRef(0);
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

  const loadEntries = useCallback(
    async (mode: ViewMode) => {
      const generation =
        ++loadGenerationRef.current;

      setStatus("loading");

      try {
        const journalService =
          getPersonalPlatformHub().journalService;
        const today =
          journalService.getTodayEntryDate();
        const nextEntries =
          mode === "trash"
            ? await journalService.listTrash()
            : await journalService.list();

        if (
          generation !==
          loadGenerationRef.current
        ) {
          return;
        }

        setTodayEntryDate(today);
        setEntries(nextEntries);
        setStatus("ready");
      } catch {
        if (
          generation !==
          loadGenerationRef.current
        ) {
          return;
        }

        setStatus("error");
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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
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
        </View>

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
                  : "Seu diário ainda está vazio"}
              </Text>
              <Text style={styles.stateText}>
                {viewMode === "trash"
                  ? "Registros movidos para a lixeira aparecerão aqui."
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
});
