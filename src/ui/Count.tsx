import React, { useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Entypo } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { sumarMedalla } from '@/services/MedalsServices';

function Count({ duration }: { duration: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [complete, setComplete] = useState(false);

  const ejercicioCompleto = () => {
    sumarMedalla();
  };

  return (
    <>
      {complete === false ? (
        <TouchableOpacity
          style={style.containerStopwatch}
          onPress={() => setIsPlaying((prevIsPlaying) => !prevIsPlaying)}
        >
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={duration}
            colors={['#09A4B7', '#000000', '#000000', '#000000']}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={5}
            size={115}
            onComplete={() => {
              setComplete(true);
              ejercicioCompleto(); // Llama a la función ejercicioCompleto cuando se completa el temporizador
            }}
          >
            {({ remainingTime }) => <Text style={style.timerText}>{remainingTime}</Text>}
          </CountdownCircleTimer>

          <View style={style.controllerPlay}>
            {isPlaying === false ? <Entypo name="controller-play" size={24} color="white" /> : <Entypo name="controller-paus" size={24} color="white" />}
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={style.textWin}>
            ¡Felicidades!{"\n"}
            Ganaste{"\n"}
            1 medalla
          </Text>
          <View style={style.iconContainer}>
            <Entypo name="medal" size={24} color="black" />
          </View>
        </View>
      )}
    </>
  );
}

const style = StyleSheet.create({
  containerStopwatch: {
    alignItems: 'center',
  },
  timerText: {
    fontFamily: 'montserrat_semibold',
    fontSize: 28.75,
    fontWeight: '600',
  },
  controllerPlay: {
    borderRadius: 50,
    backgroundColor: "#09A4B7",
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textWin: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'montserrat_semibold',
  },
  iconContainer: {
    alignItems: 'center',
  },
});

export default Count;
