const fs = jest.requireActual<{
  readFileSync(path: string, encoding: "utf8"): string;
}>("fs");

function readSource(path: string): string {
  return fs.readFileSync(path, "utf8");
}

describe("legacy gratitude runtime cutover", () => {
  const source = readSource(
    "src/services/journal/legacyGratitudeRuntime.ts",
  );

  it("uses a durable completion marker and one-time preparation", () => {
    expect(source).toContain(
      'LEGACY_GRATITUDE_CUTOVER_MARKER_KEY',
    );
    expect(source).toContain(
      '"journalGratitudeCutoverV1"',
    );
    expect(source).toContain(
      "prepareLegacyGratitudeCutover",
    );
    expect(source).toContain(
      "hasLegacyGratitudeCutoverCompleted",
    );
    expect(source).toContain(
      "await reconcileLegacyGratitudeRuntime();",
    );
    expect(source).toMatch(
      /AsyncStorage\.setItem\([\s\S]*LEGACY_GRATITUDE_CUTOVER_MARKER_KEY[\s\S]*"1"/,
    );
  });

  it("does not delete or rewrite the legacy gratitude payload", () => {
    expect(source).toContain(
      'LEGACY_GRATITUDE_STORAGE_KEY =\n  "gratitudeByDate"',
    );
    expect(source).toContain(
      "AsyncStorage.getItem(\n    LEGACY_GRATITUDE_STORAGE_KEY",
    );
    expect(source).not.toMatch(
      /AsyncStorage\.(?:setItem|removeItem)\([\s\S]{0,80}LEGACY_GRATITUDE_STORAGE_KEY/,
    );
  });

  it("blocks continuous legacy reconciliation after cutover", () => {
    expect(source).toMatch(
      /requestLegacyGratitudeRuntimeReconciliation[\s\S]*hasLegacyGratitudeCutoverCompleted\(\)[\s\S]*return null/,
    );
  });
});
