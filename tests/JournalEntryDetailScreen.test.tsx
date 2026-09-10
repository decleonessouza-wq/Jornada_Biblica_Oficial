import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import { Alert } from "react-native";

import type {
  JournalEntry,
  JournalEntryId,
} from "../src/domain/journal/journal";
import {
  getPersonalPlatformHub,
} from "../src/services/personalPlatformHub";
import JournalEntryDetailScreen from "../src/screens/JournalEntryDetailScreen";

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
const mockRemove = jest.fn();

const entryId =
  "journal-entry-detail" as JournalEntryId;

const completeEntry = {
  id: entryId,
  entryDate: "2026-09-09",
  reflectionText:
    "Hoje compreendi algo importante.",
  gratitudeText:
    "Sou grato pelo cuidado de Deus.",
  createdAtUtc: "2026-09-09T13:00:00.000Z",
  updatedAtUtc: "2026-09-09T14:00:00.000Z",
} as unknown as JournalEntry;

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    journalService: {
      findById: mockFindById,
      remove: mockRemove,
    },
  } as unknown as ReturnType<
    typeof getPersonalPlatformHub
  >);
}

function renderDetail() {
  const navigate = jest.fn();
  const goBack = jest.fn();

  const view = render(
    <JournalEntryDetailScreen
      navigation={{
        navigate,
        goBack,
      } as never}
      route={{
        key: "journal-detail-test",
        name: "JournalEntryDetail",
        params: { entryId },
      } as never}
    />,
  );

  return {
    ...view,
    navigate,
    goBack,
  };
}

async function renderLoadedDetail(
  entry: JournalEntry = completeEntry,
) {
  mockFindById.mockResolvedValue(entry);

  const view = renderDetail();

  await waitFor(() => {
    expect(mockFindById).toHaveBeenCalledWith(
      entryId,
    );
    expect(
      view.getByText("09 de setembro de 2026"),
    ).toBeTruthy();
  });

  return view;
}

function getAlertButtons() {
  const alertCall = (
    Alert.alert as jest.MockedFunction<
      typeof Alert.alert
    >
  ).mock.calls.at(-1);

  if (!alertCall) {
    throw new Error(
      "TEST_EXPECTED_DELETE_CONFIRMATION_ALERT",
    );
  }

  const buttons = alertCall[2];

  if (!buttons) {
    throw new Error(
      "TEST_EXPECTED_DELETE_CONFIRMATION_BUTTONS",
    );
  }

  return buttons;
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

describe("JournalEntryDetailScreen", () => {
  beforeEach(() => {
    mockFindById.mockReset();
    mockRemove.mockReset();
    mockedGetPersonalPlatformHub.mockReset();
    configureHub();
    jest.spyOn(Alert, "alert").mockImplementation(
      () => undefined,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it("shows the initial loading state", () => {
    mockFindById.mockReturnValue(
      new Promise(() => undefined),
    );

    const view = renderDetail();

    expect(
      view.getByText("Carregando registro..."),
    ).toBeTruthy();
  });

  it("loads the exact entryId and renders both contents", async () => {
    const view = await renderLoadedDetail();

    expect(mockFindById).toHaveBeenCalledTimes(1);
    expect(mockFindById).toHaveBeenCalledWith(
      entryId,
    );
    expect(
      view.getByText(
        "Hoje compreendi algo importante.",
      ),
    ).toBeTruthy();
    expect(
      view.getByText(
        "Sou grato pelo cuidado de Deus.",
      ),
    ).toBeTruthy();
  });

  it("omits gratitude when it is null", async () => {
    const entry = {
      ...completeEntry,
      gratitudeText: null,
    } as JournalEntry;

    const view = await renderLoadedDetail(entry);

    expect(
      view.getByText(
        "Hoje compreendi algo importante.",
      ),
    ).toBeTruthy();
    expect(
      view.queryByText(
        "Sou grato pelo cuidado de Deus.",
      ),
    ).toBeNull();
  });

  it("omits reflection when it is null", async () => {
    const entry = {
      ...completeEntry,
      reflectionText: null,
    } as JournalEntry;

    const view = await renderLoadedDetail(entry);

    expect(
      view.getByText(
        "Sou grato pelo cuidado de Deus.",
      ),
    ).toBeTruthy();
    expect(
      view.queryByText(
        "Hoje compreendi algo importante.",
      ),
    ).toBeNull();
  });

  it("does not expose creation or update timestamps", async () => {
    const view = await renderLoadedDetail();

    expect(
      view.queryByText(
        completeEntry.createdAtUtc,
      ),
    ).toBeNull();
    expect(
      view.queryByText(
        completeEntry.updatedAtUtc,
      ),
    ).toBeNull();
  });

  it("shows a load error and retries the same entry", async () => {
    mockFindById
      .mockRejectedValueOnce(
        new Error("temporary failure"),
      )
      .mockResolvedValueOnce(completeEntry);

    const view = renderDetail();

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
        view.getByText("09 de setembro de 2026"),
      ).toBeTruthy();
    });
  });

  it("shows a non-fatal not-found state without mutations", async () => {
    mockFindById.mockResolvedValue(null);

    const view = renderDetail();

    await waitFor(() => {
      expect(
        view.getByText(
          "Este registro não foi encontrado.",
        ),
      ).toBeTruthy();
    });

    expect(
      view.queryByLabelText(
        "Editar registro do diário",
      ),
    ).toBeNull();
    expect(
      view.queryByLabelText(
        "Excluir registro do diário",
      ),
    ).toBeNull();
    expect(mockRemove).not.toHaveBeenCalled();
  });

  it("navigates to the editor with the exact entryId", async () => {
    const view = await renderLoadedDetail();

    fireEvent.press(
      view.getByLabelText(
        "Editar registro do diário",
      ),
    );

    expect(view.navigate).toHaveBeenCalledWith(
      "JournalEntryEditor",
      {
        entryId,
      },
    );
  });

  it("opens a destructive confirmation before removal", async () => {
    const view = await renderLoadedDetail();

    fireEvent.press(
      view.getByLabelText(
        "Excluir registro do diário",
      ),
    );

    expect(Alert.alert).toHaveBeenCalledWith(
      "Excluir registro?",
      "Esta ação não pode ser desfeita.",
      expect.any(Array),
    );

    const buttons = getAlertButtons();

    expect(buttons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: "Cancelar",
          style: "cancel",
        }),
        expect.objectContaining({
          text: "Excluir",
          style: "destructive",
        }),
      ]),
    );
    expect(mockRemove).not.toHaveBeenCalled();
  });

  it("cancels deletion without calling remove", async () => {
    const view = await renderLoadedDetail();

    fireEvent.press(
      view.getByLabelText(
        "Excluir registro do diário",
      ),
    );

    const cancelButton = getAlertButtons().find(
      (button) => button.text === "Cancelar",
    );

    expect(cancelButton).toBeDefined();

    await act(async () => {
      cancelButton?.onPress?.();
      await Promise.resolve();
    });

    expect(mockRemove).not.toHaveBeenCalled();
    expect(view.goBack).not.toHaveBeenCalled();
  });

  it("removes the exact entry once and returns", async () => {
    mockRemove.mockResolvedValue(undefined);

    const view = await renderLoadedDetail();

    fireEvent.press(
      view.getByLabelText(
        "Excluir registro do diário",
      ),
    );

    const deleteButton = getAlertButtons().find(
      (button) => button.text === "Excluir",
    );

    expect(deleteButton).toBeDefined();

    await act(async () => {
      deleteButton?.onPress?.();
      await Promise.resolve();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(mockRemove).toHaveBeenCalledTimes(1);
      expect(mockRemove).toHaveBeenCalledWith(
        entryId,
      );
      expect(view.goBack).toHaveBeenCalledTimes(1);
    });
  });

  it("keeps the detail usable after a delete failure", async () => {
    mockRemove.mockRejectedValue(
      new Error("unexpected failure"),
    );

    const view = await renderLoadedDetail();

    fireEvent.press(
      view.getByLabelText(
        "Excluir registro do diário",
      ),
    );

    const deleteButton = getAlertButtons().find(
      (button) => button.text === "Excluir",
    );

    await act(async () => {
      deleteButton?.onPress?.();
      await Promise.resolve();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(
        view.getByText(
          "Não foi possível excluir este registro agora. Tente novamente.",
        ),
      ).toBeTruthy();
    });

    expect(
      view.getByLabelText(
        "Editar registro do diário",
      ),
    ).toBeTruthy();
    expect(view.goBack).not.toHaveBeenCalled();
  });

  it("translates a remove not-found error without exposing its code", async () => {
    const code =
      "PERSONAL_JOURNAL_REMOVE_TARGET_NOT_FOUND";

    mockRemove.mockRejectedValue(
      new Error(code),
    );

    const view = await renderLoadedDetail();

    fireEvent.press(
      view.getByLabelText(
        "Excluir registro do diário",
      ),
    );

    const deleteButton = getAlertButtons().find(
      (button) => button.text === "Excluir",
    );

    await act(async () => {
      deleteButton?.onPress?.();
      await Promise.resolve();
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(
        view.getByText(
          "Este registro não está mais disponível. Volte ao diário e atualize a lista.",
        ),
      ).toBeTruthy();
    });

    expect(
      view.queryByText(code),
    ).toBeNull();
  });

  it("prevents duplicate removal while deletion is pending", async () => {
    const pending = deferred<void>();
    mockRemove.mockReturnValue(pending.promise);

    const view = await renderLoadedDetail();

    fireEvent.press(
      view.getByLabelText(
        "Excluir registro do diário",
      ),
    );

    const deleteButton = getAlertButtons().find(
      (button) => button.text === "Excluir",
    );

    expect(deleteButton).toBeDefined();

    await act(async () => {
      deleteButton?.onPress?.();
      deleteButton?.onPress?.();
      await Promise.resolve();
    });

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(
      view.getByText("Excluindo..."),
    ).toBeTruthy();

    await act(async () => {
      pending.resolve();
      await pending.promise;
    });

    await waitFor(() => {
      expect(view.goBack).toHaveBeenCalledTimes(1);
    });
  });

  it("keeps persistence, legacy storage, telemetry, and extra features out", () => {
    const source = fs.readFileSync(
      "src/screens/JournalEntryDetailScreen.tsx",
      "utf8",
    );

    expect(source).toContain(
      "getPersonalPlatformHub().journalService.findById",
    );
    expect(source).toContain(
      "getPersonalPlatformHub().journalService.remove",
    );
    expect(source).not.toMatch(
      /SQLiteJournalRepository|JournalRepository|expo-sqlite|AsyncStorage/i,
    );
    expect(source).not.toMatch(
      /analytics|telemetry/i,
    );
    expect(source).not.toMatch(
      /createdAtUtc|updatedAtUtc/,
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
