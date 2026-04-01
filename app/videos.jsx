import { useRouter } from 'expo-router';
import VideosScreen from '../src/screens/videos/VideosScreen';

export default function Videos() {
  const router = useRouter();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <VideosScreen navigation={navigation} />;
}
