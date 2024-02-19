import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, Text, View, Alert } from 'react-native';
import {
  useSignOut,
  useAuthState,
  useSendEmailVerification,
  useDeleteUser,
} from 'react-firebase-hooks/auth';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
import Boton from '../../ui/Boton';
import { useRouter } from 'expo-router';

function HomeScreen() {
  const [signOut, loadingOut] = useSignOut(Firebase_Auth);
  const [user, lading, error] = useAuthState(Firebase_Auth);
  const [sendEmailVerification] = useSendEmailVerification(Firebase_Auth);

  const router = useRouter();
  console.log(user)

  const handleVerifyMail = () => {
    sendEmailVerification(user)
    Alert.alert(
      'Se ha enviado un correo de verificacion',
      'Por favor, verifica tu correo electrónico.',
      [{ text: 'OK', onPress: () => console.log('OK') }]
    );
  }

  const handleSignOut = () => {
    signOut
    router.replace('loginscreen');
  }

  const [deleteUser, loading,] = useDeleteUser(Firebase_Auth);

  const handleDeleteUser = () => {
    const success = deleteUser();
    if (success) {
      Alert.alert(
        'Usuario borrado con exito',
        'Su usuario ha sido borrado',
        [{ text: 'OK', onPress: () => router.replace('loginscreen')}]
      );
    }
  }

  return (
    <View>
      <Text>Home Page</Text>
      <Text>Bienvenido {user?.displayName || 'Sin nombre'}</Text>
      <Text>Tu email es: {user?.email}</Text>
      {!user?.emailVerified && (
        <Pressable onPress={handleVerifyMail}>
          <Text>Verifica tu mail</Text>
        </Pressable>
      )}
      {loadingOut ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Boton title="Cerrar sesión" onPress={handleSignOut} styles={{marginTop: 10}}/>
          <Boton title="Borrar Usuario" onPress={handleDeleteUser} styles={{marginTop: 10}}/>
        </View>
      )}
    </View>
  );
}

export default HomeScreen;
