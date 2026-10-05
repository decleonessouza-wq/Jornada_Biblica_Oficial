import { track05Study01Draft } from "../src/studies/content/track05Study01Draft";
import {
  materializePublishedStudyPackage,
  studyReleaseManifest,
} from "../src/studies/release/studyReleaseManifest";
import {
  buildStudyRuntimeCatalog,
  getRuntimeStudyById,
  getRuntimeStudySections,
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

    expect(studyRuntimeCatalog.studies).toHaveLength(84);
    expect(entry?.content.id).toBe("track-05-study-01");
    expect(entry?.content.published).toBe(true);
  });

  it("never exposes internal EDITORIAL_NOTE sections through public runtime lookup", () => {
    const sourceEditorialNotes = track05Study01Draft.sections.filter(
      (section) => section.type === "EDITORIAL_NOTE",
    );
    const runtimeSections = getRuntimeStudySections(
      "track-05-study-01",
    );

    expect(sourceEditorialNotes).toHaveLength(1);
    expect(runtimeSections.length).toBeGreaterThan(0);
    expect(
      runtimeSections.some(
        (section) => section.type === "EDITORIAL_NOTE",
      ),
    ).toBe(false);
    expect(runtimeSections).toHaveLength(
      track05Study01Draft.sections.length - sourceEditorialNotes.length,
    );
  });
  it("fails closed for an unknown study id", () => {
    expect(getRuntimeStudyById("missing-study")).toBeNull();
  });
  it("propagates structured public author identity with legacy display-name parity", () => {
    const published = publishedTrack05();
    const publicAuthorProfile = Object.freeze({
      displayName: "Autoria de teste",
      role: "Presbítero",
      formation: null,
      cityState: "Rondonópolis/MT",
    });

    const catalog = buildStudyRuntimeCatalog([
      {
        contentPackage: published,
        editorialStatus: "PUBLISHED",
        publicAuthorDisplayName: publicAuthorProfile.displayName,
        publicAuthorProfile,
      },
    ]);

    expect(catalog.studies).toHaveLength(1);
    expect(catalog.studies[0].publicAuthorDisplayName).toBe(
      publicAuthorProfile.displayName,
    );
    expect(catalog.studies[0].publicAuthorProfile).toEqual(
      publicAuthorProfile,
    );
  });
  it("attributes all nine collaborative studies to their own approved author", () => {
    const names = [
      "Michael Batista da Silva", "Neterson Oliveira de Souza", "Adriel Jackson Batista de Oliveira",
      "Eliete Alves", "Hélio Nascimento Sousa", "Nelson Ramos de Oliveira",
      "Adriel Jackson Batista de Oliveira", "Sidinei Rodrigues de Souza",
      "Adriel Jackson Batista de Oliveira",
    ];
    names.forEach((displayName, index) => {
      const entry = getRuntimeStudyById(`track-05-study-${String(index + 1).padStart(2, "0")}`);
      expect(entry?.publicAuthorDisplayName).toBe(displayName);
      expect(entry?.publicAuthorProfile?.displayName).toBe(displayName);
      expect(entry?.publicAuthorProfile?.cityState).toBe(
        index === 1 ? "Pedra Preta/MT" : "Rondonópolis/MT",
      );
    });
    expect(getRuntimeStudyById("track-05-study-02")?.publicAuthorProfile).toEqual({
      displayName: "Neterson Oliveira de Souza",
      role: "Presbítero/Dirigente de congregação",
      formation: null,
      cityState: "Pedra Preta/MT",
    });
    expect(getRuntimeStudyById("track-05-study-06")?.publicAuthorProfile).toEqual({
      displayName: "Nelson Ramos de Oliveira",
      role: "Pastor",
      formation: null,
      cityState: "Rondonópolis/MT",
    });
  });

  it("fails closed for incomplete, foreign, malformed and hostile per-study author maps", () => {
    const release = studyReleaseManifest.find((entry) => entry.contentPackage.studies.length === 9)!;
    const valid = release.publicAuthorProfilesByStudyId!;
    const profiles = Object.values(valid);
    const cases: unknown[] = [
      null, [], {},
      { ...valid, "foreign-study": profiles[0] },
      { ...valid, "track-05-study-02": { ...profiles[1], displayName: "" } },
      { ...valid, "track-05-study-02": { ...profiles[1], role: 42 } },
      Object.assign(Object.create({ "track-05-study-02": profiles[1] }),
        Object.fromEntries(Object.entries(valid).filter(([id]) => id !== "track-05-study-02"))),
      new Proxy(valid, { get() { throw new Error("HOSTILE_AUTHOR_MAP"); } }),
    ];
    for (const publicAuthorProfilesByStudyId of cases) {
      expect(buildStudyRuntimeCatalog([{
        ...release, editorialStatus: "PUBLISHED", publicAuthorProfilesByStudyId,
      }]).studies).toHaveLength(0);
    }
    expect(buildStudyRuntimeCatalog([{
      ...release, editorialStatus: "PUBLISHED", publicAuthorProfilesByStudyId: valid,
    }]).studies).toHaveLength(9);
  });

});
