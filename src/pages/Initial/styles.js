import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,    
    backgroundColor: '#fff'
    
  },
  content: {
    paddingBottom: 50,
    flex: 1,
    paddingTop: 0,
  },

  //FlatList render
  viewAnimais: {
    backgroundColor: '#0000',
    marginBottom: 20,
    marginTop:30,
  },
  animaisFooter: {
    flexDirection: 'row',    
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: -10,
    borderBottomWidth: 0.3,
  },

  
})
