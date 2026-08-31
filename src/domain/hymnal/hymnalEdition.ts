/**
 * Identidade editorial e metadados de direitos do domínio Harpa.
 *
 * Este contrato registra o estado de produto e governança necessário
 * para identificar uma edição sem acoplar o domínio ao pipeline de
 * importação, banco de dados ou documentos jurídicos físicos.
 *
 * A autorização interna do projeto e sua formalização documental são
 * estados distintos para permitir evolução da evidência sem alterar
 * a arquitetura do domínio.
 */

export type HymnalEditionId = string;

export const HYMNAL_RIGHTS_KINDS = [
  "PROJECT_AUTHORIZED",
  "FORMAL_AUTHORIZATION_DOCUMENTED",
  "PUBLIC_DOMAIN",
  "OPEN_LICENSE",
] as const;

export type HymnalRightsKind =
  (typeof HYMNAL_RIGHTS_KINDS)[number];

export const HYMNAL_AUTHORIZATION_STATUSES = [
  "PENDING_FORMALIZATION",
  "DOCUMENTED",
  "NOT_REQUIRED",
] as const;

export type HymnalAuthorizationStatus =
  (typeof HYMNAL_AUTHORIZATION_STATUSES)[number];

export type HymnalEditionMetadata = Readonly<{
  id: HymnalEditionId;
  code: string;
  displayName: string;
  languageTag: string;
  publicationYear: number | null;
  expectedHymnCount: number;
  rightsKind: HymnalRightsKind;
  authorizationStatus: HymnalAuthorizationStatus;
  rightsIdentifier: string | null;
  attributionRequired: boolean;
}>;
