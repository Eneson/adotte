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
    marginVertical: 10,
    flexDirection: 'row',
    marginHorizontal:10,
    height: 180,    
    borderColor: '#000',
    borderWidth: 1, 
    borderRadius: 10
  }, 
  action: {
    backgroundColor: '#34af23',
    borderRadius: 8,
    height: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10
  },

  actionText: {
    color: '#fff',
    fontSize: 15,
    marginHorizontal: 10,    
    fontFamily: 'Roboto_500Medium',
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
    justifyContent: 'space-between'
  },
  animalDesc: {
    marginTop: 10
  },
  animalButton: {
    alignItems: 'flex-end',
    margin: 5,
  },
  animalName: {
    letterSpacing: 3,
    textAlign: 'center',
    fontSize: 20,    
    fontFamily: 'Montserrat_500Medium',
  },
  animalTextDesc: {
    marginTop:10
  }
  

  
})
