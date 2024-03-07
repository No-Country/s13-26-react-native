import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome, Octicons } from '@expo/vector-icons';
import { obtenerHorariosUsuario, eliminarHorario, guardarHorariosUsuario } from '@/services/TimesServices';
import { AgregarHorarios } from './AgregarHorarios';
import Boton from '@/ui/Boton';
import useHorariosStore from '@/storages/horariosstore';
import { MyAppText } from '@/ui/MyAppText';

export const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [mostrarAgregarHorarios, setMostrarAgregarHorarios] = useState(false);

  const { selectedDays, selectedStartTime, selectedEndTime, setSelectedDays, setSelectedStartTime, setSelectedEndTime } = useHorariosStore();

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const horariosUsuario = await obtenerHorariosUsuario();
        setHorarios(horariosUsuario);
      } catch (error) {
        console.error('Error al obtener los horarios del usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  const handleEliminarHorario = (horarioId) => {
    Alert.alert(
      'Seguro que quieres borrar este horario?',
      'El horario se borrara para siempre',
      [
        {
          text: 'Aceptar', onPress: async () => {
            await eliminarHorario(horarioId);
            const nuevosHorarios = horarios.filter(horario => horario !== horarioId);
            setHorarios(nuevosHorarios);
          }
        },
        { text: 'Cancelar', onPress: () => null, style: 'cancel' }
      ]
    );

  };

  const diferenciaDeHoras = (inicio, final) => {
    const [horaInicioNumerica] = inicio.split(":").map(Number);
    let [horaFinalNumerica] = final.split(":").map(Number);

    if (horaFinalNumerica < horaInicioNumerica) {
      horaFinalNumerica += 24;
    }

    let diferenciaEnHoras = horaFinalNumerica - horaInicioNumerica;

    return diferenciaEnHoras;
  };

  const borrarHorariosUsuario = async () => {
    await guardarHorariosUsuario(selectedDays, selectedStartTime, selectedEndTime);
    const nuevosHorarios = await obtenerHorariosUsuario();
  
    setHorarios(nuevosHorarios);
    setSelectedDays([]);
    setSelectedStartTime('');
    setSelectedEndTime('');
    setMostrarAgregarHorarios(false);
  };

  return (
    <View style={styles.container}>
      <MyAppText style={{ fontWeight: 'bold', fontSize: 16 }}>Mis horarios frente a la pantalla</MyAppText>
      {mostrarAgregarHorarios ? (
        <>
          <AgregarHorarios />
          <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: 40 }}>
              <Boton title='Atrás' onPress={() => setMostrarAgregarHorarios(!mostrarAgregarHorarios)} styles={{backgroundColor: 'transparent'}} textStyles={{color: '#F78764'}}/>
              <Boton title='Listo' onPress={borrarHorariosUsuario} />
            </View>
          </View>
        </>
      ) : isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : horarios?.length > 0 ? (
        <>
        {horarios?.map((horario, index) => (
          <View key={index} style={styles.horarioContainer}>

            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              marginHorizontal: 8
            }}>

              <MyAppText style={{ fontWeight: '500', color: '#102B3F', fontFamily: 'montserrat_regular' }}>
                {horario.dias.join('  ')}
              </MyAppText>

              <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 36,
                marginRight: 8
              }} >
                <FontAwesome
                  name="trash-o"
                  size={20}
                  color="#09A4B7"
                  onPress={() => handleEliminarHorario(horario)} />
                <Octicons
                  name="pencil"
                  size={20}
                  color="#09A4B7" />
              </View >

            </View >

            <View style={{
              marginVertical: 10,
              marginHorizontal: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <MyAppText style={{ fontSize: 20, fontWeight: 600, color: '#102B3F' }}>
                {diferenciaDeHoras(horario.inicio, horario.final)} horas
              </MyAppText>
              <MyAppText style={{ marginTop: 10, color: '#102B3F', fontWeight: '400', fontSize: 14, fontFamily: 'montserrat_regular' }}>
                {horario.inicio} - {horario.final} hrs
              </MyAppText >
            </View >
          </View >
          ))}
          <View style={styles.absoluteButtonContainer}>
            <Boton title='Agregar' onPress={() => setMostrarAgregarHorarios(true)} />
          </View>
        </>
      ) : (
        <View style={styles.sinHorarioContainer}>
          <MyAppText style={{ fontSize: 20, fontWeight: '500' }}>¿Aún no agregas tus horarios?</MyAppText>
          <MyAppText style={{ textAlign: 'center', marginVertical: 10 }}>Agrega tus horarios frente a la pantalla y activa las notificaciones</MyAppText>

          <Boton title='Agregar' onPress={() => setMostrarAgregarHorarios(!mostrarAgregarHorarios)}  />

        </View >
      )}
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center'
  },
  horarioContainer: {
    backgroundColor: '#E1F4EF',
    width: '100%',
    padding: 10,
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#09A4B7'
  },
  sinHorarioContainer: {
    backgroundColor: 'lightgray',
    width: '100%',
    padding: 10,
    marginTop: 20,
    borderRadius: 12,
    minHeight: '20%',
    alignItems: 'center'
  },
  absoluteButtonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 10,
  },
});