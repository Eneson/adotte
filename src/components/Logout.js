import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native'

async function Logout(navigation){
    try{
      await AsyncStorage.removeItem('@Profile:token')
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Inicio' },
          ],
        }))
    } catch(e){
      alert('Error')
    }    
}  

export default Logout