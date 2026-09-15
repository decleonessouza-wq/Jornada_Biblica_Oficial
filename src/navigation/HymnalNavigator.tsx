import HymnalLibraryScreen from "../hymnal/screens/HymnalLibraryScreen";
import HymnalReaderScreen from "../hymnal/screens/HymnalReaderScreen";

import { HymnalStack } from "./navigationFactories";
import type { MainTabScreenProps } from "./types";

export default function HymnalNavigator({
  navigation,
}: MainTabScreenProps<"HymnalTab">) {
  const handleRequestFavorites = () => {
    navigation.navigate("Favorites");
  };

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
      <HymnalStack.Screen name="HymnalReader">
        {(screenProps) => (
          <HymnalReaderScreen
            {...screenProps}
            onRequestFavorites={
              handleRequestFavorites
            }
          />
        )}
      </HymnalStack.Screen>
    </HymnalStack.Navigator>
  );
}