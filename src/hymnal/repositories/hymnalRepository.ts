/**
 * Contrato puro de leitura do catálogo da Harpa.
 *
 * A biblioteca consome summaries leves para listagem e somente solicita
 * o hino completo quando necessário. Busca textual pertence a contrato
 * independente em fase posterior.
 */

import type {
  Hymn,
  HymnId,
  HymnNumber,
} from "../../domain/hymnal/hymn";

import type {
  HymnalEditionId,
  HymnalEditionMetadata,
} from "../../domain/hymnal/hymnalEdition";

export type HymnalHymnSummary = Readonly<{
  id: HymnId;
  editionId: HymnalEditionId;
  number: HymnNumber;
  title: string;
  firstLine: string | null;
}>;

export interface HymnalRepository {
  listEditions(): Promise<
    readonly HymnalEditionMetadata[]
  >;

  getEdition(
    editionId: HymnalEditionId,
  ): Promise<HymnalEditionMetadata | null>;

  /**
   * Implementações devem retornar o catálogo em ordem crescente
   * de número, sem assumir que a numeração seja contígua.
   */
  listHymns(
    editionId: HymnalEditionId,
  ): Promise<readonly HymnalHymnSummary[]>;

  getHymnById(
    editionId: HymnalEditionId,
    hymnId: HymnId,
  ): Promise<Hymn | null>;

  getHymnByNumber(
    editionId: HymnalEditionId,
    hymnNumber: HymnNumber,
  ): Promise<Hymn | null>;
}
