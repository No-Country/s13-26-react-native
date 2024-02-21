import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ProfilePage() {
  return (
    <View style={style.container}>
      <Text>Profile</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 21,
    paddingHorizontal: 16,
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
