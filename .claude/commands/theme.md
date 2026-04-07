/**
 * TOY-BOX DESIGN SYSTEM v1.0
 * Purpose: Language learning for toddlers & kids.
 * Style: Tactile, professional, high-contrast, and bouncy.
 */

import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');
const fontScale = PixelRatio.getFontScale();

export const Theme = {
  // 1. COLORS: "Jewel Tones" (Vibrant but Professional)
  colors: {
    primary: '#5D5FEF',    // Royal Blue (Trust/Navigation)
    secondary: '#FF7A00',  // Warm Orange (Verbs/Action)
    success: '#00C48C',    // Mint Green (Correct/Go)
    warning: '#FFC700',    // Amber (Wait/Listen)
    error: '#FF4B4B',      // Soft Red (Incorrect)
    background: '#F5F7FA', // Cool White (Cleanliness)
    card: '#FFFFFF',
    text: '#1A1C1E',       // Soft Black (High legibility)
    textSecondary: '#65676B',
    border: '#E4E6EB',
  },

  // 2. TYPOGRAPHY: Scale for Toddler Legibility
  // Note: Claude should prioritize 'Quicksand-Bold' or 'VarelaRound-Regular'
  typography: {
    h1: {
      fontSize: 32 / fontScale,
      fontWeight: '700',
      lineHeight: 40,
    },
    body: {
      fontSize: 20 / fontScale, // Large for early readers
      fontWeight: '500',
      lineHeight: 28,
    },
    label: {
      fontSize: 16 / fontScale,
      letterSpacing: 1.2, // Extra spacing helps character recognition
      fontWeight: '600',
    }
  },

  // 3. SPACING & LAYOUT
  spacing: {
    xs: 8,
    sm: 16,
    md: 24, // Standard padding for "fat-finger" safety
    lg: 32,
    xl: 48,
    edge: 24, // Safety margin from screen edges
  },

  // 4. INTERACTIVE: The "Physics of Play"
  interactive: {
    borderRadius: {
      soft: 16,
      button: 24, // Pill shapes
      card: 32,
    },
    // Physics configs for react-native-reanimated
    springConfig: {
      bouncy: {
        damping: 10,
        stiffness: 100,
        mass: 1,
      },
      gentle: {
        damping: 20,
        stiffness: 80,
      }
    },
    touchTargets: {
      minHeight: 64, // Toddler-friendly size
      minWidth: 64,
    }
  },

  // 5. SHADOWS: Providing Tactile Depth
  shadows: {
    button: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 0, // Solid "Sticker" look
      elevation: 4,
    },
    card: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 2,
    }
  }
};

export default Theme;