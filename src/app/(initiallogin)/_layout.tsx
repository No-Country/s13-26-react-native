import { View, Text } from 'react-native';

import { Stack } from 'expo-router';

export const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="initialLogin" />
    </Stack>
  );
};
