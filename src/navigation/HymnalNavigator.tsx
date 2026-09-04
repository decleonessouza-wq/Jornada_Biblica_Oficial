import HymnalLibraryScreen from "../hymnal/screens/HymnalLibraryScreen";
import HymnalReaderScreen from "../hymnal/screens/HymnalReaderScreen";

import { HymnalStack } from "./navigationFactories";

export default function HymnalNavigator() {
  return (
    <HymnalStack.Navigator
      initialRouteName="HymnalLibrary"
      screenOptions={{
        headerShown: false,
      }}
    >
      <HymnalStack.Screen
        name="HymnalLibrary"
        component={HymnalLibraryScreen}
      />
      <HymnalStack.Screen
        name="HymnalReader"
        component={HymnalReaderScreen}
      />
    </HymnalStack.Navigator>
  );
}
