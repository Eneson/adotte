import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    flex: 5,
    paddingHorizontal: 40,
  },
  header: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20
  },
  image: {
    width: 80,
    height: 80
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },  
 
  input:{
    borderColor: '#414757',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    paddingStart: 15
  },

  action: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 45,
    width: '100%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#3ab6ff',
    borderWidth: 2
  },
  actionPress: {
    backgroundColor: '#3ab6ff',
    borderRadius: 8,
    height: 45,
    width: '100%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  pressText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  actionText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2,
  }
})
