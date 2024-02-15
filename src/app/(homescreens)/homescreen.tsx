import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRouter, Redirect } from 'expo-router';

export default function HomePage() {
  const router = useRouter();
  return (
    <View style={style.container}>
      <Text>Home</Text>
      <Button title="Salir" onPress={() => router.replace('loginscreen')}></Button>
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
