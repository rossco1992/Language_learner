import { useRouter } from 'expo-router';
import ExploreScreen from '../src/screens/explore/ExploreScreen';

export default function Explore() {
  const router = useRouter();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <ExploreScreen navigation={navigation} />;
}
