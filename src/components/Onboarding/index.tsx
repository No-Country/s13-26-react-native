import React, { useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { example1, example2, example3 } from '../../assets';
import Boton from '@/ui/Boton';
import { styles } from './styles';
import { useRouter, Redirect } from 'expo-router';
import { useOnboarding } from '@/storages/authstore';
import { SwiperFlatListWithGestureHandler } from 'react-native-swiper-flatlist/WithGestureHandler';

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const setOnboarding = useOnboarding((state) => state.setOnboarding);
  const router = useRouter();

  const handleNext = () => {
    setOnboarding(false);
    router.push('userconfig');
  };

  const handleSkipOnboarding = () => {
    setOnboarding(false);
    router.push('userconfig');
  };

  return (
    <View style={styles.container}>
      <SwiperFlatListWithGestureHandler
        index={0}
        showPagination
        paginationStyleItemInactive={{ backgroundColor: '#0AD2DB' }}
        paginationActiveColor={'#09A4B7'}
        paginationStyle={{ position: 'absolute', top: '90%' }}
        paginationStyleItem={{ borderRadius: 6, width: 12, height: 12 }}
      >
        <View style={styles.slide}>
          <Image source={example1} style={styles.image} />
          <Text style={styles.text}>
            ¿Sabías tú que si pasas mucho tiempo frente a la pantalla, es muy importante tomar
            pausas activas durante el día?
          </Text>
          <Text style={styles.text}>
            Nuestras pausas te ayudarán a sentirte mejor física y mentalmente.
          </Text>
        </View>
        <View style={styles.slide}>
          <Image source={example2} style={styles.image} />
          <Text style={styles.text}>
            Personaliza tu experiencia añadiendo tus horarios frente a la pantalla.
          </Text>
          <Text style={styles.text}>Esto nos permite ofrecerte pausas en momentos ideales.</Text>
        </View>
        <View style={styles.slide}>
          <Image source={example3} style={styles.image} />
          <Text style={styles.text}>
            No olvides activar las notificaciones para recibir recordatorios oportunos.
          </Text>
          <Text style={[{ ...styles.text }, { fontFamily: 'montserrat_semibold' }]}>
            ¡Comienza ahora y haz un Paréntesis!
          </Text>
          <Boton onPress={handleNext} title="Siguiente" styles={styles.button1} />
        </View>
      </SwiperFlatListWithGestureHandler>
      <View style={styles.buttonContainer}>
        <Boton
          onPress={handleSkipOnboarding}
          title="Saltar"
          styles={styles.button2}
          textStyles={styles.button2text}
        />
      </View>
    </View>
  );
};

export default Onboarding;
