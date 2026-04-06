import { useRouter, useLocalSearchParams } from 'expo-router';
import TapAndSay from '../src/activities/TapAndSay';

export default function TapSayRoute() {
  const router = useRouter();
  const { packId } = useLocalSearchParams();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <TapAndSay navigation={navigation} packId={packId} />;
}
