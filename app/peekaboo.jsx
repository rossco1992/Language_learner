import { useRouter, useLocalSearchParams } from 'expo-router';
import Peekaboo from '../src/activities/Peekaboo';

export default function PeekabooRoute() {
  const router = useRouter();
  const { packId } = useLocalSearchParams();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <Peekaboo navigation={navigation} packId={packId} />;
}
