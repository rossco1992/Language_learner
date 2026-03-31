import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { COLORS, FONTS, SPACING, RADIUS, SHADOW } from '../theme';

const { width } = Dimensions.get('window');

const MODES = [
  {
    id: 'Show',
    icon: '📺',
    label: 'Watch',
    labelEs: '¡Ver!',
    gradient: ['#FF6B6B', '#FF8E53'],
    desc: 'Auto-play show',
  },
  {
    id: 'Explore',
    icon: '🔍',
    label: 'Explore',
    labelEs: '¡Explorar!',
    gradient: ['#43E97B', '#38F9D7'],
    desc: 'Tap & learn',
  },
  {
    id: 'Game',
    icon: '🎮',
    label: 'Play',
    labelEs: '¡Jugar!',
    gradient: ['#A18CD1', '#FBC2EB'],
    desc: 'Find the word',
  },
];

export default function HomeScreen({ navigation }) {
  const mascotScale = useSharedValue(1);
  const mascotRotate = useSharedValue(0);

  useEffect(() => {
    mascotScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 800, easing: Easing.out(Easing.quad) }),
        withTiming(1.0, { duration: 800, easing: Easing.in(Easing.quad) })
      ),
      -1,
      false
    );
    mascotRotate.value = withRepeat(
      withSequence(
        withTiming(-8, { duration: 600 }),
        withTiming(8, { duration: 600 }),
        withTiming(0, { duration: 300 })
      ),
      -1,
      false
    );
  }, []);

  const mascotStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: mascotScale.value },
      { rotate: `${mascotRotate.value}deg` },
    ],
  }));

  return (
    <LinearGradient colors={['#6C63FF', '#A18CD1', '#FBC2EB']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Stars decoration */}
        <View style={styles.starsRow}>
          {['⭐', '🌟', '✨', '⭐', '🌟'].map((s, i) => (
            <Text key={i} style={[styles.star, { opacity: 0.4 + i * 0.1 }]}>{s}</Text>
          ))}
        </View>

        {/* Mascot */}
        <Animated.View style={[styles.mascotContainer, mascotStyle]}>
          <Text style={styles.mascotEmoji}>🦉</Text>
        </Animated.View>

        {/* Title */}
        <Text style={styles.title}>¡Hola, Mundo!</Text>
        <Text style={styles.subtitle}>Learn Spanish Together 🇲🇽</Text>

        {/* Mode buttons */}
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
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.92),
      withSpring(1)
    );
    onPress();
  };

  return (
    <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
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
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  star: {
    fontSize: 20,
  },
  mascotContainer: {
    marginTop: SPACING.lg,
  },
  mascotEmoji: {
    fontSize: 100,
  },
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
  buttonWrapper: {
    width: '100%',
    ...SHADOW.button,
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.lg,
    gap: SPACING.lg,
  },
  modeIcon: {
    fontSize: 52,
  },
  modeLabelContainer: {
    flex: 1,
  },
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
