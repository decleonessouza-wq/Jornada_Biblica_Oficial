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
  JournalEntryId,
} from "../src/domain/journal/journal";
import type {
  JournalEntryPersistenceRecord,
} from "../src/data/personal/journal/journalRepository";
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
const mockSetPinned = jest.fn();
const mockMoveToTrash = jest.fn();
const mockRestoreFromTrash = jest.fn();

const entryId =
  "journal-entry-detail" as JournalEntryId;

const bibleReference = {
  passages: [
    {
      kind: "VERSE",
      bookId: "JHN",
      chapter: 3,
      verse: 16,
    },
  ],
} as const;

const completeEntry = {
  id: entryId,
  entryDate: "2026-09-09",
  reflectionText:
    "Hoje compreendi algo importante.",
  gratitudeText:
    "Sou grato pelo cuidado de Deus.",
  status: "ACTIVE",
  sourceType: "FREE",
  sourceTitleSnapshot: null,
  promptSnapshot: null,
  category: "PROMISE",
  isPinned: false,
  references: [],
  tags: [
    {
      id: "journal-tag-faith" as never,
      name: "Fé",
      normalizedName: "fe",
    },
  ],
  createdAtUtc: "2026-09-09T13:00:00.000Z",
  updatedAtUtc: "2026-09-09T14:00:00.000Z",
} as unknown as JournalEntryPersistenceRecord;

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    journalService: {
      findById: mockFindById,
      setPinned: mockSetPinned,
      moveToTrash: mockMoveToTrash,
      restoreFromTrash: mockRestoreFromTrash,
    },
  } as unknown as ReturnType<
    typeof getPersonalPlatformHub
  >);
}

function renderDetail() {
  const navigate = jest.fn();
  const goBack = jest.fn();
  const openBibleReference = jest.fn();

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
      onOpenBibleReference={
        openBibleReference
      }
    />,
  );

  return {
    ...view,
    navigate,
    goBack,
    openBibleReference,
  };
}

async function renderLoadedDetail(
  entry: JournalEntryPersistenceRecord =
    completeEntry,
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
      "TEST_EXPECTED_TRASH_CONFIRMATION_ALERT",
    );
  }

  const buttons = alertCall[2];

  if (!buttons) {
    throw new Error(
      "TEST_EXPECTED_TRASH_CONFIRMATION_BUTTONS",
    );
  }

  return buttons;
}

describe(
  "JournalEntryDetailScreen P16-P3 organization",
  () => {
    beforeEach(() => {
      mockFindById.mockReset();
      mockSetPinned.mockReset();
      mockMoveToTrash.mockReset();
      mockRestoreFromTrash.mockReset();
      mockedGetPersonalPlatformHub.mockReset();

      mockSetPinned.mockResolvedValue({
        ...completeEntry,
        isPinned: true,
      });
      mockMoveToTrash.mockResolvedValue({
        ...completeEntry,
        status: "TRASHED",
        isPinned: false,
      });
      mockRestoreFromTrash.mockResolvedValue({
        ...completeEntry,
        status: "ACTIVE",
        isPinned: false,
      });

      configureHub();

      jest.spyOn(
        Alert,
        "alert",
      ).mockImplementation(
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

    it("loads the persistence record and renders category tags and contents", async () => {
      const view = await renderLoadedDetail();

      expect(mockFindById).toHaveBeenCalledTimes(1);
      expect(
        view.getByText("Promessa"),
      ).toBeTruthy();
      expect(
        view.getByText("#Fé"),
      ).toBeTruthy();
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

    it("keeps the Bible reference section hidden for entries without references", async () => {
      const view = await renderLoadedDetail();

      expect(
        view.queryByText("Referências bíblicas"),
      ).toBeNull();
      expect(
        view.openBibleReference,
      ).not.toHaveBeenCalled();
    });

    it("renders a canonical Bible reference and opens the exact structured reference", async () => {
      const view = await renderLoadedDetail({
        ...completeEntry,
        sourceType: "BIBLE",
        references: [
          {
            id: "journal-reference-detail" as never,
            entryId,
            position: 0,
            reference: bibleReference,
          },
        ],
      });

      expect(
        view.getByText("Referências bíblicas"),
      ).toBeTruthy();
      expect(
        view.getByText("João 3:16"),
      ).toBeTruthy();

      fireEvent.press(
        view.getByLabelText(
          "Abrir João 3:16 na Bíblia",
        ),
      );

      expect(
        view.openBibleReference,
      ).toHaveBeenCalledTimes(1);
      expect(
        view.openBibleReference,
      ).toHaveBeenCalledWith(
        bibleReference,
      );
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

    it("navigates to the editor with the exact active entryId", async () => {
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

    it("pins an active entry and refreshes the local detail state", async () => {
      const view = await renderLoadedDetail();

      fireEvent.press(
        view.getByLabelText(
          "Fixar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockSetPinned,
        ).toHaveBeenCalledWith(
          entryId,
          true,
        );
        expect(
          view.getByLabelText(
            "Desafixar registro do diário",
          ),
        ).toBeTruthy();
        expect(
          view.getByText("Fixado"),
        ).toBeTruthy();
      });
    });

    it("unpins an already pinned entry", async () => {
      mockSetPinned.mockResolvedValue({
        ...completeEntry,
        isPinned: false,
      });

      const view = await renderLoadedDetail({
        ...completeEntry,
        isPinned: true,
      });

      fireEvent.press(
        view.getByLabelText(
          "Desafixar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockSetPinned,
        ).toHaveBeenCalledWith(
          entryId,
          false,
        );
      });
    });

    it("asks for confirmation before moving an active entry to trash", async () => {
      const view = await renderLoadedDetail();

      fireEvent.press(
        view.getByLabelText(
          "Mover registro do diário para a lixeira",
        ),
      );

      expect(Alert.alert).toHaveBeenCalledWith(
        "Mover para a lixeira?",
        "Você poderá restaurar este registro depois.",
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
            text: "Mover",
            style: "destructive",
          }),
        ]),
      );

      expect(
        mockMoveToTrash,
      ).not.toHaveBeenCalled();
    });

    it("moves the exact active entry to trash and returns", async () => {
      const view = await renderLoadedDetail();

      fireEvent.press(
        view.getByLabelText(
          "Mover registro do diário para a lixeira",
        ),
      );

      const moveButton =
        getAlertButtons().find(
          (button) => button.text === "Mover",
        );

      await act(async () => {
        moveButton?.onPress?.();
        await Promise.resolve();
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(
          mockMoveToTrash,
        ).toHaveBeenCalledTimes(1);
        expect(
          mockMoveToTrash,
        ).toHaveBeenCalledWith(entryId);
        expect(
          view.goBack,
        ).toHaveBeenCalledTimes(1);
      });
    });

    it("renders a trashed entry with restore as its only mutation action", async () => {
      const view = await renderLoadedDetail({
        ...completeEntry,
        status: "TRASHED",
        isPinned: false,
      });

      expect(
        view.getByText("Na lixeira"),
      ).toBeTruthy();
      expect(
        view.getByLabelText(
          "Restaurar registro do diário",
        ),
      ).toBeTruthy();
      expect(
        view.queryByLabelText(
          "Editar registro do diário",
        ),
      ).toBeNull();
      expect(
        view.queryByLabelText(
          "Fixar registro do diário",
        ),
      ).toBeNull();
      expect(
        view.queryByLabelText(
          "Mover registro do diário para a lixeira",
        ),
      ).toBeNull();
    });

    it("restores the exact trashed entry and returns", async () => {
      const view = await renderLoadedDetail({
        ...completeEntry,
        status: "TRASHED",
        isPinned: false,
      });

      fireEvent.press(
        view.getByLabelText(
          "Restaurar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          mockRestoreFromTrash,
        ).toHaveBeenCalledWith(entryId);
        expect(
          view.goBack,
        ).toHaveBeenCalledTimes(1);
      });
    });

    it("keeps the active detail usable after a pin failure", async () => {
      mockSetPinned.mockRejectedValue(
        new Error("temporary"),
      );

      const view = await renderLoadedDetail();

      fireEvent.press(
        view.getByLabelText(
          "Fixar registro do diário",
        ),
      );

      await waitFor(() => {
        expect(
          view.getByText(
            "Não foi possível alterar o destaque deste registro agora. Tente novamente.",
          ),
        ).toBeTruthy();
      });

      expect(
        view.getByLabelText(
          "Editar registro do diário",
        ),
      ).toBeTruthy();
    });

    it("keeps the detail usable after a trash failure", async () => {
      mockMoveToTrash.mockRejectedValue(
        new Error("temporary"),
      );

      const view = await renderLoadedDetail();

      fireEvent.press(
        view.getByLabelText(
          "Mover registro do diário para a lixeira",
        ),
      );

      const moveButton =
        getAlertButtons().find(
          (button) => button.text === "Mover",
        );

      await act(async () => {
        moveButton?.onPress?.();
        await Promise.resolve();
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(
          view.getByText(
            "Não foi possível mover este registro para a lixeira agora. Tente novamente.",
          ),
        ).toBeTruthy();
      });

      expect(
        view.goBack,
      ).not.toHaveBeenCalled();
    });

    it("shows load error and retries the same entry", async () => {
      mockFindById
        .mockRejectedValueOnce(
          new Error("temporary"),
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
        expect(
          mockFindById,
        ).toHaveBeenCalledTimes(2);
        expect(
          view.getByText(
            "09 de setembro de 2026",
          ),
        ).toBeTruthy();
      });
    });

    it("keeps direct persistence hard delete telemetry and timestamps out", () => {
      const source = fs.readFileSync(
        "src/screens/JournalEntryDetailScreen.tsx",
        "utf8",
      );

      expect(source).toContain(
        "getPersonalPlatformHub().journalService",
      );
      expect(source).toContain(
        ".moveToTrash(",
      );
      expect(source).toContain(
        ".restoreFromTrash(",
      );
      expect(source).toContain(
        ".setPinned(",
      );
      expect(source).not.toMatch(
        /SQLiteJournalRepository|expo-sqlite|AsyncStorage/i,
      );
      expect(source).not.toMatch(
        /journalService\.remove\(|analytics|telemetry/i,
      );
      expect(source).not.toMatch(
        /createdAtUtc|updatedAtUtc/,
      );
      expect(source).not.toMatch(
        /#[0-9A-Fa-f]{3,8}/,
      );
    });
  },
);
