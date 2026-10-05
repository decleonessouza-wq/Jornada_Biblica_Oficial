import type {
  DevotionalBlockId,
  DevotionalId,
} from "../src/domain/devotionals/devotional";
import type { DevotionalContentPackage } from "../src/devotionals/content/devotionalContentPackage";
import {
  buildDevotionalReleaseManifest,
  devotionalReleaseManifest,
} from "../src/devotionals/release/devotionalReleaseManifest";

const createEligibleDevotional = (
  id = "devotional-test-01",
): DevotionalContentPackage => ({
  id: id as DevotionalId,
  contentType: "DEVOTIONAL",
  format: "REFLECTION",
  placement: "TRACK_05",
  title: "Devocional sintético",
  subtitle: null,
  summary: null,
  audience: null,
  author: {
    canonicalName: "Autor de teste",
    publicProfile: {
      displayName: "Autor de teste",
      role: null,
      formation: null,
      cityState: null,
    },
    publicDisplayAuthorization: "AUTHORIZED",
  },
  heroImage: null,
  blocks: [
    {
      id: "devotional-test-block-01" as DevotionalBlockId,
      kind: "PARAGRAPH",
      text: "Conteúdo sintético usado somente em teste.",
    },
  ],
  bibleReferences: [],
  reflectionPrompt: null,
  governance: {
    editorialStatus: "PUBLISHED",
    contentReview: "APPROVED",
    theologicalReview: "APPROVED",
    publicDisplayAuthorization: "AUTHORIZED",
    publicationAuthorization: "AUTHORIZED",
  },
  source: {
    sourceKind: "AUTHORIAL",
    originalTitle: "Fonte sintética de teste",
    receivedAs: null,
    sourceFileName: null,
    sourceSha256: null,
    curatorNotes: [],
  },
});

describe("devotionalReleaseManifest", () => {
  it("publishes exactly the three approved real devotionals", () => {
    expect(
      devotionalReleaseManifest.map(
        ({ contentPackage }) => contentPackage.id,
      ),
    ).toEqual([
      "devotional-track05-samaritana-draft",
      "devotional-track05-jesus-cordeiro-draft",
      "devotional-track05-pais-adolescentes-draft",
    ]);
  });

  it("admits only fully valid and runtime-eligible packages", () => {
    const eligible = createEligibleDevotional();

    expect(
      buildDevotionalReleaseManifest([eligible]),
    ).toEqual([
      expect.objectContaining({
        contentPackage: eligible,
      }),
    ]);

    const rejectedGovernance = [
      {
        ...eligible,
        governance: {
          ...eligible.governance,
          editorialStatus: "DRAFT" as const,
        },
      },
      {
        ...eligible,
        governance: {
          ...eligible.governance,
          contentReview: "PENDING" as const,
        },
      },
      {
        ...eligible,
        governance: {
          ...eligible.governance,
          theologicalReview: "PENDING" as const,
        },
      },
      {
        ...eligible,
        author: {
          ...eligible.author,
          publicDisplayAuthorization: "DENIED" as const,
        },
        governance: {
          ...eligible.governance,
          publicDisplayAuthorization: "DENIED" as const,
        },
      },
      {
        ...eligible,
        governance: {
          ...eligible.governance,
          publicationAuthorization: "PENDING" as const,
        },
      },
    ];

    for (const candidate of rejectedGovernance) {
      expect(
        buildDevotionalReleaseManifest([candidate]),
      ).toEqual([]);
    }
  });

  it("fails closed for malformed packages and duplicate identities", () => {
    const eligible = createEligibleDevotional();

    expect(
      buildDevotionalReleaseManifest([
        {
          ...eligible,
          unexpectedField: true,
        },
      ]),
    ).toEqual([]);

    expect(
      buildDevotionalReleaseManifest([
        eligible,
        createEligibleDevotional(),
      ]),
    ).toHaveLength(1);
  });
});
