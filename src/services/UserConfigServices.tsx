import { Firestore_Db } from '@/components/auth/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserData } from './UserData';

export const guardarGenero = async (genero: string) => {
  const querySnapshot = await UserData();

  const userIds = querySnapshot.docs.map((doc) => doc.id);
  const userId = userIds[0];

  try {
    const userDocRef = doc(Firestore_Db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {

      await updateDoc(userDocRef, { genero });
    } else {
      console.error('El documento del usuario no existe.');
    }
  } catch (error) {
    console.error('Error al guardar el genero del usuario:', error);
  }
}

export const guardarEdad = async (edad: number) => {
  const querySnapshot = await UserData();

  const userIds = querySnapshot.docs.map((doc) => doc.id);
  const userId = userIds[0];

  try {
    const userDocRef = doc(Firestore_Db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {

      await updateDoc(userDocRef, { edad });
    } else {
      console.error('El documento del usuario no existe.');
    }
  } catch (error) {
    console.error('Error al guardar la edad del usuario:', error);
  }
}