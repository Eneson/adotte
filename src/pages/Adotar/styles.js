import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content:{
    flex: 1,
    backgroundColor: '#fff',
  },

  incident: {
    flex: 1,
    height: 500
  },

  contactBox: {
    padding: 24,
    paddingTop: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
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
    marginBottom: 10
  },

  actionText: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 10,    
    fontFamily: 'Roboto_500Medium',
  },
  childrenAnimais: {
    flex: 1,    
    justifyContent: 'center',
    minHeight: 20,    
    maxHeight: '100%'
  },
  animaisDesc: {
    paddingHorizontal: 20,
  },
  descText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'OpenSans_400Regular',
    marginTop:5
  },
  textBold:{
    fontFamily: 'OpenSans_700Bold',
  },
  textNome:{
    fontSize: 30,    
    fontFamily: 'Montserrat_500Medium'

  },
  descTitle: {
    color: '#000',
    fontSize: 15,
  },
})
