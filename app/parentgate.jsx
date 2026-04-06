import { useRouter } from 'expo-router';
import ParentGate from '../src/parent/ParentGate';

export default function ParentGateRoute() {
  const router = useRouter();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <ParentGate navigation={navigation} />;
}
