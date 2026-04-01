import { useRouter, useLocalSearchParams } from 'expo-router';
import WordGrid from '../src/screens/explore/WordGrid';

export default function WordGridRoute() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  const route = { params: { categoryId } };
  return <WordGrid navigation={navigation} route={route} />;
}
