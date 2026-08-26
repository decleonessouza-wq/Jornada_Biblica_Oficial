/**
 * Contrato público da busca textual bíblica offline.
 *
 * Regras congeladas em 7-P3-A0-D1:
 * - este contrato é separado de BibleRepository, que continua responsável
 *   apenas pela leitura do corpus;
 * - a busca textual opera em uma única versão por chamada;
 * - query recebe o texto bruto do usuário; normalização pertence à
 *   implementação do repository;
 * - WORD e PHRASE compartilham o mesmo formato de paginação;
 * - paginação usa offset + limit, sem totalCount obrigatório;
 * - implementações devem buscar limit + 1 para determinar hasMore;
 * - resultados são ordenados canonicamente por livro, capítulo e versículo;
 * - bible_verses continua sendo a fonte autoritativa do texto retornado;
 * - referências como "João 3:16" não pertencem a este contrato: o roteamento
 *   reutilizará o parser canônico de referências na Fase 7-P5;
 * - nenhuma implementação pode varrer o corpus inteiro em JavaScript.
 *
 * Este arquivo contém somente tipos/contrato. SQL, seleção de backend,
 * normalização e roteamento de referência entram nas fases seguintes.
 */

import type { BibleBookId } from "../../domain/bible/bibleReference";
import type { BibleVersionId } from "../../domain/bible/bibleVersion";

export const BIBLE_SEARCH_DEFAULT_LIMIT = 25 as const;
export const BIBLE_SEARCH_MAX_LIMIT = 100 as const;

export type BibleSearchTextMode = "WORD" | "PHRASE";

export type BibleSearchTextRequest = Readonly<{
  versionId: BibleVersionId;
  query: string;
  mode: BibleSearchTextMode;
  offset: number;
  limit: number;
}>;

export type BibleSearchResult = Readonly<{
  versionId: BibleVersionId;
  bookId: BibleBookId;
  chapter: number;
  verse: number;
  text: string;
}>;

export type BibleSearchPage = Readonly<{
  items: readonly BibleSearchResult[];
  offset: number;
  limit: number;
  hasMore: boolean;
}>;

export interface BibleSearchRepository {
  searchText(
    request: BibleSearchTextRequest,
  ): Promise<BibleSearchPage>;
}
