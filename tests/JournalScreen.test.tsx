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
const mockJournalListTrash = jest.fn();
const mockGetTodayEntryDate = jest.fn();

function entry(
  overrides: Partial<
    JournalEntryPersistenceRecord
  >,
): JournalEntryPersistenceRecord {
  return {
    id: "journal-entry-default" as never,
    entryDate: "2026-09-10" as never,
    reflectionText: "Reflexão",
    gratitudeText: null,
    status: "ACTIVE",
    sourceType: "FREE",
    sourceTitleSnapshot: null,
    promptSnapshot: null,
    category: null,
    isPinned: false,
    references: [],
    tags: [],
    createdAtUtc:
      "2026-09-10T13:00:00.000Z" as never,
    updatedAtUtc:
      "2026-09-10T13:00:00.000Z" as never,
    ...overrides,
  };
}

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    journalService: {
      list: mockJournalList,
      listTrash: mockJournalListTrash,
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

describe(
  "JournalScreen P16-P3 organization",
  () => {
    beforeEach(() => {
      mockJournalList.mockReset();
      mockJournalListTrash.mockReset();
      mockGetTodayEntryDate.mockReset();
      mockedUseFocusEffect.mockReset();
      mockedGetPersonalPlatformHub.mockReset();

      mockGetTodayEntryDate.mockReturnValue(
        "2026-09-10",
      );
      mockJournalListTrash.mockResolvedValue([]);

      configureHub();
    });

    afterEach(() => {
      cleanup();
    });

    it(
      "loads normal journal entries when focused",
      async () => {
        mockJournalList.mockResolvedValue([]);

        const view = renderJournal();

        expect(
          view.getByText("Carregando seu diário..."),
        ).toBeTruthy();

        await runFocusEffect();

        await waitFor(() => {
          expect(
            mockJournalList,
          ).toHaveBeenCalledTimes(1);
          expect(
            mockJournalListTrash,
          ).not.toHaveBeenCalled();
          expect(
            view.getByText(
              "Seu diário ainda está vazio",
            ),
          ).toBeTruthy();
        });
      },
      10000,
    );

    it("shows pinned active entries in a dedicated section without duplicating them in timeline", async () => {
      mockJournalList.mockResolvedValue([
        entry({
          id: "pinned" as never,
          isPinned: true,
          category: "PROMISE",
          reflectionText: "Registro fixado.",
          tags: [
            {
              id: "faith-tag" as never,
              name: "Fé",
              normalizedName: "fe",
            },
          ],
        }),
        entry({
          id: "regular" as never,
          reflectionText: "Registro comum.",
        }),
      ]);

      const view = renderJournal();
      await runFocusEffect();

      await waitFor(() => {
        expect(
          view.getByText("Fixados"),
        ).toBeTruthy();
        expect(
          view.getByText("Promessa"),
        ).toBeTruthy();
        expect(
          view.getByText("#Fé"),
        ).toBeTruthy();
        expect(
          view.getAllByText(
            "Registro fixado.",
          ),
        ).toHaveLength(1);
        expect(
          view.getByText("Hoje"),
        ).toBeTruthy();
        expect(
          view.getByText("Registro comum."),
        ).toBeTruthy();
      });
    });

    it("keeps drafts in timeline and never treats them as pinned", async () => {
      mockJournalList.mockResolvedValue([
        entry({
          id: "draft" as never,
          status: "DRAFT",
          isPinned: false,
          reflectionText: null,
          gratitudeText: null,
        }),
      ]);

      const view = renderJournal();
      await runFocusEffect();

      await waitFor(() => {
        expect(
          view.getByText("Rascunho"),
        ).toBeTruthy();
        expect(
          view.getByText(
            "Continue escrevendo seu registro.",
          ),
        ).toBeTruthy();
        expect(
          view.queryByText("Fixados"),
        ).toBeNull();
      });
    });

    it("opens the trash view from the journal and loads only listTrash", async () => {
      mockJournalList.mockResolvedValue([]);
      mockJournalListTrash.mockResolvedValue([
        entry({
          id: "trashed" as never,
          status: "TRASHED",
          reflectionText:
            "Registro removido.",
        }),
      ]);

      const view = renderJournal();
      await runFocusEffect();

      fireEvent.press(
        view.getByLabelText(
          "Abrir lixeira do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockJournalListTrash,
        ).toHaveBeenCalledTimes(1);
        expect(
          view.getByText("Lixeira"),
        ).toBeTruthy();
        expect(
          view.getByText("Na lixeira"),
        ).toBeTruthy();
        expect(
          view.getByText(
            "Registro removido.",
          ),
        ).toBeTruthy();
      });
    });

    it("opens a trashed entry in detail so it can be restored", async () => {
      const trashed = entry({
        id: "trashed" as never,
        status: "TRASHED",
      });

      mockJournalList.mockResolvedValue([]);
      mockJournalListTrash.mockResolvedValue([
        trashed,
      ]);

      const view = renderJournal();
      await runFocusEffect();

      fireEvent.press(
        view.getByLabelText(
          "Abrir lixeira do diário",
        ),
      );

      await waitFor(() => {
        expect(
          view.getByLabelText(
            "Abrir registro na lixeira de 10 de setembro de 2026",
          ),
        ).toBeTruthy();
      });

      fireEvent.press(
        view.getByLabelText(
          "Abrir registro na lixeira de 10 de setembro de 2026",
        ),
      );

      expect(
        view.navigate,
      ).toHaveBeenCalledWith(
        "JournalEntryDetail",
        {
          entryId: trashed.id,
        },
      );
    });

    it("returns from trash to the normal journal and reloads list", async () => {
      mockJournalList.mockResolvedValue([]);
      mockJournalListTrash.mockResolvedValue([]);

      const view = renderJournal();
      await runFocusEffect();

      fireEvent.press(
        view.getByLabelText(
          "Abrir lixeira do diário",
        ),
      );

      await waitFor(() => {
        expect(
          view.getByText(
            "Sua lixeira está vazia",
          ),
        ).toBeTruthy();
      });

      fireEvent.press(
        view.getByLabelText(
          "Voltar para o diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockJournalList,
        ).toHaveBeenCalledTimes(2);
        expect(
          view.getByText("Meu Diário"),
        ).toBeTruthy();
      });
    });

    it("groups repository-ordered non-pinned entries without sorting", async () => {
      mockJournalList.mockResolvedValue([
        entry({
          id: "today" as never,
          entryDate: "2026-09-10" as never,
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
        expect(view.getByText("Hoje")).toBeTruthy();
        expect(view.getByText("Ontem")).toBeTruthy();
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

    it("opens active entries in detail and drafts in editor", async () => {
      const active = entry({
        id: "active-entry" as never,
      });
      const draft = entry({
        id: "draft-entry" as never,
        status: "DRAFT",
        reflectionText: null,
        gratitudeText: null,
      });

      mockJournalList.mockResolvedValue([
        active,
        draft,
      ]);

      const view = renderJournal();
      await runFocusEffect();

      await waitFor(() => {
        expect(
          view.getByLabelText(
            "Abrir registro do diário de 10 de setembro de 2026",
          ),
        ).toBeTruthy();
        expect(
          view.getByLabelText(
            "Continuar rascunho do diário de 10 de setembro de 2026",
          ),
        ).toBeTruthy();
      });

      fireEvent.press(
        view.getByLabelText(
          "Abrir registro do diário de 10 de setembro de 2026",
        ),
      );
      fireEvent.press(
        view.getByLabelText(
          "Continuar rascunho do diário de 10 de setembro de 2026",
        ),
      );

      expect(
        view.navigate,
      ).toHaveBeenCalledWith(
        "JournalEntryDetail",
        {
          entryId: active.id,
        },
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

    it("retries a trash load error inside the same view", async () => {
      mockJournalList.mockResolvedValue([]);
      mockJournalListTrash
        .mockRejectedValueOnce(
          new Error("temporary"),
        )
        .mockResolvedValueOnce([]);

      const view = renderJournal();
      await runFocusEffect();

      fireEvent.press(
        view.getByLabelText(
          "Abrir lixeira do diário",
        ),
      );

      await waitFor(() => {
        expect(
          view.getByText(
            "Não foi possível carregar a lixeira agora.",
          ),
        ).toBeTruthy();
      });

      fireEvent.press(
        view.getByLabelText(
          "Tentar carregar a lixeira novamente",
        ),
      );

      await waitFor(() => {
        expect(
          mockJournalListTrash,
        ).toHaveBeenCalledTimes(2);
        expect(
          view.getByText(
            "Sua lixeira está vazia",
          ),
        ).toBeTruthy();
      });
    });

    it("starts creation from the normal journal primary action", () => {
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

    it("uses only the Hub journal service and keeps search telemetry and direct persistence out", () => {
      const source = fs.readFileSync(
        "src/screens/JournalScreen.tsx",
        "utf8",
      );

      expect(source).toContain(
        "getPersonalPlatformHub().journalService",
      );
      expect(source).toContain(
        "journalService.listTrash()",
      );
      expect(source).not.toMatch(
        /SQLiteJournalRepository|expo-sqlite|AsyncStorage/i,
      );
      expect(source).not.toMatch(
        /analytics|telemetry/i,
      );
      expect(source).not.toMatch(
        /\bsearch(Query)?\b|pagination|pageSize/i,
      );
      expect(source).not.toContain(".sort(");
      expect(source).not.toMatch(
        /#[0-9A-Fa-f]{3,8}/,
      );
    });
  },
);
