import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Feather } from '@expo/vector-icons';

export default function StatsPage() {
  const getWeekdayName = (index) => {
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const todayIndex = new Date().getDay();
    const targetIndex = todayIndex + index;

    const adjustedIndex = targetIndex > 6 ? targetIndex - 7 : targetIndex;

    return weekdays[adjustedIndex];
  };

  const getDateForDay = (index) => {
    const today = new Date();
    today.setDate(today.getDate() + index);
    const day = today.getDate();
    return `${day}`;
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Feather name="award" size={25} color='#F78764' />
        <Text style={{fontSize: 20, fontWeight: '500'}}>Mi Progreso</Text>
        <Text>Por cada pausa que completes ganas 1 medalla.</Text>
      </View>

      <View style={{ backgroundColor: '#09A4B7', width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, borderRadius: 10, marginTop: 20 }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>Tienes 0 medallas</Text>
        <Text style={{color: 'white', marginTop: 8}}>¡Vamos por más!</Text>
      </View>

      <View style={styles.carouselContainer}>
        <Text>Mi progreso diario</Text>
        <SwiperFlatList
          style={styles.swiper}
          data={[...Array(10).keys()]}
          renderItem={({ item }) => (
            <View style={styles.dayContainer}>
              <Text>{getWeekdayName(item)}</Text>
              <Text>{getDateForDay(item)}</Text>
            </View>
          )}
          horizontal
          index={6}
          keyExtractor={(item, index) => index.toString()}
        />
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
  carouselContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  swiper: {
    width: '100%',
    // backgroundColor: 'blue'
  },
  dayContainer: {
    width: 50,
    height: 100,
    borderRadius: 35,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 7,
  },
});
