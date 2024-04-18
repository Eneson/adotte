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
    fontWeight: 'bold'
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: '#737380'
  },

  incidentList: {
    marginTop: 32,
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold'
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380'
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }, 

  detailsButtonText: {
    color: '#e02041',
    fontSize: 15,
    fontWeight: 'bold'
  },

  date:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    borderWidth: 1,
    marginStart: 5,
    padding: 10,
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3ab6ff',
    borderWidth: 2
  },
  formLabel: {
    color: '#000',
    paddingBottom: -5,
    marginBottom: 5,
    fontSize: 15,
  },
  input:{
    borderColor: '#414757',
    borderWidth: 1,
    padding: 10,
    borderRadius: 2,
    paddingStart: 15  
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
 
  footer:{
    position: "absolute",
    bottom: 0,
    flex: 1,
    height: 50,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#0C51FF',
    
  },
  footerAction: {
    borderRadius: 10,
    borderRightColor: "#000",
    borderRightWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  actionText:{
    fontSize: 15,
    color: "#fff",
    padding: 10,
  },
  action: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#3ab6ff',
    borderWidth: 2
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
