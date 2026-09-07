import BibleReaderScreen from "../bible/screens/BibleReaderScreen";
import type { OfflineBibleReaderRouteParams } from "../bible/reader/bibleReaderContracts";

import type { RootStackScreenProps } from "./types";

export default function JourneyBibleReaderRoute({
  navigation,
  route,
}: RootStackScreenProps<"JourneyBibleReader">) {
  const handleRequestBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.replace("AppShell");
  };

  const handleRequestReferenceChange = (
    params: OfflineBibleReaderRouteParams,
  ) => {
    navigation.setParams(params);
  };

  return (
    <BibleReaderScreen
      params={route.params}
      onRequestBack={handleRequestBack}
      onRequestReferenceChange={handleRequestReferenceChange}
    />
  );
}
