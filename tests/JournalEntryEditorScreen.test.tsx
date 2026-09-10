import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

import type {
  JournalEntryId,
} from "../src/domain/journal/journal";
import type {
  JournalEntryPersistenceRecord,
} from "../src/data/personal/journal/journalRepository";
import {
  getPersonalPlatformHub,
} from "../src/services/personalPlatformHub";
import JournalEntryEditorScreen from "../src/screens/JournalEntryEditorScreen";

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
const mockUpdateDraft = jest.fn();
const mockPublishDraft = jest.fn();
const mockUpdate = jest.fn();

const entryId =
  "journal-entry-edit" as JournalEntryId;
const draftId =
  "journal-entry-draft" as JournalEntryId;

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

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    journalService: {
      findById: mockFindById,
      getTodayEntryDate:
        mockGetTodayEntryDate,
      create: mockCreate,
      createDraft: mockCreateDraft,
      updateDraft: mockUpdateDraft,
      publishDraft: mockPublishDraft,
      update: mockUpdate,
    },
  } as unknown as ReturnType<
    typeof getPersonalPlatformHub
  >);
}

function renderEditor(
  editingEntryId?: JournalEntryId,
) {
  const goBack = jest.fn();

  const view = render(
    <JournalEntryEditorScreen
      navigation={{ goBack } as never}
      route={{
        key: "journal-editor-test",
        name: "JournalEntryEditor",
        params:
          editingEntryId === undefined
            ? undefined
            : {
                entryId:
                  editingEntryId,
              },
      } as never}
    />,
  );

  return {
    ...view,
    goBack,
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
  "JournalEntryEditorScreen P16-P2",
  () => {
    beforeEach(() => {
      jest.useFakeTimers();

      mockFindById.mockReset();
      mockGetTodayEntryDate.mockReset();
      mockCreate.mockReset();
      mockCreateDraft.mockReset();
      mockUpdateDraft.mockReset();
      mockPublishDraft.mockReset();
      mockUpdate.mockReset();
      mockedGetPersonalPlatformHub.mockReset();

      mockGetTodayEntryDate.mockReturnValue(
        "2026-09-10",
      );
      mockCreateDraft.mockResolvedValue(
        draftEntry,
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

      configureHub();
    });

    afterEach(() => {
      cleanup();
      jest.clearAllTimers();
      jest.useRealTimers();
    });

    it("starts a new entry with today's local date from the service", () => {
      const view = renderEditor();

      expect(
        view.getByText("Novo registro"),
      ).toBeTruthy();
      expect(
        view.getByLabelText("Data do registro")
          .props.value,
      ).toBe("10/09/2026");
      expect(
        mockGetTodayEntryDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockFindById,
      ).not.toHaveBeenCalled();
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
        "updateDraft",
      );
      expect(source).toContain(
        "publishDraft",
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
