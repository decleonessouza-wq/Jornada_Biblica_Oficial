import { readFileSync } from "fs";

function readSource(path: string): string {
  return readFileSync(path, "utf8").replace(
    /\r\n?/g,
    "\n",
  );
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
  const bibleNavigator = readSource(
    "src/navigation/BibleNavigator.tsx",
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
    expect(journalNavigator).toContain(
      'name="JournalEntryDetail"',
    );
    expect(journalNavigator).toContain(
      "<JournalEntryDetailScreen",
    );
    expect(journalNavigator).toContain(
      "onOpenBibleReference={",
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

  it("wires Journal into QuickActionSheet through the Drawer route", () => {
    expect(quickActionSheet).toContain(
      "onOpenJournal: () => void;",
    );
    expect(quickActionSheet).toContain(
      'label="Abrir Diário"',
    );
    expect(quickActionSheet).toContain(
      "onPress={onOpenJournal}",
    );
    expect(appDrawerNavigator).toContain(
      "const handleOpenJournal = () => {",
    );
    expect(appDrawerNavigator).toContain(
      'navigation.navigate("Journal");',
    );
    expect(appDrawerNavigator).toContain(
      "onOpenJournal={handleOpenJournal}",
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

  it("keeps the Journal navigation contract semantic and accepts Bible source context", () => {
    expect(navigationTypes).toContain(
      "JournalHome: undefined;",
    );
    expect(navigationTypes).toContain(
      "export type JournalEntryEditorSourceContext",
    );
    expect(navigationTypes).toContain(
      'sourceType: "BIBLE";',
    );
    expect(navigationTypes).toContain(
      "reference: BibleReference;",
    );
    expect(navigationTypes).toContain(
      "sourceContext?: JournalEntryEditorSourceContext;",
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

  it("accepts explicit PLAN source context without embedding completion or progress state", () => {
    expect(navigationTypes).toContain(
      'sourceType: "PLAN";',
    );
    expect(navigationTypes).toContain(
      "entryDate: PersonalLocalDate;",
    );
    expect(navigationTypes).toContain(
      "sourceTitleSnapshot: string;",
    );
    expect(navigationTypes).toContain(
      "promptSnapshot: string;",
    );
    expect(navigationTypes).toContain(
      "reference: BibleReference | null;",
    );

    const journalService = readSource(
      "src/services/journal/journalService.ts",
    );

    expect(journalService).toContain(
      "async createPlanDraft(",
    );
    expect(journalService).toContain(
      'sourceType: "PLAN"',
    );
    expect(journalService).not.toMatch(
      /progressStore|addCompletedDay|COMPLETED_DAYS_KEY/,
    );
  });

  it("routes a canonical Bible reference from BibleTab to the Journal editor", () => {
    expect(bibleNavigator).toContain(
      'MainTabScreenProps<"BibleTab">',
    );
    expect(bibleNavigator).toContain(
      'navigation.navigate("Journal", {',
    );
    expect(bibleNavigator).toContain(
      'screen: "JournalEntryEditor"',
    );
    expect(bibleNavigator).toContain(
      'sourceType: "BIBLE"',
    );
    expect(bibleNavigator).toContain(
      "reference,",
    );
    expect(bibleNavigator).toContain(
      "onRequestJournalReference={",
    );
  });

  it("returns a Journal Bible reference to the Reader using the preferred offline version", () => {
    expect(journalNavigator).toContain(
      'AppDrawerScreenProps<"Journal">',
    );
    expect(journalNavigator).toContain(
      "loadPreferredOfflineBibleVersion()",
    );
    expect(journalNavigator).toContain(
      "getOfflineBibleReaderRouteParamsForReference(",
    );
    expect(journalNavigator).toContain(
      'navigation.navigate("MainTabs", {',
    );
    expect(journalNavigator).toContain(
      'screen: "BibleTab"',
    );
    expect(journalNavigator).toContain(
      'screen: "BibleReader"',
    );
    expect(journalNavigator).toContain(
      "params: readerParams",
    );
    expect(journalNavigator).not.toMatch(
      /sourceTitleSnapshot.*versionId|promptSnapshot.*versionId/,
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
