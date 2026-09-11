import React from "react";
import {
  fireEvent,
  render,
} from "@testing-library/react-native";

import { BibleVerseList } from "../src/bible/components/BibleVerseList";
import type { BibleVerseRecord } from "../src/bible/repositories/bibleRepository";

const verses: readonly BibleVerseRecord[] = [
  {
    versionId: "BLIVRE",
    bookId: "JHN",
    chapter: 3,
    verse: 16,
    text: "Porque Deus amou o mundo...",
  },
  {
    versionId: "BLIVRE",
    bookId: "JHN",
    chapter: 3,
    verse: 17,
    text: "Deus enviou o seu Filho...",
  },
];

describe("BibleVerseList Journal action", () => {
  it("emits the exact verse selected for the Journal", () => {
    const onRequestJournalVerse = jest.fn();

    const view = render(
      <BibleVerseList
        verses={verses}
        fontScale="medium"
        onRequestJournalVerse={
          onRequestJournalVerse
        }
      />,
    );

    fireEvent.press(
      view.getByLabelText(
        "Registrar versículo 16 no diário",
      ),
    );

    expect(
      onRequestJournalVerse,
    ).toHaveBeenCalledTimes(1);
    expect(
      onRequestJournalVerse,
    ).toHaveBeenCalledWith(16);
  });

  it("keeps Journal and favorite actions independent", () => {
    const onRequestJournalVerse = jest.fn();
    const onToggleFavoriteVerse = jest.fn();

    const view = render(
      <BibleVerseList
        verses={verses}
        fontScale="medium"
        favoriteVerses={new Set([16])}
        onRequestJournalVerse={
          onRequestJournalVerse
        }
        onToggleFavoriteVerse={
          onToggleFavoriteVerse
        }
      />,
    );

    fireEvent.press(
      view.getByLabelText(
        "Registrar versículo 17 no diário",
      ),
    );
    fireEvent.press(
      view.getByTestId(
        "bible-reader-favorite-verse-16",
      ),
    );

    expect(
      onRequestJournalVerse,
    ).toHaveBeenCalledWith(17);
    expect(
      onToggleFavoriteVerse,
    ).toHaveBeenCalledWith(16);
    expect(
      onRequestJournalVerse,
    ).toHaveBeenCalledTimes(1);
    expect(
      onToggleFavoriteVerse,
    ).toHaveBeenCalledTimes(1);
  });
});