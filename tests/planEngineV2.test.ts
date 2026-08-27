import {
  PLAN_ENGINE_V2_VERSION,
  REQUIRED_READING_UNIT_COUNT,
  PlanEngineInvariantError,
  assertReadingUnits,
  getProjectedReadingDayByOrder,
  isRealSunday,
  normalizeIsoDate,
  projectPlanCalendar,
  type ReadingUnit,
} from "../src/domain/plan/planEngineV2";

function makeReadingUnits(): ReadingUnit[] {
  return Array.from(
    {
      length: REQUIRED_READING_UNIT_COUNT,
    },
    (_, index) => {
      const order = index + 1;

      return {
        id: "unit-" + order,
        order,
        reference: "Gn 1",
      };
    },
  );
}

function expectInvariantCode(
  action: () => void,
  expectedCode: string,
): void {
  try {
    action();
  } catch (error) {
    expect(
      error,
    ).toBeInstanceOf(
      PlanEngineInvariantError,
    );

    if (
      !(error instanceof PlanEngineInvariantError)
    ) {
      throw error;
    }

    expect(error.code).toBe(expectedCode);
    return;
  }

  throw new Error(
    "EXPECTED_PLAN_ENGINE_INVARIANT_ERROR",
  );
}

describe("PlanEngineV2 critical contracts", () => {
  it("normalizes valid dates and identifies real Sundays", () => {
    expect(
      normalizeIsoDate("2026-08-30"),
    ).toBe("2026-08-30");

    expect(
      isRealSunday("2026-08-30"),
    ).toBe(true);

    expect(
      isRealSunday("2026-08-31"),
    ).toBe(false);
  });

  it("rejects nonexistent calendar dates", () => {
    expectInvariantCode(
      () => {
        normalizeIsoDate("2026-02-30");
      },
      "INVALID_CALENDAR_DATE",
    );
  });

  it("rejects duplicate reading-unit ids", () => {
    const units: ReadingUnit[] = [
      {
        id: "duplicate",
        order: 1,
        reference: "Gn 1",
      },
      {
        id: "duplicate",
        order: 2,
        reference: "Gn 2",
      },
    ];

    expectInvariantCode(
      () => {
        assertReadingUnits(units, 2);
      },
      "DUPLICATE_READING_UNIT_ID",
    );
  });

  it("turns a Sunday activation into rest before the first reading", () => {
    const projection =
      projectPlanCalendar({
        activationDate: "2026-08-30",
        readingUnits: makeReadingUnits(),
      });

    expect(
      projection.engineVersion,
    ).toBe(PLAN_ENGINE_V2_VERSION);

    expect(
      projection.activationDate,
    ).toBe("2026-08-30");

    expect(
      projection.firstReadingDate,
    ).toBe("2026-08-31");

    expect(
      projection.calendarDays[0],
    ).toEqual({
      kind: "REST",
      date: "2026-08-30",
      reason: "SUNDAY",
      readingOrder: null,
      readingUnit: null,
    });
  });

  it("schedules exactly 309 readings and never schedules one on Sunday", () => {
    const projection =
      projectPlanCalendar({
        activationDate: "2026-08-30",
        readingUnits: makeReadingUnits(),
      });

    const readingDays =
      projection.calendarDays.filter(
        (day) => day.kind === "READING",
      );

    const restDays =
      projection.calendarDays.filter(
        (day) => day.kind === "REST",
      );

    expect(readingDays).toHaveLength(
      REQUIRED_READING_UNIT_COUNT,
    );

    expect(
      readingDays.every(
        (day) => !isRealSunday(day.date),
      ),
    ).toBe(true);

    expect(
      restDays.length,
    ).toBeGreaterThan(0);

    expect(
      restDays.every(
        (day) => isRealSunday(day.date),
      ),
    ).toBe(true);
  });

  it("retrieves projected readings by canonical order", () => {
    const projection =
      projectPlanCalendar({
        activationDate: "2026-08-31",
        readingUnits: makeReadingUnits(),
      });

    const reading =
      getProjectedReadingDayByOrder(
        projection,
        309,
      );

    expect(reading).not.toBeNull();

    expect(
      reading?.readingOrder,
    ).toBe(309);

    expect(
      reading?.readingUnit.id,
    ).toBe("unit-309");

    expect(
      getProjectedReadingDayByOrder(
        projection,
        0,
      ),
    ).toBeNull();
  });
});
