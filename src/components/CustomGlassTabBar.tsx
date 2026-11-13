import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { AppRoutes } from '../navigations/AppRoutes';
import {
  AppHomeIcon,
  AppCardIcon,
  AppClientsIcon,
  AppProfileIcon,
} from './ui/icons';
import { Colors } from '../colors';
import { CommonStyles } from '../styles';
import { withAlpha } from '../utils';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ORB_SIZE = 56;
const TAB_BAR_HORIZONTAL_MARGIN = 16;
const TAB_BAR_PADDING_HORIZONTAL = 8;
const INITIAL_ROW_WIDTH =
  SCREEN_WIDTH - TAB_BAR_HORIZONTAL_MARGIN * 2 - TAB_BAR_PADDING_HORIZONTAL * 2;

export const CustomGlassTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const bottomMargin = Math.max(insets.bottom, Platform.OS === 'ios' ? 14 : 12);

  // Tab row width measurement for pixel-perfect dynamic centering
  const [tabRowWidth, setTabRowWidth] =
    React.useState<number>(INITIAL_ROW_WIDTH);

  const onTabsLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0 && Math.abs(width - tabRowWidth) > 1) {
      setTabRowWidth(width);
    }
  };

  const numTabs = state.routes.length;
  const tabWidth = tabRowWidth / Math.max(numTabs, 1);

  // Native animated value for active tab index
  const slideAnim = React.useRef(new Animated.Value(state.index)).current;

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: state.index,
      friction: 7.5,
      tension: 50,
      useNativeDriver: true,
    }).start();
  }, [state.index, slideAnim]);

  // Interpolate translateX to glide the 3D elevated orb & surface reflection pill
  const translateX = slideAnim.interpolate({
    inputRange: state.routes.map((_, i) => i),
    outputRange: state.routes.map(
      (_, i) => i * tabWidth + (tabWidth - ORB_SIZE) / 2,
    ),
  });

  // Dynamic squash & stretch physics during transit
  const stretchInputRange: number[] = [];
  const stretchScaleX: number[] = [];
  const stretchScaleY: number[] = [];

  for (let i = 0; i < numTabs; i++) {
    stretchInputRange.push(i);
    stretchScaleX.push(1);
    stretchScaleY.push(1);
    if (i < numTabs - 1) {
      stretchInputRange.push(i + 0.5);
      stretchScaleX.push(1.09);
      stretchScaleY.push(0.93);
    }
  }

  const orbScaleX = slideAnim.interpolate({
    inputRange: stretchInputRange,
    outputRange: stretchScaleX,
    extrapolate: 'clamp',
  });

  const orbScaleY = slideAnim.interpolate({
    inputRange: stretchInputRange,
    outputRange: stretchScaleY,
    extrapolate: 'clamp',
  });

  // Render tab icon helper
  const renderIcon = (routeName: string, active: boolean) => {
    const iconColor = active ? Colors.white : Colors.white45;
    const iconSize = active ? 24 : 20;

    switch (routeName) {
      case AppRoutes.HOME_SCREEN:
        return (
          <AppHomeIcon color={iconColor} size={iconSize} focused={active} />
        );
      case AppRoutes.CARD_SCREEN:
        return (
          <AppCardIcon color={iconColor} size={iconSize} focused={active} />
        );
      case AppRoutes.CLIENTS_SCREEN:
        return (
          <AppClientsIcon color={iconColor} size={iconSize} focused={active} />
        );
      case AppRoutes.PROFILE_SCREEN:
        return (
          <AppProfileIcon color={iconColor} size={iconSize} focused={active} />
        );
      default:
        return (
          <AppHomeIcon color={iconColor} size={iconSize} focused={active} />
        );
    }
  };

  return (
    <View style={styles.tabBarRoot} pointerEvents="box-none">
      {/* Ambient gradient mask covering the home indicator area so background text doesn't bleed through */}
      <LinearGradient
        colors={[
          'transparent',
          withAlpha(Colors.background, 0.82),
          Colors.background,
        ]}
        style={[styles.bottomFadeMask, { height: bottomMargin + 48 }]}
        pointerEvents="none"
      />

      {/* Floating Island Tab Bar */}
      <View
        style={[styles.floatingWrapper, { bottom: bottomMargin }]}
        pointerEvents="box-none"
      >
        {/* Outer Floating Island Bar */}
        <View style={styles.floatingContainer}>
        <LinearGradient
          colors={[
            Colors.tabSurfaceLight,
            Colors.tabSurfaceMid,
            Colors.tabSurfaceDark,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientSurface}
        >
          {/* Gliding 3D Elevated Convex Orb with Specular Shine & Halo */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.slidingOrbWrapper,
              {
                transform: [
                  { translateX },
                  { scaleX: orbScaleX },
                  { scaleY: orbScaleY },
                ],
              },
            ]}
          >
            {/* Ambient Under-Glow Halo */}
            <View style={styles.glowHalo} />

            {/* 3D Convex Raised Orb Sphere */}
            <LinearGradient
              colors={[Colors.cyan, Colors.blueDark, Colors.blueMidnight]}
              start={{ x: 0.1, y: 0 }}
              end={{ x: 0.85, y: 1 }}
              style={styles.orb3D}
            >
              {/* 3D Specular Upper Bevel Shine */}
              <View style={styles.orbBevelShine} />

              {/* Reactive Active Icons & Badges */}
              <View style={styles.orbIconContainer}>
                {state.routes.map((route, i) => {
                  const activeOpacity = slideAnim.interpolate({
                    inputRange: [i - 0.45, i, i + 0.45],
                    outputRange: [0, 1, 0],
                    extrapolate: 'clamp',
                  });
                  const activeScale = slideAnim.interpolate({
                    inputRange: [i - 0.45, i, i + 0.45],
                    outputRange: [0.55, 1, 0.55],
                    extrapolate: 'clamp',
                  });

                  const { options } = descriptors[route.key];
                  const badge = options.tabBarBadge;

                  return (
                    <Animated.View
                      key={`active-orb-${route.key}`}
                      style={[
                        styles.orbIconSlot,
                        {
                          opacity: activeOpacity,
                          transform: [{ scale: activeScale }],
                        },
                      ]}
                    >
                      {renderIcon(route.name, true)}
                      {badge !== undefined && (
                        <View style={styles.floatingBadge3D}>
                          <Text style={styles.floatingBadgeText3D}>
                            {badge}
                          </Text>
                        </View>
                      )}
                    </Animated.View>
                  );
                })}
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Tab Buttons Row */}
          <View style={styles.tabsRow} onLayout={onTabsLayout}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;

              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const badge = options.tabBarBadge;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              // Native animated opacity & scale for resting icon & label
              const restingOpacity = slideAnim.interpolate({
                inputRange: [index - 0.45, index, index + 0.45],
                outputRange: [1, 0, 1],
                extrapolate: 'clamp',
              });

              const restingScale = slideAnim.interpolate({
                inputRange: [index - 0.45, index, index + 0.45],
                outputRange: [1, 0.72, 1],
                extrapolate: 'clamp',
              });

              const activeLabelOpacity = slideAnim.interpolate({
                inputRange: [index - 0.45, index, index + 0.45],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp',
              });

              const inactiveLabelOpacity = slideAnim.interpolate({
                inputRange: [index - 0.45, index, index + 0.45],
                outputRange: [1, 0, 1],
                extrapolate: 'clamp',
              });

              return (
                <TouchableOpacity
                  key={route.key}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  activeOpacity={0.7}
                  style={styles.tabButton}
                >
                  {/* Resting Inactive Icon */}
                  <Animated.View
                    style={[
                      styles.restingIconContainer,
                      {
                        opacity: restingOpacity,
                        transform: [{ scale: restingScale }],
                      },
                    ]}
                  >
                    {renderIcon(route.name, false)}
                    {badge !== undefined && (
                      <View
                        style={[
                          styles.inactiveBadge,
                          route.name === AppRoutes.CARD_SCREEN
                            ? styles.badgeCyan
                            : styles.badgeViolet,
                        ]}
                      >
                        <Text
                          style={[
                            styles.inactiveBadgeText,
                            route.name === AppRoutes.CARD_SCREEN
                              ? styles.badgeDarkText
                              : styles.badgeLightText,
                          ]}
                        >
                          {badge}
                        </Text>
                      </View>
                    )}
                  </Animated.View>

                  {/* Vertically Aligned Cross-Fading Labels */}
                  <View style={styles.labelSlot}>
                    <Animated.Text
                      style={[
                        styles.inactiveLabel,
                        { opacity: inactiveLabelOpacity },
                      ]}
                      numberOfLines={1}
                    >
                      {String(label)}
                    </Animated.Text>
                    <Animated.Text
                      style={[
                        styles.activeLabel3D,
                        { opacity: activeLabelOpacity },
                      ]}
                      numberOfLines={1}
                    >
                      {String(label)}
                    </Animated.Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      </View>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  tabBarRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  bottomFadeMask: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  floatingWrapper: {
    position: 'absolute',
    left: TAB_BAR_HORIZONTAL_MARGIN,
    right: TAB_BAR_HORIZONTAL_MARGIN,
    alignItems: 'center',
    zIndex: 99,
  },
  floatingContainer: {
    width: '100%',
    ...CommonStyles.elevatedIsland,
  },
  gradientSurface: {
    borderRadius: 28,
    paddingTop: 10,
    paddingBottom: 8,
    paddingHorizontal: TAB_BAR_PADDING_HORIZONTAL,
  },
  specularShine: CommonStyles.specularShine,

  // ---------------- SURFACE REFLECTION PILL ----------------
  surfaceReflectionPill: {
    position: 'absolute',
    top: 6,
    left: TAB_BAR_PADDING_HORIZONTAL,
    width: ORB_SIZE,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.cyan08,
    borderWidth: 1,
    borderColor: Colors.cyan22,
    zIndex: 10,
  },

  // ---------------- 3D ELEVATED SLIDING ORB ----------------
  slidingOrbWrapper: {
    position: 'absolute',
    top: -26,
    left: TAB_BAR_PADDING_HORIZONTAL,
    width: ORB_SIZE,
    height: ORB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  glowHalo: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.cyan,
    opacity: 0.45,
    shadowColor: Colors.cyan,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.85,
    shadowRadius: 16,
    elevation: 12,
  },
  orb3D: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white80,
    shadowColor: Colors.cyanDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.75,
    shadowRadius: 14,
    elevation: 20,
    position: 'relative',
  },
  orbBevelShine: {
    position: 'absolute',
    top: 2,
    left: 8,
    right: 8,
    height: 14,
    borderRadius: 10,
    backgroundColor: Colors.white38,
  },
  orbIconContainer: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  orbIconSlot: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingBadge3D: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.rose,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.white,
    shadowColor: Colors.rose,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
  },
  floatingBadgeText3D: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '900',
  },

  // ---------------- TAB ROW & TOUCHABLE BUTTONS ----------------
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  restingIconContainer: {
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  labelSlot: {
    height: 16,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  inactiveLabel: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '600',
    color: Colors.white45,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  activeLabel3D: {
    position: 'absolute',
    fontSize: 14,
    bottom: 10,
    fontWeight: '800',
    color: Colors.cyan,
    letterSpacing: 0.4,
    textAlign: 'center',
    textShadowColor: Colors.cyan75,
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },

  // ---------------- INACTIVE BADGES ----------------
  inactiveBadge: {
    position: 'absolute',
    top: -5,
    right: -14,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCyan: {
    backgroundColor: Colors.cyan,
    borderColor: Colors.cyanLight,
  },
  badgeViolet: {
    backgroundColor: Colors.violet,
    borderColor: Colors.violetLight,
  },
  inactiveBadgeText: {
    fontSize: 8,
    fontWeight: '900',
  },
  badgeDarkText: {
    color: Colors.slateDark,
  },
  badgeLightText: {
    color: Colors.white,
  },
});
