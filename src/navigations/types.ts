import { NavigatorScreenParams, CompositeNavigationProp } from '@react-navigation/native';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { BottomTabScreenProps, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AppRoutes } from './AppRoutes';

export type BottomTabParamList = {
  [AppRoutes.HOME_SCREEN]: undefined;
  [AppRoutes.CARD_SCREEN]: undefined;
  [AppRoutes.CLIENTS_SCREEN]: undefined;
  [AppRoutes.PROFILE_SCREEN]: undefined;
};

export type RootStackParamList = {
  [AppRoutes.MAIN_TABS]: NavigatorScreenParams<BottomTabParamList> | undefined;
  [AppRoutes.LOGIN_SCREEN]: undefined;
  [AppRoutes.REGISTER_SCREEN]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainTabsScreenProps<T extends keyof BottomTabParamList> =
  BottomTabScreenProps<BottomTabParamList, T>;

export type RootStackNavigationProp<
  T extends keyof RootStackParamList = keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

export type BottomTabScreenNavigationProp<
  T extends keyof BottomTabParamList = keyof BottomTabParamList
> = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, T>,
  StackNavigationProp<RootStackParamList>
>;

export type AppNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  StackNavigationProp<RootStackParamList>
>;
