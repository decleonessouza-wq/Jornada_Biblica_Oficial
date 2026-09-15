import AsyncStorage from "@react-native-async-storage/async-storage";

import { readingPlan } from "../src/data/readingPlan";
import {
  COMPLETED_DAYS_KEY,
  PLAN_OVERRIDES_KEY,
  PLAN_REDISTRIBUTIONS_KEY,
  PLAN_START_DATE_KEY,
  addCompletedDay,
  calculateStreak,
  getBaseReferenceForDate,
  getEffectiveReferenceForDate,
  getOverdueDates,
  getOverdueOffsets,
  redistributeOverdueReadings,
} from "../src/services/progressStore";

jest.mock("@react-native-async-storage/async-storage", () =>
  jest.requireActual(
    "@react-native-async-storage/async-storage/jest/async-storage-mock",
  ),
);

jest.mock("../src/services/notifications", () => ({}));

const readingSequence = readingPlan
  .filter((day) => !day.isSunday)
  .map((day) => day.reference);

describe("progressStore special-day integration", () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem(
      PLAN_START_DATE_KEY,
      "2026-12-21",
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("preserva a sequência bíblica ao atravessar Natal e domingo", async () => {
    expect(
      await getBaseReferenceForDate("2026-12-24"),
    ).toEqual({
      isSunday: false,
      reference: readingSequence[3],
      finished: false,
    });

    expect(
      await getBaseReferenceForDate("2026-12-25"),
    ).toEqual({
      isSunday: false,
      reference: "Natal",
      finished: false,
    });

    expect(
      await getBaseReferenceForDate("2026-12-26"),
    ).toEqual({
      isSunday: false,
      reference: readingSequence[4],
      finished: false,
    });

    expect(
      await getBaseReferenceForDate("2026-12-27"),
    ).toEqual({
      isSunday: true,
      reference: "Meditar",
      finished: false,
    });

    expect(
      await getBaseReferenceForDate("2026-12-28"),
    ).toEqual({
      isSunday: false,
      reference: readingSequence[5],
      finished: false,
    });
  });

  test("override nunca substitui domingo ou Natal", async () => {
    await AsyncStorage.setItem(
      PLAN_OVERRIDES_KEY,
      JSON.stringify({
        "2026-12-25": "Gênesis 1",
        "2026-12-26": "Êxodo 1",
        "2026-12-27": "Salmos 1",
      }),
    );

    expect(
      await getEffectiveReferenceForDate("2026-12-25"),
    ).toEqual({
      isSunday: false,
      reference: "Natal",
      finished: false,
      source: "BASE",
    });

    expect(
      await getEffectiveReferenceForDate("2026-12-27"),
    ).toEqual({
      isSunday: true,
      reference: "Meditar",
      finished: false,
      source: "BASE",
    });

    expect(
      await getEffectiveReferenceForDate("2026-12-26"),
    ).toEqual({
      isSunday: false,
      reference: "Êxodo 1",
      finished: false,
      source: "OVERRIDE",
    });
  });

  test("atrasos mantêm offset civil, mas excluem Natal e domingo", async () => {
    await AsyncStorage.setItem(
      COMPLETED_DAYS_KEY,
      JSON.stringify([
        "2026-12-21",
        "2026-12-23",
      ]),
    );

    await expect(
      getOverdueOffsets({
        todayIso: "2026-12-29",
        includeToday: false,
      }),
    ).resolves.toEqual([
      1,
      3,
      5,
      7,
    ]);

    await expect(
      getOverdueDates({
        todayIso: "2026-12-29",
        includeToday: false,
      }),
    ).resolves.toEqual([
      "2026-12-22",
      "2026-12-24",
      "2026-12-26",
      "2026-12-28",
    ]);
  });

  test("não registra conclusão em dia especial", async () => {
    await expect(
      addCompletedDay("2026-12-25"),
    ).resolves.toEqual({
      added: false,
      days: [],
    });

    await expect(
      addCompletedDay("2026-12-27"),
    ).resolves.toEqual({
      added: false,
      days: [],
    });

    await expect(
      addCompletedDay("2026-12-26"),
    ).resolves.toEqual({
      added: true,
      days: ["2026-12-26"],
    });
  });

  test("redistribuição nunca escreve override em Natal ou domingo", async () => {
    const result = await redistributeOverdueReadings({
      todayIso: "2026-12-25",
      includeTodayAsTarget: true,
    });

    const raw = await AsyncStorage.getItem(
      PLAN_OVERRIDES_KEY,
    );
    const overrides = raw
      ? (JSON.parse(raw) as Record<string, string>)
      : {};

    expect(result.redistributedCount).toBe(4);
    expect(Object.keys(overrides)).toEqual([
      "2026-12-26",
      "2026-12-28",
      "2026-12-29",
      "2026-12-30",
    ]);
    expect(overrides["2026-12-25"]).toBeUndefined();
    expect(overrides["2026-12-27"]).toBeUndefined();
  });

  test("redistribuição remove origens do atraso ativo sem marcá-las como concluídas", async () => {
    await expect(
      getOverdueDates({
        todayIso: "2026-12-25",
        includeToday: false,
      }),
    ).resolves.toEqual([
      "2026-12-21",
      "2026-12-22",
      "2026-12-23",
      "2026-12-24",
    ]);

    const result = await redistributeOverdueReadings({
      todayIso: "2026-12-25",
      includeTodayAsTarget: true,
    });

    expect(result.redistributedCount).toBe(4);

    await expect(
      getOverdueDates({
        todayIso: "2026-12-25",
        includeToday: false,
      }),
    ).resolves.toEqual([]);

    expect(
      await AsyncStorage.getItem(COMPLETED_DAYS_KEY),
    ).toBeNull();

    const rawRedistributions =
      await AsyncStorage.getItem(
        PLAN_REDISTRIBUTIONS_KEY,
      );

    const redistributions = rawRedistributions
      ? (JSON.parse(rawRedistributions) as Record<
          string,
          {
            targetDate: string;
            reference: string;
          }
        >)
      : {};

    expect(
      Object.keys(redistributions).sort(),
    ).toEqual([
      "2026-12-21",
      "2026-12-22",
      "2026-12-23",
      "2026-12-24",
    ]);
  });

  test("redistribuição repetida no mesmo dia é idempotente", async () => {
    const first = await redistributeOverdueReadings({
      todayIso: "2026-12-25",
      includeTodayAsTarget: true,
    });

    expect(first.redistributedCount).toBe(4);

    const overridesAfterFirst =
      await AsyncStorage.getItem(
        PLAN_OVERRIDES_KEY,
      );

    const redistributionsAfterFirst =
      await AsyncStorage.getItem(
        PLAN_REDISTRIBUTIONS_KEY,
      );

    const second = await redistributeOverdueReadings({
      todayIso: "2026-12-25",
      includeTodayAsTarget: true,
    });

    expect(second).toMatchObject({
      overdueCount: 0,
      redistributedCount: 0,
      targetDays: 0,
      overridesWritten: 0,
    });

    expect(
      await AsyncStorage.getItem(
        PLAN_OVERRIDES_KEY,
      ),
    ).toBe(overridesAfterFirst);

    expect(
      await AsyncStorage.getItem(
        PLAN_REDISTRIBUTIONS_KEY,
      ),
    ).toBe(redistributionsAfterFirst);
  });

  test("nova redistribuição posterior preserva integralmente bundles já movidos", async () => {
    await redistributeOverdueReadings({
      todayIso: "2026-12-25",
      includeTodayAsTarget: true,
    });

    const firstRaw = await AsyncStorage.getItem(
      PLAN_OVERRIDES_KEY,
    );

    const firstOverrides = firstRaw
      ? (JSON.parse(firstRaw) as Record<
          string,
          string
        >)
      : {};

    expect(firstOverrides["2026-12-26"]).toBeTruthy();
    expect(firstOverrides["2026-12-28"]).toBeTruthy();

    const second = await redistributeOverdueReadings({
      todayIso: "2026-12-29",
      includeTodayAsTarget: true,
    });

    expect(second.overdueCount).toBe(2);
    expect(second.redistributedCount).toBe(2);

    const secondRaw = await AsyncStorage.getItem(
      PLAN_OVERRIDES_KEY,
    );

    const secondOverrides = secondRaw
      ? (JSON.parse(secondRaw) as Record<
          string,
          string
        >)
      : {};

    expect(
      secondOverrides["2026-12-29"],
    ).toContain(firstOverrides["2026-12-26"]);

    expect(
      secondOverrides["2026-12-30"],
    ).toContain(firstOverrides["2026-12-28"]);

    expect(
      secondOverrides["2026-12-29"].split(
        firstOverrides["2026-12-26"],
      ).length - 1,
    ).toBe(1);

    expect(
      secondOverrides["2026-12-30"].split(
        firstOverrides["2026-12-28"],
      ).length - 1,
    ).toBe(1);

    const rawRedistributions =
      await AsyncStorage.getItem(
        PLAN_REDISTRIBUTIONS_KEY,
      );

    const redistributions = rawRedistributions
      ? (JSON.parse(rawRedistributions) as Record<
          string,
          {
            targetDate: string;
            reference: string;
          }
        >)
      : {};

    expect(
      Object.keys(redistributions).sort(),
    ).toEqual([
      "2026-12-21",
      "2026-12-22",
      "2026-12-23",
      "2026-12-24",
      "2026-12-26",
      "2026-12-28",
    ]);

    await expect(
      getOverdueDates({
        todayIso: "2026-12-29",
        includeToday: false,
      }),
    ).resolves.toEqual([]);
  });
  test("redistribuição propaga falha real ao persistir overrides", async () => {
    const setItemMock =
      AsyncStorage.setItem as jest.Mock;

    setItemMock.mockRejectedValueOnce(
      new Error(
        "synthetic override write failure",
      ),
    );

    await expect(
      redistributeOverdueReadings({
        todayIso: "2026-12-25",
        includeTodayAsTarget: true,
      }),
    ).rejects.toThrow(
      "synthetic override write failure",
    );
  });

  test("redistribuição falha se a escrita reporta sucesso sem persistir", async () => {
    const setItemMock =
      AsyncStorage.setItem as jest.Mock;

    setItemMock
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(undefined);

    await expect(
      redistributeOverdueReadings({
        todayIso: "2026-12-25",
        includeTodayAsTarget: true,
      }),
    ).rejects.toThrow(
      "PLAN_OVERRIDE_PERSISTENCE_VERIFICATION_FAILED",
    );
  });

  test("streak ignora Natal e domingo como dias sem leitura", () => {
    expect(
      calculateStreak(
        [
          "2026-12-24",
          "2026-12-26",
          "2026-12-28",
          "2026-12-29",
        ],
        new Date(2026, 11, 29, 12, 0, 0, 0),
      ),
    ).toBe(4);
  });
});
