import React from 'react';
import { HomeIcon, UserIcon, CreditCard, Users } from 'lucide-react-native';

export const AppHomeIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => <HomeIcon color={color} size={size} strokeWidth={focused ? 2.5 : 1.8} />;

export const AppCardIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => <CreditCard color={color} size={size} strokeWidth={focused ? 2.5 : 1.8} />;

export const AppClientsIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => <Users color={color} size={size} strokeWidth={focused ? 2.5 : 1.8} />;

export const AppProfileIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => <UserIcon color={color} size={size} strokeWidth={focused ? 2.5 : 1.8} />;
