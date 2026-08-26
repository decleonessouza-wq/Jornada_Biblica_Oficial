/**
 * Roteamento da busca bíblica offline entre referência estruturada e texto.
 *
 * Regras congeladas em 7-P5-A0-R1:
 * - referência é tentada primeiro pelo parseBibleReference canônico;
 * - UNKNOWN_BOOK e v?rgulas puramente textuais fazem fallback para busca textual;
 * - demais erros de referência são retornados de forma estruturada;
 * - texto com um token usa WORD e com dois ou mais tokens usa PHRASE;
 * - o repository textual é injetado pelo contrato BibleSearchRepository;
 * - este módulo não conhece SQLite, FTS5, SQL, UI, Reader ou navegação.
 */

import type { BibleReference } from "../../domain/bible/bibleReference";
import {
  parseBibleReference,
  type BibleReferenceParseError,
} from "../../domain/bible/bibleReferenceParser";
import {
  isBibleVersionId,
  type BibleVersionId,
} from "../../domain/bible/bibleVersion";
import type {
  BibleSearchPage,
  BibleSearchRepository,
  BibleSearchTextMode,
} from "../repositories/bibleSearchRepository";
import {
  normalizeBibleSearchText,
  tokenizeBibleSearchText,
} from "./bibleSearchNormalization";

export type BibleSearchRouterRequest = Readonly<{
  versionId: BibleVersionId;
  query: string;
  offset: number;
  limit: number;
}>;

export type BibleSearchReferenceRoute = Readonly<{
  kind: "REFERENCE";
  versionId: BibleVersionId;
  reference: BibleReference;
}>;

export type BibleSearchTextRoute = Readonly<{
  kind: "TEXT";
  versionId: BibleVersionId;
  mode: BibleSearchTextMode;
  page: BibleSearchPage;
}>;

export type BibleSearchInvalidReferenceRoute = Readonly<{
  kind: "INVALID_REFERENCE";
  versionId: BibleVersionId;
  error: BibleReferenceParseError;
}>;

export type BibleSearchRouterResult =
  | BibleSearchReferenceRoute
  | BibleSearchTextRoute
  | BibleSearchInvalidReferenceRoute;

function assertRouterRequestBasics(
  request: BibleSearchRouterRequest,
): void {
  if (
    typeof request.versionId !== "string" ||
    !isBibleVersionId(request.versionId)
  ) {
    throw new Error(
      `BIBLE_SEARCH_ROUTER_INVALID_VERSION:${String(request.versionId)}`,
    );
  }

  if (typeof request.query !== "string") {
    throw new Error("BIBLE_SEARCH_ROUTER_INVALID_QUERY_TYPE");
  }
}

function throwEmptyRouterQuery(): never {
  throw new Error("BIBLE_SEARCH_ROUTER_EMPTY_QUERY");
}

function shouldFallbackAmbiguousCommaToText(
  query: string,
  error: BibleReferenceParseError,
): boolean {
  if (error.code !== "AMBIGUOUS_COMMA_SHORTHAND") {
    return false;
  }

  // Semicolon is an explicit structured-reference separator.
  if (query.includes(";")) {
    return false;
  }

  const commaParts = query
    .split(",")
    .map((part) => part.trim());

  if (
    commaParts.length < 2 ||
    commaParts.some((part) => !part)
  ) {
    return false;
  }

  return commaParts.every((part) => {
    const parsedFragment = parseBibleReference(part);

    if (parsedFragment.ok) {
      return false;
    }

    // Numeric locators are strong evidence of reference intent.
    if (/\d/.test(part)) {
      return false;
    }

    // At this point the fragment is non-numeric free text.
    // This deliberately tolerates lexical collisions such as
    // Portuguese "na" versus the canonical alias "Na" (Naum).
    return true;
  });
}

export class BibleSearchRouter {
  constructor(
    private readonly repository: BibleSearchRepository,
  ) {}

  async route(
    request: BibleSearchRouterRequest,
  ): Promise<BibleSearchRouterResult> {
    assertRouterRequestBasics(request);

    const parsedReference = parseBibleReference(request.query);

    if (parsedReference.ok) {
      return {
        kind: "REFERENCE",
        versionId: request.versionId,
        reference: parsedReference.value,
      };
    }

    if (parsedReference.error.code === "EMPTY_REFERENCE") {
      return throwEmptyRouterQuery();
    }

    const shouldFallbackToText =
      parsedReference.error.code === "UNKNOWN_BOOK" ||
      shouldFallbackAmbiguousCommaToText(
        request.query,
        parsedReference.error,
      );

    if (!shouldFallbackToText) {
      return {
        kind: "INVALID_REFERENCE",
        versionId: request.versionId,
        error: parsedReference.error,
      };
    }

    const normalizedQuery =
      normalizeBibleSearchText(request.query);
    const tokens = tokenizeBibleSearchText(request.query);

    if (!normalizedQuery || tokens.length === 0) {
      return throwEmptyRouterQuery();
    }

    const mode: BibleSearchTextMode =
      tokens.length === 1 ? "WORD" : "PHRASE";

    const page = await this.repository.searchText({
      versionId: request.versionId,
      query: request.query,
      mode,
      offset: request.offset,
      limit: request.limit,
    });

    return {
      kind: "TEXT",
      versionId: request.versionId,
      mode,
      page,
    };
  }
}
