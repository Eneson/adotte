import React, { useRef,useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Alert, Modal, ScrollView, SafeAreaView  } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { FontAwesome5 } from '@expo/vector-icons'
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Montserrat_300Light, Montserrat_700Bold, Montserrat_600SemiBold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';
import { OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Flow  } from 'react-native-animated-spinkit'

import styles from './loginStyles'
import stylesEsqueciSenha from './esqueciSenhaStyles'
import api from '../../services/api'

export function EsqueciSenha() {
  const { register, handleSubmit, control, formState:{ errors } } = useForm()
  const [modalVisible, setmodalVisible] = useState(false)
  const navigation = useNavigation()
 function navigateTo(Page) {
    navigation.navigate(Page)
  }

  useEffect(() => {
    register('email')
  }, [register])

  async function handleRecover(e) {	
    setmodalVisible(true)
    const dados = {
      "email": e.email
    }   

    try {
      await api.post('/forget_password', dados)
      .then(async (data) => {
        navigateTo('ConfirmarToken')             
      }).catch((err) => {
        Alert.alert(
          "Erro",
          "Usuário não encontrado",
          [
            {
              text: "OK",
            }
          ]
        );
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
            <Text style={styles.loginText}>Recuperar senha</Text>
            <Text style={styles.loginHeaderText}>Digite o email cadastrado para recuperar a senha!</Text>
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
                    console.log(errors)
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
              <TouchableOpacity style={styles.action} onPress={handleSubmit(handleRecover)} >
                <Text style={styles.actionText}>CONTINUAR</Text>
              </TouchableOpacity>
    	
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export function ConfirmarToken(){
  const [modalVisible, setmodalVisible] = useState(false)
  const navigation = useNavigation()
  const [token, setToken] = useState(["", "", "", ""]);
  const inputs = useRef([]);  
  const { register, watch, handleSubmit, control, formState:{ errors }  } = useForm()
  useEffect(() => {
    register('senha0')
    register('senha1')
    register('senha2')
    register('senha3')
  }, [register])
  // Função para atualizar o token conforme o usuário digita
  const handleChange = (value, index) => {
    const newToken = [...token];
    newToken[index] = value;

    // Se houver valor no input, avançar para o próximo
    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }

    setToken(newToken);
  };

  // Lidar com a tecla backspace
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !token[index]) {
      inputs.current[index - 1].focus();
    }
  };
 function navigateTo(Page) {
    navigation.navigate(Page)
  }

  


  async function handleVerifyToken() {
    console.log('sssssssssssssssssssssss')
    setmodalVisible(true)

    const tokenJoin = token.join("");
    console.log(tokenJoin)
    const dados = {
      "token": tokenJoin,
    }
   try {
      await api.post('/verifyToken', dados)
      .then(async (data) => {
        navigation.navigate('Welcome', {screen: 'NewSenha', params: { Token: tokenJoin }})
      }).catch(() => {
        Alert.alert(
              "Erro",
              "Código informado não é valido",
              [
                {
                  text: "OK",
                }
              ]
            );
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
            <Text style={styles.loginText}>Recuperar senha</Text>
            <Text style={styles.loginHeaderText}>Um código de verificação foi enviado para o seu e-mail, digite o código corretamente para prosseguir!</Text>
          </View>
          <View style={styles.loginForm}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {/* {token.map((digit, index) => (
                 <TextInput
                      key={index}
                      ref={(ref) => inputs.current[index] = ref}
                      style={{width: 50,
                        height: 50,
                        margin: 10,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        fontSize: 24,}}
                      value={digit}
                      onChangeText={(value) => handleChange(value, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      maxLength={1}
                      keyboardType="numeric"
                      textAlign="center"
                    />
              ))} */}

              {Array(4).fill().map((_, index) => (
                <Controller
                  rules={{
                    required: 'true',
                    minLength: {
                      value: 1,
                      message: "lowCaractere"
                    }
                  }}
                  key={index}
                  name={`token.${index}`}
                  control={control}
                  render={({ 
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                  }) => {
                    console.log('error - '+index)
                    console.log(error)
                    return <TextInput
                      ref={(ref) => inputs.current[index] = ref}
                      style={[{width: 50,
                        height: 50,
                        margin: 10,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                        fontSize: 24,}, {borderColor: invalid? 'red':'#000'}]}
                      value={value}
                      onChangeText={(val) => {
                        onChange(val);
                        handleChange(val, index);
                      }}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      maxLength={1}
                      keyboardType="numeric"
                      textAlign="center"
                    />
                  }}
                />
              ))}
            </View>
            <View style={[styles.containerTextField,{marginTop: 30}]}>
              <TouchableOpacity style={styles.action} onPress={handleSubmit(handleVerifyToken)} >
                <Text style={styles.actionText}>CONTINUAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export function NewSenha(props) {
  const { register,watch, setValue, handleSubmit, control, formState:{ errors }  } = useForm()
  const navigation = useNavigation()
  const [modalVisible, setmodalVisible] = useState(false)  
  const [isViewConfirmSenha, setIsViewConfirmSenha] = useState(true);
  const [isViewSenha, setIsViewSenha] = useState(true);
  
  useEffect(() => {
    register('senha')
    register('ConfirmSenha')
  }, [register])
  
  async function handleNewSenha(e) {
    const { Token } = props.route.params
    setmodalVisible(true)
        
    const dados = {
      "senha": e.senha,
      "token": Token
    }        
    
      await api.post('/newsenha', dados)
      .then(async (data) => {
        Alert.alert('Sucesso', 'Senha alterada com sucesso, faça login com a nova senha.', [
          { text: 'OK', onPress: () => {                         
            navigation.navigate('Welcome', {screen: 'login'})
          } },
      ])
      }).catch(() => {
        return Alert.alert(
          "Erro no cadastro",
          "Não foi possível comunicar com o servidor.\nTente novamente."
        )
      }).finally(() => {
         setmodalVisible(false)
      })
         
        
      

  }
  
  return (
    <SafeAreaView style={[styles.container]}>      
      {/* MODAL LOADING */}
      <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <Flow size={50} color="#3ab6ff"/>
        </View>
      </Modal> 
      <ScrollView style={[styles.scrollView,{width: '95%'}]}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Cadastrar nova senha</Text>
          <Text style={styles.loginHeaderText}>Cadastre sua nova senha.</Text>
        </View>
        <View  style={styles.loginForm}>
          <View style={styles.containerTextField}>
          <View>
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
                        <Text>Nova senha:</Text>
                        <View style={[stylesEsqueciSenha.TextInputEditable, {borderColor: invalid? 'red':'#000'}]}>                    
                          <TextInput
                            style={[stylesEsqueciSenha.input, {borderColor: invalid? 'red':'#000'}]}
                            
                            secureTextEntry={isViewSenha}
                            placeholderTextColor= {invalid?'red': '#bdbdbd'}
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
                        {errors.senha&&errors.senha.message=='lowCaractere'?<Text style={[{color: 'red'}]}>Senha deve conter no mínimo 8 caracteres</Text>:''}
                        {errors.senha&&errors.senha.type=='required'?<Text style={[{color: 'red'}]}>Senha obrigatoria</Text>:''}
                    </View>                
                    }
                  }
                  name="senha"
                  control={control}
                  defaultValue=""
                />

                <Controller
                  rules={{
                    required: 'true',
                    validate: (value) =>  {
                      if ( watch('senha') != value ){
                        return "As senhas digitadas não coincidem"
                      }
                    }
                  }}
                  render={({ 
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error }
                  }) => {
                      return <View>
                        <Text>Confirmar senha:</Text>
                        <View style={[stylesEsqueciSenha.TextInputEditable, {borderColor: invalid? 'red':'#000'}]}>                    
                          <TextInput
                            style={[stylesEsqueciSenha.input, {borderColor: invalid? 'red':'#000'}]}
                            placeholder={''}
                            secureTextEntry={isViewConfirmSenha}
                            placeholderTextColor= {invalid?'red': '#bdbdbd'}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}       
                          />
                          <TouchableOpacity 
                            style={{justifyContent: 'center', alignItems: 'center', alignContent:'center', marginEnd:10}} 
                            onPress={() => {                   
                              setIsViewConfirmSenha(!isViewConfirmSenha)  
                            }}
                          >
                            <FontAwesome5 name={isViewConfirmSenha?"eye-slash":"eye"} size={20} color={"#000"} />
                          </TouchableOpacity>
                        </View>            
                        {console.log(error)}            
                        {errors.ConfirmSenha&&error.message=='As senhas digitadas não coincidem'?<Text style={[{color: 'red'}]}>{error.message}</Text>:''}
                    </View>                
                    }
                  }
                  name="ConfirmSenha"
                  control={control}
                  defaultValue=""
                />
              </View>
          </View>
          
           
          <View style={styles.actions}>
            <TouchableOpacity isabled={modalVisible} style={styles.action} onPress={handleSubmit(handleNewSenha)} >
              <Text style={styles.actionText}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>  
        </View>
             
      </ScrollView>
    </SafeAreaView>
  )
}