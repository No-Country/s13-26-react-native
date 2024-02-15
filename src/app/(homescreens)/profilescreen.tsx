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
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
