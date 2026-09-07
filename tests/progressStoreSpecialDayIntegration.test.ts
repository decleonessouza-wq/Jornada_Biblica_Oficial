import AsyncStorage from "@react-native-async-storage/async-storage";

import { readingPlan } from "../src/data/readingPlan";
import {
  COMPLETED_DAYS_KEY,
  PLAN_OVERRIDES_KEY,
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
