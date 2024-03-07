import React, { useState, useRef } from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Paréntesis',
    body: '¡Es hora de realizar un Paréntesis! 🏃‍♂️ Estírate y energiza tu día. 🌟',
    priority: 'high',
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
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

  return token.data;
}

export const BotonNot = (props) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const handleNots = () => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };

  const { onPress, title = 'Guardar' } = props;
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={async () => {
        await handleNots();
        await sendPushNotification(expoPushToken);
      }}
    >
      <Text style={styles.text}>Prueba</Text>
    </TouchableOpacity>
  );
};
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
