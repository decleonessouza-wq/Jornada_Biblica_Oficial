import { formatBibleReference } from "../src/domain/bible/bibleReferenceFormatter";
import { getCanonicalStructuredReadingUnitByOrder } from "../src/domain/plan/canonicalStructuredReadingUnits";
import { getJourneyBibleReaderRouteForReference } from "../src/services/journeyBibleReaderAdapter";

type ExpectedRoute = Readonly<{
  bookId:
    | "HOS"
    | "JOL"
    | "AMO"
    | "OBA"
    | "JON"
    | "NAM"
    | "HAB"
    | "2JN"
    | "3JN"
    | "JUD";
  chapter: number;
}>;

type CompoundCase = Readonly<{
  order: number;
  id: string;
  sourceReference: string;
  passageCount: number;
  routes: readonly ExpectedRoute[];
}>;

const COMPOUND_CASES: readonly CompoundCase[] = [
  {
    order: 121,
    id: "reading-121",
    sourceReference: "Oseias 11-14; Joel 1-3",
    passageCount: 2,
    routes: [
      { bookId: "HOS", chapter: 11 },
      { bookId: "JOL", chapter: 1 },
    ],
  },
  {
    order: 123,
    id: "reading-123",
    sourceReference: "Amós 6-9; Obadias; Jonas 1-4",
    passageCount: 3,
    routes: [
      { bookId: "AMO", chapter: 6 },
      { bookId: "OBA", chapter: 1 },
      { bookId: "JON", chapter: 1 },
    ],
  },
  {
    order: 142,
    id: "reading-142",
    sourceReference: "Naum; Habacuque 1-3",
    passageCount: 2,
    routes: [
      { bookId: "NAM", chapter: 1 },
      { bookId: "HAB", chapter: 1 },
    ],
  },
  {
    order: 270,
    id: "reading-270",
    sourceReference: "2 João, 3 João, Judas",
    passageCount: 3,
    routes: [
      { bookId: "2JN", chapter: 1 },
      { bookId: "3JN", chapter: 1 },
      { bookId: "JUD", chapter: 1 },
    ],
  },
];

describe("compound canonical Journey -> local BibleReader flow", () => {
  it.each(COMPOUND_CASES)(
    "preserves all passages for $id",
    ({ order, id, sourceReference, passageCount }) => {
      const unit = getCanonicalStructuredReadingUnitByOrder(order);

      expect(unit).not.toBeNull();
      expect(unit?.id).toBe(id);
      expect(unit?.reference).toBe(sourceReference);
      expect(unit?.bibleReference.passages).toHaveLength(passageCount);

      const formatted = formatBibleReference(unit!.bibleReference);
      expect(formatted.split("; ")).toHaveLength(passageCount);
    },
  );

  it.each(COMPOUND_CASES)(
    "routes every explicitly selected passage for $id",
    ({ order, passageCount, routes }) => {
      const unit = getCanonicalStructuredReadingUnitByOrder(order);

      if (!unit) {
        throw new Error(`MISSING_STRUCTURED_UNIT_${order}`);
      }

      routes.forEach((expectedRoute, passageIndex) => {
        expect(
          getJourneyBibleReaderRouteForReference({
            reference: unit.bibleReference,
            versionId: "BLIVRE",
            passageIndex,
          }),
        ).toEqual({
          ok: true,
          routeParams: {
            versionId: "BLIVRE",
            ...expectedRoute,
          },
          passageIndex,
          passageCount,
        });
      });
    },
  );

  it.each(COMPOUND_CASES)(
    "fails closed beyond the last passage for $id",
    ({ order, passageCount }) => {
      const unit = getCanonicalStructuredReadingUnitByOrder(order);

      if (!unit) {
        throw new Error(`MISSING_STRUCTURED_UNIT_${order}`);
      }

      expect(
        getJourneyBibleReaderRouteForReference({
          reference: unit.bibleReference,
          versionId: "BLIVRE",
          passageIndex: passageCount,
        }),
      ).toEqual({
        ok: false,
        error: {
          code: "INVALID_PASSAGE_INDEX",
          passageIndex: passageCount,
          passageCount,
        },
      });
    },
  );

  it("canonicalizes the explicit comma-separated multi-book unit without losing passages", () => {
    const unit = getCanonicalStructuredReadingUnitByOrder(270);

    if (!unit) {
      throw new Error("MISSING_STRUCTURED_UNIT_270");
    }

    expect(unit.reference).toBe("2 João, 3 João, Judas");
    expect(unit.bibleReference.passages).toHaveLength(3);
    expect(formatBibleReference(unit.bibleReference)).toBe(
      "2 João; 3 João; Judas",
    );
  });
});
