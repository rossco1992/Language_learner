import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';
import { CATEGORIES } from '../../data/vocabulary';
import { useSpeech } from '../../hooks/useSpeech';
import GameChoice from './GameChoice';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');
const NUM_CHOICES = 3;

function pickQuestion(allWords) {
  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  const choices = shuffled.slice(0, NUM_CHOICES);
  const correct = choices[Math.floor(Math.random() * NUM_CHOICES)];
  return { choices, correct };
}

export default function GameScreen({ navigation }) {
  const allWords = CATEGORIES.flatMap((c) => c.words);
  const { speakPhrase, speak, stop } = useSpeech();

  const [question, setQuestion] = useState(() => pickQuestion(allWords));
  const [choiceStates, setChoiceStates] = useState({});
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const celebrationScale = useRef(new Animated.Value(0)).current;
  const celebrationOpacity = useRef(new Animated.Value(0)).current;

  const askQuestion = useCallback((q) => {
    setChoiceStates({});
    setAnswered(false);
    setShowConfetti(false);
    celebrationScale.setValue(0);
    celebrationOpacity.setValue(0);
    speakPhrase(`¿Dónde está ${q.correct.es}?`);
  }, [speakPhrase]);

  useEffect(() => {
    askQuestion(question);
    return () => stop();
  }, [question.correct.id]);

  const showCelebration = () => {
    Animated.parallel([
      Animated.spring(celebrationScale, { toValue: 1, useNativeDriver: true, damping: 8, stiffness: 150 }),
      Animated.timing(celebrationOpacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const hideCelebration = () => {
    Animated.timing(celebrationOpacity, { toValue: 0, duration: 200, useNativeDriver: true }).start();
  };

  const handleChoice = (word) => {
    if (answered) return;
    setAnswered(true);

    const isCorrect = word.id === question.correct.id;
    setChoiceStates((prev) => ({ ...prev, [word.id]: isCorrect ? 'correct' : 'wrong' }));

    if (isCorrect) {
      setScore((s) => s + 1);
      setShowConfetti(true);
      showCelebration();
      speak('¡Muy bien!');
      setTimeout(() => { hideCelebration(); nextQuestion(); }, 2000);
    } else {
      setTimeout(() => {
        setChoiceStates((prev) => ({ ...prev, [question.correct.id]: 'correct' }));
        speak(question.correct.es);
      }, 600);
      setTimeout(nextQuestion, 2500);
    }
  };

  const nextQuestion = () => setQuestion(pickQuestion(allWords));

  return (
    <LinearGradient colors={['#FFF0F8', '#F0F8FF', '#F8FFF0']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { stop(); navigation.goBack(); }} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>¡Jugar! 🎮</Text>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreText}>⭐ {score}</Text>
          </View>
        </View>

        <View style={styles.promptContainer}>
          <Text style={styles.promptLabel}>¿Dónde está...?</Text>
          <View style={styles.correctWordCard}>
            <Text style={styles.correctWordEmoji}>{question.correct.emoji}</Text>
            <Text style={styles.correctWord}>{question.correct.es}</Text>
            <Text style={styles.correctWordEn}>{question.correct.en}</Text>
          </View>
          <TouchableOpacity onPress={() => speakPhrase(`¿Dónde está ${question.correct.es}?`)} style={styles.repeatBtn}>
            <Text style={styles.repeatText}>🔊 Repeat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.choicesContainer}>
          <Text style={styles.choicesLabel}>Find it! 👆</Text>
          <View style={styles.choicesRow}>
            {question.choices.map((word) => (
              <GameChoice
                key={word.id}
                word={word}
                onPress={() => handleChoice(word)}
                state={choiceStates[word.id] || 'idle'}
              />
            ))}
          </View>
        </View>

        <Animated.View
          style={[styles.celebration, { transform: [{ scale: celebrationScale }], opacity: celebrationOpacity }]}
          pointerEvents="none"
        >
          <Text style={styles.celebrationText}>¡Muy bien! 🎉</Text>
          <Text style={styles.celebrationSub}>Excellent!</Text>
        </Animated.View>

        {showConfetti && (
          <ConfettiCannon
            count={120}
            origin={{ x: width / 2, y: -20 }}
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
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  backBtn: { width: 70, paddingVertical: SPACING.sm },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.dark },
  scoreBadge: { backgroundColor: '#FFD93D', borderRadius: RADIUS.full, paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, ...SHADOW.card },
  scoreText: { fontSize: 18, fontWeight: '800', color: COLORS.dark },
  promptContainer: { alignItems: 'center', paddingHorizontal: SPACING.xl, paddingVertical: SPACING.lg, flex: 1, justifyContent: 'center' },
  promptLabel: { fontSize: 26, fontWeight: '700', color: COLORS.gray, marginBottom: SPACING.md },
  correctWordCard: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, paddingVertical: SPACING.xl, paddingHorizontal: SPACING.xxl, alignItems: 'center', ...SHADOW.card, width: '100%' },
  correctWordEmoji: { fontSize: 72, marginBottom: SPACING.sm },
  correctWord: { fontSize: 52, fontWeight: '900', color: COLORS.dark, textAlign: 'center' },
  correctWordEn: { fontSize: 22, fontWeight: '600', color: COLORS.gray, textAlign: 'center' },
  repeatBtn: { marginTop: SPACING.md, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, backgroundColor: 'rgba(108,99,255,0.1)', borderRadius: RADIUS.full },
  repeatText: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  choicesContainer: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl },
  choicesLabel: { textAlign: 'center', fontSize: 20, fontWeight: '700', color: COLORS.dark, marginBottom: SPACING.md },
  choicesRow: { flexDirection: 'row', justifyContent: 'center', gap: SPACING.md },
  celebration: { position: 'absolute', top: '35%', left: SPACING.xl, right: SPACING.xl, backgroundColor: '#FFD93D', borderRadius: RADIUS.lg, paddingVertical: SPACING.lg, alignItems: 'center', ...SHADOW.button, zIndex: 10 },
  celebrationText: { fontSize: 42, fontWeight: '900', color: COLORS.dark },
  celebrationSub: { fontSize: 22, fontWeight: '700', color: COLORS.dark, opacity: 0.7 },
});
