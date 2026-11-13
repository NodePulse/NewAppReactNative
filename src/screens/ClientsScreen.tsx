import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Filter,
  Check,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  UserCheck,
} from 'lucide-react-native';
import {
  ScreenContainer,
  ScreenHeader,
  LiveBadge,
  SearchBar,
  FilterPills,
  GlassView,
  NeumorphicButton,
} from '../components/ui';
import { CRMLead, INITIAL_LEADS } from '../data/crmData';
import { Colors } from '../colors';
import { CommonStyles } from '../styles';
import {
  getScoreColor,
  getScoreRating,
  getStageBadge,
  filterLeads,
  formatCurrency,
} from '../utils';

export default function ClientsScreen() {
  const [leads, setLeads] = useState<CRMLead[]>(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'UNDERWRITING' | 'KYC_REVIEW' | 'APPROVED' | 'DISPATCHED'>('ALL');

  const filterTabs = [
    { key: 'ALL', label: 'All (5)' },
    { key: 'UNDERWRITING', label: 'Underwriting' },
    { key: 'KYC_REVIEW', label: 'KYC Review' },
    { key: 'APPROVED', label: 'Approved' },
    { key: 'DISPATCHED', label: 'Dispatched' },
  ] as const;

  const filteredLeads = filterLeads(leads, searchQuery, selectedFilter);

  const handleApprove = (leadId: string, clientName: string) => {
    Alert.alert(
      'Issue Card Approval',
      `Approve credit application for ${clientName} and initiate card manufacturing & dispatch?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve & Issue',
          style: 'default',
          onPress: () => {
            setLeads(prev =>
              prev.map(l => (l.id === leadId ? { ...l, stage: 'APPROVED' } : l))
            );
            Alert.alert('Approved!', `Card has been issued to ${clientName}. Tracking number generated.`);
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer
      primaryColor={Colors.purple}
      secondaryColor={Colors.blue}
      tertiaryColor={Colors.emerald}
      edges={['top']}
    >
      {/* Header */}
      <ScreenHeader
        title="Client Applications"
        subtitle="Credit & Debit card underwriting, KYC & issuance"
        badge={<LiveBadge label="CRM PIPELINE • ACTIVE" />}
      />

      {/* Search Bar - Glassmorphism */}
      <SearchBar
        placeholder="Search by client name, email or card..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Pills - Neumorphic Tabs */}
      <FilterPills
        scrollable={true}
        items={filterTabs}
        selectedKey={selectedFilter}
        onSelect={setSelectedFilter}
        accentColor={Colors.violet}
      />

        {/* Application Cards List */}
        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredLeads.map(lead => {
            const stageInfo = getStageBadge(lead.stage);
            const scoreColor = getScoreColor(lead.creditScore);

            return (
              <GlassView
                key={lead.id}
                style={styles.leadCard}
                borderRadius={18}
                highlightIntensity="medium"
              >
                {/* Top Row: Name & Stage Badge */}
                <View style={styles.leadTopRow}>
                  <View style={styles.clientAvatarWrapper}>
                    <View style={styles.avatarGradient}>
                      <Text style={styles.avatarInitial}>
                        {lead.clientName.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.clientName}>{lead.clientName}</Text>
                      <View style={styles.leadAppliedRow}>
                        <Clock color={Colors.white50} size={11} />
                        <Text style={styles.appliedTime}>{lead.appliedDate}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.stagePill,
                      {
                        backgroundColor: stageInfo.bg,
                        borderColor: stageInfo.border,
                      },
                    ]}
                  >
                    <Text style={[styles.stageText, { color: stageInfo.text }]}>
                      {stageInfo.label}
                    </Text>
                  </View>
                </View>

                {/* Middle Info Block: Product, Credit Score, Limit */}
                <View style={styles.leadDetailsGrid}>
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>REQUESTED CARD</Text>
                    <Text style={styles.detailValueBold} numberOfLines={1}>
                      {lead.requestedProduct}
                    </Text>
                    <Text style={styles.productTypeTag}>{lead.productType}</Text>
                  </View>

                  <View style={styles.scoreCol}>
                    <Text style={styles.detailLabel}>CREDIT SCORE</Text>
                    <View style={styles.scoreBadge}>
                      <View
                        style={[styles.scoreDot, { backgroundColor: scoreColor }]}
                      />
                      <Text style={[styles.scoreNumber, { color: scoreColor }]}>
                        {lead.creditScore}
                      </Text>
                      <Text style={styles.scoreRating}>
                        {getScoreRating(lead.creditScore)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.limitCol}>
                    <Text style={styles.detailLabel}>REQ. LIMIT</Text>
                    <Text style={styles.limitValue}>
                      {formatCurrency(lead.requestedLimit)}
                    </Text>
                    <Text style={styles.incomeText}>
                      Inc: {lead.annualIncome}
                    </Text>
                  </View>
                </View>

                {/* Contact Row */}
                <View style={styles.contactRow}>
                  <View style={styles.contactItem}>
                    <Mail color={Colors.white50} size={12} />
                    <Text style={styles.contactText} numberOfLines={1}>
                      {lead.email}
                    </Text>
                  </View>
                  <View style={styles.contactItem}>
                    <Phone color={Colors.white50} size={12} />
                    <Text style={styles.contactText}>{lead.phone}</Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.leadActionsRow}>
                  {lead.stage !== 'APPROVED' && lead.stage !== 'DISPATCHED' ? (
                    <>
                      <NeumorphicButton
                        onPress={() => handleApprove(lead.id, lead.clientName)}
                        style={styles.approveButton}
                        active={true}
                        accentColor={Colors.emerald}
                        borderRadius={10}
                      >
                        <Check color={Colors.white} size={14} />
                        <Text style={styles.actionBtnText}>Approve & Issue</Text>
                      </NeumorphicButton>

                      <NeumorphicButton
                        onPress={() =>
                          Alert.alert(
                            'Quick KYC Verification',
                            `Identity documents & tax verification verified via Plaid/Experian for ${lead.clientName}.`
                          )
                        }
                        style={styles.verifyButton}
                        borderRadius={10}
                      >
                        <ShieldCheck color={Colors.cyan} size={14} />
                        <Text style={styles.verifyBtnText}>Verify KYC</Text>
                      </NeumorphicButton>
                    </>
                  ) : (
                    <View style={styles.issuedBanner}>
                      <UserCheck color={Colors.success} size={16} />
                      <Text style={styles.issuedBannerText}>
                        Card Manufactured & Account Active
                      </Text>
                    </View>
                  )}
                </View>
              </GlassView>
            );
          })}

          {filteredLeads.length === 0 && (
            <GlassView style={styles.emptyContainer} borderRadius={16}>
              <Filter color={Colors.white50} size={32} />
              <Text style={styles.emptyTitle}>No matching applications</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search query or stage filter tab.
              </Text>
            </GlassView>
          )}
        </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    ...CommonStyles.scrollContent,
    gap: 14,
  },
  leadCard: {
    marginBottom: 4,
  },
  leadTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  clientAvatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarGradient: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: Colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white30,
  },
  avatarInitial: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  clientName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  leadAppliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  appliedTime: {
    color: Colors.white50,
    fontSize: 11,
  },
  stagePill: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  stageText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  leadDetailsGrid: {
    flexDirection: 'row',
    backgroundColor: Colors.black25,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.white08,
  },
  detailCol: {
    flex: 1.3,
  },
  scoreCol: {
    flex: 1,
    alignItems: 'center',
  },
  limitCol: {
    flex: 1,
    alignItems: 'flex-end',
  },
  detailLabel: {
    color: Colors.white45,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  detailValueBold: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  productTypeTag: {
    color: Colors.cyan,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  scoreDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  scoreNumber: {
    fontSize: 15,
    fontWeight: '800',
  },
  scoreRating: {
    color: Colors.white50,
    fontSize: 8,
    fontWeight: '700',
  },
  limitValue: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  incomeText: {
    color: Colors.white50,
    fontSize: 9,
    marginTop: 2,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.white08,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: '50%',
  },
  contactText: {
    color: Colors.white60,
    fontSize: 11,
  },
  leadActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  approveButton: {
    flex: 1.2,
  },
  verifyButton: {
    flex: 1,
  },
  actionBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  verifyBtnText: {
    color: Colors.cyan,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  issuedBanner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.emerald12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.emerald25,
  },
  issuedBannerText: {
    color: Colors.success,
    fontSize: 12,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  emptySubtitle: {
    color: Colors.white50,
    fontSize: 12,
    textAlign: 'center',
  },
});
