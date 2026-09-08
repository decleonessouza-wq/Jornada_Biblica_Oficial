jest.mock("../src/data/personal/personalDatabaseBootstrap", () => ({
  bootstrapPersonalDatabase: jest.fn(),
}));

import { PersonalDatabase } from "../src/data/personal/personalDatabase";
import { bootstrapPersonalDatabase } from "../src/data/personal/personalDatabaseBootstrap";
import type { PersonalCanonicalIdFactory } from "../src/domain/personal/personalIdentity";
import type { PersonalLogger } from "../src/domain/personal/personalLogging";
import {
  PERSONAL_PRIVACY_POLICY,
} from "../src/domain/personal/personalPrivacy";
import type {
  PersonalClock,
  PersonalDatePolicy,
} from "../src/domain/personal/personalTime";
import {
  ExpoCryptoPersonalCanonicalIdFactory,
  NoopPersonalLogger,
  SystemPersonalClock,
  SystemPersonalDatePolicy,
} from "../src/services/personalPlatformDefaults";
import {
  createPersonalPlatformHub,
  getPersonalPlatformHub,
  type PersonalPlatformHubOverrides,
} from "../src/services/personalPlatformHub";

const mockBootstrapPersonalDatabase =
  bootstrapPersonalDatabase as jest.MockedFunction<
    typeof bootstrapPersonalDatabase
  >;

describe("Personal platform hub", () => {
  beforeEach(() => {
    mockBootstrapPersonalDatabase.mockReset();
  });

  it("constructs the expected default dependencies and exact privacy policy", () => {
    expect(mockBootstrapPersonalDatabase).not.toHaveBeenCalled();

    const hub = createPersonalPlatformHub();

    expect(hub.database).toBeInstanceOf(PersonalDatabase);
    expect(hub.canonicalIdFactory).toBeInstanceOf(
      ExpoCryptoPersonalCanonicalIdFactory,
    );
    expect(hub.clock).toBeInstanceOf(SystemPersonalClock);
    expect(hub.datePolicy).toBeInstanceOf(SystemPersonalDatePolicy);
    expect(hub.logger).toBeInstanceOf(NoopPersonalLogger);
    expect(hub.privacyPolicy).toBe(PERSONAL_PRIVACY_POLICY);
    expect(mockBootstrapPersonalDatabase).not.toHaveBeenCalled();
  });

  it("honors explicit database, id, clock, date, and logger overrides", () => {
    const database = {} as PersonalDatabase;
    const canonicalIdFactory: PersonalCanonicalIdFactory = {
      create: jest.fn(),
    };
    const clock: PersonalClock = {
      now: jest.fn(() => new Date(0)),
    };
    const datePolicy: PersonalDatePolicy = {
      toUtcTimestamp: jest.fn(),
      toLocalDate: jest.fn(),
    };
    const logger: PersonalLogger = {
      log: jest.fn(),
    };

    const hub = createPersonalPlatformHub({
      database,
      canonicalIdFactory,
      clock,
      datePolicy,
      logger,
    });

    expect(hub.database).toBe(database);
    expect(hub.canonicalIdFactory).toBe(canonicalIdFactory);
    expect(hub.clock).toBe(clock);
    expect(hub.datePolicy).toBe(datePolicy);
    expect(hub.logger).toBe(logger);
    expect(hub.privacyPolicy).toBe(PERSONAL_PRIVACY_POLICY);
  });

  it("does not expose a runtime privacy policy override surface", () => {
    const overrides = {
      privacyPolicy: {
        storagePosture: "remote-first",
        remoteTelemetryEnabled: true,
      },
    } as unknown as PersonalPlatformHubOverrides;

    const hub = createPersonalPlatformHub(overrides);

    expect(hub.privacyPolicy).toBe(PERSONAL_PRIVACY_POLICY);
  });

  it("returns an immutable hub object", () => {
    const hub = createPersonalPlatformHub();

    expect(Object.isFrozen(hub)).toBe(true);
  });

  it("returns one stable lazy singleton without bootstrapping the database", () => {
    expect(mockBootstrapPersonalDatabase).not.toHaveBeenCalled();

    const first = getPersonalPlatformHub();
    const second = getPersonalPlatformHub();

    expect(first).toBe(second);
    expect(mockBootstrapPersonalDatabase).not.toHaveBeenCalled();
  });
});
