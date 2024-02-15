import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Auth from '../../components/auth/Auth';

export default function LoginPage() {
  return (
    <View style={style.container}>
      <Auth />
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
