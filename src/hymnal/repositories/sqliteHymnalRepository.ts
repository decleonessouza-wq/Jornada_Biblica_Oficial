/**
 * SQLite implementation of the HymnalRepository read contract.
 *
 * This module owns SQL for catalog reads only. Search, FTS, writes,
 * navigation, and presentation are intentionally outside this scope.
 */

import type {
  SQLiteDatabase,
} from "expo-sqlite";

import type {
  Hymn,
  HymnId,
  HymnNumber,
  HymnSection,
} from "../../domain/hymnal/hymn";
import type {
  HymnalEditionId,
  HymnalEditionMetadata,
} from "../../domain/hymnal/hymnalEdition";
import {
  isHymnSectionKind,
  isHymnalAuthorizationStatus,
  isHymnalRightsKind,
} from "../../domain/hymnal/hymnalContracts";
import {
  bootstrapHymnalDatabase,
} from "../database/hymnalDatabaseBootstrap";
import type {
  HymnalHymnSummary,
  HymnalRepository,
} from "./hymnalRepository";

type EditionRow = Readonly<{
  id: string;
  code: string;
  display_name: string;
  language_tag: string;
  publication_year: number | null;
  expected_hymn_count: number;
  rights_kind: string;
  authorization_status: string;
  rights_identifier: string | null;
  attribution_required: number;
}>;

type HymnRow = Readonly<{
  edition_id: string;
  id: string;
  number: number;
  title: string;
  first_line: string | null;
}>;

type HymnSectionRow = Readonly<{
  edition_id: string;
  hymn_id: string;
  section_order: number;
  kind: string;
  label: string | null;
  text: string;
}>;

function assertNonBlank(
  value: string,
  label: string,
): void {
  if (value.trim().length === 0) {
    throw new Error(
      `HYMNAL_REPOSITORY_INVALID_${label}`,
    );
  }
}

function assertPositiveInteger(
  value: number,
  label: string,
): void {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(
      `HYMNAL_REPOSITORY_INVALID_${label}:${value}`,
    );
  }
}

function assertNullableNonBlank(
  value: string | null,
  label: string,
): void {
  if (
    value !== null &&
    value.trim().length === 0
  ) {
    throw new Error(
      `HYMNAL_REPOSITORY_INVALID_${label}`,
    );
  }
}

function mapEditionRow(
  row: EditionRow,
): HymnalEditionMetadata {
  assertNonBlank(row.id, "EDITION_ID");
  assertNonBlank(row.code, "EDITION_CODE");
  assertNonBlank(
    row.display_name,
    "EDITION_DISPLAY_NAME",
  );
  assertNonBlank(
    row.language_tag,
    "EDITION_LANGUAGE_TAG",
  );

  if (
    row.publication_year !== null &&
    (
      !Number.isInteger(row.publication_year) ||
      row.publication_year <= 0
    )
  ) {
    throw new Error(
      `HYMNAL_REPOSITORY_INVALID_PUBLICATION_YEAR:${row.publication_year}`,
    );
  }

  assertPositiveInteger(
    row.expected_hymn_count,
    "EXPECTED_HYMN_COUNT",
  );

  if (!isHymnalRightsKind(row.rights_kind)) {
    throw new Error(
      `HYMNAL_REPOSITORY_INVALID_RIGHTS_KIND:${row.rights_kind}`,
    );
  }

  if (
    !isHymnalAuthorizationStatus(
      row.authorization_status,
    )
  ) {
    throw new Error(
      `HYMNAL_REPOSITORY_INVALID_AUTHORIZATION_STATUS:${row.authorization_status}`,
    );
  }

  assertNullableNonBlank(
    row.rights_identifier,
    "RIGHTS_IDENTIFIER",
  );

  if (
    row.attribution_required !== 0 &&
    row.attribution_required !== 1
  ) {
    throw new Error(
      `HYMNAL_REPOSITORY_INVALID_ATTRIBUTION_REQUIRED:${row.attribution_required}`,
    );
  }

  return {
    id: row.id,
    code: row.code,
    displayName: row.display_name,
    languageTag: row.language_tag,
    publicationYear: row.publication_year,
    expectedHymnCount: row.expected_hymn_count,
    rightsKind: row.rights_kind,
    authorizationStatus:
      row.authorization_status,
    rightsIdentifier:
      row.rights_identifier,
    attributionRequired:
      row.attribution_required === 1,
  };
}

function mapHymnSummaryRow(
  row: HymnRow,
): HymnalHymnSummary {
  assertNonBlank(row.edition_id, "EDITION_ID");
  assertNonBlank(row.id, "HYMN_ID");
  assertPositiveInteger(
    row.number,
    "HYMN_NUMBER",
  );
  assertNonBlank(row.title, "HYMN_TITLE");
  assertNullableNonBlank(
    row.first_line,
    "HYMN_FIRST_LINE",
  );

  return {
    id: row.id,
    editionId: row.edition_id,
    number: row.number,
    title: row.title,
    firstLine: row.first_line,
  };
}

function assertStrictlyIncreasingNumbers(
  hymns: readonly HymnalHymnSummary[],
): void {
  for (
    let index = 1;
    index < hymns.length;
    index += 1
  ) {
    const previous = hymns[index - 1];
    const current = hymns[index];

    if (
      !previous ||
      !current ||
      current.number <= previous.number
    ) {
      throw new Error(
        "HYMNAL_REPOSITORY_HYMN_ORDER_INVALID",
      );
    }
  }
}

function mapSectionRows(
  editionId: HymnalEditionId,
  hymnId: HymnId,
  rows: readonly HymnSectionRow[],
): readonly [
  HymnSection,
  ...HymnSection[],
] {
  if (rows.length === 0) {
    throw new Error(
      `HYMNAL_REPOSITORY_HYMN_HAS_NO_SECTIONS:${hymnId}`,
    );
  }

  const sections: HymnSection[] =
    rows.map((row, index) => {
      if (
        row.edition_id !== editionId ||
        row.hymn_id !== hymnId
      ) {
        throw new Error(
          `HYMNAL_REPOSITORY_SECTION_SCOPE_MISMATCH:${hymnId}`,
        );
      }

      const expectedOrder = index + 1;

      if (
        row.section_order !== expectedOrder
      ) {
        throw new Error(
          `HYMNAL_REPOSITORY_SECTION_ORDER_INVALID:${hymnId}:EXPECTED=${expectedOrder}:ACTUAL=${row.section_order}`,
        );
      }

      if (!isHymnSectionKind(row.kind)) {
        throw new Error(
          `HYMNAL_REPOSITORY_INVALID_SECTION_KIND:${row.kind}`,
        );
      }

      assertNullableNonBlank(
        row.label,
        "SECTION_LABEL",
      );
      assertNonBlank(
        row.text,
        "SECTION_TEXT",
      );

      return {
        order: row.section_order,
        kind: row.kind,
        label: row.label,
        text: row.text,
      };
    });

  const first = sections[0];

  if (!first) {
    throw new Error(
      `HYMNAL_REPOSITORY_HYMN_HAS_NO_SECTIONS:${hymnId}`,
    );
  }

  return [
    first,
    ...sections.slice(1),
  ];
}

export class SQLiteHymnalRepository
implements HymnalRepository {
  constructor(
    private readonly database:
      SQLiteDatabase,
  ) {}

  async listEditions(): Promise<
    readonly HymnalEditionMetadata[]
  > {
    const rows =
      await this.database.getAllAsync<EditionRow>(
        `SELECT
           id,
           code,
           display_name,
           language_tag,
           publication_year,
           expected_hymn_count,
           rights_kind,
           authorization_status,
           rights_identifier,
           attribution_required
         FROM hymnal_editions
        WHERE enabled = 1
        ORDER BY code, id;`,
      );

    return rows.map(mapEditionRow);
  }

  async getEdition(
    editionId: HymnalEditionId,
  ): Promise<HymnalEditionMetadata | null> {
    assertNonBlank(
      editionId,
      "EDITION_ID",
    );

    const row =
      await this.database.getFirstAsync<EditionRow>(
        `SELECT
           id,
           code,
           display_name,
           language_tag,
           publication_year,
           expected_hymn_count,
           rights_kind,
           authorization_status,
           rights_identifier,
           attribution_required
         FROM hymnal_editions
        WHERE id = ?
          AND enabled = 1
        LIMIT 1;`,
        [editionId],
      );

    if (!row) {
      return null;
    }

    const edition = mapEditionRow(row);

    if (edition.id !== editionId) {
      throw new Error(
        `HYMNAL_REPOSITORY_EDITION_SCOPE_MISMATCH:EXPECTED=${editionId}:ACTUAL=${edition.id}`,
      );
    }

    return edition;
  }

  async listHymns(
    editionId: HymnalEditionId,
  ): Promise<readonly HymnalHymnSummary[]> {
    assertNonBlank(
      editionId,
      "EDITION_ID",
    );

    const rows =
      await this.database.getAllAsync<HymnRow>(
        `SELECT
           edition_id,
           id,
           number,
           title,
           first_line
         FROM hymns
        WHERE edition_id = ?
        ORDER BY number, id;`,
        [editionId],
      );

    const hymns = rows.map(
      mapHymnSummaryRow,
    );

    for (const hymn of hymns) {
      if (hymn.editionId !== editionId) {
        throw new Error(
          `HYMNAL_REPOSITORY_HYMN_SCOPE_MISMATCH:EXPECTED=${editionId}:ACTUAL=${hymn.editionId}`,
        );
      }
    }

    assertStrictlyIncreasingNumbers(hymns);

    return hymns;
  }

  async getHymnById(
    editionId: HymnalEditionId,
    hymnId: HymnId,
  ): Promise<Hymn | null> {
    assertNonBlank(
      editionId,
      "EDITION_ID",
    );
    assertNonBlank(
      hymnId,
      "HYMN_ID",
    );

    const row =
      await this.database.getFirstAsync<HymnRow>(
        `SELECT
           edition_id,
           id,
           number,
           title,
           first_line
         FROM hymns
        WHERE edition_id = ?
          AND id = ?
        LIMIT 1;`,
        [editionId, hymnId],
      );

    if (!row) {
      return null;
    }

    return this.loadHymnDetail(
      editionId,
      row,
    );
  }

  async getHymnByNumber(
    editionId: HymnalEditionId,
    hymnNumber: HymnNumber,
  ): Promise<Hymn | null> {
    assertNonBlank(
      editionId,
      "EDITION_ID",
    );
    assertPositiveInteger(
      hymnNumber,
      "HYMN_NUMBER",
    );

    const row =
      await this.database.getFirstAsync<HymnRow>(
        `SELECT
           edition_id,
           id,
           number,
           title,
           first_line
         FROM hymns
        WHERE edition_id = ?
          AND number = ?
        LIMIT 1;`,
        [editionId, hymnNumber],
      );

    if (!row) {
      return null;
    }

    if (row.number !== hymnNumber) {
      throw new Error(
        `HYMNAL_REPOSITORY_HYMN_NUMBER_SCOPE_MISMATCH:EXPECTED=${hymnNumber}:ACTUAL=${row.number}`,
      );
    }

    return this.loadHymnDetail(
      editionId,
      row,
    );
  }

  private async loadHymnDetail(
    editionId: HymnalEditionId,
    row: HymnRow,
  ): Promise<Hymn> {
    const summary = mapHymnSummaryRow(row);

    if (summary.editionId !== editionId) {
      throw new Error(
        `HYMNAL_REPOSITORY_HYMN_SCOPE_MISMATCH:EXPECTED=${editionId}:ACTUAL=${summary.editionId}`,
      );
    }

    const sectionRows =
      await this.database.getAllAsync<HymnSectionRow>(
        `SELECT
           edition_id,
           hymn_id,
           section_order,
           kind,
           label,
           text
         FROM hymn_sections
        WHERE edition_id = ?
          AND hymn_id = ?
        ORDER BY section_order;`,
        [editionId, summary.id],
      );

    return {
      id: summary.id,
      number: summary.number,
      title: summary.title,
      firstLine: summary.firstLine,
      editionId: summary.editionId,
      sections: mapSectionRows(
        editionId,
        summary.id,
        sectionRows,
      ),
    };
  }
}

export async function createSQLiteHymnalRepository(): Promise<SQLiteHymnalRepository> {
  const database =
    await bootstrapHymnalDatabase();

  return new SQLiteHymnalRepository(
    database,
  );
}
