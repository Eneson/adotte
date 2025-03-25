import React, { useState, useEffect } from 'react'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { View, TextInput, Switch, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView, Alert, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form'
import { TextInputMask} from 'react-native-masked-text'
import { onSignIn } from '../../utils/IsLogin';
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
const [isViewSenha, setIsViewSenha] = useState(true)
const [isViewConfirmSenha, setIsViewConfirmSenha] = useState(true)


  var telefone = props.route.params.item.telefone.toString().replace(/[ ]/g, "");
  telefone = telefone.replace(/[()]/g, "");
  telefone = telefone.replace(/[-]/g, "");

  const { watch, register, setValue, handleSubmit, control, formState:{ errors }  } = useForm({
    defaultValues: {
      nome: props.route.params.item.nome,
      email: props.route.params.item.email,
      telefone: parseInt(telefone),
      senha: '',
      ConfirmSenha: '',
    },
    
  })


  useEffect(() => {
    register('nome')
    register('telefone')
    register('email')
    register('senha')
    register('ConfirmSenha')
  }, [register])

  async function handleNewDoador(e) {
    //setModalVisible(true)
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
    .catch((e) => {      
          // Verifique se o erro tem a propriedade "response" (que é quando o erro é do servidor)
          const errorMessage = e.response ? e.response.data.error : "Erro desconhecido";
      
          return Alert.alert(
            "Erro no cadastro",
            errorMessage || "Não foi possível comunicar com o servidor.\nTente novamente."
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
                  return <View style={styles.ViewFieldInput}>
                  <Text style={styles.textMuted}>Nome completo:</Text>
                  <TouchableOpacity  
                  disabled={isNomeEnabled}                  
                  onPress={() => {
                        if(!isNomeEnabled){
                          //ToastAndroid.show('Habilite a edição deste campo', ToastAndroid.LONG);                          
                          setIsNomeEnabled(!isNomeEnabled)
                        }
                      }}
                    >
                  <View style={[styles.TextInputEditable, {borderColor: isNomeEnabled&&invalid&&'#DC3545', borderColor: isNomeEnabled?'#000':'#ccc'}]}>
                    
                      <TextInput
                        style={[styles.input, {color: isNomeEnabled?'#000':'#ccc'}]}
                        placeholder='Fulano pereira costa'
                        keyboardType='default'
                        autoComplete='name'
                        editable={isNomeEnabled}
                        placeholderTextColor= {invalid && '#DC3545'}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={isNomeEnabled ? value : props.route.params.item.nome}
                      />

                    <TouchableOpacity 
                      style={{justifyContent: 'center', alignItems: 'center', alignContent:'center', marginEnd:10}} 
                      onPress={() => {
                        setIsNomeEnabled(!isNomeEnabled)                        
                        onChange(props.route.params.item.nome.toString())
                      }}
                    >
                      <MaterialCommunityIcons name={isNomeEnabled?"toggle-switch-outline":"toggle-switch-off"} size={40} color={isNomeEnabled?"#3ab6ff":"#000"} />
                    </TouchableOpacity>   
                  </View>
                  
                  </TouchableOpacity>
                  {isNomeEnabled&&errors.nome&&errors.nome.type=='required'?<Text style={styles.errorMessage}>Campo obrigatório</Text>:''}
                  
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
                  return <View style={styles.ViewFieldInput}>                    
                  <Text style={styles.textMuted}>Telefone:</Text>
                  <TouchableOpacity  
                  disabled={isFoneEnabled}                  
                  onPress={() => {
                        if(!isFoneEnabled){
                          //ToastAndroid.show('Habilite a edição deste campo', ToastAndroid.LONG);                          
                          setIsFoneEnable(!isFoneEnabled)

                        }
                      }}
                    >
                  <View style={[styles.TextInputEditable, {borderColor: isFoneEnabled&&invalid&&'#DC3545', borderColor: isFoneEnabled?'#000':'#ccc'}]}>                    
                    <TextInputMask                  
                      style={[styles.input, {color: isFoneEnabled?'#000':'#ccc'}]}
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
                     <TouchableOpacity 
                      style={{justifyContent: 'center', alignItems: 'center', alignContent:'center', marginEnd:10}} 
                      onPress={() => {
                        setIsFoneEnable(!isFoneEnabled)                       
                        onChange(props.route.params.item.telefone.toString())
                      }}
                    >
                      <MaterialCommunityIcons name={isFoneEnabled?"toggle-switch-outline":"toggle-switch-off"} size={40} color={isFoneEnabled?"#3ab6ff":"#000"} />
                    </TouchableOpacity>                       
                  </View>
                  </TouchableOpacity>
                    {isFoneEnabled&&errors.telefone&&errors.telefone.type=='required'?<Text style={styles.errorMessage}>Campo obrigatório</Text>:''}
                    {isFoneEnabled&&errors.telefone&&errors.telefone.message=='lowCaractere'?<Text style={styles.errorMessage}>Telefone deve conter 11 dígitos</Text>:''}
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
                  return <View style={styles.ViewFieldInput}>
                  <Text style={styles.textMuted}>E-mail:</Text>
                  <TouchableOpacity  
                  disabled={isEmailEnabled}                  
                  onPress={() => {
                        if(!isEmailEnabled){
                          //ToastAndroid.show('Habilite a edição deste campo', ToastAndroid.LONG);                          
                          setIsEmailEnable(!isEmailEnabled)
                        }
                      }}
                    >
                  <View style={[styles.TextInputEditable, {borderColor: isEmailEnabled&&invalid&&'#DC3545', borderColor: isEmailEnabled?'#000':'#ccc'}]}>                    
                    <TextInput
                      style={[styles.input, {borderColor: isEmailEnabled&&invalid? '#DC3545':'#000',color: isEmailEnabled?'#000':'#ccc'}]}                      
                      value={isEmailEnabled?value:props.route.params.item.email}
                      placeholder='exemplo@gmail.com'
                      keyboardType='email-address'
                      autoComplete='email'                  
                      editable={isEmailEnabled}
                      placeholderTextColor= {isEmailEnabled&&invalid?'':'#DC3545'}
                      onBlur={onBlur}
                      onChangeText={value => onChange(value)}                      
                    />
                    <TouchableOpacity 
                      style={{justifyContent: 'center', alignItems: 'center', alignContent:'center', marginEnd:10}} 
                      onPress={() => {
                        setIsEmailEnable(!isEmailEnabled)                       
                        onChange(props.route.params.item.email.toString())
                      }}
                    >
                      <MaterialCommunityIcons name={isEmailEnabled?"toggle-switch-outline":"toggle-switch-off"} size={40} color={isEmailEnabled?"#3ab6ff":"#000"} />
                    </TouchableOpacity>   
                    {/* <TouchableOpacity 
                      style={{justifyContent: 'center', alignItems: 'center', alignContent:'center', marginEnd:10}} 
                      onPress={() => {
                        setIsEmailEnable(!isEmailEnabled)
                      }}
                    >
                      <FontAwesome5 name="edit" size={20} color={isEmailEnabled?"#3ab6ff":"#000"} />
                    </TouchableOpacity> */}
                  </View>
                    </TouchableOpacity>
                    {isEmailEnabled&&errors.email&&errors.email.message=='Invalid_email'?<Text style={styles.errorMessage}>Digite um e-mail correto: exemplo@gmail.com</Text>:''}
                    {/* {isEmailEnabled&&errors.email&&errors.email.type=='required'?<Text style={styles.errorMessage}>E-mail obrigatório</Text>:''} */}
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
              <TouchableOpacity 
                style={{justifyContent: 'center', alignItems: 'center', alignContent:'center', marginStart: 5}} 
                onPress={() => {
                  setIsSenhaEnabled(!isSenhaEnabled)                  
                }}
              >
                <MaterialCommunityIcons name={isSenhaEnabled?"toggle-switch-outline":"toggle-switch-off"} size={40} color={isSenhaEnabled?"#3ab6ff":"#000"} />
              </TouchableOpacity>   
            </View>
            {
              isSenhaEnabled?
              <View>
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
                      return <View style={styles.ViewFieldInput}>
                        <Text style={styles.textMuted}>Nova senha:</Text>
                        <View style={[styles.TextInputEditable, {borderColor: isSenhaEnabled&&invalid? '#DC3545':'#000'}]}>                    
                          <TextInput
                            style={[styles.input, {borderColor: invalid? '#DC3545':'#000'}]}
                            placeholder={isSenhaEnabled?'':'********'}
                            secureTextEntry={isViewSenha}
                            placeholderTextColor= {isSenhaEnabled&&invalid?'#DC3545': '#bdbdbd'}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={isSenhaEnabled?value:'********'}       
                            editable={isSenhaEnabled}
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
                        {errors.senha&&errors.senha.message=='lowCaractere'?<Text style={styles.errorMessage}>Senha deve conter no mínimo 8 caracteres</Text>:''}
                        {errors.senha&&errors.senha.type=='required'?<Text style={styles.errorMessage}>Senha obrigatoria</Text>:''}
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
                      return <View style={styles.ViewFieldInput}>
                        <Text style={styles.textMuted}>Confirmar senha:</Text>
                        <View style={[styles.TextInputEditable, {borderColor: invalid? '#DC3545':'#000'}]}>                    
                          <TextInput
                            style={[styles.input, {borderColor: invalid? '#DC3545':'#000'}]}
                            placeholder={''}
                            secureTextEntry={isViewConfirmSenha}
                            placeholderTextColor= {invalid?'#DC3545': '#bdbdbd'}
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}       
                            editable={isSenhaEnabled}
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
                        {errors.ConfirmSenha&&error.message=='As senhas digitadas não coincidem'?<Text style={styles.errorMessage}>{error.message}</Text>:''}
                    </View>                
                    }
                  }
                  name="ConfirmSenha"
                  control={control}
                  defaultValue=""
                />
              </View>
              
            :''}
          </View>      
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={handleSubmit(handleNewDoador)} >
            <Text style={styles.actionText}>CONFIRMAR</Text>
          </TouchableOpacity>
        </View>  
             
      </ScrollView>
      
      <Footer Navigation={{...props}}/>
    </SafeAreaView>
  )
}
