import { useRouter } from 'expo-router';
import HomeScreen from '../src/screens/HomeScreen';

export default function Index() {
  const router = useRouter();
  const navigation = {
    navigate: (screen, params) => {
      const path = `/${screen.toLowerCase()}`;
      router.push({ pathname: path, params });
    },
    goBack: () => router.back(),
  };
  return <HomeScreen navigation={navigation} />;
}
