import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import Count from '@/components/Count';
function SpecificVideo() {
  const specificVideo = useLocalSearchParams();
const dutation:number =+specificVideo.duracion
  return (
    <View style={style.container}>
      <View style={style.containerTitle}>
        <Text
          style={{
            fontFamily: 'montserrat_semibold',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          {' '}
          {specificVideo.titulo}
        </Text>
      </View>
      <View style={style.containerImg}>
        <Image
          style={style.img}
          source={{
            uri: specificVideo.url,
          }}
        />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MaterialCommunityIcons name="clock-time-five-outline" size={22} color="#09A4B7" />
          <Text style={{ fontFamily: 'montserrat_regular', fontSize: 16 , color: '#09A4B7'}}>
            {specificVideo.duracion} s
          </Text>
        </View>
      </View>
      <View style={style.containerDescription}>
        <Text
          style={{
            fontFamily: 'montserrat_medium',
            fontSize: 14,
            textAlign: 'center',
            lineHeight: 26,
            paddingHorizontal: 6,
          }}
        >
          {specificVideo.descripcion}
        </Text>
      </View>
      <Count duration={dutation} />
    </View>
  );
}
export default SpecificVideo;
const style = StyleSheet.create({
  container: {
    paddingVertical: 21,
    paddingHorizontal: 16,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
    marginBottom: 10,
  },
  containerTitle: {
    marginBottom: 6,
  },
  containerImg: {
    alignItems: 'center',
  },
  img: {
    width: 220,
    height: 220,
    marginBottom: 8,
    borderRadius: 10,
  },
  containerDescription: {},
  containerStopwatch: {
    alignItems: 'center',
  },
  controllerPlay: {
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
