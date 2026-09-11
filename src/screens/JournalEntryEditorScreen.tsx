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
  getBibleBookById,
} from "../domain/bible/bibleBooks";
import type {
  BiblePassage,
  BibleReference,
} from "../domain/bible/bibleReference";
import {
  JOURNAL_GRATITUDE_MAX_CHARS,
  JOURNAL_REFLECTION_MAX_CHARS,
  type JournalCategory,
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
  category: JournalCategory | null;
  tagNames: readonly string[];
}>;

const CATEGORY_OPTIONS: readonly Readonly<{
  value: JournalCategory;
  label: string;
}>[] = [
  { value: "REFLECTION", label: "Reflexão" },
  { value: "PRAYER", label: "Oração" },
  { value: "GRATITUDE", label: "Gratidão" },
  { value: "LEARNING", label: "Aprendizado" },
  { value: "PROMISE", label: "Promessa" },
  { value: "DECISION", label: "Decisão" },
  { value: "QUESTION", label: "Pergunta" },
  { value: "TESTIMONY", label: "Testemunho" },
];

const CONTENT_REQUIRED_MESSAGE =
  "Escreva uma reflexão ou gratidão antes de salvar.";

const DATE_INVALID_MESSAGE =
  "Informe uma data válida no formato DD/MM/AAAA.";

const AUTOSAVE_DELAY_MS = 800;

function formatBiblePassage(
  passage: BiblePassage,
): string {
  const book =
    getBibleBookById(passage.bookId)
      .canonicalName;

  switch (passage.kind) {
    case "WHOLE_BOOK":
      return book;
    case "CHAPTER":
      return `${book} ${passage.chapter}`;
    case "CHAPTER_RANGE":
      return (
        `${book} ${passage.startChapter}` +
        `–${passage.endChapter}`
      );
    case "VERSE":
      return (
        `${book} ${passage.chapter}:` +
        `${passage.verse}`
      );
    case "VERSE_RANGE":
      if (
        passage.start.chapter ===
        passage.end.chapter
      ) {
        return (
          `${book} ${passage.start.chapter}:` +
          `${passage.start.verse}–` +
          `${passage.end.verse}`
        );
      }

      return (
        `${book} ${passage.start.chapter}:` +
        `${passage.start.verse}–` +
        `${passage.end.chapter}:` +
        `${passage.end.verse}`
      );
  }
}

function formatBibleReference(
  reference: BibleReference,
): string {
  return reference.passages
    .map(formatBiblePassage)
    .join("; ");
}

function parseTagNames(
  value: string,
): readonly string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
}

function formatTagNames(
  tags: readonly Readonly<{ name: string }>[],
): string {
  return tags.map((tag) => tag.name).join(", ");
}

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
  const routeSourceContext =
    route.params?.sourceContext;
  const routeBibleReference =
    routeSourceContext?.sourceType === "BIBLE"
      ? routeSourceContext.reference
      : null;
  const routePlanContext =
    routeSourceContext?.sourceType === "PLAN"
      ? routeSourceContext
      : null;
  const loadGenerationRef = useRef(0);
  const submitLockRef = useRef(false);
  const mountedRef = useRef(true);
  const hasUserEditedRef = useRef(false);
  const draftEntryIdRef =
    useRef<JournalEntryId | null>(null);
  const activeEntryIdRef =
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
  const [category, setCategory] =
    useState<JournalCategory | null>(null);
  const [tagsInput, setTagsInput] =
    useState("");
  const [isPinned, setIsPinned] =
    useState(false);
  const [
    bibleContextReference,
    setBibleContextReference,
  ] = useState<BibleReference | null>(
    routeBibleReference,
  );
  const [
    planSourceActive,
    setPlanSourceActive,
  ] = useState(routePlanContext !== null);
  const [
    planSourceTitleSnapshot,
    setPlanSourceTitleSnapshot,
  ] = useState<string | null>(
    routePlanContext?.sourceTitleSnapshot ?? null,
  );
  const [
    planPromptSnapshot,
    setPlanPromptSnapshot,
  ] = useState<string | null>(
    routePlanContext?.promptSnapshot ?? null,
  );
  const [
    planContextReference,
    setPlanContextReference,
  ] = useState<BibleReference | null>(
    routePlanContext?.reference ?? null,
  );
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
      activeEntryIdRef.current = null;
      setLoadedStatus(null);
      setCategory(null);
      setTagsInput("");
      setIsPinned(false);
      setBibleContextReference(
        routeBibleReference,
      );
      setPlanSourceActive(
        routePlanContext !== null,
      );
      setPlanSourceTitleSnapshot(
        routePlanContext?.sourceTitleSnapshot ??
          null,
      );
      setPlanPromptSnapshot(
        routePlanContext?.promptSnapshot ?? null,
      );
      setPlanContextReference(
        routePlanContext?.reference ?? null,
      );

      const initialEntryDate =
        routePlanContext?.entryDate ??
        journalService.getTodayEntryDate();

      setEntryDateInput(
        formatEntryDateInput(initialEntryDate),
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
      activeEntryIdRef.current =
        entry.status === "ACTIVE"
          ? entry.id
          : null;

      setLoadedStatus(entry.status);
      setCategory(entry.category);
      setBibleContextReference(
        entry.sourceType === "BIBLE" &&
          entry.references.length > 0
          ? entry.references[0].reference
          : null,
      );
      setPlanSourceActive(
        entry.sourceType === "PLAN",
      );
      setPlanSourceTitleSnapshot(
        entry.sourceType === "PLAN"
          ? entry.sourceTitleSnapshot
          : null,
      );
      setPlanPromptSnapshot(
        entry.sourceType === "PLAN"
          ? entry.promptSnapshot
          : null,
      );
      setPlanContextReference(
        entry.sourceType === "PLAN" &&
          entry.references.length > 0
          ? entry.references[0].reference
          : null,
      );
      setTagsInput(
        formatTagNames(entry.tags),
      );
      setIsPinned(entry.isPinned);
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
  }, [
    routeBibleReference,
    routeEntryId,
    routePlanContext,
  ]);

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

              const contentSnapshot = {
                entryDate: snapshot.entryDate,
                reflectionText:
                  snapshot.reflectionText,
                gratitudeText:
                  snapshot.gratitudeText,
              };

              let draftId =
                draftEntryIdRef.current;

              if (draftId === null) {
                const draft =
                  routePlanContext !== null
                    ? await journalService.createPlanDraft(
                        {
                          ...contentSnapshot,
                          sourceTitleSnapshot:
                            routePlanContext.sourceTitleSnapshot,
                          promptSnapshot:
                            routePlanContext.promptSnapshot,
                          reference:
                            routePlanContext.reference,
                        },
                      )
                    : bibleContextReference === null
                      ? await journalService.createDraft(
                          contentSnapshot,
                        )
                      : await journalService.createBibleDraft(
                          {
                            ...contentSnapshot,
                            reference:
                              bibleContextReference,
                          },
                        );

                draftId = draft.id;
                draftEntryIdRef.current =
                  draft.id;
              } else {
                await journalService.updateDraft(
                  draftId,
                  contentSnapshot,
                );
              }

              await journalService.updateOrganization(
                draftId,
                {
                  category: snapshot.category,
                  tagNames: snapshot.tagNames,
                },
              );

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
    [
      bibleContextReference,
      loadedStatus,
      routePlanContext,
      saving,
    ],
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
      category,
      tagNames: parseTagNames(tagsInput),
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
    category,
    clearAutosaveTimer,
    entryDateInput,
    gratitudeText,
    loadStatus,
    loadedStatus,
    persistDraft,
    reflectionText,
    saving,
    tagsInput,
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
      const tagNames =
        parseTagNames(tagsInput);

      let savedEntryId =
        activeEntryIdRef.current;

      if (loadedStatus === "ACTIVE") {
        savedEntryId =
          savedEntryId ?? routeEntryId ?? null;

        if (savedEntryId === null) {
          throw new Error(
            "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
          );
        }

        await journalService.update(
          savedEntryId,
          input,
        );
      } else if (
        draftEntryIdRef.current !== null
      ) {
        savedEntryId =
          draftEntryIdRef.current;

        await journalService.publishDraft(
          savedEntryId,
          input,
        );

        draftEntryIdRef.current = null;
        activeEntryIdRef.current =
          savedEntryId;

        if (mountedRef.current) {
          setLoadedStatus("ACTIVE");
        }
      } else if (
        routePlanContext !== null
      ) {
        const draft =
          await journalService.createPlanDraft({
            ...input,
            sourceTitleSnapshot:
              routePlanContext.sourceTitleSnapshot,
            promptSnapshot:
              routePlanContext.promptSnapshot,
            reference:
              routePlanContext.reference,
          });

        savedEntryId = draft.id;
        draftEntryIdRef.current = draft.id;

        await journalService.publishDraft(
          savedEntryId,
          input,
        );

        draftEntryIdRef.current = null;
        activeEntryIdRef.current =
          savedEntryId;

        if (mountedRef.current) {
          setLoadedStatus("ACTIVE");
        }
      } else if (
        bibleContextReference !== null
      ) {
        const draft =
          await journalService.createBibleDraft({
            ...input,
            reference: bibleContextReference,
          });

        savedEntryId = draft.id;
        draftEntryIdRef.current = draft.id;

        await journalService.publishDraft(
          savedEntryId,
          input,
        );

        draftEntryIdRef.current = null;
        activeEntryIdRef.current =
          savedEntryId;

        if (mountedRef.current) {
          setLoadedStatus("ACTIVE");
        }
      } else {
        const created =
          await journalService.create(input);

        savedEntryId = created.id;
        activeEntryIdRef.current =
          savedEntryId;

        if (mountedRef.current) {
          setLoadedStatus("ACTIVE");
        }
      }

      await journalService.updateOrganization(
        savedEntryId,
        {
          category,
          tagNames,
          isPinned,
        },
      );

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
    bibleContextReference,
    category,
    clearAutosaveTimer,
    entryDateInput,
    gratitudeText,
    isPinned,
    loadStatus,
    loadedStatus,
    navigation,
    reflectionText,
    routeEntryId,
    routePlanContext,
    tagsInput,
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
            {planSourceActive && (
              <View
                accessibilityLabel={`Origem do plano: ${
                  planSourceTitleSnapshot ??
                  "Plano de leitura"
                }`}
                style={styles.bibleContextCard}
              >
                <Text
                  style={styles.bibleContextEyebrow}
                >
                  ORIGEM DO PLANO
                </Text>
                <Text
                  style={styles.bibleContextTitle}
                >
                  {planSourceTitleSnapshot ??
                    "Plano de leitura"}
                </Text>

                {planContextReference !== null && (
                  <Text
                    style={styles.bibleContextText}
                  >
                    {formatBibleReference(
                      planContextReference,
                    )}
                  </Text>
                )}

                {planPromptSnapshot !== null && (
                  <Text
                    style={styles.bibleContextText}
                  >
                    {planPromptSnapshot}
                  </Text>
                )}
              </View>
            )}

            {bibleContextReference !== null && (
              <View
                accessibilityLabel={`Referência bíblica vinculada: ${formatBibleReference(
                  bibleContextReference,
                )}`}
                style={styles.bibleContextCard}
              >
                <Text style={styles.bibleContextEyebrow}>
                  ORIGEM BÍBLICA
                </Text>
                <Text style={styles.bibleContextTitle}>
                  {formatBibleReference(
                    bibleContextReference,
                  )}
                </Text>
                <Text style={styles.bibleContextText}>
                  Esta referência será mantida junto ao registro.
                </Text>
              </View>
            )}

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
                editable={
                  !saving && !planSourceActive
                }
                keyboardType="number-pad"
                maxLength={10}
                placeholder="DD/MM/AAAA"
                placeholderTextColor={
                  colors.textMuted
                }
                style={styles.dateInput}
              />
              <Text style={styles.fieldHelp}>
                {planSourceActive
                  ? "Data vinculada ao dia desta leitura do plano."
                  : "Use o dia em que esta reflexão aconteceu."}
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>
                Categoria
              </Text>
              <Text style={styles.fieldHelp}>
                Escolha uma categoria para encontrar e organizar este registro com mais facilidade.
              </Text>

              <View style={styles.choiceWrap}>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Remover categoria do registro"
                  accessibilityState={{
                    selected: category === null,
                    disabled: saving,
                  }}
                  disabled={saving}
                  onPress={() => {
                    markEdited();
                    setCategory(null);
                  }}
                  style={({ pressed }) => [
                    styles.choiceChip,
                    category === null &&
                      styles.choiceChipSelected,
                    pressed &&
                      !saving &&
                      styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.choiceChipText,
                      category === null &&
                        styles.choiceChipTextSelected,
                    ]}
                  >
                    Sem categoria
                  </Text>
                </Pressable>

                {CATEGORY_OPTIONS.map((option) => {
                  const selected =
                    category === option.value;

                  return (
                    <Pressable
                      key={option.value}
                      accessibilityRole="button"
                      accessibilityLabel={`Selecionar categoria ${option.label}`}
                      accessibilityState={{
                        selected,
                        disabled: saving,
                      }}
                      disabled={saving}
                      onPress={() => {
                        markEdited();
                        setCategory(option.value);
                      }}
                      style={({ pressed }) => [
                        styles.choiceChip,
                        selected &&
                          styles.choiceChipSelected,
                        pressed &&
                          !saving &&
                          styles.pressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.choiceChipText,
                          selected &&
                            styles.choiceChipTextSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>
                Tags
              </Text>
              <TextInput
                accessibilityLabel="Tags do registro"
                value={tagsInput}
                onChangeText={(value) => {
                  markEdited();
                  setTagsInput(value);
                }}
                editable={!saving}
                placeholder="oração, família, promessa"
                placeholderTextColor={
                  colors.textMuted
                }
                style={styles.organizationInput}
              />
              <Text style={styles.fieldHelp}>
                Separe as tags por vírgulas.
              </Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>
                Destaque
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  isPinned
                    ? "Desmarcar registro como fixado"
                    : "Marcar registro como fixado"
                }
                accessibilityState={{
                  selected: isPinned,
                  disabled: saving,
                }}
                disabled={saving}
                onPress={() => {
                  setFormMessage(null);
                  setIsPinned(
                    (current) => !current,
                  );
                }}
                style={({ pressed }) => [
                  styles.pinControl,
                  isPinned &&
                    styles.pinControlSelected,
                  pressed &&
                    !saving &&
                    styles.pressed,
                ]}
              >
                <View style={styles.pinControlText}>
                  <Text style={styles.pinTitle}>
                    {isPinned
                      ? "Registro fixado"
                      : "Fixar este registro"}
                  </Text>
                  <Text style={styles.pinHelp}>
                    {isEditingActive
                      ? "Registros fixados aparecem em destaque no Diário."
                      : "A fixação será aplicada quando você salvar o registro."}
                  </Text>
                </View>

                <View
                  style={[
                    styles.pinIndicator,
                    isPinned &&
                      styles.pinIndicatorSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.pinIndicatorText,
                      isPinned &&
                        styles.pinIndicatorTextSelected,
                    ]}
                  >
                    {isPinned ? "Sim" : "Não"}
                  </Text>
                </View>
              </Pressable>
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
  bibleContextCard: {
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bibleContextEyebrow: {
    color: colors.secondaryPressed,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  bibleContextTitle: {
    color: colors.textStrong,
    fontSize: 16,
    fontWeight: "800",
  },
  bibleContextText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
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
  choiceWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  choiceChip: {
    minHeight: 36,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  choiceChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceHighlight,
  },
  choiceChipText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  choiceChipTextSelected: {
    color: colors.primary,
    fontWeight: "800",
  },
  organizationInput: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  pinControl: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  pinControlSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceHighlight,
  },
  pinControlText: {
    flex: 1,
    gap: 3,
  },
  pinTitle: {
    color: colors.textStrong,
    fontSize: 14,
    fontWeight: "800",
  },
  pinHelp: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },
  pinIndicator: {
    minWidth: 42,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  pinIndicatorSelected: {
    borderColor: colors.primary,
  },
  pinIndicatorText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "800",
  },
  pinIndicatorTextSelected: {
    color: colors.primary,
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
