import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'


export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    
  },
  content: {     
    flex: 1,
    paddingHorizontal: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  headerText: {
    fontSize: 25,
    color: '#000',
    marginVertical: 20
  },

  headerTextBold: {
    fontWeight: 'bold'
  },  

  title: {
    fontSize: 18,
    marginBottom: 0,
    marginTop: 10,
    color: '#13131a',
    fontFamily: 'Montserrat_300Light'
  },

  date:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#000',
    fontSize: 15,
    letterSpacing: 1,
    textAlign: 'center',
    marginStart: 5,
    padding: 10,
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3a77ff',
    fontFamily: 'Roboto_400Regular',
    borderWidth: 1
  },
  input:{
    borderColor: '#3a77ff',
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
    paddingStart: 15,
    fontFamily: 'OpenSans_400Regular'
  },
  viewFoto:{
    flexDirection: 'column',
    alignItems: 'center'
  },
  submitButton:{
    width: '100%',
    marginTop: 0,
    backgroundColor: 'grey',
    alignItems: 'center',
    padding: 5,
    borderRadius: 30
  },

  action: {
    borderRadius: 8,
    height: 45,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#3ab6ff',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#3a77ff',
    borderWidth: 1
  },
  pressText: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#3ab6ff',
    letterSpacing: 2,
    fontFamily: 'Roboto_500Medium',
    color: '#fff',
  },
  actionText: {
    color: '#fff',
    fontSize: 15,
    letterSpacing: 1.5,    
    fontFamily: 'Roboto_500Medium'
  }
})
