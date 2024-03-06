import { useState } from 'react';
import { CountdownCircleTimer, useCountdown } from 'react-native-countdown-circle-timer'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { sumarMedalla } from '@/services/MedalsServices';

function Count({ duration }: { duration: number }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [complete, setComplete] = useState(false)
    {//() =>( setIsPlaying((prevIsPlaying) => !prevIsPlaying))
    }
    return (
        <>
            {complete === false ?
                <TouchableOpacity style={style.containerStopwatch} onPress={sumarMedalla} >
                    <CountdownCircleTimer
                        isPlaying={isPlaying}
                        duration={duration}
                        colors={['#09A4B7', '#000000', '#000000', '#000000']}
                        colorsTime={[7, 5, 2, 0]}
                        strokeWidth={5}
                        size={115}
                        onComplete={() => setComplete(true)}
                    >
                        {({ remainingTime }) => <Text>{remainingTime}</Text>}
                    </CountdownCircleTimer>

                    <View style={style.controllerPlay}>
                        {isPlaying === false ? <Entypo name="controller-play" size={24} color="white"  /> : <Entypo name="controller-paus" size={24} color="white" />}
                    </View>
                </TouchableOpacity> :
                <View>
                    <Text style={style.textWin}>
                        ¡Felicidades!{"\n"}
                        Ganaste{"\n"}
                        1 medalla
                    </Text>
                    <View style={style.iconContainer}>

                    <Entypo name="medal" size={24} color="black" />
                    </View>

                </View>}
        </>
    )
}
export default Count
const style = StyleSheet.create({

    containerStopwatch: {
        alignItems: 'center',
    },
    controllerPlay: {
        borderRadius: 50,
        backgroundColor: "#09A4B7",
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      textWin: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'montserrat_semibold',

      },
      iconContainer: {
        alignItems: 'center',
      },

});
