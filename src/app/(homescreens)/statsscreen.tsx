import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { tomarTotalMedallas, tomarMedallasPorFecha } from '@/services/MedalsServices';
import { logo } from '@/assets/icons/index';

export default function StatsPage() {
  const [medallas, setMedallas] = useState(0);
  const [medallasDiarias, setMedallasDiarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    async function fetchMedallas() {
      const totalMedallas = await tomarTotalMedallas();
      const medallasPorFecha = await tomarMedallasPorFecha();

      const medallasDiariasArray = Object.entries(medallasPorFecha).map(([fecha, cantidad]) => ({ fecha, cantidad }));

      medallasDiariasArray.sort((a, b) => {
        const fechaA = new Date(a.fecha.split("/").reverse().join("-")).getTime();
        const fechaB = new Date(b.fecha.split("/").reverse().join("-")).getTime();
        return fechaA - fechaB;
      });

      setMedallas(totalMedallas);
      setMedallasDiarias(medallasDiariasArray);
      setLoading(false);
    }
    fetchMedallas();
  }, []);

  const getWeekdayName = (fecha) => {
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const [dia, mes, año] = fecha.split('/');
    const date = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));
    const weekdayIndex = date.getDay();
    return weekdays[weekdayIndex];
  };

  const getDateForDay = (fecha) => {
    const [dia, mes, año] = fecha.split('/');
    return dia;
  };

  const handleDayPress = (fecha, cantidad) => {
    setSelectedDay({ fecha, cantidad });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerAlign}>
        <Feather name="award" size={25} color='#F78764' />
        <Text style={styles.headerText}>Mi Progreso</Text>
        <Text>Por cada pausa que completes ganas 1 medalla.</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Tienes {medallas} medallas</Text>
        <Text style={[styles.infoText, { marginTop: 8 }]}>¡Vamos por más!</Text>
      </View>

      <Text style={[styles.headerText, { marginTop: 20 }]}>Mi progreso diario</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
      ) : (
        <View style={styles.carouselContainer}>
          {medallasDiarias.map(({ fecha, cantidad }) => (
            <TouchableOpacity
              key={fecha}
              style={[
                styles.dayContainer,
                selectedDay && selectedDay.fecha === fecha && { backgroundColor: '#67397E' }
              ]}
              onPress={() => handleDayPress(fecha, cantidad)}
            >
              <Text style={styles.whiteText}>{getWeekdayName(fecha)}</Text>
              <Text style={styles.whiteText}>{getDateForDay(fecha)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.bottomContainer}>
        {medallas === 0 ? (
          <Text style={styles.noMedalsText}>Aún no tienes medallas ¡Es momento de hacer un Paréntesis!</Text>
        ) : (
          <View style={styles.todayContainer}>
            <Text style={styles.todayText}>
              {selectedDay ? `Hoy acumulaste ${selectedDay.cantidad} medallas!` : 'Selecciona un día para ver las medallas'}
            </Text>
          </View>
        )}
        <Image style={styles.logo} source={logo} resizeMode="contain" />
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
  centerAlign: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
  },
  infoContainer: {
    backgroundColor: '#09A4B7',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  carouselContainer: {
    marginTop: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  dayContainer: {
    width: 45,
    height: 80,
    borderRadius: 35,
    backgroundColor: '#8D6A9F',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  whiteText: {
    color: 'white',
  },
  todayContainer: {
    backgroundColor: '#E1F4EF',
    borderColor: '#09A4B7',
    borderWidth: 1,
    borderRadius: 20,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayText: {
    fontSize: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 100,
    height: 60,
    marginTop: 30,
    marginRight: 10
  },
  noMedalsText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  }
});
