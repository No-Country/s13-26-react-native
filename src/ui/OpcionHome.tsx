import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { corporal, fatiga, estres, visual } from '../assets';
function OpcionHome({ text = 'Vacio', onClick = () => {} }) {
  let icon =
    text == 'Corporal' ? corporal : text == 'Visual' ? visual : text == 'Estrés' ? estres : fatiga;
  return (
    <TouchableOpacity onPress={onClick} style={[style.item]}>
      <View
        style={{
          backgroundColor: '#D9D9D9',
          borderRadius: 10,
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 10,
          }}
          source={icon}
        ></Image>
        <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, .8)',
            height: 50,
            position: 'absolute',
            width: '100%',
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              fontFamily: 'montserrat_semibold',
              fontSize: 16,
              color: 'black',
              paddingVertical: 14,
              width: 'auto',
              flex: 1,
              color: '#09A4B7',
            }}
          >
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export const Col = ({ children }) => {
  return <View style={{ flex: 1 }}>{children}</View>;
};

export const Row = ({ children }) => <View style={{ flexDirection: 'row' }}>{children}</View>;

export function GridHome({ children }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: 'center' }}
      style={style.grid}
    >
      {children}
    </ScrollView>
  );
}

export default OpcionHome;

const style = StyleSheet.create({
  grid: {
    paddingTop: 10,
    display: 'flex',
    flex: 2,
    width: '100%',
    alignContent: 'center',
    marginHorizontal: '1%',
  },
  griditem: {
    flex: 1,
  },
  item: {
    flex: 1,
    height: 230,
    marginBottom: 24,
    width: '95%',
  },
});
