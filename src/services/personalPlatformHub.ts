import { SQLiteFavoritesRepository } from "../data/personal/favorites/sqliteFavoritesRepository";
import { SQLiteJournalRepository } from "../data/personal/journal/sqliteJournalRepository";
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
import { FavoritesService } from "./favorites/favoritesService";
import { JournalService } from "./journal/journalService";

export interface PersonalPlatformHub {
  readonly database: PersonalDatabase;
  readonly canonicalIdFactory: PersonalCanonicalIdFactory;
  readonly clock: PersonalClock;
  readonly datePolicy: PersonalDatePolicy;
  readonly logger: PersonalLogger;
  readonly privacyPolicy: PersonalPrivacyPolicy;
  readonly favoritesService: FavoritesService;
  readonly journalService: JournalService;
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
  const database =
    overrides.database ?? new PersonalDatabase();
  const canonicalIdFactory =
    overrides.canonicalIdFactory ??
    new ExpoCryptoPersonalCanonicalIdFactory();
  const clock =
    overrides.clock ?? new SystemPersonalClock();
  const datePolicy =
    overrides.datePolicy ?? new SystemPersonalDatePolicy();
  const logger =
    overrides.logger ?? new NoopPersonalLogger();
  const favoritesRepository =
    new SQLiteFavoritesRepository(database);
  const favoritesService = new FavoritesService(
    favoritesRepository,
    canonicalIdFactory,
    clock,
    datePolicy,
  );
  const journalRepository =
    new SQLiteJournalRepository(database);
  const journalService = new JournalService(
    journalRepository,
    canonicalIdFactory,
    clock,
    datePolicy,
  );

  const hub: PersonalPlatformHub = {
    database,
    canonicalIdFactory,
    clock,
    datePolicy,
    logger,
    privacyPolicy: PERSONAL_PRIVACY_POLICY,
    favoritesService,
    journalService,
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
