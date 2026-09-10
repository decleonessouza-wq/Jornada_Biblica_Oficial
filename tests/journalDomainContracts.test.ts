import type { BibleReference } from "../src/domain/bible/bibleReference";
import {
  JOURNAL_CATEGORIES,
  JOURNAL_ENTRY_STATUSES,
  JOURNAL_GRATITUDE_MAX_CHARS,
  JOURNAL_REFLECTION_MAX_CHARS,
  JOURNAL_SOURCE_TYPES,
  type JournalEntry,
  type JournalEntryId,
  type JournalEntryPlatformAttributes,
  type JournalOrganizationAttributes,
  type JournalEntryReference,
  type JournalEntryReferenceId,
  type JournalEntryTag,
  type JournalTag,
  type JournalTagId,
} from "../src/domain/journal/journal";
import type {
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";

describe("Journal domain contracts", () => {
  it("locks the exact journal entry statuses without duplicates", () => {
    expect([...JOURNAL_ENTRY_STATUSES]).toEqual([
      "ACTIVE",
      "DRAFT",
      "TRASHED",
    ]);
    expect(new Set(JOURNAL_ENTRY_STATUSES).size).toBe(
      JOURNAL_ENTRY_STATUSES.length,
    );
  });

  it("locks the exact official journal categories without duplicates", () => {
    expect([...JOURNAL_CATEGORIES]).toEqual([
      "REFLECTION",
      "PRAYER",
      "GRATITUDE",
      "LEARNING",
      "PROMISE",
      "DECISION",
      "QUESTION",
      "TESTIMONY",
    ]);
    expect(new Set(JOURNAL_CATEGORIES).size).toBe(
      JOURNAL_CATEGORIES.length,
    );

    const organization: JournalOrganizationAttributes = {
      category: "REFLECTION",
      isPinned: true,
    };

    expect(organization).toEqual({
      category: "REFLECTION",
      isPinned: true,
    });
  });

  it("locks the exact journal source types without duplicates", () => {
    expect([...JOURNAL_SOURCE_TYPES]).toEqual([
      "FREE",
      "BIBLE",
      "PLAN",
      "STUDY",
      "HYMN",
      "HOME_GRATITUDE",
    ]);
    expect(new Set(JOURNAL_SOURCE_TYPES).size).toBe(
      JOURNAL_SOURCE_TYPES.length,
    );
  });

  it("preserves the existing journal text limits", () => {
    expect(JOURNAL_REFLECTION_MAX_CHARS).toBe(5000);
    expect(JOURNAL_GRATITUDE_MAX_CHARS).toBe(200);
  });

  it("supports typed platform attributes and nullable snapshots", () => {
    const attributes: JournalEntryPlatformAttributes = {
      status: "ACTIVE",
      sourceType: "BIBLE",
      sourceTitleSnapshot: "John 3",
      promptSnapshot: null,
    };

    expect(attributes).toEqual({
      status: "ACTIVE",
      sourceType: "BIBLE",
      sourceTitleSnapshot: "John 3",
      promptSnapshot: null,
    });
  });

  it("uses the canonical BibleReference contract for journal references", () => {
    const entryId = "journal-entry-1" as JournalEntryId;
    const referenceId =
      "journal-reference-1" as JournalEntryReferenceId;
    const bibleReference: BibleReference = {
      passages: [
        {
          kind: "VERSE",
          bookId: "JHN",
          chapter: 3,
          verse: 16,
        },
      ],
    };

    const journalReference: JournalEntryReference = {
      id: referenceId,
      entryId,
      position: 0,
      reference: bibleReference,
    };

    expect(journalReference.reference).toBe(bibleReference);
    expect(journalReference.position).toBe(0);
  });

  it("supports multiple ordered Bible references for one journal entry", () => {
    const entryId = "journal-entry-1" as JournalEntryId;

    const references: readonly JournalEntryReference[] = [
      {
        id: "journal-reference-1" as JournalEntryReferenceId,
        entryId,
        position: 0,
        reference: {
          passages: [
            {
              kind: "VERSE",
              bookId: "JHN",
              chapter: 3,
              verse: 16,
            },
          ],
        },
      },
      {
        id: "journal-reference-2" as JournalEntryReferenceId,
        entryId,
        position: 1,
        reference: {
          passages: [
            {
              kind: "CHAPTER",
              bookId: "PSA",
              chapter: 23,
            },
          ],
        },
      },
    ];

    expect(references.map((item) => item.entryId)).toEqual([
      entryId,
      entryId,
    ]);
    expect(references.map((item) => item.position)).toEqual([0, 1]);
  });

  it("supports typed tags and an N:N journal entry tag association", () => {
    const entryA = "journal-entry-a" as JournalEntryId;
    const entryB = "journal-entry-b" as JournalEntryId;
    const tagA: JournalTag = {
      id: "journal-tag-a" as JournalTagId,
      name: "Prayer",
      normalizedName: "prayer",
    };
    const tagB: JournalTag = {
      id: "journal-tag-b" as JournalTagId,
      name: "Study",
      normalizedName: "study",
    };

    const associations: readonly JournalEntryTag[] = [
      { entryId: entryA, tagId: tagA.id },
      { entryId: entryA, tagId: tagB.id },
      { entryId: entryB, tagId: tagA.id },
      { entryId: entryB, tagId: tagB.id },
    ];

    expect([tagA.normalizedName, tagB.normalizedName]).toEqual([
      "prayer",
      "study",
    ]);
    expect(associations).toHaveLength(4);
  });

  it("preserves the existing basic JournalEntry shape", () => {
    const entry: JournalEntry = {
      id: "journal-entry-1" as JournalEntryId,
      entryDate: "2026-09-10" as PersonalLocalDate,
      reflectionText: "Reflection",
      gratitudeText: null,
      createdAtUtc:
        "2026-09-10T12:00:00.000Z" as PersonalUtcTimestamp,
      updatedAtUtc:
        "2026-09-10T12:00:00.000Z" as PersonalUtcTimestamp,
    };

    expect(Object.keys(entry).sort()).toEqual(
      [
        "id",
        "entryDate",
        "reflectionText",
        "gratitudeText",
        "createdAtUtc",
        "updatedAtUtc",
      ].sort(),
    );
  });
});