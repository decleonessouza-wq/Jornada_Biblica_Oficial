import * as Crypto from "expo-crypto";

import type {
  PersonalCanonicalId,
  PersonalCanonicalIdFactory,
} from "../domain/personal/personalIdentity";
import type {
  PersonalClock,
  PersonalDatePolicy,
  PersonalLocalDate,
  PersonalUtcTimestamp,
} from "../domain/personal/personalTime";
import type {
  PersonalDiagnosticCode,
  PersonalLogLevel,
  PersonalLogger,
  PersonalLogSafeMetadata,
} from "../domain/personal/personalLogging";

function assertValidDate(date: Date): void {
  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Invalid date");
  }
}

export class ExpoCryptoPersonalCanonicalIdFactory
  implements PersonalCanonicalIdFactory
{
  create<TKind extends string>(
    kind: TKind,
  ): PersonalCanonicalId<TKind> {
    return Crypto.randomUUID() as PersonalCanonicalId<typeof kind>;
  }
}

export class SystemPersonalClock implements PersonalClock {
  now(): Date {
    return new Date();
  }
}

export class SystemPersonalDatePolicy implements PersonalDatePolicy {
  toUtcTimestamp(date: Date): PersonalUtcTimestamp {
    assertValidDate(date);

    return date.toISOString() as PersonalUtcTimestamp;
  }

  toLocalDate(date: Date): PersonalLocalDate {
    assertValidDate(date);

    const year = String(date.getFullYear()).padStart(4, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}` as PersonalLocalDate;
  }
}

export class NoopPersonalLogger implements PersonalLogger {
  log(
    level: PersonalLogLevel,
    code: PersonalDiagnosticCode,
    metadata?: PersonalLogSafeMetadata,
  ): void {
    void level;
    void code;
    void metadata;
  }
}
