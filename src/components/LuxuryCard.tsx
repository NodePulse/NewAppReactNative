import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Wifi,
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
  RotateCw,
} from 'lucide-react-native';
import { CardProduct } from '../data/crmData';
import { Colors } from '../colors';
import { CommonStyles } from '../styles';
import { formatCardNumber } from '../utils';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH * 0.618; // Golden ratio for credit cards

interface LuxuryCardProps {
  card: CardProduct;
  showDetailsToggle?: boolean;
  onPress?: () => void;
  scale?: number;
}

export const LuxuryCard: React.FC<LuxuryCardProps> = ({
  card,
  showDetailsToggle = true,
  onPress,
  scale = 1,
}) => {
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [revealed, setRevealed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const formattedNumber = formatCardNumber(card.cardNumber, revealed);

  const handleToggleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    Animated.spring(flipAnim, {
      toValue: nextFlipped ? 1 : 0,
      friction: 8,
      tension: 12,
      useNativeDriver: true,
    }).start();
  };

  const frontRotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotateY = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.499, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.499, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  const cardGradientColors = card.isFrozen
    ? [Colors.slateSteel, Colors.slateMuted, Colors.slateDark]
    : card.gradient;

  const renderNetworkBadge = () => {
    if (card.network === 'MASTERCARD') {
      return (
        <View style={styles.mastercardContainer}>
          <View style={[styles.mcCircle, styles.mcRed]} />
          <View style={[styles.mcCircle, styles.mcOrange]} />
        </View>
      );
    }
    if (card.network === 'VISA') {
      return (
        <View style={styles.visaBadge}>
          <Text style={styles.visaText}>VISA</Text>
        </View>
      );
    }
    return (
      <View style={styles.amexBadge}>
        <Text style={styles.amexText}>AMEX</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.cardOuter,
        {
          width: CARD_WIDTH * scale,
          height: CARD_HEIGHT * scale,
        },
      ]}
    >
      {/* ---------------- FRONT FACE ---------------- */}
      <Animated.View
        pointerEvents={isFlipped ? 'none' : 'auto'}
        style={[
          styles.faceWrapper,
          {
            width: CARD_WIDTH * scale,
            height: CARD_HEIGHT * scale,
            opacity: frontOpacity,
            transform: [{ perspective: 1200 }, { rotateY: frontRotateY }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={onPress ? 0.9 : 1}
          onPress={onPress}
          style={styles.cardTouchable}
        >
          <LinearGradient
            colors={cardGradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            {/* Holographic light glass sweep */}
            <LinearGradient
              colors={[
                Colors.white28,
                Colors.white08,
                'transparent',
                Colors.white04,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.8 }}
              style={styles.lightSweep}
            />

            {/* Top Header Row */}
            <View style={styles.cardHeader}>
              <View style={styles.tierContainer}>
                <View
                  style={[
                    styles.tierPill,
                    {
                      backgroundColor: card.isFrozen
                        ? Colors.slate20
                        : Colors.white18,
                    },
                  ]}
                >
                  <Text style={[styles.tierText, { color: card.textColor }]}>
                    {card.type} • {card.category}
                  </Text>
                </View>
                {card.isFrozen ? (
                  <View style={styles.frozenBadge}>
                    <Lock color={Colors.cyan} size={12} />
                    <Text style={styles.frozenText}>FROZEN</Text>
                  </View>
                ) : (
                  <View style={styles.activeBadge}>
                    <CheckCircle2 color={Colors.success} size={12} />
                    <Text style={styles.activeText}>ACTIVE</Text>
                  </View>
                )}
              </View>

              <Text style={[styles.cardBrandTitle, { color: card.textColor }]}>
                {card.name}
              </Text>
            </View>

            {/* Middle Row: Gold Chip & Contactless & Toggles */}
            <View style={styles.middleRow}>
              {/* EMV Gold Chip */}
              <View style={styles.chipOuter}>
                <LinearGradient
                  colors={[Colors.goldBright, Colors.gold, Colors.goldDark]}
                  style={styles.chipGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.chipLineHorizontal} />
                  <View style={styles.chipLineVertical} />
                  <View style={styles.chipCore} />
                </LinearGradient>
              </View>

              {/* Contactless Wave */}
              <View style={styles.contactlessContainer}>
                <Wifi
                  color={Colors.white75}
                  size={22}
                  style={styles.wifiRotate}
                />
              </View>

              {showDetailsToggle && (
                <View style={styles.toggleButtonGroup}>
                  {/* Reveal / Hide Number */}
                  <TouchableOpacity
                    onPress={() => setRevealed(!revealed)}
                    style={styles.revealButton}
                    activeOpacity={0.7}
                  >
                    {revealed ? (
                      <EyeOff color={Colors.white85} size={15} />
                    ) : (
                      <Eye color={Colors.white85} size={15} />
                    )}
                    <Text style={styles.revealText}>
                      {revealed ? 'Hide' : 'Reveal'}
                    </Text>
                  </TouchableOpacity>

                  {/* Show CVV / Rotate 3D Card */}
                  <TouchableOpacity
                    onPress={handleToggleFlip}
                    style={[styles.revealButton, styles.cvvButton]}
                    activeOpacity={0.7}
                  >
                    <RotateCw color={Colors.cyan} size={14} />
                    <Text style={[styles.revealText, styles.cvvText]}>
                      CVV
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Card Number */}
            <View style={styles.numberRow}>
              <Text
                style={[
                  styles.cardNumber,
                  scale < 0.9
                    ? styles.cardNumberCompact
                    : styles.cardNumberStandard,
                  { color: card.textColor },
                ]}
              >
                {formattedNumber}
              </Text>
            </View>

            {/* Bottom Row */}
            <View style={styles.cardFooter}>
              <View>
                <Text style={styles.labelSub}>CARDHOLDER</Text>
                <Text
                  numberOfLines={1}
                  style={[styles.cardholderName, { color: card.textColor }]}
                >
                  {card.cardholderName}
                </Text>
              </View>

              <View style={styles.dateCvvContainer}>
                <View style={styles.detailBlock}>
                  <Text style={styles.labelSub}>EXPIRES</Text>
                  <Text style={[styles.detailValue, { color: card.textColor }]}>
                    {card.expiry}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.detailBlock}
                  onPress={handleToggleFlip}
                  activeOpacity={0.7}
                >
                  <Text style={styles.labelSub}>SECURITY</Text>
                  <View style={styles.cvvIndicatorPill}>
                    <Text style={styles.cvvIndicatorText}>Show CVV ↻</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Network Logo Badge */}
              <View style={styles.networkBadgeContainer}>
                {renderNetworkBadge()}
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* ---------------- BACK FACE (REVERSE 3D) ---------------- */}
      <Animated.View
        pointerEvents={isFlipped ? 'auto' : 'none'}
        style={[
          styles.faceWrapper,
          styles.backFaceWrapper,
          {
            width: CARD_WIDTH * scale,
            height: CARD_HEIGHT * scale,
            opacity: backOpacity,
            transform: [{ perspective: 1200 }, { rotateY: backRotateY }],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={handleToggleFlip}
          style={styles.cardTouchable}
        >
          <LinearGradient
            colors={cardGradientColors}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.cardGradient}
          >
            {/* Magnetic Stripe */}
            <View style={styles.magneticStripeContainer}>
              <LinearGradient
                colors={[Colors.slateDark, Colors.slateDarkest, Colors.slateMuted]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.magneticStripe}
              >
                <View style={styles.magneticStripeLine} />
              </LinearGradient>
            </View>

            {/* Signature Strip & CVV Box */}
            <View style={styles.signatureRow}>
              <View style={styles.signatureStrip}>
                <Text style={styles.signatureWatermark}>
                  AUTHORIZED SIGNATURE • NOT VALID UNLESS SIGNED
                </Text>
              </View>

              {/* CVV Security Code Box */}
              <View style={styles.cvvWhiteBox}>
                <Text style={styles.cvvCodeText}>{card.cvv}</Text>
                <Text style={styles.cvvLabelMicro}>CVC</Text>
              </View>
            </View>

            {/* Middle Row: Hologram & Issuer Text */}
            <View style={styles.backMiddleRow}>
              {/* Holographic Prismatic Patch */}
              <View style={styles.hologramOuter}>
                <LinearGradient
                  colors={[
                    Colors.blueLight,
                    Colors.violetLight,
                    Colors.fuchsiaLight,
                    Colors.emeraldLight,
                    Colors.amberLight,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.hologramGradient}
                >
                  <Text style={styles.hologramText}>SECURE</Text>
                </LinearGradient>
              </View>

              {/* Legal & Concierge Disclaimer */}
              <View style={styles.disclaimerBox}>
                <Text style={styles.disclaimerText}>
                  This card is property of OmniCard Financial Bank. Subject to
                  cardholder agreement. 24/7 Global Concierge: +1 (800)
                  555-OMNI.
                </Text>
              </View>
            </View>

            {/* Back Footer: Flip to Front Button & Network */}
            <View style={styles.backFooterRow}>
              <TouchableOpacity
                onPress={handleToggleFlip}
                style={styles.flipFrontBtn}
                activeOpacity={0.7}
              >
                <RotateCw color={Colors.white} size={14} />
                <Text style={styles.flipFrontBtnText}>Flip to Front</Text>
              </TouchableOpacity>

              <View style={styles.networkBadgeContainer}>
                {renderNetworkBadge()}
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default LuxuryCard;

const styles = StyleSheet.create({
  cardOuter: {
    marginVertical: 10,
    alignSelf: 'center',
    position: 'relative',
  },
  faceWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: Colors.white22,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.5,
    shadowRadius: 22,
    elevation: 12,
  },
  backFaceWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardTouchable: {
    flex: 1,
  },
  cardGradient: {
    flex: 1,
    padding: 18,
    justifyContent: 'space-between',
    position: 'relative',
  },
  lightSweep: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardHeader: CommonStyles.rowBetween,
  tierContainer: {
    ...CommonStyles.row,
    gap: 8,
  },
  tierPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.white25,
  },
  tierText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  frozenBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.cyan20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.cyan,
  },
  frozenText: {
    color: Colors.cyan,
    fontSize: 9,
    fontWeight: '800',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.emerald20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.emeraldLight,
  },
  activeText: {
    color: Colors.emeraldLight,
    fontSize: 9,
    fontWeight: '800',
  },
  cardBrandTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginVertical: 4,
  },
  chipOuter: {
    width: 44,
    height: 32,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.amberDeep,
  },
  chipGradient: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.amberRust,
  },
  chipLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: Colors.amberRust,
  },
  chipCore: {
    width: 16,
    height: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.amberRust,
    backgroundColor: Colors.gold30,
  },
  contactlessContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wifiRotate: {
    transform: [{ rotate: '90deg' }],
  },
  toggleButtonGroup: {
    marginLeft: 'auto',
    flexDirection: 'row',
    gap: 8,
  },
  revealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.black35,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.white20,
  },
  cvvButton: {
    borderColor: Colors.cyan50,
    backgroundColor: Colors.blue20,
  },
  revealText: {
    color: Colors.white85,
    fontSize: 11,
    fontWeight: '600',
  },
  cvvText: {
    color: Colors.cyan,
    fontWeight: '800',
  },
  numberRow: {
    marginVertical: 4,
  },
  cardNumber: {
    fontSize: 19,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
    textShadowColor: Colors.black65,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardNumberCompact: {
    letterSpacing: 1.5,
  },
  cardNumberStandard: {
    letterSpacing: 2.6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  labelSub: {
    color: Colors.white60,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  cardholderName: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
    maxWidth: 130,
  },
  dateCvvContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
  },
  detailBlock: {
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  cvvIndicatorPill: {
    backgroundColor: Colors.cyan20,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.cyan40,
  },
  cvvIndicatorText: {
    color: Colors.cyan,
    fontSize: 10,
    fontWeight: '700',
  },
  networkBadgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mastercardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 42,
    height: 26,
    position: 'relative',
  },
  mcCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
  },
  mcRed: {
    backgroundColor: Colors.redMastercard,
    left: 0,
    opacity: 0.95,
  },
  mcOrange: {
    backgroundColor: Colors.orangeMastercard,
    right: 0,
    opacity: 0.88,
  },
  visaBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: Colors.white25,
    borderRadius: 4,
  },
  visaText: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: 16,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  amexBadge: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: Colors.blueVisa,
    borderRadius: 4,
  },
  amexText: {
    color: Colors.white,
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 1,
  },

  // ---------------- BACK FACE STYLES ----------------
  magneticStripeContainer: {
    marginHorizontal: -18,
    marginTop: -4,
  },
  magneticStripe: {
    height: 38,
    width: '100%',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.white08,
  },
  magneticStripeLine: {
    height: 1,
    backgroundColor: Colors.white10,
  },
  signatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  signatureStrip: {
    flex: 1,
    height: 32,
    backgroundColor: Colors.slateGhost,
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  signatureWatermark: {
    color: Colors.slateLight,
    fontSize: 7,
    fontStyle: 'italic',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cvvWhiteBox: {
    width: 60,
    height: 32,
    backgroundColor: Colors.white,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.cyan,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  cvvCodeText: {
    color: Colors.slateDark,
    fontSize: 14,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: 2,
    fontVariant: ['tabular-nums'],
  },
  cvvLabelMicro: {
    position: 'absolute',
    bottom: 1,
    right: 3,
    fontSize: 6,
    fontWeight: '900',
    color: Colors.slateGray,
  },
  backMiddleRow: {
    ...CommonStyles.row,
    gap: 12,
    marginVertical: 4,
  },
  hologramOuter: {
    width: 38,
    height: 30,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.white50,
  },
  hologramGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hologramText: {
    fontSize: 7,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 0.8,
  },
  disclaimerBox: {
    flex: 1,
  },
  disclaimerText: {
    color: Colors.white60,
    fontSize: 8,
    lineHeight: 11,
  },
  backFooterRow: CommonStyles.rowBetween,
  flipFrontBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.cyan25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.cyan,
  },
  flipFrontBtnText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
});
