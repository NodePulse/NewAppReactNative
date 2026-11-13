export const AppRoutes = {
  MAIN_TABS: 'MainTabs',
  HOME_SCREEN: 'HomeScreen',
  CARD_SCREEN: 'CardScreen',
  CLIENTS_SCREEN: 'ClientsScreen',
  PROFILE_SCREEN: 'ProfileScreen',
  LOGIN_SCREEN: 'LoginScreen',
  REGISTER_SCREEN: 'RegisterScreen',
} as const;

export type AppRoute = (typeof AppRoutes)[keyof typeof AppRoutes];
