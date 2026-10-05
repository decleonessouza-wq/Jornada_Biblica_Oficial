import {
  isDevotionalRuntimeEligible,
  type DevotionalContentPackage,
} from "../content/devotionalContentPackage";
import { validateDevotionalContentPackage } from "../content/devotionalContentValidator";
import { devotionalJesusCordeiroDraft } from "../content/devotionalJesusCordeiroDraft";
import { devotionalPaisAdolescentesDraft } from "../content/devotionalPaisAdolescentesDraft";
import { devotionalSamaritanaDraft } from "../content/devotionalSamaritanaDraft";

export type DevotionalReleaseEntry = Readonly<{
  contentPackage: DevotionalContentPackage;
}>;

const normalizeDevotionalReleaseCandidate = (
  value: unknown,
): DevotionalContentPackage | null => {
  try {
    const contentPackage = validateDevotionalContentPackage(value);
    return isDevotionalRuntimeEligible(contentPackage)
      ? contentPackage
      : null;
  } catch {
    return null;
  }
};

export const buildDevotionalReleaseManifest = (
  candidates: readonly unknown[],
): readonly DevotionalReleaseEntry[] => {
  const entries: DevotionalReleaseEntry[] = [];
  const seenIds = new Set<string>();

  for (const rawCandidate of candidates) {
    const contentPackage =
      normalizeDevotionalReleaseCandidate(rawCandidate);

    if (!contentPackage || seenIds.has(contentPackage.id)) {
      continue;
    }

    seenIds.add(contentPackage.id);
    entries.push(Object.freeze({ contentPackage }));
  }

  return Object.freeze(entries);
};

export const devotionalReleaseManifest: readonly DevotionalReleaseEntry[] =
  buildDevotionalReleaseManifest([
    devotionalSamaritanaDraft,
    devotionalJesusCordeiroDraft,
    devotionalPaisAdolescentesDraft,
  ]);
