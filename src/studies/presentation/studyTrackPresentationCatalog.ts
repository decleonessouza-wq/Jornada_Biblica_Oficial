import {
  studyTrackAssetManifest,
  type StudyTrackAssetSet,
  type StudyTrackId,
} from "./studyAssetManifest";

export type StudyTrackPresentation = Readonly<{
  trackId: StudyTrackId;
  order: number;
  title: string;
  nature: string;
  assets: StudyTrackAssetSet;
}>;

export const studyTrackPresentationCatalog: readonly StudyTrackPresentation[] =
  Object.freeze([
    {
      trackId: "track-01",
      order: 1,
      title: "O Plano Eterno de Deus",
      nature: "Formação / fundamentos",
      assets: studyTrackAssetManifest["track-01"],
    },
    {
      trackId: "track-02",
      order: 2,
      title: "Conhecendo Deus",
      nature: "Formação / fundamentos",
      assets: studyTrackAssetManifest["track-02"],
    },
    {
      trackId: "track-03",
      order: 3,
      title: "Conhecendo Jesus Cristo",
      nature: "Formação cristocêntrica",
      assets: studyTrackAssetManifest["track-03"],
    },
    {
      trackId: "track-04",
      order: 4,
      title: "Nova Vida em Cristo",
      nature: "Vida cristã",
      assets: studyTrackAssetManifest["track-04"],
    },
    {
      trackId: "track-05",
      order: 5,
      title: "Estudos Colaborativos",
      nature: "Colaborativo / acervo vivo",
      assets: studyTrackAssetManifest["track-05"],
    },
    {
      trackId: "track-06",
      order: 6,
      title: "Vida à Luz da Palavra",
      nature: "Vida prática / devocional",
      assets: studyTrackAssetManifest["track-06"],
    },
  ]);

export function getStudyTrackPresentation(
  trackId: StudyTrackId,
): StudyTrackPresentation | null {
  return (
    studyTrackPresentationCatalog.find((track) => track.trackId === trackId) ??
    null
  );
}
