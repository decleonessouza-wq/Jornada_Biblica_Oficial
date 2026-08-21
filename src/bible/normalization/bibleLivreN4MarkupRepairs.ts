import type { BibleParsedVerseDraft } from "../import/bibleImportContract";

const BLIVRE_N4_LOCKED_SOURCE_SHA256 =
  "C198020E4BAEF537D1C12AC67B6135D023217D138D67871B6078C6E260016180";

interface BibleLivreN4MarkupRepairPolicy {
  readonly expectedRawSha256: string;
  readonly expectedNormalizedText: string;
  readonly apply: (rawText: string) => string;
}

export interface BibleLivreN4MarkupRepairResult {
  readonly rawText: string;
  readonly repaired: boolean;
  readonly repairReference: string | null;
  readonly expectedNormalizedText: string | null;
}

function normalizeEol(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function utf8Bytes(value: string): number[] {
  const bytes: number[] = [];

  for (let index = 0; index < value.length; index += 1) {
    let codePoint = value.charCodeAt(index);

    if (
      codePoint >= 0xd800 &&
      codePoint <= 0xdbff &&
      index + 1 < value.length
    ) {
      const low = value.charCodeAt(index + 1);

      if (low >= 0xdc00 && low <= 0xdfff) {
        codePoint =
          ((codePoint - 0xd800) << 10) +
          (low - 0xdc00) +
          0x10000;
        index += 1;
      }
    }

    if (codePoint <= 0x7f) {
      bytes.push(codePoint);
    } else if (codePoint <= 0x7ff) {
      bytes.push(
        0xc0 | (codePoint >>> 6),
        0x80 | (codePoint & 0x3f),
      );
    } else if (codePoint <= 0xffff) {
      bytes.push(
        0xe0 | (codePoint >>> 12),
        0x80 | ((codePoint >>> 6) & 0x3f),
        0x80 | (codePoint & 0x3f),
      );
    } else {
      bytes.push(
        0xf0 | (codePoint >>> 18),
        0x80 | ((codePoint >>> 12) & 0x3f),
        0x80 | ((codePoint >>> 6) & 0x3f),
        0x80 | (codePoint & 0x3f),
      );
    }
  }

  return bytes;
}

function rotateRight(value: number, amount: number): number {
  return (value >>> amount) | (value << (32 - amount));
}

function sha256Utf8(value: string): string {
  const bytes = utf8Bytes(value);
  const bitLength = bytes.length * 8;

  bytes.push(0x80);

  while (bytes.length % 64 !== 56) {
    bytes.push(0);
  }

  const high = Math.floor(bitLength / 0x100000000);
  const low = bitLength >>> 0;

  for (let shift = 24; shift >= 0; shift -= 8) {
    bytes.push((high >>> shift) & 0xff);
  }

  for (let shift = 24; shift >= 0; shift -= 8) {
    bytes.push((low >>> shift) & 0xff);
  }

  const hash = [
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19,
  ];

  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
    0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
    0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
    0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const words = new Array<number>(64).fill(0);

    for (let index = 0; index < 16; index += 1) {
      const base = offset + index * 4;

      words[index] =
        ((bytes[base] ?? 0) << 24) |
        ((bytes[base + 1] ?? 0) << 16) |
        ((bytes[base + 2] ?? 0) << 8) |
        (bytes[base + 3] ?? 0);
    }

    for (let index = 16; index < 64; index += 1) {
      const w15 = words[index - 15] ?? 0;
      const w2 = words[index - 2] ?? 0;

      const s0 =
        rotateRight(w15, 7) ^
        rotateRight(w15, 18) ^
        (w15 >>> 3);

      const s1 =
        rotateRight(w2, 17) ^
        rotateRight(w2, 19) ^
        (w2 >>> 10);

      words[index] = (
        (words[index - 16] ?? 0) +
        s0 +
        (words[index - 7] ?? 0) +
        s1
      ) >>> 0;
    }

    let a = hash[0] ?? 0;
    let b = hash[1] ?? 0;
    let c = hash[2] ?? 0;
    let d = hash[3] ?? 0;
    let e = hash[4] ?? 0;
    let f = hash[5] ?? 0;
    let g = hash[6] ?? 0;
    let h = hash[7] ?? 0;

    for (let index = 0; index < 64; index += 1) {
      const s1 =
        rotateRight(e, 6) ^
        rotateRight(e, 11) ^
        rotateRight(e, 25);

      const choice = (e & f) ^ (~e & g);

      const temp1 = (
        h +
        s1 +
        choice +
        (k[index] ?? 0) +
        (words[index] ?? 0)
      ) >>> 0;

      const s0 =
        rotateRight(a, 2) ^
        rotateRight(a, 13) ^
        rotateRight(a, 22);

      const majority =
        (a & b) ^
        (a & c) ^
        (b & c);

      const temp2 = (s0 + majority) >>> 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    hash[0] = ((hash[0] ?? 0) + a) >>> 0;
    hash[1] = ((hash[1] ?? 0) + b) >>> 0;
    hash[2] = ((hash[2] ?? 0) + c) >>> 0;
    hash[3] = ((hash[3] ?? 0) + d) >>> 0;
    hash[4] = ((hash[4] ?? 0) + e) >>> 0;
    hash[5] = ((hash[5] ?? 0) + f) >>> 0;
    hash[6] = ((hash[6] ?? 0) + g) >>> 0;
    hash[7] = ((hash[7] ?? 0) + h) >>> 0;
  }

  return hash
    .map((value) => value.toString(16).padStart(8, "0"))
    .join("")
    .toUpperCase();
}

function exactIndexes(
  lines: readonly string[],
  expectedTrimmed: string,
): number[] {
  const indexes: number[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    if ((lines[index] ?? "").trim() === expectedTrimmed) {
      indexes.push(index);
    }
  }

  return indexes;
}

function replaceNthExact(
  lines: readonly string[],
  expectedTrimmed: string,
  occurrence: number,
  replacementLines: readonly string[],
  label: string,
): string[] {
  const indexes = exactIndexes(lines, expectedTrimmed);

  if (indexes.length < occurrence) {
    throw new Error(
      `BLIVRE_N4_REPAIR_SIGNATURE_MISSING:${label}:TOKEN=${expectedTrimmed}:OCCURRENCE=${occurrence}:COUNT=${indexes.length}`,
    );
  }

  const index = indexes[occurrence - 1];

  if (index === undefined) {
    throw new Error(
      `BLIVRE_N4_REPAIR_INDEX_MISSING:${label}`,
    );
  }

  return [
    ...lines.slice(0, index),
    ...replacementLines,
    ...lines.slice(index + 1),
  ];
}

function insertBeforeNthExact(
  lines: readonly string[],
  expectedTrimmed: string,
  occurrence: number,
  insertedLines: readonly string[],
  label: string,
): string[] {
  const indexes = exactIndexes(lines, expectedTrimmed);

  if (indexes.length < occurrence) {
    throw new Error(
      `BLIVRE_N4_REPAIR_INSERT_SIGNATURE_MISSING:${label}:TOKEN=${expectedTrimmed}:OCCURRENCE=${occurrence}:COUNT=${indexes.length}`,
    );
  }

  const index = indexes[occurrence - 1];

  if (index === undefined) {
    throw new Error(
      `BLIVRE_N4_REPAIR_INSERT_INDEX_MISSING:${label}`,
    );
  }

  return [
    ...lines.slice(0, index),
    ...insertedLines,
    ...lines.slice(index),
  ];
}

function replaceExactTextLine(
  lines: readonly string[],
  expectedExact: string,
  replacementExact: string,
  label: string,
): string[] {
  const indexes: number[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index] === expectedExact) {
      indexes.push(index);
    }
  }

  if (indexes.length !== 1) {
    throw new Error(
      `BLIVRE_N4_REPAIR_TEXT_SIGNATURE_COUNT:${label}:COUNT=${indexes.length}`,
    );
  }

  const index = indexes[0];

  if (index === undefined) {
    throw new Error(
      `BLIVRE_N4_REPAIR_TEXT_INDEX_MISSING:${label}`,
    );
  }

  return [
    ...lines.slice(0, index),
    replacementExact,
    ...lines.slice(index + 1),
  ];
}

function repairJohn1614(rawText: string): string {
  const lines = normalizeEol(rawText).split("\n");
  const indexes = exactIndexes(lines, "\\added");

  if (indexes.length !== 2) {
    throw new Error(
      `BLIVRE_N4_REPAIR_JHN_16_14_ADDED_OPEN_COUNT:${indexes.length}`,
    );
  }

  const secondIndex = indexes[1];

  if (secondIndex === undefined) {
    throw new Error(
      "BLIVRE_N4_REPAIR_JHN_16_14_SECOND_ADDED_MISSING",
    );
  }

  return [
    ...lines.slice(0, secondIndex),
    "\\*added",
    ...lines.slice(secondIndex),
  ].join("\n").trim();
}

function repairLuke144(rawText: string): string {
  const lines = replaceNthExact(
    normalizeEol(rawText).split("\n"),
    "\\fn",
    3,
    ["\\*fn"],
    "LUK_14_4_THIRD_FN_TO_CLOSE",
  );

  return lines.join("\n").trim();
}

function repairLuke211(rawText: string): string {
  const lines = replaceNthExact(
    normalizeEol(rawText).split("\n"),
    "*added",
    1,
    ["\\*added"],
    "LUK_21_1_MISSING_BACKSLASH",
  );

  return lines.join("\n").trim();
}

function repairPsalm14414(rawText: string): string {
  let lines = normalizeEol(rawText).split("\n");

  lines = replaceNthExact(
    lines,
    "\\fn",
    1,
    [],
    "PSA_144_14_REMOVE_EXTRANEOUS_FN",
  );

  lines = insertBeforeNthExact(
    lines,
    "\\fn",
    1,
    ["\\*added"],
    "PSA_144_14_CLOSE_ADDED_BEFORE_REAL_FN",
  );

  lines = replaceExactTextLine(
    lines,
    ", nem saídas ",
    " nem saídas ",
    "PSA_144_14_REMOVE_DUPLICATED_LEADING_COMMA",
  );

  return lines.join("\n").trim();
}

const REPAIR_POLICIES: Readonly<
  Record<string, BibleLivreN4MarkupRepairPolicy>
> = {
  "JHN:16:14": {
    expectedRawSha256:
      "519D68E30CCF876C09ECF5667F4D04FCCE8C44E1E8FBCDC5BFE57E38A59315C2",
    expectedNormalizedText:
      "Ele me glorificará, porque receberá do que é meu, e o anunciará a vós mesmos.",
    apply: repairJohn1614,
  },
  "LUK:14:4": {
    expectedRawSha256:
      "04434898C511589953413D6A84113D55D825C6675BA8F79532D54FE72A071028",
    expectedNormalizedText:
      "Eles, porém, ficaram calados; e Jesus, tomando aquele homem, curou-o, e o despediu.",
    apply: repairLuke144,
  },
  "LUK:21:1": {
    expectedRawSha256:
      "136388C05A82B9D2FEEF5FA9FE17BEDD1D655B9E36A8990E1361642D0827373C",
    expectedNormalizedText:
      "E Jesus, olhando, viu os ricos lançarem suas ofertas na arca do tesouro do Templo.",
    apply: repairLuke211,
  },
  "PSA:144:14": {
    expectedRawSha256:
      "6A7D2B8CBA51EBBDC5CF8FAB5CBB635ACE1FAE8607A23C388BAE0686BE940F85",
    expectedNormalizedText:
      "Nossos bois sejam fortes para o trabalho; não haja nem brechas nos muros, nem saídas ao cativeiro, nem gritos de pânico em nossas ruas.",
    apply: repairPsalm14414,
  },
};

function repairReferenceKey(
  verse: BibleParsedVerseDraft,
): string {
  return `${verse.bookId}:${verse.chapter}:${verse.verse}`;
}

export function repairBibleLivreN4Markup(
  verse: BibleParsedVerseDraft,
  sourceSha256: string,
): BibleLivreN4MarkupRepairResult {
  const reference = repairReferenceKey(verse);
  const policy = REPAIR_POLICIES[reference];

  if (!policy) {
    return {
      rawText: verse.rawText,
      repaired: false,
      repairReference: null,
      expectedNormalizedText: null,
    };
  }

  if (sourceSha256 !== BLIVRE_N4_LOCKED_SOURCE_SHA256) {
    throw new Error(
      `BLIVRE_N4_REPAIR_SOURCE_SHA_MISMATCH:${reference}:EXPECTED=${BLIVRE_N4_LOCKED_SOURCE_SHA256}:ACTUAL=${sourceSha256}`,
    );
  }

  const actualRawSha256 = sha256Utf8(verse.rawText);

  if (actualRawSha256 !== policy.expectedRawSha256) {
    throw new Error(
      `BLIVRE_N4_REPAIR_RAW_SHA_MISMATCH:${reference}:EXPECTED=${policy.expectedRawSha256}:ACTUAL=${actualRawSha256}`,
    );
  }

  return {
    rawText: policy.apply(verse.rawText),
    repaired: true,
    repairReference: reference,
    expectedNormalizedText: policy.expectedNormalizedText,
  };
}

export function assertBibleLivreN4RepairOutput(
  repair: BibleLivreN4MarkupRepairResult,
  normalizedText: string,
): void {
  if (!repair.repaired) {
    return;
  }

  if (
    repair.expectedNormalizedText === null ||
    repair.repairReference === null
  ) {
    throw new Error(
      "BLIVRE_N4_REPAIR_OUTPUT_ASSERTION_CONTRACT_INVALID",
    );
  }

  if (normalizedText !== repair.expectedNormalizedText) {
    throw new Error(
      `BLIVRE_N4_REPAIR_OUTPUT_MISMATCH:${repair.repairReference}`,
    );
  }
}
