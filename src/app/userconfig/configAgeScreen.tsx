import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Boton from '@/ui/Boton';
import { useRouter, Redirect } from 'expo-router';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { guardarEdad } from '@/services/UserConfigServices';

const age = [];
for (let i = 15; i < 99; i++) {
  age.push(i);
}
const ConfigAge = () => {
  const [edad, setEdad] = useState(undefined)
  const router = useRouter();

  const handleNext = () => {
    router.push('./configTime');
    if (edad) guardarEdad(edad);
  };
  const handleSkip = () => {
    router.replace('homeScreen');
  };
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 14, marginTop: 60 }}>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#09A4B7',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
        </View>
        <Text style={styles.text}> </Text>
        <Text style={styles.title}>¿Cuál es tu edad?</Text>
        <View style={{ height: 270, bottom: 50 }}>
          <ScrollPicker
            dataSource={age}
            selectedIndex={1}
            renderItem={(data, index) => {
              return (
                <View
                  style={{
                    width: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{ fontFamily: 'montserrat_semibold', fontSize: 22, color: '#09A4B7' }}
                  >
                    {data}
                  </Text>
                </View>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              setEdad(data)
            }}
            wrapperBackground="transparent"
            wrapperHeight={120}
            itemHeight={80}
            highlightColor="#09A4B7"
            highlightBorderWidth={2}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Boton onPress={handleNext} title="Siguiente" styles={styles.button1} />
        <Boton
          onPress={handleSkip}
          title="Saltar"
          styles={{ backgroundColor: 'transparent', right: 18.3, top: 52.6 }}
          textStyles={{ color: '#2E698C', fontSize: 13 }}
        />
      </View>
    </>
  );
};

export default ConfigAge;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },

  buttonContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontFamily: 'montserrat_semibold',
    marginBottom: 120,
    textAlign: 'center',
    color: '#102B3F',
  },
  text: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'montserrat_regular',
  },
  text1: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'montserrat_regular',
    color: 'white',
  },
  button1: {
    position: 'absolute',
    top: '-2%',
    right: '9.3%',
  },

  checkboxContainer: {
    marginTop: 70,
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
});
