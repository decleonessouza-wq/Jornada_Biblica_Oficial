jest.mock("expo-crypto", () => ({
  randomUUID: jest.fn(),
}));

import * as Crypto from "expo-crypto";

import {
  definePersonalDiagnosticCode,
} from "../src/domain/personal/personalLogging";
import {
  ExpoCryptoPersonalCanonicalIdFactory,
  NoopPersonalLogger,
  SystemPersonalClock,
  SystemPersonalDatePolicy,
} from "../src/services/personalPlatformDefaults";

const mockRandomUUID = Crypto.randomUUID as jest.MockedFunction<
  typeof Crypto.randomUUID
>;

describe("Personal platform defaults", () => {
  beforeEach(() => {
    mockRandomUUID.mockReset();
  });

  it("returns expo-crypto UUIDs without adding a runtime kind prefix", () => {
    mockRandomUUID.mockReturnValue(
      "123e4567-e89b-12d3-a456-426614174000",
    );

    const factory = new ExpoCryptoPersonalCanonicalIdFactory();
    const id = factory.create("favorite");

    expect(id).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(mockRandomUUID).toHaveBeenCalledTimes(1);
  });

  it("returns a distinct Date object on each clock call", () => {
    const clock = new SystemPersonalClock();

    const first = clock.now();
    const second = clock.now();

    expect(first).toBeInstanceOf(Date);
    expect(second).toBeInstanceOf(Date);
    expect(second).not.toBe(first);
  });

  it("converts valid dates to canonical UTC ISO timestamps", () => {
    const policy = new SystemPersonalDatePolicy();
    const date = new Date("2026-09-08T01:02:03.456Z");

    expect(policy.toUtcTimestamp(date)).toBe(
      "2026-09-08T01:02:03.456Z",
    );
  });

  it("converts valid dates to local civil YYYY-MM-DD values", () => {
    const policy = new SystemPersonalDatePolicy();
    const localDate = new Date(2026, 8, 7, 12, 30, 0, 0);

    expect(policy.toLocalDate(localDate)).toBe("2026-09-07");
  });

  it("fails closed with RangeError for invalid UTC and local dates", () => {
    const policy = new SystemPersonalDatePolicy();
    const invalidDate = new Date(Number.NaN);

    expect(() => policy.toUtcTimestamp(invalidDate)).toThrow(RangeError);
    expect(() => policy.toLocalDate(invalidDate)).toThrow(RangeError);
  });

  it("NoopPersonalLogger produces no console log, warn, or error side effect", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => undefined);
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => undefined);
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => undefined);

    const logger = new NoopPersonalLogger();
    const code = definePersonalDiagnosticCode("PERSONAL_NOOP_LOGGER_TEST");

    logger.log("error", code, {
      attempt: 1,
      safe: true,
      optional: null,
    });

    expect(logSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
