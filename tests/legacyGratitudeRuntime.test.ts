import AsyncStorage from "@react-native-async-storage/async-storage";

import { getPersonalPlatformHub } from "../src/services/personalPlatformHub";
import { migrateLegacyGratitude } from "../src/services/journal/legacyGratitudeMigration";
import {
  LEGACY_GRATITUDE_STORAGE_KEY,
  reconcileLegacyGratitudeRuntime,
  requestLegacyGratitudeRuntimeReconciliation,
} from "../src/services/journal/legacyGratitudeRuntime";

jest.mock(
  "@react-native-async-storage/async-storage",
  () => ({
    getItem: jest.fn(),
  }),
);

jest.mock(
  "../src/services/personalPlatformHub",
  () => ({
    getPersonalPlatformHub: jest.fn(),
  }),
);

jest.mock(
  "../src/services/journal/legacyGratitudeMigration",
  () => ({
    migrateLegacyGratitude: jest.fn(),
  }),
);

const mockedGetItem =
  AsyncStorage.getItem as jest.MockedFunction<
    typeof AsyncStorage.getItem
  >;

const mockedGetPersonalPlatformHub =
  getPersonalPlatformHub as jest.MockedFunction<
    typeof getPersonalPlatformHub
  >;

const mockedMigrateLegacyGratitude =
  migrateLegacyGratitude as jest.MockedFunction<
    typeof migrateLegacyGratitude
  >;

describe("legacy gratitude runtime bridge", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedGetPersonalPlatformHub.mockReturnValue({
      journalService: {
        listLegacyGratitudeMigrationEntries: jest.fn(),
        createLegacyGratitudeMigrationEntry: jest.fn(),
        updateLegacyGratitudeMigrationEntry: jest.fn(),
        removeLegacyGratitudeMigrationEntry: jest.fn(),
      },
    } as never);

    mockedMigrateLegacyGratitude.mockResolvedValue({
      status: "ALREADY_RECONCILED",
      legacyCount: 1,
      createdCount: 0,
      updatedCount: 0,
      removedCount: 0,
      reconciledCount: 1,
    });
  });

  it("reads gratitudeByDate at execution time and delegates to the Journal bridge", async () => {
    mockedGetItem.mockResolvedValue(
      JSON.stringify({
        "2026-09-11": "Hoje agradeço.",
      }),
    );

    await reconcileLegacyGratitudeRuntime();

    expect(mockedGetItem).toHaveBeenCalledWith(
      LEGACY_GRATITUDE_STORAGE_KEY,
    );
    expect(
      mockedMigrateLegacyGratitude,
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        listLegacyGratitudeMigrationEntries:
          expect.any(Function),
      }),
      {
        "2026-09-11": "Hoje agradeço.",
      },
    );
  });

  it("treats a missing legacy key as an empty source of truth", async () => {
    mockedGetItem.mockResolvedValue(null);

    await reconcileLegacyGratitudeRuntime();

    expect(
      mockedMigrateLegacyGratitude,
    ).toHaveBeenCalledWith(
      expect.anything(),
      {},
    );
  });

  it("fails closed on malformed legacy JSON", async () => {
    mockedGetItem.mockResolvedValue("{invalid");

    await expect(
      reconcileLegacyGratitudeRuntime(),
    ).rejects.toThrow(
      "PERSONAL_LEGACY_GRATITUDE_STORAGE_INVALID_JSON",
    );

    expect(
      mockedMigrateLegacyGratitude,
    ).not.toHaveBeenCalled();
  });

  it("serializes consecutive reconciliation requests and re-reads legacy state for each one", async () => {
    let releaseFirst!: () => void;
    let markFirstStarted!: () => void;

    const firstStarted = new Promise<void>(
      (resolve) => {
        markFirstStarted = resolve;
      },
    );

    mockedGetItem
      .mockResolvedValueOnce(
        JSON.stringify({
          "2026-09-10": "Primeira",
        }),
      )
      .mockResolvedValueOnce(
        JSON.stringify({
          "2026-09-10": "Segunda",
        }),
      );

    mockedMigrateLegacyGratitude
      .mockImplementationOnce(
        async () => {
          markFirstStarted();

          return new Promise((resolve) => {
            releaseFirst = () =>
              resolve({
                status: "MIGRATED",
                legacyCount: 1,
                createdCount: 1,
                updatedCount: 0,
                removedCount: 0,
                reconciledCount: 1,
              });
          });
        },
      )
      .mockResolvedValueOnce({
        status: "MIGRATED",
        legacyCount: 1,
        createdCount: 0,
        updatedCount: 1,
        removedCount: 0,
        reconciledCount: 1,
      });

    const first =
      reconcileLegacyGratitudeRuntime();
    const second =
      reconcileLegacyGratitudeRuntime();

    await firstStarted;

    expect(mockedGetItem).toHaveBeenCalledTimes(1);
    expect(
      mockedMigrateLegacyGratitude,
    ).toHaveBeenCalledTimes(1);

    releaseFirst();

    await first;
    await second;

    expect(mockedGetItem).toHaveBeenCalledTimes(2);
    expect(
      mockedMigrateLegacyGratitude,
    ).toHaveBeenCalledTimes(2);
  });

  it("safe activation logs a reconciliation failure without undoing the legacy mutation", async () => {
    mockedGetItem.mockRejectedValue(
      new Error("storage unavailable"),
    );
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    await expect(
      requestLegacyGratitudeRuntimeReconciliation(
        "reading-save",
      ),
    ).resolves.toBeNull();

    expect(consoleSpy).toHaveBeenCalledWith(
      "[LegacyGratitudeRuntime] reading-save reconciliation failed",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
