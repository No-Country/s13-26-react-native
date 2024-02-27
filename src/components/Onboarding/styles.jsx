import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  slide: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    marginBottom: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'flex-end',
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
  },
  button1: {
    backgroundColor: '#1D1D1B',
    marginBottom: 10,
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
    bottom: 50,
    position: 'absolute',
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
