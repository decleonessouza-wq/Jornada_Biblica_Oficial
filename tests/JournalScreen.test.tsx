import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import {
  useFocusEffect,
} from "@react-navigation/native";

import type {
  JournalEntryPersistenceRecord,
} from "../src/data/personal/journal/journalRepository";
import {
  getPersonalPlatformHub,
} from "../src/services/personalPlatformHub";
import JournalScreen from "../src/screens/JournalScreen";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
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

const mockedUseFocusEffect =
  useFocusEffect as jest.MockedFunction<
    typeof useFocusEffect
  >;

const mockedGetPersonalPlatformHub =
  getPersonalPlatformHub as jest.MockedFunction<
    typeof getPersonalPlatformHub
  >;

const mockJournalList = jest.fn();
const mockGetTodayEntryDate = jest.fn();

function entry(
  overrides: Partial<
    JournalEntryPersistenceRecord
  >,
): JournalEntryPersistenceRecord {
  return {
    id: "journal-entry-default",
    entryDate: "2026-09-10",
    reflectionText: "Reflexão",
    gratitudeText: null,
    status: "ACTIVE",
    sourceType: "FREE",
    sourceTitleSnapshot: null,
    promptSnapshot: null,
    references: [],
    tags: [],
    createdAtUtc:
      "2026-09-10T13:00:00.000Z",
    updatedAtUtc:
      "2026-09-10T13:00:00.000Z",
    ...overrides,
  } as JournalEntryPersistenceRecord;
}

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    journalService: {
      list: mockJournalList,
      getTodayEntryDate:
        mockGetTodayEntryDate,
    },
  } as unknown as ReturnType<
    typeof getPersonalPlatformHub
  >);
}

function renderJournal() {
  const navigate = jest.fn();

  const view = render(
    <JournalScreen
      navigation={{ navigate } as never}
      route={{
        key: "journal-home-test",
        name: "JournalHome",
      } as never}
    />,
  );

  return {
    ...view,
    navigate,
  };
}

async function runFocusEffect(): Promise<void> {
  const callback =
    mockedUseFocusEffect.mock.calls.at(-1)?.[0];

  if (!callback) {
    throw new Error(
      "TEST_EXPECTED_JOURNAL_FOCUS_CALLBACK",
    );
  }

  await act(async () => {
    callback();
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe("JournalScreen P16-P2 timeline", () => {
  beforeEach(() => {
    mockJournalList.mockReset();
    mockGetTodayEntryDate.mockReset();
    mockedUseFocusEffect.mockReset();
    mockedGetPersonalPlatformHub.mockReset();

    mockGetTodayEntryDate.mockReturnValue(
      "2026-09-10",
    );

    configureHub();
  });

  afterEach(() => {
    cleanup();
  });

  it("loads timeline data when focused", async () => {
    mockJournalList.mockResolvedValue([]);

    const view = renderJournal();

    expect(
      view.getByText("Carregando seu diário..."),
    ).toBeTruthy();

    await runFocusEffect();

    await waitFor(() => {
      expect(
        mockGetTodayEntryDate,
      ).toHaveBeenCalledTimes(1);
      expect(
        mockJournalList,
      ).toHaveBeenCalledTimes(1);
      expect(
        view.getByText(
          "Seu diário ainda está vazio",
        ),
      ).toBeTruthy();
    });
  });

  it("groups repository-ordered entries by today, yesterday, week, month and year without sorting", async () => {
    mockJournalList.mockResolvedValue([
      entry({
        id: "today-a" as never,
        entryDate: "2026-09-10" as never,
      }),
      entry({
        id: "today-b" as never,
        entryDate: "2026-09-10" as never,
        reflectionText: "Segunda de hoje",
      }),
      entry({
        id: "yesterday" as never,
        entryDate: "2026-09-09" as never,
      }),
      entry({
        id: "week" as never,
        entryDate: "2026-09-08" as never,
      }),
      entry({
        id: "month" as never,
        entryDate: "2026-09-01" as never,
      }),
      entry({
        id: "older-month" as never,
        entryDate: "2026-08-31" as never,
      }),
      entry({
        id: "older-year" as never,
        entryDate: "2025-12-31" as never,
      }),
    ]);

    const view = renderJournal();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText("Hoje"),
      ).toBeTruthy();
      expect(
        view.getByText("Ontem"),
      ).toBeTruthy();
      expect(
        view.getByText("Esta semana"),
      ).toBeTruthy();
      expect(
        view.getByText("Este mês"),
      ).toBeTruthy();
      expect(
        view.getByText("Agosto"),
      ).toBeTruthy();
      expect(
        view.getByText("2025"),
      ).toBeTruthy();
    });

    const source = fs.readFileSync(
      "src/screens/JournalScreen.tsx",
      "utf8",
    );
    expect(source).not.toContain(".sort(");
  });

  it("opens active entries in detail", async () => {
    const active = entry({
      id: "active-entry" as never,
    });
    mockJournalList.mockResolvedValue([
      active,
    ]);

    const view = renderJournal();
    await runFocusEffect();

    const label =
      "Abrir registro do diário de 10 de setembro de 2026";

    await waitFor(() => {
      expect(
        view.getByLabelText(label),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(label),
    );

    expect(
      view.navigate,
    ).toHaveBeenCalledWith(
      "JournalEntryDetail",
      {
        entryId: active.id,
      },
    );
  });

  it("opens drafts directly in the editor", async () => {
    const draft = entry({
      id: "draft-entry" as never,
      status: "DRAFT",
      reflectionText: null,
      gratitudeText: null,
    });
    mockJournalList.mockResolvedValue([
      draft,
    ]);

    const view = renderJournal();
    await runFocusEffect();

    const label =
      "Continuar rascunho do diário de 10 de setembro de 2026";

    await waitFor(() => {
      expect(
        view.getByText("Rascunho"),
      ).toBeTruthy();
      expect(
        view.getByText(
          "Continue escrevendo seu registro.",
        ),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(label),
    );

    expect(
      view.navigate,
    ).toHaveBeenCalledWith(
      "JournalEntryEditor",
      {
        entryId: draft.id,
      },
    );
  });

  it("keeps both reflection and gratitude cards faithful to persisted content", async () => {
    mockJournalList.mockResolvedValue([
      entry({
        id: "reflection" as never,
        reflectionText:
          "Reflexão persistida.",
        gratitudeText: null,
      }),
      entry({
        id: "gratitude" as never,
        entryDate: "2026-09-09" as never,
        reflectionText: null,
        gratitudeText:
          "Gratidão persistida.",
      }),
    ]);

    const view = renderJournal();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText(
          "Reflexão persistida.",
        ),
      ).toBeTruthy();
      expect(
        view.getByText(
          "Gratidão persistida.",
        ),
      ).toBeTruthy();
    });
  });

  it("retries a non-fatal load error", async () => {
    mockJournalList
      .mockRejectedValueOnce(
        new Error("temporary"),
      )
      .mockResolvedValueOnce([]);

    const view = renderJournal();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText(
          "Não foi possível carregar seu diário agora.",
        ),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(
        "Tentar carregar o diário novamente",
      ),
    );

    await waitFor(() => {
      expect(
        mockJournalList,
      ).toHaveBeenCalledTimes(2);
      expect(
        view.getByText(
          "Seu diário ainda está vazio",
        ),
      ).toBeTruthy();
    });
  });

  it("starts typed creation route from one primary action", () => {
    mockJournalList.mockResolvedValue([]);

    const view = renderJournal();

    fireEvent.press(
      view.getByLabelText(
        "Registrar nova entrada no diário",
      ),
    );

    expect(
      view.navigate,
    ).toHaveBeenCalledWith(
      "JournalEntryEditor",
    );
  });

  it("uses the Hub service without direct persistence or telemetry access", () => {
    const source = fs.readFileSync(
      "src/screens/JournalScreen.tsx",
      "utf8",
    );

    expect(source).toContain(
      "getPersonalPlatformHub().journalService",
    );
    expect(source).not.toMatch(
      /SQLiteJournalRepository|expo-sqlite|AsyncStorage/i,
    );
    expect(source).not.toMatch(
      /analytics|telemetry/i,
    );
  });
});
