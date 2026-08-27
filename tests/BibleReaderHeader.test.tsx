import React from "react";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react-native";

import { BibleReaderHeader } from "../src/bible/components/BibleReaderHeader";
import { getBibleBookById } from "../src/domain/bible/bibleBooks";
import type { BibleInstalledVersion } from "../src/bible/repositories/bibleRepository";

const blivre: BibleInstalledVersion = {
  id: "BLIVRE",
  code: "BLIVRE",
  displayName: "B\u00edblia Livre",
  languageTag: "pt-BR",
  publicationYear: 2018,
  enabled: true,
};

const alm1911: BibleInstalledVersion = {
  id: "ALM1911",
  code: "ALM1911",
  displayName: "Almeida 1911",
  languageTag: "pt",
  publicationYear: 1911,
  enabled: true,
};

describe("BibleReaderHeader", () => {
  it("renders the current book, chapter, version and offline state", () => {
    render(
      <BibleReaderHeader
        version={blivre}
        versions={[blivre, alm1911]}
        book={getBibleBookById("GEN")}
        chapter={1}
        canGoPrevious={false}
        canGoNext
        onRequestBack={jest.fn()}
        onRequestPrevious={jest.fn()}
        onRequestNext={jest.fn()}
        onSelectVersion={jest.fn()}
      />,
    );

    expect(
      screen.getByText("G\u00eanesis 1"),
    ).toBeTruthy();

    expect(
      screen.getByText("B\u00edblia Livre \u00b7 2018"),
    ).toBeTruthy();

    expect(
      screen.getByText("SEM INTERNET"),
    ).toBeTruthy();

    expect(
      screen.getByLabelText(
        "Leitura dispon\u00edvel sem internet, B\u00edblia Livre",
      ),
    ).toBeTruthy();
  });

  it("emits back, next chapter and version-selection actions", () => {
    const onRequestBack = jest.fn();
    const onRequestPrevious = jest.fn();
    const onRequestNext = jest.fn();
    const onSelectVersion = jest.fn();

    render(
      <BibleReaderHeader
        version={blivre}
        versions={[blivre, alm1911]}
        book={getBibleBookById("GEN")}
        chapter={1}
        canGoPrevious={false}
        canGoNext
        onRequestBack={onRequestBack}
        onRequestPrevious={onRequestPrevious}
        onRequestNext={onRequestNext}
        onSelectVersion={onSelectVersion}
      />,
    );

    fireEvent.press(
      screen.getByLabelText(
        "Voltar para a sele\u00e7\u00e3o b\u00edblica",
      ),
    );

    fireEvent.press(
      screen.getByLabelText(
        "Ir para o pr\u00f3ximo cap\u00edtulo",
      ),
    );

    fireEvent.press(
      screen.getByLabelText(
        "Ler em Almeida 1911",
      ),
    );

    expect(onRequestBack).toHaveBeenCalledTimes(1);
    expect(onRequestNext).toHaveBeenCalledTimes(1);

    expect(
      onSelectVersion,
    ).toHaveBeenCalledTimes(1);

    expect(
      onSelectVersion,
    ).toHaveBeenCalledWith("ALM1911");

    expect(
      onRequestPrevious,
    ).not.toHaveBeenCalled();
  });

  it("does not emit the previous action when previous navigation is disabled", () => {
    const onRequestPrevious = jest.fn();

    render(
      <BibleReaderHeader
        version={blivre}
        versions={[blivre, alm1911]}
        book={getBibleBookById("GEN")}
        chapter={1}
        canGoPrevious={false}
        canGoNext
        onRequestPrevious={onRequestPrevious}
      />,
    );

    fireEvent.press(
      screen.getByLabelText(
        "Ir para o cap\u00edtulo anterior",
      ),
    );

    expect(
      onRequestPrevious,
    ).not.toHaveBeenCalled();
  });

  it("marks the active version as selected and does not reselect it", () => {
    const onSelectVersion = jest.fn();

    render(
      <BibleReaderHeader
        version={blivre}
        versions={[blivre, alm1911]}
        book={getBibleBookById("JHN")}
        chapter={3}
        canGoPrevious
        canGoNext
        onSelectVersion={onSelectVersion}
      />,
    );

    const selected =
      screen.getByLabelText(
        "Ler em B\u00edblia Livre",
      );

    expect(
      selected.props.accessibilityState,
    ).toEqual(
      expect.objectContaining({
        checked: true,
        disabled: true,
      }),
    );

    fireEvent.press(selected);

    expect(
      onSelectVersion,
    ).not.toHaveBeenCalled();
  });
});
