import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default async function VerificaLogin() {  
    
        const value = await AsyncStorage.getItem('@Profile:token')
        const valuejson = JSON.parse(value)
                
        if(valuejson == null){
            return false
        }
        return valuejson
        
    
  }

