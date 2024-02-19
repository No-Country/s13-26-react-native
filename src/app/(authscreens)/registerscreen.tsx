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
            <Text style={styles.text}>Ingresa tu nombre real.</Text>
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
              inputMode="none"
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
              placeholderTextColor={errors?.password?.length && touched?.password ? 'red' : 'black'}
            />
            {errors.password && touched.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <Pressable
              style={styles.mostrarContraseñaContenedor}
              onPress={() => setMostrarContraseña(!mostrarContraseña)}
            >
              <Text style={styles.mostrarContraseñaTexto}>Mostrar contraseña</Text>
              <Text
                style={[
                  styles.mostrarContraseñaCheckBox,
                  mostrarContraseña
                    ? styles.mostrarContraseñaCheckBoxAct
                    : styles.mostrarContraseñaCheckBoxDesact,
                ]}
              >
                X
              </Text>
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
      <View>
        <Text>Ya tienes una cuenta?</Text>
        <Link replace href={'/loginscreen'}>
          Iniciar Sesión
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    padding: 20,
    paddingHorizontal: 40,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textInput: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 5,
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
    fontSize: 12,
  },
  mostrarContraseñaContenedor: {
    overflow: 'hidden',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  mostrarContraseñaTexto: {},
  mostrarContraseñaCheckBox: {
    color: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
  },
  mostrarContraseñaCheckBoxAct: {
    backgroundColor: 'black',
  },
  mostrarContraseñaCheckBoxDesact: {},
  contenedorBoton: {
    alignItems: 'center',
  },
  botonDesactivado: { backgroundColor: 'grey' },
  error: {
    color: 'red',
    borderColor: 'red',
  },
});

export default Auth;
