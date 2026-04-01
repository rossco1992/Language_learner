import React, { useRef } from 'react';
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
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme';

const { width } = Dimensions.get('window');

export default function AgeSelectScreen({ onSelected, showBack, onBack }) {
  const { selectAge } = useAge();

  const handleSelect = async (profileId) => {
    await selectAge(profileId);
    onSelected?.();
  };

  return (
    <LinearGradient colors={['#6C63FF', '#A18CD1', '#FBC2EB']} style={styles.gradient}>
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
          <Text style={styles.subtitle}>
            Choose an age range so we can set the right pace and words!
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.cardsContainer}
          showsVerticalScrollIndicator={false}
        >
          {AGE_PROFILE_LIST.map((profile) => (
            <AgeCard key={profile.id} profile={profile} onPress={() => handleSelect(profile.id)} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function AgeCard({ profile, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <LinearGradient
          colors={profile.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.cardEmoji}>{profile.emoji}</Text>

          <View style={styles.cardText}>
            <Text style={styles.cardLabel}>{profile.label}</Text>
            <View style={styles.ageBadge}>
              <Text style={styles.ageBadgeText}>{profile.ageRange}</Text>
            </View>
            <Text style={styles.cardDesc}>{profile.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <FeatureChip icon="⏱" label={`${profile.showInterval / 1000}s pace`} />
            <FeatureChip icon="🎮" label={`${profile.gameChoices} choices`} />
            {profile.showPhrases && <FeatureChip icon="💬" label="Phrases" />}
          </View>

          <Text style={styles.arrow}>→</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

function FeatureChip({ icon, label }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipIcon}>{icon}</Text>
      <Text style={styles.chipLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  backBtn: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  topSection: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  mascot: { fontSize: 64 },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    marginTop: SPACING.sm,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  titleEs: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  cardsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  cardWrapper: { ...SHADOW.button },
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  cardEmoji: { fontSize: 52 },
  cardText: { flex: 1 },
  cardLabel: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  ageBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 4,
    marginBottom: 6,
  },
  ageBadgeText: { fontSize: 13, fontWeight: '700', color: COLORS.white },
  cardDesc: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 18 },
  features: { flexDirection: 'column', gap: 4, alignItems: 'flex-end' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 3,
  },
  chipIcon: { fontSize: 11 },
  chipLabel: { fontSize: 11, fontWeight: '700', color: COLORS.white },
  arrow: { fontSize: 22, color: 'rgba(255,255,255,0.7)', marginLeft: 4 },
});
