/**
 * Public contract for offline textual search in the hymnal catalog.
 *
 * Search is intentionally separate from HymnalRepository.
 * This layer defines request, result and pagination semantics only.
 */

import type { HymnalEditionId } from "../../domain/hymnal/hymnalEdition";
import type { HymnalHymnSummary } from "./hymnalRepository";

export const HYMNAL_SEARCH_DEFAULT_LIMIT = 25 as const;
export const HYMNAL_SEARCH_MAX_LIMIT = 100 as const;

export type HymnalSearchTextMode = "WORD" | "PHRASE";

export type HymnalSearchTextRequest = Readonly<{
  editionId: HymnalEditionId;
  query: string;
  mode: HymnalSearchTextMode;
  offset: number;
  limit: number;
}>;

export type HymnalSearchResult = HymnalHymnSummary;

export type HymnalSearchPage = Readonly<{
  items: readonly HymnalSearchResult[];
  offset: number;
  limit: number;
  hasMore: boolean;
}>;

export interface HymnalSearchRepository {
  searchText(
    request: HymnalSearchTextRequest,
  ): Promise<HymnalSearchPage>;
}
