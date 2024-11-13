import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions,useIsFocused } from '@react-navigation/native'
import { View, TextInput, Image,StyleSheet, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { FontAwesome5 } from '@expo/vector-icons'
import { TextInputMask} from 'react-native-masked-text'
import { onSignIn } from '../../utils/IsLogin' 
import api from '../../services/api'
import styles from './loginStyles'
import { Flow  } from 'react-native-animated-spinkit'
import { useUser,useAuth } from '@clerk/clerk-expo'

export default function Telefone(props) {
  const { register, watch, handleSubmit, control, formState:{ errors }  } = useForm()
  const navigation = useNavigation()
  const [modalVisible, setmodalVisible] = useState(true)
  const [isViewConfirmSenha, setIsViewConfirmSenha] = useState(true);
  const [isViewSenha, setIsViewSenha] = useState(true);

  const isFocused = useIsFocused();
  const {user} = useUser()
  const {getToken} = useAuth()

  function navigateTo(Page) {
    navigation.navigate(Page)
  }
  
  useEffect(() => {
    register('telefone')
  }, [register])
  
  useEffect(()=>{
    if(isFocused == true){
      verificarEmail()
    }
  },[isFocused])

  async function verificarEmail() {
    try {
      var email = user.primaryEmailAddress.emailAddress.toLowerCase()
      const token = await getToken(); // Use um template de token se configurado
      console.log('token')
      console.log(token)
      const dados = {
        "email": email,
        "token": token 
      }
      
      await api.post('/userGoogle', dados)
      .then(async () => {  
      }).catch(async (error) => {
        const mensagem = error.response.data.mensagem
        if(mensagem.includes('Email cadastrado')){        
          try {
            await api.post('/google/session', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
              }
            },dados)
            .then(async (data) => {
              console.log(data)
              const doador = JSON.stringify(data.data.token)
              onSignIn(navigation,CommonActions,doador)            
            }).catch((err)=>{
              console.log(err)
              navigateTo('login')
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
        }else{
          Alert.alert(
            "Erro no login",
            "Erro, Tente novamente",
            [
              {
                text: "OK",
              }
            ]
          );
          navigateTo('login')
        }
      }).finally(() => {
        setmodalVisible(false)
      })
    } catch (error) {
      console.error(error)
    }
  }
  
  async function handleNewDoador(e) {
    setmodalVisible(true)
    
    // Formata o número
    const apenasNumeros = e.telefone.replace(/\D/g, '');
    var telefone = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.charAt(2)} ${apenasNumeros.slice(3, 7)}-${apenasNumeros.slice(7)}`;
    
    if(apenasNumeros.length<11){      
    setmodalVisible(false)
      return Alert.alert('Erro no preenchimento', 'Preencha o numero de telefone corretamente ex: (99) 9 9999-9999', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    }

    var email = user.primaryEmailAddress.emailAddress.toLowerCase()
    var nome = user.fullName

    var palavras = nome.split(' ');

    // Itera sobre cada palavra e capitaliza a primeira letra
    for (var i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i].charAt(0).toUpperCase() + palavras[i].slice(1);
    }
    // Junta as palavras de volta em uma única string
    nome = palavras.join(' ');
    const dados = {
      "nome": nome,
      "telefone": telefone,
      "email": email,
    }        
    
      await api.post('/user', dados)
      .then(async (data) => {
        const doador = JSON.stringify(data.data.token)
        onSignIn(navigation,CommonActions,doador)  
      }).catch(() => {
        return Alert.alert(
          "Erro no cadastro",
          "Não foi possível comunicar com o servidor.\nTente novamente."
        )
      }).finally(() => {
         setmodalVisible(false)
      })
         
        
      

  }

  function phoneField(onChange, onBlur, value)  {  
    
    if(errors.telefone){
      return <TextInputMask                  
        style={[styles.input, {borderColor: errors.telefone.type=== "required"? 'red':''}]}
        placeholder={'(99) 9 9999-9999'}
        placeholderTextColor= {errors.telefone.type=== "required" && 'red'}
        value={value}                  
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
          
        }}                  
        onChangeText={onChange}
      />
    }else {
      return <TextInputMask                  
        style={[styles.input]}
        placeholder={'(99) 9 9999-9999'}
        value={value}                  
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
          
        }}                  
        onChangeText={onChange}
      />
    }
  }

  
  return (
    <SafeAreaView style={styles.container}>      
      {/* MODAL LOADING */}
      {/* <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}> */}
      {modalVisible?<View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center',}}>
            <Flow size={50} color="#3ab6ff"/>
        </View>:<ScrollView style={styles.scrollView}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Cadastrar Telefone</Text>
          <Text style={styles.loginHeaderText}>Faça a diferença na vida de um animal. Registre-se agora e descubra seu próximo melhor amigo.</Text>
        </View>
        <View  style={styles.loginForm}>
          <View style={styles.containerTextField}>
            <Controller
              rules={{
                required: 'true',    
                minLength: {
                  value: 15,
                  message: "lowCaractere"
                }            
              }}
              render={({ 
                field: { onChange, onBlur, value,},
              }) => {
                
                  return <View style={[{marginBottom: 10}]}>
                  <Text>Telefone:</Text>
                  {phoneField(onChange, onBlur, value)}              
                  <Text style={[{color: 'red'}]}>{errors.telefone?errors.telefone.message=='lowCaractere'?'Telefone deve conter 11 dígitos':'':''}
                    {errors.telefone?errors.telefone.type=='required'?'Campo obrigatório':'':''}</Text>
                   
                </View>
                }

              }
              name="telefone"              
              control={control}
              defaultValue=""
            /> 
          </View>
    
          <View style={styles.actions}>
            <TouchableOpacity isabled={modalVisible} style={styles.action} onPress={handleSubmit(handleNewDoador)} >
              <Text style={styles.actionText}>Continuar</Text>
            </TouchableOpacity>
          </View>  
        </View>
             
      </ScrollView>}
        
      {/* </Modal>  */}
      {/*  */}
    </SafeAreaView>
  )
}