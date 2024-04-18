import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',  
    paddingHorizontal: 20,
    flex: 1,
  },
  content: {
    flex: 1,
    width: '100%',
    marginTop: 50
  },
  
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    marginTop: 48,
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
    marginTop: 24,
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    color: '#737380'
  },
  input:{
    borderColor: '#414757',
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
    paddingStart: 15  
  },
  containerTextField:{
    marginTop: 0,
  },

  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  loginHeader:{
    justifyContent: 'flex-end',
    paddingBottom: 40
  },
  
  loginText:{
    fontSize: 25,
    color: '#2a1e49',
    letterSpacing: 3,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10
  },

  loginForm:{
    flex: 3
  },
  heroTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#13131a',
    lineHeight: 30,
  },

  heroDescription: {
    fontSize: 15,
    color: '#737380',
    marginTop: 16,
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
  actionText2: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  cadastroButton:{
    flexDirection: 'row',    
    justifyContent: 'center',
  }
})
