import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');

export default function ShowCard({ word }) {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    scale.setValue(0.5);
    opacity.setValue(0);
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, damping: 12, stiffness: 120 }),
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  }, [word?.id]);

  if (!word) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.card, { backgroundColor: word.bg || '#FFF' }, { transform: [{ scale }], opacity }]}>
        <Text style={styles.emoji}>{word.emoji}</Text>
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
  emoji: { fontSize: 120, marginBottom: SPACING.lg },
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
