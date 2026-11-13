import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { CommonStyles } from '../../styles';

export interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  leftContent?: React.ReactNode;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  badge,
  rightElement,
  style,
  titleStyle,
  subtitleStyle,
  leftContent,
}) => {
  const containerStyle = rightElement ? styles.headerWithRight : styles.headerSimple;

  return (
    <View style={[containerStyle, style]}>
      <View style={rightElement ? styles.leftColumn : undefined}>
        {badge}
        {leftContent}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
        ) : null}
      </View>
      {rightElement}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWithRight: {
    ...CommonStyles.header,
  },
  headerSimple: {
    ...CommonStyles.headerSimple,
  },
  leftColumn: {
    flex: 1,
  },
  title: {
    ...CommonStyles.screenTitle,
  },
  subtitle: {
    ...CommonStyles.screenSubtitle,
  },
});

export default ScreenHeader;

