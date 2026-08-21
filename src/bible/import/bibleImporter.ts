/**
 * Fundacao do importer do corpus biblico.
 *
 * Esta camada permanece independente de filesystem, rede e SQLite.
 * Aquisição de bytes e persistencia pertencem a ferramentas/gates externos.
 */

import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import type {
  BibleImportValidationReport,
  BibleSourceArtifactLock,
  NormalizedBibleVerse,
} from "./bibleImportContract";

export type BibleSourceArtifactInput = Readonly<{
  lock: BibleSourceArtifactLock;
  bytes: Uint8Array;
}>;

export interface BibleSourceParser {
  readonly versionId: BibleVersionId;

  parse(
    source: BibleSourceArtifactInput,
  ): Promise<readonly NormalizedBibleVerse[]>;
}

export interface BibleNormalizedCorpusValidator {
  validate(
    versionId: BibleVersionId,
    verses: readonly NormalizedBibleVerse[],
  ): BibleImportValidationReport;
}

export type BibleImporterFoundation = Readonly<{
  parser: BibleSourceParser;
  validator: BibleNormalizedCorpusValidator;
}>;