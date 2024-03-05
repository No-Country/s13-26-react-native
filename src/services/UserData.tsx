import { Firebase_Auth, Firestore_Db } from '@/components/auth/FirebaseConfig';
import { query, collection, getDocs, where } from 'firebase/firestore';

export const UserData = async () => {
  const user = Firebase_Auth.currentUser;
  const uid = user.uid;

  const q = query(collection(Firestore_Db, 'users'), where('id', '==', uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot
}