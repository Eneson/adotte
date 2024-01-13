import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  profileHeader:{
    alignItems: 'center',
    borderBottomWidth: 0.3,
    padding: 20
  },
  headerName: {
    fontSize: 20,    
    letterSpacing: 2,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
  },
  bodyHeader: {    
    paddingHorizontal: 50,
    borderBottomWidth: 1,
    paddingBottom:5,
    alignItems: 'center',
    alignContent: 'center'
  },
  TextName: {
    fontSize: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingStart: 20,
    borderBottomColor: '#000',
    borderBottomWidth: 1
  },
  buttonText: {
    marginStart: 5
  },
  viewAnimal: {
    marginVertical: 40,
    flexDirection: 'row',
    marginHorizontal:5,
    height: 200
  },
  animalImage: {
    width: '50%',
    height: '100%',
    borderTopLeftRadius: 10,  
    borderBottomLeftRadius: 10,  
  },
  animalFooter: {    
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',  
    borderColor: '#000',
    borderWidth: 0.5,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,  
    borderBottomRightRadius: 10,  
  },
  animalDesc: {
    paddingStart: 20,
  },
  animalButton: {
    alignItems: 'flex-end',
    margin: 5
  },
  animalName: {
    letterSpacing: 3,
    textAlign: 'center',
    fontSize: 20,
  },
  animalTextDesc: {
    marginTop:10
  }
  

  
})
