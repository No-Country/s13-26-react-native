import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD60r8rhvzxVW8pk6Y_htDxiQk1JOBYvRc',
  authDomain: 'welltech-80e97.firebaseapp.com',
  projectId: 'welltech-80e97',
  storageBucket: 'welltech-80e97.appspot.com',
  messagingSenderId: '376935849787',
  appId: '1:376935849787:web:2b9f7b369576c11b27a11e',
  measurementId: 'G-WS04FGPVJX',
};

export const Firebase_App = initializeApp(firebaseConfig);

const initializeFirebaseAuth = () => {
  return initializeAuth(Firebase_App, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
};

export const Firebase_Auth = initializeFirebaseAuth();

// export const Firebase_Auth = getAuth(Firebase_App);
export const Firestore_Db = getFirestore(Firebase_App);
