import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import authHook from '../assets/hooks/useAuth';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function Layout() {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  const [loading, setLoading] = useState(false);

  const { loading: loadingAuth, user } = authHook();

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
      ) : (
        <></>
      )}
      <Slot />
    </>
  );
}
