import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
} from 'react-native';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useRouter } from 'expo-router';
import Boton from '../../ui/Boton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Ionicons } from '@expo/vector-icons';
import { logo, parentesis } from '../../assets/icons';
const Auth = () => {
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Email invalido').required('Requerido'),
    password: Yup.string().min(6, 'Muy corto!').max(50, 'Muy largo!').required('Requerido'),
  });

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const auth = Firebase_Auth;
  const router = useRouter();
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const signIn = async (email, password) => {
    try {
      const login = await signInWithEmailAndPassword(email, password);
      if (login) {
        // setAuthRes(login);
        router.replace('homeScreen');
        // alert('Sesión iniciada');
      } else {
        alert('Problemas al iniciar sesión: ' + error);
      }
    } catch (error) {
      alert('Problemas al iniciar sesión: ' + error);
    }
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <View
        style={{
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 40,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image style={{ resizeMode: 'contain', width: 130, height: 90 }} source={logo} />
          <Image style={{ resizeMode: 'contain', width: 150 }} source={parentesis} />
        </View>

        <Text style={styles.titulo}>Tu bienestar frente a la pantalla</Text>
      </View>

      <View
        style={{
          flex: 3,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          borderTopLeftRadius: 45,
          borderTopRightRadius: 45,
          height: '40%',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          shadowOffset: '0 -15px',
          shadowColor: 'rgba(9,164,183,1)',
          shadowRadius: 50,
          shadowOpacity: 0.3,
        }}
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => signIn(values.email, values.password)}
          validationSchema={SigninSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, isValid, values, errors, touched }) => (
            <KeyboardAvoidingView>
              <TextInput
                inputMode="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Correo electrónico"
                style={[
                  styles.textInput,
                  values.email.length ? styles.textInputAct : {},
                  errors.email?.length && touched.email ? styles.error : {},
                ]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholderTextColor={errors.email?.length && touched.email ? '#F78764' : '#8D6A9F'}
              />
              {errors.email && touched.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={!mostrarContraseña}
                placeholder="Contraseña"
                style={[
                  styles.textInput,
                  values.password.length ? styles.textInputAct : styles.textInput,
                  errors.password?.length && touched.password ? styles.error : {},
                ]}
                placeholderTextColor={
                  errors.password?.length && touched.password ? '#F78764' : '#8D6A9F'
                }
              ></TextInput>
              {errors.password && touched.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}

              <Pressable style={styles.mostrarContraseñaContenedor}>
                <Text style={styles.mostrarContraseñaTexto}>Mostrar contraseña</Text>
                <BouncyCheckbox
                  size={22}
                  fillColor="#102B3F"
                  unfillColor="#FFFFFF"
                  innerIconStyle={{ borderWidth: 1.5 }}
                  iconComponent={
                    !mostrarContraseña ? (
                      <Ionicons name="eye-off-outline" size={14} color={'#102B3F'} />
                    ) : (
                      <Ionicons name="eye" size={14} color={'white'} />
                    )
                  }
                  onPress={() => setMostrarContraseña(!mostrarContraseña)}
                />
              </Pressable>

              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#67397E"
                  style={{ marginTop: 55, marginBottom: 25.2 }}
                />
              ) : (
                <View style={styles.contenedorBoton}>
                  <Boton
                    onPress={handleSubmit}
                    title="Iniciar sesión"
                    styles={!isValid ? styles.botonDesactivado : null}
                  />
                </View>
              )}
            </KeyboardAvoidingView>
          )}
        </Formik>

        <View
          style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: 25 }}
        >
          <Text style={{ fontFamily: 'montserrat_regular', color: '#102B3F' }}>
            ¿No tienes cuenta?{' '}
          </Text>
          <Link replace href={'/registerScreen'}>
            <Text
              style={{ fontWeight: 'bold', fontFamily: 'montserrat_semibold', color: '#F78764' }}
            >
              Crea tu cuenta
            </Text>
          </Link>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: -10,
          width: 500,
          backgroundColor: 'white',
          height: 50,
          zIndex: 2,
        }}
      ></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    flex: 2,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#C1ECDB',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'montserrat_semibold',
    color: '#09A4B7',
  },
  textInput: {
    height: 52,
    borderWidth: 1,
    borderColor: '#8D6A9F',
    borderRadius: 12,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 20,
    marginTop: 20,
    color: '#8D6A9F',
    fontSize: 12,
    fontFamily: 'montserrat_regular',
  },
  textInputAct: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: 'montserrat_regular',
  },
  mostrarContraseñaContenedor: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  mostrarContraseñaTexto: {
    fontSize: 12,
    fontFamily: 'montserrat_regular',
    color: '#102B3F',
  },
  mostrarContraseñaCheckBox: {
    color: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
  },
  mostrarContraseñaCheckBoxAct: {
    color: '#000',
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  mostrarContraseñaCheckBoxDesact: {},
  contenedorBoton: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  botonDesactivado: { backgroundColor: '#646F77' },
  error: {
    paddingTop: 2,
    paddingLeft: 10,
    color: '#F78764',
    borderColor: '#F78764',
    fontFamily: 'montserrat_regular',
    fontSize: 12,
  },
});

export default Auth;
