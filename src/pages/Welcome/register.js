import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Image,StyleSheet, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { FontAwesome5 } from '@expo/vector-icons'
import { TextInputMask} from 'react-native-masked-text'
import { onSignIn } from '../../utils/IsLogin' 
import api from '../../services/api'
import styles from './loginStyles'
import { Flow  } from 'react-native-animated-spinkit'

export default function Cadastrar(props) {
  const { register, watch, handleSubmit, control, formState:{ errors }  } = useForm()
  const navigation = useNavigation()
  const [modalVisible, setmodalVisible] = useState(false)
  const [isViewConfirmSenha, setIsViewConfirmSenha] = useState(true);
  const [isViewSenha, setIsViewSenha] = useState(true);

  function navigateTo(Page) {
    navigation.navigate(Page)
  }
  
  useEffect(() => {
    register('nome')
    register('telefone')
    register('email')
    register('senha')
    register('ConfirmSenha')
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
      <Modal visible={modalVisible} transparent={true} statusBarTranslucent={true}>
        <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <Flow size={50} color="#3ab6ff"/>
        </View>
      </Modal> 
      <ScrollView style={styles.scrollView}>
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Novo Usuário</Text>
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
                  <Text style={[{color: 'red'}]}>{errors.nome?errors.nome.type=='required'?'Campo obrigatório':'':''}</Text>
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
                              width: 'auto',
                              flex: 1}}
                            placeholder='********'
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
                        <Text>Confirmar Senha:</Text>
                        <View style={[styles.TextInputEditable, {borderColor: invalid? 'red':'#000'}]}>                    
                          <TextInput
                           style={{borderColor: invalid? 'red':'#000',
                            paddingVertical: 10,
                            width: 'auto',
                            flex:1}}
                            placeholder='********'
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