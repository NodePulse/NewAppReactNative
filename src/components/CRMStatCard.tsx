import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlassView } from './ui/GlassView';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { Colors } from '../colors';
import { CommonStyles } from '../styles';

interface CRMStatCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const CRMStatCard: React.FC<CRMStatCardProps> = ({
  label,
  value,
  subValue,
  trend,
  isPositive = true,
  icon,
  accentColor = Colors.primary,
}) => {
  return (
    <GlassView
      style={styles.card}
      borderRadius={16}
      highlightIntensity="medium"
    >
      <View style={styles.topRow}>
        <View
          style={[
            styles.iconWrapper,
            { backgroundColor: `${accentColor}25`, borderColor: `${accentColor}50` },
          ]}
        >
          {icon}
        </View>

        {trend && (
          <View
            style={[
              styles.trendPill,
              {
                backgroundColor: isPositive
                  ? Colors.emerald16
                  : Colors.red16,
                borderColor: isPositive
                  ? Colors.emerald35
                  : Colors.red35,
              },
            ]}
          >
            {isPositive ? (
              <TrendingUp color={Colors.success} size={12} />
            ) : (
              <TrendingDown color={Colors.danger} size={12} />
            )}
            <Text
              style={[
                styles.trendText,
                { color: isPositive ? Colors.success : Colors.danger },
              ]}
            >
              {trend}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.labelText}>{label}</Text>

      {subValue && <Text style={styles.subText}>{subValue}</Text>}
    </GlassView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
  },
  topRow: {
    ...CommonStyles.rowBetween,
    marginBottom: 10,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  trendPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '700',
  },
  valueText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  labelText: {
    color: Colors.white65,
    fontSize: 11,
    fontWeight: '600',
  },
  subText: {
    color: Colors.white45,
    fontSize: 10,
    marginTop: 4,
  },
});
