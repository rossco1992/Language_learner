import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { getPackById } from '../content/packs';
import { playWord, playCelebration, stopAudio } from '../audio/audioManager';
import { useParent } from '../context/ParentContext';
import { COLORS, SPACING, RADIUS, SHADOW } from '../theme';

const { width, height } = Dimensions.get('window');

export default function TapAndSay({ navigation, packId }) {
  const pack = getPackById(packId);
  const { settings, recordWordHeard } = useParent();
  const words = pack?.words ?? [];

  const [index, setIndex] = useState(0);
  const [tapped, setTapped] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finished, setFinished] = useState(false);

  const cardScale  = useRef(new Animated.Value(0.8)).current;
  const cardOpacity= useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const currentWord = words[index];

  // Animate card in each time the word changes
  useEffect(() => {
    if (!currentWord) return;
    cardScale.setValue(0.8);
    cardOpacity.setValue(0);
    setTapped(false);

    Animated.parallel([
      Animated.spring(cardScale,   { toValue: 1, useNativeDriver: true, damping: 14, stiffness: 120 }),
      Animated.timing(cardOpacity, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start(() => {
      // Auto-play the word when card appears
      playWord(currentWord.id, currentWord.es);
    });
  }, [index]);

  useEffect(() => () => stopAudio(), []);

  const handleTap = () => {
    playWord(currentWord.id, currentWord.es);
    recordWordHeard(currentWord.id);

    // Bounce animation
    Animated.sequence([
      Animated.spring(bounceAnim, { toValue: 1.15, useNativeDriver: true, damping: 5, stiffness: 200 }),
      Animated.spring(bounceAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();

    if (!tapped) {
      setTapped(true);
      setShowConfetti(true);
      playCelebration();
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleNext = () => {
    if (index + 1 >= words.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
  };

  const handleReplay = () => {
    if (finished) {
      setIndex(0);
      setFinished(false);
    }
  };

  if (!pack) return null;

  if (finished) {
    return <FinishScreen pack={pack} wordCount={words.length} onReplay={handleReplay} onHome={() => navigation.goBack()} />;
  }

  return (
    <LinearGradient colors={['#1A0B2E', '#3B1F6A', '#6B3FA0']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { stopAudio(); navigation.goBack(); }} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tap & Say</Text>
          <View style={styles.backBtn} />
        </View>

        {/* Progress dots */}
        <View style={styles.dotsRow}>
          {words.map((_, i) => (
            <View key={i} style={[styles.dot, i <= index && styles.dotActive]} />
          ))}
        </View>

        {/* Main word card — tap to hear */}
        <View style={styles.cardArea}>
          <Animated.View style={{ transform: [{ scale: cardScale }, { scale: bounceAnim }], opacity: cardOpacity }}>
            <TouchableOpacity onPress={handleTap} activeOpacity={0.9} style={styles.cardTouch}>
              <LinearGradient
                colors={pack.gradient}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Shimmer circles */}
                <View style={styles.shimmer1} />
                <View style={styles.shimmer2} />

                <Text style={styles.wordEmoji}>{currentWord.emoji}</Text>
                <Text style={styles.wordEs}>{currentWord.es}</Text>

                {settings.bilingualMode && (
                  <Text style={styles.wordEn}>{currentWord.en}</Text>
                )}

                <View style={styles.tapHintRow}>
                  <Text style={styles.tapHintText}>🔊 Tap to hear</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Navigation */}
        <View style={styles.navRow}>
          <TouchableOpacity
            onPress={() => index > 0 && setIndex(index - 1)}
            style={[styles.navBtn, index === 0 && styles.navBtnHidden]}
          >
            <Text style={styles.navBtnText}>‹ Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={[styles.nextBtn, { backgroundColor: pack.gradient[0] }]}>
            <Text style={styles.nextBtnText}>
              {index + 1 >= words.length ? '🎉 Finish' : 'Next ›'}
            </Text>
          </TouchableOpacity>
        </View>

        {showConfetti && (
          <ConfettiCannon
            count={80}
            origin={{ x: width / 2, y: height * 0.4 }}
            autoStart
            fadeOut
            colors={['#FF6B6B', '#FFD93D', '#6C63FF', '#43E97B', '#FF6584']}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

function FinishScreen({ pack, wordCount, onReplay, onHome }) {
  const bounceAnim = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.spring(bounceAnim, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }).start();
  }, []);

  return (
    <LinearGradient colors={pack.gradient} style={styles.finishBg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={styles.finishSafe}>
        <Animated.Text style={[styles.finishEmoji, { transform: [{ scale: bounceAnim }] }]}>🎉</Animated.Text>
        <Text style={styles.finishTitle}>¡Muy bien!</Text>
        <Text style={styles.finishSub}>You practiced {wordCount} words!</Text>
        <TouchableOpacity onPress={onReplay} style={styles.finishBtn}>
          <Text style={styles.finishBtnText}>🔄 Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onHome} style={[styles.finishBtn, styles.finishBtnSecondary]}>
          <Text style={[styles.finishBtnText, { color: 'rgba(255,255,255,0.8)' }]}>← Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm, paddingBottom: SPACING.xs },
  backBtn: { width: 70 },
  backText: { color: 'rgba(255,255,255,0.75)', fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.white },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 5, paddingHorizontal: SPACING.xl, marginBottom: SPACING.md },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { backgroundColor: 'rgba(255,255,255,0.85)', width: 20 },

  cardArea: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.lg },
  cardTouch: { borderRadius: RADIUS.xl, ...SHADOW.float },
  card: {
    width: width - SPACING.lg * 2,
    height: (width - SPACING.lg * 2) * 1.15,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: SPACING.xl,
  },
  shimmer1: { position: 'absolute', width: 240, height: 240, borderRadius: 120, top: -60, right: -60, backgroundColor: 'rgba(255,255,255,0.12)' },
  shimmer2: { position: 'absolute', width: 150, height: 150, borderRadius: 75, bottom: -40, left: -30, backgroundColor: 'rgba(255,255,255,0.07)' },
  wordEmoji: { fontSize: 110, marginBottom: SPACING.md, textShadowColor: 'rgba(0,0,0,0.15)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 12 },
  wordEs: { fontSize: 60, fontWeight: '900', color: COLORS.white, textAlign: 'center', letterSpacing: -1,
    textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  wordEn: { fontSize: 24, fontWeight: '600', color: 'rgba(255,255,255,0.8)', marginTop: SPACING.sm },
  tapHintRow: { marginTop: SPACING.lg, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  tapHintText: { color: COLORS.white, fontSize: 14, fontWeight: '700' },

  navRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.xl, paddingBottom: SPACING.xl, paddingTop: SPACING.md },
  navBtn: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
  navBtnHidden: { opacity: 0 },
  navBtnText: { color: 'rgba(255,255,255,0.75)', fontSize: 16, fontWeight: '700' },
  nextBtn: { borderRadius: RADIUS.full, paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl, ...SHADOW.button },
  nextBtnText: { color: COLORS.white, fontSize: 18, fontWeight: '800' },

  finishBg: { flex: 1 },
  finishSafe: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md, padding: SPACING.xl },
  finishEmoji: { fontSize: 100 },
  finishTitle: { fontSize: 52, fontWeight: '900', color: COLORS.white, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  finishSub: { fontSize: 20, fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
  finishBtn: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: RADIUS.full, paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl, borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)', marginTop: SPACING.sm },
  finishBtnSecondary: { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.2)' },
  finishBtnText: { color: COLORS.white, fontSize: 18, fontWeight: '800' },
});
