import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from './colors';

/**
 * Common Layout Primitives
 */
export const Layout = StyleSheet.create({
  flex1: {
    flex: 1,
  } as ViewStyle,

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,

  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  } as ViewStyle,

  safeArea: {
    flex: 1,
  } as ViewStyle,

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 130,
  } as ViewStyle,

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  } as ViewStyle,

  headerSimple: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  } as ViewStyle,

  authContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  } as ViewStyle,
});

/**
 * Common Typography Primitives
 */
export const Typography = StyleSheet.create({
  screenTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.5,
  } as TextStyle,

  screenSubtitle: {
    fontSize: 12,
    color: Colors.white60,
    marginTop: 2,
  } as TextStyle,

  sectionHeading: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 12,
  } as TextStyle,

  sectionHeadingMarginTop: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: 0.3,
  } as TextStyle,

  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -0.5,
  } as TextStyle,

  brandSubtitle: {
    fontSize: 12,
    color: Colors.white60,
    marginTop: 4,
    textAlign: 'center',
  } as TextStyle,

  inputLabel: {
    color: Colors.white60,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 6,
  } as TextStyle,

  liveBadgeText: {
    color: Colors.emerald,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  } as TextStyle,

  actionBtnText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  } as TextStyle,
});

/**
 * Common Form & Input Primitives
 */
export const Forms = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white08,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.white15,
    gap: 10,
  } as ViewStyle,

  input: {
    flex: 1,
    height: 46,
    color: Colors.white,
    fontSize: 14,
  } as TextStyle,
});

/**
 * Status Indicators & Badges
 */
export const Badges = StyleSheet.create({
  liveBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  } as ViewStyle,

  livePulse: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.emerald,
  } as ViewStyle,
});

/**
 * Shadows & Specular Glass Overlays
 */
export const Shadows = StyleSheet.create({
  glassCard: {
    borderWidth: 1.2,
    borderColor: Colors.white12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
    backgroundColor: Colors.slateGlass,
  } as ViewStyle,

  elevatedIsland: {
    borderRadius: 28,
    borderWidth: 1.2,
    borderColor: Colors.white16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.55,
    shadowRadius: 22,
    elevation: 16,
  } as ViewStyle,

  specularShine: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: Colors.white35,
  } as ViewStyle,
});

/**
 * Unified CommonStyles Registry
 */
export const CommonStyles = {
  // Layouts
  screenContainer: Layout.screenContainer,
  safeArea: Layout.safeArea,
  scrollContent: Layout.scrollContent,
  header: Layout.header,
  headerSimple: Layout.headerSimple,
  authContent: Layout.authContent,
  row: Layout.row,
  rowBetween: Layout.rowBetween,
  center: Layout.center,
  flex1: Layout.flex1,

  // Typography
  screenTitle: Typography.screenTitle,
  screenSubtitle: Typography.screenSubtitle,
  sectionHeading: Typography.sectionHeading,
  sectionHeadingMarginTop: Typography.sectionHeadingMarginTop,
  brandTitle: Typography.brandTitle,
  brandSubtitle: Typography.brandSubtitle,
  inputLabel: Typography.inputLabel,
  liveBadgeText: Typography.liveBadgeText,
  actionBtnText: Typography.actionBtnText,

  // Form Elements
  inputRow: Forms.inputRow,
  input: Forms.input,

  // Badges & Indicators
  liveBadgeRow: Badges.liveBadgeRow,
  livePulse: Badges.livePulse,

  // Glass & Shadows
  glassCard: Shadows.glassCard,
  elevatedIsland: Shadows.elevatedIsland,
  specularShine: Shadows.specularShine,
};

export default CommonStyles;

