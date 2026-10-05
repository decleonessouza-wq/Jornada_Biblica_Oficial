import type { DevotionalId } from "../../domain/devotionals/devotional";
import {
  isDevotionalRuntimeEligible,
  type DevotionalContentPackage,
} from "../content/devotionalContentPackage";
import { validateDevotionalContentPackage } from "../content/devotionalContentValidator";
import {
  devotionalReleaseManifest,
  type DevotionalReleaseEntry,
} from "../release/devotionalReleaseManifest";

type UnknownRecord = Record<string, unknown>;

export type RuntimeDevotionalEntry = Readonly<{
  content: DevotionalContentPackage;
}>;

export type DevotionalRuntimeCatalog = Readonly<{
  devotionals: readonly RuntimeDevotionalEntry[];
}>;

const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizeRuntimeCandidate = (
  value: unknown,
): DevotionalReleaseEntry | null => {
  if (!isRecord(value) || !("contentPackage" in value)) {
    return null;
  }

  try {
    const contentPackage = validateDevotionalContentPackage(
      value.contentPackage,
    );

    if (!isDevotionalRuntimeEligible(contentPackage)) {
      return null;
    }

    return Object.freeze({ contentPackage });
  } catch {
    return null;
  }
};

export const buildDevotionalRuntimeCatalog = (
  candidates: readonly unknown[],
): DevotionalRuntimeCatalog => {
  const devotionals: RuntimeDevotionalEntry[] = [];
  const seenIds = new Set<string>();

  for (const rawCandidate of candidates) {
    const candidate = normalizeRuntimeCandidate(rawCandidate);

    if (
      !candidate ||
      seenIds.has(candidate.contentPackage.id)
    ) {
      continue;
    }

    seenIds.add(candidate.contentPackage.id);
    devotionals.push(
      Object.freeze({ content: candidate.contentPackage }),
    );
  }

  return Object.freeze({
    devotionals: Object.freeze(devotionals),
  });
};

export const findRuntimeDevotionalById = (
  catalog: DevotionalRuntimeCatalog,
  devotionalId: DevotionalId | string,
): RuntimeDevotionalEntry | null =>
  catalog.devotionals.find(
    (entry) => entry.content.id === devotionalId,
  ) ?? null;

export const devotionalRuntimeCatalog =
  buildDevotionalRuntimeCatalog(devotionalReleaseManifest);

export const getRuntimeDevotionalById = (
  devotionalId: DevotionalId | string,
): RuntimeDevotionalEntry | null =>
  findRuntimeDevotionalById(
    devotionalRuntimeCatalog,
    devotionalId,
  );
