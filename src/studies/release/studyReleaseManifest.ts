import { track01DraftBatchPackage } from "../content/track01DraftBatch";
import { track02DraftBatchPackage } from "../content/track02DraftBatch";
import { track02Study01DraftPackage } from "../content/track02Study01Draft";
import { track03DraftBatchPackage } from "../content/track03DraftBatch";
import { track04DraftBatchPackage } from "../content/track04DraftBatch";
import {
  track05Study01Draft,
  track05Study01PublicAuthor,
} from "../content/track05Study01Draft";
import { track06DraftBatchPackage } from "../content/track06DraftBatch";
import type { StudyContentPackage } from "../content/studyContentPackage";

export type StudyReleaseEntry = Readonly<{
  contentPackage: StudyContentPackage;
  publicAuthorDisplayName: string | null;
}>;

export const track02ReleaseSourcePackage: StudyContentPackage = Object.freeze({
  contentVersion: "release-track-02-studies-01-10-source-composite-v1",
  tracks: track02Study01DraftPackage.tracks,
  studies: Object.freeze([
    ...track02Study01DraftPackage.studies,
    ...track02DraftBatchPackage.studies,
  ]),
  sections: Object.freeze([
    ...track02Study01DraftPackage.sections,
    ...track02DraftBatchPackage.sections,
  ]),
  references: Object.freeze([
    ...track02Study01DraftPackage.references,
    ...track02DraftBatchPackage.references,
  ]),
});

export const materializePublishedStudyPackage = (
  sourcePackage: StudyContentPackage,
): StudyContentPackage =>
  Object.freeze({
    ...sourcePackage,
    tracks: Object.freeze(
      sourcePackage.tracks.map((track) =>
        Object.freeze({ ...track, published: true }),
      ),
    ),
    studies: Object.freeze(
      sourcePackage.studies.map((study) =>
        Object.freeze({ ...study, published: true }),
      ),
    ),
  });

const releaseEntry = (
  sourcePackage: StudyContentPackage,
  publicAuthorDisplayName: string | null = null,
): StudyReleaseEntry =>
  Object.freeze({
    contentPackage: materializePublishedStudyPackage(sourcePackage),
    publicAuthorDisplayName,
  });

export const studyReleaseManifest: readonly StudyReleaseEntry[] = Object.freeze([
  releaseEntry(track01DraftBatchPackage),
  releaseEntry(track02ReleaseSourcePackage),
  releaseEntry(track03DraftBatchPackage),
  releaseEntry(track04DraftBatchPackage),
  releaseEntry(track05Study01Draft, track05Study01PublicAuthor),
  releaseEntry(track06DraftBatchPackage),
]);
