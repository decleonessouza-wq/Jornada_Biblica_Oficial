/**
 * Pure deterministic import planner for the Harpa database pipeline.
 *
 * This module does not open a database, read files, access the network,
 * create a seed, or execute the governed real corpus. It converts an already
 * validated HymnalImportPackage into stable logical rows that a later
 * persistence gate can materialize transactionally.
 */

import type {
  HymnalEditionId,
} from "../../domain/hymnal/hymnalEdition";

import {
  HYMNAL_IMPORTER_CONTRACT_VERSION,
  type HymnalImportPackage,
  type NormalizedHymnSectionRecord,
} from "./hymnalImportContract";

export const HARPA_DATABASE_IMPORT_PLAN_VERSION =
  1 as const;

export type HarpaDatabaseHymnRow = Readonly<{
  editionId: HymnalEditionId;
  id: string;
  number: number;
  title: string;
  firstLine: string | null;
}>;

export type HarpaDatabaseSectionRow =
  Readonly<{
    editionId: HymnalEditionId;
    hymnId: string;
    hymnNumber: number;
    order: number;
    kind: NormalizedHymnSectionRecord["kind"];
    label: string | null;
    text: string;
  }>;

export type HarpaDatabaseImportPlan =
  Readonly<{
    version:
      typeof HARPA_DATABASE_IMPORT_PLAN_VERSION;
    editionId: HymnalEditionId;
    sourceSha256: string;
    normalizedSha256: string;
    importerVersion:
      typeof HYMNAL_IMPORTER_CONTRACT_VERSION;
    hymnCount: number;
    sectionCount: number;
    hymns:
      readonly HarpaDatabaseHymnRow[];
    sections:
      readonly HarpaDatabaseSectionRow[];
  }>;

function fail(code: string): never {
  throw new Error(
    `HARPA_DATABASE_IMPORTER_${code}`,
  );
}

function isNonBlankString(
  value: unknown,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function assertSha256(
  label: "SOURCE" | "NORMALIZED",
  value: string,
): void {
  if (!/^[0-9a-f]{64}$/i.test(value)) {
    fail(`INVALID_${label}_SHA256`);
  }
}

function assertImportPackageHeader(
  importPackage: HymnalImportPackage,
): void {
  if (!importPackage.validation.valid) {
    fail("VALIDATION_REJECTED");
  }

  if (
    importPackage.validation.issues.length !== 0
  ) {
    fail("VALIDATION_ISSUES_PRESENT");
  }

  if (
    importPackage.validation.editionId !==
    importPackage.editionId
  ) {
    fail("VALIDATION_EDITION_MISMATCH");
  }

  if (
    importPackage.artifactLock.editionId !==
    importPackage.editionId
  ) {
    fail("LOCK_EDITION_MISMATCH");
  }

  if (
    importPackage.artifactLock.importerVersion !==
    HYMNAL_IMPORTER_CONTRACT_VERSION
  ) {
    fail("IMPORTER_VERSION_MISMATCH");
  }

  if (
    !Number.isSafeInteger(
      importPackage.artifactLock.sourceByteLength,
    ) ||
    importPackage.artifactLock.sourceByteLength <= 0
  ) {
    fail("INVALID_SOURCE_BYTE_LENGTH");
  }

  assertSha256(
    "SOURCE",
    importPackage.artifactLock.sourceSha256,
  );

  assertSha256(
    "NORMALIZED",
    importPackage.artifactLock.normalizedSha256,
  );

  if (!Array.isArray(importPackage.hymns)) {
    fail("INVALID_HYMN_COLLECTION");
  }

  if (importPackage.hymns.length === 0) {
    fail("EMPTY_HYMN_COLLECTION");
  }

  if (
    importPackage.validation.hymnCount !==
    importPackage.hymns.length
  ) {
    fail("HYMN_COUNT_MISMATCH");
  }
}

function assertHymnIdentity(
  editionId: HymnalEditionId,
  hymn: HymnalImportPackage["hymns"][number],
  hymnIndex: number,
): void {
  if (hymn.editionId !== editionId) {
    fail(
      `HYMN_EDITION_MISMATCH:INDEX=${hymnIndex}`,
    );
  }

  if (!isNonBlankString(hymn.id)) {
    fail(`INVALID_HYMN_ID:INDEX=${hymnIndex}`);
  }

  if (
    !Number.isSafeInteger(hymn.number) ||
    hymn.number <= 0
  ) {
    fail(
      `INVALID_HYMN_NUMBER:ID=${hymn.id}`,
    );
  }

  if (!isNonBlankString(hymn.title)) {
    fail(`INVALID_TITLE:ID=${hymn.id}`);
  }

  if (
    hymn.firstLine !== null &&
    !isNonBlankString(hymn.firstLine)
  ) {
    fail(`INVALID_FIRST_LINE:ID=${hymn.id}`);
  }

  if (
    !Array.isArray(hymn.sections) ||
    hymn.sections.length === 0
  ) {
    fail(`EMPTY_SECTION_SET:ID=${hymn.id}`);
  }
}

function assertSection(
  hymnId: string,
  expectedOrder: number,
  section: NormalizedHymnSectionRecord,
): void {
  if (
    !Number.isSafeInteger(section.order) ||
    section.order !== expectedOrder
  ) {
    fail(
      `INVALID_SECTION_ORDER:ID=${hymnId}:EXPECTED=${expectedOrder}:ACTUAL=${String(section.order)}`,
    );
  }

  if (!isNonBlankString(section.kind)) {
    fail(
      `INVALID_SECTION_KIND:ID=${hymnId}:ORDER=${expectedOrder}`,
    );
  }

  if (
    section.label !== null &&
    !isNonBlankString(section.label)
  ) {
    fail(
      `INVALID_SECTION_LABEL:ID=${hymnId}:ORDER=${expectedOrder}`,
    );
  }

  if (!isNonBlankString(section.text)) {
    fail(
      `EMPTY_SECTION:ID=${hymnId}:ORDER=${expectedOrder}`,
    );
  }
}

export function buildHarpaDatabaseImportPlan(
  importPackage: HymnalImportPackage,
): HarpaDatabaseImportPlan {
  assertImportPackageHeader(importPackage);

  const hymnIds = new Set<string>();
  const hymnNumbers = new Set<number>();
  const hymns: HarpaDatabaseHymnRow[] = [];
  const sections: HarpaDatabaseSectionRow[] =
    [];

  let previousNumber: number | null = null;

  importPackage.hymns.forEach(
    (hymn, hymnIndex) => {
      assertHymnIdentity(
        importPackage.editionId,
        hymn,
        hymnIndex,
      );

      if (hymnIds.has(hymn.id)) {
        fail(`DUPLICATE_HYMN_ID:${hymn.id}`);
      }

      if (hymnNumbers.has(hymn.number)) {
        fail(
          `DUPLICATE_HYMN_NUMBER:${hymn.number}`,
        );
      }

      if (
        previousNumber !== null &&
        hymn.number <= previousNumber
      ) {
        fail(
          `HYMN_ORDER:PREVIOUS=${previousNumber}:ACTUAL=${hymn.number}`,
        );
      }

      hymnIds.add(hymn.id);
      hymnNumbers.add(hymn.number);
      previousNumber = hymn.number;

      hymns.push({
        editionId: hymn.editionId,
        id: hymn.id,
        number: hymn.number,
        title: hymn.title,
        firstLine: hymn.firstLine,
      });

      hymn.sections.forEach(
        (section, sectionIndex) => {
          const expectedOrder =
            sectionIndex + 1;

          assertSection(
            hymn.id,
            expectedOrder,
            section,
          );

          sections.push({
            editionId: hymn.editionId,
            hymnId: hymn.id,
            hymnNumber: hymn.number,
            order: section.order,
            kind: section.kind,
            label: section.label,
            text: section.text,
          });
        },
      );
    },
  );

  if (
    importPackage.validation.sectionCount !==
    sections.length
  ) {
    fail("SECTION_COUNT_MISMATCH");
  }

  return {
    version: HARPA_DATABASE_IMPORT_PLAN_VERSION,
    editionId: importPackage.editionId,
    sourceSha256:
      importPackage.artifactLock.sourceSha256,
    normalizedSha256:
      importPackage.artifactLock.normalizedSha256,
    importerVersion:
      importPackage.artifactLock.importerVersion,
    hymnCount: hymns.length,
    sectionCount: sections.length,
    hymns,
    sections,
  };
}
