import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Horarios, AgregarHorarios } from '@/components/settingsComponent';
import Boton from '@/ui/Boton';
import { Firestore_Db, Firebase_Auth } from '@/components/auth/FirebaseConfig'
import { doc, updateDoc, getDoc, where, query, collection, getDocs } from 'firebase/firestore';
import useHorariosStore from '@/storages/horariosstore';

export default function ProfilePage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { selectedDays, selectedStartTime, selectedEndTime, setSelectedDays, setSelectedStartTime, setSelectedEndTime } = useHorariosStore();
  const [currentComponent, setCurrentComponent] = useState('Horarios');

  const handleChangeComponent = () => {
    setCurrentComponent(currentComponent === 'Horarios' ? 'AgregarHorarios' : 'Horarios');
  };

  const getComponentToShow = () => {
    return currentComponent === 'Horarios' ? <Horarios /> : <AgregarHorarios />;
  };

  const guardarHorariosUsuario = async () => {
    const user = Firebase_Auth.currentUser;
    const uid = user.uid;
  
    const q = query(collection(Firestore_Db, 'users'), where('id', '==', uid));
    const querySnapshot = await getDocs(q);
  
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
  
    setCurrentComponent(currentComponent === 'Horarios' ? 'AgregarHorarios' : 'Horarios');
  };

  const borrarHorariosUsuario = () => {
    guardarHorariosUsuario()
    setSelectedDays([]);
    setSelectedStartTime('');
    setSelectedEndTime('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.nose}>
        <SegmentedControlTab
          values={['Horarios', 'Notificaciones']}
          selectedIndex={selectedIndex}
          onTabPress={(index) => setSelectedIndex(index)}
          activeTabStyle={styles.activeTab}
          tabStyle={styles.tab}
          tabTextStyle={styles.tabText}
          activeTabTextStyle={styles.activeTabText}
          borderRadius={16}
        />
      </View>

      <View style={{ width: '100%', height: '100%' }}>
        {getComponentToShow()}
      </View>

      <View style={styles.buttonContainer}>
        {currentComponent === 'Horarios' ? null : (
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Boton title='Listo' onPress={borrarHorariosUsuario} />
          </View>
        )}
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Boton title={currentComponent === 'Horarios' ? 'Agregar' : 'Atras'} onPress={handleChangeComponent} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 21,
    paddingHorizontal: 16,
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nose: {
    width: '100%',
    backgroundColor: '#ebebeb',
    borderRadius: 16
  },
  activeTab: {
    backgroundColor: 'white', // Estilos del tab seleccionado
    borderColor: '#ebebeb',
    borderWidth: 4,
    borderRadius: 14,
  },
  tab: {
    backgroundColor: '#ebebeb', // Estilos del tab no seleccionado
    borderColor: '#ebebeb',
    borderWidth: 6
  },
  tabText: {
    color: '#1c1c1c', // Color del texto para ambos tabs
    fontSize: 16,
    fontWeight: 'bold'
  },
  activeTabText: {
    color: '#1c1c1c', // Color del texto para el tab seleccionado
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinea los elementos hacia el final del contenedor (derecha)
    paddingHorizontal: 20,
    width: '100%',
  }
});
//145
//156