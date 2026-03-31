import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');
const CHOICE_SIZE = (width - SPACING.lg * 2 - SPACING.md * 2) / 3;

export default function GameChoice({ word, onPress, state }) {
  // state: 'idle' | 'correct' | 'wrong'
  const scale = useSharedValue(1);
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (state === 'correct') {
      scale.value = withSequence(
        withSpring(1.2, { damping: 5, stiffness: 200 }),
        withSpring(1.0)
      );
    } else if (state === 'wrong') {
      shakeX.value = withSequence(
        withTiming(-12, { duration: 60 }),
        withTiming(12, { duration: 60 }),
        withTiming(-10, { duration: 60 }),
        withTiming(10, { duration: 60 }),
        withTiming(0, { duration: 60 })
      );
    }
  }, [state]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: shakeX.value }],
  }));

  const bgColor =
    state === 'correct'
      ? '#D4FFDD'
      : state === 'wrong'
      ? '#FFD4D4'
      : word.bg || '#FFF';

  const borderColor =
    state === 'correct'
      ? '#43E97B'
      : state === 'wrong'
      ? '#FF6B6B'
      : 'transparent';

  return (
    <Animated.View style={[styles.wrapper, animatedStyle, SHADOW.card]}>
      <TouchableOpacity
        onPress={() => state === 'idle' && onPress()}
        activeOpacity={0.8}
        style={[styles.card, { backgroundColor: bgColor, borderColor, borderWidth: state !== 'idle' ? 3 : 0 }]}
      >
        <Text style={styles.emoji}>{word.emoji}</Text>
        {state !== 'idle' && (
          <Text style={styles.stateIcon}>
            {state === 'correct' ? '✅' : '❌'}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.lg,
  },
  card: {
    width: CHOICE_SIZE,
    height: CHOICE_SIZE,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
  },
  stateIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    fontSize: 22,
  },
});
