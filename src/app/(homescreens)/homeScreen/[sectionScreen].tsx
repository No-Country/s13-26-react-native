import React, { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import EjercicioComponente from '@/ui/EjercicioComponente';

const DATA = [
  {
    title: 'Giro de hombros hacia adelante y hacia atrás',
  },
  {
    title: 'Rotación de hombros y brazos',
  },
  {
    title: 'Elongación de hombros y brazos',
  },
  {
    title: 'Rotación de tronco',
  },
  {
    title: 'Extensión lumbar',
  },
  {
    title: 'Contracción abdominal',
  },
];

function SectionScreen() {
  const { sectionScreen } = useLocalSearchParams();
  return (
    <View style={style.container}>
      <Text style={style.textgreet}>Ejercicios {sectionScreen}</Text>
      <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <FlashList
          data={DATA}
          renderItem={({ item }) => <EjercicioComponente title={item.title}></EjercicioComponente>}
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
