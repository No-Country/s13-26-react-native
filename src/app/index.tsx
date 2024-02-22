import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect, useRootNavigationState } from 'expo-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';

export default function Page() {
  const [logged, setLogged] = useState(false);
  const rootNavigationState = useRootNavigationState();
  const [user, loadingAuth] = useAuthState(Firebase_Auth);

  // if (!rootNavigationState?.key) return <ActivityIndicator color={'#fff'} size={'large'} />;
  // if (loadingAuth) return;

  


  if (user) return <Redirect href={'homeScreen'}></Redirect>;
  return <Redirect href={'loginScreen'}></Redirect>;
}
