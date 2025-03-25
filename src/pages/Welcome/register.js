import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { onSignIn } from '../../utils/IsLogin' 
import api from '../../services/api'
import styles from './loginStyles'
import stylesGeral from './styles'
import { Flow  } from 'react-native-animated-spinkit'
import InputSenhaForm from '../../components/InputSenhaForm'
import InputForm from '../../components/InputForm'


export default function Cadastrar() {
  const { register, watch, handleSubmit, control, formState:{ errors }  } = useForm()
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
    onSignIn(navigation, CommonActions, doador)
  }).catch((e) => {
    // Verifique se o erro tem a propriedade "response" (que é quando o erro é do servidor)
    const errorMessage = e.response ? e.response.data.error : "Erro desconhecido";

    return Alert.alert(
      "Erro no cadastro",
      errorMessage || "Não foi possível comunicar com o servidor.\nTente novamente."
    )
  }).finally(() => {
    setmodalVisible(false)
  })
         
        
      

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
                  return <View>
                    <InputForm 
                      placeholder='Nome completo:'
                      inputPlaceholder='Fulano pereira costa'
                      keyboardType='default'
                      autoComplete='name'
                      invalid={invalid} 
                      onBlur={onBlur} 
                      onChange={onChange} 
                      value={value}
                    />
                  {errors.nome&&errors.nome.type=='required'?<Text style={stylesGeral.errorMessage}>(*) Campo obrigatório</Text>:''}
                  
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
                fieldState: { invalid, isTouched, isDirty, error }
              }) => {
                
                  return <View>                    
                  <InputForm
                   placeholder='Telefone:'
                   inputPlaceholder='(99) 9 9999-9999'
                   keyboardType='phone-pad'
                   autoComplete='telephoneNumber'
                   invalid={invalid} 
                   onBlur={onBlur} 
                   onChange={onChange} 
                   value={value}
                  />
                    

                  {errors.telefone&&errors.telefone.message=='lowCaractere'?<Text style={stylesGeral.errorMessage}>(*) Telefone deve conter 11 dígitos</Text>:''}
                  {errors.telefone&&errors.telefone.type=='required'?<Text style={stylesGeral.errorMessage}>(*) Campo obrigatório</Text>:''}    
                 
                   
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
                
                  return <View>
                    <InputForm 
                      placeholder='E-mail:'
                      inputPlaceholder='exemplo@gmail.com'
                      keyboardType='email-address'
                      autoComplete='email'
                      invalid={invalid} 
                      onBlur={onBlur} 
                      onChange={onChange} 
                      value={value}
                    />
                  {errors.email&&errors.email.message.includes('Invalid_email')?<Text style={stylesGeral.errorMessage}>(*) Digite um e-mail correto: exemplo@gmail.com</Text>:''}
                  {errors.email&&errors.email.type=='required'?<Text style={stylesGeral.errorMessage}>(*) E-mail obrigatório</Text>:''}
                 
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
                      return <View style={stylesGeral.FieldView }>
                        <InputSenhaForm 
                          placeholder='Senha:'
                          invalid={invalid} 
                          onBlur={onBlur} 
                          onChange={onChange} 
                          value={value}
                        />
                        {errors.senha&&errors.senha.message=='lowCaractere'?<Text style={stylesGeral.errorMessage}>(*) Senha deve conter no mínimo 8 caracteres</Text>:''}
                        {errors.senha&&errors.senha.type=='required'?<Text style={stylesGeral.errorMessage}>(*) Senha obrigatória</Text>:''}
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
                        <InputSenhaForm 
                          placeholder='Confirmar senha:'
                          invalid={invalid} 
                          onBlur={onBlur} 
                          onChange={onChange} 
                          value={value}
                        />                   
                        {errors.ConfirmSenha&&error.message=='As senhas digitadas não coincidem'?<Text style={stylesGeral.errorMessage}>(*) As senhas digitadas não coincidem</Text>:''}
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