/**
 * Packaged SQLite seed installer for the Harpa runtime database.
 *
 * Rules:
 * - the packaged seed is the only runtime materialization source;
 * - native validates asset SHA-256/bytes before and after copy;
 * - web imports through expo-sqlite and confirms its marker only after
 *   bootstrap validation succeeds;
 * - marker/temp names stay private here so existing constants remain frozen;
 * - this module does not run migrations, domain queries, search, or UI.
 */

import { Asset } from "expo-asset";
import * as Crypto from "expo-crypto";
import { Directory, File } from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

import {
  HYMNAL_DATABASE_NAME,
  HYMNAL_DATABASE_SEED_ASSET_NAME,
} from "./hymnalDatabaseConstants";

declare const require: (path: string) => number;

const HYMNAL_SEED_ASSET_MODULE = require(
  "../../../assets/hymnal/harpa-jornada-seed-v1.db",
);

const HYMNAL_DATABASE_SEED_MARKER_NAME =
  "harpa-jornada.db.seed.json" as const;

const HYMNAL_DATABASE_SEED_INSTALLING_NAME =
  "harpa-jornada.db.seed-installing" as const;

const HYMNAL_DATABASE_SEED_MARKER_INSTALLING_NAME =
  "harpa-jornada.db.seed.json.installing" as const;

const HYMNAL_WEB_SEED_MARKER_STORAGE_KEY =
  `harpa-jornada:web-seed:${HYMNAL_DATABASE_NAME}` as const;

export const HYMNAL_SEED_CONTRACT = {
  contractVersion: 1,
  assetName: HYMNAL_DATABASE_SEED_ASSET_NAME,
  assetSha256:
    "4FA9A78C3022B763B94265F0CBABFDB37802DB21A2D07B0153AAD623A5E4367C",
  assetBytes: 942080,
  schemaVersion: 1,
  editionId: "harpa-crista-jornada-v1",
  editionRows: 1,
  installationRows: 1,
  hymnRows: 636,
  sectionRows: 2707,
  contentVersion:
    "e8ff5ca2f9c9e7d9892c0c68f2ad45eea3273127",
  sourceKind: "JSON",
  sourceArtifact: "harpa_crista_640_hinos.json",
  sourceSha256:
    "cf33d6921626458c6df8e2bf859bc747300ce56b1d687a9379028b643847728d",
  normalizedSha256:
    "9008fe52549072268389576785b2f593f9471c4d192a4b3f578ed395390215f5",
  importerVersion: 1,
  installedAt: "2026-08-31T16:30:59.149Z",
} as const;

type HymnalSeedInstallMarker = Readonly<{
  schema: "harpa-jornada-seed-install-marker/v1";
  contractVersion: number;
  assetName: string;
  assetSha256: string;
  assetBytes: number;
}>;

type HymnalWebStorage = Readonly<{
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}>;

export type HymnalSeedInstallResult = Readonly<{
  status: "ALREADY_INSTALLED" | "INSTALLED";
  databaseUri: string;
  assetSha256: string;
  assetBytes: number;
}>;

let seedInstallPromise: Promise<HymnalSeedInstallResult> | null = null;

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

async function sha256File(file: File): Promise<string> {
  const bytes = await file.bytes();
  const digest = await Crypto.digest(
    Crypto.CryptoDigestAlgorithm.SHA256,
    bytes,
  );

  return toHex(digest);
}

function expectedMarker(): HymnalSeedInstallMarker {
  return {
    schema: "harpa-jornada-seed-install-marker/v1",
    contractVersion: HYMNAL_SEED_CONTRACT.contractVersion,
    assetName: HYMNAL_SEED_CONTRACT.assetName,
    assetSha256: HYMNAL_SEED_CONTRACT.assetSha256,
    assetBytes: HYMNAL_SEED_CONTRACT.assetBytes,
  };
}

function isExpectedMarker(
  parsed: Partial<HymnalSeedInstallMarker>,
): boolean {
  const expected = expectedMarker();

  return (
    parsed.schema === expected.schema &&
    parsed.contractVersion === expected.contractVersion &&
    parsed.assetName === expected.assetName &&
    parsed.assetSha256 === expected.assetSha256 &&
    parsed.assetBytes === expected.assetBytes
  );
}

async function markerMatches(file: File): Promise<boolean> {
  if (!file.exists) {
    return false;
  }

  try {
    const parsed = JSON.parse(
      await file.text(),
    ) as Partial<HymnalSeedInstallMarker>;

    return isExpectedMarker(parsed);
  } catch {
    return false;
  }
}

function deleteIfExists(file: File): void {
  if (file.exists) {
    file.delete();
  }
}

function getHymnalWebStorage(): HymnalWebStorage {
  try {
    const storage = (
      globalThis as typeof globalThis & {
        localStorage?: HymnalWebStorage;
      }
    ).localStorage;

    if (!storage) {
      throw new Error("LOCAL_STORAGE_UNAVAILABLE");
    }

    return storage;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error);

    throw new Error(
      `HYMNAL_WEB_SEED_MARKER_STORAGE_UNAVAILABLE:${message}`,
    );
  }
}

function webMarkerMatches(): boolean {
  const storage = getHymnalWebStorage();

  try {
    const raw = storage.getItem(
      HYMNAL_WEB_SEED_MARKER_STORAGE_KEY,
    );

    if (!raw) {
      return false;
    }

    const parsed = JSON.parse(
      raw,
    ) as Partial<HymnalSeedInstallMarker>;

    return isExpectedMarker(parsed);
  } catch {
    return false;
  }
}

async function performHymnalWebSeedInstallation(): Promise<HymnalSeedInstallResult> {
  const markerMatchesExpected = webMarkerMatches();

  if (!markerMatchesExpected) {
    getHymnalWebStorage().removeItem(
      HYMNAL_WEB_SEED_MARKER_STORAGE_KEY,
    );
  }

  await SQLite.importDatabaseFromAssetAsync(
    HYMNAL_DATABASE_NAME,
    {
      assetId: HYMNAL_SEED_ASSET_MODULE,
      forceOverwrite: !markerMatchesExpected,
    },
  );

  return {
    status: markerMatchesExpected
      ? "ALREADY_INSTALLED"
      : "INSTALLED",
    databaseUri: HYMNAL_DATABASE_NAME,
    assetSha256: HYMNAL_SEED_CONTRACT.assetSha256,
    assetBytes: HYMNAL_SEED_CONTRACT.assetBytes,
  };
}

export function confirmHymnalSeedInstallationValidated(): void {
  if (Platform.OS !== "web") {
    return;
  }

  getHymnalWebStorage().setItem(
    HYMNAL_WEB_SEED_MARKER_STORAGE_KEY,
    JSON.stringify(expectedMarker()),
  );
}

function toFileSystemDirectoryUri(directory: unknown): string {
  if (typeof directory !== "string") {
    throw new Error("HYMNAL_SQLITE_DEFAULT_DIRECTORY_NOT_STRING");
  }

  const value = directory.trim();

  if (!value) {
    throw new Error("HYMNAL_SQLITE_DEFAULT_DIRECTORY_EMPTY");
  }

  if (value.startsWith("file://")) {
    return value;
  }

  if (value.startsWith("file:/")) {
    return `file://${value.slice("file:".length)}`;
  }

  if (value.startsWith("/")) {
    return `file://${value}`;
  }

  throw new Error(
    `HYMNAL_SQLITE_DEFAULT_DIRECTORY_UNSUPPORTED:${value}`,
  );
}

function nativeMarkerFile(): File {
  const directoryUri = toFileSystemDirectoryUri(
    SQLite.defaultDatabaseDirectory,
  );

  return new File(
    new Directory(directoryUri),
    HYMNAL_DATABASE_SEED_MARKER_NAME,
  );
}

export function invalidateHymnalSeedInstallationValidation(): void {
  seedInstallPromise = null;

  if (Platform.OS === "web") {
    try {
      getHymnalWebStorage().removeItem(
        HYMNAL_WEB_SEED_MARKER_STORAGE_KEY,
      );
    } catch {
      // Preserve the primary bootstrap error.
    }

    return;
  }

  try {
    deleteIfExists(nativeMarkerFile());
  } catch {
    // Preserve the primary bootstrap error. A missing marker will force
    // reinstallation on the next successful filesystem access.
  }
}

async function resolveValidatedPackagedSeed(): Promise<File> {
  const [asset] = await Asset.loadAsync(
    HYMNAL_SEED_ASSET_MODULE,
  );

  if (!asset?.localUri) {
    throw new Error("HYMNAL_SEED_ASSET_LOCAL_URI_MISSING");
  }

  const source = new File(asset.localUri);

  if (!source.exists) {
    throw new Error("HYMNAL_SEED_ASSET_LOCAL_FILE_MISSING");
  }

  if (source.size !== HYMNAL_SEED_CONTRACT.assetBytes) {
    throw new Error(
      `HYMNAL_SEED_ASSET_SIZE_MISMATCH:EXPECTED=${HYMNAL_SEED_CONTRACT.assetBytes}:ACTUAL=${source.size}`,
    );
  }

  const sourceSha = await sha256File(source);

  if (sourceSha !== HYMNAL_SEED_CONTRACT.assetSha256) {
    throw new Error(
      `HYMNAL_SEED_ASSET_SHA_MISMATCH:EXPECTED=${HYMNAL_SEED_CONTRACT.assetSha256}:ACTUAL=${sourceSha}`,
    );
  }

  return source;
}

async function existingNativeInstallationMatches(
  databaseFile: File,
  markerFile: File,
): Promise<boolean> {
  return (
    databaseFile.exists &&
    databaseFile.size > 0 &&
    (await markerMatches(markerFile))
  );
}

async function performHymnalNativeSeedInstallation(): Promise<HymnalSeedInstallResult> {
  const databaseDirectoryUri = toFileSystemDirectoryUri(
    SQLite.defaultDatabaseDirectory,
  );
  const databaseDirectory = new Directory(databaseDirectoryUri);

  if (!databaseDirectory.exists) {
    databaseDirectory.create({
      idempotent: true,
      intermediates: true,
    });
  }

  const databaseFile = new File(
    databaseDirectory,
    HYMNAL_DATABASE_NAME,
  );
  const markerFile = new File(
    databaseDirectory,
    HYMNAL_DATABASE_SEED_MARKER_NAME,
  );

  if (
    await existingNativeInstallationMatches(
      databaseFile,
      markerFile,
    )
  ) {
    return {
      status: "ALREADY_INSTALLED",
      databaseUri: databaseFile.uri,
      assetSha256: HYMNAL_SEED_CONTRACT.assetSha256,
      assetBytes: HYMNAL_SEED_CONTRACT.assetBytes,
    };
  }

  const packagedSeed = await resolveValidatedPackagedSeed();

  const installingDatabase = new File(
    databaseDirectory,
    HYMNAL_DATABASE_SEED_INSTALLING_NAME,
  );
  const installingMarker = new File(
    databaseDirectory,
    HYMNAL_DATABASE_SEED_MARKER_INSTALLING_NAME,
  );

  deleteIfExists(installingDatabase);
  deleteIfExists(installingMarker);

  packagedSeed.copy(installingDatabase);

  if (
    installingDatabase.size !==
    HYMNAL_SEED_CONTRACT.assetBytes
  ) {
    deleteIfExists(installingDatabase);
    throw new Error(
      `HYMNAL_SEED_INSTALL_COPY_SIZE_MISMATCH:EXPECTED=${HYMNAL_SEED_CONTRACT.assetBytes}:ACTUAL=${installingDatabase.size}`,
    );
  }

  const installingSha = await sha256File(installingDatabase);

  if (installingSha !== HYMNAL_SEED_CONTRACT.assetSha256) {
    deleteIfExists(installingDatabase);
    throw new Error(
      `HYMNAL_SEED_INSTALL_COPY_SHA_MISMATCH:EXPECTED=${HYMNAL_SEED_CONTRACT.assetSha256}:ACTUAL=${installingSha}`,
    );
  }

  for (const suffix of ["-wal", "-shm", "-journal"] as const) {
    deleteIfExists(
      new File(
        databaseDirectory,
        `${HYMNAL_DATABASE_NAME}${suffix}`,
      ),
    );
  }

  deleteIfExists(databaseFile);
  deleteIfExists(markerFile);

  installingDatabase.move(databaseFile);

  if (databaseFile.size !== HYMNAL_SEED_CONTRACT.assetBytes) {
    throw new Error(
      `HYMNAL_SEED_INSTALLED_SIZE_MISMATCH:EXPECTED=${HYMNAL_SEED_CONTRACT.assetBytes}:ACTUAL=${databaseFile.size}`,
    );
  }

  const installedSha = await sha256File(databaseFile);

  if (installedSha !== HYMNAL_SEED_CONTRACT.assetSha256) {
    throw new Error(
      `HYMNAL_SEED_INSTALLED_SHA_MISMATCH:EXPECTED=${HYMNAL_SEED_CONTRACT.assetSha256}:ACTUAL=${installedSha}`,
    );
  }

  installingMarker.create({
    overwrite: true,
  });
  installingMarker.write(
    `${JSON.stringify(expectedMarker())}\n`,
  );

  installingMarker.move(markerFile);

  if (!(await markerMatches(markerFile))) {
    throw new Error(
      "HYMNAL_SEED_INSTALL_MARKER_VALIDATION_FAILED",
    );
  }

  return {
    status: "INSTALLED",
    databaseUri: databaseFile.uri,
    assetSha256: installedSha,
    assetBytes: databaseFile.size,
  };
}

async function performHymnalSeedInstallation(): Promise<HymnalSeedInstallResult> {
  if (Platform.OS === "web") {
    return performHymnalWebSeedInstallation();
  }

  return performHymnalNativeSeedInstallation();
}

export function ensureHymnalSeedInstalled(): Promise<HymnalSeedInstallResult> {
  if (!seedInstallPromise) {
    const current = performHymnalSeedInstallation();

    seedInstallPromise = current.catch((error) => {
      if (seedInstallPromise === current) {
        seedInstallPromise = null;
      }

      throw error;
    });
  }

  return seedInstallPromise;
}
