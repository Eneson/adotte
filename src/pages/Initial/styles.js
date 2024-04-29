import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    
  },
  content: {
    flex: 1,
    paddingTop: 0,
  },

  //FlatList render
  viewAnimais: {
    margin: 10,
    width: '45%',
    height: 350,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    borderTopEndRadius: 8,
    borderTopStartRadius: 8

  },
  animaisFooter: {
    flexDirection: 'column',    
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingTop: 10,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
    width: 50,
  },
  iconStyles:{
    marginVertical: 5
  },
  actionText: {
    color: '#fff',
    fontSize: 15,       
    fontFamily: 'Roboto_500Medium'
  },
  action: {
    borderRadius: 8,
    height: 30,
    width: 80,
    justifyContent: 'center',
    backgroundColor: '#3ab6ff',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 10,
  },
})
