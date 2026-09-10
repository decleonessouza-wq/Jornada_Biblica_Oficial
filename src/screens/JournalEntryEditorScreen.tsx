import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  JOURNAL_GRATITUDE_MAX_CHARS,
  JOURNAL_REFLECTION_MAX_CHARS,
} from "../domain/journal/journal";
import type { JournalStackScreenProps } from "../navigation/types";
import { getPersonalPlatformHub } from "../services/personalPlatformHub";
import { colors } from "../theme/colors";

type JournalEntryEditorScreenProps =
  JournalStackScreenProps<"JournalEntryEditor">;

type LoadStatus =
  | "loading"
  | "ready"
  | "error"
  | "not-found";

const CONTENT_REQUIRED_MESSAGE =
  "Escreva uma reflexão ou gratidão antes de salvar.";

function getJournalErrorMessage(error: unknown): string {
  const code =
    error instanceof Error
      ? error.message
      : "";

  switch (code) {
    case "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED":
      return CONTENT_REQUIRED_MESSAGE;
    case "PERSONAL_JOURNAL_REFLECTION_TEXT_INVALID":
      return "A reflexão ultrapassa o limite permitido.";
    case "PERSONAL_JOURNAL_GRATITUDE_TEXT_INVALID":
      return "A gratidão ultrapassa o limite permitido.";
    case "PERSONAL_JOURNAL_ENTRY_DATE_CONFLICT":
      return (
        "Já existe um registro para hoje. " +
        "Abra o registro existente para editar."
      );
    case "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND":
      return (
        "Este registro não foi encontrado. " +
        "Volte ao diário e tente novamente."
      );
    default:
      return (
        "Não foi possível salvar seu registro agora. " +
        "Tente novamente."
      );
  }
}

export default function JournalEntryEditorScreen({
  navigation,
  route,
}: JournalEntryEditorScreenProps) {
  const entryId = route.params?.entryId;
  const isEditing = entryId !== undefined;
  const loadGenerationRef = useRef(0);
  const submitLockRef = useRef(false);

  const [reflectionText, setReflectionText] =
    useState("");
  const [gratitudeText, setGratitudeText] =
    useState("");
  const [loadStatus, setLoadStatus] =
    useState<LoadStatus>(
      isEditing ? "loading" : "ready",
    );
  const [saving, setSaving] = useState(false);
  const [formMessage, setFormMessage] =
    useState<string | null>(null);

  const loadEntry = useCallback(async () => {
    if (entryId === undefined) {
      setLoadStatus("ready");
      return;
    }

    const generation = ++loadGenerationRef.current;
    setLoadStatus("loading");
    setFormMessage(null);

    try {
      const entry =
        await getPersonalPlatformHub().journalService.findById(
          entryId,
        );

      if (generation !== loadGenerationRef.current) {
        return;
      }

      if (entry === null) {
        setLoadStatus("not-found");
        return;
      }

      setReflectionText(entry.reflectionText ?? "");
      setGratitudeText(entry.gratitudeText ?? "");
      setLoadStatus("ready");
    } catch {
      if (generation !== loadGenerationRef.current) {
        return;
      }

      setLoadStatus("error");
    }
  }, [entryId]);

  useEffect(() => {
    void loadEntry();

    return () => {
      loadGenerationRef.current += 1;
    };
  }, [loadEntry]);

  const saveEntry = useCallback(async () => {
    if (
      submitLockRef.current ||
      loadStatus !== "ready"
    ) {
      return;
    }

    if (
      reflectionText.trim().length === 0 &&
      gratitudeText.trim().length === 0
    ) {
      setFormMessage(CONTENT_REQUIRED_MESSAGE);
      return;
    }

    submitLockRef.current = true;
    setSaving(true);
    setFormMessage(null);

    try {
      const journalService =
        getPersonalPlatformHub().journalService;

      if (entryId === undefined) {
        await journalService.create({
          reflectionText,
          gratitudeText,
        });
      } else {
        await journalService.update(entryId, {
          reflectionText,
          gratitudeText,
        });
      }

      navigation.goBack();
    } catch (error) {
      setFormMessage(
        getJournalErrorMessage(error),
      );
    } finally {
      submitLockRef.current = false;
      setSaving(false);
    }
  }, [
    entryId,
    gratitudeText,
    loadStatus,
    navigation,
    reflectionText,
  ]);

  const canUseForm =
    loadStatus === "ready" && !saving;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DIÁRIO</Text>
          <Text style={styles.title}>
            {isEditing
              ? "Editar registro"
              : "Novo registro"}
          </Text>
          <Text style={styles.subtitle}>
            {isEditing
              ? "Revise sua reflexão e gratidão com calma."
              : "Registre o que marcou seu dia diante de Deus."}
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
              Tente novamente antes de editar.
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

        {loadStatus === "ready" && (
          <View style={styles.formCard}>
            <View style={styles.field}>
              <View style={styles.fieldHeading}>
                <Text style={styles.fieldLabel}>
                  Reflexão
                </Text>
                <Text style={styles.counterText}>
                  {reflectionText.length}/
                  {JOURNAL_REFLECTION_MAX_CHARS}
                </Text>
              </View>

              <TextInput
                accessibilityLabel="Reflexão"
                value={reflectionText}
                onChangeText={setReflectionText}
                editable={!saving}
                maxLength={
                  JOURNAL_REFLECTION_MAX_CHARS
                }
                multiline
                textAlignVertical="top"
                placeholder="O que você aprendeu, sentiu ou percebeu hoje?"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.textInput,
                  styles.reflectionInput,
                ]}
              />
            </View>

            <View style={styles.field}>
              <View style={styles.fieldHeading}>
                <Text style={styles.fieldLabel}>
                  Gratidão
                </Text>
                <Text style={styles.counterText}>
                  {gratitudeText.length}/
                  {JOURNAL_GRATITUDE_MAX_CHARS}
                </Text>
              </View>

              <TextInput
                accessibilityLabel="Gratidão"
                value={gratitudeText}
                onChangeText={setGratitudeText}
                editable={!saving}
                maxLength={
                  JOURNAL_GRATITUDE_MAX_CHARS
                }
                multiline
                textAlignVertical="top"
                placeholder="Por que você é grato hoje?"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.textInput,
                  styles.gratitudeInput,
                ]}
              />
            </View>

            {formMessage !== null && (
              <View
                accessibilityRole="alert"
                style={styles.messageCard}
              >
                <Text style={styles.messageText}>
                  {formMessage}
                </Text>
              </View>
            )}

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Salvar registro do diário"
              accessibilityState={{
                disabled: !canUseForm,
                busy: saving,
              }}
              disabled={!canUseForm}
              onPress={() => {
                void saveEntry();
              }}
              style={({ pressed }) => [
                styles.primaryButton,
                !canUseForm &&
                  styles.primaryButtonDisabled,
                pressed &&
                  canUseForm &&
                  styles.pressed,
              ]}
            >
              {saving ? (
                <View style={styles.savingRow}>
                  <ActivityIndicator
                    size="small"
                    color={colors.textInverse}
                  />
                  <Text
                    style={styles.primaryButtonText}
                  >
                    Salvando...
                  </Text>
                </View>
              ) : (
                <Text
                  style={styles.primaryButtonText}
                >
                  Salvar registro
                </Text>
              )}
            </Pressable>
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
  formCard: {
    gap: 18,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  field: {
    gap: 8,
  },
  fieldHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  fieldLabel: {
    color: colors.textStrong,
    fontSize: 15,
    fontWeight: "800",
  },
  counterText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  reflectionInput: {
    minHeight: 180,
  },
  gratitudeInput: {
    minHeight: 104,
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
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonText: {
    color: colors.textInverse,
    fontSize: 15,
    fontWeight: "800",
  },
  savingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pressed: {
    opacity: 0.82,
  },
});
