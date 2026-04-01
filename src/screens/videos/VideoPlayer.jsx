import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS } from '../../theme';
import { getEmbedUrl } from '../../data/videos';

const { width, height } = Dimensions.get('window');
const VIDEO_HEIGHT = width * 0.5625; // 16:9

export default function VideoPlayer({ route, navigation }) {
  const { youtubeId, title } = route.params;
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <View style={styles.backBtn} />
      </View>

      {/* Video player */}
      <View style={styles.playerContainer}>
        <WebView
          source={{ uri: getEmbedUrl(youtubeId) }}
          style={styles.webview}
          allowsFullscreenVideo
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading video...</Text>
          </View>
        )}
      </View>

      {/* Info card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoTip}>
          💡 Watch together and repeat the Spanish words you hear!
        </Text>
        <Text style={styles.infoTipEs}>
          ¡Miren juntos y repitan las palabras!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000' },
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
  title: { flex: 1, color: COLORS.white, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  playerContainer: {
    width,
    height: VIDEO_HEIGHT,
    backgroundColor: '#000',
  },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  loadingText: { color: COLORS.white, fontSize: 16, fontWeight: '500' },
  infoCard: {
    flex: 1,
    margin: SPACING.lg,
    backgroundColor: '#1a1a2e',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.md,
  },
  infoTip: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    fontWeight: '500',
  },
  infoTipEs: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    marginTop: SPACING.sm,
    fontStyle: 'italic',
  },
});
