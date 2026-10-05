import { readFileSync } from "fs";
import { join } from "path";
import { inflateSync } from "zlib";
import React from "react";
import { Image, StyleSheet } from "react-native";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
  within,
} from "@testing-library/react-native";

import type {
  DevotionalId,
} from "../src/domain/devotionals/devotional";
import type {
  RuntimeDevotionalEntry,
} from "../src/devotionals/runtime/devotionalRuntimeCatalog";
import {
  getRuntimeDevotionalById,
} from "../src/devotionals/runtime/devotionalRuntimeCatalog";
import { getPersonalPlatformHub } from "../src/services/personalPlatformHub";
jest.mock("../src/navigation/AppShellChromeContext", () => ({
  useAppShellChrome: () => ({
    chromeProgress: { value: 0 },
    handleScroll: jest.fn(),
    resetChrome: jest.fn(),
  }),
}));

import DevotionalDetailScreen from "../src/screens/DevotionalDetailScreen";
import { colors } from "../src/theme/colors";


jest.mock("../src/components/StudiesScrollHeader", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@react-navigation/native", () => {
  const ReactActual =
    jest.requireActual<typeof import("react")>("react");

  return {
    useFocusEffect: (
      callback: () => void | (() => void),
    ) => {
      ReactActual.useEffect(callback, [callback]);
    },
  };
});

jest.mock(
  "../src/devotionals/runtime/devotionalRuntimeCatalog",
  () => ({
    getRuntimeDevotionalById: jest.fn(),
  }),
);

jest.mock(
  "../src/services/personalPlatformHub",
  () => ({
    getPersonalPlatformHub: jest.fn(),
  }),
);

const mockedGetRuntimeDevotionalById =
  getRuntimeDevotionalById as jest.MockedFunction<
    typeof getRuntimeDevotionalById
  >;
const mockedGetPersonalPlatformHub =
  getPersonalPlatformHub as jest.MockedFunction<
    typeof getPersonalPlatformHub
  >;

const DEVOTIONAL_ID =
  "devotional-test-01" as DevotionalId;

const mockOpenDevotional = jest.fn();
const mockRecordBlockOpened = jest.fn();
const mockCompleteDevotional = jest.fn();
const mockUncompleteDevotional = jest.fn();
const mockIsFavorite = jest.fn();
const mockToggleFavorite = jest.fn();

const runtimeEntry = {
  content: {
    id: DEVOTIONAL_ID,
    contentType: "DEVOTIONAL",
    format: "REFLECTION",
    placement: "TRACK_05",
    title: "Devocional de teste",
    subtitle: "Subtítulo de teste",
    summary: "Resumo sintético para validar a apresentação.",
    audience: "Público de teste",
    author: {
      canonicalName: "Autor interno de teste",
      publicProfile: {
        displayName: "Autor de teste",
        role: "Colaborador",
        formation: null,
        cityState: "Cidade/UF",
      },
      publicDisplayAuthorization: "AUTHORIZED",
    },
    heroImage: null,
    blocks: [
      {
        id: "block-heading",
        kind: "HEADING",
        level: 2,
        text: "Cabeçalho de teste",
      },
      {
        id: "block-paragraph",
        kind: "PARAGRAPH",
        text: "Parágrafo de teste.",
      },
      {
        id: "block-reference",
        kind: "BIBLE_REFERENCE",
        reference: {
          bookId: "JHN",
          startChapter: 3,
          startVerse: 16,
          endChapter: null,
          endVerse: null,
        },
      },
      {
        id: "block-quote",
        kind: "SCRIPTURE_QUOTE",
        reference: {
          bookId: "JHN",
          startChapter: 3,
          startVerse: 16,
          endChapter: null,
          endVerse: null,
        },
        sourceText: "Trecho bíblico de teste.",
      },
      {
        id: "block-list",
        kind: "LIST",
        style: "NUMBERED",
        items: [
          "Primeiro item de teste",
          "Segundo item de teste",
        ],
      },
      {
        id: "block-callout",
        kind: "CALLOUT",
        role: "AUTHOR_EMPHASIS",
        text: "Destaque de teste.",
      },
      {
        id: "block-reflection",
        kind: "REFLECTION_QUESTION",
        prompt: "Pergunta sintética de reflexão?",
      },
      {
        id: "block-prayer",
        kind: "PRAYER",
        text: "Oração de teste.",
      },
      {
        id: "block-action",
        kind: "ACTION",
        text: "Ação de teste.",
      },
    ],
    bibleReferences: [],
    reflectionPrompt:
      "Qual reflexão de teste deseja registrar?",
    governance: {
      editorialStatus: "PUBLISHED",
      contentReview: "APPROVED",
      theologicalReview: "APPROVED",
      publicDisplayAuthorization: "AUTHORIZED",
      publicationAuthorization: "AUTHORIZED",
    },
    source: {
      sourceKind: "COLLABORATIVE_SUBMISSION",
      submittedBy: null,
      receivedAt: null,
      receivedAs: null,
      sourceFileName: null,
      sourceSha256: null,
      curatorNotes: [],
    },
  },
} as unknown as RuntimeDevotionalEntry;

const inProgress = {
  devotionalId: DEVOTIONAL_ID,
  state: "IN_PROGRESS",
  lastBlockId: null,
  readingProgress: 0,
  startedAt: "2026-10-01T00:00:00.000Z",
  lastOpenedAt: "2026-10-01T00:00:00.000Z",
  completedAt: null,
} as const;

const completed = {
  ...inProgress,
  state: "COMPLETED",
  readingProgress: 100,
  completedAt: "2026-10-01T00:10:00.000Z",
} as const;

function configureHub(): void {
  mockedGetPersonalPlatformHub.mockReturnValue({
    devotionalProgressService: {
      openDevotional: mockOpenDevotional,
      recordBlockOpened: mockRecordBlockOpened,
      completeDevotional: mockCompleteDevotional,
      uncompleteDevotional: mockUncompleteDevotional,
    },
    favoritesService: {
      isFavorite: mockIsFavorite,
      toggle: mockToggleFavorite,
    },
  } as never);
}

function renderDetail(
  options: Readonly<{
    returnToFavorites?: boolean;
    onOpenBibleReference?: jest.Mock;
    onOpenJournalContext?: jest.Mock;
    onRequestFavorites?: jest.Mock;
  }> = {},
) {
  const navigation = {
    canGoBack: jest.fn(() => true),
    goBack: jest.fn(),
    navigate: jest.fn(),
  };
  const onOpenBibleReference =
    options.onOpenBibleReference ?? jest.fn();
  const onOpenJournalContext =
    options.onOpenJournalContext ?? jest.fn();
  const onRequestFavorites =
    options.onRequestFavorites ?? jest.fn();

  const view = render(
    <DevotionalDetailScreen
      navigation={navigation as never}
      route={{
        key: "devotional-detail-test",
        name: "DevotionalDetail",
        params: {
          devotionalId: DEVOTIONAL_ID,
          ...(options.returnToFavorites
            ? { returnToFavorites: true }
            : {}),
        },
      }}
      onOpenBibleReference={onOpenBibleReference}
      onOpenJournalContext={onOpenJournalContext}
      onRequestFavorites={onRequestFavorites}
    />,
  );

  return {
    view,
    navigation,
    onOpenBibleReference,
    onOpenJournalContext,
    onRequestFavorites,
  };
}

describe("DevotionalDetailScreen runtime contract", () => {
  beforeEach(() => {
    mockedGetRuntimeDevotionalById.mockReset();
    mockedGetPersonalPlatformHub.mockReset();
    mockOpenDevotional.mockReset();
    mockRecordBlockOpened.mockReset();
    mockCompleteDevotional.mockReset();
    mockUncompleteDevotional.mockReset();
    mockIsFavorite.mockReset();
    mockToggleFavorite.mockReset();

    configureHub();
    mockedGetRuntimeDevotionalById.mockReturnValue(
      runtimeEntry,
    );
    mockOpenDevotional.mockResolvedValue(inProgress);
    mockRecordBlockOpened.mockResolvedValue({
      ...inProgress,
      lastBlockId: "block-paragraph",
      readingProgress: 22,
    });
    mockCompleteDevotional.mockResolvedValue(
      completed,
    );
    mockUncompleteDevotional.mockResolvedValue(
      inProgress,
    );
    mockIsFavorite.mockResolvedValue(false);
    mockToggleFavorite.mockResolvedValue(true);
  });

  afterEach(() => {
    cleanup();
  });

  it("resolves by DevotionalId and renders every official block kind", async () => {
    const { view } = renderDetail();

    expect(
      view.getByText("Devocional de teste"),
    ).toBeTruthy();
    expect(
      view.getByText("Por Autor de teste"),
    ).toBeTruthy();

    for (const id of [
      "block-heading",
      "block-paragraph",
      "block-reference",
      "block-quote",
      "block-list",
      "block-callout",
      "block-reflection",
      "block-prayer",
      "block-action",
    ]) {
      expect(
        view.getByTestId(`devotional-block-${id}`),
      ).toBeTruthy();
    }

    await waitFor(() => {
      expect(mockOpenDevotional).toHaveBeenCalledWith(
        DEVOTIONAL_ID,
      );
      expect(mockIsFavorite).toHaveBeenCalledWith({
        kind: "devotional",
        devotionalId: DEVOTIONAL_ID,
      });
    });
  });

  it("opens structured Bible references through the canonical devotional resolver", async () => {
    const onOpenBibleReference = jest.fn();
    const { view } = renderDetail({
      onOpenBibleReference,
    });

    fireEvent.press(
      view.getByTestId(
        "devotional-open-bible-block-reference",
      ),
    );

    await waitFor(() => {
      expect(onOpenBibleReference).toHaveBeenCalledTimes(
        1,
      );
    });

    expect(
      onOpenBibleReference.mock.calls[0]?.[0],
    ).toEqual({
      passages: [
        {
          kind: "VERSE",
          bookId: "JHN",
          chapter: 3,
          verse: 16,
        },
      ],
    });
  });

  it("emits a DEVOTIONAL journal context without coercing the devotional into Study", () => {
    const onOpenJournalContext = jest.fn();
    const { view } = renderDetail({
      onOpenJournalContext,
    });

    fireEvent.press(
      view.getByTestId(
        "devotional-open-journal-button",
      ),
    );

    expect(onOpenJournalContext).toHaveBeenCalledWith({
      sourceType: "DEVOTIONAL",
      devotionalId: DEVOTIONAL_ID,
      sourceTitleSnapshot: "Devocional de teste",
      promptSnapshot:
        "Qual reflexão de teste deseja registrar?",
    });
  });

  it("uses the explicit devotional Favorite target and origin", async () => {
    const { view } = renderDetail();

    await waitFor(() => {
      expect(mockIsFavorite).toHaveBeenCalled();
    });

    fireEvent.press(
      view.getByTestId("devotional-favorite-button"),
    );

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith(
        {
          kind: "devotional",
          devotionalId: DEVOTIONAL_ID,
        },
        {
          kind: "devotional",
          devotionalId: DEVOTIONAL_ID,
        },
      );
    });
  });

  it("persists devotional reading progress and completion through DevotionalProgressService", async () => {
    const { view } = renderDetail();

    fireEvent.press(
      view.getByTestId(
        "devotional-progress-block-block-paragraph",
      ),
    );

    await waitFor(() => {
      expect(
        mockRecordBlockOpened,
      ).toHaveBeenCalledWith({
        devotionalId: DEVOTIONAL_ID,
        blockId: "block-paragraph",
        blockIndex: 1,
        blockCount: 9,
      });
    });

    await act(async () => {
      fireEvent.press(
        view.getByTestId(
          "devotional-completion-button",
        ),
      );
    });

    await waitFor(() => {
      expect(
        mockCompleteDevotional,
      ).toHaveBeenCalledWith(DEVOTIONAL_ID);
    });
  });

  it("keeps explicit Favorites return handling in the dedicated Devotional route", () => {
    const fs =
      jest.requireActual<typeof import("fs")>("fs");
    const source = fs.readFileSync(
      "src/screens/DevotionalDetailScreen.tsx",
      "utf8",
    );

    expect(source).toContain(
      "route.params.returnToFavorites === true",
    );
    expect(source).toContain(
      "onRequestFavorites();",
    );
    expect(source).toContain(
      'navigation.navigate("StudyTrack", {',
    );
  });

  it("fails closed when the DevotionalId is not present in runtime", () => {
    mockedGetRuntimeDevotionalById.mockReturnValue(null);

    const { view } = renderDetail();

    expect(
      view.getByTestId("devotional-detail-not-found"),
    ).toBeTruthy();
    expect(
      view.getByText("Devocional indisponível"),
    ).toBeTruthy();
    expect(mockOpenDevotional).not.toHaveBeenCalled();
  });

  it("keeps the PersonalPlatformHub integration on the dedicated devotional repository and service", () => {
    const fs =
      jest.requireActual<typeof import("fs")>("fs");
    const hubSource = fs.readFileSync(
      "src/services/personalPlatformHub.ts",
      "utf8",
    );

    expect(hubSource).toContain(
      "SQLiteDevotionalProgressRepository",
    );
    expect(hubSource).toContain(
      "DevotionalProgressService",
    );
    expect(hubSource).toContain(
      "readonly devotionalProgressService: DevotionalProgressService;",
    );
    expect(hubSource).not.toContain(
      "devotionalProgressService: StudyProgressService",
    );
  });
  it("keeps editorial notes internal and applies the refined public devotional reading contract", () => {
    const fs = jest.requireActual<{
      readFileSync: (
        path: string,
        encoding: "utf8",
      ) => string;
    }>("fs");
    const source = fs.readFileSync(
      "src/screens/DevotionalDetailScreen.tsx",
      "utf8",
    );

    expect(source).toContain("DEVOTIONAL_HERO_ASSETS");
    expect(source).toContain('testID="devotional-hero-image"');
    expect(source).toContain(
      'block.role === "EDITORIAL_NOTE"',
    );
    expect(source).toContain("return null;");
    expect(source).toContain(
      "PRIMARY_BIBLE_REFERENCE_BY_DEVOTIONAL_ID",
    );
    expect(source).toContain("styles.inlineBibleReference");
    expect(source).toContain("shouldShowProgressCheckpoint");
    expect(source).toContain("styles.flowBlock");
  });

  it("maps every published secondary Bible reference into the immediately following paragraph text", () => {
    const actualRuntime = jest.requireActual<
      typeof import("../src/devotionals/runtime/devotionalRuntimeCatalog")
    >("../src/devotionals/runtime/devotionalRuntimeCatalog");
    const actualResolver = jest.requireActual<
      typeof import("../src/devotionals/runtime/devotionalBibleReferenceResolver")
    >("../src/devotionals/runtime/devotionalBibleReferenceResolver");

    const primaryById: Readonly<Record<string, string>> = {
      "devotional-track05-samaritana-draft": "João 4:1-15",
      "devotional-track05-jesus-cordeiro-draft": "João 1:29",
      "devotional-track05-pais-adolescentes-draft": "2 Reis 4",
    };

    for (const entry of actualRuntime.devotionalRuntimeCatalog.devotionals) {
      const blocks = entry.content.blocks;

      for (let index = 0; index < blocks.length; index += 1) {
        const block = blocks[index];

        if (block.kind !== "BIBLE_REFERENCE") {
          continue;
        }

        const resolution =
          actualResolver.resolveDevotionalBibleReference(
            block.reference,
          );

        expect(resolution.ok).toBe(true);
        if (!resolution.ok) {
          continue;
        }

        if (
          resolution.canonicalText ===
          primaryById[String(entry.content.id)]
        ) {
          continue;
        }

        const nextBlock = blocks[index + 1];
        expect(nextBlock?.kind).toBe("PARAGRAPH");

        if (nextBlock?.kind === "PARAGRAPH") {
          const inlineTextCandidates =
            resolution.canonicalText.startsWith("Salmos ")
              ? [
                  resolution.canonicalText,
                  "Salmo " + resolution.canonicalText.slice(
                    "Salmos ".length,
                  ),
                ]
              : [resolution.canonicalText];

          expect(
            inlineTextCandidates.some((candidateText) =>
              nextBlock.text.includes(candidateText),
            ),
          ).toBe(true);
        }
      }
    }
  });

  it("locks A7-A5 chrome, hero overlay and paragraph-inline secondary Bible reference UX", () => {
    const source = readFileSync(
      join(
        process.cwd(),
        "src/screens/DevotionalDetailScreen.tsx",
      ),
      "utf8",
    );

    expect(source).toContain(
      'import { useAppShellChrome } from "../navigation/AppShellChromeContext";',
    );
    expect(source).toContain(
      "const { handleScroll, resetChrome } = useAppShellChrome();",
    );
    expect(source).toContain("resetChrome();");
    expect(source).toContain("onScroll={handleScroll}");
    expect(source).toContain("scrollEventThrottle={16}");
    expect(source).toContain('testID="devotional-hero-fade"');
    expect(source).toContain("styles.heroBackgroundImage");
    expect(source).toMatch(
      /heroBackgroundImage:\s*\{\s*\.\.\.StyleSheet\.absoluteFillObject,\s*width:\s*undefined,\s*height:\s*undefined,\s*\}/,
    );
    expect(source).toMatch(
      /heroFadeImage:\s*\{\s*\.\.\.StyleSheet\.absoluteFillObject,\s*width:\s*"100%",\s*height:\s*"100%",\s*\}/,
    );
    expect(source).toContain(
      "getInlineBibleReferencesBeforeParagraph",
    );
    expect(source).toContain('accessibilityRole="link"');
    expect(source).toContain(
      'testID={`devotional-inline-bible-${inlineReference.block.id}`}',
    );
    expect(source).toContain(
      'block.kind === "BIBLE_REFERENCE" &&',
    );
    expect(source).not.toContain("expo-av");
    expect(source).not.toContain("expo-audio");
  });

  it.each([
    [
      "Samaritana",
      "assets/devotionals/heroes/devotional-samaritana.png",
      require("../assets/devotionals/heroes/devotional-samaritana.png"),
    ],
    [
      "Cordeiro",
      "assets/devotionals/heroes/devotional-jesus-cordeiro.png",
      require("../assets/devotionals/heroes/devotional-jesus-cordeiro.png"),
    ],
    [
      "Pais",
      "assets/devotionals/heroes/devotional-pais-adolescentes.png",
      require("../assets/devotionals/heroes/devotional-pais-adolescentes.png"),
    ],
  ] as const)(
    "keeps the %s artwork in a 4:3 frame independently of long text",
    async (_label, assetPath, expectedSource) => {
      const longTitle =
        "Título sintético longo para verificar que o texto não define a altura da arte";
      const longSummary = "Resumo sintético de teste. ".repeat(12);
      mockedGetRuntimeDevotionalById.mockReturnValue({
        ...runtimeEntry,
        content: {
          ...runtimeEntry.content,
          heroImage: assetPath,
          title: longTitle,
          summary: longSummary,
        },
      } as RuntimeDevotionalEntry);

      const { view } = renderDetail();
      await waitFor(() => {
        expect(view.getByText("Em andamento · 0%")).toBeTruthy();
      });

      const frame = view.getByTestId("devotional-hero-frame");
      const frameStyle = StyleSheet.flatten(frame.props.style);
      expect(frameStyle.width).toBe("100%");
      expect(frameStyle.aspectRatio).toBe(4 / 3);
      expect(frameStyle.height).toBeUndefined();
      expect(frameStyle.minHeight).toBeUndefined();
      expect(frameStyle.padding).toBeUndefined();
      expect(frameStyle.gap).toBeUndefined();

      const artwork = view.UNSAFE_getAllByType(Image).find(
        (image) => image.props.testID === "devotional-hero-image",
      );
      const fade = view.UNSAFE_getAllByType(Image).find(
        (image) => image.props.testID === "devotional-hero-fade",
      );
      expect(artwork).toBeDefined();
      expect(fade).toBeDefined();
      expect(artwork!.props.source).toEqual(expectedSource);
      expect(artwork!.props.resizeMode).toBe("cover");
      expect(fade!.props.resizeMode).toBe("stretch");
      expect(fade!.props.source.uri).toMatch(/^data:image\/png;base64,/);
      const bottomFade = within(frame).getByTestId("devotional-hero-bottom-fade");
      const bottomFadeStyle = StyleSheet.flatten(bottomFade.props.style);
      expect(bottomFade.props.pointerEvents).toBe("none");
      expect(bottomFadeStyle.position).toBe("absolute");
      expect(bottomFadeStyle.bottom).toBe(0);
      expect(bottomFadeStyle.left).toBe(0);
      expect(bottomFadeStyle.right).toBe(0);
      expect(bottomFadeStyle.height).toBe(56);
      expect(bottomFadeStyle.top).toBeUndefined();
      expect(within(bottomFade).getByTestId("devotional-hero-fade")).toBeTruthy();
      expect(fade!.props.accessible).toBe(false);
      expect(fade!.props.importantForAccessibility).toBe("no");
      const fadeStyle = StyleSheet.flatten(fade!.props.style);
      expect(fadeStyle.width).toBe("100%");
      expect(fadeStyle.height).toBe("100%");
      expect(fadeStyle.transform).toBeUndefined();

      for (const image of [artwork!]) {
        const style = StyleSheet.flatten(image.props.style);
        // Without these own keys, Image may keep static asset dimensions.
        expect(Object.prototype.hasOwnProperty.call(style, "width")).toBe(true);
        expect(Object.prototype.hasOwnProperty.call(style, "height")).toBe(true);
        expect(style.width).toBeUndefined();
        expect(style.height).toBeUndefined();
        expect(style.position).toBe("absolute");
        expect(style.top).toBe(0);
        expect(style.right).toBe(0);
        expect(style.bottom).toBe(0);
        expect(style.left).toBe(0);
        expect(style.transform).toBeUndefined();
      }

      const content = view.getByTestId("devotional-hero-content");
      expect(within(content).getByText(longTitle)).toBeTruthy();
      expect(within(content).getByText(longSummary.trim())).toBeTruthy();
      expect(within(content).getByText("Subtítulo de teste")).toBeTruthy();
      expect(within(content).getByText("Reflexão")).toBeTruthy();
      expect(within(content).getByText("Por Autor de teste")).toBeTruthy();
      const contentStyle = StyleSheet.flatten(content.props.style);
      expect(contentStyle.gap).toBe(6);
      expect(contentStyle.paddingHorizontal).toBe(16);
      expect(contentStyle.paddingTop).toBe(8);
      expect(contentStyle.paddingBottom).toBe(12);
      const title = within(content).getByText(longTitle);
      expect(StyleSheet.flatten(title.props.style).fontSize).toBe(24);
      expect(StyleSheet.flatten(title.props.style).lineHeight).toBe(28);
      expect(title.props.numberOfLines).toBeUndefined();
      const subtitle = within(content).getByText("Subtítulo de teste");
      expect(StyleSheet.flatten(subtitle.props.style).color).toBe(colors.textInverse);
      expect(subtitle.props.numberOfLines).toBeUndefined();
      const progress = within(content).getByTestId("devotional-progress-label");
      expect(StyleSheet.flatten(progress.props.style).color).toBe(colors.secondary);
      const favoriteStyle = StyleSheet.flatten(
        within(content).getByTestId("devotional-favorite-button").props.style,
      );
      expect(favoriteStyle.width).toBe(48);
      expect(favoriteStyle.height).toBe(48);
      expect(within(frame).getByTestId("devotional-hero-image")).toBeTruthy();
      expect(within(frame).getByTestId("devotional-hero-fade")).toBeTruthy();
      expect(within(content).queryByTestId("devotional-hero-image")).toBeNull();
      expect(within(frame).queryByText(longTitle)).toBeNull();
      expect(within(frame).queryByTestId("devotional-progress-label")).toBeNull();
      expect(within(content).getByTestId("devotional-favorite-button")).toBeTruthy();
      expect(within(content).getByTestId("devotional-progress-label")).toBeTruthy();
      const outerStyle = StyleSheet.flatten(
        view.getByTestId("devotional-hero-card").props.style,
      );
      expect(outerStyle.height).toBeUndefined();
      expect(outerStyle.minHeight).toBeUndefined();
      expect(outerStyle.padding).toBeUndefined();
      expect(outerStyle.gap).toBeUndefined();
    },
  );

  it("keeps the public content readable without an image or an empty visual frame", async () => {
    const { view } = renderDetail();
    await waitFor(() => {
      expect(view.getByText("Em andamento · 0%")).toBeTruthy();
    });
    expect(view.queryByTestId("devotional-hero-frame")).toBeNull();
    expect(view.queryByTestId("devotional-hero-image")).toBeNull();
    expect(view.queryByTestId("devotional-hero-fade")).toBeNull();
    expect(view.queryByTestId("devotional-hero-bottom-fade")).toBeNull();
    expect(
      within(view.getByTestId("devotional-hero-content")).getByText(
        "Devocional de teste",
      ),
    ).toBeTruthy();
  });

  it("joins the artwork to the card with a valid transparent-to-opaque vertical fade", async () => {
    mockedGetRuntimeDevotionalById.mockReturnValue({
      ...runtimeEntry,
      content: {
        ...runtimeEntry.content,
        heroImage: "assets/devotionals/heroes/devotional-samaritana.png",
      },
    } as RuntimeDevotionalEntry);
    const { view } = renderDetail();
    await waitFor(() => {
      expect(view.getByText("Em andamento · 0%")).toBeTruthy();
    });
    const fade = view.UNSAFE_getAllByType(Image).find(
      (image) => image.props.testID === "devotional-hero-fade",
    );
    expect(fade).toBeDefined();
    const png = Buffer.from(
      (fade!.props.source.uri as string).split(",")[1],
      "base64",
    );
    expect(png.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    expect(png.readUInt32BE(16)).toBe(1);
    expect(png.readUInt32BE(20)).toBe(256);
    expect(png[24]).toBe(8);
    expect(png[25]).toBe(6);
    expect(png[28]).toBe(0);
    const idat: Buffer[] = [];
    for (let offset = 8; offset < png.length;) {
      const length = png.readUInt32BE(offset);
      const kind = png.toString("ascii", offset + 4, offset + 8);
      if (kind === "IDAT") {
        idat.push(png.subarray(offset + 8, offset + 8 + length));
      }
      offset += length + 12;
    }
    const pixels = inflateSync(Buffer.concat(idat));
    expect(pixels.length).toBe(256 * 5);
    const rgb = [1, 3, 5].map((offset) =>
      Number.parseInt(colors.primary.slice(offset, offset + 2), 16),
    );
    let previousAlpha = 0;
    for (let row = 0; row < 256; row++) {
      const offset = row * 5;
      expect(pixels[offset]).toBe(0);
      expect(Array.from(pixels.subarray(offset + 1, offset + 4))).toEqual(rgb);
      expect(pixels[offset + 4]).toBeGreaterThanOrEqual(previousAlpha);
      previousAlpha = pixels[offset + 4];
    }
    expect(pixels[4]).toBe(0);
    expect(pixels[pixels.length - 1]).toBe(255);
  });

});
