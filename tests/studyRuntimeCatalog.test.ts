import * as track05Study01DraftModule from "../src/studies/content/track05Study01Draft";
import { validateStudyContentPackage } from "../src/studies/content/studyContentValidator";
import {
  buildStudyRuntimeCatalog,
  getRuntimeStudyById,
  getRuntimeStudyCountForTrack,
  studyRuntimeCatalog,
} from "../src/studies/runtime/studyRuntimeCatalog";

type RuntimeStudyContentPackage = Parameters<
  typeof validateStudyContentPackage
>[0];
type UnknownRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isPackageShape = (
  value: unknown,
): value is RuntimeStudyContentPackage =>
  isRecord(value) &&
  Array.isArray(value.tracks) &&
  Array.isArray(value.studies);

const getTrack05DraftPackage = (): RuntimeStudyContentPackage => {
  const contentPackage = Object.values(track05Study01DraftModule).find(
    isPackageShape,
  );

  if (!contentPackage) {
    throw new Error("TRACK05_PACKAGE_NOT_FOUND");
  }

  return contentPackage;
};

const issueCodes = (
  contentPackage: RuntimeStudyContentPackage,
): string[] =>
  validateStudyContentPackage(contentPackage).issues.map(
    (issue) => issue.code,
  );

const publishInMemory = (
  contentPackage: RuntimeStudyContentPackage,
): RuntimeStudyContentPackage =>
  ({
    ...contentPackage,
    tracks: contentPackage.tracks.map((track) => ({
      ...track,
      published: true,
    })),
    studies: contentPackage.studies.map((study) => ({
      ...study,
      published: true,
    })),
  }) as RuntimeStudyContentPackage;

const collectRecords = (root: unknown): UnknownRecord[] => {
  const records: UnknownRecord[] = [];
  const queue: unknown[] = [root];
  const seen = new Set<object>();

  while (queue.length > 0) {
    const current = queue.shift();

    if (Array.isArray(current)) {
      if (seen.has(current)) {
        continue;
      }

      seen.add(current);
      queue.push(...current);
      continue;
    }

    if (!isRecord(current)) {
      continue;
    }

    if (seen.has(current)) {
      continue;
    }

    seen.add(current);
    records.push(current);
    queue.push(...Object.values(current));
  }

  return records;
};

const getAuthorizedPublicAuthorDisplayName = (): string => {
  const names = new Set<string>();

  for (const record of collectRecords(track05Study01DraftModule)) {
    if (record.publicAuthorDisplayAuthorization !== "AUTHORIZED") {
      continue;
    }

    const name = record.publicAuthorDisplayName;
    if (typeof name === "string" && name.trim().length > 0) {
      names.add(name);
    }
  }

  if (names.size !== 1) {
    throw new Error("TRACK05_AUTHORIZED_PUBLIC_AUTHOR_NOT_UNIQUE");
  }

  return [...names][0];
};

describe("studyRuntimeCatalog", () => {
  it("mantém o conteúdo canônico DRAFT atual fora do runtime", () => {
    expect(studyRuntimeCatalog.packages).toHaveLength(0);
    expect(studyRuntimeCatalog.tracks).toHaveLength(0);
    expect(studyRuntimeCatalog.studies).toHaveLength(0);
  });

  it("rejeita track e estudo não publicados do Track 5 real", () => {
    const contentPackage = getTrack05DraftPackage();
    const codes = issueCodes(contentPackage);

    expect(codes).toContain("TRACK_UNPUBLISHED");
    expect(codes).toContain("STUDY_UNPUBLISHED");
    expect(
      buildStudyRuntimeCatalog([
        {
          contentPackage,
          editorialStatus: "DRAFT",
          publicAuthorDisplayName: getAuthorizedPublicAuthorDisplayName(),
        },
      ]).studies,
    ).toHaveLength(0);
  });

  it("rejeita pacote marcado DRAFT mesmo quando a simulação somente em memória satisfaz o validator runtime", () => {
    const publishedPackage = publishInMemory(getTrack05DraftPackage());

    expect(validateStudyContentPackage(publishedPackage).valid).toBe(true);

    const catalog = buildStudyRuntimeCatalog([
      {
        contentPackage: publishedPackage,
        editorialStatus: "DRAFT",
        publicAuthorDisplayName: getAuthorizedPublicAuthorDisplayName(),
      },
    ]);

    expect(catalog.packages).toHaveLength(0);
    expect(catalog.studies).toHaveLength(0);
  });

  it("falha fechado para candidatos inválidos e para leitura hostil", () => {
    const contentPackage = getTrack05DraftPackage();
    const hostileCandidate = new Proxy(
      {
        contentPackage,
        editorialStatus: null,
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

    const catalog = buildStudyRuntimeCatalog([
      null,
      {},
      { contentPackage: { tracks: [], studies: [] } },
      hostileCandidate,
    ]);

    expect(catalog.packages).toHaveLength(0);
    expect(catalog.studies).toHaveLength(0);
  });

  it("não expõe track-05-study-01 enquanto o conteúdo real permanece unpublished", () => {
    expect(getRuntimeStudyById("track-05-study-01")).toBeNull();
    expect(getRuntimeStudyCountForTrack("track-05")).toBe(0);
  });

  it("propaga a autoria autorizada da governança estruturada sem literal duplicado", () => {
    const sourcePackage = getTrack05DraftPackage();
    const publishedPackage = publishInMemory(sourcePackage);
    const authorizedName = getAuthorizedPublicAuthorDisplayName();

    expect(validateStudyContentPackage(publishedPackage).valid).toBe(true);

    const catalog = buildStudyRuntimeCatalog([
      {
        contentPackage: publishedPackage,
        editorialStatus: "RUNTIME_TEST_NON_DRAFT",
        publicAuthorDisplayName: authorizedName,
      },
    ]);

    expect(catalog.studies).toHaveLength(1);
    expect(catalog.studies[0].publicAuthorDisplayName).toBe(authorizedName);
    expect(catalog.studies[0].content).toBe(publishedPackage.studies[0]);
  });

  it("deriva quantidade e nextStudyId do conteúdo real sem placeholders", () => {
    const sourcePackage = getTrack05DraftPackage();
    const publishedPackage = publishInMemory(sourcePackage);

    const catalog = buildStudyRuntimeCatalog([
      {
        contentPackage: publishedPackage,
        editorialStatus: "RUNTIME_TEST_NON_DRAFT",
        publicAuthorDisplayName: getAuthorizedPublicAuthorDisplayName(),
      },
    ]);

    expect(catalog.tracks).toHaveLength(1);
    expect(catalog.studies).toHaveLength(1);
    expect(
      catalog.studies.filter(
        (entry) =>
          (entry.content as unknown as UnknownRecord).trackId === "track-05",
      ),
    ).toHaveLength(1);

    const sourceStudy = sourcePackage.studies[0] as unknown as UnknownRecord;
    const runtimeStudy =
      catalog.studies[0].content as unknown as UnknownRecord;

    expect(sourceStudy.nextStudyId).toBeNull();
    expect(runtimeStudy.nextStudyId).toBe(sourceStudy.nextStudyId);
    expect(
      catalog.studies.map(
        (entry) => (entry.content as unknown as UnknownRecord).id,
      ),
    ).toEqual([sourceStudy.id]);
  });

  it("aceita coleção viva vazia e com um estudo sem criar sucessor fictício", () => {
    expect(buildStudyRuntimeCatalog([]).studies).toHaveLength(0);

    const sourcePackage = getTrack05DraftPackage();
    const publishedPackage = publishInMemory(sourcePackage);
    const oneStudyCatalog = buildStudyRuntimeCatalog([
      {
        contentPackage: publishedPackage,
        editorialStatus: "RUNTIME_TEST_NON_DRAFT",
        publicAuthorDisplayName: getAuthorizedPublicAuthorDisplayName(),
      },
    ]);

    expect(oneStudyCatalog.studies).toHaveLength(1);
    expect(
      (
        oneStudyCatalog.studies[0].content as unknown as UnknownRecord
      ).nextStudyId,
    ).toBeNull();
  });
});
