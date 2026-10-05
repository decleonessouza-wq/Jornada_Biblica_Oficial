import {
  act,
  fireEvent,
  render,
  waitFor,
  within,
} from "@testing-library/react-native";
import { readFileSync } from "fs";
import { join } from "path";
import React from "react";

const mockStudyProgressList = jest.fn();
const mockStudyProgressOpen = jest.fn();
const mockStudyProgressRecordSectionOpened = jest.fn();
const mockStudyProgressComplete = jest.fn();
const mockStudyProgressUncomplete = jest.fn();

jest.mock("../src/services/personalPlatformHub", () => ({
  getPersonalPlatformHub: () => ({
    studyProgressService: {
      list: mockStudyProgressList,
      openStudy: mockStudyProgressOpen,
      recordSectionOpened: mockStudyProgressRecordSectionOpened,
      completeStudy: mockStudyProgressComplete,
      uncompleteStudy: mockStudyProgressUncomplete,
    },
  }),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useFocusEffect: jest.fn(),
}));

jest.mock("react-native-safe-area-context", () => ({
  ...jest.requireActual("react-native-safe-area-context"),
  useSafeAreaInsets: () => ({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }),
}));

jest.mock("../src/navigation/AppShellChromeContext", () => ({
  useAppShellChrome: () => ({
    chromeProgress: { value: 0 },
    handleScroll: jest.fn(),
    resetChrome: jest.fn(),
  }),
}));

import { devotionalRuntimeCatalog } from "../src/devotionals/runtime/devotionalRuntimeCatalog";
import StudiesScreen, {
  shouldExposeStudyTrackPresentation,
} from "../src/screens/StudiesScreen";
import StudyDetailScreen from "../src/screens/StudyDetailScreen";
import StudyTrackScreen, {
  getStudyTrackEmptyStateCopy,
} from "../src/screens/StudyTrackScreen";
import { studyTrackPresentationCatalog } from "../src/studies/presentation/studyTrackPresentationCatalog";
import {
  resolveRuntimeStudyBibleLinks,
  resolveRuntimeStudyBibleReading,
} from "../src/studies/runtime/studyBibleReferenceResolver";
import {
  resolveRuntimeStudyJournalContext,
} from "../src/studies/runtime/studyJournalContextResolver";
import {
  getRuntimeStudyReferences,
  getRuntimeStudySections,
  studyRuntimeCatalog,
} from "../src/studies/runtime/studyRuntimeCatalog";

const root = process.cwd();
const read = (relativePath: string): string =>
  readFileSync(join(root, relativePath), "utf8");

const countRuntimeStudies = (trackId: string): number =>
  studyRuntimeCatalog.studies.filter(
    (entry) => entry.content.trackId === trackId,
  ).length;

const getRuntimeTrack = (trackId: string) =>
  studyRuntimeCatalog.tracks.find(
    (track) => track.id === trackId,
  ) ?? null;

const APPROVED_DESCRIPTIONS = {
  "track-01":
    "Da criação à nova terra: entenda o plano de Deus para salvar o homem.",
  "track-02":
    "Descubra quem Deus é por meio de Seus atributos, caráter e fidelidade.",
  "track-03":
    "Conheça a pessoa, obra, ensino, cruz, ressurreição e reino de Jesus.",
  "track-04":
    "Aprenda como viver a fé no dia a dia com transformação, oração e santidade.",
  "track-05":
    "Conteúdos produzidos por irmãos da igreja, revisados e aprovados para edificação.",
  "track-06":
    "Temas atuais e sensíveis para fortalecer a vida espiritual à luz da Bíblia.",
} as const;
const resolveExpectedDescription = (
  trackId: keyof typeof APPROVED_DESCRIPTIONS,
  title: string,
  runtimeDescription: string,
): string => {
  const normalizedTitle = title.trim().toLocaleLowerCase("pt-BR");
  const normalizedDescription = runtimeDescription
    .trim()
    .toLocaleLowerCase("pt-BR");

  const runtimeIsDescriptive =
    normalizedDescription.length >= 36 &&
    normalizedDescription !== normalizedTitle;

  return runtimeIsDescriptive
    ? runtimeDescription.trim()
    : APPROVED_DESCRIPTIONS[trackId];
};

function createNavigationMock() {
  const parentNavigate = jest.fn();

  return {
    navigation: {
      navigate: jest.fn(),
      setOptions: jest.fn(),
      canGoBack: jest.fn(() => false),
      goBack: jest.fn(),
      getParent: jest.fn(() => ({
        navigate: parentNavigate,
      })),
    },
    parentNavigate,
  };
}

const mockUseFocusEffect =
  jest.requireMock("@react-navigation/native")
    .useFocusEffect as jest.Mock;

function runLatestFocusEffect(): void {
  const latestCall =
    mockUseFocusEffect.mock.calls[
      mockUseFocusEffect.mock.calls.length - 1
    ];
  const effect = latestCall?.[0] as
    | (() => void | (() => void))
    | undefined;

  if (!effect) {
    throw new Error("STUDIES_TEST_FOCUS_EFFECT_MISSING");
  }

  act(() => {
    effect();
  });
}

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

describe("Studies visual/runtime screen contract", () => {
  beforeEach(() => {
    mockUseFocusEffect.mockClear();
    mockStudyProgressList.mockReset();
    mockStudyProgressOpen.mockReset();
    mockStudyProgressRecordSectionOpened.mockReset();
    mockStudyProgressComplete.mockReset();
    mockStudyProgressUncomplete.mockReset();

    mockStudyProgressList.mockResolvedValue([]);
    mockStudyProgressOpen.mockImplementation(
      async (studyId: string) => ({
        studyId,
        state: "IN_PROGRESS",
        lastSectionKey: null,
        readingProgress: 0,
        startedAt: "2026-09-23T10:00:00.000Z",
        lastOpenedAt: "2026-09-23T10:00:00.000Z",
        completedAt: null,
      }),
    );
  });
  it("resets shell chrome on focus and fills compact framed media", () => {
    const studiesSource = read("src/screens/StudiesScreen.tsx");

    expect(studiesSource).toContain(
      'import { useFocusEffect } from "@react-navigation/native";',
    );
    expect(studiesSource).toContain(
      'import { useAppShellChrome } from "../navigation/AppShellChromeContext";',
    );
    expect(studiesSource).toContain(
      "const { resetChrome } = useAppShellChrome();",
    );
    expect(studiesSource).toMatch(
      /useFocusEffect\([\s\S]*?resetChrome\(\);[\s\S]*?\[resetChrome\]/,
    );
    expect(studiesSource).toContain("const CARD_HEIGHT = 136;");
    expect(studiesSource).toContain("const CARD_IMAGE_WIDTH = 148;");
    expect(studiesSource).toContain("const CARD_IMAGE_HEIGHT = 96;");
    expect(studiesSource).toContain(
      "source={presentation.assets.card}",
    );
    expect(studiesSource).toContain("borderRadius: 13,");
    expect(studiesSource).toContain("borderRadius: 14,");
    expect(studiesSource).toContain("elevation: 3,");
    expect(studiesSource).toContain("shadowOpacity: 0.14,");
    expect(studiesSource).toContain('flexWrap: "nowrap"');
    expect(studiesSource).toContain("minWidth: 0,");
    expect(studiesSource).toContain('overflow: "hidden"');
    expect(studiesSource).toContain('resizeMode="cover"');
    expect(studiesSource).not.toContain("minHeight: 148");
  });

  it("provides back with HomeTab fallback and a functional header search", async () => {
    const { navigation, parentNavigate } =
      createNavigationMock();

    const view = render(
      <StudiesScreen
        navigation={navigation as never}
        route={{
          key: "studies-header-actions-test",
          name: "StudiesHome",
        }}
      />,
    );

    expect(navigation.setOptions).toHaveBeenCalled();

    const initialOptions =
      navigation.setOptions.mock.calls[
        navigation.setOptions.mock.calls.length - 1
      ]?.[0] as {
        headerLeft?: () => React.ReactElement;
        headerRight?: () => React.ReactElement;
      };

    expect(initialOptions.headerLeft).toBeDefined();
    expect(initialOptions.headerRight).toBeDefined();

    const backHeader = render(initialOptions.headerLeft!());
    fireEvent.press(
      backHeader.getByTestId("studies-header-back"),
    );

    expect(navigation.canGoBack).toHaveBeenCalled();
    expect(navigation.goBack).not.toHaveBeenCalled();
    expect(parentNavigate).toHaveBeenCalledWith("HomeTab");

    const searchHeader = render(initialOptions.headerRight!());
    fireEvent.press(
      searchHeader.getByTestId("studies-header-search"),
    );

    const input = view.getByTestId("studies-search-input");
    expect(input).toBeTruthy();

    act(() => {
      input.props.onChangeText("Jesus");
    });

    await waitFor(() => {
      expect(view.getByTestId("study-track-track-03")).toBeTruthy();
      expect(view.queryByTestId("study-track-track-01")).toBeNull();
      expect(view.queryByTestId("study-track-track-02")).toBeNull();
    });
  });

  it("renders filter icons for every categorized chip", () => {
    const { navigation } = createNavigationMock();
    const view = render(
      <StudiesScreen
        navigation={navigation as never}
        route={{
          key: "studies-filter-icons-test",
          name: "StudiesHome",
        }}
      />,
    );

    expect(
      view.getByTestId("studies-filter-icon-beginner"),
    ).toBeTruthy();
    expect(
      view.getByTestId("studies-filter-icon-christian_life"),
    ).toBeTruthy();
    expect(
      view.getByTestId("studies-filter-icon-devotional"),
    ).toBeTruthy();
    expect(
      view.getByTestId("studies-filter-icon-collaborative"),
    ).toBeTruthy();
  });

  it("renders exactly the six public tracks from runtime-safe data", () => {
    const { navigation } = createNavigationMock();
    const view = render(
      <StudiesScreen
        navigation={navigation as never}
        route={{
          key: "studies-home-test",
          name: "StudiesHome",
        }}
      />,
    );

    expect(studyTrackPresentationCatalog).toHaveLength(6);

    for (const track of studyTrackPresentationCatalog) {
      const runtimeTrack = getRuntimeTrack(track.trackId);
      const runtimeStudyCount = countRuntimeStudies(track.trackId);
      const runtimeCount =
        runtimeStudyCount +
        (track.trackId === "track-05"
          ? devotionalRuntimeCatalog.devotionals.filter(
              ({ content }) => content.placement === "TRACK_05",
            ).length
          : 0);
      const countNoun =
        track.trackId === "track-05"
          ? runtimeCount === 1
            ? "conteúdo"
            : "conteúdos"
          : runtimeCount === 1
            ? "estudo"
            : "estudos";
      const card = view.getByTestId(
        `study-track-${track.trackId}`,
      );
      const cardQueries = within(card);

      expect(runtimeTrack).not.toBeNull();
      expect(card).toBeTruthy();
      expect(
        cardQueries.getAllByText(
          runtimeTrack?.title ?? track.title,
        ).length,
      ).toBeGreaterThan(0);
      expect(
        cardQueries.getByText(
          resolveExpectedDescription(
            track.trackId as keyof typeof APPROVED_DESCRIPTIONS,
            runtimeTrack?.title ?? track.title,
            runtimeTrack?.description ?? "",
          ),
        ),
      ).toBeTruthy();
      expect(
        cardQueries.getByText(
          `▣ ${runtimeCount} ${countNoun}`,
        ),
      ).toBeTruthy();
      expect(
        view.getByTestId(
          `study-track-image-${track.trackId}`,
        ).props.resizeMode,
      ).toBe("cover");
    }

    fireEvent.press(view.getByTestId("study-track-track-05"));
    expect(view.getByTestId("track5-info-sheet")).toBeTruthy();
    expect(navigation.navigate).not.toHaveBeenCalledWith(
      "StudyTrack",
      { trackId: "track-05" },
    );

    fireEvent.press(view.getByTestId("track5-info-continue"));
    expect(navigation.navigate).toHaveBeenCalledWith(
      "StudyTrack",
      { trackId: "track-05" },
    );
  });

  it("filters category chips by the approved public track taxonomy", () => {
    const { navigation } = createNavigationMock();
    const view = render(
      <StudiesScreen
        navigation={navigation as never}
        route={{
          key: "studies-filter-test",
          name: "StudiesHome",
        }}
      />,
    );

    fireEvent.press(
      view.getByTestId("studies-filter-collaborative"),
    );
    expect(view.getByTestId("study-track-track-05")).toBeTruthy();
    expect(view.queryByTestId("study-track-track-01")).toBeNull();

    fireEvent.press(
      view.getByTestId("studies-filter-christian_life"),
    );
    expect(view.getByTestId("study-track-track-04")).toBeTruthy();
    expect(view.queryByTestId("study-track-track-05")).toBeNull();

    fireEvent.press(
      view.getByTestId("studies-filter-devotional"),
    );
    expect(view.getByTestId("study-track-track-06")).toBeTruthy();
    expect(view.queryByTestId("study-track-track-04")).toBeNull();

    fireEvent.press(view.getByTestId("studies-filter-all"));
    for (const track of studyTrackPresentationCatalog) {
      expect(
        view.getByTestId(`study-track-${track.trackId}`),
      ).toBeTruthy();
    }
  });

  it("uses real audience metadata for the Iniciante filter", () => {
    const expectedBeginnerTrackIds =
      studyTrackPresentationCatalog
        .filter((track) =>
          studyRuntimeCatalog.studies.some(
            (entry) =>
              entry.content.trackId === track.trackId &&
              entry.content.audienceLevel === "BEGINNER",
          ),
        )
        .map((track) => track.trackId);

    const { navigation } = createNavigationMock();
    const view = render(
      <StudiesScreen
        navigation={navigation as never}
        route={{
          key: "studies-beginner-filter-test",
          name: "StudiesHome",
        }}
      />,
    );

    fireEvent.press(
      view.getByTestId("studies-filter-beginner"),
    );

    for (const track of studyTrackPresentationCatalog) {
      const card = view.queryByTestId(
        `study-track-${track.trackId}`,
      );

      if (expectedBeginnerTrackIds.includes(track.trackId)) {
        expect(card).toBeTruthy();
      } else {
        expect(card).toBeNull();
      }
    }
  });

  it("renders category labels with distinct visual variants", () => {
    const studiesSource = read("src/screens/StudiesScreen.tsx");

    expect(studiesSource).toContain(
      "categoryBadgeFormation",
    );
    expect(studiesSource).toContain(
      "categoryBadgeChristianLife",
    );
    expect(studiesSource).toContain(
      "categoryBadgeCollaborative",
    );
    expect(studiesSource).toContain(
      "categoryBadgeDevotional",
    );
    expect(studiesSource).toContain(
      'backgroundColor: "#FFF3CF"',
    );
    expect(studiesSource).toContain(
      'backgroundColor: "#E7F6EC"',
    );
    expect(studiesSource).toContain(
      'backgroundColor: "#F0E9FF"',
    );
    expect(studiesSource).toContain(
      'backgroundColor: "#E7F1FB"',
    );
  });

  it("keeps Track 5 visible as an institutional collection when runtime content is empty", () => {
    expect(
      shouldExposeStudyTrackPresentation("track-05", false),
    ).toBe(true);
    expect(
      shouldExposeStudyTrackPresentation("track-05", true),
    ).toBe(true);
    expect(
      shouldExposeStudyTrackPresentation("track-04", false),
    ).toBe(false);

    const studiesSource = read("src/screens/StudiesScreen.tsx");
    expect(studiesSource).toContain(
      "shouldExposeStudyTrackPresentation(",
    );
    expect(studiesSource).toContain(
      "runtimeTrack !== null",
    );
    expect(studiesSource).toContain(
      'runtimeTrack?.title ?? presentation.title',
    );
  });

  it("uses the Track 5 institutional empty state only when its published study list is empty", () => {
    expect(getStudyTrackEmptyStateCopy("track-05")).toEqual({
      title: "Acervo colaborativo em formação",
      message:
        "Novos estudos serão disponibilizados aqui após revisão e aprovação editorial.",
    });
    expect(getStudyTrackEmptyStateCopy("track-04")).toEqual({
      title: "Nenhum estudo disponível",
      message:
        "Ainda não há estudos publicados nesta trilha.",
    });

    const trackSource = read("src/screens/StudyTrackScreen.tsx");
    expect(trackSource).toContain(
      "getStudyTrackEmptyStateCopy(trackId)",
    );
    expect(trackSource).toContain(
      "{emptyStateCopy.title}",
    );
    expect(trackSource).toContain(
      "{emptyStateCopy.message}",
    );
  });

  it("renders all nine published Track 5 studies with their own authors while the zero-state stays dormant", () => {
    const runtimeCount = countRuntimeStudies("track-05");
    expect(runtimeCount).toBe(9);
    const entries = studyRuntimeCatalog.studies.filter(
      (entry) => entry.content.trackId === "track-05",
    );
    const expectedAuthors = [
      "Michael Batista da Silva",
      "Neterson Oliveira de Souza",
      "Adriel Jackson Batista de Oliveira",
      "Eliete Alves",
      "Hélio Nascimento Sousa",
      "Nelson Ramos de Oliveira",
      "Adriel Jackson Batista de Oliveira",
      "Sidinei Rodrigues de Souza",
      "Adriel Jackson Batista de Oliveira",
    ];
    const expectedAuthorMeta = [
      "Presbítero - Rondonópolis/MT",
      "Presbítero/Dirigente de congregação - Pedra Preta/MT",
      "Evangelista - Rondonópolis/MT",
      "Líder do ministério de mulheres - Rondonópolis/MT",
      "Presbítero · Professor de Escola Bíblica - Rondonópolis/MT",
      "Pastor - Rondonópolis/MT",
      "Evangelista - Rondonópolis/MT",
      "Pastor - Rondonópolis/MT",
      "Evangelista - Rondonópolis/MT",
    ];
    expect(entries.map((entry) => entry.content.id)).toEqual(
      Array.from({ length: 9 }, (_, index) =>
        `track-05-study-${String(index + 1).padStart(2, "0")}`,
      ),
    );
    const navigate = jest.fn();
    const view = render(
      <StudyTrackScreen
        navigation={{ navigate } as never}
        route={{
          key: "study-track-five-published-test",
          name: "StudyTrack",
          params: { trackId: "track-05" },
        }}
      />,
    );

    expect(
      view.getByTestId("study-track-runtime-count").props.children,
    ).toEqual([12, " ", "conteúdos"]);
    expect(view.queryByTestId("study-track-empty-state")).toBeNull();
    const devotionals = devotionalRuntimeCatalog.devotionals.filter(
      (entry) => entry.content.placement === "TRACK_05",
    );
    expect(devotionals).toHaveLength(3);
    for (const entry of devotionals) {
      expect(view.getByTestId(`devotional-${entry.content.id}`)).toBeTruthy();
    }
    entries.forEach((entry, index) => {
      const card = view.getByTestId(`study-${entry.content.id}`);
      expect(within(card).getByText(entry.content.title)).toBeTruthy();
      expect(within(view.getByTestId(`study-author-${entry.content.id}`))
        .getByText(`Por ${expectedAuthors[index]}`)).toBeTruthy();
      expect(within(view.getByTestId(`study-author-${entry.content.id}`))
        .getByText(expectedAuthorMeta[index])).toBeTruthy();
      fireEvent.press(card);
      expect(navigate).toHaveBeenNthCalledWith(index + 1, "StudyDetail", {
        studyId: entry.content.id,
      });
    });
  });

  it("renders Track 6 from presentation metadata with only runtime-safe studies", () => {
    const view = render(
      <StudyTrackScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-track-six-test",
          name: "StudyTrack",
          params: { trackId: "track-06" },
        }}
      />,
    );

    const runtimeCount = countRuntimeStudies("track-06");

    expect(view.getByTestId("study-track-screen")).toBeTruthy();
    expect(view.getByTestId("study-track-hero")).toBeTruthy();
    expect(view.getByText("Vida à Luz da Palavra")).toBeTruthy();
    expect(
      view.getByTestId("study-track-runtime-count").props.children,
    ).toEqual([
      runtimeCount,
      " ",
      runtimeCount === 1
        ? "estudo"
        : "estudos",
    ]);

    if (runtimeCount === 0) {
      expect(
        view.getByTestId("study-track-empty-state"),
      ).toBeTruthy();
    }
  });

  it("reloads StudyProgress on Track focus and renders discreet study states", async () => {
    const studies = studyRuntimeCatalog.studies
      .filter(
        (entry) =>
          entry.content.trackId === "track-01",
      )
      .sort(
        (left, right) =>
          left.content.number - right.content.number,
      );

    expect(studies.length).toBeGreaterThanOrEqual(2);

    const firstStudy = studies[0];
    const secondStudy = studies[1];

    mockStudyProgressList.mockResolvedValue([
      {
        studyId: firstStudy.content.id,
        state: "IN_PROGRESS",
        lastSectionKey: null,
        readingProgress: 45,
        startedAt: null,
        lastOpenedAt: null,
        completedAt: null,
      },
      {
        studyId: secondStudy.content.id,
        state: "COMPLETED",
        lastSectionKey: null,
        readingProgress: 100,
        startedAt: null,
        lastOpenedAt: null,
        completedAt: null,
      },
    ]);

    const view = render(
      <StudyTrackScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-track-progress-test",
          name: "StudyTrack",
          params: { trackId: "track-01" },
        }}
      />,
    );

    runLatestFocusEffect();

    await waitFor(() => {
      expect(mockStudyProgressList).toHaveBeenCalledTimes(1);
      expect(
        view.getByTestId(
          `study-progress-${firstStudy.content.id}`,
        ).props.children,
      ).toBe("Em andamento · 45%");
      expect(
        view.getByTestId(
          `study-progress-${secondStudy.content.id}`,
        ).props.children,
      ).toBe("Concluído");
    });
  });

  it("renders published runtime sections in the study reader without draft imports", () => {
    const studyId = "track-01-study-01";
    const sections = getRuntimeStudySections(studyId);
    const references = getRuntimeStudyReferences(studyId);

    expect(sections.length).toBeGreaterThan(0);
    expect(sections.every((section) => section.studyId === studyId)).toBe(true);
    expect(Array.isArray(references)).toBe(true);

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-detail-runtime-sections-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    expect(view.getByTestId("study-detail-screen")).toBeTruthy();
    expect(view.getByTestId("study-detail-hero")).toBeTruthy();
    expect(view.getByTestId("study-detail-sections")).toBeTruthy();
    expect(
      view.getByTestId(`study-section-${sections[0].id}`),
    ).toBeTruthy();
  });
  it("never renders internal Track 05 EDITORIAL_NOTE content in the public reader", () => {
    const studyId = "track-05-study-01";
    const sections = getRuntimeStudySections(studyId);

    expect(sections.length).toBeGreaterThan(0);
    expect(
      sections.some(
        (section) => section.type === "EDITORIAL_NOTE",
      ),
    ).toBe(false);

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-detail-track05-editorial-note-guard",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    expect(view.queryByText("Nota editorial")).toBeNull();
    expect(view.queryByText(/OBSERVEDDIRECT/)).toBeNull();
    expect(view.queryByText(/Status: DRAFT/)).toBeNull();
  });
  it("opens StudyProgress on focus and expands the saved resume section", async () => {
    const studyId = "track-01-study-01";
    const sections = getRuntimeStudySections(studyId);
    const resumeSection = sections[1] ?? sections[0];

    expect(resumeSection).toBeDefined();

    mockStudyProgressOpen.mockResolvedValue({
      studyId,
      state: "IN_PROGRESS",
      lastSectionKey: resumeSection.id,
      readingProgress: 35,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: null,
    });

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-detail-resume-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    await waitFor(() => {
      expect(mockStudyProgressOpen).toHaveBeenCalledWith(
        studyId,
      );

      const resumedCard = view.getByTestId(
        `study-section-${resumeSection.id}`,
      );
      const resumedToggle =
        within(resumedCard).getByRole("button");

      expect(
        resumedToggle.props.accessibilityState,
      ).toEqual(
        expect.objectContaining({
          expanded: true,
          disabled: false,
        }),
      );
    });
  });

  it("records the opened section with its canonical position without auto-completing", async () => {
    const studyId = "track-01-study-01";
    const sections = getRuntimeStudySections(studyId);
    const section = sections[0];

    expect(section).toBeDefined();

    mockStudyProgressRecordSectionOpened.mockResolvedValue({
      studyId,
      state: "IN_PROGRESS",
      lastSectionKey: section.id,
      readingProgress: 10,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: null,
    });

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-detail-section-progress-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    await waitFor(() => {
      expect(mockStudyProgressOpen).toHaveBeenCalledWith(studyId);

      expect(
        within(
          view.getByTestId(`study-section-${section.id}`),
        ).getByRole("button").props.accessibilityState,
      ).toEqual(
        expect.objectContaining({
          disabled: false,
        }),
      );
    });

    const sectionCard = view.getByTestId(
      `study-section-${section.id}`,
    );

    fireEvent.press(
      within(sectionCard).getByRole("button"),
    );

    await waitFor(() => {
      expect(
        mockStudyProgressRecordSectionOpened,
      ).toHaveBeenCalledWith({
        studyId,
        sectionId: section.id,
        sectionIndex: 0,
        sectionCount: sections.length,
      });
    });

    expect(mockStudyProgressComplete).not.toHaveBeenCalled();
  });

  it("requires explicit completion before exposing Next Study and supports reversible completion", async () => {
    const studyId = "track-01-study-01";
    const runtimeEntry = studyRuntimeCatalog.studies.find(
      (entry) => entry.content.id === studyId,
    );

    expect(runtimeEntry?.content.nextStudyId).toBeTruthy();

    const navigation = { navigate: jest.fn() };

    mockStudyProgressComplete.mockResolvedValue({
      studyId,
      state: "COMPLETED",
      lastSectionKey: null,
      readingProgress: 100,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: "2026-09-23T10:10:00.000Z",
    });

    mockStudyProgressUncomplete.mockResolvedValue({
      studyId,
      state: "IN_PROGRESS",
      lastSectionKey: null,
      readingProgress: 100,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: null,
    });

    const view = render(
      <StudyDetailScreen
        navigation={navigation as never}
        route={{
          key: "study-detail-completion-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    await waitFor(() => {
      expect(mockStudyProgressOpen).toHaveBeenCalledWith(studyId);
      expect(
        view.getByTestId("study-complete-button").props
          .accessibilityState?.disabled,
      ).toBe(false);
    });

    expect(
      view.getByTestId("study-complete-button"),
    ).toBeTruthy();
    expect(
      view.queryByTestId("study-next-button"),
    ).toBeNull();

    fireEvent.press(
      view.getByTestId("study-complete-button"),
    );

    await waitFor(() => {
      expect(mockStudyProgressComplete).toHaveBeenCalledWith(
        studyId,
      );
      expect(
        view.getByTestId("study-completed-state").props.children,
      ).toBe("Estudo concluído");
      expect(
        view.getByTestId("study-next-button"),
      ).toBeTruthy();
      expect(
        view.getByText("Marcar como não concluído"),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByTestId("study-next-button"),
    );

    expect(navigation.navigate).toHaveBeenCalledWith(
      "StudyDetail",
      {
        studyId: runtimeEntry?.content.nextStudyId as string,
      },
    );

    await waitFor(() => {
      expect(
        view.getByTestId("study-uncomplete-button").props
          .accessibilityState?.disabled,
      ).toBe(false);
    });

    fireEvent.press(
      view.getByTestId("study-uncomplete-button"),
    );

    await waitFor(() => {
      expect(
        mockStudyProgressUncomplete,
      ).toHaveBeenCalledWith(studyId);
      expect(
        view.getByTestId("study-complete-button"),
      ).toBeTruthy();
      expect(
        view.queryByTestId("study-next-button"),
      ).toBeNull();
    });
  });

  it("shows a coherent terminal state after explicitly completing the last published study", async () => {
    const terminalEntry = studyRuntimeCatalog.studies.find(
      (entry) => entry.content.nextStudyId === null,
    );

    expect(terminalEntry).toBeDefined();

    const studyId = terminalEntry!.content.id;

    mockStudyProgressComplete.mockResolvedValue({
      studyId,
      state: "COMPLETED",
      lastSectionKey: null,
      readingProgress: 100,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: "2026-09-23T10:10:00.000Z",
    });

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-detail-terminal-completion-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    await waitFor(() => {
      expect(mockStudyProgressOpen).toHaveBeenCalledWith(studyId);
      expect(
        view.getByTestId("study-complete-button").props
          .accessibilityState?.disabled,
      ).toBe(false);
    });

    fireEvent.press(
      view.getByTestId("study-complete-button"),
    );

    await waitFor(() => {
      expect(
        view.getByTestId("study-completed-state").props.children,
      ).toBe("Estudo concluído");
      expect(
        view.getByTestId("study-sequence-end"),
      ).toBeTruthy();
      expect(
        view.queryByTestId("study-next-button"),
      ).toBeNull();
      expect(
        view.getByTestId("study-uncomplete-button"),
      ).toBeTruthy();
    });
  });

  it("keeps progress actions disabled until StudyProgress initialization settles", async () => {
    const studyId = "track-01-study-01";
    const deferred = createDeferred<{
      studyId: string;
      state: "IN_PROGRESS";
      lastSectionKey: null;
      readingProgress: number;
      startedAt: string;
      lastOpenedAt: string;
      completedAt: null;
    }>();

    mockStudyProgressOpen.mockReturnValue(deferred.promise);

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-detail-initialization-gate-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    expect(
      view.getByTestId("study-complete-button").props
        .accessibilityState?.disabled,
    ).toBe(true);

    fireEvent.press(
      view.getByTestId("study-complete-button"),
    );

    expect(mockStudyProgressComplete).not.toHaveBeenCalled();

    await act(async () => {
      deferred.resolve({
        studyId,
        state: "IN_PROGRESS",
        lastSectionKey: null,
        readingProgress: 0,
        startedAt: "2026-09-23T10:00:00.000Z",
        lastOpenedAt: "2026-09-23T10:00:00.000Z",
        completedAt: null,
      });

      await deferred.promise;
    });

    await waitFor(() => {
      expect(
        view.getByTestId("study-complete-button").props
          .accessibilityState?.disabled,
      ).toBe(false);
    });
  });

  it("serializes section progress writes before allowing another persistence action", async () => {
    const studyId = "track-01-study-01";
    const sections = getRuntimeStudySections(studyId);
    const firstSection = sections[0];
    const secondSection = sections[1];

    expect(firstSection).toBeDefined();
    expect(secondSection).toBeDefined();

    const firstWrite = createDeferred<{
      studyId: string;
      state: "IN_PROGRESS";
      lastSectionKey: typeof firstSection.id;
      readingProgress: number;
      startedAt: string;
      lastOpenedAt: string;
      completedAt: null;
    }>();

    mockStudyProgressRecordSectionOpened
      .mockReturnValueOnce(firstWrite.promise)
      .mockResolvedValueOnce({
        studyId,
        state: "IN_PROGRESS",
        lastSectionKey: secondSection.id,
        readingProgress: 20,
        startedAt: "2026-09-23T10:00:00.000Z",
        lastOpenedAt: "2026-09-23T10:05:00.000Z",
        completedAt: null,
      });

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-detail-serialized-progress-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    await waitFor(() => {
      expect(mockStudyProgressOpen).toHaveBeenCalledWith(studyId);

      expect(
        within(
          view.getByTestId(`study-section-${firstSection.id}`),
        ).getByRole("button").props.accessibilityState,
      ).toEqual(
        expect.objectContaining({
          disabled: false,
        }),
      );
    });

    const firstToggle = within(
      view.getByTestId(`study-section-${firstSection.id}`),
    ).getByRole("button");
    const secondToggle = within(
      view.getByTestId(`study-section-${secondSection.id}`),
    ).getByRole("button");

    fireEvent.press(firstToggle);

    expect(
      mockStudyProgressRecordSectionOpened,
    ).toHaveBeenCalledTimes(1);

    fireEvent.press(secondToggle);

    expect(
      mockStudyProgressRecordSectionOpened,
    ).toHaveBeenCalledTimes(1);
    expect(mockStudyProgressComplete).not.toHaveBeenCalled();

    await act(async () => {
      firstWrite.resolve({
        studyId,
        state: "IN_PROGRESS",
        lastSectionKey: firstSection.id,
        readingProgress: 10,
        startedAt: "2026-09-23T10:00:00.000Z",
        lastOpenedAt: "2026-09-23T10:05:00.000Z",
        completedAt: null,
      });

      await firstWrite.promise;
    });

    await waitFor(() => {
      expect(
        within(
          view.getByTestId(`study-section-${secondSection.id}`),
        ).getByRole("button").props.accessibilityState,
      ).toEqual(
        expect.objectContaining({
          disabled: false,
        }),
      );
    });

    fireEvent.press(
      within(
        view.getByTestId(`study-section-${secondSection.id}`),
      ).getByRole("button"),
    );

    await waitFor(() => {
      expect(
        mockStudyProgressRecordSectionOpened,
      ).toHaveBeenCalledTimes(2);
    });
  });

  it("fails closed for unknown track and unknown study ids", () => {
    const trackView = render(
      <StudyTrackScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-track-missing-test",
          name: "StudyTrack",
          params: { trackId: "runtime-missing-track" },
        }}
      />,
    );

    expect(
      trackView.getByTestId("study-track-not-found"),
    ).toBeTruthy();

    const studyView = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        route={{
          key: "study-detail-missing-test",
          name: "StudyDetail",
          params: { studyId: "runtime-missing-study" },
        }}
      />,
    );

    expect(
      studyView.getByTestId("study-detail-not-found"),
    ).toBeTruthy();
  });


  it("wires Study Bible opening through the root JourneyBibleReader route", () => {
    const navigatorSource = read(
      "src/navigation/StudiesNavigator.tsx",
    );

    expect(navigatorSource).toContain(
      "loadPreferredOfflineBibleVersion",
    );
    expect(navigatorSource).toContain(
      "getJourneyBibleReaderRouteForReference",
    );
    expect(navigatorSource).toContain("passageIndex: 0");
    expect(navigatorSource).toContain(
      'navigation.navigate(\n          "JourneyBibleReader",\n          route.routeParams,\n        )',
    );
    expect(navigatorSource).toContain(
      "onOpenBibleReference={",
    );
    expect(navigatorSource).toContain(
      "handleOpenBibleReference",
    );
  });

  it("opens the resolved Bible reading from StudyDetail without changing editorial content", async () => {
    const studyId = "track-02-study-01";
    const sections = getRuntimeStudySections(studyId);
    const bibleSection = sections.find(
      (section) => section.type === "BIBLE_READING",
    );
    const resolution =
      resolveRuntimeStudyBibleReading(studyId);

    expect(bibleSection).toBeDefined();
    expect(resolution.ok).toBe(true);

    if (!bibleSection || !resolution.ok) {
      throw new Error(
        "STUDY_BIBLE_READING_TEST_FIXTURE_UNAVAILABLE",
      );
    }

    mockStudyProgressRecordSectionOpened.mockResolvedValue({
      studyId,
      state: "IN_PROGRESS",
      lastSectionKey: bibleSection.id,
      readingProgress: 10,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: null,
    });

    const onOpenBibleReference = jest.fn(
      async () => undefined,
    );

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        onOpenBibleReference={onOpenBibleReference}
        route={{
          key: "study-detail-bible-reading-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    const sectionCard = view.getByTestId(
      `study-section-${bibleSection.id}`,
    );
    const sectionToggle =
      within(sectionCard).getByRole("button");

    await waitFor(() => {
      expect(
        sectionToggle.props.accessibilityState?.disabled,
      ).toBe(false);
    });

    fireEvent.press(sectionToggle);

    await waitFor(() => {
      expect(
        view.getByTestId("study-open-bible-button"),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByTestId("study-open-bible-button"),
    );

    await waitFor(() => {
      expect(onOpenBibleReference).toHaveBeenCalledTimes(1);
      expect(onOpenBibleReference).toHaveBeenCalledWith(
        resolution.reference,
      );
    });

    expect(
      getRuntimeStudySections(studyId),
    ).toEqual(sections);
  });

  it("opens multiple inline Bible references from Track 1 without requiring BIBLE_READING", async () => {
    const studyId = "track-01-study-02";
    const sections = getRuntimeStudySections(studyId);
    const keepSection = sections.find(
      (section) => section.type === "KEEP",
    );
    const links = resolveRuntimeStudyBibleLinks(studyId);

    const firstReference = links.find(
      (link) =>
        link.sectionId === keepSection?.id &&
        link.canonicalText === "Romanos 5:12",
    );
    const secondReference = links.find(
      (link) =>
        link.sectionId === keepSection?.id &&
        link.canonicalText === "Romanos 5:18-19",
    );

    expect(keepSection).toBeDefined();
    expect(firstReference).toBeDefined();
    expect(secondReference).toBeDefined();

    if (
      !keepSection ||
      !firstReference ||
      !secondReference
    ) {
      throw new Error(
        "TRACK1_INLINE_BIBLE_LINK_FIXTURE_UNAVAILABLE",
      );
    }

    const before = JSON.stringify(sections);

    mockStudyProgressRecordSectionOpened.mockResolvedValue({
      studyId,
      state: "IN_PROGRESS",
      lastSectionKey: keepSection.id,
      readingProgress: 80,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: null,
    });

    const onOpenBibleReference = jest.fn(
      async () => undefined,
    );

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        onOpenBibleReference={onOpenBibleReference}
        route={{
          key: "study-detail-track1-inline-bible-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    const sectionCard = view.getByTestId(
      `study-section-${keepSection.id}`,
    );
    const sectionToggle =
      within(sectionCard).getByRole("button");

    await waitFor(() => {
      expect(
        sectionToggle.props.accessibilityState?.disabled,
      ).toBe(false);
    });

    fireEvent.press(sectionToggle);

    const firstLink = await view.findByLabelText(
      "Abrir Romanos 5:12 na Bíblia",
    );
    const secondLink = await view.findByLabelText(
      "Abrir Romanos 5:18-19 na Bíblia",
    );

    fireEvent.press(firstLink);

    await waitFor(() => {
      expect(onOpenBibleReference).toHaveBeenCalledTimes(1);
      expect(onOpenBibleReference).toHaveBeenLastCalledWith(
        firstReference.reference,
      );
    });

    await waitFor(() => {
      expect(
        view.getByLabelText(
          "Abrir Romanos 5:18-19 na Bíblia",
        ).props.accessibilityState?.disabled,
      ).toBe(false);
    });

    fireEvent.press(secondLink);

    await waitFor(() => {
      expect(onOpenBibleReference).toHaveBeenCalledTimes(2);
      expect(onOpenBibleReference).toHaveBeenLastCalledWith(
        secondReference.reference,
      );
    });

    expect(JSON.stringify(getRuntimeStudySections(studyId))).toBe(
      before,
    );
  });

  it("opens each same-chapter shorthand passage as an individual inline Bible target", async () => {
    const studyId = "track-02-study-01";
    const sections = getRuntimeStudySections(studyId);
    const bibleSection = sections.find(
      (section) => section.type === "BIBLE_READING",
    );
    const links = resolveRuntimeStudyBibleLinks(studyId);

    const firstReference = links.find(
      (link) =>
        link.sectionId === bibleSection?.id &&
        link.canonicalText === "Gênesis 1:1-5",
    );
    const secondReference = links.find(
      (link) =>
        link.sectionId === bibleSection?.id &&
        link.canonicalText === "Gênesis 1:26-31",
    );

    expect(bibleSection).toBeDefined();
    expect(firstReference).toBeDefined();
    expect(secondReference).toBeDefined();

    if (
      !bibleSection ||
      !firstReference ||
      !secondReference
    ) {
      throw new Error(
        "SAME_CHAPTER_INLINE_BIBLE_LINK_FIXTURE_UNAVAILABLE",
      );
    }

    mockStudyProgressRecordSectionOpened.mockResolvedValue({
      studyId,
      state: "IN_PROGRESS",
      lastSectionKey: bibleSection.id,
      readingProgress: 10,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: null,
    });

    const onOpenBibleReference = jest.fn(
      async () => undefined,
    );

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        onOpenBibleReference={onOpenBibleReference}
        route={{
          key: "study-detail-same-chapter-inline-bible-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    const sectionCard = view.getByTestId(
      `study-section-${bibleSection.id}`,
    );
    const sectionToggle =
      within(sectionCard).getByRole("button");

    await waitFor(() => {
      expect(
        sectionToggle.props.accessibilityState?.disabled,
      ).toBe(false);
    });

    fireEvent.press(sectionToggle);

    const firstLink = await view.findByLabelText(
      "Abrir Gênesis 1:1-5 na Bíblia",
    );
    const secondLink = await view.findByLabelText(
      "Abrir Gênesis 1:26-31 na Bíblia",
    );

    expect(firstLink).toBeTruthy();
    expect(secondLink).toBeTruthy();

    fireEvent.press(secondLink);

    await waitFor(() => {
      expect(onOpenBibleReference).toHaveBeenCalledTimes(1);
      expect(onOpenBibleReference).toHaveBeenCalledWith(
        secondReference.reference,
      );
    });
  });
  it("applies the V4 global visual hierarchy without changing Study editorial content", () => {
    const detailSource = read(
      "src/screens/StudyDetailScreen.tsx",
    );

    expect(detailSource).toContain(
      "const SECTION_VISUAL_TONES",
    );
    expect(detailSource).toContain(
      'BIBLE_READING: "SCRIPTURE"',
    );
    expect(detailSource).toContain(
      'CONNECT: "CONNECTION"',
    );
    expect(detailSource).toContain(
      'REFLECT: "REFLECTION"',
    );
    expect(detailSource).toContain(
      'APPLY: "PRACTICE"',
    );
    expect(detailSource).toContain(
      'JOURNEY_TAKEAWAY: "TAKEAWAY"',
    );
    expect(detailSource).toContain(
      'INTERPRETATION_CAUTION: "CAUTION"',
    );
    expect(detailSource).toContain(
      'REFERENCES: "REFERENCE"',
    );

    expect(detailSource).toContain(
      "styles.sectionCardScripture",
    );
    expect(detailSource).toContain(
      "styles.sectionTogglePractice",
    );
    expect(detailSource).toContain(
      "styles.sectionToggleReflection",
    );
    expect(detailSource).toContain(
      "styles.sectionToggleConnection",
    );

    expect(detailSource).toContain(
      "lineHeight: 24,",
    );
    expect(detailSource).toContain(
      'backgroundColor: "#FFF9E8"',
    );
    expect(detailSource).toContain(
      "borderLeftWidth: 4,",
    );

    expect(detailSource).toContain(
      "renderStudyBibleLinkedText",
    );
    expect(detailSource).toContain(
      'testID="study-open-bible-button"',
    );
    expect(detailSource).toContain(
      "getRuntimeStudySections(content.id)",
    );
    expect(detailSource).toContain(
      "buildStudyDisplayBlocks({",
    );
    expect(detailSource).toContain(
      "splitStudyObjectiveForDisplay(",
    );
    expect(detailSource).toContain(
      'content.trackId !== "track-06"',
    );
    expect(detailSource).not.toContain(
      "section.blocks.map((block, blockIndex)",
    );
  });
  it("opens the resolved Study journal context without changing editorial content", async () => {
    const studyId = "track-02-study-01";
    const sections = getRuntimeStudySections(studyId);
    const journalSection = sections.find(
      (section) => section.type === "JOURNAL_PROMPT",
    );
    const resolution =
      resolveRuntimeStudyJournalContext(studyId);

    expect(journalSection).toBeDefined();
    expect(resolution.ok).toBe(true);

    if (!journalSection || !resolution.ok) {
      throw new Error(
        "STUDY_JOURNAL_CONTEXT_TEST_FIXTURE_UNAVAILABLE",
      );
    }

    mockStudyProgressRecordSectionOpened.mockResolvedValue({
      studyId,
      state: "IN_PROGRESS",
      lastSectionKey: journalSection.id,
      readingProgress: 80,
      startedAt: "2026-09-23T10:00:00.000Z",
      lastOpenedAt: "2026-09-23T10:05:00.000Z",
      completedAt: null,
    });

    const onOpenJournalContext = jest.fn(
      async () => undefined,
    );

    const view = render(
      <StudyDetailScreen
        navigation={{ navigate: jest.fn() } as never}
        onOpenJournalContext={onOpenJournalContext}
        route={{
          key: "study-detail-journal-test",
          name: "StudyDetail",
          params: { studyId },
        }}
      />,
    );

    runLatestFocusEffect();

    const sectionCard = view.getByTestId(
      `study-section-${journalSection.id}`,
    );
    const sectionToggle =
      within(sectionCard).getByRole("button");

    await waitFor(() => {
      expect(
        sectionToggle.props.accessibilityState?.disabled,
      ).toBe(false);
    });

    fireEvent.press(sectionToggle);

    await waitFor(() => {
      expect(
        view.getByTestId("study-open-journal-button"),
      ).toBeTruthy();
    });

    fireEvent.press(
      view.getByTestId("study-open-journal-button"),
    );

    await waitFor(() => {
      expect(onOpenJournalContext).toHaveBeenCalledTimes(1);
      expect(onOpenJournalContext).toHaveBeenCalledWith({
        sourceType: "STUDY",
        trackId: resolution.trackId,
        studyId: resolution.studyId,
        sourceTitleSnapshot:
          resolution.sourceTitleSnapshot,
        promptSnapshot:
          resolution.promptSnapshot,
      });
    });

    const navigatorSource = read(
      "src/navigation/StudiesNavigator.tsx",
    );

    expect(navigatorSource).toContain(
      'navigation.navigate("Journal", {',
    );
    expect(navigatorSource).toContain(
      'screen: "JournalEntryEditor"',
    );
    expect(navigatorSource).toContain(
      "onOpenJournalContext={",
    );

    expect(
      getRuntimeStudySections(studyId),
    ).toEqual(sections);
  });

  it("keeps presentation identity separate from runtime study eligibility", () => {
    const studiesSource = read("src/screens/StudiesScreen.tsx");
    const trackSource = read("src/screens/StudyTrackScreen.tsx");
    const detailSource = read("src/screens/StudyDetailScreen.tsx");
    const combined = `${studiesSource}\n${trackSource}\n${detailSource}`;

    expect(studiesSource).toContain(
      "studyTrackPresentationCatalog",
    );
    expect(studiesSource).toContain(
      "studyRuntimeCatalog.tracks.find",
    );
    expect(studiesSource).toContain("studyRuntimeCatalog.studies");
    expect(studiesSource).toContain("presentation.assets.card");
    expect(studiesSource).toContain(
      'runtimeTrack?.description ?? ""',
    );
    expect(studiesSource).toContain(
      "resolveTrackDescription",
    );
    expect(studiesSource).toContain(
      "getTrackPresentationCategory",
    );

    expect(trackSource).toContain(
      "studyTrackPresentationCatalog.find",
    );
    expect(trackSource).toContain(
      "entry.content.trackId === trackId",
    );
    expect(trackSource).toContain("presentation.assets.libraryHeader");
    expect(trackSource).toContain("onScroll={handleScroll}");
    expect(trackSource).toContain("scrollEventThrottle={16}");
    expect(trackSource).toContain('testID="study-track-scroll-header"');
    expect(trackSource).toContain("studyId: entry.content.id");
    expect(trackSource).toContain(
      "personalPlatformHub.studyProgressService",
    );
    expect(trackSource).toContain(
      "getStudyProgressLabel(progress)",
    );

    expect(detailSource).toContain(
      "getRuntimeStudyById(route.params.studyId)",
    );
    expect(detailSource).toContain("entry.publicAuthorDisplayName");
    expect(detailSource).toContain("content.nextStudyId");
    expect(detailSource).toContain(
      "studyIconAssetManifest.perguntaCentral",
    );
    expect(detailSource).toContain(
      "studyIconAssetManifest.objetivo",
    );
    expect(detailSource).toContain("studyTrackPresentationCatalog.find");
    expect(detailSource).toContain("presentation.assets.trackHero");
    expect(detailSource).toContain("onScroll={handleScroll}");
    expect(detailSource).toContain("scrollEventThrottle={16}");
    expect(detailSource).toContain('testID="study-detail-scroll-header"');
    expect(detailSource).toContain("hero_navy_fade.png");
    expect(detailSource).toContain('testID="study-detail-summary"');
    expect(detailSource).toContain('testID="study-detail-theme"');
    expect(detailSource).toContain('testID="study-detail-central-question"');
    expect(detailSource).toContain('testID="study-detail-objective"');
    expect(detailSource).toContain("getRuntimeStudySections(content.id)");
    expect(detailSource).toContain("getRuntimeStudyReferences(content.id)");
    expect(detailSource).toContain(
      "const personalPlatformHub = getPersonalPlatformHub();",
    );
    expect(detailSource).toContain(
      "personalPlatformHub.studyProgressService",
    );
    expect(detailSource).toContain(
      "personalPlatformHub.favoritesService",
    );
    expect(detailSource).toContain(
      ".recordSectionOpened({",
    );
    expect(detailSource).toContain(
      ".completeStudy(",
    );
    expect(detailSource).toContain(
      ".uncompleteStudy(",
    );
    expect(detailSource).toContain(
      "progressMutationLockRef.current",
    );
    expect(detailSource).toContain(
      "progressInteractionDisabled",
    );

    expect(combined).not.toContain("expo-sqlite");
    expect(combined).not.toContain("personal_study_progress");
    expect(combined).not.toContain("../studies/content/");
    expect(combined).not.toContain("DraftBatch");
    expect(combined).not.toContain("track05Study01Draft");
    expect(combined).not.toContain("Michael Batista da Silva");
    expect(combined).not.toMatch(/track-05-study-0[2-9]/);
    expect(combined).not.toMatch(
      /\b(?:lorem ipsum|conteúdo fictício|texto fictício|estudo fictício|conteúdo de exemplo|texto de exemplo)\b/i,
    );
    expect(detailSource).toContain(
      'require("../../assets/home/overlays/hero_navy_fade.png")',
    );
    expect(combined).not.toMatch(/require\s*\([^)]*studies\/content/i);
  });

  it("derives every library count from runtime Studies plus published Track 5 Devotionals", () => {
    const { navigation } = createNavigationMock();
    const view = render(
      <StudiesScreen
        navigation={navigation as never}
        route={{
          key: "studies-count-test",
          name: "StudiesHome",
        }}
      />,
    );
    const studiesSource = read("src/screens/StudiesScreen.tsx");

    for (const track of studyTrackPresentationCatalog) {
      const studyCount = countRuntimeStudies(track.trackId);
      const runtimeCount =
        studyCount +
        (track.trackId === "track-05"
          ? devotionalRuntimeCatalog.devotionals.filter(
              ({ content }) => content.placement === "TRACK_05",
            ).length
          : 0);
      const noun =
        track.trackId === "track-05"
          ? runtimeCount === 1
            ? "conteúdo"
            : "conteúdos"
          : runtimeCount === 1
            ? "estudo"
            : "estudos";
      const card = view.getByTestId(
        `study-track-${track.trackId}`,
      );

      expect(
        within(card).getByText(
          `▣ ${runtimeCount} ${noun}`,
        ),
      ).toBeTruthy();
    }

    expect(studiesSource).toContain(
      "devotionalRuntimeCatalog.devotionals.filter(",
    );
    expect(studiesSource).not.toMatch(/studyCount\s*:\s*\d+/);
    expect(studiesSource).not.toMatch(/\b4\s+conteúdos\b/i);
    expect(studiesSource).not.toMatch(/\b18 estudos\b/i);
    expect(studiesSource).not.toMatch(/\b19 estudos\b/i);
  });

  it("supports long titles and Dynamic Type without essential hero/card truncation", () => {
    const studiesSource = read("src/screens/StudiesScreen.tsx");
    const trackSource = read("src/screens/StudyTrackScreen.tsx");
    const detailSource = read("src/screens/StudyDetailScreen.tsx");

    expect(studiesSource).toContain(
      "<Text style={styles.cardTitle}>",
    );
    expect(studiesSource).not.toContain(
      "height: CARD_HEIGHT,",
    );
    expect(studiesSource).toContain(
      "minHeight: CARD_HEIGHT,",
    );

    expect(trackSource).toContain(
      "<Text style={styles.title}>",
    );
    expect(trackSource).not.toContain(
      '<Text numberOfLines={2} style={styles.title}>',
    );
    expect(trackSource).toContain("minHeight: 252,");

    expect(detailSource).toContain(
      "<Text style={styles.heroTitle}>",
    );
    expect(detailSource).not.toContain(
      "adjustsFontSizeToFit",
    );
    expect(detailSource).not.toContain(
      "minimumFontScale={0.82}",
    );
    expect(detailSource).not.toContain(
      "numberOfLines={2}\n                style={styles.heroTitle}",
    );
    expect(detailSource).toContain("minHeight: 176,");
    expect(
      [studiesSource, trackSource, detailSource].join("\n"),
    ).not.toContain("allowFontScaling={false}");
  });

  it("virtualizes only the study list while preserving scroll-driven shell behavior", () => {
    const studiesSource = read("src/screens/StudiesScreen.tsx");
    const trackSource = read("src/screens/StudyTrackScreen.tsx");
    const detailSource = read("src/screens/StudyDetailScreen.tsx");

    expect(trackSource).toContain("FlatList,");
    expect(trackSource).toContain("<FlatList");
    expect(trackSource).toContain("data={studies}");
    expect(trackSource).toContain(
      "keyExtractor={(entry) => entry.content.id}",
    );
    expect(trackSource).toContain(
      "ListHeaderComponent={",
    );
    expect(trackSource).toContain(
      "ListEmptyComponent={",
    );
    expect(trackSource).toContain(
      "renderItem={({ item: entry }) => {",
    );
    expect(trackSource).toContain(
      "onScroll={handleScroll}",
    );
    expect(trackSource).toContain(
      "scrollEventThrottle={16}",
    );
    expect(trackSource).not.toContain("<ScrollView");
    expect(trackSource).not.toContain("studies.map");

    expect(studiesSource).toContain("<ScrollView");
    expect(studiesSource).not.toContain("<FlatList");
    expect(detailSource).toContain("<ScrollView");
    expect(detailSource).not.toContain("<FlatList");
  });

  it("locks P14 touch targets, contrast, decorative image semantics and accordion accessibility", () => {
    const studiesSource = read("src/screens/StudiesScreen.tsx");
    const trackSource = read("src/screens/StudyTrackScreen.tsx");
    const detailSource = read("src/screens/StudyDetailScreen.tsx");

    expect(studiesSource).toMatch(
      /searchRow: \{[^}]*minHeight: 48,/s,
    );
    expect(studiesSource).toMatch(
      /searchInput: \{[^}]*minHeight: 48,/s,
    );
    expect(studiesSource).toMatch(
      /filterChip: \{[^}]*minHeight: 48,/s,
    );
    expect(detailSource).toMatch(
      /favoriteHeartButton: \{[^}]*height: 48,[^}]*width: 48,/s,
    );
    expect(detailSource).toMatch(
      /bibleReadingButton: \{[^}]*minHeight: 48,/s,
    );
    expect(detailSource).toMatch(
      /keepFavoriteButton: \{[^}]*minHeight: 48,/s,
    );
    expect(detailSource).toMatch(
      /uncompleteButton: \{[^}]*minHeight: 48,/s,
    );
    expect(detailSource).toMatch(
      /nextButton: \{[^}]*minHeight: 48,/s,
    );

    expect(studiesSource).toContain(
      "filterChipTextSelected: {\n    color: colors.textStrong,",
    );
    expect(studiesSource).toContain(
      "categoryBadgeTextFormation: {\n    color: colors.textStrong,",
    );
    expect(studiesSource).toContain(
      "categoryBadgeTextChristianLife: {\n    color: colors.textStrong,",
    );

    expect(studiesSource).not.toContain(
      "accessibilityLabel={`Imagem da ${trackTitle}`}",
    );
    expect(trackSource).not.toContain(
      "accessibilityLabel={`Imagem da ${presentation.title}`}",
    );
    expect(detailSource).not.toContain(
      "accessibilityLabel={`Imagem da ${presentation.title}`}",
    );
    expect(studiesSource).toContain("accessible={false}");
    expect(trackSource).toContain("accessible={false}");
    expect(detailSource).toContain("accessible={false}");

    expect(detailSource).toContain(
      'accessibilityRole="button"',
    );
    expect(detailSource).toContain(
      'accessibilityLabel={`${expanded ? "Fechar" : "Abrir"} seção ${SECTION_LABELS[section.type]}`}',
    );
    expect(detailSource).toContain(
      "accessibilityState={{ expanded }}",
    );
  });
  it("uses structured author identity only for Track 5 cards and preserves summary fallback", () => {
    const trackSource = read("src/screens/StudyTrackScreen.tsx");

    expect(trackSource).toContain(
      'entry.content.trackId === "track-05"',
    );
    expect(trackSource).toContain("entry.publicAuthorProfile");
    expect(trackSource).toContain("Por {authorProfile.displayName}");
    expect(trackSource).toContain("styles.cardAuthorMeta");
    expect(trackSource).toContain('.join(" - ")');
    expect(trackSource).toContain("authorProfile.formation");
    expect(trackSource).toContain(
      'testID={`study-author-${entry.content.id}`}',
    );
    expect(trackSource).toContain("{descriptionText}");
  });
});
describe("A14-A7 Devotional Track 5 runtime integration", () => {
  it("keeps Study and Devotional domains separate while presenting both in Track 5", () => {
    const trackSource = read("src/screens/StudyTrackScreen.tsx");

    expect(trackSource).toContain(
      'devotionalRuntimeCatalog',
    );
    expect(trackSource).toContain(
      'trackId === "track-05"',
    );
    expect(trackSource).toContain(
      "personalPlatformHub.devotionalProgressService",
    );
    expect(trackSource).toContain(
      'navigation.navigate(',
    );
    expect(trackSource).toContain(
      '"DevotionalDetail"',
    );
    expect(trackSource).toContain(
      "devotionalId:",
    );
    expect(trackSource).toContain(
      "progressByDevotionalId",
    );
    expect(trackSource).not.toMatch(
      /studyId:\s*entry\.content\.id[\s\S]{0,80}devotional/i,
    );
  });
  it("visually distinguishes Track 5 devotionals and exposes complete approved author metadata", () => {
    const trackSource = read("src/screens/StudyTrackScreen.tsx");

    expect(trackSource).toContain("styles.devotionalCard");
    expect(trackSource).toContain("styles.devotionalNumberBadge");
    expect(trackSource).toContain("authorProfile.formation");
    expect(trackSource).toContain("styles.cardAuthorFormation");
    expect(trackSource).toContain(
      'testID={`devotional-author-${entry.content.id}`}',
    );
  });
});
