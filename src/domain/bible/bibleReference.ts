/**
 * Domínio semântico de referências bíblicas do Bíblia Jornada.
 *
 * Esta fase define somente identidade e forma dos dados.
 * Parsing, formatação, catálogo de nomes/aliases, adaptação para provedores,
 * persistência e integração com telas pertencem a etapas posteriores.
 *
 * Regras:
 * - a identidade do livro é estável e independente de idioma/provedor;
 * - uma referência contém uma lista ordenada e não vazia de passagens;
 * - referências compostas são modeladas como múltiplas passagens;
 * - o modelo não preserva texto bruto de origem;
 * - WHOLE_BOOK é necessário para livros lidos integralmente em uma unidade;
 * - VERSE_RANGE suporta intervalos no mesmo capítulo e entre capítulos;
 * - validação de limites de capítulos/versículos ocorre fora deste arquivo.
 */

export type BibleBookId =
  | "GEN"
  | "EXO"
  | "LEV"
  | "NUM"
  | "DEU"
  | "JOS"
  | "JDG"
  | "RUT"
  | "1SA"
  | "2SA"
  | "1KI"
  | "2KI"
  | "1CH"
  | "2CH"
  | "EZR"
  | "NEH"
  | "EST"
  | "JOB"
  | "PSA"
  | "PRO"
  | "ECC"
  | "SNG"
  | "ISA"
  | "JER"
  | "LAM"
  | "EZK"
  | "DAN"
  | "HOS"
  | "JOL"
  | "AMO"
  | "OBA"
  | "JON"
  | "MIC"
  | "NAM"
  | "HAB"
  | "ZEP"
  | "HAG"
  | "ZEC"
  | "MAL"
  | "MAT"
  | "MRK"
  | "LUK"
  | "JHN"
  | "ACT"
  | "ROM"
  | "1CO"
  | "2CO"
  | "GAL"
  | "EPH"
  | "PHP"
  | "COL"
  | "1TH"
  | "2TH"
  | "1TI"
  | "2TI"
  | "TIT"
  | "PHM"
  | "HEB"
  | "JAS"
  | "1PE"
  | "2PE"
  | "1JN"
  | "2JN"
  | "3JN"
  | "JUD"
  | "REV";

export type BibleVerseAddress = Readonly<{
  chapter: number;
  verse: number;
}>;

export type WholeBookPassage = Readonly<{
  kind: "WHOLE_BOOK";
  bookId: BibleBookId;
}>;

export type ChapterPassage = Readonly<{
  kind: "CHAPTER";
  bookId: BibleBookId;
  chapter: number;
}>;

export type ChapterRangePassage = Readonly<{
  kind: "CHAPTER_RANGE";
  bookId: BibleBookId;
  startChapter: number;
  endChapter: number;
}>;

export type VersePassage = Readonly<{
  kind: "VERSE";
  bookId: BibleBookId;
  chapter: number;
  verse: number;
}>;

export type VerseRangePassage = Readonly<{
  kind: "VERSE_RANGE";
  bookId: BibleBookId;
  start: BibleVerseAddress;
  end: BibleVerseAddress;
}>;

export type BiblePassage =
  | WholeBookPassage
  | ChapterPassage
  | ChapterRangePassage
  | VersePassage
  | VerseRangePassage;

export type BibleReference = Readonly<{
  passages: readonly [BiblePassage, ...BiblePassage[]];
}>;
