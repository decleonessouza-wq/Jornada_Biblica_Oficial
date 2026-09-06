import type { BibleRepository } from "../src/bible/repositories/bibleRepository";
import { createSQLiteBibleRepository } from "../src/bible/repositories/sqliteBibleRepository";
import { loadPreferredOfflineBibleVersion } from "../src/bible/state/bibleReaderPreferencesStore";
import {
  DAILY_CONTENT_720_CYCLE_ANCHOR_LOCAL_DATE,
  getDailyContent720CycleDayForDate,
  loadDailyContent720ForDate,
  resolveDailyContent720WithRepository,
} from "../src/services/dailyContent720Runtime";

jest.mock(
  "../src/bible/repositories/sqliteBibleRepository",
  () => ({
    createSQLiteBibleRepository: jest.fn(),
  }),
);

jest.mock(
  "../src/bible/state/bibleReaderPreferencesStore",
  () => ({
    loadPreferredOfflineBibleVersion: jest.fn(),
  }),
);

type VerseLookupRepository = Pick<BibleRepository, "getVerse">;

const createSQLiteBibleRepositoryMock =
  createSQLiteBibleRepository as jest.MockedFunction<
    typeof createSQLiteBibleRepository
  >;

const loadPreferredOfflineBibleVersionMock =
  loadPreferredOfflineBibleVersion as jest.MockedFunction<
    typeof loadPreferredOfflineBibleVersion
  >;

function makeVerseLookupRepository(
  text: string,
): VerseLookupRepository {
  return {
    getVerse: jest.fn(async (
      versionId,
      bookId,
      chapter,
      verse,
    ) => ({
      versionId,
      bookId,
      chapter,
      verse,
      text,
    })),
  };
}

describe("dailyContent720Runtime", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uses the explicit 2026-01-01 local civil-date anchor", () => {
    expect(DAILY_CONTENT_720_CYCLE_ANCHOR_LOCAL_DATE).toBe(
      "2026-01-01",
    );
    expect(
      getDailyContent720CycleDayForDate(
        new Date(2026, 0, 1, 23, 59, 59),
      ),
    ).toBe(1);
  });

  it("preserves the first calendar year's 1..365 semantics", () => {
    expect(
      getDailyContent720CycleDayForDate(
        new Date(2026, 11, 31, 12, 0, 0),
      ),
    ).toBe(365);
    expect(
      getDailyContent720CycleDayForDate(
        new Date(2027, 0, 1, 12, 0, 0),
      ),
    ).toBe(366);
  });

  it("reaches day 720 and wraps to day 1 on the following local date", () => {
    expect(
      getDailyContent720CycleDayForDate(
        new Date(2027, 11, 21, 12, 0, 0),
      ),
    ).toBe(720);
    expect(
      getDailyContent720CycleDayForDate(
        new Date(2027, 11, 22, 12, 0, 0),
      ),
    ).toBe(1);
  });

  it("uses local civil dates rather than elapsed local clock hours", () => {
    const beforeMidnight = new Date(2026, 2, 8, 23, 59, 59);
    const afterMidnight = new Date(2026, 2, 9, 0, 0, 1);

    expect(
      getDailyContent720CycleDayForDate(afterMidnight),
    ).toBe(
      getDailyContent720CycleDayForDate(beforeMidnight) + 1,
    );
  });

  it("wraps dates before the anchor deterministically", () => {
    expect(
      getDailyContent720CycleDayForDate(
        new Date(2025, 11, 31, 12, 0, 0),
      ),
    ).toBe(720);
  });

  it("fails closed for an invalid Date", () => {
    expect(() =>
      getDailyContent720CycleDayForDate(new Date(Number.NaN)),
    ).toThrow("DAILY_CONTENT_720_RUNTIME_INVALID_DATE");
  });

  it("resolves the selected cycle day from the repository and preserves version", async () => {
    const repository = makeVerseLookupRepository(
      "Bem-aventurado o homem...",
    );

    const resolved =
      await resolveDailyContent720WithRepository(
        1,
        "ALM1911",
        repository,
      );

    expect(repository.getVerse).toHaveBeenCalledWith(
      "ALM1911",
      "PSA",
      1,
      1,
    );
    expect(resolved).toMatchObject({
      cycleDay: 1,
      versionId: "ALM1911",
      verseText: "Bem-aventurado o homem...",
      content: {
        cycleDay: 1,
        verse: {
          reference: "Salmos 1:1",
          bookId: "PSA",
          chapter: 1,
          verse: 1,
        },
      },
    });
  });

  it("fails closed when the local corpus has no expected verse", async () => {
    const repository: VerseLookupRepository = {
      getVerse: jest.fn(async () => null),
    };

    await expect(
      resolveDailyContent720WithRepository(
        1,
        "BLIVRE",
        repository,
      ),
    ).rejects.toThrow(
      "DAILY_CONTENT_720_RUNTIME_VERSE_NOT_FOUND:BLIVRE:PSA:1:1",
    );
  });

  it("fails closed when repository coordinates do not match the requested verse", async () => {
    const repository: VerseLookupRepository = {
      getVerse: jest.fn(async () => ({
        versionId: "BLIVRE" as const,
        bookId: "PSA" as const,
        chapter: 1,
        verse: 2,
        text: "mismatch",
      })),
    };

    await expect(
      resolveDailyContent720WithRepository(
        1,
        "BLIVRE",
        repository,
      ),
    ).rejects.toThrow(
      "DAILY_CONTENT_720_RUNTIME_VERSE_RECORD_MISMATCH:1",
    );
  });

  it("fails closed for empty local verse text", async () => {
    const repository = makeVerseLookupRepository("   ");

    await expect(
      resolveDailyContent720WithRepository(
        1,
        "BLIVRE",
        repository,
      ),
    ).rejects.toThrow(
      "DAILY_CONTENT_720_RUNTIME_VERSE_TEXT_EMPTY:1",
    );
  });

  it("loads the preferred offline version and concrete SQLite repository", async () => {
    const repository = makeVerseLookupRepository(
      "Texto resolvido localmente",
    );

    loadPreferredOfflineBibleVersionMock.mockResolvedValue(
      "BLIVRE",
    );
    createSQLiteBibleRepositoryMock.mockResolvedValue(
      repository as never,
    );

    const resolved = await loadDailyContent720ForDate(
      new Date(2026, 0, 1, 8, 0, 0),
    );

    expect(loadPreferredOfflineBibleVersionMock).toHaveBeenCalledTimes(
      1,
    );
    expect(createSQLiteBibleRepositoryMock).toHaveBeenCalledTimes(1);
    expect(repository.getVerse).toHaveBeenCalledWith(
      "BLIVRE",
      "PSA",
      1,
      1,
    );
    expect(resolved.versionId).toBe("BLIVRE");
    expect(resolved.verseText).toBe(
      "Texto resolvido localmente",
    );
  });
});
