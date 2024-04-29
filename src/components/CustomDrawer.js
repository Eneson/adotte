import React, { useState, useEffect }from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation,CommonActions } from '@react-navigation/native';
import { IsLogin } from './IsLogin'
import { onSignOut } from './IsLogin';

import LoginIcon from '../assets/LoginIcon.png'

export default function CustomDrawer (props) {    
    const [nome, setNome] = useState(false)
    const [telefone, setTelefone] = useState(false)
    const [signed, setSigned] = useState(false)
    const navigation = useNavigation()

    IsLogin()
        .then(res => {                            
            var palavras = res.nome.split(' ');
            //Pega os dois primeiros nomes
            setNome(palavras.slice(0, 2).join(' '))
            var telefone = res.telefone
                
            setTelefone('(' + telefone.substring(0, 2) + ') ' + telefone.charAt(2) + ' ' + telefone.substring(3, 7) + '-' + telefone.substring(7))

        })
        .catch(err => (setSigned(false)));
        
    

    
    const screen = useRoute().name;

    function sairFunction() {
        onSignOut(navigation,CommonActions)
    }
    return (
        <View style={{flex: 1}}>

            <View style={{backgroundColor: '#3ab6ff', flex: 1, paddingBottom: 20}}>
                
                    <View style={styles.profileHeader}>
                        <Image
                            style={styles.image}
                            source={LoginIcon}
                            resizeMode='center'
                        />                         
                        <Text style={styles.headerName}>{nome}</Text>
                        <Text style={styles.headerNumber}>{telefone}</Text> 
                    </View>
                
            </View>
            <View style={{flex: 5}}>
                <DrawerContentScrollView {...props}>
                    <DrawerItem
                        icon={({ focused, color, size }) => <Ionicons name="md-paw-outline" size={size} color={color} /> }
                        label="Adotar um Pet"
                        onPress={() => {navigation.navigate('Inicio')}} 
                        focused={screen.includes('Inicio')?true:false}
                    />

                    <DrawerItem
                        label="Pets Favoritos"
                        onPress={() => {navigation.navigate('Favoritos')}} 
                        icon={({ focused, color, size }) => <MaterialIcons name="favorite-outline" size={size} color={color}/> }
                        focused={screen.includes('Favoritos')?true:false}
                    />

                    
                    <View>
                        
                        <DrawerItem
                            label="Doar um pet"
                            onPress={() => {navigation.navigate('NewPet')}} 
                            icon={({ focused, color, size }) => <Feather name="sun" size={size} color={color} /> }
                            focused={screen.includes('NewPet')?true:false}
                        />
                        <DrawerItem
                            label="Meu Perfil"
                            onPress={() => {navigation.navigate('Profile')}} 
                            icon={({ focused, color, size }) => <AntDesign name="user" size={size} color={color} /> }
                            focused={screen.includes('Profile')?true:false}
                        />
                        <DrawerItem
                            label="Sair"
                            onPress={() => {sairFunction()}} 
                            icon={({ focused, color, size }) => <AntDesign name="logout" size={size} color={color} /> }
                        />
                    </View>
                    
                    <DrawerItem
                        label="Sobre"
                        onPress={() => {navigation.navigate('sobre')}} 
                        icon={({ focused, color, size }) =>  <Ionicons name="information-circle-outline" size={size} color={color} /> }
                        focused={screen.includes('sobre')?true:false}
                    />
                    

                    
                    
                                       
                    


                </DrawerContentScrollView>
            </View>            
        </View>
        
    )
}

const styles = StyleSheet.create({
    profileHeader:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      marginTop: 20
    },
    headerName: {
      fontSize: 25,    
      letterSpacing: 2,
      fontWeight: 'bold',
      color: '#2a1e49'
    },
    headerNumber:{

    },
    image: {
      width: 70, height: 50
    },
    image2: {
      width: 80, height: 80
    }
})

