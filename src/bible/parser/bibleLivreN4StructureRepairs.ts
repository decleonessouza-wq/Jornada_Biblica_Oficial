import type { BibleParsedVerseDraft } from "../import/bibleImportContract";

const BLIVRE_N4_LOCKED_SOURCE_SHA256 =
  "C198020E4BAEF537D1C12AC67B6135D023217D138D67871B6078C6E260016180";

const MRK_5_18_MERGED_RAW_SHA256 =
  "26CCA3422E6DBB3DF144217A6614FE46D4440D5C565026024F29AD380AC45B74";

const MRK_5_18_SPLIT_RAW_SHA256 =
  "9D87CF35E8C0730EDA7B9544A2DDC9BC66452886F9CB0AF9286AFD270A55CBEA";

const MRK_5_19_SPLIT_RAW_SHA256 =
  "C2E18A7F6E764EA7BBCB943FA9B6B0E4F97F32BEACAD219811B6F006FDE3B180";

const MRK_5_SPLIT_ANCHOR = "Porém";

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

function isReference(
  verse: BibleParsedVerseDraft,
  chapter: number,
  verseNumber: number,
): boolean {
  return (
    verse.bookId === "MRK" &&
    verse.chapter === chapter &&
    verse.verse === verseNumber
  );
}

function assertSingleReference(
  verses: readonly BibleParsedVerseDraft[],
  chapter: number,
  verseNumber: number,
): BibleParsedVerseDraft {
  const matches = verses.filter((verse) =>
    isReference(verse, chapter, verseNumber),
  );

  if (matches.length !== 1) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_REFERENCE_COUNT:MRK:${chapter}:${verseNumber}:EXPECTED=1:ACTUAL=${matches.length}`,
    );
  }

  const match = matches[0];

  if (!match) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_REFERENCE_MISSING:MRK:${chapter}:${verseNumber}`,
    );
  }

  return match;
}

function assertReferenceAbsent(
  verses: readonly BibleParsedVerseDraft[],
  chapter: number,
  verseNumber: number,
): void {
  const count = verses.filter((verse) =>
    isReference(verse, chapter, verseNumber),
  ).length;

  if (count !== 0) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_REFERENCE_EXPECTED_ABSENT:MRK:${chapter}:${verseNumber}:ACTUAL=${count}`,
    );
  }
}

function splitMergedMark518(
  verse: BibleParsedVerseDraft,
): readonly [BibleParsedVerseDraft, BibleParsedVerseDraft] {
  const actualMergedSha256 = sha256Utf8(verse.rawText);

  if (actualMergedSha256 !== MRK_5_18_MERGED_RAW_SHA256) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_MRK_5_18_RAW_SHA_MISMATCH:EXPECTED=${MRK_5_18_MERGED_RAW_SHA256}:ACTUAL=${actualMergedSha256}`,
    );
  }

  const lines = normalizeEol(verse.rawText).split("\n");
  const anchorIndexes: number[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    if ((lines[index] ?? "").trim() === MRK_5_SPLIT_ANCHOR) {
      anchorIndexes.push(index);
    }
  }

  if (anchorIndexes.length !== 1) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_MRK_5_SPLIT_ANCHOR_COUNT:EXPECTED=1:ACTUAL=${anchorIndexes.length}`,
    );
  }

  const splitIndex = anchorIndexes[0];

  if (
    splitIndex === undefined ||
    splitIndex <= 0 ||
    splitIndex >= lines.length
  ) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_MRK_5_SPLIT_INDEX_INVALID:${splitIndex}`,
    );
  }

  const verse18RawText = lines
    .slice(0, splitIndex)
    .join("\n")
    .trim();

  const verse19RawText = lines
    .slice(splitIndex)
    .join("\n")
    .trim();

  const verse18Sha256 = sha256Utf8(verse18RawText);
  const verse19Sha256 = sha256Utf8(verse19RawText);

  if (verse18Sha256 !== MRK_5_18_SPLIT_RAW_SHA256) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_MRK_5_18_SPLIT_SHA_MISMATCH:EXPECTED=${MRK_5_18_SPLIT_RAW_SHA256}:ACTUAL=${verse18Sha256}`,
    );
  }

  if (verse19Sha256 !== MRK_5_19_SPLIT_RAW_SHA256) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_MRK_5_19_SPLIT_SHA_MISMATCH:EXPECTED=${MRK_5_19_SPLIT_RAW_SHA256}:ACTUAL=${verse19Sha256}`,
    );
  }

  return [
    {
      ...verse,
      verse: 18,
      rawText: verse18RawText,
    },
    {
      ...verse,
      verse: 19,
      rawText: verse19RawText,
    },
  ];
}

function assertMark5Sequence(
  verses: readonly BibleParsedVerseDraft[],
): void {
  const mark5 = verses
    .filter(
      (verse) =>
        verse.bookId === "MRK" &&
        verse.chapter === 5,
    )
    .map((verse) => verse.verse)
    .sort((left, right) => left - right);

  if (mark5.length !== 43) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_MRK_5_VERSE_COUNT:EXPECTED=43:ACTUAL=${mark5.length}`,
    );
  }

  for (let index = 0; index < mark5.length; index += 1) {
    const expected = index + 1;
    const actual = mark5[index];

    if (actual !== expected) {
      throw new Error(
        `BLIVRE_N4_STRUCTURE_MRK_5_SEQUENCE:EXPECTED=${expected}:ACTUAL=${actual}`,
      );
    }
  }
}

export function repairBibleLivreN4Structure(
  verses: readonly BibleParsedVerseDraft[],
  sourceSha256: string,
): readonly BibleParsedVerseDraft[] {
  const firstBookId = verses[0]?.bookId;

  if (firstBookId !== "MRK") {
    return verses;
  }

  if (sourceSha256 !== BLIVRE_N4_LOCKED_SOURCE_SHA256) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_REPAIR_SOURCE_SHA_MISMATCH:EXPECTED=${BLIVRE_N4_LOCKED_SOURCE_SHA256}:ACTUAL=${sourceSha256}`,
    );
  }

  const mergedVerse18 = assertSingleReference(
    verses,
    5,
    18,
  );

  assertReferenceAbsent(verses, 5, 19);
  assertSingleReference(verses, 5, 20);

  const [verse18, verse19] =
    splitMergedMark518(mergedVerse18);

  const repaired: BibleParsedVerseDraft[] = [];

  for (const verse of verses) {
    if (isReference(verse, 5, 18)) {
      repaired.push(verse18, verse19);
    } else {
      repaired.push(verse);
    }
  }

  if (repaired.length !== verses.length + 1) {
    throw new Error(
      `BLIVRE_N4_STRUCTURE_REPAIR_COUNT_MISMATCH:EXPECTED=${verses.length + 1}:ACTUAL=${repaired.length}`,
    );
  }

  assertMark5Sequence(repaired);

  return repaired;
}
