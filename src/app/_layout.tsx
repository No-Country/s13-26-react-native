import 'react-native-reanimated';
import 'react-native-gesture-handler';

import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { loadAsync, useFonts } from 'expo-font';
import { useEffect } from 'react';
export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  const [loaded, error] = useFonts({
    montserrat_light: require('../assets/fonts/montserrat_light.ttf'),
    montserrat_medium: require('../assets/fonts/montserrat_medium.ttf'),
    montserrat_regular: require('../assets/fonts/montserrat_regular.ttf'),
    montserrat_semibold: require('../assets/fonts/montserrat_semibold.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <Slot />;
}
