import {
  PlanCivilScheduleInvariantError,
  getCivilDateForPlanReadingUnitIndex,
  projectPlanCivilDate,
} from "../src/domain/plan/planCivilSchedule";

describe("planCivilSchedule", () => {
  test("projeta dias úteis consecutivos a partir do início", () => {
    expect(
      projectPlanCivilDate("2026-12-21", "2026-12-21"),
    ).toMatchObject({
      readingUnitIndex: 0,
      isBeforeStart: false,
      policy: {
        kind: "READING",
        consumesReadingUnit: true,
      },
    });

    expect(
      projectPlanCivilDate("2026-12-21", "2026-12-24"),
    ).toMatchObject({
      readingUnitIndex: 3,
      policy: {
        kind: "READING",
      },
    });
  });

  test("Natal não consome unidade e não avança o índice", () => {
    const christmas = projectPlanCivilDate(
      "2026-12-21",
      "2026-12-25",
    );

    expect(christmas).toMatchObject({
      readingUnitIndex: null,
      isBeforeStart: false,
      policy: {
        kind: "CHRISTMAS",
        consumesReadingUnit: false,
        displayReference: "Natal",
        bibleReference: null,
        externalNavigationAllowed: false,
      },
    });

    expect(
      projectPlanCivilDate("2026-12-21", "2026-12-26"),
    ).toMatchObject({
      readingUnitIndex: 4,
      policy: {
        kind: "READING",
      },
    });
  });

  test("domingo não consome unidade e a segunda-feira continua a sequência", () => {
    const sunday = projectPlanCivilDate(
      "2026-12-21",
      "2026-12-27",
    );

    expect(sunday).toMatchObject({
      readingUnitIndex: null,
      policy: {
        kind: "SUNDAY_MEDITATION",
        consumesReadingUnit: false,
        displayReference: "Meditar",
      },
    });

    expect(
      projectPlanCivilDate("2026-12-21", "2026-12-28"),
    ).toMatchObject({
      readingUnitIndex: 5,
      policy: {
        kind: "READING",
      },
    });
  });

  test("projeção inversa pula Natal e domingo", () => {
    expect(
      [
        0,
        1,
        2,
        3,
        4,
        5,
      ].map((index) =>
        getCivilDateForPlanReadingUnitIndex(
          "2026-12-21",
          index,
        ),
      ),
    ).toEqual([
      "2026-12-21",
      "2026-12-22",
      "2026-12-23",
      "2026-12-24",
      "2026-12-26",
      "2026-12-28",
    ]);
  });

  test("início em Natal adia a primeira unidade para o próximo dia de leitura", () => {
    expect(
      projectPlanCivilDate("2026-12-25", "2026-12-25"),
    ).toMatchObject({
      readingUnitIndex: null,
      policy: {
        kind: "CHRISTMAS",
      },
    });

    expect(
      getCivilDateForPlanReadingUnitIndex(
        "2026-12-25",
        0,
      ),
    ).toBe("2026-12-26");

    expect(
      projectPlanCivilDate("2026-12-25", "2026-12-26"),
    ).toMatchObject({
      readingUnitIndex: 0,
      policy: {
        kind: "READING",
      },
    });
  });

  test("Natal em domingo continua sem consumir unidade", () => {
    expect(
      projectPlanCivilDate("2033-12-24", "2033-12-25"),
    ).toMatchObject({
      readingUnitIndex: null,
      policy: {
        kind: "CHRISTMAS",
        isSunday: true,
        consumesReadingUnit: false,
      },
    });

    expect(
      getCivilDateForPlanReadingUnitIndex(
        "2033-12-24",
        1,
      ),
    ).toBe("2033-12-26");
  });

  test("data anterior ao início não recebe índice de leitura", () => {
    expect(
      projectPlanCivilDate("2026-12-28", "2026-12-24"),
    ).toMatchObject({
      dateIso: "2026-12-24",
      readingUnitIndex: null,
      isBeforeStart: true,
      policy: {
        kind: "READING",
      },
    });
  });

  test.each([
    -1,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
  ])(
    "rejeita índice inválido em fail-closed: %p",
    (readingUnitIndex) => {
      expect(() =>
        getCivilDateForPlanReadingUnitIndex(
          "2026-12-21",
          readingUnitIndex,
        ),
      ).toThrow(PlanCivilScheduleInvariantError);
    },
  );
});
