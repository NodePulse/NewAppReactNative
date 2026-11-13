import React from 'react';
import { View, Text, Switch, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../../colors';

export interface ControlToggleRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  activeTrackColor?: string;
  inactiveTrackColor?: string;
  activeThumbColor?: string;
  inactiveThumbColor?: string;
  hasBorder?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const ControlToggleRow: React.FC<ControlToggleRowProps> = ({
  icon,
  title,
  description,
  value,
  onValueChange,
  activeTrackColor = Colors.cyanDark,
  inactiveTrackColor = Colors.slateSteel,
  activeThumbColor = Colors.cyan,
  inactiveThumbColor = Colors.slateLight,
  hasBorder = false,
  style,
}) => {
  return (
    <View style={[styles.controlRow, hasBorder && styles.rowBorder, style]}>
      <View style={styles.controlIconBox}>{icon}</View>
      <View style={styles.controlInfo}>
        <Text style={styles.controlTitle}>{title}</Text>
        <Text style={styles.controlDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: inactiveTrackColor, true: activeTrackColor }}
        thumbColor={value ? activeThumbColor : inactiveThumbColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowBorder: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.white08,
  },
  controlIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.white08,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white15,
  },
  controlInfo: {
    flex: 1,
  },
  controlTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  controlDesc: {
    color: Colors.white55,
    fontSize: 11,
    lineHeight: 15,
  },
});

export default ControlToggleRow;

