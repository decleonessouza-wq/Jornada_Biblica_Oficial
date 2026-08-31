import {
  REQUIRED_HYMN_COUNT,
} from "../src/domain/hymnal/hymnalContracts";

import {
  HARPA_JORNADA_EDITION_ID,
  HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK,
  HARPA_PRIMARY_SOURCE_PROVENANCE,
  HARPA_SECONDARY_CORROBORATION_SOURCE_LOCK,
  HARPA_SOURCE_LOCK_RECORDED_AT,
} from "../src/hymnal/import/harpaSourceArtifactLocks";

import {
  HARPA_H403_STRUCTURAL_RECLASSIFICATION,
  HARPA_NORMALIZATION_POLICY,
  HARPA_RAW_SOURCE_HYMN_COUNT,
  HARPA_TARGET_EXCLUDED_RAW_NUMBERS,
} from "../src/hymnal/normalization/harpaNormalizationPolicy";

describe(
  "Harpa governed source locks and normalization policy",
  () => {
    it(
      "locks the primary JSON source to the qualified upstream bytes",
      () => {
        expect(
          HARPA_PRIMARY_SOURCE_PROVENANCE,
        ).toEqual({
          role: "BASE_CORPUS_SOURCE",
          textPriority:
            "AUTHORITATIVE_FOR_PIPELINE_V1",
          repository:
            "DanielLiberato/Harpa-Crista-JSON-640-Hinos-Completa",
          path:
            "harpa_crista_640_hinos.json",
          commit:
            "e8ff5ca2f9c9e7d9892c0c68f2ad45eea3273127",
          gitBlob:
            "8d0ebad70f2c0c906967f90b45b01977ac4eaf95",
        });

        expect(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK,
        ).toEqual({
          editionId:
            "harpa-crista-jornada-v1",
          sourceArtifact:
            "harpa_crista_640_hinos.json",
          sourceArtifactKind:
            "JSON",
          sourceArtifactOrigin:
            "github:DanielLiberato/Harpa-Crista-JSON-640-Hinos-Completa@e8ff5ca2f9c9e7d9892c0c68f2ad45eea3273127:harpa_crista_640_hinos.json",
          sourceRevision:
            "e8ff5ca2f9c9e7d9892c0c68f2ad45eea3273127",
          sourceSha256:
            "cf33d6921626458c6df8e2bf859bc747300ce56b1d687a9379028b643847728d",
          sourceByteLength:
            528538,
          lockedAt:
            "2026-08-31T16:30:59.149Z",
        });

        expect(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.editionId,
        ).toBe(
          HARPA_JORNADA_EDITION_ID,
        );

        expect(
          HARPA_PRIMARY_SOURCE_ARTIFACT_LOCK.lockedAt,
        ).toBe(
          HARPA_SOURCE_LOCK_RECORDED_AT,
        );
      },
    );

    it(
      "locks the QSP only as scoped corroboration evidence",
      () => {
        expect(
          HARPA_SECONDARY_CORROBORATION_SOURCE_LOCK,
        ).toEqual({
          role:
            "SCOPED_STRUCTURAL_CORROBORATION",
          purpose:
            "STRUCTURE_CORROBORATION_WITHOUT_TEXT_INGESTION",
          globalNumberAuthority:
            false,
          globalTextAuthority:
            false,
          textIngestionAllowed:
            false,
          repository:
            "irnjunior/quelea-portugues-brasil",
          path:
            "Hinarios/Harpa Crista.qsp",
          sourceArtifact:
            "Harpa Crista.qsp",
          sourceArtifactKind:
            "QSP_ZIP_CONTAINER",
          sourceArtifactOrigin:
            "github:irnjunior/quelea-portugues-brasil@c29502e770424cb6702aac0a0deee850c2ba5a8e:Hinarios/Harpa Crista.qsp",
          sourceRevision:
            "c29502e770424cb6702aac0a0deee850c2ba5a8e",
          sourceGitBlob:
            "b181feaa0b2afa9ab896eb4b9d03309f335e10c5",
          sourceSha256:
            "32c1cb4c545844fb39cb58498e2d20c5024f5a5a7e0e6936f812ff1f1e7d4d30",
          sourceByteLength:
            558439,
          lockedAt:
            "2026-08-31T16:30:59.149Z",
        });

        expect(
          HARPA_SECONDARY_CORROBORATION_SOURCE_LOCK
            .textIngestionAllowed,
        ).toBe(false);

        expect(
          HARPA_SECONDARY_CORROBORATION_SOURCE_LOCK
            .globalNumberAuthority,
        ).toBe(false);

        expect(
          HARPA_SECONDARY_CORROBORATION_SOURCE_LOCK
            .globalTextAuthority,
        ).toBe(false);
      },
    );

    it(
      "locks the deterministic 640 to 636 target exclusion",
      () => {
        expect(
          REQUIRED_HYMN_COUNT,
        ).toBe(636);

        expect(
          HARPA_RAW_SOURCE_HYMN_COUNT,
        ).toBe(640);

        expect(
          HARPA_TARGET_EXCLUDED_RAW_NUMBERS,
        ).toEqual([
          637,
          638,
          639,
          640,
        ]);

        expect(
          HARPA_RAW_SOURCE_HYMN_COUNT -
            HARPA_TARGET_EXCLUDED_RAW_NUMBERS.length,
        ).toBe(
          REQUIRED_HYMN_COUNT,
        );

        expect(
          new Set(
            HARPA_TARGET_EXCLUDED_RAW_NUMBERS,
          ).size,
        ).toBe(4);

        expect(
          HARPA_NORMALIZATION_POLICY
            .targetExclusionStrategy,
        ).toBe(
          "EXCLUDE_RAW_NUMBERS_EXACTLY",
        );
      },
    );

    it(
      "locks hymn 403 to primary-text structural reclassification only",
      () => {
        expect(
          HARPA_H403_STRUCTURAL_RECLASSIFICATION,
        ).toEqual({
          hymnNumber:
            403,
          repairKind:
            "PRIMARY_SOURCE_STRUCTURAL_RECLASSIFICATION",
          primaryTextPreserved:
            true,
          externalTextInsertion:
            false,
          sections: [
            {
              targetOrder:
                1,
              targetKind:
                "VERSE",
              source: {
                field:
                  "verses",
                key:
                  "1",
              },
            },
            {
              targetOrder:
                2,
              targetKind:
                "CHORUS",
              source: {
                field:
                  "coro",
                lineRangeInclusive: [
                  1,
                  4,
                ],
              },
            },
            {
              targetOrder:
                3,
              targetKind:
                "VERSE",
              source: {
                field:
                  "coro",
                lineRangeInclusive: [
                  5,
                  8,
                ],
              },
            },
            {
              targetOrder:
                4,
              targetKind:
                "VERSE",
              source: {
                field:
                  "verses",
                key:
                  "3",
              },
            },
          ],
        });
      },
    );

    it(
      "forbids raw-source mutation and secondary-text ingestion",
      () => {
        expect(
          HARPA_NORMALIZATION_POLICY
            .rawPrimaryMutationAllowed,
        ).toBe(false);

        expect(
          HARPA_NORMALIZATION_POLICY
            .rawSecondaryMutationAllowed,
        ).toBe(false);

        expect(
          HARPA_NORMALIZATION_POLICY
            .secondaryTextIngestionAllowed,
        ).toBe(false);

        expect(
          HARPA_NORMALIZATION_POLICY
            .primarySourceTextPriority,
        ).toBe(
          "AUTHORITATIVE_FOR_PIPELINE_V1",
        );

        expect(
          HARPA_NORMALIZATION_POLICY
            .secondarySourceRole,
        ).toBe(
          "SCOPED_STRUCTURAL_CORROBORATION",
        );
      },
    );

    it(
      "contains exactly one governed special-case normalization rule",
      () => {
        expect(
          HARPA_NORMALIZATION_POLICY
            .specialCases,
        ).toHaveLength(1);

        expect(
          HARPA_NORMALIZATION_POLICY
            .specialCases[0],
        ).toBe(
          HARPA_H403_STRUCTURAL_RECLASSIFICATION,
        );
      },
    );
  },
);