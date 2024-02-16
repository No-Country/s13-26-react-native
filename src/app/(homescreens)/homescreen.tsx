import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useSignOut, useAuthState } from 'react-firebase-hooks/auth';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
import Boton from '../../ui/Boton';

function HomeScreen() {
  const [signOut, loadingOut] = useSignOut(Firebase_Auth);

  const [user, lading, error] = useAuthState(Firebase_Auth);

  function handleVerifyMail() {}

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
          <Boton title="Cerrar sesión" onPress={signOut} />
        </View>
      )}
    </View>
  );
}

export default HomeScreen;
