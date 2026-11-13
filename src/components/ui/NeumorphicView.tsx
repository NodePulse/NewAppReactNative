import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../colors';

interface NeumorphicCardProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  elevated?: boolean;
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  style,
  borderRadius = 18,
  elevated = true,
}) => {
  return (
    <View
      style={[
        styles.neumorphicOuter,
        elevated ? styles.elevatedShadow : styles.insetShadow,
        { borderRadius },
        style,
      ]}
    >
      <LinearGradient
        colors={[Colors.slateMuted, Colors.slateSurface, Colors.slateDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.neumorphicInner, { borderRadius }]}
      >
        <View
          style={[
            styles.neumorphicBevel,
            {
              borderRadius,
              borderColor: elevated ? Colors.white08 : Colors.black40,
            },
          ]}
        >
          {children}
        </View>
      </LinearGradient>
    </View>
  );
};

interface NeumorphicButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  active?: boolean;
  accentColor?: string;
}

export const NeumorphicButton: React.FC<NeumorphicButtonProps> = ({
  onPress,
  children,
  style,
  borderRadius = 14,
  active = false,
  accentColor,
}) => {
  const activeGradient = accentColor
    ? [accentColor, Colors.blueDark]
    : [Colors.blue, Colors.blueNavy];

  const defaultGradient = active
    ? activeGradient
    : [Colors.slateBorder, Colors.slateCard, Colors.slateNavy];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      style={[
        styles.buttonOuter,
        active ? styles.buttonActiveShadow : styles.buttonShadow,
        { borderRadius },
        style,
      ]}
    >
      <LinearGradient
        colors={defaultGradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={[
          styles.buttonInner,
          {
            borderRadius,
            borderColor: active ? Colors.white40 : Colors.white12,
          },
        ]}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  neumorphicOuter: {
    overflow: 'hidden',
  },
  elevatedShadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 5, height: 8 },
    shadowOpacity: 0.65,
    shadowRadius: 14,
    elevation: 8,
  },
  insetShadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  neumorphicInner: {
    padding: 2,
  },
  neumorphicBevel: {
    padding: 16,
    borderWidth: 1,
  },
  buttonOuter: {
    overflow: 'hidden',
  },
  buttonShadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.55,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonActiveShadow: {
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonInner: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
