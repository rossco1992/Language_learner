import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';
import { getEmbedUrl, getVideoById } from '../../data/videos';
import { getUnitsForLevel, getWordsInLesson, getLessonsForUnit } from '../../data/curriculum';
import { useAge } from '../../context/AgeContext';
import { useSpeech } from '../../hooks/useSpeech';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = width * 0.5625; // 16:9

// Pick up to 6 words from the curriculum units that match the video's tags
function getRelatedWords(tags, level) {
  if (!tags?.length) return [];
  const units = getUnitsForLevel(level).filter((u) => tags.includes(u.id));
  const words = [];
  for (const unit of units) {
    const lessons = getLessonsForUnit(unit.id, level).filter((l) => l.type !== 'dialogue');
    for (const lesson of lessons) {
      words.push(...getWordsInLesson(unit.id, lesson.id));
      if (words.length >= 6) break;
    }
    if (words.length >= 6) break;
  }
  return words.slice(0, 6);
}

export default function VideoPlayer({ route, navigation }) {
  const { youtubeId, title, videoId } = route.params;
  const { ageProfile } = useAge();
  const level = ageProfile?.vocabLevel ?? 1;
  const { speak } = useSpeech();

  const video = videoId ? getVideoById(videoId) : null;
  const relatedWords = getRelatedWords(video?.tags, level);

  const [loadState, setLoadState] = useState('loading'); // 'loading' | 'ready' | 'error'

  const handleLoadEnd = useCallback(() => setLoadState('ready'), []);
  const handleError = useCallback(() => setLoadState('error'), []);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView style={styles.scroll} bounces={false} showsVerticalScrollIndicator={false}>
        {/* ── Video player ── */}
        <View style={styles.playerContainer}>
          {loadState !== 'error' && (
            <WebView
              source={{ uri: getEmbedUrl(youtubeId) }}
              style={styles.webview}
              allowsFullscreenVideo
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
              onHttpError={handleError}
            />
          )}

          {/* Loading overlay */}
          {loadState === 'loading' && (
            <View style={styles.loadingOverlay}>
              <Text style={styles.loadingEmoji}>📺</Text>
              <ActivityIndicator size="large" color={COLORS.white} style={{ marginTop: SPACING.md }} />
              <Text style={styles.loadingText}>Cargando...</Text>
            </View>
          )}

          {/* Error state */}
          {loadState === 'error' && (
            <View style={styles.errorOverlay}>
              <Text style={styles.errorEmoji}>😔</Text>
              <Text style={styles.errorTitle}>Video unavailable</Text>
              <Text style={styles.errorSub}>Check your internet connection</Text>
              <TouchableOpacity
                onPress={() => setLoadState('loading')}
                style={styles.retryBtn}
              >
                <Text style={styles.retryText}>↺ Try again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ── Co-viewing tip ── */}
        <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.tipCard}>
          <Text style={styles.tipEmoji}>👨‍👦</Text>
          <View style={styles.tipText}>
            <Text style={styles.tipTitle}>Watch Together!</Text>
            <Text style={styles.tipBody}>Point at the screen and repeat the Spanish words you hear together.</Text>
            <Text style={styles.tipEs}>¡Señala la pantalla y repite las palabras!</Text>
          </View>
        </LinearGradient>

        {/* ── Related vocabulary ── */}
        {relatedWords.length > 0 && (
          <View style={styles.vocabSection}>
            <Text style={styles.vocabHeading}>Words in this video 🔤</Text>
            <Text style={styles.vocabHeadingEs}>Palabras en este video</Text>
            <View style={styles.vocabGrid}>
              {relatedWords.map((word) => (
                <TouchableOpacity
                  key={word.id}
                  style={styles.wordChip}
                  onPress={() => speak(word.es)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.wordChipEmoji}>{word.emoji}</Text>
                  <Text style={styles.wordChipEs}>{word.es}</Text>
                  <Text style={styles.wordChipEn}>{word.en}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.vocabTip}>🔊 Tap a word to hear it in Spanish</Text>
          </View>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
  scroll: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: '#111',
  },
  backBtn: { width: 80 },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerTitle: { flex: 1, color: COLORS.white, fontSize: 16, fontWeight: '700', textAlign: 'center' },

  // Player
  playerContainer: { width, height: VIDEO_HEIGHT, backgroundColor: '#000' },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingEmoji: { fontSize: 52 },
  loadingText: { color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: '600', marginTop: SPACING.sm },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  errorEmoji: { fontSize: 52 },
  errorTitle: { color: COLORS.white, fontSize: 18, fontWeight: '700' },
  errorSub: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },
  retryBtn: { marginTop: SPACING.sm, backgroundColor: COLORS.primary, borderRadius: RADIUS.full, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm },
  retryText: { color: COLORS.white, fontSize: 15, fontWeight: '700' },

  // Tip card
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
    margin: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  tipEmoji: { fontSize: 36 },
  tipText: { flex: 1 },
  tipTitle: { fontSize: 16, fontWeight: '800', color: COLORS.white, marginBottom: 4 },
  tipBody: { fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 20 },
  tipEs: { fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 4, fontStyle: 'italic' },

  // Vocabulary
  vocabSection: {
    marginHorizontal: SPACING.md,
    backgroundColor: '#1a1a2e',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  vocabHeading: { fontSize: 18, fontWeight: '800', color: COLORS.white },
  vocabHeadingEs: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.45)', marginBottom: SPACING.md },
  vocabGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  wordChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    minWidth: (width - SPACING.md * 2 - SPACING.lg * 2 - SPACING.sm * 2) / 3,
    flex: 1,
  },
  wordChipEmoji: { fontSize: 28, marginBottom: 2 },
  wordChipEs: { fontSize: 14, fontWeight: '800', color: COLORS.white },
  wordChipEn: { fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.55)', marginTop: 1 },
  vocabTip: { fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: SPACING.md, textAlign: 'center' },

  bottomPad: { height: SPACING.xl },
});
