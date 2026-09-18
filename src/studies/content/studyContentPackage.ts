import type {
  Study,
  StudyReference,
  StudySection,
  StudyTrack,
} from "../../domain/studies/study";

export type StudyContentVersion = string;

export type StudyContentPackage = Readonly<{
  contentVersion: StudyContentVersion;
  tracks: readonly StudyTrack[];
  studies: readonly Study[];
  sections: readonly StudySection[];
  references: readonly StudyReference[];
}>;
