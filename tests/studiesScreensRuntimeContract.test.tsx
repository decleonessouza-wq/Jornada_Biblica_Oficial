import { fireEvent, render } from "@testing-library/react-native";
import { readFileSync } from "fs";
import { join } from "path";
import React from "react";

import StudiesScreen from "../src/screens/StudiesScreen";
import StudyDetailScreen from "../src/screens/StudyDetailScreen";
import StudyTrackScreen from "../src/screens/StudyTrackScreen";
import { studyTrackPresentationCatalog } from "../src/studies/presentation/studyTrackPresentationCatalog";
import { studyRuntimeCatalog } from "../src/studies/runtime/studyRuntimeCatalog";

const root = process.cwd();
const read = (relativePath: string): string =>
  readFileSync(join(root, relativePath), "utf8");

const countRuntimeStudies = (trackId: string): number =>
  studyRuntimeCatalog.studies.filter(
    (entry) => entry.content.trackId === trackId,
  ).length;

describe("Studies visual/runtime screen contract", () => {
  it("renders exactly the six public tracks independently from draft content", () => {
    const navigate = jest.fn();
    const view = render(
      <StudiesScreen
        navigation={{ navigate } as never}
        route={{
          key: "studies-home-test",
          name: "StudiesHome",
        }}
      />,
    );

    expect(studyTrackPresentationCatalog).toHaveLength(6);

    for (const track of studyTrackPresentationCatalog) {
      const card = view.getByTestId(`study-track-${track.trackId}`);
      const runtimeCount = countRuntimeStudies(track.trackId);

      expect(card).toBeTruthy();
      expect(view.getByText(track.title)).toBeTruthy();
      expect(
        view.getByTestId(`study-track-count-${track.trackId}`).props.children,
      ).toEqual([
        runtimeCount,
        " ",
        runtimeCount === 1
          ? "estudo disponível"
          : "estudos disponíveis",
      ]);
    }

    expect(view.getByText("Estudos Colaborativos")).toBeTruthy();
    expect(view.getByText("Vida à Luz da Palavra")).toBeTruthy();

    fireEvent.press(view.getByTestId("study-track-track-05"));
    expect(navigate).toHaveBeenCalledWith("StudyTrack", {
      trackId: "track-05",
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
        ? "estudo disponível"
        : "estudos disponíveis",
    ]);

    if (runtimeCount === 0) {
      expect(view.getByTestId("study-track-empty-state")).toBeTruthy();
    }
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

    expect(trackView.getByTestId("study-track-not-found")).toBeTruthy();

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

    expect(studyView.getByTestId("study-detail-not-found")).toBeTruthy();
  });

  it("keeps presentation identity separate from runtime study eligibility", () => {
    const studiesSource = read("src/screens/StudiesScreen.tsx");
    const trackSource = read("src/screens/StudyTrackScreen.tsx");
    const detailSource = read("src/screens/StudyDetailScreen.tsx");
    const combined = `${studiesSource}\n${trackSource}\n${detailSource}`;

    expect(studiesSource).toContain("studyTrackPresentationCatalog");
    expect(studiesSource).toContain("studyRuntimeCatalog.studies");
    expect(studiesSource).toContain(
      "entry.content.trackId === trackId",
    );

    expect(trackSource).toContain("studyTrackPresentationCatalog.find");
    expect(trackSource).toContain(
      "entry.content.trackId === trackId",
    );
    expect(trackSource).toContain("presentation.assets.trackHero");
    expect(trackSource).toContain("studyId: entry.content.id");

    expect(detailSource).toContain(
      "getRuntimeStudyById(route.params.studyId)",
    );
    expect(detailSource).toContain("entry.publicAuthorDisplayName");
    expect(detailSource).toContain("content.nextStudyId");
    expect(detailSource).toContain(
      "studyIconAssetManifest.perguntaCentral",
    );
    expect(detailSource).toContain("studyIconAssetManifest.objetivo");
    expect(detailSource).not.toContain("trackHero");

    expect(combined).not.toContain("../studies/content/");
    expect(combined).not.toContain("DraftBatch");
    expect(combined).not.toContain("track05Study01Draft");
    expect(combined).not.toContain("Michael Batista da Silva");
    expect(combined).not.toMatch(/track-05-study-0[2-9]/);
    expect(combined).not.toMatch(/track-06-study-/);
    expect(combined).not.toMatch(/placeholder/i);
    expect(combined).not.toMatch(/require\s*\(/);
  });

  it("derives study counts dynamically instead of storing fixed track totals", () => {
    const studiesSource = read("src/screens/StudiesScreen.tsx");
    const trackSource = read("src/screens/StudyTrackScreen.tsx");
    const combined = `${studiesSource}\n${trackSource}`;

    expect(studiesSource).toContain("getRuntimeStudyCount(track.trackId)");
    expect(studiesSource).toContain("studyRuntimeCatalog.studies.filter");
    expect(trackSource).toContain("studies.length");
    expect(combined).not.toMatch(/studyCount\s*:\s*\d+/);
    expect(combined).not.toMatch(/\b5 estudos\b/i);
    expect(combined).not.toMatch(/\b10 estudos\b/i);
  });
});
