import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'loginscreen',
};

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="loginScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="registerScreen"
        options={{
          headerShown: false,
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
