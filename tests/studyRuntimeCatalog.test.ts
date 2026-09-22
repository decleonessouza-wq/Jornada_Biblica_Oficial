import { track05Study01Draft } from "../src/studies/content/track05Study01Draft";
import {
  materializePublishedStudyPackage,
} from "../src/studies/release/studyReleaseManifest";
import {
  buildStudyRuntimeCatalog,
  getRuntimeStudyById,
  studyRuntimeCatalog,
} from "../src/studies/runtime/studyRuntimeCatalog";

type UnknownRecord = Record<string, unknown>;

const publishedTrack05 = () =>
  materializePublishedStudyPackage(track05Study01Draft);

describe("buildStudyRuntimeCatalog", () => {
  it("rejects malformed, DRAFT and unpublished candidates", () => {
    const published = publishedTrack05();

    expect(
      buildStudyRuntimeCatalog([
        null,
        {},
        {
          contentPackage: published,
          editorialStatus: "DRAFT",
          publicAuthorDisplayName: null,
        },
        {
          contentPackage: track05Study01Draft,
          editorialStatus: "PUBLISHED",
          publicAuthorDisplayName: null,
        },
      ]).studies,
    ).toHaveLength(0);
  });

  it("accepts a valid explicitly published package and propagates public authorship", () => {
    const published = publishedTrack05();
    const catalog = buildStudyRuntimeCatalog([
      {
        contentPackage: published,
        editorialStatus: "PUBLISHED",
        publicAuthorDisplayName: "Autoria de teste",
      },
    ]);

    expect(catalog.packages).toHaveLength(1);
    expect(catalog.tracks).toHaveLength(1);
    expect(catalog.studies).toHaveLength(1);
    expect(catalog.studies[0].content).toBe(published.studies[0]);
    expect(catalog.studies[0].publicAuthorDisplayName).toBe("Autoria de teste");
  });

  it("deduplicates the same package reference", () => {
    const published = publishedTrack05();
    const candidate = {
      contentPackage: published,
      editorialStatus: "PUBLISHED" as const,
      publicAuthorDisplayName: null,
    };

    const catalog = buildStudyRuntimeCatalog([candidate, candidate]);

    expect(catalog.packages).toHaveLength(1);
    expect(catalog.studies).toHaveLength(1);
  });

  it("rejects cross-package identity collisions", () => {
    const published = publishedTrack05();
    const duplicateIdentityPackage = {
      ...published,
      contentVersion: "duplicate-identity-package",
      tracks: published.tracks.map((track) => ({ ...track })),
      studies: published.studies.map((study) => ({ ...study })),
    };

    const catalog = buildStudyRuntimeCatalog([
      {
        contentPackage: published,
        editorialStatus: "PUBLISHED",
        publicAuthorDisplayName: null,
      },
      {
        contentPackage: duplicateIdentityPackage,
        editorialStatus: "PUBLISHED",
        publicAuthorDisplayName: null,
      },
    ]);

    expect(catalog.packages).toHaveLength(1);
    expect(catalog.studies).toHaveLength(1);
  });

  it("fails closed when candidate property reads are hostile", () => {
    const published = publishedTrack05();
    const hostileCandidate = new Proxy(
      {
        contentPackage: published,
        editorialStatus: "PUBLISHED",
        publicAuthorDisplayName: null,
      } as unknown as UnknownRecord,
      {
        get(target, property, receiver) {
          if (property === "contentPackage") {
            return Reflect.get(target, property, receiver);
          }

          throw new Error("SYNTHETIC_READ_FAILURE");
        },
      },
    );

    expect(buildStudyRuntimeCatalog([hostileCandidate]).studies).toHaveLength(0);
  });
});

describe("studyRuntimeCatalog", () => {
  it("provides the released Track 05 study through the public lookup", () => {
    const entry = getRuntimeStudyById("track-05-study-01");

    expect(studyRuntimeCatalog.studies).toHaveLength(76);
    expect(entry?.content.id).toBe("track-05-study-01");
    expect(entry?.content.published).toBe(true);
  });

  it("fails closed for an unknown study id", () => {
    expect(getRuntimeStudyById("missing-study")).toBeNull();
  });
});
