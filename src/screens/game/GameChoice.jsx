import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');
const CHOICE_SIZE = (width - SPACING.lg * 2 - SPACING.md * 2) / 3;

export default function GameChoice({ word, onPress, state }) {
  const scale = useRef(new Animated.Value(1)).current;
  const shakeX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state === 'correct') {
      Animated.sequence([
        Animated.spring(scale, { toValue: 1.2, useNativeDriver: true, damping: 5, stiffness: 200 }),
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      ]).start();
    } else if (state === 'wrong') {
      Animated.sequence([
        Animated.timing(shakeX, { toValue: -10, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 10, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeX, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
  }, [state]);

  const bgColor =
    state === 'correct' ? '#D4FFDD' :
    state === 'wrong' ? '#FFD4D4' :
    word.bg || '#FFF';

  const borderColor =
    state === 'correct' ? '#43E97B' :
    state === 'wrong' ? '#FF6B6B' :
    'transparent';

  return (
    <Animated.View style={[styles.wrapper, SHADOW.card, { transform: [{ scale }, { translateX: shakeX }] }]}>
      <TouchableOpacity
        onPress={() => state === 'idle' && onPress()}
        activeOpacity={0.8}
        style={[styles.card, { backgroundColor: bgColor, borderColor, borderWidth: state !== 'idle' ? 3 : 0 }]}
      >
        <Text style={styles.emoji}>{word.emoji}</Text>
        {state !== 'idle' && (
          <Text style={styles.stateIcon}>{state === 'correct' ? '✅' : '❌'}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderRadius: RADIUS.lg },
  card: {
    width: CHOICE_SIZE,
    height: CHOICE_SIZE,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 56 },
  stateIcon: { position: 'absolute', top: 4, right: 4, fontSize: 22 },
});
