import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../colors';
import { CommonStyles } from '../../styles';

interface GlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  borderColor?: string;
  borderRadius?: number;
  highlightIntensity?: 'subtle' | 'medium' | 'high';
}

export const GlassView: React.FC<GlassViewProps> = ({
  children,
  style,
  colors,
  borderColor,
  borderRadius = 20,
  highlightIntensity = 'medium',
}) => {
  const defaultColors =
    highlightIntensity === 'high'
      ? [Colors.white16, Colors.white05, Colors.white02]
      : highlightIntensity === 'medium'
      ? [Colors.white11, Colors.white04, Colors.white01]
      : [Colors.white07, Colors.white02];

  const defaultBorder = borderColor || Colors.white18;

  return (
    <LinearGradient
      colors={colors || defaultColors}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={[
        styles.glassCard,
        {
          borderRadius,
          borderColor: defaultBorder,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  glassCard: {
    ...CommonStyles.glassCard,
    backgroundColor: Colors.slateGlass,
    padding: 16,
    overflow: 'hidden',
  },
});
