import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Image, KeyboardAvoidingView  } from 'react-native'


import styles from './styles'
import adote_dog from '../../assets/adote_dog.png';

export default function Welcome(props) {
  const navigation = useNavigation()

  function navigateTo(Page) {
    navigation.navigate(Page)
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
