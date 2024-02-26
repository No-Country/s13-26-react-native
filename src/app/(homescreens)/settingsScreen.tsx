import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Boton from '../../ui/Boton';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
export default function ProfilePage() {
  const [signOut, loadingOut] = useSignOut(Firebase_Auth);
  return (
    <View style={style.container}>
      {loadingOut ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Boton title="Cerrar sesión" onPress={signOut} />
        </View>
      )}
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
