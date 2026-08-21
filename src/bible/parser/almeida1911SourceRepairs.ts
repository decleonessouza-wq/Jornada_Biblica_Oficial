export const ALM1911_SOURCE_REPAIRS_SOURCE_SHA256 =
  "4AAF58BB786B86FCEC02BE20581175FD3D6FE1FE5BF490BB7D0E82127CE09C47";

export interface Almeida1911VerseStartTokenShape {
  readonly sourceLine: number;
  readonly label: string | null;
  readonly rawNumber: number;
  readonly text: string;
}

export type Almeida1911SourceRepairDescriptor =
  | {
      readonly kind: "DROP_FALSE_REFERENCE_CONTINUATION_TOKEN";
      readonly bookId: string;
      readonly sourceLine: number;
      readonly raw: string;
      readonly expectedRawNumber: number;
    }
  | {
      readonly kind: "RENUMBER_SOURCE_VERSE_MARKER";
      readonly bookId: string;
      readonly sourceLine: number;
      readonly raw: string;
      readonly expectedRawNumber: number;
      readonly replacementRawNumber: number;
    }
  | {
      readonly kind: "DROP_EXACT_CROSS_REFERENCE_METADATA_LINE";
      readonly bookId: string;
      readonly tokenSourceLine: number;
      readonly sourceLine: number;
      readonly raw: string;
    };

const TOKEN_REPAIRS: readonly Almeida1911SourceRepairDescriptor[] =
  Object.freeze([
    {
      kind: "DROP_FALSE_REFERENCE_CONTINUATION_TOKEN",
      bookId: "LEV",
      sourceLine: 12750,
      raw: "35 e 9.7 e 16.24. Num. 15.25. II Chr. 29.23, 24.",
      expectedRawNumber: 35,
    },
    {
      kind: "DROP_FALSE_REFERENCE_CONTINUATION_TOKEN",
      bookId: "DEU",
      sourceLine: 24636,
      raw: "40 e 11.11. Exo. 23.32. Jui. 2.2. Jos. 2.14. Jui. 1.24.",
      expectedRawNumber: 40,
    },
    {
      kind: "DROP_FALSE_REFERENCE_CONTINUATION_TOKEN",
      bookId: "1SA",
      sourceLine: 37491,
      raw: "6 e 14.2. Mal. 1.2.",
      expectedRawNumber: 6,
    },
    {
      kind: "DROP_FALSE_REFERENCE_CONTINUATION_TOKEN",
      bookId: "ISA",
      sourceLine: 83260,
      raw:
        "13 e 28.5 e 29.18 e 30.23 e 52.6. Jer. 30.7, 8. Eze. 38.14, 19 e 39.11,",
      expectedRawNumber: 13,
    },
    {
      kind: "DROP_FALSE_REFERENCE_CONTINUATION_TOKEN",
      bookId: "JER",
      sourceLine: 93260,
      raw: "45 e 51.25, 26.",
      expectedRawNumber: 45,
    },
    {
      kind: "RENUMBER_SOURCE_VERSE_MARKER",
      bookId: "MRK",
      sourceLine: 119329,
      raw:
        "31 E sem parabolas nunca lhes fallava; porém tudo declarava em particular",
      expectedRawNumber: 31,
      replacementRawNumber: 34,
    },
  ]);

const RAW_TEXT_REPAIRS: readonly Almeida1911SourceRepairDescriptor[] =
  Object.freeze([
    {
      kind: "DROP_EXACT_CROSS_REFERENCE_METADATA_LINE",
      bookId: "MRK",
      tokenSourceLine: 119329,
      sourceLine: 119335,
      raw: "Mat. 8.23-27, etc.",
    },
  ]);

const ALL_REPAIRS: readonly Almeida1911SourceRepairDescriptor[] =
  Object.freeze([...TOKEN_REPAIRS, ...RAW_TEXT_REPAIRS]);

export const ALM1911_SOURCE_REPAIR_COUNT = ALL_REPAIRS.length;

export function getAlmeida1911SourceRepairDescriptors():
  readonly Almeida1911SourceRepairDescriptor[] {
  return ALL_REPAIRS.map((repair) => ({ ...repair }));
}

export function assertAlmeida1911SourceRepairSourceSha(
  sourceSha256: string,
): void {
  if (sourceSha256 !== ALM1911_SOURCE_REPAIRS_SOURCE_SHA256) {
    throw new Error(
      `ALM1911_SOURCE_REPAIR_SOURCE_SHA_MISMATCH:EXPECTED=${ALM1911_SOURCE_REPAIRS_SOURCE_SHA256}:ACTUAL=${sourceSha256}`,
    );
  }
}

export function repairAlmeida1911VerseStartToken(
  bookId: string,
  rawLine: string,
  token: Almeida1911VerseStartTokenShape,
): Almeida1911VerseStartTokenShape | null {
  const repair = TOKEN_REPAIRS.find(
    (candidate) =>
      "expectedRawNumber" in candidate &&
      candidate.sourceLine === token.sourceLine,
  );

  if (!repair || !("expectedRawNumber" in repair)) {
    return token;
  }

  if (repair.bookId !== bookId) {
    throw new Error(
      `ALM1911_TOKEN_REPAIR_BOOK_MISMATCH:SOURCE_LINE=${token.sourceLine}:EXPECTED=${repair.bookId}:ACTUAL=${bookId}`,
    );
  }

  const trimmed = rawLine.trim();

  if (trimmed !== repair.raw) {
    throw new Error(
      `ALM1911_TOKEN_REPAIR_RAW_MISMATCH:BOOK=${bookId}:SOURCE_LINE=${token.sourceLine}`,
    );
  }

  if (token.rawNumber !== repair.expectedRawNumber) {
    throw new Error(
      `ALM1911_TOKEN_REPAIR_NUMBER_MISMATCH:BOOK=${bookId}:SOURCE_LINE=${token.sourceLine}:EXPECTED=${repair.expectedRawNumber}:ACTUAL=${token.rawNumber}`,
    );
  }

  if (repair.kind === "DROP_FALSE_REFERENCE_CONTINUATION_TOKEN") {
    return null;
  }

  if (repair.kind === "RENUMBER_SOURCE_VERSE_MARKER") {
    return {
      ...token,
      rawNumber: repair.replacementRawNumber,
    };
  }

  return token;
}

export function shouldDropAlmeida1911RawTextLine(
  bookId: string,
  tokenSourceLine: number,
  sourceLine: number,
  rawLine: string,
): boolean {
  const repair = RAW_TEXT_REPAIRS.find(
    (candidate) =>
      candidate.kind === "DROP_EXACT_CROSS_REFERENCE_METADATA_LINE" &&
      candidate.sourceLine === sourceLine,
  );

  if (
    !repair ||
    repair.kind !== "DROP_EXACT_CROSS_REFERENCE_METADATA_LINE"
  ) {
    return false;
  }

  if (repair.bookId !== bookId) {
    throw new Error(
      `ALM1911_RAW_TEXT_REPAIR_BOOK_MISMATCH:SOURCE_LINE=${sourceLine}:EXPECTED=${repair.bookId}:ACTUAL=${bookId}`,
    );
  }

  if (repair.tokenSourceLine !== tokenSourceLine) {
    throw new Error(
      `ALM1911_RAW_TEXT_REPAIR_TOKEN_SOURCE_LINE_MISMATCH:SOURCE_LINE=${sourceLine}:EXPECTED=${repair.tokenSourceLine}:ACTUAL=${tokenSourceLine}`,
    );
  }

  const trimmed = rawLine.trim();

  if (trimmed !== repair.raw) {
    throw new Error(
      `ALM1911_RAW_TEXT_REPAIR_RAW_MISMATCH:BOOK=${bookId}:SOURCE_LINE=${sourceLine}`,
    );
  }

  return true;
}
