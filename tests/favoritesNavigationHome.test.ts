export {};

const fs = jest.requireActual<{
  readFileSync: (
    path: string,
    encoding: "utf8",
  ) => string;
}>("fs");

function readSource(relativePath: string): string {
  return fs.readFileSync(
    relativePath,
    "utf8",
  );
}

const typesSource = readSource(
  "src/navigation/types.ts",
);
const drawerSource = readSource(
  "src/navigation/AppDrawerNavigator.tsx",
);
const mainTabsSource = readSource(
  "src/navigation/MainTabsNavigator.tsx",
);
const homeSource = readSource(
  "src/screens/HomeScreen.tsx",
);
const hymnalNavigatorSource = readSource(
  "src/navigation/HymnalNavigator.tsx",
);
const hymnalReaderSource = readSource(
  "src/hymnal/screens/HymnalReaderScreen.tsx",
);

describe("Favorites navigation and Home contract", () => {
  it("exposes Favorites as an undefined Drawer route", () => {
    expect(typesSource).toContain(
      "Favorites: undefined;",
    );
  });

  it("registers FavoritesScreen in the Drawer with title and label", () => {
    expect(drawerSource).toContain(
      'import FavoritesScreen from "../screens/FavoritesScreen";',
    );
    expect(drawerSource).toContain(
      'name="Favorites"',
    );
    expect(drawerSource).toContain(
      "component={FavoritesScreen}",
    );
    expect(drawerSource).toContain(
      'title: "Favoritos"',
    );
    expect(drawerSource).toContain(
      'drawerLabel: "Favoritos"',
    );
  });

  it("routes the existing Home Favoritos card to the Drawer route", () => {
    const cardStart = homeSource.indexOf(
      'iconSource={require("../../assets/home/icons/favoritos_icone.png")}',
    );

    expect(cardStart).toBeGreaterThanOrEqual(0);

    const cardEnd = homeSource.indexOf(
      "/>",
      cardStart,
    );

    expect(cardEnd).toBeGreaterThan(cardStart);

    const cardBlock = homeSource.slice(
      cardStart,
      cardEnd + 2,
    );

    expect(cardBlock).toContain(
      'title="Favoritos"',
    );
    expect(cardBlock).toContain(
      'onPress={() => navigation.navigate("Favorites")}',
    );
  });

  it("does not leave the Home Favoritos card disabled", () => {
    const cardStart = homeSource.indexOf(
      'iconSource={require("../../assets/home/icons/favoritos_icone.png")}',
    );
    const cardEnd = homeSource.indexOf(
      "/>",
      cardStart,
    );
    const cardBlock = homeSource.slice(
      cardStart,
      cardEnd + 2,
    );

    expect(cardBlock).not.toMatch(
      /\bdisabled\b/,
    );
  });

  it("reports five active quick-access resources", () => {
    expect(homeSource).toContain(
      ">5 recursos ativos<",
    );
  });

  it("routes the existing Home Meu Diário card to the Journal Drawer route", () => {
    const cardStart = homeSource.indexOf(
      'iconSource={require("../../assets/home/icons/diario_icone.png")}',
    );

    expect(cardStart).toBeGreaterThanOrEqual(0);

    const cardEnd = homeSource.indexOf(
      "/>",
      cardStart,
    );

    expect(cardEnd).toBeGreaterThan(cardStart);

    const cardBlock = homeSource.slice(
      cardStart,
      cardEnd + 2,
    );

    expect(cardBlock).toContain(
      'title="Meu Diário"',
    );
    expect(cardBlock).toContain(
      'subtitle="Anote e reflita"',
    );
    expect(cardBlock).toContain(
      'onPress={() => navigation.navigate("Journal")}',
    );
  });

  it("does not leave the Home Meu Diário card disabled", () => {
    const cardStart = homeSource.indexOf(
      'iconSource={require("../../assets/home/icons/diario_icone.png")}',
    );
    const cardEnd = homeSource.indexOf(
      "/>",
      cardStart,
    );
    const cardBlock = homeSource.slice(
      cardStart,
      cardEnd + 2,
    );

    expect(cardBlock).not.toMatch(
      /\bdisabled\b/,
    );
  });

  it("does not create a Journal bottom tab", () => {
    expect(mainTabsSource).not.toContain(
      'name="Journal"',
    );
    expect(mainTabsSource).not.toContain(
      "JournalNavigator",
    );
    expect(mainTabsSource).not.toContain(
      "JournalScreen",
    );
  });
  it("does not create a Favorites bottom tab", () => {
    expect(mainTabsSource).not.toContain(
      'name="Favorites"',
    );
    expect(mainTabsSource).not.toContain(
      "FavoritesScreen",
    );
  });

  it("declares the Favorites origin on the Hymnal reader route", () => {
    const routeStart = typesSource.indexOf(
      "HymnalReader: {",
    );
    const routeEnd = typesSource.indexOf(
      "  };",
      routeStart,
    );

    expect(routeStart).toBeGreaterThanOrEqual(0);
    expect(routeEnd).toBeGreaterThan(routeStart);

    const routeBlock = typesSource.slice(
      routeStart,
      routeEnd,
    );

    expect(routeBlock).toContain(
      "returnToFavorites?: boolean;",
    );
  });

  it("routes the Hymnal reader back to Favorites when opened from Favorites", () => {
    expect(hymnalNavigatorSource).toContain(
      'navigation.navigate("Favorites")',
    );
    expect(hymnalNavigatorSource).toContain(
      "onRequestFavorites={",
    );
    expect(hymnalReaderSource).toContain(
      "returnToFavorites &&",
    );
    expect(hymnalReaderSource).toContain(
      "onRequestFavorites",
    );
    expect(hymnalReaderSource).toContain(
      '"Voltar para Favoritos"',
    );
  });
});
