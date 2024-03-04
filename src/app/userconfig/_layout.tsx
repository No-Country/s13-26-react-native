import React from 'react';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
export const unstable_settings = {
  initialRouteName: 'index',
};
function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackVisible: true,
      }}
    >
      <Stack.Screen name="configAgeScreen" options={{ gestureEnabled: true }} />
      <Stack.Screen name="configTime" options={{ gestureEnabled: true }} />
      <Stack.Screen name="configNots" options={{ gestureEnabled: true }} />
    </Stack>
  );
}
export default Layout;
