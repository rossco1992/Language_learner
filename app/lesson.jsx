import { useRouter, useLocalSearchParams } from 'expo-router';
import LessonScreen from '../src/screens/explore/LessonScreen';

export default function LessonRoute() {
  const router = useRouter();
  const { unitId, lessonId } = useLocalSearchParams();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <LessonScreen navigation={navigation} unitId={unitId} lessonId={lessonId} />;
}
