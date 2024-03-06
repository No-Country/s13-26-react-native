import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import EjercicioComponente from '@/ui/EjercicioComponente';
import SpecificVideo from './specificVideo/[specificVideo]';

import { collection, getDocs } from 'firebase/firestore';
import { Firestore_Db as db } from '@/components/auth/FirebaseConfig';

function SectionScreen() {
  const [data, setData] = useState<{ id: string;[key: string]: any }[]>([]);
  const [loading, setLoading] = useState(true);
  const { sectionScreen } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const obtenerEjercicios = async () => {
      const ejerciciosRef = collection(db, 'exercises');
      const snapshot = await getDocs(ejerciciosRef);
      const ejercicios = [];
      snapshot.forEach((doc) => {
        ejercicios.push({ id: doc.id, ...doc.data() });
      });
      setData(ejercicios);
      setLoading(false);
    };
    obtenerEjercicios();
  }, []);

  return (
    <View style={style.container}>
      <Text style={style.textgreet}>Ejercicios {sectionScreen}</Text>
      <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
            <Text style={style.loadingText}>Cargando...</Text>
          </View>
        ) : (
          <FlashList
            data={data}
            renderItem={({ item }) => (
                <EjercicioComponente
                  title={item?.titulo}
                  url={item?.url}
                  duracion={item?.duracion}
                  onClick={() =>
                    router.push({ pathname: `/homeScreen/specificVideo/${item?.id}`, params: item })
                  }
                />
            )}
            estimatedItemSize={111}
          />
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'montserrat_regular',
  },
});

export default SectionScreen;
