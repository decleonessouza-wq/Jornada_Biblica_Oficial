/**
 * Serviço de aplicação para leitura do catálogo da Harpa.
 *
 * Esta camada valida argumentos e consistência das respostas pontuais
 * antes de expor dados aos consumidores da aplicação.
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

import type {
  HymnalHymnSummary,
  HymnalRepository,
} from "../repositories/hymnalRepository";

function assertNonBlankIdentifier(
  value: string,
  errorCode: string,
): void {
  if (value.trim().length === 0) {
    throw new Error(errorCode);
  }
}

function assertPositiveIntegerHymnNumber(
  hymnNumber: HymnNumber,
): void {
  if (
    !Number.isInteger(hymnNumber) ||
    hymnNumber <= 0
  ) {
    throw new Error(
      `HYMNAL_CATALOG_INVALID_HYMN_NUMBER:${hymnNumber}`,
    );
  }
}

export class HymnalCatalogService {
  constructor(
    private readonly repository:
      HymnalRepository,
  ) {}

  listEditions(): Promise<
    readonly HymnalEditionMetadata[]
  > {
    return this.repository.listEditions();
  }

  async getEdition(
    editionId: HymnalEditionId,
  ): Promise<HymnalEditionMetadata | null> {
    assertNonBlankIdentifier(
      editionId,
      "HYMNAL_CATALOG_INVALID_EDITION_ID",
    );

    const edition =
      await this.repository.getEdition(
        editionId,
      );

    if (
      edition !== null &&
      edition.id !== editionId
    ) {
      throw new Error(
        `HYMNAL_CATALOG_EDITION_RESULT_MISMATCH:EXPECTED=${editionId}:ACTUAL=${edition.id}`,
      );
    }

    return edition;
  }

  async listHymns(
    editionId: HymnalEditionId,
  ): Promise<readonly HymnalHymnSummary[]> {
    assertNonBlankIdentifier(
      editionId,
      "HYMNAL_CATALOG_INVALID_EDITION_ID",
    );

    return this.repository.listHymns(
      editionId,
    );
  }

  async getHymnById(
    editionId: HymnalEditionId,
    hymnId: HymnId,
  ): Promise<Hymn | null> {
    assertNonBlankIdentifier(
      editionId,
      "HYMNAL_CATALOG_INVALID_EDITION_ID",
    );

    assertNonBlankIdentifier(
      hymnId,
      "HYMNAL_CATALOG_INVALID_HYMN_ID",
    );

    const hymn =
      await this.repository.getHymnById(
        editionId,
        hymnId,
      );

    if (
      hymn !== null &&
      (
        hymn.editionId !== editionId ||
        hymn.id !== hymnId
      )
    ) {
      throw new Error(
        `HYMNAL_CATALOG_HYMN_ID_RESULT_MISMATCH:EXPECTED_EDITION=${editionId}:EXPECTED_ID=${hymnId}:ACTUAL_EDITION=${hymn.editionId}:ACTUAL_ID=${hymn.id}`,
      );
    }

    return hymn;
  }

  async getHymnByNumber(
    editionId: HymnalEditionId,
    hymnNumber: HymnNumber,
  ): Promise<Hymn | null> {
    assertNonBlankIdentifier(
      editionId,
      "HYMNAL_CATALOG_INVALID_EDITION_ID",
    );

    assertPositiveIntegerHymnNumber(
      hymnNumber,
    );

    const hymn =
      await this.repository.getHymnByNumber(
        editionId,
        hymnNumber,
      );

    if (
      hymn !== null &&
      (
        hymn.editionId !== editionId ||
        hymn.number !== hymnNumber
      )
    ) {
      throw new Error(
        `HYMNAL_CATALOG_HYMN_NUMBER_RESULT_MISMATCH:EXPECTED_EDITION=${editionId}:EXPECTED_NUMBER=${hymnNumber}:ACTUAL_EDITION=${hymn.editionId}:ACTUAL_NUMBER=${hymn.number}`,
      );
    }

    return hymn;
  }
}
