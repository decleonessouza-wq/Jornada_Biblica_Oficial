import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import type { OfflineBibleReaderRouteParams } from "../bible/reader/bibleReaderContracts";
import type {
  BibleReference,
} from "../domain/bible/bibleReference";
import type { JournalEntryId } from "../domain/journal/journal";
import type { HymnId } from "../domain/hymnal/hymn";
import type { HymnalEditionId } from "../domain/hymnal/hymnalEdition";

export type ReadingRouteParams = {
  date: string;
  reference: string;
  isSunday?: boolean;
};

export type BibleStackParamList = {
  BibleLibrary: undefined;
  BibleSearch: undefined;
  BibleReader: OfflineBibleReaderRouteParams;
};

export type HymnalStackParamList = {
  HymnalLibrary: undefined;
  HymnalReader: {
    editionId: HymnalEditionId;
    hymnId: HymnId;
  };
};

export type JournalEntryEditorSourceContext =
  | Readonly<{
      sourceType: "BIBLE";
      reference: BibleReference;
    }>;

export type JournalStackParamList = {
  JournalHome: undefined;
  JournalEntryEditor:
    | Readonly<{
        entryId: JournalEntryId;
        sourceContext?: never;
      }>
    | Readonly<{
        entryId?: never;
        sourceContext?: JournalEntryEditorSourceContext;
      }>
    | undefined;
  JournalEntryDetail: {
    entryId: JournalEntryId;
  };
};

export type MainTabParamList = {
  HomeTab: undefined;
  BibleTab: NavigatorScreenParams<BibleStackParamList> | undefined;
  PlanTab: undefined;
  HymnalTab: NavigatorScreenParams<HymnalStackParamList> | undefined;
};

export type AppDrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Journal: NavigatorScreenParams<JournalStackParamList> | undefined;
  Favorites: undefined;
  Progress: undefined;
  History: undefined;
  Settings: undefined;
  Dedication: undefined;
  Terms: undefined;
  Privacy: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Dedication: undefined;
  AppShell: NavigatorScreenParams<AppDrawerParamList> | undefined;
  Reading: ReadingRouteParams;
  JourneyBibleReader: OfflineBibleReaderRouteParams;
};

export type RootStackScreenProps<
  RouteName extends keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, RouteName>;

export type AppDrawerScreenProps<
  RouteName extends keyof AppDrawerParamList,
> = CompositeScreenProps<
  DrawerScreenProps<AppDrawerParamList, RouteName>,
  NativeStackScreenProps<RootStackParamList, "AppShell">
>;

export type MainTabScreenProps<
  RouteName extends keyof MainTabParamList,
> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, RouteName>,
  CompositeScreenProps<
    DrawerScreenProps<AppDrawerParamList, "MainTabs">,
    NativeStackScreenProps<RootStackParamList, "AppShell">
  >
>;

export type BibleStackScreenProps<
  RouteName extends keyof BibleStackParamList,
> = NativeStackScreenProps<BibleStackParamList, RouteName>;

export type HymnalStackScreenProps<
  RouteName extends keyof HymnalStackParamList,
> = NativeStackScreenProps<HymnalStackParamList, RouteName>;

export type JournalStackScreenProps<
  RouteName extends keyof JournalStackParamList,
> = NativeStackScreenProps<JournalStackParamList, RouteName>;
