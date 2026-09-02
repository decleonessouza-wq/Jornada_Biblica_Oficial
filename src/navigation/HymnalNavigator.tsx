import HymnalLibraryScreen from "../hymnal/screens/HymnalLibraryScreen";

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
    </HymnalStack.Navigator>
  );
}
