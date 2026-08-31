/**
 * Contratos semânticos fundamentais de um hino no Bíblia Jornada.
 *
 * Esta camada define somente identidade e forma dos dados.
 * Persistência, importação, busca, navegação e apresentação pertencem
 * a camadas posteriores do domínio Harpa.
 *
 * Regras:
 * - id e número canônico são conceitos distintos;
 * - um hino pertence a uma edição explícita;
 * - as seções são ordenadas e não vazias;
 * - a letra é preservada estruturalmente por seção;
 * - tipos de seção desconhecidos não são aceitos silenciosamente;
 * - o contrato não define formato de banco, seed ou fonte externa.
 */

import type { HymnalEditionId } from "./hymnalEdition";

export type HymnId = string;

export type HymnNumber = number;

export const HYMN_SECTION_KINDS = [
  "VERSE",
  "CHORUS",
  "REFRAIN",
  "BRIDGE",
  "OTHER",
] as const;

export type HymnSectionKind =
  (typeof HYMN_SECTION_KINDS)[number];

export type HymnSection = Readonly<{
  order: number;
  kind: HymnSectionKind;
  label: string | null;
  text: string;
}>;

export type Hymn = Readonly<{
  id: HymnId;
  number: HymnNumber;
  title: string;
  firstLine: string | null;
  editionId: HymnalEditionId;
  sections: readonly [
    HymnSection,
    ...HymnSection[],
  ];
}>;
