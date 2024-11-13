import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions,useIsFocused } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet, Modal, ScrollView, SafeAreaView  } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text';
import { FontAwesome5 } from '@expo/vector-icons'
import { onSignIn } from '../../utils/IsLogin'; 
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Flow  } from 'react-native-animated-spinkit'
import * as WebBrowser from 'expo-web-browser'; 
import * as Linking from 'expo-linking'; 
import styles from './loginStyles'
import api from '../../services/api'
import { useOAuth,useUser,useSignIn, useSession, useAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession()
 
export default function Login(props) {
  const { register, handleSubmit, control, formState:{ errors } } = useForm()
  const [modalVisible, setmodalVisible] = useState(false)
  const [isViewSenha, setIsViewSenha] = useState(true);
  const navigation = useNavigation()
  const isFocused = useIsFocused();

 function navigateTo(Page) {
    navigation.navigate(Page)
  }

  useEffect(() => {
    register('email')
    register('senha')
  }, [register])
  
  const googleOAuth = useOAuth({strategy: 'oauth_google'})
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(false);
  const {isSignedIn, signOut} = useAuth()


  useEffect(() => {
    // Quando a tela ganha o foco, executa a função
    if (isFocused) {
      if(isSignedIn){
        signOut()
      }
    }
  }, [isFocused]);

  
  async function SignGoogle() {
  
    try {
    
      setIsLoading(true)
      const redirectUrl = Linking.createURL("/")
      const  oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl})

      if(oAuthFlow.authSessionResult?.type === 'success'){
        if(oAuthFlow.setActive){
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId })
          //Passo 1 Verificar se o usuário já está cadastrado, Caso não esteja, navegar para pagina telefone
          //caso esteja, criar nova sessão e navegar para pagina inicial
          
          navigateTo('Telefone')
          
        }
      }else{
        setIsLoading(false)
      }




    } catch (error) {
      setIsLoading(false)
    }
    
  }

  useEffect(()=> {
    WebBrowser.warmUpAsync()

    return() => {
      WebBrowser.coolDownAsync()
    }
  },[])

  async function handleLogin(e) {
		
    setmodalVisible(true)
    const dados = {
      "email": e.email,
      "senha": e.senha
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
                  
                    return <View style={[{marginBottom: 10}]}>
                    <Text>E-mail:</Text>
                    <TextInput
                      style={[styles.input, {borderColor: invalid? 'red':'#000',}]}
                      placeholder='exemplo@gmail.com'
                      keyboardType='email-address'
                      autoComplete='email'
                      placeholderTextColor= {invalid && 'red'}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                    />
                    <Text style={[{color: 'red'}]}>{errors.email?errors.email.message=='Invalid_email'?'Digite um e-mail correto: exemplo@gmail.com':'':''}
                  {errors.email?errors.email.type=='required'?'E-mail obrigatório':'':''}</Text>
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
                      <Text>Senha:</Text>
                      <View style={[styles.TextInputEditable, {borderColor: invalid? 'red':'#000'}]}>
                        <TextInput
                          style={{borderColor: invalid? 'red':'#000',
                            paddingVertical: 10,
                            width: 'auto' }}
                          placeholder='********'
                          secureTextEntry={isViewSenha}
                          placeholderTextColor= {invalid && 'red'}
                          onBlur={onBlur}
                          onChangeText={value => onChange(value)}
                          value={value}
                        />
                        <TouchableOpacity 
                          style={{justifyContent: 'center', alignItems: 'center', alignContent:'center', marginEnd:10}} 
                          onPress={() => {                   
                            setIsViewSenha(!isViewSenha)  
                          }}
                        >
                          <FontAwesome5 name={isViewSenha?"eye-slash":"eye"} size={20} color={"#000"} />
                        </TouchableOpacity>
                      </View>
                      <Text style={[{color: 'red'}]}>{errors.senha?errors.senha.message=='lowCaractere'?'Senha deve conter no mínimo 8 caracteres':'':''}
                      {errors.senha?errors.senha.type=='required'?'Senha obrigatoria':'':''}</Text>
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
              
              <TouchableOpacity style={styles.action} onPress={SignGoogle} >
                <Text style={styles.actionText}>ENTRAR COM GOOGLE</Text>
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
