import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width, height } = Dimensions.get('window');

export default function ShowCard({ word, categoryGradient }) {
  const scale = useSharedValue(0.4);
  const opacity = useSharedValue(0);
  const emojiScale = useSharedValue(0.2);

  useEffect(() => {
    scale.value = 0.4;
    opacity.value = 0;
    emojiScale.value = 0.2;

    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, { damping: 10, stiffness: 120, mass: 0.8 });
    emojiScale.value = withSpring(1, {
      damping: 8,
      stiffness: 100,
      mass: 0.6,
    });
  }, [word?.id]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const emojiStyle = useAnimatedStyle(() => ({
    transform: [{ scale: emojiScale.value }],
  }));

  if (!word) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { backgroundColor: word.bg || '#FFF' }, cardStyle]}>
        <Animated.Text style={[styles.emoji, emojiStyle]}>{word.emoji}</Animated.Text>
        <Text style={styles.spanishWord}>{word.es}</Text>
        <View style={styles.divider} />
        <Text style={styles.englishWord}>{word.en}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  card: {
    width: width - SPACING.xl * 2,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
    ...SHADOW.card,
  },
  emoji: {
    fontSize: 120,
    marginBottom: SPACING.lg,
  },
  spanishWord: {
    fontSize: 68,
    fontWeight: '900',
    color: COLORS.dark,
    textAlign: 'center',
    letterSpacing: -1,
  },
  divider: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.full,
    marginVertical: SPACING.md,
    opacity: 0.4,
  },
  englishWord: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.gray,
    textAlign: 'center',
  },
});
