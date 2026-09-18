import { createNativeStackNavigator } from "@react-navigation/native-stack";

import StudiesScreen from "../screens/StudiesScreen";
import StudyDetailScreen from "../screens/StudyDetailScreen";
import StudyTrackScreen from "../screens/StudyTrackScreen";
import type { StudiesStackParamList } from "./types";

export const STUDIES_ROUTE_NAMES = Object.freeze({
  home: "StudiesHome",
  track: "StudyTrack",
  detail: "StudyDetail",
} as const);

export const StudiesStack =
  createNativeStackNavigator<StudiesStackParamList>();

export default function StudiesNavigator() {
  return (
    <StudiesStack.Navigator initialRouteName="StudiesHome">
      <StudiesStack.Screen
        component={StudiesScreen}
        name="StudiesHome"
        options={{ title: "Estudos Bíblicos" }}
      />
      <StudiesStack.Screen
        component={StudyTrackScreen}
        name="StudyTrack"
        options={{ title: "Trilha de Estudos" }}
      />
      <StudiesStack.Screen
        component={StudyDetailScreen}
        name="StudyDetail"
        options={{ title: "Estudo Bíblico" }}
      />
    </StudiesStack.Navigator>
  );
}
