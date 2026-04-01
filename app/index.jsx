import { useRouter } from 'expo-router';
import HomeScreen from '../src/screens/HomeScreen';

export default function Index() {
  const router = useRouter();
  // Pass a navigation-compatible object so HomeScreen works unchanged
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <HomeScreen navigation={navigation} />;
}
