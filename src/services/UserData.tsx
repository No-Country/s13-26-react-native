import { Firebase_Auth, Firestore_Db } from '@/components/auth/FirebaseConfig';
import { query, collection, getDocs, where, doc, getDoc } from 'firebase/firestore';

export const UserData = async () => {
  const user = Firebase_Auth.currentUser;
  const uid = user.uid;

  const q = query(collection(Firestore_Db, 'users'), where('id', '==', uid));
  const querySnapshot = await getDocs(q);

  return querySnapshot
}

export const UserInformation = async () => {
  const querySnapshot = await UserData()

  const userIds = querySnapshot.docs.map((doc) => doc.id);
  const userId = userIds[0];

  const userDocRef = doc(Firestore_Db, 'users', userId);
  const userDocSnapshot = await getDoc(userDocRef);

  const userDocData = userDocSnapshot.data();

  return userDocData
}