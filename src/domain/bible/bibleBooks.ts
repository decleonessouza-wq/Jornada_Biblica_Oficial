/**
 * Catálogo canônico dos 66 livros da Bíblia Protestante.
 *
 * Responsabilidades desta fase:
 * - metadados estáveis dos livros;
 * - ordem canônica;
 * - quantidade de capítulos;
 * - aliases centrais curados;
 * - resolução pura por identidade e por alias normalizado.
 *
 * Fora de escopo:
 * - parser de referências;
 * - formatter;
 * - códigos/URLs específicos de provedores;
 * - persistência;
 * - integração com telas.
 */

import type { BibleBookId } from "./bibleReference";

export type BibleTestament = "OLD" | "NEW";

export type BibleBook = Readonly<{
  id: BibleBookId;
  order: number;
  testament: BibleTestament;
  canonicalName: string;
  chapterCount: number;
  aliases: readonly string[];
}>;

export const BIBLE_BOOK_COUNT = 66 as const;
export const BIBLE_CHAPTER_COUNT = 1189 as const;

export const BIBLE_BOOKS = [
  {
    id: "GEN",
    order: 1,
    testament: "OLD",
    canonicalName: "Gênesis",
    chapterCount: 50,
    aliases: ["Gn"],
  },
  {
    id: "EXO",
    order: 2,
    testament: "OLD",
    canonicalName: "Êxodo",
    chapterCount: 40,
    aliases: ["Ex"],
  },
  {
    id: "LEV",
    order: 3,
    testament: "OLD",
    canonicalName: "Levítico",
    chapterCount: 27,
    aliases: ["Lv"],
  },
  {
    id: "NUM",
    order: 4,
    testament: "OLD",
    canonicalName: "Números",
    chapterCount: 36,
    aliases: ["Nm"],
  },
  {
    id: "DEU",
    order: 5,
    testament: "OLD",
    canonicalName: "Deuteronômio",
    chapterCount: 34,
    aliases: ["Dt"],
  },
  {
    id: "JOS",
    order: 6,
    testament: "OLD",
    canonicalName: "Josué",
    chapterCount: 24,
    aliases: ["Js"],
  },
  {
    id: "JDG",
    order: 7,
    testament: "OLD",
    canonicalName: "Juízes",
    chapterCount: 21,
    aliases: ["Jz"],
  },
  {
    id: "RUT",
    order: 8,
    testament: "OLD",
    canonicalName: "Rute",
    chapterCount: 4,
    aliases: ["Rt"],
  },
  {
    id: "1SA",
    order: 9,
    testament: "OLD",
    canonicalName: "1 Samuel",
    chapterCount: 31,
    aliases: ["1Sm"],
  },
  {
    id: "2SA",
    order: 10,
    testament: "OLD",
    canonicalName: "2 Samuel",
    chapterCount: 24,
    aliases: ["2Sm"],
  },
  {
    id: "1KI",
    order: 11,
    testament: "OLD",
    canonicalName: "1 Reis",
    chapterCount: 22,
    aliases: ["1Rs"],
  },
  {
    id: "2KI",
    order: 12,
    testament: "OLD",
    canonicalName: "2 Reis",
    chapterCount: 25,
    aliases: ["2Rs"],
  },
  {
    id: "1CH",
    order: 13,
    testament: "OLD",
    canonicalName: "1 Crônicas",
    chapterCount: 29,
    aliases: ["1Cr"],
  },
  {
    id: "2CH",
    order: 14,
    testament: "OLD",
    canonicalName: "2 Crônicas",
    chapterCount: 36,
    aliases: ["2Cr"],
  },
  {
    id: "EZR",
    order: 15,
    testament: "OLD",
    canonicalName: "Esdras",
    chapterCount: 10,
    aliases: ["Ed"],
  },
  {
    id: "NEH",
    order: 16,
    testament: "OLD",
    canonicalName: "Neemias",
    chapterCount: 13,
    aliases: ["Ne"],
  },
  {
    id: "EST",
    order: 17,
    testament: "OLD",
    canonicalName: "Ester",
    chapterCount: 10,
    aliases: ["Et"],
  },
  {
    id: "JOB",
    order: 18,
    testament: "OLD",
    canonicalName: "Jó",
    chapterCount: 42,
    aliases: [],
  },
  {
    id: "PSA",
    order: 19,
    testament: "OLD",
    canonicalName: "Salmos",
    chapterCount: 150,
    aliases: ["Sl"],
  },
  {
    id: "PRO",
    order: 20,
    testament: "OLD",
    canonicalName: "Provérbios",
    chapterCount: 31,
    aliases: ["Pv"],
  },
  {
    id: "ECC",
    order: 21,
    testament: "OLD",
    canonicalName: "Eclesiastes",
    chapterCount: 12,
    aliases: ["Ec"],
  },
  {
    id: "SNG",
    order: 22,
    testament: "OLD",
    canonicalName: "Cânticos",
    chapterCount: 8,
    aliases: ["Ct", "Cantares"],
  },
  {
    id: "ISA",
    order: 23,
    testament: "OLD",
    canonicalName: "Isaías",
    chapterCount: 66,
    aliases: ["Is"],
  },
  {
    id: "JER",
    order: 24,
    testament: "OLD",
    canonicalName: "Jeremias",
    chapterCount: 52,
    aliases: ["Jr"],
  },
  {
    id: "LAM",
    order: 25,
    testament: "OLD",
    canonicalName: "Lamentações",
    chapterCount: 5,
    aliases: ["Lm"],
  },
  {
    id: "EZK",
    order: 26,
    testament: "OLD",
    canonicalName: "Ezequiel",
    chapterCount: 48,
    aliases: ["Ez"],
  },
  {
    id: "DAN",
    order: 27,
    testament: "OLD",
    canonicalName: "Daniel",
    chapterCount: 12,
    aliases: ["Dn"],
  },
  {
    id: "HOS",
    order: 28,
    testament: "OLD",
    canonicalName: "Oseias",
    chapterCount: 14,
    aliases: ["Os"],
  },
  {
    id: "JOL",
    order: 29,
    testament: "OLD",
    canonicalName: "Joel",
    chapterCount: 3,
    aliases: ["Jl"],
  },
  {
    id: "AMO",
    order: 30,
    testament: "OLD",
    canonicalName: "Amós",
    chapterCount: 9,
    aliases: ["Am"],
  },
  {
    id: "OBA",
    order: 31,
    testament: "OLD",
    canonicalName: "Obadias",
    chapterCount: 1,
    aliases: ["Ob"],
  },
  {
    id: "JON",
    order: 32,
    testament: "OLD",
    canonicalName: "Jonas",
    chapterCount: 4,
    aliases: ["Jn"],
  },
  {
    id: "MIC",
    order: 33,
    testament: "OLD",
    canonicalName: "Miquéias",
    chapterCount: 7,
    aliases: ["Mq"],
  },
  {
    id: "NAM",
    order: 34,
    testament: "OLD",
    canonicalName: "Naum",
    chapterCount: 3,
    aliases: ["Na"],
  },
  {
    id: "HAB",
    order: 35,
    testament: "OLD",
    canonicalName: "Habacuque",
    chapterCount: 3,
    aliases: ["Hc"],
  },
  {
    id: "ZEP",
    order: 36,
    testament: "OLD",
    canonicalName: "Sofonias",
    chapterCount: 3,
    aliases: ["Sf"],
  },
  {
    id: "HAG",
    order: 37,
    testament: "OLD",
    canonicalName: "Ageu",
    chapterCount: 2,
    aliases: ["Ag"],
  },
  {
    id: "ZEC",
    order: 38,
    testament: "OLD",
    canonicalName: "Zacarias",
    chapterCount: 14,
    aliases: ["Zc"],
  },
  {
    id: "MAL",
    order: 39,
    testament: "OLD",
    canonicalName: "Malaquias",
    chapterCount: 4,
    aliases: ["Ml"],
  },
  {
    id: "MAT",
    order: 40,
    testament: "NEW",
    canonicalName: "Mateus",
    chapterCount: 28,
    aliases: ["Mt"],
  },
  {
    id: "MRK",
    order: 41,
    testament: "NEW",
    canonicalName: "Marcos",
    chapterCount: 16,
    aliases: ["Mc"],
  },
  {
    id: "LUK",
    order: 42,
    testament: "NEW",
    canonicalName: "Lucas",
    chapterCount: 24,
    aliases: ["Lc"],
  },
  {
    id: "JHN",
    order: 43,
    testament: "NEW",
    canonicalName: "João",
    chapterCount: 21,
    aliases: ["Joa"],
  },
  {
    id: "ACT",
    order: 44,
    testament: "NEW",
    canonicalName: "Atos",
    chapterCount: 28,
    aliases: ["At"],
  },
  {
    id: "ROM",
    order: 45,
    testament: "NEW",
    canonicalName: "Romanos",
    chapterCount: 16,
    aliases: ["Rm"],
  },
  {
    id: "1CO",
    order: 46,
    testament: "NEW",
    canonicalName: "1 Coríntios",
    chapterCount: 16,
    aliases: ["1Co"],
  },
  {
    id: "2CO",
    order: 47,
    testament: "NEW",
    canonicalName: "2 Coríntios",
    chapterCount: 13,
    aliases: ["2Co"],
  },
  {
    id: "GAL",
    order: 48,
    testament: "NEW",
    canonicalName: "Gálatas",
    chapterCount: 6,
    aliases: ["Gl"],
  },
  {
    id: "EPH",
    order: 49,
    testament: "NEW",
    canonicalName: "Efésios",
    chapterCount: 6,
    aliases: ["Ef"],
  },
  {
    id: "PHP",
    order: 50,
    testament: "NEW",
    canonicalName: "Filipenses",
    chapterCount: 4,
    aliases: ["Fp"],
  },
  {
    id: "COL",
    order: 51,
    testament: "NEW",
    canonicalName: "Colossenses",
    chapterCount: 4,
    aliases: ["Cl"],
  },
  {
    id: "1TH",
    order: 52,
    testament: "NEW",
    canonicalName: "1 Tessalonicenses",
    chapterCount: 5,
    aliases: ["1Ts"],
  },
  {
    id: "2TH",
    order: 53,
    testament: "NEW",
    canonicalName: "2 Tessalonicenses",
    chapterCount: 3,
    aliases: ["2Ts"],
  },
  {
    id: "1TI",
    order: 54,
    testament: "NEW",
    canonicalName: "1 Timóteo",
    chapterCount: 6,
    aliases: ["1Tm"],
  },
  {
    id: "2TI",
    order: 55,
    testament: "NEW",
    canonicalName: "2 Timóteo",
    chapterCount: 4,
    aliases: ["2Tm"],
  },
  {
    id: "TIT",
    order: 56,
    testament: "NEW",
    canonicalName: "Tito",
    chapterCount: 3,
    aliases: ["Tt"],
  },
  {
    id: "PHM",
    order: 57,
    testament: "NEW",
    canonicalName: "Filemom",
    chapterCount: 1,
    aliases: ["Fm"],
  },
  {
    id: "HEB",
    order: 58,
    testament: "NEW",
    canonicalName: "Hebreus",
    chapterCount: 13,
    aliases: ["Hb"],
  },
  {
    id: "JAS",
    order: 59,
    testament: "NEW",
    canonicalName: "Tiago",
    chapterCount: 5,
    aliases: ["Tg"],
  },
  {
    id: "1PE",
    order: 60,
    testament: "NEW",
    canonicalName: "1 Pedro",
    chapterCount: 5,
    aliases: ["1Pe"],
  },
  {
    id: "2PE",
    order: 61,
    testament: "NEW",
    canonicalName: "2 Pedro",
    chapterCount: 3,
    aliases: ["2Pe"],
  },
  {
    id: "1JN",
    order: 62,
    testament: "NEW",
    canonicalName: "1 João",
    chapterCount: 5,
    aliases: ["1Jo"],
  },
  {
    id: "2JN",
    order: 63,
    testament: "NEW",
    canonicalName: "2 João",
    chapterCount: 1,
    aliases: ["2Jo"],
  },
  {
    id: "3JN",
    order: 64,
    testament: "NEW",
    canonicalName: "3 João",
    chapterCount: 1,
    aliases: ["3Jo"],
  },
  {
    id: "JUD",
    order: 65,
    testament: "NEW",
    canonicalName: "Judas",
    chapterCount: 1,
    aliases: ["Jd"],
  },
  {
    id: "REV",
    order: 66,
    testament: "NEW",
    canonicalName: "Apocalipse",
    chapterCount: 22,
    aliases: ["Ap"],
  },
] as const satisfies readonly BibleBook[];

export function normalizeBibleBookAlias(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
}

type CatalogIndexes = Readonly<{
  byId: ReadonlyMap<BibleBookId, BibleBook>;
  byAlias: ReadonlyMap<string, BibleBook>;
}>;

function buildCatalogIndexes(): CatalogIndexes {
  if (BIBLE_BOOKS.length !== BIBLE_BOOK_COUNT) {
    throw new Error(
      `BIBLE_BOOK_COUNT_INVALID: expected=${BIBLE_BOOK_COUNT}; actual=${BIBLE_BOOKS.length}`
    );
  }

  const byId = new Map<BibleBookId, BibleBook>();
  const byAlias = new Map<string, BibleBook>();

  let totalChapters = 0;
  let oldTestamentCount = 0;
  let newTestamentCount = 0;

  const registerAlias = (alias: string, book: BibleBook): void => {
    const normalized = normalizeBibleBookAlias(alias);

    if (!normalized) {
      throw new Error(`BIBLE_BOOK_ALIAS_EMPTY: book=${book.id}`);
    }

    const existing = byAlias.get(normalized);

    if (existing && existing.id !== book.id) {
      throw new Error(
        `BIBLE_BOOK_ALIAS_CONFLICT: alias=${normalized}; first=${existing.id}; second=${book.id}`
      );
    }

    byAlias.set(normalized, book);
  };

  BIBLE_BOOKS.forEach((book, index) => {
    const expectedOrder = index + 1;

    if (book.order !== expectedOrder) {
      throw new Error(
        `BIBLE_BOOK_ORDER_INVALID: book=${book.id}; expected=${expectedOrder}; actual=${book.order}`
      );
    }

    if (!Number.isInteger(book.chapterCount) || book.chapterCount < 1) {
      throw new Error(
        `BIBLE_BOOK_CHAPTER_COUNT_INVALID: book=${book.id}; actual=${book.chapterCount}`
      );
    }

    if (byId.has(book.id)) {
      throw new Error(`BIBLE_BOOK_ID_DUPLICATED: book=${book.id}`);
    }

    byId.set(book.id, book);

    totalChapters += book.chapterCount;

    if (book.testament === "OLD") {
      oldTestamentCount += 1;
    } else {
      newTestamentCount += 1;
    }

    registerAlias(book.id, book);
    registerAlias(book.canonicalName, book);

    for (const alias of book.aliases) {
      registerAlias(alias, book);
    }
  });

  if (oldTestamentCount !== 39) {
    throw new Error(
      `OLD_TESTAMENT_BOOK_COUNT_INVALID: expected=39; actual=${oldTestamentCount}`
    );
  }

  if (newTestamentCount !== 27) {
    throw new Error(
      `NEW_TESTAMENT_BOOK_COUNT_INVALID: expected=27; actual=${newTestamentCount}`
    );
  }

  if (totalChapters !== BIBLE_CHAPTER_COUNT) {
    throw new Error(
      `BIBLE_CHAPTER_COUNT_INVALID: expected=${BIBLE_CHAPTER_COUNT}; actual=${totalChapters}`
    );
  }

  return { byId, byAlias };
}

const CATALOG_INDEXES = buildCatalogIndexes();

export function getBibleBookById(id: BibleBookId): BibleBook {
  const book = CATALOG_INDEXES.byId.get(id);

  if (!book) {
    throw new Error(`BIBLE_BOOK_ID_NOT_FOUND: ${id}`);
  }

  return book;
}

export function resolveBibleBookAlias(value: string): BibleBook | null {
  const normalized = normalizeBibleBookAlias(value);

  if (!normalized) {
    return null;
  }

  return CATALOG_INDEXES.byAlias.get(normalized) ?? null;
}
