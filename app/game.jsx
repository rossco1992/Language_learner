import { useRouter } from 'expo-router';
import GameScreen from '../src/screens/game/GameScreen';

export default function Game() {
  const router = useRouter();
  const navigation = {
    navigate: (screen, params) => router.push({ pathname: `/${screen.toLowerCase()}`, params }),
    goBack: () => router.back(),
  };
  return <GameScreen navigation={navigation} />;
}
