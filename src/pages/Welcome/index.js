import React from 'react'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Image, KeyboardAvoidingView,StyleSheet,Alert  } from 'react-native'
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import adote_dog from '../../assets/adote_dog.png';
import Footer from '../../components/Footer';

export default function Welcome(props) {
  const navigation = useNavigation()
  
  function navigateTo(Page) {
    navigation.navigate(Page)
  }

  let [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Roboto_400Regular,
    OpenSans_400Regular,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_600SemiBold,
    Pacifico_400Regular,
    Roboto_500Medium
  });

  if(props.route.params){
    Alert.alert(
      "ATENÇÃO!",
      props.route.params.Message
    ) 
  }    

  
  

  return (
    
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.content} behavior={''}>
        <View style={styles.loginHeader}>
          <Image
            style={styles.image}
            source={adote_dog}
            resizeMode='contain'
          />
          <View  style={styles.textInicio}>
            <Text style={styles.loginText}>BEM-VINDO!</Text>
            <Text style={styles.textDescription}>Este é um aplicativo desenvolvido por alunos do IFPA para facilitar a adoção de animais.</Text>
            <Text style={styles.textDescriptionBold}>Adote um novo amigo agora mesmo!</Text>
            <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => navigateTo('login')}>
            <Text style={styles.actionText}>ENTRAR</Text>
          </TouchableOpacity>
          <View style={styles.cadastroButton}>
          <Text>Não possui um cadastro? </Text>
          <TouchableOpacity onPress={() => navigateTo('register')}>
            <Text style={styles.actionText2}>Cadastrar</Text>
          </TouchableOpacity>
          </View>
        </View> 
          </View>
          </View>
                      
      </KeyboardAvoidingView>
      
      <Footer Navigation={{...props}}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textInicio:{
    flex: 0.6,
    width: '98%'
  },
  loginHeader:{
    flex: 2,
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center'
  },
  
  image:{
    flex: 0.4,
    width: 200
  },
  loginText:{
    fontSize: 25,
    color: '#000',
    textAlign: 'center',
    marginBottom:10,
    fontFamily: 'Montserrat_700Bold'
  },
  
  textDescription:{
    marginTop:5,
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular'
  },
  textDescriptionBold:{
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular'
  },
  
  actions: {
    marginTop:30,
    flex: 1
  },
  
  action: {
    backgroundColor: '#3ab6ff',
    borderRadius: 8,
    height: 55,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  
  actionText: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 2,
    fontFamily: 'Roboto_500Medium'
  },
  actionText2: {
    fontSize: 15,
    fontFamily: 'Roboto_500Medium',    
     textDecorationLine: 'underline',
     color: '#3ab6ff'
  },
  cadastroButton:{
    flexDirection: 'row',    
    justifyContent: 'center',
  }
})
