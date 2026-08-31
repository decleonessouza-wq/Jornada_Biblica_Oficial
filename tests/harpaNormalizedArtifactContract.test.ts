import {
  createHash,
} from "node:crypto";

import {
  readFileSync,
} from "node:fs";

import * as path from "node:path";

import {
  HYMNAL_IMPORTER_CONTRACT_VERSION,
  type NormalizedHymnRecord,
} from "../src/hymnal/import/hymnalImportContract";

import {
  HARPA_NORMALIZED_ARTIFACT_BYTE_LENGTH,
  HARPA_NORMALIZED_ARTIFACT_ENCODING,
  HARPA_NORMALIZED_ARTIFACT_FINAL_NEWLINE,
  HARPA_NORMALIZED_ARTIFACT_LOCK,
  HARPA_NORMALIZED_ARTIFACT_NORMALIZER_VERSION,
  HARPA_NORMALIZED_ARTIFACT_PATH,
  HARPA_NORMALIZED_ARTIFACT_PHYSICAL_LINE_BREAK_COUNT,
  HARPA_NORMALIZED_ARTIFACT_PRETTY_PRINT,
  HARPA_NORMALIZED_ARTIFACT_RECORD_COUNT,
  HARPA_NORMALIZED_ARTIFACT_SCHEMA,
  HARPA_NORMALIZED_ARTIFACT_SECONDARY_TEXT_ALLOWED,
  HARPA_NORMALIZED_ARTIFACT_SERIALIZER,
  HARPA_NORMALIZED_ARTIFACT_SHA256,
  HARPA_NORMALIZED_CORPUS_SHA256,
  HARPA_NORMALIZED_IDENTITY_MANIFEST_SHA256,
  HARPA_NORMALIZED_STRUCTURE_SHA256,
} from "../src/hymnal/import/harpaNormalizedArtifactLock";

import {
  HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK,
} from "../src/hymnal/import/harpaSourceArtifactLocks";

import {
  HARPA_CORPUS_NORMALIZER_VERSION,
} from "../src/hymnal/normalization/harpaCorpusNormalizer";

function sha256Bytes(
  value: Uint8Array,
): string {
  return createHash("sha256")
    .update(value)
    .digest("hex");
}

function sha256Text(
  value: string,
): string {
  return createHash("sha256")
    .update(
      value,
      "utf8",
    )
    .digest("hex");
}

function getArtifactBytes() {
  const artifactPath =
    path.resolve(
      process.cwd(),
      HARPA_NORMALIZED_ARTIFACT_PATH,
    );

  return readFileSync(
    artifactPath,
  );
}

function getRecords(
  artifactText: string,
): readonly NormalizedHymnRecord[] {
  const root:
    unknown =
    JSON.parse(
      artifactText,
    );

  if (!Array.isArray(root)) {
    throw new Error(
      "HARPA_NORMALIZED_TEST_ROOT_NOT_ARRAY",
    );
  }

  return root as
    readonly NormalizedHymnRecord[];
}

describe(
  "Harpa normalized artifact contract",
  () => {
    it(
      "locks the governed artifact contract without embedding corpus text in the test source",
      () => {
        expect(
          HARPA_NORMALIZED_ARTIFACT_SCHEMA,
        ).toBe(
          "HARPA_NORMALIZED_CORPUS_V1",
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_PATH,
        ).toBe(
          "src/hymnal/corpus/harpa-crista-jornada-v1.normalized.json",
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_RECORD_COUNT,
        ).toBe(636);

        expect(
          HARPA_NORMALIZED_ARTIFACT_BYTE_LENGTH,
        ).toBe(629665);

        expect(
          HARPA_NORMALIZED_ARTIFACT_SHA256,
        ).toBe(
          "9008fe52549072268389576785b2f593f9471c4d192a4b3f578ed395390215f5",
        );

        expect(
          HARPA_NORMALIZED_CORPUS_SHA256,
        ).toBe(
          HARPA_NORMALIZED_ARTIFACT_SHA256,
        );

        expect(
          HARPA_NORMALIZED_STRUCTURE_SHA256,
        ).toBe(
          "2683482bf146fb16d9a399e926af10aab3f3f814eb05108bc0d1718f7a6438bc",
        );

        expect(
          HARPA_NORMALIZED_IDENTITY_MANIFEST_SHA256,
        ).toBe(
          "96e6da137fe98acdae9fb15575c2f80befc45867e3f06f7b60b977ea152871bc",
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_SERIALIZER,
        ).toBe(
          "JSON.stringify(normalized)",
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_ENCODING,
        ).toBe(
          "UTF8_NO_BOM",
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_PRETTY_PRINT,
        ).toBe(false);

        expect(
          HARPA_NORMALIZED_ARTIFACT_FINAL_NEWLINE,
        ).toBe(false);

        expect(
          HARPA_NORMALIZED_ARTIFACT_PHYSICAL_LINE_BREAK_COUNT,
        ).toBe(0);

        expect(
          HARPA_NORMALIZED_ARTIFACT_NORMALIZER_VERSION,
        ).toBe(
          HARPA_CORPUS_NORMALIZER_VERSION,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_SECONDARY_TEXT_ALLOWED,
        ).toBe(false);
      },
    );

    it(
      "matches the exact physical artifact identity",
      () => {
        const bytes =
          getArtifactBytes();

        expect(
          bytes.length,
        ).toBe(
          HARPA_NORMALIZED_ARTIFACT_BYTE_LENGTH,
        );

        expect(
          sha256Bytes(
            bytes,
          ),
        ).toBe(
          HARPA_NORMALIZED_ARTIFACT_SHA256,
        );

        const hasUtf8Bom =
          (
            bytes.length >= 3 &&
            bytes[0] === 0xef &&
            bytes[1] === 0xbb &&
            bytes[2] === 0xbf
          );

        expect(
          hasUtf8Bom,
        ).toBe(false);

        let lfCount =
          0;

        let crCount =
          0;

        for (const byte of bytes) {
          if (byte === 0x0a) {
            lfCount++;
          }

          if (byte === 0x0d) {
            crCount++;
          }
        }

        expect(
          lfCount,
        ).toBe(
          HARPA_NORMALIZED_ARTIFACT_PHYSICAL_LINE_BREAK_COUNT,
        );

        expect(
          crCount,
        ).toBe(0);

        expect(
          bytes[
            bytes.length - 1
          ],
        ).toBe(
          0x5d,
        );
      },
    );

    it(
      "contains exactly normalized numbers 1 through 636 with deterministic ids and valid section order",
      () => {
        const bytes =
          getArtifactBytes();

        const artifactText =
          bytes.toString(
            "utf8",
          );

        const records =
          getRecords(
            artifactText,
          );

        expect(
          records,
        ).toHaveLength(
          HARPA_NORMALIZED_ARTIFACT_RECORD_COUNT,
        );

        const ids =
          new Set<string>();

        const numbers =
          new Set<number>();

        let verseSectionCount =
          0;

        let chorusSectionCount =
          0;

        let totalSectionCount =
          0;

        records.forEach(
          (
            record,
            index,
          ) => {
            const expectedNumber =
              index + 1;

            expect(
              record.number,
            ).toBe(
              expectedNumber,
            );

            expect(
              record.id,
            ).toBe(
              `${HARPA_NORMALIZED_ARTIFACT_LOCK.editionId}:${expectedNumber}`,
            );

            expect(
              record.editionId,
            ).toBe(
              HARPA_NORMALIZED_ARTIFACT_LOCK.editionId,
            );

            expect(
              record.title.length,
            ).toBeGreaterThan(0);

            expect(
              record.firstLine,
            ).not.toBeNull();

            expect(
              record.firstLine === null
                ? 0
                : record.firstLine.length,
            ).toBeGreaterThan(0);

            expect(
              ids.has(
                record.id,
              ),
            ).toBe(false);

            expect(
              numbers.has(
                record.number,
              ),
            ).toBe(false);

            ids.add(
              record.id,
            );

            numbers.add(
              record.number,
            );

            expect(
              record.sections.length,
            ).toBeGreaterThan(0);

            record.sections.forEach(
              (
                section,
                sectionIndex,
              ) => {
                totalSectionCount++;

                expect(
                  section.order,
                ).toBe(
                  sectionIndex + 1,
                );

                expect(
                  section.kind === "VERSE" ||
                    section.kind === "CHORUS",
                ).toBe(true);

                expect(
                  typeof section.label,
                ).toBe(
                  "string",
                );

                expect(
                  section.text.length,
                ).toBeGreaterThan(0);

                expect(
                  section.text.includes(
                    "<br>",
                  ),
                ).toBe(false);

                expect(
                  section.text.includes(
                    "\r",
                  ),
                ).toBe(false);

                expect(
                  section.text
                    .split("\n")
                    .every(
                      (line) =>
                        line.length > 0 &&
                        line === line.trim(),
                    ),
                ).toBe(true);

                if (
                  section.kind ===
                  "VERSE"
                ) {
                  verseSectionCount++;
                }

                if (
                  section.kind ===
                  "CHORUS"
                ) {
                  chorusSectionCount++;
                }
              },
            );

            expect(
              record.firstLine,
            ).toBe(
              record.sections[0]
                .text
                .split("\n")[0],
            );
          },
        );

        expect(
          ids.size,
        ).toBe(636);

        expect(
          numbers.size,
        ).toBe(636);

        expect(
          records.some(
            (record) =>
              record.number >= 637,
          ),
        ).toBe(false);

        expect(
          verseSectionCount,
        ).toBe(2279);

        expect(
          chorusSectionCount,
        ).toBe(428);

        expect(
          totalSectionCount,
        ).toBe(2707);
      },
    );

    it(
      "preserves the governed structural reclassification for hymn 403 without exposing its text",
      () => {
        const records =
          getRecords(
            getArtifactBytes()
              .toString(
                "utf8",
              ),
          );

        const record =
          records[402];

        expect(
          record.number,
        ).toBe(403);

        expect(
          record.sections.map(
            (section) =>
              section.kind,
          ),
        ).toEqual([
          "VERSE",
          "CHORUS",
          "VERSE",
          "VERSE",
        ]);

        expect(
          record.sections.map(
            (section) =>
              section.label,
          ),
        ).toEqual([
          "1",
          "Coro",
          "2",
          "3",
        ]);

        expect(
          record.sections.map(
            (section) =>
              section.order,
          ),
        ).toEqual([
          1,
          2,
          3,
          4,
        ]);

        expect(
          record.sections.map(
            (section) =>
              section.text
                .split("\n")
                .length,
          ),
        ).toEqual([
          4,
          4,
          4,
          4,
        ]);
      },
    );

    it(
      "reproduces the frozen structure and identity hashes",
      () => {
        const records =
          getRecords(
            getArtifactBytes()
              .toString(
                "utf8",
              ),
          );

        const structure =
          records.map(
            (record) => ({
              editionId:
                record.editionId,
              id:
                record.id,
              number:
                record.number,
              titleLength:
                record.title.length,
              firstLineLength:
                record.firstLine === null
                  ? null
                  : record.firstLine.length,
              sections:
                record.sections.map(
                  (section) => ({
                    order:
                      section.order,
                    kind:
                      section.kind,
                    label:
                      section.label,
                    lineCount:
                      section.text
                        .split("\n")
                        .length,
                    textLength:
                      section.text.length,
                  }),
                ),
            }),
          );

        const identity =
          records.map(
            (record) => ({
              editionId:
                record.editionId,
              id:
                record.id,
              number:
                record.number,
            }),
          );

        expect(
          sha256Text(
            JSON.stringify(
              structure,
            ),
          ),
        ).toBe(
          HARPA_NORMALIZED_STRUCTURE_SHA256,
        );

        expect(
          sha256Text(
            JSON.stringify(
              identity,
            ),
          ),
        ).toBe(
          HARPA_NORMALIZED_IDENTITY_MANIFEST_SHA256,
        );

        const reserialized =
          JSON.stringify(
            records,
          );

        expect(
          Buffer.byteLength(
            reserialized,
            "utf8",
          ),
        ).toBe(
          HARPA_NORMALIZED_ARTIFACT_BYTE_LENGTH,
        );

        expect(
          sha256Text(
            reserialized,
          ),
        ).toBe(
          HARPA_NORMALIZED_ARTIFACT_SHA256,
        );
      },
    );

    it(
      "preserves the primary source provenance in the normalized artifact lock",
      () => {
        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.editionId,
        ).toBe(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.editionId,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.sourceArtifact,
        ).toBe(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.sourceArtifact,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.sourceArtifactKind,
        ).toBe(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.sourceArtifactKind,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.sourceArtifactOrigin,
        ).toBe(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.sourceArtifactOrigin,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.sourceRevision,
        ).toBe(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.sourceRevision,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.sourceSha256,
        ).toBe(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.sourceSha256,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.sourceByteLength,
        ).toBe(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.sourceByteLength,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.lockedAt,
        ).toBe(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.lockedAt,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.normalizedSha256,
        ).toBe(
          HARPA_NORMALIZED_ARTIFACT_SHA256,
        );

        expect(
          HARPA_NORMALIZED_ARTIFACT_LOCK.importerVersion,
        ).toBe(
          HYMNAL_IMPORTER_CONTRACT_VERSION,
        );
      },
    );
  },
);