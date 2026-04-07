import { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSession } from '../context/SessionContext';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme';

export default function SessionComplete({ navigation }) {
  const { endSession, wordsThisSession } = useSession();
  const bounceAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 4,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDone = () => {
    endSession();
    navigation.popToTop();
  };

  const handlePlayMore = () => {
    endSession();
    // Start a fresh session — navigate back to let them pick a new activity
    navigation.popToTop();
  };

  return (
    <LinearGradient
      colors={['#6C63FF', '#A78BFA', '#F472B6']}
      style={styles.bg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safe}>
        <Animated.Text style={[styles.emoji, { transform: [{ scale: bounceAnim }] }]}>
          🌟
        </Animated.Text>
        <Text style={styles.title}>¡Increíble!</Text>
        <Text style={styles.subtitle}>Great job learning together!</Text>

        <View style={styles.statsRow}>
          {wordsThisSession.length > 0 && (
            <View style={styles.statPill}>
              <Text style={styles.statEmoji}>🗣️</Text>
              <Text style={styles.statText}>{wordsThisSession.length} words practiced</Text>
            </View>
          )}
          <View style={styles.statPill}>
            <Text style={styles.statEmoji}>😴</Text>
            <Text style={styles.statText}>Time for a break!</Text>
          </View>
        </View>

        <Text style={styles.tip}>
          💡 Try practicing these words at naptime or bedtime — it helps memory!
        </Text>

        <TouchableOpacity onPress={handleDone} style={styles.doneBtn}>
          <Text style={styles.doneBtnText}>All done! 🎉</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayMore} style={styles.moreBtn}>
          <Text style={styles.moreBtnText}>One more round?</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  emoji: { fontSize: 120 },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.white,
    marginTop: SPACING.md,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginTop: SPACING.sm,
  },
  statsRow: {
    marginTop: SPACING.xl,
    gap: SPACING.sm,
    alignItems: 'center',
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statEmoji: { fontSize: 20 },
  statText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  tip: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: SPACING.lg,
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
  },
  doneBtn: {
    marginTop: SPACING.xl,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    ...SHADOW.button,
  },
  doneBtnText: { fontSize: 20, fontWeight: '800', color: COLORS.white },
  moreBtn: {
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  moreBtnText: { fontSize: 15, fontWeight: '600', color: 'rgba(255,255,255,0.6)' },
});
