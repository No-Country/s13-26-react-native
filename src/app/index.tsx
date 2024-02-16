import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Redirect, useRootNavigationState } from 'expo-router';

export default function Page() {
  const [logged, setLogged] = useState(false);
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return <ActivityIndicator color={'#fff'} size={'large'} />;

  if (logged) return <Redirect href={'homeScreen'}></Redirect>;
  return <Redirect href={'loginScreen'}></Redirect>;
}
