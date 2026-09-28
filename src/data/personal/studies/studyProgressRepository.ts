import type {
  StudyId,
} from "../../../domain/studies/study";
import type {
  StudyProgress,
} from "../../../domain/studies/studyProgress";

export interface StudyProgressRepository {
  load(studyId: StudyId): Promise<StudyProgress | null>;

  list(): Promise<readonly StudyProgress[]>;

  upsert(progress: StudyProgress): Promise<void>;

  reset(studyId: StudyId): Promise<void>;
}