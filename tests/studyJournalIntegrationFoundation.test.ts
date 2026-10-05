import type {
  JournalEntryId,
} from "../src/domain/journal/journal";
import type {
  PersonalCanonicalIdFactory,
} from "../src/domain/personal/personalIdentity";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  StudyContentBlock,
} from "../src/domain/studies/study";
import type {
  JournalEntryPersistenceRecord,
  JournalRepository,
} from "../src/data/personal/journal/journalRepository";
import type {
  JournalEntryEditorSourceContext,
} from "../src/navigation/types";
import { JournalService } from "../src/services/journal/journalService";
import {
  buildStudyJournalPromptSnapshot,
  resolveRuntimeStudyJournalContext,
} from "../src/studies/runtime/studyJournalContextResolver";
import { studyRuntimeCatalog } from "../src/studies/runtime/studyRuntimeCatalog";

const ENTRY_ID =
  "journal-entry-study-test" as JournalEntryId;
const ENTRY_DATE =
  "2026-09-23" as PersonalLocalDate;
const CREATED_AT =
  "2026-09-23T16:00:00.000Z" as PersonalUtcTimestamp;
const NOW = new Date("2026-09-23T16:00:00.000Z");

function createJournalServiceHarness() {
  const create = jest.fn();

  const repository = {
    create,
  } as unknown as JournalRepository;

  const createId = jest.fn(() => ENTRY_ID);
  const canonicalIdFactory = {
    create: createId,
  } as unknown as PersonalCanonicalIdFactory;

  const now = jest.fn(() => NOW);
  const clock = {
    now,
  } as PersonalClock;

  const toLocalDate = jest.fn(() => ENTRY_DATE);
  const toUtcTimestamp = jest.fn(() => CREATED_AT);
  const datePolicy = {
    toLocalDate,
    toUtcTimestamp,
  } as unknown as PersonalDatePolicy;

  return {
    service: new JournalService(
      repository,
      canonicalIdFactory,
      clock,
      datePolicy,
    ),
    create,
    createId,
    now,
    toLocalDate,
    toUtcTimestamp,
  };
}

describe("P17-P10-A1 Study journal integration foundation", () => {
  it("resolves journal context for all 84 released studies from JOURNAL_PROMPT only", () => {
    const before = JSON.stringify(
      studyRuntimeCatalog.packages,
    );

    const results = studyRuntimeCatalog.studies.map(
      ({ content }) => ({
        content,
        result:
          resolveRuntimeStudyJournalContext(
            content.id,
          ),
      }),
    );

    expect(results).toHaveLength(84);
    expect(
      results.filter(({ result }) => result.ok),
    ).toHaveLength(84);

    for (const { content, result } of results) {
      expect(result.ok).toBe(true);

      if (!result.ok) {
        throw new Error(
          `Expected ${content.id} journal context to resolve.`,
        );
      }

      expect(result.studyId).toBe(content.id);
      expect(result.trackId).toBe(content.trackId);
      expect(result.sourceTitleSnapshot).toBe(
        content.title,
      );
      expect(result.promptSnapshot.trim().length)
        .toBeGreaterThan(0);
    }

    expect(
      JSON.stringify(studyRuntimeCatalog.packages),
    ).toBe(before);
  });

  it("reconstructs a split prompt in editorial order", () => {
    expect(
      resolveRuntimeStudyJournalContext(
        "track-02-study-03",
      ),
    ).toEqual(
      expect.objectContaining({
        ok: true,
        promptSnapshot:
          "Em qual relacionamento ou situação Deus está me chamando a agir com mais justiça, verdade e integridade?",
      }),
    );
  });

  it("removes only isolated decorative markers from a journal prompt", () => {
    expect(
      resolveRuntimeStudyJournalContext(
        "track-03-study-02",
      ),
    ).toEqual(
      expect.objectContaining({
        ok: true,
        promptSnapshot:
          "Quem Jesus é para mim hoje - e o que minha rotina revela sobre essa resposta?",
      }),
    );

    const blocks = [
      {
        type: "PARAGRAPH",
        text: "Fé • vida",
      },
      {
        type: "PARAGRAPH",
        text: "•",
      },
      {
        type: "PARAGRAPH",
        text: "  segunda parte  ",
      },
    ] as readonly StudyContentBlock[];

    expect(
      buildStudyJournalPromptSnapshot(blocks),
    ).toBe("Fé • vida segunda parte");
  });

  it("preserves the explicit approved Track 5 V3 journal prompt", () => {
    const result =
      resolveRuntimeStudyJournalContext(
        "track-05-study-01",
      );

    expect(result.ok).toBe(true);

    if (!result.ok) {
      throw new Error(
        "Expected Track 5 study journal context.",
      );
    }

    expect(result.promptSnapshot).toBe(
      "O que mudou — ou ainda precisa mudar — na sua vida desde que você creu na obra que Cristo realizou por você?",
    );
  });

  it("fails closed for a missing runtime study", () => {
    expect(
      resolveRuntimeStudyJournalContext(
        "missing-study",
      ),
    ).toEqual({
      ok: false,
      code: "STUDY_NOT_FOUND",
    });
  });

  it("accepts STUDY as a typed JournalEntryEditor source context", () => {
    const context: JournalEntryEditorSourceContext = {
      sourceType: "STUDY",
      trackId: "track-02",
      studyId: "track-02-study-03",
      sourceTitleSnapshot:
        "Deus Justo: ninguém é invisível diante dele",
      promptSnapshot:
        "Em qual relacionamento ou situação Deus está me chamando a agir com mais justiça, verdade e integridade?",
    };

    expect(context.sourceType).toBe("STUDY");
    expect(context.trackId).toBe("track-02");
    expect(context.studyId).toBe(
      "track-02-study-03",
    );
  });

  it("creates a STUDY draft using the existing journal v7 persistence shape", async () => {
    const harness = createJournalServiceHarness();

    const draft =
      await harness.service.createStudyDraft({
        reflectionText:
          "Minha resposta ao estudo.",
        sourceTitleSnapshot:
          "Deus Justo: ninguém é invisível diante dele",
        promptSnapshot:
          "Em qual relacionamento ou situação Deus está me chamando a agir com mais justiça, verdade e integridade?",
      });

    expect(harness.now).toHaveBeenCalledTimes(1);
    expect(
      harness.toLocalDate,
    ).toHaveBeenCalledWith(NOW);
    expect(
      harness.toUtcTimestamp,
    ).toHaveBeenCalledWith(NOW);
    expect(
      harness.createId,
    ).toHaveBeenCalledTimes(1);
    expect(
      harness.createId,
    ).toHaveBeenCalledWith("journal_entry");

    expect(draft).toEqual({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
      reflectionText:
        "Minha resposta ao estudo.",
      gratitudeText: null,
      status: "DRAFT",
      sourceType: "STUDY",
      sourceTitleSnapshot:
        "Deus Justo: ninguém é invisível diante dele",
      promptSnapshot:
        "Em qual relacionamento ou situação Deus está me chamando a agir com mais justiça, verdade e integridade?",
      category: null,
      isPinned: false,
      references: [],
      tags: [],
      createdAtUtc: CREATED_AT,
      updatedAtUtc: CREATED_AT,
    } satisfies JournalEntryPersistenceRecord);

    expect(harness.create).toHaveBeenCalledWith(
      draft,
    );
  });

  it.each([
    ["", "Prompt válido"],
    ["Título válido", "   "],
  ])(
    "fails closed before persistence when STUDY snapshots are invalid",
    async (sourceTitleSnapshot, promptSnapshot) => {
      const harness = createJournalServiceHarness();

      await expect(
        harness.service.createStudyDraft({
          sourceTitleSnapshot,
          promptSnapshot,
        }),
      ).rejects.toThrow(
        sourceTitleSnapshot.trim().length === 0
          ? "PERSONAL_JOURNAL_STUDY_SOURCE_TITLE_INVALID"
          : "PERSONAL_JOURNAL_STUDY_PROMPT_INVALID",
      );

      expect(harness.create).not.toHaveBeenCalled();
      expect(harness.now).not.toHaveBeenCalled();
    },
  );
});
