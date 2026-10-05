import type {
  DevotionalBlockId,
  DevotionalId,
} from "../src/domain/devotionals/devotional";
import type { DevotionalContentPackage } from "../src/devotionals/content/devotionalContentPackage";
import {
  buildDevotionalReleaseManifest,
  type DevotionalReleaseEntry,
} from "../src/devotionals/release/devotionalReleaseManifest";
import {
  buildDevotionalRuntimeCatalog,
  devotionalRuntimeCatalog,
  findRuntimeDevotionalById,
  getRuntimeDevotionalById,
} from "../src/devotionals/runtime/devotionalRuntimeCatalog";

const createEligibleDevotional = (
  id = "devotional-runtime-test-01",
): DevotionalContentPackage => ({
  id: id as DevotionalId,
  contentType: "DEVOTIONAL",
  format: "OPEN_LETTER",
  placement: "TRACK_05",
  title: "Carta sintética",
  subtitle: null,
  summary: null,
  audience: null,
  author: {
    canonicalName: "Autor runtime",
    publicProfile: {
      displayName: "Autor runtime",
      role: null,
      formation: null,
      cityState: null,
    },
    publicDisplayAuthorization: "AUTHORIZED",
  },
  heroImage: null,
  blocks: [
    {
      id: "devotional-runtime-block-01" as DevotionalBlockId,
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
    sourceKind: "COLLABORATIVE",
    originalTitle: "Fonte runtime sintética",
    receivedAs: "carta aberta",
    sourceFileName: null,
    sourceSha256: null,
    curatorNotes: [],
  },
});

describe("devotionalRuntimeCatalog", () => {
  it("exposes exactly the three approved real devotionals from the production release manifest", () => {
    expect(
      devotionalRuntimeCatalog.devotionals.map(
        ({ content }) => content.id,
      ),
    ).toEqual([
      "devotional-track05-samaritana-draft",
      "devotional-track05-jesus-cordeiro-draft",
      "devotional-track05-pais-adolescentes-draft",
    ]);

    expect(
      getRuntimeDevotionalById(
        "devotional-track05-samaritana-draft",
      )?.content.id,
    ).toBe("devotional-track05-samaritana-draft");
  });

  it("builds a runtime catalog only from valid release entries and supports lookup by devotional id", () => {
    const content = createEligibleDevotional();
    const releaseEntries =
      buildDevotionalReleaseManifest([content]);
    const catalog =
      buildDevotionalRuntimeCatalog(releaseEntries);

    expect(catalog.devotionals).toHaveLength(1);
    expect(
      findRuntimeDevotionalById(catalog, content.id),
    ).toEqual({
      content,
    });
  });

  it("revalidates governance instead of trusting a release-shaped object", () => {
    const content = createEligibleDevotional();
    const bypassAttempt: DevotionalReleaseEntry = {
      contentPackage: {
        ...content,
        governance: {
          ...content.governance,
          editorialStatus: "DRAFT",
        },
      },
    };

    expect(
      buildDevotionalRuntimeCatalog([bypassAttempt])
        .devotionals,
    ).toEqual([]);
  });

  it("fails closed for malformed entries and duplicate identities", () => {
    const content = createEligibleDevotional();
    const releaseEntries =
      buildDevotionalReleaseManifest([
        content,
        createEligibleDevotional(),
      ]);

    expect(
      buildDevotionalRuntimeCatalog([
        { contentPackage: { ...content, unknown: true } },
      ]).devotionals,
    ).toEqual([]);

    expect(
      buildDevotionalRuntimeCatalog(releaseEntries)
        .devotionals,
    ).toHaveLength(1);
  });
});
