import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUnitsForLevel, getAllWordsFromCurriculum } from '../../data/curriculum';
import { useSpeech } from '../../hooks/useSpeech';
import { useAutoPlay } from '../../hooks/useAutoPlay';
import { useAge } from '../../context/AgeContext';
import ShowCard from './ShowCard';
import ShowControls from './ShowControls';
import { COLORS, SPACING, RADIUS } from '../../theme';

// Flatten all words for a given unit across its lessons
function getWordsForUnit(unit) {
  const words = [];
  for (const lesson of unit.lessons ?? []) {
    if (lesson.type === 'dialogue') continue;
    words.push(...(lesson.words ?? []));
  }
  return words;
}

export default function ShowScreen({ navigation }) {
  const { ageProfile } = useAge();
  const level = ageProfile?.vocabLevel ?? 1;
  const interval = ageProfile?.showInterval ?? 4000;

  const units = getUnitsForLevel(level);
  const [selectedUnitId, setSelectedUnitId] = useState(units[0]?.id);
  const unit = units.find((u) => u.id === selectedUnitId) ?? units[0];
  const words = unit ? getWordsForUnit(unit) : [];

  const { index, isPlaying, toggle, next, prev } = useAutoPlay(words.length, interval);
  const { speak, stop } = useSpeech();

  const currentWord = words[index];

  useEffect(() => {
    if (currentWord) speak(currentWord.es);
  }, [currentWord?.id]);

  useEffect(() => () => stop(), []);

  // Reset unit if it's no longer available for this level
  useEffect(() => {
    if (!units.find((u) => u.id === selectedUnitId)) {
      setSelectedUnitId(units[0]?.id);
    }
  }, [level]);

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { stop(); navigation.goBack(); }} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Watch & Learn 📺</Text>
            {ageProfile && (
              <Text style={styles.ageBadge}>{ageProfile.emoji} {ageProfile.ageRange}</Text>
            )}
          </View>
          <View style={styles.backBtn} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
          contentContainerStyle={styles.catScrollContent}
        >
          {units.map((u) => (
            <TouchableOpacity
              key={u.id}
              onPress={() => setSelectedUnitId(u.id)}
              style={[styles.catChip, selectedUnitId === u.id && styles.catChipActive]}
            >
              <Text style={styles.catChipEmoji}>{u.emoji}</Text>
              <Text style={[styles.catChipLabel, selectedUnitId === u.id && styles.catChipLabelActive]}>
                {u.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.cardTouchable} onPress={() => speak(currentWord.es)} activeOpacity={0.95}>
          <ShowCard word={currentWord} showPhrase={ageProfile?.showPhrases} />
          <Text style={styles.tapHint}>Tap to hear again 🔊</Text>
        </TouchableOpacity>

        <ShowControls isPlaying={isPlaying} onToggle={toggle} onPrev={prev} onNext={next} index={index} total={words.length} />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  backBtn: { width: 80, paddingVertical: SPACING.sm },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerCenter: { alignItems: 'center' },
  headerTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800' },
  ageBadge: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600', marginTop: 2 },
  catScroll: { flexGrow: 0, marginBottom: SPACING.sm },
  catScrollContent: { paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: SPACING.md, borderRadius: RADIUS.full, backgroundColor: 'rgba(255,255,255,0.12)', gap: 6, borderWidth: 2, borderColor: 'transparent' },
  catChipActive: { backgroundColor: COLORS.white, borderColor: COLORS.white },
  catChipEmoji: { fontSize: 18 },
  catChipLabel: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.85)' },
  catChipLabelActive: { color: COLORS.dark },
  cardTouchable: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tapHint: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '500', marginTop: SPACING.md },
});
