// CoUsePrompt — shows parent-child interaction prompts every few words.
// These create "serve and return" moments per CLAUDE.md Principle #14.
// Appears as a gentle overlay that auto-dismisses or can be tapped away.

import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';

// Bilingual prompts encouraging parent-child interaction
const PROMPTS = [
  { emoji: '👨‍👧', es: '¡Dilo juntos!', en: 'Say it together!' },
  { emoji: '👀', es: '¿Puedes encontrar uno de verdad?', en: 'Can you find a real one nearby?' },
  { emoji: '🗣️', es: '¡Pregúntale a mamá o papá!', en: 'Ask mamá or papá to say it!' },
  { emoji: '👆', es: '¡Señálalo!', en: 'Point to it!' },
  { emoji: '🎤', es: '¡Tu turno! Dilo fuerte.', en: 'Your turn! Say it loud.' },
  { emoji: '👏', es: '¡Aplaudan juntos!', en: 'Clap and say it together!' },
  { emoji: '🤗', es: '¡Abrázo y dilo!', en: 'Hug and say it!' },
  { emoji: '🪞', es: '¡Mírate y dilo!', en: 'Look in a mirror and say it!' },
  { emoji: '🎵', es: '¡Cántalo!', en: 'Sing it!' },
  { emoji: '🫶', es: '¡Choca esos cinco!', en: 'High five and say it!' },
];

// Show a co-use prompt every N words (default: every 2 words)
const PROMPT_INTERVAL = 2;

export default function CoUsePrompt({ wordIndex, currentWord, visible }) {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const shouldShow = visible && wordIndex > 0 && wordIndex % PROMPT_INTERVAL === 0;

  const prompt = PROMPTS[wordIndex % PROMPTS.length];

  useEffect(() => {
    if (shouldShow) {
      Animated.sequence([
        Animated.spring(slideAnim, { toValue: 1, useNativeDriver: true, damping: 12, stiffness: 120 }),
        Animated.delay(3000),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      slideAnim.setValue(0);
    }
  }, [wordIndex, shouldShow]);

  if (!shouldShow) return null;

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [80, 0],
  });
  const opacity = slideAnim;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], opacity }]}>
      <TouchableOpacity
        style={styles.pill}
        activeOpacity={0.9}
        onPress={() => {
          Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
        }}
      >
        <Text style={styles.emoji}>{prompt.emoji}</Text>
        <View style={styles.textCol}>
          <Text style={styles.promptEs}>{prompt.es}</Text>
          <Text style={styles.promptEn}>{prompt.en}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: SPACING.lg,
    right: SPACING.lg,
    alignItems: 'center',
    zIndex: 20,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: { fontSize: 28 },
  textCol: { flex: 1 },
  promptEs: { fontSize: 16, fontWeight: '800', color: COLORS.dark },
  promptEn: { fontSize: 13, fontWeight: '500', color: COLORS.gray, marginTop: 1 },
});
