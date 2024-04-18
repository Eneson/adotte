import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Image, Text, TouchableOpacity, Modal, ActivityIndicator, ScrollView, SafeAreaView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'

import api from '../../services/api'
import styles from './registerStyles'

export default function Cadastrar(props) {
  const { register, setValue, handleSubmit, control, formState:{ errors }  } = useForm()
  const navigation = useNavigation()
  const [modalVisible, setmodalVisible] = useState(false)

  function navigateTo(Page) {
    navigation.navigate(Page)
  }
  
  useEffect(() => {
    register('nome')
    register('telefone')
    register('email')
    register('senha')
  }, [register])
  
  async function handleNewDoador(e) {
    //setmodalVisible(true)
    var telefone = e.telefone.replace(/[ ]/g, "");
    telefone = telefone.replace(/[()]/g, "");
    telefone = telefone.replace(/[-]/g, "");
    if(telefone.length<11){
      return Alert.alert('Erro no preenchimento', 'Preencha o numero de telefone corretamente ex: (99) 9 9999-9999', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
      
    }

    var nome = e.nome.toLowerCase()
    var email = e.email.toLowerCase()
    nome = nome.trim()


    const dados = {
      "nome": nome,
      "telefone": telefone,
      "email": email,
      "senha": e.senha
    }    
    
    try {
      await api.post('/doador', dados)
      .then(async (data) => {
        const login = {
          "email": data.data.email,
          "senha": data.data.senha
        }
        const dados2 = JSON.stringify(login)
        await AsyncStorage.setItem('@Profile:token', dados2);  
        setmodalVisible(false)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Inicio' },
            ],
          })
        );
        })        
      } catch (error) {        
        const mensagem = error.response.data.error 
        setmodalVisible(false)  
        return Alert.alert('Erro no cadastro', mensagem, [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);   
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
          <Text style={styles.loginText}>Cadastrar</Text>
          <Text>Faça a diferença na vida de um animal. Registre-se agora e descubra seu próximo melhor amigo.</Text>
        </View>
        <View  style={styles.loginForm}>
        <View style={styles.containerTextField}>
            <Controller
              rules={{
                required: 'true',                
              }}
              render={({ 
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error }
              }) => {
                
                  return <View style={[{marginBottom: 10}]}>
                  <Text>Nome completo:</Text>
                  <TextInput
                    style={[styles.input, {borderColor: invalid? 'red':'#000',}]}
                    placeholder='Fulano pereira costa'
                    keyboardType='default'
                    autoComplete='name'
                    placeholderTextColor= {invalid && 'red'}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
                  <Text style={[{color: 'red'}]}>{errors.nome?errors.nome.type=='required'?'Campo obrigatorio':'':''}</Text>
                </View>
                }

              }
              name="nome"
              control={control}
              defaultValue=""
            /> 
          </View>
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
                  <Text style={[{color: 'red'}]}>{errors.telefone?errors.telefone.message=='lowCaractere'?'Telefone deve conter 11 digitos':'':''}
                    {errors.telefone?errors.telefone.type=='required'?'Campo obrigatorio':'':''}</Text>
                   
                </View>
                }

              }
              name="telefone"
              control={control}
              defaultValue=""
            /> 
          </View>
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
            <TouchableOpacity style={styles.action} onPress={handleSubmit(handleNewDoador)} >
              <Text style={styles.actionText}>ENTRAR</Text>
            </TouchableOpacity>
           <View style={styles.cadastroButton}>
            <Text>já possui cadastro? </Text>
            <TouchableOpacity  onPress={() => navigateTo('login')}>
              <Text style={styles.actionText2}> Entrar </Text>
            </TouchableOpacity>
           </View>
          </View>  
        </View>
             
      </ScrollView>
    </SafeAreaView>
  )
}
