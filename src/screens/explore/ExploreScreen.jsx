import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CURRICULUM, getUnitsForLevel, getWordCountForUnit } from '../../data/curriculum';
import { useAge } from '../../context/AgeContext';
import { useProgress } from '../../context/ProgressContext';
import { COLORS, SPACING, RADIUS, SHADOW, cardShadow } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - SPACING.lg * 2 - SPACING.md) / 2;

export default function ExploreScreen({ navigation }) {
  const { ageProfile } = useAge();
  const level = ageProfile?.vocabLevel ?? 1;
  const units = getUnitsForLevel(level); // all 10 units
  const { getUnitProgress } = useProgress();

  // Total words available at this level
  const totalWords = CURRICULUM.reduce((sum, u) => sum + getWordCountForUnit(u, level), 0);

  return (
    <LinearGradient colors={['#F5F0FF', '#EDE5FF']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore 🔍</Text>
          <View style={styles.backBtn} />
        </View>

        {/* Stats bar */}
        <View style={styles.statsBar}>
          <StatPill emoji="📚" value={units.length} label="units" />
          <StatPill emoji="✏️" value={totalWords} label="words" />
          <StatPill emoji="🏆" value={`${units.filter(u => getUnitProgress(u) === 1).length}/${units.length}`} label="done" />
        </View>

        <FlatList
          data={units}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <UnitCard
              unit={item}
              level={level}
              progress={getUnitProgress(item)}
              onPress={() => navigation.navigate('unit', { unitId: item.id })}
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

function StatPill({ emoji, value, label }) {
  return (
    <View style={styles.statPill}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function UnitCard({ unit, level, progress, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const wordCount = getWordCountForUnit(unit, level);
  const pct = Math.round(progress * 100);

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, damping: 10, stiffness: 200 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, damping: 10, stiffness: 200 }).start();

  return (
    <Animated.View style={[{ width: CARD_SIZE, borderRadius: RADIUS.lg }, cardShadow(unit.gradient[0]), { transform: [{ scale }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={unit.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Shimmer */}
          <View style={styles.cardShimmer} />

          <Text style={styles.cardEmoji}>{unit.emoji}</Text>
          <Text style={styles.cardLabel}>{unit.label}</Text>
          <Text style={styles.cardLabelEs}>{unit.labelEs}</Text>

          {/* Word count badge */}
          <View style={styles.wordCountBadge}>
            <Text style={styles.wordCountText}>{wordCount} words</Text>
          </View>

          {/* Progress bar */}
          {pct > 0 && (
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${pct}%` }]} />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backBtn: { width: 80, paddingVertical: SPACING.sm },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  headerTitle: { color: COLORS.dark, fontSize: 22, fontWeight: '800' },

  // Stats bar
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    ...SHADOW.card,
  },
  statEmoji: { fontSize: 14 },
  statValue: { fontSize: 15, fontWeight: '900', color: COLORS.dark },
  statLabel: { fontSize: 12, fontWeight: '600', color: COLORS.gray },

  // Grid
  grid: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, gap: SPACING.md },
  row: { gap: SPACING.md },

  // Card
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE * 1.1,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    overflow: 'hidden',
  },
  cardShimmer: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    top: -50,
    right: -40,
    backgroundColor: 'rgba(255,255,255,0.13)',
  },
  cardEmoji: { fontSize: 40, marginBottom: 4 },
  cardLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardLabelEs: { fontSize: 11, fontWeight: '600', color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 1 },
  wordCountBadge: {
    marginTop: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: RADIUS.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  wordCountText: { fontSize: 11, fontWeight: '800', color: COLORS.white },
  progressTrack: {
    width: '85%',
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: RADIUS.full,
    marginTop: SPACING.sm,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: RADIUS.full },
});
