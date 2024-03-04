import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';
import { Chip } from '@/ui/Chip';
import useHorariosStore from '@/storages/horariosstore';

export const AgregarHorarios = () => {
  const { selectedDays, selectedStartTime, selectedEndTime, setSelectedDays, setSelectedStartTime, setSelectedEndTime } = useHorariosStore();

  const chipText = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };
  
  const renderChips = () => {
    return chipText.map((text, index) => (
      <Chip key={index} text={text[0]} onPress={() => toggleDay(text)} />
    ));
  };

  const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const showStartTimePicker = () => {
    setStartTimePickerVisible(true);
  };
  const hideStartTimePicker = () => {
    setStartTimePickerVisible(false);
  };
  const showEndTimePicker = () => {
    setEndTimePickerVisible(true);
  };
  const hideEndTimePicker = () => {
    setEndTimePickerVisible(false);
  };

  const handleStartTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const formattedTime = formatDate(currentDate);
    setSelectedStartTime(formattedTime);
    hideStartTimePicker();
  };
  const handleEndTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    const formattedTime = formatDate(currentDate);
    setSelectedEndTime(formattedTime);
    hideEndTimePicker();
  };

  const formatDate = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <View>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <Text style={{ fontSize: 16 }}>Configura el horario que estás frente a la pantalla</Text>
      </View>

      <View style={{ marginTop: 30, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {renderChips()}
      </View>

      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={showStartTimePicker}>
          <Text>Comienzo</Text>
          <View style={styles.input}>
            <FontAwesome5 name="clock" size={24} color="black" />
            <TextInput
              value={selectedStartTime}
              editable={false}
              style={styles.textInput}
            />
          </View>
        </TouchableOpacity>
        {isStartTimePickerVisible && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleStartTimeChange}
          />
        )}

        <TouchableOpacity onPress={showEndTimePicker}>
          <Text>Finalización</Text>
          <View style={styles.input}>
            <FontAwesome5 name="clock" size={24} color="black" />
            <TextInput
              value={selectedEndTime}
              editable={false}
              style={styles.textInput}
            />
          </View>
        </TouchableOpacity>
        {isEndTimePickerVisible && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={handleEndTimeChange}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    padding: 8,
    marginTop: 5,
    width: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  }
});
