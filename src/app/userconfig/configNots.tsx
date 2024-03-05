import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Boton from '@/ui/Boton';
import { nots } from '../../assets';
import { useRouter, Redirect } from 'expo-router';
import { useOnboarding } from '@/storages/authstore';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

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
    body: 'Regresa pronto',
    data: { someData: 'goes here' },
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

const ConfigNots = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const router = useRouter();

  const handleNots = () => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });
    router.replace('homeScreen');
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };
  const handleSkip = () => {
    router.replace('homeScreen');
  };
  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', gap: 14, marginTop: 60 }}>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#0AD2DB',
            }}
          ></View>
          <View
            style={{
              borderRadius: 6,
              width: 12,
              height: 12,
              backgroundColor: '#09A4B7',
            }}
          ></View>
        </View>
        <Text style={styles.text}></Text>
        <Text style={styles.title}>No pierdas el momento de hacer un Paréntesis</Text>
        <Text style={styles.text}>
          Para garantizar el funcionamiento óptimo de la aplicación, requerimos tu autorización para
          enviar notificaciones y recordatorios.
        </Text>
        <Image source={nots} style={styles.image} />
        <View style={{ display: 'flex', flexDirection: 'row', gap: 14 }}></View>
      </View>
      <View style={styles.buttonContainer}>
        <Boton onPress={handleNots} title="Permitir ahora" styles={styles.button1} />
        <Boton
          onPress={handleSkip}
          title="Más tarde"
          styles={{ backgroundColor: 'transparent', right: 18.3, top: 52.6 }}
          textStyles={{ color: '#2E698C', fontSize: 13 }}
        />
      </View>
    </>
  );
};

export default ConfigNots;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 20,
  },

  buttonContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontFamily: 'montserrat_semibold',
    textAlign: 'center',
    color: '#102B3F',
  },
  text: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'montserrat_regular',
  },
  text1: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'montserrat_regular',
    color: 'white',
  },
  button1: {
    position: 'absolute',
    top: '-2%',
    right: '9.3%',
  },

  checkboxContainer: {
    marginTop: 70,
    flexDirection: 'row',
  },
  checkbox: {
    alignSelf: 'center',
  },
  image: {
    width: 320,
    height: 170,
    marginBottom: 10,
    borderWidth: 0,
    borderColor: 'gray',
    objectFit: 'contain',
  },
});
