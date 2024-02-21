import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView } from 'react-native';

function OpcionHome({ text = 'Vacio' }) {
  return (
    <TouchableOpacity style={[style.item]}>
      <View
        style={{
          backgroundColor: '#D9D9D9',
          borderRadius: 10,
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <View></View>
        <View style={{ backgroundColor: 'rgba(255, 255, 255, .5)', height: 50 }}>
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
    <ScrollView contentContainerStyle={{ justifyContent: 'center' }} style={style.grid}>
      {children}
    </ScrollView>
  );
}

export default OpcionHome;

const style = StyleSheet.create({
  grid: {
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
    height: 200,
    marginBottom: 24,
    width: '95%',
  },
});
