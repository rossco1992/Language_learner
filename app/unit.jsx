import { useRouter, useLocalSearchParams } from 'expo-router';
import UnitScreen from '../src/screens/explore/UnitScreen';

export default function UnitRoute() {
  const router = useRouter();
  const { unitId } = useLocalSearchParams();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <UnitScreen navigation={navigation} unitId={unitId} />;
}
