import { Firebase_Auth, Firestore_Db } from '@/components/auth/FirebaseConfig';
import { query, collection, getDocs, where, doc, getDoc } from 'firebase/firestore';

export const UserData = async () => {
  await new Promise(resolve => Firebase_Auth.onAuthStateChanged(user => {
      if (user) resolve(undefined);
  }));

  const user = Firebase_Auth.currentUser;
  const uid = user.uid;
  
  const q = query(collection(Firestore_Db, 'users'), where('id', '==', uid));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
      return querySnapshot;
  } else {
      console.log('No se encontró información del usuario');
  }
};

export const UserInformation = async () => {
  const querySnapshot = await UserData();

  if (querySnapshot) {
    const userIds = querySnapshot?.docs?.map((doc) => doc?.id);
    const userId = userIds[0];

    const userDocRef = doc(Firestore_Db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userDocData = userDocSnapshot?.data();
      return userDocData;
    } else {
      console.log('No se encontro informacion del usuario')
    }
  } else {
    console.log('No se encontro informacion del usuario')
  }
}