import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  content:{
    flex: 1,
    marginBottom: 50
  },

  incident: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
    borderRadius: 10
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

  contactBox: {
    padding: 24,
    paddingTop: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
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
  },

  action: {
    backgroundColor: '#34af23',
    borderRadius: 8,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  actionText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10
  },
  childrenAnimais: {
    flex: 1,    
    justifyContent: 'center',
  },
  animaisDesc: {
    bottom: 0,
    height: '25%',
    width: '100%',
    position: 'absolute',
    opacity: 0.7,
    backgroundColor: '#939393',
    paddingHorizontal: 10,
    paddingTop: 5
  },
  descText: {
    color: '#000',
    fontSize: 15,
  },
  textBold:{
    fontWeight: 'bold'
  },
  descTitle: {
    color: '#000',
    fontSize: 15,
  },
})
