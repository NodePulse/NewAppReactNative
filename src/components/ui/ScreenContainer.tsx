import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { BackdropGradients } from './BackdropGradients';
import { CommonStyles } from '../../styles';

export interface ScreenContainerProps {
  children: React.ReactNode;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  style?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
  edges?: readonly Edge[];
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  primaryColor,
  secondaryColor,
  tertiaryColor,
  style,
  safeAreaStyle,
  edges,
}) => {
  return (
    <View style={[styles.container, style]}>
      <BackdropGradients
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        tertiaryColor={tertiaryColor}
      />
      <SafeAreaView style={[styles.safeArea, safeAreaStyle]} edges={edges}>
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.screenContainer,
  },
  safeArea: {
    ...CommonStyles.safeArea,
  },
});

export default ScreenContainer;
