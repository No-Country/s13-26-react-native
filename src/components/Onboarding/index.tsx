import React, { useState, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { example1, example2, example3 } from '../../assets';
import Boton from '@/ui/Boton';
import { styles } from './styles';
import { useRouter, Redirect } from 'expo-router';
import { useOnboarding } from '@/storages/authstore';
const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const setOnboarding = useOnboarding((state) => state.setOnboarding);
  const router = useRouter();

  const carouselData = [
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repellendus a architecto accusantium deserunt ipsam necessitatibus vel iusto facere ',
      image: example1,
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repellendus a architecto accusantium deserunt ipsam necessitatibus vel iusto facere ',
      image: example2,
    },
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit repellendus a architecto accusantium deserunt ipsam necessitatibus vel iusto facere ',
      image: example3,
    },
  ];

  const handleNext = () => {
    if (activeIndex < carouselData.length - 1) {
      carouselRef.current.snapToNext();
    }
  };

  const handleSkipOnboarding = () => {
    setOnboarding(false);
    router.replace('homeScreen');
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <View style={styles.buttonContainer}>
        <Boton
          onPress={handleNext}
          title="Siguiente"
          styles={styles.button1}
          textStyles={styles.button1text}
        />
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
