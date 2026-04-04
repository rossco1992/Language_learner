import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AGE_PROFILE_LIST } from '../data/ageProfiles';
import { useAge } from '../context/AgeContext';
import { COLORS, SPACING, RADIUS, cardShadow } from '../theme';

const { width } = Dimensions.get('window');

export default function AgeSelectScreen({ onSelected, showBack, onBack }) {
  const { selectAge } = useAge();
  const cardAnims = useRef(AGE_PROFILE_LIST.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      100,
      cardAnims.map((anim) =>
        Animated.spring(anim, { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 90 })
      )
    ).start();
  }, []);

  const handleSelect = async (profileId) => {
    await selectAge(profileId);
    onSelected?.();
  };

  return (
    <LinearGradient colors={['#2B1673', '#55269A', '#8B52C4']} style={styles.gradient}>
      {/* Decorative orbs */}
      <View style={[styles.orb, { width: 280, height: 280, top: -100, right: -80, backgroundColor: 'rgba(255,255,255,0.05)' }]} />
      <View style={[styles.orb, { width: 160, height: 160, bottom: 200, left: -60, backgroundColor: 'rgba(255,255,255,0.04)' }]} />

      <SafeAreaView style={styles.safe}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        )}

        <View style={styles.topSection}>
          <Text style={styles.mascot}>🦉</Text>
          <Text style={styles.title}>Who's learning today?</Text>
          <Text style={styles.titleEs}>¿Quién aprende hoy?</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
        >
          {AGE_PROFILE_LIST.map((profile, i) => {
            const anim = cardAnims[i];
            const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [40, 0] });
            return (
              <Animated.View
                key={profile.id}
                style={[
                  cardShadow(profile.gradient[0]),
                  { borderRadius: RADIUS.lg, opacity: anim, transform: [{ translateY }] },
                ]}
              >
                <AgeCard profile={profile} onPress={() => handleSelect(profile.id)} />
              </Animated.View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function AgeCard({ profile, onPress }) {
  const pressScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(pressScale, { toValue: 0.96, useNativeDriver: true, damping: 10, stiffness: 200 }).start();
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
          colors={profile.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
        >
          {/* Shimmer circle top-right */}
          <View style={styles.cardShimmer} />

          {/* Left: emoji */}
          <View style={styles.cardEmojiWrap}>
            <Text style={styles.cardEmoji}>{profile.emoji}</Text>
          </View>

          {/* Center: text */}
          <View style={styles.cardBody}>
            <Text style={styles.cardLabel}>{profile.label}</Text>
            <View style={styles.ageBadge}>
              <Text style={styles.ageBadgeText}>{profile.ageRange}</Text>
            </View>
            <Text style={styles.cardDesc}>{profile.description}</Text>

            {/* Feature row */}
            <View style={styles.featRow}>
              <Chip icon="⏱" label={`${profile.showInterval / 1000}s pace`} />
              <Chip icon="🎮" label={`${profile.gameChoices} choices`} />
              {profile.showPhrases && <Chip icon="💬" label="Phrases" />}
            </View>
          </View>

          {/* Arrow */}
          <View style={styles.arrowCircle}>
            <Text style={styles.arrowText}>›</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

function Chip({ icon, label }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={styles.chipLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  orb: { position: 'absolute', borderRadius: 9999 },
  safe: { flex: 1 },
  backBtn: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
  backText: { color: 'rgba(255,255,255,0.75)', fontSize: 16, fontWeight: '600' },

  topSection: { alignItems: 'center', paddingTop: SPACING.sm, paddingBottom: SPACING.lg },
  mascot: { fontSize: 64 },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.sm,
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  titleEs: { fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.65)', marginTop: 4 },

  cardsContainer: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl, gap: SPACING.md },

  // Card
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    overflow: 'hidden',
  },
  cardShimmer: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    top: -60,
    right: -40,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  cardEmojiWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardEmoji: { fontSize: 40 },
  cardBody: { flex: 1, gap: 4 },
  cardLabel: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: -0.2,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ageBadge: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  ageBadgeText: { fontSize: 12, fontWeight: '800', color: COLORS.white },
  cardDesc: { fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 19, marginTop: 2 },
  featRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginTop: 6 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  chipIcon: { fontSize: 11 },
  chipLabel: { fontSize: 11, fontWeight: '700', color: COLORS.white },

  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  arrowText: { fontSize: 22, color: COLORS.white, fontWeight: '700', lineHeight: 26 },
});
