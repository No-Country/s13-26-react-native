import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { editpic } from '@/assets';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  Entypo,
  Octicons,
  Ionicons,
} from '@expo/vector-icons';
import Boton, { BotonNot } from '@/ui/Boton';
import { UserInformation } from '@/services/UserData';
export default function ProfilePage() {
  const [username, setUsername] = useState('...');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const getUsername = await UserInformation();

      setUsername(getUsername?.name.substring(0, getUsername?.name.indexOf(' ')));
    }
    fetchUser();
  }, []);

  return (
    <View style={style.container}>
      <View style={style.textcontainer}>
        <Text style={style.textgreet}>Mi Perfil</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 40 }}>
        <View style={{ borderRadius: 50, height: 100, width: 100, backgroundColor: '#C1ECDB' }}>
          <TouchableOpacity
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              backgroundColor: '#09A4B7',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 70,
              left: 80,
            }}
          >
            <Image source={editpic} style={{ height: 14, width: 14, backgroundColor: '#09A4B7' }} />
          </TouchableOpacity>
        </View>
        <View style={{ display: 'flex', gap: 20 }}>
          <Text style={style.textprof}>{username}, 37</Text>
          <Text style={style.textemail}>francisca@yahoo.com</Text>
        </View>
      </View>
      <ProfileComponent text="Editar Mi Perfil" />

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: 'rgba(193, 236, 219, .8)',
          marginTop: 25,
          marginBottom: 25,
        }}
      ></View>
      <View style={style.textcontainers}>
        <Text style={style.textsupp}>Soporte</Text>
      </View>
      <ProfileComponent
        icon="terms"
        text="Términos y Condiciones"
        onClick={() => setModalVisible(!modalVisible)}
      />
      <ProfileComponent icon="info" text="Acerca de Nosotros" />
      <View style={{ display: 'flex' }}>
        <ProfileComponentLog />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ScrollView
            style={{
              height: '30%',
              marginTop: '100%',
              backgroundColor: '#D7DDFF',
              paddingVertical: 21,
              paddingHorizontal: 16,
              borderTopEndRadius: 45,
              borderTopStartRadius: 45,
            }}
          >
            <View style={{ marginBottom: 30 }}>
              <Text style={style.textgreet}>Términos y Condiciones</Text>
              <Text
                style={{
                  marginTop: 30,
                  fontFamily: 'montserrat_regular',
                  fontSize: 14,
                  textAlign: 'justify',
                }}
              >
                Al usar esta aplicación, aceptas nuestros términos. La app está diseñada para pausas
                activas y hábitos saludables, pero no reemplaza el asesoramiento médico. Úsala bajo
                tu responsabilidad y consulta a un profesional de la salud antes de cambiar tu
                rutina. El contenido puede cambiar sin previo aviso.
              </Text>
              <Text
                style={{
                  marginTop: 30,
                  fontFamily: 'montserrat_semibold',
                  fontSize: 16,
                  textAlign: 'justify',
                }}
              >
                ¡Gracias por tu comprensión y disfruta de una vida más activa y saludable con
                nuestra aplicación!
              </Text>
            </View>
            <Boton title="Cerrar" onPress={() => setModalVisible(!modalVisible)} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </Modal>
      <BotonNot />
    </View>
  );
}

const ProfileComponent = ({
  text = 'Vacio',
  icon = 'edit',
  onClick = () => {
    console.log('nada');
  },
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        marginTop: 20,
        display: 'flex',
        width: '92%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'center',
        height: 50,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: 'rgba(50, 69, 64, 0.05)',
      }}
    >
      {icon == 'edit' && <Octicons name="pencil" size={20} color="#09A4B7" />}
      {icon == 'terms' && (
        <MaterialCommunityIcons name="file-document-multiple-outline" size={20} color="#09A4B7" />
      )}
      {icon == 'info' && <Feather name="lock" size={20} color="#09A4B7" />}

      <Text style={{ color: '#646F77', fontFamily: 'montserrat_semibold', fontSize: 12 }}>
        {text}
      </Text>
      <MaterialIcons name="arrow-forward-ios" size={20} color="#67397E" />
    </TouchableOpacity>
  );
};

const ProfileComponentLog = ({
  text = 'Cerrar Sesión',
  icon = 'nada',
  onClick = () => {
    console.log('cerrar');
  },
}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        marginTop: 80,
        display: 'flex',
        width: '92%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'center',
        height: 50,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: 'rgba(50, 69, 64, 0.05)',
      }}
    >
      <Feather name="log-out" size={20} color="#67397E" />
      <Text style={{ color: '#67397E', fontFamily: 'montserrat_semibold', fontSize: 12 }}>
        {text}
      </Text>
      <MaterialIcons name="arrow-forward-ios" size={20} color="#67397E" />
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  container: {
    paddingVertical: 21,
    paddingHorizontal: 16,
    flex: 1,
    display: 'flex',
    backgroundColor: 'white',
  },
  textcontainer: {
    display: 'flex',
    marginBottom: 37,
  },
  textcontainers: {
    display: 'flex',
  },
  textgreet: {
    textAlign: 'left',
    fontFamily: 'montserrat_semibold',
    fontSize: 20,
    color: '#102B3F',
  },
  textsupp: {
    paddingLeft: 25,
    textAlign: 'left',
    fontFamily: 'montserrat_semibold',
    fontSize: 16,
    color: '#102B3F',
  },
  textprof: {
    textAlign: 'left',
    fontFamily: 'montserrat_semibold',
    fontSize: 20,
    color: '#102B3F',
  },
  textemail: {
    textAlign: 'left',
    fontFamily: 'montserrat_semibold',
    fontSize: 12,
    color: '#102B3F',
  },
});
