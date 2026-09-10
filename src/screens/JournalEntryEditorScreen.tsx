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
  type JournalEntryId,
} from "../domain/journal/journal";
import type {
  PersonalLocalDate,
} from "../domain/personal/personalTime";
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

type AutosaveStatus =
  | "idle"
  | "saving"
  | "saved"
  | "error";

type DraftSnapshot = Readonly<{
  entryDate: PersonalLocalDate;
  reflectionText: string;
  gratitudeText: string;
}>;

const CONTENT_REQUIRED_MESSAGE =
  "Escreva uma reflexão ou gratidão antes de salvar.";

const DATE_INVALID_MESSAGE =
  "Informe uma data válida no formato DD/MM/AAAA.";

const AUTOSAVE_DELAY_MS = 800;

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
    case "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND":
    case "PERSONAL_JOURNAL_DRAFT_TARGET_NOT_FOUND":
      return (
        "Este registro não foi encontrado. " +
        "Volte ao diário e tente novamente."
      );
    case "PERSONAL_JOURNAL_DRAFT_TARGET_INVALID":
      return (
        "Este registro já foi concluído. " +
        "Volte ao diário e abra-o novamente."
      );
    default:
      return (
        "Não foi possível salvar seu registro agora. " +
        "Tente novamente."
      );
  }
}

function formatEntryDateInput(
  entryDate: string,
): string {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(
      entryDate,
    );

  if (!match) {
    return entryDate;
  }

  return `${match[3]}/${match[2]}/${match[1]}`;
}

function isLeapYear(year: number): boolean {
  return (
    year % 400 === 0 ||
    (year % 4 === 0 && year % 100 !== 0)
  );
}

function getDaysInMonth(
  year: number,
  month: number,
): number {
  const days = [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return days[month - 1] ?? 0;
}

function parseEntryDateInput(
  value: string,
): PersonalLocalDate | null {
  const match =
    /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(
      value,
    );

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  if (
    year < 1 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > getDaysInMonth(year, month)
  ) {
    return null;
  }

  return (
    `${String(year).padStart(4, "0")}-` +
    `${String(month).padStart(2, "0")}-` +
    `${String(day).padStart(2, "0")}`
  ) as PersonalLocalDate;
}

export default function JournalEntryEditorScreen({
  navigation,
  route,
}: JournalEntryEditorScreenProps) {
  const routeEntryId = route.params?.entryId;
  const loadGenerationRef = useRef(0);
  const submitLockRef = useRef(false);
  const mountedRef = useRef(true);
  const hasUserEditedRef = useRef(false);
  const draftEntryIdRef =
    useRef<JournalEntryId | null>(null);
  const autosaveTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );
  const autosaveQueueRef =
    useRef<Promise<void>>(Promise.resolve());

  const [reflectionText, setReflectionText] =
    useState("");
  const [gratitudeText, setGratitudeText] =
    useState("");
  const [entryDateInput, setEntryDateInput] =
    useState("");
  const [loadedStatus, setLoadedStatus] =
    useState<"ACTIVE" | "DRAFT" | null>(null);
  const [loadStatus, setLoadStatus] =
    useState<LoadStatus>(
      routeEntryId !== undefined
        ? "loading"
        : "ready",
    );
  const [saving, setSaving] = useState(false);
  const [autosaveStatus, setAutosaveStatus] =
    useState<AutosaveStatus>("idle");
  const [formMessage, setFormMessage] =
    useState<string | null>(null);

  const clearAutosaveTimer = useCallback(() => {
    if (autosaveTimerRef.current !== null) {
      clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = null;
    }
  }, []);

  const loadEntry = useCallback(async () => {
    const journalService =
      getPersonalPlatformHub().journalService;

    if (routeEntryId === undefined) {
      hasUserEditedRef.current = false;
      draftEntryIdRef.current = null;
      setLoadedStatus(null);
      setEntryDateInput(
        formatEntryDateInput(
          journalService.getTodayEntryDate(),
        ),
      );
      setLoadStatus("ready");
      return;
    }

    const generation =
      ++loadGenerationRef.current;

    setLoadStatus("loading");
    setFormMessage(null);
    setAutosaveStatus("idle");

    try {
      const entry =
        await journalService.findById(
          routeEntryId,
        );

      if (
        generation !==
        loadGenerationRef.current
      ) {
        return;
      }

      if (entry === null) {
        setLoadStatus("not-found");
        return;
      }

      if (entry.status === "TRASHED") {
        setLoadStatus("not-found");
        return;
      }

      hasUserEditedRef.current = false;
      draftEntryIdRef.current =
        entry.status === "DRAFT"
          ? entry.id
          : null;

      setLoadedStatus(entry.status);
      setEntryDateInput(
        formatEntryDateInput(
          entry.entryDate,
        ),
      );
      setReflectionText(
        entry.reflectionText ?? "",
      );
      setGratitudeText(
        entry.gratitudeText ?? "",
      );
      setLoadStatus("ready");
    } catch {
      if (
        generation !==
        loadGenerationRef.current
      ) {
        return;
      }

      setLoadStatus("error");
    }
  }, [routeEntryId]);

  useEffect(() => {
    mountedRef.current = true;
    void loadEntry();

    return () => {
      mountedRef.current = false;
      loadGenerationRef.current += 1;
      clearAutosaveTimer();
    };
  }, [
    clearAutosaveTimer,
    loadEntry,
  ]);

  const persistDraft = useCallback(
    (snapshot: DraftSnapshot): Promise<void> => {
      const run =
        autosaveQueueRef.current.then(
          async () => {
            if (
              !mountedRef.current ||
              saving ||
              loadedStatus === "ACTIVE"
            ) {
              return;
            }

            if (mountedRef.current) {
              setAutosaveStatus("saving");
            }

            try {
              const journalService =
                getPersonalPlatformHub()
                  .journalService;

              if (
                draftEntryIdRef.current === null
              ) {
                const draft =
                  await journalService.createDraft(
                    snapshot,
                  );

                draftEntryIdRef.current =
                  draft.id;
              } else {
                await journalService.updateDraft(
                  draftEntryIdRef.current,
                  snapshot,
                );
              }

              if (mountedRef.current) {
                setAutosaveStatus("saved");
              }
            } catch {
              if (mountedRef.current) {
                setAutosaveStatus("error");
              }
            }
          },
        );

      autosaveQueueRef.current = run;
      return run;
    },
    [loadedStatus, saving],
  );

  useEffect(() => {
    if (
      loadStatus !== "ready" ||
      saving ||
      loadedStatus === "ACTIVE" ||
      !hasUserEditedRef.current
    ) {
      return;
    }

    const entryDate =
      parseEntryDateInput(entryDateInput);

    if (entryDate === null) {
      setAutosaveStatus("idle");
      clearAutosaveTimer();
      return;
    }

    clearAutosaveTimer();

    const snapshot: DraftSnapshot = {
      entryDate,
      reflectionText,
      gratitudeText,
    };

    autosaveTimerRef.current = setTimeout(
      () => {
        autosaveTimerRef.current = null;
        void persistDraft(snapshot);
      },
      AUTOSAVE_DELAY_MS,
    );

    return clearAutosaveTimer;
  }, [
    clearAutosaveTimer,
    entryDateInput,
    gratitudeText,
    loadStatus,
    loadedStatus,
    persistDraft,
    reflectionText,
    saving,
  ]);

  const markEdited = useCallback(() => {
    hasUserEditedRef.current = true;
    setAutosaveStatus("idle");
    setFormMessage(null);
  }, []);

  const saveEntry = useCallback(async () => {
    if (
      submitLockRef.current ||
      loadStatus !== "ready"
    ) {
      return;
    }

    const entryDate =
      parseEntryDateInput(entryDateInput);

    if (entryDate === null) {
      setFormMessage(DATE_INVALID_MESSAGE);
      return;
    }

    if (
      reflectionText.trim().length === 0 &&
      gratitudeText.trim().length === 0
    ) {
      setFormMessage(
        CONTENT_REQUIRED_MESSAGE,
      );
      return;
    }

    submitLockRef.current = true;
    setSaving(true);
    setFormMessage(null);
    clearAutosaveTimer();

    try {
      await autosaveQueueRef.current;

      const journalService =
        getPersonalPlatformHub().journalService;
      const input = {
        entryDate,
        reflectionText,
        gratitudeText,
      };

      if (loadedStatus === "ACTIVE") {
        if (routeEntryId === undefined) {
          throw new Error(
            "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
          );
        }

        await journalService.update(
          routeEntryId,
          input,
        );
      } else if (
        draftEntryIdRef.current !== null
      ) {
        await journalService.publishDraft(
          draftEntryIdRef.current,
          input,
        );
      } else {
        await journalService.create(input);
      }

      hasUserEditedRef.current = false;
      navigation.goBack();
    } catch (error) {
      setFormMessage(
        getJournalErrorMessage(error),
      );
    } finally {
      submitLockRef.current = false;

      if (mountedRef.current) {
        setSaving(false);
      }
    }
  }, [
    clearAutosaveTimer,
    entryDateInput,
    gratitudeText,
    loadStatus,
    loadedStatus,
    navigation,
    reflectionText,
    routeEntryId,
  ]);

  const isEditingActive =
    loadedStatus === "ACTIVE";
  const isEditingDraft =
    loadedStatus === "DRAFT";

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
          <Text style={styles.eyebrow}>
            DIÁRIO
          </Text>
          <Text style={styles.title}>
            {isEditingActive
              ? "Editar registro"
              : isEditingDraft
                ? "Continuar rascunho"
                : "Novo registro"}
          </Text>
          <Text style={styles.subtitle}>
            {isEditingActive
              ? "Revise seu registro com calma."
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
              <Text style={styles.fieldLabel}>
                Data do registro
              </Text>
              <TextInput
                accessibilityLabel="Data do registro"
                value={entryDateInput}
                onChangeText={(value) => {
                  markEdited();
                  setEntryDateInput(value);
                }}
                editable={!saving}
                keyboardType="number-pad"
                maxLength={10}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={
                  colors.textMuted
                }
                style={styles.dateInput}
              />
              <Text style={styles.fieldHelp}>
                Use o dia em que esta reflexão aconteceu.
              </Text>
            </View>

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
                onChangeText={(value) => {
                  markEdited();
                  setReflectionText(value);
                }}
                editable={!saving}
                maxLength={
                  JOURNAL_REFLECTION_MAX_CHARS
                }
                multiline
                textAlignVertical="top"
                placeholder="O que você aprendeu, sentiu ou percebeu?"
                placeholderTextColor={
                  colors.textMuted
                }
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
                onChangeText={(value) => {
                  markEdited();
                  setGratitudeText(value);
                }}
                editable={!saving}
                maxLength={
                  JOURNAL_GRATITUDE_MAX_CHARS
                }
                multiline
                textAlignVertical="top"
                placeholder="Por que você é grato neste dia?"
                placeholderTextColor={
                  colors.textMuted
                }
                style={[
                  styles.textInput,
                  styles.gratitudeInput,
                ]}
              />
            </View>

            {!isEditingActive && (
              <View
                accessibilityLiveRegion="polite"
                style={styles.autosaveRow}
              >
                <View
                  style={[
                    styles.autosaveDot,
                    autosaveStatus === "error" &&
                      styles.autosaveDotError,
                  ]}
                />
                <Text style={styles.autosaveText}>
                  {autosaveStatus === "saving"
                    ? "Salvando rascunho..."
                    : autosaveStatus === "saved"
                      ? "Rascunho salvo"
                      : autosaveStatus === "error"
                        ? "Não foi possível salvar o rascunho agora."
                        : "Seu rascunho será salvo automaticamente."}
                </Text>
              </View>
            )}

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
  fieldHelp: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
  },
  counterText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  dateInput: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
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
  autosaveRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 24,
  },
  autosaveDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  autosaveDotError: {
    backgroundColor: colors.warning,
  },
  autosaveText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 17,
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
