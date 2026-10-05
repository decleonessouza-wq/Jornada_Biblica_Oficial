import { readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const read = (relativePath: string): string =>
  readFileSync(join(root, relativePath), "utf8");

const typesSource = read("src/navigation/types.ts");
const drawerSource = read("src/navigation/AppDrawerNavigator.tsx");
const quickSource = read("src/navigation/QuickActionSheet.tsx");
const continuationServiceSource = read(
  "src/services/studies/studyContinuationService.ts",
);
const homeSource = read("src/screens/HomeScreen.tsx");
const studiesNavigatorSource = read("src/navigation/StudiesNavigator.tsx");
const mainTabsSource = read("src/navigation/MainTabsNavigator.tsx");
const customTabSource = read("src/navigation/CustomTabBar.tsx");
const rootSource = read("src/navigation/RootNavigator.tsx");
const factoriesSource = read("src/navigation/navigationFactories.ts");
const policySource = read("src/navigation/navigationSurfacePolicy.ts");
const drawerContentSource = read("src/navigation/AppDrawerContent.tsx");

function blockAround(
  source: string,
  needle: string,
  startToken: string,
): string {
  const needleIndex = source.indexOf(needle);
  expect(needleIndex).toBeGreaterThanOrEqual(0);
  const start = source.lastIndexOf(startToken, needleIndex);
  const end = source.indexOf("/>", needleIndex);
  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(needleIndex);
  return source.slice(start, end + 2);
}

describe("Studies public wiring", () => {
  it("owns Studies in MainTabs without reintroducing a Drawer or Root route", () => {
    expect(
      typesSource.match(
        /StudiesTab:\s*NavigatorScreenParams<StudiesStackParamList>\s*\|\s*undefined;/g,
      ) ?? [],
    ).toHaveLength(1);

    const drawerBlock = typesSource.match(
      /export type AppDrawerParamList = \{[\s\S]*?\n\};/,
    )?.[0];
    const rootBlock = typesSource.match(
      /export type RootStackParamList = \{[\s\S]*?\n\};/,
    )?.[0];

    expect(drawerBlock).toBeDefined();
    expect(rootBlock).toBeDefined();
    expect(drawerBlock).not.toMatch(/\bStudies\s*:/);
    expect(rootBlock).not.toContain("Studies");
    expect(typesSource).not.toMatch(/\bProfile\s*:/);

    expect(studiesNavigatorSource).toContain("StudiesHome");
    expect(studiesNavigatorSource).toContain("StudyTrack");
    expect(studiesNavigatorSource).toContain("StudyDetail");
  });

  it("registers Studies exactly once as an internal MainTabs screen", () => {
    expect(
      mainTabsSource.match(/name="StudiesTab"/g) ?? [],
    ).toHaveLength(1);
    expect(mainTabsSource).toContain(
      'import StudiesNavigator from "./StudiesNavigator";',
    );
    expect(mainTabsSource).toMatch(
      /<MainTabs\.Screen[\s\S]*?name="StudiesTab"[\s\S]*?component=\{StudiesNavigator\}/,
    );

    expect(drawerSource).not.toContain('name="Studies"');
    expect(drawerSource).not.toContain(
      'import StudiesNavigator from "./StudiesNavigator";',
    );
    expect(drawerContentSource).not.toContain('navigate("Studies")');
  });

  it("opens Studies contextually from the plus sheet without exposing Profile", () => {
    expect(drawerSource).toContain("const handleOpenStudies = () =>");
    expect(drawerSource).toContain("if (studyContinuation)");
    expect(drawerSource).toContain('screen: "StudyDetail"');
    expect(drawerSource).toContain(
      "studyId: studyContinuation.studyId",
    );
    expect(drawerSource).toContain('screen: "StudiesHome"');
    expect(drawerSource).toContain(
      "onOpenStudies={handleOpenStudies}",
    );
    expect(drawerSource).toContain('name="Journal"');
    expect(drawerSource).toContain('name="Favorites"');

    expect(quickSource).toContain(
      'studyActionLabel: "Continuar estudo" | "Abrir Estudos";',
    );
    expect(quickSource).toContain("studyActionLabel,");
    expect(quickSource).toContain("label={studyActionLabel}");
    expect(quickSource).toContain("onPress={onOpenStudies}");
    expect(quickSource).not.toContain("onOpenProfile");

    expect(drawerSource).toContain("studyActionLabel={");
    expect(drawerSource).toContain('"Continuar estudo"');
    expect(drawerSource).toContain('"Abrir Estudos"');
    expect(drawerSource).not.toContain("handleOpenProfile");
  });

  it("routes the existing Home Estudos card to StudiesTab and StudiesHome", () => {
    const card = blockAround(
      homeSource,
      'title="Estudos"',
      "<QuickAccessCard",
    );

    expect(card).toContain(
      'iconSource={require("../../assets/home/icons/estudos_icone.png")}',
    );
    expect(card).toContain('subtitle="Aprofunde temas"');
    expect(card).toContain('navigation.navigate("StudiesTab", {');
    expect(card).toContain('screen: "StudiesHome"');
    expect(card).not.toMatch(/\bdisabled\b/);
    expect(card).not.toContain("StudyTrack");
    expect(card).not.toContain("StudyDetail");
  });

  it("shows contextual study continuation on Home through the continuation service", () => {
    expect(homeSource).toContain(
      'testID="home-continue-study"',
    );
    expect(homeSource).toContain(
      "loadStudyContinuationState",
    );
    expect(homeSource).toContain(
      "void loadStudyContinuationState();",
    );
    expect(homeSource).toContain(
      'screen: "StudyDetail"',
    );
    expect(homeSource).toContain(
      "studyId: studyContinuation.studyId",
    );
    expect(homeSource).toContain(
      "{studyContinuation.title}",
    );
    expect(homeSource).toContain(
      "{studyContinuation.readingProgress}%",
    );
  });

  it("keeps continuation selection behind one service boundary", () => {
    expect(continuationServiceSource).toContain(
      "studyProgressService.list()",
    );
    expect(continuationServiceSource).toContain(
      'progress.state === "IN_PROGRESS"',
    );
    expect(continuationServiceSource).toContain(
      "progress.lastOpenedAt !== null",
    );
    expect(continuationServiceSource).toContain(
      "getRuntimeStudyById",
    );
    expect(continuationServiceSource).not.toContain(
      "expo-sqlite",
    );
    expect(continuationServiceSource).not.toContain(
      "SQLiteStudyProgressRepository",
    );
    expect(drawerSource).not.toContain(
      "getPersonalPlatformHub",
    );
    expect(quickSource).not.toContain(
      "getPersonalPlatformHub",
    );
  });

  it("keeps StudiesTab internal so the visible bottom bar remains unchanged", () => {
    const tabNames = Array.from(
      mainTabsSource.matchAll(
        /<MainTabs\.Screen[\s\S]*?name="([A-Za-z0-9_]+)"/g,
      ),
      (match) => match[1],
    );

    expect(tabNames).toEqual([
      "HomeTab",
      "BibleTab",
      "StudiesTab",
      "PlanTab",
      "HymnalTab",
    ]);

    expect(customTabSource).not.toContain("StudiesTab");
    expect(customTabSource).not.toContain('label="Estudos"');
    expect(rootSource).not.toContain("StudiesNavigator");
    expect(factoriesSource).not.toContain("Studies");
    expect(policySource).not.toContain("Studies");
    expect(policySource).toContain("PROFILE_NAVIGATION");
    expect(policySource).toContain('"SCREEN_NOT_IMPLEMENTED"');
    expect(drawerSource).not.toContain('name="Profile"');
    expect(quickSource).not.toContain("onOpenProfile");
  });

  it("does not bypass the shell with direct internal navigation or editorial imports", () => {
    const publicSources = [
      drawerSource,
      quickSource,
      homeSource,
      mainTabsSource,
    ].join("\n");

    expect(drawerSource).not.toMatch(
      /navigation\.navigate\("(?:StudiesHome|StudyTrack|StudyDetail)"/,
    );
    expect(homeSource).not.toMatch(
      /navigation\.navigate\("(?:StudiesHome|StudyTrack|StudyDetail)"/,
    );
    expect(quickSource).not.toMatch(
      /navigation\.navigate\("(?:StudiesHome|StudyTrack|StudyDetail)"/,
    );
    expect(publicSources).not.toContain("../studies/content/");

    const studiesTabBlock = blockAround(
      mainTabsSource,
      'name="StudiesTab"',
      "<MainTabs.Screen",
    );
    const studiesHomeBlock = blockAround(
      homeSource,
      'title="Estudos"',
      "<QuickAccessCard",
    );

    expect(
      [studiesTabBlock, quickSource, studiesHomeBlock].join("\n"),
    ).not.toMatch(/placeholder/i);
  });
});
