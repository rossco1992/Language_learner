import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUnit, getLesson } from '../../data/curriculum';
import { useProgress } from '../../context/ProgressContext';
import { useSpeech } from '../../hooks/useSpeech';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');

export default function LessonScreen({ navigation, unitId, lessonId }) {
  const unit = getUnit(unitId);
  const lesson = getLesson(unitId, lessonId);
  const { markLessonComplete, isLessonComplete } = useProgress();
  const { speak, speakPhrase } = useSpeech();

  if (!unit || !lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lesson not found</Text>
      </View>
    );
  }

  const alreadyDone = isLessonComplete(unitId, lessonId);

  if (lesson.type === 'dialogue') {
    return (
      <DialogueLesson
        unit={unit}
        lesson={lesson}
        navigation={navigation}
        speakPhrase={speakPhrase}
        onComplete={() => markLessonComplete(unitId, lessonId)}
        alreadyDone={alreadyDone}
      />
    );
  }

  return (
    <WordLesson
      unit={unit}
      lesson={lesson}
      navigation={navigation}
      speak={speak}
      onComplete={() => markLessonComplete(unitId, lessonId)}
      alreadyDone={alreadyDone}
    />
  );
}

// ─────────────────────────────────────────
// WORD LESSON — swipeable word cards
// ─────────────────────────────────────────
function WordLesson({ unit, lesson, navigation, speak, onComplete, alreadyDone }) {
  const words = lesson.words ?? [];
  const [index, setIndex] = useState(0);
  const [showEn, setShowEn] = useState(false);
  const [finished, setFinished] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const currentWord = words[index];

  useEffect(() => {
    if (currentWord) speak(currentWord.es);
  }, [index]);

  const flipCard = () => {
    Animated.timing(flipAnim, {
      toValue: showEn ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
    setShowEn(!showEn);
  };

  const handleNext = () => {
    flipAnim.setValue(0);
    setShowEn(false);
    if (index + 1 >= words.length) {
      onComplete();
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index === 0) return;
    flipAnim.setValue(0);
    setShowEn(false);
    setIndex(index - 1);
  };

  const frontOpacity = flipAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 0] });
  const backOpacity = flipAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });

  if (finished) {
    return <LessonComplete unit={unit} lesson={lesson} navigation={navigation} />;
  }

  return (
    <LinearGradient colors={['#FFF8F0', '#F0E8FF']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{lesson.emoji} {lesson.label}</Text>
          <View style={styles.backBtn} />
        </View>

        {/* Progress dots */}
        <View style={styles.dotsRow}>
          {words.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i <= index && { backgroundColor: unit.gradient[0] }]}
            />
          ))}
        </View>

        {/* Card */}
        <TouchableOpacity onPress={flipCard} activeOpacity={0.9} style={styles.cardContainer}>
          {/* Front (Spanish) */}
          <Animated.View style={[styles.card, { opacity: frontOpacity }]}>
            <LinearGradient colors={unit.gradient} style={styles.cardInner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
              <Text style={styles.wordEmoji}>{currentWord.emoji}</Text>
              <Text style={styles.wordEs}>{currentWord.es}</Text>
              <Text style={styles.tapHint}>Tap to see English</Text>
            </LinearGradient>
          </Animated.View>

          {/* Back (English) */}
          <Animated.View style={[styles.card, styles.cardBack, { opacity: backOpacity }]}>
            <View style={[styles.cardInner, { backgroundColor: '#FFFFFF' }]}>
              <Text style={styles.wordEmoji}>{currentWord.emoji}</Text>
              <Text style={styles.wordEn}>{currentWord.en}</Text>
              <Text style={styles.wordEsSm}>{currentWord.es}</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={handlePrev}
            style={[styles.navBtn, index === 0 && styles.navBtnDisabled]}
            disabled={index === 0}
          >
            <Text style={styles.navBtnText}>‹ Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => speak(currentWord.es)}
            style={[styles.speakBtn, { backgroundColor: unit.gradient[0] }]}
          >
            <Text style={styles.speakBtnText}>🔊 Listen</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={styles.navBtn}>
            <Text style={styles.navBtnText}>
              {index + 1 >= words.length ? 'Finish ✓' : 'Next ›'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.counter}>{index + 1} / {words.length}</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─────────────────────────────────────────
// DIALOGUE LESSON — conversation lines
// ─────────────────────────────────────────
function DialogueLesson({ unit, lesson, navigation, speakPhrase, onComplete, alreadyDone }) {
  const dialogues = lesson.dialogues ?? [];
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentDialogue = dialogues[dialogueIndex];

  const handleNextLine = () => {
    const lines = currentDialogue?.lines ?? [];
    speakPhrase(lines[lineIndex]?.es ?? '');

    if (lineIndex + 1 >= lines.length) {
      if (dialogueIndex + 1 >= dialogues.length) {
        onComplete();
        setFinished(true);
      } else {
        setDialogueIndex(dialogueIndex + 1);
        setLineIndex(0);
      }
    } else {
      setLineIndex(lineIndex + 1);
    }
  };

  if (finished) {
    return <LessonComplete unit={unit} lesson={lesson} navigation={navigation} />;
  }

  if (!currentDialogue) return null;
  const lines = currentDialogue.lines ?? [];
  const activeLine = lines[lineIndex];

  return (
    <LinearGradient colors={['#FFF8F0', '#F0E8FF']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>💬 Conversations</Text>
          <View style={styles.backBtn} />
        </View>

        {/* Dialogue title */}
        <View style={styles.dialogueTitleBox}>
          <Text style={styles.dialogueTitleEmoji}>{currentDialogue.emoji}</Text>
          <Text style={styles.dialogueTitle}>{currentDialogue.title}</Text>
          <Text style={styles.dialogueTitleEs}>{currentDialogue.titleEs}</Text>
          <Text style={styles.dialogueCounter}>{dialogueIndex + 1} / {dialogues.length}</Text>
        </View>

        {/* Lines so far */}
        <ScrollView style={styles.linesScroll} contentContainerStyle={styles.linesContent}>
          {lines.slice(0, lineIndex + 1).map((line, i) => (
            <View
              key={i}
              style={[
                styles.lineBubble,
                line.speaker === 'A' ? styles.lineBubbleA : styles.lineBubbleB,
              ]}
            >
              <Text style={styles.lineSpeaker}>{line.speaker}</Text>
              <View style={[styles.bubble, line.speaker === 'A' ? { backgroundColor: unit.gradient[0] } : { backgroundColor: unit.gradient[1] }]}>
                <Text style={styles.lineEs}>{line.es}</Text>
                <Text style={styles.lineEn}>{line.en}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Next button */}
        <TouchableOpacity onPress={handleNextLine} style={[styles.nextDialogueBtn, { backgroundColor: unit.gradient[0] }]}>
          <Text style={styles.nextDialogueBtnText}>
            {lineIndex + 1 >= lines.length
              ? dialogueIndex + 1 >= dialogues.length
                ? '🎉 Finish'
                : '→ Next Dialogue'
              : '▶ Next Line'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ─────────────────────────────────────────
// LESSON COMPLETE screen
// ─────────────────────────────────────────
function LessonComplete({ unit, lesson, navigation }) {
  const bounceAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 4,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient colors={unit.gradient} style={styles.completeBg} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={styles.completeContainer}>
        <Animated.Text style={[styles.completeEmoji, { transform: [{ scale: bounceAnim }] }]}>🎉</Animated.Text>
        <Text style={styles.completeTitle}>¡Muy bien!</Text>
        <Text style={styles.completeSubtitle}>Lesson complete!</Text>
        <Text style={styles.completeLessonName}>{lesson.emoji} {lesson.label}</Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.completeBtn}
        >
          <Text style={styles.completeBtnText}>Back to Unit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorText: { fontSize: 18, color: COLORS.gray },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backBtn: { width: 70 },
  backText: { color: COLORS.primary, fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.dark, textAlign: 'center', flex: 1 },

  // Dots
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: SPACING.md },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.lightGray },

  // Word card
  cardContainer: { alignSelf: 'center', marginVertical: SPACING.md },
  card: { width: width - SPACING.xl * 2, borderRadius: RADIUS.lg, ...SHADOW.button },
  cardBack: { position: 'absolute', top: 0, left: 0 },
  cardInner: { width: width - SPACING.xl * 2, height: 300, borderRadius: RADIUS.lg, alignItems: 'center', justifyContent: 'center', padding: SPACING.lg },
  wordEmoji: { fontSize: 80, marginBottom: SPACING.md },
  wordEs: { fontSize: 42, fontWeight: '900', color: COLORS.white, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
  tapHint: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: SPACING.sm },
  wordEn: { fontSize: 36, fontWeight: '800', color: COLORS.dark },
  wordEsSm: { fontSize: 18, fontWeight: '600', color: COLORS.gray, marginTop: 6 },

  // Controls
  controls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.xl, marginTop: SPACING.lg },
  navBtn: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md },
  navBtnDisabled: { opacity: 0.3 },
  navBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  speakBtn: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: RADIUS.full, ...SHADOW.button },
  speakBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  counter: { textAlign: 'center', fontSize: 13, fontWeight: '600', color: COLORS.gray, marginTop: SPACING.md },

  // Dialogue
  dialogueTitleBox: { alignItems: 'center', paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  dialogueTitleEmoji: { fontSize: 40 },
  dialogueTitle: { fontSize: 18, fontWeight: '800', color: COLORS.dark, textAlign: 'center', marginTop: 4 },
  dialogueTitleEs: { fontSize: 14, fontWeight: '500', color: COLORS.gray, textAlign: 'center' },
  dialogueCounter: { fontSize: 12, fontWeight: '600', color: COLORS.gray, marginTop: 6 },
  linesScroll: { flex: 1 },
  linesContent: { paddingHorizontal: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.md },
  lineBubble: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'flex-end' },
  lineBubbleA: { justifyContent: 'flex-start' },
  lineBubbleB: { justifyContent: 'flex-end', flexDirection: 'row-reverse' },
  lineSpeaker: { fontSize: 12, fontWeight: '800', color: COLORS.gray, marginBottom: 6 },
  bubble: { maxWidth: width * 0.7, borderRadius: RADIUS.md, padding: SPACING.md },
  lineEs: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  lineEn: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  nextDialogueBtn: { margin: SPACING.lg, borderRadius: RADIUS.full, paddingVertical: SPACING.md, alignItems: 'center', ...SHADOW.button },
  nextDialogueBtnText: { fontSize: 18, fontWeight: '800', color: COLORS.white },

  // Complete
  completeBg: { flex: 1 },
  completeContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xl },
  completeEmoji: { fontSize: 100, marginBottom: SPACING.md },
  completeTitle: { fontSize: 48, fontWeight: '900', color: COLORS.white, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  completeSubtitle: { fontSize: 22, fontWeight: '600', color: 'rgba(255,255,255,0.85)', marginTop: SPACING.sm },
  completeLessonName: { fontSize: 18, fontWeight: '700', color: 'rgba(255,255,255,0.75)', marginTop: SPACING.md },
  completeBtn: { marginTop: SPACING.xl, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: RADIUS.full, paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl },
  completeBtnText: { fontSize: 18, fontWeight: '800', color: COLORS.white },
});
