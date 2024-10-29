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
        { name: 'Inicio' },
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

export const IsLogin3 = async () => { 
    const value = await AsyncStorage.getItem('@Profile:token')
    if(value==null){
        return false
    } 
    const decoded = jwtDecode(value);
    return (value !== null) ? decoded : false;
}

export const IsLogin = (callback) => {
  AsyncStorage.getItem('@Profile:token')
    .then((value) => {
      if (value === null) {
        callback(false); // Chama o callback com false se o token não existir
      } else {
        const decoded = jwtDecode(value);
        
        //  usando a desestruturação (spread operator)
        const dados = {
          Token: value,
          ...decoded
        };
        callback(dados); // Chama o callback com o valor decodificado
      }
    })
    .catch((error) => {
      console.error('Erro ao obter o token:', error);
      callback(false); // Chama o callback com false em caso de erro
    });
};

