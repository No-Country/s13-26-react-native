import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import RedirectLogin from '@/assets/hooks/RedirectLogin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function Layout() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  const [loading, setLoading] = useState(false);

  const [user, loadingAuth] = useAuthState(Firebase_Auth);

  useEffect(() => {
    setLoading(loadingAuth);
  }, [loadingAuth, user]);

  return (
    <>
      {loading ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            height: '100%',
            position: 'relative',
            // zIndex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      <RedirectLogin />
      <Slot />
    </>
  );
}
