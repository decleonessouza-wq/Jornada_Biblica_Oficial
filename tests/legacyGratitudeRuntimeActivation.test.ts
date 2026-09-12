import fs from "fs";
import path from "path";

function readSource(relativePath: string): string {
  return fs.readFileSync(
    path.join(process.cwd(), relativePath),
    "utf8",
  );
}

function expectRuntimeCall(
  source: string,
  context: string,
): void {
  const escaped = context.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&",
  );

  expect(source).toMatch(
    new RegExp(
      `requestLegacyGratitudeRuntimeReconciliation\\(\\s*"${escaped}"\\s*,?\\s*\\)`,
    ),
  );
}

function readRegion(
  source: string,
  startMarker: string,
  endMarker: string,
): string {
  const start = source.indexOf(startMarker);

  if (start < 0) {
    throw new Error(
      `TEST_SOURCE_START_MARKER_NOT_FOUND:${startMarker}`,
    );
  }

  const end = source.indexOf(
    endMarker,
    start + startMarker.length,
  );

  if (end < 0) {
    throw new Error(
      `TEST_SOURCE_END_MARKER_NOT_FOUND:${endMarker}`,
    );
  }

  if (end <= start) {
    throw new Error(
      "TEST_SOURCE_REGION_ORDER_INVALID",
    );
  }

  return source.slice(start, end);
}

describe("legacy gratitude runtime activation contract", () => {
  const runtimeCall =
    "requestLegacyGratitudeRuntimeReconciliation";

  it("activates exactly once at app startup, not on AppState active", () => {
    const source = readSource("App.tsx");

    expectRuntimeCall(source, "startup");
    expect(source).not.toMatch(
      /requestLegacyGratitudeRuntimeReconciliation\(\s*"appstate-active"\s*,?\s*\)/,
    );
    expect(source).toContain(
      'if (state === "active") runAutoBackup();',
    );
  });

  it("reconciles after Reading save and delete mutations", () => {
    const source = readSource(
      "src/screens/ReadingScreen.tsx",
    );

    expectRuntimeCall(source, "reading-save");
    expectRuntimeCall(source, "reading-delete");
  });

  it("reconciles after History import and reset but not automatic backup restore", () => {
    const source = readSource(
      "src/screens/HistoryScreen.tsx",
    );

    expectRuntimeCall(source, "history-import");
    expectRuntimeCall(source, "history-reset");

    const restoreRegion = readRegion(
      source,
      "async function restoreAutoBackupNow()",
      "function confirmReset()",
    );

    expect(restoreRegion).not.toContain(runtimeCall);
  });

  it("reconciles after Settings import and reset but not automatic backup restore", () => {
    const source = readSource(
      "src/screens/SettingsScreen.tsx",
    );

    expectRuntimeCall(source, "settings-import");
    expectRuntimeCall(source, "settings-reset");

    const restoreRegion = readRegion(
      source,
      "async function restoreAutoBackupNow()",
      "function confirmReset()",
    );

    expect(restoreRegion).not.toContain(runtimeCall);
  });

  it("does not cut Home or Progress over during P16-P7", () => {
    expect(
      readSource("src/screens/HomeScreen.tsx"),
    ).not.toContain(runtimeCall);
    expect(
      readSource("src/screens/ProgressScreen.tsx"),
    ).not.toContain(runtimeCall);
  });

  it("does not couple automatic backup services to gratitude migration", () => {
    expect(
      readSource("src/services/backupRestore.ts"),
    ).not.toContain(runtimeCall);
    expect(
      readSource("src/utils/autoBackup.ts"),
    ).not.toContain(runtimeCall);
  });
});
