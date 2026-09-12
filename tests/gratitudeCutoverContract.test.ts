const fs = jest.requireActual<{
  readFileSync(path: string, encoding: "utf8"): string;
}>("fs");

function readSource(path: string): string {
  return fs.readFileSync(path, "utf8");
}

describe("P16-P8 gratitude cutover contracts", () => {
  const service = readSource(
    "src/services/journal/journalService.ts",
  );

  it("exposes Journal-backed cutover operations", () => {
    for (const method of [
      "listActiveHomeGratitudeEntries",
      "getHomeGratitudeForDate",
      "listActiveGratitudeEntries",
      "countDistinctActiveGratitudeDates",
      "exportHomeGratitudeMap",
      "replaceHomeGratitudeMap",
      "clearHomeGratitudeEntries",
    ]) {
      expect(service).toContain(method);
    }

    expect(service).toContain(
      'entry.status === "ACTIVE"',
    );
    expect(service).toContain(
      'entry.category === "GRATITUDE"',
    );
    expect(service).toContain(
      "new Set(\n      entries.map((entry) => entry.entryDate)",
    );
  });

  it("moves Home, Progress and Plan reads to Journal", () => {
    const home = readSource(
      "src/screens/HomeScreen.tsx",
    );
    const progress = readSource(
      "src/screens/ProgressScreen.tsx",
    );
    const plan = readSource(
      "src/screens/PlanScreen.tsx",
    );

    expect(home).toContain(
      "journalService.getHomeGratitudeForDate",
    );
    expect(progress).toContain(
      "journalService.countDistinctActiveGratitudeDates",
    );
    expect(plan).toContain(
      "journalService.exportHomeGratitudeMap",
    );

    for (const source of [home, progress, plan]) {
      expect(source).not.toMatch(
        /AsyncStorage\.getItem\(["']gratitudeByDate["']\)/,
      );
    }
  });

  it("keeps legacy-shaped backup compatibility without legacy writes", () => {
    const paths = [
      "src/screens/ReadingScreen.tsx",
      "src/screens/HistoryScreen.tsx",
      "src/screens/SettingsScreen.tsx",
    ];

    for (const path of paths) {
      const source = readSource(path);

      expect(source).toContain(
        "journalService.exportHomeGratitudeMap",
      );
      expect(source).not.toMatch(
        /AsyncStorage\.(?:getItem|setItem|removeItem)\(GRATITUDE_KEY/,
      );
    }

    expect(
      readSource("src/screens/HistoryScreen.tsx"),
    ).toContain(
      "journalService.clearHomeGratitudeEntries",
    );
    expect(
      readSource("src/screens/SettingsScreen.tsx"),
    ).toContain(
      "journalService.clearHomeGratitudeEntries",
    );
  });
});
