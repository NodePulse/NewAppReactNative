import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { NeumorphicButton } from './NeumorphicView';
import { Colors } from '../../colors';

export interface FilterItem<T extends string = string> {
  key: T;
  label: string;
}

export interface FilterPillsProps<T extends string = string> {
  items: readonly FilterItem<T>[] | FilterItem<T>[];
  selectedKey: T;
  onSelect: (key: T) => void;
  scrollable?: boolean;
  accentColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function FilterPills<T extends string = string>({
  items,
  selectedKey,
  onSelect,
  scrollable = false,
  accentColor = Colors.cyan,
  style,
}: FilterPillsProps<T>) {
  if (scrollable) {
    return (
      <View style={[styles.scrollWrapper, style]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {items.map(item => {
            const isActive = selectedKey === item.key;
            return (
              <NeumorphicButton
                key={item.key}
                onPress={() => onSelect(item.key)}
                active={isActive}
                borderRadius={12}
                accentColor={isActive ? accentColor : undefined}
                style={styles.scrollButton}
              >
                <Text
                  style={[
                    styles.text,
                    isActive ? styles.textActive : styles.textInactive,
                  ]}
                >
                  {item.label}
                </Text>
              </NeumorphicButton>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.rowContainer, style]}>
      {items.map(item => {
        const isActive = selectedKey === item.key;
        return (
          <NeumorphicButton
            key={item.key}
            onPress={() => onSelect(item.key)}
            active={isActive}
            borderRadius={12}
            accentColor={isActive ? accentColor : undefined}
            style={styles.rowButton}
          >
            <Text
              style={[
                styles.text,
                isActive ? styles.textActive : styles.textInactive,
              ]}
            >
              {item.label}
            </Text>
          </NeumorphicButton>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 10,
  },
  rowButton: {
    flex: 1,
  },
  scrollWrapper: {
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  scrollButton: {
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textActive: {
    color: Colors.white,
    fontWeight: '700',
  },
  textInactive: {
    color: Colors.white65,
  },
});

export default FilterPills;

