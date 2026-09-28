import type {
  PersonalUtcTimestamp,
} from "../src/domain/personal/personalTime";
import type {
  StudyId,
} from "../src/domain/studies/study";
import type {
  StudyProgress,
} from "../src/domain/studies/studyProgress";
import {
  selectStudyContinuation,
} from "../src/services/studies/studyContinuationService";

function makeProgress(
  studyId: string,
  state: StudyProgress["state"],
  lastOpenedAt: string | null,
  readingProgress = 25,
): StudyProgress {
  return {
    studyId: studyId as StudyId,
    state,
    lastSectionKey: null,
    readingProgress,
    startedAt:
      lastOpenedAt as PersonalUtcTimestamp | null,
    lastOpenedAt:
      lastOpenedAt as PersonalUtcTimestamp | null,
    completedAt:
      state === "COMPLETED"
        ? (lastOpenedAt as PersonalUtcTimestamp | null)
        : null,
  };
}

function runtimeLookup(
  available: Readonly<Record<string, string>>,
) {
  return (studyId: string) => {
    const title = available[studyId];

    if (!title) {
      return null;
    }

    return {
      content: {
        title,
      },
    };
  };
}

describe("selectStudyContinuation", () => {
  it("selects only the most recently opened IN_PROGRESS study", () => {
    const result = selectStudyContinuation(
      [
        makeProgress(
          "track-01-study-01",
          "IN_PROGRESS",
          "2026-09-23T10:00:00.000Z",
          40,
        ),
        makeProgress(
          "track-01-study-02",
          "COMPLETED",
          "2026-09-23T12:00:00.000Z",
          100,
        ),
        makeProgress(
          "track-01-study-03",
          "IN_PROGRESS",
          null,
          50,
        ),
        makeProgress(
          "track-01-study-04",
          "IN_PROGRESS",
          "2026-09-23T11:00:00.000Z",
          65,
        ),
      ],
      runtimeLookup({
        "track-01-study-01": "Study 1",
        "track-01-study-02": "Study 2",
        "track-01-study-03": "Study 3",
        "track-01-study-04": "Study 4",
      }),
    );

    expect(result).toEqual({
      studyId: "track-01-study-04",
      title: "Study 4",
      readingProgress: 65,
      lastOpenedAt: "2026-09-23T11:00:00.000Z",
    });
  });

  it("uses canonical studyId as deterministic tie-breaker", () => {
    const timestamp = "2026-09-23T11:00:00.000Z";

    const result = selectStudyContinuation(
      [
        makeProgress(
          "track-01-study-02",
          "IN_PROGRESS",
          timestamp,
        ),
        makeProgress(
          "track-01-study-01",
          "IN_PROGRESS",
          timestamp,
        ),
      ],
      runtimeLookup({
        "track-01-study-01": "Study 1",
        "track-01-study-02": "Study 2",
      }),
    );

    expect(result?.studyId).toBe(
      "track-01-study-01",
    );
  });

  it("skips unavailable runtime ids and falls back to the next active study", () => {
    const result = selectStudyContinuation(
      [
        makeProgress(
          "orphan-study",
          "IN_PROGRESS",
          "2026-09-23T12:00:00.000Z",
        ),
        makeProgress(
          "track-01-study-01",
          "IN_PROGRESS",
          "2026-09-23T11:00:00.000Z",
          30,
        ),
      ],
      runtimeLookup({
        "track-01-study-01": "Study 1",
      }),
    );

    expect(result?.studyId).toBe(
      "track-01-study-01",
    );
    expect(result?.readingProgress).toBe(30);
  });

  it("returns null when there is no valid active runtime study", () => {
    const result = selectStudyContinuation(
      [
        makeProgress(
          "track-01-study-01",
          "COMPLETED",
          "2026-09-23T12:00:00.000Z",
        ),
        makeProgress(
          "orphan-study",
          "IN_PROGRESS",
          "2026-09-23T11:00:00.000Z",
        ),
      ],
      runtimeLookup({}),
    );

    expect(result).toBeNull();
  });
});
