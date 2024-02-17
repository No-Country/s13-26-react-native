import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'expo-router';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function RedirectLogin() {
  const auth = Firebase_Auth;

  const router = useRouter();
  const path = usePathname();
  const [usuario, loading, error] = useAuthState(auth);

  useEffect(() => {
    (async () => {
      if (loading) return;
      if (!usuario) {
        if (path !== '/registerScreen' && path !== '/loginScreen') {
          return router.replace('/registerScreen');
        }
        return;
      } else {
        if (path.includes('/registerScreen') || path.includes('/loginScreen')) {
          return router.replace('/homeScreen');
        }
      }
    })();
  }, [loading, path, usuario]);

  return null;
}
