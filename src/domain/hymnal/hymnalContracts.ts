/**
 * Invariantes transversais da Harpa Foundation.
 *
 * Este arquivo concentra somente constantes e type guards estáveis
 * compartilhados pelo domínio. Validação de registros completos,
 * integridade do corpus, importer, SQLite e search pertencem às
 * fases posteriores.
 */

import {
  HYMN_SECTION_KINDS,
  type HymnSectionKind,
} from "./hymn";

import {
  HYMNAL_AUTHORIZATION_STATUSES,
  HYMNAL_RIGHTS_KINDS,
  type HymnalAuthorizationStatus,
  type HymnalRightsKind,
} from "./hymnalEdition";

export const REQUIRED_HYMN_COUNT = 636 as const;

export function isHymnSectionKind(
  value: string,
): value is HymnSectionKind {
  return (
    HYMN_SECTION_KINDS as readonly string[]
  ).includes(value);
}

export function isHymnalRightsKind(
  value: string,
): value is HymnalRightsKind {
  return (
    HYMNAL_RIGHTS_KINDS as readonly string[]
  ).includes(value);
}

export function isHymnalAuthorizationStatus(
  value: string,
): value is HymnalAuthorizationStatus {
  return (
    HYMNAL_AUTHORIZATION_STATUSES as readonly string[]
  ).includes(value);
}
