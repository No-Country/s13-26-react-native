import React from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

interface props {
  onPress: () => any;
  title: string;
  styles?: any;
  textStyles?: any;
}

export default function Boton(props: props) {
  const { onPress, title = 'Guardar' } = props;
  return (
    <TouchableOpacity style={[styles.button, props.styles ? props.styles : {}]} onPress={onPress}>
      <Text style={[styles.text, props.textStyles ? props.textStyles : styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#67397E',
  },
  text: {
    fontFamily: 'montserrat_medium',
    fontSize: 16,
    lineHeight: 19.5,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#FFFFFF',
  },
});
