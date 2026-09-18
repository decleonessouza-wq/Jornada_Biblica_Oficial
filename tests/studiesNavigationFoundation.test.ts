import { readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const typesPath = join(root, "src", "navigation", "types.ts");
const navigatorPath = join(
  root,
  "src",
  "navigation",
  "StudiesNavigator.tsx",
);

const read = (path: string): string => readFileSync(path, "utf8");

describe("Studies navigation foundation", () => {
  const typesSource = read(typesPath);
  const navigatorSource = read(navigatorPath);

  it("defines exactly the three internal Studies routes with identity-only params", () => {
    expect(typesSource).toContain("export type StudiesStackParamList = {");
    expect(typesSource).toContain("StudiesHome: undefined;");
    expect(typesSource).toContain(
      "StudyTrack: Readonly<{ trackId: string }>;",
    );
    expect(typesSource).toContain(
      "StudyDetail: Readonly<{ studyId: string }>;",
    );

    expect(typesSource).not.toMatch(
      /StudyTrack:\s*Readonly<\{[^}]*\btrack\s*:/s,
    );
    expect(typesSource).not.toMatch(
      /StudyDetail:\s*Readonly<\{[^}]*\bstudy\s*:/s,
    );
  });

  it("keeps Studies drawer-owned while keeping it out of Tabs and Root and preserving typed screen props", () => {
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
    expect(drawerBlock).toContain(
      "Studies: NavigatorScreenParams<StudiesStackParamList> | undefined;",
    );
    expect(tabBlock).not.toContain("Studies");
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
      'createNativeStackNavigator<StudiesStackParamList>()',
    );
    expect(navigatorSource).toContain(
      '<StudiesStack.Navigator initialRouteName="StudiesHome">',
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
      /component=\{StudyDetailScreen\}[\s\S]*?name="StudyDetail"/,
    );
  });

  it("does not add a fourth route, external wiring, or editorial-content bypass", () => {
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
