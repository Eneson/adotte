import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, CommonActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';

//import Login from './pages/Login'
import Welcome from './pages/Welcome'
import login from './pages/Welcome/login'
import register from './pages/Welcome/register'
import Cadastrar from './pages/Cadastrar'
import NewPet from './pages/NewPet'
import Denuncia from './pages/Denuncia'
import Adotar from './pages/Adotar'
import Favoritos from './pages/Favoritos'
import Profile from './pages/Profile'
import ImageForm from './pages/ImageForm'
import Editar from './pages/Editar'

import Initial from './pages/Initial'
import CustomDrawer from './components/CustomDrawer'
import { IsLogin } from './components/IsLogin';
import { onSignOut } from './components/IsLogin';

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
  return (
    <View >
      <TouchableOpacity style={styles.headerIcons2} onPress={()=>{onSignOut(props.navigation, CommonActions)}}>
          <Text style={{color: '#fff'}}>Sair</Text>
      </TouchableOpacity>
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
      <AppStack.Screen name="Favoritos2" component={Favoritos} 
        options={{
            headerTitle: 'Favoritos',
        }} />
      
    </Drawer.Navigator>
  )
}
function CadastrarScreen(props) {
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
      <AppStack.Screen name="Cadastrar2" component={Cadastrar} 
        options={{
            headerTitle: 'Nova Conta',
        }} />
      
    </Drawer.Navigator>
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
      <AppStack.Screen name="ImageForm" component={ImageForm} 
      options={{
          headerTitle: 'Cadastrar Pet',
      }} />
      
    </Drawer.Navigator>
  )
}
function AdotarScreen(props) {
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
      <AppStack.Screen name="Adotar2" component={Adotar} 
        options={{
            headerTitle: 'Adotar',
        }} />
      
    </Drawer.Navigator>
  )
}
function EditarScreen(props) {
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
      <AppStack.Screen name="Editar2" component={Editar} 
        options={{
            headerTitle: 'Editar Perfil',
        }} />
    </Drawer.Navigator>
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
                headerTitle: 'Denuncia',
            }} />
    </AppStack.Navigator>
  )
}
function WelcomeScreen(){  
    return (
      <AppStack.Navigator   
      >   
        <AppStack.Screen name="Welcome2" component={Welcome} options={{ 
          headerShown: false,
        }}  />      
        
        <AppStack.Screen name="login" component={login} options={{ 
          headerTitle: 'Entrar',
        }}  />   
        <AppStack.Screen name="register" component={register} options={{ 
          headerTitle: 'Registrar',
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
                headerTitle: 'Inicio',
            }} />
          
        </Drawer.Navigator>
      
    )
}


const [signed, setSigned] = useState(false)
useEffect(() => {
  IsLogin()
    .then(res => (setSigned(res)))
    .catch(err => (setSigned(false)));
}, [])  

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#3ab6ff" />
      <NavigationContainer>
        <AppStack.Navigator initialRouteName={signed ? 'Inicio':'Welcome'} screenOptions={{ headerShown: false,}} >
            <AppStack.Screen name="Welcome" component={WelcomeScreen} /> 
            <AppStack.Screen name="Inicio" component={InicioScreen} /> 
            <AppStack.Screen name="Profile" component={ProfileScreen} /> 
            <AppStack.Screen name="Favoritos" component={FavoritosScreen} />           
            <AppStack.Screen name="NewPet" component={NewPetScreen} />         
            <AppStack.Screen name="Denuncia" component={DenunciaScreen} />
            <AppStack.Screen name="Cadastrar" component={CadastrarScreen} />
            <AppStack.Screen name="Adotar" component={AdotarScreen} />
            <AppStack.Screen name="Editar" component={EditarScreen} />
        </AppStack.Navigator> 
    </NavigationContainer>
    </SafeAreaProvider>
    
  )
}
