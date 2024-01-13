import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IsLogin () {  
    const [login, setLogin] = useState(false)

    useEffect(() => {
      VerificarLogin()
    }, [])

    async function VerificarLogin(){
      
      const value = await AsyncStorage.getItem('@Profile:token')
      const valuejson = JSON.parse(value)  
      
      if(valuejson == null|| valuejson==""){
        setLogin(false)
        return
      }  

      const nome = valuejson.nome;
      const nomeUppercase = nome.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());
      const dados = {"nome": nomeUppercase, "telefone": valuejson.telefone, "id_doador": valuejson.id_doador}
         
      setLogin(dados)
    }
    return (login)
}

