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
const COVER_SIZE = width * 0.65;

export default function Peekaboo({ navigation, packId }) {
  const pack = getPackById(packId);
  const { settings, recordWordHeard } = useParent();
  const words = pack?.words ?? [];

  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finished, setFinished] = useState(false);

  // Cover scale: shrinks to 0 on reveal
  const coverScale = useRef(new Animated.Value(1)).current;
  // Emoji pops in after reveal
  const emojiScale  = useRef(new Animated.Value(0)).current;
  const emojiOpacity= useRef(new Animated.Value(0)).current;
  // Cover wobble to invite tap
  const wobble = useRef(new Animated.Value(0)).current;

  const currentWord = words[index];

  // Reset state on new word + wobble the cover to invite tap
  useEffect(() => {
    if (!currentWord) return;
    setRevealed(false);
    coverScale.setValue(1);
    emojiScale.setValue(0);
    emojiOpacity.setValue(0);

    // Gentle wobble to show it's tappable
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(wobble, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(wobble, { toValue: -1, duration: 400, useNativeDriver: true }),
          Animated.timing(wobble, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.delay(1200),
        ]),
        { iterations: 3 }
      ).start();
    }, 300);
  }, [index]);

  useEffect(() => () => stopAudio(), []);

  const handleReveal = () => {
    if (revealed) {
      // Second tap after reveal = replay audio
      playWord(currentWord.id, currentWord.es);
      return;
    }
    setRevealed(true);

    // Shrink cover away
    Animated.spring(coverScale, {
      toValue: 0,
      useNativeDriver: true,
      damping: 12,
      stiffness: 150,
    }).start();

    // Pop emoji in
    Animated.parallel([
      Animated.spring(emojiScale, { toValue: 1, useNativeDriver: true, damping: 8, stiffness: 130 }),
      Animated.timing(emojiOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();

    // Play audio + celebrate
    playWord(currentWord.id, currentWord.es);
    recordWordHeard(currentWord.id);
    playCelebration();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2200);
  };

  const handleNext = () => {
    if (index + 1 >= words.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
  };

  const handleReplay = () => {
    setIndex(0);
    setFinished(false);
  };

  const wobbleRotate = wobble.interpolate({ inputRange: [-1, 1], outputRange: ['-8deg', '8deg'] });

  if (!pack) return null;

  if (finished) {
    return (
      <LinearGradient colors={pack.gradient} style={styles.finishBg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <SafeAreaView style={styles.finishSafe}>
          <Text style={styles.finishEmoji}>🎊</Text>
          <Text style={styles.finishTitle}>¡Perfecto!</Text>
          <Text style={styles.finishSub}>All {words.length} words revealed!</Text>
          <TouchableOpacity onPress={handleReplay} style={styles.finishBtn}>
            <Text style={styles.finishBtnText}>🔄 Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.finishBtn, { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.2)' }]}>
            <Text style={[styles.finishBtnText, { color: 'rgba(255,255,255,0.75)' }]}>← Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1A0B2E', '#3B1F6A', '#6B3FA0']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { stopAudio(); navigation.goBack(); }} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>¡Cu-cú! 🙈</Text>
          <View style={styles.backBtn} />
        </View>

        {/* Progress */}
        <View style={styles.dotsRow}>
          {words.map((_, i) => (
            <View key={i} style={[styles.dot, i <= index && styles.dotActive]} />
          ))}
        </View>

        {/* Hint text */}
        <Text style={styles.hintText}>
          {revealed ? '🔊 Tap again to hear!' : '👆 Tap to reveal!'}
        </Text>

        {/* Peekaboo area */}
        <View style={styles.peekabooArea}>
          {/* Emoji (revealed) */}
          <Animated.View
            style={[styles.emojiContainer, { transform: [{ scale: emojiScale }], opacity: emojiOpacity }]}
          >
            <Text style={styles.revealedEmoji}>{currentWord.emoji}</Text>
          </Animated.View>

          {/* Cover (hidden state) */}
          <Animated.View
            style={[
              styles.coverContainer,
              { transform: [{ scale: coverScale }, { rotate: wobbleRotate }] },
            ]}
          >
            <TouchableOpacity onPress={handleReveal} activeOpacity={0.9}>
              <LinearGradient
                colors={pack.gradient}
                style={styles.cover}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.coverShimmer} />
                <Text style={styles.coverIcon}>?</Text>
                <Text style={styles.coverSub}>¡Toca!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Tap the revealed emoji to replay */}
          {revealed && (
            <TouchableOpacity
              onPress={handleReveal}
              style={styles.replayOverlay}
              activeOpacity={0.8}
            />
          )}
        </View>

        {/* Word name (shown after reveal) */}
        {revealed && (
          <View style={styles.wordRow}>
            <Text style={styles.wordEs}>{currentWord.es}</Text>
            {settings.bilingualMode && (
              <Text style={styles.wordEn}>{currentWord.en}</Text>
            )}
          </View>
        )}

        {/* Next button */}
        <View style={styles.navRow}>
          {revealed ? (
            <TouchableOpacity onPress={handleNext} style={[styles.nextBtn, { backgroundColor: pack.gradient[0] }]}>
              <Text style={styles.nextBtnText}>
                {index + 1 >= words.length ? '🎉 Finish' : 'Next ›'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.nextBtnPlaceholder} />
          )}
        </View>

        {showConfetti && (
          <ConfettiCannon
            count={80}
            origin={{ x: width / 2, y: height * 0.45 }}
            autoStart
            fadeOut
            colors={['#FF6B6B', '#FFD93D', '#6C63FF', '#43E97B', '#FF6584']}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  backBtn: { width: 70 },
  backText: { color: 'rgba(255,255,255,0.75)', fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.white },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 5, paddingHorizontal: SPACING.xl, marginTop: SPACING.sm },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { backgroundColor: 'rgba(255,255,255,0.85)', width: 20 },

  hintText: { textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 18, fontWeight: '700', marginVertical: SPACING.md },

  peekabooArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revealedEmoji: { fontSize: 160 },
  coverContainer: {
    ...SHADOW.float,
    borderRadius: COVER_SIZE / 2,
  },
  cover: {
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: COVER_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  coverShimmer: {
    position: 'absolute',
    width: COVER_SIZE * 0.7,
    height: COVER_SIZE * 0.7,
    borderRadius: COVER_SIZE * 0.35,
    top: -COVER_SIZE * 0.2,
    right: -COVER_SIZE * 0.1,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  coverIcon: { fontSize: 80, color: COLORS.white, fontWeight: '900' },
  coverSub: { fontSize: 20, color: 'rgba(255,255,255,0.8)', fontWeight: '700', marginTop: 4 },
  replayOverlay: {
    position: 'absolute',
    width: COVER_SIZE,
    height: COVER_SIZE,
    borderRadius: COVER_SIZE / 2,
  },

  wordRow: { alignItems: 'center', paddingBottom: SPACING.sm },
  wordEs: { fontSize: 52, fontWeight: '900', color: COLORS.white, letterSpacing: -1,
    textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  wordEn: { fontSize: 22, fontWeight: '600', color: 'rgba(255,255,255,0.7)', marginTop: 4 },

  navRow: { paddingBottom: SPACING.xl, alignItems: 'center' },
  nextBtn: { borderRadius: RADIUS.full, paddingVertical: SPACING.md, paddingHorizontal: SPACING.xxl, ...SHADOW.button },
  nextBtnText: { color: COLORS.white, fontSize: 18, fontWeight: '800' },
  nextBtnPlaceholder: { height: 52 },

  finishBg: { flex: 1 },
  finishSafe: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md, padding: SPACING.xl },
  finishEmoji: { fontSize: 100 },
  finishTitle: { fontSize: 52, fontWeight: '900', color: COLORS.white },
  finishSub: { fontSize: 20, fontWeight: '600', color: 'rgba(255,255,255,0.85)' },
  finishBtn: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: RADIUS.full, paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl, borderWidth: 1, borderColor: 'rgba(255,255,255,0.35)', marginTop: SPACING.sm },
  finishBtnText: { color: COLORS.white, fontSize: 18, fontWeight: '800' },
});
