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

import type { JournalEntry } from "../domain/journal/journal";
import type { JournalStackScreenProps } from "../navigation/types";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
import { colors } from "../theme/colors";

type JournalScreenProps =
  JournalStackScreenProps<"JournalHome">;
type LoadStatus = "loading" | "ready" | "error";

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

function formatEntryDate(entryDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(
    entryDate,
  );

  if (!match) {
    return entryDate;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const monthName = MONTH_NAMES[month - 1];

  if (
    !monthName ||
    day < 1 ||
    day > 31
  ) {
    return entryDate;
  }

  return (
    `${String(day).padStart(2, "0")} de ` +
    `${monthName} de ${year}`
  );
}

export default function JournalScreen({
  navigation,
}: JournalScreenProps) {
  const loadGenerationRef = useRef(0);
  const [entries, setEntries] =
    useState<readonly JournalEntry[]>([]);
  const [status, setStatus] =
    useState<LoadStatus>("loading");

  const loadEntries = useCallback(async () => {
    const generation = ++loadGenerationRef.current;
    setStatus("loading");

    try {
      const nextEntries =
        await getPersonalPlatformHub().journalService.list();

      if (generation !== loadGenerationRef.current) {
        return;
      }

      setEntries(nextEntries);
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
      void loadEntries();

      return () => {
        loadGenerationRef.current += 1;
      };
    }, [loadEntries]),
  );

  const startNewEntry = useCallback(() => {
    navigation.navigate("JournalEntryEditor");
  }, [navigation]);

  const openEntry = useCallback(
    (entry: JournalEntry) => {
      navigation.navigate("JournalEntryDetail", {
        entryId: entry.id,
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
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DIÁRIO</Text>
          <Text style={styles.title}>Meu Diário</Text>
          <Text style={styles.subtitle}>
            Registre o que você aprendeu, viveu e não quer
            esquecer.
          </Text>

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
              Registrar hoje
            </Text>
          </Pressable>
        </View>

        {status === "loading" && (
          <View style={styles.stateCard}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />
            <Text style={styles.stateTitle}>
              Carregando seu diário...
            </Text>
          </View>
        )}

        {status === "error" && (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>
              Não foi possível carregar seu diário agora.
            </Text>
            <Text style={styles.stateText}>
              Tente novamente para atualizar seus registros.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tentar carregar o diário novamente"
              onPress={() => {
                void loadEntries();
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

        {status === "ready" && entries.length === 0 && (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>
              Seu diário ainda está vazio
            </Text>
            <Text style={styles.stateText}>
              Quando você registrar uma reflexão ou gratidão,
              ela aparecerá aqui.
            </Text>
          </View>
        )}

        {status === "ready" && entries.length > 0 && (
          <View style={styles.list}>
            {entries.map((entry) => {
              const formattedDate =
                formatEntryDate(entry.entryDate);

              return (
                <Pressable
                  key={entry.id}
                  testID={`journal-entry-${entry.id}`}
                  accessibilityRole="button"
                  accessibilityLabel={
                    `Abrir registro do diário de ${formattedDate}`
                  }
                  onPress={() => openEntry(entry)}
                  style={({ pressed }) => [
                    styles.entryCard,
                    pressed && styles.entryCardPressed,
                  ]}
                >
                  <View style={styles.entryTopLine}>
                    <Text style={styles.entryDate}>
                      {formattedDate}
                    </Text>
                    <Text style={styles.openHint}>
                      Abrir
                    </Text>
                  </View>

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
  entryCardPressed: {
    opacity: 0.82,
  },
  entryTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  entryDate: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "800",
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
  pressed: {
    opacity: 0.82,
  },
});
