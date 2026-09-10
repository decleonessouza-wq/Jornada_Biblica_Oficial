import { createHash } from "crypto";
import { readFileSync } from "fs";

function readSource(path: string): string {
  return readFileSync(path, "utf8").replace(
    /\r\n?/g,
    "\n",
  );
}

function sha256(text: string): string {
  return createHash("sha256")
    .update(text, "utf8")
    .digest("hex")
    .toUpperCase();
}

describe("journal navigation contract", () => {
  const journalNavigator = readSource(
    "src/navigation/JournalNavigator.tsx",
  );
  const appDrawerNavigator = readSource(
    "src/navigation/AppDrawerNavigator.tsx",
  );
  const mainTabsNavigator = readSource(
    "src/navigation/MainTabsNavigator.tsx",
  );
  const quickActionSheet = readSource(
    "src/navigation/QuickActionSheet.tsx",
  );
  const appDrawerContent = readSource(
    "src/navigation/AppDrawerContent.tsx",
  );
  const navigationFactories = readSource(
    "src/navigation/navigationFactories.ts",
  );
  const navigationTypes = readSource(
    "src/navigation/types.ts",
  );

  it("creates a typed Journal stack with exactly the three approved routes", () => {
    expect(journalNavigator).toContain(
      'createNativeStackNavigator<JournalStackParamList>()',
    );
    expect(journalNavigator).toContain(
      'initialRouteName="JournalHome"',
    );

    const screenNames = Array.from(
      journalNavigator.matchAll(
        /<JournalStack\.Screen\s+name="([^"]+)"/g,
      ),
      (match) => match[1],
    );

    expect(screenNames).toEqual([
      "JournalHome",
      "JournalEntryEditor",
      "JournalEntryDetail",
    ]);
    expect(
      journalNavigator.match(/<JournalStack\.Screen/g),
    ).toHaveLength(3);
  });

  it("binds each approved Journal route to its validated screen", () => {
    expect(journalNavigator).toMatch(
      /name="JournalHome"\s+component=\{JournalScreen\}/,
    );
    expect(journalNavigator).toMatch(
      /name="JournalEntryEditor"\s+component=\{JournalEntryEditorScreen\}/,
    );
    expect(journalNavigator).toMatch(
      /name="JournalEntryDetail"\s+component=\{JournalEntryDetailScreen\}/,
    );
  });

  it("registers Journal once at Drawer level and keeps MainTabs initial", () => {
    expect(appDrawerNavigator).toContain(
      'initialRouteName="MainTabs"',
    );
    expect(appDrawerNavigator).toContain(
      'import JournalNavigator from "./JournalNavigator";',
    );

    const journalDrawerMatches =
      appDrawerNavigator.match(
        /<AppDrawer\.Screen\s+name="Journal"/g,
      );

    expect(journalDrawerMatches).toHaveLength(1);
    expect(appDrawerNavigator).toMatch(
      /name="Journal"\s+component=\{JournalNavigator\}/,
    );
    expect(appDrawerNavigator).toContain(
      'drawerLabel: "Meu Diário"',
    );
    expect(appDrawerNavigator).toContain(
      "headerShown: false",
    );
  });

  it("keeps the bottom navigation at exactly four approved tabs", () => {
    const tabNames = Array.from(
      mainTabsNavigator.matchAll(
        /<MainTabs\.Screen\s+name="([^"]+)"/g,
      ),
      (match) => match[1],
    );

    expect(tabNames).toEqual([
      "HomeTab",
      "BibleTab",
      "PlanTab",
      "HymnalTab",
    ]);
    expect(
      mainTabsNavigator.match(/<MainTabs\.Screen/g),
    ).toHaveLength(4);
    expect(mainTabsNavigator).not.toContain(
      'name="Journal"',
    );
  });

  it("does not wire Journal into QuickActionSheet during A6", () => {
    expect(quickActionSheet).not.toMatch(
      /Journal|Diário|onOpenJournal/,
    );
    expect(appDrawerNavigator).not.toContain(
      "onOpenJournal",
    );
  });

  it("keeps AppDrawerContent generic and navigationFactories without Journal", () => {
    expect(appDrawerContent).toContain(
      "<DrawerItemList {...props} />",
    );
    expect(appDrawerContent).not.toMatch(
      /JournalNavigator|name="Journal"/,
    );
    expect(navigationFactories).not.toMatch(
      /JournalStack|JournalStackParamList/,
    );
  });

  it("keeps the frozen navigation types contract unchanged", () => {
    expect(sha256(navigationTypes)).toBe(
      "7A83C26030620A7339256AEA92B6852B21DF181BFDE5689558874144773B3E2D",
    );
    expect(navigationTypes).toContain(
      "JournalHome: undefined;",
    );
    expect(navigationTypes).toContain(
      "entryId?: JournalEntryId;",
    );
    expect(navigationTypes).toContain(
      "JournalEntryDetail: {",
    );
    expect(navigationTypes).toContain(
      "entryId: JournalEntryId;",
    );
    expect(navigationTypes).toContain(
      "Journal: NavigatorScreenParams<JournalStackParamList> | undefined;",
    );
  });

  it("keeps database and legacy persistence out of navigation integration", () => {
    const integrationSource =
      journalNavigator + appDrawerNavigator;

    expect(integrationSource).not.toMatch(
      /SQLite|Repository|AsyncStorage|personalDatabase|expo-sqlite/i,
    );
  });
});
