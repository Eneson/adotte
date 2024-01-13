import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content:{
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 50,
    paddingVertical: 10,
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
    fontSize: 28,
    marginBottom: 0,
    marginTop: 20,
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
    marginTop: 10,
    marginBottom: 20
  },
  dateText: {
    textAlign: 'center',
    borderWidth: 1,
    marginStart: 5,
    padding: 5,
    color: '#737380'   
  },
  formLabel: {
    color: '#000',
    paddingBottom: -5,
    marginBottom: 5,
    fontSize: 15,
  },
  containerTextField:{
    marginBottom: 20
  },
  input:{
    fontSize: 16,
    borderBottomWidth: 0.5,
  },
  viewFoto:{
    flexDirection: 'column',
    alignItems: 'center'
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
    //backgroundColor: '#0C51FF',
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
})
