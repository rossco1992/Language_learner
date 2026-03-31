import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CATEGORIES } from '../../data/vocabulary';
import { useSpeech } from '../../hooks/useSpeech';
import { useAutoPlay } from '../../hooks/useAutoPlay';
import ShowCard from './ShowCard';
import ShowControls from './ShowControls';
import { COLORS, SPACING, RADIUS, SHADOW, FONTS } from '../../theme';

export default function ShowScreen({ navigation }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(CATEGORIES[0].id);
  const category = CATEGORIES.find((c) => c.id === selectedCategoryId);
  const words = category.words;

  const { index, isPlaying, toggle, next, prev } = useAutoPlay(words.length, 4000);
  const { speak, stop } = useSpeech();

  const currentWord = words[index];

  // Speak word whenever it changes
  useEffect(() => {
    if (currentWord) {
      speak(currentWord.es);
    }
  }, [currentWord?.id]);

  // Stop speech on unmount
  useEffect(() => () => stop(), []);

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { stop(); navigation.goBack(); }} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Watch & Learn 📺</Text>
          <View style={styles.backBtn} />
        </View>

        {/* Category selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
          contentContainerStyle={styles.catScrollContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategoryId(cat.id)}
              style={[
                styles.catChip,
                selectedCategoryId === cat.id && styles.catChipActive,
              ]}
            >
              <Text style={styles.catChipEmoji}>{cat.emoji}</Text>
              <Text
                style={[
                  styles.catChipLabel,
                  selectedCategoryId === cat.id && styles.catChipLabelActive,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Word card */}
        <TouchableOpacity
          style={styles.cardTouchable}
          onPress={() => speak(currentWord.es)}
          activeOpacity={0.95}
        >
          <ShowCard word={currentWord} />
          <Text style={styles.tapHint}>Tap to hear again 🔊</Text>
        </TouchableOpacity>

        {/* Controls */}
        <ShowControls
          isPlaying={isPlaying}
          onToggle={toggle}
          onPrev={prev}
          onNext={next}
          index={index}
          total={words.length}
        />
      </SafeAreaView>
    </LinearGradient>
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
  backBtn: {
    width: 80,
    paddingVertical: SPACING.sm,
  },
  backText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
  },
  catScroll: {
    flexGrow: 0,
    marginBottom: SPACING.sm,
  },
  catScrollContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    backgroundColor: 'rgba(255,255,255,0.12)',
    gap: 6,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  catChipActive: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
  },
  catChipEmoji: { fontSize: 18 },
  catChipLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
  },
  catChipLabelActive: {
    color: COLORS.dark,
  },
  cardTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    fontWeight: '500',
    marginTop: SPACING.md,
  },
});
