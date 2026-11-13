import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import {
  Plus,
  Lock,
  Unlock,
  Globe,
  Smartphone,
  Award,
  Sparkles,
  Check,
  X,
} from 'lucide-react-native';
import {
  ScreenContainer,
  ScreenHeader,
  SectionHeader,
  LiveBadge,
  FilterPills,
  ControlToggleRow,
  FormInput,
  GlassView,
  NeumorphicButton,
} from '../components/ui';
import { LuxuryCard } from '../components';
import { CardProduct, INITIAL_CARDS } from '../data/crmData';
import { useScreenGuard } from '../hooks/useScreenGuard';
import { Colors } from '../colors';
import { CommonStyles } from '../styles';
import { formatCurrency, formatLastFourDigits } from '../utils';

export default function CardScreen() {
  useScreenGuard();
  const [cards, setCards] = useState<CardProduct[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string>(
    INITIAL_CARDS[0].id,
  );
  const [productTypeFilter, setProductTypeFilter] = useState<
    'ALL' | 'CREDIT' | 'DEBIT'
  >('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Card Form state
  const [newCardName, setNewCardName] = useState('');
  const [newCardholder, setNewCardholder] = useState('');
  const [newCardType, setNewCardType] = useState<'CREDIT' | 'DEBIT'>('CREDIT');
  const [newLimit, setNewLimit] = useState('');

  const selectedCard = cards.find(c => c.id === selectedCardId) || cards[0];

  const filteredCards = cards.filter(card => {
    if (productTypeFilter === 'ALL') return true;
    return card.type === productTypeFilter;
  });

  const toggleFreeze = (cardId: string) => {
    setCards(prev =>
      prev.map(c => {
        if (c.id === cardId) {
          const newFrozen = !c.isFrozen;
          Alert.alert(
            newFrozen ? 'Card Frozen' : 'Card Activated',
            `Card "${c.name}" has been ${
              newFrozen ? 'temporarily locked' : 'unlocked'
            } for all transactions.`,
          );
          return {
            ...c,
            isFrozen: newFrozen,
            status: newFrozen ? 'FROZEN' : 'ACTIVE',
          };
        }
        return c;
      }),
    );
  };

  const toggleSetting = (
    cardId: string,
    setting: 'onlinePayments' | 'internationalUsage' | 'contactless',
  ) => {
    setCards(prev =>
      prev.map(c => {
        if (c.id === cardId) {
          return { ...c, [setting]: !c[setting] };
        }
        return c;
      }),
    );
  };

  const handleCreateCard = () => {
    if (!newCardName.trim() || !newCardholder.trim() || !newLimit.trim()) {
      Alert.alert(
        'Missing Fields',
        'Please complete all card product details.',
      );
      return;
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newCard: CardProduct = {
      id: `card-${Date.now()}`,
      name: newCardName.trim(),
      type: newCardType,
      category: 'PREMIUM',
      cardholderName: newCardholder.trim().toUpperCase(),
      cardNumber: `4111 8901 2345 ${randomDigits}`,
      expiry: '12/29',
      cvv: `${Math.floor(100 + Math.random() * 900)}`,
      network: 'VISA',
      gradient:
        newCardType === 'CREDIT'
          ? [Colors.indigoDark, Colors.indigo, Colors.indigoLight]
          : [Colors.emeraldPine, Colors.emeraldDark, Colors.emerald],
      textColor: Colors.white,
      accentColor: Colors.cyan,
      creditLimit: newCardType === 'CREDIT' ? Number(newLimit) : undefined,
      availableLimit: newCardType === 'CREDIT' ? Number(newLimit) : undefined,
      dailyLimit: newCardType === 'DEBIT' ? Number(newLimit) : undefined,
      annualFee: '$0 Introductory',
      cashback: '2.5% Unlimited Cashback',
      perks: [
        'Zero Forex Fee',
        'Comprehensive Travel Cover',
        'Purchase Protection',
      ],
      isFrozen: false,
      onlinePayments: true,
      internationalUsage: true,
      contactless: true,
      status: 'ACTIVE',
    };

    setCards(prev => [newCard, ...prev]);
    setSelectedCardId(newCard.id);
    setIsModalOpen(false);
    setNewCardName('');
    setNewCardholder('');
    setNewLimit('');
    Alert.alert(
      'Card Issued!',
      `"${newCard.name}" has been issued to ${newCard.cardholderName}.`,
    );
  };

  return (
    <ScreenContainer
      primaryColor={Colors.blue}
      secondaryColor={Colors.fuchsiaPink}
      tertiaryColor={Colors.purple}
      edges={['top']}
    >
      {/* Header */}
      <ScreenHeader
        title="Card Management"
        badge={
          <LiveBadge
            label="PRODUCT PORTFOLIO"
            color={Colors.cyan}
            icon={<Sparkles color={Colors.cyan} size={14} />}
          />
        }
        rightElement={
          <NeumorphicButton
            onPress={() => setIsModalOpen(true)}
            active={true}
            accentColor={Colors.blueDark}
            borderRadius={12}
            style={styles.issueButton}
          >
            <Plus color={Colors.white} size={16} />
            <Text style={styles.issueBtnText}>Issue Card</Text>
          </NeumorphicButton>
        }
      />

      {/* Filter Pills */}
      <FilterPills
        items={[
          { key: 'ALL', label: 'All Products' },
          { key: 'CREDIT', label: 'Credit Cards' },
          { key: 'DEBIT', label: 'Debit Cards' },
        ]}
        selectedKey={productTypeFilter}
        onSelect={setProductTypeFilter}
        accentColor={Colors.blue}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Active Featured Card with Full Sheen & Controls */}
        <LuxuryCard card={selectedCard} />

        {/* Quick Horizontal Card Thumbnails Switcher */}
        <SectionHeader title="Select Card Product" marginTop={20} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
          >
            {filteredCards.map(c => {
              const isSelected = c.id === selectedCard.id;
              return (
                <TouchableOpacity
                  key={c.id}
                  onPress={() => setSelectedCardId(c.id)}
                  activeOpacity={0.8}
                  style={[
                    styles.thumbnailOuter,
                    isSelected && styles.thumbnailSelected,
                  ]}
                >
                  <GlassView
                    borderRadius={14}
                    style={styles.thumbnailInner}
                    colors={
                      isSelected
                        ? [Colors.blue40, Colors.navy30]
                        : undefined
                    }
                  >
                    <View style={styles.thumbTop}>
                      <Text style={styles.thumbType}>{c.type}</Text>
                      {c.isFrozen && <Lock color={Colors.cyan} size={12} />}
                    </View>
                    <Text style={styles.thumbName} numberOfLines={1}>
                      {c.name}
                    </Text>
                    <Text style={styles.thumbNumber}>
                      {formatLastFourDigits(c.cardNumber)}
                    </Text>
                  </GlassView>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Security & Transaction Controls */}
          <SectionHeader title="Security & Usage Controls" marginTop={20} />
          <GlassView style={styles.controlsCard} borderRadius={18}>
            {/* Freeze Toggle */}
            <ControlToggleRow
              icon={
                selectedCard.isFrozen ? (
                  <Lock color={Colors.cyan} size={20} />
                ) : (
                  <Unlock color={Colors.success} size={20} />
                )
              }
              title="Freeze Card"
              description={
                selectedCard.isFrozen
                  ? 'Card locked for all purchases & ATM withdrawals'
                  : 'Instant freeze if misplaced or suspicious activity'
              }
              value={selectedCard.isFrozen}
              onValueChange={() => toggleFreeze(selectedCard.id)}
              activeTrackColor={Colors.cyanDark}
              activeThumbColor={Colors.cyan}
            />

            {/* Online Transactions */}
            <ControlToggleRow
              hasBorder={true}
              icon={<Smartphone color={Colors.purpleBright} size={20} />}
              title="Online Payments"
              description="E-commerce, subscription billing & virtual checkouts"
              value={selectedCard.onlinePayments}
              onValueChange={() =>
                toggleSetting(selectedCard.id, 'onlinePayments')
              }
              activeTrackColor={Colors.violet}
              activeThumbColor={Colors.purpleLavender}
            />

            {/* International Transactions */}
            <ControlToggleRow
              hasBorder={true}
              icon={<Globe color={Colors.blue} size={20} />}
              title="International Usage"
              description="Cross-border payments & overseas foreign transactions"
              value={selectedCard.internationalUsage}
              onValueChange={() =>
                toggleSetting(selectedCard.id, 'internationalUsage')
              }
              activeTrackColor={Colors.blueDark}
              activeThumbColor={Colors.blueLight}
            />
          </GlassView>

          {/* Card Financial Details & Perks */}
          <SectionHeader title="Financial Specs & Perks" marginTop={20} />
          <View style={styles.specsGrid}>
            <GlassView style={styles.specBox} borderRadius={16}>
              <Text style={styles.specLabel}>
                {selectedCard.type === 'CREDIT'
                  ? 'CREDIT LIMIT'
                  : 'DAILY SPEND CAP'}
              </Text>
              <Text style={styles.specValue}>
                {formatCurrency(
                  selectedCard.creditLimit ||
                  selectedCard.dailyLimit ||
                  0
                )}
              </Text>
              {selectedCard.availableLimit && (
                <Text style={styles.specSub}>
                  {formatCurrency(selectedCard.availableLimit)} Available
                </Text>
              )}
            </GlassView>

            <GlassView style={styles.specBox} borderRadius={16}>
              <Text style={styles.specLabel}>
                {selectedCard.type === 'CREDIT' ? 'PURCHASE APR' : 'ANNUAL FEE'}
              </Text>
              <Text style={styles.specValue}>
                {selectedCard.apr || selectedCard.annualFee}
              </Text>
              <Text style={styles.specSub}>{selectedCard.cashback}</Text>
            </GlassView>
          </View>

          {/* Perks List */}
          <GlassView style={styles.perksCard} borderRadius={16}>
            <View style={styles.perkHeader}>
              <Award color={Colors.amberLight} size={18} />
              <Text style={styles.perkTitle}>Included Benefits & Rewards</Text>
            </View>
            {selectedCard.perks.map((perk, i) => (
              <View key={i} style={styles.perkItem}>
                <Check color={Colors.success} size={14} />
                <Text style={styles.perkText}>{perk}</Text>
              </View>
            ))}
          </GlassView>
        </ScrollView>

        {/* Modal: Issue New Card to Client */}
        <Modal
          visible={isModalOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <GlassView
              style={styles.modalContent}
              borderRadius={24}
              highlightIntensity="high"
            >
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Issue New Card Product</Text>
                  <Text style={styles.modalSub}>
                    CRM Instant Card Underwriting
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setIsModalOpen(false)}>
                  <X color={Colors.white70} size={22} />
                </TouchableOpacity>
              </View>

              {/* Type Switcher */}
              <View style={styles.modalTypeRow}>
                <TouchableOpacity
                  onPress={() => setNewCardType('CREDIT')}
                  style={[
                    styles.modalTypeBtn,
                    newCardType === 'CREDIT' && styles.modalTypeBtnActive,
                  ]}
                >
                  <Text style={styles.modalTypeBtnText}>Credit Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setNewCardType('DEBIT')}
                  style={[
                    styles.modalTypeBtn,
                    newCardType === 'DEBIT' && styles.modalTypeBtnActive,
                  ]}
                >
                  <Text style={styles.modalTypeBtnText}>Debit Card</Text>
                </TouchableOpacity>
              </View>

              {/* Input: Card Product Name */}
              <FormInput
                label="PRODUCT NAME"
                placeholder="e.g. Royal Infinite Metal"
                value={newCardName}
                onChangeText={setNewCardName}
              />

              {/* Input: Cardholder Name */}
              <FormInput
                label="CARDHOLDER CLIENT NAME"
                placeholder="e.g. SACHIN SHARMA"
                value={newCardholder}
                onChangeText={setNewCardholder}
              />

              {/* Input: Limit */}
              <FormInput
                label={
                  newCardType === 'CREDIT'
                    ? 'APPROVED CREDIT LIMIT ($)'
                    : 'DAILY LIMIT ($)'
                }
                placeholder="e.g. 25000"
                keyboardType="numeric"
                value={newLimit}
                onChangeText={setNewLimit}
              />

              <NeumorphicButton
                onPress={handleCreateCard}
                active={true}
                accentColor={Colors.emerald}
                borderRadius={14}
                style={styles.modalSubmitBtn}
              >
                <Check color={Colors.white} size={18} />
                <Text style={styles.modalSubmitText}>Approve & Issue Card</Text>
              </NeumorphicButton>
            </GlassView>
          </View>
        </Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  issueButton: {
    paddingHorizontal: 12,
  },
  issueBtnText: CommonStyles.actionBtnText,
  scrollContent: CommonStyles.scrollContent,
  carouselContainer: {
    gap: 12,
  },
  thumbnailOuter: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: Colors.cyan,
  },
  thumbnailInner: {
    width: 140,
    padding: 12,
  },
  thumbTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  thumbType: {
    color: Colors.cyan,
    fontSize: 10,
    fontWeight: '800',
  },
  thumbName: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  thumbNumber: {
    color: Colors.white50,
    fontSize: 11,
  },
  controlsCard: {
    gap: 14,
  },
  specsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  specBox: {
    flex: 1,
    padding: 14,
  },
  specLabel: {
    color: Colors.white45,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  specValue: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
  },
  specSub: {
    color: Colors.success,
    fontSize: 11,
    fontWeight: '600',
  },
  perksCard: {
    marginTop: 14,
    gap: 10,
  },
  perkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  perkTitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perkText: {
    color: Colors.white80,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.black75,
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    padding: 22,
    backgroundColor: Colors.slateDark,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  modalTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
  modalSub: {
    color: Colors.cyan,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  modalTypeRow: {
    flexDirection: 'row',
    backgroundColor: Colors.black40,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  modalTypeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  modalTypeBtnActive: {
    backgroundColor: Colors.blueDark,
  },
  modalTypeBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  modalSubmitBtn: {
    marginTop: 10,
    paddingVertical: 14,
  },
  modalSubmitText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
});
