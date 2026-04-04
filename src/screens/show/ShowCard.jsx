import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_W = width - SPACING.xl * 2;
const CARD_H = CARD_W * 1.1;

export default function ShowCard({ word, gradient }) {
  const scale   = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const slideY  = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    scale.setValue(0.7);
    opacity.setValue(0);
    slideY.setValue(24);

    Animated.parallel([
      Animated.spring(scale,   { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 130 }),
      Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.spring(slideY,  { toValue: 0, useNativeDriver: true, damping: 14, stiffness: 130 }),
    ]).start();
  }, [word?.id]);

  if (!word) return null;

  const gradientColors = gradient ?? ['#6C63FF', '#A18CD1'];

  return (
    <Animated.View
      style={[
        styles.cardOuter,
        SHADOW.float,
        { transform: [{ scale }, { translateY: slideY }], opacity },
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Inner shimmer circles */}
        <View style={styles.shimmer1} />
        <View style={styles.shimmer2} />

        {/* Word badge — top left */}
        <View style={styles.wordBadge}>
          <Text style={styles.wordBadgeText}>🇲🇽 Español</Text>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Text style={styles.emoji}>{word.emoji}</Text>
          <Text style={styles.spanish}>{word.es}</Text>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerDot} />
            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.english}>{word.en}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: RADIUS.xl,
  },
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Decorative circles
  shimmer1: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    top: -80,
    right: -80,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  shimmer2: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    bottom: -60,
    left: -40,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  // Badge
  wordBadge: {
    position: 'absolute',
    top: SPACING.lg,
    left: SPACING.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  wordBadgeText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },

  // Content
  content: { alignItems: 'center', paddingHorizontal: SPACING.xl },
  emoji: {
    fontSize: 110,
    marginBottom: SPACING.lg,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  spanish: {
    fontSize: 64,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: -1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginVertical: SPACING.md,
    width: 120,
  },
  dividerLine: { flex: 1, height: 2, backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: 1 },
  dividerDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.55)' },

  english: {
    fontSize: 26,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
