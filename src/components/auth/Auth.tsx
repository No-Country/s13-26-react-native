import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { Firebase_Auth } from '@/app/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = Firebase_Auth;

  const signIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className='mt-20'>
      <TextInput
        value={email}
        placeholder='email'
        onChangeText={(text) => setEmail(text)}
        style={style.textInput}
      />
      <TextInput
        value={password}
        placeholder='password'
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
  )
}

const style = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10
  }
})

export default Auth;