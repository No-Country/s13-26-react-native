import { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Entypo, FontAwesome6 } from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

export const DayTimer = () => {
  const [start, setStart] = useState(false);
  const [intervalId, setIntervalId] = useState(null); // Para almacenar el ID del intervalo

  const [expoPushToken, setExpoPushToken] = useState('');
  const [, setNotification] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const startTimer = async () => {
    const newIntervalId = setInterval(() => {
      sendNotification(); // Enviar notificación cada minuto
    }, 60000); // 60000 milisegundos = 1 minuto

    setIntervalId(newIntervalId);
  };

  const stopTimer = () => {
    clearInterval(intervalId); // Detener el intervalo
    setIntervalId(null);
  };

  const sendNotification = async () => {
    await schedulePushNotification(expoPushToken);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setStart(!start);
          if (!start) {
            startTimer(); // Iniciar temporizador cuando se presiona
          } else {
            stopTimer(); // Detener temporizador cuando se presiona
          }
        }}
      >
        {start ? (
          <FontAwesome6 name="pause" size={50} color="white" />
        ) : (
          <Entypo name="controller-play" size={70} color="white" style={{ marginLeft: 10 }} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#09A4B7',
    width: 130,
    height: 130,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

async function schedulePushNotification(expoPushToken) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Paréntesis',
      body: '¡Es hora de realizar un Paréntesis! 🏃‍♂️ Estírate y energiza tu día. 🌟',
      data: { data: 'goes here' },
      priority: 'high',
    },
    trigger: null, // No establecer un trigger para que la notificación no se muestre inmediatamente
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

