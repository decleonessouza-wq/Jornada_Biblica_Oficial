import * as fs from "fs";
import * as path from "path";

const LEGAL_ROOT = path.join(
  "docs",
  "legal",
  "harpa",
);

const ROOT_README = path.join(
  LEGAL_ROOT,
  "README.md",
);

const RIGHTS_MANIFEST = path.join(
  LEGAL_ROOT,
  "harpa-rights-manifest.md",
);

const EVIDENCE_ROOT = path.join(
  LEGAL_ROOT,
  "authorization-evidence",
);

const EVIDENCE_README = path.join(
  EVIDENCE_ROOT,
  "README.md",
);

function readUtf8(
  filePath: string,
): string {
  return fs.readFileSync(
    filePath,
    "utf8",
  );
}

function splitLines(
  source: string,
): string[] {
  return source.split(
    /\r\n|\n|\r/,
  );
}

function expectExactLineOnce(
  source: string,
  expectedLine: string,
): void {
  const matches = splitLines(
    source,
  ).filter(
    (line) => line === expectedLine,
  );

  expect(
    matches,
  ).toHaveLength(
    1,
  );
}

function listFilesRecursively(
  root: string,
  current: string = root,
): string[] {
  const files: string[] = [];

  for (
    const entry of fs.readdirSync(
      current,
      {
        withFileTypes: true,
      },
    )
  ) {
    const fullPath = path.join(
      current,
      entry.name,
    );

    if (entry.isDirectory()) {
      files.push(
        ...listFilesRecursively(
          root,
          fullPath,
        ),
      );
      continue;
    }

    files.push(
      path.relative(
        root,
        fullPath,
      ).split(
        path.sep,
      ).join(
        "/",
      ),
    );
  }

  return files.sort();
}

describe(
  "Harpa legal manifest",
  () => {
    it(
      "keeps the Harpa legal scaffold at the expected three-file scope",
      () => {
        expect(
          listFilesRecursively(
            LEGAL_ROOT,
          ),
        ).toEqual([
          "README.md",
          "authorization-evidence/README.md",
          "harpa-rights-manifest.md",
        ]);
      },
    );

    it(
      "preserves the current project-decision and pending-formalization state",
      () => {
        const rootReadme = readUtf8(
          ROOT_README,
        );

        const manifest = readUtf8(
          RIGHTS_MANIFEST,
        );

        const evidenceReadme = readUtf8(
          EVIDENCE_README,
        );

        expectExactLineOnce(
          rootReadme,
          "PROJECT_DECISION_IS_EXTERNAL_LEGAL_EVIDENCE=NO",
        );

        expectExactLineOnce(
          rootReadme,
          "FAKE_OR_PLACEHOLDER_EVIDENCE_ALLOWED=NO",
        );

        for (
          const requiredLine of [
            "HARPA_SCOPE=FULL_636_HYMNS",
            "EXPECTED_HYMN_COUNT=636",
            "PROJECT_ENGINEERING_RIGHTS_DECISION=AUTHORIZED",
            "PROJECT_PUBLICATION_RIGHTS_DECISION=AUTHORIZED",
            "PROJECT_DECISION_IS_EXTERNAL_LEGAL_EVIDENCE=NO",
            "FORMAL_EXTERNAL_AUTHORIZATION_STATUS=IN_PROGRESS",
            "FORMAL_EXTERNAL_AUTHORIZATION_EVIDENCE_ARCHIVED=NO",
            "FORMAL_AUTHORIZATION_BLOCKS_DEVELOPMENT=NO",
            "RIGHTS_IDENTIFIER=NOT_AVAILABLE",
            "EXTERNAL_AUTHORIZATION_DOCUMENT_REFERENCE=NOT_AVAILABLE",
            "EXTERNAL_AUTHORIZATION_DOCUMENT_SHA256=NOT_AVAILABLE",
            "REAL_SOURCE_ARTIFACT=harpa_crista_640_hinos.json",
            "REAL_SOURCE_ARTIFACT_KIND=JSON",
            "REAL_SOURCE_PROVENANCE_STATUS=LOCKED_AND_VERIFIED",
            "REAL_SOURCE_PROVENANCE_AUTHORITY=src/hymnal/import/harpaSourceArtifactLocks.ts",
            "NORMALIZED_SOURCE_ARTIFACT=src/hymnal/corpus/harpa-crista-jornada-v1.normalized.json",
            "NORMALIZED_SOURCE_RECORD_COUNT=636",
            "NORMALIZED_SOURCE_PROVENANCE_STATUS=LOCKED_AND_VERIFIED",
            "NORMALIZED_SOURCE_PROVENANCE_AUTHORITY=src/hymnal/import/harpaNormalizedArtifactLock.ts",
            "PRODUCTION_SEED_ARTIFACT=assets/hymnal/harpa-jornada-seed-v1.db",
            "PRODUCTION_SEED_HYMN_COUNT=636",
            "PRODUCTION_SEED_SECTION_COUNT=2707",
            "PRODUCTION_SEED_PACKAGED_SCHEMA_VERSION=1",
            "PRODUCTION_SEED_RUNTIME_SCHEMA_TARGET_VERSION=2",
            "PRODUCTION_SEED_STATUS=TECHNICALLY_AUDITED",
            "FAKE_OR_PLACEHOLDER_EVIDENCE_ALLOWED=NO",
          ]
        ) {
          expectExactLineOnce(
            manifest,
            requiredLine,
          );
        }

        expectExactLineOnce(
          evidenceReadme,
          "EVIDENCE_STATUS=NO_EXTERNAL_EVIDENCE_ARCHIVED_YET",
        );

        expectExactLineOnce(
          evidenceReadme,
          "FORMAL_EXTERNAL_AUTHORIZATION_STATUS=IN_PROGRESS",
        );

        expectExactLineOnce(
          evidenceReadme,
          "FORMAL_EXTERNAL_AUTHORIZATION_EVIDENCE_ARCHIVED=NO",
        );
      },
    );

    it(
      "rejects false authorization, fabricated evidence and literal fake hashes",
      () => {
        const combined = [
          readUtf8(
            ROOT_README,
          ),
          readUtf8(
            RIGHTS_MANIFEST,
          ),
          readUtf8(
            EVIDENCE_README,
          ),
        ].join(
          "\n",
        );

        const forbiddenClaims = [
          "FORMAL_EXTERNAL_AUTHORIZATION_STATUS=DOCUMENTED",
          "FORMAL_EXTERNAL_AUTHORIZATION_EVIDENCE_ARCHIVED=YES",
          "PROJECT_DECISION_IS_EXTERNAL_LEGAL_EVIDENCE=YES",
          "FABRICATED_AUTHORIZATION_ALLOWED=YES",
          "RECONSTRUCTED_AUTHORIZATION_ALLOWED=YES",
          "PLACEHOLDER_PRETENDING_TO_BE_EVIDENCE_ALLOWED=YES",
          "EVIDENCE_WITHOUT_PROVENANCE_ALLOWED=YES",
          "SILENT_EVIDENCE_REPLACEMENT_ALLOWED=YES",
          "FAKE_OR_PLACEHOLDER_EVIDENCE_ALLOWED=YES",
        ];

        for (
          const forbiddenClaim of forbiddenClaims
        ) {
          expect(
            combined,
          ).not.toContain(
            forbiddenClaim,
          );
        }

        expect(
          combined,
        ).not.toMatch(
          /\b[a-f0-9]{64}\b/i,
        );
      },
    );

    it(
      "keeps authorization-evidence empty until real evidence is archived",
      () => {
        const evidenceEntries =
          fs.readdirSync(
            EVIDENCE_ROOT,
            {
              withFileTypes: true,
            },
          );

        expect(
          evidenceEntries.map(
            (entry) => entry.name,
          ).sort(),
        ).toEqual([
          "README.md",
        ]);

        expect(
          evidenceEntries[0]?.isFile(),
        ).toBe(
          true,
        );

        const evidenceReadme =
          readUtf8(
            EVIDENCE_README,
          );

        expectExactLineOnce(
          evidenceReadme,
          "EVIDENCE_STATUS=NO_EXTERNAL_EVIDENCE_ARCHIVED_YET",
        );
      },
    );
  },
);
