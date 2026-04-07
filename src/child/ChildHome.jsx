import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PACKS } from '../content/packs';
import { useParent } from '../context/ParentContext';
import { COLORS, SPACING, RADIUS, cardShadow } from '../theme';

const { width } = Dimensions.get('window');
const CARD = (width - SPACING.lg * 2 - SPACING.md) / 2;

const MODES = [
  { id: 'Show',    icon: '📺', label: 'Ver',      gradient: ['#FF4757', '#FF6B81'] },
  { id: 'videos',  icon: '🎬', label: 'Videos',   gradient: ['#F7971E', '#FFD200'] },
  { id: 'Explore', icon: '🔍', label: 'Explorar', gradient: ['#11998E', '#38EF7D'] },
  { id: 'Game',    icon: '🎮', label: 'Jugar',    gradient: ['#8B5CF6', '#EC4899'] },
];

export default function ChildHome({ navigation }) {
  const { isPackUnlocked } = useParent();

  // Floating mascot
  const floatY = useRef(new Animated.Value(0)).current;
  const cardAnims = useRef(PACKS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: -10, duration: 1600, useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0,   duration: 1600, useNativeDriver: true }),
      ])
    ).start();

    Animated.stagger(
      90,
      cardAnims.map((a) =>
        Animated.spring(a, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 100 })
      )
    ).start();
  }, []);

  return (
    <LinearGradient colors={['#1A0B2E', '#3B1F6A', '#6B3FA0']} style={styles.gradient}>
      {/* Decorative orbs */}
      <View style={[styles.orb, { width: 260, height: 260, top: -80, right: -80 }]} />
      <View style={[styles.orb, { width: 160, height: 160, bottom: 120, left: -60 }]} />

      <SafeAreaView style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Parent gate button — small, top right */}
          <View style={styles.topBar}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              onPress={() => navigation.navigate('parentgate')}
              style={styles.parentBtn}
            >
              <Text style={styles.parentBtnText}>🔒</Text>
            </TouchableOpacity>
          </View>

          {/* Mascot + greeting */}
          <View style={styles.hero}>
            <Animated.Text style={[styles.mascot, { transform: [{ translateY: floatY }] }]}>
              🦉
            </Animated.Text>
            <Text style={styles.greeting}>¡Hola!</Text>
            <Text style={styles.subGreeting}>¿Qué quieres aprender hoy?</Text>
          </View>

          {/* 2×2 Pack grid */}
          <View style={styles.grid}>
            {PACKS.map((pack, i) => {
              const anim = cardAnims[i];
              const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });
              return (
                <Animated.View
                  key={pack.id}
                  style={[
                    { width: CARD, borderRadius: RADIUS.lg },
                    cardShadow(pack.gradient[0]),
                    { transform: [{ scale }], opacity: anim },
                  ]}
                >
                  <PackCard
                    pack={pack}
                    unlocked={isPackUnlocked(pack.id)}
                    onPress={() => navigation.navigate('pack', { packId: pack.id })}
                  />
                </Animated.View>
              );
            })}
          </View>

          {/* More activities row */}
          <Text style={styles.moreLabel}>More activities</Text>
          <View style={styles.modesRow}>
            {MODES.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                onPress={() => navigation.navigate(mode.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={mode.gradient}
                  style={styles.modeChip}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.modeIcon}>{mode.icon}</Text>
                  <Text style={styles.modeLabel}>{mode.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function PackCard({ pack, unlocked, onPress }) {
  const pressScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(pressScale, { toValue: 0.93, useNativeDriver: true, damping: 10, stiffness: 200 }).start();
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
          colors={pack.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Inner shimmer */}
          <View style={styles.cardShimmer} />

          {!unlocked && (
            <View style={styles.lockOverlay}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          )}

          <Text style={styles.cardEmoji}>{pack.emoji}</Text>
          <Text style={styles.cardTitle}>{pack.titleEs}</Text>
          <Text style={styles.cardSub}>{pack.title}</Text>
          <View style={styles.wordPill}>
            <Text style={styles.wordPillText}>{pack.words.length} words</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  orb: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  safe: { flex: 1 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
  parentBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  parentBtnText: { fontSize: 18 },

  hero: { alignItems: 'center', paddingVertical: SPACING.md },
  mascot: { fontSize: 80 },
  greeting: {
    fontSize: 44,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },
  subGreeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    marginTop: 4,
  },

  scrollContent: {
    paddingBottom: SPACING.xxl,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    alignContent: 'center',
  },

  moreLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  modesRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  modeChip: {
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: (width - SPACING.lg * 2 - SPACING.sm * 3) / 4,
    aspectRatio: 1,
  },
  modeIcon: { fontSize: 28, marginBottom: 4 },
  modeLabel: { fontSize: 11, fontWeight: '800', color: COLORS.white },

  card: {
    width: CARD,
    height: CARD * 1.1,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: SPACING.sm,
  },
  cardShimmer: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    top: -40,
    right: -30,
    backgroundColor: 'rgba(255,255,255,0.13)',
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderRadius: RADIUS.lg,
  },
  lockIcon: { fontSize: 36 },

  cardEmoji: { fontSize: 48, marginBottom: 4 },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    letterSpacing: -0.2,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardSub: { fontSize: 11, color: 'rgba(255,255,255,0.75)', fontWeight: '600', marginTop: 1 },
  wordPill: {
    marginTop: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  wordPillText: { fontSize: 11, fontWeight: '800', color: COLORS.white },
});
