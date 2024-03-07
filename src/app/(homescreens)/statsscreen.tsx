import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { tomarTotalMedallas, tomarMedallasPorFecha } from '@/services/MedalsServices';
import { logo } from '@/assets/icons/index';

import { UserData } from '@/services/UserData';
import { Firestore_Db } from '@/components/auth/FirebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

import { MyAppText } from '@/ui/MyAppText';

export default function StatsPage() {
  const [medallas, setMedallas] = useState(0);
  const [medallasDiarias, setMedallasDiarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [userData, setUserData] = useState(null);

useEffect(() => {
  let unsubscribe;

  const fetchData = async () => {
    const querySnapshot = await UserData();
    const userIds = querySnapshot.docs.map((doc) => doc.id);
    const userId = userIds[0];

    unsubscribe = onSnapshot(doc(Firestore_Db, "users", userId), (doc) => {
      setUserData(doc?.data());
    });
  };

  fetchData();

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
}, []);

useEffect(() => {
  if (userData) {
    setLoading(true);
    const totalMedallas = userData?.totalMedallas;
    const medallasPorFecha = userData?.medallas;

    const medallasDiariasArray = Object.entries(medallasPorFecha).map(([fecha, cantidad]) => ({
      fecha,
      cantidad,
    }));

    medallasDiariasArray.sort((a, b) => {
      const fechaA = new Date(a.fecha.split('/').reverse().join('-')).getTime();
      const fechaB = new Date(b.fecha.split('/').reverse().join('-')).getTime();
      return fechaA - fechaB;
    });

    setMedallas(totalMedallas);
    setMedallasDiarias(medallasDiariasArray);
    setLoading(false);
  }
}, [userData]);

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
        <Feather name="award" size={25} color="#F78764" />
        <MyAppText style={styles.headerText}>Mi Progreso</MyAppText>
        <MyAppText style={{color: '#102B3F', fontWeight: '400', fontFamily: 'montserrat_regular'}}>Por cada pausa que completes ganas 1 medalla.</MyAppText>
      </View>

      <View style={styles.infoContainer}>
        <MyAppText style={styles.infoText}>Tienes {medallas} medallas</MyAppText>
        <MyAppText style={{ marginTop: 8, color: 'white', fontFamily: 'montserrat_regular' }}>¡Vamos por más!</MyAppText>
      </View>

      <MyAppText style={[styles.headerText, { marginTop: 20 }]}>Mi progreso diario</MyAppText>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />
      ) : (
        <View style={styles.carouselContainer}>
          {medallasDiarias?.map(({ fecha, cantidad }) => (
            <TouchableOpacity
              key={fecha}
              style={[
                styles.dayContainer,
                selectedDay && selectedDay?.fecha === fecha && { backgroundColor: '#67397E' },
              ]}
              onPress={() => handleDayPress(fecha, cantidad)}
            >
              <MyAppText style={styles.whiteText}>{getWeekdayName(fecha)}</MyAppText>
              <MyAppText style={styles.whiteText}>{getDateForDay(fecha)}</MyAppText>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.bottomContainer}>
        {medallas === 0 ? (
          <MyAppText style={styles.noMedalsText}>
            Aún no tienes medallas ¡Es momento de hacer un Paréntesis!
          </MyAppText>
        ) : (
          <View style={styles.todayContainer}>
            <MyAppText style={styles.todayText}>
              {selectedDay ? (
                <MyAppText style={{fontFamily: 'montserrat_regular', fontWeight: '600'}}>
                  Hoy acumulaste{' '}
                  {
                    <MyAppText style={{ fontWeight: 'bold', fontSize: 22 }}>
                      {selectedDay?.cantidad}
                    </MyAppText>
                  }{' '}
                  medallas!
                </MyAppText>
              ) : (
                'Selecciona un día para ver las medallas'
              )}
            </MyAppText>
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
    backgroundColor: 'white',
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
    fontWeight: '600',
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
    fontFamily: 'montserrat_regular'
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
    fontSize: 16,
    color: '#102B3F',
    
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
    marginRight: 10,
  },
  noMedalsText: {
    fontSize: 16,
    color: '#102B3F',
    marginBottom: 10,
  },
});
