import AsyncStorage from '@react-native-async-storage/async-storage';
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";

export async function onSignOut(navi,CommonActions) { 
  AsyncStorage.removeItem('@Profile:token')
  const keys = await AsyncStorage.getAllKeys();
  // Filtrar chaves que começam com '@Favorite:'
  const favoriteKeys = keys.filter(key => key.startsWith('@Favorite:'));
  // Remover os favoritos
  AsyncStorage.multiRemove(favoriteKeys);
  
  navi.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Welcome' },
      ],
    }))    
  
}

export function onSignIn(navi,CommonActions,token) {
  AsyncStorage.setItem('@Profile:token', token);
  navi.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Inicio' },
      ],
    }))    
}

export const IsLogin = async () => { 
    const value = await AsyncStorage.getItem('@Profile:token')
    if(value==null){
        return false
    } 
    const decoded = jwtDecode(value);
    return (value !== null) ? decoded : false;
}