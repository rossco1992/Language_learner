import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, cardShadow } from '../../theme';

const { width } = Dimensions.get('window');

// Card size adapts to number of choices:
// 2 → large (one row),  3 → medium,  4 → 2×2 grid
export function getChoiceLayout(numChoices) {
  if (numChoices <= 2) {
    const size = (width - SPACING.lg * 2 - SPACING.md) / 2;
    return { size, columns: 2 };
  }
  if (numChoices === 3) {
    const size = (width - SPACING.lg * 2 - SPACING.md * 2) / 3;
    return { size, columns: 3 };
  }
  // 4 → 2×2
  const size = (width - SPACING.lg * 2 - SPACING.md) / 2;
  return { size, columns: 2 };
}

const IDLE_GRADIENTS = [
  ['#FF6B6B', '#FF8E8E'],
  ['#FFA502', '#FFC048'],
  ['#2ED573', '#48EDAA'],
  ['#7B61FF', '#AE9FFF'],
];

export default function GameChoice({ word, onPress, state, index = 0 }) {
  const scale  = useRef(new Animated.Value(1)).current;
  const shakeX = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === 'correct') {
      Animated.sequence([
        Animated.spring(scale,  { toValue: 1.15, useNativeDriver: true, damping: 5, stiffness: 200 }),
        Animated.spring(scale,  { toValue: 1,    useNativeDriver: true }),
      ]).start();
    } else if (state === 'wrong') {
      Animated.sequence([
        Animated.timing(shakeX, { toValue: -12, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 12,  duration: 55, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: -8,  duration: 55, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 8,   duration: 55, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 0,   duration: 55, useNativeDriver: true }),
      ]).start();
    }
  }, [state]);

  const gradientColors =
    state === 'correct' ? ['#2ECC82', '#26B870'] :
    state === 'wrong'   ? ['#FF5F7E', '#E84060'] :
    IDLE_GRADIENTS[index % IDLE_GRADIENTS.length];

  const shadowColor =
    state === 'correct' ? '#2ECC82' :
    state === 'wrong'   ? '#FF5F7E' :
    gradientColors[0];

  return (
    <Animated.View
      style={[
        cardShadow(shadowColor),
        { borderRadius: RADIUS.lg, transform: [{ scale }, { translateX: shakeX }] },
      ]}
    >
      <TouchableOpacity
        onPress={() => state === 'idle' && onPress()}
        activeOpacity={0.85}
        style={styles.touchable}
      >
        <LinearGradient
          colors={gradientColors}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Inner shimmer */}
          <View style={styles.shimmer} />

          <Text style={styles.emoji}>{word.emoji}</Text>

          {/* State badge */}
          {state !== 'idle' && (
            <View style={[styles.stateBadge, state === 'correct' ? styles.badgeCorrect : styles.badgeWrong]}>
              <Text style={styles.stateBadgeText}>{state === 'correct' ? '✓' : '✕'}</Text>
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  touchable: { borderRadius: RADIUS.lg, overflow: 'hidden' },
  card: {
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    top: -30,
    right: -20,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  emoji: { fontSize: 56 },
  stateBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCorrect: { backgroundColor: 'rgba(0,0,0,0.2)' },
  badgeWrong:   { backgroundColor: 'rgba(0,0,0,0.2)' },
  stateBadgeText: { color: COLORS.white, fontSize: 14, fontWeight: '900' },
});
