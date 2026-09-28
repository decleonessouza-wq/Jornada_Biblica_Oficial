import { readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const read = (relativePath: string): string =>
  readFileSync(join(root, relativePath), "utf8");

const typesSource = read("src/navigation/types.ts");
const navigatorSource = read("src/navigation/StudiesNavigator.tsx");
const detailSource = read("src/screens/StudyDetailScreen.tsx");
const favoritesSource = read("src/screens/FavoritesScreen.tsx");

describe("Studies navigation foundation", () => {
  it("defines exactly the three internal Studies routes with controlled return metadata", () => {
    expect(typesSource).toContain("export type StudiesStackParamList = {");
    expect(typesSource).toContain("StudiesHome: undefined;");
    expect(typesSource).toContain(
      "StudyTrack: Readonly<{ trackId: string }>;",
    );
    expect(typesSource).toContain(
      "StudyDetail: Readonly<{",
    );
    expect(typesSource).toContain(
      "studyId: string;",
    );
    expect(typesSource).toContain(
      "returnToFavorites?: boolean;",
    );

    expect(typesSource).not.toMatch(
      /StudyTrack:\s*Readonly<\{[^}]*\btrack\s*:/s,
    );
    expect(typesSource).not.toMatch(
      /StudyDetail:\s*Readonly<\{[^}]*\bstudy\s*:/s,
    );
  });

  it("keeps Studies tab-owned while keeping it out of Drawer and Root", () => {
    expect(typesSource).toContain("export type StudiesStackScreenProps<");
    expect(typesSource).toContain(
      "NativeStackScreenProps<StudiesStackParamList, RouteName>",
    );

    const drawerBlock = typesSource.match(
      /export type AppDrawerParamList = \{[\s\S]*?\n\};/,
    )?.[0];
    const tabBlock = typesSource.match(
      /export type MainTabParamList = \{[\s\S]*?\n\};/,
    )?.[0];
    const rootBlock = typesSource.match(
      /export type RootStackParamList = \{[\s\S]*?\n\};/,
    )?.[0];

    expect(drawerBlock).toBeDefined();
    expect(tabBlock).toBeDefined();
    expect(rootBlock).toBeDefined();

    expect(drawerBlock).not.toMatch(/\bStudies\s*:/);
    expect(tabBlock).toContain(
      "StudiesTab: NavigatorScreenParams<StudiesStackParamList> | undefined;",
    );
    expect(rootBlock).not.toContain("Studies");
  });

  it("registers exactly the three Studies screens and their exact components", () => {
    expect(navigatorSource).toContain(
      'import StudiesScreen from "../screens/StudiesScreen";',
    );
    expect(navigatorSource).toContain(
      'import StudyTrackScreen from "../screens/StudyTrackScreen";',
    );
    expect(navigatorSource).toContain(
      'import StudyDetailScreen from "../screens/StudyDetailScreen";',
    );
    expect(navigatorSource).toContain(
      "createNativeStackNavigator<StudiesStackParamList>()",
    );
    expect(navigatorSource).toMatch(
      /<StudiesStack\.Navigator[\s\S]*?initialRouteName="StudiesHome"/,
    );

    const registrations =
      navigatorSource.match(/<StudiesStack\.Screen\b/g) ?? [];
    expect(registrations).toHaveLength(3);

    expect(navigatorSource).toMatch(
      /component=\{StudiesScreen\}[\s\S]*?name="StudiesHome"/,
    );
    expect(navigatorSource).toMatch(
      /component=\{StudyTrackScreen\}[\s\S]*?name="StudyTrack"/,
    );
    expect(navigatorSource).toMatch(
      /name="StudyDetail"[\s\S]*?<StudyDetailScreen[\s\S]*?onOpenBibleReference=\{[\s\S]*?handleOpenBibleReference/,
    );
    expect(navigatorSource).toContain('title: "Biblioteca de Estudos"');
  });

  it("wires explicit Study Favorites entry and return without moving Studies into Drawer", () => {
    expect(navigatorSource).toContain(
      'navigation.navigate("Favorites")',
    );
    expect(navigatorSource).toContain(
      "onRequestFavorites={",
    );
    expect(detailSource).toContain(
      "route.params.returnToFavorites",
    );
    expect(detailSource).toContain(
      'testID="study-favorite-button"',
    );
    expect(detailSource).toContain(
      "resolveStudyKeepFavoriteReferences",
    );
    expect(detailSource).toContain(
      'kind: "bible_reference"',
    );
    expect(detailSource).toContain(
      'kind: "study"',
    );
    expect(detailSource).toContain(
      "favoritesService.add(target, {",
    );
    expect(favoritesSource).toContain(
      'screen: "StudiesTab"',
    );
    expect(favoritesSource).toContain(
      'screen: "StudyDetail"',
    );
    expect(favoritesSource).toContain(
      "returnToFavorites: true",
    );
    expect(favoritesSource).toContain(
      "loadPreferredOfflineBibleVersion",
    );
    expect(favoritesSource).toContain(
      "getJourneyBibleReaderRouteForReference",
    );
  });

  it("keeps the Studies stack isolated from shell ownership and editorial source", () => {
    expect(navigatorSource).not.toContain("../studies/content/");
    expect(navigatorSource).not.toContain("AppDrawer");
    expect(navigatorSource).not.toContain("MainTabs");
    expect(navigatorSource).not.toContain("RootNavigator");
    expect(navigatorSource).not.toContain("HomeScreen");
    expect(navigatorSource).not.toContain("QuickActionSheet");
    expect(navigatorSource).not.toContain("track-05-study-01");
    expect(navigatorSource).not.toMatch(/name="Studies[^H]/);
  });
});
