import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';

import { useAuthStore } from '@/storages/authstore';
import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
  useSignOut,
} from 'react-firebase-hooks/auth';

const Auth = () => {
  const email = useAuthStore((state) => state.email);
  const password = useAuthStore((state) => state.password);
  const authres = useAuthStore((state) => state.authres);
  const setEmail = useAuthStore((state) => state.setEmail);
  const setPassword = useAuthStore((state) => state.setPassword);
  const setAuthRes = useAuthStore((state) => state.setAuthRes);
  const auth = Firebase_Auth;
  const [signOut] = useSignOut(auth);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const signIn = () => {
    console.log(email, password);
    signInWithEmailAndPassword(email, password);
    setAuthRes(user);
    console.log(user);
    console.log('authres: ', authres?._tokenResponse.email);
    console.log(error);
  };
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const signUp = () => {
    signOut();
    console.log(email, password);
    createUserWithEmailAndPassword(email, password);
    setAuthRes(user);
    console.log(user);
  };

  return (
    <View className="mt-20">
      <TextInput
        inputMode="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        placeholder="email"
        onChangeText={(text) => setEmail(text)}
        style={style.textInput}
      />
      <TextInput
        secureTextEntry={true}
        value={password}
        placeholder="password"
        onChangeText={(text) => setPassword(text)}
        style={style.textInput}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={signIn} />
          <Button title="Create User" onPress={signUp} />
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10
  }
})

export default Auth;