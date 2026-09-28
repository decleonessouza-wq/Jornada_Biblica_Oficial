import {
  STUDY_STATES,
  type StudyProgress,
  type StudyState,
} from "../../../domain/studies/studyProgress";
import type {
  StudyId,
  StudySectionId,
} from "../../../domain/studies/study";
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
  StudyProgressRepository,
} from "./studyProgressRepository";

type StudyProgressRow = Readonly<{
  study_id: unknown;
  state: unknown;
  last_section_key: unknown;
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

function isStudyState(value: unknown): value is StudyState {
  return STUDY_STATES.some(
    (state) => state === value,
  );
}

function mapStudyProgressRow(
  row: StudyProgressRow,
): StudyProgress {
  assertNonEmptyString(
    row.study_id,
    "PERSONAL_STUDY_PROGRESS_ROW_STUDY_ID_INVALID",
  );

  if (!isStudyState(row.state)) {
    throw new Error(
      "PERSONAL_STUDY_PROGRESS_ROW_STATE_INVALID",
    );
  }

  assertNullableNonEmptyString(
    row.last_section_key,
    "PERSONAL_STUDY_PROGRESS_ROW_SECTION_KEY_INVALID",
  );
  assertReadingProgress(
    row.reading_progress,
    "PERSONAL_STUDY_PROGRESS_ROW_READING_PROGRESS_INVALID",
  );
  assertNullableUtcTimestamp(
    row.started_at_utc,
    "PERSONAL_STUDY_PROGRESS_ROW_STARTED_AT_INVALID",
  );
  assertNullableUtcTimestamp(
    row.last_opened_at_utc,
    "PERSONAL_STUDY_PROGRESS_ROW_LAST_OPENED_AT_INVALID",
  );
  assertNullableUtcTimestamp(
    row.completed_at_utc,
    "PERSONAL_STUDY_PROGRESS_ROW_COMPLETED_AT_INVALID",
  );

  return {
    studyId: row.study_id as StudyId,
    state: row.state,
    lastSectionKey:
      row.last_section_key as StudySectionId | null,
    readingProgress: row.reading_progress,
    startedAt: row.started_at_utc,
    lastOpenedAt: row.last_opened_at_utc,
    completedAt: row.completed_at_utc,
  };
}

function assertStudyProgress(
  progress: StudyProgress,
): void {
  assertNonEmptyString(
    progress.studyId,
    "PERSONAL_STUDY_PROGRESS_STUDY_ID_INVALID",
  );

  if (!isStudyState(progress.state)) {
    throw new Error(
      "PERSONAL_STUDY_PROGRESS_STATE_INVALID",
    );
  }

  assertNullableNonEmptyString(
    progress.lastSectionKey,
    "PERSONAL_STUDY_PROGRESS_SECTION_KEY_INVALID",
  );
  assertReadingProgress(
    progress.readingProgress,
    "PERSONAL_STUDY_PROGRESS_READING_PROGRESS_INVALID",
  );
  assertNullableUtcTimestamp(
    progress.startedAt,
    "PERSONAL_STUDY_PROGRESS_STARTED_AT_INVALID",
  );
  assertNullableUtcTimestamp(
    progress.lastOpenedAt,
    "PERSONAL_STUDY_PROGRESS_LAST_OPENED_AT_INVALID",
  );
  assertNullableUtcTimestamp(
    progress.completedAt,
    "PERSONAL_STUDY_PROGRESS_COMPLETED_AT_INVALID",
  );
}

const STUDY_PROGRESS_COLUMNS_SQL = `
SELECT
  study_id,
  state,
  last_section_key,
  reading_progress,
  started_at_utc,
  last_opened_at_utc,
  completed_at_utc
FROM personal_study_progress
`;

export class SQLiteStudyProgressRepository
  extends PersonalRepositoryBase
  implements StudyProgressRepository
{
  // Intentionally widens the protected base constructor for hub composition.
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    personalDatabase: PersonalDatabase,
  ) {
    super(personalDatabase);
  }

  async load(
    studyId: StudyId,
  ): Promise<StudyProgress | null> {
    assertNonEmptyString(
      studyId,
      "PERSONAL_STUDY_PROGRESS_STUDY_ID_INVALID",
    );

    return this.personalDatabase.withConnection(
      async (database) => {
        const row =
          await database.getFirstAsync<StudyProgressRow>(
            `${STUDY_PROGRESS_COLUMNS_SQL}
WHERE study_id = ?
LIMIT 1
`,
            studyId,
          );

        return row === null
          ? null
          : mapStudyProgressRow(row);
      },
    );
  }

  async list(): Promise<readonly StudyProgress[]> {
    return this.personalDatabase.withConnection(
      async (database) => {
        const rows =
          await database.getAllAsync<StudyProgressRow>(
            `${STUDY_PROGRESS_COLUMNS_SQL}
ORDER BY study_id ASC
`,
          );

        return rows.map(mapStudyProgressRow);
      },
    );
  }

  async upsert(
    progress: StudyProgress,
  ): Promise<void> {
    assertStudyProgress(progress);

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
INSERT INTO personal_study_progress (
  study_id,
  state,
  last_section_key,
  reading_progress,
  started_at_utc,
  last_opened_at_utc,
  completed_at_utc
)
VALUES (?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(study_id) DO UPDATE SET
  state = excluded.state,
  last_section_key = excluded.last_section_key,
  reading_progress = excluded.reading_progress,
  started_at_utc = excluded.started_at_utc,
  last_opened_at_utc = excluded.last_opened_at_utc,
  completed_at_utc = excluded.completed_at_utc
`,
          progress.studyId,
          progress.state,
          progress.lastSectionKey,
          progress.readingProgress,
          progress.startedAt,
          progress.lastOpenedAt,
          progress.completedAt,
        );
      },
    );
  }

  async reset(
    studyId: StudyId,
  ): Promise<void> {
    assertNonEmptyString(
      studyId,
      "PERSONAL_STUDY_PROGRESS_STUDY_ID_INVALID",
    );

    await this.personalDatabase.withConnection(
      async (database) => {
        await database.runAsync(
          `
DELETE FROM personal_study_progress
WHERE study_id = ?
`,
          studyId,
        );
      },
    );
  }
}