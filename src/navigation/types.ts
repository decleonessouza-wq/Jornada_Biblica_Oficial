import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ReadingRouteParams = {
  date: string;
  reference: string;
  isSunday?: boolean;
};

export type MainTabParamList = {
  HomeTab: undefined;
  PlanTab: undefined;
};

export type AppDrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
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