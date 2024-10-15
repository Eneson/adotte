import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, CommonActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome, FontAwesome5  } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import Welcome from './pages/Welcome'
import login from './pages/Welcome/login'
import register from './pages/Welcome/register'
import NewPet from './pages/NewPet'
import Denuncia from './pages/Denuncia'
import Adotar from './pages/Adotar'
import Favoritos from './pages/Favoritos'
import Profile from './pages/Profile'
import Editar from './pages/Editar'
import UpdatePet from './pages/NewPet/UpdatePet.js';
import Initial from './pages/Initial'
import CustomDrawer from './components/CustomDrawer'
import { onSignOut } from './components/IsLogin';
import api from './services/api.js';

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

function verificaUser(){
  return new Promise(async (resolve, reject) => {    
    const value = await AsyncStorage.getItem('@Profile:token')
    if(value==null){
      reject(false);
      return
    }  

    try {
      var decoded = jwtDecode(value); 
      api.get('user/'+decoded.id_user).then((a) => {
        resolve(true) 
      }).catch((error) => {
        if(error.message=='Network Error'){
          resolve(true)
          return
        }else{
          AsyncStorage.removeItem('@Profile:token')
          reject(false)
        }
      })
    } catch (error) {
      return
    }
    
  }) 
}




 

export default function Routes () { 

function Button(props) {  
  const [signed, setSigned] = useState(false)

  verificaUser().then(() => {   
    setSigned(true)
  }).catch(() => {
    setSigned(false)
  })

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
          backgroundColor: '#3ab6ff',
        },        
        headerTintColor: '#fff',
        headerBackImage: () => (
          <View style={{margin: 5}}>
            <FontAwesome5 name="arrow-left" size={35} color="#3ab6ff" />
          </View>
        ),
        
      }}      
    >   
      <AppStack.Screen  name="Adotar2" component={Adotar} 
  
        options={{
          headerTransparent: true,
          headerStyle: { 
            backgroundColor: '#fff',

          },        
          cardStyle:{
            backgroundColor: 'transparent'
          },
          headerTintColor: '#fff',
          headerTitle: '',
          headerTitleStyle: {
            height: 100
          },
          
        }} />
      
    </AppStack.Navigator>
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
      // <Drawer.Navigator 
      //     drawerContent={props => <CustomDrawer {...props} />}      
      //     screenOptions={{ 
      //       headerStyle: { 
      //         backgroundColor: '#3ab6ff',
      //       },        
      //       headerTintColor: '#fff',
      //       headerRight: () => (Button(props))
      //     }}      
      //   >   
      //     <AppStack.Screen name="Inicio2" component={Initial} 
      //       options={{
      //           headerTitle: 'Inicio',
      //       }} />
          
      //   </Drawer.Navigator>

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
return (
  <SafeAreaProvider >
    <StatusBar barStyle="light-content" backgroundColor="#3ab6ff" />
    <NavigationContainer >
      <AppStack.Navigator initialRouteName={'Inicio'} screenOptions={{ headerShown: false,}} >            
            <AppStack.Screen name="Welcome" component={WelcomeScreen} /> 
            <AppStack.Screen name="Inicio" component={InicioScreen} /> 
            <AppStack.Screen name="Profile" component={ProfileScreen} /> 
            <AppStack.Screen name="Favoritos" component={FavoritosScreen} />           
            <AppStack.Screen name="NewPet" component={NewPetScreen} />         
            <AppStack.Screen name="Denuncia" component={DenunciaScreen} />
            <AppStack.Screen name="Adotar" component={AdotarScreen} />
            <AppStack.Screen name="Editar" component={EditarScreen} />
            <AppStack.Screen name="UpdatePet" component={UpdatePetScreen} />                     
      </AppStack.Navigator>  
  </NavigationContainer>
  </SafeAreaProvider>
  
)
}
