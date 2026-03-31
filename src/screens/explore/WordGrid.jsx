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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { getCategoryById } from '../../data/vocabulary';
import { useSpeech } from '../../hooks/useSpeech';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - SPACING.lg * 2 - SPACING.md) / 2;

export default function WordGrid({ route, navigation }) {
  const { categoryId } = route.params;
  const category = getCategoryById(categoryId);
  const { speak } = useSpeech();

  return (
    <LinearGradient colors={['#FFF8F0', '#F0E8FF']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <LinearGradient
          colors={category.gradient}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerEmoji}>{category.emoji}</Text>
            <Text style={styles.headerTitle}>{category.label}</Text>
          </View>
          <View style={styles.backBtn} />
        </LinearGradient>

        <Text style={styles.tapHint}>Tap a word to hear it! 🔊</Text>

        <FlatList
          data={category.words}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <WordCard word={item} onPress={() => speak(item.es)} />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

function WordCard({ word, onPress }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withSpring(0.88, { damping: 6 }),
      withSpring(1.05, { damping: 8 }),
      withSpring(1)
    );
    onPress();
  };

  return (
    <Animated.View style={[styles.cardWrapper, animatedStyle, { ...SHADOW.card }]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.9}
        style={[styles.card, { backgroundColor: word.bg || '#FFF' }]}
      >
        <Text style={styles.emoji}>{word.emoji}</Text>
        <Text style={styles.spanishWord}>{word.es}</Text>
        <Text style={styles.englishWord}>{word.en}</Text>
        <View style={styles.speakerBadge}>
          <Text style={styles.speakerIcon}>🔊</Text>
        </View>
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
    paddingTop: SPACING.lg,
  },
  backBtn: {
    width: 70,
    paddingVertical: SPACING.sm,
  },
  backText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '600',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerEmoji: { fontSize: 28 },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
  },
  tapHint: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.gray,
    fontWeight: '600',
    marginVertical: SPACING.md,
  },
  grid: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    gap: SPACING.md,
  },
  row: { gap: SPACING.md },
  cardWrapper: {
    width: CARD_SIZE,
    borderRadius: RADIUS.lg,
  },
  card: {
    width: CARD_SIZE,
    aspectRatio: 0.9,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  emoji: {
    fontSize: 52,
    marginBottom: SPACING.sm,
  },
  spanishWord: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.dark,
    textAlign: 'center',
  },
  englishWord: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: 2,
  },
  speakerBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: RADIUS.full,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerIcon: { fontSize: 14 },
});
