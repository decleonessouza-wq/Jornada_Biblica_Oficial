import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";

import type {
  JournalEntry,
  JournalEntryId,
} from "../src/domain/journal/journal";
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
const mockCreate = jest.fn();
const mockUpdate = jest.fn();

const entryId =
  "journal-entry-edit" as JournalEntryId;

const existingEntry = {
  id: entryId,
  entryDate: "2026-09-09",
  reflectionText:
    "Reflexão já registrada.",
  gratitudeText:
    "Gratidão já registrada.",
  createdAtUtc: "2026-09-09T13:00:00.000Z",
  updatedAtUtc: "2026-09-09T13:00:00.000Z",
} as unknown as JournalEntry;

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    journalService: {
      findById: mockFindById,
      create: mockCreate,
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
            : { entryId: editingEntryId },
      } as never}
    />,
  );

  return {
    ...view,
    goBack,
  };
}

async function renderLoadedEditor() {
  mockFindById.mockResolvedValue(existingEntry);

  const view = renderEditor(entryId);

  await waitFor(() => {
    expect(mockFindById).toHaveBeenCalledWith(
      entryId,
    );
    expect(
      view.getByLabelText("Reflexão").props.value,
    ).toBe(existingEntry.reflectionText);
  });

  return view;
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>(
    (resolvePromise, rejectPromise) => {
      resolve = resolvePromise;
      reject = rejectPromise;
    },
  );

  return {
    promise,
    resolve,
    reject,
  };
}

describe("JournalEntryEditorScreen", () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockedGetPersonalPlatformHub.mockReset();
    configureHub();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders creation mode without loading an existing entry", () => {
    const view = renderEditor();

    expect(
      view.getByText("Novo registro"),
    ).toBeTruthy();
    expect(
      view.getByLabelText("Reflexão"),
    ).toBeTruthy();
    expect(
      view.getByLabelText("Gratidão"),
    ).toBeTruthy();
    expect(mockFindById).not.toHaveBeenCalled();
  });

  it("creates with exactly reflection and gratitude", async () => {
    mockCreate.mockResolvedValue(existingEntry);

    const view = renderEditor();

    fireEvent.changeText(
      view.getByLabelText("Reflexão"),
      "  Minha reflexão permanece como digitei.  ",
    );
    fireEvent.changeText(
      view.getByLabelText("Gratidão"),
      "  Minha gratidão permanece como digitei.  ",
    );

    fireEvent.press(
      view.getByLabelText(
        "Salvar registro do diário",
      ),
    );

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    const input = mockCreate.mock.calls[0][0];

    expect(input).toEqual({
      reflectionText:
        "  Minha reflexão permanece como digitei.  ",
      gratitudeText:
        "  Minha gratidão permanece como digitei.  ",
    });
    expect(Object.keys(input).sort()).toEqual([
      "gratitudeText",
      "reflectionText",
    ]);
    expect(input).not.toHaveProperty("entryDate");
    expect(view.goBack).toHaveBeenCalledTimes(1);
  });

  it("blocks persistence when both fields are blank", async () => {
    const view = renderEditor();

    fireEvent.changeText(
      view.getByLabelText("Reflexão"),
      "   ",
    );
    fireEvent.changeText(
      view.getByLabelText("Gratidão"),
      " ",
    );

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
    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("loads editing mode by the exact entryId", async () => {
    const view = await renderLoadedEditor();

    expect(
      view.getByText("Editar registro"),
    ).toBeTruthy();
    expect(mockFindById).toHaveBeenCalledTimes(1);
    expect(mockFindById).toHaveBeenCalledWith(
      entryId,
    );
    expect(
      view.getByLabelText("Gratidão").props.value,
    ).toBe(existingEntry.gratitudeText);
  });

  it("updates the exact entryId with only editable content", async () => {
    mockUpdate.mockResolvedValue(existingEntry);

    const view = await renderLoadedEditor();

    fireEvent.changeText(
      view.getByLabelText("Reflexão"),
      "Reflexão atualizada.",
    );
    fireEvent.changeText(
      view.getByLabelText("Gratidão"),
      "Gratidão atualizada.",
    );

    fireEvent.press(
      view.getByLabelText(
        "Salvar registro do diário",
      ),
    );

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith(
        entryId,
        {
          reflectionText: "Reflexão atualizada.",
          gratitudeText: "Gratidão atualizada.",
        },
      );
    });

    const input = mockUpdate.mock.calls[0][1];

    expect(Object.keys(input).sort()).toEqual([
      "gratitudeText",
      "reflectionText",
    ]);
    expect(input).not.toHaveProperty("entryDate");
    expect(view.queryByLabelText("Data")).toBeNull();
    expect(view.goBack).toHaveBeenCalledTimes(1);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("shows a non-fatal state when the editing entry is not found", async () => {
    mockFindById.mockResolvedValue(null);

    const view = renderEditor(entryId);

    await waitFor(() => {
      expect(
        view.getByText(
          "Este registro não foi encontrado.",
        ),
      ).toBeTruthy();
    });

    expect(
      view.queryByLabelText("Reflexão"),
    ).toBeNull();
    expect(mockCreate).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it("shows a load error and retries the same entry", async () => {
    mockFindById
      .mockRejectedValueOnce(
        new Error("temporary failure"),
      )
      .mockResolvedValueOnce(existingEntry);

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
      expect(mockFindById).toHaveBeenCalledTimes(2);
      expect(
        view.getByLabelText("Reflexão").props.value,
      ).toBe(existingEntry.reflectionText);
    });
  });

  it.each([
    [
      "PERSONAL_JOURNAL_ENTRY_CONTENT_REQUIRED",
      "Escreva uma reflexão ou gratidão antes de salvar.",
    ],
    [
      "PERSONAL_JOURNAL_REFLECTION_TEXT_INVALID",
      "A reflexão ultrapassa o limite permitido.",
    ],
    [
      "PERSONAL_JOURNAL_GRATITUDE_TEXT_INVALID",
      "A gratidão ultrapassa o limite permitido.",
    ],
    [
      "PERSONAL_JOURNAL_ENTRY_DATE_CONFLICT",
      "Já existe um registro para hoje. Abra o registro existente para editar.",
    ],
    [
      "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
      "Este registro não foi encontrado. Volte ao diário e tente novamente.",
    ],
  ])(
    "translates service error %s without exposing its code",
    async (code, message) => {
      mockCreate.mockRejectedValue(
        new Error(code),
      );

      const view = renderEditor();

      fireEvent.changeText(
        view.getByLabelText("Reflexão"),
        "Conteúdo para testar erro.",
      );

      fireEvent.press(
        view.getByLabelText(
          "Salvar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          view.getByText(message),
        ).toBeTruthy();
      });

      expect(
        view.queryByText(code),
      ).toBeNull();
      expect(view.goBack).not.toHaveBeenCalled();
    },
  );

  it("shows a generic persistence error without leaving the screen", async () => {
    mockCreate.mockRejectedValue(
      new Error("unexpected persistence failure"),
    );

    const view = renderEditor();

    fireEvent.changeText(
      view.getByLabelText("Reflexão"),
      "Conteúdo válido.",
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

    expect(view.goBack).not.toHaveBeenCalled();
  });

  it("returns after a successful create", async () => {
    mockCreate.mockResolvedValue(existingEntry);

    const view = renderEditor();

    fireEvent.changeText(
      view.getByLabelText("Reflexão"),
      "Criar e voltar.",
    );

    fireEvent.press(
      view.getByLabelText(
        "Salvar registro do diário",
      ),
    );

    await waitFor(() => {
      expect(view.goBack).toHaveBeenCalledTimes(1);
    });
  });

  it("returns after a successful update", async () => {
    mockUpdate.mockResolvedValue(existingEntry);

    const view = await renderLoadedEditor();

    fireEvent.press(
      view.getByLabelText(
        "Salvar registro do diário",
      ),
    );

    await waitFor(() => {
      expect(view.goBack).toHaveBeenCalledTimes(1);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });
  });

  it("prevents duplicate submits while saving", async () => {
    const pending = deferred<JournalEntry>();
    mockCreate.mockReturnValue(pending.promise);

    const view = renderEditor();

    fireEvent.changeText(
      view.getByLabelText("Reflexão"),
      "Salvar apenas uma vez.",
    );

    const saveButton = view.getByLabelText(
      "Salvar registro do diário",
    );

    fireEvent.press(saveButton);

    expect(
      view.getByText("Salvando..."),
    ).toBeTruthy();

    fireEvent.press(saveButton);

    expect(mockCreate).toHaveBeenCalledTimes(1);

    await act(async () => {
      pending.resolve(existingEntry);
      await pending.promise;
    });

    await waitFor(() => {
      expect(view.goBack).toHaveBeenCalledTimes(1);
    });
  });

  it("keeps persistence, legacy storage, and telemetry out of the editor", () => {
    const source = fs.readFileSync(
      "src/screens/JournalEntryEditorScreen.tsx",
      "utf8",
    );

    expect(source).toContain(
      "getPersonalPlatformHub().journalService",
    );
    expect(source).toContain(
      "JOURNAL_REFLECTION_MAX_CHARS",
    );
    expect(source).toContain(
      "JOURNAL_GRATITUDE_MAX_CHARS",
    );
    expect(source).not.toMatch(
      /SQLiteJournalRepository|JournalRepository|expo-sqlite|AsyncStorage/i,
    );
    expect(source).not.toMatch(
      /analytics|telemetry/i,
    );
    expect(source).not.toMatch(
      /new Date|Date\.now|entryDate\s*:/,
    );
    expect(source).not.toMatch(
      /titleText|\bcategory\b|\btags?\b|BibleReference|readingPlan|autosave|\bdrafts?\b|\bbackup\b/i,
    );
    expect(source).not.toMatch(
      /Exportar|Compartilhar|exportJournal|exportEntry|expo-sharing|shareAsync/i,
    );
    expect(source).not.toMatch(
      /#[0-9A-Fa-f]{3,8}/,
    );
  });
});
