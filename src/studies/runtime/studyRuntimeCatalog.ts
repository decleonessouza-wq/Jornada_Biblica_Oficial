import * as track01DraftBatchModule from "../content/track01DraftBatch";
import * as track02DraftBatchModule from "../content/track02DraftBatch";
import * as track03DraftBatchModule from "../content/track03DraftBatch";
import * as track04DraftBatchModule from "../content/track04DraftBatch";
import * as track05Study01DraftModule from "../content/track05Study01Draft";
import { validateStudyContentPackage } from "../content/studyContentValidator";

type RuntimeStudyContentPackage = Parameters<
  typeof validateStudyContentPackage
>[0];

type RuntimeStudyTrack = RuntimeStudyContentPackage["tracks"][number];
type RuntimeStudy = RuntimeStudyContentPackage["studies"][number];
type UnknownRecord = Record<string, unknown>;

export interface StudyRuntimeCandidate {
  readonly contentPackage: RuntimeStudyContentPackage;
  readonly editorialStatus: string | null;
  readonly publicAuthorDisplayName: string | null;
}

export interface RuntimeStudyEntry {
  readonly content: RuntimeStudy;
  readonly publicAuthorDisplayName: string | null;
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
): value is RuntimeStudyContentPackage => {
  if (!isRecord(value)) {
    return false;
  }

  return Array.isArray(value.tracks) && Array.isArray(value.studies);
};

const readEditorialStatus = (value: unknown): string | null => {
  if (!isRecord(value)) {
    return null;
  }

  const status = value.editorialStatus;
  return typeof status === "string" ? status : null;
};

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

const moduleContainsDraftStatus = (
  module: Readonly<Record<string, unknown>>,
): boolean =>
  collectRecords(module).some(
    (record) => record.editorialStatus === "DRAFT",
  );

const readAuthorizedPublicAuthorDisplayName = (
  module: Readonly<Record<string, unknown>>,
): string | null => {
  const names = new Set<string>();

  for (const record of collectRecords(module)) {
    if (record.publicAuthorDisplayAuthorization !== "AUTHORIZED") {
      continue;
    }

    const name = record.publicAuthorDisplayName;
    if (typeof name === "string" && name.trim().length > 0) {
      names.add(name);
    }
  }

  return names.size === 1 ? [...names][0] : null;
};

const packageContainsDraftStatus = (
  contentPackage: RuntimeStudyContentPackage,
): boolean => {
  if (readEditorialStatus(contentPackage) === "DRAFT") {
    return true;
  }

  return [...contentPackage.tracks, ...contentPackage.studies].some(
    (item) => readEditorialStatus(item) === "DRAFT",
  );
};

const isRuntimeValid = (
  contentPackage: RuntimeStudyContentPackage,
): boolean => {
  try {
    const validation = validateStudyContentPackage(contentPackage);
    return validation.valid === true;
  } catch {
    return false;
  }
};

const normalizeCandidate = (
  value: unknown,
): StudyRuntimeCandidate | null => {
  if (!isRecord(value) || !isPackageShape(value.contentPackage)) {
    return null;
  }

  const editorialStatus = value.editorialStatus;
  if (editorialStatus !== null && typeof editorialStatus !== "string") {
    return null;
  }

  const publicAuthorDisplayName = value.publicAuthorDisplayName;
  if (
    publicAuthorDisplayName !== null &&
    typeof publicAuthorDisplayName !== "string"
  ) {
    return null;
  }

  return {
    contentPackage: value.contentPackage,
    editorialStatus,
    publicAuthorDisplayName,
  };
};

export const buildStudyRuntimeCatalog = (
  candidates: readonly unknown[],
): StudyRuntimeCatalog => {
  const acceptedCandidates: StudyRuntimeCandidate[] = [];
  const seenPackages = new Set<RuntimeStudyContentPackage>();

  for (const rawCandidate of candidates) {
    try {
      const candidate = normalizeCandidate(rawCandidate);
      if (!candidate) {
        continue;
      }

      if (candidate.editorialStatus === "DRAFT") {
        continue;
      }

      if (packageContainsDraftStatus(candidate.contentPackage)) {
        continue;
      }

      if (!isRuntimeValid(candidate.contentPackage)) {
        continue;
      }

      if (seenPackages.has(candidate.contentPackage)) {
        continue;
      }

      seenPackages.add(candidate.contentPackage);
      acceptedCandidates.push(candidate);
    } catch {
      // Fail closed: malformed or hostile candidates are never exposed.
    }
  }

  const packages = Object.freeze(
    acceptedCandidates.map((candidate) => candidate.contentPackage),
  );

  const tracks = Object.freeze(
    acceptedCandidates.flatMap(
      (candidate) => candidate.contentPackage.tracks,
    ),
  );

  const studies = Object.freeze(
    acceptedCandidates.flatMap((candidate) =>
      candidate.contentPackage.studies.map((study) =>
        Object.freeze({
          content: study,
          publicAuthorDisplayName: candidate.publicAuthorDisplayName,
        }),
      ),
    ),
  );

  return Object.freeze({ packages, tracks, studies });
};

const canonicalContentModules: readonly Readonly<Record<string, unknown>>[] = [
  track01DraftBatchModule,
  track02DraftBatchModule,
  track03DraftBatchModule,
  track04DraftBatchModule,
  track05Study01DraftModule,
];

const canonicalCandidates: StudyRuntimeCandidate[] =
  canonicalContentModules.flatMap((module) => {
    const editorialStatus = moduleContainsDraftStatus(module)
      ? "DRAFT"
      : null;
    const publicAuthorDisplayName =
      readAuthorizedPublicAuthorDisplayName(module);

    return Object.values(module)
      .filter(isPackageShape)
      .map((contentPackage) => ({
        contentPackage,
        editorialStatus,
        publicAuthorDisplayName,
      }));
  });

export const studyRuntimeCatalog = buildStudyRuntimeCatalog(
  canonicalCandidates,
);

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
