const fs = jest.requireActual<{
  readFileSync(path: string, encoding: "utf8"): string;
}>("fs");

function readSource(path: string): string {
  return fs.readFileSync(path, "utf8");
}

describe("gratitude cutover runtime activation", () => {
  it("awaits preparation before mounting RootNavigator", () => {
    const app = readSource("App.tsx");

    expect(app).toContain(
      "prepareLegacyGratitudeCutover",
    );
    expect(app).toContain(
      "gratitudeCutoverReady",
    );
    expect(app).toContain(
      "if (!gratitudeCutoverReady) return null;",
    );
    expect(app).not.toContain(
      'requestLegacyGratitudeRuntimeReconciliation(\n      "startup"',
    );
  });

  it("removes post-cutover screen reconciliation callers", () => {
    for (const path of [
      "src/screens/ReadingScreen.tsx",
      "src/screens/HistoryScreen.tsx",
      "src/screens/SettingsScreen.tsx",
    ]) {
      const source = readSource(path);

      expect(source).not.toContain(
        "requestLegacyGratitudeRuntimeReconciliation",
      );
    }
  });
});
