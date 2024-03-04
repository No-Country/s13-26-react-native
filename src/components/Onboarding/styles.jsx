import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  slide: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 35,
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#102B3F',
    textAlign: 'center',
    marginTop: 30,
    fontFamily: 'montserrat_regular',
    paddingHorizontal: 47,
  },
  button1: {
    position: 'absolute',
    top: '92.2%',
    right: '9.3%',
  },
  button2: {
    backgroundColor: 'transparent',
  },
  button2text: {
    color: '#2E698C',
    marginRight: -19,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: '8%',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginBottom: 130,
  },
  image: {
    width: 320,
    height: 250,
    marginBottom: 10,
    borderWidth: 0,
    borderColor: 'gray',
    objectFit: 'contain',
  },
  swipercontainer: {
    height: 200,
    width: '100vw',
    backgroundColor: 'gray',
  },
});
