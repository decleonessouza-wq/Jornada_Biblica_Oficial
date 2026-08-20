/**
 * Manifesto documental das fontes aprovadas para o corpus offline.
 *
 * Regras:
 * - runtime do app nunca depende destas URLs para leitura;
 * - nenhum artefato é considerado congelado sem SHA-256;
 * - hashes e arquivo exato serão registrados no gate de source lock;
 * - apenas BLIVRE e ALM1911 pertencem ao corpus v1 aprovado.
 */

import type {
  BibleLicenseKind,
  BibleVersionId,
} from "../../domain/bible/bibleVersion";

export type BibleSourceKind = "GIT_REPOSITORY" | "PUBLIC_DOMAIN_ARCHIVE";

export type BibleSourceLockStatus = "PENDING_GATE_5_P5" | "LOCKED";

export type BibleSourceManifestEntry = Readonly<{
  versionId: BibleVersionId;
  sourceKind: BibleSourceKind;
  sourceName: string;
  sourceUrl: string;
  sourceRevision: string;
  licenseKind: BibleLicenseKind;
  licenseIdentifier: string;
  licenseEvidenceUrl: string;
  attributionNotice: string | null;
  runtimeNetworkDependency: false;
  artifactLockStatus: BibleSourceLockStatus;
}>;

export const BIBLE_SOURCE_MANIFEST: readonly BibleSourceManifestEntry[] = [
  {
    versionId: "BLIVRE",
    sourceKind: "GIT_REPOSITORY",
    sourceName: "Projeto Bíblia Livre",
    sourceUrl: "https://github.com/blivre/BibliaLivre",
    sourceRevision: "a315a15e9f4d01883b62206fe441d57762f126b3",
    licenseKind: "OPEN_LICENSE",
    licenseIdentifier: "CC-BY-3.0-BR",
    licenseEvidenceUrl:
      "https://github.com/blivre/BibliaLivre/blob/a315a15e9f4d01883b62206fe441d57762f126b3/LICENCA.md",
    attributionNotice:
      "Bíblia Livre (BLIVRE), licenciada sob Creative Commons Atribuição 3.0 Brasil. A atribuição final será congelada junto ao artefato-fonte.",
    runtimeNetworkDependency: false,
    artifactLockStatus: "PENDING_GATE_5_P5",
  },
  {
    versionId: "ALM1911",
    sourceKind: "PUBLIC_DOMAIN_ARCHIVE",
    sourceName: "Project Gutenberg — Almeida 1911",
    sourceUrl: "https://www.gutenberg.org/ebooks/62383",
    sourceRevision: "gutenberg-ebook-62383",
    licenseKind: "PUBLIC_DOMAIN",
    licenseIdentifier: "PUBLIC_DOMAIN",
    licenseEvidenceUrl: "https://www.gutenberg.org/ebooks/62383",
    attributionNotice: null,
    runtimeNetworkDependency: false,
    artifactLockStatus: "PENDING_GATE_5_P5",
  },
] as const;

export function getBibleSourceManifestEntry(
  versionId: BibleVersionId,
): BibleSourceManifestEntry {
  const entry = BIBLE_SOURCE_MANIFEST.find(
    (candidate) => candidate.versionId === versionId,
  );

  if (!entry) {
    throw new Error(`Missing Bible source manifest entry: ${versionId}`);
  }

  return entry;
}
