/**
 * Adaptação estruturada e compatível das 309 unidades canônicas.
 *
 * Mantém `reference: string` como contrato legado do Plan Engine V2
 * e acrescenta `bibleReference` como representação semântica derivada
 * da mesma fonte canônica.
 *
 * A conversão acontece uma única vez na inicialização do módulo.
 * Falhas de parsing são invariantes de domínio e interrompem a criação.
 */

import type { BibleReference } from "../bible/bibleReference";
import { parseBibleReference } from "../bible/bibleReferenceParser";
import { CANONICAL_READING_UNITS } from "./canonicalReadingUnits";
import type { ReadingUnit } from "./planEngineV2";

export type StructuredReadingUnit = Readonly<
  ReadingUnit & {
    bibleReference: BibleReference;
  }
>;

export class CanonicalStructuredReadingUnitInvariantError extends Error {
  readonly code = "INVALID_CANONICAL_BIBLE_REFERENCE" as const;
  readonly readingUnitId: string;
  readonly reference: string;
  readonly parserErrorCode: string;

  constructor(
    readingUnitId: string,
    reference: string,
    parserErrorCode: string
  ) {
    super(
      `Referência bíblica canônica inválida na unidade "${readingUnitId}": ` +
        `"${reference}" (${parserErrorCode}).`
    );

    this.name = "CanonicalStructuredReadingUnitInvariantError";
    this.readingUnitId = readingUnitId;
    this.reference = reference;
    this.parserErrorCode = parserErrorCode;
  }
}

function parseCanonicalBibleReference(
  unit: ReadingUnit
): BibleReference {
  const parsed = parseBibleReference(unit.reference);

  if (!parsed.ok) {
    throw new CanonicalStructuredReadingUnitInvariantError(
      unit.id,
      unit.reference,
      parsed.error.code
    );
  }

  return parsed.value;
}

export const CANONICAL_STRUCTURED_READING_UNITS: readonly StructuredReadingUnit[] =
  Object.freeze(
    CANONICAL_READING_UNITS.map(
      (unit): StructuredReadingUnit =>
        Object.freeze({
          ...unit,
          bibleReference: parseCanonicalBibleReference(unit),
        })
    )
  );

export function getCanonicalStructuredReadingUnits(): readonly StructuredReadingUnit[] {
  return CANONICAL_STRUCTURED_READING_UNITS;
}

export function getCanonicalStructuredReadingUnitByOrder(
  readingOrder: number
): StructuredReadingUnit | null {
  if (!Number.isInteger(readingOrder) || readingOrder < 1) {
    return null;
  }

  return (
    CANONICAL_STRUCTURED_READING_UNITS[readingOrder - 1] ??
    null
  );
}

export function getCanonicalStructuredReadingUnitById(
  readingUnitId: string
): StructuredReadingUnit | null {
  if (
    typeof readingUnitId !== "string" ||
    readingUnitId.length === 0 ||
    readingUnitId.trim() !== readingUnitId
  ) {
    return null;
  }

  return (
    CANONICAL_STRUCTURED_READING_UNITS.find(
      (unit) => unit.id === readingUnitId
    ) ?? null
  );
}
