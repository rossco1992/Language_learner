import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AgeProvider, useAge } from '../src/context/AgeContext';
import { ProgressProvider } from '../src/context/ProgressContext';

function RootLayoutInner() {
  const { ageProfile, loading } = useAge();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    const onAgeSelect = segments[0] === 'ageselect';
    if (!ageProfile && !onAgeSelect) {
      router.replace('/ageselect');
    }
  }, [loading, ageProfile, segments]);

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </>
  );
}

export default function RootLayout() {
  return (
    <AgeProvider>
      <ProgressProvider>
        <RootLayoutInner />
      </ProgressProvider>
    </AgeProvider>
  );
}
