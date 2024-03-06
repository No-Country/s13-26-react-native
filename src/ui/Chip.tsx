import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const Chip = ({ text, onPress }: { text: string; onPress?: () => void }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={[styles.container, { backgroundColor: isPressed ? '#67397E' : '#8D6A9F' }]}>
        <Text style={[styles.chipText, { color: 'white' }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    backgroundColor: 'lightgray',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  chipText: {
    fontFamily: 'montserrat_semibold',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
