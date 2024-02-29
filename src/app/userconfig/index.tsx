import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Boton from '@/ui/Boton';
import { useRouter, Redirect } from 'expo-router';
import { useOnboarding } from '@/storages/authstore';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const UserConfig = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const setOnboarding = useOnboarding((state) => state.setOnboarding);
  const router = useRouter();

  const handleNext = () => {
    router.replace('./configAgeScreen');
  };
  useEffect(() => {
    if (isSelected) {
      setActiveIndex(null);
    }
  }, [isSelected, setSelection, setActiveIndex, activeIndex]);
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 14, marginTop: 60 }}>
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
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: 'grey',
            }}
          ></View>
        </View>
        <Text style={styles.text}>Queremos personalizar tu experiencia.</Text>
        <Text style={styles.title}>¿Cuál es tu género?</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 14 }}>
          <TouchableOpacity
            style={{
              backgroundColor: activeIndex == 1 ? '#808080' : '#D9D9D9',
              borderRadius: 50,
              height: 100,
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setActiveIndex(1);
            }}
          >
            <Text style={styles.text1}>Femenino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: activeIndex == 2 ? '#808080' : '#D9D9D9',
              borderRadius: 50,
              height: 100,
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setActiveIndex(2);
            }}
          >
            <Text style={styles.text1}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: activeIndex == 3 ? '#808080' : '#D9D9D9',
              borderRadius: 50,
              height: 100,
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setActiveIndex(3);
            }}
          >
            <Text style={styles.text1}>Otro</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={22}
            fillColor="black"
            unfillColor="white"
            text="Prefiero no decirlo"
            iconStyle={{ borderColor: 'black', borderRadius: 4 }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
            textStyle={{
              fontFamily: 'montserrat_regular',
              textDecorationLine: 'none',
              color: 'black',
            }}
            onPress={(isChecked) => setSelection(isChecked)}
          />
        </View>
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

export default UserConfig;
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
