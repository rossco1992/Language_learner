import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AgeProvider } from '../src/context/AgeContext';
import { ProgressProvider } from '../src/context/ProgressContext';
import { ParentProvider } from '../src/context/ParentContext';

export default function RootLayout() {
  return (
    <AgeProvider>
      <ProgressProvider>
        <ParentProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </ParentProvider>
      </ProgressProvider>
    </AgeProvider>
  );
}
