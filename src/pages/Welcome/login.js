import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Alert, Modal, ScrollView, SafeAreaView  } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { onSignIn } from '../../utils/IsLogin'; 
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Flow  } from 'react-native-animated-spinkit'

import styles from './loginStyles'
import stylesGeral from './styles'
import api from '../../services/api'
import InputForm from '../../components/InputForm';
import InputSenhaForm from '../../components/InputSenhaForm';
 
export default function Login() {
  const { register, handleSubmit, control, formState:{ errors } } = useForm()
  const [modalVisible, setmodalVisible] = useState(false)
  const navigation = useNavigation()
  
 function navigateTo(Page) {
    navigation.navigate(Page)
  }

  useEffect(() => {
    register('email')
    register('senha')
  }, [register])


  async function handleLogin(e) {
		
    setmodalVisible(true)
    const dados = {
      "Email": e.email,
      "Senha": e.senha
    }
    

    
   try {
      await api.post('/login', dados)
      .then(async (data) => {
        const doador = JSON.stringify(data.data.token)
        onSignIn(navigation,CommonActions,doador)            
      })

    } catch (err) {
      
      if(err.code.includes('BAD_REQUEST')){
        Alert.alert(
          "Erro no login",
          "Usuário e senha não encontrados",
          [
            {
              text: "OK",
            }
          ]
        );
      }else{
        Alert.alert(
          "Erro no login",
          "Erro inesperado, tente novamente mais tarde",
          [
            {
              text: "OK",
              style: "cancel"
            }
          ]
        );
      }
    }

    setmodalVisible(false)
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
    return <Text>Carregando...</Text>;
  }else {  
    return (
      
      <SafeAreaView style={styles.container}>
        {/* MODAL LOADING */}
        <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
          <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
              <Flow size={50} color="#3ab6ff"/>
          </View>
        </Modal> 
        <ScrollView style={styles.scrollView}>
          <View style={styles.loginHeader}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.loginHeaderText}>Entre com e-mail e senha cadastrados e continue fazendo a diferença!</Text>
          </View>
          <View  style={styles.loginForm}>          
            <View style={styles.containerTextField}>
              <Controller
                rules={{
                  required: 'true',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Invalid_email',
                  },
                }}
                render={({ 
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error }
                }) => {
                  
                    return <View>
                      <InputForm 
                        placeholder='E-mail:'
                        inputPlaceholder='exemplo@gmail.com'
                        keyboardType='email-address'
                        autoComplete='email'
                        invalid={invalid} 
                        onBlur={onBlur} 
                        onChange={onChange} 
                        value={value}
                      />
                      
                    {errors.email&&errors.email.message=='Invalid_email'?<Text style={stylesGeral.errorMessage}>(*) Digite um e-mail correto: exemplo@gmail.com</Text>:''}
                    {errors.email&&errors.email.type=='required'?<Text style={stylesGeral.errorMessage}>(*) E-mail obrigatório</Text>:''}
                  </View>
                  }

                }
                name="email"
                control={control}
                defaultValue=""
              /> 
            </View>

            <View style={styles.containerTextField}>
              <Controller
                rules={{
                  required: 'true',
                  minLength: {
                    value: 8,
                    message: "lowCaractere"
                  }
                }}
                render={({ 
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error }
                }) => {                  
                    return <View>
                      <InputSenhaForm 
                        placeholder='Senha:'
                        inputPlaceholder='********'
                        invalid={invalid} 
                        onBlur={onBlur} 
                        onChange={onChange} 
                        value={value}
                      />

                      
                      {errors.senha&&errors.senha.message=='lowCaractere'?<Text style={stylesGeral.errorMessage}>(*) Senha deve conter no mínimo 8 caracteres</Text>:''}
                      {errors.senha&&errors.senha.type=='required'?<Text style={stylesGeral.errorMessage}>(*) Senha obrigatória</Text>:''}
                      
                      
                  </View>
                  
                  }

                }
                name="senha"
                control={control}
                defaultValue=""
              /> 
            </View>
            
            
            <View style={styles.actions}>
              <TouchableOpacity style={styles.action} onPress={handleSubmit(handleLogin)} >
                <Text style={styles.actionText}>ENTRAR</Text>
              </TouchableOpacity>
            <View >
              <View style={styles.cadastroButton}>
                <Text>Esqueceu a senha? </Text>              
                <TouchableOpacity disabled={modalVisible} onPress={() => navigateTo('EsqueciSenha')}>
                  <Text style={styles.actionText2}>Recuperar senha</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.cadastroButton, {marginTop:10}]}>
                <Text>Não possui um cadastro? </Text>
                <TouchableOpacity disabled={modalVisible} onPress={() => navigateTo('register')}>
                  <Text style={styles.actionText2}>Cadastrar</Text>
                </TouchableOpacity>

              </View>
                    
              
            </View>
            </View>  
          </View>
              
        </ScrollView>
      </SafeAreaView>
    )
  }
}
