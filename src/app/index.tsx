import React from 'react';
import { Text, View } from 'react-native';

import { MotiView } from 'moti';

export default function Page() {
  return (
    <MotiView
      className="flex flex-1 items-center justify-center"
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'timing', duration: 3000 }}
    >
      <Text className="text-4xl font-bold">Hola</Text>
    </MotiView>
  );
}
