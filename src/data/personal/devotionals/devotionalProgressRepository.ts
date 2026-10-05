import type {
  DevotionalId,
} from "../../../domain/devotionals/devotional";
import type {
  DevotionalProgress,
} from "../../../domain/devotionals/devotionalProgress";

export interface DevotionalProgressRepository {
  load(devotionalId: DevotionalId): Promise<DevotionalProgress | null>;

  list(): Promise<readonly DevotionalProgress[]>;

  upsert(progress: DevotionalProgress): Promise<void>;

  reset(devotionalId: DevotionalId): Promise<void>;
}