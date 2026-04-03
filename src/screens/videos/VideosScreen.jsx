import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  VIDEOS,
  VIDEO_CATEGORIES,
  getVideosByCategory,
  getThumbnailUrl,
} from '../../data/videos';
import { COLORS, SPACING, RADIUS, SHADOW } from '../../theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - SPACING.lg * 2;

export default function VideosScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState('songs');
  const videos = getVideosByCategory(selectedCategory);

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Videos 🎬</Text>
          <View style={styles.backBtn} />
        </View>

        <Text style={styles.subheading}>Spanish videos for kids 🇲🇽</Text>

        {/* Category tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContent}
        >
          {VIDEO_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              style={[styles.tab, selectedCategory === cat.id && styles.tabActive]}
            >
              <Text style={styles.tabEmoji}>{cat.emoji}</Text>
              <Text style={[styles.tabLabel, selectedCategory === cat.id && styles.tabLabelActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Video list */}
        <FlatList
          data={videos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <VideoCard
              video={item}
              onPress={() => navigation.navigate('videoplayer', { youtubeId: item.youtubeId, title: item.titleEs, videoId: item.id })}
            />
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

function VideoCard({ video, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [imgError, setImgError] = useState(false);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.97, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={[styles.cardWrapper, { transform: [{ scale }] }]}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.92} style={styles.card}>
        {/* Thumbnail */}
        <View style={styles.thumbnailContainer}>
          {imgError ? (
            <View style={[styles.thumbnail, styles.thumbnailFallback]}>
              <Text style={styles.thumbnailFallbackEmoji}>{video.emoji}</Text>
            </View>
          ) : (
            <Image
              source={{ uri: getThumbnailUrl(video.youtubeId) }}
              style={styles.thumbnail}
              resizeMode="cover"
              onError={() => setImgError(true)}
            />
          )}
          <View style={styles.playOverlay}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
          <View style={styles.emojiTag}>
            <Text style={styles.emojiTagText}>{video.emoji}</Text>
          </View>
        </View>

        {/* Info */}
        <View style={[styles.cardInfo, { backgroundColor: video.bgColor || '#FFF' }]}>
          <Text style={styles.titleEs}>{video.titleEs}</Text>
          <Text style={styles.titleEn}>{video.title}</Text>
          <View style={styles.channelRow}>
            <Text style={styles.channelText}>📺 {video.channel}</Text>
          </View>
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
  },
  backBtn: { width: 80, paddingVertical: SPACING.sm },
  backText: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: COLORS.white, fontSize: 22, fontWeight: '800' },
  subheading: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: SPACING.md,
  },
  tabsScroll: { flexGrow: 0 },
  tabsContent: { paddingHorizontal: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.md },
  tab: {
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
  tabActive: { backgroundColor: COLORS.white },
  tabEmoji: { fontSize: 18 },
  tabLabel: { fontSize: 15, fontWeight: '700', color: 'rgba(255,255,255,0.85)' },
  tabLabelActive: { color: COLORS.dark },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl, gap: SPACING.md },
  cardWrapper: { borderRadius: RADIUS.lg, ...SHADOW.card },
  card: { borderRadius: RADIUS.lg, overflow: 'hidden' },
  thumbnailContainer: { width: CARD_WIDTH, height: CARD_WIDTH * 0.56, position: 'relative' },
  thumbnail: { width: '100%', height: '100%', backgroundColor: '#333' },
  thumbnailFallback: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a2e' },
  thumbnailFallbackEmoji: { fontSize: 64 },
  playOverlay: {
    position: 'absolute',
    inset: 0,
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  playIcon: {
    fontSize: 48,
    color: COLORS.white,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  emojiTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: RADIUS.full,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiTagText: { fontSize: 22 },
  cardInfo: { padding: SPACING.md },
  titleEs: { fontSize: 22, fontWeight: '800', color: COLORS.dark },
  titleEn: { fontSize: 15, fontWeight: '500', color: COLORS.gray, marginTop: 2 },
  channelRow: { marginTop: SPACING.xs },
  channelText: { fontSize: 13, color: COLORS.gray, fontWeight: '500' },
});
