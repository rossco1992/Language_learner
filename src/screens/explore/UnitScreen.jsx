import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUnit, getLessonsForUnit } from '../../data/curriculum';
import { useAge } from '../../context/AgeContext';
import { useProgress } from '../../context/ProgressContext';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');

export default function UnitScreen({ navigation, unitId }) {
  const { ageProfile } = useAge();
  const level = ageProfile?.vocabLevel ?? 1;
  const unit = getUnit(unitId);
  const lessons = getLessonsForUnit(unitId, level);
  const { isLessonComplete, getUnitProgress } = useProgress();

  if (!unit) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unit not found</Text>
      </View>
    );
  }

  const progress = getUnitProgress(unit);
  const pct = Math.round(progress * 100);

  return (
    <LinearGradient colors={['#FFF8F0', '#F0E8FF']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <LinearGradient colors={unit.gradient} style={styles.header} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerEmoji}>{unit.emoji}</Text>
            <Text style={styles.headerTitle}>{unit.label}</Text>
            <Text style={styles.headerTitleEs}>{unit.labelEs}</Text>
          </View>
          <View style={styles.backBtn} />
        </LinearGradient>

        {/* Progress summary — stars only, no percentages */}
        <View style={styles.progressBox}>
          <View style={styles.starsRow}>
            {lessons.map((l) => (
              <Text key={l.id} style={styles.starIcon}>
                {isLessonComplete(unit.id, l.id) ? '⭐' : '☆'}
              </Text>
            ))}
          </View>
          {pct === 100 && <Text style={styles.progressLabel}>🎉 ¡Perfecto!</Text>}
        </View>

        {/* Lessons list */}
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const done = isLessonComplete(unit.id, item.id);
            return (
              <TouchableOpacity
                style={[styles.lessonRow, done && styles.lessonRowDone]}
                onPress={() => navigation.navigate('lesson', { unitId: unit.id, lessonId: item.id })}
                activeOpacity={0.75}
              >
                <View style={[styles.lessonIndex, { backgroundColor: unit.gradient[0] }]}>
                  <Text style={styles.lessonIndexText}>{done ? '✓' : index + 1}</Text>
                </View>
                <View style={styles.lessonInfo}>
                  <Text style={styles.lessonEmoji}>{item.emoji}</Text>
                  <View>
                    <Text style={styles.lessonLabel}>{item.label}</Text>
                    <Text style={styles.lessonLabelEs}>{item.labelEs}</Text>
                  </View>
                </View>
                {item.type === 'dialogue' ? (
                  <View style={styles.dialogueBadge}>
                    <Text style={styles.dialogueBadgeText}>💬 Talk</Text>
                  </View>
                ) : (
                  <Text style={styles.wordCount}>{item.words?.length ?? 0} words</Text>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 18, color: COLORS.gray },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  backBtn: { width: 70 },
  backText: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
  headerCenter: { alignItems: 'center' },
  headerEmoji: { fontSize: 40 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.white, marginTop: 4, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  headerTitleEs: { fontSize: 14, fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
  progressBox: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, alignItems: 'center' },
  starsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', justifyContent: 'center' },
  starIcon: { fontSize: 22 },
  progressLabel: { fontSize: 16, fontWeight: '700', color: COLORS.gray, marginTop: 6, textAlign: 'center' },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, gap: SPACING.sm },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOW.card,
  },
  lessonRowDone: { opacity: 0.75 },
  lessonIndex: {
    width: 34,
    height: 34,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lessonIndexText: { color: COLORS.white, fontWeight: '800', fontSize: 14 },
  lessonInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  lessonEmoji: { fontSize: 28 },
  lessonLabel: { fontSize: 16, fontWeight: '700', color: COLORS.dark },
  lessonLabelEs: { fontSize: 13, fontWeight: '500', color: COLORS.gray },
  wordCount: { fontSize: 12, fontWeight: '600', color: COLORS.gray },
  dialogueBadge: { backgroundColor: '#EEF2FF', borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 4 },
  dialogueBadgeText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
});
