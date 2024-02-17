import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface props {
  onPress: () => any;
  title: string;
  styles?: any;
  textStyles?: any;
}

export default function Boton(props: props) {
  const { onPress, title = 'Guardar' } = props;
  return (
    <Pressable style={[styles.button, props.styles ? props.styles : {}]} onPress={onPress}>
      <Text style={[styles.text, props.textStyles ? props.textStyles : styles.text]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#104771',
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
