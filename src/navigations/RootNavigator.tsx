import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoutes } from './AppRoutes';
import { RootStackParamList } from './types';
import BottomTabNavigator from './HomeBottomTab';
import { LoginScreen, RegisterScreen } from '../screens';

const AppStack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <AppStack.Navigator
      initialRouteName={AppRoutes.MAIN_TABS}
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen
        name={AppRoutes.MAIN_TABS}
        component={BottomTabNavigator}
      />
      <AppStack.Screen
        name={AppRoutes.LOGIN_SCREEN}
        component={LoginScreen}
      />
      <AppStack.Screen
        name={AppRoutes.REGISTER_SCREEN}
        component={RegisterScreen}
      />
    </AppStack.Navigator>
  );
}
