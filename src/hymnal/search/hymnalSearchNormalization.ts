/**
 * Canonical normalization shared by future hymnal search indexing and queries.
 *
 * Rules:
 * - Unicode NFD;
 * - remove combining diacritical marks;
 * - deterministic lowercase;
 * - punctuation becomes spaces;
 * - repeated whitespace collapses;
 * - tokenization uses the normalized alphanumeric representation.
 */

export const HYMNAL_SEARCH_NORMALIZER_VERSION = 1 as const;

const COMBINING_MARKS_PATTERN = /[\u0300-\u036f]/g;
const NON_ALPHANUMERIC_PATTERN = /[^a-z0-9]+/g;
const MULTIPLE_SPACES_PATTERN = /\s+/g;

export function normalizeHymnalSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(COMBINING_MARKS_PATTERN, "")
    .toLowerCase()
    .replace(NON_ALPHANUMERIC_PATTERN, " ")
    .replace(MULTIPLE_SPACES_PATTERN, " ")
    .trim();
}

export function tokenizeHymnalSearchText(
  value: string,
): readonly string[] {
  const normalized = normalizeHymnalSearchText(value);

  if (!normalized) {
    return [];
  }

  return normalized.split(" ");
}

export function countHymnalSearchTerms(
  value: string,
): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();

  for (const term of tokenizeHymnalSearchText(value)) {
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }

  return counts;
}
