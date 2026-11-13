/**
 * CRM Design System & Fintech Palette
 * Centralized color tokens for glassmorphic and neumorphic UI elements.
 */

// ----------------------------------------------------
// 1. Primitive Solid Colors
// ----------------------------------------------------
export const Solids = {
  // Deep Backgrounds & Dark Neutrals
  obsidian: '#090D16',
  slateDarkest: '#020617',
  slateDark: '#0F172A',
  slateNavy: '#111827',
  slateSurface: '#141D2E',
  slateCard: '#172033',
  slateMuted: '#1E293B',
  slateBorder: '#232F47',
  slateSteel: '#334155',
  slateGray: '#64748B',
  slateLight: '#94A3B8',
  slateGhost: '#F8FAFC',
  black: '#000000',
  white: '#FFFFFF',
  charcoal: '#1c1c24',

  // Electric Cyan & Sky (Primary Brand)
  cyan: '#38BDF8',
  cyanLight: '#7DD3FC',
  cyanDark: '#0284C7',
  cyanTeal: '#06B6D4',

  // Deep Blues & Indigo
  blue: '#3B82F6',
  blueLight: '#60A5FA',
  blueDark: '#2563EB',
  blueNavy: '#1D4ED8',
  blueMidnight: '#1E3A8A',
  indigo: '#4F46E5',
  indigoDark: '#312E81',
  indigoLight: '#6366F1',

  // Emerald & Mint (Success & Credit Approvals)
  emerald: '#10B981',
  emeraldLight: '#34D399',
  emeraldDark: '#059669',
  emeraldForest: '#047857',
  emeraldDeep: '#064E3B',
  emeraldPine: '#065F46',
  tealDark: '#0F766E',
  mintIce: '#ECFDF5',

  // Amber, Gold & Warm Accents
  amber: '#F59E0B',
  amberLight: '#FBBF24',
  amberDark: '#D97706',
  amberDeep: '#B45309',
  amberRust: '#78350F',
  goldBright: '#FDE047',
  gold: '#EAB308',
  goldDark: '#CA8A04',
  goldCream: '#FFFBEB',

  // Rose, Red & Coral (Danger & Declines)
  rose: '#F43F5E',
  roseLight: '#F87171',
  redCrimson: '#DC2626',
  redMastercard: '#EB001B',
  orangeMastercard: '#F79E1B',
  blueVisa: '#006FCF',

  // Purple, Violet & Fuchsia (Pipelines & VIP Tiers)
  violet: '#7C3AED',
  violetLight: '#A78BFA',
  violetDeep: '#6D28D9',
  purple: '#8B5CF6',
  purpleBright: '#A855F7',
  purpleLavender: '#C084FC',
  fuchsia: '#C026D3',
  fuchsiaPink: '#EC4899',
  fuchsiaLight: '#F472B6',
  fuchsiaDeep: '#A21CAF',
  fuchsiaPlum: '#701A75',
  fuchsiaIce: '#FDF4FF',
} as const;

// ----------------------------------------------------
// 2. Alpha & Translucent Overlays (Glass & Neumorphism)
// ----------------------------------------------------
export const Alphas = {
  // Translucent Whites (Specular Highlights & Frosted Surfaces)
  white01: 'rgba(255, 255, 255, 0.01)',
  white02: 'rgba(255, 255, 255, 0.02)',
  white04: 'rgba(255, 255, 255, 0.04)',
  white05: 'rgba(255, 255, 255, 0.05)',
  white07: 'rgba(255, 255, 255, 0.07)',
  white08: 'rgba(255, 255, 255, 0.08)',
  white10: 'rgba(255, 255, 255, 0.1)',
  white11: 'rgba(255, 255, 255, 0.11)',
  white12: 'rgba(255, 255, 255, 0.12)',
  white15: 'rgba(255, 255, 255, 0.15)',
  white16: 'rgba(255, 255, 255, 0.16)',
  white18: 'rgba(255, 255, 255, 0.18)',
  white20: 'rgba(255, 255, 255, 0.2)',
  white22: 'rgba(255, 255, 255, 0.22)',
  white25: 'rgba(255, 255, 255, 0.25)',
  white28: 'rgba(255, 255, 255, 0.28)',
  white30: 'rgba(255, 255, 255, 0.3)',
  white35: 'rgba(255, 255, 255, 0.35)',
  white38: 'rgba(255, 255, 255, 0.38)',
  white40: 'rgba(255, 255, 255, 0.4)',
  white45: 'rgba(255, 255, 255, 0.45)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white55: 'rgba(255, 255, 255, 0.55)',
  white60: 'rgba(255, 255, 255, 0.6)',
  white65: 'rgba(255, 255, 255, 0.65)',
  white70: 'rgba(255, 255, 255, 0.7)',
  white75: 'rgba(255, 255, 255, 0.75)',
  white80: 'rgba(255, 255, 255, 0.8)',
  white85: 'rgba(255, 255, 255, 0.85)',

  // Translucent Blacks (Drop Shadows & Depressed Neumorphic insets)
  black25: 'rgba(0, 0, 0, 0.25)',
  black35: 'rgba(0, 0, 0, 0.35)',
  black40: 'rgba(0, 0, 0, 0.4)',
  black50: 'rgba(0, 0, 0, 0.5)',
  black65: 'rgba(0, 0, 0, 0.65)',
  black75: 'rgba(0, 0, 0, 0.75)',

  // Tinted Cyan Overlays
  cyan08: 'rgba(56, 189, 248, 0.08)',
  cyan12: 'rgba(56, 189, 248, 0.12)',
  cyan15: 'rgba(56, 189, 248, 0.15)',
  cyan18: 'rgba(56, 189, 248, 0.18)',
  cyan20: 'rgba(56, 189, 248, 0.2)',
  cyan22: 'rgba(56, 189, 248, 0.22)',
  cyan25: 'rgba(56, 189, 248, 0.25)',
  cyan30: 'rgba(56, 189, 248, 0.3)',
  cyan35: 'rgba(56, 189, 248, 0.35)',
  cyan40: 'rgba(56, 189, 248, 0.4)',
  cyan50: 'rgba(56, 189, 248, 0.5)',
  cyan75: 'rgba(56, 189, 248, 0.75)',

  // Tinted Emerald Overlays
  emerald12: 'rgba(52, 211, 153, 0.12)',
  emerald16: 'rgba(52, 211, 153, 0.16)',
  emerald18: 'rgba(52, 211, 153, 0.18)',
  emerald20: 'rgba(52, 211, 153, 0.2)',
  emerald25: 'rgba(52, 211, 153, 0.25)',
  emerald35: 'rgba(52, 211, 153, 0.35)',

  // Tinted Amber & Gold Overlays
  amber18: 'rgba(245, 158, 11, 0.18)',
  gold18: 'rgba(251, 191, 36, 0.18)',
  gold30: 'rgba(254, 240, 138, 0.3)',

  // Tinted Rose & Red Overlays
  red16: 'rgba(248, 113, 113, 0.16)',
  red35: 'rgba(248, 113, 113, 0.35)',

  // Tinted Purple & Violet Overlays
  purple18: 'rgba(168, 85, 247, 0.18)',
  purpleLight18: 'rgba(192, 132, 252, 0.18)',

  // Tinted Blue & Slate Overlays
  blue20: 'rgba(14, 165, 233, 0.2)',
  blue40: 'rgba(59, 130, 246, 0.4)',
  navy30: 'rgba(30, 58, 138, 0.3)',
  slate20: 'rgba(148, 163, 184, 0.2)',
  slateGlass: 'rgba(15, 23, 42, 0.55)',

  // Floating Island Tab Bar Glass Gradients
  tabSurfaceLight: 'rgba(30, 41, 59, 0.94)',
  tabSurfaceMid: 'rgba(15, 23, 42, 0.96)',
  tabSurfaceDark: 'rgba(10, 15, 26, 0.98)',
} as const;

// ----------------------------------------------------
// 3. Semantic Theme Mappings
// ----------------------------------------------------
export const Colors = {
  ...Solids,
  ...Alphas,

  // App Theme Defaults
  background: Solids.obsidian,
  surface: Solids.slateDark,
  surfaceCard: Solids.slateNavy,
  surfaceElevated: Solids.slateMuted,

  // Action / Brand
  primary: Solids.cyan,
  primaryLight: Solids.cyanLight,
  primaryDark: Solids.cyanDark,
  primaryGlow: Alphas.cyan35,

  // Status
  success: Solids.emeraldLight,
  successDark: Solids.emeraldDark,
  successGlow: Alphas.emerald18,

  warning: Solids.amberLight,
  warningDark: Solids.amber,
  warningGlow: Alphas.amber18,

  danger: Solids.roseLight,
  dangerDark: Solids.rose,
  dangerGlow: Alphas.red16,

  // Typography
  textPrimary: Solids.white,
  textSecondary: Alphas.white65,
  textMuted: Alphas.white45,
  textDark: Solids.slateDark,

  // Borders & Dividers
  borderSubtle: Alphas.white08,
  borderGlass: Alphas.white12,
  borderSpecular: Alphas.white35,
  borderHighlight: Alphas.white75,
} as const;

export type ColorName = keyof typeof Colors;

/**
 * Utility helper to generate rgba color with custom opacity
 */
export function withAlpha(hex: string, alpha: number): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${Math.min(Math.max(alpha, 0), 1)})`;
}

export default Colors;

