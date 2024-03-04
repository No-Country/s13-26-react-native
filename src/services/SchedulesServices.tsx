import { Firebase_Auth, Firestore_Db } from '@/components/auth/FirebaseConfig';
import { query, collection, getDocs, where, doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

export const obtenerHorariosUsuario = async () => {
    const user = Firebase_Auth.currentUser;
    const uid = user.uid;

    try {
        const q = query(collection(Firestore_Db, 'users'), where('id', '==', uid));
        const querySnapshot = await getDocs(q);

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
    const user = Firebase_Auth.currentUser;
    const uid = user.uid;

    try {
        const q = query(collection(Firestore_Db, 'users'), where('id', '==', uid));
        const querySnapshot = await getDocs(q);
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