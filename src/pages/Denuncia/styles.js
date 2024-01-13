import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content:{
    paddingHorizontal: 20,
    marginBottom: 50,
    paddingVertical: 10,
    marginRight: 20
  },
  RadioLabel: {
    textAlign: 'left',
    marginLeft: 10,
    fontSize: 16,
    letterSpacing: 1,
  },
  loginForm:{
    marginTop: 20
  },
  input:{
    borderColor: '#414757',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    paddingStart: 15   
  },
  
  containerTextField:{
    
  },
  RadioButton: {    
    borderTopWidth: 0.5,
    paddingVertical:20,
    paddingLeft: 0
  },
  
  actionText:{
    fontSize: 15,
    color: "#fff",
    padding: 10
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
    borderWidth: 2,
    marginTop:30
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
