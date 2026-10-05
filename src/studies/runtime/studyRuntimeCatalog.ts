import type { StudyContentPackage } from "../content/studyContentPackage";
import { validateStudyContentPackage } from "../content/studyContentValidator";
import {
  studyReleaseManifest,
  type StudyPublicAuthorProfile,
} from "../release/studyReleaseManifest";

type RuntimeStudyContentPackage = StudyContentPackage;
type RuntimeStudyTrack = RuntimeStudyContentPackage["tracks"][number];
type RuntimeStudy = RuntimeStudyContentPackage["studies"][number];
type UnknownRecord = Record<string, unknown>;

export type StudyRuntimeEditorialStatus = "DRAFT" | "PUBLISHED";

export interface StudyRuntimeCandidate {
  readonly contentPackage: RuntimeStudyContentPackage;
  readonly editorialStatus: StudyRuntimeEditorialStatus;
  readonly publicAuthorDisplayName: string | null;
  readonly publicAuthorProfile?: StudyPublicAuthorProfile | null;
  readonly publicAuthorProfilesByStudyId?: Readonly<Record<string, StudyPublicAuthorProfile>>;
}

export interface RuntimeStudyEntry {
  readonly content: RuntimeStudy;
  readonly publicAuthorDisplayName: string | null;
  readonly publicAuthorProfile?: StudyPublicAuthorProfile | null;
}

export interface StudyRuntimeCatalog {
  readonly packages: readonly RuntimeStudyContentPackage[];
  readonly tracks: readonly RuntimeStudyTrack[];
  readonly studies: readonly RuntimeStudyEntry[];
}

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isPackageShape = (
  value: unknown,
): value is RuntimeStudyContentPackage =>
  isRecord(value) &&
  Array.isArray(value.tracks) &&
  Array.isArray(value.studies) &&
  Array.isArray(value.sections) &&
  Array.isArray(value.references);

const normalizePublicAuthorProfile = (
  value: unknown,
): StudyPublicAuthorProfile | null => {
  if (
    !isRecord(value) ||
    typeof value.displayName !== "string" ||
    value.displayName.trim().length === 0 ||
    (value.role !== null && typeof value.role !== "string") ||
    (value.formation !== null && typeof value.formation !== "string") ||
    (value.cityState !== null && typeof value.cityState !== "string")
  ) {
    return null;
  }
  return Object.freeze({
    displayName: value.displayName,
    role: value.role,
    formation: value.formation,
    cityState: value.cityState,
  });
};

const normalizeCandidate = (
  value: unknown,
): StudyRuntimeCandidate | null => {
  if (!isRecord(value) || !isPackageShape(value.contentPackage)) {
    return null;
  }

  if (
    value.editorialStatus !== "DRAFT" &&
    value.editorialStatus !== "PUBLISHED"
  ) {
    return null;
  }

  if (
    value.publicAuthorDisplayName !== null &&
    typeof value.publicAuthorDisplayName !== "string"
  ) {
    return null;
  }

  const rawAuthorProfile = value.publicAuthorProfile;
  let publicAuthorProfile: StudyPublicAuthorProfile | null = null;

  if (rawAuthorProfile !== undefined && rawAuthorProfile !== null) {
    publicAuthorProfile = normalizePublicAuthorProfile(rawAuthorProfile);
    if (!publicAuthorProfile) {
      return null;
    }

    if (
      value.publicAuthorDisplayName !== publicAuthorProfile.displayName
    ) {
      return null;
    }
  }

  const rawAuthorProfiles = value.publicAuthorProfilesByStudyId;
  let publicAuthorProfilesByStudyId:
    Readonly<Record<string, StudyPublicAuthorProfile>> | undefined;
  if (rawAuthorProfiles !== undefined) {
    if (!isRecord(rawAuthorProfiles)) {
      return null;
    }
    const studyIds: readonly string[] = value.contentPackage.studies.map((study) => study.id);
    const keys = Object.keys(rawAuthorProfiles);
    if (keys.length !== studyIds.length || keys.some((key) => !studyIds.includes(key))) {
      return null;
    }
    const profiles: [string, StudyPublicAuthorProfile][] = [];
    for (const studyId of studyIds) {
      if (!Object.prototype.hasOwnProperty.call(rawAuthorProfiles, studyId)) {
        return null;
      }
      const profile = normalizePublicAuthorProfile(rawAuthorProfiles[studyId]);
      if (!profile) {
        return null;
      }
      profiles.push([studyId, profile]);
    }
    publicAuthorProfilesByStudyId = Object.freeze(Object.fromEntries(profiles));
  }

  return {
    contentPackage: value.contentPackage,
    editorialStatus: value.editorialStatus,
    publicAuthorDisplayName: value.publicAuthorDisplayName,
    publicAuthorProfile,
    publicAuthorProfilesByStudyId,
  };
};

const packageIsExplicitlyPublished = (
  contentPackage: RuntimeStudyContentPackage,
): boolean =>
  contentPackage.tracks.every((track) => track.published) &&
  contentPackage.studies.every((study) => study.published);

const packageIsRuntimeValid = (
  contentPackage: RuntimeStudyContentPackage,
): boolean => {
  try {
    return validateStudyContentPackage(contentPackage).valid;
  } catch {
    return false;
  }
};

const hasCrossPackageIdentityCollision = (
  contentPackage: RuntimeStudyContentPackage,
  seenTrackIds: ReadonlySet<string>,
  seenTrackSlugs: ReadonlySet<string>,
  seenStudyIds: ReadonlySet<string>,
  seenStudySlugs: ReadonlySet<string>,
): boolean =>
  contentPackage.tracks.some(
    (track) => seenTrackIds.has(track.id) || seenTrackSlugs.has(track.slug),
  ) ||
  contentPackage.studies.some(
    (study) => seenStudyIds.has(study.id) || seenStudySlugs.has(study.slug),
  );

export const buildStudyRuntimeCatalog = (
  candidates: readonly unknown[],
): StudyRuntimeCatalog => {
  const acceptedCandidates: StudyRuntimeCandidate[] = [];
  const seenPackages = new Set<RuntimeStudyContentPackage>();
  const seenTrackIds = new Set<string>();
  const seenTrackSlugs = new Set<string>();
  const seenStudyIds = new Set<string>();
  const seenStudySlugs = new Set<string>();

  for (const rawCandidate of candidates) {
    try {
      const candidate = normalizeCandidate(rawCandidate);

      if (!candidate || candidate.editorialStatus !== "PUBLISHED") {
        continue;
      }

      if (!packageIsExplicitlyPublished(candidate.contentPackage)) {
        continue;
      }

      if (!packageIsRuntimeValid(candidate.contentPackage)) {
        continue;
      }

      if (seenPackages.has(candidate.contentPackage)) {
        continue;
      }

      if (
        hasCrossPackageIdentityCollision(
          candidate.contentPackage,
          seenTrackIds,
          seenTrackSlugs,
          seenStudyIds,
          seenStudySlugs,
        )
      ) {
        continue;
      }

      seenPackages.add(candidate.contentPackage);
      candidate.contentPackage.tracks.forEach((track) => {
        seenTrackIds.add(track.id);
        seenTrackSlugs.add(track.slug);
      });
      candidate.contentPackage.studies.forEach((study) => {
        seenStudyIds.add(study.id);
        seenStudySlugs.add(study.slug);
      });
      acceptedCandidates.push(candidate);
    } catch {
      // Fail closed: malformed or hostile candidates are never exposed.
    }
  }

  const packages = Object.freeze(
    acceptedCandidates.map((candidate) => candidate.contentPackage),
  );
  const tracks = Object.freeze(
    acceptedCandidates.flatMap((candidate) => candidate.contentPackage.tracks),
  );
  const studies = Object.freeze(
    acceptedCandidates.flatMap((candidate) =>
      candidate.contentPackage.studies.map((study) => {
        const profile = candidate.publicAuthorProfilesByStudyId?.[study.id]
          ?? candidate.publicAuthorProfile;
        return Object.freeze({
          content: study,
          publicAuthorDisplayName: profile?.displayName ?? candidate.publicAuthorDisplayName,
          publicAuthorProfile: profile,
        });
      }),
    ),
  );

  return Object.freeze({ packages, tracks, studies });
};

const releasedCandidates: readonly StudyRuntimeCandidate[] = Object.freeze(
  studyReleaseManifest.map((entry) =>
    Object.freeze({
      contentPackage: entry.contentPackage,
      editorialStatus: "PUBLISHED" as const,
      publicAuthorDisplayName: entry.publicAuthorDisplayName,
      publicAuthorProfile: entry.publicAuthorProfile,
      publicAuthorProfilesByStudyId: entry.publicAuthorProfilesByStudyId,
    }),
  ),
);

export const studyRuntimeCatalog = buildStudyRuntimeCatalog(releasedCandidates);

const readStringField = (value: unknown, key: string): string | null => {
  if (!isRecord(value)) {
    return null;
  }

  const field = value[key];
  return typeof field === "string" ? field : null;
};

export const getRuntimeStudyCountForTrack = (trackId: string): number =>
  studyRuntimeCatalog.studies.filter(
    (entry) => readStringField(entry.content, "trackId") === trackId,
  ).length;

export const getRuntimeStudyById = (
  studyId: string,
): RuntimeStudyEntry | null =>
  studyRuntimeCatalog.studies.find(
    (entry) => readStringField(entry.content, "id") === studyId,
  ) ?? null;
type RuntimeStudySection =
  RuntimeStudyContentPackage["sections"][number];
type RuntimeStudyReference =
  RuntimeStudyContentPackage["references"][number];

export const getRuntimeStudySections = (
  studyId: string,
): readonly RuntimeStudySection[] =>
  Object.freeze(
    studyRuntimeCatalog.packages
      .flatMap((contentPackage) =>
        contentPackage.sections.filter(
          (section) => section.studyId === studyId,
        ),
      )
      .sort((left, right) => left.order - right.order),
  );

export const getRuntimeStudyReferences = (
  studyId: string,
): readonly RuntimeStudyReference[] =>
  Object.freeze(
    studyRuntimeCatalog.packages.flatMap((contentPackage) =>
      contentPackage.references.filter(
        (reference) => reference.studyId === studyId,
      ),
    ),
  );