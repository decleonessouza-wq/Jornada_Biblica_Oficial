jest.mock("../src/data/personal/personalDatabaseBootstrap", () => ({
  bootstrapPersonalDatabase: jest.fn(),
}));

import type { SQLiteDatabase } from "expo-sqlite";

import { PersonalDatabase } from "../src/data/personal/personalDatabase";
import { PersonalRepositoryBase } from "../src/data/personal/personalRepositoryBase";
import { bootstrapPersonalDatabase } from "../src/data/personal/personalDatabaseBootstrap";
import {
  definePersonalDiagnosticCode,
  type PersonalLogger,
} from "../src/domain/personal/personalLogging";
import {
  PERSONAL_PRIVACY_POLICY,
} from "../src/domain/personal/personalPrivacy";

const mockBootstrapPersonalDatabase =
  bootstrapPersonalDatabase as jest.MockedFunction<
    typeof bootstrapPersonalDatabase
  >;

class TestPersonalRepository extends PersonalRepositoryBase {
  constructor(database: PersonalDatabase) {
    super(database);
  }

  getDatabase(): PersonalDatabase {
    return this.personalDatabase;
  }
}

describe("Personal platform contracts", () => {
  beforeEach(() => {
    mockBootstrapPersonalDatabase.mockReset();
  });

  it("PersonalDatabase lazily delegates through bootstrap and passes the database to the operation", async () => {
    const sqliteDatabase = {} as SQLiteDatabase;
    mockBootstrapPersonalDatabase.mockResolvedValue(sqliteDatabase);

    const database = new PersonalDatabase();

    expect(mockBootstrapPersonalDatabase).not.toHaveBeenCalled();

    const result = await database.withConnection(async (connection) => {
      expect(connection).toBe(sqliteDatabase);

      return "operation-result";
    });

    expect(result).toBe("operation-result");
    expect(mockBootstrapPersonalDatabase).toHaveBeenCalledTimes(1);
  });

  it("PersonalRepositoryBase preserves the explicit PersonalDatabase dependency", () => {
    const database = new PersonalDatabase();
    const repository = new TestPersonalRepository(database);

    expect(repository.getDatabase()).toBe(database);
  });

  it("locks the exact local-first privacy posture and logging restrictions", () => {
    expect(PERSONAL_PRIVACY_POLICY).toEqual({
      storagePosture: "local-first",
      remoteTelemetryEnabled: false,
      rawPersonalDataInLogsAllowed: false,
      rawErrorObjectsInLogsAllowed: false,
      errorMessageInLogsAllowed: false,
      errorStackInLogsAllowed: false,
      rawCanonicalIdsInLogsAllowed: false,
      rawDatesAndTimestampsInLogsAllowed: false,
      userGeneratedTextInLogsAllowed: false,
      secretOrCredentialLoggingAllowed: false,
      stringMetadataValuesAllowed: false,
    });
  });

  it("preserves developer-defined diagnostic code identity without transforming it", () => {
    const code = definePersonalDiagnosticCode(
      "PERSONAL_FOUNDATION_TEST_DIAGNOSTIC",
    );

    expect(code).toBe("PERSONAL_FOUNDATION_TEST_DIAGNOSTIC");
  });

  it("keeps PersonalLogger metadata structurally limited to safe primitive values", () => {
    const logger: PersonalLogger = {
      log: jest.fn(),
    };
    const code = definePersonalDiagnosticCode("PERSONAL_SAFE_METADATA_TEST");

    logger.log("info", code, {
      enabled: true,
      count: 2,
      optional: null,
    });

    expect(logger.log).toHaveBeenCalledWith("info", code, {
      enabled: true,
      count: 2,
      optional: null,
    });
  });
});
