// ─────────────────────────────────────────────────────────
// Design Tokens — Hola Mundo
// ─────────────────────────────────────────────────────────
import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();

export const COLORS = {
  // Brand
  primary:      '#5D5FEF',
  primaryLight: '#8A8CF8',
  primaryDark:  '#3D3FBF',

  // Accent
  secondary: '#FF7A00',
  coral:     '#FF5F7E',
  amber:     '#FFC700',
  mint:      '#00C48C',

  // Backgrounds
  appBg:     '#F5F7FA',
  surface:   '#FFFFFF',
  surfaceAlt:'#EDEEFF',

  // Text
  dark:          '#1A1C1E',
  mid:           '#65676B',
  gray:          '#9490B5',
  muted:         '#C4C0D8',
  textSecondary: '#65676B',

  // Utility
  white:     '#FFFFFF',
  lightGray: '#E4E6EB',
  border:    '#E4E6EB',
  success:   '#00C48C',
  warning:   '#FFC700',
  error:     '#FF4B4B',
};

export const GRADIENTS = {
  // App backgrounds
  home:    ['#3D3FBF', '#5D5FEF', '#8A8CF8'],
  explore: ['#F5F7FA', '#EDEEFF'],
  dark:    ['#1a1a2e', '#16213e', '#0f3460'],
  game:    ['#FFF8F0', '#F0F0FF', '#F0FFF9'],

  // Mode buttons
  watch:   ['#FF4757', '#FF6B81'],
  videos:  ['#FF7A00', '#FFC700'],
  play:    ['#5D5FEF', '#8A8CF8'],

  // Unit / category cards — match curriculum gradient prop
};

export const FONTS = {
  // Show screen
  heroEmoji:  120,
  heroWord:   72,
  heroSub:    28,

  // Cards
  cardEmoji:  52,
  cardTitle:  20,
  cardSub:    14,

  // UI
  h1:   36,
  h2:   28,
  h3:   22,
  body: 16,
  sm:   13,
  xs:   11,
};

export const SPACING = {
  xs:   8,
  sm:   16,
  md:   24,
  lg:   32,
  xl:   48,
  xxl:  64,
  edge: 24,
};

export const RADIUS = {
  xs:     8,
  sm:     16,
  md:     24,
  lg:     32,
  xl:     44,
  full:   9999,
  button: 24,
  card:   32,
};

// Shadow factory — pass the color tint for premium colored shadows
export const makeShadow = (color = '#000', opacity = 0.22, radius = 14, offsetY = 6) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: offsetY },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation: Math.round(offsetY * 1.5),
});

// Convenience presets
export const SHADOW = {
  card:   makeShadow('#000', 0.10, 12, 4),
  button: makeShadow('#000', 0.18, 16, 8),
  float:  makeShadow('#000', 0.24, 24, 12),
};

// Colored shadows for gradient cards
export const cardShadow = (hex) => makeShadow(hex, 0.45, 20, 10);

// Typography scale with device font scaling
export const TYPOGRAPHY = {
  h1:    { fontSize: 32 / fontScale, fontWeight: '700', lineHeight: 40 },
  body:  { fontSize: 20 / fontScale, fontWeight: '500', lineHeight: 28 },
  label: { fontSize: 16 / fontScale, fontWeight: '600', letterSpacing: 1.2 },
};

// Spring animation presets for react-native-reanimated
export const SPRING = {
  bouncy: { damping: 10, stiffness: 100, mass: 1 },
  gentle: { damping: 20, stiffness: 80 },
};

// Minimum touch targets for toddler-safe interaction
export const TOUCH = {
  minHeight: 64,
  minWidth: 64,
};

// Glass morphism helper (use as inline style on a View)
export const glass = {
  backgroundColor: 'rgba(255,255,255,0.18)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.35)',
};

export const glassDark = {
  backgroundColor: 'rgba(0,0,0,0.25)',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.12)',
};
