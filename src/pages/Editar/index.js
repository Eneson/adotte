import React, { useState, useEffect } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Switch, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'
import { onSignIn } from '../../components/IsLogin';
import Footer from '../../components/Footer';
import styles from './styles'
import api from '../../services/api'
import { Flow  } from 'react-native-animated-spinkit'
export default function Editar(props) {
  
  
const navigation = useNavigation()
const [modalVisible, setModalVisible] = useState(false)

const [isEmailEnabled, setIsEmailEnable] = useState(false)
const [isNomeEnabled, setIsNomeEnabled] = useState(false);
const [isFoneEnabled, setIsFoneEnable] = useState(false)
const [isSenhaEnabled, setIsSenhaEnabled] = useState(false)


  var telefone = props.route.params.item.telefone.toString().replace(/[ ]/g, "");
  telefone = telefone.replace(/[()]/g, "");
  telefone = telefone.replace(/[-]/g, "");

  const { register, setValue, handleSubmit, control, formState:{ errors }  } = useForm({
    defaultValues: {
      nome: props.route.params.item.nome,
      email: props.route.params.item.email,
      telefone: parseInt(telefone),
    }
  })


  useEffect(() => {
    register('nome')
    register('telefone')
    register('email')
    register('senha')
  }, [register])

  async function handleNewDoador(e) {
    setModalVisible(true)
    var nome = e.nome
    var email = e.email
    var telefone = e.telefone

    if(!isNomeEnabled){
      nome = props.route.params.item.nome
    }
    if(!isFoneEnabled){
      telefone = props.route.params.item.telefone
    }
    if(!isEmailEnabled){
      email = props.route.params.item.email
    }

    if(!isEmailEnabled&&!isFoneEnabled&&!isNomeEnabled&&!isSenhaEnabled){
      setModalVisible(false)
      return Alert.alert('Nenhum dado alterado', 'Preencha algum campo', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    }

    // Formata o número
   
    if(telefone.length<11){      
      setModalVisible(false)
      return Alert.alert('Erro no preenchimento', 'Preencha o numero de telefone corretamente ex: (99) 9 9999-9999', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    }
    
    email = email.toLowerCase()
    var palavras = nome.split(' ');

    // Itera sobre cada palavra e capitaliza a primeira letra
    for (var i = 0; i < palavras.length; i++) {
        palavras[i] = palavras[i].charAt(0).toUpperCase() + palavras[i].slice(1);
    }
    // Junta as palavras de volta em uma única string
    nome = palavras.join(' ');
    const apenasNumeros = telefone.replace(/\D/g, '');

    telefone = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.charAt(2)} ${apenasNumeros.slice(3, 7)}-${apenasNumeros.slice(7)}`;
    

    var dados = []
    if(isSenhaEnabled==true){
      dados = {
        "nome": nome,
        "telefone": telefone,
        "email": email,
        "senha": e.senha,
        "id_user": props.route.params.item.id_user   
      }  
    }else{
      dados = {
        "nome": nome,
        "telefone": telefone,
        "email": email,      
        "id_user": props.route.params.item.id_user   
      } 
    }
    const token = await AsyncStorage.getItem('@Profile:token')
    
    await api.post('/user/update', dados, {        
        headers: { 'authorization':  'Bearer '+token.replace(/"/g, '')},
    })
    .then(async (data) => {
      const doador = JSON.stringify(data.data.token)
      onSignIn(navigation,CommonActions,doador)  
    })
    .catch(() => {
      Alert.alert(
        "Erro no cadastro",
        "Não foi realizar alterações.\nVerifique sua conexão e tente novamente"
      ) 
    })
    .finally(() => {
      setModalVisible(false)
    }) 
         
    

  }

  return (
    <SafeAreaView style={styles.container}>      
      <Modal
        visible={modalVisible}
        transparent={true}
        statusBarTranslucent={true}
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}>
            <Flow size={50} color="#3ab6ff"/>
        </View>
      </Modal> 
      <ScrollView style={styles.scrollView}>
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
                  <View style={[styles.TextInputEditable, {borderColor: invalid? 'red':'#000'}]}>
                    <TextInput
                      style={styles.input}
                      placeholder='Fulano pereira costa'
                      keyboardType='default'
                      autoComplete='name'
                      editable={isNomeEnabled}
                      placeholderTextColor= {invalid && 'red'}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      value={isNomeEnabled ? value : props.route.params.item.nome}
                    />
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isNomeEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => setIsNomeEnabled(!isNomeEnabled)}
                      value={isNomeEnabled}
                    />
                  </View>
                  <Text style={[{color: 'red'}]}>{errors.nome?errors.nome.type=='required'?'Campo obrigatorio':'':''}</Text>
                </View>
                }
              }
              name="nome"
              control={control}
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
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error }
              }) => {
                  return <View style={[{marginBottom: 10}]}>                    
                  <Text>Telefone:</Text>
                  <View style={[styles.TextInputEditable, {borderColor: invalid? 'red':'#000'}]}>                    
                    <TextInputMask                  
                      style={[styles.input]}
                      placeholder={'Telefone'}        
                      value={isFoneEnabled? value.toString() :props.route.params.item.telefone.toString()}                       
                      type={'cel-phone'}
                      editable={isFoneEnabled}
                      options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) ',
                        
                      }}                  
                      onChangeText={onChange}
                    />             
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isFoneEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {
                        setIsFoneEnable(!isFoneEnabled)

                      }}
                      value={isFoneEnabled}
                    />
                  </View>
                  <Text style={[{color: 'red'}]}>{errors.telefone?errors.telefone.message=='lowCaractere'?'Telefone deve conter 11 digitos':'':''}
                    {errors.telefone?errors.telefone.type=='required'?'Campo obrigatorio':'':''}</Text>
                </View>
                }

              }
              name="telefone"
              control={control}
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
                if(!isEmailEnabled){
                  value = props.route.params.item.email
                }
                  return <View style={[{marginBottom: 10}]}>
                  <Text>Email:</Text>
                  <View style={[styles.TextInputEditable, {borderColor: invalid? 'red':'#000'}]}>
                    
                    <TextInput
                      style={[styles.input, {borderColor: invalid? 'red':'#000',}]}                      
                      value={value}
                      placeholder='email@gmail.com'
                      keyboardType='email-address'
                      autoComplete='email'                  
                      editable={isEmailEnabled}
                      placeholderTextColor= {invalid && 'red'}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}
                      
                    />
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={isEmailEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={() => {setIsEmailEnable(!isEmailEnabled)}}
                      value={isEmailEnabled}
                    />
                    </View>
                    {errors.email&&errors.email.message=='Invalid_email'?<Text style={[{color: 'red'}]}>Digite um email correto: exemplo@gmail.com</Text>:''}
                    {errors.email&&errors.email.type=='required'?<Text style={[{color: 'red'}]}>Email obrigatorio</Text>:''}
                  
                </View>
                }

              }
              name="email"
              control={control}
            /> 
          </View>

          <View style={styles.containerTextField}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Alterar senha?</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isSenhaEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {setIsSenhaEnabled(!isSenhaEnabled)}}
                value={isSenhaEnabled}
              />
            </View>
            {
              isSenhaEnabled?<Controller
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
                    <View style={[styles.TextInputEditable, {borderColor: invalid? 'red':'#000'}]}>                    
                      <TextInput
                        style={[styles.input, {borderColor: invalid? 'red':'#000'}]}
                        placeholder='********'
                        secureTextEntry={true}
                        placeholderTextColor= {invalid && 'red'}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                      />
                    </View>
                    <Text style={[{color: 'red'}]}>{errors.senha?errors.senha.message=='lowCaractere'?'Senha deve conter no minimo 8 caracteres':'':''}
                    {errors.senha?errors.senha.type=='required'?'Senha obrigatoria':'':''}</Text>
                </View>
                
                }

              }
              name="senha"
              control={control}
              defaultValue=""
            /> : ''
            }
            
          </View>
          
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={handleSubmit(handleNewDoador)} >
              <Text style={styles.actionText}>CONFIRMAR</Text>
            </TouchableOpacity>
          </View>  
        </View>
             
      </ScrollView>
      
      <Footer Navigation={{...props}}/>
    </SafeAreaView>
  )
}
