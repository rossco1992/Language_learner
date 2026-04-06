import { useRouter, useLocalSearchParams } from 'expo-router';
import PackScreen from '../src/child/PackScreen';

export default function PackRoute() {
  const router = useRouter();
  const { packId } = useLocalSearchParams();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <PackScreen navigation={navigation} packId={packId} />;
}
