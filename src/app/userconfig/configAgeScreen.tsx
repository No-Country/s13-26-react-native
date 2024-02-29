import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Boton from '@/ui/Boton';
import { useRouter, Redirect } from 'expo-router';
import { useOnboarding } from '@/storages/authstore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const ConfigAge = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const setOnboarding = useOnboarding((state) => state.setOnboarding);
  const router = useRouter();

  const handleNext = () => {
    router.replace('./configTime');
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
              backgroundColor: 'grey',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: 'black',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: 'grey',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: 'grey',
            }}
          ></View>
        </View>
        <Text style={styles.text}> </Text>
        <Text style={styles.title}>¿Cuál es tu edad?</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 14 }}></View>
      </View>
      <View style={styles.buttonContainer}>
        <Boton
          onPress={handleNext}
          title="Siguiente"
          styles={styles.button1}
          textStyles={styles.button1text}
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
    marginBottom: 150,
    textAlign: 'center',
  },
  text: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'montserrat_regular',
  },
  text1: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'montserrat_regular',
  },
  button1: {
    position: 'absolute',
    top: '-2%',
    right: '9.3%',
  },
  button1text: {
    fontSize: 18,
  },
  checkboxContainer: {
    marginTop: 70,
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
});
