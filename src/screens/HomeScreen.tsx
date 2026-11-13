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
  Bell,
  CreditCard,
  Users,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  Plus,
  ArrowUpRight,
  Clock,
} from 'lucide-react-native';
import {
  ScreenContainer,
  ScreenHeader,
  SectionHeader,
  LiveBadge,
  GlassView,
  NeumorphicButton,
} from '../components/ui';
import { CRMStatCard, LuxuryCard } from '../components';
import {
  CRM_STATS,
  INITIAL_CARDS,
  INITIAL_LEADS,
  RECENT_TRANSACTIONS,
} from '../data/crmData';
import { AppRoutes } from '../navigations/AppRoutes';
import { BottomTabScreenNavigationProp } from '../navigations/types';
import { Colors } from '../colors';
import { CommonStyles } from '../styles';
import { formatCurrency } from '../utils';

export default function HomeScreen() {
  const navigation = useNavigation<BottomTabScreenNavigationProp>();

  const featuredCard = INITIAL_CARDS[0];

  return (
    <ScreenContainer
      primaryColor={Colors.blueDark}
      secondaryColor={Colors.violet}
      tertiaryColor={Colors.emeraldDark}
      edges={['top']}
    >
      {/* Header */}
      <ScreenHeader
        title={CRM_STATS.relationshipOfficer.name}
        subtitle="Senior Card Products & Underwriting"
        titleStyle={styles.officerName}
        subtitleStyle={styles.officerRole}
        badge={<LiveBadge label="PORTFOLIO CRM • LIVE" />}
        rightElement={
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() =>
              Alert.alert(
                'CRM Notifications',
                '3 new card applications waiting for underwriting decision.',
              )
            }
            activeOpacity={0.7}
          >
            <Bell color={Colors.white} size={20} />
            <View style={styles.notifDot} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
          {/* Main Portfolio Value Hero Banner - Glassmorphism */}
          <GlassView
            style={styles.portfolioHero}
            borderRadius={22}
            highlightIntensity="high"
          >
            <View style={styles.heroTop}>
              <Text style={styles.heroLabel}>MANAGED CARD PORTFOLIO</Text>
              <View style={styles.growthPill}>
                <TrendingUp color={Colors.success} size={13} />
                <Text style={styles.growthText}>{CRM_STATS.portfolioGrowth}</Text>
              </View>
            </View>

            <Text style={styles.heroAmount}>{CRM_STATS.totalManagedPortfolio}</Text>

            <View style={styles.heroDivider} />

            <View style={styles.heroStatsRow}>
              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatLabel}>CREDIT CARDS</Text>
                <Text style={styles.heroStatValue}>{CRM_STATS.creditCardsCount}</Text>
              </View>

              <View style={styles.heroStatSeparator} />

              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatLabel}>DEBIT CARDS</Text>
                <Text style={styles.heroStatValue}>{CRM_STATS.debitCardsCount}</Text>
              </View>

              <View style={styles.heroStatSeparator} />

              <View style={styles.heroStatItem}>
                <Text style={styles.heroStatLabel}>APPROVAL RATE</Text>
                <Text style={[styles.heroStatValue, { color: Colors.success }]}>
                  {CRM_STATS.approvalRate}
                </Text>
              </View>
            </View>
          </GlassView>

          {/* KPI Stat Cards Grid */}
          <View style={styles.statsGrid}>
            <CRMStatCard
              label="Pending Underwriting"
              value="34"
              subValue="Avg time: 2.4m"
              trend="+12%"
              isPositive={false}
              accentColor={Colors.amber}
              icon={<Clock color={Colors.amberLight} size={18} />}
            />

            <CRMStatCard
              label="Active Cardholders"
              value="1,428"
              subValue="99.8% good standing"
              trend="+8.2%"
              isPositive={true}
              accentColor={Colors.cyan}
              icon={<CreditCard color={Colors.cyan} size={18} />}
            />
          </View>

          {/* Quick CRM Action Bar - Neumorphic Buttons */}
          <SectionHeader title="CRM Quick Actions" />
          <View style={styles.actionsGrid}>
            <NeumorphicButton
              onPress={() => navigation.navigate(AppRoutes.CARD_SCREEN)}
              style={styles.actionBtn}
              active={true}
              accentColor={Colors.blueDark}
              borderRadius={14}
            >
              <Plus color={Colors.white} size={16} />
              <Text style={styles.actionBtnText}>Issue Card</Text>
            </NeumorphicButton>

            <NeumorphicButton
              onPress={() => navigation.navigate(AppRoutes.CLIENTS_SCREEN)}
              style={styles.actionBtn}
              borderRadius={14}
            >
              <Users color={Colors.purpleBright} size={16} />
              <Text style={styles.actionBtnSecondaryText}>View Pipeline</Text>
            </NeumorphicButton>

            <NeumorphicButton
              onPress={() =>
                Alert.alert(
                  'Risk & Fraud Shield',
                  'AI Fraud monitoring is active across all 1,428 credit/debit card accounts. Zero compromised cards detected.'
                )
              }
              style={styles.actionBtn}
              borderRadius={14}
            >
              <ShieldCheck color={Colors.success} size={16} />
              <Text style={styles.actionBtnSecondaryText}>Fraud Shield</Text>
            </NeumorphicButton>
          </View>

          {/* Spotlight Card Preview */}
          <SectionHeader
            title="Spotlight Card Product"
            rightElement={
              <TouchableOpacity
                onPress={() => navigation.navigate(AppRoutes.CARD_SCREEN)}
                style={styles.seeAllBtn}
              >
                <Text style={styles.seeAllText}>View All Products</Text>
                <ChevronRight color={Colors.cyan} size={14} />
              </TouchableOpacity>
            }
          />

          <LuxuryCard
            card={featuredCard}
            onPress={() => navigation.navigate(AppRoutes.CARD_SCREEN)}
          />

          {/* Pipeline Funnel Tracker */}
          <SectionHeader title="Application Funnel" />
          <GlassView style={styles.funnelCard} borderRadius={18}>
            <View style={styles.funnelRow}>
              <View style={styles.funnelStep}>
                <Text style={styles.funnelCount}>14</Text>
                <Text style={styles.funnelName}>KYC Review</Text>
                <View style={[styles.funnelBar, { backgroundColor: Colors.cyan }]} />
              </View>

              <View style={styles.funnelStep}>
                <Text style={styles.funnelCount}>12</Text>
                <Text style={styles.funnelName}>Underwriting</Text>
                <View style={[styles.funnelBar, { backgroundColor: Colors.amber }]} />
              </View>

              <View style={styles.funnelStep}>
                <Text style={styles.funnelCount}>5</Text>
                <Text style={styles.funnelName}>Approved</Text>
                <View style={[styles.funnelBar, { backgroundColor: Colors.success }]} />
              </View>

              <View style={styles.funnelStep}>
                <Text style={styles.funnelCount}>3</Text>
                <Text style={styles.funnelName}>Dispatched</Text>
                <View style={[styles.funnelBar, { backgroundColor: Colors.purpleLavender }]} />
              </View>
            </View>

            <TouchableOpacity
              style={styles.funnelFooterBtn}
              onPress={() => navigation.navigate(AppRoutes.CLIENTS_SCREEN)}
            >
              <Text style={styles.funnelFooterText}>
                Open Full CRM Pipeline ({INITIAL_LEADS.length} Leads Active)
              </Text>
              <ArrowUpRight color={Colors.cyan} size={15} />
            </TouchableOpacity>
          </GlassView>

          {/* Recent Portfolio Card Transactions */}
          <SectionHeader title="Live Cardholder Transactions" />
          <GlassView style={styles.transactionsCard} borderRadius={18}>
            {RECENT_TRANSACTIONS.map((tx, idx) => (
              <View
                key={tx.id}
                style={[
                  styles.txItem,
                  idx < RECENT_TRANSACTIONS.length - 1 && styles.txItemBorder,
                ]}
              >
                <View style={styles.txIconWrapper}>
                  <CreditCard color={Colors.cyan} size={16} />
                </View>

                <View style={styles.txMainInfo}>
                  <Text style={styles.txMerchant}>{tx.merchant}</Text>
                  <Text style={styles.txCategory}>
                    {tx.cardName} • {tx.date}
                  </Text>
                </View>

                <View style={styles.txAmountCol}>
                  <Text style={styles.txAmount}>
                    {formatCurrency(tx.amount, { showCents: true, prefix: '-$' })}
                  </Text>
                  <Text style={styles.txCashback}>
                    +{formatCurrency(tx.cashbackEarned, { showCents: true })} cashback
                  </Text>
                </View>
              </View>
            ))}
          </GlassView>
        </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  officerName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
  },
  officerRole: {
    fontSize: 12,
    color: Colors.white60,
    marginTop: 1,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.white08,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white15,
    position: 'relative',
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.cyan,
    position: 'absolute',
    top: 10,
    right: 11,
  },
  scrollContent: CommonStyles.scrollContent,
  portfolioHero: {
    padding: 18,
    marginBottom: 16,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroLabel: {
    color: Colors.white65,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  growthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.emerald18,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.emerald35,
  },
  growthText: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '700',
  },
  heroAmount: {
    color: Colors.white,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  heroDivider: {
    height: 1,
    backgroundColor: Colors.white10,
    marginVertical: 14,
  },
  heroStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatSeparator: {
    width: 1,
    height: 24,
    backgroundColor: Colors.white12,
  },
  heroStatLabel: {
    color: Colors.white50,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 2,
  },
  heroStatValue: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
  },
  actionBtnText: CommonStyles.actionBtnText,
  actionBtnSecondaryText: {
    color: Colors.white85,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    color: Colors.cyan,
    fontSize: 12,
    fontWeight: '600',
  },
  funnelCard: {
    padding: 16,
    marginBottom: 20,
  },
  funnelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  funnelStep: {
    flex: 1,
    alignItems: 'center',
  },
  funnelCount: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  funnelName: {
    color: Colors.white60,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 6,
  },
  funnelBar: {
    width: '80%',
    height: 4,
    borderRadius: 2,
  },
  funnelFooterBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.white08,
  },
  funnelFooterText: {
    color: Colors.cyan,
    fontSize: 12,
    fontWeight: '600',
  },
  transactionsCard: {
    padding: 14,
  },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  txItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.white08,
  },
  txIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.cyan15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.cyan30,
  },
  txMainInfo: {
    flex: 1,
  },
  txMerchant: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  txCategory: {
    color: Colors.white50,
    fontSize: 10,
  },
  txAmountCol: {
    alignItems: 'flex-end',
  },
  txAmount: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  txCashback: {
    color: Colors.success,
    fontSize: 9,
    fontWeight: '600',
    marginTop: 1,
  },
});
