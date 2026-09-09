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
  Favorite,
} from "../src/domain/favorites/favorite";
import {
  getPersonalPlatformHub,
} from "../src/services/personalPlatformHub";
import FavoritesScreen from "../src/screens/FavoritesScreen";

jest.mock("@react-navigation/native", () => ({
  useFocusEffect: jest.fn(),
}));

jest.mock(
  "../src/services/personalPlatformHub",
  () => ({
    getPersonalPlatformHub: jest.fn(),
  }),
);

const mockedUseFocusEffect =
  useFocusEffect as jest.MockedFunction<
    typeof useFocusEffect
  >;

const mockedGetPersonalPlatformHub =
  getPersonalPlatformHub as jest.MockedFunction<
    typeof getPersonalPlatformHub
  >;

const mockFavoritesList = jest.fn();

const bibleFavorite = {
  id: "favorite-bible",
  target: {
    kind: "bible_verse",
    versionId: "BLIVRE",
    bookId: "JHN",
    chapter: 3,
    verse: 16,
  },
  createdAtUtc: "2026-09-09T13:00:00.000Z",
} as unknown as Favorite;

const hymnFavorite = {
  id: "favorite-hymn",
  target: {
    kind: "hymn",
    editionId: "harpa-crista-jornada-v1",
    hymnId: "harpa-crista-jornada-v1:15",
  },
  createdAtUtc: "2026-09-09T12:00:00.000Z",
} as unknown as Favorite;

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    favoritesService: {
      list: mockFavoritesList,
    },
  } as unknown as ReturnType<
    typeof getPersonalPlatformHub
  >);
}

function renderFavorites() {
  const navigate = jest.fn();

  const view = render(
    <FavoritesScreen
      navigation={{ navigate } as never}
      route={{
        key: "favorites-test",
        name: "Favorites",
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
      "TEST_EXPECTED_FAVORITES_FOCUS_CALLBACK",
    );
  }

  await act(async () => {
    callback();
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe("FavoritesScreen", () => {
  beforeEach(() => {
    mockFavoritesList.mockReset();
    mockedUseFocusEffect.mockReset();
    mockedGetPersonalPlatformHub.mockReset();
    configureHub();
  });

  afterEach(() => {
    cleanup();
  });

  it(
    "loads favorites when the screen receives focus",
    async () => {
      mockFavoritesList.mockResolvedValue([]);

      const view = renderFavorites();

      expect(mockFavoritesList).not.toHaveBeenCalled();

      await runFocusEffect();

      await waitFor(() => {
        expect(mockFavoritesList).toHaveBeenCalledTimes(1);
        expect(
          view.getByText("Nada por aqui ainda"),
        ).toBeTruthy();
      });
    },
    15000,
  );

  it("renders a graceful empty state for Todos", async () => {
    mockFavoritesList.mockResolvedValue([]);

    const view = renderFavorites();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText(
          "Seus textos e hinos favoritos aparecerão aqui.",
        ),
      ).toBeTruthy();
    });
  });

  it("renders a non-fatal error and retries successfully", async () => {
    mockFavoritesList
      .mockRejectedValueOnce(
        new Error("temporary failure"),
      )
      .mockResolvedValueOnce([]);

    const view = renderFavorites();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText(
          "Não foi possível carregar seus favoritos agora.",
        ),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(
        "Tentar carregar favoritos novamente",
      ),
    );

    await waitFor(() => {
      expect(mockFavoritesList).toHaveBeenCalledTimes(2);
      expect(
        view.getByText("Nada por aqui ainda"),
      ).toBeTruthy();
    });
  });

  it("Todos shows both Bible and Harpa favorites", async () => {
    mockFavoritesList.mockResolvedValue([
      bibleFavorite,
      hymnFavorite,
    ]);

    const view = renderFavorites();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByText("JHN 3:16"),
      ).toBeTruthy();
      expect(
        view.getByText(
          "Hino harpa-crista-jornada-v1:15",
        ),
      ).toBeTruthy();
    });
  });

  it("Bíblia filter shows only Bible verse favorites", async () => {
    mockFavoritesList.mockResolvedValue([
      bibleFavorite,
      hymnFavorite,
    ]);

    const view = renderFavorites();
    await runFocusEffect();

    await waitFor(() => {
      expect(view.getByText("JHN 3:16")).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(
        "Filtrar favoritos por Bíblia",
      ),
    );

    expect(
      view.getByText("JHN 3:16"),
    ).toBeTruthy();
    expect(
      view.queryByText(
        "Hino harpa-crista-jornada-v1:15",
      ),
    ).toBeNull();
  });

  it("Harpa filter shows only hymn favorites", async () => {
    mockFavoritesList.mockResolvedValue([
      bibleFavorite,
      hymnFavorite,
    ]);

    const view = renderFavorites();
    await runFocusEffect();

    await waitFor(() => {
      expect(view.getByText("JHN 3:16")).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(
        "Filtrar favoritos por Harpa",
      ),
    );

    expect(
      view.queryByText("JHN 3:16"),
    ).toBeNull();
    expect(
      view.getByText(
        "Hino harpa-crista-jornada-v1:15",
      ),
    ).toBeTruthy();
  });

  it("opens a Bible favorite through the existing nested reader route", async () => {
    mockFavoritesList.mockResolvedValue([
      bibleFavorite,
    ]);

    const view = renderFavorites();
    await runFocusEffect();

    await waitFor(() => {
      expect(
        view.getByLabelText(
          "Abrir favorito bíblico JHN 3:16",
        ),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(
        "Abrir favorito bíblico JHN 3:16",
      ),
    );

    expect(view.navigate).toHaveBeenCalledWith(
      "MainTabs",
      {
        screen: "BibleTab",
        params: {
          screen: "BibleReader",
          params: {
            versionId: "BLIVRE",
            bookId: "JHN",
            chapter: 3,
            verse: 16,
          },
        },
      },
    );
  });

  it("opens a hymn favorite through the existing nested reader route", async () => {
    mockFavoritesList.mockResolvedValue([
      hymnFavorite,
    ]);

    const view = renderFavorites();
    await runFocusEffect();

    const label =
      "Abrir Hino harpa-crista-jornada-v1:15";

    await waitFor(() => {
      expect(
        view.getByLabelText(label),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByLabelText(label),
    );

    expect(view.navigate).toHaveBeenCalledWith(
      "MainTabs",
      {
        screen: "HymnalTab",
        params: {
          screen: "HymnalReader",
          params: {
            editionId:
              "harpa-crista-jornada-v1",
            hymnId:
              "harpa-crista-jornada-v1:15",
          },
        },
      },
    );
  });

  it("renders the hero and accessible filter controls", () => {
    mockFavoritesList.mockResolvedValue([]);

    const view = renderFavorites();

    expect(
      view.getByTestId(
        "favorites-library-hero",
      ),
    ).toBeTruthy();
    expect(
      view.getByLabelText(
        "Filtrar favoritos por Todos",
      ),
    ).toBeTruthy();
    expect(
      view.getByLabelText(
        "Filtrar favoritos por Bíblia",
      ),
    ).toBeTruthy();
    expect(
      view.getByLabelText(
        "Filtrar favoritos por Harpa",
      ),
    ).toBeTruthy();
  });

  it("does not expose add, remove, or toggle actions from the library", async () => {
    mockFavoritesList.mockResolvedValue([
      bibleFavorite,
      hymnFavorite,
    ]);

    const view = renderFavorites();
    await runFocusEffect();

    await waitFor(() => {
      expect(view.getByText("JHN 3:16")).toBeTruthy();
    });

    expect(
      view.queryByLabelText(
        /Adicionar|Remover/i,
      ),
    ).toBeNull();
  });
});
