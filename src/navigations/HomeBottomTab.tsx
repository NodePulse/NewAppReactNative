import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  CardScreen,
  ClientsScreen,
  ProfileScreen,
} from '../screens';
import { AppRoutes } from './AppRoutes';
import { BottomTabParamList } from './types';
import { CustomGlassTabBar } from '../components/CustomGlassTabBar';
import { Colors } from '../colors';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const renderCustomTabBar = (props: BottomTabBarProps) => (
  <CustomGlassTabBar {...props} />
);

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName={AppRoutes.HOME_SCREEN}
      backBehavior="history"
      detachInactiveScreens={true}
      tabBar={renderCustomTabBar}
      screenOptions={{
        headerShown: false,
        lazy: true,
        sceneStyle: {
          backgroundColor: Colors.background,
        },
        animation: 'shift',
      }}
    >
      {/* 1. CRM Dashboard */}
      <BottomTab.Screen
        name={AppRoutes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          tabBarAccessibilityLabel: 'Navigate to Dashboard',
        }}
      />

      {/* 2. Card Products & Live Controls */}
      <BottomTab.Screen
        name={AppRoutes.CARD_SCREEN}
        component={CardScreen}
        options={{
          title: 'Cards',
          tabBarLabel: 'Cards',
          tabBarAccessibilityLabel: 'Navigate to Card Products',
          tabBarBadge: 'NEW',
        }}
      />

      {/* 3. CRM Client Applications & Pipeline */}
      <BottomTab.Screen
        name={AppRoutes.CLIENTS_SCREEN}
        component={ClientsScreen}
        options={{
          title: 'Pipeline',
          tabBarLabel: 'Pipeline',
          tabBarAccessibilityLabel: 'Navigate to CRM Pipeline',
          tabBarBadge: 5,
        }}
      />

      {/* 4. RM Executive Profile */}
      <BottomTab.Screen
        name={AppRoutes.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          title: 'Officer',
          tabBarLabel: 'Officer',
          tabBarAccessibilityLabel: 'Navigate to Officer Profile',
        }}
      />
    </BottomTab.Navigator>
  );
}
