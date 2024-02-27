import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 21,
    paddingHorizontal: 16,
    marginTop: '45%',
  },
  slide: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 25,
    marginBottom: 35,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30,
    fontFamily: 'montserrat_regular',
  },
  button1: {
    marginBottom: 8,
  },
  button1text: {
    fontSize: 18,
  },
  button2: {
    backgroundColor: 'transparent',
  },
  button2text: {
    color: '#1D1D1B',
    marginRight: -20,
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
    width: 300,
    height: 200,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});
