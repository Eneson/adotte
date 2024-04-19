import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Image, KeyboardAvoidingView  } from 'react-native'
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import styles from './styles'
import adote_dog from '../../assets/adote_dog.png';

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
  
  if (!fontsLoaded) {
    return null
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
          <Text style={styles.loginText}>BEM-VINDO!</Text>
          <Text style={styles.textDescription}>Este é um aplicativo desenvolvido por alunos do IFPA para facilitar a adoção de animais.</Text>
          <Text style={styles.textDescriptionBold}>Adote um novo amigo agora mesmo!</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={() => navigateTo('login')}>
            <Text style={styles.actionText}>ENTRAR</Text>
          </TouchableOpacity>
          <View style={styles.cadastroButton}>
          <Text>Não possui um cadastro? </Text>
          <TouchableOpacity onPress={() => navigateTo('register')}>
            <Text style={styles.actionText2}> Cadastrar </Text>
          </TouchableOpacity>
          </View>
        </View>               
      </KeyboardAvoidingView>
    </View>
  )
}
