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
import { Firebase_Auth, Firestore_Db } from '@/components/auth/FirebaseConfig';
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth';
import { Link } from 'expo-router';
import Boton from '../../ui/Boton';
import { addDoc, collection } from 'firebase/firestore';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Ionicons } from '@expo/vector-icons';
const Auth = () => {
  const SignupSchema = Yup.object().shape({
    nombre: Yup.string().required('Nombre requerido'),
    email: Yup.string()
      .email('Email invalido')
      .required('Email requerido, te enviaremos un link de verificación'),
    password: Yup.string()
      .min(6, 'Muy corto! Minimo 6 caracteres')
      .max(15, 'Muy largo! Maximo 15 caracteres')
      .required('Contraseña requerida'),
    nacimiento: Yup.string()
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        'Formato de fecha inválido DD/MM/AAAA'
      )
      .required('La fecha es requerida'),
  });

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const auth = Firebase_Auth;
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const signUp = async (email, password, nombre) => {
    try {
      const register = await createUserWithEmailAndPassword(email, password);
      if (register) {
        alert('Te enviamos un link para verificar tu mail.');
        await addDoc(collection(Firestore_Db, 'users'), {
          id: register.user.uid,
          email: register.user.email,
          name: nombre,
          tel: register.user.phoneNumber,
          image: register.user.photoURL,
        });
        await sendEmailVerification();
      } else {
        alert('Error al registrarse: ASD' + error);
      }
    } catch (error) {
      alert('Error al registrarse: ' + error);
    }
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Crea tu cuenta</Text>
      <View
        style={{
          flex: 3,
          paddingHorizontal: 20,
          backgroundColor: 'white',
          height: '40%',
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Formik
          initialValues={{
            nombre: '',
            email: '',
            password: '',
            nacimiento: '',
          }}
          onSubmit={(values) => signUp(values.email, values.password, values.nombre)}
          validationSchema={SignupSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, isValid, values, errors, touched }) => (
            <KeyboardAvoidingView>
              {/* ----------NOMBRE---------- */}
              <TextInput
                inputMode="text"
                textContentType="name"
                keyboardType="default"
                autoCapitalize="none"
                placeholder="Nombre"
                style={[
                  styles.textInput,
                  values.nombre?.length ? styles.textInputAct : {},
                  errors?.nombre?.length && touched?.nombre ? styles.error : {},
                ]}
                onChangeText={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
                value={values.nombre}
                placeholderTextColor={errors?.nombre?.length && touched?.nombre ? 'red' : 'black'}
              />
              {/*<Text style={styles.text}>Ingresa tu nombre real.</Text>*/}
              {errors.nombre && touched.nombre ? (
                <Text style={styles.error}>{errors.nombre}</Text>
              ) : null}
              {/* ----------EMAIL---------- */}
              <TextInput
                inputMode="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Correo electrónico"
                style={[
                  styles.textInput,
                  values.email?.length ? styles.textInputAct : {},
                  errors?.email?.length && touched?.email ? styles.error : {},
                ]}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholderTextColor={errors?.email?.length && touched?.email ? 'red' : 'black'}
              />
              {errors.email && touched.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}

              {/* ----------FECHA NACIMIENTO---------- */}
              <TextInput
                inputMode="text"
                placeholderTextColor={
                  errors.nacimiento?.length && touched.nacimiento ? 'red' : 'black'
                }
                textContentType="birthdateDay"
                value={values.nacimiento}
                placeholder="Fecha de nacimiento"
                style={[
                  styles.textInput,
                  values.nacimiento?.length ? styles.textInputAct : {},
                  errors?.nacimiento?.length && touched.nacimiento ? styles.error : {},
                ]}
                onChangeText={handleChange('nacimiento')}
                onBlur={handleBlur('nacimiento')}
              />
              {errors.nacimiento && touched.nacimiento ? (
                <Text style={styles.error}>{errors.nacimiento}</Text>
              ) : null}

              {/* ----------CONTRASEÑA---------- */}
              <TextInput
                secureTextEntry={!mostrarContraseña}
                placeholder="Contraseña"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={[
                  styles.textInput,
                  values?.password?.length ? styles.textInputAct : {},
                  errors?.password?.length && touched?.password ? styles.error : {},
                ]}
                placeholderTextColor={
                  errors?.password?.length && touched?.password ? 'red' : 'black'
                }
              />
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
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <View style={styles.contenedorBoton}>
                  <Boton
                    onPress={handleSubmit}
                    title="Registrarse"
                    styles={isValid ? styles.botonDesactivado : null}
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
            ¿Ya tienes una cuenta?{' '}
          </Text>
          <Link replace href={'/loginscreen'}>
            <Text
              style={{ fontWeight: 'bold', fontFamily: 'montserrat_semibold', color: '#F78764' }}
            >
              Inicia sesión
            </Text>
          </Link>
        </View>
      </View>
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
    backgroundColor: 'white',
  },
  titulo: {
    marginTop: 100,
    marginBottom: 30,
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'montserrat_semibold',
    color: '#102B3F',
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
    fontSize: 12,
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
