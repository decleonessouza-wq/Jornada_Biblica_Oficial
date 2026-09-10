import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type {
  JournalCategory,
} from "../domain/journal/journal";
import type {
  JournalEntryPersistenceRecord,
} from "../data/personal/journal/journalRepository";
import type { JournalStackScreenProps } from "../navigation/types";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
import { colors } from "../theme/colors";

type JournalEntryDetailScreenProps =
  JournalStackScreenProps<"JournalEntryDetail">;

type LoadStatus =
  | "loading"
  | "ready"
  | "error"
  | "not-found";

type ActionBusy =
  | "pin"
  | "trash"
  | "restore"
  | null;

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

function getActionErrorMessage(
  action: Exclude<ActionBusy, null>,
): string {
  if (action === "pin") {
    return (
      "Não foi possível alterar o destaque deste registro agora. " +
      "Tente novamente."
    );
  }

  if (action === "restore") {
    return (
      "Não foi possível restaurar este registro agora. " +
      "Tente novamente."
    );
  }

  return (
    "Não foi possível mover este registro para a lixeira agora. " +
    "Tente novamente."
  );
}

export default function JournalEntryDetailScreen({
  navigation,
  route,
}: JournalEntryDetailScreenProps) {
  const { entryId } = route.params;
  const loadGenerationRef = useRef(0);
  const actionLockRef = useRef(false);

  const [entry, setEntry] =
    useState<JournalEntryPersistenceRecord | null>(
      null,
    );
  const [loadStatus, setLoadStatus] =
    useState<LoadStatus>("loading");
  const [actionBusy, setActionBusy] =
    useState<ActionBusy>(null);
  const [actionMessage, setActionMessage] =
    useState<string | null>(null);

  const loadEntry = useCallback(async () => {
    const generation = ++loadGenerationRef.current;

    setLoadStatus("loading");
    setActionMessage(null);

    try {
      const nextEntry =
        await getPersonalPlatformHub().journalService.findById(
          entryId,
        );

      if (generation !== loadGenerationRef.current) {
        return;
      }

      if (
        nextEntry === null ||
        nextEntry.status === "DRAFT"
      ) {
        setEntry(null);
        setLoadStatus("not-found");
        return;
      }

      setEntry(nextEntry);
      setLoadStatus("ready");
    } catch {
      if (generation !== loadGenerationRef.current) {
        return;
      }

      setEntry(null);
      setLoadStatus("error");
    }
  }, [entryId]);

  useEffect(() => {
    void loadEntry();

    return () => {
      loadGenerationRef.current += 1;
    };
  }, [loadEntry]);

  const editEntry = useCallback(() => {
    if (entry?.status !== "ACTIVE") {
      return;
    }

    navigation.navigate("JournalEntryEditor", {
      entryId,
    });
  }, [entry, entryId, navigation]);

  const togglePinned = useCallback(async () => {
    if (
      actionLockRef.current ||
      entry?.status !== "ACTIVE"
    ) {
      return;
    }

    actionLockRef.current = true;
    setActionBusy("pin");
    setActionMessage(null);

    try {
      const updated =
        await getPersonalPlatformHub().journalService.setPinned(
          entryId,
          !entry.isPinned,
        );

      setEntry(updated);
    } catch {
      setActionMessage(
        getActionErrorMessage("pin"),
      );
    } finally {
      actionLockRef.current = false;
      setActionBusy(null);
    }
  }, [entry, entryId]);

  const moveEntryToTrash =
    useCallback(async () => {
      if (
        actionLockRef.current ||
        entry?.status !== "ACTIVE"
      ) {
        return;
      }

      actionLockRef.current = true;
      setActionBusy("trash");
      setActionMessage(null);

      try {
        await getPersonalPlatformHub().journalService.moveToTrash(
          entryId,
        );

        navigation.goBack();
      } catch {
        setActionMessage(
          getActionErrorMessage("trash"),
        );
      } finally {
        actionLockRef.current = false;
        setActionBusy(null);
      }
    }, [entry, entryId, navigation]);

  const requestTrash = useCallback(() => {
    if (
      actionLockRef.current ||
      actionBusy !== null ||
      entry?.status !== "ACTIVE"
    ) {
      return;
    }

    Alert.alert(
      "Mover para a lixeira?",
      "Você poderá restaurar este registro depois.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Mover",
          style: "destructive",
          onPress: () => {
            void moveEntryToTrash();
          },
        },
      ],
    );
  }, [actionBusy, entry, moveEntryToTrash]);

  const restoreEntry = useCallback(async () => {
    if (
      actionLockRef.current ||
      entry?.status !== "TRASHED"
    ) {
      return;
    }

    actionLockRef.current = true;
    setActionBusy("restore");
    setActionMessage(null);

    try {
      await getPersonalPlatformHub().journalService.restoreFromTrash(
        entryId,
      );

      navigation.goBack();
    } catch {
      setActionMessage(
        getActionErrorMessage("restore"),
      );
    } finally {
      actionLockRef.current = false;
      setActionBusy(null);
    }
  }, [entry, entryId, navigation]);

  const isBusy = actionBusy !== null;
  const isTrashed = entry?.status === "TRASHED";

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DIÁRIO</Text>
          <Text style={styles.title}>
            {isTrashed
              ? "Registro na lixeira"
              : "Registro do dia"}
          </Text>
          <Text style={styles.subtitle}>
            {isTrashed
              ? "Este registro está guardado na lixeira e pode ser restaurado."
              : "Releia o que foi importante e preserve essa lembrança."}
          </Text>
        </View>

        {loadStatus === "loading" && (
          <View style={styles.stateCard}>
            <ActivityIndicator
              size="small"
              color={colors.primary}
            />
            <Text style={styles.stateTitle}>
              Carregando registro...
            </Text>
          </View>
        )}

        {loadStatus === "error" && (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>
              Não foi possível carregar este registro agora.
            </Text>
            <Text style={styles.stateText}>
              Tente novamente para abrir o registro.
            </Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tentar carregar o registro novamente"
              onPress={() => {
                void loadEntry();
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

        {loadStatus === "not-found" && (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>
              Este registro não foi encontrado.
            </Text>
            <Text style={styles.stateText}>
              Volte ao diário e escolha outro registro.
            </Text>
          </View>
        )}

        {loadStatus === "ready" && entry !== null && (
          <>
            <View style={styles.entryCard}>
              <View style={styles.entryHeading}>
                <Text style={styles.entryDate}>
                  {formatEntryDate(entry.entryDate)}
                </Text>

                {entry.status === "TRASHED" && (
                  <View style={styles.trashBadge}>
                    <Text style={styles.trashBadgeText}>
                      Na lixeira
                    </Text>
                  </View>
                )}
              </View>

              {(entry.category !== null ||
                entry.isPinned) && (
                <View style={styles.metaRow}>
                  {entry.category !== null && (
                    <View style={styles.categoryBadge}>
                      <Text
                        style={styles.categoryBadgeText}
                      >
                        {
                          CATEGORY_LABELS[
                            entry.category
                          ]
                        }
                      </Text>
                    </View>
                  )}

                  {entry.isPinned && (
                    <View style={styles.pinnedBadge}>
                      <Text
                        style={styles.pinnedBadgeText}
                      >
                        Fixado
                      </Text>
                    </View>
                  )}
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
            </View>

            {actionMessage !== null && (
              <View
                accessibilityRole="alert"
                style={styles.messageCard}
              >
                <Text style={styles.messageText}>
                  {actionMessage}
                </Text>
              </View>
            )}

            {entry.status === "ACTIVE" ? (
              <View style={styles.actions}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Editar registro do diário"
                  disabled={isBusy}
                  onPress={editEntry}
                  style={({ pressed }) => [
                    styles.primaryButton,
                    isBusy &&
                      styles.buttonDisabled,
                    pressed &&
                      !isBusy &&
                      styles.pressed,
                  ]}
                >
                  <Text
                    style={styles.primaryButtonText}
                  >
                    Editar
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    entry.isPinned
                      ? "Desafixar registro do diário"
                      : "Fixar registro do diário"
                  }
                  accessibilityState={{
                    disabled: isBusy,
                    busy: actionBusy === "pin",
                  }}
                  disabled={isBusy}
                  onPress={() => {
                    void togglePinned();
                  }}
                  style={({ pressed }) => [
                    styles.secondaryButton,
                    isBusy &&
                      styles.buttonDisabled,
                    pressed &&
                      !isBusy &&
                      styles.pressed,
                  ]}
                >
                  <Text
                    style={styles.secondaryButtonText}
                  >
                    {actionBusy === "pin"
                      ? "Atualizando..."
                      : entry.isPinned
                        ? "Desafixar"
                        : "Fixar"}
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Mover registro do diário para a lixeira"
                  accessibilityState={{
                    disabled: isBusy,
                    busy: actionBusy === "trash",
                  }}
                  disabled={isBusy}
                  onPress={requestTrash}
                  style={({ pressed }) => [
                    styles.trashButton,
                    isBusy &&
                      styles.buttonDisabled,
                    pressed &&
                      !isBusy &&
                      styles.pressed,
                  ]}
                >
                  <Text style={styles.trashButtonText}>
                    {actionBusy === "trash"
                      ? "Movendo..."
                      : "Mover para a lixeira"}
                  </Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Restaurar registro do diário"
                accessibilityState={{
                  disabled: isBusy,
                  busy: actionBusy === "restore",
                }}
                disabled={isBusy}
                onPress={() => {
                  void restoreEntry();
                }}
                style={({ pressed }) => [
                  styles.primaryButton,
                  isBusy &&
                    styles.buttonDisabled,
                  pressed &&
                    !isBusy &&
                    styles.pressed,
                ]}
              >
                <Text style={styles.primaryButtonText}>
                  {actionBusy === "restore"
                    ? "Restaurando..."
                    : "Restaurar registro"}
                </Text>
              </Pressable>
            )}
          </>
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
  entryCard: {
    gap: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  entryHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  entryDate: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryBadge: {
    borderRadius: 999,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  categoryBadgeText: {
    color: colors.secondaryPressed,
    fontSize: 11,
    fontWeight: "800",
  },
  pinnedBadge: {
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pinnedBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
  },
  trashBadge: {
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  trashBadgeText: {
    color: colors.danger,
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
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
  },
  entrySection: {
    gap: 6,
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
    lineHeight: 23,
  },
  messageCard: {
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: 14,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  messageText: {
    color: colors.textStrong,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },
  actions: {
    gap: 10,
  },
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
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
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  trashButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  trashButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "800",
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.82,
  },
});
