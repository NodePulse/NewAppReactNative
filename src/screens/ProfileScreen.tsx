import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  User,
  ShieldCheck,
  Award,
  Sliders,
  Bell,
  LogOut,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Building,
} from 'lucide-react-native';
import {
  ScreenContainer,
  ScreenHeader,
  SectionHeader,
  GlassView,
  NeumorphicButton,
} from '../components/ui';
import { CRM_STATS } from '../data/crmData';
import { AppRoutes } from '../navigations/AppRoutes';
import { BottomTabScreenNavigationProp } from '../navigations/types';
import { Colors } from '../colors';
import { CommonStyles } from '../styles';

export default function ProfileScreen() {
  const navigation = useNavigation<BottomTabScreenNavigationProp>();
  const officer = CRM_STATS.relationshipOfficer;

  const menuSections = [
    {
      id: 'underwriting-rules',
      title: 'Underwriting & Risk Thresholds',
      subtitle: 'FICO score cutoffs, DTI limits, automatic approvals',
      icon: Sliders,
      color: Colors.cyan,
      bg: Colors.cyan18,
    },
    {
      id: 'compliance',
      title: 'Regulatory & KYC Compliance',
      subtitle: 'AML verification, FinCEN & audit trails',
      icon: ShieldCheck,
      color: Colors.success,
      bg: Colors.emerald18,
    },
    {
      id: 'product-catalog',
      title: 'Card Products & Pricing Rules',
      subtitle: 'Manage cashback tiers, APR bounds & annual fee waivers',
      icon: Award,
      color: Colors.amberLight,
      bg: Colors.gold18,
    },
    {
      id: 'notifications',
      title: 'High-Value Lead Alerts',
      subtitle: 'Push alerts for approvals > $50,000 credit limit',
      icon: Bell,
      color: Colors.purpleLavender,
      bg: Colors.purpleLight18,
    },
  ];

  return (
    <ScreenContainer
      primaryColor={Colors.tealDark}
      secondaryColor={Colors.blueMidnight}
      tertiaryColor={Colors.violetDeep}
      edges={['top']}
    >
      {/* Header */}
      <ScreenHeader
        title="Officer Profile"
        subtitle="CRM Executive Workspace & Targets"
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Officer Glass Card */}
        <GlassView
          style={styles.officerCard}
          borderRadius={22}
          highlightIntensity="high"
        >
          <View style={styles.avatarOuter}>
            <View style={styles.avatarInner}>
              <User color={Colors.cyan} size={36} />
            </View>
            <View style={styles.proPill}>
              <Sparkles color={Colors.white} size={10} />
              <Text style={styles.proPillText}>DIRECTOR</Text>
            </View>
          </View>

          <Text style={styles.officerName}>{officer.name}</Text>
          <Text style={styles.officerRole}>{officer.role}</Text>

          <View style={styles.branchRow}>
            <Building color={Colors.white60} size={13} />
            <Text style={styles.branchText}>{officer.branch}</Text>
          </View>
        </GlassView>

        {/* Performance & Target Meter */}
        <SectionHeader title="Monthly Target & Commission" />
        <GlassView style={styles.targetCard} borderRadius={18}>
          <View style={styles.targetTop}>
            <View>
              <Text style={styles.targetLabel}>PORTFOLIO QUOTA ACHIEVED</Text>
              <Text style={styles.targetAchieved}>
                {officer.achievedTarget} / {officer.monthlyTarget}
              </Text>
            </View>
            <View style={styles.percentagePill}>
              <TrendingUp color={Colors.success} size={13} />
              <Text style={styles.percentageText}>
                {officer.targetPercentage}%
              </Text>
            </View>
          </View>

          {/* Target Progress Bar */}
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${officer.targetPercentage}%` },
              ]}
            />
          </View>

          <View style={styles.targetMetricsGrid}>
            <View style={styles.targetMetricItem}>
              <Text style={styles.metricItemLabel}>CARDS ISSUED</Text>
              <Text style={styles.metricItemVal}>
                {officer.cardsIssuedThisMonth}
              </Text>
            </View>

            <View style={styles.targetMetricDivider} />

            <View style={styles.targetMetricItem}>
              <Text style={styles.metricItemLabel}>COMMISSION EARNED</Text>
              <Text style={[styles.metricItemVal, { color: Colors.success }]}>
                {officer.commissionEarned}
              </Text>
            </View>
          </View>
        </GlassView>

        {/* CRM Preferences & Settings List */}
        <SectionHeader title="CRM Systems & Risk Policies" />
        <GlassView style={styles.menuContainer} borderRadius={18}>
          {menuSections.map((item, index) => {
            const IconComp = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index < menuSections.length - 1 && styles.menuItemBorder,
                ]}
                onPress={() =>
                  Alert.alert(item.title, `Configured for ${officer.branch}.`)
                }
                activeOpacity={0.7}
              >
                <View style={styles.menuLeft}>
                  <View
                    style={[
                      styles.menuIconWrapper,
                      {
                        backgroundColor: item.bg,
                        borderColor: `${item.color}50`,
                      },
                    ]}
                  >
                    <IconComp color={item.color} size={18} />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle} numberOfLines={1}>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>
                <ChevronRight color={Colors.white40} size={16} />
              </TouchableOpacity>
            );
          })}
        </GlassView>

        {/* Logout Button */}
        <NeumorphicButton
          onPress={() => navigation.navigate(AppRoutes.LOGIN_SCREEN)}
          style={styles.signOutBtn}
          accentColor={Colors.redCrimson}
          borderRadius={14}
        >
          <LogOut color={Colors.danger} size={16} />
          <Text style={styles.signOutText}>Sign Out of CRM Session</Text>
        </NeumorphicButton>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: CommonStyles.scrollContent,
  officerCard: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 20,
  },
  avatarOuter: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.cyan15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.cyan40,
  },
  proPill: {
    position: 'absolute',
    bottom: -6,
    backgroundColor: Colors.blueDark,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.blueLight,
  },
  proPillText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  officerName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
    textAlign: 'center',
  },
  officerRole: {
    color: Colors.cyan,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  branchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  branchText: {
    color: Colors.white60,
    fontSize: 11,
    textAlign: 'center',
  },
  targetCard: {
    marginBottom: 20,
  },
  targetTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  targetLabel: {
    color: Colors.white50,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  targetAchieved: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '800',
  },
  percentagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.emerald20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.emerald35,
  },
  percentageText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '700',
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: Colors.white10,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.success,
    borderRadius: 4,
  },
  targetMetricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.white08,
  },
  targetMetricItem: {
    flex: 1,
    alignItems: 'center',
  },
  targetMetricDivider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.white10,
  },
  metricItemLabel: {
    color: Colors.white45,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metricItemVal: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white08,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuIconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    color: Colors.white50,
    fontSize: 11,
  },
  signOutBtn: {
    paddingVertical: 14,
    marginBottom: 20,
  },
  signOutText: {
    color: Colors.danger,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
});
