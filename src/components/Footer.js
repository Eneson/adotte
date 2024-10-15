import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons'; 
import { IsLogin } from './IsLogin'
const styles = StyleSheet.create({
      footer:{
        bottom: 0,
        height: 55,
        flexDirection: 'row',
        width: '100%',
        position: 'relative',
        backgroundColor: '#3ab6ff',
        paddingTop: 10,
        paddingBottom: 5
      },
      action: {
        width: '33.3%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      actionText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
      }
})



  export default function Footer(props){
    const [signed, setSigned] = useState(false)

    IsLogin()
        .then(res => {   
          if(res==false){
            setSigned(false)   
          }else{
            setSigned(true)
          }
        })
        .catch(() => (setSigned(false)));
        
    return (
      <View style={styles.footer}> 
                            
          <TouchableOpacity style={styles.action} onPress={() =>{signed?props.Navigation.navigation.navigate('NewPet'):props.Navigation.navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para doar um pet' }})
            if(props.Navigation.route.name=='Welcome2'){
              Alert.alert(
                "ATENÇÃO!",
                'Entre ou Cadastre-se para doar um pet'
              ) 
            }
          }}>
            <Feather name="sun" size={30} color="#fff" />
            <Text style={styles.actionText}> Doar </Text>
          </TouchableOpacity>        
          <TouchableOpacity style={styles.action} onPress={() => {props.Navigation.navigation.navigate('Inicio')}}>
            <Ionicons name="paw-outline" size={30} color="#fff" />
            <Text style={styles.actionText}> Início </Text>
          </TouchableOpacity>     
          
          <TouchableOpacity style={styles.action} onPress={() =>{
            signed?props.Navigation.navigation.navigate('Favoritos'):props.Navigation.navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para favoritar um pet' }})
            if(props.Navigation.route.name=='Welcome2'){
              Alert.alert(
                "ATENÇÃO!",
                'Entre ou Cadastre-se para favoritar um pet'
              ) 
            }
            }}>
            <MaterialIcons name="favorite-outline" size={30} color="#fff" />
            <Text style={styles.actionText}> Favoritos </Text>
          </TouchableOpacity>
    </View>
        
    )
}