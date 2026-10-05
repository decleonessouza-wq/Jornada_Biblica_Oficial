import {
  DEVOTIONAL_STATES,
  type DevotionalProgress,
  type DevotionalState,
} from "../../../domain/devotionals/devotionalProgress";
import type {
  DevotionalId,
  DevotionalBlockId,
} from "../../../domain/devotionals/devotional";
import type {
  PersonalUtcTimestamp,
} from "../../../domain/personal/personalTime";
import type {
  PersonalDatabase,
} from "../personalDatabase";
import {
  PersonalRepositoryBase,
} from "../personalRepositoryBase";
import type {
  DevotionalProgressRepository,
} from "./devotionalProgressRepository";

type DevotionalProgressRow = Readonly<{
  devotional_id: unknown;
  state: unknown;
  last_block_id: unknown;
  reading_progress: unknown;
  started_at_utc: unknown;
  last_opened_at_utc: unknown;
  completed_at_utc: unknown;
}>;

function assertNonEmptyString(
  value: unknown,
  errorCode: string,
): asserts value is string {
  if (
    typeof value !== "string" ||
    value.trim().length === 0
  ) {
    throw new Error(errorCode);
  }
}

function assertNullableNonEmptyString(
  value: unknown,
  errorCode: string,
): asserts value is string | null {
  if (value === null) {
    return;
  }

  assertNonEmptyString(value, errorCode);
}

function assertReadingProgress(
  value: unknown,
  errorCode: string,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 0 ||
    value > 100
  ) {
    throw new Error(errorCode);
  }
}

function assertNullableUtcTimestamp(
  value: unknown,
  errorCode: string,
): asserts value is PersonalUtcTimestamp | null {
  if (value === null) {
    return;
  }

  assertNonEmptyString(value, errorCode);

  if (
    !value.endsWith("Z") ||
    Number.isNaN(Date.parse(value))
  ) {
    throw new Error(errorCode);
  }
}

function isDevotionalState(value: unknown): value is DevotionalState {
  return DEVOTIONAL_STATES.some(
    (state) => state === value,
  );
}

function mapDevotionalProgressRow(
  row: DevotionalProgressRow,
): DevotionalProgress {
  assertNonEmptyString(
    row.devotional_id,
    "PERSONAL_DEVOTIONAL_PROGRESS_ROW_DEVOTIONAL_ID_INVALID",
  );

  if (!isDevotionalState(row.state)) {
    throw new Error(
      "PERSONAL_DEVOTIONAL_PROGRESS_ROW_STATE_INVALID",
    );
  }

  assertNullableNonEmptyString(
    row.last_block_id,
    "PERSONAL_DEVOTIONAL_PROGRESS_ROW_BLOCK_KEY_INVALID",
  );
  assertReadingProgress(
    row.reading_progress,
    "PERSONAL_DEVOTIONAL_PROGRESS_ROW_READING_PROGRESS_INVALID",
  );
  assertNullableUtcTimestamp(
    row.started_at_utc,
    "PERSONAL_DEVOTIONAL_PROGRESS_ROW_STARTED_AT_INVALID",
  );
  assertNullableUtcTimestamp(
    row.last_opened_at_utc,
    "PERSONAL_DEVOTIONAL_PROGRESS_ROW_LAST_OPENED_AT_INVALID",
  );
  assertNullableUtcTimestamp(
    row.completed_at_utc,
    "PERSONAL_DEVOTIONAL_PROGRESS_ROW_COMPLETED_AT_INVALID",
  );

  return {
    devotionalId: row.devotional_id as DevotionalId,
    state: row.state,
    lastBlockId:
      row.last_block_id as DevotionalBlockId | null,
    readingProgress: row.reading_progress,
    startedAt: row.started_at_utc,
    lastOpenedAt: row.last_opened_at_utc,
    completedAt: row.completed_at_utc,
  };
}

function assertDevotionalProgress(
  progress: DevotionalProgress,
): void {
  assertNonEmptyString(
    progress.devotionalId,
    "PERSONAL_DEVOTIONAL_PROGRESS_DEVOTIONAL_ID_INVALID",
  );

  if (!isDevotionalState(progress.state)) {
    throw new Error(
      "PERSONAL_DEVOTIONAL_PROGRESS_STATE_INVALID",
    );
  }

  assertNullableNonEmptyString(
    progress.lastBlockId,
    "PERSONAL_DEVOTIONAL_PROGRESS_BLOCK_KEY_INVALID",
  );
  assertReadingProgress(
    progress.readingProgress,
    "PERSONAL_DEVOTIONAL_PROGRESS_READING_PROGRESS_INVALID",
  );
  assertNullableUtcTimestamp(
    progress.startedAt,
    "PERSONAL_DEVOTIONAL_PROGRESS_STARTED_AT_INVALID",
  );
  assertNullableUtcTimestamp(
    progress.lastOpenedAt,
    "PERSONAL_DEVOTIONAL_PROGRESS_LAST_OPENED_AT_INVALID",
  );
  assertNullableUtcTimestamp(
    progress.completedAt,
    "PERSONAL_DEVOTIONAL_PROGRESS_COMPLETED_AT_INVALID",
  );
}

const DEVOTIONAL_PROGRESS_COLUMNS_SQL = `
SELECT
  devotional_id,
  state,
  last_block_id,
  reading_progress,
  started_at_utc,
  last_opened_at_utc,
  completed_at_utc
FROM personal_devotional_progress
`;

export class SQLiteDevotionalProgressRepository
  extends PersonalRepositoryBase
  implements DevotionalProgressRepository
{
  // Intentionally widens the protected base constructor for hub composition.
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    personalDatabase: PersonalDatabase,
  ) {
    super(personalDatabase);
  }

  async load(
    devotionalId: DevotionalId,
  ): Promise<DevotionalProgress | null> {
    assertNonEmptyString(
      devotionalId,
      "PERSONAL_DEVOTIONAL_PROGRESS_DEVOTIONAL_ID_INVALID",
    );

    return this.personalDatabase.withConnection(
      async (database) => {
        const row =
          await database.getFirstAsync<DevotionalProgressRow>(
            `${DEVOTIONAL_PROGRESS_COLUMNS_SQL}
WHERE devotional_id = ?
LIMIT 1
`,
            devotionalId,
          );

        return row === null
          ? null
          : mapDevotionalProgressRow(row);
      },
    );
  }

  async list(): Promise<readonly DevotionalProgress[]> {
    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<DevotionalProgressRow>(
            `${DEVOTIONAL_PROGRESS_COLUMNS_SQL}
ORDER BY devotional_id ASC
`,
          );

        return rows.map(mapDevotionalProgressRow);
      },
    );
  }

  async upsert(
    progress: DevotionalProgress,
  ): Promise<void> {
    assertDevotionalProgress(progress);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
INSERT INTO personal_devotional_progress (
  devotional_id,
  state,
  last_block_id,
  reading_progress,
  started_at_utc,
  last_opened_at_utc,
  completed_at_utc
)
VALUES (?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(devotional_id) DO UPDATE SET
  state = excluded.state,
  last_block_id = excluded.last_block_id,
  reading_progress = excluded.reading_progress,
  started_at_utc = excluded.started_at_utc,
  last_opened_at_utc = excluded.last_opened_at_utc,
  completed_at_utc = excluded.completed_at_utc
`,
          progress.devotionalId,
          progress.state,
          progress.lastBlockId,
          progress.readingProgress,
          progress.startedAt,
          progress.lastOpenedAt,
          progress.completedAt,
        );
      },
    );
  }

  async reset(
    devotionalId: DevotionalId,
  ): Promise<void> {
    assertNonEmptyString(
      devotionalId,
      "PERSONAL_DEVOTIONAL_PROGRESS_DEVOTIONAL_ID_INVALID",
    );

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
DELETE FROM personal_devotional_progress
WHERE devotional_id = ?
`,
          devotionalId,
        );
      },
    );
  }
}