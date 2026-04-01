import { useRouter } from 'expo-router';
import AgeSelectScreen from '../src/screens/AgeSelectScreen';
import { useAge } from '../src/context/AgeContext';

export default function AgeSel() {
  const router = useRouter();
  const { ageProfile } = useAge();
  // If already has a profile, show back button (coming from HomeScreen "Change")
  const hasProfile = !!ageProfile;

  return (
    <AgeSelectScreen
      onSelected={() => router.replace('/')}
      showBack={hasProfile}
      onBack={() => router.back()}
    />
  );
}
