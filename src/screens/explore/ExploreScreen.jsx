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
import { CATEGORIES } from '../../data/vocabulary';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - SPACING.lg * 2 - SPACING.md) / 2;

export default function ExploreScreen({ navigation }) {
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

        <Text style={styles.prompt}>Choose a category!</Text>
        <Text style={styles.promptEs}>¡Elige una categoría!</Text>

        <FlatList
          data={CATEGORIES}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => navigation.navigate('wordgrid', { categoryId: item.id })}
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

function CategoryCard({ category, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.92, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        <LinearGradient
          colors={category.gradient}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.cardEmoji}>{category.emoji}</Text>
          <Text style={styles.cardLabel}>{category.label}</Text>
          <Text style={styles.cardLabelEs}>{category.labelEs}</Text>
          <View style={styles.wordCount}>
            <Text style={styles.wordCountText}>{category.words.length} words</Text>
          </View>
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
  cardEmoji: { fontSize: 48, marginBottom: SPACING.xs },
  cardLabel: { fontSize: 18, fontWeight: '800', color: COLORS.white, textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3 },
  cardLabelEs: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.85)', textAlign: 'center', marginTop: 2 },
  wordCount: { marginTop: SPACING.sm, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 3 },
  wordCountText: { fontSize: 12, fontWeight: '700', color: COLORS.white },
});
