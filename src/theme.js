// ─────────────────────────────────────────────────────────
// Design Tokens — Hola Mundo
// ─────────────────────────────────────────────────────────

export const COLORS = {
  // Brand
  primary:      '#5B4FE8',
  primaryLight: '#8177F2',
  primaryDark:  '#3D33C4',

  // Accent
  coral:  '#FF5F7E',
  amber:  '#FFB740',
  mint:   '#2ECC82',

  // Backgrounds
  appBg:     '#F5F0FF',
  surface:   '#FFFFFF',
  surfaceAlt:'#F0EBFF',

  // Text
  dark:  '#1A1040',
  mid:   '#4A3F7A',
  gray:  '#9490B5',
  muted: '#C4C0D8',

  // Utility
  white: '#FFFFFF',
  lightGray: '#EEE9FF',
  success: '#2ECC82',
  warning: '#FFB740',
  error:   '#FF5F7E',
};

export const GRADIENTS = {
  // App backgrounds
  home:     ['#2B1673', '#55269A', '#8B52C4'],
  explore:  ['#F5F0FF', '#EDE5FF'],
  dark:     ['#1a1a2e', '#16213e', '#0f3460'],
  game:     ['#FFF0FA', '#F0F0FF', '#F0FFF5'],

  // Mode buttons
  watch:    ['#FF4757', '#FF6B81'],
  videos:   ['#FFA502', '#FFBE57'],
  explore:  ['#2ED573', '#1E9BFF'],
  play:     ['#A55EEA', '#FD79A8'],

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
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

export const RADIUS = {
  xs:   8,
  sm:   14,
  md:   22,
  lg:   32,
  xl:   44,
  full: 9999,
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
