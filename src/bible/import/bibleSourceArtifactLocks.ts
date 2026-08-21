/**
 * Source artifact locks do corpus offline aprovado.
 *
 * Os caminhos locais dos artefatos nao pertencem ao contrato do app.
 * Este registro congela identidade, origem, tamanho e SHA-256 dos bytes.
 */

import type { BibleVersionId } from "../../domain/bible/bibleVersion";
import type { BibleSourceArtifactLock } from "./bibleImportContract";

export const BIBLE_SOURCE_ARTIFACT_LOCKS = {
  BLIVRE: {
    versionId: "BLIVRE",
    sourceUrl: "https://github.com/blivre/BibliaLivre",
    sourceRevision: "a315a15e9f4d01883b62206fe441d57762f126b3",
    sourceArtifact: "BibliaLivre-a315a15e9f4d01883b62206fe441d57762f126b3.tar",
    sourceArtifactKind: "GIT_ARCHIVE_TAR",
    sourceArtifactOrigin:
      "git-archive:https://github.com/blivre/BibliaLivre@a315a15e9f4d01883b62206fe441d57762f126b3",
    sourceSha256: "C198020E4BAEF537D1C12AC67B6135D023217D138D67871B6078C6E260016180",
    sourceByteLength: 14141440,
    lockedAt: "2026-08-21T17:23:46.397Z",
  },
  ALM1911: {
    versionId: "ALM1911",
    sourceUrl: "https://www.gutenberg.org/ebooks/62383",
    sourceRevision: "gutenberg-ebook-62383",
    sourceArtifact: "62383-0.txt",
    sourceArtifactKind: "UTF8_TEXT",
    sourceArtifactOrigin:
      "https://www.gutenberg.org/files/62383/62383-0.txt",
    sourceSha256: "4AAF58BB786B86FCEC02BE20581175FD3D6FE1FE5BF490BB7D0E82127CE09C47",
    sourceByteLength: 5141779,
    lockedAt: "2026-08-21T17:23:46.397Z",
  },
} as const satisfies Readonly<Record<BibleVersionId, BibleSourceArtifactLock>>;

export function getBibleSourceArtifactLock(
  versionId: BibleVersionId,
): BibleSourceArtifactLock {
  return BIBLE_SOURCE_ARTIFACT_LOCKS[versionId];
}