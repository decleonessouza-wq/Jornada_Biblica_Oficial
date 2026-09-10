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

import type { JournalEntry } from "../domain/journal/journal";
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

function getDeleteErrorMessage(
  error: unknown,
): string {
  const code =
    error instanceof Error
      ? error.message
      : "";

  if (
    code ===
    "PERSONAL_JOURNAL_REMOVE_TARGET_NOT_FOUND"
  ) {
    return (
      "Este registro não está mais disponível. " +
      "Volte ao diário e atualize a lista."
    );
  }

  return (
    "Não foi possível excluir este registro agora. " +
    "Tente novamente."
  );
}

export default function JournalEntryDetailScreen({
  navigation,
  route,
}: JournalEntryDetailScreenProps) {
  const { entryId } = route.params;
  const loadGenerationRef = useRef(0);
  const deleteLockRef = useRef(false);

  const [entry, setEntry] =
    useState<JournalEntry | null>(null);
  const [loadStatus, setLoadStatus] =
    useState<LoadStatus>("loading");
  const [deleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] =
    useState<string | null>(null);

  const loadEntry = useCallback(async () => {
    const generation = ++loadGenerationRef.current;
    setLoadStatus("loading");
    setDeleteMessage(null);

    try {
      const nextEntry =
        await getPersonalPlatformHub().journalService.findById(
          entryId,
        );

      if (generation !== loadGenerationRef.current) {
        return;
      }

      if (nextEntry === null) {
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
    navigation.navigate("JournalEntryEditor", {
      entryId,
    });
  }, [entryId, navigation]);

  const removeEntry = useCallback(async () => {
    if (deleteLockRef.current) {
      return;
    }

    deleteLockRef.current = true;
    setDeleting(true);
    setDeleteMessage(null);

    try {
      await getPersonalPlatformHub().journalService.remove(
        entryId,
      );
      navigation.goBack();
    } catch (error) {
      setDeleteMessage(
        getDeleteErrorMessage(error),
      );
    } finally {
      deleteLockRef.current = false;
      setDeleting(false);
    }
  }, [entryId, navigation]);

  const requestDelete = useCallback(() => {
    if (deleteLockRef.current || deleting) {
      return;
    }

    Alert.alert(
      "Excluir registro?",
      "Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            void removeEntry();
          },
        },
      ],
    );
  }, [deleting, removeEntry]);

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
            Registro do dia
          </Text>
          <Text style={styles.subtitle}>
            Releia o que foi importante e preserve essa
            lembrança.
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
              <Text style={styles.entryDate}>
                {formatEntryDate(entry.entryDate)}
              </Text>

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

            {deleteMessage !== null && (
              <View
                accessibilityRole="alert"
                style={styles.messageCard}
              >
                <Text style={styles.messageText}>
                  {deleteMessage}
                </Text>
              </View>
            )}

            <View style={styles.actions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Editar registro do diário"
                disabled={deleting}
                onPress={editEntry}
                style={({ pressed }) => [
                  styles.primaryButton,
                  deleting &&
                    styles.buttonDisabled,
                  pressed &&
                    !deleting &&
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
                accessibilityLabel="Excluir registro do diário"
                accessibilityState={{
                  disabled: deleting,
                  busy: deleting,
                }}
                disabled={deleting}
                onPress={requestDelete}
                style={({ pressed }) => [
                  styles.deleteButton,
                  deleting &&
                    styles.buttonDisabled,
                  pressed &&
                    !deleting &&
                    styles.pressed,
                ]}
              >
                <Text style={styles.deleteButtonText}>
                  {deleting
                    ? "Excluindo..."
                    : "Excluir registro"}
                </Text>
              </Pressable>
            </View>
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
  entryDate: {
    color: colors.textStrong,
    fontSize: 18,
    fontWeight: "800",
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
    borderColor: colors.danger,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  messageText: {
    color: colors.danger,
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
  deleteButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 14,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  deleteButtonText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "800",
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.82,
  },
});
