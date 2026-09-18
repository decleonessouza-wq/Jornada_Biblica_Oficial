import type { ImageSourcePropType } from "react-native";

export type StudyTrackId =
  | "track-01"
  | "track-02"
  | "track-03"
  | "track-04"
  | "track-05"
  | "track-06";

export type StudyTrackAssetSet = Readonly<{
  card: ImageSourcePropType;
  libraryHeader: ImageSourcePropType;
  trackHero: ImageSourcePropType;
}>;

export const studyTrackAssetManifest: Readonly<
  Record<StudyTrackId, StudyTrackAssetSet>
> = {
  "track-01": {
    card: require("../../../assets/studies/tracks/cards/track-01.png"),
    libraryHeader: require("../../../assets/studies/tracks/library/track-01.png"),
    trackHero: require("../../../assets/studies/tracks/heroes/track-01.png"),
  },
  "track-02": {
    card: require("../../../assets/studies/tracks/cards/track-02.png"),
    libraryHeader: require("../../../assets/studies/tracks/library/track-02.png"),
    trackHero: require("../../../assets/studies/tracks/heroes/track-02.png"),
  },
  "track-03": {
    card: require("../../../assets/studies/tracks/cards/track-03.png"),
    libraryHeader: require("../../../assets/studies/tracks/library/track-03.png"),
    trackHero: require("../../../assets/studies/tracks/heroes/track-03.png"),
  },
  "track-04": {
    card: require("../../../assets/studies/tracks/cards/track-04.png"),
    libraryHeader: require("../../../assets/studies/tracks/library/track-04.png"),
    trackHero: require("../../../assets/studies/tracks/heroes/track-04.png"),
  },
  "track-05": {
    card: require("../../../assets/studies/tracks/cards/track-05.png"),
    libraryHeader: require("../../../assets/studies/tracks/library/track-05.png"),
    trackHero: require("../../../assets/studies/tracks/heroes/track-05.png"),
  },
  "track-06": {
    card: require("../../../assets/studies/tracks/cards/track-06.png"),
    libraryHeader: require("../../../assets/studies/tracks/library/track-06.png"),
    trackHero: require("../../../assets/studies/tracks/heroes/track-06.png"),
  },
};

export type StudyIconKey =
  | "aplique"
  | "aprofunde"
  | "compreenda"
  | "conclusao"
  | "conecte"
  | "continueJornada"
  | "cuidadoNaoConfundir"
  | "favoritos"
  | "leia"
  | "leituraBiblica"
  | "levamosDaJornada"
  | "modoGrupo"
  | "objetivo"
  | "observe"
  | "ore"
  | "paraGuardar"
  | "paraRefletir"
  | "perguntaCentral"
  | "pratiqueHoje"
  | "referencias"
  | "reflita"
  | "registrarDiario"
  | "tema"
  | "textoAureo"
  | "verdadePratica";

export const studyIconAssetManifest: Readonly<
  Record<StudyIconKey, ImageSourcePropType>
> = {
  aplique: require("../../../assets/studies/icons/aplique.png"),
  aprofunde: require("../../../assets/studies/icons/aprofunde.png"),
  compreenda: require("../../../assets/studies/icons/compreenda.png"),
  conclusao: require("../../../assets/studies/icons/conclusao.png"),
  conecte: require("../../../assets/studies/icons/conecte.png"),
  continueJornada: require("../../../assets/studies/icons/continue_jornada.png"),
  cuidadoNaoConfundir: require("../../../assets/studies/icons/cuidado_nao_confundir.png"),
  favoritos: require("../../../assets/studies/icons/favoritos.png"),
  leia: require("../../../assets/studies/icons/leia.png"),
  leituraBiblica: require("../../../assets/studies/icons/leitura_biblica.png"),
  levamosDaJornada: require("../../../assets/studies/icons/levamos_da_jornada.png"),
  modoGrupo: require("../../../assets/studies/icons/modo_grupo.png"),
  objetivo: require("../../../assets/studies/icons/objetivo.png"),
  observe: require("../../../assets/studies/icons/observe.png"),
  ore: require("../../../assets/studies/icons/ore.png"),
  paraGuardar: require("../../../assets/studies/icons/para_guardar.png"),
  paraRefletir: require("../../../assets/studies/icons/para_refletir.png"),
  perguntaCentral: require("../../../assets/studies/icons/pergunta_central.png"),
  pratiqueHoje: require("../../../assets/studies/icons/pratique_hoje.png"),
  referencias: require("../../../assets/studies/icons/referencias.png"),
  reflita: require("../../../assets/studies/icons/reflita.png"),
  registrarDiario: require("../../../assets/studies/icons/registrar_diario.png"),
  tema: require("../../../assets/studies/icons/tema.png"),
  textoAureo: require("../../../assets/studies/icons/texto_aureo.png"),
  verdadePratica: require("../../../assets/studies/icons/verdade_pratica.png"),
};
