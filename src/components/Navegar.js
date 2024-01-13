import AsyncStorage from '@react-native-async-storage/async-storage';

const navigate = async (props,To) => {  
    const {navigation, route} = props
    const value = await AsyncStorage.getItem('@Profile:token')
    const valuejson = JSON.parse(value)
    if(To == 'Login' && valuejson){
        if(route.name == 'NewPet'){
            return
        }        
        return navigation.navigate('NewPet')
    }
    if(To == route.name){
        return
    }
    navigation.navigate(To)
}

export default navigate;