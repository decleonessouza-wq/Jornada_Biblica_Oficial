import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

import type {
  BibleReference,
} from "../src/domain/bible/bibleReference";
import type {
  JournalEntryId,
} from "../src/domain/journal/journal";
import type { PersonalLocalDate } from "../src/domain/personal/personalTime";
import type {
  JournalEntryEditorSourceContext,
} from "../src/navigation/types";
import type {
  JournalEntryPersistenceRecord,
} from "../src/data/personal/journal/journalRepository";
import {
  getPersonalPlatformHub,
} from "../src/services/personalPlatformHub";
import JournalEntryEditorScreen from "../src/screens/JournalEntryEditorScreen";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 48,
    left: 0,
  }),
}));

jest.mock(
  "../src/services/personalPlatformHub",
  () => ({
    getPersonalPlatformHub: jest.fn(),
  }),
);

const fs = jest.requireActual<{
  readFileSync: (
    path: string,
    encoding: "utf8",
  ) => string;
}>("fs");

const mockedGetPersonalPlatformHub =
  getPersonalPlatformHub as jest.MockedFunction<
    typeof getPersonalPlatformHub
  >;

const mockFindById = jest.fn();
const mockGetTodayEntryDate = jest.fn();
const mockCreate = jest.fn();
const mockCreateDraft = jest.fn();
const mockCreateBibleDraft = jest.fn();
const mockCreatePlanDraft = jest.fn();
const mockUpdateDraft = jest.fn();
const mockPublishDraft = jest.fn();
const mockUpdate = jest.fn();
const mockUpdateOrganization = jest.fn();

const entryId =
  "journal-entry-edit" as JournalEntryId;
const draftId =
  "journal-entry-draft" as JournalEntryId;

const bibleReference: BibleReference = {
  passages: [
    {
      kind: "VERSE",
      bookId: "JHN",
      chapter: 3,
      verse: 16,
    },
  ],
};

const bibleSourceContext:
  JournalEntryEditorSourceContext = {
    sourceType: "BIBLE",
    reference: bibleReference,
  };

const planSourceContext:
  JournalEntryEditorSourceContext = {
    sourceType: "PLAN",
    entryDate: "2026-09-08" as PersonalLocalDate,
    sourceTitleSnapshot:
      "Plano de leitura • Evangelhos",
    promptSnapshot:
      "Observe o caráter de Cristo.",
    reference: bibleReference,
  };

const planSpecialDaySourceContext:
  JournalEntryEditorSourceContext = {
    sourceType: "PLAN",
    entryDate: "2026-12-25" as PersonalLocalDate,
    sourceTitleSnapshot:
      "Plano de leitura • Natal",
    promptSnapshot:
      "Contemple o nascimento de Cristo.",
    reference: null,
  };

const existingEntry = {
  id: entryId,
  entryDate: "2026-09-09",
  reflectionText:
    "Reflexão já registrada.",
  gratitudeText:
    "Gratidão já registrada.",
  status: "ACTIVE",
  sourceType: "FREE",
  sourceTitleSnapshot: null,
  promptSnapshot: null,
  category: null,
  isPinned: false,
  references: [],
  tags: [],
  createdAtUtc:
    "2026-09-09T13:00:00.000Z",
  updatedAtUtc:
    "2026-09-09T13:00:00.000Z",
} as unknown as JournalEntryPersistenceRecord;

const draftEntry = {
  ...existingEntry,
  id: draftId,
  status: "DRAFT",
  reflectionText: "Rascunho salvo.",
  gratitudeText: null,
} as JournalEntryPersistenceRecord;

const bibleDraftEntry = {
  ...draftEntry,
  sourceType: "BIBLE",
  references: [
    {
      id: "journal-reference-test" as never,
      entryId: draftId,
      position: 0,
      reference: bibleReference,
    },
  ],
} as JournalEntryPersistenceRecord;

const planDraftEntry = {
  ...draftEntry,
  entryDate: "2026-09-08" as PersonalLocalDate,
  sourceType: "PLAN",
  sourceTitleSnapshot:
    "Plano de leitura • Evangelhos",
  promptSnapshot:
    "Observe o caráter de Cristo.",
  references: [
    {
      id: "journal-plan-reference-test" as never,
      entryId: draftId,
      position: 0,
      reference: bibleReference,
    },
  ],
} as JournalEntryPersistenceRecord;

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    journalService: {
      findById: mockFindById,
      getTodayEntryDate:
        mockGetTodayEntryDate,
      create: mockCreate,
      createDraft: mockCreateDraft,
      createBibleDraft:
        mockCreateBibleDraft,
      createPlanDraft:
        mockCreatePlanDraft,
      updateDraft: mockUpdateDraft,
      publishDraft: mockPublishDraft,
      update: mockUpdate,
      updateOrganization:
        mockUpdateOrganization,
    },
  } as unknown as ReturnType<
    typeof getPersonalPlatformHub
  >);
}

function renderEditor(
  editingEntryId?: JournalEntryId,
  sourceContext?:
    JournalEntryEditorSourceContext,
) {
  const goBack = jest.fn();
  const rootGoBack = jest.fn();
  const rootCanGoBack = jest.fn(
    () => true,
  );
  const rootNavigation = {
    canGoBack: rootCanGoBack,
    goBack: rootGoBack,
  };
  const drawerNavigation = {
    getParent: jest.fn(
      () => rootNavigation,
    ),
  };
  const getParent = jest.fn(
    () => drawerNavigation,
  );

  const view = render(
    <JournalEntryEditorScreen
      navigation={{
        goBack,
        getParent,
      } as never}
      route={{
        key: "journal-editor-test",
        name: "JournalEntryEditor",
        params:
          editingEntryId === undefined &&
          sourceContext === undefined
            ? undefined
            : editingEntryId !== undefined
              ? {
                  entryId:
                    editingEntryId,
                }
              : {
                  sourceContext,
                },
      } as never}
    />,
  );

  return {
    ...view,
    goBack,
    rootGoBack,
    rootCanGoBack,
  };
}

async function renderLoadedActiveEditor() {
  mockFindById.mockResolvedValue(
    existingEntry,
  );

  const view = renderEditor(entryId);

  await waitFor(() => {
    expect(
      view.getByLabelText("Reflexão").props.value,
    ).toBe(existingEntry.reflectionText);
  });

  return view;
}

async function advanceAutosave(): Promise<void> {
  await act(async () => {
    jest.advanceTimersByTime(800);
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe(
  "JournalEntryEditorScreen P16-P3 organization",
  () => {
    beforeEach(() => {
      jest.useFakeTimers();

      mockFindById.mockReset();
      mockGetTodayEntryDate.mockReset();
      mockCreate.mockReset();
      mockCreateDraft.mockReset();
      mockCreateBibleDraft.mockReset();
      mockCreatePlanDraft.mockReset();
      mockUpdateDraft.mockReset();
      mockPublishDraft.mockReset();
      mockUpdate.mockReset();
      mockUpdateOrganization.mockReset();
      mockedGetPersonalPlatformHub.mockReset();

      mockGetTodayEntryDate.mockReturnValue(
        "2026-09-10",
      );
      mockCreateDraft.mockResolvedValue(
        draftEntry,
      );
      mockCreateBibleDraft.mockResolvedValue(
        bibleDraftEntry,
      );
      mockCreatePlanDraft.mockResolvedValue(
        planDraftEntry,
      );
      mockUpdateDraft.mockResolvedValue(
        draftEntry,
      );
      mockPublishDraft.mockResolvedValue(
        existingEntry,
      );
      mockCreate.mockResolvedValue(
        existingEntry,
      );
      mockUpdate.mockResolvedValue(
        existingEntry,
      );
      mockUpdateOrganization.mockResolvedValue(
        existingEntry,
      );

      configureHub();
    });

    afterEach(() => {
      cleanup();
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it(
      "starts a new entry with today's local date from the service",
      () => {
        const view = renderEditor();

        expect(
          view.getByText("Novo registro"),
        ).toBeTruthy();
        expect(
          view.getByLabelText("Data do registro")
            .props.value,
        ).toBe("10/09/2026");
        expect(
          view.getByLabelText("Tags do registro")
            .props.value,
        ).toBe("");
        expect(
          view.getByLabelText(
            "Remover categoria do registro",
          ).props.accessibilityState.selected,
        ).toBe(true);
        expect(
          view.getByLabelText(
            "Marcar registro como fixado",
          ),
        ).toBeTruthy();
        expect(
          mockGetTodayEntryDate,
        ).toHaveBeenCalledTimes(1);
        expect(
          mockFindById,
        ).not.toHaveBeenCalled();
      },
      10000,
    );

    it(
      "opens Bible context without persisting before the user edits",
      () => {
        const view = renderEditor(
          undefined,
          bibleSourceContext,
        );

        expect(
          view.getByLabelText(
            "Referência bíblica vinculada: João 3:16",
          ),
        ).toBeTruthy();
        expect(
          view.getByText("João 3:16"),
        ).toBeTruthy();
        expect(
          mockCreateBibleDraft,
        ).not.toHaveBeenCalled();
        expect(
          mockCreateDraft,
        ).not.toHaveBeenCalled();
        expect(
          mockCreate,
        ).not.toHaveBeenCalled();
      },
      10000,
    );

    it("autosaves Bible context through createBibleDraft instead of a FREE draft", async () => {
      const view = renderEditor(
        undefined,
        bibleSourceContext,
      );

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Reflexão em João 3:16.",
      );

      await advanceAutosave();

      await waitFor(() => {
        expect(
          mockCreateBibleDraft,
        ).toHaveBeenCalledWith({
          entryDate: "2026-09-10",
          reflectionText:
            "Reflexão em João 3:16.",
          gratitudeText: "",
          reference: bibleReference,
        });
      });

      expect(
        mockCreateDraft,
      ).not.toHaveBeenCalled();
      expect(
        mockCreate,
      ).not.toHaveBeenCalled();
    });

    it("directly saves Bible context by creating one draft and publishing that same record", async () => {
      const view = renderEditor(
        undefined,
        bibleSourceContext,
      );

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Guardar esta reflexão bíblica.",
      );

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockCreateBibleDraft,
        ).toHaveBeenCalledWith({
          entryDate: "2026-09-10",
          reflectionText:
            "Guardar esta reflexão bíblica.",
          gratitudeText: "",
          reference: bibleReference,
        });
        expect(
          mockPublishDraft,
        ).toHaveBeenCalledWith(
          draftId,
          {
            entryDate: "2026-09-10",
            reflectionText:
              "Guardar esta reflexão bíblica.",
            gratitudeText: "",
          },
        );
        expect(
          view.goBack,
        ).toHaveBeenCalledTimes(1);
      });

      expect(
        mockCreateBibleDraft,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockCreate,
      ).not.toHaveBeenCalled();
    });

    it("retries a failed Bible publish without creating a duplicate draft", async () => {
      mockPublishDraft
        .mockRejectedValueOnce(
          new Error("temporary"),
        )
        .mockResolvedValueOnce(
          existingEntry,
        );

      const view = renderEditor(
        undefined,
        bibleSourceContext,
      );

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Não duplicar esta origem bíblica.",
      );

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          view.getByText(
            "Não foi possível salvar seu registro agora. Tente novamente.",
          ),
        ).toBeTruthy();
      });

      expect(
        mockCreateBibleDraft,
      ).toHaveBeenCalledTimes(1);
      expect(
        view.goBack,
      ).not.toHaveBeenCalled();

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockPublishDraft,
        ).toHaveBeenCalledTimes(2);
        expect(
          view.goBack,
        ).toHaveBeenCalledTimes(1);
      });

      expect(
        mockCreateBibleDraft,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockCreate,
      ).not.toHaveBeenCalled();
    });

    it(
      "opens Plan context on the plan date with snapshots and no persistence",
      () => {
        const view = renderEditor(
          undefined,
          planSourceContext,
        );

        expect(
          view.getByLabelText(
            "Origem do plano: Plano de leitura • Evangelhos",
          ),
        ).toBeTruthy();
        expect(
          view.getByText(
            "Observe o caráter de Cristo.",
          ),
        ).toBeTruthy();
        expect(
          view.getByText("João 3:16"),
        ).toBeTruthy();
        expect(
          view.getByLabelText("Data do registro")
            .props.value,
        ).toBe("08/09/2026");
        expect(
          view.getByLabelText("Data do registro")
            .props.editable,
        ).toBe(false);
        expect(
          mockGetTodayEntryDate,
        ).not.toHaveBeenCalled();
        expect(
          mockCreatePlanDraft,
        ).not.toHaveBeenCalled();
        expect(
          mockCreateDraft,
        ).not.toHaveBeenCalled();
        expect(
          mockCreateBibleDraft,
        ).not.toHaveBeenCalled();
      },
      10000,
    );

    it("autosaves Plan context through createPlanDraft without touching FREE or BIBLE creation", async () => {
      const view = renderEditor(
        undefined,
        planSourceContext,
      );

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Aplicação da leitura do plano.",
      );

      await advanceAutosave();

      await waitFor(() => {
        expect(
          mockCreatePlanDraft,
        ).toHaveBeenCalledWith({
          entryDate: "2026-09-08",
          reflectionText:
            "Aplicação da leitura do plano.",
          gratitudeText: "",
          sourceTitleSnapshot:
            "Plano de leitura • Evangelhos",
          promptSnapshot:
            "Observe o caráter de Cristo.",
          reference: bibleReference,
        });
      });

      expect(
        mockCreatePlanDraft,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockCreateDraft,
      ).not.toHaveBeenCalled();
      expect(
        mockCreateBibleDraft,
      ).not.toHaveBeenCalled();
    });

    it("directly saves Plan context by publishing the same PLAN draft", async () => {
      const view = renderEditor(
        undefined,
        planSourceContext,
      );

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Guardar aplicação do plano.",
      );

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockCreatePlanDraft,
        ).toHaveBeenCalledWith({
          entryDate: "2026-09-08",
          reflectionText:
            "Guardar aplicação do plano.",
          gratitudeText: "",
          sourceTitleSnapshot:
            "Plano de leitura • Evangelhos",
          promptSnapshot:
            "Observe o caráter de Cristo.",
          reference: bibleReference,
        });
        expect(
          mockPublishDraft,
        ).toHaveBeenCalledWith(
          draftId,
          {
            entryDate: "2026-09-08",
            reflectionText:
              "Guardar aplicação do plano.",
            gratitudeText: "",
          },
        );
        expect(
          view.rootCanGoBack,
        ).toHaveBeenCalledTimes(1);
        expect(
          view.rootGoBack,
        ).toHaveBeenCalledTimes(1);
        expect(
          view.goBack,
        ).not.toHaveBeenCalled();
      });

      expect(
        mockCreatePlanDraft,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockCreateDraft,
      ).not.toHaveBeenCalled();
      expect(
        mockCreateBibleDraft,
      ).not.toHaveBeenCalled();
    });

    it("autosaves a Plan special day with zero Bible references", async () => {
      const view = renderEditor(
        undefined,
        planSpecialDaySourceContext,
      );

      expect(
        view.getByLabelText(
          "Origem do plano: Plano de leitura • Natal",
        ),
      ).toBeTruthy();
      expect(
        view.queryByText("João 3:16"),
      ).toBeNull();
      expect(
        view.getByLabelText("Data do registro")
          .props.value,
      ).toBe("25/12/2026");

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Natal aponta para Cristo.",
      );

      await advanceAutosave();

      await waitFor(() => {
        expect(
          mockCreatePlanDraft,
        ).toHaveBeenCalledWith({
          entryDate: "2026-12-25",
          reflectionText:
            "Natal aponta para Cristo.",
          gratitudeText: "",
          sourceTitleSnapshot:
            "Plano de leitura • Natal",
          promptSnapshot:
            "Contemple o nascimento de Cristo.",
          reference: null,
        });
      });
    });

    it("loads an existing PLAN draft with its persisted source context", async () => {
      mockFindById.mockResolvedValue(
        planDraftEntry,
      );

      const view = renderEditor(draftId);

      await waitFor(() => {
        expect(
          view.getByLabelText(
            "Origem do plano: Plano de leitura • Evangelhos",
          ),
        ).toBeTruthy();
        expect(
          view.getByText(
            "Observe o caráter de Cristo.",
          ),
        ).toBeTruthy();
        expect(
          view.getByText("João 3:16"),
        ).toBeTruthy();
        expect(
          view.getByLabelText(
            "Data do registro",
          ).props.value,
        ).toBe("08/09/2026");
        expect(
          view.getByLabelText(
            "Data do registro",
          ).props.editable,
        ).toBe(false);
      });

      expect(
        mockCreatePlanDraft,
      ).not.toHaveBeenCalled();
    });

    it("autosaves category and tags together with the same draft", async () => {
      const view = renderEditor();

      fireEvent.press(
        view.getByLabelText(
          "Selecionar categoria Oração",
        ),
      );
      fireEvent.changeText(
        view.getByLabelText(
          "Tags do registro",
        ),
        " oração, Família ",
      );

      await advanceAutosave();

      await waitFor(() => {
        expect(
          mockCreateDraft,
        ).toHaveBeenCalledTimes(1);
        expect(
          mockUpdateOrganization,
        ).toHaveBeenCalledWith(
          draftId,
          {
            category: "PRAYER",
            tagNames: [
              "oração",
              "Família",
            ],
          },
        );
      });

      expect(
        mockUpdateOrganization.mock.calls[0]?.[1],
      ).not.toHaveProperty("isPinned");
    });

    it("autosaves a new draft after the user changes content", async () => {
      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Minha reflexão em andamento.",
      );

      expect(
        mockCreateDraft,
      ).not.toHaveBeenCalled();

      await advanceAutosave();

      await waitFor(() => {
        expect(
          mockCreateDraft,
        ).toHaveBeenCalledWith({
          entryDate: "2026-09-10",
          reflectionText:
            "Minha reflexão em andamento.",
          gratitudeText: "",
        });
      });

      expect(
        view.getByText("Rascunho salvo"),
      ).toBeTruthy();
    });

    it("updates the same draft on subsequent autosaves instead of duplicating it", async () => {
      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Primeira versão.",
      );
      await advanceAutosave();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Segunda versão.",
      );
      await advanceAutosave();

      await waitFor(() => {
        expect(
          mockCreateDraft,
        ).toHaveBeenCalledTimes(1);
        expect(
          mockUpdateDraft,
        ).toHaveBeenCalledWith(
          draftId,
          {
            entryDate: "2026-09-10",
            reflectionText:
              "Segunda versão.",
            gratitudeText: "",
          },
        );
      });
    });

    it("loads an existing draft and keeps autosaving it", async () => {
      mockFindById.mockResolvedValue(
        draftEntry,
      );

      const view = renderEditor(draftId);

      await waitFor(() => {
        expect(
          view.getByText(
            "Continuar rascunho",
          ),
        ).toBeTruthy();
        expect(
          view.getByLabelText(
            "Data do registro",
          ).props.value,
        ).toBe("09/09/2026");
      });

      fireEvent.changeText(
        view.getByLabelText("Gratidão"),
        "Obrigado por hoje.",
      );
      await advanceAutosave();

      await waitFor(() => {
        expect(
          mockUpdateDraft,
        ).toHaveBeenCalledWith(
          draftId,
          expect.objectContaining({
            gratitudeText:
              "Obrigado por hoje.",
          }),
        );
      });

      expect(
        mockCreateDraft,
      ).not.toHaveBeenCalled();
    });

    it("publishes an autosaved draft when the user explicitly saves", async () => {
      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Reflexão final.",
      );
      await advanceAutosave();

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockPublishDraft,
        ).toHaveBeenCalledWith(
          draftId,
          {
            entryDate: "2026-09-10",
            reflectionText:
              "Reflexão final.",
            gratitudeText: "",
          },
        );
        expect(
          view.goBack,
        ).toHaveBeenCalledTimes(1);
      });

      expect(
        mockCreate,
      ).not.toHaveBeenCalled();
    });

    it("creates directly when explicit save happens before the autosave delay", async () => {
      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Salvar agora.",
      );

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockCreate,
        ).toHaveBeenCalledWith({
          entryDate: "2026-09-10",
          reflectionText: "Salvar agora.",
          gratitudeText: "",
        });
        expect(
          view.goBack,
        ).toHaveBeenCalledTimes(1);
      });

      expect(
        mockCreateDraft,
      ).not.toHaveBeenCalled();
    });

    it("edits an active entry with its persisted date and no autosave", async () => {
      const view =
        await renderLoadedActiveEditor();

      expect(
        view.getByText("Editar registro"),
      ).toBeTruthy();
      expect(
        view.getByLabelText("Data do registro")
          .props.value,
      ).toBe("09/09/2026");

      fireEvent.changeText(
        view.getByLabelText(
          "Data do registro",
        ),
        "08/09/2026",
      );
      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Reflexão atualizada.",
      );

      await advanceAutosave();

      expect(
        mockCreateDraft,
      ).not.toHaveBeenCalled();
      expect(
        mockUpdateDraft,
      ).not.toHaveBeenCalled();

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockUpdate,
        ).toHaveBeenCalledWith(
          entryId,
          {
            entryDate: "2026-09-08",
            reflectionText:
              "Reflexão atualizada.",
            gratitudeText:
              existingEntry.gratitudeText,
          },
        );
      });
    });

    it("loads and saves category tags and pin for an active entry", async () => {
      const organizedEntry = {
        ...existingEntry,
        category: "REFLECTION",
        isPinned: false,
        tags: [
          {
            id: "tag-faith" as never,
            name: "Fé",
            normalizedName: "fe",
          },
        ],
      } as JournalEntryPersistenceRecord;

      mockFindById.mockResolvedValue(
        organizedEntry,
      );

      const view = renderEditor(entryId);

      await waitFor(() => {
        expect(
          view.getByLabelText(
            "Tags do registro",
          ).props.value,
        ).toBe("Fé");
        expect(
          view.getByLabelText(
            "Selecionar categoria Reflexão",
          ).props.accessibilityState.selected,
        ).toBe(true);
      });

      fireEvent.press(
        view.getByLabelText(
          "Selecionar categoria Promessa",
        ),
      );
      fireEvent.changeText(
        view.getByLabelText(
          "Tags do registro",
        ),
        "Fé, Promessa",
      );
      fireEvent.press(
        view.getByLabelText(
          "Marcar registro como fixado",
        ),
      );

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockUpdateOrganization,
        ).toHaveBeenLastCalledWith(
          entryId,
          {
            category: "PROMISE",
            tagNames: [
              "Fé",
              "Promessa",
            ],
            isPinned: true,
          },
        );
        expect(
          view.goBack,
        ).toHaveBeenCalledTimes(1);
      });
    });

    it("retries organization after direct create without duplicating the entry", async () => {
      mockUpdateOrganization
        .mockRejectedValueOnce(
          new Error("temporary"),
        )
        .mockResolvedValueOnce(
          existingEntry,
        );

      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Registro sem duplicação.",
      );

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          view.getByText(
            "Não foi possível salvar seu registro agora. Tente novamente.",
          ),
        ).toBeTruthy();
      });

      expect(
        mockCreate,
      ).toHaveBeenCalledTimes(1);
      expect(
        view.goBack,
      ).not.toHaveBeenCalled();

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockUpdate,
        ).toHaveBeenCalledWith(
          entryId,
          expect.objectContaining({
            reflectionText:
              "Registro sem duplicação.",
          }),
        );
        expect(
          mockUpdateOrganization,
        ).toHaveBeenCalledTimes(2);
        expect(
          view.goBack,
        ).toHaveBeenCalledTimes(1);
      });

      expect(
        mockCreate,
      ).toHaveBeenCalledTimes(1);
    });

    it("blocks explicit save when date is invalid", async () => {
      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText(
          "Data do registro",
        ),
        "31/02/2026",
      );
      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Conteúdo válido.",
      );

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      expect(
        view.getByText(
          "Informe uma data válida no formato DD/MM/AAAA.",
        ),
      ).toBeTruthy();

      expect(
        mockCreate,
      ).not.toHaveBeenCalled();
      expect(
        mockPublishDraft,
      ).not.toHaveBeenCalled();
    });

    it("blocks explicit save when content is empty but still permits empty drafts", async () => {
      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Primeiro texto.",
      );
      await advanceAutosave();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "",
      );
      await advanceAutosave();

      await waitFor(() => {
        expect(
          mockUpdateDraft,
        ).toHaveBeenCalledWith(
          draftId,
          expect.objectContaining({
            reflectionText: "",
            gratitudeText: "",
          }),
        );
      });

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      expect(
        view.getByText(
          "Escreva uma reflexão ou gratidão antes de salvar.",
        ),
      ).toBeTruthy();
      expect(
        mockPublishDraft,
      ).not.toHaveBeenCalled();
    });

    it("shows autosave failure without discarding the form", async () => {
      mockCreateDraft.mockRejectedValue(
        new Error("temporary failure"),
      );

      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Texto permanece na tela.",
      );
      await advanceAutosave();

      await waitFor(() => {
        expect(
          view.getByText(
            "Não foi possível salvar o rascunho agora.",
          ),
        ).toBeTruthy();
      });

      expect(
        view.getByLabelText("Reflexão")
          .props.value,
      ).toBe("Texto permanece na tela.");
    });

    it("shows not-found state for an existing record id that is absent", async () => {
      mockFindById.mockResolvedValueOnce(null);

      const view = renderEditor(entryId);

      await waitFor(() => {
        expect(
          view.getByText(
            "Este registro não foi encontrado.",
          ),
        ).toBeTruthy();
      });
    });

    it("retries a non-fatal load error and recovers the existing record", async () => {
      mockFindById
        .mockRejectedValueOnce(
          new Error("temporary"),
        )
        .mockResolvedValueOnce(
          existingEntry,
        );

      const view = renderEditor(entryId);

      await waitFor(() => {
        expect(
          view.getByText(
            "Não foi possível carregar este registro agora.",
          ),
        ).toBeTruthy();
      });

      fireEvent.press(
        view.getByLabelText(
          "Tentar carregar o registro novamente",
        ),
      );

      await waitFor(() => {
        expect(
          view.getByLabelText(
            "Reflexão",
          ).props.value,
        ).toBe(
          existingEntry.reflectionText,
        );
      });
    });

    it("keeps persistence and telemetry out of the editor", () => {
      const source = fs.readFileSync(
        "src/screens/JournalEntryEditorScreen.tsx",
        "utf8",
      );

      expect(source).toContain(
        "getPersonalPlatformHub().journalService",
      );
      expect(source).toContain(
        "createDraft",
      );
      expect(source).toContain(
        "createBibleDraft",
      );
      expect(source).toContain(
        "sourceContext",
      );
      expect(source).toContain(
        "getBibleBookById",
      );
      expect(source).toContain(
        "updateDraft",
      );
      expect(source).toContain(
        "publishDraft",
      );
      expect(source).toContain(
        "updateOrganization",
      );
      expect(source).toContain(
        "CATEGORY_OPTIONS",
      );
      expect(source).toContain(
        "Tags do registro",
      );
      expect(source).not.toMatch(
        /SQLiteJournalRepository|JournalRepository|expo-sqlite|AsyncStorage/i,
      );
      expect(source).not.toMatch(
        /analytics|telemetry/i,
      );
      expect(source).not.toMatch(
        /#[0-9A-Fa-f]{3,8}/,
      );
    });
  },
);
