/**
 * Versões bíblicas offline oficialmente suportadas pelo Bíblia Jornada.
 *
 * Esta camada define identidade e metadados estáveis de produto.
 * Proveniência de artefatos, hashes e detalhes de importação pertencem
 * ao manifesto de fontes e ao pipeline de importação.
 *
 * Os campos de direitos registram a base documental aprovada para cada
 * versão e não afirmam validade jurídica fora da jurisdição declarada.
 */

export const BIBLE_VERSION_IDS = ["BLIVRE", "ALM1911"] as const;

export type BibleVersionId = (typeof BIBLE_VERSION_IDS)[number];

export type BibleRightsKind = "OPEN_LICENSE" | "PUBLIC_DOMAIN";

export type BibleRightsBasisJurisdiction = "BR" | "US";

export type BibleVersionMetadata = Readonly<{
  id: BibleVersionId;
  code: string;
  displayName: string;
  languageTag: string;
  publicationYear: number | null;
  rightsKind: BibleRightsKind;
  rightsIdentifier: string;
  rightsBasisJurisdiction: BibleRightsBasisJurisdiction;
  attributionRequired: boolean;
}>;

export const BIBLE_VERSION_CATALOG: readonly BibleVersionMetadata[] = [
  {
    id: "BLIVRE",
    code: "BLIVRE",
    displayName: "Bíblia Livre",
    languageTag: "pt-BR",
    publicationYear: 2018,
    rightsKind: "OPEN_LICENSE",
    rightsIdentifier: "CC-BY-3.0-BR",
    rightsBasisJurisdiction: "BR",
    attributionRequired: true,
  },
  {
    id: "ALM1911",
    code: "ALM1911",
    displayName: "Almeida 1911",
    languageTag: "pt",
    publicationYear: 1911,
    rightsKind: "PUBLIC_DOMAIN",
    rightsIdentifier: "PUBLIC_DOMAIN_USA",
    rightsBasisJurisdiction: "US",
    attributionRequired: false,
  },
] as const;

export const DEFAULT_BIBLE_VERSION_ID: BibleVersionId = "BLIVRE";

export function isBibleVersionId(value: string): value is BibleVersionId {
  return (BIBLE_VERSION_IDS as readonly string[]).includes(value);
}

export function getBibleVersionMetadata(
  versionId: BibleVersionId,
): BibleVersionMetadata {
  const version = BIBLE_VERSION_CATALOG.find((item) => item.id === versionId);

  if (!version) {
    throw new Error(`Unsupported Bible version: ${versionId}`);
  }

  return version;
}
