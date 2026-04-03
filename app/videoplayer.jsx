import { useRouter, useLocalSearchParams } from 'expo-router';
import VideoPlayer from '../src/screens/videos/VideoPlayer';

export default function VideoPlayerRoute() {
  const router = useRouter();
  const { youtubeId, title, videoId } = useLocalSearchParams();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  const route = { params: { youtubeId, title, videoId } };
  return <VideoPlayer navigation={navigation} route={route} />;
}
