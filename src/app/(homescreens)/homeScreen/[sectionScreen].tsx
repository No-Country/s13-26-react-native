import React, { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import EjercicioComponente from '@/ui/EjercicioComponente';
import SpecificVideo from './specificVideo/[specificVideo]';

const DATA = [
  {
    id:1,
    title: 'Giro de hombros hacia adelante y hacia atrás',
  },
  {
    id:2,

    title: 'Rotación de hombros y brazos',
  },
  {
    id:3,

    title: 'Elongación de hombros y brazos',
  },
  {    id:4,

    title: 'Rotación de tronco',
  },
  {    id:5,

    title: 'Extensión lumbar',
  },
  {    id:6,

    title: 'Contracción abdominal',
  },
];

function SectionScreen() {
  const { sectionScreen } = useLocalSearchParams();
  const  router= useRouter()
  return (
    <View style={style.container}>
      <Text style={style.textgreet}>Ejercicios {sectionScreen}</Text>
      <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <FlashList
          data={DATA}
          renderItem={({ item }) => <EjercicioComponente title={item.title} onClick={() => (router.push({pathname:`/homeScreen/specificVideo/${item.id}`,  params: item}))}></EjercicioComponente>}
          estimatedItemSize={111}
        />
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 21,
    paddingHorizontal: 16,
    flex: 1,
    display: 'flex',
  },
  textgreet: {
    textAlign: 'left',
    fontFamily: 'montserrat_semibold',
    fontSize: 16,
    marginBottom: 25,
  },
});

export default SectionScreen;
