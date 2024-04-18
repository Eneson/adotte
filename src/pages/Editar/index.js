import React, { useEffect, useState} from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, Text, TouchableOpacity, TextInput, Image, Alert  } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'

import Footer from '../../components/Footer';
import styles from './styles'
import IsLogin from '../../components/IsLogin'
import api from '../../services/api'
import LoginIcon from '../../assets/LoginIcon.png'

export default function Editar(props) {
  const { register, setValue, handleSubmit, control, formState:{ errors } } = useForm()
  const { telefone, nome} = IsLogin()  
  const navigation = useNavigation()
  const [ pressButton, setPressButton ] = useState(false)
 
  useEffect(() => {
    register('nome')
    register('telefone')  
  }, [register])

   

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

 function AlertButton (e) {
  setPressButton(true)
  return (Alert.alert('CUIDADO', 'Tem certeza que deseja atualizar os seus dados?', [
    {
      text: 'Não',
      style: 'cancel', onPress: () => setPressButton(false)
    },
    { text: 'Sim', onPress: () => updateDoador(e) },
  ]))
 }
  async function updateDoador(e) {
    var tel = e.telefone.replace(/[ ]/g, "");
    tel = tel.replace(/[()]/g, "");
    tel = tel.replace(/[-]/g, "");
    if(tel.length<11){
      return Alert.alert('Erro no preenchimento', 'Preencha o numero de telefone corretamente ex: (99) 99999-9999', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
      
    }

    var name = e.nome.toLowerCase()
    name = name.trim()
    
    const NewDados = {
      "nome": name,
      "telefone": tel,
    }    
    
    try {
      await api.post('/doador/update', NewDados,{
        headers: {
          Authorization: telefone,
        }}).then(async (res) => {
          const dados = JSON.stringify(res.data)
          await AsyncStorage.setItem('@Profile:token', dados);  
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
      alert('Erro ao atualiziar cadastro, tente novamente.')
    }
    setPressButton(false)
  }

  
  return (
      <View style={styles.container}>  
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={LoginIcon}
            resizeMode='contain'
          />
          <Text style={styles.textName}>{nome}</Text>
        </View>   
        <View style={styles.content}> 
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
              
            }}
            name="nome"
            control={control}
            defaultValue=''
          /> 
          <View style={styles.containerTextField}>
            <Controller
              rules={{required: 'true'}}
              render={({ field: {onChange, onBlur, value} }) => (
                phoneField(onChange, onBlur, value)
              )}
              name="telefone"
              control={control}
              defaultValue=''
            />             
          </View>
        </View>
          
          <View style={styles.actions}>
            <TouchableOpacity style={pressButton?styles.actionPress: styles.action} onPress={handleSubmit(AlertButton)} >
              <Text style={pressButton?styles.pressText: styles.actionText}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>  
        </View>
        
      <Footer Navigation={{...props}}/>
      </View>
  )
}
