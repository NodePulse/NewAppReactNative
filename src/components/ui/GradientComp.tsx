import { View, Text, StyleSheet, ViewProps, TextProps } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaskedViewBase from '@react-native-masked-view/masked-view';
import { Colors } from '../../colors';

const MaskedView = MaskedViewBase as unknown as React.ComponentType<{
  maskElement: React.ReactElement;
  children?: React.ReactNode;
}>;

interface BaseProps {
  colors: (string | number)[];
  children?: React.ReactNode;
}

interface GradientViewProps extends BaseProps {
  type: 'VIEW';
  viewProps?: ViewProps;
  textProps?: never; // Explicitly forbids passing textProps when type is 'VIEW'
}

interface GradientTextProps extends BaseProps {
  type: 'TEXT';
  textProps?: TextProps;
  viewProps?: never; // Explicitly forbids passing viewProps when type is 'TEXT'
}

export type GradientProps = GradientViewProps | GradientTextProps;

export const GradientComp: React.FC<GradientProps> = ({
  colors,
  type,
  children,
  viewProps,
  textProps,
}) => {
  return type === 'VIEW' ? (
    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={colors}>
      <View {...viewProps}>{children}</View>
    </LinearGradient>
  ) : (
    <MaskedView
      maskElement={
        <Text {...textProps} style={[textProps?.style, styles.maskText]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={colors}
      >
        <Text {...textProps} style={[textProps?.style, styles.invisibleText]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maskText: {
    color: Colors.black,
    backgroundColor: 'transparent',
  },
  invisibleText: {
    opacity: 0,
  },
});
