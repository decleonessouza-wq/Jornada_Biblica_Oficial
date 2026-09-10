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

const quickActionSource = readSource(
  "src/navigation/QuickActionSheet.tsx",
);
const drawerSource = readSource(
  "src/navigation/AppDrawerNavigator.tsx",
);
const mainTabsSource = readSource(
  "src/navigation/MainTabsNavigator.tsx",
);
const customTabBarSource = readSource(
  "src/navigation/CustomTabBar.tsx",
);

function extractQuickActionBlock(label: string): string {
  const marker = `label="${label}"`;
  const labelIndex = quickActionSource.indexOf(marker);

  expect(labelIndex).toBeGreaterThanOrEqual(0);

  const blockStart = quickActionSource.lastIndexOf(
    "<QuickActionButton",
    labelIndex,
  );
  const blockEnd = quickActionSource.indexOf(
    "/>",
    labelIndex,
  );

  expect(blockStart).toBeGreaterThanOrEqual(0);
  expect(blockEnd).toBeGreaterThan(labelIndex);

  return quickActionSource.slice(
    blockStart,
    blockEnd + 2,
  );
}

describe("Journal quick action navigation contract", () => {
  it("adds the Journal callback to QuickActionSheetProps and component props", () => {
    expect(quickActionSource).toContain(
      "onOpenJournal: () => void;",
    );

    const componentStart = quickActionSource.indexOf(
      "export default function QuickActionSheet({",
    );
    const componentEnd = quickActionSource.indexOf(
      "}: QuickActionSheetProps)",
      componentStart,
    );

    expect(componentStart).toBeGreaterThanOrEqual(0);
    expect(componentEnd).toBeGreaterThan(componentStart);

    const componentProps = quickActionSource.slice(
      componentStart,
      componentEnd,
    );

    expect(componentProps).toContain(
      "onOpenJournal,",
    );
  });

  it("adds Abrir Diário after the three existing quick actions", () => {
    const planIndex = quickActionSource.indexOf(
      'label="Abrir Plano"',
    );
    const progressIndex = quickActionSource.indexOf(
      'label="Ver Progresso"',
    );
    const historyIndex = quickActionSource.indexOf(
      'label="Abrir Histórico"',
    );
    const journalIndex = quickActionSource.indexOf(
      'label="Abrir Diário"',
    );

    expect(planIndex).toBeGreaterThanOrEqual(0);
    expect(progressIndex).toBeGreaterThan(planIndex);
    expect(historyIndex).toBeGreaterThan(progressIndex);
    expect(journalIndex).toBeGreaterThan(historyIndex);

    expect(
      extractQuickActionBlock("Abrir Plano"),
    ).toContain("onPress={onOpenPlan}");

    expect(
      extractQuickActionBlock("Ver Progresso"),
    ).toContain("onPress={onOpenProgress}");

    expect(
      extractQuickActionBlock("Abrir Histórico"),
    ).toContain("onPress={onOpenHistory}");

    expect(
      extractQuickActionBlock("Abrir Diário"),
    ).toContain("onPress={onOpenJournal}");
  });

  it("wires a Journal handler that closes the sheet before navigation", () => {
    const handlerStart = drawerSource.indexOf(
      "const handleOpenJournal = () => {",
    );
    const handlerEnd = drawerSource.indexOf(
      "};",
      handlerStart,
    );

    expect(handlerStart).toBeGreaterThanOrEqual(0);
    expect(handlerEnd).toBeGreaterThan(handlerStart);

    const handlerBlock = drawerSource.slice(
      handlerStart,
      handlerEnd + 2,
    );

    const closeIndex = handlerBlock.indexOf(
      "closeQuickActions();",
    );
    const navigateIndex = handlerBlock.indexOf(
      'navigation.navigate("Journal");',
    );

    expect(closeIndex).toBeGreaterThanOrEqual(0);
    expect(navigateIndex).toBeGreaterThan(closeIndex);

    expect(drawerSource).toContain(
      "onOpenJournal={handleOpenJournal}",
    );
  });

  it("preserves the Journal Drawer registration", () => {
    expect(drawerSource).toContain(
      'import JournalNavigator from "./JournalNavigator";',
    );
    expect(drawerSource).toContain(
      'name="Journal"',
    );
    expect(drawerSource).toContain(
      "component={JournalNavigator}",
    );
    expect(drawerSource).toContain(
      'title: "Meu Diário"',
    );
    expect(drawerSource).toContain(
      'drawerLabel: "Meu Diário"',
    );
  });

  it("keeps Journal outside MainTabs and preserves exactly four real tabs", () => {
    expect(mainTabsSource).not.toContain(
      'name="Journal"',
    );
    expect(mainTabsSource).not.toContain(
      "JournalNavigator",
    );
    expect(mainTabsSource).not.toContain(
      "JournalScreen",
    );

    const realTabNames = (
      mainTabsSource.match(
        /name="[A-Za-z]+Tab"/g,
      ) ?? []
    ).map((entry) =>
      entry.slice(6, -1),
    );

    expect(realTabNames).toEqual([
      "HomeTab",
      "BibleTab",
      "PlanTab",
      "HymnalTab",
    ]);
  });

  it("preserves the central plus button as the QuickActionSheet trigger", () => {
    expect(customTabBarSource).toContain(
      'accessibilityLabel="Abrir ações rápidas"',
    );
    expect(customTabBarSource).toContain(
      "onPress={onQuickAction}",
    );
  });

  it("does not add direct Journal persistence or service access to navigation", () => {
    const navigationSources =
      quickActionSource + drawerSource;

    for (const forbidden of [
      "journalService",
      "getPersonalPlatformHub",
      "JournalRepository",
      "SQLiteJournalRepository",
      "expo-sqlite",
      "AsyncStorage",
    ]) {
      expect(navigationSources).not.toContain(
        forbidden,
      );
    }
  });

  it("preserves every preexisting quick-action destination", () => {
    const expectedActions = [
      ["Abrir Plano", "onOpenPlan"],
      ["Ver Progresso", "onOpenProgress"],
      ["Abrir Histórico", "onOpenHistory"],
    ] as const;

    for (const [label, callback] of expectedActions) {
      const block = extractQuickActionBlock(label);

      expect(block).toContain(
        `onPress={${callback}}`,
      );
    }

    expect(drawerSource).toContain(
      'screen: "PlanTab"',
    );
    expect(drawerSource).toContain(
      'navigation.navigate("Progress")',
    );
    expect(drawerSource).toContain(
      'navigation.navigate("History")',
    );
  });
});