import React, { useState, useEffect }from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation,CommonActions } from '@react-navigation/native';
import { IsLogin, onSignIn } from '../utils/IsLogin';

import LoginIcon from '../assets/LoginIcon.png'

export default function CustomDrawer (props) {    
    const [nome, setNome] = useState(false)
    const [telefone, setTelefone] = useState(false)
    const [signed, setSigned] = useState(false)
    const navigation = useNavigation()


    useEffect(() => {    
        IsLogin((resultado) => {
            if(resultado!=false){
                var palavras = resultado.nome.split(' ');
                //Pega os dois primeiros nomes
                setNome(palavras.slice(0, 2).join(' '))                
                setTelefone(resultado.telefone)                
            }              
            setSigned(resultado)            
        })
    }, [])

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
                        {signed? <View>
                            <Text style={styles.headerName}>{nome}</Text>
                            <Text style={styles.headerNumber}>{telefone}</Text> 
                        </View>:<View><Text style={styles.headerName}>Bem vindo!</Text></View>}
                        
                    </View>
                
            </View>
            <View style={{flex: 5}}>
                <DrawerContentScrollView {...props}>
                    <DrawerItem
                        icon={({ focused, color, size }) => <Ionicons name="paw-outline" size={size} color={color} /> }
                        label="Início"
                        onPress={() => {navigation.navigate('Inicio')}} 
                        focused={screen.includes('Inicio')?true:false}
                    />

                    <DrawerItem
                        label="Favoritos"
                        onPress={() => {{signed? navigation.navigate('Favoritos'): navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para favoritar um pet' }})}}} 
                        icon={({ focused, color, size }) => <MaterialIcons name="favorite-outline" size={size} color={color}/> }
                        focused={screen.includes('Favoritos')?true:false}
                    />

                    
                                          
                        <DrawerItem
                            label="Doar"
                            onPress={() => {{signed? navigation.navigate('NewPet'): navigation.navigate('Welcome', {screen: 'Welcome2', params: { Message: 'Entre ou Cadastre-se para doar um pet' }})}}} 
                            icon={({ focused, color, size }) => <Feather name="sun" size={size} color={color} /> }
                            focused={screen.includes('NewPet')?true:false}
                        />
                        
                        {signed? <View>  
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
                        </View>:<View></View>}
                        
                    
                    <DrawerItem
                        label="Sobre"
                        onPress={() => {navigation.navigate('About')}} 
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

