import { readFileSync } from "fs";

import type { DevotionalId } from "../src/domain/devotionals/devotional";
import {
  JOURNAL_SOURCE_TYPES,
} from "../src/domain/journal/journal";
import type {
  JournalEntryEditorSourceContext,
} from "../src/navigation/types";

function readSource(path: string): string {
  return readFileSync(path, "utf8").replace(
    /\r\n?/g,
    "\n",
  );
}

describe("devotional journal integration foundation", () => {
  it("aligns the domain and typed navigation context for DEVOTIONAL", () => {
    const context: JournalEntryEditorSourceContext = {
      sourceType: "DEVOTIONAL",
      devotionalId:
        "devotional-test-id" as DevotionalId,
      sourceTitleSnapshot: "Devocional de teste",
      promptSnapshot: "Registre sua reflexão.",
    };

    expect(JOURNAL_SOURCE_TYPES).toContain(
      "DEVOTIONAL",
    );
    expect(
      JOURNAL_SOURCE_TYPES.filter(
        (sourceType) =>
          sourceType === "DEVOTIONAL",
      ),
    ).toHaveLength(1);
    expect(context).toEqual({
      sourceType: "DEVOTIONAL",
      devotionalId: "devotional-test-id",
      sourceTitleSnapshot: "Devocional de teste",
      promptSnapshot: "Registre sua reflexão.",
    });
  });

  it("keeps devotionalId navigation-only while the service persists snapshots through a dedicated method", () => {
    const journalService = readSource(
      "src/services/journal/journalService.ts",
    );

    expect(journalService).toContain(
      "export type CreateDevotionalJournalDraftInput",
    );
    expect(journalService).toContain(
      "async createDevotionalDraft(",
    );
    expect(journalService).toContain(
      'sourceType: "DEVOTIONAL"',
    );
    expect(journalService).toContain(
      "input.sourceTitleSnapshot",
    );
    expect(journalService).toContain(
      "input.promptSnapshot",
    );
    expect(journalService).not.toMatch(
      /devotionalId/,
    );
    const devotionalStart = journalService.indexOf(
      "async createDevotionalDraft(",
    );
    const updateStart = journalService.indexOf(
      "async updateDraft(",
      devotionalStart,
    );

    expect(devotionalStart).toBeGreaterThanOrEqual(0);
    expect(updateStart).toBeGreaterThan(
      devotionalStart,
    );

    const devotionalMethod = journalService.slice(
      devotionalStart,
      updateStart,
    );

    expect(devotionalMethod).not.toContain(
      "createStudyDraft",
    );
  });

  it("advances only the current schema to v11 and leaves the historical v4 source check unchanged", () => {
    const schema = readSource(
      "src/data/personal/personalDatabaseSchema.ts",
    );
    const migrations = readSource(
      "src/data/personal/personalDatabaseMigrations.ts",
    );

    expect(schema).toContain(
      "PERSONAL_DATABASE_SCHEMA_VERSION = 11",
    );
    expect(migrations).toContain(
      "version: 11",
    );

    const version4Start = migrations.indexOf(
      "version: 4",
    );
    const version5Start = migrations.indexOf(
      "version: 5",
    );
    const version11Start = migrations.indexOf(
      "version: 11",
    );

    expect(version4Start).toBeGreaterThanOrEqual(0);
    expect(version5Start).toBeGreaterThan(
      version4Start,
    );
    expect(version11Start).toBeGreaterThan(
      version5Start,
    );

    const historicalV4 = migrations.slice(
      version4Start,
      version5Start,
    );
    const currentV11 = migrations.slice(
      version11Start,
    );

    expect(historicalV4).not.toContain(
      "'DEVOTIONAL'",
    );
    expect(currentV11).toContain(
      "'DEVOTIONAL'",
    );
    expect(currentV11).toContain(
      "personal_journal_entries_v10",
    );
    expect(currentV11).toContain(
      "personal_journal_entry_references_v10",
    );
    expect(currentV11).toContain(
      "personal_journal_reference_passages_v10",
    );
    expect(currentV11).toContain(
      "personal_journal_entry_tags_v10",
    );
  });
});