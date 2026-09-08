import { PersonalDatabase } from "../data/personal/personalDatabase";
import type { PersonalCanonicalIdFactory } from "../domain/personal/personalIdentity";
import type { PersonalLogger } from "../domain/personal/personalLogging";
import {
  PERSONAL_PRIVACY_POLICY,
  type PersonalPrivacyPolicy,
} from "../domain/personal/personalPrivacy";
import type {
  PersonalClock,
  PersonalDatePolicy,
} from "../domain/personal/personalTime";
import {
  ExpoCryptoPersonalCanonicalIdFactory,
  NoopPersonalLogger,
  SystemPersonalClock,
  SystemPersonalDatePolicy,
} from "./personalPlatformDefaults";

export interface PersonalPlatformHub {
  readonly database: PersonalDatabase;
  readonly canonicalIdFactory: PersonalCanonicalIdFactory;
  readonly clock: PersonalClock;
  readonly datePolicy: PersonalDatePolicy;
  readonly logger: PersonalLogger;
  readonly privacyPolicy: PersonalPrivacyPolicy;
}

export interface PersonalPlatformHubOverrides {
  readonly database?: PersonalDatabase;
  readonly canonicalIdFactory?: PersonalCanonicalIdFactory;
  readonly clock?: PersonalClock;
  readonly datePolicy?: PersonalDatePolicy;
  readonly logger?: PersonalLogger;
}

export function createPersonalPlatformHub(
  overrides: PersonalPlatformHubOverrides = {},
): PersonalPlatformHub {
  const hub: PersonalPlatformHub = {
    database: overrides.database ?? new PersonalDatabase(),
    canonicalIdFactory:
      overrides.canonicalIdFactory ??
      new ExpoCryptoPersonalCanonicalIdFactory(),
    clock: overrides.clock ?? new SystemPersonalClock(),
    datePolicy: overrides.datePolicy ?? new SystemPersonalDatePolicy(),
    logger: overrides.logger ?? new NoopPersonalLogger(),
    privacyPolicy: PERSONAL_PRIVACY_POLICY,
  };

  return Object.freeze(hub);
}

let personalPlatformHub: PersonalPlatformHub | undefined;

export function getPersonalPlatformHub(): PersonalPlatformHub {
  if (!personalPlatformHub) {
    personalPlatformHub = createPersonalPlatformHub();
  }

  return personalPlatformHub;
}
