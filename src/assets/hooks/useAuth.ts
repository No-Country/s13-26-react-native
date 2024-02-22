import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useSignOut } from 'react-firebase-hooks/auth';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
import { usePathname, useRouter } from 'expo-router';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Firebase_Auth, (authUser) => {
      setLoading(true);
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setLoading(false);

      if (loading) return;
      if (!authUser) {
        if (path !== '/registerScreen' && path !== '/loginScreen') {
          return navigation.replace('/registerScreen');
        }
        return;
      } else {
        if (path.includes('/registerScreen') || path.includes('/loginScreen')) {
          return navigation.replace('/homeScreen');
        }
      }
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, [path]);

  // const signIn = async (email, password) => {
  //   try {
  //     const login = await signInWithEmailAndPassword(Firebase_Auth, email, password);
  //     return { ok: true, login };
  //   } catch (error) {
  //     console.error('Error al iniciar sesión:', error.message);
  //     return { ok: false, message: error.message };
  //   }
  // };

  // const signOut = async () => {
  //   try {
  //     await useSignOut(Firebase_Auth);
  //   } catch (error) {
  //     console.error('Error al cerrar sesión:', error.message);
  //   }
  // };

  // const signUp = async (email, password) => {
  //   try {
  //     await createUserWithEmailAndPassword(Firebase_Auth, email, password);
  //   } catch (error) {
  //     console.error('Error al registrarse:', error.message);
  //   }
  // };

  return {
    user,
    loading,
    // signIn,
    // signOut,
    // signUp,
  };
};

export default useAuth;
