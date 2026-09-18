import { readFileSync } from "fs";
import { join } from "path";

const root = process.cwd();
const read = (relativePath: string): string =>
  readFileSync(join(root, relativePath), "utf8");

const typesSource = read("src/navigation/types.ts");
const drawerSource = read("src/navigation/AppDrawerNavigator.tsx");
const quickSource = read("src/navigation/QuickActionSheet.tsx");
const homeSource = read("src/screens/HomeScreen.tsx");
const studiesNavigatorSource = read("src/navigation/StudiesNavigator.tsx");
const mainTabsSource = read("src/navigation/MainTabsNavigator.tsx");
const customTabSource = read("src/navigation/CustomTabBar.tsx");
const rootSource = read("src/navigation/RootNavigator.tsx");
const factoriesSource = read("src/navigation/navigationFactories.ts");
const policySource = read("src/navigation/navigationSurfacePolicy.ts");
const drawerContentSource = read("src/navigation/AppDrawerContent.tsx");

function blockAround(source: string, needle: string, startToken: string): string {
  const needleIndex = source.indexOf(needle);
  expect(needleIndex).toBeGreaterThanOrEqual(0);
  const start = source.lastIndexOf(startToken, needleIndex);
  const end = source.indexOf("/>", needleIndex);
  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(needleIndex);
  return source.slice(start, end + 2);
}

describe("Studies public wiring", () => {
  it("adds exactly one public Studies drawer route type without changing internal route ownership", () => {
    expect(
      typesSource.match(/Studies:\s*NavigatorScreenParams<StudiesStackParamList>\s*\|\s*undefined;/g),
    ).toHaveLength(1);
    expect(typesSource).not.toMatch(/\bProfile\s*:/);
    expect(studiesNavigatorSource).toContain("StudiesHome");
    expect(studiesNavigatorSource).toContain("StudyTrack");
    expect(studiesNavigatorSource).toContain("StudyDetail");
  });

  it("registers Studies exactly once in the drawer and opens it through the shell callback", () => {
    expect(drawerSource.match(/name="Studies"/g)).toHaveLength(1);
    expect(drawerSource).toContain("StudiesNavigator");
    expect(drawerSource).toContain("const handleOpenStudies = () =>");
    expect(drawerSource).toContain('navigation.navigate("Studies")');
    expect(drawerSource).toContain("onOpenStudies={handleOpenStudies}");
    expect(drawerSource).toContain('name="Journal"');
    expect(drawerSource).toContain('name="Favorites"');
    expect(drawerContentSource).not.toContain('navigate("Studies")');
  });

  it("activates only the existing Home Estudos card and routes it to Studies", () => {
    const card = blockAround(homeSource, 'title="Estudos"', "<QuickAccessCard");
    expect(card).toContain(
      'iconSource={require("../../assets/home/icons/estudos_icone.png")}',
    );
    expect(card).toContain('subtitle="Aprofunde temas"');
    expect(card).toContain('navigation.navigate("Studies")');
    expect(card).not.toMatch(/\bdisabled\b/);
    expect(card).not.toContain("StudiesHome");
    expect(card).not.toContain("StudyTrack");
    expect(card).not.toContain("StudyDetail");
  });

  it("adds the Estudos quick action and binds only to onOpenStudies", () => {
    expect(quickSource).toContain("onOpenStudies: () => void;");
    expect(quickSource).toContain("onOpenStudies,");
    const block = blockAround(
      quickSource,
      'label="Abrir Estudos"',
      "<QuickActionButton",
    );
    expect(block).toContain("onPress={onOpenStudies}");
    expect(block).not.toContain("Profile");
    expect(quickSource).toContain('label="Abrir Diário"');
    expect(quickSource).toContain('label="Abrir Favoritos"');
  });

  it("keeps Studies out of tabs, root, factories, surface policy and Profile routing", () => {
    const tabNames = Array.from(
      mainTabsSource.matchAll(/name="([A-Za-z0-9_]+)"/g),
      (match) => match[1],
    );
    expect(tabNames).toEqual(["HomeTab", "BibleTab", "PlanTab", "HymnalTab"]);
    expect(customTabSource).not.toContain("Studies");
    expect(rootSource).not.toContain("StudiesNavigator");
    expect(factoriesSource).not.toContain("Studies");
    expect(policySource).not.toContain("Studies");
    expect(policySource).toContain("PROFILE_NAVIGATION");
    expect(policySource).toContain('"SCREEN_NOT_IMPLEMENTED"');
    expect(drawerSource).not.toContain('name="Profile"');
    expect(quickSource).not.toContain("onOpenProfile");
  });

  it("never bypasses the public Studies route or imports editorial study content", () => {
    const publicSources = [drawerSource, quickSource, homeSource].join("\n");
    expect(publicSources).not.toMatch(
      /navigate\("(?:StudiesHome|StudyTrack|StudyDetail)"/,
    );
    expect(publicSources).not.toContain("../studies/content/");

    const studiesDrawerBlock = blockAround(
      drawerSource,
      'name="Studies"',
      "<AppDrawer.Screen",
    );
    const studiesQuickBlock = blockAround(
      quickSource,
      'label="Abrir Estudos"',
      "<QuickActionButton",
    );
    const studiesHomeBlock = blockAround(
      homeSource,
      'title="Estudos"',
      "<QuickAccessCard",
    );
    expect(
      [studiesDrawerBlock, studiesQuickBlock, studiesHomeBlock].join("\n"),
    ).not.toMatch(/placeholder/i);
  });
});
