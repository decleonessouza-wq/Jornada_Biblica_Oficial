import {
  JOURNAL_GRATITUDE_MAX_CHARS,
} from "../../domain/journal/journal";
import type { PersonalLocalDate } from "../../domain/personal/personalTime";
import type {
  JournalEntryPersistenceRecord,
} from "../../data/personal/journal/journalRepository";

export type LegacyGratitudeCandidate = Readonly<{
  entryDate: PersonalLocalDate;
  gratitudeText: string;
}>;

export type LegacyGratitudeCreateInput =
  LegacyGratitudeCandidate;

export interface LegacyGratitudeJournalPort {
  listLegacyGratitudeMigrationEntries(): Promise<
    readonly JournalEntryPersistenceRecord[]
  >;
  createLegacyGratitudeMigrationEntry(
    input: LegacyGratitudeCreateInput,
  ): Promise<JournalEntryPersistenceRecord>;
  updateLegacyGratitudeMigrationEntry(
    existing: JournalEntryPersistenceRecord,
    input: LegacyGratitudeCreateInput,
  ): Promise<JournalEntryPersistenceRecord>;
  removeLegacyGratitudeMigrationEntry(
    existing: JournalEntryPersistenceRecord,
  ): Promise<void>;
}

export type LegacyGratitudeMigrationStatus =
  | "EMPTY"
  | "MIGRATED"
  | "ALREADY_RECONCILED";

export type LegacyGratitudeMigrationResult = Readonly<{
  status: LegacyGratitudeMigrationStatus;
  legacyCount: number;
  createdCount: number;
  updatedCount: number;
  removedCount: number;
  reconciledCount: number;
}>;

type LegacyGratitudeUpdateOperation = Readonly<{
  existing: JournalEntryPersistenceRecord;
  candidate: LegacyGratitudeCandidate;
}>;

type LegacyGratitudeMigrationPlan = Readonly<{
  candidates: readonly LegacyGratitudeCandidate[];
  create: readonly LegacyGratitudeCandidate[];
  update: readonly LegacyGratitudeUpdateOperation[];
  remove: readonly JournalEntryPersistenceRecord[];
}>;

function hasIsoDateShape(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidCalendarDate(value: string): boolean {
  if (!hasIsoDateShape(value)) {
    return false;
  }

  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(5, 7));
  const day = Number(value.slice(8, 10));
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function toPersonalLocalDate(
  value: string,
): PersonalLocalDate {
  if (!isValidCalendarDate(value)) {
    throw new Error(
      "PERSONAL_LEGACY_GRATITUDE_DATE_INVALID",
    );
  }

  return value as PersonalLocalDate;
}

export function sanitizeLegacyGratitudeMap(
  input: unknown,
): readonly LegacyGratitudeCandidate[] {
  if (
    input === null ||
    typeof input !== "object"
  ) {
    return [];
  }

  const candidates: LegacyGratitudeCandidate[] = [];

  for (const [key, value] of Object.entries(
    input as Record<string, unknown>,
  )) {
    if (!hasIsoDateShape(key)) {
      continue;
    }

    if (typeof value !== "string") {
      continue;
    }

    const text = value.trim();

    if (text.length === 0) {
      continue;
    }

    const gratitudeText =
      text.length > JOURNAL_GRATITUDE_MAX_CHARS
        ? text.slice(0, JOURNAL_GRATITUDE_MAX_CHARS)
        : text;

    candidates.push({
      entryDate: toPersonalLocalDate(key),
      gratitudeText,
    });
  }

  return candidates.sort((left, right) =>
    left.entryDate.localeCompare(right.entryDate),
  );
}

function isExactMigratedRecord(
  record: JournalEntryPersistenceRecord,
  candidate: LegacyGratitudeCandidate,
): boolean {
  return (
    record.entryDate === candidate.entryDate &&
    record.gratitudeText === candidate.gratitudeText &&
    record.reflectionText === null &&
    record.status === "ACTIVE" &&
    record.sourceType === "HOME_GRATITUDE" &&
    record.sourceTitleSnapshot === null &&
    record.promptSnapshot === null &&
    record.category === "GRATITUDE" &&
    record.isPinned === false &&
    record.references.length === 0 &&
    record.tags.length === 0
  );
}

function indexMigrationEntriesByDate(
  entries: readonly JournalEntryPersistenceRecord[],
): ReadonlyMap<
  PersonalLocalDate,
  readonly JournalEntryPersistenceRecord[]
> {
  const grouped = new Map<
    PersonalLocalDate,
    JournalEntryPersistenceRecord[]
  >();

  for (const entry of entries) {
    if (entry.sourceType !== "HOME_GRATITUDE") {
      throw new Error(
        "PERSONAL_LEGACY_GRATITUDE_PORT_CONTRACT_INVALID",
      );
    }

    const bucket = grouped.get(entry.entryDate) ?? [];
    bucket.push(entry);
    grouped.set(entry.entryDate, bucket);
  }

  return grouped;
}

async function buildMigrationPlan(
  port: LegacyGratitudeJournalPort,
  candidates: readonly LegacyGratitudeCandidate[],
): Promise<LegacyGratitudeMigrationPlan> {
  const existing =
    await port.listLegacyGratitudeMigrationEntries();
  const byDate =
    indexMigrationEntriesByDate(existing);
  const candidateByDate = new Map(
    candidates.map((candidate) => [
      candidate.entryDate,
      candidate,
    ]),
  );

  for (const matches of byDate.values()) {
    if (matches.length > 1) {
      throw new Error(
        "PERSONAL_LEGACY_GRATITUDE_DUPLICATE_CONFLICT",
      );
    }
  }

  const create: LegacyGratitudeCandidate[] = [];
  const update: LegacyGratitudeUpdateOperation[] = [];
  const remove: JournalEntryPersistenceRecord[] = [];

  for (const candidate of candidates) {
    const matches = byDate.get(candidate.entryDate) ?? [];

    if (matches.length === 0) {
      create.push(candidate);
      continue;
    }

    const existingEntry = matches[0];

    if (!isExactMigratedRecord(existingEntry, candidate)) {
      update.push({
        existing: existingEntry,
        candidate,
      });
    }
  }

  for (const entry of existing) {
    if (!candidateByDate.has(entry.entryDate)) {
      remove.push(entry);
    }
  }

  return {
    candidates,
    create,
    update,
    remove,
  };
}

async function applyMigrationPlan(
  port: LegacyGratitudeJournalPort,
  plan: LegacyGratitudeMigrationPlan,
): Promise<void> {
  for (const candidate of plan.create) {
    await port.createLegacyGratitudeMigrationEntry(
      candidate,
    );
  }

  for (const operation of plan.update) {
    await port.updateLegacyGratitudeMigrationEntry(
      operation.existing,
      operation.candidate,
    );
  }

  for (const entry of plan.remove) {
    await port.removeLegacyGratitudeMigrationEntry(
      entry,
    );
  }
}

async function reconcileMigration(
  port: LegacyGratitudeJournalPort,
  candidates: readonly LegacyGratitudeCandidate[],
): Promise<void> {
  const existing =
    await port.listLegacyGratitudeMigrationEntries();

  if (existing.length !== candidates.length) {
    throw new Error(
      "PERSONAL_LEGACY_GRATITUDE_RECONCILIATION_COUNT_MISMATCH",
    );
  }

  const byDate =
    indexMigrationEntriesByDate(existing);

  for (const candidate of candidates) {
    const matches = byDate.get(candidate.entryDate) ?? [];

    if (
      matches.length !== 1 ||
      !isExactMigratedRecord(matches[0], candidate)
    ) {
      throw new Error(
        "PERSONAL_LEGACY_GRATITUDE_RECONCILIATION_CONTENT_MISMATCH",
      );
    }
  }
}

export async function migrateLegacyGratitude(
  port: LegacyGratitudeJournalPort,
  legacyInput: unknown,
): Promise<LegacyGratitudeMigrationResult> {
  const candidates =
    sanitizeLegacyGratitudeMap(legacyInput);

  const plan = await buildMigrationPlan(
    port,
    candidates,
  );

  await applyMigrationPlan(port, plan);
  await reconcileMigration(port, plan.candidates);

  const changed =
    plan.create.length > 0 ||
    plan.update.length > 0 ||
    plan.remove.length > 0;

  return {
    status:
      candidates.length === 0 && !changed
        ? "EMPTY"
        : changed
          ? "MIGRATED"
          : "ALREADY_RECONCILED",
    legacyCount: candidates.length,
    createdCount: plan.create.length,
    updatedCount: plan.update.length,
    removedCount: plan.remove.length,
    reconciledCount: candidates.length,
  };
}
