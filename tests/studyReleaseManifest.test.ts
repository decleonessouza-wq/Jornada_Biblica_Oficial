import { createHash } from "crypto";

import { track01DraftBatchPackage } from "../src/studies/content/track01DraftBatch";
import { track02DraftBatchPackage } from "../src/studies/content/track02DraftBatch";
import { track02Study01DraftPackage } from "../src/studies/content/track02Study01Draft";
import { track03DraftBatchPackage } from "../src/studies/content/track03DraftBatch";
import { track04DraftBatchPackage } from "../src/studies/content/track04DraftBatch";
import {
  track05Study01Draft,
  track05Study01PublicAuthor,
} from "../src/studies/content/track05Study01Draft";
import { track06DraftBatchPackage } from "../src/studies/content/track06DraftBatch";
import { validateStudyContentPackage } from "../src/studies/content/studyContentValidator";
import {
  studyReleaseManifest,
  track02ReleaseSourcePackage,
} from "../src/studies/release/studyReleaseManifest";
import {
  getRuntimeStudyById,
  getRuntimeStudyCountForTrack,
  studyRuntimeCatalog,
} from "../src/studies/runtime/studyRuntimeCatalog";

const APPROVED_FINGERPRINT =
  "8DC0629F67019D45B4CDB740B61E7D2E6CA09ED3E7F0701595F6C267610B59C6";

const EXPECTED_PER_TRACK = new Map([
  ["track-01", 18],
  ["track-02", 10],
  ["track-03", 19],
  ["track-04", 18],
  ["track-05", 1],
  ["track-06", 10],
]);

const approvedInventoryFingerprint = (): string => {
  const inventory = studyReleaseManifest
    .flatMap((entry) => entry.contentPackage.studies)
    .map((study) => ({
      trackId: study.trackId,
      number: Number(study.number),
      id: study.id,
      slug: study.slug,
      title: study.title,
    }))
    .sort(
      (left, right) =>
        left.trackId.localeCompare(right.trackId) ||
        left.number - right.number ||
        left.id.localeCompare(right.id),
    );

  return createHash("sha256")
    .update(JSON.stringify(inventory))
    .digest("hex")
    .toUpperCase();
};

describe("studyReleaseManifest", () => {
  it("declares exactly the six approved release packages without mutating source content", () => {
    expect(studyReleaseManifest).toHaveLength(6);
    expect(studyReleaseManifest.map((entry) => entry.contentPackage.studies.length)).toEqual([
      18,
      10,
      19,
      18,
      1,
      10,
    ]);

    expect(track01DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track02Study01DraftPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track02DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track03DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track04DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
    expect(track05Study01Draft.studies.every((study) => !study.published)).toBe(true);
    expect(track06DraftBatchPackage.studies.every((study) => !study.published)).toBe(true);
  });

  it("materializes every released package as runtime-valid published content", () => {
    for (const entry of studyReleaseManifest) {
      expect(entry.contentPackage.tracks.every((track) => track.published)).toBe(true);
      expect(entry.contentPackage.studies.every((study) => study.published)).toBe(true);
      expect(validateStudyContentPackage(entry.contentPackage).valid).toBe(true);
    }
  });

  it("composes Track 02 studies 01-10 before publication", () => {
    expect(track02ReleaseSourcePackage.tracks).toHaveLength(1);
    expect(track02ReleaseSourcePackage.studies).toHaveLength(10);
    expect(track02ReleaseSourcePackage.sections).toHaveLength(242);
    expect(track02ReleaseSourcePackage.references).toHaveLength(0);

    expect(
      [...track02ReleaseSourcePackage.studies]
        .sort((left, right) => left.number - right.number)
        .map((study) => study.number),
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("preserves the exact editorially approved 76-study fingerprint", () => {
    expect(approvedInventoryFingerprint()).toBe(APPROVED_FINGERPRINT);
  });

  it("exposes exactly 6 tracks and 76 studies with approved per-track counts", () => {
    expect(studyRuntimeCatalog.packages).toHaveLength(6);
    expect(studyRuntimeCatalog.tracks).toHaveLength(6);
    expect(studyRuntimeCatalog.studies).toHaveLength(76);

    for (const [trackId, expectedCount] of EXPECTED_PER_TRACK) {
      expect(getRuntimeStudyCountForTrack(trackId)).toBe(expectedCount);
    }
  });

  it("preserves the authorized Track 05 public author only for its released study", () => {
    const track05 = getRuntimeStudyById("track-05-study-01");
    expect(track05).not.toBeNull();
    expect(track05?.publicAuthorDisplayName).toBe(track05Study01PublicAuthor);

    expect(
      studyRuntimeCatalog.studies
        .filter((entry) => entry.content.trackId !== "track-05")
        .every((entry) => entry.publicAuthorDisplayName === null),
    ).toBe(true);
  });

  it("keeps runtime ids, slugs and next-study continuity unique", () => {
    const trackIds = studyRuntimeCatalog.tracks.map((track) => track.id);
    const studyIds = studyRuntimeCatalog.studies.map((entry) => entry.content.id);
    const studySlugs = studyRuntimeCatalog.studies.map((entry) => entry.content.slug);

    expect(new Set(trackIds).size).toBe(trackIds.length);
    expect(new Set(studyIds).size).toBe(studyIds.length);
    expect(new Set(studySlugs).size).toBe(studySlugs.length);

    for (const trackId of EXPECTED_PER_TRACK.keys()) {
      const studies = studyRuntimeCatalog.studies
        .map((entry) => entry.content)
        .filter((study) => study.trackId === trackId)
        .sort((left, right) => left.number - right.number);

      studies.forEach((study, index) => {
        expect(study.number).toBe(index + 1);
        expect(study.nextStudyId).toBe(
          index === studies.length - 1 ? null : studies[index + 1].id,
        );
      });
    }
  });
});
