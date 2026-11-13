import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../colors';

const { width, height } = Dimensions.get('window');

interface BackdropGradientsProps {
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
}

export const BackdropGradients: React.FC<BackdropGradientsProps> = ({
  primaryColor = Colors.blue,
  secondaryColor = Colors.purple,
  tertiaryColor = Colors.cyanTeal,
}) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Deep base backdrop */}
      <View style={styles.baseBg} />

      {/* Top Right Glowing Orb */}
      <View style={[styles.orbContainer, styles.topRightOrb]}>
        <LinearGradient
          colors={[primaryColor, 'transparent']}
          style={styles.orbGradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </View>

      {/* Middle Left Glowing Orb */}
      <View style={[styles.orbContainer, styles.middleLeftOrb]}>
        <LinearGradient
          colors={[secondaryColor, 'transparent']}
          style={styles.orbGradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </View>

      {/* Bottom Right Glowing Orb */}
      <View style={[styles.orbContainer, styles.bottomRightOrb]}>
        <LinearGradient
          colors={[tertiaryColor, 'transparent']}
          style={styles.orbGradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
  },
  orbContainer: {
    position: 'absolute',
    borderRadius: 300,
    opacity: 0.28,
  },
  orbGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 300,
  },
  topRightOrb: {
    top: -80,
    right: -60,
    width: width * 0.85,
    height: width * 0.85,
  },
  middleLeftOrb: {
    top: height * 0.32,
    left: -100,
    width: width * 0.9,
    height: width * 0.9,
  },
  bottomRightOrb: {
    bottom: -60,
    right: -80,
    width: width * 0.95,
    height: width * 0.95,
  },
});
