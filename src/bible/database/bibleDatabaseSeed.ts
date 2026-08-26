/**
 * Instalador multiplataforma do seed SQLite bíblico empacotado.
 *
 * Regras comuns:
 * - o asset validado é a única origem de materialização runtime;
 * - a materialização ocorre antes da primeira abertura da conexão;
 * - o seed empacotado permanece imutável em schema v1;
 * - o banco runtime contém corpus e índices locais, nunca backup do usuário.
 *
 * Native:
 * - valida SHA-256/tamanho antes e depois da cópia;
 * - marcador sidecar acompanha a cópia física.
 *
 * Web:
 * - usa o importador oficial do expo-sqlite/wa-sqlite;
 * - o banco persiste no VFS Web;
 * - marcador localStorage só é confirmado DEPOIS de migrations, índices,
 *   integridade, proveniência e contagens passarem no bootstrap;
 * - marcador ausente/desatualizado força reimportação segura do seed.
 */

import { Asset } from "expo-asset";
import * as Crypto from "expo-crypto";
import { Directory, File } from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

import {
  BIBLE_DATABASE_NAME,
  BIBLE_DATABASE_SEED_ASSET_NAME,
  BIBLE_DATABASE_SEED_INSTALLING_NAME,
  BIBLE_DATABASE_SEED_MARKER_INSTALLING_NAME,
  BIBLE_DATABASE_SEED_MARKER_NAME,
} from "./bibleDatabaseConstants";

declare const require: (path: string) => number;

const BIBLE_SEED_ASSET_MODULE = require(
  "../../../assets/bible/biblia-jornada-seed-v1.db",
);

const BIBLE_WEB_SEED_MARKER_STORAGE_KEY =
  `biblia-jornada:web-seed:${BIBLE_DATABASE_NAME}` as const;

export const BIBLE_SEED_CONTRACT = {
  contractVersion: 1,
  assetName: BIBLE_DATABASE_SEED_ASSET_NAME,
  assetSha256:
    "4B9B1961281C3DDEAEC8EA1C330C55BF73CAC68EC8C547C99AAE508A2401E1AA",
  assetBytes: 11141120,
  schemaVersion: 1,
  installedAtSentinel: "1970-01-01T00:00:00.000Z",
  versionRows: 2,
  bookRows: 66,
  chapterRows: 2378,
  verseRows: 62207,
  versions: {
    BLIVRE: {
      sourceSha256:
        "C198020E4BAEF537D1C12AC67B6135D023217D138D67871B6078C6E260016180",
      normalizedSha256:
        "0823AC99944848761FC3E2E922A2DD3BB3EDD9AEFE5167FFF194A17A15A6ABC9",
      verseCount: 31102,
      chapterCount: 1189,
    },
    ALM1911: {
      sourceSha256:
        "4AAF58BB786B86FCEC02BE20581175FD3D6FE1FE5BF490BB7D0E82127CE09C47",
      normalizedSha256:
        "A38A9888274B38B60BAFFE2284E9C37D87BBA90DF50173EA6F9A95BAB6AE0C87",
      verseCount: 31105,
      chapterCount: 1189,
    },
  },
} as const;

type BibleSeedInstallMarker = Readonly<{
  schema: "biblia-jornada-seed-install-marker/v1";
  contractVersion: number;
  assetName: string;
  assetSha256: string;
  assetBytes: number;
}>;

type BibleWebStorage = Readonly<{
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}>;

export type BibleSeedInstallResult = Readonly<{
  status: "ALREADY_INSTALLED" | "INSTALLED";
  databaseUri: string;
  assetSha256: string;
  assetBytes: number;
}>;

let seedInstallPromise: Promise<BibleSeedInstallResult> | null = null;

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

function expectedMarker(): BibleSeedInstallMarker {
  return {
    schema: "biblia-jornada-seed-install-marker/v1",
    contractVersion: BIBLE_SEED_CONTRACT.contractVersion,
    assetName: BIBLE_SEED_CONTRACT.assetName,
    assetSha256: BIBLE_SEED_CONTRACT.assetSha256,
    assetBytes: BIBLE_SEED_CONTRACT.assetBytes,
  };
}

function isExpectedMarker(
  parsed: Partial<BibleSeedInstallMarker>,
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
    ) as Partial<BibleSeedInstallMarker>;

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

function getBibleWebStorage(): BibleWebStorage {
  try {
    const storage = (
      globalThis as typeof globalThis & {
        localStorage?: BibleWebStorage;
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
      `BIBLE_WEB_SEED_MARKER_STORAGE_UNAVAILABLE:${message}`,
    );
  }
}

function webMarkerMatches(): boolean {
  const storage = getBibleWebStorage();

  try {
    const raw = storage.getItem(
      BIBLE_WEB_SEED_MARKER_STORAGE_KEY,
    );

    if (!raw) {
      return false;
    }

    const parsed = JSON.parse(
      raw,
    ) as Partial<BibleSeedInstallMarker>;

    return isExpectedMarker(parsed);
  } catch {
    return false;
  }
}

async function performBibleWebSeedInstallation(): Promise<BibleSeedInstallResult> {
  const markerMatchesExpected = webMarkerMatches();

  if (!markerMatchesExpected) {
    getBibleWebStorage().removeItem(
      BIBLE_WEB_SEED_MARKER_STORAGE_KEY,
    );
  }

  await SQLite.importDatabaseFromAssetAsync(
    BIBLE_DATABASE_NAME,
    {
      assetId: BIBLE_SEED_ASSET_MODULE,
      forceOverwrite: !markerMatchesExpected,
    },
  );

  return {
    status: markerMatchesExpected
      ? "ALREADY_INSTALLED"
      : "INSTALLED",
    databaseUri: BIBLE_DATABASE_NAME,
    assetSha256: BIBLE_SEED_CONTRACT.assetSha256,
    assetBytes: BIBLE_SEED_CONTRACT.assetBytes,
  };
}

export function confirmBibleSeedInstallationValidated(): void {
  if (Platform.OS !== "web") {
    return;
  }

  getBibleWebStorage().setItem(
    BIBLE_WEB_SEED_MARKER_STORAGE_KEY,
    JSON.stringify(expectedMarker()),
  );
}

export function invalidateBibleSeedInstallationValidation(): void {
  if (Platform.OS !== "web") {
    return;
  }

  try {
    getBibleWebStorage().removeItem(
      BIBLE_WEB_SEED_MARKER_STORAGE_KEY,
    );
  } catch {
    // Preserve the primary bootstrap error. A blocked marker store already
    // makes the next Web bootstrap fail closed during installation.
  }
}

function toFileSystemDirectoryUri(directory: unknown): string {
  if (typeof directory !== "string") {
    throw new Error("BIBLE_SQLITE_DEFAULT_DIRECTORY_NOT_STRING");
  }

  const value = directory.trim();

  if (!value) {
    throw new Error("BIBLE_SQLITE_DEFAULT_DIRECTORY_EMPTY");
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
    `BIBLE_SQLITE_DEFAULT_DIRECTORY_UNSUPPORTED:${value}`,
  );
}

async function resolveValidatedPackagedSeed(): Promise<File> {
  const [asset] = await Asset.loadAsync(BIBLE_SEED_ASSET_MODULE);

  if (!asset?.localUri) {
    throw new Error("BIBLE_SEED_ASSET_LOCAL_URI_MISSING");
  }

  const source = new File(asset.localUri);

  if (!source.exists) {
    throw new Error("BIBLE_SEED_ASSET_LOCAL_FILE_MISSING");
  }

  if (source.size !== BIBLE_SEED_CONTRACT.assetBytes) {
    throw new Error(
      `BIBLE_SEED_ASSET_SIZE_MISMATCH:EXPECTED=${BIBLE_SEED_CONTRACT.assetBytes}:ACTUAL=${source.size}`,
    );
  }

  const sourceSha = await sha256File(source);

  if (sourceSha !== BIBLE_SEED_CONTRACT.assetSha256) {
    throw new Error(
      `BIBLE_SEED_ASSET_SHA_MISMATCH:EXPECTED=${BIBLE_SEED_CONTRACT.assetSha256}:ACTUAL=${sourceSha}`,
    );
  }

  return source;
}

async function performBibleNativeSeedInstallation(): Promise<BibleSeedInstallResult> {
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
    BIBLE_DATABASE_NAME,
  );
  const markerFile = new File(
    databaseDirectory,
    BIBLE_DATABASE_SEED_MARKER_NAME,
  );

  if (
    databaseFile.exists &&
    databaseFile.size > 0 &&
    (await markerMatches(markerFile))
  ) {
    return {
      status: "ALREADY_INSTALLED",
      databaseUri: databaseFile.uri,
      assetSha256: BIBLE_SEED_CONTRACT.assetSha256,
      assetBytes: BIBLE_SEED_CONTRACT.assetBytes,
    };
  }

  const packagedSeed = await resolveValidatedPackagedSeed();

  const installingDatabase = new File(
    databaseDirectory,
    BIBLE_DATABASE_SEED_INSTALLING_NAME,
  );
  const installingMarker = new File(
    databaseDirectory,
    BIBLE_DATABASE_SEED_MARKER_INSTALLING_NAME,
  );

  deleteIfExists(installingDatabase);
  deleteIfExists(installingMarker);

  packagedSeed.copy(installingDatabase);

  if (installingDatabase.size !== BIBLE_SEED_CONTRACT.assetBytes) {
    deleteIfExists(installingDatabase);
    throw new Error(
      `BIBLE_SEED_INSTALL_COPY_SIZE_MISMATCH:EXPECTED=${BIBLE_SEED_CONTRACT.assetBytes}:ACTUAL=${installingDatabase.size}`,
    );
  }

  const installingSha = await sha256File(installingDatabase);

  if (installingSha !== BIBLE_SEED_CONTRACT.assetSha256) {
    deleteIfExists(installingDatabase);
    throw new Error(
      `BIBLE_SEED_INSTALL_COPY_SHA_MISMATCH:EXPECTED=${BIBLE_SEED_CONTRACT.assetSha256}:ACTUAL=${installingSha}`,
    );
  }

  for (const suffix of ["-wal", "-shm", "-journal"] as const) {
    deleteIfExists(
      new File(
        databaseDirectory,
        `${BIBLE_DATABASE_NAME}${suffix}`,
      ),
    );
  }

  deleteIfExists(databaseFile);
  installingDatabase.move(databaseFile);

  if (databaseFile.size !== BIBLE_SEED_CONTRACT.assetBytes) {
    throw new Error(
      `BIBLE_SEED_INSTALLED_SIZE_MISMATCH:EXPECTED=${BIBLE_SEED_CONTRACT.assetBytes}:ACTUAL=${databaseFile.size}`,
    );
  }

  const installedSha = await sha256File(databaseFile);

  if (installedSha !== BIBLE_SEED_CONTRACT.assetSha256) {
    throw new Error(
      `BIBLE_SEED_INSTALLED_SHA_MISMATCH:EXPECTED=${BIBLE_SEED_CONTRACT.assetSha256}:ACTUAL=${installedSha}`,
    );
  }

  installingMarker.create({
    overwrite: true,
  });
  installingMarker.write(
    `${JSON.stringify(expectedMarker())}\n`,
  );

  deleteIfExists(markerFile);
  installingMarker.move(markerFile);

  if (!(await markerMatches(markerFile))) {
    throw new Error("BIBLE_SEED_INSTALL_MARKER_VALIDATION_FAILED");
  }

  return {
    status: "INSTALLED",
    databaseUri: databaseFile.uri,
    assetSha256: installedSha,
    assetBytes: databaseFile.size,
  };
}

async function performBibleSeedInstallation(): Promise<BibleSeedInstallResult> {
  if (Platform.OS === "web") {
    return performBibleWebSeedInstallation();
  }

  return performBibleNativeSeedInstallation();
}

export function ensureBibleSeedInstalled(): Promise<BibleSeedInstallResult> {
  if (!seedInstallPromise) {
    const current = performBibleSeedInstallation();

    seedInstallPromise = current.catch((error) => {
      if (seedInstallPromise === current) {
        seedInstallPromise = null;
      }

      throw error;
    });
  }

  return seedInstallPromise;
}
