import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { CommonStyles } from '../../styles';

export interface SectionHeaderProps {
  title: string;
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  marginTop?: boolean | number;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  rightElement,
  style,
  titleStyle,
  marginTop,
}) => {
  const customMarginTop =
    typeof marginTop === 'number'
      ? marginTop
      : marginTop === true
      ? 20
      : undefined;

  if (rightElement) {
    return (
      <View
        style={[
          styles.rowContainer,
          customMarginTop !== undefined && { marginTop: customMarginTop },
          style,
        ]}
      >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {rightElement}
      </View>
    );
  }

  return (
    <View
      style={[
        customMarginTop !== undefined && { marginTop: customMarginTop },
        style,
      ]}
    >
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    ...CommonStyles.rowBetween,
    marginBottom: 12,
  },
  title: {
    ...CommonStyles.sectionHeading,
  },
});

export default SectionHeader;

