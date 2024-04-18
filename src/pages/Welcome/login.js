import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator, Modal, ScrollView, SafeAreaView  } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onSignIn } from '../../components/IsLogin';


import api from '../../services/api'
import styles from './loginStyles'



export default function Login(props) {
  const { register, setValue, handleSubmit, getValues, control, formState:{ errors } } = useForm()
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
		
    const dados = {
      "email": e.email,
      "senha": e.senha
    }
    

    setmodalVisible(true)
    
   try {
      await api.post('/login', dados)
      .then(async (data) => {
        const doador = JSON.stringify(data.data.token)
        onSignIn(navigation,CommonActions,doador)
        //await AsyncStorage.setItem('@Profile:token', doador);        
            
      })

    } catch (err) {
      
      if(err.code.includes('BAD_REQUEST')){
        Alert.alert(
          "Erro no login",
          "Usuario e senha não encontrados",
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
 

  function phoneField(onChange, onBlur, value)  {
    
    
    if(errors.telefone){
      return <TextInputMask                  
        style={[styles.input, {borderColor: errors.telefone.type=== "required"? 'red':''}]}
        placeholder={'Telefone'}
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
        placeholder={'Telefone'}
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
      <Modal
        visible={modalVisible}
        transparent={true}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
        }}>
        <ActivityIndicator color="#000" size="large" />
        </View>
      </Modal> 
      <ScrollView style={styles.scrollView}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Login</Text>
          <Text>Entre com e-mail e senha cadastrados e continue fazendo a diferença!</Text>
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
                  <Text>Email:</Text>
                  <TextInput
                    style={[styles.input, {borderColor: invalid? 'red':'#000',}]}
                    placeholder='email@gmail.com'
                    keyboardType='email-address'
                    autoComplete='email'
                    placeholderTextColor= {invalid && 'red'}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                  <Text style={[{color: 'red'}]}>{errors.email?errors.email.message=='Invalid_email'?'Digite um email correto: exemplo@gmail.com':'':''}
                {errors.email?errors.email.type=='required'?'Email obrigatorio':'':''}</Text>
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
                    <TextInput
                      style={[styles.input, {borderColor: invalid? 'red':'#000'}]}
                      placeholder='********'
                      secureTextEntry={true}
                      placeholderTextColor= {invalid && 'red'}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={value}
                    />
                    <Text style={[{color: 'red'}]}>{errors.senha?errors.senha.message=='lowCaractere'?'Senha deve conter no minimo 8 caracteres':'':''}
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
           <View style={styles.cadastroButton}>
            <Text>Não possui um cadastro? </Text>
            <TouchableOpacity  onPress={() => navigateTo('Cadastrar')}>
              <Text style={styles.actionText2}> Cadastrar </Text>
            </TouchableOpacity>
                   
            
           </View>
          </View>  
        </View>
             
      </ScrollView>
    </SafeAreaView>
  )
}
