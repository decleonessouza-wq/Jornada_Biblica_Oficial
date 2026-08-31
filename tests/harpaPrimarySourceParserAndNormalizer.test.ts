import {
  HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
  HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT,
  HARPA_PRIMARY_SOURCE_PARSER_VERSION,
  parseHarpaPrimarySourceJson,
} from "../src/hymnal/import/harpaPrimarySourceParser";

import {
  HARPA_CORPUS_NORMALIZER_VERSION,
  HARPA_TEXT_CANONICALIZATION_RULES,
  normalizeHarpaCorpus,
} from "../src/hymnal/normalization/harpaCorpusNormalizer";

type MutableSyntheticHymn = {
  hino: string;
  coro: string;
  verses: Record<string, string>;
};

type MutableSyntheticRoot =
  Record<string, unknown>;

function syntheticLines(
  prefix: string,
  count: number,
): string {
  return Array.from(
    {
      length: count,
    },
    (_, index) =>
      `[SYNTHETIC] ${prefix} linha ${index + 1}`,
  ).join(
    " <br> ",
  );
}

function createSyntheticRoot():
  MutableSyntheticRoot {
  const root:
    MutableSyntheticRoot = {
      "-1": {
        kind:
          "SYNTHETIC_TEST_METADATA",
      },
    };

  for (
    let number = 1;
    number <= 640;
    number++
  ) {
    if (number === 403) {
      root[
        String(number)
      ] = {
        hino:
          "403 - Hino Sintético 403",
        coro: [
          syntheticLines(
            "H403 coro",
            4,
          ),
          syntheticLines(
            "H403 estrofe 2",
            4,
          ),
        ].join(
          " <br> ",
        ),
        verses: {
          "1":
            syntheticLines(
              "H403 estrofe 1",
              4,
            ),
          "3":
            syntheticLines(
              "H403 estrofe 3",
              4,
            ),
        },
      } satisfies MutableSyntheticHymn;

      continue;
    }

    const hasChorus =
      number === 2;

    const hasSecondVerse =
      number === 2;

    root[
      String(number)
    ] = {
      hino:
        `${number} - Hino Sintético ${number}`,
      coro:
        hasChorus
          ? syntheticLines(
              `coro ${number}`,
              2,
            )
          : "",
      verses:
        hasSecondVerse
          ? {
              "1":
                syntheticLines(
                  `estrofe 1 hino ${number}`,
                  2,
                ),
              "2":
                syntheticLines(
                  `estrofe 2 hino ${number}`,
                  2,
                ),
            }
          : {
              "1":
                syntheticLines(
                  `estrofe 1 hino ${number}`,
                  2,
                ),
            },
    } satisfies MutableSyntheticHymn;
  }

  return root;
}

function getSyntheticHymn(
  root:
    MutableSyntheticRoot,
  number: number,
): MutableSyntheticHymn {
  const value =
    root[
      String(
        number,
      )
    ];

  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(
      value,
    )
  ) {
    throw new Error(
      `SYNTHETIC_FIXTURE_MISSING:${number}`,
    );
  }

  return value as
    MutableSyntheticHymn;
}

function stringifySyntheticRoot(
  root:
    MutableSyntheticRoot =
      createSyntheticRoot(),
): string {
  return JSON.stringify(
    root,
  );
}

describe(
  "Harpa primary-source parser and normalizer",
  () => {
    it(
      "locks parser and normalizer design versions and canonicalization rules",
      () => {
        expect(
          HARPA_PRIMARY_SOURCE_PARSER_VERSION,
        ).toBe(1);

        expect(
          HARPA_CORPUS_NORMALIZER_VERSION,
        ).toBe(1);

        expect(
          HARPA_PRIMARY_SOURCE_ALLOWED_MARKUP_TOKEN,
        ).toBe("<br>");

        expect(
          HARPA_TEXT_CANONICALIZATION_RULES,
        ).toEqual({
          markupToken:
            "<br>",
          markupReplacement:
            "\n",
          trimEachLine:
            true,
          normalizeUnicode:
            false,
          decodeHtmlEntities:
            false,
          sanitizeControlCharacters:
            false,
          collapseEmptyLines:
            false,
        });
      },
    );

    it(
      "parses exactly 640 synthetic records deterministically",
      () => {
        const parsed =
          parseHarpaPrimarySourceJson(
            stringifySyntheticRoot(),
          );

        expect(
          parsed.kind,
        ).toBe(
          "HARPA_PRIMARY_SOURCE_PARSED_V1",
        );

        expect(
          parsed.hymns,
        ).toHaveLength(
          HARPA_PRIMARY_SOURCE_EXPECTED_RAW_HYMN_COUNT,
        );

        expect(
          parsed.hymns[0],
        ).toMatchObject({
          number:
            1,
          title:
            "Hino Sintético 1",
        });

        expect(
          parsed.hymns[402],
        ).toMatchObject({
          number:
            403,
          title:
            "Hino Sintético 403",
        });

        expect(
          parsed.hymns[639],
        ).toMatchObject({
          number:
            640,
          title:
            "Hino Sintético 640",
        });
      },
    );

    it(
      "normalizes exactly target numbers 1 through 636 with deterministic ids",
      () => {
        const normalized =
          normalizeHarpaCorpus(
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(),
            ),
          );

        expect(
          normalized,
        ).toHaveLength(636);

        expect(
          normalized[0].number,
        ).toBe(1);

        expect(
          normalized[635].number,
        ).toBe(636);

        expect(
          normalized[0].id,
        ).toBe(
          "harpa-crista-jornada-v1:1",
        );

        expect(
          normalized[635].id,
        ).toBe(
          "harpa-crista-jornada-v1:636",
        );

        expect(
          normalized.some(
            (hymn) =>
              hymn.number >= 637,
          ),
        ).toBe(false);
      },
    );

    it(
      "places chorus after verse 1 and before later verses",
      () => {
        const normalized =
          normalizeHarpaCorpus(
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(),
            ),
          );

        const hymn2 =
          normalized[1];

        expect(
          hymn2.sections.map(
            (section) =>
              section.kind,
          ),
        ).toEqual([
          "VERSE",
          "CHORUS",
          "VERSE",
        ]);

        expect(
          hymn2.sections.map(
            (section) =>
              section.label,
          ),
        ).toEqual([
          "1",
          "Coro",
          "2",
        ]);

        expect(
          hymn2.sections.map(
            (section) =>
              section.order,
          ),
        ).toEqual([
          1,
          2,
          3,
        ]);
      },
    );

    it(
      "omits an empty chorus and derives firstLine from verse 1",
      () => {
        const normalized =
          normalizeHarpaCorpus(
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(),
            ),
          );

        const hymn1 =
          normalized[0];

        expect(
          hymn1.sections,
        ).toHaveLength(1);

        expect(
          hymn1.sections[0].kind,
        ).toBe("VERSE");

        expect(
          hymn1.firstLine,
        ).toBe(
          "[SYNTHETIC] estrofe 1 hino 1 linha 1",
        );

        expect(
          hymn1.sections[0].text,
        ).toBe(
          [
            "[SYNTHETIC] estrofe 1 hino 1 linha 1",
            "[SYNTHETIC] estrofe 1 hino 1 linha 2",
          ].join(
            "\n",
          ),
        );
      },
    );

    it(
      "reclassifies synthetic hymn 403 using only primary-source fields",
      () => {
        const normalized =
          normalizeHarpaCorpus(
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(),
            ),
          );

        const hymn403 =
          normalized[402];

        expect(
          hymn403.number,
        ).toBe(403);

        expect(
          hymn403.sections.map(
            (section) => [
              section.kind,
              section.label,
              section.order,
            ],
          ),
        ).toEqual([
          [
            "VERSE",
            "1",
            1,
          ],
          [
            "CHORUS",
            "Coro",
            2,
          ],
          [
            "VERSE",
            "2",
            3,
          ],
          [
            "VERSE",
            "3",
            4,
          ],
        ]);

        expect(
          hymn403.sections[1].text,
        ).toBe(
          syntheticLines(
            "H403 coro",
            4,
          )
            .split(
              " <br> ",
            )
            .join(
              "\n",
            ),
        );

        expect(
          hymn403.sections[2].text,
        ).toBe(
          syntheticLines(
            "H403 estrofe 2",
            4,
          )
            .split(
              " <br> ",
            )
            .join(
              "\n",
            ),
        );

        expect(
          hymn403.firstLine,
        ).toBe(
          "[SYNTHETIC] H403 estrofe 1 linha 1",
        );
      },
    );

    it(
      "rejects a missing raw hymn number",
      () => {
        const root =
          createSyntheticRoot();

        delete root["640"];

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_MISSING_ROOT_KEYS:640",
        );
      },
    );

    it(
      "rejects an unexpected root key",
      () => {
        const root =
          createSyntheticRoot();

        root["641"] = {
          synthetic:
            true,
        };

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_UNEXPECTED_ROOT_KEYS:641",
        );
      },
    );

    it(
      "rejects unexpected hymn record fields",
      () => {
        const root =
          createSyntheticRoot();

        const record =
          getSyntheticHymn(
            root,
            7,
          );

        (
          record as unknown as
            Record<string, unknown>
        ).unexpected =
          "[SYNTHETIC]";

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_INVALID_RECORD_FIELDS:7",
        );
      },
    );

    it(
      "rejects title number mismatch",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          5,
        ).hino =
          "6 - Hino Sintético 5";

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_TITLE_NUMBER_MISMATCH:5:6",
        );
      },
    );

    it(
      "rejects markup variants other than literal br",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          10,
        ).verses["1"] =
          "[SYNTHETIC] A<br/>B";

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_UNSUPPORTED_MARKUP:10.verses.1",
        );
      },
    );

    it(
      "rejects other html tags",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          11,
        ).verses["1"] =
          "[SYNTHETIC] <strong>texto</strong>";

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_UNSUPPORTED_MARKUP:11.verses.1",
        );
      },
    );

    it(
      "rejects html entities",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          12,
        ).verses["1"] =
          "[SYNTHETIC] A &amp; B";

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_HTML_ENTITY:12.verses.1",
        );
      },
    );

    it(
      "rejects physical control characters inside parsed text fields",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          13,
        ).verses["1"] =
          "[SYNTHETIC] A\tB";

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_CONTROL_CHARACTER:13.verses.1",
        );
      },
    );

    it(
      "rejects a parsed line feed inside a text field",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          14,
        ).verses["1"] =
          "[SYNTHETIC] A\nB";

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_CONTROL_CHARACTER:14.verses.1",
        );
      },
    );

    it(
      "rejects non-NFC text",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          15,
        ).verses["1"] =
          "[SYNTHETIC] Cafe\u0301";

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_NON_NFC_TEXT:15.verses.1",
        );
      },
    );

    it(
      "rejects noncontiguous ordinary verse keys",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          16,
        ).verses = {
          "1":
            "[SYNTHETIC] estrofe 1",
          "3":
            "[SYNTHETIC] estrofe 3",
        };

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_NONCONTIGUOUS_VERSE_KEYS:16:1,3",
        );
      },
    );

    it(
      "rejects any change to the governed 403 verse-key shape",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          403,
        ).verses["2"] =
          syntheticLines(
            "H403 artificial extra",
            4,
          );

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_NONCONTIGUOUS_VERSE_KEYS:403:1,2,3",
        );
      },
    );

    it(
      "rejects any change to the governed 403 coro line count",
      () => {
        const root =
          createSyntheticRoot();

        getSyntheticHymn(
          root,
          403,
        ).coro =
          syntheticLines(
            "H403 coro alterado",
            7,
          );

        expect(
          () =>
            parseHarpaPrimarySourceJson(
              stringifySyntheticRoot(
                root,
              ),
            ),
        ).toThrow(
          "HARPA_PRIMARY_SOURCE_H403_CORO_LINE_COUNT:7",
        );
      },
    );
  },
);