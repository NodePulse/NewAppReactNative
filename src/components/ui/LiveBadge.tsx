import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../colors';
import { CommonStyles } from '../../styles';

export interface LiveBadgeProps {
  label: string;
  color?: string;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const LiveBadge: React.FC<LiveBadgeProps> = ({
  label,
  color = Colors.emerald,
  icon,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon ? (
        icon
      ) : (
        <View style={[styles.pulseDot, { backgroundColor: color }]} />
      )}
      <Text style={[styles.label, { color }, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.liveBadgeRow,
  },
  pulseDot: {
    ...CommonStyles.livePulse,
  },
  label: {
    ...CommonStyles.liveBadgeText,
  },
});

export default LiveBadge;

