import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useState } from 'react';
import Boton from '../../ui/Boton';
import { Feather } from '@expo/vector-icons';
import OpcionHome, { GridHome, Col, Row } from '@/ui/OpcionHome';
import { useRouter } from 'expo-router';

function HomeScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('Ana');
  const [hours, setHours] = useState(0);
  return (
    <View style={style.container}>
      <View style={style.textcontainer}>
        <Text style={style.textgreet}>¡Hola {username}!</Text>
      </View>
      <View style={style.statcontainer}>
        <Text style={style.textstat}>
          ¡Llevas <Text style={{ fontFamily: 'montserrat_semibold' }}>{hours} horas</Text> frente a
          la pantalla!
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3, bottom: 14 }}>
          <Feather name="award" size={24} color={'#6F6E6E'} style={{ alignSelf: 'flex-end' }} />
          <Text style={{ fontFamily: 'montserrat_semibold', fontSize: 16, color: '#6F6E6E' }}>
            10
          </Text>
        </View>
      </View>
      <View style={style.textcontainer}>
        <Text style={style.textquestion}>¿Quieres hacer un párentesis? Elige tu pausa.</Text>
      </View>
      <GridHome>
        <Row>
          <Col>
            <OpcionHome
              onClick={() => {
                router.push('/homeScreen/Corporales');
              }}
              text="Corporal"
            ></OpcionHome>
          </Col>
          <Col>
            <OpcionHome
              onClick={() => {
                router.push('/homeScreen/Visuales');
              }}
              text="Visual"
            ></OpcionHome>
          </Col>
        </Row>
        <Row>
          <Col>
            <OpcionHome
              onClick={() => {
                router.push('/homeScreen/Estrés');
              }}
              text="Estrés"
            ></OpcionHome>
          </Col>
          <Col>
            <OpcionHome
              onClick={() => {
                router.push('/homeScreen/Fatiga');
              }}
              text="Fatiga"
            ></OpcionHome>
          </Col>
        </Row>
      </GridHome>
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
  textcontainer: {
    display: 'flex',
    marginBottom: 9,
  },
  statcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textgreet: {
    textAlign: 'left',
    fontFamily: 'montserrat_semibold',
    fontSize: 16,
  },
  textstat: {
    textAlign: 'left',
    fontFamily: 'montserrat_regular',
    fontSize: 13,
  },
  textquestion: {
    textAlign: 'left',
    fontFamily: 'montserrat_regular',
    fontSize: 13,
    marginBottom: 18,
  },
});

export default HomeScreen;