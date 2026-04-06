// PackScreen — shown when user taps a pack card.
// Lets them choose Tap & Say or Peekaboo, then launches the activity.
import React, { useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPackById } from '../content/packs';
import { COLORS, SPACING, RADIUS, cardShadow } from '../theme';

const { width } = Dimensions.get('window');

const ACTIVITIES = [
  {
    id: 'tapsay',
    label: 'Tap & Say',
    labelEs: '¡Toca y Di!',
    emoji: '👆',
    desc: 'Tap the word and hear it!',
    gradient: ['#FF6B6B', '#FF8E81'],
  },
  {
    id: 'peekaboo',
    label: 'Peekaboo!',
    labelEs: '¡Cu-cú!',
    emoji: '🙈',
    desc: 'Tap to discover what\'s hiding!',
    gradient: ['#A78BFA', '#F472B6'],
  },
];

export default function PackScreen({ navigation, packId }) {
  const pack = getPackById(packId);
  if (!pack) return null;

  return (
    <LinearGradient colors={['#1A0B2E', '#3B1F6A', '#6B3FA0']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        {/* Pack title */}
        <View style={styles.packTitle}>
          <LinearGradient colors={pack.gradient} style={styles.packBadge} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.packEmoji}>{pack.emoji}</Text>
          </LinearGradient>
          <Text style={styles.packName}>{pack.titleEs}</Text>
          <Text style={styles.packSub}>{pack.words.length} words to explore</Text>
        </View>

        {/* Activity picker */}
        <Text style={styles.prompt}>Choose an activity!</Text>
        <View style={styles.activityGrid}>
          {ACTIVITIES.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onPress={() => navigation.navigate(activity.id, { packId: pack.id })}
            />
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function ActivityCard({ activity, onPress }) {
  const pressScale = useRef(new Animated.Value(1)).current;
  const CARD_W = width - SPACING.lg * 2;

  const handlePressIn = () =>
    Animated.spring(pressScale, { toValue: 0.95, useNativeDriver: true, damping: 10, stiffness: 200 }).start();
  const handlePressOut = () =>
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, damping: 10, stiffness: 200 }).start();

  return (
    <Animated.View style={[{ width: CARD_W, borderRadius: RADIUS.lg }, cardShadow(activity.gradient[0]), { transform: [{ scale: pressScale }] }]}>
      <TouchableOpacity onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} activeOpacity={1}>
        <LinearGradient colors={activity.gradient} style={styles.activityCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.activityShimmer} />
          <Text style={styles.activityEmoji}>{activity.emoji}</Text>
          <View style={styles.activityText}>
            <Text style={styles.activityLabel}>{activity.label}</Text>
            <Text style={styles.activityLabelEs}>{activity.labelEs}</Text>
            <Text style={styles.activityDesc}>{activity.desc}</Text>
          </View>
          <Text style={styles.activityArrow}>›</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1, alignItems: 'center' },
  header: { width: '100%', paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  backBtn: { paddingVertical: SPACING.sm },
  backText: { color: 'rgba(255,255,255,0.75)', fontSize: 16, fontWeight: '600' },

  packTitle: { alignItems: 'center', paddingVertical: SPACING.lg },
  packBadge: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  packEmoji: { fontSize: 48 },
  packName: { fontSize: 34, fontWeight: '900', color: COLORS.white, letterSpacing: -0.5,
    textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  packSub: { fontSize: 15, color: 'rgba(255,255,255,0.65)', fontWeight: '500', marginTop: 4 },

  prompt: { fontSize: 20, fontWeight: '700', color: 'rgba(255,255,255,0.85)', marginBottom: SPACING.lg },

  activityGrid: { gap: SPACING.md, paddingHorizontal: SPACING.lg, width: '100%' },
  activityCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    overflow: 'hidden',
  },
  activityShimmer: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    top: -50,
    right: -40,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  activityEmoji: { fontSize: 52 },
  activityText: { flex: 1 },
  activityLabel: { fontSize: 22, fontWeight: '900', color: COLORS.white, letterSpacing: -0.2,
    textShadowColor: 'rgba(0,0,0,0.15)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  activityLabelEs: { fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: '600' },
  activityDesc: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 4, lineHeight: 18 },
  activityArrow: { fontSize: 28, color: 'rgba(255,255,255,0.6)', fontWeight: '700' },
});
