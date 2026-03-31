import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import ShowScreen from './src/screens/show/ShowScreen';
import ExploreScreen from './src/screens/explore/ExploreScreen';
import WordGrid from './src/screens/explore/WordGrid';
import GameScreen from './src/screens/game/GameScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false, animation: 'fade' }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Show" component={ShowScreen} />
          <Stack.Screen name="Explore" component={ExploreScreen} />
          <Stack.Screen name="WordGrid" component={WordGrid} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
