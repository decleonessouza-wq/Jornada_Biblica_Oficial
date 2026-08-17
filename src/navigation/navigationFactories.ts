import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type {
  AppDrawerParamList,
  MainTabParamList,
  RootStackParamList,
} from "./types";

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppDrawer = createDrawerNavigator<AppDrawerParamList>();

export const MainTabs = createBottomTabNavigator<MainTabParamList>();