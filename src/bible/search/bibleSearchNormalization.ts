/**
 * Normalização canônica usada pelo índice e pelas futuras queries da busca.
 *
 * Regras:
 * - Unicode NFD;
 * - remoção de marcas diacríticas;
 * - lowercase determinístico;
 * - pontuação convertida em espaço;
 * - espaços colapsados;
 * - tokenização alfanumérica sobre a representação normalizada.
 *
 * A busca nunca deve normalizar o corpus inteiro em tempo de consulta.
 */

export const BIBLE_SEARCH_NORMALIZER_VERSION = 1 as const;

const COMBINING_MARKS_PATTERN = /[\u0300-\u036f]/g;
const NON_ALPHANUMERIC_PATTERN = /[^a-z0-9]+/g;
const MULTIPLE_SPACES_PATTERN = /\s+/g;

export function normalizeBibleSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(COMBINING_MARKS_PATTERN, "")
    .toLowerCase()
    .replace(NON_ALPHANUMERIC_PATTERN, " ")
    .replace(MULTIPLE_SPACES_PATTERN, " ")
    .trim();
}

export function tokenizeBibleSearchText(
  value: string,
): readonly string[] {
  const normalized = normalizeBibleSearchText(value);

  if (!normalized) {
    return [];
  }

  return normalized.split(" ");
}

export function countBibleSearchTerms(
  value: string,
): ReadonlyMap<string, number> {
  const counts = new Map<string, number>();

  for (const term of tokenizeBibleSearchText(value)) {
    counts.set(term, (counts.get(term) ?? 0) + 1);
  }

  return counts;
}
