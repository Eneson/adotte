import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, CommonActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome5  } from '@expo/vector-icons'
import Welcome from './pages/Welcome'
import login from './pages/Welcome/login'
import register from './pages/Welcome/register'
import {EsqueciSenha, ConfirmarToken, NewSenha} from './pages/Welcome/esqueciSenha.js';
import NewPet from './pages/NewPet'
import Denuncia from './pages/Denuncia'
import Adotar from './pages/Adotar'
import Favoritos from './pages/Favoritos'
import Profile from './pages/Profile'
import About from './pages/about'
import Editar from './pages/Editar'
import UpdatePet from './pages/NewPet/UpdatePet.js';
import Initial from './pages/Initial'
import CustomDrawer from './components/CustomDrawer'
import { useAuth } from '@clerk/clerk-expo'



import { onSignOut } from './utils/IsLogin.js'; 

import { IsLogin } from './utils/IsLogin.js';
import Telefone from './pages/Welcome/telefone.js';

const Drawer = createDrawerNavigator()
const AppStack = createStackNavigator()

const styles = StyleSheet.create({
    headerIcons:{
        flexDirection: 'row',
        marginEnd: 25,
        backgroundColor: '#e3e3e3',
        borderRadius: 20,
        padding:7,
        width:40
    },
    headerIcons2:{
      marginEnd: 25,
      borderRadius: 20,      
      paddingVertical: 3,
      padding:7,
      alignContent: 'center',
      alignItems: 'center',     
      borderColor: '#fff',
      borderWidth: 1,
      width: 60
  }

})

export default function Routes () { 

function Button(props) {  
  const [signed, setSigned] = useState(false)
  

  useEffect(() => {    
    IsLogin((resultado) => {                     
        setSigned(resultado)            
    })
}, [])


  return (
    <View>
      {signed? <TouchableOpacity style={styles.headerIcons2} onPress={()=>{onSignOut(props.navigation, CommonActions)}}>
          <Text style={{color: '#fff'}}>Sair</Text>
      </TouchableOpacity>:<TouchableOpacity style={styles.headerIcons2} onPress={()=>{props.navigation.navigate('Welcome')}}>
          <Text style={{color: '#fff'}}>Entrar</Text>
      </TouchableOpacity>}
      
    </View>
  )
}

function ProfileScreen(props) {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props} />}      
      screenOptions={{ 
        headerStyle: { 
          backgroundColor: '#3ab6ff',
        },        
        headerTintColor: '#fff',
        headerRight: () => (Button(props))
      }}      
    >   
      <AppStack.Screen name="Profile2" component={Profile} 
        options={{
            headerTitle: 'Meu Perfil',
        }} />
      
    </Drawer.Navigator>
  )
}
function FavoritosScreen(props) {
  return (
    <AppStack.Navigator>   
      <AppStack.Screen name="Favoritos2" component={Favoritos} 
        options={{
          headerTitle: 'Meus Favoritos',
          headerStyle: { 
            backgroundColor: '#3ab6ff',
          },    
          headerTintColor: '#fff',
        }} />
      
    </AppStack.Navigator>
  )
}
function NewPetScreen(props) {
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props} />}      
      screenOptions={{ 
        headerStyle: { 
          backgroundColor: '#3ab6ff',
        },        
        headerTintColor: '#fff',
        headerRight: () => (Button(props))
      }}      
    >   
      <AppStack.Screen name="NewPet2" component={NewPet} 
        options={{
            headerTitle: 'Cadastrar Pet',
        }} />      
    </Drawer.Navigator>
  )
}
function UpdatePetScreen(props) {
  return (
    <AppStack.Navigator 
      screenOptions={{ 
        headerShown: true,
        headerStyle: { 
          backgroundColor: '#3ab6ff',
        },        
        headerTintColor: '#fff',
      }}   
      >   
        <AppStack.Screen name="updatePet2" component={UpdatePet} 
        options={{
            headerTitle: 'Atualizar Pet',
        }} />   
      </AppStack.Navigator>
  )
  
}
function AdotarScreen(props) {
  return (
    <AppStack.Navigator  
      screenOptions={{ 
        headerStyle: { 
        },        
        headerTintColor: '#fff',             
      }}      
    >   
      <AppStack.Screen  name="Adotar2" component={Adotar}   
        options={{
          //headerTransparent: true,
          headerStyle: { 
            backgroundColor: '#3ab6ff',

          },        
          cardStyle:{
            //backgroundColor: 'transparent'
          },
          headerTintColor: '#fff',
          headerTitle: '',
          headerTitleStyle: {
            textAlign: 'center'
          },
          
        }} />
      
    </AppStack.Navigator>
  )
}
function EditarScreen(props) {
  return (
    <AppStack.Navigator 
      //drawerContent={props => <CustomDrawer {...props} />}      
      screenOptions={{ 
        headerStyle: { 
          backgroundColor: '#3ab6ff',
        },        
        headerTintColor: '#fff',
        headerRight: () => (Button(props))
      }}      
    >   
      <AppStack.Screen name="Editar2" component={Editar} 
        options={{
            headerTitle: 'Editar Perfil',
        }} />
    </AppStack.Navigator>
  )
}
function DenunciaScreen() {
  return (
    <AppStack.Navigator 
    screenOptions={{ 
        headerShown: true,
        headerStyle: { 
          backgroundColor: '#3ab6ff',
        },        
        headerTintColor: '#fff',
      }} >
          <AppStack.Screen name="Denuncia2" component={Denuncia} 
            options={{
                headerTitle: 'Denúncia',
            }} />
    </AppStack.Navigator>
  )
}
function WelcomeScreen(){  
    return (
      <AppStack.Navigator 
        screenOptions={{ 
                headerStyle: { 
                  backgroundColor: '#3ab6ff',
                },        
                headerTintColor: '#fff',
              }}
        >   
        <AppStack.Screen name="Welcome2" component={Welcome} options={{
                headerTitle: '',
            }}  />      
        
        <AppStack.Screen name="login" component={login} options={{ 
          headerStyle: { 
            backgroundColor: '#fff',
          },        
          headerTintColor: '#000',
          headerTitle: '',
        }}  />   
        <AppStack.Screen name="register" component={register} options={{ 
          headerStyle: { 
            backgroundColor: '#fff',
          },        
          headerTintColor: '#000',
          headerTitle: '',
        }}  />  
        
        <AppStack.Screen name="EsqueciSenha" component={EsqueciSenha} options={{ 
          headerStyle: { 
            backgroundColor: '#fff',
          },        
          headerTintColor: '#000',
          headerTitle: '',
        }}  />  
        <AppStack.Screen name="ConfirmarToken" component={ConfirmarToken} options={{ 
          headerStyle: { 
            backgroundColor: '#fff',
          },        
          headerTintColor: '#000',
          headerTitle: '',
        }}  />    
         <AppStack.Screen name="NewSenha" component={NewSenha} options={{ 
          headerStyle: { 
            backgroundColor: '#fff',
          },        
          headerTintColor: '#000',
          headerTitle: '',
        }}  />  
        <AppStack.Screen name="Telefone" component={Telefone} options={{ 
          headerStyle: { 
            backgroundColor: '#fff',
          },        
          headerTintColor: '#000',
          headerTitle: '',
        }}  />  
      </AppStack.Navigator>
    )
  
  
}
function InicioScreen(props){
    return (
      <Drawer.Navigator 
          drawerContent={props => <CustomDrawer {...props} />}      
          screenOptions={{ 
            headerStyle: { 
              backgroundColor: '#3ab6ff',
            },        
            headerTintColor: '#fff',
            headerRight: () => (Button(props))
          }}      
        >   
          <AppStack.Screen name="Inicio2" component={Initial} 
            options={{
                headerTitle: 'Início',
            }} />
          
        </Drawer.Navigator>
      
    )
}
function AboutScreen() {
  return (
    <AppStack.Navigator 
    screenOptions={{ 
        headerShown: true,
        headerStyle: { 
          backgroundColor: '#3ab6ff',
        },        
        headerTintColor: '#fff',
      }} >
          <AppStack.Screen name="About2" component={About} 
            options={{
                headerTitle: 'Sobre',
            }} />
    </AppStack.Navigator>
  )
}

return (
  <SafeAreaProvider >
    <StatusBar barStyle="light-content" backgroundColor="#3ab6ff" />
    <NavigationContainer >
      <AppStack.Navigator initialRouteName={'Inicio'} screenOptions={{ headerShown: false,}} >            
            <AppStack.Screen name="Inicio" component={InicioScreen} /> 
            <AppStack.Screen name="Welcome" component={WelcomeScreen} /> 
            <AppStack.Screen name="Profile" component={ProfileScreen} /> 
            <AppStack.Screen name="Favoritos" component={FavoritosScreen} />           
            <AppStack.Screen name="NewPet" component={NewPetScreen} />         
            <AppStack.Screen name="Denuncia" component={DenunciaScreen} />
            <AppStack.Screen name="Adotar" component={AdotarScreen} />
            <AppStack.Screen name="Editar" component={EditarScreen} />
            <AppStack.Screen name="UpdatePet" component={UpdatePetScreen} />     
            <AppStack.Screen name="About" component={AboutScreen} />                           
      </AppStack.Navigator>  
  </NavigationContainer>
  </SafeAreaProvider>
  
)
}
