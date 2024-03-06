import { Firestore_Db } from '@/components/auth/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserData } from './UserData';

export const obtenerHorariosUsuario = async () => {
  try {
    const querySnapshot = await UserData();

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const userHorarios = userData.horarios || [];

      return userHorarios;
    } else {
      console.error('No se encontró el usuario con el ID proporcionado.');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener los horarios del usuario:', error);
    return [];
  }
};

export const eliminarHorario = async (horarioId) => {
  try {
    const querySnapshot = await UserData();

    const getId = querySnapshot.docs[0].id;

    const userDocRef = doc(Firestore_Db, 'users', getId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      let userHorarios = userData?.horarios || [];

      const index = userHorarios.findIndex(horario => {
        return horario.dias.join(',') === horarioId.dias.join(',') &&
          horario.final === horarioId.final &&
          horario.inicio === horarioId.inicio;
      });

      if (index !== -1) {
        userHorarios.splice(index, 1);

        await updateDoc(userDocRef, { horarios: userHorarios });

        console.log('Horario eliminado correctamente');
      } else {
        console.error('No se encontró ningún horario con el ID proporcionado.');
      }
    } else {
      console.error('El documento del usuario no existe.');
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario o al buscar el horario:', error);
  }
};

export const guardarHorariosUsuario = async (selectedDays, selectedStartTime, selectedEndTime) => {
  const querySnapshot = await UserData();

  const userIds = querySnapshot.docs.map((doc) => doc.id);
  const userId = userIds[0];

  try {
    const userDocRef = doc(Firestore_Db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      await updateDoc(userDocRef, {
        horarios: [
          ...(userDocSnapshot.data().horarios || []),
          {
            dias: selectedDays,
            inicio: selectedStartTime,
            final: selectedEndTime,
          },
        ],
      });
    } else {
      console.error('El documento del usuario no existe.');
    }
  } catch (error) {
    console.error('Error al guardar los horarios del usuario:', error);
  }
};