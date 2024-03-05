import { Firestore_Db } from '@/components/auth/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserData } from './UserData';

export const sumarMedalla = async () => {
  const querySnapshot = await UserData();

  const userIds = querySnapshot.docs.map((doc) => doc.id);
  const userId = userIds[0];

  try {
    const userDocRef = doc(Firestore_Db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const today = new Date();
      const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

      const userDocData = userDocSnapshot.data();
      let medallas = userDocData.medallas || {};

      if (medallas[formattedDate]) {
        medallas[formattedDate]++;
      } else {
        medallas[formattedDate] = 1;
      }

      const dates = Object.keys(medallas);
      if (dates.length > 7) {
        let fechaMasAntigua = dates.reduce((a, b) => {
          const fechaA = new Date(a.split("/").reverse().join("-")).getTime();
          const fechaB = new Date(b.split("/").reverse().join("-")).getTime();
          return fechaA < fechaB ? a : b;
        });

        delete medallas[fechaMasAntigua];
      }

      let totalMedallas = userDocData.totalMedallas || 0;
      totalMedallas++;

      await updateDoc(userDocRef, { medallas, totalMedallas });
    } else {
      console.error('El documento del usuario no existe.');
    }
  } catch (error) {
    console.error('Error al guardar la medalla del usuario:', error);
  }
};

export const tomarMedallasPorFecha = async () => {
  const querySnapshot = await UserData();

  const userIds = querySnapshot.docs.map((doc) => doc.id);
  const userId = userIds[0];

  try {
    const userDocRef = doc(Firestore_Db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userDocData = userDocSnapshot.data();
      const medallas = userDocData.medallas || {};
      return medallas;
    } else {
      console.error('El documento del usuario no existe.');
      return {};
    }
  } catch (error) {
    console.error('Error al tomar las medallas por fecha:', error);
    return {};
  }
};

export const tomarTotalMedallas = async () => {
  const querySnapshot = await UserData();

  const userIds = querySnapshot.docs.map((doc) => doc.id);
  const userId = userIds[0];

  try {
    const userDocRef = doc(Firestore_Db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userDocData = userDocSnapshot.data();
      return userDocData.totalMedallas || 0;
    } else {
      console.error('El documento del usuario no existe.');
      return 0;
    }
  } catch (error) {
    console.error('Error al tomar el total de medallas:', error);
    return 0;
  }
};