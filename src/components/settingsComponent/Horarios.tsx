import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome, Octicons } from '@expo/vector-icons';
import { obtenerHorariosUsuario, eliminarHorario, guardarHorariosUsuario } from '@/services/TimesServices';
import { AgregarHorarios } from './AgregarHorarios';
import Boton from '@/ui/Boton';
import useHorariosStore from '@/storages/horariosstore';
import { MyAppText } from '@/ui/MyAppText';
import { DayTimer } from '../dayTimer/DayTimer';

export const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mostrarAgregarHorarios, setMostrarAgregarHorarios] = useState(false);
  const { selectedDays, selectedStartTime, selectedEndTime, setSelectedDays, setSelectedStartTime, setSelectedEndTime } = useHorariosStore();

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const horariosUsuario = await obtenerHorariosUsuario();
        setHorarios(horariosUsuario);
        console.log(horariosUsuario)
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
            setIsDeleting(true);
            await eliminarHorario(horarioId);
            const nuevosHorarios = horarios.filter(horario => horario !== horarioId);
            setHorarios(nuevosHorarios);
            setIsDeleting(false);
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
      <MyAppText style={styles.title}>Mis horarios frente a la pantalla</MyAppText>
      {mostrarAgregarHorarios ? (
        <>
          <AgregarHorarios />
          <View style={styles.bottomButtonContainer}>
            <View style={styles.bottomButtonRow}>
              <Boton title='Atrás' onPress={() => setMostrarAgregarHorarios(!mostrarAgregarHorarios)} styles={{ backgroundColor: 'transparent' }} textStyles={{ color: '#F78764' }} />
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

              <View style={styles.horarioRow}>

                <MyAppText style={styles.diasText}>
                  {horario.dias.join('  ')}
                </MyAppText>

                <View style={styles.iconRow}>
                  <FontAwesome
                    name="trash-o"
                    size={20}
                    color="#09A4B7"
                    onPress={() => handleEliminarHorario(horario)} />
                  <Octicons
                    name="pencil"
                    size={20}
                    color="#09A4B7" />
                </View>

              </View>

              <View style={styles.horarioDetails}>
                <MyAppText style={styles.hoursText}>
                  {diferenciaDeHoras(horario.inicio, horario.final)} horas
                </MyAppText>
                <MyAppText style={styles.timeText}>
                  {horario.inicio} - {horario.final} hrs
                </MyAppText>
              </View>
            </View>
          ))}
          <View style={styles.addButtonContainer}>
            <Boton title='Agregar' onPress={() => setMostrarAgregarHorarios(true)} />
          </View>
          {isDeleting && (
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </>
      ) : (
        <View style={styles.noHorarioContainer}>
          <MyAppText style={styles.noHorarioTitle}>¿Aún no agregas tus horarios?</MyAppText>
          <MyAppText style={styles.noHorarioText}>Agrega tus horarios frente a la pantalla y activa las notificaciones</MyAppText>
          <Boton title='Agregar' onPress={() => setMostrarAgregarHorarios(!mostrarAgregarHorarios)} />
        </View>
      )}
      {!isLoading && !mostrarAgregarHorarios && (
        <View style={{ flex: 1, justifyContent: 'center' }}>
        <DayTimer />
      </View>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16
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
  horarioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 8
  },
  diasText: {
    fontWeight: '500',
    color: '#102B3F',
    fontFamily: 'montserrat_regular'
  },
  iconRow: {
    flexDirection: 'row',
    gap: 36,
    marginRight: 8
  },
  horarioDetails: {
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hoursText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#102B3F'
  },
  timeText: {
    marginTop: 10,
    color: '#102B3F',
    fontWeight: '400',
    fontSize: 14,
    fontFamily: 'montserrat_regular'
  },
  bottomButtonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end'
  },
  bottomButtonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 40
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 10,
  },
  noHorarioContainer: {
    backgroundColor: 'lightgray',
    width: '100%',
    padding: 10,
    marginTop: 20,
    borderRadius: 12,
    minHeight: '20%',
    alignItems: 'center'
  },
  noHorarioTitle: {
    fontSize: 20,
    fontWeight: '500'
  },
  noHorarioText: {
    textAlign: 'center',
    marginVertical: 10
  }
});
