import {
  PLAN_SPECIAL_DAY_POLICY_VERSION,
  PlanCivilDayPolicyInvariantError,
  isPlanReadingCivilDate,
  resolvePlanCivilDayPolicy,
} from "../src/domain/plan/planSpecialDayPolicy";

describe("planSpecialDayPolicy", () => {
  test("declara a versão do contrato explícito", () => {
    expect(PLAN_SPECIAL_DAY_POLICY_VERSION).toBe(1);
  });

  test.each([
    "",
    "2026-2-03",
    "2026-02-3",
    "2026-02-30",
    "2026-13-01",
    "0999-12-25",
    " 2026-12-25",
    "2026-12-25 ",
  ])("rejeita data civil inválida em fail-closed: %p", (dateIso) => {
    expect(() => resolvePlanCivilDayPolicy(dateIso)).toThrow(
      PlanCivilDayPolicyInvariantError,
    );
  });

  test("classifica um dia útil normal como leitura", () => {
    expect(resolvePlanCivilDayPolicy("2026-12-24")).toEqual({
      dateIso: "2026-12-24",
      kind: "READING",
      isSunday: false,
      consumesReadingUnit: true,
      canMarkRead: true,
    });
  });

  test("domingo real é meditação local e não consome unidade bíblica", () => {
    expect(resolvePlanCivilDayPolicy("2026-09-06")).toEqual({
      dateIso: "2026-09-06",
      kind: "SUNDAY_MEDITATION",
      isSunday: true,
      consumesReadingUnit: false,
      canMarkRead: false,
      displayReference: "Meditar",
      experience: "LOCAL_SUNDAY_MEDITATION",
      bibleReference: null,
      externalNavigationAllowed: false,
    });
  });

  test("Natal é especial anual explícito mesmo quando cai em dia útil", () => {
    expect(resolvePlanCivilDayPolicy("2026-12-25")).toEqual({
      dateIso: "2026-12-25",
      kind: "CHRISTMAS",
      isSunday: false,
      consumesReadingUnit: false,
      canMarkRead: false,
      displayReference: "Natal",
      experience: "LOCAL_CHRISTMAS_DEVOTIONAL",
      bibleReference: null,
      externalNavigationAllowed: false,
    });

    expect(resolvePlanCivilDayPolicy("2027-12-25").kind).toBe(
      "CHRISTMAS",
    );
  });

  test("Natal tem precedência de apresentação quando também cai no domingo", () => {
    expect(resolvePlanCivilDayPolicy("2033-12-25")).toEqual({
      dateIso: "2033-12-25",
      kind: "CHRISTMAS",
      isSunday: true,
      consumesReadingUnit: false,
      canMarkRead: false,
      displayReference: "Natal",
      experience: "LOCAL_CHRISTMAS_DEVOTIONAL",
      bibleReference: null,
      externalNavigationAllowed: false,
    });
  });

  test("helper de consumo do plano distingue leitura, domingo e Natal", () => {
    expect(isPlanReadingCivilDate("2026-12-24")).toBe(true);
    expect(isPlanReadingCivilDate("2026-12-25")).toBe(false);
    expect(isPlanReadingCivilDate("2026-12-27")).toBe(false);
    expect(isPlanReadingCivilDate("2026-12-28")).toBe(true);
  });

  test("dias especiais nunca fabricam BibleReference nem autorizam navegação externa", () => {
    for (const dateIso of ["2026-09-06", "2026-12-25", "2033-12-25"]) {
      const policy = resolvePlanCivilDayPolicy(dateIso);

      expect(policy.kind).not.toBe("READING");

      if (policy.kind !== "READING") {
        expect(policy.bibleReference).toBeNull();
        expect(policy.externalNavigationAllowed).toBe(false);
        expect(policy.consumesReadingUnit).toBe(false);
        expect(policy.canMarkRead).toBe(false);
      }
    }
  });
});
