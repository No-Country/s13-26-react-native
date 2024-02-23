import React from 'react';
import { Stack } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

function Layout() {
  const router = useRouter();
  const { section } = useLocalSearchParams();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: 'Ejercicios',
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="[sectionScreen]" />
    </Stack>
  );
}
export default Layout;
