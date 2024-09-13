import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center', 
    flex: 1,
  },  
  
  input:{
    borderColor: '#414757',
    padding: 10, 
  },
  containerTextField:{
    marginTop: 0,
  },

  scrollView:{
    marginTop: 20,
    flex:1,
    width: '80%'
  },
  TextInputEditable:{
    justifyContent:'space-between',
    borderWidth: 1,
    borderRadius: 2, 
    paddingStart: 15,
    flexDirection:'row', 
  },

  loginForm:{
    flex: 1,
  },


  actions: {
    marginTop: 16,
    justifyContent: 'flex-start',
  },

  action: {
    backgroundColor: '#3ab6ff',
    borderRadius: 3,
    height: 55,
    width: '100%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
})
