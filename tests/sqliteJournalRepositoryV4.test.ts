import type {
  SQLiteDatabase,
} from "expo-sqlite";

import type {
  BiblePassage,
  BibleReference,
} from "../src/domain/bible/bibleReference";
import type {
  JournalEntry,
  JournalEntryId,
  JournalEntryReference,
  JournalEntryReferenceId,
  JournalTag,
  JournalTagId,
} from "../src/domain/journal/journal";
import type {
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  PersonalDatabase,
} from "../src/data/personal/personalDatabase";
import type {
  JournalEntryPersistenceRecord,
} from "../src/data/personal/journal/journalRepository";
import {
  SQLiteJournalRepository,
} from "../src/data/personal/journal/sqliteJournalRepository";

const ENTRY_ID =
  "journal-entry-a3" as JournalEntryId;
const OTHER_ENTRY_ID =
  "journal-entry-a3-other" as JournalEntryId;
const ENTRY_DATE =
  "2026-09-10" as PersonalLocalDate;
const CREATED_AT =
  "2026-09-10T12:00:00.000Z" as PersonalUtcTimestamp;
const UPDATED_AT =
  "2026-09-10T13:00:00.000Z" as PersonalUtcTimestamp;

function entryRow(
  overrides: Record<string, unknown> = {},
) {
  return {
    id: ENTRY_ID,
    entry_date: ENTRY_DATE,
    reflection_text: "Reflexão",
    gratitude_text: null,
    status: "ACTIVE",
    source_type: "FREE",
    source_title_snapshot: null,
    prompt_snapshot: null,
    category: null,
    is_pinned: 0,
    created_at_utc: CREATED_AT,
    updated_at_utc: CREATED_AT,
    ...overrides,
  };
}

function basicEntry(
  overrides: Partial<JournalEntry> = {},
): JournalEntry {
  return {
    id: ENTRY_ID,
    entryDate: ENTRY_DATE,
    reflectionText: "Reflexão",
    gratitudeText: null,
    createdAtUtc: CREATED_AT,
    updatedAtUtc: CREATED_AT,
    ...overrides,
  };
}

function journalReference(
  id: string,
  position: number,
  reference: BibleReference,
): JournalEntryReference {
  return {
    id: id as JournalEntryReferenceId,
    entryId: ENTRY_ID,
    position,
    reference,
  };
}

function journalTag(
  id: string,
  name: string,
  normalizedName: string,
): JournalTag {
  return {
    id: id as JournalTagId,
    name,
    normalizedName,
  };
}

function persistenceRecord(
  overrides: Partial<JournalEntryPersistenceRecord> = {},
): JournalEntryPersistenceRecord {
  return {
    ...basicEntry(),
    status: "ACTIVE",
    sourceType: "FREE",
    sourceTitleSnapshot: null,
    promptSnapshot: null,
    category: null,
    isPinned: false,
    references: [],
    tags: [],
    ...overrides,
  };
}

function createHarness() {
  const getAllAsync = jest.fn();
  const getFirstAsync = jest.fn();
  const runAsync = jest.fn();
  const withTransactionAsync = jest.fn(
    async (
      operation: () => Promise<void>,
    ): Promise<void> => {
      await operation();
    },
  );

  const database = {
    getAllAsync,
    getFirstAsync,
    runAsync,
    withTransactionAsync,
  } as unknown as SQLiteDatabase;

  const withConnection = jest.fn(
    async (
      operation: (
        database: SQLiteDatabase,
      ) => Promise<unknown>,
    ) => operation(database),
  );

  const personalDatabase = {
    withConnection,
  } as unknown as PersonalDatabase;

  const repository =
    new SQLiteJournalRepository(
      personalDatabase,
    );

  return {
    repository,
    getAllAsync,
    getFirstAsync,
    runAsync,
    withTransactionAsync,
    withConnection,
  };
}

describe("SQLiteJournalRepository v4", () => {
  it("maps a complete v4 entry with ordered references and tags", async () => {
    const harness = createHarness();

    harness.getFirstAsync.mockResolvedValueOnce(
      entryRow({
        status: "ACTIVE",
        source_type: "BIBLE",
        source_title_snapshot: "João 3",
        prompt_snapshot: "O que este texto revela?",
        category: "REFLECTION",
        is_pinned: 1,
      }),
    );

    harness.getAllAsync
      .mockResolvedValueOnce([
        {
          id: "ref-1",
          entry_id: ENTRY_ID,
          position: 0,
        },
      ])
      .mockResolvedValueOnce([
        {
          reference_id: "ref-1",
          position: 0,
          kind: "VERSE",
          book_id: "JHN",
          start_chapter: 3,
          start_verse: 16,
          end_chapter: null,
          end_verse: null,
        },
      ])
      .mockResolvedValueOnce([
        {
          id: "tag-faith",
          name: "Fé",
          normalized_name: "fe",
        },
      ]);

    await expect(
      harness.repository.findById(ENTRY_ID),
    ).resolves.toEqual({
      id: ENTRY_ID,
      entryDate: ENTRY_DATE,
      reflectionText: "Reflexão",
      gratitudeText: null,
      status: "ACTIVE",
      sourceType: "BIBLE",
      sourceTitleSnapshot: "João 3",
      promptSnapshot: "O que este texto revela?",
      category: "REFLECTION",
      isPinned: true,
      createdAtUtc: CREATED_AT,
      updatedAtUtc: CREATED_AT,
      references: [
        {
          id: "ref-1",
          entryId: ENTRY_ID,
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
      ],
      tags: [
        {
          id: "tag-faith",
          name: "Fé",
          normalizedName: "fe",
        },
      ],
    });
  });

  it("creates a basic legacy JournalEntry with exact v4 defaults and no relational writes", async () => {
    const harness = createHarness();
    harness.runAsync.mockResolvedValue({
      changes: 1,
    });

    await harness.repository.create(
      basicEntry(),
    );

    expect(
      harness.withTransactionAsync,
    ).not.toHaveBeenCalled();
    expect(harness.runAsync).toHaveBeenCalledTimes(1);

    const [
      sql,
      ...parameters
    ] = harness.runAsync.mock.calls[0] ?? [];

    expect(String(sql)).toContain(
      "INSERT INTO personal_journal_entries",
    );
    expect(parameters).toEqual([
      ENTRY_ID,
      ENTRY_DATE,
      "Reflexão",
      null,
      "ACTIVE",
      "FREE",
      null,
      null,
      null,
      0,
      CREATED_AT,
      CREATED_AT,
    ]);
  });

  it("updates a basic legacy JournalEntry without touching v4 metadata or relations", async () => {
    const harness = createHarness();

    harness.runAsync.mockResolvedValue({
      changes: 1,
    });

    await harness.repository.update(
      basicEntry({
        reflectionText: "Atualizado",
        updatedAtUtc: UPDATED_AT,
      }),
    );

    expect(
      harness.withTransactionAsync,
    ).not.toHaveBeenCalled();
    expect(harness.runAsync).toHaveBeenCalledTimes(1);

    const [
      sql,
      ...parameters
    ] = harness.runAsync.mock.calls[0] ?? [];

    const updateSql = String(sql);

    expect(updateSql).toContain(
      "UPDATE personal_journal_entries",
    );
    expect(updateSql).not.toContain("status = ?");
    expect(updateSql).not.toContain("source_type = ?");
    expect(updateSql).not.toContain("category = ?");
    expect(updateSql).not.toContain("is_pinned = ?");
    expect(updateSql).not.toContain(
      "personal_journal_entry_references",
    );
    expect(updateSql).not.toContain(
      "personal_journal_entry_tags",
    );
    expect(parameters).toEqual([
      ENTRY_DATE,
      "Atualizado",
      null,
      UPDATED_AT,
      ENTRY_ID,
    ]);
  });

  it("creates a complete record atomically with a compound reference using all five passage kinds", async () => {
    const harness = createHarness();

    harness.runAsync.mockResolvedValue({
      changes: 1,
    });

    const passages: readonly [
      BiblePassage,
      ...BiblePassage[],
    ] = [
      {
        kind: "WHOLE_BOOK",
        bookId: "PHM",
      },
      {
        kind: "CHAPTER",
        bookId: "PSA",
        chapter: 23,
      },
      {
        kind: "CHAPTER_RANGE",
        bookId: "MAT",
        startChapter: 5,
        endChapter: 7,
      },
      {
        kind: "VERSE",
        bookId: "JHN",
        chapter: 3,
        verse: 16,
      },
      {
        kind: "VERSE_RANGE",
        bookId: "ROM",
        start: {
          chapter: 8,
          verse: 28,
        },
        end: {
          chapter: 8,
          verse: 30,
        },
      },
    ];

    const record = persistenceRecord({
      status: "ACTIVE",
      sourceType: "BIBLE",
      sourceTitleSnapshot: "Leitura composta",
      promptSnapshot: "Registre o que aprendeu.",
      category: "PROMISE",
      isPinned: true,
      references: [
        journalReference(
          "ref-compound",
          0,
          {
            passages,
          },
        ),
      ],
    });

    await harness.repository.create(record);

    expect(
      harness.withTransactionAsync,
    ).toHaveBeenCalledTimes(1);

    const entryInsertCall =
      harness.runAsync.mock.calls.find(
        ([sql]) =>
          String(sql).includes(
            "INSERT INTO personal_journal_entries",
          ),
      );

    expect(entryInsertCall).toBeDefined();
    expect(String(entryInsertCall?.[0])).toContain(
      "category",
    );
    expect(String(entryInsertCall?.[0])).toContain(
      "is_pinned",
    );
    expect(entryInsertCall?.slice(1)).toEqual([
      ENTRY_ID,
      ENTRY_DATE,
      "Reflexão",
      null,
      "ACTIVE",
      "BIBLE",
      "Leitura composta",
      "Registre o que aprendeu.",
      "PROMISE",
      1,
      CREATED_AT,
      CREATED_AT,
    ]);

    const passageCalls =
      harness.runAsync.mock.calls.filter(
        ([sql]) =>
          String(sql).includes(
            "INSERT INTO personal_journal_reference_passages",
          ),
      );

    expect(passageCalls).toHaveLength(5);
    expect(
      passageCalls.map(
        (call) => call[3],
      ),
    ).toEqual([
      "WHOLE_BOOK",
      "CHAPTER",
      "CHAPTER_RANGE",
      "VERSE",
      "VERSE_RANGE",
    ]);
    expect(
      passageCalls.map(
        (call) => call[2],
      ),
    ).toEqual([0, 1, 2, 3, 4]);
  });

  it("updates a complete record atomically and replaces only entry relations, not tag rows", async () => {
    const harness = createHarness();

    harness.runAsync.mockResolvedValue({
      changes: 1,
    });
    harness.getFirstAsync.mockResolvedValue({
      id: "tag-prayer",
      name: "Oração",
      normalized_name: "oracao",
    });

    const record = persistenceRecord({
      updatedAtUtc: UPDATED_AT,
      status: "ACTIVE",
      sourceType: "PLAN",
      sourceTitleSnapshot: "Plano anual",
      promptSnapshot: "Aplicação do dia",
      category: "PRAYER",
      isPinned: true,
      references: [
        journalReference(
          "ref-plan",
          0,
          {
            passages: [
              {
                kind: "CHAPTER",
                bookId: "GEN",
                chapter: 1,
              },
            ],
          },
        ),
      ],
      tags: [
        journalTag(
          "tag-prayer",
          "Oração",
          "oracao",
        ),
      ],
    });

    await harness.repository.update(record);

    expect(
      harness.withTransactionAsync,
    ).toHaveBeenCalledTimes(1);

    const allSql = harness.runAsync.mock.calls
      .map(([sql]) => String(sql));

    const updateEntryCall =
      harness.runAsync.mock.calls.find(
        ([sql]) =>
          String(sql).includes(
            "UPDATE personal_journal_entries",
          ),
      );

    expect(updateEntryCall).toBeDefined();
    expect(String(updateEntryCall?.[0])).toContain(
      "category = ?",
    );
    expect(String(updateEntryCall?.[0])).toContain(
      "is_pinned = ?",
    );
    expect(updateEntryCall?.slice(1)).toEqual([
      ENTRY_DATE,
      "Reflexão",
      null,
      "ACTIVE",
      "PLAN",
      "Plano anual",
      "Aplicação do dia",
      "PRAYER",
      1,
      UPDATED_AT,
      ENTRY_ID,
    ]);

    expect(
      allSql.some(
        (sql) =>
          sql.includes(
            "DELETE FROM personal_journal_entry_references",
          ),
      ),
    ).toBe(true);
    expect(
      allSql.some(
        (sql) =>
          sql.includes(
            "DELETE FROM personal_journal_entry_tags",
          ),
      ),
    ).toBe(true);
    expect(
      allSql.some(
        (sql) =>
          sql.includes(
            "DELETE FROM personal_journal_tags",
          ),
      ),
    ).toBe(false);
  });

  it("lists multiple entries for the same date with deterministic id-desc SQL", async () => {
    const harness = createHarness();

    harness.getAllAsync
      .mockResolvedValueOnce([
        entryRow({
          id: OTHER_ENTRY_ID,
        }),
        entryRow({
          id: ENTRY_ID,
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const result =
      await harness.repository.listByDate(
        ENTRY_DATE,
      );

    expect(result).toHaveLength(2);

    const entrySql = String(
      harness.getAllAsync.mock.calls[0]?.[0],
    );

    expect(entrySql).toContain(
      "WHERE entry_date = ?",
    );
    expect(entrySql).toContain(
      "ORDER BY id DESC",
    );
    expect(
      harness.getAllAsync.mock.calls[0]?.[1],
    ).toBe(ENTRY_DATE);
  });

  it("keeps findByDate deterministic for the compatibility bridge", async () => {
    const harness = createHarness();

    harness.getFirstAsync.mockResolvedValueOnce(
      null,
    );

    await expect(
      harness.repository.findByDate(
        ENTRY_DATE,
      ),
    ).resolves.toBeNull();

    const sql = String(
      harness.getFirstAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "WHERE entry_date = ?",
    );
    expect(sql).toContain(
      "ORDER BY id DESC",
    );
    expect(sql).toContain("LIMIT 1");
  });

  it("lists tags and finds a tag by normalized name deterministically", async () => {
    const listHarness = createHarness();

    listHarness.getAllAsync.mockResolvedValueOnce([
      {
        id: "tag-faith",
        name: "Fé",
        normalized_name: "fe",
      },
      {
        id: "tag-prayer",
        name: "Oração",
        normalized_name: "oracao",
      },
    ]);

    await expect(
      listHarness.repository.listTags(),
    ).resolves.toEqual([
      {
        id: "tag-faith",
        name: "Fé",
        normalizedName: "fe",
      },
      {
        id: "tag-prayer",
        name: "Oração",
        normalizedName: "oracao",
      },
    ]);

    expect(
      String(listHarness.getAllAsync.mock.calls[0]?.[0]),
    ).toContain(
      "ORDER BY normalized_name ASC, id ASC",
    );

    const findHarness = createHarness();

    findHarness.getFirstAsync.mockResolvedValueOnce({
      id: "tag-prayer",
      name: "Oração",
      normalized_name: "oracao",
    });

    await expect(
      findHarness.repository.findTagByNormalizedName(
        "oracao",
      ),
    ).resolves.toEqual({
      id: "tag-prayer",
      name: "Oração",
      normalizedName: "oracao",
    });

    expect(
      findHarness.getFirstAsync.mock.calls[0]?.[1],
    ).toBe("oracao");
  });

  it("searches only active and draft entries with deterministic offset pagination", async () => {
    const harness = createHarness();

    harness.getAllAsync.mockImplementation(
      async (sql: unknown) => {
        if (
          String(sql).includes(
            "FROM personal_journal_entries",
          )
        ) {
          return [
            entryRow({
              id: "journal-entry-3",
            }),
            entryRow({
              id: "journal-entry-2",
            }),
            entryRow({
              id: "journal-entry-1",
            }),
          ];
        }

        return [];
      },
    );

    const page = await harness.repository.search({
      offset: 0,
      limit: 2,
    });

    expect(
      page.items.map((entry) => entry.id),
    ).toEqual([
      "journal-entry-3",
      "journal-entry-2",
    ]);
    expect(page.nextOffset).toBe(2);

    const [sql, ...parameters] =
      harness.getAllAsync.mock.calls[0] ?? [];

    expect(String(sql)).toContain(
      "status IN ('ACTIVE', 'DRAFT')",
    );
    expect(String(sql)).toContain(
      "ORDER BY entry_date DESC, id DESC",
    );
    expect(String(sql)).toContain(
      "LIMIT ? OFFSET ?",
    );
    expect(parameters.slice(-2)).toEqual([
      3,
      0,
    ]);
  });

  it("composes text category tag period passage and pin filters with bound parameters", async () => {
    const harness = createHarness();

    harness.getAllAsync.mockResolvedValueOnce([]);

    const page = await harness.repository.search({
      text: "fé_100%",
      category: "PRAYER",
      tagId: "tag-prayer" as JournalTagId,
      dateFrom:
        "2026-09-01" as PersonalLocalDate,
      dateTo:
        "2026-09-30" as PersonalLocalDate,
      passage: {
        bookId: "JHN",
        chapter: 3,
        verse: 16,
      },
      isPinned: true,
      offset: 5,
      limit: 10,
    });

    expect(page).toEqual({
      items: [],
      nextOffset: null,
    });

    const [sql, ...parameters] =
      harness.getAllAsync.mock.calls[0] ?? [];

    const querySql = String(sql);

    expect(querySql).toContain(
      "COALESCE(reflection_text, '') LIKE ?",
    );
    expect(querySql).toContain(
      "category = ?",
    );
    expect(querySql).toContain(
      "personal_journal_entry_tags AS search_entry_tag",
    );
    expect(querySql).toContain(
      "entry_date >= ?",
    );
    expect(querySql).toContain(
      "entry_date <= ?",
    );
    expect(querySql).toContain(
      "personal_journal_reference_passages AS search_passage",
    );
    expect(querySql).toContain(
      "search_passage.start_verse = ?",
    );
    expect(querySql).toContain(
      "is_pinned = ?",
    );
    expect(querySql).not.toContain("fé_100%");
    expect(parameters).toContain(
      "%fé\\_100\\%%",
    );
    expect(parameters).toContain("PRAYER");
    expect(parameters).toContain(
      "tag-prayer",
    );
    expect(parameters).toContain(
      "2026-09-01",
    );
    expect(parameters).toContain(
      "2026-09-30",
    );
    expect(parameters).toContain("JHN");
    expect(parameters).toContain(16);
    expect(parameters).toContain(1);
    expect(parameters.slice(-2)).toEqual([
      11,
      5,
    ]);
  });

  it("supports explicit uncategorized filtering without inventing a category parameter", async () => {
    const harness = createHarness();

    harness.getAllAsync.mockResolvedValueOnce([]);

    await harness.repository.search({
      category: null,
      offset: 0,
      limit: 20,
    });

    const [sql, ...parameters] =
      harness.getAllAsync.mock.calls[0] ?? [];

    expect(String(sql)).toContain(
      "category IS NULL",
    );
    expect(parameters).toEqual([
      21,
      0,
    ]);
  });

  it.each([
    [
      {
        offset: -1,
        limit: 10,
      },
      "PERSONAL_JOURNAL_SEARCH_OFFSET_INVALID",
    ],
    [
      {
        offset: 0,
        limit: 0,
      },
      "PERSONAL_JOURNAL_SEARCH_LIMIT_INVALID",
    ],
    [
      {
        dateFrom: "2026-09-30",
        dateTo: "2026-09-01",
        offset: 0,
        limit: 10,
      },
      "PERSONAL_JOURNAL_SEARCH_DATE_RANGE_INVALID",
    ],
    [
      {
        passage: {
          bookId: "JHN",
          verse: 16,
        },
        offset: 0,
        limit: 10,
      },
      "PERSONAL_JOURNAL_SEARCH_PASSAGE_CHAPTER_REQUIRED",
    ],
    [
      {
        category: "BROKEN",
        offset: 0,
        limit: 10,
      },
      "PERSONAL_JOURNAL_SEARCH_CATEGORY_INVALID",
    ],
  ] as const)(
    "fails closed for malformed search query %#",
    async (query, errorCode) => {
      const harness = createHarness();

      await expect(
        harness.repository.search(
          query as never,
        ),
      ).rejects.toThrow(errorCode);

      expect(
        harness.withConnection,
      ).not.toHaveBeenCalled();
      expect(
        harness.getAllAsync,
      ).not.toHaveBeenCalled();
    },
  );
  it("supports zero references and zero tags on a mapped record", async () => {
    const harness = createHarness();

    harness.getFirstAsync.mockResolvedValueOnce(
      entryRow(),
    );
    harness.getAllAsync
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const result =
      await harness.repository.findById(
        ENTRY_ID,
      );

    expect(result?.references).toEqual([]);
    expect(result?.tags).toEqual([]);
  });

  it("preserves reference and passage ordering from persistence", async () => {
    const harness = createHarness();

    harness.getFirstAsync.mockResolvedValueOnce(
      entryRow(),
    );

    harness.getAllAsync
      .mockResolvedValueOnce([
        {
          id: "ref-a",
          entry_id: ENTRY_ID,
          position: 0,
        },
        {
          id: "ref-b",
          entry_id: ENTRY_ID,
          position: 1,
        },
      ])
      .mockResolvedValueOnce([
        {
          reference_id: "ref-a",
          position: 0,
          kind: "CHAPTER",
          book_id: "GEN",
          start_chapter: 1,
          start_verse: null,
          end_chapter: null,
          end_verse: null,
        },
        {
          reference_id: "ref-a",
          position: 1,
          kind: "VERSE",
          book_id: "JHN",
          start_chapter: 1,
          start_verse: 1,
          end_chapter: null,
          end_verse: null,
        },
      ])
      .mockResolvedValueOnce([
        {
          reference_id: "ref-b",
          position: 0,
          kind: "WHOLE_BOOK",
          book_id: "PHM",
          start_chapter: null,
          start_verse: null,
          end_chapter: null,
          end_verse: null,
        },
      ])
      .mockResolvedValueOnce([]);

    const result =
      await harness.repository.findById(
        ENTRY_ID,
      );

    expect(
      result?.references.map(
        (reference) => reference.position,
      ),
    ).toEqual([0, 1]);
    expect(
      result?.references[0]?.reference.passages.map(
        (passage) => passage.kind,
      ),
    ).toEqual([
      "CHAPTER",
      "VERSE",
    ]);
  });

  it("persists tags as N:N associations and reuses an exact canonical tag", async () => {
    const harness = createHarness();

    harness.runAsync.mockResolvedValue({
      changes: 1,
    });
    harness.getFirstAsync
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: "tag-faith",
        name: "Fé",
        normalized_name: "fe",
      });

    const record = persistenceRecord({
      tags: [
        journalTag(
          "tag-prayer",
          "Oração",
          "oracao",
        ),
        journalTag(
          "tag-faith",
          "Fé",
          "fe",
        ),
      ],
    });

    await harness.repository.create(record);

    const sqlCalls = harness.runAsync.mock.calls
      .map(([sql]) => String(sql));

    expect(
      sqlCalls.filter(
        (sql) =>
          sql.includes(
            "INSERT INTO personal_journal_tags",
          ),
      ),
    ).toHaveLength(1);

    expect(
      sqlCalls.filter(
        (sql) =>
          sql.includes(
            "INSERT INTO personal_journal_entry_tags",
          ),
      ),
    ).toHaveLength(2);
  });

  it("fails closed for a canonical tag conflict instead of replacing the stored tag", async () => {
    const harness = createHarness();

    harness.runAsync.mockResolvedValue({
      changes: 1,
    });
    harness.getFirstAsync.mockResolvedValueOnce({
      id: "other-tag-id",
      name: "Fé",
      normalized_name: "fe",
    });

    const record = persistenceRecord({
      tags: [
        journalTag(
          "tag-faith",
          "Fé",
          "fe",
        ),
      ],
    });

    await expect(
      harness.repository.create(record),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_TAG_CANONICAL_CONFLICT",
    );
  });

  it.each([
    {
      field: "status",
      value: "UNKNOWN_STATUS",
      error:
        "PERSONAL_JOURNAL_ROW_STATUS_INVALID",
    },
    {
      field: "source_type",
      value: "UNKNOWN_SOURCE",
      error:
        "PERSONAL_JOURNAL_ROW_SOURCE_TYPE_INVALID",
    },
    {
      field: "category",
      value: "UNKNOWN_CATEGORY",
      error:
        "PERSONAL_JOURNAL_ROW_CATEGORY_INVALID",
    },
    {
      field: "is_pinned",
      value: 2,
      error:
        "PERSONAL_JOURNAL_ROW_IS_PINNED_INVALID",
    },
  ])(
    "fails closed for invalid persisted $field",
    async ({ field, value, error }) => {
      const harness = createHarness();

      harness.getFirstAsync.mockResolvedValueOnce(
        entryRow({
          [field]: value,
        }),
      );

      await expect(
        harness.repository.findById(
          ENTRY_ID,
        ),
      ).rejects.toThrow(error);
    },
  );

  it("accepts an empty-content DRAFT but rejects empty-content ACTIVE rows", async () => {
    const draftHarness = createHarness();

    draftHarness.getFirstAsync.mockResolvedValueOnce(
      entryRow({
        reflection_text: null,
        gratitude_text: null,
        status: "DRAFT",
      }),
    );
    draftHarness.getAllAsync
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    await expect(
      draftHarness.repository.findById(
        ENTRY_ID,
      ),
    ).resolves.toEqual(
      expect.objectContaining({
        status: "DRAFT",
        reflectionText: null,
        gratitudeText: null,
      }),
    );

    const activeHarness = createHarness();

    activeHarness.getFirstAsync.mockResolvedValueOnce(
      entryRow({
        reflection_text: null,
        gratitude_text: null,
        status: "ACTIVE",
      }),
    );

    await expect(
      activeHarness.repository.findById(
        ENTRY_ID,
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_ROW_CONTENT_REQUIRED",
    );
  });

  it("fails closed for structurally invalid persisted passage data", async () => {
    const harness = createHarness();

    harness.getFirstAsync.mockResolvedValueOnce(
      entryRow(),
    );

    harness.getAllAsync
      .mockResolvedValueOnce([
        {
          id: "ref-invalid",
          entry_id: ENTRY_ID,
          position: 0,
        },
      ])
      .mockResolvedValueOnce([
        {
          reference_id: "ref-invalid",
          position: 0,
          kind: "CHAPTER",
          book_id: "GEN",
          start_chapter: null,
          start_verse: null,
          end_chapter: null,
          end_verse: null,
        },
      ]);

    await expect(
      harness.repository.findById(
        ENTRY_ID,
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_PASSAGE_CHAPTER_INVALID",
    );
  });

  it("fails closed for invalid persisted core row data", async () => {
    const harness = createHarness();

    harness.getFirstAsync.mockResolvedValueOnce(
      entryRow({
        entry_date: "2026-02-30",
      }),
    );

    await expect(
      harness.repository.findById(
        ENTRY_ID,
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_ROW_ENTRY_DATE_INVALID",
    );
  });

  it("reports target-not-found for basic update and remove", async () => {
    const updateHarness = createHarness();

    updateHarness.runAsync.mockResolvedValue({
      changes: 0,
    });

    await expect(
      updateHarness.repository.update(
        basicEntry(),
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_UPDATE_TARGET_NOT_FOUND",
    );

    const removeHarness = createHarness();

    removeHarness.runAsync.mockResolvedValue({
      changes: 0,
    });

    await expect(
      removeHarness.repository.remove(
        ENTRY_ID,
      ),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_REMOVE_TARGET_NOT_FOUND",
    );
  });

  it("removes only the journal entry and never issues a direct tag delete", async () => {
    const harness = createHarness();

    harness.runAsync.mockResolvedValue({
      changes: 1,
    });

    await harness.repository.remove(ENTRY_ID);

    expect(harness.runAsync).toHaveBeenCalledTimes(1);

    const sql = String(
      harness.runAsync.mock.calls[0]?.[0],
    );

    expect(sql).toContain(
      "DELETE FROM personal_journal_entries",
    );
    expect(sql).not.toContain(
      "DELETE FROM personal_journal_tags",
    );
  });

  it.each([
    [
      {
        category: "BROKEN",
      },
      "PERSONAL_JOURNAL_CATEGORY_INVALID",
    ],
    [
      {
        isPinned: 1,
      },
      "PERSONAL_JOURNAL_IS_PINNED_INVALID",
    ],
  ] as const)(
    "rejects malformed organization input before persistence %#",
    async (overrides, errorCode) => {
      const harness = createHarness();

      const malformed =
        {
          ...persistenceRecord(),
          ...overrides,
        } as unknown as JournalEntryPersistenceRecord;

      await expect(
        harness.repository.create(malformed),
      ).rejects.toThrow(errorCode);

      expect(
        harness.withConnection,
      ).not.toHaveBeenCalled();
      expect(
        harness.withTransactionAsync,
      ).not.toHaveBeenCalled();
      expect(harness.runAsync).not.toHaveBeenCalled();
    },
  );

  it("rejects a malformed complete input before any persistence side effect", async () => {
    const harness = createHarness();

    const malformed =
      {
        ...persistenceRecord(),
        status: "BROKEN",
      } as unknown as JournalEntryPersistenceRecord;

    await expect(
      harness.repository.create(malformed),
    ).rejects.toThrow(
      "PERSONAL_JOURNAL_ENTRY_STATUS_INVALID",
    );

    expect(
      harness.withConnection,
    ).not.toHaveBeenCalled();
    expect(
      harness.withTransactionAsync,
    ).not.toHaveBeenCalled();
    expect(harness.runAsync).not.toHaveBeenCalled();
  });
});