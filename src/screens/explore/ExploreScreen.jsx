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
import { getUnitsForLevel } from '../../data/curriculum';
import { useAge } from '../../context/AgeContext';
import { useProgress } from '../../context/ProgressContext';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - SPACING.lg * 2 - SPACING.md) / 2;

export default function ExploreScreen({ navigation }) {
  const { ageProfile } = useAge();
  const level = ageProfile?.vocabLevel ?? 1;
  const units = getUnitsForLevel(level);
  const { getUnitProgress } = useProgress();

  return (
    <LinearGradient colors={['#FFF8F0', '#F0E8FF']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore 🔍</Text>
          <View style={styles.backBtn} />
        </View>

        <Text style={styles.prompt}>Choose a topic!</Text>
        <Text style={styles.promptEs}>¡Elige un tema!</Text>

        <FlatList
          data={units}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <UnitCard
              unit={item}
              progress={getUnitProgress(item)}
              onPress={() => navigation.navigate('unit', { unitId: item.id })}
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

function UnitCard({ unit, progress, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  const pct = Math.round(progress * 100);

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        <LinearGradient
          colors={unit.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.cardEmoji}>{unit.emoji}</Text>
          <Text style={styles.cardLabel}>{unit.label}</Text>
          <Text style={styles.cardLabelEs}>{unit.labelEs}</Text>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {pct > 0 ? `${pct}% done` : `${unit.lessons.length} lessons`}
          </Text>
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
  prompt: { textAlign: 'center', fontSize: 28, fontWeight: '800', color: COLORS.dark, marginTop: SPACING.md },
  promptEs: { textAlign: 'center', fontSize: 18, fontWeight: '600', color: COLORS.gray, marginBottom: SPACING.lg },
  grid: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, gap: SPACING.md },
  row: { gap: SPACING.md },
  cardWrapper: { width: CARD_SIZE, ...SHADOW.button },
  card: { width: CARD_SIZE, height: CARD_SIZE, borderRadius: RADIUS.lg, alignItems: 'center', justifyContent: 'center', padding: SPACING.md },
  cardEmoji: { fontSize: 44, marginBottom: SPACING.xs },
  cardLabel: { fontSize: 16, fontWeight: '800', color: COLORS.white, textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  cardLabelEs: { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 2 },
  progressTrack: { width: '85%', height: 6, backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: RADIUS.full, marginTop: SPACING.sm, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: RADIUS.full },
  progressText: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.9)', marginTop: 4 },
});
