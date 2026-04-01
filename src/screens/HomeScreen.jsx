import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme';

const MODES = [
  {
    id: 'show',
    icon: '📺',
    label: 'Watch',
    labelEs: '¡Ver!',
    gradient: ['#FF6B6B', '#FF8E53'],
  },
  {
    id: 'videos',
    icon: '🎬',
    label: 'Videos',
    labelEs: '¡Videos!',
    gradient: ['#F7971E', '#FFD200'],
  },
  {
    id: 'explore',
    icon: '🔍',
    label: 'Explore',
    labelEs: '¡Explorar!',
    gradient: ['#43E97B', '#38F9D7'],
  },
  {
    id: 'game',
    icon: '🎮',
    label: 'Play',
    labelEs: '¡Jugar!',
    gradient: ['#A18CD1', '#FBC2EB'],
  },
];

export default function HomeScreen({ navigation }) {
  const mascotScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(mascotScale, { toValue: 1.12, duration: 800, useNativeDriver: true }),
        Animated.timing(mascotScale, { toValue: 1.0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient colors={['#6C63FF', '#A18CD1', '#FBC2EB']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.starsRow}>
          {['⭐', '🌟', '✨', '⭐', '🌟'].map((s, i) => (
            <Text key={i} style={[styles.star, { opacity: 0.4 + i * 0.1 }]}>{s}</Text>
          ))}
        </View>

        <Animated.View style={{ transform: [{ scale: mascotScale }] }}>
          <Text style={styles.mascotEmoji}>🦉</Text>
        </Animated.View>

        <Text style={styles.title}>¡Hola, Mundo!</Text>
        <Text style={styles.subtitle}>Learn Spanish Together 🇲🇽</Text>

        <View style={styles.buttonsContainer}>
          {MODES.map((mode) => (
            <ModeButton
              key={mode.id}
              mode={mode}
              onPress={() => navigation.navigate(mode.id)}
            />
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function ModeButton({ mode, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.93, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.buttonWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <LinearGradient
          colors={mode.gradient}
          style={styles.modeButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.modeIcon}>{mode.icon}</Text>
          <View style={styles.modeLabelContainer}>
            <Text style={styles.modeLabel}>{mode.label}</Text>
            <Text style={styles.modeLabelEs}>{mode.labelEs}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1, alignItems: 'center', paddingHorizontal: SPACING.lg },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: SPACING.sm,
  },
  star: { fontSize: 20 },
  mascotEmoji: { fontSize: 100, marginTop: SPACING.lg },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.sm,
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: SPACING.xs,
    marginBottom: SPACING.xl,
    fontWeight: '600',
  },
  buttonsContainer: {
    width: '100%',
    gap: SPACING.md,
    flex: 1,
    justifyContent: 'center',
    paddingBottom: SPACING.xl,
  },
  buttonWrapper: { width: '100%', ...SHADOW.button },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.lg,
    gap: SPACING.lg,
  },
  modeIcon: { fontSize: 52 },
  modeLabelContainer: { flex: 1 },
  modeLabel: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.white,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modeLabelEs: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
});
