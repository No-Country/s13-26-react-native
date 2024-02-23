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
} from 'react-native';
import { Firebase_Auth } from '@/components/auth/FirebaseConfig';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useRouter } from 'expo-router';
import Boton from '../../ui/Boton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Ionicons } from '@expo/vector-icons';

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
        router.replace('homescreen');
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
      <Text style={styles.titulo}>Iniciar sesión</Text>

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
              placeholderTextColor={errors.email?.length && touched.email ? 'red' : 'black'}
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
              placeholderTextColor={errors.password?.length && touched.password ? 'red' : 'black'}
            />
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <Pressable style={styles.mostrarContraseñaContenedor}>
              <Text style={styles.mostrarContraseñaTexto}>Mostrar contraseña</Text>
              <BouncyCheckbox
                size={22}
                fillColor="black"
                unfillColor="#FFFFFF"
                innerIconStyle={{ borderWidth: 1.5 }}
                iconComponent={
                  !mostrarContraseña ? (
                    <Ionicons name="eye-off-outline" size={14} color={'black'} />
                  ) : (
                    <Ionicons name="eye" size={14} color={'white'} />
                  )
                }
                onPress={() => setMostrarContraseña(!mostrarContraseña)}
              />
            </Pressable>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
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

      <View>
        <Text>Aun no tienes una cuenta?</Text>
        <Link push href={'/registerScreen'}>
          <Text style={{ fontWeight: 'bold' }}>Registrarse</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    margin: 20,
    flex: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
    padding: 20,
    paddingTop: 0,
    paddingBottom: 20,
    marginTop: 20,
  },
  textInputAct: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  text: {
    fontSize: 14,
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
    marginTop: 30,
    minWidth: '100%',
    backgroundColor: '#fff',
  },
  botonDesactivado: { backgroundColor: 'grey' },
  error: {
    color: 'red',
    borderColor: 'red',
  },
});

export default Auth;
