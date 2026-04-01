import { useRouter } from 'expo-router';
import ShowScreen from '../src/screens/show/ShowScreen';

export default function Show() {
  const router = useRouter();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <ShowScreen navigation={navigation} />;
}
