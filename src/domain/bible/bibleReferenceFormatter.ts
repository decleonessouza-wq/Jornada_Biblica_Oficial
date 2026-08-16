/**
 * Formatter canônico de referências bíblicas do Bíblia Jornada.
 *
 * Responsabilidades:
 * - converter BibleReference válido em texto canônico;
 * - usar o nome canônico de cada livro;
 * - preservar a ordem e a cardinalidade das passagens;
 * - usar "; " como separador único de referências compostas;
 * - compactar intervalos de versículos dentro do mesmo capítulo.
 *
 * Fora de escopo:
 * - parsing de texto livre;
 * - validação semântica de capítulos ou versículos;
 * - códigos e URLs específicos de provedores;
 * - persistência;
 * - integração com telas.
 */

import type {
  BiblePassage,
  BibleReference,
} from "./bibleReference";
import { getBibleBookById } from "./bibleBooks";

const COMPOSITE_SEPARATOR = "; ";

function formatBiblePassage(passage: BiblePassage): string {
  const bookName =
    getBibleBookById(passage.bookId).canonicalName;

  switch (passage.kind) {
    case "WHOLE_BOOK":
      return bookName;

    case "CHAPTER":
      return `${bookName} ${passage.chapter}`;

    case "CHAPTER_RANGE":
      return (
        `${bookName} ${passage.startChapter}` +
        `-${passage.endChapter}`
      );

    case "VERSE":
      return (
        `${bookName} ${passage.chapter}` +
        `:${passage.verse}`
      );

    case "VERSE_RANGE":
      if (passage.start.chapter === passage.end.chapter) {
        return (
          `${bookName} ${passage.start.chapter}` +
          `:${passage.start.verse}` +
          `-${passage.end.verse}`
        );
      }

      return (
        `${bookName} ${passage.start.chapter}` +
        `:${passage.start.verse}` +
        `-${passage.end.chapter}` +
        `:${passage.end.verse}`
      );
  }
}

export function formatBibleReference(
  reference: BibleReference
): string {
  return reference.passages
    .map(formatBiblePassage)
    .join(COMPOSITE_SEPARATOR);
}
