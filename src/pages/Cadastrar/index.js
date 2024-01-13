import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Image, Text, TouchableOpacity, Modal, ActivityIndicator, KeyboardAvoidingView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'

import api from '../../services/api'
import styles from './styles'
import Footer from '../../components/Footer';
import LoginIcon from '../../assets/LoginIcon.png'

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
  }, [register])
  
  async function handleNewDoador(e) {
    setmodalVisible(true)
    var telefone = e.telefone.replace(/[ ]/g, "");
    telefone = telefone.replace(/[()]/g, "");
    telefone = telefone.replace(/[-]/g, "");
    if(telefone.length<11){
      return Alert.alert('Erro no preenchimento', 'Preencha o numero de telefone corretamente ex: (99) 99999-9999', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
      
    }

    var nome = e.nome.toLowerCase()
    nome = nome.trim()
    
    const dados = {
      "nome": nome,
      "telefone": telefone
    }    
    
    
    try {
      await api.post('/doador', dados)
      .then(async (data) => {
        const dados2 = JSON.stringify(data.data)
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

      // const dados2 = JSON.stringify(dados)
      // await AsyncStorage.setItem('@Profile:token', dados2);  
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [
      //       { name: 'Inicio' },
      //     ],
      //   })
      // );
    
    setmodalVisible(false)
  }

  const TextField = ({ label, ...inputProps }) => (
    <View style={styles.containerTextField}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <TextInput
        style={styles.input}
        {...inputProps}
      />
    </View>
  )
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
    <View style={styles.container}>
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
      <KeyboardAvoidingView style={styles.content} behavior={'padding'}>
        <View style={styles.loginHeader}>
          <Image
            style={styles.image}
            source={LoginIcon}
            resizeMode='contain'
          />
          <Text style={styles.loginText}>Criar nova conta</Text>
        </View>
        <View  style={styles.loginForm}>
        <Controller
              rules={{required: 'true'}}
              render={({ 
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error }
              }) => {
                
                  return <TextInput
                  style={[styles.input, {borderColor: invalid? 'red':'#000'}]}
                  placeholder='Nome'
                  placeholderTextColor= {invalid && 'red'}
                  onBlur={onBlur}
                  onChangeText={value => onChange(value)}
                  value={value}
                />
                
                }

              }
              name="nome"
              control={control}
              defaultValue=""
              /> 
          <View style={styles.containerTextField}>
            {/* <Text style={styles.label}>{label}</Text> */}
            <Controller
              rules={{required: 'true'}}
              render={({ field: {onChange, onBlur, value} }) => (
                phoneField(onChange, onBlur, value)
              )}
              name="telefone"
              control={control}
              defaultValue=""
              /> 
            
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={handleSubmit(handleNewDoador)} >
              <Text style={styles.actionText}>CADASTRAR</Text>
            </TouchableOpacity>
           <View style={styles.cadastroButton}>
            <Text>Já possui cadastro? </Text>
            <TouchableOpacity  onPress={() => navigateTo('Login')}>
              <Text style={styles.actionText2}> Entrar </Text>
            </TouchableOpacity>
            
            
           </View>
          </View>  
        </View>
             
      </KeyboardAvoidingView>
      <Footer Navigation={{...props}}/>
    </View>
  )
}
