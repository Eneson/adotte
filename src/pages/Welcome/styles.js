import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 10
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  
  loginHeader:{
    flex: 2,
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center'
  },

  image:{
    height: 300,
    width: 300,
  },
  loginText:{
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
    marginBottom:10,
    fontFamily: 'Montserrat_700Bold'
  },
  
  textDescription:{
    marginTop:5,
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular'
  },
  textDescriptionBold:{
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular'
  },

  actions: {
    marginTop:30,
    flex: 1
  },

  action: {
    backgroundColor: '#3ab6ff',
    borderRadius: 8,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },

  actionText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    fontFamily: 'Roboto_500Medium'
  },
  actionText2: {
    fontSize: 14,
    fontFamily: 'Roboto_500Medium'
  },
  cadastroButton:{
    flexDirection: 'row',    
    justifyContent: 'center',
  }
})
