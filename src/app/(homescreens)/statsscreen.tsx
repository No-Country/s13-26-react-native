import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function StatsPage() {
  return (
    <View style={style.container}>
      <Text>Stats</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
