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
  JournalEntry,
} from "../src/domain/journal/journal";
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

const reflectionEntry = {
  id: "journal-entry-reflection",
  entryDate: "2026-09-09",
  reflectionText:
    "Hoje compreendi que preciso perseverar com fé.",
  gratitudeText: null,
  createdAtUtc: "2026-09-09T13:00:00.000Z",
  updatedAtUtc: "2026-09-09T13:00:00.000Z",
} as unknown as JournalEntry;

const gratitudeEntry = {
  id: "journal-entry-gratitude",
  entryDate: "2026-09-08",
  reflectionText: null,
  gratitudeText:
    "Sou grato a Deus pelo cuidado de hoje.",
  createdAtUtc: "2026-09-08T13:00:00.000Z",
  updatedAtUtc: "2026-09-08T13:00:00.000Z",
} as unknown as JournalEntry;

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    journalService: {
      list: mockJournalList,
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

describe("JournalScreen", () => {
  beforeEach(() => {
    mockJournalList.mockReset();
    mockedUseFocusEffect.mockReset();
    mockedGetPersonalPlatformHub.mockReset();
    configureHub();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows an explicit loading state before focus completes", () => {
    mockJournalList.mockResolvedValue([]);

    const view = renderJournal();

    expect(
      view.getByText("Carregando seu diário..."),
    ).toBeTruthy();
    expect(mockJournalList).not.toHaveBeenCalled();
  });

  it(
    "loads journal entries when the screen receives focus",
    async () => {
      mockJournalList.mockResolvedValue([]);

      const view = renderJournal();

      await runFocusEffect();

      await waitFor(() => {
        expect(mockJournalList).toHaveBeenCalledTimes(1);
        expect(
          view.getByText("Seu diário ainda está vazio"),
        ).toBeTruthy();
      });
    },
    15000,
  );

  it("renders a natural empty state", async () => {
    mockJournalList.mockResolvedValue([]);

    const view = renderJournal();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText(
          "Quando você registrar uma reflexão ou gratidão, ela aparecerá aqui.",
        ),
      ).toBeTruthy();
    });
  });

  it("renders a reflection entry without inventing gratitude", async () => {
    mockJournalList.mockResolvedValue([
      reflectionEntry,
    ]);

    const view = renderJournal();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText("09 de setembro de 2026"),
      ).toBeTruthy();
      expect(
        view.getByText(
          "Hoje compreendi que preciso perseverar com fé.",
        ),
      ).toBeTruthy();
    });

    expect(
      view.queryByText(
        "Sou grato a Deus pelo cuidado de hoje.",
      ),
    ).toBeNull();
  });

  it("renders a gratitude entry without inventing reflection", async () => {
    mockJournalList.mockResolvedValue([
      gratitudeEntry,
    ]);

    const view = renderJournal();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText("08 de setembro de 2026"),
      ).toBeTruthy();
      expect(
        view.getByText(
          "Sou grato a Deus pelo cuidado de hoje.",
        ),
      ).toBeTruthy();
    });

    expect(
      view.queryByText(
        "Hoje compreendi que preciso perseverar com fé.",
      ),
    ).toBeNull();
  });

  it("renders a non-fatal error and retries successfully", async () => {
    mockJournalList
      .mockRejectedValueOnce(
        new Error("temporary failure"),
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
      expect(mockJournalList).toHaveBeenCalledTimes(2);
      expect(
        view.getByText("Seu diário ainda está vazio"),
      ).toBeTruthy();
    });
  });

  it("navigates to typed creation route", () => {
    mockJournalList.mockResolvedValue([]);

    const view = renderJournal();

    fireEvent.press(
      view.getByLabelText(
        "Registrar nova entrada no diário",
      ),
    );

    expect(view.navigate).toHaveBeenCalledWith(
      "JournalEntryEditor",
    );
  });

  it("opens the selected entry with its exact entryId", async () => {
    mockJournalList.mockResolvedValue([
      reflectionEntry,
      gratitudeEntry,
    ]);

    const view = renderJournal();
    await runFocusEffect();

    const label =
      "Abrir registro do diário de 09 de setembro de 2026";

    await waitFor(() => {
      expect(
        view.getByLabelText(label),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(label),
    );

    expect(view.navigate).toHaveBeenCalledWith(
      "JournalEntryDetail",
      {
        entryId: reflectionEntry.id,
      },
    );
  });

  it("uses the Hub service without direct persistence access", () => {
    const source = fs.readFileSync(
      "src/screens/JournalScreen.tsx",
      "utf8",
    );

    expect(source).toContain(
      "getPersonalPlatformHub().journalService.list()",
    );
    expect(source).not.toMatch(
      /SQLiteJournalRepository|JournalRepository|expo-sqlite|AsyncStorage/i,
    );
    expect(source).not.toMatch(
      /analytics|telemetry/i,
    );
    expect(source).not.toContain(".sort(");
  });
});
