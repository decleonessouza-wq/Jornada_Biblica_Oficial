const mockOpenDatabaseAsync = jest.fn();
const mockRunWebSQLiteBootstrapCriticalSection = jest.fn(
  (operation: () => Promise<unknown>) => operation(),
);

jest.mock("expo-sqlite", () => ({
  openDatabaseAsync: mockOpenDatabaseAsync,
}));

jest.mock("../src/services/webSQLiteBootstrapCriticalSection", () => ({
  runWebSQLiteBootstrapCriticalSection:
    mockRunWebSQLiteBootstrapCriticalSection,
}));

type MockDatabase = {
  execAsync: jest.Mock<Promise<void>, [string]>;
  getFirstAsync: jest.Mock<Promise<{ foreign_keys: number } | null>, [string]>;
  closeAsync: jest.Mock<Promise<void>, []>;
};

function createMockDatabase(foreignKeys = 1): MockDatabase {
  return {
    execAsync: jest.fn(async () => undefined),
    getFirstAsync: jest.fn(async () => ({ foreign_keys: foreignKeys })),
    closeAsync: jest.fn(async () => undefined),
  };
}

function loadConnectionModule(): typeof import("../src/data/personal/personalDatabaseConnection") {
  return require("../src/data/personal/personalDatabaseConnection");
}

function loadBootstrapModule(): typeof import("../src/data/personal/personalDatabaseBootstrap") {
  return require("../src/data/personal/personalDatabaseBootstrap");
}

describe("Personal SQLite bootstrap runtime contract", () => {
  beforeEach(() => {
    jest.resetModules();
    mockOpenDatabaseAsync.mockReset();
    mockRunWebSQLiteBootstrapCriticalSection.mockReset();
    mockRunWebSQLiteBootstrapCriticalSection.mockImplementation(
      (operation: () => Promise<unknown>) => operation(),
    );
  });

  it("T1 opens only the personal database through the shared Web critical section once", async () => {
    const database = createMockDatabase();
    mockOpenDatabaseAsync.mockResolvedValue(database);

    const connection = loadConnectionModule();

    const first = await connection.openPersonalDatabaseConnection();
    const second = await connection.openPersonalDatabaseConnection();

    expect(first).toBe(database);
    expect(second).toBe(database);
    expect(mockRunWebSQLiteBootstrapCriticalSection).toHaveBeenCalledTimes(1);
    expect(mockOpenDatabaseAsync).toHaveBeenCalledTimes(1);
    expect(mockOpenDatabaseAsync).toHaveBeenCalledWith(
      "biblia-jornada-personal.db",
    );
  });

  it("T2 shares the connection and close allows a clean reopen", async () => {
    const firstDatabase = createMockDatabase();
    const secondDatabase = createMockDatabase();

    mockOpenDatabaseAsync
      .mockResolvedValueOnce(firstDatabase)
      .mockResolvedValueOnce(secondDatabase);

    const connection = loadConnectionModule();

    const first = await connection.openPersonalDatabaseConnection();
    const shared = await connection.openPersonalDatabaseConnection();

    expect(first).toBe(firstDatabase);
    expect(shared).toBe(firstDatabase);
    expect(mockOpenDatabaseAsync).toHaveBeenCalledTimes(1);

    await connection.closePersonalDatabaseConnection();

    expect(firstDatabase.closeAsync).toHaveBeenCalledTimes(1);

    const reopened = await connection.openPersonalDatabaseConnection();

    expect(reopened).toBe(secondDatabase);
    expect(mockOpenDatabaseAsync).toHaveBeenCalledTimes(2);
    expect(mockRunWebSQLiteBootstrapCriticalSection).toHaveBeenCalledTimes(2);
  });

  it("T3 applies only WAL and foreign keys pragmas and validates foreign keys", async () => {
    const database = createMockDatabase(1);
    mockOpenDatabaseAsync.mockResolvedValue(database);

    const bootstrap = loadBootstrapModule();
    const result = await bootstrap.bootstrapPersonalDatabase();

    expect(result).toBe(database);
    expect(database.execAsync).toHaveBeenCalledTimes(2);
    expect(database.execAsync.mock.calls).toEqual([
      ["PRAGMA journal_mode = WAL;"],
      ["PRAGMA foreign_keys = ON;"],
    ]);
    expect(database.getFirstAsync).toHaveBeenCalledTimes(1);
    expect(database.getFirstAsync).toHaveBeenCalledWith(
      "PRAGMA foreign_keys;",
    );
    expect(database.closeAsync).not.toHaveBeenCalled();
  });

  it("T4 returns the same bootstrap promise while a successful bootstrap is in flight", async () => {
    const database = createMockDatabase(1);
    mockOpenDatabaseAsync.mockResolvedValue(database);

    const bootstrap = loadBootstrapModule();

    const firstPromise = bootstrap.bootstrapPersonalDatabase();
    const secondPromise = bootstrap.bootstrapPersonalDatabase();

    expect(secondPromise).toBe(firstPromise);

    await expect(firstPromise).resolves.toBe(database);
    expect(mockOpenDatabaseAsync).toHaveBeenCalledTimes(1);
    expect(database.execAsync).toHaveBeenCalledTimes(2);
    expect(database.getFirstAsync).toHaveBeenCalledTimes(1);
  });

  it("T5 closes the connection and rejects when foreign keys validation fails", async () => {
    const database = createMockDatabase(0);
    mockOpenDatabaseAsync.mockResolvedValue(database);

    const bootstrap = loadBootstrapModule();

    await expect(bootstrap.bootstrapPersonalDatabase()).rejects.toThrow(
      "PERSONAL_DATABASE_FOREIGN_KEYS_NOT_ENABLED",
    );

    expect(database.execAsync.mock.calls).toEqual([
      ["PRAGMA journal_mode = WAL;"],
      ["PRAGMA foreign_keys = ON;"],
    ]);
    expect(database.getFirstAsync).toHaveBeenCalledWith(
      "PRAGMA foreign_keys;",
    );
    expect(database.closeAsync).toHaveBeenCalledTimes(1);
  });

  it("T6 clears failed bootstrap state so the next call retries cleanly", async () => {
    const failingDatabase = createMockDatabase(0);
    const healthyDatabase = createMockDatabase(1);

    mockOpenDatabaseAsync
      .mockResolvedValueOnce(failingDatabase)
      .mockResolvedValueOnce(healthyDatabase);

    const bootstrap = loadBootstrapModule();

    await expect(bootstrap.bootstrapPersonalDatabase()).rejects.toThrow(
      "PERSONAL_DATABASE_FOREIGN_KEYS_NOT_ENABLED",
    );

    await expect(bootstrap.bootstrapPersonalDatabase()).resolves.toBe(
      healthyDatabase,
    );

    expect(failingDatabase.closeAsync).toHaveBeenCalledTimes(1);
    expect(mockOpenDatabaseAsync).toHaveBeenCalledTimes(2);
    expect(mockRunWebSQLiteBootstrapCriticalSection).toHaveBeenCalledTimes(2);
    expect(healthyDatabase.execAsync.mock.calls).toEqual([
      ["PRAGMA journal_mode = WAL;"],
      ["PRAGMA foreign_keys = ON;"],
    ]);
    expect(healthyDatabase.getFirstAsync).toHaveBeenCalledWith(
      "PRAGMA foreign_keys;",
    );
  });
});
