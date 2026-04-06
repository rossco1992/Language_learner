import { useRouter } from 'expo-router';
import ParentDashboard from '../src/parent/ParentDashboard';

export default function ParentDashboardRoute() {
  const router = useRouter();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <ParentDashboard navigation={navigation} />;
}
