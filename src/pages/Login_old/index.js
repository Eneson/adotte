import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator, Modal, Image, KeyboardAvoidingView  } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'

import api from '../../services/api'
import styles from './styles'
import Footer from '../../components/Footer';
import LoginIcon from '../../assets/LoginIcon.png'

export default function Login(props) {
  const { register, setValue, handleSubmit, getValues, control, formState:{ errors } } = useForm()
  const [modalVisible, setmodalVisible] = useState(false)
  const navigation = useNavigation()

  function navigateTo(Page) {
    navigation.navigate(Page)
  }

  useEffect(() => {
    register('nome')
    register('telefone')
  }, [register])


  async function handleLogin(e) {
		var telefone = e.telefone.replace(/[ ]/g, "");
    telefone = telefone.replace(/[()]/g, "");
    var telefone = telefone.replace(/[-]/g, "");
    
    var nome = e.nome.toLowerCase()
    nome = nome.trim()

    const dados = {
      "nome": nome,
      "telefone": telefone
    }
    

    setmodalVisible(true)
    
   try {
      await api.post('/sessions', dados)
      .then(async (data) => {
        const doador = JSON.stringify(data.data)
        await AsyncStorage.setItem('@Profile:token', doador);
        
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Inicio' },
            ],
          })
        );
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

  const TextField = ({ erros, label, ...inputProps}) => (
    <View style={[styles.containerTextField, {borderBottomColor: erros=== "required"? 'red':''}]}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <TextInput
        placeholderTextColor= {erros=== "required" && 'red'}
        style={[styles.input, {borderColor: erros=== "required"? 'red':''}]}
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
          <Text style={styles.loginText}>BEM-VINDO!</Text>
        </View>
        <View  style={styles.loginForm}>
        
            {/* <Text style={styles.label}>{label}</Text> */}
          
          {/* <TextField
            label={'Nome completo'}
            placeholder={'Nome'}
            
            onChangeText={text => setValue('nome', text)}
          />  */}

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
          
          {/* <TextField
            label={'Celular'}
            placeholder={'Celular'}
            onChangeText={text => setValue('telefone', text)}
          /> */}
          
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
             
      </KeyboardAvoidingView>
      <Footer Navigation={{...props}}/>
    </View>
  )
}
