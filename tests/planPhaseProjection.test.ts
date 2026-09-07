import { phases, type Phase } from "../src/data/phases";
import {
  readingPlan,
  type ReadingItem,
} from "../src/data/readingPlan";
import {
  buildPlanPhaseProjection,
  getPlanPhaseForOffset,
  getPlanPhaseProjectionForOffset,
} from "../src/domain/plan/planPhaseProjection";

describe("planPhaseProjection", () => {
  it("projects all configured phases onto the canonical reading-plan offsets", () => {
    const projection = buildPlanPhaseProjection();

    expect(projection).toHaveLength(phases.length);
    expect(projection[0]).toEqual({
      phase: phases[0],
      startOffset: 0,
      endOffset: 41,
    });
    expect(projection[projection.length - 1]).toEqual({
      phase: phases[phases.length - 1],
      startOffset: 329,
      endOffset: readingPlan.length - 1,
    });
  });

  it("keeps adjacent phase boundaries exact and non-overlapping", () => {
    const projection = buildPlanPhaseProjection();

    for (let index = 1; index < projection.length; index += 1) {
      expect(projection[index]?.startOffset).toBe(
        (projection[index - 1]?.endOffset ?? -1) + 1,
      );
    }
  });

  it("resolves Genesis 1-3 at offset zero to Fundamentos", () => {
    expect(readingPlan[0]?.reference).toBe("Gênesis 1-3");
    expect(getPlanPhaseForOffset(0)?.title).toBe("Fundamentos");
  });

  it("resolves both sides of the Fundamentos to Preparação boundary", () => {
    expect(getPlanPhaseForOffset(41)?.title).toBe("Fundamentos");
    expect(getPlanPhaseForOffset(42)?.title).toBe("Preparação");
  });

  it("resolves Cartas Apostólicas from its atemporal offset range", () => {
    const phase = getPlanPhaseProjectionForOffset(238);

    expect(phase?.phase.title).toBe("Cartas Apostólicas");
    expect(phase?.startOffset).toBe(238);
    expect(phase?.endOffset).toBe(279);
  });

  it("returns null for invalid or out-of-range offsets", () => {
    const projection = buildPlanPhaseProjection();

    expect(getPlanPhaseForOffset(-1, projection)).toBeNull();
    expect(getPlanPhaseForOffset(Number.NaN, projection)).toBeNull();
    expect(
      getPlanPhaseForOffset(readingPlan.length, projection),
    ).toBeNull();
  });

  it("fails closed when a phase boundary does not exist in the reading plan", () => {
    const readingItems: ReadingItem[] = [
      { date: "2026-01-05", reference: "Gênesis 1-3" },
    ];
    const phaseItems: Phase[] = [
      {
        id: 1,
        title: "Fundamentos",
        description: "Teste",
        startDate: "2026-01-05",
        endDate: "2026-01-06",
      },
    ];

    expect(() =>
      buildPlanPhaseProjection({
        readingItems,
        phaseItems,
      }),
    ).toThrow(
      "PLAN_PHASE_PROJECTION_END_DATE_NOT_FOUND:1:2026-01-06",
    );
  });

  it("fails closed on duplicate reading-plan dates", () => {
    const readingItems: ReadingItem[] = [
      { date: "2026-01-05", reference: "Gênesis 1-3" },
      { date: "2026-01-05", reference: "Gênesis 4-7" },
    ];
    const phaseItems: Phase[] = [
      {
        id: 1,
        title: "Fundamentos",
        description: "Teste",
        startDate: "2026-01-05",
        endDate: "2026-01-05",
      },
    ];

    expect(() =>
      buildPlanPhaseProjection({
        readingItems,
        phaseItems,
      }),
    ).toThrow(
      "PLAN_PHASE_PROJECTION_DUPLICATE_READING_DATE:2026-01-05",
    );
  });
});
