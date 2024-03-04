import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Chip = ({ text, onPress }: { text: string, onPress?: () => void }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    onPress && onPress();
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, { backgroundColor: isPressed ? 'gray' : 'lightgray' }]}>
        <Text style={[styles.chipText, { color: isPressed ? 'white' : 'black' }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    backgroundColor: 'lightgray',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  chipText: {
    fontSize: 22,
    fontWeight: 'bold'
  }
})
