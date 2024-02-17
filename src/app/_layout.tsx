import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import RedirectLogin from '@/assets/hooks/RedirectLogin';

export default function Layout() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  return (
    <>
      <RedirectLogin />
      <Slot />
    </>
  );
}
