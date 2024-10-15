import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Image,StyleSheet, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'
import { onSignIn } from '../../components/IsLogin';
import api from '../../services/api'
import styles from './loginStyles'
import { Flow  } from 'react-native-animated-spinkit'

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

    var email = e.email.toLowerCase()
    var nome = e.nome
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
      "senha": e.senha
    }        
    
      await api.post('/user', dados)
      .then(async (data) => {
        const doador = JSON.stringify(data.data.token)
        onSignIn(navigation,CommonActions,doador)  
      }).catch(() => {
        return Alert.alert(
          "Erro no cadastro",
          "Não foi possivel comunicar com o servidor.\nTente novamente"
        )
      }).finally(() => {
         setmodalVisible(false)
      })
         
        
      

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
      {/* MODAL LOADING */}
      <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <Flow size={50} color="#3ab6ff"/>
        </View>
      </Modal> 
      <ScrollView style={styles.scrollView}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Novo Usuario</Text>
          <Text style={styles.loginHeaderText}>Faça a diferença na vida de um animal. Registre-se agora e descubra seu próximo melhor amigo.</Text>
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
            <TouchableOpacity isabled={modalVisible} style={styles.action} onPress={handleSubmit(handleNewDoador)} >
              <Text style={styles.actionText}>CADASTRAR</Text>
            </TouchableOpacity>
           <View style={styles.cadastroButton}>
            <Text>já possui cadastro? </Text>
            <TouchableOpacity  onPress={() => navigateTo('login')}>
              <Text style={styles.actionText2}>Entrar</Text>
            </TouchableOpacity>
           </View>
          </View>  
        </View>
             
      </ScrollView>
    </SafeAreaView>
  )
}