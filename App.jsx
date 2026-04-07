import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AgeProvider, useAge } from './src/context/AgeContext';
import { ParentProvider } from './src/context/ParentContext';
import { ProgressProvider } from './src/context/ProgressContext';
import { SessionProvider } from './src/context/SessionContext';
import { WordTrackerProvider } from './src/context/WordTrackerContext';
import SessionComplete from './src/components/SessionComplete';

// Child flow
import AgeSelectScreen from './src/screens/AgeSelectScreen';
import ChildHome from './src/child/ChildHome';
import PackScreen from './src/child/PackScreen';
import TapAndSay from './src/activities/TapAndSay';
import Peekaboo from './src/activities/Peekaboo';

// Content screens
import ShowScreen from './src/screens/show/ShowScreen';
import GameScreen from './src/screens/game/GameScreen';
import ExploreScreen from './src/screens/explore/ExploreScreen';
import UnitScreen from './src/screens/explore/UnitScreen';
import LessonScreen from './src/screens/explore/LessonScreen';
import WordGrid from './src/screens/explore/WordGrid';
import VideosScreen from './src/screens/videos/VideosScreen';
import VideoPlayer from './src/screens/videos/VideoPlayer';

// Parent flow
import ParentGate from './src/parent/ParentGate';
import ParentDashboard from './src/parent/ParentDashboard';

const Stack = createNativeStackNavigator();

const screenOptions = { headerShown: false, animation: 'fade' };

// Wrapper components that extract route params for screens that expect props
function PackScreenWrapper({ route, navigation }) {
  return <PackScreen navigation={navigation} packId={route.params.packId} />;
}
function TapAndSayWrapper({ route, navigation }) {
  return <TapAndSay navigation={navigation} packId={route.params.packId} />;
}
function PeekabooWrapper({ route, navigation }) {
  return <Peekaboo navigation={navigation} packId={route.params.packId} />;
}
function UnitScreenWrapper({ route, navigation }) {
  return <UnitScreen navigation={navigation} unitId={route.params.unitId} />;
}
function LessonScreenWrapper({ route, navigation }) {
  return <LessonScreen navigation={navigation} unitId={route.params.unitId} lessonId={route.params.lessonId} />;
}

// Root navigator decides: age selected? → ChildHome. Otherwise → AgeSelect.
function AppNavigator() {
  const { ageProfile, loading } = useAge();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {!ageProfile ? (
          // First-time: pick age
          <Stack.Screen name="AgeSelect">
            {(props) => <AgeSelectScreen {...props} onSelected={() => {}} />}
          </Stack.Screen>
        ) : (
          // Main app
          <>
            <Stack.Screen name="ChildHome" component={ChildHome} />
            <Stack.Screen name="pack" component={PackScreenWrapper} />
            <Stack.Screen name="tapsay" component={TapAndSayWrapper} />
            <Stack.Screen name="peekaboo" component={PeekabooWrapper} />
            <Stack.Screen name="Show" component={ShowScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="Explore" component={ExploreScreen} />
            <Stack.Screen name="unit" component={UnitScreenWrapper} />
            <Stack.Screen name="lesson" component={LessonScreenWrapper} />
            <Stack.Screen name="WordGrid" component={WordGrid} />
            <Stack.Screen name="videos" component={VideosScreen} />
            <Stack.Screen name="videoplayer" component={VideoPlayer} />
            <Stack.Screen name="sessioncomplete" component={SessionComplete} />
            <Stack.Screen name="parentgate" component={ParentGate} />
            <Stack.Screen name="parentdashboard" component={ParentDashboard} />
            <Stack.Screen name="ageselect">
              {(props) => <AgeSelectScreen {...props} showBack onBack={() => props.navigation.goBack()} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AgeProvider>
        <ParentProvider>
          <ProgressProvider>
            <WordTrackerProvider>
              <SessionProvider>
                <AppNavigator />
              </SessionProvider>
            </WordTrackerProvider>
          </ProgressProvider>
        </ParentProvider>
      </AgeProvider>
    </SafeAreaProvider>
  );
}
