import { readFileSync } from "fs";
import { resolve } from "path";

const readingScreenPath = resolve(
  __dirname,
  "../src/screens/ReadingScreen.tsx",
);

const source = readFileSync(
  readingScreenPath,
  "utf8",
)
  .replace(/\r\n/g, "\n")
  .replace(/\r/g, "\n");

function getHandlerSource(): string {
  const start = source.indexOf(
    "  function openPlanJournal() {",
  );
  const end = source.indexOf(
    "  async function openInLocalBibleReader() {",
    start,
  );

  if (start < 0 || end <= start) {
    throw new Error(
      "READING_SCREEN_PLAN_JOURNAL_HANDLER_NOT_FOUND",
    );
  }

  return source.slice(start, end);
}

describe("ReadingScreen Plan -> Journal contract", () => {
  test("uses the branded PersonalLocalDate contract without changing navigation types", () => {
    expect(source).toContain(
      'import type { PersonalLocalDate } from "../domain/personal/personalTime";',
    );

    const handler = getHandlerSource();

    expect(handler).toContain(
      "entryDate: date as PersonalLocalDate",
    );
    expect(handler).toContain(
      'sourceType: "PLAN"',
    );
  });

  test("routes the Plan day through AppShell -> Journal -> JournalEntryEditor", () => {
    const handler = getHandlerSource();

    expect(handler).toContain(
      'navigation.push("AppShell", {',
    );
    expect(handler).not.toContain(
      'navigation.navigate("AppShell", {',
    );
    expect(handler).toContain(
      'screen: "Journal"',
    );
    expect(handler).toContain(
      'screen: "JournalEntryEditor"',
    );
    expect(handler).toContain(
      "sourceContext: {",
    );
  });

  test("preserves Plan snapshots for the Journal draft", () => {
    const handler = getHandlerSource();

    expect(handler).toContain(
      "currentPhase?.title",
    );
    expect(handler).toContain(
      "Plano de leitura •",
    );
    expect(handler).toContain(
      "sourceTitleSnapshot,",
    );
    expect(handler).toContain(
      "promptSnapshot: spiritual.reflection",
    );
  });

  test("uses the canonical structured BibleReference when available and null otherwise", () => {
    const handler = getHandlerSource();

    expect(handler).toContain(
      "structuredReadingDay?.readingUnit.bibleReference ?? null",
    );
    expect(handler).toContain(
      "reference: planReference",
    );

    expect(source).toContain(
      "if (!structuredProjection || !date || isSunday || isNatal) return null;",
    );
  });

  test("keeps completion, progress and persistence mutations out of the Plan -> Journal handler", () => {
    const handler = getHandlerSource();

    for (const forbidden of [
      "addCompletedDay",
      "setCompletedDays",
      "progressStore",
      "COMPLETED_KEY",
      "AsyncStorage",
      "journalService",
      "createPlanDraft",
      "SQLite",
      "Repository",
      "expo-sqlite",
    ]) {
      expect(handler).not.toContain(
        forbidden,
      );
    }
  });

  test("exposes one explicit Registrar no Diário action wired to the handler", () => {
    const titleMatches =
      source.match(
        /title="Registrar no Diário"/g,
      ) ?? [];

    expect(titleMatches).toHaveLength(1);
    expect(source).toContain(
      "onPress={openPlanJournal}",
    );

    const buttonIndex = source.indexOf(
      'title="Registrar no Diário"',
    );
    const internalInfoIndex = source.indexOf(
      "{/* informações internas do plano não são exibidas em produção */}",
    );

    expect(buttonIndex).toBeGreaterThanOrEqual(0);
    expect(internalInfoIndex).toBeGreaterThan(buttonIndex);
  });
});