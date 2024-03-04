import React from 'react';

import { TouchableOpacity, StyleSheet, View, Text, Image } from 'react-native';

function EjercicioComponente({ title = 'falta', url, onClick }) {
  return (
    <>
      <TouchableOpacity onPress={onClick} style={{ marginBottom: 15 }}>
        <View
          style={{
            height: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 30,
          }}
        >
          <View
            style={{
              height: '100%',
              flex: 1,
            }}
          >
            <Image
              source={{ uri: url }}
              style={{ width: '100%', height: '100%', borderRadius: 10 }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 3,
            }}
          >
            <Text
              style={{
                fontFamily: 'montserrat_regular',
                fontSize: 14,
              }}
            >
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9', marginBottom: 15 }}></View>
    </>
  );
}

export default EjercicioComponente;

const style = StyleSheet.create({
  item: {
    marginBottom: 24,
  },
});
