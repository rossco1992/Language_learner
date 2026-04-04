import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAge } from '../context/AgeContext';
import { COLORS, SPACING, RADIUS, SHADOW, cardShadow, glass, glassDark } from '../theme';

const { width } = Dimensions.get('window');
const CARD = (width - SPACING.lg * 2 - SPACING.md) / 2;

const MODES = [
  {
    id: 'show',
    icon: '📺',
    label: 'Watch',
    labelEs: 'Ver',
    gradient: ['#FF4757', '#FF6B81'],
    shadowColor: '#FF4757',
  },
  {
    id: 'videos',
    icon: '🎬',
    label: 'Videos',
    labelEs: 'Videos',
    gradient: ['#F7971E', '#FFD200'],
    shadowColor: '#F7971E',
  },
  {
    id: 'explore',
    icon: '🔍',
    label: 'Explore',
    labelEs: 'Explorar',
    gradient: ['#11998E', '#38EF7D'],
    shadowColor: '#11998E',
  },
  {
    id: 'game',
    icon: '🎮',
    label: 'Play',
    labelEs: 'Jugar',
    gradient: ['#8B5CF6', '#EC4899'],
    shadowColor: '#8B5CF6',
  },
];

// Decorative orbs in background
const ORBS = [
  { size: 220, top: -60,  left: -80,  color: 'rgba(255,255,255,0.06)' },
  { size: 160, top: 80,   right: -50, color: 'rgba(255,255,255,0.05)' },
  { size: 120, bottom: 160, left: -30, color: 'rgba(255,255,255,0.04)' },
];

export default function HomeScreen({ navigation }) {
  const { ageProfile } = useAge();

  // Floating mascot
  const floatY = useRef(new Animated.Value(0)).current;
  // Stagger entrance for buttons
  const cardAnims = useRef(MODES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Float animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -12, duration: 1800, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0,   duration: 1800, useNativeDriver: true }),
      ])
    ).start();

    // Stagger card entrance
    Animated.stagger(
      80,
      cardAnims.map((anim) =>
        Animated.spring(anim, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 100 })
      )
    ).start();
  }, []);

  return (
    <LinearGradient colors={['#2B1673', '#55269A', '#8B52C4']} style={styles.gradient}>
      {/* Background orbs */}
      {ORBS.map((orb, i) => (
        <View
          key={i}
          style={[
            styles.orb,
            {
              width: orb.size, height: orb.size,
              borderRadius: orb.size / 2,
              backgroundColor: orb.color,
              top: orb.top, bottom: orb.bottom,
              left: orb.left, right: orb.right,
            },
          ]}
        />
      ))}

      <SafeAreaView style={styles.safe}>
        {/* Age pill — top right */}
        <View style={styles.topRow}>
          <View style={styles.topRowLeft} />
          {ageProfile && (
            <TouchableOpacity
              onPress={() => navigation.navigate('ageselect')}
              style={styles.agePill}
            >
              <Text style={styles.agePillText}>{ageProfile.emoji} {ageProfile.label}</Text>
              <View style={styles.agePillDivider} />
              <Text style={styles.agePillChange}>Change</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Mascot + title */}
        <View style={styles.hero}>
          <Animated.Text style={[styles.mascot, { transform: [{ translateY: floatY }] }]}>
            🦉
          </Animated.Text>
          <Text style={styles.title}>¡Hola, Mundo!</Text>
          <Text style={styles.subtitle}>Learn Spanish Together 🇲🇽</Text>
        </View>

        {/* 2×2 mode grid */}
        <View style={styles.grid}>
          {MODES.map((mode, i) => {
            const anim = cardAnims[i];
            const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] });
            const opacity = anim;
            return (
              <Animated.View
                key={mode.id}
                style={[styles.cardOuter, cardShadow(mode.shadowColor), { transform: [{ scale }], opacity }]}
              >
                <ModeCard mode={mode} onPress={() => navigation.navigate(mode.id)} />
              </Animated.View>
            );
          })}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function ModeCard({ mode, onPress }) {
  const pressScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(pressScale, { toValue: 0.94, useNativeDriver: true, damping: 10, stiffness: 200 }).start();
  const handlePressOut = () =>
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, damping: 10, stiffness: 200 }).start();

  return (
    <Animated.View style={{ transform: [{ scale: pressScale }] }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={mode.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Inner highlight shimmer */}
          <View style={styles.cardShimmer} />

          <Text style={styles.cardIcon}>{mode.icon}</Text>
          <Text style={styles.cardLabel}>{mode.label}</Text>
          <Text style={styles.cardLabelEs}>{mode.labelEs}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  orb: { position: 'absolute' },
  safe: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  topRowLeft: { flex: 1 },
  agePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    gap: SPACING.sm,
  },
  agePillText: { color: COLORS.white, fontSize: 13, fontWeight: '700' },
  agePillDivider: { width: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.3)' },
  agePillChange: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600' },

  // Hero
  hero: { alignItems: 'center', paddingTop: SPACING.md, paddingBottom: SPACING.xl },
  mascot: { fontSize: 96 },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.5,
    marginTop: SPACING.sm,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.2,
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    flex: 1,
    alignContent: 'center',
    paddingBottom: SPACING.xl,
  },
  cardOuter: { width: CARD, borderRadius: RADIUS.lg },
  card: {
    width: CARD,
    height: CARD * 1.05,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cardShimmer: {
    position: 'absolute',
    top: -CARD * 0.4,
    left: -CARD * 0.2,
    width: CARD * 0.8,
    height: CARD * 0.8,
    borderRadius: CARD * 0.4,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  cardIcon:    { fontSize: 52, marginBottom: SPACING.sm },
  cardLabel:   { fontSize: 22, fontWeight: '900', color: COLORS.white, letterSpacing: -0.3,
                 textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  cardLabelEs: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.75)', marginTop: 2 },
});
