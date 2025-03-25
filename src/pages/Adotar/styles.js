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
    height: 300,
    width: '100%',
    paddingHorizontal:45,
    marginVertical: 10, 
  },
  childrenAnimais: {
    flex: 1,    
    padding: 10
  },
  fullImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#fff',
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
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
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
  animaisDesc: {
    paddingHorizontal: 20,
  },
  descTextInformation: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center', // Dá um pequeno espaço horizontal entre os itens
  },
  textContainer: {
    marginLeft: 5, // Adiciona espaçamento entre o ícone e o texto
    flexDirection: 'row', 
    alignItems:'center', 
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignSelf: 'baseline',

    
  },
  textInformation: {
    fontSize: 16,
    marginLeft: 10
  
  },
  descText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'OpenSans_400Regular',
    marginTop:5,
    alignItems: 'center'
  },
  textBold:{
    fontFamily: 'OpenSans_700Bold',
    fontSize: 16
  },
  textMuted: {
    fontSize: 14.5,
    color: 'rgba(33 37 41 / 0.75)'
  },
  textNome:{
    fontSize: 20,    
    fontFamily: 'Montserrat_500Medium',
    textAlign: 'center'

  },
  descTitle: {
    color: '#000',
    fontSize: 15,
  },
})
